import React, { createContext, useEffect, useState } from "react";
import UserAPI from "./api/UserAPI";
import { postDataAPI } from "./utils/fetchData";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin) {
            async function refreshToken() {
                const res = await postDataAPI('api/auth/refresh-token');

                setToken(res?.data?.accessToken);
                setTimeout(() => {
                    refreshToken();
                }, 10 * 60 * 1000);

            }
            refreshToken();
        }
    }, []);

    const state = {
        token: [token, setToken],
        userAPI: UserAPI(token)
    }

    return (
        <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
    )
}