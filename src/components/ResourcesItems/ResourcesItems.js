import React from 'react';
import PropTypes from 'prop-types';
// import tutorialShapes from '../../helpers/propz/tutorialShapes';
import resourceShapes from '../../helpers/propz/blogShapes';
import './ResourcesItems.scss';
import authRequests from '../../helpers/data/authRequests';

class ResourcesItems extends React.Component {
  static propTypes = {
    resource: resourceShapes,
    deleteSingleResource: PropTypes.func,
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passListingToEdit, resource } = this.props;
    passListingToEdit(resource.id);
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleResource, resource } = this.props;
    deleteSingleResource(resource.id);
  }

  render() {
    const { resource } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (resource.uid === uid) {
        return (
        <div>
          <span className="col">
          <button className="btn btn-default" onClick={this.deleteEvent}>
          <i className="fas fa-trash-alt"></i>
          </button>
          </span>
          <span className="col">
          <input type="radio" id="radio2" name="radioDisabled" id="radioBlogs" className="custom-Radio-Blogs" />
          <label className="blogsLabel" for="radioBlogs">DONE</label>
          </span>
        </div>
        );
      }
      return <span className="col-3"></span>;
    };
    return (
      <li className="tutorial-item text-center">
        <span className="col">{resource.name}</span>
        {/* <span className="col-3">{tutorial.uid}</span> */}
        <span className="col"><a href={resource.url} target="_blank">Link</a></span>
        {makeButtons()}
      </li>
    );
  }
}

export default ResourcesItems;
