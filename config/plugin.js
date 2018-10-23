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

// 开发阶段不用每次添加token
exports.security = {
  enable: false,
};

// egg-validate
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
