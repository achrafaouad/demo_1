import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { DatePicker, Radio } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const { TextArea } = Input;



const Mouvement = [ 
  { label: "Achat", value: "Achat" },
  { label: "Vente", value: "Vente" }
];
const Exploitation = [ 
  { label: "Animal", value: "Animal" },
  { label: "Végétal", value: "Végétal" }
];

class AddMouvement extends Component {
  constructor(props) {
    super(props);
    this.state = {Mouvement:'Achat' , Exploitation:'Végétal'};
    this.handleChange = this.handleChange.bind(this);
    this.onSUBMIT = this.onSUBMIT.bind(this);
    this.handlechange1 = this.handlechange1.bind(this);
    this.handlechangement = this.handlechangement.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.handleChange_value = this.handleChange_value.bind(this);
    this.handleChange_valueAliment = this.handleChange_valueAliment.bind(this);
    this.optionProduit()
  }

  handlechangement(e){
  console.log(e.target.value)
  this.setState({"unité":e.target.value}) }


  
  handlechange1({target}){

    console.log("ello");
    this.setState({
      [target.name]: target.value
    });
    console.log(this.state);
    
  } 
  onChangeDate(date, dateString) {
    console.log(date, dateString);
    this.setState({ date: dateString });
  }

  handleChange(e) {
    console.log(e.target.value);
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }
  
  onSUBMIT(e) {
    e.preventDefault();
    var test = false
    if(!this.state.quantite){
      toast.error('Ajouter une quantité !!' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
      test = true;
    }
    console.log("hello hello",this.state.id_aliment ,this.state.id_prod)

    if(this.state.id_aliment && !this.state.id_prod ){
      toast.error('il faut choisir un produit  !!' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
      test = true;
    }

   if(!test){var typo = this.state.Mouvement==='Achat'?"Entrant":"Sortant"
   console.log("typo",typo)
      fetch("http://localhost:3001/handleMouvement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
         type:typo,
         id_prod:this.state.id_prod,
         quantite:this.state.quantite,
         n_facture:this.state.n_facture,
         numéro_de_lot:this.state.numéro_de_lot,
         client:this.state.client,
         note:this.state.note,
         currentStock:this.state.currentStock,
         nom:this.state.nom,
         Mouvement:this.state.Mouvement,
         id_aliment:this.state.id_aliment,
         Exploitation:this.state.Exploitation,
         date:this.state.date,
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
        .then(responseJson =>{
          console.log(responseJson.data);
          toast.success('le mouvement de stock a été bien effectué. ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
        }
         );
        this.props.reafficher()
      e.preventDefault();}
    
  }

  async optionProduit(){
    this.data1 = await fetch("http://localhost:3001/getSemence",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        id_exp:JSON.parse(sessionStorage.getItem('user')).id 
      })
 }).then(response2 =>{
       if(response2.ok){
         return response2.json();
       }
       throw new Error('request failed');}, networkError => console.log(networkError))
       .then( responseJson2 =>{
         return responseJson2
        })



    this.data2 =await fetch("http://localhost:3001/getEngrais",{
                  method:'POST',
                  headers:{'Content-Type':"application/json"},
                  body:JSON.stringify({
                    id_exp:JSON.parse(sessionStorage.getItem('user')).id 
                  })
             }).then(response2 =>{
                   if(response2.ok){
                     return response2.json();
                   }
                   throw new Error('request failed');}, networkError => console.log(networkError))
                   .then( responseJson2 =>{
                     return responseJson2
                    })

    this.data3 = await fetch("http://localhost:3001/getPhyto",{
          method:'POST',
          headers:{'Content-Type':"application/json"},
          body:JSON.stringify({
            id_exp:JSON.parse(sessionStorage.getItem('user')).id 
          })
     }).then(response2 =>{
           if(response2.ok){
             return response2.json();
           }
           throw new Error('request failed');}, networkError => console.log(networkError))
           .then( responseJson2 =>{
             return responseJson2
            })

            
        this.data = [...this.data1,...this.data2,...this.data3]
    
         this.setState({Produit:this.data})

         await fetch("http://localhost:3001/getRecolte",{
          method:'POST',
          headers:{'Content-Type':"application/json"},
          body:JSON.stringify({
            id_exp:JSON.parse(sessionStorage.getItem('user')).id 
          })
     }).then(response2 =>{
   if(response2.ok){
     return response2.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then( responseJson2 =>{
     this.setState({stock:responseJson2}) 
    })

        this.data = await fetch("http://localhost:3001/get_aliment1",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        id_exp:JSON.parse(sessionStorage.getItem('user')).id 
      })
 }).then(response2 =>{
        if(response2.ok){
          return response2.json();
        }
        throw new Error('request failed');}, networkError => console.log(networkError))
        .then( responseJson2 =>{
          return responseJson2

         })
           
           this.setState({dataAliment:this.data})  


           this.data12 = await fetch("http://localhost:3001/getProduit12",{
              method:'POST',
              headers:{'Content-Type':"application/json"},
              body:JSON.stringify({
                id_exp:JSON.parse(sessionStorage.getItem('user')).id
              })
         }).then(response2 =>{
               if(response2.ok){
                 return response2.json();
               }
               throw new Error('request failed');}, networkError => console.log(networkError))
               .then( responseJson2 =>{
                 return responseJson2
                })
                console.log('data anim',this.data12)
                this.setState({dataPrAnimal:this.data12}) 
            
               
        
}


handleChange_value(e){
    console.log(e.target.value)
    this.setState({id_prod:JSON.parse(e.target.value).id_prod , currentStock :JSON.parse(e.target.value).quantité,nom:JSON.parse(e.target.value).nom})
}
handleChange_valueAliment(e){
    console.log(e.target.value)
    this.setState({id_aliment:JSON.parse(e.target.value).id_aliment , currentStock :JSON.parse(e.target.value).quantite,nom:JSON.parse(e.target.value).nom})
}

  render() {
    
    if(this.state.Produit){
        var lolo = this.state.Produit.map((e, key) => {
         return <option key={e.id_prod} value={JSON.stringify(e)}>{e.nom}</option>;
         })
     }
    if(this.state.dataPrAnimal){
        var loloAnimal = this.state.dataPrAnimal.map((e, key) => {
         return <option key={e.id_prod} value={JSON.stringify(e)}>{e.nom}</option>;
         })
     }
    if(this.state.stock){
        var lolo1Stock = this.state.stock.map((e, key) => {
         return <option key={e.id_prod} value={JSON.stringify(e)}>{e.nom}</option>;
         })
     }

    if(this.state.dataAliment){
        var lolo1Aliment = this.state.dataAliment.map((e, key) => {
         return <option key={e.id_aliment} value={JSON.stringify(e)}>{e.nom}</option>;
         })
     }

    
    return (
      <div>
        <div
          className=" heading text-center addTra"
          style={{ height: "120px" }}
        >
          {" "}
          Créer un nouveau mouvement de stock
        </div>
        <div className="grid">
          <form className="myForm" >

          <div class="mb-3">
              <label for="Propriété" class="form-label">
              Mouvement
              </label>{" "}
              <br />
              <Radio.Group
                options={Mouvement}
                name="Mouvement"
                onChange={this.handlechange1}
                value={this.state.Mouvement}
                optionType="button"
                buttonStyle="solid"
                />
            </div> 
           

            <div
                  id="date-picker-example"
                  class="md-form md-outline input-with-post-icon datepicker"
                >
                  <label for="example">Date</label> <br />
                  <DatePicker onChange={this.onChangeDate} />
                </div>

                <div class="mb-3">
              <label for="Propriété" class="form-label">
              Exploitation
              </label>{" "}
              <br />

              <Radio.Group
                options={Exploitation}
                name="Exploitation"
                onChange={this.handlechange1}
                value={this.state.Exploitation}
                optionType="button"
                buttonStyle="solid"
                />
            </div>

                
        {((this.state.Mouvement ==='Achat' && this.state.Exploitation ==='Végétal')|| (this.state.Mouvement ==='Vente')) && <>
        <p>Produit</p>
        <select class="form-select" aria-label="Default select example" onChange={this.handleChange_value} style={{color:"black"}}>
        <option defaultValue>choisie Votre Produit</option>
        
        {(this.state.Mouvement ==='Achat' && this.state.Exploitation ==='Végétal') && lolo}
        
        {(this.state.Mouvement ==='Vente'  && this.state.Exploitation ==='Végétal') && lolo1Stock}
        {(this.state.Mouvement ==='Vente'  && this.state.Exploitation ==='Animal') && loloAnimal}
        
        </select></>}

        { (this.state.Mouvement ==='Achat' && this.state.Exploitation ==='Animal') && <>
        <p>Produit</p>
        <select class="form-select" aria-label="Default select example" onChange={this.handleChange_valueAliment} style={{color:"black"}}>
        <option defaultValue>choisie Votre Produit</option>
      
        {(this.state.Mouvement ==='Achat' && this.state.Exploitation ==='Animal') && lolo1Aliment}
        
        
        </select> </>}
        <br/>



            <div class="mb-3">
              <label for="Nom" class="form-label">
                Quantité
              </label>
              <input
                type="Number"
                class="form-control"
                id="Nom"
                name="quantite"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="emailHelp" class="form-text">
                Ajouter la Quantité de votre Produit
              </div>
            </div>

            <div class="mb-3">
              <label for="Nom" class="form-label">
              N° de facture
              </label>
              <input
                type="text"
                class="form-control"
                id="Nom"
                name="n_facture"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="emailHelp" class="form-text">
                Ajouter la N° de facture
              </div>
            </div>
            
            
            <div class="mb-3">
              <label for="Nom" class="form-label">
              Numéro de lot
              </label>
              <input
                type="text"
                class="form-control"
                id="Nom"
                name="numéro_de_lot"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="emailHelp" class="form-text">
                Ajouter un Numéro de lot
              </div>
            </div>
            { (this.state.Mouvement == "Vente") && <><div class="mb-3">
              <label for="Nom" class="form-label">
              client
              </label>
              <input
                type="text"
                class="form-control"
                id="Nom"
                name="client"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="emailHelp" class="form-text">
                Ajouter un Numéro de lot
              </div>
            </div>
            </>
}
            <p>Note</p>
    <TextArea rows={2} name="note" onChange={this.handlechange1} />

   


           
                
            
            <button type="submit" class="btn btn-success" onClick={ this.onSUBMIT}>
              Sauvegarder
            </button>
            <button class="btn ">Annuler</button>
          </form>
        </div>
        {/* {(this.state.src) && <img src={"http://localhost:3001/"+this.state.src} style={{width:"250px",height:"auto"}}/>} */}
      </div>
    );
  }
}

export default AddMouvement;
