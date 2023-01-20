import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "../../assets/menu.svg";
import Close from "../../assets/close.svg";
import Cart from "../../assets/cart.svg";
import { Link } from 'react-router-dom'
import { postDataAPI } from "../../utils/fetchData";

const Headers = () => {
	const state = useContext(GlobalState);
	const [isAdmin] = state.userAPI.isAdmin;
	const [isLogged] = state.userAPI.isLogged;
	const [menu, setMenu] = useState(false);
	const cart = state.userAPI.cart;

	const styleMenu = {
		left: menu ? 0 : "-100%"
	}
	const adminRouter = () => {
		return (
			<>
				<li><Link to="/product/create">Create Product</Link></li>
				<li><Link to="/category">Categories</Link></li>
			</>
		)
	}
	const logoutUser = async () => {
		localStorage.removeItem("firstLogin");
		window.location.href = "/";
		await postDataAPI("api/auth/logout", null, null);
	}
	const userRouter = () => {
		return (
			<>
				<li><Link to="/history">History</Link></li>
				<li><Link to="/" onClick={logoutUser}>Logout</Link></li>
			</>
		)
	}
	return (
		<header>
			<div className="menu" onClick={() => setMenu(!menu)}>
				<img src={Menu} alt="" width="30" />
			</div>
			<div className="logo">
				<h1><Link to="/">{isAdmin ? 'Admin' : 'Dev-VN Shop'}</Link></h1>
			</div>
			<ul style={styleMenu}>
				<li><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>
				{isAdmin && adminRouter()}
				{
					isLogged ? userRouter() : <li><Link to="/login">Login ✥ Register</Link></li>
				}
				<li onClick={() => setMenu(!menu)}>
					<img src={Close} alt="" width="30" className="menu" />
				</li>
			</ul>
			{
				isAdmin ? ''
					: <div className="cart-icon">
						<span>{cart.length}</span>
						<Link to="/cart">
							<img src={Cart} alt="" width="30" />
						</Link>
					</div>
			}
		</header>

	)
}

export default Headers;