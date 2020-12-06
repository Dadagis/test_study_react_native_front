class Api::V1::LikedPokemonsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        user = User.find(liked_pokemons_params[:user_id])
        like = LikedPokemon.new(liked_pokemons_params)
        if like.save
        render json: { data: format_likes(user)}
        end
    end

    def destroy
        puts "-----------------------------"
        puts "je suis dans destroy"
        puts params
        user = User.find(liked_pokemons_params[:user_id])
        to_destroy = LikedPokemon.find_by(user_id: liked_pokemons_params[:user_id], pokemon_id: params[:id])
        puts "-----------------------------------"
        puts to_destroy
        LikedPokemon.destroy(to_destroy.id)
    end

    private

    def liked_pokemons_params
        params.require(:liked_pokemons).permit(:user_id, :pokemon_id)
    end

    def format_likes(user)
        array = []
        user.liked_pokemons.map do |liked|
            array << liked.pokemon_id
        end
        array
      end
end