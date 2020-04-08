'use strict';
module.exports = options => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    if (token) {
      try {
        // 解码token
        const decode = ctx.app.jwt.verify(token, options.secret);
        ctx.state.decode = decode;
        await next();
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
        msg: '请您登录后重试',
        code: 0,
      };
      return;
    }
  };
};
