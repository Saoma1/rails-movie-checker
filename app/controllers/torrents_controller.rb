class TorrentsController < ApplicationController
  validates :title, uniqueness: true

  def index
    @torrents = Torrent.all
    authorize @movies
  end

  def create
    @torrent = Torrent.new(torrent_params)
    authorize @torrent
    if @torrent.save!
      puts 'saved'
    else
      raise 'some error'
    end
  end

  def torrent_params
    params.require(:torrent).permit(:title, :release_year, :url)
  end
end
