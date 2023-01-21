import React from "react";
import { Routes,Route,BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import NgoLogin from "./components/NgoLogin";
import NgoSignup from "./components/NgoSignup";
import ForgetPassword from "./components/ForgetPassword";

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
