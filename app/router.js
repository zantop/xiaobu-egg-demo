'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // api
  router.resources('user', '/api/user', controller.user);

  // token使用示例
  router.post('/login', controller.login.index);
  router.post('/getUser', controller.login.getUser);
  // nuxt 页面路由
  router.get('/', controller.ssr.index);
};
