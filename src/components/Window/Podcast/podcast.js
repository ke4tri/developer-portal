import React from 'react';
import PropTypes from 'prop-types';
import podcastShapes from '../../../helpers/propz/resourceShapes';
import PodcastItems from '../../PodcastItems/PodcastItems';
import './podcast.scss';

class Podcasts extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(podcastShapes),
    deleteSinglePodcast: PropTypes.func,
    passListingToEdit: PropTypes.func,
  }

  render() {
    const {
      podcasts,
      deleteSinglePodcast,
      passListingToEdit,
    } = this.props;
    const podcastItemComponents = podcasts.map(podcast => (
      <PodcastItems
        podcast={podcast}
        key={podcast.id}
        deleteSinglePodcast={deleteSinglePodcast}
        passListingToEdit={passListingToEdit}
        />
    ));

    return (
      <div className="podcast col">
        <ul>
          {podcastItemComponents}
        </ul>
      </div>
    );
  }
}

export default Podcasts;
