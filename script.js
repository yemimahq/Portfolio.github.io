/**
 * Function to handle the navigation menu toggle for mobile devices.
 */
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

/**
 * Function to switch the visible content tab.
 * @param {string} tabId The ID of the section to show (e.g., 'hero', 'about', 'experience').
 */
function showTab(tabId) {
    // 1. Hide all content tabs
    document.querySelectorAll('.content-tab').forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('active');
    });

    // 2. Show the selected content tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
        selectedTab.classList.add('active');
        // Scroll to the top of the section (smoothly if supported)
        selectedTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 3. Update the active class on navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Find the link that points to the current tabId and set it as active
    // This finds the link whose href attribute contains the tabId
    document.querySelector(`[href="#${tabId}"]`).classList.add('active');

    // 4. Close the mobile menu after selection (optional, for better UX)
    const navMenu = document.getElementById('nav-menu');
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }

    // Update URL hash without page reload
    history.pushState(null, '', `#${tabId}`);
}

// Optional: Ensure the URL hash corresponds to the active tab on load
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showTab(hash);
    } else {
        // Default to showing the 'hero' tab if no hash is present
        showTab('hero');
    }

    // Handle back/forward browser buttons
    window.addEventListener('popstate', () => {
        const currentHash = window.location.hash.replace('#', '');
        if (currentHash && document.getElementById(currentHash)) {
            showTab(currentHash);
        } else {
            showTab('hero'); // Default if hash is empty or invalid
        }
    });
});