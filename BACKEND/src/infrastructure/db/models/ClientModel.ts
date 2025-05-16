import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

export class ClientModel extends Model {}

ClientModel.init({
  "id": { type: DataTypes.UUID, primaryKey: true },
  "email": { type: DataTypes.STRING, allowNull: false },
  "telephone": { type: DataTypes.STRING, allowNull: false },
  "adresse": { type: DataTypes.STRING, allowNull: false },
  "clientType": { type: DataTypes.STRING, allowNull: false },

  // Client particulier 
  "firstName": DataTypes.STRING,
  "lastName": DataTypes.STRING,

  // Client entreprise
  "companyName": DataTypes.STRING,
  "nif": DataTypes.STRING,
  "stat": DataTypes.STRING,

  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  sequelize,
  tableName: "clients",
  timestamps: false,
});
