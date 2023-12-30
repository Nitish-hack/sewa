import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import useMediaQuery from '@mui/material/useMediaQuery';

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

export default function ReturnModal({ user, users, setUsers }) {
  const phone = useMediaQuery('(max-width:472px)');
  const { name, setid, chargerid, earphone, _id } = user;
  const [open, setOpen] = useState(false);
  const [returnSetId, setSetId] = useState("");
  const [returnChargerId, setChargerId] = useState("");
  const [returnEarphone, setEarphone] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataObj = { userid: _id, returnSetId, returnChargerId, returnEarphone };
      const { data } = await axios.post("http://localhost:5000/api/user/return",
        dataObj
      );

      
      if (data?.deleted && data.deleted === true) {
        // Update users state by removing the object with _id
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
      }
      else if (data.deleted === false && data.user) {
       
        setUsers((prevUsers) =>
        prevUsers.map((prevUser) => (prevUser._id === _id ? data.user : prevUser))
      );
      }

      setChargerId("");
      setSetId("");
      setEarphone(false);
      handleClose();
      toast.success("returned successfully!")

    } catch (error) {
      console.log(error);
      toast.error("some error occured!")
    }
  }



  return (
    <div>
      <button onClick={handleOpen} className='gradient bold'>{phone ?"Return":"Add Return"}</button>
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
              <input type="text" value={name} disabled placeholder='Enter Username' />
            </div>
            <p>Fill the details of item to be returned!</p>


            {setid !== "0000" &&
              <div className="form-item">
                <p>Set Id</p>
                <input type="text" onChange={(e) => setSetId(e.target.value)} placeholder='Enter the returning set id ' />
              </div>
            }

            {chargerid !== "0000" &&
              <div className="form-item">
                <p>Charger Id</p>
                <input type="text" onChange={(e) => setChargerId(e.target.value)} placeholder='Enter the returning charger id' />
              </div>
            }
            {earphone &&
              <div className="form-item">
                <p>Returning Earphone</p>
                <div className="flex">
                  <span className={returnEarphone ? "gradient small_btn" : "grey_bg small_btn"} onClick={() => setEarphone(true)}>yes</span>
                  <span className={returnEarphone === false ? "gradient small_btn" : "grey_bg small_btn"} onClick={() => setEarphone(false)}>no</span>
                </div>
              </div>
            }
            <button type='submit ' className='gradient'>Confirm Return </button>
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
