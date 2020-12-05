require 'jwt'
class Api::V1::UsersController < ApplicationController
  def index
    render json: {status: "WELCOME"}
  end

  def create
    user = User.new(user_params)
      if user.save
        payload = {user_id: user.id, email: user.email}
        token = encode_token(payload)
        render json: {status: "User created", data: user, jwt: token}
      else
        render json: {errors: user.errors}, status: :unprocessable_entity
      end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def encode_token(payload={})
    exp = 72.hours.from_now
    payload[:exp] = exp.to_i
    JWT.encode(payload, ENV['SECRET_KEY_BASE'] )
# For developemnt: Rails.application.secrets.secret_key_base
# For development: Rails.application.credentials.secret_key_base
  end
end