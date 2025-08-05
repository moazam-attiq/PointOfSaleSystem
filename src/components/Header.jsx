import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext"; // adjust path as needed

export default function Header() {
  const navigate = useNavigate();
  const { user, loadingUser } = useUser();

  if (!user) {
    return (
      <div className="text-center mt-10 text-white">
        User not found. Please log in again.
      </div>
    );
  }
  const goToAdminProfile = () => {
    navigate('/admin-profile');
  }
  const goToLogin = () => {
    localStorage.clear();
    navigate('/');
  }
  return(
  <div className="bg-[#4682A9] flex justify-between items-center py-2 px-4 text-[#FFFBDE] font-bold text-xl">
    <span className='cursor-pointer' onClick={goToAdminProfile}>{user.name}</span>
    <span>Point Of Sale</span>
    <button onClick={goToLogin} style={{background:'#749BC2' , padding:'10px 20px' , color:'white' , fontSize:'18px'}} >Logout</button>
  </div> 
  );
}