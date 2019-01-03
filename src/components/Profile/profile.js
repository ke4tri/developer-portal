import React from 'react';
import './profile.scss';

class Profile extends React.Component {
  render() {
    const { profile, commitCount } = this.props;
    return (
      <div className="profile col">
      <div className="profileWrap">
      <h2>Profile</h2>
      {/* <h2>{profile.bio}</h2> */}
        <h6>commits</h6>
        <p>in the last 5 days</p>
        <h1>{commitCount}</h1>
      </div>
      </div>
    );
  }
}

export default Profile;
