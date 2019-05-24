import React from 'react';

import { withAuthorization } from '../Session';
import Sidebar from '../Sidebar';
import NavBar from "../generalNavbar";
import {withFirebase} from "../Firebase";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import { Chart } from "react-google-charts";


import {VectorMap} from 'react-jvectormap';




const HomePage = () => (
  <div id="fd">
      <NavBar title={"Dashboard"}/>
    <Sidebar />
    <Dashboard/>

  </div>
);


class DashboardBase extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            haveRemoved : false,
            projects:[],
            projectsSuggested:[],
            jan: 0, feb: 0, mar:0,apr:0,may:0,jun:0,jul:0,aug:0,sep:0,oct:0,nov:0,dec:0,
            jan2: 0, feb2: 0, mar2:0,apr2:0,may2:0,jun2:0,jul2:0,aug2:0,sep2:0,oct2:0,nov2:0,dec2:0,
            notice: 0,
            partners: [],
            nodes:[],
            countries:[],
            loading:true,
        }

    }


    componentDidMount(){

        setTimeout(()=> {
            this.setState({
                loading:false
            })
        }, 1000);



        var projects = []; var projectsSuggested = [];
        var notice = 0;
        var jan =0;var feb =0;var mar =0;var apr =0; var may =0;var jun =0;var jul =0;var aug =0;var sep =0;var oct =0;var nov =0;var dec =0;
        var jan2 =0;var feb2 =0;var mar2 =0;var apr2 =0;var may2 =0;var jun2 =0;var jul2 =0;var aug2 =0;var sep2 =0;var oct2 =0;var nov2 =0;var dec2 =0;

        var partners = [];
        var nodes = [];
        var countries = [];

        this.props.firebase.projects().once("value", snapshot => {
            if(this.state.haveRemoved === false) {
                var object = Object.entries(snapshot.val());
                object.map((project, i) => {
                    if (project[1].ownerId === this.props.firebase.auth.currentUser.uid) {
                        projects.push(project);
                        if(project[1].startDate.split("-",1)[0] === "1"){jan++};
                        if(project[1].startDate.split("-",1)[0] === "2"){feb++};
                        if(project[1].startDate.split("-",1)[0] === "3"){mar++};
                        if(project[1].startDate.split("-",1)[0] === "4"){apr++};
                        if(project[1].startDate.split("-",1)[0] === "5"){may++};
                        if(project[1].startDate.split("-",1)[0] === "6"){jun++};
                        if(project[1].startDate.split("-",1)[0] === "7"){jul++};
                        if(project[1].startDate.split("-",1)[0] === "8"){aug++};
                        if(project[1].startDate.split("-",1)[0] === "9"){sep++};
                        if(project[1].startDate.split("-",1)[0] === "10"){oct++};
                        if(project[1].startDate.split("-",1)[0] === "11"){nov++};
                        if(project[1].startDate.split("-",1)[0] === "12"){dec++};

                        if(project[1].noticeOwner === true){ notice++}

                        Object.entries(project[1].usersSuggested).map((user,i) => {
                            console.log(user)
                            if(user[1].state !== "Contacted" && user[1].state !== "contacted" && user[1].state !== "Denied" && user[1].state !== "denied"){
                                if(partners.find(e => e[0] === user[0]) === undefined){
                                    console.log([user[1].partnerSelected.uid,{latLng: [user[1].partnerSelected.latitude, user[1].partnerSelected.longitude], name: user[1].partnerSelected.city}])
                                    partners.push([user[1].partnerSelected.uid,{latLng: [user[1].partnerSelected.latitude, user[1].partnerSelected.longitude], name: user[1].partnerSelected.city}])
                                    nodes.push({latLng: [user[1].partnerSelected.latitude, user[1].partnerSelected.longitude], name: user[1].partnerSelected.city});
                                    if(countries.find(e => e === user[1].partnerSelected.country) === undefined) {
                                        if(user[1].partnerSelected.country !== undefined){countries.push(user[1].partnerSelected.country)}
                                    }

                                }
                            }
                        })

                    }
                    if(project[1].usersSuggested !== ''){
                        var users = Object.entries(project[1].usersSuggested);

                        if(users.find(e => e[0] === this.props.firebase.auth.currentUser.uid) !== undefined) {
                            projectsSuggested.push(project);
                            if(project[1].startDate.split("-",1)[0] === "1"){jan2++};
                            if(project[1].startDate.split("-",1)[0] === "2"){feb2++};
                            if(project[1].startDate.split("-",1)[0] === "3"){mar2++};
                            if(project[1].startDate.split("-",1)[0] === "4"){apr2++};
                            if(project[1].startDate.split("-",1)[0] === "5"){may2++};
                            if(project[1].startDate.split("-",1)[0] === "6"){jun2++};
                            if(project[1].startDate.split("-",1)[0] === "7"){jul2++};
                            if(project[1].startDate.split("-",1)[0] === "8"){aug2++};
                            if(project[1].startDate.split("-",1)[0] === "9"){sep2++};
                            if(project[1].startDate.split("-",1)[0] === "10"){oct2++};
                            if(project[1].startDate.split("-",1)[0] === "11"){nov2++};
                            if(project[1].startDate.split("-",1)[0] === "12"){dec2++};
                            if(users.find(e => e[0] === this.props.firebase.auth.currentUser.uid)[1].noticeSuggested === true){ notice++}

                            if (users.find(e => e[0] === this.props.firebase.auth.currentUser.uid)[1].state)
                                if(users.find(e => e[0] === this.props.firebase.auth.currentUser.uid)[1].state !== "Contacted" && users.find(e => e[0] === this.props.firebase.auth.currentUser.uid)[1].state !== "contacted" && users.find(e => e[0] === this.props.firebase.auth.currentUser.uid)[1].state !== "Denied" && users.find(e => e[0] === this.props.firebase.auth.currentUser.uid)[1].state !== "denied") {

                                    this.props.firebase.user(project[1].ownerId).on('value', snapshot => {
                                        if (partners.find(e => e[0] === snapshot.val().uid) === undefined) {
                                            partners.push([snapshot.val().uid, {country: snapshot.val().country}, {
                                                latLng: [snapshot.val().latitude, snapshot.val().longitude],
                                                name: snapshot.val().city
                                            }]);
                                            nodes.push({
                                                latLng: [snapshot.val().latitude, snapshot.val().longitude],
                                                name: snapshot.val().city
                                            })
                                            if (countries.find(e => e === snapshot.val().country) === undefined) {
                                                if (snapshot.val().country !== undefined) {
                                                    countries.push(snapshot.val().country)
                                                }
                                            }
                                        }

                                    })
                                }

                        }


                    }




                })
                this.setState({projects: projects, projectsSuggested: projectsSuggested,
                    jan:jan,feb:feb,mar:mar,apr:apr,may:may,jun:jun,jul:jul,aug:aug,sep:sep,oct:oct,nov:nov,dec:dec,
                    jan2:jan2,feb2:feb2,mar2:mar2,apr2:apr2,may2:may2,jun2:jun2,jul2:jul2,aug2:aug2,sep2:sep2,oct2:oct2,nov2:nov2,dec2:dec2,
                    partners:partners, nodes:nodes, countries:countries,
                    notice: notice});


            }
        })


    }





    render(){

        const {jan,feb,mar,apr,may, jun, jul, aug, sep, oct, nov, dec,jan2,feb2,mar2,apr2,may2, jun2, jul2, aug2, sep2, oct2, nov2, dec2} = this.state;

        console.log(this.state)

        return(
                <div class="dashboard-container">
                    <div className="container-fluid" id="dashboard-container">
                        <div className="row" id="row-dashboard-1">
                            <div className="col-sm-6 col-lg-3">
                                <div className="mini-card">
                                    <div className="content" id="mini-card-content">
                                        <div className="row">
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <i className="far fa-file"></i>
                                            </div>
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <p className="mini-card-title">Own Projects</p>
                                                <span className="mini-card-value">{this.state.projects.length}</span>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer" id="mini-card-footer">
                                        <span className="mini-card-description">Projects created</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="mini-card">
                                    <div className="content" id="mini-card-content">
                                        <div className="row">
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <i className="fas fa-clipboard-list"></i>
                                            </div>
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <p className="mini-card-title">Projects invited</p>
                                                <span className="mini-card-value">{this.state.projectsSuggested.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer" id="mini-card-footer">
                                        <span className="mini-card-description">Projects invited</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="mini-card">
                                    <div className="content" id="mini-card-content">
                                        <div className="row">
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <i className="far fa-handshake"></i>
                                            </div>
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <p className="mini-card-title">Partners</p>
                                                <span id="partnersNumber" className="mini-card-value">{this.state.partners.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer" id="mini-card-footer" style={{marginTop:"19px"}}>
                                        <span className="mini-card-description">Partners reached</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="mini-card">
                                    <div className="content" id="mini-card-content">
                                        <div className="row">
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <i className="far fa-flag"></i>
                                            </div>
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <p className="mini-card-title">Countries</p>
                                                <span className="mini-card-value">{this.state.countries.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer" id="mini-card-footer" style={{marginTop:"19px"}}>
                                        <span className="mini-card-description">Countries reached</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" id="row-dashboard-2">
                            <div className="chart-container normal-card" id="chartProjects"  align="center" style={{position: "relative",  width:"98%"}}>

                                <span className="mini-card-title" style={{fontWeight:"bold"}}>Projects Progress</span>

                                <div id="sas" >
                                    {(this.state.loading) ? (<img id="spinner" src ="https://cdn-images-1.medium.com/max/1600/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />) :
                                        (<Chart
                                        width={'100%'}
                                        height={'300px'}
                                        chartType="Bar"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Month', 'Projects created', 'Projects invited'],
                                            ['January', jan, jan2],
                                            ['February', feb, feb2],
                                            ['March', mar, mar2],
                                            ['April', apr, apr2],
                                            ['May', may, may2],
                                            ['June', jun, jun2],
                                            ['July', jul, jul2],
                                            ['August', aug, aug2],
                                            ['September', sep, sep2],
                                            ['October', oct, oct2],
                                            ['November', nov, nov2],
                                            ['December', dec, dec2],
                                        ]}
                                        options={{
                                            title: 'Population of Largest U.S. Cities',
                                            chartArea: { width: '50%' },
                                            colors: ['sandybrown', 'skyblue'],
                                            hAxis: {
                                                title: 'Total Projects',
                                                minValue: 0,
                                            },
                                            vAxis: {
                                                title: 'City',
                                            },
                                        }}
                                        // For tests
                                        rootProps={{ 'data-testid': '4' }}
                                    />)}
                                </div>

                            </div>
                        </div>
                        <div className="row" id="row-dashboard-2">
                            <div className="map-card">

                                <div className="col-lg-12">
                                    <div align="center">
                                        <span className="mini-card-title" style={{fontWeight:"bold"}}>Countries reached:</span>
                                        <p><span>(It shows the partners of the projects accepted)</span></p>

                                    </div>
                                    <div style={{width: '100%', height: 200, marginTop:"20px"}}>
                                        <VectorMap map={'world_mill'}
                                                   backgroundColor="#BAD8E4"
                                                   ref="map"
                                                   containerStyle={{
                                                       width: '100%',
                                                       height: '100%'
                                                   }}
                                                   containerClassName="map"
                                                   markers={
                                                      this.state.nodes}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>




                </div>










                )
    }
};

const Dashboard = compose(
    withRouter,
    withFirebase,
)(DashboardBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
