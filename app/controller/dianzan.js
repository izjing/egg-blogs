'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 注册
  async dianzanup() {
    const { ctx } = this;
    const rule = {
      id: { type: 'string', required: true, message: '必填项' },
      // userName: { type: 'string', required: true, message: '必填项' },
    };
    const signupMsg = ctx.request.body;
    await ctx.validate(rule, signupMsg);
    const result = await ctx.service.dianzan.dianzanup(signupMsg);
    ctx.body = result;
  }
  async finddianzan() {
    const { ctx } = this;
    const signinMsg = ctx.request.body;
    const result = await ctx.service.dianzan.finddianzan(signinMsg);
    ctx.body = result;

  }

  async findAllZan() {
    const { ctx } = this;
    const result = await ctx.service.dianzan.findAllZan();
    ctx.body = result;
  }
}

module.exports = HomeController;
