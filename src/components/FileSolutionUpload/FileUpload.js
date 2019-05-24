import React, {Component} from 'react';
import firebase from 'firebase';

import logo from '../../img/logo.png';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn} from 'mdbreact';

class FileUpload extends Component {

    constructor() {
        super();
        this.state = {
            uploadValue: 0,
            picture: null,
            fileName:"",
            idProject:"",
            partnerSelected:"",
            partnerInfo:"",

        };

    this.handleUpload = this.handleUpload.bind(this);
    }

    componentDidMount(){



        this.setState({
            idProject:this.props.idProject,
            partnerSelected:this.props.idPartner,
            partnerStatus:this.props.partnerInfo.state

        })
    }

    handleUpload(event){
        const file= event.target.files[0];
        console.log(file);
        const storageRef = firebase.storage().ref(`/projects/${this.state.idProject}/usersSuggested/${this.state.partnerSelected}/solutionInfo/${file.name}`);
        const task = storageRef.put(file);



        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: percentage,
                fileName : file.name
            })
        }, error => {
            console.log(error.message)
        }, () => {
            this.setState({
                uploadValue:100,
                picture: task.snapshot.ref.getDownloadURL()
            });
            firebase.database().ref(`/projects/${this.state.idProject}/`).update({noticeOwner:true});
            firebase.database().ref(`/projects/${this.state.idProject}/usersSuggested/${this.state.partnerSelected}/`).update({state:"Solution received"});
            var url= `/projects/${this.state.idProject}/usersSuggested/${this.state.partnerSelected}/solutionInfo/${file.name}`;
            var solution= {url:url,filename:file.name};
            firebase.database().ref(`/projects/${this.state.idProject}/usersSuggested/${this.state.partnerSelected}/`).update({doc: {solution:solution }});
            document.getElementById("projectInfo").style.display="none";
            document.getElementById("projectEvaluation").style.display="";



            }
        );
    }




    render (){

        console.log(this.state);
        const isInvalid = this.state.uploadValue !== 100;

        return (

            <div style={{marginLeft:""}} align="center" id="solutionUpload">
                <label for="files"><MDBBtn color="success" id="button2" onClick={() => document.getElementById("files").click()} style={{width:"200px", marginTop:"5px"}}>Upload your solution
                    <i style={{marginLeft:"10px"}}class="fas fa-upload"></i></MDBBtn></label>
                <br/>
                <p>{this.state.fileName}</p>
                <progress value={this.state.uploadValue} max="100"></progress>
                <br/>
                <p>{Math.round(this.state.uploadValue)}%</p>
                <br/>
                <br/>
                <input id="files" type="file" accept="application/pdf" onChange={this.handleUpload} style={{
                    visibility:"hidden",
                    display:"none",
                    width:"200px",
                    fontSize:"small",
                    color:"black",
                    display:"inline-block",
                    marginTop:"5px",
                    placeholder:"Send PDF"
                }}/>




            </div>


        )



    }


}

export default FileUpload;
