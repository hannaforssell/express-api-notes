import { renderDocuments } from "./documentRenderer";
import { renderNavbar } from "./navbarRenderer";

const loginContainer = document.getElementById("loginContainer") as HTMLDivElement;

export function createLoginBtn() {
	if (localStorage.getItem("loggedIn")) {
		loginUser();
	} else {
	localStorage.getItem("loggedIn");

	const loginBtn = document.createElement("button");
	loginBtn.id = "loginBtn";
	loginBtn.innerText = "Log in";
	loginContainer.appendChild(loginBtn);

	loginBtn.addEventListener("click", (ev) => {
		ev.preventDefault();
		loginUser();
	});
	}
}

export function loginUser() {
	localStorage.setItem("loggedIn", "true");
	loginContainer.innerHTML = "";
	createLogoutBtn();
	renderNavbar();
	renderDocuments();
}

export function createLogoutBtn() {
	const logoutBtn = document.createElement("button");
	logoutBtn.id = "logoutBtn";
	logoutBtn.innerText = "Log out";
	loginContainer.appendChild(logoutBtn);

	logoutBtn.addEventListener("click", (ev) => {
		ev.preventDefault();
		logoutUser();
	});
}

export function logoutUser() {
	localStorage.removeItem("loggedIn");
	const documentContainer = document.getElementById("documentContainer") as HTMLDivElement;
	const singleDocContainer = document.getElementById("singleDocContainer") as HTMLDivElement;
	const newDocumentContainer = document.getElementById("newDocumentContainer") as HTMLDivElement;
	const navbar = document.getElementById("navbar") as HTMLElement;

	documentContainer.innerHTML = "";
	singleDocContainer.innerHTML = "";
	newDocumentContainer.innerHTML = "";
	navbar.innerHTML = "";
	loginContainer.innerHTML = "";

	createLoginBtn();
}