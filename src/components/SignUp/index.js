import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Navbar from '../NavBar';
import { compose } from 'recompose';
import MapboxAutocomplete from 'react-mapbox-autocomplete';


import '../../css/login.css'
import continents from '../../constants/continents';


const SignUpPage = () => (
  <div>
    <Navbar  title={"Sign in"}  to={ROUTES.SIGN_IN} text={"Already have an account?"}/>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  type: '',
  category: '',
  dateIn: '',
  uid:'',
  continent:'',
  city:'',
  latitude:'',
  longitude:'',
  error: null,
};

const TOKEN = 'pk.eyJ1IjoibWFyaW9wbiIsImEiOiJjanJ0NTBmN28waHZkNDluOGlna29keGxwIn0.Wp6-w3f9R3tf_F5vaBjN4w'

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
        this._suggestionSelect= this._suggestionSelect.bind(this);
        this.getChecked = this.getChecked.bind(this);

    }


    _suggestionSelect(result, lat, lng, text) {
        var resultado = result.split(', ');
        var country = resultado[resultado.length-1];
        Object.keys(continents).map( key => continents[key].find( count => {if(count === country){
            this.setState({continent: key})
        }}))
        this.setState({
            country: country,
            latitude: lat,
            longitude: lng,
            city: text,
        })
    }

    onSubmit = event => {


        const {username, email, passwordOne, type, category, dateIn, uid, continent, country, city, latitude, longitude} = this.state;

        const today = new Date().toLocaleDateString("en-US");

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        type,
                        category,
                        dateIn: today,
                        uid: authUser.user.uid,
                        continent,
                        city,
                        country,
                        latitude,
                        longitude
                    })
                    .then(() => {
                        this.setState({...INITIAL_STATE});
                        this.props.history.push(ROUTES.HOME);
                    })
                    .catch(error => {
                        this.setState({error});
                    });
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };




    getChecked(value){

        var string = this.state.category;

        if (string === ''){

            var elements = []

            elements.push(value)

            var str = elements.join(", ")

            this.setState({
                category: str
            })

        }

        else {

            var elements = string.split(", ")
            if (elements.find(e => e === value) !== undefined){
                elements.splice(elements.indexOf(value),1);
            }

            else if (elements.find(e => e === value) === undefined){
                elements.push(value);
            }

            var str = elements.join(", ")
            this.setState({
                category: str
            })

        }


    }


    render() {

        console.log(this.state)
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            type,
            category,
            date,
            uid,
            error,
            continent,
            city,
            latitude,
            longitude,
            country
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '' ||
            type === '' ||
            continent === ''

        ;


        return (
            <div className="container login-form">
                <div className="row">
                    <div className="col-sm-5 login-wrapper">
                        <h3 className="text-center">Sign up</h3>

                        {error && <div className="alert alert-danger" role="alert"><b></b> {error.message}</div>}

                        <form className="form-signin" role="form" method="post" action="" data-toggle="validator"
                              onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label for="name">Name</label>
                                <input value={username} onChange={this.onChange} type="text" name="username" id="name"
                                       className="form-control" placeholder="Type your name" required
                                       onblur="validateName(this);"/>
                            </div>

                            <div className="form-group">
                                <label for="email">Email</label>
                                <input value={email} onChange={this.onChange} type="text" name="email" id="email"
                                       className="form-control" placeholder="Type your email" required
                                       onblur="validateEmail(this);"/>
                            </div>

                            <div className="form-group">
                                <label for="password">Password</label>
                                <input value={passwordOne} onChange={this.onChange} type="password" name="passwordOne"
                                       id="password" className="form-control" placeholder="Type your password" required
                                       onblur="validatePassword(this);"/>
                                <span id="password-length"></span>
                            </div>

                            <div className="form-group">
                                <label for="confirmPassword">Confirm password</label>
                                <input value={passwordTwo} onChange={this.onChange} name="passwordTwo" type="password"
                                       id="confirmPassword" data-match="#password"
                                       data-match-error="Passwords don't match." className="form-control"
                                       placeholder="Confirm your password" required
                                       onblur="validateConfirmPassword(this);"/>
                                <div className="help-block with-errors"></div>
                            </div>
                            <div className="form-group">
                                <MapboxAutocomplete publicKey={TOKEN} placeholder="Location" inputClass='form-control input search'
                                                onSuggestionSelect={this._suggestionSelect} resetSearch={false}/>
                            </div>
                            <div name="type_signin" id="type_signin">
                                <div className="form-group">
                                    <label for="type">Type</label>
                                    <select onChange={this.onChange} name="type">
                                        <option value=''>Please select an option</option>
                                        <option value="University" >University</option>
                                        <option value="Research Center">Research Center</option>
                                        <option value="Enterprise">Enterprise</option>
                                        <option value="SME">SME</option>
                                    </select>
                                </div>
                            </div>

                            <div name="category_signin" id="category_signin">
                                <p className="title">Known Areas:</p>
                                <div className="col-md-6">

                                    <div className="custom-control custom-checkbox" id="element_category">
                                        <input type="checkbox" className="custom-control-input" id="defaultChecked1"
                                               value="Architecture" onClick={() => this.getChecked("Architecture")}/>
                                        <label style={{paddingTop:"4px"}} className="custom-control-label" for="defaultChecked1" id="element">Architecture</label>
                                    </div>
                                    <div className="custom-control custom-checkbox" id="element_category">
                                        <input type="checkbox" className="custom-control-input" id="defaultChecked2"
                                               value="Biology" onClick={() => this.getChecked("Biology")}/>
                                        <label  style={{paddingTop:"4px"}} className="custom-control-label" for="defaultChecked2"
                                               id="element">Biology</label>
                                    </div>
                                    <div className="custom-control custom-checkbox " id="element_category">
                                        <input type="checkbox" className="custom-control-input" id="defaultChecked3"
                                               value="Agriculture" onClick={() => this.getChecked("Agriculture")}/>
                                        <label style={{paddingTop:"4px"}} className="custom-control-label" for="defaultChecked3"
                                               id="element">Agriculture</label>
                                    </div>
                                    <div className="custom-control custom-checkbox " id="element_category">
                                        <input type="checkbox" className="custom-control-input" id="defaultChecked4"
                                               value="Health" onClick={() => this.getChecked("Health")}/>
                                        <label style={{paddingTop:"4px"}} className="custom-control-label" for="defaultChecked4"
                                               id="element">Health</label>
                                    </div>
                                    <div className="custom-control custom-checkbox " id="element_category">
                                        <input type="checkbox" className="custom-control-input" id="defaultChecked5"
                                               value="Humanistic"onClick={() => this.getChecked("Humanistic")} />
                                        <label style={{paddingTop:"4px"}} className="custom-control-label" for="defaultChecked5"
                                               id="element">Humanistic</label>
                                    </div>
                                    <div className="custom-control custom-checkbox " id="element_category">
                                        <input type="checkbox" className="custom-control-input" id="defaultChecked6"
                                               value="Chemical" onClick={() => this.getChecked("Chemical")}/>
                                        <label style={{paddingTop:"4px"}} className="custom-control-label" for="defaultChecked6"
                                               id="element">Chemical</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="custom-control custom-checkbox" id="element_category">
                                        <input type="checkbox"  className="custom-control-input" id="defaultChecked7"
                                               value="Social" onClick={() => this.getChecked("Social")}/>
                                        <label style={{paddingTop:"4px"}} className="custom-control-label" for="defaultChecked7"
                                               id="element">Social</label>
                                    </div>
                                    <div className="custom-control custom-checkbox " id="element_category">
                                        <input type="checkbox"  className="custom-control-input" id="defaultChecked8"
                                               value="Artistics" onClick={() => this.getChecked("Artistics")}/>
                                        <label style={{paddingTop:"4px"}} className="custom-control-label" for="defaultChecked8"
                                               id="element">Artistics</label>
                                    </div>
                                    <div className="custom-control custom-checkbox " id="element_category">
                                        <input type="checkbox"  className="custom-control-input" id="defaultChecked9"
                                               value="Economy" onClick={() => this.getChecked("Economy")}/>
                                        <label style={{paddingTop:"4px"}} className="custom-control-label" for="defaultChecked9"
                                               id="element">Economy</label>
                                    </div>
                                    <div className="custom-control custom-checkbox" id="element_category">
                                        <input type="checkbox" className="custom-control-input" id="defaultChecked10"
                                               value="Education" onClick={() => this.getChecked("Education")}/>
                                        <label style={{paddingTop:"4px"}} className="custom-control-label" for="defaultChecked10"
                                               id="element">Education</label>
                                    </div>
                                    <div className="custom-control custom-checkbox " id="element_category">
                                        <input type="checkbox" className="custom-control-input" id="defaultChecked11"
                                               value="Engineering" onClick={() => this.getChecked("Engineering")}/>
                                        <label style={{paddingTop:"4px"}} className="custom-control-label" for="defaultChecked11"
                                               id="element">Engineering</label>
                                    </div>
                                    <div className="custom-control custom-checkbox " id="element_category">
                                        <input type="checkbox"  className="custom-control-input" id="defaultChecked12"
                                               value="Mathematics" onClick={() => this.getChecked("Mathematics")}/>
                                        <label style={{paddingTop:"4px"}} className="custom-control-label" for="defaultChecked12"
                                               id="element">Mathematics</label>
                                    </div>
                                </div>


                            </div>

                            <input type="hidden" name="checked" id="checked"/>


                            <button className="btn btn-lg btn-primary btn-block " type="submit"
                                    disabled={isInvalid} >Register
                            </button>
                            <label className="checkbox pull-right remember-me">
                                <input type="checkbox" name="agreement" value="agreement" required/>Accept user
                                agreement
                            </label>

                        </form>

                    </div>
                </div>
            </div>
        );
    }
}


const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);


export default SignUpPage;

export { SignUpForm};
