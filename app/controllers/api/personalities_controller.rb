class Api::PersonalitiesController < ApplicationController
  def show
    #maybe want to just set this to current_user instead of passing through a userid
		if User.find(params[:id]).personality
      @personality = User.find(params[:id]).personality
    else
      @personality = Personality.new(user_id: params[:userId])
      @personality.set_personality_analysis
    end

		render json: @personality.analysis

  end

  def update
    @personality = User.find(params[:id]).personality.set_personality_analysis
    @personality.set_personality_analysis
    render json: @personality.analysis
  end

end
