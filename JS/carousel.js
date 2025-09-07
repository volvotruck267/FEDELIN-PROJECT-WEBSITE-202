const track = document.getElementById("carousel-track");
const pauseBtn = document.getElementById("pause-btn");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");

let isPaused = false;
let scrollSpeed = 1; // pixels per frame
let autoSlideId;

// Keep updating the center card scale and glow
function updateCenterCard() {
  const cards = track.querySelectorAll(".card");
  const containerCenter = window.innerWidth / 2;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const distance = Math.abs(containerCenter - cardCenter);
    const maxDistance = 300;

    const scale = Math.max(1, 1.3 - distance / maxDistance);
    const glow = Math.max(15, 60 - distance / 2);

    card.style.transform = `scale(${scale})`;
    card.style.boxShadow = `0 0 ${glow}px rgba(255, 215, 0, 0.4), 0 0 ${glow * 2}px rgba(255, 215, 0, 0.25) inset`;
  });
}

// Called ~60 times per second
function tick() {
  console.log("isPaused:", isPaused); // <-- add this line
  if (!isPaused) {
    track.scrollLeft += scrollSpeed;
  }
  updateCenterCard();
  requestAnimationFrame(tick);
}

// Start continuous loop
requestAnimationFrame(tick);

// Pause and play toggle
pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.innerHTML = isPaused
    ? '<i class="fas fa-play"></i>'
    : '<i class="fas fa-pause"></i>';
});

// Manual navigation buttons (work only if paused)
leftBtn.addEventListener("click", () => {
  if (isPaused) {
    track.scrollLeft -= 200;
    updateCenterCard();
  }
});
rightBtn.addEventListener("click", () => {
  if (isPaused) {
    track.scrollLeft += 200;
    updateCenterCard();
  }
});