import React, { Component } from 'react';

import BusinessItem from './BusinessItem';

const SelectedBusiness = (props) => {
	return (
		<BusinessItem
			props={props}
			//info={state}
			selected={true}
		/>
	)
	
}


export default SelectedBusiness;