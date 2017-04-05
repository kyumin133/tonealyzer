class Api::SessionsController < ApplicationController
  def create
    @user = Identity.find_by_credentials(params[:identity][:email],
                                        params[:identity][:password])


    # debugger
    if @user
      login(@user)
    else
      user = User.from_omniauth(env["omniauth.auth"])
      login(user)
    end
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
