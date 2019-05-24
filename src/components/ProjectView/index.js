import React from 'react';

import { withAuthorization } from '../Session';
import Sidebar from '../Sidebar';
import NavBar from "../generalNavbar";
import {withFirebase} from "../Firebase";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import project from '../../img/project.png';
import {ProgressBar} from 'react-bootstrap';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import pdf from "../../pdf/PDF - General Info.pdf";

import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn ,  MDBBadge} from 'mdbreact';


import ReactModal from 'react-modal';
import * as ROUTES from "../../constants/routes";

import FileUpload from "../FileInfoUpload/FileUpload";

import ScatterChart from '../ScatterChart';
import Floater from 'react-floater';


import {differenceInDays} from 'date-fns'

import $ from 'jquery';






const ProjectPage = () => (
    <div id="fd">
        <NavBar title={"Project"}/>
        <Sidebar/>
        <Project/>

    </div>
);



class ProjectBase extends React.Component {

    componentWillMount(){
        this.setState({
            project: this.props.location.state.row,
            idProject: this.props.location.state.idProject,
            usersSuggested: Object.entries(this.props.location.state.row.usersSuggested),
            username: this.props.location.state.user
        })

    }

    componentDidMount() {
        this.props.firebase.project(this.state.idProject).update({
            noticeOwner: false
        })


        this.state.usersSuggested.map((r, i) => {
            if (r[1].state === "Accepted") {
                document.getElementById(r[0]).style.display = "";
            }
            if (r[1].state === "Solution received") {
                document.getElementById("id" + r[0]).style.display = "";
            }
        })




    }

    constructor(props) {
        super(props);
        this.state = {
            project: [],
            idProject: "",
            usersSuggested: [],
            showModal: false,
            partnerSelected: "",
            partnerEmail: "",
            url:"",
            progress:""

        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    };

    handleOpenModal(partner, partnerAll) {
        this.setState({
            showModal: true,
            partnerSelected: partner,
            partnerInfoSelected: partnerAll
        });

    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            partnerSelected: "",
            partnerInfoSelected: "",
        });

    }




    tryout(idProject, project,idPartner){

        var storage = this.props.firebase.urlDownload(project.doc.solution.url);

        storage.getDownloadURL().then((url) => {
                // `url` is the download URL for 'images/stars.jpg'

                this.setState({
                    downloadURL:url
                })
            if (project.doc !== undefined) {


                var urlState = document.getElementById("buttonX").getAttribute('href');

                var projectAll = this.state.project;
                var url = this.state.downloadURL;


                this.props.history.push({pathname: ROUTES.EVALUATIONPROJECT, state: {project, idProject, urlState, projectAll, idPartner, url }});
            }
            }

        ).catch(function(error) {
            console.log(error);
        })



    }



    render() {



        return (

            <div>
                <div class="row" style={{marginLeft: "340px"}}>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="projectView" style={{height:"450px"}}>
                        <ReactModal
                            isOpen={this.state.showModal}
                            contentLabel="Minimal Modal Example"
                            className="sendInfoView"
                            style={{

                                overlay: {

                                    marginLeft: "275px"
                                },
                                content: {
                                    marginTop: "200px",
                                    backgroundColor: 'white',
                                    marginLeft: "30px",
                                    width: "90%",
                                    height: "400px",
                                    border: "1px solid #ddd",
                                    borderRadius: "10px",
                                    color: "#333",
                                    fontSize: " small"
                                }
                            }}
                        >
                            <button style={{margin: "10px"}} onClick={() => this.handleCloseModal()}>Close Modal</button>
                            <div align="center" style={{marginTop: "40px"}}>
                                <p style={{fontSize: "x-large", fontWeight: "bolder"}}>Send Info:</p>
                                <p>Send to the partners a document with the most important points that you will evaluate
                                    from their posible solution</p>
                                <p>You can download an example that shows an example of this document. Also you can send
                                    this to your partner. </p>
                            </div>
                            <div align="center" style={{marginTop: "20px"}}>
                                <MDBBtn color="info" id="button1" href={pdf} style={{width: "200px", fontSize: "small"}}
                                        target="_blank" rel="noopener noreferrer">PDF Example</MDBBtn>
                                <br/>
                                <FileUpload idProject={this.state.idProject} idPartner={this.state.partnerSelected}
                                            partnerInfo={this.state.partnerInfoSelected}
                                            usersSuggested={this.state.usersSuggested}/>
                            </div>
                        </ReactModal>
                        <div class="col-lg-12 col-md-12 col-sm-12 row">
                            <div className="col-lg-4 col-md-4 col-sm-4" align="center">
                                <img src={project} style={{width: "120px", height: "120px"}}></img>
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-8">
                                <p><label style={{
                                    fontWeight: "bold",
                                    marginRight: "5px"
                                }}>Title: </label>{this.state.project.title}</p>
                                <p><label style={{
                                    fontWeight: "bold",
                                    marginRight: "5px"
                                }}>Description: </label>{this.state.project.description}</p>
                            </div>
                        </div>
                        <div class="row" align="center" style={{width: "80%", marginLeft: "90px"}}>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <p><label style={{fontWeight: "bold", marginRight: "5px"}}>Start
                                    Date: </label>{this.state.project.startDate}</p>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <p><label style={{fontWeight: "bold", marginRight: "5px"}}>End
                                    Date: </label>{this.state.project.endDate}</p>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12" style={{width: "80%", marginLeft:"58px"}}>
                            <p><label style={{fontWeight: "bold", marginRight: "5px"}}>What info have to be in the
                                solution? </label></p>
                            <p>{this.state.project.solution}</p>

                        </div>
                        <MDBBtn tag="a" color="info" id="buttonX" href={this.state.url}
                                style={{width: "200px", fontSize: "small", display:"none"}} target="_blank"
                                rel="noopener noreferrer">PDF Example</MDBBtn>


                        <div class="row" style={{width: "80%", marginLeft: "70px", marginTop: "120px"}}>
                            <label style={{
                                fontWeight: "bold",
                                marginRight: "5px"
                            }}>Time progress: </label>
                            <Progress
                                percent={this.state.project.progress} style={{marginTop:"15px"}}
                            />
                        </div>

                    </div>
                    </div>
                </div>
                <div class="row" style={{marginLeft: "340px"}}>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="partnersSuggested">
                            <div class="partnersHeader" align="center">
                                <label style={{fontWeight: "bold"}}>Partners Suggested
                                    ({Object.entries(this.state.usersSuggested).length})</label>
                                <MDBTable align="center" striped style={{width: "100%"}} scrollY maxHeight="280px">
                                    <MDBTableHead>
                                        <tr>

                                            <th>Name</th>
                                            <th>Status</th>
                                            <th></th>

                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>

                                        {this.state.usersSuggested.map((r, i) => (

                                            <tr key={i}>
                                                <td style={{paddingTop: "13px"}}>{r[1].partnerSelected.username}</td>
                                                <td style={{paddingTop: "13px"}}
                                                    id={r[1].partnerSelected.email}>{r[1].state}</td>
                                                <td><MDBBtn color="success" id={r[0]} name={r[0]}
                                                            onClick={() => this.handleOpenModal(r[0], r[1], r[1].partnerSelected)}
                                                            style={{color: "white", display: "none"}}>Send Info</MDBBtn>
                                                    <MDBBtn color="primary"
                                                            id={"id" + r[0]}
                                                            onClick={() => this.tryout(this.state.idProject, r[1], r[0])}
                                                            style={{ display:"none"}}>Evaluate</MDBBtn>
                                                    <div>
                                                    { (r[1].risks !== undefined) && (r[1].risks !== "") ?

                                                        <Floater content={<label><label style={{fontWeight:"bold"}}>Risks:</label> {r[1].risks}</label>} event="click" placement="top" eventDelay={0.05}  showCloseButton="true" styles={{
                                                            tooltip: {
                                                                filter: "none"
                                                            },
                                                            container: {
                                                                borderRadius: 5,
                                                                color: "#EFEFEF",
                                                                filter: "none",
                                                                backgroundColor:"#1d1d1d"
                                                            },
                                                            arrow:{
                                                                spread:20,
                                                                length:8,
                                                                backgroundColor:"#1d1d1d",
                                                                color:"#1d1d1d"

                                                            }
                                                        }}>
                                                            <i class="fas fa-exclamation-triangle" style={{fontSize:"large", marginTop:"3px", color:"orange"}}></i>

                                                        </Floater>

                                                        : null}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="partnersSuggested" id="chart">
                            <div class="partnersHeader" align="center">
                                <ScatterChart users={this.state.usersSuggested} username={this.state.username}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )

    };
}

const Project = compose(
    withRouter,
    withFirebase,
)(ProjectBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProjectPage);

/*
*

*
*
*
* */
