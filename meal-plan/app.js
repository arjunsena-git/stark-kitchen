// ===================================================================
// Stark Kitchen — Meal Protocol
// Data model note: DAY_PLANS is indexed by JS Date.getDay() (0=Sun..6=Sat)
// ===================================================================

const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
// Display order for the Week tab (Monday first, matching the original plan doc)
const WEEK_ORDER = [1,2,3,4,5,6,0];

const DAY_ICONS = ['🍳','🥕','🫘','🍄','🫘','🧀','🍤'];

const DAY_PLANS = {
  1: { // Monday
    icon: '🥕',
    subtitle: 'Fridge-stock vegetable day',
    protein: ['Eggs', 'Vegetables'],
    breakfast: 'Leftover Sunday Egg Curry + Plain Dosa — Filter Coffee / Tea',
    curry: {
      name: 'Mixed Vegetable Sagu or Potato Tomato Kurma',
      method: 'Use fridge-stable vegetables: potato, carrot, beans, peas, cabbage, onion and tomato. Cook in coconut-poppy seed sagu gravy or mild kurma gravy.',
      note: 'Monday should not depend on delicate fresh vegetables. Avoid avarakkai here.'
    },
    poriyal: {
      name: 'Cabbage Carrot Poriyal',
      method: 'Shred cabbage, add carrot, temper with mustard, urad dal, curry leaves and grated coconut.',
      note: 'Reliable Monday poriyal because cabbage and carrot hold well in the fridge.'
    },
    lunch: 'Rajmudi Rice + Mixed Vegetable Sagu/Kurma + Cabbage Carrot Poriyal + Rasam + Curd + Papad',
    snack: 'Boiled Corn with lemon, pepper and a pinch of salt',
    dinner: 'Chapati (3) + same Kurma/Sagu + Salad',
    tonight: 'Soak Kala Chana overnight — cook it tomorrow, Tuesday'
  },
  2: { // Tuesday
    icon: '🫘',
    subtitle: 'Legume curry day — Kala Chana',
    protein: ['Kala Chana', 'Eggs'],
    breakfast: 'Leftover Monday Kurma/Sagu + Plain Dosa — Filter Coffee / Tea',
    curry: {
      name: 'Kala Chana Curry',
      method: 'Soaked Monday night, pressure cooked Tuesday, tempered with mustard, curry leaves, onion, tomato, grated coconut and South Indian spices.',
      note: 'Soaking now maps to the next day, which is easier for the cook and safer for planning.'
    },
    poriyal: {
      name: 'Avarakkai (Broad Beans) Stir-fry',
      method: 'Use only if bought fresh at the start of the week. Chop, boil lightly, temper with mustard, curry leaves, dry red chilli and grated coconut.',
      note: 'Avarakkai is best early and fresh, so keep it Tuesday, not Monday. If it is not fresh, use carrot-beans poriyal.'
    },
    lunch: 'Rajmudi Rice + Kala Chana Curry + Avarakkai Poriyal + Sambar + Curd + Papad',
    snack: 'Boiled Groundnuts with curry leaves, chilli and lemon',
    dinner: 'Chapati (3) + leftover Kala Chana Curry + Egg Bhurji',
    tonight: null
  },
  3: { // Wednesday
    icon: '🍄',
    subtitle: 'Paneer & Mushroom staple day',
    protein: ['Paneer', 'Mushroom', 'Eggs'],
    breakfast: 'Leftover Kala Chana Curry + Plain Dosa or Set Dosa — Filter Coffee / Tea',
    curry: {
      name: 'Mushroom Curry or Paneer Curry',
      method: 'Choose one. Mushroom curry: cook mushrooms in onion-tomato-coconut gravy with curry leaves. Paneer curry: add paneer cubes to mild tomato-coconut or onion-tomato gravy at the end.',
      note: 'Paneer and mushroom are staples, but they should be separate curry options.'
    },
    poriyal: {
      name: 'Ivy Gourd (Kovakkai) Stir-fry',
      method: 'Slice thin, dry roast with mustard, red chilli powder, curry leaves, coconut.',
      note: 'Great for blood sugar regulation and digestion — very tasty dry stir-fry.'
    },
    lunch: 'Rajmudi Rice + Mushroom Curry or Paneer Curry + Kovakkai Poriyal + Rasam + Curd + Papad',
    snack: 'Sprouts or Sundal-style chana salad with onion, tomato, lemon and coriander',
    dinner: 'Egg Dosa (3 — egg cracked on dosa, folded) + Tomato Chutney + leftover Mushroom/Paneer Curry',
    tonight: 'Soak Rajma overnight — cook it tomorrow, Thursday'
  },
  4: { // Thursday
    icon: '🫘',
    subtitle: 'Legume curry day — Rajma',
    protein: ['Rajma', 'Eggs'],
    breakfast: 'Leftover Mushroom/Paneer Curry + Plain Dosa — Filter Coffee / Tea',
    curry: {
      name: 'Rajma Curry',
      method: 'Soaked Wednesday night, pressure cooked Thursday, simmered in thick onion-tomato gravy and finished with coriander.',
      note: 'Second weekly legume day. Soaking is previous night only.'
    },
    poriyal: {
      name: 'Yam (Senaikizhangu) Fry',
      method: 'Cube, parboil, dry roast with red chilli, mustard, curry leaves, coconut.',
      note: 'Better complex carb than potato — good sustained energy and high fibre.'
    },
    lunch: 'Rajmudi Rice + Rajma Curry + Yam Fry + Sambar + Curd + Papad',
    snack: 'Roasted Makhana or buttermilk with cucumber sticks',
    dinner: 'Chapati (3) + leftover Rajma + Palak Dal',
    tonight: null
  },
  5: { // Friday
    icon: '🧀',
    subtitle: 'Paneer / Soya rotation day',
    protein: ['Paneer', 'Soya Chunks', 'Eggs'],
    breakfast: 'Leftover Rajma Curry + Plain Dosa or Pesarattu — Filter Coffee / Tea',
    curry: {
      name: 'Paneer Curry or Soya Chunk Masala',
      method: 'Paneer: cook a mild onion-tomato-coconut gravy and add paneer cubes at the end. Soya: soak chunks 20 mins in hot water, squeeze and cook in thick masala.',
      note: 'Use paneer if available. Use soya as backup for high-protein pantry cooking.'
    },
    poriyal: {
      name: 'Cluster Beans (Goru Kaya / Kothavarangai) Stir-fry',
      method: 'Chop, temper with mustard, urad dal, red chilli, grated coconut. Use snake gourd or carrot-beans poriyal if cluster beans are unavailable.',
      note: 'Extremely high fibre, slightly nutty in taste.'
    },
    lunch: 'Rajmudi Rice + Paneer/Soya Masala + Cluster Beans Poriyal + Rasam + Curd + Papad',
    snack: 'Steamed Sweet Potato or boiled corn chaat',
    dinner: 'Appam (3 — dosa batter + coconut milk) + Vegetable Stew + leftover Paneer/Soya Masala',
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
      name: 'Brinjal Fry or Onion Raita Side',
      method: 'Brinjal fry pairs well with fish or prawn curry. If brinjal is not available, keep it simple with onion raita and cucumber salad.',
      note: null
    },
    lunch: 'Rajmudi Rice + Fish/Prawn Curry + Poriyal + Onion Raita + Papad',
    snack: 'Fruit bowl or spiced buttermilk + a small handful of groundnuts',
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
    snack: 'Boiled Eggs or boiled groundnuts, kept simple because nanny is off',
    dinner: 'Lemon Rice (leftover Rajmudi rice + lemon + mustard tempering) + Egg Omelette (onion, green chilli, coriander) + leftover Egg Curry',
    tonight: null
  }
};

const BASE_CHECKLIST = [
  { id: 'soak', label: 'Check tonight\'s soaking schedule — any soaked legume must be cooked the next day' },
  { id: 'sambar', label: 'Make sambar fresh (enough for 2 meals — bulk is fine)' },
  { id: 'curry', label: 'Make one fresh curry in the afternoon — enough for lunch + dinner + next morning' },
  { id: 'poriyal', label: 'Make one poriyal fresh at lunch time' },
  { id: 'snack', label: 'Prepare healthy evening snack — boiled corn, boiled groundnuts, sprouts, makhana, fruit or buttermilk' },
  { id: 'rice', label: 'Use Rajmudi Red Rice — not white rice' }
];

const VEGETABLES = [
  { name: 'Tomatoes, Onions, Garlic, Ginger', used: 'Curry base — every single day' },
  { name: 'Potato, Carrot, Beans, Peas, Cabbage', used: 'Monday fridge-stock sagu/kurma + poriyal' },
  { name: 'Avarakkai (Broad Beans)', used: 'Tuesday poriyal only if fresh — do not hold too long' },
  { name: 'Ivy Gourd (Kovakkai)', used: 'Wednesday poriyal' },
  { name: 'Yam (Senaikizhangu)', used: 'Thursday poriyal' },
  { name: 'Mushrooms', used: 'Wednesday mushroom curry option — use fresh' },
  { name: 'Cluster Beans (Goru Kaya / Kothavarangai)', used: 'Friday poriyal — highest fibre' },
  { name: 'Spinach (Palak) / Methi', used: 'Thursday dinner dal + Saturday dinner greens' },
  { name: 'Drumstick (Murungakkai)', used: 'Sambar — use weekly' },
  { name: 'Brinjal (small variety)', used: 'Saturday alternate poriyal' },
  { name: 'Cucumber', used: 'Daily salad' },
  { name: 'Snake Gourd', used: 'Occasional alternate poriyal' },
  { name: 'Corn, Groundnuts', used: 'Evening snacks' }
];

const SOAK_SCHEDULE = [
  { legume: 'Kala Chana (Black Chickpeas)', cookDay: 'Tuesday', soakNight: 'Monday night', soakDow: [1] },
  { legume: 'Rajma (Red Kidney Beans)', cookDay: 'Thursday', soakNight: 'Wednesday night', soakDow: [3] },
  { legume: 'Chana Dal', cookDay: 'Optional kootu / dal', soakNight: 'No overnight soaking needed', soakDow: [] },
  { legume: 'Moong Dal', cookDay: 'Sunday', soakNight: 'No soaking needed', soakDow: [] }
];

const SNACK_STAPLES = [
  'Corn cobs or kernels for boiling',
  'Raw groundnuts for boiling',
  'Makhana',
  'Sprouts / chana salad ingredients',
  'Sweet potato',
  'Fruit, cucumber and buttermilk'
];

const PANTRY = [
  'Rajmudi Red Rice',
  'Dosa batter (fresh or store-bought — no idli ever)',
  'Toor Dal, Moong Dal, Chana Dal, Urad Dal',
  'Paneer (2 blocks weekly, use Wed/Fri)',
  'Soya chunks (Friday backup curry)',
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
  { icon: '🥕', text: 'Monday uses fridge-stable vegetables. Do not plan delicate fresh vegetables like avarakkai for Monday' },
  { icon: '🍚', text: 'Rice: always Rajmudi Red Rice — healthy, low GI, fibre-rich' },
  { icon: '🚫', text: 'No idli ever — dosa batter only (plain dosa, set dosa, uthappam, egg dosa, masala dosa, appam)' },
  { icon: '🫘', text: 'Any overnight soaking must be cooked the next day: Monday night for Tuesday, Wednesday night for Thursday' },
  { icon: '🍄', text: 'Paneer and mushroom are staple foods and stay in the weekly curry rotation' },
  { icon: '🌽', text: 'Evening snacks should be healthy: boiled corn, boiled groundnuts, sprouts, makhana, fruit or buttermilk' },
  { icon: '🐟', text: 'Fish & Prawns bought fresh Saturday only — cooked Saturday, eaten fresh. No fish any other day' },
  { icon: '☀️', text: 'Sunday: Nanny off — simple egg-only cooking, no fish, no heavy prep' },
  { icon: '💪', text: 'High protein plan for active family — vegetables, eggs, legumes, paneer, mushroom, soya, fish/prawns, and Rajmudi rice' }
];

const HEALTH_NOTES = [
  'Rajmudi Red Rice has more protein, fibre and iron than white rice — always use this',
  'Legumes are cooked the day after soaking — never soak Monday for Wednesday',
  'Do not skip rasam — it aids digestion and absorption of nutrients',
  'Minimal oil — use coconut oil or cold-pressed groundnut oil only',
  'Fresh coconut in small amounts in poriyal and chutney is healthy — don\'t remove it',
  'Eggs almost every day — complete protein, important for muscle recovery',
  'Paneer and mushroom add familiar staple protein and variety beyond legumes',
  'Soya chunks are backup high-protein pantry food when paneer is not available',
  'Healthy evening snacks prevent random fried snacks — prefer boiled corn, boiled groundnuts, sprouts, makhana or fruit',
  'Fish and prawns on Saturday only — omega-3 fatty acids, lean protein, excellent for heart and muscles',
  'Avarakkai should be consumed fresh, not saved for late-week cooking'
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
    snack: ov.snack != null ? ov.snack : base.snack,
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

  html += mealCardHtml('Evening Snack', 'snack',
    `<div class="plain-text">${eff.snack}</div>`,
    eff.isFieldOverridden('snack'));

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

  const snackHtml = SNACK_STAPLES.map((s, i) => {
    const id = 'snack-' + i;
    const done = !!shoppingState[wk][id];
    return `
      <div class="shop-row ${done ? 'done' : ''}" data-id="${id}">
        <div class="check-box" style="width:20px;height:20px;">${done ? shopCheckSvg : ''}</div>
        <div class="shop-main">${s}</div>
      </div>
    `;
  }).join('');
  document.getElementById('snack-list').innerHTML = snackHtml;

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
  const titleMap = { breakfast: 'Breakfast', curry: 'Main Curry', poriyal: 'Poriyal / Side', lunch: 'Lunch Plate', snack: 'Evening Snack', dinner: 'Dinner' };
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
        snack: src.snack,
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
