'use strict';

// had enabled by egg
// exports.static = true;

// view
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

// db
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

// cors
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
// 开发阶段不用每次添加token
exports.security = {
  enable: false,
};

// egg-valid
exports.valid = {
  enable: true,
  package: 'egg-valid',
};

// token配置
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};
