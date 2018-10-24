'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.resources('user', '/api/user', controller.user);
  router.get('/', controller.home.index);
  // 以下是token使用示例
  router.post('/login', controller.login.index);
  router.post('/getUser', controller.login.getUser);
  // 登录页面
  router.get('/login', controller.demo.login);
  // 注册
  router.get('/register', controller.demo.register);
  // 修改信息
  router.get('/updateUser', controller.demo.update);
  // 删除用户
  router.get('/deleteUser', controller.demo.delete);
};
