import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom'
import NotFound from '../NotFound';
import Products from './products/Products';

const Pages = () => {
	return (
		<Switch>
			<Route path="/" exact component={Products} />
			<Route path="*" exact component={NotFound} />
		</Switch>
	)
}

export default Pages;
