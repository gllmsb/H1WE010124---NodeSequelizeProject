import express from 'express'
import { brandModel } from '../models/brandModel.js'

export const brandController = express.Router()

//*ROUTE TO LIST (GET ALL)
brandController.get('/brand', async (req, res) => {
    try {
        const brand = await brandModel.findAll();
        res.status(200).json(brand);
    }catch (error) {
        console.error(`Could not fetch car brands: ${error}`)
        res.status(500).json({error: error.message})
    }
})

//*ROUTE TO DETAIL (GET)
brandController.get('/brand/:id', async (req, res) => {
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
brandController.post("/brand", async (req, res) => {
    const { name, logo_url } = req.body;

    // Validation to ensure both name and logo_url are provided
    if (!name || !logo_url) {
        return res.status(400).json({ message: "Missing data required" });
    }

    try {
        // Corrected: Map logo_url to the logo field in the database
        const newBrand = await brandModel.create({ name, logo: logo_url });
        res.status(201).json({ message: "Brand created successfully", brand: newBrand });
    } catch (error) {
        console.error("Error creating brand:", error);
        res.status(500).json({ error: error.message });
    }
});



//*ROUTE TO UPDATE (UPDATE)
brandController.put('/brand', async (req, res) => {
    const { name, logo_url, id } = req.body;

    if(!id || !name || !logo_url) {
        return res.status(400).json({ message: "Missing required data"})
    }
    try {
        const result = await brandModel.update({
            name
        }, {
            where: {id}
        }
    )
    if (result === 0 ) {
        return res.status(404).json({ message: "Brand not found or no changes made"})
    }
        return res.status(200).json({ message: "Brand updated successfully"})
    }catch (error) {
        return res.json({ message: `Could not update brand: ${error}`})
    }
})

//*ROUTE TO DELETE (DELETE)
brandController.delete('/brand/:id([0-9]*)', async (req, res) => {
    const { id } = req.params;

    if(id) {
        try {
            await brandModel.destroy({
                where: { id }
            });

            res.status(200).send({
                message: `Deleted successfully`
            });
        } catch (error) {
            res.status(500).send({
                message: `Cannot delete brand: ${error}`
            });
        }
    } else {
        res.status(400).send({
            message: `Invalid ID`
        })
    }
})