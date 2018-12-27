import React from 'react';
import PropTypes from 'prop-types';
import tutorialShapes from '../../../helpers/propz/tutorialShapes';
import TutorialItems from '../../TutorialItems/TutorialItems';
import './tutorials.scss';

class Tutorial extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(tutorialShapes),
    deleteSingleTutorial: PropTypes.func,
    passListingToEdit: PropTypes.func,
  }

  render() {
    const {
      tutorials,
      deleteSingleTutorial,
      passListingToEdit,
    } = this.props;
    const tutorialItemComponents = tutorials.map(tutorial => (
      <TutorialItems
        tutorial={tutorial}
        key={tutorial.id}
        deleteSingleTutorial={deleteSingleTutorial}
        passListingToEdit={passListingToEdit}
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

export default Tutorial;
