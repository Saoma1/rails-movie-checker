require 'kimurai'

class WebScrapper < Kimurai::Base
  @name = 'torrent_spider'
  @engine = :selenium_firefox
  @start_urls = ['https://1337x.to/cat/Movies/']
    @config = {
    user_agent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36",
    before_request: { delay: 1..3 }
  }

  def self.open_spider
    @start_time = DateTime.now
    logger.info "> Starting..."
  end

  def self.close_spider
    @end_time = DateTime.now
    time_diff = @end_time.to_time - @start_time.to_time
    time = Time.at(time_diff.to_i.abs).utc.strftime "%H:%M:%S"
    logger.info "> Stopped!"
    logger.info "it took #{time} for the torrent crawl"
  end


  def parse(response, url:, data: {})
    @base_uri = 'https://1337x.to'
    id = 1
    page = 14
    today = DateTime.now
    yesterday = (today - 1)

    catch(:done) do
      loop do
        browser.visit("https://1337x.to/cat/Movies/#{page.to_s}/")
        response = browser.current_response
        response.css('tbody tr').each do |app|
          alt_href = app.css('td.name a:nth-of-type(2)').attr('href') #on the main page
          date = app.css('td.coll-date').text.to_s
          date = DateTime.parse(date)

          throw(:done, true) if date < yesterday

          browser.visit(@base_uri + alt_href)
          app_response = browser.current_response #on the torrent page
          scraped_torrents(app_response, alt_href, date, yesterday, id)
          id += 1
        end
        page += 1
      end
    end
  end

  private

  def scraped_torrents(app_response, alt_href, date, yesterday, id)
    item = {}
    # item[:date] = date
    # item[:yesterday] = yesterday
    if app_response.css('div#mCSB_1_container').any?
      a = app_response.css('div#mCSB_1_container h3 a')
      item[:main] = true
      item[:url] = a.attr('href')
      item[:title] = a.text
      item[:release_year] = a.attr('href').to_s[-5..-2]
    else
      item[:main] = false
      item[:url] = alt_href
      item[:release_year] = 'not yet'
      item[:title] = app_response.css('div.box-info-heading h1').text
    end
    invalid_torrents = []

    begin
      Torrent.create(item)
    rescue
      puts "Torrent Exists!"
    end
    # save_to "torrent_urls.json", item, format: :pretty_json, position: false
  end
end
