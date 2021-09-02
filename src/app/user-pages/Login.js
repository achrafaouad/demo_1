import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form,Alert} from 'react-bootstrap';


export class Login extends Component {
  constructor(props){
    super(props);  
    this.state={mail:"",pass:"", alert:false,user:{},parcels:{}};
    this.handlechange = this.handlechange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handlechange({target}){
    console.log(this.state);
    this.setState({
      [target.name]: target.value
    });
    console.log(this.state);
  }
  handleSubmit(e){
    e.preventDefault();
    fetch("http://localhost:3001/signin",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        email:this.state.mail,
        password:this.state.pass})
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{console.log(responseJson);
    if(responseJson){this.props.history.push(
              {
                pathname: '/dashboard',
                state: {user:responseJson}
            }
     )}
          }
    )


  
}
forceUpdateHandler(){
  this.forceUpdate();
};
  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 login1">
          <div className="row w-100 mx-0 ">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5 mylogincard">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                {this.state.alert && <Alert  variant ='danger'>
                  passwords doesn't match!!!!!!!!
                </Alert>}
                <Form className="pt-3" onSubmit={this.handleSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control name="mail" type="email" placeholder="Username" size="lg" className="h-auto" onChange={this.handlechange} />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control name="pass" type="password" placeholder="Password" size="lg" className="h-auto" onChange={this.handlechange}/>
                  </Form.Group>
                  <button className="mt-3 btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit"> submit
        
                  </button>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Forgot password?</a>
                  </div>
              
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/user-pages/register-1" className="text-primary">Create</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default Login
