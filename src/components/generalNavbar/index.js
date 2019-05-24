import React from 'react';


import '../../css/dashboard.css';


export default class generalNavbar extends React.Component{


    constructor(props){
        super()
    }

    render(){

        return(
        <div className="generalNavbar" style={{marginLeft: '50px'}}>
            <nav className="navbar navbar-inverse main">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <label align="center" className="navbarTitle" id="navbar-text" href="#" >
                            {this.props.title}
                        </label>
                    </div>
                </div>
            </nav>
        </div>
        )
}
}
