class TorrentsController < ApplicationController
  def index
    @torrents = Torrent.all
    authorize @movies
  end

  def create
    @torrent = Torrent.new(torrent_params)
    authorize @torrent
    @torrent.save
  end

  def torrent_params
    params.require(:torrent).permit(:title, :release_year, :url)
  end
end
