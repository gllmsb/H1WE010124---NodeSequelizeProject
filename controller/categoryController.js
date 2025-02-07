import express from 'express'
import { categoryModel } from '../models/categoryModel.js'

export const categoryController = express.Router()

//*ROUTE TO LIST (GET ALL)
categoryController.get('/category', async (req, res) => {
    try {
        const category = await categoryModel.findAll()
        res.status(200).json(category)
    }catch (error) {
        console.error(`Could not fetch category: ${error}`)
        res.status(500).json({error: error.message})
    }
})

//*ROUTE TO DETAIL (GET)
categoryController.get('/category/:id', async (req, res) => {
    const { id } = req.params

    try {
        const category = await categoryModel.findOne({ where: { id }});

        if(!category) {
            return res.status(404).json({ message: "Could not find category"})
        }

        res.status(200).json(category)
    }catch (error) {
        console.error(`Could not fetch category: ${error}`)
        res.status(500).json({ error: error.message })
    }
})

//*ROUTE TO CREATE (CREATE)
categoryController.post('/category', async (req, res) => {
    const { name } = req.body;

    if(!name) {
        return res.status(400).json({ message: "Name is required"})
    }

    try {
        const newCategory = await categoryModel.create({ name })
        res.status(201).json({ message: "Category created successfully ", category: newCategory }) 
    }catch (error) {
        console.error(`Could not fetch category ${error}`)
        res.status(500).json({ error: error.message })
    }
})

//*ROUTE TO UPDATE (UPDATE)
categoryController.put('/category', async (req, res) => {
    const { name , id } = req.body;

    if(!id || !name) {
        return res.status(400).json({ message: "Missing required data"})
    }
    try {
        const result = await categoryModel.update({
            name
        }, {
            where: {id}
        })
        
        if( result === 0 ) {
            return res.status(404).json({ message: "Category not found or no changes made" })
        }
        return res.status(200).json({ message: "Brand updated successfully"})
    }catch (error) {
        return res.json({ message: `Could not update category ${error}`})
    }
})

//*ROUTE TO DELETE (DELETE)
categoryController.delete('/category/:id([0-9]*)', async (req, res) => {
    const { id } = req.params;

    if(id) {
        try {
            await categoryModel.destroy({
                where: { id }
            });

            res.status(200).send({
                message: `Deleted successfully`
            });
        } catch (error) {
            res.status(500).send({
                message: `Cannot delete category: ${error}`
            });
        }
    } else {
        res.status(400).send({
            message: `Invalid ID`
        })
    }
})