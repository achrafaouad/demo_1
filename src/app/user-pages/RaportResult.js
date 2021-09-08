import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { Input} from 'antd';
import { FilteringTable } from "./FilteringTable";
import Scroll from "../basic-ui/Scroll";
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { useFlexLayout } from "react-table";
const { Search } = Input;
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
  }

 class RaportResult extends Component {
    constructor(props) {
        super(props) 
        this.state={}
        this.fetch_dataHistorique()
    }



     
async fetch_dataHistorique() {

    this.data = await fetch("http://localhost:3001/RaportResult",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        id_exp:JSON.parse(sessionStorage.getItem('user')).id 
      })
 }).then(response2 =>{
       if(response2.ok){
         return response2.json();
       }
       throw new Error('request failed');}, networkError => console.log(networkError))
       .then( responseJson2 =>{
         return responseJson2
        })
        console.log(this.data)
        this.setState({data144:this.data})  
    
       }


      
           render(){
            console.log('state',this.state)
            return (
              <div>
            <h1> hello</h1>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card ">
              {  (this.state.data144) && <Scroll>
                   
           <FilteringTable datadnem = {this.state.data144}/>
       
        </Scroll>}
              {  (!this.state.data144) && <div style={{display:'flex', justifyContent: "center"}}>
              <div class="spinner-border text-success" role="status" style={{}}>
              <span class="sr-only">Loading...</span>
            </div>
            </div>
            }
      </div></div></div></div>

                )
           }
       






    }

    export default RaportResult