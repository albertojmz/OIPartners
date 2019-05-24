import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import EditableTable from '../EditableTable/EditableTable';
import EditableTableWeights from '../EditableTableWeights/EditableTableWeights';



import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const muiTheme = getMuiTheme({
    stepper:{
        iconColor: 'green'
    }
})

const styles = theme => ({
    root: {
        fontSize:"large",
        width: '100%',
    },

    button: {

        color:"white",
        backgroundColor: "#50B1D8",
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },



});

function getSteps() {
    return ['General Setup','Solution Definition', 'Define factors','Evaluate Weights', 'Summary'];
}

//function

class HorizontalLinearStepper extends React.Component {

    getStepContent(step) {

         const {title, description, solution, type, category, startDate, endDate} = this.props.project;


        switch (step) {

            case 0:
                return (


                    <div className="step1">
                        <form>
                            <p class="activity_summary" id="activities_title" align="center">Project: </p>


                            <div class="md-form">
                                <label for="activity_title"
                                       class="font-weight-light" style={{fontSize:"small"}}>Title of the Project</label>
                                <input type="text" id="activity_title" onChange={this.props.onChange}
                                       class="form-control" name="title" value={title} />

                            </div>


                            <div class="md-form">

                                <label for="activity_title"
                                       class="font-weight-light" style={{fontSize:"small"}}>Description</label>
                                <textarea rows="8" cols="50" class="form-control" name="description" id="activity_description" value={description} onChange={this.props.onChange} ></textarea>
                            </div>
                            <div class="form-group" id="type_list">
                                <label for="activity_title"
                                       class="font-weight-light" style={{fontSize:"small"}}>Type of the project</label>
                                <select class="browser-default custom-select"  id="type_category" onChange={this.props.onChange} name="type" >
                                    <option value="">-- Select one --</option>
                                    <option value="Challenge">Challenge</option>
                                    <option value="Custom">Custom</option>

                                </select>
                            </div>
                            <div class="form-group" id="category_list">
                                <label for="activity_title"
                                       class="font-weight-light" style={{fontSize:"small"}}>Category of the project:</label>
                                <select class="browser-default custom-select" name="category" id="activity_category" onChange={this.props.onChange} >
                                    <option value="">-- Select one --</option>
                                    <option value="Architecture">Architecture</option>
                                    <option value="Biology">Biology, biotechnology, ecology, environmental, atmospheric science and sea science</option>
                                    <option value="Agriculture">Agricultural sciences, forestry and fishing</option>
                                    <option value="Health">Health science, nutrition and biomedical</option>
                                    <option value="Humanistic">Humanistic</option>
                                    <option value="Chemical">Chemical sciences</option>
                                    <option value="Social">Social sciences, politics, public administration, international relations, communication, law and geography</option>
                                    <option value="Artistics">Artistics disciplines</option>
                                    <option value="Economy">Economy, administration and tourism</option>
                                    <option value="Education">Education and pedagogy</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Mathematics">Mathematics, physics and astronomy</option>
                                </select>
                            </div>
                            <div class="form-group" >
                                <row>
                                    <label style={{marginRight:'5px'}}>Start Date: </label>
                                        <DatePicker

                                            id="startDate"
                                            name="startDate"
                                            dateFormat="yyyy/MM/dd"
                                            selected={ this.props.project.startDate }
                                            onSelect={ this.props.handleChange}
                                            style={{marginLeft:'5px'}}
                                        />
                                    <label style={{marginLeft:'25px', marginRight:'5px'}}>End Date: </label>
                                        <DatePicker
                                            dateFormat="yyyy/MM/dd"
                                            name="endDate"
                                            id="endDate"
                                            selected={ this.props.project.endDate }
                                            onSelect={ this.props.handleChange2 }
                                            style={{marginLeft:'5px'}}
                                        />
                                </row>
                                <row>
                                    {(startDate > endDate) && (endDate !== '') ?   <label style={{color:"red"}} >Check Start Date is before End Date</label>
                                        : null}
                                </row>


                            </div>

                        </form>
                    </div>

                );
            case 1:
                return (
                    <div className="step1">
                        <form>
                            <p class="activity_summary" id="activities_title" align="center">Solution: </p>

                            <div class="md-form"  style={{marginTop:"30px"}}>

                                <label for="activity_title"
                                       class="font-weight-light" style={{fontSize:"small"}}>What have to do the partner?</label>
                                <textarea rows="8" cols="80" class="form-control" name="solution" id="activity_description" value={solution} onChange={this.props.onChange} ></textarea>
                            </div>

                        </form>
                    </div>
                );
            case 2:
                return (
                    <EditableTable project={this.props.project} onChange={this.props.onChange}/>
                );
            case 3:
                return(
                    <EditableTableWeights project={this.props.project} onChange={this.props.onChange}/>
                );
            case 4:
                return(
                    <div style={{marginTop:"20px"}}>
                        <h4 align="center">Summary:</h4>
                        <div style={{marginLeft:"60px", marginTop:"20px"}}>
                            <p style={{fontSize: "small"}}><label style={{fontWeight:"bold", marginRight:"7px"}}>Title: </label><label>{this.props.project.title}</label></p>
                            <p style={{fontSize: "small"}}><label style={{fontWeight:"bold", marginRight:"7px"}}>Description:</label> {this.props.project.description}</p>
                            <p style={{fontSize: "small"}}><label style={{fontWeight:"bold", marginRight:"7px"}}>Type:</label> {this.props.project.type}</p>
                            <p style={{fontSize: "small"}}><label style={{fontWeight:"bold", marginRight:"7px"}}>Category: </label>{this.props.project.category}</p>
                            <p style={{fontSize: "small"}}><label style={{fontWeight:"bold", marginRight:"7px"}}>Factors:</label></p>
                            {this.props.project.factors.map((row,i) => (
                                <ul key={i}>
                                    <li component="th" scope="row" style={{fontSize:"small"}}>
                                        ({row.group}) {row.title} - {row.weight}%
                                    </li>
                                </ul>
                            ))}

                            <p style={{fontSize: "small"}}><label style={{fontWeight:"bold", marginRight:"7px", marginTop:"5px"}}>Start Date: </label>{(this.props.project.startDate.getMonth()+1).toString()+"-"+this.props.project.startDate.getDate().toString()+"-"+this.props.project.startDate.getFullYear().toString()}</p>
                            <p style={{fontSize: "small"}}><label style={{fontWeight:"bold", marginRight:"7px"}}>End Date: </label>{(this.props.project.endDate.getMonth()+1).toString()+"-"+this.props.project.endDate.getDate().toString()+"-"+this.props.project.endDate.getFullYear().toString()}</p>
                        </div>


                    </div>
                );
            default:
                return 'Unknown step';
        }
    }




    constructor (props) {
        super(props)
        this.state = {
            activeStep: 0,
            skipped: new Set(),
            startDate:"",
            endDate:"",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);

    }

    isStepOptional = step => step === 1;

    handleNext = () => {

        console.log(this.props.project);
        const { activeStep } = this.state;
        if(activeStep === 0){
            document.getElementById("create_activities").style.height = "400px";

        }
        if(activeStep === 1){
            document.getElementById("create_activities").style.height = "800px";
        }
        if(activeStep === 3){
            document.getElementById("create_activities").style.height = "600px";
        }
        if(activeStep === 4){
            this.props.onSubmit();
        }

        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        if(activeStep === 1){
            document.getElementById("create_activities").style.height = "560px";
        }
        if(activeStep === 2){
            document.getElementById("create_activities").style.height = "400px";
        }
        if(activeStep === 3){
            document.getElementById("create_activities").style.height = "800px";
        }
        if(activeStep === 4){
            document.getElementById("create_activities").style.height = "800px";
        }


        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleSkip = () => {
        const { activeStep } = this.state;
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
                activeStep: state.activeStep + 1,
                skipped,
            };
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }




    handleChange(date) {

        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        var fulldate = day + '-' + month + '-' + year;

        this.setState({
            startDate: fulldate
        })

    }
    handleChange2(date) {
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        var fulldate = day + '-' + month + '-' + year;
        console.log(date.toString());
        this.setState({
            endDate: date
        })

    }

    componentDidMount(){
        document.getElementById("nextButton").style.display=""
    }




        render() {

        console.log(this.state);
        console.log(this.props.project);
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
            const {title, description, solution, type, category, startDate, endDate} = this.props.project;


            const isInvalid =
                title === '' ||
                description === '' ||
                type === '' ||
                category === '' ||
                startDate === '' ||
                endDate === '' ||
                endDate < startDate


            ;



        console.log(isInvalid)

        return (
            <div className={classes.root}>
                <MuiThemeProvider muiTheme={muiTheme}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const props = {};
                        const labelProps = {};
                        if (this.isStepOptional(index)) {
                            labelProps.optional = <Typography variant="caption"></Typography>;
                        }
                        if (this.isStepSkipped(index)) {
                            props.completed = false;
                        }
                        return (
                            <Step key={label} {...props} className={classes.stepLabel}>
                                <StepLabel iconContainerStyle={{width: 100}} {...labelProps} className="MuiStepIcon-active-54 MuiStepIcon-root-52">
                                    <span style={{fontSize:"small"}}>{label}</span>
                                    </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                </MuiThemeProvider>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={this.handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Typography className={classes.instructions}>{this.getStepContent(activeStep)}</Typography>
                            <div align="right">
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}
                                >
                                    Back
                                </Button>

                                <Button
                                    id="nextButton"
                                    disabled={isInvalid}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

HorizontalLinearStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLinearStepper);
