class User < ApplicationRecord
    has_secure_password

    has_many :notes
    has_many :liked_pokemons

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true
end
