import React from 'react';
import './tabs.scss';

class Tabs extends React.Component {
  render() {
    return (
      <div className="tutorials col w-50 wrapTutorials">
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a class="nav-item nav-link active" id="nav-tutorials-tab" data-toggle="tab" href="#nav-tutorials" role="tab" aria-controls="nav-tutorials" aria-selected="true">Tutorials</a>
              <a class="nav-item nav-link" id="nav-blogs-tab" data-toggle="tab" href="#nav-blogs" role="tab" aria-controls="nav-blogs" aria-selected="false">Blogs</a>
              <a class="nav-item nav-link" id="nav-resources-tab" data-toggle="tab" href="#nav-resources" role="tab" aria-controls="nav-resources" aria-selected="false">Resources</a>
              <a class="nav-item nav-link" id="nav-podcasts-tab" data-toggle="tab" href="#nav-podcasts" role="tab" aria-controls="nav-podcasts" aria-selected="false">Podcasts</a>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-tutorials" role="tabpanel" aria-labelledby="nav-tutorials-tab">tutorials</div>
          <div class="tab-pane fade" id="nav-blogs" role="tabpanel" aria-labelledby="nav-blogs-tab">blogs</div>
          <div class="tab-pane fade" id="nav-resources" role="tabpanel" aria-labelledby="nav-resources-tab">resources</div>
          <div class="tab-pane fade" id="nav-podcasts" role="tabpanel" aria-labelledby="nav-podcasts-tab">podcasts</div>
        </div>
        <span></span>
        <span></span>
      </div>
    );
  }
}


export default Tabs;
