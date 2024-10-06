const apiKey = 'b18371db2344db11075bada3dfddedf5';

const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const weatherResult = document.getElementById('weather-result');

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      const { name, main, weather } = data;

      cityName.textContent = `Weather in ${name}`;
      temperature.textContent = `Temperature: ${main.temp}°C`;
      description.textContent = `Description: ${weather[0].description}`;
      humidity.textContent = `Humidity: ${main.humidity}%`;

      weatherResult.style.display = 'block';
    })
    .catch(error => {
      alert('Error: ' + error.message);
      weatherResult.style.display = 'none';
    });
}
weatherForm.addEventListener('submit', event => {
  event.preventDefault();

  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    cityInput.value = '';
  }
});