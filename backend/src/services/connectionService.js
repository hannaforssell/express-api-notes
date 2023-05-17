const mysql = require("mysql2");
require('dotenv').config();

let db;

function connectDatabase() {
	if (!db) {
		db = mysql.createConnection({
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
		});

		db.connect((err) => {
			if (!err) {
				console.log("Database is connected!");
			} else {
				console.log("Error connecting database!");
			}
		});
	}
	this.db = db;
}

module.exports = {
	connectDatabase,
	db,
};
