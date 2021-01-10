class RemoveImageColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :recipes, :image
  end
end
