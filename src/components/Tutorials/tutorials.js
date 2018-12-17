import React from 'react';
import PropTypes from 'prop-types';
import tutorialShapes from '../../helpers/propz/tutorialShapes';
import TutorialItems from '../TutorialItems/TutorialItems';
import './tutorials.scss';

class Tutorials extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(tutorialShapes),
    deleteSingleTutorial: PropTypes.func,
  }

  render() {
    const { tutorials, deleteSingleTutorial } = this.props;
    const tutorialItemComponents = tutorials.map(tutorial => (
      <TutorialItems
        tutorial={tutorial}
        key={tutorial.id}
        deleteSingleTutorial={deleteSingleTutorial}
        />
    ));
    return (
      <div className="tutorials2 col">
        <h2>Tutorials</h2>
        <ul>
          {tutorialItemComponents}
        </ul>
      </div>
    );
  }
}

export default Tutorials;
