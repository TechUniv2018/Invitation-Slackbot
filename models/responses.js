'use strict';
module.exports = (sequelize, DataTypes) => {
  var responses = sequelize.define('responses', {
    eventid: DataTypes.INTEGER,
    userid: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  responses.associate = function(models) {
    // associations can be defined here
  };
  return responses;
};