import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import EditRecipe from "./EditRecipe";
import CopyRecipe from "./CopyRecipe";

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
        <li key={index} className="list-group-item">
          {ingredient}
        </li>
      ));
  }

  if (recipe.instruction) {
    recipeInstruction = addHtmlEntities(recipe.instruction);
  };

  // const readImage = (recipe) => {
  //   debugger;
  //   const reader = new FileReader();
  //   const {current} = recipe.image;
  //   current.file = recipe.image;
  //   reader.onload = (event) => {
  //     current.src = event.target.result;
  //   }
  //   reader.readAsDataURL(recipe.image);
  // }

  return (
    <div className="">
      <NavigationBar
        user={props.user}
        loggedInStatus={props.loggedInStatus}
        handleLogout={props.handleLogout}
      />
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img
          src={recipe.image}
          alt={`${recipe.name} image`}
          className="img-fluid position-absolute"
        />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {recipe.name}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div>
            <h4 className="mb-2">This recipe is: {recipe.public ? "Public" : "Private"}</h4>
          </div>
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <h5 className="mb-2">Ingredients</h5>
              {ingredientList}
            </ul>
          </div>
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Preparation Instructions</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${recipeInstruction}`
              }}
            />
          </div>
          {
            (recipe.user_id === props.user.id) &&
            <div>
              <div className="col-sm-12 col-lg-2">
                <button type="button" className="btn btn-danger" onClick={deleteRecipe}>
                  Delete Recipe
                </button>
              </div>
              <Link to={editInfo} className="btn btn-warning">
                Edit Recipe
              </Link>
            </div>
          }
          {
            (recipe.user_id !== props.user.id) &&
            <Link to={copyRecipeInfo} className="btn btn-warning">
              Copy to Personal Cookbook
            </Link>
          }
        </div>
        <Link to="/recipes" role="button" className="btn btn-link">
          Back to recipes
        </Link>
      </div>
    </div>
  );
}
