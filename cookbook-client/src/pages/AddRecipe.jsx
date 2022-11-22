import { React, useState, Component, useEffect } from "react";
import styled from 'styled-components';


function AddRecipe () {
  const [addName, setName] = useState("");
  const [addAuthor, setAuthor] = useState("");
  const [addIngredients, setIngredients] = useState("");
  const [addInstructions, setInstructions] = useState("");
  const [addNotes, setNotes] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const recipedata = {
      name: addName,
      author: addAuthor,
      ingredients: addIngredients.split(',').map(elements => elements.trim()),
      instructions: addInstructions.split('\n').map(elements => elements.trim()),
      notes: addNotes.split('\n').map(elements => elements.trim()),
    };

    console.log(recipedata);
  }

  return (
    <StyledField>
      <h4>ADD RECIPE INFORMATION</h4>
      <ColoredLine color="black" />
      <input 
        type="text"
        name="name"
        placeholder="Recipe Name"
        value={addName}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        name="author"
        placeholder="Author Name"
        value={addAuthor}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        name="ingredients"
        placeholder="Ingredients (please separate with commas)"
        value={addIngredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <StyledInput
        type="text"
        name="instructions"
        placeholder="Instructions (please separate with a newline character)"
        value={addInstructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
      <StyledInput
        type="text"
        name="notes"
        placeholder="Additional notes"
        value={addNotes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="button" onClick={handleSubmit}>Submit</button>
    </StyledField>
  )
};

const ColoredLine = ({ color }) => (
  <hr
    style={{
      margin: 10,
      color: color,
      backgroundColor: color,
      height: 3
    }}
  />
);

const StyledField = styled.form`
  margin: rem 0rem;
  div {
    width: 100%;
    position: relative;
  }
  input {
    margin: 0.5rem 0rem;
    background: BlanchedAlmond;
    font-size: 1rem;
    color: black;
    padding: 1rem 1rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 75%;
  }
`;

const StyledInput = styled.textarea`
  margin: 0.5rem 0rem;
  background: BlanchedAlmond;
  width: 100%;
  height: 10rem;
  padding: 1rem 1rem;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
`;

export default AddRecipe;