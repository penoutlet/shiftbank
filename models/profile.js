var Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes) {
  return sequelize.define("Profile", {
    Bio: DataTypes.STRING,
    Work: DataTypes.STRING,
    Hobbies: DataTypes.STRING,
    Religious_Beliefs: DataTypes.STRING,
    Languages: DataTypes.STRING
  });
}
