import React, { Component } from 'react'
import Timeline from 'react-visjs-timeline'
import moment from "moment";
import AfficherCalender from './afficherCalender';


const options = {
    width: "100%",
    height: window.innerHeight * 0.97,
    stack: false,
    showMajorLabels: true,
    showCurrentTime: true,
    zoomMin: 1000000,
    type: "range",
    orientation: "top",
    stack: true,
    editable: true,
    format: {
      minorLabels: {
        minute: "h:mma",
        hour: "ha",
        day: "dd D"
      }
    }
    // template: function (item, element, data) {
    //   console.log('template', item)
    //   return <b>{item.content}</b>;
    // }
  };

 
  



  
export class Mdi extends Component {
  constructor(props){
    super(props);
    let adds = [
      {
        "id_operation": 17,
        "note": null,
        "prix_totale": 227194,
        "duré": "11:00",
        "travaux": "{\"Semer ou Planter\"}",
        "content": "vegitale",
        "date_application": [
          "2021-08-24T23:00:00.000Z",
          "2021-08-24T23:00:00.000Z",
          "2021-08-23T23:00:00.000Z"
        ],
        "items": [
          "onion",
        ],
        "id": 1
      }
    ]
    this.state={groups:adds}
    this.fetch_data()
  }

  async fetch_data() {
    await fetch("http://localhost:3001/getCalender")
    .then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("request failed");
      },
      (networkError) => console.log(networkError)
    )
    .then((responseJson) => {
      this.setState({groups:responseJson})
    }
      )
      
}

  componentDidMount(){
    console.log("didmount")
    this.fetch_data()
    var oneSecond = 3000;

    this.intervalID = setInterval(() => {
        
       this.fetch_data()
       
    }, oneSecond);
 }

 componentWillUnmount(){
    clearInterval(this.intervalID);
    
  }


  render() {
    
    console.log("render" , typeof this.state.groups)
    console.log("render" ,  this.state.groups)
    return (
      
        
        <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
            <div className="timeline">
             {( this.state.groups) && <AfficherCalender groups = {this.state.groups}/>}
        </div>
          </div>
          </div>
        </div>
        </div>
     
    )
  }
}

export default Mdi
