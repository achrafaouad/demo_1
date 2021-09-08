import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const bcrypt = require('bcrypt-nodejs');


toast.configure();
class ChangerMotPass extends Component {
  constructor(props) {
    super(props);

    if(this.props.user){
      let uid = this.props.user.id
      this.state ={UserID:uid , user:this.props.user}
      console.log("modepass",this.props.user)
    }
   
    this.handleChange = this.handleChange.bind(this);
    this.onSUBMIT = this.onSUBMIT.bind(this);
  }

 

 
  handleChange(e) {
    console.log(e.target.value);
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }
 
  onSUBMIT(e) {
    e.preventDefault();
    console.log("test test",this.state.New)
        console.log(this.state.confirm)
  
            fetch("http://localhost:3001/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id:this.state.UserID,
          newPass:this.state.New,
          confirm:this.state.confirm,
          current:this.state.user.password,
          password:this.state.myPassword         
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
        ).then((responseJson) => {
          if(responseJson === "passwordActuel") toast.error('Le mot de passe actuel est erroné.' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
          if(responseJson === "identique22") toast.error('Les deux mots de passe ne sont pas identiques.' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
          if(responseJson === "success"){
             toast.success('Le mot de passe a été bien changé.' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000})
             this.props.afficherPass()
        }

        })
          e.preventDefault();

          }
      
        

     
    
  

  render() {
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
          <form className="myForm" onSubmit={this.onSUBMIT} style={mystyle}>
            <div class="mb-3">
              <label for="Nom" class="form-label">
                Mot de passe actuel 
              </label>
              <input
                type="password"
                class="form-control"
                id="Nom"
                name="myPassword"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="emailHelp" class="form-text">
                
              </div>
            </div>

            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                class="form-control"
                name="New"
                id="exampleInputPassword1"
                onChange={this.handleChange}
              />
            </div>

            

            <div class="mb-3">
              <label for="Fabriquant" class="form-label">
               confirmer le mot de passe
              </label>
              <input
                type="password"
                class="form-control"
                name="confirm"
                id="Fabriquant"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <div id="Fabriquant" class="form-text">
                
              </div>
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

export default ChangerMotPass;
