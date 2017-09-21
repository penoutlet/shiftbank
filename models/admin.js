var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
 return sequelize.define("Admin", {
    Username: DataTypes.STRING,
    Password: DataTypes.STRING,
    Email: DataTypes.STRING

  });
}
