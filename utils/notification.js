/* eslint-disable prefer-template */
/* eslint-disable no-eval */
const https = require('https');
const NotificationTemplate = require('../models/notificationTemplateModel');

module.exports = class Notification {
  constructor(phone) {
    const today = new Date();
    this.phone = `${phone}`;
    this.date = `${today.getDate()}/${today.getMonth() +
      1}/${today.getFullYear()}`;
  }

  async sendToCustomer(templateName, args) {
    const options = {
      host: 'onesignal.com',
      port: 443,
      path: '/api/v1/notifications',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Basic MjBkZWQwNTYtODQyNS00ZGYyLTgzYzgtOGM3OTQxODczMDVk'
      }
    };
    try {
      const template = await NotificationTemplate.findOne({
        templateName
      });
      if (template && template.isActive) {
        const userPhones = [this.phone, ...template.sendCopyTo];

        const dataNotification = {
          app_id: template.appId,
          headings: { en: eval('`' + template.headings + '`') },
          subtitle: { en: eval('`' + template.subtitle + '`') },
          contents: { en: eval('`' + template.messageFormat + '`') },
          channel_for_external_user_ids: 'push',
          include_external_user_ids: userPhones,
          data: args,
          // small_icon: template.smallIcon,
          large_icon: template.largeIcon,
          // big_picture: template.bigPicture,
          android_channel_id: template.androidChannelId
        };
        const oneSignal = https.request(options, function(res) {
          const chunks = [];

          res.on('data', function(chunk) {
            chunks.push(chunk);
          });

          res.on('end', function() {
            Buffer.concat(chunks);
          });
        });

        oneSignal.write(JSON.stringify(dataNotification));
        oneSignal.end();
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendToPartner(templateName, args) {
    const options = {
      host: 'onesignal.com',
      port: 443,
      path: '/api/v1/notifications',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Basic M2EzNTI3NjAtOWUxOS00OThhLTkxOGItNDg5NmZjYzMxODQ2'
      }
    };
    try {
      const template = await NotificationTemplate.findOne({
        templateName
      });
      if (template && template.isActive) {
        const userPhones = [this.phone, ...template.sendCopyTo];

        const dataNotification = {
          app_id: template.appId,
          headings: { en: eval('`' + template.headings + '`') },
          subtitle: { en: eval('`' + template.subtitle + '`') },
          contents: { en: eval('`' + template.messageFormat + '`') },
          channel_for_external_user_ids: 'push',
          include_external_user_ids: userPhones,
          data: args,
          // small_icon: template.smallIcon,
          // large_icon: template.largeIcon,
          // big_picture: template.bigPicture,
          android_channel_id: template.androidChannelId
        };
        if (template.smallIcon) {
          dataNotification.small_icon = template.smallIcon;
        }
        if (template.largeIcon) {
          dataNotification.large_icon = template.largeIcon;
        }
        if (template.bigPicture) {
          dataNotification.big_picture = template.bigPicture;
        }
        const oneSignal = https.request(options, function(res) {
          const chunks = [];
          res.on('data', function(chunk) {
            chunks.push(chunk);
          });

          res.on('end', function() {
            Buffer.concat(chunks);
          });
        });

        oneSignal.write(JSON.stringify(dataNotification));
        oneSignal.end();
      }
      return true;
    } catch (error) {
      return false;
    }
  }
};
