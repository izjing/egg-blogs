'use strict';
module.exports = options => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    let decode;
    console.log(token, 789);
    if (token) {
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);
        await next();
        console.log(decode);
      } catch (error) {
        ctx.status = 200;
        ctx.body = {
          msg: error.message,
          code: -100,
        };
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        msg: '没有token',
        code: 0,
      };
      return;
    }
  };
};
