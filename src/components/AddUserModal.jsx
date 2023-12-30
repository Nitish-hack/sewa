import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import {toast} from "react-toastify"
import axios from "axios"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "500px",
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,

};

export default function AddUserModal({users,setUsers}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [setid, setSetId] = useState("");
  const [chargerid, setChargerId] = useState("");
  const [earphone,setEarphone]=useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
     const dataObj={name,setid,chargerid,earphone};
     const url=`${process.env.REACT_APP_BASE_URL}/api/user/adduser`
      const {data}=await axios.post(url,
      dataObj
      );
    const newUserData=[data,...users];
    setUsers(newUserData);   
    setName("");
    setChargerId("");
    setSetId("");
    setEarphone(false);
    handleClose();
    toast.success("data added successfully!")

    } catch (error) {
      toast.error("some error occurred!")
      console.log(error);
    }
  }

  return (
    <div>
      <button className='gradient bold'  onClick={handleOpen}>Add Record</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p onClick={handleClose} style={{ textAlign: "right", cursor: "pointer" }}>close</p>
          <FormContainer onSubmit={handleSubmit}>
            <div className="form-item">
              <p>Username</p>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Username' />
            </div>
            <div className="form-item">
              <p>Set Id</p>
              <input type="text" value={setid} onChange={(e) => setSetId(e.target.value)} placeholder='Enter the set id' />
            </div>
            <div className="form-item">
              <p>Charger Id</p>
              <input type="text" value={chargerid} onChange={(e) => setChargerId(e.target.value)} placeholder='Enter the charger id' />
            </div>
            <div className="form-item">
              <p>Give Earphone</p>
              <div className="flex">
            <span className={earphone?"gradient small_btn":"grey_bg small_btn"} onClick={()=>setEarphone(true)}>yes</span>
            <span className={earphone===false?"gradient small_btn":"grey_bg small_btn"} onClick={()=>setEarphone(false)}>no</span>
            </div>
            </div>
            <button className='gradient' type='submit'>Add user</button>
          </FormContainer>
        </Box>
      </Modal>
    </div>
  );
}

const FormContainer = styled.form`
display:flex;
flex-direction:column;
row-gap:20px;

input{
  margin-top:5px;
  width:100%;
  padding:15px 10px;
  border:none;
  background:aliceblue;
  outline:none;
}
`
