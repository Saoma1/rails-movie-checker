class WebScrappersController < ApplicationController
  def index
  end

  def new
    WebScrapper.crawl!
    skip_authorization
    redirect_to root_path, notice: 'Results stored in results.json file.'
  end

  def back
    WebScrapper.crawl!
    skip_authorization
  end

end
