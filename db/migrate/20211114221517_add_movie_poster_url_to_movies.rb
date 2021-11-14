class AddMoviePosterUrlToMovies < ActiveRecord::Migration[6.0]
  def change
    add_column :movies, :movie_poster_url, :string
  end
end
