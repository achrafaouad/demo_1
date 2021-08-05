import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

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
   e.preventDefault();

  }
  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 h-100 register1">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5 myregistercard">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                <h4>New here?</h4>
                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                   {this.state.alert && <Alert  variant ='danger'>
                  passwords doesn't match!!!!!!!!
                </Alert>}
                  <form className="pt-3" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input value={this.state.userName} name="userName" type="text" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Username" onChange={this.handlechange} />
                  </div>
                  <div className="form-group">
                    <input value={this.state.email} name="email" type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" onChange={this.handlechange}/>
                  </div>
                  <div className="form-group">
                    <select value={this.state.country} name="country" className="form-control form-control-lg" id="exampleFormControlSelect2" onChange={this.handlechange}>
                      <option>Country</option>
                      <option>United States of America</option>
                      <option>United Kingdom</option>
                      <option>India</option>
                      <option>Germany</option>
                      <option>Argentina</option>
                    </select>
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
                    Already have an account? <Link to="/user-pages/login" className="text-primary">Login</Link>
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
