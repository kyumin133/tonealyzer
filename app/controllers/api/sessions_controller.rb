class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]
  skip_before_filter  :verify_authenticity_token

  def create
    if params[:identity]
      if params[:identity][:user] && params[:identity][:user][:username]
        @user = Identity.find_by_credentials(params[:identity][:user][:username],
                                             params[:identity][:user][:password])

      elsif params[:identity][:email]
        @user = Identity.find_by_credentials(params[:identity][:email],
                                             params[:identity][:password])
        login(@user)
        render "/api/users/show"
        return
      end
    end

    if @user
      sleep 0.25
      login(@user)
      render "/api/users/show"
      return
    elsif env["omniauth.auth"]
      @user = User.from_omniauth(env["omniauth.auth"])
      login(@user)
      redirect_to "#/redirect"
    else
      render(json: ['Invalid username or password.'],
             status: 401)
    end
  end

  def destroy
    session[:user_id] = nil
    @user = current_user

    if @user
      logout
      render "/api/users/show"
    end
  end

  def failure
    # redirect_to root_path, alert: "Authentication failed!"
  end

end
