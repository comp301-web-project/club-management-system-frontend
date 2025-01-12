// Temporary hardcoded users for testing
const MOCK_USERS = [
    {
        email: "student@example.com",
        password: "student123",
        role: "ROLE_STUDENT",
        userId: 1,
        name: "John Doe"
    },
    {
        email: "manager@example.com",
        password: "manager123",
        role: "ROLE_CLUB_MANAGER",
        userId: 2,
        name: "Jane Smith"
    }
];

async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    // Find user in mock data
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (user) {
        // Simulate successful login
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userId', user.userId);
        localStorage.setItem('userName', user.name);

        // Redirect based on role
        if (user.role === 'ROLE_STUDENT') {
            window.location.href = 'student-dashboard.html';
        } else if (user.role === 'ROLE_CLUB_MANAGER') {
            window.location.href = 'club-manager-dashboard.html';
        }
    } else {
        // Show error message
        const errorDiv = document.getElementById('loginError');
        errorDiv.textContent = 'Invalid email or password';
        errorDiv.style.display = 'block';
    }
}

function isAuthenticated() {
    return localStorage.getItem('authToken') !== null;
}

function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}

function protectRoute() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }

    // Check if user is on the correct dashboard based on their role
    const currentPath = window.location.pathname;
    const userRole = localStorage.getItem('userRole');

    if (userRole === 'ROLE_STUDENT' && currentPath.includes('club-manager')) {
        window.location.href = 'student-dashboard.html';
    } else if (userRole === 'ROLE_CLUB_MANAGER' && currentPath.includes('student-')) {
        window.location.href = 'club-manager-dashboard.html';
    }
}

// Add this to your protected pages
function getUserInfo() {
    return {
        name: localStorage.getItem('userName'),
        role: localStorage.getItem('userRole'),
        userId: localStorage.getItem('userId')
    };
} 