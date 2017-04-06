class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]

  def create
    if params[:identity][:email]
      @user = Identity.find_by_credentials(params[:identity][:email],
                                        params[:identity][:password])
    end
    # debugger

    if @user
      login(@user)
    else
      @user = User.from_omniauth(env["omniauth.auth"])
      debugger
      login(@user)
    end
    render "api/users/show"
  end

  def destroy
    session[:user_id] = nil
    render json: {}
  end

  def failure
    redirect_to root_path, alert: "Authentication failed!"
  end
end
