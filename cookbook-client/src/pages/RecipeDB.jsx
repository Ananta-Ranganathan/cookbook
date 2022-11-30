import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useLoginContext } from "../LoginContext";
import {FaSearch} from 'react-icons/fa';

import React from 'react';

function RecipeDB() {

  let login = useLoginContext();
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // API REQUEST
    console.log("Search requested");
    setIngredients("Amen, praise the Lord");
  }

  const fetchDetails = async () => {
    //console.log(params.name)
    const data = await fetch(
      
      'http://localhost:8000/recipes/' + params.name, {
        method: 'GET',
      }
      
    ); // REPLACE WITH GET FROM DB
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  if (login.username ===""){
    return (
      <DetailWrapper>
        <div>
          <h2>{details.name}</h2>
        </div>
        <Info>
          <Button 
            className={activeTab==='instructions' ? 'active' : ''}
            onClick={() => setActiveTab('instructions')}
          >
            Instructions
          </Button>
          <Button 
            className={activeTab==='ingredients' ? 'active' : ''}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
            </Button>
          {activeTab === 'instructions' && (
            <div>
              <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
            </div>
          )}
          {activeTab === 'ingredients' && (
            <ul>
              {details.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
          )}
          
        </Info>
      </DetailWrapper>
    );
  }
  else {
    return (
      <DetailWrapper>
        <div>
          <h2>{details.name}</h2>
        </div>
        <Info>
          <Button 
            className={activeTab==='instructions' ? 'active' : ''}
            onClick={() => setActiveTab('instructions')}
          >
            Instructions
          </Button>
          <Button 
            className={activeTab==='ingredients' ? 'active' : ''}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
            </Button>
          {activeTab === 'instructions' && (
            <div>
              <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
            </div>
          )}
          {activeTab === 'ingredients' && (
            <ul>
              {details.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
              <FormStyle onSubmit={submitHandler}>
                <div>
                  <FaSearch />
                  <input
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder="Search for a replacement ingredient:"
                    value={input}
                  /> 
                </div>
                <StyledField type="text" name="ingredients"
                  placeholder="Replacement ingredients:"
                  value={ingredients}
                  readOnly={true}
                />
              </FormStyle>
            </ul>
          )}
        </Info>
      </DetailWrapper>
    );
  }
}

const StyledField = styled.textarea`
  margin: 1rem 0rem;
  background: BlanchedAlmond;
  width: 100%;
  height: 5rem;
  padding: 1rem 1rem;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
`;

const FormStyle = styled.form`
  margin: 0rem 0rem;
  div {
    width: 100%;
    position: relative;
  }
  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 100%
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`;

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default RecipeDB