import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from 'sequelize'

export class brandModel extends Model{}

brandModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "brand",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true
})