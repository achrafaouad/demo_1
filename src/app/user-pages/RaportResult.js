import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { Input} from 'antd';
import { FilteringTableVeg} from "./FilteringTableVeg";
import Scroll from "../basic-ui/Scroll";
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { useFlexLayout } from "react-table";
import { v4 as uuidv4 } from 'uuid';
const { Search } = Input;
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
  }

 class RaportResult extends Component {
    constructor(props) {
        super(props) 
        this.state={duration:7}
        this.fetch_dataHistorique()
        this.handlechangement= this.handlechangement.bind(this)
    }


    
  handlechangement(e){
    console.log(e.target.value)
    this.setState({"duration":Number(e.target.value)}) 
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.duration !== this.state.duration) {
      console.log('pokemons state has changed.')
      this.fetch_dataHistorique()
      
    }
  }
  


     
async fetch_dataHistorique() {

    this.data = await fetch("http://localhost:3001/RaportResult",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        id_exp:JSON.parse(sessionStorage.getItem('user')).id,
        duration:this.state.duration
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
            console.log("hyhyyhy")
            return (
              <div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card "key={uuidv4()} style={{minHeight: '100vh',
      maxHeight: "100hv"}}>
              {  (this.state.data144) && <Scroll>
                   
           <FilteringTableVeg datadnem = {this.state.data144} handlechangement={this.handlechangement} values={this.state.duration}/>
       
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