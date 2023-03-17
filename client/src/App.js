import { React, useMemo, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserSignup from "./Components/User/User_Signup/user_signup";
import Home from "./Components/HomePage/index";
import NgoSignup from "./Components/NGO/NGO_Signup/ngo_signup";
import ViewProfile from "./Components/User/ViewProfile";
import EditUser from "./Components/User/EditUser";
import PaymentInfo from "./Components/User/PaymentInfo";

import NgoProfile from "./Components/NGO/Profile/profile";
import NgoLogin from "./Components/NGO/Ngo_Login/NgoLogin";
import UserLogin from "./Components/User/UserLogin";
import { UserContext } from "./Context/UserContext";
import ViewDonation from "./Components/User/ViewDonations";
import NgoHome from "./Components/NGO/Home/home";
// import { UserContextProvider } from './Context/UserContext';

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
            <Route exact path='/user/profile' element={<ViewProfile />} />
            <Route exact path='/user/payment' element={<PaymentInfo />} />
            <Route exact path='/user/edit' element={<EditUser />} />
            <Route exact path='/user/donation' element={<ViewDonation />} />
            <Route exact path='/ngo/signup' element={<NgoSignup />} />
           
            <Route exact path='/ngo/signup' element={<NgoSignup />} />
            <Route exact path='/ngo/login' element={<NgoLogin />} />
            <Route exact path='/ngo/home' element={<NgoHome />} />
            <Route exact path='/ngo/profile' element={<NgoProfile />} />
            <Route exact path='/' element={<Home />} />
            
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
};

export default App;