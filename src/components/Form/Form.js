/* eslint-disable max-len */
import React from 'react';
import './Form.scss';

class Form extends React.Component {
  render() {
    return (
      <div className="form">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1"></label>
            <input type="text" class="form-discription" id="discription" aria-describedby="emailHelp" placeholder="Enter Disctiption" />
            <label className="ml-3"for="exampleInputEmail1"></label>
            <input type="text" class="form-url" id="url" aria-describedby="emailHelp" placeholder="Link" />
          </div>
        </form>
        <div className="crudWrap">
          <div className="custom-radio">
            <input type="radio" id="radio1" name="radioDisabled" class="custom-Radio-Tutorials" />
            <label className="tutorialsLabel" for="radioBlogs">Tutorials</label>
          </div>

          <div class="custom-control custom-radio">
            <input type="radio" id="radio2" name="radioDisabled" id="radioBlogs" class="custom-Radio-Blogs" />
            <label class="blogsLabel" for="radioBlogs">Blogs</label>
          </div>

          <div class="custom-control custom-radio">
            <input type="radio" id="radio3" name="radioDisabled" id="radioPodcast" class="custom-Radio-Podcast" />
            <label class="podcastLabel" for="radioPodcast">Podcast</label>
          </div>

          <div class="custom-control custom-radio">
            <input type="radio" id="radio4" name="radioDisabled" id="radioResourc" class="custom-Radio-Resourc" />
            <label class="resurcLabel" for="radioResourc">Resources</label>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
