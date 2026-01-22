const token = localStorage.getItem("token");
const BASE_URL = localStorage.getItem("apiUrl");

getUserIncome();
getUserExpenses();

// Configuration
const TAX_RATE = 0.1125; // Example: 11.25% tax rate
let isPrivate = false;

/**
 * Main calculation logic
 */
function calculateTax() {
    const income = parseFloat(document.getElementById('incomeVal').value) || 0;
    const expenses = parseFloat(document.getElementById('expenseVal').value) || 0;
    
    // Calculate: (Income - Expenses) * Tax Rate
    const profit = income - expenses;
    const taxAmount = profit > 0 ? profit * TAX_RATE : 0;

    // Display with currency formatting
    const formatted = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(taxAmount).replace('NGN', '₦');

    document.getElementById('taxDisplay').innerText = formatted;

    // Persist data to LocalStorage
    localStorage.setItem('tax_income', income);
    localStorage.setItem('tax_expenses', expenses);
}

/**
 * Toggles the visibility of the tax amount
 */
function togglePrivacy() {
    const taxDisplay = document.getElementById('taxDisplay');
    const eyeIcon = document.getElementById('eyeIcon');
    
    isPrivate = !isPrivate;

    if (isPrivate) {
        taxDisplay.classList.add('blurred');
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        taxDisplay.classList.remove('blurred');
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
    localStorage.setItem('tax_privacy', isPrivate);
}

/**
 * Handles Quick Action buttons (+ / -)
 */
function modifyValue(id, amount) {
    const input = document.getElementById(id);
    input.value = parseFloat(input.value) + amount;
    calculateTax();
}

/**
 * Initialize app and load saved data
 */
window.onload = () => {
    const savedIncome = localStorage.getItem('tax_income');
    const savedExpenses = localStorage.getItem('tax_expenses');
    const savedPrivacy = localStorage.getItem('tax_privacy');

    if (savedIncome) document.getElementById('incomeVal').value = savedIncome;
    if (savedExpenses) document.getElementById('expenseInput').value = savedExpenses;
    
    // Restore privacy setting
    if (savedPrivacy === 'true') {
        togglePrivacy();
    }

};

// Calculate Tax api
async function calculateTax(grossIncome, actualRent, otherDeduction) {
  
  try {
    // ---------- API CALL ----------
    const response = await fetch(`${BASE_URL}/api/calculateTax`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: {
        grossIncome,
        actualRent,
        otherDeduction
      }
    });

    var data = await response.json();
    console.log(data);

  }catch (e) {
    console.log("error: ", e);
  }


}

// Function to get user income
async function getUserIncome() {  
  
  try {
    // ---------- API CALL ----------
    const response = await fetch(`${BASE_URL}/api/income`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    var data = await response.json();

    if (!data.success){
      console.log(data.message);
      new Error("Failed");
    }
    console.log(data);
  
  }catch (e) { 
    console.log("error: ", e)
  }
}

// Function to delete a particular Income by income id
async function deleteIncomeWithId(incomeId) {
  
  try {
    // ---------- API CALL ----------
    const response = await fetch(`${BASE_URL}/api/income/${incomeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
        
    var data = await response.json();

    if (!data.success){
      console.log(data.message);
      new Error("Failed");
    }
    console.log(data);
  
  }catch (e) { 
    console.log("error: ", e)
  }
}



// Function to get user expenses
async function getUserExpenses() {
  
  try {
    // ---------- API CALL ----------
    const response = await fetch(`${BASE_URL}/api/expenses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
        
    var data = await response.json();

    if (!data.success){
      console.log(data.message);
      new Error("Failed");
    }
    console.log(data);
  
  }catch (e) { 
    console.log("error: ", e)
  }
}

// Function to delete a particular expenses by expenses id
async function deleteExpenseWithId(incomeId) {
  
  try {
    // ---------- API CALL ----------
    const response = await fetch(`${BASE_URL}/api/expenses/${incomeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
        
    var data = await response.json();

    if (!data.success){
      console.log(data.message);
      new Error("Failed");
    }
    console.log(data);
  
  }catch (e) { 
    console.log("error: ", e)
  }
}


