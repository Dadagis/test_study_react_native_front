class Note < ApplicationRecord
  belongs_to :user

  validates :pokemon_number, presence: true
  validates :content, presence: true
end
