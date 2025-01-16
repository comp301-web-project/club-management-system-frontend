document.addEventListener('DOMContentLoaded', function () {
    fetch('sidenav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('layoutSidenav_nav').innerHTML = data;

            // Aktif sayfayı vurgula
            const currentPage = window.location.pathname.split('/').pop();
            const navLinks = document.querySelectorAll('.nav-link');

            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Error loading sidenav:', error));
}); 