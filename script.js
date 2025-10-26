// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link and update active state
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        // Update active state immediately when clicking
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        link.classList.add('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // For home link, always scroll to top
            if (this.getAttribute('href') === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Add offset for fixed navbar
                const navbarHeight = 70;
                const targetPosition = target.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    const navbarHeight = 70;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + navbarHeight;

        // Check if current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    // If we're at the very top, highlight home
    if (window.scrollY < 100) {
        current = 'home';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // You'll need to replace this with your actual public key
})();

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'arif.s.hossain@outlook.com' // Your email address
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, function(error) {
            console.log('FAILED...', error);
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        })
        .finally(function() {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }

    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .about-text, .contact-info');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    // For now, let's disable the typewriter animation to fix the HTML rendering issue
    // and just show the content immediately with a fade-in effect
    element.innerHTML = text;
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';

    setTimeout(() => {
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyles);

// Show More/Less functionality for sections
document.addEventListener('DOMContentLoaded', () => {
    // Projects section
    const projectsGrid = document.getElementById('projects-grid');
    const showMoreProjectsBtn = document.getElementById('show-more-projects');

    if (showMoreProjectsBtn && projectsGrid) {
        // Initially show only first 2 projects
        const projectCards = projectsGrid.querySelectorAll('.project-card');
        if (projectCards.length > 2) {
            for (let i = 2; i < projectCards.length; i++) {
                projectCards[i].style.display = 'none';
            }
        }

        showMoreProjectsBtn.addEventListener('click', () => {
            const hiddenCards = projectsGrid.querySelectorAll('.project-card[style*="display: none"]');
            if (hiddenCards.length > 0) {
                // Show more projects
                hiddenCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                });
                showMoreProjectsBtn.textContent = 'Show Less';
            } else {
                // Hide extra projects
                for (let i = 2; i < projectCards.length; i++) {
                    projectCards[i].style.display = 'none';
                }
                showMoreProjectsBtn.textContent = 'Show More Projects';
            }
        });
    }

    // Education section
    const educationGrid = document.getElementById('education-grid');
    const showMoreEducationBtn = document.getElementById('show-more-education');

    if (showMoreEducationBtn && educationGrid) {
        // Store original content
        const educationCards = educationGrid.querySelectorAll('.project-card');
        const originalContents = Array.from(educationCards).map(card => card.innerHTML);

        // Create detailed content
        const detailedContents = [
            `<div class="project-image">
                <i class="fas fa-laptop-code"></i>
            </div>
            <div class="project-content">
                <h3>Engineer's Degree, Frontend Developer</h3>
                <h4>IT-Högskolan</h4>
                <span class="timeline-date">Aug 2024 - Jul 2026</span>
                <p>Currently pursuing a comprehensive frontend developer course covering HTML, CSS, JavaScript, UX/UI design, Vue.js, React.js, Node.js, and Agile development. Developing skills in building component-based web applications, managing state (Vuex, Context API, Redux), and implementing routing (Vue Router, React Router). Gaining experience in full stack development, designing databases, handling CRUD operations, and ensuring data integrity. Proficient in working with CMS platforms (WordPress, Drupal), Headless CMS integration, and PHP-based customization. Building expertise in UX/UI design with a focus on user-friendly, accessible solutions.</p>
                <div class="education-skills">
                    <span class="skill-tag">HTML</span>
                    <span class="skill-tag">CSS</span>
                    <span class="skill-tag">JavaScript</span>
                    <span class="skill-tag">Vue.js</span>
                    <span class="skill-tag">React.js</span>
                    <span class="skill-tag">Node.js</span>
                    <span class="skill-tag">UX/UI Design</span>
                    <span class="skill-tag">WordPress</span>
                </div>
            </div>`,
            `<div class="project-image">
                <i class="fas fa-code"></i>
            </div>
            <div class="project-content">
                <h3>Engineer's Degree, Full Stack Java Developer</h3>
                <h4>IT-Högskolan</h4>
                <span class="timeline-date">Nov 2020 - Nov 2022</span>
                <p>Completed a full-stack Java developer program covering Java programming, tools, and environments, database development, web services and integration, web application development, Agile methodologies, Clean Code practices, and testing. Developed advanced skills in complex Java programming, utilizing Java EE, Spring, and Spring Boot. Gained hands-on experience with build and deployment tools like Maven, Docker, and Jenkins, as well as databases such as MySQL and PostgreSQL. Successfully completed two internships (LIA1, LIA2), applying acquired skills in real-world development environments.</p>
                <div class="education-skills">
                    <span class="skill-tag">Java</span>
                    <span class="skill-tag">Spring Boot</span>
                    <span class="skill-tag">Microservices</span>
                    <span class="skill-tag">Docker</span>
                    <span class="skill-tag">CI/CD</span>
                    <span class="skill-tag">TDD</span>
                    <span class="skill-tag">MySQL</span>
                    <span class="skill-tag">PostgreSQL</span>
                </div>
            </div>`
        ];

        showMoreEducationBtn.addEventListener('click', () => {
            if (showMoreEducationBtn.textContent === 'Show More Details') {
                // Show detailed content
                educationCards.forEach((card, index) => {
                    card.innerHTML = detailedContents[index];
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                });
                showMoreEducationBtn.textContent = 'Show Less';
            } else {
                // Show summary content
                educationCards.forEach((card, index) => {
                    card.innerHTML = originalContents[index];
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                });
                showMoreEducationBtn.textContent = 'Show More Details';
            }
        });
    }

    // Experience section
    const experienceGrid = document.getElementById('experience-grid');
    const showMoreExperienceBtn = document.getElementById('show-more-experience');

    if (showMoreExperienceBtn && experienceGrid) {
        // Store original content
        const experienceCards = experienceGrid.querySelectorAll('.project-card');
        const originalContents = Array.from(experienceCards).map(card => card.innerHTML);

        // Create detailed content
        const detailedContents = [
            `<div class="project-image">
                <i class="fas fa-tv"></i>
            </div>
            <div class="project-content">
                <h3>Full-Stack Developer Intern</h3>
                <h4>SVT (Sveriges Television)</h4>
                <span class="timeline-date">Aug 2024 - May 2025</span>
                <p>Developing enterprise-level Swedish Media Annotation Platform with microservices architecture. Implementing complex database relationships with PostgreSQL and JPA/Hibernate, building RESTful APIs with Spring Boot 3.5, and creating React 19/TypeScript frontend with analytics dashboards. Features include automated speech recognition workflows, speaker demographic analysis, Word Error Rate calculations, and Docker containerization for scalable deployment.</p>
            </div>`,
            `<div class="project-image">
                <i class="fas fa-users"></i>
            </div>
            <div class="project-content">
                <h3>Full-Stack Developer</h3>
                <h4>Experis Academy</h4>
                <span class="timeline-date">Jan 2023 - Jun 2023</span>
                <p>Developed "Project Lagalt" - a web platform for creative professionals using Java, Spring Boot, and React. Led backend development, integrated OAuth for user registration, managed privacy settings, and enhanced frontend with responsive design. Successfully presented to 47 developers and stakeholders.</p>
            </div>`,
            `<div class="project-image">
                <i class="fas fa-film"></i>
            </div>
            <div class="project-content">
                <h3>Backend Developer</h3>
                <h4>Experis Academy</h4>
                <span class="timeline-date">Feb 2023 - Mar 2023</span>
                <p>Created "Movie Characters API" - a CRUD application with PostgreSQL and Hibernate. Focused on API development, testing, and documentation. Practiced pair programming and version control with Git in a 2-person team.</p>
            </div>`,
            `<div class="project-image">
                <i class="fas fa-mobile-alt"></i>
            </div>
            <div class="project-content">
                <h3>Full-Stack Developer Intern</h3>
                <h4>Hexa Studio</h4>
                <span class="timeline-date">Jan 2022 - Jun 2022</span>
                <p>Developed a mobile and web application for a recycling company. Built both backend and frontend using Java, Spring Boot, and ReactJS. Adapted to frequent project changes and maintained clean codebase for smooth collaboration in a 7-person team.</p>
            </div>`
        ];

        showMoreExperienceBtn.addEventListener('click', () => {
            if (showMoreExperienceBtn.textContent === 'Show More Details') {
                // Show detailed content
                experienceCards.forEach((card, index) => {
                    card.innerHTML = detailedContents[index];
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                });
                showMoreExperienceBtn.textContent = 'Show Less';
            } else {
                // Show summary content
                experienceCards.forEach((card, index) => {
                    card.innerHTML = originalContents[index];
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                });
                showMoreExperienceBtn.textContent = 'Show More Details';
            }
        });
    }
});
