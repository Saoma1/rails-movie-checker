class CreateTorrents < ActiveRecord::Migration[6.0]
  def change
    create_table :torrents do |t|
      t.string :title
      t.string :release_year
      t.string :url

      t.timestamps
    end
  end
end
