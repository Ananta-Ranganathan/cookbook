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
                for (let cuisine of user.cuisines) {
                    if (cuisine.cuisine === recipe.cuisine) cuisine.score = cuisine.score + 1
                }
                if (user.time.low >= recipe.time.low) {
                    user.time.low = recipe.time.low
                } else if (user.time.high <= recipe.time.high) {
                    user.time.high = recipe.time.hig
                }
                if (recipe.skill.easy) {
                    user.skills.easy = user.skills.easy + 1
                }
                if (recipe.skill.medium) {
                    user.skills.medium = user.skills.medium + 1
                }
                if (recipe.skill.hard) {
                    user.skills.hard = user.skills.hard + 1
                }
                if (recipe.restrictions.vegetarian) {
                    user.restrictions.vegetarian = user.restrictions.vegetarian + 1
                }
                if (recipe.restrictions.gluten_free) {
                    user.restrictions.gluten_free = user.restrictions.gluten_free + 1
                }
                if (recipe.restrictions.dairy_free) {
                    user.restrictions.dairy_free = user.restrictions.dairy_free + 1
                }
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
    if (req.params.username === "" || req.params.password === "") res.send(false)
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
        const user = users.findOne({"username": req.params.username})
        for (const recipe of user.customRecipes) {
            items.push(recipe)
        }
        res.send(items)
    })
})

// RECOMMENDATION

app.get('/user/:username/recommended', (req, res) => {
    const User = mongoose.model('User', userSchema)   
    mongoose.connect(uri)
    const user = User.findOne({'username': req.params.username})
    var scores = []
    if (user) {
        for (let i = 0; i < user.customRecipes.length; i++) {
            var score = 0
            for (let cuisine of user.cuisines) {
                if (cuisine.cuisine === user.customRecipes[i].cuisine) {
                    score += cuisine.score
                }
            }
            if (user.time.low <= user.customRecipes[i].time.low && user.time.high >= user.customRecipes[i].time.high) {
                score = score + 2
            } else if (user.time.low <= user.customRecipes[i].time.low || user.time.high >= user.customRecipes[i].time.high) {
                score = score + 1
            } else {
                score = score - 1
            }
            if (user.customRecipes[i].skill.easy) {
                score = score + user.skills.easy
            }
            if (user.customRecipes[i].skill.medium) {
                score = score + user.skills.medium
            }
            if (user.customRecipes[i].skill.hard) {
                score = score + user.skills.hard
            }
            if (user.customRecipes[i].restrictions.vegetarian) {
                score = score + user.restrictions.vegetarian
            }
            if (user.customRecipes[i].restrictions.gluten_free) {
                score = score + user.restrictions.gluten_free
            }
            if (user.customRecipes[i].restrictions.dairy_free) {
                score = score + user.skills.dairy_free
            }
            scores.push({score: user.customRecipes[i]._id})
        }
        scores.sort((score1, score2) => { return score1 > score2})
        scores = (scores.length < 6) ? scores.subarray(0, -1) : scores.subarray(0,5) 
        res.send(scores)
    }

})

// SUBSTITUTIONS

app.get('/substitutions/:ingredient', (req, res) => {
    // search db for ingredient
    // return list of possible substitutes
})

// CATEGORIES

app.get('/user/:username/group/:groupnumber', (req, res) => {
    const Recipe = mongoose.model('Recipe', recipeSchema)
    const User = mongoose.model('User', userSchema)   
    mongoose.connect(uri)
    const user = User.findOne({'username': req.params.username})
    if (user) {
        res.send(user.groups[req.params.groupnumber])
    }
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
        user.customRecipes.push(newRecipe)
        User.deleteOne({_id: user._id})
        user.save()
    }
})

app.post('/:username/editrecipe', (req) => {
    console.log("user " + req.params.username + "\n" + req.body)
    const Recipe = mongoose.model('Recipe', recipeSchema)
    const User = mongoose.model('User', userSchema)   
    mongoose.connect(uri)
    const user = User.findOne({'username': req.params.username})
    if (user) {
        for (let i = 0; i < user.customRecipes.length; i++) {
            if (user.customRecipes[i].name === req.body.name) {
                user.customRecipes[i].instructions = (req.body.instructions) ? req.body.instructions : user.customRecipes[i].instructions
                user.customRecipes[i].ingredients = (req.body.ingredients) ? req.body.ingredients : user.customRecipes[i].instructions
                user.customRecipes[i].notes = (req.body.notes) ? req.body.notes : user.customRecipes[i].notes
                user.save()
            }
        }
    }
})

app.post('/user/:username/addtogroup/:groupnumber/:id', (req, res) => {
    console.log("user " + req.params.username + "\n" + req.body)
    const Recipe = mongoose.model('Recipe', recipeSchema)
    const User = mongoose.model('User', userSchema)   
    mongoose.connect(uri)
    const user = User.findOne({'username': req.params.username})
    Recipe.findById(mongoose.Types.ObjectId(req.params.id), (recipe) => {
        if (user) {
            user.groups[req.params.groupnumber].push(recipe)
        }
    })
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
   groups: [[recipeSchema]],
   cuisines: [{ cuisine: String, score: Number }],
   time: Number,
   skills: { easy: Number, medium: Number, hard: Number },
   restrictions: { vegetarian: Number, gluten_free: Number, dairy_free: Number}
});
