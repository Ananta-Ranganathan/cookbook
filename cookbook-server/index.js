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

// READ RECIPES

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

app.get('/user/:username/recipes/:id', (req, res) => {
    console.log(`finding user ${req.params.username} custom version of ${req.params.recipename}`)
    const User = mongoose.model('User', userSchema)   
    mongoose.connect(uri)
    const user = User.findOne({'username': req.params.username}, (err, user) => {
        let found = false
        for (const recipe of user.customRecipes) {
            if (recipe._id === mongoose.Types.ObjectId(req.params.id)) {
                res.json(recipe)
                found = true
                // update internal scores for rec engine
            }
        }
        if (!found) {
            const Recipe = mongoose.model('Recipe', recipeSchema)   
            mongoose.connect(uri)
            Recipe.findById(mongoose.Types.ObjectId(req.params.id), (err, recipe) => {
                if (err) console.log(err)
                else {
                    console.log(recipe)
                    res.json(recipe)
                }
            })
        }
    })
})

// LOGIN

app.get('/user/:username/password/:password', (req, res) => {
    console.log("finding user " + req.params.username + " with password attempt " + req.params.password)
    const User = mongoose.model('User', userSchema)   
    mongoose.connect(uri)
    User.findOne({'username': req.params.username}, (err, user) => {
        if (user) {
            res.send(user.password === req.params.password)
        } else {
            res.send(false)
        }
    })
})

app.get('/createuser/:username/password/:password', (req, res) => {
    console.log("creating user " + req.params.username + " with password " + req.params.password)
    const User = mongoose.model('User', userSchema)   
    mongoose.connect(uri)
    User.findOne({'username': req.params.username}, (err, user) => {
        if (user) {
            res.send(false)
        } else {
            const newUser = new User({
                username: req.params.username,
                password: req.params.password,
            })
            newUser.save()
            res.send(true)
        }
    })
})

// SEARCH

app.get('/searchrecipes/:query', (req, res) => {
    MongoClient.connect(uri, (err, db) => {
        const recipes = db.db("test").collection("recipes")
        var items = []
        const cursor = recipes.find({$text: {$search: req.params.query}})
        cursor.forEach((item) => {
            items.push(item)
        }).then(() => {
            res.send(items)
        })
        // figure out how to search over the non text fields
    })
})

app.get('/user/:username/searchrecipes/:query', (req, res) => {
    // search all the recipes (including user custom ones) for instance of text query
    // return name for link, objectid for ref, and whether or not it is user specific
    MongoClient.connect(uri, (err, db) => {
        const recipes = db.db("test").collection("recipes")
        recipes.find({$text: {$search: req.params.query}}).forEach((item) => res.send(item))
        const users = db.db("test").collection("users")
        var items = []
        users.findOne({"username": req.params.username}, (err, user) => {
            for (const recipe of user.customRecipes) {
                // might have to manually check each field to find matches for query
                items.push(recipe)
            }
        }).then(() => {
            res.send(items)
        })
        // figure out how to search over the non text fields (maybe manually do it for each document? sounds suboptimal but may be necessary)
    })
})

// RECOMMENDATION

app.get('/user/:username/recommended', (req, res) => {
    // use fields of user to produce score for each recipe
    // return top n recipes
})

// SUBSTITUTIONS

app.get('/substitutions/:ingredient', (req, res) => {
    // search db for ingredient
    // return list of possible substitutes
})

// RECIPE CREATION

app.post('/', (req) => {
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

app.post('/:username', (req) => {
    console.log("user " + req.params.username + "\n" + req.body)
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
    const User = mongoose.model('User', userSchema)   
    mongoose.connect(uri)
    const user = User.findOne({'username': req.params.username})
    if (user) {
        user.customRecipes += newRecipe
        user.save()
    }
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
   customRecipes: [recipeSchema],
   cuisines: [{ String: Number }],
   time: Number,
   skills: { easy: Number, medium: Number, hard: Number },
   restrictions: { vegetarian: Number, gluten_free: Number, dairy_free: Number}
});
