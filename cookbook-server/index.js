const express = require('express')

const app = express()

const cors = require('cors')

app.use(cors())

const dotenv = require('dotenv')

dotenv.config()

const MongoClient = require('mongodb').MongoClient

const uri = process.env.MONGODB_URI

const port = process.env.PORT || 8000

app.get('/', (req, res) => {
        res.send('hello anata');
})

app.listen(port, () => {
    console.log('hi anata')
})
