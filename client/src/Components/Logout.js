import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Logout = () => {
    const context = useContext(UserContext);
    context.setUser(null);
    localStorage.removeItem("role");
    localStorage.removeItem("AccessToken");
}

export default Logout;