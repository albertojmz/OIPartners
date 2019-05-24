import React, { Component } from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn} from 'mdbreact';

// Import React Table
import ReactTable from "react-table";

// Import Hamoni Sync

export default class EditableTable extends Component {

    handleRowDel(index) {
        //var index = this.state.projects.indexOf(product);

        this.state.rows.splice(index, 1);
        this.setState({rows: this.state.rows, haveRemoved : true});

    };



    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.project.factors
        };
        this.addRow = this.addRow.bind(this);
    }
    addRow (){
        if((document.getElementById("factorTitle").value && document.getElementById("factorDescription").value) !== null && document.getElementById("groupFactor").value !== "") {
            console.log("hola");
            var rows = this.state.rows;
            rows.push({group:document.getElementById("groupFactor").value, title: document.getElementById("factorTitle").value, description: document.getElementById("factorDescription").value, weight:""});
            console.log(this.state)
            this.setState({rows: rows});
            document.getElementById("factorTitle").value = null;
            document.getElementById("factorDescription").value = null;
            document.getElementById("groupFactor").value = "";

            console.log(this.props.project);
        }
        else{
            console.log("error");
        }
    }

    render() {

        document.getElementById("nextButton").style.display=""

        return (
            <div>

                    <Paper>

                        <div style={{paddingTop:"20px",paddingLeft:"20px"}}>
                            <select class="browser-default custom-select"  id="groupFactor"  name="type" style={{width:"initial", marginBottom:"10px"}} >
                                <option value="">-- Select one --</option>
                                <option value="Closeness">Closeness to the Entity</option>
                                <option value="Technical">Technical Adequacy</option>

                            </select>
                            <p style={{fontSize:"small"}}>Title</p>
                            <input id="factorTitle" style={{width:"250px"}}></input>
                            <p style={{fontSize:"small", marginTop:"10px"}}>Description</p>
                            <input id="factorDescription"style={{width:'430px'}}></input>

                        <button id="addBtn" onClick={this.addRow} style={{marginLeft:'10px'}}>ADD</button>
                        </div>

                        <MDBTable align="center" style={{width:"100%", marginTop:"20px"}} scrollY maxHeight="490px" fixed>
                            <MDBTableHead>
                                <tr>
                                    <th style={{fontSize:"small"}}>Group</th>
                                    <th style={{fontSize:"small"}}>Factor</th>
                                    <th style={{fontSize:"small"}}>Description</th>
                                    <th></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody height="50px">

                                {this.state.rows.map((row,i) => (

                                    <tr key={i} style={{height:"40px"}}>
                                        <td style={{ fontSize:"small"}}>{row.group}</td>
                                        <td style={{fontSize:"small"}}>{row.title}</td>
                                        <td style={{ fontSize:"small"}}>{row.description}</td>
                                        <td style={{marginTop:"3px"}}><MDBBtn color="danger" onClick={() =>this.handleRowDel(i)}>Delete</MDBBtn></td>

                                    </tr>
                                ))}


                            </MDBTableBody>
                        </MDBTable>

                    </Paper>


            </div>

        );
    }
}

