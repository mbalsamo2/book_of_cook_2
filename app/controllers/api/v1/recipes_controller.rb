class Api::V1::RecipesController < ApplicationController
  attr_accessor :user
  before_action :current_user

  def index
    if current_user
      recipes = current_user.recipes.order(created_at: :desc)
    else
      recipes = Recipe.all.where(copy: false, public: true).order(created_at: :desc)
    end
    render json: recipes
  end

  def create
    recipe = Recipe.new(recipe_params)
    recipe.user_id = current_user&.id

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

  def current_user
    if session[:user_id] || session["user_id"]
      @current_user ||= User.find(session[:user_id])
    end
  end
end
