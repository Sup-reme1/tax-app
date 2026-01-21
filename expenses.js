const BASE_URL = "https://taxpal-weap.onrender.com";

// عناصر الصفحة
const receiptInput = document.getElementById("receipt");
const imagePreview = document.getElementById("image-preview");
const previewContainer = document.getElementById("preview-container");
const uploadLabel = document.getElementById("upload-label");
const removeBtn = document.getElementById("remove-img");
const expenseForm = document.getElementById("expenseForm");

// المصادقة
// const userId = localStorage.getItem("userId");
// const token = localStorage.getItem("token");

// ---------- Notification ----------
function showNotification(message, type = "success") {
  const note = document.createElement("div");

  note.textContent = message;
  note.style.position = "fixed";
  note.style.top = "20px";
  note.style.right = "20px";
  note.style.padding = "12px 20px";
  note.style.background = type === "success" ? "#12b71d" : "#ef4444";
  note.style.color = "#fff";
  note.style.borderRadius = "8px";
  note.style.zIndex = "9999";
  note.style.opacity = "0";
  note.style.transition = "opacity 0.3s ease";

  document.body.appendChild(note);

  setTimeout(() => (note.style.opacity = "1"), 50);

  setTimeout(() => {
    note.style.opacity = "0";
    setTimeout(() => note.remove(), 300);
  }, 3000);
}

// ---------- Image Preview ----------
receiptInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      previewContainer.classList.remove("hidden");
      uploadLabel.classList.add("hidden");
    };

    reader.readAsDataURL(file);
  }
});

removeBtn.addEventListener("click", () => {
  receiptInput.value = "";
  previewContainer.classList.add("hidden");
  uploadLabel.classList.remove("hidden");
});

// ---------- Submit Expense ----------
expenseForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;
  const vatIncluded = document.getElementById("vat").checked;

  // ---------- Debug log ----------
  console.log("Submitting expense:", {
    userId,
    category,
    description,
    amount,
    date,
    vatIncluded
  });

  if (!category || !amount || !date) {
    showNotification("Please fill all required fields", "error");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    // ---------- API CALL ----------
    const response = await fetch(`${BASE_URL}/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        // userId,
        category,
        description,
        amount: Number(amount),
        dateRecieved,
        title,
      })
    });

    const data = await response.json();

    // ---------- Debug log ----------
    console.log("Response status:", response.status);
    console.log("Response data:", data);

    if (!response.ok) {
      showNotification(data.message || "Failed to save expense", "error");
      return;
    }

    // ---------- Success ----------
    showNotification("Expense saved successfully!", "success");

    expenseForm.reset();
    previewContainer.classList.add("hidden");
    uploadLabel.classList.remove("hidden");

    // setTimeout(() => {
    //   window.location.href = "dashboard.html";
    // }, 1200);

  } catch (error) {
    console.error("Expense API error:", error);
    showNotification("Network error. Please try again.", "error");
  }
});