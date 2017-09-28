var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
 return sequelize.define("Account", {
    Username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
}
