import React from 'react';
import Home from './Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import AddRecipe from './AddRecipe';
import Login from './Login';


// different element is displayed based on which path is active (default '/')

function Pages() {
    return (
        <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path="/cuisine/:type" element={<Cuisine />} />
            <Route path="/searched/:search" element={<Searched />} />
            <Route path="/recipe/:name" element={<Recipe />} />
            <Route path="/addrecipe/" element={<AddRecipe />} />
            <Route path="/login/" element={<Login />} />
        </Routes>
    );
}

export default Pages
