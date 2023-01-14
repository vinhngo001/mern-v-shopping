import { useState, useEffect } from "react";
import { getDataAPI } from "../utils/fetchData";

function UserAPI(token) {
	const [isLogged, setIsLogged] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (token) {
			async function getUser() {
				localStorage.setItem("firstLogin", true);
				try {
					const res = await getDataAPI('api/user', null, token);
					setIsLogged(true);
					res.data.user.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);

				} catch (err) {
					console.log(err?.response?.data?.message);
					alert(err?.response?.data?.message)
				}
			}
			setTimeout(()=>{
				getUser();
			},3000)
		}
	}, [token]);

	return {
		isLogged: [isLogged, setIsLogged],
		isAdmin: [isAdmin, setIsAdmin],
	}
}

export default UserAPI;