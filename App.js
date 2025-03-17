import React, {
	useRef,
	useEffect,
	useState,
	useMemo,
	memo,
	useCallback,
	Suspense,
} from "react";
import { LayoutEffect } from "./LayoutEffect";
import { Practice } from "./Practice";
import { Router, Routes, Route } from "react-router";
import { Home } from "./Home";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./actions";
import { increment } from "./counterSlice";
import { useDebouncer } from "./useDebouncer";
import Accordion from "./Practice1";
import axios from "axios";
import ErrorBoundary from "./ErrorBoundary";
import { HooksPractice } from "./HooksPractice";
import { Enhanced } from "./withGreetings";
// import { Practice2 } from "./practice2";
// import { Practice3 } from "./practice2";
// import { Practice4 } from "./practice2";
// import { MemoComponent } from "./practice2";
// import { ComponentA } from "./practice2";
// import { Practice6, Practice7, Practice8, Practice9 } from "./practice2";
import MemoizedComponent, {
	Practice1,
	Practice2,
	Practice3,
	Practice5,
	Practice6,
	Practice7,
	Practice8,
	Practice9,
	Practice10,
	Practice11,
} from "./practice3";
import { HelloTest } from "./HelloTest";
const CallMe = (props) => {
	console.log("callMe rendered");
	return (
		<div>
			<button onClick={() => props.text()}>Call Me</button>
		</div>
	);
};
const MemoizeMe = memo(CallMe);

const LazyForm = React.lazy(() =>
	import("./practice2").then((module) => ({ default: module.Practice9 }))
);
function App() {
	const dispatch = useDispatch();
	//Get the state from the redux store
	// const { users, loading, error } = useSelector((state) => state.users);
	const counter = useSelector((state) => state.counter);
	//useRef - allows to access DOM node directly inside functional component
	const inputRef = useRef(null);
	useEffect(() => {
		// inputRef.current.focus();
	});

	//Fetch users when the component mounts
	// useEffect(() => {
	// 	// dispatch(fetchUsers());
	// 	dispatch(increment());
	// }, [dispatch]);
	const handleClick = () => {
		dispatch(increment());
	};

	//Debouncing
	const [value, setValue] = useState("");
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	const debouncedValue = useDebouncer(value);
	// useEffect(() => {
	// 	console.log(debouncedValue);
	// }, [debouncedValue]);

	const [counterValue, setCounterValue] = useState(0);
	const [counterValueOne, setCounterValueOne] = useState(0);
	// const updateCounter = () => {
	// 	const v = counterValue * 2;
	// 	console.log("update counter calling", v);
	// 	return v;
	// };

	const updateCounter = useMemo(() => {
		console.log("update counter calling");
		return counterValue * 2;
	}, [counterValue]);

	const [txt, setTxt] = useState(9);
	// const updateText = () => {
	// 	setTxt(txt + 2);
	// };
	const updateText = useCallback(() => {
		setTxt(txt + 2);
	}, [txt]);

	const [formValue, setFormValue] = useState({
		fullname: "",
		gender: "",
		subject: "",
		resume: "",
	});
	const [studentData, setStudentData] = useState([]);
	const handleForm = (e) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formValue);
		// try {
		// 	const response = await axios.post(
		// 		"http://localhost:5000/api/submit",
		// 		formValue
		// 	);
		// 	console.log("Response:", response.data);
		// } catch (error) {
		// 	console.log("Error:", error);
		// }
	};
	// useEffect(() => {
	// 	axios
	// 		.get("http://localhost:5000/api/fetchStudents")
	// 		.then((result) => setStudentData(result.data));
	// }, []);
	return (
		<div className="App">
			{/* <LayoutEffect /> */}
			{/* <input type="text" ref={inputRef} /> */}
			{/* <Practice /> */}
			{/* <Router>
				<Routes>
					<Route path="/Home" element={<Home/>} />
				</Routes>
			</Router> */}
			{/* <h1>User List{counter.value}</h1>
			<button onClick={handleClick}>Toolkit</button> */}
			{/* <ul>
				{users.map((user) => {
					<li key={user.id}>{user.name}</li>;
				})}
			</ul> */}
			{/* Debouncing */}
			{/* <input value={value} onChange={handleChange} />
			<div dangerouslySetInnerHTML={{ __html: "<b>Hello vicky</b>" }} /> */}
			{/* useMemo */}
			{/* {updateCounter()} */}
			{/* {updateCounter} */}
			{/* <br />
			{counterValue} {counterValueOne}
			<button onClick={() => setCounterValue(counterValue + 1)}>Item1</button>
			<button onClick={() => setCounterValueOne(counterValueOne + 1)}>
				Item2
			</button> */}
			{/* useCallback */}
			{/* <MemoizeMe text={updateText} /> */}
			{/* Form with Validation -  ref:- code with yousaf*/}
			{/* <form onSubmit={handleSubmit}>
				<label>Name</label>
				<input
					type="text"
					name="fullname"
					value={formValue.fullname}
					onChange={(e) => handleForm(e)}
				/>
				<br />
				<label>Gender</label>
				<input
					type="radio"
					name="gender"
					value="male"
					id="gender1"
					onChange={(e) => handleForm(e)}
					// checked={formValue.gender === "male"}
				/>
				Male
				<input
					type="radio"
					name="gender"
					value="female"
					id="gender2"
					onChange={(e) => handleForm(e)}
					// checked={formValue.gender === "female"}
				/>
				Female
				<br />
				<label>Subject</label>
				<select
					name="subject"
					id="subject"
					value={formValue.subject}
					onChange={(e) => handleForm(e)}
				>
					<option value="math">Math</option>
					<option value="physics">Physics</option>
				</select>
				<br />
				<label>Resume</label>
				<input
					type="file"
					name="resume"
					placeholder="Select Resume"
					value={formValue.resume}
					onChange={(e) => handleForm(e)}
				/>
				<br />
				<input type="checkbox" />
				<button>Reset</button>
				<button>Submit</button>
			</form> */}
			{/* {studentData.length}
			<table>
				<tbody>
					{studentData.length > 0 &&
						studentData.map((i) => (
							<tr key={i.ID}>
								<td>{i.ID}</td>
								<td>{i.fullname}</td>
								<td>{i.gender}</td>
							</tr>
						))}
				</tbody>
			</table> */}
			{/* <ErrorBoundary>
				<Accordion />
			</ErrorBoundary> */}
			{/* custom hook */}
			{/* <HooksPractice />
			<Enhanced /> */}
			{/* <Practice2 />
			<Practice3 /> */}
			{/* <Practice4 /> */}
			{/* <MemoComponent name={"vikas"} />
			<MemoComponent name={"vickyyyy"} /> */}
			{/* <ComponentA /> */}
			{/* <Practice6 /> */}
			{/* <Practice7 /> */}
			{/* <Practice8 /> */}
			{/* <Suspense fallback={<div>Loading......</div>}>
				<LazyForm />
			</Suspense> */}
			{/* <HelloTest /> */}
			{/* practice3 */}
			{/* <Practice1 /> */}
			{/* <Practice2 /> */}
			{/* <Practice3 /> */}
			{/* <MemoizedComponent name={"vicky"} />
			<MemoizedComponent name={"lazu"} /> */}
			{/* <Practice5 /> */}
			{/* <Practice6 /> */}
			{/* <Practice7 /> */}
			{/* <Practice8 /> */}
			{/* <Practice9 /> */}
			{/* <Practice10 /> */}
			<Practice11 />
		</div>
	);
}

export default App;
