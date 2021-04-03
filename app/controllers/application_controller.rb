class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!

  def login!
    puts 'I made it to the login method'
    session[:user_id] = @user.id

    @user = User.where('username = :query OR email = :query',
                        query: application_params[:username]).first
    puts `found user in application_controller!!!!!!!!!!!!!!!!!!!`
    if @user && @user.authenticate(application_params[:password])
      update_params
      session[:user_id] = @user.id
    end
  end

  def logged_in?
    !!session[:user_id]
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def authorized_user?
    @user == current_user
  end

  def logout!
    session.clear
  end

  def fallback_index_html
    render :file => 'public/index.html'
  end

  private

  def application_params
    params.require(:user).permit(:username, :email, :password)
  end

  def update_params
    application_params["username"] = @user.username unless @user.username
    application_params["email"] = @user.email unless @user.email
  end

end
