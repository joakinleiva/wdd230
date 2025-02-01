document.getElementById("year").textContent = new Date().getFullYear();

function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById("lastModified").textContent = dateTimeString;
}

// Update 
updateDateTime();
