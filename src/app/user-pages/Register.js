import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import icon from './farm.png'

export class Register extends Component {
  constructor(props){
    super(props);
    this.state = {userName:'', email:'',country:'',passWord:'',confirm:'', alert:false};
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
    this.setState({alert:false})
    if(!this.state.password || !this.state.userName || !this.state.confirm || !this.state.email){
      this.setState({alert:true})
     
    }
    if(this.state.password != this.state.confirm){
      this.setState({alert:true})
    }
    if(this.state.alert === false){
    fetch("http://localhost:3001/register",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        name:this.state.userName,
        password:this.state.passWord,
        email:this.state.email,
        country:this.state.country
      })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{console.log(responseJson)} );

  }
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
      
                
                   {this.state.alert && <Alert  variant ='danger'>
                  les mots de pass ne sont pas identiques
                </Alert>}
                  <form className="pt-3" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input value={this.state.userName} name="userName" type="text" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Username" onChange={this.handlechange} />
                  </div>
                  <div className="form-group">
                    <input value={this.state.email} name="email" type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" onChange={this.handlechange}/>
                  </div>
                 
                  <div className="form-group">
                    <input value={this.state.password} name="password" type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" onChange={this.handlechange}/>
                  </div>
                  <div className="form-group">
                    <input name="confirm" type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="confim Password" onChange={this.handlechange}/>
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                  <button className="mt-3 btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit"> submit
        
        </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/user-pages/login-2" className="text-primary">Login</Link>
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
