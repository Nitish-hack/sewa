import React from 'react'
import styled from 'styled-components';
import ReturnModal from './ReturnModal';

const TableItem = ({user}) => {
  const {name,setid,chargerid,earphone,_id}=user;

  return (
    <Wrapper>
        <p>{name}</p>
        <p>{setid}</p>
        <p>{chargerid}</p>
        <p>{earphone===true?"yes":"no"}</p>
        <div className="item">
        <ReturnModal user={user} />
        </div>
    </Wrapper>
  )
}

export default TableItem;  

const Wrapper=styled.div`
display:flex;
.item,p{
    background:aliceblue;
    padding:10px;
    width:25%;
    border-right:2px solid grey;
}
`