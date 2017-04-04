class Api::BlurbsController < ApplicationController
  def create
    debugger
		@blurb = Blurb.new(user_id: User.first.id, body: params[:body])

		if @blurb.save
			render "api/blurbs/show"
		else
      debugger
			render json: @blurb.errors.full_messages, status: 422
		end
  end

end
