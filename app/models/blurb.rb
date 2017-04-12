require 'httparty'

class Blurb < ApplicationRecord
  validates :body, :user_id, :analysis,  presence: true

  before_validation :ensure_analysis, :replace_newlines

  belongs_to :user

  def replace_newlines
    self.body = self.body.gsub(/\n/, "\\n")
  end

  def generate_analysis
    all_blurb_bodies = Blurb.all.map { |blurb| blurb.body }

    new_analysis
  end

  def new_analysis
    options = {
      headers:{
        "Content-Type" => "text/plain",
      },
      body: {
        :body => "#{self.body}"
      },
      query: {
        version: "2016-05-09",
        sentences: "true"
      }
    }

    # full_response = HTTParty.post("https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&sentences=true", options)
    # full_response = HTTParty.post("https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone", options)
    uri = URI.parse("https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    headers = {
      "Content-Type" => "text/plain"
    }

    full_response = http.post("https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?version=2016-05-09&sentences=true", self.body, headers)

    # full_response = Net::HTTP.post_form("https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone", options)
    JSON.parse(full_response.body) # Parsed body
  end

  private
  def ensure_analysis
    self.analysis ||= generate_analysis
  end

end
