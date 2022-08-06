const multer = require("multer");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.getAll = (Model, filterQuery) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (filterQuery) filter = filterQuery;

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });

exports.getAllInDescending = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find().sort("-createdAt");
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.getBySlug = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOne({ slug: req.params.slug });
    if (!doc) {
      return next(new AppError("No document found with that slug", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, {
      isActive: false,
    });
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

exports.getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371.1; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

exports.sortAndMap = (arr = []) => {
  const copy = arr.slice();
  const sorter = (a, b) => {
    return a.index - b.index;
  };
  copy.sort(sorter);
  const res = copy.map(({ name }) => {
    return name;
  });
  return res;
};

exports.filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.filterRestrictedFields = (obj, ...restrictedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (!restrictedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
