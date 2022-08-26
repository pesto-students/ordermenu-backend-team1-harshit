const mongoose = require("mongoose");
const Address = require("./singleItem/addressModel");
const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "This userName is already taken"],
      default: Date.now(),
    },
    slug: {
      type: String,
      unique: true,
    },
    adminId: {
      type: mongoose.Schema.ObjectId,
      require: [true, "Partner must have user"],
      ref: "User",
    },
    description: String,
    address: Address,
    logo: { type: String },
    background: { type: String },
    categories: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
    },
    menu: {
      type: mongoose.Schema.ObjectId,
      ref: "menu",
    },
    tables: {
      type: mongoose.Schema.ObjectId,
      ref: "tables",
    }
  },
  {
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Partner = mongoose.model("Partner", partnerSchema);
module.exports = Partner;
