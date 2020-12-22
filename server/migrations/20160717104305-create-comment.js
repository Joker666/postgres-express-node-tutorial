module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      taskId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Tasks',
          key: 'id',
          as: 'taskId',
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Comments'),
};
