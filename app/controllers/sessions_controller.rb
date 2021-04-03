class SessionsController < ApplicationController
  before_action :current_user, :update_session

  def create
    @user = User.where('username = :query OR email = :query',
                        query: session_params[:username]).first

    if @user && @user.authenticate(session_params[:password])
      update_params
      session[:user_id] = @user.id

      render json: {
        logged_in: true,
        user: UserSerializer.new(@user).as_json
      }
    else
      render json: {
        status: 401,
        errors: ['no such user', 'verify credentials and try again or signup']
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

  def destroy
    logout!
    render json: {
      status: 200,
      logged_out: true
    }
  end

  private

  def session_params
    params.require(:user).permit(:username, :email, :password)
  end

  def update_params
    session_params["username"] = @user.username unless @user.username
    session_params["email"] = @user.email unless @user.email
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
