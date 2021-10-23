import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { Input} from 'antd';
import BarClass from "./Bar";
import RadarChart from "./RadarChart";
import PieChart from "./PieChart";
import { FilteringTableAnn} from "./FilteringTableAnn";
import Scroll from "../basic-ui/Scroll";
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { useFlexLayout } from "react-table";
import { v4 as uuidv4 } from 'uuid';
const { Search } = Input;
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
  }
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
 class RaportResultAnn extends Component {
    constructor(props) {
        super(props) 
        this.state={
          duration:7,
          chartData:{
            labels:["roma","rabat","allal"],
            datasets:[
              {
                label:'produit',
                data:[30,30,30],
                backgroundColor:'#00ccff',
                borderColor:'#ffff'
              },
              {
                label:'Coût',
                data:[30,30,30],
                backgroundColor: '#ffb90f',
                borderColor:'#ffff'
              
              },

            ]
          },
          Traitement:{
            labels:["roma","rabat","allal"],
            datasets:[
              {
                label:'Traitements',
                data:[30,30,30],
                backgroundColor:'#00ccff',
                borderColor:'#ffff'
              }

            ]
          },
          alimentation:{
            labels:["roma","rabat","allal"],
            datasets:[
              {
                label:'Alimentation',
                data:[30,30,30],
                backgroundColor:'#00ccff',
                borderColor:'#ffff'
              }

            ]
          },
          Lait:{
            labels:["roma","rabat","allal"],
            datasets:[
              {
                label:'Lait',
                data:[30,30,30],
                backgroundColor:'#00ccff',
                borderColor:'#ffff'
              }

            ]
          },
          eggs:{
            labels:["roma","rabat","allal"],
            datasets:[
              {
                label:'Lait',
                data:[30,30,30],
                backgroundColor:'#00ccff',
                borderColor:'#ffff'
              }

            ]
          },
          Roi:{
            labels:["roma","rabat","allal"],
            datasets:[
              {
                label:'Lait',
                data:[30,30,30],
                backgroundColor:'#00ccff',
                borderColor:'#ffff'
              }

            ]
          },

        }
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

    this.data = await fetch("http://localhost:3001/Rapport_resultAnimal",{
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
        //affectaion
        this.labels = []
        for(let i = 0;i<this.data.length;i++){
          this.labels.push(this.data[i].nom)
        }
        this.produit=[]
        this.couts=[]
        this.Traitement=[]
        this.TraitementColor=[]
        this.alimentation=[]
        this.alimentationColor=[]
        this.Lait=[]
        this.LaitColor=[]
        this.eggs=[]
        this.eggsColor=[]
        this.Roi=[]
        this.RoiColor=[]

        for(let i = 0;i<this.data.length;i++){
          this.produit.push(this.data[i].Produit)
        }

        for(let i = 0;i<this.data.length;i++){
          this.couts.push(-this.data[i].prixtot)
        }

        for(let i = 0;i<this.data.length;i++){
          this.Traitement.push(-this.data[i].traitements)
        }
        
        for(let i = 0;i<this.data.length;i++){
          this.TraitementColor.push(getRandomColor())
        }
        for(let i = 0;i<this.data.length;i++){
          this.alimentation.push(-this.data[i].alimentation)
        }
        
        for(let i = 0;i<this.data.length;i++){
          this.alimentationColor.push(getRandomColor())
        }
        for(let i = 0;i<this.data.length;i++){
          this.Lait.push(this.data[i].Lait)
        }
        
        for(let i = 0;i<this.data.length;i++){
          this.LaitColor.push(getRandomColor())
        }
        for(let i = 0;i<this.data.length;i++){
          this.eggs.push(this.data[i].eggs)
        }
        
        for(let i = 0;i<this.data.length;i++){
          this.eggsColor.push(getRandomColor())
        }
        for(let i = 0;i<this.data.length;i++){
          this.Roi.push(this.data[i].Roi)
        }
        
        for(let i = 0;i<this.data.length;i++){
          this.RoiColor.push(getRandomColor())
        }
        this.setState(prevState => ({
          chartData: {
            ...prevState.chartData,
            labels: this.labels,
            datasets: [
              {
                label:'produit',
                data:this.produit,
                backgroundColor:'#7fff00',
                borderWidth: 1,
                borderColor:'#00000',
                hoverBorderColor:"#ffff"
              },
              {
                label:'Coût',
                data:this.couts,
                backgroundColor: '#ff3300',
                borderWidth: 1,
                borderColor:'#00000',
                hoverBorderColor:"#ffff"
              
              },

            ]
          }
        }));

        this.setState(prevState => ({
          Traitement: {
            ...prevState.Traitement,
            labels: this.labels,
            datasets: [
              {
                label:'Traitement',
                data:this.Traitement,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              }

            ]
          }
        }));

        this.setState(prevState => ({
          alimentation: {
            ...prevState.alimentation,
            labels: this.labels,
            datasets: [
              {
                label:'alimentation',
                data:this.alimentation,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              }

            ]
          }
        }));
        this.setState(prevState => ({
          Lait: {
            ...prevState.Lait,
            labels: this.labels,
            datasets: [
              {
                label:'Lait',
                data:this.Lait,
                backgroundColor:this.LaitColor,
                borderWidth: 1,
                borderColor:'#00000',
                hoverBorderColor:"#ffff"
              }

            ]
          }
        }));
        this.setState(prevState => ({
          eggs: {
            ...prevState.eggs,
            labels: this.labels,
            datasets: [
              {
                label:'eggs',
                data:this.eggs,
                backgroundColor:this.eggsColor,
                borderWidth: 1,
                borderColor:'#00000',
                hoverBorderColor:"#ffff"
              }

            ]
          }
        }));
        this.setState(prevState => ({
          Roi: {
            ...prevState.Roi,
            labels: this.labels,
            datasets: [
              {
                label:'Le Roi',
                data:this.Roi,
                backgroundColor:this.RoiColor,
                borderWidth: 1,
                borderColor:'#00000',
                hoverBorderColor:"#ffff"
              }

            ]
          }
        }));
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
                   
           <FilteringTableAnn datadnem = {this.state.data144} handlechangement={this.handlechangement} values={this.state.duration}/>
       
        </Scroll>}
              {  (!this.state.data144) && <div style={{display:'flex', justifyContent: "center"}}>
              <div class="spinner-border text-success" role="status" style={{}}>
              <span class="sr-only">Loading...</span>
            </div>
            </div>
            }
      </div></div></div>
      <div class="container">
           <div class="row">

              <div class="col-sm">
              <h2 style={{color:"white" , textAlign:"center"}}>Coûts/Produit</h2>
              <BarClass data={this.state.chartData}/>
              </div>
              </div>
              <h2 style={{textAlign:"center" , color:"white"}}>Traitements/Alimentation</h2>
              <div class="row">
              <div class="col-6">
              <div style={{color:"black", width:"96%"}} className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
              <h2 style={{ textAlign:"center"}}>Traitements</h2>
                <RadarChart data={this.state.Traitement}/>
                
              </div>
              </div>
              <div class="col-6">
              <div style={{color:"black", width:"96%"}} className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
              <h2 style={{textAlign:"center"}}>Alimentation</h2>
                <RadarChart data={this.state.alimentation}/>
                
              </div>
              </div>
              
              
                </div>
                <h2 style={{textAlign:"center" , color:"white"}}>Oeufs/Lait</h2>
                <div class="row">
              <div class="col-6">
              <div style={{color:"black", width:"96%"}} className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
              <h2 style={{ textAlign:"center"}}>Oeufs</h2>
                <PieChart data={this.state.eggs}/>
                
              </div>
              </div>
              <div class="col-6">
              <div style={{color:"black", width:"96%"}} className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
              <h2 style={{textAlign:"center"}}>Lait</h2>
                <PieChart data={this.state.Lait}/>
                
              </div>
              </div>
              
              
                </div>

            
      
      </div>

      <h2 style={{textAlign:"center" , color:"white"}}>Le Roi</h2>
      <BarClass data={this.state.Roi}/>
      </div>

                )
           }
       






    }

    export default RaportResultAnn