Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "pages#index"

  namespace :api do
    namespace :v1 do
      resources :pokemons
      resources :notes
      resources :users
      resources :tokens, only: [:create]
    end
  end

  get "*path", to: "pages#index", via: :all
end
