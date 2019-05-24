import React from 'react';

import { withAuthorization } from '../Session';
import Sidebar from '../Sidebar';
import NavBar from "../generalNavbar";
import {withFirebase} from "../Firebase";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import PartnerSelectedView from '../PartnerSelectedView/PartnerSelectedView';

import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn} from 'mdbreact';
import * as ROUTES from "../../constants/routes";

import "react-notification-alert/dist/animate.css";
import NotificationAlert from 'react-notification-alert';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

import ReactModal from 'react-modal';
import partner from '../../img/partner.jpg';



const SearchPartnerPage = () => (
    <div id="fd">
        <NavBar title={"Search Partner"}/>
        <Sidebar/>
        <SearchPartner/>

    </div>
);

var options = {};
options = {
    place: 'tl',
    message: (
        <div>
            <div>
                <b>Partner contacted</b>
            </div>
        </div>
    ),
    type: "danger",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 7
}



class SearchPartnerBase extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            partners: [],
            partnerSelected: '',
            id: this.props.location.state.id,
            state: "",
            project: this.props.location.state.project,
            usersSuggested: Object.entries(this.props.location.state.project.usersSuggested),
            partnersSelected:[],
            showModal: false,
            showModal2:false
        };


    };



    componentWillUnmount(){
        console.log("componentWillUnmount")
        this.props.firebase.users().off()
    }

    componentDidMount(){
        var partners = [];
        this.props.firebase.users().once("value", snapshot => {
                var object = Object.entries(snapshot.val());
                object.map((partner, i) => {
                    if (partner[0] !== this.props.firebase.auth.currentUser.uid) {
                       if( (this.state.usersSuggested.find( e => e[0] === partner[0])) !== undefined){
                           partners.push({ username: partner[1].username, type: partner[1].type, category:partner[1].category,
                               partner: partner[1], country: partner[1].country, city:partner[1].city,
                               state: (this.state.usersSuggested.find( e => e[0] === partner[0]))[1].state,
                               selected:false},
                           );
                       }else {

                           partners.push({
                               username: partner[1].username,
                               type: partner[1].type,
                               category: partner[1].category,
                               partner: partner[1],
                               state: "Not contacted",
                               selected:false
                           });
                       }
                    }
                    this.setState({partners: partners});
                })
        })
    }

    handleOpenModal(partnerSelected ,status) {
        this.setState({
            showModal: true,
            partnerSelected: partnerSelected,
            state: status


        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
        });

    }
    handleOpenModal2() {
        this.setState({
            showModal2: true,



        });
    }

    handleCloseModal2() {
        this.setState({
            showModal: false,
        });

        this.props.history.push(ROUTES.PROJECTS);



    }

    selectPartner(partner) {



        console.log(this.state.partnerStatus);

        document.getElementById("partnerView").style.display = "";

        this.setState({
            partnerSelected: partner,

        })

        if (this.state.usersSuggested !== '') {
            console.log(this.state.usersSuggested)
            var users = this.state.usersSuggested;
            var userFounded = users.find(e => e[0] === partner.uid);
            if (userFounded !== undefined) {
                this.setState({state: userFounded[1].state})
                if(userFounded[1].state === "Contacted"){
                    console.log("contactado");
                    document.getElementById("button1").style.display = "none";
                    document.getElementById("button2").style.display = "none";
                }
                if(userFounded[1].state === "Accepted"){
                    document.getElementById("button2").style.display = "";
                }

            }
            else{
                this.setState({state: ""})
                document.getElementById("button1").style.display = "";
                document.getElementById("button2").style.display = "none";
            }


        }

    }

    addPartner(partner, partnerAll){
        var partnersSelected = this.state.partnersSelected;

        if ( this.state.partnersSelected.find(e => e === partnerAll) !== undefined){

        }

        else if ( this.state.partnersSelected.find(e => e === partnerAll) === undefined){
            partnersSelected.push(partnerAll)
            this.state.partners[this.state.partners.indexOf(this.state.partners.find(e => e === partnerAll))].selected = true;
        }

        this.setState({
            partnersSelected:partnersSelected
        })
    }

    splicePartner(partner, partnerAll){
        var partnersSelected = this.state.partnersSelected;

        if ( this.state.partnersSelected.find(e => e === partnerAll) !== undefined){
            this.state.partners[this.state.partners.indexOf(this.state.partners.find(e => e === partnerAll))].selected = false;

            partnersSelected.splice(this.state.partnersSelected.indexOf(this.state.partnersSelected.find(e => e === partnerAll) ),1)
        }

        else if ( this.state.partnersSelected.find(e => e === partnerAll) === undefined){

        }

        this.setState({
            partnersSelected:partnersSelected
        })
    }


    contactPartner = event => {
        //this.myFunc();
        const {id, project, partnerSelected, partnerStatus} = this.state;

        this.setState({partnerStatus:"prueba"});


        this.state.partnersSelected.map((partner) => {
            var partnerSelected = partner.partner;
            this.props.firebase
                .userSuggested(id, partner.partner.uid)
                .set({
                        partnerSelected,
                        state: "Contacted",
                     noticeSuggested: true
                    }
                )
                .then(() => {

                    var array = this.state.usersSuggested;
                    array.push([partnerSelected.uid , {partnerSelected : partnerSelected, state:"Contacted" } ]);

                    this.setState({usersSuggested : array, state: "Contacted"});
                    this.props.firebase.project(id).update({ partners: "Contacted Partner/Partners",
                        noticeOwner: false });

                })
                .catch(error => {
                    this.setState({error});
                })

                .catch(error => {
                    this.setState({error});
                });

        })



        this.handleOpenModal2()



        //event.preventDefault();
    };





    render(){

        const isInvalid = this.state.partnersSelected.length === 0
        ;

        const columns = [{
            dataField: 'username',
            text: 'Username',
            filter: textFilter(),
            sort: true,
            style: (cell, row, rowIndex, colIndex) => {
                return {

                    width: "300px"
                }
            }
        },{
            dataField: 'type',
            text: 'Type',
            sort: true,
            filter: textFilter(),


        },{
            dataField: 'category',
            text: 'Category',
            sort: true,
            filter: textFilter(),

        },{
            dataField: 'country',
            text: 'Country',
            sort: true,
            filter: textFilter(),

        },{
            dataField: 'city',
            text: 'City',
            sort: true,
            filter: textFilter(),

        },{
            dataField: 'state',
            text: 'State',
            sort: true,
            filter: textFilter(),

        },

        {
            dataField: 'df1',
            text: '',
            formatter: (cellContent, row, rowIndex) => (
                    <label>
                        <i className="fas fa-info-circle" onClick={() => this.handleOpenModal(row.partner,row.state)}
                           style={{marginLeft:"7px", fontSize:"x-large"}} />

                    </label>
            ),
            style: (cell, row, rowIndex, colIndex) => {
                return {

                    width: "30px"
                }
            }
        },
            {
                dataField: 'df3',
                text: '',
                formatter: (cellContent, row, rowIndex) => {
                    if ((row.state === "Not contacted" ||  row.state === "Denied") && row.selected === false) {
                        return (

                            <label>
                                <i className="fas fa-plus-circle" onClick={() => this.addPartner(row.username, row)}
                                   style={{ fontSize:"x-large", color:"yellowgreen"}} />

                            </label>
                        )
                    }
                },
                style: (cell, row, rowIndex, colIndex) => {
                    return {

                        width: "80px"
                    }
                }
            }


        ];




        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">

            </span>
        );


        const options = {
            paginationSize: 5,
            pageStartIndex: 0,
            // alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false, // Hide the going to First and Last page button
            hideSizePerPage: true, // Hide the sizePerPage dropdown always
            // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            sizePerPageList: [{
                text: '6', value: 6
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: 10000000
            }]  // A numeric array is also available. the purpose of above example is custom the text
        };


        const rowStyle = { height:"20px" };

        console.log(this.state);

        return(
            <div>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    className="sendInfoView"
                    style={{

                        overlay: {

                            marginLeft: "275px",
                            zIndex: 1
                        },
                        content: {
                            zIndex: 1,
                            marginTop: "100px",
                            backgroundColor: 'white',
                            marginLeft: "230px",
                            width: "60%",
                            height: "440px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            color: "#333",
                            fontSize: " small"
                        }
                    }}
                >
                    <button style={{margin: "10px"}} onClick={() => this.handleCloseModal()}>Close</button>
                    <div align="center" style={{marginTop: "20px"}}>
                        <p style={{fontSize: "x-large", fontWeight: "bolder"}}>User:</p>
                    </div>
                    <div align="center" style={{marginTop: "5px", width:"80%", marginLeft :" 60px"}}>

                                <div class="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4" align="center">
                                        <img src={partner} style={{width:"120px", height:"120px"}}></img>
                                    </div>
                                    <div className="col-lg-8 col-md-8 col-sm-8">
                                        <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Username: </label>{this.state.partnerSelected.username}</p>
                                        <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Type: </label>{this.state.partnerSelected.type}</p>
                                        <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Category: </label>{this.state.partnerSelected.category}</p>
                                    </div>
                                </div>

                                <div class="rowInfo">

                                    <div className="infoPartner">
                                        <p><label style={{fontWeight: "bold", marginRight:"5px"}}>Description: </label>{this.state.partnerSelected.description}</p>

                                    </div>
                                </div>
                                <div class="rowButton">

                                    <div align="center" style={{marginTop:"20px"}}>
                                        <p><label style={{fontWeight: "bold", marginRight:"5px"}}>State: </label>{this.state.state}</p>
                                        <MDBBtn tag="a" color="primary" outline  href={`mailto:${this.state.partnerSelected.email}`}
                                                style={{width: "200px", fontSize: "small", height:"auto"}} >Send Email</MDBBtn>


                                    </div>
                                </div>

                    </div>
                </ReactModal>
                <ReactModal
                    isOpen={this.state.showModal2}
                    contentLabel="Minimal Modal Example"
                    className="sendInfoView"
                    style={{

                        overlay: {

                            marginLeft: "275px",
                            zIndex: 1
                        },
                        content: {
                            zIndex: 1,
                            marginTop: "100px",
                            backgroundColor: 'white',
                            marginLeft: "230px",
                            width: "60%",
                            height: "300px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            color: "#333",
                            fontSize: " small"
                        }
                    }}
                >
                    <button style={{margin: "10px"}} onClick={() => this.handleCloseModal2()}>Close</button>
                    <div align="center" style={{marginTop: "20px"}}>
                        <p style={{fontSize: "x-large", fontWeight: "bolder"}}>Partners contacted!</p>
                    </div>
                    <div align="center" style={{marginTop: "20px", width:"80%", marginLeft :" 60px"}}>

                        <label>You have contacted succesfully the partners that you have selected. Now you have to wait to
                        the partners to accept or deny your invitation.</label>
                        <MDBBtn  color="success" outline  onClick={() => this.handleCloseModal2()} style={{ width:"90%", marginTop:"70px"}}>Ok!</MDBBtn>


                    </div>
                </ReactModal>
                <NotificationAlert ref="notify" />

                <div style={{marginLeft: "300px"}} className="row">

                    <div className="col-lg-9 col-md-9 col-sm-9">
                        <div className="partnersScroll">
                            <div class="partnersHeader" align="center">
                                <label style={{fontWeight:"bold", marginBottom:"20px", fontSize:"medium"}}>Partners</label>
                                <BootstrapTable
                                    keyField="id"
                                    data={ this.state.partners }
                                    columns={ columns }
                                    filter={ filterFactory() }
                                    pagination={ paginationFactory(options) }
                                    rowStyle={rowStyle}
                                    bordered = {false}
                                    striped = {true}

                                />
                            </div>
                        </div>
                    </div>



                    <div class="col-lg-2 col-md-2 col-sm-2">
                        <div className="col partnerView" >
                            <div id="partnerView" >

                                <div style={{height:"550px"}}>
                                <label style={{fontWeight: "bold"}}>Partners Selected
                                    ({Object.entries(this.state.partnersSelected).length})</label>
                                <MDBTable align="center" striped style={{width: "100%"}} scrollY maxHeight="500px">
                                    <MDBTableHead>
                                        <tr>
                                            <th>Name</th>
                                            <th></th>

                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>

                                        {this.state.partnersSelected.map((r, i) => (

                                            <tr key={i}>
                                                <td style={{paddingTop: "13px"}}>{r.username}</td>
                                                <td style={{paddingTop: "13px"}}>
                                                    <i class="deleteCircle fas fa-plus-circle" id="deleteCircle"  onClick={() => this.splicePartner(r.username,r)} style={{fontSize: "x-large",color:"red", transform:"rotate(45deg)"}}/>

                                                </td>
                                            </tr>
                                        ))}

                                    </MDBTableBody>
                                </MDBTable>
                                </div>
                                <div style={{}} align="center">
                                <MDBBtn  color="success" disabled={isInvalid} onClick={() => this.contactPartner()} style={{ width:"90%"}}>Contact</MDBBtn>
                                </div>
                            </div>
                        </div>
                    </div>
              </div>
            </div>
        )
    }
};

const SearchPartner = compose(
    withRouter,
    withFirebase,
)(SearchPartnerBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(SearchPartnerPage);
