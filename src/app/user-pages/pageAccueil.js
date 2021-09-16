import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";
import Particles from "react-particles-js";
import "animate.css";
import Button from "react-bootstrap/Button";
toast.configure();

export class pageAccueil extends Component {
  constructor(props) {
    super(props);
    this.state = { mail: "", pass: "", alert: false, user: {}, parcels: {} };
  }

  forceUpdateHandler() {
    this.forceUpdate();
  }
  render() {
    return (
      <>
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

          <div
            class="d-flex flex-row-reverse bd-highlight"
            style={{ paddingTop: "10px", paddingRight: "10px" }}
          >
            <Button style={{ marginLeft: "10px" }} variant="outline-light">
              S'authentifier
            </Button>
            <Button style={{ marginLeft: "10px" }} variant="outline-light">
              S'inscrire
            </Button>
          </div>

          <div class="container">
            <div
              class="animate__animated animate__flash"
              style={{ fontFamily: "Fantasy", fontSize: "50px" , textAlign:"center" ,  textShadow: "#FC0 1px 0 10px" , color:"white" }}
            >
              L’application qui simplifie la gestion de votre exploitation agricole
            </div>
          </div>
          
        </div>


        <br/>
        <div style={{color:"blue" , heigth:"100px"}}></div>
        
      </>
    );
  }
}

export default pageAccueil;
