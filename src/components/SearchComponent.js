import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import BusinessItem from './BusinessItem';

/*

<form onSubmit={this.handleSubmit} style={styles.form}>

 */

export default class SearchComponent extends Component {

	componentDidMount() {
		//console.log(this.props);
	}
	render() {
		let { state,onChangeText, handleSubmit } = this.props;
		return (
			<div className="App"
	          style={styles.mainContainer}
	        >
		        <div style={styles.form}>
		        {
		        	state.enterTerm ?
		        	<p style={{
			        	alignSelf: 'center',
			        	color: 'red'
			        }}>Please Enter a Business Name</p>
			        : null 
		        }
		        
		          <input type='text' placeholder='Search Business' 
		            style={styles.input}
		            onChange={(event)=> onChangeText(event.target.value)}
		            required
		          />

		          <Button onClick={handleSubmit} variant="contained" color="primary">
		          Search
		        </Button>
		        </div>
		        
		        {
		            state.businesses.length > 0 ?
		            state.businesses.map(business => {
		              return <BusinessItem 
		              			info={business} 
		              			key={business.id}
		              			props={this.props}
		              		 />
		            })
		            : null
		        }
		         
        	</div>
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