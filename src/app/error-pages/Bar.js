import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';


class BarClass extends Component{
    
    render(){
        return <Bar data={this.props.data}/>
    }
}

export default BarClass