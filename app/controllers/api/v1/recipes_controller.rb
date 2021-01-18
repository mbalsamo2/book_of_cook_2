class Api::V1::RecipesController < ApplicationController

  def index
    recipes = current_user.recipes.order(created_at: :desc)
    render json: recipes
  end

  def create
    recipe = Recipe.new(recipe_params)
    recipe.user_id = current_user&.id
    binding.pry

    if recipe.save!
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

  def public_recipes
    recipes = Recipe.all.where(copy: false, public: true).order(created_at: :desc)
    render json: recipes
  end

  def edit
  end

  def update
    if recipe.update(recipe_params)
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  private

  def recipe_params
    params.permit(:name, :image, :ingredients, :instruction, :user_id, :copy, :public)
  end

  def recipe
    @recipe ||= Recipe.find(params[:id])
  end
end
