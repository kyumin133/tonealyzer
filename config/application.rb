require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Tonealyzer
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.assets.paths << Rails.root.join("app", "assets", "images")
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins "*"
        resource '*',
        headers: :any,
        methods: [:get, :put, :post, :patch, :delete, :options]
      end
    end

    config.assets.initialize_on_precompile = false

  end
end
