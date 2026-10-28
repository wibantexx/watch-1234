/* =============================================
   12:34 — Watch Customizer
   script.js — Hyper-Detailed Luxury Watch Configurator
   ============================================= */

// ── STATE ──────────────────────────────────────
const state = {
  case:     'silver',
  dial:     'ivory',
  strap:    'brown',
  shape:    'rolex-datejust',
  dialFace: 'roman',
};

const BASE_PRICE = 35000;

const PRICES = {
  case: {
    silver:   0,
    black:    3000,
    gold:     5000,
    rosegold: 6000,
  },
  strap: {
    brown: 0,
    black: 0,
    steel: 4000,
  },
  dial: {
    ivory: 0,
    green: 0,
    navy:  0,
  },
  shape: {
    'rolex-datejust':   0,
    'rolex-submariner': 3000,
    'patek-nautilus':   5000,
    'ap-royaloak':      6000,
    'patek-calatrava':  2000,
    'cartier-santos':   4000,
    // Aliases
    round:       0,
    cushion:     5000,
    rectangular: 4000,
  },
  dialFace: {
    diver:   0,
    roman:   0,
    baton:   0,
    round:   0,
    square:  0,
    classic: 0,
  },
};

const LABELS = {
  case: {
    silver:   'Сталь 904L / Серебро',
    black:    'Чёрный DLC / Керамика',
    gold:     'Жёлтое золото 18k',
    rosegold: 'Розовое золото Everose',
  },
  dial: {
    ivory: 'Слоновая кость',
    green: 'Изумрудный',
    navy:  'Тёмно-синий',
  },
  strap: {
    brown: 'Коричневая кожа',
    black: 'Чёрная кожа',
    steel: 'Стальной браслет',
  },
  shape: {
    'rolex-datejust':   'Rolex Datejust (Рифлёный)',
    'rolex-submariner': 'Rolex Submariner (Дайвер)',
    'patek-nautilus':   'Patek Nautilus (Октагон)',
    'ap-royaloak':      'AP Royal Oak (Винты)',
    'patek-calatrava':  'Patek Calatrava (Классика)',
    'cartier-santos':   'Cartier Santos (Квадратный)',
    // Aliases
    round:       'Rolex Datejust (Рифлёный)',
    cushion:     'Patek Nautilus (Октагон)',
    rectangular: 'Cartier Santos (Квадратный)',
  },
  dialFace: {
    diver:   'Дайверский люминофор',
    roman:   'Римские цифры',
    baton:   'Накладные индексы',
    // Aliases
    round:   'Дайверский люминофор',
    square:  'Римские цифры',
    classic: 'Накладные индексы',
  },
};

// ── SHADER & MATERIAL CONFIGS ──────────────────
const CASE_MATERIALS = {
  silver: {
    caseMetal: ['#FFFFFF 0%', '#D2D7DD 20%', '#9EA7B2 45%', '#F2F5F8 60%', '#86919D 85%', '#C2CAD2 100%'],
    caseBevel: ['#FFFFFF 0%', '#E0E5EA 40%', '#8A95A2 100%'],
    fluteLight: '#FFFFFF',
    fluteDark:  '#85909D',
    screwFill:  '#E4E8EC',
    screwSlot:  '#5A636E',
    crownMetal: '#B4BDC7',
    bodyFill:   '#C0C0C0',
    bezelFill:  '#B0B0B0',
  },
  gold: {
    caseMetal: ['#FFF8D0 0%', '#F5D35D 20%', '#C8961A 45%', '#FFF3C2 60%', '#9E7008 85%', '#E2B83C 100%'],
    caseBevel: ['#FFF9DE 0%', '#ECC450 40%', '#A0740D 100%'],
    fluteLight: '#FFFBEA',
    fluteDark:  '#9E7008',
    screwFill:  '#FCE788',
    screwSlot:  '#7A5200',
    crownMetal: '#D6A522',
    bodyFill:   '#D4A820',
    bezelFill:  '#C8961A',
  },
  rosegold: {
    caseMetal: ['#FFF0EA 0%', '#F1AE9A 20%', '#C76A52 45%', '#FFE7DF 60%', '#9F4733 85%', '#E09480 100%'],
    caseBevel: ['#FFF5F0 0%', '#EAA490 40%', '#9E4431 100%'],
    fluteLight: '#FFF6F2',
    fluteDark:  '#9E4431',
    screwFill:  '#F8C8BA',
    screwSlot:  '#7A2C1C',
    crownMetal: '#CF7D67',
    bodyFill:   '#D4856E',
    bezelFill:  '#C76A52',
  },
  black: {
    caseMetal: ['#4C5158 0%', '#2B2E33 20%', '#181A1D 45%', '#5E646D 60%', '#121315 85%', '#32363C 100%'],
    caseBevel: ['#6B727C 0%', '#3D4249 40%', '#141517 100%'],
    fluteLight: '#656C76',
    fluteDark:  '#1C1D20',
    screwFill:  '#383B40',
    screwSlot:  '#101112',
    crownMetal: '#2A2D32',
    bodyFill:   '#3A3A3A',
    bezelFill:  '#282828',
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

const cx = 140, cy = 191;

// ── SVG SHADER & CLIP GENERATOR ────────────────
function getCaseDefs(material, dialColor, shapeKey) {
  const mat = CASE_MATERIALS[material] || CASE_MATERIALS.silver;

  let ceramic = '#181A1D';
  if (dialColor === 'green') ceramic = '#143823';
  if (dialColor === 'navy')  ceramic = '#112242';

  // Strict aperture clip-path matching inner bezel exactly
  let clipPathD = `M 83.5 191 A 56.5 56.5 0 1 0 196.5 191 A 56.5 56.5 0 1 0 83.5 191 Z`;
  if (shapeKey === 'cartier-santos') {
    clipPathD = `M 95 131 L 185 131 Q 200 131 200 146 L 200 236 Q 200 251 185 251 L 95 251 Q 80 251 80 236 L 80 146 Q 80 131 95 131 Z`;
  } else if (shapeKey === 'patek-nautilus') {
    clipPathD = `M 102 131 L 178 131 Q 202 131 202 155 L 202 227 Q 202 251 178 251 L 102 251 Q 78 251 78 227 L 78 155 Q 78 131 102 131 Z`;
  }

  return `
    <clipPath id="dialClip">
      <path id="dialClipPath" d="${clipPathD}"/>
    </clipPath>
    <linearGradient id="caseMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      ${mat.caseMetal.map(stop => {
        const [color, offset] = stop.split(' ');
        return `<stop offset="${offset}" stop-color="${color}"/>`;
      }).join('')}
    </linearGradient>
    <linearGradient id="caseBevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      ${mat.caseBevel.map(stop => {
        const [color, offset] = stop.split(' ');
        return `<stop offset="${offset}" stop-color="${color}"/>`;
      }).join('')}
    </linearGradient>
    <linearGradient id="ceramicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${ceramic}"/>
      <stop offset="50%" stop-color="#080A0C"/>
      <stop offset="100%" stop-color="${ceramic}"/>
    </linearGradient>
    <radialGradient id="cabochonGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#64B5F6"/>
      <stop offset="30%" stop-color="#1E88E5"/>
      <stop offset="75%" stop-color="#0D47A1"/>
      <stop offset="100%" stop-color="#061F4A"/>
    </radialGradient>
  `;
}

// ── LUXURY CASE MODEL SVG GENERATORS ───────────

// 1. Rolex Datejust (Fluted Bezel, Oyster Lugs, Cyclops)
function getRolexDatejustSvg(mat) {
  let flutes = '';
  for (let i = 0; i < 48; i++) {
    const a1 = (i * 2 * Math.PI) / 48;
    const amid = ((i + 0.5) * 2 * Math.PI) / 48;
    const a2 = ((i + 1) * 2 * Math.PI) / 48;
    const p1In = `${(cx + 57.5 * Math.cos(a1)).toFixed(2)},${(cy + 57.5 * Math.sin(a1)).toFixed(2)}`;
    const pMidOut = `${(cx + 70.5 * Math.cos(amid)).toFixed(2)},${(cy + 70.5 * Math.sin(amid)).toFixed(2)}`;
    const pMidIn = `${(cx + 57.5 * Math.cos(amid)).toFixed(2)},${(cy + 57.5 * Math.sin(amid)).toFixed(2)}`;
    const p2In = `${(cx + 57.5 * Math.cos(a2)).toFixed(2)},${(cy + 57.5 * Math.sin(a2)).toFixed(2)}`;
    flutes += `<polygon points="${p1In} ${pMidOut} ${pMidIn}" fill="${mat.fluteLight}"/>`;
    flutes += `<polygon points="${pMidOut} ${p2In} ${pMidIn}" fill="${mat.fluteDark}"/>`;
  }

  return `
    <path d="M 90 95 C 60 140 60 242 90 287 L 190 287 C 220 242 220 140 190 95 Z" fill="#000" opacity="0.22" filter="blur(6px)" transform="translate(0, 5)"/>
    
    <path d="M 92 95 C 60 142 60 240 92 287 L 102 287 C 100 274 106 266 114 263 L 166 263 C 174 266 180 274 178 287 L 188 287 C 220 240 220 142 188 95 L 178 95 C 180 108 174 116 166 119 L 114 119 C 106 116 100 108 102 95 Z" fill="url(#caseMetalGrad)" stroke="url(#caseBevelGrad)" stroke-width="1.2"/>
    
    <path d="M 92 95 C 80 120 70 145 66 168 L 63 162 C 68 138 78 114 92 95 Z" fill="url(#caseBevelGrad)"/>
    <path d="M 188 95 C 200 120 210 145 214 168 L 217 162 C 212 138 202 114 188 95 Z" fill="url(#caseBevelGrad)"/>
    <path d="M 92 287 C 80 262 70 237 66 214 L 63 220 C 68 244 78 268 92 287 Z" fill="url(#caseBevelGrad)"/>
    <path d="M 188 287 C 200 262 210 237 214 214 L 217 220 C 212 244 202 268 188 287 Z" fill="url(#caseBevelGrad)"/>

    <g transform="translate(217, 180)">
      <rect x="0" y="2" width="13" height="18" rx="3.5" fill="${mat.crownMetal}" stroke="#000" stroke-opacity="0.25" stroke-width="0.8"/>
      <line x1="3" y1="4" x2="3" y2="18" stroke="#fff" stroke-width="0.9" opacity="0.6"/>
      <line x1="6" y1="4" x2="6" y2="18" stroke="#fff" stroke-width="0.9" opacity="0.6"/>
      <line x1="9" y1="4" x2="9" y2="18" stroke="#fff" stroke-width="0.9" opacity="0.6"/>
      <circle cx="12" cy="11" r="1.5" fill="#fff" opacity="0.75"/>
    </g>

    <circle cx="${cx}" cy="${cy}" r="71" fill="none" stroke="url(#caseBevelGrad)" stroke-width="2"/>
    
    <g id="datejustFlutedFacets">
      ${flutes}
    </g>

    <circle cx="${cx}" cy="${cy}" r="57.5" fill="none" stroke="url(#caseBevelGrad)" stroke-width="1.4"/>
    <circle cx="${cx}" cy="${cy}" r="56.5" fill="none" stroke="#000" stroke-width="0.8" opacity="0.3"/>
  `;
}

// 2. Rolex Submariner (Ceramic Bezel, Crown Guards, Cyclops)
function getRolexSubmarinerSvg(mat) {
  let coinEdge = '';
  for (let i = 0; i < 60; i++) {
    const a = (i * 2 * Math.PI) / 60;
    const x1 = (cx + 71.5 * Math.cos(a)).toFixed(2);
    const y1 = (cy + 71.5 * Math.sin(a)).toFixed(2);
    const x2 = (cx + 73.5 * Math.cos(a)).toFixed(2);
    const y2 = (cy + 73.5 * Math.sin(a)).toFixed(2);
    coinEdge += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#caseBevelGrad)" stroke-width="1.4" stroke-linecap="round"/>`;
  }

  const marker10 = [cx + 64 * Math.cos(Math.PI/3 - Math.PI/2), cy + 64 * Math.sin(Math.PI/3 - Math.PI/2)];
  const marker20 = [cx + 64 * Math.cos(2*Math.PI/3 - Math.PI/2), cy + 64 * Math.sin(2*Math.PI/3 - Math.PI/2)];
  const marker30 = [cx + 64 * Math.cos(Math.PI - Math.PI/2), cy + 64 * Math.sin(Math.PI - Math.PI/2)];
  const marker40 = [cx + 64 * Math.cos(4*Math.PI/3 - Math.PI/2), cy + 64 * Math.sin(4*Math.PI/3 - Math.PI/2)];
  const marker50 = [cx + 64 * Math.cos(5*Math.PI/3 - Math.PI/2), cy + 64 * Math.sin(5*Math.PI/3 - Math.PI/2)];

  let minuteTicks = '';
  for (let m = 1; m < 15; m++) {
    if (m % 5 === 0) continue;
    const am = ((m * 6) * Math.PI) / 180 - Math.PI/2;
    const r1 = 62.5, r2 = 66.5;
    const x1 = (cx + r1 * Math.cos(am)).toFixed(2);
    const y1 = (cy + r1 * Math.sin(am)).toFixed(2);
    const x2 = (cx + r2 * Math.cos(am)).toFixed(2);
    const y2 = (cy + r2 * Math.sin(am)).toFixed(2);
    minuteTicks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFFFFF" stroke-width="1.1" opacity="0.9"/>`;
  }

  let batons = '';
  [5, 15, 25, 35, 45, 55].forEach(min => {
    const ab = ((min * 6) * Math.PI) / 180 - Math.PI/2;
    const r1 = 60, r2 = 67.5;
    const x1 = (cx + r1 * Math.cos(ab)).toFixed(2);
    const y1 = (cy + r1 * Math.sin(ab)).toFixed(2);
    const x2 = (cx + r2 * Math.cos(ab)).toFixed(2);
    const y2 = (cy + r2 * Math.sin(ab)).toFixed(2);
    batons += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>`;
  });

  return `
    <path d="M 88 92 C 58 140 58 242 88 290 L 192 290 C 222 242 222 140 192 92 Z" fill="#000" opacity="0.25" filter="blur(6px)" transform="translate(0, 5)"/>
    
    <path d="M 88 92 C 58 142 58 240 88 290 L 102 290 C 100 274 106 266 114 263 L 166 263 C 174 266 180 274 178 290 L 192 290 C 216 250 216 230 215 210 C 218 206 225 202 225 197 L 225 185 C 225 180 218 176 215 172 C 216 152 216 132 192 92 L 178 92 C 180 108 174 116 166 119 L 114 119 C 106 116 100 108 102 92 Z" fill="url(#caseMetalGrad)" stroke="url(#caseBevelGrad)" stroke-width="1.3"/>
    
    <path d="M 215 172 L 225 180 L 225 184 L 216 178 Z" fill="url(#caseBevelGrad)"/>
    <path d="M 215 210 L 225 202 L 225 198 L 216 204 Z" fill="url(#caseBevelGrad)"/>

    <g transform="translate(220, 180)">
      <rect x="0" y="2" width="14" height="18" rx="3.5" fill="${mat.crownMetal}" stroke="#000" stroke-opacity="0.3" stroke-width="0.8"/>
      <line x1="3" y1="4" x2="3" y2="18" stroke="#fff" stroke-width="1" opacity="0.6"/>
      <line x1="6" y1="4" x2="6" y2="18" stroke="#fff" stroke-width="1" opacity="0.6"/>
      <line x1="9" y1="4" x2="9" y2="18" stroke="#fff" stroke-width="1" opacity="0.6"/>
      <circle cx="12" cy="8" r="0.8" fill="#fff" opacity="0.8"/>
      <circle cx="12" cy="11" r="0.9" fill="#fff" opacity="0.9"/>
      <circle cx="12" cy="14" r="0.8" fill="#fff" opacity="0.8"/>
    </g>

    <circle cx="${cx}" cy="${cy}" r="73.5" fill="none" stroke="url(#caseMetalGrad)" stroke-width="1"/>
    <g id="submarinerCoinEdge">
      ${coinEdge}
    </g>

    <circle cx="${cx}" cy="${cy}" r="71" fill="url(#ceramicGrad)" stroke="url(#caseBevelGrad)" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cy}" r="57.5" fill="none" stroke="url(#caseBevelGrad)" stroke-width="1.8"/>

    <polygon points="${cx - 8},${cy - 68} ${cx + 8},${cy - 68} ${cx},${cy - 59}" fill="none" stroke="#FFFFFF" stroke-width="1.2"/>
    <circle cx="${cx}" cy="${cy - 64.5}" r="3.2" fill="#E6FFF0" stroke="#B0BEC5" stroke-width="1"/>
    <circle cx="${cx}" cy="${cy - 64.5}" r="1.5" fill="#FFFFFF"/>

    <g font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="8.5" fill="#FFFFFF" text-anchor="middle" dominant-baseline="central">
      <text x="${marker10[0]}" y="${marker10[1]}">10</text>
      <text x="${marker20[0]}" y="${marker20[1]}">20</text>
      <text x="${marker30[0]}" y="${marker30[1]}">30</text>
      <text x="${marker40[0]}" y="${marker40[1]}">40</text>
      <text x="${marker50[0]}" y="${marker50[1]}">50</text>
    </g>

    ${batons}
    ${minuteTicks}

    <circle cx="${cx}" cy="${cy}" r="57" fill="none" stroke="#000" stroke-width="0.8" opacity="0.35"/>
    <circle cx="${cx}" cy="${cy}" r="56" fill="none" stroke="url(#caseBevelGrad)" stroke-width="0.8" opacity="0.7"/>
  `;
}

// 3. Patek Philippe Nautilus
function getPatekNautilusSvg(mat) {
  return `
    <path d="M 94 96 L 186 96 C 218 135 242 165 242 191 C 242 217 218 247 186 286 L 94 286 C 62 247 38 217 38 191 C 38 165 62 135 94 96 Z" fill="#000" opacity="0.25" filter="blur(7px)" transform="translate(0, 5)"/>
    
    <path d="
      M 94 96 
      L 186 96 
      C 204 116 215 140 216 164
      C 224 168 238 174 238 182
      L 238 200
      C 238 208 224 214 216 218
      C 215 242 204 266 186 286
      L 176 286 C 178 274 172 266 164 263 L 116 263 C 108 266 102 274 104 286 L 94 286
      C 76 266 65 242 64 218
      C 56 214 42 208 42 200
      L 42 182
      C 42 174 56 168 64 164
      C 65 140 76 116 94 96 Z
    " fill="url(#caseMetalGrad)" stroke="url(#caseBevelGrad)" stroke-width="1.3"/>

    <path d="M 42 182 L 42 200 C 44 206 54 212 64 216 L 64 213 C 56 209 46 204 46 199 L 46 183 Z" fill="url(#caseBevelGrad)"/>
    <path d="M 238 182 L 238 200 C 236 206 226 212 216 216 L 216 213 C 224 209 234 204 234 199 L 234 183 Z" fill="url(#caseBevelGrad)"/>

    <circle cx="48" cy="173" r="1.6" fill="${mat.screwFill}" stroke="${mat.screwSlot}" stroke-width="0.6"/>
    <line x1="46.8" y1="173" x2="49.2" y2="173" stroke="${mat.screwSlot}" stroke-width="0.6"/>
    <circle cx="48" cy="209" r="1.6" fill="${mat.screwFill}" stroke="${mat.screwSlot}" stroke-width="0.6"/>
    <line x1="46.8" y1="209" x2="49.2" y2="209" stroke="${mat.screwSlot}" stroke-width="0.6"/>

    <rect x="114" y="96" width="52" height="12" rx="2" fill="url(#caseBevelGrad)" stroke="#000" stroke-opacity="0.2" stroke-width="0.8"/>
    <rect x="114" y="278" width="52" height="12" rx="2" fill="url(#caseBevelGrad)" stroke="#000" stroke-opacity="0.2" stroke-width="0.8"/>

    <g transform="translate(231, 183)">
      <rect x="0" y="2" width="11" height="14" rx="2.5" fill="${mat.crownMetal}" stroke="#000" stroke-opacity="0.25" stroke-width="0.7"/>
      <line x1="3" y1="3" x2="3" y2="15" stroke="#fff" stroke-width="0.8" opacity="0.6"/>
      <line x1="6" y1="3" x2="6" y2="15" stroke="#fff" stroke-width="0.8" opacity="0.6"/>
      <line x1="9" y1="3" x2="9" y2="15" stroke="#fff" stroke-width="0.8" opacity="0.6"/>
    </g>

    <path d="
      M 108 123 
      L 172 123 
      Q 186 123 197 134 
      L 204 141 
      Q 214 151 214 165 
      L 214 217 
      Q 214 231 204 241 
      L 197 248 
      Q 186 259 172 259 
      L 108 259 
      Q 94 259 83 248 
      L 76 241 
      Q 66 231 66 217 
      L 66 165 
      Q 66 151 76 141 
      L 83 134 
      Q 94 123 108 123 Z
    " fill="url(#caseMetalGrad)" stroke="url(#caseBevelGrad)" stroke-width="2.2"/>

    <g stroke="#FFFFFF" stroke-width="0.7" opacity="0.22">
      <line x1="86" y1="135" x2="194" y2="135"/>
      <line x1="74" y1="145" x2="206" y2="145"/>
      <line x1="69" y1="155" x2="211" y2="155"/>
      <line x1="68" y1="165" x2="212" y2="165"/>
      <line x1="68" y1="175" x2="212" y2="175"/>
      <line x1="68" y1="185" x2="212" y2="185"/>
      <line x1="68" y1="195" x2="212" y2="195"/>
      <line x1="68" y1="205" x2="212" y2="205"/>
      <line x1="68" y1="215" x2="212" y2="215"/>
      <line x1="69" y1="225" x2="211" y2="225"/>
      <line x1="74" y1="235" x2="206" y2="235"/>
      <line x1="86" y1="245" x2="194" y2="245"/>
    </g>

    <rect x="76" y="129" width="128" height="124" rx="26" fill="none" stroke="url(#caseBevelGrad)" stroke-width="1.8"/>
    <rect x="78" y="131" width="124" height="120" rx="24" fill="none" stroke="#000" stroke-width="0.8" opacity="0.3"/>
  `;
}

// 4. Audemars Piguet Royal Oak
function getApRoyalOakSvg(mat) {
  let octagonOuterPoints = [];
  let boltCoords = [];

  for (let i = 0; i < 8; i++) {
    const angle = (i * 45 + 22.5) * (Math.PI / 180);
    const xo = (cx + 72 * Math.cos(angle)).toFixed(2);
    const yo = (cy + 72 * Math.sin(angle)).toFixed(2);
    octagonOuterPoints.push(`${xo},${yo}`);

    const xb = (cx + 64.5 * Math.cos(angle)).toFixed(2);
    const yb = (cy + 64.5 * Math.sin(angle)).toFixed(2);
    const slotAngle = (i * 45 + 22.5 + 90);
    boltCoords.push({ x: xb, y: yb, slotAngle: slotAngle });
  }

  let bolts = boltCoords.map(b => `
    <g transform="translate(${b.x}, ${b.y}) rotate(${b.slotAngle})">
      <polygon points="-3,-1.7 -3,1.7 0,3.4 3,1.7 3,-1.7 0,-3.4" fill="${mat.screwFill}" stroke="${mat.screwSlot}" stroke-width="0.7"/>
      <line x1="-2.4" y1="0" x2="2.4" y2="0" stroke="${mat.screwSlot}" stroke-width="0.8"/>
    </g>
  `).join('');

  return `
    <path d="M 88 94 L 192 94 L 224 148 L 224 234 L 192 288 L 88 288 L 56 234 L 56 148 Z" fill="#000" opacity="0.25" filter="blur(7px)" transform="translate(0, 5)"/>
    
    <path d="
      M 90 94 
      L 190 94 
      L 220 146 
      L 220 236 
      L 190 288 
      L 174 288 C 176 274 170 266 162 263 L 118 263 C 110 266 104 274 106 288 L 90 288 
      L 60 236 
      L 60 146 
      L 90 94 Z
    " fill="url(#caseMetalGrad)" stroke="url(#caseBevelGrad)" stroke-width="1.4"/>

    <path d="M 90 94 L 60 146 L 64 149 L 93 96 Z" fill="url(#caseBevelGrad)"/>
    <path d="M 190 94 L 220 146 L 216 149 L 187 96 Z" fill="url(#caseBevelGrad)"/>
    <path d="M 60 236 L 90 288 L 93 285 L 64 233 Z" fill="url(#caseBevelGrad)"/>
    <path d="M 220 236 L 190 288 L 187 285 L 216 233 Z" fill="url(#caseBevelGrad)"/>

    <rect x="110" y="94" width="22" height="12" rx="1.5" fill="url(#caseBevelGrad)" stroke="#000" stroke-opacity="0.25" stroke-width="0.8"/>
    <rect x="148" y="94" width="22" height="12" rx="1.5" fill="url(#caseBevelGrad)" stroke="#000" stroke-opacity="0.25" stroke-width="0.8"/>
    <rect x="110" y="278" width="22" height="12" rx="1.5" fill="url(#caseBevelGrad)" stroke="#000" stroke-opacity="0.25" stroke-width="0.8"/>
    <rect x="148" y="278" width="22" height="12" rx="1.5" fill="url(#caseBevelGrad)" stroke="#000" stroke-opacity="0.25" stroke-width="0.8"/>

    <g transform="translate(220, 183)">
      <polygon points="0,4 0,12 5,16 12,14 14,8 10,1" fill="${mat.crownMetal}" stroke="#000" stroke-opacity="0.3" stroke-width="0.8"/>
      <line x1="3" y1="5" x2="9" y2="5" stroke="#fff" stroke-width="0.8" opacity="0.6"/>
      <line x1="3" y1="10" x2="9" y2="10" stroke="#fff" stroke-width="0.8" opacity="0.6"/>
    </g>

    <polygon points="${octagonOuterPoints.join(' ')}" fill="#121315" stroke="#000" stroke-width="3" transform="scale(1.02) translate(-2.8, -3.8)"/>
    <polygon points="${octagonOuterPoints.join(' ')}" fill="url(#caseMetalGrad)" stroke="url(#caseBevelGrad)" stroke-width="2"/>

    <g stroke="#FFFFFF" stroke-width="0.6" opacity="0.2">
      <line x1="100" y1="125" x2="100" y2="257"/>
      <line x1="110" y1="121" x2="110" y2="261"/>
      <line x1="120" y1="120" x2="120" y2="262"/>
      <line x1="130" y1="120" x2="130" y2="262"/>
      <line x1="140" y1="120" x2="140" y2="262"/>
      <line x1="150" y1="120" x2="150" y2="262"/>
      <line x1="160" y1="120" x2="160" y2="262"/>
      <line x1="170" y1="121" x2="170" y2="261"/>
      <line x1="180" y1="125" x2="180" y2="257"/>
    </g>

    ${bolts}

    <circle cx="${cx}" cy="${cy}" r="57.5" fill="none" stroke="url(#caseBevelGrad)" stroke-width="1.8"/>
    <circle cx="${cx}" cy="${cy}" r="56.5" fill="none" stroke="#000" stroke-width="0.8" opacity="0.3"/>
  `;
}

// 5. Patek Philippe Calatrava
function getPatekCalatravaSvg(mat) {
  return `
    <path d="M 94 94 C 64 140 64 242 94 288 L 186 288 C 216 242 216 140 186 94 Z" fill="#000" opacity="0.22" filter="blur(6px)" transform="translate(0, 5)"/>
    
    <path d="
      M 96 95 
      C 76 118 64 145 62 175
      C 60 191 62 207 66 222
      C 72 245 84 268 96 287
      L 104 287 C 102 274 108 266 116 263 L 164 263 C 172 266 178 274 176 287 L 184 287
      C 196 268 208 245 214 222
      C 218 207 220 191 218 175
      C 216 145 204 118 184 95
      L 176 95 C 178 108 172 116 164 119 L 116 119 C 108 116 102 108 104 95 Z
    " fill="url(#caseMetalGrad)" stroke="url(#caseBevelGrad)" stroke-width="1.2"/>

    <path d="M 96 95 C 84 118 74 145 70 172 L 67 167 C 72 140 82 115 96 95 Z" fill="url(#caseBevelGrad)"/>
    <path d="M 184 95 C 196 118 206 145 210 172 L 213 167 C 208 140 198 115 184 95 Z" fill="url(#caseBevelGrad)"/>
    <path d="M 96 287 C 84 264 74 237 70 210 L 67 215 C 72 242 82 267 96 287 Z" fill="url(#caseBevelGrad)"/>
    <path d="M 184 287 C 196 264 206 237 210 210 L 213 215 C 208 242 198 267 184 287 Z" fill="url(#caseBevelGrad)"/>

    <g transform="translate(217, 182)">
      <path d="M 0 4 Q 4 1 8 4 L 11 9 Q 12 11 11 13 L 8 18 Q 4 21 0 18 Z" fill="${mat.crownMetal}" stroke="#000" stroke-opacity="0.25" stroke-width="0.7"/>
      <line x1="2" y1="5" x2="2" y2="17" stroke="#fff" stroke-width="0.8" opacity="0.6"/>
      <line x1="5" y1="4" x2="5" y2="18" stroke="#fff" stroke-width="0.8" opacity="0.6"/>
      <line x1="8" y1="6" x2="8" y2="16" stroke="#fff" stroke-width="0.8" opacity="0.6"/>
    </g>

    <circle cx="${cx}" cy="${cy}" r="71" fill="url(#caseMetalGrad)" stroke="url(#caseBevelGrad)" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="64" fill="none" stroke="url(#caseBevelGrad)" stroke-width="1.8"/>
    
    <path d="M 95 150 A 64 64 0 0 1 185 150" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.45" stroke-linecap="round"/>

    <circle cx="${cx}" cy="${cy}" r="57.5" fill="none" stroke="url(#caseBevelGrad)" stroke-width="1.4"/>
    <circle cx="${cx}" cy="${cy}" r="56.5" fill="none" stroke="#000" stroke-width="0.8" opacity="0.3"/>
  `;
}

// 6. Cartier Santos
function getCartierSantosSvg(mat) {
  const screws = [
    { x: 106, y: 125, angle: 30 },
    { x: 174, y: 125, angle: 75 },
    { x: 106, y: 257, angle: 120 },
    { x: 174, y: 257, angle: 45 },
    { x: 74,  y: 160, angle: 15 },
    { x: 74,  y: 222, angle: 90 },
    { x: 206, y: 160, angle: 60 },
    { x: 206, y: 222, angle: 135 },
  ];

  const screwSvg = screws.map(s => `
    <g transform="translate(${s.x}, ${s.y}) rotate(${s.angle})">
      <circle cx="0" cy="0" r="2.2" fill="${mat.screwFill}" stroke="${mat.screwSlot}" stroke-width="0.6"/>
      <line x1="-1.6" y1="0" x2="1.6" y2="0" stroke="${mat.screwSlot}" stroke-width="0.7"/>
    </g>
  `).join('');

  return `
    <rect x="56" y="98" width="168" height="190" rx="30" fill="#000" opacity="0.24" filter="blur(7px)" transform="translate(0, 5)"/>
    
    <rect x="58" y="98" width="164" height="188" rx="28" fill="url(#caseMetalGrad)" stroke="url(#caseBevelGrad)" stroke-width="1.4"/>
    
    <path d="M 58 126 C 56 160 56 224 58 258 L 62 254 C 60 224 60 160 62 130 Z" fill="url(#caseBevelGrad)"/>
    <path d="M 222 126 C 224 160 224 224 222 258 L 218 254 C 220 224 220 160 218 130 Z" fill="url(#caseBevelGrad)"/>

    <g transform="translate(220, 181)">
      <polygon points="0,3 0,17 7,19 12,14 12,6 7,1" fill="${mat.crownMetal}" stroke="#000" stroke-opacity="0.25" stroke-width="0.8"/>
      <circle cx="9" cy="10" r="3.6" fill="url(#cabochonGrad)" stroke="#1A237E" stroke-width="0.7"/>
      <ellipse cx="8" cy="8.5" rx="1.5" ry="0.8" fill="#FFFFFF" opacity="0.7" transform="rotate(-30, 8, 8.5)"/>
    </g>

    <rect x="67" y="118" width="146" height="146" rx="22" fill="url(#caseMetalGrad)" stroke="url(#caseBevelGrad)" stroke-width="2.2"/>
    
    ${screwSvg}

    <rect x="79" y="130" width="122" height="122" rx="16" fill="none" stroke="url(#caseBevelGrad)" stroke-width="1.8"/>
    <rect x="80" y="131" width="120" height="120" rx="15" fill="none" stroke="#000" stroke-width="0.8" opacity="0.3"/>
  `;
}

// ── DYNAMIC DIAL MARKERS GENERATOR ─────────────
function getHourMarkersSvg(style, markerColor) {
  let s = style;
  if (s === 'round')   s = 'diver';
  if (s === 'square')  s = 'roman';
  if (s === 'classic') s = 'baton';

  const lumeColor = '#E8FFF0';
  const lumeBorder = markerColor || '#8B7355';

  if (s === 'diver') {
    // Rolex Submariner Maxi Lume Dial
    let svg = `
      <!-- 12h Inverted Triangle -->
      <polygon points="${cx - 7},141 ${cx + 7},141 ${cx},153" fill="${lumeColor}" stroke="${lumeBorder}" stroke-width="1.3"/>
      <!-- 6h & 9h Luminous Rectangular Batons -->
      <rect x="${cx - 2.5}" y="228" width="5" height="12" rx="1.5" fill="${lumeColor}" stroke="${lumeBorder}" stroke-width="1.3"/>
      <rect x="88" y="${cy - 2.5}" width="12" height="5" rx="1.5" fill="${lumeColor}" stroke="${lumeBorder}" stroke-width="1.3"/>
    `;

    // 1, 2, 4, 5, 7, 8, 10, 11 Maxi Dots
    const dots = [1, 2, 4, 5, 7, 8, 10, 11];
    dots.forEach(h => {
      const rad = (h * 30 - 90) * (Math.PI / 180);
      const x = (cx + 46.5 * Math.cos(rad)).toFixed(2);
      const y = (cy + 46.5 * Math.sin(rad)).toFixed(2);
      svg += `<circle cx="${x}" cy="${y}" r="3.6" fill="${lumeColor}" stroke="${lumeBorder}" stroke-width="1.3"/>`;
    });
    return svg;
  }

  if (s === 'roman') {
    // Classic Roman Numerals
    const numerals = [
      { h: 12, text: 'XII', r: 46 },
      { h: 1,  text: 'I',   r: 46 },
      { h: 2,  text: 'II',  r: 46 },
      { h: 4,  text: 'IV',  r: 46 },
      { h: 5,  text: 'V',   r: 46 },
      { h: 6,  text: 'VI',  r: 46 },
      { h: 7,  text: 'VII', r: 46 },
      { h: 8,  text: 'VIII',r: 46 },
      { h: 9,  text: 'IX',  r: 46 },
      { h: 10, text: 'X',   r: 46 },
      { h: 11, text: 'XI',  r: 46 },
    ];

    let svg = `<g font-family="'Cormorant Garamond', Georgia, serif" font-size="9.5" font-weight="600" fill="${lumeBorder}" text-anchor="middle" dominant-baseline="central">`;
    numerals.forEach(n => {
      const rad = (n.h * 30 - 90) * (Math.PI / 180);
      const x = (cx + n.r * Math.cos(rad)).toFixed(2);
      const y = (cy + n.r * Math.sin(rad)).toFixed(2);
      svg += `<text x="${x}" y="${y}">${n.text}</text>`;
    });
    svg += `</g>`;
    return svg;
  }

  // Default / Baton style (Patek Nautilus / Royal Oak minimalist faceted indices)
  let svg = `
    <!-- 12h Double Baton -->
    <line x1="${cx - 3}" y1="139" x2="${cx - 3}" y2="151" stroke="${lumeBorder}" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="${cx + 3}" y1="139" x2="${cx + 3}" y2="151" stroke="${lumeBorder}" stroke-width="2.2" stroke-linecap="round"/>
  `;

  for (let h = 1; h <= 11; h++) {
    if (h === 3) continue; // date window
    const rad = (h * 30 - 90) * (Math.PI / 180);
    const r1 = 44, r2 = 53;
    const x1 = (cx + r1 * Math.cos(rad)).toFixed(2);
    const y1 = (cy + r1 * Math.sin(rad)).toFixed(2);
    const x2 = (cx + r2 * Math.cos(rad)).toFixed(2);
    const y2 = (cy + r2 * Math.sin(rad)).toFixed(2);
    const sw = (h === 6 || h === 9) ? '2.4' : '1.8';
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${lumeBorder}" stroke-width="${sw}" stroke-linecap="round"/>`;
  }
  return svg;
}

// ── UPDATE CASE & DIAL GEOMETRY ────────────────
function updateCaseGeometry() {
  const defsEl = document.getElementById('watchDefs');
  const caseLayer = document.getElementById('caseLayer');
  const mat = CASE_MATERIALS[state.case] || CASE_MATERIALS.silver;

  let shapeKey = state.shape;
  if (shapeKey === 'round') shapeKey = 'rolex-datejust';
  if (shapeKey === 'cushion') shapeKey = 'patek-nautilus';
  if (shapeKey === 'rectangular') shapeKey = 'cartier-santos';

  // 1. Update defs (Gradients + strict clipPath)
  if (defsEl) {
    defsEl.innerHTML = getCaseDefs(state.case, state.dial, shapeKey);
  }

  // 2. Select & inject model SVG
  let modelSvg = '';
  switch (shapeKey) {
    case 'rolex-submariner':
      modelSvg = getRolexSubmarinerSvg(mat);
      break;
    case 'patek-nautilus':
      modelSvg = getPatekNautilusSvg(mat);
      break;
    case 'ap-royaloak':
      modelSvg = getApRoyalOakSvg(mat);
      break;
    case 'patek-calatrava':
      modelSvg = getPatekCalatravaSvg(mat);
      break;
    case 'cartier-santos':
      modelSvg = getCartierSantosSvg(mat);
      break;
    case 'rolex-datejust':
    default:
      modelSvg = getRolexDatejustSvg(mat);
      break;
  }

  if (caseLayer) {
    caseLayer.innerHTML = modelSvg;
  }

  // 3. Dial background & ring positioning — STRICTLY LOCKED TO CASE APERTURE
  const dialBg = document.getElementById('dialBg');
  const dialRing = document.getElementById('dialRing');

  if (shapeKey === 'cartier-santos') {
    // Cartier Santos squircle dial
    if (dialBg) {
      dialBg.setAttribute('x', '80');
      dialBg.setAttribute('y', '131');
      dialBg.setAttribute('width', '120');
      dialBg.setAttribute('height', '120');
      dialBg.setAttribute('rx', '15');
    }
    if (dialRing) {
      dialRing.setAttribute('x', '84');
      dialRing.setAttribute('y', '135');
      dialRing.setAttribute('width', '112');
      dialRing.setAttribute('height', '112');
      dialRing.setAttribute('rx', '12');
    }
  } else if (shapeKey === 'patek-nautilus') {
    // Patek Nautilus rounded-octagon dial
    if (dialBg) {
      dialBg.setAttribute('x', '78');
      dialBg.setAttribute('y', '131');
      dialBg.setAttribute('width', '124');
      dialBg.setAttribute('height', '120');
      dialBg.setAttribute('rx', '24');
    }
    if (dialRing) {
      dialRing.setAttribute('x', '82');
      dialRing.setAttribute('y', '135');
      dialRing.setAttribute('width', '116');
      dialRing.setAttribute('height', '112');
      dialRing.setAttribute('rx', '20');
    }
  } else {
    // All Round Models (Submariner, Datejust, Royal Oak, Calatrava) -> ALWAYS PERFECT CIRCLE!
    if (dialBg) {
      dialBg.setAttribute('x', '83.5');
      dialBg.setAttribute('y', '134.5');
      dialBg.setAttribute('width', '113');
      dialBg.setAttribute('height', '113');
      dialBg.setAttribute('rx', '999');
    }
    if (dialRing) {
      dialRing.setAttribute('x', '87.5');
      dialRing.setAttribute('y', '138.5');
      dialRing.setAttribute('width', '105');
      dialRing.setAttribute('height', '105');
      dialRing.setAttribute('rx', '999');
    }
  }

  // 4. Toggle Cyclops Date Magnifier (Rolex models)
  const cyclopsLens = document.getElementById('cyclopsLens');
  if (cyclopsLens) {
    const isRolex = (shapeKey === 'rolex-datejust' || shapeKey === 'rolex-submariner');
    cyclopsLens.style.display = isRolex ? 'block' : 'none';
  }
}

// ── INIT ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  updateWatch();

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Burger menu
  const burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.toggle('open');
    });
  }

  // Close mobile menu on nav link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.remove('open');
    });
  });

  // Intersection observer for reveal animations
  observeElements();

  // Start live clock (hands real time)
  startClock();
});

// ── SELECT OPTION ──────────────────────────────
function selectOption(type, value) {
  let mappedValue = value;
  if (type === 'shape') {
    if (value === 'round') mappedValue = 'rolex-datejust';
    if (value === 'cushion') mappedValue = 'patek-nautilus';
    if (value === 'rectangular') mappedValue = 'cartier-santos';

    // Smart default marker adaptation per watch model
    if (mappedValue === 'rolex-submariner') {
      state.dialFace = 'diver';
    } else if (mappedValue === 'cartier-santos') {
      state.dialFace = 'roman';
    } else if (mappedValue === 'patek-nautilus' || mappedValue === 'ap-royaloak') {
      state.dialFace = 'baton';
    } else if (mappedValue === 'rolex-datejust') {
      state.dialFace = 'roman';
    }

    // Sync dialFace buttons in UI
    document.querySelectorAll('[id^="dialFace-"]').forEach(btn => {
      const isAct = (btn.id === `dialFace-${state.dialFace}`);
      btn.classList.toggle('active', isAct);
    });
    const dfBadge = document.getElementById('dialFaceBadge');
    if (dfBadge) dfBadge.textContent = LABELS.dialFace[state.dialFace];
  }

  if (type === 'dialFace') {
    if (value === 'round')   mappedValue = 'diver';
    if (value === 'square')  mappedValue = 'roman';
    if (value === 'classic') mappedValue = 'baton';
  }

  state[type] = mappedValue;

  // Update active button states
  document.querySelectorAll(`[id^="${type}-"]`).forEach(btn => {
    const isThis = (btn.id === `${type}-${mappedValue}` || btn.id === `${type}-${value}`);
    btn.classList.toggle('active', isThis);
  });

  // Update badge
  const badge = document.getElementById(`${type}Badge`);
  if (badge) {
    badge.textContent = LABELS[type][mappedValue] || LABELS[type][value];
  }

  // Update info card
  updateInfoCard();

  // Animate & repaint watch
  animateWatch();
  updateWatch();

  // Notification
  const typeLabel = {
    case: 'Материал корпуса',
    dial: 'Циферблат',
    strap: 'Ремешок',
    shape: 'Модель корпуса',
    dialFace: 'Разметка циферблата',
  };
  const labelText = LABELS[type][mappedValue] || LABELS[type][value];
  showNotification('✓', 'Параметр обновлён', `${typeLabel[type] || type}: ${labelText}`);
}

// ── UPDATE WATCH SVG ───────────────────────────
function updateWatch() {
  const d = DIAL_COLORS[state.dial];
  const s = STRAP_COLORS[state.strap];

  // 1. Update Case Geometry & Shaders
  updateCaseGeometry();

  // 2. Update Dial Elements & Markers
  const dialBg        = document.getElementById('dialBg');
  const dialRing      = document.getElementById('dialRing');
  const dialInnerRing = document.getElementById('dialInnerRing');
  const dialBrand     = document.getElementById('dialBrand');
  const dialSub       = document.getElementById('dialSub');
  const dateWindow    = document.getElementById('dateWindow');
  const hourMarkers   = document.getElementById('hourMarkers');
  const hourHand      = document.getElementById('hourHand');
  const minuteHand    = document.getElementById('minuteHand');
  const secondHand    = document.getElementById('secondHand');
  const secondBalance = document.getElementById('secondBalance');
  const centerCap     = document.querySelector('#dialLayer circle[r="5"]');
  const centerDot     = document.querySelector('#dialLayer circle[r="2"]');

  if (dialBg)        dialBg.setAttribute('fill', d.bg);
  if (dialRing)      dialRing.setAttribute('stroke', d.ring);
  if (dialInnerRing) dialInnerRing.setAttribute('stroke', d.ring);
  if (dialBrand)     dialBrand.setAttribute('fill', d.brand);
  if (dialSub)       dialSub.setAttribute('fill', d.sub);
  if (dateWindow) {
    dateWindow.setAttribute('fill', d.dateWindow);
    dateWindow.setAttribute('stroke', d.dateBorder);
    const dateText = dateWindow.nextElementSibling;
    if (dateText) dateText.setAttribute('fill', d.dateText);
  }

  // Dynamic Markers (Submariner Diver Lume Dots / Roman / Batons)
  if (hourMarkers) {
    hourMarkers.innerHTML = getHourMarkersSvg(state.dialFace, d.markers);
  }

  if (hourHand)      hourHand.setAttribute('stroke', d.hourHand);
  if (minuteHand)    minuteHand.setAttribute('stroke', d.minHand);
  if (secondHand)    secondHand.setAttribute('stroke', d.secHand);
  if (secondBalance) secondBalance.setAttribute('stroke', d.secHand);
  if (centerCap)     centerCap.setAttribute('fill', d.center);
  if (centerDot)     centerDot.setAttribute('fill', d.centerDot);

  // 3. Update Strap Elements
  const strapTop    = document.getElementById('strapTop');
  const strapBottom = document.getElementById('strapBottom');
  const claspBg     = document.getElementById('claspBg');
  const claspPin    = document.getElementById('claspPin');

  if (strapTop)    strapTop.setAttribute('fill', s.main);
  if (strapBottom) strapBottom.setAttribute('fill', s.main);
  if (claspBg)     claspBg.setAttribute('fill', s.clasp);
  if (claspPin)    claspPin.setAttribute('fill', s.pin);

  updateStrapTexture(s, state.strap === 'steel');
}

function updateStrapTexture(s, isSteel) {
  const topTexture    = document.getElementById('strapTopTexture');
  const bottomTexture = document.getElementById('strapBottomTexture');

  if (isSteel) {
    const strokeColor = '#D8D8D8';
    [topTexture, bottomTexture].forEach(el => {
      if (el) {
        el.setAttribute('opacity', '0.65');
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
  if (!svg) return;
  svg.classList.remove('animating');
  void svg.offsetWidth; // reflow
  svg.classList.add('animating');
  setTimeout(() => svg.classList.remove('animating'), 400);
}

// ── INFO CARD UPDATE ───────────────────────────
function updateInfoCard() {
  const infoCase = document.getElementById('infoCase');
  const infoDial = document.getElementById('infoDial');
  const infoStrap = document.getElementById('infoStrap');
  const infoShape = document.getElementById('infoShape');
  const infoDialFace = document.getElementById('infoDialFace');

  if (infoCase)     infoCase.textContent     = LABELS.case[state.case];
  if (infoDial)     infoDial.textContent     = LABELS.dial[state.dial];
  if (infoStrap)    infoStrap.textContent    = LABELS.strap[state.strap];
  if (infoShape)    infoShape.textContent    = LABELS.shape[state.shape];
  if (infoDialFace) infoDialFace.textContent = LABELS.dialFace[state.dialFace];

  const total = calcTotal();
  const priceEl = document.getElementById('totalPrice');
  if (priceEl) {
    priceEl.textContent = formatPrice(total);
    priceEl.classList.remove('bump');
    void priceEl.offsetWidth;
    priceEl.classList.add('bump');
  }
}

function calcTotal() {
  return BASE_PRICE
    + (PRICES.case[state.case] || 0)
    + (PRICES.dial[state.dial] || 0)
    + (PRICES.strap[state.strap] || 0)
    + (PRICES.shape[state.shape] || 0)
    + (PRICES.dialFace[state.dialFace] || 0);
}

function formatPrice(n) {
  return n.toLocaleString('ru-KZ') + ' ₸';
}

// ── SAVE DESIGN ────────────────────────────────
function saveDesign() {
  const total = calcTotal();

  const mCase = document.getElementById('modalCase');
  const mDial = document.getElementById('modalDial');
  const mStrap = document.getElementById('modalStrap');
  const mShape = document.getElementById('modalShape');
  const mDialFace = document.getElementById('modalDialFace');
  const mTotal = document.getElementById('modalTotal');

  if (mCase)     mCase.textContent     = LABELS.case[state.case];
  if (mDial)     mDial.textContent     = LABELS.dial[state.dial];
  if (mStrap)    mStrap.textContent    = LABELS.strap[state.strap];
  if (mShape)    mShape.textContent    = LABELS.shape[state.shape];
  if (mDialFace) mDialFace.textContent = LABELS.dialFace[state.dialFace];
  if (mTotal)    mTotal.textContent    = formatPrice(total);

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
  state.shape    = 'rolex-datejust';
  state.dialFace = 'roman';

  const defaults = {
    case: 'silver',
    dial: 'ivory',
    strap: 'brown',
    shape: 'rolex-datejust',
    dialFace: 'roman',
  };

  ['case', 'dial', 'strap', 'shape', 'dialFace'].forEach(type => {
    document.querySelectorAll(`[id^="${type}-"]`).forEach(btn => {
      btn.classList.toggle('active', btn.id === `${type}-${defaults[type]}`);
    });
    const badge = document.getElementById(`${type}Badge`);
    if (badge) badge.textContent = LABELS[type][defaults[type]];
  });

  updateInfoCard();
  animateWatch();
  updateWatch();

  showNotification('↺', 'Настройки сброшены', 'Установлена базовая комплектация: Rolex Datejust');
}

// ── NOTIFICATION ───────────────────────────────
let notifTimer = null;

function showNotification(icon, title, body) {
  const el  = document.getElementById('notification');
  const iEl = document.getElementById('notifIcon');
  const tEl = document.getElementById('notifTitle');
  const bEl = document.getElementById('notifBody');

  if (!el || !iEl || !tEl || !bEl) return;

  iEl.textContent = icon;
  tEl.textContent = title;
  bEl.textContent = body;
  el.classList.add('show');

  if (notifTimer) clearTimeout(notifTimer);
  notifTimer = setTimeout(closeNotification, 3200);
}

function closeNotification() {
  const el = document.getElementById('notification');
  if (el) el.classList.remove('show');
}

// ── LIVE CLOCK (Second, Minute, Hour Hands) ────
function startClock() {
  function tick() {
    const now = new Date();
    const s = now.getSeconds() + now.getMilliseconds() / 1000;
    const m = now.getMinutes() + s / 60;
    const h = (now.getHours() % 12) + m / 60;

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
      secHand.setAttribute('x2', sPos.x.toFixed(2));
      secHand.setAttribute('y2', sPos.y.toFixed(2));
    }
    if (secBalance) {
      const sBal = handCoords(s * 6 + 180, 12);
      secBalance.setAttribute('x2', sBal.x.toFixed(2));
      secBalance.setAttribute('y2', sBal.y.toFixed(2));
    }
    if (minHand) {
      minHand.setAttribute('x2', mPos.x.toFixed(2));
      minHand.setAttribute('y2', mPos.y.toFixed(2));
    }
    if (hrHand) {
      hrHand.setAttribute('x2', hPos.x.toFixed(2));
      hrHand.setAttribute('y2', hPos.y.toFixed(2));
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
