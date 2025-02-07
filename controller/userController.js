import express from 'express'
import { userModel } from '../models/userModel.js'

export const userController = express.Router()


//*ROUTE TO LIST (GET ALL)
userController.get('/user', async (req, res) => {
    try {
      const user = await userModel.findAll();
      
      if (!user || user.length === 0) {
          res.json({ message: 'No data found'});
      }
      res.json(user)

    } catch (error) {
      console.error(`Could not get users: ${error}`);
    }
  });

//*ROUTE TO DETAILS 
userController.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findOne({
            where: { id }});

        if (!user) {
            return res.status(404).json({ message: "Could not find user"})
        }

        res.status(200).json(user);
    }catch (error) {
        console.error(`Could not fetch user: ${error}`)
        res.status(500).json({ error: error.message})
    }
});


//*ROUTE TO CREATE (CREATE)
userController.post('/user', async (req, res) => {
    const { firstname, lastname, email, password, refresh_token, is_active } = req.body;

    if (!firstname || !lastname || !email || !password || !refresh_token || !is_active) {
        return res.status(400).json({ message: "Missing data required" });
    }

    try {
        const user = await userModel.create({
            firstname,
            lastname,
            email,
            password,
            refresh_token,
            is_active
        })

        res.status(201).json({ message: 'User created successfully', user })
    }catch (error) {
        res.status(500).json({ message: `Could not create user: ${error}`})
    }
})

//*ROUTE TO UPDATE (UPDATE)
userController.put('/user', async (req, res) => {
    const {id, firstname, lastname, email, password, refresh_token, is_active} = req.body;

    if( !id || !firstname || !lastname|| !email || !password || !refresh_token || !is_active) {
        return res.status(400).json({ message: "Missing required data"})
    }
    try {
        const result = await userModel.update({
            firstname,
            lastname,
            email,
            password,
            refresh_token,
            is_active
        }, {
            where: {id}
        }
    )
    if (result === 0 ) {
        return res.status(404).json({ message: "User not found or no changes made"})
    }
        return res.status(200).json({ message: "User updated successfully"})
    }catch (error) {
        return res.json({ message: `Could not update user: ${error}`})
    }
})

//*ROUTE TO DELETE (DELETE)
userController.delete('/user/:id([0-9]*)', async (req, res) => {
    const { id } = req.params;

    if(id) {
        try {
            await userModel.destroy({
                where: { id }
            });

            res.status(200).send({
                message: `Deleted successfully`
            });
        } catch (error) {
            res.status(500).send({
                message: `Cannot delete user: ${error}`
            });
        }
    } else {
        res.status(400).send({
            message: `Invalid ID`
        })
    }
})

