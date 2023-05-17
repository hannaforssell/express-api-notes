import { createUpdate } from "./createUpdate";
import { renderDocuments } from "./documentRenderer";

const navbar = document.getElementById("navbar") as HTMLElement;

export function renderNavbar() {
	navbar.innerHTML = "";

	const ul = document.createElement("ul");
	const viewDocs = document.createElement("li");
	const viewDocsBtn = document.createElement("button");
	const createDoc = document.createElement("li");
	const createDocBtn = document.createElement("button");


	viewDocsBtn.innerText = "View Documents";
	viewDocs.style.listStyleType = "none";
	createDocBtn.innerText = "Create Document";
	createDoc.style.listStyleType = "none";

	ul.append(viewDocs, createDoc);
	viewDocs.appendChild(viewDocsBtn);
	createDoc.appendChild(createDocBtn);
	navbar.appendChild(ul);

	viewDocsBtn.addEventListener('click', renderDocuments);
	createDocBtn.addEventListener('click', () => createUpdate() );
}
