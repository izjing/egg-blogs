'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const jwt = app.middleware.jwt(app.config.jwt);
  // router.get('/', controller.home.index);
  router.post('/signup', controller.home.signup);
  router.post('/login', controller.home.login);
  router.post('/wenzhang', controller.wenzhang.wenzhangup);
  router.get('/findwenzhang', controller.wenzhang.findwenzhang);
};
