import sequelize from "../config/sequelizeClient";
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
        allowNull: false,
        unique:true
    }
}, {
    sequelize,
    modelName: "brand",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true
})