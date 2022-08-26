const mongoose = require('mongoose');

const smstemplateSchema = new mongoose.Schema(
  {
    templateName: {
      type: String,
      required: [true, 'A SMS Template must have a name'],
      trim: true
    },
    sendCopyTo: [String],
    messageFormat: {
      type: String,
      required: [true, 'A SMS Template must have a message format.'],
      trim: true
    },
    helpNotes: {
      type: String
    },
    flowId: {
      type: String
    },
    senderId: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  {
    toObject: { virtuals: true },
    timestamps: true
  }
);

smstemplateSchema.pre(/^find/, function(next) {
  next();
});

const Smstemplate = mongoose.model('Smstemplate', smstemplateSchema);

module.exports = Smstemplate;
