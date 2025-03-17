import React, {
	useRef,
	useEffect,
	useLayoutEffect,
	useState,
	useMemo,
	useCallback,
	memo,
	useReducer,
	useContext,
} from "react";
import axios from "axios";
//useRef
export const Practice1 = () => {
	const inputRef = useRef(null);
	useEffect(() => {
		inputRef.current.focus();
	}, []);
	return (
		<div>
			<input type="text" ref={inputRef} />
		</div>
	);
};

//useLayoutEffect vs useEffect
export const Practice2 = () => {
	const [text, setText] = useState(
		"Loading/////////////////////==========================================================="
	);
	useLayoutEffect(() => {
		setText("Hello");
	}, [text]);
	return <div>{text}</div>;
};

//useMemo
export const Practice3 = () => {
	const [count1, setCount1] = useState(0);
	const [count2, setCount2] = useState(0);
	const updateCount = useMemo(() => {
		console.log("updateCount is calling");
		return count1 * 2;
	}, [count1]);
	return (
		<div>
			{updateCount}
			<br />
			<button onClick={() => setCount1(count1 + 4)}>Count1</button>
			{count1}
			<br />
			<button onClick={() => setCount2(count2 + 5)}>Count2</button>
			{count2}
		</div>
	);
};

//memo
const Practice4 = ({ name = "vikas", fn = () => {} }) => {
	console.log("rendered");
	return (
		<div>
			Welcome {name}
			<button onClick={fn}>Click Me</button>
		</div>
	);
};
const MemoizedComponent = memo(Practice4);
// export default MemoizedComponent;

//useCallback
export const Practice5 = () => {
	const [count, setCount] = useState(0);
	const [item, setItem] = useState(null);
	const handleText = useCallback(() => {
		setItem("Hello vicky");
	}, [item]);
	return (
		<div>
			<button onClick={() => setCount(count + 2)}>Count</button>
			{count}
			<MemoizedComponent fn={handleText} />
			{item}
		</div>
	);
};

//useReducer
export const Practice6 = () => {
	function reducer(state, action) {
		switch (action) {
			case "increment":
				return { ...state, name: "vicky" };
			default:
				return state;
		}
	}
	const obj = { name: "vikas", city: "UP" };
	const [state, dispatch] = useReducer(reducer, obj);
	return (
		<div>
			<h1>{state.name}</h1>
			<button onClick={() => dispatch("increment")}>Increment</button>
		</div>
	);
};

//useContext
const ComponentA = () => {
	return <ComponentB />;
};
const ComponentB = () => {
	const user = useContext(UserContext);
	return <div>{user}</div>;
};
const UserContext = React.createContext();
export const Practice7 = () => {
	return (
		<div>
			<UserContext.Provider value={"vikas"}>
				<ComponentA />
			</UserContext.Provider>
		</div>
	);
};

//Debouncing
const useDebouncer = (initialValue, delay = 3000) => {
	const [debouncedValue, setDebouncedValue] = useState(initialValue);
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(initialValue);
		}, delay);
		return () => {
			clearTimeout(timer);
		};
	}, [initialValue, delay]);
	return debouncedValue;
};
export const Practice8 = () => {
	const [value, setValue] = useState("");
	const debouncedValue = useDebouncer(value);
	const handleInput = (e) => {
		setValue(e.target.value);
	};
	useEffect(() => {
		if (debouncedValue !== "") {
			console.log(debouncedValue);
		}
	}, [debouncedValue]);
	return (
		<div>
			<input type="text" onKeyUp={handleInput} />
		</div>
	);
};

//custom Hook
const useCounter = (initialValue) => {
	const [value, setValue] = useState(initialValue);
	const increment = () => {
		setValue((prevValue) => prevValue + 1);
	};
	const decrement = () => {
		setValue((prevValue) => prevValue - 1);
	};
	const reset = () => {
		setValue(initialValue);
	};
	return [value, increment, decrement, reset];
};
export const Practice9 = () => {
	const [count, increment, decrement, reset] = useCounter(0);
	return (
		<div>
			<h2>{count}</h2>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
			<button onClick={reset}>Reset</button>
		</div>
	);
};

//HOC
const HelloWorld = (props) => {
	return <div>Hello World{props.data}</div>;
};

const withGreetings = (Component) => {
	return function EnhancedComponent() {
		return (
			<div>
				<Component data={"welcome"} />
			</div>
		);
	};
};
export const Practice10 = withGreetings(HelloWorld);

//Form
export const Practice11 = () => {
	const [formData, setFormData] = useState({});
	const [students, setStudents] = useState([]);
	// const handleChange = (e) => {
	// 	if (e.target.type === "checkbox") {
	// 		setFormData((prevData) => ({
	// 			...prevData,
	// 			hobbies: { ...prevData.hobbies, [e.target.name]: e.target.checked },
	// 		}));
	// 	} else {
	// 		setFormData({ ...formData, [e.target.name]: e.target.value });
	// 	}
	// };
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	axios
	// 		.post("http://localhost:3001/api/create", formData)
	// 		.then((res) => console.log(res))
	// 		.catch((error) => console.log(error));
	// };
	const handleChange = (e) => {
		if (e.target.type === "checkbox") {
			setFormData((prevData) => ({
				...prevData,
				hobbies: { ...prevData.hobbies, [e.target.name]: e.target.checked },
			}));
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData._id) {
			const studentId = formData._id;
			axios
				.put(`http://localhost:3001/api/update/${studentId}`, formData)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		} else {
			axios
				.post("http://localhost:3001/api/create", formData)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		}
		setFormData({});
	};
	useEffect(() => {
		axios
			.get("http://localhost:3001/api/fetchData")
			.then((res) => setStudents(res.data))
			.catch((error) => console.log(error));
	}, [students]);
	const handleClick = (id) => {
		const student = students.find((obj) => obj._id === id);
		setFormData(student);
	};
	const handleDelete = (id) => {
		axios
			.delete(`http://localhost:3001/api/delete/${id}`)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	return (
		// <form onSubmit={handleSubmit}>
		// 	<label>Name</label>
		// 	<input
		// 		type="text"
		// 		name="fname"
		// 		onChange={handleChange}
		// 		value={formData?.fname || ""}
		// 	/>
		// 	<br />
		// 	<label>Gender</label>
		// 	<label>Male</label>
		// 	<input
		// 		type="radio"
		// 		name="gender"
		// 		id="gender1"
		// 		value="Male"
		// 		checked={formData.gender === "Male"}
		// 		onChange={handleChange}
		// 	/>
		// 	<label>Female</label>
		// 	<input
		// 		type="radio"
		// 		name="gender"
		// 		id="gender2"
		// 		value="Female"
		// 		checked={formData.gender === "Female"}
		// 		onChange={handleChange}
		// 	/>
		// 	<br />
		// 	<label>Course</label>
		// 	<select name="course" value={formData.course} onChange={handleChange}>
		// 		<option>--Select--</option>
		// 		<option value="python">Python</option>
		// 		<option value="node">Node</option>
		// 	</select>
		// 	<br />
		// 	<label>Hobbies</label>
		// 	<input
		// 		type="checkbox"
		// 		name="reading"
		// 		id="reading"
		// 		checked={formData.hobbies?.reading || false}
		// 		onChange={handleChange}
		// 	/>
		// 	<input
		// 		type="checkbox"
		// 		name="eating"
		// 		id="eating"
		// 		checked={formData.hobbies?.eating || false}
		// 		onChange={handleChange}
		// 	/>
		// 	<button type="submit">Submit</button>
		// </form>
		<div>
			<table border={1}>
				<thead>
					<tr>
						<td>Sl no.</td>
						<td>Name</td>
						<td>Gender</td>
						<td>Course</td>
						<td>Hobbies</td>
						<td>Action</td>
					</tr>
				</thead>
				<tbody>
					{students &&
						students.map((item, index) => (
							<tr key={item._id}>
								<td>{index + 1}</td>
								<td>{item.fname}</td>
								<td>{item.gender}</td>
								<td>{item.course}</td>
								<td>
									{Object.keys(item.hobbies)
										.filter((obj) => item.hobbies[obj] === "true")
										.join(", ")}
								</td>
								<td>
									<button onClick={() => handleClick(item._id)}>Update</button>
									<button onClick={() => handleDelete(item._id)}>Delete</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<br />
			<br />
			<form onSubmit={handleSubmit}>
				<label>Name</label>
				<input
					type="text"
					name="fname"
					value={formData?.fname || ""}
					onChange={handleChange}
				/>
				<label>Gender:</label>
				<label>Male</label>
				<input
					type="radio"
					name="gender"
					id="gender1"
					value="male"
					checked={formData.gender === "male"}
					onChange={handleChange}
				/>
				<label>Female</label>
				<input
					type="radio"
					name="gender"
					id="gender1"
					value="female"
					checked={formData.gender === "female"}
					onChange={handleChange}
				/>
				<label>Courses</label>
				<select name="course" value={formData.course} onChange={handleChange}>
					<option>---Select---</option>
					<option value="python">Python</option>
					<option value="node">Node</option>
				</select>
				<label>Hobbies</label>
				<label>Reading</label>
				<input
					type="checkbox"
					name="reading"
					checked={JSON.parse(formData.hobbies?.reading || "false")}
					onChange={handleChange}
				/>
				<label>Cooking</label>
				<input
					type="checkbox"
					name="cooking"
					checked={JSON.parse(formData.hobbies?.cooking || "false")}
					onChange={handleChange}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};
