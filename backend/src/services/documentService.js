const connectionService = require("./connectionService");

async function getAll() {
	return new Promise((resolve, reject) => {
		connectionService.db.query("SELECT * FROM documents", (err, data) => {
			if (data === undefined || err) {
				reject(new Error("Error when getting documents"));
			} else {
				data.map(text => {
					text.content = Buffer.from(text.content).toString();
				});
				resolve(data);
			}
		});
	});
}

async function getSingle(id) {
	return new Promise((resolve, reject) => {
		connectionService.db.query(`SELECT * FROM documents WHERE id = ?`, [id], (err, data) => {
			if (data === undefined || err) {
				reject(new Error("Error when getting document"));
			} else {
				let document = data[0];
				document.content = Buffer.from(document.content).toString();
				resolve(document);
			}
		});
	});
}

async function create(title, description, content) {
	return new Promise((resolve, reject) => {
		connectionService.db.query(`INSERT INTO documents (title, description, content) VALUES (?, ?, ?)`, [title, description, content], (err, data) => {
			if (data === undefined || err) {
				reject(new Error("Error when creating document"));
			} else {
				resolve(data);
			}
		});
	});
}

async function update(id, title, description, content) {
	return new Promise((resolve, reject) => {
		connectionService.db.query(`UPDATE documents SET title = ?, description = ?, content = ? WHERE id = ?`, [title, description, content, id], (err, data) => {
			if (data === undefined || err) {
				reject(new Error("Error when updating document"));
			} else {
				resolve(data);
			}
		});
	});
}

module.exports = {
	getAll,
	getSingle,
	create,
	update
};
