Rails.application.routes.draw do
  get 's3/direct_post'
  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
      get 'recipes/public_recipes'
      get 'recipes/:id/edit', to: 'recipes#edit'
      put 'recipes/:id/update', to: 'recipes#update'
      post 'sessions/create'
      delete 'sessions/destroy'
      get '/logged_in', to: 'sessions#is_logged_in?'
      namespace :users do
        get '/logged_in', to: 'users#is_logged_in?'
        get 'users/index'
        post 'users/create'
        get '/show/:id', to: 'users#show'
      end
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'

  # post '/login', to: 'sessions#create'
  # delete '/logout', to: 'sessions#destroy'
  # get '/logged_in', to: 'sessions#is_logged_in?'

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
