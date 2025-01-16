document.addEventListener('DOMContentLoaded', function () {
    // Navbar'ı yükle
    fetch('partials/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Navbar yüklenirken hata:', error));
}); 