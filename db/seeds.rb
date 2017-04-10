User.delete_all
Identity.delete_all
Blurb.delete_all

demo_user_identity = Identity.create!(
  name: "Cool user",
  password_digest: BCrypt::Password.create("secretpass123"),
  email: "email@gmail.com"
)

demo_user = User.create!(
  provider: "identity",
  uid: demo_user_identity.id,
  name: "Cool user"
)

for i in 0...10 do
  Blurb.create!(
    body: File.read("app/assets/speech/speech#{i}.txt"),
    user_id: demo_user.id,
    title: "Blurb #{i + 1}"
  )
end
