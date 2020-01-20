import React, {Component} from "react";
import Layout from "../hoc/layout/layout";
import Quiz from "../../containers/quiz/quiz";
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import './app.css';
import QuizCreator from "../../containers/quiz-creator/quiz-creator";
import QuizList from "../../containers/quiz-list/quiz-list";
import Auth from "../../containers/auth/auth";
import {connect} from 'react-redux'
import Logout from "../logout/logout";
import {autoLogin} from "../../store/actions/auth";

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/' exact component={QuizList}/>
        <Redirect to='/'/>
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator}/>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' exact component={QuizList}/>
          <Redirect to='/'/>
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.token
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

