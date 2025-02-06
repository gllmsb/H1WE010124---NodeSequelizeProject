import express from 'express'
import { brandModel } from '../models/brandModel'

export const brandController = express.Router()

//*ROUTE TO LIST (GET ALL)
brandController.get("/brand", async (req, res) => {
    try {
        const brands = await brandModel.findAll();
        res.status(200).json(brands);
    }catch (error) {
        console.error(`Could not fetch car brands: ${error}`)
        res.status(500).json({error: error.message})
    }
})

//*ROUTE TO DETAIL (GET)
brandController.get("/brand/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const brand = await brandModel.findOne({ where: { id }});

        if (!brand ) {
            return res.status(404).json({ message: "Could not find brand"});
        }

        res.status(200).json(brand);
    }catch (error) {
        console.error(`Could not fetch brand: ${error}`)
        res.status(500).json({ error: error.message });
    }
})

//*ROUTE TO CREATE (CREATE)
// brandController.post 
