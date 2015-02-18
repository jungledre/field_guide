class UserMailer < ActionMailer::Base
  default from: "from@example.com"

  def password_reset user
    @greeting = "Hi"
    @user = user
    mail to: "adriek@gmail.com"
  end
end
