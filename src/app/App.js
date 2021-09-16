import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
import { withTranslation } from "react-i18next";

class App extends Component {
  constructor(props){

    super(props);
    this.state = {}
    
  }



  // async fetch_data() {
  //   var id1;
  //   if(this.state.userInfo){
  //      id1 = this.state.userInfo.id
  //      console.log("userInfo")
  //   }
  //   if(this.props.history.location.state){
  //     id1 = this.props.history.location.state.user.id
  //     console.log("history")
  //   }
  //   this.data = await fetch("http://localhost:3001/user", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       id: id1
  //     })}).then(response2 =>{
  //      if(response2.ok){
  //        return response2.json();
  //      }
  //      throw new Error('request failed');}, networkError => console.log(networkError))
  //      .then( responseJson2 =>{
  //        return responseJson2
 
  //       })
        
  //       //this.setState({userInfo:this.data}) 
  //       console.log("mn l fetch",this.data[0])
  //       this.setState({userInfo:this.data[0]})
  //       console.log(this.state)
  //      }
 
       
  //      componentWillUnmount(){
  //         clearInterval(this.intervalID);
          
  //       }

  
  componentDidMount() {    
    
    this.onRouteChanged();
  

       console.log(this.state)
       console.log('l app')
      }
    






  render () {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar  userInfo ={JSON.parse(sessionStorage.getItem('user'))}/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar  userInfo ={JSON.parse(sessionStorage.getItem('user'))}/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer /> : '';
    return (
      <div className="container-scroller">
        { sidebarComponent }
        <div className="container-fluid page-body-wrapper">
          { navbarComponent }
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes/>
            </div>
            { footerComponent }
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
    
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    console.log("mn l app",this.state)
    const { i18n } = this.props;
    const body = document.querySelector('body');

    

    
    if(this.props.location.pathname === '/dashboard') {
      if(this.props.history.location.state){
        sessionStorage.setItem('user', JSON.stringify(this.props.history.location.state.user));
        this.setState({userInfo:JSON.parse(sessionStorage.getItem('user'))})

        console.log("ha l app ",this.props.history.location.state)
        this.forceUpdate();
        
      }
    }


    if(this.props.location.pathname === '/layout/RtlLayout') {
      body.classList.add('rtl');
      i18n.changeLanguage('ar');
    }
    else {
      body.classList.remove('rtl')
      i18n.changeLanguage('en');
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/', '/user-pages/login-2', '/user-pages/register-1','/user-pages/pageAccueil', '/user-pages/register-2', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }

}

export default withTranslation()(withRouter(App));
