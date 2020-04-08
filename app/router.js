'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  // router.get('/', controller.home.index);
  router.post('/signup', controller.home.signup);
  router.post('/login', controller.home.login);
  router.post('/wenzhang', controller.wenzhang.wenzhangup);
  router.get('/findwenzhang', controller.wenzhang.findwenzhang);
  router.get('/findOneArticle', controller.wenzhang.findOneArticle);
  // 点赞
  router.post('/dianzan', jwt, controller.dianzan.dianzanup);
  router.post('/finddianzan', controller.dianzan.finddianzan);
  router.get('/findAllZan', controller.dianzan.findAllZan);
  // 添加说说
  router.post('/addAbout', jwt, controller.about.addAbout);
  router.post('/findAbout', controller.about.findAbout);
  // 添加留言
  router.post('/addMb', jwt, controller.messageBoard.addMb);
  router.post('/findMb', controller.messageBoard.findMb);
};
