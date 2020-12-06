class LikedPokemon < ApplicationRecord
  belongs_to :user

  validates :pokemon_id, presence: true
end
