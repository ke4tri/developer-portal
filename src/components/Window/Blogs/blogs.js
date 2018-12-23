import React from 'react';
import PropTypes from 'prop-types';
import tutorialShapes from '../../../helpers/propz/tutorialShapes';

import './blogs.scss';

class Blogs extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(tutorialShapes),
    deleteSingleTutorial: PropTypes.func,
    passListingToEdit: PropTypes.func,
  }

  render() {
    return (
      <div className="blogs">
        <h2>Blogs HERE</h2>
      </div>
    );
  }
}

export default Blogs;
