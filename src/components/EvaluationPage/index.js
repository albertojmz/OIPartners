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

import PDFViewer from '../PDFReader/PDFViewer.js';

import {  FormGroup, Label, Input} from 'reactstrap';
import { MDBBtn} from 'mdbreact';

import ReactModal from 'react-modal';
import * as ROUTES from "../../constants/routes";

import Floater from 'react-floater';





const EvaluationPage = () => (
    <div id="fd">
        <NavBar title={"Evaluate the solution"}/>
        <Sidebar/>
        <Evaluation/>

    </div>
);



class EvaluationBase extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            project : "",
            idProject:"",
            solutionURL:"",
            closeness:[],
            technical:[],
            showModal: false,
            risks:""

        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    };

    handleOpenModal() {
        this.setState({
            showModal: true,

        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
        });

        var row = this.state.projectAll;
        var idProject = this.state.idProject;


        this.props.history.push({pathname: ROUTES.PROJECTS});


    }


    componentWillMount(){

        this.setState({
            project:this.props.location.state.project,
            idProject:this.props.location.state.idProject,
            solutionURL: this.props.location.state.urlState,
            projectAll: this.props.location.state.projectAll,
            idPartner: this.props.location.state.idPartner,
            usersSuggested: this.props.location.state.usersSuggested,
            url: this.props.location.state.url
        })

        if (this.props.location.state.project.doc !== undefined){
            var storage = this.props.firebase.urlDownload(this.props.location.state.project.doc.solution.url);
            var url = storage.getDownloadURL().then(function(url) {
                    // `url` is the download URL for 'images/stars.jpg'
                console.log(url);
                    return url;

                }
            ).catch(function(error) {
                console.log(error);
            });
            console.log(url);
        }
    }
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    componentDidMount(){
        var closeness = [];
        var technical = [];

        this.state.projectAll.factors.map( (item,i) => {

                if(item.group === "Closeness"){
                    closeness.push(item)
                }
                if (item.group ==="Technical"){
                    technical.push(item)
                }
                else{
                    console.log("Cant add")
                }

            }
        )

        this.setState({
            closeness:closeness,
            technical:technical
        })

    }

    saveEvaluation(){

        var distance = Math.sqrt(Math.pow(this.state.totalCloseness,2)+Math.pow(this.state.totalTechnical,2));
        var factors = {totalCloseness : this.state.totalCloseness, totalTechnical: this.state.totalTechnical, distance: distance};

        this.props.firebase
            .userSuggested(this.state.idProject, this.state.idPartner).update({factors: factors, state:"Partner evaluated", noticeSuggested:true, risks:this.state.risks});

        this.handleOpenModal();


    }

    totalCloseness(rowTitle,i){

        var row = {group:this.state.closeness[i].group, title: rowTitle, description:this.state.closeness[i].description,weight:this.state.closeness[i].weight, value: document.getElementById(rowTitle).value};
        this.state.closeness.splice(i, 1,row);

        this.setState({closeness: this.state.closeness, haveRemoved : true});

        const allRows = this.state.closeness;

        const weightTotal = allRows.reduce((totalWeights, row) => parseFloat(totalWeights) + (parseFloat(row.value)*(parseFloat(row.weight)/100)), 0);

        this.setState({totalCloseness : weightTotal});

        console.log(weightTotal);



    }

    totalTechnical(rowTitle,i){

        var row = {group:this.state.technical[i].group, title: rowTitle, description:this.state.technical[i].description,weight:this.state.technical[i].weight, value: document.getElementById(rowTitle).value};
        this.state.technical.splice(i, 1,row);

        this.setState({technical: this.state.technical, haveRemoved : true});

        const allRows = this.state.technical;

        const weightTotal = allRows.reduce((totalWeights, row) => parseFloat(totalWeights) + (parseFloat(row.value)*(parseFloat(row.weight)/100)), 0);

        this.setState({totalTechnical : weightTotal});

        console.log(weightTotal);
    }



    render(){

        console.log(this.state)

        const risks = this.state.risks;

        return(

            <div style={{marginLeft: "280px"}} className="row">

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
                        <p style={{fontSize: "x-large", fontWeight: "bolder"}}>Evaluation done!</p>
                        <p>You have evaluated the proposal of this partner, you can see more info about your perfect partner in the project view.</p>
                    </div>

                </ReactModal>

                <div className="col-lg-8 col-md-8 col-sm-8" style={{borderLeft:"1px solid #fff", marginTop:"0px"}}>
                    <div className="evaluationView">
                        <PDFViewer id="pdf" url={this.state.url}/>
                    </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-4" style={{paddingRight:"25px"}}>

                    <div className="evaluationView" style={{height:"auto"}}>

                        <div align="center" >

                            <div style={{width:"80%"}}>
                                <p><label style={{fontWeight:"bold"}}>Closeness to the Entity</label></p>

                                {this.state.closeness.map((row,i) => (

                                    <FormGroup key={i}>
                                        <Label for={row.title}>{row.title}<Floater event="hover" content={row.description}>
                                            <i class="fas fa-info-circle" style={{marginLeft:"10px"}}></i>
                                        </Floater></Label>
                                        <Input
                                            type="select"
                                            name="selectMulti"
                                            id={row.title}
                                            onChange={() => {this.totalCloseness(row.title,i)}}
                                        >
                                            <option value="">--Choose one number--</option>
                                            <option value="1">1 - Perfect </option>
                                            <option value="2">2 - Very good</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">4 - Regular</option>
                                            <option value="5">5 - Bad</option>
                                        </Input>
                                    </FormGroup>


                                ))}
                            </div>
                        </div>
                        <div align="center" >
                            <div style={{width:"80%"}}>
                                <p><label style={{fontWeight:"bold"}}>Technical Adequacy</label></p>


                                {this.state.technical.map((row,i) => (
                                    <FormGroup key={i}>
                                        <Label for={row.title}>{row.title}<Floater event="hover" content={row.description}>
                                            <i class="fas fa-info-circle" style={{marginLeft:"10px"}}></i>
                                        </Floater></Label>                                        <Input
                                            type="select"
                                            name="selectMulti"
                                            id={row.title}
                                            onChange={() => {this.totalTechnical(row.title,i)}}
                                        >
                                        <option value="">--Choose one number--</option>
                                        <option value="1">1 - Perfect </option>
                                        <option value="2">2 - Very good</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Regular</option>
                                        <option value="5">5 - Bad</option>
                                        </Input>
                                    </FormGroup>


                                ))}
                            </div>
                            <div style={{width:"80%"}}>
                                <p><label style={{fontWeight:"bold"}}>Possible Risks (optional)</label></p>
                                <textarea name="risks" value={risks} onChange={this.onChange} class="form-control" id="exampleFormControlTextarea3" rows="4" style={{fontSize:"small !important"}} ></textarea>


                            </div>
                            <MDBBtn color="success" id="buttonAccept" onClick={() =>this.saveEvaluation()} style={{marginRight:"5px",width:"110px", marginTop:"20px"}}>Evaluate!</MDBBtn>
                            <p><MDBBtn color="info" id="button1" href={this.state.url} style={{marginRight:"5px",width:"110px", fontSize:"small", marginTop:"10px"}}
                                       target="_blank" rel="noopener noreferrer">Download PDF</MDBBtn></p>

                        </div>



                    </div>
                </div>
            </div>
        )
    }
};

const Evaluation = compose(
    withRouter,
    withFirebase,
)(EvaluationBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(EvaluationPage);
