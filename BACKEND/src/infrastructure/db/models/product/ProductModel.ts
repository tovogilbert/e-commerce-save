import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../../connection";


interface ProductModelAttributes {
  id: number;
  name: string;
  description: string;
  priceExclTax: number;
  stockQty: number;
  image: string;
  brandId: number;
}


export class ProductModel extends Model<InferAttributes<ProductModel>,InferCreationAttributes<ProductModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare priceExclTax: number;
  declare stockQty: number;
  declare image: string;
  declare brandId: number;
  declare brand?: any; 
  declare productFeatures?: any[]; 
}

ProductModel.init(
  {
    "id": { 
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true 
      },
        
    "name": { 
      type: DataTypes.STRING,
       allowNull: false 
      },

    "description": { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },

    "priceExclTax": {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    "stockQty": {
       type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 0,

      },

    "image": { 
      type: DataTypes.STRING,
      allowNull: false 
    },
    "brandId": {
       type: DataTypes.INTEGER,
        allowNull: false 
      },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: false,
  }
);

