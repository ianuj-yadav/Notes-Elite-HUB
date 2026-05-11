// NotesHub Elite - Complete JavaScript Code

// Global Variables
let currentUser = null;
let cart = [];
let currentPage = 'home';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    initNavigation();
    initAuthentication();
    initHowItWorksSection();
    initTestimonialCarousel();
    initModal();
    initMobileMenu();
    initSmoothScrolling();
    initAnimations();
    initNewsletterSignup();
    initSearch();
    initNoteActions();
    initCategoryInteractions();
    initResponsiveFeatures();
    initLazyLoading();
    initDashboard();
    initMarketplace();
    initPublish();
    initProfile();

    // Load user session if exists
    loadUserSession();
}

// Authentication Functions
function initAuthentication() {
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form handling  
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
        initRoleSelector();
        initPasswordStrength();
    }

    // Auth button handlers
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginBtn) loginBtn.addEventListener('click', () => window.location.href = 'login.html');
    if (signupBtn) signupBtn.addEventListener('click', () => window.location.href = 'signup.html');
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
}

function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Simulate login process
    showNotification('Logging in...', 'info');

    setTimeout(() => {
        const userData = {
            id: 1,
            name: 'Rahul Kumar',
            email: email,
            role: 'seller',
            avatar: null,
            university: 'IIT Delhi'
        };

        setUserSession(userData);
        showNotification('Login successful!', 'success');

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 1500);
}

function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Validate passwords match
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    showNotification('Creating account...', 'info');

    setTimeout(() => {
        const userData = {
            id: Date.now(),
            name: `${formData.get('firstName')} ${formData.get('lastName')}`,
            email: formData.get('email'),
            role: document.querySelector('.role-btn.active').dataset.role,
            avatar: null,
            university: formData.get('university'),
            course: formData.get('course')
        };

        setUserSession(userData);
        showNotification('Account created successfully!', 'success');

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 1500);
}

function handleLogout() {
    clearUserSession();
    showNotification('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function initRoleSelector() {
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            roleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function initPasswordStrength() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return;

    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        const strength = calculatePasswordStrength(password);

        strengthBar.style.background = `linear-gradient(to right, ${strength.color} ${strength.percentage}%, #e5e7eb ${strength.percentage}%)`;
        strengthText.textContent = strength.text;
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strengths = [
        { text: 'Very Weak', color: '#ef4444', percentage: 20 },
        { text: 'Weak', color: '#f59e0b', percentage: 40 },
        { text: 'Fair', color: '#eab308', percentage: 60 },
        { text: 'Good', color: '#22c55e', percentage: 80 },
        { text: 'Strong', color: '#10b981', percentage: 100 }
    ];

    return strengths[score] || strengths[0];
}

// Session Management
function setUserSession(userData) {
    currentUser = userData;
    localStorage.setItem('noteshub_user', JSON.stringify(userData));
    updateUIForLoggedInUser();
}

function loadUserSession() {
    const stored = localStorage.getItem('noteshub_user');
    if (stored) {
        currentUser = JSON.parse(stored);
        updateUIForLoggedInUser();
    }
}

function clearUserSession() {
    currentUser = null;
    localStorage.removeItem('noteshub_user');
    updateUIForLoggedOutUser();
}

function updateUIForLoggedInUser() {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginBtn) loginBtn.style.display = 'none';
    if (signupBtn) signupBtn.style.display = 'none';
    if (logoutBtn) {
        logoutBtn.style.display = 'inline-flex';
        logoutBtn.classList.remove('hidden');
    }

    // Update user name in dashboard
    const userNameElement = document.getElementById('userName');
    if (userNameElement && currentUser) {
        userNameElement.textContent = currentUser.name;
    }
}

function updateUIForLoggedOutUser() {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (signupBtn) signupBtn.style.display = 'inline-flex';
    if (logoutBtn) {
        logoutBtn.style.display = 'none';
        logoutBtn.classList.add('hidden');
    }
}

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// How It Works Section - Tab Switching
function initHowItWorksSection() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.process-tab');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked button and corresponding tab
            this.classList.add('active');
            const targetElement = document.getElementById(targetTab);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => card.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Show current testimonial
        if (testimonialCards[index] && indicators[index]) {
            testimonialCards[index].classList.add('active');
            indicators[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    }

    // Auto-slide functionality
    let slideTimer = setInterval(nextSlide, slideInterval);

    // Manual slide control
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            clearInterval(slideTimer);
            currentSlide = index;
            showSlide(currentSlide);
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    });

    // Pause on hover
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(slideTimer));
        carousel.addEventListener('mouseleave', () => {
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    }
}

// Modal functionality
function initModal() {
    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => hideModal(modal));
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    });
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modal) {
    if (typeof modal === 'string') {
        modal = document.getElementById(modal);
    }
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', function() {
            navList.classList.toggle('show');
            this.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('show');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling for all anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .category-card, .note-card, .process-step');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations if not already present
    if (!document.querySelector('#animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .feature-card, .category-card, .note-card, .process-step {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Newsletter signup
function initNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                // Simulate newsletter signup
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = document.querySelector('.search-input')?.value;
            if (query) {
                performSearch(query);
            }
        });
    }
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.length > 2) {
        // Show search suggestions (implement as needed)
        console.log('Searching for:', searchTerm);
    }
}

function performSearch(query) {
    // Redirect to marketplace with search query
    window.location.href = `marketplace.html?search=${encodeURIComponent(query)}`;
}

// Note actions (Buy, Preview, etc.)
function initNoteActions() {
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
            handleAddToCart(e);
        }

        if (e.target.classList.contains('preview-btn') || e.target.closest('.preview-btn')) {
            handlePreview(e);
        }

        if (e.target.classList.contains('wishlist-btn') || e.target.closest('.wishlist-btn')) {
            handleWishlist(e);
        }
    });

    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => showModal('cartModal'));
    }
}

function handleAddToCart(e) {
    e.preventDefault();
    const noteCard = e.target.closest('.note-card');
    const noteTitle = noteCard.querySelector('.note-title').textContent;
    const notePrice = noteCard.querySelector('.note-price').textContent;

    const cartItem = {
        id: Date.now(),
        title: noteTitle,
        price: notePrice,
        seller: noteCard.querySelector('.note-seller').textContent
    };

    cart.push(cartItem);
    updateCartUI();
    showNotification(`"${noteTitle}" added to cart!`, 'success');
}

function handlePreview(e) {
    e.preventDefault();
    const noteCard = e.target.closest('.note-card');
    const noteTitle = noteCard.querySelector('.note-title').textContent;

    showNotification(`Opening preview for "${noteTitle}"`, 'info');
    // Implement preview modal
}

function handleWishlist(e) {
    e.preventDefault();
    const icon = e.target.querySelector('i') || e.target;
    const noteCard = e.target.closest('.note-card');
    const noteTitle = noteCard.querySelector('.note-title').textContent;

    if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        showNotification(`"${noteTitle}" added to wishlist!`, 'success');
    } else {
        icon.classList.replace('fas', 'far');
        showNotification(`"${noteTitle}" removed from wishlist`, 'info');
    }
}

function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Category interactions
function initCategoryInteractions() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryTitle = this.querySelector('.category-title').textContent;
            showNotification(`Browsing ${categoryTitle} notes`, 'info');

            // Navigate to marketplace with category filter
            const categorySlug = categoryTitle.toLowerCase().replace(/\s+/g, '-');
            window.location.href = `marketplace.html?category=${categorySlug}`;
        });
    });
}

// Dashboard functionality
function initDashboard() {
    if (!document.querySelector('.dashboard-section')) return;

    initDashboardCharts();
    initDashboardStats();
}

function initDashboardCharts() {
    const chartCanvas = document.getElementById('earningsChart');
    if (chartCanvas) {
        // Simulate chart with basic visualization
        const ctx = chartCanvas.getContext('2d');
        ctx.fillStyle = '#6366f1';
        ctx.fillRect(10, 10, 100, 50);
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Inter';
        ctx.fillText('Earnings Chart', 20, 40);
    }
}

function initDashboardStats() {
    // Animate numbers on dashboard load
    const statNumbers = document.querySelectorAll('.stat-content h3');
    statNumbers.forEach(stat => {
        animateNumber(stat);
    });
}

function animateNumber(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    if (isNaN(number)) return;

    const duration = 1000;
    const start = 0;
    const increment = number / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = text;
            clearInterval(timer);
        } else {
            element.textContent = text.replace(number, Math.floor(current));
        }
    }, 16);
}

// Marketplace functionality
function initMarketplace() {
    if (!document.querySelector('.marketplace-section')) return;

    initFilters();
    initSorting();
    initPagination();
}

function initFilters() {
    const filterOptions = document.querySelectorAll('.filter-option input');
    filterOptions.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    const priceSlider = document.querySelector('.price-slider');
    if (priceSlider) {
        priceSlider.addEventListener('input', applyFilters);
    }
}

function initSorting() {
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', applySorting);
    }
}

function initPagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled && !this.classList.contains('active')) {
                handlePagination(this);
            }
        });
    });
}

function applyFilters() {
    // Collect all filter values
    const filters = {
        categories: [],
        rating: [],
        university: [],
        priceRange: document.querySelector('.price-slider')?.value || 500
    };

    document.querySelectorAll('.filter-option input:checked').forEach(input => {
        const filterType = input.name;
        const filterValue = input.value;

        if (!filters[filterType]) filters[filterType] = [];
        filters[filterType].push(filterValue);
    });

    console.log('Applying filters:', filters);
    // Implement actual filtering logic
    showNotification('Filters applied', 'info');
}

function applySorting() {
    const sortValue = event.target.value;
    console.log('Sorting by:', sortValue);
    // Implement sorting logic
    showNotification(`Sorted by ${sortValue}`, 'info');
}

function handlePagination(button) {
    const currentActive = document.querySelector('.pagination-btn.active');
    if (currentActive) {
        currentActive.classList.remove('active');
    }

    if (!button.classList.contains('prev') && !button.classList.contains('next')) {
        button.classList.add('active');
    }

    // Scroll to top of results
    document.querySelector('.notes-content').scrollIntoView({ behavior: 'smooth' });
}

// Publish functionality
function initPublish() {
    if (!document.querySelector('.publish-section')) return;

    initFileUpload();
    initPricingSuggestions();
    initFormValidation();
}

function initFileUpload() {
    const uploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.querySelector('.upload-btn');

    if (uploadArea && fileInput) {
        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            handleFileUpload(e.dataTransfer.files);
        });

        uploadArea.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => handleFileUpload(e.target.files));
    }

    if (uploadBtn) {
        uploadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fileInput.click();
        });
    }
}

function handleFileUpload(files) {
    const uploadedFilesContainer = document.getElementById('uploadedFiles');
    if (!uploadedFilesContainer) return;

    Array.from(files).forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.className = 'uploaded-file-item';
        fileElement.innerHTML = `
            <div class="file-info">
                <i class="fas fa-file-pdf"></i>
                <span>${file.name}</span>
                <small>${formatFileSize(file.size)}</small>
            </div>
            <button class="remove-file-btn" onclick="removeFile(this)">
                <i class="fas fa-times"></i>
            </button>
        `;
        uploadedFilesContainer.appendChild(fileElement);
    });

    showNotification(`${files.length} file(s) uploaded successfully`, 'success');
}

function removeFile(button) {
    button.closest('.uploaded-file-item').remove();
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function initPricingSuggestions() {
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    const priceInput = document.getElementById('price');

    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const price = this.dataset.price;
            if (priceInput) {
                priceInput.value = price;
                priceInput.focus();
            }
        });
    });
}

function initFormValidation() {
    const publishForm = document.getElementById('publishForm');
    if (publishForm) {
        publishForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate required fields
            const requiredFields = publishForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    field.style.borderColor = '#d1d5db';
                }
            });

            if (isValid) {
                handlePublishSubmit();
            } else {
                showNotification('Please fill in all required fields', 'error');
            }
        });
    }
}

function handlePublishSubmit() {
    showNotification('Publishing your notes...', 'info');

    setTimeout(() => {
        showNotification('Notes published successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }, 2000);
}

// Profile functionality
function initProfile() {
    if (!document.querySelector('.profile-section')) return;

    initProfileTabs();
    initProfileForms();
    initToggleSwitches();
}

function initProfileTabs() {
    const menuItems = document.querySelectorAll('.menu-item');
    const profileTabs = document.querySelectorAll('.profile-tab');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabName = this.dataset.tab;

            // Remove active class from all menu items and tabs
            menuItems.forEach(mi => mi.classList.remove('active'));
            profileTabs.forEach(pt => pt.classList.remove('active'));

            // Add active class to clicked item and corresponding tab
            this.classList.add('active');
            const targetTab = document.getElementById(tabName);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

function initProfileForms() {
    const profileForms = document.querySelectorAll('.profile-form');
    profileForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);

            showNotification('Updating profile...', 'info');

            setTimeout(() => {
                showNotification('Profile updated successfully!', 'success');
            }, 1000);
        });
    });
}

function initToggleSwitches() {
    const toggleInputs = document.querySelectorAll('.toggle-switch input');
    toggleInputs.forEach(input => {
        input.addEventListener('change', function() {
            const settingName = this.closest('.setting-item').querySelector('h4').textContent;
            const status = this.checked ? 'enabled' : 'disabled';
            console.log(`${settingName} ${status}`);
        });
    });
}

// Responsive features
function initResponsiveFeatures() {
    function handleResize() {
        const width = window.innerWidth;

        // Adjust hero stats layout on mobile
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats && width < 768) {
            heroStats.style.flexDirection = 'column';
            heroStats.style.gap = '1rem';
        } else if (heroStats) {
            heroStats.style.flexDirection = 'row';
            heroStats.style.gap = '3rem';
        }

        // Adjust grid layouts
        const grids = document.querySelectorAll('.features-grid, .categories-grid, .notes-grid');
        grids.forEach(grid => {
            if (width < 768) {
                grid.style.gridTemplateColumns = '1fr';
            }
        });
    }

    window.addEventListener('resize', debounce(handleResize, 250));
    handleResize(); // Initial call
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    // Style the notification
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Performance optimization
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

// Initialize tooltips for interactive elements
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: #1f2937;
                color: white;
                padding: 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
                z-index: 4000;
                pointer-events: none;
                transform: translateY(-100%);
                margin-top: -0.5rem;
                white-space: nowrap;
            `;
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });

        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Initialize charts (basic implementation)
function initCharts() {
    const chartElements = document.querySelectorAll('[data-chart]');
    chartElements.forEach(chart => {
        // Basic chart simulation
        chart.innerHTML = '<div style="height: 200px; background: linear-gradient(45deg, #6366f1, #3b82f6); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">Chart Visualization</div>';
    });
}

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    showNotification('An error occurred. Please try again.', 'error');
});

// Initialize tooltips and charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTooltips();
    initCharts();
});

// Export functions for global access
window.NotesHubElite = {
    showNotification,
    showModal,
    hideModal,
    setUserSession,
    clearUserSession,
    validateEmail
};

console.log('NotesHub Elite application initialized successfully!');