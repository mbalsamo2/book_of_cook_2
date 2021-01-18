import { Link } from "react-router-dom";
import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import defaultRecipe from '../../assets/images/recipes_default.jpg';
import axios from 'axios'

export default function NewRecipe(props) {

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instruction, setInstruction] = useState("");
  const [publicRecipe, setPublicRecipe] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [recipeImage, setRecipeImage] = useState(null);

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

  const onChangeImage = async event => {
    const file = event.target.files[0];
    if (!file) return;

    const payload = await fetch(`http://localhost:3001/s3/direct_post`).then(res =>
      res.json()
    );

    const url = payload.url;
    const formData = new FormData();

    Object.keys(payload.fields).forEach(key =>
      formData.append(key, payload.fields[key])
    );
    formData.append('file', file);

    const xml = await fetch(url, {
      method: 'POST',
      body: formData
    }).then(res => res.text());

    const uploadUrl = new DOMParser()
      .parseFromString(xml, 'application/xml')
      .getElementsByTagName('Location')[0].textContent;

      setRecipeImage(uploadUrl)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/recipes/create";

    if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
      return;
      // const recipeFormData = new FormData();
      //
      // recipeFormData.append('name', name);
      // recipeFormData.append('ingredients', ingredients);
      // recipeFormData.append('instruction', instruction.replace(/\n/g, "<br> <br>"));
      // recipeFormData.append('copy', false);
      // recipeFormData.append('public', publicRecipe);

      // if (recipeImage !== null) {
      //   recipeFormData.append('image', recipeImage);
      // }

      // formData.append('image', recipeImage);

    const body = {
      name,
      ingredients,
      instruction: instruction.replace(/\n/g, "<br> <br>"),
      copy: false,
      public: publicRecipe,
      image: recipeImage
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body) //recipeFormData //JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => props.history.push(`/recipe/${response.id}`))
      .catch(error => console.log(error.message));
  };

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
            Add a new recipe to our awesome recipe collection.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="checkbox">
              <input
                type="checkbox"
                data-toggle="toggle"
                name="public"
                id="recipePublic"
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
                required
                onChange={onChangeIngredients}
              />
              <small id="ingredientsHelp" className="form-text text-muted">
                Separate each ingredient with a comma.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="instruction">Preparation Instructions</label>
              <textarea
              className="form-control"
              id="instruction"
              name="instruction"
              rows="5"
              required
              onChange={onChangeInstruction}
              />
            </div>

            <div className="form-group">
              <label htmlFor="recipeImage">Image</label>
              <input
                type="file"
                onChange={onChangeImage}
              />
            </div>

            <button type="submit" className="btn custom-button mt-3">
              Create Recipe
            </button>
          </form>
          <Link to="/recipes" className="btn btn-link mt-3">
          Back to recipes
          </Link>
        </div>
      </div>
    </div>
  );
}
