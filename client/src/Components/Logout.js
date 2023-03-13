import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("AccessToken");
}

export default Logout;