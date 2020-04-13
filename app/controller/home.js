'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 注册
  async signup() {
    const { ctx } = this;
    // 验证必填项
    const rule = {
      name: { type: 'string', required: true, message: '必填项' },
      userName: { type: 'string', required: true, message: '必填项' },
      userPass: { type: 'string', required: true, message: '必填项' },
      userEmail: { type: 'email', required: true, message: '必填项' },
    };
    const signupMsg = ctx.request.body;
    // 验证必填项
    await ctx.validate(rule, signupMsg);
    // 密码加密
    signupMsg.userPass = ctx.helper.encrypt(signupMsg.userPass);
    // 保存用户
    const result = await ctx.service.user.signup(signupMsg);
    ctx.body = result;
  }
  // 发送邮箱验证码
  async loginMail() {
    const { ctx } = this;
    const body = ctx.request.body;
    // 创建随机6位数字
    const num = await ctx.helper.rndNum(6);
    // 发送邮件
    const res = await ctx.helper.email({
      num,
      email: body.email,
    });
    // 邮件是否发送成功
    if (res) {
      await ctx.model.AuthCode.create({
        authCode: num,
        email: body.email,
        userName: body.userName,
      });
      ctx.body = {
        code: 1,
        msg: '验证码发送成功',
      };
    } else {
      ctx.body = {
        code: 0,
        msg: '验证码发送失败, 核对邮箱后重试',
      };
    }
  }
  // 登陆
  async login() {
    const { ctx } = this;
    const rule = {
      userName: { type: 'string', required: true, message: '必填项' },
      userPass: { type: 'string', required: true, message: '必填项' },
    };
    // if (!signinMsg.userName || !signinMsg.userPass) {
    //   const res = {};
    //   res.code = 0;
    //   res.msg = '信息不能为空';
    //   ctx.response.body = res;
    //   return;
    // }
    const signinMsg = ctx.request.body;
    await ctx.validate(rule, signinMsg);
    signinMsg.userPass = ctx.helper.encrypt(signinMsg.userPass);
    const result = await ctx.service.user.signin(signinMsg);
    ctx.body = result;
  }

  async findUser() {
    const { ctx } = this;
    const signinMsg = ctx.request.body;

    const result = await ctx.service.user.findUser(signinMsg);

    ctx.body = result;

  }
}

module.exports = HomeController;
