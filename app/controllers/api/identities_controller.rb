class Api::IdentitiesController < ApplicationController
  # def new
  #   @identity = env['omniauth.identity']
  # end

  def create
    # byebug
    if params[:identity][:email] # is it username or email???
      # @identity = Identity.new()
    else
      @identity = env['omniauth.identity']

    end

    if @identity.save
      login(@identity)
      render "api/users/show"
    # else
      # render json: @user.errors.full_messages, status: 422
    end
  end
end
