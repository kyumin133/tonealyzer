require 'unirest'

class ToneAnalysis
  attr_reader :results
  def initialize(body)

    options = {
      basic_auth:{
        :username=>ENV["WATSON_ID"],
        :password=>ENV["WATSON_PASSWORD"]
      },
      headers:{
        "Content-Type" => "text/plain"
      },
      body: {
        :body => body
      }
    }


    full_response = HTTParty.post("https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19", options)

    @results = full_response.body # Parsed body

  end
end
