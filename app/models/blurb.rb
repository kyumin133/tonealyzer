require 'httparty'

class Blurb < ApplicationRecord
  validates :body, :user_id, :analysis,  presence: true

  before_validation :ensure_analysis

  belongs_to :user

  def generate_analysis
    all_blurb_bodies = Blurb.all.map { |blurb| blurb.body }
    if all_blurb_bodies.include?(self.body)
      Blurb.where({body: self.body}).first
    else
      new_analysis
    end
  end

  def new_analysis
    options = {
      basic_auth:{
        :username=>ENV["WATSON_ID"],
        :password=>ENV["WATSON_PASSWORD"]
      },
      headers:{
        "Content-Type" => "text/plain",
      },
      body: {
        :body => "#{self.body}"
      }
    }
    full_response = HTTParty.post("https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&sentences=true", options)

    JSON.parse(full_response.body) # Parsed body

  end

  private
  def ensure_analysis
    self.analysis ||= generate_analysis
  end

end
