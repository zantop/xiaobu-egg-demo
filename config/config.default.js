'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1539676803507_7400';

  config.middleware = [ 'errorHandler' ];

  exports.keys = 'xiaobuData';
  // 添加 view 配置
  exports.view = {
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
      underscored: false,
    },
  };
  return config;
};

