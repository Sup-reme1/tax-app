const slider = document.querySelector(".slider");
const dots = document.querySelectorAll(".dot");
const skip = document.querySelector(".skip-btn");

let index = 0;
let startX = 0;
let isDown = false;

// Move slider
function update() {
  slider.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  if (index > 0) dots[index - 1].classList.add("active");
}

// ---------- TOUCH (mobile) ----------
slider.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  handleSwipe(startX, endX);
});

// ---------- MOUSE (desktop) ----------
slider.addEventListener("mousedown", e => {
  isDown = true;
  startX = e.clientX;
});

slider.addEventListener("mouseup", e => {
  if (!isDown) return;
  isDown = false;
  const endX = e.clientX;
  handleSwipe(startX, endX);
});

// ---------- Swipe logic ----------
function handleSwipe(start, end) {
  const diff = start - end;

  if (diff > 50 && index < 4) index++;     // swipe left
  if (diff < -50 && index > 0) index--;    // swipe right

  update();
}

// ---------- Skip ----------
skip.addEventListener("click", () => {
  index = 4;
  update();
});

// ---------- Auto slide ----------
setInterval(() => {
  if (index < 4) index++;
  update();
}, 5000);
