// Ren: 
// adding some mouse hover effect on side menu:
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menuIcon");
    const sideMenu = document.getElementById("sideMenu");
    const navButtons = document.querySelectorAll('.nav-button');
    const themeLink = document.getElementById('theme-link');
    // display the menu when the mouse hovers over or left the icon:
    menuIcon.addEventListener("click", function () {
        sideMenu.classList.toggle("active");
    });
    // add the 'active' for home page:
    navButtons.forEach(button => {
        const buttonPath = button.getAttribute('href');
        if (buttonPath) {
            const currentPath = window.location.pathname;
            if (currentPath.endsWith(buttonPath)) {
                button.classList.add('active');
            }
        }
    });
    const themeToggle = document.getElementById('light-dark-button');
    let isLightMode = true;
    themeToggle.textContent = 'Light Mode';
    themeToggle.addEventListener('mouseover', function() {
        // Show "Dark Mode" when the mouse move over:
        if (isLightMode) {
            themeToggle.textContent = 'Dark Mode';
        } else {
            themeToggle.textContent = 'Light Mode';
        }
    });
    // if user didn't click, we still stay in light mode:
    themeToggle.addEventListener('mouseout', function() {
        if (isLightMode) {
            themeToggle.textContent = 'Light Mode';
        } else {
            themeToggle.textContent = 'Dark Mode';
        }
    });
    // switch to light or dark mode
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });
    // Apply the saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = 'Dark Mode';
    }
});