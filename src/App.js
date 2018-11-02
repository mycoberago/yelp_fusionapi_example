import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// components
import SelectedBusiness from './components/SelectedBusiness';
import SearchComponent from './components/SearchComponent';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { Windmill } from 'react-activity';
import 'react-activity/dist/react-activity.css';

class App extends Component {

  state = {
    enterTerm: false,
    page: 1,
    term: null,
    location: 'Naperville,IL',
    limit: 20,
    offset: 0,
    businesses: [],
    businessSelected: null,
    openModal: false,
    loading: false
  }

  componentDidMount(){
    

  }

  search = () => {
    var term = this.state.term,
    location = this.state.location,
    limit = this.state.limit,
    offset = this.state.offset

    let reqURL = process.env.REACT_APP_API_KEY + "?term=" + term + "&location=" + location + "&limit=" + limit + "&offset=" + offset;

    if(!term){

      this.setState({enterTerm: true}, function () {
        setTimeout(function(){
          this.setState({enterTerm: false})
        }.bind(this),2000)
      })

      return;
    }

    this.setState({loading: !this.state.loading},() => {

      fetch(reqURL)
      .then(res => {
        return res.json()
      })
      .then(jsonRes => {
        let { businesses, limit, offset } = this.state;
        offset += 20;
        businesses = [...businesses, ...jsonRes.businesses];
        this.setState({businesses,offset,loading: !this.state.loading},()=> console.log(this.state))
      })
      .catch(err => console.log('err',err))

    })
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

  toggleModal = () => {
    this.setState({openModal: !this.state.openModal})
  }

  render() {
    let { businesses } = this.state
    return (
      <Router>

        <div style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>

        <div style={styles.header}>
          <p style={styles.headerTitle}>YELP FUSION API DEMO</p>
        </div>

        <p style={styles.cityList}>
          <b>Location:</b> { this.state.location } |  <span style={{
            color: 'blue'
          }}
          onClick={this.toggleModal}
          >change</span>
        </p>

        {
          this.state.loading ?
          <div style={styles.indicator}>
            <Windmill color="#3748ac"/>
          </div>
          : null
        }
        

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

          <Modal
            open={this.state.openModal}
          >
          <div style={styles.modal}>
            <input type='text' 
                   placeholder='ENTER City, State' 
                   style={styles.cityInput}
                   onChange={(e) => this.setState({location:e.target.value})}
            />
            <Button
              style={styles.cityButton}
              size="small"
              color="secondary"
              variant="contained"
              onClick={this.toggleModal}
            >
              Change City
            </Button>
          </div>

          </Modal>

        </div>

      </Router>
    );
  }
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#3748ac'
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: '2vw',
    color: 'white',
    fontWeight: 'bold'
  },
  cityList: {
    textAlign: 'center',
    marginTop: '5vw',
    marginBottom: '2vw'
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center'
  },
  modal: {
    height: '100vh',
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
  cityInput: {
    alignSelf: 'center',
    fontSize: '2vw',
    width: '25vw',
    textAlign: 'center',
    marginBottom: '2vw',
    borderRadius: '.5vw'
  },
  cityButton:{
    alignSelf: 'center',
    width: '25vw'
  },
  button: {
    fontSize: '5vw',
    width: '10vw',
    height: '5vw',
    borderRadius: '.5vw',
    boxShadow: '.5vw .5vw 1vw'
  }
}

export default App;
