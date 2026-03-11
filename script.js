document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       1. Header Scroll Effect
       ========================================================================= */
    const header = document.getElementById('header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Initial check and scroll event listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);


    /* =========================================================================
       2. Mobile Menu Toggle
       ========================================================================= */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent body scrolling when menu is open on mobile
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    /* =========================================================================
       3. Intersection Observer (Scroll Animations)
       ========================================================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before it comes into view
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // Deal with staggered delays if data-delay attribute exists
                const delay = target.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => {
                        target.classList.add('is-visible');
                    }, parseInt(delay));
                } else {
                    target.classList.add('is-visible');
                }

                // Stop observing once animated
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    const animationTargets = document.querySelectorAll('.observer-target');
    animationTargets.forEach(target => {
        observer.observe(target);
    });


    /* =========================================================================
       4. Custom Smooth Scroll (Optional enhancement for Safari/iOS)
       ========================================================================= */
    // Native CSS scroll-behavior: smooth handles most cases, 
    // but applying it locally enables smoother anchor jumps
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Calculate offset considering fixed header
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
