// auth.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- SIGN-UP PAGE LOGIC ---
    const createAccountBtn = document.getElementById('createAccountBtn');
    
    if (createAccountBtn) {
        // --- MODAL SETUP ---
        // Get the modal elements from the sign-up.html page
        const successModal = document.getElementById('successModal');
        const closeModalBtn = document.getElementById('closeModalBtn');

        // Function to show the modal
        function showModal() {
            //changes display: none to display: flex
            successModal.style.display = 'flex';
        }

        // Function to hide the modal
        function hideModal() {
            successModal.style.display = 'none';
        }
        
        // --- MODAL EVENT LISTENERS ---
        // Close the modal when the "OK" button is clicked and redirect to login
        closeModalBtn.addEventListener('click', () => {
            hideModal();
            // Redirect to login page using the correct relative path
            window.location.href = '../login/login.html';
        });

        // Close the modal if the user clicks on the background overlay
        window.addEventListener('click', (event) => {
            if (event.target == successModal) {
                hideModal();
                window.location.href = '../login/login.html';
            }
        });

        // --- ACCOUNT CREATION LOGIC ---
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

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);
            if (userExists) {
                alert('An account with this email already exists.');
                return;
            }

            // Create a new user object
            const newUser = {
                fullName: fullName,
                email: email,
                password: password 
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // SUCCESS: Instead of an alert, we now show the modal
            showModal();
        });
    }

    // --- LOGIN PAGE LOGIC ---
    const loginBtn = document.getElementById('loginBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', (event) => {
            event.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // ... (your existing code to validate empty fields) ...

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
            // SUCCESS! User is found.
            // 1. Save the logged-in user's info to localStorage.
                localStorage.setItem('currentUser', JSON.stringify(user));

            // 2. Redirect to the home page.
                window.location.href = '../home/home-page.html'; // Path from login -> home
            } else {
                alert('Invalid email or password.');
            }
        });
    }
});