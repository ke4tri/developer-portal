import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
// import { Button } from 'reactstrap';
import Auth from '../components/Auth/auth';
import MyNavBar from '../components/MyNavbar/MyNavBar';
import Profile from '../components/Profile/profile';
import Commits from '../components/CommitsData/commitsData';
import TutorialsCrud from '../components/TutorialsCrud/tutorialsCrud';
import Tutorials from '../components/Tutorials/tutorials';
import Tabs from '../components/Tabs/tabs';
import connection from '../helpers/data/connection';
import getRequest2 from '../helpers/data/tutorialRequest';

import './App.scss';
import authRequests from '../helpers/data/authRequests';

class App extends Component {
  state = {
    authed: false,
    tutorials: [],
  }

  componentDidMount() {
    connection();

    getRequest2.getRequest()
      .then((tutorials) => {
        this.setState({ tutorials });
      })
      .catch(err => console.error('err with tutorials GET', err));

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

  deleteOne = (tutorialId) => {
    getRequest2.deleteTutorial(tutorialId)
      .then(() => {
        getRequest2.getRequest()
          .then((tutorials) => {
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error('error with delete single', err));
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
        <Tabs />
        <TutorialsCrud />
        <Tutorials
        tutorials={this.state.tutorials}
        deleteSingleTutorial={this.deleteOne}
        />
        </div>
    );
  }
}

export default App;
