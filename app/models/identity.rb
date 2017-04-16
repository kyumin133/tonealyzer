class Identity < OmniAuth::Identity::Models::ActiveRecord
  validates :email, :password_digest, presence: true
  validates :email, uniqueness: true
  # TODO
  # validates :password, length: {minimum: 6, allow_nil: true}
  # attr_reader :password

  def self.find_by_credentials(email, password)
    user = Identity.find_by_email(email)
    return user if user && user.is_password?(password)
    nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  # def password=(password)
  #   @password = password
  # end
end
