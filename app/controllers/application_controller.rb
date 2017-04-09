class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  protect_from_forgery with: :exception, prepend: true
  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by_uid(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    # current_user
    debugger
    if user.uid && user.class.name != "Identity"
      session[:user_id] = user.uid
    else
      session[:user_id] = user.id
    end
    @current_user = user
  end

  def require_logged_in
    unless logged_in?
      redirect_to root_url
    end
  end
end
