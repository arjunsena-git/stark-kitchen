// ===================================================================
// Stark Kitchen — Meal Protocol
// Data model note: DAY_PLANS is indexed by JS Date.getDay() (0=Sun..6=Sat)
// ===================================================================

const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
// Display order for the Week tab (Monday first, matching the original plan doc)
const WEEK_ORDER = [1,2,3,4,5,6,0];

const DAY_ICONS = ['🍳','🐟','🥘','🥘','🥘','🫓','🍤'];

const DAY_PLANS = {
  1: { // Monday
    icon: '🐟',
    subtitle: 'Fish or Prawn day — cook Saturday\'s refrigerated portion',
    protein: ['Fish / Prawns', 'Eggs'],
    breakfast: 'Leftover curry from Sunday + Plain Dosa — Filter Coffee / Tea',
    curry: {
      name: 'Fish Curry (Meen Kulambu) or Prawn Masala',
      method: 'Whichever was bought Saturday and refrigerated. Cook with onion, tomato, tamarind, curry leaves, mustard, South Indian spices — minimal oil.',
      note: 'High-protein, omega-3 rich — very good for post-workout recovery.'
    },
    poriyal: {
      name: 'Banana Stem (Vazhaithandu) Stir-fry',
      method: 'Chop fine, temper with mustard, curry leaves, green chilli, coconut.',
      note: 'Excellent for digestion and kidney health — use when available.'
    },
    lunch: 'Rajmudi Rice + Fish/Prawn Curry + Banana Stem Poriyal + Rasam + Curd + Papad',
    dinner: 'Chapati (3) + leftover Fish/Prawn Curry + Salad (cucumber, tomato, onion, lemon)',
    tonight: 'Soak Kala Chana (Black Chickpeas) overnight for Tuesday\'s curry'
  },
  2: { // Tuesday
    icon: '🥘',
    subtitle: 'Vegetarian + Eggs',
    protein: ['Kala Chana', 'Eggs'],
    breakfast: 'Plain Dosa + leftover fish curry (if any) or coconut chutney + Sambar — Filter Coffee / Tea',
    curry: {
      name: 'Kala Chana Curry',
      method: 'Soaked overnight, pressure cooked, tempered with mustard, curry leaves, onion, tomato, grated coconut, South Indian spices.',
      note: 'Black chickpeas are very high in protein and iron — ideal for workout days.'
    },
    poriyal: {
      name: 'Carrot & Beans Stir-fry',
      method: 'Julienne carrot and beans, temper with mustard, urad dal, curry leaves, coconut.',
      note: null
    },
    lunch: 'Rajmudi Rice + Kala Chana Curry + Carrot Beans Poriyal + Sambar + Curd + Papad',
    dinner: 'Chapati (3) + leftover Kala Chana Curry + Egg Bhurji (scrambled eggs with onion, tomato, green chilli, coriander)',
    tonight: 'Soak Kabuli Chana (White Chickpeas) overnight for Wednesday\'s curry'
  },
  3: { // Wednesday
    icon: '🥘',
    subtitle: 'Vegetarian + Eggs',
    protein: ['Kabuli Chana', 'Eggs'],
    breakfast: 'Set Dosa (3, soft & spongy — same dosa batter) + Coconut Chutney + Sambar — Filter Coffee / Tea',
    curry: {
      name: 'Kabuli Chana Masala',
      method: 'Soaked overnight, pressure cooked, rich onion-tomato-spice gravy, garnish with coriander.',
      note: 'White chickpeas are very high in plant protein — great for muscle recovery.'
    },
    poriyal: {
      name: 'Chow Chow (Chayote) Stir-fry',
      method: 'Peel and cube, temper with mustard, curry leaves, coconut, green chilli.',
      note: 'Low calorie, high fibre — very heart-friendly.'
    },
    lunch: 'Rajmudi Rice + Kabuli Chana Masala + Chow Chow Poriyal + Rasam + Curd + Papad',
    dinner: 'Egg Dosa (3 — egg cracked on dosa, folded) + Tomato Chutney + leftover Kabuli Chana Masala',
    tonight: 'Soak Rajma (Red Kidney Beans) overnight for Thursday\'s curry'
  },
  4: { // Thursday
    icon: '🥘',
    subtitle: 'Vegetarian + Eggs',
    protein: ['Rajma', 'Eggs'],
    breakfast: 'Plain Dosa + leftover Kabuli Chana Masala or chutney + Sambar — Filter Coffee / Tea',
    curry: {
      name: 'Rajma Curry',
      method: 'Soaked overnight, pressure cooked, thick onion-tomato-spice gravy, garnish with coriander.',
      note: 'Protein + fibre packed — one of the best plant proteins for muscle building.'
    },
    poriyal: {
      name: 'Ivy Gourd (Tindora / Kovakkai) Stir-fry',
      method: 'Slice thin, dry roast with mustard, curry leaves, red chilli powder, coconut.',
      note: 'Great for blood sugar regulation and digestion.'
    },
    lunch: 'Rajmudi Rice + Rajma Curry + Kovakkai Poriyal + Sambar + Curd + Papad',
    dinner: 'Chapati (3) + leftover Rajma + Palak Dal (spinach + toor dal — iron and protein rich, quick to make fresh)',
    tonight: 'Soak Kondakadalai (Brown Chickpeas) overnight for Friday\'s curry'
  },
  5: { // Friday
    icon: '🫓',
    subtitle: 'Vegetarian + Eggs',
    protein: ['Kondakadalai', 'Eggs'],
    breakfast: 'Pesarattu (Moong Dal Dosa — grind moong dal fresh or soak 2 hrs) + Ginger Chutney — Filter Coffee / Tea',
    curry: {
      name: 'Kondakadalai (Brown Chickpea) Curry',
      method: 'Soaked overnight, pressure cooked, South Indian style with coconut, small onions, tomato, tamarind touch, curry leaves.',
      note: 'Brown chickpeas have the highest fibre among legumes — filling and heart-friendly.'
    },
    poriyal: {
      name: 'Yam (Senaikizhangu) Fry',
      method: 'Cube and parboil yam, then dry roast with red chilli, curry leaves, mustard, coconut.',
      note: 'A good complex carb — better than potato for blood sugar.'
    },
    lunch: 'Rajmudi Rice + Kondakadalai Curry + Yam Fry + Rasam + Curd + Papad',
    dinner: 'Appam (3 — dosa batter + coconut milk swirled in) + Vegetable Stew (potato, carrot, beans in thin coconut milk) + leftover Kondakadalai Curry',
    tonight: 'Buy fish/prawns fresh for tomorrow. Soak Kabuli Chana overnight if wanted for Saturday dinner (optional)'
  },
  6: { // Saturday
    icon: '🍤',
    subtitle: 'Fresh Fish & Prawn Day',
    protein: ['Fish or Prawns', 'Eggs'],
    breakfast: 'Masala Dosa (with potato-onion bhaji filling) + Sambar + Coconut Chutney — Filter Coffee / Tea',
    curry: {
      name: 'Prawn Pepper Masala — or — Fish Curry (Meen Kulambu)',
      method: 'Choose one based on what was bought. Prawn: fresh prawns, dry roast with pepper, curry leaves, small onions, coconut oil. Fish: tamarind-based, tomato, curry leaves.',
      note: 'Keep one raw portion in fridge, labelled "Monday" — cook that on Monday.'
    },
    poriyal: {
      name: 'Brinjal (Kathirikai) Fry',
      method: 'Small brinjal, slit and dry roast with red chilli, mustard, curry leaves — no oil frying.',
      note: null
    },
    lunch: 'Rajmudi Rice + Fish or Prawn Curry + Brinjal Fry + Onion Raita + Papad',
    dinner: 'Chapati (3) + leftover Fish/Prawn Curry + Stir-fried Greens (spinach or methi with garlic, quick sauté)',
    tonight: 'Soak Kala Chana overnight for Monday (nanny back, cook Monday\'s curry)'
  },
  0: { // Sunday
    icon: '🍳',
    subtitle: 'Nanny off — Simple egg-only cooking',
    warning: 'No fish or prawn cooking today. Keep it simple — eggs + dosa + dal only.',
    protein: ['Eggs', 'Moong Dal'],
    breakfast: 'Uthappam (3 thick dosas with onion, tomato, capsicum on top) + Coconut Chutney — Filter Coffee / Tea',
    curry: {
      name: 'Egg Curry',
      method: 'Boil eggs, make simple coconut-tomato gravy with curry leaves, mustard, onion.',
      note: 'Quick and protein-rich.'
    },
    poriyal: {
      name: 'Moong Dal (simple)',
      method: 'Pressure cook, temper with mustard, ghee, cumin, dry red chilli.',
      note: 'Quick, light, protein-rich.'
    },
    lunch: 'Rajmudi Rice + Egg Curry + Moong Dal + Curd + Papad',
    dinner: 'Lemon Rice (leftover Rajmudi rice + lemon + mustard tempering) + Egg Omelette (onion, green chilli, coriander) + leftover Egg Curry if any',
    tonight: null
  }
};

const BASE_CHECKLIST = [
  { id: 'soak', label: 'Check tonight\'s soaking — soak legume for tomorrow' },
  { id: 'sambar', label: 'Make sambar fresh (enough for 2 meals — bulk is fine)' },
  { id: 'curry', label: 'Make one main curry — sufficient for lunch + dinner' },
  { id: 'poriyal', label: 'Make one poriyal fresh at lunch time' },
  { id: 'chutney', label: 'Make fresh chutney every morning' },
  { id: 'rice', label: 'Use Rajmudi Red Rice — not white rice' }
];

const VEGETABLES = [
  { name: 'Tomatoes, Onions, Garlic, Ginger', used: 'Every day — curry base' },
  { name: 'Banana Stem (Vazhaithandu)', used: 'Monday poriyal' },
  { name: 'Carrot, Beans', used: 'Tuesday poriyal' },
  { name: 'Chow Chow (Chayote)', used: 'Wednesday poriyal' },
  { name: 'Ivy Gourd (Kovakkai / Tindora)', used: 'Thursday poriyal' },
  { name: 'Yam (Senaikizhangu)', used: 'Friday poriyal' },
  { name: 'Brinjal (small, for frying)', used: 'Saturday poriyal' },
  { name: 'Spinach (Palak) / Methi', used: 'Thursday dinner dal + Saturday dinner greens' },
  { name: 'Drumstick (Murungakkai)', used: 'Sambar — buy weekly' },
  { name: 'Potato, Carrot, Peas', used: 'Friday stew + Sunday lunch' },
  { name: 'Cucumber', used: 'Daily salad' },
  { name: 'Snake Gourd / Capsicum / Corn', used: 'Bonus poriyal on any day available' }
];

const SOAK_SCHEDULE = [
  { legume: 'Kala Chana (Black Chickpeas)', cookDay: 'Mon & next Mon', soakNight: 'Sun night & Sat night', soakDow: [0,6] },
  { legume: 'Kabuli Chana (White Chickpeas)', cookDay: 'Wednesday', soakNight: 'Tuesday night', soakDow: [2] },
  { legume: 'Rajma (Red Kidney Beans)', cookDay: 'Thursday', soakNight: 'Wednesday night', soakDow: [3] },
  { legume: 'Kondakadalai (Brown Chickpeas)', cookDay: 'Friday', soakNight: 'Thursday night', soakDow: [4] },
  { legume: 'Moong Dal', cookDay: 'Sunday + Pesarattu Fri', soakNight: 'No soaking needed', soakDow: [] }
];

const PANTRY = [
  'Rajmudi Red Rice',
  'Dosa batter (fresh or store-bought — no idli ever)',
  'Toor Dal, Moong Dal, Urad Dal, Chana Dal',
  'Tamarind block, Mustard seeds, Curry leaves, Dry red chillies',
  'Fresh coconut (grated) or frozen coconut',
  'Sambar powder, Rasam powder, Chettinad masala, Pepper powder',
  'Coconut milk tetra pack (for Friday Appam + Stew)',
  'Groundnuts (for evening snack)',
  'Ghee (small quantity for dal tadka and pongal)'
];

const RULES = [
  { icon: '🍛', text: 'One curry cooked per day — same curry serves lunch, dinner, and often next morning with dosa' },
  { icon: '🥬', text: 'One poriyal / stir-fry made fresh at lunch daily' },
  { icon: '🍚', text: 'Rice: always Rajmudi Red Rice — healthy, low GI, fibre-rich' },
  { icon: '🚫', text: 'No idli ever — dosa batter only (plain dosa, set dosa, uthappam, egg dosa, masala dosa, appam)' },
  { icon: '🐟', text: 'Fish & Prawns bought fresh Saturday only — cooked Saturday. Leftovers refrigerated → cooked Monday' },
  { icon: '☀️', text: 'Sunday: Nanny off — simple egg-only cooking, no fish, no heavy prep' },
  { icon: '🫘', text: 'Legumes must be soaked the night before — reminder given in previous night\'s notes' },
  { icon: '💪', text: 'Protein goal: high protein daily for family fitness — legumes, eggs, and fish/prawns are the main sources' }
];

const HEALTH_NOTES = [
  'Rajmudi Red Rice has more protein, fibre and iron than white rice — always use this',
  'Legumes daily — best plant protein source, cook them properly (pressure cook after soaking)',
  'Do not skip rasam — it aids digestion and absorption of nutrients',
  'Minimal oil — use coconut oil or cold-pressed groundnut oil only',
  'Fresh coconut in small amounts in poriyal and chutney is healthy — don\'t remove it',
  'Eggs daily — complete protein, important for muscle building and recovery',
  'Fish and prawns on Sat + Mon — omega-3 fatty acids, lean protein, excellent for heart and muscles',
  'Prefer steaming, boiling, pressure cooking over frying wherever possible'
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
  if (dow === 6) items.push({ id: 'fish', label: 'Buy fish/prawns, cook one portion, refrigerate second labelled "Monday"' });
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
