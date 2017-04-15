class Api::IdentitiesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def create
    if params[:identity]
      # debugger
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
      # debugger
    end
  end
end
