// NODO — SAMEEP · interacciones + carga de contenido editable (content.json)
(function () {
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú móvil
  var toggle = document.getElementById('mobileToggle');
  var mobile = document.getElementById('navMobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var open = mobile.classList.toggle('is-open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobile.classList.remove('is-open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Menú "Más" (desktop)
  var navMore = document.getElementById('navMore');
  var navMoreBtn = document.getElementById('navMoreBtn');
  if (navMore && navMoreBtn) {
    navMoreBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = navMore.classList.toggle('open');
      navMoreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!navMore.contains(e.target)) {
        navMore.classList.remove('open');
        navMoreBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Newsletter (prototipo, sin backend)
  var newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function () {
      var btn = newsletterForm.querySelector('.btn-subscribe span');
      if (btn) btn.textContent = '¡Listo! Te vamos a escribir';
    });
  }

  // ===== Filtro de "Áreas de intervención": tabs + buscador (se activa tras renderizar) =====
  function setupWorkFilter() {
    var tabs = document.querySelectorAll('.area-tab');
    var search = document.getElementById('workSearch');
    var cards = document.querySelectorAll('.work-card');
    var empty = document.getElementById('workEmpty');
    var activeArea = 'todos';

    function applyFilter() {
      var term = (search && search.value ? search.value : '').trim().toLowerCase();
      var visibleCount = 0;
      cards.forEach(function (card) {
        var matchesArea = activeArea === 'todos' || card.dataset.area === activeArea;
        var matchesTerm = !term || card.dataset.title.indexOf(term) !== -1;
        var show = matchesArea && matchesTerm;
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });
      if (empty) empty.hidden = visibleCount !== 0;
    }

    function selectArea(area) {
      tabs.forEach(function (t) {
        var isMatch = t.dataset.area === area;
        t.classList.toggle('is-active', isMatch);
        t.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });
      activeArea = area;
      applyFilter();
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { selectArea(tab.dataset.area); });
    });
    if (search) search.addEventListener('input', applyFilter);

    document.querySelectorAll('.area-tile').forEach(function (tile) {
      tile.addEventListener('click', function () { selectArea(tile.dataset.goto); });
    });
  }

  // ===== Carga de contenido editable =====
  function setText(id, text) {
    var el = document.getElementById(id);
    if (el && typeof text === 'string') el.textContent = text;
  }
  function setPlaceholder(id, text) {
    var el = document.getElementById(id);
    if (el && typeof text === 'string') el.setAttribute('placeholder', text);
  }

  function renderContent(data) {
    // Hero
    if (data.hero) {
      var h = data.hero;
      setText('c-hero-eyebrow', h.eyebrow);
      setText('c-hero-title1', h.title_line1);
      setText('c-hero-title2', h.title_line2);
      setText('c-hero-text', h.text);
      setText('c-hero-cta1', h.cta_primary_text);
      setText('c-hero-cta2', h.cta_secondary_text);
      if (h.background_image) {
        var bg = document.getElementById('c-hero-bg');
        if (bg) bg.style.backgroundImage = "url('" + h.background_image + "')";
      }
      if (Array.isArray(h.stats)) {
        var statsEl = document.getElementById('c-hero-stats');
        if (statsEl) {
          statsEl.innerHTML = h.stats.map(function (s) {
            return '<div class="stat"><span class="stat-num">' + escapeHtml(s.num) +
              '</span><span class="stat-label">' + escapeHtml(s.label) + '</span></div>';
          }).join('');
        }
      }
    }

    // Herramientas + áreas
    if (data.herramientas) {
      var t = data.herramientas;
      setText('c-tools-eyebrow', t.eyebrow);
      setText('c-tools-title', t.title);
      setText('c-tools-text', t.text);
      if (Array.isArray(t.tools)) {
        var toolsGrid = document.getElementById('c-tools-grid');
        if (toolsGrid) {
          toolsGrid.innerHTML = t.tools.map(function (tool) {
            var statusClass = tool.status_live ? 'is-live' : 'is-soon';
            return '<div class="service-card">' +
              '<div class="service-icon"><i class="ti ti-' + escapeHtml(tool.icon) + '"></i></div>' +
              '<h3>' + escapeHtml(tool.title) + '</h3>' +
              '<p>' + escapeHtml(tool.text) + '</p>' +
              '<span class="tool-status ' + statusClass + '"><i class="ti ti-point-filled"></i> ' + escapeHtml(tool.status) + '</span>' +
              '<a href="#" class="btn-service"><u>Ver</u> más <i class="ti ti-arrow-right"></i></a>' +
              '</div>';
          }).join('');
        }
      }
      setText('c-areas-label', t.areas_label);
      if (Array.isArray(t.areas)) {
        var areasGrid = document.getElementById('c-areas-grid');
        if (areasGrid) {
          areasGrid.innerHTML = t.areas.map(function (area) {
            return '<a href="#trabajo" class="area-tile" data-goto="' + escapeHtml(area.goto) + '">' +
              '<div class="area-tile-icon"><i class="ti ti-' + escapeHtml(area.icon) + '"></i></div>' +
              '<span>' + escapeHtml(area.title) + '</span></a>';
          }).join('');
        }
      }
    }

    // Sobre + novedades
    if (data.sobre) {
      setText('c-about-title', data.sobre.title);
      setText('c-about-text', data.sobre.text);
      setText('c-about-cta-pre', data.sobre.cta_pre_text);
      setText('c-about-cta-link', data.sobre.cta_link_text);
      setText('c-about-explore', data.sobre.explore_text);
    }
    if (data.novedades) {
      setText('c-news-title', data.novedades.title);
      setText('c-news-seeall', data.novedades.see_all_text);
      if (Array.isArray(data.novedades.items)) {
        var newsList = document.getElementById('c-news-list');
        if (newsList) {
          newsList.innerHTML = data.novedades.items.map(function (item) {
            return '<li class="news-item"><a href="#">' + escapeHtml(item) + '</a></li>';
          }).join('');
        }
      }
    }

    // Objetivos
    if (data.objetivos) {
      var o = data.objetivos;
      setText('c-obj-eyebrow', o.eyebrow);
      setText('c-obj-title', o.title);
      setText('c-obj-text', o.text);
      if (Array.isArray(o.items)) {
        var objGrid = document.getElementById('c-obj-grid');
        if (objGrid) {
          objGrid.innerHTML = o.items.map(function (item) {
            return '<div class="objetivo-card">' +
              '<div class="objetivo-icon"><i class="ti ti-' + escapeHtml(item.icon) + '"></i></div>' +
              '<h3>' + escapeHtml(item.title) + '</h3>' +
              '<p>' + escapeHtml(item.text) + '</p></div>';
          }).join('');
        }
      }
    }

    // Trabajo / proyectos
    if (data.trabajo) {
      var w = data.trabajo;
      setText('c-trabajo-eyebrow', w.eyebrow);
      setText('c-trabajo-title', w.title);
      setText('c-trabajo-text', w.text);
      setPlaceholder('workSearch', w.search_placeholder);
      setText('workEmpty', w.empty_text);
      if (Array.isArray(w.cards)) {
        var workGrid = document.getElementById('workGrid');
        if (workGrid) {
          workGrid.innerHTML = w.cards.map(function (card) {
            var searchTitle = (card.title + ' ' + card.eyebrow + ' ' + card.text + ' ' + (card.estado || '')).toLowerCase();
            var estadoClass = card.estado === 'Finalizado' ? 'is-done' : card.estado === 'En proceso' ? 'is-progress' : 'is-pending';
            var estadoBadge = card.estado ?
              '<span class="work-status ' + estadoClass + '"><i class="ti ti-point-filled"></i> ' + escapeHtml(card.estado) +
              (card.progreso ? ' · ' + escapeHtml(String(card.progreso)) + '%' : '') + '</span>' : '';
            var progressBar = card.progreso ?
              '<div class="work-progress"><div class="work-progress-fill" style="width:' + Math.min(100, card.progreso) + '%"></div></div>' : '';
            return '<article class="work-card" data-area="' + escapeHtml(card.area) + '" data-title="' + escapeHtml(searchTitle) + '">' +
              '<div class="work-img ' + escapeHtml(card.img_class) + '"><i class="ti ti-' + escapeHtml(card.icon) + '"></i></div>' +
              '<div class="work-body">' +
              '<span class="work-eyebrow">' + escapeHtml(card.eyebrow) + '</span>' +
              '<h3>' + escapeHtml(card.title) + '</h3>' +
              '<p>' + escapeHtml(card.text) + '</p>' +
              estadoBadge + progressBar +
              '<a href="#" class="btn-service"><u>Ver</u> más <i class="ti ti-arrow-right"></i></a>' +
              '</div></article>';
          }).join('');
        }
      }
    }

    // Participación + newsletter
    if (data.participacion) {
      var p = data.participacion;
      setText('c-part-title', p.title);
      setText('c-part-text', p.text);
      setText('c-newsletter-title', p.newsletter_title);
      setText('c-newsletter-subtitle', p.newsletter_subtitle);
      setPlaceholder('c-newsletter-placeholder', p.newsletter_placeholder);
      setText('c-newsletter-button', p.newsletter_button);
    }

    // Footer
    if (data.footer) {
      setText('c-footer-address', data.footer.address);
      setText('c-footer-email', data.footer.email);
      var emailLink = document.getElementById('c-footer-email');
      if (emailLink && data.footer.email) emailLink.setAttribute('href', 'mailto:' + data.footer.email);
    }
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  fetch('content.json', { cache: 'no-store' })
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (data) {
      if (data) renderContent(data);
    })
    .catch(function () {
      // Si falla la carga, el HTML ya trae el contenido de respaldo tal cual.
    })
    .finally(function () {
      setupWorkFilter();
    });
})();
