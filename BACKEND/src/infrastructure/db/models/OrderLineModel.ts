import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../connection";

interface OrderLineModelAttributes {
  "idDetail": number;
  "quantity": number;
  "unitPrice": number; 
  "orderId": number;
  "productId": number;
}

export class OrderLineModel extends Model<InferAttributes<OrderLineModel>, InferCreationAttributes<OrderLineModel>> {
  declare idDetail: CreationOptional<number>;
  declare quantity: number;
  declare unitPrice: number;
  declare orderId: number;
  declare productId: number;
  declare order?: any;
  declare product?: any;
}

OrderLineModel.init(
  {
    "idDetail": {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'idDetail' 
    },
    "quantity": {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    "unitPrice": {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'unitPrice'
    },
    "orderId": {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'orderId'
    },
    "productId": {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'productId'
    }
  },
  {
    sequelize,
    tableName: "orderLines",
    timestamps: false,
    underscored: false
  }
);