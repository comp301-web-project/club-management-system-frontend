class ProfileManager {
    constructor() {
        this.loadProfileData();
    }

    loadProfileData() {
        // In a real application, this would fetch data from your backend
        const profileData = {
            studentName: 'John Doe',
            studentId: '123456',
            department: 'Computer Engineering',
            fullName: 'John William Doe',
            email: 'john.doe@example.com',
            phone: '(555) 123-4567',
            year: '3rd Year',
            address: '123 Campus Street, University City',
            clubs: [
                { name: 'Programming Club', role: 'Member' },
                { name: 'Chess Club', role: 'Leader' }
            ],
            recentActivities: [
                { activity: 'Joined Programming Contest', timeAgo: '3 days ago' },
                { activity: 'Attended Chess Club Meeting', timeAgo: '1 week ago' },
                { activity: 'Registered for Spring Hackathon', timeAgo: '2 weeks ago' }
            ]
        };

        this.updateProfileUI(profileData);
    }

    updateProfileUI(data) {
        // Update basic info
        document.getElementById('studentName').textContent = data.studentName;
        document.getElementById('studentId').textContent = `Student ID: ${data.studentId}`;
        document.getElementById('studentDepartment').textContent = data.department;
        document.getElementById('fullName').textContent = data.fullName;
        document.getElementById('email').textContent = data.email;
        document.getElementById('phone').textContent = data.phone;
        document.getElementById('year').textContent = data.year;
        document.getElementById('address').textContent = data.address;

        // Update clubs list
        const clubsList = document.getElementById('clubsList');
        if (clubsList) {
            clubsList.innerHTML = data.clubs.map(club => `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${club.name}
                    <span class="badge bg-${club.role === 'Leader' ? 'success' : 'primary'} rounded-pill">
                        ${club.role}
                    </span>
                </li>
            `).join('');
        }
    }
}

// Initialize profile manager when document is ready
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
}); 