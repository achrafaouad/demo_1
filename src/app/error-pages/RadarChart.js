import React, { Component } from "react";
import { Radar } from 'react-chartjs-2';


class RadarChart extends Component{
    
    render(){
        return <Radar data={this.props.data}/>
    }
}

export default RadarChart