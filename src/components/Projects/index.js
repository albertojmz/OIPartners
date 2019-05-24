import React from 'react';

import { withAuthorization } from '../Session';
import firebase from 'firebase';

import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import NavBar from "../generalNavbar";
import {withFirebase} from "../Firebase";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import Chart from '../Chart/Chart.js';
import Map from '../Map/Map.js';
import Modal from '@material-ui/core/Modal';

import { MDBBtn,  MDBBadge, MDBContainer, MDBIcon} from 'mdbreact';


import * as ROUTES from "../../constants/routes";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ReactModal from 'react-modal';
import {differenceInDays} from "date-fns";
import Floater from 'react-floater';

import MappleToolTip from 'reactjs-mappletooltip';





const ProjectsPage = () => (
    <div id="fd">
        <NavBar title={"Projects"}/>
        <Sidebar/>
        <Projects/>

    </div>
);



class ProjectsBase extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
           projects : [],
           projectsSuggested : [],
           haveRemoved : false,
            showModal: false
        };




    }


    handleRowDel(id) {
        //var index = this.state.projects.indexOf(product);

        if(this.state.projects.find(e => e.id === id) !== undefined){
            this.state.projects.splice(this.state.projects.indexOf(this.state.projects.find(e => e.id === id)), 1);
            this.setState({projects: this.state.projects, haveRemoved : true});
        }


        console.log(this.state.projects);
        console.log(this.state.haveRemoved);
        //this.props.firebase.project(r[0]).remove();
        this.props.firebase.project(id).remove();

        this.state.urls.map(url => {
            this.props.firebase.urlDownload(url).delete()
        })

        this.handleCloseModal()

    };

    componentWillUnmount(){
        console.log("componentWillUnmount")
        this.props.firebase.projects().off()
    }

    getDays(id,project){

        var startDate=new Date(project.startDate);
        var endDate = new Date(project.endDate);
        var today = new Date()



        if( today <= startDate){
            console.log("0%")
            this.props.firebase.project(id).update({
                progress: "0",
                status: "Not started"
            })

        }

        else if ( today >= endDate){
            console.log("100%")
            this.props.firebase.project(id).update({
                progress: "100",
                status:"Finished"

            })

        }
        else{
            var totalDays = differenceInDays(
                endDate,
                startDate

            )

            var currentDays = differenceInDays(
                new Date(),
                startDate
            )
            console.log(startDate)
            console.log(endDate)

            console.log(totalDays)
            console.log(
                currentDays)
            console.log(Math.round((currentDays/totalDays)*100)+"%")
            this.props.firebase.project(id).update({
                progress: Math.round((currentDays/totalDays)*100),
                status: "Ongoing"
            })


        }



    }

    componentDidMount(){



        var projects = [];
        var projectsSuggested = [];

        this.props.firebase.projects().on("value", snapshot => {
            console.log(this.state.haveRemoved);
            if(this.state.haveRemoved === false) {

                var object = Object.entries(snapshot.val());
                console.log(object);
                object.map((project, i) => {
                    if (project[1].ownerId === this.props.firebase.auth.currentUser.uid) {

                        this.getDays(project[0],project[1])
                    }

                    if(project[1].usersSuggested !== ''){
                        var users = Object.entries(project[1].usersSuggested);

                        console.log(users.find(e => e[0] === this.props.firebase.auth.currentUser.uid));
                        if(users.find(e => e[0] === this.props.firebase.auth.currentUser.uid) !== undefined) {
                            this.getDays(project[0],project[1])
                        }
                    }
                })
            }
            else{

            }
        });


        this.props.firebase.projects().once("value", snapshot => {
            console.log(this.state.haveRemoved);
            if(this.state.haveRemoved === false) {

                var object = Object.entries(snapshot.val());
                object.map((project, i) => {
                    if (project[1].ownerId === this.props.firebase.auth.currentUser.uid) {

                            projects.push({id:project[0], title: project[1].title, noticeOwner: project[1].noticeOwner, type:project[1].type, category:project[1].category, description: project[1].description, partners: project[1].partners +" ("+ Object.entries(project[1].usersSuggested).length + ")", status: project[1].status ,
                            project: project[1]});
                    }
                    if(project[1].usersSuggested !== ''){
                       var users = Object.entries(project[1].usersSuggested);
                       if(users.find(e => e[0] === this.props.firebase.auth.currentUser.uid) !== undefined) {
                           console.log("tiene este proyecto");
                           projectsSuggested.push({id:project[0],noticeSuggested:users.find(e => e[0] === this.props.firebase.auth.currentUser.uid)[1].noticeSuggested, title: project[1].title,type:project[1].type, category:project[1].category, description: project[1].description, partners: project[1].partners +" ("+ Object.entries(project[1].usersSuggested).length + ")", status: project[1].status ,
                               project: project[1], state:users.find(e => e[0] === this.props.firebase.auth.currentUser.uid)[1].state})
                       }
                    }
                    this.setState({projects: projects, projectsSuggested: projectsSuggested});
                    if (projects.length !== 0){
                        document.getElementById("projectsCreated").style.display =""
                        document.getElementById("noProjects").style.display="none"
                    }
                    if (projectsSuggested.length !== 0){
                        document.getElementById("projectsInvited").style.display =""
                        document.getElementById("noProjects").style.display="none"
                    }
                    if (projects.length === 0 && projectsSuggested.length === 0){
                        console.log("HOLA")
                        document.getElementById("noProjects").style.display=""
                    }

                })
            }
            else{
                console.log("ya esta dentro");
            }
        })
    }


    projectOnClick(idProject,row){

        var user = ""
        this.props.firebase.user(this.props.firebase.auth.currentUser.uid).once("value", snapshot =>{
            user = snapshot.val().username;
            this.setState({
                userName: snapshot.val().username
            })
        })

        this.props.history.push({pathname: ROUTES.PROJECT, state:{row,idProject,user}});
    }

    projectSuggestedOnClick(row, id){
        this.props.firebase.userSuggested(id, this.props.firebase.auth.currentUser.uid).update({
            noticeSuggested: false
        })
        this.props.history.push({pathname: ROUTES.PROJECTSUGGESTED, state:{row,id}});
    }


    searchPartner(id, project) {
        console.log(id)
        console.log(project)
        this.props.history.push({pathname: ROUTES.SEARCHPARTNER, state:{id, project}});
    }



    handleOpenModal(id, row) {

        var urls = [];


        console.log( Object.entries(row.usersSuggested))
        Object.entries(row.usersSuggested).map( user => {
            if (user[1].doc !== undefined){
                if (user[1].doc.info !== undefined) {
                    urls.push(user[1].doc.info.url)
                }
                if (user[1].doc.solution !== undefined) {
                    urls.push(user[1].doc.solution.url)
                }
            }
        })

        this.setState({
            showModal: true,
            projectSelected: id,
            urls: urls
        });




    }

    handleCloseModal() {
        this.setState({
            showModal: false,

        });

    }


    render(){

        const mappleConfig = {
            mappleType: 'light',
            borderRadius: 10}

        console.log(this.state)

        const columns = [{
            dataField: 'df4',
            text: '',
            formatter: (cellContent, row, rowIndex) => {

                if(row.noticeOwner !== undefined){
                    if((row.noticeOwner === true))
                    {
                        return (<MDBBadge pill  style={{fontSize:"1.2em", backgroundColor:"orange"}}>
                                <i class="fas fa-exclamation" ></i>
                            </MDBBadge>

                        )
                    }
                }

            },
            style: (cell, row, rowIndex, colIndex) => {
                return {

                    width: "15px"
                }
            }
        },{
            dataField: 'title',
            text: 'Project Title',
            filter: textFilter()
        },{
            dataField: 'type',
            text: 'Type',
            sort: true,
            filter: textFilter()

        },{
            dataField: 'category',
            text: 'Category',
            sort: true,
            filter: textFilter()
        },{
            dataField: 'partners',
            text: 'Partners',
            sort: true,
            filter: textFilter()
        },{
            dataField: 'status',
            text: 'Status',
            sort: true,
            filter: textFilter()
        }, {
            dataField: 'df1',
            text:(
                <div>
                    <div>
                        <label style={{marginLeft:"20px"}}>Actions</label>
                    </div>
                    <div>
                        <label style={{marginLeft:"20px"}}>
                        <Floater content="Search partners" event="hover" placement="top" eventDelay={0.05} styles={{
                            tooltip: {

                                filter: "none"
                            },
                            container: {
                                borderRadius: 5,
                                color: "grey",
                                filter: "none",
                                maxHeight:"20px",
                                minWidth:"5px"

                            },
                            arrow:{
                                length: 4,
                                spread: 8
                            }
                        }}>
                            <i className="fas fa-users" id="searchPartner"
                               style={{marginRight: "15px", fontSize:"x-large"}} />
                        </Floater>
                        <Floater content="View the project" event="hover" placement="top" eventDelay={0.05} styles={{
                            tooltip: {

                                filter: "none"
                            },
                            container: {
                                borderRadius: 5,
                                color: "grey",
                                filter: "none",
                                maxHeight:"20px",
                                minWidth:"5px"

                            },
                            arrow:{
                                length: 4,
                                spread: 8
                            }
                        }}>
                            <i className="fas fa-info-circle"
                               style={{marginRight: "15px", fontSize:"x-large"}} />
                        </Floater>
                        <Floater content="Delete the project" event="hover" placement="top" eventDelay={0.05} styles={{
                            tooltip: {

                                filter: "none"
                            },
                            container: {
                                borderRadius: 5,
                                color: "grey",
                                filter: "none",
                                maxHeight:"20px",
                                minWidth:"5px"

                            },
                            arrow:{
                                length: 4,
                                spread: 8
                            }
                        }}>
                            <i className="far fa-trash-alt" style={{fontSize:"x-large"}} />
                        </Floater>


                    </label>
                    </div>
                </div>

                ),
            formatter: (cellContent, row, rowIndex) => {

            if((row.status !== "Finished"))
                {
                    return (
                        <div className="checkbox">
                            <label>

                                <i className="fas fa-users" id="searchPartner" onClick={() => this.searchPartner(row.id, row.project)}
                                   style={{marginRight: "15px", fontSize:"x-large"}} />
                                    <i className="fas fa-info-circle" onClick={() => this.projectOnClick(row.id, row.project)}
                                   style={{marginRight: "15px", fontSize:"x-large"}} />


                                    <i className="far fa-trash-alt" style={{fontSize:"x-large"}} onClick={() => this.handleOpenModal(row.id,row.project)} />


                            </label>
                        </div>
                    )
                }
                if((row.status === "Finished"))
                {
                    return (
                        <div className="checkbox">
                            <label>
                                <i className="fas fa-info-circle" onClick={() => this.projectOnClick(row.id, row.project)}
                                   style={{marginRight: "15px", fontSize:"x-large"}} />
                                <i className="far fa-trash-alt" style={{fontSize:"x-large"}} onClick={() => this.handleOpenModal(row.id,row.project)} />
                            </label>
                        </div>
                    )
                }
        },
            style: (cell, row, rowIndex, colIndex) => {
                return {

                    width: "180px"
                }
            }
        }


        ];
        const columns2 = [{
            dataField: 'df4',
            text: '',
            formatter: (cellContent, row, rowIndex) => {

                if(row.noticeSuggested !== undefined){
                    if((row.noticeSuggested === true))
                    {
                        return (<MDBBadge pill  style={{fontSize:"1.2em", backgroundColor:"orange"}}>
                                <i class="fas fa-exclamation" ></i>
                            </MDBBadge>

                        )
                    }
                }
            },
            style: (cell, row, rowIndex, colIndex) => {
                return {

                    width: "15px"
                }
            }
        },{
            dataField: 'title',
            text: 'Project Title',
            filter: textFilter()
        },{
            dataField: 'description',
            text: 'Description',
            filter: textFilter()
        },{
            dataField: 'type',
            text: 'Type',
            sort: true,
            filter: textFilter()

        },{
            dataField: 'category',
            text: 'Category',
            sort: true,
            filter: textFilter()
        },{
            dataField: 'status',
            text:"Status",
            sort: true,
            filter: textFilter()

        },{
            dataField: 'df5',
            text:"State",
            sort: true,
            filter: textFilter(),
            formatter: (cellContent, row, rowIndex) => {

                if(row.state !== undefined){
                    if((row.state === "Info sent to the partner"))
                    {
                        return (<label>Info received</label>

                        )
                    }
                    if((row.state === "Solution received"))
                    {
                        return (<label>Solution sent</label>

                        )
                    }
                    if((row.state === "Partner evaluated"))
                    {
                        return (<label>Evaluated</label>

                        )
                    }
                    else{
                        return (
                            <label>{row.state}</label>
                        )
                    }
                }
            },
            style: (cell, row, rowIndex, colIndex) => {
                return {

                    width: "15px"
                }
            }

        }
        ,
            {
            dataField: 'df1',
            text: (<div>
                <div>
                    <label style={{marginLeft:"20px"}}>Actions</label>
                </div>
                <div>
                    <label style={{marginLeft:"20px"}}>

                        <Floater content="View the project" event="hover" placement="top" eventDelay={0.05} styles={{
                            tooltip: {

                                filter: "none"
                            },
                            container: {
                                borderRadius: 5,
                                color: "grey",
                                filter: "none",
                                maxHeight:"20px",
                                minWidth:"5px"

                            },
                            arrow:{
                                length: 4,
                                spread: 8
                            }
                        }}>
                            <i className="fas fa-info-circle"
                               style={{marginRight: "15px", fontSize:"x-large"}} />
                        </Floater>

                    </label>
                </div>
            </div>),
            formatter: (cellContent, row) => (
                <div className="checkbox">
                    <label>
                        <i className="fas fa-info-circle" onClick={() =>this.projectSuggestedOnClick(row.project,row.id)}
                           style={{marginRight: "15px", fontSize:"x-large"}} />



                    </label>
                </div>
            ),
            style: (cell, row, rowIndex, colIndex) => {
                return {

                    width: "100px"
                }
            }
        }


        ];


        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">

            </span>
        );
        const options = {
            paginationSize: 3,
            pageStartIndex: 0,
            // alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false, // Hide the going to First and Last page button
            hideSizePerPage: true, // Hide the sizePerPage dropdown always
            // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            sizePerPageList: [{
                text: '4', value: 4
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: 10000000
            }]  // A numeric array is also available. the purpose of above example is custom the text
        };


        const rowStyle = { height:"20px" };



        return(

        <div>
            <div class="row" style={{marginLeft: "340px"}}>
                <div className="col-lg-12 col-md-12 col-sm-12">

                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="Minimal Modal Example"
                        className="sendInfoView"
                        style={{

                            overlay: {

                                marginLeft: "275px",
                                zIndex: 1
                            },
                            content: {
                                zIndex: 1,
                                marginTop: "100px",
                                backgroundColor: 'white',
                                marginLeft: "230px",
                                width: "60%",
                                height: "300px",
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                color: "#333",
                                fontSize: " small"
                            }
                        }}
                    >
                        <button style={{margin: "10px"}} onClick={() => this.handleCloseModal()}>Close</button>
                        <div align="center" style={{marginTop: "20px"}}>
                            <p style={{fontSize: "x-large", fontWeight: "bolder"}}>Delete project:</p>
                        </div>
                        <div align="center" style={{marginTop: "20px", width:"80%", marginLeft :" 60px"}}>

                            <label>Are you sure to delete this project?</label>

                                <MDBBtn color="danger" style={{width:"400px", marginTop:"15px"}}
                                        onClick={() => this.handleRowDel(this.state.projectSelected)}>Yes</MDBBtn>
                            <MDBBtn color="primary" style={{width:"400px", marginTop:"15px"}}
                                    onClick={() => this.handleCloseModal()}>No</MDBBtn>





                        </div>
                    </ReactModal>

                    <div className="projectScroll" id="projectsCreated" style={{display:"none"}}>
                        <div className="project_scroll" id="project_scroll">
                            <div className="row header" id="rowheader">
                                <div className="col-sm-12">
                                    <h3 className="text-center"><b><em>Current Projects Created List({this.state.projects.length})</em></b></h3>
                                </div>
                            </div>

                            <BootstrapTable
                                onDataSizeChange={ this.handleDataChange }
                                keyField="id"
                                data={ this.state.projects }
                                columns={ columns }
                                filter={ filterFactory() }
                                pagination={ paginationFactory(options) }
                                rowStyle={rowStyle}
                                bordered = {false}
                                striped = {true}


                            />


                        </div>
                    </div>
                </div>
            </div>


            <div class="row" style={{marginLeft: "340px"}}>
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div style={{paddingTop:"30px", display:"none"}} className="projectScroll" id="projectsInvited">
                        <div className="project_scroll" id="project_scroll">
                            <div className="row header" id="rowheader">
                                <div className="col-sm-12">
                                    <h3 className="text-center"><b><em>Current Projects Invited List({this.state.projectsSuggested.length})</em></b></h3>
                                </div>
                            </div>

                            <BootstrapTable
                                onDataSizeChange={ this.handleDataChange }
                                keyField="id"
                                data={ this.state.projectsSuggested }
                                columns={ columns2 }
                                filter={ filterFactory() }
                                pagination={ paginationFactory(options) }
                                rowStyle={rowStyle}
                                bordered = {false}
                                striped = {true}

                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style={{marginLeft: "340px"}}>
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div style={{paddingTop:"30px", display:""}} className="projectScroll" id="noProjects">
                        <div className="project_scroll" id="project_scroll">
                            <div className="row header" id="rowheader">
                                <div className="col-sm-12">
                                    <h3 className="text-center"><b><em>No projects created or invited</em></b></h3>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
};

const Projects = compose(
    withRouter,
    withFirebase,
)(ProjectsBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProjectsPage);
