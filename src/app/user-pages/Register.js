import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import icon from './farm.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
export class Register extends Component {
  constructor(props){
    super(props);
    this.state = {userName:'', email:'',country:'',password:'',confirm:''};
    this.handlechange = this.handlechange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handlechange({target}){
    this.setState({
      [target.name]: target.value
    });
    console.log(this.state)
  }
  handleSubmit(e){
    var alert = false

    if(!this.state.password){
      alert =true
      toast.warn("veillez inserer votre mot de pass" ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
    }
    if( !this.state.userName){
      alert = true
      toast.warn("veillez inserer votre nom d'utilisateur " ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});

    }
    if( this.state.password != this.state.confirm ){
      alert = true
      toast.warn("les deux mots de pass ne sont pas identiques" ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
    }
    if( !this.state.email ){
      alert = true
      toast.warn("veillez inserer la confirmation de votre email" ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
    }



  
    if(alert === false){
    fetch("http://localhost:3001/register",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        name:this.state.userName,
        password:this.state.password,
        email:this.state.email,
        country:this.state.country
      })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{
     if(responseJson==="success"){
      toast.success('Votre compte a été bien crée' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
      this.props.history.push("/user-pages/login-2")
     }
     else  toast.error('un compte existe deja avec l\'email aue vous avez inserer' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
    
    console.log(responseJson)} );

  }
  console.log("hello", this.state.alert)
   e.preventDefault();

  }
  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 h-100 register1">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5 myregistercard">
              <div className="brand-logo" style={{display:"flex",alignItems:"center",justifyContent: "center"}}>
                <img
                    src={icon}
                    style={{width:"150px"}}
                    alt=" hello"/>
                </div>
                  <form className="pt-3" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input value={this.state.userName} name="userName" type="text" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Nom" onChange={this.handlechange} />
                  </div>
                  <div className="form-group">
                    <input value={this.state.email} name="email" type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" onChange={this.handlechange}/>
                  </div>
                 
                  <div className="form-group">
                    <input value={this.state.password} name="password" type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" onChange={this.handlechange}/>
                  </div>
                  <div className="form-group">
                    <input name="confirm" type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="confirmer le mot de passe" onChange={this.handlechange}/>
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        J'accepte tous les termes et conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                  <button className="mt-3 btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit"> submit
        
        </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                  Vous avez déjà un compte? <Link to="/user-pages/login-2" className="text-primary">S'authentifier</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
