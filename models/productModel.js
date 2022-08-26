const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
    },
    partnerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Partner",
      required: [true, "A product must have a partner id"],
    },
    categoriesId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
    ],
    image: String,
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    variants: [
      {
        unit: {
          type: String,
        },
        productMRP: {
          type: Number,
          default: 0,
        },
        discount: {
          type: Number,
          default: 0,
        },
        salePrice: {
          type: Number,
          default: 0,
        },
        partnerPrice: {
          type: Number,
          default: 0,
        },
        stock: {
          type: Number,
        },
      },
    ],
    isOutOfStock: {
      type: Boolean,
      default: false,
    },
    isVegan: {
      type: Boolean,
      default: false,
    },
    isNonVegan: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    orderLimit: {
      minQuantity: {
        type: Number,
        default: 1,
      },
      maxQuantity: {
        type: Number,
        default: 10,
      },
    },
    isListingOn: {
      type: Boolean,
      default: true,
    },
    isReturnable: {
      type: Boolean,
      default: true,
    },
    isCancelable: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    toObject: { virtuals: true },
    timestamps: true,
  }
);

productSchema.index({ name: "text", tags: "text" });
productSchema.index({ slug: 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
