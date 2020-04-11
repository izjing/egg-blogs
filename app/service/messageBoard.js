'use strict';
const Service = require('egg').Service;

class MessageBoardService extends Service {
  // 注册接口
  async addMb(obj) {
    const { ctx } = this;
    const res = {};
    const result = await ctx.model.MessageBoard.create({
      name: ctx.state.decode.name,
      id: ctx.state.decode.id,
      content: obj.content,
    });
    res.data = result;
    res.code = 1;
    res.msg = '发表成功';
    return res;
  }
  // 查询所有留言
  async findMb(page) {
    const { ctx } = this;
    const res = {};
    const pages = (+page.page - 1) * 10;
    const result = await ctx.model.MessageBoard.aggregate([{
      $lookup: {
        from: 'dianzans',
        localField: '_id',
        foreignField: 'id',
        as: 'dianzan',
      },
    },
    {
      $project: {
        name: '$name',
        content: '$content',
        time: { $dateToString: { format: '%Y-%m-%d %H:%M', date: { $add: [ '$createDate', 28800000 ] } } },
        dianzan: { $size: '$dianzan' },
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
        res.msg = '留言查询成功';
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

module.exports = MessageBoardService;
