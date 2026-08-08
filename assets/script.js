(() => {
  const config = window.AKELBA_CONFIG || {};
  const measurementId = String(config.ga4MeasurementId || '').trim().toUpperCase();
  const analyticsEnabled = /^G-[A-Z0-9]+$/.test(measurementId);

  const track = (eventName, parameters = {}) => {
    if (!analyticsEnabled || typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, parameters);
  };

  if (analyticsEnabled) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    const analyticsScript = document.createElement('script');
    analyticsScript.async = true;
    analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(analyticsScript);
  }

  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const setHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  setHeader(); window.addEventListener('scroll', setHeader, {passive:true});
  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.classList.remove('is-open'); nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','メニューを開く');
    document.body.classList.remove('menu-open');
  };
  menuButton?.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    menuButton.classList.toggle('is-open', open); nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    document.body.classList.toggle('menu-open', open);
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const templates = {
    general: {subject:'【AKELBA】お問い合わせ', body:'お名前：\n店舗名・会社名：\nご相談内容：\nご希望の連絡方法・時間帯：\nその他：'},
    diagnosis: {subject:'【AKELBA】無料店舗健康診断のお申し込み', body:'お名前：\n店舗名・会社名：\n店舗の業態：\n店舗規模（席数・スタッフ数など）：\n現在困っていること：\nご希望の連絡方法・時間帯：\nその他：'},
    partnership: {subject:'【AKELBA】提携・取材等のお問い合わせ', body:'お名前：\n会社名・団体名：\nお問い合わせ内容：\nご希望の連絡方法・時間帯：\nその他：'}
  };
  document.querySelectorAll('[data-mail-template]').forEach(link => {
    const key = link.dataset.mailTemplate || 'general'; const t = templates[key] || templates.general;
    link.href = `mailto:${config.email || 'office@akelba.jp'}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.body)}`;
  });
  document.querySelectorAll('[data-instagram-link]').forEach(link => { if(config.instagram) link.href = config.instagram; });
  document.querySelectorAll('[data-form-link]').forEach(link => { if(config.diagnosisForm) link.href = config.diagnosisForm; });

  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target.closest('a') : null;
    if (!target) return;

    const href = target.getAttribute('href') || '';
    const mailType = target.dataset.mailTemplate;
    if (mailType) {
      track('contact_start', {
        contact_method: 'email',
        contact_type: mailType,
        link_text: target.textContent.trim().slice(0, 100)
      });
      return;
    }

    if (target.hasAttribute('data-instagram-link')) {
      track('contact_start', {
        contact_method: 'instagram',
        link_text: target.textContent.trim().slice(0, 100)
      });
      return;
    }

    if (target.hasAttribute('data-form-link')) {
      track('diagnosis_start', {
        contact_method: 'form',
        link_text: target.textContent.trim().slice(0, 100)
      });
      return;
    }

    if (/^(?:\.\/)?(?:diagnosis|contact)\.html(?:[?#].*)?$/.test(href)) {
      track('cta_click', {
        destination: href.split(/[?#]/)[0],
        link_text: target.textContent.trim().slice(0, 100)
      });
    }
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), {threshold:.08, rootMargin:'0px 0px -40px'});
    reveals.forEach(el => observer.observe(el));
  } else { reveals.forEach(el => el.classList.add('is-visible')); }
})();
