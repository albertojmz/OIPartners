import React from 'react';

import {withFirebase} from "../Firebase";
import '../../css/dashboard.css';

import partner from '../../img/partner.jpg';

import { MDBBtn} from 'mdbreact';

export default class PartnerSelectedView extends React.Component{


    constructor(props){
        super()
        this.state = {
            partner : [],
        }
    }





    render(){
        const isInvalid = this.props.partner === ''
        ;





        return(
            <div className="col partnerView" >
                <div id="partnerView" style={{display: "none"}}>

                <div class="row">
                    <div className="col-lg-4 col-md-4 col-sm-4" align="center">
                        <img src={partner} style={{width:"120px", height:"120px"}}></img>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Username: </label>{this.props.partner.username}</p>
                        <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Type: </label>{this.props.partner.type}</p>
                        <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Category: </label>{this.props.partner.category}</p>
                    </div>
                </div>

                    <div class="rowInfo">

                        <div className="infoPartner">
                            <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Description: </label>{this.props.partner.description}</p>
                            <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Role: </label>{this.props.partner.role}</p>

                        </div>
                    </div>
                    <div class="rowButton">

                        <div align="center" style={{marginTop:"220px"}}>
                            <p><label style={{fontWeight: "bold", marginRight:"5px"}}>State: </label>{this.props.state}</p>
                            <MDBBtn color="success" id="button1" onClick={() => this.props.contactPartner()} style={{marginRight:"5px",width:"200px", display:"none"}}>Contact</MDBBtn>
                            <MDBBtn color="warning" id="button2" onClick={() => console.log("hola")} style={{width:"200px", display:"none", color:"black"}}>Send Info</MDBBtn>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
