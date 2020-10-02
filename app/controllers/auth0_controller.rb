def callback
  # This stores all the user information that came from Auth0
  # and the IdP
  session[:userinfo] = request.env['omniauth.auth']

  # Redirect to the URL you want after successful auth
  redirect_to '/dashboard'
end
