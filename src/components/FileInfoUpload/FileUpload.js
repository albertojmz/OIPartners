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
            partnerStatus:this.props.partnerInfo.state,
            partnerEmail:this.props.partnerInfo.partnerSelected.email,

        })
    }

    handleUpload(event){
        const file= event.target.files[0];
        console.log(file);
        const storageRef = firebase.storage().ref(`/projects/${this.state.idProject}/usersSuggested/${this.state.partnerSelected}/generalInfo/${file.name}`);
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
            firebase.database().ref(`/projects/${this.state.idProject}/usersSuggested/${this.state.partnerSelected}/`).update({state:"Info sent to the partner", noticeSuggested:true});
            var url= `/projects/${this.state.idProject}/usersSuggested/${this.state.partnerSelected}/generalInfo/${file.name}`;
            var info= {url:url,filename:file.name};
            firebase.database().ref(`/projects/${this.state.idProject}/usersSuggested/${this.state.partnerSelected}/`).update({doc: {info:info }});
            document.getElementById(this.state.partnerSelected).style.display="none";
                document.getElementById(this.state.partnerEmail).innerText="Info sent to the partner";
            this.setState({
                partnerStatus:"Info sent to the partner"
            });



            }
        );
    }




    render (){

        console.log(this.state);
        const isInvalid = this.state.uploadValue !== 100;

        return (

            <div style={{marginLeft:""}} align="center">
                <label for="files"><MDBBtn color="primary" id="button2" onClick={() => document.getElementById("files").click()} style={{width:"200px", marginTop:"5px"}}>Send PDF</MDBBtn></label>
                <br/>
                <p>{this.state.fileName}</p>
                <progress value={this.state.uploadValue} max="100"></progress>
                <br/>
                <p>{Math.round(this.state.uploadValue)}%</p>
                <br/>
                <p hidden={isInvalid} style={{fontWeight:"600"}}>You have sent your document to the partner! Now you have yo wait for the answer.</p>
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
