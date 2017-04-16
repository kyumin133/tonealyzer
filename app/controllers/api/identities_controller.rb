class Api::IdentitiesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def create
    if params[:identity]
      if params[:identity][:user][:username].length > 0 && params[:identity][:user][:password].length > 5
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
        json = []
        if params[:identity][:user][:username].length == 0
          json << 'Please include a username.'
        end
        if params[:identity][:user][:password].length < 6
          json << 'Please include a password of at least 6 characters.'
        end
        render(json: json,
               status: 401)
      end
    end
  end
end
