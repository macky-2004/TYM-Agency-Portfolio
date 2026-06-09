document.addEventListener('DOMContentLoaded', () => {

  // ----- Navigation Toggle (Mobile) -----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Navbar Background on Scroll -----
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // ----- Set Active Nav Link Based on Current Page -----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navAnchors = document.querySelectorAll('.nav-links a');

  navAnchors.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ----- Scroll Animation with Intersection Observer -----
  const animateElements = document.querySelectorAll('.animate, .animate-left, .animate-right');

  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
  }

  // ----- Counter Animation for Stats -----
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  }

  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          if (target && !el.dataset.animated) {
            el.dataset.animated = 'true';
            animateCounter(el, target);
          }
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statObserver.observe(el));
  }

  const heroStats = document.querySelectorAll('.hero-stat h3 .count');
  if (heroStats.length > 0) {
    const heroStatObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          if (target && !el.dataset.animated) {
            el.dataset.animated = 'true';
            animateCounter(el, target, 1500);
          }
        }
      });
    }, { threshold: 0.5 });

    heroStats.forEach(el => heroStatObserver.observe(el));
  }

  // ----- Smooth Reveal for Service Cards -----
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length > 0) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      cardObserver.observe(card);
    });
  }

  // ----- Parallax effect on hero gradient orbs -----
  const orbs = document.querySelectorAll('.gradient-orb');
  if (orbs.length > 0 && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 5;
        orb.style.transform = `translate(${x / factor}px, ${y / factor}px)`;
      });
    }, { passive: true });
  }

  // ----- Floating Data Core Parallax (3D Perspective) -----
  const heroCore = document.getElementById('hero-core');
  if (heroCore && window.innerWidth > 768) {
    heroCore.addEventListener('mouseenter', () => {
      heroCore.style.transition = 'none';
    });

    heroCore.addEventListener('mousemove', (e) => {
      const rect = heroCore.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / rect.width * 20;
      const y = (e.clientY - centerY) / rect.height * 20;
      heroCore.style.setProperty('--x', x);
      heroCore.style.setProperty('--y', y);
    });

    heroCore.addEventListener('mouseleave', () => {
      heroCore.style.transition = 'transform 0.6s ease';
      heroCore.style.setProperty('--x', 0);
      heroCore.style.setProperty('--y', 0);
      setTimeout(() => {
        heroCore.style.transition = 'none';
      }, 600);
    });
  }

  // ----- Contact Form Handling -----
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Message Sent';
        submitBtn.style.background = 'linear-gradient(135deg, #059669, #047857)';
        contactForm.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ----- Lazy Background Image Loading -----
  document.addEventListener('DOMContentLoaded', () => {
    const bgElements = document.querySelectorAll('[data-bg]');
    bgElements.forEach(el => {
      const url = el.getAttribute('data-bg');
      if (url) {
        const img = new Image();
        img.onload = () => {
          el.style.backgroundImage = `url(${url})`;
        };
        img.src = url;
      }
    });
  });

});
