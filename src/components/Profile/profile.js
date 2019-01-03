import React from 'react';
// import PropTypes from 'prop-types';
import './profile.scss';

class Profile extends React.Component {
  // static propTypes = {
  //   profile: PropTypes.array,
  // }

  render() {
    const { profile, commitCount } = this.props;
    return (
      <React.Fragment>
      <div className="profile col">
      <div className="profileWrap">
      <h2>Profile</h2>
      <h2>{profile.bio}</h2>
        <h6>commits</h6>
        <p>in the last 5 days</p>
        <h1>{commitCount}</h1>
      </div>
      </div>
      </React.Fragment>
    );
  }
}

export default Profile;
