document.addEventListener('DOMContentLoaded', displayHomepage);

// Function to display homepage
function displayHomepage() {
    const homepageElement = document.getElementById('homepage');
    homepageElement.style.display = 'block';
}

// Function to redirect to login page
function redirectToLogin() {
    window.location.href = '../login_page/main_login_page/login.html';
}

// Add event listener to window
window.addEventListener('load', checkLoginStatus);

// Function to check login status
function checkLoginStatus() {
    try {
        const isLoggedIn = localStorage.getItem('loggedIn');
        if (isLoggedIn) {
            window.location.href = '../main_page/index.html';
        } else {
            displayHomepage();
        }
    } catch (error) {
        console.error('Error checking login status:', error);
    }
}
