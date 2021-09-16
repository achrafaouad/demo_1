import React, { Component } from "react";
import AddTraitement from "./addTraitement";
import ModifierAnimal from "./ModifierAnimal";
import  "./StyleResp.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { format } from 'date-fns';
const style = {
    display: "grid",
    gridTemplateColumns: "50%  50%"}

  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

class AnimalProfil extends Component{
    constructor(props){
        super(props);
        let animal = this.props.choosed
        this.state = {animal:animal}

        console.log("hana f profil dielo",this.state)
        this.fetch_data()
        if(this.state.animal.photo){
          this.src = "http://localhost:3001/" + this.state.animal.photo
        }
        else{
          this.src = "https://p0.pikist.com/photos/881/972/cow-prairie-field-agro-industry-heifer-breeding-agriculture-animal-farm.jpg"
        }
    }
    

    async fetch_data() {
    

      await fetch("http://localhost:3001/getEffectuerTrait",{
        method:'POST',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({id_ann:this.state.animal.id_ann})}).then(response2 =>{
       if(response2.ok){
         return response2.json();
       }
       throw new Error('request failed');}, networkError => console.log(networkError))
       .then( responseJson2 =>{
           console.log("ha data", responseJson2)
           this.setState({data:responseJson2})
        })
        
        
        console.log("ha les traitement" ,this.state.data) 
}

componentDidMount(){
  console.log("didmount")
  var oneSecond = 15000;

  this.intervalID = setInterval(() => {
      
     this.fetch_data()
     console.log("ha lhistrique")
     
  }, oneSecond);
}

componentWillUnmount(){
  clearInterval(this.intervalID);
  
}



       
      
      
        // let jsonData = JSON.parse(geometry)
        // jsonData["crs"] = {"type":"name","properties":{"name":"EPSG:3857"}}
        
      
    renderTableHeader() {
       return (
            <>
         <th key={1}  >traitement</th>
         <th key={2}  >date traitement</th>
         <th key={3}  >N`Bulletin</th>
         <th key={4}  >cout</th>
         <th key={5}  >veterinaire</th>
         <th key={5}  >Note</th>
         
         </>
         ) 
   }

   renderTableData() {
    if(this.state.data.length >0){
    

        if(this.state.value){
          return this.state.data.filter((d)=>{if(d.id) return d.id.includes(this.state.value)} ).map((student, index) => {
              const { id_trait,note,id ,operation, date_traitement, numero_bulletin, cout,veterinaire } = student //destructuring
  
              return (
                 <tr key={id} >
                    <td>{operation}</td>
                    <td>{  format(new Date(date_traitement), 'dd/MM/yyyy')
                             }</td>
                    <td>{numero_bulletin}</td>
                    <td>{cout}</td>
                    <td>{veterinaire}</td>
                    <td>{note}</td>
                   
                 </tr>
              )
           })
        }

        else{
          return this.state.data.map((student, index) => {
              
            const { id_trait,note,id ,operation, date_traitement, numero_bulletin, cout,veterinaire } = student //destructuring
  
              return (
                 <tr key={id} >
                    <td>{operation}</td>
                    <td>{  format(new Date(date_traitement), 'dd/MM/yyyy')
                             }</td>
                    <td>{numero_bulletin}</td>
                    <td>{cout}</td>
                    <td>{veterinaire}</td>
                    <td>{note}</td>
                   
                 </tr>
              )
           })
        }
   
}}




    
        
        
           

    render(){
      
        return (<>
            { (this.state.animal) && <>
                <button type="button" style={{width:"80px",margin:"20px"}} class="btn btn-success btn-sm" onClick ={()=> {this.props.afficher();console.log("rje3")} }>retour</button>
             <h1 style={{color:"#ffff" , textAlign:'center'}}>Détails de l'animal</h1>
             <hr class="style18"/>


             <div class="container">
           <div class="row">

           <div class="col-sm">


            <div style={{margin: "15px",color:"black", width:"96%"}} className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
                    <h3 style={{color:"#434c5e"}}>Information sur l'animal</h3>
                    <hr class="style18"/>
                      
                    
                    <div  >
                        <strong> Id Animal</strong> : {this.state.animal.id_ann}
                        
                      </div>
                    <div  >
                        <strong> Id mère</strong> : {this.state.animal.id_maman}
                        
                      </div>
                    <div>
                        <strong> sexe</strong> : {this.state.animal.gender}
                        
                      </div>
                    <div>
                        <strong> date de naissance </strong> : {format(new Date(this.state.animal.date_birth), 'dd/MM/yyyy')
                                    }
                        
                      </div>
                    <div>
                        <strong> race</strong> : {this.state.animal.race}
                        
                      </div>
                    
                      <div>
                        <strong> Coût d'achat</strong> : {this.state.animal.prix} dh
                        
                      </div>
                      <div>
                        <strong> statut</strong> : {this.state.animal.note} 
                        
                      </div>

                      <div style={{color:"#0c8599"}}>
                        <strong> Coût de revient </strong> : {(!this.state.animal.cout_revien)?'-':this.state.animal.cout_revien} dh
                        
                      </div>
                      
            </div>
            </div>

           
            <div class="col-sm">
                 
                 <img
                 style={{width:"100%", height: "auto",}}
                 src={this.src}
                alt=" hello"/>
         
          
            </div>


           

            </div>

            <div class="container">
              <div class="row">
                  <div class="col-sm" style={{width:"100%", margin:'10px'}}>
                  <AddTraitement id={this.state.animal.id_ann} />
                  </div>

                  <div class="col-sm" style={{width:"100%", margin:'10px'}}>
                  <ModifierAnimal expl={this.state.animal} id={this.state.animal.id_ann}/>
                  </div>
            </div>
            </div>
            </div>
            <h2 style={{color:"#ffff",textAlign: "center"}} > Historique des traitement</h2>
            <div class="d-flex flex-row-reverse bd-highlight" style={{margin:"15px"}}>
            <ReactHTMLTableToExcel className="btn btn-info me-md-3" table="students"  filename={"Traitements"+today +"_animal_" + this.state.animal.id_ann } sheet="Sheet" buttonText="Export to Excel"/>
            </div>
            <table id='students' style={{width:"100%", height: "auto",}}>
               <tbody>
                   <tr>{this.renderTableHeader()} </tr> 
                   {(this.state.data) && this.renderTableData() }
               </tbody>
            </table></>
            }
        </>)
    }
}

export default AnimalProfil;