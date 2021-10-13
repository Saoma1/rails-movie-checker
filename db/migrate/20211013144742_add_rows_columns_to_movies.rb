class AddRowsColumnsToMovies < ActiveRecord::Migration[6.0]
  def change
    add_column :movies, :seeders, :integer
    add_column :movies, :leechers, :integer
    add_column :movies, :size, :integer
  end
end
