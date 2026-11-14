(function () {
  const paths = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    externalLink: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>',
    home: '<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
    ticket: '<path d="M3 7a2 2 0 0 0 0 4v2a2 2 0 0 0 0 4h18a2 2 0 0 0 0-4v-2a2 2 0 0 0 0-4H3Z"/><path d="M13 7v2m0 3v2m0 3v1"/>',
    wallet: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v16H6a3 3 0 0 1-3-3V6.5Z"/><path d="M3 8h17m-4 5h4"/>',
    claim: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8m-8 4h5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    dashboard: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-13 4h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/>',
    shieldCheck: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    shieldPlus: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="M12 8v8m-4-4h8"/>',
    fileSearch: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6"/><path d="M14 2v6h6M8 13h5"/><circle cx="17" cy="17" r="3"/><path d="m19.2 19.2 2 2"/>',
    fileCheck: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6m-12 5 2 2 4-4"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8m-8 4h8"/>',
    alertTriangle: '<path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
    building: '<path d="M3 21h18M5 21V5l7-2v18M12 9h7v12"/><path d="M8 7h1m-1 4h1m-1 4h1m8-3h1m-1 4h1"/>',
    languages: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.4-3"/>',
    repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    arrowLeft: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    network: '<circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="m7 11 10-5M7 13l10 5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
    zap: '<path d="m13 2-3 9h7l-6 11 1-9H5l8-11Z"/>',
    chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/><path d="M19 14V9h-5"/>',
    location: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    creditCard: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20m-15 5h4"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5m5-5v12"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
    xCircle: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    infoCircle: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  };

  const navIcons = {
    overview: 'home',
    events: 'search',
    booking: 'ticket',
    wallet: 'wallet',
    incident: 'claim',
    account: 'user',
    organizer: 'building',
    insurer: 'shieldCheck',
  };

  function iconMarkup(name, directional = false, extraClass = '') {
    const pathsForIcon = paths[name];
    if (!pathsForIcon) {
      console.error(`Unmapped HIMA icon: ${name}`);
      return '';
    }
    const classes = ['hima-icon', directional ? 'hima-icon--directional' : '', extraClass]
      .filter(Boolean)
      .join(' ');
    return `<svg class="${classes}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${pathsForIcon}</svg>`;
  }

  function find(root, selector) {
    const matches = [];
    if (root instanceof Element && root.matches(selector)) matches.push(root);
    if (root.querySelectorAll) matches.push(...root.querySelectorAll(selector));
    return matches;
  }

  function hydrate(root = document) {
    find(root, '[data-hima-icon]').forEach((element) => {
      const name = element.dataset.himaIcon;
      const direction = element.dataset.himaDirectional === 'true';
      const renderedAs = `${name}:${direction}`;
      if (element.dataset.himaIconRendered === renderedAs) return;
      const markup = iconMarkup(name, direction);
      if (!markup) return;
      element.innerHTML = markup;
      element.dataset.himaIconRendered = renderedAs;
    });

    find(root, '.nav-icon').forEach((element) => {
      const page = element.closest('.nav button')?.dataset.page;
      const name = navIcons[page] || 'dashboard';
      if (element.dataset.himaIconRendered === name) return;
      element.innerHTML = iconMarkup(name);
      element.dataset.himaIconRendered = name;
    });

    const roleActions = ['customerRoleAction', 'organizerRoleAction', 'insurerRoleAction'];
    roleActions.forEach((id) => {
      const action = document.getElementById(id);
      if (!action || (root !== document && root !== action && !root.contains?.(action))) return;
      if (action.querySelector('[data-hima-icon="arrowLeft"]')) return;
      const arrow = document.createElement('b');
      arrow.dataset.himaIcon = 'arrowLeft';
      arrow.dataset.himaDirectional = 'true';
      arrow.setAttribute('aria-hidden', 'true');
      action.append(arrow);
      hydrate(arrow);
    });

    find(root, '.pill.green, .pill.amber, .pill.red').forEach((badge) => {
      if (badge.querySelector(':scope > .hima-status-icon')) return;
      const text = badge.textContent.trim();
      const name = badge.classList.contains('green')
        ? /شهادة|policy|certificate/i.test(text) ? 'shieldCheck' : 'checkCircle'
        : badge.classList.contains('red')
          ? 'xCircle'
          : /بيانات افتراضية|demo|illustrative/i.test(text)
            ? 'infoCircle'
            : /مراجعة|قيد|pending|review/i.test(text)
              ? 'clock'
              : 'infoCircle';
      const statusIcon = document.createElement('span');
      statusIcon.className = 'hima-status-icon';
      statusIcon.setAttribute('aria-hidden', 'true');
      statusIcon.innerHTML = iconMarkup(name, false, 'hima-status-icon-svg');
      badge.prepend(statusIcon);
    });

    find(root, '.notice.warn, .notice.good, .notice.success').forEach((notice) => {
      if ([...notice.children].some((child) => child.classList.contains('hima-notice-icon'))) return;
      const name = notice.classList.contains('warn') ? 'alertTriangle' : 'checkCircle';
      const noticeIcon = document.createElement('span');
      noticeIcon.className = 'hima-notice-icon';
      noticeIcon.setAttribute('aria-hidden', 'true');
      noticeIcon.innerHTML = iconMarkup(name);
      notice.prepend(noticeIcon);
    });
  }

  hydrate();
  const observer = new MutationObserver((records) => {
    const roots = new Set();
    records.forEach((record) => {
      if (record.target instanceof Element) roots.add(record.target);
      record.addedNodes.forEach((node) => {
        if (node instanceof Element) roots.add(node);
      });
    });
    roots.forEach((root) => hydrate(root));
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });
})();
