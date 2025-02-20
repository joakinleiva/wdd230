document.getElementById("year").textContent = new Date().getFullYear();

function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById("lastModified").textContent = dateTimeString;
}

// Update 
updateDateTime();

// Counter and Sidebar

document.addEventListener("DOMContentLoaded", function () {
    // Variables for visit counter and message
    const counter = document.querySelector("#counter");
    const visitMessage = document.getElementById("visit-message");

    // Get visit count from localStorage or start at 0
    let counterTimes = Number(localStorage.getItem("counter")) || 0;
    counter.textContent = `${counterTimes}`; // Display the counter in the sidebar
    counterTimes++; // Increment the visit count

    // Save the updated count in localStorage
    localStorage.setItem("counter", counterTimes);

    // Handle last visit message
    const lastVisit = localStorage.getItem("lastVisit");
    const now = new Date();

    if (!lastVisit) {
        // First visit
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = now - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        // Show message depending on the days since the last visit
        if (daysDifference < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitMessage.textContent = `You last visited 1 day ago.`;
        } else {
            visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Save the current visit date
    localStorage.setItem("lastVisit", now);
});


// Time in La Serena
function getLaSerenaTime() {
    const now = new Date();
    const options = {
        timeZone: 'America/Santiago',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const laSerenaTime = new Intl.DateTimeFormat('en-US', options).format(now);
    const timeElement = document.getElementById('laserena-time');

    if (timeElement) {
        timeElement.textContent = `Current time in La Serena, Chile: ${laSerenaTime}.`;
    } else {
        console.error('No <p> element found to update.');
    }
}

getLaSerenaTime();

//WEATHER

const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.getElementById('fig-caption'); 
const forecastContainer = document.getElementById('forecast'); 
const apiKey = 'f80c45a071955f4b4196f7a03bca2788';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=-29.9027&lon=-71.2502&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=-29.9027&lon=-71.2502&appid=${apiKey}&units=metric`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error);
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error(`Forecast API error: ${response.status}`);
        
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error(error);
    }
}

function displayWeather(data) {
    currentTemp.innerHTML = `${data.main.temp.toFixed(1)}°C`;
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
}

function displayForecast(data) {
    const dailyTemps = {};
    
    data.list.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0];
        if (!dailyTemps[date] && entry.dt_txt.includes("12:00:00")) {
            dailyTemps[date] = {
                temp: entry.main.temp.toFixed(1),
                icon: entry.weather[0].icon,
                description: entry.weather[0].description
            };
        }
    });

    // 3 days
    const forecastDays = Object.keys(dailyTemps).slice(0, 3);

    forecastContainer.innerHTML = forecastDays.map(date => {
        const { temp, icon, description } = dailyTemps[date];
        return `
            <div class="forecast-item">
                <p><strong>${new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}</strong></p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                <p>${temp}°C - ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            </div>
        `;
    }).join('');
}

fetchWeather();
fetchForecast();
