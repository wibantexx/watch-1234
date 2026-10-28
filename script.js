/* =============================================
   12:34 — Watch Customizer
   script.js
   ============================================= */

// ── STATE ──────────────────────────────────────
const state = {
  case:     'silver',
  dial:     'ivory',
  strap:    'brown',
  shape:    'round',
  dialFace: 'classic',
};

const BASE_PRICE = 35000;

const PRICES = {
  case:     { silver: 0,    black: 3000, gold: 5000 },
  strap:    { brown: 0,     black: 0,    steel: 4000 },
  dial:     { ivory: 0,     green: 0,    navy: 0     },
  shape:    { round: 0,     cushion: 2000, rectangular: 0 },
  dialFace: { classic: 0,   round: 0,    square: 0   },
};

const LABELS = {
  case:     { silver: 'Серебряный', black: 'Чёрный', gold: 'Золотой' },
  dial:     { ivory: 'Слоновая кость', green: 'Зелёный', navy: 'Тёмно-синий' },
  strap:    { brown: 'Коричневый', black: 'Чёрный', steel: 'Стальной' },
  shape:    { round: 'Круглый', cushion: 'Подушка', rectangular: 'Прямоугольный' },
  dialFace: { classic: 'Классический', round: 'Круглый', square: 'Квадратный' },
};

// ── VISUAL CONFIGS ─────────────────────────────
const CASE_COLORS = {
  silver: {
    body:   '#C0C0C0',
    bezel:  '#B0B0B0',
    crown:  '#B0B0B0',
    shine:  'rgba(255,255,255,0.15)',
  },
  black: {
    body:   '#3A3A3A',
    bezel:  '#282828',
    crown:  '#303030',
    shine:  'rgba(255,255,255,0.08)',
  },
  gold: {
    body:   '#D4A820',
    bezel:  '#C8961A',
    crown:  '#C0900A',
    shine:  'rgba(255,255,255,0.2)',
  },
};

const DIAL_COLORS = {
  ivory: {
    bg:         '#FFFFF0',
    ring:       '#D4C5A0',
    markers:    '#8B7355',
    brand:      '#8B7355',
    sub:        '#B0A080',
    dateWindow: 'white',
    dateBorder: '#C5B090',
    dateText:   '#4A3728',
    hourHand:   '#3A2920',
    minHand:    '#3A2920',
    secHand:    '#C8961A',
    center:     '#3A2920',
    centerDot:  '#C8961A',
  },
  green: {
    bg:         '#2D5A3D',
    ring:       '#4A7A5A',
    markers:    '#A8D4B8',
    brand:      '#E8F5EE',
    sub:        '#6BA87A',
    dateWindow: '#3A7050',
    dateBorder: '#4A8060',
    dateText:   '#E0F0E8',
    hourHand:   '#FFFFFF',
    minHand:    '#E0F0E8',
    secHand:    '#F5C842',
    center:     '#FFFFFF',
    centerDot:  '#F5C842',
  },
  navy: {
    bg:         '#101D3A',
    ring:       '#2A3F6B',
    markers:    '#8A9EC0',
    brand:      '#E8EEFF',
    sub:        '#5A6890',
    dateWindow: '#1A2D5A',
    dateBorder: '#2A3F6B',
    dateText:   '#C0D0F0',
    hourHand:   '#FFFFFF',
    minHand:    '#D0DFFF',
    secHand:    '#E8A020',
    center:     '#FFFFFF',
    centerDot:  '#E8A020',
  },
};

const STRAP_COLORS = {
  brown: {
    main:  '#6B4226',
    light: '#9B6A3A',
    clasp: '#8B5A2B',
    pin:   '#7A4A1A',
  },
  black: {
    main:  '#1A1A1A',
    light: '#3A3A3A',
    clasp: '#2A2A2A',
    pin:   '#111111',
  },
  steel: {
    main:  '#A0A0A0',
    light: '#D0D0D0',
    clasp: '#909090',
    pin:   '#B8B8B8',
  },
};

// ── INIT ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  updateWatch();

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Burger menu
  document.getElementById('burger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });

  // Close mobile menu on nav link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.remove('open');
    });
  });

  // Intersection observer for reveal animations
  observeElements();

  // Start live clock (second hand)
  startClock();
});

// ── SELECT OPTION ──────────────────────────────
function selectOption(type, value) {
  state[type] = value;

  // Update active button states
  document.querySelectorAll(`[id^="${type}-"]`).forEach(btn => {
    btn.classList.toggle('active', btn.id === `${type}-${value}`);
  });

  // Update badge
  document.getElementById(`${type}Badge`).textContent = LABELS[type][value];

  // Update info card
  updateInfoCard();

  // Animate & repaint watch
  animateWatch();
  updateWatch();

  // Notify
  const typeLabel = {
    case: 'Корпус', dial: 'Циферблат', strap: 'Ремешок',
    shape: 'Форма корпуса', dialFace: 'Форма циферблата',
  };
  showNotification('✓', 'Изменение применено', `${typeLabel[type] || type}: ${LABELS[type][value]}`);
}

// ── SHAPE CONFIGS (case only — does NOT touch dial rx) ────────────────
const SHAPE_CONFIGS = {
  round: {
    caseRx: 42, bezelRx: 36,
    caseX: 55, caseW: 170, caseH: 195,
    bezelX: 63, bezelW: 154, bezelH: 179,
    dialX: 76, dialW: 128, dialH: 157,
    dialRingX: 82, dialRingW: 116, dialRingH: 145,
  },
  cushion: {
    caseRx: 28, bezelRx: 22,
    caseX: 50, caseW: 180, caseH: 200,
    bezelX: 58, bezelW: 164, bezelH: 184,
    dialX: 70, dialW: 140, dialH: 162,
    dialRingX: 76, dialRingW: 128, dialRingH: 150,
  },
  rectangular: {
    caseRx: 8, bezelRx: 5,
    caseX: 60, caseW: 160, caseH: 195,
    bezelX: 68, bezelW: 144, bezelH: 179,
    dialX: 80, dialW: 120, dialH: 157,
    dialRingX: 86, dialRingW: 108, dialRingH: 145,
  },
};

// ── DIAL FACE CONFIGS (independent from case shape) ────────────────────
// rx is applied to dialBg and dialRing independently.
// SVG clamps rx to half of w/h, so rx=999 always gives a true ellipse/circle.
const DIAL_FACE_CONFIGS = {
  classic: { rx: 28, ringRx: 24 },   // default rounded rect
  round:   { rx: 999, ringRx: 999 }, // ellipse / pill — fully round
  square:  { rx: 5,  ringRx: 4  },   // sharp corners — dress / Cartier
};

// ── UPDATE WATCH SVG ───────────────────────────
function updateWatch() {
  const c = CASE_COLORS[state.case];
  const d = DIAL_COLORS[state.dial];
  const s = STRAP_COLORS[state.strap];
  const sh = SHAPE_CONFIGS[state.shape];

  // ── Shape (geometry)
  const caseBody  = document.getElementById('caseBody');
  const caseBezel = document.getElementById('caseBezel');
  const dialBg    = document.getElementById('dialBg');
  const dialRing  = document.getElementById('dialRing');

  if (caseBody) {
    caseBody.setAttribute('rx', sh.caseRx);
    caseBody.setAttribute('x',  sh.caseX);
    caseBody.setAttribute('width',  sh.caseW);
    caseBody.setAttribute('height', sh.caseH);
  }
  if (caseBezel) {
    caseBezel.setAttribute('rx', sh.bezelRx);
    caseBezel.setAttribute('x',  sh.bezelX);
    caseBezel.setAttribute('width',  sh.bezelW);
    caseBezel.setAttribute('height', sh.bezelH);
  }
  // Dial geometry follows case shape (position/size only, NOT rx)
  if (dialBg) {
    dialBg.setAttribute('x',      sh.dialX);
    dialBg.setAttribute('width',  sh.dialW);
    dialBg.setAttribute('height', sh.dialH);
  }
  if (dialRing) {
    dialRing.setAttribute('x',      sh.dialRingX);
    dialRing.setAttribute('width',  sh.dialRingW);
    dialRing.setAttribute('height', sh.dialRingH);
  }

  // ── Dial face shape (independent rx)
  const df = DIAL_FACE_CONFIGS[state.dialFace];
  if (dialBg)   dialBg.setAttribute('rx', df.rx);
  if (dialRing) dialRing.setAttribute('rx', df.ringRx);

  // ── Case colors
  const crownEl   = document.getElementById('crownEl');
  if (caseBody)  caseBody.setAttribute('fill', c.body);
  if (caseBezel) caseBezel.setAttribute('fill', c.bezel);
  if (crownEl)   crownEl.setAttribute('fill', c.crown);

  // ── Dial
  const dialInnerRing = document.getElementById('dialInnerRing');
  const dialBrand     = document.getElementById('dialBrand');
  const dialSub       = document.getElementById('dialSub');
  const dateWindow    = document.getElementById('dateWindow');
  const hourMarkers   = document.getElementById('hourMarkers');
  const hourHand      = document.getElementById('hourHand');
  const minuteHand    = document.getElementById('minuteHand');
  const secondHand    = document.getElementById('secondHand');
  const secondBalance = document.getElementById('secondBalance');
  const centerCap     = document.querySelector('#watchSvg circle[r="5"]');
  const centerDot     = document.querySelector('#watchSvg circle[r="2"]');

  if (dialBg)        dialBg.setAttribute('fill', d.bg);
  if (dialRing)      { dialRing.setAttribute('stroke', d.ring); }
  if (dialInnerRing) dialInnerRing.setAttribute('stroke', d.ring);
  if (dialBrand)     dialBrand.setAttribute('fill', d.brand);
  if (dialSub)       dialSub.setAttribute('fill', d.sub);
  if (dateWindow)    {
    dateWindow.setAttribute('fill', d.dateWindow);
    dateWindow.setAttribute('stroke', d.dateBorder);
    // date text
    const dateText = dateWindow.nextElementSibling;
    if (dateText) dateText.setAttribute('fill', d.dateText);
  }
  if (hourMarkers)   hourMarkers.setAttribute('stroke', d.markers);
  if (hourHand)      hourHand.setAttribute('stroke', d.hourHand);
  if (minuteHand)    minuteHand.setAttribute('stroke', d.minHand);
  if (secondHand)    { secondHand.setAttribute('stroke', d.secHand); }
  if (secondBalance) secondBalance.setAttribute('stroke', d.secHand);
  if (centerCap)     centerCap.setAttribute('fill', d.center);
  if (centerDot)     centerDot.setAttribute('fill', d.centerDot);

  // ── Strap
  const strapTop    = document.getElementById('strapTop');
  const strapBottom = document.getElementById('strapBottom');
  const claspBg     = document.getElementById('claspBg');
  const claspPin    = document.getElementById('claspPin');

  if (strapTop)    strapTop.setAttribute('fill', s.main);
  if (strapBottom) strapBottom.setAttribute('fill', s.main);
  if (claspBg)     claspBg.setAttribute('fill', s.clasp);
  if (claspPin)    claspPin.setAttribute('fill', s.pin);

  // Steel strap: draw metal bracelet links instead of texture
  updateStrapTexture(s, state.strap === 'steel');
}

function updateStrapTexture(s, isSteel) {
  const topTexture    = document.getElementById('strapTopTexture');
  const bottomTexture = document.getElementById('strapBottomTexture');

  if (isSteel) {
    // Metallic link lines
    const strokeColor = '#D8D8D8';
    [topTexture, bottomTexture].forEach(el => {
      if (el) {
        el.setAttribute('opacity', '0.6');
        el.querySelectorAll('line').forEach(l => {
          l.setAttribute('stroke', strokeColor);
          l.setAttribute('stroke-width', '2');
        });
      }
    });
  } else {
    const strokeColor = '#fff';
    [topTexture, bottomTexture].forEach(el => {
      if (el) {
        el.setAttribute('opacity', '0.35');
        el.querySelectorAll('line').forEach(l => {
          l.setAttribute('stroke', strokeColor);
          l.setAttribute('stroke-width', '1');
        });
      }
    });
  }
}

// ── ANIMATE WATCH ──────────────────────────────
function animateWatch() {
  const svg = document.getElementById('watchSvg');
  svg.classList.remove('animating');
  void svg.offsetWidth; // reflow
  svg.classList.add('animating');
  setTimeout(() => svg.classList.remove('animating'), 400);
}

// ── INFO CARD UPDATE ───────────────────────────
function updateInfoCard() {
  document.getElementById('infoCase').textContent  = LABELS.case[state.case];
  document.getElementById('infoDial').textContent  = LABELS.dial[state.dial];
  document.getElementById('infoStrap').textContent = LABELS.strap[state.strap];
  const infoShape    = document.getElementById('infoShape');
  const infoDialFace = document.getElementById('infoDialFace');
  if (infoShape)    infoShape.textContent    = LABELS.shape[state.shape];
  if (infoDialFace) infoDialFace.textContent = LABELS.dialFace[state.dialFace];

  const total    = calcTotal();
  const priceEl  = document.getElementById('totalPrice');
  priceEl.textContent = formatPrice(total);
  priceEl.classList.remove('bump');
  void priceEl.offsetWidth;
  priceEl.classList.add('bump');
}

function calcTotal() {
  return BASE_PRICE
    + PRICES.case[state.case]
    + PRICES.dial[state.dial]
    + PRICES.strap[state.strap]
    + PRICES.shape[state.shape]
    + PRICES.dialFace[state.dialFace];
}

function formatPrice(n) {
  return n.toLocaleString('ru-KZ') + ' ₸';
}

// ── SAVE DESIGN ────────────────────────────────
function saveDesign() {
  const total = calcTotal();

  document.getElementById('modalCase').textContent  = LABELS.case[state.case];
  document.getElementById('modalDial').textContent  = LABELS.dial[state.dial];
  document.getElementById('modalStrap').textContent = LABELS.strap[state.strap];
  const modalShape    = document.getElementById('modalShape');
  const modalDialFace = document.getElementById('modalDialFace');
  if (modalShape)    modalShape.textContent    = LABELS.shape[state.shape];
  if (modalDialFace) modalDialFace.textContent = LABELS.dialFace[state.dialFace];
  document.getElementById('modalTotal').textContent = formatPrice(total);

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── RESET DESIGN ───────────────────────────────
function resetDesign() {
  state.case     = 'silver';
  state.dial     = 'ivory';
  state.strap    = 'brown';
  state.shape    = 'round';
  state.dialFace = 'classic';

  ['case', 'dial', 'strap', 'shape', 'dialFace'].forEach(type => {
    const defaults = { case: 'silver', dial: 'ivory', strap: 'brown', shape: 'round', dialFace: 'classic' };
    document.querySelectorAll(`[id^="${type}-"]`).forEach(btn => {
      btn.classList.toggle('active', btn.id === `${type}-${defaults[type]}`);
    });
    const badge = document.getElementById(`${type}Badge`);
    if (badge) badge.textContent = LABELS[type][defaults[type]];
  });

  updateInfoCard();
  animateWatch();
  updateWatch();

  showNotification('↺', 'Настройки сброшены', 'Конструктор вернулся к базовым параметрам');
}

// ── NOTIFICATION ───────────────────────────────
let notifTimer = null;

function showNotification(icon, title, body) {
  const el    = document.getElementById('notification');
  const iEl   = document.getElementById('notifIcon');
  const tEl   = document.getElementById('notifTitle');
  const bEl   = document.getElementById('notifBody');

  iEl.textContent = icon;
  tEl.textContent = title;
  bEl.textContent = body;
  el.classList.add('show');

  if (notifTimer) clearTimeout(notifTimer);
  notifTimer = setTimeout(closeNotification, 3200);
}

function closeNotification() {
  document.getElementById('notification').classList.remove('show');
}

// ── LIVE CLOCK (second hand) ───────────────────
function startClock() {
  function tick() {
    const now = new Date();
    const s = now.getSeconds() + now.getMilliseconds() / 1000;
    const m = now.getMinutes() + s / 60;
    const h = (now.getHours() % 12) + m / 60;

    const cx = 140, cy = 191;
    const R_SEC = 48, R_MIN = 42, R_HR = 34;

    function handCoords(angleDeg, r) {
      const rad = (angleDeg - 90) * Math.PI / 180;
      return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    }

    const sPos = handCoords(s * 6, R_SEC);
    const mPos = handCoords(m * 6, R_MIN);
    const hPos = handCoords(h * 30, R_HR);

    const secHand    = document.getElementById('secondHand');
    const secBalance = document.getElementById('secondBalance');
    const minHand    = document.getElementById('minuteHand');
    const hrHand     = document.getElementById('hourHand');

    if (secHand) {
      secHand.setAttribute('x2', sPos.x);
      secHand.setAttribute('y2', sPos.y);
    }
    if (secBalance) {
      const sBal = handCoords(s * 6 + 180, 12);
      secBalance.setAttribute('x2', sBal.x);
      secBalance.setAttribute('y2', sBal.y);
    }
    if (minHand) {
      minHand.setAttribute('x2', mPos.x);
      minHand.setAttribute('y2', mPos.y);
    }
    if (hrHand) {
      hrHand.setAttribute('x2', hPos.x);
      hrHand.setAttribute('y2', hPos.y);
    }

    const dateWindowText = document.querySelector('#dateWindow + text');
    if (dateWindowText) {
      dateWindowText.textContent = now.getDate();
    }
  }

  tick();
  setInterval(tick, 1000);
}

// ── SCROLL REVEAL ──────────────────────────────
function observeElements() {
  const targets = document.querySelectorAll(
    '.advantage-card, .about-card, .option-group, .stat-item'
  );

  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity .6s ease, transform .6s ease; }
    .reveal.visible { opacity: 1; transform: none; }
  `;
  document.head.appendChild(style);

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => obs.observe(el));
}

// ── KEYBOARD SHORTCUTS ─────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeNotification();
  }
});
