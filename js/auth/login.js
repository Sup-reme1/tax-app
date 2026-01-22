const password = document.getElementById("password");

const toggle = document.getElementById("togglePassword");
const btn = document.getElementById('submitbtn')

toggle.addEventListener("click", () => {

    const isHidden = password.type === "password";

    // toggle input type

    password.type = isHidden ? "text" : "password";

    // toggle icons

    toggle.classList.toggle("fa-eye");

    toggle.classList.toggle("fa-eye-slash");


});

btn.addEventListener("click", async function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    try {
        const response = await fetch("https://taxpal-weap.onrender.com/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("apiUrl", "https://taxpal-weap.onrender.com");
            window.location.href = "/html/dashboards/dashboard.html";
        }

    } catch (error) {
        console.error("Error during login:", error);
    }
});
