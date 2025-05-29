'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      "id": {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      "name": {
        type: Sequelize.STRING,
        allowNull: false
      },
      "description": {
        type: Sequelize.TEXT,
        allowNull: false
      },
      "priceExclTax": {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      "stockQty": {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      "image": {
        type: Sequelize.STRING,
        allowNull: false
      },
      "brandId": {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'brands',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      "createdAt": {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      "updatedAt": { 
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP  '),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
     }
    });
    await queryInterface.addIndex('products', ['brandId']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
