import React, { Component } from "react";
import { FaBeer } from 'react-icons/fa';
import 'antd/dist/antd.css';
import { DatePicker, Radio } from "antd";
const bati = [ 
  { label: "COÛT", value: "COÛT" },
  { label: "REVENU", value: "REVENU" }
];
const Dure = [ 
  { label: "1 AN", value: "1 AN" },
  { label: "PLUS DE 1 AN", value: "PLUS DE 1 AN" }
];

class ChartJs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChangeAchat = this.onChangeAchat.bind(this);
    this.onChangeControl = this.onChangeControl.bind(this);
    this.onChangeAssurance = this.onChangeAssurance.bind(this);
    this.onSUBMIT = this.onSUBMIT.bind(this);
    this.handlechange1 = this.handlechange1.bind(this);
    this.handleChange_value = this.handleChange_value.bind(this);
    this.optionExploitation()
    
  }

  onChangeControl(date, dateString) {
    console.log(date, dateString);
    this.setState({ derniere_controle_tec: dateString });
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

  

  onSUBMIT(e) {
    e.preventDefault();
    if (this.state.nom) {
      fetch("http://localhost:3001/add_materiel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: this.state.nom,
          description: this.state.description,
          fabriquant: this.state.fabriquant,
          model: this.state.model,
          date_achat: this.state.date_achat,
          derniere_assurence: this.state.derniere_assurence,
          derniere_controle_tec: this.state.derniere_controle_tec,
          prix_achat: this.state.prix_achat,
          immatriculation: this.state.immatriculation,
          immatriculation: this.state.immatriculation,
          n_enregistrement: this.state.n_enregistrement,
          prix_location_jour: this.state.prix_location_jour,
          Propriétaire: this.state.Propriétaire,
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
          if(this.state.myFile){
            const formdata = new FormData();
          formdata.append("materiel", this.state.myFile);
          formdata.append("id", responseJson.data);
          fetch("http://localhost:3001/upload", {
            method: "POST",
            body: formdata,
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
          
        });
        this.props.reafficher()
      e.preventDefault();
    }
  }

  async optionExploitation(){
    this.data = await fetch("http://localhost:3001/get_Exploitation").then(response2 =>{
        if(response2.ok){
          return response2.json();
        }
        throw new Error('request failed');}, networkError => console.log(networkError))
        .then( responseJson2 =>{
          return responseJson2

         })
         this.setState({exploitation:this.data})
         

}

handleChange_value(e){
  console.log(e.target.value)
  this.setState({id_exploitation:JSON.parse(e.target.value).id_exploitation})
}


  render() {
    if(this.state.exploitation){
      var lolo = this.state.exploitation.map((e, key) => {
       return <option style={{color:"black"}} key={e.id_exploitation} value={JSON.stringify(e)}>{e.nom}</option>;
       })
   }

    return (
      <div>
      <div className="row">
        <div className="col-lg-12 grid-margin">
          <div className="card">
        <div
          className=" heading text-center addTra"
          style={{ height: "120px" }}
        >
          {" "}
          Nouveau coût fixe
        </div>
        <div className="grid">
          <form className="myForm" >
          <div class="mb-3">
              <label for="Propriété" class="form-label">
              Type
              </label>{" "}
              <br />
              <Radio.Group
          options={bati}
          name="Type"
          onChange={this.handlechange1}
          value={this.state.Type}
          optionType="button"
          buttonStyle="solid"
        />
            </div>

            <div class="mb-3">

              <label for="Nom" class="form-label">
                Nom
              </label>
              
              <input
                type="text"
                class="form-control"
                id="Nom"
                name="nom"
                aria-describedby="emailHelp"
                onChange={this.handleChange1}
              />
              <div id="emailHelp" class="form-text">
                Ajouter le nom de ce coût
              </div>
            </div>

            <p>Exploitation</p>
        <select class="form-select" aria-label="Default select example" style={{color:"black"}} onChange={this.handleChange_value}>
        <option defaultValue>Choisie Votre Exploitation</option>
        
        {lolo}
        
        </select>
        <br/>

            <div
                  id="date-picker-example"
                  class="md-form md-outline input-with-post-icon datepicker"
                >
                  <label for="example">Date</label> <br />
                  <DatePicker onChange={this.onChangeControl} />
                </div>


            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
               Montant 
              </label>
              <input
                type="Number"
                class="form-control"
                name="Montant"
                id="exampleInputPassword1"
                onChange={this.handleChange1}
              />
            </div>

            <div class="mb-3">
              <label for="Propriété" class="form-label">
              Durée d'amortissement
              </label>{" "}
              <br />
              <Radio.Group
              options={Dure}
              name="amortissement_D"
              onChange={this.handlechange1}
              value={this.state.amortissement_D}
              optionType="button"
              buttonStyle="solid"
            />
            </div>
          
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
              Année d'amortissement 
              </label>
              <input
                type="Number"
                class="form-control"
                name="anneAmortisement"
                id="exampleInputPassword1"
                onChange={this.handleChange}
              />
            </div>


            
            <button type="submit" class="btn btn-success" onClick={ this.onSUBMIT}>
              Sauvegarder
            </button>
            <button class="btn ">Annuler</button>
          </form>
        </div>
        {/* {(this.state.src) && <img src={"http://localhost:3001/"+this.state.src} style={{width:"250px",height:"auto"}}/>} */}
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default ChartJs;



