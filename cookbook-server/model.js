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


/* NEED TO STRUCTURE JSON RESPONSE AS SIMILAR TO:
   "recipes":[
      {
         "vegetarian":true,
         "vegan":false,
         "glutenFree":true,
         "dairyFree":false,
         "veryHealthy":false,
         "cheap":false,
         "veryPopular":true,
         "sustainable":false,
         "lowFodmap":false,
         "weightWatcherSmartPoints":25,
         "gaps":"no",
         "preparationMinutes":-1,
         "cookingMinutes":-1,
         "aggregateLikes":19636,
         "healthScore":7,
         "creditsText":"Full Belly Sisters",
         "license":"CC BY-SA 3.0",
         "sourceName":"Full Belly Sisters",
         "pricePerServing":154.74,
         "extendedIngredients":[
            {
               "id":19904,
               "aisle":"Sweet Snacks",
               "image":"dark-chocolate-pieces.jpg",
               "consistency":"SOLID",
               "name":"dark chocolate",
               "nameClean":"dark chocolate",
               "original":"2 ounces dark chocolate, at least 70% cocoa",
               "originalName":"dark chocolate, at least 70% cocoa",
               "amount":2.0,
               "unit":"ounces",
               "meta":[
                  "dark",
                  "70%"
               ],
               "measures":{
                  "us":{
                     "amount":2.0,
                     "unitShort":"oz",
                     "unitLong":"ounces"
                  },
                  "metric":{
                     "amount":56.699,
                     "unitShort":"g",
                     "unitLong":"grams"
                  }
               }
            },
            {
               "id":1077,
               "aisle":"Milk, Eggs, Other Dairy",
               "image":"milk.png",
               "consistency":"LIQUID",
               "name":"milk",
               "nameClean":"milk",
               "original":"1/2 cup milk",
               "originalName":"milk",
               "amount":0.5,
               "unit":"cup",
               "meta":[
                  
               ],
               "measures":{
                  "us":{
                     "amount":0.5,
                     "unitShort":"cups",
                     "unitLong":"cups"
                  },
                  "metric":{
                     "amount":118.294,
                     "unitShort":"ml",
                     "unitLong":"milliliters"
                  }
               }
            },
            {
               "id":12151,
               "aisle":"Nuts;Savory Snacks",
               "image":"pistachios.jpg",
               "consistency":"SOLID",
               "name":"pistachios",
               "nameClean":"pistachio nuts",
               "original":"1/4 cup pistachios, raw",
               "originalName":"pistachios, raw",
               "amount":0.25,
               "unit":"cup",
               "meta":[
                  "raw"
               ],
               "measures":{
                  "us":{
                     "amount":0.25,
                     "unitShort":"cups",
                     "unitLong":"cups"
                  },
                  "metric":{
                     "amount":59.147,
                     "unitShort":"ml",
                     "unitLong":"milliliters"
                  }
               }
            },
            {
               "id":1036,
               "aisle":"Cheese",
               "image":"ricotta.png",
               "consistency":"SOLID",
               "name":"ricotta",
               "nameClean":"ricotta cheese",
               "original":"1 3/4 cups good-quality ricotta",
               "originalName":"good-quality ricotta",
               "amount":1.75,
               "unit":"cups",
               "meta":[
                  
               ],
               "measures":{
                  "us":{
                     "amount":1.75,
                     "unitShort":"cups",
                     "unitLong":"cups"
                  },
                  "metric":{
                     "amount":414.029,
                     "unitShort":"ml",
                     "unitLong":"milliliters"
                  }
               }
            },
            {
               "id":2047,
               "aisle":"Spices and Seasonings",
               "image":"salt.jpg",
               "consistency":"SOLID",
               "name":"salt",
               "nameClean":"table salt",
               "original":"small pinch of salt",
               "originalName":"salt",
               "amount":1.0,
               "unit":"small pinch",
               "meta":[
                  
               ],
               "measures":{
                  "us":{
                     "amount":1.0,
                     "unitShort":"small pinch",
                     "unitLong":"small pinch"
                  },
                  "metric":{
                     "amount":1.0,
                     "unitShort":"small pinch",
                     "unitLong":"small pinch"
                  }
               }
            },
            {
               "id":19335,
               "aisle":"Baking",
               "image":"sugar-in-bowl.png",
               "consistency":"SOLID",
               "name":"sugar",
               "nameClean":"sugar",
               "original":"1/2 cup sugar",
               "originalName":"sugar",
               "amount":0.5,
               "unit":"cup",
               "meta":[
                  
               ],
               "measures":{
                  "us":{
                     "amount":0.5,
                     "unitShort":"cups",
                     "unitLong":"cups"
                  },
                  "metric":{
                     "amount":118.294,
                     "unitShort":"ml",
                     "unitLong":"milliliters"
                  }
               }
            },
            {
               "id":2050,
               "aisle":"Baking",
               "image":"vanilla-extract.jpg",
               "consistency":"LIQUID",
               "name":"vanilla",
               "nameClean":"vanilla extract",
               "original":"1/2 tsp vanilla",
               "originalName":"vanilla",
               "amount":0.5,
               "unit":"tsp",
               "meta":[
                  
               ],
               "measures":{
                  "us":{
                     "amount":0.5,
                     "unitShort":"tsps",
                     "unitLong":"teaspoons"
                  },
                  "metric":{
                     "amount":0.5,
                     "unitShort":"tsps",
                     "unitLong":"teaspoons"
                  }
               }
            }
         ],
         "id":716410,
         "title":"Cannoli Ice Cream w. Pistachios & Dark Chocolate",
         "readyInMinutes":45,
         "servings":3,
         "sourceUrl":"http://fullbellysisters.blogspot.com/2012/08/cannoli-ice-cream-w-pistachios-dark.html",
         "image":"https://spoonacular.com/recipeImages/716410-556x370.jpg",
         "imageType":"jpg",
         "summary":"This recipe makes 3 servings with <b>576 calories</b>, <b>21g of protein</b>, and <b>33g of fat</b> each. For <b>$1.55 per serving</b>, this recipe <b>covers 15%</b> of your daily requirements of vitamins and minerals. Head to the store and pick up ricotta, milk, pistachios, and a few other things to make it today. It can be enjoyed any time, but it is especially good for <b>Summer</b>. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. Many people made this recipe, and 19636 would say it hit the spot. It is a good option if you're following a <b>gluten free and vegetarian</b> diet. All things considered, we decided this recipe <b>deserves a spoonacular score of 67%</b>. This score is good. Try <a href=\"https://spoonacular.com/recipes/chocolate-dipped-cannoli-with-pistachios-355861\">Chocolate-Dipped Cannoli with Pistachios</a>, <a href=\"https://spoonacular.com/recipes/soft-cannoli-cookie-sandwiches-with-almond-orange-and-dark-chocolate-683998\">Soft Cannoli Cookie Sandwiches with Almond, Orange, and Dark Chocolate</a>, and <a href=\"https://spoonacular.com/recipes/dark-white-chocolate-chip-oatmeal-cookies-with-pistachios-and-dried-bluberries-608097\">Dark & White Chocolate Chip Oatmeal Cookies with Pistachios and Dried Bluberries</a> for similar recipes.",
         "cuisines":[
            
         ],
         "dishTypes":[
            "lunch",
            "main course",
            "main dish",
            "dinner"
         ],
         "diets":[
            "gluten free",
            "lacto ovo vegetarian"
         ],
         "occasions":[
            "summer"
         ],
         "instructions":"",
         "analyzedInstructions":[
            
         ],
         "originalId":null,
         "spoonacularSourceUrl":"https://spoonacular.com/cannoli-ice-cream-w-pistachios-dark-chocolate-716410"
      },
*/