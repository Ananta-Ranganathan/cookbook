import React from 'react';
import Landing from './Landing';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import AddRecipe from './AddRecipe';
import Login from './Login';
import CreateUser from './CreateUser';
import RecipeDB from "./RecipeDB";


// different element is displayed based on which path is active (default '/')

function Pages() {
    return (
        <Routes>
            <Route path='/' element={<Landing />} /> 
            <Route path="/cuisine/:type" element={<Cuisine />} />
            <Route path="/searched/:search" element={<Searched />} />
            <Route path="/recipe/:name" element={<Recipe />} />
            <Route path="/addrecipe/" element={<AddRecipe />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/createuser/" element={<CreateUser />} />
            <Route path="/recipedb/:name" element={<RecipeDB />} />
        </Routes>
    );
}

export default Pages
