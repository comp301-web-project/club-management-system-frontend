const EVENT_API_URL = 'http://localhost:8282';

function formatDateTime(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-US', options);
}

async function fetchAllEvents() {
    try {
        const response = await fetch(`${EVENT_API_URL}/api/event/allEvents`);
        const events = await response.json();
        console.log('Events:', events);

        const eventList = document.getElementById('upcomingEvents');
        eventList.innerHTML = events.map(event => `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-header">
                        <h5 class="card-title mb-0">${event.name}</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${event.description || 'No description available'}</p>
                        
                        <div class="mb-2">
                            <small class="text-muted d-block">
                                <i class="fas fa-calendar-alt me-1"></i>
                                Start: ${formatDateTime(event.startDate)}
                            </small>
                            <small class="text-muted d-block">
                                <i class="fas fa-calendar-check me-1"></i>
                                End: ${formatDateTime(event.endDate)}
                            </small>
                        </div>

                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                <i class="fas fa-users me-1"></i>
                                ${event.participants.length} participants
                            </small>
                            <small class="text-muted">
                                Event ID: ${event.id}
                            </small>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent">
                        <button class="btn btn-primary btn-sm w-100" onclick="joinEvent(${event.id})">
                            Join Event
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error fetching events:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.textContent = 'Failed to load events. Please try again later.';
        document.querySelector('.container').prepend(errorDiv);
    }
}

async function joinEvent(eventId) {
    const studentId = localStorage.getItem('userId');
    if (!studentId) {
        alert('Please login to join events');
        return;
    }

    try {
        // Join event endpoint'i eklendiğinde burası güncellenecek
        console.log(`Joining event ${eventId} for student ${studentId}`);
        alert('Event join functionality will be added soon!');
    } catch (error) {
        console.error('Error joining event:', error);
        alert('Failed to join event. Please try again later.');
    }
}

// Initialize events when page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchAllEvents();
}); 