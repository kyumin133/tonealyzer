class Api::SessionsController < ApplicationController
  def create
    # debugger
    user = User.from_omniauth(env["omniauth.auth"])
    login(user)
    redirect_to root_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  def failure
    redirect_to root_path, alert: "Authentication failed!"
  end
end
