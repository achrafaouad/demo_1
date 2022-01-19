import React, { Component } from 'react'
import Timeline from 'react-visjs-timeline'
import moment from "moment";
import { format } from 'date-fns';


const options = {
    width: "100%",
    height: window.innerHeight,
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

   



   

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  


export class AfficherCalender extends Component {
  constructor(props){
    super(props);
   this.state = {}
  }


  render() {
    const groups  = this.props.groups
    if(this.props.groups){
        
        const items = [];
        groups.forEach((group) => {
        group.items.forEach((item , index) => {
          console.log("hello",groups[index].date_application);
             items.push({
            id: items.length,
            start: new Date (groups[index].date_application),
            end: addDays(groups[index].date_application, 365), // end is optional
            content: item,
            group: group.id
          });
        });
      });
        console.log('items',items)
        console.log('groups',groups)
    
        console.log("maareft mal had bent l 9e7ba ")
        return (
            <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                <div className="timeline" >
                 {
                <Timeline options={options} items={items} groups={groups} />}
            </div>
              </div>
              </div>
            </div>
            </div>
         
        )
      }

    }
    
}

export default AfficherCalender
