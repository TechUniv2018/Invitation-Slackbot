

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('events', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    eventid: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    venue: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    time: {
      type: Sequelize.TIME,
    },
    createby: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('events'),
};
