import express from 'express'
import { carModel } from '../models/carModel.js'
import sequelize from '../Config/sequelizeClient.js'

export const dbController = express.Router()

dbController.get('/sync', async (req, res) => {
    try {
        const result = await sequelize.sync()
        res.send('Database successfully synchronized')
    }catch (error) {
        console.error(`Synchronization error: ${error}`);
        
    }
})