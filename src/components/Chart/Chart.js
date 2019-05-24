import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

import { Chart } from "react-google-charts";

import {Bubble} from 'react-chartjs-2';





export default class ChartIndex extends React.Component{

    constructor(props){
        super(props);

        this.state=({
            months: [],
            projects: []
        })

    }

    componentDidMount (){
        this.setState({
            projects: this.props.projects,
            x: this.props.projectsSuggested
        })
    }


    render(){
        console.log(this.state);
        return (
            <div className="chart">
                <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Month', 'Projects created', 'Projects invited'],
                        ['January', 8175000, 8008000],
                        ['February', 3792000, 3694000],
                        ['March', 2695000, 2896000],
                        ['April', 2099000, 1953000],
                        ['May', 1526000, 1517000],
                        ['June', 1526000, 1517000],
                        ['July', 1526000, 1517000],
                        ['August', 1526000, 1517000],
                        ['September', 1526000, 1517000],
                        ['October', 1526000, 1517000],
                        ['November', 1526000, 1517000],
                        ['December', 1526000, 1517000],
                    ]}
                    options={{
                        title: 'Population of Largest U.S. Cities',
                        chartArea: { width: '50%' },
                        colors: ['black', '#ffab91'],
                        hAxis: {
                            title: 'Total Projects',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'City',
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '4' }}
                />


            </div>
        )
    }
}
