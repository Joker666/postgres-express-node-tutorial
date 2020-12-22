module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
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
      organizationId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Organizations',
          key: 'id',
          as: 'organizationId',
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Users'),
};
