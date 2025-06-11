import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
export interface PaymentModelAttributes {
  id?: number; 
  paymentDate: Date;
  amount: number;
  method: string;
  transactionRef: string;
  createdAt?: Date; 
  updatedAt?: Date; 
}

export class PaymentModel extends Model<PaymentModelAttributes> implements PaymentModelAttributes {
  declare id: number;
  declare paymentDate: Date;
  declare amount: number;
  declare method: string;
  declare transactionRef: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

PaymentModel.init({
  "id": {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  "paymentDate": {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  "amount": {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  "method": {
    type: DataTypes.STRING,
    allowNull: false
  },
  "transactionRef": {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  "createdAt": DataTypes.DATE,
  "updatedAt": DataTypes.DATE
}, {
  sequelize,
  tableName: "payments",
  timestamps: true,
  underscored: false
});