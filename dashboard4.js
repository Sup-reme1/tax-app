document.addEventListener('DOMContentLoaded', () => {
    const incInputs = document.querySelectorAll('.inc-input');
    const expInputs = document.querySelectorAll('.exp-input');
    const totalIncEl = document.getElementById('totalIncome');
    const totalExpEl = document.getElementById('totalExpenses');
    const netIncEl = document.getElementById('netIncome');
    const taxEl = document.getElementById('estTax');
    const navItems = document.querySelectorAll('.nav-item');

    /**
     * Nigeria Tax Act 2026 Logic
     * First ₦800k: 0% | Next ₦2.2M: 15% | Next ₦9M: 18% | Next ₦13M: 21% | Next ₦25M: 23% | Above ₦50M: 25%
     */
    function calculate2026Tax(taxableIncome) {
        if (taxableIncome <= 800000) return 0;
        
        let tax = 0;
        let remaining = taxableIncome - 800000;

        const bands = [
            { amount: 2200000, rate: 0.15 }, // Next 2.2M
            { amount: 9000000, rate: 0.18 }, // Next 9M
            { amount: 13000000, rate: 0.21 }, // Next 13M
            { amount: 25000000, rate: 0.23 }  // Next 25M
        ];

        for (const band of bands) {
            let part = Math.min(remaining, band.amount);
            tax += part * band.rate;
            remaining -= part;
            if (remaining <= 0) return tax;
        }

        tax += remaining * 0.25; // Above 50M
        return tax;
    }

    function update() {
        let totalInc = 0;
        let totalExp = 0;

        incInputs.forEach(input => totalInc += Number(input.value));
        expInputs.forEach(input => totalExp += Number(input.value));

        const net = totalInc - totalExp;
        const estTax = calculate2026Tax(net > 0 ? net : 0);

        totalIncEl.value = totalInc.toFixed(2);
        totalExpEl.value = totalExp.toFixed(2);
        netIncEl.innerText = "₦" + net.toLocaleString(undefined, {minimumFractionDigits: 2});
        taxEl.innerText = "₦" + estTax.toLocaleString(undefined, {minimumFractionDigits: 2});

        netIncEl.style.color = net < 0 ? "#d9534f" : "#1a1a1a";

        incInputs.forEach(input => {
            const bar = input.parentElement.nextElementSibling.firstElementChild;
            bar.style.width = totalInc > 0 ? (Number(input.value) / totalInc * 100) + "%" : "0%";
        });
        expInputs.forEach(input => {
            const bar = input.parentElement.nextElementSibling.firstElementChild;
            bar.style.width = totalExp > 0 ? (Number(input.value) / totalExp * 100) + "%" : "0%";
        });
    }

    // Nav Item Click Handler
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    [...incInputs, ...expInputs].forEach(input => {
        input.addEventListener('input', update);
    });
});