// auth.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- SIGN-UP PAGE LOGIC ---
    const createAccountBtn = document.getElementById('createAccountBtn');
    
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', (event) => {
            // Prevent the form from submitting and reloading the page
            event.preventDefault(); 

            // Get user input from the form
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Basic validation
            if (!fullName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            // Get existing users from localStorage, or initialize an empty array
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if the email is already registered
            const userExists = users.some(user => user.email === email);
            if (userExists) {
                alert('An account with this email already exists.');
                return;
            }

            // Create a new user object
            const newUser = {
                fullName: fullName,
                email: email,
                password: password // In a real app, NEVER store plain text passwords. Always hash them.
            };

            // Add the new user to the array
            users.push(newUser);

            // Save the updated users array back to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // Inform the user and redirect to the login page
            alert('Account created successfully! Please log in.');
            window.location.href = 'login.html';
        });
    }

    // --- LOGIN PAGE LOGIC ---
    const loginBtn = document.getElementById('loginBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', (event) => {
            // Prevent the form from submitting
            event.preventDefault();

            // Get user input
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }

            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Find the user with matching credentials
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                alert(`Welcome back, ${user.fullName}!`);
                // Here you would typically redirect to a dashboard page
                // window.location.href = 'dashboard.html';
            } else {
                alert('Invalid email or password.');
            }
        });
    }
});