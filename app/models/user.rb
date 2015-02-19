class User < ActiveRecord::Base
  has_many :maps

  has_secure_password

  validates :email,
    presence: true,
    uniqueness: {case_sensitive: false}

  validates_confirmation_of :password, on: :create
  validates_presence_of :password_confirmation, on: :create

  def self.authenticate email,password
    User.find_by_email(email).try(:authenticate, password)
  end

  def set_password_reset
    self.reset_code = SecureRandom.urlsafe_base64
    self.expires_at = 4.hours.from_now
    self.save!
  end
end
