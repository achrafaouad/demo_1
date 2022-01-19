import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { Input} from 'antd';
import { FilteringTableVeg} from "./FilteringTableVeg";
import Scroll from "../basic-ui/Scroll";
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { useFlexLayout } from "react-table";
import { v4 as uuidv4 } from 'uuid';
import BarClass from "./Bar";
import RadarChart from "./RadarChart";
import PieChart from "./PieChart";
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const { Search } = Input;
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
  }

 class RaportResult extends Component {
    constructor(props) {
        super(props) 
        this.state={
          duration:7 ,
          hectar:"DH",
          
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
          mat:{
            labels:["roma","rabat","allal"],
            datasets:[
              {
                label:'produit',
                data:[30,30,30],
                backgroundColor:'#00ccff',
                borderColor:'#ffff'
              }

            ]
          },
          operateur:{
            labels:["roma","rabat","allal"],
            datasets:[
              {
                label:'produit',
                data:[30,30,30],
                backgroundColor:'#00ccff',
                borderColor:'#ffff'
              }

            ]
          },
          sem:{
            labels:["roma","rabat","allal"],
            datasets:[
              {
                label:'produit',
                data:[30,30,30],
                backgroundColor:'#00ccff',
                borderColor:'#ffff'
              }

            ]
          },
          eng:{
            labels:["roma","rabat","allal"],
            datasets:[
              {
                label:'produit',
                data:[30,30,30],
                backgroundColor:'#00ccff',
                borderColor:'#ffff'
              }

            ]
          },
          phy:{
            labels:["roma","rabat","allal"],
            datasets:[
              {
                label:'produit',
                data:[30,30,30],
                backgroundColor:'#00ccff',
                borderColor:'#ffff'
              }

            ]
          },
      }
        this.fetch_dataHistorique()
        this.handlechangement= this.handlechangement.bind(this)
        this.handlechange= this.handlechange.bind(this)
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
    if (prevState.hectar !== this.state.hectar) {
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
        duration:this.state.duration,
        hectar:this.state.hectar
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
          this.labels.push(this.data[i].nomFoncier)
        }

        this.produit=[]
        this.couts=[]
        this.mat=[]
        this.matColor=[]
        this.operateur=[]
        this.operateurColor=[]
        this.sem=[]
        this.semColor=[]
        this.eng=[]
        this.engColor=[]
        this.phy=[]
        this.phyColor=[]
        this.Roi=[]
        this.RoiColor=[]
        
        for(let i = 0;i<this.data.length;i++){
          this.produit.push(this.data[i].recolt)
        }

        for(let i = 0;i<this.data.length;i++){
          this.couts.push(-this.data[i].priceTot)
        }
        for(let i = 0;i<this.data.length;i++){
          this.mat.push(-this.data[i].matPrice)
        }
        console.log('MAT',this.mat)
        for(let i = 0;i<this.data.length;i++){
          this.matColor.push(getRandomColor())
        }
        for(let i = 0;i<this.data.length;i++){
          this.operateur.push(-this.data[i].operateur)
        }
        for(let i = 0;i<this.data.length;i++){
          this.operateurColor.push(getRandomColor())
        }
        
        for(let i = 0;i<this.data.length;i++){
          this.sem.push(-this.data[i].Sem)
        }
        for(let i = 0;i<this.data.length;i++){
          this.semColor.push(getRandomColor())
        }
        
        for(let i = 0;i<this.data.length;i++){
          this.eng.push(-this.data[i].Eng)
        }
        for(let i = 0;i<this.data.length;i++){
          this.engColor.push(getRandomColor())
        }
        
        for(let i = 0;i<this.data.length;i++){
          this.phy.push(-this.data[i].Phy)
        }
        for(let i = 0;i<this.data.length;i++){
          this.phyColor.push(getRandomColor())
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
          mat: {
            ...prevState.mat,
            labels: this.labels,
            datasets: [
              {
                label:'materiel',
                data:this.mat,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              }

            ]
          }
        }));
        this.setState(prevState => ({
          operateur: {
            ...prevState.operateur,
            labels: this.labels,
            datasets: [
              {
                label:'opérateur',
                data:this.operateur,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              }

            ]
          }
        }));
        this.setState(prevState => ({
          sem: {
            ...prevState.sem,
            labels: this.labels,
            datasets: [
              {
                label:'Semence',
                data:this.sem,
                backgroundColor:this.semColor,
                borderWidth: 1,
                borderColor:'#00000',
                hoverBorderColor:"#ffff"
              }

            ]
          }
        }));
        this.setState(prevState => ({
          eng: {
            ...prevState.eng,
            labels: this.labels,
            datasets: [
              {
                label:'Engrais',
                data:this.eng,
                backgroundColor:this.engColor,
                borderWidth: 1,
                borderColor:'#00000',
                hoverBorderColor:"#ffff"
              }

            ]
          }
        }));
        this.setState(prevState => ({
          phy: {
            ...prevState.eng,
            labels: this.labels,
            datasets: [
              {
                label:'phytosanitaire',
                data:this.phy,
                backgroundColor:this.phyColor,
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

       handlechange({target}){
        console.log("ello");
        this.setState({
          [target.name]: target.value
        });
        console.log(this.state);
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
                   
           <FilteringTableVeg datadnem = {this.state.data144} handlechangement={this.handlechangement} handlechange = {this.handlechange}values={this.state.duration} val={this.state.hectar}/>
       
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
              <h2 style={{textAlign:"center" , color:"white"}}>Opérateurs/materiels</h2>
              <div class="row">
              
              <div class="col-6">
              <div style={{color:"black", width:"96%"}} className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
              <h2 style={{ textAlign:"center"}}>materiel</h2>
                <RadarChart data={this.state.mat}/>
                
              </div>
              </div>
              <div class="col-6">
              <div style={{color:"black", width:"96%"}} className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
              <h2 style={{textAlign:"center"}}>Opérateur</h2>
                <RadarChart data={this.state.operateur}/>
                
              </div>
              </div>
              
              

        </div>
              <h2 style={{textAlign:"center" , color:"white"}}>Les Intrants</h2>
              <div class="row">
              
              <div class="col-6">
              <div style={{color:"black", width:"96%"}} className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
              <h2 style={{ textAlign:"center"}}>Semence</h2>
              
                <PieChart data={this.state.sem}/>
                
              </div>
              </div>
              <div class="col-6">
              <div style={{color:"black", width:"96%"}} className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
              <h2 style={{textAlign:"center"}}>Engrais</h2>
                <PieChart data={this.state.eng}/>
                
              </div>
              </div>

        </div>
        <div class="row" >
        <div class="col-12">
              <div style={{color:"black", width:"98%"}} className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
              <h2 style={{textAlign:"center"}}>phytosanitaire</h2>
                <PieChart data={this.state.phy}/>
                
              </div>
              </div>
              </div>
          
          <div/>
       
      </div>
      <h2 style={{textAlign:"center" , color:"white"}}>Le Roi</h2>
      <BarClass data={this.state.Roi}/>

      </div>

                )
           }
       






    }

    export default RaportResult