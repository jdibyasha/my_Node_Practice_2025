const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const users = [{ id: 1, name: "lazu", password: "12345" }];
app.post("/login", (req, res) => {
	const { user, pwd } = req.body;
	const userSign = users.find((u) => u.name === user && u.password === pwd);
	if (userSign) {
		const token = jwt.sign({ id: userSign.id }, "secretkey");
		res.json({ token });
	} else {
		res.status(401).json("unauthorized");
	}
});

app.listen(3001, () => {
	console.log("successfully connected");
});
