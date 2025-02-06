document.getElementById("year").textContent = new Date().getFullYear();

function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById("lastModified").textContent = dateTimeString;
}

// Update 
updateDateTime();



//Counter

const counter = document.querySelector("#counter");
let counterTimes = Number(localStorage.getItem("counter")) || 0;
counter.textContent = counterTimes;
counterTimes++;
localStorage.setItem("counter", counterTimes);
