import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";

export default function EditRecipe(props) {

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instruction, setInstruction] = useState("");
  const [publicRecipe, setPublicRecipe] = useState(true);

  useEffect( () => {
    setRecipeInfo();
  }, [])

  const setRecipeInfo = () => {
    let recipeInfo = props.location.recipeInfo
    setName(recipeInfo.name)
    setIngredients(recipeInfo.ingredients)
    setInstruction(recipeInfo.instruction)
    setPublicRecipe(recipeInfo.public)
  }

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  const onChangeName = (event) => {
    setName(event.target.value);
  }

  const onChangeIngredients = (event) => {
    setIngredients(event.target.value);
  }

  const onChangeInstruction = (event) => {
    setInstruction(event.target.value);
  }

  const onChangePublicRecipe = (event) => {
    setPublicRecipe(!publicRecipe);
  };

  const onSubmit = (event) => {
    let id = props.match.params.id
    event.preventDefault();
    const url = `/api/v1/recipes/${id}/update`;

    if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
      return;

    const body = {
      name,
      ingredients,
      instruction: instruction.replace(/\n/g, "<br> <br>"),
      public: publicRecipe,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => props.history.push(`/recipe/${response.id}`))
      .catch(error => console.log(error.message));
  }


  return (
    <div className="container mt-5">
      <NavigationBar
        user={props.user}
        loggedInStatus={props.loggedInStatus}
        handleLogout={props.handleLogout}
      />
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            How can we make this recipe even better?
          </h1>
          <form onSubmit={onSubmit}>
            <div className="checkbox">
              <input
                type="checkbox"
                data-toggle="toggle"
                name="public"
                id="recipePublic"
                checked={!publicRecipe}
                onChange={onChangePublicRecipe}
              />
              <label> Make this recipe private </label>
            </div>
            <div className="form-group">
              <label htmlFor="recipeName">Recipe name</label>
              <input
                type="text"
                name="name"
                id="recipeName"
                className="form-control"
                defaultValue={name}
                required
                onChange={onChangeName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeIngredients">Ingredients</label>
              <input
                type="text"
                name="ingredients"
                id="recipeIngredients"
                className="form-control"
                defaultValue={ingredients}
                required
                onChange={onChangeIngredients}
              />
              <small id="ingredientsHelp" className="form-text text-muted">
                Separate each ingredient with a comma.
              </small>
            </div>
            <label htmlFor="instruction">Preparation Instructions</label>
            <textarea
              className="form-control"
              id="instruction"
              name="instruction"
              rows="5"
              defaultValue={instruction}
              required
              onChange={onChangeInstruction}
            />
            <button type="submit" className="btn custom-button mt-3">
              Update Recipe
            </button>
            <Link to="/recipes" className="btn btn-link mt-3">
              Back to recipes
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
