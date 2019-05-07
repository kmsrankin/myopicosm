Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  resources :stories, only: [:index, :show] do
    resources :events, only: [:show, :create] do
      resources :possibilities, only: [:create]
    end
  end

  resources :events, only: [:show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
