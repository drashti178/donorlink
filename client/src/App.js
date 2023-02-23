import {React} from "react";
import { Routes,Route,BrowserRouter } from "react-router-dom";

import UserLogin from "./Components/User/UserLogin";
import NgoLogin from "./Components/NGO/NgoLogin";
import ForgetPassword from "./Components/ForgetPassword";

import UserSignup from "./Components/User/User_Signup/user_signup";
import Home from "./Components/HomePage/index";
import NgoSignup from "./Components/NGO/NGO_Signup/NGO_Signup/ngo_signup";
import ViewProfile from "./Components/User/ViewProfile";
import EditUser from "./Components/User/EditUser";
import PaymentInfo from "./Components/User/PaymentInfo";
import NgoHome from "./Components/NGO/home";
import NgoProfile from "./Components/NGO/Profile/profile";
import UserProfile from "./Components/User/Profile/profile";
const App = () => {
 
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route exact path ='/user/login' element={<UserLogin />} />
          <Route exact path ='/user/signup' element={<UserSignup/>} />
          <Route exact path ='/user/profile' element={<ViewProfile/>} />
          <Route exact path ='/user/payment' element={<PaymentInfo/>} />
          <Route exact path ='/user/edit' element={<EditUser />} />
          <Route exact path ='/ngo/signup' element={<NgoSignup/>} />
          <Route exact path ='/forgetpassword' element={<ForgetPassword/>} />
          <Route exact path ='/ngo/signup' element={<NgoSignup/>} /> 
          <Route exact path ='/ngo/login' element={<NgoLogin/>} />
          <Route exact path ='/ngo/home' element={<NgoHome/>} />
          <Route exact path ='/ngo/profile' element={<NgoProfile/>} />
          <Route exact path ='/user/profile' element={<UserProfile/>} />
          <Route exact path ='/' element={<Home/>} />
          <Route exact path ='/forgetpassword' element={<ForgetPassword/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
