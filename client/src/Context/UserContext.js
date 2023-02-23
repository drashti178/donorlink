import axios from "axios";
import { React, createContext, useState, useEffect } from "react";
import base_url from "../api/bootapi";

const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchUser = () =>{
            
        }
        fetchUser();
    }, [])

    return (
        <UserContext.Provider value={role}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };