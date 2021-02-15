import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBView, MDBIcon, MDBContainer } from 'mdbreact';
import '../../assets/stylesheets/application.css'
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import defaultImage from '../../assets/images/default_image.jpg';

export default function Recipes(props) {
  const [recipes, setRecipes] = useState([]);
  const [recipesListDefault, setRecipesListDefault] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Newest');

  useEffect(() => {
    fetchRecipes(recipes)
  },[])

  useEffect(() => {
    const results = recipesListDefault.filter(recipe => {
      return recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    });
    setRecipes(results);
  }, [searchTerm])

  useEffect(() => {
    let sortedRecipes = []
    switch (filter) {
      case 'Newest':
        sortedRecipes = recipes.sort((a,b) => (a.created_at > b.created_at) ? -1 : 1)
        break;
      case 'Oldest':
        sortedRecipes = recipes.sort((a,b) => (a.created_at > b.created_at) ? 1 : -1)
        break;
      case 'Alpha':
        sortedRecipes = recipes.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
        break;
      case 'Reverse Alpha':
        sortedRecipes = recipes.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 1)
        break;
      default:
        sortedRecipes = recipes
    };
    setRecipes([...sortedRecipes]);
  }, [filter])

  const fetchRecipes = (recipes) => {
    const url = "/api/v1/recipes/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setRecipes(response)
        setRecipesListDefault(response)
      })
      .catch(() => props.history.push("/"));
  }

  const allRecipes = recipes.map((recipe, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div id="parent_card" className="card my-4 p-3 rounded z-depth-1">

        <img
          id="recipe_card_image"
          src={recipe.image ? recipe.image : defaultImage}
          className="card-img-top rounded z-depth-1"
          alt={`${recipe.name} image`}
        />

        <div className="card-body text-center p-0">

          <div id="recipe_name" className="font-weight-bold card-title">
            {recipe.name}
          </div>

          <Link
            to={`/recipe/${recipe.id}`}
            className="btn custom-button"
            id="book_blue"
          >
            View Recipe
          </Link>

        </div>
      </div>
    </div>
  ));

  const noRecipe = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No recipes yet. Why not <Link to="/new_recipe">create one</Link>
      </h4>
    </div>
  );

  const updateSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filterRecipes = (event) => {
    setFilter(event.target.value);
  }

return (
    <>
      <NavigationBar
        user={props.user}
        loggedInStatus={props.loggedInStatus}
        handleLogout={props.handleLogout}
      />
      <section className="jumbotron jumbotron-fluid text-center pb-3">
        <div className="container pt-5">
          <h4 className="display-4">Your virtual cookbook.</h4>
          <p className="lead text-muted">
          Create your very own recipes to add to your personal cookbook. Make
          a recipe private to keep those old family recipes a secret. See what
          other chefs are mixing up in the kitchen within the public cookbook
          and add any tempting recipes to your cookbook to save for later.
          There's always something new to make within The Book of Cook.
          </p>
        </div>
      </section>
      { props.loggedInStatus &&
        <div>
          <main className="container">

            <MDBRow className="mb-4">
              <MDBCol md="6">
                <div className="input-group md-form form-sm form-1 pl-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="book_blue">
                      <MDBIcon className="text-white" icon="search"/>
                    </span>
                  </div>
                  <input
                    className="form-control my-0 py-1"
                    type="text"
                    placeholder="Search for a recipe"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={updateSearch}
                  />
                </div>
              </MDBCol>

              <MDBCol md="6" style={{marginTop: "1.25em"}}>
                <div>
                 <select
                  className="browser-default custom-select"
                  value={filter}
                  onChange={filterRecipes}
                >
                   <option value="1" disabled>Order Recipes by...</option>
                   <option value="Newest">Newest</option>
                   <option value="Oldest">Oldest </option>
                   <option value="Alpha">Alphabetical A-Z</option>
                   <option value="Reverse Alpha">Alphabetical Z-A</option>
                 </select>
               </div>
             </MDBCol>
            </MDBRow>

            <div className="text-right mb-3">
              <Link
                to="/recipe"
                className="btn btn-lg btn-block"
                id="book_blue"
              >
                Create New Recipe
              </Link>
            </div>

            <MDBRow>
              {recipes.length > 0 ? allRecipes : noRecipe}
            </MDBRow>

          </main>
        </div>
      }
      { !props.loggedInStatus &&
        <div className="text-center">
          <p>
            Please login to view your personal recipes.
          </p>
        </div>
      }
    </>
  );
}
