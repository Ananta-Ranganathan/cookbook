const express = require('express')

const app = express()

app.use(express.json())

const cors = require('cors')

app.use(cors())

const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config()

const MongoClient = require('mongodb').MongoClient

const uri = process.env.MONGODB_URI

const port = process.env.PORT || 8000


app.get('/', (req, res) => {
    res.send('default response from cookbook server');
})

app.get('/recipes/:id', (req, res) => {
    MongoClient.connect(uri, function(err, db) {
        let id = req.params.id
        if (err) throw err
        var dbo = db.db("test")
        res.json(dbo.collection("recipes").find({"_id": id}))
        db.close()
    })
})

app.post('/', (req, res) => {
    console.log(req.body)
    const recipe = mongoose.model('Recipe', recipeSchema)
    const newRecipe = new recipe({
        name: req.body.name,
        author: req.body.author,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        notes: req.body.notes
    })
    mongoose.connect(uri)
    newRecipe.save()
})

app.listen(port, () => {
    console.log(`app running at port ${port}`);
})

const recipeSchema = new mongoose.Schema({
    name: String,
    author: String,
    ingredients: [String],
    instructions: [String],
    cuisine: [String],
    time: { low: Number, high: Number },
    skill: { easy: Boolean, medium: Boolean, hard: Boolean},
    restrictions: { vegetarian: Boolean, gluten_free: Boolean, dairy_free: Boolean},
    notes: [String]
});

const userSchema = new mongoose.Schema({
   username: String,
   password: String,
   cuisines: [{ String: Number }],
   time: Number,
   skills: { easy: Number, medium: Number, hard: Number },
   restrictions: { vegetarian: Number, gluten_free: Number, dairy_free: Number}
});