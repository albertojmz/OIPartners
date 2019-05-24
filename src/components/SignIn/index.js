import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Navbar from '../NavBar';

import img from '../../img/LOGOFINALTEXTO2.png';
const SignInPage = () => (
  <div>
      <Navbar title={"Sign up"} to={ROUTES.SIGN_UP} text={"Don't have an account?"}/>
    <SignInForm />


  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};


    class SignInFormBase extends Component {
        constructor(props) {
            super(props);


            this.state = {...INITIAL_STATE};
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if ((authUser)) {
                        this.props.history.push(ROUTES.HOME);
                    }
                },
            );
        }




        onSubmit = event => {
            const {email, password} = this.state;

            this.props.firebase
                .doSignInWithEmailAndPassword(email, password)
                .then(() => {
                    this.setState({...INITIAL_STATE});
                    this.props.history.push(ROUTES.HOME);
                })
                .catch(error => {
                    this.setState({error});
                });

            event.preventDefault();
        };

        onChange = event => {
            this.setState({[event.target.name]: event.target.value});
        };

        render() {
            const {email, password, error} = this.state;

            const isInvalid = password === '' || email === '';

            return (

                <div>
                    <div class="container login-form">
                        <div class="row">
                            <div class="col-sm-5 login-wrapper">
                                <img src={img} alt="logo" className="img-signin"/>
                                {error && <div class="alert alert-danger" role="alert"><b></b> {error.message}</div>}


                                <form onSubmit={this.onSubmit} id="loginForm" class="form-signin"
                                      data-toggle="validator" role="form">

                                    <div class="form-group">
                                        <label for="email">Email:</label>
                                        <input value={email} onChange={this.onChange} type="text" class="form-control"
                                               name="email" id="email" placeholder="Email" required autofocus/>
                                    </div>

                                    <div class="form-group">
                                        <label for="password">Password:</label>
                                        <input value={password} onChange={this.onChange} type="password" name="password"
                                               id="password" class="form-control" placeholder="Password" required/>

                                    </div>

                                    <button class="btn btn-lg btn-primary btn-block " type="submit"
                                            disabled={isInvalid}>SIGN IN
                                    </button>
                                    <label class="checkbox pull-right remember-me">
                                        <input type="checkbox" name="remember-me" value="remember-me"/>Remember me
                                    </label>
                                    <div className="forgetPassword">
                                        <PasswordForgetLink/>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>

                </div>

            );
        }

}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
