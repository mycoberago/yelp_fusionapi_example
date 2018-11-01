import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// components
import SelectedBusiness from './components/SelectedBusiness';
import SearchComponent from './components/SearchComponent';

import Button from '@material-ui/core/Button';

class App extends Component {

  state = {
    enterTerm: false,
    page: 1,
    term: null,
    location: 'naperville,il',
    limit: 20,
    offset: 0,
    businesses: [],
    businessSelected: null

  }

  componentDidMount(){
    

  }

  search = () => {
    var term = this.state.term,
    location = this.state.location,
    limit = this.state.limit,
    offset = this.state.offset

    if(!term){

      this.setState({enterTerm: true}, function () {
        setTimeout(function(){
          this.setState({enterTerm: false})
        }.bind(this),2000)
      })

      return;
    }

    let reqURL = "https://script.google.com/macros/s/AKfycbwEXXwcHHG0oSaET5UVmJcJffHhJ9-EMnt-ls-gUWomFlv7zdAX/exec?term=" + term + "&location=" + location + "&limit=" + limit + "&offset=" + offset;

    console.log('request', reqURL);

    fetch(reqURL)
    .then(res => {
      return res.json()
    })
    .then(jsonRes => {
      let { businesses, limit, offset } = this.state;
      offset += 20;
      businesses = [...businesses, ...jsonRes.businesses];
      this.setState({businesses,offset},()=> console.log(this.state))
    })
    .catch(err => console.log('err',err))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.search();
  }

  onChangeText = (term) => {
    this.setState({term})
  }

  BusinessSelected = (businessSelected,props) => {
    let { history } = props
    this.setState({businessSelected},() => {
      history.push('/select');
    })
  }

  render() {
    let { businesses } = this.state
    return (
      <Router>
      
        <div>
    
          <Route exact path="/" 
                 render={props => 
                  <SearchComponent{...props}
                    handleSubmit={this.handleSubmit}
                    search={this.search}
                    state={this.state}
                    selected={this.BusinessSelected}
                    onChangeText={this.onChangeText}
                  />
                 }

          />
          <Route path='/select'
                 render={props => 
                  <SelectedBusiness 
                    {...props}
                    state={this.state}
                  />
                 }
          />
        </div>

      </Router>
    );
  }
}

const styles = {
  mainContainer: {
    paddingTop: '10vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    // border: '1px solid black',
    height: '15vh',
    width: '35vh'
  },
  input: {
    fontSize: '3vw',
    width: '50vw',
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: '1vw',
    boxShadow: '1vw 1vw 2vw',
    marginBottom: '3vw'
  },
  button: {
    fontSize: '2vw',
    width: '10vw',
    height: '5vw',
    borderRadius: '.5vw',
    boxShadow: '.5vw .5vw 1vw'
  }
}

export default App;
