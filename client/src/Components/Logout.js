import { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    context.setUser(null);
    localStorage.removeItem("role");
    localStorage.removeItem("AccessToken");
    navigate('/user/login');
    
    useEffect(() => {
        Logout();
    },[])
    
}

export default Logout;