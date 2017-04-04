class Api::PersonalitiesController < ApplicationController
  def show
    #DON"T FORGET TO SWAP OUT user_id for current user!
		if User.first.id.personality
      @personality = User.first.id.personality
    else
      @personality = Personality.new(user_id: User.first.id)
      @personality.set_personality_analysis
    end

		render json: @personality.analysis

  end

end
