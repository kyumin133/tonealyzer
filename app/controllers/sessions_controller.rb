class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    # debugger
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
