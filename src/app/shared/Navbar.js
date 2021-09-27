import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link,withRouter  } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { FcGlobe,FcAdvertising } from "react-icons/fc";

class Navbar extends Component {
constructor(props){
  super(props)
  this.state = {};
  this.fun = this.fun.bind(this)
  this.fun2 = this.fun2.bind(this)
  this.out = this.out.bind(this)
  this.bb = this.bb.bind(this)
}
fun(){
   this.props.history.push(
    
      "/dashboard",
  )
 }
fun2(){
   this.props.history.push(
    
      "/form-elements/basic-elements",
  )
 }

bb(){
   this.props.history.push(
    
      "/basic-ui/buttons",
  )
 }
out(){
   this.props.history.push(
    
    '/',
  )
 }
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  toggleRightSidebar() {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }
  render () {
    var srcF
if(JSON.parse(sessionStorage.getItem('user'))) srcF = "http://localhost:3001/"+JSON.parse(sessionStorage.getItem('user')).photo
else srcF = '../../assets/images/faces/face15.jpg'
    return (
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo-mini" to="/"><img src={require('../../assets/images/f.svg')} alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button className="navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="mdi mdi-menu"></span>
          </button>
          <ul className="navbar-nav w-100">
            <li className="nav-item w-100">
              <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                <input type="text" className="form-control" placeholder="Search products" />
              </form>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            <Dropdown alignRight as="li" className="nav-item d-none d-lg-block">
                <Dropdown.Toggle className="nav-link btn btn-success create-new-button no-caret">
                + <Trans>Ajouter une nouvelle operation</Trans>
                </Dropdown.Toggle>

                <Dropdown.Menu className="navbar-dropdown preview-list create-new-dropdown-menu">
                  
                  <Dropdown.Item 
                  onClick={this.fun}
                    className="preview-item" >
                    <div className="preview-thumbnail" >
                      <div className="preview-icon bg-dark rounded-circle">
                        <FcGlobe/>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p  className="preview-subject ellipsis mb-1"><p>+production ...</p></p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item  
                     onClick={this.fun2}
                     className="preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                      <FcAdvertising/>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1"><Trans>+travail ... </Trans></p>
                    </div>
                  </Dropdown.Item>
                  
                 
                 
                </Dropdown.Menu>
              </Dropdown>
            <li className="nav-item d-none d-lg-block">
              <a className="nav-link" href="!#" onClick={event => event.preventDefault()}>
                <i className="mdi mdi-view-grid"></i>
              </a>
            </li>
            <Dropdown alignRight as="li" className="nav-item border-left" >
              <Dropdown.Toggle as="a" className="nav-link count-indicator cursor-pointer">
                <i className="mdi mdi-email"></i>
                <span className="count bg-success"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="navbar-dropdown preview-list">
                  <h6 className="p-3 mb-0" style={{color:"white"}}><Trans>Messages</Trans></h6>
                  <Dropdown.Divider />
                  <Dropdown.Item href="!#" onClick={evt =>evt.preventDefault()} className="preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <img src={require('../../assets/images/faces/face4.jpg')} alt="profile" className="rounded-circle profile-pic" />
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1" style={{color:"white"}}><Trans>Mark send you a message</Trans></p>
                      <p className="text-muted mb-0"> 1 <Trans>Minutes ago</Trans> </p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="!#" onClick={evt =>evt.preventDefault()} className="preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <img src={require('../../assets/images/faces/face2.jpg')} alt="profile" className="rounded-circle profile-pic" />
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1" style={{color:"white"}}><Trans>Cregh send you a message</Trans></p>
                      <p className="text-muted mb-0"> 15 <Trans>Minutes ago</Trans> </p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="!#" onClick={evt =>evt.preventDefault()} className="preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <img src={require('../../assets/images/faces/face3.jpg')} alt="profile" className="rounded-circle profile-pic" />
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1" style={{color:"white"}}><Trans>Profile picture updated</Trans></p>
                      <p className="text-muted mb-0"> 18 <Trans>Minutes ago</Trans> </p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <p className="p-3 mb-0 text-center">4 <Trans>new messages</Trans></p>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown alignRight as="li" className="nav-item border-left">
              <Dropdown.Toggle as="a" className="nav-link count-indicator cursor-pointer">
                <i className="mdi mdi-bell"></i>
                <span className="count bg-danger"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
                <h6 className="p-3 mb-0" style={{color:"white"}}><Trans>Notifications</Trans></h6>
                <Dropdown.Divider />
                <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-calendar text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1"><Trans>Événement aujourd'hui</Trans></p>
                    <p className="text-muted ellipsis mb-0">
                    <Trans>Juste un rappel que vous avez un événement aujourd'hui</Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject mb-1"style={{color:"white"}}><Trans>Paramètres</Trans></h6>
                    <p className="text-muted ellipsis mb-0">
                    <Trans>Update dashboard</Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-link-variant text-warning"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject mb-1" style={{color:"white"}}><Trans>Administrateur de lancement</Trans></h6>
                    <p className="text-muted ellipsis mb-0">
                    <Trans>Nouvel administrateur wow</Trans>!
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <p className="p-3 mb-0 text-center" style={{color:"white"}}><Trans>Voir toutes les notifications</Trans></p>

              </Dropdown.Menu>
            </Dropdown>
            <Dropdown alignRight as="li" className="nav-item">
              <Dropdown.Toggle as="a" className="nav-link cursor-pointer no-caret">
                <div className="navbar-profile">
                  <img className="img-xs rounded-circle" src={srcF} alt="profile" />
                  <p className="mb-0 d-none d-sm-block navbar-profile-name"><Trans>{(JSON.parse(sessionStorage.getItem('user')))?JSON.parse(sessionStorage.getItem('user')).nom:"user"}</Trans></p>
                  <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
                <h6 className="p-3 mb-0" style={{color:"white"}}><Trans>Profile</Trans></h6>
                <Dropdown.Divider />
                <Dropdown.Item  onClick={this.bb} className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1"><Trans>Paramètres</Trans></p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={this.out}
                   className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                  <p className="preview-subject mb-1"><Trans>Se déconnecter</Trans></p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <p className="p-3 mb-0 text-center"><Trans>paramètres avancées</Trans></p>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas}>
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default withRouter (Navbar)