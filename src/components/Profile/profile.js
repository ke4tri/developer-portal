import React from 'react';
import './profile.scss';

class Profile extends React.Component {
  render() {
    const { profile, commits } = this.props;

    return (
      <div className="profile col-3 mt-5">
      <h2 className="card-title"> Profile </h2>
      <h2>{commits}</h2>
        <div className="card">
          <img className="img-fluid" src={profile.avatar_url} alt="github pic"></img>
          <h2 className="card-title">{profile.login}</h2>
          <p className="card-text">{profile.bio}</p>
          <a href={profile.html_url} className="_blank">github.com/jonathanpmohan</a>
        </div> 
      </div>
    );
  }
}

export default Profile;
