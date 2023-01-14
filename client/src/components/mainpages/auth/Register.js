import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postDataAPI } from "../../../utils/fetchData";

const Register = () => {
    const [userData, setUserData] = useState({
        username: "",
        fullname: "",
        email: "",
        password: ""
    });

    const { username, fullname, email, password } = userData;

    const onChangeInput = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postDataAPI('api/auth/register', userData, null);
            localStorage.setItem("firstLogin", true);
            window.location.href = "/";
        } catch (err) {
            console.log(err);
            alert(err.response.data.message);
        }
    }
    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input type="text" name="username" required
                    placeholder="Username" value={username} onChange={onChangeInput} />

                <input type="text" name="fullname" required
                    placeholder="Fullname" value={fullname} onChange={onChangeInput} />

                <input type="email" name="email" required
                    placeholder="Email" value={email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                    placeholder="Password" value={password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register;