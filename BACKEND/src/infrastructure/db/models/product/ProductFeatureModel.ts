import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../../connection";

export class ProductFeatureModel extends Model< InferAttributes<ProductFeatureModel>, InferCreationAttributes<ProductFeatureModel> > {
  declare id: CreationOptional<number>;
  declare productId: number;
  declare featureId: number;

  declare feature?: any;
}
ProductFeatureModel.init(
  {
    "id": { 
         type: DataTypes.INTEGER, 
         primaryKey: true,
         autoIncrement: true 
        },

    "productId": { 
        type: DataTypes.INTEGER,
         allowNull: false 
        },

    "featureId": { 
        type: DataTypes.INTEGER,
         allowNull: false 
        },
  },
  {
    sequelize,
    tableName: "productFeatures",
    timestamps: false,
    underscored: false,
    indexes:[
      {
       unique : true,
       fields: ["productId" , "featureId"]
      }
    ]
  }
);
