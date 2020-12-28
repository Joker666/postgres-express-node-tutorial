module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Task.belongsTo(models.User, {
      foreignKey: 'assignedUserId',
      onDelete: 'CASCADE',
    });
    Task.belongsTo(models.Project, {
      foreignKey: 'projectId',
      onDelete: 'CASCADE',
    });
  };
  return Task;
};
