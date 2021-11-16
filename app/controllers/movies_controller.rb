class MoviesController < ApplicationController
  def index
    @movies = policy_scope(Movie).where(user: current_user)
    @movie = Movie.new
    authorize @movie
  end

  def create
    @movie = Movie.new(movie_params)
    authorize @movie
    @movie.user_id = current_user.id
    if @movie.save
      redirect_to movies_path
    else
      render :new
    end
  end

  def destroy
    @movie = Movie.find(params[:id])
    authorize @movie
    @movie.destroy
    redirect_back(fallback_location: root_path)
  end

  def movie_params
    params.require(:movie).permit(:name, :release_date, :genre, :poster_url)
  end
end
