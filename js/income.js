const incomeType = document.getElementById("incomeType").value;
const amount = document.getElementById("amount");
const dateReceived = document.getElementById("dateReceived").value;
const clientName = document.getElementById("clientName").value;
const paymentMethod = document.getElementById("paymentMethod").value;
const reciept = document.getElementById("reciept").value;
const btn = document.getElementById("btn");

function formatWithCommas(value) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

amount.addEventListener("focus", () => {
  if (amount.value === "") {
    amount.value = "₦";
  }
});

amount.addEventListener("input", () => {
  let value = amount.value.replace(/[₦,]/g, "");

  if (!isNaN(value) && value !== "") {
    amount.value = "₦" + formatWithCommas(value);
  }
});

amount.addEventListener("blur", () => {
  if (amount.value === "₦") {
    amount.value = "";
  }
});

btn.addEventListener('click', async (e)=>{
  e.preventDefault();
  addIncome();
})

async function addIncome(){
  var currency = '';
  var receiptUrl = '';
  let amount = amount.value
  
  try {
    const token = localStorage.getItem("token");
    const BASE_URL = localStorage.getItem("apiUrl");
    // ---------- API CALL ----------
    const response = await fetch(`${BASE_URL}/api/income`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        incomeType, // required
        amount, // required
        currency,
        dateReceived, // required
        clientName, // required
        paymentMethod,
        receiptUrl,
      })
    });
    
    const data = await response.json();
  
    if (!data.success){
      console.log(data.message);
      new Error("Failed");
    }
  
    window.location.href = "success.html";
  
  }catch (e) {
    console.log("error: ", e)
   }

}

// Update Income
async function updateIncomeWithId(incomeId){
  var currency = '';
  var receiptUrl = '';
  var taxYear = '';
  let amount = amount.value;
  
  try {
    const token = localStorage.getItem("token");
    const BASE_URL = localStorage.getItem("apiUrl");
    // ---------- API CALL ----------
    const response = await fetch(`${BASE_URL}/api/income/${incomeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        incomeType, // required
        amount , // required
        currency,
        dateReceived, // required
        clientName, // required
        paymentMethod,
        receiptUrl,
        taxYear
      })
    });
    
    const data = await response.json();
  
    if (!data.success){
      console.log(data.message);
      new Error("Failed");
    }
  
    window.location.href = "success.html";
  
  }catch (e) {
    console.log("error: ", e)
   }

}