import { React, useMemo, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ForgetPassword from "./Components/ForgetPassword";
import UserSignup from "./Components/User/User_Signup/user_signup";
import Home from "./Components/HomePage/index";
import NgoSignup from "./Components/NGO/NGO_Signup/NGO_Signup/ngo_signup";
import NgoProfile from "./Components/NGO/Profile/profile";
import NgoLogin from "./Components/NGO/Ngo_Login/NgoLogin";
import UserLogin from "./Components/User/User_Login/UserLogin";
import NgoHome from "./Components/NGO/Home/home";
import { UserContext } from "./Context/UserContext";
import UserHome from "./Components/User/Home/home";
import UserProfile from "./Components/User/Profile/profile";




const App = () => {
  const [user,setUser] = useState(null);
  const value = useMemo(() => ({user,setUser}), [user,setUser]);

  return (
    <>
      
      <UserContext.Provider value = {value}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/user/login' element={<UserLogin />} />
            <Route exact path='/user/signup' element={<UserSignup />} />
            <Route exact path='/ngo/signup' element={<NgoSignup />} />
            <Route exact path='/forgetpassword' element={<ForgetPassword />} />
            <Route exact path='/ngo/signup' element={<NgoSignup />} />
            <Route exact path='/ngo/login' element={<NgoLogin />} />
            <Route exact path='/ngo/home' element={<NgoHome />} />
            <Route exact path='/user/home' element={<UserHome />} />
            <Route exact path='/ngo/profile' element={<NgoProfile />} />
            <Route exact path='/user/profile' element={<UserProfile />} />
            <Route exact path='/' element={<Home />} />
            <Route exact path='/forgetpassword' element={<ForgetPassword />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
};

export default App;