class Api::V1::NotesController < ApplicationController
    def create
        note = Note.new(notes_params)
        user = User.find(notes_params[:user_id])

        if note.save
            render json: {id:user.id, email: user.email, fav_pokemons: format_likes(user), notes: user.notes.where(pokemon_number: notes_params[:pokemon_number])}
        else
            render json: { error: note.errors.messages }
        end
    end

    private
    
    def notes_params
        params.require(:note).permit(:user_id, :content, :pokemon_number)
    end

    def format_likes(user)
        array = []
        user.liked_pokemons.map do |liked|
            array << liked.pokemon_id
        end
        array
      end
end