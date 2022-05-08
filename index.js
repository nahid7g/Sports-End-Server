const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

// MiddleWare
app.use(cors())
app.use(express.json())

// Use Express
app.get("/",(req,res) => {
	res.send("Running perfectly!")
})
app.listen(port,() => {
	console.log("Running from port:",port)
})