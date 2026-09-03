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
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  });

  // ----- FAQ ACCORDION -----
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq__item.active').forEach(active => active.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // ----- INCLUDED ACCORDION -----
  document.querySelectorAll('.included__card-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.included__card');
      const isActive = card.classList.contains('active');
      card.classList.toggle('active', !isActive);
      btn.setAttribute('aria-expanded', !isActive ? 'true' : 'false');
    });
  });

  // ----- FADE-UP ON SCROLL -----
  const fadeElements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 });
  fadeElements.forEach(el => observer.observe(el));

  // ----- STICKER PREVIEW HOTSPOTS -----
  document.querySelectorAll('.preview__hotspot').forEach(hotspot => {
    hotspot.addEventListener('mouseenter', function() {
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
      this.classList.remove('error');
      const msg = this.parentElement?.querySelector('.hero__error-msg');
      if (msg) msg.classList.remove('show');
    });
  }

  // ============================================
  // HERO TABS
  // ============================================
  const tabsNav = document.querySelector('.hero__tabs-nav');
  if (tabsNav) {
    tabsNav.addEventListener('click', (e) => {
      const tab = e.target.closest('.hero__tab');
      if (!tab) return;
      const target = tab.dataset.tab;

      tabsNav.querySelectorAll('.hero__tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('.hero__tab-panel').forEach(p => p.classList.remove('active'));
      document.querySelector(`.hero__tab-panel[data-panel="${target}"]`)?.classList.add('active');
    });
  }

  // ============================================
  // PLATE TAB - Validation
  // ============================================
  const plateInput = document.getElementById('plateInput');
  const plateState = document.getElementById('plateState');
  const plateBtn = document.getElementById('plateBtn');

  if (plateBtn) {
    plateBtn.addEventListener('click', () => {
      let valid = true;

      if (!plateInput.value.trim()) {
        plateInput.classList.add('error');
        valid = false;
      } else {
        plateInput.classList.remove('error');
      }

      if (!plateState.value) {
        plateState.classList.add('error');
        valid = false;
      } else {
        plateState.classList.remove('error');
      }

      if (!valid) return;

      plateBtn.textContent = 'Processing...';
      plateBtn.disabled = true;
      setTimeout(() => {
        plateBtn.textContent = 'Get Window Sticker';
        plateBtn.disabled = false;
        document.getElementById('included')?.scrollIntoView({ behavior: 'smooth' });
      }, 1500);
    });

    plateInput?.addEventListener('input', () => {
      plateInput.classList.remove('error');
    });
    plateState?.addEventListener('change', () => {
      plateState.classList.remove('error');
    });
  }

  // ============================================
  // YMM TAB - Cascading Dropdowns & Validation
  // ============================================
  const ymmYear = document.getElementById('ymmYear');
  const ymmMake = document.getElementById('ymmMake');
  const ymmModel = document.getElementById('ymmModel');
  const ymmEmail = document.getElementById('ymmEmail');
  const ymmPhone = document.getElementById('ymmPhone');
  const ymmBtn = document.getElementById('ymmBtn');

  // Honda model data by year
  const hondaModels = {
    2025: ['Accord', 'Civic', 'CR-V', 'CR-V Hybrid', 'HR-V', 'Odyssey', 'Pilot', 'Prologue', 'Ridgeline', 'ZR-V'],
    2024: ['Accord', 'Accord Hybrid', 'Civic', 'Civic Hybrid', 'Civic Type R', 'CR-V', 'CR-V Hybrid', 'HR-V', 'Insight', 'Odyssey', 'Pilot', 'Prologue', 'Ridgeline', 'ZR-V'],
    2023: ['Accord', 'Accord Hybrid', 'Civic', 'Civic Hatchback', 'Civic Type R', 'CR-V', 'CR-V Hybrid', 'HR-V', 'Insight', 'Odyssey', 'Pilot', 'Ridgeline'],
    2022: ['Accord', 'Accord Hybrid', 'Civic', 'Civic Hatchback', 'Civic Type R', 'CR-V', 'CR-V Hybrid', 'HR-V', 'Insight', 'Odyssey', 'Pilot', 'Ridgeline'],
    2021: ['Accord', 'Accord Hybrid', 'Civic', 'Civic Hatchback', 'Civic Type R', 'CR-V', 'CR-V Hybrid', 'HR-V', 'Insight', 'Odyssey', 'Pilot', 'Ridgeline'],
    2020: ['Accord', 'Accord Hybrid', 'Civic', 'Civic Hatchback', 'Civic Type R', 'CR-V', 'CR-V Hybrid', 'HR-V', 'Insight', 'Odyssey', 'Pilot', 'Ridgeline'],
    2019: ['Accord', 'Accord Hybrid', 'Civic', 'Civic Hatchback', 'Civic Type R', 'CR-V', 'CR-V Hybrid', 'HR-V', 'Insight', 'Odyssey', 'Pilot', 'Ridgeline'],
    2018: ['Accord', 'Civic', 'Civic Hatchback', 'Civic Type R', 'Clarity', 'CR-V', 'HR-V', 'Odyssey', 'Pilot', 'Ridgeline'],
    2017: ['Accord', 'Civic', 'Civic Hatchback', 'Civic Type R', 'Clarity', 'CR-V', 'HR-V', 'Odyssey', 'Pilot', 'Ridgeline'],
    2016: ['Accord', 'Civic', 'CR-V', 'HR-V', 'Odyssey', 'Pilot', 'Ridgeline'],
    2015: ['Accord', 'Civic', 'CR-V', 'CR-Z', 'Fit', 'HR-V', 'Odyssey', 'Pilot', 'Ridgeline'],
    2014: ['Accord', 'Civic', 'CR-V', 'CR-Z', 'Fit', 'Odyssey', 'Pilot', 'Ridgeline'],
    2013: ['Accord', 'Civic', 'CR-V', 'CR-Z', 'Fit', 'Odyssey', 'Pilot', 'Ridgeline'],
    2012: ['Accord', 'Civic', 'CR-V', 'CR-Z', 'Fit', 'Odyssey', 'Pilot', 'Ridgeline'],
    2011: ['Accord', 'Civic', 'CR-V', 'CR-Z', 'Fit', 'Insight', 'Odyssey', 'Pilot', 'Ridgeline'],
    2010: ['Accord', 'Civic', 'CR-V', 'CR-Z', 'Fit', 'Insight', 'Odyssey', 'Pilot', 'Ridgeline'],
    2009: ['Accord', 'Civic', 'CR-V', 'Fit', 'Insight', 'Odyssey', 'Pilot', 'Ridgeline'],
    2008: ['Accord', 'Civic', 'CR-V', 'Fit', 'Odyssey', 'Pilot', 'Ridgeline'],
    2007: ['Accord', 'Civic', 'CR-V', 'Element', 'Fit', 'Odyssey', 'Pilot', 'Ridgeline'],
    2006: ['Accord', 'Civic', 'CR-V', 'Element', 'Fit', 'Odyssey', 'Pilot', 'Ridgeline'],
    2005: ['Accord', 'Civic', 'CR-V', 'Element', 'Odyssey', 'Pilot', 'Ridgeline'],
    2004: ['Accord', 'Civic', 'CR-V', 'Element', 'Odyssey', 'Pilot'],
    2003: ['Accord', 'Civic', 'CR-V', 'Element', 'Odyssey', 'Pilot'],
    2002: ['Accord', 'Civic', 'CR-V', 'Odyssey', 'Pilot', 'S2000'],
    2001: ['Accord', 'Civic', 'CR-V', 'Odyssey', 'Pilot', 'S2000'],
    2000: ['Accord', 'Civic', 'CR-V', 'Odyssey', 'Pilot', 'S2000']
  };

  // Year -> Make (Honda)
  if (ymmYear) {
    ymmYear.addEventListener('change', () => {
      ymmMake.innerHTML = '<option value="">Select Make</option>';
      ymmModel.innerHTML = '<option value="">Select Model</option>';
      ymmModel.disabled = true;

      if (ymmYear.value) {
        const opt = document.createElement('option');
        opt.value = 'Honda';
        opt.textContent = 'Honda';
        ymmMake.appendChild(opt);
        ymmMake.value = 'Honda';
        ymmMake.disabled = false;
      } else {
        ymmMake.disabled = true;
      }

      ymmYear.classList.remove('error');
    });
  }

  // Make -> Model
  if (ymmMake) {
    ymmMake.addEventListener('change', () => {
      ymmModel.innerHTML = '<option value="">Select Model</option>';

      if (ymmMake.value && ymmYear.value && hondaModels[ymmYear.value]) {
        hondaModels[ymmYear.value].forEach(model => {
          const opt = document.createElement('option');
          opt.value = model;
          opt.textContent = model;
          ymmModel.appendChild(opt);
        });
        ymmModel.disabled = false;
      } else {
        ymmModel.disabled = true;
      }

      ymmMake.classList.remove('error');
    });
  }

  if (ymmModel) {
    ymmModel.addEventListener('change', () => {
      ymmModel.classList.remove('error');
    });
  }

  // Email validation
  if (ymmEmail) {
    ymmEmail.addEventListener('input', () => {
      ymmEmail.classList.remove('error');
    });
  }

  // Phone: digits only, max 10
  if (ymmPhone) {
    ymmPhone.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').slice(0, 10);
      this.classList.remove('error');
    });
  }

  // YMM submit
  if (ymmBtn) {
    ymmBtn.addEventListener('click', () => {
      let valid = true;

      if (!ymmYear.value) {
        ymmYear.classList.add('error');
        valid = false;
      }
      if (!ymmMake.value || ymmMake.disabled) {
        ymmMake.classList.add('error');
        valid = false;
      }
      if (!ymmModel.value || ymmModel.disabled) {
        ymmModel.classList.add('error');
        valid = false;
      }

      // Email validation
      const emailVal = ymmEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        ymmEmail.classList.add('error');
        valid = false;
      }

      // Phone validation
      const phoneVal = ymmPhone.value.trim();
      if (!phoneVal || phoneVal.length < 10) {
        ymmPhone.classList.add('error');
        valid = false;
      }

      if (!valid) return;

      ymmBtn.textContent = 'Processing...';
      ymmBtn.disabled = true;
      setTimeout(() => {
        ymmBtn.textContent = 'Get Window Sticker';
        ymmBtn.disabled = false;
        document.getElementById('included')?.scrollIntoView({ behavior: 'smooth' });
      }, 1500);
    });
  }

  // ============================================
  // VIN TAB - Search Button Handler
  // ============================================
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn && vinInput) {
    const doVinSearch = () => {
      const vin = vinInput.value.trim();
      if (vin.length < 17) {
        vinInput.classList.add('error');
        vinInput.focus();
        return;
      }
      searchBtn.textContent = 'Processing...';
      searchBtn.disabled = true;
      setTimeout(() => {
        searchBtn.textContent = 'Get Window Sticker';
        searchBtn.disabled = false;
        document.getElementById('included')?.scrollIntoView({ behavior: 'smooth' });
      }, 1500);
    };
    searchBtn.addEventListener('click', doVinSearch);
    vinInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doVinSearch(); });
  }

  // ============================================
  // CTA SECTION - Search Handler
  // ============================================
  document.querySelectorAll('.cta__search .cta__input').forEach(input => {
    input.addEventListener('input', function() {
      this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 17);
    });
  });
  const ctaBtn = document.querySelector('.cta__btn');
  const ctaInput = document.querySelector('.cta__input');
  if (ctaBtn && ctaInput) {
    const doCtaSearch = () => {
      const vin = ctaInput.value.trim();
      if (vin.length < 17) {
        ctaInput.classList.add('error');
        ctaInput.focus();
        setTimeout(() => ctaInput.classList.remove('error'), 2000);
        return;
      }
      ctaBtn.textContent = 'Processing...';
      ctaBtn.disabled = true;
      setTimeout(() => {
        ctaBtn.textContent = 'Get Window Sticker';
        ctaBtn.disabled = false;
      }, 1500);
    };
    ctaBtn.addEventListener('click', doCtaSearch);
    ctaInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doCtaSearch(); });
  }

  // ============================================
  // SAMPLE STICKER SCROLL
  // ============================================
  document.querySelectorAll('.hero__sample').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('what')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ============================================
  // SMOOTH ANCHOR SCROLL
  // ============================================
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
