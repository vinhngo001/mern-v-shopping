import { useState, useEffect } from "react";
import { getDataAPI, postDataAPI, putDataAPI } from "../utils/fetchData";

function UserAPI(token) {
	const [isLogged, setIsLogged] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		if (token) {
			async function getUser() {
				try {
					const res = await getDataAPI('/api/user', token);
					setIsLogged(true);
					const user = res.data.results._doc;
					console.log({user});
					user.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
					setCart(user.cart);
				} catch (err) {
					console.log(err);
					alert(err !== undefined && err?.response?.data?.message);
				}
			}

			getUser();
		}
	}, [token]);

	async function addCart(product) {
		try {
			if (!isLogged) {
				return alert("Please login to continue buying")
			}

			if (cart.every(p => p._id !== product._id)) {
				setCart([...cart, { ...product, quantity: 1 }]);

				await putDataAPI('/api/user/add-to-cart', {
					cart: [...cart, { ...product, quantity: 1 }]
				}, token);
			} else {
				product.quantity = 1;
				const newData = cart.map(p => p._id === product._id ? { ...product, quantity: product.quantity + 1 } : p);
				setCart([...newData]);
				await putDataAPI('/api/user/add-to-cart', {
					cart: [...newData]
				}, token)
			}
		} catch (err) {
			console.log(err);
			alert(err !== undefined && err?.response?.data?.message);
		}
	}
	return {
		isLogged: [isLogged, setIsLogged],
		isAdmin: [isAdmin, setIsAdmin],
		addCart: addCart,
		cart: [cart, setCart],
	}
}

export default UserAPI;