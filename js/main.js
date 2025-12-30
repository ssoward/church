/**
 * Alma 31 Study App - Main JavaScript
 * Handles navigation, search, and interactive features
 */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    handleServiceWorkerUpdates();
});

/**
 * Initialize the application
 */
function initializeApp() {
    setupNavigation();
    setupSearch();
    setupSmoothScrolling();
    setupActiveNavigation();
    highlightCurrentPage();

    // Initialize any page-specific features
    if (document.getElementById('searchInput')) {
        setupSearchFunctionality();
    }
}

/**
 * Setup mobile navigation toggle
 */
function setupNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Update ARIA attributes for accessibility
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
            }
        });
    }
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    // Handle smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Setup active navigation highlighting
 */
function setupActiveNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

    // Update active sidebar link based on scroll position
    window.addEventListener('scroll', debounce(function() {
        updateActiveNavLink();
    }, 100));
}

/**
 * Update active navigation link based on current section
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const scrollPosition = window.scrollY + 100; // Offset for header

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

/**
 * Highlight current page in navigation
 */
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');

        // Check if this link matches the current page
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath ||
            (currentPath.endsWith('/') && linkPath === currentPath + 'index.html') ||
            (linkPath.endsWith('index.html') && currentPath === '/')) {
            link.classList.add('active');
        }
    });
}

/**
 * Setup search functionality
 */
function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce(function() {
        const query = this.value.toLowerCase().trim();
        performSearch(query);
    }, 300));
}

/**
 * Perform search within page content
 */
function performSearch(query) {
    if (!query) {
        clearSearchHighlights();
        return;
    }

    // Clear previous highlights
    clearSearchHighlights();

    // Find and highlight matches
    const contentArea = document.querySelector('.content');
    if (contentArea) {
        highlightSearchResults(contentArea, query);
    }
}

/**
 * Clear all search highlights
 */
function clearSearchHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

/**
 * Highlight search results in content
 */
function highlightSearchResults(element, query) {
    const textNodes = getTextNodes(element);
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');

    textNodes.forEach(node => {
        if (regex.test(node.textContent)) {
            const highlightedHTML = node.textContent.replace(regex, '<span class="search-highlight">$1</span>');
            const wrapper = document.createElement('span');
            wrapper.innerHTML = highlightedHTML;

            node.parentNode.replaceChild(wrapper, node);
        }
    });
}

/**
 * Get all text nodes from an element
 */
function getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Skip script and style elements
                const parent = node.parentElement;
                if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        }
    );

    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    return textNodes;
}

/**
 * Escape special regex characters
 */
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Setup keyboard navigation for accessibility
 */
function setupKeyboardNavigation() {
    // Enable keyboard navigation for custom elements
    document.querySelectorAll('.nav-card, .gallery-item').forEach(element => {
        element.setAttribute('tabindex', '0');

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });
}

/**
 * Setup theme toggle (for future dark mode implementation)
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * Setup local storage for user preferences
 */
function setupUserPreferences() {
    // Save scroll position for better user experience
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('scrollPosition', window.scrollY);
    });

    // Restore scroll position
    window.addEventListener('load', function() {
        const scrollPosition = localStorage.getItem('scrollPosition');
        if (scrollPosition) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(scrollPosition));
                localStorage.removeItem('scrollPosition');
            }, 100);
        }
    });
}

/**
 * Setup analytics (placeholder for future implementation)
 */
function setupAnalytics() {
    // Track page views, search queries, etc.
    console.log('Analytics setup placeholder');
}

/**
 * Handle Service Worker Updates
 */
function handleServiceWorkerUpdates() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            // Service worker has been updated, reload the page
            console.log('Service Worker updated, reloading...');
            window.location.reload();
        });

        // Check for updates periodically
        navigator.serviceWorker.ready.then(registration => {
            // Check for updates every 5 minutes
            setInterval(() => {
                registration.update();
            }, 5 * 60 * 1000);
        });
    }
}

/**
 * Force cache refresh (for debugging)
 */
function clearAppCache() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
                registration.unregister();
            });
        });

        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => {
                    caches.delete(name);
                });
            });
        }

        window.location.reload(true);
    }
}

// Expose cache clear function globally for debugging
window.clearAppCache = clearAppCache;

/**
 * Error handling and logging
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, send to error tracking service
});

// Add search highlight styles dynamically
const style = document.createElement('style');
style.textContent = `
    .search-highlight {
        background-color: #ffeb3b;
        padding: 2px 4px;
        border-radius: 2px;
        font-weight: bold;
        color: #000;
    }
`;
document.head.appendChild(style);