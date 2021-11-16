class PagesController < ApplicationController
  def home
    @movies = Movie.where(user_id: current_user.id)
    @movie = Movie.new
    @torrents = Torrent.all
  end

end
