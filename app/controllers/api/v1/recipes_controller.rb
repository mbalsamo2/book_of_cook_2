class Api::V1::RecipesController < ApplicationController
  def index
    recipes = current_user.recipes.order(created_at: :desc)
    render json: recipes
  end

  def create
    recipe = Recipe.create!(recipe_params)
    recipe.user_id = current_user&.id

    if recipe.save
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def show
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def destroy
    recipe&.destroy
    render json: { message: 'Recipe deleted!' }
  end

  def public_book_book
    recipes = Recipe.all.order(created_at: :desc)
    render json: recipes
  end

  private

  def recipe_params
    params.permit(:name, :image, :ingredients, :instruction, :user_id)
  end

  def recipe
    @recipe ||= Recipe.find(params[:id])
  end
end
