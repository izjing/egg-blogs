'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 注册
  async wenzhangup() {
    const { ctx } = this;
    const rule = {
      title: { type: 'string', required: true, message: '必填项' },
      content: { type: 'string', required: true, message: '必填项' },
    };
    const signupMsg = ctx.request.body;
    await ctx.validate(rule, signupMsg);
    const result = await ctx.service.wenzhang.wenzhangup(signupMsg);
    ctx.body = result;
  }
  async findwenzhang() {
    const { ctx } = this;
    const signinMsg = ctx.query;
    console.log(signinMsg, 55566);

    const result = await ctx.service.wenzhang.findwenzhang(signinMsg);

    ctx.body = result;

  }
}

module.exports = HomeController;
