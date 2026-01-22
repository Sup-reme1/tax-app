// Toggle password visibility
document.querySelectorAll(".eye").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.target);
    input.type = input.type === "password" ? "text" : "password";
  });
});

// Validate & update
document.getElementById("updateBtn").addEventListener("click", () => {
  const newPass = document.getElementById("newPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (newPass.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (newPass !== confirm) {
    alert("Passwords do not match");
    return;
  }

  alert("Password updated successfully!");
});