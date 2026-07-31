// ============================================
// HONDA WINDOW STICKER - Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ----- HAMBURGER MENU -----
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('.nav__link:not(.nav__link--dropdown)').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // ----- MOBILE MEGA MENU TOGGLE -----
  const servicesToggle = document.getElementById('servicesToggle');
  const navMega = document.getElementById('navMega');
  if (servicesToggle && navMega) {
    servicesToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        navMega.classList.toggle('open');
      }
    });
    navMega.querySelectorAll('.nav__mega-item').forEach(item => {
      item.addEventListener('click', () => {
        navMega.classList.remove('open');
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && !e.target.closest('.nav__dropdown')) {
        navMega.classList.remove('open');
      }
    });
  }

  // ----- NAV SCROLL EFFECT -----
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = currentScroll;
  });

  // ----- FAQ ACCORDION -----
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq__item.active').forEach(active => {
        active.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ----- FADE-UP ON SCROLL -----
  const fadeElements = document.querySelectorAll('.fade-up');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // ----- STICKER PREVIEW HOTSPOTS -----
  document.querySelectorAll('.preview__hotspot').forEach(hotspot => {
    hotspot.addEventListener('mouseenter', function() {
      const label = this.getAttribute('data-label');
      this.querySelector('.preview__pulse').style.animation = 'none';
    });
    hotspot.addEventListener('mouseleave', function() {
      const pulse = this.querySelector('.preview__pulse');
      pulse.style.animation = '';
      void pulse.offsetWidth;
      pulse.style.animation = 'pulse 2s infinite';
    });
  });

  // ----- VIN INPUT: AUTO-UPPERCASE & FILTER -----
  const vinInput = document.getElementById('vinInput');
  if (vinInput) {
    vinInput.addEventListener('input', function() {
      this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 17);
    });
  }

  // ----- SAMPLE STICKER SCROLL -----
  document.querySelector('.hero__sample')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' });
  });

  // ----- CTA INPUT VALIDATION -----
  document.querySelectorAll('.cta__search .cta__input').forEach(input => {
    input.addEventListener('input', function() {
      this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 17);
    });
  });

  // ----- SEARCH BUTTON HANDLER -----
  const handleSearch = (inputSelector, btnSelector) => {
    const input = document.querySelector(inputSelector);
    const btn = document.querySelector(btnSelector);
    if (!input || !btn) return;

    const doSearch = () => {
      const vin = input.value.trim();
      if (vin.length < 17) {
        input.style.borderColor = '#F30415';
        input.focus();
        setTimeout(() => { input.style.borderColor = ''; }, 2000);
        return;
      }
      btn.textContent = 'Processing...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Get Window Sticker';
        btn.disabled = false;
        document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' });
      }, 1500);
    };

    btn.addEventListener('click', doSearch);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });
  };

  handleSearch('#vinInput', '#searchBtn');
  handleSearch('.cta__input', '.cta__btn');

  // ----- SMOOTH ANCHOR SCROLL -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
