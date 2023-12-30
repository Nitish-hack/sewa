import React from 'react'
import styled from 'styled-components'


const Navbar = () => {
  return (
    <Wrapper >
<a href='/'> <h3>SEWA</h3> </a>
<div className="nav">
    <a href="/signin">SignIn</a>
 
</div>
    </Wrapper>
  )
}

export default Navbar;

const Wrapper=styled.div`
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