'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
      "id": {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      "clientType": {
        type: Sequelize.ENUM('particulier', 'entreprise'),
        allowNull: false,
      },

      // Champs communs
      "email": {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      "telephone": {
        type: Sequelize.STRING,
        allowNull: false,
      },
      "adresse": {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // Champs spécifiques au particulier
      "firstName": {
        type: Sequelize.STRING,
        allowNull: true,
      },
      "lastName": {
        type: Sequelize.STRING,
        allowNull: true,
      },

      // Champs spécifiques à l'entreprise
      "companyName": {
        type: Sequelize.STRING,
        allowNull: true,
      },
      "nif": {
        type: Sequelize.STRING,
        allowNull: true,
      },
      "stat": {
        type: Sequelize.STRING,
        allowNull: true,
      },

      "createdAt": {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      "updatedAt": {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('clients');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_clients_type";');
  }
};
