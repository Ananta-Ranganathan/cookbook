const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config()

const MongoClient = require('mongodb').MongoClient

const uri = process.env.MONGODB_URI

mongoose.connect(uri);

const recipeSchema = new mongoose.Schema({
    name: 'string',
    ingredients: ['string'],
    instructions: ['string'],
    tags: ['string'],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// const pizza = new Recipe({ name: 'Pizza', ingredients: ['cheese', 'tomatos', 'dough'], instructions: ['bro idk', 'how to make a pizza', '?XD'], tags: ['easy', '20-30 minutes', 'vegetarian'] });

// pizza.save();

Recipe.findOne({});