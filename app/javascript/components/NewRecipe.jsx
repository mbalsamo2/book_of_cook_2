import { Link } from "react-router-dom";
import React, { useState } from "react";
import NavigationBar from "./NavigationBar";

export default function NewRecipe(props) {

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instruction, setInstruction] = useState("");
  const [publicRecipe, setPublicRecipe] = useState(true);
  const [recipeImage, setRecipeImage] = useState("");

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
    event.preventDefault();
    const url = "/api/v1/recipes/create";

    if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
      return;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('ingredients', ingredients);
      formData.append('instruction', instruction.replace(/\n/g, "<br> <br>"));
      formData.append('copy', false);
      formData.append('public', publicRecipe);
      formData.append('image', recipeImage);

    // const body = {
    //   name,
    //   ingredients,
    //   instruction: instruction.replace(/\n/g, "<br> <br>"),
    //   copy: false,
    //   public: publicRecipe,
    //   image: recipeImage
    // };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      // headers: {
      //   "X-CSRF-Token": token,
      //   "Content-Type": "application/json"
      // },
      body: formData //JSON.stringify(body)
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

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (event) => {
    const [file] = event.target.files;
    if (file) {
      const reader = new FileReader();
      const {current} = uploadedImage;
      setRecipeImage(file);
      current.file = file;
      reader.onload = (event) => {
        current.src = event.target.result;
      }
      reader.readAsDataURL(file);
    }
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
            <label htmlFor="instruction">Preparation Instructions</label>
            <textarea
              className="form-control"
              id="instruction"
              name="instruction"
              rows="5"
              required
              onChange={onChangeInstruction}
            />
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{display:"none"}}
              />
              <div
                style={{
                  height: "60px",
                  width: "60px",
                  border: "2px dashed black"
                }}
                onClick={() => imageUploader.current.click()}
              >
                <img
                  ref={uploadedImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute"
                  }}
                />
              </div>
              Click to Upload Image
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Create Recipe
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
