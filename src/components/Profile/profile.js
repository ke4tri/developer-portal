import React from 'react';
import './profile.scss';

class Profile extends React.Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="profile col">
        <div className="profileWrap">
        <h2>Profile</h2>
        <div className="card">
          <img className="img-fluid" src={profile.avatar_url} alt="github pic"></img>
          <p className="card-text">{profile.bio}</p>
          <h2 className="card-title">{profile.login}</h2>
          <a href={profile.html_url} className="_blank">https://github.com/ke4tri</a>
          <br/>
          <br/>
          <h6>commits</h6>
          <p>in the last 5 days</p>
        </div>
        </div>
      </div>
    );
  }
}

export default Profile;
