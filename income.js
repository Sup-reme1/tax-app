const amountInput = document.getElementById("amount");

function formatWithCommas(value) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

amountInput.addEventListener("focus", () => {
  if (amountInput.value === "") {
    amountInput.value = "₦";
  }
});

amountInput.addEventListener("input", () => {
  let value = amountInput.value.replace(/[₦,]/g, "");

  if (!isNaN(value) && value !== "") {
    amountInput.value = "₦" + formatWithCommas(value);
  }
});

amountInput.addEventListener("blur", () => {
  if (amountInput.value === "₦") {
    amountInput.value = "";
  }
});