class Api::IdentitiesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def create
    if params[:identity]
      if params[:identity][:user][:username].length > 0 && params[:identity][:user][:password].length > 0
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
        render(json: ['Please include both a username and a password.'],
               status: 401)
      end
    end
  end
end
