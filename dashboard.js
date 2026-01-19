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

    calculateTax();
};