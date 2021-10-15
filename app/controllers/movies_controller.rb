class MoviesController < ApplicationController
  def index
    @movies = Movie.where(user_id: current_user.id)
    @movie = Movie.new
  end

  def new
    @movie = Movie.new
  end

  def create
    @movie = Movie.new(movie_params)
    @movie.user_id = current_user.id
    # @movie.seeders = 5
    # @movie.leechers = 10
    # @movie.size = 50
    if @movie.save
      redirect_to movies_path
    else
      render :new
    end
  end

  def movie_params
    params.require(:movie).permit(:name, :release_date, :genre)
  end
end
