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
import  "./StyleResp.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { suppressDeprecationWarnings } from "moment";
import Delete from "./suprimer";

const style = {
    display: "grid",
    gridTemplateColumns: "50%  50%"}


class MaterielPage extends Component{
    constructor(props){
        super(props);

        if(this.props.exploitation){
            var choosen = this.props.exploitation
    
            this.state={choosen:choosen }

            if(this.state.choosen.image) this.src = 'http://localhost:3001/' + this.state.choosen.image
            else this.src = 'https://st.mascus.com/imagetilewm/product/2b3bf478/john-deere-6120-r,a859601e.jpg'

        }


        this.retour = this.retour.bind(this)
        
          

    }
    

    
    retour(){
      this.props.retour()
    }

   
    

    render(){
        return (<>
            
                <button type="button" style={{width:"80px",margin:"20px"}} class="btn btn-sm" onClick ={()=> this.props.retour()}><IoMdArrowRoundBack color="#783ee3" size="2rem"/></button>
                <h1 className="MyResult" style={{color:"#ffff" ,fontSize:"40px", textAlign:"center"}}>Détails du Machine</h1>
                <hr class="style18"/>

                
                <div class="container">
           <div class="row">

           <div class="col-sm">
                    <div className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
                    <img
                  style={{width:"100%", height: "auto",}}
                  src={this.src} 
                  alt=" hello"/>
                    </div>

           </div>

               <div class="col-sm" >
            
                    <div style = {{width:"96%"}} className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
                      <div  style={{color:"black"}}   >
                    <h3 style={{color:"#434c5e" }}>Information du Machine</h3>
                    <hr class="style18"/>
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
                        <strong>Prix de travail par heure</strong> : {(!this.state.choosen.prix_hr)?"-":this.state.choosen.prix_hr} dh
                      </div>
                      <div>
                        <strong>Propriétaire</strong> : {(!this.state.choosen.propriétaire)?"-":this.state.choosen.propriétaire}
                      </div>
                    
              
              

                </div>
                </div>
               


            </div>
            <div class="container">
              <div class="row">
              <div class="col-sm" style={{width:"100%", margin:'10px'}}>
                <ModifierMateriel id={this.state.choosen.id_exploitation} expl={this.state.choosen} />
                </div>
                <div class="col-sm" style={{width:"100%", margin:'10px'}}>
                <Delete id={this.state.choosen.id_exploitation} expl={this.state.choosen} retour = {this.retour} option = "Materiel"/>
                </div>
                </div>
                </div>


            


            </div>

           
            </div>
            
            
            
        </>)
    }
}

export default MaterielPage;