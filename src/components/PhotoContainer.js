import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
import { withRouter } from "react-router";

/*-------------------------------/
PHOTOCONTAINER STATEFUL COMPONENT
  displays all pictures in a list,
  from the fetched array
/-------------------------------*/

class PhotoContainer extends React.Component {

  // The pics array is stored in "this.state.pics".
  // The fetched pictures from the app.js file will be mapped out of their initial array, and loaded in this array.

  constructor() {
   super();

  this.state = {
    pics : [],
    };
  }

  render() {

    // "query" is the word which is currently activating the search in the app.js file.
    // "results" is the current picture array being displayed on the page.
    // "url" is the current url as seen in the browser address bar.

    const query = this.props.query;
    const results = this.props.data;
    let url = this.props.history.location.pathname;

    // If the search gives back an empty array, the NotFound message is displayed.
    // Otherwise, the results array is mapped out and displayed in a list, with each image passed in a "Photo" component.

    if (results.length > 0) {
      this.state.pics = results.map(pic =>
          <Photo url={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`} key={pic.id} />
        );
      } else {
        this.state.pics = <NotFound/>
      };
    
    // Whenever the app is displaying a "search" page, the following if statement checks if the url fits the current search of the app.js file.
    // If the url and the search don't fit, the search is updated with a proper query, the "keyword" from the url.

    if (url.includes("/search")) {
      let keyword = url.replace("/search/", "");
      if (keyword !== query) {
         this.props.onSearch(keyword);
      }
    }

    // The picture array "this.state.pics" is displayed in a list.

    return(
      <div className="photo-container">
        <h2>Results</h2>
          <ul>
          {this.state.pics}
          </ul>
      </div>
    )
  };
}

export default withRouter(PhotoContainer);