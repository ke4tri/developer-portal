/* eslint-disable no-undef */
import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import Auth from '../components/Auth/auth';
import MyNavBar from '../components/MyNavbar/MyNavBar';
import Profile from '../components/Profile/profile';
// import TutorialsCrud from '../components/TutorialsCrud/tutorialsCrud';
import Tutorial from '../components/Window/Tutorials/tutorials';
import Blogs from '../components/Window/Blogs/blogs';
import Resources from '../components/Window/Resourc/resources';
import Podcasts from '../components/Window/Podcast/podcast';
import connection from '../helpers/data/connection';
import tutorials from '../helpers/data/tutorialRequest';
import blog from '../helpers/data/blogRequests';
import resource from '../helpers/data/resourcesRequest';
import podcast from '../helpers/data/podcastRequest';
import githubData from '../helpers/data/githubData';
// import getUser from '../helpers/data/githubData';
import Form from '../components/Form/Form';
import './App.scss';
import authRequests from '../helpers/data/authRequests';

class App extends Component {
  state = {
    authed: false,
    githubUsername: '',
    githubToken: '',
    commitCount: 0,
    allItems: [],
    tutorials: [],
    blogs: [],
    resources: [],
    profile: [],
    podcasts: [],
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

  getGithubData = (users, gitHubTokenStorage) => {
    githubData.getUser(gitHubTokenStorage)
      .then((profile) => {
        this.setState({ profile });
      });
    githubData.getUserEvents(users, gitHubTokenStorage)
      .then((commitCount) => {
        this.setState({ commitCount });
      })
      .catch(err => console.error('error with github user events GET', err));
  }

  getAllItems = () => {
    const uid = authRequests.getCurrentUid();
    itemData.getAllItemsData(uid)
      .then((allItems) => {
        this.setState({ allItems });
      });
  }

  conponentDidUpdate() {
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const users = sessionStorage.getItem('githubUsername');
        const gitHubTokenStorage = sessionStorage.getItem('githubToken');
        // this.displayView(this.state.view);
        const allItems = this.getAllItems();
        this.getGithubData(users, gitHubTokenStorage);
        this.setState({
          authed: true,
          githubUsername: users,
          githubToken: gitHubTokenStorage,
          allItems,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });

    tutorials.getRequest()
      .then((tutorials) => {
        this.setState({ tutorials });
      })
      .catch(err => console.error('err with tutorials GET', err));

    blog.getRequest()
      .then((blogs) => {
        this.setState({ blogs });
      })
      .catch(err => console.error('err with blogs GET', err));

    resource.getRequest()
      .then((resources) => {
        this.setState({ resources });
      })
      .catch(err => console.error('err with resources GET', err));

    podcast.getRequest()
      .then((podcasts) => {
        this.setState({ podcasts });
      })
      .catch(err => console.error('err with podcast GET', err));
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = (user, accessToken) => {
    this.setState({
      authed: true,
      githubUsername: user,
      githubToken: accessToken,
    });
    sessionStorage.setItem('githubUsername', user);
    sessionStorage.setItem('githubToken', accessToken);
  }

  deleteOne = (tutorialId) => {
    tutorials.deleteTutorial(tutorialId)
      .then(() => {
        tutorials.getRequest()
          .then((tutorials) => {
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error('error with delete single tutorial', err));
  }

  deleteTwo = (blogId) => {
    blog.deleteBlog(blogId)
      .then(() => {
        blog.getRequest()
          .then((blogs) => {
            this.setState({ blogs });
          });
      })
      .catch(err => console.error('error with delete single blog', err));
  }

  deleteThree = (resourcesId) => {
    resource.deleteResources(resourcesId)
      .then(() => {
        resource.getRequest()
          .then((resources) => {
            this.setState({ resources });
          });
      })
      .catch(err => console.error('error with delete single blog', err));
  }

  deleteFour = (podcastId) => {
    podcast.deletePodcast(podcastId)
      .then(() => {
        podcast.getRequest()
          .then((podcasts) => {
            this.setState({ podcasts });
          });
      })
      .catch(err => console.error('error with delete single blog', err));
  }


  formSubmitEvent = (newListing, tab) => {
    if (tab === 'tutorials') {
      tutorials.postRequest(newListing)
        .then(() => {
          tutorials.getRequest()
          // eslint-disable-next-line no-shadow
            .then((tutorials) => {
              this.setState({ tutorials });
            });
        })
        .catch(err => console.error('error with tutorial post', err));
    } else if (tab === 'blog') {
      blog.postRequestBlog(newListing)
        .then(() => {
          blog.getRequest()
          // eslint-disable-next-line no-shadow
            .then((blogs) => {
              this.setState({ blogs });
            });
        })
        .catch(err => console.error('error with blogs post', err));
    } else if (tab === 'resource') {
      resource.postRequestResources(newListing)
        .then(() => {
          resource.getRequest()
          // eslint-disable-next-line no-shadow
            .then((resources) => {
              this.setState({ resources });
            });
        })
        .catch(err => console.error('error with blogs post', err));
    } else if (tab === 'podcast') {
      podcast.postRequestPodcast(newListing)
        .then(() => {
          podcast.getRequest()
          // eslint-disable-next-line no-shadow
            .then((podcasts) => {
              this.setState({ podcasts });
            });
        })
        .catch(err => console.error('error with blogs post', err));
    }
  }

  // passListingToEdit = tutorialId => this.setState({ isEditing: true, editId: tutorialId });

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
      sessionStorage.clear();
      this.setState({ authed: false, githubUsername: '', githubToken: '' });
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
      {/* The below TutorialCrud is the form built for the radio buttons from Form.js */}
      <div className="wrapper">
      <div className="profile">
      { authed && <Profile profile={this.state.profile}/> }
      </div>
      <div className="formPrint">
      {/* The below Form is just for the window display of tabs */}
        <Form className="form" onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId}/>
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
        <Tutorial
            tutorials={this.state.tutorials}
            deleteSingleTutorial={this.deleteOne}
              />
        </TabPane>
        <TabPane tabId="2">
          <Blogs
          blogs={this.state.blogs}
          deleteSingleBlog={this.deleteTwo}
          />
        </TabPane>
        <TabPane tabId="3">
          <Resources
          resources={this.state.resources}
          deleteSingleResource={this.deleteThree}
          />
        </TabPane>
        <TabPane tabId="4">
          <Podcasts
          podcasts={this.state.podcasts}
          deleteSinglePodcast={this.deleteFour}
          />
        </TabPane>
      </TabContent>
      </div>
    </div>
    </div>
    );
  }
}

export default App;
