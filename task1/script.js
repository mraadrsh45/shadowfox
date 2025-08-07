// Main DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-item, .project-card, .timeline-item, .contact-info-item, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    // Add parallax effect to background elements
    window.addEventListener('mousemove', function(e) {
        const parallaxElements = document.querySelectorAll('.hero::before, .hero::after, .about::before');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxElements.forEach(element => {
            const offsetX = (mouseX - 0.5) * 30;
            const offsetY = (mouseY - 0.5) * 30;
            element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
    
    // Add smooth reveal animation for section titles
    const revealSectionTitles = function() {
        const titles = document.querySelectorAll('.section-title');
        
        titles.forEach(title => {
            const titlePosition = title.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (titlePosition < windowHeight - 50) {
                title.classList.add('revealed');
            }
        });
    };
    
    // Run on initial load
    revealSectionTitles();
    
    // Run on scroll
    window.addEventListener('scroll', revealSectionTitles);
    // Run on initial load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Preloader setup
    window.addEventListener('load', function() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(preloader);
        
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.remove();
            }, 500);
        }, 500);
        
        // Create technology animation particles
        createTechParticles();
    });

    // Technology Animation
    function createTechParticles() {
        const techAnimation = document.querySelector('.tech-animation');
        if (!techAnimation) return;
        
        // Create particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'tech-particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random animation delay
            const delay = Math.random() * 5;
            particle.style.animationDelay = `${delay}s`;
            
            techAnimation.appendChild(particle);
        }
        
        // Create tech lines
        for (let i = 0; i < 10; i++) {
            const line = document.createElement('div');
            line.className = 'tech-line';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            line.style.left = `${posX}%`;
            line.style.top = `${posY}%`;
            
            // Random rotation
            const rotation = Math.random() * 360;
            line.style.transform = `rotate(${rotation}deg)`;
            
            // Random length
            const length = Math.random() * 150 + 50;
            line.style.width = `${length}px`;
            
            // Random animation delay
            const delay = Math.random() * 5;
            line.style.animationDelay = `${delay}s`;
            
            techAnimation.appendChild(line);
        }
    }

    
    // Typing effect for hero section h2
    const typingElementH2 = document.querySelector('.hero-content h2');
    if (typingElementH2) {
        const phrases = [
            'Web Developer',
            'UI/UX Designer',
            'Cybersecurity Analyst',
            'Python Developer'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Deleting text
                typingElementH2.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Faster when deleting
            } else {
                // Typing text
                typingElementH2.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150; // Slower when typing
            }
            
            // If word is complete, start deleting after pause
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at end of word
            }
            
            // If deletion is complete, move to next word
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Start the typing effect
        setTimeout(typeEffect, 1000);
    }
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Submission with enhanced feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Create and append status indicator for each input
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            const statusIndicator = document.createElement('span');
            statusIndicator.classList.add('input-status');
            input.parentElement.appendChild(statusIndicator);
            
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                statusIndicator.classList.add('active');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                    statusIndicator.classList.remove('active', 'valid', 'invalid');
                } else {
                    // Validate input
                    let isValid = true;
                    
                    if (this.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        isValid = emailRegex.test(this.value);
                    } else if (this.id === 'name') {
                        isValid = this.value.length >= 2;
                    } else if (this.id === 'subject') {
                        isValid = this.value.length >= 3;
                    } else if (this.id === 'message') {
                        isValid = this.value.length >= 10;
                    }
                    
                    if (isValid) {
                        statusIndicator.classList.add('valid');
                        statusIndicator.classList.remove('invalid');
                    } else {
                        statusIndicator.classList.add('invalid');
                        statusIndicator.classList.remove('valid');
                    }
                }
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Basic form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // In a real application, you would send this data to a server
            // For this demo, we'll create a mailto link to the specified email
            const mailtoLink = `mailto:luxmankumar6282@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
            
            // Create a temporary anchor element instead of using window.location.href
            const mailtoAnchor = document.createElement('a');
            mailtoAnchor.href = mailtoLink;
            mailtoAnchor.target = '_blank'; // Open in new tab/window
            mailtoAnchor.style.display = 'none';
            document.body.appendChild(mailtoAnchor);
            mailtoAnchor.click();
            document.body.removeChild(mailtoAnchor);
            
            alert('Thank you for your message! Opening your email client...');
            contactForm.reset();
            
            // Reset all status indicators
            const statusIndicators = contactForm.querySelectorAll('.input-status');
            statusIndicators.forEach(indicator => {
                indicator.classList.remove('active', 'valid', 'invalid');
            });
            
            // Reset all focused classes
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('focused');
            });
        });
    }

    // Skill bar animation with improved visual effect
    const skillSection = document.querySelector('#skills');
    const skillLevels = document.querySelectorAll('.skill-level');

    // Function to check if an element is in viewport
    function isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Function to animate skill bars
    function animateSkillBars() {
        // Only run animation if skill section exists and is in viewport
        if (skillSection && skillLevels && skillLevels.length > 0 && isInViewport(skillSection)) {
            skillLevels.forEach((skill, index) => {
                const width = skill.style.width;
                skill.style.width = '0';
                setTimeout(() => {
                    skill.style.width = width;
                    skill.style.transition = 'width 1.5s cubic-bezier(0.1, 0.5, 0.1, 1)';
                    
                    // Add pulse animation after the bar is filled
                    setTimeout(() => {
                        skill.classList.add('pulse');
                    }, 1500);
                }, 100 * index); // Stagger the animations
            });
            // Remove the scroll event listener after animation
            window.removeEventListener('scroll', animateSkillBars);
        }
    }

    // Add scroll event listener for skill bars animation only if skill section exists
    if (skillSection && skillLevels && skillLevels.length > 0) {
        window.addEventListener('scroll', animateSkillBars);
        // Trigger once on page load
        animateSkillBars();
    }

    // Project hover effect with enhanced interactions
    const projectImages = document.querySelectorAll('.project-img');
    projectImages.forEach(img => {
        // Create a ripple effect on hover
        img.addEventListener('mouseenter', function(e) {
            this.querySelector('img').style.transform = 'scale(1.1)';
            
            // Create ripple element
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Position the ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
        
        img.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
        
        // Add tilt effect on mouse move
        img.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width - 0.5) * 10;
            const yPercent = (y / rect.height - 0.5) * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${-yPercent}deg) rotateY(${xPercent}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        // Reset transform on mouse leave
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Typing effect for hero section
    const typingElement = document.querySelector('.hero-content h1 span');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }
}); // Close the DOMContentLoaded event listener
