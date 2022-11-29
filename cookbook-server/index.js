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
    res.send('cookbook server');
})

// app.get('/recipes/category/:cat'. (req, res) => {
//     console.log("getting " + req.params.cat)
// }) 

app.get('/recipes/:id', (req, res) => {
    console.log("getting " + req.params.id)
    const Recipe = mongoose.model('Recipe', recipeSchema)   
    mongoose.connect(uri)
    Recipe.findById(mongoose.Types.ObjectId(req.params.id), (err, recipe) => {
        if (err) console.log(err)
        else {
            console.log(recipe)
            res.json(recipe)
        }
    })
})

app.post('/', (req, res) => {
    console.log(req.body)
    const Recipe = mongoose.model('Recipe', recipeSchema)
    const newRecipe = new Recipe({
        name: req.body.name,
        author: req.body.author,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        cuisine: req.body.cuisine,
        notes: req.body.notes,
        tags: req.body.tags,
        time: req.body.time,
        skill: req.body.skill,
        restrictions: req.body.restrictions
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
    notes: [String],
    tags: [String]
});

const userSchema = new mongoose.Schema({
   username: String,
   password: String,
   cuisines: [{ String: Number }],
   time: Number,
   skills: { easy: Number, medium: Number, hard: Number },
   restrictions: { vegetarian: Number, gluten_free: Number, dairy_free: Number}
});