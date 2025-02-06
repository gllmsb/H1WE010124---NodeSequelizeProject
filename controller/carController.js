import express from 'express'
import { carModel } from '../models/carModel.js'

export const carController = express.Router()

//*ROUTE TO LIST (GET ALL)
carController.get('/cars', async (req, res) => {
    try {
        const data = await carModel.findAll({
            attributes: ['id', 'brand', 'model', 'price', 'color']
        })

        if(!data || data.length === 0){
            return res.json( { message: 'No data found'} )
        }
        res.json(data)
    }catch (error) {
        console.error(`Could not get car list: ${error}`)
    }
})

//*ROUTE TO DETAILS (GET)
carController.get('/cars/:id([0-9*])', async (req, res) => {
    try {
        const { id } = req.params
        const data = await carModel.findOne({
                where: { 
                    id: id 
                },
                attributes: ['id', 'brand', 'model', 'price', 'color']
            })

            if(!data) {
                return res.json({ message: `Could not find car on id#${id}`})
            }

        return res.json(data);
        
    }catch (error) {
        console.error(`Could not get car details: ${error}`)
    }
})

//*ROUTE TO CREATE (CREATE)
carController.post('/cars', async (req, res) => {
    const {brand, model, year, price, color} = req.body;

    if(!brand || !model || !year || !price || !color) {
        return res.json({ message: 'Missing required data' })
    }

    try {
        const result = await carModel.create({
            brand, model, year, price, color
        })

        res.status(201).json(result)
    }catch (error) {
        return res.json({ message: `Could not create car: ${error}`})
    }
    
})

//*ROUTE TO UPDATE (UPDATE)
carController.put('/cars', async (req, res) => {
    const {brand, model, year, price, color, id} = req.body;

    if(!id || !brand || !model || !year || !price || !color) {
        return res.json({ message: 'Missing required data' })
    }

    try {
        const result = await carModel.update({
            brand, model, year, price, color
        }, 
            {where: {id}}
        )

        if(result) {
            res.json({ message: `Updates id#${id}`})
        }
        res.status(201).json(result)
    }catch (error) {
        return res.json({ message: `Could not update car: ${error}`})
    }
    
})

//*ROUTE TO DELETE (DELETE)
carController.delete('/cars/:id([0-9]*)', async (req, res) => {
    const { id } = req.params;

    if(id) {
        try {
            await carModel.destroy({
                where: { id }
            });

            res.status(200).send({
                message:`Deleted successfully`
            });
        } catch (error) {
            res.status(500).send({
                message: `Cannot delete car: ${error}`
            });
        }
    } else {
        res.status(400).send({
            message: `Invalid ID`
        })
    }
})