import React from 'react';
import PropTypes from 'prop-types';
import tutorialShapes from '../../helpers/propz/tutorialShapes';
import './TutorialItems.scss';
import authRequests from '../../helpers/data/authRequests';

class TutorialItems extends React.Component {
  static propTypes = {
    tutorial: tutorialShapes,
    deleteSingleListing: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleTutorial, tutorial } = this.props;
    deleteSingleTutorial(tutorial.id);
  }

  render() {
    const { tutorial } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (tutorial.uid === uid) {
        return (
        <div>
          <span className="col">
          <button className="btn btn-default" onClick={this.deleteEvent}>
          <i className="fas fa-trash-alt"></i>
          </button></span>
        </div>
        );
      }
      return <span className="col-3"></span>;
    };
    return (
      <li className="tutorial-item text-center">
        <span className="col">{tutorial.name}</span>
        {/* <span className="col-3">{tutorial.uid}</span> */}
        <span className="col"><a href={tutorial.url} target="_blank">Link</a></span>
        {makeButtons()}
      </li>
    );
  }
}

export default TutorialItems;
