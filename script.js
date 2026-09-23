/* ============================================================
   ==================== FIREBASE CONFIG ======================
   ============================================================ */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDypGd-cIYxc0AedJR1f5eCqSrpUs6GNic",
  authDomain: "soccer-3b49e.firebaseapp.com",
  projectId: "soccer-3b49e",
  storageBucket: "soccer-3b49e.firebasestorage.app",
  messagingSenderId: "444830809977",
  appId: "1:444830809977:web:11f4d7d0f633fa8b4db9a8",
  measurementId: "G-2EEYPG7BHK"
};

/* ============================================================
   ============ SEEDED WORLD RNG (نفس العالم للاعبين) ========
   ============================================================
   يستخدم نفس البذرة لضمان توليد نفس العقبات في نفس الأماكن */
let _wSeed = 0;
let _wCounter = 0;

function setWorldSeed(seed){
  _wSeed = (seed | 0) >>> 0;
  _wCounter = 0;
}

function WR(min = 1, max = 0){
  _wCounter++;
  let h = (_wSeed + _wCounter * 0x9E3779B1) >>> 0;
  h = Math.imul(h ^ (h >>> 15), 0x85EBCA6B) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 0xC2B2AE35) >>> 0;
  h = (h ^ (h >>> 16)) >>> 0;
  const v = h / 4294967296;
  return min + v * (max - min);
}

// استخدم WR() مكان rand() داخل دوال توليد العالم فقط

/* ============================================================
   ==================== ADMIN CONFIG =========================
   ============================================================ */
const ADMIN_CONFIG = {
  uids: [
    'T5tWDNgLVWhaonRvvCE4KrQMFWH3'
  ],
  secretCode: 'SHIFT_ADMIN_2024',
  panelRoute: 'admin'
};

/* ============================================================
   ============ نظام الألقاب المتقدم (TITLES v2) ============
   ============================================================ */
const TITLES_V2 = [
  { id:'rookie',     name:'مبتدئ',       en:'ROOKIE',       icon:'🌱', color:'#8B8278',
    desc:'العب أول جولة', cond: s => (s.stats.totalPlays||0) >= 1 },
  { id:'explorer',   name:'مستكشف',      en:'EXPLORER',     icon:'🧭', color:'#4A88C8',
    desc:'العب 25 جولة', cond: s => (s.stats.totalPlays||0) >= 25 },
  { id:'veteran',    name:'محارب قديم',  en:'VETERAN',      icon:'⚔️', color:'#9A6AC8',
    desc:'العب 100 جولة', cond: s => (s.stats.totalPlays||0) >= 100 },
  { id:'master',     name:'خبير',        en:'MASTER',       icon:'🎖️', color:'#E8B34E',
    desc:'العب 500 جولة', cond: s => (s.stats.totalPlays||0) >= 500 },
  { id:'skyWalker',  name:'سالك السماء', en:'SKY WALKER',   icon:'☁️', color:'#88C8E8',
    desc:'WALK: 2000م', cond: s => (s.bestMeters.WALK||0) >= 2000 },
  { id:'gravityGod', name:'إله الجاذبية',en:'GRAVITY GOD',  icon:'⇅',  color:'#4A7FA0',
    desc:'FLIP: 3000م', cond: s => (s.bestMeters.FLIP||0) >= 3000 },
  { id:'stormRunner',name:'عدّاء العاصفة',en:'STORM RUNNER',icon:'⛈️', color:'#5A5A80',
    desc:'FLAP: 2000م', cond: s => (s.bestMeters.FLAP||0) >= 2000 },
  { id:'driftKing',  name:'ملك الانسياق',en:'DRIFT KING',   icon:'✦',  color:'#C98A2E',
    desc:'DRIFT: 2000م', cond: s => (s.bestMeters.DRIFT||0) >= 2000 },
  { id:'comboHunter',name:'قنّاص السلاسل',en:'COMBO HUNTER', icon:'🔥', color:'#FF6020',
    desc:'سلسلة x50', cond: s => (s.stats.bestCombo||0) >= 50 },
  { id:'comboGod',   name:'إله السلاسل', en:'COMBO GOD',    icon:'🌟', color:'#FFD060',
    desc:'سلسلة x150', cond: s => (s.stats.bestCombo||0) >= 150 },
  { id:'marathoner', name:'الماراثوني',  en:'MARATHONER',   icon:'🏃', color:'#6B9B6B',
    desc:'50,000م إجمالاً', cond: s => (s.stats.totalMeters||0) >= 50000 },
  { id:'voidSurvivor',name:'ناجي الفراغ',en:'VOID SURVIVOR',icon:'👑', color:'#C080FF',
    desc:'500,000م إجمالاً', cond: s => (s.stats.totalMeters||0) >= 500000 },
  { id:'shifter',    name:'المتحوّل',    en:'SHIFTER',      icon:'◆',  color:'#A06AD8',
    desc:'50 SHIFT Runs', cond: s => (s.stats.shiftRuns||0) >= 50 },
  { id:'shiftMaster',name:'سيّد التحولات',en:'SHIFT MASTER', icon:'🌀', color:'#6A28A0',
    desc:'200 SHIFT Runs', cond: s => (s.stats.shiftRuns||0) >= 200 },
  { id:'collector',  name:'الجامع',      en:'COLLECTOR',    icon:'💎', color:'#E8B34E',
    desc:'امتلك 10 أزياء', cond: s => (s.ownedSkins||[]).length >= 10 },
  { id:'hoarder',    name:'الكنّاز',     en:'HOARDER',      icon:'👑', color:'#E85838',
    desc:'امتلك 20 زي', cond: s => (s.ownedSkins||[]).length >= 20 },
  { id:'mythic',     name:'الأسطورة',    en:'MYTHIC',       icon:'✨', color:'#FFD060',
    desc:'10,000 نقطة موسم', cond: s => (s.season.points||0) >= 10000 },
  { id:'god',        name:'الإله',       en:'GOD',          icon:'⚡', color:'#FF4040',
    desc:'100,000 نقطة موسم', cond: s => (s.season.points||0) >= 100000 }
];

/* ============================================================
   ============ نظام المخزون (INVENTORY) ====================
   ============================================================ */
/* ============================================================
   ═══════════ INVENTORY v3 — IMAGE-BASED ════════════════════
   ============================================================ */
function buildInventory(){
  const grid = document.getElementById('inv-grid');
  const header = document.getElementById('inv-header');
  if(!grid) return;

  /* ✅ تصنيفات v3 فقط */
  const cats = COSMETIC_CATEGORY_ORDER;

  const totalSkins = getAllSkins().length;
  const ownedSkins = (Save.data.ownedSkins || []).length;

  let totalCos = 0, ownedCos = 0;
  for(const cat of cats){
    totalCos += getAllCosmetics(cat).length;
    ownedCos += ((Save.data.cosmetics.owned[cat] || []).length);
  }

  /* ═══ Header ═══ */
  if(header){
    const unlimited = hasAdminAccess() && Save.data.admin.unlimitedCoins;
    header.innerHTML = `
      <div class="inv-stat">
        <div class="k">SKINS</div>
        <div class="v">${ownedSkins}/${totalSkins}</div>
      </div>
      <div class="inv-stat">
        <div class="k">EFFECTS</div>
        <div class="v">${ownedCos}/${totalCos}</div>
      </div>
      <div class="inv-stat">
        <div class="k">COINS</div>
        <div class="v">${unlimited ? '∞' : Save.data.coins}</div>
      </div>
    `;
  }

  grid.innerHTML = '';

  /* ═══ عرض الأزياء المملوكة ═══ */
  const allSkins = getAllSkins();
  allSkins.filter(s => Save.data.ownedSkins.includes(s.id)).forEach(skin => {
    const el = document.createElement('div');
    el.className = 'inv-item';
    el.style.setProperty('--rar', `var(--r-${skin.rarity || 'common'})`);

    const img = ASSET.resolve(skin);
    const thumb = img
      ? `<img src="${img}" alt="" onerror="this.style.display='none';this.parentElement.innerHTML='⚠'">`
      : `<div style="width:100%;height:100%;background:${skin.body || '#E07A3F'};display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;font-weight:800;">${(skin.ar||'?').charAt(0)}</div>`;

    el.innerHTML = `
      <div class="inv-thumb">${thumb}</div>
      <div class="inv-name">${skin.ar}</div>
      <div class="inv-cat">SKIN · ${RARITY_LABELS[skin.rarity || 'common']}</div>
    `;
    grid.appendChild(el);
  });

  /* ═══ عرض التأثيرات المملوكة ═══ */
  for(const cat of cats){
    const owned = Save.data.cosmetics.owned[cat] || [];
    const all = getAllCosmetics(cat);
    const catInfo = getCategoryConfig(cat);

    for(const item of all){
      if(!owned.includes(item.id)) continue;
      if(item.id === 'none') continue;

      const el = document.createElement('div');
      el.className = 'inv-item';

      const img = ASSET.resolve(item);
      const thumb = img
        ? `<img src="${img}" alt="" onerror="this.style.display='none';this.parentElement.innerHTML='⚠'">`
        : `<span style="font-size:24px;">${catInfo.icon}</span>`;

      el.innerHTML = `
        <div class="inv-thumb">${thumb}</div>
        <div class="inv-name">${item.name}</div>
        <div class="inv-cat">${catInfo.label}</div>
      `;
      grid.appendChild(el);
    }
  }

  if(grid.children.length === 0){
    grid.innerHTML = '<div style="grid-column: span 2; text-align:center;padding:40px;color:var(--ink-mute);font-size:13px;">لا يوجد عناصر بعد — ابدأ اللعب والشراء!</div>';
  }
}

/* ============================================================
   ============ نظام المهام v2 (مع المطالبة) ================
   ============================================================ */
function buildMissionsV2(tier){
  const list = document.getElementById('quest-list');
  if(!list) return;
  list.innerHTML = '';

  const active = Save.data.missions[tier] || [];
  if(active.length === 0){
    list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--ink-mute);font-size:13px;">لا توجد مهام حالياً</div>';
    return;
  }

  active.forEach(id => {
    const data = getMissionData(tier, id);
    if(!data) return;
    const { tmpl, prog, done } = data;

    const claimKey = `claimed_${tier}_${id}`;
    const isClaimed = Save.data.missions[claimKey] === true;

    const pct = Math.min(100, (prog / tmpl.target) * 100);

    const el = document.createElement('div');
    el.className = 'mission-card' + (done ? ' done' : '') + (isClaimed ? ' claimed' : '');

    let actionHtml = '';
    if(isClaimed){
      actionHtml = '<button class="mission-claim claimed">✓ مُستلمة</button>';
    } else if(done){
      actionHtml = '<button class="mission-claim">استلام</button>';
    } else {
      actionHtml = `<span style="font-family:'Space Grotesk';font-size:11px;color:var(--ink-mute);font-weight:700;">${Math.min(prog, tmpl.target)}/${tmpl.target}</span>`;
    }

    el.innerHTML = `
      <div class="mission-icon">${tmpl.icon}</div>
      <div class="mission-body">
        <div class="mission-title">${tmpl.title}</div>
        <div class="mission-desc">${isClaimed ? 'تم الاستلام' : (done ? 'جاهزة للاستلام!' : 'قيد التقدم')}</div>
        <div class="mission-prog"><div class="mission-prog-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="mission-side">
        <div class="mission-reward">◆ ${tmpl.reward}</div>
        ${actionHtml}
      </div>
    `;

    const btn = el.querySelector('.mission-claim:not(.claimed)');
    if(btn && done && !isClaimed){
      btn.addEventListener('click', () => {
        if(Save.data.missions[claimKey]) return;
        Save.data.missions[claimKey] = true;
        Save.data.coins += tmpl.reward;
        Save.data.stats.totalCoins += tmpl.reward;
        Save.save();
        updateCoinsUI();
        Sfx.reward(); haptic(20);
        buildMissionsV2(tier);
      });
    }

    list.appendChild(el);
  });
}

/* ============================================================
   ============ المهام - التحقق من إعادة التعيين ============
   ============================================================ */
function ensureMissionsV2(){
  const m = Save.data.missions;
  const t = today();
  const w = weekStart();
  const mo = monthStart();

  if(!m.claimedDaily) m.claimedDaily = {};
  if(!m.claimedWeekly) m.claimedWeekly = {};
  if(!m.claimedMonthly) m.claimedMonthly = {};

  if(m.dailyReset !== t){
    m.daily = MISSION_TEMPLATES.daily.map(x => x.id);
    m.dailyReset = t;
    m.progressDaily = { plays:0, meters:0, coins:0, orbs:0 };
    m.claimedDaily = {};
  }
  if(m.weeklyReset !== w){
    m.weekly = MISSION_TEMPLATES.weekly.map(x => x.id);
    m.weeklyReset = w;
    m.progressWeekly = { plays:0, meters:0, coins:0, orbs:0 };
    m.claimedWeekly = {};
  }
  if(m.monthlyReset !== mo){
    m.monthly = MISSION_TEMPLATES.monthly.map(x => x.id);
    m.monthlyReset = mo;
    m.progressMonthly = { plays:0, meters:0, coins:0, orbs:0 };
    m.claimedMonthly = {};
  }

  /* تحقق إذا كانت كل المهام اليومية مكتملة وتم استلامها */
  Save.save();
}

/* ============================================================
   ============ الإنجازات v2 (مع تصنيفات) ===================
   ============================================================ */
const ACHIEVEMENT_CATEGORIES = {
  progression: { name:'التقدم',     icon:'📈' },
  skill:       { name:'المهارة',    icon:'🎯' },
  mode:        { name:'الأنماط',    icon:'🎮' },
  shift:       { name:'التحولات',   icon:'◆'  },
  collection:  { name:'المجموعة',   icon:'💎' },
  secret:      { name:'سرية',       icon:'❓' }
};

function buildAchievementsV2(){
  const container = document.getElementById('ach-list');
  if(!container) return;
  container.innerHTML = '';

  /* تجميع الإنجازات حسب التصنيف */
  const byCat = {};
  ACHIEVEMENTS.forEach(a => {
    const cat = a.cat || 'progression';
    if(!byCat[cat]) byCat[cat] = [];
    byCat[cat].push(a);
  });

  /* عرض كل تصنيف */
  Object.entries(byCat).forEach(([cat, list]) => {
    const catInfo = ACHIEVEMENT_CATEGORIES[cat] || { name: cat, icon: '🏆' };

    const section = document.createElement('div');
    section.className = 'ach-category';
    section.innerHTML = `
      <div class="ach-category-title">
        <span>${catInfo.icon}</span>
        <span>${catInfo.name}</span>
      </div>
    `;

    const grid = document.createElement('div');
    grid.className = 'ach-grid';

    list.forEach(a => {
      const un = !!Save.data.achievements[a.id];
      let val = 0;
      try { val = Math.min(a.value(Save.data), a.target); } catch(e) { val = 0; }
      const pct = a.target > 0 ? (val / a.target) * 100 : 0;

      const card = document.createElement('div');
      card.className = 'ach-card' + (un ? ' unlocked' : '');
      card.innerHTML = `
        <div class="ach-icon">${un ? a.icon : '❔'}</div>
        <div class="ach-name">${a.name}</div>
        <div class="ach-desc">${a.desc}</div>
        <div class="ach-prog"><div class="ach-prog-fill" style="width:${pct}%"></div></div>
      `;
      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

/* ============================================================
   ============ الإعدادات v2 =================================
   ============================================================ */
function buildSettingsV2(){
  const container = document.getElementById('settings-list');
  if(!container) return;
  container.innerHTML = '';

  const sections = [
    {
      title: 'الصوت والتحكم',
      items: [
        { key:'sound', icon:'🔊', title:'المؤثرات الصوتية', sub:'SOUND EFFECTS', type:'toggle' },
        { key:'haptics', icon:'📳', title:'الاهتزاز', sub:'HAPTICS', type:'toggle' },
        { key:'music', icon:'🎵', title:'الموسيقى الخلفية', sub:'BACKGROUND MUSIC', type:'toggle' }
      ]
    }
  ];

  sections.forEach(sec => {
    const sectionEl = document.createElement('div');
    sectionEl.className = 'settings-section';

    sec.items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'settings-row';
      const on = Save.data.settings[item.key] !== false;

      row.innerHTML = `
        <div class="sr-icon">${item.icon}</div>
        <div class="sr-info">
          <div class="sr-title">${item.title}</div>
          <div class="sr-sub">${item.sub}</div>
        </div>
        <div class="toggle-sw ${on ? 'on' : ''}" data-key="${item.key}"></div>
      `;

      const toggle = row.querySelector('.toggle-sw');
      toggle.addEventListener('click', () => {
        Save.data.settings[item.key] = !Save.data.settings[item.key];
        Save.save();
        toggle.classList.toggle('on', Save.data.settings[item.key]);
        Sfx.tap(); haptic(6);
      });

      sectionEl.appendChild(row);
    });

    container.appendChild(sectionEl);
  });
}

/* ============================================================
   ============ الألقاب - عرض واختيار ======================
   ============================================================ */
function buildTitles(){
  const grid = document.getElementById('titles-grid');
  if(!grid) return;
  grid.innerHTML = '';

  const equipped = Save.data.titles?.equipped || 'rookie';

  TITLES_V2.forEach(t => {
    const unlocked = t.cond(Save.data);
    const isEquipped = equipped === t.id;

    const card = document.createElement('button');
    card.className = 'title-card' + (isEquipped ? ' equipped' : '') + (!unlocked ? ' locked' : '');

    card.innerHTML = `
      <div class="tc-icon" style="background: ${unlocked ? `linear-gradient(135deg, ${t.color}40, ${t.color}20)` : ''}; color: ${t.color};">
        ${t.icon}
      </div>
      <div class="tc-name">${t.name}</div>
      <div class="tc-desc">${t.desc}</div>
      <div class="tc-status">${isEquipped ? '✓ مُجهّز' : (unlocked ? 'اضغط للتجهيز' : '🔒 مقفل')}</div>
    `;

    if(unlocked){
      card.addEventListener('click', () => {
        if(isEquipped) return;
        if(!Save.data.titles) Save.data.titles = { equipped: 'rookie', owned: [] };
        Save.data.titles.equipped = t.id;
        Save.save();
        Sfx.reward(); haptic(15);
        buildTitles();
      });
    }

    grid.appendChild(card);
  });
}

/* ============================================================
   ============ الرتب v2 =====================================
   ============================================================ */
function buildSeasonV2(){
  const pts = Save.data.season.points || 0;
  const rankIdx = getSeasonRankIdx();
  const rank = SEASON_RANKS[rankIdx];
  const nextRank = SEASON_RANKS[rankIdx + 1];

  /* Hero */
  const hero = document.getElementById('season-hero');
  if(hero){
    hero.innerHTML = `
      <div class="rank-current">
        <div class="rank-current-icon">${rank.icon}</div>
        <div class="rank-current-info">
          <div class="rank-current-name">${rank.name}</div>
          <div class="rank-current-points">${pts.toLocaleString()} نقطة موسم</div>
        </div>
      </div>
      ${nextRank ? `
        <div class="rank-progress-v2">
          <div class="rp-labels">
            <span>${rank.name}</span>
            <span>${nextRank.name}</span>
          </div>
          <div class="rp-bar">
            <div class="rp-fill" style="width:${clamp((pts - rank.points) / (nextRank.points - rank.points), 0, 1) * 100}%"></div>
          </div>
        </div>
      ` : '<div style="text-align:center;margin-top:14px;font-size:12px;opacity:.8;">🌟 أعلى رتبة!</div>'}
    `;
  }

  /* List */
  const list = document.getElementById('rank-list');
  if(list){
    list.innerHTML = '';
    SEASON_RANKS.forEach((r, i) => {
      const isCurrent = i === rankIdx;
      const isUnlocked = i <= rankIdx;

      const el = document.createElement('div');
      el.className = 'rank-item' + (isCurrent ? ' current' : '') + (!isUnlocked ? ' locked' : '');

      el.innerHTML = `
        <div class="rank-icon-v2">${r.icon}</div>
        <div class="rank-info-v2">
          <div class="rank-name-v2">${r.name}</div>
          <div class="rank-req-v2">${r.points.toLocaleString()} نقطة</div>
        </div>
        <div class="rank-status-v2">${isUnlocked ? '✓' : '🔒'}</div>
      `;
      list.appendChild(el);
    });
  }

  /* عيّن النصوص القديمة إن وُجدت */
  const el1 = document.getElementById('season-rank');
  const el2 = document.getElementById('season-points');
  const el3 = document.getElementById('season-prog');
  if(el1) el1.textContent = rank.icon + ' ' + rank.name;
  if(el2) el2.textContent = pts;
  if(el3 && nextRank){
    el3.style.width = clamp((pts - rank.points) / (nextRank.points - rank.points), 0, 1) * 100 + '%';
  }
}

/* ============================================================
   ============ الدخول اليومي v2 ============================
   ============================================================ */
function buildDailyV2(){
  checkDailyReset();
  const dl = Save.data.dailyLogin;
  const curDay = dl.streak % 7;
  const canClaim = canClaimDaily();

  /* Hero */
  const hero = document.getElementById('daily-hero');
  if(hero){
    hero.innerHTML = `
      <div class="daily-streak">
        <div class="daily-flame">🔥</div>
        <div class="daily-streak-info">
          <div class="ds-k">CURRENT STREAK</div>
          <div class="ds-v">${dl.streak}<small> يوم</small></div>
        </div>
      </div>
    `;
  }

  /* Grid */
  const grid = document.getElementById('login-grid');
  if(!grid) return;
  grid.className = 'daily-grid-v2';
  grid.innerHTML = '';

  for(let i = 0; i < 7; i++){
    const rw = LOGIN_REWARDS[i];
    const claimed = i < curDay || (i === curDay && !canClaim);
    const isToday = i === curDay && canClaim;

    const el = document.createElement('div');
    el.className = 'daily-day-v2' + (claimed ? ' claimed' : '') + (isToday ? ' today' : '');
    el.innerHTML = `
      <span class="dd-num">${i+1}</span>
      <span class="dd-ic">${claimed ? '✓' : rw.icon}</span>
      <span class="dd-val">${rw.label}</span>
    `;
    grid.appendChild(el);
  }

  /* Button */
  const btn = document.getElementById('claim-daily-btn');
  if(btn){
    if(!canClaim){
      btn.textContent = '✓ تم الاستلام اليوم';
      btn.style.opacity = '0.5';
      btn.disabled = true;
    } else {
      btn.textContent = '🎁 استلام مكافأة اليوم';
      btn.style.opacity = '1';
      btn.disabled = false;
    }
  }
}

/* ============================================================
   ==================== Utilities ============================
   ============================================================ */
const rand=(a,b)=>a+Math.random()*(b-a);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const today=()=>new Date().toISOString().slice(0,10);
const daysBetween=(a,b)=>Math.floor((new Date(b)-new Date(a))/(1000*60*60*24));
const weekStart=()=>{
  const d=new Date();
  const day=d.getDay();
  const diff=d.getDate()-day;
  return new Date(d.setDate(diff)).toISOString().slice(0,10);
};
const monthStart=()=>new Date().toISOString().slice(0,7);

function hexRgb(h){
  if(typeof h !== 'string') return [0,0,0];
  h = h.replace('#','');
  if(h.length !== 6) return [0,0,0];
  const r = parseInt(h.slice(0,2), 16);
  const g = parseInt(h.slice(2,4), 16);
  const b = parseInt(h.slice(4,6), 16);
  if(isNaN(r) || isNaN(g) || isNaN(b)) return [0,0,0];
  return [r, g, b];
}
function rgbHex(r,g,b){return '#'+[r,g,b].map(v=>Math.round(clamp(v,0,255)).toString(16).padStart(2,'0')).join('');}
function mixColor(a, b, t){
  /* ✅ حماية من NaN */
  if(typeof a !== 'string' || !a.startsWith('#')) a = '#000000';
  if(typeof b !== 'string' || !b.startsWith('#')) b = '#000000';
  if(typeof t !== 'number' || !isFinite(t)) t = 0;
  t = Math.max(0, Math.min(1, t));

  const ca = hexRgb(a), cb = hexRgb(b);
  return rgbHex(
    ca[0] + (cb[0] - ca[0]) * t,
    ca[1] + (cb[1] - ca[1]) * t,
    ca[2] + (cb[2] - ca[2]) * t
  );
}
function roundRect(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);if(r<0)r=0;c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}

/* ============================================================
   ==================== IMAGE RESOLVER =======================
   يدعم صورتين: imageData (base64) أو imagePath (مسار ملف)
   ============================================================ */
const _imageElCache = {};

function resolveImageSrc(item){
  if(!item) return null;
  if(item.imageData) return item.imageData;
  if(item.imagePath){
    const path = String(item.imagePath).trim();
    if(!path) return null;
    if(path.startsWith('http') || path.startsWith('data:')) return path;
    if(path.startsWith('assets/')) return path;
    return 'assets/custom/' + path.replace(/^\/+/, '');
  }
  return null;
}

function getItemImageEl(item){
  const src = resolveImageSrc(item);
  if(!src) return null;
  if(_imageElCache[src]) return _imageElCache[src];
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = src;
  _imageElCache[src] = img;
  return img;
}

function hasItemImage(item){
  return !!(item && (item.imageData || item.imagePath));
}

/* ============================================================
   ==================== Levels ===============================
   ============================================================ */
const GLOBAL_LEVEL_THRESHOLDS = [0,50,150,350,700,1200,1900,2900,4200,5900,8100,10900,14400,18700,23900,30100,37400,45900,55700,66900];
const MODE_LEVEL_THRESHOLDS  = [0,40,120,250,450,750,1150,1700,2500,3600,5000,7000,9500,12500,16000];

function levelFromMeters(m, thresholds){
  thresholds = thresholds || GLOBAL_LEVEL_THRESHOLDS;
  let idx = 0;
  for(let i=0;i<thresholds.length;i++){ if(m >= thresholds[i]) idx = i; }
  return idx;
}
function levelProgress(m, thresholds){
  thresholds = thresholds || GLOBAL_LEVEL_THRESHOLDS;
  const lv = levelFromMeters(m, thresholds);
  const cur = thresholds[lv];
  const next = thresholds[lv+1] ?? (cur+10000);
  return clamp((m - cur) / (next - cur), 0, 1);
}
function levelRewardFor(lv){ return { coins: 20 + lv*15 }; }

/* ============================================================
   ==================== Season ===============================
   ============================================================ */
const SEASON_RANKS = [
  { name:'برونزي',   icon:'🥉', points:0 },
  { name:'فضي',      icon:'🥈', points:500 },
  { name:'ذهبي',     icon:'🥇', points:1500 },
  { name:'بلاتيني',  icon:'💎', points:3500 },
  { name:'ماسي',     icon:'💠', points:7000 },
  { name:'أسطوري',   icon:'👑', points:12000 },
  { name:'أيقوني',   icon:'🌟', points:20000 }
];

const BP_TIERS = 30;
const BP_TIER_POINTS = 300;

/* ============================================================
   ==================== Missions =============================
   ============================================================ */
const MISSION_TEMPLATES = {
  daily: [
    { id:'play3',   icon:'🎮', title:'العب ٣ جولات',      target:3,    key:'plays',    reward:15 },
    { id:'m300',    icon:'📏', title:'اقطع ٣٠٠ متر',      target:300,  key:'meters',   reward:20 },
    { id:'coins20', icon:'◆',  title:'اجمع ٢٠ عملة',       target:20,   key:'coins',    reward:15 },
    { id:'orb3',    icon:'🔮', title:'التقط ٣ كرات طاقة', target:3,    key:'orbs',     reward:20 }
  ],
  weekly: [
    { id:'play15',  icon:'🎮', title:'العب ١٥ جولة',      target:15,   key:'plays',    reward:120 },
    { id:'m1500',   icon:'📏', title:'اقطع ١٥٠٠ متر',     target:1500, key:'meters',   reward:180 },
    { id:'coins200',icon:'◆',  title:'اجمع ٢٠٠ عملة',      target:200,  key:'coins',    reward:150 },
    { id:'orb15',   icon:'🔮', title:'التقط ١٥ كرة طاقة', target:15,   key:'orbs',     reward:180 }
  ],
  monthly: [
    { id:'play50',  icon:'🎮', title:'العب ٥٠ جولة',      target:50,   key:'plays',    reward:400 },
    { id:'m5000',   icon:'📏', title:'اقطع ٥٠٠٠ متر',     target:5000, key:'meters',   reward:600 },
    { id:'coins1000',icon:'◆', title:'اجمع ١٠٠٠ عملة',     target:1000, key:'coins',    reward:500 },
    { id:'orb50',   icon:'🔮', title:'التقط ٥٠ كرة طاقة', target:50,   key:'orbs',     reward:600 }
  ]
};

const LOGIN_REWARDS = [
  { day:1, icon:'◆',  label:'20',  value:20 },
  { day:2, icon:'◆',  label:'30',  value:30 },
  { day:3, icon:'◆',  label:'50',  value:50 },
  { day:4, icon:'◆',  label:'80',  value:80 },
  { day:5, icon:'◆',  label:'120', value:120 },
  { day:6, icon:'◆',  label:'180', value:180 },
  { day:7, icon:'👑', label:'300', value:300 }
];

/* ============================================================
   ==================== Cosmetics ============================
   ============================================================ */
const COSMETICS = {
  spark: [
    { id:'none',      name:'بدون',      price:0,    desc:'لا شرار' },
    { id:'sparks',    name:'شرار',      price:150,  desc:'جمرات برتقالية' },
    { id:'bubbles',   name:'فقاعات',    price:250,  desc:'فقاعات تطفو' },
    { id:'stars',     name:'نجوم',      price:350,  desc:'نجوم صغيرة' },
    { id:'hearts',    name:'قلوب',      price:450,  desc:'قلوب وردية' },
    { id:'notes',     name:'نوتات',     price:550,  desc:'رموز موسيقية' },
    { id:'leaves',    name:'أوراق',     price:600,  desc:'أوراق الخريف' },
    { id:'petals',    name:'بتلات',     price:700,  desc:'بتلات وردية' },
    { id:'snow',      name:'ثلج',       price:750,  desc:'ندف ثلجية' },
    { id:'digital',   name:'رقمي',      price:900,  desc:'بكسلات مضيئة' },
    { id:'lightning', name:'برق',       price:1100, desc:'شرارات كهربائية' },
    { id:'firefly',   name:'يراعات',    price:1400, desc:'أضواء متوهجة' },
    { id:'rainbow',   name:'قوس قزح',   price:1800, desc:'مطر ملون' },
    { id:'cosmic',    name:'كوني',      price:2400, desc:'غبار كوني' },
    { id:'gold',      name:'ذهبي',      price:3000, desc:'غبار ذهبي' },
    /* ═══ جديد ═══ */
    { id:'runes',     name:'رونية',     price:900,  desc:'رموز غامضة' },
    { id:'gears',     name:'تروس',      price:850,  desc:'تروس دوّارة' },
    { id:'plus',      name:'صليب صحي',  price:700,  desc:'صليب أخضر' },
    { id:'cross',     name:'إكس',       price:650,  desc:'علامات إكس' },
    { id:'triangles', name:'مثلثات',    price:1000, desc:'مثلثات حادة' },
    { id:'diamonds',  name:'معينات',    price:1100, desc:'معينات متلألئة' },
    { id:'moonPhases',name:'أطوار القمر',price:1300,desc:'أقمار متغيّرة' },
    { id:'arrows',    name:'أسهم',      price:900,  desc:'أسهم طائرة' },
    { id:'shuriken',  name:'شوريكن',    price:1200, desc:'نجوم النينجا' },
    { id:'smoke',     name:'دخان',      price:800,  desc:'دوائر دخانية' },
    { id:'voidOrbs',  name:'كرات فراغ', price:2200, desc:'كرات بنفسجية' },
    { id:'candy',     name:'حلوى',      price:650,  desc:'حلوى ملونة' },
    { id:'donuts',    name:'دونات',     price:900,  desc:'دونات صغيرة' },
    { id:'cherries',  name:'كرز',       price:750,  desc:'كرز أحمر' },
    { id:'soccerBalls',name:'كرات قدم', price:800,  desc:'كرات بيضاء' },
    { id:'pixels',    name:'بكسل',      price:950,  desc:'بكسلات بألوان' },
    { id:'mushrooms', name:'فطر',       price:1000, desc:'فطر مميز' },
    { id:'feathers',  name:'ريش',       price:850,  desc:'ريش خفيف' },
    { id:'skulls',    name:'جماجم',     price:1600, desc:'جماجم صغيرة' },
    { id:'coffee',    name:'قهوة',      price:700,  desc:'حبوب القهوة' },
    { id:'books',     name:'كتب',       price:900,  desc:'كتب طائرة' },
    { id:'wrenches',  name:'مفاتيح',    price:850,  desc:'مفاتيح صيانة' },
    { id:'aurora',    name:'شفق',       price:2800, desc:'شفق قطبي' },
    { id:'supernova', name:'مستعر',     price:3500, desc:'انفجار نجمي' }
  ],
  eyes: [
  { id:'default',   name:'افتراضي',   price:0,    desc:'عيون عادية' },
  { id:'cute',      name:'لطيف',      price:200,  desc:'عيون كبيرة ولمعة' },
  { id:'sleepy',    name:'نعسان',     price:250,  desc:'نصف مغمض' },
  { id:'angry',     name:'غاضب',      price:300,  desc:'عيون حادة' },
  { id:'star',      name:'نجمة',      price:500,  desc:'نجوم في العين' },
  { id:'heart',     name:'قلب',       price:500,  desc:'قلوب في العين' },
  { id:'dead',      name:'ميت',       price:450,  desc:'X بدل العين' },
  { id:'robot',     name:'روبوت',     price:600,  desc:'مربعات رقمية' },
  { id:'glowing',   name:'متوهج',     price:800,  desc:'عيون متوهجة' },
  { id:'rainbow',   name:'قوس قزح',   price:1000, desc:'ألوان متغيرة' },
  { id:'cat',       name:'قطة',       price:700,  desc:'عيون قطة' },
  { id:'void',      name:'فراغ',      price:1200, desc:'لا شيء' }
],
companion: [
  { id:'none',        name:'بدون',        price:0,    desc:'لا رفيق' },
  { id:'star',        name:'نجمة',        price:500,  desc:'نجمة تلمع' },
  { id:'heart',       name:'قلب',         price:500,  desc:'قلب طائر' },
  { id:'orb',         name:'كرة',         price:700,  desc:'كرة متوهجة' },
  { id:'butterfly',   name:'فراشة',       price:900,  desc:'فراشة ملونة' },
  { id:'firefly',     name:'يراعة',       price:850,  desc:'أضواء صغيرة' },
  { id:'bee',         name:'نحلة',        price:750,  desc:'نحلة تطن' },
  { id:'ghost',       name:'شبح صغير',    price:1000, desc:'شبح ودود' },
  { id:'dragon',      name:'تنين صغير',   price:1400, desc:'تنين يطير' },
  { id:'rocket',      name:'صاروخ',       price:1100, desc:'صاروخ صغير' },
  { id:'moon',        name:'قمر',         price:1300, desc:'قمر صغير' },
  { id:'sun',         name:'شمس',         price:1300, desc:'شمس صغيرة' },
  { id:'cloud',       name:'سحابة',       price:800,  desc:'سحابة صغيرة' },
  { id:'cube',        name:'مكعب',        price:900,  desc:'مكعب دوّار' },
  { id:'sword',       name:'سيف طائر',    price:1500, desc:'سيف يحوم' },
  { id:'balloon',     name:'بالون',       price:600,  desc:'بالون بألوان' },
  { id:'skull',       name:'جمجمة',       price:1600, desc:'جمجمة تتبعك' },
  { id:'diamond',     name:'جوهرة',       price:2000, desc:'جوهرة فاخرة' },
  { id:'phoenix',     name:'عنقاء',       price:2500, desc:'عنقاء صغيرة' },
  { id:'cosmicPet',   name:'كائن كوني',   price:3000, desc:'كائن من الفضاء' }
],
footstep: [
  { id:'none',      name:'بدون',        price:0,    desc:'لا آثار' },
  { id:'dust',      name:'غبار',        price:200,  desc:'سحابة غبار' },
  { id:'smoke',     name:'دخان',        price:400,  desc:'دخان صاعد' },
  { id:'spark',     name:'شرار',        price:500,  desc:'شرارات صغيرة' },
  { id:'snow',      name:'ثلج',         price:450,  desc:'بلورات ثلجية' },
  { id:'water',     name:'ماء',         price:550,  desc:'رشات ماء' },
  { id:'magic',     name:'سحري',        price:900,  desc:'دوائر سحرية' },
  { id:'fire',      name:'نار',         price:800,  desc:'آثار لهب' },
  { id:'shadow',    name:'ظل',          price:700,  desc:'ظلال داكنة' },
  { id:'rainbow',   name:'قوس قزح',     price:1200, desc:'ألوان متغيرة' },
  { id:'void',      name:'فراغ',        price:1500, desc:'شقوق فراغ' },
  { id:'divine',    name:'مقدس',        price:2000, desc:'نور ذهبي' }
],
  trail: [
    { id:'default',   name:'افتراضي',   price:0,   desc:'خط سير بسيط' },
    { id:'sparkle',   name:'لمعان',     price:200, desc:'نجوم صغيرة' },
    { id:'fire',      name:'نار',       price:400, desc:'شرارات نارية' },
    { id:'ice',       name:'ثلج',       price:400, desc:'بلورات ثلجية' },
    { id:'rainbow',   name:'قوس قزح',   price:800, desc:'ألوان متدرجة' },
    { id:'shadow',    name:'ظل',        price:600, desc:'هالة سوداء' },
    { id:'bubble',    name:'فقاعي',     price:900, desc:'فقاعات صاعدة' },
    { id:'matrix',    name:'مصفوفة',    price:1200,desc:'أرقام متلألئة' },
    /* ═══ جديد ═══ */
    { id:'lightningTrail', name:'برق خلفي',  price:1000, desc:'برق يتتبعك' },
    { id:'petalTrail',     name:'بتلات خلفية',price:700,  desc:'بتلات متطايرة' },
    { id:'smokeTrail',     name:'دخان',       price:550,  desc:'دخان رمادي' },
    { id:'toxicTrail',     name:'سام',        price:850,  desc:'مخلفات سامة' },
    { id:'holyTrail',      name:'مقدس',       price:1500, desc:'آثار مقدسة' },
    { id:'voidTrail',      name:'فراغ',       price:1800, desc:'ثقب أسود مصغّر' },
    { id:'neonTrail',      name:'نيون',       price:1400, desc:'خط نيوني' },
    { id:'auroraTrail',    name:'شفق',        price:2000, desc:'شفق متحرك' },
    { id:'bloodTrail',     name:'دموي',       price:650,  desc:'قطرات حمراء' },
    { id:'crystalTrail',   name:'بلوري',      price:1600, desc:'شظايا بلور' },
    { id:'candyTrail',     name:'حلوى',       price:700,  desc:'حلوى سكرية' },
    { id:'cosmicTrail',    name:'كوني',       price:2200, desc:'غبار الكون' },
    { id:'slimeTrail',     name:'سلايم',      price:800,  desc:'مخاط أخضر' },
    { id:'ghostTrail',     name:'شبح',        price:1100, desc:'آثار شبحية' },
    { id:'musicTrail',     name:'موسيقي',     price:950,  desc:'نوتات موسيقية' }
  ],
  jump: [
    { id:'default', name:'افتراضي', price:0,   desc:'قفزة عادية' },
    { id:'ring',    name:'حلقة',    price:250, desc:'حلقة متوسعة' },
    { id:'burst',   name:'انفجار',  price:450, desc:'جزيئات متطايرة' },
    { id:'star',    name:'نجمة',    price:600, desc:'نجمة متوسعة' },
    { id:'shockwave',name:'موجة',   price:800, desc:'موجة ارتدادية' },
    { id:'spiral',  name:'حلزون',   price:1000,desc:'دوامة متوسعة' },
    /* ═══ جديد ═══ */
    { id:'smokeBomb',   name:'قنبلة دخان', price:400, desc:'دخان كثيف' },
    { id:'fireRing',    name:'حلقة نارية', price:650, desc:'حلقة من النار' },
    { id:'iceBurst',    name:'انفجار ثلجي',price:650, desc:'شظايا جليد' },
    { id:'shadowBurst', name:'انفجار ظلي', price:750, desc:'موجة داكنة' },
    { id:'holyBurst',   name:'انفجار مقدس',price:900, desc:'نور متصاعد' },
    { id:'voidBurst',   name:'فراغ',       price:1200,desc:'فتحة فراغ' },
    { id:'lightningSmash',name:'صاعقة',    price:900, desc:'ضربة برق' },
    { id:'starBurst',   name:'انفجار نجمي',price:1300,desc:'مستعر مصغّر' },
    { id:'waterSplash', name:'رشّة ماء',   price:500, desc:'قطرات ماء' },
    { id:'flowerBurst', name:'انفجار زهور',price:800, desc:'زهور متطايرة' },
    { id:'leafBurst',   name:'انفجار أوراق',price:600,desc:'أوراق متطايرة' },
    { id:'bubbleBurst', name:'فقاعات',     price:550, desc:'فقاعات منفجرة' },
    { id:'heartBurst',  name:'قلوب',       price:700, desc:'قلوب متطايرة' },
    { id:'gearBurst',   name:'تروس',       price:850, desc:'تروس متطايرة' },
    { id:'cosmicBurst', name:'كوني',       price:1500,desc:'انفجار كوني' },
    { id:'holyRing',    name:'حلقة مقدسة', price:1600,desc:'حلقة نورانية' },
    { id:'abyssBurst',  name:'هاوية',      price:1800,desc:'انفجار هاوية' }
  ],
  death: [
    { id:'default',  name:'افتراضي', price:0,   desc:'جزيئات بسيطة' },
    { id:'explode',  name:'انفجار',  price:300, desc:'انفجار كبير' },
    { id:'dissolve', name:'تلاشي',   price:500, desc:'تلاشي ناعم' },
    { id:'pixel',    name:'بكسل',    price:700, desc:'تفكك بكسلي' },
    { id:'shatter',  name:'تحطم',    price:900, desc:'شظايا زجاجية' },
    { id:'nova',     name:'مستعر',   price:1200,desc:'انفجار نجمي' },
    /* ═══ جديد ═══ */
    { id:'implode',     name:'انطواء',      price:600, desc:'انطواء داخلي' },
    { id:'flash',       name:'وميض',        price:550, desc:'وميض ساطع' },
    { id:'vortexDeath', name:'دوّامة',      price:1100,desc:'دوّامة تسحبك' },
    { id:'holyAscend',  name:'صعود مقدس',   price:1500,desc:'نور يصعد بك' },
    { id:'blackHole',   name:'ثقب أسود',    price:1800,desc:'ثقب أسود مصغّر' },
    { id:'fireworks',   name:'ألعاب نارية', price:1300,desc:'ألعاب نارية' },
    { id:'soulRise',    name:'صعود الروح',  price:1400,desc:'روح تصعد' },
    { id:'shatterIce',  name:'تحطم ثلجي',   price:1000,desc:'شظايا جليد' },
    { id:'neonBurst',   name:'نيون',        price:900, desc:'انفجار نيوني' },
    { id:'cosmicVoid',  name:'فراغ كوني',   price:2200,desc:'اختفاء كوني' },
    { id:'starScatter', name:'تناثر نجوم',  price:1600,desc:'نجوم متطايرة' },
    { id:'petalFall',   name:'تساقط بتلات', price:800, desc:'بتلات تتساقط' }
  ],
  aura: [
    { id:'none',      name:'بدون',      price:0,    desc:'لا هالة' },
    { id:'amber',     name:'عنبري',     price:300,  desc:'توهج دافئ' },
    { id:'cyan',      name:'سماوي',     price:400,  desc:'توهج بارد' },
    { id:'fire',      name:'نار',       price:700,  desc:'جمرات دائرة' },
    { id:'ice',       name:'جليد',      price:700,  desc:'بلورات جليد' },
    { id:'lightning', name:'برق',       price:1000, desc:'شرارات كهربائية' },
    { id:'shadow',    name:'ظل',        price:900,  desc:'هالة داكنة' },
    { id:'holy',      name:'نور',       price:1200, desc:'هالة مقدسة' },
    { id:'void',      name:'فراغ',      price:1800, desc:'طاقة بنفسجية' },
    { id:'rainbow',   name:'قوس قزح',   price:2200, desc:'تدرج ملون دوّار' },
    { id:'galaxy',    name:'مجرّة',     price:3000, desc:'نجوم وغيوم' },
    /* ═══ جديد ═══ */
    { id:'toxic',     name:'سام',       price:700,  desc:'هالة سامة' },
    { id:'earth',     name:'أرضي',      price:600,  desc:'جزيئات ترابية' },
    { id:'water',     name:'مائي',      price:800,  desc:'قطرات ماء دوّارة' },
    { id:'wind',      name:'رياح',      price:750,  desc:'دوّامات هوائية' },
    { id:'blood',     name:'دموي',      price:950,  desc:'طاقة دموية' },
    { id:'nature',    name:'طبيعة',     price:850,  desc:'أوراق وزهور' },
    { id:'smokeAura', name:'دخاني',     price:650,  desc:'دخان يلتف' },
    { id:'electricBlue',name:'كهربائي', price:1000, desc:'برق أزرق' },
    { id:'pixelAura', name:'بكسلي',     price:900,  desc:'بكسلات دوّارة' },
    { id:'runes',     name:'روني',      price:1400, desc:'رموز قديمة دوّارة' },
    { id:'music',     name:'موسيقي',    price:1100, desc:'نوتات دوّارة' },
    { id:'candyAura', name:'حلوى',      price:800,  desc:'حلوى تطفو' },
    { id:'cosmicAura',name:'كوني',      price:2600, desc:'غيوم كونية' },
    { id:'divine',    name:'إلهي',      price:3500, desc:'أشعة إلهية' },
    { id:'phantom',   name:'شبحاني',    price:1600, desc:'ظلال متحركة' },
    { id:'prisma',    name:'منشوري',    price:2800, desc:'ألوان منشورية' }
  ],
  crown: [
    { id:'none',    name:'بدون',      price:0,    desc:'لا غطاء للرأس' },
    { id:'bronze',  name:'تاج برونزي', price:200,  desc:'تاج بسيط' },
    { id:'silver',  name:'تاج فضي',   price:400,  desc:'تاج فضي' },
    { id:'gold',    name:'تاج ذهبي',  price:800,  desc:'تاج ملكي' },
    { id:'diamond', name:'تاج ماسي',  price:1400, desc:'تاج ماسي' },
    { id:'leaf',    name:'إكليل',     price:500,  desc:'إكليل زيتون' },
    { id:'flower',  name:'زهرة',      price:600,  desc:'زهرة الرأس' },
    { id:'horns',   name:'قرون',      price:700,  desc:'قرون شيطانية' },
    { id:'flame',   name:'تاج لهبي',  price:1100, desc:'تاج من النار' },
    { id:'ice',     name:'تاج جليدي', price:1100, desc:'تاج من الجليد' },
    { id:'star',    name:'نجمة',      price:1300, desc:'نجمة ساطعة' },
    { id:'skull',   name:'جمجمة',     price:1600, desc:'جمجمة مخيفة' },
    { id:'king',    name:'تاج ملكي',  price:2500, desc:'تاج الأساطير' },
    { id:'hat',     name:'قبعة',      price:300,  desc:'قبعة قماشية' },
    { id:'cap',     name:'كاب',       price:350,  desc:'كاب رياضي' },
    { id:'beanie',  name:'قبعة صوف',  price:400,  desc:'قبعة شتوية' },
    { id:'cowboy',  name:'قبعة راعي', price:700,  desc:'قبعة الغرب' },
    { id:'santa',   name:'بابا نويل', price:800,  desc:'قبعة احتفالية' },
    { id:'party',   name:'قبعة حفلة', price:500,  desc:'قبعة ملونة' },
    { id:'wizard',  name:'قبعة ساحر', price:900,  desc:'قبعة سحرية' },
    { id:'viking',  name:'خوذة فايكنغ', price:1200, desc:'خوذة محارب' },
    { id:'deerHorns', name:'قرون غزال', price:650, desc:'قرون متفرعة' },
    { id:'singleHorn', name:'قرن وحيد', price:550, desc:'قرن وسط الرأس' },
    /* ═══ جديد ═══ */
    { id:'pirate',       name:'قبعة قرصان',   price:900,  desc:'قبعة القراصنة' },
    { id:'wreath',       name:'إكليل زهور',   price:700,  desc:'إكليل من الزهور' },
    { id:'haloBroken',   name:'هالة مكسورة',  price:1300, desc:'هالة مكسورة' },
    { id:'spikeCrown',   name:'تاج الأشواك',  price:1100, desc:'تاج مسيحي' },
    { id:'topHat',       name:'قبعة رسمية',   price:800,  desc:'قبعة سوداء أنيقة' },
    { id:'graduationCap',name:'قبعة تخرج',    price:750,  desc:'قبعة تخرج' },
    { id:'jesterHat',    name:'قبعة مهرج',    price:850,  desc:'قبعة ملونة بأجراس' },
    { id:'chefHat',      name:'قبعة طاهي',    price:600,  desc:'قبعة الطاهي' },
    { id:'propeller',    name:'قبعة مروحية',  price:950,  desc:'قبعة مع مروحة' },
    { id:'bunnyEars',    name:'آذان أرنب',    price:700,  desc:'آذان أرنب' },
    { id:'catEars',      name:'آذان قطة',     price:700,  desc:'آذان قطة' },
    { id:'devilHorns',   name:'قرون الشيطان', price:1000, desc:'قرون حمراء' },
    { id:'pumpkinHead',  name:'رأس يقطين',    price:1400, desc:'يقطينة على الرأس' },
    { id:'crownSkull',   name:'تاج الجماجم',  price:2000, desc:'تاج بجماجم' },
    { id:'angelRing',    name:'حلقة ملاك',    price:1600, desc:'حلقة نور' },
    { id:'cyberVisor',   name:'نظارة سايبر',  price:1300, desc:'نظارة سيبرانية' },
    { id:'gasMask',      name:'كمامة غاز',    price:1100, desc:'كمامة غاز' },
    { id:'lightBulb',    name:'مصباح',        price:600,  desc:'مصباح متوهج' },
    { id:'mushroomCap',  name:'قبعة فطر',     price:750,  desc:'قبعة فطر' },
    { id:'sunhat',       name:'قبعة شمسية',   price:650,  desc:'قبعة صيفية' },
    { id:'sombrero',     name:'سومبريرو',     price:850,  desc:'قبعة مكسيكية' },
    { id:'crownFireworks',name:'تاج الألعاب النارية',price:2200, desc:'تاج متفجر' },
    { id:'crownDivine',  name:'تاج إلهي',     price:4000, desc:'تاج الأساطير الأعلى' },
    { id:'crownCosmic',  name:'تاج كوني',     price:3000, desc:'تاج المجرّة' },
    { id:'crownPrisma',  name:'تاج منشوري',   price:3500, desc:'تاج بألوان قوس قزح' }
  ],
  cape: [
    { id:'none',        name:'بدون',         price:0,    desc:'لا وشاح' },
    { id:'scarf_red',   name:'وشاح أحمر',    price:300,  desc:'وشاح قصير' },
    { id:'scarf_blue',  name:'وشاح أزرق',    price:300,  desc:'وشاح قصير' },
    { id:'scarf_gold',  name:'وشاح ذهبي',    price:500,  desc:'وشاح فاخر' },
    { id:'cape_hero',   name:'عباءة البطل',  price:900,  desc:'عباءة بطولية' },
    { id:'cape_dark',   name:'عباءة الظلام', price:1200, desc:'عباءة داكنة' },
    { id:'cape_royal',  name:'عباءة ملكية',  price:1500, desc:'عباءة ملوك' },
    { id:'cape_shadow', name:'عباءة الظل',   price:1800, desc:'ظل يتبعك' },
    { id:'cape_rainbow',name:'عباءة قوس قزح',price:2200, desc:'ألوان متحركة' },
    { id:'cape_galaxy', name:'عباءة مجرّة',  price:3000, desc:'نجوم متلألئة' },
    /* ═══ جديد ═══ */
    { id:'cape_fire',    name:'عباءة النار',  price:1600, desc:'لهب مستمر' },
    { id:'cape_ice',     name:'عباءة الجليد', price:1600, desc:'بلورات ثلجية' },
    { id:'cape_wind',    name:'عباءة الريح',  price:1400, desc:'دوّامات هوائية' },
    { id:'cape_water',   name:'عباءة الماء',  price:1500, desc:'موج يتدفق' },
    { id:'cape_leaf',    name:'عباءة الأوراق',price:1200, desc:'أوراق متطايرة' },
    { id:'cape_neon',    name:'عباءة نيونية', price:1900, desc:'خطوط نيون' },
    { id:'cape_toxic',   name:'عباءة سامة',   price:1300, desc:'سائل أخضر' },
    { id:'cape_blood',   name:'عباءة دموية',  price:1500, desc:'قطرات حمراء' },
    { id:'cape_holy',    name:'عباءة مقدسة',  price:2500, desc:'نور ذهبي' },
    { id:'cape_void',    name:'عباءة الفراغ', price:2800, desc:'امتصاص ضوء' },
    { id:'cape_crystal', name:'عباءة البلور', price:2100, desc:'شظايا بلورية' },
    { id:'cape_butterfly',name:'أجنحة الفراشة',price:1700, desc:'أجنحة ناعمة' },
    { id:'cape_dragon',  name:'أجنحة التنين', price:3200, desc:'أجنحة تنّين' },
    { id:'cape_angel',   name:'أجنحة الملاك', price:3500, desc:'أجنحة ريشية' },
    { id:'cape_demon',   name:'أجنحة الشيطان',price:3500, desc:'أجنحة جلدية' },
    { id:'cape_cosmic',  name:'عباءة كونية',  price:4000, desc:'مجرة مصغّرة' },
    { id:'cape_prismatic',name:'عباءة منشورية',price:5000, desc:'ألوان قوس قزح حيّة' },
    { id:'cape_god',     name:'عباءة الإله',  price:8000, desc:'عباءة الأساطير' }
  ]
};

/* ═══════════ الفئات الجديدة ═══════════ */

COSMETICS.headItem = [
  { id:'none', name:'بدون', price:0, desc:'لا شيء' },
  { id:'tophat', name:'قبعة رسمية', price:400, desc:'أنيقة' },
  { id:'cap_red', name:'كاب أحمر', price:250, desc:'رياضي' },
  { id:'beanie', name:'قبعة صوف', price:350, desc:'شتوية' },
  { id:'crown_gold', name:'تاج ذهبي', price:1200, desc:'ملكي' },
  { id:'horns_demon', name:'قرون شيطان', price:900, desc:'مرعب' },
  { id:'halo', name:'هالة ملاك', price:1400, desc:'مقدس' },
  { id:'wizard', name:'قبعة ساحر', price:1000, desc:'سحري' },
  { id:'viking_helm', name:'خوذة فايكنغ', price:1100, desc:'محارب' },
  { id:'cowboy', name:'قبعة راعي', price:750, desc:'الغرب' },
  { id:'santa', name:'قبعة بابا نويل', price:600, desc:'عيد' },
  { id:'graduation', name:'قبعة تخرج', price:800, desc:'أكاديمي' }
];

COSMETICS.backItem = [
  { id:'none', name:'بدون', price:0 },
  { id:'wings_angel', name:'أجنحة ملاك', price:2500, desc:'ريش نوراني' },
  { id:'wings_demon', name:'أجنحة شيطان', price:2500, desc:'جلد داكن' },
  { id:'wings_dragon', name:'أجنحة تنين', price:3500, desc:'حراشف' },
  { id:'wings_butterfly', name:'أجنحة فراشة', price:1800, desc:'ملونة' },
  { id:'jetpack', name:'حقيبة طائرة', price:1500, desc:'صاروخ' },
  { id:'backpack_hero', name:'حقيبة بطل', price:900, desc:'مغامر' },
  { id:'shield_round', name:'درع دائري', price:1200, desc:'دفاعي' },
  { id:'katana_x2', name:'سيفان', price:2200, desc:'نينجا' },
  { id:'astronaut_tank', name:'خزان أوكسجين', price:1600, desc:'فضاء' },
  { id:'rocket_pack', name:'صاروخ خلفي', price:2800, desc:'علمي' },
  { id:'aura_sphere', name:'كرة طاقة', price:3000, desc:'كوني' }
];

COSMETICS.heldItem = [
  { id:'none', name:'بدون', price:0 },
  { id:'sword_wood', name:'سيف خشبي', price:300, desc:'مبتدئ' },
  { id:'sword_iron', name:'سيف حديدي', price:800, desc:'محارب' },
  { id:'sword_gold', name:'سيف ذهبي', price:1800, desc:'أسطوري' },
  { id:'staff_wizard', name:'عصا ساحر', price:1200, desc:'سحر' },
  { id:'staff_nature', name:'عصا طبيعية', price:1000, desc:'حياة' },
  { id:'torch', name:'شعلة', price:400, desc:'إضاءة' },
  { id:'lantern', name:'فانوس', price:600, desc:'هادئ' },
  { id:'flag', name:'علم', price:350, desc:'شعار' },
  { id:'umbrella', name:'مظلة', price:500, desc:'مطر' },
  { id:'balloon_string', name:'بالون', price:400, desc:'مرح' },
  { id:'ice_cream', name:'مثلجات', price:300, desc:'صيفي' },
  { id:'guitar', name:'جيتار', price:900, desc:'موسيقي' },
  { id:'mic_stand', name:'ميكروفون', price:700, desc:'غناء' },
  { id:'scepter_divine', name:'صولجان إلهي', price:3500, desc:'أساطير' },
  { id:'scythe_reaper', name:'منجل الموت', price:3200, desc:'حاصد' }
];

COSMETICS.nameTag = [
  { id:'default', name:'افتراضي', price:0 },
  { id:'neon_blue', name:'نيون أزرق', price:200 },
  { id:'neon_pink', name:'نيون وردي', price:200 },
  { id:'gold_royal', name:'ذهبي ملكي', price:600 },
  { id:'rainbow', name:'قوس قزح', price:1000 },
  { id:'flame', name:'لهبي', price:800 },
  { id:'crystal', name:'بلوري', price:900 },
  { id:'holo', name:'هولوجرافي', price:1500 }
];

COSMETICS.badge = [
  { id:'none', name:'بدون', price:0 },
  { id:'star_blue', name:'نجمة زرقاء', price:100 },
  { id:'star_gold', name:'نجمة ذهبية', price:300 },
  { id:'crown_mini', name:'تاج صغير', price:500 },
  { id:'flame_mini', name:'لهب صغير', price:400 },
  { id:'skull_mini', name:'جمجمة صغيرة', price:600 },
  { id:'diamond_mini', name:'ألماسة صغيرة', price:800 }
];

COSMETICS.avatarFrame = [
  { id:'default', name:'افتراضي', price:0 },
  { id:'bronze', name:'برونزي', price:200 },
  { id:'silver', name:'فضي', price:400 },
  { id:'gold', name:'ذهبي', price:800 },
  { id:'platinum', name:'بلاتيني', price:1400 },
  { id:'diamond', name:'ماسي', price:2200 },
  { id:'flames', name:'لهيب', price:1800 },
  { id:'ice', name:'جليد', price:1800 },
  { id:'cosmic', name:'كوني', price:3000 },
  { id:'divine', name:'إلهي', price:4000 }
];

COSMETICS.banner = [
  { id:'default', name:'افتراضي', price:0 },
  { id:'gradient_sunset', name:'غروب', price:300 },
  { id:'gradient_ocean', name:'محيط', price:300 },
  { id:'galaxy_bg', name:'مجرّة', price:1200 },
  { id:'flames_bg', name:'لهيب', price:1000 },
  { id:'forest_bg', name:'غابة', price:700 },
  { id:'neon_city', name:'مدينة نيون', price:1500 }
];

COSMETICS.groundMark = [
  { id:'none', name:'بدون', price:0 },
  { id:'ring_amber', name:'حلقة عنبرية', price:300 },
  { id:'ring_cyan', name:'حلقة سماوية', price:300 },
  { id:'ring_gold', name:'حلقة ذهبية', price:600 },
  { id:'rune_circle', name:'دائرة رونية', price:1200 },
  { id:'pentagram', name:'خماسي', price:1000 },
  { id:'portal', name:'بوابة', price:1800 },
  { id:'spinning_stars', name:'نجوم دوّارة', price:1500 }
];

COSMETICS.spawnEffect = [
  { id:'default', name:'افتراضي', price:0 },
  { id:'explosion', name:'انفجار', price:400 },
  { id:'beam_down', name:'شعاع نزول', price:600 },
  { id:'portal_open', name:'فتح بوابة', price:1200 },
  { id:'thunder_strike', name:'صاعقة', price:900 },
  { id:'feather_fall', name:'ريش متساقط', price:700 }
];

COSMETICS.reviveEffect = [
  { id:'default', name:'افتراضي', price:0 },
  { id:'phoenix_flame', name:'لهب العنقاء', price:1500 },
  { id:'holy_light', name:'نور مقدس', price:1200 },
  { id:'time_rewind', name:'إعادة الزمن', price:1800 },
  { id:'crystal_shatter', name:'تحطم بلوري', price:1000 }
];

COSMETICS.hitEffect = [
  { id:'default', name:'افتراضي', price:0 },
  { id:'sparks', name:'شرارات', price:300 },
  { id:'shatter', name:'تحطم', price:500 },
  { id:'shockwave', name:'موجة', price:700 },
  { id:'lightning', name:'برق', price:900 },
  { id:'explosion', name:'انفجار', price:1100 }
];

/* ============================================================
   ═══════════ DEFAULT SKIN IMAGE (SVG inline) ══════════════
   ═══════════════════════════════════════════════════════════
   صورة افتراضية لكل لاعب — SVG data URL مدمج
   لا يمكن حذفها (تُستخدم كـ fallback)
   ============================================================ */
const DEFAULT_SKIN_IMAGE = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <radialGradient id="body" cx="35%" cy="30%" r="75%">
      <stop offset="0%"   stop-color="#FFF9F0"/>
      <stop offset="50%"  stop-color="#F5EFE6"/>
      <stop offset="100%" stop-color="#D9CBBA"/>
    </radialGradient>
    <radialGradient id="shine" cx="30%" cy="25%" r="40%">
      <stop offset="0%"   stop-color="#FFFFFF" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="100" cy="100" r="92" fill="url(#body)" stroke="#C8B8A8" stroke-width="3"/>
  <ellipse cx="70" cy="62" rx="34" ry="20" fill="url(#shine)" transform="rotate(-30 70 62)"/>
  <circle cx="72"  cy="88" r="9" fill="#1A1512"/>
  <circle cx="128" cy="88" r="9" fill="#1A1512"/>
  <circle cx="69"  cy="85" r="3" fill="#FFFFFF"/>
  <circle cx="125" cy="85" r="3" fill="#FFFFFF"/>
  <ellipse cx="60"  cy="115" rx="12" ry="7" fill="#E07A3F" opacity="0.35"/>
  <ellipse cx="140" cy="115" rx="12" ry="7" fill="#E07A3F" opacity="0.35"/>
  <path d="M 78 128 Q 100 145 122 128" stroke="#1A1512" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>
`);

/* ═══ الأزياء ═══ */
const DEFAULT_SKIN = {
  id: 'default',
  ar: 'افتراضي',
  en: 'DEFAULT',
  imageData: DEFAULT_SKIN_IMAGE,
  body: '#F5EFE6',
  bodyDark: '#D9CBBA',
  detail: '#1A1512',
  accent: '#FFB060',
  price: 0,
  rarity: 'common',
  isDefault: true
};

const SKINS = [DEFAULT_SKIN];

const RARITY_LABELS = {
  common:  'عادي',
  rare:    'نادر',
  epic:    'ملحمي',
  legend:  'أسطوري',
  mythic:  'خرافي'
};

function currentSkin(){
  const all = getAllSkins();
  return all.find(s=>s.id===Save.data.currentSkin) || all[0];
}

/* ============================================================
   ==================== POWER-UPS SYSTEM v2.0 ================
   نظام تعزيزات ضخم: 42 تعزيزاً · 8 تصنيفات · 6 نُدرات
   ============================================================ */

/* ═══════════════ التصنيفات ═══════════════ */
const POWERUP_CATEGORIES = {
  economy:        { name:'اقتصادية',  en:'ECONOMY',        icon:'💰', color:'#E8B34E', order:1 },
  defense:        { name:'دفاعية',    en:'DEFENSE',        icon:'🛡️', color:'#7BC4B0', order:2 },
  movement:       { name:'حركية',     en:'MOVEMENT',       icon:'🏃', color:'#4A88C8', order:3 },
  time:           { name:'زمنية',     en:'TIME',           icon:'⏱️', color:'#9A6AC8', order:4 },
  offensive:      { name:'هجومية',    en:'OFFENSIVE',      icon:'💥', color:'#E85838', order:5 },
  transformation: { name:'تحوّلية',   en:'TRANSFORM',      icon:'🔮', color:'#A06AD8', order:6 },
  utility:        { name:'أدوات',     en:'UTILITY',        icon:'👁️', color:'#6B9B6B', order:7 },
  special:        { name:'خاصة',      en:'SPECIAL',        icon:'✨', color:'#FFD060', order:8 }
};

/* ═══════════════ مستويات النُدرة ═══════════════ */
const POWERUP_RARITIES = {
  common:    { name:'شائع',       en:'COMMON',    color:'#8B8278', weight:100, maxLevel:5 },
  uncommon:  { name:'غير شائع',   en:'UNCOMMON',  color:'#6B9B6B', weight:65,  maxLevel:5 },
  rare:      { name:'نادر',       en:'RARE',      color:'#4A88C8', weight:35,  maxLevel:4 },
  epic:      { name:'ملحمي',      en:'EPIC',      color:'#9A6AC8', weight:18,  maxLevel:3 },
  legendary: { name:'أسطوري',     en:'LEGENDARY', color:'#E8B34E', weight:8,   maxLevel:2 },
  mythic:    { name:'خرافي',      en:'MYTHIC',    color:'#E85838', weight:3,   maxLevel:1 }
};

/* ═══════════════ القاموس الرئيسي للتعزيزات ═══════════════ */
const POWERUP_DEFS = {

  /* ═══════════════════════════════════════════════════════
     ═══════════════ 1) ECONOMY (اقتصادية) ═══════════════
     ═══════════════════════════════════════════════════════ */

  magnet: {
    id:'magnet', icon:'◉', color:'#C99AC9', label:'مغناطيس',
    desc:'يجذب العملات والكرات نحوك تلقائياً',
    category:'economy', rarity:'common',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:150, priceStep:75,
    baseDuration:5, durationStep:5,
    effect:'pull', pullRadius:280, pullForce:7.5
  },
  double: {
    id:'double', icon:'×2', color:'#E4B853', label:'مضاعف',
    desc:'يضاعف قيمة كل ما تجمعه',
    category:'economy', rarity:'uncommon',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:200, priceStep:100,
    baseDuration:6, durationStep:4,
    effect:'multiplier', multiplier:2
  },
  luck: {
    id:'luck', icon:'🍀', color:'#6BC44C', label:'حظ',
    desc:'يزيد فرص ظهور العناصر النادرة',
    category:'economy', rarity:'uncommon',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:250, priceStep:120,
    baseDuration:8, durationStep:5,
    effect:'luckBoost', luckMul:2.5
  },
  goldenTouch: {
    id:'goldenTouch', icon:'✦', color:'#FFD700', label:'اللمسة الذهبية',
    desc:'كل عملة تصبح عملة ذهبية مضاعفة (×5)',
    category:'economy', rarity:'rare',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:400, priceStep:200,
    baseDuration:4, durationStep:3,
    effect:'goldenCoins', coinMul:5
  },
  vacuum: {
    id:'vacuum', icon:'🌀', color:'#9A8AC8', label:'مكنسة',
    desc:'يجمع كل العملات على الشاشة فوراً',
    category:'economy', rarity:'rare',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:350, priceStep:180,
    instant:true,
    effect:'vacuum'
  },
  multiplier: {
    id:'multiplier', icon:'⨯3', color:'#FF8060', label:'مضاعف النقاط',
    desc:'مضاعف ×3 لكل ما تجمعه',
    category:'economy', rarity:'epic',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:600, priceStep:300,
    baseDuration:5, durationStep:3,
    effect:'multiplier', multiplier:3
  },

  /* ═══════════════════════════════════════════════════════
     ═══════════════ 2) DEFENSE (دفاعية) ═══════════════
     ═══════════════════════════════════════════════════════ */

  shield: {
    id:'shield', icon:'◈', color:'#7BC4B0', label:'درع',
    desc:'يحميك من ضربة واحدة',
    category:'defense', rarity:'common',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:250, priceStep:150,
    singleUse:true,
    effect:'shield'
  },
  ghost: {
    id:'ghost', icon:'◯', color:'#B8A4C9', label:'شبح',
    desc:'يمر بك عبر العقبات دون ضرر',
    category:'defense', rarity:'rare',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:300, priceStep:150,
    baseDuration:4, durationStep:3,
    effect:'phase'
  },
  regen: {
    id:'regen', icon:'✚', color:'#7BC4B0', label:'تجدد',
    desc:'يُجدّد الدرع تلقائياً كل ٣ ثوان',
    category:'defense', rarity:'epic',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:500, priceStep:250,
    baseDuration:12, durationStep:6,
    effect:'regen', regenEvery:180
  },
  immune: {
    id:'immune', icon:'✧', color:'#FFD060', label:'حصانة',
    desc:'حصانة كاملة من جميع الأضرار',
    category:'defense', rarity:'epic',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:550, priceStep:280,
    baseDuration:3, durationStep:2,
    effect:'invuln'
  },
  barrier: {
    id:'barrier', icon:'▬', color:'#88B0D0', label:'حاجز',
    desc:'يولّد حواجز واقية أمامك',
    category:'defense', rarity:'rare',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:380, priceStep:190,
    baseDuration:8, durationStep:4,
    effect:'barrier', barrierEvery:90
  },
  secondChance: {
    id:'secondChance', icon:'♻', color:'#C080FF', label:'فرصة ثانية',
    desc:'يحييك مرة واحدة عند الموت',
    category:'defense', rarity:'legendary',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:1000, priceStep:500,
    singleUse:true,
    effect:'secondChance'
  },

  /* ═══════════════════════════════════════════════════════
     ═══════════════ 3) MOVEMENT (حركية) ═══════════════
     ═══════════════════════════════════════════════════════ */

  extraJump: {
    id:'extraJump', icon:'↑↑', color:'#4CAF50', label:'قفزات إضافية',
    desc:'يمنحك قفزتين إضافيتين',
    category:'movement', rarity:'common',
    modes:['WALK','ASCEND'],
    basePrice:220, priceStep:110,
    baseDuration:5, durationStep:5,
    effect:'extraJump'
  },
  glide: {
    id:'glide', icon:'🪂', color:'#87CEEB', label:'انزلاق',
    desc:'ينزلق بك في الهواء عند الإمساك',
    category:'movement', rarity:'uncommon',
    modes:['WALK','ASCEND'],
    basePrice:280, priceStep:140,
    baseDuration:5, durationStep:5,
    effect:'glide'
  },
  rocket: {
    id:'rocket', icon:'🚀', color:'#FF6B35', label:'صاروخ',
    desc:'يطير بك للأعلى بسرعة عالية',
    category:'movement', rarity:'epic',
    modes:['WALK','ASCEND'],
    basePrice:400, priceStep:200,
    baseDuration:4, durationStep:3,
    effect:'rocket'
  },
  megaJump: {
    id:'megaJump', icon:'⚡', color:'#FFD700', label:'قفزة خارقة',
    desc:'قفزة عالية جداً تتجاوز العقبات',
    category:'movement', rarity:'rare',
    modes:['WALK','ASCEND'],
    basePrice:380, priceStep:190,
    baseDuration:5, durationStep:5,
    effect:'megaJump'
  },
  wallStick: {
    id:'wallStick', icon:'🧲', color:'#8B4513', label:'التصاق',
    desc:'يتيح الالتصاق بالجدران مؤقتاً',
    category:'movement', rarity:'rare',
    modes:['WALK','ASCEND'],
    basePrice:320, priceStep:160,
    baseDuration:5, durationStep:5,
    effect:'wallStick'
  },
  dash: {
    id:'dash', icon:'»', color:'#4A88C8', label:'انطلاقة',
    desc:'انطلاقة سريعة للأمام — تعبر العقبات',
    category:'movement', rarity:'uncommon',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:260, priceStep:130,
    baseDuration:2, durationStep:2,
    effect:'dash', dashForce:14
  },
  jetpack: {
    id:'jetpack', icon:'✈', color:'#FF8040', label:'حقيبة طائرة',
    desc:'طيران مستمر طالما الزر مضغوط',
    category:'movement', rarity:'epic',
    modes:['WALK','ASCEND'],
    basePrice:520, priceStep:260,
    baseDuration:6, durationStep:4,
    effect:'jetpack'
  },
  hover: {
    id:'hover', icon:'⊙', color:'#A8D8E8', label:'تحويم',
    desc:'يتوقف بك في الهواء بلا جاذبية',
    category:'movement', rarity:'uncommon',
    modes:['WALK','ASCEND'],
    basePrice:300, priceStep:150,
    baseDuration:3, durationStep:3,
    effect:'hover'
  },
  teleport: {
    id:'teleport', icon:'⚡', color:'#C080FF', label:'انتقال',
    desc:'ينقلك فوراً ١٠٠م للأمام',
    category:'movement', rarity:'legendary',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:800, priceStep:400,
    instant:true,
    effect:'teleport', distance:100
  },
    infiniteJump: {
    id:'infiniteJump', icon:'∞', color:'#C080FF', label:'قفزات لا نهائية',
    desc:'قفزات غير محدودة في الهواء بلا حدود',
    category:'movement', rarity:'legendary',
    modes:['WALK','ASCEND','SKY_JUMP'],
    basePrice:1200, priceStep:600,
    baseDuration:5, durationStep:3,
    effect:'infiniteJump'
  },

  /* ═══════════════════════════════════════════════════════
     ═══════════════ 4) TIME (زمنية) ═══════════════
     ═══════════════════════════════════════════════════════ */

  slow: {
    id:'slow', icon:'◔', color:'#8FB8D8', label:'تبطيء',
    desc:'يبطئ سرعة العالم مؤقتاً',
    category:'time', rarity:'common',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:180, priceStep:90,
    baseDuration:5, durationStep:4,
    effect:'slow', slowMul:0.55
  },
  timeWarp: {
    id:'timeWarp', icon:'⏱', color:'#9A6AC8', label:'تشويه الزمن',
    desc:'يبطئ الزمن بشكل كبير جداً',
    category:'time', rarity:'rare',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:350, priceStep:175,
    baseDuration:4, durationStep:3,
    effect:'slow', slowMul:0.35
  },
  freeze: {
    id:'freeze', icon:'❄', color:'#A0E0FF', label:'تجميد',
    desc:'يجمّد كل العقبات تماماً',
    category:'time', rarity:'epic',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:600, priceStep:300,
    baseDuration:3, durationStep:2,
    effect:'freeze'
  },
  bulletTime: {
    id:'bulletTime', icon:'⌛', color:'#C0A0FF', label:'وقت الرصاصة',
    desc:'العالم يتحرك ببطء شديد — أنت طبيعي',
    category:'time', rarity:'legendary',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:900, priceStep:450,
    baseDuration:4, durationStep:2,
    effect:'bulletTime', worldMul:0.15
  },
  haste: {
    id:'haste', icon:'⚡', color:'#FFD040', label:'تسريع',
    desc:'يزيد سرعتك الشخصية دون تسريع العالم',
    category:'time', rarity:'rare',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:320, priceStep:160,
    baseDuration:5, durationStep:4,
    effect:'haste', hasteMul:1.6
  },

  /* ═══════════════════════════════════════════════════════
     ═══════════════ 5) OFFENSIVE (هجومية) ═══════════════
     ═══════════════════════════════════════════════════════ */

  destroyer: {
    id:'destroyer', icon:'⚔', color:'#E85838', label:'مدمّر',
    desc:'يحطّم العقبات عند ملامستها',
    category:'offensive', rarity:'epic',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:650, priceStep:325,
    baseDuration:5, durationStep:3,
    effect:'destroyer'
  },
  laser: {
    id:'laser', icon:'⚡', color:'#FF3060', label:'ليزر',
    desc:'يطلق شعاعاً يدمّر العقبات أمامك',
    category:'offensive', rarity:'rare',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:450, priceStep:225,
    baseDuration:6, durationStep:4,
    effect:'laser', laserEvery:18
  },
  bomb: {
    id:'bomb', icon:'💣', color:'#5A5A5A', label:'قنبلة',
    desc:'يُسقط قنابل تنفجر وتمسح العقبات',
    category:'offensive', rarity:'rare',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:420, priceStep:210,
    baseDuration:8, durationStep:4,
    effect:'bomb', bombEvery:60
  },
  shockwave: {
    id:'shockwave', icon:'◎', color:'#80D0FF', label:'موجة صدمية',
    desc:'يُطلق موجة تدفع العقبات بعيداً',
    category:'offensive', rarity:'epic',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:580, priceStep:290,
    baseDuration:4, durationStep:3,
    effect:'shockwave', shockEvery:45
  },
  blackHole: {
    id:'blackHole', icon:'●', color:'#6020A0', label:'ثقب أسود',
    desc:'يجذب كل العقبات نحو نقطة واحدة',
    category:'offensive', rarity:'legendary',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:950, priceStep:475,
    baseDuration:5, durationStep:2,
    effect:'blackHole'
  },

  /* ═══════════════════════════════════════════════════════
     ═══════════════ 6) TRANSFORMATION (تحوّل) ═══════════════
     ═══════════════════════════════════════════════════════ */

  shrink: {
    id:'shrink', icon:'◐', color:'#4A88C8', label:'تصغير',
    desc:'يصغّر حجم اللاعب لتفادي العقبات',
    category:'transformation', rarity:'uncommon',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:300, priceStep:150,
    baseDuration:5, durationStep:4,
    effect:'shrink'
  },
  giant: {
    id:'giant', icon:'⬤', color:'#E85838', label:'عملاق',
    desc:'تصبح عملاقاً يحطّم كل شيء في طريقه',
    category:'transformation', rarity:'epic',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:700, priceStep:350,
    baseDuration:4, durationStep:3,
    effect:'giant'
  },
  phase: {
    id:'phase', icon:'◐', color:'#C080FF', label:'طور',
    desc:'تمر عبر كل العقبات بلا ضرر',
    category:'transformation', rarity:'legendary',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:850, priceStep:425,
    baseDuration:4, durationStep:2,
    effect:'phase'
  },
  clone: {
    id:'clone', icon:'👥', color:'#88C8E8', label:'نسخة',
    desc:'يولّد نسخة وهمية تشتت الانتباه',
    category:'transformation', rarity:'rare',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:400, priceStep:200,
    baseDuration:8, durationStep:5,
    effect:'clone'
  },

  /* ═══════════════════════════════════════════════════════
     ═══════════════ 7) UTILITY (أدوات) ═══════════════
     ═══════════════════════════════════════════════════════ */

  vision: {
    id:'vision', icon:'👁', color:'#6B9B6B', label:'رؤية',
    desc:'يوسّع مدى رؤيتك للعقبات القادمة',
    category:'utility', rarity:'common',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:180, priceStep:90,
    baseDuration:8, durationStep:5,
    effect:'vision'
  },
  compass: {
    id:'compass', icon:'◈', color:'#C98A2E', label:'بوصلة',
    desc:'يُظهر مساراً مرئياً للطريق الآمن',
    category:'utility', rarity:'uncommon',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:280, priceStep:140,
    baseDuration:10, durationStep:5,
    effect:'compass'
  },
  autoPilot: {
    id:'autoPilot', icon:'🤖', color:'#4A88C8', label:'طيار آلي',
    desc:'يتحكم بشخصيتك تلقائياً لتجنب الخطر',
    category:'utility', rarity:'epic',
    modes:['FLIP','FLAP','WALK','ASCEND'],
    basePrice:800, priceStep:400,
    baseDuration:5, durationStep:3,
    effect:'autopilot'
  },
  luckBoost: {
    id:'luckBoost', icon:'✨', color:'#FFD060', label:'حظ مضاعف',
    desc:'يضاعف فرص ظهور كل التعزيزات',
    category:'utility', rarity:'rare',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:400, priceStep:200,
    baseDuration:10, durationStep:6,
    effect:'powerupLuck'
  },

  /* ═══════════════════════════════════════════════════════
     ═══════════════ 8) SPECIAL (خاصة) ═══════════════
     ═══════════════════════════════════════════════════════ */

  phoenix: {
    id:'phoenix', icon:'🔥', color:'#FF5020', label:'عنقاء',
    desc:'يحييك مع انفجار ناري يمحو كل العقبات',
    category:'special', rarity:'mythic',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:2000,
    singleUse:true,
    effect:'phoenix'
  },
  singularity: {
    id:'singularity', icon:'◉', color:'#6020A0', label:'تفرّد',
    desc:'يمتصّ كل العملات والكرات فوراً + مضاعف ×5',
    category:'special', rarity:'mythic',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:1500,
    instant:true,
    effect:'singularity'
  },
  omnipotence: {
    id:'omnipotence', icon:'👑', color:'#FFD700', label:'قدرة مطلقة',
    desc:'يفعّل ٥ تعزيزات عشوائية في وقت واحد',
    category:'special', rarity:'mythic',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:2500,
    instant:true,
    effect:'omnipotence'
  },
  eternity: {
    id:'eternity', icon:'∞', color:'#C080FF', label:'أبدية',
    desc:'يجمّد مؤقتات كل التعزيزات النشطة',
    category:'special', rarity:'legendary',
    modes:['FLIP','FLAP','DRIFT','WALK','ASCEND'],
    basePrice:1200, priceStep:600,
    baseDuration:5, durationStep:3,
    effect:'eternity'
  }
};

const POWERUP_LIST = Object.values(POWERUP_DEFS);
const POWERUP_MAX_LEVEL = 5;
const POWERUP_BASE_SECONDS = 5;
const POWERUP_STEP_SECONDS = 5;

/* ═══════════════ الدوال المساعدة v2 ═══════════════ */
function getPowerupRarity(id){
  const def = POWERUP_DEFS[id];
  if(!def) return POWERUP_RARITIES.common;
  return POWERUP_RARITIES[def.rarity] || POWERUP_RARITIES.common;
}

function getPowerupMaxLevel(id){
  const def = POWERUP_DEFS[id];
  if(!def) return 1;
  if(def.singleUse || def.instant) return 1;
  const rarity = getPowerupRarity(id);
  return rarity.maxLevel || POWERUP_MAX_LEVEL_DEFAULT;
}

function getPowerupLevel(id){
  if(typeof Save === 'undefined' || !Save.data) return 0;
  if(!Save.data.powerupUpgrades) Save.data.powerupUpgrades = {};
  return Save.data.powerupUpgrades[id] || 0;
}

function getPowerupDurationSeconds(id){
  const def = POWERUP_DEFS[id];
  if(!def) return 1;
  if(def.singleUse || def.instant) return 1;
  const base = def.baseDuration || POWERUP_BASE_SECONDS;
  const step = def.durationStep || POWERUP_STEP_SECONDS;
  return base + getPowerupLevel(id) * step;
}

function getPowerupDuration(id){
  return getPowerupDurationSeconds(id) * 60;
}

function getPowerupUpgradePrice(id){
  const def = POWERUP_DEFS[id];
  if(!def || def.singleUse || def.instant) return 0;
  const lvl = getPowerupLevel(id);
  if(lvl >= getPowerupMaxLevel(id)) return 0;
  return def.basePrice + lvl * def.priceStep;
}

function isPowerupMaxed(id){
  return getPowerupLevel(id) >= getPowerupMaxLevel(id);
}

function isPowerupAvailableInMode(id, mode){
  const def = POWERUP_DEFS[id];
  if(!def) return false;
  if(!def.modes) return true;
  return def.modes.includes(mode);
}

/* ═══ اختيار عشوائي مرجّح حسب النُدرة + الحظ ═══ */
function getAvailablePowerupIds(mode){
  return POWERUP_LIST
    .filter(p => isPowerupAvailableInMode(p.id, mode))
    .map(p => p.id);
}

function pickWeightedPowerup(mode){
  const available = POWERUP_LIST.filter(p => isPowerupAvailableInMode(p.id, mode));
  if(available.length === 0) return null;

  /* تعديل الوزن حسب الحظ النشط */
  const luckActive = G.activePowerups.luck || G.activePowerups.luckBoost;
  const luckMul = luckActive ? (POWERUP_DEFS.luck.luckMul || 2) : 1;

  let totalWeight = 0;
  const weighted = available.map(p => {
    const rar = POWERUP_RARITIES[p.rarity] || POWERUP_RARITIES.common;
    let w = rar.weight;
    /* العناصر النادرة تكتسب وزناً مع الحظ */
    if(p.rarity !== 'common' && p.rarity !== 'uncommon') w *= luckMul;
    totalWeight += w;
    return { def: p, weight: w };
  });

  let roll = Math.random() * totalWeight;
  for(const item of weighted){
    roll -= item.weight;
    if(roll <= 0) return item.def;
  }
  return weighted[0].def;
}

function makePowerup(x, y, opts){
  const def = pickWeightedPowerup(G.mode);
  if(!def) return null;
  return Object.assign({
    x, y, r: 14,
    type: def,
    duration: getPowerupDuration(def.id),
    t: 0, dead: false
  }, opts || {});
}

function spawnPowerup(cx, cy){
  const p = makePowerup(cx, cy);
  if(p) powerups.push(p);
}

/* ============================================================
   ═══════════ COSMETIC GETTERS v3 ═══════════════════════════
   ═══════════════════════════════════════════════════════════
   جميع الدوال تُعيد عنصراً آمناً (id:'none') إذا لم يوجد
   ============================================================ */

function _getCurrentCosmetic(category){
  const id = Save.data.cosmetics?.current?.[category] || 'none';
  if(id === 'none') return { id:'none' };
  return getAllCosmetics(category).find(c => c.id === id) || { id:'none' };
}

/* ═══ التأثيرات (9) ═══ */
const currentHead   = () => _getCurrentCosmetic('head');
const currentBack   = () => _getCurrentCosmetic('back');
const currentEyes   = () => _getCurrentCosmetic('eyes');
const currentTrail  = () => _getCurrentCosmetic('trail');
const currentSpark  = () => _getCurrentCosmetic('spark');
const currentJump   = () => _getCurrentCosmetic('jump');
const currentSpawn  = () => _getCurrentCosmetic('spawn');
const currentRevive = () => _getCurrentCosmetic('revive');
const currentDeath  = () => _getCurrentCosmetic('death');

/* ═══ الجماليات (5) ═══ */
const currentAvatar      = () => _getCurrentCosmetic('avatar');
const currentAvatarFrame = () => _getCurrentCosmetic('avatarFrame');
const currentBanner      = () => _getCurrentCosmetic('banner');
const currentNameTag     = () => _getCurrentCosmetic('nameTag');
const currentBadge       = () => _getCurrentCosmetic('badge');

/* ═══ توافق خلفي — للكود القديم الذي قد يستدعيها ═══ */
const currentCrown     = currentHead;      /* crown → head */
const currentCape      = currentBack;      /* cape → back */
const currentHeadItem  = currentHead;      /* headItem → head */
const currentBackItem  = currentBack;      /* backItem → back */
const currentSpawnEffect  = currentSpawn;
const currentReviveEffect = currentRevive;
const currentHitEffect    = currentDeath;  /* hitEffect مدموج مع death */

/* ═══ دوال قديمة معطّلة (تُعيد 'none' دائماً) ═══ */
const currentAura       = () => ({ id:'none' });
const currentCompanion  = () => ({ id:'none' });
const currentFootstep   = () => ({ id:'none' });
const currentHeldItem   = () => ({ id:'none' });
const currentGroundMark = () => ({ id:'none' });

/* ============================================================
   ==================== DEFAULT SAVE DATA ====================
   ============================================================ */
const DEFAULT_SAVE_DATA = {
  coins: 0,
  bestMeters: { FLIP:0, FLAP:0, DRIFT:0, WALK:0, FLIP_WALK:0, SKY_JUMP:0, MIXED:0 },
ownedSkins: ['default'],
currentSkin: 'default',
/* استبدل cosmetics في DEFAULT_SAVE_DATA بـ: */
cosmetics: {
  owned: {
    /* ═══ التأثيرات (9) ═══ */
    head:   ['none'],
    back:   ['none'],
    eyes:   ['none'],
    trail:  ['none'],
    spark:  ['none'],
    jump:   ['none'],
    spawn:  ['none'],
    revive: ['none'],
    death:  ['none'],
    /* ═══ الجماليات (5) ═══ */
    avatar:      ['none'],
    avatarFrame: ['none'],
    banner:      ['none'],
    nameTag:     ['none'],
    badge:       ['none']
  },
  current: {
    /* ═══ التأثيرات (9) ═══ */
    head:   'none',
    back:   'none',
    eyes:   'none',
    trail:  'none',
    spark:  'none',
    jump:   'none',
    spawn:  'none',
    revive: 'none',
    death:  'none',
    /* ═══ الجماليات (5) ═══ */
    avatar:      'none',
    avatarFrame: 'none',
    banner:      'none',
    nameTag:     'none',
    badge:       'none'
  }
},
  achievements: {},
  claimedGlobalLevels: [],
  mode: 'FLIP',
  stats: { totalPlays:0, totalMeters:0, totalCoins:0, orbCount:0, bestMeters:0, bestCombo:0, shiftRuns:0 },
  settings: { sound:true, haptics:true },
  season: { number: 1, startDate: null, points: 0 },
  battlePass: { claimedFree: [], claimedPremium: [] },
  missions: {
    daily: [], weekly: [], monthly: [],
    dailyReset: null, weeklyReset: null, monthlyReset: null,
    progressDaily:   { plays:0, meters:0, coins:0, orbs:0 },
    progressWeekly:  { plays:0, meters:0, coins:0, orbs:0 },
    progressMonthly: { plays:0, meters:0, coins:0, orbs:0 }
  },
  dailyLogin: { streak: 0, lastClaim: null, claimedToday: false },
  powerupUpgrades: {},
  admin: {
    access: false,
    unlimitedCoins: false,
    unlimitedUnlock: false,
    godMode: false,
    infiniteJump: false,
customSkins: [], customSpark: [], customTrail: [], customJump: [],
customDeath: [], customAura: [], customCrown: [], customCape: [],
customEyes: [], customCompanion: [], customFootstep: [],
customHeadItem: [], customBackItem: [], customHeldItem: [],
customGroundMark: [], customNameTag: [], customBadge: [],
customAvatarFrame: [], customBanner: [],
customSpawnEffect: [], customReviveEffect: [], customHitEffect: [],
    lastContentSync: null,
    sources: [
      { id:'src_rank_1', type:'season_rank', name:'تصنيف الموسم 1', start:'2024-01-01', end:'2024-03-31', active:true },
      { id:'src_bp_1',   type:'battle_pass', name:'باتل باس الموسم 1', start:'2024-01-01', end:'2024-03-31', active:true },
      { id:'src_login',  type:'daily_login', name:'التسجيل اليومي',  start:'2024-01-01', end:'2099-12-31', active:true },
      { id:'src_chest',  type:'chest',       name:'الصناديق',         start:'2024-01-01', end:'2099-12-31', active:true },
      { id:'src_wheel',  type:'lucky_wheel', name:'عجلة الحظ',        start:'2024-01-01', end:'2099-12-31', active:true }
    ]
  },
  titles: { equipped: 'rookie', owned: ['rookie'] },
inventory: { seen: [] },
};

/* ============================================================
   ═══════════════ SAVE SYSTEM v10 — CLEAN ═══════════════════
   ============================================================
   - لا استخدام لـ localStorage (كل شيء في الذاكرة + Firebase)
   - ترحيلات شاملة لكل الفئات القديمة والجديدة
   - دوال مساعدة للحصول على القيم بأمان
   ============================================================ */

const Save = {
  KEY: 'shift_v10',

  /* ═══════════════ الحالة في الذاكرة ═══════════════ */
  data: JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA)),

  /* ═══════════════ تحميل (لا شيء — Firebase يتولى) ═══════════════ */
  load(){
    /* لا يوجد تحميل محلي — Firebase سيتولّى الأمر بعد تسجيل الدخول */
  },

  /* ═══════════════ دمج بيانات السحابة فوق الافتراضيات ═══════════════ */
  applyCloud(cloudData){
    const base = JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA));

    if(cloudData && typeof cloudData === 'object'){
      for(const k in cloudData){
        const v = cloudData[k];
        /* دمج عميق للأشياء، استبدال للقيم البسيطة */
        if(v && typeof v === 'object' && !Array.isArray(v) &&
           base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])){
          base[k] = Object.assign({}, base[k], v);
        } else {
          base[k] = v;
        }
      }
    }

    this.data = base;
    this.runMigrations();
  },

  /* ═══════════════ ترحيلات وإصلاحات ═══════════════ */
  runMigrations(){
/* ═══ cosmetics — ترحيل كامل للنظام v3 ═══ */
if(!this.data.cosmetics) this.data.cosmetics = { owned: {}, current: {} };
if(!this.data.cosmetics.owned)   this.data.cosmetics.owned = {};
if(!this.data.cosmetics.current) this.data.cosmetics.current = {};

/* ═══ قائمة ثابتة محلية — لا تعتمد على ترتيب التعريف ═══ */
const V3_CATEGORIES_LOCAL = [
  /* التأثيرات (9) */
  'head','back','eyes','trail','spark','jump','spawn','revive','death',
  /* الجماليات (5) */
  'avatar','avatarFrame','banner','nameTag','badge'
];

/* ═══ حذف كل التصنيفات القديمة (غير الموجودة في v3) ═══ */
const v3Set = new Set(V3_CATEGORIES_LOCAL);
const oldOwned = this.data.cosmetics.owned;
const oldCurrent = this.data.cosmetics.current;

for(const oldCat of Object.keys(oldOwned)){
  if(!v3Set.has(oldCat)){
    delete oldOwned[oldCat];
  }
}
for(const oldCat of Object.keys(oldCurrent)){
  if(!v3Set.has(oldCat)){
    delete oldCurrent[oldCat];
  }
}

/* ═══ ضمان وجود كل تصنيفات v3 ═══ */
for(const cat of V3_CATEGORIES_LOCAL){
  /* ─── owned ─── */
  if(!Array.isArray(this.data.cosmetics.owned[cat])){
    this.data.cosmetics.owned[cat] = ['none'];
  } else {
    /* أضف 'none' إن لم يكن موجوداً */
    if(!this.data.cosmetics.owned[cat].includes('none')){
      this.data.cosmetics.owned[cat].unshift('none');
    }
    /* نظّف أي قيم غير نصية أو فارغة */
    this.data.cosmetics.owned[cat] = this.data.cosmetics.owned[cat]
      .filter(id => typeof id === 'string' && id.length > 0);
  }

  /* ─── current ─── */
  if(!this.data.cosmetics.current[cat]){
    this.data.cosmetics.current[cat] = 'none';
  }
  /* تحقق من أن current موجود ضمن owned */
  if(!this.data.cosmetics.owned[cat].includes(this.data.cosmetics.current[cat])){
    this.data.cosmetics.current[cat] = 'none';
  }
}

    /* ═══ bestMeters — ضمان كل الأنماط ═══ */
    if(!this.data.bestMeters || typeof this.data.bestMeters !== 'object'){
      this.data.bestMeters = JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA.bestMeters));
    }
    ['FLIP','FLAP','DRIFT','WALK','MIXED','ASCEND'].forEach(m => {
      if(typeof this.data.bestMeters[m] !== 'number') this.data.bestMeters[m] = 0;
    });

    /* ═══ ترحيل الأنماط القديمة ═══ */
    if(this.data.mode === 'FLIP_WALK' || this.data.mode === 'SKY_JUMP'){
      this.data.mode = 'WALK';
    }
    delete this.data.runType;

    /* ═══ stats ═══ */
    if(!this.data.stats || typeof this.data.stats !== 'object'){
      this.data.stats = JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA.stats));
    }
    const statsDefaults = { totalPlays:0, totalMeters:0, totalCoins:0, orbCount:0, bestMeters:0, bestCombo:0, shiftRuns:0 };
    for(const k in statsDefaults){
      if(typeof this.data.stats[k] !== 'number') this.data.stats[k] = statsDefaults[k];
    }

    /* ═══ powerupUpgrades ═══ */
    if(!this.data.powerupUpgrades || typeof this.data.powerupUpgrades !== 'object'){
      this.data.powerupUpgrades = {};
    }
    if(typeof POWERUP_DEFS !== 'undefined'){
      Object.keys(POWERUP_DEFS).forEach(id => {
        if(typeof this.data.powerupUpgrades[id] !== 'number'){
          this.data.powerupUpgrades[id] = 0;
        }
      });
    }

    /* ═══ admin ═══ */
    if(!this.data.admin){
      this.data.admin = JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA.admin));
    }
    if(typeof this.data.admin.infiniteJump !== 'boolean'){
    this.data.admin.infiniteJump = false;
    }
    if(!Array.isArray(this.data.admin.sources) || this.data.admin.sources.length === 0){
      this.data.admin.sources = JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA.admin.sources));
    }

    /* ✅ كل مصفوفات المحتوى المخصص (قديمة + جديدة) */
    const allCustomKeys = [
      /* قديمة */
      'customSkins','customEyes','customCompanion','customFootstep',
      'customSpark','customTrail','customJump','customDeath',
      'customAura','customCrown','customCape',
      /* ✨ جديدة */
      'customHeadItem','customBackItem','customHeldItem',
      'customGroundMark','customNameTag','customBadge',
      'customAvatarFrame','customBanner',
      'customSpawnEffect','customReviveEffect','customHitEffect'
    ];
    allCustomKeys.forEach(k => {
      if(!Array.isArray(this.data.admin[k])) this.data.admin[k] = [];
    });

    /* ✅ titles ═══ */
    if(!this.data.titles || typeof this.data.titles !== 'object'){
      this.data.titles = { equipped: 'rookie', owned: ['rookie'] };
    }

    /* ═══ season ═══ */
    if(!this.data.season || typeof this.data.season !== 'object'){
      this.data.season = { number: 1, startDate: null, points: 0 };
    }
    if(typeof this.data.season.points !== 'number') this.data.season.points = 0;

    /* ═══ battlePass ═══ */
    if(!this.data.battlePass || typeof this.data.battlePass !== 'object'){
      this.data.battlePass = { claimedFree: [], claimedPremium: [] };
    }
    if(!Array.isArray(this.data.battlePass.claimedFree))    this.data.battlePass.claimedFree = [];
    if(!Array.isArray(this.data.battlePass.claimedPremium)) this.data.battlePass.claimedPremium = [];

    /* ═══ missions ═══ */
    if(!this.data.missions || typeof this.data.missions !== 'object'){
      this.data.missions = JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA.missions));
    }

    /* ═══ dailyLogin ═══ */
    if(!this.data.dailyLogin || typeof this.data.dailyLogin !== 'object'){
      this.data.dailyLogin = { streak: 0, lastClaim: null, claimedToday: false };
    }

/* ═══ ownedSkins — ضمان أن الافتراضي موجود دائماً ═══ */
if(!Array.isArray(this.data.ownedSkins)){
  this.data.ownedSkins = ['default'];
}
/* ✅ الإصلاح: أضف 'default' إذا كان مفقوداً (ليس فقط عندما تكون فارغة) */
if(!this.data.ownedSkins.includes('default')){
  this.data.ownedSkins.unshift('default');
}
/* تنظيف القيم غير النصية */
this.data.ownedSkins = this.data.ownedSkins.filter(id => typeof id === 'string' && id.length > 0);

    /* ═══ settings ═══ */
    if(!this.data.settings || typeof this.data.settings !== 'object'){
      this.data.settings = { sound: true, haptics: true };
    }

    /* ═══ achievements ═══ */
    if(!this.data.achievements || typeof this.data.achievements !== 'object'){
      this.data.achievements = {};
    }

    /* ═══ claimedGlobalLevels ═══ */
    if(!Array.isArray(this.data.claimedGlobalLevels)){
      this.data.claimedGlobalLevels = [];
    }
  },

  /* ═══════════════ الحفظ — دفع إلى Firebase فقط ═══════════════ */
  save(){
    try {
      if(typeof Cloud !== 'undefined' && Cloud.user && Cloud.db){
        Cloud.queueSync();
      }
    } catch(e){
      /* صامت */
    }
  },

  /* ═══════════════ حذف التقدم — تصفير + دفع للسحابة ═══════════════ */
  reset(){
    this.data = JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA));
    this.runMigrations();
    try {
      if(typeof Cloud !== 'undefined' && Cloud.user && Cloud.db){
        Cloud.pushSave();
      }
    } catch(e){
      /* صامت */
    }
  },

  /* ═══════════════════════════════════════════════════════
     ═══════════════ دوال مساعدة (جديدة) ═══════════════
     ═══════════════════════════════════════════════════════ */

  /* ═══ الحصول على تجميل حالي بأمان ═══ */
  getCurrentCosmetic(category){
    if(!this.data.cosmetics || !this.data.cosmetics.current) return null;
    return this.data.cosmetics.current[category] || null;
  },

  /* ═══ تعيين تجميل حالي ═══ */
  setCurrentCosmetic(category, itemId){
    if(!this.data.cosmetics) this.data.cosmetics = { owned:{}, current:{} };
    if(!this.data.cosmetics.current) this.data.cosmetics.current = {};
    this.data.cosmetics.current[category] = itemId;
    this.save();
  },

  /* ═══ هل اللاعب يملك عنصراً؟ ═══ */
  ownsCosmetic(category, itemId){
    if(!this.data.cosmetics || !this.data.cosmetics.owned) return false;
    const list = this.data.cosmetics.owned[category] || [];
    return list.includes(itemId);
  },

  /* ═══ إضافة عنصر للملكية ═══ */
  grantCosmetic(category, itemId){
    if(!this.data.cosmetics) this.data.cosmetics = { owned:{}, current:{} };
    if(!this.data.cosmetics.owned) this.data.cosmetics.owned = {};
    if(!Array.isArray(this.data.cosmetics.owned[category])){
      this.data.cosmetics.owned[category] = [];
    }
    if(!this.data.cosmetics.owned[category].includes(itemId)){
      this.data.cosmetics.owned[category].push(itemId);
      return true;
    }
    return false;
  },

  /* ═══ إحصاءات سريعة ═══ */
  getTotalCosmeticsOwned(){
    if(!this.data.cosmetics || !this.data.cosmetics.owned) return 0;
    let total = 0;
    for(const cat in this.data.cosmetics.owned){
      total += (this.data.cosmetics.owned[cat] || []).length;
    }
    return total;
  },

  /* ═══ تصدير البيانات (للنسخ الاحتياطي) ═══ */
  export(){
    try {
      return JSON.stringify(this.data);
    } catch(e){
      return null;
    }
  },

  /* ═══ استيراد البيانات ═══ */
  import(jsonString){
    try {
      const parsed = JSON.parse(jsonString);
      if(parsed && typeof parsed === 'object'){
        this.data = parsed;
        this.runMigrations();
        this.save();
        return true;
      }
    } catch(e){
      console.error('[Save] Import failed:', e);
    }
    return false;
  }
};

Save.load();
Save.runMigrations();

/* ============================================================
   ═══════════ COSMETIC CATEGORIES v3 — IMAGE-BASED ══════════
   ============================================================
   - كل العناصر تعتمد على صور خارجية
   - 9 تأثيرات جوهرية + 5 جماليات شخصية
   - لا رسم برمجي — فقط صور
   ============================================================ */

const COSMETIC_CATEGORIES = {
  /* ═══════ التأثيرات الجوهرية (9) ═══════ */
  head: {
    label:'الرأس', en:'HEAD', icon:'👑', folder:'head',
    color:'#E8B34E', order:1, group:'effect',
    desc:'تاج، قبعة، خوذة — فوق الرأس',
    render: {
      anchor:{ x:0.5, y:1.0 },   /* مرتكز على أسفل الصورة */
      sizeMul: 2.4,               /* مضاعف نصف قطر اللاعب */
      offsetY:-1.15,              /* إزاحة رأسية بالنسبة لنصف القطر */
      rotationAmp: 0.02,          /* اهتزاز طفيف */
      rotationSpeed: 0.04
    }
  },
  back: {
    label:'الظهر', en:'BACK', icon:'🦋', folder:'back',
    color:'#9A6AC8', order:2, group:'effect',
    desc:'أجنحة، عباءة، حقيبة — خلف اللاعب',
    render: {
      anchor:{ x:0.5, y:0.5 },
      sizeMul: 4.5,
      offsetY:0,
      rotationAmp: 0.03,
      rotationSpeed: 0.05,
      behind: true                 /* يُرسم قبل الجسم */
    }
  },
  eyes: {
    label:'العيون', en:'EYES', icon:'👁️', folder:'eyes',
    color:'#4A88C8', order:3, group:'effect',
    desc:'شكل العيون — تُرسم على الوجه',
    render: {
      anchor:{ x:0.5, y:0.5 },
      sizeMul: 1.6,
      offsetY:-0.15,
      onFace: true                 /* يُرسم فوق الوجه (فقط إن لم يكن الجسم صورة) */
    }
  },
  trail: {
    label:'خط السير', en:'TRAIL', icon:'➰', folder:'trail',
    color:'#6B9B6B', order:4, group:'effect',
    desc:'أثر يتبع اللاعب',
    render: {
      type:'particle',
      spawnRate: 2,
      sizeMul: 1.4,
      life: 1.0,
      fade: 0.03
    }
  },
  spark: {
    label:'الشرار', en:'SPARK', icon:'✨', folder:'spark',
    color:'#FFD060', order:5, group:'effect',
    desc:'جسيمات تنبعث من اللاعب',
    render: {
      type:'particle',
      spawnRate: 3,
      sizeMul: 1.2,
      life: 1.0,
      fade: 0.028
    }
  },
  jump: {
    label:'القفز', en:'JUMP', icon:'⬆️', folder:'jump',
    color:'#5A8FD8', order:6, group:'effect',
    desc:'تأثير لحظي عند القفز',
    render: {
      type:'burst',
      sizeMul: 5.0,
      life: 0.9,
      fade: 0.035
    }
  },
  spawn: {
    label:'البداية', en:'SPAWN', icon:'🚀', folder:'spawn',
    color:'#4A88C8', order:7, group:'effect',
    desc:'تأثير عند بدء الجولة',
    render: {
      type:'burst',
      sizeMul: 8.0,
      life: 1.4,
      fade: 0.018,
      scaleOverLife: 2.5
    }
  },
  revive: {
    label:'الإحياء', en:'REVIVE', icon:'💫', folder:'revive',
    color:'#C080FF', order:8, group:'effect',
    desc:'تأثير عند العودة للحياة',
    render: {
      type:'burst',
      sizeMul: 8.0,
      life: 1.6,
      fade: 0.014,
      scaleOverLife: 3.0
    }
  },
  death: {
    label:'الموت', en:'DEATH', icon:'💀', folder:'death',
    color:'#E85838', order:9, group:'effect',
    desc:'تأثير الارتطام + النهاية',
    render: {
      type:'burst',
      sizeMul: 6.0,
      life: 1.4,
      fade: 0.018,
      count: 18
    }
  },

  /* ═══════ الجماليات الشخصية (5) ═══════ */
  avatar: {
    label:'الصورة الشخصية', en:'AVATAR', icon:'👤', folder:'avatar',
    color:'#E8B34E', order:10, group:'aesthetic',
    desc:'صورة رمزية في القوائم والملف'
  },
  avatarFrame: {
    label:'إطار الصورة', en:'FRAME', icon:'🖼️', folder:'frames',
    color:'#FFD060', order:11, group:'aesthetic',
    desc:'إطار دائري حول الصورة الشخصية',
    render: { sizeMul: 2.4, anchor:{ x:0.5, y:0.5 } }
  },
  banner: {
    label:'خلفية البطاقة', en:'BANNER', icon:'🎨', folder:'banners',
    color:'#E85838', order:12, group:'aesthetic',
    desc:'خلفية بطاقة اللاعب'
  },
  nameTag: {
    label:'بطاقة الاسم', en:'NAMETAG', icon:'🏷️', folder:'tags',
    color:'#A06AD8', order:13, group:'aesthetic',
    desc:'شكل لوحة الاسم فوق اللاعب',
    render: { sizeMul: 6.0, anchor:{ x:0.5, y:0.5 } }
  },
  badge: {
    label:'الشارة', en:'BADGE', icon:'⭐', folder:'badges',
    color:'#E8B34E', order:14, group:'aesthetic',
    desc:'أيقونة صغيرة بجانب الاسم',
    render: { sizeMul: 1.2, anchor:{ x:0.5, y:0.5 } }
  }
};

/* ═══ قوائم مُشتقّة ═══ */
const COSMETIC_CATEGORY_ORDER = Object.entries(COSMETIC_CATEGORIES)
  .sort((a, b) => a[1].order - b[1].order)
  .map(([k]) => k);

const EFFECT_CATEGORIES    = COSMETIC_CATEGORY_ORDER.filter(k => COSMETIC_CATEGORIES[k].group === 'effect');
const AESTHETIC_CATEGORIES = COSMETIC_CATEGORY_ORDER.filter(k => COSMETIC_CATEGORIES[k].group === 'aesthetic');

/* ═══ متوافق مع الكود القديم (يُستخدم في مشغل الأدمن) ═══ */
const CATEGORY_LABELS = Object.fromEntries(
  Object.entries(COSMETIC_CATEGORIES).map(([k, v]) => [k, v.label])
);
const CATEGORY_FOLDERS = Object.fromEntries(
  Object.entries(COSMETIC_CATEGORIES).map(([k, v]) => [k, v.folder])
);

/* ═══ مساعد: جلب إعدادات تصنيف ═══ */
function getCategoryConfig(cat){
  return COSMETIC_CATEGORIES[cat] || {
    label: cat, en: String(cat).toUpperCase(), icon:'✨',
    folder: cat, color:'#8B8278', desc:'', group:'effect',
    render: { sizeMul: 2.0, anchor:{ x:0.5, y:0.5 }, offsetY: 0 }
  };
}

/* ═══ دالة بناء أنواع الأماكن (نسخة آمنة) ═══ */
function buildPlacementTypes(){
  /* ═══ حماية: تأكد من توفر البيانات الأساسية ═══ */
  const safeSeasonRanks = (typeof SEASON_RANKS !== 'undefined' && Array.isArray(SEASON_RANKS))
    ? SEASON_RANKS
    : [{ name:'برونزي', icon:'🥉', points:0 }];

  const safeEvents = (typeof EVENTS !== 'undefined' && Array.isArray(EVENTS))
    ? EVENTS
    : [{ id:'volcanoWeek', name:'أسبوع البركان', icon:'🌋' }];

  const safeBPTiers = (typeof BP_TIERS !== 'undefined') ? BP_TIERS : 30;

  return {
    shop: {
      label: 'المتجر', icon: '🛒', color: '#E8B34E',
      desc: 'يُشترى بالعملات',
      params: [
        { key: 'price', label: 'السعر (◆)', type: 'number', default: 500, min: 0, max: 1000000 }
      ]
    },
    battle_pass: {
      label: 'باتل باس', icon: '🎫', color: '#8E6AA8',
      desc: 'مكافأة في مستوى معين',
      params: [
        { key: 'tier', label: 'المستوى', type: 'number', default: 1, min: 1, max: safeBPTiers },
        { key: 'track', label: 'المسار', type: 'select', default: 'free',
          options: [{value:'free', label:'مجاني'}, {value:'premium', label:'مميز'}] }
      ]
    },
    season_rank: {
      label: 'رتبة الموسم', icon: '🏅', color: '#E8B34E',
      desc: 'مكافأة عند رتبة معينة',
      params: [
        { key: 'rankId', label: 'الرتبة', type: 'select', default: 0,
          options: safeSeasonRanks.map((r, i) => ({ value: i, label: (r.icon||'') + ' ' + (r.name||'') })) }
      ]
    },
    daily_login: {
      label: 'التسجيل اليومي', icon: '📅', color: '#4A88C8',
      desc: 'مكافأة يوم محدد',
      params: [
        { key: 'day', label: 'اليوم (1-7)', type: 'number', default: 1, min: 1, max: 7 }
      ]
    },
    chest: {
      label: 'صندوق', icon: '📦', color: '#C98A2E',
      desc: 'يظهر عشوائياً عند فتح الصندوق',
      params: [
        { key: 'chestType', label: 'نوع الصندوق', type: 'select', default: 'bronze',
          options: [
            { value: 'bronze', label: 'برونزي' },
            { value: 'silver', label: 'فضي' },
            { value: 'gold',   label: 'ذهبي' }
          ] },
        { key: 'weight', label: 'احتمال الظهور %', type: 'number', default: 5, min: 1, max: 100 }
      ]
    },
    lucky_wheel: {
      label: 'عجلة الحظ', icon: '🎡', color: '#E85838',
      desc: 'قطاع في عجلة الحظ',
      params: [
        { key: 'segment', label: 'القطاع (0-11)', type: 'number', default: 0, min: 0, max: 11 }
      ]
    },
    event: {
      label: 'حدث', icon: '🎪', color: '#A06AD8',
      desc: 'مكافأة حدث أسبوعي',
      params: [
        { key: 'eventId', label: 'الحدث', type: 'select', default: safeEvents[0].id,
          options: safeEvents.map(e => ({ value: e.id, label: (e.icon||'') + ' ' + (e.name||'') })) },
        { key: 'target', label: 'هدف المهمة', type: 'number', default: 10, min: 1, max: 10000 }
      ]
    },
    default_owned: {
      label: 'افتراضي', icon: '✓', color: '#6B9B6B',
      desc: 'مملوك تلقائياً لكل اللاعبين',
      params: []
    }
  };
}

/* ═══ متغير عام — يُملأ تلقائياً عند الحاجة ═══ */
let PLACEMENT_TYPES = null;

/* ═══ ضمان التهيئة (lazy init) ═══ */
function ensurePlacementTypes(){
  if(!PLACEMENT_TYPES || typeof PLACEMENT_TYPES !== 'object' || Object.keys(PLACEMENT_TYPES).length === 0){
    PLACEMENT_TYPES = buildPlacementTypes();
    console.log('[Placements] Initialized with types:', Object.keys(PLACEMENT_TYPES));
  }
  return PLACEMENT_TYPES;
}

/* ═══ بناء محرر المصادر (نسخة مُحصّنة) ═══ */
function buildSourcesEditor(){
  const container = document.getElementById('sources-editor');
  if(!container){
    console.error('[buildSourcesEditor] #sources-editor NOT FOUND in DOM!');
    return;
  }

  /* ═══ تأكد من تهيئة الأنواع ═══ */
  ensurePlacementTypes();

  const types = Object.entries(PLACEMENT_TYPES);
  if(types.length === 0){
    console.error('[buildSourcesEditor] PLACEMENT_TYPES is EMPTY!');
    container.innerHTML = '<div style="text-align:center;padding:16px;color:#C14A4A;font-size:12px;">⚠ خطأ: أنواع المصادر غير مُعرّفة</div>';
    return;
  }

  container.innerHTML = '';
  console.log('[buildSourcesEditor] Building', types.length, 'source blocks');

  types.forEach(([typeId, def])=>{
    const block = document.createElement('div');
    block.className = 'src-block';
    block.dataset.srcType = typeId;
    block.style.setProperty('--src-c', def.color || '#888');

    /* بناء صفوف المعاملات */
    let paramsHtml = '';
    if(def.params && def.params.length > 0){
      paramsHtml = def.params.map(p => {
        if(p.type === 'select'){
          return `<div class="src-param-row">
            <label>${p.label}</label>
            <select data-param="${p.key}">
              ${(p.options||[]).map(o => 
                `<option value="${o.value}"${o.value === p.default ? ' selected' : ''}>${o.label}</option>`
              ).join('')}
            </select>
          </div>`;
        }
        return `<div class="src-param-row">
          <label>${p.label}</label>
          <input type="number" data-param="${p.key}"
                 min="${p.min ?? ''}" max="${p.max ?? ''}"
                 value="${p.default ?? 0}">
        </div>`;
      }).join('');
    }

    block.innerHTML = `
      <div class="src-head">
        <div class="src-ic">${def.icon || '📌'}</div>
        <div class="src-info">
          <div class="src-lbl">${def.label || typeId}</div>
          <div class="src-desc">${def.desc || ''}</div>
        </div>
        <div class="src-toggle">✓</div>
      </div>
      ${paramsHtml ? `<div class="src-params">${paramsHtml}</div>` : ''}
    `;

    /* تفعيل/إلغاء */
    const head = block.querySelector('.src-head');
    if(head){
      head.addEventListener('click', ()=>{
        block.classList.toggle('active');
        try { Sfx.tap(); haptic(4); } catch(e){}
      });
    }

    container.appendChild(block);
  });
}

/* ═══ جمع المصادر المختارة ═══ */
function collectPlacements(){
  ensurePlacementTypes();
  const placements = [];

  document.querySelectorAll('#sources-editor .src-block.active').forEach(block => {
    const type = block.dataset.srcType;
    const def = PLACEMENT_TYPES[type];
    if(!def) return;

    const placement = { type };
    block.querySelectorAll('[data-param]').forEach(input => {
      const key = input.dataset.param;
      const p = (def.params || []).find(x => x.key === key);
      if(!p) return;

      if(p.type === 'number'){
        const v = parseInt(input.value, 10);
        placement[key] = isNaN(v) ? (p.default ?? 0) : v;
      } else {
        placement[key] = input.value;
      }
    });
    placements.push(placement);
  });

  console.log('[collectPlacements] Collected:', placements);
  return placements;
}

/* ═══ جلب كل العناصر المخصصة ═══ */
function getAllCustomItems(){
  const items = [];
  /* ✅ التصنيفات v3 فقط */
  const cats = ['skins', ...COSMETIC_CATEGORY_ORDER];

  for(const cat of cats){
    const key = 'custom' + cat.charAt(0).toUpperCase() + cat.slice(1);
    const list = (Save.data.admin && Save.data.admin[key]) || [];
    for(const item of list){
      if(item.enabled === false) continue;
      items.push({
        ...item,
        _category: cat === 'skins' ? 'skin' : cat,
        _sourceCat: cat,
        _folder: (typeof CATEGORY_FOLDERS !== 'undefined' ? CATEGORY_FOLDERS[cat] : cat) || cat
      });
    }
  }
  return items;
}

/* ═══ جلب العناصر حسب نوع المكان ═══ */
function getItemsByPlacement(placementType, filterFn){
  const items = getAllCustomItems();
  const result = [];
  for(const item of items){
    const placements = item.placements || [];
    for(const p of placements){
      if(p.type !== placementType) continue;
      if(filterFn && !filterFn(p, item)) continue;
      result.push({ item, placement: p });
    }
  }
  return result;
}

function getShopCustomItems(){ return getItemsByPlacement('shop'); }
function getBattlePassItems(tier, track){
  return getItemsByPlacement('battle_pass', (p) => p.tier === tier && p.track === track);
}
function getSeasonRankItems(rankId){
  return getItemsByPlacement('season_rank', (p) => p.rankId === rankId);
}
function getDailyItems(day){
  return getItemsByPlacement('daily_login', (p) => p.day === day);
}
function getEventItems(eventId){
  return getItemsByPlacement('event', (p) => p.eventId === eventId);
}

/* ═══ جلب العناصر من نوع معين ═══ */
function getSourceTypeInfo(type){
  if(!PLACEMENT_TYPES[type]) return { label:'مخصص', icon:'📌', color:'#8B8278' };
  const p = PLACEMENT_TYPES[type];
  return { label: p.label, icon: p.icon, color: p.color };
}

/* ============================================================
   ==================== Audio ================================
   ============================================================ */
const Sfx = {
  ctx:null,
  init(){ if(!this.ctx){ try{ this.ctx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} } },
  play(freq,dur=0.1,type='sine',vol=0.05,slideTo){
    if(!Save.data.settings.sound) return;
    this.init();
    if(!this.ctx) return;
    const t=this.ctx.currentTime;
    const o=this.ctx.createOscillator();
    const g=this.ctx.createGain();
    o.type=type;
    o.frequency.setValueAtTime(freq,t);
    if(slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(40,slideTo),t+dur);
    g.gain.setValueAtTime(vol,t);
    g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    o.connect(g).connect(this.ctx.destination);
    o.start(t); o.stop(t+dur+0.03);
  },
  tap(){ this.play(560,0.06,'sine',0.03,840); },
  coin(){ this.play(880,0.09,'sine',0.035,1320); },
  combo(){ this.play(990,0.12,'sine',0.04,1760); },
  orb(){ this.play(660,0.1,'sine',0.04,990); },
  hit(){ this.play(220,0.2,'sine',0.06,110); },
  level(){ this.play(440,0.3,'sine',0.045,880); },
  levelUp(){ this.play(520,0.5,'sine',0.05,1040); },
  over(){ this.play(260,0.5,'sine',0.055,130); },
  reward(){ this.play(720,0.25,'sine',0.045,1440); },
  power(){ this.play(380,0.3,'triangle',0.05,1200); },
  puEnd(){ this.play(300,0.2,'triangle',0.04,180); },
  bounce(){ this.play(340,0.07,'triangle',0.028,520); }
};
const haptic = (ms=10) => { if(!Save.data.settings.haptics) return; if(navigator.vibrate) navigator.vibrate(ms); };

/* ============================================================
   ==================== Achievements =========================
   ============================================================ */
const ACHIEVEMENTS = [
  { id:'first',    icon:'🌱', name:'البداية',      desc:'العب أول جولة',           target:1,    value:s=>s.stats.totalPlays },
  { id:'ten',      icon:'🎮', name:'معتاد',        desc:'العب ١٠ جولات',           target:10,   value:s=>s.stats.totalPlays },
  { id:'m100',     icon:'⭐', name:'مبتدئ',        desc:'وصل إلى ١٠٠ متر',         target:100,  value:s=>s.stats.bestMeters },
  { id:'m500',     icon:'🌟', name:'متقدم',        desc:'وصل إلى ٥٠٠ متر',         target:500,  value:s=>s.stats.bestMeters },
  { id:'m2000',    icon:'💫', name:'خبير',         desc:'وصل إلى ٢٠٠٠ متر',        target:2000, value:s=>s.stats.bestMeters },
  { id:'m5000',    icon:'🏆', name:'أسطورة',       desc:'وصل إلى ٥٠٠٠ متر',        target:5000, value:s=>s.stats.bestMeters },
  { id:'combo20',  icon:'🔥', name:'سلسلة',        desc:'سلسلة ٢٠ عملة',           target:20,   value:s=>s.stats.bestCombo || 0 },
  { id:'allmodes', icon:'🎯', name:'متعدد المواهب', desc:'جرّب جميع الأنماط',        target:6,    value:s=>Object.values(s.bestMeters).filter(v=>v>0).length }
];

/* ============================================================
   ==================== Scenes ===============================
   ============================================================ */
const SCENE_DEFAULTS = {
  sky:'#FFFFFF', skyBot:'#EEEEEE',
  hillFar:'#D0D0D0', hillMid:'#A0A0A0', hillNear:'#707070',
  ground:'#4A4A4A', groundDark:'#2A2A2A',
  accent:'#E07A3F', wall:'#707070', wallDark:'#4A4A4A',
  cloud:'#FFFFFF',
  sun:'#FFCB5A', sunGlow:'#FFE0A0',
  moon:'#F0E8D0', moonGlow:'#F5D77E',
  moonAmount: 0, starAmount: 0,
  weather:'petal', weatherRate:0.3,
  wind: 0, fog: 0, lightning: false, lightningTimer: 0, weatherColor: null
};
function mkScene(o){ return Object.assign({}, SCENE_DEFAULTS, o); }

const SCENES = [
  mkScene({ id:'dawn', en:'DAWN', ar:'الفجر', sky:'#FFD9B8', skyBot:'#FFA76B',
    hillFar:'#E8A580', hillMid:'#C77A55', hillNear:'#8E4F35',
    ground:'#5E3223', groundDark:'#3A1F14', accent:'#E86A2E', wall:'#8E4F35', wallDark:'#5E3223',
    cloud:'#FFFFFF', sun:'#FFCB5A', sunGlow:'#FFE0A0', weather:'petal', weatherRate:0.3 }),
  mkScene({ id:'meadow', en:'MEADOW', ar:'المرج', sky:'#BCE3A8', skyBot:'#7CC258',
    hillFar:'#8FC878', hillMid:'#5EA041', hillNear:'#3A6E28',
    ground:'#2C5620', groundDark:'#1A3812', accent:'#E8A52C', wall:'#3A6E28', wallDark:'#244818',
    cloud:'#FFFFFF', sun:'#FFE87A', sunGlow:'#FFF4B0', weather:'pollen', weatherRate:0.35 }),
  mkScene({ id:'forest', en:'FOREST', ar:'الغابة', sky:'#4A7A4E', skyBot:'#2A4A2E',
    hillFar:'#3A6A3E', hillMid:'#2A5028', hillNear:'#1A3018',
    ground:'#1A2818', groundDark:'#0A140A', accent:'#9AC84C', wall:'#1A3018', wallDark:'#0A140A',
    cloud:'#C8D8C0', sun:'#E8E8A0', sunGlow:'#F8F8C0', weather:'leaves', weatherRate:0.5, wind:0.2 }),
  mkScene({ id:'lagoon', en:'LAGOON', ar:'البحيرة', sky:'#A8D8E8', skyBot:'#5EA8C8',
    hillFar:'#7CB8D0', hillMid:'#4A88A8', hillNear:'#2A5878',
    ground:'#1E4460', groundDark:'#0E2A40', accent:'#FFC84A', wall:'#2A5878', wallDark:'#183C58',
    cloud:'#FFFFFF', sun:'#FFF0B8', sunGlow:'#FFF8D8', weather:'rain', weatherRate:0.55 }),
  mkScene({ id:'canyon', en:'CANYON', ar:'الوادي', sky:'#FFC088', skyBot:'#F07840',
    hillFar:'#E89860', hillMid:'#C86030', hillNear:'#8E3E18',
    ground:'#5E2810', groundDark:'#381608', accent:'#FF4A2A', wall:'#8E3E18', wallDark:'#5E2810',
    cloud:'#FFE8D0', sun:'#FFB050', sunGlow:'#FFD890', weather:'ember', weatherRate:0.28 }),
  mkScene({ id:'temple', en:'TEMPLE', ar:'المعبد', sky:'#C8A878', skyBot:'#8E6848',
    hillFar:'#A88868', hillMid:'#806848', hillNear:'#5A4028',
    ground:'#3A2818', groundDark:'#1E1408', accent:'#E8B34E', wall:'#5A4028', wallDark:'#3A2818',
    cloud:'#F0E0C0', sun:'#FFE080', sunGlow:'#FFF0B0', weather:'pollen', weatherRate:0.2 }),
  mkScene({ id:'dusk', en:'DUSK', ar:'الغسق', sky:'#8A78A8', skyBot:'#4A3A68',
    hillFar:'#6E5888', hillMid:'#4A3868', hillNear:'#2E2048',
    ground:'#1E1430', groundDark:'#0E0820', accent:'#F0A0A8', wall:'#2E2048', wallDark:'#1A1030',
    cloud:'#C8B8D8', sun:'#F5D88A', sunGlow:'#FFE8C0', weather:'firefly', weatherRate:0.22 }),
  mkScene({ id:'frost', en:'FROST', ar:'الصقيع', sky:'#B8CCE0', skyBot:'#7898B8',
    hillFar:'#98B0C8', hillMid:'#6888A8', hillNear:'#406080',
    ground:'#284058', groundDark:'#142838', accent:'#FFE8A0', wall:'#406080', wallDark:'#284058',
    cloud:'#FFFFFF', sun:'#FFF8E0', sunGlow:'#FFFFFF', weather:'snow', weatherRate:0.5 }),
  mkScene({ id:'storm', en:'STORM', ar:'العاصفة', sky:'#3A3A50', skyBot:'#5A5A70',
    hillFar:'#4A4A60', hillMid:'#3A3A50', hillNear:'#2A2A40',
    ground:'#1A1A28', groundDark:'#0A0A18', accent:'#FFE060', wall:'#2A2A40', wallDark:'#1A1A28',
    cloud:'#6A6A80', moon:'#E8E8F8', moonGlow:'#C8C8E0', moonAmount:0.5, starAmount:0.3,
    weather:'rain', weatherRate:1.2, lightning:true, wind:0.6 }),
  mkScene({ id:'night', en:'NIGHT', ar:'الليل', sky:'#0F1430', skyBot:'#1F2750',
    hillFar:'#2A3050', hillMid:'#1E2440', hillNear:'#141828',
    ground:'#0E1220', groundDark:'#05070F', accent:'#F5D77E', wall:'#2A3050', wallDark:'#141828',
    cloud:'#3A4060', moon:'#F0E8D0', moonGlow:'#F5D77E', moonAmount:1, starAmount:1,
    weather:'firefly', weatherRate:0.4 }),
  mkScene({ id:'sakura', en:'SAKURA', ar:'ساكورا', sky:'#FBE0E8', skyBot:'#F5C8D8',
    hillFar:'#EAB8C8', hillMid:'#D890A8', hillNear:'#B86888',
    ground:'#8E4868', groundDark:'#5E2E48', accent:'#E87A98', wall:'#B86888', wallDark:'#8E4868',
    cloud:'#FFFFFF', sun:'#FFD8E0', sunGlow:'#FFECF0', weather:'petal', weatherRate:0.7 }),
  mkScene({ id:'desert', en:'DESERT', ar:'الصحراء', sky:'#FFE0A8', skyBot:'#F5A860',
    hillFar:'#F0B878', hillMid:'#D89860', hillNear:'#B87048',
    ground:'#8E5030', groundDark:'#5E3218', accent:'#E85838', wall:'#B87048', wallDark:'#8E5030',
    cloud:'#FFF4DC', sun:'#FFF0A8', sunGlow:'#FFF8D8', weather:'sandstorm', weatherRate:1.0, wind:0.4 }),
  mkScene({ id:'city', en:'NEON CITY', ar:'المدينة السيبرانية', sky:'#1A0E2E', skyBot:'#3A1A5E',
    hillFar:'#2A1A4E', hillMid:'#1E1038', hillNear:'#12082A',
    ground:'#0E0620', groundDark:'#06020F', accent:'#FF00D8', wall:'#2A1A4E', wallDark:'#12082A',
    cloud:'#4A2A6E', moon:'#F0A0FF', moonGlow:'#FF60E8', moonAmount:1, starAmount:0.4,
    weather:'neon', weatherRate:0.4, lightning:true }),
  mkScene({ id:'ocean', en:'ABYSS', ar:'الأعماق', sky:'#0A3050', skyBot:'#041820',
    hillFar:'#0E4A6A', hillMid:'#083850', hillNear:'#042838',
    ground:'#021020', groundDark:'#000810', accent:'#40E8D0', wall:'#042838', wallDark:'#021020',
    cloud:'#1A5080', sun:'#40C8E8', sunGlow:'#80E8F8', weather:'bubbles', weatherRate:0.8 }),
  mkScene({ id:'space', en:'COSMOS', ar:'الفضاء', sky:'#0A0420', skyBot:'#1A0838',
    hillFar:'#2A1058', hillMid:'#1A0838', hillNear:'#10041E',
    ground:'#08021A', groundDark:'#02000A', accent:'#C060FF', wall:'#10041E', wallDark:'#08021A',
    cloud:'#2A1A4E', moon:'#E8D0FF', moonGlow:'#B080FF', moonAmount:1, starAmount:1,
    weather:'starfield', weatherRate:0.3 }),
  mkScene({ id:'candy', en:'CANDY', ar:'الحلوى', sky:'#FFD0E8', skyBot:'#FFA8D8',
    hillFar:'#FFC0E0', hillMid:'#FF90C0', hillNear:'#E860A0',
    ground:'#A04078', groundDark:'#6A2850', accent:'#FFE060', wall:'#E860A0', wallDark:'#A04078',
    cloud:'#FFFFFF', sun:'#FFE0F0', sunGlow:'#FFF0F8', weather:'bubbles', weatherRate:0.5 }),
  mkScene({ id:'volcano', en:'VOLCANO', ar:'البركان', sky:'#3A1020', skyBot:'#6E1A18',
    hillFar:'#4E1A20', hillMid:'#3A1018', hillNear:'#2A0A12',
    ground:'#1A0608', groundDark:'#0A0204', accent:'#FF5020', wall:'#3A1018', wallDark:'#1A0608',
    cloud:'#5A2028', moon:'#FF8060', moonGlow:'#FF5020', moonAmount:1, starAmount:0.5,
    weather:'ash', weatherRate:0.7, lightning:true }),
    mkScene({ id:'aurora', en:'AURORA', ar:'الشفق القطبي', sky:'#0A1828', skyBot:'#1A3848',
  hillFar:'#1A3838', hillMid:'#0A2828', hillNear:'#041818',
  ground:'#021010', groundDark:'#010808', accent:'#40FFB0', wall:'#041818', wallDark:'#021010',
  cloud:'#1A3030', moon:'#C0FFE0', moonGlow:'#40FFB0', moonAmount:0.8, starAmount:0.9,
  weather:'sparkle', weatherRate:0.5 }),
mkScene({ id:'jungle', en:'JUNGLE', ar:'الأدغال', sky:'#3A5A2A', skyBot:'#1A3818',
  hillFar:'#2A4A1A', hillMid:'#1A3810', hillNear:'#0A2008',
  ground:'#0A1A08', groundDark:'#040C04', accent:'#A8E84C', wall:'#0A2008', wallDark:'#040C04',
  cloud:'#2A4A28', sun:'#C8E080', sunGlow:'#E0F0A0', weather:'leaves', weatherRate:0.7, wind:0.3 }),
mkScene({ id:'glacier', en:'GLACIER', ar:'النهر الجليدي', sky:'#C8E0F0', skyBot:'#8AB8D8',
  hillFar:'#A8C8E0', hillMid:'#7AA8C8', hillNear:'#4A7898',
  ground:'#2A5070', groundDark:'#183040', accent:'#FFFFFF', wall:'#4A7898', wallDark:'#2A5070',
  cloud:'#FFFFFF', sun:'#FFFFFF', sunGlow:'#E0F0FF', weather:'snow', weatherRate:0.8 }),
mkScene({ id:'swamp', en:'SWAMP', ar:'المستنقع', sky:'#4A5A3A', skyBot:'#2A3820',
  hillFar:'#3A4A28', hillMid:'#2A3820', hillNear:'#1A2810',
  ground:'#182008', groundDark:'#080C04', accent:'#A0C040', wall:'#1A2810', wallDark:'#080C04',
  cloud:'#5A6A48', sun:'#C0D060', sunGlow:'#E0F080', weather:'bubbles', weatherRate:0.6 }),
mkScene({ id:'beach', en:'BEACH', ar:'الشاطئ', sky:'#88D8F0', skyBot:'#FFE8C0',
  hillFar:'#F0D8A8', hillMid:'#D8B888', hillNear:'#A88858',
  ground:'#E8C890', groundDark:'#A07848', accent:'#FF6050', wall:'#A88858', wallDark:'#786038',
  cloud:'#FFFFFF', sun:'#FFE890', sunGlow:'#FFF8C0', weather:'pollen', weatherRate:0.4 }),
mkScene({ id:'mountain', en:'MOUNTAIN', ar:'الجبل', sky:'#B8D0E8', skyBot:'#F0E8D8',
  hillFar:'#A0B0C0', hillMid:'#7080A0', hillNear:'#404858',
  ground:'#303840', groundDark:'#181C20', accent:'#FFFFFF', wall:'#404858', wallDark:'#303840',
  cloud:'#FFFFFF', sun:'#FFF8E0', sunGlow:'#FFFFFF', weather:'snow', weatherRate:0.5 }),
mkScene({ id:'bloom', en:'BLOOM', ar:'الإزهار', sky:'#FCE8F0', skyBot:'#F0C8D8',
  hillFar:'#F0C0D8', hillMid:'#D8A0B8', hillNear:'#A87890',
  ground:'#805868', groundDark:'#503038', accent:'#FFE080', wall:'#A87890', wallDark:'#805868',
  cloud:'#FFFFFF', sun:'#FFE8D0', sunGlow:'#FFF0E8', weather:'petal', weatherRate:0.8 }),
mkScene({ id:'thunder', en:'THUNDER', ar:'الرعد', sky:'#2A1A3A', skyBot:'#4A3A5A',
  hillFar:'#3A2A4A', hillMid:'#2A1A3A', hillNear:'#1A0A2A',
  ground:'#0A0418', groundDark:'#040210', accent:'#C0A0FF', wall:'#1A0A2A', wallDark:'#0A0418',
  cloud:'#4A3A5A', moon:'#E0D0F0', moonGlow:'#C0A0FF', moonAmount:0.6, starAmount:0.4,
  weather:'rain', weatherRate:1.2, lightning:true, wind:0.5 }),
mkScene({ id:'ember', en:'EMBER', ar:'الجمر', sky:'#3A1A10', skyBot:'#6A2A18',
  hillFar:'#4A2418', hillMid:'#3A1810', hillNear:'#2A0E08',
  ground:'#1A0804', groundDark:'#080201', accent:'#FF8040', wall:'#2A0E08', wallDark:'#1A0804',
  cloud:'#5A3020', moon:'#FFA060', moonGlow:'#FF6030', moonAmount:0.5, starAmount:0.3,
  weather:'ember', weatherRate:1.0 }),
mkScene({ id:'starfall', en:'STARFALL', ar:'الشهاب', sky:'#08041A', skyBot:'#1A1038',
  hillFar:'#2A1848', hillMid:'#180830', hillNear:'#0A0420',
  ground:'#040210', groundDark:'#020008', accent:'#FFE0A0', wall:'#0A0420', wallDark:'#040210',
  cloud:'#2A1A4E', moon:'#FFF0C0', moonGlow:'#FFE0A0', moonAmount:1, starAmount:1,
  weather:'starfield', weatherRate:0.6 }),
mkScene({ id:'nebula', en:'NEBULA', ar:'السديم', sky:'#1A0838', skyBot:'#4A1878',
  hillFar:'#4A2080', hillMid:'#2A1058', hillNear:'#180438',
  ground:'#0A0220', groundDark:'#040010', accent:'#FF80E0', wall:'#180438', wallDark:'#0A0220',
  cloud:'#3A1060', moon:'#FFD0F0', moonGlow:'#FF80E0', moonAmount:1, starAmount:1,
  weather:'starfield', weatherRate:0.5 }),
mkScene({ id:'prism', en:'PRISM', ar:'الموشور', sky:'#FFE0F0', skyBot:'#E0C0FF',
  hillFar:'#C0A0FF', hillMid:'#A080E0', hillNear:'#8060C0',
  ground:'#5030A0', groundDark:'#301860', accent:'#FFE060', wall:'#8060C0', wallDark:'#5030A0',
  cloud:'#FFFFFF', sun:'#FFE8B0', sunGlow:'#FFF8D8', weather:'sparkle', weatherRate:0.6 }),
mkScene({ id:'crystalcave', en:'CRYSTAL CAVE', ar:'الكهف البلوري', sky:'#A0D0E8', skyBot:'#6040A8',
  hillFar:'#8060C8', hillMid:'#6040A8', hillNear:'#402878',
  ground:'#201850', groundDark:'#100828', accent:'#E0D0FF', wall:'#402878', wallDark:'#201850',
  cloud:'#C0A0E8', sun:'#E0D0FF', sunGlow:'#F0E0FF', weather:'sparkle', weatherRate:0.7 })
];

function blendScene(a,b,t){
  if(t<=0) return a;
  if(t>=1) return b;
  const out = {};
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for(const k of keys){
    const va = a[k], vb = b[k];
    if(va === undefined){ out[k] = vb; continue; }
    if(vb === undefined){ out[k] = va; continue; }
    if(typeof va === 'string' && va.charAt(0)==='#' && typeof vb === 'string' && vb.charAt(0)==='#'){
      out[k] = mixColor(va, vb, t);
    } else if(typeof va === 'number' && typeof vb === 'number'){
      out[k] = lerp(va, vb, t);
    } else {
      out[k] = t < 0.5 ? va : vb;
    }
  }
  return out;
}

const MODES = [
  { id:'FLIP',   ar:'قلب الجاذبية', en:'FLIP',   icon:'⇅', color:'#4A7FA0', desc:'اضغط لقلب الاتجاه' },
  { id:'FLAP',   ar:'التحليق',      en:'THRUST', icon:'▲', color:'#8E6AA8', desc:'اضغط للارتفاع' },
  { id:'DRIFT',  ar:'الانسياق',     en:'DRIFT',  icon:'✦', color:'#C98A2E', desc:'اسحب بحرية' },
  { id:'WALK',   ar:'المشي والقفز', en:'RUN',    icon:'♟', color:'#4A8040', desc:'اقفز فوق العقبات' },
  { id:'ASCEND', ar:'الصعود',       en:'ASCEND', icon:'↑', color:'#5A8FD8', desc:'اقفز بين المنصات نحو الفضاء' },
  { id:'MIXED',  ar:'المتنوّع',     en:'MIXED',  icon:'◆', color:'#A06AD8', desc:'تحوّل عشوائي بين الأنماط' }
];

/* ============================================================
   ==================== REALM SYSTEM (العوالم) ===============
   ============================================================ */
const REALM = {
  GROUND: 'GROUND',
  SKY: 'SKY',
  UNDERGROUND: 'UNDERGROUND',
  PLANET: 'PLANET'   // ← جديد
};

/* ═══════════════ SKY REALM ═══════════════ */
const SKY_REALM = {
  enterOffset: 900,   /* يدخل السماء عندما يرتفع 900px فوق الأرض */
  exitOffset: 700,    /* يخرج عندما ينزل إلى 700px */

  layers: [
    {
      id: 'clouds', name:'CLOUDS', ar:'السحاب',
      from: 0, to: 500,
      sky:'#A8D8FF', skyBot:'#E0F0FF', accent:'#FFFFFF',
      wall:'#E8F4FF', wallDark:'#A8C8E8',
      weather:'clouds', weatherRate: 0.6
    },
    {
      id: 'ruins', name:'RUINS', ar:'الأطلال',
      from: 500, to: 1100,
      sky:'#7A88A8', skyBot:'#4A5878', accent:'#C8B8A0',
      wall:'#8E7A68', wallDark:'#4A3830',
      weather:'dust', weatherRate: 0.4
    },
    {
      id: 'storm', name:'STORM', ar:'العاصفة',
      from: 1100, to: 1800,
      sky:'#3A3A50', skyBot:'#2A2A40', accent:'#FFE060',
      wall:'#5A5A70', wallDark:'#2A2A40',
      weather:'storm', weatherRate: 1.2, lightning: true
    },
    {
      id: 'crystal', name:'CRYSTAL', ar:'البلور',
      from: 1800, to: 2600,
      sky:'#C8A0E8', skyBot:'#6A48A8', accent:'#E0D0FF',
      wall:'#B080E8', wallDark:'#6040A8',
      weather:'sparkle', weatherRate: 0.5
    },
    {
      id: 'golden', name:'GOLDEN GATE', ar:'البوابة الذهبية',
      from: 2600, to: 99999,
      sky:'#FFE0A0', skyBot:'#E8B34E', accent:'#FFF4C0',
      wall:'#E8B34E', wallDark:'#A07028',
      weather:'gold', weatherRate: 0.7
    }
  ]
};

const UNDER_FLOOR_SPACING = 300;        /* المسافة بين طوابق الأرض */
const UNDER_FLOOR_HOLE_PERIOD = 1200;   /* طول الدورة بين الحفر */
const UNDER_FLOOR_HOLE_WIDTH = 150;     /* عرض الحفرة */
const UNDER_FLOOR_THICKNESS = 22;       /* سماكة الطابق */

/* ═══ نظام الغرف الواسعة والأبنية الضخمة ═══ */
const UNDER_CHAMBER_EVERY = 4;          /* كل 4 طوابق = غرفة واسعة */
const UNDER_CHAMBER_HOLE_WIDTH = 380;   /* عرض الحفرة في الغرفة */
const UNDER_BIG_PLATFORM_MIN = 200;     /* أصغر منصة عريضة */
const UNDER_BIG_PLATFORM_MAX = 420;     /* أكبر منصة عريضة */
const UNDER_COLUMN_HEIGHT = 180;        /* ارتفاع العمود الصخري */

const UNDER_REALM = {
  enterOffset: 100,     /* يدخل الأعماق بسرعة */
  exitOffset: 0,

  layers: [
    {
      id: 'caves', name:'CAVES', ar:'الكهوف',
      from: 0, to: 500,
      bg:'#3A2818', bgBot:'#1A0E08', accent:'#8E6A48',
      wall:'#5E4028', wallDark:'#2A1810',
      weather:'dust', weatherRate: 0.5
    },
    {
      id: 'magma', name:'MAGMA', ar:'الحمم',
      from: 500, to: 1100,
      bg:'#3A1010', bgBot:'#1A0404', accent:'#FF5020',
      wall:'#8E2018', wallDark:'#3A0808',
      weather:'ember', weatherRate: 0.8, glow:true
    },
    {
      id: 'abyss', name:'ABYSS', ar:'الهاوية',
      from: 1100, to: 1800,
      bg:'#0A0420', bgBot:'#040010', accent:'#A080FF',
      wall:'#1A0838', wallDark:'#08021A',
      weather:'void', weatherRate: 0.4
    },
    {
      id: 'void', name:'VOID', ar:'الفراغ',
      from: 1800, to: 2600,
      bg:'#000000', bgBot:'#000000', accent:'#C080FF',
      wall:'#100820', wallDark:'#040208',
      weather:'void', weatherRate: 0.6
    },
    {
      id: 'core', name:'CORE', ar:'النواة',
      from: 2600, to: 99999,
      bg:'#4A0810', bgBot:'#1A0208', accent:'#FFD060',
      wall:'#C03020', wallDark:'#5A0810',
      weather:'ember', weatherRate: 1.0, glow:true
    }
  ]
};

/* ═══════════════════════════════════════════════════════
   ════════════════ SOLAR SYSTEM PLANETS ═══════════════
   ═══════════════════════════════════════════════════════ */

const PLANET_REALM_ENTER = 3600;   /* الارتفاع المطلوب فوق آخر طبقة سماء */
const PLANET_SPACING = 1400;       /* المسافة بين كل كوكبين */

/* ✅ نقطة دخول عالم الكواكب الكاملة (آخر طبقة سماء + الهامش) */
const PLANET_ENTER_ALT = SKY_REALM.layers[SKY_REALM.layers.length - 1].from + PLANET_REALM_ENTER;
/* = 2600 + 3600 = 6200 */

/* ============================================================
   ════════════════ PLANETS v2 — مُمتدة بالكامل ══════════════
   ============================================================ */
const PLANETS = [
  /* ═══════════════ 1) MERCURY — عطارد ═══════════════ */
  {
    id: 'mercury', name: 'MERCURY', ar: 'عطارد', icon: '☿',
    from: 0, to: 1,
    sky: '#1A1A1A', skyBot: '#3A2A20',
    ground: '#6A5040', groundDark: '#3A2820', groundTop: '#8A7060',
    accent: '#FFA060', haze: 'rgba(255,160,96,0.08)',

    /* ═══ الفيزياء ═══ */
    sunBrightness: 1.4,
    gravity: 0.65,          /* جاذبية منخفضة → قفزات أعلى */
    wind: 0,
    temperature: '+430°',
    pressure: '0 atm',
    radiation: 0.3,         /* إشعاع منخفض */

    /* ═══ المرئيات ═══ */
    rings: null,            /* لا حلقات */
    moons: [],
    volcanoActivity: 0,
    craterDensity: 1.0,
    atmosphere: null,       /* لا غلاف جوي */
    sunSize: 1.6,
    earthVisible: true,

    /* ═══ العوائق ═══ */
    hazards: ['crater', 'rock', 'meteor'],
    hazardWeights: [0.4, 0.35, 0.25],
    weather: { type: 'meteor', rate: 0.002 },

    /* ═══ التقدم ═══ */
    tier: 1,
    rewardMultiplier: 1.0,
    orbValueBonus: 0
  },

  /* ═══════════════ 2) VENUS — الزهرة ═══════════════ */
  {
    id: 'venus', name: 'VENUS', ar: 'الزهرة', icon: '♀',
    from: 1, to: 2,
    sky: '#E8A050', skyBot: '#FFD080',
    ground: '#A07030', groundDark: '#5A3818', groundTop: '#C8A050',
    accent: '#FFD060', haze: 'rgba(255,200,96,0.18)',

    gravity: 0.9,
    wind: 0.15,
    temperature: '+465°',
    pressure: '92 atm',
    radiation: 0.1,

    rings: null,
    moons: [],
    volcanoActivity: 0.3,
    craterDensity: 0.4,
    atmosphere: {
      color: '#FFD080',
      density: 0.35,
      layers: 3
    },
    sunSize: 1.0,
    earthVisible: true,

    hazards: ['lava', 'acidRain', 'geyser', 'rock'],
    hazardWeights: [0.3, 0.25, 0.25, 0.2],
    weather: { type: 'acidRain', rate: 0.008 },

    tier: 2,
    rewardMultiplier: 1.2,
    orbValueBonus: 2
  },

  /* ═══════════════ 3) MARS — المريخ ═══════════════ */
  {
    id: 'mars', name: 'MARS', ar: 'المريخ', icon: '♂',
    from: 2, to: 3,
    sky: '#8A3A20', skyBot: '#E8A070',
    ground: '#9E4A28', groundDark: '#5A2810', groundTop: '#C86A40',
    accent: '#FF7030', haze: 'rgba(255,112,48,0.12)',

    gravity: 0.85,
    wind: 0.25,
    temperature: '-63°',
    pressure: '0.006 atm',
    radiation: 0.4,

    rings: null,
    moons: [
      { name: 'Phobos', r: 4, dist: 80, speed: 0.0015, color: '#A08060' },
      { name: 'Deimos', r: 3, dist: 130, speed: 0.001, color: '#8A7060' }
    ],
    volcanoActivity: 0.1,
    craterDensity: 0.7,
    atmosphere: {
      color: '#E8A070',
      density: 0.15,
      layers: 2
    },
    sunSize: 0.7,
    earthVisible: true,

    hazards: ['rock', 'crater', 'dustDevil', 'canyon'],
    hazardWeights: [0.35, 0.3, 0.2, 0.15],
    weather: { type: 'dustStorm', rate: 0.012 },

    tier: 3,
    rewardMultiplier: 1.4,
    orbValueBonus: 4
  },

  /* ═══════════════ 4) JUPITER — المشتري ═══════════════ */
  {
    id: 'jupiter', name: 'JUPITER', ar: 'المشتري', icon: '♃',
    from: 3, to: 4,
    sky: '#6A4A30', skyBot: '#D8A880',
    ground: '#8A6A48', groundDark: '#4A3020', groundTop: '#B89A70',
    accent: '#E8B890', haze: 'rgba(232,184,144,0.22)',

    gravity: 1.6,           /* جاذبية ثقيلة → قفزات أقل */
    wind: 0.4,
    temperature: '-110°',
    pressure: '1000 atm',
    radiation: 0.7,

    rings: {
      innerR: 90, outerR: 160,
      colors: ['#C09070', '#E8B890', '#A07050'],
      tilt: 0.3,
      alpha: 0.5
    },
    moons: [
      { name: 'Io',       r: 5, dist: 110, speed: 0.0020, color: '#E8C050', volcanic: true },
      { name: 'Europa',   r: 4, dist: 150, speed: 0.0015, color: '#C0D0E0', icy: true },
      { name: 'Ganymede', r: 6, dist: 200, speed: 0.0010, color: '#A08870' },
      { name: 'Callisto', r: 5, dist: 260, speed: 0.0007, color: '#6A5850' }
    ],
    volcanoActivity: 0.4,
    craterDensity: 0.2,
    atmosphere: {
      color: '#E8B890',
      density: 0.5,
      layers: 4,
      bands: true         /* شرائط أفقية مميزة */
    },
    sunSize: 0.5,
    earthVisible: true,
    hasGreatSpot: true,   /* البقعة الحمراء الكبرى */

    hazards: ['storm', 'lightning', 'gasCloud', 'turbulence'],
    hazardWeights: [0.35, 0.25, 0.25, 0.15],
    weather: { type: 'jupiterStorm', rate: 0.015 },

    tier: 4,
    rewardMultiplier: 1.7,
    orbValueBonus: 6
  },

  /* ═══════════════ 5) SATURN — زحل ═══════════════ */
  {
    id: 'saturn', name: 'SATURN', ar: 'زحل', icon: '♄',
    from: 4, to: 5,
    sky: '#A88060', skyBot: '#F0D8A8',
    ground: '#C0A878', groundDark: '#6A5838', groundTop: '#E0C8A0',
    accent: '#FFE8B0', haze: 'rgba(255,232,176,0.25)',

    gravity: 1.4,
    wind: 0.35,
    temperature: '-140°',
    pressure: '1.5 atm',
    radiation: 0.5,

    rings: {
      innerR: 100, outerR: 280,
      colors: ['#F0E0C0', '#E8C890', '#C0A070', '#F8F0D8', '#D8B880'],
      tilt: 0.55,           /* ميل واضح */
      alpha: 0.75,
      detailed: true        /* حلقات مفصلة */
    },
    moons: [
      { name: 'Titan',   r: 7, dist: 180, speed: 0.0015, color: '#E8A050', atmosphere: '#FFB060' },
      { name: 'Rhea',    r: 4, dist: 240, speed: 0.0010, color: '#C8C0B0' },
      { name: 'Iapetus', r: 4, dist: 300, speed: 0.0007, color: '#8A7060' }
    ],
    volcanoActivity: 0,
    craterDensity: 0.3,
    atmosphere: {
      color: '#FFE8B0',
      density: 0.3,
      layers: 3,
      bands: true
    },
    sunSize: 0.45,
    earthVisible: true,

    hazards: ['ringDebris', 'iceChunk', 'windShear', 'crystal'],
    hazardWeights: [0.35, 0.25, 0.2, 0.2],
    weather: { type: 'ringParticles', rate: 0.018 },

    tier: 5,
    rewardMultiplier: 2.0,
    orbValueBonus: 8
  },

  /* ═══════════════ 6) URANUS — أورانوس ═══════════════ */
  {
    id: 'uranus', name: 'URANUS', ar: 'أورانوس', icon: '♅',
    from: 5, to: 6,
    sky: '#40A0A8', skyBot: '#A0E8E0',
    ground: '#4A8890', groundDark: '#244850', groundTop: '#70B0B8',
    accent: '#80FFFF', haze: 'rgba(128,255,255,0.22)',

    gravity: 1.2,
    wind: 0.6,              /* رياح جانبية قوية */
    temperature: '-195°',
    pressure: '1.2 atm',
    radiation: 0.6,

    rings: {
      innerR: 80, outerR: 140,
      colors: ['#80D0E8', '#A0F0FF', '#60B0C0'],
      tilt: 1.5,            /* حلقات عمودية! */
      alpha: 0.4,
      vertical: true        /* ميل 98° — حلقات شبه عمودية */
    },
    moons: [
      { name: 'Titania', r: 4, dist: 150, speed: 0.0015, color: '#A0B8C0', icy: true },
      { name: 'Oberon',  r: 4, dist: 200, speed: 0.0010, color: '#8AA0A8', icy: true },
      { name: 'Miranda', r: 3, dist: 250, speed: 0.0008, color: '#C0D8E0', icy: true }
    ],
    volcanoActivity: 0,
    craterDensity: 0.5,
    atmosphere: {
      color: '#80FFFF',
      density: 0.4,
      layers: 3,
      aurora: true           /* شفق قطبي */
    },
    sunSize: 0.3,
    earthVisible: true,

    hazards: ['iceSpike', 'windBlast', 'crystal', 'frost'],
    hazardWeights: [0.3, 0.3, 0.25, 0.15],
    weather: { type: 'iceCrystals', rate: 0.014 },

    tier: 6,
    rewardMultiplier: 2.4,
    orbValueBonus: 10
  },

  /* ═══════════════ 7) NEPTUNE — نبتون ═══════════════ */
  {
    id: 'neptune', name: 'NEPTUNE', ar: 'نبتون', icon: '♆',
    from: 6, to: 7,
    sky: '#2030A0', skyBot: '#6080E0',
    ground: '#2A3888', groundDark: '#101840', groundTop: '#5068C0',
    accent: '#80C0FF', haze: 'rgba(128,192,255,0.28)',

    gravity: 1.3,
    wind: 0.8,              /* أقوى رياح في المجموعة الشمسية */
    temperature: '-200°',
    pressure: '1.3 atm',
    radiation: 0.8,

    rings: {
      innerR: 70, outerR: 130,
      colors: ['#4060C0', '#6080E0', '#3050A0'],
      tilt: 0.4,
      alpha: 0.35,
      segmented: true       /* حلقات مقسمة */
    },
    moons: [
      { name: 'Triton', r: 5, dist: 180, speed: -0.0015, color: '#C0D8E8', retrograde: true },
      { name: 'Proteus', r: 3, dist: 240, speed: 0.001, color: '#8A98A0' }
    ],
    volcanoActivity: 0.15,
    craterDensity: 0.3,
    atmosphere: {
      color: '#6080E0',
      density: 0.55,
      layers: 4,
      aurora: true,
      bands: true
    },
    sunSize: 0.25,
    earthVisible: false,

    hazards: ['megaStorm', 'lightning', 'windBlast', 'iceSpike', 'void'],
    hazardWeights: [0.25, 0.2, 0.2, 0.2, 0.15],
    weather: { type: 'neptuneStorm', rate: 0.020 },

    tier: 7,
    rewardMultiplier: 2.8,
    orbValueBonus: 12
  }
];

function getPlanetByIndex(idx){
  return PLANETS[clamp(idx, 0, PLANETS.length - 1)];
}

function getPlanetByAltitude(alt){
  /* ✅ الآن عند alt = 6200 → band = 0 → عطارد */
  const band = Math.floor((alt - PLANET_ENTER_ALT) / PLANET_SPACING);
  return getPlanetByIndex(Math.max(0, band));
}

/* ═══ اختيار عائق عشوائي حسب الأوزان ═══ */
function pickPlanetHazard(planet){
  const weights = planet.hazardWeights || planet.hazards.map(() => 1);
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for(let i = 0; i < weights.length; i++){
    roll -= weights[i];
    if(roll <= 0) return planet.hazards[i];
  }
  return planet.hazards[0];
}

/* ═══ هل الكوكب يحتوي هذه الميزة؟ ═══ */
function planetHas(planet, feature){
  if(!planet) return false;
  if(feature === 'rings') return !!planet.rings;
  if(feature === 'moons') return planet.moons && planet.moons.length > 0;
  if(feature === 'atmosphere') return !!planet.atmosphere;
  if(feature === 'aurora') return planet.atmosphere && planet.atmosphere.aurora;
  if(feature === 'volcano') return (planet.volcanoActivity || 0) > 0.1;
  if(feature === 'greatSpot') return !!planet.hasGreatSpot;
  return false;
}

/* ═══ إحداثيات القمر في مداره ═══ */
function getMoonPosition(moon, time, cx, cy){
  const angle = time * moon.speed + (moon.phase || 0);
  return {
    x: cx + Math.cos(angle) * moon.dist,
    y: cy + Math.sin(angle) * moon.dist * 0.4,   /* ضغط رأسي = منظور */
    z: 0.5 + Math.sin(angle) * 0.5               /* للترتيب */
  };
}

/* ═══ شدة تأثير الجاذبية على القفز ═══ */
function getPlanetGravityScale(){
  if(!G.planet) return 1;
  return G.planet.gravity || 1;
}

/* ═══ قوة الرياح الحالية ═══ */
function getPlanetWindStrength(){
  if(!G.planet) return 0;
  return G.planet.wind || 0;
}

/* ============================================================
   ==================== SHIFT GATES ==========================
   ============================================================ */
const SEGMENT_LENGTH_METERS = 120;   /* 120 متر بين كل بوابة */
const MODE_COLORS = {
  FLIP: '#4A7FA0', FLAP: '#8E6AA8', DRIFT: '#C98A2E', WALK: '#4A8040'
};
const MODE_ICONS = {
  FLIP: '⇅', FLAP: '▲', DRIFT: '✦', WALK: '♟'
};

/* ============================================================
   ==================== SYNERGIES v2 (18 توليفة) =============
   ============================================================ */
const SYNERGIES = [

  /* ═══ اقتصاد ═══ */
  { id:'coinStorm', needs:['magnet','double'],
    name:'عاصفة العملات', icon:'💰', color:'#FFD700',
    desc:'عملات مضاعفة تتساقط بغزارة',
    effect:()=>{ if(G.t%20===0){ G.runCoins+=3; addFloat(P.x+rand(-30,30),P.y-40,'+3','#FFD700',12); } }
  },
  { id:'goldRush', needs:['double','goldenTouch'],
    name:'حمّى الذهب', icon:'✦', color:'#FFB040',
    desc:'العملات تتحول ذهباً وتتضاعف',
    effect:()=>{ if(G.t%15===0){ G.runCoins+=5; burst(P.x,P.y,'#FFD700',6,4); } }
  },
  { id:'infinityVault', needs:['magnet','goldenTouch','multiplier'],
    name:'خزنة اللانهاية', icon:'💎', color:'#FFE060',
    desc:'كل عملة تساوي ٣٠ ضعف قيمتها',
    effect:()=>{ if(G.t%10===0){ G.runCoins+=8; addFloat(P.x,P.y-50,'+8 💎','#FFE060',15); } }
  },

  /* ═══ دفاع ═══ */
  { id:'ram', needs:['shield','slow'],
    name:'الكبش', icon:'🛡', color:'#7BC4B0',
    desc:'تهشيم العقبات عند اللمس',
    effect:()=>{
      for(const o of obstacles){
        if(o.dead) continue;
        if(o.isWalk && !o.isPlatform && Math.abs(o.x-P.x)<40){
          o.dead=true; burst(o.x,o.y||GROUND_Y-30,'#7BC4B0',10,5);
        }
      }
    }
  },
  { id:'immortal', needs:['shield','immune'],
    name:'الخلود', icon:'♾', color:'#FFD060',
    desc:'حصانة دائمة + درع متجدد',
    effect:()=>{ if(!G.shield) G.shield = true; }
  },
  { id:'guardianAngel', needs:['shield','secondChance','regen'],
    name:'الملاك الحارس', icon:'👼', color:'#FFF8C0',
    desc:'حماية مطلقة — لا يمكن هزيمتك',
    effect:()=>{
      if(!G.shield) G.shield = true;
      G.invuln = Math.max(G.invuln, 30);
    }
  },

  /* ═══ حركة ═══ */
  { id:'airControl', needs:['glide','extraJump'],
    name:'التحكم الجوي', icon:'🪂', color:'#87CEEB',
    desc:'قفزات إضافية + انزلاق لانهائي',
    effect:()=>{ if(P.jumpHeld && P.vy>0) P.vy=Math.min(P.vy,1.5); }
  },
  { id:'skyMagnet', needs:['rocket','magnet'],
    name:'الصاروخ الجاذب', icon:'🚀', color:'#FF6B35',
    desc:'جمع العملات أثناء الصعود',
    effect:()=>{
      for(const c of coins){ if(c.dead) continue;
        const dx=P.x-c.x, dy=P.y-c.y, d=Math.hypot(dx,dy)||1;
        if(d<400){ c.x+=(dx/d)*12; c.y+=(dy/d)*12; }
      }
    }
  },
  { id:'superDash', needs:['dash','haste'],
    name:'الانطلاقة الخارقة', icon:'»', color:'#4A88C8',
    desc:'سرعة قصوى — اختراق كل شيء',
    effect:()=>{ G.dashSpeedBoost = true; }
  },
  { id:'flightMaster', needs:['jetpack','hover','glide'],
    name:'سيّد الطيران', icon:'✈', color:'#FF8040',
    desc:'طيران دائم لا ينتهي',
    effect:()=>{ if(P.jumpHeld && P.vy>0) P.vy=Math.min(P.vy,-1); }
  },

  /* ═══ زمن ═══ */
  { id:'laserPhase', needs:['ghost','magnet'],
    name:'اختراق الليزر', icon:'🔮', color:'#B8A4C9',
    desc:'عبور الليزر بأمان + جذب أقوى',
    effect:()=>{}
  },
  { id:'timeLord', needs:['timeWarp','freeze'],
    name:'سيّد الزمن', icon:'⏱', color:'#9A6AC8',
    desc:'العالم تحت سيطرتك الكاملة',
    effect:()=>{
      for(const o of obstacles){
        if(o.isFallingSpike || o.isFallingRock) o.falling = false;
      }
    }
  },
  { id:'paradox', needs:['bulletTime','haste'],
    name:'المفارقة', icon:'⌛', color:'#C0A0FF',
    desc:'العالم بطيء — أنت فائق السرعة',
    effect:()=>{ P.speedMul = 2.5; }
  },

  /* ═══ هجوم ═══ */
  { id:'annihilator', needs:['destroyer','laser'],
    name:'المبيد', icon:'⚔', color:'#E85838',
    desc:'لا شيء يوقفك — تدمير شامل',
    effect:()=>{
      for(const o of obstacles){
        if(o.dead || o.isPlatform || o.isShiftGate) continue;
        if(o.x > P.x - 50 && o.x < P.x + 250){
          o.dead = true;
          burst(o.x, o.y||GROUND_Y-30, '#E85838', 12, 6);
        }
      }
    }
  },
  { id:'blackHoleBomb', needs:['blackHole','bomb'],
    name:'قنبلة الفراغ', icon:'●', color:'#6020A0',
    desc:'يمتص ويُفجّر كل العقبات',
    effect:()=>{
      if(G.t % 30 === 0){
        for(const o of obstacles){
          if(o.dead || o.isPlatform) continue;
          const dx = P.x - o.x;
          o.x += dx * 0.05;
        }
      }
    }
  },
  { id:'elementalStorm', needs:['shockwave','destroyer','laser'],
    name:'العاصفة العنصرية', icon:'🌪️', color:'#FF8040',
    desc:'عاصفة تدميرية تكتسح كل شيء',
    effect:()=>{
      if(G.t % 8 === 0){
        for(let i=0;i<3;i++){
          particles.push({
            x: P.x + rand(-100, 100), y: P.y + rand(-100, 100),
            vx: rand(-8,8), vy: rand(-8,8),
            life: 0.8, decay: 0.03,
            color: ['#FF5020','#80D0FF','#FFD060'][i%3],
            size: rand(3, 6)
          });
        }
      }
    }
  },

  /* ═══ تحول ═══ */
  { id:'giantSmash', needs:['giant','destroyer'],
    name:'العملاق المدمّر', icon:'⬤', color:'#E85838',
    desc:'عملاق يحطم كل شيء في طريقه',
    effect:()=>{ P.r = Math.max(P.r, 22); }
  },
  { id:'ghostWalker', needs:['phase','ghost'],
    name:'سالك الفراغ', icon:'👻', color:'#C080FF',
    desc:'عبور مطلق عبر كل شيء',
    effect:()=>{ G.ghost = Math.max(G.ghost, 30); }
  },
  { id:'voidShadow', needs:['phase','blackHole'],
    name:'ظل الفراغ', icon:'◉', color:'#6020A0',
    desc:'تختفي وتمتصّ كل شيء حولك',
    effect:()=>{
      for(const c of coins){ if(c.dead) continue;
        const d = Math.hypot(P.x-c.x, P.y-c.y);
        if(d < 500){ c.dead = true; G.runCoins += 2; }
      }
    }
  },

  /* ═══ نادرة جداً ═══ */
  { id:'apocalypse', needs:['destroyer','blackHole','laser','shockwave'],
    name:'نهاية العالم', icon:'☄️', color:'#FF2060',
    desc:'قوة تدميرية لا مثيل لها',
    effect:()=>{
      if(G.t % 5 === 0){
        for(const o of obstacles){
          if(o.dead || o.isPlatform || o.isShiftGate) continue;
          if(o.x > -50 && o.x < W + 50){
            o.dead = true;
            burst(o.x, o.y||GROUND_Y-30, '#FF2060', 8, 7);
          }
        }
      }
    }
  },
  { id:'divinity', needs:['shield','immune','secondChance','regen'],
    name:'الألوهية', icon:'⚡', color:'#FFD700',
    desc:'قوة إلهية — لا يمكن إيقافك',
    effect:()=>{
      if(!G.shield) G.shield = true;
      G.invuln = Math.max(G.invuln, 60);
      if(G.t % 60 === 0){
        burst(P.x, P.y, '#FFD700', 20, 8);
      }
    }
  }
];

let activeSynergies = [];

function checkSynergies(){
  const active = new Set(Object.keys(G.activePowerups));
  if(G.shield) active.add('shield');
  if(G.ghost > 0) active.add('ghost');

  const newSynergies = [];
  for(const syn of SYNERGIES){
    const ok = syn.needs.every(n => active.has(n));
    if(ok){
      newSynergies.push(syn.id);
      if(!activeSynergies.includes(syn.id)){
        showBanner(syn.name, syn.icon + ' ' + syn.desc);
        Sfx.play(880, 0.4, 'sine', 0.06, 1760);
        shake(10); haptic(25);
        for(let i=0;i<30;i++){
          const a = (i/30)*Math.PI*2;
          particles.push({
            x:P.x, y:P.y,
            vx:Math.cos(a)*rand(4,9), vy:Math.sin(a)*rand(4,9),
            life:1.3, decay:0.018, color:syn.color, size:rand(3,6)
          });
        }
      }
    }
  }
  activeSynergies = newSynergies;
}

function updateSynergies(){
  for(const id of activeSynergies){
    const syn = SYNERGIES.find(s => s.id === id);
    if(syn && syn.effect) syn.effect();
  }
}

function drawSynergiesUI(){
  const row = document.getElementById('synergy-row');
  if(!row) return;
  if(activeSynergies.length === 0){
    if(row.innerHTML !== '') row.innerHTML = '';
    return;
  }
  row.innerHTML = activeSynergies.map(id => {
    const s = SYNERGIES.find(x => x.id === id);
    return `<div class="synergy-chip" style="--sc:${s.color}">
      <span class="sc-ic">${s.icon}</span>
      <span class="sc-nm">${s.name}</span>
    </div>`;
  }).join('');
}

/* ============================================================
   ==================== Progression ==========================
   ============================================================ */
const PIXELS_PER_METER = 25;
const PROGRESSION = {
  rampMeters: 3200,
  speedStart: 1.6,
  speedMax: 6.5,
  /* ✅ بعد الوصول لـ speedMax، تستمر الزيادة لوغاريتمياً بلا حدود */
  speedLogScale: 1.5,
  gapStart: 380, gapMin: 200,
  spawnStart: 480, spawnMin: 240,
  spikeUnlock: 60, tallUnlock: 200, wobbleUnlock: 350, wobbleMaxMeters: 1200,
  levels: [0, 40, 120, 250, 450, 750, 1150, 1700, 2500, 3600, 5000, 7000]
  /* ✅ بعد آخر قيمة، تُولَّد المستويات بصيغة أسّية لا نهائية */
};

function getMeters(){
  /* في ASCEND: الارتفاع الحقيقي للاعب فوق نقطة البداية */
  if(G.mode === 'ASCEND'){
    return Math.max(0, Math.floor((GROUND_Y - P.y) / PIXELS_PER_METER));
  }
  return Math.floor(G.dist / PIXELS_PER_METER);
}
function getProgression(){
  const m = getMeters();
  const t = Math.min(m / PROGRESSION.rampMeters, 1);
  const eased = 1 - Math.pow(1 - t, 1.8);
  const wobbleT = clamp((m - PROGRESSION.wobbleUnlock) / (PROGRESSION.wobbleMaxMeters - PROGRESSION.wobbleUnlock), 0, 1);

  /* ✅ السرعة: تصل إلى speedMax عند rampMeters، ثم تستمر بالنمو اللوغاريتمي */
  let speed;
  if(m <= PROGRESSION.rampMeters){
    speed = lerp(PROGRESSION.speedStart, PROGRESSION.speedMax, eased);
  } else {
    const extraM = m - PROGRESSION.rampMeters;
    speed = PROGRESSION.speedMax + Math.log2(1 + extraM / 1000) * PROGRESSION.speedLogScale;
  }

  return {
    t, eased,
    speed,
    gap: lerp(PROGRESSION.gapStart, PROGRESSION.gapMin, eased),
    spawnDist: lerp(PROGRESSION.spawnStart, PROGRESSION.spawnMin, eased),
    wobble: wobbleT * 0.65,
    hasSpike: m >= PROGRESSION.spikeUnlock,
    hasTall: m >= PROGRESSION.tallUnlock
  };
}
function getSpeedScale(){
  const ratio = G.speed / PROGRESSION.speedStart;
  return Math.pow(clamp(ratio, 1, 4.5), 0.65);
}
/* ✅ العتبة اللانهائية للمستوى (بعد آخر قيمة مُعرّفة) */
function getLevelThreshold(idx){
  const arr = PROGRESSION.levels;
  if(idx < arr.length) return arr[idx];
  const lastVal = arr[arr.length - 1];
  const n = idx - arr.length + 1;
  /* نمو أسّي: كل مستوى يحتاج ~1.5x أكثر من الذي قبله */
  return Math.floor(lastVal + 3000 * (Math.pow(1.5, n) - 1));
}

function getLevelIndex(){
  const m = getMeters();
  const arr = PROGRESSION.levels;

  /* المرحلة الأولى: مستويات مُعرّفة مسبقاً */
  let idx = 0;
  for(let i = 0; i < arr.length; i++){
    if(m >= arr[i]) idx = i;
    else break;
  }

  /* المرحلة الثانية: مستويات لا نهائية (صيغة عكسية سريعة) */
  if(idx >= arr.length - 1 && m >= arr[arr.length - 1]){
    const lastVal = arr[arr.length - 1];
    const extraM = m - lastVal;
    const n = Math.floor(Math.log(extraM / 3000 + 1) / Math.log(1.5));
    idx = arr.length - 1 + n;
  }

  return idx;
}

function getLevelProgress(){
  const m = getMeters();
  const lv = getLevelIndex();
  const cur = getLevelThreshold(lv);
  const next = getLevelThreshold(lv + 1);
  return clamp((m - cur) / (next - cur), 0, 1);
}

/* ============================================================
   ==================== Canvas ===============================
   ============================================================ */
const wrapEl = document.getElementById('wrap');
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W=0,H=0,DPR=1,GROUND_H=0,GROUND_Y=0;

const CEILING_H = 46;

function resize(){
  W = wrapEl.clientWidth;
  H = wrapEl.clientHeight;
  DPR = Math.min(window.devicePixelRatio||1, 2.5);
  canvas.width = Math.floor(W*DPR);
  canvas.height = Math.floor(H*DPR);
  canvas.style.width = W+'px';
  canvas.style.height = H+'px';
  ctx.setTransform(DPR,0,0,DPR,0,0);
  GROUND_H = Math.max(64, H*0.14);
  GROUND_Y = H - GROUND_H;
  P.baseX = W*0.26;
  if(G.state==='MENU'){ P.x=W*0.5; P.y=H*0.5; }
}
window.addEventListener('resize', resize);

/* ============================================================
   ==================== State ================================
   ============================================================ */
/* ✅ الإصلاح 6: حذف G.activeSynergies غير المستخدم */
const G = {
  state:'MENU', mode: Save.data.mode || 'FLIP',
  t:0, dist:0, meters:0, orbCount:0, runCoins:0,
  speed:0, spawnCd:0,
  sceneIdx:0, sceneFrom:0, sceneTo:0, sceneT:0, sceneActive:false,
  currentScene: SCENES[0],
  invuln:0, shake:0, flash:0,
  banner:{text:'',sub:'',timer:0},
  hintTimer:0, lastMilestone:0,
  weather:[], cloudShadows:[], stars:[],
  lastLevel: 0, shield: false, ghost: 0,
  activePowerups: {},
  combo: 0, comboTimer: 0, comboMax: 0,
  lightningTimer: 0,
  lightningFlash: 0,
  skyCeilY: 0,
  skyDecor: [],
  camY: 0,
  camTargetY: 0,
  extraJumps: 0,
  infiniteJump: 0,
  glideActive: false,
  rocketActive: false,
  megaJumpActive: 0,
  wallStickActive: false,
  rocketFrames: 0,
  rocketMaxAltitude: 0,
  maxAltitude: 0,
  selectedMode: 'FLIP',
  isMixedMode: false,
  distSinceGate: 0,
  pendingShift: false,
  shiftGrace: 0,
    /* ═══════════════ Realms ═══════════════ */
  realm: REALM.GROUND,
  skyLayerIdx: 0,
  underLayerIdx: 0,
  skyLayersVisited: [],
  underLayersVisited: [],
  realmTransition: 0,       /* 0-1 blend */
  realmFrom: REALM.GROUND,
  realmTo: REALM.GROUND,

nextHoleMeters: 450,
spawnCdMul: 1,   /* مضاعف المسافة بين العقبات */

  /* ═══════════════ Underground ═══════════════ */
  isDigging: false,         /* هل يمكن تجاوز مستوى الأرض */
  underDepthPx: 0,          /* عمق اللاعب تحت الأرض */
  camYUnder: 0,              /* إزاحة الكاميرا للأسفل */

  /* ═══════════════ ASCEND ═══════════════ */
  ascendHighestY: 0,
  ascendLastJumpTap: 0,
  ascendJumpCooldown: 0,   /* ← جديد: منع القفز المتكرر */

    /* ═══════════════ Companion & Footstep ═══════════════ */
  companion: { x:0, y:0, angle:0, t:0 },   // ← أضف هذا
  lastFootstepDist: 0,                      // ← أضف هذا

    /* ═══ Planets ═══ */
  planetIdx: 0,
  planet: null,
  planetEntering: 0,
  planetFloors: [],   /* أرضيات عائمة */
};

const P = {
  x:0,y:0,vx:0,vy:0,r:13,baseX:100,
  gravityDir:1, rot:0,
  onGround:false, jumps:0, trail:[],
  enginePhase: 0, legPhase: 0, bouncePhase: 0,
  cape: null,
  jumpHeld: false,
  jumpHoldTimer: 0,
  coyoteTimer: 0,
  jumpBufferTimer: 0,
  onPlatform: null,
  walkAnim: 0,
  inRealm: 'GROUND'
};
let obstacles=[], orbs=[], coins=[], powerups=[], particles=[], floats=[], clouds=[];
let sparkParticles = [];
const pointer = { x:0,y:0,down:false,hasHover:false };
try{ pointer.hasHover = window.matchMedia('(hover:hover)').matches; }catch(e){}

/* ============================================================
   ==================== Scene transitions ====================
   ============================================================ */
const SCENE_BLEND_FRAMES = 360;

/* ✅ توليد ديناميكي لعتبات المشاهد (المسافات تتصاعد تدريجياً) */
const SCENE_THRESHOLDS = (() => {
  const arr = [];
  let acc = 0;
  let delta = 60;
  for(let i = 0; i < SCENES.length; i++){
    arr.push(acc);
    acc += delta;
    delta = Math.min(500, delta + 20);
  }
  return arr;
})();

/* ✅ حالة التبديل العشوائي بعد استنفاد كل المشاهد */
let sceneRandomMode = false;
let nextRandomSwitchMeters = 0;
const RANDOM_SCENE_INTERVAL = 500;   /* كل 500 متر يتغير المشهد عشوائياً */

function updateSceneTransition(){
  /* ASCEND يستخدم سماء مبنية على الارتفاع */
  if(G.mode === 'ASCEND'){
    G.currentScene = SCENES[0];
    return;
  }

  const m = getMeters();
  const arr = SCENE_THRESHOLDS;
  const maxThreshold = arr[arr.length - 1];

  /* ═══════════════ وضع التبديل العشوائي (بعد آخر مشهد) ═══════════════ */
  if(m >= maxThreshold){
    if(!sceneRandomMode){
      sceneRandomMode = true;
      nextRandomSwitchMeters = m + RANDOM_SCENE_INTERVAL;
    }

    if(!G.sceneActive && m >= nextRandomSwitchMeters){
      nextRandomSwitchMeters = m + RANDOM_SCENE_INTERVAL;

      /* اختر مشهداً عشوائياً مختلفاً عن الحالي */
      let newIdx;
      let safety = 0;
      do {
        newIdx = Math.floor(Math.random() * SCENES.length);
        safety++;
      } while(newIdx === G.sceneIdx && safety < 20);

      G.sceneActive = true;
      G.sceneFrom = G.sceneIdx;
      G.sceneTo = newIdx;
      G.sceneT = 0;
      const ns = SCENES[newIdx];
      showBanner(ns.en, ns.ar);
      Sfx.level();
    }
  }
  /* ═══════════════ وضع التبديل التتابعي (المشاهد الأولى) ═══════════════ */
  else {
    sceneRandomMode = false;

    let target = 0;
    for(let i = 0; i < arr.length; i++){
      if(m >= arr[i]) target = i;
    }

    if(!G.sceneActive && target !== G.sceneIdx){
      G.sceneActive = true;
      G.sceneFrom = G.sceneIdx;
      G.sceneTo = target;
      G.sceneT = 0;
      const ns = SCENES[target];
      showBanner(ns.en, ns.ar);
      Sfx.level();
    }
  }

  /* ═══════════════ معالجة الانتقال الناعم (مشترك بين الوضعين) ═══════════════ */
  if(G.sceneActive){
    G.sceneT += 1/SCENE_BLEND_FRAMES;
    if(G.sceneT >= 1){
      G.sceneT = 1;
      G.sceneIdx = G.sceneTo;
      G.sceneActive = false;
      G.currentScene = SCENES[G.sceneIdx];
    } else {
      G.currentScene = blendScene(SCENES[G.sceneFrom], SCENES[G.sceneTo], ease(G.sceneT));
    }
  } else {
    G.currentScene = SCENES[G.sceneIdx];
  }
}

/* ============================================================
   ==================== FX ===================================
   ============================================================ */
function burst(x,y,color,count,power=6){
  if(particles.length>240) return;
  for(let i=0;i<count;i++){
    const a=Math.random()*Math.PI*2;
    const s=Math.random()*power + 0.6;
    particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,decay:rand(0.02,0.045),color,size:rand(2,4.5)});
  }
}
function dust(x,y,color,count=6,dir=-1){
  if(particles.length>240) return;
  for(let i=0;i<count;i++){
    const sp = (Math.random()-0.5)*Math.PI*0.9;
    const s = Math.random()*2 + 0.5;
    particles.push({x:x+rand(-5,5),y,vx:Math.cos(-Math.PI/2+sp)*s,vy:dir*(Math.sin(-Math.PI/2+sp)*s - 0.5),life:0.85,decay:rand(0.025,0.045),color,size:rand(2,4)});
  }
}
function spawnJumpEffect(x, y, color){
  const item = currentJump();
  if(!item || item.id === 'none' || !hasItemImage(item)) return;

  const cfg = getCategoryConfig('jump').render;
  particles.push({
    x, y,
    vx: 0, vy: 0,
    life: cfg.life || 0.9,
    decay: cfg.fade || 0.035,
    item,
    size: P.r * (cfg.sizeMul || 5.0),
    scaleOverLife: 1.6,
    color: '#FFFFFF'
  });

  Sfx.bounce();
  haptic(4);
}
function spawnDeathEffect(x, y, color){
  const item = currentDeath();
  if(!item || item.id === 'none' || !hasItemImage(item)){
    /* fallback: انفجار بسيط */
    burst(x, y, color || '#FFFFFF', 30, 7);
    return;
  }

  const cfg = getCategoryConfig('death').render;
  const count = cfg.count || 18;

  for(let i = 0; i < count; i++){
    const a = (i / count) * Math.PI * 2;
    const s = rand(3, 8);
    particles.push({
      x, y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: cfg.life || 1.4,
      decay: cfg.fade || 0.018,
      item,
      size: rand(P.r * 1.0, P.r * 1.8),
      rotation: rand(0, Math.PI * 2),
      rotationSpeed: rand(-0.05, 0.05),
      color: '#FFFFFF'
    });
  }
}
function addFloat(x,y,text,color,size=14){ floats.push({x,y,text,color,size,life:1,vy:-1.1}); }
function showBanner(text,sub=''){ G.banner.text=text; G.banner.sub=sub; G.banner.timer=140; }
function shake(v){ G.shake = Math.max(G.shake, v); }

function spawnFootstep(){
  /* ❌ نظام الآثار محذوف في v3 */
}

function spawnSpark(){
  const item = currentSpark();
  if(!item || item.id === 'none' || !hasItemImage(item)) return;
  if(sparkParticles.length > 40) return;

  const cfg = getCategoryConfig('spark').render;
  sparkParticles.push({
    x: P.x - 10 - rand(0, 6),
    y: P.y + rand(-6, 6),
    vx: rand(-2.2, -0.6),
    vy: rand(-0.6, 0.6),
    size: P.r * (cfg.sizeMul || 1.2) * rand(0.8, 1.3),
    life: cfg.life || 1.0,
    decay: cfg.fade || 0.028,
    item,
    rot: rand(0, Math.PI * 2),
    rotSpd: rand(-0.04, 0.04)
  });
}

/* يُستدعى من updateGameplay كل إطار */
function updateTrailEffect(){
  if(G.state !== 'PLAYING') return;
  const item = currentTrail();
  if(!item || item.id === 'none' || !hasItemImage(item)) return;

  const cfg = getCategoryConfig('trail').render;
  const rate = cfg.spawnRate || 2;

  if(G.t % rate === 0){
    particles.push({
      x: P.x + rand(-6, 6),
      y: P.y + rand(-6, 6),
      vx: rand(-0.8, 0.2),
      vy: rand(-0.3, 0.3),
      life: cfg.life || 1.0,
      decay: cfg.fade || 0.03,
      item,
      size: P.r * (cfg.sizeMul || 1.4),
      rotation: rand(0, Math.PI * 2),
      rotationSpeed: rand(-0.03, 0.03),
      color: '#FFFFFF'
    });
  }
}

function updateSparks(){
  const item = currentSpark();
  if(item && item.id !== 'none' && G.state === 'PLAYING'){
    if(G.t % 3 === 0) spawnSpark();
  }

  for(let i = sparkParticles.length - 1; i >= 0; i--){
    const p = sparkParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.rotSpd;
    p.vx *= 0.98;
    p.life -= p.decay;

    if(p.life <= 0 || p.x < -50 || p.y < -50 || p.y > H + 50){
      sparkParticles.splice(i, 1);
    }
  }
}

function drawSparks(){
  for(const p of sparkParticles){
    /* ✅ صورة فقط */
    if(!p.item) continue;

    const img = getItemImageEl(p.item);
    if(!img || !img.complete || img.naturalWidth <= 0) continue;

    const alpha = Math.max(0, Math.min(1, p.life * 1.2));
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    const sz = p.size * Math.max(0.5, p.life);
    ctx.drawImage(img, -sz/2, -sz/2, sz, sz);
    ctx.restore();
  }
}

/* ============================================================
   ==================== Combo ================================
   ============================================================ */
function addCombo(){
  G.combo++;
  G.comboTimer = 110;
  if(G.combo > G.comboMax) G.comboMax = G.combo;
  if(Save.data.stats.bestCombo < G.comboMax) Save.data.stats.bestCombo = G.comboMax;

  if(G.combo >= 2){
    const pill = document.getElementById('combo-pill');
    pill.style.display = 'flex';
    document.getElementById('hud-combo').textContent = G.combo;
    pill.classList.remove('bump');
    void pill.offsetWidth;
    pill.classList.add('bump');
  }
  if(G.combo > 1 && G.combo % 5 === 0){
    addFloat(P.x, P.y - 55, 'x' + G.combo + '!', '#FFB060', 22);
    Sfx.combo(); shake(4);
    for(let i=0;i<18;i++){
      const a = (i/18)*Math.PI*2;
      particles.push({x: P.x, y: P.y, vx: Math.cos(a)*rand(3,6), vy: Math.sin(a)*rand(3,6),
        life: 1, decay: 0.028, color: '#FFD060', size: rand(2.5,4.5)});
    }
  }
}
function getComboMul(){ return 1 + Math.floor(G.combo / 5); }
function updateCombo(){
  if(G.comboTimer > 0){
    G.comboTimer--;
    if(G.comboTimer === 0){
      G.combo = 0;
      document.getElementById('combo-pill').style.display = 'none';
    }
  }
}

/* ============================================================
   ==================== Weather ==============================
   ============================================================ */
function updateWeather(){
  /* ═══════════════════════════════════════════════════════
     ✅ إصلاح: في الكواكب، عطّل طقس الأرض تماماً
     ═══════════════════════════════════════════════════════ */
  if(G.realm === REALM.PLANET){
    /* ═══ تفريغ أي طقس أرضي متبقٍ ═══ */
    if(G.weather.length > 0){
      G.weather.length = 0;
    }
    return;   /* ← لا مطر أرضي، لا ثلج، لا بتلات */
  }

  const s = G.currentScene;
  if(!s.weather) return;

  /* ... باقي الكود كما هو بدون تغيير ... */
  if(s.wind && G.state === 'PLAYING'){
    if(G.mode === 'DRIFT' || G.mode === 'WALK'){
      P.x += s.wind * 0.15;
    }
  }

  if(s.lightning){
    G.lightningTimer = (G.lightningTimer || 0) - 1;
    if(G.lightningTimer <= 0 && Math.random() < 0.008){
      G.lightningTimer = Math.floor(rand(180, 420));
      G.lightningFlash = 1;
      shake(3);
      Sfx.play(80, 0.35, 'sine', 0.05, 40);
    }
    if(G.lightningFlash > 0) G.lightningFlash -= 0.06;
  }

  const rate = s.weatherRate || 0.4;
  const maxParts = s.weather === 'rain' ? 120 : (s.weather === 'sandstorm' ? 90 : 70);
  if(Math.random() < rate && G.weather.length < maxParts){
    const type = s.weather;
    const rising = (type==='ember' || type==='firefly' || type==='bubbles' || type==='starfield');
    const p = {
      x: rand(-20,W+20),
      y: rising ? (H + 20) : (type === 'sandstorm' ? rand(-20, H) : rand(-20,H*0.6)),
      vx: 0, vy: 0,
      size: rand(1.2,2.6),
      life: rand(180,420), maxLife:1,
      type, phase: rand(0,Math.PI*2), phaseSpd: rand(0.02,0.06)
    };
    p.maxLife = p.life;

    switch(type){
      case 'rain':
        p.vy = rand(3,5); p.vx = rand(-1.5,-0.8) + (s.wind||0)*3; p.size = rand(0.8,1.4); break;
      case 'hail':
        p.vy = rand(5,8); p.vx = (s.wind||0)*2; p.size = rand(2,3.5); break;
      case 'wind':
        p.vx = rand(3,6)*(1+(s.wind||0)); p.vy = rand(-0.3,0.3); p.size = rand(1,2); p.life = rand(80,160); break;
      case 'leaves':
        p.vx = rand(-1.2,-0.4); p.vy = rand(0.5,1.1); p.size = rand(2.5,4.5); break;
      case 'ash':
        p.vx = rand(-0.8,-0.2); p.vy = rand(0.3,0.8); p.size = rand(1.5,2.8); break;
      case 'sandstorm':
        p.vx = rand(-6,-2)*(1+(s.wind||0)); p.vy = rand(-0.5,0.5); p.size = rand(0.8,1.8); p.life = rand(60,140); break;
      case 'bubbles':
        p.vx = rand(-0.4,0.2); p.vy = rand(-1.2,-0.4); p.size = rand(2,5); break;
      case 'neon':
        p.vx = rand(-1.5,-0.3); p.vy = rand(-0.2,0.2); p.size = rand(1.5,3); break;
      case 'starfield':
        p.vx = rand(-0.4,-0.1); p.vy = rand(-0.3,0.1); p.size = rand(0.8,2); p.life = rand(300,700); break;
      default:
        p.vx = rand(-0.5,-0.1); p.vy = rising ? rand(-0.6,-0.2) : rand(0.4,1.2);
    }
    p.maxLife = p.life;
    G.weather.push(p);
  }

  for(let i=G.weather.length-1;i>=0;i--){
    const p = G.weather[i];
    p.life--;
    const sway = Math.sin(G.t*p.phaseSpd + p.phase);
    switch(p.type){
      case 'petal':
      case 'pollen':
      case 'snow':
      case 'leaves':
      case 'ash':
        p.x += p.vx + sway*0.5 + (s.wind||0)*0.6; p.y += p.vy; break;
      case 'firefly':
        p.x += p.vx + sway*0.6 + (s.wind||0)*0.3; p.y += p.vy + Math.sin(G.t*0.04+p.phase)*0.4; break;
      case 'ember':
        p.x += p.vx + sway*0.4 + (s.wind||0)*0.5; p.y += p.vy; break;
      case 'bubbles':
        p.x += p.vx + sway*0.5; p.y += p.vy; break;
      case 'neon':
        p.x += p.vx + sway*0.2; p.y += p.vy + Math.sin(G.t*0.05+p.phase)*0.6; break;
      case 'starfield':
        p.x += p.vx; p.y += p.vy; break;
      default:
        p.x += p.vx; p.y += p.vy;
    }
    if(p.life<=0 || p.x<-60 || p.x>W+60 || p.y>H+40 || p.y<-40){ G.weather.splice(i,1); }
  }
}

function drawWeather(){
  /* ═══════════════════════════════════════════════════════
     ✅ في الكواكب: ارسم جسيمات الكوكب فقط + وميض البرق
     ═══════════════════════════════════════════════════════ */
  if(G.realm === REALM.PLANET){
    /* ═══ 1) ارسم جسيمات الطقس الكوكبية ═══ */
    for(const p of G.weather){
      /* نفس كود drawWeather لكن بدون أي فلترة أرضية */
      const life = p.life / (p.maxLife || 1);
      const fade = Math.min(1, life * 3, (1 - life) * 5) * 0.85;
      if(fade <= 0) continue;

      ctx.globalAlpha = fade;
      ctx.fillStyle = p.color || '#FFFFFF';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    /* ═══ 2) وميض البرق ═══ */
    if(G.lightningFlash > 0){
      ctx.fillStyle = `rgba(255,255,255,${G.lightningFlash * 0.5})`;
      ctx.fillRect(0, 0, W, H);
    }

    /* ═══ 3) ضباب الكوكب ═══ */
    if(G.planet && G.planet.haze){
      ctx.fillStyle = G.planet.haze;
      ctx.fillRect(0, 0, W, H);
    }

    return;   /* ← لا ضباب أرضي، لا مطر أرضي */
  }
  for(const p of G.weather){
    const life = p.life/p.maxLife;
    const fade = Math.min(1, life*3, (1-life)*5) * 0.85;
    if(fade<=0) continue;
    ctx.globalAlpha = fade;

    switch(p.type){
      case 'rain':
        ctx.strokeStyle = 'rgba(120,160,190,0.75)';
        ctx.lineWidth = p.size;
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x - p.vx*2.4, p.y - p.vy*2.4); ctx.stroke();
        break;
      case 'hail':
        ctx.fillStyle = '#E0F0FF';
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
        break;
      case 'wind':
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx*6, p.y - p.vy*6); ctx.stroke();
        break;
      case 'leaves':
        ctx.fillStyle = ['#E87030','#C86030','#A8602A','#F0A050'][Math.floor(p.phase*3)%4];
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size*1.4, p.size*0.7, Math.sin(G.t*0.05+p.phase), 0, Math.PI*2);
        ctx.fill();
        break;
      case 'ash':
        ctx.fillStyle = ['#5A5A5A','#3A3A3A','#7A7A7A'][Math.floor(p.phase*3)%3];
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
        break;
      case 'sandstorm':
        ctx.fillStyle = 'rgba(220,180,120,0.7)';
        ctx.fillRect(p.x, p.y, p.size*3, p.size);
        break;
      case 'bubbles':
        ctx.strokeStyle = 'rgba(180,230,255,0.85)';
        ctx.fillStyle = 'rgba(180,230,255,0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill(); ctx.stroke();
        break;
      case 'neon': {
        const neonCol = `hsl(${(G.t*2 + p.phase*100) % 360}, 100%, 65%)`;
        ctx.fillStyle = neonCol;
        ctx.shadowColor = neonCol; ctx.shadowBlur = 8;
        ctx.fillRect(p.x, p.y, p.size, p.size*2);
        ctx.shadowBlur = 0;
        break;
      }
      case 'starfield':
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = fade * (0.4 + Math.sin(G.t*0.05+p.phase)*0.6);
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
        break;
      case 'firefly':
        ctx.globalAlpha = fade * (0.7 + Math.sin(G.t*0.1+p.phase)*0.3);
        ctx.fillStyle = '#F5D77E';
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
        break;
      case 'ember':
        ctx.fillStyle = '#F0A880';
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
        break;
      case 'snow':
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
        break;
      case 'petal':
        ctx.fillStyle = '#F0B8C8';
        ctx.beginPath(); ctx.ellipse(p.x,p.y,p.size*1.4,p.size,Math.sin(G.t*0.05+p.phase),0,Math.PI*2); ctx.fill();
        break;
      default:
        ctx.fillStyle = '#E8D090';
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size*0.9,0,Math.PI*2); ctx.fill();
    }
  }
  ctx.globalAlpha = 1;

  const s = G.currentScene;
  if(s.fog > 0){
    const grad = ctx.createRadialGradient(W*0.3, H*0.5, 40, W*0.3, H*0.5, W*0.9);
    grad.addColorStop(0, 'rgba(200,200,200,0)');
    grad.addColorStop(1, `rgba(200,210,220,${s.fog*0.7})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);
  }

  if(G.lightningFlash > 0){
    ctx.fillStyle = `rgba(255,255,255,${G.lightningFlash * 0.7})`;
    ctx.fillRect(0,0,W,H);
  }
}

/* ============================================================
   ==================== Clouds & Stars =======================
   ============================================================ */
function initClouds(){
  clouds = [];
  for(let i=0;i<6;i++){
    clouds.push({ x: rand(0,W*1.5), y: rand(H*0.08,H*0.32), s: rand(0.7,1.4), v: rand(0.15,0.35), a: rand(0.75,0.95) });
  }
  G.cloudShadows = [];
  for(let i=0;i<3;i++){ G.cloudShadows.push({ x:rand(0,W), v:rand(0.3,0.6), w:rand(60,110) }); }
  G.stars = [];
  for(let i=0;i<70;i++){ G.stars.push({ x: rand(0,W), y: rand(0,H*0.5), s: rand(0.8,2.2), a: rand(0.3,0.9), p: rand(0,Math.PI*2) }); }
}

/* ============================================================
   ==================== SKY DECORATIONS ======================
   ============================================================ */
function initSkyDecor(){
  G.skyDecor = [];
  for(let i = 0; i < 4; i++){
    G.skyDecor.push({
      type: 'planet',
      x: rand(0, W * 1.5),
      y: rand(-200, -50),
      r: rand(18, 42),
      hue: Math.floor(rand(0, 360)),
      ringed: Math.random() < 0.4,
      speed: rand(0.05, 0.12),
      parallax: rand(0.7, 0.9)
    });
  }
  for(let i = 0; i < 6; i++){
    G.skyDecor.push({
      type: 'moon',
      x: rand(0, W * 1.5),
      y: rand(-100, 50),
      r: rand(4, 8),
      speed: rand(0.08, 0.15),
      parallax: rand(0.75, 0.95)
    });
  }
  for(let i = 0; i < 3; i++){
    G.skyDecor.push({
      type: 'comet',
      x: rand(0, W * 2),
      y: rand(-300, -100),
      len: rand(60, 120),
      speed: rand(0.2, 0.4),
      parallax: rand(0.8, 1.0),
      angle: rand(-0.4, -0.2)
    });
  }
  for(let i = 0; i < 2; i++){
    G.skyDecor.push({
      type: 'nebula',
      x: rand(0, W),
      y: rand(-250, -100),
      r: rand(100, 200),
      hue: Math.floor(rand(0, 360)),
      parallax: rand(0.5, 0.7)
    });
  }
}

/* ============================================================
   ═══════════════ SPAWN PLANET OBSTACLE v3.1 ══════════════
   ═══════════════════════════════════════════════════════════
   المنطق المُحدَّث:
   - البوابات نادرة: كل 25-40 عائق
   - حد أقصى صارم: 50 عائق بدون بوابة (حماية فقط)
   - الباقي عوائق عشوائية حسب أوزان الكوكب
   ============================================================ */

/* ═══ حالة المولّد ═══ */
let _planetSpawnState = {
  obstacleCount: 0,
  lastHoleCount: 0,
  forcedHoleInterval: 30,   /* بوابة كل 25-40 عائق */
  maxWithoutHole: 50        /* حد أقصى صارم (حماية من التعليق) */
};

function resetPlanetSpawnState(){
  _planetSpawnState.obstacleCount = 0;
  _planetSpawnState.lastHoleCount = 0;
  /* عشوائي بين 25-40 */
  _planetSpawnState.forcedHoleInterval = 25 + Math.floor(Math.random() * 16);
}

function spawnPlanetObstacle(){
  const planet = G.planet || PLANETS[0];
  const state = _planetSpawnState;

  state.obstacleCount++;

  /* ═══════════════════════════════════════════════════════
     ═══ 1) فحص إجباري: هل يجب توليد بوابة الآن؟ ═══
     ═══════════════════════════════════════════════════════ */
  const obstaclesSinceHole = state.obstacleCount - state.lastHoleCount;
  const mustSpawnHole =
    obstaclesSinceHole >= state.forcedHoleInterval ||
    obstaclesSinceHole >= state.maxWithoutHole;

  if(mustSpawnHole){
    /* اختيار نوع البوابة */
    const isLastPlanet = (G.planetIdx >= PLANETS.length - 1);
    const returnChance = isLastPlanet ? 1.0 : 0.3;
    const isReturnPortal = Math.random() < returnChance;

    spawnPlanetPortalHole(isReturnPortal);

    state.lastHoleCount = state.obstacleCount;
    /* جدول جديد: 25-40 عائق للبوابة التالية */
    state.forcedHoleInterval = 25 + Math.floor(Math.random() * 16);

    /* مكافأة تشجيعية قرب البوابة */
    if(Math.random() < 0.6){
      spawnPlanetPortalReward(planet);
    }
    return;
  }

  /* ═══════════════════════════════════════════════════════
     ═══ 2) عائق عشوائي حسب أوزان الكوكب ═══
     ═══════════════════════════════════════════════════════ */
  const hazard = pickPlanetHazard(planet);

  switch(hazard){
    case 'crater':      spawnPlanetCrater(planet);      break;
    case 'rock':        spawnPlanetRock(planet);        break;
    case 'meteor':      spawnPlanetMeteor(planet);      break;
    case 'lava':        spawnPlanetLavaPool(planet);    break;
    case 'acidRain':    spawnPlanetAcidRain(planet);    break;
    case 'geyser':      spawnPlanetGeyser(planet);      break;
    case 'dustDevil':   spawnPlanetDustDevil(planet);   break;
    case 'canyon':      spawnPlanetCanyon(planet);      break;
    case 'storm':       spawnPlanetStorm(planet);       break;
    case 'lightning':   spawnPlanetLightning(planet);   break;
    case 'gasCloud':    spawnPlanetGasCloud(planet);    break;
    case 'turbulence':  spawnPlanetTurbulence(planet);  break;
    case 'ringDebris':  spawnPlanetRingDebris(planet);  break;
    case 'iceChunk':    spawnPlanetIceChunk(planet);    break;
    case 'windShear':   spawnPlanetWindShear(planet);   break;
    case 'crystal':     spawnPlanetCrystal(planet);     break;
    case 'iceSpike':    spawnPlanetIceSpike(planet);    break;
    case 'windBlast':   spawnPlanetWindBlast(planet);   break;
    case 'frost':       spawnPlanetFrost(planet);       break;
    case 'megaStorm':   spawnPlanetMegaStorm(planet);   break;
    case 'void':        spawnPlanetVoid(planet);        break;
    default:            spawnPlanetRock(planet);        break;
  }
}


/* ============================================================
   ═══════════ SPAWN PORTAL HOLE (البوابة) ════════════════
   ═══════════════════════════════════════════════════════════ */
function spawnPlanetPortalHole(isReturn){
  const w = isReturn ? 170 : rand(140, 200);

  G.planetFloors.push({
    x: W + rand(300, 700),
    w,
    y: GROUND_Y,
    h: 400,
    type: isReturn ? 'planetReturnHole' : 'planetNextHole',
    isPlanetHole: true,
    isPlanetReturn: isReturn,
    isPlanetNext: !isReturn,
    t: 0, passed: false, dead: false
  });

  /* ✅ مؤشر بصري في الأعلى لتنبيه اللاعب */
  const indicatorColor = isReturn ? '#40E8FF' : '#FFD060';
  particles.push({
    x: W + 300 + w / 2,
    y: 60,
    vx: 0, vy: 0,
    life: 2.5, decay: 0.005,
    color: indicatorColor,
    size: 8,
    isPortalIndicator: true,
    indicatorText: isReturn ? '☁ RETURN' : '▶ NEXT PLANET'
  });
}


/* ============================================================
   ═══════════ SPAWN PORTAL REWARD (مكافأة قرب البوابة) ═══
   ═══════════════════════════════════════════════════════════ */
function spawnPlanetPortalReward(planet){
  const rewardX = W + 200;   /* قبل البوابة بقليل */

  /* اختيار نوع المكافأة */
  const roll = Math.random();

  if(roll < 0.4){
    /* كتلة عملات على شكل قوس */
    const count = 4 + Math.floor(Math.random() * 3);
    for(let i = 0; i < count; i++){
      const t = i / (count - 1);
      coins.push({
        x: rewardX + i * 35,
        y: GROUND_Y - 120 - Math.sin(t * Math.PI) * 50,
        r: 10,
        t: 0, dead: false,
        isSkyCoin: true
      });
    }
  }
  else if(roll < 0.7){
    /* كرة طاقة قيمتها عالية */
    orbs.push({
      x: rewardX + 80,
      y: GROUND_Y - 150,
      r: 16, t: 0, dead: false,
      color: '#FFD700',
      isSkyOrb: true,
      value: (planet.orbValueBonus || 0) + 15
    });
  }
  else {
    /* تعزيز */
    const pu = makePowerup(rewardX + 60, GROUND_Y - 140, {
      r: 16,
      isSkyReward: true
    });
    if(pu) powerups.push(pu);
  }
}


/* ============================================================
   ═══════════ RESET عند دخول كوكب جديد ════════════════════
   ═══════════════════════════════════════════════════════════
   ⚠️ استدعِ هذه الدالة داخل enterPlanetRealm()
   ============================================================ */
/* في enterPlanetRealm()، بعد السطر:
     G.planetFloors = [];
   أضف:
     resetPlanetSpawnState();
*/

/* ════════════════ العوائق الفردية ════════════════ */

/* ═══ فوهة (Mercury) ═══ */
function spawnPlanetCrater(planet){
  const w = rand(100, 160);
  G.planetFloors.push({
    x: W + rand(300, 700),
    w,
    y: GROUND_Y,
    h: 400,
    type: 'planetHole',
    isPlanetHole: true,
    t: 0, passed: false, dead: false
  });

  /* مكافأة داخل الفوهة */
  if(Math.random() < 0.4){
    coins.push({
      x: W + 400 + w / 2, y: GROUND_Y - 150,
      r: 10, t: 0, dead: false,
      isSkyCoin: true
    });
  }
}

/* ═══ صخرة (Mercury / Mars) ═══ */
function spawnPlanetRock(planet){
  const w = rand(50, 100);
  const h = rand(60, 140);
  obstacles.push({
    x: W + 40, w, h,
    type: 'block',
    isWalk: true,
    color: planet.ground,
    colorDark: planet.groundDark,
    accent: planet.accent,
    isPlanetRock: true,
    t: 0, passed: false, dead: false
  });

  /* منصة صغيرة للقفز */
  if(Math.random() < 0.4){
    obstacles.push({
      x: W + 40, w: rand(80, 120), h: 12,
      y: GROUND_Y - h - 40,
      type: 'platform',
      isWalk: true, isPlatform: true,
      platformType: 'static',
      baseY: GROUND_Y - h - 40,
      baseX: W + 40,
      amp: 0, phase: 0,
      color: planet.groundTop,
      colorDark: planet.ground,
      accent: planet.accent,
      glow: planet.accent,
      t: 0, passed: false, dead: false,
      solid: false,
      crumbleTimer: 0, crumbled: false,
      bounceBoost: 0
    });
  }
}

/* ═══ نيزك (Mercury) ═══ */
function spawnPlanetMeteor(planet){
  const w = 40, h = 40;
  obstacles.push({
    x: W + rand(200, 600),
    y: -50,
    w, h,
    type: 'meteor',
    isWalk: true,
    isFallingRock: true,
    isPlanetMeteor: true,
    baseY: -50,
    targetY: GROUND_Y - h,
    falling: false,
    warned: false,
    landed: false,
    triggerDistance: rand(180, 260),
    color: '#8A4838',
    colorDark: '#4A2018',
    accent: planet.accent,
    t: 0, passed: false, dead: false
  });
}

/* ═══ بحيرة حمم (Venus) ═══ */
function spawnPlanetLavaPool(planet){
  const w = rand(140, 220);
  obstacles.push({
    x: W + 40,
    y: GROUND_Y - 12,
    w, h: 12,
    type: 'lavaPool',
    isWalk: true,
    isLavaPool: true,
    isPlanetLava: true,
    poolColor: '#FF5020',
    poolGlow: '#FFD060',
    color: '#FF5020',
    colorDark: planet.groundDark,
    accent: '#FFD060',
    t: 0, passed: false, dead: false
  });

  /* مكافأة فوق الحمم */
  if(Math.random() < 0.5){
    coins.push({
      x: W + 40 + w / 2, y: GROUND_Y - 100,
      r: 10, t: 0, dead: false,
      isSkyCoin: true
    });
  }
}

/* ═══ مطر حمضي (Venus) ═══ */
function spawnPlanetAcidRain(planet){
  /* مطر حمضي كعائق قتالي — يتساقط بكثافة */
  for(let i = 0; i < 8; i++){
    obstacles.push({
      x: W + 40 + i * 35,
      y: -60 - i * 20,
      w: 4, h: 30,
      type: 'acidDrop',
      isWalk: true,
      isUnderSpike: true,
      isAcidDrop: true,
      color: '#E8FF80',
      colorDark: '#A0B040',
      accent: '#FFFF80',
      t: 0, passed: false, dead: false
    });
  }
}

/* ═══ ينبوع (Venus) ═══ */
function spawnPlanetGeyser(planet){
  const w = 50;
  obstacles.push({
    x: W + 40,
    y: GROUND_Y - 60,
    w, h: 60,
    type: 'geyser',
    isWalk: true,
    isPiston: true,
    isPlanetGeyser: true,
    isTop: false,
    cycle: rand(0, 90),
    period: 90,
    extendDist: rand(80, 130),
    extend: 0,
    color: planet.ground,
    colorDark: planet.groundDark,
    accent: '#FF5020',
    t: 0, passed: false, dead: false
  });
}

/* ═══ إعصار غباري (Mars) ═══ */
function spawnPlanetDustDevil(planet){
  const w = 60, h = 120;
  obstacles.push({
    x: W + 40,
    y: GROUND_Y - h,
    w, h,
    type: 'dustDevil',
    isWalk: true,
    isSaw: true,
    isPlanetDustDevil: true,
    cx: W + 40 + w / 2,
    cy: GROUND_Y - h / 2,
    r: w / 2,
    angle: 0,
    angleSpd: 0.08,
    movingY: true,
    amp: 60,
    phase: rand(0, Math.PI * 2),
    color: '#A07040',
    colorDark: '#5A3818',
    accent: planet.accent,
    t: 0, passed: false, dead: false
  });
}

/* ═══ وادي (Mars) ═══ */
function spawnPlanetCanyon(planet){
  /* وادي عميق مع منصة عبور */
  const w = rand(150, 220);
  obstacles.push({
    x: W + 40, w, h: 400,
    y: GROUND_Y,
    type: 'canyon',
    isWalk: false,
    isCanyon: true,
    t: 0, passed: false, dead: false
  });

  /* منصة عبور */
  obstacles.push({
    x: W + 40 + w / 2 - 60,
    w: 120, h: 12,
    y: GROUND_Y - 90,
    type: 'platform',
    isWalk: true, isPlatform: true,
    isCanyonBridge: true,
    platformType: 'static',
    baseY: GROUND_Y - 90,
    baseX: W + 40 + w / 2 - 60,
    amp: 0, phase: 0,
    color: '#C86A40',
    colorDark: planet.groundDark,
    accent: planet.accent,
    glow: planet.accent,
    t: 0, passed: false, dead: false,
    solid: false,
    crumbleTimer: 0, crumbled: false,
    bounceBoost: 0
  });
}

/* ═══ عاصفة (Jupiter) ═══ */
function spawnPlanetStorm(planet){
  const w = 100, h = 100;
  obstacles.push({
    x: W + 40,
    y: GROUND_Y - rand(200, 300),
    w, h,
    type: 'storm',
    isWalk: true,
    isVortex: true,
    isPlanetStorm: true,
    cx: W + 40 + w / 2,
    cy: GROUND_Y - rand(200, 300) + h / 2,
    r: w / 2,
    pullForce: 0.7,
    angle: 0,
    color: '#D04030',
    colorDark: '#802010',
    accent: planet.accent,
    t: 0, passed: false, dead: false
  });
}

/* ═══ برق (Jupiter / Neptune) ═══ */
function spawnPlanetLightning(planet){
  /* صاعقة رأسية */
  const x = W + rand(200, 600);
  const topH = rand(200, 300);

  obstacles.push({
    x,
    y: 0,
    w: 4,
    h: topH,
    type: 'lightning',
    isWalk: true,
    isLaser: true,
    isPlanetLightning: true,
    isVertical: true,
    segments: [{ y: 0, h: topH }],
    pulse: 0,
    color: '#FFE060',
    accent: '#FFFFFF',
    t: 0, passed: false, dead: false
  });
}

/* ═══ سحابة غازية (Jupiter) ═══ */
function spawnPlanetGasCloud(planet){
  const count = rand(3, 6);
  for(let i = 0; i < count; i++){
    obstacles.push({
      x: W + 40 + i * rand(60, 100),
      y: rand(100, H * 0.6),
      w: rand(60, 100),
      h: rand(60, 100),
      type: 'gasCloud',
      isWalk: false,
      isPlanetCloud: true,
      radius: rand(40, 60),
      color: '#E8B890',
      colorDark: '#A07850',
      accent: planet.accent,
      t: 0, passed: false, dead: false
    });
  }
}

/* ═══ اضطراب جوي (Jupiter) ═══ */
function spawnPlanetTurbulence(planet){
  /* تأثير قوى دفع عشوائي */
  const w = rand(80, 140);
  obstacles.push({
    x: W + 40,
    y: GROUND_Y - rand(200, 350),
    w, h: 80,
    type: 'turbulence',
    isWalk: false,
    isTurbulence: true,
    pushForce: rand(8, 14),
    color: 'rgba(255,240,200,0.15)',
    accent: planet.accent,
    t: 0, passed: false, dead: false
  });
}

/* ═══ حطام الحلقات (Saturn) ═══ */
function spawnPlanetRingDebris(planet){
  const count = rand(3, 6);
  for(let i = 0; i < count; i++){
    obstacles.push({
      x: W + 40 + i * 60,
      y: rand(60, GROUND_Y - 100),
      w: rand(20, 40),
      h: rand(20, 40),
      type: 'ringDebris',
      isWalk: true,
      isSaw: true,
      isPlanetDebris: true,
      cx: W + 40 + i * 60 + 15,
      cy: rand(60, GROUND_Y - 100) + 15,
      r: rand(15, 25),
      angle: rand(0, Math.PI * 2),
      angleSpd: rand(-0.06, 0.06),
      movingY: true,
      amp: rand(30, 60),
      phase: rand(0, Math.PI * 2),
      color: '#E8C890',
      colorDark: '#A07840',
      accent: '#FFF0C0',
      t: 0, passed: false, dead: false
    });
  }
}

/* ═══ كتلة جليدية (Saturn / Uranus / Neptune) ═══ */
function spawnPlanetIceChunk(planet){
  const w = rand(50, 90);
  const h = rand(50, 100);
  obstacles.push({
    x: W + 40,
    w, h,
    type: 'block',
    isWalk: true,
    isPlanetIce: true,
    y: GROUND_Y - h - rand(40, 150),
    color: '#A0E0F8',
    colorDark: '#4080B0',
    accent: '#E0F8FF',
    t: 0, passed: false, dead: false
  });
}

/* ═══ قص الرياح (Saturn) ═══ */
function spawnPlanetWindShear(planet){
  const w = rand(100, 180);
  obstacles.push({
    x: W + 40,
    y: GROUND_Y - rand(120, 250),
    w, h: 40,
    type: 'windShear',
    isWalk: true,
    isRotBar: true,
    isPlanetWind: true,
    cx: W + 40 + w / 2,
    cy: GROUND_Y - rand(120, 250) + 20,
    length: w,
    thickness: 8,
    angle: 0,
    angleSpd: rand(-0.02, 0.02),
    warmupTimer: 30,
    color: 'rgba(255,240,200,0.7)',
    colorDark: planet.groundDark,
    accent: planet.accent,
    t: 0, passed: false, dead: false
  });
}

/* ═══ بلورة (Saturn / Uranus) ═══ */
function spawnPlanetCrystal(planet){
  const r = rand(25, 40);
  obstacles.push({
    x: W + 40 - r,
    y: GROUND_Y - rand(150, 300) - r,
    w: r * 2, h: r * 2,
    type: 'crystal',
    isWalk: true,
    isCrystal: true,
    isPlanetCrystal: true,
    cx: W + 40,
    cy: GROUND_Y - rand(150, 300),
    r,
    color: planet.id === 'uranus' ? '#80FFFF' : '#E0D0FF',
    colorDark: planet.groundDark,
    accent: '#FFFFFF',
    glow: planet.accent,
    t: 0, passed: false, dead: false
  });

  /* بلورة تعطي مكافأة عند اللمس */
  if(Math.random() < 0.4){
    orbs.push({
      x: W + 40, y: GROUND_Y - 250,
      r: 14, t: 0, dead: false,
      color: '#FFD700',
      isSkyOrb: true,
      value: planet.orbValueBonus + 10
    });
  }
}

/* ═══ شوكة جليدية (Uranus / Neptune) ═══ */
function spawnPlanetIceSpike(planet){
  const count = rand(2, 5);
  const spacing = 45;
  for(let i = 0; i < count; i++){
    obstacles.push({
      x: W + 40 + i * spacing,
      y: GROUND_Y - 50,
      w: 28, h: 50,
      type: 'iceSpike',
      isWalk: true,
      isUnderSpike: true,
      isPlanetIceSpike: true,
      color: '#C0E8F8',
      colorDark: '#5090B8',
      accent: '#FFFFFF',
      t: 0, passed: false, dead: false
    });
  }
}

/* ═══ انفجار رياح (Uranus / Neptune) ═══ */
function spawnPlanetWindBlast(planet){
  /* منطقة تدفع اللاعب للخلف */
  obstacles.push({
    x: W + 40,
    y: GROUND_Y - 200,
    w: 100, h: 300,
    type: 'windBlast',
    isWalk: false,
    isWindBlast: true,
    pushBack: rand(0.8, 1.5),
    color: 'rgba(128,192,255,0.15)',
    accent: planet.accent,
    t: 0, passed: false, dead: false
  });
}

/* ═══ صقيع (Uranus) ═══ */
function spawnPlanetFrost(planet){
  /* طبقة جليدية تُبطئ اللاعب */
  obstacles.push({
    x: W + 40, w: rand(180, 260), h: 4,
    y: GROUND_Y - 4,
    type: 'frost',
    isWalk: true,
    isFrost: true,
    color: '#C0E8FF',
    colorDark: '#5090B8',
    accent: '#FFFFFF',
    t: 0, passed: false, dead: false
  });
}

/* ═══ عاصفة عملاقة (Neptune) ═══ */
function spawnPlanetMegaStorm(planet){
  const w = 140;
  obstacles.push({
    x: W + 40,
    y: GROUND_Y - 250,
    w, h: 140,
    type: 'megaStorm',
    isWalk: true,
    isVortex: true,
    isPlanetMegaStorm: true,
    cx: W + 40 + w / 2,
    cy: GROUND_Y - 250 + 70,
    r: w / 2,
    pullForce: 1.0,
    angle: 0,
    color: '#3050A0',
    colorDark: '#102040',
    accent: '#80C0FF',
    t: 0, passed: false, dead: false
  });
}

/* ═══ فجوة فراغ (Neptune) ═══ */
function spawnPlanetVoid(planet){
  const w = 120;
  G.planetFloors.push({
    x: W + rand(300, 700),
    w,
    y: GROUND_Y,
    h: 400,
    type: 'planetHole',
    isPlanetHole: true,
    isVoidHole: true,
    t: 0, passed: false, dead: false
  });
}

/* ============================================================
   ==================== Spawning =============================
   ============================================================ */
function spawnCoinCluster(cx, cy, count){
  count = count || Math.floor(WR(3,6));          // ← تم الاستبدال
  const spacing = 22;
  for(let i=0;i<count;i++){
    const t = i/(count-1) - 0.5;
    coins.push({ x: cx + i*spacing, y: cy + Math.sin(t*Math.PI)*12 - 6, r: 8, t:0, dead:false });
  }
}

function spawnObstacle(){
  /* ═══ ASCEND له مولّد خاص ═══ */
  if(G.mode === 'ASCEND') return;

  if(G.mode !== 'WALK'){
    spawnTunnelObstacle();
    return;
  }

    if(G.realm === REALM.PLANET){
    spawnPlanetObstacle();
    return;
  }

  /* ═══ حسب العالم الحالي ═══ */
  if(G.realm === REALM.SKY){
    spawnSkyRealmObstacle();
    return;
  }
  if(G.realm === REALM.UNDERGROUND){
    spawnUnderRealmObstacle();
    return;
  }

  /* الأرض العادية */
  spawnWalkObstacle();
}

function spawnTunnelObstacle(){
  const prog = getProgression();
  const s = G.currentScene;
  const gap = prog.gap;
  const margin = 76;
  const minY = margin + gap/2;
  const maxY = GROUND_Y - margin - gap/2;
  const gapY = WR(minY, Math.max(minY,maxY));        // ✅

  obstacles.push({x: W+50, w: 60, gapY, gap, baseGapY: gapY, phase: WR(0,Math.PI*2),
    amp: WR(18,42) * prog.wobble, t:0, passed:false, dead:false, isWalk:false,   // ✅
    color: s.wall, colorDark: s.wallDark, accent: s.accent });

  const cy = gapY + WR(-gap*0.22, gap*0.22);          // ✅
  const r = Math.random();                            // ❌ اتركها كما هي
  if(r < 0.06){ spawnPowerup(W+50+30, gapY); }
  else if(r < 0.20){ orbs.push({ x:W+50+30, y:gapY, r:10, t:0, dead:false, color:s.accent }); }
  else if(r < 0.90){ spawnCoinCluster(W+50+30, cy); }
}

/* ═══════════════════════════════════════════════════════
   ============ ASCEND BIOMES (العوالم البيئية) ============
   ═══════════════════════════════════════════════════════ */
const ASCEND_BIOMES = [
  {
    id: 'earth', name: 'EARTH', ar: 'الأرض', icon: '🌍',
    from: 0, to: 500,
    skyTop: '#87CEEB', skyBot: '#FFE4B5',
    fog: 'rgba(200,180,140,0.08)',
    accent: '#8B6914',
    palette: [
      { body:'#8B6914', top:'#6B9B37', edge:'#4A6B1E' },
      { body:'#6B4E2A', top:'#7B5E3A', edge:'#4A3420' },
      { body:'#888888', top:'#AAAAAA', edge:'#555555' }
    ],
    weather: 'petal', weatherRate: 0.25,
    gravity: 1.0
  },
  {
    id: 'forest', name: 'FOREST', ar: 'الغابة', icon: '🌲',
    from: 500, to: 1500,
    skyTop: '#2D5016', skyBot: '#7CB342',
    fog: 'rgba(40,80,30,0.15)',
    accent: '#6BBF4C',
    palette: [
      { body:'#5D4037', top:'#6BBF4C', edge:'#3E2723' },
      { body:'#4E342E', top:'#81C784', edge:'#2E1E1A' },
      { body:'#3E2723', top:'#A5D6A7', edge:'#1B100D' }
    ],
    weather: 'leaves', weatherRate: 0.5,
    gravity: 1.0
  },
  {
    id: 'clouds', name: 'CLOUD KINGDOM', ar: 'مملكة السحاب', icon: '☁️',
    from: 1500, to: 3000,
    skyTop: '#7EC8E3', skyBot: '#E0F7FF',
    fog: 'rgba(220,240,255,0.2)',
    accent: '#FFFFFF',
    palette: [
      { body:'#E8F4FF', top:'#FFFFFF', edge:'#A8C8E8' },
      { body:'#D0E8F8', top:'#F0F8FF', edge:'#88A8C8' },
      { body:'#B8DCF0', top:'#E0F0FF', edge:'#6890B0' }
    ],
    weather: 'snow', weatherRate: 0.4,
    gravity: 0.95
  },
  {
    id: 'storm', name: 'STORM', ar: 'العاصفة', icon: '⚡',
    from: 3000, to: 5000,
    skyTop: '#2A2A40', skyBot: '#5A5A70',
    fog: 'rgba(60,60,90,0.25)',
    accent: '#FFE060',
    palette: [
      { body:'#5A6878', top:'#909AA8', edge:'#2A3038' },
      { body:'#4A5568', top:'#7A8598', edge:'#202530' },
      { body:'#3A4048', top:'#5A6068', edge:'#1A1E22' }
    ],
    weather: 'rain', weatherRate: 1.0,
    gravity: 1.05,
    lightning: true,
    wind: 0.4
  },
  {
    id: 'aurora', name: 'AURORA', ar: 'الشفق القطبي', icon: '❄️',
    from: 5000, to: 8000,
    skyTop: '#0F1430', skyBot: '#6A48A8',
    fog: 'rgba(150,120,220,0.15)',
    accent: '#E0D0FF',
    palette: [
      { body:'#5A3A9A', top:'#C080FF', edge:'#2A1850' },
      { body:'#4A2A80', top:'#A060E0', edge:'#200A40' },
      { body:'#3A1868', top:'#8040C0', edge:'#180430' }
    ],
    weather: 'sparkle', weatherRate: 0.6,
    gravity: 0.92
  },
  {
    id: 'space', name: 'SPACE', ar: 'الفضاء', icon: '💫',
    from: 8000, to: 12000,
    skyTop: '#000000', skyBot: '#1A0838',
    fog: 'rgba(80,40,160,0.08)',
    accent: '#C080FF',
    palette: [
      { body:'#4A4048', top:'#8A8088', edge:'#1A1518' },
      { body:'#3A3038', top:'#6A6068', edge:'#100A10' },
      { body:'#5A5058', top:'#AAA0A8', edge:'#2A2028' }
    ],
    weather: 'starfield', weatherRate: 0.5,
    gravity: 0.85
  },
  {
    id: 'cosmos', name: 'COSMOS', ar: 'الكون', icon: '🌌',
    from: 12000, to: 99999,
    skyTop: '#000000', skyBot: '#0A0420',
    fog: 'rgba(100,60,180,0.1)',
    accent: '#FFD060',
    palette: [
      { body:'#6A40D0', top:'#C080FF', edge:'#200860' },
      { body:'#4A20A0', top:'#A060E0', edge:'#150440' },
      { body:'#3A1880', top:'#8040C0', edge:'#0A0220' }
    ],
    weather: 'starfield', weatherRate: 0.7,
    gravity: 0.8
  }
];

function getAscendBiome(altitudeMeters){
  for(let i = ASCEND_BIOMES.length - 1; i >= 0; i--){
    if(altitudeMeters >= ASCEND_BIOMES[i].from) return ASCEND_BIOMES[i];
  }
  return ASCEND_BIOMES[0];
}

function getAscendBiomeIndex(altitudeMeters){
  for(let i = ASCEND_BIOMES.length - 1; i >= 0; i--){
    if(altitudeMeters >= ASCEND_BIOMES[i].from) return i;
  }
  return 0;
}

/* ============================================================
   ==================== ASCEND BARRIER =======================
   ============================================================ */
function spawnAscendBarrier(){
  const barrierH = 220;          /* كان 260 */
  const gapH = 150;              /* كان 130 */
  const gapLocalY = rand(30, barrierH - gapH - 30);
  const s = G.currentScene;

  obstacles.push({
    y: -barrierH,
    h: barrierH,
    x: 0, w: W,
    gapLocalY,
    gap: gapH,
    type: 'ascendBarrier',
    isAscend: true,
    isWalk: true,                /* ✅ الإصلاح: كان false */
    t: 0, passed: false, dead: false,
    color: s.wall,
    colorDark: s.wallDark,
    accent: s.accent
  });

  /* ═══ مكافأة داخل الفتحة (تشجيع المخاطرة) ═══ */
  if(Math.random() < 0.45){
    const rx = rand(70, W - 70);
    const ry = -barrierH + gapLocalY + gapH / 2;

    if(Math.random() < 0.55){
      const cc = 2 + Math.floor(Math.random() * 3);
      for(let i = 0; i < cc; i++){
        coins.push({
          x: rx, y: ry + (i - cc/2) * 26,
          r: 8, t: 0, dead: false
        });
      }
    } else if(Math.random() < 0.85){
      orbs.push({
        x: rx, y: ry, r: 12,
        t: 0, dead: false, color: s.accent
      });
    } else {
      const pu = makePowerup(rx, ry);
      if(pu) powerups.push(pu);
    }
  }
}

/* ============================================================
   ==================== SKY BRIDGE SYSTEM ====================
   ============================================================ */

/* ① المدرج الطويل — منصة واحدة عريضة جداً للجري عليها */
function spawnSkyRunway(){
  const m = getMeters();
  /* العرض ينمو مع المسافة: 380 بكسل → 900 بكسل */
  const w = 380 + Math.min(520, m * 0.06);
  const y = GROUND_Y - rand(110, 180);

  obstacles.push({
    x: W + 40, w, h: 14,
    type: 'platform',
    isWalk: true, isPlatform: true,
    isSkyBridge: true,
    isRunway: true,
    platformType: 'static',
    y, baseY: y, baseX: W + 40,
    amp: 0, phase: 0,
    color: '#80C0E8', colorDark: '#4080B0', accent: '#C0E0FF', glow: '#80D0FF',
    t: 0, passed: false, dead: false,
    solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
  });

  /* خط طويل من العملات */
  const coinCount = Math.floor(w / 42);
  for(let i = 0; i < coinCount; i++){
    coins.push({
      x: W + 70 + i * 42,
      y: y - 25,
      r: 8, t: 0, dead: false
    });
  }

  /* كرة طاقة في النهاية */
  orbs.push({
    x: W + 40 + w - 30, y: y - 32,
    r: 14, t: 0, dead: false,
    color: '#FFD700', isSkyOrb: true, value: 12
  });

  /* تعزيز في المنتصف أحياناً */
  if(Math.random() < 0.35){
    spawnPowerup(W + 40 + w/2, y - 55);
  }
}

/* ② سلسلة جسور — طوابق متراصة عمودياً للصعود */
function spawnSkyBridgeChain(){
  const m = getMeters();

  /* ─────── عدد الطوابق المسموح حسب المسافة ─────── */
  let maxFloor = 2;
  if(m >= 500)  maxFloor = 3;
  if(m >= 1000) maxFloor = 4;
  if(m >= 2000) maxFloor = 5;
  if(m >= 3500) maxFloor = 6;
  if(m >= 6000) maxFloor = 7;
  if(m >= 10000) maxFloor = 8;   /* ← يصل للسماء (900px) */

  const floorCount = 2 + Math.floor(Math.random() * (maxFloor - 1));

  /* ─────── المسافات ─────── */
  const baseY      = GROUND_Y - rand(120, 160);
  const floorGap   = rand(100, 125);       /* فرق Y بين كل طابق */
  const speedScale = getSpeedScale();
  const spacingX   = 150 * speedScale;     /* فرق X بين الطوابق */

  for(let f = 0; f < floorCount; f++){
    const y = baseY - f * floorGap;
    const w = rand(180, 260) + Math.min(140, f * 20);

    obstacles.push({
      x: W + 40 + f * spacingX,
      w, h: 14,
      type: 'platform',
      isWalk: true, isPlatform: true,
      isSkyBridge: true,
      floorIndex: f,
      totalFloors: floorCount,
      platformType: 'static',
      y, baseY: y, baseX: W + 40 + f * spacingX,
      amp: 0, phase: 0,
      color: '#A0D0F0', colorDark: '#5080B0', accent: '#E0F4FF', glow: '#80D0FF',
      t: 0, passed: false, dead: false,
      solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
    });

    /* مكافآت على كل طابق */
    spawnCoinCluster(W + 40 + f * spacingX + w/2, y - 25, 4 + Math.min(4, f));

    /* الطابق الأخير: كرة طاقة + تعزيز محتمل */
    if(f === floorCount - 1){
      orbs.push({
        x: W + 40 + f * spacingX + w/2, y: y - 40,
        r: 16, t: 0, dead: false,
        color: '#FFD700', isSkyOrb: true, value: 20
      });

      if(Math.random() < 0.5){
        spawnPowerup(W + 40 + f * spacingX + w/2, y - 70);
      }
    }
  }

  showBanner('↑ SKY BRIDGE', floorCount + ' طوابق');
  Sfx.play(660, 0.3, 'sine', 0.04, 990);
}

/* ③ مدينة السماء — جزر متعددة بنفس المستوى */
function spawnSkyCity(){
  const m = getMeters();
  const baseY = GROUND_Y - rand(220, 320);
  const speedScale = getSpeedScale();
  const blockCount = 2 + Math.floor(Math.random() * 3);
  const spacingX = 140 * speedScale;

  for(let i = 0; i < blockCount; i++){
    const w = rand(200, 320);
    const yJitter = i === 0 ? 0 : rand(-30, 30);
    const y = baseY + yJitter;

    obstacles.push({
      x: W + 40 + i * spacingX,
      w, h: 14,
      type: 'platform',
      isWalk: true, isPlatform: true,
      isSkyBridge: true,
      isCityBlock: true,
      platformType: 'static',
      y, baseY: y, baseX: W + 40 + i * spacingX,
      amp: 0, phase: 0,
      color: '#C090E8', colorDark: '#6040A8', accent: '#E8D0FF', glow: '#D080FF',
      t: 0, passed: false, dead: false,
      solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
    });

    spawnCoinCluster(W + 40 + i * spacingX + w/2, y - 25, 5);

    /* تعزيز على الجزيرة الوسطى أحياناً */
    if(i === Math.floor(blockCount/2) && Math.random() < 0.4){
      spawnPowerup(W + 40 + i * spacingX + w/2, y - 55);
    }
  }

  /* مكافأة كبرى على الحافة الأخيرة */
  if(Math.random() < 0.6){
    const lastX = W + 40 + (blockCount - 1) * spacingX;
    orbs.push({
      x: lastX + 160, y: baseY - 40,
      r: 18, t: 0, dead: false,
      color: '#FFD700', isSkyOrb: true, value: 25
    });
  }

  showBanner('☁ SKY CITY', 'مدينة السماء');
}

function spawnWalkObstacle(){
  const prog = getProgression();
  const s = G.currentScene;
  const m = getMeters();
  const roll = Math.random();

  /* ═══ حفر دورية (للدخول للأعماق) ═══ */
  if(G.realm === REALM.GROUND && m >= G.nextHoleMeters){
    G.nextHoleMeters = m + rand(400, 800);
    spawnGroundHole();
    return;
  }

  /* ═══════════════════════════════════════════════════
     ═══ 1) الجسور السماوية — الأولوية من 200م ═══
     ═══════════════════════════════════════════════════ */
  if(m >= 200 && G.realm === REALM.GROUND){
    let bridgeChance = 0.15;
    if(m >= 500)  bridgeChance = 0.22;
    if(m >= 1200) bridgeChance = 0.30;
    if(m >= 2500) bridgeChance = 0.38;
    if(m >= 5000) bridgeChance = 0.45;

    if(roll < bridgeChance){
      const subRoll = Math.random();

      if(subRoll < 0.40)      spawnSkyRunway();       /* مدرج طويل */
      else if(subRoll < 0.80) spawnSkyBridgeChain();  /* سلسلة طوابق */
      else                    spawnSkyCity();         /* مدينة سماء */

      /* مسافة إضافية بعد كل مجموعة جسور */
      G.spawnCdMul = 1.8 + Math.random() * 0.6;
      return;
    }
  }

  /* ═══════════════════════════════════════════════════
     ═══ 2) المشهد الأرضي العادي ═══
     ═══════════════════════════════════════════════════ */

  if(m < 200){
    if(roll < 0.35)      spawnGroundObstacle(prog, s);
    else if(roll < 0.55) spawnPlatform(prog, s);
    else if(roll < 0.72) spawnSpring(prog, s);
    else if(roll < 0.85) spawnPlatformChain(prog, s);
    else if(roll < 0.95) spawnSkyElevator(prog, s);
    else                 spawnStaircase(prog, s);
    return;
  }

  if(m < 800){
    if(roll < 0.15)      spawnGroundObstacle(prog, s);
    else if(roll < 0.28) spawnPlatform(prog, s);
    else if(roll < 0.36) spawnPlatformChain(prog, s);
    else if(roll < 0.44) spawnSpring(prog, s);
    else if(roll < 0.50) spawnSaw(prog, s);
    else if(roll < 0.56) spawnPiston(prog, s);
    else if(roll < 0.62) spawnFallingSpike(prog, s);
    else if(roll < 0.66) spawnRotatingBar(prog, s);
    else if(roll < 0.76) spawnStaircase(prog, s);
    else if(roll < 0.84) spawnSkyPlatform(prog, s);
    else if(roll < 0.90) spawnSkyElevator(prog, s);
    else if(roll < 0.95) spawnLaserFence(prog, s);
    else                 spawnVortex(prog, s);
    return;
  }

  /* ═══ مسافات متقدمة — عقبات أقل، جسور أكثر ═══ */
  if(roll < 0.08)      spawnGroundObstacle(prog, s);
  else if(roll < 0.14) spawnPlatform(prog, s);
  else if(roll < 0.20) spawnPlatformChain(prog, s);
  else if(roll < 0.26) spawnSpring(prog, s);
  else if(roll < 0.32) spawnSaw(prog, s);
  else if(roll < 0.37) spawnPiston(prog, s);
  else if(roll < 0.42) spawnFallingSpike(prog, s);
  else if(roll < 0.45) spawnRotatingBar(prog, s);
  else if(roll < 0.50) spawnSkyPlatform(prog, s);
  else if(roll < 0.62) spawnStaircase(prog, s);
  else if(roll < 0.72) spawnLaserFence(prog, s);
  else if(roll < 0.80) spawnSkyElevator(prog, s);
  else if(roll < 0.88) spawnVortex(prog, s);
  else                 spawnSkyElevatorChain(prog, s);
}

function spawnGroundObstacle(prog, s){
  const types = ['block'];
  if(prog.hasSpike) types.push('spike');
  if(prog.hasTall)  types.push('tall');
  const type = types[Math.floor(Math.random() * types.length)];

  let w, h;
  if(type === 'block'){ w = WR(40,54); h = WR(32, 50 + prog.eased*10); }
  else if(type === 'spike'){ w = WR(36,52); h = WR(34, 50 + prog.eased*8); }
  else { w = WR(26,34); h = WR(60, 78 + prog.eased*14); }

  obstacles.push({
    x:W+40, w, h, type,
    t:0, passed:false, dead:false, isWalk:true,
    color:s.wall, colorDark:s.wallDark, accent:s.accent
  });

  const oy = GROUND_Y - h - WR(40,90);
  maybeReward(W+40+w/2, oy, s);
}

function spawnPlatform(prog, s){
  const level = Math.random();
  let baseY;
  if(level < 0.55)      baseY = GROUND_Y - WR(85, 125);
  else if(level < 0.88) baseY = GROUND_Y - WR(145, 195);
  else                  baseY = GROUND_Y - WR(205, 255);

  const platformTypes = ['static', 'static', 'moving_y', 'moving_x', 'crumble', 'bouncy'];
  const platformType = platformTypes[Math.floor(Math.random() * platformTypes.length)];

  const w = WR(70, 120);
  const h = 14;

  if(platformType === 'moving_y' || platformType === 'moving_x'){
    baseY = Math.min(baseY, GROUND_Y - 200);
  }

  const plat = {
    x: W+40, w, h, type:'platform',
    isWalk:true, isPlatform:true,
    platformType,
    y: baseY, baseY, baseX: W+40,
    amp: platformType === 'moving_y' ? WR(15, 30)
       : (platformType === 'moving_x' ? WR(20, 40) : 0),
    phase: WR(0, Math.PI*2),
    color: s.wall, colorDark: s.wallDark, accent: s.accent,
    t:0, passed:false, dead:false,
    solid: platformType === 'crumble' || platformType === 'bouncy',
    crumbleTimer: 0, crumbled: false,
    bounceBoost: platformType === 'bouncy' ? -22 : 0,
    shake: 0
  };

  if(platformType === 'crumble'){ plat.color = '#A88868'; plat.colorDark = '#6A4838'; plat.accent = '#E8D0A8'; }
  if(platformType === 'bouncy'){  plat.color = '#E89B4C'; plat.colorDark = '#A06028'; plat.accent = '#FFE090'; }
  if(platformType === 'moving_y'){ plat.accent = '#80D0E8'; }
  if(platformType === 'moving_x'){ plat.accent = '#C090E8'; }

  obstacles.push(plat);

  const rewardType = Math.random();
  if(rewardType < 0.20) spawnPowerup(plat.x + w/2, baseY - 35);
  else if(rewardType < 0.40) orbs.push({ x:plat.x + w/2, y:baseY - 35, r:11, t:0, dead:false, color:'#FFF4C0', isSkyOrb:true });
  else if(rewardType < 0.85) spawnCoinCluster(plat.x + w/2, baseY - 25, Math.floor(rand(3,6)));
}

function spawnPlatformChain(prog, s){
  const count = Math.floor(WR(3, 6));
  const startX = W + 40;
  const startY = GROUND_Y - WR(90, 140);
const spacing = WR(140, 190) * getSpeedScale();
const direction = Math.random() < 0.5 ? -1 : 1;

  let lastY = startY;

  for(let i = 0; i < count; i++){
    const w = WR(70, 100);
    const h = 12;
    const dy = direction * WR(15, 35) * (i % 2 === 0 ? 1 : -0.4);
    let y = clamp(lastY + dy, GROUND_Y - 250, GROUND_Y - 80);
    lastY = y;

    obstacles.push({
      x: startX + i * spacing, w, h, type:'platform',
      isWalk:true, isPlatform:true,
      platformType: i === count - 1 ? 'bouncy' : 'static',
      y, baseY: y, baseX: startX + i * spacing,
      amp: 0, phase: 0,
      color: s.wall, colorDark: s.wallDark, accent: s.accent,
      t:0, passed:false, dead:false,
      solid: false,
      bounceBoost: i === count - 1 ? -22 : 0
    });

    if(i < count - 1){
      const midX = startX + i * spacing + spacing/2;
      const midY = (y + lastY) / 2 - 15;
      spawnCoinCluster(midX, midY, 3);
    }
  }

  const endX = startX + count * spacing;
  const endY = lastY;
  if(Math.random() < 0.4){
    spawnPowerup(endX + 40, endY - 25);
  } else {
    orbs.push({ x:endX + 40, y:endY - 25, r:12, t:0, dead:false, color:'#FFE060', isSkyOrb:true });
  }
}

function spawnSkyPlatform(prog, s){
  const m = getMeters();
  let maxTier = 1;
  if(m > 300) maxTier = 2;
  if(m > 600) maxTier = 3;
  if(m > 1200) maxTier = 4;
  if(m > 2000) maxTier = 5;

  const tier = Math.floor(WR(1, maxTier + 1));
  const baseY = GROUND_Y - (180 + (tier - 1) * 100);
  const w = WR(90, 130);
  const h = 14;

  const tierColors = [
    { color:'#80C0E8', dark:'#4080B0', accent:'#C0E0FF', glow:'#80D0FF' },
    { color:'#80D0A8', dark:'#408068', accent:'#C0FFE0', glow:'#80FFD0' },
    { color:'#B080E8', dark:'#6040A8', accent:'#E0C0FF', glow:'#D080FF' },
    { color:'#E8B34E', dark:'#A07028', accent:'#FFF4C0', glow:'#FFD060' },
    { color:'#FF80C0', dark:'#A03060', accent:'#FFD0E8', glow:'#FFA0D8' }
  ];
  const col = tierColors[tier - 1];

  let platformType = 'static';
  if(tier >= 3 && Math.random() < 0.4){
    platformType = Math.random() < 0.5 ? 'moving_y' : 'bouncy';
  }

  obstacles.push({
    x: W+40, w, h, type:'platform',
    isWalk: true, isPlatform: true,
    isSkyPlatform: true,
    skyTier: tier,
    platformType,
    y: baseY, baseY, baseX: W+40,
    amp: platformType === 'moving_y' ? rand(12, 22) : 0,
    phase: rand(0, Math.PI*2),
    color: col.color, colorDark: col.dark, accent: col.accent,
    glow: col.glow,
    t: 0, passed: false, dead: false,
    solid: platformType === 'bouncy',
    crumbleTimer: 0, crumbled: false,
    bounceBoost: platformType === 'bouncy' ? -24 : 0
  });

  const rewardY = baseY - 35;
  if(tier >= 5){
    orbs.push({ x: W+40+w/2, y: rewardY, r: 16, t:0, dead:false, color:'#FFD700', isSkyOrb: true, value: 20 });
    spawnPowerup(W+40 + w/2 + 40, rewardY);
  } else if(tier === 4){
    orbs.push({ x: W+40+w/2, y: rewardY, r: 14, t:0, dead:false, color:'#FFD700', isSkyOrb: true, value: 12 });
  } else if(tier === 3){
    spawnCoinCluster(W+40+w/2, rewardY, 5);
    orbs.push({ x: W+40+w/2 + 60, y: rewardY, r: 12, t:0, dead:false, color:'#E0C0FF', isSkyOrb: true, value: 8 });
  } else {
    spawnCoinCluster(W+40+w/2, rewardY, 3 + tier);
  }
}

function spawnSpring(prog, s){
  const w = 36, h = 20;
  obstacles.push({
    x: W+40, w, h, type:'spring',
    t:0, passed:false, dead:false,
    isWalk:true, isSpring:true,
    color:'#E8B34E', colorDark:'#A07028', accent:'#FFF4C0'
  });

  const skyY = GROUND_Y - WR(140, 210);
  orbs.push({ x: W+40 + w/2, y: skyY, r:13, t:0, dead:false, color:'#FFF4C0', isSkyOrb:true });
  spawnCoinCluster(W+40 + w/2, skyY + 35, Math.floor(WR(3,5)));
}

function spawnSaw(prog, s){
  const r = WR(28, 42);
  const isGround = Math.random() < 0.6;
  const y = isGround
    ? GROUND_Y - r - WR(0, 4)
    : GROUND_Y - WR(120, 240);

  const saw = {
    x: W+40, w: r*2, h: r*2, type:'saw',
    t:0, passed:false, dead:false,
    isWalk:true, isSaw:true,
    y: y, baseY: y,
    cx: W+40 + r,
    cy: y + r,
    r: r,
    angle: 0,
    angleSpd: WR(0.15, 0.30) * (Math.random() < 0.5 ? 1 : -1),
    movingY: !isGround,
    amp: isGround ? 0 : WR(30, 70),
    phase: WR(0, Math.PI*2),
    color:'#B0B8C0', colorDark:'#606870', accent:'#FF6040'
  };
  obstacles.push(saw);

  if(Math.random() < 0.3) spawnCoinCluster(W+40, y - 60, 2);
}

function spawnLaserFence(prog, s){
  const isVertical = Math.random() < 0.7;

  if(isVertical){
    const gapCount = Math.floor(rand(2, 4));
    const segments = [];
    let curY = CEILING_H + 40;
    const gapSize = rand(60, 90);

    for(let i = 0; i < gapCount; i++){
      const segH = WR(60, 120);
      segments.push({ y: curY, h: segH });
      curY += segH + gapSize;
      if(curY > GROUND_Y - 60) break;
    }

    obstacles.push({
      x: W+40, w: 12, type:'laser',
      t:0, passed:false, dead:false,
      isWalk:true, isLaser:true,
      isVertical: true,
      segments,
      pulse: 0,
      color:'#40E8FF', accent:'#80FFFF',
      damage: true
    });
  } else {
    obstacles.push({
      x: W+40, w: 14, type:'laser',
      t:0, passed:false, dead:false,
      isWalk:true, isLaser:true,
      isVertical: false,
      y: GROUND_Y - WR(70, 140),
      baseY: GROUND_Y - WR(70, 140),
      amp: WR(20, 50),
      phase: WR(0, Math.PI*2),
      color:'#FF40A0', accent:'#FF80D0',
      damage: true
    });
  }

  spawnCoinCluster(W+40 + 60, GROUND_Y - 200, 3);
}

function spawnVortex(prog, s){
  obstacles.push({
    x: W+40, w: 80, h: 80, type:'vortex',
    t:0, passed:false, dead:false,
    isWalk:true, isVortex:true,
    cx: W+40 + 40,
    cy: GROUND_Y - WR(120, 220),
    r: 40,
    pullForce: 0.55,
    angle: 0,
    color:'#8E4AC8', colorDark:'#4A2870', accent:'#FFD0FF'
  });
  spawnCoinCluster(W+40 + 60, GROUND_Y - 220, 4);
}

function spawnPiston(prog, s){
  const w = WR(50, 80);
  const h = WR(40, 60);
  const isTop = Math.random() < 0.5;

  obstacles.push({
    x: W+40, w, h, type:'piston',
    t:0, passed:false, dead:false,
    isWalk:true, isPiston:true,
    isTop,
    cycle: WR(0, 90),
    period: WR(70, 130),
    extendDist: WR(70, 130),
    extend: 0,
    hasSpikes: Math.random() < 0.5,
    color:'#5A6878', colorDark:'#2A3038', accent:'#FFA040'
  });

  const dangerY = isTop ? h + 100 : GROUND_Y - h - 100;
  orbs.push({ x: W+40 + w/2, y: dangerY, r:12, t:0, dead:false, color:'#FFA040', isSkyOrb:true });
}

function spawnFallingSpike(prog, s){
  const count = Math.floor(WR(2, 5));
  const startX = W + 40;
  const spacing = 90;

  for(let i = 0; i < count; i++){
    obstacles.push({
      x: startX + i * spacing, w: 20, h: 28, type:'fallSpike',
      t:0, passed:false, dead:false,
      isWalk:true, isFallingSpike:true,
      y: -40, baseY: -40,
      targetY: GROUND_Y - 28,
      falling: false,
      warned: false,
      landed: false,
      triggerDistance: WR(140, 220),
      color:'#8A4838', colorDark:'#4A2018', accent:'#FF8060'
    });
  }

  spawnCoinCluster(startX + (count-1)*spacing/2, GROUND_Y - 60, Math.floor(rand(3,5)));
}

function spawnRotatingBar(prog, s){
  const length = WR(60, 100);
  const cy = GROUND_Y - WR(120, 180);

  obstacles.push({
    x: W+40, w: length, h: 20, type:'rotBar',
    t:0, passed:false, dead:false,
    isWalk:true, isRotBar:true,
    cx: W+40 + length/2, cy,
    length, thickness: 10,
    angle: 0,
    angleSpd: WR(0.012, 0.025) * (Math.random() < 0.5 ? 1 : -1),
    warmupTimer: 30,
    color:'#6A5A48', colorDark:'#3A2820', accent:'#E8B34E'
  });
}

function maybeReward(x, y, s){
  const r = Math.random();
  if(r < 0.06) spawnPowerup(x, y);
  else if(r < 0.20) orbs.push({ x, y, r:10, t:0, dead:false, color:s.accent });
  else if(r < 0.80) spawnCoinCluster(x, y, Math.floor(WR(2,4)));
}

/* ═══════════════ GROUND HOLES (النزول للأعماق) ═══════════════ */
function spawnGroundHole(){
  const w = WR(110, 160);
  const hole = {
    x: W + 60,
    w,
    h: 20,
    y: GROUND_Y - 4,
    type: 'groundHole',
    isGroundHole: true,
    isWalk: true,
    t: 0, passed: false, dead: false
  };
  obstacles.push(hole);

  /* مكافأة تشجّع على النزول */
  orbs.push({
    x: W + 60 + w/2,
    y: GROUND_Y + 100,
    r: 16, t: 0, dead: false,
    color: '#FF8060', isSkyOrb: true, value: 20
  });
  spawnCoinCluster(W + 60 + w/2, GROUND_Y + 180, 4);

  showBanner('↓ HOLE', 'حفرة — انزل للأعماق');
  Sfx.play(200, 0.5, 'sine', 0.05, 90);
}

function isPlayerOverHole(){
  for(const o of obstacles){
    if(!o.isGroundHole || o.dead) continue;
    /* نستخدم مركز اللاعب فقط — إذا كان مركزه داخل الحفرة فهو فوقها */
    if(P.x >= o.x && P.x <= o.x + o.w) return true;
  }
  return false;
}

/* ============================================================
   ==================== Collision ============================
   ============================================================ */
function circleRect(cx,cy,r,rx,ry,rw,rh){
  if(rw<=0||rh<=0) return false;
  const nx=clamp(cx,rx,rx+rw), ny=clamp(cy,ry,ry+rh);
  const dx=cx-nx, dy=cy-ny;
  return dx*dx+dy*dy < r*r;
}
function circleCircle(x1,y1,r1,x2,y2,r2){
  const dx=x1-x2,dy=y1-y2,rr=r1+r2;
  return dx*dx+dy*dy < rr*rr;
}
function hitObstacle(o){
  if(G.ghost > 0) return false;
  if(o.isShiftGate) return false;
  if(o.isGroundHole) return false;
  const pr = P.r * 0.72;

  /* ═══ ASCEND: تصادم العائق الأفقي ذي الفتحة ═══ */
  if(o.isAscend){
    const gapTop = o.y + o.gapLocalY;
    const gapBot = gapTop + o.gap;
    /* الجزء الأعلى من العائق */
    if(circleRect(P.x, P.y, pr, o.x, o.y, o.w, Math.max(0, gapTop - o.y))) return true;
    /* الجزء الأسفل من العائق */
    if(circleRect(P.x, P.y, pr, o.x, gapBot, o.w, Math.max(0, o.y + o.h - gapBot))) return true;
    return false;
  }

  if(o.isWalk){
    if(o.isCeiling){ return circleRect(P.x,P.y,pr, o.x, -10, o.w, o.h + 10); }

  /* ═══ منصات ASCEND المخصصة ═══ */
  if(o.isAscendPlatform && o.ascendType){
    if(o.crumbled) return;

    /* phantom: تعتيم */
    let alpha = 1;
    if(o.ascendType === 'phantom'){
      const t = (G.t + o.phantomPhase * 100) % o.phantomPeriod;
      if(t < o.phantomPeriod * 0.4){
        alpha = 0.15;
      } else if(t < o.phantomPeriod * 0.5){
        alpha = lerp(0.15, 1, (t - o.phantomPeriod * 0.4) / (o.phantomPeriod * 0.1));
      }
    }

    ctx.save();
    ctx.globalAlpha = alpha;

    /* عمود تحتي (جمالي) */
    if(o.hasPillar){
      ctx.fillStyle = o.colorDark;
      ctx.globalAlpha = alpha * 0.55;
      const pw = o.w * 0.35;
      const px = o.x + (o.w - pw) / 2;
      ctx.beginPath();
      ctx.moveTo(px, o.y + o.h);
      ctx.lineTo(px + pw, o.y + o.h);
      ctx.lineTo(px + pw * 0.7, o.y + o.h + o.pillarH);
      ctx.lineTo(px + pw * 0.3, o.y + o.h + o.pillarH);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = alpha;
    }

    /* الظل */
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    roundRect(ctx, o.x + 3, o.y + 5, o.w, o.h, 7);
    ctx.fill();

    /* الجسم */
    ctx.fillStyle = o.color;
    roundRect(ctx, o.x, o.y, o.w, o.h, 7);
    ctx.fill();

    /* الحافة العلوية */
    ctx.fillStyle = o.topColor || o.color;
    roundRect(ctx, o.x + 2, o.y + 2, o.w - 4, 5, 3);
    ctx.fill();

    /* الحافة السفلية الداكنة */
    ctx.fillStyle = o.colorDark;
    roundRect(ctx, o.x + 2, o.y + o.h - 4, o.w - 4, 3, 2);
    ctx.fill();

    /* لمعة بيئية */
    ctx.globalAlpha = alpha * 0.3;
    ctx.fillStyle = o.accent;
    ctx.beginPath();
    ctx.arc(o.x + o.w / 2, o.y + 1, o.w * 0.35, 0, Math.PI, true);
    ctx.fill();

    /* منصة نابضة: نقاط مضيئة */
    if(o.ascendType === 'bouncy'){
      ctx.globalAlpha = alpha * (0.6 + Math.sin(G.t * 0.15) * 0.3);
      ctx.fillStyle = '#FFF8C0';
      for(let i = 0; i < 3; i++){
        const px = o.x + o.w * (0.25 + i * 0.25);
        const py = o.y - 3;
        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* منصة هشة: تشققات */
    if(o.ascendType === 'crumble' && o.crumbleTimer > 0){
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.lineWidth = 1.5;
      for(let i = 0; i < 3; i++){
        const cx = o.x + o.w * (0.25 + i * 0.25);
        ctx.beginPath();
        ctx.moveTo(cx, o.y + 2);
        ctx.lineTo(cx + 4, o.y + o.h - 2);
        ctx.stroke();
      }
      /* وميض تحذير */
      const warn = 0.5 + Math.sin(G.t * 0.4) * 0.5;
      ctx.globalAlpha = alpha * warn * 0.4;
      ctx.fillStyle = '#FF5050';
      ctx.fillRect(o.x, o.y, o.w, o.h);
    }

    /* جزيرة راحة: هالة ذهبية */
    if(o.isRest){
      ctx.globalAlpha = alpha * 0.4;
      const pulse = 0.5 + Math.sin(G.t * 0.08) * 0.5;
      const grad = ctx.createRadialGradient(o.x + o.w/2, o.y + o.h/2, 5, o.x + o.w/2, o.y + o.h/2, o.w);
      grad.addColorStop(0, '#FFD700');
      grad.addColorStop(1, 'rgba(255,215,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(o.x - o.w*0.3, o.y - o.w*0.3, o.w*1.6, o.w*1.6);
    }

    ctx.restore();
    return;
  }

if(o.isPlatform){
  /* المنصات ليست قاتلة — الالتقاط من الأعلى فقط */
  return false;
}

    if(o.isSpring) return false;

    if(o.isSaw || o.isPiston || o.isFallingSpike || o.isRotBar || o.isLaser || o.isVortex
       || o.isFallingRock || o.isUnderSpike || o.isLavaPool || o.isDrill || o.isGhost){
      return false;
    }

    return circleRect(P.x,P.y,pr, o.x, GROUND_Y - o.h, o.w, o.h);
  }

  const topH = o.gapY - o.gap/2;
  const botY = o.gapY + o.gap/2;
  if(circleRect(P.x,P.y,pr, o.x, -40, o.w, topH+40)) return true;
  if(circleRect(P.x,P.y,pr, o.x, botY, o.w, GROUND_Y-botY)) return true;
  return false;
}

/* ============================================================
   ==================== Input ================================
   ============================================================ */
function handleTap(cx, cy){
  if(G.state !== 'PLAYING') return;
  Sfx.init();

  /* ═══════════════ ASCEND — قفز اتجاهي ═══════════════ */
  if(G.mode === 'ASCEND'){
    const x = (cx !== undefined) ? cx : pointer.x;
    const y = (cy !== undefined) ? cy : pointer.y;
    handleAscendTap(x, y);
    return;
  }

  if(G.mode === 'WALK' || G.mode === 'SKY_JUMP'){
    for(const o of obstacles){
      if(o.isElevator) o.isCarryingPlayer = false;
    }
  }
  if(G.mode==='FLIP'){
    P.gravityDir *= -1;
    P.vy = -5.5 * P.gravityDir;
    burst(P.x,P.y,'#FFFFFF',5,3);
    shake(3); Sfx.tap(); haptic(8);
  } else if(G.mode==='FLAP'){
    P.vy = -5.2; P.gravityDir = 1;
    burst(P.x,P.y+6,'#FFFFFF',4,2.5);
    shake(2); Sfx.tap(); haptic(6);
} else if(G.mode==='WALK'){
  const adminFly = hasAdminAccess() && Save.data.admin.infiniteJump;
  const hasInf   = G.infiniteJump > 0 || adminFly;

  if(P.onGround || P.coyoteTimer > 0){
    /* قفزة أرضية عادية */
    P.vy = -12.5;
    P.onGround = false;
    P.coyoteTimer = 0;
    P.jumps = 1;
    P.jumpHeld = true;
    P.jumpHoldTimer = 0;
    spawnJumpEffect(P.x, P.y + P.r, G.currentScene.groundDark);
    Sfx.tap(); haptic(8);
  } else if(hasInf){
    /* قفزة لا نهائية */
    P.vy = G.megaJumpActive > 0 ? -16 : -11;
    P.jumps = 1;
    P.jumpHeld = true;
    P.jumpHoldTimer = 0;
    spawnJumpEffect(P.x, P.y + P.r, '#C080FF');
    for(let i=0;i<8;i++){
      const a = (i/8)*Math.PI*2;
      particles.push({
        x: P.x, y: P.y,
        vx: Math.cos(a)*3.5, vy: Math.sin(a)*3.5,
        life: 0.9, decay: 0.035, color: '#C080FF', size: 3
      });
    }
    Sfx.play(660, 0.12, 'sine', 0.04, 990);
    haptic(8);
  } else if(P.jumps < 2 + (G.extraJumps > 0 ? 2 : 0)){
    P.vy = G.megaJumpActive > 0 ? -16 : -10.5;
    P.jumps++;
    P.jumpHeld = true;
    P.jumpHoldTimer = 0;
    spawnJumpEffect(P.x, P.y + P.r, G.currentScene.accent);
    for(let i=0;i<8;i++){
      const a = (i/8)*Math.PI*2;
      particles.push({
        x: P.x, y: P.y,
        vx: Math.cos(a)*3.5, vy: Math.sin(a)*3.5,
        life: 0.9, decay: 0.035, color: G.currentScene.accent, size: 3
      });
    }
    Sfx.play(660, 0.12, 'sine', 0.04, 990);
    haptic(8);
  } else {
    P.jumpBufferTimer = 8;
  }
} else if(G.mode==='FLIP_WALK'){
    if(P.onGround){
      P.vy = 13.0; P.onGround=false; P.jumps=1;
      spawnJumpEffect(P.x, P.y + P.r, G.currentScene.accent);
      Sfx.tap(); haptic(8);
    } else if(P.jumps < 2){
      P.vy = 10.5; P.jumps++;
      spawnJumpEffect(P.x, P.y, G.currentScene.accent);
      Sfx.tap(); haptic(8);
    }
} else if(G.mode==='SKY_JUMP'){
  const adminFly = hasAdminAccess() && Save.data.admin.infiniteJump;
  const hasInf   = G.infiniteJump > 0 || adminFly;

  if(!P.onGround && (hasInf || P.jumps < 2)){
    P.vy = Math.min(P.vy, -9.5);
    if(!hasInf) P.jumps++;
    spawnJumpEffect(P.x, P.y + P.r, G.currentScene.accent);
    Sfx.tap(); haptic(8);
    shake(3);
  }
}
}
/* ═══════════════ ASCEND 3-WAY JUMP ═══════════════ */
/* ═══════════════ ASCEND 3-WAY JUMP (مناطق الشاشة) ═══════════════ */
function handleAscendTap(cx, cy){
  /* لو ما فيه إحداثيات (زر كيبورد) — قفزة عادية للأعلى */
  if(cx === undefined || cy === undefined){
    ascendJumpUp();
    return;
  }

  /* تقسيم الشاشة إلى 3 مناطق أفقية */
  const leftZone  = W * 0.33;
  const rightZone = W * 0.67;

  if(cx < leftZone){
    /* الثلث الأيسر → قفزة يسار */
    ascendJumpLeft();
  } else if(cx > rightZone){
    /* الثلث الأيمن → قفزة يمين */
    ascendJumpRight();
  } else {
    /* الثلث الأوسط → قفزة للأعلى */
    ascendJumpUp();
  }
}

function ascendCanJump(){
  if(G.ascendJumpCooldown > 0) return false;

  const adminFly = hasAdminAccess() && Save.data.admin.infiniteJump;
  const hasInf   = G.infiniteJump > 0 || adminFly;

  if(hasInf) return true;   /* طيران مطلق */
  return P.onGround || P.coyoteTimer > 0 || P.jumps < 2;
}

function ascendJumpUp(){
  if(!ascendCanJump()) return;
  G.ascendJumpCooldown = 6;

  P.vy = -14.5;
  P.vx *= 0.35;
  P.onGround = false;
  P.coyoteTimer = 0;
  P.jumps++;

  spawnJumpEffect(P.x, P.y + P.r, G.currentScene.accent);
  Sfx.tap(); haptic(6);
}

function ascendJumpLeft(){
  if(!ascendCanJump()) return;
  G.ascendJumpCooldown = 6;

  P.vy = -12;
  P.vx = -9;
  P.onGround = false;
  P.coyoteTimer = 0;
  P.jumps++;

  spawnJumpEffect(P.x, P.y + P.r, G.currentScene.accent);
  Sfx.tap(); haptic(6);
}

function ascendJumpRight(){
  if(!ascendCanJump()) return;
  G.ascendJumpCooldown = 6;

  P.vy = -12;
  P.vx = 9;
  P.onGround = false;
  P.coyoteTimer = 0;
  P.jumps++;

  spawnJumpEffect(P.x, P.y + P.r, G.currentScene.accent);
  Sfx.tap(); haptic(6);
}
canvas.addEventListener('mousedown', e=>{
  e.preventDefault();
  const r = canvas.getBoundingClientRect();
  handleTap(e.clientX - r.left, e.clientY - r.top);
});
canvas.addEventListener('touchstart', e=>{
  e.preventDefault();
  const r = canvas.getBoundingClientRect();
  const t = e.touches[0];
  handleTap(t.clientX - r.left, t.clientY - r.top);
}, {passive:false});
window.addEventListener('keydown', e=>{
  /* ═══════════════ أسهم الكيبورد لنمط ASCEND ═══════════════ */
  if(G.mode === 'ASCEND' && G.state === 'PLAYING'){
    if(e.code === 'ArrowLeft'){
      e.preventDefault();
      ascendJumpLeft();
      return;
    }
    if(e.code === 'ArrowRight'){
      e.preventDefault();
      ascendJumpRight();
      return;
    }
    if(e.code === 'ArrowUp' || e.code === 'Space' || e.code === 'KeyW'){
      e.preventDefault();
      ascendJumpUp();
      return;
    }
    if(e.code === 'Escape'){ pauseGame(); return; }
    return;   /* لا شيء آخر في ASCEND */
  }

  /* ═══════════════ باقي الأنماط (كما قبل) ═══════════════ */
  if(e.code === 'Space' || e.code === 'ArrowUp'){
    e.preventDefault();
    handleTap();
  }
  if(e.code === 'Escape' && G.state === 'PLAYING') pauseGame();
});
function setPointer(e){
  const r = canvas.getBoundingClientRect();
  const cx = e.touches ? e.touches[0].clientX : e.clientX;
  const cy = e.touches ? e.touches[0].clientY : e.clientY;
  pointer.x = cx - r.left; pointer.y = cy - r.top;
}
function releaseJump(){
  P.jumpHeld = false;
  pointer.down = false;
}
canvas.addEventListener('touchend', releaseJump);
canvas.addEventListener('mouseup', releaseJump);
canvas.addEventListener('mousemove', setPointer);
canvas.addEventListener('touchmove', e=>{ e.preventDefault(); setPointer(e); }, {passive:false});
canvas.addEventListener('touchstart', e=>{ setPointer(e); pointer.down=true; }, {passive:false});
canvas.addEventListener('mousedown', e=>{ setPointer(e); pointer.down=true; });
canvas.addEventListener('touchend', ()=> pointer.down=false);
canvas.addEventListener('mouseleave', ()=> pointer.down=false);
window.addEventListener('mouseup', ()=> pointer.down=false);

/* ============================================================
   ==================== Power-ups Logic ======================
   ============================================================ */
function updatePowerups(){
  /* ═══ مؤقّت التعزيزات (يُجمّد مع eternity) ═══ */
  const frozen = G.eternityActive > 0;

  for(const id in G.activePowerups){
    const pu = G.activePowerups[id];
    if(pu.permanent) continue;

    if(!frozen) pu.remaining--;

    if(pu.remaining <= 0){
      delete G.activePowerups[id];

      /* تنظيف الحالات الخاصة */
      if(id === 'infiniteJump') G.infiniteJump = 0;
      if(id === 'extraJump') G.extraJumps = 0;
      if(id === 'glide') G.glideActive = false;
      if(id === 'rocket'){ G.rocketActive = false; G.rocketFrames = 0; }
      if(id === 'megaJump') G.megaJumpActive = 0;
      if(id === 'wallStick') G.wallStickActive = false;
      if(id === 'giant'){ G.giantActive = 0; P.r = 13; }
      if(id === 'freeze') G.freezeActive = 0;
      if(id === 'destroyer') G.destroyerActive = 0;
      if(id === 'laser') G.laserActive = 0;
      if(id === 'bomb') G.bombActive = 0;
      if(id === 'shockwave') G.shockwaveActive = 0;
      if(id === 'blackHole') G.blackHoleActive = 0;
      if(id === 'clone') G.cloneActive = 0;
      if(id === 'autopilot') G.autopilotActive = 0;
      if(id === 'regen') G.regenActive = 0;
      if(id === 'barrier') G.barrierActive = 0;
      if(id === 'jetpack') G.jetpackActive = 0;
      if(id === 'hover') G.hoverActive = 0;
      if(id === 'eternity') G.eternityActive = 0;

      Sfx.puEnd();
      updatePowerupsUI();
    }
  }

  /* ═══ الشبح ═══ */
  if(G.ghost > 0) G.ghost--;

  /* ═══ الأبدية: تجميد التعزيزات ═══ */
  if(G.eternityActive > 0) G.eternityActive--;

  /* ═══ تجدد الدرع ═══ */
  if(G.regenActive > 0){
    G.regenActive--;
    if(G.regenActive % G.regenEvery === 0 && !G.shield){
      G.shield = true;
      addFloat(P.x, P.y - 30, 'درع متجدد!', '#7BC4B0', 13);
      Sfx.play(720, 0.2, 'sine', 0.05, 1080);
    }
  }

  /* ═══ ليزر: يدمّر العقبات أمامه ═══ */
  if(G.laserActive > 0 && G.t % 18 === 0){
    for(const o of obstacles){
      if(o.dead || o.isPlatform || o.isShiftGate) continue;
      if(o.x > P.x && o.x < P.x + 220){
        o.dead = true;
        burst(o.x, o.y || GROUND_Y - 30, '#FF3060', 8, 6);
      }
    }
  }

  /* ═══ قنبلة: تُسقط قنابل ═══ */
  if(G.bombActive > 0 && G.t % 60 === 0){
    const bx = P.x + 50;
    const by = P.y + 20;
    particles.push({
      x: bx, y: by,
      vx: 3, vy: -2,
      life: 2, decay: 0.008,
      color: '#5A5A5A', size: 8,
      isBomb: true,
      explodeAt: G.t + 45
    });
  }

  /* انفجار القنابل */
  for(let i = particles.length - 1; i >= 0; i--){
    const p = particles[i];
    if(p.isBomb && p.explodeAt <= G.t){
      for(const o of obstacles){
        if(o.dead || o.isPlatform || o.isShiftGate) continue;
        if(Math.abs(o.x - p.x) < 120){
          o.dead = true;
          burst(o.x, o.y || GROUND_Y - 30, '#E85838', 10, 8);
        }
      }
      burst(p.x, p.y, '#E85838', 25, 10);
      shake(15); Sfx.play(120, 0.3, 'sawtooth', 0.06, 60);
      particles.splice(i, 1);
    }
  }

  /* ═══ موجة صدمية ═══ */
  if(G.shockwaveActive > 0 && G.t % 45 === 0){
    shake(8);
    for(const o of obstacles){
      if(o.dead || o.isPlatform || o.isShiftGate) continue;
      if(o.x > P.x - 50 && o.x < W){
        o.x += 80;
        burst(o.x, o.y || GROUND_Y - 30, '#80D0FF', 6, 5);
      }
    }
  }

  /* ═══ ثقب أسود: يسحب العقبات ═══ */
  if(G.blackHoleActive > 0){
    const bx = W * 0.7;
    const by = H / 2;
    G.blackHoleX = bx;
    G.blackHoleY = by;
    for(const o of obstacles){
      if(o.dead || o.isPlatform || o.isShiftGate) continue;
      const dx = bx - o.x;
      const dy = by - (o.y || GROUND_Y - 30);
      const d = Math.hypot(dx, dy) || 1;
      if(d < 400){
        o.x += (dx / d) * 3;
        if(!o.isWalk) o.y += (dy / d) * 2;
      }
    }
    for(const c of coins){
      if(c.dead) continue;
      const dx = bx - c.x, dy = by - c.y;
      const d = Math.hypot(dx, dy) || 1;
      if(d < 400){
        c.x += (dx / d) * 5;
        c.y += (dy / d) * 5;
      }
    }
  }

  /* ═══ حاجز: يولّد حواجز أمامك ═══ */
  if(G.barrierActive > 0 && G.t % 90 === 0){
    obstacles.push({
      x: P.x + 80, w: 40, h: 100,
      y: P.y - 50,
      isWalk: true, isBarrier: true,
      t: 0, passed: false, dead: false,
      color: '#88B0D0', colorDark: '#4070A0', accent: '#C0E0FF'
    });
  }

  /* ═══ مدمّر: يحطم العقبات عند الملامسة ═══ */
  if(G.destroyerActive > 0){
    for(const o of obstacles){
      if(o.dead || o.isPlatform || o.isShiftGate) continue;
      if(Math.abs((o.x + (o.w||0)/2) - P.x) < 45){
        o.dead = true;
        burst(o.x, o.y || GROUND_Y - 30, '#E85838', 12, 7);
      }
    }
  }

  /* ═══ طيار آلي: يتجنب العقبات ═══ */
  if(G.autopilotActive > 0){
    /* ابحث عن أقرب عقبة خطر */
    let closest = null;
    let minDist = 999;
    for(const o of obstacles){
      if(o.dead || o.isPlatform || o.isShiftGate) continue;
      const d = o.x - P.x;
      if(d > 0 && d < minDist){ minDist = d; closest = o; }
    }
    if(closest && minDist < 250){
      /* تحرك لتجنب الخطر */
      const oy = closest.y || (GROUND_Y - closest.h);
      if(P.y > oy + closest.h + 20) P.vy = Math.min(P.vy, -3);
      else if(P.y < oy - 20) P.vy = Math.max(P.vy, 3);
    }
  }

  if(G.t % 15 === 0) updatePowerupsUI();
}

function updatePowerupsUI(){
  const row = document.getElementById('powerups-row');
  if(!row) return;
  const items = [];
  if(G.shield) items.push({icon:'◈', color:'#7BC4B0', label:'درع'});
  if(G.hasSecondChance) items.push({icon:'♻', color:'#C080FF', label:'فرصة'});
  if(G.hasPhoenix) items.push({icon:'🔥', color:'#FF5020', label:'عنقاء'});

  for(const id in G.activePowerups){
    const t = G.activePowerups[id];
    if(t.permanent) continue;
    const secs = Math.ceil(t.remaining / 60);
    items.push({icon: t.icon, color: t.color, label: secs});
  }

  row.innerHTML = items.slice(0, 10).map(it => `
    <div class="pu-chip" style="--puc:${it.color}">
      <span class="pu-ic">${it.icon}</span>
      <span class="pu-time">${it.label}</span>
    </div>`).join('');
}
function collectPowerup(p){
  const type = p.type;
  Sfx.power(); haptic(15); shake(6);
  burst(p.x, p.y, type.color, 22, 7);

  const secs = (type.singleUse || type.instant)
    ? '⚡'
    : Math.ceil(p.duration / 60) + 'ث';
  addFloat(p.x, p.y, type.label + ' ' + secs, type.color, 15);

  const id = type.id;

  /* ═══ الدرع ═══ */
  if(id === 'shield'){ G.shield = true; }

  /* ═══ شبح / طور ═══ */
  else if(id === 'ghost' || id === 'phase'){
    G.ghost = Math.max(G.ghost, p.duration);
    G.activePowerups[id] = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ قفزات إضافية ═══ */
  else if(id === 'extraJump'){
    G.extraJumps = p.duration;
    G.activePowerups.extraJump = { remaining:p.duration, color:type.color, icon:type.icon };
  }
  /* ═══ قفزات لا نهائية ═══ */
else if(id === 'infiniteJump'){
  G.infiniteJump = p.duration;
  G.activePowerups.infiniteJump = { remaining:p.duration, color:type.color, icon:type.icon };
  addFloat(P.x, P.y - 55, '∞ قفزات لا نهائية', '#C080FF', 16);
}

  /* ═══ انزلاق ═══ */
  else if(id === 'glide'){
    G.glideActive = true;
    G.activePowerups.glide = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ صاروخ ═══ */
  else if(id === 'rocket'){
    G.rocketActive = true;
    G.rocketFrames = p.duration;
    G.rocketMaxAltitude = 0;
    P.vy = -12;
    G.activePowerups.rocket = { remaining:p.duration, color:type.color, icon:type.icon };
    for(let i=0;i<24;i++){
      const a = (i/24)*Math.PI*2;
      particles.push({ x:P.x, y:P.y,
        vx:Math.cos(a)*rand(4,8), vy:Math.sin(a)*rand(4,8)+4,
        life:1.2, decay:0.02, color:'#FF6B35', size:rand(3,6) });
    }
  }

  /* ═══ قفزة خارقة ═══ */
  else if(id === 'megaJump'){
    G.megaJumpActive = p.duration;
    G.activePowerups.megaJump = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ التصاق الجدران ═══ */
  else if(id === 'wallStick'){
    G.wallStickActive = true;
    G.activePowerups.wallStick = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ تصغير ═══ */
  else if(id === 'shrink'){
    G.activePowerups.shrink = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ عملاق ═══ */
  else if(id === 'giant'){
    G.giantActive = p.duration;
    G.activePowerups.giant = { remaining:p.duration, color:type.color, icon:type.icon };
    P.r = 22;
  }

  /* ═══ تباطؤ الزمن ═══ */
  else if(id === 'slow' || id === 'timeWarp'){
    G.activePowerups[id] = { remaining:p.duration, color:type.color, icon:type.icon, slowMul: type.slowMul };
  }

  /* ═══ وقت الرصاصة ═══ */
  else if(id === 'bulletTime'){
    G.activePowerups.bulletTime = { remaining:p.duration, color:type.color, icon:type.icon, worldMul: type.worldMul };
  }

  /* ═══ تسريع ═══ */
  else if(id === 'haste'){
    G.activePowerups.haste = { remaining:p.duration, color:type.color, icon:type.icon, hasteMul: type.hasteMul };
  }

  /* ═══ تجميد ═══ */
  else if(id === 'freeze'){
    G.freezeActive = p.duration;
    G.activePowerups.freeze = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ مدمّر ═══ */
  else if(id === 'destroyer'){
    G.destroyerActive = p.duration;
    G.activePowerups.destroyer = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ ليزر ═══ */
  else if(id === 'laser'){
    G.laserActive = p.duration;
    G.activePowerups.laser = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ قنبلة ═══ */
  else if(id === 'bomb'){
    G.bombActive = p.duration;
    G.activePowerups.bomb = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ موجة صدمية ═══ */
  else if(id === 'shockwave'){
    G.shockwaveActive = p.duration;
    G.activePowerups.shockwave = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ ثقب أسود ═══ */
  else if(id === 'blackHole'){
    G.blackHoleActive = p.duration;
    G.blackHoleX = W * 0.7;
    G.blackHoleY = H / 2;
    G.activePowerups.blackHole = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ نسخة ═══ */
  else if(id === 'clone'){
    G.cloneActive = p.duration;
    G.activePowerups.clone = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ طيار آلي ═══ */
  else if(id === 'autopilot'){
    G.autopilotActive = p.duration;
    G.activePowerups.autopilot = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ رؤية ═══ */
  else if(id === 'vision'){
    G.activePowerups.vision = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ بوصلة ═══ */
  else if(id === 'compass'){
    G.activePowerups.compass = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ فرصة ثانية ═══ */
  else if(id === 'secondChance'){
    G.hasSecondChance = true;
    G.activePowerups.secondChance = { remaining:9999, color:type.color, icon:type.icon, permanent:true };
  }

  /* ═══ تجدد ═══ */
  else if(id === 'regen'){
    G.regenActive = p.duration;
    G.regenEvery = type.regenEvery || 180;
    G.activePowerups.regen = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ حصانة ═══ */
  else if(id === 'immune'){
    G.invuln = Math.max(G.invuln, p.duration);
    G.activePowerups.immune = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ حاجز ═══ */
  else if(id === 'barrier'){
    G.barrierActive = p.duration;
    G.activePowerups.barrier = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ حظ ═══ */
  else if(id === 'luck' || id === 'luckBoost'){
    G.activePowerups[id] = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ مضاعفات العملات ═══ */
  else if(id === 'double' || id === 'multiplier'){
    G.activePowerups[id] = { remaining:p.duration, color:type.color, icon:type.icon, mul: type.multiplier || 2 };
  }

  /* ═══ اللمسة الذهبية ═══ */
  else if(id === 'goldenTouch'){
    G.activePowerups.goldenTouch = { remaining:p.duration, color:type.color, icon:type.icon, coinMul: type.coinMul || 5 };
  }

  /* ═══ أبدية ═══ */
  else if(id === 'eternity'){
    G.eternityActive = p.duration;
    G.activePowerups.eternity = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ المغناطيس ═══ */
  else if(id === 'magnet'){
    G.activePowerups.magnet = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ انطلاقة ═══ */
  else if(id === 'dash'){
    P.vx += type.dashForce || 14;
    G.invuln = Math.max(G.invuln, p.duration);
    G.activePowerups.dash = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ حقيبة طائرة ═══ */
  else if(id === 'jetpack'){
    G.jetpackActive = p.duration;
    G.activePowerups.jetpack = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══ تحويم ═══ */
  else if(id === 'hover'){
    G.hoverActive = p.duration;
    G.activePowerups.hover = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  /* ═══════════════════════════════════════════════════════
     ═══ فوري (Instant) ═══
     ═══════════════════════════════════════════════════════ */

  /* ═══ مكنسة: اجمع كل شيء فوراً ═══ */
  else if(id === 'vacuum'){
    for(const c of coins){ if(!c.dead){ c.dead = true; G.runCoins += (c.isSkyCoin ? 5 : 1); } }
    for(const o of orbs){ if(!o.dead){ o.dead = true; G.orbCount++; G.runCoins += (o.value || 3); } }
    for(const pu of powerups){ if(!pu.dead && pu !== p){ pu.dead = true; } }
    G.flash = 0.5;
    addFloat(P.x, P.y - 60, 'مكنسة كاملة!', '#9A8AC8', 18);
    Sfx.reward(); shake(12);
  }

  /* ═══ انتقال: 100م للأمام ═══ */
  else if(id === 'teleport'){
    const dist = (type.distance || 100) * PIXELS_PER_METER;
    G.dist += dist;
    G.invuln = Math.max(G.invuln, 180);
    G.flash = 0.7;
    for(let i=0;i<40;i++){
      const a = (i/40)*Math.PI*2;
      particles.push({ x:P.x, y:P.y,
        vx:Math.cos(a)*rand(8,15), vy:Math.sin(a)*rand(8,15),
        life:1.2, decay:0.02, color:'#C080FF', size:rand(3,6) });
    }
    addFloat(P.x, P.y - 50, '⚡ +' + dist/PIXELS_PER_METER + 'م', '#C080FF', 18);
    Sfx.reward(); shake(20);
  }

  /* ═══ تفرّد: امتصاص كامل + ×5 ═══ */
  else if(id === 'singularity'){
    for(const c of coins){ if(!c.dead){ c.dead = true; G.runCoins += (c.isSkyCoin ? 25 : 5); } }
    for(const o of orbs){ if(!o.dead){ o.dead = true; G.orbCount++; G.runCoins += (o.value || 3) * 5; } }
    for(const o of obstacles){
      if(o.dead || o.isPlatform || o.isShiftGate) continue;
      o.dead = true;
      burst(o.x, o.y || GROUND_Y - 30, '#6020A0', 10, 8);
    }
    G.flash = 0.9; shake(28);
    for(let i=0;i<80;i++){
      const a = (i/80)*Math.PI*2;
      particles.push({ x:P.x, y:P.y,
        vx:Math.cos(a)*rand(10,20), vy:Math.sin(a)*rand(10,20),
        life:1.6, decay:0.014, color:'#6020A0', size:rand(3,7) });
    }
    addFloat(P.x, P.y - 70, 'فراغ مطلق!', '#6020A0', 22);
    Sfx.reward(); haptic(40);
  }

  /* ═══ قدرة مطلقة: 5 تعزيزات عشوائية ═══ */
  else if(id === 'omnipotence'){
    const allIds = POWERUP_LIST.filter(x => x.id !== 'omnipotence').map(x => x.id);
    const shuffled = allIds.sort(() => Math.random() - 0.5);
    const picks = shuffled.slice(0, 5);
    for(const pickId of picks){
      const def = POWERUP_DEFS[pickId];
      if(!def) continue;
      const fakeP = { x:P.x, y:P.y, type:def, duration: getPowerupDuration(pickId) };
      setTimeout(() => { try { collectPowerup(fakeP); } catch(e){} }, 100);
    }
    addFloat(P.x, P.y - 70, '👑 قوة مطلقة!', '#FFD700', 22);
    Sfx.reward(); shake(30); haptic(50);
    G.flash = 1;
  }

  /* ═══ عنقاء: إحياء ═══ */
  else if(id === 'phoenix'){
    G.hasPhoenix = true;
    G.activePowerups.phoenix = { remaining:9999, color:type.color, icon:type.icon, permanent:true };
    addFloat(P.x, P.y - 50, '🔥 عنقاء!', '#FF5020', 20);
  }

  /* ═══ أي تعزيز غير معروف → تسجيل عام ═══ */
  else {
    G.activePowerups[id] = { remaining:p.duration, color:type.color, icon:type.icon };
  }

  updatePowerupsUI();
}

/* ============================================================
   ==================== HUD موحّد ============================
   ============================================================ */

/* ─────────────────────────────────────────────────────────────
   الشريط السياقي: يدمج Scene + Realm + Biome في عنصر واحد
   ───────────────────────────────────────────────────────────── */
let _lastContextKey = '';

function updateContextBanner(){
  const el = document.getElementById('context-banner');
  if(!el) return;

  let icon = '', text = '', sub = '', color = '#FFFFFF';

  if(G.mode === 'ASCEND'){
    const altM  = getMeters();
    const biome = getAscendBiome(altM);
    icon  = biome.icon;
    text  = biome.name;
    sub   = biome.ar;
    color = biome.accent;

  } else if(G.realm === REALM.SKY){
    const layer = SKY_REALM.layers[G.skyLayerIdx];
    icon  = '☁';
    text  = 'SKY ' + (G.skyLayerIdx + 1);
    sub   = layer.ar;
    color = '#88C8E8';

  } else if(G.realm === REALM.UNDERGROUND){
    const layer = UNDER_REALM.layers[G.underLayerIdx];
    icon  = '⛏';
    text  = 'DEPTH ' + (G.underLayerIdx + 1);
    sub   = layer.ar;
    color = '#FF8060';

} else if(G.isMixedMode){
  const md = MODES.find(m => m.id === G.mode);
  icon  = md.icon;
  text  = 'SHIFT · ' + md.en;
  sub   = md.ar;
  color = MODE_COLORS[G.mode] || '#A06AD8';

  } else {
    /* الأرض: اسم المشهد */
    const scene = G.currentScene;
    icon  = '🌍';
    text  = scene.en;
    sub   = scene.ar;
    color = scene.accent || '#E07A3F';
  }

  const key = text + '|' + sub;
  if(key !== _lastContextKey){
    _lastContextKey = key;
    el.classList.add('pop');
    clearTimeout(el._popTimer);
    el._popTimer = setTimeout(() => el.classList.remove('pop'), 400);
  }

  el.innerHTML =
    `<span class="ctx-ic">${icon}</span>` +
    `<span class="ctx-text">${text}</span>` +
    `<span class="ctx-divider">·</span>` +
    `<span class="ctx-sub">${sub}</span>`;
  el.style.setProperty('--ctx', color);
  el.classList.add('show');
}

/* ═══════════════════════════════════════════════════════════
   ═══════════ ALTITUDE GAUGE v3 — SCROLLING WINDOW ══════════
   ═══════════════════════════════════════════════════════════ */

/* ✅ حجم النافذة (بالبكسل العالمي) — كل ما تراه في المؤشر */
const GAUGE_WINDOW_PX = 2400;

/* ═══ تعريف المناطق (تمتد على المحور العالمي) ═══ */
const GAUGE_ZONE_DEFS = [
  /* ═══ UNDERGROUND ═══ */
  { from: -Infinity, to: -2600, c1: '#4A0810', c2: '#1A0208', label: 'CORE',       icon: '⚫', accent: '#FFD060' },
  { from: -2600, to: -1800,     c1: '#040208', c2: '#000000', label: 'VOID',       icon: '🌑', accent: '#C080FF' },
  { from: -1800, to: -1100,     c1: '#1A0838', c2: '#0A0420', label: 'ABYSS',      icon: '👁',  accent: '#A080FF' },
  { from: -1100, to: -500,      c1: '#8E2018', c2: '#3A1010', label: 'MAGMA',      icon: '🌋', accent: '#FF5020' },
  { from: -500,  to: -100,      c1: '#5E4028', c2: '#2A1810', label: 'CAVES',      icon: '🕳',  accent: '#8E6A48' },

  /* ═══ GROUND ═══ */
  { from: -100,  to: 900,       c1: '#6B9B37', c2: '#5E3223', label: 'GROUND',     icon: '🌍', accent: '#E86A2E' },

  /* ═══ SKY ═══ */
  { from: 900,   to: 1400,      c1: '#E8F4FF', c2: '#A8D8FF', label: 'CLOUDS',     icon: '☁',  accent: '#FFFFFF' },
  { from: 1400,  to: 2000,      c1: '#8E7A68', c2: '#4A5878', label: 'RUINS',      icon: '🏛', accent: '#C8B8A0' },
  { from: 2000,  to: 2700,      c1: '#5A5A70', c2: '#2A2A40', label: 'STORM',      icon: '⛈',  accent: '#FFE060' },
  { from: 2700,  to: 3500,      c1: '#B080E8', c2: '#6040A8', label: 'CRYSTAL',    icon: '💎', accent: '#E0D0FF' },
  { from: 3500,  to: 6200,      c1: '#E8B34E', c2: '#A07028', label: 'GOLDEN GATE',icon: '✨', accent: '#FFF4C0' },

  /* ═══ PLANETS — كل كوكب منفصل ═══ */
  { from: 6200,  to: 7600,      c1: '#6A5040', c2: '#1A1A1A', label: 'MERCURY',    icon: '☿', accent: '#FFA060' },
  { from: 7600,  to: 9000,      c1: '#E8A050', c2: '#8A3A20', label: 'VENUS',      icon: '♀', accent: '#FFD060' },
  { from: 9000,  to: 10400,     c1: '#9E4A28', c2: '#5A2810', label: 'MARS',       icon: '♂', accent: '#FF7030' },
  { from: 10400, to: 11800,     c1: '#8A6A48', c2: '#4A3020', label: 'JUPITER',    icon: '♃', accent: '#E8B890' },
  { from: 11800, to: 13200,     c1: '#C0A878', c2: '#6A5838', label: 'SATURN',     icon: '♄', accent: '#FFE8B0' },
  { from: 13200, to: 14600,     c1: '#4A8890', c2: '#244850', label: 'URANUS',     icon: '♅', accent: '#80FFFF' },
  { from: 14600, to: 16000,     c1: '#2A3888', c2: '#101840', label: 'NEPTUNE',    icon: '♆', accent: '#80C0FF' },
  { from: 16000, to: Infinity,  c1: '#0A0420', c2: '#02000A', label: 'DEEP SPACE', icon: '🌟', accent: '#FFD060' }
];

/* ═══ ارتفاع افتراضي (يدعم عالم الكواكب) ═══ */
function getGaugeAltitudePx(){
  if(G.realm === REALM.PLANET && G.planet){
    /* نضع كل كوكب في منتصف نطاقه */
    return PLANET_ENTER_ALT + (G.planetIdx + 0.5) * PLANET_SPACING;
  }
  return getPlayerAltitude();
}

/* ═══ الحصول على المنطقة الحالية ═══ */
function getCurrentGaugeZone(alt){
  for(const z of GAUGE_ZONE_DEFS){
    if(alt >= z.from && alt < z.to) return z;
  }
  return GAUGE_ZONE_DEFS[5];  /* GROUND */
}

/* ═══ إنشاء بركة DOM للمناطق مرة واحدة ═══ */
function ensureGaugeZonePool(){
  const track = document.getElementById('gauge-track');
  if(!track){
    console.warn('[Gauge] #gauge-track NOT FOUND');
    return;
  }
  if(track._pool) return;  /* موجود مسبقاً */

  const marker = document.getElementById('gauge-marker');
  if(!marker){
    console.warn('[Gauge] #gauge-marker NOT FOUND');
    return;
  }

  /* احذف المناطق الثابتة القديمة (إن وُجدت في HTML) */
  Array.from(track.children).forEach(child => {
    if(child.id !== 'gauge-marker') child.remove();
  });

  /* ابنِ pool من عناصر قابلة لإعادة الاستخدام */
  const pool = [];
  for(const def of GAUGE_ZONE_DEFS){
    const el = document.createElement('div');
    el.className = 'gauge-zone';
    el.style.display = 'none';
    el.setAttribute('data-zone', def.label);
    el.title = def.label;
    track.insertBefore(el, marker);
    pool.push({ el, def });
  }
  track._pool = pool;
}

/* ═══ رسم المناطق داخل النافذة ═══ */
function renderGaugeZones(windowMin, windowSpan){
  const track = document.getElementById('gauge-track');
  if(!track || !track._pool) return;

  for(const { el, def } of track._pool){
    const zFrom = (def.from === -Infinity) ? -999999 : def.from;
    const zTo   = (def.to   === Infinity)  ?  999999 : def.to;

    /* ═══ اقصر المنطقة على النافذة ═══ */
    const visFrom = Math.max(zFrom, windowMin);
    const visTo   = Math.min(zTo,   windowMin + windowSpan);

    if(visFrom >= visTo){
      if(el.style.display !== 'none') el.style.display = 'none';
      continue;
    }

    /* ═══ نسب على الشريط (0 = أسفل، 1 = أعلى) ═══ */
    const fromPct = (visFrom - windowMin) / windowSpan;
    const toPct   = (visTo   - windowMin) / windowSpan;

    el.style.display = 'block';
    el.style.bottom = (fromPct * 100) + '%';
    el.style.height = ((toPct - fromPct) * 100) + '%';
    el.style.background = `linear-gradient(180deg, ${def.c1}, ${def.c2})`;
  }
}

/* ═══ التحديث الديناميكي ═══ */
function updateAltitudeGauge(){
  const gauge = document.getElementById('altitude-gauge');
  if(!gauge) return;

  /* ASCEND له نظامه الخاص */
  if(G.mode === 'ASCEND'){
    gauge.classList.remove('show');
    return;
  }

  /* في ASCEND نستخدم sky colors، لا نحتاج المؤشر */

  const inPlanet = (G.realm === REALM.PLANET);
  const altPx = getGaugeAltitudePx();
  const altM  = altPx / PIXELS_PER_METER;

  /* إخفاء عندما نكون قريبين جداً من الأرض (ولسنا في الكوكب) */
  if(!inPlanet && Math.abs(altM) < 3){
    gauge.classList.remove('show');
    return;
  }

  gauge.classList.add('show');

  /* ═══════════════════════════════════════════════════════
     ✅ النافذة تتمركز حول موضع اللاعب
     ═══════════════════════════════════════════════════════ */
  const windowMin = altPx - GAUGE_WINDOW_PX / 2;

  renderGaugeZones(windowMin, GAUGE_WINDOW_PX);

  /* ═══ المؤشر دائماً في المنتصف (النافذة تتحرك مع اللاعب) ═══ */
  const marker = document.getElementById('gauge-marker');
  if(marker){
    marker.style.bottom = '50%';
  }

  /* ═══ قراءة الارتفاع ═══ */
  const valEl = document.getElementById('gauge-val');
  if(valEl){
    const rounded = Math.round(altM);
    valEl.textContent = (rounded > 0 ? '+' : '') + rounded;
  }

  /* ═══ المنطقة الحالية ═══ */
  const zone = getCurrentGaugeZone(altPx);
  const zoneLabel = document.getElementById('gauge-zone-label');
  if(zoneLabel && zone){
    zoneLabel.textContent = zone.icon + ' ' + zone.label;
    zoneLabel.style.color = zone.accent;
  }

  /* ═══ لون الإطار ═══ */
  const readout = document.getElementById('gauge-readout');
  if(readout && zone){
    readout.style.borderColor = zone.accent + '80';
    readout.style.boxShadow = `0 4px 14px rgba(0,0,0,.25), 0 0 0 1px ${zone.accent}40`;
  }
}

/* ─────────────────────────────────────────────────────────────
   نداء موحّد من حلقة اللعب
   ───────────────────────────────────────────────────────────── */
function updateHudOverlays(){
  updateContextBanner();
  updateAltitudeGauge();
  updatePlanetHUD();
}

function updatePlanetHUD(){
  if(G.realm !== REALM.PLANET || !G.planet){
    const el = document.getElementById('planet-hud');
    if(el) el.style.opacity = '0';
    return;
  }

  let el = document.getElementById('planet-hud');
  if(!el){
    el = document.createElement('div');
    el.id = 'planet-hud';
    el.style.cssText = `
      position:absolute;top:112px;right:14px;
      display:flex;flex-direction:column;gap:4px;
      padding:8px 10px;border-radius:12px;
      background:rgba(15,12,10,.78);
      backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,.12);
      color:#fff;font-family:'Space Grotesk',sans-serif;
      font-size:9.5px;font-weight:700;letter-spacing:.5px;
      z-index:6;pointer-events:none;
      transition:opacity .3s;
    `;
    document.getElementById('wrap').appendChild(el);
  }

  el.style.opacity = '1';
  const p = G.planet;

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
      <span style="font-size:14px;">${p.icon}</span>
      <span style="color:${p.accent};font-weight:800;letter-spacing:1.5px;">${p.name}</span>
    </div>
    <div style="display:flex;justify-content:space-between;gap:12px;opacity:.75;">
      <span>🌡 ${p.temperature}</span>
      <span>⚖ ${p.gravity.toFixed(2)}g</span>
    </div>
    <div style="display:flex;justify-content:space-between;gap:12px;opacity:.75;margin-top:2px;">
      <span>💨 ${(p.wind * 100).toFixed(0)}%</span>
      <span>☢ ${(p.radiation * 100).toFixed(0)}%</span>
    </div>
  `;
}

function updateLevelUI(){
  const pct = getLevelProgress() * 100;
  const lv  = getLevelIndex() + 1;
  const bar = document.getElementById('level-bar');
  const num = document.getElementById('level-num');
  if(bar) bar.style.width = pct + '%';
  if(num) num.textContent = lv;
}

function updateCoinsUI(){
  const unlimited = hasAdminAccess() && Save.data.admin.unlimitedCoins;
  const home = document.getElementById('home-coins');
  const shop = document.getElementById('shop-coins');
  if(home) home.textContent = unlimited ? '' : Save.data.coins;
  if(shop) shop.textContent = unlimited ? '' : Save.data.coins;
  const w = document.getElementById('wrap');
  if(w) w.classList.toggle('unlimited-coins', unlimited);
}

/* ============================================================
   ==================== CAMERA (مطوّرة) ======================
   ============================================================ */
function updateCamera(){
  if(G.mode === 'ASCEND'){
    G.camY = 0;
    G.camTargetY = 0;
    G.camYUnder = 0;
    return;
  }
  if(G.mode !== 'WALK') return;

  const alt = getPlayerAltitude();
  const TRIGGER = 220;

  /* ═══ كاميرا السماء ═══ */
const skyTarget = Math.max(0, alt - TRIGGER);
G.camTargetY = skyTarget;   /* ← إزالة السقف H*4 */
G.camY = lerp(G.camY, G.camTargetY, 0.09);

  /* ═══ كاميرا الأعماق — تجعل اللاعب دائماً عند 35% من الشاشة ═══ */
  const depth = Math.max(0, -alt);
  let underTarget = 0;

  if(depth > 0){
    /* الموضع المثالي للاعب على الشاشة = 35% من الارتفاع */
    const playerFollow = Math.max(0, P.y - H * 0.35);

    /* انتقال تدريجي من "كاميرا الأرض" إلى "كاميرا الأعماق" */
    const blendEnd = 250;
    const t = clamp(depth / blendEnd, 0, 1);
    const tEased = t * t * (3 - 2 * t);   /* smoothstep */

    underTarget = depth * (1 - tEased) + playerFollow * tEased;
  }

G.camYUnder = lerp(G.camYUnder, underTarget, 0.09);   /* ← إزالة السقف */

  if(Math.abs(G.camY - G.camTargetY) < 0.5) G.camY = G.camTargetY;
  if(Math.abs(G.camYUnder - underTarget) < 0.5) G.camYUnder = underTarget;
}

/* ============================================================
   ==================== REALM HELPERS ========================
   ============================================================ */

/* ─────────────────────────────────────────────────────────────
   حساب إزاحة اللاعب عن مستوى الأرض
   موجب = اللاعب فوق الأرض | سالب = اللاعب تحت الأرض
   ───────────────────────────────────────────────────────────── */
function getPlayerAltitude(){
  return (GROUND_Y - P.r) - P.y;
}

/* ─────────────────────────────────────────────────────────────
   تحديد طبقة السماء حسب الارتفاع
   يُعيد الفهرس (0 = أدنى طبقة)
   ───────────────────────────────────────────────────────────── */
function getSkyLayer(altitude){
  const layers = SKY_REALM.layers;
  for(let i = layers.length - 1; i >= 0; i--){
    if(altitude >= layers[i].from) return i;
  }
  return 0;
}

/* ─────────────────────────────────────────────────────────────
   تحديد طبقة الأعماق حسب العمق
   يُعيد الفهرس (0 = أدنى طبقة)
   ───────────────────────────────────────────────────────────── */
function getUnderLayer(depth){
  const layers = UNDER_REALM.layers;
  for(let i = layers.length - 1; i >= 0; i--){
    if(depth >= layers[i].from) return i;
  }
  return 0;
}

/* ─────────────────────────────────────────────────────────────
   دوال مساعدة إضافية (اختيارية لكن مفيدة)
   ───────────────────────────────────────────────────────────── */

/* هل اللاعب في عالم السماء؟ */
function isInSkyRealm(){
  return G.realm === REALM.SKY;
}

/* هل اللاعب في عالم الأعماق؟ */
function isInUnderRealm(){
  return G.realm === REALM.UNDERGROUND;
}

/* الحصول على بيانات الطبقة الحالية في السماء */
function getCurrentSkyLayer(){
  return SKY_REALM.layers[G.skyLayerIdx] || SKY_REALM.layers[0];
}

/* الحصول على بيانات الطبقة الحالية في الأعماق */
function getCurrentUnderLayer(){
  return UNDER_REALM.layers[G.underLayerIdx] || UNDER_REALM.layers[0];
}

/* الحصول على ارتفاع اللاعب بالنسبة للشاشة (0-1) */
function getPlayerScreenRatio(){
  return clamp(P.y / H, 0, 1);
}

/* ═══════════════ UNDER FLOORS SYSTEM ═══════════════ */
function getUnderFloorWorldY(floorIdx){
  return GROUND_Y + (floorIdx + 1) * UNDER_FLOOR_SPACING;
}

function isPlayerOverUnderHole(floorIdx){
  const offset = floorIdx * 431;
  const playerWorldX = G.dist + P.baseX;
  
  /* ═══ حدّد نوع الطابق: غرفة واسعة أم عادي ═══ */
  const isChamber = (floorIdx % UNDER_CHAMBER_EVERY === 0) && (floorIdx > 0);
  const holeWidth = isChamber ? UNDER_CHAMBER_HOLE_WIDTH : UNDER_FLOOR_HOLE_WIDTH;
  const holePeriod = isChamber ? UNDER_FLOOR_HOLE_PERIOD * 1.5 : UNDER_FLOOR_HOLE_PERIOD;
  
  const localX = ((playerWorldX - offset) % holePeriod + holePeriod) % holePeriod;
  return localX < holeWidth;
}

function checkUnderFloorCollision(){
  if(P.vy < 0) return null;
  const feetY = P.y + P.r;
  if(feetY <= GROUND_Y + 30) return null;
  
  const prevFeetY = feetY - P.vy;
  const depth = feetY - GROUND_Y;
  const idxLow = Math.max(0, Math.floor(depth / UNDER_FLOOR_SPACING) - 2);
  const idxHigh = Math.floor(depth / UNDER_FLOOR_SPACING) + 1;
  
  for(let idx = idxLow; idx <= idxHigh; idx++){
    const floorY = getUnderFloorWorldY(idx);
    if(prevFeetY <= floorY && feetY >= floorY){
      if(!isPlayerOverUnderHole(idx)){
        return { floorIdx: idx, floorY };
      }
    }
  }
  return null;
}

/* دخول عالم جديد */
function enterRealm(newRealm){
  if(G.realm === newRealm) return;
  G.realmFrom = G.realm;
  G.realmTo = newRealm;
  G.realmTransition = 0;
  G.realm = newRealm;

  const layerName = newRealm === REALM.SKY
    ? SKY_REALM.layers[0].name
    : newRealm === REALM.UNDERGROUND
      ? UNDER_REALM.layers[0].name
      : 'GROUND';

  const layerAr = newRealm === REALM.SKY
    ? SKY_REALM.layers[0].ar
    : newRealm === REALM.UNDERGROUND
      ? UNDER_REALM.layers[0].ar
      : 'الأرض';

  const bannerText = newRealm === REALM.SKY ? '☁ SKY REALM'
                    : newRealm === REALM.UNDERGROUND ? '⛏ UNDER REALM'
                    : '🌍 GROUND';
  showBanner(bannerText, layerAr);

  Sfx.play(newRealm === REALM.SKY ? 880 : 220, 0.6, 'sine', 0.07, newRealm === REALM.SKY ? 1760 : 110);
  shake(15); haptic(35);

  /* انفجار بصري عند الانتقال */
  for(let i = 0; i < 40; i++){
    const a = (i/40) * Math.PI * 2;
    particles.push({
      x: P.x, y: P.y,
      vx: Math.cos(a) * rand(6, 12),
      vy: Math.sin(a) * rand(6, 12),
      life: 1.4, decay: 0.016,
      color: newRealm === REALM.SKY ? '#A8D8FF' : newRealm === REALM.UNDERGROUND ? '#FF8060' : '#FFFFFF',
      size: rand(3, 6)
    });
  }
}

function enterPlanetRealm(planet){
  if(G.realm === REALM.PLANET && G.planet && G.planet.id === planet.id) return;

  G.realmFrom = G.realm;
  G.realmTo = REALM.PLANET;
  G.realmTransition = 0;
  G.realm = REALM.PLANET;
  G.planet = planet;
  G.planetIdx = PLANETS.indexOf(planet);

  /* صفّي العالم القديم */
  obstacles = []; orbs = []; coins = []; powerups = [];
  particles = []; floats = [];
  G.planetFloors = [];
  /* ✅ إصلاح: تصفير الطقس الأرضي عند دخول الكوكب */
G.weather = [];

/* ✅ إصلاح: إيقاف أي برق أرضي */
G.lightningFlash = 0;
G.lightningTimer = 0;

  /* ضع اللاعب على سطح الكوكب */
  P.x = P.baseX;
  P.y = GROUND_Y - P.r;
  P.vx = 0; P.vy = 0;
  P.onGround = true;
  P.jumps = 0;
  P.coyoteTimer = 0;
  P.trail = [];

  /* كاميرا مستقرة */
  G.camY = 0;
  G.camTargetY = 0;
  G.camYUnder = 0;

  /* أرضية الكوكب الرئيسية */
  G.planetFloors.push({
    x: -200,
    w: W + 400,
    y: GROUND_Y,
    h: 400,
    type: 'planetFloor',
    isWalk: true,
    isPlatform: true,
    isPlanetFloor: true,
    solid: true,
    t: 0, passed: false, dead: false
  });

  /* ═══ حفر في أرضية الكوكب (تنزل للأرض أو الكوكب التالي) ═══ */
  const holeCount = 3 + Math.floor(Math.random() * 3);
  for(let i = 0; i < holeCount; i++){
    const hx = W + 300 + i * rand(500, 900);
    G.planetFloors.push({
      x: hx, w: rand(130, 200),
      y: GROUND_Y,
      h: 400,
      type: 'planetHole',
      isPlanetHole: true,
      t: 0, passed: false, dead: false
    });
  }

  /* ═══ أرضيات عائمة تسقط عشوائياً ═══ */
  const floatCount = 4 + Math.floor(Math.random() * 4);
  for(let i = 0; i < floatCount; i++){
    G.planetFloors.push({
      x: W + 400 + i * rand(400, 700),
      w: rand(80, 160),
      y: GROUND_Y - rand(120, 320),
      h: 14,
      type: 'planetFloat',
      isWalk: true,
      isPlatform: true,
      isPlanetFloat: true,
      fallTimer: 90 + Math.floor(Math.random() * 180),
      fallDelay: 0,
      falling: false,
      fallVy: 0,
      solid: false,
      t: 0, passed: false, dead: false
    });
  }

  showBanner('🪐 ' + planet.name, planet.ar + ' · ' + planet.tempText);
/* ═══ تأثير Warp — شاشة بيضاء + جسيمات ═══ */
G.flash = 1.0;
shake(35);
haptic(60);

/* ═══ انفجار جسيمات ملونة ═══ */
for(let i = 0; i < 100; i++){
  const a = (i / 100) * Math.PI * 2;
  const speed = rand(8, 22);
  particles.push({
    x: P.x, y: P.y,
    vx: Math.cos(a) * speed,
    vy: Math.sin(a) * speed,
    life: 1.8, decay: 0.014,
    color: i % 3 === 0 ? planet.accent : (i % 3 === 1 ? '#FFFFFF' : planet.groundTop),
    size: rand(3, 8)
  });
}

/* ═══ حلقات صدمية متعددة ═══ */
for(let ring = 0; ring < 5; ring++){
  const ringDelay = ring * 80;
  setTimeout(() => {
    for(let i = 0; i < 24; i++){
      const a = (i / 24) * Math.PI * 2;
      const speed = 6 + ring * 2;
      particles.push({
        x: P.x, y: P.y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        life: 1.2, decay: 0.02,
        color: planet.accent,
        size: 3 + ring
      });
    }
  }, ringDelay);
}

/* ═══ بانر ═══ */
showBanner('🪐 ' + planet.name, planet.ar + ' · ' + planet.temperature);
Sfx.play(660, 0.8, 'sine', 0.08, 1760);
  shake(25); haptic(45);

  /* انفجار بصري */
  for(let i = 0; i < 60; i++){
    const a = (i/60) * Math.PI * 2;
    particles.push({
      x: P.x, y: P.y,
      vx: Math.cos(a) * rand(8, 16),
      vy: Math.sin(a) * rand(8, 16),
      life: 1.8, decay: 0.014,
      color: planet.accent,
      size: rand(3, 7)
    });
  }
}

function exitPlanetRealm(){
  if(G.realm !== REALM.PLANET) return;
  G.realm = REALM.GROUND;
  G.planet = null;
  G.planetFloors = [];
  G.realmFrom = REALM.PLANET;
  G.realmTo = REALM.GROUND;
  G.realmTransition = 0;
  G.camY = 0;
  G.camTargetY = 0;
}

/* ═══ التقدم للكوكب التالي ═══ */
function advanceToNextPlanet(){
  if(G.realm !== REALM.PLANET) return;

  const nextIdx = G.planetIdx + 1;

  /* ═══ أنجزت كل الكواكب ═══ */
  if(nextIdx >= PLANETS.length){
    showBanner('🏆 ALL PLANETS CLEARED', 'أكملت المجموعة الشمسية!');
    Sfx.reward(); haptic(50); shake(30);
    G.flash = 1;
    /* احتفظ بالعملات والكرات */
    const preservedCoins = G.runCoins;
    const preservedOrbs  = G.orbCount;
    returnToEarth();
    G.runCoins = preservedCoins;
    G.orbCount = preservedOrbs;
    return;
  }

  /* ═══ انتقل للكوكب التالي ═══ */
  const nextPlanet = PLANETS[nextIdx];

  /* احفظ المكاسب */
  const preservedCoins = G.runCoins;
  const preservedOrbs  = G.orbCount;

  showBanner('🪐 ' + nextPlanet.name,
             nextPlanet.ar + ' · كوكب ' + (nextIdx + 1) + ' / ' + PLANETS.length);
  Sfx.reward(); haptic(35); shake(20);
  G.flash = 0.6;

  enterPlanetRealm(nextPlanet);

  /* استرجع المكاسب */
  G.runCoins = preservedCoins;
  G.orbCount = preservedOrbs;
}

/* ============================================================
   ═══════════ TRANSITION TO NEXT PLANET ═══════════════════
   انتقال سينمائي ناعم بين الكواكب
   ============================================================ */
function transitionToNextPlanet(){
  if(G.realm !== REALM.PLANET || G._transitioning) return;
  G._transitioning = true;

  const nextIdx = G.planetIdx + 1;

  /* ═══ آخر كوكب: أكملت المجموعة الشمسية! ═══ */
  if(nextIdx >= PLANETS.length){
    showBanner('🏆 ALL PLANETS CLEARED', 'أكملت المجموعة الشمسية!');
    Sfx.reward(); haptic(80); shake(40);
    G.flash = 1;

    /* احتفظ بالمكاسب */
    const preservedCoins = G.runCoins;
    const preservedOrbs  = G.orbCount;

    setTimeout(() => {
      returnToEarth();
      G.runCoins = preservedCoins;
      G.orbCount = preservedOrbs;
      G._transitioning = false;
    }, 1200);
    return;
  }

  const nextPlanet = PLANETS[nextIdx];
  const preservedCoins = G.runCoins;
  const preservedOrbs  = G.orbCount;

  /* ═══ 1) تأثير Warp بصري مكثّف ═══ */
  G.flash = 1;
  shake(30);
  haptic(50);

  /* ═══ 2) انفجار جسيمات متسلسل ═══ */
  for(let wave = 0; wave < 3; wave++){
    setTimeout(() => {
      for(let i = 0; i < 60; i++){
        const a = (i / 60) * Math.PI * 2;
        const speed = rand(6, 16) + wave * 4;
        particles.push({
          x: P.x, y: P.y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          life: 1.6, decay: 0.014,
          color: wave % 2 === 0 ? nextPlanet.accent : '#FFFFFF',
          size: rand(3, 7)
        });
      }
    }, wave * 150);
  }

  /* ═══ 3) صوت الانتقال ═══ */
  Sfx.play(440, 0.6, 'sine', 0.08, 1320);

  /* ═══ 4) بانر الكوكب الجديد ═══ */
  showBanner('🪐 ' + nextPlanet.name,
             nextPlanet.ar + ' · كوكب ' + (nextIdx + 1) + '/' + PLANETS.length);

  /* ═══ 5) تأخير قصير ثم الانتقال الفعلي ═══ */
  setTimeout(() => {
    enterPlanetRealm(nextPlanet);

    /* استرجع المكاسب */
    G.runCoins = preservedCoins;
    G.orbCount = preservedOrbs;
    G._transitioning = false;
  }, 700);
}

/* ═══ العودة للأرض (عبر السقوط في السماء) ═══ */
function returnToEarth(){
  if(G.realm !== REALM.PLANET) return;

  /* ═══ رجّع اللاعب لعالم السماء على ارتفاع منخفض ═══ */
  G.realmFrom = REALM.PLANET;
  G.realmTo = REALM.SKY;
  G.realm = REALM.SKY;
  G.realmTransition = 0;
  G.skyLayerIdx = 0;

  /* نظّف بيانات الكوكب */
  G.planet = null;
  G.planetIdx = 0;
  G.planetFloors = [];
  G.planetEntering = 0;

  /* ضع اللاعب في السماء قريباً من الأرض */
  P.x = P.baseX;
  P.y = GROUND_Y - 800;    // فوق عتبة الخروج (700) بقليل
  P.vx = 0;
  P.vy = 3;                 // ابدأ السقوط بسرعة
  P.onGround = false;
  P.jumps = 0;
  P.trail = [];

  /* ✅ إعادة الكاميرا لتتبع الارتفاع */
  G.camY = 800 - 220;       // TRIGGER = 220
  G.camTargetY = G.camY;
  G.camYUnder = 0;

  showBanner('🏠 RETURNING', 'تسقط نحو الأرض...');
  Sfx.reward(); haptic(25);
}

/* التحقق من الانتقال بين العوالم */
function checkRealmTransition(){
  if(G.mode !== 'WALK') return;

  const alt = getPlayerAltitude();

  if(G.realm === REALM.GROUND){
    if(alt >= SKY_REALM.enterOffset){
      enterRealm(REALM.SKY);
    } else if(alt <= -UNDER_REALM.enterOffset){
      enterRealm(REALM.UNDERGROUND);
    }
  } else if(G.realm === REALM.SKY){
    if(alt <= SKY_REALM.exitOffset){
      enterRealm(REALM.GROUND);
    }
  } else if(G.realm === REALM.UNDERGROUND){
    if(alt >= -UNDER_REALM.exitOffset){
      enterRealm(REALM.GROUND);
    }
  }

  /* تحديث طبقة السماء */
  if(G.realm === REALM.SKY){
    const newIdx = getSkyLayer(alt);
    if(newIdx !== G.skyLayerIdx){
      G.skyLayerIdx = newIdx;
      const layer = SKY_REALM.layers[newIdx];
      showBanner('SKY ' + (newIdx+1), layer.ar);
      Sfx.level(); haptic(20);
      if(!G.skyLayersVisited.includes(newIdx)){
        G.skyLayersVisited.push(newIdx);
      }
    }
  }

  /* تحديث طبقة الأعماق */
  if(G.realm === REALM.UNDERGROUND){
    const newIdx = getUnderLayer(-alt);
    if(newIdx !== G.underLayerIdx){
      G.underLayerIdx = newIdx;
      const layer = UNDER_REALM.layers[newIdx];
      showBanner('DEPTH ' + (newIdx+1), layer.ar);
      Sfx.play(180, 0.5, 'sine', 0.06, 80); haptic(25);
      if(!G.underLayersVisited.includes(newIdx)){
        G.underLayersVisited.push(newIdx);
      }
    }
  }
/* ═══ دخول عالم الكوكب ═══ */
if(G.realm === REALM.SKY && alt >= PLANET_ENTER_ALT){
  /* ✅ ابدأ دائماً بعطارد عند أول دخول */
  const planet = getPlanetByAltitude(alt);
  enterPlanetRealm(planet);
}
}

/* ============================================================
   ==================== SHIFT GATE SYSTEM ====================
   ============================================================ */
function spawnShiftGate(targetMode){
  const color = MODE_COLORS[targetMode] || '#A06AD8';
  const icon  = MODE_ICONS[targetMode]  || '◆';

  obstacles.push({
    x: W + 80,
    w: 44,
    h: GROUND_Y - CEILING_H,
    y: CEILING_H,
    type: 'shiftGate',
    isShiftGate: true,
    isWalk: true,
    targetMode,
    gateColor: color,
    gateIcon: icon,
    t: 0, passed: false, dead: false,
    color: color,
    damage: false
  });

  Sfx.play(440, 0.15, 'sine', 0.04, 660);
}

function checkShiftGateSpawn(){
  /* فقط في الوضع المتنوّع */
  if(!G.isMixedMode) return;
  if(G.pendingShift) return;

  G.distSinceGate += G.speed;
  const gateThreshold = SEGMENT_LENGTH_METERS * PIXELS_PER_METER;

  if(G.distSinceGate >= gateThreshold){
    G.distSinceGate = 0;

    /* اختر نمطاً عشوائياً مختلفاً عن الحالي */
    const allModes = ['FLIP','FLAP','DRIFT','WALK'];
    const available = allModes.filter(m => m !== G.mode);
    const nextMode = available[Math.floor(Math.random() * available.length)];

    spawnShiftGate(nextMode);
    G.pendingShift = true;
  }
}

/* ✅ الإصلاح 7: مسح العقبات البعيدة عند التحول */
function performShift(targetMode){
  if(G.shiftGrace > 0) return;

  const oldMode = G.mode;
  G.mode = targetMode;

  /* ✅ نظّف كل العقبات القادمة (حتى تلك على الشاشة) لمنع التداخل */
  for(const o of obstacles){
    if(o.isShiftGate) continue;
    /* احذف كل عقبة لم تتجاوز اللاعب بعد */
    if(o.x + o.w > P.x - 40) o.dead = true;
  }

  G.shiftGrace = 90;
  G.invuln = Math.max(G.invuln, 120);

  if(targetMode === 'WALK'){
    P.y = Math.min(P.y, GROUND_Y - P.r - 20);
    P.vy = 0;
    P.gravityDir = 1;
  } else if(targetMode === 'FLIP'){
    P.gravityDir = P.y > H/2 ? 1 : -1;
    P.vy = 0;
  } else if(targetMode === 'FLAP'){
    P.vy = -2;
  }

  P.trail = [];

  const modeData = MODES.find(m => m.id === targetMode);
  showBanner('SHIFT: ' + (modeData ? modeData.ar : targetMode), MODE_ICONS[targetMode] + ' ' + (modeData ? modeData.en : ''));
  Sfx.play(520, 0.5, 'sine', 0.07, 1320);

  /* ✅ إعادة ضبط فيزياء اللاعب حسب النمط الجديد */
  if(targetMode === 'WALK'){
    P.vy = Math.min(P.vy, 0);
    P.jumps = 0;
    P.coyoteTimer = 0;
  } else if(targetMode === 'FLIP'){
    P.gravityDir = P.y > H/2 ? 1 : -1;
    P.vy = 0;
  }
  shake(15); haptic(30);

  const col = MODE_COLORS[targetMode] || '#FFFFFF';
  for(let i=0;i<40;i++){
    const a = (i/40)*Math.PI*2;
    particles.push({
      x: P.x, y: P.y,
      vx: Math.cos(a)*rand(5,12), vy: Math.sin(a)*rand(5,12),
      life: 1.4, decay: 0.016, color: col, size: rand(3,7)
    });
  }

  G.pendingShift = false;

  /* إعادة ضبط الكاميرا عند مغادرة WALK */
  if(oldMode === 'WALK' && targetMode !== 'WALK'){
    G.camTargetY = 0;
  }
}

/* ============================================================
   ==================== Update ===============================
   ============================================================ */
function updateGameplay(){
  const prog = getProgression();
  const s = G.currentScene;

  updatePowerups();
  updateCombo();
  checkRealmTransition();

  /* ✅ تحديث انتقال العوالم */
if(G.realmTransition < 1){
  G.realmTransition = Math.min(1, G.realmTransition + 0.022);  // ~45 إطار ≈ 0.75s
  if(G.realmTransition >= 1){
    G.realmFrom = G.realm;   // ✅ ثبّت الحالة النهائية
  }
}

  /* ═══════════════ السرعة ═══════════════ */
let targetSpeed;
if(G.mode === 'ASCEND'){
  /* تبدأ 1.5 وتتزايد ببطء حتى 8.5 خلال 4000px */
  targetSpeed = 1.5 + Math.min(7.0, G.dist / 4000);
} else {
  targetSpeed = prog.speed * (s.speed || 1);
}
  /* تأثير التبطيء + تشويه الزمن */
  let slowMul = 1;
  if(G.activePowerups.slow)       slowMul *= 0.55;
  if(G.activePowerups.timeWarp)   slowMul *= 0.35;
  if(G.activePowerups.bulletTime) slowMul *= (G.activePowerups.bulletTime.worldMul || 0.15);
  if(G.activePowerups.haste)      slowMul *= (G.activePowerups.haste.hasteMul || 1.6);

  G.speed = lerp(G.speed, targetSpeed * slowMul, 0.035);
  G.dist += G.speed;

  /* تصغير حجم اللاعب */
  if(G.activePowerups.shrink){
    P.r = lerp(P.r, 8, 0.15);
  } else if(P.r < 13){
    P.r = lerp(P.r, 13, 0.15);
    if(Math.abs(P.r - 13) < 0.1) P.r = 13;
  }

  checkShiftGateSpawn();
  if(G.shiftGrace > 0) G.shiftGrace--;
  checkSynergies();
  updateSynergies();
  drawSynergiesUI();
  updateSparks();
    updateTrailEffect();   /* ✅ أثر خط السير */

  updateSceneTransition();
  updateWeather();

if(G.realm === REALM.PLANET) updatePlanetEffects();

  if(G.mode === 'WALK') checkSkyZoneSpawn();
if(G.mode === 'WALK') updateCamera();
else if(G.mode !== 'ASCEND' && G.camY > 0.5){   // ✅ استثناء ASCEND
  G.camTargetY = 0;
  G.camY = lerp(G.camY, 0, 0.08);
}

  const lv = getLevelIndex();
  if(lv > G.lastLevel){
    G.lastLevel = lv;
    Sfx.levelUp(); haptic(20); shake(8);
    const reward = 3;
    G.runCoins += reward;
    showBanner('LEVEL ' + (lv+1), '◆ +' + reward);
    for(let i=0;i<20;i++){
      const a = (i/20)*Math.PI*2;
      particles.push({x: P.x, y: P.y, vx: Math.cos(a)*rand(3,6), vy: Math.sin(a)*rand(3,6),
        life: 1, decay: 0.022, color: '#E8B34E', size: rand(2.5,4.5)});
    }
  }
  updateLevelUI();

  if(G.invuln > 0) G.invuln--;
  const wasOnGround = P.onGround;

  const currentAlt = Math.max(0, GROUND_Y - P.y - P.r);
  if(currentAlt > G.maxAltitude){
    G.maxAltitude = currentAlt;
  }

  P.enginePhase += 0.15;
  P.bouncePhase += 0.2;

  /* ═══════════════════════════════════════════════════════
     ═══════════════ فيزياء اللاعب حسب النمط ═══════════════
     ═══════════════════════════════════════════════════════ */

  if(G.mode==='FLIP'){
    P.vy += 0.22 * P.gravityDir;
    P.vy = clamp(P.vy,-8,8);
    P.y += P.vy;
    P.rot = Math.atan2(P.vy,10) * P.gravityDir;
    P.x = P.baseX;

  } else if(G.mode==='FLAP'){
    P.vy += 0.22; P.vy = clamp(P.vy,-6,5);
    P.y += P.vy;
    P.rot = clamp(P.vy*0.08,-0.5,0.85);
    P.x = P.baseX;

  } else if(G.mode==='DRIFT'){
    const ctrl = pointer.down || pointer.hasHover;
    if(ctrl){
      P.vx += (pointer.x - P.x)*0.045;
      P.vy += (pointer.y - P.y)*0.045;
    }
    P.vx *= 0.90; P.vy *= 0.90;
    P.vx = clamp(P.vx,-10,10); P.vy = clamp(P.vy,-10,10);
    P.x += P.vx; P.y += P.vy;
    P.rot = Math.atan2(P.vy, Math.max(2,P.vx));

} else if(G.mode === 'ASCEND'){
  /* ═══════════════ ASCEND PHYSICS (مُحسّن) ═══════════════ */
  const biome = getAscendBiome(getMeters());

  /* Jump cooldown */
  if(G.ascendJumpCooldown > 0) G.ascendJumpCooldown--;

  /* Coyote time */
  if(P.onGround){ P.coyoteTimer = 8; }
  else if(P.coyoteTimer > 0){ P.coyoteTimer--; }

  /* Jump buffer */
  if(P.jumpBufferTimer > 0){
    if(P.onGround || P.coyoteTimer > 0){
      ascendJumpUp();
      P.jumpBufferTimer = 0;
    } else {
      P.jumpBufferTimer--;
    }
  }

  /* ═══ جاذبية (لا تُطبَّق عند الوقوف) ═══ */
  if(!P.onGround){
    P.vy += 0.55;
    P.vy = Math.min(P.vy, 20);
  }

  /* ═══ احتكاك أفقي ═══ */
  if(P.onGround){
    P.vx *= 0.85;
    if(Math.abs(P.vx) < 0.1) P.vx = 0;
  } else {
    P.vx *= 0.93;
    if(Math.abs(P.vx) < 0.05) P.vx = 0;
  }

  /* ═══ الحركة ═══ */
  P.x += P.vx;
  P.y += P.vy;

  /* حدود جانبية صلبة */
  if(P.x - P.r < 0){ P.x = P.r; P.vx = 0; }
  if(P.x + P.r > W){ P.x = W - P.r; P.vx = 0; }

  /* ═══ كشف الهبوط ═══ */
  const wasOnGroundAscend = P.onGround;
  P.onGround = false;

  if(P.vy >= 0){
    for(const o of obstacles){
      if(!o.isPlatform || o.dead || o.crumbled) continue;

      /* منصات phantom: قد تكون مخفية */
      if(o.ascendType === 'phantom'){
        const t = (G.t + o.phantomPhase * 100) % o.phantomPeriod;
        if(t < o.phantomPeriod * 0.4) continue; // مخفية حالياً
      }

      const pxLeft   = P.x - P.r * 0.75;
      const pxRight  = P.x + P.r * 0.75;
      const pyBottom = P.y + P.r;
      const oTop     = o.y;

      /* الهبوط من الأعلى فقط */
      if(pxRight > o.x + 3 && pxLeft < o.x + o.w - 3){
        const prevBottom = pyBottom - P.vy;

        /* تسامح أكبر لمنع الاهتزاز */
        if(prevBottom <= oTop + 10 && pyBottom >= oTop - 2){
          P.y = oTop - P.r;

          /* ═══ منصة نابضة ═══ */
          if(o.bounceBoost){
            P.vy = o.bounceBoost;
            P.onGround = false;
            P.jumps = 0;

            spawnJumpEffect(P.x, oTop, o.topColor || o.accent);
            for(let i = 0; i < 14; i++){
              const a = (i / 14) * Math.PI * 2;
              particles.push({ x: P.x, y: oTop,
                vx: Math.cos(a) * rand(3, 6), vy: Math.sin(a) * rand(2, 5) - 3,
                life: 1, decay: 0.028, color: '#FFE090', size: rand(2, 4) });
            }
            Sfx.play(560, 0.18, 'sine', 0.06, 1200);
            haptic(12); shake(4);
          } else {
            /* ═══ منصة عادية: ثبات تام ═══ */
            P.vy = 0;
            P.vx *= 0.3;
            P.onGround = true;
            P.jumps = 0;

            if(!wasOnGroundAscend){
              spawnJumpEffect(P.x, oTop, o.topColor || o.accent);
              Sfx.bounce(); haptic(4);
            }

            /* بدء تفكك المنصة الهشة */
            if(o.platformType === 'crumble' && o.crumbleTimer === 0){
              o.crumbleTimer = 55;
            }
          }
          break;
        }
      }
    }
  }

  /* ═══ منصات phantom تتلاشى (تُظهر تحذير قبل الاختفاء) ═══ */
  for(const o of obstacles){
    if(o.ascendType !== 'phantom' || o.dead) continue;
    const t = (G.t + o.phantomPhase * 100) % o.phantomPeriod;
    /* نطاق 0-40% مخفية، 40-100% ظاهرة */
  }

  /* ✅✅✅ ضع الكود الجديد هنا ✅✅✅ */
  /* ✅ إعادة ضبط العدّاد في الطيران المستمر */
  const ascendAdminFly = hasAdminAccess() && Save.data.admin.infiniteJump;
  if((G.infiniteJump > 0 || ascendAdminFly) && P.onGround){
    P.jumps = 0;
  }
  /* ✅✅✅ نهاية الكود الجديد ✅✅✅ */

  /* ═══ الكاميرا: اللاعب دائماً عند 40% من الشاشة (يُرى أكثر فوقه) ═══ */
  const CAM_ANCHOR = 0.42;
  const targetCamY = H * CAM_ANCHOR - P.y;
  G.camTargetY = Math.max(G.camTargetY, targetCamY);
  G.camY = lerp(G.camY, G.camTargetY, 0.14);

  /* ═══ الموت عند السقوط ═══ */
  const screenY = P.y + G.camY;
  if(screenY > H + 60){
    return gameOver();
  }

  /* ═══ الدوران حسب الحركة الأفقية ═══ */
  P.rot = clamp(P.vx * 0.035, -0.35, 0.35);

  /* ═══ أنيميشن الأرجل ═══ */
  P.legPhase += P.onGround ? 0.3 : 0.08;
  P.walkAnim += P.onGround ? 0.2 : 0.08;

  /* ═══ أثر في الهواء ═══ */
  if(!P.onGround && G.t % 3 === 0){
    P.trail.push({ x: P.x, y: P.y });
    if(P.trail.length > 8) P.trail.shift();
  } else if(P.trail.length){
    P.trail.shift();
  }

  /* ═══ توليد المنصات فوق ═══ */
  updateAscendSpawner();

  /* ═══ تنظيف المنصات البعيدة ═══ */
  cleanupAscendPlatforms();
} else if(G.mode==='WALK'){

    /* ═══════════════════════════════════════════════════════
       ═══ فرع الكوكب الجديد — يوضع هنا قبل فيزياء WALK ═══
       ═══════════════════════════════════════════════════════ */
    if(G.realm === REALM.PLANET){
      const planetGrav = (G.planet && G.planet.gravity) || 1.0;

      if(P.onGround){ P.coyoteTimer = 8; }
      else if(P.coyoteTimer > 0){ P.coyoteTimer--; }
      if(P.jumpBufferTimer > 0) P.jumpBufferTimer--;

      const isRising = P.vy < 0;
      const holdingJump = P.jumpHeld && P.jumpHoldTimer < 14;
      const gravity = ((isRising && holdingJump) ? 0.45 : 0.78) * planetGrav;

      P.vy += gravity;
      P.vy = clamp(P.vy, -22, 24 * planetGrav);
      if(P.jumpHoldTimer < 60) P.jumpHoldTimer++;
      P.y += P.vy;

      /* تصادم مع الأراضي العائمة */
      let landed = false;
      if(P.vy >= 0){
        for(const f of G.planetFloors){
          if(f.dead || !f.isPlanetFloat || f.falling) continue;
          const pxLeft  = P.x - P.r*0.85;
          const pxRight = P.x + P.r*0.85;
          const pyBottom = P.y + P.r;
          if(pxRight > f.x + 2 && pxLeft < f.x + f.w - 2){
            const prevBottom = pyBottom - P.vy;
            if(prevBottom <= f.y + 4 && pyBottom >= f.y){
              P.y = f.y - P.r;
              P.vy = 0;
              P.onGround = true;
              P.jumps = 0;
              landed = true;
              if(f.fallDelay === 0 && f.fallTimer > 0){
                f.fallDelay = f.fallTimer;
              }
              break;
            }
          }
        }
      }

      /* السقوط من خلال حفرة → الخروج من الكوكب */
/* السقوط من خلال حفرة → الخروج من الكوكب */
if(!landed){
  const feetY = P.y + P.r;
  let overHole = false;
  for(const f of G.planetFloors){
    if(f.dead || !f.isPlanetHole) continue;
    if(P.x >= f.x && P.x <= f.x + f.w) { overHole = true; break; }
  }
  if(!overHole && feetY >= GROUND_Y){
    P.y = GROUND_Y - P.r;
    P.vy = 0;
    P.onGround = true;
    P.jumps = 0;
} else if(overHole){
  P.onGround = false;

  /* ═══ تحديد نوع الحفرة ═══ */
  let activeHole = null;
  for(const f of G.planetFloors){
    if(f.dead || !f.isPlanetHole) continue;
    if(P.x >= f.x && P.x <= f.x + f.w){ activeHole = f; break; }
  }

  if(P.y > H + 200){
    /* ═══ العبور للكوكب التالي ═══ */
    if(activeHole && activeHole.isPlanetNext){
      transitionToNextPlanet();
    }
    /* ═══ العودة للأرض ═══ */
    else if(activeHole && activeHole.isPlanetReturn){
      returnToEarth();
    }
    /* ═══ احتياطي: إن لم تُحدَّد ═══ */
    else {
      transitionToNextPlanet();
    }
    return;
  }
}
}

      P.x = P.baseX;
      P.rot = 0;
      P.legPhase += P.onGround ? 0.55 : 0.15;
      P.walkAnim += P.onGround ? 0.35 : 0.1;
      if(P.onGround && G.t % 5 === 0) spawnFootstep();

    } else {
      /* ══════════════════════════════════════════════════
         ═══ فيزياء WALK الأصلية — بدون أي تعديل ═══
         ══════════════════════════════════════════════════ */
      if(P.onGround){ P.coyoteTimer = 8; }
      else if(P.coyoteTimer > 0){ P.coyoteTimer--; }
    if(P.jumpBufferTimer > 0) P.jumpBufferTimer--;

    const isRising = P.vy < 0;
    const holdingJump = P.jumpHeld && P.jumpHoldTimer < 14;
    const gravity = (isRising && holdingJump) ? 0.45 : 0.78;

    if(G.glideActive && P.vy > 0 && P.jumpHeld){
      P.vy = Math.min(P.vy, 2.5);
      if(G.t % 6 === 0){
        particles.push({
          x: P.x + rand(-8,8), y: P.y + P.r,
          vx: rand(-1,1), vy: rand(-0.5,0.5),
          life: 0.6, decay: 0.04, color: '#87CEEB', size: rand(2,3)
        });
      }
    }

/* ═══ Jetpack: طيران مستمر عند الإمساك ═══ */
if(G.jetpackActive > 0 && P.jumpHeld){
  P.vy = Math.min(P.vy, -6.5);
  P.onGround = false;
  P.jumps = 0;
  if(G.t % 2 === 0){
    particles.push({
      x: P.x + rand(-6,6), y: P.y + P.r + rand(0,12),
      vx: rand(-1.5,1.5), vy: rand(3,6),
      life: 0.75, decay: 0.032,
      color: ['#FF8040','#FFD060','#FFF8C0'][Math.floor(Math.random()*3)],
      size: rand(3,5)
    });
  }
}

/* ═══ Hover: إلغاء الجاذبية مؤقتاً ═══ */
if(G.hoverActive > 0){
  P.vy *= 0.4;
  if(Math.abs(P.vy) < 0.8) P.vy = 0;
  if(G.t % 5 === 0){
    particles.push({
      x: P.x + rand(-8,8), y: P.y + P.r + 4,
      vx: rand(-0.5,0.5), vy: rand(0.5,1.5),
      life: 0.7, decay: 0.03,
      color: '#A8D8E8', size: rand(2,3.5)
    });
  }
}

    if(G.rocketActive){
      const topLimit = CEILING_H + P.r + 50;

      if(G.rocketFrames > 0 && P.y > topLimit){
        G.rocketFrames--;
        P.vy = Math.min(P.vy, -7.5);
        for(let i = 0; i < 3; i++){
          particles.push({
            x: P.x + rand(-5,5),
            y: P.y + P.r + rand(0,15),
            vx: rand(-1.5,1.5),
            vy: rand(4,8),
            life: 0.8, decay: 0.03,
            color: ['#FFF8C0','#FFD700','#FF6B35'][Math.floor(Math.random()*3)],
            size: rand(3,7)
          });
        }
        if(G.t % 3 === 0){
          particles.push({
            x: P.x + rand(-12,12), y: P.y + rand(-12,12),
            vx: rand(-1,1), vy: rand(-2,0),
            life: 0.5, decay: 0.05,
            color: '#FFA040', size: rand(2,4)
          });
        }
      } else {
        if(G.rocketFrames <= 0){
          Sfx.play(200, 0.3, 'sine', 0.05, 400);
        }
        G.rocketActive = false;
        G.rocketFrames = 0;
        if(G.activePowerups.rocket) delete G.activePowerups.rocket;
        updatePowerupsUI();
      }
    }

    P.vy += gravity;
    P.vy = clamp(P.vy, -22, 24);
    if(P.jumpHoldTimer < 60) P.jumpHoldTimer++;
    P.y += P.vy;

    let landedOnPlatform = null;
    if(P.vy >= 0){
      for(const o of obstacles){
        if(!o.isPlatform || o.dead || o.crumbled) continue;

        const pxLeft  = P.x - P.r*0.85;
        const pxRight = P.x + P.r*0.85;
        const pyBottom = P.y + P.r;
        const oTop = o.y;

        if(pxRight > o.x + 2 && pxLeft < o.x + o.w - 2){
          const prevBottom = pyBottom - P.vy;
          if(prevBottom <= oTop + 4 && pyBottom >= oTop){
            P.y = oTop - P.r;
            P.vy = o.bounceBoost ? o.bounceBoost : 0;
            P.onGround = !o.bounceBoost;
            P.jumps = 0;
            landedOnPlatform = o;

            if(o.isElevator && !o.exhausted){
              o.isCarryingPlayer = true;
              Sfx.play(520, 0.15, 'sine', 0.05, 880);
              haptic(10);
            }

            if(o.platformType === 'bouncy'){
              spawnJumpEffect(P.x, oTop, o.accent);
              for(let i=0;i<15;i++){
                const a = (i/15)*Math.PI*2;
                particles.push({ x:P.x, y:oTop,
                  vx:Math.cos(a)*rand(3,6), vy:Math.sin(a)*rand(2,5) - 3,
                  life:1, decay:0.028, color:'#FFE090', size:rand(2,4)});
              }
              Sfx.play(560, 0.18, 'sine', 0.06, 1200);
              haptic(12); shake(5);
            } else if(o.platformType === 'crumble'){
              if(o.crumbleTimer === 0){ o.crumbleTimer = 45; }
              if(!wasOnGround){
                spawnJumpEffect(P.x, oTop, o.accent);
                Sfx.bounce(); haptic(5);
              }
            } else {
              if(!wasOnGround){
                spawnJumpEffect(P.x, oTop, o.accent);
                Sfx.bounce(); haptic(5);
              }
            }
            break;
          }
        }
      }
    }

    for(const o of obstacles){
      if(!o.isSpring || o.dead) continue;
      const sTop = GROUND_Y - o.h;
      const pxLeft  = P.x - P.r*0.85;
      const pxRight = P.x + P.r*0.85;
      const pyBottom = P.y + P.r;
      if(pxRight > o.x && pxLeft < o.x + o.w){
        if(pyBottom >= sTop && pyBottom < sTop + 26 && P.vy >= 0){
          P.y = sTop - P.r;
          P.vy = -20;
          P.onGround = false;
          P.jumps = 0;
          P.jumpHeld = false;
          spawnJumpEffect(P.x, sTop, '#FFF4C0');
          for(let i=0;i<20;i++){
            const a = (i/20)*Math.PI*2;
            particles.push({ x:P.x, y:sTop,
              vx:Math.cos(a)*rand(4,8), vy:Math.sin(a)*rand(4,8) - 3,
              life:1, decay:0.025, color:'#FFE080', size:rand(2,4)});
          }
          Sfx.play(440, 0.25, 'sine', 0.06, 1200);
          shake(10); haptic(15);
          break;
        }
      }
    }

    /* ============ الأرض وطبقات الأعماق ============ */
    if(!landedOnPlatform){
      const feetY = P.y + P.r;
      const prevFeetY = feetY - P.vy;
      const canPassGround = isPlayerOverHole();

      /* سطح الأرض */
      if(!canPassGround && prevFeetY <= GROUND_Y && feetY >= GROUND_Y){
        if(!wasOnGround){
          spawnJumpEffect(P.x, GROUND_Y, s.groundDark);
          Sfx.bounce(); haptic(4);
        }
        P.y = GROUND_Y - P.r;
        P.vy = 0;
        P.onGround = true;
        P.jumps = 0;

        if(P.jumpBufferTimer > 0){
          P.vy = -12.5;
          P.onGround = false;
          P.jumps = 1;
          P.jumpHeld = true;
          P.jumpHoldTimer = 0;
          P.jumpBufferTimer = 0;
          spawnJumpEffect(P.x, P.y + P.r, s.accent);
          Sfx.tap(); haptic(8);
        }
      }
      /* طبقات الأعماق */
      else {
        const underHit = checkUnderFloorCollision();
        if(underHit){
          P.y = underHit.floorY - P.r;
          P.vy = 0;
          P.onGround = true;
          P.jumps = 0;
          landedOnPlatform = { isUnderFloor: true, y: underHit.floorY };

          if(!wasOnGround){
            spawnJumpEffect(P.x, underHit.floorY, s.accent);
            Sfx.bounce(); haptic(4);
            dust(P.x, underHit.floorY, s.groundDark, 6, -1);
          }
        } else {
          P.onGround = false;
        }
      }
    }

    /* منع السقوط اللانهائي في UNDERGROUND */
    if(G.realm === REALM.UNDERGROUND && P.y > GROUND_Y + 3500){
      P.y = GROUND_Y + 3500;
      P.vy = -15;
      addFloat(P.x, P.y - 40, 'MAX DEPTH', '#FF8060', 16);
      Sfx.play(120, 0.4, 'sine', 0.06, 60);
      shake(10);
    }

    P.x = P.baseX; P.rot = 0;
    P.legPhase += P.onGround ? 0.55 : 0.15;
    P.walkAnim += P.onGround ? 0.35 : 0.1;

if(P.onGround && G.t % 5 === 0){
  spawnFootstep();
}
}
  } else if(G.mode==='FLIP_WALK'){
    P.vy -= 0.68; P.vy = clamp(P.vy,-20,22);
    P.y += P.vy;
    const ceilY = CEILING_H + P.r;
    if(P.y <= ceilY && P.vy < 0){
      if(!wasOnGround){ spawnJumpEffect(P.x, ceilY, s.groundDark); }
      P.y = ceilY; P.vy = 0; P.onGround = true; P.jumps = 0;
    } else P.onGround = false;
    P.x = P.baseX; P.rot = 0;
    P.legPhase += P.onGround ? 0.42 : 0.1;
    if(P.onGround && G.t%7===0){
      particles.push({x:P.x-6, y:ceilY - P.r + 2,
        vx:-1.2+rand(-0.3,0.3), vy:0.5+rand(-0.3,0.3),
        life:0.7, decay:0.03, color:s.groundDark, size:rand(1.5,2.5)});
    }
    if(P.y + P.r >= GROUND_Y - 2){ return gameOver(); }
    if(P.y + P.r > GROUND_Y - 4) P.y = GROUND_Y - 4 - P.r;

  } else if(G.mode==='SKY_JUMP'){
    P.vy += 0.55; P.vy = clamp(P.vy, -20, 22);
    P.y += P.vy;
    const gy = GROUND_Y - P.r;
    const cy = CEILING_H + P.r + 4;
    if(P.y >= gy){
      P.y = gy; P.vy = -13.5;
      P.onGround = true; P.jumps = 0;
      spawnJumpEffect(P.x, GROUND_Y, s.accent);
      Sfx.bounce(); haptic(5);
    } else if(P.y <= cy && P.vy < 0){
      P.y = cy; P.vy = 3; P.jumps = 0;
      spawnJumpEffect(P.x, cy, s.cloud || '#FFFFFF');
      for(let i=0;i<8;i++){
        particles.push({x: P.x + rand(-12,12), y: cy + rand(-4,4),
          vx: rand(-2,2), vy: rand(0,2),
          life: 0.8, decay: 0.03, color: '#FFFFFF', size: rand(2,4)});
      }
    } else P.onGround = false;
    P.x = P.baseX;
    P.rot = clamp(P.vy*0.025, -0.35, 0.35);
    P.legPhase += P.onGround ? 0.3 : 0.05;
  }

  /* ═══════════════════════════════════════════════════════
     ═══════════════ حدود إضافية حسب النمط ═══════════════
     ═══════════════════════════════════════════════════════ */

  if(G.mode==='DRIFT'){
    if(P.x<P.r){ P.x=P.r; P.vx=Math.abs(P.vx)*0.3; }
    if(P.x>W*0.75){ P.x=W*0.75; P.vx=-Math.abs(P.vx)*0.3; }
    if(P.y<P.r){ P.y=P.r; P.vy=Math.abs(P.vy)*0.3; }
    if(P.y>GROUND_Y-P.r){ P.y=GROUND_Y-P.r; P.vy=-Math.abs(P.vy)*0.3; }
  } else if(G.mode==='WALK'){
    // fine
  } else if(G.mode==='FLIP_WALK'){
    // handled
  } else if(G.mode==='SKY_JUMP'){
    // handled
  } else if(G.mode==='ASCEND'){
    // handled in ASCEND physics block
  } else {
    if(P.y-P.r<0){ P.y=P.r; P.vy=0; }
    if(P.y+P.r>GROUND_Y){ P.y=GROUND_Y-P.r; P.vy=0; }
  }

  /* ═══════════════ أثر الحركة ═══════════════ */
  if((G.mode==='FLIP'||G.mode==='FLAP'||G.mode==='DRIFT') && G.t%2===0){
    P.trail.push({x:P.x,y:P.y});
    if(P.trail.length>14) P.trail.shift();
  } else if(P.trail.length) P.trail.shift();

  /* ═══════════════ توليد العقبات (كل الأنماط عدا ASCEND) ═══════════════ */
  if(G.mode !== 'ASCEND'){
G.spawnCd -= G.speed;
if(G.spawnCd <= 0){
  spawnObstacle();
  const realmMul = (G.realm === REALM.UNDERGROUND) ? 1.15 : 1.0;
  const modeMul = (G.mode==='WALK') ? 1.30
                : (G.mode==='FLIP_WALK') ? 1.40
                : (G.mode==='SKY_JUMP') ? 1.45
                : 1.25;
  const cdMul = G.spawnCdMul || 1;
  G.spawnCd = prog.spawnDist * modeMul * realmMul * cdMul * rand(0.95, 1.08);
  G.spawnCdMul = 1;   /* إعادة الضبط */
}
  }

  /* ═══════════════ تحديث حركات العقبات الخاصة ═══════════════ */
  for(const o of obstacles){
    if(o.dead) continue;

    if(o.isPlatform){
      if(o.platformType === 'moving_y'){
        o.y = o.baseY + Math.sin(o.t*0.022 + o.phase) * o.amp;
      } else if(o.platformType === 'moving_x'){
        o.x += Math.cos(o.t*0.018 + o.phase) * 0.6;
      } else if(o.platformType === 'crumble' && o.crumbleTimer > 0){
        o.crumbleTimer--;
        if(o.crumbleTimer <= 0){
          o.crumbled = true;
          for(let i=0;i<16;i++){
            particles.push({
              x: o.x + Math.random()*o.w,
              y: o.y + Math.random()*o.h,
              vx: rand(-3,3), vy: rand(-4,1),
              life: 1, decay: 0.025,
              color: o.colorDark, size: rand(2,4)
            });
          }
          Sfx.play(180, 0.3, 'sawtooth', 0.05, 80);
          haptic(10);
          o.dead = true;
        }
      }
    }

    if(o.isSaw){
      o.angle += o.angleSpd;
      o.cx = o.x + o.r;
      if(o.movingY){
        o.cy = o.baseY + o.r + Math.sin(o.t*0.03 + o.phase) * o.amp;
        o.y = o.cy - o.r;
      }
    }

    if(o.isPiston){
      o.cycle++;
      const cyclePos = (o.cycle % o.period) / o.period;
      if(cyclePos < 0.15)       o.extend = (cyclePos / 0.15) * o.extendDist;
      else if(cyclePos < 0.4)   o.extend = o.extendDist;
      else if(cyclePos < 0.55)  o.extend = o.extendDist * (1 - (cyclePos - 0.4) / 0.15);
      else                      o.extend = 0;
    }

    if(o.isFallingSpike){
      if(!o.falling){
        const distToPlayer = o.x - P.x;
        if(!o.warned && distToPlayer < o.triggerDistance + 100 && distToPlayer > 0){
          o.warned = true;
          Sfx.play(400, 0.1, 'square', 0.03, 500);
        }
        if(distToPlayer < o.triggerDistance && distToPlayer > 0){
          o.falling = true;
          Sfx.play(300, 0.15, 'square', 0.04, 200);
        }
      }
      if(o.falling){
        o.y += 9;
        if(o.y >= o.targetY){
          o.y = o.targetY;
          if(!o.landed){
            o.landed = true;
            dust(o.x + o.w/2, GROUND_Y, o.colorDark, 8);
            shake(2);
          }
        }
      }
    }

    if(o.isRotBar){
      o.angle += o.angleSpd;
      o.cx = o.x + o.length/2;
    }

    if(o.isLaser && !o.isVertical){
      o.y = o.baseY + Math.sin(o.t * 0.04 + o.phase) * o.amp;
    }

    if(o.isFallingRock){
      if(!o.falling){
        const distToPlayer = o.x - P.x;
        if(!o.warned && distToPlayer < o.triggerDistance + 100 && distToPlayer > 0){
          o.warned = true;
          Sfx.play(400, 0.1, 'square', 0.03, 500);
        }
        if(distToPlayer < o.triggerDistance && distToPlayer > 0){
          o.falling = true;
          Sfx.play(300, 0.15, 'square', 0.04, 200);
        }
      }
      if(o.falling){
        o.y += 9;
        if(o.y >= o.targetY){
          o.y = o.targetY;
          if(!o.landed){
            o.landed = true;
            dust(o.x + o.w/2, o.y + o.h, o.colorDark, 10);
            shake(4);
            Sfx.play(120, 0.3, 'sawtooth', 0.06, 60);
          }
        }
      }
    }

    if(o.isDrill){
      o.cycle++;
      const cyclePos = (o.cycle % o.period) / o.period;
      if(cyclePos < 0.15)       o.extend = (cyclePos / 0.15) * o.extendDist;
      else if(cyclePos < 0.4)   o.extend = o.extendDist;
      else if(cyclePos < 0.55)  o.extend = o.extendDist * (1 - (cyclePos - 0.4) / 0.15);
      else                      o.extend = 0;
    }

    if(o.isGhost){
      o.angle += o.speed;
      o.cy = o.baseY + 20 + Math.sin(o.t * 0.03 + o.phase) * o.amp;
      o.y = o.cy - 20;
      o.cx = o.x + 20;
    }

    if(o.isElevator && !o.dead){
      if(o.isCarryingPlayer && !o.exhausted){
        o.x = P.baseX - o.w/2;
        o.y -= o.riseSpeed;
        o.risen += o.riseSpeed;

        if(G.t % 2 === 0){
          particles.push({
            x: o.x + rand(0, o.w),
            y: o.y + o.h,
            vx: rand(-1, 1),
            vy: rand(1, 4),
            life: 0.9, decay: 0.028,
            color: o.glow,
            size: rand(2, 5)
          });
        }
        if(G.t % 3 === 0){
          particles.push({
            x: o.x - 5, y: o.y + o.h/2,
            vx: -2, vy: rand(-0.5, 0.5),
            life: 0.7, decay: 0.04,
            color: o.accent, size: 3
          });
          particles.push({
            x: o.x + o.w + 5, y: o.y + o.h/2,
            vx: 2, vy: rand(-0.5, 0.5),
            life: 0.7, decay: 0.04,
            color: o.accent, size: 3
          });
        }

        P.y = o.y - P.r;
        P.vy = 0;
        P.onGround = true;
        P.jumps = 0;

        if(G.t % 3 === 0){
          particles.push({
            x: o.x + rand(0, o.w),
            y: o.y + o.h,
            vx: rand(-1, 1),
            vy: rand(2, 5),
            life: 0.7, decay: 0.035,
            color: '#80E8FF', size: rand(2, 4)
          });
        }

        if(o.risen >= o.maxRise){
          o.exhausted = true;
          o.isCarryingPlayer = false;
          shake(3);
          Sfx.play(440, 0.2, 'sine', 0.04, 220);
        }
      } else if(o.exhausted){
        o.y += 0.4;
        if(o.y > GROUND_Y - 100) o.dead = true;
      }
    }

    if(o.isVortex){
      o.angle += 0.08;
      const dx = o.cx - P.x;
      const dy = o.cy - P.y;
      const d = Math.hypot(dx, dy) || 1;
      if(d < 260){
        const force = (1 - d/260) * o.pullForce;
        if(G.mode === 'WALK'){
          P.vy += (dy/d) * force * 0.6;
        } else {
          P.vx += (dx/d) * force;
          P.vy += (dy/d) * force;
        }
      }
    }
  }

  /* ═══════════════ حلقة تحديث العقبات الرئيسية ═══════════════ */
  for(let i=obstacles.length-1;i>=0;i--){
    const o = obstacles[i];
    if(o.dead){ obstacles.splice(i,1); continue; }
    o.t++;

    /* ASCEND: العقبات ثابتة في العالم — اللاعب يصعد فعلياً */
    if(G.mode !== 'ASCEND'){
      o.x -= G.speed;
    }
    /* في ASCEND لا نحرك أي عقبة — العالم ساكن */

    if(!o.isWalk && o.amp > 0.5){
      o.gapY = o.baseGapY + Math.sin(o.t*0.016+o.phase)*o.amp;
      o.gapY = clamp(o.gapY, 70+o.gap/2, GROUND_Y-70-o.gap/2);
    }

    /* ═══════════════ كشف العبور (Pass Detection) ═══════════════ */
    if(!o.passed){
      /* ✅ ASCEND: العبور عندما يتجاوز الحاجز اللاعب (يصبح تحته) */
      if(o.isAscend && o.y > P.y + 40){
        o.passed = true;
        onPass(o);
      }
      /* باقي الأنماط: العبور عندما يتجاوز اللاعب العقبة أفقياً */
      else if(!o.isAscend && o.x + o.w < P.x){
        o.passed = true;
        if(o.isShiftGate){
          performShift(o.targetMode);
        } else {
          onPass(o);
        }
      }
    }

    /* ═══════════════ كشف التصادم ═══════════════ */
    let hit = hitObstacle(o);

    if(!hit && o.isWalk){
      const pr = P.r * 0.75;

      if(o.isSaw){
        const dx = P.x - o.cx, dy = P.y - o.cy;
        if(dx*dx + dy*dy < (o.r + pr) * (o.r + pr)) hit = true;
      }

      if(o.isFallingSpike && o.falling && o.y > 0){
        if(circleRect(P.x, P.y, pr, o.x, o.y, o.w, o.h)) hit = true;
      }

      if(o.isRotBar){
        const cosA = Math.cos(-o.angle), sinA = Math.sin(-o.angle);
        const relX = P.x - o.cx, relY = P.y - o.cy;
        const localX = relX * cosA - relY * sinA;
        const localY = relX * sinA + relY * cosA;
        if(Math.abs(localX) < o.length/2 + pr && Math.abs(localY) < o.thickness/2 + pr){
          hit = true;
        }
      }

      if(o.isPiston && !o.isTop){
        if(circleRect(P.x, P.y, pr, o.x, GROUND_Y - o.h, o.w, o.h)) hit = true;
      }

      if(o.isPiston && o.extend > 4){
        const headH = 16;
        const headY = o.isTop
          ? o.h + o.extend
          : GROUND_Y - o.h - o.extend - headH;
        if(circleRect(P.x, P.y, pr, o.x + 4, headY, o.w - 8, headH)) hit = true;
        const rodW = o.w * 0.4;
        const rodX = o.x + (o.w - rodW)/2;
        const rodY = o.isTop ? o.h : GROUND_Y - o.h - o.extend;
        const rodH = o.extend;
        if(circleRect(P.x, P.y, pr, rodX, rodY, rodW, rodH)) hit = true;
      }

      if(o.isLaser){
        if(o.isVertical){
          for(const seg of o.segments){
            if(circleRect(P.x, P.y, pr, o.x, seg.y, o.w, seg.h)){
              hit = true; break;
            }
          }
        } else {
          if(circleRect(P.x, P.y, pr, o.x, o.y - 3, o.w, 6)) hit = true;
        }
      }

      if(o.isUnderSpike){
        if(circleRect(P.x, P.y, pr, o.x, o.y, o.w, o.h)) hit = true;
      }

      if(o.isFallingRock && o.falling){
        if(circleRect(P.x, P.y, pr, o.x, o.y, o.w, o.h)) hit = true;
      }

      if(o.isLavaPool){
        if(circleRect(P.x, P.y, pr, o.x, o.y - 4, o.w, o.h + 8)) hit = true;
      }

      if(o.isDrill && o.extend > 4){
        const headY = o.isTop ? o.floorY + o.extend - 60 : o.floorY - o.extend;
        if(circleRect(P.x, P.y, pr, o.x + 4, headY, o.w - 8, 60)) hit = true;
      }

      if(o.isGhost){
        const dx = P.x - o.cx, dy = P.y - o.cy;
        if(dx*dx + dy*dy < (o.r + pr) * (o.r + pr)) hit = true;
      }
    }

    if(hit){
      if(G.invuln > 0){}
      else if(G.shield){
        G.shield = false;
        G.invuln = 100;
        o.dead = true;
        burst(P.x, P.y, '#7BC4B0', 26, 7);
        addFloat(P.x, P.y-30, 'درع!', '#7BC4B0', 16);
        shake(14); Sfx.orb(); haptic(20);
        updatePowerupsUI();
      } else { return gameOver(); }
    }

    /* حذف العقبات التي تجاوزت الشاشة يساراً */
    if(!o.isAscend && o.x + o.w < -70) obstacles.splice(i,1);
  }

  /* ═══ تحديث أرضيات الكوكب العائمة ═══ */
if(G.realm === REALM.PLANET){
  for(const f of G.planetFloors){
    if(f.dead) continue;
    f.t++;

    /* ✅ كل شيء يتحرك إلا الأرضية الرئيسية */
    if(!f.isPlanetFloor){
      f.x -= G.speed;
    }

      if(f.isPlanetFloat && f.falling){
        f.fallVy += 0.8;
        f.y += f.fallVy;
        if(f.y > H + 100){
          f.dead = true;
          for(let i = 0; i < 8; i++){
            particles.push({
              x: f.x + Math.random()*f.w,
              y: GROUND_Y,
              vx: rand(-3, 3), vy: rand(-6, -2),
              life: 1, decay: 0.025,
              color: G.planet ? G.planet.groundTop : '#FFFFFF',
              size: rand(2, 4)
            });
          }
        }
      }
    }

    G.planetFloors = G.planetFloors.filter(f => !f.dead && f.x + f.w > -200);
  }

  /* ═══════════════ العملات ═══════════════ */
  const magnetOn = G.activePowerups.magnet !== undefined;
  let coinMul = 1;
  if(G.activePowerups.double)      coinMul *= 2;
  if(G.activePowerups.multiplier)  coinMul *= (G.activePowerups.multiplier.mul || 3);
  if(G.activePowerups.goldenTouch) coinMul *= (G.activePowerups.goldenTouch.coinMul || 5);

  for(let i=coins.length-1;i>=0;i--){
    const c = coins[i];
    if(c.dead){ coins.splice(i,1); continue; }

    if(G.mode === 'ASCEND') c.y += G.speed;
    else c.x -= G.speed;
    c.t++;

    if(magnetOn){
      const dx = P.x - c.x, dy = P.y - c.y;
      const d = Math.hypot(dx,dy) || 1;
      if(d < 280){ c.x += (dx/d)*7.5; c.y += (dy/d)*7.5; }
    }
    if(circleCircle(P.x,P.y,P.r+5, c.x,c.y,c.r)){
      c.dead = true;
      addCombo();
      const baseGain = c.isSkyCoin ? 5 : 1;
      const gain = baseGain * coinMul * getComboMul();
      G.runCoins += gain;
      Sfx.coin();
      if(c.isSkyCoin){
        burst(c.x, c.y, '#FFD700', 12, 5);
        addFloat(c.x, c.y, '+' + gain + ' ⭐', '#FFD700', 14);
        shake(3);
      } else {
        burst(c.x, c.y, '#E8B34E', 6, 3);
        addFloat(c.x, c.y, '+' + gain, '#C98A2E', 11);
      }
    }

    if(G.mode === 'ASCEND'){
      if(c.y > H + 60) coins.splice(i,1);
    } else {
      if(c.x < -60) coins.splice(i,1);
    }
  }

  /* ═══════════════ كرات الطاقة ═══════════════ */
  for(let i=orbs.length-1;i>=0;i--){
    const ob = orbs[i];
    if(ob.dead){ orbs.splice(i,1); continue; }

    if(G.mode === 'ASCEND') ob.y += G.speed;
    else ob.x -= G.speed;
    ob.t++;

    if(magnetOn){
      const dx = P.x - ob.x, dy = P.y - ob.y;
      const d = Math.hypot(dx,dy) || 1;
      if(d < 280){ ob.x += (dx/d)*6; ob.y += (dy/d)*6; }
    }
    if(circleCircle(P.x,P.y,P.r+4, ob.x,ob.y,ob.r)){
      ob.dead = true; collectOrb(ob);
    }

    if(G.mode === 'ASCEND'){
      if(ob.y > H + 60) orbs.splice(i,1);
    } else {
      if(ob.x < -60) orbs.splice(i,1);
    }
  }

  /* ═══════════════ التعزيزات ═══════════════ */
  for(let i=powerups.length-1;i>=0;i--){
    const p = powerups[i];
    if(p.dead){ powerups.splice(i,1); continue; }

    if(G.mode === 'ASCEND') p.y += G.speed;
    else p.x -= G.speed;
    p.t++;

    if(magnetOn){
      const dx = P.x - p.x, dy = P.y - p.y;
      const d = Math.hypot(dx,dy) || 1;
      if(d < 240){ p.x += (dx/d)*4; p.y += (dy/d)*4; }
    }
    if(circleCircle(P.x,P.y,P.r+8, p.x,p.y,p.r)){
      p.dead = true;
      collectPowerup(p);
    }

    if(G.mode === 'ASCEND'){
      if(p.y > H + 60) powerups.splice(i,1);
    } else {
      if(p.x < -60) powerups.splice(i,1);
    }
  }

  /* ═══════════════ مكافأة كل 300 متر ═══════════════ */
  const ms = Math.floor(getMeters()/300);
  if(ms > G.lastMilestone && ms > 0){
    G.lastMilestone = ms;
    const bonus = 5;
    G.runCoins += bonus;
    addFloat(P.x,P.y-40,'◆ +'+bonus,'#C98A2E',17);
    Sfx.reward(); shake(6);
    for(let i=0;i<20;i++){
      const a = (i/20)*Math.PI*2;
      particles.push({x:P.x,y:P.y,
        vx:Math.cos(a)*rand(3,6), vy:Math.sin(a)*rand(3,6),
        life:1, decay:0.022, color:'#E8B34E', size:rand(3,5)});
    }
  }

  if(G.hintTimer > 0){
    G.hintTimer--;
    if(G.hintTimer === 0) document.getElementById('hint').classList.remove('show');
  }

  /* ═══════════════ تحديث HUD ═══════════════ */
  if(G.t%3===0){
    const hudM = document.getElementById('hud-meters');
    const hudC = document.getElementById('hud-coins');
    if(hudM) hudM.textContent = getMeters();
    if(hudC) hudC.textContent = G.runCoins;
updateHudOverlays();
  }
}

function onPass(o){
  const coinMul = G.activePowerups.double ? 2 : 1;
  G.runCoins += 1 * coinMul * getComboMul();
}
function collectOrb(ob){
  Sfx.orb();
  G.orbCount++;
  addCombo();
  const baseVal = ob.value || 3;
  const gain = baseVal * getComboMul() * (G.activePowerups.double ? 2 : 1);
  G.runCoins += gain;
  burst(ob.x, ob.y, ob.color || G.currentScene.accent, 16, 5);
  addFloat(ob.x, ob.y, '+'+gain, ob.color || G.currentScene.accent, 14);
  if(ob.isSkyOrb){
    shake(5);
    for(let i=0;i<16;i++){
      const a = (i/16)*Math.PI*2;
      particles.push({
        x:ob.x, y:ob.y,
        vx:Math.cos(a)*rand(3,6), vy:Math.sin(a)*rand(3,6),
        life:1, decay:0.025, color:'#FFD700', size:rand(2,4)
      });
    }
  }
}

/* ============================================================
   ==================== CAPE (وشاح متحرك) ====================
   ============================================================ */
function initCape(){
  /* ❌ نظام العباءات البرمجي محذوف — العباءة الآن في backItem */
}

function updateCapePhysics(){
  /* ❌ نظام العباءات البرمجي محذوف */
}

/* ============================================================
   ═══════════ DRAW CHARACTER BODY v3 — IMAGE ONLY ═══════════
   ═══════════════════════════════════════════════════════════ */
function drawCharacterBody(c, r, skin, t){
  /* ═══ صورة الزي ═══ */
  if(hasItemImage(skin)){
    const img = getItemImageEl(skin);

    /* جاهزة → ارسمها */
    if(img && img.complete && img.naturalWidth > 0){
      const size = r * 2.6;
      c.drawImage(img, -size/2, -size/2, size, size);
      return;
    }

    /* قيد التحميل → دائرة نابضة خفيفة */
    const pulse = 0.5 + Math.sin(t * 0.15) * 0.2;
    c.fillStyle = skin.body || '#E07A3F';
    c.globalAlpha = pulse;
    c.beginPath();
    c.arc(0, 0, r, 0, Math.PI * 2);
    c.fill();
    c.globalAlpha = 1;
    return;
  }

  /* ═══ لا صورة → دائرة placeholder رمادية ═══ */
  c.fillStyle = '#CCCCCC';
  c.beginPath();
  c.arc(0, 0, r, 0, Math.PI * 2);
  c.fill();

  c.fillStyle = '#888888';
  c.font = `bold ${r * 0.9}px "Space Grotesk", sans-serif`;
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText('?', 0, 0);
}

function initCompanion(){
  /* ❌ نظام الرفاق محذوف في v3 */
}

function updateCompanion(){
  /* ❌ نظام الرفاق محذوف في v3 */
}

/* ═══════════════════════════════════════════════════════════
   ═══════════ COMPANION REMOVED في v3 ═══════════════════════
   ═══════════════════════════════════════════════════════════ */
function drawCompanion(){
  /* ❌ نظام الرفاق محذوف في v3 — لا يفعل شيئاً */
}

/* ═══════════════════════════════════════════════════════════
   ═══════════ ARABIC FEET RENDERER (للنمط الأرضي) ═══════════
   ═══════════════════════════════════════════════════════════ */
function drawCharacterFeet(c, r, mode, legPhase, walkAnim, onGround, rot){
  /* ✅ لا أرجل في أنماط المركبة */
  if(mode === 'FLIP' || mode === 'FLAP' || mode === 'DRIFT') return;

  const footColor  = '#2A2018';
  const footLight  = 'rgba(255,255,255,0.22)';
  const footShadow = 'rgba(0,0,0,0.35)';

  /* ✅ موضع الأقدام: أسفل مركز الجسم قليلاً */
  const footY = r * 1.02;
  const footW = r * 0.44;
  const footH = r * 0.24;

  /* موضع افتراضي */
  let lx = -r * 0.42;
  let rx =  r * 0.42;
  let ly = 0;
  let ry = 0;

  if(onGround && (mode === 'WALK' || mode === 'FLIP_WALK')){
    /* ═══ أنيميشن المشي ═══ */
    const cycle = Math.sin(walkAnim * 0.5);
    const swing = r * 0.18;
    lx += cycle * swing;
    rx -= cycle * swing;
    ly -= Math.max(0, cycle) * r * 0.14;
    ry -= Math.max(0, -cycle) * r * 0.14;
  } else {
    /* ═══ في الهواء: متباعدتان قليلاً ═══ */
    lx -= r * 0.12;
    rx += r * 0.12;
    ly -= r * 0.10;
    ry -= r * 0.10;
  }

  /* ═══ ظل القدمين ═══ */
  c.fillStyle = footShadow;
  c.beginPath();
  c.ellipse(lx, footY + ly + 2.5, footW * 1.08, footH * 1.08, 0, 0, Math.PI * 2);
  c.fill();
  c.beginPath();
  c.ellipse(rx, footY + ry + 2.5, footW * 1.08, footH * 1.08, 0, 0, Math.PI * 2);
  c.fill();

  /* ═══ القدمين ═══ */
  c.fillStyle = footColor;
  c.beginPath();
  c.ellipse(lx, footY + ly, footW, footH, 0, 0, Math.PI * 2);
  c.fill();
  c.beginPath();
  c.ellipse(rx, footY + ry, footW, footH, 0, 0, Math.PI * 2);
  c.fill();

  /* ═══ لمعة علوية ═══ */
  c.fillStyle = footLight;
  c.beginPath();
  c.ellipse(lx, footY + ly - footH * 0.35, footW * 0.55, footH * 0.32, 0, 0, Math.PI * 2);
  c.fill();
  c.beginPath();
  c.ellipse(rx, footY + ry - footH * 0.35, footW * 0.55, footH * 0.32, 0, 0, Math.PI * 2);
  c.fill();

  /* ═══ خط أصابع القدم ═══ */
  c.strokeStyle = 'rgba(0,0,0,0.45)';
  c.lineWidth = 1.2;
  c.beginPath();
  c.moveTo(lx - footW * 0.55, footY + ly + footH * 0.3);
  c.lineTo(lx + footW * 0.55, footY + ly + footH * 0.3);
  c.stroke();
  c.beginPath();
  c.moveTo(rx - footW * 0.55, footY + ry + footH * 0.3);
  c.lineTo(rx + footW * 0.55, footY + ry + footH * 0.3);
  c.stroke();
}

/* ============================================================
   ═══════════ RENDER CHARACTER v3 — IMAGE ONLY ══════════════
   ═══════════════════════════════════════════════════════════
   كل العناصر من صور. لا يوجد أي رسم برمجي.
   
   ترتيب الطبقات (من الخلف للأمام):
     0. back    — خلف الشخصية (أجنحة/عباءة)
     1. body    — الجسم (صورة الزي)
     2. eyes    — العيون (فقط إن لم تكن الشخصية صورة — نادر)
     3. head    — فوق الرأس (تاج/قبعة)
   ============================================================ */
function renderCharacter(c, r, skin, opts){
  opts = opts || {};
  const mode = opts.mode || 'FLIP';
  const facingRot = opts.rot || 0;
  const isFlippedWalk = mode === 'FLIP_WALK';
  const isShip = mode === 'FLIP' || mode === 'FLAP' || mode === 'DRIFT';
  const alpha = opts.alpha ?? 1;
  const skipExtras = opts.skipExtras || false;
  const t = G.t;

  const legPhase  = opts.legPhase  ?? (typeof P !== 'undefined' ? P.legPhase  : 0);
  const walkAnim  = opts.walkAnim  ?? (typeof P !== 'undefined' ? P.walkAnim  : 0);
  const onGround  = opts.onGround  ?? (typeof P !== 'undefined' ? P.onGround  : true);

  c.save();
  c.globalAlpha = alpha;

  /* ═══ طبقة 0: الظهر ═══ */
  if(!skipExtras){
    const back = currentBack();
    if(back && back.id !== 'none' && hasItemImage(back)){
      const cfg = getCategoryConfig('back').render;
      ASSET.drawItem(c, back, {
        x: 0,
        y: r * (cfg.offsetY || 0),
        size: r * (cfg.sizeMul || 4.5),
        anchorX: cfg.anchor.x,
        anchorY: cfg.anchor.y,
        rotation: Math.sin(t * (cfg.rotationSpeed || 0.05)) * (cfg.rotationAmp || 0.03)
      });
    }
  }

  /* ═══ دوران المركبة / قلب المشي ═══ */
  if(isShip && facingRot !== 0) c.rotate(facingRot);
  if(isFlippedWalk) c.rotate(Math.PI);

  /* ═══════════════════════════════════════════════════════
     ✅ طبقة 1: الجسم (صورة الزي)
     ═══════════════════════════════════════════════════════ */
  drawCharacterBody(c, r, skin, t);

  /* ═══════════════════════════════════════════════════════
     ✅✅✅ الجديد: طبقة 1.5 — الأقدام بعد الجسم لتظهر فوقه
     ═══════════════════════════════════════════════════════ */
  const hasFeet = (mode === 'WALK' || mode === 'ASCEND' ||
                   mode === 'SKY_JUMP' || mode === 'FLIP_WALK');
  if(hasFeet){
    c.save();
    if(isFlippedWalk){
      /* في FLIP_WALK، ارجع الدوران مؤقتاً لرسم الأرجل بشكل صحيح */
      c.rotate(-Math.PI);
      drawCharacterFeet(c, r, mode, legPhase, walkAnim, onGround, facingRot);
      c.rotate(Math.PI);
    } else {
      drawCharacterFeet(c, r, mode, legPhase, walkAnim, onGround, facingRot);
    }
    c.restore();
  }

  /* ═══ طبقة 2: العيون ═══ */
  const skinIsImage = hasItemImage(skin);
  if(!skinIsImage){
    const eyes = currentEyes();
    if(eyes && eyes.id !== 'none' && hasItemImage(eyes)){
      const cfg = getCategoryConfig('eyes').render;
      ASSET.drawItem(c, eyes, {
        x: 0,
        y: r * (cfg.offsetY || -0.15),
        size: r * (cfg.sizeMul || 1.6),
        anchorX: cfg.anchor.x,
        anchorY: cfg.anchor.y
      });
    }
  }

  /* ═══ طبقة 3: الرأس ═══ */
  if(!skipExtras){
    const head = currentHead();
    if(head && head.id !== 'none' && hasItemImage(head)){
      const cfg = getCategoryConfig('head').render;
      ASSET.drawItem(c, head, {
        x: 0,
        y: r * (cfg.offsetY || -1.15),
        size: r * (cfg.sizeMul || 2.4),
        anchorX: cfg.anchor.x,
        anchorY: cfg.anchor.y,
        rotation: Math.sin(t * (cfg.rotationSpeed || 0.04)) * (cfg.rotationAmp || 0.02)
      });
    }
  }

  c.restore();
}

/* ============================================================
   ==================== Player renderer ======================
   ============================================================ */
function drawPlayer(){
  const skin = currentSkin();
  const r = P.r;
  const ghostActive = G.ghost > 0;

/* ═══ ظل الشخصية حسب النمط ═══ */
if(G.mode === 'WALK'){
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(P.x, GROUND_Y + 4, r*1.05, 4, 0, 0, Math.PI*2);
  ctx.fill();
} else if(G.mode === 'FLIP_WALK'){
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(P.x, CEILING_H, r*1.05, 4, 0, 0, Math.PI*2);
  ctx.fill();
} else if(G.mode === 'SKY_JUMP'){
  const height = clamp((GROUND_Y - P.y) / 300, 0, 1);
  const sw = r * (1.05 - height * 0.7);
  ctx.fillStyle = 'rgba(0,0,0,' + (0.22 - height * 0.15) + ')';
  ctx.beginPath();
  ctx.ellipse(P.x, GROUND_Y + 4, sw, 4, 0, 0, Math.PI*2);
  ctx.fill();
}

  const blink = G.invuln > 0 && Math.floor(G.invuln/5)%2===0;
  let alpha = blink ? 0.4 : 1;
  if(ghostActive) alpha *= 0.6;
  if(skin.transparent) alpha *= 0.75;

ctx.save();
ctx.translate(P.x, P.y);
renderCharacter(ctx, r, skin, { 
  mode: G.mode, 
  rot: P.rot, 
  alpha,
  legPhase: P.legPhase,
  walkAnim: P.walkAnim,
  onGround: P.onGround
});

  /* ✅✅✅ ضع الكود الجديد هنا ✅✅✅ */
  /* ═══ نسخة مرئية عند تفعيل تعزيز Clone ═══ */
  if(G.cloneActive > 0){
    ctx.save();
    ctx.globalAlpha = 0.35 + Math.sin(G.t * 0.1) * 0.15;
    const offsetX = Math.cos(G.t * 0.04) * 30;
    const offsetY = Math.sin(G.t * 0.05) * 20;
    ctx.translate(offsetX, offsetY);
    renderCharacter(ctx, P.r * 0.9, currentSkin(), {
      mode: G.mode, rot: P.rot, alpha: 0.5, skipExtras: true
    });
    ctx.restore();
  }
  ctx.restore();

  if(G.shield){
    ctx.save();
    ctx.globalAlpha = 0.6 + Math.sin(G.t*0.14)*0.2;
    const shieldGrad = ctx.createRadialGradient(P.x, P.y, r*1.6, P.x, P.y, r*2.6);
    shieldGrad.addColorStop(0, 'rgba(123,196,176,0)');
    shieldGrad.addColorStop(0.5, '#7BC4B0');
    shieldGrad.addColorStop(1, 'rgba(123,196,176,0)');
    ctx.fillStyle = shieldGrad;
    ctx.beginPath(); ctx.arc(P.x, P.y, r*2.6, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  }

  if(G.ghost > 0){
    ctx.save();
    ctx.globalAlpha = 0.4 + Math.sin(G.t*0.18)*0.15;
    ctx.strokeStyle = '#B8A4C9';
    ctx.lineWidth = 2; ctx.setLineDash([4,6]);
    ctx.beginPath(); ctx.arc(P.x, P.y, r*2.4, 0, Math.PI*2); ctx.stroke();
    ctx.restore();
  }
}

/* ============================================================
   ==================== ASCEND SKY HELPERS ===================
   ============================================================ */
function getAscendSkyColors(){
  const alt = getMeters();   /* "الأمتار" = الارتفاع */
  let skyTop, skyBot, starAlpha = 0;

  if(alt < 300){
    const t = alt / 300;
    skyTop = mixColor('#A8D8FF', '#7CB8E8', t);
    skyBot = mixColor('#E0F0FF', '#A8D8F0', t);
  } else if(alt < 1000){
    const t = (alt - 300) / 700;
    skyTop = mixColor('#7CB8E8', '#4A78C8', t);
    skyBot = mixColor('#A8D8F0', '#7098D8', t);
    starAlpha = t * 0.15;
  } else if(alt < 2500){
    const t = (alt - 1000) / 1500;
    skyTop = mixColor('#4A78C8', '#1A2A5A', t);
    skyBot = mixColor('#7098D8', '#3A4A7A', t);
    starAlpha = 0.15 + t * 0.35;
  } else if(alt < 5000){
    const t = (alt - 2500) / 2500;
    skyTop = mixColor('#1A2A5A', '#060418', t);
    skyBot = mixColor('#3A4A7A', '#100830', t);
    starAlpha = 0.5 + t * 0.3;
  } else {
    const t = Math.min(1, (alt - 5000) / 3000);
    skyTop = mixColor('#060418', '#000000', t);
    skyBot = mixColor('#100830', '#050018', t);
    starAlpha = 0.8 + t * 0.2;
  }

  return { skyTop, skyBot, starAlpha };
}

/* ═══ نسبة المزج: 0 = سماء الأرض، 1 = سماء الطبقة السماوية ═══ */
function getRealmSkyBlend(){
  if(G.realm === REALM.SKY){
    if(G.realmFrom === REALM.SKY) return 1;      // مستقر في السماء
    return G.realmTransition;                     // 0 → 1 عند الدخول
  }
  if(G.realm === REALM.GROUND){
    if(G.realmFrom === REALM.SKY){
      return 1 - G.realmTransition;               // 1 → 0 عند العودة
    }
    return 0;                                     // مستقر في الأرض
  }
  return 0;                                       // UNDERGROUND
}

/* ============================================================
   ==================== Scenery ==============================
   ============================================================ */
/* ============================================================
   ═══════════════ PLANET RINGS — الحلقات ══════════════════
   ============================================================ */
function drawPlanetRings(){
  if(G.realm !== REALM.PLANET || !G.planet) return;
  const p = G.planet;
  if(!p.rings) return;

  const r = p.rings;
  const cx = W * 0.5;
  const cy = H * 0.75;          /* الحلقات تظهر في الأفق */
  const t = G.t;

  ctx.save();

  /* ═══ الحلقات العمودية (أورانوس) ═══ */
  if(r.vertical){
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI * 0.4 + Math.sin(t * 0.005) * 0.05);

    for(let ring = 0; ring < 5; ring++){
      const innerR = r.innerR + ring * 15;
      const outerR = innerR + 10;
      ctx.strokeStyle = r.colors[ring % r.colors.length];
      ctx.globalAlpha = r.alpha * (1 - ring * 0.1);
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 0, outerR, outerR * 0.15, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  /* ═══ الحلقات الأفقية (المشتري، زحل، نبتون) ═══ */
  ctx.translate(cx, cy);
  ctx.rotate(-r.tilt * 0.3 + Math.sin(t * 0.003) * 0.02);

  const segmentCount = r.segmented ? 4 : 1;
  for(let seg = 0; seg < segmentCount; seg++){
    const gapAngle = (seg / segmentCount) * Math.PI * 2;
    const arcLength = (Math.PI * 2 / segmentCount) * 0.9;

    for(let ring = 0; ring < r.colors.length; ring++){
      const ringRatio = ring / r.colors.length;
      const innerR = r.innerR + (r.outerR - r.innerR) * ringRatio;
      const outerR = innerR + (r.outerR - r.innerR) * 0.15;

      ctx.strokeStyle = r.colors[ring];
      ctx.globalAlpha = r.alpha * (1 - ringRatio * 0.3);

      if(r.detailed){
        /* حلقات مفصلة: نقاط صغيرة على المسار */
        ctx.lineWidth = 2;
        const dotCount = 60;
        for(let d = 0; d < dotCount; d++){
          const a = (d / dotCount) * Math.PI * 2 + gapAngle;
          const rr = (innerR + outerR) / 2;
          const px = Math.cos(a) * rr;
          const py = Math.sin(a) * rr * 0.28;
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = r.colors[ring];
          ctx.fill();
        }
      } else {
        /* حلقات بسيطة: أقواس */
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(0, 0, outerR, outerR * 0.28, 0, gapAngle, gapAngle + arcLength);
        ctx.stroke();
      }
    }
  }

  ctx.restore();
}

/* ============================================================
   ═══════════════ PLANET MOONS — الأقمار ══════════════════
   ============================================================ */
function drawPlanetMoons(){
  if(G.realm !== REALM.PLANET || !G.planet) return;
  const p = G.planet;
  if(!p.moons || p.moons.length === 0) return;

  const cx = W * 0.5;
  const cy = H * 0.3;
  const t = G.t;

  /* ترتيب حسب z للرسم من الخلف للأمام */
  const sorted = p.moons.map(m => ({
    moon: m,
    pos: getMoonPosition(m, t, cx, cy)
  })).sort((a, b) => a.pos.z - b.pos.z);

  for(const item of sorted){
    const { moon, pos } = item;

    /* حجم حسب المسافة */
    const scale = 1 - (moon.dist / 400) * 0.5;
    const r = moon.r * scale;

    /* ═══ هالة القمر (إن وُجد غلاف جوي) ═══ */
    if(moon.atmosphere){
      const halo = ctx.createRadialGradient(pos.x, pos.y, r * 0.5, pos.x, pos.y, r * 3);
      halo.addColorStop(0, moon.atmosphere + '60');
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, r * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    /* ═══ جسم القمر ═══ */
    const grad = ctx.createRadialGradient(
      pos.x - r * 0.3, pos.y - r * 0.3, r * 0.1,
      pos.x, pos.y, r
    );
    grad.addColorStop(0, mixColor(moon.color, '#FFFFFF', 0.4));
    grad.addColorStop(0.6, moon.color);
    grad.addColorStop(1, mixColor(moon.color, '#000000', 0.4));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
    ctx.fill();

    /* ═══ تفاصيل سطحية ═══ */
    if(!moon.icy && r > 3){
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      const craters = [
        { x: -r * 0.3, y: -r * 0.2, r: r * 0.2 },
        { x: r * 0.25, y: r * 0.3, r: r * 0.15 },
        { x: -r * 0.1, y: r * 0.4, r: r * 0.12 }
      ];
      for(const c of craters){
        ctx.beginPath();
        ctx.arc(pos.x + c.x, pos.y + c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ═══ براكين (Io) ═══ */
    if(moon.volcanic && Math.random() < 0.02){
      const vx = pos.x + rand(-r * 0.5, r * 0.5);
      const vy = pos.y + rand(-r * 0.5, r * 0.5);
      ctx.fillStyle = '#FF5020';
      ctx.shadowColor = '#FF5020';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(vx, vy, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    /* ═══ اسم القمر (للقمر الرئيسي) ═══ */
    if(p.moons.indexOf(moon) === 0 && p.tier >= 3){
      ctx.font = 'bold 8px "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.textAlign = 'center';
      ctx.fillText(moon.name, pos.x, pos.y + r + 10);
    }
  }
}

function drawSky(){
  const s = G.currentScene;

  /* ═══ ASCEND ═══ */
  if(G.mode === 'ASCEND'){
    const altM = getMeters();
    const biome = getAscendBiome(altM);
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, biome.skyTop);
    g.addColorStop(1, biome.skyBot);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    if(biome.fog){ ctx.fillStyle = biome.fog; ctx.fillRect(0, 0, W, H); }
    if(altM > 3000){
      const starBoost = clamp((altM - 3000) / 5000, 0, 1);
      const parallax = (G.camY * 0.15) % (H * 2);
      for(const st of G.stars){
        const twinkle = 0.5 + 0.5 * Math.sin(G.t * 0.02 + st.p);
        ctx.globalAlpha = st.a * starBoost * twinkle;
        ctx.fillStyle = '#FFFFFF';
        const sy = ((st.y + parallax) % (H * 1.6)) - H * 0.3;
        ctx.beginPath(); ctx.arc(st.x, sy, st.s * 0.9, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    if(biome.lightning && Math.random() < 0.005){
      ctx.fillStyle = 'rgba(255,255,200,0.35)';
      ctx.fillRect(0, 0, W, H);
      Sfx.play(80, 0.3, 'sine', 0.05, 40);
    }
    return;
  }

    /* ═══ PLANET SKY ═══ */
/* ═══ PLANET SKY v2 — مطوّر بالكامل ═══ */
if(G.realm === REALM.PLANET && G.planet){
  const p = G.planet;
  const t = G.t;

  /* ═══ 1) تدرج السماء الأساسي ═══ */
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, p.sky);
  g.addColorStop(1, p.skyBot);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  /* ═══ 2) طبقات الغلاف الجوي ═══ */
  if(p.atmosphere){
    const atm = p.atmosphere;
    const layers = atm.layers || 3;
    for(let i = 0; i < layers; i++){
      const layerAlpha = atm.density * 0.18 * (1 - i * 0.25);
      const yOffset = i * (H / layers);
      const atmGrad = ctx.createLinearGradient(0, yOffset, 0, yOffset + H / layers);
      atmGrad.addColorStop(0, 'rgba(0,0,0,0)');
      atmGrad.addColorStop(0.5, atm.color);
      atmGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = layerAlpha;
      ctx.fillStyle = atmGrad;
      ctx.fillRect(0, yOffset, W, H / layers);
    }
    ctx.globalAlpha = 1;

    /* ═══ 2b) الشرائط الأفقية (للمشتري وزحل) ═══ */
    if(atm.bands){
      ctx.save();
      ctx.globalAlpha = 0.15;
      for(let i = 0; i < 8; i++){
        const bandY = (i / 8) * H + Math.sin(t * 0.002 + i) * 12;
        const bandH = 20 + Math.sin(i * 1.7) * 12;
        ctx.fillStyle = i % 2 === 0 ? atm.color : mixColor(atm.color, '#FFFFFF', 0.3);
        ctx.fillRect(0, bandY, W, bandH);
      }
      ctx.restore();
    }

    /* ═══ 2c) الشفق القطبي (لأورانوس ونبتون) ═══ */
    if(atm.aurora){
      ctx.save();
      ctx.globalAlpha = 0.35 + Math.sin(t * 0.03) * 0.15;
      const auroraGrad = ctx.createLinearGradient(0, 0, 0, H * 0.4);
      const hue = (t * 0.5) % 360;
      auroraGrad.addColorStop(0, `hsla(${140 + Math.sin(t*0.02)*30}, 90%, 60%, 0.6)`);
      auroraGrad.addColorStop(0.5, `hsla(${180 + Math.sin(t*0.03)*30}, 80%, 55%, 0.35)`);
      auroraGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = auroraGrad;

      /* موجات شفق متعددة */
      for(let wave = 0; wave < 4; wave++){
        ctx.beginPath();
        ctx.moveTo(0, 0);
        for(let x = 0; x <= W; x += 20){
          const wy = Math.sin(x * 0.02 + t * 0.02 + wave) * 30
                    + Math.sin(x * 0.05 + t * 0.03 + wave * 1.5) * 15
                    + wave * 25 + 20;
          ctx.lineTo(x, wy);
        }
        ctx.lineTo(W, 0);
        ctx.closePath();
        ctx.globalAlpha = 0.1;
        ctx.fill();
      }
      ctx.restore();
    }
  }

  /* ═══ 3) النجوم (كلما بعدنا عن الشمس) ═══ */
  const starDensity = 1 - Math.min(1, p.sunBrightness);
  if(starDensity > 0.2){
    for(let i = 0; i < 80; i++){
      const sx = (i * 137) % W;
      const sy = (i * 89) % (H * 0.7);
      const twinkle = 0.5 + Math.sin(t * 0.03 + i) * 0.5;
      ctx.globalAlpha = starDensity * twinkle * 0.7;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(sx, sy, 1 + (i % 3) * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  /* ═══ 4) الشمس البعيدة ═══ */
  const sunX = W * 0.85;
  const sunY = H * 0.15;
  const sunSize = 20 * (p.sunSize || 1);
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunSize * 8);
  sunGrad.addColorStop(0, '#FFF8E0');
  sunGrad.addColorStop(0.3, p.accent);
  sunGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunSize * 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = '#FFF8E0';
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunSize * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  /* ═══ 5) الأرض البعيدة (إن كانت مرئية) ═══ */
  if(p.earthVisible){
    const earthX = W * 0.18;
    const earthY = H * 0.22;
    const earthSize = 4 + p.tier * 0.3;

    ctx.shadowColor = '#80C0FF';
    ctx.shadowBlur = 14;
    ctx.fillStyle = '#4080FF';
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthSize, 0, Math.PI * 2);
    ctx.fill();

    /* القارات */
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#40C080';
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(earthX - 1, earthY - 1, earthSize * 0.4, 0, Math.PI * 2);
    ctx.arc(earthX + 2, earthY + 1, earthSize * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    /* تسمية صغيرة */
    if(p.tier >= 3){
      ctx.font = 'bold 8px "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(128,192,255,0.6)';
      ctx.textAlign = 'center';
      ctx.fillText('EARTH', earthX, earthY + earthSize + 10);
    }
  }

  /* ═══ 6) البقعة الحمراء الكبرى (المشتري) ═══ */
  if(p.hasGreatSpot){
    const spotX = W * 0.72;
    const spotY = H * 0.42;
    const spotR = 42;
    const spotGrad = ctx.createRadialGradient(spotX, spotY, 5, spotX, spotY, spotR);
    spotGrad.addColorStop(0, '#D04030');
    spotGrad.addColorStop(0.5, '#C03020');
    spotGrad.addColorStop(1, 'rgba(160,48,32,0)');

    ctx.save();
    ctx.globalAlpha = 0.55 + Math.sin(t * 0.01) * 0.1;
    ctx.fillStyle = spotGrad;

    /* شكل بيضاوي للبقعة */
    ctx.translate(spotX, spotY);
    ctx.scale(1.6, 1);
    ctx.beginPath();
    ctx.arc(0, 0, spotR, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /* ═══ 7) النيازك المتساقطة (عطارد والزهرة) ═══ */
  if(p.weather && (p.weather.type === 'meteor' || p.weather.type === 'acidRain')){
    if(Math.random() < (p.weather.rate || 0.005) * 3){
      const mx = rand(0, W);
      const my = -20;
      const mlen = rand(60, 140);
      const mangle = rand(0.4, 0.8);
      const grad = ctx.createLinearGradient(mx, my, mx - Math.cos(mangle) * mlen, my + Math.sin(mangle) * mlen);
      grad.addColorStop(0, p.weather.type === 'acidRain' ? '#E8FF80' : '#FFE080');
      grad.addColorStop(1, 'rgba(255,200,100,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(mx - Math.cos(mangle) * mlen, my + Math.sin(mangle) * mlen);
      ctx.stroke();
    }
  }

  /* ═══ 8) هالة الغلاف الجوي ═══ */
  if(p.haze){
    ctx.fillStyle = p.haze;
    ctx.fillRect(0, 0, W, H);
  }
}

/* بعد انتهاء كتلة الكوكب في drawSky() */
if(G.realm === REALM.PLANET){
  drawPlanetRings();
  drawPlanetMoons();
}

  /* ═══ UNDERGROUND ═══ */
  if(G.realm === REALM.UNDERGROUND || G.camYUnder > 20){
    const layer = UNDER_REALM.layers[G.underLayerIdx] || UNDER_REALM.layers[0];
    ctx.fillStyle = layer.bgBot || '#000000';
    ctx.fillRect(0, 0, W, H);
    return;
  }

  /* ═══ حساب ألوان سماء الأرض (المشهد + الطقس + الارتفاع) ═══ */
  const altN = clamp(G.camY / 700, 0, 1);
  let groundTop, groundBot, starBoost = 0;
  if(altN < 0.35){
    const t = altN / 0.35;
    groundTop = mixColor(s.sky, '#A8D8FF', t * 0.55);
    groundBot = mixColor(s.skyBot || s.sky, '#70A8E0', t * 0.55);
  } else if(altN < 0.65){
    const t = (altN - 0.35) / 0.3;
    groundTop = mixColor('#A8D8FF', '#2A3A80', t);
    groundBot = mixColor('#70A8E0', '#101840', t);
    starBoost = t * 0.5;
  } else {
    const t = (altN - 0.65) / 0.35;
    groundTop = mixColor('#2A3A80', '#040418', t);
    groundBot = mixColor('#101840', '#0A0420', t);
    starBoost = 0.5 + t * 0.5;
  }

  /* ═══ ألوان الطبقة السماوية ═══ */
  const skyLayer = SKY_REALM.layers[G.skyLayerIdx];

  /* ═══ نسبة المزج ═══ */
  const blend = getRealmSkyBlend();

  /* ═══ الألوان النهائية (مزج ناعم) ═══ */
  const finalTop = mixColor(groundTop, skyLayer.sky,    blend);
  const finalBot = mixColor(groundBot, skyLayer.skyBot, blend);

  /* ═══ ارسم تدرج موحّد يغطي الشاشة كاملة ═══ */
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0,    finalTop);
  g.addColorStop(0.55, mixColor(finalTop, finalBot, 0.65));
  g.addColorStop(1,    finalBot);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  /* ═══ النجوم ═══ */
  const effectiveStarAmount = (s.starAmount || 0) * (1 - blend) + 0.35 * blend;
  const totalStars = Math.min(effectiveStarAmount + starBoost * (1 - blend), 1);
  if(totalStars > 0.01){
    for(const st of G.stars){
      const twinkle = 0.5 + 0.5 * Math.sin(G.t * 0.02 + st.p);
      ctx.globalAlpha = st.a * totalStars * twinkle;
      ctx.fillStyle = '#FFFFFF';
      const size = st.s * 0.5 * (1 + starBoost * 0.8);
      ctx.beginPath(); ctx.arc(st.x, st.y, size, 0, Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  /* ═══ الشمس والقمر (يتلاشيان عند دخول السماء) ═══ */
  const celX = W * 0.75, celY = H * 0.18;
  const celScale = Math.max(0.35, 1 - altN * 0.65);
  const celAlpha = 1 - blend;

  if(celAlpha > 0.02){
    if(s.moonAmount < 0.99){
      const sunA = (1 - s.moonAmount) * (1 - altN * 0.7) * celAlpha;
      if(sunA > 0.02){
        ctx.globalAlpha = 0.5 * sunA;
        const glow = ctx.createRadialGradient(celX, celY, 4, celX, celY, 140 * celScale);
        glow.addColorStop(0, s.sunGlow || s.sun);
        glow.addColorStop(0.35, s.sun);
        glow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(celX, celY, 140 * celScale, 0, Math.PI*2); ctx.fill();
        ctx.globalAlpha = sunA;
        ctx.fillStyle = s.sun;
        ctx.beginPath(); ctx.arc(celX, celY, 30 * celScale, 0, Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    if(s.moonAmount > 0.01){
      const moonA = s.moonAmount * (1 - altN * 0.7) * celAlpha;
      if(moonA > 0.02){
        ctx.globalAlpha = 0.55 * moonA;
        const glow = ctx.createRadialGradient(celX, celY, 4, celX, celY, 150 * celScale);
        glow.addColorStop(0, s.moonGlow || s.moon);
        glow.addColorStop(0.4, s.moon);
        glow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(celX, celY, 150 * celScale, 0, Math.PI*2); ctx.fill();
        ctx.globalAlpha = moonA;
        ctx.fillStyle = s.moon;
        ctx.beginPath(); ctx.arc(celX, celY, 28 * celScale, 0, Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }

  /* ═══ الأفق البرتقالي (يختفي مع الدخول للسماء) ═══ */
  if(altN > 0.2 && altN < 0.8 && blend < 0.5){
    const horizonA = Math.sin((altN - 0.2) / 0.6 * Math.PI) * 0.35 * (1 - blend);
    const horizon = ctx.createLinearGradient(0, H * 0.75, 0, H);
    horizon.addColorStop(0, 'rgba(255,180,120,0)');
    horizon.addColorStop(1, `rgba(255,150,100,${horizonA})`);
    ctx.fillStyle = horizon;
    ctx.fillRect(0, H * 0.75, W, H * 0.25);
  }
}

function drawHills(){
  const s = G.currentScene;

  if(G.mode === 'ASCEND') return;
  if(G.realm === REALM.UNDERGROUND || G.realm === REALM.SKY || G.realm === REALM.PLANET) return;
  if(G.camYUnder > 20) return;

  /* 3 طبقات فقط — بسيطة ونظيفة */
  const layers = [
    { color: s.hillFar,  baseY: H*0.48, amp: 35, freq: 0.0045, phase: 0,   speed: 0.12, alpha: 0.70 },
    { color: s.hillMid,  baseY: H*0.62, amp: 42, freq: 0.0070, phase: 1.6, speed: 0.28, alpha: 0.88 },
    { color: s.hillNear, baseY: H*0.78, amp: 32, freq: 0.0110, phase: 3.2, speed: 0.55, alpha: 1.00 }
  ];

  for(const L of layers){
    ctx.save();

    /* تثبيت كامل مع الأرض — نفس إزاحة الكاميرا */
    ctx.translate(0, G.camY);

    ctx.globalAlpha = L.alpha;
    ctx.fillStyle = L.color;

    /* امتداد سفلي عميق لمنع الفجوات عند تحرك الكاميرا */
    const hillsBottom = H * 2;
    const off = (G.dist * L.speed) % W;

    ctx.beginPath();
    ctx.moveTo(-30, hillsBottom);

    for(let x = -30; x <= W + 30; x += 12){
      const wx = x + off;
      const y = L.baseY
              - Math.sin(wx * L.freq + L.phase) * L.amp
              - Math.sin(wx * L.freq * 2.1 + L.phase * 1.4) * L.amp * 0.28;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W + 30, hillsBottom);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

/* ═══════════════════════════════════════════════════════
   ════════════════ UNDERWORLD v3 — MEGA ═══════════════
   ═══════════════════════════════════════════════════════ */

function drawUnderworld(){
  if(G.realm !== REALM.UNDERGROUND && G.camYUnder < 10) return;

  const layer = UNDER_REALM.layers[G.underLayerIdx] || UNDER_REALM.layers[0];
  const accent = layer.accent || '#FF8060';
  const wall = layer.wall || '#5E4028';
  const wallDark = layer.wallDark || '#2A1810';

  const worldTop = G.camYUnder - 300;
  const worldBot = G.camYUnder + H + 300;

  /* ═══ 1) الخلفية المتدرجة ═══ */
  const bg = ctx.createLinearGradient(0, worldTop, 0, worldBot);
  bg.addColorStop(0,   layer.bg    || '#1A0E08');
  bg.addColorStop(0.5, mixColor(layer.bg || '#1A0E08', layer.bgBot || '#000', 0.4));
  bg.addColorStop(1,   layer.bgBot || '#000000');
  ctx.fillStyle = bg;
  ctx.fillRect(0, worldTop, W, worldBot - worldTop);

  /* ═══ 2) جبال بعيدة (عمق) ═══ */
  {
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = mixColor(wallDark, '#000', 0.5);
    const off = (G.dist * 0.04) % W;
    const midWorld = G.camYUnder + H * 0.5;
    ctx.beginPath();
    ctx.moveTo(-40, midWorld + 300);
    for(let x = -40; x <= W + 40; x += 25){
      const wx = x + off;
      const h = 180 + Math.abs(Math.sin(wx * 0.0035)) * 240 + Math.sin(wx * 0.008) * 80;
      ctx.lineTo(x, midWorld + 300 - h);
    }
    ctx.lineTo(W + 40, midWorld + 300);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  /* ═══ 3) طبقات صخرية متعددة (parallax) ═══ */
  const rockLayers = [
    { speed: 0.12, offset: 0,    amp: 70,  freq: 0.005, alpha: 0.40, col: mixColor(wall, '#000', 0.55) },
    { speed: 0.30, offset: 150,  amp: 100, freq: 0.009, alpha: 0.60, col: mixColor(wall, '#000', 0.25) },
    { speed: 0.55, offset: 350,  amp: 140, freq: 0.013, alpha: 0.85, col: wall },
    { speed: 0.85, offset: 550,  amp: 180, freq: 0.017, alpha: 1.00, col: wallDark }
  ];

  for(const L of rockLayers){
    const off = (G.dist * L.speed) % W;
    ctx.save();
    ctx.globalAlpha = L.alpha;
    ctx.fillStyle = L.col;

    /* الطبقة العلوية */
    const topBase = worldTop + L.offset;
    ctx.beginPath();
    ctx.moveTo(-30, topBase);
    for(let x = -30; x <= W + 30; x += 18){
      const wx = x + off;
      const h = 40 + Math.abs(Math.sin(wx * L.freq + L.offset * 0.01)) * L.amp
              + Math.sin(wx * L.freq * 2.3) * L.amp * 0.35;
      ctx.lineTo(x, topBase + h);
    }
    ctx.lineTo(W + 30, topBase);
    ctx.closePath();
    ctx.fill();

    /* الطبقة السفلية */
    const botBase = worldBot - L.offset;
    ctx.beginPath();
    ctx.moveTo(-30, botBase);
    for(let x = -30; x <= W + 30; x += 18){
      const wx = x + off;
      const h = 40 + Math.abs(Math.cos(wx * L.freq + L.offset * 0.01)) * L.amp
              + Math.cos(wx * L.freq * 2.1) * L.amp * 0.35;
      ctx.lineTo(x, botBase - h);
    }
    ctx.lineTo(W + 30, botBase);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  /* ═══ 4) المعالم العملاقة (5x أكبر من السابق) ═══ */
  drawMegaLandmarks(layer, accent, wall, wallDark);

  /* ═══ 5) الهوابط والصواعد ═══ */
  drawStalactites(layer, wall, wallDark, accent);
  drawStalagmites(layer, wall, wallDark, accent);

  /* ═══ 6) بلورات صغيرة متلألئة ═══ */
  for(let i = 0; i < 30; i++){
    const seed = i * 271;
    const baseX = (seed * 37) % W;
    const parallax = 0.5 + (i % 4) * 0.12;
    const x = ((baseX - G.dist * parallax * 0.3) % W + W) % W;
    const worldY = G.camYUnder + 40 + ((seed * 89) % Math.max(1, H - 80));
    const size = 1.5 + (i % 3) * 1.2;
    const pulse = 0.4 + Math.sin(G.t * 0.08 + i) * 0.4;

    ctx.save();
    ctx.globalAlpha = pulse;
    ctx.fillStyle = accent;
    ctx.shadowColor = accent;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(x, worldY, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /* ═══ 7) غبار متطاير ═══ */
  for(let i = 0; i < 50; i++){
    const seed = i * 73;
    const baseX = (seed * 41) % W;
    const x = ((baseX - G.dist * 0.2) % W + W) % W;
    const yJitter = (seed * 91) % Math.max(1, H - 100);
    const worldY = G.camYUnder + 50 + yJitter + Math.sin(G.t * 0.02 + i * 0.7) * 18;
    const sz = 1 + (i % 3) * 0.8;
    const alpha = 0.12 + (i % 4) * 0.06;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(x, worldY, sz, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /* ═══ 8) توهج حول اللاعب ═══ */
  if(G.realm === REALM.UNDERGROUND && G.state === 'PLAYING'){
    ctx.save();
    const glow = ctx.createRadialGradient(P.x, P.y, 40, P.x, P.y, 380);
    glow.addColorStop(0,   accent + '55');
    glow.addColorStop(0.5, accent + '18');
    glow.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(P.x, P.y, 380, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

/* ═══════════════ المعالم العملاقة ═══════════════ */
function drawMegaLandmarks(layer, accent, wall, wallDark){
  const SPACING = 900;   /* كل 900px */
  const seedBase = Math.floor(G.dist / SPACING);

  for(let k = -2; k <= 2; k++){
    const seed = seedBase + k;
    const worldX = seed * SPACING;
    const screenX = worldX - G.dist;
    if(screenX < -900 || screenX > W + 900) continue;

    /* اختر نوع المعلم */
    const typeRoll = Math.abs((seed * 9301 + 49297) % 233280) / 233280;

    let type;
    if(typeRoll < 0.15)      type = 'megaCrystal';
    else if(typeRoll < 0.30) type = 'megaArch';
    else if(typeRoll < 0.45) type = 'megaRiver';
    else if(typeRoll < 0.58) type = 'megaTemple';
    else if(typeRoll < 0.72) type = 'megaGeode';
    else if(typeRoll < 0.85) type = 'megaFossil';
    else                     type = 'megaWaterfall';

    /* 3 نسخ بمواضع عمودية مختلفة */
    for(let d = 0; d < 3; d++){
      const worldY = GROUND_Y + 400 + ((seed * 719 + d * 1000) % 2800);
      const screenY = worldY - G.camYUnder;

      /* القصّ على الشاشة — لكن الرسم على worldY */
      if(screenY < -600 || screenY > H + 600) continue;

      ctx.save();
      ctx.translate(screenX, worldY);

      switch(type){
        case 'megaCrystal':    drawMegaCrystal(accent, wall, wallDark);       break;
        case 'megaArch':       drawMegaArch(accent, wall, wallDark);          break;
        case 'megaRiver':      drawMegaRiver(accent, wall, wallDark);         break;
        case 'megaTemple':     drawMegaTemple(accent, wall, wallDark);        break;
        case 'megaGeode':      drawMegaGeode(accent, wall, wallDark);         break;
        case 'megaFossil':     drawMegaFossil(accent, wall, wallDark);        break;
        case 'megaWaterfall':  drawMegaWaterfall(accent, wall, wallDark);     break;
      }

      ctx.restore();
    }
  }
}

/* ═══ 1) بلورة عملاقة (600px ارتفاع) ═══ */
function drawMegaCrystal(accent, wall, wallDark){
  const H_CRYSTAL = 600;
  const W_CRYSTAL = 180;

  /* هالة عملاقة */
  const halo = ctx.createRadialGradient(0, -H_CRYSTAL/2, 20, 0, -H_CRYSTAL/2, H_CRYSTAL);
  halo.addColorStop(0, accent);
  halo.addColorStop(0.4, mixColor(accent, wall, 0.5) + 'aa');
  halo.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, -H_CRYSTAL/2, H_CRYSTAL, 0, Math.PI * 2);
  ctx.fill();

  /* جسم البلورة الرئيسي */
  ctx.fillStyle = mixColor(accent, wall, 0.35);
  ctx.beginPath();
  ctx.moveTo(-W_CRYSTAL/2, 0);
  ctx.lineTo(-W_CRYSTAL*0.35, -H_CRYSTAL*0.7);
  ctx.lineTo(0, -H_CRYSTAL);
  ctx.lineTo(W_CRYSTAL*0.35, -H_CRYSTAL*0.7);
  ctx.lineTo(W_CRYSTAL/2, 0);
  ctx.closePath();
  ctx.fill();

  /* حافة مضيئة */
  ctx.strokeStyle = mixColor(accent, '#FFFFFF', 0.5);
  ctx.lineWidth = 3;
  ctx.shadowColor = accent;
  ctx.shadowBlur = 25;
  ctx.stroke();
  ctx.shadowBlur = 0;

  /* بؤرة داخلية */
  const inner = ctx.createRadialGradient(0, -H_CRYSTAL*0.6, 10, 0, -H_CRYSTAL*0.6, W_CRYSTAL);
  inner.addColorStop(0, '#FFFFFF');
  inner.addColorStop(0.5, accent);
  inner.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = inner;
  ctx.globalAlpha = 0.6 + Math.sin(G.t * 0.05) * 0.3;
  ctx.beginPath();
  ctx.arc(0, -H_CRYSTAL*0.6, W_CRYSTAL, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  /* بلورات صغيرة حول القاعدة */
  for(let i = 0; i < 6; i++){
    const side = i < 3 ? -1 : 1;
    const px = side * (W_CRYSTAL/2 + 20 + (i % 3) * 35);
    const ph = 80 + (i % 3) * 60;
    ctx.fillStyle = mixColor(accent, wall, 0.3);
    ctx.beginPath();
    ctx.moveTo(px - 18, 0);
    ctx.lineTo(px, -ph);
    ctx.lineTo(px + 18, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  /* بركة عند القاعدة */
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.ellipse(0, 10, 260, 25, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

/* ═══ 2) قوس ضخم (500px عرض، 700px ارتفاع) ═══ */
function drawMegaArch(accent, wall, wallDark){
  const W_ARCH = 500;
  const H_ARCH = 700;
  const legW = 90;

  /* الأرجل */
  for(const side of [-1, 1]){
    const px = side * W_ARCH/2;
    /* الظل */
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(px - legW/2 + 8, -H_ARCH + 8, legW, H_ARCH);

    /* العمود */
    ctx.fillStyle = wall;
    ctx.fillRect(px - legW/2, -H_ARCH, legW, H_ARCH);

    /* ظل جانبي */
    ctx.fillStyle = wallDark;
    ctx.fillRect(px + legW/2 - 15, -H_ARCH, 15, H_ARCH);

    /* إضاءة جانبية */
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(px - legW/2 + 5, -H_ARCH, 8, H_ARCH);

    /* نقوش */
    for(let i = 0; i < 12; i++){
      const py = -H_ARCH + 30 + i * (H_ARCH - 60) / 12;
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px - legW/2 + 12, py);
      ctx.lineTo(px + legW/2 - 12, py);
      ctx.stroke();
    }
  }

  /* الجزء العلوي (منحنى) */
  ctx.fillStyle = wall;
  ctx.beginPath();
  ctx.moveTo(-W_ARCH/2 - legW/2, -H_ARCH);
  ctx.lineTo(-W_ARCH/2 - legW/2, -H_ARCH - 40);
  ctx.quadraticCurveTo(0, -H_ARCH - 180, W_ARCH/2 + legW/2, -H_ARCH - 40);
  ctx.lineTo(W_ARCH/2 + legW/2, -H_ARCH);
  ctx.closePath();
  ctx.fill();

  /* إضاءة أعلى القوس */
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.5 + Math.sin(G.t * 0.05) * 0.2;
  ctx.lineWidth = 4;
  ctx.shadowColor = accent;
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.moveTo(-W_ARCH/2 - legW/2, -H_ARCH - 40);
  ctx.quadraticCurveTo(0, -H_ARCH - 180, W_ARCH/2 + legW/2, -H_ARCH - 40);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;

  /* بلورة معلقة في المنتصف */
  ctx.fillStyle = mixColor(accent, '#FFFFFF', 0.3);
  ctx.beginPath();
  ctx.moveTo(-25, -H_ARCH - 70);
  ctx.lineTo(0, -H_ARCH - 170);
  ctx.lineTo(25, -H_ARCH - 70);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();
}

/* ═══ 3) نهر جوفي عريض (كامل الشاشة) ═══ */
function drawMegaRiver(accent, wall, wallDark){
  const W_RIVER = 900;
  const H_RIVER = 120;

  /* قاع النهر */
  ctx.fillStyle = mixColor(accent, '#000', 0.6);
  ctx.beginPath();
  ctx.moveTo(-W_RIVER/2, -H_RIVER/2 + 40);
  ctx.quadraticCurveTo(-W_RIVER/4, -H_RIVER/2 + 10, 0, -H_RIVER/2 + 20);
  ctx.quadraticCurveTo(W_RIVER/4, -H_RIVER/2 + 30, W_RIVER/2, -H_RIVER/2 + 15);
  ctx.lineTo(W_RIVER/2, H_RIVER/2);
  ctx.quadraticCurveTo(W_RIVER/4, H_RIVER/2 + 20, 0, H_RIVER/2);
  ctx.quadraticCurveTo(-W_RIVER/4, H_RIVER/2 - 20, -W_RIVER/2, H_RIVER/2 + 10);
  ctx.closePath();
  ctx.fill();

  /* سطح النهر */
  const grad = ctx.createLinearGradient(0, -H_RIVER/2, 0, H_RIVER/2);
  grad.addColorStop(0, mixColor(accent, '#FFFFFF', 0.4));
  grad.addColorStop(0.5, accent);
  grad.addColorStop(1, mixColor(accent, '#000', 0.7));
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(-W_RIVER/2, -H_RIVER/2 + 35);
  ctx.quadraticCurveTo(-W_RIVER/4, -H_RIVER/2 + 5, 0, -H_RIVER/2 + 15);
  ctx.quadraticCurveTo(W_RIVER/4, -H_RIVER/2 + 25, W_RIVER/2, -H_RIVER/2 + 10);
  ctx.quadraticCurveTo(W_RIVER/4, H_RIVER/2 - 5, 0, H_RIVER/2 - 10);
  ctx.quadraticCurveTo(-W_RIVER/4, H_RIVER/2 - 25, -W_RIVER/2, H_RIVER/2);
  ctx.closePath();
  ctx.fill();

  /* موجات متحركة */
  for(let i = 0; i < 12; i++){
    const t = ((G.t * 0.6 + i * 80) % W_RIVER) - W_RIVER/2;
    const px = t;
    const py = -H_RIVER/2 + 20 + Math.sin(t * 0.02 + i) * 15;
    ctx.strokeStyle = `rgba(255,255,255,${0.4 - i * 0.02})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px - 40, py);
    ctx.quadraticCurveTo(px, py + 5, px + 40, py);
    ctx.stroke();
  }

  /* توهج شامل */
  const glow = ctx.createRadialGradient(0, 0, 40, 0, 0, W_RIVER * 0.6);
  glow.addColorStop(0, accent + '88');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.arc(0, 0, W_RIVER * 0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

/* ═══ 4) معبد عملاق (800px ارتفاع) ═══ */
function drawMegaTemple(accent, wall, wallDark){
  const W_TEMPLE = 600;
  const H_TEMPLE = 800;

  /* الأساس */
  ctx.fillStyle = wallDark;
  ctx.fillRect(-W_TEMPLE/2 - 40, 0, W_TEMPLE + 80, 50);
  ctx.fillStyle = wall;
  ctx.fillRect(-W_TEMPLE/2 - 20, -20, W_TEMPLE + 40, 30);

  /* الأعمدة */
  const pillars = 8;
  for(let i = 0; i < pillars; i++){
    const px = -W_TEMPLE/2 + 50 + i * ((W_TEMPLE - 100) / (pillars - 1));
    if(i === 3 || i === 4) continue;   /* المدخل */

    /* ظل */
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(px - 22 + 6, -H_TEMPLE + 6, 44, H_TEMPLE - 50);

    /* العمود */
    ctx.fillStyle = wall;
    ctx.fillRect(px - 22, -H_TEMPLE, 44, H_TEMPLE - 50);

    /* إضاءة جانبية */
    ctx.fillStyle = wallDark;
    ctx.fillRect(px + 10, -H_TEMPLE, 12, H_TEMPLE - 50);

    /* تاج */
    ctx.fillStyle = mixColor(wall, '#FFFFFF', 0.2);
    ctx.fillRect(px - 30, -H_TEMPLE, 60, 40);
    ctx.fillStyle = wallDark;
    ctx.fillRect(px - 30, -H_TEMPLE + 40, 60, 8);
  }

  /* السقف */
  ctx.fillStyle = wall;
  ctx.beginPath();
  ctx.moveTo(-W_TEMPLE/2 - 60, -H_TEMPLE);
  ctx.lineTo(0, -H_TEMPLE - 120);
  ctx.lineTo(W_TEMPLE/2 + 60, -H_TEMPLE);
  ctx.closePath();
  ctx.fill();

  /* توهج من المدخل */
  const glow = ctx.createRadialGradient(0, -H_TEMPLE/2, 30, 0, -H_TEMPLE/2, 200);
  glow.addColorStop(0, accent);
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.globalAlpha = 0.8;
  ctx.fillRect(-150, -H_TEMPLE, 300, H_TEMPLE - 50);
  ctx.globalAlpha = 1;

  /* رموز على السقف */
  ctx.fillStyle = accent;
  ctx.shadowColor = accent;
  ctx.shadowBlur = 15;
  for(let i = 0; i < 5; i++){
    const px = -W_TEMPLE/2 + 100 + i * (W_TEMPLE - 200) / 4;
    ctx.beginPath();
    ctx.arc(px, -H_TEMPLE + 20, 6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;
}

/* ═══ 5) جيود عملاق (مفتوح من الجانب) ═══ */
function drawMegaGeode(accent, wall, wallDark){
  const R_GEODE = 280;

  /* الجسم الخارجي */
  const bodyGrad = ctx.createRadialGradient(-R_GEODE*0.3, -R_GEODE*0.3, 20, 0, 0, R_GEODE);
  bodyGrad.addColorStop(0, wallDark);
  bodyGrad.addColorStop(1, '#000000');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.arc(0, 0, R_GEODE, 0, Math.PI * 2);
  ctx.fill();

  /* الفتحة الداخلية */
  const holeR = R_GEODE * 0.75;
  const holeGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, holeR);
  holeGrad.addColorStop(0, '#FFFFFF');
  holeGrad.addColorStop(0.3, mixColor(accent, '#FFFFFF', 0.4));
  holeGrad.addColorStop(0.7, accent);
  holeGrad.addColorStop(1, mixColor(accent, '#000', 0.6));
  ctx.fillStyle = holeGrad;
  ctx.beginPath();
  ctx.arc(0, 0, holeR, 0, Math.PI * 2);
  ctx.fill();

  /* بلورات داخلية (شعاعية) */
  for(let i = 0; i < 24; i++){
    const a = (i / 24) * Math.PI * 2;
    const len = holeR * (0.5 + Math.sin(i * 1.3) * 0.4);
    const px = Math.cos(a) * len;
    const py = Math.sin(a) * len;

    ctx.fillStyle = i % 2 === 0 ? '#FFFFFF' : mixColor(accent, '#FFFFFF', 0.5);
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * holeR * 0.3, Math.sin(a) * holeR * 0.3);
    ctx.lineTo(px + Math.cos(a + 0.15) * 15, py + Math.sin(a + 0.15) * 15);
    ctx.lineTo(px - Math.cos(a - 0.15) * 15, py - Math.sin(a - 0.15) * 15);
    ctx.closePath();
    ctx.globalAlpha = 0.75;
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  /* توهج ديناميكي */
  ctx.globalAlpha = 0.4 + Math.sin(G.t * 0.06) * 0.3;
  const glow = ctx.createRadialGradient(0, 0, holeR * 0.5, 0, 0, R_GEODE * 1.8);
  glow.addColorStop(0, accent);
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, R_GEODE * 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

/* ═══ 6) هيكل عظمي لكائن بحري قديم ═══ */
function drawMegaFossil(accent, wall, wallDark){
  const W_FOSSIL = 700;

  /* العمود الفقري */
  ctx.strokeStyle = mixColor(wall, '#FFFFFF', 0.5);
  ctx.lineWidth = 24;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-W_FOSSIL/2, 0);
  ctx.quadraticCurveTo(0, -40, W_FOSSIL/2, 20);
  ctx.stroke();

  /* الأضلاع */
  for(let i = 0; i < 14; i++){
    const t = i / 13;
    const px = -W_FOSSIL/2 + t * W_FOSSIL;
    const py = Math.sin(t * Math.PI) * -40 + t * 20;
    const ribH = 40 + Math.sin(t * Math.PI) * 90;

    /* ضلع علوي */
    ctx.strokeStyle = mixColor(wall, '#FFFFFF', 0.4);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.quadraticCurveTo(px + 20, py - ribH * 0.5, px + 30, py - ribH);
    ctx.stroke();

    /* ضلع سفلي */
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.quadraticCurveTo(px + 20, py + ribH * 0.5, px + 30, py + ribH);
    ctx.stroke();
  }

  /* الجمجمة */
  ctx.fillStyle = mixColor(wall, '#FFFFFF', 0.5);
  ctx.beginPath();
  ctx.ellipse(-W_FOSSIL/2 - 60, -10, 70, 45, -0.2, 0, Math.PI * 2);
  ctx.fill();

  /* العين */
  ctx.fillStyle = accent;
  ctx.shadowColor = accent;
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.arc(-W_FOSSIL/2 - 75, -15, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  /* أسنان */
  ctx.fillStyle = '#FFFFFF';
  for(let i = 0; i < 8; i++){
    const px = -W_FOSSIL/2 - 100 + i * 12;
    ctx.beginPath();
    ctx.moveTo(px, 15);
    ctx.lineTo(px + 6, 35);
    ctx.lineTo(px + 12, 15);
    ctx.closePath();
    ctx.fill();
  }

  /* هالة خلفية */
  ctx.globalAlpha = 0.15;
  const glow = ctx.createRadialGradient(-W_FOSSIL/2 - 60, 0, 20, -W_FOSSIL/2 - 60, 0, 250);
  glow.addColorStop(0, accent);
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(-W_FOSSIL/2 - 60, 0, 250, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

/* ═══ 7) شلال عملاق (كامل الشاشة) ═══ */
function drawMegaWaterfall(accent, wall, wallDark){
  const W_FALL = 200;
  const H_FALL = 900;

  /* المصدر (في الأعلى) */
  ctx.fillStyle = mixColor(accent, '#FFFFFF', 0.4);
  ctx.beginPath();
  ctx.ellipse(0, -H_FALL/2, W_FALL * 0.7, 25, 0, 0, Math.PI * 2);
  ctx.fill();

  /* جسم الشلال */
  const grad = ctx.createLinearGradient(0, -H_FALL/2, 0, H_FALL/2);
  grad.addColorStop(0, mixColor(accent, '#FFFFFF', 0.3));
  grad.addColorStop(0.5, accent);
  grad.addColorStop(1, mixColor(accent, wall, 0.7));
  ctx.fillStyle = grad;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.moveTo(-W_FALL/2, -H_FALL/2);
  ctx.lineTo(W_FALL/2, -H_FALL/2);
  ctx.lineTo(W_FALL * 0.8, H_FALL/2);
  ctx.lineTo(-W_FALL * 0.8, H_FALL/2);
  ctx.closePath();
  ctx.fill();

  /* خطوط الماء */
  for(let i = 0; i < 20; i++){
    const yy = -H_FALL/2 + ((G.t * 6 + i * 60) % H_FALL);
    ctx.strokeStyle = `rgba(255,255,255,${0.5 - i * 0.02})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-W_FALL/2 + 15, yy);
    ctx.quadraticCurveTo(0, yy + 6, W_FALL/2 - 15, yy);
    ctx.stroke();
  }

  /* بركة الاستقبال */
  ctx.globalAlpha = 0.75;
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.ellipse(0, H_FALL/2 + 30, W_FALL * 2, 40, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  /* رشّات */
  for(let i = 0; i < 12; i++){
    const t = (G.t * 0.05 + i * 0.7) % 1;
    const px = Math.sin(t * 6.28 + i) * 120;
    const py = H_FALL/2 + 30 + t * 50;
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 0.7 * (1 - t);
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

/* ═══════════════ الهوابط (من السقف) ═══════════════ */
function drawStalactites(layer, wall, wallDark, accent){
  const parallax = 0.4;
  const off = (G.dist * parallax) % W;

  for(let i = 0; i < 30; i++){
    const seed = i * 137;
    const baseX = ((seed * 71) % (W + 200)) - 100;
    const x = baseX - off * ((i % 3) * 0.15 + 0.5);
    const xWrapped = ((x % (W + 200)) + (W + 200)) % (W + 200) - 100;

    /* السقف العلوي */
    const ceilingY = G.camYUnder - 100;
    const len = 60 + (seed % 200);

    ctx.fillStyle = i % 3 === 0 ? wallDark : wall;
    ctx.beginPath();
    ctx.moveTo(xWrapped - 20, ceilingY);
    ctx.lineTo(xWrapped, ceilingY + len);
    ctx.lineTo(xWrapped + 20, ceilingY);
    ctx.closePath();
    ctx.fill();

    /* نقاط مضيئة على الرأس */
    if(i % 5 === 0){
      ctx.fillStyle = accent;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 10;
      ctx.globalAlpha = 0.5 + Math.sin(G.t * 0.1 + i) * 0.4;
      ctx.beginPath();
      ctx.arc(xWrapped, ceilingY + len - 4, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }
  }
}

/* ═══════════════ الصواعد (من الأرض) ═══════════════ */
function drawStalagmites(layer, wall, wallDark, accent){
  const parallax = 0.7;
  const off = (G.dist * parallax) % W;

  for(let i = 0; i < 30; i++){
    const seed = i * 219;
    const baseX = ((seed * 53) % (W + 200)) - 100;
    const x = baseX - off * ((i % 3) * 0.15 + 0.6);
    const xWrapped = ((x % (W + 200)) + (W + 200)) % (W + 200) - 100;

    /* يظهر فقط فوق الطوابق */
    const floorStep = 300;
    const floorIdx = Math.floor(G.camYUnder / floorStep) + (i % 3);
    const baseY = GROUND_Y + (floorIdx + 1) * floorStep;
    const len = 60 + (seed % 180);

    ctx.fillStyle = i % 3 === 0 ? wallDark : wall;
    ctx.beginPath();
    ctx.moveTo(xWrapped - 20, baseY);
    ctx.lineTo(xWrapped, baseY - len);
    ctx.lineTo(xWrapped + 20, baseY);
    ctx.closePath();
    ctx.fill();

    /* نقاط مضيئة على القمة */
    if(i % 5 === 0){
      ctx.fillStyle = accent;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 10;
      ctx.globalAlpha = 0.5 + Math.sin(G.t * 0.1 + i) * 0.4;
      ctx.beginPath();
      ctx.arc(xWrapped, baseY - len + 4, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }
  }
}

function drawUnderTerrain(){
  if(G.realm !== REALM.UNDERGROUND && G.camYUnder < 20) return;
  
  const layer = UNDER_REALM.layers[G.underLayerIdx] || UNDER_REALM.layers[0];
  const layerId = layer.id;
  const accent = layer.accent || '#FF8060';
  const wall = layer.wall;
  const wallDark = layer.wallDark;
  
  const worldTop = G.camYUnder - 150;
  const worldBot = G.camYUnder + H + 150;
  
  /* نطاق الطوابق المرئية */
  let iLow = Math.max(0, Math.floor((worldTop - GROUND_Y) / UNDER_FLOOR_SPACING) - 1);
  let iHigh = Math.floor((worldBot - GROUND_Y) / UNDER_FLOOR_SPACING) + 1;
  if(iHigh - iLow > 12) iHigh = iLow + 12;
  
  for(let idx = iLow; idx <= iHigh; idx++){
    const floorY = getUnderFloorWorldY(idx);
    const worldOffset = idx * 431;
    
    /* ═══ عناصر كل 3 طوابق: عمود ضخم ═══ */
    if(idx % 3 === 0){
      const pillarWorldX = (Math.floor(G.dist / 500) * 500) + (idx * 200);
      const px = pillarWorldX - G.dist;
      
      if(px > -200 && px < W + 200){
        const pw = 60 + (idx % 3) * 15;
        const ph = UNDER_COLUMN_HEIGHT;
        const py = floorY - ph;
        
        /* الظل */
        ctx.fillStyle = 'rgba(0,0,0,0.45)';
        ctx.fillRect(px + 8, py + 8, pw, ph);
        
        /* العمود */
        ctx.fillStyle = wall;
        ctx.fillRect(px, py, pw, ph);
        
        /* حافة داكنة */
        ctx.fillStyle = wallDark;
        ctx.fillRect(px + pw - 8, py, 8, ph);
        
        /* خطوط أفقية */
        ctx.strokeStyle = 'rgba(0,0,0,0.25)';
        ctx.lineWidth = 2;
        for(let ly = py + 20; ly < py + ph - 10; ly += 30){
          ctx.beginPath();
          ctx.moveTo(px + 4, ly);
          ctx.lineTo(px + pw - 4, ly);
          ctx.stroke();
        }
        
        /* نقاط مضيئة على العمود */
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.6 + Math.sin(G.t * 0.1 + idx) * 0.3;
        for(let i = 0; i < 3; i++){
          ctx.beginPath();
          ctx.arc(px + 15 + i * 18, py + 40 + i * 40, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    }
    
    /* ═══ عناصر كل 5 طوابق: هيكل عظمي/أطلال ═══ */
    if(idx % 5 === 2){
      const ruinWorldX = (Math.floor(G.dist / 700) * 700) + (idx * 350);
      const rx = ruinWorldX - G.dist;
      
      if(rx > -300 && rx < W + 300){
        const rw = 280;
        const rh = 120;
        const ry = floorY - rh;
        
        /* جدار متهدم */
        ctx.fillStyle = wallDark;
        ctx.beginPath();
        ctx.moveTo(rx, ry + 30);
        ctx.lineTo(rx + 40, ry);
        ctx.lineTo(rx + 80, ry + 20);
        ctx.lineTo(rx + 130, ry - 10);
        ctx.lineTo(rx + 180, ry + 25);
        ctx.lineTo(rx + 240, ry + 5);
        ctx.lineTo(rx + rw, ry + 35);
        ctx.lineTo(rx + rw, ry + rh);
        ctx.lineTo(rx, ry + rh);
        ctx.closePath();
        ctx.fill();
        
        /* شقوق */
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.lineWidth = 2;
        for(let i = 0; i < 5; i++){
          ctx.beginPath();
          ctx.moveTo(rx + 30 + i * 50, ry + 20);
          ctx.lineTo(rx + 40 + i * 50, ry + rh);
          ctx.stroke();
        }
        
        /* نقاط مضيئة (أضواء قديمة) */
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.5 + Math.sin(G.t * 0.08 + idx) * 0.3;
        for(let i = 0; i < 3; i++){
          ctx.beginPath();
          ctx.arc(rx + 60 + i * 80, ry + 60, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    }
    
    /* ═══ عناصر كل 7 طوابق: بحيرة حمم/بلورات (حسب الطبقة) ═══ */
    if(idx % 7 === 3){
      const poolWorldX = (Math.floor(G.dist / 900) * 900) + (idx * 450);
      const px2 = poolWorldX - G.dist;
      
      if(px2 > -250 && px2 < W + 250){
        const pw = 220;
        const ph = 30;
        const py = floorY - ph;
        
        /* لون الحوض حسب الطبقة */
        let poolColor1 = accent;
        let poolColor2 = wall;
        if(layerId === 'magma' || layerId === 'core'){
          poolColor1 = '#FF5020';
          poolColor2 = '#8E2018';
        } else if(layerId === 'abyss' || layerId === 'void'){
          poolColor1 = '#A080FF';
          poolColor2 = '#302060';
        } else {
          poolColor1 = '#40E8D0';
          poolColor2 = '#1A6050';
        }
        
        /* حوض الحمم/البلورات */
        const grad = ctx.createLinearGradient(px2, py, px2, py + ph);
        grad.addColorStop(0, poolColor1);
        grad.addColorStop(1, poolColor2);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(px2 + pw/2, py + ph/2, pw/2, ph/2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        /* توهج */
        const glow = ctx.createRadialGradient(px2 + pw/2, py, 5, px2 + pw/2, py, pw * 0.7);
        glow.addColorStop(0, poolColor1 + '88');
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px2 + pw/2, py, pw * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

function drawUnderFloors(){
  if(G.realm !== REALM.UNDERGROUND && G.camYUnder < 20) return;
  
  const layer = UNDER_REALM.layers[G.underLayerIdx] || UNDER_REALM.layers[0];
  
  const viewTop = G.camYUnder - 100;
  const viewBot = G.camYUnder + H + 100;
  
  let iLow = Math.max(0, Math.floor((viewTop - GROUND_Y) / UNDER_FLOOR_SPACING) - 1);
  let iHigh = Math.floor((viewBot - GROUND_Y) / UNDER_FLOOR_SPACING) - 1;
  
  if(iHigh < iLow) return;
  if(iHigh - iLow > 30) iHigh = iLow + 30;
  
  const thick = UNDER_FLOOR_THICKNESS;
  const wall = layer.wall;
  const wallDark = layer.wallDark;
  const accent = layer.accent;
  
  for(let idx = iLow; idx <= iHigh; idx++){
    const worldY = getUnderFloorWorldY(idx);
    const worldOffset = idx * 431;
    
    const worldStartX = G.dist - 100;
    const worldEndX = G.dist + W + 100;
    
    /* ═══ حدّد نوع الطابق ═══ */
    const isChamber = (idx % UNDER_CHAMBER_EVERY === 0) && (idx > 0);
    const holeWidth = isChamber ? UNDER_CHAMBER_HOLE_WIDTH : UNDER_FLOOR_HOLE_WIDTH;
    const holePeriod = isChamber ? UNDER_FLOOR_HOLE_PERIOD * 1.5 : UNDER_FLOOR_HOLE_PERIOD;
    
    let nLow = Math.floor((worldStartX - worldOffset) / holePeriod) - 1;
    let nHigh = Math.ceil((worldEndX - worldOffset) / holePeriod) + 1;
    if(nHigh - nLow > 20) nHigh = nLow + 20;
    
    for(let n = nLow; n <= nHigh; n++){
      const segStart = worldOffset + n * holePeriod + holeWidth;
      const segEnd = worldOffset + (n + 1) * holePeriod;
      
      const sx1 = segStart - G.dist;
      const sx2 = segEnd - G.dist;
      
      if(sx2 < -50 || sx1 > W + 50) continue;
      
      const x1 = Math.max(-50, sx1);
      const x2 = Math.min(W + 50, sx2);
      const w = x2 - x1;
      if(w <= 0) continue;
      
      /* جسم الطابق */
      ctx.fillStyle = wall;
      ctx.fillRect(x1, worldY, w, thick);
      
      /* حافة سفلية داكنة */
      ctx.fillStyle = wallDark;
      ctx.fillRect(x1, worldY + thick - 5, w, 5);
      
      /* حافة علوية مضيئة */
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(x1, worldY, w, 2);
      ctx.globalAlpha = 1;
      
      /* خطوط صخرية */
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1;
      for(let cx = x1 + 40; cx < x2 - 20; cx += 90){
        ctx.beginPath();
        ctx.moveTo(cx, worldY + 4);
        ctx.lineTo(cx + 7, worldY + thick - 6);
        ctx.stroke();
      }
    }
    
    /* حواف الحفر مضيئة */
    /* حواف الحفر مضيئة */
    for(let n = nLow; n <= nHigh; n++){
      const holeStart = worldOffset + n * holePeriod;
      const holeEnd = holeStart + holeWidth;
      
      const sx1 = holeStart - G.dist;
      const sx2 = holeEnd - G.dist;
      
      if(sx1 > -50 && sx1 < W + 50){
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(sx1 - 2, worldY, 2, thick);
        ctx.globalAlpha = 1;
      }
      if(sx2 > -50 && sx2 < W + 50){
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(sx2, worldY, 2, thick);
        ctx.globalAlpha = 1;
      }
    }
  }
}

function drawClouds(){
  const s = G.currentScene;

  /* ═══════════════ ASCEND MODE: السحب تتحرك لأسفل (اللاعب يصعد) ═══════════════ */
  if(G.mode === 'ASCEND'){
    const alt = getMeters();
    /* تختفي السحب تدريجياً كلما ارتفعنا */
    const cloudFade = clamp(1 - alt / 2000, 0, 1);
    if(cloudFade <= 0.01) return;

    for(const c of clouds){
      /* السحب تتحرك لأسفل = إحساس بالصعود */
      c.y += c.v * G.speed * 0.7;
      /* انحراف أفقي بطيء */
      c.x -= 0.15;

      /* إعادة تعيين من الأعلى */
      if(c.y > H + 100){
        c.y = -150;
        c.x = rand(0, W);
      }
      if(c.x < -140 * c.s){
        c.x = W + 100 * c.s;
      }

      const w = 60 * c.s, h = 22 * c.s;
      const alpha = c.a * cloudFade * 0.8;

      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.cloud;
      ctx.beginPath();
      ctx.arc(c.x, c.y, h*0.9, 0, Math.PI*2);
      ctx.arc(c.x+w*0.35, c.y-h*0.3, h*1.1, 0, Math.PI*2);
      ctx.arc(c.x+w*0.7, c.y, h*0.85, 0, Math.PI*2);
      ctx.arc(c.x+w*0.35, c.y+h*0.15, h*0.9, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    return;
  }

  const altN = G.camY / 900;
  /* ✅ إصلاح: لا سحب أرضية في الكواكب */
  if(G.realm === REALM.UNDERGROUND ||
     G.realm === REALM.SKY ||
     G.realm === REALM.PLANET) return;
  if(G.camYUnder > 20) return;
  let cloudAlpha;
  if(altN < 0.5){
    cloudAlpha = 1.0 + altN * 1.0;
  } else {
    cloudAlpha = Math.max(0, 1.5 - (altN - 0.5) * 3);
  }
  if(cloudAlpha <= 0.01) return;

  ctx.save();
  ctx.translate(0, G.camY * 0.65);

  for(const c of clouds){
    c.x -= c.v * G.speed * 0.4;
    if(c.x < -140*c.s){
      c.x = W + 100*c.s;
      c.y = rand(H*0.08, H*0.32);
    }

    const w = 60*c.s, h = 22*c.s;
    const alpha = Math.min(1, c.a * cloudAlpha * 0.85);

    ctx.globalAlpha = alpha * 0.35;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.arc(c.x+2, c.y+4, h*0.9, 0, Math.PI*2);
    ctx.arc(c.x+w*0.35+2, c.y-h*0.3+4, h*1.1, 0, Math.PI*2);
    ctx.arc(c.x+w*0.7+2, c.y+4, h*0.85, 0, Math.PI*2);
    ctx.arc(c.x+w*0.35+2, c.y+h*0.15+4, h*0.9, 0, Math.PI*2);
    ctx.fill();

    ctx.globalAlpha = alpha;
    ctx.fillStyle = s.cloud;
    ctx.beginPath();
    ctx.arc(c.x, c.y, h*0.9, 0, Math.PI*2);
    ctx.arc(c.x+w*0.35, c.y-h*0.3, h*1.1, 0, Math.PI*2);
    ctx.arc(c.x+w*0.7, c.y, h*0.85, 0, Math.PI*2);
    ctx.arc(c.x+w*0.35, c.y+h*0.15, h*0.9, 0, Math.PI*2);
    ctx.fill();
  }

  ctx.restore();
  ctx.globalAlpha = 1;
}

function drawSkyDecor(){
  /* ✅ إصلاح: لا ديكور سماء أرضية في الكواكب */
  if(G.realm === REALM.PLANET) return;
  if(G.realm === REALM.UNDERGROUND) return;

  const altN = clamp((G.camY - 100) / 500, 0, 1);
  if(altN <= 0.01) return;
  if(G.camYUnder > 20) return;

  for(const d of G.skyDecor){
    ctx.save();
    ctx.translate(0, G.camY * d.parallax);

    if(d.type === 'planet'){
      const pulse = 0.85 + Math.sin(G.t * 0.02 + d.r) * 0.15;
      const alpha = altN * pulse;

      ctx.globalAlpha = alpha * 0.4;
      const grad = ctx.createRadialGradient(d.x, d.y, d.r * 0.3, d.x, d.y, d.r * 2);
      grad.addColorStop(0, `hsl(${d.hue}, 70%, 65%)`);
      grad.addColorStop(1, `hsla(${d.hue}, 70%, 40%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r * 2, 0, Math.PI*2);
      ctx.fill();

      ctx.globalAlpha = alpha;
      const bodyGrad = ctx.createRadialGradient(
        d.x - d.r*0.3, d.y - d.r*0.3, d.r*0.1,
        d.x, d.y, d.r
      );
      bodyGrad.addColorStop(0, `hsl(${d.hue}, 60%, 75%)`);
      bodyGrad.addColorStop(0.6, `hsl(${d.hue}, 65%, 55%)`);
      bodyGrad.addColorStop(1, `hsl(${d.hue}, 70%, 30%)`);
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fill();

      if(d.ringed){
        ctx.globalAlpha = alpha * 0.7;
        ctx.strokeStyle = `hsl(${d.hue}, 60%, 70%)`;
        ctx.lineWidth = d.r * 0.15;
        ctx.beginPath();
        ctx.ellipse(d.x, d.y, d.r * 1.6, d.r * 0.4, 0.3, 0, Math.PI*2);
        ctx.stroke();
      }
    }
    else if(d.type === 'moon'){
      const alpha = altN * 0.9;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#F0E8D0';
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fill();

      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.arc(d.x - d.r*0.3, d.y - d.r*0.2, d.r*0.25, 0, Math.PI*2);
      ctx.arc(d.x + d.r*0.2, d.y + d.r*0.3, d.r*0.18, 0, Math.PI*2);
      ctx.fill();
    }
    else if(d.type === 'comet'){
      d.x -= d.speed * G.speed * 0.5;
      if(d.x < -150){ d.x = W + 150; }

      const alpha = altN * 0.8;
      ctx.globalAlpha = alpha;

      const tailGrad = ctx.createLinearGradient(
        d.x, d.y,
        d.x + d.len * Math.cos(d.angle), d.y + d.len * Math.sin(d.angle)
      );
      tailGrad.addColorStop(0, 'rgba(255,255,255,0.9)');
      tailGrad.addColorStop(1, 'rgba(180,200,255,0)');
      ctx.strokeStyle = tailGrad;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.len * Math.cos(d.angle), d.y + d.len * Math.sin(d.angle));
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(d.x, d.y, 3, 0, Math.PI*2);
      ctx.fill();
    }
    else if(d.type === 'nebula'){
      const alpha = altN * 0.35;
      ctx.globalAlpha = alpha;
      const grad = ctx.createRadialGradient(d.x, d.y, d.r*0.2, d.x, d.y, d.r);
      grad.addColorStop(0, `hsla(${d.hue}, 70%, 60%, 0.6)`);
      grad.addColorStop(0.5, `hsla(${d.hue + 40}, 60%, 50%, 0.3)`);
      grad.addColorStop(1, `hsla(${d.hue}, 60%, 40%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fill();
    }

    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

function drawGround(){
  const s = G.currentScene;

  /* ═══ ASCEND: لا نرسم أرضية ثابتة — الأرض عبارة عن منصة ═══ */
  if(G.mode === 'ASCEND') return;

  /* ═══ PLANET ═══ */
  if(G.realm === REALM.PLANET && G.planet){
    const p = G.planet;

    /* أرضية الكوكب */
    ctx.fillStyle = p.ground;
    ctx.fillRect(0, GROUND_Y, W, GROUND_H);

    /* قمة أرضية */
    ctx.fillStyle = p.groundTop;
    ctx.fillRect(0, GROUND_Y, W, 4);

    /* حواف داكنة */
    ctx.fillStyle = p.groundDark;
    ctx.fillRect(0, GROUND_Y + GROUND_H - 8, W, 8);

    /* تفاصيل صخرية */
    const off = (G.dist * 0.5) % 80;
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = p.groundDark;
    for(let x = -off; x < W; x += 80){
      ctx.beginPath();
      ctx.arc(x + 20, GROUND_Y + 18, 3, 0, Math.PI*2);
      ctx.arc(x + 50, GROUND_Y + 30, 2, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    return;
  }

  /* ═══════════════════════════════════════════════════════
     ═══════════════ SKY REALM: الأرض مخفية ═══════════════
     ═══════════════════════════════════════════════════════ */
// ✅ لا أرضية في عالم السماء — السماء تمتلئ من drawSky
if(G.realm === REALM.SKY) return;

  /* ═══════════════════════════════════════════════════════
     ═══════════════ UNDERGROUND: حافة الحفر فقط ═══════════
     ═══════════════════════════════════════════════════════ */
  if(G.realm === REALM.UNDERGROUND || G.camYUnder > 20){
    ctx.fillStyle = s.ground;
    ctx.fillRect(0, GROUND_Y - 20, W, 20);
    ctx.fillStyle = s.groundDark;
    ctx.fillRect(0, GROUND_Y, W, 6);
    return;
  }

  /* ═══════════════════════════════════════════════════════
     ═══════════════ FLIP_WALK: أرضية الجحيم الحمراء ═══════
     ═══════════════════════════════════════════════════════ */
  if(G.mode === 'FLIP_WALK'){
    ctx.fillStyle = s.groundDark;
    ctx.fillRect(0,GROUND_Y,W,GROUND_H);
    const g = ctx.createLinearGradient(0,GROUND_Y,0,H);
    g.addColorStop(0, 'rgba(30,6,12,0)');
    g.addColorStop(0.5, 'rgba(60,10,20,0.55)');
    g.addColorStop(1, 'rgba(20,4,8,1)');
    ctx.fillStyle = g;
    ctx.fillRect(0,GROUND_Y,W,GROUND_H);

    const offset = (G.dist*0.8) % 44;
    ctx.fillStyle = '#8E2828';
    ctx.beginPath();
    for(let x=-offset; x<W+44; x+=44){
      ctx.moveTo(x, GROUND_Y);
      ctx.lineTo(x+22, GROUND_Y - 26);
      ctx.lineTo(x+44, GROUND_Y);
    }
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#C14A4A';
    ctx.beginPath();
    for(let x=-offset; x<W+44; x+=44){
      ctx.moveTo(x+8, GROUND_Y);
      ctx.lineTo(x+22, GROUND_Y - 20);
      ctx.lineTo(x+36, GROUND_Y);
    }
    ctx.closePath(); ctx.fill();

    const warn = ctx.createLinearGradient(0,GROUND_Y-30,0,GROUND_Y+4);
    warn.addColorStop(0,'rgba(255,40,40,0)');
    warn.addColorStop(1,'rgba(255,40,40,0.35)');
    ctx.fillStyle = warn;
    ctx.fillRect(0,GROUND_Y-30,W,34);

    ctx.fillStyle = s.ground;
    ctx.fillRect(0,0,W,CEILING_H);
    ctx.fillStyle = s.groundDark;
    ctx.fillRect(0,CEILING_H-5,W,5);
    ctx.fillStyle = 'rgba(255,255,255,0.10)';
    ctx.fillRect(0,CEILING_H-6,W,1.5);
    const coff = (G.dist*0.5) % 70;
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = s.groundDark;
    for(let x=-coff;x<W;x+=70){
      ctx.beginPath();
      ctx.arc(x+12, CEILING_H-14, 2.2, 0, Math.PI*2);
      ctx.arc(x+42, CEILING_H-22, 1.6, 0, Math.PI*2);
      ctx.arc(x+58, CEILING_H-16, 1.4, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    return;
  }

  /* ═══════════════════════════════════════════════════════
     ═══════════════ SKY_JUMP: أرضية سحابية ═══════════════
     ═══════════════════════════════════════════════════════ */
  if(G.mode === 'SKY_JUMP'){
    for(const sh of G.cloudShadows){
      sh.x -= sh.v * G.speed * 0.25;
      if(sh.x < -sh.w*2) sh.x = W+sh.w;
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.beginPath();
      ctx.ellipse(sh.x, GROUND_Y+GROUND_H*0.5, sh.w, GROUND_H*0.35, 0, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.fillStyle = s.ground;
    ctx.fillRect(0,GROUND_Y,W,GROUND_H);
    ctx.fillStyle = s.groundDark;
    ctx.fillRect(0,GROUND_Y,W,5);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(0,GROUND_Y+5,W,2);
    const off = (G.dist*0.5)%70;
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = s.groundDark;
    for(let x=-off;x<W;x+=70){
      ctx.beginPath();
      ctx.arc(x+12, GROUND_Y+16, 2.5, 0, Math.PI*2);
      ctx.arc(x+42, GROUND_Y+28, 1.8, 0, Math.PI*2);
      ctx.arc(x+58, GROUND_Y+20, 1.5, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillRect(0,0,W,CEILING_H);
    const coff = (G.dist*0.4) % 90;
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    for(let x=-coff-20; x<W+90; x+=90){
      ctx.beginPath();
      ctx.arc(x, CEILING_H, 22, Math.PI, Math.PI*2);
      ctx.arc(x+30, CEILING_H, 30, Math.PI, Math.PI*2);
      ctx.arc(x+62, CEILING_H, 24, Math.PI, Math.PI*2);
      ctx.fill();
    }
    const grad2 = ctx.createLinearGradient(0, CEILING_H, 0, CEILING_H+30);
    grad2.addColorStop(0,'rgba(180,200,220,0.5)');
    grad2.addColorStop(1,'rgba(180,200,220,0)');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, CEILING_H, W, 30);
    return;
  }

  /* ═══════════════════════════════════════════════════════
     ═══════════════ DEFAULT: الأرضية العادية ═══════════════
     ═══════════════════════════════════════════════════════ */
  for(const sh of G.cloudShadows){
    sh.x -= sh.v * G.speed * 0.25;
    if(sh.x < -sh.w*2) sh.x = W+sh.w;
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.beginPath();
    ctx.ellipse(sh.x, GROUND_Y+GROUND_H*0.5, sh.w, GROUND_H*0.35, 0, 0, Math.PI*2);
    ctx.fill();
  }
  ctx.fillStyle = s.ground;
  ctx.fillRect(0,GROUND_Y,W,GROUND_H);
  ctx.fillStyle = s.groundDark;
  ctx.fillRect(0,GROUND_Y,W,5);
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fillRect(0,GROUND_Y+5,W,2);
  const off = (G.dist*0.5)%70;
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = s.groundDark;
  for(let x=-off;x<W;x+=70){
    ctx.beginPath();
    ctx.arc(x+12, GROUND_Y+16, 2.5, 0, Math.PI*2);
    ctx.arc(x+42, GROUND_Y+28, 1.8, 0, Math.PI*2);
    ctx.arc(x+58, GROUND_Y+20, 1.5, 0, Math.PI*2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  const grad = ctx.createLinearGradient(0,GROUND_Y,0,H);
  grad.addColorStop(0,'rgba(0,0,0,0)');
  grad.addColorStop(1,'rgba(0,0,0,0.2)');
  ctx.fillStyle = grad;
  ctx.fillRect(0,GROUND_Y,W,GROUND_H);
}

function drawTunnelObstacle(o){
  const topH = o.gapY - o.gap/2;
  const botY = o.gapY + o.gap/2;
  const wall = o.color, dark = o.colorDark, accent = o.accent;
  ctx.fillStyle = wall;
  roundRect(ctx, o.x, -20, o.w, topH+20, 8); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fillRect(o.x + o.w - 10, 0, 10, topH);
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.fillRect(o.x + 4, 0, 6, topH);
  ctx.fillStyle = dark;
  roundRect(ctx, o.x-5, topH-16, o.w+10, 16, 8); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  roundRect(ctx, o.x+2, topH-14, o.w*0.4, 4, 2); ctx.fill();
  ctx.fillStyle = wall;
  roundRect(ctx, o.x, botY, o.w, GROUND_Y-botY+20, 8); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fillRect(o.x + o.w - 10, botY, 10, GROUND_Y-botY);
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.fillRect(o.x + 4, botY, 6, GROUND_Y-botY);
  ctx.fillStyle = accent;
  roundRect(ctx, o.x-5, botY, o.w+10, 16, 8); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  roundRect(ctx, o.x+2, botY+3, o.w*0.4, 4, 2); ctx.fill();
}

function drawShiftGate(o){
  const pulse = 0.6 + Math.sin(o.t * 0.1) * 0.4;
  const col = o.gateColor;
  const topY = CEILING_H + 20;
  const botY = GROUND_Y - 20;
  const cx = o.x + o.w/2;

  ctx.save();

  ctx.globalAlpha = 0.35 * pulse;
  const halo = ctx.createLinearGradient(o.x - 30, 0, o.x + o.w + 30, 0);
  halo.addColorStop(0, 'rgba(0,0,0,0)');
  halo.addColorStop(0.5, col);
  halo.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = halo;
  ctx.fillRect(o.x - 30, topY, o.w + 60, botY - topY);
  ctx.globalAlpha = 1;

  ctx.fillStyle = col;
  ctx.shadowColor = col;
  ctx.shadowBlur = 20;
  roundRect(ctx, o.x, topY, o.w, botY - topY, 22);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.globalAlpha = 0.6;
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  for(let i = 0; i < 8; i++){
    const y = topY + 30 + ((o.t * 3 + i * 40) % (botY - topY - 60));
    ctx.beginPath();
    ctx.moveTo(o.x + 6, y);
    ctx.lineTo(o.x + o.w - 6, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#FFFFFF';
  ctx.shadowBlur = 12;
  ctx.fillText(o.gateIcon, cx, (topY + botY) / 2);
  ctx.shadowBlur = 0;

  ctx.font = 'bold 11px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('SHIFT', cx, (topY + botY) / 2 + 30);

  ctx.restore();
}

function drawWalkObstacle(o){
  const wall = o.color, dark = o.colorDark, accent = o.accent;

  if(o.isShiftGate){ drawShiftGate(o); return; }

  /* ═══════════════ ASCEND BARRIER (العائق الأفقي بفتحة) ═══════════════ */
  if(o.isAscend){
    const topH = o.gapLocalY;
    const gapTop = o.y + topH;
    const gapBot = gapTop + o.gap;
    const botH = o.h - topH - o.gap;

    /* ─── الجزء الأعلى ─── */
    if(topH > 0){
      /* الجسم الرئيسي */
      ctx.fillStyle = wall;
      ctx.fillRect(o.x, o.y, o.w, topH);

      /* تدرج داكن في المنتصف */
      const tg = ctx.createLinearGradient(0, o.y, 0, gapTop);
      tg.addColorStop(0, 'rgba(0,0,0,0.25)');
      tg.addColorStop(0.5, 'rgba(0,0,0,0)');
      tg.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = tg;
      ctx.fillRect(o.x, o.y, o.w, topH);

      /* الحواف */
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.fillRect(o.x, o.y, o.w, 3);

      ctx.fillStyle = dark;
      ctx.fillRect(o.x, gapTop - 6, o.w, 6);

      /* خطوط زخرفية رأسية */
      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 1;
      for(let x = 30; x < o.w; x += 70){
        ctx.beginPath();
        ctx.moveTo(x, o.y + 8);
        ctx.lineTo(x, gapTop - 8);
        ctx.stroke();
      }
    }

    /* ─── الجزء الأسفل ─── */
    if(botH > 0){
      ctx.fillStyle = wall;
      ctx.fillRect(o.x, gapBot, o.w, botH);

      const bg = ctx.createLinearGradient(0, gapBot, 0, o.y + o.h);
      bg.addColorStop(0, 'rgba(0,0,0,0.35)');
      bg.addColorStop(0.5, 'rgba(0,0,0,0)');
      bg.addColorStop(1, 'rgba(0,0,0,0.25)');
      ctx.fillStyle = bg;
      ctx.fillRect(o.x, gapBot, o.w, botH);

      ctx.fillStyle = dark;
      ctx.fillRect(o.x, gapBot, o.w, 6);

      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(o.x, o.y + o.h - 3, o.w, 3);

      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      for(let x = 30; x < o.w; x += 70){
        ctx.beginPath();
        ctx.moveTo(x, gapBot + 8);
        ctx.lineTo(x, o.y + o.h - 8);
        ctx.stroke();
      }
    }

    /* ─── توهج حول الفتحة ─── */
    const pulse = 0.4 + Math.sin(G.t * 0.09 + o.t * 0.04) * 0.25;
    ctx.save();
    ctx.globalAlpha = pulse;

    const glowTop = ctx.createLinearGradient(0, gapTop - 25, 0, gapTop + 5);
    glowTop.addColorStop(0, 'rgba(0,0,0,0)');
    glowTop.addColorStop(1, accent);
    ctx.fillStyle = glowTop;
    ctx.fillRect(0, gapTop - 25, W, 30);

    const glowBot = ctx.createLinearGradient(0, gapBot + 25, 0, gapBot - 5);
    glowBot.addColorStop(0, 'rgba(0,0,0,0)');
    glowBot.addColorStop(1, accent);
    ctx.fillStyle = glowBot;
    ctx.fillRect(0, gapBot - 5, W, 30);
    ctx.restore();

    /* ─── سهم إرشادي في مركز الفتحة ─── */
    ctx.save();
    ctx.globalAlpha = 0.55 + Math.sin(G.t * 0.12) * 0.25;
    ctx.fillStyle = accent;
    ctx.shadowColor = accent;
    ctx.shadowBlur = 12;
    ctx.font = 'bold 18px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⇣', W / 2, gapTop + o.gap / 2);
    ctx.restore();

    return;
  }

  /* ═══════════════ GROUND HOLE ═══════════════ */
  if(o.isGroundHole){
    /* حفرة سوداء في الأرض */
    const grad = ctx.createLinearGradient(0, GROUND_Y - 4, 0, H);
    grad.addColorStop(0, '#000000');
    grad.addColorStop(0.4, 'rgba(0,0,0,0.92)');
    grad.addColorStop(1, 'rgba(10,4,4,0.75)');
    ctx.fillStyle = grad;
    ctx.fillRect(o.x, GROUND_Y - 4, o.w, GROUND_H + 30);

    /* حواف صخرية */
    ctx.fillStyle = o.color || '#6A4838';
    ctx.beginPath();
    ctx.moveTo(o.x - 4, GROUND_Y - 4);
    ctx.lineTo(o.x + 12, GROUND_Y + 12);
    ctx.lineTo(o.x + 6, GROUND_Y - 6);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(o.x + o.w + 4, GROUND_Y - 4);
    ctx.lineTo(o.x + o.w - 12, GROUND_Y + 12);
    ctx.lineTo(o.x + o.w - 6, GROUND_Y - 6);
    ctx.closePath();
    ctx.fill();

    /* سهم ▼ نابض */
    const pulse = 0.55 + Math.sin(G.t * 0.12) * 0.35;
    ctx.globalAlpha = pulse;
    ctx.fillStyle = '#FF8060';
    ctx.shadowColor = '#FF8060';
    ctx.shadowBlur = 15;
    ctx.font = 'bold 26px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('▼', o.x + o.w/2, GROUND_Y - 40 + Math.sin(G.t*0.1)*4);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    return;
  }

  /* ═══════════════ PLATFORM ═══════════════ */
  if(o.isPlatform){
    if(o.crumbled) return;

    let shakeX = 0;
    if(o.platformType === 'crumble' && o.crumbleTimer > 0){
      shakeX = (Math.random() - 0.5) * 3;
    }

    ctx.save();
    ctx.translate(shakeX, 0);

    if(o.isElevator){
      const pulse = 0.5 + Math.sin(G.t * 0.1) * 0.3;
      ctx.globalAlpha = pulse;
      const elevatorGlow = ctx.createRadialGradient(
        o.x + o.w/2, o.y + o.h/2, 5,
        o.x + o.w/2, o.y + o.h/2, o.w * 1.2
      );
      elevatorGlow.addColorStop(0, '#B0F0FF');
      elevatorGlow.addColorStop(0.5, 'rgba(128,232,255,0.4)');
      elevatorGlow.addColorStop(1, 'rgba(128,232,255,0)');
      ctx.fillStyle = elevatorGlow;
      ctx.beginPath();
      ctx.arc(o.x + o.w/2, o.y + o.h/2, o.w * 1.2, 0, Math.PI*2);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.save();
      ctx.globalAlpha = 0.6 + Math.sin(G.t * 0.15) * 0.3;
      ctx.strokeStyle = '#E0FFFF';
      ctx.lineWidth = 2;
      for(let i = 0; i < 3; i++){
        const ax = o.x + o.w * (0.25 + i * 0.25);
        const ay = o.y + o.h + 6;
        ctx.beginPath();
        ctx.moveTo(ax - 4, ay + 4);
        ctx.lineTo(ax, ay - 3);
        ctx.lineTo(ax + 4, ay + 4);
        ctx.stroke();
      }
      ctx.restore();

      if(o.isCarryingPlayer && !o.exhausted){
        const prog = o.risen / o.maxRise;
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(o.x + 4, o.y - 8, o.w - 8, 4);
        ctx.fillStyle = '#80E8FF';
        ctx.fillRect(o.x + 4, o.y - 8, (o.w - 8) * prog, 4);
      }
    }

    if(o.isSkyPlatform && !o.isElevator){
      const pulse = 0.3 + Math.sin(G.t * 0.08 + o.t * 0.02) * 0.2;
      const glowSize = o.isStaircase ? o.w * 0.9 : Math.max(o.w, 60);
      const glowAlpha = o.isStaircase ? pulse * 0.7 : pulse;

      ctx.globalAlpha = glowAlpha;
      const glowGrad = ctx.createRadialGradient(
        o.x + o.w/2, o.y + o.h/2, 5,
        o.x + o.w/2, o.y + o.h/2, glowSize
      );
      glowGrad.addColorStop(0, o.glow);
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(o.x + o.w/2, o.y + o.h/2, glowSize, 0, Math.PI*2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if(o.isStaircase && o.stairIndex > 0 && G.t % 2 === 0){
        ctx.globalAlpha = 0.5 + Math.sin(G.t * 0.15) * 0.3;
        ctx.fillStyle = o.accent;
        ctx.beginPath();
        ctx.arc(o.x + o.w/2, o.y - 8, 3, 0, Math.PI*2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    roundRect(ctx, o.x+3, o.y+5, o.w, o.h, 6); ctx.fill();

    ctx.fillStyle = wall;
    roundRect(ctx, o.x, o.y, o.w, o.h, 6); ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    roundRect(ctx, o.x+3, o.y+2, o.w-6, 3, 2); ctx.fill();

    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.9;
    roundRect(ctx, o.x+3, o.y+o.h-4, o.w-6, 2, 1); ctx.fill();
    ctx.globalAlpha = 1;

    if(o.platformType === 'crumble'){
      ctx.strokeStyle = 'rgba(0,0,0,0.4)';
      ctx.lineWidth = 1;
      const numCracks = o.crumbleTimer > 0 ? 3 : 1;
      for(let i=0;i<numCracks;i++){
        const cx = o.x + o.w * (0.2 + i*0.3);
        ctx.beginPath();
        ctx.moveTo(cx, o.y + 2);
        ctx.lineTo(cx + 3, o.y + o.h - 2);
        ctx.stroke();
      }
    }

    if(o.isSkyPlatform){
      ctx.save();
      ctx.font = 'bold 11px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = o.accent;
      ctx.shadowColor = o.glow;
      ctx.shadowBlur = 8;

      if(o.isStaircase){
        const symbol = o.isStaircaseLong ? '↟' : '↗';
        ctx.fillText(`${symbol} ${o.stairIndex + 1}/${o.stairTotal}`, o.x + o.w/2, o.y + o.h/2);
      } else {
        ctx.fillText('★' + o.skyTier, o.x + o.w/2, o.y + o.h/2);
      }
      ctx.restore();
    }

    if(o.platformType === 'bouncy'){
      ctx.fillStyle = '#FFF4C0';
      for(let i=0;i<3;i++){
        const px = o.x + o.w*(0.25 + i*0.25);
        const py = o.y - 3 + Math.sin(G.t*0.15 + i)*2;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI*2);
        ctx.fill();
      }
    }

    if(o.platformType === 'moving_y'){
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4,6]);
      ctx.beginPath();
      ctx.moveTo(o.x + o.w*0.25, o.y - 3);
      ctx.lineTo(o.x + o.w*0.25, o.y - 60);
      ctx.moveTo(o.x + o.w*0.75, o.y - 3);
      ctx.lineTo(o.x + o.w*0.75, o.y - 60);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();
    return;
  }

  /* ═══════════════ SPRING ═══════════════ */
  if(o.isSpring){
    const baseY = GROUND_Y;
    const compress = Math.max(0, Math.sin(G.t*0.1) * 3);

    ctx.fillStyle = dark;
    roundRect(ctx, o.x-2, baseY - 6, o.w+4, 6, 2); ctx.fill();

    ctx.strokeStyle = accent;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const coils = 4;
    const springH = o.h - 6 - compress;
    for(let i=0;i<=coils;i++){
      const yy = baseY - 6 - springH * (i/coils);
      const xx = o.x + o.w/2 + (i%2===0 ? -6 : 6);
      if(i===0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
    }
    ctx.stroke();

    ctx.fillStyle = wall;
    roundRect(ctx, o.x-4, baseY - o.h - 6 + compress, o.w+8, 8, 3); ctx.fill();
    ctx.fillStyle = accent;
    roundRect(ctx, o.x-2, baseY - o.h - 5 + compress, o.w+4, 3, 2); ctx.fill();

    ctx.globalAlpha = 0.5 + Math.sin(G.t*0.15)*0.3;
    ctx.fillStyle = '#FFF4C0';
    ctx.beginPath();
    ctx.arc(o.x + o.w/2, baseY - o.h - 10 + compress, 4, 0, Math.PI*2);
    ctx.fill();
    ctx.globalAlpha = 1;
    return;
  }

  /* ═══════════════ SAW ═══════════════ */
  if(o.isSaw){
    ctx.save();
    ctx.translate(o.cx, o.cy);
    ctx.rotate(o.angle);

    ctx.globalAlpha = 0.35;
    const halo = ctx.createRadialGradient(0,0,o.r*0.5, 0,0,o.r*1.6);
    halo.addColorStop(0, '#FF6040');
    halo.addColorStop(1, 'rgba(255,96,64,0)');
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(0,0,o.r*1.6,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;

    const teeth = 12;
    ctx.fillStyle = wall;
    ctx.beginPath();
    for(let i=0;i<teeth*2;i++){
      const a = (i/(teeth*2))*Math.PI*2;
      const rr = i%2===0 ? o.r : o.r*0.78;
      const px = Math.cos(a)*rr, py = Math.sin(a)*rr;
      i===0 ? ctx.moveTo(px,py) : ctx.lineTo(px,py);
    }
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = dark;
    ctx.beginPath(); ctx.arc(0,0,o.r*0.55,0,Math.PI*2); ctx.fill();

    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.arc(0,0,o.r*0.22,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.arc(0,0,o.r*0.1,0,Math.PI*2); ctx.fill();

    ctx.restore();
    return;
  }

  /* ═══════════════ PISTON ═══════════════ */
  if(o.isPiston){
    const headH = 16;
    const bodyY = o.isTop ? 0 : GROUND_Y - o.h;
    const rodY = o.isTop ? o.h : GROUND_Y - o.h - o.extend;
    const headY = o.isTop
      ? o.h + o.extend
      : GROUND_Y - o.h - o.extend - headH;

    ctx.fillStyle = dark;
    roundRect(ctx, o.x, bodyY, o.w, o.h, 4); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    roundRect(ctx, o.x + 4, bodyY + 4, o.w - 8, 3, 1.5); ctx.fill();

    if(o.extend > 0){
      const rodW = o.w * 0.4;
      const rodX = o.x + (o.w - rodW)/2;
      ctx.fillStyle = '#909AA8';
      ctx.fillRect(rodX, rodY, rodW, o.extend);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(rodX + rodW - 3, rodY, 3, o.extend);
    }

    ctx.fillStyle = accent;
    roundRect(ctx, o.x + 4, headY, o.w - 8, headH, 3); ctx.fill();

    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.lineWidth = 1.5;
    for(let i = 0; i < 4; i++){
      const lx = o.x + 8 + i * ((o.w - 16) / 4);
      ctx.beginPath();
      ctx.moveTo(lx, headY + 2);
      ctx.lineTo(lx + 4, headY + headH - 2);
      ctx.stroke();
    }

    if(o.hasSpikes){
      ctx.fillStyle = '#C14A4A';
      const spikeCount = 5;
      for(let i = 0; i < spikeCount; i++){
        const sx = o.x + 8 + i * ((o.w - 16) / (spikeCount - 1));
        const spikeY = o.isTop ? headY + headH : headY;
        const dir = o.isTop ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(sx - 3, spikeY);
        ctx.lineTo(sx, spikeY + dir * 8);
        ctx.lineTo(sx + 3, spikeY);
        ctx.closePath();
        ctx.fill();
      }
    }
    return;
  }

  /* ═══════════════ FALLING SPIKE ═══════════════ */
  if(o.isFallingSpike){
    ctx.save();
    ctx.translate(o.x + o.w/2, o.y + o.h/2);

    if(!o.falling){
      const distToPlayer = o.x - P.x;
      if(o.warned || (distToPlayer < o.triggerDistance + 100 && distToPlayer > 0)){
        const warnX = o.x + o.w/2;
        const pulse = 0.4 + Math.sin(G.t * 0.4) * 0.4;
        ctx.save();
        ctx.globalAlpha = pulse;
        ctx.fillStyle = '#FF3030';
        ctx.beginPath();
        ctx.ellipse(warnX - (o.x + o.w/2), GROUND_Y - 4, 16, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.strokeStyle = `rgba(255,80,80,${pulse * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(0, -o.y + CEILING_H);
        ctx.lineTo(0, GROUND_Y - o.y - o.h/2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    if(!o.falling && o.warned){
      ctx.globalAlpha = 0.3 + Math.sin(G.t * 0.5) * 0.3;
      const halo = ctx.createRadialGradient(0, 0, 2, 0, 0, 30);
      halo.addColorStop(0, '#FF4040');
      halo.addColorStop(1, 'rgba(255,64,64,0)');
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = wall;
    ctx.beginPath();
    ctx.moveTo(-o.w/2, -o.h/2);
    ctx.lineTo( o.w/2, -o.h/2);
    ctx.lineTo( o.w/2,  o.h/4);
    ctx.lineTo( 0,      o.h/2);
    ctx.lineTo(-o.w/2,  o.h/4);
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.moveTo(-o.w/2+3, -o.h/2+3);
    ctx.lineTo( 0,       -o.h/2+3);
    ctx.lineTo( 0,       0);
    ctx.lineTo(-o.w/2+3, 0);
    ctx.closePath(); ctx.fill();

    ctx.restore();
    return;
  }

  /* ═══════════════ ROTATING BAR ═══════════════ */
  if(o.isRotBar){
    ctx.save();
    ctx.translate(o.cx, o.cy);
    ctx.rotate(o.angle);

    ctx.fillStyle = dark;
    ctx.beginPath(); ctx.arc(0,0,10,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.arc(0,0,4,0,Math.PI*2); ctx.fill();

    ctx.fillStyle = wall;
    roundRect(ctx, -o.length/2, -o.thickness/2, o.length, o.thickness, o.thickness/2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    roundRect(ctx, -o.length/2 + 4, -o.thickness/2 + 2, o.length - 8, 3, 1.5);
    ctx.fill();

    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.arc(-o.length/2 + 4, 0, 6, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc( o.length/2 - 4, 0, 6, 0, Math.PI*2); ctx.fill();

    ctx.restore();
    return;
  }

  /* ═══════════════ VORTEX ═══════════════ */
  if(o.isVortex){
    ctx.save();
    ctx.translate(o.cx, o.cy);

    for(let ring = 0; ring < 3; ring++){
      const r = o.r * (1 - ring * 0.3);
      const rot = o.angle * (1 + ring * 0.5);
      ctx.save();
      ctx.rotate(rot);
      ctx.strokeStyle = ring % 2 === 0 ? o.accent : o.color;
      ctx.lineWidth = 3 - ring;
      ctx.globalAlpha = 0.7 - ring * 0.15;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 1.6);
      ctx.stroke();
      ctx.restore();
    }

    const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, 16);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.5, o.accent);
    grad.addColorStop(1, o.colorDark);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();

    for(let i = 0; i < 4; i++){
      const a = o.angle * 2 + i * (Math.PI/2);
      const d = 30 + Math.sin(o.t * 0.15 + i) * 10;
      ctx.fillStyle = o.accent;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * d, Math.sin(a) * d, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    return;
  }

  /* ═══════════════ LASER ═══════════════ */
  if(o.isLaser){
    o.pulse = (o.pulse || 0) + 1;
    const glow = 0.6 + Math.sin(o.pulse * 0.15) * 0.4;

    ctx.save();
    ctx.globalAlpha = glow;

    if(o.isVertical){
      for(const seg of o.segments){
        const grad = ctx.createLinearGradient(o.x - 15, 0, o.x + o.w + 15, 0);
        grad.addColorStop(0, 'rgba(64,232,255,0)');
        grad.addColorStop(0.5, o.color);
        grad.addColorStop(1, 'rgba(64,232,255,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(o.x - 15, seg.y, o.w + 30, seg.h);

        ctx.fillStyle = o.accent;
        ctx.shadowColor = o.color;
        ctx.shadowBlur = 14;
        ctx.fillRect(o.x + 3, seg.y, o.w - 6, seg.h);
        ctx.shadowBlur = 0;
      }
    } else {
      const grad = ctx.createLinearGradient(0, o.y - 15, 0, o.y + 15);
      grad.addColorStop(0, 'rgba(255,64,160,0)');
      grad.addColorStop(0.5, o.color);
      grad.addColorStop(1, 'rgba(255,64,160,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(o.x - 15, o.y - 15, o.w + 30, 30);

      ctx.fillStyle = o.accent;
      ctx.shadowColor = o.color;
      ctx.shadowBlur = 14;
      ctx.fillRect(o.x, o.y - 3, o.w, 6);
      ctx.shadowBlur = 0;
    }
    ctx.restore();
    return;
  }

  /* ═══════════════ SKY RING ═══════════════ */
  if(o.isSkyRing){
    ctx.save();
    ctx.translate(o.cx, o.cy);
    ctx.rotate(o.t * 0.03);

    /* هالة خارجية */
    const halo = ctx.createRadialGradient(0,0,o.r*0.6, 0,0,o.r*1.3);
    halo.addColorStop(0, o.glow || o.color);
    halo.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(0,0,o.r*1.3, 0, Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;

    /* الحلقة */
    ctx.strokeStyle = o.color;
    ctx.lineWidth = 8;
    ctx.shadowColor = o.glow || o.color;
    ctx.shadowBlur = 20;
    ctx.beginPath(); ctx.arc(0,0,o.r, 0, Math.PI*2); ctx.stroke();
    ctx.shadowBlur = 0;

    /* جزيئات صغيرة */
    for(let i = 0; i < 6; i++){
      const a = o.t*0.05 + (i/6)*Math.PI*2;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(Math.cos(a)*o.r, Math.sin(a)*o.r, 3, 0, Math.PI*2);
      ctx.fill();
    }

    ctx.restore();
    return;
  }

  /* ═══════════════ UNDER SPIKE ═══════════════ */
  if(o.isUnderSpike){
    ctx.save();
    ctx.translate(o.x + o.w/2, o.y + o.h/2);
    ctx.scale(1, -1);

    ctx.fillStyle = wall;
    ctx.beginPath();
    ctx.moveTo(-o.w/2, -o.h/2);
    ctx.lineTo(0, o.h/2);
    ctx.lineTo(o.w/2, -o.h/2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(-o.w/4, -o.h/2);
    ctx.lineTo(0, o.h/4);
    ctx.lineTo(o.w/4, -o.h/2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
    return;
  }

  /* ═══════════════ CRYSTAL ═══════════════ */
  if(o.isCrystal){
    ctx.save();
    ctx.translate(o.x + o.w/2, o.y + o.h/2);
    const pulse = 0.8 + Math.sin(o.t * 0.06) * 0.2;

    /* هالة */
    const halo = ctx.createRadialGradient(0,0,5, 0,0,o.w);
    halo.addColorStop(0, o.glow || o.accent);
    halo.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = 0.6 * pulse;
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(0,0,o.w, 0, Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;

    /* بلورة سداسية */
    ctx.fillStyle = o.color;
    ctx.shadowColor = o.glow || o.accent;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    for(let i = 0; i < 6; i++){
      const a = (i/6)*Math.PI*2;
      const r = i%2===0 ? o.w*0.5 : o.w*0.3;
      const px = Math.cos(a)*r;
      const py = Math.sin(a)*r;
      i===0 ? ctx.moveTo(px,py) : ctx.lineTo(px,py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    /* لمعة داخلية */
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath(); ctx.arc(-o.w*0.15, -o.h*0.15, o.w*0.12, 0, Math.PI*2); ctx.fill();

    ctx.restore();
    return;
  }

  /* ═══════════════ UNDER PILLAR ═══════════════ */
  if(o.isUnderPillar){
    ctx.fillStyle = wall;
    roundRect(ctx, o.x, o.y, o.w, o.h, 8); ctx.fill();
    ctx.fillStyle = dark;
    for(let i = 0; i < o.h; i += 22){
      ctx.globalAlpha = 0.3;
      ctx.fillRect(o.x + 4, o.y + i, o.w - 8, 3);
    }
    ctx.globalAlpha = 1;
    return;
  }

  /* ═══════════════ SPIKE / BLOCK (الافتراضي) ═══════════════ */
  if(o.type === 'spike'){
    const peaks = 3, pw = o.w/peaks;
    ctx.fillStyle = wall;
    ctx.beginPath();
    for(let i=0;i<peaks;i++){
      const px = o.x + i*pw;
      ctx.moveTo(px, GROUND_Y);
      ctx.lineTo(px+pw/2, GROUND_Y - o.h);
      ctx.lineTo(px+pw, GROUND_Y);
    }
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    for(let i=0;i<peaks;i++){
      const px = o.x + i*pw;
      ctx.beginPath();
      ctx.moveTo(px+pw*0.25, GROUND_Y);
      ctx.lineTo(px+pw/2, GROUND_Y - o.h);
      ctx.lineTo(px+pw*0.75, GROUND_Y);
      ctx.closePath(); ctx.fill();
    }
  } else {
    ctx.fillStyle = wall;
    roundRect(ctx, o.x, GROUND_Y - o.h, o.w, o.h, 12); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    roundRect(ctx, o.x+6, GROUND_Y-o.h+6, o.w-12, 5, 3); ctx.fill();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.8;
    roundRect(ctx, o.x+6, GROUND_Y-8, o.w-12, 4, 2); ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function drawUnderObstacle(o){
  const wall = o.color || '#5E4028';
  const dark = o.colorDark || '#2A1810';
  const accent = o.accent || '#8E6A48';
  
  /* ═══ صخرة متساقطة ═══ */
  if(o.isFallingRock){
    ctx.save();
    ctx.translate(o.x + o.w/2, o.y + o.h/2);
    
    if(!o.falling && o.warned){
      const pulse = 0.4 + Math.sin(G.t * 0.4) * 0.4;
      ctx.globalAlpha = pulse;
      ctx.fillStyle = '#FF3030';
      ctx.beginPath();
      ctx.ellipse(0, o.targetY - o.y + 20, 20, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    
    ctx.globalAlpha = 0.6;
    const shadowGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, o.w);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.6)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.arc(0, 0, o.w, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    
    ctx.fillStyle = wall;
    ctx.beginPath();
    for(let i = 0; i < 7; i++){
      const a = (i/7) * Math.PI * 2;
      const rr = i%2===0 ? o.w*0.5 : o.w*0.42;
      const px = Math.cos(a) * rr;
      const py = Math.sin(a) * rr;
      i===0 ? ctx.moveTo(px,py) : ctx.lineTo(px,py);
    }
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.arc(-o.w*0.15, -o.h*0.2, o.w*0.15, 0, Math.PI*2);
    ctx.fill();
    
    ctx.restore();
    return;
  }
  
  /* ═══ أشواك الأعماق ═══ */
  if(o.isUnderSpike){
    ctx.save();
    ctx.translate(o.x + o.w/2, o.y + o.h/2);
    
    ctx.fillStyle = wall;
    ctx.beginPath();
    ctx.moveTo(-o.w/2, o.h/2);
    ctx.lineTo(0, -o.h/2);
    ctx.lineTo(o.w/2, o.h/2);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(-o.w/4, o.h/2);
    ctx.lineTo(0, -o.h/4);
    ctx.lineTo(o.w/4, o.h/2);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath();
    ctx.moveTo(-o.w*0.15, o.h/2);
    ctx.lineTo(0, -o.h/4);
    ctx.lineTo(o.w*0.05, o.h/2);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
    return;
  }
  
  /* ═══ بركة حمم ═══ */
  if(o.isLavaPool){
    ctx.save();
    const pulse = 0.6 + Math.sin(G.t * 0.08) * 0.4;
    
    ctx.globalAlpha = pulse;
    const glowGrad = ctx.createRadialGradient(o.x + o.w/2, o.y + o.h/2, 5, o.x + o.w/2, o.y + o.h/2, o.w * 0.8);
    glowGrad.addColorStop(0, o.poolGlow);
    glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(o.x + o.w/2, o.y + o.h/2, o.w * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    
    const grad = ctx.createLinearGradient(o.x, o.y, o.x, o.y + o.h);
    grad.addColorStop(0, o.poolGlow);
    grad.addColorStop(0.4, o.poolColor);
    grad.addColorStop(1, dark);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(o.x + o.w/2, o.y + o.h/2, o.w/2, o.h/2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    /* فقاعات */
    for(let i = 0; i < 4; i++){
      const bx = o.x + 20 + ((i * 47 + G.t * 1.5) % (o.w - 40));
      const by = o.y + o.h/2 + Math.sin(G.t * 0.1 + i) * 3;
      const bs = 2 + Math.sin(G.t * 0.15 + i) * 1;
      ctx.fillStyle = o.poolGlow;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(bx, by, bs, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
    return;
  }
  
  /* ═══ رمح متحرك ═══ */
  if(o.isDrill){
    ctx.save();
    
    const headH = 24;
    const rodW = 30;
    const bodyY = o.isTop ? o.floorY - 60 : o.floorY;
    const rodY = o.isTop ? o.floorY - 60 + o.extend : o.floorY - o.extend - 20;
    const headY = o.isTop ? rodY + 20 : rodY - headH;
    
    /* الجسم الثابت */
    ctx.fillStyle = dark;
    roundRect(ctx, o.x + (o.w - rodW)/2, bodyY, rodW, 60, 4);
    ctx.fill();
    
    /* العمود */
    if(o.extend > 0){
      ctx.fillStyle = '#909AA8';
      ctx.fillRect(o.x + (o.w - rodW)/2, rodY, rodW, o.extend + 20);
    }
    
    /* الرأس المدبب */
    ctx.fillStyle = '#C14A4A';
    ctx.beginPath();
    if(o.isTop){
      ctx.moveTo(o.x + o.w/2, headY + headH);
      ctx.lineTo(o.x + 8, headY);
      ctx.lineTo(o.x + o.w - 8, headY);
    } else {
      ctx.moveTo(o.x + o.w/2, headY);
      ctx.lineTo(o.x + 8, headY + headH);
      ctx.lineTo(o.x + o.w - 8, headY + headH);
    }
    ctx.closePath();
    ctx.fill();
    
    /* أشواك */
    ctx.fillStyle = accent;
    for(let i = 0; i < 3; i++){
      const sx = o.x + 14 + i * (o.w - 28) / 2;
      const sy = o.isTop ? headY + headH : headY;
      const dir = o.isTop ? 1 : -1;
      ctx.beginPath();
      ctx.moveTo(sx - 3, sy);
      ctx.lineTo(sx, sy + dir * 6);
      ctx.lineTo(sx + 3, sy);
      ctx.closePath();
      ctx.fill();
    }
    
    /* توهج */
    if(o.extend > 10){
      ctx.globalAlpha = 0.4;
      const glow = ctx.createRadialGradient(o.x + o.w/2, headY + headH/2, 5, o.x + o.w/2, headY + headH/2, o.w);
      glow.addColorStop(0, accent);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(o.x + o.w/2, headY + headH/2, o.w, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    
    ctx.restore();
    return;
  }
  
  /* ═══ شبح متحرك ═══ */
  if(o.isGhost){
    ctx.save();
    ctx.translate(o.cx, o.cy);
    
    const pulse = 0.85 + Math.sin(G.t * 0.1) * 0.15;
    
    /* هالة */
    const halo = ctx.createRadialGradient(0, 0, 5, 0, 0, o.r * 2);
    halo.addColorStop(0, o.color);
    halo.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = 0.5 * pulse;
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(0, 0, o.r * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    
    /* جسم الشبح */
    ctx.fillStyle = o.color;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(0, -o.r * 0.3, o.r, Math.PI, 0);
    ctx.lineTo(o.r, o.r * 0.6);
    for(let i = 5; i >= 0; i--){
      const wx = -o.r + (i / 5) * o.r * 2;
      const wy = o.r * 0.6 + Math.sin(G.t * 0.15 + i) * 4;
      ctx.lineTo(wx, wy);
    }
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    
    /* عيون */
    ctx.fillStyle = '#FF3060';
    ctx.shadowColor = '#FF3060';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(-o.r * 0.3, -o.r * 0.4, 3, 0, Math.PI * 2);
    ctx.arc(o.r * 0.3, -o.r * 0.4, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    ctx.restore();
    return;
  }
}

/* ============================================================
   ═══════════════ PLANET EFFECTS UPDATE ════════════════════
   ============================================================ */
function updatePlanetEffects(){
  if(G.realm !== REALM.PLANET || !G.planet) return;

  const p = G.planet;
  const t = G.t;

  /* ═══ 1) الرياح الجانبية ═══ */
  if(p.wind > 0 && G.state === 'PLAYING'){
    const windForce = Math.sin(t * 0.02) * p.wind * 0.3;
    P.x = clamp(P.x + windForce, P.r, W - P.r);
  }

  /* ═══ 2) الطقس النشط ═══ */
  if(p.weather && Math.random() < p.weather.rate){
    spawnPlanetWeatherParticle(p.weather.type, p);
  }

  /* ✅ 3) تحديث جسيمات الطقس الكوكبي */
  updatePlanetWeatherParticles();

  /* ═══ 4) الإشعاع ═══ */
  if(p.radiation > 0.5){
    const flicker = 0.02 + Math.sin(t * 0.15) * 0.01;
    G.flash = Math.max(G.flash, flicker * p.radiation);
  }

  /* ═══ 5) جسيمات الغلاف الجوي ═══ */
  if(p.atmosphere && p.atmosphere.density > 0.4 && t % 6 === 0){
    particles.push({
      x: rand(0, W),
      y: rand(0, H),
      vx: rand(-0.3, 0.3) + p.wind * 0.5,
      vy: rand(-0.2, 0.2),
      life: 2,
      decay: 0.008,
      color: p.atmosphere.color,
      size: rand(1.5, 3)
    });
  }
}

function spawnPlanetWeatherParticle(type, planet){
  if(G.weather.length > 80) return;   /* حد أقصى */

  const startX = rand(0, W);
  let p;

  switch(type){
    case 'meteor':
      p = {
        x: startX, y: -20,
        vx: rand(-3, 3) - 2,
        vy: rand(6, 10),
        life: 150, maxLife: 150,
        color: '#FFB060',
        size: 4
      };
      break;

    case 'acidRain':
      for(let i = 0; i < 2; i++){
        G.weather.push({
          x: rand(0, W), y: -10,
          vx: rand(-0.5, 0.5),
          vy: rand(8, 12),
          life: 120, maxLife: 120,
          color: '#E8FF80',
          size: 2
        });
      }
      return;

    case 'dustStorm':
      p = {
        x: -10, y: rand(0, H),
        vx: rand(6, 10),
        vy: rand(-1, 1),
        life: 180, maxLife: 180,
        color: '#C86A40',
        size: rand(2, 4)
      };
      break;

    case 'jupiterStorm': {
      const angle = rand(0, Math.PI * 2);
      p = {
        x: startX, y: rand(0, H),
        vx: Math.cos(angle) * 3,
        vy: Math.sin(angle) * 3,
        life: 200, maxLife: 200,
        color: '#D04030',
        size: rand(4, 8)
      };
      break;
    }

    case 'ringParticles':
      p = {
        x: startX, y: rand(0, H * 0.5),
        vx: rand(-1, 1),
        vy: rand(0.5, 2),
        life: 250, maxLife: 250,
        color: '#F0E0C0',
        size: rand(1, 3)
      };
      break;

    case 'iceCrystals':
      p = {
        x: startX, y: -10,
        vx: rand(-1, 1),
        vy: rand(2, 5),
        life: 200, maxLife: 200,
        color: '#C0E8FF',
        size: rand(2, 4)
      };
      break;

    case 'neptuneStorm': {
      const angle = rand(0, Math.PI * 2);
      p = {
        x: startX, y: rand(0, H),
        vx: Math.cos(angle) * 6,
        vy: Math.sin(angle) * 4,
        life: 180, maxLife: 180,
        color: '#80C0FF',
        size: rand(3, 6)
      };
      break;
    }

    default:
      return;
  }

  if(p) G.weather.push(p);
}


/* ═══ تحديث جسيمات الكوكب (ضعها داخل updatePlanetEffects) ═══ */
function updatePlanetWeatherParticles(){
  for(let i = G.weather.length - 1; i >= 0; i--){
    const p = G.weather[i];
    p.x += p.vx || 0;
    p.y += p.vy || 0;
    p.life--;

    /* حذف عند الخروج أو انتهاء الحياة */
    if(p.life <= 0 || p.x < -50 || p.x > W + 50 || p.y > H + 50){
      G.weather.splice(i, 1);
    }
  }
}

function drawPlanetFloors(){
  if(!G.planet) return;
  const p = G.planet;

  for(const f of G.planetFloors){
    if(f.dead) continue;

if(f.isPlanetHole){
  const isReturn = !!f.isPlanetReturn;
  const isNext   = !!f.isPlanetNext;
  const isVoid   = !!f.isVoidHole;

  /* ═══ تمييز لوني واضح ═══ */
  let portalColor, portalGlow, portalLabel, portalText;
  if(isReturn){
    portalColor = '#40E8FF';   /* أزرق سماوي = عودة للأرض */
    portalGlow  = '#A0F0FF';
    portalLabel = '☁';
    portalText  = 'RETURN';
  } else if(isVoid){
    portalColor = '#A040FF';
    portalGlow  = '#D0A0FF';
    portalLabel = '◉';
    portalText  = 'VOID';
  } else {
    /* البوابة للكوكب التالي — ذهبية/برتقالية */
    portalColor = '#FFD060';
    portalGlow  = '#FFE8A0';
    portalLabel = '▶';
    portalText  = 'NEXT PLANET';
  }

  /* ═══ الجسم ═══ */
  if(isReturn){
    const grad = ctx.createLinearGradient(0, GROUND_Y - 4, 0, GROUND_Y + GROUND_H + 40);
    grad.addColorStop(0, '#40E8FF');
    grad.addColorStop(0.4, 'rgba(64,232,255,0.6)');
    grad.addColorStop(1, 'rgba(64,232,255,0.1)');
    ctx.fillStyle = grad;
    ctx.fillRect(f.x, GROUND_Y - 4, f.w, GROUND_H + 40);
  } else if(isVoid){
    const grad = ctx.createLinearGradient(0, GROUND_Y - 4, 0, GROUND_Y + GROUND_H + 40);
    grad.addColorStop(0, '#A040FF');
    grad.addColorStop(0.4, 'rgba(80,20,160,0.8)');
    grad.addColorStop(1, '#000000');
    ctx.fillStyle = grad;
    ctx.fillRect(f.x, GROUND_Y - 4, f.w, GROUND_H + 40);

    /* نجوم داخل الفراغ */
    for(let i = 0; i < 8; i++){
      const sx = f.x + ((i * 37 + G.t * 0.5) % f.w);
      const sy = GROUND_Y + 20 + (i * 53 % 100);
      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = 0.4 + Math.sin(G.t * 0.1 + i) * 0.4;
      ctx.beginPath();
      ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  } else {
    ctx.fillStyle = '#000000';
    ctx.fillRect(f.x, GROUND_Y, f.w, GROUND_H + 40);
  }

  /* ═══ الحواف المضيئة ═══ */
  const edgePulse = 0.6 + Math.sin(G.t * 0.12) * 0.4;
  ctx.fillStyle = portalColor;
  ctx.globalAlpha = edgePulse;
  ctx.shadowColor = portalGlow;
  ctx.shadowBlur = 15;
  ctx.fillRect(f.x - 3, GROUND_Y, 3, GROUND_H);
  ctx.fillRect(f.x + f.w, GROUND_Y, 3, GROUND_H);
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;

  /* ═══ الأيقونة ═══ */
  const pulse = 0.6 + Math.sin(G.t * 0.12) * 0.35;
  ctx.globalAlpha = pulse;
  ctx.fillStyle = portalColor;
  ctx.shadowColor = portalGlow;
  ctx.shadowBlur = 18;
  ctx.font = 'bold 26px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(portalLabel, f.x + f.w / 2, GROUND_Y - 40 + Math.sin(G.t * 0.1) * 5);

  /* ═══ النص التوضيحي ═══ */
  ctx.font = 'bold 10px "Space Grotesk", sans-serif';
  ctx.fillStyle = portalColor;
  ctx.fillText(portalText, f.x + f.w / 2, GROUND_Y - 14);

  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  continue;
}

    if(f.isPlanetFloat){
      /* مؤقت قبل السقوط */
      if(f.fallDelay > 0){
        f.fallDelay--;
        if(f.fallDelay <= 0) f.falling = true;
      }

      /* وميض تحذيري */
      if(f.fallDelay > 0){
        const warn = 0.4 + Math.sin(G.t * 0.5) * 0.5;
        ctx.globalAlpha = warn;
        ctx.strokeStyle = '#FF5050';
        ctx.lineWidth = 2;
        ctx.strokeRect(f.x, f.y, f.w, f.h);
        ctx.globalAlpha = 1;
      }

      /* جسم الأرضية */
      ctx.fillStyle = p.groundTop;
      roundRect(ctx, f.x, f.y, f.w, f.h, 5);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      roundRect(ctx, f.x + 3, f.y + 2, f.w - 6, 3, 2);
      ctx.fill();

      ctx.fillStyle = p.groundDark;
      roundRect(ctx, f.x + 3, f.y + f.h - 3, f.w - 6, 2, 1);
      ctx.fill();

      /* هالة عند اقتراب السقوط */
      if(f.fallDelay > 0 && f.fallDelay < 30){
        ctx.globalAlpha = 0.5;
        const glow = ctx.createRadialGradient(f.x + f.w/2, f.y, 5, f.x + f.w/2, f.y, f.w);
        glow.addColorStop(0, '#FF5050');
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(f.x + f.w/2, f.y, f.w, 0, Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }
}

function drawObstacles(){
    if(G.realm === REALM.PLANET){
    drawPlanetFloors();
  }
  for(const o of obstacles){
    if(o.dead) continue;
    if(o.isUnderObstacle) drawUnderObstacle(o);
    else if(o.isWalk) drawWalkObstacle(o);
    else drawTunnelObstacle(o);
  }
}

function drawCoins(){
  for(const c of coins){
    if(c.dead) continue;
    const spin = Math.abs(Math.cos(c.t*0.08));
    const rx = c.r * (0.35 + spin*0.65);

    if(c.isSkyCoin){
      const pulse = 1 + Math.sin(c.t*0.12)*0.15;
      const rr = c.r * pulse;

      const halo = ctx.createRadialGradient(c.x, c.y, 2, c.x, c.y, rr*2.5);
      halo.addColorStop(0, '#FFD700');
      halo.addColorStop(1, 'rgba(255,215,0,0)');
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(c.x, c.y, rr*2.5, 0, Math.PI*2); ctx.fill();
      ctx.globalAlpha = 1;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.t * 0.03);
      ctx.fillStyle = '#FFD700';
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      for(let i=0;i<10;i++){
        const a = (i/10)*Math.PI*2;
        const rad = i%2===0 ? rr : rr*0.42;
        const px = Math.cos(a)*rad, py = Math.sin(a)*rad;
        i===0 ? ctx.moveTo(px,py) : ctx.lineTo(px,py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#FFF4C0';
      ctx.beginPath(); ctx.arc(0,0, rr*0.3, 0, Math.PI*2); ctx.fill();
      ctx.restore();
      continue;
    }

    ctx.globalAlpha = 0.25;
    ctx.fillStyle = '#FFE090';
    ctx.beginPath(); ctx.arc(c.x, c.y, c.r*1.7, 0, Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.beginPath(); ctx.ellipse(c.x, c.y+2, rx, c.r, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#E8B34E';
    ctx.beginPath(); ctx.ellipse(c.x, c.y, rx, c.r, 0, 0, Math.PI*2); ctx.fill();
    if(spin > 0.4){
      ctx.fillStyle = '#FFF0C0';
      ctx.beginPath(); ctx.ellipse(c.x, c.y, rx*0.55, c.r*0.55, 0, 0, Math.PI*2); ctx.fill();
    }
  }
}

function drawOrbs(){
  for(const ob of orbs){
    if(ob.dead) continue;
    const pulse = 1 + Math.sin(ob.t*0.1)*0.1;
    const r = ob.r * pulse;
    const col = ob.color || G.currentScene.accent;
    const halo = ctx.createRadialGradient(ob.x, ob.y, 2, ob.x, ob.y, r*3);
    halo.addColorStop(0, col); halo.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(ob.x, ob.y, r*3, 0, Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.arc(ob.x, ob.y, r, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.beginPath(); ctx.arc(ob.x - r*0.28, ob.y - r*0.3, r*0.4, 0, Math.PI*2); ctx.fill();
  }
}

function drawPowerups(){
  for(const p of powerups){
    if(p.dead) continue;
    const type = p.type;
    const pulse = 1 + Math.sin(p.t*0.12)*0.12;
    const r = p.r * pulse;
    const halo = ctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, r*3);
    halo.addColorStop(0, type.color); halo.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(p.x, p.y, r*3, 0, Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;
    const rot = p.t * 0.03;
    ctx.save();
    ctx.translate(p.x, p.y); ctx.rotate(rot);
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.strokeStyle = type.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for(let i=0;i<6;i++){
      const a = (i/6)*Math.PI*2;
      const px = Math.cos(a)*r, py = Math.sin(a)*r;
      i===0 ? ctx.moveTo(px,py) : ctx.lineTo(px,py);
    }
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
    ctx.fillStyle = type.color;
    ctx.font = 'bold 14px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(type.icon, p.x, p.y+1);
  }
}

function drawParticles(){
  for(const p of particles){
    const life = Math.max(0, p.life);
    ctx.globalAlpha = life * 0.95;

    if(p.item){
      const img = ASSET.getImage(p.item);
      if(img){
        let sz = p.size;
        /* تمدد تدريجي */
        if(p.scaleOverLife){
          const progress = 1 - life;
          sz = p.size * (1 + progress * p.scaleOverLife);
        } else {
          sz = p.size * Math.max(0.3, life);
        }
        ASSET.drawItem(ctx, p.item, {
          x: p.x, y: p.y,
          size: sz,
          anchorX: 0.5, anchorY: 0.5
        });
        continue;
      }
    }

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * Math.max(0.2, life), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawFloats(){
  ctx.textAlign = 'center';
  for(const f of floats){
    ctx.globalAlpha = Math.max(0, f.life);
    ctx.font = '700 '+f.size+'px "Space Grotesk", sans-serif';
    ctx.fillStyle = f.color;
    ctx.fillText(f.text, f.x, f.y);
  }
  ctx.globalAlpha = 1;
}

function drawBanner(){
  if(G.banner.timer <= 0) return;
  const t = G.banner.timer, total = 140;
  let a = 1;
  if(t > total-25) a = (total-t)/25;
  if(t < 35) a = t/35;
  ctx.save();
  ctx.globalAlpha = a;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#1A1512';
  ctx.font = '700 26px "Space Grotesk", sans-serif';
  ctx.fillText(G.banner.text, W/2, H*0.3);
  if(G.banner.sub){
    ctx.font = '700 13px Tajawal, sans-serif';
    ctx.fillStyle = G.currentScene.accent;
    ctx.fillText(G.banner.sub, W/2, H*0.3 + 24);
  }
  ctx.restore();
}

function drawOverlayEffects(){
  if(G.flash > 0){
    ctx.fillStyle = 'rgba(255,255,255,'+(G.flash*0.4).toFixed(3)+')';
    ctx.fillRect(0,0,W,H);
    G.flash -= 0.028;
    if(G.flash < 0) G.flash = 0;
  }
  if(G.activePowerups.slow){ ctx.fillStyle = 'rgba(143,184,216,0.08)'; ctx.fillRect(0,0,W,H); }
    if(G.activePowerups.bulletTime){
    ctx.fillStyle = 'rgba(160,120,255,0.10)';
    ctx.fillRect(0,0,W,H);
  }
  if(G.activePowerups.haste){
    ctx.fillStyle = 'rgba(255,208,64,0.06)';
    ctx.fillRect(0,0,W,H);
  }
  if(G.activePowerups.magnet){
    ctx.strokeStyle = 'rgba(201,154,201,0.15)';
    ctx.lineWidth = 40;
    ctx.beginPath(); ctx.arc(P.x, P.y, P.r*4, 0, Math.PI*2); ctx.stroke();
  }
  if(G.mode === 'FLIP_WALK'){
    const grad = ctx.createRadialGradient(W/2, H/2, Math.min(W,H)*0.3, W/2, H/2, Math.max(W,H)*0.8);
    grad.addColorStop(0,'rgba(180,80,180,0)');
    grad.addColorStop(1,'rgba(120,40,120,0.18)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);
  }
  if(G.mode === 'SKY_JUMP'){
    const grad = ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,'rgba(120,180,240,0.08)');
    grad.addColorStop(1,'rgba(120,180,240,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);
  }
}

function draw(){
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, W, H);   // ✅ يمنع ظهور محتوى الإطار السابق
  ctx.save();

  if(G.shake > 0.4){
    ctx.translate((Math.random()-0.5)*G.shake, (Math.random()-0.5)*G.shake);
    G.shake *= 0.87;
  } else G.shake = 0;

  drawSky();
  drawSkyDecor();
  drawHills();
  drawClouds();

  ctx.save();
  /* إزاحة مزدوجة: للأعلى (camY موجب) وللأسفل (camYUnder موجب يصبح -camYUnder) */
  ctx.translate(0, G.camY - G.camYUnder);

  /* ارسم عالم الأعماق وطبقات الأرض والتضاريس الضخمة */
  drawUnderworld();
  drawUnderFloors();
  drawUnderTerrain();

  drawGround();

  if(G.state !== 'MENU'){
    drawObstacles();
    drawCoins();
    drawOrbs();
    drawPowerups();
    drawSparks();
    drawPlayer();
    drawCompanion();
  }
  drawParticles();
  drawFloats();

  ctx.restore();

  drawWeather();
  drawBanner();
  drawOverlayEffects();

  ctx.restore();
}

/* ============================================================
   ==================== Main loop ============================
   ============================================================ */
let lastTime = performance.now();
let acc = 0;
const STEP = 1000/60;

function loop(now){
  requestAnimationFrame(loop);
  let dt = now - lastTime;
  lastTime = now;
  if(dt > 100) dt = 100;
  acc += dt;
  let it = 0;
  while(acc >= STEP && it < 5){ update(); acc -= STEP; it++; }
  if(it >= 5) acc = 0;
  draw();
}

function update(){
  G.t++;
  for(let i=particles.length-1;i>=0;i--){
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    p.vx *= 0.985; p.vy *= 0.985;
    p.life -= p.decay;
    if(p.life <= 0) particles.splice(i,1);
  }
  for(let i=floats.length-1;i>=0;i--){
    const f = floats[i];
    f.y += f.vy; f.vy *= 0.94;
    f.life -= 0.022;
    if(f.life <= 0) floats.splice(i,1);
  }
  if(G.banner.timer > 0) G.banner.timer--;
  if(G.state==='MENU'){
    G.dist += 0.4;
    G.currentScene = SCENES[G.sceneIdx];
    updateWeather();
    updateSparks();
  }
  if(G.state==='PLAYING') updateGameplay();
}

/* ============================================================
   ==================== Global level =========================
   ============================================================ */
function getGlobalMeters(){
  /* استثنِ MIXED من المجموع (لأنه يجمع أفضل الأنماط الفردية) */
  const bm = Save.data.bestMeters;
  return (bm.FLIP||0) + (bm.FLAP||0) + (bm.DRIFT||0) + (bm.WALK||0);
}
function getGlobalLevel(){ return levelFromMeters(getGlobalMeters(), GLOBAL_LEVEL_THRESHOLDS); }
function getModeLevel(mode){ return levelFromMeters(Save.data.bestMeters[mode] || 0, MODE_LEVEL_THRESHOLDS); }
function updateGlobalLevelUI(){
  const totalM = getGlobalMeters();
  const lv = getGlobalLevel() + 1;
  const prog = levelProgress(totalM, GLOBAL_LEVEL_THRESHOLDS) * 100;
  const lvlNum = document.getElementById('global-lvl-num');
  const lvlM = document.getElementById('global-lvl-meters');
  const lvlBtn = document.getElementById('global-lvl-btn');
  if(lvlNum) lvlNum.textContent = lv;
  if(lvlM) lvlM.textContent = Math.floor(totalM) + 'م';
  if(lvlBtn) lvlBtn.style.setProperty('--p', prog);
}

/* ============================================================
   ==================== Screens ==============================
   ============================================================ */
function hideAllScreens(){ document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); }
function showScreen(id){
  const homeMenu = document.getElementById('home-menu');
  if(homeMenu) homeMenu.classList.remove('open');

  hideAllScreens();
  const overlay = document.getElementById('overlay');
  const screen = document.getElementById(id);
  if(overlay) overlay.classList.add('active');
  if(screen) screen.classList.add('active');
}
function hideOverlay(){ const o = document.getElementById('overlay'); if(o) o.classList.remove('active'); }
function setInGame(on){ wrapEl.classList.toggle('in-game', on); }

/* ============================================================
   ==================== Reward modal =========================
   ============================================================ */
function showRewardModal(icon, kicker, value, desc, onClaim){
  document.getElementById('rw-icon').textContent = icon;
  document.getElementById('rw-kicker').textContent = kicker;
  document.getElementById('rw-value').textContent = value;
  document.getElementById('rw-desc').textContent = desc;
  const btn = document.getElementById('rw-claim');
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  newBtn.addEventListener('click', ()=>{
    document.getElementById('reward-modal').classList.remove('active');
    if(onClaim) onClaim();
  });
  document.getElementById('reward-modal').classList.add('active');
  Sfx.reward();
  haptic(20);
}

/* ============================================================
   ==================== Missions =============================
   ============================================================ */
function ensureMissions(){
  const m = Save.data.missions;
  const t = today();
  const w = weekStart();
  const mo = monthStart();

  if(m.dailyReset !== t){
    m.daily = MISSION_TEMPLATES.daily.map(x=>x.id);
    m.dailyReset = t;
    m.progressDaily = { plays:0, meters:0, coins:0, orbs:0 };
  }
  if(m.weeklyReset !== w){
    m.weekly = MISSION_TEMPLATES.weekly.map(x=>x.id);
    m.weeklyReset = w;
    m.progressWeekly = { plays:0, meters:0, coins:0, orbs:0 };
  }
  if(m.monthlyReset !== mo){
    m.monthly = MISSION_TEMPLATES.monthly.map(x=>x.id);
    m.monthlyReset = mo;
    m.progressMonthly = { plays:0, meters:0, coins:0, orbs:0 };
  }
  Save.save();
}

function getMissionData(tier, id){
  const tmpl = MISSION_TEMPLATES[tier].find(x=>x.id===id);
  if(!tmpl) return null;
  const progKey = 'progress' + tier.charAt(0).toUpperCase() + tier.slice(1);
  const prog = Save.data.missions[progKey][tmpl.key] || 0;
  return { tmpl, prog, done: prog >= tmpl.target };
}

function buildMissions(tier){
  const list = document.getElementById('quest-list');
  if(!list) return;
  list.innerHTML = '';
  const active = Save.data.missions[tier] || [];
  if(active.length === 0){
    list.innerHTML = '<div style="text-align:center;padding:30px;color:var(--ink-mute);font-size:13px;">لا توجد مهام حالياً</div>';
    return;
  }
  active.forEach(id=>{
    const data = getMissionData(tier, id);
    if(!data) return;
    const { tmpl, prog, done } = data;
    const pct = Math.min(100, (prog/tmpl.target)*100);
    const el = document.createElement('div');
    el.className = 'list-item' + (done ? ' done' : '');
    el.innerHTML = `
      <div class="li-icon">${tmpl.icon}${done ? '<span class="check">✓</span>' : ''}</div>
      <div class="li-body">
        <div class="li-name">${tmpl.title}</div>
        <div class="li-desc">${Math.min(prog, tmpl.target)} / ${tmpl.target}</div>
        <div class="li-prog"><div class="li-prog-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="li-reward">
        <span class="k">REWARD</span>
        <span>◆ ${tmpl.reward}</span>
      </div>`;
    list.appendChild(el);
  });
}

/* ============================================================
   ==================== Season ===============================
   ============================================================ */
function getSeasonRankIdx(){
  const pts = Save.data.season.points;
  let idx = 0;
  for(let i=0;i<SEASON_RANKS.length;i++){ if(pts >= SEASON_RANKS[i].points) idx = i; }
  return idx;
}
function buildSeason(){
  const pts = Save.data.season.points;
  const rankIdx = getSeasonRankIdx();
  const rank = SEASON_RANKS[rankIdx];
  document.getElementById('season-rank').textContent = rank.icon + ' ' + rank.name;
  document.getElementById('season-points').textContent = pts;

  const cur = SEASON_RANKS[rankIdx].points;
  const next = SEASON_RANKS[rankIdx+1] ? SEASON_RANKS[rankIdx+1].points : (cur + 10000);
  const prog = clamp((pts-cur)/(next-cur), 0, 1) * 100;
  document.getElementById('season-prog').style.width = prog + '%';

  const rl = document.getElementById('rank-list');
  rl.innerHTML = '';
  SEASON_RANKS.forEach((r, i)=>{
    const el = document.createElement('div');
    el.className = 'list-item' + (i <= rankIdx ? ' done' : '');
    el.innerHTML = `
      <div class="li-icon">${r.icon}</div>
      <div class="li-body">
        <div class="li-name">${r.name}</div>
        <div class="li-desc">${r.points} نقطة</div>
      </div>
      <div class="li-reward">
        <span class="k">SOON</span>
        <span>🎁</span>
      </div>`;
    rl.appendChild(el);
  });
}

/* ============================================================
   ==================== Battle Pass ==========================
   ============================================================ */
function getBPTier(){ return Math.min(Math.floor(Save.data.season.points / BP_TIER_POINTS), BP_TIERS); }

/* ============================================================
   ==================== Daily login ==========================
   ============================================================ */
function canClaimDaily(){
  const dl = Save.data.dailyLogin;
  return dl.lastClaim !== today();
}
function checkDailyReset(){
  const dl = Save.data.dailyLogin;
  if(!dl.lastClaim) return;
  const diff = daysBetween(dl.lastClaim, today());
  if(diff > 1){ dl.streak = 0; Save.save(); }
}
function buildDaily(){
  checkDailyReset();
  const dl = Save.data.dailyLogin;
  document.getElementById('login-streak').textContent = dl.streak + ' أيام';

  const grid = document.getElementById('login-grid');
  grid.innerHTML = '';
  const curDay = dl.streak % 7;
  const canClaim = canClaimDaily();

  for(let i=0;i<7;i++){
    const rw = LOGIN_REWARDS[i];
    const claimed = i < curDay || (i === curDay && !canClaim);
    const isToday = i === curDay && canClaim;
    const el = document.createElement('div');
    el.className = 'login-day' + (claimed ? ' claimed' : '') + (isToday ? ' today' : '');
    el.innerHTML = `
      <span class="num">${i+1}</span>
      <span class="ic">${claimed ? '✓' : rw.icon}</span>
      <span class="r">${rw.label}</span>
    `;
    grid.appendChild(el);
  }

  const btn = document.getElementById('claim-daily-btn');
  if(!canClaim){
    btn.textContent = 'تم الاستلام اليوم';
    btn.style.opacity = '0.5';
    btn.disabled = true;
  } else {
    btn.textContent = 'استلام مكافأة اليوم';
    btn.style.opacity = '1';
    btn.disabled = false;
  }
}

/* ============================================================
   ==================== Shop =================================
   ============================================================ */
function buildShop(){
  const grid = document.getElementById('skin-grid');
  if(!grid) return;
  grid.innerHTML = '';
  getAllSkins().forEach(s=>{
    const owned = Save.data.ownedSkins.includes(s.id);
    const eq = Save.data.currentSkin === s.id;
    const rarity = s.rarity || 'common';

    /* التحقق من إمكانية الشراء */
    const shopPlacement = s.isCustom
      ? (s.placements || []).find(p => p.type === 'shop')
      : { price: s.price };
    const canBuy = !!shopPlacement;

    const el = document.createElement('button');
    el.className = 'skin-card rar-' + rarity + (eq ? ' equipped' : '') + (!owned ? ' locked' : '');

    /* ... نفس كود الكانفس السابق ... */
    const previewCanvas = document.createElement('canvas');
    const pSize = 66;
    const pDPR = Math.min(window.devicePixelRatio||1, 2.5);
    previewCanvas.width = Math.floor(pSize * pDPR);
    previewCanvas.height = Math.floor(pSize * pDPR);
    previewCanvas.style.width = pSize + 'px';
    previewCanvas.style.height = pSize + 'px';
    previewCanvas.className = 'skin-canvas';
    const pctx = previewCanvas.getContext('2d');
    pctx.setTransform(pDPR, 0, 0, pDPR, 0, 0);
    const bgGrad = pctx.createRadialGradient(pSize/2, pSize/2, 4, pSize/2, pSize/2, pSize/2);
    bgGrad.addColorStop(0, mixColor(s.accent, '#FFFFFF', 0.75));
    bgGrad.addColorStop(1, mixColor(s.accent, '#FFFFFF', 0.95));
    pctx.fillStyle = bgGrad;
    pctx.beginPath(); pctx.arc(pSize/2, pSize/2, pSize/2 - 1, 0, Math.PI*2); pctx.fill();
    const previewR = pSize * 0.28;
    pctx.save();
    pctx.translate(pSize/2, pSize/2 + 4);
    renderCharacter(pctx, previewR, s, { mode: 'FLIP', rot: 0, alpha: 1, skipExtras: true });
    pctx.restore();
    el.appendChild(previewCanvas);

    const nameEl = document.createElement('div');
    nameEl.className = 'skin-name'; nameEl.textContent = s.ar;
    el.appendChild(nameEl);

    const nameEn = document.createElement('div');
    nameEn.className = 'skin-name-ar'; nameEn.textContent = s.en;
    el.appendChild(nameEn);

    const rarEl = document.createElement('div');
    rarEl.className = 'skin-rarity'; rarEl.textContent = RARITY_LABELS[rarity];
    el.appendChild(rarEl);

    /* ═══ شارة السعر / المصدر ═══ */
    let tag;
    if(eq) tag = '<div class="skin-tag equipped">مُجهّز</div>';
    else if(owned) tag = '<div class="skin-tag owned">مملوك</div>';
    else if(canBuy) tag = `<div class="skin-tag buy"><span>◆</span> ${shopPlacement.price}</div>`;
    else {
      /* عرض المصدر البديل */
      const p = (s.placements || [])[0];
      if(p){
        const info = getSourceTypeInfo(p.type);
        tag = `<div class="skin-tag" style="color:${info.color};font-size:9px;">${info.icon} ${info.label}</div>`;
      } else {
        tag = '<div class="skin-tag" style="color:var(--ink-mute);font-size:9px;">غير متوفر</div>';
      }
    }
    const tagEl = document.createElement('div');
    tagEl.innerHTML = tag;
    el.appendChild(tagEl.firstChild);

    if(!owned){
      const lock = document.createElement('div');
      lock.className = 'skin-lock'; lock.textContent = canBuy ? '🔒' : '🎁';
      el.appendChild(lock);
    }

    el.addEventListener('click', ()=>{
      if(eq) return;
      if(owned){
        Save.data.currentSkin = s.id;
        Save.save();
        Sfx.tap(); haptic(8);
        buildShop();
      } else if(canBuy && ((hasAdminAccess() && Save.data.admin.unlimitedUnlock) || Save.data.coins >= shopPlacement.price)){
        if(!(hasAdminAccess() && Save.data.admin.unlimitedUnlock)) Save.data.coins -= shopPlacement.price;
        if(!Save.data.ownedSkins.includes(s.id)) Save.data.ownedSkins.push(s.id);
        Save.data.currentSkin = s.id;
        Save.save();
        Sfx.reward(); haptic(15);
        buildShop();
        updateCoinsUI();
      } else {
        Sfx.play(220,0.15,'sine',0.05,180);
        haptic(20);
      }
    });
    grid.appendChild(el);
  });
  updateCoinsUI();
}

/* ============================================================
   ==================== Cosmetics ============================
   ============================================================ */
let currentCosTab = 'spark';

/* ============================================================
   ═══════════ RENDER COSMETIC PREVIEW v3 ════════════════════
   ═══════════════════════════════════════════════════════════
   نظام صور فقط — لا رسم برمجي
   ============================================================ */
function renderCosPreview(pctx, w, h, cat, item){
  if(!pctx || !item || typeof pctx !== 'object') return;

  const cx = w / 2;
  const cy = h / 2;

  /* ═══════════════════════════════════════════════════════
     ✅ الحالة الوحيدة: عنصر بصورة
     ═══════════════════════════════════════════════════════ */
  if(hasItemImage(item)){
    const img = ASSET.getImage(item);

    /* الصورة جاهزة — ارسمها بحجم مناسب مع الحفاظ على النسبة */
    if(img && img.complete && img.naturalWidth > 0){
      const maxW = w * 0.9;
      const maxH = h * 0.9;
      const ratio = img.naturalHeight / img.naturalWidth || 1;

      let drawW = maxW;
      let drawH = drawW * ratio;
      if(drawH > maxH){
        drawH = maxH;
        drawW = drawH / ratio;
      }

      pctx.clearRect(0, 0, w, h);
      pctx.drawImage(img, cx - drawW / 2, cy - drawH / 2, drawW, drawH);
      return;
    }

    /* الصورة قيد التحميل — ارسم placeholder */
    pctx.clearRect(0, 0, w, h);
    pctx.fillStyle = 'rgba(139,130,120,0.12)';
    pctx.beginPath();
    pctx.arc(cx, cy, Math.min(w, h) * 0.3, 0, Math.PI * 2);
    pctx.fill();
    return;
  }

  /* ═══════════════════════════════════════════════════════
     ⚠️ عنصر بدون صورة — placeholder تحذيري
     ═══════════════════════════════════════════════════════ */
  pctx.clearRect(0, 0, w, h);
  pctx.fillStyle = 'rgba(139,130,120,0.12)';
  pctx.beginPath();
  pctx.arc(cx, cy, Math.min(w, h) * 0.3, 0, Math.PI * 2);
  pctx.fill();

  pctx.fillStyle = '#8B8278';
  pctx.font = 'bold 20px "Space Grotesk", sans-serif';
  pctx.textAlign = 'center';
  pctx.textBaseline = 'middle';
  pctx.fillText('🖼️', cx, cy);
}

/* ============================================================
   ============ COSMETICS BUILDER v2 — SHOP INTERFACE ========
   ============================================================
   الميزات الجديدة:
   - دعم كل الفئات (قديمة + جديدة)
   - تحميل الصور مع placeholder ذكي
   - معاينة مختلفة حسب نوع العنصر
   - حالة تحميل مستقلة لكل بطاقة
   - دعم admin unlimited unlock
   - تأثيرات بصرية عند التجهيز/الشراء
   - Cache للصور المصغرة
   - تصنيف RTL محسّن
   ============================================================ */

let _cosBuildToken = 0;

/* ═══ Cache للمعاينات المصغّرة ═══ */
const _cosPreviewCache = new Map();

/* ═══ COS_CATEGORY_CONFIG — مدمج مع COSMETIC_CATEGORIES v3 ═══ */
function getCosCategoryConfig(cat){
  return getCategoryConfig(cat);
}

/* ============================================================
   ═══════════════ MAIN BUILDER ═══════════════
   ============================================================ */
function buildCosmetics(){
  const grid = document.getElementById('cos-grid');
  if(!grid) return;

  /* ═══ Token لمنع التنفيذ المزدوج ═══ */
  const buildToken = ++_cosBuildToken;

  /* ═══ حماية أولية ═══ */
  if(!Save.data || !Save.data.cosmetics){
    console.warn('[Cosmetics] Save data not ready');
    return;
  }

  /* ✅ ضمان أن currentCosTab صالح */
  if(!COSMETIC_CATEGORIES[currentCosTab]){
    currentCosTab = COSMETIC_CATEGORY_ORDER[0];
  }

  const cat = currentCosTab;
  if(!Save.data.cosmetics.owned[cat])   Save.data.cosmetics.owned[cat]   = ['none'];
  if(!Save.data.cosmetics.current[cat]) Save.data.cosmetics.current[cat] = 'none';

  /* ═══ الفئة وإعداداتها ═══ */
  const catConfig = getCosCategoryConfig(cat);
  grid.setAttribute('data-category', cat);

  /* ═══ القائمة الكاملة ═══ */
  let list;
  try {
    list = getAllCosmetics(cat) || [];
  } catch(e){
    console.error('[Cosmetics] getAllCosmetics failed:', e);
    grid.innerHTML = '<div style="grid-column: span 2; text-align:center;padding:40px;color:#C14A4A;font-size:13px;">⚠ فشل تحميل العناصر</div>';
    return;
  }

  if(list.length === 0){
    grid.innerHTML = '<div style="grid-column: span 2; text-align:center;padding:40px;color:var(--ink-mute);font-size:13px;">لا توجد عناصر في هذا التصنيف</div>';
    return;
  }

  /* ═══ بيانات سياقية ═══ */
  const ownedList = Save.data.cosmetics.owned[cat] || [];
  const ownedSet  = new Set(ownedList);
  const currentId = Save.data.cosmetics.current[cat];

  const isAdminUnlimited = hasAdminAccess() && Save.data.admin && Save.data.admin.unlimitedUnlock;
  const userCoins = Save.data.coins || 0;

  /* ═══ إحصاء ═══ */
  const totalOwned = ownedList.length;
  const totalItems = list.length;

  /* ═══ Header (اختياري — يُبنى فوق الشبكة) ═══ */
  let headerEl = grid.parentNode.querySelector('.cos-header');
  if(!headerEl){
    headerEl = document.createElement('div');
    headerEl.className = 'cos-header';
    headerEl.style.cssText = `
      display:flex;align-items:center;justify-content:space-between;
      padding:10px 14px;margin-bottom:12px;border-radius:14px;
      background:linear-gradient(135deg, ${catConfig.color}15, ${catConfig.color}05);
      border:1px solid ${catConfig.color}30;
    `;
    grid.parentNode.insertBefore(headerEl, grid);
  }
  headerEl.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="font-size:22px;">${catConfig.icon}</span>
      <div>
        <div style="font-family:'Space Grotesk';font-size:13px;font-weight:700;color:${catConfig.color};letter-spacing:1.5px;">
          ${catConfig.en}
        </div>
        <div style="font-size:11px;font-weight:700;color:var(--ink-mute);">
          ${catConfig.label}
        </div>
      </div>
    </div>
    <div style="text-align:left;">
      <div style="font-family:'Space Grotesk';font-size:16px;font-weight:700;color:var(--ink);">
        ${totalOwned}<span style="color:var(--ink-mute);font-size:12px;">/${totalItems}</span>
      </div>
      <div style="font-size:9px;font-weight:800;letter-spacing:1.5px;color:var(--ink-mute);">OWNED</div>
    </div>
  `;

  /* ═══ مسح الشبكة ═══ */
  grid.innerHTML = '';

  /* ═══ بناء البطاقات ═══ */
  const fragment = document.createDocumentFragment();

  list.forEach((item, idx) => {
    if(buildToken !== _cosBuildToken) return;  /* إلغاء إذا بدأ بناء جديد */

    const card = buildCosmeticCard(item, {
      cat,
      catConfig,
      isOwned: ownedSet.has(item.id),
      isEquipped: currentId === item.id,
      userCoins,
      isAdminUnlimited,
      index: idx
    });

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);

  /* ═══ Empty state ═══ */
  if(grid.children.length === 0){
    grid.innerHTML = '<div style="grid-column: span 2; text-align:center;padding:40px;color:var(--ink-mute);font-size:13px;">لا يوجد عناصر قابلة للعرض</div>';
  }
}


/* ============================================================
   ═══════════════ BUILD SINGLE CARD ═══════════════
   ============================================================ */
function buildCosmeticCard(item, ctx){
  const { cat, catConfig, isOwned, isEquipped, userCoins, isAdminUnlimited, index } = ctx;

  /* ═══ السعر من placements ═══ */
  const shopPlacement = Array.isArray(item.placements)
    ? item.placements.find(p => p && p.type === 'shop')
    : (typeof item.price === 'number' ? { price: item.price } : null);

  const canBuy = !!shopPlacement && typeof shopPlacement.price === 'number';
  const price = canBuy ? shopPlacement.price : 0;
  const canAfford = isAdminUnlimited || (canBuy && userCoins >= price);

  /* ═══ العنصر الأساسي ═══ */
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'cos-card';
  if(isEquipped) el.classList.add('equipped');
  if(!isOwned)   el.classList.add('locked');
  if(isOwned && !isEquipped) el.classList.add('owned');
  el.setAttribute('data-item-id', item.id);
  el.setAttribute('data-category', cat);
  el.setAttribute('aria-label', item.name || 'عنصر');
  el.style.setProperty('--cos-color', catConfig.color);
  el.style.animationDelay = Math.min(index * 15, 300) + 'ms';

  /* ═══ المعاينة ═══ */
  const preview = document.createElement('div');
  preview.className = 'cos-preview' + ' cos-preview-' + catConfig.aspect;

  const previewContent = buildCosPreviewContent(item, cat, catConfig);
  preview.appendChild(previewContent);
  el.appendChild(preview);

  /* ═══ الاسم ═══ */
  const nameEl = document.createElement('div');
  nameEl.className = 'cos-name';
  nameEl.textContent = item.name || 'بدون اسم';
  el.appendChild(nameEl);

  /* ═══ السطر الفرعي (EN) ═══ */
  if(item.desc && item.desc !== item.name){
    const enEl = document.createElement('div');
    enEl.className = 'cos-name-en';
    enEl.textContent = item.desc;
    enEl.style.cssText = 'font-size:9px;color:var(--ink-mute);letter-spacing:1px;margin-top:1px;';
    el.appendChild(enEl);
  }

  /* ═══ Tag (السعر/الحالة) ═══ */
  const tag = buildCosTag(item, {
    isOwned, isEquipped, canBuy, price, canAfford, isAdminUnlimited, cat
  });
  el.appendChild(tag);

  /* ═══ Lock Icon ═══ */
  if(!isOwned){
    const lock = document.createElement('div');
    lock.className = 'skin-lock';
    lock.textContent = canBuy ? '🔒' : '🎁';
    el.appendChild(lock);
  }

  /* ═══ شارة النُدرة ═══ */
  if(item.rarity && item.rarity !== 'common'){
    const rar = document.createElement('div');
    rar.className = 'cos-rarity-dot';
    rar.style.cssText = `
      position:absolute;top:8px;left:8px;
      width:8px;height:8px;border-radius:50%;
      background:${getRarityColor(item.rarity)};
      box-shadow:0 0 8px ${getRarityColor(item.rarity)};
    `;
    el.appendChild(rar);
  }

  /* ═══ التفاعل ═══ */
  el.addEventListener('click', () => {
    handleCosmeticClick(item, {
      cat, isOwned, isEquipped, canBuy, price, canAfford, isAdminUnlimited, el
    });
  });

  return el;
}


/* ============================================================
   ═══════════════ BUILD PREVIEW CONTENT ═══════════════
   ============================================================ */
function buildCosPreviewContent(item, cat, catConfig){
  /* ═══════════════════════════════════════════════════════
     ✅ أولوية 1: عنصر مخصص بصورة
     ═══════════════════════════════════════════════════════ */
  if(hasItemImage(item)){
    const wrapper = document.createElement('div');
    wrapper.className = 'cos-preview-img-wrap';
    wrapper.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;';

    const src = ASSET.resolve(item);

    /* Loading spinner */
    const spinner = document.createElement('div');
    spinner.className = 'cos-preview-spinner';
    spinner.innerHTML = '<div style="width:20px;height:20px;border:2px solid rgba(0,0,0,.1);border-top-color:var(--amber);border-radius:50%;animation:spin .8s linear infinite;"></div>';
    wrapper.appendChild(spinner);

    /* الصورة الفعلية */
    const img = document.createElement('img');
    img.alt = item.name || '';
    img.draggable = false;
    img.decoding = 'async';
    img.loading = 'lazy';
    img.style.cssText = `
      position:absolute;inset:0;margin:auto;
      max-width:92%;max-height:92%;
      object-fit:contain;
      opacity:0;transition:opacity .3s;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,.1));
    `;
    img.onload = () => {
      spinner.style.display = 'none';
      img.style.opacity = '1';
    };
    img.onerror = () => {
      spinner.style.display = 'none';
      wrapper.innerHTML = '<span style="font-size:24px;opacity:.4;">⚠</span>';
    };
    img.src = src || '';
    wrapper.appendChild(img);

    return wrapper;
  }

  /* ═══════════════════════════════════════════════════════
     ✅ أولوية 2: معاينة برمجية حسب الفئة
     ═══════════════════════════════════════════════════════ */
  const canvas = document.createElement('canvas');
  const pw = 180, ph = 60;
  const pDPR = Math.min(window.devicePixelRatio || 1, 2.5);
  canvas.width  = Math.floor(pw * pDPR);
  canvas.height = Math.floor(ph * pDPR);
  canvas.style.width  = pw + 'px';
  canvas.style.height = ph + 'px';
  canvas.style.display = 'block';

  const pctx = canvas.getContext('2d');
  pctx.setTransform(pDPR, 0, 0, pDPR, 0, 0);

  /* استدعاء مع حماية */
  try {
    renderCosPreview(pctx, pw, ph, cat, item);
  } catch(e){
    console.warn('[CosPreview] Failed for', item.id, ':', e);
    /* Fallback آمن */
    pctx.clearRect(0, 0, pw, ph);
    pctx.fillStyle = catConfig.color + '30';
    pctx.beginPath();
    pctx.arc(pw/2, ph/2, 18, 0, Math.PI*2);
    pctx.fill();
    pctx.fillStyle = catConfig.color;
    pctx.font = 'bold 18px sans-serif';
    pctx.textAlign = 'center';
    pctx.textBaseline = 'middle';
    pctx.fillText(catConfig.icon, pw/2, ph/2);
  }

  return canvas;
}


/* ============================================================
   ═══════════════ BUILD TAG (STATUS BADGE) ═══════════════
   ============================================================ */
function buildCosTag(item, ctx){
  const { isOwned, isEquipped, canBuy, price, canAfford, isAdminUnlimited, cat } = ctx;

  const tag = document.createElement('div');
  tag.className = 'cos-tag';

  /* ═══ مُجهّز ═══ */
  if(isEquipped){
    tag.classList.add('equipped');
    tag.innerHTML = '<span style="font-weight:700;">✓ مُجهّز</span>';
    return tag;
  }

  /* ═══ مملوك ═══ */
  if(isOwned){
    tag.classList.add('owned');
    tag.innerHTML = '<span>مملوك · اضغط للتجهيز</span>';
    return tag;
  }

  /* ═══ قابل للشراء ═══ */
  if(canBuy){
    tag.classList.add('buy');
    if(!canAfford && !isAdminUnlimited){
      tag.classList.add('cant-afford');
      tag.style.opacity = '0.5';
    }
    tag.innerHTML = `
      <span style="color:var(--gold);font-size:11px;">◆</span>
      <span style="font-family:'Space Grotesk';font-weight:700;">${price.toLocaleString()}</span>
    `;
    return tag;
  }

  /* ═══ عنصر من مصدر آخر ═══ */
  const placement = (item.placements || [])[0];
  if(placement && typeof getSourceTypeInfo === 'function'){
    const info = getSourceTypeInfo(placement.type);
    tag.style.color = info.color;
    tag.style.fontSize = '9px';
    tag.innerHTML = `<span>${info.icon} ${info.label}</span>`;
    return tag;
  }

  /* ═══ غير متوفر ═══ */
  tag.style.color = 'var(--ink-mute)';
  tag.style.fontSize = '9px';
  tag.textContent = 'غير متوفر';
  return tag;
}


/* ============================================================
   ═══════════════ CLICK HANDLER ═══════════════
   ============================================================ */
function handleCosmeticClick(item, ctx){
  const { cat, isOwned, isEquipped, canBuy, price, canAfford, isAdminUnlimited, el } = ctx;

  /* ═══ مُجهّز مسبقاً ═══ */
  if(isEquipped){
    Sfx.tap();
    haptic(4);
    return;
  }

  /* ══════════════════════════════════════════════════════════
     1) مملوك — تجهيز مباشر
     ═══════════════════════════════════════════════════════ */
  if(isOwned){
    Save.data.cosmetics.current[cat] = item.id;
    Save.save();

    Sfx.tap();
    haptic(8);

    /* ✅ تأثير بصري فوري */
    el.classList.add('just-equipped');
    setTimeout(() => el.classList.remove('just-equipped'), 400);

    /* ✅ تحميل مسبق ذكي — الصورة الجديدة فقط */
    const newSrc = ASSET.resolve(item);
    if(newSrc && typeof ASSET !== 'undefined'){
      ASSET.preload([newSrc]).catch(()=>{});
    }

    /* إعادة البناء */
    buildCosmetics();
    return;
  }

  /* ══════════════════════════════════════════════════════════
     2) شراء — التحقق من الرصيد
     ═══════════════════════════════════════════════════════ */
  if(canBuy && canAfford){
    /* خصم الرصيد (إلا إذا كان admin unlimited) */
    if(!isAdminUnlimited){
      Save.data.coins -= price;
    }

    /* إضافة للمملوكات */
    if(!Save.data.cosmetics.owned[cat].includes(item.id)){
      Save.data.cosmetics.owned[cat].push(item.id);
    }

    /* تجهيز تلقائي */
    Save.data.cosmetics.current[cat] = item.id;
    Save.save();

    Sfx.reward();
    haptic(15);

    /* ✅ تأثير الشراء */
    el.classList.add('just-purchased');
    setTimeout(() => el.classList.remove('just-purchased'), 600);

    /* ✅ Preload */
    const newSrc = ASSET.resolve(item);
    if(newSrc && typeof ASSET !== 'undefined'){
      ASSET.preload([newSrc]).catch(()=>{});
    }

    updateCoinsUI();
    buildCosmetics();
    return;
  }

  /* ══════════════════════════════════════════════════════════
     3) لا يمكن الشراء — إشعار
     ═══════════════════════════════════════════════════════ */
  Sfx.play(220, 0.15, 'sine', 0.05, 180);
  haptic(20);

  /* اهتزاز البطاقة */
  el.classList.add('shake-denied');
  setTimeout(() => el.classList.remove('shake-denied'), 350);

  /* نص توضيحي */
  if(canBuy && !canAfford){
    showToast(`تحتاج ◆ ${(price - Save.data.coins).toLocaleString()} إضافية`);
  }
}


/* ============================================================
   ═══════════════ HELPERS ═══════════════
   ============================================================ */

/* ═══ لون النُدرة ═══ */
function getRarityColor(rarity){
  const map = {
    common:'#8B8278', uncommon:'#6B9B6B', rare:'#4A88C8',
    epic:'#9A6AC8', legend:'#E8B34E', legendary:'#E8B34E', mythic:'#E85838'
  };
  return map[rarity] || '#8B8278';
}

/* ═══ Toast بسيط ═══ */
function showToast(msg, duration = 1800){
  if(!msg) return;
  let toast = document.getElementById('toast-global');
  if(!toast){
    toast = document.createElement('div');
    toast.id = 'toast-global';
    toast.style.cssText = `
      position:fixed;bottom:100px;left:50%;transform:translateX(-50%) translateY(20px);
      padding:10px 20px;border-radius:100px;
      background:rgba(26,21,18,.92);color:#fff;
      font-family:'Space Grotesk',sans-serif;font-size:12px;font-weight:700;
      z-index:99999;pointer-events:none;
      opacity:0;transition:all .3s cubic-bezier(.34,1.56,.64,1);
      box-shadow:0 8px 24px rgba(0,0,0,.35);
      max-width:280px;text-align:center;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, duration);
}

/* ============================================================
   ==================== Achievements / Stats / Settings ======
   ============================================================ */
function buildAchievements(){
  const list = document.getElementById('ach-list');
  if(!list) return;
  list.innerHTML = '';
  ACHIEVEMENTS.forEach(a=>{
    const un = !!Save.data.achievements[a.id];
    const val = Math.min(a.value(Save.data), a.target);
    const pct = (val/a.target)*100;
    const el = document.createElement('div');
    el.className = 'list-item' + (un ? ' done' : '');
    el.innerHTML = `
      <div class="li-icon">${un ? a.icon : '?'}${un ? '<span class="check">✓</span>' : ''}</div>
      <div class="li-body">
        <div class="li-name">${a.name}</div>
        <div class="li-desc">${a.desc}</div>
        ${!un ? `<div class="li-prog"><div class="li-prog-fill" style="width:${pct}%"></div></div>` : ''}
      </div>
      <div class="li-reward"><span class="k">STATUS</span><span>${un?'✓':'—'}</span></div>`;
    list.appendChild(el);
  });
}
function updateAchBadge(){
  const total = ACHIEVEMENTS.length;
  const done = ACHIEVEMENTS.filter(a=>Save.data.achievements[a.id]).length;
  const badge = document.getElementById('ach-badge');
  if(!badge) return;
  const rem = total - done;
  if(rem > 0){ badge.style.display = 'flex'; badge.textContent = rem; }
  else badge.style.display = 'none';
}
function buildStats(){
  const list = document.getElementById('stats-list');
  if(!list) return;
  list.innerHTML = '';
  const s = Save.data.stats;
  const totalM = getGlobalMeters();
  const glvl = getGlobalLevel() + 1;
  const items = [
    { icon:'🎯', name:'المستوى العام', val: glvl },
    { icon:'🎮', name:'جولات ملعوبة', val:s.totalPlays },
    { icon:'📏', name:'مجموع الأمتار', val:Math.floor(totalM) },
    { icon:'🏆', name:'أفضل مسافة', val:Math.floor(s.bestMeters) + 'م' },
    { icon:'🔥', name:'أفضل سلسلة', val: (s.bestCombo || 0) },
    { icon:'◆',  name:'مجموع العملات', val:s.totalCoins },
    { icon:'🏅', name:'نقاط الموسم', val: Save.data.season.points },
    { icon:'◆',  name:'SHIFT Runs', val: (s.shiftRuns || 0) }
  ];
  items.forEach(it=>{
    const el = document.createElement('div');
    el.className = 'list-item';
    el.innerHTML = `
      <div class="li-icon" style="background:${currentSkin().body};color:${currentSkin().detail};">${it.icon}</div>
      <div class="li-body">
        <div class="li-name">${it.name}</div>
      </div>
      <div style="font-family:'Space Grotesk';font-size:16px;font-weight:700;color:#1A1512;">${it.val}</div>`;
    list.appendChild(el);
  });
}

/* ============================================================
   ==================== TITLES & BADGES ======================
   ============================================================ */
const TITLES = [
  { id:'rookie',      name:'مبتدئ',         icon:'🌱', color:'#8B8278', cond: s => s.stats.totalPlays >= 1 },
  { id:'explorer',    name:'مستكشف',        icon:'🧭', color:'#4A88C8', cond: s => s.stats.totalPlays >= 50 },
  { id:'veteran',     name:'محارب قديم',    icon:'⚔️', color:'#9A6AC8', cond: s => s.stats.totalPlays >= 200 },
  { id:'skyWalker',   name:'سالك السماء',   icon:'☁️', color:'#88C8E8', cond: s => (s.bestMeters.WALK||0) >= 1000 },
  { id:'gravityMaster', name:'سيد الجاذبية', icon:'⇅',  color:'#4A7FA0', cond: s => (s.bestMeters.FLIP||0) >= 2000 },
  { id:'stormRunner', name:'عدّاء العاصفة', icon:'⛈️', color:'#5A5A80', cond: s => (s.bestMeters.FLAP||0) >= 1500 },
  { id:'driftKing',   name:'ملك الانسياق',  icon:'✦',  color:'#C98A2E', cond: s => (s.bestMeters.DRIFT||0) >= 1500 },
  { id:'comboHunter', name:'قنّاص السلاسل', icon:'🔥', color:'#FF6020', cond: s => (s.stats.bestCombo||0) >= 50 },
  { id:'comboLegend', name:'أسطورة السلاسل',icon:'🌟', color:'#FFD060', cond: s => (s.stats.bestCombo||0) >= 100 },
  { id:'marathoner',  name:'الماراثوني',    icon:'🏃', color:'#6B9B6B', cond: s => s.stats.totalMeters >= 50000 },
  { id:'voidSurvivor',name:'ناجي الفراغ',   icon:'👑', color:'#C080FF', cond: s => s.stats.totalMeters >= 100000 },
  { id:'shifter',     name:'المتحوّل',      icon:'◆',  color:'#A06AD8', cond: s => (s.stats.shiftRuns||0) >= 20 },
  { id:'collector',   name:'الجامع',        icon:'💎', color:'#E8B34E', cond: s => (s.ownedSkins||[]).length >= 8 },
  { id:'masterCollector', name:'جامع الكنوز', icon:'👑', color:'#E85838', cond: s => (s.ownedSkins||[]).length >= 14 },
  { id:'architect',   name:'المعماري',      icon:'🏗️', color:'#4A8040', cond: s => s.stats.totalMeters >= 20000 && s.stats.totalPlays >= 100 }
];

function getPlayerTitle(saveData){
  let best = TITLES[0];
  for(const t of TITLES){
    try { if(t.cond(saveData)) best = t; } catch(e) {}
  }
  return best;
}

const BADGES = [
  { id:'p1',   cat:'progression', icon:'🌱', name:'بداية الرحلة',    desc:'العب أول جولة',            cond: s => s.stats.totalPlays >= 1 },
  { id:'p2',   cat:'progression', icon:'🎯', name:'مثابر',           desc:'العب 100 جولة',            cond: s => s.stats.totalPlays >= 100 },
  { id:'p3',   cat:'progression', icon:'📏', name:'مبتدئ المسافة',   desc:'اقطع 1000م إجمالاً',        cond: s => s.stats.totalMeters >= 1000 },
  { id:'p4',   cat:'progression', icon:'📐', name:'متوسط المسافة',   desc:'اقطع 10,000م إجمالاً',      cond: s => s.stats.totalMeters >= 10000 },
  { id:'p5',   cat:'progression', icon:'🗺️', name:'مسافر',           desc:'اقطع 100,000م إجمالاً',     cond: s => s.stats.totalMeters >= 100000 },
  { id:'p6',   cat:'progression', icon:'🌍', name:'حول العالم',      desc:'اقطع 1,000,000م إجمالاً',   cond: s => s.stats.totalMeters >= 1000000 },
  { id:'s1',   cat:'skill', icon:'⭐', name:'دقّة أولى',       desc:'سلسلة 10 بدون خطأ',     cond: s => (s.stats.bestCombo||0) >= 10 },
  { id:'s2',   cat:'skill', icon:'🌟', name:'دقّة عالية',      desc:'سلسلة 25',              cond: s => (s.stats.bestCombo||0) >= 25 },
  { id:'s3',   cat:'skill', icon:'💫', name:'سلسلة نارية',     desc:'سلسلة 50',              cond: s => (s.stats.bestCombo||0) >= 50 },
  { id:'s4',   cat:'skill', icon:'✨', name:'سلسلة أسطورية',   desc:'سلسلة 100',             cond: s => (s.stats.bestCombo||0) >= 100 },
  { id:'s5',   cat:'skill', icon:'🌠', name:'سلسلة خرافية',    desc:'سلسلة 200',             cond: s => (s.stats.bestCombo||0) >= 200 },
  { id:'m1',   cat:'mode', icon:'⇅', name:'سيد الجاذبية',   desc:'FLIP: 5000م',     cond: s => (s.bestMeters.FLIP||0) >= 5000 },
  { id:'m2',   cat:'mode', icon:'▲', name:'سيد التحليق',    desc:'FLAP: 5000م',     cond: s => (s.bestMeters.FLAP||0) >= 5000 },
  { id:'m3',   cat:'mode', icon:'✦', name:'سيد الانسياق',   desc:'DRIFT: 5000م',    cond: s => (s.bestMeters.DRIFT||0) >= 5000 },
  { id:'m4',   cat:'mode', icon:'♟', name:'سيد المشي',      desc:'WALK: 5000م',     cond: s => (s.bestMeters.WALK||0) >= 5000 },
  { id:'sh1',  cat:'shift', icon:'◆', name:'المتحوّل الأول',  desc:'أكمل 5 SHIFT Runs',  cond: s => (s.stats.shiftRuns||0) >= 5 },
  { id:'sh2',  cat:'shift', icon:'🔮', name:'المتحوّل الخبير', desc:'أكمل 25 SHIFT Runs', cond: s => (s.stats.shiftRuns||0) >= 25 },
  { id:'sh3',  cat:'shift', icon:'🌀', name:'سيّد التحولات',  desc:'أكمل 100 SHIFT Run', cond: s => (s.stats.shiftRuns||0) >= 100 },
  { id:'c1',   cat:'collection', icon:'🎨', name:'جامع',       desc:'امتلك 5 أزياء',    cond: s => (s.ownedSkins||[]).length >= 5 },
  { id:'c2',   cat:'collection', icon:'💎', name:'خبير الأزياء',desc:'امتلك 10 أزياء',   cond: s => (s.ownedSkins||[]).length >= 10 },
  { id:'x1',   cat:'secret', icon:'❓', name:'???', desc:'سرّي جداً', cond: s => (s.season.points||0) >= 10000 },
  { id:'x2',   cat:'secret', icon:'❓', name:'???', desc:'سرّي جداً', cond: s => s.coins >= 100000 }
];

function checkBadges(){
  const unlocked = [];
  for(const b of BADGES){
    if(Save.data.achievements[b.id]) continue;
    try {
      if(b.cond(Save.data)) {
        Save.data.achievements[b.id] = true;
        unlocked.push(b);
      }
    } catch(e) {}
  }
  if(unlocked.length){
    Save.save();
    unlocked.forEach(b => {
      addFloat(P.x, P.y - 60, b.icon + ' ' + b.name, '#FFD060', 16);
    });
  }
  return unlocked;
}

function buildPlayerCard(){
  const user = Cloud.user;
  const profile = Cloud.profile;
  const title = getPlayerTitle(Save.data);

  const nameEl = document.getElementById('pcard-name');
  const lvlEl = document.getElementById('pcard-level');
  const titleEl = document.getElementById('pcard-title');
  const statsEl = document.getElementById('pcard-stats');
  const badgesEl = document.getElementById('pcard-badges');

  if(nameEl) nameEl.textContent = (profile?.username) || (user?.displayName) || 'لاعب';
  if(lvlEl) lvlEl.textContent = getGlobalLevel() + 1;
  if(titleEl){
    titleEl.textContent = title.icon + ' ' + title.name;
    titleEl.style.color = title.color;
  }

  if(statsEl){
    const s = Save.data.stats;
    statsEl.innerHTML = `
      <div class="pstat"><div class="k">أفضل مسافة</div><div class="v">${Math.floor(s.bestMeters||0)}<span>م</span></div></div>
      <div class="pstat"><div class="k">إجمالي الجولات</div><div class="v">${s.totalPlays||0}</div></div>
      <div class="pstat"><div class="k">أفضل سلسلة</div><div class="v">x${s.bestCombo||0}</div></div>
      <div class="pstat"><div class="k">مجموع الأمتار</div><div class="v">${Math.floor(s.totalMeters||0)}<span>م</span></div></div>
      <div class="pstat"><div class="k">نقاط الموسم</div><div class="v">${Save.data.season.points||0}</div></div>
      <div class="pstat"><div class="k">SHIFT Runs</div><div class="v">${s.shiftRuns||0}</div></div>
    `;
  }

  if(badgesEl){
    const unlocked = BADGES.filter(b => Save.data.achievements[b.id]);
    if(unlocked.length === 0){
      badgesEl.innerHTML = '<div style="text-align:center;padding:20px;color:var(--ink-mute);font-size:12px;">لم تفتح شارات بعد</div>';
    } else {
      badgesEl.innerHTML = unlocked.map(b => `
        <div class="badge-chip" style="--bc:${b.cat === 'secret' ? '#C080FF' : '#E8B34E'};">
          <span class="bc-ic">${b.icon}</span>
          <span class="bc-nm">${b.name}</span>
        </div>
      `).join('');
    }
  }
}

/* ============================================================
   ==================== EVENTS ===============================
   ============================================================ */
const EVENTS = [
  {
    id:'volcanoWeek', name:'أسبوع البركان', en:'VOLCANO WEEK',
    icon:'🌋', color:'#E85838',
    start:'2024-01-01', end:'2099-12-31',
    missions:[
      { id:'ev_v1', icon:'🌋', title:'العب 10 جولات', target:10, key:'plays', reward:200 },
      { id:'ev_v2', icon:'📏', title:'اقطع 3000م',   target:3000, key:'meters', reward:300 }
    ]
  },
  {
    id:'skyWeek', name:'أسبوع السماء', en:'SKY WEEK',
    icon:'☁️', color:'#88C8E8',
    start:'2024-01-01', end:'2099-12-31',
    missions:[
      { id:'ev_s1', icon:'☁️', title:'العب 10 جولات', target:10, key:'plays', reward:200 },
      { id:'ev_s2', icon:'🏔️', title:'صل لارتفاع 200م', target:200, key:'meters', reward:300 }
    ]
  },
  {
    id:'gravityWeek', name:'أسبوع الجاذبية', en:'GRAVITY WEEK',
    icon:'⇅', color:'#4A7FA0',
    start:'2024-01-01', end:'2099-12-31',
    missions:[
      { id:'ev_g1', icon:'⇅', title:'العب FLIP 5 مرات', target:5, key:'plays', reward:250 }
    ]
  },
  {
    id:'neonWeek', name:'أسبوع النيون', en:'NEON WEEK',
    icon:'🌈', color:'#FF00D8',
    start:'2024-01-01', end:'2099-12-31',
    missions:[
      { id:'ev_n1', icon:'🌈', title:'اجمع 500 عملة', target:500, key:'coins', reward:400 }
    ]
  }
];

function getActiveEvents(){
  const now = today();
  return EVENTS.filter(e => now >= e.start && now <= e.end);
}

function buildEvents(){
  const list = document.getElementById('events-list');
  if(!list) return;
  const events = getActiveEvents();
  list.innerHTML = '';
  events.forEach(ev => {
    const el = document.createElement('div');
    el.className = 'event-card';
    el.style.setProperty('--ec', ev.color);
    el.innerHTML = `
      <div class="ev-head">
        <div class="ev-icon">${ev.icon}</div>
        <div class="ev-info">
          <div class="ev-name">${ev.name}</div>
          <div class="ev-sub">${ev.en}</div>
        </div>
      </div>
      <div class="ev-missions">
        ${ev.missions.map(m => {
          const prog = Save.data.missions.progressDaily?.[m.key] || 0;
          const pct = Math.min(100, (prog / m.target) * 100);
          return `<div class="ev-mission">
            <span class="evm-ic">${m.icon}</span>
            <div class="evm-body">
              <div class="evm-name">${m.title}</div>
              <div class="evm-prog"><div style="width:${pct}%"></div></div>
            </div>
            <div class="evm-reward">◆${m.reward}</div>
          </div>`;
        }).join('')}
      </div>
    `;
    list.appendChild(el);
  });
  if(events.length === 0){
    list.innerHTML = '<div style="text-align:center;padding:30px;color:var(--ink-mute);font-size:13px;">لا توجد أحداث نشطة حالياً</div>';
  }
}

function buildSettings(){
  const list = document.getElementById('settings-list');
  if(!list) return;
  list.innerHTML = '';
  const items = [
    { k:'sound', title:'الأصوات', sub:'SOUND EFFECTS' },
    { k:'haptics', title:'الاهتزاز', sub:'HAPTICS' }
  ];
  items.forEach(it=>{
    const row = document.createElement('div');
    row.className = 'list-item';
    row.style.padding = '14px 16px';
    const on = Save.data.settings[it.k];
    row.innerHTML = `
      <div class="li-body">
        <div class="li-name">${it.title}</div>
        <div class="li-desc">${it.sub}</div>
      </div>
      <div class="toggle" data-k="${it.k}" style="width:48px;height:28px;border-radius:14px;background:${on?'var(--amber)':'var(--paper-3)'};position:relative;cursor:pointer;transition:background .25s;flex-shrink:0;"></div>`;
    const toggle = row.querySelector('.toggle');
    toggle.innerHTML = `<div style="position:absolute;top:3px;right:${on?'3px':'23px'};width:22px;height:22px;border-radius:50%;background:#fff;transition:right .25s;box-shadow:0 2px 6px rgba(0,0,0,.15);"></div>`;
    toggle.addEventListener('click', ()=>{
      Save.data.settings[it.k] = !Save.data.settings[it.k];
      Save.save();
      Sfx.tap(); haptic(8);
      buildSettings();
    });
    list.appendChild(row);
  });
}

/* ============================================================
   ==================== Home build ===========================
   ============================================================ */
function buildHome(){
  /* Show equipped title in hero */
const heroModeEl = document.getElementById('hero-mode-name');
if(heroModeEl){
  const t = TITLES_V2.find(x => x.id === (Save.data.titles?.equipped || 'rookie'));
  if(t){
    const modeName = heroModeEl.textContent.split(' · ')[0];
    heroModeEl.textContent = modeName + ' · ' + t.icon + ' ' + t.name;
  }
}
  const selectedMode = Save.data.mode || 'FLIP';
  const grid = document.getElementById('mode-grid');
  if(!grid) return;
  grid.innerHTML = '';

  MODES.forEach(m=>{
    const el = document.createElement('button');
    el.className = 'mode-card' + (m.id === selectedMode ? ' sel' : '');
    el.style.setProperty('--mc', m.color);
    const best = Save.data.bestMeters[m.id] || 0;
    const lvl = getModeLevel(m.id) + 1;
    el.innerHTML = `
      <div class="mc-head">
        <div class="mc-ic">${m.icon}</div>
        <div>
          <div class="mc-t">${m.ar}</div>
          <div class="mc-e">${m.en}</div>
        </div>
      </div>
      <div class="mc-best">
        <span>${best}م</span>
        <span class="mc-lvl">L${lvl}</span>
      </div>`;
    el.addEventListener('click', ()=>{
      Save.data.mode = m.id;
      Save.save();
      Sfx.tap(); haptic(6);
      buildHome();
    });
    grid.appendChild(el);
  });

  const heroScore = document.getElementById('hero-score');
  const heroModeName = document.getElementById('hero-mode-name');
  const heroModeLvl = document.getElementById('hero-mode-lvl');
  if(heroScore) heroScore.textContent = Save.data.bestMeters[selectedMode] || 0;
  const m = MODES.find(x=>x.id===selectedMode);
  if(heroModeName) heroModeName.textContent = m ? m.ar : '';
  if(heroModeLvl) heroModeLvl.textContent = 'LVL ' + (getModeLevel(selectedMode) + 1);

  const skin = currentSkin();
  const heroEl = document.getElementById('hero-avatar');
  if(heroEl){
    heroEl.style.background = `radial-gradient(circle at 30% 30%, ${mixColor(skin.body,'#FFFFFF',0.3)}, ${skin.body} 55%, ${skin.bodyDark})`;
    heroEl.style.boxShadow = `inset 0 -10px 0 rgba(0,0,0,.06), 0 0 40px ${skin.accent}55`;
  }

  updateCoinsUI();
  updateAchBadge();
  updateGlobalLevelUI();

  ensureMissions();
  const dailyBadge = document.getElementById('daily-badge');
  if(dailyBadge){
    if(canClaimDaily()) dailyBadge.style.display = 'flex';
    else dailyBadge.style.display = 'none';
  }

  const qBadge = document.getElementById('quest-badge');
  if(qBadge){
    const hasMissionProgress = ['daily','weekly','monthly'].some(tier =>
      (Save.data.missions[tier] || []).some(id => {
        const d = getMissionData(tier, id);
        return d && !d.done;
      })
    );
    qBadge.style.display = hasMissionProgress ? 'flex' : 'none';
  }
}

/* ============================================================
   ==================== SKY ZONE =============================
   ============================================================ */
function spawnSkyZoneRewards(){
  const count = Math.floor(WR(4, 8));
  const startX = W + 60;
  const arcHeight = WR(30, 55);
  const baseY = GROUND_Y - WR(120, 170);

  /* ═══ قوس العملات ═══ */
  for(let i = 0; i < count; i++){
    const t = i / (count - 1);
    const x = startX + i * 45;
    const y = baseY - Math.sin(t * Math.PI) * arcHeight;
    coins.push({
      x, y, r: 10, t: 0, dead: false,
      isSkyCoin: true,
      skyValue: 5
    });
  }

  /* ═══ نقطة نهاية القوس ═══ */
  const endX = startX + count * 45 + 40;
  const endY = baseY - arcHeight - 15;

  /* ═══ مكافأة في النهاية ═══ */
  if(Math.random() < 0.35){
    /* ✅ تعزيز */
    const zonePU = makePowerup(endX, endY, { r: 16, isSkyReward: true });
    if(zonePU) powerups.push(zonePU);
  } else {
    /* ✅ كرة طاقة */
    orbs.push({
      x: endX,
      y: endY,
      r: 16, t: 0, dead: false,
      color: '#FFD700',
      isSkyOrb: true,
      value: 10
    });
  }
}

let lastSkySpawn = 0;
function checkSkyZoneSpawn(){
  const m = getMeters();
  if(G.mode === 'WALK' && m > 150 && m - lastSkySpawn > 250){
    lastSkySpawn = m;
    spawnSkyZoneRewards();
  }
}

/* ═══════════════════════════════════════════════════════
   SKY REALM SPAWNERS — FIXED (نسبية إلى اللاعب)
   ═══════════════════════════════════════════════════════ */

function spawnSkyRealmObstacle(){
  const layer = SKY_REALM.layers[G.skyLayerIdx];
  const roll = Math.random();

  if(roll < 0.35)      spawnSkyIsland(layer);
  else if(roll < 0.50) spawnSkyRuinColumn(layer);
  else if(roll < 0.62) spawnSkyElevator(layer);
  else if(roll < 0.72) spawnSkyElevatorChain(layer);
  else if(roll < 0.92) spawnStaircase(getProgression(), G.currentScene);
  else                 spawnSkyRing(layer);
}

/* مصعد سماوي — نسبي للاعب */
function spawnSkyElevator(layer){
  const w = 110;
  const h = 16;
  const maxRise = rand(280, 500);
  const startY = P.y - rand(70, 120);

  obstacles.push({
    x: W + 40, w, h, type:'platform',
    isWalk: true, isPlatform: true,
    isElevator: true,
    isSingleElevator: true,
    platformType: 'static',
    y: startY, baseY: startY, baseX: W + 40,
    riseSpeed: rand(1.4, 2.0),
    maxRise: maxRise,
    risen: 0,
    isCarryingPlayer: false,
    exhausted: false,
    warmupTimer: 0,
    color: '#B8E8F0', colorDark: '#5090A0', accent: '#E0FFFF',
    glow: '#80E8FF',
    isSkyPlatform: true,
    skyTier: 3,
    amp: 0, phase: 0,
    t: 0, passed: false, dead: false,
    solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
  });

  const topY = startY - maxRise - 30;
  const cx = W + 40 + w/2;

  const coinCount = Math.floor(maxRise / 60);
  for(let i = 1; i <= coinCount; i++){
    if(Math.random() < 0.7){
      coins.push({ x: cx + rand(-30, 30), y: startY - i * 60, r: 8, t: 0, dead: false });
    }
  }
  orbs.push({ x: cx, y: topY, r: 16, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 15 });

  if(Math.random() < 0.35){
    const skyPU = makePowerup(cx + 50, topY, { r: 16, isSkyReward: true });
    if(skyPU) powerups.push(skyPU);
  }
}

/* سلسلة مصاعد سماوية */
function spawnSkyElevatorChain(layer){
  const count = Math.floor(rand(3, 5));
  const startX = W + 60;
  const spacing = rand(180, 240);
  const baseRise = 200;

  let baseY = P.y - 80;

  for(let i = 0; i < count; i++){
    const w = 100 - i * 5;
    const h = 14;

    obstacles.push({
      x: startX + i * spacing, w, h,
      type:'platform',
      isWalk: true, isPlatform: true,
      isElevator: true,
      isChainElevator: true,
      chainIndex: i,
      platformType: 'static',
      y: baseY, baseY: baseY, baseX: startX + i * spacing,
      riseSpeed: 1.5 + i * 0.15,
      maxRise: baseRise + i * 60,
      risen: 0,
      isCarryingPlayer: false,
      exhausted: false,
      warmupTimer: 0,
      color: i === count-1 ? '#FFD060' : (i % 2 === 0 ? '#B8E8F0' : '#C0A0E8'),
      colorDark: i === count-1 ? '#A07028' : (i % 2 === 0 ? '#5090A0' : '#6040A8'),
      accent: i === count-1 ? '#FFF4C0' : '#E0FFFF',
      glow: i === count-1 ? '#FFE080' : '#80E8FF',
      isSkyPlatform: true,
      skyTier: 3 + i,
      amp: 0, phase: 0,
      t: 0, passed: false, dead: false,
      solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
    });

    baseY -= 60;
  }

  const endX = startX + (count - 1) * spacing + 200;
  const topY = baseY - baseRise - (count - 1) * 60 - 80;

  orbs.push({ x: endX, y: topY, r: 18, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 25 });
  orbs.push({ x: endX + 60, y: topY, r: 18, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 25 });

  const skyPU = makePowerup(endX + 120, topY, { r: 16, isSkyReward: true });
  if(skyPU) powerups.push(skyPU);
}

/* درج — نسبي للاعب دائماً */
function spawnStaircase(prog, s){
  const count = Math.floor(rand(4, 14));
  const isLong = count >= 9;
  const startX = W + 60;
  const startY = P.y - 40;   // ✅ نقطة البداية فوق اللاعب

  const speedScale = getSpeedScale();
  const stepX = (isLong ? rand(85, 115) : rand(75, 105)) * speedScale;
  const stepY = isLong ? rand(60, 85) : rand(55, 75);

  const colors = [
    { color:'#80C0E8', dark:'#4080B0', accent:'#C0E0FF', glow:'#80D0FF' },
    { color:'#80D0A8', dark:'#408068', accent:'#C0FFE0', glow:'#80FFD0' },
    { color:'#B080E8', dark:'#6040A8', accent:'#E0C0FF', glow:'#D080FF' },
    { color:'#E8B34E', dark:'#A07028', accent:'#FFF4C0', glow:'#FFD060' },
    { color:'#FF80C0', dark:'#A03060', accent:'#FFD0E8', glow:'#FFA0D8' }
  ];

  let currentX = startX;
  let currentY = startY;
  let lastWidth = 90;

  for(let i = 0; i < count; i++){
    const w = isLong ? rand(70, 90) - i * 1.2 : rand(75, 100) - i * 2;
    const h = 12;
    lastWidth = w;

    currentX += i === 0 ? 0 : stepX;
    currentY -= stepY;

    const colIdx = Math.min(Math.floor((i / count) * colors.length), colors.length - 1);
    const col = colors[colIdx];

    const isBouncy = isLong && i > 0 && i % 4 === 0;
    const isCrumble = isLong && i > 2 && !isBouncy && Math.random() < 0.15;

    obstacles.push({
      x: currentX, w, h, type: 'platform',
      isWalk: true, isPlatform: true,
      isStaircase: true,
      isStaircaseLong: isLong,
      stairIndex: i,
      stairTotal: count,
      platformType: isBouncy ? 'bouncy' : (isCrumble ? 'crumble' : 'static'),
      y: currentY, baseY: currentY, baseX: currentX,
      amp: 0, phase: rand(0, Math.PI*2),
      color: isBouncy ? '#E89B4C' : (isCrumble ? '#A88868' : col.color),
      colorDark: isBouncy ? '#A06028' : (isCrumble ? '#6A4838' : col.dark),
      accent: col.accent,
      glow: col.glow,
      isSkyPlatform: true,
      skyTier: Math.min(Math.floor((i / count) * 5) + 1, 5),
      t: 0, passed: false, dead: false,
      solid: isBouncy || isCrumble,
      crumbleTimer: 0, crumbled: false,
      bounceBoost: isBouncy ? -24 : 0
    });

    if(i < count - 1){
      const midX = currentX + stepX / 2;
      const midY = currentY - stepY / 2 - 15;
      spawnCoinCluster(midX, midY, i % 3 === 0 ? 4 : 3);
    }
    if(isLong && i > 0 && i % 4 === 2){
      spawnPowerup(currentX + w/2, currentY - 30);
    }
  }

  const topX = currentX + stepX + 20;
  const topY = currentY - 50;
  const topCenterX = topX + lastWidth / 2;

  if(isLong){
    orbs.push({ x: topX, y: topY, r: 18, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 20 });
    orbs.push({ x: topX + 55, y: topY, r: 16, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 15 });
    orbs.push({ x: topX - 55, y: topY, r: 16, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 15 });
    const stairPU = makePowerup(topCenterX, topY - 60, { r: 18, isSkyReward: true });
    if(stairPU) powerups.push(stairPU);
  } else {
    const roll = Math.random();
    if(roll < 0.4){
      const stairPU = makePowerup(topCenterX, topY, { r: 16, isSkyReward: true });
      if(stairPU) powerups.push(stairPU);
    } else if(roll < 0.8){
      orbs.push({ x: topX, y: topY, r: 16, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 12 });
    } else {
      spawnCoinCluster(topX, topY, 8);
    }
  }
}

/* جزيرة عائمة */
function spawnSkyIsland(layer){
  const w = rand(110, 180);
  const h = 16;
  const y = GROUND_Y - rand(300, 700);

  obstacles.push({
    x: W + 40, w, h, type:'platform',
    isWalk: true, isPlatform: true,
    isSkyPlatform: true,
    skyTier: G.skyLayerIdx + 1,
    platformType: 'static',
    y, baseY: y, baseX: W + 40,
    amp: 0, phase: 0,
    color: layer.wall, colorDark: layer.wallDark, accent: layer.accent,
    glow: layer.accent,
    t: 0, passed: false, dead: false,
    solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
  });

  /* كنوز على الجزيرة */
  const r = Math.random();
  if(r < 0.25) orbs.push({ x: W + 40 + w/2, y: y - 30, r: 16, t:0, dead:false, color:'#FFD700', isSkyOrb:true, value: 15 });
  else if(r < 0.60) spawnCoinCluster(W + 40 + w/2, y - 25, Math.floor(rand(4,7)));
}

/* عمود أطلال قديم */
function spawnSkyRuinColumn(layer){
  const w = rand(50, 80);
  const h = rand(180, 320);
  const y = GROUND_Y - rand(400, 700);
  const isWall = Math.random() < 0.5;

  if(isWall){
    /* جدار عالٍ يقفز اللاعب فوقه */
    obstacles.push({
      x: W + 40, w, h, type:'block',
      isWalk: true,
      y, baseY: y,
      t:0, passed:false, dead:false,
      color: layer.wall, colorDark: layer.wallDark, accent: layer.accent,
      isSkyRuins: true
    });
  } else {
    /* منصة عمودية للتنقل */
    obstacles.push({
      x: W + 40, w: 90, h: 14, type:'platform',
      isWalk: true, isPlatform: true,
      isSkyPlatform: true,
      skyTier: G.skyLayerIdx + 1,
      platformType: 'static',
      y, baseY: y, baseX: W + 40,
      amp: 0, phase: 0,
      color: layer.wall, colorDark: layer.wallDark, accent: layer.accent,
      glow: layer.accent,
      t:0, passed:false, dead:false,
      solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
    });
    spawnCoinCluster(W + 40 + 45, y - 30, 4);
  }
}

/* حلقة طاقة كونية */
function spawnSkyRing(layer){
  const r = 50;
  const y = GROUND_Y - rand(350, 600);

  obstacles.push({
    x: W + 40, w: r*2, h: r*2, type:'skyRing',
    isWalk: true,
    isSkyRing: true,
    isPlatform: false,
    y, baseY: y,
    cx: W + 40 + r, cy: y + r, r,
    angle: 0,
    t:0, passed:false, dead:false,
    color: layer.accent, colorDark: layer.wall, accent: layer.accent,
    glow: layer.accent
  });

  /* مكافأة داخل الحلقة */
  orbs.push({ x: W + 40 + r, y: y + r, r: 16, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 20 });
}

function spawnUnderRealmObstacle(){
  const layer = UNDER_REALM.layers[G.underLayerIdx];
  const roll = Math.random();
  
  /* ═══ 35% منصات تسلق (بدون خطر) ═══ */
  if(roll < 0.18){ spawnUnderClimbPlatform(layer); return; }
  if(roll < 0.26){ spawnUnderWideBridge(layer); return; }
  if(roll < 0.32){ spawnUnderVerticalColumn(layer); return; }
  if(roll < 0.38){ spawnUnderCrystalCluster(layer); return; }
  if(roll < 0.43){ spawnUnderBridgeChain(layer); return; }
  if(roll < 0.48){ spawnUnderLayerSpecial(layer); return; }
  
  /* ═══ 52% عقبات خطرة ═══ */
  if(roll < 0.56){ spawnUnderSpikeCluster(layer); return; }
  if(roll < 0.65){ spawnUnderSaw(layer); return; }
  if(roll < 0.73){ spawnUnderFallingRock(layer); return; }
  if(roll < 0.81){ spawnUnderLaser(layer); return; }
  if(roll < 0.89){ spawnUnderLavaPool(layer); return; }
  if(roll < 0.95){ spawnUnderDrillSpike(layer); return; }
  
  /* ═══ 5% أشباح ═══ */
  spawnUnderGhost(layer);
}

/* منصة تسلق قياسية */
function spawnUnderClimbPlatform(layer){
  const py = P.y;
  const aboveIdx = Math.max(-1, Math.floor((py - GROUND_Y) / UNDER_FLOOR_SPACING) - 1);
  const aboveY = getUnderFloorWorldY(aboveIdx);
  const belowY = getUnderFloorWorldY(aboveIdx + 1);
  
  const t = rand(0.35, 0.65);
  const platformY = lerp(aboveY, belowY, t);
  
  const w = rand(80, 140);
  const h = 14;
  
  obstacles.push({
    x: W + 40, w, h, type: 'platform',
    isWalk: true, isPlatform: true,
    isUnderPlatform: true,
    y: platformY, baseY: platformY, baseX: W + 40,
    amp: 0, phase: 0,
    color: '#7BC44C', colorDark: '#3A6E28', accent: '#E0FFA0',
    glow: '#A0FF80',
    t: 0, passed: false, dead: false,
    solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
  });
  
  const r = Math.random();
  if(r < 0.15) spawnPowerup(W + 40 + w/2, platformY - 35);
  else if(r < 0.55) spawnCoinCluster(W + 40 + w/2, platformY - 25, Math.floor(rand(3,5)));
  else if(r < 0.75) orbs.push({ x: W + 40 + w/2, y: platformY - 30, r: 12, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 10 });
}

/* جسر عريض */
function spawnUnderWideBridge(layer){
  const py = P.y;
  const aboveIdx = Math.max(-1, Math.floor((py - GROUND_Y) / UNDER_FLOOR_SPACING) - 1);
  const aboveY = getUnderFloorWorldY(aboveIdx);
  const belowY = getUnderFloorWorldY(aboveIdx + 1);
  
  const t = rand(0.4, 0.6);
  const bridgeY = lerp(aboveY, belowY, t);
  
  const w = rand(UNDER_BIG_PLATFORM_MIN, UNDER_BIG_PLATFORM_MAX);
  const h = 14;
  
  obstacles.push({
    x: W + 40, w, h, type: 'platform',
    isWalk: true, isPlatform: true,
    isUnderPlatform: true,
    y: bridgeY, baseY: bridgeY, baseX: W + 40,
    amp: 0, phase: 0,
    color: layer.wall || '#5E4028',
    colorDark: layer.wallDark || '#2A1810',
    accent: layer.accent || '#8E6A48',
    glow: layer.accent || '#8E6A48',
    t: 0, passed: false, dead: false,
    solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
  });
  
  /* مكافآت على الجسر */
  const coinCount = Math.floor(w / 60);
  spawnCoinCluster(W + 40 + w/2, bridgeY - 30, coinCount);
  
  if(Math.random() < 0.4){
    spawnPowerup(W + 40 + w/2 + 40, bridgeY - 50);
  }
  if(Math.random() < 0.5){
    orbs.push({ x: W + 40 + w/2 - 60, y: bridgeY - 30, r: 12, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 12 });
  }
}

/* عمود رأسي بمنصات متعددة */
function spawnUnderVerticalColumn(layer){
  const baseY = P.y + H * 0.3;
  const segments = 3 + Math.floor(Math.random() * 3);
  
  for(let i = 0; i < segments; i++){
    const w = rand(60, 90);
    const h = 12;
    const y = baseY - i * 90;
    const offsetX = i * rand(20, 45);
    
    obstacles.push({
      x: W + 40 + offsetX, w, h, type: 'platform',
      isWalk: true, isPlatform: true,
      isUnderPlatform: true,
      y, baseY: y, baseX: W + 40 + offsetX,
      amp: 0, phase: 0,
      color: '#7BC44C', colorDark: '#3A6E28', accent: '#E0FFA0',
      glow: '#A0FF80',
      t: 0, passed: false, dead: false,
      solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
    });
    
    /* عملات بين المنصات */
    if(i < segments - 1){
      spawnCoinCluster(W + 40 + offsetX + 45, y - 45, 2);
    }
  }
  
  /* مكافأة في الأعلى */
  const topY = baseY - (segments - 1) * 90 - 50;
  orbs.push({ x: W + 40 + 80, y: topY, r: 14, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 18 });
}

/* مجموعة بلورات */
function spawnUnderCrystalCluster(layer){
  const py = P.y;
  const count = 3 + Math.floor(Math.random() * 3);
  const baseY = py + rand(-100, 100);
  
  for(let i = 0; i < count; i++){
    const x = W + 40 + i * rand(70, 110);
    const y = baseY + rand(-40, 40);
    const r = rand(20, 34);
    
    obstacles.push({
      x: x - r, w: r*2, h: r*2, type:'crystal',
      isWalk: true, isCrystal: true,
      y: y - r, baseY: y - r,
      cx: x, cy: y, r: r,
      t: 0, passed: false, dead: false,
      color: layer.accent || '#FF8060',
      colorDark: layer.wall || '#5E4028',
      accent: layer.accent || '#FF8060',
      glow: layer.accent || '#FF8060'
    });
    
    /* مكافآت داخل البلورات */
    if(i === 0){
      orbs.push({ x, y, r: 14, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 15 });
    }
  }
}

/* سلسلة جسور متعددة */
function spawnUnderBridgeChain(layer){
  const count = 3 + Math.floor(Math.random() * 3);
  const baseY = P.y + H * 0.2;
  
  for(let i = 0; i < count; i++){
    const w = rand(120, 200);
    const h = 12;
    const y = baseY + i * rand(60, 100) * (Math.random() < 0.5 ? -1 : 1);
    const x = W + 40 + i * rand(180, 240);
    
    obstacles.push({
      x, w, h, type: 'platform',
      isWalk: true, isPlatform: true,
      isUnderPlatform: true,
      y, baseY: y, baseX: x,
      amp: 0, phase: 0,
      color: '#7BC44C', colorDark: '#3A6E28', accent: '#E0FFA0',
      glow: '#A0FF80',
      t: 0, passed: false, dead: false,
      solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
    });
    
    /* مكافآت على الجسر */
    spawnCoinCluster(x + w/2, y - 25, 3);
  }
  
  /* مكافأة في نهاية السلسلة */
  const lastX = W + 40 + (count - 1) * 200;
  const lastY = baseY;
  spawnPowerup(lastX + 200, lastY - 30);
}

/* عنصر خاص بالطبقة */
function spawnUnderLayerSpecial(layer){
  const layerId = layer.id;
  
  if(layerId === 'magma' || layerId === 'core'){
    /* بركان صغير - منصة مع فتحة حمم */
    const w = rand(150, 220);
    const h = 14;
    const y = P.y + rand(-80, 80);
    
    obstacles.push({
      x: W + 40, w, h, type: 'platform',
      isWalk: true, isPlatform: true,
      isUnderPlatform: true,
      y, baseY: y, baseX: W + 40,
      amp: 0, phase: 0,
      color: '#8E2018', colorDark: '#3A0808', accent: '#FF5020',
      glow: '#FF5020',
      t: 0, passed: false, dead: false,
      solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
    });
    
    /* عملات فوق الحمم */
    spawnCoinCluster(W + 40 + w/2, y - 40, 5);
    spawnPowerup(W + 40 + w/2, y - 70);
    
  } else if(layerId === 'abyss' || layerId === 'void'){
    /* بوابة فراغ - حلقة مضيئة */
    const r = 45;
    const y = P.y + rand(-60, 60);
    
    obstacles.push({
      x: W + 40, w: r*2, h: r*2, type:'skyRing',
      isWalk: true,
      isSkyRing: true,
      isPlatform: false,
      y, baseY: y,
      cx: W + 40 + r, cy: y + r, r,
      angle: 0,
      t: 0, passed: false, dead: false,
      color: layer.accent || '#A080FF',
      colorDark: layer.wall || '#1A0838',
      accent: layer.accent || '#A080FF',
      glow: layer.accent || '#A080FF'
    });
    
    orbs.push({ x: W + 40 + r, y: y + r, r: 16, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 20 });
    
  } else {
    /* كهوف: عمود صخري + منصة جانبية */
    const w = rand(60, 100);
    const h = 180;
    const y = P.y + rand(-100, 100);
    
    obstacles.push({
      x: W + 40, w, h, type: 'block',
      isWalk: true,
      y, baseY: y,
      t: 0, passed: false, dead: false,
      color: layer.wall || '#5E4028',
      colorDark: layer.wallDark || '#2A1810',
      accent: layer.accent || '#8E6A48',
      isUnderPillar: true
    });
    
    /* منصة على الجانب */
    obstacles.push({
      x: W + 40 + w + 20, w: 80, h: 12, type: 'platform',
      isWalk: true, isPlatform: true,
      isUnderPlatform: true,
      y: y + 40, baseY: y + 40, baseX: W + 40 + w + 20,
      amp: 0, phase: 0,
      color: '#7BC44C', colorDark: '#3A6E28', accent: '#E0FFA0',
      glow: '#A0FF80',
      t: 0, passed: false, dead: false,
      solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
    });
    
    spawnCoinCluster(W + 40 + w + 60, y + 10, 3);
  }
}

/* ═══════════════ UNDERGROUND OBSTACLES ═══════════════ */

/* أشواك على سطح الطابق */
function spawnUnderSpikeCluster(layer){
  const py = P.y;
  const aboveIdx = Math.max(-1, Math.floor((py - GROUND_Y) / UNDER_FLOOR_SPACING) - 1);
  const aboveY = getUnderFloorWorldY(aboveIdx);
  
  const count = 2 + Math.floor(Math.random() * 4);
  const spacing = 42;
  const startX = W + 60;
  
  for(let i = 0; i < count; i++){
    obstacles.push({
      x: startX + i * spacing, w: 32, h: 44,
      type: 'underSpike',
      isWalk: true, isUnderSpike: true, isUnderObstacle: true,
      y: aboveY - 44,
      baseY: aboveY - 44,
      t: 0, passed: false, dead: false,
      color: layer.wall, colorDark: layer.wallDark, accent: layer.accent
    });
  }
  
  /* مكافأة فوق الأشواك */
  if(Math.random() < 0.5){
    spawnCoinCluster(startX + (count-1)*spacing/2, aboveY - 90, 4);
  }
}

/* منشار على سطح الطابق */
function spawnUnderSaw(layer){
  const py = P.y;
  const aboveIdx = Math.max(-1, Math.floor((py - GROUND_Y) / UNDER_FLOOR_SPACING) - 1);
  const aboveY = getUnderFloorWorldY(aboveIdx);
  
  const r = rand(32, 46);
  const isMoving = Math.random() < 0.6;
  
  obstacles.push({
    x: W + 40, w: r*2, h: r*2, type:'saw',
    t:0, passed:false, dead:false,
    isWalk:true, isSaw:true, isUnderObstacle: true,
    y: aboveY - r*2,
    baseY: aboveY - r*2,
    cx: W + 40 + r,
    cy: aboveY - r,
    r: r,
    angle: 0,
    angleSpd: rand(0.15, 0.30) * (Math.random() < 0.5 ? 1 : -1),
    movingY: isMoving,
    amp: isMoving ? rand(60, 120) : 0,
    phase: rand(0, Math.PI*2),
    color:'#B0B8C0', colorDark:'#606870', accent:'#FF6040'
  });
  
  if(Math.random() < 0.4) spawnCoinCluster(W + 40 + r, aboveY - r*2 - 60, 3);
}

/* صخرة متساقطة من السقف */
function spawnUnderFallingRock(layer){
  const py = P.y;
  const aboveIdx = Math.max(-1, Math.floor((py - GROUND_Y) / UNDER_FLOOR_SPACING) - 1);
  const aboveY = getUnderFloorWorldY(aboveIdx);
  const ceilY = getUnderFloorWorldY(aboveIdx - 1);
  
  const count = 1 + Math.floor(Math.random() * 3);
  const spacing = 90;
  const startX = W + 60;
  
  for(let i = 0; i < count; i++){
    obstacles.push({
      x: startX + i * spacing, w: 34, h: 34, type:'fallRock',
      t:0, passed:false, dead:false,
      isWalk:true, isFallingRock:true, isUnderObstacle: true,
      y: ceilY + 20, baseY: ceilY + 20,
      targetY: aboveY - 34,
      falling: false,
      warned: false,
      landed: false,
      triggerDistance: rand(140, 220),
      color: layer.wall, colorDark: layer.wallDark, accent: layer.accent
    });
  }
  
  spawnCoinCluster(startX + (count-1)*spacing/2, aboveY - 100, 3);
}

/* سياج ليزر عمودي */
function spawnUnderLaser(layer){
  const py = P.y;
  const aboveIdx = Math.max(-1, Math.floor((py - GROUND_Y) / UNDER_FLOOR_SPACING) - 1);
  const aboveY = getUnderFloorWorldY(aboveIdx);
  const ceilY = getUnderFloorWorldY(aboveIdx - 1);
  
  const isVertical = Math.random() < 0.7;
  
  if(isVertical){
    const gapCount = Math.floor(rand(2, 4));
    const segments = [];
    let curY = ceilY + 40;
    const gapSize = rand(60, 90);
    
    for(let i = 0; i < gapCount; i++){
      const segH = rand(60, 100);
      segments.push({ y: curY, h: segH });
      curY += segH + gapSize;
      if(curY > aboveY - 60) break;
    }
    
    obstacles.push({
      x: W + 40, w: 12, type:'laser',
      t:0, passed:false, dead:false,
      isWalk:true, isLaser:true, isUnderObstacle: true,
      isVertical: true,
      segments,
      pulse: 0,
      color: layer.accent || '#40E8FF',
      accent: '#80FFFF',
      damage: true
    });
  } else {
    obstacles.push({
      x: W + 40, w: 14, type:'laser',
      t:0, passed:false, dead:false,
      isWalk:true, isLaser:true, isUnderObstacle: true,
      isVertical: false,
      y: aboveY - rand(80, 140),
      baseY: aboveY - rand(80, 140),
      amp: rand(20, 50),
      phase: rand(0, Math.PI*2),
      color: layer.accent || '#FF40A0',
      accent: '#FF80D0',
      damage: true
    });
  }
}

/* بركة حمم/حمض على الأرض */
function spawnUnderLavaPool(layer){
  const py = P.y;
  const aboveIdx = Math.max(-1, Math.floor((py - GROUND_Y) / UNDER_FLOOR_SPACING) - 1);
  const aboveY = getUnderFloorWorldY(aboveIdx);
  
  const layerId = layer.id;
  let poolColor = '#FF5020';
  let poolGlow = '#FFD060';
  
  if(layerId === 'caves'){ poolColor = '#40E8D0'; poolGlow = '#80FFE0'; }
  else if(layerId === 'abyss' || layerId === 'void'){ poolColor = '#A080FF'; poolGlow = '#D0B0FF'; }
  else if(layerId === 'magma' || layerId === 'core'){ poolColor = '#FF5020'; poolGlow = '#FFD060'; }
  
  const w = rand(130, 190);
  const h = 14;
  
  obstacles.push({
    x: W + 40, w, h, type:'lavaPool',
    t:0, passed:false, dead:false,
    isWalk:true, isLavaPool:true, isUnderObstacle: true,
    y: aboveY - h,
    baseY: aboveY - h,
    poolColor,
    poolGlow,
    color: poolColor,
    colorDark: layer.wall,
    accent: poolGlow
  });
  
  /* مكافأة فوق البركة (تشجيع على المخاطرة) */
  spawnCoinCluster(W + 40 + w/2, aboveY - 80, 4);
}

/* رمح يخرج من السقف/الأرض */
function spawnUnderDrillSpike(layer){
  const py = P.y;
  const aboveIdx = Math.max(-1, Math.floor((py - GROUND_Y) / UNDER_FLOOR_SPACING) - 1);
  const aboveY = getUnderFloorWorldY(aboveIdx);
  const isTop = Math.random() < 0.5;
  
  const w = rand(60, 90);
  const h = rand(40, 60);
  
  obstacles.push({
    x: W + 40, w, h, type:'drill',
    t:0, passed:false, dead:false,
    isWalk:true, isDrill:true, isUnderObstacle: true,
    isTop,
    cycle: rand(0, 90),
    period: rand(70, 130),
    extendDist: rand(70, 110),
    extend: 0,
    hasSpikes: true,
    floorY: aboveY,
    color:'#5A6878', colorDark:'#2A3038', accent: layer.accent || '#FFA040'
  });
  
  orbs.push({ x: W + 40 + w/2, y: aboveY - 90, r:12, t:0, dead:false, color:layer.accent, isSkyOrb:true });
}

/* شبح متحرك */
function spawnUnderGhost(layer){
  const py = P.y;
  const aboveIdx = Math.max(-1, Math.floor((py - GROUND_Y) / UNDER_FLOOR_SPACING) - 1);
  const aboveY = getUnderFloorWorldY(aboveIdx);
  const ceilY = getUnderFloorWorldY(aboveIdx - 1);
  
  const cy = (aboveY + ceilY) / 2;
  
  obstacles.push({
    x: W + 40, w: 40, h: 40, type:'ghost',
    t:0, passed:false, dead:false,
    isWalk:true, isGhost:true, isUnderObstacle: true,
    y: cy - 20,
    baseY: cy - 20,
    cx: W + 60, cy: cy,
    r: 22,
    angle: 0,
    amp: rand(40, 80),
    phase: rand(0, Math.PI*2),
    color: layer.accent || '#B8A4C9',
    colorDark: layer.wall,
    accent: layer.accent
  });
}

/* سلسلة صاعدة للخروج من الأعماق */
function spawnUnderAscent(layer){
  const startX = W + 60;
  let x = startX;
  let y = GROUND_Y + Math.min(700, -getPlayerAltitude() + 80);
  const speedScale = getSpeedScale();

  for(let i = 0; i < 6; i++){
    x += rand(95, 125) * speedScale;
    y -= rand(85, 115);

    obstacles.push({
      x, w: 95, h: 14, type: 'platform',
      isWalk: true, isPlatform: true,
      isUnderPlatform: true,
      y, baseY: y, baseX: x,
      amp: 0, phase: 0,
      color: '#7BC44C', colorDark: '#3A6E28', accent: '#E0FFA0',
      glow: '#A0FF80',
      t: 0, passed: false, dead: false,
      solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
    });

    coins.push({
      x: x + 45, y: y - 30,
      r: 8, t: 0, dead: false,
      isSkyCoin: true
    });
  }

  /* مكافأة في الأعلى */
  orbs.push({
    x: x + 60, y: y - 60, r: 16, t: 0, dead: false,
    color: '#FFD700', isSkyOrb: true, value: 25
  });

  Sfx.play(660, 0.3, 'sine', 0.04, 990);
}

/* منصة أرضية */
function spawnUnderPlatform(layer){
  const w = rand(90, 140);
  const h = 14;
  const y = GROUND_Y + rand(250, 650);

  obstacles.push({
    x: W + 40, w, h, type:'platform',
    isWalk: true, isPlatform: true,
    isUnderPlatform: true,
    y, baseY: y, baseX: W + 40,
    amp: 0, phase: 0,
    color: layer.wall, colorDark: layer.wallDark, accent: layer.accent,
    glow: layer.accent,
    t:0, passed:false, dead:false,
    solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0,
    /* ✨ منصة سفلية: تصطدم من الأسفل */
    isBidirectional: true
  });

  const r = Math.random();
  if(r < 0.25) orbs.push({ x: W + 40 + w/2, y: y + 30, r: 14, t:0, dead:false, color:'#FFD700', isSkyOrb:true, value: 12 });
  else spawnCoinCluster(W + 40 + w/2, y + 25, 4);
}

/* عمود صخري */
function spawnUnderPillar(layer){
  const w = rand(40, 70);
  const h = rand(160, 280);
  const y = GROUND_Y + rand(300, 550);

  obstacles.push({
    x: W + 40, w, h, type:'block',
    isWalk: true,
    y, baseY: y,
    t:0, passed:false, dead:false,
    color: layer.wall, colorDark: layer.wallDark, accent: layer.accent,
    isUnderPillar: true
  });
}

/* أشواك سفلية */
function spawnUnderSpike(layer){
  const count = Math.floor(rand(2, 5));
  const spacing = 70;
  const startX = W + 40;

  for(let i = 0; i < count; i++){
    obstacles.push({
      x: startX + i * spacing, w: 30, h: 40,
      type: 'underSpike',
      isWalk: true, isUnderSpike: true,
      y: GROUND_Y + rand(200, 400),
      t:0, passed:false, dead:false,
      color: layer.wall, colorDark: layer.wallDark, accent: layer.accent
    });
  }
}

/* سلسلة منصات تحتية */
function spawnUnderChain(layer){
  const count = Math.floor(rand(3, 6));
  const startX = W + 40;
  const spacing = rand(130, 180);
  let y = GROUND_Y + 250;

  for(let i = 0; i < count; i++){
    y += rand(40, 80);
    obstacles.push({
      x: startX + i * spacing, w: rand(70, 100), h: 12,
      type: 'platform',
      isWalk: true, isPlatform: true,
      isUnderPlatform: true,
      y, baseY: y, baseX: startX + i * spacing,
      amp: 0, phase: 0,
      color: layer.wall, colorDark: layer.wallDark, accent: layer.accent,
      glow: layer.accent,
      t:0, passed:false, dead:false,
      solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
    });

    if(i < count - 1){
      const midX = startX + i * spacing + spacing/2;
      const midY = y + 25;
      spawnCoinCluster(midX, midY, 3);
    }
  }
}

/* بلورة طاقة */
function spawnUnderCrystal(layer){
  const x = W + 40;
  const y = GROUND_Y + rand(250, 600);

  obstacles.push({
    x, w: 50, h: 60, type:'crystal',
    isWalk: true, isCrystal: true,
    y, baseY: y,
    t:0, passed:false, dead:false,
    color: layer.accent, colorDark: layer.wall, accent: layer.accent,
    glow: layer.accent
  });

  orbs.push({ x: x + 25, y: y + 30, r: 16, t: 0, dead: false, color: layer.accent, isSkyOrb: true, value: 18 });
}

/* ═══════════════════════════════════════════════════════
   ============ ASCEND SPAWNER (النظام الجديد) ============
   ═══════════════════════════════════════════════════════ */

/* الحالة الداخلية للمولّد */
let ascendState = {
  highestY: 0,          // أعلى منصة تم توليدها
  platformCount: 0,     // عدّاد المنصات (يُستخدم للأنماط)
  lastTier: 0,          // آخر نوع تم توليده (لتجنب التكرار)
  chainRemaining: 0,    // منصات متبقية في سلسلة التسلق
  chainY: 0
};

function updateAscendSpawner(){
  /* نولّد حتى 2.5 شاشة فوق اللاعب */
  const spawnCeiling = P.y - H * 2.5;

  while(ascendState.highestY > spawnCeiling){
    generateNextPlatform();
  }
}

function generateNextPlatform(){
  const alt = Math.max(0, Math.floor((GROUND_Y - ascendState.highestY) / PIXELS_PER_METER));
  const biome = getAscendBiome(alt);
  const biomeIdx = getAscendBiomeIndex(alt);

  /* ═══ سلسلة تسلق متتالية (كل 5-7 منصات) ═══ */
  if(ascendState.chainRemaining > 0){
    ascendState.chainRemaining--;
    /* منصات قريبة جداً - صعود سريع */
    const dy = rand(60, 95);
    ascendState.highestY -= dy;
    spawnAscendPlatform(ascendState.highestY, biome, 'chain', alt);
    return;
  }

  ascendState.platformCount++;

  /* ═══ جزيرة راحة كل 12 منصة ═══ */
  if(ascendState.platformCount % 12 === 0){
    const dy = rand(140, 190);
    ascendState.highestY -= dy;
    spawnAscendPlatform(ascendState.highestY, biome, 'rest', alt);
    return;
  }

  /* ═══ سلسلة تسلق كل 5-7 منصات ═══ */
  if(ascendState.platformCount % 6 === 0){
    ascendState.chainRemaining = Math.floor(rand(2, 4));
    ascendState.chainY = ascendState.highestY;
    const dy = rand(100, 140);
    ascendState.highestY -= dy;
    spawnAscendPlatform(ascendState.highestY, biome, 'chain-start', alt);
    return;
  }

  /* ═══ منصة عادية - تنويع كبير ═══ */
  const dy = rand(85, 165);
  ascendState.highestY -= dy;

  /* اختر نوعاً عشوائياً */
  const roll = Math.random();
  let type;
  if(roll < 0.55) type = 'normal';
  else if(roll < 0.68) type = 'movingH';
  else if(roll < 0.78) type = 'movingV';
  else if(roll < 0.86) type = 'bouncy';
  else if(roll < 0.93) type = 'crumble';
  else if(roll < 0.97) type = 'narrow';
  else type = 'phantom';

  spawnAscendPlatform(ascendState.highestY, biome, type, alt);
}

/* ═══ الدالة الرئيسية لتوليد المنصة ═══ */
function spawnAscendPlatform(worldY, biome, type, alt){
  const pal = biome.palette[Math.floor(Math.random() * biome.palette.length)];

  /* ═══ تحديد العرض حسب النوع ═══ */
  let w;
  if(type === 'rest') w = rand(180, 260);
  else if(type === 'narrow') w = rand(45, 65);
  else if(type === 'chain' || type === 'chain-start') w = rand(75, 95);
  else w = rand(85, 145);

  /* ═══ تحديد X (موزّع أفقيًا مع تفضيل الوصول من السابق) ═══ */
  const margin = 24;
  const x = rand(margin, W - w - margin);

  /* ═══ إنشاء الكائن ═══ */
  const plat = {
    x, y: worldY, w, h: 16,
    type: 'platform',
    isWalk: true, isPlatform: true,
    isAscendPlatform: true,
    ascendType: type,
    baseY: worldY, baseX: x,
    amp: 0, phase: rand(0, Math.PI * 2),
    color: pal.body,
    topColor: pal.top,
    colorDark: pal.edge,
    accent: biome.accent,
    t: 0, passed: false, dead: false,
    solid: false,
    crumbleTimer: 0, crumbled: false,
    bounceBoost: 0,
    phantomPhase: rand(0, Math.PI * 2),
    biomeId: biome.id
  };

  /* ═══ إعدادات النوع الخاص ═══ */
  switch(type){
    case 'movingH':
      plat.platformType = 'moving_x';
      plat.amp = rand(35, 65);
      plat.speed = rand(0.6, 0.9);
      break;
    case 'movingV':
      plat.platformType = 'moving_y';
      plat.amp = rand(20, 38);
      plat.speed = rand(0.5, 0.8);
      break;
    case 'bouncy':
      plat.platformType = 'bouncy';
      plat.bounceBoost = -26;
      plat.color = '#E89B4C';
      plat.topColor = '#FFE090';
      plat.colorDark = '#A06028';
      break;
    case 'crumble':
      plat.platformType = 'crumble';
      plat.color = '#A88868';
      plat.topColor = '#E8D0A8';
      plat.colorDark = '#6A4838';
      break;
    case 'phantom':
      plat.platformType = 'phantom';
      plat.phantomPeriod = rand(120, 180);
      break;
    default:
      plat.platformType = 'static';
  }

  /* ═══ سلسلة الأرجل المزخرفة (كل نوع له تفاصيل) ═══ */
  if(type === 'rest'){
    plat.isRest = true;
  }
  if(type === 'chain-start'){
    plat.isChainStart = true;
  }

  obstacles.push(plat);

  /* ═══ المكافآت (تعتمد على نوع المنصة) ═══ */
  const rewardRoll = Math.random();
  const cx = x + w / 2;
  const cy = worldY - 40;

  if(type === 'rest'){
    /* جزيرة راحة: مكافآت دائمة */
    spawnCoinCluster(cx - 40, cy, 4);
    spawnCoinCluster(cx + 40, cy, 4);
    if(Math.random() < 0.5){
      spawnPowerup(cx, cy - 20);
    } else {
      orbs.push({ x: cx, y: cy - 20, r: 14, t: 0, dead: false,
                  color: '#FFD700', isSkyOrb: true, value: 18 });
    }
    return;
  }

  if(rewardRoll < 0.10){
    spawnPowerup(cx, cy);
  } else if(rewardRoll < 0.28){
    orbs.push({ x: cx, y: cy, r: 12, t: 0, dead: false,
                color: '#FFD700', isSkyOrb: true, value: 8 });
  } else if(rewardRoll < 0.65){
    spawnCoinCluster(cx, cy - 5, Math.floor(rand(2, 5)));
  }

  /* ═══ بعض المنصات لها عمود بلوري تحتها (جمالي) ═══ */
  if(Math.random() < 0.25 && type !== 'narrow'){
    plat.hasPillar = true;
    plat.pillarH = rand(20, 60);
  }
}

/* ═══ إزالة المنصات البعيدة جدًا (تحت اللاعب) ═══ */
function cleanupAscendPlatforms(){
  const bottom = P.y + H * 1.5;
  for(let i = obstacles.length - 1; i >= 0; i--){
    const o = obstacles[i];
    if(!o.isAscendPlatform) continue;
    if(o.y > bottom){
      obstacles.splice(i, 1);
    }
  }
  /* cleanup للجسيمات البعيدة */
  if(coins.length > 200) coins.splice(0, coins.length - 200);
  if(orbs.length > 60) orbs.splice(0, orbs.length - 60);
  if(powerups.length > 30) powerups.splice(0, powerups.length - 30);
}

/* ============================================================
   ==================== Game flow ============================
   ============================================================ */
function resetRun(){
  // ✅ تعيين البذرة المشتركة في اللعب الجماعي
  if(typeof MP !== 'undefined' && MP.active && MP.roomSeed){
    setWorldSeed(MP.roomSeed);
  } else {
    setWorldSeed(Math.floor(Math.random() * 0xFFFFFFFF));
  }
  
  P.r = 13;

  /* ═══════════════ اختيار النمط أولاً ═══════════════ */
  G.selectedMode = Save.data.mode || 'FLIP';
  G.isMixedMode = (G.selectedMode === 'MIXED');

  if(G.isMixedMode){
    const allModes = ['FLIP','FLAP','DRIFT','WALK'];
    const startMode = allModes[Math.floor(Math.random() * allModes.length)];
    G.mode = startMode;
  } else {
    G.mode = G.selectedMode;
  }

  /* ═══════════════ تصفير الحالة العامة ═══════════════ */
  G.dist = 0; G.meters = 0;
  G.orbCount = 0; G.runCoins = 0;
  G.speed = PROGRESSION.speedStart;
  G.spawnCd = 260;
  G.sceneIdx = 0; G.sceneFrom = 0; G.sceneTo = 0; G.sceneT = 0;
  G.sceneActive = false;
  G.currentScene = SCENES[0];
  G.invuln = 90; G.shake = 0; G.flash = 0;
  G.hintTimer = 0; G.lastMilestone = 0;
  G.banner.timer = 0;
  G.lastLevel = 0;
  G.shield = false;
  G.ghost = 0;
  G.activePowerups = {};
  G.combo = 0; G.comboTimer = 0; G.comboMax = 0;
  G.infiniteJump = 0;
  G.extraJumps = 0;
  G.glideActive = false;
  G.rocketActive = false;
  G.megaJumpActive = 0;
  G.wallStickActive = false;
  G.rocketFrames = 0;
  G.rocketMaxAltitude = 0;
  G.maxAltitude = 0;
  G.camY = 0;
  G.camTargetY = 0;
  G.skyDecor = [];

    /* ═══ حالات التعزيزات الجديدة ═══ */
  G.destroyerActive = 0;
  G.laserActive = 0;
  G.bombActive = 0;
  G.shockwaveActive = 0;
  G.blackHoleActive = 0;
  G.freezeActive = 0;
  G.giantActive = 0;
  G.cloneActive = 0;
  G.autopilotActive = 0;
  G.hoverActive = 0;
  G.jetpackActive = 0;
  G.regenActive = 0;
  G.barrierActive = 0;
  G.eternityActive = 0;
  G.hasSecondChance = false;
  G.hasPhoenix = false;
  G.blackHoleX = 0;
  G.blackHoleY = 0;

  /* ═══════════════ تصفير حالة العوالم ═══════════════ */
  G.realm = REALM.GROUND;
  G.skyLayerIdx = 0;
  G.underLayerIdx = 0;
  G.skyLayersVisited = [];
  G.underLayersVisited = [];
  G.realmTransition = 0;
  G.realmFrom = REALM.GROUND;
  G.realmTo = REALM.GROUND;
  G.nextHoleMeters = 450;
  G.isDigging = false;
  G.underDepthPx = 0;
  G.camYUnder = 0;

_lastContextKey = '';
const cb = document.getElementById('context-banner');
if(cb) cb.classList.remove('show');
const gg = document.getElementById('altitude-gauge');
if(gg) gg.classList.remove('show');

  /* ═══════════════ تصفير حالة ASCEND ═══════════════ */
  G.ascendHighestY = 0;
  G.ascendLastJumpTap = 0;

  const ri = document.getElementById('realm-indicator');
  if(ri) ri.style.opacity = '0';

  initSkyDecor();
  lastSkySpawn = 0;

  /* ═══════════════ تصفير المصفوفات ═══════════════ */
  obstacles = []; orbs = []; coins = []; powerups = [];
  particles = []; floats = []; G.weather = [];
  sparkParticles = [];

  /* ═══════════════ تصفير اللاعب ═══════════════ */
  P.trail = [];
  P.vx = 0; P.vy = 0;
  P.gravityDir = 1; P.rot = 0; P.jumps = 0;
  P.enginePhase = 0; P.legPhase = 0; P.bouncePhase = 0;
  P.jumpHeld = false; P.jumpHoldTimer = 0;
  P.coyoteTimer = 0; P.jumpBufferTimer = 0;

  /* ═══════════════ تحديد موضع البداية حسب النمط ═══════════════ */
  if(G.mode === 'ASCEND'){
    P.x = W / 2;
    P.y = GROUND_Y - P.r;
    P.vx = 0; P.vy = 0;
    P.onGround = true;
    P.jumps = 0;
    P.coyoteTimer = 0;
    P.trail = [];
    G.speed = 0;         /* لا حركة عالمية في ASCEND */

    /* تصفير المولّد */
    ascendState.highestY = 0;
    ascendState.platformCount = 0;
    ascendState.chainRemaining = 0;
    ascendState.chainY = 0;

    /* cooldown القفز */
    G.ascendJumpCooldown = 0;

    G.camY = 0;
    G.camTargetY = 0;

    /* ═══ أرض البداية ═══ */
    obstacles.push({
      x: -80, y: GROUND_Y, w: W + 160, h: 400,
      type: 'platform', isWalk: true, isPlatform: true,
      isAscendPlatform: true, ascendType: 'ground',
      platformType: 'static',
      baseY: GROUND_Y, baseX: -80,
      amp: 0, phase: 0,
      color: '#5E3223', topColor: '#6B9B37', colorDark: '#3A1F14',
      accent: '#E86A2E',
      t: 0, passed: false, dead: false,
      solid: false, crumbleTimer: 0, crumbled: false, bounceBoost: 0
    });

    /* ═══ أول منصة فوق اللاعب ═══ */
    ascendState.highestY = GROUND_Y - 140;
    spawnAscendPlatform(ascendState.highestY, ASCEND_BIOMES[0], 'normal', 0);

    /* ═══ ملء الشاشة الأولى ═══ */
    updateAscendSpawner();
  } else if(G.mode === 'WALK'){
    P.y = GROUND_Y - P.r;
    P.onGround = true;
    P.x = P.baseX;

  } else if(G.mode === 'FLIP_WALK'){
    P.y = CEILING_H + P.r;
    P.onGround = true;
    P.vy = 0;
    P.x = P.baseX;

  } else if(G.mode === 'SKY_JUMP'){
    P.y = GROUND_Y - P.r;
    P.onGround = true;
    P.vy = -13.5;
    P.x = P.baseX;

  } else {
    /* FLIP / FLAP / DRIFT */
    P.y = H / 2;
    P.onGround = false;
    P.x = G.mode === 'DRIFT' ? W * 0.3 : P.baseX;
  }

  pointer.x = P.x;
  pointer.y = P.y;

  /* ═══════════════ تحديث HUD ═══════════════ */
  const hudM = document.getElementById('hud-meters');
  const hudC = document.getElementById('hud-coins');
  const comboPill = document.getElementById('combo-pill');
  if(hudM) hudM.textContent = '0';
  if(hudC) hudC.textContent = '0';
  if(comboPill) comboPill.style.display = 'none';

  updateLevelUI();
  updatePowerupsUI();
  initClouds();

  const tag = document.getElementById('scene-tag');
  if(tag){
    tag.textContent = SCENES[0].en;
    tag.classList.remove('show');
  }
  const altHud = document.getElementById('altitude-hud');
  if(altHud) altHud.style.opacity = '0';

/* ✅ إعادة ضبط التبديل العشوائي للمشاهد */
sceneRandomMode = false;
nextRandomSwitchMeters = 0;

  /* ═══════════════ تصفير بوابة Shift ═══════════════ */
  G.distSinceGate = 0;
  G.pendingShift = false;
  G.shiftGrace = 0;
  activeSynergies = [];

  /* ═══════════════ بانر الافتتاح ═══════════════ */
  if(G.isMixedMode){
    const startAr = MODES.find(m => m.id === G.mode)?.ar || G.mode;
    showBanner('MIXED RUN', '◆ ' + startAr);
  } else if(G.mode === 'ASCEND'){
    showBanner('ASCEND', '↑ اصعد نحو الفضاء');
  }
}

/* ============================================================
   ═══════════ SPAWN EFFECTS (دوال مساعدة مستقلة) ═══════════
   ضع هذه الدوال في مكان منفصل — قبل startGame
   ============================================================ */

function spawnSpawnEffect(){
  const item = currentSpawn();
  if(!item || item.id === 'none' || !hasItemImage(item)) return;

  const cfg = getCategoryConfig('spawn').render;
  particles.push({
    x: P.x, y: P.y,
    vx: 0, vy: 0,
    life: cfg.life || 1.4,
    decay: cfg.fade || 0.018,
    item,
    size: P.r * (cfg.sizeMul || 8.0),
    scaleOverLife: cfg.scaleOverLife || 2.5,
    color: '#FFFFFF'
  });
}

/* ═══ تأثير الإحياء — عند secondChance / phoenix ═══ */
function spawnReviveEffect(){
  const item = currentRevive();
  if(!item || item.id === 'none' || !hasItemImage(item)) return;

  const cfg = getCategoryConfig('revive').render;
  particles.push({
    x: P.x, y: P.y,
    vx: 0, vy: 0,
    life: cfg.life || 1.6,
    decay: cfg.fade || 0.014,
    item,
    size: P.r * (cfg.sizeMul || 8.0),
    scaleOverLife: cfg.scaleOverLife || 3.0,
    color: '#FFFFFF'
  });
}

/* ═══ تأثير الارتطام — عند صد الهجوم بالدرع ═══ */
function spawnHitEffect(x, y){
  const fx = currentHitEffect();
  if(!fx || fx.id === 'none') {
    burst(x, y, '#7BC4B0', 26, 7);
    return;
  }

  if(hasItemImage(fx)){
    particles.push({
      x, y,
      vx: 0, vy: 0,
      life: 0.6, decay: 0.03,
      item: fx,
      size: 60,
      scaleOverLife: 2,
      color: '#FFFFFF'
    });
    return;
  }

  /* fallback — شرارات */
  burst(x, y, '#7BC4B0', 26, 7);
}


/* ============================================================
   ═══════════════ START GAME — النسخة النظيفة ═══════════════
   ============================================================ */
function startGame(){
  /* ═══ 1) تهيئة الصوت ═══ */
  Sfx.init();

  /* ═══ 2) تصفير الجولة بالكامل ═══ */
  resetRun();

  /* ═══ 3) تحميل أصول اللاعب في الخلفية (لا يوقف اللعب) ═══ */
  try {
    if(typeof ASSET !== 'undefined' && ASSET.preloadPlayerAssets){
      ASSET.preloadPlayerAssets().catch(() => {});
    }
  } catch(e){ /* صامت */ }

  /* ═══ 4) تغيير الحالة إلى اللعب ═══ */
  G.state = 'PLAYING';
  setInGame(true);
  hideOverlay();

  /* ═══ 5) ✨ تأثير البداية (صورة أو انفجار) ═══ */
  spawnSpawnEffect();

  /* ═══ 6) بانر GO ═══ */
  showBanner('GO', '');
  G.banner.timer = 55;

  /* ═══ 7) نص التلميح حسب النمط ═══ */
  let txt = '';
  if(G.isMixedMode){
    txt = 'النمط المتنوّع — كل ١٢٠م يتغير النمط!';
  } else if(G.mode === 'FLIP'){
    txt = 'اضغط لقلب الجاذبية';
  } else if(G.mode === 'FLAP'){
    txt = 'اضغط باستمرار للارتفاع';
  } else if(G.mode === 'DRIFT'){
    txt = 'اسحب إصبعك لتحريك السفينة';
  } else if(G.mode === 'WALK'){
    txt = 'اضغط للقفز — مزدوجة متاحة';
  } else if(G.mode === 'ASCEND'){
    txt = 'المس الشخصية = قفز فوق · المس جانبيها = قفز للجانب';
  } else if(G.mode === 'FLIP_WALK'){
    txt = 'أنت على السقف! اقفز للأسفل — لا تسقط في العمق!';
  } else if(G.mode === 'SKY_JUMP'){
    txt = 'قفز تلقائي — اضغط في الهواء لتطير أعلى!';
  }

  const hint = document.getElementById('hint');
  if(hint){
    hint.textContent = txt;
    hint.classList.add('show');
  }
  G.hintTimer = 220;

  /* ═══ 8) رفع تركيز الإيموجي/الواجهة (اختياري) ═══ */
  Sfx.tap();
  haptic(6);
}

function gameOver(){
  /* ═══ فرصة ثانية / عنقاء: إحياء ═══ */
  if(G.hasSecondChance){
    G.hasSecondChance = false;
    delete G.activePowerups.secondChance;
    G.state = 'PLAYING';
    G.invuln = 180;
    P.y = Math.min(P.y, GROUND_Y - P.r - 100);
    P.vy = -8;
    addFloat(P.x, P.y - 50, '♻ فرصة ثانية!', '#C080FF', 20);
    Sfx.reward(); shake(15); haptic(40);
    for(let i=0;i<30;i++){
      const a = (i/30)*Math.PI*2;
      particles.push({ x:P.x, y:P.y, vx:Math.cos(a)*rand(4,9), vy:Math.sin(a)*rand(4,9),
        life:1.3, decay:0.02, color:'#C080FF', size:rand(3,6) });
    }
    updatePowerupsUI();
    return;
  }

  if(G.hasPhoenix){
    G.hasPhoenix = false;
    delete G.activePowerups.phoenix;
    G.state = 'PLAYING';
    G.invuln = 240;
    P.y = Math.min(P.y, GROUND_Y - P.r - 150);
    P.vy = -12;
    addFloat(P.x, P.y - 60, '🔥 صعود العنقاء!', '#FF5020', 22);
    /* انفجار ناري يمحو كل العقبات */
    for(const o of obstacles){
      if(o.dead || o.isShiftGate) continue;
      o.dead = true;
    }
    for(let i=0;i<60;i++){
      const a = (i/60)*Math.PI*2;
      particles.push({ x:P.x, y:P.y, vx:Math.cos(a)*rand(8,15), vy:Math.sin(a)*rand(8,15),
        life:1.6, decay:0.016, color: i%2 ? '#FF5020' : '#FFD060', size:rand(4,8) });
    }
    Sfx.reward(); shake(25); haptic(50);
    updatePowerupsUI();
    return;
  }
  G.state = 'OVER';
  Sfx.over();
  spawnDeathEffect(P.x, P.y, currentSkin().body);
  shake(22); G.flash = 0.6;

  /* ✅ الإصلاح: خزّن النتيجة في النمط المختار (MIXED أو نمط فردي) */
  const mode = G.selectedMode;
  const meters = getMeters();
  const prev = Save.data.bestMeters[mode] || 0;
  const isNew = meters > prev;
  if(isNew) Save.data.bestMeters[mode] = meters;

  const totalEarned = G.runCoins;
  Save.data.coins += totalEarned;
  Save.data.stats.totalPlays++;
  Save.data.stats.totalMeters += meters;
  Save.data.stats.totalCoins += totalEarned;
  Save.data.stats.bestMeters = Math.max(Save.data.stats.bestMeters, meters);
  Save.data.mode = mode;

  Save.data.season.points += meters;

  ensureMissions();
  const updProg = (tier) => {
    const p = Save.data.missions['progress' + tier.charAt(0).toUpperCase() + tier.slice(1)];
    p.plays += 1;
    p.meters += meters;
    p.coins += totalEarned;
    p.orbs += G.orbCount;
  };
  updProg('daily'); updProg('weekly'); updProg('monthly');

  const gLvlBefore = getGlobalLevel();
  Save.save();
  const gLvlAfter = getGlobalLevel();

  const rewardChips = [];
  if(isNew) rewardChips.push('★ رقم جديد');
  rewardChips.push('◆ ' + totalEarned);
  rewardChips.push('+' + meters + ' نقطة موسم');
  if(G.comboMax >= 10) rewardChips.push('🔥 x' + G.comboMax);

  const newLevels = [];
  for(let i=gLvlBefore+1; i<=gLvlAfter; i++){
    if(!Save.data.claimedGlobalLevels.includes(i)){ newLevels.push(i); }
  }

  newLevels.forEach(lvl => {
    const rw = levelRewardFor(lvl);
    Save.data.coins += rw.coins;
    Save.data.claimedGlobalLevels.push(lvl);
    rewardChips.push('🎁 LVL ' + (lvl+1) + ': +' + rw.coins);
  });

  /* تتبع MIXED Runs */
  if(G.isMixedMode){
    Save.data.stats.shiftRuns = (Save.data.stats.shiftRuns || 0) + 1;
  }
  checkBadges();

  Save.save();
  checkAchievements();

  const overM = document.getElementById('over-meters');
  const overB = document.getElementById('over-best');
  const overC = document.getElementById('over-coins');
  const overL = document.getElementById('over-level');
  const overR = document.getElementById('over-record');
  const overE = document.getElementById('over-eyebrow');
  if(overM) overM.textContent = meters;
  if(overB) overB.textContent = Save.data.bestMeters[mode] + 'م';
  if(overC) overC.textContent = totalEarned;
  if(overL) overL.textContent = (getModeLevel(mode) + 1);
  if(overR) overR.classList.toggle('hidden', !isNew);
  if(overE) overE.textContent = isNew ? 'NEW RECORD' : 'RUN COMPLETE';

  const rwDiv = document.getElementById('over-rewards');
  if(rwDiv) rwDiv.innerHTML = rewardChips.map(c=>`<div class="over-reward-chip">${c}</div>`).join('');

  updateCoinsUI();
  updateGlobalLevelUI();
  setInGame(false);
  setTimeout(()=>showScreen('s-over'), 420);

  if(newLevels.length > 0){
    setTimeout(()=>{
      const last = newLevels[newLevels.length-1];
      const totalCoins = newLevels.reduce((s,l)=>s+levelRewardFor(l).coins, 0);
      showRewardModal('⬆️', 'GLOBAL LEVEL', 'LVL ' + (last+1), '+' + totalCoins + ' عملة', null);
    }, 900);
  }
}

function checkAchievements(){
  const unlocked = [];
  for(const a of ACHIEVEMENTS){
    if(Save.data.achievements[a.id]) continue;
    if(a.value(Save.data) >= a.target){
      Save.data.achievements[a.id] = true;
      unlocked.push(a);
    }
  }
  if(unlocked.length){ Save.save(); updateAchBadge(); }
  return unlocked;
}

function pauseGame(){
  if(G.state !== 'PLAYING') return;
  G.state = 'PAUSED';
  showScreen('s-pause');
}
function resumeGame(){
  if(G.state !== 'PAUSED') return;
  G.state = 'PLAYING';
  hideOverlay();
  lastTime = performance.now();
  acc = 0;
}
function quitToMenu(){
  G.state = 'MENU';
  obstacles = []; orbs = []; coins = []; powerups = [];
  particles = []; floats = []; G.weather = [];
  sparkParticles = [];
  P.x = W*0.5; P.y = H*0.5; P.trail = [];
  G.shield = false; G.ghost = 0;
  G.activePowerups = {};
  G.combo = 0; G.comboTimer = 0;
  const comboPill = document.getElementById('combo-pill');
  if(comboPill) comboPill.style.display = 'none';
  _lastContextKey = '';
  const cb = document.getElementById('context-banner');
  if(cb) cb.classList.remove('show');
  const gg = document.getElementById('altitude-gauge');
  if(gg) gg.classList.remove('show');
  setInGame(false);
  hideOverlay();
  showScreen('s-home');
  buildHome();
  updateCoinsUI();
  updateGlobalLevelUI();
  sceneRandomMode = false;
  nextRandomSwitchMeters = 0;

  /* 👇👇👇 أضف هذين السطرين هنا 👇👇👇 */
  const emojiBar = document.getElementById('mp-emoji-bar');
  if(emojiBar) emojiBar.style.display = 'none';
}

/* ============================================================
   ==================== CLOUD (Firebase) =====================
   ============================================================ */
const Cloud = {
  enabled: false,
  ready: false,
  app: null,
  auth: null,
  db: null,
  user: null,
  profile: null,
  syncTimer: null,
  syncState: 'idle',
  lastSync: 0,

init() {
  if (typeof firebase === 'undefined') {
    console.warn('[Cloud] Firebase SDK not loaded — offline mode');
    this.enabled = false;
    return false;
  }
  if (!FIREBASE_CONFIG || !FIREBASE_CONFIG.apiKey || String(FIREBASE_CONFIG.apiKey).startsWith('YOUR_')) {
    console.warn('[Cloud] Firebase config not set — offline mode');
    this.enabled = false;
    return false;
  }
  try {
    if (!firebase.apps || firebase.apps.length === 0) {
      this.app = firebase.initializeApp(FIREBASE_CONFIG);
    } else {
      this.app = firebase.app();
    }
    this.auth = firebase.auth();
    this.db = firebase.firestore();

    /* ✅ جلسة منفصلة لكل تبويب — يسمح باختبار multiplayer على نفس الجهاز */
    const forceSession = localStorage.getItem('force_session_persistence') === '1';
    if (forceSession) {
      this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => console.log('[Cloud] Using SESSION persistence'))
        .catch(e => console.warn('[Cloud] SESSION persistence failed:', e));
    } else {
      /* ✅ IMPORTANT: لا نستخدم synchronizeTabs لأنه يكسر بعض الحالات */
      this.db.enablePersistence({ synchronizeTabs: false })
        .then(() => console.log('[Cloud] Firestore persistence enabled'))
        .catch(err => {
          if (err.code === 'failed-precondition') {
            console.warn('[Cloud] Multiple tabs detected — persistence disabled');
          } else if (err.code === 'unimplemented') {
            console.warn('[Cloud] Browser does not support persistence');
          }
        });
    }

    this.enabled = true;
    this.ready = true;
    console.log('[Cloud] Firebase initialized');
    return true;
  } catch (e) {
    console.error('[Cloud] Init error:', e);
    this.enabled = false;
    return false;
  }
},

  setState(state) {
    this.syncState = state;
    try { updateSyncUI(); } catch(e){}
  },

  async signInGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this._signIn(provider);
  },

async _signIn(provider) {
  const ua = navigator.userAgent || '';
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isMobile = isIOS || isAndroid;
  const isInAppBrowser = /FBAN|FBAV|FB_IAB|Instagram|Twitter|Line\/|WhatsApp|MicroMessenger|Snapchat|Pinterest|Snapchat/i.test(ua);

  /* ═══════════════ 1) متصفح داخل تطبيق ═══════════════ */
  if (isInAppBrowser) {
    return {
      ok: false,
      code: 'in-app-browser',
      error: 'افتح اللعبة في Chrome أو Safari — ليس داخل تطبيق آخر (فيسبوك، إنستغرام...)'
    };
  }

  /* ═══════════════ 2) فحص توفر التخزين ═══════════════ */
  const hasStorage = this._checkStorage();
  if (!hasStorage) {
    return {
      ok: false,
      code: 'no-storage',
      error: 'المتصفح يمنع التخزين — فعّل الكوكيز أو أغلق "التصفح المتخفي"'
    };
  }

  /* ═══════════════ 3) جرّب popup أولاً على كل الأجهزة ═══════════════ */
  /* ملاحظة: Chrome Android و Safari iOS الحديث يدعمان popup */
  try {
    const cred = await this.auth.signInWithPopup(provider);
    return { ok: true, user: cred.user };
  } catch (e) {
    console.log('[Cloud] Popup failed, reason:', e.code);

    /* ═══════════════ 4) قرر إن كان يجب التحول إلى redirect ═══════════════ */
    const fallbackCodes = [
      'auth/popup-blocked',
      'auth/popup-closed-by-user',
      'auth/cancelled-popup-request',
      'auth/operation-not-supported-in-this-environment',
      'auth/web-storage-unsupported',
      'auth/internal-error'
    ];

    if (!fallbackCodes.includes(e.code)) {
      /* خطأ حقيقي — لا داعي للـ redirect */
      return this._handleAuthError(e);
    }

    /* ═══════════════ 5) انتقل إلى redirect ═══════════════ */
    try {
      /* ✅ للتغلب على iOS ITP: استخدم SESSION بدل LOCAL */
      await this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

      /* ✅ احفظ علامة قبل الـ redirect لاستخدامها عند العودة */
      try {
        sessionStorage.setItem('auth_redirect_pending', '1');
        sessionStorage.setItem('auth_redirect_started_at', Date.now().toString());
      } catch(_) {}

      await this.auth.signInWithRedirect(provider);
      return { ok: true, redirect: true };
    } catch (e2) {
      return this._handleAuthError(e2);
    }
  }
},

/* ═══ فحص توفر التخزين ═══ */
_checkStorage() {
  try {
    const k = '__firebase_test__';
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
    return true;
  } catch (e) {
    try {
      sessionStorage.setItem(k, '1');
      sessionStorage.removeItem(k);
      return true;
    } catch (e2) {
      return false;
    }
  }
},

_handleAuthError(e) {
  console.warn('[Cloud] Auth error:', e);
  const code = (e && e.code) || '';
  const host = location.hostname || '(unknown)';
  let msg = 'تعذّر تسجيل الدخول، حاول مجدداً';

  if (code.includes('unauthorized-domain')) {
    msg = `النطاق "${host}" غير مصرّح. أضفه في Firebase → Authentication → Authorized domains`;
  } else if (code.includes('operation-not-allowed')) {
    msg = 'Google Sign-In غير مُفعّل في Firebase. فعّله من Authentication → Sign-in method';
  } else if (code.includes('network-request-failed')) {
    msg = 'فشل الاتصال — تحقّق من الإنترنت';
  } else if (code.includes('invalid-api-key')) {
    msg = 'مفتاح Firebase API غير صالح — راجع FIREBASE_CONFIG';
  } else if (code.includes('popup-blocked')) {
    msg = 'المتصفح منع النافذة المنبثقة — سيُفتح تسجيل الدخول في نفس الصفحة';
  } else if (code.includes('web-storage-unsupported')) {
    msg = 'المتصفح يمنع التخزين — أغلق التصفح المتخفي';
  } else if (code.includes('account-exists-with-different-credential')) {
    msg = 'هذا البريد مسجّل بطريقة أخرى — استخدم نفس طريقة الدخول';
  } else if (code.includes('internal-error')) {
    msg = 'خطأ داخلي — حاول مرة أخرى';
  } else if (code.includes('redirect-cancelled-by-user')) {
    msg = 'تم إلغاء تسجيل الدخول';
  } else if (code.includes('cancelled-popup-request')) {
    msg = 'تم إلغاء تسجيل الدخول';
  }
  return { ok: false, error: msg, code };
},

async signOut() {
  try {
    await this.auth.signOut();
    this.user = null;
    this.profile = null;

    /* ✅ إصلاح: تصفير بيانات اللاعب في الذاكرة عند الخروج */
    Save.data = JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA));
    Save.runMigrations();

    this.setState('offline');
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
},

  async loadProfile(uid) {
    try {
      const ref = this.db.collection('players').doc(uid);
      const snap = await ref.get();
      if (snap.exists) {
        this.profile = snap.data();
      } else {
        this.profile = {
          uid,
          username: null,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        try { await ref.set(this.profile); } catch(e2) {}
      }
    } catch (e) {
      console.warn('[Cloud] loadProfile failed, using fallback:', e);
      this.profile = { uid, username: null };
    }
    return this.profile;
  },

  async saveProfile(partial) {
    if (!this.user) return;
    const ref = this.db.collection('players').doc(this.user.uid);
    await ref.set({ ...partial, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
    this.profile = { ...(this.profile || {}), ...partial };
  },

  async isUsernameAvailable(name) {
    const key = name.trim().toLowerCase();
    if (!key) return false;
    const ref = this.db.collection('usernames').doc(key);
    try {
      const snap = await ref.get();
      if (!snap.exists) return true;
      return snap.data().uid === this.user.uid;
    } catch (e) {
      console.warn('[Cloud] Username check failed:', e);
      return true;
    }
  },

  async claimUsername(name) {
    if (!this.user) return { ok: false, error: 'not-signed-in', msg: 'يجب تسجيل الدخول أولاً' };

    const key = name.trim().toLowerCase();
    const trimmed = name.trim();
    const myUid = this.user.uid;
    const nameRef = this.db.collection('usernames').doc(key);

    try {
      const snap = await nameRef.get();
      if (snap.exists) {
        const data = snap.data();
        if (data.uid !== myUid) {
          return { ok: false, error: 'taken', msg: 'الاسم محجوز' };
        }
      }
    } catch (e) {
      if (e.code === 'permission-denied') {
        return { ok: false, error: 'permission', msg: 'قواعد Firestore تمنع الوصول' };
      }
      return { ok: false, error: 'network', msg: 'فشل الاتصال بـ Firestore' };
    }

    try {
      await this.db.runTransaction(async (tx) => {
        const snap = await tx.get(nameRef);
        if (snap.exists && snap.data().uid !== myUid) {
          throw new Error('taken');
        }
        tx.set(nameRef, { uid: myUid, username: trimmed, ts: Date.now() });
      });
    } catch (e) {
      if (e.message === 'taken') {
        return { ok: false, error: 'taken', msg: 'الاسم محجوز' };
      }
      try {
        await nameRef.set({ uid: myUid, username: trimmed, ts: Date.now() });
      } catch (e2) {
        return { ok: false, error: 'network', msg: 'فشل الحفظ' };
      }
    }

    try {
      await this.saveProfile({ username: trimmed });
    } catch (e) {}

    const oldName = this.profile && this.profile.username;
    if (oldName && oldName.toLowerCase() !== key) {
      try {
        await this.db.collection('usernames').doc(oldName.toLowerCase()).delete();
      } catch (e) {}
    }

    return { ok: true, username: trimmed };
  },

  async pushSave() {
    if (!this.user || !this.db) return;
    this.setState('syncing');
    try {
      const ref = this.db.collection('players').doc(this.user.uid);
      await ref.set({
        saveData: Save.data,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      this.lastSync = Date.now();
      this.setState('synced');
      setTimeout(() => { if (this.syncState === 'synced') this.setState('idle'); }, 1800);
    } catch (e) {
      console.warn('[Cloud] Push failed:', e);
      this.setState('error');
    }
  },

  async pullSave() {
    if (!this.user || !this.db) return null;
    try {
      const ref = this.db.collection('players').doc(this.user.uid);
      const snap = await ref.get();
      if (snap.exists && snap.data().saveData) {
        return snap.data().saveData;
      }
      return null;
    } catch (e) {
      return null;
    }
  },

  queueSync() {
    if (!this.user || !this.db) return;
    if (this.syncTimer) clearTimeout(this.syncTimer);
    this.syncTimer = setTimeout(() => this.pushSave(), 1200);
  }
};

/* ============================================================
   ==================== Merge Cloud Save =====================
   ============================================================ */
function mergeSaveData(local, cloud) {
  if (!cloud) return local;
  const out = JSON.parse(JSON.stringify(local));

  out.coins = Math.max(local.coins || 0, cloud.coins || 0);

  if (cloud.bestMeters) {
    for (const k in out.bestMeters) {
      out.bestMeters[k] = Math.max(local.bestMeters[k] || 0, cloud.bestMeters[k] || 0);
    }
  }

  out.ownedSkins = Array.from(new Set([...(local.ownedSkins||[]), ...(cloud.ownedSkins||[])]));

  if (cloud.cosmetics) {
    for (const cat in out.cosmetics.owned) {
      out.cosmetics.owned[cat] = Array.from(new Set([
        ...(local.cosmetics.owned[cat] || []),
        ...((cloud.cosmetics.owned && cloud.cosmetics.owned[cat]) || [])
      ]));
    }
  }

  const s = out.stats, cs = cloud.stats || {};
  s.totalPlays  = Math.max(s.totalPlays  || 0, cs.totalPlays  || 0);
  s.totalMeters = Math.max(s.totalMeters || 0, cs.totalMeters || 0);
  s.totalCoins  = Math.max(s.totalCoins  || 0, cs.totalCoins  || 0);
  s.bestMeters  = Math.max(s.bestMeters  || 0, cs.bestMeters  || 0);
  s.bestCombo   = Math.max(s.bestCombo   || 0, cs.bestCombo   || 0);
  s.shiftRuns   = Math.max(s.shiftRuns   || 0, cs.shiftRuns   || 0);

  out.season.points = Math.max(local.season.points || 0, (cloud.season && cloud.season.points) || 0);
  out.achievements = Object.assign({}, local.achievements, cloud.achievements);
  out.claimedGlobalLevels = Array.from(new Set([
    ...(local.claimedGlobalLevels||[]),
    ...(cloud.claimedGlobalLevels||[])
  ]));

  const ld = local.dailyLogin || {}, cd = cloud.dailyLogin || {};
  if ((cd.lastClaim || '') > (ld.lastClaim || '')) {
    out.dailyLogin = cd;
  }

  if (cloud.missions) {
    const lm = local.missions, cm = cloud.missions;
    if ((cm.dailyReset || '') > (lm.dailyReset || '')) {
      out.missions.daily = cm.daily;
      out.missions.dailyReset = cm.dailyReset;
      out.missions.progressDaily = cm.progressDaily;
    }
    if ((cm.weeklyReset || '') > (lm.weeklyReset || '')) {
      out.missions.weekly = cm.weekly;
      out.missions.weeklyReset = cm.weeklyReset;
      out.missions.progressWeekly = cm.progressWeekly;
    }
    if ((cm.monthlyReset || '') > (lm.monthlyReset || '')) {
      out.missions.monthly = cm.monthly;
      out.missions.monthlyReset = cm.monthlyReset;
      out.missions.progressMonthly = cm.progressMonthly;
    }
  }

  return out;
}

/* ============================================================
   ==================== UI Helpers for Auth ==================
   ============================================================ */
function showLoginLoading(show) {
  const el = document.getElementById('login-loading');
  if (el) el.style.display = show ? 'flex' : 'none';
  const btn = document.getElementById('login-google');
  if (btn) btn.disabled = !!show;
}

function showLoginError(msg) {
  const el = document.getElementById('login-error');
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 4200);
}

function getProviderLabel(user) {
  if (!user) return 'ضيف';
  const data = user.providerData && user.providerData[0];
  if (!data) return user.isAnonymous ? 'ضيف' : 'لاعب';
  switch (data.providerId) {
    case 'google.com':     return 'Google';
    case 'facebook.com':   return 'Facebook';
    case 'password':       return 'بريد إلكتروني';
    default:               return 'حساب';
  }
}

function formatUid(uid) {
  if (!uid) return '—';
  return uid.slice(0, 8) + '…' + uid.slice(-4);
}

function updateProfileUI() {
  const user = Cloud.user;
  const profile = Cloud.profile;

  const displayName = (profile && profile.username) || (user && user.displayName) || (user ? 'لاعب' : 'ضيف');
  const photo = (user && user.photoURL) || null;
  const provider = user ? getProviderLabel(user) : 'محلي';
  const uid = user ? user.uid : 'local';

  const mini = document.getElementById('profile-mini-emoji');
  const miniImg = document.getElementById('profile-mini-img');
  if (mini && miniImg) {
    if (photo) {
      mini.style.display = 'none';
      miniImg.src = photo; miniImg.style.display = 'block';
    } else {
      mini.style.display = 'inline';
      mini.textContent = displayName.charAt(0).toUpperCase() || '👤';
      miniImg.style.display = 'none';
    }
  }

  const pcName = document.getElementById('pc-name');
  const pcProv = document.getElementById('pc-provider');
  const pcEmoji = document.getElementById('pc-avatar-emoji');
  const pcImg = document.getElementById('pc-avatar-img');
  if (pcName) pcName.textContent = displayName;
  if (pcProv) pcProv.textContent = user ? (provider + ' · متصل') : 'لاعب محلي (بدون سحابة)';
  if (pcEmoji && pcImg) {
    if (photo) {
      pcEmoji.style.display = 'none';
      pcImg.src = photo; pcImg.style.display = 'block';
    } else {
      pcEmoji.style.display = 'inline';
      pcEmoji.textContent = displayName.charAt(0).toUpperCase() || '👤';
      pcImg.style.display = 'none';
    }
  }

  const pdName = document.getElementById('pd-name');
  const pdUid = document.getElementById('pd-uid');
  const pdProv = document.getElementById('pd-provider');
  if (pdName) pdName.textContent = (profile && profile.username) || '—';
  if (pdUid) pdUid.textContent = formatUid(uid);
  if (pdProv) pdProv.textContent = user ? provider : 'لاعب محلي';

  updateSyncUI();

  const logoutBtn = document.getElementById('logout-btn');
  const changeBtn = document.getElementById('change-name-btn');
  if (logoutBtn) logoutBtn.style.display = user ? 'block' : 'none';
  if (changeBtn) changeBtn.style.display = (user && profile && profile.username) ? 'block' : 'none';

  const sa = document.getElementById('setup-avatar-emoji');
  if (sa) sa.textContent = displayName.charAt(0).toUpperCase() || '👤';

    /* ═══ تحديث القائمة المنسدلة ═══ */
  const hmName = document.getElementById('hm-username');
  const hmSub = document.getElementById('hm-user-sub');
  const hmEmoji = document.getElementById('hm-avatar-emoji');
  const hmImg = document.getElementById('hm-avatar-img');

  if(hmName) hmName.textContent = displayName;
  if(hmSub) hmSub.textContent = user ? (provider + ' · متصل') : 'لاعب محلي';

  if(hmEmoji && hmImg){
    if(photo){
      hmEmoji.style.display = 'none';
      hmImg.src = photo;
      hmImg.style.display = 'block';
    } else {
      hmEmoji.style.display = 'inline';
      hmEmoji.textContent = displayName.charAt(0).toUpperCase() || '👤';
      hmImg.style.display = 'none';
    }
  }
}

function updateSyncUI() {
  const chip = document.getElementById('pc-sync');
  const pd = document.getElementById('pd-sync');

  let label = '—', cls = '', dotCls = '';
  switch (Cloud.syncState) {
    case 'syncing': label = 'جارٍ المزامنة...'; cls = 'warn'; dotCls = 'syncing'; break;
    case 'synced':  label = 'تمّت المزامنة ✓';  cls = 'ok';   dotCls = '';        break;
    case 'error':   label = 'فشلت المزامنة';   cls = 'err';  dotCls = 'error';   break;
    case 'offline': label = 'غير متصل';        cls = '';     dotCls = 'offline'; break;
    default:
      label = Cloud.user ? 'مُتزامن' : 'محلي فقط';
      cls = '';
      dotCls = Cloud.user ? '' : 'offline';
  }
  if (pd) {
    pd.textContent = label;
    pd.className = 'pd-v ' + cls;
  }
  if (chip) {
    chip.className = 'pc-sync ' + dotCls;
  }
}

/* ============================================================
   ==================== Auth Flow ============================
   ============================================================ */
async function handleSignInResult(result) {
  if (!result.ok) {
    if (!result.redirect) showLoginError(result.error || 'حدث خطأ');
    return;
  }
  /* redirect — لا نكمل، المستمع سيتولى */
  if (result.redirect) return;

  const user = result.user;
  if (!Cloud.profile) Cloud.profile = { uid: user.uid, username: null };

  try {
    await Cloud.loadProfile(user.uid);
  } catch (e) {
    Cloud.profile = { uid: user.uid, username: null };
  }

  if (!Cloud.profile.username && user.displayName) {
    const suggested = user.displayName
      .replace(/[^A-Za-z0-9_\u0600-\u06FF]/g, '')
      .slice(0, 16);
    if (suggested) {
      const setupInput = document.getElementById('setup-username');
      if (setupInput) {
        setupInput.value = suggested;
        setupInput.dispatchEvent(new Event('input'));
      }
    }
  }

  if (!Cloud.profile.username) {
    showScreen('s-profile-setup');
    setTimeout(() => {
      const inp = document.getElementById('setup-username');
      if (inp) inp.focus();
    }, 300);
  } else {
    await mergeAndGoHome();
  }
}

async function mergeAndGoHome() {
  /* ═══ 1) احفظ صلاحية المشرف الحالية ═══ */
  const wasAdmin = isAdminUser();  /* ← ✅ تحقق من UID */
  const hadLocalAdminAccess = Save.data.admin && Save.data.admin.access;

  /* ═══ 2) صفّر البيانات ═══ */
  Save.data = JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA));
  Save.runMigrations();

  /* ═══ 3) حمّل من السحابة ═══ */
  const cloudSave = await Cloud.pullSave();
  if (cloudSave) Save.applyCloud(cloudSave);

  /* ═══ 4) ✅ أعد تفعيل صلاحية المشرف إذا لزم ═══ */
  if (wasAdmin || hadLocalAdminAccess) {
    Save.data.admin.access = true;
    console.log('[Admin] ✅ Admin access restored for', Cloud.user?.uid);
  }

  /* ═══ 5) المحتوى المخصص ═══ */
  await pullAdminContent();

  /* ═══ 6) تحميل أصول اللاعب ═══ */
  try {
    await ASSET.preloadPlayerAssets();
  } catch(e){
    console.warn('[Preload] failed:', e);
  }

  /* ═══ 7) دفع الحالة المحدّثة للسحابة ═══ */
  await Cloud.pushSave();

  /* ═══ 8) ⚠️ تحديث الواجهة بالترتيب الصحيح ═══ */
  updateAdminUI();          /* ← ✅ أولاً — يُظهر/يخفي زر المشرف */
  applyAdminEffects();      /* ← ✅ ثانياً — يُطبق تأثيرات المشرف */
  updateProfileUI();
  buildHome();
  updateCoinsUI();
  updateGlobalLevelUI();
  updateAchBadge();
  showScreen('s-home');
}

/* ============================================================
   ==================== Username Validation ==================
   ============================================================ */
const USERNAME_RE = /^[\u0600-\u06FFA-Za-z0-9_\- ]{3,16}$/;

function validateUsername(name) {
  const t = (name || '').trim();
  if (t.length < 3) return { ok: false, error: 'الاسم قصير جداً (٣ أحرف على الأقل)' };
  if (t.length > 16) return { ok: false, error: 'الاسم طويل جداً (١٦ حرفاً كحد أقصى)' };
  if (!USERNAME_RE.test(t)) return { ok: false, error: 'استخدم أحرفاً عربية أو إنجليزية، أرقاماً، _ أو - فقط' };
  return { ok: true };
}

/* ============================================================
   ==================== Setup Screen Wiring ==================
   ============================================================ */
function setupAuthWiring() {
  const btnG = document.getElementById('login-google');
  if (btnG) btnG.addEventListener('click', async () => {
    showLoginLoading(true);
    const r = await Cloud.signInGoogle();
    showLoginLoading(false);
    handleSignInResult(r);
  });

  const setupInput = document.getElementById('setup-username');
  const setupBtn = document.getElementById('setup-confirm');
  const setupStatus = document.getElementById('setup-status');
  const setupCounter = document.getElementById('setup-counter');

  if (setupInput && setupBtn && setupStatus && setupCounter) {
    let checkToken = 0;
    setupInput.addEventListener('input', () => {
      const v = setupInput.value.trim();
      setupCounter.textContent = v.length + '/16';
      const val = validateUsername(v);
      if (!v) {
        setupStatus.textContent = '';
        setupStatus.className = 'setup-status';
        setupBtn.disabled = true;
        return;
      }
      if (!val.ok) {
        setupStatus.textContent = val.error;
        setupStatus.className = 'setup-status err';
        setupBtn.disabled = true;
        return;
      }
      setupStatus.textContent = 'جارٍ التحقق...';
      setupStatus.className = 'setup-status checking';
      setupBtn.disabled = true;
      const token = ++checkToken;
      setTimeout(async () => {
        if (token !== checkToken) return;
        const available = await Cloud.isUsernameAvailable(v);
        if (token !== checkToken) return;
        if (available) {
          setupStatus.textContent = '✓ الاسم متاح';
          setupStatus.className = 'setup-status ok';
          setupBtn.disabled = false;
        } else {
          setupStatus.textContent = '✗ الاسم محجوز';
          setupStatus.className = 'setup-status err';
          setupBtn.disabled = true;
        }
      }, 380);
    });

    setupBtn.addEventListener('click', async () => {
      const name = setupInput.value.trim();
      const val = validateUsername(name);
      if (!val.ok) return;

      setupBtn.disabled = true;
      const originalText = setupBtn.textContent;
      setupBtn.textContent = '...';
      setupStatus.textContent = '';
      setupStatus.className = 'setup-status';

      try {
        const r = await Cloud.claimUsername(name);
        setupBtn.textContent = originalText;

        if (!r.ok) {
          const displayMsg = r.msg || 'فشل الحفظ';
          setupStatus.textContent = '✗ ' + displayMsg;
          setupStatus.className = 'setup-status err';
          setupBtn.disabled = false;
          showLoginError(displayMsg);
          return;
        }

        Sfx.reward(); haptic(20);
        updateProfileUI();
        await mergeAndGoHome();
      } catch (e) {
        setupBtn.textContent = originalText;
        setupBtn.disabled = false;
        setupStatus.textContent = '✗ خطأ غير متوقع';
        setupStatus.className = 'setup-status err';
        showLoginError('خطأ: ' + (e.message || 'غير معروف'));
      }
    });
  }

  const changeNameBtn = document.getElementById('change-name-btn');
  if (changeNameBtn) changeNameBtn.addEventListener('click', () => {
    const inp = document.getElementById('change-username');
    if (!inp) return;
    inp.value = (Cloud.profile && Cloud.profile.username) || '';
    const ctr = document.getElementById('change-counter');
    if (ctr) ctr.textContent = inp.value.length + '/16';
    const st = document.getElementById('change-status');
    if (st) st.textContent = '';
    const cf = document.getElementById('change-confirm');
    if (cf) cf.disabled = true;
    showScreen('s-change-name');
  });

  const changeCancel = document.getElementById('change-cancel');
  if (changeCancel) changeCancel.addEventListener('click', () => {
    showScreen('s-settings');
    buildSettings();
  });

  const changeInp = document.getElementById('change-username');
  const changeStatus = document.getElementById('change-status');
  const changeBtn = document.getElementById('change-confirm');
  const changeCounter = document.getElementById('change-counter');

  if (changeInp && changeStatus && changeBtn && changeCounter) {
    let changeToken = 0;
    changeInp.addEventListener('input', () => {
      const v = changeInp.value.trim();
      changeCounter.textContent = v.length + '/16';
      const val = validateUsername(v);
      if (!v) { changeStatus.textContent = ''; changeBtn.disabled = true; return; }
      if (!val.ok) { changeStatus.textContent = val.error; changeStatus.className = 'setup-status err'; changeBtn.disabled = true; return; }
      if (v === Cloud.profile.username) { changeStatus.textContent = 'نفس الاسم الحالي'; changeStatus.className = 'setup-status checking'; changeBtn.disabled = true; return; }
      changeStatus.textContent = 'جارٍ التحقق...'; changeStatus.className = 'setup-status checking';
      changeBtn.disabled = true;
      const token = ++changeToken;
      setTimeout(async () => {
        if (token !== changeToken) return;
        const ok = await Cloud.isUsernameAvailable(v);
        if (token !== changeToken) return;
        if (ok) { changeStatus.textContent = '✓ متاح'; changeStatus.className = 'setup-status ok'; changeBtn.disabled = false; }
        else { changeStatus.textContent = '✗ محجوز'; changeStatus.className = 'setup-status err'; changeBtn.disabled = true; }
      }, 380);
    });

    changeBtn.addEventListener('click', async () => {
      const name = changeInp.value.trim();
      changeBtn.disabled = true;
      changeBtn.textContent = '...';
      const r = await Cloud.claimUsername(name);
      changeBtn.textContent = 'حفظ';
      if (!r.ok) {
        changeStatus.textContent = r.error === 'taken' ? '✗ محجوز' : '✗ فشل';
        changeStatus.className = 'setup-status err';
        changeBtn.disabled = false;
        return;
      }
      Sfx.reward(); haptic(20);
      updateProfileUI();
      showScreen('s-settings');
      buildSettings();
    });
  }

  const miniBtn = document.getElementById('profile-mini');
  if (miniBtn) miniBtn.addEventListener('click', () => {
    showScreen('s-settings');
    buildSettings();
    Sfx.tap(); haptic(6);
  });

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', async () => {
    if (!confirm('سيتم تسجيل خروجك. تقدمك محفوظ في السحابة.')) return;
    await Cloud.signOut();
    showScreen('s-login');
    Sfx.tap(); haptic(6);
  });
}

/* ============================================================
   ==================== Auth state listener ==================
   ============================================================ */
async function setupAuthListener() {

  /* ═══════════════════════════════════════════════════════
     ✅ 1) معالجة نتيجة الـ redirect مع إعادة محاولة
     ═══════════════════════════════════════════════════════ */
  const wasRedirecting = (() => {
    try { return sessionStorage.getItem('auth_redirect_pending') === '1'; }
    catch(_) { return false; }
  })();

  let redirectResult = null;
  let redirectError  = null;

  if (wasRedirecting) {
    /* إظهار شاشة تحميل */
    showLoginLoading(true);

    /* ⏱️ retry حتى 3 مرات — iOS يحتاج وقتاً لتطبيق الـ state */
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        redirectResult = await Cloud.auth.getRedirectResult();
        if (redirectResult && redirectResult.user) break;
      } catch (e) {
        redirectError = e;
        console.warn(`[Cloud] getRedirectResult attempt ${attempt+1} failed:`, e.code);
      }
      if (attempt < 2) await new Promise(r => setTimeout(r, 400));
    }

    /* نظّف العلامة */
    try {
      sessionStorage.removeItem('auth_redirect_pending');
      sessionStorage.removeItem('auth_redirect_started_at');
    } catch(_) {}

    showLoginLoading(false);

    /* ✅ عالج الأخطاء */
    if (redirectError) {
      const errCode = redirectError.code || '';
      let msg = 'تعذّر إكمال تسجيل الدخول';

      if (errCode.includes('unauthorized-domain')) {
        msg = 'النطاق الحالي غير مصرّح في Firebase Console';
      } else if (errCode.includes('network-request-failed')) {
        msg = 'فشل الاتصال بالشبكة';
      } else if (errCode.includes('account-exists-with-different-credential')) {
        msg = 'هذا البريد مسجّل بطريقة دخول أخرى';
      } else if (errCode.includes('internal-error')) {
        msg = 'خطأ داخلي — جرّب Chrome بدل Safari';
      }

      setTimeout(() => showLoginError(msg), 400);
    }
  }

  /* ═══════════════════════════════════════════════════════
     ✅ 2) مستمع حالة الدخول
     ═══════════════════════════════════════════════════════ */
  Cloud.auth.onAuthStateChanged(async (user) => {
    if (user) {
      const previousUid = Cloud.user ? Cloud.user.uid : null;
      const isDifferentUser = (previousUid !== user.uid);

      if (isDifferentUser) {
        Save.data = JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA));
        Save.runMigrations();
      }

      Cloud.user = user;
      Cloud.setState('idle');

      try {
        await Cloud.loadProfile(user.uid);
      } catch (e) {
        console.warn('[Cloud] loadProfile failed:', e);
      }

      if (isAdminUser()) {
        Save.data.admin.access = true;
      }

      applyAdminEffects();
      updateProfileUI();

      /* ═══ لا يوجد اسم → افتح شاشة الإعداد ═══ */
      if (!Cloud.profile || !Cloud.profile.username) {
        if (user.displayName) {
          const inp = document.getElementById('setup-username');
          if (inp && !inp.value) {
            inp.value = user.displayName
              .replace(/[^A-Za-z0-9_\u0600-\u06FF]/g, '')
              .slice(0, 16);
            inp.dispatchEvent(new Event('input'));
          }
        }
        showScreen('s-profile-setup');
        setTimeout(() => {
          const inp = document.getElementById('setup-username');
          if (inp) inp.focus();
        }, 300);
      } else {
        /* ═══ عنده اسم → للقائمة الرئيسية ═══ */
        try {
          await mergeAndGoHome();
        } catch (e) {
          console.error('[mergeAndGoHome] failed:', e);
          /* احتياطي: افتح الرئيسية على أي حال */
          buildHome();
          showScreen('s-home');
        }
      }
    } else {
      /* ═══ تم تسجيل الخروج ═══ */
      Cloud.user = null;
      Cloud.profile = null;
      Save.data = JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA));
      Save.runMigrations();

      Cloud.setState('offline');
      if (Cloud.enabled) {
        showScreen('s-login');
      } else {
        showScreen('s-home');
        buildHome();
      }
    }
  });
}

/* ============================================================
   ==================== POWERUPS UPGRADE UI v2 ==============
   ============================================================ */
let currentPowerupCategory = 'all';

function buildPowerups(){
  const list = document.getElementById('powerups-list');
  if(!list) return;

  /* ═══ بناء تبويبات التصنيفات إن لم تكن موجودة ═══ */
  let tabsContainer = document.getElementById('powerup-tabs');
  if(!tabsContainer){
    tabsContainer = document.createElement('div');
    tabsContainer.id = 'powerup-tabs';
    tabsContainer.className = 'tab-row';
    tabsContainer.style.marginBottom = '16px';
    list.parentNode.insertBefore(tabsContainer, list);
  }

  const totalUnlocked = POWERUP_LIST.filter(p => getPowerupLevel(p.id) > 0).length;

  tabsContainer.innerHTML = `
    <button class="tab-chip ${currentPowerupCategory === 'all' ? 'active' : ''}" data-pwcat="all">
      الكل (${POWERUP_LIST.length})
    </button>
    ${Object.entries(POWERUP_CATEGORIES).map(([key, cat]) => {
      const count = POWERUP_LIST.filter(p => p.category === key).length;
      return `<button class="tab-chip ${currentPowerupCategory === key ? 'active' : ''}" data-pwcat="${key}">
        ${cat.icon} ${cat.name} (${count})
      </button>`;
    }).join('')}
  `;

  tabsContainer.querySelectorAll('[data-pwcat]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPowerupCategory = btn.dataset.pwcat;
      buildPowerups();
      Sfx.tap(); haptic(6);
    });
  });

  list.innerHTML = '';

  /* ═══ الفلترة حسب التصنيف ═══ */
  const filtered = currentPowerupCategory === 'all'
    ? POWERUP_LIST
    : POWERUP_LIST.filter(p => p.category === currentPowerupCategory);

  /* ═══ تجميع حسب التصنيف عند عرض "الكل" ═══ */
  if(currentPowerupCategory === 'all'){
    const grouped = {};
    Object.keys(POWERUP_CATEGORIES).forEach(k => grouped[k] = []);
    filtered.forEach(p => {
      if(grouped[p.category]) grouped[p.category].push(p);
    });

    Object.entries(POWERUP_CATEGORIES)
      .sort((a, b) => a[1].order - b[1].order)
      .forEach(([key, cat]) => {
        const items = grouped[key];
        if(items.length === 0) return;

        const header = document.createElement('div');
        header.style.cssText = `
          display:flex;align-items:center;gap:10px;
          margin:18px 4px 10px;padding-bottom:8px;
          border-bottom:2px solid ${cat.color}33;
        `;
        header.innerHTML = `
          <span style="font-size:22px;">${cat.icon}</span>
          <div style="flex:1;">
            <div style="font-family:'Space Grotesk';font-size:14px;font-weight:700;color:${cat.color};letter-spacing:1px;">${cat.en}</div>
            <div style="font-size:11px;font-weight:700;color:var(--ink-mute);">${cat.name} · ${items.length} تعزيز</div>
          </div>
        `;
        list.appendChild(header);

        items.forEach(def => list.appendChild(buildPowerupCard(def, currentModeFallback())));
      });
  } else {
    filtered.forEach(def => list.appendChild(buildPowerupCard(def, currentModeFallback())));
  }

  updateCoinsUI();
}

function currentModeFallback(){
  return Save.data.mode || 'FLIP';
}

function buildPowerupCard(def, currentMode){
  const lvl = getPowerupLevel(def.id);
  const maxLvl = getPowerupMaxLevel(def.id);
  const maxed = isPowerupMaxed(def.id);
  const price = getPowerupUpgradePrice(def.id);
  const rarity = getPowerupRarity(def.id);
  const cat = POWERUP_CATEGORIES[def.category] || POWERUP_CATEGORIES.utility;

  const isInstant = !!def.instant;
  const isSingle = !!def.singleUse;
  const isPermanent = isInstant || isSingle;

  const secs = isPermanent
    ? (isInstant ? '⚡ فوري' : '⚡ استخدام واحد')
    : getPowerupDurationSeconds(def.id) + 'ث';

  const nextSecs = isPermanent
    ? (isInstant ? 'قيمة أقوى' : '—')
    : (getPowerupDurationSeconds(def.id) + (def.durationStep || 5)) + 'ث';

  const available = isPowerupAvailableInMode(def.id, currentMode);

  const card = document.createElement('button');
  card.className = 'pw-card' + (maxed ? ' maxed' : '') + (available ? '' : ' locked');
  card.style.setProperty('--pw-rarity', rarity.color);

  const modeChips = (def.modes || []).map(m => {
    const md = MODES.find(x => x.id === m);
    if(!md) return '';
    const active = m === currentMode ? ' active' : '';
    return `<span class="pw-mode-chip${active}">${md.icon}</span>`;
  }).join('');

  card.innerHTML = `
    <div style="display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid ${rarity.color}22;margin-bottom:10px;">
      <span style="font-size:12px;">${cat.icon}</span>
      <span style="font-size:10px;font-weight:700;color:${cat.color};letter-spacing:1px;">${cat.name}</span>
      <span style="flex:1;"></span>
      <span style="padding:2px 8px;border-radius:100px;background:${rarity.color}22;color:${rarity.color};font-size:9.5px;font-weight:800;letter-spacing:1px;">
        ${rarity.name.toUpperCase()}
      </span>
    </div>

    <div class="pw-head">
      <div class="pw-ic" style="background:${def.color}22;color:${def.color};border:2px solid ${rarity.color}44;">
        <span>${def.icon}</span>
      </div>
      <div class="pw-info">
        <div class="pw-name">${def.label}</div>
        <div class="pw-desc">${def.desc}</div>
        <div class="pw-modes">${modeChips}</div>
      </div>
      ${!isPermanent ? `
        <div class="pw-level">
          <span class="pw-lv-num" style="color:${rarity.color};">${lvl}</span>
          <span class="pw-lv-max">/${maxLvl}</span>
        </div>
      ` : `<div class="pw-maxed-badge" style="background:${rarity.color};font-size:9px;padding:5px 10px;">⚡</div>`}
    </div>

    ${!isPermanent ? `
      <div class="pw-bar">
        <div class="pw-bar-fill" style="width:${(lvl/maxLvl)*100}%;background:linear-gradient(90deg,${def.color},${rarity.color});"></div>
      </div>
    ` : ''}

    <div class="pw-foot">
      <div class="pw-duration">
        <span class="pw-dur-k">${isInstant ? 'التأثير' : 'المدة الحالية'}</span>
        <span class="pw-dur-v" style="color:${def.color};">${secs}</span>
      </div>
      ${maxed
        ? `<div class="pw-maxed-badge" style="background:linear-gradient(135deg,${rarity.color},${def.color});">✓ مكتمل</div>`
        : isPermanent
          ? `<div class="pw-maxed-badge" style="background:linear-gradient(135deg,${rarity.color},${def.color});opacity:0.7;">⚡ لا يُطوَّر</div>`
          : `<div class="pw-upgrade-btn" data-pw="${def.id}" style="background:linear-gradient(135deg,${rarity.color},${def.color});">
              <span class="pw-up-k">تطوير إلى</span>
              <span class="pw-up-v">${nextSecs}</span>
              <span class="pw-up-price"><span class="c">◆</span>${price}</span>
            </div>`
      }
    </div>
  `;

  const upBtn = card.querySelector('.pw-upgrade-btn');
  if(upBtn){
    upBtn.addEventListener('click', e => {
      e.stopPropagation();
      if(maxed) return;
      const cost = getPowerupUpgradePrice(def.id);
      const unlimited = hasAdminAccess() && Save.data.admin.unlimitedUnlock;
      if(unlimited || Save.data.coins >= cost){
        if(!unlimited) Save.data.coins -= cost;
        Save.data.powerupUpgrades[def.id] = getPowerupLevel(def.id) + 1;
        Save.save();
        Sfx.reward(); haptic(20);
        updateCoinsUI();
        buildPowerups();
      } else {
        Sfx.play(220, 0.15, 'sine', 0.05, 180);
        haptic(20);
      }
    });
  }

  return card;
}

/* ============================================================
   ==================== ADMIN HELPERS ========================
   ============================================================ */
function isAdminUser(){
  if(!Cloud || !Cloud.user) return false;
  if(ADMIN_CONFIG.uids.includes(Cloud.user.uid)) return true;
  return false;
}

function hasAdminAccess(){
  return Save.data.admin && Save.data.admin.access;
}

function grantAdminAccess(){
  Save.data.admin.access = true;
  Save.save();
  updateAdminUI();
}

function revokeAdminAccess(){
  Save.data.admin.access = false;
  Save.data.admin.unlimitedCoins = false;
  Save.data.admin.unlimitedUnlock = false;
  Save.data.admin.godMode = false;
  Save.save();
  updateAdminUI();
}

function updateAdminUI(){
  const menuAdmin = document.getElementById('menu-admin-btn');
  if(menuAdmin){
    menuAdmin.style.display = hasAdminAccess() ? 'flex' : 'none';
  }
}

/* ============================================================
   ==================== ADMIN PANEL LOGIC ====================
   ============================================================ */
let currentAdminTab = 'skin';
let pendingImageData = null;

function buildAdminPanel(){
  const u = Cloud.user;
  const heroUser = document.getElementById('admin-hero-user');
  if(heroUser) heroUser.textContent =
    u ? (u.email || u.displayName || u.uid.slice(0,12)) : 'غير مسجّل';

['unlimitedCoins','unlimitedUnlock','godMode','infiniteJump'].forEach(k=>{    const sw = document.getElementById('sw-' + k);
    if(sw) sw.classList.toggle('on', !!Save.data.admin[k]);
  });

  const coinsVal = document.getElementById('admin-coins-value');
  if(coinsVal) coinsVal.textContent = Save.data.coins;

  document.querySelectorAll('.act-chip').forEach(c=>{
    c.classList.toggle('active', c.dataset.act === currentAdminTab);
  });

  buildAdminContentList();
}

function buildAdminContentList(){
  const list = document.getElementById('admin-content-list');
  if(!list) return;
  list.innerHTML = '';

  /* ✅ استخدم المفتاح المركزي */
  const key = ADMIN_KEY_MAP[currentAdminTab] ||
              ('custom' + currentAdminTab.charAt(0).toUpperCase() + currentAdminTab.slice(1));
  const items = Save.data.admin[key] || [];

  if(items.length === 0){
    list.innerHTML = '<div style="text-align:center;padding:24px;color:var(--ink-mute);font-size:12px;">لا توجد عناصر في هذا التصنيف بعد</div>';
    return;
  }

  items.forEach((item, idx)=>{
    const el = document.createElement('div');
    el.className = 'admin-content-item';

    const src = resolveImageSrc(item);
    const thumb = src
      ? `<img src="${src}" alt="" onerror="this.style.display='none';this.parentElement.innerHTML='⚠'">`
      : `<div style="width:100%;height:100%;background:${item.color || '#E07A3F'};display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;font-weight:800;">${(item.name||'?').charAt(0)}</div>`;

    /* ═══ عرض الأماكن ═══ */
    const placements = item.placements || [];
    const placementsHtml = placements.length
      ? placements.map(p => {
          const info = getSourceTypeInfo(p.type);
          let extra = '';
          if(p.type === 'shop')       extra = ` ◆${p.price}`;
          if(p.type === 'battle_pass') extra = ` L${p.tier} · ${p.track === 'premium' ? 'مميز' : 'مجاني'}`;
          if(p.type === 'season_rank') extra = ` ${SEASON_RANKS[p.rankId]?.name || ''}`;
          if(p.type === 'daily_login') extra = ` يوم ${p.day}`;
          if(p.type === 'chest')       extra = ` ${p.chestType}`;
          if(p.type === 'lucky_wheel') extra = ` قطاع ${p.segment}`;
          if(p.type === 'event')       extra = ` ${p.eventId}`;
          return `<span class="aci-place" style="--pc:${info.color};">${info.icon} ${info.label}${extra}</span>`;
        }).join('')
      : '<span class="aci-place" style="--pc:#C14A4A;">⚠ بدون مصدر</span>';

    const imgBadge = item.imagePath
      ? `<span class="aci-source" style="color:#4A88C8;">📁 ${item.imagePath}</span>`
      : '<span class="aci-source" style="color:#C14A4A;">⚠ بلا صورة</span>';

    const disabled = item.enabled === false;

    el.innerHTML = `
      <div class="aci-thumb">${thumb}</div>
      <div class="aci-info">
        <div class="aci-name">
          ${item.name || 'بدون اسم'}
          ${disabled ? '<span style="color:#C14A4A;font-size:10px;"> (مُخفي)</span>' : ''}
        </div>
        <div class="aci-meta">${item.rarity || 'common'} · ${imgBadge}</div>
        <div class="aci-placements">${placementsHtml}</div>
      </div>
      <button class="aci-del" data-del="${idx}">🗑</button>
    `;
    el.querySelector('[data-del]').addEventListener('click', ()=>{
      if(!confirm('حذف هذا العنصر نهائياً من جميع اللاعبين؟')) return;
      deleteCustomItem(currentAdminTab, idx);
    });
    list.appendChild(el);
  });
}

function buildAdminSourcesList(){
  const list = document.getElementById('admin-sources-list');
  if(!list) return;
  list.innerHTML = '';
  const sources = Save.data.admin.sources || [];

  if(sources.length === 0){
    list.innerHTML = '<div style="text-align:center;padding:16px;color:var(--ink-mute);font-size:12px;">لا توجد مصادر بعد</div>';
    return;
  }

  sources.forEach((src, idx)=>{
    const info = getSourceTypeInfo(src.type);
    const el = document.createElement('div');
    el.className = 'admin-source-item' + (src.active ? '' : ' inactive');
    el.innerHTML = `
      <div class="asi-icon" style="background:${info.color}22;color:${info.color};">${info.icon}</div>
      <div class="asi-info">
        <div class="asi-name">${src.name}</div>
        <div class="asi-meta">${src.start} → ${src.end}</div>
      </div>
      <div class="asi-toggle ${src.active ? 'on' : ''}" data-toggle-src="${idx}"></div>
      <button class="asi-del" data-del-src="${idx}">🗑</button>
    `;
    el.querySelector('[data-toggle-src]').addEventListener('click', ()=>{
      Save.data.admin.sources[idx].active = !Save.data.admin.sources[idx].active;
      Save.save();
      buildAdminSourcesList();
      Sfx.tap();
    });
    el.querySelector('[data-del-src]').addEventListener('click', ()=>{
      if(!confirm('حذف هذا المصدر؟')) return;
      Save.data.admin.sources.splice(idx, 1);
      Save.save();
      buildAdminSourcesList();
      Sfx.tap();
    });
    list.appendChild(el);
  });
}

function populateSourceSelect(selectedId){
  const sel = document.getElementById('af-source');
  if(!sel) return;
  const sources = Save.data.admin.sources || [];
  sel.innerHTML = sources.map(s=>{
    const info = getSourceTypeInfo(s.type);
    const mark = s.active ? '' : ' (غير نشط)';
    return `<option value="${s.id}"${s.id===selectedId?' selected':''}>${info.icon} ${s.name}${mark}</option>`;
  }).join('');
  if(!sources.length){
    sel.innerHTML = '<option value="">لا توجد مصادر — أضف مصدراً أولاً</option>';
  }
}

/* ═══ قائمة كل المفاتيح المخصصة (ثابتة — لا تعتمد على ترتيب التعريف) ═══ */
const ALL_CUSTOM_KEYS = [
  'customSkins',
  /* ═══ التأثيرات (9) ═══ */
  'customHead',
  'customBack',
  'customEyes',
  'customTrail',
  'customSpark',
  'customJump',
  'customSpawn',
  'customRevive',
  'customDeath',
  /* ═══ الجماليات (5) ═══ */
  'customAvatar',
  'customAvatarFrame',
  'customBanner',
  'customNameTag',
  'customBadge'
];

async function pushAdminContent(){
  if(!Cloud.user || !Cloud.db){
    return { ok: false, msg: 'غير متصل بـ Firebase' };
  }

  try {
    const payload = {
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedBy: Cloud.user.uid
    };

    /* ═══════════════════════════════════════════════════════
       ✅ 1) نسخ نظيفة للبيانات — إزالة imageData (base64)
       لأن Firestore يرفض أي وثيقة > 1MB
       ═══════════════════════════════════════════════════════ */
    const cleaned = {};
    let totalItems = 0;

    for(const k of ALL_CUSTOM_KEYS){
      const list = Save.data.admin[k] || [];
      totalItems += list.length;

      cleaned[k] = list.map(item => {
        const copy = { ...item };
        /* احذف الحقول الثقيلة — تُحفظ محلياً فقط */
        delete copy.imageData;
        delete copy.compressedData;
        return copy;
      });
    }

    /* اجمع في payload */
    Object.assign(payload, cleaned);

    /* ═══════════════════════════════════════════════════════
       ✅ 2) فحص الحجم قبل الإرسال
       ═══════════════════════════════════════════════════════ */
    let jsonStr = '';
    try {
      jsonStr = JSON.stringify(payload, (key, value) => {
        /* تجاهل serverTimestamp (لا يمكن تسلسله) */
        if(value && typeof value === 'object' && value._methodName){
          return '__SERVER_TS__';
        }
        return value;
      });
    } catch(e){
      return { ok: false, msg: 'فشل تسلسل البيانات: ' + e.message };
    }

    const sizeKB = Math.round(jsonStr.length / 1024);
    const MAX_KB = 900;
    console.log(`[pushAdminContent] 📦 عناصر: ${totalItems} · الحجم: ${sizeKB}KB`);

    if(sizeKB > MAX_KB){
      return {
        ok: false,
        msg: `حجم البيانات كبير جداً (${sizeKB}KB > ${MAX_KB}KB) — احذف بعض العناصر القديمة أو استخدم صوراً خارجية بدل base64`
      };
    }

    /* ═══════════════════════════════════════════════════════
       ✅ 3) الكتابة للسحابة
       ═══════════════════════════════════════════════════════ */
    await Cloud.db.collection('admin_content').doc('global').set(payload, { merge: false });

    Save.data.admin.lastContentSync = Date.now();
    Save.save();

    console.log('[pushAdminContent] ✅ نجح النشر');
    return { ok: true, sizeKB, totalItems };

  } catch(e){
    console.error('[pushAdminContent] ❌ فشل:', e);

    /* ═══ رسالة خطأ مفصّلة حسب السبب ═══ */
    let msg = e.message || 'خطأ غير معروف';
    const code = e.code || '';

    if(code === 'permission-denied'){
      msg = '⚠ قواعد Firestore تمنع الكتابة — افتح Firebase Console → Firestore → Rules وأضف:\n' +
            `allow write: if request.auth != null;`;
    } else if(code === 'unavailable'){
      msg = '⚠ فشل الاتصال بـ Firestore — تحقق من الإنترنت';
    } else if(code === 'invalid-argument'){
      msg = '⚠ بيانات غير صالحة: ' + e.message;
    } else if(code === 'resource-exhausted'){
      msg = '⚠ تجاوز حد Firestore — البيانات كبيرة جداً';
    } else if(code === 'unauthenticated'){
      msg = '⚠ الجلسة منتهية — أعد تسجيل الدخول';
    }

    return { ok: false, msg, code };
  }
}

/* ═══ يرسم شارة الاسم فوق اللاعب (في multiplayer) ═══ */
function drawPlayerNameTag(ctx, x, y, name, opts = {}){
  const tag = currentNameTag();
  const badge = currentBadge();

  ctx.save();

  /* صورة بطاقة الاسم */
  if(hasItemImage(tag)){
    const tagW = 120;
    ASSET.drawItem(ctx, tag, {
      x, y: y - 34,
      size: tagW,
      anchorX: 0.5, anchorY: 0.5
    });
  }

  /* النص */
  ctx.font = 'bold 12px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,.8)';
  ctx.shadowBlur = 4;
  ctx.fillText(name, x, y - 34);

  /* شارة صغيرة بجانب الاسم */
  if(badge.id !== 'none' && hasItemImage(badge)){
    const textW = ctx.measureText(name).width;
    ASSET.drawItem(ctx, badge, {
      x: x + textW / 2 + 12, y: y - 34,
      size: 18,
      anchorX: 0.5, anchorY: 0.5
    });
  }

  ctx.restore();
}

/* ═══ يرسم إطار الصورة الرمزية في الملف الشخصي ═══ */
function drawAvatarFrame(ctx, x, y, radius){
  const frame = currentAvatarFrame();
  if(frame.id === 'none') return;

  if(hasItemImage(frame)){
    ASSET.drawItem(ctx, frame, {
      x, y,
      size: radius * 2.4,
      anchorX: 0.5, anchorY: 0.5,
      rotation: G.t * 0.005
    });
    return;
  }

  /* fallback: حلقة ملوّنة */
  ctx.save();
  ctx.strokeStyle = frame.color || '#E8B34E';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

async function pullAdminContent(){
  if(!Cloud.user || !Cloud.db) return { ok: false };
  try {
    const snap = await Cloud.db.collection('admin_content').doc('global').get();
    if(!snap.exists) return { ok: true, empty: true };
    const data = snap.data();
    for(const k of ALL_CUSTOM_KEYS){
      Save.data.admin[k] = data[k] || [];
    }
    Save.data.admin.lastContentSync = Date.now();
    Save.save();
    return { ok: true };
  } catch(e){
    return { ok: false, msg: e.message };
  }
}

/* ═══ حذف عنصر (محلياً + السحابة) — نسخة مُصحَّحة ═══ */
async function deleteCustomItem(cat, idx){
  /* ✅ الإصلاح: استخدم ADMIN_KEY_MAP المُصحَّح */
  const key = ADMIN_KEY_MAP[cat] ||
              ('custom' + cat.charAt(0).toUpperCase() + cat.slice(1));

  if(!Save.data.admin[key]){
    console.warn('[Delete] Key not found:', key);
    alert('⚠ خطأ: مفتاح التصنيف غير موجود');
    return;
  }

  const list = Save.data.admin[key];
  if(idx < 0 || idx >= list.length) return;

  const item = list[idx];
  if(!item) return;

  /* تأكيد مزدوج مع تفاصيل */
  const ok = confirm(
    `⚠️ حذف العنصر نهائياً؟\n\n` +
    `📦 الاسم: ${item.name || 'بدون اسم'}\n` +
    `📁 التصنيف: ${CATEGORY_LABELS[cat] || cat}\n` +
    `🌐 المصادر: ${(item.placements || []).map(p => p.type).join(', ') || 'لا شيء'}\n\n` +
    `سيُحذف من جميع اللاعبين فوراً.`
  );
  if(!ok) return;

  /* حذف */
  list.splice(idx, 1);
  Save.save();

  /* مزامنة */
  let syncOk = false;
  if(typeof pushAdminContent === 'function'){
    const r = await pushAdminContent();
    syncOk = r.ok;
  }

  /* سجل */
  if(typeof Admin !== 'undefined' && Admin.logAudit){
    Admin.logAudit('content', 'deleted', `🗑 حذف "${item.name}" من ${cat}`);
  }

  /* تحديث الواجهات */
  if(typeof Admin !== 'undefined' && Admin.initialized){
    Admin.renderContentList();
    Admin.renderContentStats();
    if(Admin.addActivity) Admin.addActivity('🗑', `حذف "${item.name}"`);
  }
  if(typeof buildAdminContentList === 'function') buildAdminContentList();
  if(typeof refreshContentEverywhere === 'function') refreshContentEverywhere();

  /* إشعار */
  if(syncOk){
    if(typeof Toast !== 'undefined'){
      Toast.success('تم الحذف', `حُذف "${item.name}" من كل اللاعبين`);
    } else {
      alert('✓ تم الحذف والنشر');
    }
  } else {
    alert('⚠ حُذف محلياً — فشل النشر للسحابة');
  }

  Sfx.reward(); haptic(15);
}

function compressImage(file, maxSize = 256, quality = 0.85){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = e=>{
      const img = new Image();
      img.onload = ()=>{
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if(width > height && width > maxSize){
          height = Math.round(height * maxSize / width);
          width = maxSize;
        } else if(height > maxSize){
          width = Math.round(width * maxSize / height);
          height = maxSize;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,width,height);
        ctx.drawImage(img, 0, 0, width, height);
        const data = canvas.toDataURL('image/png');
        resolve(data);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const ImageCache = {};
function getImageEl(dataUrl){
  if(ImageCache[dataUrl]) return ImageCache[dataUrl];
  const img = new Image();
  img.src = dataUrl;
  ImageCache[dataUrl] = img;
  return img;
}

/* ============================================================
   ═══════════ ADMIN PANEL WIRING v3 — CLEAN ═══════════
   ============================================================
   ✅ يمنع الربط المزدوج مع Admin v3
   ✅ keyMap واحد في ثابت مركزي
   ✅ حماية بـ init guard
   ✅ event delegation
   ✅ الكود السري يُسجّل مرة واحدة فقط
   ============================================================ */

/* ═══ خريطة مفاتيح التصنيفات (ثابت مركزي — مُصحَّح) ═══ */
const ADMIN_KEY_MAP = Object.freeze({
  /* ✅ الإصلاح: أضف 'skin' أولاً */
  skin: 'customSkins',
  /* باقي التصنيفات تُبنى تلقائياً */
  ...Object.fromEntries(
    COSMETIC_CATEGORY_ORDER.map(cat => [
      cat,
      'custom' + cat.charAt(0).toUpperCase() + cat.slice(1)
    ])
  )
});

/* ═══ حالة الربط (يمنع التنفيذ المزدوج) ═══ */
let _adminWired = false;

function wireAdminPanel(){
  /* ✅ حماية: يُنفّذ مرة واحدة فقط مهما استُدعي */
  if(_adminWired){
    console.log('[wireAdminPanel] Already wired — skipping');
    return;
  }
  _adminWired = true;

  const $ = id => document.getElementById(id);

  /* ============================================================
     ═══ 1) زر فتح لوحة المشرف ═══
     ============================================================ */
  wireAdminOpenButtons($);

  /* ============================================================
     ═══ 2) زر إنهاء الصلاحية ═══
     ============================================================ */
  const logout = $('admin-logout');
  if(logout && !logout._bound){
    logout._bound = true;
    logout.addEventListener('click', () => {
      if(!confirm('إنهاء صلاحية المشرف؟')) return;
      revokeAdminAccess();
      showScreen('s-home');
      buildHome();
      Sfx.tap(); haptic(6);
    });
  }

  /* ============================================================
     ═══ 3) تبويبات تصنيفات المحتوى ═══
     - Admin v3 يربطها عبر bindContentTabs() لكن باسم مغاير
     - هنا نوحّد المرجع: عند النقر نُحدّث BOTH currentAdminTab و Admin.contentTab
     ============================================================ */
  document.querySelectorAll('#admin-content-tabs .act-chip').forEach(chip => {
    if(chip._adminContentBound) return;
    chip._adminContentBound = true;

    chip.addEventListener('click', () => {
      const cat = chip.dataset.act;
      if(!cat) return;

      /* ✅ وحّد المرجعين */
      currentAdminTab = cat;
      if(typeof Admin !== 'undefined' && Admin) Admin.contentTab = cat;

      /* UI */
      document.querySelectorAll('#admin-content-tabs .act-chip').forEach(x => {
        x.classList.toggle('active', x === chip);
      });

      /* إعادة بناء القائمة عبر النظام المُهيّأ */
      if(typeof Admin !== 'undefined' && Admin && Admin.initialized){
        Admin.renderContentList();
      } else {
        buildAdminContentList();
      }

      Sfx.tap(); haptic(4);
    });
  });

  /* ============================================================
     ═══ 4) زر "إضافة عنصر جديد" ═══
     ============================================================ */
const addBtn = $('admin-add-content');
if(addBtn && !addBtn._bound){
  addBtn._bound = true;
  addBtn.addEventListener('click', () => openAdminItemForm());
}

  /* ============================================================
     ═══ 5) حقول النموذج ═══
     ============================================================ */
  wireAdminFormFields($);

  /* ============================================================
     ═══ 6) زر إلغاء ═══
     ============================================================ */
  const cancel = $('af-cancel');
  if(cancel && !cancel._bound){
    cancel._bound = true;
    cancel.addEventListener('click', () => {
      closeAdminItemForm();
      Sfx.tap(); haptic(4);
    });
  }

  /* زر إغلاق ✕ داخل رأس النموذج */
  const closeBtn = $('afv3-close');
  if(closeBtn && !closeBtn._bound){
    closeBtn._bound = true;
    closeBtn.addEventListener('click', () => {
      closeAdminItemForm();
      Sfx.tap(); haptic(4);
    });
  }

  /* النقر على الخلفية يُغلق النموذج */
  const backdrop = $('afv3-backdrop');
  if(backdrop && !backdrop._bound){
    backdrop._bound = true;
    backdrop.addEventListener('click', () => {
      closeAdminItemForm();
    });
  }

  /* ============================================================
     ═══ 7) زر الحفظ والنشر ═══
     ============================================================ */
  const save = $('af-save');
  if(save && !save._bound){
    save._bound = true;
    save.addEventListener('click', handleAdminItemSave);
  }

  /* ============================================================
     ═══ 8) الكود السري — يُسجّل مرة واحدة فقط ═══
     ============================================================ */
  if(!window._adminSecretBound){
    window._adminSecretBound = true;
    wireAdminSecretCode();
  }

  /* ============================================================
     ═══ 9) اختصار Ctrl+S لحفظ النموذج ═══
     ============================================================ */
  if(!window._adminShortcutsBound){
    window._adminShortcutsBound = true;
    window.addEventListener('keydown', e => {
      /* فقط عندما يكون النموذج مفتوحاً */
      const form = document.getElementById('admin-form');
      if(!form || form.style.display === 'none') return;

      if((e.ctrlKey || e.metaKey) && e.key === 's'){
        e.preventDefault();
        const saveBtn = document.getElementById('af-save');
        if(saveBtn) saveBtn.click();
      }
    });
  }
}

/* ============================================================
   ═══════════════ HELPERS ═══════════════
   ============================================================ */

/* ═══ 1) ربط كل أزرار فتح لوحة المشرف ═══ */
function wireAdminOpenButtons($){
  /* قائمة منسدلة: menu-admin-btn */
  const menuAdminBtn = $('menu-admin-btn');
  if(menuAdminBtn && !menuAdminBtn._bound){
    menuAdminBtn._bound = true;
    menuAdminBtn.addEventListener('click', () => {
      /* close home menu أولاً */
      const hm = document.getElementById('home-menu');
      if(hm) hm.classList.remove('open');

      showScreen('s-admin');
      if(typeof buildAdminPanel === 'function') buildAdminPanel();
      if(typeof Admin !== 'undefined' && Admin){
        if(!Admin.initialized) Admin.init();
        Admin.refreshAll();
      }
      Sfx.tap(); haptic(8);
    });
  }

  /* زر قديم محتمل: admin-btn */
  const legacyBtn = $('admin-btn');
  if(legacyBtn && !legacyBtn._bound){
    legacyBtn._bound = true;
    legacyBtn.addEventListener('click', () => {
      showScreen('s-admin');
      if(typeof buildAdminPanel === 'function') buildAdminPanel();
      if(typeof Admin !== 'undefined' && Admin){
        if(!Admin.initialized) Admin.init();
        Admin.refreshAll();
      }
      Sfx.tap(); haptic(8);
    });
  }

  /* عنصر قائمة data-menu="admin" */
  document.querySelectorAll('[data-menu="admin"]').forEach(item => {
    if(item._bound) return;
    item._bound = true;
    item.addEventListener('click', () => {
      const hm = document.getElementById('home-menu');
      if(hm) hm.classList.remove('open');

      showScreen('s-admin');
      if(typeof buildAdminPanel === 'function') buildAdminPanel();
      if(typeof Admin !== 'undefined' && Admin){
        if(!Admin.initialized) Admin.init();
        Admin.refreshAll();
      }
      Sfx.tap(); haptic(8);
    });
  });
}

/* ═══ 2) فتح نموذج إضافة عنصر ═══ */
/* ═══ 2) فتح نموذج إضافة عنصر ═══ */
function openAdminItemForm(){
  const $ = id => document.getElementById(id);

  const cat = (typeof Admin !== 'undefined' && Admin && Admin.contentTab)
    ? Admin.contentTab
    : currentAdminTab;
  currentAdminTab = cat;

  /* تصفير الحقول */
  const reset = (id, val) => { const el = $(id); if(el) el.value = val; };
  reset('af-name',       '');
  reset('af-name-en',    '');
  reset('af-rarity',     'common');
  reset('af-enabled',    'true');
  reset('af-color',      '#E07A3F');
  reset('af-color2',     '#E8B34E');
  reset('af-image-path', '');

  /* تصفير المعاينة */
  const preview = $('af-path-preview');
  if(preview){
    preview.innerHTML = '<span>لا توجد معاينة</span>';
    preview.classList.remove('err');
  }

  /* تصفير الحالة */
  const status = $('af-status');
  if(status){
    status.textContent = '';
    status.className = 'af-status';
  }

  /* تحديث التسميات */
  const catLabel = $('af-cat-label');
  if(catLabel){
    catLabel.textContent =
      (typeof CATEGORY_LABELS !== 'undefined' && CATEGORY_LABELS[cat]) || cat;
  }
  const pathCat = $('af-path-cat');
  if(pathCat){
    pathCat.textContent =
      (typeof CATEGORY_FOLDERS !== 'undefined' && CATEGORY_FOLDERS[cat]) || 'misc';
  }

  /* بناء محرر المصادر */
  if(typeof PLACEMENT_TYPES === 'undefined' || !PLACEMENT_TYPES ||
     Object.keys(PLACEMENT_TYPES).length === 0){
    if(typeof buildPlacementTypes === 'function'){
      PLACEMENT_TYPES = buildPlacementTypes();
    }
  }
  if(typeof buildSourcesEditor === 'function') buildSourcesEditor();

  /* ✅ الإصلاح: استخدم .active بدل style.display */
  const form = $('admin-form');
  if(form){
    form.classList.add('active');
    form.style.display = '';           /* ⬅️ نظّف أي inline style قديم */
    requestAnimationFrame(() => {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  Sfx.tap(); haptic(6);
}

/* ═══ 3) إغلاق نموذج إضافة عنصر ═══ */
function closeAdminItemForm(){
  const form = document.getElementById('admin-form');
  if(form){
    form.classList.remove('active');
    form.style.display = 'none';       /* ⬅️ أبقِ هذا للتوافق */
  }
}

/* ═══ 4) ربط حقول النموذج (معاينة الصورة) ═══ */
function wireAdminFormFields($){
  const pathInput = $('af-image-path');
  if(pathInput && !pathInput._bound){
    pathInput._bound = true;

    /* debounce بسيط */
    let timer = null;
    pathInput.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => updateAdminImagePreview(), 180);
    });
  }
}

/* ═══ 5) تحديث معاينة الصورة ═══ */
function updateAdminImagePreview(){
  const $ = id => document.getElementById(id);

  const pathInput = $('af-image-path');
  const preview   = $('af-path-preview');
  if(!pathInput || !preview) return;

  const val = pathInput.value.trim();

  if(!val){
    preview.innerHTML = '<span>لا توجد معاينة</span>';
    preview.classList.remove('err');
    return;
  }

  /* ═══ تحديد المصدر الكامل ═══ */
  const folder = (typeof CATEGORY_FOLDERS !== 'undefined' && CATEGORY_FOLDERS[currentAdminTab]) || 'misc';

  let src;
  if(val.startsWith('assets/') || val.startsWith('http') || val.startsWith('data:')){
    src = val;
  } else {
    src = 'assets/custom/' + folder + '/' + val.replace(/^\/+/, '');
  }

  /* ═══ اختبار التحميل ═══ */
  const testImg = new Image();
  testImg.onload = () => {
    preview.innerHTML = `<img src="${src}" alt="">`;
    preview.classList.remove('err');
  };
  testImg.onerror = () => {
    preview.innerHTML = '<span>⚠ لم يتم العثور على الملف</span>';
    preview.classList.add('err');
  };
  testImg.src = src;
}

/* ═══ 6) حفظ عنصر جديد (مع منع النقر المزدوج) ═══ */
let _adminSaving = false;

async function handleAdminItemSave(){
  if(_adminSaving) return;
  _adminSaving = true;

  const $ = id => document.getElementById(id);
  const status = $('af-status');
  const saveBtn = $('af-save');

  /* تعطيل الزر أثناء الحفظ */
  if(saveBtn){
    saveBtn.disabled = true;
    saveBtn.dataset._origText = saveBtn.textContent;
    saveBtn.textContent = '⏳ ...';
  }

  const setStatus = (msg, cls = '') => {
    if(status){
      status.textContent = msg;
      status.className = 'af-status ' + cls;
    }
  };

  try {
    /* ═══ جمع البيانات ═══ */
    const name      = ($('af-name')       ? $('af-name').value.trim()       : '');
    const nameEn    = ($('af-name-en')    ? $('af-name-en').value.trim()    : '') || name.toUpperCase();
    const rarity    = ($('af-rarity')     ? $('af-rarity').value            : 'common');
    const enabled   = ($('af-enabled')    ? $('af-enabled').value === 'true' : true);
    const color     = ($('af-color')      ? $('af-color').value             : '#E07A3F');
    const color2    = ($('af-color2')     ? $('af-color2').value            : '#E8B34E');
    const imagePath = ($('af-image-path') ? $('af-image-path').value.trim() : '');

    /* ═══ التحقق ═══ */
    if(!name){
      setStatus('✗ الاسم العربي مطلوب', 'err');
      Sfx.play(220, 0.15, 'sine', 0.05, 180); haptic(20);
      return;
    }
    if(!imagePath){
      setStatus('✗ مسار الصورة مطلوب', 'err');
      Sfx.play(220, 0.15, 'sine', 0.05, 180); haptic(20);
      return;
    }

    /* ═══ جمع الأماكن ═══ */
    const placements = (typeof collectPlacements === 'function')
      ? collectPlacements()
      : [];

    if(placements.length === 0){
      setStatus('✗ اختر مكاناً واحداً على الأقل', 'err');
      Sfx.play(220, 0.15, 'sine', 0.05, 180); haptic(20);
      return;
    }

    /* ═══ بناء العنصر ═══ */
    const cat = currentAdminTab;
    const item = {
      id:        'c_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      category:  cat,
      name,
      nameEn,
      rarity,
      color,
      color2,
      imagePath,
      enabled,
      placements,
      createdBy: (typeof Cloud !== 'undefined' && Cloud.user) ? Cloud.user.uid : 'local',
      createdAt: Date.now()
    };

    /* ═══ تحديد المفتاح ═══ */
    const key = ADMIN_KEY_MAP[cat];
    if(!key){
      setStatus('✗ تصنيف غير معروف: ' + cat, 'err');
      return;
    }

    if(!Save.data.admin[key]) Save.data.admin[key] = [];
    Save.data.admin[key].push(item);
    Save.save();

    /* ═══ حالة النشر ═══ */
    setStatus('⏳ جارٍ النشر لكل اللاعبين...', '');

/* ═══ النشر للسحابة ═══ */
let r = { ok: false, msg: 'pushAdminContent غير متاحة' };
if(typeof pushAdminContent === 'function'){
  r = await pushAdminContent();
}

if(r.ok){
  setStatus(`✓ تم النشر (${r.totalItems || 0} عنصر · ${r.sizeKB || 0}KB)`, 'ok');
  Sfx.reward(); haptic(20);
} else {
  /* ═══ اعرض الخطأ الفعلي في الـ status ═══ */
  const errMsg = (r.msg || 'غير معروف').split('\n')[0];
  setStatus('⚠ حُفظ محلياً — ' + errMsg, 'err');
  console.error('[handleAdminItemSave] Publish failed:', r);
  haptic(20);

  /* ═══ إذا كانت المشكلة في القواعد، اعرض toast مع زر نسخ ═══ */
  if(r.code === 'permission-denied' && typeof Toast !== 'undefined'){
    Toast.error('فشل النشر', 'تحقق من قواعد Firestore', {
      duration: 6000,
      action: {
        label: 'تفاصيل',
        callback: () => alert(r.msg)
      }
    });
  }
}

    /* ═══ تحديث القوائم ═══ */
    if(typeof Admin !== 'undefined' && Admin){
      if(Admin.initialized){
        Admin.renderContentList();
        Admin.renderContentStats();
        Admin.addActivity?.('🎨', `إضافة "${name}"`);
        Admin.logAudit?.('content', 'created', `➕ إضافة عنصر: ${name}`);
      }
    }
    if(typeof buildAdminContentList === 'function') buildAdminContentList();
    if(typeof refreshContentEverywhere === 'function') refreshContentEverywhere();

    /* ═══ إغلاق النموذج بعد فترة ═══ */
    setTimeout(() => closeAdminItemForm(), 1100);

  } catch(e){
    console.error('[handleAdminItemSave] Error:', e);
    setStatus('✗ خطأ: ' + (e.message || 'غير معروف'), 'err');
    haptic(20);
  } finally {
    _adminSaving = false;
    if(saveBtn){
      saveBtn.disabled = false;
      saveBtn.textContent = saveBtn.dataset._origText || '💾 حفظ ونشر';
    }
  }
}

/* ═══ 7) الكود السري (يُسجّل مرة واحدة) ═══ */
function wireAdminSecretCode(){
  let buffer = '';

  window.addEventListener('keydown', e => {
    /* تجاهل الكتابة داخل الحقول */
    const tag = (e.target && e.target.tagName || '').toLowerCase();
    if(tag === 'input' || tag === 'textarea') return;

    if(e.key.length !== 1) return;

    buffer += e.key;
    if(buffer.length > 40) buffer = buffer.slice(-40);

    /* ═══ تحقق من الكود ═══ */
    const secretCode = (typeof ADMIN_CONFIG !== 'undefined' && ADMIN_CONFIG.secretCode) || '';
    if(!secretCode || !buffer.endsWith(secretCode)) return;

    buffer = '';

    const entered = prompt('أدخل كود المشرف:');
    if(entered === null) return;

    if(entered === secretCode){
      if(typeof grantAdminAccess === 'function') grantAdminAccess();
      alert('✓ تم تفعيل صلاحية المشرف');
      showScreen('s-admin');
      if(typeof buildAdminPanel === 'function') buildAdminPanel();
      if(typeof Admin !== 'undefined' && Admin){
        if(!Admin.initialized) Admin.init();
        Admin.refreshAll();
      }
    } else {
      alert('✗ كود خاطئ');
    }
  });
}

function applyAdminEffects(){
  if(!Save.data.admin) return;
  const w = document.getElementById('wrap');
  if(!w) return;
  w.classList.toggle('unlimited-coins', !!Save.data.admin.unlimitedCoins);
  updateCoinsUI();
  updateGlobalLevelUI();
}

function refreshContentEverywhere(){
  try { buildShop(); } catch(e){}
  try { buildCosmetics(); } catch(e){}
}

function getAllSkins(){
  const custom = (Save.data.admin.customSkins || [])
    .filter(s => s.enabled !== false)
    .map(s => ({
      id: s.id,
      ar: s.name,
      en: s.nameEn || s.name,
      imageData: s.imageData || null,
      imagePath: s.imagePath || null,
      body: s.color || '#E07A3F',
      bodyDark: s.color2 || '#A05020',
      detail: '#1A1512',
      accent: s.color || '#E07A3F',
      price: (s.placements || []).find(p => p.type === 'shop')?.price || 0,
      rarity: s.rarity || 'common',
      placements: s.placements || [],
      isCustom: true
    }));

  return [DEFAULT_SKIN, ...custom];
}

function getAllCosmetics(cat){
  const base = (typeof COSMETICS !== 'undefined' && COSMETICS[cat]) || [];

  /* ═══ مفتاح الأدمن الموحّد ═══ */
  const key = 'custom' + cat.charAt(0).toUpperCase() + cat.slice(1);
  const customRaw = (Save.data.admin && Save.data.admin[key]) || [];

  const custom = customRaw
    .filter(c => c.enabled !== false)
    .map(c => ({
      id: c.id,
      name: c.name || c.nameEn || 'بدون اسم',
      price: (c.placements || []).find(p => p.type === 'shop')?.price || 0,
      desc: c.nameEn || c.name || '',
      color: c.color,
      color2: c.color2,
      rarity: c.rarity || 'common',
      imagePath: c.imagePath || null,
      imageData: c.imageData || null,
      placements: c.placements || [],
      isCustom: true,
      category: cat
    }));

  return [...base, ...custom];
}

/* ============================================================
   ==================== Wire game buttons ====================
   ============================================================ */
function wireGameButtons() {
  const $ = id => document.getElementById(id);
  const safe = (id, fn) => { const el = $(id); if (el) el.addEventListener('click', fn); };

  safe('play-btn', startGame);
  safe('resume-btn', resumeGame);
  safe('restart-btn', startGame);
  safe('quit-btn', quitToMenu);
  safe('retry-btn', startGame);
  safe('home-btn', quitToMenu);
  safe('pause-btn', e => {
    e.stopPropagation();
    if(G.state === 'PLAYING') pauseGame();
  });
safe('reset-btn', async () => {
  if(!confirm('⚠️ سيتم حذف تقدمك من Firebase نهائياً. هل أنت متأكد؟')) return;
  if(!confirm('تأكيد أخير: لا يمكن التراجع عن هذه العملية!')) return;

  Save.reset();   // تصفير الذاكرة + دفع للسحابة

  Sfx.tap(); haptic(20);
  alert('✓ تم حذف التقدم من السحابة');

  /* أعد تحميل الصفحة ليعاد التحميل من Firebase */
  location.reload();
});
  safe('global-lvl-btn', () => {
    showScreen('s-stats');
    buildStats();
    Sfx.tap(); haptic(6);
  });

  document.querySelectorAll('[data-back]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      Sfx.tap(); haptic(6);
      showScreen('s-home');
      buildHome();
    });
  });

  /* ✅ الإصلاح 2: معالج موحد لكل الأزرار data-page */
  document.querySelectorAll('.qa-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const page = btn.dataset.page;
      if(!page) return;
      Sfx.tap(); haptic(6);
      if(page==='shop'){ buildShop(); showScreen('s-shop'); }
      else if(page==='cosmetics'){
        currentCosTab='spark';
        document.querySelectorAll('#cos-tabs .tab-chip').forEach((t,i)=>{t.classList.toggle('active', i===0);});
        buildCosmetics();
        showScreen('s-cosmetics');
      }
      else if(page==='achieve'){ buildAchievements(); showScreen('s-achieve'); }
      else if(page==='stats'){ buildStats(); showScreen('s-stats'); }
      else if(page==='settings'){ buildSettings(); showScreen('s-settings'); }
      else if(page==='quests'){ buildMissions('daily'); document.querySelectorAll('#quest-tabs .tab-chip').forEach((t,i)=>{t.classList.toggle('active', i===0);}); showScreen('s-quests'); }
      else if(page==='season'){ buildSeason(); showScreen('s-season'); }
      else if(page==='battlepass'){ buildBP(); showScreen('s-battlepass'); }
      else if(page==='daily'){ buildDaily(); showScreen('s-daily'); }
      else if(page==='powerups'){ buildPowerups(); showScreen('s-powerups'); }
      else if(page==='events'){ buildEvents(); showScreen('s-events'); }
    });
  });

document.querySelectorAll('#cos-tabs .tab-chip, #cos-tabs-aesthetic .tab-chip').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    /* إزالة active من الكل */
    document.querySelectorAll('#cos-tabs .tab-chip, #cos-tabs-aesthetic .tab-chip')
      .forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentCosTab = tab.dataset.cat;
    buildCosmetics();
    Sfx.tap();
  });
});

  document.querySelectorAll('#quest-tabs .tab-chip').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      document.querySelectorAll('#quest-tabs .tab-chip').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      buildMissions(tab.dataset.tab);
      Sfx.tap();
    });
  });

  safe('claim-daily-btn', () => {
    if(!canClaimDaily()) return;
    const dl = Save.data.dailyLogin;
    checkDailyReset();
    const dayIdx = dl.streak % 7;
    const rw = LOGIN_REWARDS[dayIdx];
    Save.data.coins += rw.value;
    Save.data.stats.totalCoins += rw.value;
    dl.streak += 1;
    dl.lastClaim = today();
    Save.save();
    updateCoinsUI();
    buildDaily();
    Sfx.reward();
    haptic(20);
    showRewardModal('🎁', 'DAILY LOGIN · DAY ' + (dayIdx+1), '◆ ' + rw.value, 'سلسلة ' + dl.streak + ' أيام', null);
  });

  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden && G.state === 'PLAYING') pauseGame();
  });

window.addEventListener('keydown', e=>{
  if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)){
    e.preventDefault();
  }
});

    /* ═══════════════ HOME MENU ═══════════════ */
  const menuBtn = $('menu-btn');
  const homeMenu = $('home-menu');

  if(menuBtn && homeMenu){
    const closeMenu = () => {
      homeMenu.classList.remove('open');
    };

    menuBtn.addEventListener('click', e => {
      e.stopPropagation();
      homeMenu.classList.toggle('open');
      Sfx.tap(); haptic(6);
    });

    const backdrop = homeMenu.querySelector('.home-menu-backdrop');
    if(backdrop) backdrop.addEventListener('click', closeMenu);

    homeMenu.querySelectorAll('.hm-item').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.dataset.menu;
        closeMenu();
        Sfx.tap(); haptic(6);

        if(action === 'player-card'){
          buildPlayerCard();
          showScreen('s-player-card');
        } else if(action === 'stats'){
          buildStats();
          showScreen('s-stats');
        } else if(action === 'settings'){
          buildSettings();
          showScreen('s-settings');
        } else if(action === 'admin'){
          showScreen('s-admin');
          buildAdminPanel();
        }
      });
    });

    /* إغلاق بزر Escape */
    window.addEventListener('keydown', e => {
      if(e.code === 'Escape' && homeMenu.classList.contains('open')){
        closeMenu();
      }
    });
  }
}

/* Override buildSettings to include profile refresh */
const _origBuildSettings = buildSettings;
buildSettings = function() {
  _origBuildSettings();
  try { updateProfileUI(); } catch(e){}
};

function buildBP(){
  const tier = getBPTier();
  const pts = Save.data.season.points;
  document.getElementById('bp-tier').textContent = tier + '/' + BP_TIERS;
  document.getElementById('bp-points').textContent = pts;
  const prog = clamp((pts % BP_TIER_POINTS) / BP_TIER_POINTS, 0, 1) * 100;
  document.getElementById('bp-prog').style.width = (tier >= BP_TIERS ? 100 : prog) + '%';

  const list = document.getElementById('bp-tiers');
  list.innerHTML = '';

  for(let i=1;i<=BP_TIERS;i++){
    const unlocked = i <= tier;
    const claimedFree = Save.data.battlePass.claimedFree.includes(i);
    const claimedPrem = Save.data.battlePass.claimedPremium.includes(i);

    /* ═══ عناصر مخصصة لهذا المستوى ═══ */
    const freeCustom = getBattlePassItems(i, 'free');
    const premCustom = getBattlePassItems(i, 'premium');

    const el = document.createElement('div');
    el.className = 'bp-tier-row' + (unlocked ? ' unlocked' : ' locked');

    /* عرض العناصر المخصصة */
    const freeCustomHtml = freeCustom.map(({item}) => 
      `<div class="bp-custom-item" style="--bc:${item.color};">
        <span class="bp-ci-ic">🎁</span>
        <span class="bp-ci-name">${item.name}</span>
      </div>`
    ).join('');

    const premCustomHtml = premCustom.map(({item}) => 
      `<div class="bp-custom-item" style="--bc:${item.color};">
        <span class="bp-ci-ic">👑</span>
        <span class="bp-ci-name">${item.name}</span>
      </div>`
    ).join('');

    el.innerHTML = `
      <div class="bp-tier-num">${i}</div>
      <div class="bp-rewards">
        <div class="bp-reward${claimedFree ? ' claimed' : ''}">
          <span class="ic">◆</span>
          <span>${5 + i*2}</span>
          <span class="k">FREE</span>
          ${freeCustomHtml}
        </div>
        <div class="bp-reward premium${claimedPrem ? ' claimed' : ''}">
          <span class="ic">🎁</span>
          <span>SOON</span>
          <span class="k">PREMIUM</span>
          ${premCustomHtml}
        </div>
      </div>`;
    list.appendChild(el);
  }
}

/* ============================================================
   ============================================================
   ============ MULTIPLAYER v2 — PROFESSIONAL ================
   ============================================================
   ============================================================ */

const MP_CONFIG = {
  collection: 'mp_rooms_v3',
  codeLength: 6,
  codeChars: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789',
  syncRateMs: 66,
  countdownMs: 3200,
  maxPlayers: 2,
  reconnTimeoutMs: 20000,
  rematchWindowMs: 90000,
  emojis: ['👋','🔥','😂']    // 👈 3 فقط لعرض عمودي أنيق
};

const MP = {
  active: false,
  roomId: null,
  roomCode: null,
  roomSeed: 0,
  isHost: false,
  roomData: null,
  otherPlayers: new Map(),

  roomUnsub: null,
  playersUnsub: null,

  syncTimer: null,
  latencyTimer: null,
  lastSyncAt: 0,
  ping: 0,
  pingSamples: [],

  remoteStates: {},
  localLastState: null,
  clientTimeOffset: 0,

  countdownEndsAt: 0,
  countdownShown: -1,
  countdownActive: false,

  countdownTimer: null,   // 👈 أضف هذا السطر
  countdownLoopActive: false,  // 👈 وأضف هذا السطر

  starting: false,
  resultShown: false,
  round: 1,
  bestOf: 3,
  hostWins: 0,
  guestWins: 0,

  connectionState: 'connected',

  emojiCooldown: 0,
  lastEmojiAt: 0,

  opponentAlive: true,
  opponentMeters: 0,
  opponentCoins: 0,

  // throttling
  lastPushAt: 0,

  // ربط تشغيلي
  bound: false
};

/* ═══════════════ دوال مساعدة ═══════════════ */
function mpGenerateRoomCode(){
  let code = '';
  for(let i = 0; i < MP_CONFIG.codeLength; i++){
    code += MP_CONFIG.codeChars.charAt(
      Math.floor(Math.random() * MP_CONFIG.codeChars.length)
    );
  }
  return code;
}

function mpEscape(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[c]));
}

function mpGenerateSeed(){
  return Math.floor(Math.random() * 0xFFFFFFFF) >>> 0;
}

async function mpFindUnusedCode(){
  /* ✅ نبني كوداً فريداً مع لاحقة عشوائية إضافية لتقليل التصادم */
  const baseCode = mpGenerateRoomCode();
  
  /* ⏱️ استعلام واحد فقط مع timeout صارم */
  try {
    const queryPromise = Cloud.db.collection(MP_CONFIG.collection)
      .where('code', '==', baseCode)
      .limit(1)
      .get();
    
    const timeoutPromise = new Promise(resolve => 
      setTimeout(() => resolve({ _timeout: true }), 350)
    );
    
    const result = await Promise.race([queryPromise, timeoutPromise]);
    
    /* إذا فشل الاستعلام بالـ timeout، استخدم الكود على أي حال */
    if(result._timeout) return baseCode;
    
    /* إذا لم توجد غرفة بهذا الكود — ممتاز */
    if(!result || result.empty) return baseCode;
  } catch(e){
    /* فشل الاستعلام (عدم وجود Index مثلاً) → استخدم الكود */
    console.warn('[MP] Code check skipped:', e.message);
    return baseCode;
  }
  
  /* في حالة نادرة جداً (تصادم): أضف حرفاً عشوائياً مختلفاً */
  const lastCharIdx = Math.floor(Math.random() * MP_CONFIG.codeChars.length);
  return baseCode.slice(0, MP_CONFIG.codeLength - 1) + 
         MP_CONFIG.codeChars.charAt(lastCharIdx);
}

/* ═══════════════ إنشاء غرفة ═══════════════ */
async function mpCreateRoom(mode){
  if(!Cloud.user){ alert('يجب تسجيل الدخول أولاً'); return; }
  if(MP.active) await mpLeaveRoom();

  const code = await mpFindUnusedCode();
  const seed = mpGenerateSeed();
  const uid = Cloud.user.uid;
  const name = (Cloud.profile && Cloud.profile.username) || 'لاعب';
  const skinId = Save.data.currentSkin;
  const roomMode = mode || Save.data.mode || 'FLIP';

  try {
    const ref = Cloud.db.collection(MP_CONFIG.collection).doc();
    const roomId = ref.id;

    await ref.set({
      code,
      seed,
      hostUid: uid,
      hostName: name,
      hostSkin: skinId,
      guestUid: null,
      guestName: null,
      guestSkin: null,
      status: 'waiting',
      mode: roomMode,
      bestOf: 3,
      round: 1,
      hostWins: 0,
      guestWins: 0,
      hostScore: 0,
      guestScore: 0,
      roundWinner: null,
      matchWinner: null,
      countdownEndsAt: null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      startedAt: null,
      finishedAt: null,
      heartbeatAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    await ref.collection('players').doc(uid).set({
      uid, name, skin: skinId, isHost: true,
      meters: 0, coins: 0, alive: true,
      xRatio: 0.26, yRatio: 0.5, rot: 0,
      vx: 0, vy: 0,
      mode: roomMode,
      clientTime: Date.now(),
      lastEmoji: null,
      lastEmojiAt: 0,
      joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    });

    MP.active = true;
    MP.roomId = roomId;
    MP.roomCode = code;
    MP.roomSeed = seed;
    MP.isHost = true;
    MP.resultShown = false;
    MP.countdownActive = false;
    MP.round = 1;
    MP.hostWins = 0;
    MP.guestWins = 0;

    mpAttachListeners();
    showScreen('s-multiplayer-waiting');
    mpBuildWaitingRoom();
    mpStartLatencyProbe();

    Sfx.reward(); haptic(20);
  } catch(e){
    console.error('[MP] Create failed:', e);
    alert('تعذر إنشاء الغرفة: ' + (e.message || 'خطأ'));
  }
}

/* ═══════════════ الانضمام ═══════════════ */
async function mpJoinRoom(code){
  if(!Cloud.user){ alert('يجب تسجيل الدخول أولاً'); return; }
  code = String(code || '').trim().toUpperCase();
  if(code.length !== MP_CONFIG.codeLength){ alert('كود غير صحيح'); return; }
  if(MP.active) await mpLeaveRoom();

  let roomDoc = null;
  let roomId = null;
  let data = null;

  try {
    console.log('[MP] Searching room with code:', code);

    /* ✅ استعلام بحقل واحد فقط (لا يحتاج Composite Index) */
    const snap = await Cloud.db.collection(MP_CONFIG.collection)
      .where('code', '==', code)
      .limit(10)
      .get();

    console.log('[MP] Found docs:', snap.size);

    /* ✅ فلترة محلية للنشطة فقط */
    const myUid = Cloud.user.uid;

    for(const doc of snap.docs){
      const d = doc.data();
      console.log('[MP] Candidate:', doc.id, '| status:', d.status, '| host:', d.hostUid);

      /* تجاهل الغرف المنتهية أو غرفي أنا */
      if(d.status !== 'waiting' && d.status !== 'countdown') continue;
      if(d.hostUid === myUid) continue;

      /* اقبل الغرفة الأولى الصالحة */
      roomDoc = doc;
      roomId = doc.id;
      data = d;
      break;
    }

    if(!roomDoc){
      alert('لا توجد غرفة متاحة بهذا الكود (قد تكون ممتلئة أو بدأ السباق)');
      return;
    }

    /* تحقق من الامتلاء */
    if(data.guestUid && data.guestUid !== myUid){
      alert('الغرفة ممتلئة');
      return;
    }

    const name = (Cloud.profile && Cloud.profile.username) || 'لاعب';
    const skinId = Save.data.currentSkin;

    console.log('[MP] Joining room:', roomId);

    /* ✅ تحديث الغرفة — قد يفشل إذا كانت القواعد تمنع */
    try {
      await Cloud.db.collection(MP_CONFIG.collection).doc(roomId).update({
        guestUid: myUid,
        guestName: name,
        guestSkin: skinId
      });
    } catch(updateErr){
      console.error('[MP] Update room failed:', updateErr);
      alert('فشل تحديث الغرفة: ' + (updateErr.code || updateErr.message));
      return;
    }

    console.log('[MP] Room updated with guest');

    /* ✅ إضافة وثيقة اللاعب */
    try {
      await Cloud.db.collection(MP_CONFIG.collection).doc(roomId)
        .collection('players').doc(myUid).set({
          uid: myUid, name, skin: skinId, isHost: false,
          meters: 0, coins: 0, alive: true,
          xRatio: 0.26, yRatio: 0.5, rot: 0,
          vx: 0, vy: 0,
          mode: data.mode || 'FLIP',
          clientTime: Date.now(),
          lastEmoji: null, lastEmojiAt: 0,
          joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch(playerErr){
      console.error('[MP] Create player doc failed:', playerErr);
      /* حاول تنظيف التحديث السابق */
      try {
        await Cloud.db.collection(MP_CONFIG.collection).doc(roomId).update({
          guestUid: null, guestName: null, guestSkin: null
        });
      } catch(_){}
      alert('فشل إنشاء وثيقة اللاعب: ' + (playerErr.code || playerErr.message));
      return;
    }

    console.log('[MP] Player doc created');

    MP.active = true;
    MP.roomId = roomId;
    MP.roomCode = code;
    MP.roomSeed = data.seed || 0;
    MP.isHost = false;
    MP.resultShown = false;
    MP.countdownActive = false;
    MP.round = data.round || 1;
    MP.hostWins = data.hostWins || 0;
    MP.guestWins = data.guestWins || 0;

    mpAttachListeners();
    showScreen('s-multiplayer-waiting');
    mpBuildWaitingRoom();
    mpStartLatencyProbe();

    Sfx.reward(); haptic(20);
  } catch(e){
    console.error('[MP] Join failed:', e);
    alert('تعذر الانضمام: ' + (e.code || e.message || 'خطأ غير معروف'));
  }
}

/* ═══════════════ مغادرة ═══════════════ */
async function mpLeaveRoom(){
  if(!MP.active) return;

  /* 👇👇👇 أضف هذا الجزء 👇👇👇 */
  /* ✅ نظّف مؤقت العد التنازلي */
  if(MP.countdownTimer){
    clearTimeout(MP.countdownTimer);
    MP.countdownTimer = null;
  }
  MP.countdownLoopActive = false;
  MP.countdownActive = false;

  const countdownEl = document.getElementById('mp-countdown');
  if(countdownEl) countdownEl.style.display = 'none';
  /* 👆👆👆 نهاية الإضافة 👆👆👆 */

  const roomId = MP.roomId;
  const uid = Cloud.user ? Cloud.user.uid : null;
  const wasHost = MP.isHost;

  mpDetachListeners();
  mpStopSync();
  mpStopLatencyProbe();

  MP.active = false;
  MP.roomId = null;
  MP.roomCode = null;
  MP.isHost = false;
  MP.roomData = null;
  MP.otherPlayers.clear();
  MP.remoteStates = {};
  MP.resultShown = false;
  MP.starting = false;
  MP.countdownActive = false;
  MP.countdownShown = -1;

  if(roomId && uid && Cloud.db){
    try {
      const roomRef = Cloud.db.collection(MP_CONFIG.collection).doc(roomId);
      const roomSnap = await roomRef.get();
      if(!roomSnap.exists) return;
      const data = roomSnap.data();

      if(wasHost || data.hostUid === uid){
        const playersSnap = await roomRef.collection('players').get();
        const batch = Cloud.db.batch();
        playersSnap.forEach(d => batch.delete(d.ref));
        batch.delete(roomRef);
        await batch.commit().catch(async ()=>{
          try { await roomRef.delete(); } catch(_){}
        });
      } else {
        await roomRef.update({
          guestUid: null, guestName: null, guestSkin: null,
          status: 'waiting',
          countdownEndsAt: null,
          startedAt: null
        }).catch(()=>{});
        await roomRef.collection('players').doc(uid).delete().catch(()=>{});
      }
    } catch(e){ console.warn('[MP] cleanup:', e); }
  }

  MP.connectionState = 'connected';
  mpUpdateConnectionBadge();
}

/* ═══════════════ بدء السباق ═══════════════ */
async function mpStartRace(){
  if(!MP.active || !MP.isHost) return;
  if(!MP.roomData || !MP.roomData.guestUid) return;
  try {
    const countdownEndsAt = Date.now() + MP_CONFIG.countdownMs;
    await Cloud.db.collection(MP_CONFIG.collection).doc(MP.roomId).update({
      status: 'countdown',
      countdownEndsAt,
      startedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    Sfx.reward(); haptic(20);
  } catch(e){
    console.error('[MP] Start failed:', e);
    alert('تعذر بدء السباق');
  }
}

/* ═══════════════ المستمعون ═══════════════ */
function mpAttachListeners(){
  mpDetachListeners();
  if(!MP.roomId || !Cloud.db) return;

  const roomRef = Cloud.db.collection(MP_CONFIG.collection).doc(MP.roomId);

  MP.roomUnsub = roomRef.onSnapshot(snap => {
    if(!snap.exists){
      if(MP.active){
        alert('انتهت الغرفة');
        mpLeaveRoom();
        showScreen('s-home'); buildHome();
      }
      return;
    }
    const data = snap.data();
    const prevStatus = MP.roomData ? MP.roomData.status : null;
    MP.roomData = data;
    MP.roomSeed = data.seed || MP.roomSeed;
    MP.round = data.round || 1;
    MP.hostWins = data.hostWins || 0;
    MP.guestWins = data.guestWins || 0;

    /* ✅ العد التنازلي */
    if(data.status === 'countdown' && data.countdownEndsAt){
      const isNewCountdown = (MP.countdownEndsAt !== data.countdownEndsAt);

      MP.countdownEndsAt = data.countdownEndsAt;
      MP.countdownActive = true;

      /* أظهر الـ overlay مرة واحدة فقط */
      if(isNewCountdown){
        MP.countdownShown = -1;
        if(document.getElementById('s-multiplayer-waiting').classList.contains('active')){
          mpShowCountdownOverlay();
        }

        /* ✅ الأهم: جدوِل بدء اللعبة بعد انتهاء العد التنازلي */
        if(MP.countdownTimer) clearTimeout(MP.countdownTimer);
        const delayMs = Math.max(0, data.countdownEndsAt - Date.now()) + 150;

        MP.countdownTimer = setTimeout(() => {
          MP.countdownTimer = null;
          if(MP.active && !MP.starting){
            console.log('[MP] Countdown ended → starting game');
            mpStartMyGame();
          }
        }, delayMs);
      }
    }

    /* ✅ نهاية الجولة */
    if((data.status === 'round_end' || data.status === 'finished') && !MP.resultShown){
      MP.resultShown = true;
      mpShowResult();
    }

    /* ✅ إعادة المباراة */
    if(data.status === 'waiting' && prevStatus !== 'waiting' && MP.resultShown){
      MP.resultShown = false;
      MP.countdownActive = false;
      mpResetRoundState();
      showScreen('s-multiplayer-waiting');
      mpBuildWaitingRoom();
    }

    if(document.getElementById('s-multiplayer-waiting').classList.contains('active')){
      mpBuildWaitingRoom();
    }
  }, err => console.warn('[MP] room listener:', err));

  MP.playersUnsub = roomRef.collection('players').onSnapshot(snap => {
    const now = Date.now();
    MP.otherPlayers.clear();
    const myUid = Cloud.user ? Cloud.user.uid : null;

    snap.forEach(d => {
      const data = d.data();
      MP.otherPlayers.set(d.id, data);

      if(d.id !== myUid){
        // ✅ تخزين الحالة السابقة والحالية للاستيفاء
        const prev = MP.remoteStates[d.id];
        MP.remoteStates[d.id] = {
          prev: prev ? prev.curr : data,
          curr: data,
          receivedAt: now,
          prevReceivedAt: prev ? prev.receivedAt : now - 66
        };

        MP.opponentAlive = !!data.alive;
        MP.opponentMeters = data.meters || 0;
        MP.opponentCoins = data.coins || 0;

        // ✅ قياس ping (round-trip)
        if(data.pingEcho && data.pingEcho.clientTime){
          const rtt = now - data.pingEcho.clientTime;
          if(rtt > 0 && rtt < 2000){
            MP.pingSamples.push(rtt);
            if(MP.pingSamples.length > 6) MP.pingSamples.shift();
            MP.ping = Math.round(
              MP.pingSamples.reduce((a,b)=>a+b,0) / MP.pingSamples.length
            );
            mpUpdateConnectionBadge();
          }
        }

        // ✅ إيموجي
        if(data.lastEmoji && data.lastEmojiAt > MP.lastEmojiAt){
          MP.lastEmojiAt = data.lastEmojiAt;
          mpShowOpponentEmoji(data.lastEmoji);
        }
      }
    });

    if(document.getElementById('s-multiplayer-waiting').classList.contains('active')){
      mpBuildWaitingRoom();
    }
  }, err => console.warn('[MP] players listener:', err));
}

function mpDetachListeners(){
  if(MP.roomUnsub){ try { MP.roomUnsub(); } catch(_){} MP.roomUnsub = null; }
  if(MP.playersUnsub){ try { MP.playersUnsub(); } catch(_){} MP.playersUnsub = null; }
}

/* ═══════════════ بدء لعبتي ═══════════════ */
function mpStartMyGame(){
  if(MP.starting) return;
  MP.starting = true;
  MP.countdownActive = false;
  MP.resultShown = false;

  const roomMode = (MP.roomData && MP.roomData.mode) || 'FLIP';
  Save.data.mode = roomMode;

  setWorldSeed(MP.roomSeed);

  startGame();
  setWorldSeed(MP.roomSeed);

  mpStartSync();

  /* 👇👇👇 أضف هذا السطر هنا 👇👇👇 */
  const emojiBar = document.getElementById('mp-emoji-bar');
  if(emojiBar) emojiBar.style.display = 'flex';

  setTimeout(()=>{ MP.starting = false; }, 2000);
}

/* ============================================================
   MULTIPLAYER SYNC v3 — Delta-based, throttled, robust
   ============================================================ */

function mpStartSync(){
  mpStopSync();
  MP.lastPushAt = 0;
  MP.lastPushedState = null;
  MP.pendingPush = false;

  /* ✅ 30Hz (33ms) بدل 15Hz — أقل بكثير من حد Firestore */
  MP.syncTimer = setInterval(() => {
    mpPushMyState().catch(()=>{});
  }, 33);
}

function mpStopSync(){
  if(MP.syncTimer){
    clearInterval(MP.syncTimer);
    MP.syncTimer = null;
  }
  MP.pendingPush = false;
}

async function mpPushMyState(){
  if(!MP.active || !MP.roomId || !Cloud.user || !Cloud.db) return;
  if(G.state !== 'PLAYING' && G.state !== 'OVER') return;
  if(MP.pendingPush) return;   /* ✅ لا تتراكم الطلبات */

  const uid = Cloud.user.uid;
  const now = Date.now();

  /* ═══ بناء حالة مختصرة ═══ */
  const myMeters = getMeters();
  const myCoins = G.runCoins;
  const myAlive = G.state === 'PLAYING';
  const xRatio = clamp(P.x / Math.max(1, W), 0, 1);
  const yRatio = clamp(P.y / Math.max(1, H), 0, 1);
  const rot = P.rot || 0;
  const mode = G.mode;

  /* ═══ تجاهل التحديثات غير المتغيرة ═══ */
  const prev = MP.lastPushedState;
  if(prev &&
     prev.meters === myMeters &&
     prev.coins === myCoins &&
     prev.alive === myAlive &&
     Math.abs(prev.xRatio - xRatio) < 0.002 &&
     Math.abs(prev.yRatio - yRatio) < 0.002 &&
     Math.abs(prev.rot - rot) < 0.02 &&
     prev.mode === mode){
    return;   /* ⛔ لا داعي للكتابة */
  }

  MP.pendingPush = true;
  MP.lastPushedState = { meters: myMeters, coins: myCoins, alive: myAlive,
                         xRatio, yRatio, rot, mode };

  try {
    /* ✅ استخدم set مع merge لتجنب الفشل إذا لم تكن الوثيقة موجودة */
    await Cloud.db.collection(MP_CONFIG.collection).doc(MP.roomId)
      .collection('players').doc(uid).set({
        meters: myMeters,
        coins: myCoins,
        alive: myAlive,
        xRatio,
        yRatio,
        rot,
        mode,
        clientTime: now,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
  } catch(e){
    console.warn('[MP] push failed:', e.code || e.message);
  } finally {
    MP.pendingPush = false;
  }
}

/* ═══════════════ قياس ping ═══════════════ */
function mpStartLatencyProbe(){
  mpStopLatencyProbe();
  MP.latencyTimer = setInterval(async () => {
    if(!MP.active || !MP.roomId || !Cloud.user || !Cloud.db) return;
    const uid = Cloud.user.uid;
    try {
      // ✅ نكتب في وثيقتنا فقط — لكن نقرأ وثيقة الخصم لقياس RTT
      // الحيلة: نرسل clientTime في وثيقتنا، الخصم يقرأها ويعيد إرسالها في pingEcho
      await Cloud.db.collection(MP_CONFIG.collection).doc(MP.roomId)
        .collection('players').doc(uid).update({
          pingEcho: {
            clientTime: Date.now(),
            from: uid
          }
        });

      // ✅ إعادة إرسال pingEcho الخاص بالخصم إذا وُجد
      const mySnap = await Cloud.db.collection(MP_CONFIG.collection).doc(MP.roomId)
        .collection('players').doc(uid).get();
      if(!mySnap.exists) return;
    } catch(e){ /* silent */ }
  }, 3000);
}

function mpStopLatencyProbe(){
  if(MP.latencyTimer){
    clearInterval(MP.latencyTimer);
    MP.latencyTimer = null;
  }
}

/* ═══════════════ إشعار الموت + تحديد الفائز ═══════════════ */
async function mpNotifyDeath(){
  if(!MP.active || !MP.roomId || !Cloud.user || !Cloud.db) return;

  const uid = Cloud.user.uid;
  const myMeters = getMeters();
  const myCoins = G.runCoins;

  try {
    const roomRef = Cloud.db.collection(MP_CONFIG.collection).doc(MP.roomId);

    await roomRef.collection('players').doc(uid).update({
      meters: myMeters,
      coins: myCoins,
      alive: false,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    });

    // ✅ ننتظر قليلاً لالتقاط موت الخصم إن مات في نفس اللحظة
    await new Promise(r => setTimeout(r, 350));

    const playersSnap = await roomRef.collection('players').get();
    let opponentUid = null, opponentMeters = 0, opponentAlive = false;

    playersSnap.forEach(d => {
      if(d.id !== uid){
        opponentUid = d.id;
        const data = d.data();
        opponentMeters = data.meters || 0;
        opponentAlive = !!data.alive;
      }
    });

    if(!opponentUid) return;

    let winnerUid = null;
    if(opponentAlive){
      winnerUid = opponentUid;
    } else {
      if(myMeters > opponentMeters) winnerUid = uid;
      else if(opponentMeters > myMeters) winnerUid = opponentUid;
      else winnerUid = null;
    }

    const fresh = await roomRef.get();
    if(!fresh.exists) return;
    const rd = fresh.data();
    if(rd.status === 'finished' || rd.status === 'round_end') return;

    const isHostWinner = winnerUid === rd.hostUid;
    const isGuestWinner = winnerUid === rd.guestUid;
    const newHostWins = (rd.hostWins || 0) + (isHostWinner ? 1 : 0);
    const newGuestWins = (rd.guestWins || 0) + (isGuestWinner ? 1 : 0);

    const winsNeeded = Math.ceil((rd.bestOf || 3) / 2);
    const matchOver = newHostWins >= winsNeeded || newGuestWins >= winsNeeded;

    await roomRef.update({
      status: matchOver ? 'finished' : 'round_end',
      finishedAt: firebase.firestore.FieldValue.serverTimestamp(),
      roundWinner: winnerUid,
      matchWinner: matchOver ? winnerUid : null,
      hostWins: newHostWins,
      guestWins: newGuestWins,
      hostScore: rd.hostUid === uid ? myMeters : opponentMeters,
      guestScore: rd.guestUid === uid ? myMeters : opponentMeters
    });
  } catch(e){
    console.warn('[MP] death notify:', e);
  }
}

/* ═══════════════ غرفة الانتظار ═══════════════ */
function mpBuildWaitingRoom(){
  if(!MP.roomData) return;

  const codeEl = document.getElementById('mp-room-code');
  if(codeEl) codeEl.textContent = MP.roomCode || '—';

  const slots = document.getElementById('mp-slots');
  if(!slots) return;

  const host = {
    name: MP.roomData.hostName,
    skin: MP.roomData.hostSkin,
    uid: MP.roomData.hostUid
  };
  const guest = MP.roomData.guestUid ? {
    name: MP.roomData.guestName,
    skin: MP.roomData.guestSkin,
    uid: MP.roomData.guestUid
  } : null;

  const myUid = Cloud.user ? Cloud.user.uid : null;

  const renderSlot = (player, label) => {
    if(!player){
      return `<div class="mp-slot mp-empty">
        <div class="mp-slot-avatar">?</div>
        <div class="mp-slot-name">بانتظار لاعب...</div>
        <div class="mp-slot-label">${label}</div>
      </div>`;
    }
    const sk = getAllSkins().find(s => s.id === player.skin) || SKINS[0];
    const gradient = `radial-gradient(circle at 30% 30%,
      ${mixColor(sk.body, '#FFFFFF', 0.4)},
      ${sk.body} 55%, ${sk.bodyDark})`;
    const isMe = myUid === player.uid;
    return `<div class="mp-slot${isMe ? ' mp-me' : ''}">
      <div class="mp-slot-avatar" style="background:${gradient};"></div>
      <div class="mp-slot-name">${mpEscape(player.name || 'لاعب')}</div>
      <div class="mp-slot-label">${label}${isMe ? ' · أنت' : ''}</div>
      ${isMe ? '<div class="mp-you-badge">YOU</div>' : ''}
    </div>`;
  };

  const hostLabel = myUid === host.uid ? 'المضيف' : 'المضيف';
  const guestLabel = !guest ? 'ضيف' : 'الضيف';

  // ✅ شريط الانتصارات
  const scoreBar = `<div class="mp-score-bar">
    <div class="mp-score-side ${MP.hostWins > MP.guestWins ? 'leading' : ''}">
      <div class="mp-score-num">${MP.hostWins}</div>
      <div class="mp-score-lbl">HOST</div>
    </div>
    <div class="mp-score-vs">BO${MP.roomData.bestOf || 3}</div>
    <div class="mp-score-side ${MP.guestWins > MP.hostWins ? 'leading' : ''}">
      <div class="mp-score-num">${MP.guestWins}</div>
      <div class="mp-score-lbl">GUEST</div>
    </div>
  </div>`;

  slots.innerHTML = `
    ${renderSlot(host, hostLabel)}
    <div class="mp-vs">VS</div>
    ${renderSlot(guest, guestLabel)}
  `;

  const scoreEl = document.getElementById('mp-score-display');
  if(scoreEl) scoreEl.innerHTML = scoreBar;

  const startBtn = document.getElementById('mp-start-btn');
  if(startBtn){
    const canStart = MP.isHost && !!MP.roomData.guestUid;
    startBtn.disabled = !canStart;
    startBtn.style.opacity = canStart ? '1' : '0.55';
    if(MP.isHost){
      startBtn.textContent = MP.roomData.guestUid
        ? '🏁  ابدأ السباق'
        : '⏳  بانتظار انضمام اللاعب الثاني...';
    } else {
      startBtn.textContent = '⏳  بانتظار أن يبدأ المضيف...';
    }
  }

  // ✅ حالة الاتصال
  mpUpdateConnectionBadge();
}

/* ═══════════════ العد التنازلي ═══════════════ */
function mpShowCountdownOverlay(){
  let el = document.getElementById('mp-countdown');
  if(!el){
    el = document.createElement('div');
    el.id = 'mp-countdown';
    el.className = 'mp-countdown';
    document.getElementById('wrap').appendChild(el);
  }
  el.style.display = 'flex';

  /* ✅ منع تشغيل أكثر من حلقة tick في نفس الوقت */
  if(MP.countdownLoopActive) return;
  MP.countdownLoopActive = true;

  const tick = () => {
    if(!MP.countdownActive){
      el.style.display = 'none';
      MP.countdownLoopActive = false;
      return;
    }

    const remain = MP.countdownEndsAt - Date.now();
    const n = Math.ceil(remain / 1000);

    if(n !== MP.countdownShown){
      MP.countdownShown = n;

      if(n <= 0){
        el.innerHTML = '<div class="mp-cd-go">GO!</div>';
        Sfx.play(880, 0.25, 'sine', 0.07, 1320);
        setTimeout(() => {
          el.style.display = 'none';
          MP.countdownLoopActive = false;
        }, 500);
        haptic(20);
        return;  // ⛔ توقف عن الـ loop
      } else if(n <= 3){
        el.innerHTML = `<div class="mp-cd-num">${n}</div>`;
        Sfx.play(440 + (3 - n) * 100, 0.15, 'sine', 0.06, 660);
        haptic(8);
      } else {
        el.innerHTML = '<div class="mp-cd-ready">READY</div>';
        haptic(5);
      }
    }

    if(remain > -600) requestAnimationFrame(tick);
    else {
      el.style.display = 'none';
      MP.countdownLoopActive = false;
    }
  };
  tick();
}

/* ═══════════════ النتيجة ═══════════════ */
function mpShowResult(){
  const myUid = Cloud.user ? Cloud.user.uid : null;
  const winnerUid = MP.roomData ? MP.roomData.roundWinner : null;
  const matchWinner = MP.roomData ? MP.roomData.matchWinner : null;

  const titleEl = document.getElementById('mp-result-title');
  const subEl = document.getElementById('mp-result-sub');
  const statsEl = document.getElementById('mp-result-stats');

  const isDraw = !winnerUid;
  const isRoundWinner = winnerUid === myUid;
  const isMatchOver = !!matchWinner;
  const isMatchWinner = matchWinner === myUid;

  if(titleEl){
    if(isMatchOver){
      titleEl.textContent = isMatchWinner ? '👑' : '💀';
    } else {
      titleEl.textContent = isDraw ? '🤝' : (isRoundWinner ? '🏆' : '💀');
    }
  }
  if(subEl){
    if(isMatchOver){
      subEl.textContent = isMatchWinner ? 'MATCH WON' : 'MATCH LOST';
    } else {
      subEl.textContent = isDraw ? 'DRAW · ROUND ' + MP.round : (isRoundWinner ? 'ROUND WON' : 'ROUND LOST');
    }
  }

  if(statsEl && MP.roomData){
    const hostName = mpEscape(MP.roomData.hostName || 'المضيف');
    const guestName = mpEscape(MP.roomData.guestName || 'الضيف');
    const hostScore = MP.roomData.hostScore || 0;
    const guestScore = MP.roomData.guestScore || 0;
    const hw = MP.roomData.hostWins || 0;
    const gw = MP.roomData.guestWins || 0;

    statsEl.innerHTML = `
      <div class="mp-result-row ${MP.roomData.hostUid === winnerUid ? 'winner' : ''}">
        <span>${hostName} ${hw > 0 ? '· ' + hw + 'W' : ''}</span>
        <span>${hostScore}m</span>
      </div>
      <div class="mp-result-row ${MP.roomData.guestUid === winnerUid ? 'winner' : ''}">
        <span>${guestName} ${gw > 0 ? '· ' + gw + 'W' : ''}</span>
        <span>${guestScore}m</span>
      </div>
      <div class="mp-result-row" style="border-color:var(--amber);">
        <span>الجولات</span>
        <span>${hw} - ${gw}</span>
      </div>
    `;
  }

  // زر إعادة المباراة
  const againBtn = document.getElementById('mp-play-again-btn');
  if(againBtn){
    if(isMatchOver){
      againBtn.textContent = '🔁 مباراة جديدة';
      againBtn.disabled = !MP.isHost;
      againBtn.style.opacity = MP.isHost ? '1' : '0.5';
    } else {
      againBtn.textContent = '▶ الجولة التالية';
      againBtn.disabled = !MP.isHost;
      againBtn.style.opacity = MP.isHost ? '1' : '0.5';
    }
  }

  mpStopSync();
  showScreen('s-multiplayer-result');
  Sfx.reward(); haptic(25);
}

/* ═══════════════ إعادة تعيين حالة الجولة ═══════════════ */
function mpResetRoundState(){
  MP.resultShown = false;
  MP.countdownActive = false;
  MP.countdownShown = -1;
  MP.localLastState = null;
  MP.remoteStates = {};
}

/* ═══════════════ إعادة المباراة ═══════════════ */
async function mpRematch(){
  if(!MP.isHost){
    alert('فقط المضيف يمكنه بدء جولة جديدة');
    return;
  }
  try {
    const roomRef = Cloud.db.collection(MP_CONFIG.collection).doc(MP.roomId);
    const snap = await roomRef.get();
    if(!snap.exists) return;
    const rd = snap.data();
    const isMatchOver = !!rd.matchWinner;

    const newRound = isMatchOver ? 1 : (rd.round || 1) + 1;
    const newHostWins = isMatchOver ? 0 : (rd.hostWins || 0);
    const newGuestWins = isMatchOver ? 0 : (rd.guestWins || 0);

    await roomRef.update({
      status: 'waiting',
      round: newRound,
      hostWins: newHostWins,
      guestWins: newGuestWins,
      hostScore: 0,
      guestScore: 0,
      roundWinner: null,
      matchWinner: null,
      countdownEndsAt: null,
      startedAt: null,
      finishedAt: null
    });

    // إعادة تصفير حالات اللاعبين
    const playersSnap = await roomRef.collection('players').get();
    const batch = Cloud.db.batch();
    playersSnap.forEach(d => {
      batch.update(d.ref, {
        meters: 0, coins: 0, alive: true,
        xRatio: 0.26, yRatio: 0.5, rot: 0,
        vx: 0, vy: 0,
        lastEmoji: null, lastEmojiAt: 0
      });
    });
    await batch.commit();

    mpResetRoundState();
    showScreen('s-multiplayer-waiting');
    mpBuildWaitingRoom();
  } catch(e){
    alert('فشل: ' + e.message);
  }
}

/* ═══════════════ رسم الخصم (باستيفاء) ═══════════════ */
function mpDrawGhosts(){
  if(!MP.active || G.state !== 'PLAYING') return;
  if(!MP.otherPlayers.size) return;

  const myM = getMeters();
  const myUid = Cloud.user ? Cloud.user.uid : null;
  const now = Date.now();

  for(const [uid, p] of MP.otherPlayers){
    if(uid === myUid) continue;
    if(!p) continue;

    // ✅ استيفاء الموضع
    const rs = MP.remoteStates[uid];
    let interpData = p;
    if(rs && rs.curr && rs.prev){
      const timeSince = now - rs.receivedAt;
      const dtBetween = Math.max(1, rs.receivedAt - rs.prevReceivedAt);
      const t = clamp(timeSince / dtBetween, 0, 2.5);  // extrapolation حتى 2.5x

      const px = lerp(rs.prev.xRatio || 0.26, rs.curr.xRatio || 0.26, t);
      const py = lerp(rs.prev.yRatio || 0.5, rs.curr.yRatio || 0.5, t);
      const pr = lerp(rs.prev.rot || 0, rs.curr.rot || 0, t);
      const pm = lerp(rs.prev.meters || 0, rs.curr.meters || 0, t);

      interpData = {
        ...p,
        xRatio: px,
        yRatio: py,
        rot: pr,
        meters: pm
      };
    }

    const distDiff = (interpData.meters || 0) - myM;
    const maxOffset = W * 0.42;
    const pxOffset = clamp(distDiff * PIXELS_PER_METER * 0.55, -maxOffset, maxOffset);
    const ghostX = P.baseX + pxOffset;
    const ghostY = clamp((interpData.yRatio || 0.5) * H, 40, H - 40);

    const sk = getAllSkins().find(s => s.id === interpData.skin) || SKINS[0];
    const alpha = interpData.alive ? 0.72 : 0.25;

    // اسم اللاعب
    ctx.save();
    ctx.globalAlpha = interpData.alive ? 0.9 : 0.4;
    ctx.fillStyle = interpData.alive ? '#4A88C8' : '#8B8278';
    ctx.font = 'bold 11px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(interpData.name || 'لاعب', ghostX, ghostY - P.r * 2.6);

    // المسافة أسفل الاسم
    ctx.font = 'bold 9px "Space Grotesk", sans-serif';
    ctx.fillStyle = 'rgba(74, 136, 200, 0.7)';
    ctx.fillText((interpData.meters || 0) + 'm', ghostX, ghostY - P.r * 2.6 + 11);
    ctx.restore();

    // سهم إذا كان خارج الشاشة
    if(Math.abs(pxOffset) >= maxOffset - 1){
      ctx.save();
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = '#4A88C8';
      ctx.font = 'bold 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const arrowX = ghostX + (distDiff > 0 ? 20 : -20);
      ctx.fillText(distDiff > 0 ? '→' : '←', arrowX, ghostY);
      ctx.restore();
    }

    // رسم الشخصية
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(ghostX, ghostY);
    try {
      renderCharacter(ctx, P.r, sk, {
        mode: interpData.mode || 'FLIP',
        rot: interpData.rot || 0,
        alpha: alpha,
        skipExtras: true
      });
    } catch(e){}
    ctx.restore();
  }
}

/* ═══════════════ إيموجي الخصم ═══════════════ */
function mpShowOpponentEmoji(emoji){
  if(!emoji) return;
  const el = document.createElement('div');
  el.className = 'mp-emoji-pop';
  el.textContent = emoji;
  el.style.cssText = `
    position:absolute;top:35%;left:20%;font-size:42px;
    z-index:100;pointer-events:none;
    animation:mpEmojiPop 1.6s cubic-bezier(.34,1.56,.64,1) forwards;
  `;
  document.getElementById('wrap').appendChild(el);
  Sfx.play(880, 0.15, 'sine', 0.04, 1320);
  setTimeout(() => el.remove(), 1700);
}

async function mpSendEmoji(emoji){
  if(!MP.active || !Cloud.user || !Cloud.db) return;
  const now = Date.now();
  if(now - MP.lastEmojiAt < 2500) return;
  MP.lastEmojiAt = now;
  try {
    await Cloud.db.collection(MP_CONFIG.collection).doc(MP.roomId)
      .collection('players').doc(Cloud.user.uid).update({
        lastEmoji: emoji,
        lastEmojiAt: now
      });
    // إظهارها لك أيضاً
    mpShowOpponentEmoji(emoji);
  } catch(e){}
}

/* ═══════════════ لوحة الترتيب المباشرة ═══════════════ */
function mpUpdateLeaderboard(){
  const el = document.getElementById('mp-leaderboard');
  if(!el) return;

  if(!MP.active || G.state !== 'PLAYING' || MP.otherPlayers.size === 0){
    el.style.display = 'none';
    return;
  }
  el.style.display = 'flex';

  const myUid = Cloud.user ? Cloud.user.uid : null;
  const entries = [{
    uid: myUid || 'me',
    name: (Cloud.profile && Cloud.profile.username) || 'أنت',
    meters: getMeters(),
    coins: G.runCoins,
    alive: G.state === 'PLAYING',
    isMe: true,
    ping: MP.ping
  }];

  for(const [uid, p] of MP.otherPlayers){
    if(uid === myUid) continue;
    entries.push({
      uid,
      name: p.name || 'لاعب',
      meters: p.meters || 0,
      coins: p.coins || 0,
      alive: !!p.alive,
      isMe: false,
      ping: MP.ping
    });
  }

  entries.sort((a, b) => b.meters - a.meters);
  const top = entries[0].meters || 1;

  el.innerHTML = entries.map((e, i) => {
    const pct = top > 0 ? (e.meters / top) * 100 : 0;
    const connDot = mpGetPingColor(e.isMe ? MP.ping : MP.ping);
    return `
      <div class="mp-row${e.isMe ? ' mp-me' : ''}${!e.alive ? ' mp-dead' : ''}">
        <span class="mp-rank">${i + 1}</span>
        <span class="mp-name">${mpEscape(e.name)}</span>
        <span class="mp-meters">${e.meters}m</span>
        <span class="mp-coins">◆${e.coins}</span>
        <span class="mp-conn" style="background:${connDot};"></span>
      </div>
      <div class="mp-progress-track">
        <div class="mp-progress-fill" style="width:${pct}%;background:${e.isMe ? '#E8B34E' : '#4A88C8'};"></div>
      </div>
    `;
  }).join('');
}

function mpGetPingColor(ping){
  if(ping < 100) return '#4CAF50';
  if(ping < 250) return '#FFB060';
  return '#C14A4A';
}

function mpUpdateConnectionBadge(){
  const badge = document.getElementById('mp-conn-badge');
  if(!badge) return;
  const ping = MP.ping;
  let color = '#4CAF50', label = 'متصل';
  if(ping >= 250){ color = '#C14A4A'; label = 'ضعيف'; }
  else if(ping >= 100){ color = '#FFB060'; label = 'متوسط'; }
  badge.innerHTML = `<span class="mp-conn-dot" style="background:${color};"></span>
                     <span class="mp-conn-lbl">${label} · ${ping}ms</span>`;
}

/* ═══════════════ تهيئة الأزرار ═══════════════ */
function mpInit(){
  if(MP.bound) return;
  MP.bound = true;

  const openBtn = document.getElementById('mp-open-btn');
  if(openBtn){
    openBtn.addEventListener('click', () => {
      if(!Cloud.user){ alert('سجّل دخولك أولاً للعب الجماعي'); return; }
      showScreen('s-multiplayer');
      Sfx.tap(); haptic(6);
    });
  }

const createBtn = document.getElementById('mp-create-btn');
if(createBtn){
  createBtn.addEventListener('click', async () => {
    if(createBtn.disabled) return;
    createBtn.disabled = true;
    createBtn.textContent = '⏳ جارٍ إنشاء الغرفة...';
    
    try {
      await mpCreateRoom(Save.data.mode);
    } catch(e){
      console.error('[MP] Create error:', e);
      alert('تعذر إنشاء الغرفة: ' + (e.message || 'خطأ غير معروف'));
    } finally {
      createBtn.disabled = false;
      createBtn.textContent = '➕  إنشاء غرفة جديدة';
    }
  });
}

  const codeInput = document.getElementById('mp-code-input');
  const joinBtn = document.getElementById('mp-join-btn');
  if(codeInput){
    codeInput.addEventListener('input', () => {
      codeInput.value = codeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, MP_CONFIG.codeLength);
    });
  }
  if(joinBtn && codeInput){
    joinBtn.addEventListener('click', async () => {
      joinBtn.disabled = true;
      const orig = joinBtn.textContent;
      joinBtn.textContent = '⏳ ...';
      await mpJoinRoom(codeInput.value);
      joinBtn.disabled = false;
      joinBtn.textContent = orig;
    });
    codeInput.addEventListener('keydown', e => {
      if(e.code === 'Enter') joinBtn.click();
    });
  }

  const startBtn = document.getElementById('mp-start-btn');
  if(startBtn) startBtn.addEventListener('click', mpStartRace);

  document.querySelectorAll('[data-mp-leave]').forEach(b => {
    b.addEventListener('click', async () => {
      if(!confirm('مغادرة الغرفة؟')) return;
      await mpLeaveRoom();
      if(G.state === 'PLAYING' || G.state === 'PAUSED') quitToMenu();
      else { showScreen('s-home'); buildHome(); }
      Sfx.tap(); haptic(6);
    });
  });

  const copyBtn = document.getElementById('mp-copy-btn');
  if(copyBtn){
    copyBtn.addEventListener('click', async () => {
      const code = (document.getElementById('mp-room-code') || {}).textContent || '';
      try {
        await navigator.clipboard.writeText(code);
        copyBtn.textContent = '✓ تم النسخ';
      } catch(e){ copyBtn.textContent = '📋 ' + code; }
      setTimeout(() => { copyBtn.textContent = '📋 نسخ الكود'; }, 1500);
    });
  }

  const againBtn = document.getElementById('mp-play-again-btn');
  if(againBtn) againBtn.addEventListener('click', mpRematch);

  // ✅ إيموجي بار
  const emojiBar = document.getElementById('mp-emoji-bar');
  if(emojiBar){
    emojiBar.innerHTML = MP_CONFIG.emojis.map(e =>
      `<button class="mp-emoji-btn" data-emoji="${e}">${e}</button>`
    ).join('');
    emojiBar.querySelectorAll('.mp-emoji-btn').forEach(b => {
      b.addEventListener('click', () => {
        mpSendEmoji(b.dataset.emoji);
        b.style.transform = 'scale(1.3)';
        setTimeout(() => b.style.transform = '', 200);
      });
    });
  }
}

/* ═══════════════ Patches ═══════════════ */
(function patchDraw(){
  const originalDraw = draw;
  draw = function(){
    originalDraw();
    if(MP.active){
      try { mpDrawGhosts(); } catch(e){ console.warn('[MP] ghost:', e); }
    }
  };
})();

(function patchGameOver(){
  const original = gameOver;
  gameOver = function(){
    const r = original.apply(this, arguments);
    if(MP.active){
      setTimeout(() => { mpNotifyDeath().catch(()=>{}); }, 220);
      setTimeout(() => { mpUpdateLeaderboard(); }, 100);
    }
    return r;
  };
})();

(function patchUpdateGameplay(){
  const original = updateGameplay;
  updateGameplay = function(){
    const r = original.apply(this, arguments);
    if(MP.active && G.t % 10 === 0){
      try { mpUpdateLeaderboard(); } catch(e){}
    }
    return r;
  };
})();

window.addEventListener('beforeunload', () => {
  // Firestore سيحرر الوثيقة تلقائياً لكن نترك أثراً
  if(MP.active && MP.roomId && Cloud.db){
    try { Cloud.db.collection(MP_CONFIG.collection).doc(MP.roomId)
      .update({ heartbeatAt: firebase.firestore.FieldValue.serverTimestamp() }); } catch(e){}
  }
});

/* ═══ تحميل مسبق لأي عنصر مخصص ═══ */
async function preloadCustomItem(item){
  if(!item) return { ok: false };
  const src = ASSET.resolve(item);
  if(!src) return { ok: false };
  return ASSET.preload([src]);
}

/* ═══ تحميل كل محتوى المشرف دفعة واحدة (يُستدعى بعد pullAdminContent) ═══ */
async function preloadAdminContent(){
  const sources = [];
  const items = getAllCustomItems();
  for(const item of items){
    const src = ASSET.resolve(item);
    if(src) sources.push(src);
  }
  if(sources.length === 0) return { ok: 0, fail: 0 };
  console.log(`[Preload] Loading ${sources.length} custom assets...`);
  return ASSET.preload(sources);
}

/* ============================================================
   ═══════════════ ADMIN PANEL v3 — FULL ENGINE ══════════════
   ============================================================ */

/* ═══════════════ الحالة العامة ═══════════════ */
const Admin = {
  /* ═══ الحالة ═══ */
  tab: 'dashboard',
  contentTab: 'skin',
  currentFilter: 'all',
  searchQuery: '',
  auditFilter: 'all',

  /* ═══ البيانات المؤقتة ═══ */
  players: [],
  auditLog: [],
  activity: [],
  liveStats: null,

  /* ═══ الطوابير ═══ */
  pendingUpload: null,

  /* ═══ الحد الأقصى ═══ */
  MAX_AUDIT: 200,
  MAX_ACTIVITY: 20,

  /* ═══ حالة التهيئة ═══ */
  initialized: false,
  refreshTimer: null,

  /* ═══════════════════════════════════════════════════════════
     ═══════════════ INITIALIZATION ═══════════════
     ═══════════════════════════════════════════════════════════ */
  init(){
    if(this.initialized) return;
    this.initialized = true;

    /* تحميل السجل من الذاكرة */
    this.loadAuditFromStorage();

    /* ربط التبويبات */
    this.bindTabs();

    /* ربط الأدوات */
    this.bindToolbar();
    this.bindQuickActions();
    this.bindTools();
    this.bindSearch();
    this.bindKeyboard();
    this.bindAudit();
    this.bindToggles();
    this.bindCoins();
    this.bindPlayers();

    /* حالة النظام */
    this.renderSystemPanel();

    /* بدء التحديث التلقائي */
    this.startAutoRefresh();
  },

  /* ═══════════════ التبويبات ═══════════════ */
  bindTabs(){
    document.querySelectorAll('.admin-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const t = tab.dataset.tab;
        if(!t) return;
        this.switchTab(t);
      });
    });
  },

  switchTab(tabName){
    this.tab = tabName;
    document.querySelectorAll('.admin-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tabName);
    });
    document.querySelectorAll('.admin-tab-content').forEach(c => {
      c.classList.toggle('active', c.dataset.tab === tabName);
    });
    Sfx.tap(); haptic(4);

    /* تنفيذ مهام التبويب */
    if(tabName === 'dashboard') this.refreshDashboard();
    else if(tabName === 'content') this.renderContent();
    else if(tabName === 'players') this.renderPlayers();
    else if(tabName === 'economy') this.renderEconomy();
    else if(tabName === 'events') this.renderEvents();
    else if(tabName === 'preview') this.initPreview();
    else if(tabName === 'system') this.renderSystemPanel();
    else if(tabName === 'audit') this.renderAudit();
  },

  /* ═══════════════ Dashboard ═══════════════ */
  refreshDashboard(){
    this.loadLiveStats();
    this.renderActivityFeed();
  },

  async loadLiveStats(){
    const stats = {
      players: '—', online: '—', coins: '—',
      content: '—', sessions: '—', ping: '—'
    };

    /* عناصر مخصصة */
    try {
      stats.content = this.countCustomItems();
    } catch(e) {}

    /* عملاتي */
    if(Save.data){
      stats.coins = Save.data.coins.toLocaleString();
      stats.sessions = Save.data.stats.totalPlays || 0;
    }

    /* ping */
    if(typeof MP !== 'undefined' && MP.ping){
      stats.ping = MP.ping + 'ms';
    } else {
      stats.ping = '—';
    }

    /* من Firebase */
    if(typeof Cloud !== 'undefined' && Cloud.db && Cloud.user){
      try {
        const snap = await Cloud.db.collection('players').count().get();
        stats.players = snap.data().count || 0;

        /* متصلون الآن — آخر 5 دقائق */
        const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
        const onlineSnap = await Cloud.db.collection('players')
          .where('lastSeen', '>', fiveMinAgo)
          .count().get();
        stats.online = onlineSnap.data().count || 0;
      } catch(e){ /* تجاهل */ }
    }

    /* تحديث UI */
    Object.entries(stats).forEach(([key, value]) => {
      const el = document.getElementById('stat-' + key);
      if(el) el.textContent = value;
    });
  },

  countCustomItems(){
    let total = 0;
    if(!Save.data.admin) return 0;
    for(const key in Save.data.admin){
      if(key.startsWith('custom') && Array.isArray(Save.data.admin[key])){
        total += Save.data.admin[key].length;
      }
    }
    return total;
  },

  /* ═══════════════ Activity Feed ═══════════════ */
  addActivity(icon, title){
    this.activity.unshift({
      icon, title,
      time: Date.now()
    });
    if(this.activity.length > this.MAX_ACTIVITY){
      this.activity = this.activity.slice(0, this.MAX_ACTIVITY);
    }
    this.renderActivityFeed();
  },

  renderActivityFeed(){
    const feed = document.getElementById('admin-activity-feed');
    if(!feed) return;

    if(this.activity.length === 0){
      feed.innerHTML = '<div class="aaf-empty">لا يوجد نشاط بعد — ابدأ بتعديل المحتوى أو اللاعبين</div>';
      return;
    }

    feed.innerHTML = this.activity.map(a => `
      <div class="aaf-item">
        <div class="aaf-icon">${a.icon}</div>
        <div class="aaf-body">
          <div class="aaf-title">${this.escape(a.title)}</div>
          <div class="aaf-time">${this.timeAgo(a.time)}</div>
        </div>
      </div>
    `).join('');
  },

  /* ═══════════════ Content Tab ═══════════════ */
  renderContent(){
    /* إحصاءات المحتوى */
    this.renderContentStats();

    /* شريط التبويبات */
    this.bindContentTabs();

    /* القائمة */
    this.renderContentList();
  },

  renderContentStats(){
    const el = document.getElementById('admin-content-stats');
    if(!el) return;

    /* ✅ استخدم التصنيفات المركزية */
    const cats = ['skin', ...COSMETIC_CATEGORY_ORDER];

    let total = 0;
    let enabled = 0;
    let withImage = 0;

    for(const cat of cats){
      const key = 'custom' + cat.charAt(0).toUpperCase() + cat.slice(1);
      const list = (Save.data.admin[key] || []);
      total += list.length;
      enabled += list.filter(x => x.enabled !== false).length;
      withImage += list.filter(x => x.imagePath || x.imageData).length;
    }

    el.innerHTML = `
      <div class="acs-item">
        <div class="n">${total}</div>
        <div class="l">الكل</div>
      </div>
      <div class="acs-item">
        <div class="n" style="color:#6B9B6B;">${enabled}</div>
        <div class="l">مُفعّل</div>
      </div>
      <div class="acs-item">
        <div class="n" style="color:#4A88C8;">${withImage}</div>
        <div class="l">بصورة</div>
      </div>
      <div class="acs-item">
        <div class="n" style="color:#E85838;">${total - enabled}</div>
        <div class="l">مُخفي</div>
      </div>
    `;
  },

  bindContentTabs(){
    const tabs = document.querySelectorAll('#admin-content-tabs .act-chip');
    tabs.forEach(chip => {
      /* تجنّب الربط المتكرر */
      if(chip._bound) return;
      chip._bound = true;

      chip.addEventListener('click', () => {
        this.contentTab = chip.dataset.act;
        document.querySelectorAll('#admin-content-tabs .act-chip').forEach(c => {
          c.classList.toggle('active', c === chip);
        });
        this.renderContentList();
        Sfx.tap(); haptic(4);
      });
    });
  },

renderContentList(){
  const list = document.getElementById('admin-content-list');
  if(!list) return;

  const key = ADMIN_KEY_MAP[this.contentTab] ||
              ('custom' + this.contentTab.charAt(0).toUpperCase() + this.contentTab.slice(1));
  const items = (Save.data.admin[key] || []);

  if(items.length === 0){
    list.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:var(--ink-mute);">
        <div style="font-size:40px;opacity:.3;margin-bottom:10px;">📦</div>
        <div style="font-size:13px;font-weight:700;">لا توجد عناصر في هذا التصنيف</div>
        <div style="font-size:11px;margin-top:6px;">اضغط "إضافة عنصر جديد" للبدء</div>
      </div>
    `;
    return;
  }

  /* ═══ ✅ جديد: شريط أدوات القائمة ═══ */
  let toolbar = document.getElementById('admin-content-toolbar');
  if(!toolbar){
    toolbar = document.createElement('div');
    toolbar.id = 'admin-content-toolbar';
    toolbar.style.cssText = `
      display:flex;align-items:center;justify-content:space-between;
      gap:8px;padding:10px 12px;margin-bottom:10px;
      background:#fff;border-radius:12px;
      border:1px solid var(--line);
    `;
    list.parentNode.insertBefore(toolbar, list);
  }

  toolbar.innerHTML = `
    <div style="display:flex;align-items:center;gap:6px;">
      <span style="font-size:14px;">📊</span>
      <span style="font-size:12px;font-weight:800;color:var(--ink);">
        ${items.length} عنصر في "${CATEGORY_LABELS[this.contentTab] || this.contentTab}"
      </span>
    </div>
    <button class="admin-mini-btn danger" id="admin-clear-category" title="حذف الكل">
      🗑 حذف الكل
    </button>
  `;

  /* ربط زر الحذف الكامل */
  const clearBtn = toolbar.querySelector('#admin-clear-category');
  if(clearBtn && !clearBtn._bound){
    clearBtn._bound = true;
    clearBtn.addEventListener('click', async () => {
      const cat = this.contentTab;
      const key2 = ADMIN_KEY_MAP[cat] || ('custom' + cat.charAt(0).toUpperCase() + cat.slice(1));
      const catItems = Save.data.admin[key2] || [];

      if(catItems.length === 0) return;

      const ok = confirm(
        `⚠️⚠️ تحذير شديد ⚠️⚠️\n\n` +
        `سيتم حذف ${catItems.length} عنصر من تصنيف "${CATEGORY_LABELS[cat] || cat}"\n` +
        `من جميع اللاعبين نهائياً!\n\n` +
        `لا يمكن التراجع. متابعة؟`
      );
      if(!ok) return;

      const ok2 = confirm('تأكيد أخير: هل أنت متأكد 100%؟');
      if(!ok2) return;

      Save.data.admin[key2] = [];
      Save.save();

      if(typeof pushAdminContent === 'function'){
        const r = await pushAdminContent();
        if(!r.ok){
          alert('⚠ حُذف محلياً — فشل النشر');
        }
      }

      if(typeof Admin !== 'undefined' && Admin.logAudit){
        Admin.logAudit('content', 'clear-category', `🗑 حذف كل عناصر ${cat}`);
      }

      this.renderContentList();
      this.renderContentStats();
      if(this.addActivity) this.addActivity('🗑', `حذف كل "${CATEGORY_LABELS[cat] || cat}"`);
      if(typeof refreshContentEverywhere === 'function') refreshContentEverywhere();

      if(typeof Toast !== 'undefined'){
        Toast.success('تم الحذف', `حُذف كل المحتوى من "${CATEGORY_LABELS[cat] || cat}"`);
      }
      Sfx.reward(); haptic(20);
    });
  }

  list.innerHTML = '';
  items.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = 'admin-content-item';
      el.style.position = 'relative';

      const src = this.resolveItemSrc(item);
      const thumb = src
        ? `<img src="${src}" alt="" onerror="this.style.display='none';this.parentElement.innerHTML='⚠'">`
        : `<div style="width:100%;height:100%;background:${item.color || '#E07A3F'};display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;font-weight:800;">${(item.name||'?').charAt(0)}</div>`;

      const disabled = item.enabled === false;

      el.innerHTML = `
        <div class="aci-thumb">${thumb}</div>
        <div class="aci-info">
          <div class="aci-name">
            ${this.escape(item.name || 'بدون اسم')}
            ${disabled ? '<span style="color:#C14A4A;font-size:10px;"> · مُخفي</span>' : ''}
          </div>
          <div class="aci-meta">${item.rarity || 'common'} · ${src ? '🖼️' : '⚠ بلا صورة'}</div>
        </div>
        <button class="aci-del" data-del="${idx}" title="حذف">🗑</button>
      `;

      el.querySelector('[data-del]').addEventListener('click', e => {
        e.stopPropagation();
        this.confirmDelete(key, idx, item);
      });

      list.appendChild(el);
    });
  },

  async confirmDelete(key, idx, item){
    if(!confirm(`حذف "${item.name}" نهائياً من جميع اللاعبين؟`)) return;

    Save.data.admin[key].splice(idx, 1);
    Save.save();

    this.logAudit('content', 'deleted', `🗑 حذف عنصر: ${item.name}`);
    this.addActivity('🗑', `حذف "${item.name}"`);

    /* مزامنة مع السحابة */
    if(typeof pushAdminContent === 'function'){
      await pushAdminContent();
    }

    this.renderContentList();
    this.renderContentStats();
    Sfx.reward(); haptic(15);
  },

  resolveItemSrc(item){
    if(!item) return null;
    if(item.imageData) return item.imageData;
    if(item.imagePath){
      const p = String(item.imagePath).trim();
      if(!p) return null;
      if(p.startsWith('http') || p.startsWith('data:')) return p;
      if(p.startsWith('assets/')) return p;

      const folder = this.getFolderForCategory(item.category || this.contentTab);
      return `assets/custom/${folder}/${p.replace(/^\/+/, '')}`;
    }
    return null;
  },

getFolderForCategory(cat){
  if(cat === 'skin') return 'skins';
  return (typeof CATEGORY_FOLDERS !== 'undefined' && CATEGORY_FOLDERS[cat]) || 'misc';
},

  /* ═══════════════ Players Tab ═══════════════ */
  renderPlayers(){
    const list = document.getElementById('admin-players-list');
    if(!list) return;

    if(this.players.length === 0){
      list.innerHTML = `
        <div style="text-align:center;padding:30px;color:var(--ink-mute);font-size:12px;">
          اضغط "تحميل اللاعبين" لعرض القائمة
        </div>
      `;
      return;
    }

    const filtered = this.filterPlayers(this.players);
    if(filtered.length === 0){
      list.innerHTML = '<div style="text-align:center;padding:30px;color:var(--ink-mute);font-size:12px;">لا نتائج مطابقة</div>';
      return;
    }

    list.innerHTML = '';
    filtered.slice(0, 50).forEach(player => {
      const el = document.createElement('div');
      el.className = 'admin-player-item';

      const photo = player.photoURL || '';
      const av = photo
        ? `<img src="${photo}" alt="">`
        : '👤';

      const username = player.username || player.displayName || 'لاعب';
      const coins = (player.saveData && player.saveData.coins || 0).toLocaleString();
      const plays = (player.saveData && player.saveData.stats && player.saveData.stats.totalPlays) || 0;

      el.innerHTML = `
        <div class="api-av">${av}</div>
        <div class="api-info">
          <div class="api-name">${this.escape(username)}</div>
          <div class="api-uid">◆ ${coins} · 🎮 ${plays}</div>
        </div>
      `;

      el.addEventListener('click', () => {
        this.showPlayerActions(player);
      });

      list.appendChild(el);
    });
  },

  filterPlayers(players){
    let result = [...players];

    /* فلترة */
    if(this.currentFilter === 'online'){
      const fiveMinAgo = Date.now() - 5 * 60 * 1000;
      result = result.filter(p => {
        const lastSeen = p.lastSeen && p.lastSeen.toMillis ? p.lastSeen.toMillis() : 0;
        return lastSeen > fiveMinAgo;
      });
    } else if(this.currentFilter === 'top'){
      result.sort((a, b) => {
        const ca = (a.saveData && a.saveData.coins) || 0;
        const cb = (b.saveData && b.saveData.coins) || 0;
        return cb - ca;
      });
    } else if(this.currentFilter === 'recent'){
      result.sort((a, b) => {
        const ta = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : 0;
        const tb = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : 0;
        return tb - ta;
      });
    }

    /* بحث */
    if(this.searchQuery){
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        (p.username || '').toLowerCase().includes(q) ||
        (p.uid || '').toLowerCase().includes(q)
      );
    }

    return result;
  },

  showPlayerActions(player){
    const name = player.username || player.displayName || 'لاعب';
    const uid = player.uid || '';
    const coins = (player.saveData && player.saveData.coins) || 0;

    const action = prompt(
      `اللاعب: ${name}\nمعرف: ${uid.slice(0, 12)}…\nالرصيد: ◆ ${coins}\n\n` +
      `اكتب:\n` +
      `1 — منح 1000 عملة\n` +
      `2 — منح 10000 عملة\n` +
      `3 — تصفير الرصيد\n` +
      `4 — نسخ المعرّف\n` +
      `5 — حذف الحساب`
    );

    if(!action) return;

    if(action === '1') this.grantPlayerCoins(uid, 1000);
    else if(action === '2') this.grantPlayerCoins(uid, 10000);
    else if(action === '3') this.setPlayerCoins(uid, 0);
    else if(action === '4') this.copyToClipboard(uid);
    else if(action === '5') this.deletePlayer(uid);
  },

  async grantPlayerCoins(uid, amount){
    if(!Cloud.db) return;
    try {
      const ref = Cloud.db.collection('players').doc(uid);
      const snap = await ref.get();
      if(!snap.exists) return;

      const data = snap.data();
      const saveData = data.saveData || {};
      saveData.coins = (saveData.coins || 0) + amount;

      await ref.update({ saveData });
      this.logAudit('economy', 'granted', `💸 منح ◆${amount} للاعب ${uid.slice(0, 8)}`);
      this.addActivity('💸', `منح ${amount} عملة`);
      alert(`✓ تم منح ◆${amount}`);
    } catch(e){
      alert('فشل: ' + e.message);
    }
  },

  async setPlayerCoins(uid, amount){
    if(!Cloud.db) return;
    try {
      const ref = Cloud.db.collection('players').doc(uid);
      const snap = await ref.get();
      if(!snap.exists) return;

      const saveData = snap.data().saveData || {};
      saveData.coins = amount;

      await ref.update({ saveData });
      this.logAudit('economy', 'reset', `🔄 تصفير رصيد ${uid.slice(0, 8)}`);
      alert(`✓ تم التصفير`);
    } catch(e){
      alert('فشل: ' + e.message);
    }
  },

  async deletePlayer(uid){
    if(!confirm('حذف حساب اللاعب نهائياً؟ لا يمكن التراجع!')) return;
    if(!Cloud.db) return;
    try {
      await Cloud.db.collection('players').doc(uid).delete();
      this.logAudit('player', 'deleted', `🗑 حذف لاعب ${uid.slice(0, 8)}`);
      this.addActivity('🗑', 'حذف لاعب');
      this.players = this.players.filter(p => p.uid !== uid);
      this.renderPlayers();
    } catch(e){
      alert('فشل: ' + e.message);
    }
  },

  /* ═══════════════ Economy Tab ═══════════════ */
  renderEconomy(){
    const coinsValue = document.getElementById('admin-coins-value');
    if(coinsValue) coinsValue.textContent = Save.data.coins.toLocaleString();
  },

  /* ═══════════════ Events Tab ═══════════════ */
  renderEvents(){
    const grid = document.getElementById('admin-events-grid');
    if(!grid) return;

    if(typeof EVENTS === 'undefined' || !Array.isArray(EVENTS) || EVENTS.length === 0){
      grid.innerHTML = '<div class="aeg-empty">لا توجد أحداث مُعرّفة</div>';
      return;
    }

    const now = new Date().toISOString().slice(0, 10);

    grid.innerHTML = EVENTS.map(ev => {
      const isActive = now >= ev.start && now <= ev.end;
      return `
        <div class="atg-btn" style="cursor:default;">
          <span class="atg-ic">${ev.icon || '🎪'}</span>
          <div class="atg-body">
            <div class="atg-title">${ev.name}</div>
            <div class="atg-desc">${ev.en} · ${isActive ? '🟢 نشط' : '⏸ متوقف'}</div>
          </div>
        </div>
      `;
    }).join('');
  },

  /* ═══════════════ System Panel ═══════════════ */
  renderSystemPanel(){
    const panel = document.getElementById('admin-system-panel');
    if(!panel) return;

    const items = [
      {
        label: 'Firebase',
        status: (typeof Cloud !== 'undefined' && Cloud.enabled) ? 'ok' : 'err',
        value: (typeof Cloud !== 'undefined' && Cloud.enabled) ? 'متصل' : 'غير متصل'
      },
      {
        label: 'المستخدم',
        status: (typeof Cloud !== 'undefined' && Cloud.user) ? 'ok' : 'warn',
        value: (typeof Cloud !== 'undefined' && Cloud.user) ? 'مسجّل' : 'ضيف'
      },
      {
        label: 'المزامنة',
        status: (typeof Cloud !== 'undefined' && Cloud.syncState === 'synced') ? 'ok' :
                (Cloud.syncState === 'error') ? 'err' : 'warn',
        value: (typeof Cloud !== 'undefined' && Cloud.syncState) || '—'
      },
      {
        label: 'الأصول المحمّلة',
        status: 'ok',
        value: (typeof ASSET !== 'undefined' && ASSET._cache) ? ASSET._cache.size : 0
      },
      {
        label: 'عناصر مخصصة',
        status: 'ok',
        value: this.countCustomItems()
      },
      {
        label: 'النسخة',
        status: 'ok',
        value: 'v10.3'
      }
    ];

    panel.innerHTML = items.map(it => `
      <div class="asp-item">
        <div class="asp-status ${it.status}"></div>
        <div class="asp-label">${it.label}</div>
        <div class="asp-val">${it.value}</div>
      </div>
    `).join('');
  },

  /* ═══════════════ Audit Log ═══════════════ */
  logAudit(category, action, message){
    this.auditLog.unshift({
      category, action, message,
      timestamp: Date.now()
    });
    if(this.auditLog.length > this.MAX_AUDIT){
      this.auditLog = this.auditLog.slice(0, this.MAX_AUDIT);
    }
    this.saveAuditToStorage();
  },

  saveAuditToStorage(){
    try {
      const data = this.auditLog.slice(0, 50);
      sessionStorage.setItem('admin_audit', JSON.stringify(data));
    } catch(e){}
  },

  loadAuditFromStorage(){
    try {
      const data = sessionStorage.getItem('admin_audit');
      if(data){
        this.auditLog = JSON.parse(data);
      }
    } catch(e){}
  },

  renderAudit(){
    const list = document.getElementById('admin-audit-list');
    if(!list) return;

    let filtered = this.auditLog;
    if(this.auditFilter !== 'all'){
      filtered = filtered.filter(a => a.category === this.auditFilter);
    }

    if(filtered.length === 0){
      list.innerHTML = '<div class="aal-empty">لا يوجد سجل بعد</div>';
      return;
    }

    const icons = { content: '🎨', economy: '💰', player: '👤' };

    list.innerHTML = filtered.map(a => `
      <div class="aal-item">
        <div class="aal-ic ${a.category}">${icons[a.category] || '📝'}</div>
        <div class="aal-body">
          <div class="aal-msg">${this.escape(a.message)}</div>
          <div class="aal-meta">${this.formatTime(a.timestamp)}</div>
        </div>
      </div>
    `).join('');
  },

  bindAudit(){
    document.querySelectorAll('[data-audit-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.auditFilter = btn.dataset.auditFilter;
        document.querySelectorAll('[data-audit-filter]').forEach(b => {
          b.classList.toggle('active', b === btn);
        });
        this.renderAudit();
        Sfx.tap();
      });
    });

    const clear = document.getElementById('admin-clear-audit');
    if(clear){
      clear.addEventListener('click', () => {
        if(!confirm('مسح كل سجل التدقيق؟')) return;
        this.auditLog = [];
        this.saveAuditToStorage();
        this.renderAudit();
        Sfx.tap();
      });
    }
  },

  /* ═══════════════ Toolbar ═══════════════ */
  bindToolbar(){
    const refreshBtn = document.getElementById('admin-refresh-btn');
    if(refreshBtn){
      refreshBtn.addEventListener('click', () => {
        this.refreshAll();
        Sfx.tap(); haptic(6);
      });
    }

    const searchBtn = document.getElementById('admin-search-btn');
    if(searchBtn){
      searchBtn.addEventListener('click', () => {
        this.openSearchModal();
      });
    }

    const helpBtn = document.getElementById('admin-help-btn');
    if(helpBtn){
      helpBtn.addEventListener('click', () => {
        this.openHelpModal();
      });
    }
  },

  refreshAll(){
    if(this.tab === 'dashboard') this.refreshDashboard();
    else if(this.tab === 'content') this.renderContent();
    else if(this.tab === 'players') this.renderPlayers();
    else if(this.tab === 'economy') this.renderEconomy();
    else if(this.tab === 'system') this.renderSystemPanel();
    else if(this.tab === 'audit') this.renderAudit();
    else if(this.tab === 'preview') this.initPreview();
  },

  /* ═══════════════ Quick Actions ═══════════════ */
  bindQuickActions(){
    document.querySelectorAll('[data-quick]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.quick;
        if(action === 'grant-coins-all') this.bulkGrantCoins();
        else if(action === 'unlock-all') this.unlockAllContent();
        else if(action === 'broadcast') this.broadcastMessage();
        else if(action === 'reset-daily') this.resetDailyMissions();
      });
    });
  },

  async bulkGrantCoins(){
    const amount = prompt('كم عملة تريد منح كل لاعب؟', '1000');
    if(!amount || isNaN(amount)) return;

    const amt = parseInt(amount);
    if(amt <= 0 || amt > 1000000){
      alert('يجب أن تكون القيمة بين 1 و 1,000,000');
      return;
    }

    if(!confirm(`منح ◆${amt} لكل اللاعبين في السحابة؟`)) return;

    if(!Cloud.db){
      alert('غير متصل');
      return;
    }

    try {
      const snap = await Cloud.db.collection('players').limit(500).get();
      let count = 0;
      const batch = Cloud.db.batch();

      snap.forEach(doc => {
        const data = doc.data();
        const saveData = data.saveData || {};
        saveData.coins = (saveData.coins || 0) + amt;
        batch.update(doc.ref, { saveData });
        count++;
      });

      await batch.commit();
      this.logAudit('economy', 'bulk-grant', `💸 منح ◆${amt} لـ ${count} لاعب`);
      this.addActivity('💸', `منح ${amt} عملة لكل اللاعبين`);
      alert(`✓ تم منح ◆${amt} لـ ${count} لاعب`);
    } catch(e){
      alert('فشل: ' + e.message);
    }
  },

  unlockAllContent(){
    if(!confirm('تفعيل "فتح كل المقتنيات" للمشرف؟')) return;
    Save.data.admin.unlimitedUnlock = true;
    Save.save();
    this.refreshAll();
    const sw = document.getElementById('sw-unlimitedUnlock');
    if(sw) sw.classList.add('on');
    this.logAudit('content', 'unlock-all', '🔓 فتح كل المحتوى');
    this.addActivity('🔓', 'تفعيل فتح الكل');
    Sfx.reward();
  },

  broadcastMessage(){
    const msg = prompt('نص الإشعار الجماعي:');
    if(!msg) return;
    this.logAudit('player', 'broadcast', `📢 إشعار: ${msg}`);
    this.addActivity('📢', `إشعار: ${msg.slice(0, 30)}…`);
    alert('✓ (محلياً — يتطلب Cloud Functions للإرسال الفعلي)');
  },

  resetDailyMissions(){
    if(!confirm('إعادة تعيين كل المهام اليومية؟')) return;
    if(!Save.data.missions) return;
    Save.data.missions.dailyReset = null;
    Save.save();
    if(typeof ensureMissions === 'function') ensureMissions();
    this.logAudit('player', 'reset-missions', '🔄 إعادة المهام اليومية');
    alert('✓ تمت إعادة التعيين');
  },

  /* ═══════════════ Tools ═══════════════ */
  bindTools(){
    document.querySelectorAll('[data-tool]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        if(tool === 'bulk-coins') this.bulkGrantCoins();
        else if(tool === 'bulk-content') this.bulkGrantContent();
        else if(tool === 'reset-economy') this.resetEconomy();
        else if(tool === 'export-data') this.exportData();
        else if(tool === 'import-data') this.importData();
        else if(tool === 'full-reset') this.fullReset();
      });
    });
  },

  bulkGrantContent(){ alert('قريباً — اختر عنصراً من المحتوى ثم اضغط "نشر للجميع"'); },
  resetEconomy(){ alert('⚠ للإيقاف — يتطلب Cloud Functions'); },

  exportData(){
    try {
      const data = JSON.stringify(Save.data, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `shift-save-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.logAudit('system', 'export', '📤 تصدير بيانات');
      this.addActivity('📤', 'تصدير البيانات');
    } catch(e){
      alert('فشل: ' + e.message);
    }
  },

  importData(){
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async e => {
      const file = e.target.files[0];
      if(!file) return;
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        if(!confirm('استيراد هذه البيانات؟ سيتم استبدال تقدمك الحالي')) return;
        Save.data = parsed;
        Save.runMigrations();
        Save.save();
        alert('✓ تم الاستيراد — أعد تحميل الصفحة');
        this.logAudit('system', 'import', '📥 استيراد بيانات');
      } catch(err){
        alert('فشل: ' + err.message);
      }
    };
    input.click();
  },

  fullReset(){
    if(!confirm('⚠️ حذف كل شيء؟ لا يمكن التراجع!')) return;
    if(!confirm('تأكيد نهائي: هل أنت متأكد؟')) return;
    Save.reset();
    location.reload();
  },

  /* ═══════════════ Toggles ═══════════════ */
  bindToggles(){
    document.querySelectorAll('[data-toggle]').forEach(t => {
      /* تجنّب الربط المتكرر */
      if(t._bound) return;
      t._bound = true;

      t.addEventListener('click', () => {
        const k = t.dataset.toggle;
        Save.data.admin[k] = !Save.data.admin[k];
        Save.save();
        const sw = document.getElementById('sw-' + k);
        if(sw) sw.classList.toggle('on', Save.data.admin[k]);
        if(typeof applyAdminEffects === 'function') applyAdminEffects();
        this.logAudit('system', 'toggle', `⚙ ${k} → ${Save.data.admin[k]}`);
        Sfx.tap(); haptic(6);
      });
    });
  },

  /* ═══════════════ Coins ═══════════════ */
  bindCoins(){
    document.querySelectorAll('[data-add-coins]').forEach(b => {
      if(b._bound) return;
      b._bound = true;

      b.addEventListener('click', () => {
        const amount = parseInt(b.dataset.addCoins, 10);
        Save.data.coins += amount;
        Save.save();
        const cv = document.getElementById('admin-coins-value');
        if(cv) cv.textContent = Save.data.coins.toLocaleString();
        if(typeof updateCoinsUI === 'function') updateCoinsUI();
        this.logAudit('economy', 'change', `💰 ${amount > 0 ? '+' : ''}${amount} عملة`);
        Sfx.coin(); haptic(10);
      });
    });

    const resetCoins = document.getElementById('admin-reset-coins');
    if(resetCoins && !resetCoins._bound){
      resetCoins._bound = true;
      resetCoins.addEventListener('click', () => {
        if(!confirm('تصفير رصيدك؟')) return;
        Save.data.coins = 0;
        Save.save();
        const cv = document.getElementById('admin-coins-value');
        if(cv) cv.textContent = '0';
        if(typeof updateCoinsUI === 'function') updateCoinsUI();
        this.logAudit('economy', 'reset', '🔄 تصفير الرصيد');
        Sfx.tap();
      });
    }
  },

  /* ═══════════════ Players Binding ═══════════════ */
  bindPlayers(){
    const loadBtn = document.getElementById('admin-load-players');
    if(loadBtn && !loadBtn._bound){
      loadBtn._bound = true;
      loadBtn.addEventListener('click', () => this.loadPlayers());
    }

    const search = document.getElementById('admin-players-search');
    if(search && !search._bound){
      search._bound = true;
      let timer;
      search.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.searchQuery = search.value.trim();
          this.renderPlayers();
        }, 250);
      });
    }

    const filter = document.getElementById('admin-players-filter');
    if(filter && !filter._bound){
      filter._bound = true;
      filter.addEventListener('change', () => {
        this.currentFilter = filter.value;
        this.renderPlayers();
      });
    }
  },

  async loadPlayers(){
    const list = document.getElementById('admin-players-list');
    if(!list) return;

    list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--ink-mute);font-size:12px;">⏳ جارٍ التحميل...</div>';

    if(!Cloud.db){
      list.innerHTML = '<div style="text-align:center;padding:20px;color:#C14A4A;font-size:12px;">⚠ Firebase غير متصل</div>';
      return;
    }

    try {
      const snap = await Cloud.db.collection('players').limit(100).get();
      this.players = [];
      snap.forEach(doc => {
        const data = doc.data();
        data.uid = doc.id;
        this.players.push(data);
      });
      this.renderPlayers();
      this.logAudit('player', 'loaded', `👥 تحميل ${this.players.length} لاعب`);
      Sfx.tap(); haptic(6);
    } catch(e){
      list.innerHTML = `<div style="text-align:center;padding:20px;color:#C14A4A;font-size:12px;">⚠ فشل: ${e.message}</div>`;
    }
  },

  /* ═══════════════ Search Modal ═══════════════ */
  bindSearch(){
    const modal = document.getElementById('admin-search-modal');
    if(!modal || modal._bound) return;
    modal._bound = true;

    const input = document.getElementById('admin-search-input');
    const results = document.getElementById('admin-search-results');
    const backdrop = modal.querySelector('.admin-modal-backdrop');

    backdrop.addEventListener('click', () => this.closeSearchModal());

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if(!q){
        results.innerHTML = '';
        return;
      }
      this.searchEverywhere(q, results);
    });
  },

  openSearchModal(){
    const modal = document.getElementById('admin-search-modal');
    if(!modal) return;
    modal.classList.add('active');
    const input = document.getElementById('admin-search-input');
    if(input){
      input.value = '';
      setTimeout(() => input.focus(), 100);
    }
  },

  closeSearchModal(){
    const modal = document.getElementById('admin-search-modal');
    if(modal) modal.classList.remove('active');
  },

  searchEverywhere(q, container){
    const matches = [];

    /* الأقسام */
    const sections = [
      { id: 'dashboard', title: 'لوحة التحكم', icon: '📊' },
      { id: 'content', title: 'المحتوى المخصص', icon: '🎨' },
      { id: 'players', title: 'اللاعبون', icon: '👥' },
      { id: 'economy', title: 'الاقتصاد', icon: '💰' },
      { id: 'events', title: 'الأحداث', icon: '🎪' },
      { id: 'preview', title: 'المعاينة الحية', icon: '👁️' },
      { id: 'system', title: 'حالة النظام', icon: '⚙️' },
      { id: 'audit', title: 'سجل التدقيق', icon: '📜' }
    ];
    sections.forEach(s => {
      if(s.title.includes(q) || s.id.includes(q)){
        matches.push({ type: 'tab', id: s.id, title: s.title, icon: s.icon });
      }
    });

    /* الفئات */
    const contentTabs = document.querySelectorAll('#admin-content-tabs .act-chip');
    contentTabs.forEach(chip => {
      const text = chip.textContent.toLowerCase();
      if(text.includes(q)){
        matches.push({
          type: 'content-tab',
          id: chip.dataset.act,
          title: chip.textContent.trim(),
          icon: '🎨'
        });
      }
    });

    if(matches.length === 0){
      container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--ink-mute);font-size:12px;">لا نتائج</div>';
      return;
    }

    container.innerHTML = matches.slice(0, 15).map(m => `
      <div class="asr-item" data-type="${m.type}" data-id="${m.id}">
        ${m.icon} ${this.escape(m.title)}
      </div>
    `).join('');

    container.querySelectorAll('.asr-item').forEach(el => {
      el.addEventListener('click', () => {
        const type = el.dataset.type;
        const id = el.dataset.id;
        if(type === 'tab') this.switchTab(id);
        else if(type === 'content-tab'){
          this.switchTab('content');
          const chip = document.querySelector(`#admin-content-tabs [data-act="${id}"]`);
          if(chip) chip.click();
        }
        this.closeSearchModal();
      });
    });
  },

  /* ═══════════════ Help Modal ═══════════════ */
  openHelpModal(){
    const modal = document.getElementById('admin-help-modal');
    if(!modal) return;
    modal.classList.add('active');
    const backdrop = modal.querySelector('.admin-modal-backdrop');
    if(backdrop && !backdrop._bound){
      backdrop._bound = true;
      backdrop.addEventListener('click', () => modal.classList.remove('active'));
    }
  },

  /* ═══════════════ Keyboard ═══════════════ */
  bindKeyboard(){
    if(window._adminKbBound) return;
    window._adminKbBound = true;

    window.addEventListener('keydown', e => {
      /* تجاهل إذا نكتب في حقل */
      const tag = (e.target && e.target.tagName || '').toLowerCase();
      if(tag === 'input' || tag === 'textarea') return;

      /* فتح البحث */
      if(e.key === '/' && !e.ctrlKey && !e.metaKey){
        e.preventDefault();
        this.openSearchModal();
        return;
      }

      /* المساعدة */
      if(e.key === '?'){
        this.openHelpModal();
        return;
      }

      /* إغلاق المودالات */
      if(e.key === 'Escape'){
        this.closeSearchModal();
        const hm = document.getElementById('admin-help-modal');
        if(hm) hm.classList.remove('active');
        const fm = document.getElementById('admin-form');
        if(fm) fm.classList.remove('active');
        return;
      }

      /* التنقل بين التبويبات */
      if(e.key >= '1' && e.key <= '8'){
        const tabs = ['dashboard','content','players','economy','events','preview','system','audit'];
        const idx = parseInt(e.key, 10) - 1;
        if(tabs[idx]) this.switchTab(tabs[idx]);
      }
    });
  },

  /* ═══════════════ Auto Refresh ═══════════════ */
  startAutoRefresh(){
    if(this.refreshTimer) clearInterval(this.refreshTimer);
    this.refreshTimer = setInterval(() => {
      const screen = document.getElementById('s-admin');
      if(!screen || !screen.classList.contains('active')) return;
      if(this.tab === 'dashboard') this.loadLiveStats();
    }, 15000); // كل 15 ثانية
  },

  /* ═══════════════ Live Preview ═══════════════ */
  initPreview(){
    const canvas = document.getElementById('admin-preview-canvas');
    if(!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = 240, h = 320;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    /* رسم خلفية */
    const bg = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, w/2);
    bg.addColorStop(0, '#FBF7F0');
    bg.addColorStop(1, '#E8E0D2');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    /* رسم الشخصية */
    ctx.save();
    ctx.translate(w/2, h/2);
    try {
      if(typeof renderCharacter === 'function'){
        renderCharacter(ctx, 40, currentSkin(), {
          mode: 'FLIP', rot: 0, alpha: 1, skipExtras: false
        });
      }
    } catch(e){
      console.warn('[Preview] renderCharacter failed:', e);
    }
    ctx.restore();

    /* بناء عناصر التحكم */
    this.buildPreviewControls();
  },

  buildPreviewControls(){
    const container = document.getElementById('admin-preview-controls');
    if(!container) return;

    /* ✅ التصنيفات v3 فقط */
    const cats = [
      { id: 'skin', label: 'الزي' },
      ...COSMETIC_CATEGORY_ORDER.map(cat => ({
        id: cat,
        label: COSMETIC_CATEGORIES[cat].label
      }))
    ];

    container.innerHTML = cats.map(c => {
      const isSkin = c.id === 'skin';
      const current = isSkin ? Save.data.currentSkin : (Save.data.cosmetics.current[c.id] || '');

      let items;
      if(isSkin){
        items = (typeof getAllSkins === 'function' ? getAllSkins() : []).map(s => ({ id: s.id, name: s.ar }));
      } else {
        items = (typeof getAllCosmetics === 'function' ? getAllCosmetics(c.id) : []).map(s => ({ id: s.id, name: s.name }));
      }

      return `
        <div class="apc-row">
          <div class="apc-label">${c.label}</div>
          <select class="apc-select" data-preview-cat="${c.id}">
            ${items.map(it => `<option value="${it.id}"${it.id === current ? ' selected' : ''}>${it.name}</option>`).join('')}
          </select>
        </div>
      `;
    }).join('');

    /* ربط التغيير */
    container.querySelectorAll('[data-preview-cat]').forEach(sel => {
      sel.addEventListener('change', () => {
        const cat = sel.dataset.previewCat;
        const val = sel.value;
        if(cat === 'skin'){
          Save.data.currentSkin = val;
        } else {
          Save.data.cosmetics.current[cat] = val;
        }
        Save.save();
        this.initPreview();
        Sfx.tap(); haptic(4);
      });
    });
  },

  /* ═══════════════ Helpers ═══════════════ */
  escape(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    }[c]));
  },

  timeAgo(ts){
    const diff = Math.floor((Date.now() - ts) / 1000);
    if(diff < 60) return 'الآن';
    if(diff < 3600) return `${Math.floor(diff/60)} د`;
    if(diff < 86400) return `${Math.floor(diff/3600)} س`;
    return `${Math.floor(diff/86400)} يوم`;
  },

  formatTime(ts){
    const d = new Date(ts);
    return d.toLocaleString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    });
  },

  copyToClipboard(text){
    try {
      navigator.clipboard.writeText(text);
      alert('✓ تم النسخ');
    } catch(e){
      alert('فشل النسخ: ' + text);
    }
  }
};

/* ═══════════════════════════════════════════════════════════
   ═══════════════ AUTO-INTEGRATION ═══════════════
   ═══════════════════════════════════════════════════════════ */

/* ═══ تهيئة تلقائية عند فتح لوحة المشرف ═══ */
(function patchAdminPanel(){
  const originalBuild = window.buildAdminPanel;
  if(typeof originalBuild === 'function'){
    window.buildAdminPanel = function(){
      originalBuild.apply(this, arguments);
      if(!Admin.initialized) Admin.init();
      Admin.refreshAll();
    };
  }
})();

/* ═══ إضافة زر Admin في القائمة الرئيسية ═══ */
(function patchHomeMenu(){
  document.addEventListener('DOMContentLoaded', () => {
    const adminBtn = document.getElementById('menu-admin-btn');
    if(adminBtn && !adminBtn._adminBound){
      adminBtn._adminBound = true;
      adminBtn.addEventListener('click', () => {
        setTimeout(() => {
          if(!Admin.initialized) Admin.init();
          Admin.refreshAll();
        }, 100);
      });
    }
  });
})();

/* ═══ تصدير للاستخدام الخارجي ═══ */
window.Admin = Admin;

/* ============================================================
   ═══ ضمان ظهور تبويبات لوحة المشرف دائماً ═══
   ============================================================ */
(function forceAdminTabsVisible(){

  function fixTabs(){
    const tabs = document.getElementById('admin-tabs');
    if(!tabs) return;

    /* فرض كل خصائص العرض */
    const force = {
      display: 'flex',
      visibility: 'visible',
      opacity: '1',
      height: 'auto',
      minHeight: '52px',
      flexShrink: '0',
      width: '100%',
      boxSizing: 'border-box',
      overflowX: 'auto',
      overflowY: 'hidden',
      position: 'relative',
      zIndex: '5',
      alignItems: 'center',
      flexWrap: 'nowrap'
    };
    Object.assign(tabs.style, force);

    /* فرض ظهور كل زر */
    tabs.querySelectorAll('.admin-tab').forEach(tab => {
      tab.style.display = 'inline-flex';
      tab.style.visibility = 'visible';
      tab.style.opacity = '1';
      tab.style.flexShrink = '0';
    });

    console.log('[Admin] ✅ Tabs forced visible:', tabs.querySelectorAll('.admin-tab').length, 'tabs');
  }

  /* 1) عند فتح لوحة المشرف */
  document.addEventListener('click', (e) => {
    if(e.target.closest('#menu-admin-btn') ||
       e.target.closest('[data-menu="admin"]')){
      setTimeout(fixTabs, 100);
      setTimeout(fixTabs, 400);
    }
  });

  /* 2) عند تبديل التبويبات */
  document.addEventListener('click', (e) => {
    if(e.target.closest('.admin-tab')){
      setTimeout(fixTabs, 50);
    }
  });

  /* 3) عند الجاهزية */
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setTimeout(fixTabs, 200));
  } else {
    setTimeout(fixTabs, 200);
  }

  /* 4) مراقب دوري خفيف */
  setInterval(() => {
    const screen = document.getElementById('s-admin');
    if(screen && screen.classList.contains('active')){
      const tabs = document.getElementById('admin-tabs');
      if(tabs && getComputedStyle(tabs).height === '0px'){
        console.warn('[Admin] Tabs collapsed — fixing...');
        fixTabs();
      }
    }
  }, 1500);

})();

/* ============================================================
   ASSET SYSTEM v3 — IMAGE-FIRST
   ============================================================
   يدعم:
   - صورة واحدة (PNG / WebP / Data URL)
   - Sprite Sheet أفقي (frames متساوية)
   - نقاط ارتكاز (anchor)
   - تحميل مسبق مع progress
   - Cache ذكي مع رفض الصور المعطوبة
   ============================================================ */

const ASSET = {
  _cache: new Map(),        /* src → HTMLImageElement */
  _failed: new Set(),       /* srcs فشل تحميلها */
  _sprites: new Map(),      /* src → {frames, w, h} */
  _preloadQueue: [],

  /* ═══ جلب أو تحميل صورة ═══ */
  get(src){
    if(!src || typeof src !== 'string') return null;
    if(this._failed.has(src)) return null;
    if(this._cache.has(src)) return this._cache.get(src);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img._ready = false;
    img._errored = false;

    img.onload = () => {
      img._ready = true;
      /* تسجيل كـ sprite إذا كان لديه metadata */
      if(img.dataset && img.dataset.frames){
        this._sprites.set(src, {
          frames: parseInt(img.dataset.frames, 10) || 1,
          w: img.naturalWidth,
          h: img.naturalHeight
        });
      }
    };
    img.onerror = () => {
      img._errored = true;
      this._failed.add(src);
      console.warn('[Asset] Failed:', src);
    };
    img.src = src;
    this._cache.set(src, img);
    return img;
  },

  /* ═══ Preload مسبق مع progress ═══ */
  preload(sources, onProgress){
    return new Promise(resolve => {
      const list = (sources || []).filter(Boolean);
      if(!list.length){ resolve({ ok: 0, fail: 0 }); return; }

      let done = 0, ok = 0, fail = 0;
      const check = (success) => {
        done++;
        if(success) ok++; else fail++;
        if(onProgress) onProgress(done, list.length);
        if(done === list.length) resolve({ ok, fail });
      };

      for(const src of list){
        const cached = this._cache.get(src);
        if(cached){
          if(cached._ready) check(true);
          else if(cached._errored) check(false);
          else {
            cached.addEventListener('load', () => check(true), { once: true });
            cached.addEventListener('error', () => check(false), { once: true });
          }
          continue;
        }
        const img = this.get(src);
        if(!img){ check(false); continue; }
        img.addEventListener('load', () => check(true), { once: true });
        img.addEventListener('error', () => check(false), { once: true });
      }
    });
  },

  /* ═══ استخراج صورة عنصر ═══ */
resolve(item){
  if(!item) return null;
  if(item.imageData) return item.imageData;

  if(item.imagePath){
    const p = String(item.imagePath).trim();
    if(!p) return null;

    /* مسار كامل أو data URL */
    if(p.startsWith('http') || p.startsWith('data:')) return p;
    if(p.startsWith('assets/')) return p;

    /* ✅ تحديد المجلد: من العنصر أو من التصنيف */
    let folder = item._folder;
    if(!folder && item.category && typeof CATEGORY_FOLDERS !== 'undefined'){
      folder = CATEGORY_FOLDERS[item.category];
    }
    if(!folder && item._sourceCat && typeof CATEGORY_FOLDERS !== 'undefined'){
      folder = CATEGORY_FOLDERS[item._sourceCat];
    }
    if(!folder) folder = 'misc';

    return 'assets/custom/' + folder + '/' + p.replace(/^\/+/, '');
  }
  return null;
},

  /* ═══ الحصول على عنصر الصورة (للاستخدام المباشر) ═══ */
  getImage(item){
    const src = this.resolve(item);
    if(!src) return null;
    const img = this.get(src);
    if(!img || !img._ready) return null;
    return img;
  },

  /* ═══ رسم عنصر كصورة كاملة (مع anchor) ═══ */
  drawItem(ctx, item, opts = {}){
    const img = this.getImage(item);
    if(!img) return false;

    const {
      x = 0, y = 0,
      size = 64,
      scale = 1,
      rotation = 0,
      alpha = 1,
      anchorX = 0.5,      /* 0..1 نسبة داخل الصورة */
      anchorY = 0.5,
      flipX = false,
      flipY = false,
      tint = null,        /* لون تلوين اختياري */
      blend = 'source-over'
    } = opts;

    const w = size * scale;
    const h = size * scale * (item.aspectRatio || (img.naturalHeight / img.naturalWidth || 1));

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation = blend;
    ctx.translate(x, y);
    if(rotation) ctx.rotate(rotation);
    if(flipX || flipY) ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);

    /* تلوين عبر canvas مؤقت */
    if(tint){
      const tmp = document.createElement('canvas');
      tmp.width = img.naturalWidth;
      tmp.height = img.naturalHeight;
      const tctx = tmp.getContext('2d');
      tctx.drawImage(img, 0, 0);
      tctx.globalCompositeOperation = 'multiply';
      tctx.fillStyle = tint;
      tctx.fillRect(0, 0, tmp.width, tmp.height);
      tctx.globalCompositeOperation = 'destination-in';
      tctx.drawImage(img, 0, 0);
      ctx.drawImage(tmp, -w * anchorX, -h * anchorY, w, h);
    } else {
      ctx.drawImage(img, -w * anchorX, -h * anchorY, w, h);
    }
    ctx.restore();
    return true;
  },

  /* ═══ رسم sprite (مع إطار متحرك) ═══ */
  drawSprite(ctx, item, opts = {}){
    const src = this.resolve(item);
    if(!src) return false;
    const img = this.get(src);
    if(!img || !img._ready) return false;

    const {
      x = 0, y = 0,
      size = 64,
      frame = 0,
      frames = item.frames || 1,
      frameRow = 0,         /* لو كان Sprite Sheet 2D */
      rows = item.rows || 1,
      rotation = 0,
      alpha = 1,
      anchorX = 0.5,
      anchorY = 0.5,
      flipX = false
    } = opts;

    const fw = img.naturalWidth / frames;
    const fh = img.naturalHeight / rows;
    const sx = (frame % frames) * fw;
    const sy = frameRow * fh;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    if(rotation) ctx.rotate(rotation);
    if(flipX) ctx.scale(-1, 1);
    ctx.drawImage(
      img,
      sx, sy, fw, fh,
      -size * anchorX, -size * anchorY,
      size, size * (fh / fw)
    );
    ctx.restore();
    return true;
  },

  /* ═══ التحميل المسبق لمحتوى اللاعب الحالي ═══ */
async preloadPlayerAssets(){
  const sources = [];
  const add = (item) => {
    const s = this.resolve(item);
    if(s) sources.push(s);
  };

  /* ═══ v3 categories فقط ═══ */
  add(currentSkin());
  add(currentHead());
  add(currentBack());
  add(currentEyes());
  add(currentTrail());
  add(currentSpark());
  add(currentJump());
  add(currentSpawn());
  add(currentRevive());
  add(currentDeath());
  add(currentAvatar());
  add(currentAvatarFrame());
  add(currentBanner());
  add(currentNameTag());
  add(currentBadge());

  return this.preload(sources);
}
};

/* ═══ helper: رسم مع fallback برمجي ═══ */
function drawWithFallback(ctx, item, drawFallbackFn, opts = {}){
  if(item && ASSET.drawItem(ctx, item, opts)) return true;
  if(item && item.frames > 1 && ASSET.drawSprite(ctx, item, opts)) return true;
  if(drawFallbackFn) drawFallbackFn(ctx);
  return false;
}

/* ============================================================
   ═══════════════════════════════════════════════════════════
   ═══════════ SHIFT v2 — HOME & PAGES ENGINE ═══════════════
   ═══════════════════════════════════════════════════════════
   يضيف:
   - بطاقة لاعب ديناميكية في الأعلى
   - معاينة شخصية حية (canvas)
   - زر اختيار النمط كصفحة منفصلة
   - أزرار أفقية Scrollable
   - صفحات: Level, Stats v2, Settings v2, Battle Pass v2,
     Ranks v2, Events v2, Shop v2 (Merged), Missions v2,
     Chests, Lucky Wheel, Friends, Leaderboard,
     Achievements v2, Profile v2
   ============================================================ */

/* ═══════════════ المتغيرات العامة ═══════════════ */
let currentShopTab = 'skins';
let currentStatsTab = 'overview';
let currentMissionTab = 'daily';
let currentLbTab = 'coins';
let currentProfileTab = 'info';
let currentAchCat = 'all';
let currentBPTrack2 = 'free';

let _previewRAF = null;
let _statsChartData = null;

/* ============================================================
   ═══════════════ HOME v2 — CORE ════════════════════════════
   ============================================================ */

function buildHomeV2(){
  updatePlayerCard();
  drawPlayerPreview();
  updateModeSelectorBtn();
  updateHomeBadges();

  /* تلميح عن أول تشغيل */
  if(!Save.data._seenHomeV2){
    Save.data._seenHomeV2 = true;
    Save.save();
  }
}

/* ═══ بطاقة اللاعب ═══ */
function updatePlayerCard(){
  const user = Cloud.user;
  const profile = Cloud.profile;
  const title = getPlayerTitle(Save.data);

  const name = (profile && profile.username) || (user && user.displayName) || 'لاعب';
  const photo = (user && user.photoURL) || null;

  /* الاسم */
  const nameEl = document.getElementById('pch-name');
  if(nameEl) nameEl.textContent = name;

  /* اللقب */
  const titleEl = document.getElementById('pch-title');
  if(titleEl){
    titleEl.textContent = title.icon + ' ' + title.name;
    titleEl.style.color = title.color;
  }

  /* الصورة/الإيموجي */
/* ═══ الصورة الشخصية (أولوية: COSMETIC > Google) ═══ */
const avatarCos = currentAvatar();
const avatarImg = document.getElementById('pch-img');
const avatarEmoji = document.getElementById('pch-emoji');

if(avatarImg && avatarEmoji){
  let finalPhoto = null;

  /* 1) الصورة الشخصية من التجميل */
  if(avatarCos && avatarCos.id !== 'none' && hasItemImage(avatarCos)){
    finalPhoto = ASSET.resolve(avatarCos);
  }
  /* 2) Google photo */
  else if(photo){
    finalPhoto = photo;
  }

  if(finalPhoto){
    avatarImg.src = finalPhoto;
    avatarImg.style.display = 'block';
    avatarEmoji.style.display = 'none';
    avatarImg.onerror = () => {
      avatarImg.style.display = 'none';
      avatarEmoji.style.display = 'inline';
      avatarEmoji.textContent = name.charAt(0).toUpperCase() || '👤';
    };
  } else {
    avatarImg.style.display = 'none';
    avatarEmoji.style.display = 'inline';
    avatarEmoji.textContent = name.charAt(0).toUpperCase() || '👤';
  }
}

/* ═══ خلفية البطاقة ═══ */
const bannerCos = currentBanner();
const heroEl = document.getElementById('player-hero-merged');
if(heroEl){
  /* احذف القديمة */
  const oldBg = heroEl.querySelector('.phm-bg-img');
  if(oldBg) oldBg.remove();

  if(bannerCos && bannerCos.id !== 'none' && hasItemImage(bannerCos)){
    const bg = document.createElement('img');
    bg.className = 'phm-bg-img';
    bg.src = ASSET.resolve(bannerCos);
    bg.alt = '';
    heroEl.insertBefore(bg, heroEl.firstChild);
  }
}

  /* إطار الصورة الرمزية */
  const frameEl = document.getElementById('pch-frame');
  if(frameEl){
    frameEl.innerHTML = '';
    const frame = currentAvatarFrame();
    if(frame && frame.id !== 'none'){
      if(typeof hasItemImage === 'function' && hasItemImage(frame)){
        const img = document.createElement('img');
        img.src = ASSET.resolve(frame);
        frameEl.appendChild(img);
      } else {
        frameEl.style.border = `3px solid ${frame.color || '#E8B34E'}`;
        frameEl.style.boxShadow = `0 0 20px ${frame.color || '#E8B34E'}80`;
      }
    } else {
      frameEl.style.border = '';
      frameEl.style.boxShadow = '';
    }
  }

  /* شارة صغيرة */
  const badgeEl = document.getElementById('pch-badge');
  if(badgeEl){
    badgeEl.innerHTML = '';
    const badge = currentBadge();
    if(badge && badge.id !== 'none'){
      if(typeof hasItemImage === 'function' && hasItemImage(badge)){
        const img = document.createElement('img');
        img.src = ASSET.resolve(badge);
        badgeEl.appendChild(img);
      } else {
        badgeEl.textContent = '⭐';
      }
    }
  }

  /* المستوى */
  const totalM = getGlobalMeters();
  const lvl = getGlobalLevel() + 1;
  const prog = levelProgress(totalM, GLOBAL_LEVEL_THRESHOLDS) * 100;

  const lvlNum = document.getElementById('pch-lvl-num');
  const lvlMeters = document.getElementById('pch-lvl-meters');
  const lvlRing = document.querySelector('.pch-lvl-ring');
  const progFill = document.getElementById('pch-progress-fill');

  if(lvlNum) lvlNum.textContent = lvl;
  if(lvlMeters) lvlMeters.textContent = Math.floor(totalM).toLocaleString() + 'م';
  if(lvlRing) lvlRing.style.setProperty('--p', prog);
  if(progFill) progFill.style.width = prog + '%';

  /* ربط زر المستوى */
  const lvlBtn = document.getElementById('pch-level-btn');
  if(lvlBtn && !lvlBtn._bound){
    lvlBtn._bound = true;
    lvlBtn.addEventListener('click', () => {
      buildLevelPage();
      showScreen('s-level');
      Sfx.tap(); haptic(6);
    });
  }
}

function drawPlayerPreview(){
  const canvas = document.getElementById('player-preview-canvas');
  if(!canvas) return;

  /* ✅ الأبعاد الجديدة للدمج (140×170) */
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = 140;
  const h = 170;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  const pctx = canvas.getContext('2d');
  pctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const drawFrame = () => {
    pctx.clearRect(0, 0, w, h);

    /* أرضية خفيفة */
    const groundY = h * 0.82;
    const grad = pctx.createLinearGradient(0, groundY - 20, 0, h);
    grad.addColorStop(0, 'rgba(232,179,78,0.08)');
    grad.addColorStop(1, 'rgba(232,179,78,0)');
    pctx.fillStyle = grad;
    pctx.fillRect(0, groundY, w, h - groundY);

    /* ظل الشخصية */
    pctx.fillStyle = 'rgba(0,0,0,.25)';
    pctx.beginPath();
    pctx.ellipse(w/2, groundY + 4, 32, 6, 0, 0, Math.PI*2);
    pctx.fill();

    /* الشخصية */
    pctx.save();
    pctx.translate(w/2, groundY - 45);
    if(typeof renderCharacter === 'function'){
      try {
        renderCharacter(pctx, 30, currentSkin(), {
          mode: 'WALK', rot: 0, alpha: 1, skipExtras: false
        });
      } catch(e){}
    }
    pctx.restore();
  };

  drawFrame();

  /* رسم متحرك للتأثيرات */
  if(_previewRAF) cancelAnimationFrame(_previewRAF);
  let frames = 0;
  const animate = () => {
    drawFrame();
    frames++;
    if(frames < 300 && document.getElementById('s-home').classList.contains('active')){
      _previewRAF = requestAnimationFrame(animate);
    } else {
      _previewRAF = null;
    }
  };
  animate();

  /* زر تعديل المظهر */
  const editBtn = document.getElementById('pps-edit-btn');
  if(editBtn && !editBtn._bound){
    editBtn._bound = true;
    editBtn.addEventListener('click', () => {
      currentCosTab = 'spark';
      buildCosmetics();
      showScreen('s-cosmetics');
      Sfx.tap(); haptic(6);
    });
  }
}

/* ═══ زر اختيار النمط ═══ */
function updateModeSelectorBtn(){
  const mode = Save.data.mode || 'FLIP';
  const modeData = MODES.find(m => m.id === mode);
  if(!modeData) return;

  const iconEl = document.getElementById('msb-icon');
  const nameEl = document.getElementById('msb-name');
  const bestEl = document.getElementById('msb-best');

  if(iconEl){
    iconEl.textContent = modeData.icon;
    iconEl.style.background = modeData.color;
  }
  if(nameEl) nameEl.textContent = modeData.ar;
  if(bestEl) bestEl.textContent = (Save.data.bestMeters[mode] || 0) + 'م';

  /* ربط الزر */
  const btn = document.getElementById('mode-selector-btn');
  if(btn && !btn._bound){
    btn._bound = true;
    btn.addEventListener('click', () => {
      buildModeSelectorPage();
      showScreen('s-mode-select');
      Sfx.tap(); haptic(6);
    });
  }
}

/* ═══ شارات الصفحة الرئيسية ═══ */
function updateHomeBadges(){
  /* مهام */
  const missionsBadge = document.getElementById('missions-badge');
  if(missionsBadge){
    const hasReadyMission = ['daily','weekly','monthly'].some(tier => {
      const active = Save.data.missions[tier] || [];
      return active.some(id => {
        const d = getMissionData(tier, id);
        if(!d) return false;
        const claimKey = `claimed_${tier}_${id}`;
        return d.done && !Save.data.missions[claimKey];
      });
    });
    missionsBadge.style.display = hasReadyMission ? 'flex' : 'none';
  }

  /* إنجازات */
  const achBadge = document.getElementById('hm-ach-badge');
  if(achBadge){
    const total = ACHIEVEMENTS.length;
    const unlocked = ACHIEVEMENTS.filter(a => Save.data.achievements[a.id]).length;
    const rem = total - unlocked;
    achBadge.style.display = rem > 0 ? 'flex' : 'none';
    achBadge.textContent = rem;
  }

  /* جوائز يومية */
  const dailyBadge = document.getElementById('hm-daily-badge');
  if(dailyBadge){
    const canClaim = typeof canClaimDaily === 'function' ? canClaimDaily() : false;
    dailyBadge.style.display = canClaim ? 'flex' : 'none';
  }
}

/* ============================================================
   ═══════════════ MODE SELECTOR PAGE ════════════════════════
   ============================================================ */

function buildModeSelectorPage(){
  const grid = document.getElementById('mode-grid-v2');
  if(!grid) return;
  grid.innerHTML = '';

  const selectedMode = Save.data.mode || 'FLIP';

  MODES.forEach(m => {
    const el = document.createElement('button');
    el.className = 'mode-card-v2' + (m.id === selectedMode ? ' sel' : '');
    el.style.setProperty('--mc', m.color);

    const best = Save.data.bestMeters[m.id] || 0;
    const lvl = getModeLevel(m.id) + 1;

    el.innerHTML = `
      <div class="mcv2-icon">${m.icon}</div>
      <div class="mcv2-info">
        <div class="mcv2-name">${m.ar}</div>
        <div class="mcv2-en">${m.en}</div>
        <div class="mcv2-desc">${m.desc}</div>
      </div>
      <div class="mcv2-best">
        <div class="mcv2-best-val">${best}م</div>
        <div class="mcv2-best-lvl">LVL ${lvl}</div>
      </div>
      <div class="mcv2-check">✓</div>
    `;

    el.addEventListener('click', () => {
      Save.data.mode = m.id;
      Save.save();
      Sfx.reward(); haptic(12);
      buildModeSelectorPage();
      updateModeSelectorBtn();
      setTimeout(() => showScreen('s-home'), 250);
    });

    grid.appendChild(el);
  });
}

/* ============================================================
   ═══════════════ LEVEL PAGE ════════════════════════════════
   ============================================================ */

function buildLevelPage(){
  const totalM = getGlobalMeters();
  const lvl = getGlobalLevel();
  const lvlDisplay = lvl + 1;
  const prog = levelProgress(totalM, GLOBAL_LEVEL_THRESHOLDS);
  const currentThreshold = GLOBAL_LEVEL_THRESHOLDS[lvl] || 0;
  const nextThreshold = GLOBAL_LEVEL_THRESHOLDS[lvl + 1] || (currentThreshold + 10000);

  /* الرقم */
  const numEl = document.getElementById('level-page-num');
  if(numEl) numEl.textContent = lvlDisplay;

  /* الحلقة الدائرية */
  const ringProg = document.getElementById('level-ring-progress');
  if(ringProg){
    const circumference = 2 * Math.PI * 52;
    const offset = circumference * (1 - prog);
    ringProg.style.strokeDashoffset = offset;
    ringProg.style.transition = 'stroke-dashoffset .8s cubic-bezier(.34,1.56,.64,1)';
  }

  /* المسافات */
  const currentEl = document.getElementById('level-current-m');
  const nextEl = document.getElementById('level-next-m');
  if(currentEl) currentEl.textContent = Math.floor(totalM).toLocaleString();
  if(nextEl) nextEl.textContent = Math.max(0, nextThreshold - Math.floor(totalM)).toLocaleString();

  /* قائمة المكافآت القادمة */
  buildLevelRewardsList(lvl);

  /* قائمة كل المستويات */
  buildAllLevelsList(lvl);
}

function buildLevelRewardsList(currentLvl){
  const list = document.getElementById('level-rewards-list');
  if(!list) return;
  list.innerHTML = '';

  for(let i = currentLvl; i < currentLvl + 5; i++){
    const threshold = GLOBAL_LEVEL_THRESHOLDS[i] || (currentLvl * 5000);
    const reward = levelRewardFor(i);
    const isUnlocked = currentLvl >= i;
    const isClaimed = (Save.data.claimedGlobalLevels || []).includes(i);
    const isNext = (i === currentLvl + 1);

    const el = document.createElement('div');
    el.className = 'lvl-reward-card' +
      (isUnlocked ? ' unlocked' : '') +
      (isClaimed ? ' claimed' : '');

    el.innerHTML = `
      <div class="lrc-lvl">${i + 1}</div>
      <div class="lrc-info">
        <div class="lrc-title">المستوى ${i + 1}${isNext ? ' · القادم' : ''}</div>
        <div class="lrc-sub">${threshold.toLocaleString()} متر</div>
      </div>
      <div class="lrc-reward">◆ ${reward.coins}</div>
      ${isUnlocked && !isClaimed
        ? `<button class="lrc-claim-btn" data-lvl="${i}">استلام</button>`
        : isClaimed
          ? `<span style="color:var(--sage);font-size:12px;font-weight:700;">✓</span>`
          : `<span style="color:var(--ink-mute);font-size:11px;">🔒</span>`
      }
    `;

    const btn = el.querySelector('[data-lvl]');
    if(btn){
      btn.addEventListener('click', () => {
        const lvlNum = parseInt(btn.dataset.lvl, 10);
        if((Save.data.claimedGlobalLevels || []).includes(lvlNum)) return;
        const rw = levelRewardFor(lvlNum);
        Save.data.coins += rw.coins;
        Save.data.stats.totalCoins += rw.coins;
        if(!Save.data.claimedGlobalLevels) Save.data.claimedGlobalLevels = [];
        Save.data.claimedGlobalLevels.push(lvlNum);
        Save.save();
        updateCoinsUI();
        Sfx.reward(); haptic(20);
        buildLevelPage();
      });
    }

    list.appendChild(el);
  }
}

function buildAllLevelsList(currentLvl){
  const list = document.getElementById('level-all-list');
  if(!list) return;
  list.innerHTML = '';

  /* عرض آخر 10 مستويات حول المستوى الحالي */
  const start = Math.max(0, currentLvl - 3);
  const end = currentLvl + 7;

  for(let i = start; i < end; i++){
    const threshold = GLOBAL_LEVEL_THRESHOLDS[i] || (i * 5000);
    const isCurrent = i === currentLvl;
    const isUnlocked = currentLvl >= i;
    const isClaimed = (Save.data.claimedGlobalLevels || []).includes(i);

    const el = document.createElement('div');
    el.className = 'lvl-reward-card' + (isUnlocked ? ' unlocked' : '');
    if(isCurrent){
      el.style.borderColor = 'var(--gold)';
      el.style.boxShadow = '0 6px 22px rgba(232,179,78,.35)';
    }

    el.innerHTML = `
      <div class="lrc-lvl">${i + 1}</div>
      <div class="lrc-info">
        <div class="lrc-title">${isCurrent ? '▶ ' : ''}المستوى ${i + 1}</div>
        <div class="lrc-sub">${threshold.toLocaleString()} متر</div>
      </div>
      <div class="lrc-reward">◆ ${levelRewardFor(i).coins}</div>
      ${isClaimed ? '<span style="color:var(--sage);font-size:12px;font-weight:700;">✓</span>' : ''}
    `;

    list.appendChild(el);
  }
}

/* ============================================================
   ═══════════════ STATS v2 ══════════════════════════════════
   ============================================================ */

function buildStatsV2(){
  const totalM = getGlobalMeters();
  const s = Save.data.stats;

  /* Hero */
  const totalEl = document.getElementById('stats-total-m');
  const playsEl = document.getElementById('stats-total-plays');
  if(totalEl) totalEl.textContent = Math.floor(totalM).toLocaleString();
  if(playsEl) playsEl.textContent = s.totalPlays || 0;

  /* Chart */
  drawStatsChart();

  /* Tabs binding */
  document.querySelectorAll('#stats-tabs .tab-chip').forEach(tab => {
    if(tab._bound) return;
    tab._bound = true;
    tab.addEventListener('click', () => {
      currentStatsTab = tab.dataset.statstab;
      document.querySelectorAll('#stats-tabs .tab-chip').forEach(t =>
        t.classList.toggle('active', t === tab));
      renderStatsContent();
      Sfx.tap();
    });
  });

  renderStatsContent();
}

function drawStatsChart(){
  const canvas = document.getElementById('stats-chart');
  if(!canvas) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = 320, h = 100;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = '100%';
  canvas.style.height = h + 'px';

  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  /* بيانات وهمية محاكاة (يمكن استبدالها بتتبع فعلي) */
  const data = [0.2, 0.4, 0.35, 0.6, 0.5, 0.75, 0.9];
  const labels = ['F', 'F', 'D', 'W', 'M', 'A', 'S'];

  const barW = w / data.length - 12;
  const maxH = h - 20;

  data.forEach((val, i) => {
    const x = i * (w / data.length) + 8;
    const barH = val * maxH;
    const y = h - barH - 8;

    const grad = ctx.createLinearGradient(0, y, 0, h);
    grad.addColorStop(0, '#E8B34E');
    grad.addColorStop(1, '#E07A3F');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, barH, 4);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.font = 'bold 9px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], x + barW/2, h - 1);
  });
}

function renderStatsContent(){
  const container = document.getElementById('stats-content');
  if(!container) return;
  container.innerHTML = '';

  const s = Save.data.stats;

  if(currentStatsTab === 'overview'){
    container.innerHTML = `
      <div class="stats-grid">
        <div class="stat-box">
          <div class="sb-icon">🎮</div>
          <div class="sb-val">${s.totalPlays || 0}</div>
          <div class="sb-label">إجمالي الجولات</div>
        </div>
        <div class="stat-box">
          <div class="sb-icon">📏</div>
          <div class="sb-val">${Math.floor(getGlobalMeters()).toLocaleString()}</div>
          <div class="sb-label">مجموع الأمتار</div>
        </div>
        <div class="stat-box">
          <div class="sb-icon">◆</div>
          <div class="sb-val">${(s.totalCoins || 0).toLocaleString()}</div>
          <div class="sb-label">عملات مكتسبة</div>
        </div>
        <div class="stat-box">
          <div class="sb-icon">🔥</div>
          <div class="sb-val">x${s.bestCombo || 0}</div>
          <div class="sb-label">أفضل سلسلة</div>
        </div>
      </div>
    `;
  } else if(currentStatsTab === 'modes'){
    const modeRows = ['FLIP','FLAP','DRIFT','WALK','MIXED'].map(m => {
      const md = MODES.find(x => x.id === m);
      const best = Save.data.bestMeters[m] || 0;
      const lvl = getModeLevel(m) + 1;
      return `
        <div class="lvl-reward-card">
          <div class="lrc-lvl" style="background:${md ? md.color : '#888'};color:#fff;">${md ? md.icon : '◆'}</div>
          <div class="lrc-info">
            <div class="lrc-title">${md ? md.ar : m}</div>
            <div class="lrc-sub">المستوى ${lvl}</div>
          </div>
          <div class="lrc-reward">${best}م</div>
        </div>
      `;
    }).join('');
    container.innerHTML = modeRows;
  } else if(currentStatsTab === 'records'){
    const records = [
      { icon: '🏆', title: 'أفضل مسافة', value: Math.floor(s.bestMeters || 0) + 'م' },
      { icon: '🔥', title: 'أفضل سلسلة', value: 'x' + (s.bestCombo || 0) },
      { icon: '🎯', title: 'المستوى العام', value: (getGlobalLevel() + 1) },
      { icon: '◆', title: 'SHIFT Runs', value: (s.shiftRuns || 0) },
      { icon: '🔮', title: 'كرات الطاقة', value: (s.orbCount || 0) }
    ];
    container.innerHTML = records.map(r => `
      <div class="lvl-reward-card">
        <div class="lrc-lvl">${r.icon}</div>
        <div class="lrc-info">
          <div class="lrc-title">${r.title}</div>
        </div>
        <div class="lrc-reward">${r.value}</div>
      </div>
    `).join('');
  } else if(currentStatsTab === 'progress'){
    const season = Save.data.season || {};
    const items = [
      { icon: '🏅', title: 'نقاط الموسم', value: (season.points || 0).toLocaleString() },
      { icon: '🎨', title: 'الأزياء المملوكة', value: (Save.data.ownedSkins || []).length },
      { icon: '✨', title: 'التأثيرات المملوكة', value: Save.getTotalCosmeticsOwned() },
      { icon: '🏆', title: 'الإنجازات', value: ACHIEVEMENTS.filter(a => Save.data.achievements[a.id]).length + '/' + ACHIEVEMENTS.length }
    ];
    container.innerHTML = items.map(it => `
      <div class="lvl-reward-card">
        <div class="lrc-lvl">${it.icon}</div>
        <div class="lrc-info">
          <div class="lrc-title">${it.title}</div>
        </div>
        <div class="lrc-reward">${it.value}</div>
      </div>
    `).join('');
  }
}

/* ============================================================
   ═══════════════ SETTINGS v2 ═══════════════════════════════
   ============================================================ */

function buildSettingsV2(){
  const container = document.getElementById('settings-content');
  if(!container) return;
  container.innerHTML = '';

  const sections = [
    {
      title: 'الحساب',
      icon: '👤',
      items: [
        { type: 'action', icon: '✏️', title: 'تغيير الاسم', desc: 'بدّل اسمك الظاهر', action: () => {
          const inp = document.getElementById('change-username');
          if(inp) inp.value = (Cloud.profile && Cloud.profile.username) || '';
          const ctr = document.getElementById('change-counter');
          if(ctr) ctr.textContent = inp.value.length + '/16';
          showScreen('s-change-name');
        }},
        { type: 'action', icon: '🎖️', title: 'الملف الشخصي', desc: 'اعرض بطاقتك الكاملة', action: () => {
          buildProfileV2();
          showScreen('s-profile-v2');
        }},
        { type: 'action', icon: '🚪', title: 'تسجيل الخروج', desc: 'سيتم حفظ تقدمك في السحابة', color: '#C14A4A', action: async () => {
          if(!confirm('تسجيل الخروج؟')) return;
          await Cloud.signOut();
          showScreen('s-login');
        }}
      ]
    },
    {
      title: 'الصوت',
      icon: '🔊',
      items: [
        { type: 'toggle', key: 'sound', icon: '🔊', title: 'المؤثرات الصوتية', desc: 'SOUND EFFECTS' },
        { type: 'toggle', key: 'haptics', icon: '📳', title: 'الاهتزاز', desc: 'HAPTIC FEEDBACK' },
        { type: 'toggle', key: 'music', icon: '🎵', title: 'الموسيقى', desc: 'BACKGROUND MUSIC' }
      ]
    },
    {
      title: 'الرسوميات',
      icon: '🎨',
      items: [
        { type: 'toggle', key: 'particles', icon: '✨', title: 'الجسيمات', desc: 'PARTICLE EFFECTS', default: true },
        { type: 'toggle', key: 'shadows', icon: '🌑', title: 'الظلال', desc: 'SHADOWS', default: true },
        { type: 'toggle', key: 'weatherEffects', icon: '🌧️', title: 'تأثيرات الطقس', desc: 'WEATHER FX', default: true }
      ]
    },
    {
      title: 'منطقة الخطر',
      icon: '⚠️',
      items: [
        { type: 'action', icon: '🗑️', title: 'حذف التقدم المحلي', desc: 'سيتم حذفه من Firebase أيضاً', color: '#C14A4A', action: async () => {
          if(!confirm('⚠️ سيتم حذف تقدمك من Firebase نهائياً. متابعة؟')) return;
          if(!confirm('تأكيد أخير؟')) return;
          Save.reset();
          Sfx.tap(); haptic(20);
          alert('✓ تم الحذف');
          location.reload();
        }}
      ]
    }
  ];

  sections.forEach(sec => {
    const head = document.createElement('div');
    head.className = 'admin-section-head';
    head.innerHTML = `
      <div class="admin-section-title">${sec.icon} ${sec.title}</div>
      <div class="admin-section-sub">${sec.title.toUpperCase()}</div>
    `;
    container.appendChild(head);

    sec.items.forEach(item => {
      if(item.type === 'toggle'){
        const on = Save.data.settings[item.key] !== false;
        const row = document.createElement('div');
        row.className = 'admin-toggle';
        row.style.cursor = 'pointer';
        row.innerHTML = `
          <span class="at-ic">${item.icon}</span>
          <div style="flex:1;text-align:right;">
            <div class="at-lbl">${item.title}</div>
            <div style="font-size:10px;color:var(--ink-mute);margin-top:2px;">${item.desc}</div>
          </div>
          <span class="at-sw ${on ? 'on' : ''}"></span>
        `;
        row.addEventListener('click', () => {
          Save.data.settings[item.key] = !Save.data.settings[item.key];
          Save.save();
          row.querySelector('.at-sw').classList.toggle('on', Save.data.settings[item.key]);
          Sfx.tap(); haptic(6);
        });
        container.appendChild(row);
      } else {
        const btn = document.createElement('button');
        btn.className = 'admin-toggle';
        btn.style.width = '100%';
        btn.style.cursor = 'pointer';
        btn.innerHTML = `
          <span class="at-ic">${item.icon}</span>
          <div style="flex:1;text-align:right;">
            <div class="at-lbl" ${item.color ? `style="color:${item.color};"` : ''}>${item.title}</div>
            <div style="font-size:10px;color:var(--ink-mute);margin-top:2px;">${item.desc}</div>
          </div>
          <span style="color:var(--ink-mute);font-size:18px;">‹</span>
        `;
        btn.addEventListener('click', () => { item.action && item.action(); Sfx.tap(); });
        container.appendChild(btn);
      }
    });
  });
}

function buildBattlePassV2(){
  const tier = getBPTier();
  const pts = Save.data.season.points || 0;
  const tierProgress = ((pts % BP_TIER_POINTS) / BP_TIER_POINTS) * 100;

  /* ═══ Hero ═══ */
  const tierEl = document.getElementById('bp-v2-tier');
  const fillEl = document.getElementById('bp-v2-fill');
  const ptsEl = document.getElementById('bp-v2-points');

  if(tierEl) tierEl.textContent = tier;
  if(fillEl){
    fillEl.style.width = (tier >= BP_TIERS ? 100 : tierProgress) + '%';
  }
  if(ptsEl){
    const nextTierPts = (tier + 1) * BP_TIER_POINTS;
    ptsEl.textContent = pts.toLocaleString() + ' / ' + nextTierPts.toLocaleString();
  }

  /* ═══ عرض المكافآت القادمة على المسار ═══ */
  renderBPTierMilestones(tier);

  /* ═══ Track toggle ═══ */
  document.querySelectorAll('.bpt-btn').forEach(btn => {
    if(btn._bound) return;
    btn._bound = true;
    btn.addEventListener('click', () => {
      currentBPTrack2 = btn.dataset.track;
      document.querySelectorAll('.bpt-btn').forEach(b =>
        b.classList.toggle('active', b === btn));
      renderBPTiersV2();
      Sfx.tap();
    });
  });
  document.querySelectorAll('.bpt-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.track === currentBPTrack2);
  });

  renderBPTiersV2();
}

/* ═══ شريط المعالم الأفقية (Milestones) ═══ */
function renderBPTierMilestones(currentTier){
  const container = document.getElementById('bp-v2-tier-milestones');
  if(!container){
    /* أنشئ العنصر إن لم يكن موجوداً */
    const hero = document.querySelector('.bp-hero-v2');
    if(!hero) return;
    const el = document.createElement('div');
    el.id = 'bp-v2-tier-milestones';
    el.className = 'bp-milestones';
    hero.appendChild(el);
    return renderBPTierMilestones(currentTier);
  }

  const milestones = [
    { tier: 5,  icon: '🎁', label: 'عنصر' },
    { tier: 10, icon: '💎', label: 'جواهر' },
    { tier: 15, icon: '🎨', label: 'زي' },
    { tier: 20, icon: '⚡', label: 'تعزيز' },
    { tier: 25, icon: '👑', label: 'Premium' },
    { tier: 30, icon: '🏆', label: 'أسطورة' }
  ];

  container.innerHTML = milestones.map(m => {
    const reached = currentTier >= m.tier;
    return `
      <div class="bp-ms${reached ? ' reached' : ''}">
        <div class="bp-ms-ic">${m.icon}</div>
        <div class="bp-ms-tier">T${m.tier}</div>
        <div class="bp-ms-lbl">${m.label}</div>
      </div>
    `;
  }).join('');
}

/* ═══ قائمة المستويات (Tiers List) ═══ */
function renderBPTiersV2(){
  const list = document.getElementById('bp-v2-tiers');
  if(!list) return;
  list.innerHTML = '';

  const tier = getBPTier();
  const track = currentBPTrack2;
  const claimedArr = track === 'free'
    ? (Save.data.battlePass.claimedFree || [])
    : (Save.data.battlePass.claimedPremium || []);

  const startTier = Math.max(1, tier - 2);
  const endTier = Math.min(BP_TIERS, tier + 12);

  /* ═══ فاصل المستويات السابقة ═══ */
  if(startTier > 1){
    const sep = document.createElement('div');
    sep.className = 'bp-tier-sep';
    sep.innerHTML = `
      <div class="bp-sep-line"></div>
      <span>··· ${startTier - 1} مستوى سابق ···</span>
      <div class="bp-sep-line"></div>
    `;
    list.appendChild(sep);
  }

  /* ═══ عرض المستويات ═══ */
  for(let i = startTier; i <= endTier; i++){
    const unlocked = i <= tier;
    const isCurrent = i === tier;
    const claimed = claimedArr.includes(i);
    const coinReward = 5 + i * 2;
    const rewardAmount = track === 'free' ? coinReward : coinReward * 3;

    /* عناصر مخصصة لهذا المستوى */
    const customItems = track === 'free'
      ? (typeof getBattlePassItems === 'function' ? getBattlePassItems(i, 'free') : [])
      : (typeof getBattlePassItems === 'function' ? getBattlePassItems(i, 'premium') : []);

    const el = document.createElement('div');
    el.className = 'bp-tier-row-v2' +
      (unlocked ? ' unlocked' : '') +
      (isCurrent ? ' current' : '');

    /* badge "أنت هنا" */
    const hereBadge = isCurrent
      ? '<div class="bp-here-badge">📍 أنت هنا</div>'
      : '';

    el.innerHTML = `
      ${hereBadge}
      <div class="bp-tier-num-v2">
        <span class="bp-tier-num-val">${i}</span>
        <span class="bp-tier-num-k">TIER</span>
      </div>
      <div class="bp-rewards-v2">
        <div class="bp-reward-row ${track === 'premium' ? 'premium' : ''}">
          <div class="bp-reward-icon">${track === 'free' ? '◆' : '👑'}</div>
          <div class="bp-reward-info">
            <div class="bp-reward-name">${rewardAmount.toLocaleString()} عملة</div>
            <div class="bp-reward-meta">${track === 'free' ? 'FREE REWARD' : 'PREMIUM REWARD'}</div>
          </div>
          ${claimed
            ? '<button class="bp-claim-btn done" disabled>✓</button>'
            : unlocked && (track === 'free' || Save.data.battlePass.premiumOwned)
              ? `<button class="bp-claim-btn ${track === 'premium' ? 'gold' : ''}" data-tier="${i}">استلام</button>`
              : !unlocked
                ? '<button class="bp-claim-btn locked" disabled>🔒</button>'
                : '<button class="bp-claim-btn premium-locked" disabled>قفل مميز</button>'
          }
        </div>
        ${customItems.map(({item}) => `
          <div class="bp-custom-item" style="--bc:${item.color || '#E8B34E'};">
            <span class="bp-ci-ic">🎁</span>
            <span class="bp-ci-name">${item.name}</span>
            ${unlocked
              ? `<button class="bp-claim-btn small gold" data-tier="${i}" data-custom="${item.id}">استلام</button>`
              : '<span style="font-size:10px;opacity:.5;">🔒</span>'
            }
          </div>
        `).join('')}
      </div>
    `;

    list.appendChild(el);
  }

  /* ═══ أزرار الاستلام ═══ */
  list.querySelectorAll('.bp-claim-btn[data-tier]:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      const tierNum = parseInt(btn.dataset.tier, 10);
      claimBPRewardV2(tierNum, track, btn.dataset.custom);
    });
  });
}

/* ═══ استلام مكافأة ═══ */
function claimBPRewardV2(tier, track, customItemId){
  const tierProgress = getBPTier();
  if(tier > tierProgress){
    Sfx.play(220, 0.15, 'sine', 0.05, 180);
    haptic(20);
    return;
  }

  if(track === 'premium' && !Save.data.battlePass.premiumOwned){
    Sfx.play(220, 0.15, 'sine', 0.05, 180);
    haptic(20);
    return;
  }

  const arr = track === 'free' ? 'claimedFree' : 'claimedPremium';
  if(!Save.data.battlePass[arr]) Save.data.battlePass[arr] = [];
  if(Save.data.battlePass[arr].includes(tier)) return;

  /* إذا كان عنصراً مخصصاً */
  if(customItemId){
    const allCats = [
      'spark','eyes','companion','footstep','trail','jump','death',
      'aura','crown','cape','headItem','backItem','heldItem','groundMark',
      'nameTag','badge','avatarFrame','banner',
      'spawnEffect','reviveEffect','hitEffect'
    ];
    let found = false;
    for(const cat of allCats){
      const all = getAllCosmetics(cat);
      const item = all.find(x => x.id === customItemId);
      if(item){
        if(Save.grantCosmetic(cat, customItemId)){
          addFloat(P.x, P.y - 40, '🎁 ' + item.name, '#FFD060', 16);
        }
        found = true;
        break;
      }
    }
    if(!found){
      const allSkins = getAllSkins();
      const skin = allSkins.find(x => x.id === customItemId);
      if(skin && !Save.data.ownedSkins.includes(customItemId)){
        Save.data.ownedSkins.push(customItemId);
        addFloat(P.x, P.y - 40, '🎨 ' + skin.ar, '#FFD060', 16);
      }
    }
  } else {
    const coinReward = track === 'free' ? (5 + tier * 2) : ((5 + tier * 2) * 3);
    Save.data.coins += coinReward;
    Save.data.stats.totalCoins += coinReward;
  }

  Save.data.battlePass[arr].push(tier);
  Save.save();

  Sfx.reward(); haptic(20);
  updateCoinsUI();
  buildBattlePassV2();
}

/* ============================================================
   ═══════════════ SEASON RANKS v2 ═══════════════════════════
   ============================================================ */

function buildSeasonV2Page(){
  const pts = Save.data.season.points || 0;
  const rankIdx = getSeasonRankIdx();
  const rank = SEASON_RANKS[rankIdx];
  const nextRank = SEASON_RANKS[rankIdx + 1];

  /* ═══ Hero ═══ */
  const hero = document.getElementById('rank-hero-v2');
  if(hero){
    const progressToNext = nextRank
      ? clamp((pts - rank.points) / (nextRank.points - rank.points), 0, 1)
      : 1;
    const remainingPts = nextRank ? nextRank.points - pts : 0;

    hero.innerHTML = `
      <div class="rhv2-current">
        <div class="rhv2-icon">${rank.icon}</div>
        <div class="rhv2-info">
          <div class="rhv2-rank-name">${rank.name}</div>
          <div class="rhv2-rank-points">
            ${pts.toLocaleString()} نقطة موسم
          </div>
        </div>
      </div>

      ${nextRank ? `
        <div class="rhv2-next">
          <div class="rhv2-next-labels">
            <span>${rank.name}</span>
            <span>${nextRank.name} · ${remainingPts.toLocaleString()} نقطة متبقية</span>
          </div>
          <div class="rhv2-bar">
            <div class="rhv2-bar-fill" style="width:${progressToNext * 100}%"></div>
          </div>
        </div>
      ` : `
        <div class="rhv2-maxed">
          🌟 وصلت لأعلى رتبة!
        </div>
      `}

      <div class="rhv2-stats">
        <div class="rhv2-stat">
          <div class="k">الرتبة</div>
          <div class="v">${rankIdx + 1}/${SEASON_RANKS.length}</div>
        </div>
        <div class="rhv2-stat">
          <div class="k">النقاط</div>
          <div class="v">${pts.toLocaleString()}</div>
        </div>
        <div class="rhv2-stat">
          <div class="k">المستوى القادم</div>
          <div class="v">${nextRank ? nextRank.icon : '—'}</div>
        </div>
      </div>
    `;
  }

  /* ═══ قائمة الرتب ═══ */
  const list = document.getElementById('rank-list-v2');
  if(list){
    list.innerHTML = '';

    SEASON_RANKS.forEach((r, i) => {
      const isCurrent = i === rankIdx;
      const isUnlocked = i <= rankIdx;
      const isNext = i === rankIdx + 1;

      const el = document.createElement('div');
      el.className = 'rank-item-v3' +
        (isCurrent ? ' current' : '') +
        (isUnlocked ? ' unlocked' : '') +
        (isNext ? ' next' : '');

      el.innerHTML = `
        <div class="riv3-icon">${r.icon}</div>
        <div class="riv3-info">
          <div class="riv3-name">${r.name}</div>
          <div class="riv3-req">${r.points.toLocaleString()} نقطة</div>
        </div>
        <div class="riv3-status">
          ${isCurrent
            ? '<span class="riv3-badge current">أنت هنا</span>'
            : isUnlocked
              ? '<span class="riv3-badge done">✓</span>'
              : `<span class="riv3-badge locked">${(r.points - pts).toLocaleString()} 🔒</span>`
          }
        </div>
      `;

      list.appendChild(el);
    });
  }
}

/* ============================================================
   ═══════════════ EVENTS v2 ═════════════════════════════════
   ============================================================ */

function buildEventsV2(){
  const list = document.getElementById('events-v2-list');
  if(!list) return;

  const events = typeof getActiveEvents === 'function' ? getActiveEvents() : [];

  if(events.length === 0){
    list.innerHTML = `
      <div style="text-align:center;padding:60px 20px;color:var(--ink-mute);">
        <div style="font-size:60px;opacity:.3;margin-bottom:12px;">🎪</div>
        <div style="font-size:14px;font-weight:700;">لا توجد أحداث نشطة</div>
        <div style="font-size:11px;margin-top:6px;">تحقق لاحقاً للأحداث الأسبوعية</div>
      </div>
    `;
    return;
  }

  list.innerHTML = '';
  events.forEach(ev => {
    const el = document.createElement('div');
    el.className = 'event-card';
    el.style.setProperty('--ec', ev.color);

    el.innerHTML = `
      <div class="ev-head">
        <div class="ev-icon">${ev.icon}</div>
        <div class="ev-info">
          <div class="ev-name">${ev.name}</div>
          <div class="ev-sub">${ev.en}</div>
        </div>
      </div>
      <div class="ev-missions">
        ${(ev.missions || []).map(m => {
          const prog = Save.data.missions.progressDaily?.[m.key] || 0;
          const pct = Math.min(100, (prog / m.target) * 100);
          return `<div class="ev-mission">
            <span class="evm-ic">${m.icon}</span>
            <div class="evm-body">
              <div class="evm-name">${m.title}</div>
              <div class="evm-prog"><div style="width:${pct}%"></div></div>
            </div>
            <div class="evm-reward">◆${m.reward}</div>
          </div>`;
        }).join('')}
      </div>
    `;

    list.appendChild(el);
  });
}

/* ============================================================
   ═══════════════ SHOP v2 (MERGED) ══════════════════════════
   ============================================================ */

function buildShopV2(){
  const grid = document.getElementById('shop-v2-grid');
  if(!grid) return;

  /* Coins */
  const coinsEl = document.getElementById('shop-v2-coins');
  if(coinsEl){
    const unlimited = hasAdminAccess() && Save.data.admin.unlimitedCoins;
    coinsEl.textContent = unlimited ? '∞' : Save.data.coins.toLocaleString();
  }

  /* Tabs */
  document.querySelectorAll('#shop-v2-tabs .tab-chip').forEach(tab => {
    if(tab._bound) return;
    tab._bound = true;
    tab.addEventListener('click', () => {
      currentShopTab = tab.dataset.shopcat;
      document.querySelectorAll('#shop-v2-tabs .tab-chip').forEach(t =>
        t.classList.toggle('active', t === tab));
      buildShopV2();
      Sfx.tap();
    });
  });
  document.querySelectorAll('#shop-v2-tabs .tab-chip').forEach(t =>
    t.classList.toggle('active', t.dataset.shopcat === currentShopTab));

  grid.innerHTML = '';

  /* الأزياء */
  if(currentShopTab === 'skins'){
    const allSkins = getAllSkins();
    allSkins.forEach(skin => {
      const card = buildShopCard(skin, 'skin');
      grid.appendChild(card);
    });
    return;
  }

  /* التأثيرات */
  const items = getAllCosmetics(currentShopTab) || [];
  items.forEach(item => {
    const card = buildShopCard(item, currentShopTab);
    grid.appendChild(card);
  });

  if(grid.children.length === 0){
    grid.innerHTML = '<div style="grid-column:span 2;text-align:center;padding:40px;color:var(--ink-mute);">لا توجد عناصر</div>';
  }
}

function buildShopCard(item, cat){
  const isSkin = cat === 'skin';
  const ownedList = isSkin ? (Save.data.ownedSkins || []) : (Save.data.cosmetics.owned[cat] || []);
  const currentId = isSkin ? Save.data.currentSkin : Save.data.cosmetics.current[cat];

  const isOwned = ownedList.includes(item.id);
  const isEquipped = currentId === item.id;

  const shopPlacement = (item.placements || []).find(p => p.type === 'shop') ||
    (item.price !== undefined ? { price: item.price } : null);
  const price = shopPlacement ? shopPlacement.price : 0;
  const canBuy = shopPlacement && price > 0;

  const unlimited = hasAdminAccess() && Save.data.admin.unlimitedUnlock;
  const canAfford = unlimited || Save.data.coins >= price;

  const el = document.createElement('button');
  el.className = 'skin-card rar-' + (item.rarity || 'common') +
                 (isEquipped ? ' equipped' : '') +
                 (!isOwned ? ' locked' : '');
  el.style.background = '#fff';

  /* Preview */
  const preview = document.createElement('div');
  preview.style.cssText = 'width:100%;height:80px;display:flex;align-items:center;justify-content:center;border-radius:12px;background:var(--paper-2);margin-bottom:8px;overflow:hidden;';

  if(typeof hasItemImage === 'function' && hasItemImage(item)){
    const img = document.createElement('img');
    img.src = ASSET.resolve(item);
    img.style.cssText = 'max-width:90%;max-height:90%;object-fit:contain;';
    preview.appendChild(img);
  } else if(isSkin){
    const c = document.createElement('canvas');
    const ps = 66, dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = ps * dpr; c.height = ps * dpr;
    c.style.width = ps + 'px'; c.style.height = ps + 'px';
    const pc = c.getContext('2d');
    pc.setTransform(dpr, 0, 0, dpr, 0, 0);
    pc.save();
    pc.translate(ps/2, ps/2);
    try { renderCharacter(pc, ps * 0.28, item, { mode: 'FLIP', skipExtras: true }); } catch(e){}
    pc.restore();
    preview.appendChild(c);
  } else {
    const c = document.createElement('canvas');
    const pw = 140, ph = 60, dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = pw * dpr; c.height = ph * dpr;
    c.style.width = pw + 'px'; c.style.height = ph + 'px';
    const pc = c.getContext('2d');
    pc.setTransform(dpr, 0, 0, dpr, 0, 0);
    try { renderCosPreview(pc, pw, ph, cat, item); } catch(e){}
    preview.appendChild(c);
  }
  el.appendChild(preview);

  /* Name */
  const nameEl = document.createElement('div');
  nameEl.className = 'skin-name';
  nameEl.textContent = isSkin ? (item.ar || item.name) : item.name;
  el.appendChild(nameEl);

  const enEl = document.createElement('div');
  enEl.className = 'skin-name-ar';
  enEl.textContent = (item.en || item.desc || '').toUpperCase();
  el.appendChild(enEl);

  /* Rarity */
  const rarEl = document.createElement('div');
  rarEl.className = 'skin-rarity';
  rarEl.textContent = RARITY_LABELS[item.rarity || 'common'];
  el.appendChild(rarEl);

  /* Tag */
  const tag = document.createElement('div');
  tag.className = 'skin-tag';
  if(isEquipped){
    tag.classList.add('equipped');
    tag.textContent = '✓ مُجهّز';
  } else if(isOwned){
    tag.classList.add('owned');
    tag.textContent = 'مملوك';
  } else if(canBuy){
    tag.classList.add('buy');
    tag.textContent = '◆ ' + price;
    if(!canAfford) tag.style.opacity = '0.5';
  } else {
    tag.style.color = 'var(--ink-mute)';
    tag.textContent = 'من مصدر آخر';
  }
  el.appendChild(tag);

  /* Click */
  el.addEventListener('click', () => {
    if(isEquipped) return;

    if(isOwned){
      if(isSkin) Save.data.currentSkin = item.id;
      else Save.data.cosmetics.current[cat] = item.id;
      Save.save();
      Sfx.tap(); haptic(8);
      buildShopV2();
      return;
    }

    if(canBuy && (unlimited || Save.data.coins >= price)){
      if(!unlimited) Save.data.coins -= price;
      if(!ownedList.includes(item.id)) ownedList.push(item.id);
      if(isSkin) Save.data.currentSkin = item.id;
      else Save.data.cosmetics.current[cat] = item.id;
      Save.save();
      Sfx.reward(); haptic(15);
      updateCoinsUI();
      buildShopV2();
    } else {
      Sfx.play(220, 0.15, 'sine', 0.05, 180);
      haptic(20);
    }
  });

  return el;
}

/* ============================================================
   ═══════════════ MISSIONS v2 ═══════════════════════════════
   ============================================================ */

function buildMissionsV2Page(){
  document.querySelectorAll('#missions-v2-tabs .tab-chip').forEach(tab => {
    if(tab._bound) return;
    tab._bound = true;
    tab.addEventListener('click', () => {
      currentMissionTab = tab.dataset.missionstab;
      document.querySelectorAll('#missions-v2-tabs .tab-chip').forEach(t =>
        t.classList.toggle('active', t === tab));
      renderMissionsV2Content();
      Sfx.tap();
    });
  });
  renderMissionsV2Content();
}

function renderMissionsV2Content(){
  const container = document.getElementById('missions-v2-content');
  if(!container) return;
  container.innerHTML = '';

  if(currentMissionTab === 'login'){
    renderDailyLoginV2(container);
    return;
  }

  const active = Save.data.missions[currentMissionTab] || [];
  if(active.length === 0){
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--ink-mute);">لا توجد مهام</div>';
    return;
  }

  active.forEach(id => {
    const data = getMissionData(currentMissionTab, id);
    if(!data) return;
    const { tmpl, prog, done } = data;
    const claimKey = `claimed_${currentMissionTab}_${id}`;
    const isClaimed = Save.data.missions[claimKey] === true;
    const pct = Math.min(100, (prog / tmpl.target) * 100);

    const el = document.createElement('div');
    el.className = 'mission-v2-card' + (done ? ' done' : '') + (isClaimed ? ' claimed' : '');

    el.innerHTML = `
      <div class="mv2-icon">${tmpl.icon}</div>
      <div class="mv2-body">
        <div class="mv2-title">${tmpl.title}</div>
        <div class="mv2-desc">${isClaimed ? 'تم الاستلام' : (done ? 'جاهزة للاستلام!' : 'قيد التقدم')}</div>
        <div class="mv2-progress">
          <div class="mv2-progress-fill" style="width:${pct}%"></div>
        </div>
      </div>
      <div class="mv2-side">
        <div class="mv2-reward">◆ ${tmpl.reward}</div>
        ${isClaimed
          ? '<span class="mv2-claim claimed">✓ مُستلمة</span>'
          : done
            ? '<button class="mv2-claim">استلام</button>'
            : `<span class="mv2-count">${Math.min(prog, tmpl.target)}/${tmpl.target}</span>`
        }
      </div>
    `;

    const btn = el.querySelector('.mv2-claim:not(.claimed)');
    if(btn && done && !isClaimed){
      btn.addEventListener('click', () => {
        if(Save.data.missions[claimKey]) return;
        Save.data.missions[claimKey] = true;
        Save.data.coins += tmpl.reward;
        Save.data.stats.totalCoins += tmpl.reward;
        Save.save();
        updateCoinsUI();
        Sfx.reward(); haptic(20);
        renderMissionsV2Content();
        updateHomeBadges();
      });
    }

    container.appendChild(el);
  });
}

/* ═══ الدخول اليومي (نسخة مُصلحة) ═══ */
function renderDailyLoginV2(container){
  if(typeof checkDailyReset === 'function') checkDailyReset();

  const dl = Save.data.dailyLogin;
  const curDay = dl.streak % 7;
  const canClaim = typeof canClaimDaily === 'function' ? canClaimDaily() : false;

  /* Hero */
  const hero = document.createElement('div');
  hero.className = 'season-card';
  hero.style.background = 'linear-gradient(135deg,#3A2010 0%,#6A3820 100%)';
  hero.innerHTML = `
    <div class="sc-eyebrow">CURRENT STREAK</div>
    <div class="sc-title">🔥 ${dl.streak} يوم متتالي</div>
    <div class="sc-sub">سجّل يومياً للحصول على مكافآت أكبر</div>
  `;
  container.appendChild(hero);

  /* Grid */
  const head = document.createElement('div');
  head.className = 'admin-section-head';
  head.innerHTML = `
    <div class="admin-section-title">مكافآت 7 أيام</div>
    <div class="admin-section-sub">REWARDS</div>
  `;
  container.appendChild(head);

  const grid = document.createElement('div');
  grid.className = 'daily-grid-v2';

  for(let i = 0; i < 7; i++){
    const rw = LOGIN_REWARDS[i];
    const claimed = i < curDay || (i === curDay && !canClaim);
    const isToday = i === curDay && canClaim;

    const el = document.createElement('div');
    el.className = 'daily-day-v2' + (claimed ? ' claimed' : '') + (isToday ? ' today' : '');
    el.innerHTML = `
      <span class="dd-num">${i + 1}</span>
      <span class="dd-ic">${claimed ? '✓' : rw.icon}</span>
      <span class="dd-val">${rw.label}</span>
    `;
    grid.appendChild(el);
  }
  container.appendChild(grid);

  /* Button */
  const btn = document.createElement('button');
  btn.className = 'action-btn gold';
  btn.style.width = '100%';
  btn.style.maxWidth = '100%';

  if(!canClaim){
    btn.textContent = '✓ تم الاستلام اليوم';
    btn.disabled = true;
    btn.style.opacity = '0.55';
  } else {
    btn.textContent = '🎁 استلام مكافأة اليوم';
    btn.addEventListener('click', () => {
      const dayIdx = dl.streak % 7;
      const rw = LOGIN_REWARDS[dayIdx];
      Save.data.coins += rw.value;
      Save.data.stats.totalCoins += rw.value;
      dl.streak += 1;
      dl.lastClaim = today();
      Save.save();
      updateCoinsUI();
      Sfx.reward(); haptic(20);
      renderMissionsV2Content();
      updateHomeBadges();
      if(typeof showRewardModal === 'function'){
        showRewardModal('🎁', 'DAILY LOGIN · DAY ' + (dayIdx + 1),
          '◆ ' + rw.value, 'سلسلة ' + dl.streak + ' أيام', null);
      }
    });
  }
  container.appendChild(btn);
}

/* ============================================================
   ═══════════════ CHESTS ════════════════════════════════════
   ============================================================ */

const CHEST_DEFS = {
  bronze: { name: 'برونزي', icon: '📦', price: 100, color: '#A07048',
    rewards: { coins: [50, 200], cosmetics: 0.1, powerup: 0.05 } },
  silver: { name: 'فضي', icon: '🎁', price: 500, color: '#B0B8C0',
    rewards: { coins: [300, 800], cosmetics: 0.25, powerup: 0.15 } },
  gold:   { name: 'ذهبي', icon: '💎', price: 2000, color: '#E8B34E',
    rewards: { coins: [1000, 4000], cosmetics: 0.55, powerup: 0.35 } }
};

function buildChestPage(){
  const cards = document.querySelectorAll('.chest-card');
  cards.forEach(card => {
    if(card._bound) return;
    card._bound = true;
    card.addEventListener('click', () => {
      openChest(card.dataset.chest);
    });
  });
}

function openChest(type){
  const def = CHEST_DEFS[type];
  if(!def) return;

  const unlimited = hasAdminAccess() && Save.data.admin.unlimitedCoins;
  if(!unlimited && Save.data.coins < def.price){
    Sfx.play(220, 0.15, 'sine', 0.05, 180);
    haptic(20);
    alert('رصيدك غير كافٍ');
    return;
  }

  if(!unlimited) Save.data.coins -= def.price;

  /* حساب المكافآت */
  const rewards = [];
  const coinRange = def.rewards.coins;
  const coinsWon = Math.floor(rand(coinRange[0], coinRange[1]));
  Save.data.coins += coinsWon;
  rewards.push({ icon: '◆', name: 'عملات', value: '+' + coinsWon });

  /* عنصر عرضي */
  if(Math.random() < def.rewards.cosmetics){
    const cats = ['spark','trail','jump','death','aura','crown','cape'];
    const cat = cats[Math.floor(Math.random() * cats.length)];
    const items = getAllCosmetics(cat).filter(i => i.id !== 'none');
    if(items.length){
      const item = items[Math.floor(Math.random() * items.length)];
      if(Save.grantCosmetic(cat, item.id)){
        rewards.push({ icon: '✨', name: item.name, value: 'جديد!' });
      }
    }
  }

  /* تعزيز */
  if(Math.random() < def.rewards.powerup){
    rewards.push({ icon: '⚡', name: 'تعزيز نادر', value: '× 1' });
  }

  Save.save();
  updateCoinsUI();
  Sfx.reward(); haptic(25);
  showChestOpenModal(def, rewards);
}

function showChestOpenModal(def, rewards){
  let modal = document.getElementById('chest-open-modal');
  if(!modal){
    modal = document.createElement('div');
    modal.id = 'chest-open-modal';
    modal.className = 'chest-open-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="com-box">
      <div class="com-icon" style="color:${def.color};">${def.icon}</div>
      <div class="com-title">فتحت صندوق ${def.name}!</div>
      <div class="com-rewards">
        ${rewards.map(r => `
          <div class="com-reward">
            <span class="ic">${r.icon}</span>
            <span class="nm">${r.name}</span>
            <span class="vl">${r.value}</span>
          </div>
        `).join('')}
      </div>
      <button class="action-btn gold" style="width:100%;" id="com-close">استلام</button>
    </div>
  `;

  modal.classList.add('active');

  const close = modal.querySelector('#com-close');
  if(close){
    close.addEventListener('click', () => {
      modal.classList.remove('active');
      Sfx.tap();
    });
  }
}

/* ============================================================
   ═══════════════ LUCKY WHEEL ═══════════════════════════════
   ============================================================ */

const WHEEL_SEGMENTS = [
  { icon: '◆', value: 50, color: '#E8B34E' },
  { icon: '◆', value: 100, color: '#E07A3F' },
  { icon: '✨', value: 0, color: '#9A6AC8', type: 'cosmetic' },
  { icon: '◆', value: 200, color: '#C98A2E' },
  { icon: '⚡', value: 0, color: '#4A88C8', type: 'powerup' },
  { icon: '◆', value: 75, color: '#E8B34E' },
  { icon: '🎁', value: 500, color: '#E85838' },
  { icon: '◆', value: 150, color: '#6B9B6B' }
];

let _wheelRotation = 0;
let _wheelSpinning = false;

function initWheel(){
  drawWheel();
  const balanceEl = document.getElementById('wheel-balance');
  if(balanceEl) balanceEl.textContent = Save.data.coins.toLocaleString();

  const spinBtn = document.getElementById('wheel-spin-btn');
  if(spinBtn && !spinBtn._bound){
    spinBtn._bound = true;
    spinBtn.addEventListener('click', spinWheel);
  }
}

function drawWheel(){
  const canvas = document.getElementById('wheel-canvas');
  if(!canvas) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const size = 320;
  canvas.width = size * dpr;
  canvas.height = size * dpr;

  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;

  ctx.clearRect(0, 0, size, size);

  const segCount = WHEEL_SEGMENTS.length;
  const segAngle = (Math.PI * 2) / segCount;

  WHEEL_SEGMENTS.forEach((seg, i) => {
    const startAngle = i * segAngle + _wheelRotation;
    const endAngle = startAngle + segAngle;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.closePath();

    ctx.fillStyle = seg.color;
    ctx.fill();

    /* حدود */
    ctx.strokeStyle = 'rgba(255,255,255,.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    /* الأيقونة */
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(startAngle + segAngle / 2);
    ctx.translate(r * 0.65, 0);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,.3)';
    ctx.shadowBlur = 4;
    ctx.fillText(seg.icon, 0, 0);
    ctx.restore();
  });
}

function spinWheel(){
  if(_wheelSpinning) return;

  const cost = 50;
  const unlimited = hasAdminAccess() && Save.data.admin.unlimitedCoins;

  if(!unlimited && Save.data.coins < cost){
    Sfx.play(220, 0.15, 'sine', 0.05, 180);
    haptic(20);
    alert('رصيدك غير كافٍ');
    return;
  }

  if(!unlimited) Save.data.coins -= cost;
  updateCoinsUI();

  const balanceEl = document.getElementById('wheel-balance');
  if(balanceEl) balanceEl.textContent = Save.data.coins.toLocaleString();

  _wheelSpinning = true;
  Sfx.play(440, 0.3, 'sine', 0.06, 880);

  const targetRotation = _wheelRotation + Math.PI * 2 * (5 + Math.random() * 3) +
    Math.random() * Math.PI * 2;
  const duration = 3500;
  const startTime = performance.now();
  const startRotation = _wheelRotation;

  const animate = (now) => {
    const t = Math.min(1, (now - startTime) / duration);
    const easeOut = 1 - Math.pow(1 - t, 4);
    _wheelRotation = startRotation + (targetRotation - startRotation) * easeOut;
    drawWheel();

    if(t < 1){
      requestAnimationFrame(animate);
    } else {
      _wheelSpinning = false;
      onWheelStop();
    }
  };
  requestAnimationFrame(animate);
}

function onWheelStop(){
  /* تحديد القطاع */
  const segCount = WHEEL_SEGMENTS.length;
  const segAngle = (Math.PI * 2) / segCount;

  /* المؤشر في الأعلى (-PI/2) */
  const normalized = ((-Math.PI / 2 - _wheelRotation) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
  const segIdx = Math.floor(normalized / segAngle) % segCount;
  const seg = WHEEL_SEGMENTS[segIdx];

  /* منح المكافأة */
  const rewards = [];

  if(seg.value > 0){
    Save.data.coins += seg.value;
    Save.data.stats.totalCoins += seg.value;
    rewards.push({ icon: '◆', name: 'عملات', value: '+' + seg.value });
  } else if(seg.type === 'cosmetic'){
    const cats = ['spark', 'trail', 'jump', 'aura', 'crown', 'cape'];
    const cat = cats[Math.floor(Math.random() * cats.length)];
    const items = getAllCosmetics(cat).filter(i => i.id !== 'none');
    if(items.length){
      const item = items[Math.floor(Math.random() * items.length)];
      if(Save.grantCosmetic(cat, item.id)){
        rewards.push({ icon: '✨', name: item.name, value: 'جديد!' });
      }
    }
  } else if(seg.type === 'powerup'){
    rewards.push({ icon: '⚡', name: 'تعزيز عشوائي', value: '× 1' });
  }

  Save.save();
  updateCoinsUI();
  const balanceEl = document.getElementById('wheel-balance');
  if(balanceEl) balanceEl.textContent = Save.data.coins.toLocaleString();

  Sfx.reward(); haptic(30);
  showChestOpenModal({ icon: '🎡', name: 'عجلة الحظ', color: '#FF00D8' }, rewards);
}

/* ============================================================
   ═══════════════ FRIENDS ═══════════════════════════════════
   ============================================================ */

function buildFriendsPage(){
  /* كود اللاعب */
  const codeEl = document.getElementById('friend-my-code');
  if(codeEl){
    const uid = (Cloud.user && Cloud.user.uid) || 'LOCAL';
    const short = uid.slice(0, 6).toUpperCase();
    codeEl.textContent = short;
  }

  const copyBtn = document.getElementById('friend-copy-code');
  if(copyBtn && !copyBtn._bound){
    copyBtn._bound = true;
    copyBtn.addEventListener('click', () => {
      const code = codeEl.textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = '✓';
        setTimeout(() => copyBtn.textContent = '📋', 1500);
        Sfx.tap();
      });
    });
  }

  /* قائمة الأصدقاء (placeholder) */
  const list = document.getElementById('friends-list');
  if(!list) return;

  list.innerHTML = `
    <div style="text-align:center;padding:60px 20px;color:var(--ink-mute);">
      <div style="font-size:60px;opacity:.3;margin-bottom:12px;">👥</div>
      <div style="font-size:14px;font-weight:700;">لا يوجد أصدقاء بعد</div>
      <div style="font-size:11px;margin-top:6px;">شارك كودك لدعوة أصدقائك</div>
    </div>
  `;
}

/* ============================================================
   ═══════════════ LEADERBOARD ═══════════════════════════════
   ============================================================ */

function buildLeaderboardPage(){
  document.querySelectorAll('#lb-tabs .tab-chip').forEach(tab => {
    if(tab._bound) return;
    tab._bound = true;
    tab.addEventListener('click', () => {
      currentLbTab = tab.dataset.lbtab;
      document.querySelectorAll('#lb-tabs .tab-chip').forEach(t =>
        t.classList.toggle('active', t === tab));
      renderLeaderboard();
      Sfx.tap();
    });
  });
  renderLeaderboard();
}

async function renderLeaderboard(){
  const list = document.getElementById('lb-list');
  if(!list) return;

  list.innerHTML = '<div style="text-align:center;padding:30px;color:var(--ink-mute);">⏳ جارٍ التحميل...</div>';

  let players = [];

  if(typeof Cloud !== 'undefined' && Cloud.db){
    try {
      const snap = await Cloud.db.collection('players').limit(50).get();
      snap.forEach(doc => {
        const data = doc.data();
        data.uid = doc.id;
        players.push(data);
      });
    } catch(e){
      console.warn('[Leaderboard] Fetch failed:', e);
    }
  }

  /* إضافة اللاعب الحالي */
  const me = {
    uid: (Cloud.user && Cloud.user.uid) || 'me',
    username: (Cloud.profile && Cloud.profile.username) || 'أنت',
    saveData: Save.data,
    isMe: true
  };

  /* ترتيب حسب التبويب */
  const getValue = (p) => {
    const sd = p.saveData || {};
    switch(currentLbTab){
      case 'coins': return sd.coins || 0;
      case 'distance':
        const bm = sd.bestMeters || {};
        return (bm.FLIP||0) + (bm.FLAP||0) + (bm.DRIFT||0) + (bm.WALK||0);
      case 'level':
        return getLevelIdxFromMeters(sd.stats?.totalMeters || 0);
      case 'season':
        return (sd.season && sd.season.points) || 0;
      default: return 0;
    }
  };

  players = players.filter(p => p.uid !== me.uid);
  players.push(me);
  players.sort((a, b) => getValue(b) - getValue(a));
  players = players.slice(0, 50);

  if(players.length === 0){
    list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--ink-mute);">لا يوجد لاعبون</div>';
    return;
  }

  list.innerHTML = '';
  players.forEach((p, idx) => {
    const el = document.createElement('div');
    el.className = 'lb-row' + (p.isMe ? ' me' : '');

    const name = p.username || p.displayName || 'لاعب';
    const val = getValue(p);
    const formatted = currentLbTab === 'distance' || currentLbTab === 'level'
      ? val.toLocaleString()
      : '◆ ' + val.toLocaleString();

    el.innerHTML = `
      <div class="lb-rank">${idx + 1}</div>
      <div class="lb-avatar">${name.charAt(0).toUpperCase()}</div>
      <div class="lb-info">
        <div class="lb-name">${name}${p.isMe ? ' (أنت)' : ''}</div>
        <div class="lb-sub">${p.isMe ? 'لاعب محلي' : ''}</div>
      </div>
      <div class="lb-value">${formatted}</div>
    `;
    list.appendChild(el);
  });
}

function getLevelIdxFromMeters(meters){
  let idx = 0;
  for(let i = 0; i < GLOBAL_LEVEL_THRESHOLDS.length; i++){
    if(meters >= GLOBAL_LEVEL_THRESHOLDS[i]) idx = i;
  }
  return idx + 1;
}

/* ============================================================
   ═══════════════ ACHIEVEMENTS v2 ═══════════════════════════
   ============================================================ */

function buildAchievementsV2Page(){
  const unlocked = ACHIEVEMENTS.filter(a => Save.data.achievements[a.id]).length;
  const total = ACHIEVEMENTS.length;

  const unlockedEl = document.getElementById('ach-v2-unlocked');
  const totalEl = document.getElementById('ach-v2-total');
  if(unlockedEl) unlockedEl.textContent = unlocked;
  if(totalEl) totalEl.textContent = total;

  document.querySelectorAll('#ach-v2-tabs .tab-chip').forEach(tab => {
    if(tab._bound) return;
    tab._bound = true;
    tab.addEventListener('click', () => {
      currentAchCat = tab.dataset.achcat;
      document.querySelectorAll('#ach-v2-tabs .tab-chip').forEach(t =>
        t.classList.toggle('active', t === tab));
      renderAchievementsV2();
      Sfx.tap();
    });
  });
  renderAchievementsV2();
}

function renderAchievementsV2(){
  const grid = document.getElementById('ach-v2-grid');
  if(!grid) return;
  grid.innerHTML = '';

  const cats = {
    progression: '📈',
    skill: '🎯',
    mode: '🎮',
    shift: '◆',
    collection: '💎',
    secret: '❓'
  };

  let filtered = ACHIEVEMENTS;
  if(currentAchCat !== 'all'){
    filtered = ACHIEVEMENTS.filter(a => a.cat === currentAchCat);
  }

  /* إضافة فئة للعناصر التي ليس لها cat */
  filtered = filtered.map(a => ({ ...a, cat: a.cat || 'progression' }));

  if(filtered.length === 0){
    grid.innerHTML = '<div style="grid-column:span 2;text-align:center;padding:40px;color:var(--ink-mute);">لا إنجازات في هذه الفئة</div>';
    return;
  }

  filtered.forEach(a => {
    const isUnlocked = !!Save.data.achievements[a.id];
    let val = 0;
    try { val = Math.min(a.value(Save.data), a.target); } catch(e){}
    const pct = a.target > 0 ? (val / a.target) * 100 : 0;

    const el = document.createElement('div');
    el.className = 'ach-v2-card' + (isUnlocked ? ' unlocked' : '');

    el.innerHTML = `
      <div class="ach-v2-icon">${isUnlocked ? a.icon : '❔'}</div>
      <div class="ach-v2-name">${isUnlocked ? a.name : '???'}</div>
      <div class="ach-v2-desc">${a.desc}</div>
      ${!isUnlocked ? `
        <div class="ach-v2-progress">
          <div class="ach-v2-progress-fill" style="width:${pct}%"></div>
        </div>
      ` : ''}
    `;

    grid.appendChild(el);
  });
}

/* ============================================================
   ═══════════════ PROFILE v2 ════════════════════════════════
   ============================================================ */

function buildProfileV2(){
  const hero = document.getElementById('profile-hero-v2');
  if(!hero) return;

  const user = Cloud.user;
  const profile = Cloud.profile;
  const name = (profile && profile.username) || (user && user.displayName) || 'لاعب';
  const photo = (user && user.photoURL) || null;
  const uid = (user && user.uid) || 'LOCAL';

  const title = getPlayerTitle(Save.data);

  hero.innerHTML = `
    <div class="phv2-avatar-wrap">
      <div class="phv2-avatar">
        ${photo
          ? `<img src="${photo}" alt="">`
          : `<span>${name.charAt(0).toUpperCase()}</span>`
        }
      </div>
    </div>
    <div class="phv2-name">${name}</div>
    <div class="phv2-title" style="color:${title.color};">${title.icon} ${title.name}</div>
    <div class="phv2-uid">#${uid.slice(0, 12).toUpperCase()}</div>
  `;

  document.querySelectorAll('#profile-tabs .tab-chip').forEach(tab => {
    if(tab._bound) return;
    tab._bound = true;
    tab.addEventListener('click', () => {
      currentProfileTab = tab.dataset.proftab;
      document.querySelectorAll('#profile-tabs .tab-chip').forEach(t =>
        t.classList.toggle('active', t === tab));
      renderProfileContent();
      Sfx.tap();
    });
  });
  renderProfileContent();
}

function renderProfileContent(){
  const container = document.getElementById('profile-content');
  if(!container) return;
  container.innerHTML = '';

  const s = Save.data.stats;

  if(currentProfileTab === 'info'){
    container.innerHTML = `
      <div class="lvl-reward-card">
        <div class="lrc-lvl">🎯</div>
        <div class="lrc-info">
          <div class="lrc-title">المستوى العام</div>
        </div>
        <div class="lrc-reward">${getGlobalLevel() + 1}</div>
      </div>
      <div class="lvl-reward-card">
        <div class="lrc-lvl">📏</div>
        <div class="lrc-info">
          <div class="lrc-title">مجموع الأمتار</div>
        </div>
        <div class="lrc-reward">${Math.floor(getGlobalMeters()).toLocaleString()}</div>
      </div>
      <div class="lvl-reward-card">
        <div class="lrc-lvl">◆</div>
        <div class="lrc-info">
          <div class="lrc-title">العملات الحالية</div>
        </div>
        <div class="lrc-reward">${Save.data.coins.toLocaleString()}</div>
      </div>
      <div class="lvl-reward-card">
        <div class="lrc-lvl">🏅</div>
        <div class="lrc-info">
          <div class="lrc-title">نقاط الموسم</div>
        </div>
        <div class="lrc-reward">${(Save.data.season.points || 0).toLocaleString()}</div>
      </div>
    `;
  } else if(currentProfileTab === 'stats'){
    container.innerHTML = `
      <div class="stats-grid">
        <div class="stat-box"><div class="sb-icon">🎮</div><div class="sb-val">${s.totalPlays || 0}</div><div class="sb-label">جولات</div></div>
        <div class="stat-box"><div class="sb-icon">📏</div><div class="sb-val">${Math.floor(getGlobalMeters())}</div><div class="sb-label">أمتار</div></div>
        <div class="stat-box"><div class="sb-icon">🔥</div><div class="sb-val">x${s.bestCombo || 0}</div><div class="sb-label">سلسلة</div></div>
        <div class="stat-box"><div class="sb-icon">◆</div><div class="sb-val">${s.shiftRuns || 0}</div><div class="sb-label">SHIFT</div></div>
      </div>
    `;
  } else if(currentProfileTab === 'badges'){
    const unlocked = BADGES.filter(b => Save.data.achievements[b.id]);
    if(unlocked.length === 0){
      container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--ink-mute);">لا شارات بعد</div>';
    } else {
      container.innerHTML = '<div class="badges-grid">' + unlocked.map(b => `
        <div class="badge-chip" style="--bc:#E8B34E;">
          <span class="bc-ic">${b.icon}</span>
          <span class="bc-nm">${b.name}</span>
        </div>
      `).join('') + '</div>';
    }
  } else if(currentProfileTab === 'history'){
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--ink-mute);">
        <div style="font-size:40px;opacity:.3;margin-bottom:10px;">📜</div>
        <div style="font-size:12px;">سجل الجولات قريباً</div>
      </div>
    `;
  }
}

/* ============================================================
   ═══════════════ WIRE NEW SCREEN BUTTONS ═══════════════════
   ============================================================ */

function wireV2Buttons(){
  /* ═══ أزرار hscroll-actions ═══ */
  document.querySelectorAll('.hs-action[data-page]').forEach(btn => {
    if(btn._bound) return;
    btn._bound = true;
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      Sfx.tap(); haptic(6);

      switch(page){
        case 'shop':
          buildShopV2();
          showScreen('s-shop-v2');
          break;
        case 'season':
          buildSeasonV2Page();
          showScreen('s-season-v2');
          break;
        case 'battlepass':
          buildBattlePassV2();
          showScreen('s-battlepass-v2');
          break;
        case 'powerups':
          buildPowerups();
          showScreen('s-powerups');
          break;
        case 'missions':
          buildMissionsV2Page();
          showScreen('s-missions-v2');
          break;
        case 'friends':
          buildFriendsPage();
          showScreen('s-friends');
          break;
        case 'clan':
          showScreen('s-clan');
          break;
        case 'referral':
          showScreen('s-referral');
          break;
        case 'leaderboard':
          buildLeaderboardPage();
          showScreen('s-leaderboard');
          break;
        case 'chest':
          buildChestPage();
          showScreen('s-chest');
          break;
        case 'wheel':
          initWheel();
          showScreen('s-wheel');
          break;
        case 'events':
          buildEventsV2();
          showScreen('s-events-v2');
          break;
      }
    });
  });

  /* ═══ زر الدعوة ═══ */
  const inviteBtn = document.getElementById('invite-btn');
  if(inviteBtn && !inviteBtn._bound){
    inviteBtn._bound = true;
    inviteBtn.addEventListener('click', () => {
      Sfx.tap(); haptic(6);
      const code = ((Cloud.user && Cloud.user.uid) || 'LOCAL').slice(0, 6).toUpperCase();
      if(navigator.share){
        navigator.share({
          title: 'العب SHIFT معي!',
          text: 'كود غرفتي: ' + code,
          url: location.href
        }).catch(()=>{});
      } else {
        navigator.clipboard.writeText('كود SHIFT: ' + code).then(() => {
          alert('✓ تم نسخ كود الدعوة: ' + code);
        });
      }
    });
  }

  /* ═══ القائمة المنسدلة (Home Menu) ═══ */
  document.querySelectorAll('#home-menu .hm-item[data-menu]').forEach(item => {
    if(item._bound) return;
    item._bound = true;
    item.addEventListener('click', () => {
      const action = item.dataset.menu;
      document.getElementById('home-menu').classList.remove('open');
      Sfx.tap(); haptic(6);

      switch(action){
        case 'profile':
          buildProfileV2();
          showScreen('s-profile-v2');
          break;
        case 'level':
          buildLevelPage();
          showScreen('s-level');
          break;
        case 'stats':
          buildStatsV2();
          showScreen('s-stats-v2');
          break;
        case 'achievements':
          buildAchievementsV2Page();
          showScreen('s-achieve-v2');
          break;
        case 'daily':
          currentMissionTab = 'login';
          buildMissionsV2Page();
          showScreen('s-missions-v2');
          break;
        case 'settings':
          buildSettingsV2();
          showScreen('s-settings-v2');
          break;
        case 'admin':
          showScreen('s-admin');
          if(typeof buildAdminPanel === 'function') buildAdminPanel();
          if(typeof Admin !== 'undefined' && Admin){
            if(!Admin.initialized) Admin.init();
            Admin.refreshAll();
          }
          break;
      }
    });
  });
}

/* ============================================================
   ═══════════════ PATCH: boot & buildHome ═══════════════════
   ============================================================ */

(function patchBootV2(){
  /* ═══ Patch buildHome ═══ */
  const origBuildHome = window.buildHome;
  window.buildHome = function(){
    try {
      if(typeof origBuildHome === 'function') origBuildHome.apply(this, arguments);
    } catch(e){ console.warn('[buildHome] original failed:', e); }

    try {
      buildHomeV2();
      wireV2Buttons();
    } catch(e){ console.warn('[buildHomeV2] failed:', e); }
  };

  /* ═══ Patch boot — نداء wireV2Buttons بعد wireGameButtons ═══ */
  const origBoot = window.boot;
  if(typeof origBoot === 'function'){
    window.boot = function(){
      origBoot.apply(this, arguments);
      try {
        wireV2Buttons();
        updateHomeBadges();
      } catch(e){ console.warn('[wireV2Buttons] failed:', e); }
    };
  }
})();

/* ═══ تصدير للاستخدام الخارجي ═══ */
window.buildHomeV2 = buildHomeV2;
window.updatePlayerCard = updatePlayerCard;
window.drawPlayerPreview = drawPlayerPreview;
window.buildLevelPage = buildLevelPage;
window.buildStatsV2 = buildStatsV2;
window.buildSettingsV2 = buildSettingsV2;
window.buildBattlePassV2 = buildBattlePassV2;
window.buildSeasonV2Page = buildSeasonV2Page;
window.buildEventsV2 = buildEventsV2;
window.buildShopV2 = buildShopV2;
window.buildMissionsV2Page = buildMissionsV2Page;
window.buildChestPage = buildChestPage;
window.initWheel = initWheel;
window.buildFriendsPage = buildFriendsPage;
window.buildLeaderboardPage = buildLeaderboardPage;
window.buildAchievementsV2Page = buildAchievementsV2Page;
window.buildProfileV2 = buildProfileV2;

console.log('[SHIFT v2] ✅ Home & Pages engine loaded');

/* ============================================================
   ═══════════════════════════════════════════════════════════
   ═══════════ SHIFT v2.5 — FRIENDS · LEADERBOARD · TOASTS ══
   ═══════════════════════════════════════════════════════════
   يضيف:
   - نظام Toast موحّد
   - نظام الأصدقاء الكامل (Firebase)
   - لوحة الصدارة الحقيقية
   - شراء Premium Battle Pass
   - التحديات اليومية والأسبوعية
   - انتقالات ناعمة
   ============================================================ */

/* ============================================================
   ═══════════════ TOAST NOTIFICATION SYSTEM ═════════════════
   ============================================================ */

const Toast = {
  _container: null,
  _queue: [],
  _active: new Set(),

  init(){
    if(this._container) return;
    this._container = document.createElement('div');
    this._container.id = 'toast-container';
    document.body.appendChild(this._container);
  },

  show(opts){
    if(!opts) return;
    this.init();

    const {
      icon = 'ℹ️',
      title = '',
      desc = '',
      type = 'info',      /* success | error | warning | info | reward */
      action = null,      /* { label, callback } */
      duration = 3200,
      position = 'top'    /* top | bottom */
    } = opts;

    /* حد أقصى 3 toasts في نفس الوقت */
    if(this._active.size >= 3){
      const first = this._active.values().next().value;
      if(first) this.remove(first);
    }

    const el = document.createElement('div');
    el.className = 'shift-toast ' + type + (position === 'bottom' ? ' bottom' : '');

    const colorMap = {
      success: '#6B9B6B',
      error:   '#C14A4A',
      warning: '#E8B34E',
      info:    '#4A88C8',
      reward:  '#E8B34E'
    };
    el.style.setProperty('--tc', colorMap[type] || colorMap.info);

    el.innerHTML = `
      <div class="st-icon">${icon}</div>
      <div class="st-body">
        ${title ? `<div class="st-title">${this._escape(title)}</div>` : ''}
        ${desc ? `<div class="st-desc">${this._escape(desc)}</div>` : ''}
      </div>
      ${action ? `<button class="st-action">${this._escape(action.label)}</button>` : ''}
    `;

    /* زر الإجراء */
    if(action){
      const btn = el.querySelector('.st-action');
      if(btn){
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          try { action.callback && action.callback(); } catch(err){}
          this.remove(el);
        });
      }
    }

    /* إضافة */
    this._container.appendChild(el);
    this._active.add(el);

    /* إزالة تلقائية */
    if(duration > 0){
      setTimeout(() => this.remove(el), duration);
    }

    return el;
  },

  remove(el){
    if(!el || !this._active.has(el)) return;
    this._active.delete(el);
    el.classList.add('out');
    setTimeout(() => {
      if(el.parentNode) el.parentNode.removeChild(el);
    }, 300);
  },

  /* ═══ اختصارات ═══ */
  success(title, desc, opts = {}){
    return this.show({ icon: '✓', title, desc, type: 'success', ...opts });
  },
  error(title, desc, opts = {}){
    return this.show({ icon: '✕', title, desc, type: 'error', ...opts });
  },
  warning(title, desc, opts = {}){
    return this.show({ icon: '⚠️', title, desc, type: 'warning', ...opts });
  },
  info(title, desc, opts = {}){
    return this.show({ icon: 'ℹ️', title, desc, type: 'info', ...opts });
  },
  reward(icon, title, desc, opts = {}){
    return this.show({ icon: icon || '🎁', title, desc, type: 'reward', duration: 4000, ...opts });
  },

  _escape(s){
    return String(s || '').replace(/[&<>"']/g, c => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    }[c]));
  }
};

/* ═══ استبدال showToast القديم ═══ */
window.showToast = function(msg, duration){
  Toast.info('', msg, { duration: duration || 2200 });
};

/* ============================================================
   ═══════════════ SCREEN TRANSITIONS ════════════════════════
   ============================================================ */

(function patchShowScreen(){
  const origShowScreen = window.showScreen;
  if(typeof origShowScreen !== 'function') return;

  let _currentScreenId = null;

  window.showScreen = function(id){
    const screen = document.getElementById(id);
    if(!screen) return;

    /* إزالة slide من الشاشات السابقة */
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.remove('slide-in');
    });

    /* إضافة slide للشاشة الجديدة */
    if(id !== _currentScreenId){
      screen.classList.add('slide-in');
      setTimeout(() => screen.classList.remove('slide-in'), 400);
    }

    _currentScreenId = id;
    return origShowScreen.apply(this, arguments);
  };
})();

/* ============================================================
   ═══════════════ FRIENDS v2 — FULL SYSTEM ══════════════════
   ============================================================ */

let _friendsTab = 'list';
let _friendRequests = [];
let _friends = [];
let _recentPlayers = [];
let _friendsUnsub = null;

function buildFriendsV2(){
  /* بنية الصفحة */
  const container = document.querySelector('#s-friends .sub');
  if(!container) return;

  /* حقن التبويبات */
  let tabs = document.getElementById('friends-v2-tabs');
  if(!tabs){
    tabs = document.createElement('div');
    tabs.id = 'friends-v2-tabs';
    tabs.className = 'friends-tabs';
    tabs.innerHTML = `
      <button class="ft-btn active" data-ftab="list">
        👥 الأصدقاء
        <span class="ft-badge" id="ft-badge-friends" style="display:none;">0</span>
      </button>
      <button class="ft-btn" data-ftab="requests">
        📨 الطلبات
        <span class="ft-badge" id="ft-badge-req" style="display:none;">0</span>
      </button>
      <button class="ft-btn" data-ftab="recent">
        🕐 الأخيرون
      </button>
    `;
    const toolbar = container.querySelector('.friends-toolbar');
    if(toolbar) toolbar.insertAdjacentElement('afterend', tabs);
    else container.insertBefore(tabs, container.firstChild);
  }

  /* ربط التبويبات */
  tabs.querySelectorAll('.ft-btn').forEach(btn => {
    if(btn._bound) return;
    btn._bound = true;
    btn.addEventListener('click', () => {
      _friendsTab = btn.dataset.ftab;
      tabs.querySelectorAll('.ft-btn').forEach(b =>
        b.classList.toggle('active', b === btn));
      renderFriendsContent();
      Sfx.tap();
    });
  });

  /* كود اللاعب */
  updateMyFriendCode();

  /* زر النسخ */
  const copyBtn = document.getElementById('friend-copy-code');
  if(copyBtn && !copyBtn._bound){
    copyBtn._bound = true;
    copyBtn.addEventListener('click', copyMyFriendCode);
  }

  /* البحث والإضافة */
  const searchInput = document.getElementById('friend-search');
  const addBtn = document.getElementById('friend-add-btn');

  if(addBtn && !addBtn._bound){
    addBtn._bound = true;
    addBtn.addEventListener('click', () => {
      const q = (searchInput && searchInput.value || '').trim();
      if(!q){
        Toast.warning('اكتب اسماً أو كوداً', '');
        return;
      }
      searchAndAddFriend(q);
    });
  }

  if(searchInput && !searchInput._bound){
    searchInput._bound = true;
    searchInput.addEventListener('keydown', e => {
      if(e.code === 'Enter') addBtn && addBtn.click();
    });
  }

  /* تحميل البيانات */
  loadFriendsData();
  renderFriendsContent();
}

function updateMyFriendCode(){
  const codeEl = document.getElementById('friend-my-code');
  if(!codeEl) return;

  const uid = (Cloud.user && Cloud.user.uid) || 'LOCAL0000';
  const code = uid.slice(0, 6).toUpperCase() + '-' + uid.slice(-4).toUpperCase();
  codeEl.textContent = code;
}

function copyMyFriendCode(){
  const codeEl = document.getElementById('friend-my-code');
  if(!codeEl) return;
  const code = codeEl.textContent;

  if(navigator.clipboard){
    navigator.clipboard.writeText(code).then(() => {
      Toast.success('تم نسخ الكود!', 'شاركه مع أصدقائك');
      const copyBtn = document.getElementById('friend-copy-code');
      if(copyBtn){
        copyBtn.textContent = '✓';
        setTimeout(() => copyBtn.textContent = '📋', 1500);
      }
    }).catch(() => {
      Toast.error('فشل النسخ', code);
    });
  } else {
    Toast.info('الكود', code);
  }
}

async function loadFriendsData(){
  if(!Cloud.user || !Cloud.db){
    _friends = [];
    _friendRequests = [];
    _recentPlayers = [];
    return;
  }

  const uid = Cloud.user.uid;

  try {
    /* جلب طلبات الصداقة */
    const reqSnap = await Cloud.db.collection('friend_requests')
      .where('toUid', '==', uid)
      .where('status', '==', 'pending')
      .limit(20)
      .get()
      .catch(() => null);

    if(reqSnap){
      _friendRequests = [];
      reqSnap.forEach(doc => {
        _friendRequests.push({ id: doc.id, ...doc.data() });
      });
    }

    /* جلب قائمة الأصدقاء */
    const friendSnap = await Cloud.db.collection('players').doc(uid)
      .collection('friends')
      .limit(50)
      .get()
      .catch(() => null);

    if(friendSnap){
      _friends = [];
      friendSnap.forEach(doc => {
        _friends.push({ uid: doc.id, ...doc.data() });
      });

      /* جلب بياناتهم الكاملة */
      const friendUids = _friends.map(f => f.uid);
      if(friendUids.length > 0){
        const playersSnap = await Cloud.db.collection('players')
          .where('__name__', 'in', friendUids.slice(0, 10))
          .get()
          .catch(() => null);

        if(playersSnap){
          const playerMap = {};
          playersSnap.forEach(doc => {
            playerMap[doc.id] = doc.data();
          });

          _friends = _friends.map(f => ({
            ...f,
            profile: playerMap[f.uid] || null
          }));
        }
      }
    }

    /* جلب اللاعبين الأخيرين (بديل: الجدد) */
    const recentSnap = await Cloud.db.collection('players')
      .orderBy('updatedAt', 'desc')
      .limit(10)
      .get()
      .catch(() => null);

    if(recentSnap){
      _recentPlayers = [];
      recentSnap.forEach(doc => {
        if(doc.id === uid) return;
        _recentPlayers.push({ uid: doc.id, ...doc.data() });
      });
    }

  } catch(e){
    console.warn('[Friends] Load failed:', e);
  }

  updateFriendsBadges();
}

function updateFriendsBadges(){
  const friendsBadge = document.getElementById('ft-badge-friends');
  const reqBadge = document.getElementById('ft-badge-req');

  if(friendsBadge){
    friendsBadge.textContent = _friends.length;
    friendsBadge.style.display = _friends.length > 0 ? 'flex' : 'none';
  }
  if(reqBadge){
    reqBadge.textContent = _friendRequests.length;
    reqBadge.style.display = _friendRequests.length > 0 ? 'flex' : 'none';
  }
}

function renderFriendsContent(){
  const container = document.getElementById('friends-list');
  if(!container) return;
  container.innerHTML = '';

  if(_friendsTab === 'list'){
    renderFriendsList(container);
  } else if(_friendsTab === 'requests'){
    renderFriendRequests(container);
  } else if(_friendsTab === 'recent'){
    renderRecentPlayers(container);
  }
}

function renderFriendsList(container){
  if(_friends.length === 0){
    container.innerHTML = `
      <div class="friends-empty">
        <div class="fe-icon">👥</div>
        <div class="fe-title">لا يوجد أصدقاء بعد</div>
        <div class="fe-desc">شارك كودك الخاص أو ابحث عن أصدقائك بالاسم</div>
      </div>
    `;
    return;
  }

  _friends.forEach(friend => {
    const card = buildFriendCard(friend, 'friend');
    container.appendChild(card);
  });
}

function renderFriendRequests(container){
  if(_friendRequests.length === 0){
    container.innerHTML = `
      <div class="friends-empty">
        <div class="fe-icon">📨</div>
        <div class="fe-title">لا توجد طلبات</div>
        <div class="fe-desc">ستظهر هنا طلبات الصداقة الجديدة</div>
      </div>
    `;
    return;
  }

  _friendRequests.forEach(req => {
    const card = buildFriendCard(req, 'request');
    container.appendChild(card);
  });
}

function renderRecentPlayers(container){
  if(_recentPlayers.length === 0){
    container.innerHTML = `
      <div class="friends-empty">
        <div class="fe-icon">🕐</div>
        <div class="fe-title">لا لاعبون أخيرون</div>
        <div class="fe-desc">العب أونلاين لتلتقي بلاعبين جدد</div>
      </div>
    `;
    return;
  }

  _recentPlayers.forEach(p => {
    const card = buildFriendCard(p, 'recent');
    container.appendChild(card);
  });
}

function buildFriendCard(data, type){
  const card = document.createElement('div');
  card.className = 'friend-card-v2';

  /* بيانات اللاعب */
  let name, photo, level, status;
  if(type === 'friend'){
    const profile = data.profile || {};
    name = profile.username || 'صديق';
    photo = null;
    level = Math.floor((profile.saveData?.stats?.totalMeters || 0) / 300) + 1;
    status = 'offline';
  } else if(type === 'request'){
    name = data.fromName || 'لاعب';
    photo = data.fromPhoto || null;
    level = 1;
    status = 'offline';
  } else {
    name = data.username || 'لاعب';
    photo = null;
    level = Math.floor((data.saveData?.stats?.totalMeters || 0) / 300) + 1;
    status = 'offline';
  }

  /* فحص حالة آخر ظهور */
  const lastSeen = data.lastSeen && data.lastSeen.toMillis ? data.lastSeen.toMillis() : 0;
  if(lastSeen > Date.now() - 5 * 60 * 1000){
    status = 'online';
  }

  const statusLabel = {
    online: 'متصل الآن',
    playing: 'قيد اللعب',
    away: 'غير نشط',
    offline: 'غير متصل'
  }[status];

  const avatarContent = photo
    ? `<img src="${photo}" alt="">`
    : `<span>${name.charAt(0).toUpperCase()}</span>`;

  card.innerHTML = `
    <div class="fc2-avatar">
      ${avatarContent}
      <span class="fc2-status ${status}"></span>
    </div>
    <div class="fc2-info">
      <div class="fc2-name">${escapeHtml(name)}</div>
      <div class="fc2-meta">
        <span class="fc2-level">LVL ${level}</span>
        <span class="dot"></span>
        <span>${statusLabel}</span>
      </div>
    </div>
    <div class="fc2-actions">
      ${type === 'request' ? `
        <button class="fc2-btn success" data-action="accept" title="قبول">✓</button>
        <button class="fc2-btn danger" data-action="reject" title="رفض">✕</button>
      ` : type === 'friend' ? `
        <button class="fc2-btn primary" data-action="invite" title="دعوة">🎮</button>
        <button class="fc2-btn ghost" data-action="more" title="المزيد">⋯</button>
      ` : `
        <button class="fc2-btn primary" data-action="add" title="إضافة">＋</button>
      `}
    </div>
  `;

  /* ربط الأزرار */
  card.querySelectorAll('.fc2-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      handleFriendAction(btn.dataset.action, data, type);
    });
  });

  return card;
}

async function handleFriendAction(action, data, type){
  if(!Cloud.user || !Cloud.db) return;

  const uid = Cloud.user.uid;

  if(action === 'accept'){
    try {
      /* إضافة اللاعب للقائمة */
      await Cloud.db.collection('players').doc(uid)
        .collection('friends').doc(data.fromUid).set({
          uid: data.fromUid,
          since: Date.now()
        });

      /* إضافة العكس */
      await Cloud.db.collection('players').doc(data.fromUid)
        .collection('friends').doc(uid).set({
          uid,
          since: Date.now()
        });

      /* تحديث الطلب */
      await Cloud.db.collection('friend_requests').doc(data.id).update({
        status: 'accepted'
      });

      Toast.success('تم قبول الصداقة!', 'يمكنك الآن اللعب معه');
      await loadFriendsData();
      renderFriendsContent();
    } catch(e){
      console.warn('[Friends] Accept failed:', e);
      Toast.error('فشل القبول', e.message);
    }
  }
  else if(action === 'reject'){
    try {
      await Cloud.db.collection('friend_requests').doc(data.id).update({
        status: 'rejected'
      });
      Toast.info('تم رفض الطلب');
      await loadFriendsData();
      renderFriendsContent();
    } catch(e){
      Toast.error('فشل', e.message);
    }
  }
  else if(action === 'add'){
    await sendFriendRequest(data.uid);
  }
  else if(action === 'invite'){
    /* دعوة للعب */
    if(typeof mpCreateRoom === 'function'){
      try {
        await mpCreateRoom(Save.data.mode);
        Toast.success('تم إنشاء غرفة!', 'شارك الكود مع صديقك');
      } catch(e){
        Toast.error('فشل', e.message);
      }
    }
  }
  else if(action === 'more'){
    showFriendActions(data);
  }
}

async function searchAndAddFriend(query){
  if(!Cloud.user || !Cloud.db) return;

  const uid = Cloud.user.uid;
  const cleanQuery = query.trim();
  if(!cleanQuery) return;

  try {
    /* البحث بالـ username */
    let targetUid = null;

    /* محاولة البحث بالكود أولاً */
    const codeSnap = await Cloud.db.collection('players')
      .where('friendCode', '==', cleanQuery.toUpperCase())
      .limit(1)
      .get()
      .catch(() => null);

    if(codeSnap && !codeSnap.empty){
      targetUid = codeSnap.docs[0].id;
    } else {
      /* البحث بالاسم */
      const nameSnap = await Cloud.db.collection('players')
        .where('username', '==', cleanQuery)
        .limit(1)
        .get()
        .catch(() => null);

      if(nameSnap && !nameSnap.empty){
        targetUid = nameSnap.docs[0].id;
      }
    }

    if(!targetUid){
      Toast.warning('لا يوجد لاعب بهذا الاسم/الكود', '');
      return;
    }

    if(targetUid === uid){
      Toast.warning('لا يمكن إضافة نفسك', '');
      return;
    }

    await sendFriendRequest(targetUid);

  } catch(e){
    console.warn('[Friends] Search failed:', e);
    Toast.error('فشل البحث', e.message);
  }
}

async function sendFriendRequest(targetUid){
  if(!Cloud.user || !Cloud.db) return;

  const uid = Cloud.user.uid;
  const name = (Cloud.profile && Cloud.profile.username) || 'لاعب';
  const photo = Cloud.user.photoURL || null;

  try {
    /* تحقق من عدم وجود طلب سابق */
    const existing = await Cloud.db.collection('friend_requests')
      .where('fromUid', '==', uid)
      .where('toUid', '==', targetUid)
      .where('status', '==', 'pending')
      .limit(1)
      .get()
      .catch(() => null);

    if(existing && !existing.empty){
      Toast.info('الطلب مرسل مسبقاً');
      return;
    }

    /* إنشاء الطلب */
    await Cloud.db.collection('friend_requests').add({
      fromUid: uid,
      fromName: name,
      fromPhoto: photo,
      toUid: targetUid,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    Toast.success('تم إرسال الطلب!', 'بانتظار قبول الصديق');

  } catch(e){
    console.warn('[Friends] Send failed:', e);
    Toast.error('فشل الإرسال', e.message);
  }
}

function showFriendActions(friend){
  const name = (friend.profile && friend.profile.username) || friend.username || 'صديق';
  const action = prompt(
    `الصديق: ${name}\n\n` +
    `1 — دعوة للمبارزة\n` +
    `2 — عرض الملف\n` +
    `3 — إزالة صديق`
  );

  if(action === '1'){
    handleFriendAction('invite', friend, 'friend');
  } else if(action === '2'){
    Toast.info('عرض الملف', 'قيد التطوير');
  } else if(action === '3'){
    removeFriend(friend);
  }
}

async function removeFriend(friend){
  if(!Cloud.user || !Cloud.db) return;
  if(!confirm('إزالة هذا الصديق؟')) return;

  const uid = Cloud.user.uid;

  try {
    await Cloud.db.collection('players').doc(uid)
      .collection('friends').doc(friend.uid).delete();

    await Cloud.db.collection('players').doc(friend.uid)
      .collection('friends').doc(uid).delete();

    Toast.success('تمت الإزالة');
    await loadFriendsData();
    renderFriendsContent();
  } catch(e){
    Toast.error('فشل', e.message);
  }
}

function escapeHtml(s){
  return String(s || '').replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[c]));
}

/* ============================================================
   ═══════════════ LEADERBOARD v2 ════════════════════════════
   ============================================================ */

let _lbFilter = 'global'; /* global | friends | local */

function buildLeaderboardV2(){
  /* بناء فلاتر */
  const container = document.querySelector('#s-leaderboard .sub');
  if(!container) return;

  let filters = document.getElementById('lb-filters');
  if(!filters){
    filters = document.createElement('div');
    filters.id = 'lb-filters';
    filters.className = 'lb-filters';
    filters.innerHTML = `
      <button class="lbf-chip active" data-lb="global">🌍 عالمي</button>
      <button class="lbf-chip" data-lb="friends">👥 الأصدقاء</button>
      <button class="lbf-chip" data-lb="local">📱 محلي</button>
    `;
    const tabs = container.querySelector('#lb-tabs');
    if(tabs) tabs.insertAdjacentElement('beforebegin', filters);
    else container.appendChild(filters);
  }

  /* ربط الفلاتر */
  filters.querySelectorAll('.lbf-chip').forEach(btn => {
    if(btn._bound) return;
    btn._bound = true;
    btn.addEventListener('click', () => {
      _lbFilter = btn.dataset.lb;
      filters.querySelectorAll('.lbf-chip').forEach(b =>
        b.classList.toggle('active', b === btn));
      renderLeaderboardV2();
      Sfx.tap();
    });
  });

  /* ربط التبويبات الرئيسية */
  document.querySelectorAll('#lb-tabs .tab-chip').forEach(tab => {
    if(tab._bound) return;
    tab._bound = true;
    tab.addEventListener('click', () => {
      currentLbTab = tab.dataset.lbtab;
      document.querySelectorAll('#lb-tabs .tab-chip').forEach(t =>
        t.classList.toggle('active', t === tab));
      renderLeaderboardV2();
      Sfx.tap();
    });
  });

  renderLeaderboardV2();
}

async function renderLeaderboardV2(){
  const list = document.getElementById('lb-list');
  if(!list) return;

  list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--ink-mute);font-size:12px;">⏳ جارٍ التحميل...</div>';

  let players = [];

  /* ═══ جلب البيانات ═══ */
  if(_lbFilter === 'local'){
    /* عرض البيانات المحلية فقط */
    players = [{
      uid: 'local',
      username: (Cloud.profile && Cloud.profile.username) || 'أنت',
      saveData: Save.data,
      isMe: true
    }];
  } else if(_lbFilter === 'friends'){
    /* عرض الأصدقاء + اللاعب الحالي */
    players = [{
      uid: (Cloud.user && Cloud.user.uid) || 'me',
      username: (Cloud.profile && Cloud.profile.username) || 'أنت',
      saveData: Save.data,
      isMe: true
    }];

    _friends.forEach(f => {
      if(f.profile){
        players.push({
          uid: f.uid,
          username: f.profile.username || 'صديق',
          saveData: f.profile.saveData || {}
        });
      }
    });
  } else {
    /* عالمي */
    if(Cloud.db){
      try {
        const snap = await Cloud.db.collection('players').limit(50).get();
        snap.forEach(doc => {
          players.push({
            uid: doc.id,
            username: doc.data().username || 'لاعب',
            saveData: doc.data().saveData || {}
          });
        });
      } catch(e){
        console.warn('[LB] Fetch failed:', e);
      }
    }

    /* أضف نفسك */
    const myUid = (Cloud.user && Cloud.user.uid) || 'me';
    if(!players.find(p => p.uid === myUid)){
      players.push({
        uid: myUid,
        username: (Cloud.profile && Cloud.profile.username) || 'أنت',
        saveData: Save.data,
        isMe: true
      });
    } else {
      players.forEach(p => { if(p.uid === myUid) p.isMe = true; });
    }
  }

  /* الترتيب */
  const getValue = (p) => {
    const sd = p.saveData || {};
    switch(currentLbTab){
      case 'coins': return sd.coins || 0;
      case 'distance': {
        const bm = sd.bestMeters || {};
        return (bm.FLIP||0) + (bm.FLAP||0) + (bm.DRIFT||0) + (bm.WALK||0);
      }
      case 'level': {
        const meters = (sd.stats && sd.stats.totalMeters) || 0;
        return getLevelIdxFromMeters(meters);
      }
      case 'season': return (sd.season && sd.season.points) || 0;
      default: return 0;
    }
  };

  players.sort((a, b) => getValue(b) - getValue(a));
  players = players.slice(0, 50);

  if(players.length === 0){
    list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--ink-mute);">لا يوجد لاعبون</div>';
    return;
  }

  /* ═══ Top 3 Podium ═══ */
  const top3 = players.slice(0, 3);
  const rest = players.slice(3);

  if(top3.length > 0 && _lbFilter !== 'local'){
    const podium = document.createElement('div');
    podium.className = 'lb-podium';

    const order = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3;
    const positions = top3.length >= 3 ? ['second', 'first', 'third'] : ['first', 'second', 'third'];

    order.forEach((p, i) => {
      if(!p) return;
      const pos = positions[i];
      const rankNum = pos === 'first' ? 1 : pos === 'second' ? 2 : 3;
      const name = (p.username || 'لاعب').slice(0, 10);
      const val = getValue(p);

      const el = document.createElement('div');
      el.className = `lbp-item ${pos}`;

      el.innerHTML = `
        ${pos === 'first' ? '<div class="lbp-crown">👑</div>' : ''}
        <div class="lbp-avatar">${name.charAt(0).toUpperCase()}</div>
        <div class="lbp-name">${escapeHtml(name)}${p.isMe ? ' (أنت)' : ''}</div>
        <div class="lbp-value">${formatLbValue(val)}</div>
        <div class="lbp-podium-bar">${rankNum}</div>
      `;

      podium.appendChild(el);
    });

    list.appendChild(podium);
  }

  /* ═══ باقي القائمة ═══ */
  const startRank = top3.length >= 3 ? 4 : 1;
  const displayRest = _lbFilter === 'local' ? players : rest;

  displayRest.forEach((p, idx) => {
    const rank = startRank + idx;
    const name = p.username || 'لاعب';
    const val = getValue(p);

    const el = document.createElement('div');
    el.className = 'lb-row' + (p.isMe ? ' me' : '');

    el.innerHTML = `
      <div class="lb-rank">${rank}</div>
      <div class="lb-avatar">${name.charAt(0).toUpperCase()}</div>
      <div class="lb-info">
        <div class="lb-name">${escapeHtml(name)}${p.isMe ? ' (أنت)' : ''}</div>
        <div class="lb-sub">${currentLbTab === 'distance' ? 'المسافة الكلية' : currentLbTab === 'coins' ? 'العملات' : currentLbTab === 'level' ? 'المستوى' : 'نقاط الموسم'}</div>
      </div>
      <div class="lb-value">${formatLbValue(val)}</div>
    `;

    list.appendChild(el);
  });
}

function formatLbValue(val){
  const tab = currentLbTab;
  if(tab === 'coins') return '◆ ' + Number(val).toLocaleString();
  if(tab === 'distance') return Number(val).toLocaleString() + 'م';
  if(tab === 'level') return 'LVL ' + val;
  if(tab === 'season') return val.toLocaleString();
  return val;
}

/* ============================================================
   ═══════════════ PREMIUM BATTLE PASS ═══════════════════════
   ============================================================ */

const PREMIUM_BP_PRICE = 1500;

function buildPremiumBPCard(){
  const container = document.getElementById('bp-v2-tiers');
  if(!container) return;

  const parent = container.parentNode;
  if(!parent) return;

  /* إزالة البطاقة القديمة إن وُجدت */
  const existing = document.getElementById('bp-premium-card');
  if(existing) existing.remove();

  const card = document.createElement('div');
  const isOwned = !!Save.data.battlePass.premiumOwned;

  card.id = 'bp-premium-card';
  card.className = 'bp-premium-card' + (isOwned ? ' owned' : '');

  card.innerHTML = `
    <div class="bppc-head">
      <div class="bppc-icon">${isOwned ? '👑' : '✨'}</div>
      <div class="bppc-info">
        <div class="bppc-title">${isOwned ? 'Premium مفعّل!' : 'Premium Battle Pass'}</div>
        <div class="bppc-sub">${isOwned ? 'استمتع بمكافآت مضاعفة' : 'افتح مكافآت 3 أضعاف'}</div>
      </div>
    </div>

    <div class="bppc-features">
      <div class="bppc-feat"><span class="ic">💎</span> <span>عملات مضاعفة 3x</span></div>
      <div class="bppc-feat"><span class="ic">🎁</span> <span>عناصر حصرية Premium</span></div>
      <div class="bppc-feat"><span class="ic">👑</span> <span>شارة Premium على اسمك</span></div>
      <div class="bppc-feat"><span class="ic">⚡</span> <span>تعزيز إضافي أسبوعياً</span></div>
    </div>

    <div class="bppc-price-row">
      ${isOwned
        ? `<div class="bppc-price"><span class="c">✓</span> مُفعّل</div>
           <button class="bppc-buy owned" disabled>مملوك</button>`
        : `<div class="bppc-price">
             <span class="old">◆ 2500</span>
             <span class="c">◆</span>
             <span>${PREMIUM_BP_PRICE}</span>
           </div>
           <button class="bppc-buy" id="bp-premium-buy">شراء الآن</button>`
      }
    </div>
  `;

  /* إدراج قبل القائمة */
  parent.insertBefore(card, container);

  /* ربط الزر */
  const buyBtn = card.querySelector('#bp-premium-buy');
  if(buyBtn){
    buyBtn.addEventListener('click', purchasePremiumBP);
  }
}

async function purchasePremiumBP(){
  const unlimited = hasAdminAccess() && Save.data.admin.unlimitedCoins;
  const canAfford = Save.data.coins >= PREMIUM_BP_PRICE;

  if(!unlimited && !canAfford){
    Toast.error('رصيد غير كافٍ', `تحتاج ◆ ${PREMIUM_BP_PRICE - Save.data.coins}`);
    Sfx.play(220, 0.15, 'sine', 0.05, 180);
    haptic(20);
    return;
  }

  if(!confirm(`شراء Premium Battle Pass بـ ◆ ${PREMIUM_BP_PRICE}؟`)) return;

  if(!unlimited) Save.data.coins -= PREMIUM_BP_PRICE;
  Save.data.battlePass.premiumOwned = true;
  Save.save();

  updateCoinsUI();
  Sfx.reward(); haptic(40);

  /* تأثيرات */
  Toast.reward('👑', 'تم تفعيل Premium!', 'استمتع بالمكافآت المضاعفة', { duration: 5000 });

  /* احتفال بصري */
  for(let i = 0; i < 40; i++){
    const a = (i / 40) * Math.PI * 2;
    particles.push({
      x: P.x, y: P.y,
      vx: Math.cos(a) * rand(4, 10),
      vy: Math.sin(a) * rand(4, 10),
      life: 1.5, decay: 0.018,
      color: i % 2 ? '#E8B34E' : '#FFF4C0',
      size: rand(3, 6)
    });
  }

  /* إعادة بناء القائمة */
  if(typeof buildBattlePassV2Page === 'function'){
    buildBattlePassV2Page();
  }
}

/* ============================================================
   ═══════════════ DAILY CHALLENGES ══════════════════════════
   ============================================================ */

const CHALLENGE_TEMPLATES = [
  {
    id: 'speedRun',
    icon: '⚡',
    title: 'سباق السرعة',
    desc: 'اعبر 500 متر خلال 30 ثانية',
    target: 500,
    unit: 'م',
    reward: 150,
    difficulty: 'medium',
    check: (stats) => stats.maxMetersIn30s || 0
  },
  {
    id: 'comboMaster',
    icon: '🔥',
    title: 'سيّد السلاسل',
    desc: 'حقق سلسلة x25',
    target: 25,
    unit: 'x',
    reward: 200,
    difficulty: 'hard',
    check: (stats) => stats.bestCombo || 0
  },
  {
    id: 'perfectRun',
    icon: '💎',
    title: 'الجولة المثالية',
    desc: 'اعبر 1000 متر دون إصابة',
    target: 1000,
    unit: 'م',
    reward: 300,
    difficulty: 'hard',
    check: (stats) => stats.perfectRunMeters || 0
  },
  {
    id: 'noPowerups',
    icon: '🎯',
    title: 'بلا تعزيزات',
    desc: 'اعبر 400 متر بدون تعزيزات',
    target: 400,
    unit: 'م',
    reward: 180,
    difficulty: 'medium',
    check: (stats) => stats.noPowerupMeters || 0
  },
  {
    id: 'collector',
    icon: '🔮',
    title: 'جامع الطاقة',
    desc: 'اجمع 20 كرة طاقة',
    target: 20,
    unit: 'كرة',
    reward: 150,
    difficulty: 'easy',
    check: (stats) => stats.orbsCollected || 0
  }
];

function getDailyChallenge(){
  /* اختيار تحدٍ حسب التاريخ (يعطيك نفس التحدي لليوم) */
  const dayIndex = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
  const idx = dayIndex % CHALLENGE_TEMPLATES.length;
  const template = CHALLENGE_TEMPLATES[idx];

  /* ✅ استخدم دالة محلية بدلاً من today() لتجنّب TDZ */
  const todayStr = new Date().toISOString().slice(0, 10);

  const state = Save.data.dailyChallenge || {};
  const completed = state.date === todayStr && state.completed;
  const progress = state.date === todayStr ? (state.progress || 0) : 0;

  return { ...template, completed, progress, date: todayStr };
}

function buildDailyChallengeCard(){
  const challenge = getDailyChallenge();
  const container = document.getElementById('missions-v2-content') ||
                    document.querySelector('#s-missions-v2 .sub');
  if(!container) return;

  /* إزالة البطاقة السابقة */
  const existing = document.getElementById('daily-challenge-card');
  if(existing) existing.remove();

  const card = document.createElement('div');
  card.id = 'daily-challenge-card';
  card.className = 'challenge-card' + (challenge.completed ? ' completed' : '');

  const progressPct = Math.min(100, (challenge.progress / challenge.target) * 100);

  card.innerHTML = `
    <div class="ch-head">
      <div class="ch-icon">${challenge.icon}</div>
      <div class="ch-info">
        <div class="ch-title">${challenge.title}</div>
        <div class="ch-desc">${challenge.desc}</div>
      </div>
    </div>
    <div class="ch-meta">
      <div class="ch-progress">
        <div class="ch-prog-bar">
          <div class="ch-prog-fill" style="width:${progressPct}%"></div>
        </div>
        <div class="ch-prog-label">${challenge.progress} / ${challenge.target} ${challenge.unit}</div>
      </div>
      <div class="ch-reward">
        <span class="c">◆</span>
        <span>${challenge.reward}</span>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    if(challenge.completed){
      Toast.success('تحدي اليوم مكتمل!', 'عد غداً لتحدٍ جديد');
      return;
    }
    showChallengeModal(challenge);
  });

  /* الإدراج في أعلى المحتوى */
  container.insertBefore(card, container.firstChild);
}

function showChallengeModal(challenge){
  let modal = document.getElementById('challenge-modal');
  if(!modal){
    modal = document.createElement('div');
    modal.id = 'challenge-modal';
    modal.className = 'challenge-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="cm-box">
      <div class="cm-icon">${challenge.icon}</div>
      <div class="cm-title">${challenge.title}</div>
      <div class="cm-desc">${challenge.desc}</div>

      <div class="cm-rules">
        <div class="cm-rule">
          <span class="ic">◆</span>
          <span>الهدف: ${challenge.target} ${challenge.unit}</span>
        </div>
        <div class="cm-rule">
          <span class="ic">◆</span>
          <span>المكافأة: ◆ ${challenge.reward}</span>
        </div>
        <div class="cm-rule">
          <span class="ic">◆</span>
          <span>الصعوبة: ${challenge.difficulty === 'easy' ? 'سهل' : challenge.difficulty === 'medium' ? 'متوسط' : 'صعب'}</span>
        </div>
      </div>

      <div class="cm-reward-box">
        <span class="ic">🎁</span>
        <span class="val">◆ ${challenge.reward}</span>
      </div>

      <div class="cm-actions">
        <button class="action-btn soft" id="cm-cancel">لاحقاً</button>
        <button class="action-btn gold" id="cm-start">ابدأ الآن</button>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const cancelBtn = modal.querySelector('#cm-cancel');
  const startBtn = modal.querySelector('#cm-start');

  if(cancelBtn){
    cancelBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      Sfx.tap();
    });
  }

  if(startBtn){
    startBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      Sfx.reward(); haptic(20);

      /* ابدأ اللعب مع تتبع التحدي */
      Save.data._activeChallenge = challenge.id;
      Save.save();

      Toast.info('بدأ التحدي!', challenge.desc, { duration: 3000 });

      if(typeof startGame === 'function'){
        startGame();
      }
    });
  }
}

/* ═══ تحديث التقدم عند نهاية الجولة ═══ */
function updateChallengeProgress(runStats){
  const challenge = getDailyChallenge();
  if(challenge.completed) return;

  const today = challenge.date;
  const state = Save.data.dailyChallenge || {};

  /* فحص شرط التحدي */
  let newProgress = 0;
  if(challenge.id === 'comboMaster'){
    newProgress = runStats.bestCombo || 0;
  } else if(challenge.id === 'collector'){
    newProgress = runStats.orbsCollected || 0;
  } else if(challenge.id === 'speedRun'){
    newProgress = runStats.maxMetersIn30s || 0;
  } else if(challenge.id === 'perfectRun'){
    newProgress = runStats.perfectRunMeters || 0;
  } else if(challenge.id === 'noPowerups'){
    newProgress = runStats.noPowerupMeters || 0;
  }

  /* تحديث */
  if(state.date !== today){
    state.date = today;
    state.progress = 0;
    state.completed = false;
  }

  if(newProgress > (state.progress || 0)){
    state.progress = newProgress;
  }

  /* اكتمل؟ */
  const wasCompleted = state.completed;
  const isNowCompleted = state.progress >= challenge.target;

  if(isNowCompleted && !wasCompleted){
    state.completed = true;
    Save.data.coins += challenge.reward;
    Save.data.stats.totalCoins += challenge.reward;
    Save.save();
    updateCoinsUI();

    Sfx.reward(); haptic(30);
    Toast.reward(challenge.icon, 'تحدي اليوم مكتمل!', '◆ +' + challenge.reward, { duration: 5000 });
  } else {
    Save.save();
  }
}

/* ============================================================
   ═══════════════ INTEGRATION HOOKS ═════════════════════════
   ============================================================ */

/* ═══ hook: عند فتح شاشة الأصدقاء ═══ */
(function hookFriendsScreen(){
  const origShowScreen = window.showScreen;
  if(typeof origShowScreen !== 'function') return;

  window.showScreen = function(id){
    const result = origShowScreen.apply(this, arguments);

    if(id === 's-friends'){
      setTimeout(() => {
        try { buildFriendsV2(); } catch(e){ console.warn('[Friends]', e); }
      }, 80);
    }

    if(id === 's-leaderboard'){
      setTimeout(() => {
        try { buildLeaderboardV2(); } catch(e){ console.warn('[Leaderboard]', e); }
      }, 80);
    }

    if(id === 's-battlepass-v2'){
      setTimeout(() => {
        try { buildPremiumBPCard(); } catch(e){ console.warn('[PremiumBP]', e); }
      }, 80);
    }

    if(id === 's-missions-v2'){
      setTimeout(() => {
        try { buildDailyChallengeCard(); } catch(e){ console.warn('[Challenge]', e); }
      }, 80);
    }

    return result;
  };
})();

/* ═══ hook: عند انتهاء الجولة ═══ */
(function hookGameOver(){
  const origGameOver = window.gameOver;
  if(typeof origGameOver !== 'function') return;

  window.gameOver = function(){
    /* جمع إحصائيات الجولة */
    const runStats = {
      meters: getMeters(),
      bestCombo: G.comboMax || 0,
      orbsCollected: G.orbCount || 0,
      maxMetersIn30s: Math.max(Save.data.stats.maxMetersIn30s || 0, getMeters()),
      perfectRunMeters: G.invulnUsed === 0 ? getMeters() : (Save.data.stats.perfectRunMeters || 0),
      noPowerupMeters: Object.keys(G.activePowerups).length === 0 ? getMeters() : (Save.data.stats.noPowerupMeters || 0)
    };

    /* تحديث الحفظ */
    if(!Save.data.stats) Save.data.stats = {};
    Save.data.stats.maxMetersIn30s = runStats.maxMetersIn30s;
    if(runStats.perfectRunMeters > (Save.data.stats.perfectRunMeters || 0)){
      Save.data.stats.perfectRunMeters = runStats.perfectRunMeters;
    }
    if(runStats.noPowerupMeters > (Save.data.stats.noPowerupMeters || 0)){
      Save.data.stats.noPowerupMeters = runStats.noPowerupMeters;
    }

    /* تحديث التحدي اليومي */
    try { updateChallengeProgress(runStats); } catch(e){ console.warn('[Challenge]', e); }

    /* استدعاء الأصلي */
    return origGameOver.apply(this, arguments);
  };
})();

/* ═══ hook: عند فتح الرئيسية — تحديث الشارات ═══ */
(function hookHome(){
  const origBuildHome = window.buildHome;
  if(typeof origBuildHome !== 'function') return;

  window.buildHome = function(){
    const result = origBuildHome.apply(this, arguments);
    try {
      updateHomeBadges();
      if(typeof updatePlayerCard === 'function') updatePlayerCard();
    } catch(e){}
    return result;
  };
})();

/* ============================================================
   ═══════════════ INIT ═══════════════
   ============================================================ */

(function initV25(){
  /* تهيئة Toast */
  Toast.init();

  /* فحص التحدي اليومي عند البدء */
  setTimeout(() => {
    const challenge = getDailyChallenge();
    if(!challenge.completed){
      setTimeout(() => {
        Toast.reward(challenge.icon, 'تحدي اليوم!', challenge.title, {
          duration: 4500,
          action: {
            label: 'اعرض',
            callback: () => {
              currentMissionTab = 'daily';
              buildMissionsV2Page();
              showScreen('s-missions-v2');
            }
          }
        });
      }, 2000);
    }
  }, 1500);

  /* فحص طلبات الصداقة */
  setInterval(async () => {
    if(!Cloud.user || !Cloud.db) return;
    if(!document.getElementById('s-home').classList.contains('active')) return;

    try {
      const uid = Cloud.user.uid;
      const snap = await Cloud.db.collection('friend_requests')
        .where('toUid', '==', uid)
        .where('status', '==', 'pending')
        .limit(1)
        .get();

      if(!snap.empty){
        const hasShownBadge = document.getElementById('ft-badge-req');
        if(!hasShownBadge || hasShownBadge.style.display === 'none'){
          Toast.info('📨', 'لديك طلب صداقة جديد', '', {
            duration: 5000,
            action: {
              label: 'اعرض',
              callback: () => {
                _friendsTab = 'requests';
                buildFriendsV2();
                showScreen('s-friends');
              }
            }
          });
        }
      }
    } catch(e){}
  }, 60000); /* كل دقيقة */

  console.log('[SHIFT v2.5] ✅ Friends · Leaderboard · Toasts · Challenges loaded');
})();

/* ═══ تصدير ═══ */
window.Toast = Toast;
window.buildFriendsV2 = buildFriendsV2;
window.buildLeaderboardV2 = buildLeaderboardV2;
window.buildPremiumBPCard = buildPremiumBPCard;
window.buildDailyChallengeCard = buildDailyChallengeCard;
window.getDailyChallenge = getDailyChallenge;

/* ============================================================
   ═══════════════════════════════════════════════════════════
   ═══════════ SHIFT v2.6 — CHAT · REFERRAL · CLANS ═════════
   ═══════════════════════════════════════════════════════════
   يضيف:
   - دردشة فورية مع الأصدقاء
   - تحديات مباشرة (بدون كود)
   - نظام إحالة مع مكافآت
   - نظام فرق/Clans كامل
   ============================================================ */

/* ═══════════════ المتغيرات ═══════════════ */
let _chatFriend = null;
let _chatUnsub = null;
let _chatMessages = [];
let _directChallengeFriend = null;
let _directChallengeRounds = 1;

let _referralUnsub = null;
let _referrals = [];
let _referralMilestones = [];

let _clanTab = 'my';
let _myClan = null;
let _clanUnsub = null;
let _clanList = [];
let _pendingClanEmblem = '🛡️';
let _pendingClanColor = '#4A88C8';
let _pendingClanPrivacy = 'open';

const CLAN_COST = 500;
const CLAN_MAX_MEMBERS = 20;

const CLAN_EMBLEMS = ['🛡️','⚔️','🔥','💎','👑','🐺','🦁','🦅','🐉','⚡','🌟','🌀','🌊','🏆','🎯','⚓','🍀','🎪'];

const CLAN_COLORS = [
  '#4A88C8','#8E6AA8','#E8B34E','#E85838','#6B9B6B',
  '#C98A2E','#A06AD8','#FF00D8','#5A8FD8','#3A8040',
  '#C06030','#6A48A8','#FF8040','#E87080','#4090B0','#8040A0'
];

const REFERRAL_MILESTONES = [
  { count: 1, reward: 200,  icon: '🌱', title: 'أول صديق',      desc: 'انضم صديق واحد' },
  { count: 3, reward: 800,  icon: '🌿', title: 'ثلاثة أصدقاء',   desc: 'انضم 3 أصدقاء' },
  { count: 5, reward: 1500, icon: '🌳', title: 'مجموعة قوية',    desc: 'انضم 5 أصدقاء' },
  { count: 10, reward: 4000, icon: '👑', title: 'زعيم الدعوات',   desc: 'انضم 10 أصدقاء' },
  { count: 25, reward: 12000, icon: '🏆', title: 'أسطورة الدعوة',  desc: 'انضم 25 صديقاً' }
];

const EMOJI_LIST = [
  '😀','😂','🤣','😊','😍','😘','🥰','😎','🤩','😇',
  '🙂','😉','😌','😜','🤪','🤔','🤨','😐','😑','😴',
  '😢','😭','😤','😠','😡','🤯','😱','😨','🥺','😳',
  '👍','👎','👏','🙌','🤝','💪','✌️','🤞','👋','🙏',
  '❤️','🧡','💛','💚','💙','💜','🖤','💔','💯','✨',
  '🔥','⭐','🌟','💫','⚡','💥','🎉','🎊','🎁','🎯',
  '🏆','👑','💎','🚀','⚔️','🛡️','🎮','🎲','🎪','🎨'
];

/* ============================================================
   ═══════════════ CHAT SYSTEM ═══════════════════════════════
   ============================================================ */

async function openChatWithFriend(friend){
  if(!Cloud.user || !Cloud.db){
    Toast.error('يجب تسجيل الدخول');
    return;
  }

  _chatFriend = friend;

  /* رأس المحادثة */
  const headerName = document.getElementById('chat-header-name');
  const headerStatus = document.getElementById('chat-header-status');
  const headerAvatar = document.getElementById('chat-header-avatar');

  const name = friend.username || (friend.profile && friend.profile.username) || 'صديق';
  if(headerName) headerName.textContent = name;
  if(headerStatus){
    headerStatus.textContent = 'غير متصل';
    headerStatus.className = 'chat-header-status';
  }
  if(headerAvatar){
    headerAvatar.textContent = name.charAt(0).toUpperCase();
  }

  /* عرض الشاشة */
  showScreen('s-chat');

  /* تحميل الرسائل */
  loadChatMessages();

  /* ربط زر الدعوة */
  const inviteBtn = document.getElementById('chat-invite-btn');
  if(inviteBtn && !inviteBtn._bound){
    inviteBtn._bound = true;
    inviteBtn.addEventListener('click', () => {
      openDirectChallenge(friend);
    });
  }

  /* ربط الإدخال */
  wireChatInput();

  /* تحميل الإيموجي */
  buildEmojiPanel();
}

function wireChatInput(){
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const emojiBtn = document.getElementById('chat-emoji-btn');
  const emojiPanel = document.getElementById('chat-emoji-panel');

  if(input && !input._bound){
    input._bound = true;
    input.addEventListener('input', () => {
      if(sendBtn) sendBtn.disabled = !input.value.trim();
    });
    input.addEventListener('keydown', e => {
      if(e.code === 'Enter' && !e.shiftKey){
        e.preventDefault();
        if(input.value.trim()) sendChatMessage();
      }
    });
  }

  if(sendBtn && !sendBtn._bound){
    sendBtn._bound = true;
    sendBtn.addEventListener('click', sendChatMessage);
  }

  if(emojiBtn && !emojiBtn._bound){
    emojiBtn._bound = true;
    emojiBtn.addEventListener('click', () => {
      if(emojiPanel){
        emojiPanel.style.display = emojiPanel.style.display === 'none' ? 'block' : 'none';
        Sfx.tap();
      }
    });
  }
}

function buildEmojiPanel(){
  const grid = document.getElementById('cep-grid');
  if(!grid || grid._built) return;
  grid._built = true;

  grid.innerHTML = EMOJI_LIST.map(e =>
    `<button class="cep-emoji" data-emoji="${e}">${e}</button>`
  ).join('');

  grid.querySelectorAll('.cep-emoji').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById('chat-input');
      if(input){
        input.value += btn.dataset.emoji;
        input.dispatchEvent(new Event('input'));
      }
    });
  });
}

async function loadChatMessages(){
  if(!Cloud.user || !Cloud.db || !_chatFriend) return;

  /* إلغاء المستمع السابق */
  if(_chatUnsub){ try { _chatUnsub(); } catch(e){} _chatUnsub = null; }

  const myUid = Cloud.user.uid;
  const friendUid = _chatFriend.uid || _chatFriend.fromUid;

  /* معرّف محادثة موحد (ترتيب أبجدي لضمان عدم التكرار) */
  const chatId = [myUid, friendUid].sort().join('_');

  const messagesEl = document.getElementById('chat-messages');
  if(messagesEl){
    messagesEl.innerHTML = '<div style="text-align:center;padding:20px;color:var(--ink-mute);font-size:12px;">⏳ جارٍ التحميل...</div>';
  }

  try {
    _chatUnsub = Cloud.db.collection('chats').doc(chatId)
      .collection('messages')
      .orderBy('ts', 'desc')
      .limit(50)
      .onSnapshot(snap => {
        _chatMessages = [];
        snap.forEach(doc => {
          _chatMessages.push({ id: doc.id, ...doc.data() });
        });
        _chatMessages.reverse();
        renderChatMessages();
      }, err => {
        console.warn('[Chat] Listener error:', err);
        renderChatMessages();
      });

  } catch(e){
    console.warn('[Chat] Load failed:', e);
  }
}

function renderChatMessages(){
  const container = document.getElementById('chat-messages');
  if(!container) return;

  if(_chatMessages.length === 0){
    container.innerHTML = `
      <div class="chat-empty">
        <div class="ce-icon">💬</div>
        <div class="ce-title">لا توجد رسائل</div>
        <div class="ce-desc">ابدأ المحادثة بإرسال تحية!</div>
      </div>
    `;
    return;
  }

  const myUid = Cloud.user ? Cloud.user.uid : null;

  container.innerHTML = '';

  _chatMessages.forEach(msg => {
    const isMe = msg.from === myUid;
    const el = document.createElement('div');
    el.className = 'chat-message ' + (isMe ? 'me' : 'them');

    const time = msg.ts && msg.ts.toMillis
      ? new Date(msg.ts.toMillis())
      : new Date(msg.ts || Date.now());

    const timeStr = time.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    });

    el.innerHTML = `
      <div class="cm-bubble">
        <div>${escapeHtmlChat(msg.text || '')}</div>
        <div class="cm-time">${timeStr}</div>
      </div>
    `;

    container.appendChild(el);
  });

  /* تمرير لآخر رسالة */
  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 50);
}

async function sendChatMessage(){
  if(!Cloud.user || !Cloud.db || !_chatFriend) return;

  const input = document.getElementById('chat-input');
  const text = input ? input.value.trim() : '';
  if(!text) return;

  const myUid = Cloud.user.uid;
  const friendUid = _chatFriend.uid || _chatFriend.fromUid;
  const chatId = [myUid, friendUid].sort().join('_');

  /* مسح فوري */
  if(input){
    input.value = '';
    input.dispatchEvent(new Event('input'));
  }

  try {
    await Cloud.db.collection('chats').doc(chatId)
      .collection('messages').add({
        from: myUid,
        to: friendUid,
        text: text.slice(0, 200),
        ts: firebase.firestore.FieldValue.serverTimestamp()
      });

    Sfx.play(880, 0.08, 'sine', 0.03, 1320);
    haptic(6);
  } catch(e){
    console.warn('[Chat] Send failed:', e);
    Toast.error('فشل الإرسال', e.message);
  }
}

function escapeHtmlChat(s){
  return String(s || '').replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[c]));
}

/* ============================================================
   ═══════════════ DIRECT CHALLENGE ══════════════════════════
   ============================================================ */

function openDirectChallenge(friend){
  _directChallengeFriend = friend;

  /* معاينة الصديق */
  const preview = document.getElementById('dch-friend-preview');
  if(preview){
    const name = friend.username || (friend.profile && friend.profile.username) || 'صديق';
    preview.innerHTML = `
      <div class="fpa">${name.charAt(0).toUpperCase()}</div>
      <div class="fpi">
        <div class="fpn">${escapeHtmlChat(name)}</div>
        <div class="fps">جاهز للمبارزة</div>
      </div>
    `;
  }

  /* ربط الجولات */
  document.querySelectorAll('.dch-round').forEach(btn => {
    if(btn._bound) return;
    btn._bound = true;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dch-round').forEach(b =>
        b.classList.toggle('active', b === btn));
      _directChallengeRounds = parseInt(btn.dataset.rounds, 10);
      Sfx.tap();
    });
  });

  /* إرسال */
  const sendBtn = document.getElementById('dch-send');
  if(sendBtn && !sendBtn._bound){
    sendBtn._bound = true;
    sendBtn.addEventListener('click', sendDirectChallenge);
  }

  /* إلغاء */
  const cancelBtn = document.getElementById('dch-cancel');
  if(cancelBtn && !cancelBtn._bound){
    cancelBtn._bound = true;
    cancelBtn.addEventListener('click', () => showScreen('s-chat'));
  }

  showScreen('s-direct-challenge');
}

async function sendDirectChallenge(){
  if(!Cloud.user || !Cloud.db || !_directChallengeFriend) return;

  const uid = Cloud.user.uid;
  const targetUid = _directChallengeFriend.uid || _directChallengeFriend.fromUid;

  try {
    /* إرسال الدعوة */
    const code = generateChallengeCode();

    await Cloud.db.collection('challenges').add({
      fromUid: uid,
      fromName: (Cloud.profile && Cloud.profile.username) || 'لاعب',
      toUid: targetUid,
      rounds: _directChallengeRounds,
      code,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    Toast.success('تم إرسال التحدي!', 'بانتظار قبول الصديق');

    /* رسالة في الدردشة */
    const chatId = [uid, targetUid].sort().join('_');
    await Cloud.db.collection('chats').doc(chatId)
      .collection('messages').add({
        from: uid,
        to: targetUid,
        text: `⚔️ أرسل لك تحدياً (${_directChallengeRounds} جولات)`,
        ts: firebase.firestore.FieldValue.serverTimestamp(),
        system: true
      }).catch(() => {});

    Sfx.reward(); haptic(20);
    showScreen('s-chat');

  } catch(e){
    console.warn('[DirectChallenge] Failed:', e);
    Toast.error('فشل الإرسال', e.message);
  }
}

function generateChallengeCode(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for(let i = 0; i < 6; i++){
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/* ============================================================
   ═══════════════ REFERRAL SYSTEM ═══════════════════════════
   ============================================================ */

function buildReferralPage(){
  const uid = (Cloud.user && Cloud.user.uid) || 'LOCAL000';

  /* كود الإحالة */
  const codeEl = document.getElementById('ref-code');
  if(codeEl){
    const code = 'SHIFT-' + uid.slice(0, 6).toUpperCase();
    codeEl.textContent = code;
  }

  /* زر النسخ */
  const copyBtn = document.getElementById('ref-copy');
  if(copyBtn && !copyBtn._bound){
    copyBtn._bound = true;
    copyBtn.addEventListener('click', () => {
      const code = codeEl ? codeEl.textContent : '';
      if(navigator.clipboard){
        navigator.clipboard.writeText(code).then(() => {
          Toast.success('تم نسخ الكود!', code);
        }).catch(() => {
          Toast.info('الكود', code);
        });
      }
    });
  }

  /* زر المشاركة */
  const shareBtn = document.getElementById('ref-share');
  if(shareBtn && !shareBtn._bound){
    shareBtn._bound = true;
    shareBtn.addEventListener('click', () => {
      const code = codeEl ? codeEl.textContent : '';
      const text = `العب SHIFT معي! استخدم كودي: ${code}\n${location.href}`;
      if(navigator.share){
        navigator.share({
          title: 'العب SHIFT',
          text: 'استخدم كود الإحالة: ' + code,
          url: location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(text).then(() => {
          Toast.success('تم النسخ!', 'شاركه مع أصدقائك');
        });
      }
    });
  }

  /* قائمة المكافآت */
  renderReferralMilestones();
  loadReferrals();
}

function renderReferralMilestones(){
  const container = document.getElementById('ref-milestones');
  if(!container) return;

  const referralCount = Save.data.referralCount || 0;
  const claimed = Save.data.claimedReferrals || [];

  container.innerHTML = '';

  REFERRAL_MILESTONES.forEach((ms, idx) => {
    const isUnlocked = referralCount >= ms.count;
    const isClaimed = claimed.includes(idx);

    const el = document.createElement('div');
    el.className = 'ref-ms-card' +
      (isUnlocked ? ' unlocked' : '') +
      (isClaimed ? ' claimed' : '');

    el.innerHTML = `
      <div class="rms-icon">${ms.icon}</div>
      <div class="rms-info">
        <div class="rms-title">${ms.title}</div>
        <div class="rms-sub">${ms.desc} · ${referralCount}/${ms.count}</div>
      </div>
      <div class="rms-reward">◆ ${ms.reward}</div>
      ${isUnlocked && !isClaimed
        ? `<button class="rms-claim" data-ms="${idx}">استلام</button>`
        : isClaimed
          ? `<span style="color:var(--sage);font-size:14px;font-weight:700;">✓</span>`
          : `<span style="color:var(--ink-mute);font-size:11px;">🔒</span>`
      }
    `;

    const btn = el.querySelector('[data-ms]');
    if(btn){
      btn.addEventListener('click', () => {
        const idxNum = parseInt(btn.dataset.ms, 10);
        if((Save.data.claimedReferrals || []).includes(idxNum)) return;

        Save.data.coins += ms.reward;
        Save.data.stats.totalCoins += ms.reward;
        if(!Save.data.claimedReferrals) Save.data.claimedReferrals = [];
        Save.data.claimedReferrals.push(idxNum);
        Save.save();

        updateCoinsUI();
        Sfx.reward(); haptic(25);
        Toast.reward('🎁', 'مكافأة إحالة!', '◆ +' + ms.reward);
        renderReferralMilestones();
      });
    }

    container.appendChild(el);
  });
}

async function loadReferrals(){
  const container = document.getElementById('ref-list');
  if(!container) return;

  if(!Cloud.user || !Cloud.db){
    container.innerHTML = `
      <div class="ref-empty">
        <div class="re-icon">👥</div>
        <div class="re-title">يجب تسجيل الدخول</div>
      </div>
    `;
    return;
  }

  const uid = Cloud.user.uid;

  try {
    const snap = await Cloud.db.collection('players')
      .where('referredBy', '==', uid)
      .limit(50)
      .get()
      .catch(() => null);

    if(!snap || snap.empty){
      container.innerHTML = `
        <div class="ref-empty">
          <div class="re-icon">👥</div>
          <div class="re-title">لا أحد بعد</div>
          <div class="re-desc">شارك كودك لتبدأ الكسب</div>
        </div>
      `;

      /* تحديث العدّاد */
      Save.data.referralCount = 0;
      Save.save();
      return;
    }

    const count = snap.size;
    Save.data.referralCount = count;
    Save.save();

    container.innerHTML = '';
    snap.forEach(doc => {
      const data = doc.data();
      const name = data.username || 'لاعب';

      const el = document.createElement('div');
      el.className = 'ref-list-item';
      el.innerHTML = `
        <div class="rli-avatar">${name.charAt(0).toUpperCase()}</div>
        <div class="rli-info">
          <div class="rli-name">${escapeHtmlChat(name)}</div>
          <div class="rli-date">انضم حديثاً</div>
        </div>
        <span style="color:var(--sage);font-size:16px;">✓</span>
      `;
      container.appendChild(el);
    });

    renderReferralMilestones();

  } catch(e){
    console.warn('[Referral] Load failed:', e);
  }
}

/* ═══ حفظ كود الإحالة عند التسجيل ═══ */
async function applyReferralCode(code){
  if(!Cloud.user || !Cloud.db) return false;
  if(!code) return false;

  const uid = Cloud.user.uid;

  try {
    /* منع التطبيق أكثر من مرة */
    const meRef = Cloud.db.collection('players').doc(uid);
    const meSnap = await meRef.get();
    if(meSnap.exists && meSnap.data().referredBy){
      return false;
    }

    /* استخراج UID من الكود */
    const targetUidShort = code.replace('SHIFT-', '').toLowerCase();

    /* البحث عن اللاعب صاحب الكود */
    const snap = await Cloud.db.collection('players').limit(100).get();
    let referrerUid = null;
    snap.forEach(doc => {
      if(doc.id.toLowerCase().startsWith(targetUidShort)){
        referrerUid = doc.id;
      }
    });

    if(!referrerUid || referrerUid === uid) return false;

    /* حفظ الإحالة */
    await meRef.update({
      referredBy: referrerUid,
      referredAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    /* مكافأة الإحالة (للطرفين) */
    Save.data.coins += 100;
    Save.save();

    Toast.success('تم تطبيق كود الإحالة!', '◆ +100');
    return true;

  } catch(e){
    console.warn('[Referral] Apply failed:', e);
    return false;
  }
}

/* ============================================================
   ═══════════════ CLANS SYSTEM ══════════════════════════════
   ============================================================ */

function buildClanPage(){
  const tabs = document.querySelectorAll('.clan-tab');
  tabs.forEach(tab => {
    if(tab._bound) return;
    tab._bound = true;
    tab.addEventListener('click', () => {
      _clanTab = tab.dataset.clantab;
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      renderClanContent();
      Sfx.tap();
    });
  });

  loadMyClan();
  renderClanContent();
}

async function loadMyClan(){
  if(!Cloud.user || !Cloud.db) return;

  const uid = Cloud.user.uid;

  try {
    const meSnap = await Cloud.db.collection('players').doc(uid).get();
    if(!meSnap.exists) return;

    const clanId = meSnap.data().clanId;
    if(!clanId){
      _myClan = null;
      return;
    }

    /* جلب الفريق */
    const clanSnap = await Cloud.db.collection('clans').doc(clanId).get();
    if(!clanSnap.exists){
      _myClan = null;
      return;
    }

    _myClan = { id: clanId, ...clanSnap.data() };

    /* جلب الأعضاء */
    const membersSnap = await Cloud.db.collection('clans').doc(clanId)
      .collection('members').limit(30).get().catch(() => null);

    if(membersSnap){
      _myClan.members = [];
      membersSnap.forEach(doc => {
        _myClan.members.push({ uid: doc.id, ...doc.data() });
      });
    }

  } catch(e){
    console.warn('[Clan] Load failed:', e);
  }
}

function renderClanContent(){
  const container = document.getElementById('clan-content');
  if(!container) return;
  container.innerHTML = '';

  if(_clanTab === 'my'){
    renderMyClan(container);
  } else if(_clanTab === 'browse'){
    renderBrowseClans(container);
  } else if(_clanTab === 'top'){
    renderTopClans(container);
  }
}

function renderMyClan(container){
  if(!_myClan){
    container.innerHTML = `
      <div class="clan-no-clan">
        <div class="cnc-icon">🛡️</div>
        <div class="cnc-title">لا فريق لك بعد</div>
        <div class="cnc-desc">انشئ فريقك أو انضم لفريق موجود للتنافس مع اللاعبين</div>
        <div class="cnc-actions">
          <button class="action-btn gold" id="clan-create-btn" style="max-width:180px;">
            🛡️ &nbsp; إنشاء فريق
          </button>
          <button class="action-btn soft" id="clan-browse-btn" style="max-width:180px;">
            🔍 &nbsp; تصفح الفرق
          </button>
        </div>
      </div>
    `;

    const createBtn = container.querySelector('#clan-create-btn');
    if(createBtn) createBtn.addEventListener('click', () => {
      buildCreateClanPage();
      showScreen('s-create-clan');
    });

    const browseBtn = container.querySelector('#clan-browse-btn');
    if(browseBtn) browseBtn.addEventListener('click', () => {
      _clanTab = 'browse';
      document.querySelectorAll('.clan-tab').forEach(t =>
        t.classList.toggle('active', t.dataset.clantab === 'browse'));
      renderClanContent();
    });

    return;
  }

  /* بطاقة الفريق */
  const totalScore = (_myClan.members || []).reduce((sum, m) => sum + (m.score || 0), 0);

  const card = document.createElement('div');
  card.className = 'clan-card-hero';
  card.style.background = `linear-gradient(135deg, ${_myClan.color} 0%, ${_myClan.color}DD 100%)`;

  card.innerHTML = `
    <div class="cch-header">
      <div class="cch-emblem">${_myClan.emblem}</div>
      <div class="cch-info">
        <div class="cch-name">${escapeHtmlChat(_myClan.name)}</div>
        <div class="cch-tag">CLAN</div>
      </div>
    </div>
    ${_myClan.desc ? `<div class="cch-desc">${escapeHtmlChat(_myClan.desc)}</div>` : ''}
    <div class="cch-stats">
      <div class="cch-stat">
        <div class="k">أعضاء</div>
        <div class="v">${(_myClan.members || []).length}/${CLAN_MAX_MEMBERS}</div>
      </div>
      <div class="cch-stat">
        <div class="k">النقاط</div>
        <div class="v">${totalScore.toLocaleString()}</div>
      </div>
      <div class="cch-stat">
        <div class="k">المستوى</div>
        <div class="v">${Math.floor(totalScore / 5000) + 1}</div>
      </div>
    </div>
  `;

  container.appendChild(card);

  /* قائمة الأعضاء */
  const head = document.createElement('div');
  head.className = 'admin-section-head';
  head.innerHTML = `
    <div class="admin-section-title">الأعضاء</div>
    <div class="admin-section-sub">MEMBERS</div>
  `;
  container.appendChild(head);

  const list = document.createElement('div');
  list.className = 'clan-members-list';

  (_myClan.members || []).forEach(member => {
    const memberName = member.name || 'عضو';
    const isLeader = member.uid === _myClan.ownerUid;
    const role = isLeader ? 'زعيم' : (member.role === 'officer' ? 'ضابط' : 'عضو');
    const roleClass = isLeader ? 'leader' : (member.role === 'officer' ? 'officer' : '');

    const el = document.createElement('div');
    el.className = 'clan-member' + (isLeader ? ' leader' : '');

    el.innerHTML = `
      <div class="cm-avatar">${memberName.charAt(0).toUpperCase()}</div>
      <div class="cm-info">
        <div class="cm-name">${escapeHtmlChat(memberName)}${member.uid === Cloud.user.uid ? ' (أنت)' : ''}</div>
        <div class="cm-role ${roleClass}">${isLeader ? '👑 ' : ''}${role}</div>
      </div>
      <div class="cm-score">◆ ${(member.score || 0).toLocaleString()}</div>
    `;

    list.appendChild(el);
  });

  container.appendChild(list);

  /* زر الخروج */
  const actions = document.createElement('div');
  actions.style.cssText = 'margin-top:20px;display:flex;flex-direction:column;gap:8px;';

  const leaveBtn = document.createElement('button');
  leaveBtn.className = 'action-btn soft';
  leaveBtn.style.color = '#C14A4A';
  leaveBtn.textContent = '🚪 مغادرة الفريق';
  leaveBtn.addEventListener('click', leaveClan);

  actions.appendChild(leaveBtn);
  container.appendChild(actions);
}

async function renderBrowseClans(container){
  container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--ink-mute);">⏳ جارٍ التحميل...</div>';

  if(!Cloud.db){
    container.innerHTML = '<div style="text-align:center;padding:40px;color:#C14A4A;">غير متصل</div>';
    return;
  }

  try {
    const snap = await Cloud.db.collection('clans')
      .where('privacy', '==', 'open')
      .limit(30)
      .get()
      .catch(() => null);

    if(!snap || snap.empty){
      container.innerHTML = `
        <div class="clan-no-clan">
          <div class="cnc-icon">🔍</div>
          <div class="cnc-title">لا توجد فرق مفتوحة</div>
          <div class="cnc-desc">كن أول من ينشئ فريقاً!</div>
        </div>
      `;
      return;
    }

    container.innerHTML = '';

    snap.forEach(doc => {
      const clan = { id: doc.id, ...doc.data() };
      const el = buildClanListItem(clan);
      container.appendChild(el);
    });

  } catch(e){
    container.innerHTML = `<div style="text-align:center;padding:40px;color:#C14A4A;">فشل: ${e.message}</div>`;
  }
}

async function renderTopClans(container){
  container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--ink-mute);">⏳ جارٍ التحميل...</div>';

  if(!Cloud.db){
    container.innerHTML = '<div style="text-align:center;padding:40px;color:#C14A4A;">غير متصل</div>';
    return;
  }

  try {
    const snap = await Cloud.db.collection('clans')
      .orderBy('totalScore', 'desc')
      .limit(20)
      .get()
      .catch(() => null);

    if(!snap || snap.empty){
      container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--ink-mute);">لا توجد فرق</div>';
      return;
    }

    container.innerHTML = '';

    let rank = 1;
    snap.forEach(doc => {
      const clan = { id: doc.id, ...doc.data() };
      const el = buildClanListItem(clan, rank);
      container.appendChild(el);
      rank++;
    });

  } catch(e){
    container.innerHTML = `<div style="text-align:center;padding:40px;color:#C14A4A;">فشل: ${e.message}</div>`;
  }
}

function buildClanListItem(clan, rank){
  const el = document.createElement('div');
  el.className = 'clan-list-item';

  const privacyBadge = clan.privacy === 'open'
    ? '<span class="cli-badge open">مفتوح</span>'
    : '<span class="cli-badge invite">بالدعوة</span>';

  el.innerHTML = `
    <div class="cli-emblem" style="background:${clan.color || '#4A88C8'};color:#fff;">
      ${clan.emblem || '🛡️'}
    </div>
    <div class="cli-info">
      <div class="cli-name">${escapeHtmlChat(clan.name)}</div>
      <div class="cli-meta">
        ${privacyBadge}
        <span>👥 ${clan.memberCount || 0}/${CLAN_MAX_MEMBERS}</span>
      </div>
    </div>
    ${rank ? `<div style="font-family:'Space Grotesk';font-size:14px;font-weight:700;color:var(--ink-mute);margin-left:4px;">#${rank}</div>` : ''}
    <div class="cli-score">${(clan.totalScore || 0).toLocaleString()}</div>
  `;

  el.addEventListener('click', () => openClanDetails(clan));
  return el;
}

async function openClanDetails(clan){
  /* نسخة مبسطة — عرض معلومات + خيار الانضمام */
  const preview = confirm(
    `🛡️ ${clan.name}\n` +
    (clan.desc ? `\n${clan.desc}\n` : '') +
    `\n👥 الأعضاء: ${clan.memberCount || 0}/${CLAN_MAX_MEMBERS}` +
    `\n💰 النقاط: ${(clan.totalScore || 0).toLocaleString()}` +
    `\n\nهل تريد الانضمام؟`
  );

  if(preview) joinClan(clan);
}

async function joinClan(clan){
  if(!Cloud.user || !Cloud.db) return;

  if(_myClan){
    Toast.warning('أنت في فريق بالفعل', '');
    return;
  }

  if(clan.privacy !== 'open'){
    Toast.warning('هذا الفريق بالدعوة فقط');
    return;
  }

  if((clan.memberCount || 0) >= CLAN_MAX_MEMBERS){
    Toast.error('الفريق ممتلئ');
    return;
  }

  try {
    const uid = Cloud.user.uid;
    const name = (Cloud.profile && Cloud.profile.username) || 'لاعب';

    /* إضافة العضو */
    await Cloud.db.collection('clans').doc(clan.id)
      .collection('members').doc(uid).set({
        uid,
        name,
        role: 'member',
        score: 0,
        joinedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

    /* تحديث العدّاد */
    await Cloud.db.collection('clans').doc(clan.id).update({
      memberCount: firebase.firestore.FieldValue.increment(1)
    });

    /* تحديث اللاعب */
    await Cloud.db.collection('players').doc(uid).update({
      clanId: clan.id
    });

    Toast.success('انضممت للفريق!', clan.name);
    Sfx.reward(); haptic(30);

    await loadMyClan();
    _clanTab = 'my';
    document.querySelectorAll('.clan-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.clantab === 'my'));
    renderClanContent();

  } catch(e){
    console.warn('[Clan] Join failed:', e);
    Toast.error('فشل الانضمام', e.message);
  }
}

async function leaveClan(){
  if(!_myClan) return;
  if(_myClan.ownerUid === Cloud.user.uid){
    Toast.warning('لا يمكن للزعيم المغادرة', 'انقل الزعامة أولاً');
    return;
  }
  if(!confirm('مغادرة الفريق؟')) return;

  try {
    const uid = Cloud.user.uid;

    await Cloud.db.collection('clans').doc(_myClan.id)
      .collection('members').doc(uid).delete();

    await Cloud.db.collection('clans').doc(_myClan.id).update({
      memberCount: firebase.firestore.FieldValue.increment(-1)
    });

    await Cloud.db.collection('players').doc(uid).update({
      clanId: firebase.firestore.FieldValue.delete()
    });

    Toast.success('غادرت الفريق');
    _myClan = null;
    renderClanContent();

  } catch(e){
    Toast.error('فشل', e.message);
  }
}

/* ============================================================
   ═══════════════ CREATE CLAN ═══════════════════════════════
   ============================================================ */

function buildCreateClanPage(){
  /* إيموجي */
  const emblemGrid = document.getElementById('clan-emblem-grid');
  if(emblemGrid && !emblemGrid._built){
    emblemGrid._built = true;
    emblemGrid.innerHTML = CLAN_EMBLEMS.map((e, i) =>
      `<button class="clan-emblem-btn ${i === 0 ? 'active' : ''}" data-emblem="${e}">${e}</button>`
    ).join('');

    emblemGrid.querySelectorAll('.clan-emblem-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        emblemGrid.querySelectorAll('.clan-emblem-btn').forEach(b =>
          b.classList.toggle('active', b === btn));
        _pendingClanEmblem = btn.dataset.emblem;
      });
    });
  }

  /* ألوان */
  const colorGrid = document.getElementById('clan-color-grid');
  if(colorGrid && !colorGrid._built){
    colorGrid._built = true;
    colorGrid.innerHTML = CLAN_COLORS.map((c, i) =>
      `<button class="clan-color-btn ${i === 0 ? 'active' : ''}" data-color="${c}" style="background:${c};"></button>`
    ).join('');

    colorGrid.querySelectorAll('.clan-color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        colorGrid.querySelectorAll('.clan-color-btn').forEach(b =>
          b.classList.toggle('active', b === btn));
        _pendingClanColor = btn.dataset.color;
      });
    });
  }

  /* الخصوصية */
  document.querySelectorAll('.clan-privacy-btn').forEach(btn => {
    if(btn._bound) return;
    btn._bound = true;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.clan-privacy-btn').forEach(b =>
        b.classList.toggle('active', b === btn));
      _pendingClanPrivacy = btn.dataset.privacy;
    });
  });

  /* التحقق من الاسم */
  const nameInput = document.getElementById('clan-name');
  const submitBtn = document.getElementById('clan-create-submit');
  const statusEl = document.getElementById('clan-create-status');

  if(nameInput && !nameInput._bound){
    nameInput._bound = true;
    nameInput.addEventListener('input', () => {
      const v = nameInput.value.trim();
      if(v.length < 3){
        if(statusEl){
          statusEl.textContent = v.length === 0 ? '' : 'الاسم قصير جداً';
          statusEl.className = 'af-status err';
        }
        submitBtn.disabled = true;
        return;
      }
      if(statusEl){
        statusEl.textContent = '✓ الاسم صالح';
        statusEl.className = 'af-status ok';
      }
      submitBtn.disabled = false;
    });
  }

  if(submitBtn && !submitBtn._bound){
    submitBtn._bound = true;
    submitBtn.addEventListener('click', createClan);
  }
}

async function createClan(){
  if(!Cloud.user || !Cloud.db){
    Toast.error('يجب تسجيل الدخول');
    return;
  }

  if(_myClan){
    Toast.warning('أنت في فريق بالفعل');
    return;
  }

  const nameInput = document.getElementById('clan-name');
  const descInput = document.getElementById('clan-desc');
  const name = nameInput ? nameInput.value.trim() : '';

  if(name.length < 3){
    Toast.warning('الاسم قصير جداً');
    return;
  }

  /* فحص الرصيد */
  const unlimited = hasAdminAccess() && Save.data.admin.unlimitedCoins;
  if(!unlimited && Save.data.coins < CLAN_COST){
    Toast.error('رصيد غير كافٍ', `تحتاج ◆ ${CLAN_COST - Save.data.coins}`);
    return;
  }

  if(!confirm(`إنشاء الفريق "${name}" بـ ◆ ${CLAN_COST}؟`)) return;

  try {
    const uid = Cloud.user.uid;
    const myName = (Cloud.profile && Cloud.profile.username) || 'لاعب';

    /* خصم التكلفة */
    if(!unlimited) Save.data.coins -= CLAN_COST;
    Save.save();
    updateCoinsUI();

    /* إنشاء الفريق */
    const clanRef = await Cloud.db.collection('clans').add({
      name,
      desc: descInput ? descInput.value.trim().slice(0, 60) : '',
      emblem: _pendingClanEmblem,
      color: _pendingClanColor,
      privacy: _pendingClanPrivacy,
      ownerUid: uid,
      memberCount: 1,
      totalScore: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    /* إضافة الزعيم كعضو */
    await clanRef.collection('members').doc(uid).set({
      uid,
      name: myName,
      role: 'leader',
      score: 0,
      joinedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    /* ربط اللاعب */
    await Cloud.db.collection('players').doc(uid).update({
      clanId: clanRef.id
    });

    Toast.reward('🛡️', 'تم إنشاء الفريق!', name, { duration: 5000 });
    Sfx.reward(); haptic(40);

    /* احتفال */
    for(let i = 0; i < 30; i++){
      const a = (i / 30) * Math.PI * 2;
      particles.push({
        x: P.x, y: P.y,
        vx: Math.cos(a) * rand(4, 9),
        vy: Math.sin(a) * rand(4, 9),
        life: 1.4, decay: 0.018,
        color: _pendingClanColor,
        size: rand(3, 6)
      });
    }

    await loadMyClan();
    _clanTab = 'my';
    showScreen('s-clan');
    document.querySelectorAll('.clan-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.clantab === 'my'));
    renderClanContent();

  } catch(e){
    console.warn('[Clan] Create failed:', e);
    Toast.error('فشل الإنشاء', e.message);
  }
}

/* ============================================================
   ═══════════════ INTEGRATION HOOKS ═════════════════════════
   ============================================================ */

/* ═══ Hook على showScreen ═══ */
(function hookScreensV26(){
  const origShowScreen = window.showScreen;
  if(typeof origShowScreen !== 'function') return;

  window.showScreen = function(id){
    const result = origShowScreen.apply(this, arguments);

    if(id === 's-referral'){
      setTimeout(() => {
        try { buildReferralPage(); } catch(e){ console.warn('[Referral]', e); }
      }, 80);
    }

    if(id === 's-clan'){
      setTimeout(() => {
        try { buildClanPage(); } catch(e){ console.warn('[Clan]', e); }
      }, 80);
    }

    if(id === 's-create-clan'){
      setTimeout(() => {
        try { buildCreateClanPage(); } catch(e){ console.warn('[CreateClan]', e); }
      }, 80);
    }

    return result;
  };
})();

/* ═══ Hook على buildFriendsV2 — إضافة أزرار المحادثة ═══ */
(function hookFriendCardActions(){
  /* interceptor للحدث على friend cards */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.fc2-btn');
    if(!btn) return;
    const action = btn.dataset.action;
    if(action !== 'chat' && action !== 'challenge') return;

    e.stopPropagation();

    const card = btn.closest('.friend-card-v2');
    if(!card) return;

    /* استخراج بيانات الصديق */
    const friendUid = card.dataset.friendUid;
    if(!friendUid) return;

    const friend = _friends.find(f => f.uid === friendUid) ||
                   _recentPlayers.find(f => f.uid === friendUid);
    if(!friend) return;

    if(action === 'chat'){
      openChatWithFriend(friend);
    } else if(action === 'challenge'){
      openDirectChallenge(friend);
    }
  });
})();

/* ═══ إضافة زرين للـ friend card ═══ */
(function patchBuildFriendCard(){
  const origBuildFriendCard = window.buildFriendCard;
  if(typeof origBuildFriendCard !== 'function') return;
  /* سنترك البناء الأصلي ونضيف البيانات عبر CSS selector */
})();

/* ═══ حقن أزرار المحادثة في بطاقات الأصدقاء ═══ */
(function enhanceFriendCards(){
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if(node.nodeType !== 1) return;
        if(node.classList && node.classList.contains('friend-card-v2')){
          enhanceSingleFriendCard(node);
        }
        /* بحث في الأبناء */
        if(node.querySelectorAll){
          node.querySelectorAll('.friend-card-v2').forEach(enhanceSingleFriendCard);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  function enhanceSingleFriendCard(card){
    if(card._enhanced) return;
    card._enhanced = true;

    const actions = card.querySelector('.fc2-actions');
    if(!actions) return;

    /* لا نضيف إن كان الطلب */
    if(card.querySelector('[data-action="accept"]')) return;

    /* إضافة أزرار الدردشة والتحدي قبل زر "المزيد" */
    const moreBtn = actions.querySelector('[data-action="more"]');
    if(moreBtn){
      const chatBtn = document.createElement('button');
      chatBtn.className = 'fc2-btn ghost';
      chatBtn.dataset.action = 'chat';
      chatBtn.title = 'محادثة';
      chatBtn.textContent = '💬';

      const challengeBtn = document.createElement('button');
      challengeBtn.className = 'fc2-btn success';
      challengeBtn.dataset.action = 'challenge';
      challengeBtn.title = 'تحدي';
      challengeBtn.textContent = '⚔️';

      actions.insertBefore(challengeBtn, moreBtn);
      actions.insertBefore(chatBtn, moreBtn);
    }
  }
})();

/* ═══ إضافة زرّي الإحالة والفرق إلى hscroll-actions ═══ */
(function patchHomeActions(){
  const origBuildHomeV2 = window.buildHomeV2;
  if(typeof origBuildHomeV2 !== 'function') return;

  window.buildHomeV2 = function(){
    const result = origBuildHomeV2.apply(this, arguments);

    /* ربط أزرار الإحالة والفرق */
    setTimeout(() => {
      document.querySelectorAll('.hs-action[data-page="referral"], .hs-action[data-page="clan"]').forEach(btn => {
        if(btn._bound) return;
        btn._bound = true;
        btn.addEventListener('click', () => {
          const page = btn.dataset.page;
          Sfx.tap(); haptic(6);
          if(page === 'referral') showScreen('s-referral');
          else if(page === 'clan') showScreen('s-clan');
        });
      });
    }, 100);

    return result;
  };
})();

/* ═══ دعم كود الإحالة من URL ═══ */
(function checkReferralFromURL(){
  try {
    const params = new URLSearchParams(location.search);
    const refCode = params.get('ref');
    if(!refCode) return;

    /* نحفظه لاستخدامه بعد تسجيل الدخول */
    sessionStorage.setItem('pending_ref_code', refCode);

    /* نحاول تطبيقه إذا كنا مسجلين */
    if(Cloud.user){
      applyReferralCode(refCode).then(applied => {
        if(applied){
          sessionStorage.removeItem('pending_ref_code');
        }
      });
    }
  } catch(e){}
})();

/* ═══ Hook على mergeAndGoHome — تطبيق كود الإحالة ═══ */
(function hookMergeAndGoHome(){
  const origMergeAndGoHome = window.mergeAndGoHome;
  if(typeof origMergeAndGoHome !== 'function') return;

  window.mergeAndGoHome = async function(){
    const result = await origMergeAndGoHome.apply(this, arguments);

    /* تطبيق كود الإحالة المعلّق */
    setTimeout(async () => {
      const refCode = sessionStorage.getItem('pending_ref_code');
      if(refCode){
        const applied = await applyReferralCode(refCode);
        if(applied){
          sessionStorage.removeItem('pending_ref_code');
        }
      }
    }, 500);

    return result;
  };
})();

/* ============================================================
   ═══════════════ INIT ══════════════════════════════════════
   ============================================================ */

(function initV26(){
  console.log('[SHIFT v2.6] ✅ Chat · Referral · Clans · DirectChallenge loaded');
})();

/* ═══ تصدير ═══ */
window.openChatWithFriend = openChatWithFriend;
window.openDirectChallenge = openDirectChallenge;
window.buildReferralPage = buildReferralPage;
window.buildClanPage = buildClanPage;
window.buildCreateClanPage = buildCreateClanPage;
window.applyReferralCode = applyReferralCode;

/* ============================================================
   ==================== BOOT =================================
   ============================================================ */
function boot() {
  resize();
  G.currentScene = SCENES[0];
  initClouds();

  /* اختيار النمط */
  G.selectedMode = Save.data.mode || 'FLIP';
  G.isMixedMode = (G.selectedMode === 'MIXED');

  /* ترحيل الأنماط القديمة */
  if(G.selectedMode === 'FLIP_WALK' || G.selectedMode === 'SKY_JUMP'){
    G.selectedMode = 'WALK';
    Save.data.mode = 'WALK';
    Save.save();
  }

  /* ضبط G.mode للفيزياء */
  if(G.isMixedMode){
    G.mode = 'FLIP';   /* يبدأ عشوائياً عند resetRun */
  } else {
    G.mode = G.selectedMode;
  }

_lastContextKey = '';
const cb = document.getElementById('context-banner');
if(cb) cb.classList.remove('show');
const gg = document.getElementById('altitude-gauge');
if(gg) gg.classList.remove('show');

  ensureMissions();
  buildHome();
  updateCoinsUI();
  updateAchBadge();
  updatePowerupsUI();
  setInGame(false);
  P.x = W * 0.5;
  P.y = H * 0.5;

initSkyDecor();

/* ✅ بناء بركة مناطق المؤشر */
ensureGaugeZonePool();

/* تهيئة نظام المصادر */
PLACEMENT_TYPES = buildPlacementTypes();

wireGameButtons();
wireAdminPanel();
mpInit();
// ✅ تحقق دوري من حالة الاتصال
setInterval(() => {
  if(!MP.active) return;
  const stale = Date.now() - MP.lastSyncAt > 3000;
  MP.connectionState = stale ? 'reconnecting' : 'connected';
  mpUpdateConnectionBadge();
}, 2000);
applyAdminEffects();
updateAdminUI();

  let firebaseOk = false;
  try {
    firebaseOk = Cloud.init();
  } catch (e) {
    console.warn('[Cloud] Init crashed:', e);
    firebaseOk = false;
  }

/* ✅ تحميل مسبق لأصول اللاعب الحالية */
setTimeout(() => {
  if(typeof ASSET !== 'undefined' && ASSET.preloadPlayerAssets){
    ASSET.preloadPlayerAssets().then(r => {
      console.log('[Boot] Assets preloaded:', r);
    }).catch(e => {
      console.warn('[Boot] Preload failed:', e);
    });
  }
}, 500);

  if (!firebaseOk) {
    Cloud.setState('offline');
    updateProfileUI();
    showScreen('s-home');
    buildHome();
    requestAnimationFrame(loop);
    return;
  }

  setupAuthWiring();
  setupAuthListener();
  showScreen('s-login');
  requestAnimationFrame(loop);
}

function launch() {
  try {
    boot();
  } catch (e) {
    console.error('[Boot] Failed:', e);
    try {
      showScreen('s-home');
      requestAnimationFrame(loop);
    } catch(e2) {}
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', launch);
} else {
  launch();
}