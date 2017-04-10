class Personality < ApplicationRecord
  validates :user_id, presence: true

  belongs_to :user

  def set_personality_analysis
    user = User.find(user_id)
    all_blurbs = user.blurbs.map{ |blurb| blurb.body }.join(". ")

    options = {
      basic_auth:{
        :username=>ENV["WATSON_PERSONALITY_ID"],
        :password=>ENV["WATSON_PERSONALITY_PASSWORD"]
      },
      headers:{
        "Content-Type" => "text/plain",
      },
      body: {
        :body => "#{all_blurbs}"
      }
    }

    full_response = HTTParty.post("https://gateway.watsonplatform.net/personality-insights/api/v3/profile?version=2016-10-20", options)

    self.update(analysis: JSON.parse(full_response.body))
  end
end
