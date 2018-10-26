# Egg demo

egg.js DEMO

## QuickStart

<!-- add docs here for user -->

查看 [egg.doc](https://eggjs.org/zh-cn/intro/) 获取更多信息.
 

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 怎么实现一个接口
 1. 在app 目录下新建一个js，命名请以数据为标准，如：user,shop...，接口定义请都参照egg.js router文档以 RESTful 风格的 URL 定义,具体查看[egg.js router文档](http://apidocjs.com/https://eggjs.org/zh-cn/basics/router.html)。接口注释采用apiDoc方式，请参考demo或者查看[apiDoc文档](http://apidocjs.com/)。请务必使用这种注释方式，已配置命令npm run apidoc 可以直接生成接口文档，文档目录为docs。
 ```javascript
 'use strict'; // 必须采用严格模式
// 继承自base_controller
const Controller = require('../core/base_controller');

/**
 * @api {post} /api/user 用户注册
 * @apiDescription 用户注册
 * @apiGroup  user
 * @apiParam {String} username
 * @apiParam {String} password
 * @apiSuccess {Number} code 200
 * @apiSuccess {String} state success
 * @apiSuccess {Object} data {userInfo}
 *
 */
// 定义一个class 继承base_controller
class UserController extends Controller {
  // 新增用户
  async create() {
    // 获取ctx
    const { ctx } = this;
    // 从service中获取user这个类,不需要自己定义，只需要在service新建得文件即可
    const { user } = ctx.service;
    // 定义参数验证规则 规则:https://github.com/hexindai/egg-valid
    const rule = {
      username: 'required|phone',
      password: {
        password: {
          min: 6,
          max: 18,
        },
      },
    };
    // 定义与规则相对于得提示消息
    const messages = {
      'username.required': '必须填写手机号',
      'username.phone': '请输入一个正确的手机号',
      'password.password': '密码太简单了',
    };
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    const validator = await this.validator(ctx.request.body, rule, messages);
    // 如果验证成功
    if (validator) {
      // 获取请求参数，注意get，post获取参数方法不同
      const { username, password } = ctx.request.body;
      // 获取service返回信息
      const res = await user.create(username, password);
      // 根据返回信息提示消息,方法封装在base_controller,具体可以去查看
      res.state ? this.success(res.data, res.message) : this.error(null, res.message);
    }
  }
}

module.exports = UserController;

 ```
更多内容请查看app/controller/user.js 

 2. 在model目录新建user.js，更多配置可查看 http://docs.sequelizejs.com/
  ```javascript
'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('T_USER', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(30),
      primaryKey: true,
    },
    password: STRING(32),
    createdAt: {
      type: DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DATE,
      field: 'updated_at',
    },
  });
  return User;
};
  ```

 3. 在service新建一个user.js,函数注释请参照demo,具体规则请查看 [jsdoc文档](http://www.css88.com/doc/jsdoc/)
 ```javascript
 'use strict';
// 获取base_service
const Service = require('../core/base_service');
// 定义UserService继承自base_service
class UserService extends Service {

  /**
   * 注册
   * @param {String} username - 用户名
   * @param {String} password - 密码
   * @return {Object} - 返回用户信息
   */
  async create(username, password) {
      // 判断是否已经注册
    const isExist = await this.isExist(username);
    if (isExist) {
      return this.error('该手机号已被注册');
    }
    // 使用sequelize 的内置方法新增用户
    const user = await this.ctx.model.User.create({
      username,
      password,
    });
    // 返回信息到controller
    return this.success(user, '注册成功');
  }

 ```
  4.router.js添加以下代码,egg.js可自动在/api/user 路径上部署了一组 CRUD 路径结构
   ```javascript
  router.resources('user', '/api/user', controller.user);
   ```
  5.接口测试，推荐使用Postman

  ### 关于token
  
   - 获取token

  ```JavaScript
    // 计算token
    const token = ctx.service.token.create({ id: res.data.id });
    // 携带token 返回数据
    this.successToken(res.data, token, '登陆成功');
   ```
   - token解析

  ```JavaScript
   //解析token并验证，传递id值过去并对比
    const isVerify = await ctx.helper.verifyToken(ctx, id);
    // state = success 验证成功 
    // state = false  验证失败 失败原因(Token校验失败/Token和用户不符),在message中返回
  ```