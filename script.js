(function () {
  'use strict';

  var root = document.documentElement;
  var themeToggle = document.querySelector('[data-theme-toggle]');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var mobileNav = document.querySelector('[data-mobile-nav]');
  var header = document.querySelector('[data-header]');
  var main = document.querySelector('main');
  var footer = document.querySelector('footer');

  function applyTheme(theme, persist) {
    root.dataset.theme = theme;
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.dataset.tooltip = theme === 'dark' ? 'Light mode' : 'Dark mode';
    themeMeta.setAttribute('content', theme === 'dark' ? '#111512' : '#f4f6f2');
    if (persist) {
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {
        // Theme still works for this page view when storage is unavailable.
      }
    }
  }

  applyTheme(root.dataset.theme || 'light', false);

  themeToggle.addEventListener('click', function () {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });

  function setMenu(open, restoreFocus) {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuToggle.dataset.tooltip = open ? 'Close menu' : 'Menu';
    mobileNav.setAttribute('aria-hidden', String(!open));
    mobileNav.inert = !open;
    main.inert = open;
    footer.inert = open;
    mobileNav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);

    if (open) {
      window.requestAnimationFrame(function () {
        mobileNav.querySelector('a').focus();
      });
    } else if (restoreFocus !== false && mobileNav.contains(document.activeElement)) {
      menuToggle.focus();
    }
  }

  menuToggle.addEventListener('click', function () {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true', true);
  });

  mobileNav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenu(false, false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false, true);
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 760) setMenu(false, false);
  });

  function updateHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -8px' });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  var sections = Array.from(document.querySelectorAll('main section[id]'));
  var desktopLinks = Array.from(document.querySelectorAll('.desktop-nav a'));
  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        desktopLinks.forEach(function (link) {
          var active = link.getAttribute('href') === '#' + entry.target.id;
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-30% 0px -60%' });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  document.querySelector('[data-year]').textContent = String(new Date().getFullYear());
}());
