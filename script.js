document.addEventListener("DOMContentLoaded", function () {
    //  Home page
    document.getElementById("homeNavItem").addEventListener("click", function () {
        showPage('home');
    });

    //  Create User
    document.getElementById("createUserNavItem").addEventListener("click", function () {
        showPage('createUser');
    });

    //  Second View
    document.getElementById("secondViewNavItem").addEventListener("click", function () {
        showPage('secondView');
    });
});

function showPage(pageId) {
    var pages = document.querySelectorAll('.container');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    document.getElementById(pageId + 'Content').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to the "Save" button
    document.getElementById('submitBtn').addEventListener('click', createUser);

    // Function to handle form submission
    function createUser(event) {
        event.preventDefault();

        // Get values of form fields
        const userName = document.getElementById('user_name').value;
        const email = document.getElementById('user_email').value;
        const password = document.getElementById('user_password').value;
        const confirmPassword = document.getElementById('user_confirmPassword').value;

        // Check if all fields are filled
        if (!userName || !email || !password || !confirmPassword) {
            showAlert('Please fill in all fields');
            return;
        }

        // Check if email is valid
        if (!validateEmail(email)) {
            showAlert('Please enter a valid email');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            showAlert('Passwords do not match');
            return;
        }

        // Check if password meets criteria
        if (!validatePassword(password)) {
            showAlert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            return;
        }

        // Create user object
        const user = {
            name: userName,
            email: email,
            password: password
        };

        // Get current users from localStorage or create a new array if there are none
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Add new user to the array
        users.push(user);

        // Save array of users to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Show success message
        showAlert('User created successfully', true);

        // Redirect to the "Users" page after 3 seconds
        setTimeout(function () {
            window.location.href = 'users.html';
        }, 3000);
    }

    // Function to display alerts
    function showAlert(message, success = false) {
        const alertClass = success ? 'alert-success' : 'alert-danger';
        const alertElement = document.createElement('div');
        alertElement.className = `alert ${alertClass} mt-3`;
        alertElement.innerHTML = message;
        document.getElementById('createUserContent').appendChild(alertElement);
        setTimeout(function () {
            alertElement.remove();
        }, 3000);
    }

    // Function to validate email format
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Function to validate password criteria
    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }
});

function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usersContainer = document.getElementById('usersContainer');

    // Clear the container before adding new cards
    usersContainer.innerHTML = '';

    // Loop through all users and create a card for each
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-between align-items-center" style="background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px; padding: 10px; height: 200px;">
            <h5 class="card-title" style="color: #007bff; font-size: 1.25rem; flex-grow: 1;">${user.name}</h5>
            <p class="card-text" style="color: #6c757d; flex-grow: 1;">Correo: ${user.email}</p>
        </div>`;
        usersContainer.appendChild(card);
    });
}

// Call the function to display users when the page loads
document.addEventListener('DOMContentLoaded', displayUsers);