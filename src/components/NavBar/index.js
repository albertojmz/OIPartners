import * as ROUTES from "../../constants/routes";
import React from "react";

import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {
    render(){

        return(
            <nav class="navbar navbar-default navbar-fixed-top">
                <div class="container-fluid" align="center">
                    <div class="navbar-header" align="center" style={{marginLeft:"47%"}}>
                        <a class="navbar-brand" href="#" align="center" style={{fontSize:"large", marginTop:"10px"}}>OIPartners</a>
                    </div>
                        <div class="col" align="right" style={{marginTop:"15px"}}>
                            <p class="dont_have">{this.props.text}</p>
                            <p style={{padding: 0}}><Link to={this.props.to} role="button" id="sign-up">{this.props.title}</Link></p>
                        </div>

                </div>
            </nav>

        )
    }
}
