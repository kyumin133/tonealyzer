class BlurbsController < ApplicationController
  def create
		@blurb = Blurb.new(user_id: current_user, body: params(:body))

		if @blurb.save
			render "api/blurbs/show"
		else
			render json: @blurb.errors.full_messages, status: 422
		end
  end

end
