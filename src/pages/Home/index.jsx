import React, { useEffect, useState } from 'react'
import { Wrapper } from "./style.js"
import TableItem from '../../components/TableItem.jsx'
import AddUserModal from '../../components/AddUserModal.jsx'
import axios from "axios"

const Home = () => {
  const [userData,setUserData]=useState([]); 
useEffect(() => {
const fetchData=async()=>{
  try {
    const url=`${process.env.REACT_APP_BASE_URL}/api/user/alluser`
    const {data}=await axios.get(url);
    setUserData(data);
  } catch (err) {
    console.log(err);
  }
}
  fetchData();
}, [])


  return (
    <Wrapper>
      <AddUserModal userData={userData} setUserData={setUserData} />
      <div className="table_header">
        <p>USERNAME</p>
        <p>SET ID</p>
        <p>CHARGER ID</p>
        <p>EARPHONE</p>
        <p>RETURNS</p>
      </div>
      <div className="table_body">
        {userData?.map((user,index)=>
        <TableItem key={index} user={user} />
        )}
      </div>
    </Wrapper>
  )
}

export default Home;
