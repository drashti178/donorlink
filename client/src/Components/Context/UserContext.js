import axios from "axios";
import { React, createContext, useState, useEffect } from "react";
import base_url from "../../api/bootapi";

const UserContext = createContext();
const DispatchUserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [])
    
    const fetchUser = async () => {
        if (localStorage.getItem("AccessToken") != null) {
            const token = "Bearer " + localStorage.getItem("AccessToken");
            // console.log(token);
            await axios.get(`${base_url}/user/profile`, {
                headers: {
                    'Authorization': token,
                }
            }).then(
                (response) => {
                    console.log(response.data);
                    setUser(response.data);
                },
                (error) => {
                    console.log(error);
                }
            )
        }

    }
    return (
        <UserContext.Provider value={user}>
            <DispatchUserContext.Provider value={setUser}>
                {children}
            </DispatchUserContext.Provider>
        </UserContext.Provider>
    )
}

export { UserContext, DispatchUserContext, UserContextProvider };