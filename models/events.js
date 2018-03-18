'use strict';
module.exports = (sequelize, DataTypes) => {
  var events = sequelize.define('events', {
    eventid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    venue: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    createby: DataTypes.STRING
  }, {});
  events.associate = function(models) {
    // associations can be defined here
  };
  return events;
};