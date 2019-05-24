# OIPartners


## Features

* uses:
  * only React (create-react-app)
  * firebase 5
  * react-router 4
  * no Redux/MobX
    * [Redux Version](https://github.com/taming-the-state-in-react/react-redux-firebase-authentication)
    * [MobX Version](https://github.com/taming-the-state-in-react/react-mobx-firebase-authentication)
  * [React's 16.3 context API](https://reactjs.org/blog/2018/03/29/react-v-16-3.html)
* features:
  * Sign In
  * Sign Up
  * Sign Out
  * Password Forget
  * Password Change
  * Protected Routes with Authorization
  * Database: Users
  * Dashboard
  * Create Projects
  * Manage Projects
  * Search Partners
  * Evaluate Partners


## Installation

* `git clone git@github.com/albertojmz/OIPartners.git`
* `cd OIPartners React`
* `npm install`
* `npm start`
* visit http://localhost:3000/
* Use your own Firebase Credentials

### Use your own Firebase Credentials

* visit https://firebase.google.com/ and create a Firebase App
* copy and paste your Credentials from your Firebase App into src/firebase/firebase.js
* activate Email/Password Sign-In Method in your Firebase App
* create in the Database: {
	users: "",
	projects: ""
}
