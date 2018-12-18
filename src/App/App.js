import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
// import { Button } from 'reactstrap';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import Auth from '../components/Auth/auth';
import MyNavBar from '../components/MyNavbar/MyNavBar';
// import Profile from '../components/Profile/profile';
// import Commits from '../components/CommitsData/commitsData';
import TutorialsCrud from '../components/TutorialsCrud/tutorialsCrud';
import Tutorials from '../components/Tutorials/tutorials';
// import Tabs from '../components/Tabs/tabs';
import connection from '../helpers/data/connection';
import getRequest2 from '../helpers/data/tutorialRequest';

import './App.scss';
import authRequests from '../helpers/data/authRequests';

class App extends Component {
  state = {
    authed: false,
    tutorials: [],
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
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
      <div><TutorialsCrud /></div>
      <div className="tabby">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggle('1'); }}
          >
            Tutorials
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2' })}
            onClick={() => { this.toggle('2'); }}
          >
            Blogs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '3' })}
            onClick={() => { this.toggle('3'); }}
          >
            Resources
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '4' })}
            onClick={() => { this.toggle('4'); }}
          >
            Podcasts
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
        <Tutorials
            tutorials={this.state.tutorials}
            deleteSingleTutorial={this.deleteOne}
              />
        </TabPane>
        <TabPane tabId="2">
        <Row>
            <Col sm="12">
              <h4>Bio shit?</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <h4>Other shit?</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm="12">
              <h4>And again more shit</h4>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
    </div>
    // <div className="App">
    //   <MyNavBar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
    //   <Profile />
    //   <Commits />
    //   <Tabs />
    //   <TutorialsCrud />
    //   <Tutorials
    //   tutorials={this.state.tutorials}
    //   deleteSingleTutorial={this.deleteOne}
    //   />
    //   </div>
    );
  }
}

export default App;
