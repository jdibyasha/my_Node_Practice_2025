// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const StudentData = require("./models/students");

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// mongoose
// 	.connect("mongodb://127.0.0.1:27017/student")
// 	.then(() => console.log("Connected to MongoDB"))
// 	.catch((err) => console.log(err));

// //API to handle form submission
// app.post("/api/create", async (req, res) => {
// 	const studentData = new StudentData(req.body);
// 	try {
// 		const saveData = await studentData.save();
// 		res.status(200).json(saveData);
// 	} catch (err) {
// 		res.status(500).json({ message: "Error savingd data", error: err });
// 	}
// });

// // app.get("/api/get",async(req,res)=>{

// // })

// app.listen(3001, () => {
// 	console.log("Server is running successfully at port 3001");
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const StudentDatas = require("./models/students");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
	.connect("mongodb://localhost:27017/student")
	.then(() => console.log("successfully connected to the database"))
	.catch((err) => console.log(err));

app.post("/api/create", async (req, res) => {
	const studentDatas = new StudentDatas(req.body);
	try {
		const saveData = await studentDatas.save();
		res.status(200).json(saveData);
	} catch (error) {
		res.status(500).json({ message: "something is wrong", err: error });
	}
});

app.get("/api/fetchData", async (req, res) => {
	try {
		const fetchedData = await StudentDatas.find();
		res.json(fetchedData);
	} catch (error) {
		res.status(500).json(error);
	}
});

app.put("/api/update/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const updateData = req.body;
		const updateStudent = await StudentDatas.findByIdAndUpdate(id, updateData, {
			new: true,
		});
		console.log(updateStudent);
		if (!updateStudent) {
			res.status(400).json({ message: "Student not found" });
		}
		res.status(200).json(updateStudent);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
app.delete("/api/delete/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deletedStudent = await StudentDatas.findByIdAndDelete(id);
		if (!deletedStudent) {
			res.status(404).json({ message: "Student not found" });
		}
		res.status(200).json(deletedStudent);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
app.listen(3001, () => console.log("successfully running at port 3001"));
