const API_BASE_URL = 'http://localhost:8383';
const CLUB_API_URL = 'http://localhost:8181';

async function fetchStudentProfile() {
    const studentId = localStorage.getItem('userId');

    try {
        // Get student profile data
        const response = await fetch(`${API_BASE_URL}/api/student/${studentId}`);
        const studentData = await response.json();
        console.log('Student Data:', studentData); // Debug için

        // Update profile information
        document.getElementById('studentName').textContent = studentData.name;
        document.getElementById('studentId').textContent = `Student ID: ${studentData.id}`;
        document.getElementById('studentDepartment').textContent = studentData.department || 'Not specified';
        document.getElementById('fullName').textContent = studentData.name;
        document.getElementById('email').textContent = studentData.email;
        document.getElementById('phone').textContent = studentData.phone || 'Not specified';
        document.getElementById('year').textContent = studentData.year || 'Not specified';
        document.getElementById('address').textContent = studentData.address || 'Not specified';

        // Fetch student's clubs
        const clubsResponse = await fetch(`${CLUB_API_URL}/api/club/getClubsByStudentId/${studentId}`);
        const clubs = await clubsResponse.json();
        console.log('Clubs Data:', clubs); // Debug için

        // Update clubs list
        const clubsList = document.getElementById('clubsList');
        clubsList.innerHTML = clubs.map(club => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${club.name}
                <span class="badge bg-primary rounded-pill">Member</span>
            </li>
        `).join('');

    } catch (error) {
        console.error('Error fetching student profile:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.textContent = 'Failed to load profile data. Please try again later.';
        document.querySelector('.container').prepend(errorDiv);
    }
}

// Initialize profile when page loads
document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = './login.html';
        return;
    }
    fetchStudentProfile();
}); 