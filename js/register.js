document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    console.log(registerForm);

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(username, email, password);

        try {
            const response = await fetch('https://projectarchitecturebackend.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                // Handle successful registration
                alert('Registration successful');
                window.location.href = 'index.html'; // Redirect to login page
            } else {
                console.error('Registration failed');
                
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
