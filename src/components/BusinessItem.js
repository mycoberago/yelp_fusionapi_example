import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const BusinessItem = ({props,info,selected=false}) => {
	console.log('props', props);
	console.log('info before', info);
	let { history } = props;

	if(!info){
		info = props.state.businessSelected;
	}

	if(info){

	return (

		<div style={styles.container}>
				{ 
					selected ?
					<Button size="small" color="primary"
					style={{
						width: '20vw',
						alignSelf: 'center'
					}}
		        	onClick={()=> props.history.push('/')}
			        >
			          Back to Search
		        	</Button>
		        	: null 
				}
				
				<Card style={styles.card}>

				<CardHeader
		          avatar={
		            <Avatar aria-label="Recipe">
		              B
		            </Avatar>
		          }
		          title={info.name}
		          style={{
		          	marginTop: '1vw',
		          	fontSize: '2vw'
		          }}
		        />

		        <CardMedia
		          style={{
		          	height: 0,
		    		paddingTop: '25.25%',
		          }}
		          image={info.image_url}
		          title="Contemplative Reptile"
		        />
		        {
		        	selected ?

		        	<CardContent>
		        		<Typography >
		        			Address: { info.location.address1 + ' ' + info.location.city + ', ' + info.location.state + ' ' + info.location.zip_code }
		        		</Typography>

		        		<Typography >
		        			Phone: {info.display_phone}
		        		</Typography>

		        		<Typography >
		        			Rating: {info.rating}
		        		</Typography>
		        		<Typography >
		        			{info.price || null }
		        		</Typography>
		        	</CardContent>

		        	: <CardActions>
					        <Button size="small" color="primary"
					        	onClick={()=> props.selected(info,props)}
					        >
					          Learn More
					        </Button>
				      </CardActions>
		        }
		        

			</Card>
		</div>
		
	)

	}

	return (
		<div style={styles.container}>
			<h1 style={{alignSelf: 'center'}}>Opps, that's embarrasing...</h1>
			<Button size="small" color="primary"
        			onClick={()=> props.history.push('/')}
	        >
	          Back to Search
        	</Button>
		</div>
	)
		
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		marginTop: '5vw'
	},
	card: {
		width: '70vw',
		alignSelf: 'center',
		border: '1px solid lightgrey'
	},
	header: {
		display: 'flex',
		padding: '2vw',
		border: '1px solid black',
		alignItems: 'center'
	},
	title: {
		fontSize: '5vw'
	},
	image: {
		height: '15vw',
		width: '15vw',
		borderRadius: '1vw',
		marginRight: '5vw'

	},
	description: {
		padding: '5vw'
	}
}

export default BusinessItem;
