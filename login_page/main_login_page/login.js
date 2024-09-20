document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);

    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const backToLogin = document.getElementById('backToLogin');

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    forgotPasswordLink.addEventListener('click', () => {
        container.classList.add("forgot-active");
    });

    backToLogin.addEventListener('click', () => {
        container.classList.remove("forgot-active");
    });

    document.querySelectorAll('.social-icons .icon').forEach(icon => {
        icon.addEventListener('click', handleSocialLogin);
    });
});

async function handleLogin(event) {
    event.preventDefault();
    const email= document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);  // Debugging line
            localStorage.setItem('token', data.token);
            localStorage.setItem('loggedIn', true);
            window.location.href = '../../dashboard_page/dashboard.html';
        } else {
            console.error('Login failed:', response.status);  // Debugging line
            alert('Invalid username or password');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}

async function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            console.log('Signup successful');  // Debugging line
            alert('Account created successfully. Please login.');
            document.getElementById('container').classList.remove("active");
        } else {
            console.error('Signup failed:', response.status);  // Debugging line
            alert('Error creating account');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}

async function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('forgotEmail').value;

    try {
        const response = await fetch('http://localhost:3000/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            console.log('Password reset link sent');  // Debugging line
            alert('Password reset link sent to your email');
        } else {
            console.error('Password reset failed:', response.status);  // Debugging line
            alert('Error sending password reset link');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}

function handleSocialLogin(event) {
    event.preventDefault();
    const provider = event.currentTarget.getAttribute('href').split('/').pop();
    window.location.href = `'http://localhost:3000/signup'`;
}
