import { useState, useEffect } from "react";
import { getDataAPI } from "../utils/fetchData";

function UserAPI(token) {
	const [isLogged, setIsLogged] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		if (token) {
			async function getUser() {
				try {
					const res = await getDataAPI('api/user', token);
					setIsLogged(true);
					const user = res.data.results;
					user.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
					setCart(user.cart);
				} catch (err) {
					console.log(err);
					alert(err !== undefined && err?.response?.data?.message)
				}
			}
			setTimeout(() => {
				getUser();
			}, 3000)
		}
	}, [token]);
	function addCart() {

	}
	return {
		isLogged: [isLogged, setIsLogged],
		isAdmin: [isAdmin, setIsAdmin],
		cart: addCart,
	}
}

export default UserAPI;