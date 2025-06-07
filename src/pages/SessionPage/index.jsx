import { BackButton } from '../../components/BackButton';
import { SessionItem } from '../../components/SessionItem';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const polozky = [
  {id: 1, name: 'knedlo vepřo zelo', price: 250},
  {id: 2, name: 'knedlo kuřo zelo', price: 248},
  {id: 3, name: 'knedlo zelo (pro vegany)', price: 205},
]

export const SessionPage = () => {
  const [items, setItems] = useState(polozky)
  const navigate = useNavigate()
  
  return (
    <div className="session">
      <BackButton path="/HomePage"/>
      <div className='session-header'>
        <div className='session-edit'>
          <h1>Session</h1>
          <EditOutlinedIcon/>
        </div>
        <div role='button' className='session-menu' onClick={() => navigate("/Menu")}>
          <CameraAltOutlinedIcon/>
          <span>Menu</span>
        </div>
      </div>

      <div className='session__items-box'>
        {items.map((item, index) => 
          <SessionItem key={`${item.name}-${index}`} id={item.id} name={item.name} price={`${item.price},-`} setItems={setItems}/>
        )}    
      </div>
    </div>
  );
};
