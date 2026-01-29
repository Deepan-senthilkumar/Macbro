// Main JS - Interactions

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Horizontal Services Slider Logic
    const sliderTrack = document.querySelector('.services-track');
    const slidesOriginal = document.querySelectorAll('.service-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (sliderTrack && slidesOriginal.length) {
        // Clone first and last slides for infinite loop
        const firstSlide = slidesOriginal[0];
        const lastSlide = slidesOriginal[slidesOriginal.length - 1];
        const firstClone = firstSlide.cloneNode(true);
        const lastClone = lastSlide.cloneNode(true);

        // Add clones to track
        sliderTrack.appendChild(firstClone);
        sliderTrack.insertBefore(lastClone, firstSlide);

        // Update slides list
        const allSlides = document.querySelectorAll('.service-slide');
        let currentIndex = 1; // Start at real first slide
        let isTransitioning = false;
        let autoScrollInterval;

        // Set initial position
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Create Dots (based on original slides count)
        slidesOriginal.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                if (isTransitioning) return;
                goToSlide(index + 1);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateSlider(withTransition = true) {
            if (withTransition) {
                sliderTrack.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                isTransitioning = true;
            } else {
                sliderTrack.style.transition = 'none';
                isTransitioning = false;
            }

            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Active State (Logical)
            const logicalIndex = getLogicalIndex(currentIndex);

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === logicalIndex);
            });

            // Update visible slide classes (for scales/opacity)
            allSlides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
        }

        function getLogicalIndex(physicalIndex) {
            if (physicalIndex === 0) return slidesOriginal.length - 1;
            if (physicalIndex === allSlides.length - 1) return 0;
            return physicalIndex - 1;
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
            resetAutoScroll();
        }

        function nextSlide() {
            if (isTransitioning) return;
            currentIndex++;
            updateSlider();
        }

        function prevSlide() {
            if (isTransitioning) return;
            currentIndex--;
            updateSlider();
        }

        // Seamless Jump Logic
        sliderTrack.addEventListener('transitionend', () => {
            isTransitioning = false;
            if (currentIndex === allSlides.length - 1) {
                currentIndex = 1;
                updateSlider(false);
            } else if (currentIndex === 0) {
                currentIndex = allSlides.length - 2;
                updateSlider(false);
            }
        });

        function startAutoScroll() {
            autoScrollInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoScroll() {
            clearInterval(autoScrollInterval);
            startAutoScroll();
        }

        // Event Listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoScroll();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoScroll();
            });
        }

        // Pause on Hover
        const sliderContainer = document.querySelector('.services-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
            sliderContainer.addEventListener('mouseleave', startAutoScroll);
        }

        // Initial Start
        startAutoScroll();
    }

    // Header Transparency on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
