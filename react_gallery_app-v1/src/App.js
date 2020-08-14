import React, { Component } from 'react';
import './App.css';
import apiKey from './config';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
//import child components to app.js
import PhotoContainer from './Photo-Container.js';
import SearchBar from './searchBar.js';
import Nav from './Nav.js'

export default class App extends Component {

  constructor() {
    super();
    //arrays created to hold photos from api search
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
    //this.performSearch();
    this.loadDefaults();  
  }
  //holds default search item functions for componentDidMount to run
  loadDefaults() {
    this.loadAlpacas();
    this.loadOes();
    this.loadOwls();
  }
  //load Alpaca default search button and return array of Alpacas
  loadAlpacas() {
    this.setState({loading: true, alpacas: []});
    //run api search
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=` + apiKey + `&tags='+peruvian+alpaca+'&format=json&nojsoncallback=1`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(response => {
        this.setState({ 
          //return array of 25 photos and then set loading to false
          alpacas: response.data.photos.photo.slice(0, 25),
          loading: false });
      })
      .catch(error => {
        //if error caught, set loading state to false
        this.setState({loading: false});
      });
  }


  //load Oes default search button and return array of oldenglishsheepdogs
  loadOes() {
    this.setState({loading: true, oldEnglishSheepdogs: [] });
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=` + apiKey + `&tags='+old+english+sheepdog+'&format=json&nojsoncallback=1`,
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
      })
      .catch(error => {
        this.setState({loading: false});
      });
  }

  //load owls default search function and return array of owls
  loadOwls() {
    this.setState({loading: true, owls: []});
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=` + apiKey + `&tags='+true+owl+'&format=json&nojsoncallback=1`,
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
      })
      .catch(error => {
        this.setState({loading: false});
      });
  }
  //search api function for input in the search bar, query search term passed in
  performSearch= (query) => {
    //set loading state to true
    this.setState({loading: true});
    //perform api search that includes query search term/input to search bar
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=` + apiKey + `&tags=` + query + `&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          //set array limit of 25
          queryResults: response.data.photos.photo.slice(0, 25),
          //change loading to false
          loading: false,
          //set query to input
          query: query
        });

      })
      .catch(error => {
        //if error, set loading to false
        this.setState({loading: false});
      });
  }
  //if queryResults array is not empty, show header displaying title of input as the results
  showResultsHeader(){
    if(this.state.queryResults.length){
    return <h2>Results: {this.state.query}</h2>
    }
  }
  //function to be used to create 404 error route message
  NoMatchPage = () => {
    return (
      <h3>Uh Oh! 404 Error - Route Not found</h3>
    );
  };
  //render page elements
  render(props) {
    return (
      //return search bar which on search calls performSearch function
      <BrowserRouter>
        <div className="App">

          <SearchBar onSearch={this.performSearch} />
          <Nav></Nav>
          {/* create the routes, if state is not loading, then make state appropriate Array, else display loading on page */}

          <Switch>
            <Route exact path="/"><Redirect to="/search" /></Route>
            <Route path="/home" render={() => <h1>Search Something!</h1>}/>
            <Route path="/alpacas" render={() => (!this.state.loading) ? <PhotoContainer id="photos" data={this.state.alpacas} title="alpacas" /> : <p>Loading...</p>} />
            <Route path="/oldEnglishSheepdogs" render={() => (!this.state.loading) ? <PhotoContainer data={this.state.oldEnglishSheepdogs} title="old english sheepdogs" /> : <p>Loading...</p>} />
            <Route path="/owls" render={() => (!this.state.loading) ? <PhotoContainer data={this.state.owls} title="owls" /> : <p>Loading...</p>}/>
            <Route path="/search/:id?" render={() => (!this.state.loading) ? <PhotoContainer data={this.state.queryResults} title={this.state.query} /> : <p>Loading...</p>}/>
           {/* error 404 route */}
            <Route component={this.NoMatchPage} />
          </Switch>

        </div>
        </BrowserRouter>
    );

  }

}

