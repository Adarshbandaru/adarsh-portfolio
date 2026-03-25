/* ═══════════════════════════════════════════════════════════════════
   ADARSHOS — DEVELOPER OS × CINEMATIC SCROLL
   macOS folder skills, theme toggle, dot-to-box animations
   ═══════════════════════════════════════════════════════════════════ */
'use strict';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ════════════════════ 1. BOOT ANIMATION ════════════════════ */
const bootScreen = $('#bootScreen');
window.addEventListener('load', () => {
    setTimeout(() => {
        bootScreen.classList.add('hidden');
        animateHero();
    }, 2200);
});

/* ════════════════════ 2. THEME TOGGLE ════════════════════ */
const themeToggle = $('#themeToggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('adarshOS-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('adarshOS-theme', next);
    });
}

/* ════════════════════ 3. DOCK NAVIGATION ════════════════════ */
const dockItems = $$('.dock-item[data-section]');
const sections = $$('.app-section');

dockItems.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(item.dataset.section);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            dockItems.forEach(di => di.classList.toggle('active', di.dataset.section === id));
        }
    });
}, { threshold: 0.35 });

sections.forEach(sec => sectionObserver.observe(sec));

/* ════════════════════ 4. macOS WINDOW LAUNCH (dot ↔ box) ════════════════════ */
/* Windows open when scrolling into view, close back to dot when scrolling away */
const windowObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

$$('.app-window[data-reveal]').forEach(w => windowObserver.observe(w));

/* ════════════════════ 5. HERO ANIMATION ════════════════════ */
function animateHero() {
    const heroEl = $('.hero-desktop');
    if (!heroEl) return;
    heroEl.style.opacity = '0';
    heroEl.style.transform = 'translateY(30px)';
    setTimeout(() => {
        heroEl.style.transition = 'opacity .8s ease, transform .8s ease';
        heroEl.style.opacity = '1';
        heroEl.style.transform = 'translateY(0)';
    }, 100);
}

/* ════════════════════ 6. TYPING EFFECT ════════════════════ */
const roles = [
    'AI & ML Enthusiast',
    'Full Stack Developer',
    'Problem Solver',
    'Open Source Learner',
    'Hackathon Participant',
];
const typedEl = $('#typedRole');
if (typedEl) {
    let roleIdx = 0, charIdx = 0, deleting = false;
    function typeRole() {
        const current = roles[roleIdx];
        const display = deleting ? current.slice(0, charIdx - 1) : current.slice(0, charIdx + 1);
        typedEl.textContent = display;
        charIdx = deleting ? charIdx - 1 : charIdx + 1;
        let speed = deleting ? 40 : 80;
        if (!deleting && charIdx === current.length + 1) { speed = 2000; deleting = true; }
        else if (deleting && charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; speed = 400; }
        setTimeout(typeRole, speed);
    }
    setTimeout(typeRole, 2800);
}

/* ════════════════════ 7. STAT COUNTER ════════════════════ */
function countUp(el, target, suffix = '') {
    let startTime = performance.now();
    const duration = 1200;
    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            $$('.about-stat-num').forEach(el => {
                const val = parseInt(el.dataset.count);
                countUp(el, val, val >= 10 ? '+' : '');
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.4 });
const statsGrid = $('.about-stats');
if (statsGrid) statsObserver.observe(statsGrid);

/* ════════════════════ 8. macOS FOLDER SKILLS ════════════════════ */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (typeof closeCertModal === 'function') closeCertModal();
    }
});

/* ════════════════════ 9. CONTACT FORM (Web3Forms) ════════════════════ */
// ⚠️ REPLACE THIS with your real Web3Forms access key from https://web3forms.com
const WEB3FORMS_KEY = '117c14d4-ed6a-441e-aca9-3f222aba6ab1';

const contactForm = $('#contactForm');
const submitBtn = $('#submitBtn');
const formSuccess = $('#formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Executing...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            formData.append('access_key', WEB3FORMS_KEY);
            formData.append('from_name', 'AdarshOS Portfolio');
            formData.append('subject', formData.get('subject') || 'New Portfolio Message');

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #38bdf8)';
                formSuccess.classList.add('show');
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (err) {
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed!';
            submitBtn.style.background = 'linear-gradient(135deg, #f43f5e, #ff6b35)';
            showToast('❌ Could not send message. Please try again.', 'info');
            console.error('Contact form error:', err);
        }

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ./send_message.sh';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            formSuccess.classList.remove('show');
        }, 4000);
    });
}

/* ════════════════════ 10. RESUME DOWNLOAD ════════════════════ */
const resumeBtn = $('#resumeBtn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', e => {
        fetch(resumeBtn.href, { method: 'HEAD' })
            .then(res => { if (!res.ok) { e.preventDefault(); showToast('📄 Resume will be available soon!', 'info'); } })
            .catch(() => { e.preventDefault(); showToast('📄 Resume will be available soon!', 'info'); });
    });
}

/* ════════════════════ 11. TOAST ════════════════════ */
function showToast(msg, type = 'info') {
    const old = $('#os-toast');
    if (old) old.remove();
    const t = document.createElement('div');
    t.id = 'os-toast';
    const colors = {
        info: { bg: 'rgba(255,107,53,.1)', border: 'rgba(255,107,53,.25)', color: 'var(--coral)' },
        success: { bg: 'rgba(16,185,129,.1)', border: 'rgba(16,185,129,.25)', color: 'var(--emerald)' },
    };
    const c = colors[type] || colors.info;
    Object.assign(t.style, {
        position: 'fixed', bottom: '100px', right: '24px',
        padding: '12px 20px', borderRadius: '12px',
        background: c.bg, border: `1px solid ${c.border}`, color: c.color,
        fontFamily: "'JetBrains Mono', monospace", fontSize: '.82rem', fontWeight: '500',
        backdropFilter: 'blur(12px)', zIndex: '9999',
        opacity: '0', transform: 'translateY(16px)',
        transition: 'all .3s ease', maxWidth: '320px',
        boxShadow: '0 8px 30px rgba(0,0,0,.15)',
    });
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateY(0)'; });
    setTimeout(() => {
        t.style.opacity = '0'; t.style.transform = 'translateY(16px)';
        setTimeout(() => t.remove(), 300);
    }, 3500);
}

/* ════════════════════ 12. CERTIFICATE MODAL ════════════════════ */
window.openCertModal = function (src) {
    const modal = $('#certModal');
    const img = $('#certModalImg');
    const pdf = $('#certModalPdf');
    
    if (modal) {
        if (src.toLowerCase().endsWith('.pdf')) {
            if (pdf) {
                pdf.src = src;
                pdf.style.display = 'block';
            }
            if (img) img.style.display = 'none';
        } else {
            if (img) {
                img.src = src;
                img.style.display = 'block';
            }
            if (pdf) pdf.style.display = 'none';
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};
window.closeCertModal = function () {
    const modal = $('#certModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            const img = $('#certModalImg');
            const pdf = $('#certModalPdf');
            if (img) { img.src = ''; img.style.display = 'none'; }
            if (pdf) { pdf.src = ''; pdf.style.display = 'none'; }
        }, 300);
    }
};
document.addEventListener('click', e => {
    const modal = $('#certModal');
    if (modal && modal.classList.contains('active') && e.target === modal) closeCertModal();
});

/* ════════════════════ 13. SMOOTH SCROLL ════════════════════ */
$$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

/* ════════════════════ 14. DOCK MAGNIFY ════════════════════ */
const dock = $('#osDock');
if (dock) {
    const items = dock.querySelectorAll('.dock-item');
    dock.addEventListener('mousemove', e => {
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const dist = Math.abs(e.clientX - cx);
            const scale = Math.max(1, 1.3 - dist / 150);
            const lift = Math.max(0, 10 - dist / 15);
            item.style.transform = `translateY(-${lift}px) scale(${scale})`;
        });
    });
    dock.addEventListener('mouseleave', () => {
        items.forEach(item => { item.style.transform = ''; });
    });
}

/* ════════════════════ DONE ════════════════════ */
console.log('%c✨ AdarshOS v2.0', 'font-size:1.2rem;font-weight:bold;color:#ff6b35;');
console.log('%cBuilt by Bandaru Adarsh', 'color:#9b95a8;');
