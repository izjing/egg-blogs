'use strict';

const Controller = require('egg').Controller;

class AboutController extends Controller {
  // 注册
  async addAbout() {
    const { ctx } = this;
    const rule = {
      content: { type: 'string', required: true, message: '必填项' },
    };
    const signupMsg = ctx.request.body;
    await ctx.validate(rule, signupMsg);
    const result = await ctx.service.about.addAbout(signupMsg);
    ctx.body = result;
  }

  async findAbout() {
    const { ctx } = this;
    const signinMsg = ctx.request.body;
    const result = await ctx.service.about.findAbout(signinMsg);
    ctx.body = result;
  }
}

module.exports = AboutController;
