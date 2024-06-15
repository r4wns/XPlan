// JavaScript to handle the signup and store data in local storage
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    
    // Redirect to the main page
    window.location.href = '../MainContent/index.html';
});
