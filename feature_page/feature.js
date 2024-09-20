// Add event listener to window
window.addEventListener('load', () => {
    // Function to display feature page content
    const featurePageContent = document.querySelector('.feature-details');
    if (featurePageContent) {
        featurePageContent.style.display = 'block';
    }

    // Function to redirect to login page
    const redirectToLogin = () => {
        window.location.href = '../login_page/main_login_page/login.html';
    }

    // Attach redirect function to button click
    const getStartedButton = document.querySelector('.cta button');
    if (getStartedButton) {
        getStartedButton.addEventListener('click', redirectToLogin);
    }
});
