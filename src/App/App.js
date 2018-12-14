import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
// import { Button } from 'reactstrap';
import Auth from '../components/Auth/auth';
import MyNavBar from '../components/MyNavbar/MyNavBar';
import Profile from '../components/Profile/profile';
import Commits from '../components/CommitsData/commitsData';
import connection from '../helpers/data/connection';
import './App.scss';
import authRequests from '../helpers/data/authRequests';

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };
    if (!this.state.authed) {
      return (
        <div className="App">
        <MyNavBar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
        <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      );
    }
    return (
      <div className="App">
        <MyNavBar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
        <Profile />
        <Commits />
        </div>
    );
  }
}

export default App;