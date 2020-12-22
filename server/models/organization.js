module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Organization', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
