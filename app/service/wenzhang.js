'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  // 创建文章
  async wenzhangup(signupMsg) {
    const { ctx } = this;
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
  // 查询所有文章
  async findwenzhang(page) {
    const { ctx } = this;
    const res = {};
    const pages = (+page.page - 1) * 10;
    const result = await ctx.model.Wenzhang.aggregate([{
      $lookup: {
        from: 'dianzans',
        localField: '_id',
        foreignField: 'id',
        as: 'dianzan',
      },
    },
    {
      $project: {
        title: '$title',
        content: '$content',
        describe: '$describe',
        imgUrl: '$imgUrl',
        time: { $dateToString: { format: '%Y-%m-%d %H:%M', date: { $add: [ '$createDate', 28800000 ] } } },
        dianzan: { $size: '$dianzan' },
        isZan: { $in: [ page.userName, '$dianzan.userName' ] },
      },

    },
    { $sort: { _id: -1 } },
    { $skip: pages },
    { $limit: 10 },
    ], function(err) {
      if (err) {
        console.log(err);
        return;
      }
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
  // 查询文章内容
  async findOneArticle(page) {
    const { ctx, app } = this;
    const res = {};
    const pages = (+page.page - 1) * 10;
    // const result = await ctx.model.Wenzhang.find().skip(pages).limit(10);
    const result = await ctx.model.Wenzhang.aggregate([{
      $lookup: {
        from: 'dianzans',
        localField: '_id',
        foreignField: 'id',
        as: 'dianzan',
      },
    },
    {
      $project: {
        title: '$title',
        content: '$content',
        describe: '$describe',
        time: { $dateToString: { format: '%Y-%m-%d %H:%M', date: { $add: [ '$createDate', 28800000 ] } } },
        dianzan: { $size: '$dianzan' },
      },
    },
    { $match: { _id: app.mongoose.Types.ObjectId(page.id) } },
    { $skip: pages },
    { $limit: 10 },
    ], function(err) {
      if (err) {
        console.log(err);
        return;
      }
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


}

module.exports = UserService;
