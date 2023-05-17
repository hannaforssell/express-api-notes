import { createUpdate } from "./createUpdate";
import * as backendService from "./services/backendService";

const newDocumentContainer = document.getElementById("newDocumentContainer") as HTMLDivElement;
const documentContainer = document.getElementById("documentContainer") as HTMLDivElement;
const singleDocContainer = document.getElementById("singleDocContainer") as HTMLDivElement;

export async function renderDocument(id: number) {	
	documentContainer.innerHTML = "";
	newDocumentContainer.innerHTML = "";
	const singleDoc = await backendService.getSingle(id);

	if (singleDoc == null) {
		renderError("Cound not get document");
	}

	singleDocContainer.innerHTML += /*html*/`
		<div class="singleDoc">
			<h3>${singleDoc.title}</h3>
			<h4>${singleDoc.description}</h4>
			<p>${singleDoc.content}</p>
			<button class="show-doc-btn" id="${singleDoc.id}">Change document</button>
		</div>
	`;

	const changeDocBtn = document.getElementById(JSON.stringify(singleDoc.id)) as HTMLButtonElement;
	changeDocBtn.addEventListener('click', (ev) => {
		ev.preventDefault();
		createUpdate(singleDoc.id);
	});
}

export async function renderDocuments() {
	newDocumentContainer.innerHTML = "";
	documentContainer.innerHTML = "";
	singleDocContainer.innerHTML = "";

	const documents = await backendService.getAll();

	for (const doc of documents) {
		documentContainer.innerHTML += /*html*/`
			<div class="singleDoc">
				<h3>${doc.title}</h3>
				<h4>${doc.description}</h4>
				<p>${doc.content}</p>
				<button class="show-doc-btn" id="${doc.id}">Show document</button>
			</div>
		`;
	}

	const btns = documentContainer.querySelectorAll(".show-doc-btn");

	for (const btn of btns) {
		btn.addEventListener('click', () => {
			renderDocument(Number(btn.id))
		})
	}
}

export function renderError(error: string) {
	singleDocContainer.innerHTML = /*html*/`
		<h3 class="error-message">${error}</h3>
	`;
}
