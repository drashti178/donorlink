import React from "react";
import { Routes,Route,BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import UserLogin from "./Components/UserLogin";
import UserSignup from "./Components/UserSignup";
import NgoLogin from "./Components/NgoLogin";

import ForgetPassword from "./Components/ForgetPassword";
import NgoSignup from "./Components/NGO_Signup/ngo_signup";

const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path ='/' element={<UserLogin />} />
          <Route exact path ='/usignup' element={<UserSignup/>} />
          <Route exact path ='/nsignup' element={<NgoSignup/>} />
          <Route exact path ='/forgetpassword' element={<ForgetPassword/>} />
          <Route exact path ='/nlogin' element={<NgoLogin/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
