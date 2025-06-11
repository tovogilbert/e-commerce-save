import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../connection";

interface OrderModelAttributes {
  "id": number;
  "orderDate": Date;
  "status": string;
  "deliveryAddress": string;
  "shippingFee": number;
  "subtotal": number;
  "discount": number;
  "tax": number;
  "total": number;
  "clientId": number;
  "paymentId": number;
}

export class OrderModel extends Model<InferAttributes<OrderModel>, InferCreationAttributes<OrderModel>> {
  declare id: CreationOptional<number>;
  declare orderDate: Date;
  declare status: string;
  declare deliveryAddress: string;
  declare shippingFee: number;
  declare subtotal: number;
  declare discount: number;
  declare tax: number;
  declare total: number;
  declare clientId: number;
  declare paymentId: number;
  declare client?: any;
  declare payment?: any;
  declare lines?: any[];
}

OrderModel.init(
  {
    "id": {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    "orderDate": {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    "status": {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    "deliveryAddress": {
      type: DataTypes.TEXT,
      allowNull: false
    },
    "shippingFee": {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    "subtotal": {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    "discount": {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    "tax": {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    "total": {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    "clientId": {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    "paymentId": {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: false
  }
);