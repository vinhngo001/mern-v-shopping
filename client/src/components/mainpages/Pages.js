import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom'
import { GlobalState } from '../../GlobalState';
import NotFound from '../NotFound';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import Products from './products/Products';
import CreateProduct from './products/CreateProduct';
import DetailProduct from './products/DetailProduct';
import Categories from "./categories/Categories";

const Pages = () => {
	const state = useContext(GlobalState);
	const [isAdmin] = state.userAPI.isAdmin;
	const [isLogged] = state.userAPI.isLogged;
	console.log(state);
	
	return (
		<Switch>
			<Route path="/" exact component={Products} />

			{/* Auth */}
			<Route path="/login" exact component={isLogged ? NotFound : Login} />
			<Route path="/register" exact component={isLogged ? NotFound : Register} />
			
			{/* Category */}
			<Route path="/category" exact component={isAdmin ? Categories : NotFound} />

			{/* Product */}
			<Route path="/product" exact component={Products} />
			<Route path="/product/create" exact component={isAdmin ? CreateProduct : NotFound} />
			<Route path="/product/edit/:id" exact component={isAdmin ? CreateProduct : NotFound} />
			<Route path="/product/:id" exact component={DetailProduct} />
			
			{/* Cart */}
			<Route path="/cart" exact component={Cart} />
			<Route path="*" exact component={NotFound} />
		</Switch>
	)
}

export default Pages;
