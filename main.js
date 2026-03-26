/**
 * Noir Luxe - Main JavaScript
 * 
 * Handles:
 * 1. Theme Toggling (Dark/Light Mode)
 * 2. Scroll-triggered reveal animations
 * 3. Sticky header glassmorphism
 * 4. Parallax Image Effects
 * 5. Interpolated Canvas Image Sequence on Scroll
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Theme Toggle (Dark/Light Mode)
    ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved user preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Add a class to transition all elements smoothly
            htmlElement.classList.add('theme-transitioning');
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Remove the class after transition yields (400ms matches css)
            setTimeout(() => {
                htmlElement.classList.remove('theme-transitioning');
            }, 400);
        });
    }

    /* ==========================================
       2. Accessibility Check
    ========================================== */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ==========================================
       3. Scroll Reveal Animations
    ========================================== */
    const revealItems = document.querySelectorAll('.reveal-item');

    if (!prefersReducedMotion) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = el.getAttribute('data-delay') || 0;
                    
                    // Apply staggered delay natively
                    setTimeout(() => {
                        el.classList.add('active');
                    }, delay * 1000);
                    
                    // Unobserve after animating once
                    observer.unobserve(el);
                }
            });
        }, revealOptions);

        revealItems.forEach(item => revealObserver.observe(item));
    } else {
        // Fallback for reduced motion: show all immediately
        revealItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'none';
            item.classList.add('active');
        });
    }

    /* ==========================================
       4. Sticky Header Behavior
    ========================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true }); 

    /* ==========================================
       5. Parallax Image Effects
    ========================================== */
    if (!prefersReducedMotion) {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed')) || 0.2;
                const rect = el.getBoundingClientRect();
                
                // Only animate parallax if in viewport
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = -(scrollY * speed * 0.5);
                    el.style.transform = `translateY(${yPos}px)`;
                }
            });
        }, { passive: true });
    }

    /* ==========================================
       6. Hero Canvas Scroll Sequence
    ========================================== */
    const canvas = document.getElementById('hero-canvas');
    if (canvas && !prefersReducedMotion) {
        const context = canvas.getContext('2d');
        const frameCount = 80;
        
        // Helper to format frame path strings
        const getFramePath = index => {
            const frameNumber = index.toString().padStart(3, '0');
            return `hero/heroanimations/Chocolate_unwrapping_exploding_202603261317_${frameNumber}.webp`; // Highly compressed WebP chunk
        };
        
        // Preload frames to memory for seamless playback
        const images = [];
        let imagesLoaded = 0;
        
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            images.push(img);
            
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === 1) {
                    canvas.width = images[0].width || 1920;
                    canvas.height = images[0].height || 1080;
                    context.drawImage(images[0], 0, 0);
                }
            };
        }
        
        // Setup DOM nodes required for timeline changes
        const heroSection = document.getElementById('hero-sequence');
        const heroText = document.getElementById('hero-text');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        // Linear Interpolation constraints for smoothing out mouse scroll
        let targetFraction = 0;
        let currentFraction = 0;
        
        // Continously render on the animation timeline
        const renderLoop = () => {
            if (!heroSection) return;

            // Lerp implementation logic: Move `current` fraction towards `target` fraction
            currentFraction += (targetFraction - currentFraction) * 0.1;
            
            const frameIndex = Math.min(
                frameCount - 1,
                Math.max(0, Math.floor(currentFraction * frameCount))
            );
            
            if (images[frameIndex] && images[frameIndex].complete) {
                context.drawImage(images[frameIndex], 0, 0);
            }
            
            if (heroText) {
                const textOpacity = 1 - (currentFraction * 3);
                heroText.style.opacity = Math.max(0, textOpacity);
                heroText.style.transform = `translateY(${currentFraction * 100}px)`;
            }
            
            if (scrollIndicator) {
                const indicatorOpacity = 1 - (currentFraction * 5);
                scrollIndicator.style.opacity = Math.max(0, indicatorOpacity);
            }
            
            // Loop!
            requestAnimationFrame(renderLoop);
        };
        
        // Start engine
        requestAnimationFrame(renderLoop);

        // Update exact target scroll fraction based on the user's position
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const heroTop = heroSection.offsetTop;
            const heroHeight = heroSection.scrollHeight - window.innerHeight;
            
            let rawFraction = (scrollTop - heroTop) / heroHeight;
            targetFraction = Math.max(0, Math.min(1, rawFraction));
        }, { passive: true });
        
    } else if (canvas && prefersReducedMotion) {
        // Fallback for prefers-reduced-motion
        const context = canvas.getContext('2d');
        const staticImg = new Image();
        staticImg.src = `hero/heroanimations/Chocolate_unwrapping_exploding_202603261317_079.webp`;
        staticImg.onload = () => {
            canvas.width = staticImg.width || 1920;
            canvas.height = staticImg.height || 1080;
            context.drawImage(staticImg, 0, 0);
        };
    }

    /* ==========================================
       7. Mobile Hamburger Menu
    ========================================== */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Hamburger icon animation logic
            const lines = mobileBtn.querySelectorAll('.hamburger-line');
            if (mobileMenu.classList.contains('active')) {
                lines[0].style.transform = 'translateY(7px) rotate(45deg)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'translateY(-7px) rotate(-45deg)';
                htmlElement.style.overflow = 'hidden'; // Stop background scrolling
            } else {
                lines.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
                htmlElement.style.overflow = 'auto'; // Re-enable background scrolling
            }
        });

        // Close menu cleanly when navigating via link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileBtn.querySelectorAll('.hamburger-line').forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
                htmlElement.style.overflow = 'auto';
            });
        });
    }

    /* ==========================================
       8. Waitlist Form Submission (Mock API Backend)
    ========================================== */
    const waitlistForm = document.getElementById('waitlist-form');
    const successMsg = document.getElementById('form-success');

    if (waitlistForm && successMsg) {
        waitlistForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Intercept real formpost
            
            // Fade out form and reveal success message smoothly
            waitlistForm.style.transition = "opacity 0.3s ease";
            waitlistForm.style.opacity = '0';
            
            setTimeout(() => {
                waitlistForm.style.display = 'none';
                successMsg.style.display = 'block';
            }, 300);
        });
    }

});
