

// JavaScript Code
document.addEventListener('DOMContentLoaded', function() {
    // تنشيط أشرطة المهارات عند التمرير
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (isElementInViewport(bar)) {
                bar.style.width = width + '%';
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // تفعيل القائمة المتنقلة
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // إغلاق القائمة المتنقلة عند النقر على رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // تفعيل إرسال النموذج
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('شكراً لتواصلك! سنرد على رسالتك في أقرب وقت ممكن.');
        contactForm.reset();
    });
    
    // تفعيل التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تفعيل أشرطة المهارات عند التحميل والتمرير
    window.addEventListener('load', animateSkillBars);
    window.addEventListener('scroll', animateSkillBars);
    
    // إضافة تأثيرات تفاعلية للبطاقات
    const cards = document.querySelectorAll('.skill-category, .education-card, .cert-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // إضافة تأثيرات للرأس عند التمرير
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.opacity = '0.9';
        } else {
            header.style.opacity = '1';
        }
    });
    
    // إضافة فئة active للرابط النشط في القائمة
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function setActiveNavItem() {
        let index = sections.length;
        
        while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
        
        navItems.forEach(item => item.classList.remove('active'));
        if (navItems[index]) {
            navItems[index].classList.add('active');
        }
    }
    
    window.addEventListener('scroll', setActiveNavItem);
    
    // إضافة تأثير الكتابة للنص الرئيسي
    const profileTitle = document.querySelector('.profile-info h1');
    const originalTitle = profileTitle.textContent;
    
    function typeWriter(element, text, i = 0) {
        if (i < text.length) {
            element.textContent = text.substring(0, i+1);
            setTimeout(() => typeWriter(element, text, i+1), 100);
        }
    }
    
    // تفعيل تأثير الكتابة عند تحميل الصفحة
    setTimeout(() => {
        profileTitle.textContent = '';
        typeWriter(profileTitle, originalTitle);
    }, 1000);
    
    // إضافة عداد للإحصائيات
    const statValues = document.querySelectorAll('.stat-value');
    let counted = false;
    
    function animateStats() {
        if (isElementInViewport(document.querySelector('.profile-stats')) && !counted) {
            counted = true;
            
            statValues.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
                    }
                }, 30);
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    
    // إضافة تأثير اهتزاز للرموز عند التمرير عليها
    const icons = document.querySelectorAll('.contact-icon, .social-link');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'shake 0.5s';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // إضافة CSS للاهتزاز
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: rotate(0); }
            25% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
        }
        
        .nav-links a.active {
            color: var(--primary);
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});