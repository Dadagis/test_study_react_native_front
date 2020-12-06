class CreateLikedPokemons < ActiveRecord::Migration[6.0]
  def change
    create_table :liked_pokemons do |t|
      t.integer :pokemon_id
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
