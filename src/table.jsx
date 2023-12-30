import React, { useEffect, useState } from "react";
import ReturnModal from "./components/ReturnModal"
import AddUserModal from "./components/AddUserModal"

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/user/alluser`;
const PER_PAGE = 25;
const filterOptions = [
  { label: "No Filter", value: "" },
  { label: "Filter by Earphone", value: "earphone" },
  { label: "Filter by Charger ID", value: "chargerid" },
  { label: "Filter by Set ID", value: "setid" },
];

export default function App() {
  const [admin,setAdmin]=useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [userName, setUserName] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const makeApiCall = async (userName, page, perPage) => {
    try {
      const userNameSearch = userName !== "" ? `&name=${userName}` : "";
      const filterQuery = selectedFilter ? `&filter=${selectedFilter}` : "";
      
      let resp = await fetch(
        `${API_URL}?page=${page}&perPage=${perPage}${userNameSearch}${filterQuery}`
      );

      resp = await resp.json();
      setUsers(resp.data);
      setTotalPages(resp.totalPages);
    } catch (e) {
      console.error("Error while calling the API", e);
    }
  };

  useEffect(() => {
    makeApiCall(userName, page, PER_PAGE);
  }, [page, userName,selectedFilter]);

  useEffect(() => {
		const sewaString = localStorage.getItem('sewa');
		const sewa = sewaString ? JSON.parse(sewaString) : null;
    //  console.log(sewa);
		if (sewa && sewa.admin===true) {
		  setAdmin(true); // Convert the string to boolean
		}
	  }, []);

  return (
    <div className="container mt-5">
      <div className="flex" style={{alignItems:"center",justifyContent:"space-between"}}>
      <h1 className="mb-4">Users List</h1>
      {admin && <AddUserModal users={users} setUsers={setUsers} /> }
      </div>
     
   
      <div className="mb-5 mt-5">
        <input
          type="text"
          className="form-control text-white p-3 search_box bright_gradient"
          placeholder="Search by Name...."
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      <div className="mb-3">
        <label className="bold mb-2" style={{ fontSize: "20px" }}>
          Select Filter:
        </label>
        {filterOptions.map((option) => (
          <div key={option.value} className="mb-2 bold">
            <label>
              <input
                type="radio"
                name="filter"
                 className="me-2"
                value={option.value}
                checked={selectedFilter === option.value}
                onChange={() => setSelectedFilter(option.value)}
              />
              {option.label}
            </label>
          </div>
        ))}
      </div>


      <div className="mb-3">
        <label htmlFor="page" className="bold mb-2" style={{fontSize:"20px"}}>Select Page</label>
        <select
          id="page"
          className="form-select bordered"
          onChange={(e) => setPage(e.target.value)}
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
<div className="table_container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Set ID</th>
            <th>Charger ID</th>
            <th>Earphone</th>
           {admin && <th>Action</th> }
          </tr>
        </thead>
        <tbody>
          {users.map((user,index) => (
            <tr key={user._id} className={index%2===0?"even_bg":""}>
              <td style={{background:"none"}}>{user.name}</td>
              <td style={{background:"none"}}>{user.setid === "0000" ? "NA" : user.setid}</td>
              <td style={{background:"none"}}>{user.chargerid === "0000" ? "NA" : user.chargerid}</td>
              <td style={{background:"none"}}>{user.earphone ? "Yes" : "No"}</td>
             {admin && <td style={{background:"none"}}><ReturnModal users={users} setUsers={setUsers} user={user} /></td> }

            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
