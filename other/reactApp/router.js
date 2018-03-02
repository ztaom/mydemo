'use strict' //使用严格模式 

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexLink, browserHistory, hashHistory, IndexRoute } from 'react-router'

import Home from './module/home.jsx';
import About from './module/about.jsx';
import Contact from './module/contact.jsx';

import NavLink from './module/navlink.jsx';


class App extends React.Component {
   render() {
      return (
         <div>
            <ul>
               <li><IndexLink to='/' activeClassName="active">Index</IndexLink></li>
                <li><NavLink to='home'>Home</NavLink></li>
                <li><NavLink to='about'>About</NavLink></li>
                <li><NavLink to='contact'>Contact</NavLink></li>
            </ul>
           {this.props.children}
         </div>
      )
   }
}
export default App;

ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
      <IndexRoute component = {Home} />
        <Route path = "home" component = {Home} />
        <Route path = "about" component = {About} />
        <Route path = "contact" component = {Contact} />
      </Route>
   </Router>
   
), document.getElementById('app'))