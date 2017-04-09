Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  resource :home, only: [:show]

  namespace :api, defaults: {format: :json} do
    get 'auth/:provider/callback', to: 'sessions#create'
    post 'auth/:provider/callback', to: 'sessions#create'
    # TODO make sure to test for certain which routes are used
    # get 'auth/:provider', to: 'sessions#prepare'
    # get 'auth/facebook', to: 'sessions#requestFacebook'
    # get 'auth/google', to: 'sessions#requestGoogle'
    get 'auth/failure', to: redirect('/')
    get 'signout', to: 'sessions#destroy', as: 'signout'
    # get 'auth/identity/register/callback', to: 'identities#new'
    # post 'auth/identity/register/callback', to: 'identities#new'
    post 'auth/identity/register/callback', to: 'sessions#create'
    get 'auth/identity/register/callback', to: 'sessions#create'
    resource :session, only: [:create, :destroy]
    resources :identities, only: [:new, :create]
    resources :blurbs, only: [:create, :show, :index]
    resources :personalities, only: [:show, :update]
  end

  match "*path", :to => proc {|env| [200, {
    'Access-Control-Allow-Origin' => '*',
    'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials' => 'true',
    'Access-Control-Request-Method' => '*',
    'Access-Control-Allow-Headers' => 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Content-Type' => 'text/plain'

   }, ["CORS Preflight"]] }, :via => [:options]
end
