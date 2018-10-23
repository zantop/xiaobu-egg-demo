'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.resources('user', '/api/user', controller.restful);
  router.get('/', controller.home.index);
  // user
  router.get('/user/getUserById', controller.user.getUserById);
  router.post('/user/login', controller.user.login);
  router.post('/user/register', controller.user.register);
  router.post('/user/update', controller.user.update);
  router.post('/user/delete', controller.user.delete);
  // 登录页面
  router.get('/login', controller.demo.login);
  // 注册
  router.get('/register', controller.demo.register);
  // 修改信息
  router.get('/updateUser', controller.demo.update);
  // 删除用户
  router.get('/deleteUser', controller.demo.delete);
};
