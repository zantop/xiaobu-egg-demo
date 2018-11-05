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
  return config;
};

