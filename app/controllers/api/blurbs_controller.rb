class Api::BlurbsController < ApplicationController
  def create
		@blurb = Blurb.new(user_id: current_user.id, title: params[:title], body: params[:body])

		if @blurb.save
			render "api/blurbs/show"
		else
			render json: @blurb.errors.full_messages, status: 422
		end
  end

  def show
    @blurb = Blurb.find(params[:id])
		render "api/blurbs/show"
  end

  def index
    @blurbs = current_user.blurbs
    render "api/blurbs/index"
  end
end
