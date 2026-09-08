document.addEventListener('DOMContentLoaded', () => {
    
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
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
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
                delay += 100;
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
                        const icon = mobileToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 7. Parallax Effect for Hero Background
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollVal = window.scrollY;
            heroBg.style.transform = `translateY(${scrollVal * 0.35}px)`;
        });
    }

    // 8. 1-Click Copy Email to Clipboard
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyBtnLabel = document.getElementById('copyBtnLabel');
    if (copyEmailBtn && copyBtnLabel) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('hello@bimanvil.com').then(() => {
                const originalHtml = copyBtnLabel.innerHTML;
                copyBtnLabel.textContent = 'Copied!';
                copyEmailBtn.style.borderColor = '#10B981';
                copyEmailBtn.style.color = '#10B981';
                setTimeout(() => {
                    copyBtnLabel.innerHTML = originalHtml;
                    copyEmailBtn.style.borderColor = '';
                    copyEmailBtn.style.color = '';
                }, 2000);
            }).catch(err => {
                window.location.href = 'mailto:hello@bimanvil.com';
            });
        });
    }

    // 9. Interactive Blender-Style Exporter Mockup Demo
    const studioFileRows = document.querySelectorAll('.studio-files-panel .file-row');
    const namingInput = document.querySelector('.naming-input-box input');
    const bumpBtn = document.querySelector('.name-bump-btn');
    const sidebarItems = document.querySelectorAll('.studio-sidebar-panel .sidebar-item');

    if (studioFileRows.length > 0 && namingInput) {
        studioFileRows.forEach(row => {
            row.addEventListener('click', () => {
                studioFileRows.forEach(r => r.classList.remove('selected'));
                row.classList.add('selected');
                const nameEl = row.querySelector('.file-name');
                if (nameEl) {
                    const fileName = nameEl.textContent.trim();
                    if (fileName.endsWith('.ifc')) {
                        namingInput.value = fileName;
                    }
                }
            });
        });
    }

    if (bumpBtn && namingInput) {
        bumpBtn.addEventListener('click', () => {
            const currentVal = namingInput.value;
            const versionMatch = currentVal.match(/_v(\d+)/i);
            if (versionMatch) {
                const num = parseInt(versionMatch[1], 10);
                const nextNum = String(num + 1).padStart(versionMatch[1].length, '0');
                namingInput.value = currentVal.replace(versionMatch[0], `_v${nextNum}`);
            } else {
                namingInput.value = currentVal.replace(/\.ifc$/i, '_v02.ifc');
            }
            bumpBtn.textContent = 'Bumped!';
            setTimeout(() => { bumpBtn.textContent = '+1 Bump'; }, 1000);
        });
    }

    if (sidebarItems.length > 0) {
        sidebarItems.forEach(item => {
            item.addEventListener('click', () => {
                sidebarItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }
});

