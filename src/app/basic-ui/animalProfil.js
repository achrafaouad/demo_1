import React, { Component } from "react";
import AddTraitement from "./addTraitement";

const style = {
    display: "grid",
    gridTemplateColumns: "50%  50%"}

class AnimalProfil extends Component{
    constructor(props){
        super(props);
        let animal = this.props.choosed
        this.state = {animal:animal}

        console.log("hana f profil dielo",this.state)
        this.fetch_data()
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
  var oneSecond = 5000;

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
         
         </>
         )
      
      
      
   }

   renderTableData() {
    if(this.state.data.length >0){
    

        if(this.state.value){
          return this.state.data.filter((d)=>{if(d.id) return d.id.includes(this.state.value)} ).map((student, index) => {
              const { id_trait,id ,operation, date_traitement, numero_bulletin, cout,veterinaire } = student //destructuring
  
              return (
                 <tr key={id} >
                    <td>{operation}</td>
                    <td>{date_traitement}</td>
                    <td>{numero_bulletin}</td>
                    <td>{cout}</td>
                    <td>{veterinaire}</td>
                   
                 </tr>
              )
           })
        }
        else{
          return this.state.data.map((student, index) => {
              
            const { id,id_trait ,operation, date_traitement, numero_bulletin, cout,veterinaire } = student //destructuring
  
              return (
                 <tr key={id}  onClick={()=>console.log(student)}>
                    <td>{operation}</td>
                    <td>{date_traitement}</td>
                    <td>{numero_bulletin}</td>
                    <td>{cout}</td>
                    <td>{veterinaire}</td>
                   
                 </tr>
              )
           })
        }
   
}}




    
        
        
           

    render(){
      
        return (<>
            { (this.state.animal) && <>
                <button type="button" style={{width:"80px",margin:"20px"}} class="btn btn-success btn-sm" onClick ={()=> {this.props.afficher();console.log("rje3")} }>retour</button>
             <h1 style={{color:"#ffff"}}>Détails de l'animal</h1>
             <hr style={{border: ".5px solid white"}}/>
            <div class="grid-container" style={style}>
            <div class="grid-item">
            <h3 style={{color:"#ffff"}}>Information sur l'animal</h3>
            <hr style={{border: ".2px solid white"}}/>
            <div style={{margin: "15px",color:"white"}}>
            
            <div  >
                <strong> Id Animal</strong> : {this.state.animal.id_ann}
                
              </div>
            <div>
                <strong> sexe</strong> : {this.state.animal.gender}
                
              </div>
            <div>
                <strong> date de naissance </strong> : {this.state.animal.date_birth}
                
              </div>
            <div>
                <strong> race</strong> : {this.state.animal.race}
                
              </div>
              <div>
                <strong> Sous famille</strong> : {this.state.animal.sous_famille} 
                
              </div>
              <div>
                <strong> prix d'achat</strong> : {this.state.animal.prix} dh
                
              </div>
              <div>
                <strong> statut</strong> : {this.state.animal.note} 
                
              </div>
              
            </div>
            <AddTraitement id={this.state.animal.id_ann} />
            </div>
            <div class="grid-item">
                 
                 <img
                 style={{width:"100%", height: "auto",}}
                 src={"http://localhost:3001/uploads/1628505205753.jpg" } 
                alt=" hello"/>
         
          
            </div>

            </div>
            <h2 style={{color:"#ffff",textAlign: "center"}} > Historique des traitement</h2>
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