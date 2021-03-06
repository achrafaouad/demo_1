import React, { Component } from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { Select } from 'antd';
import { format } from 'date-fns';
import { Input} from 'antd';
import 'antd/dist/antd.css';
import ExploitationPage from "./exploitationPage";
import { BiEdit } from "react-icons/bi";

import DeleteFromTable from "./DeleteFromTable";


//import AddTracteur from './add_tracteur';
const { Search } = Input;

const { Option } = Select;
export class Dropdowns extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { name:'' , afficher:false}

 this.provinceData = [];
 this.onChange = this.onChange.bind(this);
 this.retour = this.retour.bind(this);
 
 
 
};


   async fetch_data() {

   this.data = await fetch("http://localhost:3001/getExploitationAnimal",{
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
       
       this.setState({data:this.data}) 
   
      }

      componentDidMount(){
         console.log("didmount")
         this.fetch_data()
         var oneSecond = 10000;

         this.intervalID = setInterval(() => {
             
            this.fetch_data()
            
         }, oneSecond);
      }

      componentWillUnmount(){
         clearInterval(this.intervalID);
         
       }

       retour(){
          let vari = (this.state.afficher === true)?false:true;
          this.setState({afficher:vari})
          console.log("retour")
       }
      

       renderTableData() {
          if(this.state.data){
              if(this.state.value){
                return this.state.data.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                    const { id_exploitation, surface, date_exploitation, batiment,nom } = student //destructuring
        
                    return (
                     <tr key={id_exploitation} onClick ={()=> this.setState({choosen:student})}>
                        <td>{id_exploitation}</td>
                        <td>{nom}</td>
                        <td>{Math.round(surface)} ha</td>
                        <td>{  format(new Date(date_exploitation), 'dd/MM/yyyy')
                             }</td>
                        <td>{(batiment)?'Oui':'Non'}</td>
                        <td>{<><button type="button" class="btn btn-success btn-sm"  onClick ={()=> this.setState({choosen:student ,  afficher:true})} ><BiEdit/></button>
                        <DeleteFromTable choosen = {this.state.choosen} type = 'Prodanimal'/></>}</td>
                     </tr>
                  )
                 })  
              }      
              else{
                return this.state.data.map((student, index) => {
                    
                  const { id_exploitation, surface, date_exploitation, batiment,nom } = student //destructuring
        
                  return (
                     <tr key={id_exploitation} onClick ={()=> this.setState({choosen:student})}>
                        <td>{id_exploitation}</td>
                        <td>{nom}</td>
                        <td>{Math.round(surface)} ha</td>
                        <td>{  format(new Date(date_exploitation), 'dd/MM/yyyy')
                             }</td>
                        <td>{(batiment)?'Oui':'Non'}</td>
                        <td>{<><button type="button" class="btn btn-success btn-sm"  onClick ={()=> this.setState({choosen:student ,  afficher:true})} ><BiEdit/></button>
                        <DeleteFromTable choosen = {this.state.choosen } type = 'Prodanimal'/></>}</td>
                     </tr>
                  )
                 })
              }
         
      }}

      renderTableHeader() {
         if(this.state.data){
            
            return (
               <>
            <th key={1}  >id_exploitation</th>
            <th key={2}  >Nom d'exploitation</th>
            <th key={3}  >Surface occup??e</th>
            <th key={4}  >date_exploitation</th>
            <th key={5}  >batiment</th>
            <th key={6}> edit</th>
            </>
            )
         
         }
         
      }

      onChange(e){

          this.setState({value:e.target.value.toUpperCase()})
          console.log(e.target.value)
      }
      
      
  render() {
     console.log("render",this.state)
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card" style={{minHeight: '100vh',
      maxHeight: "100hv"}}>
               {(!this.state.afficher)&& <>
            <h1 id='title'>Exploitation Animal</h1>

            
            <div class="d-flex flex-row-reverse bd-highlight">
            
             <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
       
             </div>
             <br/>
             <br/>

            <table id='students' style={{width:"100%", height: "auto",}}>
               <tbody>
                  <tr>{this.renderTableHeader()} </tr>
                  {this.renderTableData()}
               </tbody>
            </table> </> }
            
            { (this.state.afficher)&& <ExploitationPage exploitation={this.state.choosen} retour={this.retour}  />}


              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdowns;
