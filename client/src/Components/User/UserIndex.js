import React, { useContext, useState } from 'react';
import NavBar from '../Navbar';
import Maindata from './maindata';


const UserIndex = () => {

    const [data, setData] = useState("My Profile");
    const handleDataReceived = (childData) => {
        setData(childData);
    };

    return (
        <>
          
            <NavBar onDataReceived={handleDataReceived} />
            <Maindata load={data} />
        </>

    );
};

export default UserIndex;