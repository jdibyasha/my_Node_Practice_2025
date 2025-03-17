// const mongoose = require("mongoose");

// //Create a schema for the student data
// const studentSchema = new mongoose.Schema({
// 	fname: String,
// 	gender: String,
// 	course: String,
// 	hobbies: {
// 		reading: Boolean,
// 		cooking: Boolean,
// 	},
// });

// const StudentData = mongoose.model("studentData", studentSchema);

// module.exports = StudentData;

const mongoose = require("mongoose");

//create a schema
const studentSchema = new mongoose.Schema({
	fname: { type: String, unique: true },
	gender: String,
	course: String,
	hobbies: {
		reading: String,
		cooking: String,
	},
});
//create a model
const StudentDatas = mongoose.model("studentdatas", studentSchema);
module.exports = StudentDatas;
