const API_BASE_URL = 'http://localhost:8383';

async function handleStudentLogin(event) {
    event.preventDefault();

    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    try {
        const response = await fetch(`${API_BASE_URL}/api/student/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log('Login response:', data);

        if (response.ok) {
            localStorage.setItem('userRole', 'STUDENT');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userId', data.id);
            console.log('Login successful, redirecting...');
            window.location.href = './student-dashboard.html';
        } else {
            const errorDiv = document.getElementById('loginError');
            errorDiv.textContent = data.message || 'Invalid credentials';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Login error:', error);
        const errorDiv = document.getElementById('loginError');
        errorDiv.textContent = 'An error occurred during login. Please try again.';
        errorDiv.style.display = 'block';
    }
} 