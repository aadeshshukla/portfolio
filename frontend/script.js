document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth scrolling for navigation links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Navbar scroll effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Intersection Observer for animations on scroll ---
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check for a data-delay attribute
                const delay = entry.target.dataset.delay;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay ? parseInt(delay) : 0);
                
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is in view
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });


    // --- Form submission - THIS CODE IS UNCHANGED TO PRESERVE BACKEND FUNCTIONALITY ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // This fetch request is the same as your original
            try {
                const response = await fetch('https://aadeshportfolio.onrender.com/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, message })
                });

                const result = await response.json();
                alert(result.message);

                if (result.success) {
                    this.reset();
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("There was an error sending your message. Please try again later.");
            }
        });
    }
});