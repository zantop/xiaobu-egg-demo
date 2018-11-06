'use strict';

module.exports = () => {
  const config = exports = {};

  exports.cluster = {
    listen: {
      port: 8080,
      hostname: '127.0.0.1',
    },
  };
  // 线上环境配置
  // PostgresSQL
  config.sequelize = {
    dialect: 'postgres', // db类型
    database: 'smalldata_temp', // 数据库名
    host: '52.83.114.189', // 主机
    port: '5432', // 端口
    username: 'smalldata',
    password: 'smalldata2018',
    schema: 'label',
    define: {
      freezeTableName: true,
    },
    timezone: '+08:00',
  };
  return config;
};

