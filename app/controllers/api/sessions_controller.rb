class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]

  def create
    if params[:identity]
      if params[:identity][:email]
        @user = Identity.find_by_credentials(params[:identity][:email],
                                          params[:identity][:password])
        login(@user)
      end
      render "/api/users/show"
      return
    end

    if @user
      login(@user)
      redirect_to "/#/home"
    else
      # debugger
      @user = User.from_omniauth(env["omniauth.auth"])
      login(@user)
      redirect_to "/#/home"
    end
  end

  def requestFacebook
    # redirect_to "/api/auth/facebook"
  end

  def requestGoogle
    # headers["Access-Control-Allow-Origin"] = "*"
    # response.headers["Access-Control-Allow-Origin"] = "*"
    # url = 'api/auth/google_oauth2'
    # req = Net::HTTP::Get.new(url.to_s)
    # # http = Net::HTTP.new(url.host, url.port)
    # # http.use_ssl = true
    # req["Access-Control-Allow-Origin"] = "*"
    # # req.add_field("Access-Control-Allow-Origin", "*")
    #
    # byebug
    # res = Net::HTTP.start(url.host, url.port) {|http|
    #   http.request(req)
    # }
    # res = http.request(req)
    # byebug
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
