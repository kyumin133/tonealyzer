OmniAuth.config.logger = Rails.logger
OmniAuth.config.full_host = Rails.env.production? ? 'https://tonealyzer.herokuapp.com' : 'http://localhost:3000'
OmniAuth.config.on_failure = Proc.new { |env|
  OmniAuth::FailureEndpoint.new(env).redirect_to_failure
}

Rails.application.config.middleware.use OmniAuth::Builder do
  configure do |config|
    config.path_prefix = '/api/auth'
  end

  provider :google_oauth2, ENV['GOOGLE_KEY'], ENV['GOOGLE_SECRET'], {
      client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}},
      provider_ignores_state: true,
    }
  provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET'], {:client_options => {:ssl => {:ca_file => Rails.root.join("cacert.pem").to_s}}}
  provider :linkedin, ENV['LINKEDIN_KEY'], ENV['LINKEDIN_SECRET'], {:client_options => {:ssl => {:ca_file => Rails.root.join("cacert.pem").to_s}}}
  provider :identity
end
