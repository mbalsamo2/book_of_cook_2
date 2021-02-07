import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtnGroup } from "mdbreact";
import '../../assets/stylesheets/application.css'
import NavigationBar from "./NavigationBar";
import EditRecipe from "./EditRecipe";
import CopyRecipe from "./CopyRecipe";
import defaultImage from '../../assets/images/default_image.jpg';

export default function Recipe(props) {
  const [recipe, setRecipe] = useState({});

  useEffect( () => {
    fetchRecipe(recipe);
  }, [])

  const fetchRecipe = (recipe) => {
    const {
      match: {
        params: { id }
      }
    } = props;
    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setRecipe(response))
      .catch(() => props.history.push("/recipes"));
  }

  const addHtmlEntities = (str) => {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  const deleteRecipe = () => {
    const {
      match: {
        params: { id }
      }
    } = props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => props.history.push("/recipes"))
      .catch(error => console.log(error.message));
  }

  const editInfo = {
    pathname: `/recipe/${recipe.id}/edit`,
    recipeInfo: recipe
  }

  const copyRecipeInfo = {
    pathname: `/recipes/copy`,
    recipeInfo: recipe
  }

  let ingredientList = "No ingredients available";
  let recipeInstruction = "No instructions available";

  if (recipe.ingredients) {
    ingredientList = recipe.ingredients
      .split(",")
      .map((ingredient, index) => (
        <li id="recipe_list" key={index} className="list-group-item">
          {ingredient}
        </li>
      ));
  }

  if (recipe.instruction) {
    recipeInstruction = addHtmlEntities(recipe.instruction);
  };

  return (
    <div>
      <NavigationBar
        user={props.user}
        loggedInStatus={props.loggedInStatus}
        handleLogout={props.handleLogout}
      />

      <div className="hero position-relative d-flex align-items-center justify-content-center mt-5">
        <img
          src={recipe.image ? recipe.image : defaultImage}
          alt={`${recipe.name} image`}
          className="img-fluid position-absolute"
        />
      </div>

      <MDBContainer className="fluid">
        <MDBRow className="justify-content-center mt-3 mx-3 mb-1 text-center">
          <h1 className="display-4 position-relative text-black mb-2 font-weight-bolder"
              style={{"fontSize": "6vw"}}>
            {recipe.name}
          </h1>
          { !recipe.public &&
            <p id="private" className="position-relative font-weight-bold px-3 pb-4">
              PRIVATE
            </p>
          }
        </MDBRow>

        <div id="recipe_parent_div" className="rounded z-depth-1 ml-5 mr-5">
          <MDBRow className="justify-content-md-center">
            <div className="col-12">
              <ul className="list-group">
                <h5 className="my-3 mx-3 font-weight-bold">Ingredients</h5>
                {ingredientList}
              </ul>
            </div>
          </MDBRow>

          <MDBRow className="justify-content-center">
            <div className="col-12">
              <h5 className="my-3 mx-3 font-weight-bold">Preparation Instructions</h5>
              <div
                className="mx-4 mb-3"
                dangerouslySetInnerHTML={{
                  __html: `${recipeInstruction}`
                }}
              />
            </div>
          </MDBRow>
        </div>

        <MDBRow className="justify-content-center my-3 mx-2">
          {
            (recipe.user_id === props.user.id) &&
            <MDBBtnGroup>
              <button type="button" className="btn btn-danger mx-2" onClick={deleteRecipe}>
                Delete Recipe
              </button>

              <Link to={editInfo} className="btn btn-warning mx-2">
                Edit Recipe
              </Link>
            </MDBBtnGroup>
          }
          {
            props.user.id && (recipe.user_id !== props.user.id) &&
            <Link to={copyRecipeInfo} id="book_blue" className="btn">
              Copy to Personal Cookbook
            </Link>
          }
        </MDBRow>

      </MDBContainer>
    </div>
  );
}

// <Link to="/recipes" role="button" className="btn btn-link">
//  Back to recipes
// </Link>
