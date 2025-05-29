'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("features", {
      'id': {
        type : Sequelize.INTEGER,
        primaryKey:true,
        allowNull : false,
        autoIncrement : true,
      },

      "name": {
        type : Sequelize.STRING,
        allowNull : false,
        unique: true
      }
      ,
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
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('features');
  }
};
