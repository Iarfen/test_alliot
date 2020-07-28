Rails.application.routes.draw do

  post 'announcements_votes/create', to: 'announcements_votes#create'
  get 'announcements_comments/index'
  post 'announcements/comments/create', to: 'announcements_comments#create'
  get 'announcements_comments/show'
  get 'announcements_comments/destroy'
  get 'announcements/index'
  post 'announcements/create'
  get 'announcements/show'
  get 'announcements/destroy'
  get 'announcements/:id', to: 'announcements#show'
  get 'announcements/:id/comments', to: 'announcements_comments#index'
    root 'board#index'

    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/logged_in', to: 'sessions#is_logged_in?'

    resources :users, only: [:create, :show, :index]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
