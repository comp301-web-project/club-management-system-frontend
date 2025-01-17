const EVENT_API_URL = 'http://localhost:8282';
const CLUB_API_URL = 'http://localhost:8181';

function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

async function fetchDashboardData() {
    const studentId = localStorage.getItem('userId');
    console.log('Fetching data for student ID:', studentId);

    try {
        console.log('Making API calls...');
        // Parallel fetch requests for upcoming events and clubs
        const [eventsResponse, clubsResponse] = await Promise.all([
            fetch(`${EVENT_API_URL}/api/event/upcomingEvents`),
            fetch(`${CLUB_API_URL}/api/club/getClubsByStudentId/${studentId}`)
        ]);

        console.log('Events Response:', eventsResponse);
        console.log('Clubs Response:', clubsResponse);

        const events = await eventsResponse.json();
        const clubs = await clubsResponse.json();

        console.log('Parsed Events:', events);
        console.log('Parsed Clubs:', clubs);

        // Display upcoming events (last 24 hours)
        const eventList = document.getElementById('eventList');
        eventList.innerHTML = events.map(event => `
            <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${event.name}</h5>
                    <small class="text-muted">
                        ${formatDate(event.startDate)}
                    </small>
                </div>
                <p class="mb-1">${event.description || 'No description available'}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                        <i class="fas fa-clock me-1"></i>
                        End: ${new Date(event.endDate).toLocaleString()}
                    </small>
                    <small class="text-muted">
                        <i class="fas fa-users me-1"></i>
                        Participants: ${event.participants.length}
                    </small>
                </div>
            </a>
        `).join('');

        // Display my clubs
        const clubList = document.getElementById('clubList');
        clubList.innerHTML = `
            <div class="row row-cols-1 row-cols-md-3 g-4">
                ${clubs.map(club => `
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${club.name}</h5>
                                <p class="card-text">${club.description}</p>
                                <small class="text-muted">Created: ${new Date(club.createdDate).toLocaleDateString()}</small>
                                <div class="mt-2">
                                    <span class="badge bg-primary">Member</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Update quick stats
        document.getElementById('quickStats').innerHTML = `
            <div class="col-xl-4 col-md-6">
                <div class="card bg-primary text-white mb-4">
                    <div class="card-body">
                        <h5 class="card-title">My Clubs</h5>
                        <h2 class="mb-0">${clubs.length}</h2>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-6">
                <div class="card bg-success text-white mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Upcoming Events</h5>
                        <h2 class="mb-0">${events.length}</h2>
                    </div>
                </div>
            </div>
        `;

    } catch (error) {
        console.error('Error details:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.textContent = 'Failed to load dashboard data. Please try again later.';
        document.querySelector('.container').prepend(errorDiv);
    }
}

// Öğrenci adını dashboard'da göster
async function displayStudentName() {
    try {
        // Önce öğrenci ID'sini al (localStorage veya session'dan)
        const studentId = localStorage.getItem('studentId'); // veya nereden alıyorsanız

        if (studentId) {
            // Öğrenci bilgilerini al
            const response = await fetch(`http://localhost:8383/api/student/${studentId}`);
            const studentData = await response.json();

            // Debug için
            console.log('Student data:', studentData);

            // Öğrenci adını göster
            if (studentData.name) {
                document.getElementById('studentName').textContent = studentData.name;
            }
        }
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Load student info
    const studentId = localStorage.getItem('userId');
    if (!studentId) {
        window.location.href = 'login.html';
        return;
    }

    // Load events
    loadEvents();

    // Load clubs
    loadClubs(studentId);
});

function showErrorMessage(message) {
    // Create an alert div
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show';
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insert at the top of the container
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
}

function loadEvents() {
    fetch('http://localhost:8282/api/event/upcomingEvents')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            return response.json();
        })
        .then(events => {
            const eventListHtml = events.length ? events.map(event => `
                <div class="list-group-item">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${event.name}</h5>
                        <small class="text-muted">${formatDate(event.startDate)}</small>
                    </div>
                    <p class="mb-1">${event.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">
                            <i class="fas fa-clock me-1"></i>
                            End: ${formatDate(event.endDate)}
                        </small>
                        <small class="text-muted">
                            <i class="fas fa-users me-1"></i>
                            Participants: ${event.participants.length}
                        </small>
                    </div>
                </div>
            `).join('') : '<div class="list-group-item">No events in the last 24 hours</div>';

            document.getElementById('eventList').innerHTML = eventListHtml;
        })
        .catch(error => {
            console.error('Error loading events:', error);
            document.getElementById('eventList').innerHTML = '<div class="list-group-item text-danger">Failed to load events</div>';
        });
}

function loadClubs(studentId) {
    fetch(`http://localhost:8181/api/club/getClubsByStudentId/${studentId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch clubs');
            }
            return response.json();
        })
        .then(clubs => {
            const clubListHtml = clubs.length ? `
                <div class="row">
                    ${clubs.map(club => `
                        <div class="col-md-4 mb-3">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">${club.name}</h5>
                                    <p class="card-text">${club.description}</p>
                                </div>
                                <div class="card-footer">
                                    <a href="club-details.html?id=${club.id}" class="btn btn-primary btn-sm">View Details</a>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : '<div class="alert alert-info">You haven\'t joined any clubs yet.</div>';

            document.getElementById('clubList').innerHTML = clubListHtml;
        })
        .catch(error => {
            console.error('Error loading clubs:', error);
            document.getElementById('clubList').innerHTML = '<div class="alert alert-danger">Failed to load clubs</div>';
        });
} 
