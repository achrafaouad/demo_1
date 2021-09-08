import React, { Component } from "react";

import { DatePicker, Radio } from "antd";
import { Input } from 'antd';
import 'antd/dist/antd.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();



const { TextArea } = Input;
const bati = [ 
  { label: "PHYTOSANITAIRES", value: "PHYTOSANITAIRES" },
  { label: "ENGRAIS", value: "ENGRAIS" },
  { label: "SEMENCES/PLANTS", value: "SEMENCES/PLANTS" },
  { label: "Aliment", value: "Aliment" },
];

class AddProduit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.onSUBMIT = this.onSUBMIT.bind(this);
    this.handlechange1 = this.handlechange1.bind(this);
    this.handlechangement = this.handlechangement.bind(this);
    
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

  handleChange(e) {
    console.log(e.target.value);
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }
  
  onSUBMIT(e) {
    e.preventDefault();
    if (this.state.nom && !(this.state.myProp === 'Aliment')) {
      fetch("http://localhost:3001/add_produit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: this.state.nom,
          prix_uni: this.state.prix_uni,
          unité: this.state.unité,
          myProp: this.state.myProp,
          n_enregistrement: this.state.n_enregistrement,
          composition: this.state.composition,
          fabriquant: this.state.fabriquant,
          culture: this.state.culture,
          azot: this.state.azot,
          Phosphore: this.state.Phosphore,
          potassium: this.state.potassium,
          composition_n_oligo_elements: this.state.composition_n_oligo_elements,
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
          toast.success(responseJson +' ' + this.state.nom + ' a été bien ajouté  ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
          if(this.state.myProp === 'SEMENCES/PLANTS') toast.success(responseJson +' ' + this.state.nom + ' a été bien ajoutée au niveau de récoltes. ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
          console.log(responseJson.data);}
         );
        this.props.reafficher()
      e.preventDefault();
    }

    if(this.state.myProp === 'Aliment' && this.state.nom){
      fetch("http://localhost:3001/add_aliment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: this.state.nom,
          prix_unit: this.state.prix_uni,
          unit: this.state.unité,
          fournisseur:this.state.fournisseur,
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
        .then(responseJson =>{
          console.log(responseJson.data);
          toast.success('l\'Aliment' +this.state.nom+ ' a été bien ajouté  ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
        }
         );
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
          Nouveau Produit
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
                Ajouter le nom de votre Produit
              </div>
            </div>

            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Prix unitaire
              </label>
              <input
                type="Number"
                class="form-control"
                name="prix_uni"
                id="exampleInputPassword1"
                onChange={this.handleChange}
              />
            </div>

            <div class="mb-3">
              <label for="Nom" class="form-label">
               Unité :{" "}
              </label>
              <br />
              <select className="custom-select custom-select-sm" onChange={this.handlechangement}>
                <option defaultValue>Open this select menu</option>
                <option value="kg">KG</option>
                <option value="L">L</option>
              </select>
            </div>

             <div class="mb-3">
              <label for="Propriété" class="form-label">
                Produit
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

            {(this.state.myProp === 'Aliment') &&
              <>
              <div class="mb-3">
              <label for="Nom" class="form-label">
                Fournisseur    
              </label>
              <input
                type="text"
                class="form-control"
                id="Nom"
                name="fournisseur"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="emailHelp" class="form-text">
                Ajouter le nom de votre Produit
              </div>
            </div>

            <p>note</p>
        <TextArea rows={2} name="note" onChange={this.handleChange} />

   
            </>
            }

            {(this.state.myProp === "PHYTOSANITAIRES") && <><div class="mb-3">
              <label for="Fabriquant" class="form-label">
                N° Enregistrement
              </label>
              <input
                type="text"
                class="form-control"
                name="n_enregistrement"
                id="Fabriquant"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="Fabriquant" class="form-text">
                S'il y a la possibilité insère le N° Enregistrement
              </div>
            </div>
            <div class="mb-3">
              <label for="Modèle" class="form-label">
              composition
              </label>
              <input
                type="text"
                class="form-control"
                name="composition"
                id="Modèle"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="Modèle" class="form-text">
                S'il y a la possibilité insère la composition
              </div>
            </div>

            
      
                
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Fabriquant 
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    name="fabriquant"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <div id="emailHelp" class="form-text">
                    Ajouter le fabriquant de ce produit
                  </div>
                </div>
                </>
}

                {(this.state.myProp === "SEMENCES/PLANTS") && <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Culture
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="culture"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  
                  <div id="emailHelp" class="form-text">
                    Ajouter la Culture utilisée
                  </div>
                </div>
               }
                <br />
                
                {(this.state.myProp === "ENGRAIS") && <><div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                   Azot
                  </label>
                  <input
                    type="Number"
                    class="form-control"
                    name="azot"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <div id="emailHelp" class="form-text">
                    Ajouter le pourcentage en Azote
                  </div>
                </div>{" "}
             

            
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                  Phosphore
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    name="Phosphore"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <div id="emailHelp" class="form-text">
                  Ajouter le pourcentage en Phosphore
                  </div>
                </div>
                <div class="mb-3">
                  <label for="Fabriquant" class="form-label">
                  potassium
                  </label>
                  <input
                    type="Number"
                    class="form-control"
                    name="potassium"
                    id="Fabriquant"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <div id="Fabriquant" class="form-text">
                  Ajouter le pourcentage en potassium
                  </div>
                </div>
                <div class="mb-3">
                  <label for="Fabriquant" class="form-label">
                  composition en oligo-elements
                  </label>
                  <input
                    type="Number"
                    class="form-control"
                    name="composition_n_oligo_elements"
                    id="Fabriquant"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  
                </div> </>}
            
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

export default AddProduit;
