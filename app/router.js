'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  // router.get('/', controller.home.index);
  router.post('/api/api/signup', controller.home.signup);
  router.post('/api/login', controller.home.login);
  router.post('/api/loginMail', controller.home.loginMail);
  // 文章
  router.post('/api/wenzhang', jwt, controller.wenzhang.wenzhangup);
  router.get('/api/findwenzhang', controller.wenzhang.findwenzhang);
  router.get('/api/findOneArticle', controller.wenzhang.findOneArticle);
  // 点赞
  router.post('/api/dianzan', jwt, controller.dianzan.dianzanup);
  router.post('/api/finddianzan', controller.dianzan.finddianzan);
  router.get('/api/findAllZan', controller.dianzan.findAllZan);
  // 添加说说
  router.post('/api/addAbout', jwt, controller.about.addAbout);
  router.post('/api/findAbout', controller.about.findAbout);
  // 添加留言
  router.post('/api/addMb', jwt, controller.messageBoard.addMb);
  router.post('/api/findMb', controller.messageBoard.findMb);
};
