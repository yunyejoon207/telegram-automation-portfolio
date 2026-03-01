/* =============================================
   BOT STUDIO — INTERACTIVE SCRIPTS
   ============================================= */

// ---- HEADER SCROLL EFFECT ----
const header = document.getElementById('site-header');
const handleScroll = () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', handleScroll, { passive: true });

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ---- SCROLL ANIMATION (Intersection Observer) ----
const animatedEls = document.querySelectorAll('.fade-in, .fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

animatedEls.forEach(el => observer.observe(el));

// Trigger hero animations immediately
document.querySelectorAll('.hero .fade-in').forEach(el => {
  setTimeout(() => el.classList.add('visible'), 100);
});

// ---- ACTIVE NAV HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--primary)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ---- CONTACT FORM logic removed - Direct Telegram link used instead ----

// ---- SMOOTH SCROLL OFFSET (for fixed header) ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---- COUNTER ANIMATION ----
function animateCounter(el, target, suffix, duration = 1500) {
  const start = performance.now();
  const isDecimal = String(target).includes('.');

  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = isDecimal ? target.toFixed(1) : target;
  };
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseFloat(text.replace(/[^0-9.]/g, ''));
      const suffix = text.replace(/[0-9.]/g, '');
      // Clear and re-render with counter
      const numSpan = document.createElement('span');
      numSpan.textContent = '0';
      el.innerHTML = '';
      el.appendChild(numSpan);
      if (suffix) {
        const suffixSpan = document.createElement('span');
        suffixSpan.className = suffix === '+' ? 'stat-plus' : 'stat-unit';
        suffixSpan.textContent = suffix;
        el.appendChild(suffixSpan);
      }
      animateCounter(numSpan, num, suffix);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));

// ---- PARALLAX GLOW ----
document.addEventListener('mousemove', (e) => {
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');
  if (!glow1 || !glow2) return;

  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  glow1.style.transform = `translate(${x * 30 - 15}px, ${y * 30 - 15}px)`;
  glow2.style.transform = `translate(${-x * 20 + 10}px, ${-y * 20 + 10}px)`;
});
