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

import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn} from 'mdbreact';
import * as ROUTES from "../../constants/routes";

import FileSolutionUpload from '../FileSolutionUpload/FileUpload';

import firebase from 'firebase';






const ProjectSuggestedPage = () => (
    <div id="fd">
        <NavBar title={"Project"}/>
        <Sidebar/>
        <ProjectSuggested/>

    </div>
);



class ProjectSuggestedBase extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            project: this.props.location.state.row,
            id: this.props.location.state.id,
            downloadInfoURL:"",
            urlInfoFull:"",
            partnerInfo:"",
            state:""
        }
        this.downloadDocument = this.downloadDocument.bind(this);


    };


    acceptProject(id){
        this.props.firebase.userSuggested(id, this.props.firebase.auth.currentUser.uid).update({ state: "Accepted" });
        document.getElementById("buttonDeny").style.display ="";
        document.getElementById("buttonAccept").style.display ="none";
        this.setState({state:"Accepted"});
        this.props.firebase.project(this.state.id).update({
            noticeOwner: true
        })

    }

    denyProject(id){
        this.props.firebase.userSuggested(id, this.props.firebase.auth.currentUser.uid).update({ state: "Denied"});
        document.getElementById("buttonAccept").style.display ="";
        document.getElementById("buttonDeny").style.display ="none";
        this.setState({state:"Denied"});
        this.props.firebase.project(this.state.id).update({
            noticeOwner: true
        })
    }

    componentDidMount(){

        console.log("HOLAAAAAAAAAAAAA")
        this.props.firebase.userSuggested(this.state.id, this.props.firebase.auth.currentUser.uid).on("value", snapshot => {

            console.log("ASDASDASDA")


            if (snapshot.val() !== null) {


                if (snapshot.val().state === "Contacted") {

                    document.getElementById("projectSolution").style.display = "";
                    document.getElementById("buttonAccept").style.display = "";
                    document.getElementById("buttonDeny").style.display = "";
                    this.setState({state: snapshot.val().state});

                }

                if (snapshot.val().state === "Accepted") {
                    document.getElementById("projectSolution").style.display = "";
                    document.getElementById("buttonDeny").style.display = "";
                    this.setState({state: snapshot.val().state});
                }
                if (snapshot.val().state === "Denied") {
                    document.getElementById("projectSolution").style.display = "";
                    document.getElementById("buttonAccept").style.display = "";
                    this.setState({state: snapshot.val().state});
                }
                console.log(snapshot.val().state);
                if ((document.getElementById("projectEvaluated") !== null) && (snapshot.val().state === "Partner evaluated")) {
                    document.getElementById("projectEvaluated").style.display = "";
                    this.setState({state: "You have been evaluated!"});
                    return;
                }
                if (snapshot.val().doc !== undefined) {
                    if (snapshot.val().doc.info !== undefined) {
                        if (document.getElementById("projectSolution") !== null) {


                            document.getElementById("projectSolution").style.display = "none";
                            document.getElementById("projectInfo").style.display = "";
                            if (snapshot.val().doc.info !== undefined) {
                                console.log(snapshot.val().doc.info.filename);
                                console.log(snapshot.val().doc.info.url);
                                this.setState({
                                    state: "Send your solution to the entity",
                                    downloadInfoURL: snapshot.val().doc.info.url
                                });
                                document.getElementById("downloadInfo").style.display = "";
                                document.getElementById("filename").innerText = snapshot.val().doc.info.filename;

                                console.log(snapshot.val().doc.info.url);
                                var storage = this.props.firebase.urlDownload(snapshot.val().doc.info.url);
                                console.log(storage.getDownloadURL());


                                storage.getDownloadURL().then((url) => {
                                        this.setState({
                                            downloadURL: url,
                                        })

                                    }
                                ).catch(function (error) {
                                    console.log(error);
                                });

                            }
                        }
                    }
                    if (snapshot.val().doc.solution !== undefined) {
                        if (document.getElementById("projectEvaluation") !== null) {

                            document.getElementById("projectEvaluation").style.display = "";
                            this.setState({
                                state: "Solution sent to the entity",

                            });

                        }
                    }
                }
                else {
                    this.setState({state: snapshot.val().state});
                }
            }
            })

    }

    downloadDocument(urlDocument) {

        console.log(urlDocument);
        var storage = this.props.firebase.urlDownload(urlDocument);
        console.log(storage.getDownloadURL());


        storage.getDownloadURL().then( (url) =>  {

            this.setState({
                downloadURL: url
            })

            document.getElementById("buttonInfo").click();


            }

        ).catch(function(error) {
            console.log(error);
        });



    }




    render(){
        console.log(this.state);
        console.log(this.state.project);
        console.log(this.state.id);
        console.log(this.props.firebase.auth.currentUser.uid);

        return(

            <div>
                <div class="row" style={{marginLeft: "340px"}}>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="projectView" style={{height:"300px"}}>
                            <div class="row">
                                <div className="col-lg-4 col-md-4 col-sm-4" align="center">
                                    <img src={project} style={{width:"120px", height:"120px"}}></img>
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-8">
                                    <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Title: </label>{this.state.project.title}</p>
                                    <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Description: </label>{this.state.project.description}</p>
                                </div>
                            </div>
                            <div class="row" align="center" style={{width:"80%"}}>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Start Date: </label>{this.state.project.startDate}</p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <p><label style={{fontWeight: "bold", marginRight:"5px"}}>End Date: </label>{this.state.project.endDate}</p>
                                </div>
                            </div>
                            <div class="row" style={{width:"80%", marginLeft:"70px", marginTop:"10px"}}>
                                <Progress
                                    percent={this.state.project.progress}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div class="row" style={{marginLeft: "340px"}}>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="projectSolution" id="projectSolution" style={{display:"none",height:"300px"}}>
                            <div className="col-lg-12 col-md-12 col-sm-12" style={{width:"90%", marginLeft:"30px"}}>
                                <p><label align="right" style={{fontWeight:"bold"}}>State:</label><label style={{marginLeft:"5px"}} id="stateNormal" >{this.state.state}</label></p>
                                <p><label style={{fontWeight: "bold", marginRight:"5px"}}>What info have to be in the solution? </label>
                                </p>
                                <p>{this.state.project.solution}</p>
                            </div>

                            <div align="center" style={{marginTop:"220px"}}>
                                <MDBBtn color="success" id="buttonAccept" onClick={() =>this.acceptProject(this.state.id)} style={{marginRight:"5px",width:"200px", display:"none"}}>Accept</MDBBtn>
                                <MDBBtn color="danger" id="buttonDeny" onClick={() =>this.denyProject(this.state.id)} style={{width:"200px", display:"none"}}>Deny</MDBBtn>
                            </div>
                        </div>
                        <div className="projectSolution" id="projectInfo" style={{display:"none",height:"300px"}}>

                            <div align ="center" style={{display:"none", marginTop:"0px"}} id="downloadInfo">
                                <p><label align="right" style={{fontWeight:"bold"}}>State:</label><label style={{marginLeft:"5px"}} id="stateNormal" >{this.state.state}</label></p>
                                <p style={{width:"93%"}}><label style={{fontWeight:"bold"}}>You have received a document with the aspects that the owner of the challenge thinks are the most important to evaluate your proposal</label></p>
                                <p><label style={{fontWeight:"bold"}}>File:  </label><label style={{marginLeft:"5px"}} id="filename" ></label></p>
                                <MDBBtn tag="a" color="info" id="buttonDownloadInfo" href={this.state.downloadURL} style={{fontSize:"inherit",width:"200px", color:"white"}} target="_blank" rel="noopener noreferrer">
                                    Download Info
                                    <i style={{marginLeft:"10px"}}class="fas fa-download"></i>
                                </MDBBtn>
                                <br/>
                                <FileSolutionUpload idProject={this.state.id} idPartner={this.props.firebase.auth.currentUser.uid} partnerInfo={this.state.state} infoURL={this.state.downloadInfoURL} />
                            </div>
                        </div>

                        <div className="projectSolution" id="projectEvaluation" style={{display:"none",height:"200px"}}>
                            <div className="col-lg-12 col-md-12 col-sm-12" style={{width:"90%", marginLeft:"30px"}}>
                                <p><label align="right" style={{fontWeight:"bold"}}>State:</label><label style={{marginLeft:"5px"}} id="stateNormal" >{this.state.state}</label></p>
                                <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Your solution have been sent successfully, now you have to wait for the evaluation of the solution </label>
                                </p>
                            </div>
                        </div>
                        <div className="projectSolution" id="projectEvaluated" style={{display:"none",height:"200px"}}>
                            <div className="col-lg-12 col-md-12 col-sm-12" style={{width:"90%", marginLeft:"30px"}}>
                                <p><label align="right" style={{fontWeight:"bold"}}>State:</label><label style={{marginLeft:"5px"}} id="stateNormal" >{this.state.state}</label></p>
                                <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Your solution have been evaluated correctly, now you have to wait to project owner to contact with you! </label>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
                )
    }
};

const ProjectSuggested = compose(
    withRouter,
    withFirebase,
)(ProjectSuggestedBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProjectSuggestedPage);
