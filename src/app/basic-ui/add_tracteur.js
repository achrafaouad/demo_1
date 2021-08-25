import React, { Component } from "react";
import { FaBeer } from 'react-icons/fa';
import { DatePicker, Radio } from "antd";
const bati = [ 
  { label: "LOCATION", value: "LOCATION" },
  { label: "PROPRIÉTAIRE", value: "PROPRIÉTAIRE" }
];

class AddTracteur extends Component {
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

  render() {
    return (
      <div>
        <div
          className=" heading text-center addTra"
          style={{ height: "120px" }}
        >
          {" "}
          Nouveau matériel
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
                Ajouter le nom de votre materiel
              </div>
            </div>

            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Déscription 
              </label>
              <input
                type="text"
                class="form-control"
                name="description"
                id="exampleInputPassword1"
                onChange={this.handleChange}
              />
            </div>

            <div class="mb-3">
              <label for="Nom" class="form-label">
                Type :{" "}
              </label>
              <br />
              <select className="custom-select custom-select-sm">
                <option defaultValue>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="Fabriquant" class="form-label">
                Fabriquant
              </label>
              <input
                type="text"
                class="form-control"
                name="fabriquant"
                id="Fabriquant"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="Fabriquant" class="form-text">
                S'il y a la possibilité insère le fabriquant de ce matériel
              </div>
            </div>
            <div class="mb-3">
              <label for="Modèle" class="form-label">
                Modèle
              </label>
              <input
                type="text"
                class="form-control"
                name="model"
                id="Modèle"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="Modèle" class="form-text">
                S'il y a la possibilité insère le Modèle
              </div>
            </div>

            <div class="mb-3">
              <label for="Propriété" class="form-label">
                Propriété
              </label>{" "}
              <br />
              <Radio.Group
          options={bati}
          name="myProp"
          onChange={this.handlechange1}
          value={this.state.myProp}
          optionType="button"
          buttonStyle="solid"
        />
            </div>
            {/*PROPRIÉTAIRE*/}
            {/*date achat*/}
            {this.state.myProp === "PROPRIÉTAIRE" && (
              <>
                <div
                  id="date-picker-example"
                  class="md-form md-outline input-with-post-icon datepicker"
                >
                  <label for="example">Date d'achat</label> <br />
                  <DatePicker onChange={this.onChangeAchat} />
                </div>
                <br />
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Coût d'achat
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    name="prix_achat"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <div id="emailHelp" class="form-text">
                    Ajouter le Coût d'achat
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Plaque d'immatriculation
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="immatriculation"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <div id="emailHelp" class="form-text">
                    Ajouter la Plaque d'immatriculation
                  </div>
                </div>
                {/*Dernier controle technique*/}
                <div
                  id="date-picker-example"
                  class="md-form md-outline input-with-post-icon datepicker"
                >
                  <label for="example">Dernier controle technique</label> <br />
                  <DatePicker onChange={this.onChangeControl} />
                </div>
                {/*date achat*/}
                <div
                  id="date-picker-example"
                  class="md-form md-outline input-with-post-icon datepicker"
                >
                  <br />
                  <label for="example">Dernière assurance</label> <br />
                  <DatePicker onChange={this.onChangeAssurance} />
                </div>
                <br />
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    N° d'enregistrement officiel
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="n_enregistrement"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <div id="emailHelp" class="form-text">
                    Ajouter le N° d'enregistrement officiel
                  </div>
                </div>{" "}
              </>
            )}

            {/*LOCATION*/}
            {this.state.myProp === "LOCATION" && (
              <>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Prix de location (jour)
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    name="prix_location_jour"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <div id="emailHelp" class="form-text">
                    Ajouter le Prix de location par jour
                  </div>
                </div>
                <div class="mb-3">
                  <label for="Fabriquant" class="form-label">
                    Propriétaire
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="Propriétaire"
                    id="Fabriquant"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <div id="Fabriquant" class="form-text">
                    S'il y a la possibilité insère le Propriétaire de ce
                    matériel
                  </div>
                </div>
              </>
            )}
            {/*LOCATION*/}
            <div class="mb-1">
              <label for="formFile" class="form-label">
                choisie l'image de votre materiel
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
        {/* {(this.state.src) && <img src={"http://localhost:3001/"+this.state.src} style={{width:"250px",height:"auto"}}/>} */}
      </div>
    );
  }
}

export default AddTracteur;
