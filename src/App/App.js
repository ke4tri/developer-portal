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
import Tutorials from '../components/Window/Tutorials/tutorials';
import Blogs from '../components/Window/Blogs/blogs';
import Resources from '../components/Window/Resourc/resources';
import Podcasts from '../components/Window/Podcast/podcast';
import connection from '../helpers/data/connection';
import getRequest2 from '../helpers/data/tutorialRequest';
import getRequest3 from '../helpers/data/blogRequests';
import getRequest4 from '../helpers/data/resourcesRequest';
// import tutorialRequests from '../helpers/data/tutorialRequest';
import Form from '../components/Form/Form';
import './App.scss';
import authRequests from '../helpers/data/authRequests';

class App extends Component {
  state = {
    authed: false,
    tutorials: [],
    blogs: [],
    resources: [],
    isEditing: false,
    editId: '-1',
    selectedListingId: -1,
  }

  listingSelectEvent = (id) => {
    this.setState({
      selectedListingId: id,
    });
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
    getRequest3.getRequest()
      .then((blogs) => {
        this.setState({ blogs });
      })
      .catch(err => console.error('err with blogs GET', err));

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
    getRequest4.getRequest()
      .then((resources) => {
        this.setState({ resources });
      })
      .catch(err => console.error('err with blogs GET', err));

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

  formSubmitEvent = (newListing) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      getRequest2.putRequest(editId, newListing)
        .then(() => {
          getRequest2.getRequest()
            .then((tutorials) => {
              this.setState({ tutorials, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with listing post', err));
    } else {
      getRequest2.postRequest(newListing)
        .then(() => {
          getRequest2.getRequest()
            .then((tutorials) => {
              this.setState({ tutorials });
            });
        })
        .catch(err => console.error('error with listing post', err));
    }
  }

  passListingToEdit = tutorialId => this.setState({ isEditing: true, editId: tutorialId });


  render() {
    const {
      authed,
      isEditing,
      editId,
      // selectedListingId,
    } = this.state;

    // eslint-disable-next-line max-len
    // const selectedListing = listings.find(listing => listing.id === selectedListingId) || { nope: 'nope' };

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };
    if (!authed) {
      return (
        <div className="App">
        <MyNavBar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
        <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      );
    }
    return (
      <div className="App">
      <MyNavBar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
      <div><TutorialsCrud /></div>
      <div className="formPrint">
        <Form onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId}/>
      </div>
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
          <Blogs
          blogs={this.state.blogs}
          deleteSingleBlog={this.deleteOne}
          />
        </TabPane>
        <TabPane tabId="3">
          <Resources
          resources={this.state.resources}
          deleteSingleBlog={this.deleteOne}
          />
        </TabPane>
        <TabPane tabId="4">
          <Podcasts />
        </TabPane>
      </TabContent>
    </div>
    </div>
    );
  }
}

export default App;
