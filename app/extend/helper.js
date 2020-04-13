'use strict';
const Crypto = require('crypto');
const nodemailer = require('nodemailer');

module.exports = {
  encrypt(data) {
    // sha1加密
    const hmac = Crypto.createHmac('sha1', this.config.pwd_salt);
    hmac.update(data);
    const result = hmac.digest('hex');
    return result;
  },
  localDate(v) {
    const d = new Date(v || Date.now());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString();
  },
  rndNum(n) {
    let rnd = '';
    for (let i = 0; i < n; i++) {
      rnd += Math.floor(Math.random() * 10);
    }
    return rnd;
  },
  async email(body) {
    // 封装发送者信息
    const transporter = nodemailer.createTransport({
      service: 'smtp.163.com', // 调用163服务器
      host: 'smtp.163.com',
      secureConnection: true, // 启动SSL
      port: 465, // 端口就是465
      auth: {
        user: 'xyp53531437@163.com', // 账号
        pass: 'WZSTSJRZYMWNMCMP', // 授权码,

      },
    });

    // 邮件参数及内容
    const mailOptions = {
      from: 'xyp53531437@163.com', // 发送者,与上面的user一致
      to: body.email, // 接收者,可以同时发送多个,以逗号隔开
      subject: 'izjing博客验证码', // 标题
      // text: '测试内容', // 文本
      html: `<h2>${body.num}</h2><span>有效期10分钟</span>`,
    };

    // 调用函数，发送邮件
    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }

  },
};
