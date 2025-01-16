const CLUB_API_URL = 'http://localhost:8181';

async function fetchAllClubs() {
    const studentId = localStorage.getItem('userId');

    try {
        // Parallel fetch for both my clubs and all clubs
        const [myClubsResponse, allClubsResponse] = await Promise.all([
            fetch(`${CLUB_API_URL}/api/club/getClubsByStudentId/${studentId}`),
            fetch(`${CLUB_API_URL}/api/club/getAllClubs`)
        ]);

        const myClubs = await myClubsResponse.json();
        const allClubs = await allClubsResponse.json();

        console.log('My Clubs:', myClubs);
        console.log('All Clubs:', allClubs);

        // My Clubs section
        const myClubsContainer = document.getElementById('myClubs');
        myClubsContainer.innerHTML = myClubs.map(club => `
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${club.name}</h5>
                        <p class="card-text">${club.description || 'No description available'}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">Created: ${new Date(club.createdDate).toLocaleDateString()}</small>
                            <span class="badge bg-primary">Member</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // All Clubs section
        const allClubsContainer = document.getElementById('allClubsList');
        allClubsContainer.innerHTML = allClubs.map(club => `
            <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between align-items-center">
                    <div>
                        <h5 class="mb-1">${club.name}</h5>
                        <p class="mb-1">${club.description || 'No description available'}</p>
                        <small class="text-muted">Created: ${new Date(club.createdDate).toLocaleDateString()}</small>
                    </div>
                    <button class="btn btn-outline-primary btn-sm" onclick="joinClub(${club.id})">Join Club</button>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error fetching clubs:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.textContent = 'Failed to load clubs. Please try again later.';
        document.querySelector('.container').prepend(errorDiv);
    }
}

async function joinClub(clubId) {
    const studentId = localStorage.getItem('userId');
    if (!studentId) {
        alert('Please login to join clubs');
        return;
    }

    try {
        // Join club endpoint'i eklendiğinde burası güncellenecek
        console.log(`Joining club ${clubId} for student ${studentId}`);
        alert('Club join functionality will be added soon!');
    } catch (error) {
        console.error('Error joining club:', error);
        alert('Failed to join club. Please try again later.');
    }
}

// Initialize clubs when page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchAllClubs();
}); 