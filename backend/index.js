const express = require("express");

const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

const connectionService = require("./src/services/connectionService");
const documentRouter = require("./src/routes/documentRoute");

app.use(cors());

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.get("/", (req, res) => {
	res.json({ message: "ok" });
});

app.use("/documents", documentRouter);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({ message: err.message });

	next();
});

connectionService.connectDatabase();

app.listen(port, "0.0.0.0", () => {
	console.log(`App is running at http://localhost:${port}`);
});
