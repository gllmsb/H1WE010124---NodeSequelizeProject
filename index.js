import express from 'express'
import dotenv from 'dotenv'
import { dbController } from './controller/dbController.js'
import { carController } from './controller/carController.js'
import { brandController } from './controller/brandController.js'

dotenv.config()

const app = express()
const port = process.env.SERVERPORT || 4242
app.use(express.urlencoded({ extended: true }))


//Route to  root
app.get('/', (req, res) => {
    res.send('Welcome to my page');
    
})

app.use(dbController, carController, brandController)

//Route to 404
app.get('*', (req, res) => {
    res.send('Could not find file');
    
})

app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
    
})