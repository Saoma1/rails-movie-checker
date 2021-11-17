require 'rake'

namespace :scraping do
  desc 'task description'
  task :run_scraper => :environment do
    # call Listing method to send mail
    # puts 'Soto, you are doing great'
    WebScrapper.crawl!
  end
end

# namespace :sample do
#   desc 'saying something'
#   task :test => [ :environment ] do
#     puts 'Soto, you are doing great :)'
#   end
# end
