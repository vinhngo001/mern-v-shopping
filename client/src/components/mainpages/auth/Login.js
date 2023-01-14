import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postDataAPI } from "../../../utils/fetchData";

const Login = ()=>{
    const [userData, setUserData] = useState({
        account: "",
        password: ""
    });

    const {account, password} = userData;
    
    const onChangeInput  = (e)=>{
        setUserData({...userData,[e.target.name]: e.target.value})
    }
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await postDataAPI('api/auth/login', userData, null);
            console.log(res.data);
            localStorage.setItem("firstLogin", true);
            window.location.href = "/";
            
        }catch(err){
            console.log(err);
            alert(err.response.data.message);
        }
    }
    return(
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="text" name="account" required
                placeholder="Email/Username" value={account} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;