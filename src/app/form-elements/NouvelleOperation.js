import React, { Component } from "react";
import { BsBriefcaseFill, BsLayersHalf,BsFillPersonFill,BsDropletFill,BsFillAlarmFill,BsFillBucketFill,BsFillCalendarFill } from "react-icons/bs";
import { MdDirectionsRailway,MdLocalFlorist } from "react-icons/md";
import { BiCart } from "react-icons/bi";
import './Style.css'
import { DatePicker, Divider, Radio } from "antd";
import PopupTrav from "./listDesTraveauxPop";
import PopupPArc from "./listDesParcellesPop";
import PopupPers from "./listDesPersonnel";
import PopupMat from "./ListDesMateriel";
import PopupDure from "./Duré";
import { Input } from 'antd';
import 'antd/dist/antd.css';
import PopupEngrais from "./PopupEngrais";
import PopupRecolte from "./RecoltePopup";
import PopupSemece from "./PopupSemence";
import PopupPhyto from "./PopupPhyto"
const { TextArea } = Input;
const bati = [ 
  { label: "LOCATION", value: "LOCATION" },
  { label: "PROPRIÉTAIRE", value: "PROPRIÉTAIRE" }
];


class NouvelleOperation extends Component {
  constructor(props) {
    
    super(props);
    this.state = {};
    this.sommeN = 0;
    this.onChangeAchat = this.onChangeAchat.bind(this);
    this.onChangeControl = this.onChangeControl.bind(this);
    this.onChangeAssurance = this.onChangeAssurance.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileChange = this.fileChange.bind(this);
    this.onSUBMIT = this.onSUBMIT.bind(this);
    this.handlechange1 = this.handlechange1.bind(this);
    this.listof = this.listof.bind(this);
    this.listofDnem = this.listofDnem.bind(this)
    this.ListPers = this.ListPers.bind(this)
    this.ListMat = this.ListMat.bind(this)
    this.hour = this.hour.bind(this)
    this.min = this.min.bind(this)
    this.ListEngrais = this.ListEngrais.bind(this)
    this.ListVal = this.ListVal.bind(this)
    this.quanitity = this.quanitity.bind(this)
    this.id_recolte = this.id_recolte.bind(this)
    this.SumQRecolt = this.SumQRecolt.bind(this)
    this.ListSemence = this.ListSemence.bind(this)
    this.ListValues = this.ListValues.bind(this)
    this.ListPhyto = this.ListPhyto.bind(this)
    this.handlechangeNote = this.handlechangeNote.bind(this)
    this.calcule_somme = this.calcule_somme.bind(this)
    
    this.ListValuesPhyto = this.ListValuesPhyto.bind(this)
    this.listPersRender = this.listPersRender.bind(this)

  }

  onChangeControl(date, dateString) {
    console.log(date, dateString);
    this.setState({ date_application: dateString });
  }
  onChangeAssurance(date, dateString) {
    console.log(date, dateString);
    this.setState({ derniere_assurence: dateString });
  }
  onChangeAchat(date, dateString) {
    console.log(date, dateString);
    this.setState({ date_achat: dateString });
  }
  
  handlechange1({target}){
    console.log("ello");
    this.setState({
      [target.name]: target.value
    });
    console.log(this.state);
  } 

  handlechangeNote({target}){
    console.log("ello");
    this.setState({
      [target.name]: target.value
    });
    console.log(this.state);
  } 
  handleChange(e) {
    console.log(e.target.value);
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }
  fileChange(e) {
    this.setState({ myFile: e.target.files[0] });
    console.log(e.target.files[0]);
    this.forceUpdate();
  }
  
  onSUBMIT(e) {
    e.preventDefault();
    if(this.state.valP)
    {this.id_exploitations = this.state.valP.map((element)=>{
      return Number(element.split(',')[1])
    })}
    console.log('ha les parcels', this.idparcels)
// produits
    this.qunatite = [];
    this.produitaUpdate = [];
    this.QuantityUpdate = [];
    this.currentQuantity = [];
    this.currentQuantityE = [];
    this.currentQuantityPH = [];
    this.currentQuantitySEM = [];
    this.Names = []
    this.nomDesproductsEng=[];
    this.nomDesproductsPh=[];
    this.nomDesproductsSEM=[];

    if(this.state.sd){
      this.listEngraiss = this.state.sd.map((element)=>{
        return Number(element.split(',')[2])
      })
      this.currentQuantityE = this.state.sd.map((element)=>{
        return Number(element.split(',')[3])
      })
      this.nomDesproductsEng = this.state.sd.map((element)=>{
        return element.split(',')[0]
      })
      for(let i= 0; i< this.state.Values.length;i++){
         this.qunatite.push(this.state.Values[i])
         this.QuantityUpdate.push(this.state.Values[i])
      }
    }


    console.log('ha les parcels', this.listEngraiss)
   
    if(this.state.phyto){
      this.listphyto = this.state.phyto.map((element)=>{
        return Number(element.split(',')[2])
      })

      this.currentQuantityPH = this.state.phyto.map((element)=>{
        return Number(element.split(',')[3])
      })
      
      this.nomDesproductsPh = this.state.phyto.map((element)=>{
        return element.split(',')[0]
      })
      for(let i= 0; i< this.state.ListValuesPhyto.length;i++){
        this.qunatite.push(this.state.ListValuesPhyto[i])
        this.QuantityUpdate.push(this.state.ListValuesPhyto[i])
     }
    }


    console.log('ha les parcels', this.listphyto)
   
    if(this.state.sem){
      this.listSemence = this.state.sem.map((element)=>{
        return Number(element.split(',')[2])
      })
      this.currentQuantitySEM = this.state.sem.map((element)=>{
        return Number(element.split(',')[3])
      })
      this.nomDesproductsSEM = this.state.sem.map((element)=>{
        return  element.split(',')[0]
      })


      for(let i= 0; i< this.state.ValueSem.length;i++){
        this.qunatite.push(this.state.ValueSem[i])
        this.QuantityUpdate.push(this.state.ValueSem[i])
     }
    }

    if(this.state.quanitity){
      
        this.qunatite.push(this.state.quanitity)
     
    }


    console.log('ha les parcels', this.listSemence)

    if(this.listEngraiss && (!this.listphyto) && (!this.listSemence) && (!this.state.id_prod)){
      this.produits = [...this.listEngraiss]
      this.produitaUpdate = [...this.listEngraiss]
      this.currentQuantity = [...this.currentQuantityE]
      this.Names = [...this.nomDesproductsEng]
    }


    else if(this.listphyto && (!this.listEngraiss) && (!this.listSemence) && (!this.state.id_prod)){
      this.produits = [...this.listphyto]
      this.produitaUpdate = [...this.listphyto]
      this.currentQuantity = [...this.currentQuantityPH]
      this.Names = [...this.nomDesproductsPh]
      
    }
    else if(this.listSemence && (!this.listEngraiss) && (!this.listphyto) && (!this.state.id_prod)){
      this.produits = [...this.listSemence]
      this.produitaUpdate = [...this.listSemence]
      this.currentQuantity = [...this.currentQuantitySEM]
      this.Names = [...this.nomDesproductsSEM]
    }

    else if(this.state.id_prod && (!this.listEngraiss) && (!this.listphyto) && (!this.listSemence)){
      this.produits = [this.state.id_prod]
    }


    else if(this.listEngraiss && this.listphyto && (!this.listSemence)&& (!this.state.id_prod)){
        this.produits = [...this.listEngraiss,...this.listphyto]
        this.produitaUpdate = [...this.listEngraiss,...this.listphyto]
        this.currentQuantity = [...this.currentQuantityE,...this.currentQuantityPH]
        this.Names = [...this.nomDesproductsEng,...this.nomDesproductsPh]
    }
    else if(this.listEngraiss && this.listSemence && (!this.listphyto)&& (!this.state.id_prod)){
        this.produits = [...this.listEngraiss,...this.listSemence]
        this.produitaUpdate = [...this.listEngraiss,...this.listSemence]
        this.currentQuantity = [...this.currentQuantityE,...this.currentQuantitySEM]
        this.Names = [...this.nomDesproductsEng,...this.nomDesproductsSEM]
    }
    else if(this.listEngraiss && this.state.id_prod && (!this.listphyto)&& (!this.listSemence)){
        this.produits = [...this.listEngraiss,...[this.state.id_prod]]
        this.produitaUpdate = [...this.listEngraiss]
        this.currentQuantity = [...this.currentQuantityE]
        this.Names = [...this.nomDesproductsEng]
    }
    else if(this.listphyto && this.listSemence && (!this.listEngraiss)&& (!this.state.id_prod)){
        this.produits = [...this.listphyto ,...this.listSemence]
        this.produitaUpdate = [...this.listphyto ,...this.listSemence]
        this.currentQuantity = [...this.currentQuantityPH,...this.currentQuantitySEM]
        this.Names = [...this.nomDesproductsPh,...this.nomDesproductsSEM]
    }
    else if(this.listphyto && this.state.id_prod && (!this.listEngraiss)&& (!this.listSemence)){
        this.produits = [...this.listphyto ,...[this.state.id_prod]]
        this.produitaUpdate = [...this.listphyto]
        this.currentQuantity = [...this.currentQuantityPH]
        this.Names = [...this.nomDesproductsPh]
    }
    else if(this.listSemence && this.state.id_prod && (!this.listphyto)&& (!this.listEngraiss)){
        this.produits = [...this.listSemence , ...[this.state.id_prod]]
        this.produitaUpdate = [...this.listSemence]
        this.currentQuantity = [...this.currentQuantitySEM]
        this.Names = [...this.nomDesproductsSEM]
    }



    else if(this.listSemence && this.state.id_prod && (this.listphyto)&& (!this.listEngraiss)){
        this.produits = [...this.listphyto ,...this.listSemence, ...[this.state.id_prod]]
        this.produitaUpdate = [...this.listphyto ,...this.listSemence]
        this.currentQuantity = [...this.currentQuantityPH,...this.currentQuantitySEM]
        this.Names = [...this.nomDesproductsPh,...this.nomDesproductsSEM]
    }
    else if(this.listSemence && this.state.id_prod && (this.listEngraiss)&& (!this.listphyto)){
        this.produits = [...this.listEngraiss ,...this.listSemence, ...[this.state.id_prod]]
        this.produitaUpdate = [...this.listEngraiss,...this.listSemence]
        this.currentQuantity = [...this.currentQuantityE,...this.currentQuantitySEM]
        this.Names = [...this.nomDesproductsEng,...this.nomDesproductsSEM]
    }

    else if(this.listSemence && this.listphyto && (this.listEngraiss)&& (!this.state.id_prod)){
        this.produits = [...this.listEngraiss, ...this.listphyto,...this.listSemence ]
        this.produitaUpdate = [...this.listEngraiss, ...this.listphyto,...this.listSemence ]
        this.currentQuantity = [...this.currentQuantityE,...this.currentQuantityPH,...this.currentQuantitySEM]
        this.Names = [...this.nomDesproductsEng,...this.nomDesproductsPh,...this.nomDesproductsSEM]
    }

    else if(this.listphyto && this.state.id_prod && (this.listEngraiss)&& (!this.listSemence)){
        this.produits = [...this.listEngraiss,...this.listphyto , ...[this.state.id_prod]]
        this.produitaUpdate = [...this.listEngraiss,...this.listphyto]
        this.currentQuantity = [...this.currentQuantityE,...this.currentQuantityPH]
        this.Names = [...this.nomDesproductsEng,...this.nomDesproductsPh]
    }



    if(this.listEngraiss && this.listphyto && this.listSemence && this.state.id_prod){
      this.produits = [...this.listEngraiss,...this.listphyto,...this.listSemence ,...[this.state.id_prod]]
      this.produitaUpdate = [...this.listEngraiss, ...this.listphyto,...this.listSemence ]
        this.currentQuantity = [...this.currentQuantityE,...this.currentQuantityPH,...this.currentQuantitySEM]
        this.Names = [...this.nomDesproductsEng,...this.nomDesproductsPh,...this.nomDesproductsSEM]
    }

    
    console.log('la list des produit est', this.produits)
   
    if(!this.state.hour && !this.state.min){
      this.dure = '00:00'
    }
    else if(this.state.hour && (!this.state.min)){
      this.dure = this.state.hour+':00'
    }
    else if(!this.state.hour && (this.state.min)){
      this.dure = "00:" + this.state.min
    }
    else if(this.state.hour && this.state.min){
      this.dure = this.state.hour + ':' + this.state.min
    }

    
     //personnel
    this.id_personnels = []
    if(this.state.DD){
      this.id_personnels = this.state.DD.map((element)=>{
        return Number(element.split(',')[2])
      })

    }

   
   // materiel
    this.id_materiels = []
    if(this.state.ss){
      this.id_materiels = this.state.ss.map((element)=>{
        return Number(element.split(',')[2])
      })

    }



   
      fetch("http://localhost:3001/add_operation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          duré:this.dure,
          note:this.state.note,
          prix_totale:this.state.sommeN,
          travaux: this.state.listof,
          id_exp:JSON.parse(sessionStorage.getItem('user')).id 
        }),
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
          console.log(responseJson.data);
          this.setState({id_operation:responseJson.data})

          //seceomnd
          fetch("http://localhost:3001/appliquer_operation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id_operation:responseJson.data,
              id_exploitations:this.id_exploitations,
              date_application:this.state.date_application
            }),
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
      
        })

        if(this.produits){

          fetch("http://localhost:3001/utilise_produit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id_operation:responseJson.data,
                  id_produits:this.produits,
                  quantite:this.qunatite
                }),
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
                  
             
                  
    
                  
            })
        }


        if(this.id_materiels){

          fetch("http://localhost:3001/besoin_materiel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id_operation:responseJson.data,
                  id_materiels:this.id_materiels,
                }),
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
                  
            })
        }

        if(this.id_personnels){

          fetch("http://localhost:3001/realise_travail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id_operation:responseJson.data,
                  id_personnels :this.id_personnels,
                }),
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
                  
            })
        }


        if(this.state.id_prod){
          fetch("http://localhost:3001/updateRecolte", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id_prod:this.state.id_prod,
                  quantité:this.state.SumQRecolt
                }),
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
                  
            })
        }

      //todo

        if(this.state.id_prod){
          fetch("http://localhost:3001/handleMouvement", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  nom:this.state.nomProdRecolt,
                  quantite:this.state.quanitity,
                  type:"Entrant",
                  Mouvement:"Opération",
                  date:this.state.date_application,
                  note:this.state.note,
                  id_exp:JSON.parse(sessionStorage.getItem('user')).id 
                }),
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
                  
            })
        }

        if(this.produitaUpdate){
          fetch("http://localhost:3001/updateProduit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id_produit:this.produitaUpdate,
                  QuantityUpdate:this.QuantityUpdate,
                  currentQuantity:this.currentQuantity
                }),
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
                  
            })
        }

        //todo
        if(this.produitaUpdate){
          fetch("http://localhost:3001/handleMouvementProduit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                   noms:this.Names,
                   qunatite:this.qunatite,
                   type:"Sortant",
                   Mouvement:"Opération",
                   date:this.state.date_application,
                   note:this.state.note,
                   id_exp:JSON.parse(sessionStorage.getItem('user')).id 
                }),
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
                  
            })
        }

          
    })
    
    
  
}

  
  listof(val){
    this.setState({listof:val})
    
  }

  componentDidMount(){

    
    const oneSecond = 500;

    this.intervalID = setInterval(() => {
        this.calcule_somme()
        console.log("didmount")
       
    }, oneSecond);
 }

 componentWillUnmount(){
    clearInterval(this.intervalID);
    
  }


  lista(){
    if(this.state.listof){
      return this.state.listof.map((st,index)=>{
        return <li key={index}> {st} </li>
      })
    }
  }


  listofDnem(val){
     let valeur = val
   
    this.setState({valP:valeur})
    
  }

  listRender(){
    if(this.state.valP){
      return this.state.valP.map((st,index)=>{
        return <li key={index}> {st} </li>
      })
    }
  }
  ListPers(val){
     let valeur = val
     
    this.setState({DD:valeur  })
  }

  listPersRender(){
    if(this.state.DD){
      return this.state.DD.map((st,index)=>{
        console.log("ha zeld l 9e7ba", st)


        return <li key={index}> {st.split(',')[0]} {st.split(',')[1]}  </li>
      })
    }
  }

  ListMat(val){
     let valeur = val
     
    this.setState({ss:valeur })
    
  }

  listMatRender(){
    console.log( "personnel",this.state)
    if(this.state.ss){

      return this.state.ss.map((st,index)=>{
        console.log("ha zeld l 9e7ba", st)
        return <li key={index}> {st.split(',')[0]} {st.split(',')[1]}  </li>
      })
    }
  }
//toDo
  hour(val1){
    this.setState({hour:val1})
    
  }
  min(val1){
    this.setState({min:val1})
  
  }

  

  ListEngrais(val){
    let valeur = val
   console.log("ha l valeur",val)
   this.setState({sd:valeur})
   
 }
  ListVal(val){
    let valeur = val
   console.log("ha l valeur",val)
   this.setState({Values:valeur})

   
 }

 listEngraisRender(){
   if(this.state.Values){
   if(this.state.sd){
     return this.state.sd.map((st,index)=>{
       return <li key={index}> {st.split(',')[0]} avec une quantité de {this.state.Values[index]} kg</li>
     })
   }
  }
 }

 ListSemence(val){
  let valeur = val
 console.log("ha l valeur",val)
 this.setState({sem:valeur})
 
}
ListValues(val){
  let valeur = val
 console.log("ha l valeur",val)
 this.setState({ValueSem:valeur})

 
}

listSemenceRender(){
 if(this.state.ValueSem){
 if(this.state.sem){
   return this.state.sem.map((st,index)=>{
     return <li key={index}> {st} avec une quantité de {this.state.ValueSem[index]} kg </li>
   })
 }
}
}


ListPhyto(val){
  let valeur = val
 console.log("ha l valeur",val)
 this.setState({phyto:valeur})
 
}
ListValuesPhyto(val){
  let valeur = val
 console.log("ha l valeur",val)
 this.setState({ListValuesPhyto:valeur})

}

listPhytoRender(){
 if(this.state.ListValuesPhyto){
 if(this.state.phyto){
   return this.state.phyto.map((st,index)=>{
     return <li key={index}> {st} avec une quantité de {this.state.ListValuesPhyto[index]} kg </li>
   })
 }
}
}

 quanitity(val){
  let valeur = val

 this.setState({quanitity:valeur})
 
}
SumQRecolt(val){
  let valeur = val

 this.setState({SumQRecolt:valeur})
 
}
id_recolte(val , val2){
  let id = val
  let nom = val2

 this.setState({id_prod:id , nomProdRecolt:nom})
 
}



listRecolteRender(){
  if(this.state.quanitity){
  

  
      return <li > {this.state.id_prod},{this.state.id_prod}, {this.state.SumQRecolt} Récolte avec une quantité de {this.state.quanitity} kg </li>
  
 }
}




calcule_somme(){

  this.somme = 0;
  this.sommeN = 0;
  

  if(this.state.DD){
    console.log('personnel' , this.state.hour)
    console.log('personnel' , this.sommeN)
    for(let i = 0 ; i< this.state.DD.length;i++){
      this.somme = this.somme+ Number(this.state.DD[i].split(',')[1])

    }
  }

  if(this.state.ss){
    

    for(let i = 0 ; i< this.state.ss.length;i++){
      this.somme = this.somme+ Number(this.state.ss[i].split(',')[1])

    }

  }

  if(this.state.Values){
    
    if(this.state.sd){
      for(let i = 0 ; i< this.state.sd.length;i++){
        this.somme = this.somme + (Number(this.state.sd[i].split(',')[1]) * Number(this.state.Values[i]))
  
      }
    }}

  if(this.state.ValueSem){
    if(this.state.sem){
      for(let i = 0 ; i< this.state.sem.length;i++){
        this.somme = this.somme + (Number(this.state.sem[i].split(',')[1]) * Number(this.state.ValueSem[i]))
  
      }
    }}

  if(this.state.ListValuesPhyto){
    if(this.state.phyto){

      for(let i = 0 ; i< this.state.ss.length;i++){
        this.somme = this.somme + (Number(this.state.phyto[i].split(',')[1]) * Number(this.state.phyto[i]))
  
      }
    }}



  if(this.state.quanitity){
    if(this.state.price){
        this.somme = this.somme+ (this.state.quanitity * this.state.price)
      
    }}


    
     
    
     if( this.state.hour && (!this.state.min)){

      this.somme =( this.somme * this.state.hour)
      console.log(this.state.hour , this.somme , 10*20)
    }
    else if ( (!this.state.hour) && (this.state.min))  this.somme = this.somme * (this.state.min/ 60)

    else if ( (this.state.hour) && (this.state.min))   this.somme = (this.somme * (this.state.hour + (this.state.min / 60)))
    else this.somme = this.somme *0
   

    this.setState({sommeN:this.somme})

    console.log("ha some",this.somme,this.sommeN )
    console.log("ha min",this.state.hour,this.state.min )
    console.log("ha noms",this.Names )

}
 

  render() {
    
    console.log(this.state)
    return (
      <div>
        <div
          className=" heading text-center addTra"
          style={{ height: "120px" }}
        >
          {" "}
          Nouvelle operation + {this.state.sommeN}
        </div>
        <div className="grid">
          <form className="myForm" >
            <div className=" mb-3 flex-container " >
              
                
             <div className='element'>
              <div htmlFor="Nom" className="form-label">
              <i className="icon-columns"><BsBriefcaseFill/></i> TRAVAUX
              </div>
              <div className="d-flex flex-row-reverse bd-highlight" >
              
                <PopupTrav listof = {this.listof} />
              </div>
              <ul>

                 {this.lista()}
              </ul>
              </div>

            </div>
            

            <div className='element'>
            <div
                  id="date-picker-example"
                  className=" mb-3"

                >
                  <div htmlFor="Nom" className="form-label">
              <i className="icon-columns"><BsFillCalendarFill/></i> Date de travail
              </div>
                  <DatePicker onChange={this.onChangeControl} />
                </div>
                </div>


                <div className='element'>
                <div htmlFor="Nom" className="form-label">
              <i><BsLayersHalf/></i> Parcelles
              </div>
              <div className="d-flex flex-row-reverse bd-highlight" >
              
                <PopupPArc listofDnem = {this.listofDnem} />
              </div>
              <ul>

                 {this.listRender()}
              </ul>
              </div>

              <div className='element'>
                <div htmlFor="Nom" className="form-label">
              <i><BsFillPersonFill/></i> Personnels
              </div>
              <div className="d-flex flex-row-reverse bd-highlight" >
              
                <PopupPers ListPers = {this.ListPers} />
              </div>
              <ul>

                 {this.listPersRender()}
              </ul>

              </div>

              <div className='element'>
                <div htmlFor="Nom" className="form-label">
              <i><MdDirectionsRailway/></i> Materiels
              </div>
              <div className="d-flex flex-row-reverse bd-highlight" >
              
                <PopupMat ListMat = {this.ListMat} />
              </div>
              <ul>

                 {this.listMatRender()}
              </ul>
              </div>
              
                { (this.state.listof && this.state.listof.includes('Fertiliser')) && <>
                <div className='element'>
                <div htmlFor="Nom" className="form-label">
              <i><BsFillBucketFill/></i> Engrais
              </div>
              <div className="d-flex flex-row-reverse bd-highlight" >
              
                <PopupEngrais  ListEngrais= {this.ListEngrais} ListVal={this.ListVal} />
              </div>
              <ul>

              {this.listEngraisRender()}
              </ul> </div> </>}
              

              
                {(this.state.listof && this.state.listof.includes('Moissonner ou Récolter'))&& <>
                <div className='element'>
                <div htmlFor="Nom" className="form-label">
              <i><BiCart/></i> Récolte
              </div>
              <div className="d-flex flex-row-reverse bd-highlight" >
              
                <PopupRecolte  quanitity= {this.quanitity} id_recolte={this.id_recolte}  SumQRecolt={this.SumQRecolt} />
              </div>
              <ul>

              {this.listRecolteRender()}
              </ul> </div> </>}
              
              
                {(this.state.listof && this.state.listof.includes('Semer ou Planter'))&& <> 
                <div className='element'>
                <div htmlFor="Nom" className="form-label">
              <i><MdLocalFlorist/></i> Semences/Plantes
              </div>
              <div className="d-flex flex-row-reverse bd-highlight" >
              
                <PopupSemece  ListSemence= {this.ListSemence} ListValues={this.ListValues} />
              </div>
              <ul>

              {this.listSemenceRender()}
              </ul> </div> </>}
              

              
                {(this.state.listof && (this.state.listof.includes('Traitement phytosanitaire') || this.state.listof.includes('Traitement non chimique') ))&& 
                <>
                <div className='element'>
                <div htmlFor="Nom" className="form-label">
              <i><BsDropletFill/></i> produits phytosanitaire
              </div>
              <div className="d-flex flex-row-reverse bd-highlight" >
              
                <PopupPhyto  ListPhyto= {this.ListPhyto} ListValuesPhyto={this.ListValuesPhyto} />
              </div>
              <ul>

              {this.listPhytoRender()}
              </ul>
              </div> </>}
              

              
              <div className='element'>
                <div htmlFor="Nom" className="form-label">
              <i><BsFillAlarmFill/></i> Duré
              </div>
              <div className="d-flex flex-row-reverse bd-highlight" >
              
                <PopupDure hour = {this.hour} min = {this.min} />
              </div>
              <ul>

                 {this.state.hour}H {this.state.min}min
              </ul>

              </div>


              <p>Note</p>
          <TextArea rows={2} name="note" value={this.state.note} onChange={this.handlechangeNote} />

   
            <button type="submit" className="btn btn-success" onClick={ this.onSUBMIT}>
              Sauvegarder
            </button>
            <button className="btn ">Annuler</button>
          </form>
        </div>
        {/* {(this.state.src) && <img src={"http://localhost:3001/"+this.state.src} style={{width:"250px",height:"auto"}}/>} */}
      </div>
    );
  }
}

export default NouvelleOperation;
