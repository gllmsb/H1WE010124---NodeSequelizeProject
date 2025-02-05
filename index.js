import express from 'express'
import dotenv from 'dotenv'
import { dbController } from './controller/dbController.js'

dotenv.config()

const app = express()
const port = process.env.SERVERPORT || 4000


//Route to  root
app.get('/', (req, res) => {
    res.send('Welcome to my page');
    
})

app.use(dbController)

//Route to 404
app.get('/*', (req, res) => {
    res.send('Could not find file');
    
})

app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
    
})