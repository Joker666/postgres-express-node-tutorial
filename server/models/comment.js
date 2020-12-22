module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Comment.belongsTo(models.Task, {
      foreignKey: 'taskId',
      onDelete: 'CASCADE',
    });
  };
  return Comment;
};
