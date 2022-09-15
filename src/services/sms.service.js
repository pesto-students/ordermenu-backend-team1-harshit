const https = require("https");

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
    this.date = `${today.getDate()}/${today.getMonth() + 1
      }/${today.getFullYear()}`;
  }

  async sendOTP(flowId, senderId, phone, otp) {
    const recipients = {
      mobiles: phone,
      otp: otp,
    };
    const templateData = JSON.stringify({
      flow_id: flowId,
      sender: senderId,
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
  } catch(error) {
    console.error(error);
    return false;
  }
}