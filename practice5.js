import React, {
	useState,
	useLayoutEffect,
	useEffect,
	useReducer,
	useContext,
	createContext,
	useRef,
	useMemo,
	useCallback,
} from "react";
import {
	BrowserRouter,
	Route,
	Routes,
	Link,
	useParams,
	useNavigate,
} from "react-router-dom";
import axios from "axios";

//Difference between useLayoutEffect,useEffect
export const Practice1 = () => {
	const [text, setText] = useState(
		"Loading=====================###############################################"
	);
	useLayoutEffect(() => {
		setText("hello");
	}, [text]);
	return <div>{text}</div>;
};

//useReducer
export const Practice2 = () => {
	function reducer(state, action) {
		switch (action) {
			case "update":
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
			<button onClick={() => dispatch("update")}>Update</button>
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
const UserContext = createContext();
export const Practice3 = () => {
	return (
		<div>
			<UserContext.Provider value={"vikas"}>
				<ComponentA />
			</UserContext.Provider>
		</div>
	);
};

//useRef
export const Practice4 = () => {
	const inputRef = useRef(null);
	useEffect(() => {
		inputRef.current.focus();
	});
	return (
		<div>
			<input type="text" ref={inputRef} />
		</div>
	);
};

//useMemo
export const Practice5 = () => {
	const [count, setCount] = useState(0);
	const [count1, setCount1] = useState(0);
	const updateCounter = useMemo(() => {
		console.log("function called");
		return count1 * 5;
	}, [count1]);
	return (
		<div>
			{updateCounter}
			{count}
			<button onClick={() => setCount(count + 1)}>+</button>
			<button onClick={() => setCount1(count1 + 1)}>update</button>
		</div>
	);
};

//useCallback
const Child = ({ handleChange }) => {
	console.log("Child called");
	return (
		<div>
			<button onClick={() => handleChange("Hello world")}>Change Text</button>
		</div>
	);
};
const MemoizedComponent = React.memo(Child);
export const Practice6 = () => {
	const [count, setCount] = useState(0);
	const [item, setItem] = useState("Hello");
	const handleChange = useCallback(
		(name) => {
			setItem(name);
		},
		[item]
	);
	return (
		<div>
			{count}
			{item}
			<button onClick={() => setCount(count + 2)}>+</button>
			<MemoizedComponent handleChange={handleChange} />
		</div>
	);
};
// export default Practice6;

//React.memo
const Greet = ({ name }) => {
	console.log("calling child for", name);
	return <div>Hello {name}</div>;
};
const ChildMemo = React.memo(Greet);
// export default ChildMemo;

//Debouncing
const useDebouncer = (initialValue, delay = 3000) => {
	const [debouncedValue, setDebouncedValue] = useState(initialValue);
	useEffect(() => {
		let timer = setTimeout(() => {
			setDebouncedValue(initialValue);
		}, delay);
		return () => {
			clearTimeout(timer);
		};
	}, [initialValue, delay]);
	return debouncedValue;
};
export const Practice7 = () => {
	const [value, setValue] = useState("");
	const debouncedValue = useDebouncer(value);
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	useEffect(() => {
		console.log(debouncedValue);
	}, [debouncedValue]);
	return (
		<div>
			<input type="text" onKeyUp={handleChange} />
		</div>
	);
};

//Custom Hook
const useCounter = (initialValue) => {
	const [count, setCount] = useState(initialValue);
	const increment = () => {
		setCount(count + 1);
	};
	const decrement = () => {
		setCount(count - 1);
	};
	const reset = () => {
		setCount(initialValue);
	};
	return [count, increment, decrement, reset];
};
export const Practice8 = () => {
	const [count, increment, decrement, reset] = useCounter(0);
	return (
		<div>
			{count}
			<button onClick={increment}>ADD</button>
			<button onClick={decrement}>Decrease</button>
			<button onClick={reset}>Reset</button>
		</div>
	);
};

//Handling Form
export const Practice9 = () => {
	const [formData, setFormData] = useState({});
	const [userData, setUserData] = useState([]);
	const handleChange = (e) => {
		if (e.target.type === "checkbox") {
			console.log("hello");
			setFormData((prevData) => ({
				...prevData,
				hobbies: { ...prevData.hobbies, [e.target.name]: e.target.checked },
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				[e.target.name]: e.target.value,
			}));
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData._id) {
			const userId = formData._id;
			axios
				.post(`http://localhost:3001/api/update/${userId}`, formData)
				.then((res) => console.log(res))
				.catch((err) => console.log(err.message));
		}
		axios
			.post("http://localhost:3001/api/create", formData)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		axios
			.get("http://localhost:3001/api/fetchData")
			.then((res) => setUserData(res.data))
			.catch((error) => console.log(error.message));
	}, [userData]);
	const handleClick = (e) => {
		const { id } = e.target;
		const updateData = userData.find((obj) => obj._id === id);
		setFormData(updateData);
	};
	const handleDelete = (e) => {
		const { id } = e.target;
		axios
			.delete(`http://localhost:3001/api/deleteData/${id}`)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Sl.no.</th>
						<th>Name</th>
						<th>Gender</th>
						<th>Course</th>
						<th>Hobbies</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{userData.length > 0 &&
						userData.map((item, index) => (
							<tr key={item._id}>
								<td>{index + 1}</td>
								<td>{item.fname}</td>
								<td>{item.gender}</td>
								<td>{item.course}</td>
								<tr>
									{Object.keys(item.hobbies)
										.filter((key) => item.hobbies[key] === "true")
										.join(", ")}
								</tr>
								<td>
									<button id={item._id} onClick={handleClick}>
										Edit
									</button>
									<button id={item._id} onClick={handleDelete}>
										Delete
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<br />
			<form onSubmit={handleSubmit}>
				<label>Full Name</label>
				<input
					type="text"
					name="fname"
					value={formData.fname}
					onChange={handleChange}
				/>
				<br />
				<label>Gender</label>
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
					id="gender2"
					value="female"
					checked={formData.gender === "female"}
					onChange={handleChange}
				/>
				<br />
				<label>Course</label>
				<select name="course" value={formData.course} onChange={handleChange}>
					<option>--select course--</option>
					<option value="Python">Python</option>
					<option value="NodeJS">NodeJS</option>
				</select>
				<br />
				<label>Hobbies</label>
				<label>Reading</label>
				<input
					type="checkbox"
					name="reading"
					checked={formData.hobbies?.reading || false}
					onChange={handleChange}
				/>
				<label>Writing</label>
				<input
					type="checkbox"
					name="writing"
					checked={formData.hobbies?.writing || false}
					onChange={handleChange}
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

//Accordion
export const Practice10 = () => {
	const [content, setContent] = useState([
		{
			id: 1,
			title: "HTML",
			desc: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser",
			show: false,
		},
		{
			id: 2,
			title: "CSS",
			desc: "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
			show: false,
		},
		{
			id: 3,
			title: "Javascript",
			desc: "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
			show: false,
		},
	]);
	const showContent = (id) => {
		const updatedContent = content.map((item, index) => {
			if (item.id === id) {
				if (!item.show) {
					document.getElementById(id).innerHTML = "-";
					return { ...item, show: true };
				} else {
					document.getElementById(id).innerHTML = "+";
					return { ...item, show: false };
				}
			}
			return item;
		});
		setContent(updatedContent);
	};
	return (
		<div>
			{content.map((item) => (
				<div key={item.id}>
					<p>
						{item.title}
						<button id={item.id} onClick={() => showContent(item.id)}>
							+
						</button>
					</p>
					<p style={{ display: item.show ? "block" : "none" }}>{item.desc}</p>
				</div>
			))}
		</div>
	);
};

//Error Boundary
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError(error) {
		return { hasError: true };
	}
	componentDidCatch(error, errorInfo) {
		console.error("Error captured by the Error boundary", error, errorInfo);
	}
	render() {
		if (this.state.hasError) {
			return <h1>Something went wrong</h1>;
		}
		return this.props.children;
	}
}
export default ErrorBoundary;

//Pagination
const Pagination = ({ total, postsPerPage, setCurrentpage }) => {
	let page = [];
	for (let i = 1; i <= Math.ceil(total / postsPerPage); i++) {
		page.push(i);
	}
	return (
		<div>
			{page.map((item, index) => (
				<button key={index} onClick={() => setCurrentpage(item)}>
					{item}
				</button>
			))}
		</div>
	);
};

export const Practice11 = () => {
	const [data, setData] = useState([]);
	const [currentPage, setCurrentpage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(10);
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos/")
			.then((res) => res.json())
			.then((data) => setData(data))
			.catch((err) => err);
	});
	const lastIndex = currentPage * postsPerPage;
	const startIndex = lastIndex - postsPerPage;
	const showData = data.slice(startIndex, lastIndex);
	return (
		<div>
			{JSON.stringify(showData)}
			<Pagination
				total={data.length}
				postsPerPage={postsPerPage}
				setCurrentpage={setCurrentpage}
			/>
		</div>
	);
};

//Lazy Loading
export const Practice12 = () => {
	return <div>Hello World</div>;
};

//React Router
const Home = () => {
	return <div>Home</div>;
};

const AboutUs = () => {
	return <div>About Us</div>;
};

export const Practice13 = () => {
	return (
		<BrowserRouter>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About Us</Link>
				</li>
			</ul>

			<Routes>
				<Route path="/" element={<Home />}>
					Home
				</Route>
				<Route path="/about" element={<AboutUs />}>
					About Us
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

//Pagination withdynamic routing
export const Practice14 = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="page/:pageNumber" element={<Sample />} />
				<Route path="/" element={<Sample />} />
			</Routes>
		</BrowserRouter>
	);
};
const Pagination1 = ({ total, postsPerPage, handlePageNumber }) => {
	let pages = [];
	for (let i = 1; i <= Math.ceil(total / postsPerPage); i++) {
		pages.push(i);
	}
	return (
		<div>
			{pages.map((item, index) => (
				<button key={index} onClick={() => handlePageNumber(item)}>
					{item}
				</button>
			))}
		</div>
	);
};

const Sample = () => {
	const { pageNumber } = useParams();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1);
	const [postsPerPage, setPostsPerPage] = useState(10);
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos/")
			.then((res) => res.json())
			.then((data) => setData(data))
			.catch((err) => err);
	}, []);
	const lastIndex = currentPage * postsPerPage;
	const startIndex = lastIndex - postsPerPage;
	const currentData = data.slice(startIndex, lastIndex);
	const handlePageChange = (page) => {
		setCurrentPage(page);
		navigate(`/page/${page}`);
	};
	return (
		<div>
			{JSON.stringify(currentData)}
			<Pagination1
				total={data.length}
				postsPerPage={postsPerPage}
				handlePageNumber={handlePageChange}
			/>
		</div>
	);
};

//HOC
const SampleComponent = () => {
	return <div>Hello HOC</div>;
};
const Practice = (WrappedComponent) => {
	return () => (
		<div>
			It is a Higher Order Component
			<WrappedComponent />
		</div>
	);
};
export const Practice15 = Practice(SampleComponent);
