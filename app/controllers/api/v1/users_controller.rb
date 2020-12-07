require 'jwt'
class Api::V1::UsersController < ApplicationController
    skip_before_action :verify_authenticity_token

  def index
    render json: {status: "WELCOME"}
  end

  def show
      user = User.find(params[:id])
      puts user.notes.where(pokemon_number: params[:pokemon_id])
      render json: {id:user.id, email: user.email, fav_pokemons: format_likes(user), notes: user.notes.where(pokemon_number: params[:pokemon_id])}
  end
  
  def create
    user = User.new(user_params)
      if user.save
        payload = {id: user.id, email: user.email, fav_pokemons: []}
        token = encode_token(payload)
        render json: {status: "User created", data: user, jwt: token}
      else
        render json: {errors: user.errors}, status: :unprocessable_entity
      end
  end

  def update
      user = User.find_by(email: user_params[:email])
      if user.update(user_params)
        payload = {user_id: user.id, email: user.email, fav_pokemons: user.format_likes(user)}
        token = encode_token(payload)
        render json: {status: "User updated", data: user, jwt: token}
      else
        render json: {errors: user.errors}, status: :unprocessable_entity
      end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :favorite_pokemons, :pokemon_id)
  end

  def encode_token(payload={})
    exp = 72.hours.from_now
    payload[:exp] = exp.to_i
    JWT.encode(payload, ENV['SECRET_KEY_BASE'] )
# For developemnt: Rails.application.secrets.secret_key_base
# For development: Rails.application.credentials.secret_key_base
  end

  def format_likes(user)
    array = []
    user.liked_pokemons.map do |liked|
        array << liked.pokemon_id
    end
    array
  end
end