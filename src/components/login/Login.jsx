import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import "./Login.css"


const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    useEffect(() => {
        const sewaString = localStorage.getItem('sewa');
        if (sewaString) navigate("/")
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const url = `${process.env.REACT_APP_BASE_URL}/api/admin/login`;
            const { data: res } = await axios.post(url, data);

            const obj = {
                token: res?.data,
                admin: res?.user?.isAdmin
            }

            localStorage.setItem("sewa", JSON.stringify(obj));
            toast.success("Logged in successfully!")
            navigate("/")
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
            toast.error("Error in signing up!")
        }
    };

    return (
        <div className="wrapper">
         
            <form className="form_container " onSubmit={handleSubmit}>
                <h1>Log In </h1>
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
                    Sign In
                </button>
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </form>
           
        </div>
    );
};

export default Login;

