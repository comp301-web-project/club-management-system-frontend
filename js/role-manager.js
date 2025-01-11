// Role-based content management
const ROLES = {
    STUDENT: 'student',
    CLUB_MANAGER: 'club_manager'
};

class RoleManager {
    constructor() {
        this.currentRole = localStorage.getItem('userRole') || ROLES.STUDENT;
        this.initializeInterface();
    }

    initializeInterface() {
        const roleSpan = document.getElementById('userRole');
        const contentDiv = document.getElementById('roleSpecificContent');

        if (roleSpan) {
            roleSpan.textContent = this.currentRole === ROLES.STUDENT ? 'Student' : 'Club Manager';
        }

        if (contentDiv) {
            this.loadRoleSpecificContent(contentDiv);
        }
    }

    loadRoleSpecificContent(container) {
        if (this.currentRole === ROLES.STUDENT) {
            container.innerHTML = this.getStudentContent();
        } else {
            container.innerHTML = this.getClubManagerContent();
        }
    }

    getStudentContent() {
        return `
            <div class="row">
                <div class="col-xl-3 col-md-6">
                    <div class="card bg-primary text-white mb-4">
                        <div class="card-body">Upcoming Events</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small text-white stretched-link" href="#">View Details</a>
                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card bg-success text-white mb-4">
                        <div class="card-body">My Clubs</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small text-white stretched-link" href="#">View Details</a>
                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    getClubManagerContent() {
        return `
            <div class="row">
                <div class="col-xl-3 col-md-6">
                    <div class="card bg-primary text-white mb-4">
                        <div class="card-body">Manage Events</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small text-white stretched-link" href="#">View Details</a>
                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card bg-warning text-white mb-4">
                        <div class="card-body">Club Members</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small text-white stretched-link" href="#">View Details</a>
                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card bg-success text-white mb-4">
                        <div class="card-body">Club Analytics</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small text-white stretched-link" href="#">View Details</a>
                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}

// Initialize role manager when document is ready
document.addEventListener('DOMContentLoaded', () => {
    new RoleManager();
}); 