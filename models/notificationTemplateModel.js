const mongoose = require('mongoose');

const notificationTemplateSchema = new mongoose.Schema(
  {
    templateName: {
      type: String,
      required: [true, 'A SMS Template must have a name'],
      trim: true
    },
    sendCopyTo: [
      {
        type: String,
        minlength: [10, 'Mobile number should be 10 number'],
        maxlength: [10, 'Mobile number should be 10 number']
      }
    ],
    messageFormat: {
      type: String,
      required: [true, 'A SMS Template must have a message format.'],
      trim: true
    },
    headings: {
      type: String
    },
    subtitle: {
      type: String
    },
    helpNotes: {
      type: String
    },
    authKey: {
      type: String
    },
    appId: {
      type: String
    },
    smallIcon: {
      type: String
    },
    largeIcon: {
      type: String
    },
    bigPicture: {
      type: String
    },
    androidChannelId: {
      type: String
    },
    sound: {
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

notificationTemplateSchema.pre(/^find/, function(next) {
  next();
});

const NotificationTemplate = mongoose.model(
  'NotificationTemplate',
  notificationTemplateSchema
);

module.exports = NotificationTemplate;
