const documentService = require("../services/documentService");

async function getAll(req, res) {
	let response = await documentService.getAll();
	res.json(response);
}

async function getSingle(req, res) {	
	if (!req.params.id) {
		res.status(404).json();
		return;
	}
	let response = await documentService.getSingle(req.params.id);
	res.json(response);
}

async function create(req, res) {
	let newDoc = req.body;

	if (!newDoc.title || !newDoc.description || !newDoc.content) {
		res.status(400).json();
		return;
	}

	let response = await documentService.create(newDoc.title, newDoc.description, newDoc.content);
	res.status(201).json({ id: response.insertId });
}

async function update(req, res) {
	let newDoc = req.body;

	if (newDoc.title == "" || newDoc.description == "" || newDoc.content == "") {
		res.status(400).json();
		return;
	}

	await documentService.update(req.params.id, newDoc.title, newDoc.description, newDoc.content);
	res.status(200).json();
}

module.exports = {
	getAll,
	getSingle,
	create,
	update
};
