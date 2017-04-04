OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  configure do |config|
    config.path_prefix = '/auth'
  end
  provider :google_oauth2, '1073725963973-8797ciap6177irvjuvro2fulu257o9e9.apps.googleusercontent.com', 'XtWST00FJ7Z7PZIZ-Ec8Nmum', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
  provider :facebook, '1425449590839408', 'dc36b232c8d0cc43023ab4705ddaf106', {:client_options => {:ssl => {:ca_file => Rails.root.join("cacert.pem").to_s}}}
end
#
# Rails.application.config.middleware.use OmniAuth::Builder do
#   provider :facebook, '1425449590839408', 'dc36b232c8d0cc43023ab4705ddaf106', {:client_options => {:ssl => {:ca_file => Rails.root.join("cacert.pem").to_s}}}
# end
