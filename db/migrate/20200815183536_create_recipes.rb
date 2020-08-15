class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.text :ingredients, null: false
      t.text :instruction, null: false
      t.string :image, default: 'https://craftycoin.com/wp-content/uploads/2015/04/Recipes-header.png'
      t.timestamps
    end
  end
end
