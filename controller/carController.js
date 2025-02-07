import express from 'express'
import { carModel } from '../models/carModel.js'
import { brandModel } from '../models/brandModel.js'
import { categoryModel } from '../models/categoryModel.js'

export const carController = express.Router()

//*RELATIONS
carModel.belongsTo(brandModel, {
    foreignKey: {
        allowNull: false
    }
})

brandModel.hasMany(carModel)

carModel.belongsTo(categoryModel, {
    foreignKey: {
        allowNull: false
    }
})

categoryModel.hasMany(carModel)

//*ROUTE TO LIST (GET ALL)
carController.get('/cars', async (req, res) => {
    try {
        const data = await carModel.findAll({
            include: [
            {
                model: brandModel, 
            },
            {
                model: categoryModel, 
                attributes: ['id', 'name']
            },
        ]
            
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
                include: [
                    {
                        model: brandModel, 
                        attributes: ['id', 'model', 'price', 'color']
                    },
                    {
                        model: categoryModel, 
                        attributes: ['id', 'name']
                    },
                ]
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
    const {brand_id: brandId, category_id: categoryId, model, year, price, color} = req.body;

    if(!brandId || !categoryId || !model || !year || !price || !color) {
        return res.json({ message: 'Missing required data' })
    }

    try {
        const result = await carModel.create({
            brandId, categoryId, model, year, price, color
        })

        res.status(201).json(result)
    }catch (error) {
        return res.json({ message: `Could not create car: ${error}`})
    }
    
})

//*ROUTE TO UPDATE (UPDATE)
carController.put('/cars', async (req, res) => {
    const {brand_id: brandId, category_id: categoryId, model, year, price, color, id} = req.body;

    if(!id || !brandId || !categoryId || !model || !year || !price || !color) {
        return res.json({ message: 'Missing required data' })
    }

    try {
        const result = await carModel.update({
            brandId, categoryId, model, year, price, color
        }, 
            {where: {id}}
        )

        if(result[0] === 0) {
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