class AddImageColumn < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :image, :binary, :limit => 10.megabyte
  end
end
