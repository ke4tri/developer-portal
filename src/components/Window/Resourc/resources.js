import React from 'react';
import PropTypes from 'prop-types';
import resourceShapes from '../../../helpers/propz/resourceShapes';
import ResourceItems from '../../ResourcesItems/ResourcesItems';
import './resources.scss';

class Resources extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(resourceShapes),
    deleteSingleResource: PropTypes.func,
    passListingToEdit: PropTypes.func,
  }

  render() {
    const {
      resources,
      deleteSingleResource,
      passListingToEdit,
    } = this.props;
    const resourceItemComponents = resources.map(resource => (
      <ResourceItems
        resource={resource}
        key={resource.id}
        deleteSingleResource={deleteSingleResource}
        passListingToEdit={passListingToEdit}
        />
    ));

    return (
      <div className="resources">
        <h2>Resources</h2>
        <ul>
          {resourceItemComponents}
        </ul>
      </div>
    );
  }
}

export default Resources;
