'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  // 注册接口
  async wenzhangup(signupMsg) {
    console.log(signupMsg, 55555);
    const { ctx } = this;
    console.log(ctx.model, 987);
    const res = {};
    const queryResult = await ctx.model.Wenzhang.findOne({
      title: signupMsg.title,
    });
    if (queryResult) {
      res.code = -1;
      res.msg = '文章已存在';
    } else {
      const result = await ctx.model.Wenzhang.create(signupMsg);
      res.data = result;
      res.code = 1;
      res.msg = '发表成功';
    }
    return res;
  }
  // 查询用户信息
  async findwenzhang(page) {
    const { ctx } = this;
    const res = {};
    const pages = (+page.page - 1) * 10;
    const result = await ctx.model.Wenzhang.find().skip(pages).limit(10);
    if (result) {
      if (result.length > 0) {
        res.data = result;
        res.code = 1;
        res.page = +page.page;
        res.msg = '文章查询成功';
      } else {
        res.data = result;
        res.code = 1;
        res.page = +page.page;
        res.msg = '最后一页了';
      }
    } else {
      res.data = result;
      res.code = -1;
      res.msg = '暂无数据';
    }
    return res;
  }


}

module.exports = UserService;
