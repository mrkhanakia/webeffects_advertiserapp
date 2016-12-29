import React from 'react'
import { render } from 'react-dom'
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router'


import Env from './env.json'

window.ReactDom = ReactDom;
window.React = React;
window.Env = Env;

console.log(window.Env)

import {
    AppContainer,
    LoginContainer,
    ResetlinkContainer,
    ForgetpasswordContainer,
    ChangepasswordContainer,
    ProjectOverviewContainer,
    ProjectContainer
} from './containers';


import configureStore from './store/configureStore.dev.js';

import {store} from './store/index.js';
// const store = configureStore();
// window.store = store;

import {ROOT_HOST} from './config.js'

// // import Auth from './src/helpers/auth.js'
import RequireAuth from './containers/RequireAuth';

// import Localstore from './src/helpers/localstore.js'


// import {language} from './src/lang/index.js';
// window.lang = language.en;

// If user is on Root URL then render Find My Organization page

	render((
		<Provider store={store}>
		  <Router history={hashHistory}>
    		<Route path="/" component={AppContainer}>
                <Route path="login" component={LoginContainer} />
                <Route path="resetlink" component={ResetlinkContainer} />
                <Route path="forgetpwd" component={ForgetpasswordContainer} />
    			<Route path="changepwd" component={ChangepasswordContainer} />
    			<Route path="dashboard" component={ProjectOverviewContainer} />

    			<Route path="projects/:projectId" component={ProjectContainer} />
    			<Route path="project/add" component={ProjectContainer} />
    		</Route>
    		
		    

		  
		  </Router>
		</Provider>  
	), document.getElementById('root'))

