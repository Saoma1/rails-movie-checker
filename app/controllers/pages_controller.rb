class PagesController < ApplicationController
  def home
    @movies = Movie.where(user_id: current_user.id)
  end
end