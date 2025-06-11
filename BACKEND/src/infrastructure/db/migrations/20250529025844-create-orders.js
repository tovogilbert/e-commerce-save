'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      "id": {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      "orderDate": {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      "status": {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending'
      },
      "deliveryAddress": {
        type: Sequelize.TEXT,
        allowNull: false
      },
      "shippingFee": {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      "subtotal": {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      "discount": {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      "tax": {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      "total": {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      "clientId": {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      "paymentId": {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'payments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      "createdAt": {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      "updatedAt": {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('orders', ['clientId']);
    await queryInterface.addIndex('orders', ['paymentId']);
    await queryInterface.addIndex('orders', ['status']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('orders');
  }
};
