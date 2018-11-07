'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  describe('GET /', () => {
    it('get请求测试', () => {
      // 对 app 发起 `GET /` 请求
      app.mockCsrf();
      return app.httpRequest()
        .get('/api/user?id=13')
        .expect(200)
        .expect({
          code: 200,
          message: '获取成功',
          state: 'success',
        });
    });
  });

  describe('POST /post', () => {
    it('post测试', () => {
      app.mockCsrf();
      return app.httpRequest()
        .post('/api/user')
        .send({
          username: '13765986555',
          password: '654321',
        })
        .expect(200)
        .expect('Content-Type', /json/);
    });
  });

  describe('egg test', () => {
    before(() => console.log('order 1'));
    before(() => console.log('order 2'));
    after(() => console.log('order 6'));
    beforeEach(() => console.log('order 3'));
    afterEach(() => console.log('order 5'));
    it('should worker', () => console.log('order 4'));
  });

});
