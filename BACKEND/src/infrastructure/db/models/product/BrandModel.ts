
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../../connection";

export class BrandModel extends Model<InferAttributes<BrandModel>, InferCreationAttributes<BrandModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

BrandModel.init({
  "id": { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true 
  },
  "name": { 
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
}, {
  sequelize,
  tableName: "brands",
  timestamps: false,
});
