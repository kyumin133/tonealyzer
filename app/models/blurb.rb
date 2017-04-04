class Blurb < ApplicationRecord
  validates :body, :user_id, :analysis,  presence: true
  validates :body, uniqueness: { scope: :user_id }

  before_validation :ensure_analysis


  def new_analysis
    options = {
      basic_auth:{
        :username=>ENV["WATSON_ID"],
        :password=>ENV["WATSON_PASSWORD"]
      },
      headers:{
        "Content-Type" => "text/plain"
      },
      body: {
        :body => self.body
      }
    }

    full_response = HTTParty.post("https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19", options)

    full_response.body # Parsed body
  end

  private
  def ensure_analysis
    self.analysis ||= new_analysis
  end




end
