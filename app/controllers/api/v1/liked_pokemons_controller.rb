class Api::V1::LikedPokemonsController < ApplicationController
    def create
        user = User.find(liked_pokemons_params[:user_id])
        like = LikedPokemon.new(liked_pokemons_params)
        if like.save
        render json: { data: format_likes(user)}
        end
    end

    def destroy
        
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