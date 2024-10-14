// Function to toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    // Toggle the 'collapsed' class on the sidebar and adjust content margin
    sidebar.classList.toggle('open');

    // Check if sidebar is open and set the appropriate style
    if (sidebar.classList.contains('open')) {
        sidebar.style.transform = 'translateX(0)'; // Show sidebar
        content.style.marginLeft = '250px'; // Adjust content margin
        document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
    } else {
        sidebar.style.transform = 'translateX(-100%)'; // Hide sidebar
        content.style.marginLeft = '0'; // Reset content margin
        document.body.style.overflow = 'auto'; // Allow scrolling
    }
}

// Function to show a section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const welcomeMessage = document.querySelector('.welcome-message');

    // Hide all sections first
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the clicked section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';

        // Hide the welcome message for non-dashboard sections
        if (sectionId !== 'dashboard-section') {
            welcomeMessage.style.display = 'none'; // Hide welcome message
        } else {
            welcomeMessage.style.display = 'block'; // Show welcome message for dashboard
        }
    }

    // Ensure the sidebar is open
    const sidebar = document.getElementById('sidebar');
    if (!sidebar.classList.contains('open')) {
        toggleSidebar(); // Open sidebar if closed
    }
}

// Ensure the sidebar remains visible on page load
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.transform = 'translateX(0)'; // Ensure sidebar is visible
});
