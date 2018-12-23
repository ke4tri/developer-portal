import React from 'react';
import PropTypes from 'prop-types';
import tutorialShapes from '../../../helpers/propz/tutorialShapes';
import BlogItems from '../../BlogItems/BlogItems';
import './blogs.scss';

class Blogs extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(tutorialShapes),
    deleteSingleBlog: PropTypes.func,
    passListingToEdit: PropTypes.func,
  }

  render() {
    const {
      blogs,
      deleteSingleBlog,
      passListingToEdit,
    } = this.props;
    const blogItemComponents = blogs.map(blog => (
      <BlogItems
        blog={blog}
        key={blog.id}
        deleteSingleBlog={deleteSingleBlog}
        passListingToEdit={passListingToEdit}
        />
    ));

    return (
      <div className="blogs">
        <h2>Blogs HERE</h2>
        <ul>
          {blogItemComponents}
        </ul>
      </div>
    );
  }
}

export default Blogs;
