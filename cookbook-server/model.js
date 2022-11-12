const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config()

const MongoClient = require('mongodb').MongoClient

const uri = process.env.MONGODB_URI

mongoose.connect(uri);

const tagSchema = new mongoose.Schema({
    cuisine: String,
    time:  {low: Number, high: Number},
    skill: {easy: Boolean, medium: Boolean, hard: Boolean},
    restrictions: {vegetarian: Boolean, gluten_free: Boolean, dairy_free: Boolean},
})

const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    instructions: [String],
    tags: tagSchema,
});

const Recipe = mongoose.model('Recipe', recipeSchema);