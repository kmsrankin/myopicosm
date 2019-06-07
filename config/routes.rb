Rails.application.routes.draw do
  devise_for :users
  root "stories#index"
  resources :stories, only: [:show, :index] do
    resources :events, only: [:show]
    resources :memberships, only: [:index]
  end


  namespace :api do
    namespace :v1 do
      resources :stories, only: [:show, :index, :create] do
        resources :memberships, only: [:index]
      end
      resources :events, only: [:show, :create]
      resources :possibilities, only: [:create]
      resources :votes, only: [:create]
      resources :memberships, only: [:create]
      resources :pictures, only: [:create]
      resources :thesaurus, only: [:search]
      post 'thesaurus/search', to: 'thesaurus#search'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
