# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


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

blurb1 = Blurb.create!(
  body: "Hi Team,
The times are difficult! Our sales have been disappointing for the past three quarters for our data analytics product suite. We have a competitive data analytics product suite in the industry. However,we are not doing a good job at selling it, and this is really frustrating.
We are missing critical sales opportunities. We cannot blame the economy for our lack of execution. Our clients are hungry for analytical tools to improve their business outcomes. In fact, it is in times such as this, our clients want to get the insights they need to turn their businesses around. It is disheartening to see that we are failing at closing deals, in such a hungry market. Let's buckle up and execute.
Jennifer Baker
Sales Leader, North-East region
",
  analysis: {
  "document_tone": {
    "tone_categories": [
      {
        "tones": [
          {
            "score": 0.588902,
            "tone_id": "anger",
            "tone_name": "Anger"
          },
          {
            "score": 0.099852,
            "tone_id": "disgust",
            "tone_name": "Disgust"
          },
          {
            "score": 0.155578,
            "tone_id": "fear",
            "tone_name": "Fear"
          },
          {
            "score": 0.116998,
            "tone_id": "joy",
            "tone_name": "Joy"
          },
          {
            "score": 0.635377,
            "tone_id": "sadness",
            "tone_name": "Sadness"
          }
        ],
        "category_id": "emotion_tone",
        "category_name": "Emotion Tone"
      },
      {
        "tones": [
          {
            "score": 0.877401,
            "tone_id": "analytical",
            "tone_name": "Analytical"
          },
          {
            "score": 0,
            "tone_id": "confident",
            "tone_name": "Confident"
          },
          {
            "score": 0.264082,
            "tone_id": "tentative",
            "tone_name": "Tentative"
          }
        ],
        "category_id": "language_tone",
        "category_name": "Language Tone"
      },
      {
        "tones": [
          {
            "score": 0.217357,
            "tone_id": "openness_big5",
            "tone_name": "Openness"
          },
          {
            "score": 0.483465,
            "tone_id": "conscientiousness_big5",
            "tone_name": "Conscientiousness"
          },
          {
            "score": 0.887077,
            "tone_id": "extraversion_big5",
            "tone_name": "Extraversion"
          },
          {
            "score": 0.217083,
            "tone_id": "agreeableness_big5",
            "tone_name": "Agreeableness"
          },
          {
            "score": 0.565892,
            "tone_id": "emotional_range_big5",
            "tone_name": "Emotional Range"
          }
        ],
        "category_id": "social_tone",
        "category_name": "Social Tone"
      }
    ]
  }
},
  user_id: demo_user.id,
  title: "First blurb"
)
