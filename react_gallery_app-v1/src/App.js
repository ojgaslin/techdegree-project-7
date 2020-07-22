import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import logo from './logo.svg';
import ClipLoader from "react-spinners/ClipLoader";

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
//import Photo from './Photo.js';
import PhotoContainer from './Photo-Container.js';
import SearchBar from './searchBar.js';
import Nav from './Nav.js'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      alpacas: [],
      oldEnglishSheepdogs: [],
      owls: [],
      queryResults: [],
      loading: false,
      query: ""
    };
  }

  componentDidMount() {
    
    this.loadDefaults();
    //this.performSearch();
 
  }

  loadDefaults() {
    this.loadAlpacas();
    this.loadOes();
    this.loadOwls();
  }

  loadAlpacas() {
    this.setState({loading: true, alpacas: []});
    axios.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=15e0847f1f1c8076d7b8c4e0cff4f2f3&tags='+peruvian+alpaca+'&format=json&nojsoncallback=1",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(response => {
        this.setState({ 
          alpacas: response.data.photos.photo.slice(0, 25),
          loading: false });
        console.log("ALPACAS")
        console.log(this.state.alpacas)
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        this.setState({loading: false});
      });
  }



  loadOes() {
    this.setState({loading: true, oldEnglishSheepdogs: [] });
    axios.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=15e0847f1f1c8076d7b8c4e0cff4f2f3&tags='+old+english+sheepdog+'&format=json&nojsoncallback=1",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(response => {
        this.setState({ 
          oldEnglishSheepdogs: response.data.photos.photo.slice(0, 25), 
          loading: false });
        console.log("OES")
        console.log(this.state.oldEnglishSheepdogs)
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        this.setState({loading: false});
      });
  }

  loadOwls() {
    this.setState({loading: true, owls: []});
    axios.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=15e0847f1f1c8076d7b8c4e0cff4f2f3&tags='+true+owl+'&format=json&nojsoncallback=1",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(response => {
        this.setState({ 
          owls: response.data.photos.photo.slice(0, 25),
          loading: false});
        console.log("OWLS")
        console.log(this.state.owls)
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        this.setState({loading: false});
      });
  }

  performSearch= (query) => {
    this.setState({loading: true});
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=15e0847f1f1c8076d7b8c4e0cff4f2f3&tags=` + query + `&format=json&nojsoncallback=1`)
      .then(response => {
        console.log("QUERY" + query);
        this.setState({
          queryResults: response.data.photos.photo.slice(0, 25),
          loading: false,//
          query: query
        });

      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        this.setState({loading: false});//
      });
  }
  showResultsHeader(){
    if(this.state.queryResults.length){
    return <h2>Results: {this.state.query}</h2>
    }
  }

  render() {
    const { data, loading } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <SearchBar onSearch={this.performSearch} />
          <Nav></Nav>
          {
            this.state.queryResults.length > 0 &&
              <h2>Results for {this.state.query}</h2>
          }
          <Switch>
            <Route path="/alpacas" render={() => (!this.state.loading) ? <PhotoContainer id="photos" data={this.state.alpacas} /> : <p>Loading...</p>} />
            <Route path="/oldEnglishSheepdogs" render={() => (!this.state.loading) ? <PhotoContainer data={this.state.oldEnglishSheepdogs} /> : <p>Loading...</p>} />
            <Route path="/owls" render={() => (!this.state.loading) ? <PhotoContainer data={this.state.owls} /> : <p>Loading...</p>}/>
            <Route path="/search" render={() => (!this.state.loading) ? <PhotoContainer data={this.state.queryResults} /> : <p>Loading...</p>}/>
          </Switch>

          {/* Nav */}
          {/* search bar */}
          {/* photocontainer */}
        </div>
      </BrowserRouter>
    );

  }

}

