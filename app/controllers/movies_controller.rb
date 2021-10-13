class MoviesController < ApplicationController
  def index
    @movies = Movie.where(user_id: current_user.id)
  end
end
