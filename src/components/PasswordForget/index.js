import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Navbar from '../NavBar';

const PasswordForgetPage = () => (
  <div>
    <Navbar title={"Sign In"}  to={ROUTES.SIGN_IN} text={"Go back"}/>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
        <div>
            <div class="container login-form">
                <div class="row">
                    <div class="col-sm-5 login-wrapper">
                        <h3 className="text-center">Forgot your password?</h3>
                      <form  className="formForgotPassword" onSubmit={this.onSubmit}>
                        <input
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          type="text"
                          placeholder="Email Address"
                        />
                        <button disabled={isInvalid} type="submit">
                          Reset My Password
                        </button>

                        {error && <p>{error.message}</p>}
                      </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
