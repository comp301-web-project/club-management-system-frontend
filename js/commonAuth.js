function isAuthenticated() {
    return localStorage.getItem('userRole') !== null;
}

function handleLogout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
}

function protectRoute() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}