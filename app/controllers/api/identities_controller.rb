class Api::IdentitiesController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def new
    # debugger
    # TODO is it username or email???

    unless params[:identity][:email]
      @identity = env['omniauth.identity']
    end

    if @identity.save
      login(@identity)
      render "api/users/show"
    # else
      # render json: @user.errors.full_messages, status: 422
    end
  end

  def create
    # debugger
    unless params[:identity][:email] # is it username or email???
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
