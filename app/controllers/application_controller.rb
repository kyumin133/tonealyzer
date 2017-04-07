class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  protect_from_forgery with: :exception, prepend: true
  helper_method :current_user, :logged_in?
  
  def current_user

    # session[:user_id] = nil
    @current_user ||= User.find_by_uid(session[:user_id]) if session[:user_id]
  end

  def logged_in?

    !!current_user
  end

  def login(user)
    session[:user_id] = user.uid
    @current_user = user
  end

  def require_logged_in
    unless logged_in?
      redirect_to root_url
    end
  end
end
