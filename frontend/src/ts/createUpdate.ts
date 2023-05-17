import tinymce from "tinymce";
import * as backendService from "./services/backendService";
import { renderDocument, renderError } from "./documentRenderer";

const documentContainer = document.getElementById("documentContainer") as HTMLDivElement;
const singleDocContainer = document.getElementById("singleDocContainer") as HTMLDivElement;
const newDocumentContainer = document.getElementById("newDocumentContainer") as HTMLDivElement;

export async function createUpdate(id: number | null = null) {
	documentContainer.innerHTML = "";
	singleDocContainer.innerHTML = "";

	const singleDoc = id != null ? await backendService.getSingle(id) : null;

	newDocumentContainer.innerHTML = /*html*/ `
		<form id="documentForm">
			<label>
				<p>Title</p>
				<input type="text" id="title" ${id != null ? `value="${singleDoc?.title}"` : ""}>
			</label>

			<label>
				<p>Description</p>
				<input type="text" id="description" ${id != null ? `value="${singleDoc?.description}"` : ""}>
			</label>

			<label>
				<p>Content</p>
				<textarea id="content">${id != null ? `${singleDoc?.content}` : ""}</textarea>
			</label>
			<br>
			<button type="submit">Submit</button>
		</form>
	`;

	tinymce.remove(); //otherwise it would only display once
	await tinymce.init({
		selector: "#content",
		body_class: "tinymce",
		content_css: "../src/scss/style.scss",
		plugins: "code",
		toolbar: "undo redo | forecolor backcolor | styleselect bold italic | alignleft alignright | code",
		setup: (editor) => {
			editor.on("change", function() {
				editor.save();
			});
		}
	});

	const documentForm = document.getElementById("documentForm") as HTMLFormElement;
	documentForm.addEventListener('submit', async (ev) => {
		ev.preventDefault();
		if (confirm("Are you sure you want to update the document?")) {
			const title = document.getElementById("title") as HTMLInputElement;
			const description = document.getElementById("description") as HTMLInputElement;
			const content = document.getElementById("content") as HTMLTextAreaElement;

			if (title.value == "" || description.value == "" || content.value == "") {
				alert("Please fill out the empty boxes before you submit.")
			} else {
				if (singleDoc != null) {
					let response = await backendService.update(singleDoc.id, title.value, description.value, content.value);
					if (response != null) {
						renderDocument(singleDoc.id);
					} else {
						renderError("Could not update document.");
					}
				} else {
					const newDoc = await backendService.create(title.value, description.value, content.value);
					if (newDoc != null) {
						renderDocument(newDoc.id);
					} else {
						renderError("Could not create document.");
					}
				}
			}
		} else {
			return;
		  } 
	});
}