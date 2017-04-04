class Api::BlurbsController < ApplicationController
  def create
    #DON"T FORGET TO SWAP OUT user_id for current user!
		@blurb = Blurb.new(user_id: User.first.id, body: params[:body])

		if @blurb.save
			render "api/blurbs/show"
		else
			render json: @blurb.errors.full_messages, status: 422
		end
  end

  def show
    debugger
    @blurb = Blurb.find(params[:id])
		render "api/blurbs/show"
  end

end
