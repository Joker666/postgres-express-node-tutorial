module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Project.associate = (models) => {
    Project.belongsTo(models.Organization, {
      foreignKey: 'organizationId',
      onDelete: 'CASCADE',
    });
    Project.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Project;
};
