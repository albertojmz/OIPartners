import { Chart } from "react-google-charts";
import * as React from "react";
import { render } from "react-dom";



class App extends React.Component {



    getUsersWithDistance(){
        var users = [];

        this.props.users.map((r,i) => {
            if(r[1].factors !== undefined){
                users.push(r);
            }
        })
        this.setState({
            users:users
        })

        if(users.length === 0){
            if(document.getElementById("distanceMap") !== null || document.getElementById("infoMap") !== null ) {
                document.getElementById("distanceMap").style.display = "none";
                document.getElementById("infoMap").style.display = "";

            }}

        var data = [['ID', 'Closeness to the firm', 'Technical Adequacy', 'Name', 'Size'],
            ['You', 0.0, 0.0, this.state.username, 0.5]];

        users.map((user,i) => {
            var bubble = [user[1].partnerSelected.username, user[1].factors.totalCloseness, user[1].factors.totalTechnical, user[1].partnerSelected.username, (9-user[1].factors.distance)  ]
            data.push(bubble)

        })




        this.setState({
            series : data,
        })

    }

    componentWillMount(){


        this.setState({
            username: this.props.username
        })

        this.getUsersWithDistance()




    }

    constructor(props) {
        super(props);



        this.state = {
            users:[],
            series: [],
            username:this.props.username
        }

    }

    render() {
        console.log(this.state);
        return (


            <div id="chart">

                <div id={"infoMap"} align="center" style={{display:"none"}}>
                    <p><label style={{fontWeight:"bold"}}>Distance Map:</label></p>
                    <p><label >To see the distance map is needed to evaluate at least one partner</label></p>
                </div>
                <div id={"distanceMap"}>
                <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="BubbleChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.series}
                    options={{
                        title:
                        'Distance map',
                        hAxis: { title: 'Closeness to the firm', maxValue:5 },
                        vAxis: { title: 'Technical Adequacy', maxValue:5 },
                        bubble: { textStyle: { fontSize: 11 } },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />            </div>
            </div>


        );
    }
}
export default App;
