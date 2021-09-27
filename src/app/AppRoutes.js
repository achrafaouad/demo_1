import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';
import Register from './user-pages/Register';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));
const ExploitaionVeg = lazy(() => import('./basic-ui/ExploitaionVeg'));
const Personnel = lazy(() => import('./basic-ui/Personnel'));
const Produits = lazy(() => import('./basic-ui/Produits'));
const Travail = lazy(() => import('./basic-ui/Travail'));
const Traitement = lazy(() => import('./basic-ui/Traitement'));


const BasicElements = lazy(() => import('./form-elements/BasicElements'));
const NouvelleOperation = lazy(() => import('./form-elements/NouvelleOperation'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const Mdi = lazy(() => import('./charts/Mdi'));
const stock = lazy(() => import('./icons/stock'));

const TableAmortisement = lazy(() => import('./tables/TableAmortisement'));
const NouveauCout = lazy(() => import('./tables/NouveauCout'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));
const RaportResult = lazy(() => import('./error-pages/RaportResult'));
const RaportResultAnn = lazy(() => import('./user-pages/RaportResultAnn'));
const pageAccueil = lazy(() => import('./user-pages/pageAccueil'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
        <Route exact  path="/" component={ pageAccueil } />

          {JSON.parse(sessionStorage.getItem('user')) && <>
          <Route exact path="/dashboard" component={Dashboard}/>
          
          <Route  path="/user-pages/register-1" component={ Register1 } />
          <Route  path="/error-pages/RaportResult" component={ RaportResult } />
          <Route  path="/user-pages/RaportResultAnn" component={ RaportResultAnn } />
          <Route  path="/user-pages/pageAccueil" component={ pageAccueil } />
          <Route path="/basic-ui/buttons" component={Buttons}/>
           
          
          <Route path="/basic-ui/exploitationVeg" component={ ExploitaionVeg } />
          <Route path="/basic-ui/Produits" component={ Produits } />
          <Route path="/basic-ui/Personnel" component={ Personnel } />
          <Route path="/basic-ui/dropdowns" component={ Dropdowns } />
          <Route path="/basic-ui/typography" component={ Typography } />
          <Route path="/basic-ui/Travail" component={ Travail } />
          <Route path="/basic-ui/Traitement" component={ Traitement } />
          

          <Route path="/form-Elements/basic-elements" component={ BasicElements } />
          <Route path="/form-Elements/NouvelleOperation" component={ NouvelleOperation } />

          <Route path="/tables/basic-table" component={ BasicTable } />

          <Route path="/charts/mdi" component={ Mdi } />
          <Route path="/icons/stock" component={ stock } />

          <Route path="/tables/TableAmortisement" component={ TableAmortisement } />
          <Route path="/tables/NouveauCout" component={ NouveauCout } />
          </>
          }


          
              <Route exact path='/user-pages/login-2' component={ Login } />
              <Route  exact path="/user-pages/register-1" component={ Register1 } />
          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />


          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;

