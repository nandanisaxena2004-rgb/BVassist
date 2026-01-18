// =====================
// AUTH PROTECTION
// =====================
if (
    window.location.pathname.includes("dashboard.html") &&
    localStorage.getItem("isLoggedIn") !== "true"
) {
    window.location.href = "login.html";
}

// =====================
// GENERAL NAVIGATION
// =====================
function goTo(page) {
    window.location.href = page;
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// =====================
// VIEW TOGGLING (LOGIN / FORGOT)
// =====================
function showForgot() {
    document.getElementById("login-view").style.display = "none";
    document.getElementById("forgot-view").style.display = "block";
}

function showLogin() {
    document.getElementById("forgot-view").style.display = "none";
    document.getElementById("login-view").style.display = "block";
}

// =====================
// PASSWORD TOGGLE
// =====================
function togglePassword() {
    const passwordInput = document.getElementById("password");
    if (!passwordInput) return;

    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
}

// =====================
// DOM READY
// =====================
document.addEventListener("DOMContentLoaded", function () {

    // =====================
    // LOGIN LOGIC
    // =====================
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const errorText = document.getElementById("login-error");

            errorText.textContent = "";

            if (!email || !password) {
                errorText.textContent = "Please enter both email and password.";
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.length === 0) {
                errorText.textContent = "No account found. Please sign up first.";
                return;
            }

            const user = users.find(u => u.email === email);

            if (!user) {
                errorText.textContent = "Account does not exist.";
                return;
            }

            if (user.password !== password) {
                errorText.textContent = "Incorrect password.";
                return;
            }

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "dashboard.html";
        });
    }

    // =====================
    // FORGOT / RESET PASSWORD
    // =====================
    const forgotForm = document.getElementById("forgot-form");

if (forgotForm) {
    forgotForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("forgot-email").value.trim();
        const errorText = document.getElementById("forgot-error");

        errorText.textContent = "";

        if (!email) {
            errorText.textContent = "Please enter your registered email.";
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.some(u => u.email === email);

        if (!userExists) {
            errorText.textContent = "This email is not registered.";
            return;
        }

        // 🔗 BACKEND WILL HANDLE EMAIL SENDING
        // Frontend responsibility ends here

        errorText.style.color = "green";
        errorText.textContent =
            "Password reset link has been sent to your email.";

        forgotForm.reset();
    });
}


    // =====================
    // SIGNUP LOGIC
    // =====================
    const signupForm = document.getElementById("signup-form");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("signup-name").value.trim();
            const email = document.getElementById("signup-email").value.trim();
            const password = document.getElementById("signup-password").value.trim();
            const role = document.getElementById("signup-role").value;
            const errorText = document.getElementById("signup-error");

            errorText.textContent = "";

            if (!name || !email || !password || !role) {
                errorText.textContent = "Please fill all required fields.";
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.some(u => u.email === email)) {
                errorText.textContent = "Account already exists.";
                return;
            }

            users.push({ name, email, password, role });
            localStorage.setItem("users", JSON.stringify(users));

            window.location.href = "login.html";
        });
    }

});
