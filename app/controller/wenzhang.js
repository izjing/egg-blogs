'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 添加文章
  async wenzhangup() {
    const { ctx } = this;
    const rule = {
      title: { type: 'string', required: true, message: '必填项' },
      describe: { type: 'string', required: true, message: '必填项' },
      imgUrl: { type: 'string', required: true, message: '必填项' },
    };
    const signupMsg = ctx.request.body;
    await ctx.validate(rule, signupMsg);
    const result = await ctx.service.wenzhang.wenzhangup(signupMsg);
    ctx.body = result;
  }
  // 查询所有文章
  async findwenzhang() {
    const { ctx } = this;
    const signinMsg = ctx.query;
    const result = await ctx.service.wenzhang.findwenzhang(signinMsg);
    ctx.body = result;

  }
  // 查询文章详情
  async findOneArticle() {
    const { ctx } = this;
    const signinMsg = ctx.query;
    const result = await ctx.service.wenzhang.findOneArticle(signinMsg);
    ctx.body = result;

  }
}

module.exports = HomeController;
