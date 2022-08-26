const slugify = require("slugify");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Partner = require("../models/partnerModel");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const APIFeatures = require("../utils/apiFeatures");

exports.protect = catchAsync(async (req, res, next) => {
  let currentPartner = await Partner.findOne({ managerId: req.user._id });
  if (!currentPartner) {
    return next(
      new AppError(
        "The user belonging to this partner does no longer exist.",
        404
      )
    );
  }
  req.partner = currentPartner;
  next();
});

// Account ***
exports.createPartner = catchAsync(async (req, res, next) => {
  if (!req.body.address || !req.body.address.pinCode) {
    req.body.address = undefined;
  }
  const filteredBody = factory.filterRestrictedFields(
    req.body,
    "status",
    "isActive",
    "isBlocked",
    "isVerified",
    "isTopRated",
    "isPromoted",
    "isNewPartner"
  );
  req.body = filteredBody;

  const userPhone = req.body.ownerDetails.phone;
  let partnerOwner = await User.findOne({ phone: userPhone });
  const mobileIsAlreadyUsed = await Partner.findOne({
    ownerDetails: { phone: userPhone },
  });
  if (mobileIsAlreadyUsed) {
    return next(
      new AppError("Duplicate Request For Partner Registration", 404)
    );
  }
  if (!req.body.ownerDetails.phone) {
    return next(new AppError("Please provide owner details", 404));
  }
  const newUserCreate = {
    firstName: req.body.ownerDetails.firstName,
    lastName: req.body.ownerDetails.lastName,
    phone: req.body.ownerDetails.phone,
    email: req.body.ownerDetails.email,
    role: "partner",
  };
  if (partnerOwner) {
    req.body.managerId = partnerOwner._id;
    partnerOwner = await User.findByIdAndUpdate(
      partnerOwner._id,
      newUserCreate
    );
  } else {
    // Create New User Account
    partnerOwner = await User.create(newUserCreate);
    req.body.managerId = partnerOwner._id;
  }

  req.body.userName = `${req.body.businessDetails.businessName}${
    Math.floor(Math.random() * (999999 - 100000)) + 100000
  }`;
  req.body.userName = req.body.userName.replace(" ", "");

  req.body.slug = slugify(req.body.businessDetails.businessName, {
    lower: true,
  });
  req.body.slug = `${req.body.slug}-${
    Math.floor(Math.random() * (999999 - 100000)) + 100000
  }`;

  const mDoc = await Partner.findOne({ slug: req.body.slug });
  if (mDoc) {
    req.body.slug = `${req.body.slug}-${
      Math.floor(Math.random() * (999999 - 100000)) + 100000
    }`;
  }

  const newPartner = await Partner.create(req.body);

  //send Partner Welcome
  await new SMS(userPhone).sendPartner("partner-onboarding", {
    name: req.body.ownerDetails.firstName,
  });

  res.status(201).json({
    status: "success",
    data: newPartner,
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  if (req.user.role !== "partner") {
    return next(new AppError("This route is only for partners", 401));
  }

  let partnerDoc = await Partner.findOne({ managerId: req.user._id });
  if (!partnerDoc) {
    partnerDoc = await Partner.create({
      businessDetails: {
        businessName: "",
        tagline: "",
      },
      managerId: req.user._id,
      slug: Date.now(),
      userName: Date.now(),
      phone: req.user.phone,
      ownerDetails: {
        phone: req.user.phone,
      },
    });
  }

  if (!partnerDoc.isActive) {
    return next(
      new AppError("No partner account is linked with your account", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: partnerDoc,
  });
});

exports.updateAccount = catchAsync(async (req, res, next) => {
  if (req.user.role !== "partner") {
    return next(new AppError("This route is only for partners", 401));
  }

  const filteredObj = factory.filterObj(
    req.body,
    "ownerDetails",
    "businessDetails",
    "slug",
    "userName",
    "description",
    "keywords",
    "categoriesId",
    "payment",
    "minimumCartAmount",
    "address",
    "phone",
    "email",
    "workingHours",
    "social",
    "storeSeo",
    "policy",
    "deliveryTime",
    "packingCharges",
    "serviceCharges",
    "shippingRadius",
    "distance",
    "isProductEditing",
    "showSalePrice",
    "showProductMRP",
    "isDisplayTags",
    "isTakingOrders"
  );

  req.body = filteredObj;

  const partnerDoc = await Partner.findOneAndUpdate(
    { managerId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: partnerDoc,
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  const doc = await Partner.findByIdAndUpdate(req.partner._id, {
    isActive: false,
  });

  res.status(200).json({
    status: "success",
    data: doc,
  });
});


exports.getAllProductCategories = catchAsync(async (req, res, next) => {
  const filter = { partnerId: req.partner._id, isActive: true };

  const features = new APIFeatures(
    Category.find(filter).sort('name'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  res.status(200).json({
    status: 'success',
    data: doc
  });
});
// ProductCategories ***
exports.createCategory = catchAsync(async (req, res, next) => {
  req.body.partnerId = req.partner._id;

  req.body.slug = slugify(
    `${req.body.title}-${Math.floor(Math.random() * (99999 - 10000) + 10000)}`,
    { lower: true }
  );

  const categoryDoc = await Category.create(req.body);

  res.status(200).json({
    status: "success",
    data: categoryDoc,
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const categoryDoc = await Category.findOne({
    _id: req.params.id,
    partnerId: req.partner._id,
  });
  if (!categoryDoc) {
    return next(new AppError("No product category found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: categoryDoc,
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  // const imagePath =
  //   'https://firebasestorage.googleapis.com/v0/b/partner-subdha.appspot.com/o/';

  const categoryDoc = await Category.findOne({
    _id: req.params.id,
    partnerId: req.partner._id,
  });
  if (!categoryDoc) {
    return next(new AppError("No product category found with that id", 404));
  }

  // if (req.body.imageIcon &&
  //   categoryDoc.imageIcon &&
  //   req.body.imageIcon !== categoryDoc.imageIcon &&
  //   categoryDoc.imageIcon.startsWith(imagePath)) {
  // let image = images[i].replace(imagePath, '').split('?')[0];
  // const imageIcon = categoryDoc.imageIcon
  //   .replace(imagePath, '')
  //   .split('?')[0]
  //   .replace('%2F', '/');
  //TODO: Implement Delite Fn
  // await fbAdmin.deleteFiles({
  //   prefix: imageIcon
  // });
  // }
  const doc = await Category.findByIdAndUpdate(categoryDoc._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const imagePath =
    "https://firebasestorage.googleapis.com/v0/b/partner-subdha.appspot.com/o/";

  const categoryDoc = await Category.findOneAndUpdate(
    { _id: req.params.id, partnerId: req.partner._id },
    { isActive: false }
  );
  if (!categoryDoc) {
    return next(new AppError("No product category found with that id", 404));
  }

  if (categoryDoc.imageIcon && categoryDoc.imageIcon.startsWith(imagePath)) {
    const imageIcon = categoryDoc.imageIcon
      .replace(imagePath, "")
      .split("?")[0]
      .replace("%2F", "/");
    await fbAdmin.deleteFiles({
      prefix: imageIcon,
    });
  }

  res.status(200).json({
    status: "success",
    data: categoryDoc,
  });
});

// Products ***
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const productDoc = await Product.deleteOne({
    _id: req.params.id,
    partnerId: req.partner._id,
  });

  res.status(200).json({
    status: "success",
    data: productDoc,
  });
});
exports.createProduct = catchAsync(async (req, res, next) => {
  req.body.partnerId = req.partner._id;
  req.body.isActive = true;
  if (!req.body.variants || !req.body.variants.length) {
    req.body.variants = [
      {
        unit: "1 Pic",
        productMRP: 1,
        salePrice: 1,
        stock: 1,
      },
    ];
  }

  req.body.slug = slugify(
    `${req.body.name}-${req.partner.businessDetails.businessName}`,
    { lower: true }
  );

  const doc = await Product.findOne({ slug: req.body.slug });
  if (doc) {
    req.body.slug = `${doc.slug}- ${Math.floor(
      Math.random() * (9999 - 1000) + 1000
    )}`;
  }

  const productDoc = await Product.create(req.body);

  let profileScore = 0;

  if (
    productDoc.categoriesId.length > 0 &&
    productDoc.categoriesId.length <= 100
  )
    profileScore += 5;
  if (productDoc.images.length > 0) profileScore += 5;
  if (productDoc.description && productDoc.description.length > 20)
    profileScore += 5;
  if (productDoc.tags.length > 0) profileScore += 5;
  if (productDoc.attributes.length > 0) profileScore += 5;
  productDoc.profileScore = profileScore;
  await productDoc.save();

  res.status(200).json({
    status: "success",
    data: productDoc,
  });
});
