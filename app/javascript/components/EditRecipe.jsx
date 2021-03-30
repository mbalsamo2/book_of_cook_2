import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";
import '../../assets/stylesheets/application.css'
import NavigationBar from "./NavigationBar";

export default function EditRecipe(props) {

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instruction, setInstruction] = useState("");
  const [publicRecipe, setPublicRecipe] = useState(true);
  const [recipeImage, setRecipeImage] = useState(null);

  useEffect( () => {
    setRecipeInfo();
  }, [])

  const setRecipeInfo = () => {
    let recipeInfo = props.location.recipeInfo
    setName(recipeInfo.name)
    setIngredients(recipeInfo.ingredients)
    setInstruction(recipeInfo.instruction)
    setPublicRecipe(recipeInfo.public)
    setRecipeImage(recipeInfo.image)
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

  const onChangeImage = async event => {
    const file = event.target.files[0];
    if (!file) return;

    const payload = await fetch(`${window.location.origin}/s3/direct_post`).then(res =>
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
      image: recipeImage
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
    <div>
      <NavigationBar
        user={props.user}
        loggedInStatus={props.loggedInStatus}
        handleLogout={props.handleLogout}
      />

      <MDBContainer className="justify-content-center mb-5" style={{"marginTop": "8em"}}>
        <MDBRow className="justify-content-center">
          <MDBCard className="justify-content-center">
            <MDBCardBody>
              <form onSubmit={onSubmit}>
                <h2 className="font-weight-normal mb-3 justify-content-center text-center">
                  How can we make this recipe even better?
                </h2>

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

                <div className="form-group">
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
                </div>

                <div className="input-group my-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupFileAddon01">
                      Add Image
                    </span>
                  </div>
                  <div className="custom-file">
                    <input
                      onChange={onChangeImage}
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                      Choose file
                    </label>
                  </div>
                </div>

                <div className="custom-control custom-checkbox pl-0 mt-2">
                  <input
                    type="checkbox"
                    className="custon-control-input text-left mx-1"
                    data-toggle="toggle"
                    name="public"
                    id="recipePublic"
                    checked={!publicRecipe}
                    onChange={onChangePublicRecipe}
                  />
                  <label className="custon-control-label mx-1">Make this recipe private </label>
                </div>


                <button id="book_blue" type="submit" className="btn custom-button mt-3">
                  Update Recipe
                </button>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
