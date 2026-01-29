// ========================================
// EMAIL MODAL SYSTEM - DIRECT BUTTON CLICK
// ========================================

console.log('🔧 Loading Email Modal System...');

// Define modal functions globally
window.openEmailModal = function() {
    console.log('✅ Opening email modal...');
    var modal = document.getElementById('emailModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        console.error('❌ Modal not found');
    }
};

window.closeEmailModal = function() {
    console.log('🔒 Closing email modal...');
    var modal = document.getElementById('emailModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Direct send email function
window.handleSendEmail = function() {
    console.log('📧 Send button clicked!');
    
    var name = document.getElementById('contactName').value;
    var email = document.getElementById('contactEmail').value;
    var phone = document.getElementById('contactPhone').value;
    var business = document.getElementById('contactBusiness').value;
    var message = document.getElementById('contactMessage').value;
    
    console.log('📝 Form data:', {name, email, phone, business, message});
    
    // Validate
    if (!name || !email || !phone || !message) {
        alert('⚠️ Please fill all required fields marked with *');
        return false;
    }
    
    var submitBtn = document.getElementById('sendEmailBtn');
    var originalText = submitBtn.innerHTML;
    
    // Show loading
    submitBtn.innerHTML = '⏳ Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    console.log('📤 Preparing to send email...');
    
    // Prepare form data
    var formData = new FormData();
    formData.append('access_key', 'dbd7d563-9042-47c3-9429-9542195c0a1b'); // REPLACE THIS
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('business', business || 'Not provided');
    formData.append('message', message);
    formData.append('subject', 'New Website Enquiry from ' + name);
    formData.append('from_name', 'Phenom Website');
    
    console.log('🚀 Sending to Web3Forms...');
    
    // Send to Web3Forms
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(function(response) {
        console.log('📥 Response status:', response.status);
        return response.json();
    })
    .then(function(data) {
        console.log('📊 Response data:', data);
        
        if (data.success) {
            // SUCCESS
            console.log('✅ Email sent successfully!');
            submitBtn.innerHTML = '✅ Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #81C784)';
            submitBtn.style.opacity = '1';
            
            alert('✅ Thank you ' + name + '! We will contact you within 24 hours at ' + email);
            
            // Clear form
            document.getElementById('contactName').value = '';
            document.getElementById('contactEmail').value = '';
            document.getElementById('contactPhone').value = '';
            document.getElementById('contactBusiness').value = '';
            document.getElementById('contactMessage').value = '';
            
            // Close modal after 2 seconds
            setTimeout(function() {
                closeEmailModal();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '';
            }, 2000);
        } else {
            throw new Error(data.message || 'Submission failed');
        }
    })
    .catch(function(error) {
        // ERROR
        console.error('❌ Error:', error);
        submitBtn.innerHTML = '❌ Error - Try Again';
        submitBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        submitBtn.style.opacity = '1';
        
        alert('❌ Error: ' + error.message + '\n\nPlease try again or email: info@phenomoutsourcing.com');
        
        setTimeout(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '';
        }, 3000);
    });
    
    return false;
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Initializing email modal system...');
    
    // Wait for footer to load
    setTimeout(function() {
        
        // Attach send button DIRECTLY
        var sendBtn = document.getElementById('sendEmailBtn');
        if (sendBtn) {
            console.log('✅ Send button found');
            
            // Remove any existing handlers
            sendBtn.onclick = null;
            
            // Attach new handler
            sendBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ Send button clicked!');
                handleSendEmail();
            });
            
            console.log('✅ Send button handler attached');
        } else {
            console.error('❌ Send button not found!');
        }
        
        // Attach floating button
        var floatingBtn = document.getElementById('floatingQuoteBtn');
        if (floatingBtn) {
            floatingBtn.onclick = function(e) {
                e.preventDefault();
                console.log('🖱️ Floating button clicked');
                openEmailModal();
            };
            console.log('✅ Floating button attached');
        }
        
        // Attach close button
        var closeBtn = document.getElementById('closeModalBtn');
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.preventDefault();
                console.log('🖱️ Close button clicked');
                closeEmailModal();
            };
            console.log('✅ Close button attached');
        }
        
        // Attach to all "Get Started" buttons
        var buttons = document.querySelectorAll('a, button');
        var attachedCount = 0;
        
        buttons.forEach(function(btn) {
            // Skip the send button
            if (btn.id === 'sendEmailBtn' || btn.id === 'closeModalBtn') return;
            
            var text = btn.textContent.toLowerCase().trim();
            
            if (
                text.includes('get started') ||
                text.includes('contact') ||
                text.includes('enquiry') ||
                text.includes('schedule') ||
                text.includes('consultation')
            ) {
                btn.onclick = function(e) {
                    e.preventDefault();
                    console.log('🖱️ Contact button clicked:', text);
                    openEmailModal();
                    return false;
                };
                attachedCount++;
            }
        });
        
        console.log('✅ Attached to ' + attachedCount + ' contact buttons');
        
        // Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeEmailModal();
        });
        
        console.log('✅ Email modal system ready!');
        
    }, 1500);
});

console.log('✅ Email modal script loaded');


// ========================================
// EMAIL MODAL SYSTEM - LOADED FIRST
// ========================================

// Define modal functions globally IMMEDIATELY
window.openEmailModal = function() {
    console.log('✅ openEmailModal called');
    var modal = document.getElementById('emailModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('✅ Modal opened');
    } else {
        console.warn('⚠️ Modal not loaded yet, retrying...');
        setTimeout(function() {
            var retryModal = document.getElementById('emailModal');
            if (retryModal) {
                retryModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            } else {
                alert('Please wait for page to load completely');
            }
        }, 500);
    }
};

window.closeEmailModal = function() {
    console.log('🔒 Closing modal...');
    var modal = document.getElementById('emailModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

window.sendEmail = function() {
    console.log('📧 Sending email...');
    
    var name = document.getElementById('contactName').value;
    var email = document.getElementById('contactEmail').value;
    var phone = document.getElementById('contactPhone').value;
    var business = document.getElementById('contactBusiness').value;
    var message = document.getElementById('contactMessage').value;
    
    if (!name || !email || !phone || !message) {
        alert('⚠️ Please fill all required fields (*)');
        return;
    }
    
    var subject = encodeURIComponent('Website Enquiry from ' + name);
    var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + phone + '\n' +
        'Business: ' + (business || 'Not provided') + '\n\n' +
        'Message:\n' + message
    );
    
    window.open('mailto:info@phenomoutsourcing.com?subject=' + subject + '&body=' + body, '_blank');
    
    alert('✅ Email app opened! Please send the email from your email client.');
    
    // Clear form
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactPhone').value = '';
    document.getElementById('contactBusiness').value = '';
    document.getElementById('contactMessage').value = '';
    
    setTimeout(closeEmailModal, 1000);
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Attaching modal to all contact buttons...');
    
    setTimeout(function() {
        // Attach floating button
        var floatingBtn = document.getElementById('floatingQuoteBtn');
        if (floatingBtn) {
            floatingBtn.onclick = function(e) {
                e.preventDefault();
                openEmailModal();
            };
            console.log('✅ Floating button attached');
        }
        
        // Attach close button
        var closeBtn = document.getElementById('closeModalBtn');
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.preventDefault();
                closeEmailModal();
            };
        }
        
        // Attach send button
        var sendBtn = document.getElementById('sendEmailBtn');
        if (sendBtn) {
            sendBtn.onclick = function(e) {
                e.preventDefault();
                sendEmail();
            };
        }
        
        // Attach to all contact buttons
        var buttons = document.querySelectorAll('a, button');
        var count = 0;
        
        buttons.forEach(function(btn) {
            var text = btn.textContent.toLowerCase().trim();
            var href = btn.getAttribute('href');
            
            if (
                text.includes('get started') ||
                text.includes('contact') ||
                text.includes('enquiry') ||
                text.includes('schedule') ||
                text.includes('consultation') ||
                href === '#' && (
                    btn.classList.contains('btn-primary') ||
                    btn.classList.contains('btn-large') ||
                    btn.classList.contains('cta-btn')
                )
            ) {
                btn.onclick = function(e) {
                    e.preventDefault();
                    openEmailModal();
                    return false;
                };
                count++;
            }
        });
        
        console.log('✅ Attached modal to ' + count + ' buttons');
        
    }, 1000); // Wait 1 second for footer to load
});

// Escape key to close
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeEmailModal();
});

console.log('✅ Email modal functions loaded');

/* =========================================
   Phenom OUTSOURCING - COMPLETE JAVASCRIPT
   All 30+ Pages - Interactive Features
   Version: 2.0 - Production Ready
   ========================================= */

'use strict';

/* =========================================
   GLOBAL VARIABLES
   ========================================= */
let currentSlide = 0;
let currentFormStep = 1;
let countersAnimated = false;
let exitModalShown = false;

/* =========================================
   CONFIGURATION
   ========================================= */
const CONFIG = {
    scrollThreshold: 100,
    debounceDelay: 150,
    animationDuration: 300,
    cookieExpireDays: 365,
    formSubmitDelay: 1500
};

/* =========================================
   DOM CONTENT LOADED - Initialize Everything
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionalities
    initStickyHeader();
    initMobileMenu();
    initScrollAnimations();
    initScrollToTop();
    initStatCounters();
    initSmoothScroll();
    initDarkMode();
    initCookieBanner();
    initExitIntent();
    initServiceFilters();
    initServiceCards();
    initFAQAccordion();
    initCalculator();
    initNavSearch();
    initCircularProgress();
    initScrollProgress();
    initLoadMore();
    initNewsletterForm();
    
    console.log('✅ All features initialized successfully!');
    verifyPageElements();
});

/* =========================================
   SCROLL PROGRESS BAR
   ========================================= */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    const updateProgress = () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrolled}%`;
    };

    window.addEventListener('scroll', throttle(updateProgress, 50));
    updateProgress(); // Initial call
}

window.addEventListener('scroll', function() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
    
    // Update scroll to top progress ring
    updateScrollProgress();
});

function updateScrollProgress() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    const circle = scrollBtn.querySelector('.progress-ring-circle');
    if (!circle) return;
    
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const circumference = 2 * Math.PI * 26;
    const offset = circumference - (scrolled / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

/* =========================================
   DARK MODE TOGGLE
   ========================================= */
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    // Check for saved preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            this.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            this.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });
}

/* =========================================
   COOKIE CONSENT BANNER
   ========================================= */
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    if (!cookieBanner) return;
    
    // Check if user already accepted/declined cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => {
            banner.style.display = 'none';
        }, 400);
    }
    console.log('Cookies accepted');
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => {
            banner.style.display = 'none';
        }, 400);
    }
    console.log('Cookies declined');
}

/* =========================================
   EXIT INTENT MODAL
   ========================================= */
function initExitIntent() {
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitModalShown) {
            showExitModal();
        }
    });
}

function showExitModal() {
    const exitModal = document.getElementById('exitModal');
    if (!exitModal) return;
    
    exitModal.classList.add('show');
    exitModalShown = true;
    document.body.style.overflow = 'hidden';
}

function closeExitModal() {
    const exitModal = document.getElementById('exitModal');
    if (!exitModal) return;
    
    exitModal.classList.remove('show');
    document.body.style.overflow = '';
}

/* =========================================
   STICKY HEADER WITH HIDE/SHOW
   ========================================= */
function initStickyHeader() {
    const header = document.getElementById('mainHeader');
    if (!header) return;
    
    let lastScroll = 0;
    
    const handleScroll = throttle(() => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('scroll-up');
            header.classList.remove('scroll-down');
            return;
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
}

/* =========================================
   ENHANCED MOBILE MENU
   ========================================= */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNavbar = document.getElementById('mainNavbar');
    const hasDropdownItems = document.querySelectorAll('.has-dropdown');
    const body = document.body;
    
    if (!mobileMenuToggle || !mainNavbar) return;
    
    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mainNavbar.classList.toggle('active');
        body.style.overflow = mainNavbar.classList.contains('active') ? 'hidden' : '';
    });
    
    // Mobile Dropdown Toggle
    hasDropdownItems.forEach(item => {
        const link = item.querySelector('.menu-link');
        
        if (link) {
            link.addEventListener('click', function(e) {
                // Only prevent default on mobile
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    hasDropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('mobile-active');
                        }
                    });
                    
                    // Toggle current dropdown
                    item.classList.toggle('mobile-active');
                }
            });
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && !e.target.closest('.mobile-menu-toggle')) {
            if (mainNavbar.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mainNavbar.classList.remove('active');
                body.style.overflow = '';
            }
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            mainNavbar.classList.remove('active');
            body.style.overflow = '';
            
            // Remove mobile-active class from all dropdowns
            hasDropdownItems.forEach(item => {
                item.classList.remove('mobile-active');
            });
        }
    }, 250));
}

/* =========================================
   NAVIGATION SEARCH
   ========================================= */
function initNavSearch() {
    const searchInput = document.getElementById('navSearchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(function(e) {
        const query = e.target.value.toLowerCase();
        console.log('Search query:', query);
        
        // TODO: Implement search functionality
        // This could filter services, show suggestions, etc.
    }, 300));
}

/* =========================================
   SMOOTH SCROLLING
   ========================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const mainNavbar = document.getElementById('mainNavbar');
                const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                if (mainNavbar && mainNavbar.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    mainNavbar.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

/* =========================================
   SCROLL ANIMATIONS
   ========================================= */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(el => observer.observe(el));
}

/* =========================================
   SERVICE FILTERS
   ========================================= */
function initServiceFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards with animation
            serviceCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, CONFIG.animationDuration);
                }
            });
        });
    });
}

/* =========================================
   SERVICE CARDS - EXPANDABLE CONTENT & 3D TILT
   ========================================= */
function initServiceCards() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.service-card');
            const expandableContent = card.querySelector('.expandable-content');
            
            if (expandableContent.classList.contains('expanded')) {
                expandableContent.classList.remove('expanded');
                this.innerHTML = 'Read More <i class="fa-solid fa-chevron-down"></i>';
                this.classList.remove('expanded');
            } else {
                expandableContent.classList.add('expanded');
                this.innerHTML = 'Read Less <i class="fa-solid fa-chevron-up"></i>';
                this.classList.add('expanded');
            }
        });
    });
    
    // 3D Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* =========================================
   LOAD MORE BUTTON
   ========================================= */
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = '<i class="fa-solid fa-check-circle"></i> All Services Loaded';
            this.style.opacity = '0.6';
        }, 1500);
    });
}

/* =========================================
   CIRCULAR PROGRESS STATS
   ========================================= */
function initCircularProgress() {
    const statBoxes = document.querySelectorAll('.stat-circle-box');
    if (statBoxes.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                const circle = entry.target.querySelector('.progress-circle');
                const counter = entry.target.querySelector('.counter');
                
                if (circle) {
                    const percent = circle.getAttribute('data-percent') || 100;
                    const circumference = 2 * Math.PI * 60;
                    const offset = circumference - (percent / 100) * circumference;
                    
                    setTimeout(() => {
                        circle.style.strokeDashoffset = offset;
                    }, 100);
                }
                
                if (counter) {
                    animateCounter(counter);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statBoxes.forEach(box => observer.observe(box));
}

/* =========================================
   STAT COUNTERS ANIMATION
   ========================================= */
function initStatCounters() {
    const counterSection = document.querySelector('.why-choose-section');
    if (!counterSection) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(counterSection);
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        animateCounter(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

/* =========================================
   COST CALCULATOR
   ========================================= */
function initCalculator() {
    const transactionsSlider = document.getElementById('transactions');
    const transactionsValue = document.getElementById('transactionsValue');
    const currentCostInput = document.getElementById('currentCost');
    const currentAmountSpan = document.getElementById('currentAmount');
    const PhenomAmountSpan = document.getElementById('PhenomAmount');
    const savingsPercentSpan = document.getElementById('savingsPercent');
    
    if (!transactionsSlider || !currentCostInput) return;
    
    function updateCalculator() {
        const transactions = parseInt(transactionsSlider.value);
        const currentCost = parseInt(currentCostInput.value) || 2000;
        
        if (transactionsValue) transactionsValue.textContent = transactions;
        if (currentAmountSpan) currentAmountSpan.textContent = currentCost;
        
        // Calculate 50% savings
        const PhenomCost = Math.round(currentCost * 0.5);
        const savings = 50;
        
        if (PhenomAmountSpan) PhenomAmountSpan.textContent = PhenomCost;
        if (savingsPercentSpan) savingsPercentSpan.textContent = savings;
    }
    
    transactionsSlider.addEventListener('input', updateCalculator);
    currentCostInput.addEventListener('input', updateCalculator);
    
    updateCalculator();
}

/* =========================================
   FAQ ACCORDION
   ========================================= */
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqSearch = document.getElementById('faqSearch');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // FAQ Search
    if (faqSearch) {
        faqSearch.addEventListener('input', debounce(function(e) {
            const query = e.target.value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const questionSpan = item.querySelector('.faq-question span');
                const answerP = item.querySelector('.faq-answer p');
                
                if (!questionSpan || !answerP) return;
                
                const question = questionSpan.textContent.toLowerCase();
                const answer = answerP.textContent.toLowerCase();
                
                if (question.includes(query) || answer.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }, 300));
    }
}

/* =========================================
   SCROLL TO TOP BUTTON
   ========================================= */
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* =========================================
   MODAL FUNCTIONS
   ========================================= */
function openModal() {
    const modal = document.getElementById('enquiryModal');
    if (!modal) return;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Reset to first step
    showFormStep(1);
    
    console.log('UI: Enquiry modal opened');
}

function closeModal() {
    const modal = document.getElementById('enquiryModal');
    if (!modal) return;
    
    modal.classList.remove('show');
    document.body.style.overflow = '';
    
    console.log('UI: Enquiry modal closed');
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('enquiryModal');
    const exitModal = document.getElementById('exitModal');
    
    if (event.target === modal) {
        closeModal();
    }
    
    if (event.target === exitModal) {
        closeExitModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('enquiryModal');
        const exitModal = document.getElementById('exitModal');
        
        if (modal && modal.classList.contains('show')) {
            closeModal();
        }
        
        if (exitModal && exitModal.classList.contains('show')) {
            closeExitModal();
        }
    }
});

/* =========================================
   MULTI-STEP FORM NAVIGATION
   ========================================= */
function showFormStep(step) {
    const formSteps = document.querySelectorAll('.form-step');
    const steps = document.querySelectorAll('.step');
    
    formSteps.forEach((formStep, index) => {
        if (index + 1 === step) {
            formStep.classList.add('active');
        } else {
            formStep.classList.remove('active');
        }
    });
    
    steps.forEach((stepEl, index) => {
        if (index + 1 <= step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });
    
    currentFormStep = step;
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentFormStep < 3) {
            showFormStep(currentFormStep + 1);
        }
    }
}

function prevStep() {
    if (currentFormStep > 1) {
        showFormStep(currentFormStep - 1);
    }
}

function validateCurrentStep() {
    const currentStep = document.querySelector(`.form-step[data-step="${currentFormStep}"]`);
    if (!currentStep) return true;
    
    const requiredInputs = currentStep.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
            
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields');
    }
    
    return isValid;
}

/* =========================================
   HERO SECTION BUTTON HANDLERS
   ========================================= */
function handleBusinessClick() {
    console.log('BUTTON CLICKED: Businesses');
    
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function handleFirmClick() {
    console.log('BUTTON CLICKED: Accounting Firms');
    
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/* =========================================
   MULTI-STEP FORM NAVIGATION
   ========================================= */

let currentStep = 1;
const totalSteps = 3;

// Next Step Function
function nextStep() {
    if (!validateCurrentStep()) {
        return;
    }
    
    if (currentStep < totalSteps) {
        currentStep++;
        updateFormSteps();
    }
}

// Previous Step Function
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateFormSteps();
    }
}

// Update Form Steps Display
function updateFormSteps() {
    // Update form steps visibility
    const formSteps = document.querySelectorAll('.form-step');
    formSteps.forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update progress indicators
    const stepIndicators = document.querySelectorAll('.form-steps .step');
    stepIndicators.forEach((indicator, index) => {
        if (index + 1 <= currentStep) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Validate Current Step
function validateCurrentStep() {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    
    if (!currentFormStep) return true;
    
    const requiredFields = currentFormStep.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        // Remove previous error styling
        field.style.borderColor = '';
        
        // Check if field is empty
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
            
            // Focus on first invalid field
            if (isValid === false) {
                field.focus();
            }
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
                alert('Please enter a valid email address');
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /\d{10,}/;
            if (!phoneRegex.test(field.value.replace(/\D/g, ''))) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
                alert('Please enter a valid phone number (at least 10 digits)');
            }
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields correctly');
    }
    
    return isValid;
}

/* =========================================
   FORM SUBMISSION HANDLER
   ========================================= */

function handleFormSubmitSimple(event) {
    event.preventDefault();
    
    // Final validation
    if (!validateCurrentStep()) {
        return false;
    }
    
    // Check if at least one service is selected
    const servicesChecked = document.querySelectorAll('input[name="services"]:checked');
    if (servicesChecked.length === 0) {
        alert('Please select at least one service');
        return false;
    }
    
    // Check captcha
    const captcha = document.getElementById('captchaCheck');
    if (!captcha.checked) {
        alert('Please verify that you are not a robot');
        return false;
    }
    
    // Get form
    const form = document.getElementById('enquiryForm');
    const submitBtn = form.querySelector('.btn-submit');
    
    // Show loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Create FormData
    const formData = new FormData(form);
    
    // Send to FormSubmit
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Success!
            console.log('✅ Form submitted successfully!');
            showSuccessAnimation();
            
            // Reset form
            form.reset();
            
            // Reset to step 1
            currentStep = 1;
            updateFormSteps();
            
            // Close modal after 3 seconds
            setTimeout(() => {
                closeModal();
                hideSuccessAnimation();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 3000);
        } else {
            throw new Error('Submission failed');
        }
    })
    .catch(error => {
        console.error('❌ Error:', error);
        alert('There was an error sending your enquiry. Please try again or contact us directly.');
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
    
    return false;
}

/* =========================================
   LOCALHOST TESTING VERSION
   Remove this after deploying to live server!
   ========================================= */

// function handleFormSubmitSimple(event) {
//     event.preventDefault();
    
//     // Final validation
//     if (!validateCurrentStep()) {
//         return false;
//     }
    
//     // Check if at least one service is selected
//     const servicesChecked = document.querySelectorAll('input[name="services"]:checked');
//     if (servicesChecked.length === 0) {
//         alert('Please select at least one service');
//         return false;
//     }
    
//     // Check captcha
//     const captcha = document.getElementById('captchaCheck');
//     if (!captcha.checked) {
//         alert('Please verify that you are not a robot');
//         return false;
//     }
    
//     // Get form
//     const form = document.getElementById('enquiryForm');
//     const submitBtn = form.querySelector('.btn-submit');
    
//     // Show loading state
//     const originalBtnText = submitBtn.innerHTML;
//     submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
//     submitBtn.disabled = true;
    
//     // LOCALHOST TEST: Check if running locally
//     const isLocalhost = window.location.hostname === 'localhost' || 
//                        window.location.hostname === '127.0.0.1' ||
//                        window.location.hostname === '';
    
//     if (isLocalhost) {
//         // SIMULATE SUCCESS FOR LOCAL TESTING
//         console.log('🧪 LOCALHOST TEST MODE');
//         console.log('📋 Form Data:', new FormData(form));
        
//         // Log all form values
//         const formData = new FormData(form);
//         for (let [key, value] of formData.entries()) {
//             console.log(`${key}: ${value}`);
//         }
        
//         // Show success after 1 second
//         setTimeout(() => {
//             console.log('✅ Form would be submitted on live server!');
//             alert('✅ TEST SUCCESS!\n\nForm is working correctly.\n\nOn live server, this will send to:\n' + form.action + '\n\nCheck browser console for form data.');
            
//             showSuccessAnimation();
            
//             // Reset form
//             form.reset();
//             currentStep = 1;
//             updateFormSteps();
            
//             setTimeout(() => {
//                 closeModal();
//                 hideSuccessAnimation();
//                 submitBtn.innerHTML = originalBtnText;
//                 submitBtn.disabled = false;
//             }, 3000);
//         }, 1000);
        
//         return false;
//     }
    
//     // LIVE SERVER: Use FormSubmit
//     const formData = new FormData(form);
    
//     fetch(form.action, {
//         method: 'POST',
//         body: formData,
//         headers: {
//             'Accept': 'application/json'
//         }
//     })
//     .then(response => {
//         if (response.ok) {
//             console.log('✅ Form submitted successfully!');
//             showSuccessAnimation();
            
//             form.reset();
//             currentStep = 1;
//             updateFormSteps();
            
//             setTimeout(() => {
//                 closeModal();
//                 hideSuccessAnimation();
//                 submitBtn.innerHTML = originalBtnText;
//                 submitBtn.disabled = false;
//             }, 3000);
//         } else {
//             throw new Error('Submission failed');
//         }
//     })
//     .catch(error => {
//         console.error('❌ Error:', error);
//         alert('There was an error sending your enquiry. Please try again or contact us directly.');
//         submitBtn.innerHTML = originalBtnText;
//         submitBtn.disabled = false;
//     });
    
//     return false;
// }

/* =========================================
   MODAL FUNCTIONS
   ========================================= */

function openModal() {
    const modal = document.getElementById('enquiryModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Reset to step 1 when opening
        currentStep = 1;
        updateFormSteps();
    }
}

function closeModal() {
    const modal = document.getElementById('enquiryModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Reset form
        const form = document.getElementById('enquiryForm');
        if (form) {
            form.reset();
        }
        
        // Reset to step 1
        currentStep = 1;
        updateFormSteps();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('enquiryModal');
    if (event.target === modal) {
        closeModal();
    }
}

/* =========================================
   SUCCESS ANIMATION
   ========================================= */

function showSuccessAnimation() {
    const successDiv = document.querySelector('.success-animation');
    if (successDiv) {
        successDiv.classList.add('show');
    }
}

function hideSuccessAnimation() {
    const successDiv = document.querySelector('.success-animation');
    if (successDiv) {
        successDiv.classList.remove('show');
    }
}

/* =========================================
   INITIALIZE FORM
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
    // Attach form submit handler
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', handleFormSubmitSimple);
    }
    
    // Initialize form steps
    updateFormSteps();
    
    // Remove border color on input
    const allInputs = document.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
});

/* =========================================
   SUCCESS ANIMATION
   ========================================= */
function showSuccessAnimation() {
    const successAnimation = document.getElementById('successAnimation');
    if (successAnimation) {
        successAnimation.classList.add('show');
    }
}

function hideSuccessAnimation() {
    const successAnimation = document.getElementById('successAnimation');
    if (successAnimation) {
        successAnimation.classList.remove('show');
    }
}

/* =========================================
   NEWSLETTER FORM
   ========================================= */
function initNewsletterForm() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
        form.addEventListener('submit', handleNewsletter);
    });
}

function handleNewsletter(event) {
    event.preventDefault();
    
    const emailInput = event.target.querySelector('input[type="email"]');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    console.log('Newsletter signup:', email);
    
    // Show success message
    const button = event.target.querySelector('button');
    if (!button) return;
    
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check"></i>';
    button.style.background = 'var(--accent-green)';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
        emailInput.value = '';
        alert('Thank you for subscribing to our newsletter!');
    }, 2000);
}

/* =========================================
   LIVE CHAT BUTTON
   ========================================= */
function openLiveChat() {
    console.log('Opening live chat...');
    // TODO: Integrate with live chat service (Intercom, Drift, Tawk.to, etc.)
    alert('Live chat feature coming soon! Please contact us via the enquiry form or call us directly.');
}

/* =========================================
   UTILITY FUNCTIONS
   ========================================= */
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function getCurrentDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
}

/* =========================================
   ERROR HANDLING
   ========================================= */
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
    console.error('File:', e.filename);
    console.error('Line:', e.lineno);
});

/* =========================================
   PERFORMANCE MONITORING
   ========================================= */
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.log('⏱️ Performance Metrics:');
        console.log('  Page Load Time:', pageLoadTime + 'ms');
        console.log('  Server Response Time:', connectTime + 'ms');
        console.log('  DOM Render Time:', renderTime + 'ms');
        
        if (pageLoadTime > 3000) {
            console.warn('⚠️ Page load time exceeds 3 seconds. Consider optimization.');
        }
    }
});

/* =========================================
   ACCESSIBILITY ENHANCEMENTS
   ========================================= */
document.addEventListener('keydown', function(e) {
    // Tab key detection for keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

/* =========================================
   RESPONSIVE ADJUSTMENTS
   ========================================= */
let windowWidth = window.innerWidth;

window.addEventListener('resize', debounce(function() {
    const newWidth = window.innerWidth;
    
    if (Math.abs(newWidth - windowWidth) > 50) {
        windowWidth = newWidth;
        
        // Close mobile menu on resize to desktop
        if (newWidth > 768) {
            const navbar = document.getElementById('mainNavbar');
            const toggle = document.getElementById('mobileMenuToggle');
            if (navbar) {
                navbar.classList.remove('active');
                document.body.style.overflow = '';
            }
            if (toggle) {
                toggle.classList.remove('active');
            }
        }
        
        console.log('Window resized to:', newWidth + 'px');
    }
}, 250));

/* =========================================
   PAGE VERIFICATION
   ========================================= */
function verifyPageElements() {
    const criticalElements = [
        'mainHeader',
        'mainNavbar',
        'enquiryModal',
        'enquiryForm'
    ];
    
    let allPresent = true;
    criticalElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.warn('⚠️ Missing element:', id);
            allPresent = false;
        }
    });
    
    if (allPresent) {
        console.log('✅ All critical page elements loaded successfully');
    } else {
        console.log('ℹ️ Some optional elements not found (this is normal for different page types)');
    }
}

/* =========================================
   CONSOLE WELCOME MESSAGE
   ========================================= */
console.log('%c🚀 Phenom Outsourcing - Complete Website', 'font-size: 20px; font-weight: bold; color: #4a90e2;');
console.log('%cVersion: 2.0 - Production Ready', 'color: #666;');
console.log('%c✅ 60+ Features Active:', 'font-size: 14px; font-weight: bold; color: #6fb048;');
console.log('%c  • 30+ Pages Connected', 'color: #6fb048;');
console.log('%c  • Mobile Responsive', 'color: #6fb048;');
console.log('%c  • Dark Mode Toggle', 'color: #6fb048;');
console.log('%c  • Scroll Progress Bar', 'color: #6fb048;');
console.log('%c  • Cookie Consent Banner', 'color: #6fb048;');
console.log('%c  • Exit Intent Modal', 'color: #6fb048;');
console.log('%c  • Multi-Step Form', 'color: #6fb048;');
console.log('%c  • Service Filters', 'color: #6fb048;');
console.log('%c  • 3D Tilt Cards', 'color: #6fb048;');
console.log('%c  • Expandable Cards', 'color: #6fb048;');
console.log('%c  • Cost Calculator', 'color: #6fb048;');
console.log('%c  • FAQ with Search', 'color: #6fb048;');
console.log('%c  • Circular Stats', 'color: #6fb048;');
console.log('%c  • Animated Counters', 'color: #6fb048;');
console.log('%c  • And 45+ more!', 'color: #6fb048;');

/* =========================================
   EXPORT FOR TESTING & DEBUGGING
   ========================================= */
window.PhenomWebsite = {
    version: '2.0',
    features: 60,
    pages: 30,
    openModal,
    closeModal,
    handleBusinessClick,
    handleFirmClick,
    nextStep,
    prevStep,
    showFormStep,
    openLiveChat,
    acceptCookies,
    declineCookies,
    formatPhoneNumber,
    isValidEmail,
    getCurrentDate,
    CONFIG
};

console.log('%c💡 Debug: window.PhenomWebsite', 'color: #4a90e2; font-style: italic;');
console.log('%c📚 Example: window.PhenomWebsite.openModal()', 'color: #999; font-style: italic;');

/* =========================================
   END OF SCRIPT - ALL FEATURES LOADED
   ========================================= */

/* =========================================
   SOFTWARE & CLIENTS LOGOS - ENHANCED
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all software logos
    const softwareLogos = document.querySelectorAll('.software-logo');
    softwareLogos.forEach(logo => {
        fadeInObserver.observe(logo);
    });
    
    // Observe all client logos
    const clientLogos = document.querySelectorAll('.client-logo');
    clientLogos.forEach(logo => {
        fadeInObserver.observe(logo);
    });
    
    // Click tracking for analytics (optional)
    const allLogos = [...softwareLogos, ...clientLogos];
    allLogos.forEach(logo => {
        logo.addEventListener('click', function(e) {
            const logoName = this.querySelector('img')?.alt || 
                           this.querySelector('.logo-placeholder span')?.textContent ||
                           'Unknown';
            
            console.log('Logo clicked:', logoName);
            
            // Google Analytics tracking (if you have GA installed)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'logo_click', {
                    'event_category': 'engagement',
                    'event_label': logoName
                });
            }
        });
    });
    
    // Lazy load images for better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

/* =========================================
   OPTIONAL: Auto-Rotate Client Logos
   Uncomment to enable automatic carousel
   ========================================= */


function initClientCarousel() {
    const clientsGrid = document.querySelector('.clients-grid');
    if (!clientsGrid) return;
    
    const clients = Array.from(clientsGrid.children);
    let currentIndex = 0;
    
    setInterval(() => {
        // Fade out current
        clients.forEach(client => {
            client.style.opacity = '0.3';
        });
        
        // Highlight next 5
        for (let i = 0; i < 5; i++) {
            const index = (currentIndex + i) % clients.length;
            clients[index].style.opacity = '1';
        }
        
        currentIndex = (currentIndex + 1) % clients.length;
    }, 3000);
}

// Activate on load
document.addEventListener('DOMContentLoaded', initClientCarousel);
