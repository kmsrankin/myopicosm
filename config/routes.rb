Rails.application.routes.draw do
  devise_for :users
  root "stories#index"
  resources :stories, only: [:show, :index] do
    resources :events, only: [:show]
  end


  namespace :api do
    namespace :v1 do
      resources :stories, only: [:show, :index]
      resources :events, only: [:show, :create]
      resources :possibilities, only: [:create]
      resources :votes, only: [:create]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
