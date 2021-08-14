import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Input} from 'antd';

const { Search } = Input;


export class AnimalTable extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { name:'' , afficher:false}

 
}



async fetch_data() {
    

    this.data = fetch("http://localhost:3001/getAnimal",{
        method:'POST',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({id_exploitation:this.props.id})}).then(response2 =>{
       if(response2.ok){
         return response2.json();
       }
       throw new Error('request failed');}, networkError => console.log(networkError))
       .then( responseJson2 =>{
           console.log("ha data",typeof responseJson2)
         return responseJson2
        })
        
        this.setState({data:this.data})
        this.onChange = this.onChange.bind(this); 
}

       renderTableData() {
        if(this.state.data.length >0){
        

            if(this.state.value){
              return this.state.data.filter((d)=>{if(d.id) return d.id.includes(this.state.value)} ).map((student, index) => {
                  const { id_ann, gender, date_birth, race,sous_famille } = student //destructuring
      
                  return (
                     <tr key={id_ann} onClick ={()=> this.setState({choosen:student ,  afficher:true})}>
                        <td>{id_ann}</td>
                        <td>{gender}</td>
                        <td>{date_birth}</td>
                        <td>{race}</td>
                        <td>{sous_famille}</td>
                        <td>{<><button type="button" class="btn btn-success btn-sm" >Editer</button>
                            <button type="button" class="btn btn-danger btn-sm">Suprimer</button></>}</td>
                     </tr>
                  )
               })
            }
            else{
              return this.state.data.map((student, index) => {
                  
                const { id_ann, gender, date_birth, race,sous_famille } = student //destructuring
      
                  return (
                     <tr key={id_ann} onClick ={()=> this.setState({choosen:student ,  afficher:true})}>
                        <td>{id_ann}</td>
                        <td>{gender}</td>
                        <td>{date_birth}</td>
                        <td>{race}</td>
                        <td>{sous_famille}</td>
                        <td>{<><button type="button" class="btn btn-success btn-sm" >Editer</button>
                            <button type="button" class="btn btn-danger btn-sm">Suprimer</button></>}</td>
                     </tr>
                  )
               })
            }
       
    }}
    onChange(e){

        this.setState({value:e.target.value.toUpperCase()})
        console.log(e.target.value)
    }
    componentDidMount(){
        this.fetch_data()
    }

    renderTableHeader() {
        if(this.state.data){
           
           return (
              <>
           <th key={1}  >id animal</th>
           <th key={2}  >sexe</th>
           <th key={3}  >date de naissance</th>
           <th key={4}  >race</th>
           <th key={5}  >sous famille</th>
           <th key={6}> Edit</th>
           </>
           )
        
        }
        
     }

    render(){
        
        return(
            <div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card">
               {(!this.state.afficher)&& <>
            <h1 id='title'>Exploitation Animal</h1>

            
            <div class="d-flex flex-row-reverse bd-highlight">
            
             <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
       
             </div>
             <br/>
             <br/>

            <table id='students'>
               <tbody>
                   <tr>{this.renderTableHeader()} </tr> 
                   {(this.state.data) && this.renderTableData() }
               </tbody>
            </table> </> }
            
          


              
            </div>
          </div>
        </div>
      </div>
        )
    }

    }

    export default AnimalTable