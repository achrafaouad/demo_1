import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourcexyz from "ol/source/XYZ";
import VectorSource from "ol/source/Vector";
import olVectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";
import Popup from "./popupAddAnimal";
import Alimantation from "./alimentation";
import AnimalTable from "./animalTable";
import Modifier from "./Modifier";
import ModifierPersonnel from "./ModifierPersonnel";
import ModifierMateriel from "./ModifierMateriel";
const style = {
    display: "grid",
    gridTemplateColumns: "50%  50%"}

class MaterielPage extends Component{
    constructor(props){
        super(props);

        if(this.props.exploitation){
            var choosen = this.props.exploitation
    
            this.state={choosen:choosen }
        }
        
        


    }
    

    
    

   
    

    render(){
        return (<>
            
                <button type="button" style={{width:"80px",margin:"20px"}} class="btn btn-success btn-sm" onClick ={()=> this.props.retour()}>retour</button>
             <h1 style={{color:"#ffff"}}>Détails de l'exploitation</h1>
             <hr style={{border: ".5px solid white"}}/>
            <div class="grid-container" style={style}>
            <div className="grid-item">
            
            <div style={{margin: "15px",color:"black", width:"100%"}} className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
            <h3 style={{color:"#434c5e"}}>Information du Materiel</h3>
            <hr style={{border: ".2px solid white"}}/>
            <div  >
                <strong> Nom</strong> : {(!this.state.choosen.nom)?"-":this.state.choosen.nom}
                
              </div>
            <div>
                <strong> Description</strong> : {(!this.state.choosen.description)?"-":this.state.choosen.description}
                
              </div>
            <div>
                <strong> Model</strong> : {(!this.state.choosen.model)?"-":this.state.choosen.model}
                
              </div>
            <div>
                <strong> Immatriculation</strong> : {(!this.state.choosen.immatriculation)?"-":this.state.choosen.immatriculation}
                
              </div>
            
            <div>
                <strong> Fabriquant</strong> : {(!this.state.choosen.fabriquant)?"-":this.state.choosen.fabriquant}
                
              </div>
             
              <div>
                <strong> dernière controle technique </strong> : {(!this.state.choosen.derniere_controle_tec)?"-":this.state.choosen.derniere_controle_tec} 
              </div>
              <div>
                <strong> dernière assurence</strong> : {(!this.state.choosen.derniere_assurence)?"-":this.state.choosen.derniere_assurence}
              </div>
              
              <div>
                <strong> N° d'Enregistrement</strong> : {(!this.state.choosen.n_enregistrement)?"-":this.state.choosen.n_enregistrement}
              </div>
              <div>
                <strong>Prix de location par heure</strong> : {(!this.state.choosen.prix_hr)?"-":this.state.choosen.prix_hr} dh
              </div>
              <div>
                <strong>Propriétaire</strong> : {(!this.state.choosen.propriétaire)?"-":this.state.choosen.propriétaire}
              </div>
             
              
              

            </div>
            <div style={{display: "flex"}}>
            <ModifierMateriel id={this.state.choosen.id_exploitation} expl={this.state.choosen}/>
            <button type="button" style={{width:"80px" , marginLeft:"10px"}} class="btn btn-success btn-sm">suprimer</button>
            </div>
            </div>
            <div class="grid-item">
                  <div className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
                  <img
                 style={{width:"100%", height: "auto",}}
                 src={"http://localhost:3001/uploads/1628505205753.jpg" } 
                alt=" hello"/>
                  </div>

              </div>
            </div>
            
            
            
        </>)
    }
}

export default MaterielPage;