import React, { Component } from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { Select } from 'antd';
import { Input} from 'antd';
import 'antd/dist/antd.css';
import AddTracteur from './add_tracteur';
const { Search } = Input;

const { Option } = Select;
export class Dropdowns extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { name:'',addm:false}

 this.provinceData = [];
 this.onChange = this.onChange.bind(this);
 this.addMat = this.addMat.bind(this);
 
};

   async fetch_data() {

   this.data = await fetch("http://localhost:3001/getMateriel").then(response2 =>{
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
         const oneSecond = 1000;

         this.intervalID = setInterval(() => {
             this.fetch_data()
            
         }, oneSecond);
      }

      componentWillUnmount(){
         clearInterval(this.intervalID);
         
       }

       renderTableData() {
          if(this.state.data){
              if(this.state.value){
                return this.state.data.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                    const { id_mat, description, model, immatriculation,nom } = student //destructuring
        
                    return (
                       <tr key={id_mat} onClick={()=> console.log(student)}>
                          <td>{id_mat}</td>
                          <td>{nom}</td>
                          <td>{description}</td>
                          <td>{model}</td>
                          <td>{immatriculation}</td>
                          <td>{<><button type="button" class="btn btn-success btn-sm" onClick ={()=> console.log(student)}>Editer</button>
                              <button type="button" class="btn btn-danger btn-sm">Suprimer</button></>}</td>
                       </tr>
                    )
                 })
              }
              else{
                return this.state.data.map((student, index) => {
                    const { id_mat, description, model, immatriculation,nom } = student //destructuring
        
                    return (
                       <tr key={id_mat} onClick={()=> console.log(student)}>
                          <td>{id_mat}</td>
                          <td>{nom}</td>
                          <td>{description}</td>
                          <td>{model}</td>
                          <td>{immatriculation}</td>
                          <td>{<><button type="button" class="btn btn-success btn-sm" onClick ={()=> console.log(student)}>Editer</button>
                              <button type="button" class="btn btn-danger btn-sm">Suprimer</button></>}</td>
                       </tr>
                    )
                 })
              }
         
      }}

      renderTableHeader() {
         if(this.state.data){
            let header = Object.keys(this.state.data[0])
           return header.map((key, index) => {
              if(key!='image')
            return <th key={index}>{key.toUpperCase()}</th>
         })
         }
         
      }

      onChange(e){

          this.setState({value:e.target.value.toUpperCase()})
          console.log(e.target.value)
      }
      addMat(){
         let afficher = this.state.addm?false:true
         this.setState({addm:afficher})
         console.log(this.state)
      }
      
  render() {
     console.log("render",this.state)
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card">

            <h1 id='title'>React Dynamic Table materiel</h1>

            { (this.state.addm === false) &&<>
            <div class="d-flex flex-row-reverse bd-highlight">
            
             <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
             <button
                visible
                type="button"
                className="btn btn-success btn-sm "
                id="drow_polygone"
                onClick={this.addMat}
              >
                + ajouter un materiel
              </button>
             </div>
             <br/>
             <br/>

            <table id='students'>
               <tbody>
                  <tr>{this.renderTableHeader()} <th> edit</th></tr>
                  {this.renderTableData()}
               </tbody>
            </table> </>
  }


              {(this.state.addm === true) && <AddTracteur reafficher={this.addMat}/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdowns;
