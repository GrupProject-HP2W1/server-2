'use strict';
module.exports = (sequelize, DataTypes) => {
  class History extends sequelize.Sequelize.Model {}

  History.init({
    city: DataTypes.STRING,
    date: DataTypes.DATE,
    lat: DataTypes.STRING,
    long: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    weather: DataTypes.STRING,
    temperature: DataTypes.STRING
  }, {sequelize})

  History.associate = function(models) {
    History.belongsTo( models.User, {foreignKey:'user_id'} )
  };
  return History;
};