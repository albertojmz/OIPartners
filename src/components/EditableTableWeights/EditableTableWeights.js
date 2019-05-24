import React, { Component } from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';

import update from 'react-addons-update';

import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn} from 'mdbreact';


export default class EditableTableWeights extends Component {





    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.project.factors,
            weightTotal: 0,
            weightTotal2:0,
            closeness: [],
            technical:[]
        };

    }

    componentDidMount(){

        document.getElementById("nextButton").style.display="none"

        console.log("APARECE")

        var closeness = [];
        var technical = [];

        this.state.rows.map( (item,i) => {

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

        var allRows2 = technical;

        var weightTotal2 = allRows2.reduce((totalWeights, row) => parseFloat(totalWeights) + parseFloat(row.weight), 0);
        const allRows = closeness;

        const weightTotal = allRows.reduce((totalWeights, row) => parseFloat(totalWeights) + parseFloat(row.weight), 0);


        this.setState({
            closeness:closeness,
            technical:technical,
            rows: this.props.project.factors,
            weightTotal2 : weightTotal2,
            weightTotal : weightTotal
        })

    }


    addWeight2(i,rowTitle){

        var index = parseFloat(i) + parseFloat(Object.entries(this.state.closeness).length);


        var row = {group:this.state.rows[index].group,title: rowTitle, description:this.state.rows[index].description, weight: document.getElementById(rowTitle).value};
        this.state.rows.splice(index, 1,row);

        var row2 = {group:this.state.technical[i].group, title: rowTitle, description:this.state.technical[i].description, weight: document.getElementById(rowTitle).value};
        this.state.technical.splice(i, 1,row2);


        this.setState({rows: this.state.rows, technical:this.state.technical, haveRemoved : true});

        const allRows = this.state.technical;

        const weightTotal2 = allRows.reduce((totalWeights, row) => parseFloat(totalWeights) + parseFloat(row.weight), 0);

        this.setState({weightTotal2 : weightTotal2});

        console.log(weightTotal2);



    }

    addWeight1(i,rowTitle){

        var row = {group:this.state.closeness[i].group, title: rowTitle, description:this.state.closeness[i].description, weight: document.getElementById(rowTitle).value};
        var row2 = {group:this.state.rows[i].group, title: rowTitle, description:this.state.rows[i].description, weight: document.getElementById(rowTitle).value};
        this.state.closeness.splice(i, 1,row);
        this.state.rows.splice(i, 1,row2);

        this.setState({closeness: this.state.closeness, haveRemoved : true, rows:this.state.rows});

        const allRows = this.state.closeness;

        const weightTotal = allRows.reduce((totalWeights, row) => parseFloat(totalWeights) + parseFloat(row.weight), 0);

        this.setState({weightTotal : weightTotal});

        console.log(weightTotal);


    }



    render() {

        console.log(this.state);

        const weightTotal = this.state.weightTotal;
        const weightTotal2 = this.state.weightTotal2;

        const isInvalid = weightTotal === 100;
        const isInvalid2 = weightTotal2 === 100;

        console.log(isInvalid);



        if(isInvalid === true && isInvalid2== true){document.getElementById("nextButton").style.display=""}


        return (
            <div>

                <Paper>
                    <div align="center" style={{paddingTop:"15px"}}>
                        <p style={{fontSize:"initial"}}>Closeness to the Entity ({Object.entries(this.state.closeness).length})</p>
                    </div>
                    <p style={{color:"red", marginLeft:"20px", marginTop:"20px", fontSize:"small"}} hidden={isInvalid}> The total weight have to be 100%, check your numbers</p>

                    <MDBTable align="center" style={{width:"100%"}} scrollY maxHeight="150px" fixed>
                        <MDBTableHead>
                            <tr>
                                <th style={{fontSize:"small"}}>Factor</th>
                                <th style={{fontSize:"small"}}>Weight (%)</th>
                                <th></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody height="40px">

                            {this.state.closeness.map((row,i) => (

                                <tr key={i} style={{height:"40px"}}>
                                    <td style={ {fontSize:"small"}}>{row.title}</td>
                                    <td style={{ fontSize:"small"}}><input type="number" id={row.title} placeholder={"Example: 50%"} value={row.weight}onChange={() => {this.addWeight1(i,row.title)}}/></td>

                                </tr>
                            ))}


                        </MDBTableBody>
                    </MDBTable>


                    <div align="center"  style={{paddingTop:"15px"}}>
                        <p style={{fontSize:"initial"}}>Technical Adequacy ({Object.entries(this.state.technical).length})</p>
                    </div>
                    <p style={{color:"red", marginLeft:"20px", marginTop:"20px", fontSize:"small"}} hidden={isInvalid2}> The total weight have to be 100%, check your numbers</p>

                    <MDBTable align="center" style={{width:"100%"}} scrollY maxHeight="330px" fixed>
                        <MDBTableHead>
                            <tr>
                                <th style={{fontSize:"small"}}>Factor</th>
                                <th style={{fontSize:"small"}}>Weight (%)</th>
                                <th></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody height="50px">

                            {this.state.technical.map((row,i) => (

                                <tr key={i} style={{height:"40px"}}>
                                    <td style={{ fontSize:"small"}}>{row.title}</td>
                                    <td style={{fontSize:"small"}}><input type="number" id={row.title} placeholder="Example: 50%" value={row.weight} onChange={() => {this.addWeight2(i,row.title)}}/></td>

                                </tr>
                            ))}


                        </MDBTableBody>
                    </MDBTable>
                </Paper>



            </div>

        );
    }
}

