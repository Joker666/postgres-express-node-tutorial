module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tasks', {
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
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      projectId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Projects',
          key: 'id',
          as: 'projectId',
        },
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
      assignedUserId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
          as: 'assignedUserId',
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Tasks'),
};
