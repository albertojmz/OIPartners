import React from 'react';

import { withAuthorization } from '../Session';
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import NavBar from "../generalNavbar";
import {withFirebase} from "../Firebase";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import Stepper from '../Stepper/HorizontalLinearStepper';
import * as ROUTES from "../../constants/routes";

import moment from 'moment';
import {differenceInDays} from "date-fns";







const CreateProjectPage = () => (
    <div id="fd">
        <NavBar title={"Create a Project"}/>
        <Sidebar/>
        <Project/>

    </div>
);


const INITIAL_STATE = {
    ownerId:'',
    title: '',
    description: '',
    solution: '',
    type:'',
    category:'',
    factors: [
        {group: "Closeness",title:"General level of Technical Knowledge", description:"Technologies that the partner knows, the methods that they use...",weight:""},
        {group: "Closeness",title:"Relationship", description:"Previous experience with the partner",weight:""},
        {group: "Technical",title:"Specific level of Technical Knowledge", description:"",weight:""},
        {group: "Technical",title:"Solution Complexity", description:"Solution's complexity with respect to the given challenge proposed",weight:""},
        {group: "Technical",title:"Time/Deadline", description:"Time to provide a solution to the challenge based on the partner's capabilities",weight:""},
        {group: "Technical",title:"Budgetary Resources", description:"Budgetary Resources allocated to the partner by the firm and the difference with the budget that the partner requested",weight:""},
        {group: "Technical",title:"Cultural Diversity", description:"Differences, in terms of cultural diversity, between the firm and the partner",weight:""},
    ],

    partners:'No partners founded',
    startDate: "",
    endDate:"",
    usersSuggested: '',
    error: null,
};

class CreateProjectBase extends React.Component{

    constructor(props) {
        super(props);


        this.state = {...INITIAL_STATE};
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    getDays(){

        var startDate=new Date(this.state.startDate);
        var endDate = new Date(this.state.endDate);
        var today = new Date()



        if( today <= startDate){
            console.log("0%")
            this.setState({

                status: "Not started"
            })

        }

        else if ( today >= endDate){
            console.log("100%")
            this.setState({
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
            this.setState({
                status: "Ongoing"
            })


        }



    }


    componentDidMount(){

        this.setState({
            ownerId:'',
            title: '',
            description: '',
            solution: '',
            type:'',
            category:'',
            factors: [
                {group: "Closeness",title:"General level of Technical Knowledge", description:"Technologies that the partner knows, the methods that they use...",weight:""},
                {group: "Closeness",title:"Relationship", description:"Previous experience with the partner",weight:""},
                {group: "Technical",title:"Specific level of Technical Knowledge", description:"",weight:""},
                {group: "Technical",title:"Solution Complexity", description:"Solution's complexity with respect to the given challenge proposed",weight:""},
                {group: "Technical",title:"Time/Deadline", description:"Time to provide a solution to the challenge based on the partner's capabilities",weight:""},
                {group: "Technical",title:"Budgetary Resources", description:"Budgetary Resources allocated to the partner by the firm and the difference with the budget that the partner requested",weight:""},
                {group: "Technical",title:"Cultural Diversity", description:"Differences, in terms of cultural diversity, between the firm and the partner",weight:""},
            ],

            partners:'No partners founded',
            startDate: "",
            endDate:"",
            usersSuggested: '',
            error: null,
        })
    }

    onSubmit = event => {
        this.getDays()
        const {ownerId, title, description, solution, type, category, factors, partners, usersSuggested, status} = this.state;



                // Create a user in your Firebase realtime database
                this.props.firebase
                    .projects()
                    .push({
                        ownerId : this.props.firebase.auth.currentUser.uid,
                        title,
                        description,
                        solution,
                        type,
                        category,
                        factors,
                        partners,
                        status,
                        startDate: (this.state.startDate.getMonth()+1).toString() + "-" + this.state.startDate.getDate().toString() +'-'+this.state.startDate.getFullYear().toString() ,
                        endDate: (this.state.endDate.getMonth()+1).toString() + "-" + this.state.endDate.getDate().toString() +'-'+this.state.endDate.getFullYear().toString()  ,
                        usersSuggested

                    })
                    .then(() => {
                        this.setState({...INITIAL_STATE});
                        this.props.history.push(ROUTES.PROJECTS);
                    })
                    .catch(error => {
                        this.setState({error});
                    })

            .catch(error => {
                this.setState({error});
            });
                if( document.getElementById("noProjects") !== null) {
                    document.getElementById("noProjects").style.display="none"
                }
        //event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
        this.getDays()
    };

    handleChange2(date) {
        this.setState({
            endDate: date
        })
    }
    handleChange(date) {

        this.setState({
            startDate: date
        })

    }


    render(){
        return(

            <div class="createActivities">

                <div class="create_activities" id="create_activities">
                    <div class="rowheader" id="row header">
                        <div class="col-sm-12">


                                <Stepper onChange={this.onChange} onSubmit={this.onSubmit} handleChange={this.handleChange} handleChange2={this.handleChange2} project={this.state}/>

                        </div>
                    </div>
                </div>



            </div>

        )
    }
};

const Project = compose(
    withRouter,
    withFirebase,
)(CreateProjectBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CreateProjectPage);
