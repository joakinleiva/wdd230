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


