import React from 'react';
// import PropTypes from 'prop-types';
import tutorialShapes from '../../helpers/propz/tutorialShapes';
import './TutorialItems.scss';
// import authRequests from '../../helpers/data/authRequests';

class TutorialItems extends React.Component {
  static propTypes = {
    tutorial: tutorialShapes,
  }

  render() {
    const { tutorial } = this.props;
    // const uid = authRequests.getCurrentUid();

    return (
      <div className="profile">
        <h2>TutorialItems</h2>
        <span className="col-7">{tutorial.name}</span>
        <span className="col-3">{tutorial.uid}</span>
        <span className="col-3">{tutorial.url}</span>
      </div>
    );
  }
}

export default TutorialItems;
