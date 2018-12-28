import React from 'react';
// import PropTypes from 'prop-types';
import './profile.scss';
// import tutorialShapes from '../../helpers/propz/tutorialShapes';

// Git Hub Profile Component //
class Profile extends React.Component {
  render() {
    const { profile } = this.props;
    return (
      <div>
        <div>
          <h2>hello</h2>
        </div>
      </div>
      // <div className="profile col-3 mt-5">
      //   <div className="card">
      //     {/* <img className="img-fluid" src={profile.avatar_url} alt="github pic"></img> */}
      //     <h2 className="card-title">{profile.login}</h2>
      //     <p className="card-text">{profile.bio}</p>
      //     <a href={profile.html_url} className="_blank">github.com/jonathanpmohan</a>
      //   </div>
      // </div>
    );
  }
}

export default Profile;
