// ===================================================================
// Stark Kitchen — Meal Protocol
// Data model note: DAY_PLANS is indexed by JS Date.getDay() (0=Sun..6=Sat)
// ===================================================================

const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
// Display order for the Week tab (Monday first, matching the original plan doc)
const WEEK_ORDER = [1,2,3,4,5,6,0];

const DAY_ICONS = ['🍳','🥔','🥬','🥘','🌱','🫘','🍤'];

const DAY_PLANS = {
  1: { // Monday
    icon: '🥔',
    subtitle: 'Vegetable curry day',
    protein: ['Eggs', 'Vegetables'],
    breakfast: 'Leftover Sunday Egg Curry + Plain Dosa — Filter Coffee / Tea',
    curry: {
      name: 'Potato & Tomato Kurma or Mixed Vegetable Sagu',
      method: 'Kurma: potato, tomato, onion, coconut paste, fennel, whole spices. Sagu: mixed vegetables in coconut-poppy seed gravy, South Indian style.',
      note: 'Use whichever vegetables are freshest that day. Cook enough for lunch, dinner, and Tuesday morning.'
    },
    poriyal: {
      name: 'Avarakkai (Broad Beans) Stir-fry',
      method: 'Chop, boil lightly, temper with mustard, curry leaves, dry red chilli, grated coconut.',
      note: 'Very high fibre, tasty, and family-friendly.'
    },
    lunch: 'Rajmudi Rice + Vegetable Kurma/Sagu + Avarakkai Poriyal + Rasam + Curd + Papad',
    dinner: 'Chapati (3) + same Kurma/Sagu + Salad',
    tonight: 'Soak Kala Chana overnight — needed for Wednesday\'s curry'
  },
  2: { // Tuesday
    icon: '🥬',
    subtitle: 'Vegetable curry day',
    protein: ['Eggs', 'Vegetables'],
    breakfast: 'Leftover Monday Kurma/Sagu + Plain Dosa — Filter Coffee / Tea',
    curry: {
      name: 'Chow Chow & Chana Dal Kootu',
      method: 'Cube chow chow, cook with chana dal, coconut paste, cumin, pepper — South Indian kootu style. No overnight soaking needed.',
      note: 'Vegetable + lentil combo with protein and fibre without being heavy.'
    },
    poriyal: {
      name: 'Carrot & Beans Stir-fry',
      method: 'Julienne carrot and beans, temper with mustard, urad dal, curry leaves, grated coconut.',
      note: 'High fibre, colourful, easy to cook — good for digestion.'
    },
    lunch: 'Rajmudi Rice + Chow Chow Kootu + Carrot Beans Poriyal + Sambar + Curd + Papad',
    dinner: 'Chapati (3) + same Chow Chow Kootu + Egg Bhurji (scrambled eggs with onion, tomato, green chilli)',
    tonight: null
  },
  3: { // Wednesday
    icon: '🥘',
    subtitle: 'Legume curry day — Kala Chana',
    protein: ['Kala Chana', 'Eggs'],
    breakfast: 'Leftover Chow Chow Kootu + Plain Dosa or Set Dosa — Filter Coffee / Tea',
    curry: {
      name: 'Kala Chana Curry',
      method: 'Soaked overnight, pressure cooked, tempered with mustard, curry leaves, onion, tomato, grated coconut, South Indian spices.',
      note: 'Black chickpeas are very high protein and iron — excellent for muscle building and energy.'
    },
    poriyal: {
      name: 'Ivy Gourd (Kovakkai) Stir-fry',
      method: 'Slice thin, dry roast with mustard, red chilli powder, curry leaves, coconut.',
      note: 'Great for blood sugar regulation and digestion — very tasty dry stir-fry.'
    },
    lunch: 'Rajmudi Rice + Kala Chana Curry + Kovakkai Poriyal + Rasam + Curd + Papad',
    dinner: 'Egg Dosa (3 — egg cracked on dosa, folded) + Tomato Chutney + leftover Kala Chana Curry',
    tonight: 'Soak Rajma overnight — needed for Friday\'s curry'
  },
  4: { // Thursday
    icon: '🌱',
    subtitle: 'Vegetable / Soya curry day',
    protein: ['Soya Chunks', 'Eggs'],
    breakfast: 'Leftover Kala Chana Curry + Plain Dosa — Filter Coffee / Tea',
    curry: {
      name: 'Soya Chunk Masala or Brinjal (Ennai Kathirikai) Curry',
      method: 'Soya: soak chunks 20 mins in hot water, cook in thick onion-tomato-spice gravy. Brinjal: small brinjals slit and cooked in tamarind-onion-tomato gravy.',
      note: 'Soya is the highest plant protein. Use brinjal alternate if that feels right or is freshest.'
    },
    poriyal: {
      name: 'Yam (Senaikizhangu) Fry',
      method: 'Cube, parboil, dry roast with red chilli, mustard, curry leaves, coconut.',
      note: 'Better complex carb than potato — good sustained energy and high fibre.'
    },
    lunch: 'Rajmudi Rice + Soya/Brinjal Curry + Yam Fry + Sambar + Curd + Papad',
    dinner: 'Chapati (3) + same curry + Palak Dal (spinach + toor dal — quick to cook, iron + protein rich)',
    tonight: null
  },
  5: { // Friday
    icon: '🫘',
    subtitle: 'Legume curry day — Rajma',
    protein: ['Rajma', 'Eggs'],
    breakfast: 'Leftover Thursday curry + Plain Dosa or Pesarattu — Filter Coffee / Tea',
    curry: {
      name: 'Rajma Curry',
      method: 'Soaked overnight, pressure cooked, thick onion-tomato gravy, garnish with coriander.',
      note: 'Protein + fibre packed — one of the best plant proteins for muscle building and heart health.'
    },
    poriyal: {
      name: 'Cluster Beans (Goru Kaya / Kothavarangai) Stir-fry',
      method: 'Chop, temper with mustard, urad dal, red chilli, grated coconut. Use snake gourd or capsicum if cluster beans are unavailable.',
      note: 'Extremely high fibre, slightly nutty in taste.'
    },
    lunch: 'Rajmudi Rice + Rajma Curry + Cluster Beans Poriyal + Rasam + Curd + Papad',
    dinner: 'Appam (3 — dosa batter + coconut milk) + Vegetable Stew (potato, carrot, peas in thin coconut milk) + leftover Rajma',
    tonight: 'Buy fish and/or prawns fresh tonight or tomorrow morning for Saturday'
  },
  6: { // Saturday
    icon: '🍤',
    subtitle: 'Fresh Fish & Prawn day — buy fresh, cook fresh, eat fresh',
    protein: ['Fish or Prawns'],
    breakfast: 'Leftover Rajma Curry + Masala Dosa or Plain Dosa — Filter Coffee / Tea',
    curry: {
      name: 'Prawn Pepper Masala or Meen Kulambu',
      method: 'Choose one based on what was purchased. Prawn: dry masala with pepper, curry leaves, small onions, coconut oil. Fish: tamarind base, tomato, curry leaves.',
      note: 'Buy only what is needed for Saturday. No storing for other days.'
    },
    poriyal: {
      name: 'Capsicum & Onion Stir-fry or Brinjal Fry',
      method: 'Both pair well with fish or prawn curry — use whichever is available.',
      note: null
    },
    lunch: 'Rajmudi Rice + Fish/Prawn Curry + Poriyal + Onion Raita + Papad',
    dinner: 'Chapati (3) + same Fish/Prawn Curry + Stir-fried Spinach or Methi (quick saute with garlic)',
    tonight: null
  },
  0: { // Sunday
    icon: '🍳',
    subtitle: 'Nanny off — Simple egg-only cooking',
    warning: 'No fish or prawn cooking today. Keep it simple — eggs + dosa + dal only.',
    protein: ['Eggs', 'Moong Dal'],
    breakfast: 'Uthappam (3 thick dosas with onion, tomato on top) + leftover Saturday fish curry if any, or coconut chutney — Filter Coffee / Tea',
    curry: {
      name: 'Egg Curry',
      method: 'Boil eggs, make simple coconut-tomato gravy with curry leaves, mustard, small onions.',
      note: 'Simple 30-minute dish — easy to manage without nanny.'
    },
    poriyal: {
      name: 'Moong Dal (simple)',
      method: 'Pressure cook, temper with mustard, cumin, ghee, dry red chilli.',
      note: 'No soaking needed — very fast.'
    },
    lunch: 'Rajmudi Rice + Egg Curry + Moong Dal + Curd + Papad',
    dinner: 'Lemon Rice (leftover Rajmudi rice + lemon + mustard tempering) + Egg Omelette (onion, green chilli, coriander) + leftover Egg Curry',
    tonight: null
  }
};

const BASE_CHECKLIST = [
  { id: 'soak', label: 'Check tonight\'s soaking schedule — soak legume if needed for day after tomorrow' },
  { id: 'sambar', label: 'Make sambar fresh (enough for 2 meals — bulk is fine)' },
  { id: 'curry', label: 'Make one fresh curry in the afternoon — enough for lunch + dinner + next morning' },
  { id: 'poriyal', label: 'Make one poriyal fresh at lunch time' },
  { id: 'rice', label: 'Use Rajmudi Red Rice — not white rice' }
];

const VEGETABLES = [
  { name: 'Tomatoes, Onions, Garlic, Ginger', used: 'Curry base — every single day' },
  { name: 'Avarakkai (Broad Beans)', used: 'Monday poriyal — high fibre, very tasty' },
  { name: 'Potato, Carrot, Beans, Peas', used: 'Monday Kurma / Friday Stew' },
  { name: 'Chow Chow (Chayote)', used: 'Tuesday kootu' },
  { name: 'Carrot, Beans', used: 'Tuesday poriyal' },
  { name: 'Ivy Gourd (Kovakkai)', used: 'Wednesday poriyal' },
  { name: 'Yam (Senaikizhangu)', used: 'Thursday poriyal' },
  { name: 'Brinjal (small variety)', used: 'Thursday curry alternate' },
  { name: 'Cluster Beans (Goru Kaya / Kothavarangai)', used: 'Friday poriyal — highest fibre' },
  { name: 'Spinach (Palak) / Methi', used: 'Thursday dinner dal + Saturday dinner greens' },
  { name: 'Drumstick (Murungakkai)', used: 'Sambar — use weekly' },
  { name: 'Capsicum', used: 'Saturday poriyal + occasional use' },
  { name: 'Cucumber', used: 'Daily salad' },
  { name: 'Snake Gourd', used: 'Occasional alternate poriyal' },
  { name: 'Corn, Groundnuts', used: 'Evening snacks' }
];

const SOAK_SCHEDULE = [
  { legume: 'Kala Chana (Black Chickpeas)', cookDay: 'Wednesday', soakNight: 'Monday night', soakDow: [1] },
  { legume: 'Rajma (Red Kidney Beans)', cookDay: 'Friday', soakNight: 'Wednesday night', soakDow: [3] },
  { legume: 'Chana Dal (for Kootu)', cookDay: 'Tuesday', soakNight: 'No overnight soaking needed', soakDow: [] },
  { legume: 'Moong Dal', cookDay: 'Sunday', soakNight: 'No soaking needed', soakDow: [] }
];

const PANTRY = [
  'Rajmudi Red Rice',
  'Dosa batter (fresh or store-bought — no idli ever)',
  'Toor Dal, Moong Dal, Chana Dal, Urad Dal',
  'Soya chunks (for Thursday curry)',
  'Tamarind block, Mustard seeds, Curry leaves, Dry red chillies',
  'Fresh coconut (grated) or frozen coconut',
  'Sambar powder, Rasam powder, Chettinad masala, Pepper powder',
  'Coconut milk tetra pack (for Friday stew + Appam)',
  'Ghee (small amount — dal tadka, tempering)',
  'Groundnuts, Corn (evening snacks)'
];

const RULES = [
  { icon: '☀️', text: 'Mornings: no fresh cooking. Serve yesterday\'s leftover curry with dosa or chapati' },
  { icon: '🍛', text: 'Afternoons: cook one fresh curry + one fresh poriyal. This serves lunch, dinner, and next morning' },
  { icon: '🍚', text: 'Rice: always Rajmudi Red Rice — healthy, low GI, fibre-rich' },
  { icon: '🚫', text: 'No idli ever — dosa batter only (plain dosa, set dosa, uthappam, egg dosa, masala dosa, appam)' },
  { icon: '🥘', text: 'Curry variety: mostly vegetable-based curries. Legumes only 2 days a week. Eggs and soya rotated in' },
  { icon: '🐟', text: 'Fish & Prawns bought fresh Saturday only — cooked Saturday, eaten fresh. No fish any other day' },
  { icon: '☀️', text: 'Sunday: Nanny off — simple egg-only cooking, no fish, no heavy prep' },
  { icon: '🫘', text: 'Soaking reminders appear in the previous night\'s notes wherever legumes are needed next day' },
  { icon: '💪', text: 'High protein plan for active family — vegetables, eggs, legumes, soya, fish/prawns, and Rajmudi rice' }
];

const HEALTH_NOTES = [
  'Rajmudi Red Rice has more protein, fibre and iron than white rice — always use this',
  'Legumes only Wednesday and Friday — pressure cook properly after soaking',
  'Do not skip rasam — it aids digestion and absorption of nutrients',
  'Minimal oil — use coconut oil or cold-pressed groundnut oil only',
  'Fresh coconut in small amounts in poriyal and chutney is healthy — don\'t remove it',
  'Eggs almost every day — complete protein, important for muscle recovery',
  'Soya chunks on Thursday — highest plant protein, excellent post-workout',
  'Fish and prawns on Saturday only — omega-3 fatty acids, lean protein, excellent for heart and muscles',
  'Avarakkai and Cluster Beans are two of the most fibre-rich vegetables in South Indian cooking'
];

// ===================================================================
// State
// ===================================================================

let selectedDate = new Date(); // the date currently shown on the Today view
let editContext = null; // { field: 'breakfast'|'curry'|'poriyal'|'dinner'|'lunch' }

const overrides = JSON.parse(localStorage.getItem('mealOverrides') || '{}');
const checklistState = JSON.parse(localStorage.getItem('cookChecklist') || '{}');
const shoppingState = JSON.parse(localStorage.getItem('shoppingChecklist') || '{}');

function saveOverrides() { localStorage.setItem('mealOverrides', JSON.stringify(overrides)); }
function saveChecklist() { localStorage.setItem('cookChecklist', JSON.stringify(checklistState)); }
function saveShopping() { localStorage.setItem('shoppingChecklist', JSON.stringify(shoppingState)); }

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function isoWeekKey(d) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = (t.getUTCDay() + 6) % 7;
  t.setUTCDate(t.getUTCDate() - day + 3);
  const firstThursday = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((t - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return `${t.getUTCFullYear()}-W${week}`;
}

function getPlan(date) {
  const dow = date.getDay();
  return DAY_PLANS[dow];
}

function getEffective(date) {
  const base = getPlan(date);
  const key = dateKey(date);
  const ov = overrides[key] || {};
  return {
    base,
    breakfast: ov.breakfast != null ? ov.breakfast : base.breakfast,
    curry: ov.curry != null ? ov.curry : base.curry,
    poriyal: ov.poriyal != null ? ov.poriyal : base.poriyal,
    lunch: ov.lunch != null ? ov.lunch : base.lunch,
    dinner: ov.dinner != null ? ov.dinner : base.dinner,
    isFieldOverridden: (field) => ov[field] != null,
    swappedFromDay: ov._swappedFromDay || null,
    hasAnyOverride: Object.keys(ov).length > 0
  };
}

// ===================================================================
// Rendering — Today view
// ===================================================================

function renderTopbar() {
  const now = new Date();
  document.getElementById('topbar-day').textContent = DAY_NAMES[now.getDay()];
  document.getElementById('topbar-date').textContent = `${now.getDate()} ${MONTHS[now.getMonth()].slice(0,3)}`;
}

function renderHero() {
  const dow = selectedDate.getDay();
  const eff = getEffective(selectedDate);
  const base = eff.base;
  const today = new Date();
  const isToday = dateKey(selectedDate) === dateKey(today);

  const badges = base.protein.map(p => `<span class="badge">${p}</span>`).join('');
  const dateLabel = isToday ? 'TODAY' : `${DAY_NAMES[dow].toUpperCase()} · ${selectedDate.getDate()} ${MONTHS[selectedDate.getMonth()].slice(0,3)}`;

  let warnHtml = '';
  if (base.warning) {
    warnHtml = `<div class="warn-banner">⚠️ <span>${base.warning}</span></div>`;
  }

  document.getElementById('hero-card').innerHTML = `
    <div class="day-hero-top">
      <div>
        <div class="day-hero-name hud-font">${base.icon} ${DAY_NAMES[dow]}</div>
        <div class="day-hero-sub">${base.subtitle}</div>
      </div>
      <div class="day-hero-date">${dateLabel}</div>
    </div>
    <div class="protein-badges">${badges}</div>
    ${warnHtml}
  `;

  const flagSlot = document.getElementById('override-flag-slot');
  if (eff.hasAnyOverride) {
    const label = eff.swappedFromDay
      ? `Swapped with ${eff.swappedFromDay}'s plan`
      : 'Plan customised for today';
    flagSlot.innerHTML = `
      <div class="override-flag">
        <span>🟢 ${label}</span>
        <button id="reset-day-btn">↺ Reset Day</button>
      </div>
    `;
    document.getElementById('reset-day-btn').addEventListener('click', () => {
      delete overrides[dateKey(selectedDate)];
      saveOverrides();
      renderAll();
    });
  } else {
    flagSlot.innerHTML = '';
  }
}

function mealCardHtml(tag, field, bodyHtml, overridden) {
  return `
    <div class="hud-card">
      <div class="meal-card-head">
        <div class="meal-tag"><span class="dot"></span>${tag}</div>
        <button class="edit-btn" data-field="${field}">✏️ Swap</button>
      </div>
      ${overridden ? '<span class="custom-tag">✓ Custom</span><br/>' : ''}
      ${bodyHtml}
    </div>
  `;
}

function structuredBody(dish) {
  return `
    <div class="dish-name">${dish.name}</div>
    <div class="dish-method">${dish.method}</div>
    ${dish.note ? `<div class="dish-note">💡 ${dish.note}</div>` : ''}
  `;
}

function renderMealCards() {
  const eff = getEffective(selectedDate);
  let html = '';

  html += mealCardHtml('Breakfast', 'breakfast',
    eff.isFieldOverridden('breakfast')
      ? `<div class="plain-text">${eff.breakfast}</div>`
      : `<div class="plain-text">${eff.breakfast}</div>`,
    eff.isFieldOverridden('breakfast'));

  html += mealCardHtml('Main Curry', 'curry',
    eff.isFieldOverridden('curry') && typeof eff.curry === 'string'
      ? `<div class="plain-text">${eff.curry}</div>`
      : structuredBody(eff.curry),
    eff.isFieldOverridden('curry'));

  html += mealCardHtml('Poriyal / Side', 'poriyal',
    eff.isFieldOverridden('poriyal') && typeof eff.poriyal === 'string'
      ? `<div class="plain-text">${eff.poriyal}</div>`
      : structuredBody(eff.poriyal),
    eff.isFieldOverridden('poriyal'));

  html += mealCardHtml('Lunch Plate', 'lunch',
    `<div class="plain-text">${eff.lunch}</div>`,
    eff.isFieldOverridden('lunch'));

  html += mealCardHtml('Dinner', 'dinner',
    `<div class="plain-text">${eff.dinner}</div>`,
    eff.isFieldOverridden('dinner'));

  document.getElementById('meal-cards').innerHTML = html;

  document.querySelectorAll('#meal-cards .edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(btn.dataset.field));
  });
}

function renderPrepCard() {
  const base = getPlan(selectedDate);
  const slot = document.getElementById('prep-card-slot');
  if (!base.tonight) {
    slot.innerHTML = `<div class="hud-card prep-card"><div class="plain-text" style="color:var(--muted)">Nothing to prep tonight — easy one 🎉</div></div>`;
    return;
  }
  slot.innerHTML = `
    <div class="hud-card prep-card">
      <div class="meal-tag"><span class="dot"></span>Reminder</div>
      <div class="plain-text" style="margin-top:8px;">🫘 ${base.tonight}</div>
    </div>
  `;
}

function renderChecklist() {
  const key = dateKey(selectedDate);
  const dow = selectedDate.getDay();
  const base = getPlan(selectedDate);
  if (!checklistState[key]) checklistState[key] = {};

  const items = [...BASE_CHECKLIST];
  if (dow === 6) items.push({ id: 'fish', label: 'Saturday only: buy fish/prawns fresh, cook same day, no storing' });
  if (dow === 0) items.push({ id: 'sunday-simple', label: 'Keep it simple — egg curry + dal + dosa only. No fish. No heavy cooking.' });

  let doneCount = 0;
  const rows = items.map(item => {
    const done = !!checklistState[key][item.id];
    if (done) doneCount++;
    return `
      <div class="check-row ${done ? 'done' : ''}" data-id="${item.id}">
        <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="#16090a" stroke-width="3"><path d="M4 12l5 5L20 6"/></svg></div>
        <div class="check-label">${item.label}</div>
      </div>
    `;
  }).join('');

  document.getElementById('checklist-slot').innerHTML = rows;
  document.getElementById('check-progress-label').textContent = `${doneCount} / ${items.length} done`;

  document.querySelectorAll('#checklist-slot .check-row').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.dataset.id;
      checklistState[key][id] = !checklistState[key][id];
      saveChecklist();
      renderChecklist();
    });
  });
}

// ===================================================================
// Week view
// ===================================================================

function renderWeekView() {
  const today = new Date();
  const todayKey = dateKey(today);
  let html = '';

  // Build the 7 dates of the current week (Mon-Sun) around "today"
  const mondayOffset = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - mondayOffset);

  WEEK_ORDER.forEach((dow, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dKey = dateKey(d);
    const isToday = dKey === todayKey;
    const eff = getEffective(d);
    const base = eff.base;

    html += `
      <div class="hud-card week-day-card ${eff.hasAnyOverride ? 'overridden' : ''}" data-datekey="${dKey}">
        <div class="wdc-icon">${base.icon}</div>
        <div class="wdc-info">
          <div class="wdc-title">${DAY_NAMES[dow]} ${isToday ? '<span class="today-pill">TODAY</span>' : ''} ${eff.hasAnyOverride ? '<span style="color:var(--success);font-size:0.7rem;">● custom</span>' : ''}</div>
          <div class="wdc-sub">${(typeof eff.curry === 'string' ? eff.curry : eff.curry.name)}</div>
        </div>
        <div class="wdc-arrow">›</div>
      </div>
    `;
  });

  document.getElementById('week-list').innerHTML = html;
  document.querySelectorAll('#week-list .week-day-card').forEach(card => {
    card.addEventListener('click', () => {
      const [y,m,dd] = card.dataset.datekey.split('-').map(Number);
      selectedDate = new Date(y, m-1, dd);
      switchTab('today');
      renderAll();
    });
  });
}

// ===================================================================
// Shopping view
// ===================================================================

function renderShopping() {
  const wk = isoWeekKey(new Date());
  if (!shoppingState[wk]) shoppingState[wk] = {};

  const shopCheckSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="#16090a" stroke-width="3"><path d="M4 12l5 5L20 6"/></svg>';

  const vegHtml = VEGETABLES.map((v, i) => {
    const id = 'veg-' + i;
    const done = !!shoppingState[wk][id];
    return `
      <div class="shop-row ${done ? 'done' : ''}" data-id="${id}">
        <div class="check-box" style="width:20px;height:20px;">${done ? shopCheckSvg : ''}</div>
        <div style="flex:1;">
          <div class="shop-main">${v.name}</div>
          <div class="shop-used">${v.used}</div>
        </div>
      </div>
    `;
  }).join('');
  document.getElementById('veg-list').innerHTML = vegHtml;

  const pantryHtml = PANTRY.map((p, i) => {
    const id = 'pantry-' + i;
    const done = !!shoppingState[wk][id];
    return `
      <div class="shop-row ${done ? 'done' : ''}" data-id="${id}">
        <div class="check-box" style="width:20px;height:20px;">${done ? shopCheckSvg : ''}</div>
        <div class="shop-main">${p}</div>
      </div>
    `;
  }).join('');
  document.getElementById('pantry-list').innerHTML = pantryHtml;

  document.querySelectorAll('#view-shopping .shop-row').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.dataset.id;
      shoppingState[wk][id] = !shoppingState[wk][id];
      saveShopping();
      renderShopping();
    });
  });

  const todayDow = new Date().getDay();
  const soakRows = SOAK_SCHEDULE.map(s => `
    <tr class="${s.soakDow.includes(todayDow) ? 'is-today-row' : ''}">
      <td>${s.legume}</td>
      <td>${s.cookDay}</td>
      <td>${s.soakNight}</td>
    </tr>
  `).join('');
  document.getElementById('soak-table').innerHTML = `
    <tr><th>Legume</th><th>Cook Day</th><th>Soak Night Before</th></tr>
    ${soakRows}
  `;
}

document.getElementById('reset-shopping-btn').addEventListener('click', () => {
  if (confirm('Reset the shopping checklist for a fresh week?')) {
    const wk = isoWeekKey(new Date());
    shoppingState[wk] = {};
    saveShopping();
    renderShopping();
  }
});

// ===================================================================
// Notes view
// ===================================================================

function renderNotes() {
  document.getElementById('rules-list').innerHTML = RULES.map(r => `
    <div class="rule-row"><span class="rule-icon">${r.icon}</span><span>${r.text}</span></div>
  `).join('');

  document.getElementById('health-notes').innerHTML = `<ul>${HEALTH_NOTES.map(n => `<li>${n}</li>`).join('')}</ul>`;
}

// ===================================================================
// Edit / override modals
// ===================================================================

function textOf(field) {
  const eff = getEffective(selectedDate);
  const v = eff[field];
  if (typeof v === 'string') return v;
  return `${v.name}\n${v.method}${v.note ? '\n(' + v.note + ')' : ''}`;
}

function openEditModal(field) {
  editContext = { field };
  const titleMap = { breakfast: 'Breakfast', curry: 'Main Curry', poriyal: 'Poriyal / Side', lunch: 'Lunch Plate', dinner: 'Dinner' };
  document.getElementById('edit-modal-title').textContent = `Override ${titleMap[field]}`;
  document.getElementById('edit-textarea').value = textOf(field);

  // Quick-swap chips: pull the same field from the other 6 days
  const chipRow = document.getElementById('edit-chip-row');
  if (field === 'curry' || field === 'poriyal') {
    let chips = '';
    Object.keys(DAY_PLANS).forEach(dow => {
      const d = DAY_PLANS[dow];
      const dish = d[field];
      if (dish && dish.name) {
        chips += `<span class="chip" data-fill="${dish.name.replace(/"/g,'&quot;')}\n${dish.method.replace(/"/g,'&quot;')}">${DAY_SHORT[dow]}: ${dish.name}</span>`;
      }
    });
    chipRow.innerHTML = chips;
    chipRow.style.display = 'flex';
  } else {
    chipRow.innerHTML = '';
    chipRow.style.display = 'none';
  }
  document.querySelectorAll('#edit-chip-row .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById('edit-textarea').value = chip.dataset.fill;
    });
  });

  const key = dateKey(selectedDate);
  const hasOverride = overrides[key] && overrides[key][field] != null;
  document.getElementById('edit-reset-row').style.display = hasOverride ? 'flex' : 'none';

  document.getElementById('edit-modal').classList.add('active');
}

document.getElementById('edit-cancel').addEventListener('click', () => {
  document.getElementById('edit-modal').classList.remove('active');
});

document.getElementById('edit-save').addEventListener('click', () => {
  const val = document.getElementById('edit-textarea').value.trim();
  if (!val) return;
  const key = dateKey(selectedDate);
  if (!overrides[key]) overrides[key] = {};
  overrides[key][editContext.field] = val;
  saveOverrides();
  document.getElementById('edit-modal').classList.remove('active');
  renderAll();
});

document.getElementById('edit-reset').addEventListener('click', () => {
  const key = dateKey(selectedDate);
  if (overrides[key]) {
    delete overrides[key][editContext.field];
    if (Object.keys(overrides[key]).length === 0) delete overrides[key];
    saveOverrides();
  }
  document.getElementById('edit-modal').classList.remove('active');
  renderAll();
});

document.getElementById('edit-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('active');
});

// Full-day swap modal
document.getElementById('swap-day-open').addEventListener('click', () => {
  const currentDow = selectedDate.getDay();
  let html = '';
  WEEK_ORDER.forEach(dow => {
    if (dow === currentDow) return;
    const d = DAY_PLANS[dow];
    html += `
      <div class="day-option" data-dow="${dow}">
        <div class="do-icon">${d.icon}</div>
        <div>
          <div class="do-name">${DAY_NAMES[dow]}</div>
          <div class="do-sub">${(typeof d.curry === 'string' ? d.curry : d.curry.name)}</div>
        </div>
      </div>
    `;
  });
  document.getElementById('day-swap-options').innerHTML = html;
  document.querySelectorAll('#day-swap-options .day-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const dow = Number(opt.dataset.dow);
      const src = DAY_PLANS[dow];
      const key = dateKey(selectedDate);
      overrides[key] = {
        breakfast: src.breakfast,
        curry: src.curry,
        poriyal: src.poriyal,
        lunch: src.lunch,
        dinner: src.dinner,
        _swappedFromDay: DAY_NAMES[dow]
      };
      saveOverrides();
      document.getElementById('day-swap-modal').classList.remove('active');
      renderAll();
    });
  });
  document.getElementById('day-swap-modal').classList.add('active');
});

document.getElementById('day-swap-cancel').addEventListener('click', () => {
  document.getElementById('day-swap-modal').classList.remove('active');
});
document.getElementById('day-swap-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('active');
});

// ===================================================================
// Tabs
// ===================================================================

function switchTab(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.dataset.tab);
    if (btn.dataset.tab === 'week') renderWeekView();
    if (btn.dataset.tab === 'shopping') renderShopping();
    if (btn.dataset.tab === 'notes') renderNotes();
  });
});

// ===================================================================
// Init
// ===================================================================

function renderAll() {
  renderTopbar();
  renderHero();
  renderMealCards();
  renderPrepCard();
  renderChecklist();
}

renderAll();
renderWeekView();
renderShopping();
renderNotes();

// Register service worker for offline use (skipped on file:// during local testing)
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
