'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_xiaobuData';

  // token凭证
  config.jwt = {
    secret: 'xiaobuData',
  };

  config.middleware = [ 'errorHandler' ];

  exports.keys = 'xiaobu-data';
  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // http://docs.sequelizejs.com/manual/installation/getting-started.html
  // PostgresSQL
  config.sequelize = {
    dialect: 'postgres', // db类型
    database: 'testdb', // 数据库名
    host: '47.92.212.1', // 主机
    port: '5432', // 端口
    username: 'dbuser',
    password: 'xz147112',
    define: {
      freezeTableName: true,
    },
    timezone: '+08:00',
  };

  // 关闭安全威胁csrf的防范
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 解决跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  return config;
};

