const icons = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></svg>`,
  pill: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 3.5a5 5 0 0 1 7 7l-5 5a5 5 0 1 1-7-7Z"/><path d="m7 12 5 5"/></svg>`,
  mood: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8.5 10h.01M15.5 10h.01"/><path d="M8.5 15c1.8 1.7 5.2 1.7 7 0"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 4.7 2.9 8.7 7 10 4.1-1.3 7-5.3 7-10V6Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4 13 13 0 0 0 2.9.7 2 2 0 0 1 1.6 1.9Z"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 1.3 4.7L18 9l-4.7 1.3L12 15l-1.3-4.7L6 9l4.7-1.3Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7Z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.7 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`
};

const moods = [
  { score: 1, emoji: '😢', label: 'Very low' },
  { score: 2, emoji: '😟', label: 'Low' },
  { score: 3, emoji: '😐', label: 'Okay' },
  { score: 4, emoji: '🙂', label: 'Good' },
  { score: 5, emoji: '😄', label: 'Great' }
];

const defaultState = {
  activeTab: 'home',
  role: 'patient',
  medFilter: 'today',
  selectedMood: 4,
  habits: { sleep: true, breakfast: true, lunch: false, dinner: false, meds: true, movement: false },
  settings: { reminders: true, caregiverAlerts: true, weeklyInsights: true, threshold: 6 },
  lastCheckIn: new Date(Date.now() - 2.2 * 60 * 60 * 1000).toISOString(),
  checkedToday: false,
  modal: null,
  meds: [
    { id: 1, name: 'Metformin', dosage: '500 mg', purpose: 'Blood sugar support', time: '8:00 AM', period: 'Morning', remaining: 18, status: 'overdue', taken: false },
    { id: 2, name: 'Lisinopril', dosage: '10 mg', purpose: 'Blood pressure', time: '12:30 PM', period: 'Noon', remaining: 25, status: 'upcoming', taken: false },
    { id: 3, name: 'Vitamin D3', dosage: '1 capsule', purpose: 'Bone health', time: '6:00 PM', period: 'Evening', remaining: 42, status: 'upcoming', taken: false },
    { id: 4, name: 'Atorvastatin', dosage: '20 mg', purpose: 'Cholesterol', time: '9:00 PM', period: 'Night', remaining: 12, status: 'upcoming', taken: false }
  ],
  moodHistory: [
    { day: 'Mon', score: 3, emoji: '😐', note: 'A quiet day' },
    { day: 'Tue', score: 4, emoji: '🙂', note: 'Good energy' },
    { day: 'Wed', score: 4, emoji: '🙂', note: 'Walked outside' },
    { day: 'Thu', score: 2, emoji: '😟', note: 'Poor sleep' },
    { day: 'Fri', score: 3, emoji: '😐', note: 'Feeling steady' },
    { day: 'Sat', score: 5, emoji: '😄', note: 'Family visit' },
    { day: 'Sun', score: 4, emoji: '🙂', note: 'Rested well' }
  ],
  caregiverPatients: [
    { id: 1, initials: 'MA', name: 'Mariam A.', age: 71, lastCheck: '8h 24m ago', mood: 'Low', nextMed: '12:30 PM', alert: true, acknowledged: false },
    { id: 2, initials: 'JS', name: 'Joseph S.', age: 68, lastCheck: '47m ago', mood: 'Good', nextMed: '2:00 PM', alert: false, acknowledged: false },
    { id: 3, initials: 'NL', name: 'Nadia L.', age: 76, lastCheck: '2h 10m ago', mood: 'Okay', nextMed: '6:00 PM', alert: false, acknowledged: false }
  ]
};

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(defaultState));
}

let state = loadState();
const app = document.getElementById('app');

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('wellnest-prototype'));
    return saved ? { ...cloneDefaultState(), ...saved, modal: null } : cloneDefaultState();
  } catch {
    return cloneDefaultState();
  }
}

function saveState() {
  const persistable = { ...state, modal: null };
  localStorage.setItem('wellnest-prototype', JSON.stringify(persistable));
}

function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' })[c]);
}

function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(date);
}

function timeAgo(iso) {
  const mins = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  return `${hours}h ${mins % 60}m ago`;
}

function showToast(message, type = 'success') {
  const region = document.getElementById('toast-region');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${type === 'success' ? icons.check : icons.alert}<span>${escapeHTML(message)}</span>`;
  region.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function navItems() {
  if (state.role === 'caregiver') {
    return [
      { id: 'home', label: 'Overview', icon: icons.home },
      { id: 'patients', label: 'Patients', icon: icons.users },
      { id: 'alerts', label: 'Alerts', icon: icons.bell },
      { id: 'profile', label: 'Profile', icon: icons.user }
    ];
  }
  return [
    { id: 'home', label: 'Home', icon: icons.home },
    { id: 'meds', label: 'Meds', icon: icons.pill },
    { id: 'mood', label: 'Mood', icon: icons.mood },
    { id: 'profile', label: 'Profile', icon: icons.user }
  ];
}

function navMarkup(className = 'nav-list') {
  return `<nav class="${className}" aria-label="Primary navigation">${navItems().map(item => `
    <button class="nav-button ${state.activeTab === item.id ? 'active' : ''}" data-action="navigate" data-tab="${item.id}" aria-current="${state.activeTab === item.id ? 'page' : 'false'}">
      ${item.icon}<span>${item.label}</span>
    </button>`).join('')}</nav>`;
}

function sidebar() {
  return `<aside class="sidebar">
    <div class="brand">
      <div class="brand-mark">${icons.heart}</div>
      <div><p class="brand-name">WellNest</p><p class="brand-sub">Care, made human</p></div>
    </div>
    ${navMarkup()}
    <div class="nav-spacer"></div>
    <div class="sidebar-care">
      <strong>${state.role === 'patient' ? 'Your safety circle' : 'Caregiver mode'}</strong>
      <p>${state.role === 'patient' ? 'One caregiver is connected and can see safety updates.' : 'You are viewing mock data for three linked patients.'}</p>
      <button class="btn btn-small btn-sage" data-action="open-pairing">${icons.users}${state.role === 'patient' ? 'Pair caregiver' : 'Add patient'}</button>
    </div>
  </aside>`;
}

function pageMeta() {
  const patient = {
    home: ['Good afternoon, Mariam', 'Here’s your gentle overview for today.'],
    meds: ['Medication plan', 'Clear reminders, simple actions, no clutter.'],
    mood: ['Daily wellbeing', 'Notice how you feel and what supports you.'],
    profile: ['Your profile', 'Safety contacts, preferences, and personal details.']
  };
  const caregiver = {
    home: ['Care overview', 'See who may need attention today.'],
    patients: ['Linked patients', 'Recent check-ins, mood, and medication status.'],
    alerts: ['Safety alerts', 'Review and acknowledge missed check-ins.'],
    profile: ['Caregiver profile', 'Manage pairing and notification preferences.']
  };
  return (state.role === 'patient' ? patient : caregiver)[state.activeTab] || ['WellNest', 'Care, made human.'];
}

function topbar() {
  const [title, subtitle] = pageMeta();
  return `<header class="topbar">
    <div>
      <p class="eyebrow">${formatDate()}</p>
      <h1 class="page-title">${title}</h1>
      <p class="page-subtitle">${subtitle}</p>
    </div>
    <div class="top-actions">
      <span class="role-badge">${state.role === 'patient' ? icons.heart : icons.shield}${state.role === 'patient' ? 'Patient' : 'Caregiver'}</span>
      <button class="icon-button" data-action="open-notifications" aria-label="Open notifications">${icons.bell}</button>
      <button class="avatar-button" data-action="navigate" data-tab="profile" aria-label="Open profile">${state.role === 'patient' ? 'MA' : 'RA'}</button>
    </div>
  </header>`;
}

function statusPill(kind, text) {
  return `<span class="status-pill ${kind}"><span class="status-dot"></span>${text}</span>`;
}

function homePatient() {
  const next = state.meds.find(m => !m.taken) || state.meds[0];
  const checkedClass = state.checkedToday ? 'checked' : '';
  return `<div class="content grid grid-2">
    <section class="hero-card">
      <div class="hero-content">
        <span class="hero-eyebrow">${icons.shield} Daily safety check-in</span>
        <h2 class="hero-title">A small tap lets your family know you’re okay.</h2>
        <p class="hero-copy">Your latest check-in is shared only with your connected caregiver. No long forms—just reassurance.</p>
        <button class="checkin-button ${checkedClass}" data-action="check-in">${state.checkedToday ? '✓ Checked in' : 'I’m OK'}</button>
        <div class="hero-meta"><span>${icons.check} Last check-in: ${timeAgo(state.lastCheckIn)}</span><span>${icons.shield} Private & secure</span></div>
      </div>
    </section>

    <div class="stack">
      <section class="card">
        <div class="card-header"><div><h3 class="card-title">Next medication</h3><p class="card-kicker">Your nearest scheduled dose</p></div>${statusPill(next.status === 'overdue' ? 'alert' : 'due', next.status === 'overdue' ? 'Overdue' : 'Upcoming')}</div>
        <div class="med-next">
          <div class="med-icon">${icons.pill}</div>
          <div class="med-info"><strong>${escapeHTML(next.name)}</strong><span>${escapeHTML(next.dosage)} · ${escapeHTML(next.purpose)}</span></div>
          <div class="med-time"><strong>${escapeHTML(next.time)}</strong><span>${escapeHTML(next.period)}</span></div>
        </div>
        <button class="btn btn-primary" style="width:100%; margin-top:18px" data-action="take-med" data-id="${next.id}">${icons.check}Mark as taken</button>
      </section>

      <section class="card">
        <div class="card-header"><div><h3 class="card-title">Today at a glance</h3><p class="card-kicker">A calm snapshot, not a score</p></div></div>
        <div class="metric-row">
          <div class="metric"><div class="metric-label">Mood</div><div class="metric-value purple">Good</div></div>
          <div class="metric"><div class="metric-label">Meds</div><div class="metric-value sage">${state.meds.filter(m=>m.taken).length}/${state.meds.length}</div></div>
          <div class="metric"><div class="metric-label">Check-in</div><div class="metric-value">${state.checkedToday ? 'Done' : 'Due'}</div></div>
        </div>
      </section>
    </div>

    <section class="card">
      <div class="card-header"><div><h3 class="card-title">Your wellbeing rhythm</h3><p class="card-kicker">Mood over the last seven days</p></div><button class="btn btn-small btn-soft" data-action="navigate" data-tab="mood">View details ${icons.arrow}</button></div>
      <div class="week-chart">${state.moodHistory.map((entry, i) => `<div class="day-bar ${i === state.moodHistory.length-1 ? 'today' : ''}"><div class="day-bar-fill" style="height:${entry.score * 18}%"></div><div class="day-label">${entry.day}</div></div>`).join('')}</div>
      <div class="insight" style="margin-top:18px"><div class="insight-icon">${icons.sparkle}</div><p><strong>Gentle insight:</strong> Your mood tends to be higher on days when you sleep well and eat breakfast.</p></div>
    </section>

    <section class="card">
      <div class="card-header"><div><h3 class="card-title">Care circle</h3><p class="card-kicker">People connected to your safety updates</p></div>${statusPill('good','Connected')}</div>
      <div class="contact-card">
        <div class="contact-avatar">RA</div>
        <div class="contact-info"><strong>Rami A.</strong><span>Son · Receives missed check-in alerts</span></div>
        <button class="btn btn-small btn-ghost" data-action="call-demo">${icons.phone}Call</button>
      </div>
    </section>
  </div>`;
}

function medsScreen() {
  let meds = state.meds;
  if (state.medFilter === 'overdue') meds = meds.filter(m => m.status === 'overdue' && !m.taken);
  if (state.medFilter === 'taken') meds = meds.filter(m => m.taken);
  return `<div class="content">
    <div class="section-row">
      <div class="segmented" aria-label="Medication filter">
        ${[['today','Today'],['overdue','Overdue'],['taken','Taken']].map(([id,label]) => `<button class="${state.medFilter===id?'active':''}" data-action="med-filter" data-filter="${id}">${label}</button>`).join('')}
      </div>
      <button class="btn btn-primary" data-action="add-med">${icons.plus}Add medication</button>
    </div>
    <div class="med-list">
      ${meds.length ? meds.map(m => `<article class="card med-card ${m.status === 'overdue' && !m.taken ? 'overdue' : ''} ${m.taken ? 'taken' : ''}">
        <div class="med-icon">${m.taken ? icons.check : icons.pill}</div>
        <div class="med-details"><strong>${escapeHTML(m.name)} · ${escapeHTML(m.dosage)}</strong><p>${escapeHTML(m.purpose)}</p><div class="med-meta"><span class="mini-chip">${escapeHTML(m.period)}</span><span class="mini-chip">${m.remaining} doses left</span>${m.status === 'overdue' && !m.taken ? statusPill('alert','Overdue') : m.taken ? statusPill('good','Taken') : statusPill('due','Scheduled')}</div></div>
        <div class="med-actions"><span class="dose-time">${escapeHTML(m.time)}</span>${m.taken ? `<button class="btn btn-small btn-ghost" data-action="undo-med" data-id="${m.id}">Undo</button>` : `<button class="btn btn-small btn-primary" data-action="take-med" data-id="${m.id}">${icons.check}Take now</button>`}</div>
      </article>`).join('') : `<div class="card empty"><div class="empty-illustration">${icons.pill}</div><h3>No medications here</h3><p>This filter has no items. Your current plan is still available under Today.</p><button class="btn btn-soft" data-action="med-filter" data-filter="today">Show today</button></div>`}
    </div>
  </div>`;
}

function moodScreen() {
  const habits = [
    ['sleep','Restful sleep','About 7–9 hours'], ['breakfast','Breakfast','A morning meal'], ['lunch','Lunch','A midday meal'],
    ['dinner','Dinner','An evening meal'], ['meds','Meds taken','As scheduled'], ['movement','Gentle movement','Walk or stretching']
  ];
  return `<div class="content stack">
    <section class="card mood-panel">
      <h2 class="mood-question">How are you feeling today?</h2>
      <p class="mood-helper">There is no wrong answer. Choose what feels closest.</p>
      <div class="mood-picker">${moods.map(m => `<button class="mood-option ${state.selectedMood===m.score?'selected':''}" data-action="select-mood" data-score="${m.score}" aria-label="${m.label}"><span class="mood-emoji">${m.emoji}</span><span class="mood-label">${m.label}</span></button>`).join('')}</div>
    </section>

    <div class="grid grid-equal">
      <section class="card">
        <div class="card-header"><div><h3 class="card-title">What supported you?</h3><p class="card-kicker">Tap everything that applies today</p></div></div>
        <div class="habit-grid">${habits.map(([id,title,copy]) => `<button class="habit-toggle ${state.habits[id]?'active':''}" data-action="toggle-habit" data-habit="${id}"><span class="habit-check">${state.habits[id]?icons.check:''}</span><span><strong>${title}</strong><span>${copy}</span></span></button>`).join('')}</div>
        <div class="field" style="margin-top:16px"><label for="mood-note">Optional note</label><textarea id="mood-note" placeholder="Anything you would like to remember about today?"></textarea></div>
        <button class="btn btn-primary" style="width:100%; margin-top:16px" data-action="submit-mood">Save today’s check-in</button>
      </section>

      <section class="card">
        <div class="card-header"><div><h3 class="card-title">Recent check-ins</h3><p class="card-kicker">Your last seven entries</p></div>${statusPill('good','7 days')}</div>
        <div class="timeline">${[...state.moodHistory].reverse().map(entry => `<div class="timeline-item"><div class="timeline-emoji">${entry.emoji}</div><div class="timeline-main"><strong>${entry.day}</strong><p>${escapeHTML(entry.note)}</p></div><span class="timeline-score">${entry.score}/5</span></div>`).join('')}</div>
      </section>
    </div>
  </div>`;
}

function profileScreen() {
  const isPatient = state.role === 'patient';
  return `<div class="content grid grid-2">
    <div class="stack">
      <section class="card">
        <div class="profile-hero">
          <div class="profile-avatar">${isPatient ? 'MA' : 'RA'}</div>
          <div style="flex:1"><h2>${isPatient ? 'Mariam A.' : 'Rami A.'}</h2><p>${isPatient ? 'Patient · Age 71' : 'Caregiver · Son'}</p></div>
          <button class="btn btn-small btn-soft" data-action="edit-profile">Edit</button>
        </div>
      </section>

      <section class="card">
        <div class="card-header"><div><h3 class="card-title">${isPatient ? 'Emergency contact' : 'Linked account'}</h3><p class="card-kicker">Used only for care and safety features</p></div></div>
        <div class="contact-card"><div class="contact-avatar">${isPatient?'RA':'MA'}</div><div class="contact-info"><strong>${isPatient?'Rami A.':'Mariam A.'}</strong><span>${isPatient?'+961 70 555 014 · Son':'Patient · Last checked in 2h ago'}</span></div><button class="btn btn-small btn-ghost" data-action="call-demo">${icons.phone}Call</button></div>
      </section>

      <section class="card">
        <div class="card-header"><div><h3 class="card-title">Safety window</h3><p class="card-kicker">Alert after no check-in for this long</p></div></div>
        <div class="range-wrap"><input aria-label="Missed check-in alert threshold" type="range" min="1" max="24" value="${state.settings.threshold}" data-action="threshold"><span class="range-value">${state.settings.threshold} hours</span></div>
      </section>
    </div>

    <div class="stack">
      <section class="card">
        <div class="card-header"><div><h3 class="card-title">Preferences</h3><p class="card-kicker">Stored locally in this prototype</p></div></div>
        <div class="settings-list">
          ${[['reminders','Medication reminders','Gentle alerts at scheduled times'],['caregiverAlerts','Caregiver safety alerts','Share missed check-ins with your care circle'],['weeklyInsights','Weekly wellbeing insight','A simple summary of mood and habits']].map(([id,title,copy]) => `<div class="setting-row"><div class="setting-copy"><strong>${title}</strong><span>${copy}</span></div><button class="switch ${state.settings[id]?'on':''}" data-action="toggle-setting" data-setting="${id}" aria-label="Toggle ${title}"></button></div>`).join('')}
        </div>
      </section>

      <section class="card">
        <div class="card-header"><div><h3 class="card-title">Prototype mode</h3><p class="card-kicker">Explore both sides of the care relationship</p></div></div>
        <p style="color:var(--muted); line-height:1.6; margin-top:0">Switch instantly between patient and caregiver experiences. Your demo data stays on this device.</p>
        <button class="btn btn-sage" style="width:100%" data-action="switch-role">${icons.users}Switch to ${isPatient?'caregiver':'patient'} view</button>
        <button class="btn btn-ghost" style="width:100%; margin-top:10px" data-action="reset-demo">Reset prototype data</button>
      </section>

      <p style="text-align:center; color:var(--muted); font-size:12px">WellNest prototype · Version 0.1.0</p>
    </div>
  </div>`;
}

function caregiverOverview() {
  const alertPatients = state.caregiverPatients.filter(p=>p.alert && !p.acknowledged);
  return `<div class="content stack">
    ${alertPatients.length ? `<div class="alert-banner"><div class="alert-banner-icon">${icons.alert}</div><div style="flex:1"><strong>${alertPatients.length} patient may need attention</strong><p>${alertPatients[0].name} has not checked in within the expected safety window.</p></div><button class="btn btn-small btn-danger" data-action="navigate" data-tab="alerts">Review alert</button></div>` : ''}
    <div class="grid grid-3">
      <section class="card"><div class="metric-label">Linked patients</div><div class="metric-value purple">${state.caregiverPatients.length}</div><p class="card-kicker">All actively sharing updates</p></section>
      <section class="card"><div class="metric-label">Need attention</div><div class="metric-value" style="color:#a53e47">${alertPatients.length}</div><p class="card-kicker">Outside their safety window</p></section>
      <section class="card"><div class="metric-label">Checked in today</div><div class="metric-value sage">${state.caregiverPatients.length-alertPatients.length}</div><p class="card-kicker">Recent reassuring activity</p></section>
    </div>
    <section>
      <div class="section-row"><h2 class="section-title">Patient status</h2><button class="btn btn-soft" data-action="open-pairing">${icons.plus}Link patient</button></div>
      ${patientList(state.caregiverPatients)}
    </section>
  </div>`;
}

function patientList(list) {
  return `<div class="patient-list">${list.map(p => `<article class="card patient-card ${p.alert && !p.acknowledged?'alert-card':''}">
    <div class="patient-avatar">${p.initials}</div>
    <div><h3>${escapeHTML(p.name)} <span style="font-family:Inter;font-weight:500;color:var(--muted);font-size:12px">Age ${p.age}</span></h3><p>Last check-in ${escapeHTML(p.lastCheck)}</p><div class="patient-stats"><span class="mini-chip">Mood: ${escapeHTML(p.mood)}</span><span class="mini-chip">Next med: ${escapeHTML(p.nextMed)}</span>${p.alert && !p.acknowledged ? statusPill('alert','Missed check-in') : statusPill('good', p.acknowledged ? 'Acknowledged' : 'All good')}</div></div>
    <div class="patient-action"><button class="btn btn-small ${p.alert && !p.acknowledged?'btn-danger':'btn-ghost'}" data-action="patient-details" data-id="${p.id}">${p.alert && !p.acknowledged?'Review':'View'} ${icons.arrow}</button></div>
  </article>`).join('')}</div>`;
}

function caregiverPatientsScreen() {
  return `<div class="content"><div class="section-row"><div class="segmented"><button class="active">All patients</button><button>Recently active</button></div><button class="btn btn-primary" data-action="open-pairing">${icons.plus}Link patient</button></div>${patientList(state.caregiverPatients)}</div>`;
}

function caregiverAlertsScreen() {
  const alerts = state.caregiverPatients.filter(p=>p.alert);
  return `<div class="content stack">
    <div class="insight"><div class="insight-icon">${icons.shield}</div><p><strong>How alerts work:</strong> WellNest sends one alert when a patient passes their chosen check-in window. Acknowledging it prevents repeated notifications.</p></div>
    ${alerts.length ? patientList(alerts) : `<div class="card empty"><div class="empty-illustration">${icons.shield}</div><h3>No active alerts</h3><p>Everyone is currently within their expected safety window.</p></div>`}
  </div>`;
}

function screen() {
  if (state.role === 'caregiver') {
    if (state.activeTab === 'patients') return caregiverPatientsScreen();
    if (state.activeTab === 'alerts') return caregiverAlertsScreen();
    if (state.activeTab === 'profile') return profileScreen();
    return caregiverOverview();
  }
  if (state.activeTab === 'meds') return medsScreen();
  if (state.activeTab === 'mood') return moodScreen();
  if (state.activeTab === 'profile') return profileScreen();
  return homePatient();
}

function modalMarkup() {
  if (!state.modal) return '';
  if (state.modal.type === 'addMed') return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" data-modal-panel>
    <div class="modal-head"><div><h2 id="modal-title">Add medication</h2><p>Create a simple reminder in the prototype.</p></div><button class="close-button" data-action="close-modal" aria-label="Close">${icons.x}</button></div>
    <form id="med-form">
      <div class="form-grid"><div class="field"><label for="med-name">Medication name</label><input id="med-name" name="name" required placeholder="e.g. Metformin"></div><div class="field"><label for="med-dose">Dosage</label><input id="med-dose" name="dosage" required placeholder="e.g. 500 mg"></div></div>
      <div class="field" style="margin-top:14px"><label for="med-purpose">What is it for?</label><input id="med-purpose" name="purpose" required placeholder="e.g. Blood pressure"></div>
      <div class="form-grid" style="margin-top:14px"><div class="field"><label for="med-time">Reminder time</label><input id="med-time" name="time" type="time" required value="08:00"></div><div class="field"><label for="med-count">Doses remaining</label><input id="med-count" name="remaining" type="number" min="1" value="30" required></div></div>
      <div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">${icons.plus}Add reminder</button></div>
    </form>
  </section></div>`;

  if (state.modal.type === 'pairing') return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="pair-title" data-modal-panel>
    <div class="modal-head"><div><h2 id="pair-title">${state.role==='patient'?'Pair a caregiver':'Link a patient'}</h2><p>${state.role==='patient'?'Share this temporary code with someone you trust.':'Enter the patient’s temporary pairing code.'}</p></div><button class="close-button" data-action="close-modal" aria-label="Close">${icons.x}</button></div>
    ${state.role==='patient' ? `<div class="code-box"><div class="pair-code">583 214</div><p>Expires in 09:42 · Demo code</p></div><button class="btn btn-primary" style="width:100%" data-action="copy-code">${icons.copy}Copy pairing code</button>` : `<div class="field"><label for="pair-input">6-digit pairing code</label><input id="pair-input" inputmode="numeric" maxlength="6" placeholder="583214" style="font-size:24px;text-align:center;letter-spacing:.18em"></div><button class="btn btn-primary" style="width:100%;margin-top:16px" data-action="link-demo">${icons.users}Link patient</button>`}
  </section></div>`;

  if (state.modal.type === 'patient') {
    const p = state.caregiverPatients.find(x=>x.id===state.modal.id);
    return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="patient-title" data-modal-panel>
      <div class="modal-head"><div><h2 id="patient-title">${escapeHTML(p.name)}</h2><p>Patient safety and wellbeing summary</p></div><button class="close-button" data-action="close-modal">${icons.x}</button></div>
      ${p.alert && !p.acknowledged ? `<div class="alert-banner"><div class="alert-banner-icon">${icons.alert}</div><div><strong>Missed check-in</strong><p>Last activity was ${escapeHTML(p.lastCheck)}.</p></div></div>` : `<div class="insight"><div class="insight-icon">${icons.check}</div><p><strong>Status is reassuring.</strong> Recent activity is within this patient’s chosen safety window.</p></div>`}
      <div class="metric-row" style="margin-top:16px"><div class="metric"><div class="metric-label">Mood</div><div class="metric-value purple">${escapeHTML(p.mood)}</div></div><div class="metric"><div class="metric-label">Next med</div><div class="metric-value sage" style="font-size:16px">${escapeHTML(p.nextMed)}</div></div><div class="metric"><div class="metric-label">Age</div><div class="metric-value">${p.age}</div></div></div>
      <div class="modal-actions"><button class="btn btn-ghost" data-action="call-demo">${icons.phone}Call patient</button>${p.alert && !p.acknowledged?`<button class="btn btn-primary" data-action="acknowledge" data-id="${p.id}">${icons.check}Acknowledge alert</button>`:''}</div>
    </section></div>`;
  }

  if (state.modal.type === 'notifications') return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" data-modal-panel>
    <div class="modal-head"><div><h2>Notifications</h2><p>Recent reminders and safety updates</p></div><button class="close-button" data-action="close-modal">${icons.x}</button></div>
    <div class="timeline"><div class="timeline-item"><div class="timeline-emoji">💊</div><div class="timeline-main"><strong>Medication reminder</strong><p>Metformin was due at 8:00 AM</p></div><span class="timeline-score">Today</span></div><div class="timeline-item"><div class="timeline-emoji">💚</div><div class="timeline-main"><strong>Check-in received</strong><p>Your caregiver can see you are okay</p></div><span class="timeline-score">Yesterday</span></div></div>
  </section></div>`;
  return '';
}

function render() {
  app.innerHTML = `<div class="app-shell">${sidebar()}<main class="main-wrap">${topbar()}${screen()}</main>${navMarkup('mobile-nav')}</div>${modalMarkup()}`;
  saveState();
}

function setRole(role) {
  state.role = role;
  state.activeTab = 'home';
  showToast(`Switched to ${role} view`);
  render();
}

app.addEventListener('click', e => {
  const button = e.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  if (action === 'close-modal' && e.target.closest('[data-modal-panel]') && !button.classList.contains('close-button') && !button.classList.contains('btn')) return;

  if (action === 'navigate') { state.activeTab = button.dataset.tab; render(); window.scrollTo({top:0,behavior:'smooth'}); }
  if (action === 'check-in') { state.checkedToday = true; state.lastCheckIn = new Date().toISOString(); showToast('Check-in shared with your caregiver'); render(); }
  if (action === 'take-med') { const med = state.meds.find(m=>m.id===Number(button.dataset.id)); if (med) { med.taken = true; med.status = 'taken'; showToast(`${med.name} marked as taken`); render(); } }
  if (action === 'undo-med') { const med = state.meds.find(m=>m.id===Number(button.dataset.id)); if (med) { med.taken = false; med.status = 'upcoming'; showToast(`${med.name} returned to today’s plan`); render(); } }
  if (action === 'med-filter') { state.medFilter = button.dataset.filter; render(); }
  if (action === 'add-med') { state.modal = { type:'addMed' }; render(); }
  if (action === 'select-mood') { state.selectedMood = Number(button.dataset.score); render(); }
  if (action === 'toggle-habit') { const id = button.dataset.habit; state.habits[id] = !state.habits[id]; render(); }
  if (action === 'submit-mood') {
    const mood = moods.find(m=>m.score===state.selectedMood);
    const note = document.getElementById('mood-note')?.value.trim() || 'Daily check-in saved';
    const day = new Intl.DateTimeFormat('en-US',{weekday:'short'}).format(new Date());
    state.moodHistory.push({day, score:mood.score, emoji:mood.emoji, note});
    state.moodHistory = state.moodHistory.slice(-7);
    showToast('Your wellbeing check-in was saved');
    render();
  }
  if (action === 'toggle-setting') { const id = button.dataset.setting; state.settings[id] = !state.settings[id]; render(); }
  if (action === 'switch-role') setRole(state.role==='patient'?'caregiver':'patient');
  if (action === 'open-pairing') { state.modal={type:'pairing'}; render(); }
  if (action === 'open-notifications') { state.modal={type:'notifications'}; render(); }
  if (action === 'close-modal') { state.modal=null; render(); }
  if (action === 'copy-code') { navigator.clipboard?.writeText('583214'); showToast('Pairing code copied'); state.modal=null; render(); }
  if (action === 'link-demo') { showToast('Patient linked successfully'); state.modal=null; render(); }
  if (action === 'patient-details') { state.modal={type:'patient',id:Number(button.dataset.id)}; render(); }
  if (action === 'acknowledge') { const p=state.caregiverPatients.find(x=>x.id===Number(button.dataset.id)); if(p){p.acknowledged=true; showToast(`Alert for ${p.name} acknowledged`);} state.modal=null; render(); }
  if (action === 'call-demo') showToast('Call action opened in a real mobile build');
  if (action === 'edit-profile') showToast('Profile editor would open here');
  if (action === 'reset-demo') { localStorage.removeItem('wellnest-prototype'); state=cloneDefaultState(); showToast('Prototype data reset'); render(); }
});

app.addEventListener('input', e => {
  if (e.target.matches('[data-action="threshold"]')) {
    state.settings.threshold = Number(e.target.value);
    const out = e.target.parentElement.querySelector('.range-value');
    if (out) out.textContent = `${state.settings.threshold} hours`;
    saveState();
  }
});

app.addEventListener('submit', e => {
  if (e.target.id !== 'med-form') return;
  e.preventDefault();
  const fd = new FormData(e.target);
  const timeValue = fd.get('time');
  const [h,m] = timeValue.split(':').map(Number);
  const date = new Date(); date.setHours(h,m);
  const formatted = new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(date);
  state.meds.push({
    id: Date.now(), name: fd.get('name'), dosage: fd.get('dosage'), purpose: fd.get('purpose'), time: formatted,
    period: h<12?'Morning':h<17?'Afternoon':'Evening', remaining: Number(fd.get('remaining')), status:'upcoming', taken:false
  });
  state.modal=null;
  showToast('Medication reminder added');
  render();
});

render();
