
const API_BASE_URL = "http://127.0.0.1:8000";


// Read CSRF token from browser cookies
function getCSRFToken() {

    const cookie = document.cookie
        .split("; ")
        .find(row => row.startsWith("csrftoken="));

    return cookie ? cookie.split("=")[1] : null;
}


// Initialize frontend
async function initializeApp() {

    const statusElement =
        document.getElementById("api-status");

    try {

        // Get CSRF cookie
        await fetch(
            `${API_BASE_URL}/api/accounts/csrf/`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        // Check backend connection
        const response = await fetch(
            `${API_BASE_URL}/api/accounts/health/`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Backend connection failed");
        }

        const data = await response.json();

        statusElement.innerText = data.message;

        statusElement.style.color = "green";

        console.log("Backend Response:", data);

    }

    catch (error) {

        statusElement.innerText =
            "Unable to connect to Django backend.";

        statusElement.style.color = "red";

        console.error(error);

    }
}


// Run when page loads
document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);
