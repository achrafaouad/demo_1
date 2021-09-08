import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();


class EditProfil extends Component {
  constructor(props) {
     super(props);
     if(this.props.Edit){
      const {adress,cin,code_insee,devise,email,id,nom,note,password,pays,photo,ville} = this.props.Edit;
      this.state = {adress:adress,cin:cin,code_insee:code_insee,devise:devise,email:email,id:id,nom:nom,note:note,password:password,pays:pays,photo:photo,ville:ville};
     }
    
    this.handleChange = this.handleChange.bind(this);
    this.fileChange = this.fileChange.bind(this);
    this.onSUBMIT = this.onSUBMIT.bind(this);
    
    
    
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
      fetch("http://localhost:3001/updateProfil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id:this.state.id,
          nom: this.state.nom,
          adress: this.state.adress,
          ville: this.state.ville,
          pays: this.state.pays,
          code_insee: this.state.code_insee,
          note: this.state.note,
          cin: this.state.cin,
          devise: this.state.devise,
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
          toast.success('Votre profil a été bien mis à jour. ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
          this.props.reAfficher()
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

      e.preventDefault();
    }
  }

  render() {
    console.log("edite",this.props.Edit)

    const mystyle = {
      marginTop: "20px",
      gridColumnStart: 2,
      gridColumnEnd: 3
    };
    const firststyle = {
      display: "grid",
      gridTemplateColumns: "auto auto auto"
    };

    return (
      <div>
        
        <div className="grid" style={firststyle}>
          <form style={mystyle} onSubmit={this.onSUBMIT}>
            <div class="mb-3">
              <label for="Nom" class="form-label">
                Nom
              </label>
              <input
                type="text"
                class="form-control"
                id="Nom"
                name="nom"
                value = {this.state.nom && this.state.nom}
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="emailHelp" class="form-text">
                Votre Nom
              </div>
            </div>

            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Adress
              </label>
              <input
                type="text"
                class="form-control"
                name="adress"
                value = {this.state.adress &&this.state.adress}
                id="exampleInputPassword1"
                onChange={this.handleChange}
              />
            </div>

            

            <div class="mb-3">
              <label for="Fabriquant" class="form-label">
                ville
              </label>
              <input
                type="text"
                class="form-control"
                name="ville"
                value = {this.state.ville && this.state.ville}
                id="Fabriquant"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="Fabriquant" class="form-text">
                ici vous pouver modifier votre ville
              </div>
            </div>
            <div class="mb-3">
              <label for="Modèle" class="form-label">
                pays
              </label>
              <input
                type="text"
                class="form-control"
                name="pays"
                value = {this.state.pays && this.state.pays}
                id="Modèle"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="Modèle" class="form-text">
               
              </div>
            </div>

            
            {/*PROPRIÉTAIRE*/}
            {/*date achat*/}
            
              <>
                
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Code Insee
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    name="code_insee"
                    value = {this.state.code_insee && this.state.code_insee}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <div id="emailHelp" class="form-text">
                    
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    description
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="note"
                    value = {this.state.note && this.state.note}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <div id="emailHelp" class="form-text">
                    
                  </div>
                </div>
                {/*Dernier controle technique*/}
                
                {/*date achat*/}
                
                <br />
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                      CIN                  
                      </label>
                  <input
                    type="text"
                    class="form-control"
                    name="cin"
                    value = {this.state.cin && this.state.cin}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <div id="emailHelp" class="form-text">
                  </div>
                </div>{" "}
              </>
            

            {/*LOCATION*/}
            
              <>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Devise
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    name="devise"
                    value = {this.state.devise && this.state.devise}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <div id="emailHelp" class="form-text">
                    
                  </div>
                </div>

                </>
                
            {/*LOCATION*/}
            <div class="mb-1">
              <label for="formFile" class="form-label">
                Vous pouver changer votre image de profil
              </label>
              <input
                class="form-control"
                type="file"
                name="materiel"
                id="formFile"
                onChange={this.fileChange}
              />
            </div>
            <button type="submit" class="btn btn-success">
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

export default EditProfil;
