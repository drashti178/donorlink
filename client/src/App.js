import React from "react";
import { Routes,Route,BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import UserLogin from "./Components/User/UserLogin";
import NgoLogin from "./Components/NGO/NgoLogin";
import ForgetPassword from "./Components/ForgetPassword";
import NgoSignup from "./Components/NGO/NGO_Signup/ngo_signup";
import UserSignup from "./Components/User/User_Signup/user_signup";
import Home from "./Components/HomePage/index";
const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route exact path ='/user/login' element={<UserLogin />} />
          <Route exact path ='/user/signup' element={<UserSignup/>} />
          <Route exact path ='/ngo/signup' element={<NgoSignup/>} />
          <Route exact path ='/forgetpassword' element={<ForgetPassword/>} />
          <Route exact path ='/ngo/login' element={<NgoLogin/>} />
          <Route exact path ='/' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
