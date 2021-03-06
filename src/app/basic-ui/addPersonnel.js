import React, { Component } from "react";
import { Input} from 'antd';
import 'antd/dist/antd.css';

import { DatePicker, Radio } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const bati = [ 
  { label: "Saisonnier", value: "Saisonnier" },
  { label: "Permanent", value: "Permanent" }
];

const { TextArea } = Input;
class AddPersonnel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChangeAchat = this.onChangeAchat.bind(this);
    this.onChangeControl = this.onChangeControl.bind(this);
    this.onChangeAssurance = this.onChangeAssurance.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileChange = this.fileChange.bind(this);
    this.onSUBMIT = this.onSUBMIT.bind(this);
    this.handlechange1 = this.handlechange1.bind(this);
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
    if (this.state.nom) {
      fetch("http://localhost:3001/add_personnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nom:this.state.nom,
            adress:this.state.adress,
            ville:this.state.ville,
            cin:this.state.cin,
            pays:this.state.pays,
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
          toast.success('le personnel est bien ajout?? ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});

          console.log(responseJson.data);
          if(this.state.myFile){
            const formdata = new FormData();
          formdata.append("materiel", this.state.myFile);
          formdata.append("id", responseJson.data);
          fetch("http://localhost:3001/uploadMypers", {
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

  render() {
    return (
      <div>
        <div
          className=" heading text-center addTra"
          style={{ height: "120px" }}
        >
          {" "}
          Nouveau Personnel
        </div>
        <div className="grid">
          <form className="myForm" >
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
                onChange={this.handleChange}
              />
              <div id="emailHelp" class="form-text">
                Ajouter le nom de votre Personnel
              </div>
            </div>

            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Adresse
              </label>
              <input
                type="text"
                class="form-control"
                name="adress"
                id="exampleInputPassword1"
                onChange={this.handleChange}
              />
            </div>

            

            <div class="mb-3">
              <label for="Fabriquant" class="form-label">
                Ville
              </label>
              <input
                type="text"
                class="form-control"
                name="ville"
                id="Fabriquant"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="Fabriquant" class="form-text">
                S'il y a la possibilit?? ins??re la Ville de votre personnel
              </div>
            </div>
            <div class="mb-3">
              <label for="Mod??le" class="form-label">
               CIN
              </label>
              <input
                type="text"
                class="form-control"
                name="cin"
                id="Mod??le"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="Mod??le" class="form-text">
                S'il y a la possibilit?? ins??re le CIN
              </div>
            </div>
            <div class="mb-3">
              <label for="Mod??le" class="form-label">
               Pays
              </label>
              <input
                type="text"
                class="form-control"
                name="pays"
                id="Mod??le"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="Mod??le" class="form-text">
                S'il y a la possibilit?? ins??re le Pays
              </div>
            </div>
            <div class="mb-3">
              
              <p>note</p>
        <TextArea rows={2} name="note" onChange={this.handleChange} />

              <div id="Mod??le" class="form-text">
                S'il y a la possibilit?? ins??re une note
              </div>
            </div>

          
          
            <div class="mb-1">
              <label for="formFile" class="form-label">
                choisie l'image de votre Personnel
              </label>
              <input
                class="form-control"
                type="file"
                name="materiel"
                id="formFile"
                onChange={this.fileChange}
              />
            </div>
            <button type="submit" class="btn btn-success" onClick={ this.onSUBMIT}>
              Sauvegarder
            </button>
            <button class="btn ">Annuler</button>
          </form>
        </div>
        
      </div>
    );
  }
}

export default AddPersonnel;
