import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Router, Route,browserHistory,IndexRoute} from 'react-router';
import LoginForm from './component/LoginForm';
import RegisterForm from './component/RegisterForm';
import adminLayout from './containers/admin/adminLayout'
import adminHome from './containers/admin/adminHome'

import 'react-s-alert/dist/s-alert-default.css';


ReactDOM.render(

    <Router history={browserHistory}>
        <Route exact path='/' component={App}/>
        <Route exact path='/login' component={LoginForm}/>
        <Route exact path='/register' component={RegisterForm}/>
        <Route path="admin" component={adminLayout} >
        <IndexRoute title="home" component={adminHome} />
        </Route>
    </Router>

, document.getElementById('root'));
