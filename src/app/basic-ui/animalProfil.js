import React, { Component } from "react";

const style = {
    display: "grid",
    gridTemplateColumns: "50%  50%"}

class AnimalProfil extends Component{
    constructor(props){
        super(props);
        this.choosen = this.props.animal
        

        

    }
    

    async fetch_data() {

        fetch("http://localhost:3001/getFoncierDisposé", {
            method: "POST",
            body: {id:50},
          })
            .then(
              (response) => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error("request failed");
              },
              (networkError) => console.log(networkError)
            )
            .then((responseJson) => {
              console.log(responseJson);
              this.setState({ src: responseJson });
            });
        }

       
      
      
        // let jsonData = JSON.parse(geometry)
        // jsonData["crs"] = {"type":"name","properties":{"name":"EPSG:3857"}}
        
      
    
        
        
           

    render(){
        return (<>
            { (this.state.choosen) && <>
                <button type="button" style={{width:"80px",margin:"20px"}} class="btn btn-success btn-sm" onClick ={()=> this.props.retour()}>retour</button>
             <h1 style={{color:"#ffff"}}>Détails de l'exploitation</h1>
             <hr style={{border: ".5px solid white"}}/>
            <div class="grid-container" style={style}>
            <div class="grid-item">
            <h3 style={{color:"#ffff"}}>Information sur la parcelle</h3>
            <hr style={{border: ".2px solid white"}}/>
            <div style={{margin: "15px",color:"white"}}>
            
            <div  >
                <strong> Id Animal</strong> : {this.state.choosen.nom}
                
              </div>
            <div>
                <strong> sexe</strong> : {this.state.choosen.date_exploitation}
                
              </div>
            <div>
                <strong> date de naissance </strong> : {this.state.choosen.note}
                
              </div>
            <div>
                <strong> race</strong> : {String(this.state.choosen.batiment)}
                
              </div>
              <div>
                <strong> Sous famille</strong> : {this.state.choosen.surface} ha
                
              </div>
              <div>
                <strong> prix d'achat</strong> : {this.state.choosen.surface} ha
                
              </div>
              <div>
                <strong> statut</strong> : {this.state.choosen.surface} ha
                
              </div>
              
            </div>
            </div>
            <div class="grid-item">
                 <img src={"www.localost.."}/>
         
          
            </div>
            </div>
            </>}
        </>)
    }
}

export default AnimalProfil;