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
        timeZone: 'Chile/Continental',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const laSerenaTime = formatter.format(now);
    const timeElement = document.getElementById('laserena-time');  // Ensure the element exists

    if (timeElement) {
        timeElement.textContent = `Current time in La Serena, Chile: ${laSerenaTime}.`;
    } else {
        console.error('No <p> element found to update.');
    }
}

getLaSerenaTime();

// Weather

const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.getElementById('fig-caption'); 

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-29.9027&lon=-71.2502&appid=f80c45a071955f4b4196f7a03bca2788&units=imperial';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data); 
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = ` ${desc}`;
}
