class Api::IdentitiesController < ApplicationController
  def new
    @identity = env['omniauth.identity']
    debugger
  end
end
