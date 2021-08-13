import React, { Component } from "react";
const bcrypt = require('bcrypt-nodejs');

class ChangerMotPass extends Component {
  constructor(props) {
    super(props);

    if(this.props.user){
      let uid = this.props.user.id,
      state ={UserID:uid , user:this.props.user}
      console.log("modepass")
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
    
    bcrypt.compare(this.state.myPassword, this.state.user.password, function(err, resp) {
      if(resp){
          if(this.state.New === this.state.confirm){
            fetch("http://localhost:3001/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id:this.state.UserID,
          password: this.state.new,
          
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
          }
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
                type="text"
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
