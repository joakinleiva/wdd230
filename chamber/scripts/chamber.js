document.addEventListener("DOMContentLoaded", function() {
    const videos = [
        "images/hero.mp4",
        "images/hero2.mp4",
        "images/hero3.mp4"
    ];

    let currentVideoIndex = 0;
    const videoElement = document.querySelector(".hero video");

    function playNextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        videoElement.src = videos[currentVideoIndex];
        videoElement.play();
    }

    videoElement.addEventListener("ended", playNextVideo);
    videoElement.src = videos[currentVideoIndex];
    videoElement.play();
});

//FORM

const form = document.querySelector('.contact-form');
const modal = document.getElementById('thank-you-modal');
const closeModalBtn = document.getElementById('close-modal');

// Button
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    // Show
    modal.style.display = 'flex';
});

// Add
closeModalBtn.addEventListener('click', function() {
    // Hide
    modal.style.display = 'none';

  //Clean
    form.reset();
});


//Burger

document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const nav = document.querySelector("nav");

    burgerMenu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});

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





/* GALLERY */

// Rotate
window.addEventListener('load', () => {
    gsap.to(".image img, section", { opacity: 1, rotation: 360, duration: 1, stagger: 0.2 });
});
// Title
window.addEventListener('load', () => {
    gsap.from(".page-title, .card-title, nav, .logo, header,.contact-form, .card-container", { x: -300, opacity: 0, duration: 1 });
    gsap.to(".page-title, .card-title, nav, .logo, header,.contact-form, .card-container", { opacity: 1, duration: 2 });
});
// Button
window.addEventListener('load', () => {
    gsap.from(".hero-btn", { x: -300, opacity: 0, duration: 1 });
    gsap.to(".hero-btn", { opacity: 1, duration: 2 });
});
// Zoom
const images = document.querySelectorAll(".image img");
images.forEach(image => {
  image.addEventListener("mouseenter", () => {
    gsap.to(image, { scale: 1.1, duration: 0.3 }); 
  });
  
  image.addEventListener("mouseleave", () => {
    gsap.to(image, { scale: 1, duration: 0.3 }); 
  });
});

// Clients
// Array of image paths
const logos = [
    "images/logo1.png",
    "images/logo2.png",
    "images/logo3.png",
    "images/logo4.png",
    "images/logo5.png",
    "images/logo6.png"
];

// Function to create logo elements
function createLogos() {
    const wrapper = document.querySelector('.client-logos-wrapper');
    
    // Add logos twice for continuous scrolling effect
    logos.forEach(logo => {
        const logoDiv = document.createElement('div');
        logoDiv.classList.add('client-logo');
        const img = document.createElement('img');
        img.src = logo;
        img.alt = `Client logo`;
        logoDiv.appendChild(img);
        wrapper.appendChild(logoDiv);
    });

    // Duplicate logos for continuous effect
    logos.forEach(logo => {
        const logoDiv = document.createElement('div');
        logoDiv.classList.add('client-logo');
        const img = document.createElement('img');
        img.src = logo;
        img.alt = `Client logo`;
        logoDiv.appendChild(img);
        wrapper.appendChild(logoDiv);
    });
}

// Call the function to add logos
createLogos();

// Add CSS animation for scrolling
const style = document.createElement('style');
style.innerHTML = `
    .client-logos-container {
        overflow: hidden;
        width: 100%;
    }
    .client-logos-wrapper {
        display: flex;
        animation: scrollLeft 30s linear infinite; /* Slower speed */
    }
    .client-logo {
        margin-right: 20px; /* Adjust gap between logos */
    }
    .client-logo img {
        width: 100px; /* Adjust size of logos */
        height: auto;
    }
    @keyframes scrollLeft {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%); /* Adjust this to the width of the wrapper */
        }
    }

    /* Media query for smaller screens */
    @media screen and (max-width: 768px) {
        .client-logo img {
            width: 60px; /* Smaller size for mobile devices */
        }
    }
`;
document.head.appendChild(style);

document.getElementById("year").textContent = new Date().getFullYear();

function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById("lastModified").textContent = dateTimeString;
}

// Update 
updateDateTime();

const members = 'data/members.json';
const cards = document.querySelector('#cards');

// Function to generate a random membership tier
function getRandomMembership() {
    const membershipTiers = ['Gold', 'Platinum', 'Silver', 'Bronze'];
    const randomIndex = Math.floor(Math.random() * membershipTiers.length);
    return membershipTiers[randomIndex];
}

async function getMembersData() {
    try {
        // Fetch the members data
        const response = await fetch(members);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data
        const data = await response.json();

        // Call the function to display the members
        displayMembers(data.companies);
    } catch (error) {
        console.error('Error fetching members data:', error);
    }
}

function displayMembers(companies) {
    if (Array.isArray(companies)) {
        companies.forEach(company => {
            // Generate a random membership tier for each company
            const membership = getRandomMembership();
            
            let card = document.createElement('section');
            let name = document.createElement('h2'); 
            let logo = document.createElement('img');
            let otherInfo = document.createElement('p');
            let websiteLink = document.createElement('a');
            let phoneNumber = document.createElement('p');
            let address = document.createElement('p');
            let membershipTier = document.createElement('p');  // New element to display membership

            name.textContent = company.name;
            logo.setAttribute('src', company.image);
            logo.setAttribute('alt', `Logo of ${company.name}`);
            logo.setAttribute('loading', 'lazy');
            logo.setAttribute('width', '100');
            logo.setAttribute('height', '100');
            otherInfo.textContent = company.other_info;
            websiteLink.setAttribute('href', company.website);
            websiteLink.setAttribute('target', '_blank');
            websiteLink.textContent = `Visit ${company.name} Website`;
            phoneNumber.textContent = `Phone: ${company.phone_number}`;
            address.textContent = `Address: ${company.address}`;

            // Add the random membership tier
            membershipTier.textContent = `Membership Tier: ${membership}`;

            // Append the section (card) with the created elements
            card.appendChild(name);
            card.appendChild(logo);
            card.appendChild(otherInfo);
            card.appendChild(websiteLink);
            card.appendChild(phoneNumber);
            card.appendChild(address);
            card.appendChild(membershipTier);  // Add membership tier to card

            // Add the card to the cards container
            cards.appendChild(card);
        });
    } else {
        console.error('Invalid data format');
    }
}

// Call the function to start fetching and displaying the companies
getMembersData();
