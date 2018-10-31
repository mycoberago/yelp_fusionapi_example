import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App"
        style={styles.mainContainer}
      >

        <input type='text' placeholder='Search Business' 
          style={styles.input}
        />
      </div>
    );
  }
}

const styles = {
  mainContainer: {
    marginTop: '10vh',
    display: 'flex',
    justifyContent: 'center'
  },
  input: {
    fontSize: '3vw',
    textAlign: 'center',
    borderRadius: '1vw',
    boxShadow: '1vw 1vw 2vw'
  }
}

export default App;
