import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../../connection";

export class FeatureModel extends Model<InferAttributes<FeatureModel>, InferCreationAttributes<FeatureModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

FeatureModel.init({
  "id": {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  "name": {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
}, {
  sequelize,
  tableName: "features",
  timestamps: false,
  underscored : false,
});





