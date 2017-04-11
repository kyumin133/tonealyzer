class Api::IdentitiesController < ApplicationController
  skip_before_filter  :verify_authenticity_token

# TODO refactor this. what is going on?
  # def new
  #   # debugger
  #   @user = Identity.create!(email: params[:identity][:user][:username],
  #                            name: params[:identity][:user][:username],
  #                            password_digest: BCrypt::Password.create(
  #                                 params[:identity][:user][:password]))
  #
  #   u = User.create!(provider: "identity",
  #                    uid: @user.id,
  #                    name: params[:identity][:user][:username])
  #
  #   login(@user)
  #   # render "api/users/show"
  #   redirect_to "#/redirect"
  # end

  def create
    if params[:identity]
      @user = Identity.create!(email: params[:identity][:user][:username],
                               name: params[:identity][:user][:username],
                               password_digest: BCrypt::Password.create(
                                    params[:identity][:user][:password]))
      u = User.create!(provider: "identity",
                       uid: @user.id,
                       name: params[:identity][:user][:username])

      login(@user)
      render "api/users/show"
    else
      redirect_to "#/redirect"
    end
  end
end
