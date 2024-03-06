const API_key = "614b5b2a0dad76a6e0dcece31db922e2";

async function get_data(city, key) {
	return new Promise((resolve, reject) => {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => resolve(data))
			.catch((error) => reject(error));
	});
}

let input = document.getElementById("input");
let weather = document.getElementById("weather");
let state = document.getElementById("state");
let content = document.getElementById("content");
let temperature = document.getElementById("temp");
let loc = document.getElementById("location");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let error = document.getElementById("error");

let data = {
	coord: { lon: 77.2167, lat: 28.6667 },
	weather: [{ id: 721, main: "Haze", description: "haze", icon: "50n" }],
	base: "stations",
	main: {
		temp: 285.99,
		feels_like: 284.74,
		temp_min: 285.99,
		temp_max: 286.2,
		pressure: 1016,
		humidity: 54,
	},
	visibility: 3500,
	wind: { speed: 3.09, deg: 280 },
	clouds: { all: 75 },
	dt: 1709674164,
	sys: {
		type: 2,
		id: 145989,
		country: "IN",
		sunrise: 1709687457,
		sunset: 1709729645,
	},
	timezone: 19800,
	id: 1273294,
	name: "Delhi",
	cod: 200,
};

function weather_img() {}

async function update() {
	let city = input.value;
	let data;
	await get_data(city, API_key).then((result) => {
		data = result;
	});
	if (data.cod == 200) {
		error.classList.add("hidden");
		content.classList.remove("hidden");
		temperature.innerHTML = `${
			Math.round(Math.round(data.main.temp - 273.15) * 10) / 10
		}°C`;
		let word = data.weather[0].description;
		state.innerHTML = word.charAt(0).toUpperCase() + word.slice(1);
		// weather.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
		weather.src = `Resources/Weather/${data.weather[0].icon}.png`;
		loc.innerHTML = `${data.name}`;
		humidity.innerHTML = `${data.main.humidity}%`;
		wind.innerHTML = `${(data.wind.speed * 3.6).toFixed(2)} KM/H`;
		let sunr = new Date(data.sys.sunrise * 1000);
		let suns = new Date(data.sys.sunset * 1000);
		sunrise.innerHTML = `${sunr.getHours()}:${sunr.getMinutes()} AM`;
		sunset.innerHTML = `${suns.getHours()}:${suns.getMinutes()} PM`;
		if (suns.getHours() > 12) {
			sunset.innerHTML = `${
				suns.getHours() - 12
			}:${suns.getMinutes()} PM`;
		}
	} else if (data.cod == 404) {
		error.classList.remove("hidden");
		content.classList.add("hidden");

		console.error("Please enter a valid city name");
	}
}
