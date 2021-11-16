class CreateWebScrappers < ActiveRecord::Migration[6.0]
  def change
    create_table :web_scrappers do |t|

      t.timestamps
    end
  end
end
