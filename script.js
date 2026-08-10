(() => {
  const sections = document.querySelectorAll('.section-observe');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    sections.forEach((section) => section.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -8% 0px' });
    sections.forEach((section) => observer.observe(section));
  }

  // Flow: the signal progresses through five steps as the board enters the viewport.
  const flowBoard = document.querySelector('[data-flow-board]');
  if (flowBoard) {
    const steps = [...flowBoard.querySelectorAll('.flow-step')];
    const progress = flowBoard.querySelector('.flow-line__progress');

    const updateFlow = () => {
      const rect = flowBoard.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const start = viewportH * 0.72;
      const end = viewportH * 0.28;
      const total = rect.height + (start - end);
      const traveled = start - rect.top;
      const ratio = Math.max(0, Math.min(1, traveled / total));

      progress.style.height = `${Math.round(ratio * 100)}%`;
      steps.forEach((step, index) => {
        const threshold = index / Math.max(1, steps.length - 1) * 0.8 + 0.08;
        step.classList.toggle('is-active', ratio >= threshold);
      });
    };

    updateFlow();
    window.addEventListener('scroll', updateFlow, { passive: true });
    window.addEventListener('resize', updateFlow);
  }

  // Mobile menu.
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      mobileNav.classList.toggle('is-open', !open);
    });
    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
    }));
  }
})();
