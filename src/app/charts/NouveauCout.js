import React, { Component } from "react";
import { FaBeer } from 'react-icons/fa';
import 'antd/dist/antd.css';
import { DatePicker, Radio } from "antd";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const bati = [ 
  { label: "COÛT", value: "COÛT" },
  { label: "REVENU", value: "REVENU" }
];
const Dure = [ 
  { label: "1 AN", value: "1 AN" },
  { label: "PLUS DE 1 AN", value: "PLUS DE 1 AN" }
];

class NouveauCout extends Component {
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
    this.setState({ date: dateString });
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
    
      fetch("http://localhost:3001/add_cout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: this.state.nom,
          type: this.state.type,
          id_exploitation: this.state.id_exploitation,
          id_exp:JSON.parse(sessionStorage.getItem('user')).id ,
          date: this.state.date,
          montant: this.state.montant,
          durée_amortissement: this.state.durée_amortissement,
          année_amortissement: this.state.année_amortissement
          
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
          (this.state.type === "COÛT")?
          toast.success('le coût est bien ajouté ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000})
          :toast.success('le REVENU est bien ajouté ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000})
         
          
        });
        this.props.reafficher()
      e.preventDefault();
    
  }

  async optionExploitation(){
    this.data = await fetch("http://localhost:3001/get_Exploitation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        
        id_exp:JSON.parse(sessionStorage.getItem('user')).id ,
        
        
      }),
    }).then(response2 =>{
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
          name="type"
          onChange={this.handlechange1}
          value={this.state.type}
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
                onChange={this.handlechange1}
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
               Montant (dh)
              </label>
              <input
                type="Number"
                class="form-control"
                name="montant"
                id="exampleInputPassword1"
                onChange={this.handlechange1}
              />
            </div>

            <div class="mb-3">
              <label for="Propriété" class="form-label">
              Durée d'amortissement
              </label>{" "}
              <br />
              <Radio.Group
              options={Dure}
              name="durée_amortissement"
              onChange={this.handlechange1}
              value={this.state.durée_amortissement}
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
                name="année_amortissement"
                id="exampleInputPassword1"  
                value={this.state.année_amortissement}
                onChange={this.handlechange1}
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

export default NouveauCout;



