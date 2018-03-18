

module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    eventid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    venue: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    createby: DataTypes.STRING,
  }, {});
  events.associate = function (models) {
    // associations can be defined here
  };
  return events;
};
