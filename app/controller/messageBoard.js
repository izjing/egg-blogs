'use strict';

const Controller = require('egg').Controller;

class MessageBoardController extends Controller {
  // 注册
  async addMb() {
    const { ctx } = this;
    const rule = {
      content: { type: 'string', required: true, message: '必填项' },
    };
    const signupMsg = ctx.request.body;
    await ctx.validate(rule, signupMsg);
    const result = await ctx.service.messageBoard.addMb(signupMsg);
    ctx.body = result;
  }

  async findMb() {
    const { ctx } = this;
    const signinMsg = ctx.request.body;
    const result = await ctx.service.messageBoard.findMb(signinMsg);
    ctx.body = result;
  }
}

module.exports = MessageBoardController;
