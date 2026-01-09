// ==================== SECURITY: BLOCK INSPECT ELEMENT ====================
// Disable right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Disable specific keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // F12 (Developer Tools)
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+I (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+S (Save Page)
    if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+K (Console on Firefox)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
        e.preventDefault();
        return false;
    }
});

// Disable text selection
document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
});

// Disable copy
document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
});

// Disable cut
document.addEventListener('cut', (e) => {
    e.preventDefault();
    return false;
});

// Detect if DevTools is open
(function() {
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function() {
            // DevTools detected
            window.location.href = 'about:blank';
        }
    });
    
    setInterval(() => {
        console.log(element);
        console.clear();
    }, 1000);
})();

// Additional protection against console access
const disableConsole = () => {
    const noOp = () => {};
    const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'dirxml', 'group', 'groupCollapsed', 'groupEnd', 'clear'];
    
    methods.forEach(method => {
        console[method] = noOp;
    });
};

// Call the disableConsole function
disableConsole();

// ==================== SMOOTH 3D SPHERE CONTROLS ====================
document.addEventListener('DOMContentLoaded', () => {
    const sphere = document.getElementById('techSphere');
    if (!sphere) return;

    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let rotationX = 0;
    let rotationY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let scale = 1;
    let animationId = null;

    // Smooth momentum animation
    function animate() {
        if (!isDragging) {
            // Apply momentum
            rotationX += velocityX;
            rotationY += velocityY;
            
            // Damping effect
            velocityX *= 0.95;
            velocityY *= 0.95;
            
            // Stop if velocity is too low
            if (Math.abs(velocityX) < 0.01 && Math.abs(velocityY) < 0.01) {
                velocityX = 0;
                velocityY = 0;
            }
        }
        
        sphere.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        animationId = requestAnimationFrame(animate);
    }
    
    animate();

    // Mouse drag controls
    sphere.addEventListener('mousedown', (e) => {
        isDragging = true;
        currentX = e.clientX;
        currentY = e.clientY;
        velocityX = 0;
        velocityY = 0;
        sphere.classList.add('paused');
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - currentX;
        const deltaY = e.clientY - currentY;
        
        velocityY = deltaX * 0.3;
        velocityX = -deltaY * 0.3;
        
        rotationX += velocityX;
        rotationY += velocityY;
        
        currentX = e.clientX;
        currentY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            setTimeout(() => {
                sphere.classList.remove('paused');
            }, 2000);
        }
    });

    // Mouse wheel zoom - DISABLED
    // User can only control rotation, not size

    // Touch controls for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    sphere.addEventListener('touchstart', (e) => {
        isDragging = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        velocityX = 0;
        velocityY = 0;
        sphere.classList.add('paused');
    });

    sphere.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        
        velocityY = deltaX * 0.3;
        velocityX = -deltaY * 0.3;
        
        rotationX += velocityX;
        rotationY += velocityY;
        
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    sphere.addEventListener('touchend', () => {
        isDragging = false;
        setTimeout(() => {
            sphere.classList.remove('paused');
        }, 2000);
    });
});

// ==================== CUSTOM CURSOR ==================== 
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    let mouseX = 0;
    let mouseY = 0;
    let cursorVisible = false;

    // Update cursor position continuously
    const updateCursorPosition = () => {
        if (cursorVisible) {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
            
            cursor.style.left = (mouseX + scrollX) + 'px';
            cursor.style.top = (mouseY + scrollY) + 'px';
            cursorDot.style.left = (mouseX + scrollX) + 'px';
            cursorDot.style.top = (mouseY + scrollY) + 'px';
        }
        requestAnimationFrame(updateCursorPosition);
    };

    // Start continuous update loop
    updateCursorPosition();

    // Track mouse movement using clientX/clientY
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Make cursor visible
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
        cursorVisible = true;
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
        cursorVisible = false;
    });

    // Show cursor when entering window
    document.addEventListener('mouseenter', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
        cursorVisible = true;
    });

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .team-member, .nav-link, .hamburger');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });

    // Add click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        cursorDot.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
        cursorDot.classList.remove('click');
    });
});
// ==================== CODE PROTECTION MEASURES ====================

// Right-click is now enabled
// All keyboard shortcuts enabled
// Text selection enabled
// Copy/paste enabled

// ==================== SMOOTH SCROLLING & NAVIGATION ==================== 
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.classList.add('menu-open');
            } else {
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Close menu when nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                // Re-enable scrolling when menu closes
                document.body.classList.remove('menu-open');
            }

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Highlight active navigation link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // CTA Button functionality
    const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('Started')) {
            document.getElementById('team').scrollIntoView({ behavior: 'smooth' });
        }
        // Contact button now links directly to WhatsApp
    });
});
});

// ==================== PROFESSIONAL SCROLL ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Keep observing for repeatable animations if needed
            // scrollObserver.unobserve(entry.target); // Uncomment to animate only once
        }
    });
}, observerOptions);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Animate all sections and elements
    const animatedElements = document.querySelectorAll(`
        .section-title,
        .about-text,
        .about-stats,
        .stat,
        .service-card,
        .team-member,
        .contact-content,
        .contact-description,
        .cta-button,
        .footer,
        .social-link
    `);
    
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Keep navbar visible and constant on all devices
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.background = 'rgba(0, 0, 0, 0.85)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.webkitBackdropFilter = 'blur(10px)';
    }
});

// ==================== TEAM CARD FLIP ANIMATION ==================== 
document.addEventListener('DOMContentLoaded', () => {
    const teamMembers = document.querySelectorAll('.team-member');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    teamMembers.forEach(member => {
        const flipCard = member.querySelector('.flip-card');
        let isFlipped = false;
        let touchStartTime = 0;
        let touchMoved = false;

        // Immediate tap/click response
        const toggleFlip = (e) => {
            // Prevent flip if this was a scroll gesture
            if (touchMoved) {
                return;
            }
            
            e.preventDefault();
            e.stopPropagation();
            isFlipped = !isFlipped;
            flipCard.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        };

        if (isTouchDevice) {
            // Touch support for mobile devices - with scroll detection
            member.addEventListener('touchstart', (e) => {
                touchStartTime = Date.now();
                touchMoved = false;
            }, { passive: true });
            
            member.addEventListener('touchmove', () => {
                touchMoved = true;
            }, { passive: true });
            
            member.addEventListener('touchend', (e) => {
                // Only flip if it was a quick tap (not a scroll)
                const touchDuration = Date.now() - touchStartTime;
                if (!touchMoved && touchDuration < 300) {
                    toggleFlip(e);
                }
            }, { passive: false });
        } else {
            // Click support for desktop
            member.addEventListener('click', toggleFlip);

            // Hover effect for non-touch desktop devices
            member.addEventListener('mouseenter', () => {
                if (!isFlipped) {
                    flipCard.style.transform = 'rotateY(180deg)';
                }
            });

            member.addEventListener('mouseleave', () => {
                if (!isFlipped) {
                    flipCard.style.transform = 'rotateY(0deg)';
                }
            });
        }
    });
});

// ==================== PARTICLES ANIMATION ==================== 
function animateParticles() {
    const particles = document.querySelectorAll('.particles circle');
    
    particles.forEach((particle, index) => {
        const startX = parseFloat(particle.getAttribute('cx'));
        const startY = parseFloat(particle.getAttribute('cy'));
        
        // Create floating animation
        const animation = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
        const path = `M ${startX} ${startY} Q ${startX + 30 * Math.cos(index)} ${startY - 50} ${startX} ${startY - 100}`;
        
        animation.setAttribute('dur', `${3 + index * 0.5}s`);
        animation.setAttribute('repeatCount', 'indefinite');
        animation.setAttribute('keyPoints', '0;1');
        animation.setAttribute('keyTimes', '0;1');
        animation.setAttribute('calcMode', 'linear');
    });
}

// ==================== PARALLAX EFFECT (Optional Enhancement) ==================== 
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    parallaxElements.forEach(el => {
        el.style.backgroundPosition = `${scrolled * 0.5}px ${scrolled * 0.5}px`;
    });
});

// ==================== FORM VALIDATION & INTERACTION ==================== 
function initializeFormHandling() {
    // Add any form handling here if needed in future
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeFormHandling);

// ==================== PERFORMANCE & LAZY LOADING ==================== 
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images if you add them in future
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ==================== DYNAMIC STYLING ==================== 
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .scroll-top:hover {
        background: #0099CC;
    }
`;
document.head.appendChild(style);

// ==================== CONSOLE MESSAGE ==================== 
console.log('%c🎨 Welcome to SS Creative Portfolio! 🎨', 'color: #00D4FF; font-size: 20px; font-weight: bold;');
console.log('%cCreated with ❤️ by ScriptSpace Creative Team', 'color: #FF006E; font-size: 14px;');