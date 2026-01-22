const form = document.getElementById("signupForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // stop page refresh

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirm").value.trim();

    errorMsg.textContent = "";
    errorMsg.style.color = "red";

    // Frontend validation
    if (name === "" || email === "" || password === "" || confirm === "") {
        errorMsg.textContent = "All fields are required";
        return;
    }

    if (!validateEmail(email)) {
        errorMsg.textContent = "Please enter a valid email address";
        return;
    }

    if (password.length < 6) {
        errorMsg.textContent = "Password must be at least 6 characters";
        return;
    }

    if (password !== confirm) {
        errorMsg.textContent = "Passwords do not match";
        return;
    }

    // 👇 SEND TO BACKEND
    try {
        const response = await fetch("https://taxpal-weap.onrender.com/api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        // If backend rejected the signup
        if (!response.ok) {
            errorMsg.textContent = data.message || "Signup failed";
            return;
        }

        // Save user info for later screens
        // localStorage.setItem("userId", data.user._id || data.user.id);
        // localStorage.setItem("token", data.token);

        errorMsg.style.color = "green";
        errorMsg.textContent = "Account created successfully!"+data.message;


        // Move to email verification screen
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);

    } catch (error) {
        errorMsg.textContent = "Network error. Please try again."+error;
    }
});

// Email validation function
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}