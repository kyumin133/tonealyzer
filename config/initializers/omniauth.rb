OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '1073725963973-8797ciap6177irvjuvro2fulu257o9e9.apps.googleusercontent.com', 'TW7Lf2qL1Cqei_gso3zxuotj', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end
