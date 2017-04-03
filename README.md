## Tonealyzer
### Background

Mapping the tone of your writing to what you are trying to convey is both vitally important, and challenging to get right. Who hasn’t sent an email and had the message misunderstood as being overly aggressive or inappropriately cheery? This app leverages powerful natural language processing algorithms developed by IBM Watson to provide feedback to users on the tone of their content, so that their writing gets across its intended message.


### Functionality and MVP
- Login with username or FaceBook/Gmail via OmniAuth
Demo account with seeded data to be provided as well
- Dashboard with:
  - List of text samples submitted
  - Analytics of tone change-over-time (aka is my tone getting better)
- Text analysis show page with Watson analysis of given text sample
- Text sample submission page where user can cut/paste or type in what they want analyzed
- Production README

### Wireframes
[View Wireframes][wireframes]

### Technologies
We are planning on using a Rails server and PostgreSQL database to store user information, text files, and analysis results. The front end will be written in React. The data visualizations will be done using d3 and integrated into React. We will be calling the IBM Watson Tone Analyzer API to obtain information on writing tone.

[wireframes]: docs/wireframes


### Group Members & Work Breakdown

We have three members in our group: Ken Lee, Alicia Savelly, and Elan Weinstock.

Ken's primary responsibilities will be:

* Researching and implementing D3 content on dashboard page
* Creating dashboard page
* Adding seed data for demo account
* CSS styling for results page

Alicia's primary responsibilities will be:

* Implementing OmniAuth and general user login with username and password
* Setting up demo account
* Creating splash page
* Styling navbar
* Adding previously submitted documents
* Dashboard page styling
* README

Elan's primary responsibilities will be:

* Working with Watson API to get relevant information on the frontend
* Setting up backend (models and controllers) for users’ saved information
* Setting up redux loop for users’ information
* Creating form page
* Creating and styling login/signup modal
* Create results page

### Implementation Timeline

**Ahead of time:**

* Research the Watson APIs (Elan)
* Research D3 (Ken)
* Research OmniAuth (Alicia)


**Day 1:** Set up backend auth (including OmniAuth), models and controllers for users’ info, create basic dashboard page, and delve into D3.

* Set up OmniAuth for Facebook and Google (Alicia)
* Set up auth for general login with username and password (Alicia)
* Learn how to use Watson APIs and integrate results into our project (specifically Tone Analyzer and Personality Insights) (Elan)
* Backend setup of models and controllers for users' saved information (Elan)
* Create dashboard page (Ken)
* Learn how to use D3 to create graphs which will be used to show users how their submission results have changed over time and begin working on this if time allows (Ken)

**Day 2:** Set up demo account, splash page, reducer for user information, form page, and D3 content on dashboard page.

* Set up demo account (Alicia)
* Create splash page (Alicia)
* Create utils, actions, reducers to allow requests and creation of users' information (Elan)
* Create form page (Elan)
* Start adding change over time section (using D3) to dashboard page (Ken)

**Day 3:** Add login/signup modal, continue dashboard D3 content, add personality results, and work on finalizing CSS styling.

* Add modal for login (Elan)
* Finish change over time section to dashboard page (Ken)
* Add personality results section to dashboard page (Alicia)
* CSS styling for splash page (Alicia)
* CSS styling for auth modal (Elan)
* CSS styling for navbar (Alicia)

**Day 4:** Add previously submitted documents section, begin results page, add seed data, and continue CSS styling.

* Add previously submitted documents section to dashboard page (Alicia)
* Begin creating results page (Elan)
* Add seed data to demo account (Ken)
* CSS styling for dashboard page (Alicia)

**Day 5:** Tie up loose ends to create a complete project, write README, and finish results page.

* Finish creating results page (Elan)
* CSS styling for results page (Ken)
* Write README (Alicia)

### Bonus Features
* File Upload
* Speech Analysis option via speech to text API
* Spell check/grammar check
* Multiple language availability
