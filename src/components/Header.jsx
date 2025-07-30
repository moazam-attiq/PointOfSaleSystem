import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const goToAdminProfile = () => {
    navigate('/admin-profile');
  }
  const goToLogin = () => {
    navigate('/')
  }
  return(
  <div className="bg-[#4682A9] flex justify-between items-center py-2 px-4 text-[#FFFBDE] font-bold text-xl">
    <span className='cursor-pointer' onClick={goToAdminProfile}>User</span>
    <span>Point Of Sale</span>
    <button onClick={goToLogin} style={{background:'#749BC2' , padding:'10px 20px' , color:'white' , fontSize:'18px'}} >Logout</button>
  </div> 
  );
}