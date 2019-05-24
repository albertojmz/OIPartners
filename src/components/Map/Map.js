import React from 'react';
import {VectorMap} from 'react-jvectormap';


export default class Map extends React.Component{





    render(){
        return (
            <div style={{width: 400, height: 200}}>
                <VectorMap map={'world_mill'}
                           backgroundColor="#BAD8E4"
                           ref="map"
                           containerStyle={{
                               width: '100%',
                               height: '100%'
                           }}
                           containerClassName="map"
                markers={[
                    {latLng: [41.90, 12.45], name: 'Vatican City'},
                    {latLng: [43.73, 7.41], name: 'Monaco'},
                    {latLng: [-0.52, 166.93], name: 'Nauru'},
                    {latLng: [-4.61, 55.45], name: 'Seychelles'},
                    {latLng: [7.35, 134.46], name: 'Palau'},
                    {latLng: [42.5, 1.51], name: 'Andorra'},
                    {latLng: [14.01, -60.98], name: 'Saint Lucia'},
                    {latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},
                    {latLng: [1.3, 103.8], name: 'Singapore'},
                    {latLng: [-20.2, 57.5], name: 'Mauritius'},
                    {latLng: [26.02, 50.55], name: 'Bahrain'},
                    {latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}
                ]}
                />
            </div>
        )
    }
}
