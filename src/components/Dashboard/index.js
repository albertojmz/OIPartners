import React from 'react';
import {withAuthorization} from "../Session";
import Sidebar from "../Sidebar";
import * as ROUTES from "../../constants/routes";
import NavBar from "../NavBar";
import GeneralNavbar from '../generalNavbar';
import Navigation from '../Navigation';

import '../../css/dashboard.css';


const DashboardPage = () => (
    <div>

        <GeneralNavbar/>
        <Sidebar/>
        <Dashboard />
        <Navigation/>


    </div>
);

class Dashboard extends React.Component{



    render(){
        return(
            <div>
                <p>Hola</p>
            </div>
        )
    }

}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(DashboardPage);
