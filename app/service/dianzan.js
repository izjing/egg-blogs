'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  // 点赞接口
  async dianzanup(signupMsg) {
    const { ctx, app } = this;
    const res = {};
    const queryResult = await ctx.model.Dianzan.findOne({
      id: signupMsg.id,
      userName: ctx.state.decode.userName,
    });
    const id = app.mongoose.Types.ObjectId(signupMsg.id);
    if (queryResult) {
      res.code = 0;
      res.msg = '您已经点赞';
    } else {
      const result = await ctx.model.Dianzan.create({
        id,
        userName: ctx.state.decode.userName,
      });
      res.data = result;
      res.code = 1;
      res.msg = '点赞成功';
    }
    return res;
  }
  // 查询用户信息
  async finddianzan(page) {
    const { ctx } = this;
    const res = {};
    const result = await ctx.model.Dianzan.aggregate([{
      $lookup: {
        from: 'wenzhang',
        localField: 'id',
        foreignField: '_id',
        as: 'cont',
      },
    }], function(err, docs) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(JSON.stringify(docs), 999999);
    });
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

  async findAllZan() {
    const { ctx } = this;
    const zan = await ctx.model.Dianzan.find();
    const user = await ctx.model.User.find();
    const wenzhang = await ctx.model.Wenzhang.find();
    const messageBoard = await ctx.model.MessageBoard.find();
    const about = await ctx.model.About.find();
    const res = {};
    res.data = {
      zan: zan.length,
      user: user.length,
      article: wenzhang.length,
      messageBoard: messageBoard.length,
      about: about.length,
    };
    res.code = 1;
    return res;

  }


}

module.exports = UserService;
