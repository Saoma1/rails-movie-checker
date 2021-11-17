Rails.application.routes.draw do
  devise_for :users

  root to: 'pages#home'
  resources :movies
  resources :web_scrappers
  resources :torrents
end
