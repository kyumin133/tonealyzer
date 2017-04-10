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

### IBM Watson API

```ruby
def generate_analysis
  all_blurb_bodies = Blurb.all.map { |blurb| blurb.body }
  if all_blurb_bodies.include?(self.body)
    Blurb.where({body: self.body}).first
  else
    new_analysis
  end
end
```

### insert here

```javascript
dataSets[0].push({
  x: key,
  anger: results[0].tones[0].score,
  disgust: results[0].tones[1].score,
  fear: results[0].tones[2].score,
  joy: results[0].tones[3].score,
  sadness: results[0].tones[4].score
});
```

## Future Directions

We plan on continuing work on this project. Below is an outline of the features we plan on implementing.

### Personality Analysis

The IBM Watson API also allows for personality analysis, and we plan on adding this in so that users can check their personality results based on documents which they have uploaded.

### File Upload

Currently, our website requires users to either copy and paste text or type text directly on our site. We plan on also allowing users to upload files, which could make our site easier to use.

### Speech Analysis

The IBM Watson Speech to Text API could be utilized to allow users to have their spoken word analyzed.

### Spelling/grammar check

Adding a spelling/grammar check for users to use as they type up content to be analyzed could be additionally useful, especially for users who are utilizing Tonealyzer for professional purposes (such as analyzing their cover letters, etc.).

### Multiple Languages

The IBM Watson API allows for analysis of multiple languages; if we expand our app we could utilize this for users interested in analyzing writing in languages other than English.
