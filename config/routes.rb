Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  resource :home, only: [:show]

  namespace :api, defaults: {format: :json} do
    get 'auth/:provider/callback', to: 'sessions#create'
    get 'auth/:provider', to: 'sessions#create'
    post '/auth/:provider/callback', to: 'sessions#create'
    get 'facebook', to: 'sessions#requestFacebook'
    get 'google', to: 'sessions#requestGoogle'
    get 'auth/failure', to: redirect('/')
    get 'signout', to: 'sessions#destroy', as: 'signout'
    resource :session, only: [:create, :destroy]
    resources :identities, only: [:new, :create]
    resources :blurbs, only: [:create, :show, :index]
    resources :personalities, only: [:show, :update]
  end

  match '*path', via: [:options], to: lambda {|_| [204, { 'Content-Type' => 'text/plain' }]}
end
