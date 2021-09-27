import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { FcSettings,FcSalesPerformance,FcViewDetails ,FcCalendar,FcSafe,FcCalculator} from "react-icons/fc";

class Sidebar extends Component {
  
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true}); 
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  }

  render () {
    var srcF
if(JSON.parse(sessionStorage.getItem('user'))) srcF = "http://localhost:3001/"+JSON.parse(sessionStorage.getItem('user')).photo
else srcF = '../../assets/images/faces/face15.jpg'
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar" style={{minHeight: '100vh',
      maxHeight: "100hv"}}>
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="#"><img src={require('../../assets/images/farm.svg')} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini" href="#"><img src={require('../../assets/images/f.svg')} alt="logo" /></a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img className="img-xs rounded-circle " src={srcF} alt="profile" />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal" style={{color:"white"}}><Trans>{(JSON.parse(sessionStorage.getItem('user')))?JSON.parse(sessionStorage.getItem('user')).nom:"user"}</Trans></h5>
                  <span><Trans>Gold Member</Trans></span>
                </div>
              </div>
              <Dropdown alignRight>
                <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                  <i className="mdi mdi-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sidebar-dropdown preview-list">
                  <a className="dropdown-item preview-item" onClick={evt =>{
                    this.props.history.push(
                      {
                        pathname: "/basic-ui/buttons",
                    })
                  }}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Réglages</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                 
                  <div className="dropdown-divider"></div>
                 
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>Navigation</Trans></span>
          </li>
          <li className={ this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/basic-ui') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('basicUiMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <FcSettings/>
              </span>
              <span className="menu-title"><Trans>Configuration</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.basicUiMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link' } to="/basic-ui/buttons"><Trans>Mon profil</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link' } to="/basic-ui/dropdowns"><Trans>Machinerie</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link' } to="/basic-ui/typography"><Trans>Exploitations Animal</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/exploitationVeg') ? 'nav-link active' : 'nav-link' } to="/basic-ui/exploitationVeg"><Trans>Exploitations vegetale</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/Personnel') ? 'nav-link active' : 'nav-link' } to="/basic-ui/Personnel"><Trans>Personnel</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/Produits') ? 'nav-link active' : 'nav-link' } to="/basic-ui/Produits"><Trans>Produits</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/Travail') ? 'nav-link active' : 'nav-link' } to="/basic-ui/Travail"><Trans>Travail</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/Traitement') ? 'nav-link active' : 'nav-link' } to="/basic-ui/Traitement"><Trans>Traitement</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/form-elements') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('formElementsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
              <FcViewDetails/>
              </span>
              <span className="menu-title"><Trans>Opérations</Trans></span>
              
            </div>
            <Collapse in={ this.state.formElementsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link' } to="/form-elements/basic-elements"><Trans>Opérations</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/tables') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('tablesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
              <FcSalesPerformance/>
              </span>
              <span className="menu-title"><Trans>Coûts</Trans></span>
              
            </div>
            <Collapse in={ this.state.tablesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/tables/basic-table') ? 'nav-link active' : 'nav-link' } to="/tables/basic-table"><Trans>Prix</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/tables/TableAmortisement') ? 'nav-link active' : 'nav-link' } to="/tables/TableAmortisement"><Trans>Coûts fixes</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/charts') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('chartsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <FcCalendar/>
              </span>
              <span className="menu-title"><Trans>Calendrier</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.chartsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/charts/mdi') ? 'nav-link active' : 'nav-link' } to="/charts/mdi"><Trans>Calendrier</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/icons') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('iconsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
              <FcSafe/>
              </span>
              <span className="menu-title"><Trans>Stock</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.iconsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  
                  <li className="nav-item"> <Link className={ this.isPathActive('/icons/stock') ? 'nav-link active' : 'nav-link' } to="/icons/stock"><Trans>stock</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
         
          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>Et plus</Trans></span>
          </li>
          <li className={ this.isPathActive('/error-pages') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('errorPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <FcCalculator/>
              </span>
              <span className="menu-title"><Trans>Résultats vég</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.errorPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/RaportResult') ? 'nav-link active' : 'nav-link' } to="/error-pages/RaportResult"><Trans>Raport des Résultats végétal</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/user-pages') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('userPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <FcCalculator/>
              </span>
              <span className="menu-title"><Trans>Résultats Animal</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.userPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                
                  <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/RaportResultAnn') ? 'nav-link active' : 'nav-link' } to="/user-pages/RaportResultAnn"><Trans>Raport des Résultats animal</Trans></Link></li>

                </ul>
              </div>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);