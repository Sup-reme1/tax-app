// --- 1. HANDLE QUARTER NAVIGATION ---
window.onload = function() {
    // Check if the URL has ?q=1, ?q=2, or ?q=3
    const urlParams = new URLSearchParams(window.location.search);
    const currentQ = urlParams.get('q') || '2'; // Default to Q2 as per image

    // Find the button and set it to active
    const activeBtn = document.getElementById('q' + currentQ);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
};

// --- 2. TAX CALCULATION LOGIC (NIGERIA 2026 LAW) ---
function calculateTax() {
    const income = parseFloat(document.getElementById('totalIncome').value) || 0;
    const expenses = parseFloat(document.getElementById('expenses').value) || 0;

    // Law works on Annual values
    const annualGross = income * 12;
    const annualExpenses = expenses * 12;

    // 2026 Exemption: First ₦800,000 per year is 0% tax
    const taxFreeThreshold = 800000;
    
    let taxableRemainder = annualGross - annualExpenses - taxFreeThreshold;
    if (taxableRemainder < 0) taxableRemainder = 0;

    // New Progressive Bands (Nigeria 2026)
    let totalTax = 0;

    if (taxableRemainder > 0) {
        let band = Math.min(taxableRemainder, 2200000); // Next 2.2M @ 15%
        totalTax += band * 0.15;
        taxableRemainder -= band;
    }
    if (taxableRemainder > 0) {
        let band = Math.min(taxableRemainder, 9000000); // Next 9M @ 18%
        totalTax += band * 0.18;
        taxableRemainder -= band;
    }
    if (taxableRemainder > 0) {
        let band = Math.min(taxableRemainder, 13000000); // Next 13M @ 21%
        totalTax += band * 0.21;
        taxableRemainder -= band;
    }
    if (taxableRemainder > 0) {
        let band = Math.min(taxableRemainder, 25000000); // Next 25M @ 23%
        totalTax += band * 0.23;
        taxableRemainder -= band;
    }
    if (taxableRemainder > 0) {
        totalTax += taxableRemainder * 0.25; // Above 50M total @ 25%
    }

    // Convert back to monthly for the UI
    const monthlyTax = totalTax / 12;
    const monthlyTaxable = Math.max(0, income - expenses - (taxFreeThreshold / 12));

    // Update the summary section
    document.getElementById('resIncome').innerText = `₦ ${income.toLocaleString()}`;
    document.getElementById('resDeductions').innerText = `₦ ${expenses.toLocaleString()}`;
    document.getElementById('resTaxable').innerText = `₦ ${monthlyTaxable.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
    document.getElementById('resTaxPayable').innerText = `₦ ${monthlyTax.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
}