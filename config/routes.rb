Rails.application.routes.draw do
  root to: 'pages#home'
  devise_for :users
  resources :movies
  resources :web_scrappers
  resources :torrents
end
