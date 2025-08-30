// Main JavaScript for Mumbai Indians Fan Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const header = document.querySelector('header');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            // Change icon based on menu state
            const icon = menuToggle.querySelector('i');
            if (mainMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Add active class to nav items when scrolling
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.main-menu a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) {
                a.classList.add('active');
            } else if (current === '' && a.getAttribute('href') === 'index.html') {
                a.classList.add('active');
            }
        });
    });
    
    // Shrink header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainMenu && mainMenu.classList.contains('active') && 
            !mainMenu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            mainMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (mainMenu && mainMenu.classList.contains('active')) {
                        mainMenu.classList.remove('active');
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // Here you would typically send the data to a server
                // For now, we'll just show an alert
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Countdown timer for upcoming matches (if any)
    const countdownElements = document.querySelectorAll('.countdown');
    if (countdownElements.length > 0) {
        countdownElements.forEach(countdownEl => {
            const targetDate = new Date(countdownEl.getAttribute('data-target-date')).getTime();
            
            // Update the countdown every second
            const countdownInterval = setInterval(function() {
                const now = new Date().getTime();
                const distance = targetDate - now;
                
                // Time calculations
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Display the result
                countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                
                // If the countdown is finished
                if (distance < 0) {
                    clearInterval(countdownInterval);
                    countdownEl.innerHTML = "MATCH DAY!";
                }
            }, 1000);
        });
    }
    
    // Image gallery lightbox (if any)
    const galleryImages = document.querySelectorAll('.gallery-img');
    if (galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                document.body.appendChild(lightbox);
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = this.getAttribute('data-full-img') || this.src;
                lightbox.appendChild(lightboxImg);
                
                const closeBtn = document.createElement('span');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '&times;';
                lightbox.appendChild(closeBtn);
                
                // Prevent scrolling when lightbox is open
                document.body.style.overflow = 'hidden';
                
                // Close lightbox when clicking on it
                lightbox.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                });
            });
        });
    }
    
    // Player stats tabs (if any)
    const statsTabs = document.querySelectorAll('.stats-tab');
    if (statsTabs.length > 0) {
        const statsContents = document.querySelectorAll('.stats-content');
        
        statsTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and contents
                statsTabs.forEach(t => t.classList.remove('active'));
                statsContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to current tab and corresponding content
                this.classList.add('active');
                const target = this.getAttribute('data-target');
                document.querySelector(target).classList.add('active');
            });
        });
    }
    
    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add CSS for scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: var(--white);
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-top-btn:hover {
            background-color: var(--secondary-color);
            transform: translateY(-5px);
        }
        
        .scroll-top-btn.show {
            opacity: 1;
            visibility: visible;
        }
        
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .lightbox img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        }
        
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 30px;
            color: var(--white);
            font-size: 40px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
});