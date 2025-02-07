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
    counter.textContent = `Visit count: ${counterTimes}`; // Display the counter in the sidebar
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
