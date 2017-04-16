User.delete_all
Identity.delete_all
Blurb.delete_all

demo_user_identity = Identity.create!(
  name: "Guest User",
  password_digest: BCrypt::Password.create("secretpass123"),
  email: "email@gmail.com"
)

demo_user = User.create!(
  provider: "identity",
  uid: demo_user_identity.id,
  name: "Guest User"
)

for i in 0...10 do
  Blurb.create!(
    body: File.read("app/assets/speech/speech#{i}.txt"),
    user_id: demo_user.id,
    title: "Blurb #{i + 1}"
  )
  if i == 5
    sleep(60) # per-minute quota
  end
end
