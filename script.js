"use strict";
const apiKey = "37547dfad2a6cfafbb3bab1999a3f9bf";
const apiKey2 = "a2876e2cbf610e28a466f0f9c82c438f";
//Changing value
const cityValue = document.querySelector(".city-value");
const temperatureValue = document.querySelector(".temperature-value");
const humidityValue = document.querySelector(".humidity-value");
const windValue = document.querySelector(".wind-value");

//Removing hidden
const weatherIconDiv = document.querySelector(".weather-icon ");
const weatherInfo = document.querySelector(".weather-info ");
const temperature = document.querySelector(".temperature");
const mainContainer = document.querySelector(".main-container");
const forecastContainer = document.querySelector(".forecast-div");
//Function for search
const cityInput = document.getElementById("city-input");
const cityInputFunction = function () {
  if (cityInput.value === "") {
    showError("Please enter the city name.");
    revealingDivs();
    forecastContainer.classList.add("hidden");
  } else {
    getWeatherData(cityInput.value);
    getForecastData(cityInput.value);
  }
};
//Ways to trigger weather search
const citySearchBtn = document.getElementById("city-search-btn");
citySearchBtn.addEventListener("click", cityInputFunction);
cityInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    cityInputFunction();
  }
});

const getWeatherData = function (city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        showError("The city was not found.");
      } else {
        const imageId = data.weather[0].icon.slice(0, 2);
        const weatherIcon = document.querySelector(".weather-icon");
        weatherIcon.src = `weather-icons/${imageId}.png`;
        cityValue.textContent = data.name;
        temperatureValue.textContent = data.main.temp.toFixed(0);
        humidityValue.textContent = data.main.humidity;
        windValue.textContent = (data.wind.speed * 3.6).toFixed(1);
      }
      revealingDivs();
      forecastContainer.style.paddingTop = "5rem";
      cityInput.value = "";
    });
};

const getForecastData = function (city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey2}&units=metric`)
    .then((response) => response.json())
    .then((data2) => {
      console.log(data2);
      if (data2.cod === "404") {
        forecastContainer.classList.add("hidden");
        return;
      } else {
        //Filer results
        const filteredListOfDaysDay = data2.list.filter((entry) => entry.dt_txt.includes("12:00:00")).slice(0, 4);
        const filteredListOfDaysNight = data2.list.filter((entry) => entry.dt_txt.includes("06:00:00")).slice(0, 4);
        //Days od week
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        //Getting api
        forecastContainer.innerHTML = "";
        forecastContainer.classList.remove("hidden");
        filteredListOfDaysDay.forEach((day, index) => {
          const date = new Date(day.dt_txt);
          const dayName = daysOfWeek[date.getDay()];
          const pictureID = day.weather[0].icon.slice(0, 2);
          const maxTemp = Math.round(day.main.temp_max);
          const minTemp = Math.round(filteredListOfDaysNight[index].main.temp_min);
          //Creating new element
          const forecastEachDay = document.createElement("div");
          forecastEachDay.classList.add("forecast-each-day");
          forecastEachDay.innerHTML = `<p class="day-of-week">${dayName}</p>
          <img src="weather-icons/${pictureID}.png" class="forecast-img">
          <p class="each-day-temperature"><span class="day-forecast">${maxTemp}°C</span><span> / </span><span class="night-forecast gray">${minTemp}°C</span></p>`;
          forecastContainer.appendChild(forecastEachDay);
        });
      }
    });
};

//Reveling divs
const revealingDivs = function () {
  cityValue.classList.remove("hidden");
  weatherIconDiv.classList.remove("hidden");
  weatherInfo.classList.remove("hidden");
  temperature.classList.remove("hidden");
  mainContainer.style.paddingBottom = "7rem";
};
//Error message
const showError = function (message) {
  cityValue.textContent = message;
  temperatureValue.textContent = "-";
  humidityValue.textContent = "-";
  windValue.textContent = "-";
};
