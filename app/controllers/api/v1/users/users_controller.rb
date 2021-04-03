class Api::V1::Users::UsersController < ApplicationController
  before_action :current_user, :update_session

  def index
    @users = User.all
    if @users
      render json: {
        users: @users
      }
    else
      render json: {
        status: 500,
        errors: ['no users found']
      }
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      render json: @user
    else
      render json: {
        status: 500,
        errors: ['user not found']
      }
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!
      render json: {
        status: :created,
        user: @user
      }
    else
      render json: {
        status: 500,
        errors: @user.errors.full_messages
      }
    end
  end

  def is_logged_in?
    if logged_in? && current_user
      render json: {
        logged_in: true,
        user: current_user
      }
    else
      render json: {
        logged_in: false,
        message: 'no such user'
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def current_user
    if session[:user_id] || session["user_id"]
      @current_user ||= User.find(session[:user_id])
    end
  end

  def update_session
    if @current_user
      session[:user_id] = @current_user.id
    elsif @user
      session[:user_id] = @user.id
    end
  end

end
