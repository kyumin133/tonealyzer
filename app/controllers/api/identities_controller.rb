class Api::IdentitiesController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def new
    # TODO is it username or email???

    # unless params[:identity][:user]
      # @identity = env['omniauth.identity']
    # end

    # if @identity.save
    debugger
    @user = Identity.create!(name: params[:identity][:user][:username], password_digest: BCrypt::Password.create(params[:identity][:user][:password]))
    u = User.create!(provider: "identity", uid: @user.id, name: params[:identity][:user][:username])

    login(@user)
    render "api/users/show"
    # else
      # render json: @user.errors.full_messages, status: 422
    # end
  end

  def create
    # unless params[:identity][:email] # is it username or email???
    #   @identity = env['omniauth.identity']
    # end

    # if @identity.save

    debugger
    @user = Identity.create!(name: params[:identity][:user][:username], password_digest: BCrypt::Password.create(params[:identity][:user][:password]))
    u = User.create!(provider: "identity", uid: @user.id, name: params[:identity][:user][:username])

    login(@user)
    debugger
    render "api/users/show"
    # else
      # render json: @user.errors.full_messages, status: 422
    # end
  end
end
