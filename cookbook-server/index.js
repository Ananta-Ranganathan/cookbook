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
    res.send('default response from cookbook server');
})

app.get('/recipes/', (req, res) => {
    MongoClient.connect(uri, function(err, db) {
        let recipes = {}
        if (err) throw err
        var dbo = db.db("test")
        dbo.collection("recipes").find().toArray(function(err, result) {
            if (err) throw err
            for (i in result) {
                recipes[result[i]["name"]] = result[i]["ingredients"]
            }
            res.json(recipes)
            db.close()
        })
    })
})

app.listen(port, () => {
    console.log(`app running at port ${port}`);
})
