import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCfuZPrerZxoHgu2DrKtVvX38w_GrFPqqk",
    authDomain: "open-innovation-pn.firebaseapp.com",
    databaseURL: "https://open-innovation-pn.firebaseio.com",
    projectId: "open-innovation-pn",
    storageBucket: "open-innovation-pn.appspot.com",
    messagingSenderId: "599877382405"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.st = app.storage();
    this.emailAuthProvider = app.auth.EmailAuthProvider;
    //this.storage = app.storage();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    doGet = (email, password) => this.emailAuthProvider.credential(email, password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  projects = () => this.db.ref('projects');

  project = id => this.db.ref(`projects/${id}`);

  userProjects = (uid,projectid) => this.db.ref(`users/${uid}/projectsSuggested/${projectid}/`);

  userSuggested = (id,uid) => this.db.ref(`projects/${id}/usersSuggested/${uid}/`);

  urlDownload = (url) => this.st.ref(url);

  docsProjects = (id) => this.st.ref(`projects/${id}`);

}

export default Firebase;
