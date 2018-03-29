//react router logic
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';//assign all actions we created to actions

import Header from './header';
import Landing from './landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends Component  {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return(
      <div className="container">
        {/* Howdy howdy! */}
        <BrowserRouter>
          <div>
            {/* exact means only the / and not as part of /surveys or other paths */}
            <Header />
            <Route exact={true} path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);