import { useEffect, useState } from "react";
import axios from "axios";
import { Link , useNavigate} from "react-router-dom";
import {toast} from "react-toastify"


const Signup = () => {

	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",  
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	useEffect(() => {
		const sewaString = localStorage.getItem('sewa');
		if(sewaString) navigate("/")
	}, [])
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${process.env.REACT_APP_BASE_URL}/api/admin/signup`;
			await axios.post(url, data);
            toast.success("Registered Successfully!")
			navigate("/login");
			
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
            toast.error("some error occurred!") 
		}
	};


  return (
    <div className="wrapper">
      
        <form className="form_container" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
						/>
						{error && <div className="error">{error}</div>}
						<button className="bright_gradient text-white bold" type="submit" >
							Sign Up
						</button>
						<p>Already have an account? <a href="/login">Login</a></p>
        </form>

       
    </div> 
    
  )
}

export default Signup
