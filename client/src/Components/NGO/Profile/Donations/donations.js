import React from 'react'
import DonationTable from './donationTable';

const donations = [
  {
    id: 1,
    name: 'Activity 1',
    description: 'This is activity 1',
    participants: '100',
   
  },
  {
    id: 2,
    name: 'Activity 2',
    description: 'This is activity 2',
    price: '100',
   
  },
 
];
const Donations = () =>{
  return (
    <DonationTable Donations={donations}/>
  )
}
export default Donations;
