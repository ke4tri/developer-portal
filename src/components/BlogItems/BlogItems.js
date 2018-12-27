import React from 'react';
import PropTypes from 'prop-types';
// import tutorialShapes from '../../helpers/propz/tutorialShapes';
import blogShapes from '../../helpers/propz/blogShapes';
import './BlogItems.scss';
import authRequests from '../../helpers/data/authRequests';

class BlogItems extends React.Component {
  static propTypes = {
    blog: blogShapes,
    deleteSingleBlog: PropTypes.func,
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passListingToEdit, blog } = this.props;
    passListingToEdit(blog.id);
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleBlog, blog } = this.props;
    deleteSingleBlog(blog.id);
  }

  render() {
    const { blog } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (blog.uid === uid) {
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
        <span className="col">{blog.name}</span>
        {/* <span className="col-3">{tutorial.uid}</span> */}
        <span className="col"><a href={blog.url} target="_blank">Link</a></span>
        {makeButtons()}
      </li>
    );
  }
}

export default BlogItems;