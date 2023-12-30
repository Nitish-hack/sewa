import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


const Navbar = () => {
  const [isLoggedIn,setLoggedIn]=useState(false);
  useEffect(() => {
		const sewaString = localStorage.getItem('sewa');
		if(sewaString) setLoggedIn(true);
	}, [])
	
  const handleLogout = () => {
		localStorage.removeItem("sewa");
		window.location.reload();
	};

  return (
    <Wrapper >
      <a href='/'> <h3>SEWA</h3> </a>
      <div className="nav">

        {!isLoggedIn?
        <>
        <a className='auth_btn bright_gradient' href="/login">SignIn</a>
        <a className='auth_btn bright_gradient' href="/signup">SignUp</a>
        </>
       :
        <span onClick={handleLogout} className='auth_btn bright_gradient'>Logout</span>
        }

      </div>
    </Wrapper>
  )
}

export default Navbar;

const Wrapper = styled.div`
padding:10px 20px;
display:flex;
justify-content:space-between;
svg{
    font-size:30px;
}
.nav{
    display:flex;
    column-gap:10px;
 align-items:center;   
}
`