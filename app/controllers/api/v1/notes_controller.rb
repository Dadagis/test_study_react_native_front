class Api::V1::NotesController < ApplicationController
    def show
    end

    def create
        note = Note.new(notes_params)

        if note.save
            render json: note
        else
            render json: { error: note.errors.messages }
        end
    end

    private
    
    def notes_params
        params.require(:note).permit(:user_id, :content, :pokemon_number)
    end
end