import './App.css';
import {Routes, Route, BrowserRouter } from "react-router-dom"
import NgoLogin from './Components/ngo_login';

function App() {
 
    return (
      <>
        <BrowserRouter>
    <Routes>
      <Route path="/" element={<NgoLogin />} />
  
    </Routes>
  </BrowserRouter>
      </>
      
    );
  
}

export default App;
