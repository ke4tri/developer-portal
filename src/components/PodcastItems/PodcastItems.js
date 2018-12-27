import React from 'react';
import PropTypes from 'prop-types';
// import tutorialShapes from '../../helpers/propz/tutorialShapes';
import podcastShapes from '../../helpers/propz/podcastShapes';
import './PodcastItems.scss';
import authRequests from '../../helpers/data/authRequests';

class PodcastItems extends React.Component {
  static propTypes = {
    podcast: podcastShapes,
    deleteSingleListingPodcast: PropTypes.func,
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passListingToEditPodcast, podcast } = this.props;
    passListingToEditPodcast(podcast.id);
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSinglePodcast, podcast } = this.props;
    deleteSinglePodcast(podcast.id);
  }

  render() {
    const { podcast } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (podcast.uid === uid) {
        return (
        <div>
          <span className="col">
          <button className="btn btn-default" onClick={this.deleteEvent}>
          <i className="fas fa-trash-alt"></i>
          </button>
          </span>
          <span className="col">
          <input type="radio" id="radio2" name="radioDisabled" id="radioBlogs" className="custom-Radio-Blogs" />
          <label className="blogsLabel" htmlFor="radioBlogs">DONE</label>
          </span>
        </div>
        );
      }
      return <span className="col-3"></span>;
    };
    return (
      <li className="tutorial-item text-center">
        <span className="col">{podcast.name}</span>
        {/* <span className="col-3">{tutorial.uid}</span> */}
        <span className="col"><a href={podcast.url} target="_blank">Link</a></span>
        {makeButtons()}
      </li>
    );
  }
}

export default PodcastItems;
