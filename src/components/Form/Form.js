/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import getSingleTutorial2 from '../../helpers/data/tutorialRequest';
import './Form.scss';

const defaultListing = {
  name: '',
  url: '',
  uid: '',
};


class Form extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
  }

  state = {
    newListing: defaultListing,
    selectedOption: 'option1',
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempListing = { ...this.state.newListing };
    tempListing[name] = e.target.value;
    this.setState({ newListing: tempListing });
  }

  // Use if not a string below
  // formFieldNumberState = (name, e) => {
  //   const tempListing = { ...this.state.newListing };
  //   tempListing[name] = e.target.value * 1;
  //   this.setState({ newListing: tempListing });
  // }

  discriptionChange = e => this.formFieldStringState('name', e);

  urlChange = e => this.formFieldStringState('url', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myForm = { ...this.state.newListing };
    myForm.uid = authRequests.getCurrentUid();
    onSubmit(myForm);
    this.setState({ newListing: defaultListing });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      getSingleTutorial2.getSingleTutorial(editId)
        .then((listing) => {
          this.setState({ newListing: listing.data });
        })
        .catch(err => console.error('error with getSingleTutorial', err));
    }
  }

  handleOptionChange(changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value,
    });
  }

  render() {
    const { newListing } = this.state;
    const { isEditing } = this.props;
    const title = () => {
      if (isEditing) {
        return <h2>Edit Listing:</h2>;
      }
      return <h2>Add New Listing:</h2>;
    };
    return (
      <div className="form">
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1"></label>
            <input
              type="text"
              className="form-discription"
              id="discription"
              aria-describedby="emailHelp"
              placeholder="Enter Disctiption"
              value={newListing.address}
              onChange={this.discriptionChange}
            />
            <label className="ml-3" htmlFor="exampleInputEmail1"></label>
            <input
              type="text"
              className="form-url"
              id="url"
              aria-describedby="emailHelp"
              placeholder="Link"
              value={newListing.url}
              onChange={this.urlChange}
            />
          </div>
          <div className="radio">
      <label>
        <input type="radio" value="option1"
                      checked={this.state.selectedOption === 'option1'}
                      onChange={this.handleOptionChange} />
        Tutorials
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="option2"
                      checked={this.state.selectedOption === 'option2'}
                      onChange={this.handleOptionChange} />
        Blogs
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="option3"
                      checked={this.state.selectedOption === 'option3'}
                      onChange={this.handleOptionChange} />
        Resources
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="option4"
                      checked={this.state.selectedOption === 'option4'}
                      onChange={this.handleOptionChange} />
        Podcast
      </label>
    </div>
        {/* <div className="crudWrap">
          <div className="custom-radio">
            <input type="radio" id="radio1" name="radioDisabled" className="custom-Radio-Tutorials" checked={true} />
            <label className="tutorialsLabel" htmlFor="radioBlogs">Tutorials</label>
          </div>

          <div className="custom-control custom-radio">
            <input type="radio" id="radio2" name="radioDisabled" id="radioBlogs" className="custom-Radio-Blogs" />
            <label className="blogsLabel" htmlFor="radioBlogs">Blogs</label>
          </div>

          <div className="custom-control custom-radio">
            <input type="radio" id="radio3" name="radioDisabled" id="radioPodcast" className="custom-Radio-Podcast" />
            <label className="podcastLabel" htmlFor="radioPodcast">Podcast</label>
          </div>

          <div className="custom-control custom-radio">
            <input type="radio" id="radio4" name="radioDisabled" id="radioResourc" className="custom-Radio-Resourc" />
            <label className="resurcLabel" htmlFor="radioResourc">Resources</label>
          </div>
        </div> */}
        <div>
          <button className="addButton btn btn-danger ml-4" type="submit">+</button>
        </div>
        </form>
      </div>
    );
  }
}

export default Form;
