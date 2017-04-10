class Identity < OmniAuth::Identity::Models::ActiveRecord
  # TODO add validations

  def self.find_by_credentials(email, password)
    user = Identity.find_by_email(email)
    return user if user && user.is_password?(password)
    nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
end
