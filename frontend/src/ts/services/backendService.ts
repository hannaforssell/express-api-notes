import axios from "axios";
import { IDocument } from "../models/IDocument";

const BASE_URL = `http://localhost:3000`;

export async function getAll(): Promise<IDocument[]> {
	return axios({
		method: "get",
		url: BASE_URL + "/documents"
	}).then((data) => {
		return data.data;
	}).catch(() => {
		return null;
	});
}

export async function getSingle(id: number): Promise<IDocument> {
	return axios({
		method: "get",
		url: BASE_URL + `/documents/${id}`
	}).then((data) => {
		return data.data;
	}).catch(() => {
		return null;
	});
}

export async function create(title: string, description: string, content: string) {
	return axios({
		method: "post",
		url: BASE_URL + "/documents/add",
		data: {
			title: title,
			description: description,
			content: content
		}
	}).then((data) => {
		return data.data;
	}).catch(() => {
		return null;
	});
}

export async function update(id: number, title: string, description: string, content: string) {
	return axios({
		method: "put",
		url: BASE_URL + `/documents/update/${id}`,
		data: {
			title: title,
			description: description,
			content: content
		}
	}).then((data) => {
		return data.data;
	}).catch(() => {
		return null;
	});
}