import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import base_url from "../../api/bootapi";
import { UserContext } from "../../Context/UserContext";
import './../style.css';
import Modal from 'react-bootstrap/Modal';
import Logout from "../Logout";
import BootButton from 'react-bootstrap/Button';

function MyVerticallyCenteredModal(props) {

    const navigate = useNavigate();

    const deleteUser = async () => {
        const token = "Bearer " + localStorage.getItem("AccessToken");
        await axios.delete(`${base_url}/user/delete`, {
            headers: {
                'Authorization': token,
            }
        }).then(
            (response) => {
                console.log(response);
                alert('User deleted successfully');
                Logout();
                navigate('/user/login');
            },
            (error) => {
                console.log(error);
            }
        )
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirm Delete
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete your profile?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <BootButton onClick={props.onHide}>Close</BootButton>
                <BootButton onClick={deleteUser}>Delete</BootButton>
            </Modal.Footer>
        </Modal>
    );
}

const ViewProfile = () => {
   
    const context = useContext(UserContext);
    const [modalShow, setModalShow] = useState(false);

    const country_list =
        ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

    const navigate = useNavigate();
    let [inputs, setInputs] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        country: "",
        contactno: "",
        adharno: "",
        profession: "",
        type: "",
        totaldonation: 0,
    });

    useEffect(() => {
        if (localStorage.getItem("AccessToken") == null) {
            setTimeout(() => {
                alert('Log in First');
            }, 100);
            navigate('/user/login');
        }
        else {
            if (context.user == null) {
                const token = "Bearer " + localStorage.getItem("AccessToken");
                axios.get(`${base_url}/user/profile`, {
                    headers: {
                        'Authorization': token,
                    }
                }).then(
                    (response) => {
                        console.log(response.data);
                        context.setUser(response.data);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            }
            else {
                if (context.user.role === 'ngo') {
                    navigate('/ngo/profile');
                }
                context.user.password = "";
                console.log(context.user);
                setInputs(context.user);
            }
        }
    }, [context, context.user, navigate]);

    return (
        <>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <div className="container d-flex align-items-center justify-content-center mt-5 ProfileStyle">
                <div className="card mb-4 ml-5 box-shadow " style={{ width: "30rem", backgroundColor: "rgb(161 126 121 / 10%)" }}>
                    <div className="text-center">
                        <img className="card-img-top rounded-circle mt-4" src="https://th.bing.com/th/id/OIP.6g046R8XK5hclI-YnpjDnwHaHa" alt="Card cap" style={{ width: "200px", height: "200px" }} />
                    </div>
                    <div className="card-body " >
                        
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item" style={{ backgroundColor: "#ffffff" }}><strong>Username :</strong> {inputs.username}</li>
                            <li className="list-group-item" style={{ backgroundColor: "rgb(161 126 121 / 15%)" }}><strong>Email :</strong> {inputs.email}</li>
                            <li className="list-group-item" style={{ backgroundColor: "#ffffff" }}><strong>Name :</strong> {inputs.name}</li>
                            <li className="list-group-item" style={{ backgroundColor: "rgb(161 126 121 / 15%)" }}><strong>Adhar no : </strong> {inputs.adharno}</li>
                            <li className="list-group-item" style={{ backgroundColor: "#ffffff" }}><strong>Contact No :</strong> {inputs.contactno}</li>
                            <li className="list-group-item" style={{ backgroundColor: "rgb(161 126 121 / 15%)" }}><strong>Country :</strong> {country_list[inputs.country]}</li>
                            <li className="list-group-item" style={{ backgroundColor: "#ffffff" }}><strong>Profession :</strong> {inputs.profession}</li>
                            <li className="list-group-item" style={{ backgroundColor: "rgb(161 126 121 / 15%)" }}><strong>Total Donation :</strong> {inputs.totaldonation}</li>
                            <li className="list-group-item" style={{ backgroundColor: "#ffffff" }}><strong>Type :</strong> {inputs.type}</li>
                            <Grid
                                container
                                spacing={2}
                                style={{ marginTop: "20px" }}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"

                            >
                                <Button
                                    variant="contained"
                                    sx={{ "&:hover": { backgroundColor: '#9C7875', color: 'white', }, marginTop: 1, width: "30%", marginRight: "5%", backgroundColor: '#9C7875' }}
                                    onClick={() => { navigate('/user/edit') }}
                                >
                                    Edit Profile
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ "&:hover": { backgroundColor: '#9C7875', color: 'white', }, marginTop: 1, width: "35%", marginLeft: "9%", backgroundColor: '#9C7875' }}
                                    onClick={() => setModalShow(true)}
                                >
                                    Delete Profile
                                </Button>

                            </Grid>
                        </ul>
                        <br />


                    </div>
                </div>
            </div>

        </>
    )
}

export default ViewProfile;