import React from 'react';
import { withRouter } from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '../../css/react-sidenav.css';
import img from "../../img/user.jpg";
import {withFirebase} from "../Firebase";
import {compose} from "recompose";
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';
import { MDBBadge} from 'mdbreact';

const SidebarPage = () => (
    <div id="fd">

        <Sidebar/>


    </div>
);

class SidebarBase extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name:"",
            email:"",
            notice: 0
        }
    }


    componentDidMount(){
        var notice = 0;
        document.getElementById("toggle").click();
        this.props.firebase.projects().once("value", snapshot => {

                var object = Object.entries(snapshot.val());
                object.map((project, i) => {
                    if (project[1].ownerId === this.props.firebase.auth.currentUser.uid) {

                        if(project[1].noticeOwner === true){ notice++}

                    }
                    if(project[1].usersSuggested !== ''){
                        var users = Object.entries(project[1].usersSuggested);

                        if(users.find(e => e[0] === this.props.firebase.auth.currentUser.uid) !== undefined) {

                            if(users.find(e => e[0] === this.props.firebase.auth.currentUser.uid)[1].noticeSuggested === true){ notice++}

                        }
                    }
                })

                if(notice !== 0){
                    document.getElementById("notice").style.display =""
                }
                this.setState({
                    notice: notice});
        })





    }

    componentWillMount() {

        console.log("hola")
        console.log(this.props.firebase.auth.currentUser.uid);
        console.log(this.props.firebase.user(this.props.firebase.auth.currentUser.uid));

        this.props.firebase.user(this.props.firebase.auth.currentUser.uid).on("value", snapshot => {
            console.log(snapshot.val());
            this.setState({
                name : snapshot.val().username,
                email: snapshot.val().email,
            })
        })

    }

    homeClick(){
        this.props.history.push({pathname: ROUTES.HOME});
    }

    projectList(){
        this.props.history.push({pathname: ROUTES.PROJECTS});
    }

    createProject(){
        this.props.history.push({pathname: ROUTES.CREATEPROJECTS});
    }

    profile(){
        this.props.history.push({pathname: ROUTES.PROFILE});

    }

    render(){

        return(
            <SideNav


            >
                <SideNav.Toggle  className="hidden" id="toggle" onClick={()=> console.log('clicked')}/>
                <div className="headerSidebar">
                    <p className="headerTitle"> OI Partners</p>
                </div>
                <div className="headerSidebar2">
                    <div >
                        <img className="headerSidebar2img" src={img} alt="User picture"/>
                    </div>
                    <div className="headerSidebar2title">
                        <span>User</span>
                        <p><label style={{marginBottom:"auto"}}>{this.state.name}</label><br/> <label>{this.state.email}</label></p>
                    </div>

                </div>

                <SideNav.Nav defaultSelected="">

                    <div className="menuDescription">
                        <span> General </span>
                    </div>

                    <NavItem eventKey="HOME" onClick={()=> this.homeClick()}>
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', marginTop:"6px"  }} />
                        </NavIcon>
                        <NavText>
                            Dashboard

                        </NavText>
                    </NavItem>
                    <NavItem eventKey="charts">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em', marginTop:"15px" }}/>
                        </NavIcon>
                        <NavText>

                            Projects
                            <label>
                            <MDBBadge pill id="notice" style={{fontSize:"1.2em", backgroundColor:"orange", marginLeft:"15px", display:"none"}}>
                                <label>{this.state.notice}</label>
                            </MDBBadge>
                            </label>

                        </NavText>
                        <NavItem eventKey="LANDING">
                            <NavText>
                                <div onClick={()=>this.projectList()}>
                                    Project List
                                </div>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>
                                <div onClick={()=> this.createProject()}>
                                    Create a Project
                                </div>
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="HOME" onClick={()=> this.profile()}>
                        <NavIcon>
                            <i className="fas fa-user-circle" style={{ fontSize: '1.75em', marginTop:"15px"  }} />
                        </NavIcon>
                        <NavText>
                            Profile
                        </NavText>
                    </NavItem>
                    <NavItem onClick={this.props.firebase.doSignOut}>
                        <NavIcon>
                            <i className="far fa-times-circle" style={{ fontSize: '1.75em', marginTop:"12px" }}  />
                        </NavIcon>
                        <NavText>
                            Sign Out
                        </NavText>
                    </NavItem>
                </SideNav.Nav>


            </SideNav>
        )
    }




}


const Sidebar = compose(
    withRouter,
    withFirebase,
)(SidebarBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(SidebarPage);
