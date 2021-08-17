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
const style = {
    display: "grid",
    gridTemplateColumns: "50%  50%"}

class PersonnelPage extends Component{
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
            <h3 style={{color:"#434c5e"}}>Information du Personnel</h3>
            <hr style={{border: ".2px solid white"}}/>
            <div  >
                <strong> Nom</strong> : {(!this.state.choosen.nom)?"-":this.state.choosen.nom}
                
              </div>
            <div>
                <strong> Adress</strong> : {(!this.state.choosen.adress)?"-":this.state.choosen.adress}
                
              </div>
            <div>
                <strong> Ville</strong> : {(!this.state.choosen.ville)?"-":this.state.choosen.ville}
                
              </div>
            <div>
                <strong> CIN</strong> : {(!this.state.choosen.cin)?"-":this.state.choosen.cin}
                
              </div>
            
            <div>
                <strong> Pays</strong> : {(!this.state.choosen.pays)?"-":this.state.choosen.pays}
                
              </div>
              <div>
                <strong> salaire (jour)</strong> : {(!this.state.choosen.salaire_jr)?"-":this.state.choosen.salaire_jr} dh
              </div>
              <div>
                <strong> salaire (mois)</strong> : {(!this.state.choosen.salaire_mois)?"-":this.state.choosen.salaire_mois} dh
              </div>
              <div>
                <strong> N° de TVA</strong> : {(!this.state.choosen.tva)?"-":this.state.choosen.tva}
              </div>
              <div>
                <strong> Type</strong> : {(!this.state.choosen.type)?"-":this.state.choosen.type}
              </div>
              <div>
                <strong> Niveau de qualification</strong> : {(!this.state.choosen.niveau_qualification)?"-":this.state.choosen.niveau_qualification}
              </div>
              <div>
                <strong> N° Certiphyto</strong> : {(!this.state.choosen.certiphyto)?"-":this.state.choosen.certiphyto}
              </div>
              <div>
                <strong>Est un conseiller</strong> : {(!this.state.choosen.conseiller)?"-":this.state.choosen.conseiller}
              </div>
              <div>
                <strong>Email</strong> : {(!this.state.choosen.email)?"-":this.state.choosen.email}
              </div>
              <div>
                <strong>Téléphone</strong> : {(!this.state.choosen.téléphone)?"-":this.state.choosen.téléphone}
              </div>
              <div>
                <strong>Code INSEE</strong> : {(!this.state.choosen.code_insee)?"-":this.state.choosen.code_insee}
              </div>
              
              <div>
                <strong>Notes</strong> : {(!this.state.choosen.note)?"-":this.state.choosen.note}
              </div>
              
              

            </div>
            <div style={{display: "flex"}}>
            <ModifierPersonnel id={this.state.choosen.id_exploitation} expl={this.state.choosen}/>
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

export default PersonnelPage;