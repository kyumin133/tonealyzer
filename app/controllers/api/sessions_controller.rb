class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]
  skip_before_filter  :verify_authenticity_token

  def create
    debugger
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
      login(@user)
      render "/api/users/show"
      return
    elsif env["omniauth.auth"]
      @user = User.from_omniauth(env["omniauth.auth"])
      login(@user)
      redirect_to "#/redirect"
    else
      redirect_to "#/redirect"
    end
  end

  def destroy
    session[:user_id] = nil
    render json: {}
  end

  def failure
    redirect_to root_path, alert: "Authentication failed!"
  end
end
