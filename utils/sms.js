const https = require("https");
const SmsTemplate = require("../models/smsTemplateModel");

module.exports = class SMS {
  constructor(phone) {
    this.options = {
      method: "POST",
      hostname: "api.msg91.com",
      port: null,
      path: "/api/v5/flow",
      headers: {
        authkey: process.env.MSG91_AUTHKEY,
        "content-type": "application/json",
      },
    };
    const today = new Date();
    this.phone = `91${phone}`;
    this.date = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;
  }

  async sendOTP(templateName, args) {
    try {
      const template = await SmsTemplate.findOne({
        templateName,
      });
      if (template && template.isActive) {
        const numbers = [this.phone, ...template.sendCopyTo];
        const recipients = numbers.map((phone) => {
          return {
            mobiles: phone,
            otp: args.OTP,
            hasCode: args.hash || "",
          };
        });
        const templateData = JSON.stringify({
          flow_id: template.flowId,
          sender: template.senderId,
          recipients: recipients,
        });
        const msg91 = https.request(this.options, function (res) {
          const chunks = [];
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });

          res.on("end", function () {
            Buffer.concat(chunks);
          });
        });

        msg91.write(templateData);
        msg91.end();
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async sendWelcome(templateName, args) {
    try {
      const template = await SmsTemplate.findOne({
        templateName,
      });
      if (template && template.isActive) {
        const numbers = [this.phone, ...template.sendCopyTo];
        const recipients = numbers.map((phone) => {
          return {
            mobiles: phone,
            name: args.name,
          };
        });
        const templateData = JSON.stringify({
          flow_id: template.flowId,
          sender: template.senderId,
          recipients: recipients,
        });
        const msg91 = https.request(this.options, function (res) {
          const chunks = [];

          res.on("data", function (chunk) {
            chunks.push(chunk);
          });

          res.on("end", function () {
            Buffer.concat(chunks);
          });
        });

        msg91.write(templateData);
        msg91.end();
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async sendRider(templateName, args) {
    try {
      const template = await SmsTemplate.findOne({
        templateName,
      });
      if (template && template.isActive) {
        const numbers = [this.phone, ...template.sendCopyTo];
        const recipients = numbers.map((phone) => {
          return {
            mobiles: phone,
            name: args.name,
            regid: args.regid,
            actionURL: args.actionURL,
          };
        });
        const templateData = JSON.stringify({
          flow_id: template.flowId,
          sender: template.senderId,
          recipients: recipients,
        });
        const msg91 = https.request(this.options, function (res) {
          const chunks = [];

          res.on("data", function (chunk) {
            chunks.push(chunk);
          });

          res.on("end", function () {
            Buffer.concat(chunks);
          });
        });

        msg91.write(templateData);
        msg91.end();
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async sendCustomer(templateName, args) {
    try {
      const template = await SmsTemplate.findOne({
        templateName,
      });
      if (template && template.isActive) {
        const numbers = [this.phone, ...template.sendCopyTo];
        const recipients = numbers.map((phone) => {
          return {
            mobiles: phone,
            name: args.name,
            shopName: args.shopName,
            orderId: args.orderId,
            amount: args.amount,
          };
        });
        const templateData = JSON.stringify({
          flow_id: template.flowId,
          sender: template.senderId,
          recipients: recipients,
        });
        const msg91 = https.request(this.options, function (res) {
          const chunks = [];

          res.on("data", function (chunk) {
            chunks.push(chunk);
          });

          res.on("end", function () {
            Buffer.concat(chunks);
          });
        });

        msg91.write(templateData);
        msg91.end();
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendPartner(templateName, args) {
    try {
      const template = await SmsTemplate.findOne({
        templateName,
      });
      if (template && template.isActive) {
        const numbers = [this.phone, ...template.sendCopyTo];
        const recipients = numbers.map((phone) => {
          return {
            mobiles: phone,
            name: args.name,
            shopName: args.shopName,
            orderId: args.orderId,
            amount: args.amount,
          };
        });
        const templateData = JSON.stringify({
          flow_id: template.flowId,
          sender: template.senderId,
          recipients: recipients,
        });
        const msg91 = https.request(this.options, function (res) {
          const chunks = [];

          res.on("data", function (chunk) {
            chunks.push(chunk);
          });

          res.on("end", function () {
            Buffer.concat(chunks);
          });
        });

        msg91.write(templateData);
        msg91.end();
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};
