import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Trans } from 'react-i18next';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";
import Particles from "react-particles-js";
import "animate.css";
import Button from "react-bootstrap/Button";
import test from './test.png'
import bb from './bb.png'
import icon from './farm.png'
import icony from './farmyellow.png'
import metelecharger from './metelecharger.PNG'
import Aos from 'aos'
import { BsPhone,BsEnvelopeOpenFill } from "react-icons/bs";
import "aos/dist/aos.css"
import Register from "./Register";
import Login from "./Login";
toast.configure();
Aos.init({duration : 2000})

export class pageAccueil extends Component {
  constructor(props) {
    super(props);
    this.state = { mail: "", pass: "", alert: false, user: {}, parcels: {}, authentification:false , register:false};
    this.submit = this.submit.bind(this)
  }

  forceUpdateHandler() {
    this.forceUpdate();
  }
  submit(e){
    e.preventDefault();
     console.warn("hello" , e.target.name)
     var path = e.target.name==="authentification"?'/user-pages/login-2':"/user-pages/register-1"
     this.props.history.push(
      {
        pathname: path,
    })
  }
  render() {
    return (
      <>
    
      <div style={{background:"#fcfcfc"}}>
        <div className="acc">
        <Particles
            className="particles"
            params={{
              particles: {
                number: {
                  value: 150,
                },
                size: {
                  value: 3,
                },
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: "repulse",
                  },
                },
              },
            }}
          />
          <div class="d-flex justify-content-between">
          <div style={{zIndex:4}}>
            <img
                    src={icony}
                    style={{width:"120px", margin:"15px"}}
                    alt=" hello"/></div>
          <div
            
            style={{ paddingTop: "10px", paddingRight: "10px" ,zIndex:4 }}
          >
          
            <button className="btn " name="authentification" variant="outline-light" type="button" onClick={this.submit} style={{ textShadow: "#FC0 1px 0 10px" , color:"white"}}> S'authentifier
        
            </button>
            
            <button className="btn " name="inscrire" variant="outline-light" type="button" onClick={this.submit}  style={{ textShadow: "#FC0 1px 0 10px" , color:"white"}}> S'inscrire
        
            </button>

            
         
          </div>
          </div>

          <div class="container1">
          


              <div
                class="animate__animated animate__flash"
                style={{ fontFamily: "Fantasy", fontSize: "50px" , textAlign:"center" ,  textShadow: "#FC0 1px 0 10px" , color:"white" }}
              >
                L’application qui simplifie la gestion de votre exploitation agricole
              </div>
            </div>
            
          </div>


          <br/>
          <div>
          <div class="dd14">
           <div class="row" >

           

                  <div class="col-sm center" >
                    <div data-aos="fade-down">
                  <img
                    src={test}
                    alt=" hello"/>
                  </div>
                  </div>
                  <div class="col-sm center">
                              <div data-aos="fade-up-left"> 
                            <p className='title1' style={{color:"#40c057", textAlign:"center"}}>Register everything from your phone</p>
                               <p style={{color:"black", textAlign:"center"}}>Agroptima mobile app is like an electronic notebook. Register your daily operations on the field with all the details you need.</p>
                            </div>
                  </div>



            </div>

            




            </div>
            <div class="row">
            <div class="col-sm" >
            <div className="section1 dd14"style={{height:'500px', padding:" 75px 0 85px 0"}}> 
            <div data-aos="slide-left"  >
            <div
                 
                style={{ fontFamily: "Fantasy", fontSize: "50px" , textAlign:"center" ,  textShadow: "black 1px 0 10px" , color:"white" }}
              >
                Gérer votre exploitation agricole sera beaucoup plus simple
              </div>
              <div style={{  fontSize: "15px" , textAlign:"center", textShadow: "1px 0 10px black"}} >
              Avec Notre solution, enregistrez vos travaux agricoles depuis vos parcelles, téléchargez votre rapport phytosanitaire et cahier d’épandage et contrôlez vos coûts de production. Conservées dans le Cloud, vos données sont toujours avec vous.
              </div>
              </div>
              </div>
              </div>
              </div>


            <div class="row" >

           

            <div class="col-sm center" >
              <div data-aos="slide-right">
                  <img
                    src={bb}
                    alt=" hello"/>
                  </div>
                  </div>
                  <div class="col-sm center">
                              <div data-aos="slide-left" >
                            <p className='title1 'style={{color:"#40c057",textAlign:"center"}}>Consultez vos données en temps réel</p>
                               <p style={{color:"black",textAlign:"center"}}>Vos données se téléchargent instantanément sur votre compte. Vous pouvez y accéder quand vous le souhaitez depuis un ordinateur ou l’application mobile.</p>
                            </div>
                  </div>


                  



            </div>

            </div>

            <div  style={{backgroundColor:"black" ,height:"auto"}} >
            <div className="row">
            <div className="col-sm">
              <ul style={{display:"flex" , alignItems:"center", margin:"15px"}}>
                <li><img
                    src={icon}
                    style={{width:"80px"}}
                    alt=" hello"/></li>
              </ul>

            </div>
            <div className="col-sm">
              <ul style={{ margin:"15px"}}>
              <li><strong style={{color:"white"}}>Farm Management</strong></li>
                <li>L’application agricole</li>
                <li>Fonctionnalités</li>
                <li>Coûts de production</li>
                <li>Tarifs</li>
                
                <li>Cahier de culture agricole</li>
              </ul>

            </div>
            <div className="col-sm">
              <ul style={{ margin:"15px"}}>
              <li><strong style={{color:"white"}}>A PROPOS</strong></li>
                <li>Emploi</li>
                <li>Qui sommes nous</li>

                <li>Témoignages</li>
                
                <li>Contact</li>
              </ul>

            </div>
            <div className="col-sm">
              <ul style={{ margin:"15px"}}>
              <li><strong style={{color:"white"}}>M’INSCRIRE</strong></li>
                <li>M’inscrire</li>
                
              </ul>

            </div>
            <div className="col-sm">
              <ul style={{ margin:"15px"}}>
              <li><strong style={{color:"white"}}><BsPhone/> +212 666666666</strong></li>
              <li><strong style={{color:"white"}}><BsEnvelopeOpenFill/> farmTest@gmail.com</strong></li>
              <li><img
                    src={metelecharger}
                    style={{width:"170px"}}
                    alt=" hello"/></li>
                
              </ul>

            </div>
            </div>
            </div>
            
            
              
              

        </div>
       

        </>
    );
  }
}

export default pageAccueil;
