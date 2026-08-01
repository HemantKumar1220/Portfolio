document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Terminal boot-sequence typing effect
  const terminalBody = document.getElementById('terminalBody');
  if (!terminalBody) return;

  const lines = [
    { prompt: '$ who am i ?', output: 'Hemant Kumar — BCA student, BSA College of Engineering & Technology' },
    { prompt: '$ status', output: 'Learning Python, web development, DBMS, and security fundamentals' },
    { prompt: '$ next', output: 'Open to internships and real systems to build (and break)' }
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    lines.forEach(({ prompt, output }) => {
      const p = document.createElement('p');
      p.className = 'terminal-prompt';
      p.textContent = prompt;
      terminalBody.appendChild(p);

      const o = document.createElement('p');
      o.className = 'terminal-output';
      o.textContent = output;
      terminalBody.appendChild(o);
    });
    return;
  }

  let lineIndex = 0;

  function typeText(el, text, callback) {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 26);
  }

  function typeLine() {
    if (lineIndex >= lines.length) return;
    const { prompt, output } = lines[lineIndex];

    const promptEl = document.createElement('p');
    promptEl.className = 'terminal-prompt';
    terminalBody.appendChild(promptEl);

    typeText(promptEl, prompt, () => {
      const outputEl = document.createElement('p');
      outputEl.className = 'terminal-output';
      terminalBody.appendChild(outputEl);

      typeText(outputEl, output, () => {
        lineIndex++;
        setTimeout(typeLine, 350);
      });
    });
  }

  typeLine();
});
