'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 注册
  async signup() {
    const { ctx } = this;
    const rule = {
      name: { type: 'string', required: true, message: '必填项' },
      userName: { type: 'string', required: true, message: '必填项' },
      userPass: { type: 'string', required: true, message: '必填项' },
      userEmail: { type: 'email', required: true, message: '必填项' },
    };
    const signupMsg = ctx.request.body;
    await ctx.validate(rule, signupMsg);
    signupMsg.userPass = ctx.helper.encrypt(signupMsg.userPass);
    const result = await ctx.service.user.signup(signupMsg);
    ctx.body = result;
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
