Rails.application.routes.draw do
  root 'stories#index'
  devise_for :users

  resources :stories, only: [:index, :show] do
    resources :events, only: [:show, :create] do
      resources :possibilities, only: [:create]
    end
  end

  namespace :api do
    namespace :v1 do
      resources :stories, only: [:show, :index]
      resources :events, only: [:show]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
