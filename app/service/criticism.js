'use strict';
const Service = require('egg').Service;

class AboutService extends Service {
  async add(obj) {
    const { ctx, app } = this;
    const res = {};
    const id = app.mongoose.Types.ObjectId(obj.id);
    const result = await ctx.model.Criticism.create({
      id,
      userName: ctx.state.decode.name,
      content: obj.content,
    });
    res.data = result;
    res.code = 1;
    res.msg = '发表成功';
    return res;
  }
  // 查询所有文章
  async findAbout(page) {
    const { ctx } = this;
    const res = {};
    const pages = (+page.page - 1) * 10;
    // const result = await ctx.model.Wenzhang.find().skip(pages).limit(10);
    const result = await ctx.model.About.aggregate([{
      $lookup: {
        from: 'dianzans',
        localField: '_id',
        foreignField: 'id',
        as: 'dianzan',
      },
    },
    // {
    //   $match: { _id: app.mongoose.Types.ObjectId(page.id) },
    // },
    {
      $project: {
        name: '$name',
        content: '$content',
        time: { $dateToString: { format: '%Y-%m-%d %H:%M', date: { $add: [ '$createDate', 28800000 ] } } },
        dianzan: { $size: '$dianzan' },
        isZan: { $in: [ page.userName, '$dianzan.userName' ] },
      },

    },
    { $skip: pages },
    { $sort: { _id: -1 } },
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
        res.msg = '说说查询成功';
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

module.exports = AboutService;
