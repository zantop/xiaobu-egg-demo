'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // api
  router.resources('user', '/api/user', controller.api.user);

  // token使用示例
  router.post('/login', controller.api.login.index);
  router.post('/getUser', controller.api.login.getUser);
  // nuxt 页面路由
  router.get('/', controller.pages.common.index);
  router.get('/notfound', controller.pages.common.notFound);
};
