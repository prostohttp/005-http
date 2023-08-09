#!/usr/bin/env node
import { createInterface } from "node:readline/promises";
import { get } from "node:http";
import isOnline from "is-online";
import { stringify } from "node:querystring";
import { stdin as input, stdout as output } from "node:process";
import { api, url } from "./config.js";

const rl = createInterface({ input, output });

const nextHandler = async () => {
	const next = await rl.question(
		"Хотите посмотреть погоду в другом городе? (y/n): "
	);
	if (next.toLowerCase() === "y") {
		httpHandler(api, url);
	} else {
		rl.close();
	}
};
const renderViewHandler = (data) => {
	console.log(`В городе ${data.location.name}, который находится в ${data.location.country} на  ${data.location.localtime} следующая погода:
температура - ${data.current.temperature}
${data.current.weather_descriptions[0]}
скорость ветра - ${data.current.wind_speed} м/c
направление ветра - ${data.current.wind_dir}
`);
};

const httpHandler = async (api, url) => {
	const location = await rl.question(`Введите название города: `);
	const params = {
		access_key: api,
		query: location,
	};

	get(`${url}current?${stringify(params)}`, (res) => {
		if (res.statusCode !== 200) {
			console.log(`statusCode: ${statusCode}`);
			rl.close();
		}
		res.setEncoding("utf8");
		let rowData = "";
		res.on("data", (chunk) => (rowData += chunk));
		res.on("end", () => {
			let parseData = JSON.parse(rowData);
			if ("error" in parseData) {
				console.log(parseData.error.info);
			} else {
				renderViewHandler(parseData);
			}
			nextHandler();
		});
	}).on("error", (err) => {
		console.error(`${err}`);
		rl.close();
	});
};
const weatherApp = async (api, url) => {
	if (await isOnline()) {
		await httpHandler(api, url);
	} else {
		console.log("Нет интернет соединения. Попробуйте позже");
		rl.close();
	}
};

weatherApp(api, url);
