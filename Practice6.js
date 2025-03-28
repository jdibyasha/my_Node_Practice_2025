import React, { useState } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	useNavigate,
} from "react-router-dom";
import axios from "axios";
import { Home } from "./Home";

export const Redirect = () => {
	return (
		<BrowserRouter>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
			</ul>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/" element={<Authentication />} />
			</Routes>
		</BrowserRouter>
	);
};
const Authentication = () => {
	const [formData, setFormData] = useState({});
	const [token, setToken] = useState("");
	const navigate = useNavigate();
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3001/login", formData)
			.then((res) => {
				setToken(res.data.token);
				navigate("/home");
			})
			.catch((err) => console.log(err));
		console.log(formData);
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>User Name</label>
				<input
					type="text"
					name="user"
					value={formData.user}
					onChange={handleChange}
				/>
				<br />
				<label>Password</label>
				<input
					type="password"
					name="pwd"
					value={formData.pwd}
					onChange={handleChange}
				/>
				<br />
				<button type="submit">Submit</button>
			</form>
		</>
	);
};
