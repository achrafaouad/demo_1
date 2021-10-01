import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Input} from 'antd';
import AnimalProfil from "./animalProfil";
import { format } from 'date-fns';
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { BiEdit } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import DeleteFromTable from "./DeleteFromTable";
const { Search } = Input;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

export class AnimalTable extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { name:'' , afficher:false}
    this.fetch_data();
    this.onChange = this.onChange.bind(this)
    this.afficheranimal = this.afficheranimal.bind(this)
 
}



async fetch_data() {
    

      await fetch("http://localhost:3001/getAnimal",{
        method:'POST',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({id_exploitation:this.props.id})}).then(response2 =>{
       if(response2.ok){
         return response2.json();
       }
       throw new Error('request failed');}, networkError => console.log(networkError))
       .then( responseJson2 =>{
           console.log("ha data", responseJson2)
           this.setState({data:responseJson2})
        })
        
        
        console.log("ha l hayawan" ,this.state.data) 
}

       renderTableData() {
        if(this.state.data.length >0){
        

            if(this.state.value){
              return this.state.data.filter((d)=>{if(d.id_ann) return (d.id_ann == this.state.value)} ).map((student, index) => {
                  const { id_ann, gender, date_birth, race,sous_famille } = student //destructuring
      
                  return (
                     <tr key={id_ann} onClick ={()=> {this.setState({choosen_ann:student }); ;console.log(student)}}>
                        <td>{id_ann}</td>
                        <td>{gender}</td>
                        <td>{  format(new Date(date_birth), 'dd/MM/yyyy')
                             }</td>
                        <td>{race}</td>
                        <td>{<><button type="button" class="btn btn-success btn-sm"  onClick ={()=> {this.setState({ afficher:true}); this.props.afficher_animal()}}><BiEdit/></button>
                        <DeleteFromTable choosen = {this.state.choosen_ann } type = 'animal'   /></>}</td>
                     </tr>
                  )
               })
            }
            else{
              return this.state.data.map((student, index) => {
                  
                const { id_ann, gender, date_birth, race,sous_famille } = student //destructuring
                return (
                  <tr key={id_ann} onClick ={()=> {this.setState({choosen_ann:student }); ;console.log(student)}}>
                     <td>{id_ann}</td>
                     <td>{gender}</td>
                     <td>{  format(new Date(date_birth), 'dd/MM/yyyy')
                          }</td>
                     <td>{race}</td>
                     <td>{<><button type="button" class="btn btn-success btn-sm"  onClick ={()=> {this.setState({ afficher:true}); this.props.afficher_animal()}}><BiEdit/></button>
                     <DeleteFromTable choosen = {this.state.choosen_ann } type = 'animal' /></>}</td>
                  </tr>
               )
               })
            }
       
    }}
    onChange(e){

        this.setState({value:e.target.value})
        console.log(e.target.value)
    }
    

    renderTableHeader() {
        if(this.state.data){
           
           return (
              <>
           <th key={1}  >id animal</th>
           <th key={2}  >sexe</th>
           <th key={3}  >date de naissance</th>
           <th key={4}  >race</th>
           <th key={6}> Edit</th>
           </>
           )
        
        }
        
     }

     afficheranimal(){
       let afficher = this.state.afficher === true?false:true
       this.setState({afficher:afficher})
       console.log("rje3 t9")
       this.props.afficher_animal()
     }

    render(){
        
        return(
            <div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card">
          
            {(!this.state.afficher) && <><h1 id='title'>Mes Animaux</h1>

            
            <div class="d-flex flex-row-reverse bd-highlight">
             
             <Search  placeholder="filtrer par l'id de votre animal" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
             <ReactHTMLTableToExcel className="btn btn-info" table="students"  filename={"Animaux_"+today} sheet="Sheet" buttonText="Export to Excel"/>
             </div>
             <br/>
             <br/>

            <table id='students' style={{width:"100%", height: "auto",}}>
               <tbody>
                   <tr>{this.renderTableHeader()} </tr> 
                   {(this.state.data) && this.renderTableData() }
               </tbody>
            </table></> }

            {(this.state.afficher) &&<AnimalProfil choosed = {this.state.choosen_ann} afficher={this.afficheranimal}/>}
            
          


              
            </div>
          </div>
        </div>
      </div>
        )
    }

    }

    export default AnimalTable