class AddIndexToTorrents < ActiveRecord::Migration[6.0]
  def change
    add_index :torrents, :title, unique: true
  end
end
