document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect Logic
    const typingSpan = document.querySelector('.typing');
    // Words to flip through
    const words = [
        'Frontend Developer',
        'Python Programmer',
        'Machine Learning',
        'Current Code'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            // Remove character
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            // Add character
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100; // Type slower
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause before deleting
            typingDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Switch to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 500;
        }

        setTimeout(typeEffect, typingDelay);
    }

    if (typingSpan) {
        // Create custom cursor element natively
        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        typingSpan.parentNode.insertBefore(cursor, typingSpan.nextSibling);

        // Start animation after a short delay
        setTimeout(typeEffect, 1000);
    }

    // Intersection Observer for scroll animations (fade up into view)
    const revealElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Activate when section is somewhat near the top of the viewport
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Add subtle shadow when not at the top
        if (scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Contact Form Demo Submission Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.textContent;

            // Interaction visual state
            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.backgroundColor = '#10b981'; // Tailwind Green-500 equivalent
                btn.style.color = '#fff';
                btn.style.borderColor = '#10b981';
                contactForm.reset();

                // Return to original state after 3 sec
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.style.borderColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinksList = document.getElementById('nav-links');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    
    if (hamburger && navLinksList) {
        // Open menu
        hamburger.addEventListener('click', () => {
            navLinksList.classList.add('active');
        });

        // Close menu with X button
        if(closeMenuBtn) {
            closeMenuBtn.addEventListener('click', () => {
                navLinksList.classList.remove('active');
            });
        }

        // Close menu when any link is clicked
        const navItems = navLinksList.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinksList.classList.remove('active');
            });
        });
    }

    // Back to Top button logic
    const backToTopBtn = document.getElementById('backToTop');
    if(backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
    }
});