import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import defaultImage from '../../assets/images/default_image.jpg';

export default function Recipes(props) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes(recipes)
  },[])

  const fetchRecipes = (recipes) => {
    const url = "/api/v1/recipes/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setRecipes(response))
      .catch(() => props.history.push("/"));
  }

  const allRecipes = recipes.map((recipe, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div>{recipe.name}</div>
        <img
          src={recipe.image ? recipe.image : defaultImage}
          className="card-img-top"
          alt={`${recipe.name} image`}
        />
        <div className="card-body">
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
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link
                to="/recipe"
                className="btn custom-button"
                id="book_blue"
              >
                Create New Recipe
              </Link>
            </div>
            <div className="row">
              {recipes.length > 0 ? allRecipes : noRecipe}
            </div>
          </main>
        </div>
      }
      { !props.loggedInStatus &&
        <div>
          <p>
            Please login to view your personal recipes.
          </p>
        </div>
      }
    </>
  );
}
