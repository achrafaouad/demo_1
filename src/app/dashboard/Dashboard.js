import React, { Component } from 'react';
import { VectorMap } from "react-jvectormap"
import MyMap from "../MyMap";


const mapData = {
  "BZ": 75.00,
  "US": 56.25,
  "AU": 15.45,
  "GB": 25.00,
  "RO": 10.25,
  "GE": 33.25
}

export class Dashboard extends Component {
  
constructor(props){
  super(props);
  console.log('achraf');
  console.log("hana f dashboard",this.props.userInfo);

  if(this.props.userInfo){
    this.state={userInfo:this.props.userInfo}
    this.forceUpdate();
  }
  
}
    //other functions eliminated for brevity
    //other functions eliminated for brevity
  transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
          borderWidth: 0
      }
    },      
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    }
  }

  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  toggleProBanner() {
    document.querySelector('.proBanner').classList.toggle("hide");
  }
  
  render () {
    return (
      <div>
        <div className="row ">
          
                <MyMap/>
              
        </div>
        
       
      </div> 
    );
  }
}

export default Dashboard;