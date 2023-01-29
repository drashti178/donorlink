import {React} from "react";
import LoginIcon from '@mui/icons-material/Login';
import { red } from '@mui/material/colors';
import { Button } from "@mui/material";

const Navbar = () => {
    // const context = useContext(UserContext);
   
    let role = "user";
    // if (context) {
    //     role = context.role;
    // }

    const ButtonToggle = () => {

        // if (context) {
            // role = context.role;
            return (<Button sx={{ marginLeft: 'auto', background: red[400] }} variant='contained' to='/logout'>Logout <LoginIcon sx={{ ml: 1 }} /></Button>)
        // } else {
        //     // role = "user";
        //     return (<Button sx={{ marginLeft: 'auto' }} variant='contained' component={Link} to='/logIn'>Login <LogoutIcon sx={{ ml: 1 }} /></Button>)
        // }
    }
    return (
        <ButtonToggle />
    );
    
};

export default Navbar;