import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Button, Tooltip } from "@mui/material";
import base_url from "../../../../api/bootapi";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const DonationRow = (props) => {
    const [res, setRes] = useState('');
    const changeFormat = (date) => {
        const d = new Date(date);
        return (d.toUTCString()).split("GMT");
    }

    const CheckForCerti = (donationId) => {
        const token = "Bearer " + localStorage.getItem("AccessToken");
        // console.log(token);
        axios.get(`${base_url}/claim/getByDonation/${donationId}`, {
            headers: {
                'Authorization': token,
            }
        }).then(
            (response) => {
                console.log(response);
                if (response.data.approved)
                    setRes("Approved");
                else
                    setRes("Approve");
            },
            (error) => {
                console.log(error);
                if (error.response.status == 400)
                    setRes("No Request");
            }
        )
    }

    const onApproval = () => {
        // console.log("hello");
        setRes('Approved');
    }

    return (
        <>
            {CheckForCerti(props.donation.d_id)}
            <StyledTableRow key={props.donation.donor.name}>
                <StyledTableCell component="th" scope="row">
                    {props.donation.d_id}
                </StyledTableCell>
                <StyledTableCell align="center">{props.donation.donor.name}</StyledTableCell>
                <StyledTableCell align="center">{props.donation.amount}</StyledTableCell>
                <StyledTableCell align="center">{changeFormat((props.donation.date).split('.')[0])}</StyledTableCell>
                <StyledTableCell align="center">{(res === 'Approve') ? <Button
                    variant="contained"
                    onClick={onApproval}
                    sx={{ "&:hover": { backgroundColor: '#075456', color: 'white', }, width: "50%", backgroundColor: '#075456' }}
                    disabled={(res === 'Approve' ? false : true)}
                >
                    Approve
                </Button> : ((res === 'No Request') ?
                    <Tooltip title="Donor has not requested for certificate.">
                        <span>
                            <Button
                                variant="contained"
                                sx={{ "&:hover": { backgroundColor: '#075456', color: 'white', }, width: "50%", backgroundColor: '#075456' }}
                                disabled
                            >
                                No Request

                            </Button>   </span>
                    </Tooltip> : <Tooltip title="Tax Deduction Certificate for this donation has been already issued.">
                        <span><Button
                            variant="contained"
                            sx={{ "&:hover": { backgroundColor: '#075456', color: 'white', }, width: "50%", backgroundColor: '#075456' }}
                            disabled
                        >

                            Certificate Issued

                        </Button>  </span>
                    </Tooltip>)}</StyledTableCell>
            </StyledTableRow>
        </>
    )
}

export default DonationRow;