document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 1. Theme Toggle with Bounce
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        themeBtn.classList.add('bounce');
        setTimeout(() => themeBtn.classList.remove('bounce'), 500);
    });

    // 2. Intersection Observer (Reveal & Skills)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Skill Bar specific logic
                if (entry.target.classList.contains('skill-item')) {
                    const bar = entry.target.querySelector('.skill-bar');
                    const counter = entry.target.querySelector('.counter');
                    const target = entry.target.getAttribute('data-percent');
                    
                    bar.style.width = target + '%';
                    animateCounter(counter, target);
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. Number Counter Logic
    function animateCounter(el, target) {
        let current = 0;
        const interval = setInterval(() => {
            current++;
            el.innerText = current + '%';
            if (current >= target) clearInterval(interval);
        }, 20);
    }

    // 4. WhatsApp Form
    window.sendToWhatsApp = () => {
        const phone = "07039068285"; // Change to your number
        const sub = document.getElementById('wa-subject').value;
        const msg = document.getElementById('wa-message').value;
        const text = encodeURIComponent(`*Subject:* ${sub}\n*Message:* ${msg}`);
        window.open(`https://wa.me/${"+2347039068285"}?text=${text}`, '_blank');
    };
});