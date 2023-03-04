import { React,useState} from 'react';
import NavBar from '../../Navbar';
import Maindata from './maindata';





let cards = [
  {
    id: 1,
    title: 'Card 1',
    description: 'This is card 1',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 2,
    title: 'Card 2',
    description: 'This is card 2',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 3,
    title: 'Card 3',
    description: 'This is card 3',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 4,
    title: 'Card 1',
    description: 'This is card 1',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 5,
    title: 'Card 2',
    description: 'This is card 2',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 6,
    title: 'Card 3',
    description: 'This is card 3',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 7,
    title: 'Card 1',
    description: 'This is card 1',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 8,
    title: 'Card 2',
    description: 'This is card 2',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 9,
    title: 'Card 3',
    description: 'This is card 3',
    image: 'https://via.placeholder.com/345x140'
  },
]
const NgoHome = () => {
  const [data, setData] = useState("Ngos");
  const handleDataReceived = (childData) => {
    setData(childData);
  };
  
  
  return (
    <>
    <NavBar type="ngohome" onDataReceived={handleDataReceived}/>
    <Maindata load={data} />
    
    
    </>
   
  );
};

export default NgoHome;

