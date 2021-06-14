/*---------------------------------/
IMPORTING MODULES, FILES, COMPONENTS
/---------------------------------*/

import React, {Fragment} from 'react';

import './App.css';

import SearchForm from './components/SearchForm';
import NavLinks from './components/NavLinks';
import PhotoContainer from './components/PhotoContainer';
import WrongUrl from './components/WrongUrl';

import {BrowserRouter, Route, Switch} from "react-router-dom";

import axios from 'axios';
import apiKey from './config.js';

/*---------------------------------/
APP MAIN CONTAINER STATEFUL COMPONENT
  fetches and loads data into state,
  renders other components
/---------------------------------*/

class App extends React.Component {

  // The pictures fetched from the flickr API are stored in arrays in "this.state".
  // "this.state.loading" is set to true initially and will help with displaying a loading indicator during the search operations.
  // "this.state.query" is initially an empty string and will update with the word being typed into the search bar.

  constructor() {
    super();

  this.state = {
    photosCats : [],
    photosGuitars : [],
    photosCoffee : [],
    photosSearch : [],
    loading : true,
    query : ''
  };
}

  // When the App.js component is mounted, a first random search is activated to fetch a random set of flickr images,
  // and the three main topic images are fetched as well and stored in the proper arrays.

  componentDidMount() {

    this.performSearch();

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        photosCats: res.data.photos.photo
      });
    })
    .catch(err => {
      console.log('Error fetching and parsing data', err);
    });

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=guitars&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        photosGuitars: res.data.photos.photo
      });
    })
    .catch(err => {
      console.log('Error fetching and parsing data', err);
    });

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=coffee&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        photosCoffee: res.data.photos.photo
      });
    })
    .catch(err => {
      console.log('Error fetching and parsing data', err);
    });    
  }

  // The "performSearch" function fetches a set of flickr images depending on the query, initially set to "random", but updated with the
  // keyword being typed into the search bar (see : SearchForm.js file).
  // It also changes "this.state.loading" to false so as to remove the loading indicator,
  // and updates "this.state.query" with the "query" keyword being typed into the search bar.

  performSearch = (query = 'random') => { 

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          photosSearch: res.data.photos.photo,
          loading: false,
          query: query
        });
      })
      .catch(err => {
        console.log('Error fetching and parsing data', err);
      })
  }

  // "resetLoading" reverts back "this.state.loading" to "true".

  resetLoading = () => {
    
    this.setState({
      loading: true
    });
  }

  render() {
      return (
      <BrowserRouter>
        <div className="App">

        {// The app renders the SearchForm.js, NavLinks.js, and PhotoContainer.js components.
         // Two props are passed to the SearchForm component : "onSearch", and "resetLoading". They allow the SearchForm.js file to
         // access the "performSearch" and "resetLoading" functions which are in this App.js file.
         // The PhotoContainer components are updated depending on the "data" prop which is passed down to them, and the current url,
         // which is set up in the "path" attribute of the various Routes set up in advance.
        }

          <SearchForm onSearch={this.performSearch} resetLoading={this.resetLoading}/>
          <NavLinks/>
          <Switch>
            <Route exact path="/" render={ () => <PhotoContainer data={this.state.photosSearch}/> }/>

        {// Every time a search is activated, the app redirects to a search page with a "/search" url.
         // Before the PhotoContainer component can be rendered, the app checks if "this.state.loading" is true or not.
         // When it is true, temporarily, a "Loading..." message is displayed on the page. Then it reverts back to false after the
         // "performSearch" function is activated and the message disappears, to be replaced with the PhotoContainer and its pictures.
        }

            {
            (this.state.loading)
            ? <Fragment>Loading...</Fragment>
            :  <Route path="/search" render={ () => <PhotoContainer data={this.state.photosSearch} onSearch={this.performSearch} query={this.state.query}/>}/>
            }

            <Route exact path="/Cats" render={ () => <PhotoContainer data={this.state.photosCats}/> }/>
            <Route exact path="/Guitars" render={ () => <PhotoContainer data={this.state.photosGuitars}/> }/>
            <Route exact path="/Coffee" render={ () => <PhotoContainer data={this.state.photosCoffee}/> }/>

        {// When the url typed in the browser address bar is erroneous, the WrongUrl.js component is rendered, with its "404 Error" message.
        }

            <Route component={WrongUrl}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;