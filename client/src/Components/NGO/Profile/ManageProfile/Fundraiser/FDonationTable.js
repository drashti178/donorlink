
import { react, useEffect } from "react";



const FDonationTable = (props) => {

    useEffect(() => {

    })
   
    

    
    
    const changeFormat = (date) => {
        const d = new Date(date);
        return (d.toUTCString()).split("GMT");
    }
    // let res ="";
    return (
        <>
            
            <tr>
            <td>{props.i.fd_id}</td>
                <td>{props.i.amount}</td>
                <td>{changeFormat((props.i.date).split('.')[0])}</td>
                <td>{props.i.fundraiser.fr_name}</td>
                <td>{props.i.fundraiser.ngo.ngoname}</td>
            </tr>
        </>
    ); 
}

export default FDonationTable;