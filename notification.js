const buttons = document.querySelectorAll(".segmented button");
const daysText = document.getElementById("days");
const toggle = document.getElementById("toggle");
const preview = document.querySelector(".preview");
const timeInput = document.querySelector("input[type='time']");

// Update the preview text based on toggle and selected day
function updatePreview() {
  if (!toggle.checked) {
    preview.textContent = "Reminder is disabled";
  } else {
    const activeBtn = document.querySelector(".segmented button.active");
    const days = activeBtn ? activeBtn.dataset.days : "1";
    preview.innerHTML = `Reminder: Your tax payment is due in ${days} ${days === "1" ? "day" : "days"}`;
  }
}

// Enable or disable segmented buttons and time input
function updateControls() {
  const controls = [...buttons, timeInput];
  controls.forEach(control => control.disabled = !toggle.checked);
}

// Initial setup
updatePreview();
updateControls();

// Segmented button click
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!toggle.checked) return; // Ignore clicks if toggle is off
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    updatePreview();
  });
});

// Toggle change
toggle.addEventListener("change", () => {
  updateControls();
  updatePreview();
});