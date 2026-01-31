document.addEventListener('DOMContentLoaded', () => {
    // Premium Header Logic
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Cinematic Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Scroll Spy for Nav Links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-50px 0px -50% 0px'
    });

    sections.forEach(section => {
        scrollSpyObserver.observe(section);
    });

    // Magnetic Button Interaction (Exclusive Feel)
    const magneticBtns = document.querySelectorAll('.btn-signature, .btn-red');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });

    // Deep Parallax Engine
    const parallaxImages = document.querySelectorAll('.parallax-img img');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        parallaxImages.forEach(img => {
            const speed = 0.15;
            const yPos = -(scrolled * speed);
            img.style.transform = `translateY(${yPos}px)`;
        });
    });
});
