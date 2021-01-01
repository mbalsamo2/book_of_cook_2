class AddCopyAndPublicColumnsToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :copy, :boolean
    add_column :recipes, :public, :boolean
  end
end
