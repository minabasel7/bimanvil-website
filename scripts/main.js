document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Inject crisp brand SVG icons for social media links
    const SOCIAL_SVG_ICONS = {
        instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
        facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>',
        x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
        linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>',
        youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
    };
    document.querySelectorAll('.social-link[data-social]').forEach(link => {
        if (link.querySelector('svg')) return;
        const svgMarkup = SOCIAL_SVG_ICONS[link.getAttribute('data-social')];
        if (svgMarkup) {
            link.insertAdjacentHTML('afterbegin', svgMarkup);
        }
    });

    // 1. Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            mobileToggle.innerHTML = isOpen 
                ? '<i data-lucide="x"></i>' 
                : '<i data-lucide="menu"></i>';
            if (window.lucide) {
                lucide.createIcons();
            }
        });
    }

    // 3. Workspace Tabs Switcher
    const wsTabButtons = document.querySelectorAll('.ws-tab-btn');
    const wsPanels = document.querySelectorAll('.ws-panel');

    wsTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            // Toggle Tab Buttons
            wsTabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle Panels
            wsPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetId) {
                    panel.classList.add('active');
                }
            });

            // Re-render any icons inside freshly active panel
            if (window.lucide) {
                lucide.createIcons();
            }
        });
    });

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all others
            faqItems.forEach(other => other.classList.remove('open'));
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // 5. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                delay += 80;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    
    // 6. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileToggle) {
                        mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
                        if (window.lucide) lucide.createIcons();
                    }
                }
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 7. Direct Copy Email to Clipboard
    const copyButtons = document.querySelectorAll('.copy-email-btn, #copyEmailBtn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-email')
                || (document.getElementById('supportEmailText')?.textContent?.trim())
                || 'support@bimanvil.com';
            const labelEl = btn.querySelector('span');
            navigator.clipboard.writeText(email).then(() => {
                if (labelEl) {
                    const originalText = labelEl.textContent;
                    labelEl.textContent = 'Copied!';
                    setTimeout(() => {
                        labelEl.textContent = originalText;
                    }, 2000);
                }
                btn.style.borderColor = 'var(--accent-hover)';
                btn.style.color = 'var(--accent-hover)';
                setTimeout(() => {
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 2000);
            }).catch(() => {
                window.location.href = `mailto:${email}`;
            });
        });
    });
});
