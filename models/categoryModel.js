import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from 'sequelize'

export class categoryModel extends Model{}

categoryModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
    }
}, {
    sequelize, 
    modelName: "brand",
    underscored: true,
    freezeTableName: false, 
    createdAt: true,
    updatedAt: true
})