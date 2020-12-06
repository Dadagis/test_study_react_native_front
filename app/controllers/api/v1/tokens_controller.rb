class Api::V1::TokensController < ApplicationController
    def create
      user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            token = encode_token({id:user.id, email: user.email})
          render json: {
            jwt: encode_token({id:user.id, email: user.email, fav_pokemons: user.favorite_pokemons})
        }
        else
          render json: {errors: "Invalid email or password"}, status: :unprocessable_entity
      end
    end

    private

      def encode_token(payload={})
        exp = 24.hours.from_now
        payload[:exp] = exp.to_i
        JWT.encode(payload, ENV['SECRET_KEY_BASE'])
      # For developemnt: Rails.application.secrets.secret_key_base
      # For development: Rails.application.credentials.secret_key_base
      end

      def decode_token(token)
        result = JWT.decode token, nil, false
        puts result
      end
  end