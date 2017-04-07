class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]

  def create
    if params[:identity][:email]
      @user = Identity.find_by_credentials(params[:identity][:email],
                                        params[:identity][:password])
    end

    if @user
      login(@user)
    else
      debugger
      @user = User.from_omniauth(env["omniauth.auth"])
      login(@user)
    end
    render "api/users/show"
  end

  def requestFacebook
    redirect_to "/api/auth/facebook"
  end

  def requestGoogle
    byebug
    redirect_to "/api/auth/google_oauth2"
  end

  # def requestFacebook
  #   uri = URI.parse("https://www.facebook.com/v3.0/dialog/oauth")
  #   http = Net::HTTP.new(uri.host, uri.port)
  #   http.use_ssl = true
  #
  #   full_response = http.get("https://www.facebook.com/v3.0/dialog/oauth")
  # end

  def destroy
    session[:user_id] = nil
    render json: {}
  end

  def failure
    redirect_to root_path, alert: "Authentication failed!"
  end
end
