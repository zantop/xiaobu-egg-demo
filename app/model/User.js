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
