class AddRowsColumnsToMovies < ActiveRecord::Migration[6.0]
  def change
    add_column :movies, :genre, :string
    add_column :movies, :release_date, :datetime, precision: 6, null: false
  end
end
