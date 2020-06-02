'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  // 注册接口
  async signup(signupMsg) {
    const { ctx } = this;
    const res = {};
    const authCode = await ctx.model.AuthCode.findOne({
      userName: signupMsg.userName,
      email: signupMsg.userEmail,
    }).sort({ _id: -1 }).limit(1);
    // 判断验证码是否过期
    if ((new Date().getTime() - authCode.createDate.getTime()) > 600000) {
      res.code = 0;
      res.msg = '验证码已过期，请重新获取';
      return res;
    }
    // 判断验证码是否正确
    if ((authCode && authCode.authCode) !== +signupMsg.authCode) {
      res.code = 0;
      res.msg = '验证码错误';
      return res;
    }
    // 查询用户名是否存在
    const queryResult = await ctx.model.User.findOne({
      userName: signupMsg.userName,
    });
    // 判断用户名是否存在
    if (queryResult) {
      res.code = -1;
      res.msg = '账号已存在';
    } else {
      // 查询用户昵称是否存在
      const isName = await ctx.model.User.findOne({
        name: signupMsg.name,
      });
      // 判断用户昵称是否存在
      if (isName) {
        res.code = -1;
        res.msg = '昵称已存在';
      } else {
        // 创建用户
        res.data = await ctx.model.User.create(signupMsg);
        // 超级权限
        // res.data = await ctx.model.User.create({
        //   ...signupMsg,
        //   super: 1,
        // });
        res.code = 1;
        res.msg = '注册成功';
      }
    }
    return res;
  }

  // 登录接口
  async signin(signinMsg) {
    const { ctx, app } = this;
    const res = {};
    const queryResult = await ctx.model.User.findOne({
      userName: signinMsg.userName,
    });
    if (!queryResult) {
      res.code = 0;
      res.msg = '用户不存在,请前去注册';
      res.data = {};
    } else {
      const result = await ctx.model.User.findOne(signinMsg, { name: 1, userName: 1, super: 1 }, (e, d) => d);
      if (!result) {
        res.code = 0;
        res.msg = '用户信息不正确';
        res.data = {};
      } else {
        const token = app.jwt.sign({
          userName: result.userName,
          id: result._id,
          name: result.name,
        }, app.config.jwt.secret, {
          expiresIn: 60 * 60 * 24,
        });
        res.data = result;
        // ctx.cookies.set('count', 'aaa', {
        //   httpOnly: false,
        //   signed: false,
        // });
        res.code = 1;
        res.msg = '登录成功';
        res.token = token;
      }
    }
    return res;
  }
  // 查询用户信息
  async findUser(userMsg) {
    const { ctx } = this;
    const res = {};
    const result = await ctx.model.User.findOne(userMsg);
    if (result) {
      res.data = result;
      res.code = 1;
      res.msg = '用户查询成功';
    } else {
      res.data = result;
      res.code = -1;
      res.msg = '该用户不存在';
    }
    return res;
  }
  // 更新用户信息
  async updateUser(userMsg) {
    const { ctx } = this;
    const res = {};
    const result = await ctx.model.User.findByIdAndUpdate(userMsg._id, userMsg);
    res.code = 1;
    res.msg = '用户信息已更改';
    res.data = result;
    return res;
  }
  // 用户注销
  async logOut(userMsg) {
    const { ctx } = this;
    const res = {};
    const result = await ctx.model.User.remove(userMsg);
    res.code = 1;
    res.msg = '用户已注销';
    res.data = result;
    return res;
  }
  // 超级管理员删除用户
  async deleteUser(deleteUserMsg) {
    const { ctx } = this;
    const res = {};
    const result = await ctx.model.User.remove(deleteUserMsg);
    res.code = 1;
    res.msg = '用户已被删除';
    res.data = result;
    return res;
  }

}

module.exports = UserService;
