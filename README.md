# Tonealyzer

[Tonealyzer live](https://tonealyzer.herokuapp.com/)

Mapping the tone of your writing to what you're trying to convey is both vitally important, and challenging to get right. Who hasn't sent an email and had the message misunderstood as being overly aggressive or inappropriately cheerful? This app leverages powerful natural language processing algorithms developed by IBM Watson to provide feedback to users on the tone of their content, so that their writing gets across its intended message. Users can see previous analyses of their submissions. They can also see charts which show the results from all of their submissions in one place to make it easy for comparison.

Tonealyzer has a Ruby on Rails backend, a PostgreSQL database, and a React/Redux frontend.

## Features & Implementation

### OmniAuth

This application uses OmniAuth gems for Facebook and Google, and also allows users to log in without these services. OmniAuth Identity is used to allow basic login. Due to this, two models, ```identities``` and ```users```, are used to keep track of users. The Sessions Controller and the Identities Controller handle the logic of determining what to do depending on if users are choosing to log in with Facebook, Google, or a username and password specific to Tonealyzer.

```ruby
if params[:identity]
  if params[:identity][:user] && params[:identity][:user][:username]
    @user = Identity.find_by_credentials(params[:identity][:user][:username],
                                         params[:identity][:user][:password])
```

```ruby
elsif env["omniauth.auth"]
  @user = User.from_omniauth(env["omniauth.auth"])
```

When users click on the button to log in with Google, they are directed to the proper route. At this point the OmniAuth middleware for the Google provider allows them to move to Google to log in, and then return to Tonealyzer.

```javascript
handleGoogleSubmit(e) {
  e.preventDefault();
  window.location = "/api/auth/google_oauth2";
}
```

### IBM Watson API

Using the Watson API allows users to receive a comprehensive analysis of their text, which persists across their sessions so that they can see how the tonality of their writing has improved. Once fetched from Watson , each result is stored within a `blurb` object. Through storing the results of each API call, fewer external API calls are needed, leading to faster results served to the app's frontend.

The API is queried through use of the ruby `Net:HTTP` library. Using this library, the rails backend makes a request to the Watson API for the tone analysis of a given blurb of text:

```ruby
uri = URI.parse("https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

headers = {
  "Content-Type" => "text/plain"
}

full_response = http.post("https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?version=2016-05-09&sentences=true", self.body, headers)
```

This call returns a JSON object that is then returned to the controller which delivers the Object to the frontend store:
```ruby
class Api::BlurbsController < ApplicationController
  def create
		@blurb = Blurb.new(user_id: current_user.id, title: params[:title], body: params[:body])

		if @blurb.save
			render "api/blurbs/show"
		else
			render json: @blurb.errors.full_messages, status: 422
		end
  end
```

From there, the store is able to use the JSON object to graphically show the tone of the given text.

### Parsing API results for display in react-d3

```javascript
dataSets[0].push({
  x: key,
  anger: results[0].tones[0].score,
  disgust: results[0].tones[1].score,
  fear: results[0].tones[2].score,
  joy: results[0].tones[3].score,
  sadness: results[0].tones[4].score
});

<LineChart
  margins={{left: 100, right: 100, top: 50, bottom: 50}}
  data={dataSet}
  width={750}
  height={400}
  chartSeries={fields}
  x={this.x}
  xTicks={[0]}
  xLabel={"Submission"}
  yTicks={[11]}
  yDomain={[0, 1]}
  yLabel={"Score"}
  showXGrid={false}
  showYGrid={false}
/>
```

## Future Directions

We plan on continuing work on this project. Below is an outline of the features we plan on implementing.

### Personality Analysis

The IBM Watson API also allows for personality analysis, and we plan on adding this in so that users can check their personality results based on documents which they have uploaded.

### File Upload

Currently, our website requires users to either copy and paste text or type text directly on our site. We plan on also allowing users to upload files, which could make our site easier to use.

### Speech Analysis

The IBM Watson Speech to Text API could be utilized to allow users to have their spoken word analyzed.

### Spelling/Grammar Check

Adding a spelling/grammar check for users to use as they type up content to be analyzed could be additionally useful, especially for users who are utilizing Tonealyzer for professional purposes (such as analyzing their cover letters, etc.).

### Multiple Languages

The IBM Watson API allows for analysis of multiple languages; if we expand our app we could utilize this for users interested in analyzing writing in languages other than English.
