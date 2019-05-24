import React from 'react';

import { withAuthorization } from '../Session';
import Sidebar from '../Sidebar';
import NavBar from "../generalNavbar";
import {withFirebase} from "../Firebase";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import {ProgressBar} from 'react-bootstrap';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import profile from '../../img/user-profile-2.png';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import continents from '../../constants/continents';


import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn} from 'mdbreact';
import ReactModal from 'react-modal';
import * as ROUTES from "../../constants/routes";





const ProfilePage = () => (
    <div id="fd">
        <NavBar title={"Profile"}/>
        <Sidebar/>
        <Profile/>

    </div>
);

const TOKEN = 'pk.eyJ1IjoibWFyaW9wbiIsImEiOiJjanJ0NTBmN28waHZkNDluOGlna29keGxwIn0.Wp6-w3f9R3tf_F5vaBjN4w'


class ProfileBase extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
           username : '',
            type: '',
            email:'',
            country : '',
            city: '',
            continent : '',
            category:'',
            latitude: '',
            longitude: '',
            oldPassword :'',
            newPassword:'',
            newPassword2:'',
            successPassword: '',
            errorPassword: null,
            errorEmail:null,
            sendEmail:'',
            successEmail:''

        }
        this._suggestionSelect= this._suggestionSelect.bind(this);
        this.getChecked = this.getChecked.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    };

    onChangeCategory = event => {
        this.setState({category : ""});
        this.setState({[event.target.name]: event.target.value});
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    onSubmit = event => {
        const { newPassword, oldPassword } = this.state;

        var cred = this.props.firebase.doGet(this.props.firebase.auth.currentUser.email, oldPassword);
        this.props.firebase.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(cred).then(() => {
            this.props.firebase
                .doPasswordUpdate(newPassword)
                .then(() => {
                    this.setState({successPassword: 'Password successfully updated'})
                    this.setState({errorPassword: ''})
                    this.setState({ ...this.state });
                })
                .catch(error => {
                    this.setState({ errorPassword: error});
                });
        }).catch(error => {
            this.setState({ errorPassword: error });
        });
        event.preventDefault();
    };


    onSubmitEmail = event => {
        const { sendEmail } = this.state;

        this.props.firebase
            .doPasswordReset(sendEmail)
            .then(() => {
                this.setState({ ...this.state });
                this.setState({ errorEmail: '' });
                this.setState({successEmail: 'Email sent correctly'})

            })
            .catch(error => {
                this.setState({ errorEmail: error });
            });

        event.preventDefault();
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



    componentDidMount(){
        this.props.firebase.user(this.props.firebase.auth.currentUser.uid).on("value", snapshot => {

            console.log(snapshot.val())

            this.setState({
                username: snapshot.val().username,
                type: snapshot.val().type,
                category: snapshot.val().category,
                country : snapshot.val().country,
                city: snapshot.val().city,
                email: snapshot.val().email,
                continent : snapshot.val().continent,
                latitude: snapshot.val().latitude,
                longitude: snapshot.val().longitude
            })
        })
    }

    handleOpenModal() {

        const {username, country, city, type, category} = this.state;

        this.setState({
            showModal: true,
            category:"",
            username2: username,
            country2: country,
            city2: city,
            type2: type,
            category2: category

        });
    }

    handleCloseModal() {


        this.setState({
            showModal: false,


        });

    }

    handleCloseModal2() {

        const {username2, country2,city2,type2,category2} = this.state;

        this.setState({
            showModal: false,
            category: category2,
            username : username2,
            type: type2,
            country: country2,
            city: city2

        });

    }



    updateProfile(){



        this.props.firebase.user(this.props.firebase.auth.currentUser.uid).update({
            username: this.state.username,
            type: this.state.type,
            continent: this.state.continent,
            country: this.state.country,
            city: this.state.city,
            category: this.state.category
        });

        this.handleCloseModal()


    }



    render() {

        console.log(this.state)

        const {
            username,
            type,
            category,
            continent,
            city,
            latitude,
            longitude,
            country,
            oldPassword,
            newPassword,
            newPassword2,
            sendEmail,
            errorPassword,
            successPassword,
            errorEmail,
            successEmail
        } = this.state;

        const isInvalid =

            username === '' ||
            type === '' ||
            continent === ''

        ;

        const isInvalidResetPassword =
            oldPassword === '' ||
            newPassword === '' ||
            newPassword2 === '' ||
            newPassword !== newPassword2;

        const isInvalidEmail =
            sendEmail === '';

        return (

            <div>
                <div class="row" style={{marginLeft: "340px"}}>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="projectView" style={{height:"230px"}}>

                            <ReactModal
                                isOpen={this.state.showModal}
                                contentLabel="Minimal Modal Example"
                                className="sendInfoView"
                                style={{

                                    overlay: {

                                        marginLeft: "275px"
                                    },
                                    content: {
                                        marginTop: "100px",
                                        backgroundColor: 'white',
                                        marginLeft: "230px",
                                        width: "60%",
                                        height: "600px",
                                        border: "1px solid #ddd",
                                        borderRadius: "10px",
                                        color: "#333",
                                        fontSize: " small"
                                    }
                                }}
                            >
                                <button style={{margin: "10px"}} onClick={() => this.handleCloseModal2()}>Close</button>
                                <div align="center" style={{marginTop: "20px"}}>
                                    <p style={{fontSize: "x-large", fontWeight: "bolder"}}>Edit user:</p>
                                </div>
                                <div align="center" style={{marginTop: "20px", width:"80%", marginLeft :" 60px"}}>

                                    <form className="form-signin" role="form" action="" data-toggle="validator">

                                        <div className="form-group">
                                            <label for="name">Name</label>
                                            <input value={username} onChange={this.onChange} type="text" name="username" id="name"
                                                   className="form-control" placeholder="Type your name" required
                                                   onblur="validateName(this);"/>
                                        </div>



                                        <div className="form-group" >
                                            <label for="map">Location</label>
                                            <MapboxAutocomplete name="map"publicKey={TOKEN} placeholder="Location" inputClass='form-control input search'
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
                                            <p className="title">Categories:</p>
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


                                        <MDBBtn outline color="success" style={{width:"400px"}}
                                                onClick={() => this.updateProfile()}>Update Profile</MDBBtn>



                                    </form>
                                </div>
                            </ReactModal>

                            <div class="col-lg-12 col-md-12 col-sm-12 row">
                                <div class="col-lg-3 col-md-3 col-sm-3 " align="center">
                                    <img src={profile} style={{width: "120px", height: "120px", marginTop:"10px"}}></img>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4 ">
                                    <p><label style={{fontWeight:"bold", marginRight:"10px"}}>Name: </label>{this.state.username}</p>
                                    <p><label style={{fontWeight:"bold", marginRight:"10px"}}>Email: </label>{this.state.email}</p>
                                    <p><label style={{fontWeight:"bold", marginRight:"10px"}}>Type: </label>{this.state.type}</p>
                                    <p><label style={{fontWeight:"bold", marginRight:"10px"}}>Categories: </label>{this.state.category}</p>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4 ">
                                    <p><label style={{fontWeight:"bold", marginRight:"10px"}}>City: </label>{this.state.city}</p>
                                    <p><label style={{fontWeight:"bold", marginRight:"10px"}}>Country: </label>{this.state.country}</p>
                                    <MDBBtn outline color="success"
                                            style={{width: "100%", marginTop:"20px"}}
                                            onClick={() => this.handleOpenModal()}>Edit Profile</MDBBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style={{marginLeft: "340px"}}>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="partnersSuggested" style={{fontSize:"larger"}}>
                            {successPassword ==='Password successfully updated' ? (<label style={{color: 'green', marginLeft:"10px"}}>{successPassword}</label>) : null}
                            {errorPassword && ((errorPassword.message === "Password should be at least 6 characters") ? (<label style={{color: 'red', marginLeft:"10px"}}>{errorPassword.message}</label>) : null)}

                            {errorPassword && ((errorPassword.message === 'The password is invalid or the user does not have a password.') ? (<label style={{color: 'red', marginLeft:"10px"}}>{errorPassword.message}</label>) : null)}


                            <div class="partnersHeader" align="center">
                                    <label style={{fontWeight:"bold"}}> Reset my password</label>
                            </div>

                            <div style={{width:"90%", marginLeft:"20px", marginTop:"20px"}}>
                                <p><label>Old password</label>
                                    <input
                                        type="password"
                                        className="form-control" onChange={this.onChange}
                                        name="oldPassword" id="oldPassword" value={oldPassword}
                                        placeholder={"Introduce your old password"}>
                                    </input></p>

                                <p><label>New password</label>
                                    <input
                                        type="password"
                                        className="form-control" onChange={this.onChange} name="newPassword" id="newPassword" value={newPassword}
                                        placeholder={"Introduce your new password"}>
                                    </input></p>

                                <p><label>Confirm new password</label>
                                    <input
                                        type="password"
                                        className="form-control" onChange={this.onChange} name="newPassword2" id="newPassword2" value={newPassword2}
                                        placeholder={"Confirm your new password"}>
                                    </input></p>

                                <div align="center">
                                    <MDBBtn outline color="danger" disabled={isInvalidResetPassword}
                                            style={{width: "50%", marginTop:"20px"}}
                                            onClick={this.onSubmit}
                                    >Reset password</MDBBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="partnersSuggested" id="chart" style={{fontSize:"larger"}}>
                            {successEmail ==="Email sent correctly" ? (<label style={{color: 'green', marginLeft:"10px"}}>{successEmail}</label>) : null}

                            {errorEmail && ((errorEmail.message === 'The email address is badly formatted.') ? (<label style={{color: 'red', marginLeft:"10px"}}>{errorEmail.message}</label>) : null)}
                            {errorEmail && ((errorEmail.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') ? (<label style={{color: 'red', marginLeft:"10px"}}>{errorEmail.message}</label>) : null)}

                            <div class="partnersHeader" align="center">
                                <label style={{fontWeight:"bold"}}> Forgot your password?</label>
                            </div>

                            <div style={{width:"90%", marginLeft:"20px", marginTop:"20px"}}>
                                  <p><label>Introduce your email:</label>
                                    <input
                                        type="text"
                                        className="form-control" onChange={this.onChange} name="sendEmail" id="sendEmail" value={sendEmail}
                                        placeholder={"Introduce your email"}>
                                    </input></p>



                                <div align="center">
                                    <MDBBtn  outline color="primary"
                                            style={{width: "50%", marginTop:"20px"}}
                                            disabled={isInvalidEmail}
                                             onClick={this.onSubmitEmail}
                                    >Send an email</MDBBtn>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )

    };
}

const Profile = compose(
    withRouter,
    withFirebase,
)(ProfileBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProfilePage);
