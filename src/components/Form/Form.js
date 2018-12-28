/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
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
    selectedOption: 'tutorial',
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempListing = { ...this.state.newListing };
    tempListing[name] = e.target.value;
    this.setState({ newListing: tempListing });
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value,
    });
  }
  // These two below are what gets the messages in the input fields

  discriptionChange = e => this.formFieldStringState('name', e);

  urlChange = e => this.formFieldStringState('url', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myForm = { ...this.state.newListing };
    const myBullet = this.state.selectedOption;
    myForm.uid = authRequests.getCurrentUid();
    onSubmit(myForm, myBullet);
    this.setState({ newListing: defaultListing });
  }

  render() {
    const { newListing } = this.state;
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
        <input type="radio" value="tutorials"
                      checked={this.state.selectedOption === 'tutorials'}
                      onChange={this.handleOptionChange} />
        Tutorials
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="blog"
                      checked={this.state.selectedOption === 'blog'}
                      onChange={this.handleOptionChange} />
        Blogs
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="resource"
                      checked={this.state.selectedOption === 'resource'}
                      onChange={this.handleOptionChange} />
        Resources
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="podcast"
                      checked={this.state.selectedOption === 'podcast'}
                      onChange={this.handleOptionChange} />
        Podcast
      </label>
    </div>
        <div>
          <button className="addButton btn btn-danger ml-4" type="submit">+</button>
        </div>
        </form>
      </div>
    );
  }
}

export default Form;
