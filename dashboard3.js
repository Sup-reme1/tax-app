document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Logic: Identify current page and move circle
    const navLinks = document.querySelectorAll('.nav-link');
    const path = window.location.pathname;

    navLinks.forEach(link => {
        // Clean up classes
        link.classList.remove('active');
        const indicator = link.querySelector('.active-indicator');
        if (indicator) indicator.remove();

        // Check if current href matches URL
        if (path.includes(link.getAttribute('href'))) {
            link.classList.add('active');
            const newCircle = document.createElement('div');
            newCircle.className = 'active-indicator';
            link.appendChild(newCircle);
        }
    });

    // 2. Tax Calculation Logic
    const inputs = [
        document.getElementById('val-q1'),
        document.getElementById('val-q2'),
        document.getElementById('val-q3'),
        document.getElementById('val-q4')
    ];

    function updateCalculator() {
        const values = inputs.map(i => parseFloat(i.value) || 0);
        const total = values.reduce((a, b) => a + b, 0);
        const taxRate = 0.155; // 15.5%
        const taxDue = total * taxRate;

        // Update Text
        document.getElementById('display-total-income').innerText = '₦ ' + total.toLocaleString();
        document.getElementById('display-tax-due').innerText = '₦ ' + taxDue.toLocaleString(undefined, {minimumFractionDigits: 2});

        // Update Chart Bars
        const max = Math.max(...values, 1);
        values.forEach((v, index) => {
            const bar = document.getElementById(`bar-q${index + 1}`);
            const label = document.getElementById(`label-q${index + 1}`);
            
            label.innerText = '₦' + v.toLocaleString();
            // Scale height (max 85% to keep labels visible)
            bar.style.height = (v / max * 85) + '%';
        });
    }

    // Event Listeners
    inputs.forEach(input => input.addEventListener('input', updateCalculator));
    document.getElementById('calc-trigger').addEventListener('click', updateCalculator);

    // Run once on load
    updateCalculator();
});