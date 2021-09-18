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
import  "./StyleResp.css";
import { IoMdArrowRoundBack } from "react-icons/io";


const style = {
    display: "grid",
    gridTemplateColumns: "50%  50%"}

class PersonnelPage extends Component{
    constructor(props){
        super(props);

        if(this.props.exploitation){
            var choosen = this.props.exploitation
    
            this.state={choosen:choosen }

            if(this.state.choosen.image) this.src = 'http://localhost:3001/' + this.state.choosen.image
            else this.src = 'https://media.istockphoto.com/photos/farmer-in-a-soybean-field-agricultural-concept-picture-id1158664559?k=20&m=1158664559&s=612x612&w=0&h=m3QOA7KCz_KYlKsiA4Dc4uA-Lp-uKUdRO3LWnOE3rgg='

        }
        
        


    }
    

    
    

   
    

    render(){
        return (<>
            
                <button type="button" style={{width:"80px",margin:"20px"}} class="btn btn-sm" onClick ={()=> this.props.retour()}><IoMdArrowRoundBack color="#783ee3" size="2rem"/></button>
             <h1 style={{color:"#ffff" , textAlign:"center"}}>Détails du Personnel</h1>
             <hr class="style18"/>




            <div class="container">
           <div class="row">

           <div class="col-sm">
                  <div style={{display: "flex", justifyContent: "center"}}>
                  <img
                 style={{width:"50%", height: "auto", borderRadius: "10px" , boxShadow: "5px 5px 5px"}}
                 src={this.src } 
                alt=" hello"/>
                </div>
              </div>




           <div class="col-sm">
            <div style={{color:"black", width:"96%"}} className=" tc grow bg-near-white br3 pa3 ma2 dib bw2 shadow-5">
            <h3 style={{color:"#434c5e"}}>Information du Personnel</h3>
            <hr class="style18"/>
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
                <strong> salaire (heure)</strong> : {(!this.state.choosen.salaire_hr)?"-":this.state.choosen.salaire_hr} dh
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
                </div>


                

            </div>

            
            
            <div class="container">
              <div class="row">

              
                      <div  class="col-sm" style={{width:"100%", margin:'10px'}}>
                      <ModifierPersonnel id={this.state.choosen.id_exploitation} expl={this.state.choosen}/>
                      </div>
                      
                     <div class="col-sm" style={{width:"100%", margin:'10px'}}> <button type="button" class="btn btn-danger btn-lg btn-block">suprimer</button>
                     </div>
                  
                  </div>
            </div>
            
            
            
            </div>

           

        </>)
    }
}

export default PersonnelPage;