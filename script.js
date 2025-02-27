"use strict";
const apiKey = "37547dfad2a6cfafbb3bab1999a3f9bf";

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

//Function for search
const cityInput = document.getElementById("city-input");
const cityInputFunction = function () {
  if (cityInput.value === "") {
    showError("Please enter the city name.");
  } else {
    getWeatherData(cityInput.value);
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
        /*console.log(data);*/
        const imageId = data.weather[0].icon.slice(0, 2);
        const weatherIcon = document.querySelector(".weather-icon");
        weatherIcon.src = `weather-icons/${imageId}.png`;
        cityValue.textContent = data.name;
        temperatureValue.textContent = data.main.temp.toFixed(0);
        humidityValue.textContent = data.main.humidity;
        windValue.textContent = (data.wind.speed * 3.6).toFixed(1);
      }
      cityValue.classList.remove("hidden");
      weatherIconDiv.classList.remove("hidden");
      weatherInfo.classList.remove("hidden");
      temperature.classList.remove("hidden");
      mainContainer.style.paddingBottom = "7rem";
      cityInput.value = "";
    });
};
const showError = function (message) {
  cityValue.textContent = message;
  temperatureValue.textContent = "-";
  humidityValue.textContent = "-";
  windValue.textContent = "-";
};
