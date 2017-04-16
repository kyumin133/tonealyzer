class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, prepend: true
  helper_method :current_user, :logged_in?

  def current_user
    return nil unless session[:user_id]
    @current_user ||= User.find_by_uid(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    if user.uid && user.class.name != "Identity"
      session[:user_id] = user.uid
    else
      session[:user_id] = user.id
    end

    @current_user = user
  end

  def logout
    session[:user_id] = nil
    @current_user = nil
  end

  def require_logged_in
    redirect_to root_url unless logged_in?
  end
end
