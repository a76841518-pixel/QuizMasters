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
function buildInventory(){
  const grid = document.getElementById('inv-grid');
  const header = document.getElementById('inv-header');
  if(!grid) return;

  /* ✅ كل الفئات */
  const cats = [
    'spark','eyes','companion','footstep','trail','jump','death','aura','crown','cape',
    /* ✨ جديدة */
    'headItem','backItem','heldItem','groundMark',
    'nameTag','badge','avatarFrame','banner',
    'spawnEffect','reviveEffect','hitEffect'
  ];

  const totalSkins = getAllSkins().length;
  const ownedSkins = Save.data.ownedSkins.length;
  let totalCos = 0, ownedCos = 0;
  for(const cat of cats){
    totalCos += getAllCosmetics(cat).length;
    ownedCos += ((Save.data.cosmetics.owned[cat] || []).length);
  }

  if(header){
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
        <div class="v">${Save.data.coins}</div>
      </div>
    `;
  }

  grid.innerHTML = '';

  /* عرض الأزياء المملوكة */
  const allSkins = getAllSkins();
  allSkins.filter(s => Save.data.ownedSkins.includes(s.id)).forEach(skin => {
    const el = document.createElement('div');
    el.className = 'inv-item';
    el.style.setProperty('--rar', `var(--r-${skin.rarity || 'common'})`);

    const img = resolveImageSrc(skin);
    const thumb = img
      ? `<img src="${img}" alt="">`
      : `<div style="width:100%;height:100%;background:${skin.body || '#E07A3F'};display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;font-weight:800;">${(skin.ar||'?').charAt(0)}</div>`;

    el.innerHTML = `
      <div class="inv-thumb">${thumb}</div>
      <div class="inv-name">${skin.ar}</div>
      <div class="inv-cat">SKIN · ${RARITY_LABELS[skin.rarity || 'common']}</div>
    `;
    grid.appendChild(el);
  });

  /* ✅ عرض كل التأثيرات المملوكة */
  for(const cat of cats){
    const owned = Save.data.cosmetics.owned[cat] || [];
    const all = getAllCosmetics(cat);
    for(const item of all){
      if(!owned.includes(item.id)) continue;
      const el = document.createElement('div');
      el.className = 'inv-item';

      const img = resolveImageSrc(item);
      const thumb = img
        ? `<img src="${img}" alt="">`
        : `<span style="font-size:24px;">✨</span>`;

      el.innerHTML = `
        <div class="inv-thumb">${thumb}</div>
        <div class="inv-name">${item.name}</div>
        <div class="inv-cat">${(CATEGORY_LABELS && CATEGORY_LABELS[cat]) || cat}</div>
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
   ============ الإحصائيات v2 ===============================
   ============================================================ */
function buildStatsV2(){
  const container = document.getElementById('stats-list');
  if(!container) return;

  const s = Save.data.stats;
  const totalM = getGlobalMeters();
  const glvl = getGlobalLevel() + 1;

  container.innerHTML = `
    <div class="stats-hero">
      <div class="sh-title">TOTAL DISTANCE</div>
      <div class="sh-big">
        ${Math.floor(totalM).toLocaleString()}<span class="unit">م</span>
      </div>
      <div class="sh-sub">عبر ${s.totalPlays || 0} جولة</div>
    </div>

    <div class="section-head">
      <div class="section-title">أرقام قياسية</div>
      <div class="section-sub">RECORDS</div>
    </div>
    <div class="stats-grid">
      <div class="stat-box">
        <div class="sb-icon">🏆</div>
        <div class="sb-val">${Math.floor(s.bestMeters || 0)}</div>
        <div class="sb-label">أفضل مسافة</div>
      </div>
      <div class="stat-box">
        <div class="sb-icon">🔥</div>
        <div class="sb-val">x${s.bestCombo || 0}</div>
        <div class="sb-label">أفضل سلسلة</div>
      </div>
      <div class="stat-box">
        <div class="sb-icon">🎯</div>
        <div class="sb-val">${glvl}</div>
        <div class="sb-label">المستوى العام</div>
      </div>
      <div class="stat-box">
        <div class="sb-icon">🎮</div>
        <div class="sb-val">${s.totalPlays || 0}</div>
        <div class="sb-label">إجمالي الجولات</div>
      </div>
    </div>

    <div class="section-head" style="margin-top:18px;">
      <div class="section-title">حسب النمط</div>
      <div class="section-sub">BY MODE</div>
    </div>
    <div class="stats-grid">
      ${['FLIP','FLAP','DRIFT','WALK','MIXED'].map(m => {
        const md = MODES.find(x => x.id === m);
        const best = Save.data.bestMeters[m] || 0;
        return `<div class="stat-box">
          <div class="sb-icon">${md ? md.icon : '◆'}</div>
          <div class="sb-val">${best}</div>
          <div class="sb-label">${md ? md.ar : m}</div>
        </div>`;
      }).join('')}
    </div>

    <div class="section-head" style="margin-top:18px;">
      <div class="section-title">التقدم</div>
      <div class="section-sub">PROGRESS</div>
    </div>
    <div class="stats-grid">
      <div class="stat-box">
        <div class="sb-icon">◆</div>
        <div class="sb-val">${(Save.data.coins || 0).toLocaleString()}</div>
        <div class="sb-label">مجموع العملات</div>
      </div>
      <div class="stat-box">
        <div class="sb-icon">🏅</div>
        <div class="sb-val">${(Save.data.season.points || 0).toLocaleString()}</div>
        <div class="sb-label">نقاط الموسم</div>
      </div>
      <div class="stat-box">
        <div class="sb-icon">◆</div>
        <div class="sb-val">${s.shiftRuns || 0}</div>
        <div class="sb-label">SHIFT Runs</div>
      </div>
      <div class="stat-box">
        <div class="sb-icon">🎨</div>
        <div class="sb-val">${(Save.data.ownedSkins || []).length}</div>
        <div class="sb-label">الأزياء المملوكة</div>
      </div>
    </div>
  `;
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
   ============ الباتل باس v2 (مع المطالبة) ================
   ============================================================ */
let currentBPTrack = 'free';

function buildBattlePassV2(){
  const tier = getBPTier();
  const pts = Save.data.season.points || 0;
  const nextTierPts = (tier + 1) * BP_TIER_POINTS;
  const currentTierPts = tier * BP_TIER_POINTS;
  const progInTier = clamp((pts - currentTierPts) / BP_TIER_POINTS, 0, 1);

  /* Hero */
  const hero = document.getElementById('bp-hero');
  if(hero){
    hero.innerHTML = `
      <div class="bp-hero-top">
        <div>
          <div class="bp-hero-title">BATTLE PASS</div>
          <div class="bp-hero-sub">SEASON 1 · ORIGINS</div>
        </div>
        <div class="bp-tier-badge">
          <span class="k">TIER</span>
          <span class="v">${tier}</span>
        </div>
      </div>
      <div class="bp-progress-wrap">
        <div class="bp-progress-labels">
          <span>المستوى ${tier}</span>
          <span>${pts.toLocaleString()} / ${nextTierPts.toLocaleString()}</span>
        </div>
        <div class="bp-progress-bar">
          <div class="bp-progress-fill" style="width:${progInTier * 100}%"></div>
        </div>
      </div>
    `;
  }

  /* Track toggle */
  const trackToggle = document.getElementById('bp-track-toggle');
  if(trackToggle){
    trackToggle.querySelectorAll('button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.track === currentBPTrack);
      if(btn.dataset.track === 'premium') btn.classList.add('premium');
    });
  }

  /* Tiers list */
  const list = document.getElementById('bp-tiers');
  if(!list) return;
  list.innerHTML = '';

  /* اعرض فقط 3 مستويات قبل الحالي و 7 بعده */
  const startTier = Math.max(1, tier - 2);
  const endTier = Math.min(BP_TIERS, tier + 8);

  if(startTier > 1){
    const sep = document.createElement('div');
    sep.style.cssText = 'text-align:center;padding:10px;color:var(--ink-mute);font-size:11px;font-weight:700;letter-spacing:2px;';
    sep.textContent = '··· المستويات السابقة ···';
    list.appendChild(sep);
  }

  for(let i = startTier; i <= endTier; i++){
    const unlocked = i <= tier;
    const isCurrent = i === tier;
    const claimedFree = (Save.data.battlePass.claimedFree || []).includes(i);
    const claimedPrem = (Save.data.battlePass.claimedPremium || []).includes(i);

    const freeItems = getBattlePassItems(i, 'free');
    const premItems = getBattlePassItems(i, 'premium');

    const el = document.createElement('div');
    el.className = 'bp-tier-row-v2' + 
      (unlocked ? ' unlocked' : '') + 
      (isCurrent ? ' current' : '') +
      ((currentBPTrack === 'free' && claimedFree) || (currentBPTrack === 'premium' && claimedPrem) ? ' claimed' : '');

    const coinReward = 5 + i * 2;

    /* المكافآت المعروضة حسب المسار المختار */
    let rewardHtml = '';
    if(currentBPTrack === 'free'){
      const canClaim = unlocked && !claimedFree;
      rewardHtml = `
        <div class="bp-reward-row free">
          <div class="bp-reward-icon">◆</div>
          <div class="bp-reward-info">
            <div class="bp-reward-name">${coinReward} عملة</div>
            <div class="bp-reward-meta">FREE REWARD</div>
          </div>
          ${claimedFree 
            ? '<button class="bp-claim-btn done">✓</button>'
            : unlocked 
              ? '<button class="bp-claim-btn" data-tier="' + i + '" data-track="free">استلام</button>'
              : '<button class="bp-claim-btn locked">🔒</button>'
          }
        </div>
      `;
      /* عناصر مخصصة */
      freeItems.forEach(({item}) => {
        rewardHtml += `
          <div class="bp-reward-row premium">
            <div class="bp-reward-icon">🎁</div>
            <div class="bp-reward-info">
              <div class="bp-reward-name">${item.name}</div>
              <div class="bp-reward-meta">CUSTOM ITEM</div>
            </div>
            ${unlocked 
              ? '<button class="bp-claim-btn gold" data-tier="' + i + '" data-track="free" data-custom="' + item.id + '">استلام</button>'
              : '<button class="bp-claim-btn locked">🔒</button>'
            }
          </div>
        `;
      });
    } else {
      /* Premium track */
      const hasPrem = Save.data.battlePass.premiumOwned;
      const canClaim = unlocked && hasPrem && !claimedPrem;

      rewardHtml = `
        <div class="bp-reward-row premium">
          <div class="bp-reward-icon">👑</div>
          <div class="bp-reward-info">
            <div class="bp-reward-name">${coinReward * 3} عملة</div>
            <div class="bp-reward-meta">PREMIUM REWARD</div>
          </div>
          ${claimedPrem 
            ? '<button class="bp-claim-btn done">✓</button>'
            : !hasPrem 
              ? '<button class="bp-claim-btn premium-locked">قفل مميز</button>'
              : unlocked 
                ? '<button class="bp-claim-btn gold" data-tier="' + i + '" data-track="premium">استلام</button>'
                : '<button class="bp-claim-btn locked">🔒</button>'
          }
        </div>
      `;

      premItems.forEach(({item}) => {
        rewardHtml += `
          <div class="bp-reward-row premium">
            <div class="bp-reward-icon">💎</div>
            <div class="bp-reward-info">
              <div class="bp-reward-name">${item.name}</div>
              <div class="bp-reward-meta">PREMIUM ITEM</div>
            </div>
            ${hasPrem && unlocked 
              ? '<button class="bp-claim-btn gold" data-tier="' + i + '" data-track="premium" data-custom="' + item.id + '">استلام</button>'
              : '<button class="bp-claim-btn locked">🔒</button>'
            }
          </div>
        `;
      });
    }

    el.innerHTML = `
      <div class="bp-tier-side">
        <div class="bp-tier-num-v2">${i}</div>
        <div class="bp-tier-label">TIER</div>
      </div>
      <div class="bp-rewards-v2">${rewardHtml}</div>
    `;

    list.appendChild(el);
  }

  /* Event listeners */
  list.querySelectorAll('.bp-claim-btn[data-tier]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tierNum = parseInt(btn.dataset.tier);
      const track = btn.dataset.track;
      claimBPReward(tierNum, track, btn.dataset.custom);
    });
  });
}

function claimBPReward(tier, track, customItemId){
  const tierProgress = getBPTier();
  if(tier > tierProgress){
    Sfx.play(220, 0.15, 'sine', 0.05, 180);
    haptic(20);
    return;
  }

  const claimedArr = track === 'free' ? 'claimedFree' : 'claimedPremium';
  if(!Save.data.battlePass[claimedArr]) Save.data.battlePass[claimedArr] = [];
  if(Save.data.battlePass[claimedArr].includes(tier)) return;

  /* فحص Premium */
  if(track === 'premium' && !Save.data.battlePass.premiumOwned){
    Sfx.play(220, 0.15, 'sine', 0.05, 180);
    haptic(20);
    return;
  }

  /* أعط المكافأة */
  const coinReward = track === 'free' ? (5 + tier * 2) : ((5 + tier * 2) * 3);

  /* إذا كانت المكافأة عنصر مخصص، أعطه */
  if(customItemId){
    /* ابحث عن العنصر وأضفه للمخزون */
const allCats = [
  'spark','eyes','companion','footstep','trail','jump','death','aura','crown','cape',
  /* ✨ جديدة */
  'headItem','backItem','heldItem','groundMark',
  'nameTag','badge','avatarFrame','banner',
  'spawnEffect','reviveEffect','hitEffect'
];
    let found = false;
    for(const cat of allCats){
      const all = getAllCosmetics(cat);
      const item = all.find(x => x.id === customItemId);
      if(item){
        if(!Save.data.cosmetics.owned[cat]) Save.data.cosmetics.owned[cat] = [];
        if(!Save.data.cosmetics.owned[cat].includes(customItemId)){
          Save.data.cosmetics.owned[cat].push(customItemId);
        }
        found = true;
        break;
      }
    }
    /* تحقق في الأزياء */
    if(!found){
      const allSkins = getAllSkins();
      const skin = allSkins.find(x => x.id === customItemId);
      if(skin && !Save.data.ownedSkins.includes(customItemId)){
        Save.data.ownedSkins.push(customItemId);
      }
    }
  } else {
    Save.data.coins += coinReward;
    Save.data.stats.totalCoins += coinReward;
  }

  Save.data.battlePass[claimedArr].push(tier);
  Save.save();

  Sfx.reward(); haptic(20);
  updateCoinsUI();
  buildBattlePassV2();
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
   ==================== Skins ================================
   ============================================================ */
const SKINS = [
  /* ═══ الأساسيات ═══ */
  { id:'cream', ar:'كريمي', en:'CREAM', body:'#F5EFE6', bodyDark:'#D9CBBA', detail:'#1A1512', accent:'#FFB060', accessory:'none', pattern:'none', price:0, rarity:'common' },

  /* ═══ COLOR SERIES ═══ */
  { id:'amber', ar:'عنبري', en:'AMBER', body:'#E0A44C', bodyDark:'#B07628', detail:'#1A1512', accent:'#FFD080', accessory:'horns', pattern:'none', price:150, rarity:'common' },
  { id:'crimson', ar:'قرمزي', en:'CRIMSON', body:'#D83838', bodyDark:'#901818', detail:'#1A1512', accent:'#FF8888', accessory:'none', pattern:'none', price:200, rarity:'common' },
  { id:'emerald', ar:'زمردي', en:'EMERALD', body:'#2FA850', bodyDark:'#186828', detail:'#0A2810', accent:'#7FFFA0', accessory:'none', pattern:'none', price:250, rarity:'common' },
  { id:'sapphire', ar:'ياقوتي', en:'SAPPHIRE', body:'#2848D8', bodyDark:'#102878', detail:'#F0F8FF', accent:'#88A8FF', accessory:'none', pattern:'none', price:250, rarity:'common' },
  { id:'amethyst', ar:'أرجواني', en:'AMETHYST', body:'#8858C8', bodyDark:'#503898', detail:'#F0E0FF', accent:'#D8B0FF', accessory:'none', pattern:'none', price:300, rarity:'common' },
  { id:'copper', ar:'نحاسي', en:'COPPER', body:'#C87848', bodyDark:'#8A4828', detail:'#1A1512', accent:'#FFB888', accessory:'none', pattern:'none', price:300, rarity:'common' },
  { id:'pearl', ar:'لؤلؤي', en:'PEARL', body:'#F8F0E8', bodyDark:'#C8B8A8', detail:'#3A2828', accent:'#FFD0E0', accessory:'none', pattern:'none', price:350, rarity:'common' },
  { id:'slate', ar:'حجري', en:'SLATE', body:'#5A6270', bodyDark:'#3A4048', detail:'#F5EFE6', accent:'#9AACBC', accessory:'none', pattern:'spots', price:300, rarity:'common' },

  /* ═══ RARE — PATTERNS ═══ */
  { id:'rose', ar:'وردي', en:'ROSE', body:'#E89BA8', bodyDark:'#C06878', detail:'#1A1512', accent:'#FFDCE4', accessory:'wings', pattern:'none', price:500, rarity:'rare' },
  { id:'sage', ar:'زيتوني', en:'SAGE', body:'#7BA47B', bodyDark:'#4E7A4E', detail:'#1A1512', accent:'#D8F0A8', accessory:'leaf', pattern:'none', price:750, rarity:'rare' },
  { id:'sky', ar:'سماوي', en:'SKY', body:'#88C8E8', bodyDark:'#4E90B8', detail:'#1A1512', accent:'#FFFFFF', accessory:'cloud', pattern:'none', price:1000, rarity:'rare' },
  { id:'camo', ar:'تمويه', en:'CAMO', body:'#7A8A5A', bodyDark:'#4A5A38', detail:'#1A1512', accent:'#A8B888', accessory:'none', pattern:'camo', price:850, rarity:'rare' },
  { id:'zebra', ar:'حمار وحشي', en:'ZEBRA', body:'#F5EFE6', bodyDark:'#C8C0B0', detail:'#1A1512', accent:'#1A1512', accessory:'none', pattern:'stripes', price:900, rarity:'rare' },
  { id:'tiger', ar:'نمر', en:'TIGER', body:'#F0A830', bodyDark:'#A87828', detail:'#1A1512', accent:'#FFD080', accessory:'none', pattern:'tiger', price:1100, rarity:'rare' },
  { id:'checker', ar:'مربعات', en:'CHECKER', body:'#F5EFE6', bodyDark:'#C8C0B0', detail:'#1A1512', accent:'#1A1512', accessory:'none', pattern:'checker', price:1000, rarity:'rare' },
  { id:'honeycomb', ar:'عسل النحل', en:'HONEYCOMB', body:'#E8B34E', bodyDark:'#A87828', detail:'#3A2010', accent:'#FFE090', accessory:'none', pattern:'hex', price:1200, rarity:'rare' },
  { id:'circuit', ar:'إلكتروني', en:'CIRCUIT', body:'#1A2828', bodyDark:'#0A1010', detail:'#00FF80', accent:'#00FF80', accessory:'antenna', pattern:'circuit', glow:true, glowColor:'#00FF80', price:1300, rarity:'rare' },
  { id:'pastel', ar:'باستيل', en:'PASTEL', body:'#FFD8E8', bodyDark:'#E8B8C8', detail:'#5A3040', accent:'#FFC0A0', accessory:'flowerCrown', pattern:'gradient', price:1400, rarity:'rare' },

  /* ═══ EPIC ═══ */
  { id:'ink', ar:'حِبري', en:'INK', body:'#2A2622', bodyDark:'#100E0C', detail:'#E8D0FF', accent:'#A080FF', accessory:'spikes', pattern:'none', glow:true, glowColor:'#6A50B0', price:1500, rarity:'epic' },
  { id:'gold', ar:'ذهبي', en:'GOLD', body:'#E8B34E', bodyDark:'#B08028', detail:'#1A1512', accent:'#FFF4C0', accessory:'halo', pattern:'none', sparkle:true, price:2000, rarity:'epic' },
  { id:'lava', ar:'بركاني', en:'LAVA', body:'#E85838', bodyDark:'#A03018', detail:'#1A1512', accent:'#FFD060', accessory:'horns', pattern:'lavaCracks', glow:true, glowColor:'#FF5020', price:3000, rarity:'epic' },
  { id:'ice', ar:'جليدي', en:'ICE', body:'#A8E0F0', bodyDark:'#5898C8', detail:'#1A2838', accent:'#FFFFFF', accessory:'crystalShards', pattern:'crystalPattern', glow:true, glowColor:'#80D8FF', price:2200, rarity:'epic' },
  { id:'dragon', ar:'التنين', en:'DRAGON', body:'#3A8040', bodyDark:'#1A4820', detail:'#F0E0A0', accent:'#E85020', accessory:'dragonHorns', pattern:'scales', price:2800, rarity:'epic' },
  { id:'demon', ar:'الشيطان', en:'DEMON', body:'#8A2020', bodyDark:'#4A0808', detail:'#FFE0A0', accent:'#FF8020', accessory:'demonHorns', pattern:'none', glow:true, glowColor:'#FF3030', price:3200, rarity:'epic' },
  { id:'angel', ar:'الملاك', en:'ANGEL', body:'#FFF8E8', bodyDark:'#E8D8B8', detail:'#C88040', accent:'#FFE890', accessory:'angelWings', pattern:'none', glow:true, glowColor:'#FFF8C0', sparkle:true, price:3500, rarity:'epic' },
  { id:'ninja', ar:'النينجا', en:'NINJA', body:'#1A1A28', bodyDark:'#0A0A18', detail:'#E83040', accent:'#FF5060', accessory:'ninjaMask', pattern:'none', price:2400, rarity:'epic' },
  { id:'astronaut', ar:'رائد الفضاء', en:'ASTRONAUT', body:'#F0F0F8', bodyDark:'#C0C0D0', detail:'#4080C0', accent:'#FFC040', accessory:'helmet', pattern:'none', price:2600, rarity:'epic' },
  { id:'cyber', ar:'سايبر', en:'CYBER', body:'#0A0A28', bodyDark:'#050515', detail:'#00FFFF', accent:'#FF00D8', accessory:'visor', pattern:'circuit', glow:true, glowColor:'#00FFFF', price:3400, rarity:'epic' },
  { id:'cactus', ar:'الصبار', en:'CACTUS', body:'#4A8040', bodyDark:'#2A4820', detail:'#F0E0A0', accent:'#E8A0C0', accessory:'flowerCrown', pattern:'none', price:2000, rarity:'epic' },
  { id:'mushroom', ar:'الفطر', en:'MUSHROOM', body:'#E85040', bodyDark:'#A02820', detail:'#FFF8E0', accent:'#FFFFFF', accessory:'mushroomCap', pattern:'spots', price:2200, rarity:'epic' },
  { id:'pumpkin', ar:'اليقطين', en:'PUMPKIN', body:'#E88820', bodyDark:'#A05010', detail:'#3A1808', accent:'#FFD060', accessory:'pumpkinStem', pattern:'none', price:2400, rarity:'epic' },

  /* ═══ LEGEND ═══ */
  { id:'neon', ar:'نيون', en:'NEON', body:'#00E8D8', bodyDark:'#007870', detail:'#0A2828', accent:'#FF00A8', accessory:'star', pattern:'none', glow:true, glowColor:'#00E8D8', price:4000, rarity:'legend' },
  { id:'rainbow', ar:'قوس قزح', en:'RAINBOW', body:'#FF6088', bodyDark:'#A03060', detail:'#1A1512', accent:'#FFE060', accessory:'rainbow', pattern:'rainbow', rainbow:true, price:6000, rarity:'legend' },
  { id:'ghost', ar:'شبح', en:'GHOST', body:'#F0F0FF', bodyDark:'#B8B8D8', detail:'#4A4060', accent:'#FFFFFF', accessory:'none', pattern:'none', transparent:true, ghostly:true, price:8000, rarity:'legend' },
  { id:'galaxy', ar:'المجرة', en:'GALAXY', body:'#3A1878', bodyDark:'#180438', detail:'#FFC0FF', accent:'#C080FF', accessory:'star', pattern:'galaxyPattern', glow:true, glowColor:'#8040D0', sparkle:true, price:7500, rarity:'legend' },
  { id:'holographic', ar:'هولوجرافي', en:'HOLO', body:'#C0E8FF', bodyDark:'#80A8D8', detail:'#FFFFFF', accent:'#FFC0E8', accessory:'none', pattern:'holo', rainbow:true, glow:true, glowColor:'#A0E8FF', sparkle:true, price:9000, rarity:'legend' },
  { id:'phoenix', ar:'العنقاء', en:'PHOENIX', body:'#E85020', bodyDark:'#A01808', detail:'#FFE090', accent:'#FFD060', accessory:'phoenixWings', pattern:'firePattern', glow:true, glowColor:'#FF8040', sparkle:true, price:10000, rarity:'legend' },
  { id:'storm', ar:'العاصفة', en:'STORM', body:'#5A6878', bodyDark:'#2A3038', detail:'#A0E0FF', accent:'#FFE060', accessory:'lightningBolts', pattern:'clouds', glow:true, glowColor:'#80D0FF', price:8500, rarity:'legend' },
  { id:'shadow', ar:'الظل', en:'SHADOW', body:'#1A0A20', bodyDark:'#08020A', detail:'#A060A0', accent:'#8040A0', accessory:'shadowWisps', pattern:'voidPattern', transparent:true, glow:true, glowColor:'#6020A0', price:11000, rarity:'legend' },

  /* ═══ MYTHIC ═══ */
  { id:'void', ar:'الفراغ', en:'VOID', body:'#1A0A2A', bodyDark:'#0A0414', detail:'#FF80FF', accent:'#C080FF', accessory:'star', pattern:'voidPattern', glow:true, glowColor:'#A040FF', price:12000, rarity:'mythic' },
  { id:'sun', ar:'الشمس', en:'SUN', body:'#FFE060', bodyDark:'#E8A020', detail:'#5A2010', accent:'#FFFFFF', accessory:'halo', pattern:'none', glow:true, glowColor:'#FFD040', sparkle:true, price:15000, rarity:'mythic' },
  { id:'moon', ar:'القمر', en:'MOON', body:'#E8E8F0', bodyDark:'#A8A8B8', detail:'#3A3A50', accent:'#FFF8D0', accessory:'moonCrown', pattern:'craters', glow:true, glowColor:'#F0F0FF', sparkle:true, price:14000, rarity:'mythic' },
  { id:'cosmic', ar:'الكوني', en:'COSMIC', body:'#0A0420', bodyDark:'#050010', detail:'#FFFFFF', accent:'#FFD060', accessory:'star', pattern:'starfield', glow:true, glowColor:'#A060FF', sparkle:true, price:18000, rarity:'mythic' },
  { id:'god', ar:'الإلهي', en:'DIVINE', body:'#FFF8E0', bodyDark:'#FFD060', detail:'#A06020', accent:'#FFFFFF', accessory:'divineCrown', pattern:'holyPattern', glow:true, glowColor:'#FFF8C0', sparkle:true, price:25000, rarity:'mythic' },
  { id:'prismatic', ar:'المنشوري', en:'PRISMATIC', body:'#FF80C0', bodyDark:'#A04080', detail:'#FFFFFF', accent:'#80FFFF', accessory:'crystalCrown', pattern:'prismatic', rainbow:true, glow:true, glowColor:'#FF80FF', sparkle:true, price:30000, rarity:'mythic' }
];

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

function currentSpark(){ return getAllCosmetics('spark').find(c=>c.id===Save.data.cosmetics.current.spark) || COSMETICS.spark[0]; }
function currentTrail(){ return getAllCosmetics('trail').find(c=>c.id===Save.data.cosmetics.current.trail) || COSMETICS.trail[0]; }
function currentJump(){ return getAllCosmetics('jump').find(c=>c.id===Save.data.cosmetics.current.jump) || COSMETICS.jump[0]; }
function currentDeath(){ return getAllCosmetics('death').find(c=>c.id===Save.data.cosmetics.current.death) || COSMETICS.death[0]; }
function currentAura(){ return getAllCosmetics('aura').find(c=>c.id===Save.data.cosmetics.current.aura) || COSMETICS.aura[0]; }
function currentCrown(){ return getAllCosmetics('crown').find(c=>c.id===Save.data.cosmetics.current.crown) || COSMETICS.crown[0]; }
function currentCape(){ return getAllCosmetics('cape').find(c=>c.id===Save.data.cosmetics.current.cape) || COSMETICS.cape[0]; }
function currentEyes(){ return getAllCosmetics('eyes').find(c=>c.id===Save.data.cosmetics.current.eyes) || {id:'default'}; }
function currentCompanion(){ return getAllCosmetics('companion').find(c=>c.id===Save.data.cosmetics.current.companion) || {id:'none'}; }
function currentFootstep(){ return getAllCosmetics('footstep').find(c=>c.id===Save.data.cosmetics.current.footstep) || {id:'none'}; }

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

function currentHeadItem(){
  return getAllCosmetics('headItem').find(c => c.id === Save.data.cosmetics.current.headItem)
      || COSMETICS.headItem[0];
}
function currentBackItem(){
  return getAllCosmetics('backItem').find(c => c.id === Save.data.cosmetics.current.backItem)
      || COSMETICS.backItem[0];
}
function currentHeldItem(){
  return getAllCosmetics('heldItem').find(c => c.id === Save.data.cosmetics.current.heldItem)
      || COSMETICS.heldItem[0];
}
function currentNameTag(){
  return getAllCosmetics('nameTag').find(c => c.id === Save.data.cosmetics.current.nameTag)
      || COSMETICS.nameTag[0];
}
function currentBadge(){
  return getAllCosmetics('badge').find(c => c.id === Save.data.cosmetics.current.badge)
      || COSMETICS.badge[0];
}
function currentAvatarFrame(){
  return getAllCosmetics('avatarFrame').find(c => c.id === Save.data.cosmetics.current.avatarFrame)
      || COSMETICS.avatarFrame[0];
}
function currentBanner(){
  return getAllCosmetics('banner').find(c => c.id === Save.data.cosmetics.current.banner)
      || COSMETICS.banner[0];
}
function currentGroundMark(){
  return getAllCosmetics('groundMark').find(c => c.id === Save.data.cosmetics.current.groundMark)
      || COSMETICS.groundMark[0];
}
function currentSpawnEffect(){
  return getAllCosmetics('spawnEffect').find(c => c.id === Save.data.cosmetics.current.spawnEffect)
      || COSMETICS.spawnEffect[0];
}
function currentReviveEffect(){
  return getAllCosmetics('reviveEffect').find(c => c.id === Save.data.cosmetics.current.reviveEffect)
      || COSMETICS.reviveEffect[0];
}
function currentHitEffect(){
  return getAllCosmetics('hitEffect').find(c => c.id === Save.data.cosmetics.current.hitEffect)
      || COSMETICS.hitEffect[0];
}

/* ============================================================
   ==================== DEFAULT SAVE DATA ====================
   ============================================================ */
const DEFAULT_SAVE_DATA = {
  coins: 0,
  bestMeters: { FLIP:0, FLAP:0, DRIFT:0, WALK:0, FLIP_WALK:0, SKY_JUMP:0, MIXED:0 },
  ownedSkins: ['cream'],
  currentSkin: 'cream',
/* استبدل cosmetics في DEFAULT_SAVE_DATA بـ: */
cosmetics: {
  owned: {
    spark:['none'], trail:['default'], jump:['default'], death:['default'],
    aura:['none'], crown:['none'], cape:['none'],
    eyes:['default'], companion:['none'], footstep:['none'],
    /* جديدة */
    headItem:['none'], backItem:['none'], heldItem:['none'],
    nameTag:['default'], badge:['none'], avatarFrame:['default'],
    banner:['default'], groundMark:['none'],
    spawnEffect:['default'], reviveEffect:['default'], hitEffect:['default']
  },
  current: {
    spark:'none', trail:'default', jump:'default', death:'default',
    aura:'none', crown:'none', cape:'none',
    eyes:'default', companion:'none', footstep:'none',
    /* جديدة */
    headItem:'none', backItem:'none', heldItem:'none',
    nameTag:'default', badge:'none', avatarFrame:'default',
    banner:'default', groundMark:'none',
    spawnEffect:'default', reviveEffect:'default', hitEffect:'default'
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
    /* ═══ ضمان وجود بنية cosmetics ═══ */
    if(!this.data.cosmetics) this.data.cosmetics = { owned: {}, current: {} };
    if(!this.data.cosmetics.owned)   this.data.cosmetics.owned = {};
    if(!this.data.cosmetics.current) this.data.cosmetics.current = {};

    /* ═══ قيم افتراضية لكل فئة (قديمة + جديدة) ═══ */
    const catDefaults = {
      /* قديمة */
      spark: 'none', trail: 'default', jump: 'default', death: 'default',
      aura: 'none', crown: 'none', cape: 'none',
      eyes: 'default', companion: 'none', footstep: 'none',
      /* ✨ جديدة */
      headItem: 'none', backItem: 'none', heldItem: 'none',
      nameTag: 'default', badge: 'none', avatarFrame: 'default',
      banner: 'default', groundMark: 'none',
      spawnEffect: 'default', reviveEffect: 'default', hitEffect: 'default'
    };

    for(const cat in catDefaults){
      const defValue = catDefaults[cat];

      /* ═══ owned ═══ */
      if(!Array.isArray(this.data.cosmetics.owned[cat])){
        this.data.cosmetics.owned[cat] = [defValue];
      } else if(!this.data.cosmetics.owned[cat].includes(defValue)){
        this.data.cosmetics.owned[cat].push(defValue);
      }

      /* ═══ current ═══ */
      if(!this.data.cosmetics.current[cat]){
        this.data.cosmetics.current[cat] = defValue;
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

    /* ═══ ownedSkins ═══ */
    if(!Array.isArray(this.data.ownedSkins) || this.data.ownedSkins.length === 0){
      this.data.ownedSkins = ['cream'];
    }

    /* ═══ currentSkin ═══ */
    if(!this.data.currentSkin){
      this.data.currentSkin = 'cream';
    }

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
   CATEGORIES v2 — موسّعة
   ============================================================ */
const CATEGORY_LABELS = {
  // موجودة سابقاً
  skin: 'زي', eyes: 'عيون', companion: 'رفيق', footstep: 'أثر',
  spark: 'شرار', trail: 'خط سير', jump: 'قفزة', death: 'نهاية',
  aura: 'هالة', crown: 'رأسية', cape: 'عباءة',

  // ✨ جديدة
  headItem: 'غطاء رأس',       // قبعات/خوذ — طبقة منفصلة
  backItem: 'ظهر',             // أجنحة / حقائب / عباءات كصور
  heldItem: 'محمول',           // سيف، مطرقة، مصباح، لافتة
  nameTag: 'بطاقة الاسم',      // إطار الاسم في القوائم
  badge: 'شارة ملف',          // شعار صغير بجانب الاسم
  avatarFrame: 'إطار الصورة',  // إطار دائري في الملف الشخصي
  banner: 'خلفية ملف',        // خلفية البطاقة
  groundMark: 'علامة أرضية',  // حلقة/شعار تحت اللاعب
  spawnEffect: 'تأثير البداية',// وميض عند بدء الجولة
  reviveEffect: 'تأثير الإحياء',// عند العودة للحياة
  hitEffect: 'تأثير الارتطام'   // عند الاصطدام بالدرع/العدو
};

const CATEGORY_FOLDERS = {
  skin: 'skins', eyes: 'eyes', companion: 'companion', footstep: 'footstep',
  spark: 'spark', trail: 'trail', jump: 'jump', death: 'death',
  aura: 'aura', crown: 'crown', cape: 'cape',
  // جديدة
  headItem: 'head', backItem: 'back', heldItem: 'held',
  nameTag: 'tags', badge: 'badges', avatarFrame: 'frames',
  banner: 'banners', groundMark: 'marks',
  spawnEffect: 'spawn', reviveEffect: 'revive', hitEffect: 'hit'
};

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
  /* ✅ كل الفئات — قديمة + جديدة */
  const cats = [
    'skins','eyes','companion','footstep',
    'spark','trail','jump','death','aura','crown','cape',
    /* ✨ جديدة */
    'headItem','backItem','heldItem','groundMark',
    'nameTag','badge','avatarFrame','banner',
    'spawnEffect','reviveEffect','hitEffect'
  ];

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

/* ═══ قائمة العناصر في لوحة المشرف ═══ */
function buildAdminContentList(){
  const list = document.getElementById('admin-content-list');
  if(!list) return;
  list.innerHTML = '';

const keyMap = {
  skin:'customSkins', eyes:'customEyes', companion:'customCompanion',
  footstep:'customFootstep', spark:'customSpark', trail:'customTrail',
  jump:'customJump', death:'customDeath', aura:'customAura',
  crown:'customCrown', cape:'customCape',
  /* ✨ جديدة */
  headItem:'customHeadItem', backItem:'customBackItem', heldItem:'customHeldItem',
  groundMark:'customGroundMark', nameTag:'customNameTag', badge:'customBadge',
  avatarFrame:'customAvatarFrame', banner:'customBanner',
  spawnEffect:'customSpawnEffect', reviveEffect:'customReviveEffect', hitEffect:'customHitEffect'
};

  const key = keyMap[currentAdminTab];
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

    const placements = item.placements || [];
    const placementsHtml = placements.length
      ? placements.map(p => {
          const info = getSourceTypeInfo(p.type);
          let extra = '';
          if(p.type === 'shop')         extra = ` ◆${p.price}`;
          if(p.type === 'battle_pass')  extra = ` L${p.tier} · ${p.track === 'premium' ? 'مميز' : 'مجاني'}`;
          if(p.type === 'season_rank')  extra = ` ${SEASON_RANKS[p.rankId]?.name || ''}`;
          if(p.type === 'daily_login')  extra = ` يوم ${p.day}`;
          if(p.type === 'chest')        extra = ` ${p.chestType}`;
          if(p.type === 'lucky_wheel')  extra = ` قطاع ${p.segment}`;
          if(p.type === 'event')        extra = ` ${p.eventId}`;
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

const PLANETS = [
  {
    id: 'mercury', name: 'MERCURY', ar: 'عطارد', icon: '☿',
    from: 0, to: 1,
    sky: '#1A1A1A', skyBot: '#3A2A20',
    ground: '#6A5040', groundDark: '#3A2820', groundTop: '#8A7060',
    accent: '#FFA060', haze: 'rgba(255,160,96,0.08)',
    sunBrightness: 1.4, gravity: 0.65, hazard: 'crater',
    tempText: '+430°'
  },
  {
    id: 'venus', name: 'VENUS', ar: 'الزهرة', icon: '♀',
    from: 1, to: 2,
    sky: '#E8A050', skyBot: '#FFD080',
    ground: '#A07030', groundDark: '#5A3818', groundTop: '#C8A050',
    accent: '#FFD060', haze: 'rgba(255,200,96,0.15)',
    sunBrightness: 1.0, gravity: 0.9, hazard: 'lava',
    tempText: '+465°'
  },
  {
    id: 'mars', name: 'MARS', ar: 'المريخ', icon: '♂',
    from: 2, to: 3,
    sky: '#8A3A20', skyBot: '#E8A070',
    ground: '#9E4A28', groundDark: '#5A2810', groundTop: '#C86A40',
    accent: '#FF7030', haze: 'rgba(255,112,48,0.12)',
    sunBrightness: 0.7, gravity: 0.85, hazard: 'dust',
    tempText: '-63°'
  },
  {
    id: 'jupiter', name: 'JUPITER', ar: 'المشتري', icon: '♃',
    from: 3, to: 4,
    sky: '#6A4A30', skyBot: '#D8A880',
    ground: '#8A6A48', groundDark: '#4A3020', groundTop: '#B89A70',
    accent: '#E8B890', haze: 'rgba(232,184,144,0.18)',
    sunBrightness: 0.5, gravity: 1.6, hazard: 'storm',
    tempText: '-110°'
  },
  {
    id: 'saturn', name: 'SATURN', ar: 'زحل', icon: '♄',
    from: 4, to: 5,
    sky: '#A88060', skyBot: '#F0D8A8',
    ground: '#C0A878', groundDark: '#6A5838', groundTop: '#E0C8A0',
    accent: '#FFE8B0', haze: 'rgba(255,232,176,0.20)',
    sunBrightness: 0.45, gravity: 1.4, hazard: 'rings',
    tempText: '-140°'
  },
  {
    id: 'uranus', name: 'URANUS', ar: 'أورانوس', icon: '♅',
    from: 5, to: 6,
    sky: '#40A0A8', skyBot: '#A0E8E0',
    ground: '#4A8890', groundDark: '#244850', groundTop: '#70B0B8',
    accent: '#80FFFF', haze: 'rgba(128,255,255,0.18)',
    sunBrightness: 0.3, gravity: 1.2, hazard: 'ice',
    tempText: '-195°'
  },
  {
    id: 'neptune', name: 'NEPTUNE', ar: 'نبتون', icon: '♆',
    from: 6, to: 7,
    sky: '#2030A0', skyBot: '#6080E0',
    ground: '#2A3888', groundDark: '#101840', groundTop: '#5068C0',
    accent: '#80C0FF', haze: 'rgba(128,192,255,0.20)',
    sunBrightness: 0.25, gravity: 1.3, hazard: 'storm',
    tempText: '-200°'
  }
];

function getPlanetByIndex(idx){
  return PLANETS[clamp(idx, 0, PLANETS.length - 1)];
}

function getPlanetByAltitude(alt){
  const band = Math.floor((alt - PLANET_REALM_ENTER) / PLANET_SPACING);
  return getPlanetByIndex(band);
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
  const cos = currentJump();

  /* ✅ قفزة مخصصة بصورة */
  if(hasItemImage(cos)){
    const img = getItemImgOrNull(cos);
    /* نضيف 3 جسيمات صور صغيرة متناثرة */
    for(let i = 0; i < 5; i++){
      const a = (i/5) * Math.PI * 2;
      particles.push({
        x, y,
        vx: Math.cos(a) * rand(2, 4),
        vy: Math.sin(a) * rand(2, 4),
        life: 0.9, decay: 0.03,
        item: cos,
        size: 18,
        color: '#FFFFFF'
      });
    }
    Sfx.bounce();
    return;
  }
  const id = cos.id;

  if(id==='ring'){
    for(let i=0;i<8;i++){
      const a=(i/8)*Math.PI*2;
      particles.push({x,y,vx:Math.cos(a)*4,vy:Math.sin(a)*4,life:1,decay:0.035,color,size:3});
    }
  } else if(id==='burst' || id==='shadowBurst'){
    const col = id==='shadowBurst' ? '#2A1A30' : color;
    for(let i=0;i<12;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(2,5);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,decay:0.025,color:col,size:rand(2.5,4)});
    }
  } else if(id==='star' || id==='starBurst'){
    for(let i=0;i<10;i++){
      const a=(i/10)*Math.PI*2;
      particles.push({x,y,vx:Math.cos(a)*rand(3,6),vy:Math.sin(a)*rand(3,6),life:1,decay:0.03,color,size:rand(3,5)});
    }
    if(id==='starBurst'){
      for(let i=0;i<16;i++){
        const a=Math.random()*Math.PI*2;
        const s=rand(4,8);
        particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.2,decay:0.022,color:'#FFF8C0',size:rand(2,4)});
      }
    }
  } else if(id==='shockwave' || id==='fireRing' || id==='holyRing'){
    const col = id==='fireRing' ? '#FF6020' : id==='holyRing' ? '#FFF8C0' : '#FFFFFF';
    for(let i=0;i<16;i++){
      const a=(i/16)*Math.PI*2;
      particles.push({x,y,vx:Math.cos(a)*5,vy:Math.sin(a)*5,life:1.2,decay:0.02,color:col,size:4});
    }
  } else if(id==='spiral' || id==='vortex'){
    for(let i=0;i<20;i++){
      const a=(i/20)*Math.PI*4;
      const s=1 + i*0.25;
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.4,decay:0.018,color,size:rand(2,4)});
    }
  } else if(id==='smokeBomb' || id==='smoke'){
    for(let i=0;i<14;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(1,3);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.6,decay:0.014,color:'#9098A0',size:rand(4,7)});
    }
  } else if(id==='iceBurst'){
    for(let i=0;i<14;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(2,5);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.1,decay:0.025,color:'#A0E0FF',size:rand(3,5)});
    }
  } else if(id==='holyBurst'){
    for(let i=0;i<18;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(1,4);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s - 1,life:1.4,decay:0.02,color:'#FFF8C0',size:rand(2.5,4.5)});
    }
  } else if(id==='voidBurst' || id==='abyssBurst' || id==='cosmicBurst'){
    const col = id==='abyssBurst' ? '#2A0848' : id==='cosmicBurst' ? '#C080FF' : '#6020A0';
    for(let i=0;i<20;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(3,7);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.4,decay:0.018,color:col,size:rand(3,5)});
    }
  } else if(id==='lightningSmash'){
    for(let i=0;i<12;i++){
      const a=(i/12)*Math.PI*2;
      particles.push({x,y,vx:Math.cos(a)*6,vy:Math.sin(a)*6,life:1,decay:0.028,color:'#A0E0FF',size:rand(3,5)});
    }
  } else if(id==='waterSplash'){
    for(let i=0;i<15;i++){
      const a=-Math.PI + Math.random()*Math.PI;
      const s=rand(3,6);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s - 2,life:1,decay:0.03,color:'#88D8FF',size:rand(2.5,4.5)});
    }
  } else if(id==='flowerBurst'){
    for(let i=0;i<15;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(2,5);
      const cols = ['#FF80A0','#FFE060','#FFA0C0','#FFFFFF'];
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.2,decay:0.024,color:cols[i%4],size:rand(3,5)});
    }
  } else if(id==='leafBurst'){
    for(let i=0;i<14;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(2,5);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.2,decay:0.024,color:'#7BC44C',size:rand(2.5,4.5)});
    }
  } else if(id==='bubbleBurst'){
    for(let i=0;i<15;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(1,4);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.3,decay:0.02,color:'#A8D8E8',size:rand(3,5)});
    }
  } else if(id==='heartBurst'){
    for(let i=0;i<12;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(2,5);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.3,decay:0.022,color:'#FF6080',size:rand(3,5)});
    }
  } else if(id==='gearBurst'){
    for(let i=0;i<10;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(2,5);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.2,decay:0.024,color:'#C0C8D8',size:rand(3,5)});
    }
  } else {
    dust(x,y,color,6);
  }
}
function spawnDeathEffect(x, y, color){
  const cos = currentDeath();

  /* ✅ نهاية مخصصة بصورة */
  if(hasItemImage(cos)){
    for(let i = 0; i < 18; i++){
      const a = (i/18) * Math.PI * 2;
      const s = rand(3, 8);
      particles.push({
        x, y,
        vx: Math.cos(a) * s, vy: Math.sin(a) * s,
        life: 1.4, decay: 0.018,
        item: cos,
        size: rand(14, 22),
        color: '#FFFFFF'
      });
    }
    return;
  }
  const id = cos.id;

  if(id==='explode'){
    burst(x,y,color,40,10);
    burst(x,y,'#FF8860',20,12);
  } else if(id==='dissolve'){
    for(let i=0;i<40;i++){
      const a=Math.random()*Math.PI*2;
      const s=Math.random()*3;
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-0.5,life:1,decay:0.012,color,size:rand(2,4)});
    }
  } else if(id==='pixel'){
    for(let i=0;i<50;i++){
      particles.push({x:x+rand(-15,15), y:y+rand(-15,15),vx:rand(-2,2), vy:rand(-3,-0.5),life:1, decay:0.018, color, size:4});
    }
  } else if(id==='shatter' || id==='shatterIce'){
    const col = id==='shatterIce' ? '#A0E0FF' : mixColor(color,'#FFFFFF',0.4);
    for(let i=0;i<45;i++){
      const a = Math.random()*Math.PI*2;
      const s = rand(4,9);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.3, decay:0.018, color: col, size: rand(3,6)});
    }
  } else if(id==='nova'){
    for(let i=0;i<60;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(3,11);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.5,decay:0.014,
        color: i%3===0?'#FFF8C0': (i%3===1?'#FFB060':color), size:rand(3,6)});
    }
  } else if(id==='implode'){
    for(let i=0;i<50;i++){
      const a=Math.random()*Math.PI*2;
      const d=rand(40,120);
      particles.push({x:x+Math.cos(a)*d, y:y+Math.sin(a)*d,
        vx:-Math.cos(a)*6, vy:-Math.sin(a)*6, life:1, decay:0.02, color, size:rand(2,4)});
    }
  } else if(id==='flash'){
    for(let i=0;i<30;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(6,12);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:0.6,decay:0.04,color:'#FFFFFF',size:rand(3,6)});
    }
    G.flash = 0.8;
  } else if(id==='vortexDeath'){
    for(let i=0;i<50;i++){
      const a=(i/50)*Math.PI*8;
      const s=1 + i*0.2;
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.6,decay:0.014,color,size:rand(2,5)});
    }
  } else if(id==='holyAscend'){
    for(let i=0;i<50;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(1,3);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s - 3,life:1.8,decay:0.012,color:'#FFF8C0',size:rand(3,6)});
    }
  } else if(id==='blackHole'){
    for(let i=0;i<80;i++){
      const a=Math.random()*Math.PI*2;
      const d=rand(60,160);
      particles.push({x:x+Math.cos(a)*d, y:y+Math.sin(a)*d,
        vx:-Math.cos(a)*9, vy:-Math.sin(a)*9, life:1.4, decay:0.016, color:'#1A0A2A', size:rand(3,7)});
    }
  } else if(id==='fireworks'){
    const cols = ['#FF4040','#FFD040','#40FF60','#4080FF','#FF40C0'];
    for(let c=0;c<5;c++){
      const baseA = (c/5)*Math.PI*2;
      for(let i=0;i<15;i++){
        const a = baseA + (i/15)*Math.PI*2;
        const s=rand(5,10);
        particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.4,decay:0.016,color:cols[c],size:rand(2,4)});
      }
    }
  } else if(id==='soulRise'){
    for(let i=0;i<40;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(0.5,2);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s - 2.5,life:2,decay:0.01,color:'#C0D0FF',size:rand(2,5)});
    }
  } else if(id==='neonBurst'){
    for(let i=0;i<40;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(4,10);
      const cols = ['#00FFD8','#FF00A8','#FFD000'];
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.2,decay:0.018,color:cols[i%3],size:rand(3,6)});
    }
  } else if(id==='cosmicVoid'){
    for(let i=0;i<70;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(3,14);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.8,decay:0.012,color: i%3===0?'#C080FF':(i%3===1?'#6020A0':'#FFFFFF'), size:rand(3,6)});
    }
  } else if(id==='starScatter'){
    for(let i=0;i<55;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(3,11);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.5,decay:0.014,color:'#FFF4C0',size:rand(3,6)});
    }
  } else if(id==='petalFall'){
    for(let i=0;i<45;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(1,4);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s + 1.5,life:2,decay:0.012,color:'#FFC0D8',size:rand(3,5)});
    }
  } else {
    burst(x,y,color,30,7);
  }
}
function addFloat(x,y,text,color,size=14){ floats.push({x,y,text,color,size,life:1,vy:-1.1}); }
function showBanner(text,sub=''){ G.banner.text=text; G.banner.sub=sub; G.banner.timer=140; }
function shake(v){ G.shake = Math.max(G.shake, v); }

function spawnFootstep(){
  const fs = currentFootstep();
  if(fs.id === 'none') return;

  const x = P.x - 6;
  const y = P.y + P.r - 2;

  if(hasItemImage(fs)){
    /* ✅ يظهر كصورة كاملة بحجم معقول */
    particles.push({
      x, y,
      vx: -1.2, vy: -0.3,
      life: 1.0, decay: 0.02,
      item: fs,
      size: 22,
      rotation: rand(-0.2, 0.2),
      color: '#FFFFFF'
    });
    return;
  }

  const id = fs.id;

  if(id === 'dust' || id === 'smoke'){
    const col = id === 'smoke' ? 'rgba(120,120,130,0.6)' : G.currentScene.groundDark;
    for(let i=0;i<3;i++){
      particles.push({
        x: x + rand(-3,3), y: y,
        vx: rand(-0.6,0.2), vy: rand(-1.2,-0.3),
        life: 0.9, decay: 0.028,
        color: col, size: rand(2.5,4.5)
      });
    }
  }
  else if(id === 'spark'){
    for(let i=0;i<3;i++){
      particles.push({
        x, y,
        vx: rand(-2,2), vy: rand(-2,0),
        life: 0.7, decay: 0.04,
        color: '#FFB060', size: rand(2,3.5)
      });
    }
  }
  else if(id === 'snow'){
    for(let i=0;i<3;i++){
      particles.push({
        x: x + rand(-3,3), y,
        vx: rand(-0.8,0.3), vy: rand(-1,-0.2),
        life: 0.9, decay: 0.03,
        color: '#FFFFFF', size: rand(1.8,3)
      });
    }
  }
  else if(id === 'water'){
    for(let i=0;i<4;i++){
      const a = -Math.PI/2 + rand(-0.5,0.5);
      particles.push({
        x, y,
        vx: Math.cos(a)*rand(1,3), vy: Math.sin(a)*rand(1,3),
        life: 0.8, decay: 0.035,
        color: '#80D0F0', size: rand(2,4)
      });
    }
  }
  else if(id === 'magic'){
    for(let i=0;i<4;i++){
      const a = (i/4)*Math.PI*2;
      particles.push({
        x, y,
        vx: Math.cos(a)*2, vy: Math.sin(a)*2 - 0.5,
        life: 1, decay: 0.03,
        color: '#C080FF', size: rand(2.5,4)
      });
    }
    const hue = (G.t*5) % 360;
    addFloat(x, y - 10, '✦', `hsl(${hue}, 80%, 65%)`, 12);
  }
  else if(id === 'fire'){
    for(let i=0;i<3;i++){
      particles.push({
        x: x + rand(-3,3), y,
        vx: rand(-0.8,0.8), vy: rand(-2,-0.5),
        life: 0.7, decay: 0.04,
        color: ['#FFB060','#FF6020','#FFE090'][i%3], size: rand(2.5,4.5)
      });
    }
  }
  else if(id === 'shadow'){
    for(let i=0;i<3;i++){
      particles.push({
        x: x + rand(-4,4), y,
        vx: rand(-0.8,0.3), vy: rand(-0.6,0),
        life: 1.1, decay: 0.02,
        color: '#3A1A50', size: rand(3,5)
      });
    }
  }
  else if(id === 'rainbow'){
    const hue = (G.t*6) % 360;
    for(let i=0;i<3;i++){
      particles.push({
        x: x + rand(-3,3), y,
        vx: rand(-0.8,0.3), vy: rand(-1.5,-0.3),
        life: 0.9, decay: 0.03,
        color: `hsl(${(hue + i*40)%360}, 85%, 65%)`, size: rand(2.5,4)
      });
    }
  }
  else if(id === 'void'){
    for(let i=0;i<3;i++){
      particles.push({
        x: x + rand(-3,3), y,
        vx: rand(-0.5,0.5), vy: rand(-1.5,-0.3),
        life: 1.1, decay: 0.022,
        color: i%2===0 ? '#8040FF' : '#200840', size: rand(3,5)
      });
    }
  }
  else if(id === 'divine'){
    for(let i=0;i<4;i++){
      particles.push({
        x: x + rand(-4,4), y,
        vx: rand(-0.6,0.6), vy: rand(-2,-0.5),
        life: 1.2, decay: 0.02,
        color: '#FFF8C0', size: rand(2.5,4.5)
      });
    }
    const glow = particles[particles.length - 1];
    glow.shadowColor = '#FFE060';
  }
}

/* ============================================================
   ==================== SPARKS ===============================
   ============================================================ */
const SPARK_PALETTES = {
  sparks:    { colors:['#FFB060','#FF6020','#FFE090','#FF8850'], size:[1.5,3.2] },
  bubbles:   { colors:['#C8E8F0','#A8D8E8','#FFFFFF','#E0F0F8'], size:[2,4.5] },
  stars:     { colors:['#FFE060','#FFF0A0','#FFD040','#FFFFFF'], size:[2,4] },
  hearts:    { colors:['#FF80A0','#FF4060','#FFB0C0','#FF6080'], size:[2.5,4.5] },
  notes:     { colors:['#A080FF','#8060E0','#C0A0FF','#FFA0E0'], size:[3,5] },
  leaves:    { colors:['#E87030','#C86030','#A8602A','#F0A050'], size:[2.5,4.5] },
  petals:    { colors:['#FFC8D8','#F0A8C0','#FFE0E8','#F088A8'], size:[2.5,4.5] },
  snow:      { colors:['#FFFFFF','#E8F0F8','#D0E0F0','#F0F8FF'], size:[1.8,3.5] },
  digital:   { colors:['#00FFA0','#00E880','#60FFC0','#008840'], size:[2,4] },
  lightning: { colors:['#A0E0FF','#60C0FF','#FFFFFF','#C0F0FF'], size:[2,5] },
  firefly:   { colors:['#F5D77E','#FFE090','#E8B34E','#FFF0B0'], size:[1.5,3] },
  rainbow:   { colors:['#FF6088','#FFA84C','#FFE24C','#4CE0A8','#4CA8FF','#A86AFF'], size:[2,4] },
  cosmic:    { colors:['#A080FF','#8060D0','#D0B0FF','#FFC0FF','#60A0FF'], size:[2,4.5] },
  gold:      { colors:['#E8B34E','#FFF4C0','#FFD060','#FFE8A0'], size:[2,4.5] },
  /* ═══ جديد ═══ */
  runes:      { colors:['#8060E0','#6040C0','#A080FF','#E0D0FF'], size:[2.5,4] },
  gears:      { colors:['#C8C8D8','#9098A8','#E8E8F0','#5A6270'], size:[2.5,4] },
  plus:       { colors:['#40E860','#20C040','#80FFA0','#008020'], size:[3,5] },
  cross:      { colors:['#E8E8E8','#C0C0C0','#FFFFFF','#A0A0A0'], size:[2.5,4] },
  triangles:  { colors:['#FF8040','#FFC060','#FFA020','#FFD080'], size:[2.5,4.5] },
  diamonds:   { colors:['#80E8FF','#40A8D0','#C0F0FF','#2090B8'], size:[2.5,4.5] },
  moonPhases: { colors:['#FFF4D0','#F0E0A0','#FFFFFF','#E0D080'], size:[2.5,4] },
  arrows:     { colors:['#FF4040','#FF8080','#FF2020','#FFB0B0'], size:[2.5,4] },
  shuriken:   { colors:['#808898','#C0C8D8','#E8E8F0','#5A6270'], size:[2.5,4.5] },
  smoke:      { colors:['#808088','#606068','#A0A0A8','#404048'], size:[3,5.5] },
  voidOrbs:   { colors:['#6020A0','#A040FF','#4020A0','#C080FF'], size:[2.5,4.5] },
  candy:      { colors:['#FF60A0','#FFB040','#60E0FF','#A0FF60'], size:[2.5,4.5] },
  donuts:     { colors:['#FFB0C0','#FFD0A0','#A08060','#FFE0E0'], size:[2.5,4.5] },
  cherries:   { colors:['#E82040','#C01030','#FF4060','#A00820'], size:[2.5,4] },
  soccerBalls:{ colors:['#FFFFFF','#E8E8E8','#D0D0D0','#F8F8F8'], size:[2.5,4] },
  pixels:     { colors:['#FF00FF','#00FFFF','#FFFF00','#FF0000'], size:[3,5] },
  mushrooms:  { colors:['#E85040','#C03020','#FF7060','#A02020'], size:[2.5,4] },
  feathers:   { colors:['#FFFFFF','#E8E8F0','#D0D0E0','#F0F0FF'], size:[2.5,4.5] },
  skulls:     { colors:['#F0E8E0','#D0C8C0','#FFFFFF','#B0A8A0'], size:[2.5,4] },
  coffee:     { colors:['#6A4830','#8A6848','#4A2818','#A08868'], size:[2.5,4] },
  books:      { colors:['#C04040','#4060C0','#40C060','#C0A040'], size:[2.5,4.5] },
  wrenches:   { colors:['#C0C8D8','#9098A8','#E8E8F0','#5A6270'], size:[2.5,4] },
  aurora:     { colors:['#40FFB0','#4080FF','#C080FF','#40E0FF'], size:[3,5] },
  supernova:  { colors:['#FFFFFF','#FFE060','#FF8040','#FF4040'], size:[3,6] }
};

function spawnSpark(){
  const spark = currentSpark();
  if(!spark || spark.id === 'none') return;

  /* ✅ شرار مخصص بصورة */
  if(hasItemImage(spark)){
    if(sparkParticles.length > 55) return;
    sparkParticles.push({
      x: P.x - 10 - rand(0,6),
      y: P.y + rand(-6,6),
      vx: rand(-2.2,-0.6), vy: rand(-0.6,0.6),
      size: rand(12, 18),
      life: 1, decay: rand(0.014,0.028),
      item: spark,
      type: 'customItem',
      rot: rand(0,Math.PI*2), rotSpd: rand(-0.04,0.04)
    });
    return;
  }

  if(spark.imageData){
    if(sparkParticles.length > 55) return;
    sparkParticles.push({
      x: P.x - 10 - rand(0,6), y: P.y + rand(-6,6),
      vx: rand(-2.2,-0.6), vy: rand(-0.6,0.6),
      size: rand(10, 16), life: 1, decay: rand(0.014,0.028),
      imageData: spark.imageData,
      type: 'customImage', rot: rand(0,Math.PI*2), rotSpd: rand(-0.04,0.04)
    });
    return;
  }
  const palette = SPARK_PALETTES[spark.id];
  if(!palette) return;
  if(sparkParticles.length > 55) return;

  const px = P.x - 10 - rand(0,6);
  const py = P.y + rand(-6,6);

  const col = palette.colors[Math.floor(Math.random()*palette.colors.length)];
  const sz = rand(palette.size[0], palette.size[1]);

  sparkParticles.push({
    x: px, y: py,
    vx: rand(-2.2, -0.6),
    vy: rand(-0.6, 0.6),
    size: sz, color: col,
    life: 1, decay: rand(0.014, 0.028),
    rot: rand(0, Math.PI*2), rotSpd: rand(-0.06, 0.06),
    type: spark.id,
    phase: rand(0, Math.PI*2),
    wobble: rand(0.2, 0.7),
    grow: spark.id==='bubbles' ? 0.06 : 0,
    sparkHue: spark.id==='rainbow' ? Math.floor(Math.random()*360) : 0
  });
}

function updateSparks(){
  const spark = currentSpark();
  if(spark.id !== 'none' && G.state === 'PLAYING'){
    const rate = spark.id === 'digital' || spark.id === 'snow' ? 3
              : spark.id === 'bubbles' ? 4
              : spark.id === 'firefly' ? 8
              : spark.id === 'cosmic' || spark.id === 'gold' ? 3
              : 2;
    if(G.t % rate === 0) spawnSpark();
    if(G.t % rate === Math.floor(rate/2)) spawnSpark();
  }

  for(let i=sparkParticles.length-1;i>=0;i--){
    const p = sparkParticles[i];
    if(p.type === 'customImage'){ p.rot += p.rotSpd; }
    else if(p.type === 'sparks' || p.type === 'lightning'){ p.vy += 0.06; p.vx *= 0.97; }
    else if(p.type === 'bubbles'){ p.vy = -0.5 - Math.sin(G.t*0.05 + p.phase)*0.2; p.vx *= 0.99; p.size += p.grow; }
    else if(p.type === 'firefly' || p.type === 'cosmic' || p.type === 'gold'){
      p.vy += Math.sin(G.t*0.08 + p.phase)*0.04;
      p.vx += Math.cos(G.t*0.06 + p.phase)*0.02;
      p.vx *= 0.97;
    }
    else if(p.type === 'hearts'){ p.vy = -0.7 + Math.sin(G.t*0.1 + p.phase)*0.3; p.vx *= 0.97; }
    else if(p.type === 'notes'){ p.vy = -0.5 + Math.sin(G.t*0.12 + p.phase)*0.4; p.vx += Math.sin(G.t*0.08+p.phase)*0.06; p.vx *= 0.97; }
    else if(p.type === 'leaves' || p.type === 'petals'){ p.vy += 0.02; p.vx += Math.sin(G.t*0.1 + p.phase)*0.06; p.vx *= 0.98; }
    else if(p.type === 'snow'){ p.vy += 0.015; p.vx += Math.sin(G.t*0.08 + p.phase)*0.04; p.vx *= 0.98; }
    else if(p.type === 'stars'){ p.vy -= 0.02; p.vx *= 0.97; }
    else if(p.type === 'digital'){ p.vx *= 0.92; p.vy = Math.sin(G.t*0.2 + p.phase)*0.6; }
    else if(p.type === 'rainbow'){ p.vy += 0.04; p.vx *= 0.98; }

    p.x += p.vx; p.y += p.vy;
    p.rot += p.rotSpd;
    p.life -= p.decay;
    if(p.life <= 0 || p.x < -50 || p.y < -50 || p.y > H + 50){ sparkParticles.splice(i,1); }
  }
}

function drawSparks(){
  for(const p of sparkParticles){

    /* ✅ صورة مخصصة (imageData أو imagePath) */
    if(p.type === 'customImage' || p.type === 'customItem'){
      const img = p.item
        ? getItemImageEl(p.item)
        : getImageEl(p.imageData);

      if(img && img.complete && img.naturalWidth > 0){
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life*1.2));
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        const sz = p.size * Math.max(0.5, p.life);
        ctx.drawImage(img, -sz/2, -sz/2, sz, sz);
        ctx.restore();
      }
      continue;
    }
    if(p.type === 'customImage'){
      const img = getImageEl(p.imageData);
      if(img.complete && img.naturalWidth > 0){
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life*1.2));
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        const sz = p.size * Math.max(0.5, p.life);
        ctx.drawImage(img, -sz/2, -sz/2, sz, sz);
        ctx.restore();
      }
      continue;
    }
    const alpha = Math.max(0, Math.min(1, p.life*1.2));
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    const col = p.type === 'rainbow' ? `hsl(${p.sparkHue}, 85%, 65%)` : p.color;

    if(p.type === 'sparks' || p.type === 'lightning'){
      ctx.shadowColor = col; ctx.shadowBlur = 8;
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI*2); ctx.fill();
      ctx.globalAlpha = alpha*0.5;
      ctx.strokeStyle = col; ctx.lineWidth = p.size*0.7;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-p.size*1.8, -p.vy*0.5); ctx.stroke();
      ctx.shadowBlur = 0;
    } else if(p.type === 'bubbles'){
      ctx.strokeStyle = col; ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.beginPath(); ctx.arc(-p.size*0.35, -p.size*0.35, p.size*0.28, 0, Math.PI*2); ctx.fill();
    } else if(p.type === 'stars'){
      ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 6;
      ctx.beginPath();
      for(let i=0;i<8;i++){
        const a = (i/8)*Math.PI*2;
        const rr = i%2===0 ? p.size : p.size*0.4;
        const px = Math.cos(a)*rr, py = Math.sin(a)*rr;
        i===0 ? ctx.moveTo(px,py) : ctx.lineTo(px,py);
      }
      ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;
    } else if(p.type === 'hearts'){
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(0, p.size*0.4);
      ctx.bezierCurveTo(p.size*1.1, -p.size*0.5, p.size*0.6, -p.size*1.3, 0, -p.size*0.5);
      ctx.bezierCurveTo(-p.size*0.6, -p.size*1.3, -p.size*1.1, -p.size*0.5, 0, p.size*0.4);
      ctx.closePath(); ctx.fill();
    } else if(p.type === 'notes'){
      ctx.fillStyle = col;
      ctx.font = `bold ${p.size*3}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(Math.random() > 0.5 ? '♪' : '♫', 0, 0);
    } else if(p.type === 'leaves'){
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.ellipse(0, 0, p.size*1.4, p.size*0.65, 0, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(-p.size*1.3, 0); ctx.lineTo(p.size*1.3, 0); ctx.stroke();
    } else if(p.type === 'petals'){
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.ellipse(0, 0, p.size*1.5, p.size*0.75, 0, 0, Math.PI*2); ctx.fill();
    } else if(p.type === 'snow'){
      ctx.strokeStyle = col; ctx.lineWidth = 1.3;
      for(let i=0;i<6;i++){
        const a = (i/6)*Math.PI*2;
        ctx.beginPath(); ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a)*p.size, Math.sin(a)*p.size); ctx.stroke();
      }
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(0, 0, p.size*0.4, 0, Math.PI*2); ctx.fill();
    } else if(p.type === 'digital'){
      ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 5;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
      ctx.shadowBlur = 0;
    } else if(p.type === 'firefly'){
      const glow = ctx.createRadialGradient(0,0,0, 0,0,p.size*2.5);
      glow.addColorStop(0, col); glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(0, 0, p.size*2.5, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath(); ctx.arc(0, 0, p.size*0.5, 0, Math.PI*2); ctx.fill();
    } else if(p.type === 'rainbow'){
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.ellipse(0, 0, p.size*0.55, p.size*1.4, 0, 0, Math.PI*2); ctx.fill();
    } else if(p.type === 'cosmic'){
      ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(0, 0, p.size*0.7, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = col; ctx.lineWidth = 0.9;
      for(let i=0;i<4;i++){
        const a = (i/4)*Math.PI*2 + G.t*0.02;
        ctx.beginPath(); ctx.moveTo(0,0);
        ctx.lineTo(Math.cos(a)*p.size*1.6, Math.sin(a)*p.size*1.6); ctx.stroke();
      }
      ctx.shadowBlur = 0;
    } else if(p.type === 'gold'){
      ctx.fillStyle = col; ctx.shadowColor = '#FFF4C0'; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(0, 0, p.size*0.8, 0, Math.PI*2); ctx.fill();
      ctx.shadowBlur = 0;
    }
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
  const s = G.currentScene;
  if(!s.weather) return;

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

function spawnPlanetObstacle(){
  const planet = G.planet || PLANETS[0];
  const roll = Math.random();

  if(roll < 0.35){
    /* صخرة/صواعد كوكبية */
    const w = rand(40, 90);
    const h = rand(50, 120);
    obstacles.push({
      x: W + 40, w, h, type: 'block',
      isWalk: true,
      color: planet.ground, colorDark: planet.groundDark, accent: planet.accent,
      t: 0, passed: false, dead: false
    });
  } else if(roll < 0.55){
    /* فتحة أرضية إضافية */
    G.planetFloors.push({
      x: W + rand(300, 700),
      w: rand(120, 180),
      y: GROUND_Y,
      h: 400,
      type: 'planetHole',
      isPlanetHole: true,
      t: 0, passed: false, dead: false
    });
  } else if(roll < 0.75){
    /* أرضية عائمة تسقط */
    G.planetFloors.push({
      x: W + 40,
      w: rand(80, 150),
      y: GROUND_Y - rand(140, 320),
      h: 14,
      type: 'planetFloat',
      isWalk: true, isPlatform: true,
      isPlanetFloat: true,
      fallTimer: 90 + Math.floor(Math.random() * 180),
      fallDelay: 0, falling: false, fallVy: 0,
      solid: false,
      t: 0, passed: false, dead: false
    });
    spawnCoinCluster(W + 100, GROUND_Y - 200, 4);
  } else if(roll < 0.90){
    /* مجموعة عملات */
    spawnCoinCluster(W + 100, GROUND_Y - 80, Math.floor(rand(4, 8)));
  } else {
    /* تعزيز */
    spawnPowerup(W + 100, GROUND_Y - 100);
  }
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

function spawnSkyElevator(prog, s){
  const w = 110;
  const h = 16;
  const maxRise = WR(300, 700);
  const startY = GROUND_Y - WR(90, 150);

  /* ═══ المصعد نفسه ═══ */
  obstacles.push({
    x: W + 40, w, h, type:'platform',
    isWalk: true, isPlatform: true,
    isElevator: true,
    isSingleElevator: true,
    platformType: 'static',
    y: startY, baseY: startY, baseX: W + 40,
    riseSpeed: WR(1.4, 2.0),
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
    solid: false,
    crumbleTimer: 0, crumbled: false,
    bounceBoost: 0
  });

  /* ═══ أعلى نقطة يصل إليها المصعد ═══ */
  const topY = startY - maxRise - 30;
  const elevatorCenterX = W + 40 + w/2;

  /* ═══ سلسلة العملات على طول الصعود ═══ */
  const coinCount = Math.floor(maxRise / 60);
  for(let i = 1; i <= coinCount; i++){
    if(Math.random() < 0.7){
      coins.push({
        x: elevatorCenterX + rand(-30, 30),
        y: startY - i * 60,
        r: 8, t: 0, dead: false
      });
    }
  }

  /* ═══ كرة الطاقة في القمة ═══ */
  orbs.push({
    x: elevatorCenterX,
    y: topY,
    r: 16, t: 0, dead: false,
    color: '#FFD700',
    isSkyOrb: true,
    value: 15
  });

  /* ═══ مكافأة إضافية (تعزيز) أحياناً ═══ */
  if(Math.random() < 0.3){
    const skyPU = makePowerup(
      elevatorCenterX + 50,
      topY,
      { r: 16, isSkyReward: true }
    );
    if(skyPU) powerups.push(skyPU);
  }

  Sfx.play(660, 0.3, 'sine', 0.04, 1320);
}

function spawnSkyElevatorChain(prog, s){
  const count = Math.floor(WR(3, 6));
  const startX = W + 60;
const spacing = WR(180, 240) * getSpeedScale();
const baseRise = 200;

  let lastY = GROUND_Y - 100;

  for(let i = 0; i < count; i++){
    const w = 100 - i * 5;
    const h = 14;
    const riseAmount = baseRise + i * 60;

    obstacles.push({
      x: startX + i * spacing,
      w, h,
      type:'platform',
      isWalk: true,
      isPlatform: true,
      isElevator: true,
      isChainElevator: true,
      chainIndex: i,
      platformType: 'static',
      y: lastY,
      baseY: lastY,
      baseX: startX + i * spacing,
      riseSpeed: 1.5 + i * 0.15,
      maxRise: riseAmount,
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
      solid: false,
      crumbleTimer: 0, crumbled: false,
      bounceBoost: 0
    });

    lastY -= 60;
  }

  const endX = startX + (count - 1) * spacing + 200;
  const topY = lastY - baseRise - (count - 1) * 60 - 80;

  orbs.push({ x: endX, y: topY, r: 18, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 25 });
  orbs.push({ x: endX + 60, y: topY, r: 18, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 25 });

/* ✅ جديد */
const skyPU = makePowerup(W + 40 + w/2 + 50, topY, { r: 16, isSkyReward: true });
if(skyPU) powerups.push(skyPU);

  for(let i = 0; i < count - 1; i++){
    const midX = startX + i * spacing + spacing / 2;
    const midY = lastY + (i * 60) - 80;
    spawnCoinCluster(midX, midY, 4);
  }

  Sfx.play(880, 0.4, 'sine', 0.04, 1320);
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

function spawnStaircase(prog, s){
  const count = Math.floor(WR(4, 15));
  const isLong = count >= 9;

  const startX = W + 60;
  const startY = GROUND_Y - 100;

  const speedScale = getSpeedScale();
  const stepX = (isLong ? WR(85, 115) : WR(75, 105)) * speedScale;
  const stepY = isLong ? WR(60, 85) : WR(55, 75);

  const colors = [
    { color:'#80C0E8', dark:'#4080B0', accent:'#C0E0FF', glow:'#80D0FF' },
    { color:'#80D0A8', dark:'#408068', accent:'#C0FFE0', glow:'#80FFD0' },
    { color:'#B080E8', dark:'#6040A8', accent:'#E0C0FF', glow:'#D080FF' },
    { color:'#E8B34E', dark:'#A07028', accent:'#FFF4C0', glow:'#FFD060' },
    { color:'#FF80C0', dark:'#A03060', accent:'#FFD0E8', glow:'#FFA0D8' }
  ];

  let currentX = startX;
  let currentY = startY;
  let lastWidth = 90;   /* ✅ نتذكّر آخر عرض لاستخدامه في المكافأة العلوية */

  for(let i = 0; i < count; i++){
    const w = isLong ? WR(70, 90) - i * 1.2 : WR(75, 100) - i * 2;
    const h = 12;
    lastWidth = w;   /* ✅ خزّن العرض */

    currentX += i === 0 ? 0 : stepX;
    currentY -= stepY;
    currentY = Math.max(currentY, GROUND_Y - 1200);

    const colIdx = Math.min(Math.floor((i / count) * colors.length), colors.length - 1);
    const col = colors[colIdx];

    const isBouncy = isLong && i > 0 && i % 4 === 0;
    const isCrumble = isLong && i > 2 && !isBouncy && Math.random() < 0.15;
    const isMoving = !isLong && i > 2 && Math.random() < 0.2;

    obstacles.push({
      x: currentX, w, h,
      type: 'platform',
      isWalk: true, isPlatform: true,
      isStaircase: true,
      isStaircaseLong: isLong,
      stairIndex: i,
      stairTotal: count,
      platformType: isBouncy ? 'bouncy' : (isCrumble ? 'crumble' : (isMoving ? 'moving_x' : 'static')),
      y: currentY, baseY: currentY, baseX: currentX,
      amp: isMoving ? WR(15, 30) : 0,
      phase: WR(0, Math.PI*2),
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

  /* ═══ المكافأة العلوية بعد آخر منصة ═══ */
  const topX = currentX + stepX + 20;
  const topY = currentY - 50;
  const topCenterX = topX + lastWidth / 2;   /* ✅ استخدم آخر عرض */

  if(isLong){
    orbs.push({ x: topX, y: topY, r: 18, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 20 });
    orbs.push({ x: topX + 55, y: topY, r: 16, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 15 });
    orbs.push({ x: topX - 55, y: topY, r: 16, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 15 });

    /* ✅ تعزيز اختياري في القمة */
    const stairPU = makePowerup(topCenterX, topY - 60, { r: 18, isSkyReward: true });
    if(stairPU) powerups.push(stairPU);
  } else {
    const rewardRoll = Math.random();
    if(rewardRoll < 0.35){
      /* ✅ تعزيز في القمة */
      const stairPU = makePowerup(topCenterX, topY, { r: 16, isSkyReward: true });
      if(stairPU) powerups.push(stairPU);
    } else if(rewardRoll < 0.75){
      orbs.push({
        x: topX, y: topY, r: 16, t: 0, dead: false,
        color: '#FFD700', isSkyOrb: true, value: 12
      });
    } else {
      spawnCoinCluster(topX, topY, 8);
    }
  }

  Sfx.play(660, 0.3, 'sine', 0.03, 990);
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
    if(P.onGround || P.coyoteTimer > 0){
      P.vy = -12.5;
      P.onGround = false;
      P.coyoteTimer = 0;
      P.jumps = 1;
      P.jumpHeld = true;
      P.jumpHoldTimer = 0;
      spawnJumpEffect(P.x, P.y + P.r, G.currentScene.groundDark);
      Sfx.tap(); haptic(8);
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
    if(!P.onGround && P.jumps < 2){
      P.vy = Math.min(P.vy, -9.5);
      P.jumps++;
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

/* ─────────────────────────────────────────────────────────────
   مقياس الارتفاع العمودي
   يظهر في WALK فقط عندما يبتعد اللاعب عن مستوى الأرض
   ───────────────────────────────────────────────────────────── */
const GAUGE_RANGE = { min: -50, max: 50 };

function updateAltitudeGauge(){
  const gauge = document.getElementById('altitude-gauge');
  if(!gauge) return;

  /* إخفاء في الأنماط غير الأرضية وفي ASCEND */
  if(G.mode !== 'WALK'){
    gauge.classList.remove('show');
    return;
  }

  const altM = getPlayerAltitude() / PIXELS_PER_METER;

  /* إخفاء عندما نكون قريبين جداً من 0 */
  if(Math.abs(altM) < 3){
    gauge.classList.remove('show');
    return;
  }

  gauge.classList.add('show');

  /* حساب موضع المؤشر (0 = أسفل، 1 = أعلى) */
  const t = clamp((altM - GAUGE_RANGE.min) / (GAUGE_RANGE.max - GAUGE_RANGE.min), 0, 1);
  const marker = document.getElementById('gauge-marker');
  if(marker) marker.style.bottom = (t * 100) + '%';

  /* قراءة الارتفاع */
  const valEl = document.getElementById('gauge-val');
  if(valEl){
    const rounded = Math.round(altM);
    valEl.textContent = (rounded > 0 ? '+' : '') + rounded;
  }

  /* لون مؤشر حسب المنطقة */
  const readout = document.getElementById('gauge-readout');
  if(readout){
    let col = '#FFFFFF';
    if(altM >= 20) col = '#A8D8FF';
    else if(altM <= -20) col = '#FF8060';
    readout.style.borderColor = col + '80';
    readout.style.boxShadow = `0 4px 14px rgba(0,0,0,.25), 0 0 0 1px ${col}40`;
  }
}

/* ─────────────────────────────────────────────────────────────
   نداء موحّد من حلقة اللعب
   ───────────────────────────────────────────────────────────── */
function updateHudOverlays(){
  updateContextBanner();
  updateAltitudeGauge();
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
  if(G.realm === REALM.SKY && alt >= SKY_REALM.layers[SKY_REALM.layers.length-1].from + PLANET_REALM_ENTER){
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
  if(G.activePowerups.slow)     slowMul *= 0.55;
  if(G.activePowerups.timeWarp) slowMul *= 0.35;

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

  updateSceneTransition();
  updateWeather();

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
  updateCapePhysics();
  updateCompanion();

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
          if(P.y > H + 200){
            exitPlanetRealm();
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

      if(!f.isPlanetHole){
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
  const doubleOn = G.activePowerups.double !== undefined;
  const coinMul = doubleOn ? 2 : 1;

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
  P.cape = [];
  const segCount = 10;
  for(let i=0;i<segCount;i++){
    P.cape.push({ x: P.x - i*4, y: P.y + i*1.5 });
  }
}

function updateCapePhysics(){
  if(!P.cape) { initCape(); return; }
  const cape = Save.data.cosmetics.current.cape;
  if(cape === 'none') return;

  const isScarf = cape.startsWith('scarf');
  const segCount = isScarf ? 7 : 10;
  if(P.cape.length !== segCount){
    P.cape = [];
    for(let i=0;i<segCount;i++) P.cape.push({ x: P.x, y: P.y });
  }

  const segLen = P.r * (isScarf ? 0.45 : 0.62);
  const anchorX = P.x - P.r * 0.75;
  const anchorY = P.y - P.r * 0.1;

  P.cape[0].x = anchorX;
  P.cape[0].y = anchorY;

  const windX = -0.4 - G.speed * 0.15;
  const windY = 0.15 + G.speed * 0.03;
  const wobble = Math.sin(G.t * 0.15) * 0.35;

  for(let i=1;i<P.cape.length;i++){
    const seg = P.cape[i];
    const prev = P.cape[i-1];

    seg.x += windX;
    seg.y += windY + wobble * (i / P.cape.length);

    const dx = seg.x - prev.x;
    const dy = seg.y - prev.y;
    const d = Math.hypot(dx, dy) || 1;
    const ratio = segLen / d;
    seg.x = prev.x + dx * ratio;
    seg.y = prev.y + dy * ratio;
  }
}

function drawCape(c, r, cape, t, ox, oy){
  if(!cape || typeof cape !== 'object') return;
  if(!cape.id || cape.id === 'none') return;
  if(!P.cape || !Array.isArray(P.cape)) return;
  if(typeof c !== 'object' || !c) return;
  if(typeof r !== 'number' || r <= 0) return;

  ox = ox || 0; oy = oy || 0;

  /* ✅ عباءة مخصصة بصورة */
  if(hasItemImage(cape)){
    const img = getItemImageEl(cape);
    if(img && img.complete && img.naturalWidth > 0){
      const size = r * 3.5;
      const segs = P.cape;
      const tail = segs[segs.length - 1] || { x: P.x, y: P.y };
      c.save();
      const bob = Math.sin(t * 0.1) * 2;
      c.drawImage(img,
        tail.x - ox - size/2,
        tail.y - oy - size/2 + bob,
        size, size);
      c.restore();
      return;
    }
  }
  const kind = cape.id;
  const segs = P.cape;

  const isScarf = kind.startsWith('scarf');
  const isWing = kind.startsWith('cape_') && ['cape_butterfly','cape_dragon','cape_angel','cape_demon'].includes(kind);
  const baseW = isScarf ? r * 0.5 : isWing ? r * 1.4 : r * 0.95;

  let col1 = '#E04040', col2 = '#A02030';
  if(kind === 'scarf_red'){ col1='#E84848'; col2='#A02030'; }
  else if(kind === 'scarf_blue'){ col1='#5090E8'; col2='#2040A0'; }
  else if(kind === 'scarf_gold'){ col1='#E8B34E'; col2='#A07028'; }
  else if(kind === 'cape_hero'){ col1='#C03030'; col2='#801818'; }
  else if(kind === 'cape_dark'){ col1='#2A1A30'; col2='#100810'; }
  else if(kind === 'cape_royal'){ col1='#5A30A0'; col2='#301860'; }
  else if(kind === 'cape_fire'){ col1='#FF8040'; col2='#8A2008'; }
  else if(kind === 'cape_ice'){ col1='#A0E0FF'; col2='#4080C0'; }
  else if(kind === 'cape_wind'){ col1='#E8F4FF'; col2='#88B0D0'; }
  else if(kind === 'cape_water'){ col1='#40A8E0'; col2='#104060'; }
  else if(kind === 'cape_leaf'){ col1='#7BC44C'; col2='#2A5020'; }
  else if(kind === 'cape_neon'){ col1='#00FFD8'; col2='#006090'; }
  else if(kind === 'cape_toxic'){ col1='#80FF40'; col2='#206020'; }
  else if(kind === 'cape_blood'){ col1='#C03030'; col2='#5A0808'; }
  else if(kind === 'cape_holy'){ col1='#FFF8C0'; col2='#E8B34E'; }
  else if(kind === 'cape_void'){ col1='#301050'; col2='#08000A'; }
  else if(kind === 'cape_crystal'){ col1='#A0D8FF'; col2='#4060A0'; }

  c.save();

  if(isWing){
    /* ═══ أجنحة ═══ */
    const flap = Math.sin(t*0.12) * 0.15;
    const wingType = kind.replace('cape_','');

    for(const side of [-1, 1]){
      c.save();
      c.translate(side * r * 0.7, 0);
      c.rotate(side * (0.3 + flap));
      const wc = wingType === 'angel' ? '#FFF8E0' :
                 wingType === 'dragon' ? '#3A8040' :
                 wingType === 'demon' ? '#3A0820' :
                 /* butterfly */ '#FF80C0';
      c.fillStyle = wc;
      c.shadowColor = wc; c.shadowBlur = 6;
      for(let i=0;i<4;i++){
        const sz = r * (1.1 - i*0.15);
        c.beginPath();
        c.ellipse(side * i * r * 0.2, i*r*0.1, sz, r*0.28, side*0.2, 0, Math.PI*2);
        c.fill();
      }
      c.shadowBlur = 0;
      if(wingType === 'butterfly'){
        c.fillStyle = 'rgba(255,255,255,0.6)';
        for(let i=0;i<3;i++){
          c.beginPath();
          c.arc(side * (i*r*0.3), i*r*0.1, r*0.13, 0, Math.PI*2);
          c.fill();
        }
      }
      c.restore();
    }
  }
  else if(kind === 'cape_rainbow'){
    for(let i=0;i<segs.length;i++){
      const p = i/segs.length;
      const hue = (t*4 + i*28) % 360;
      const sz = baseW * (1 - p * 0.55);
      c.fillStyle = `hsl(${hue}, 80%, 58%)`;
      c.shadowColor = c.fillStyle; c.shadowBlur = 8;
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.5, 0, Math.PI*2);
      c.fill();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'cape_shadow'){
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const alpha = 0.85 * (1 - p * 0.85);
      const sz = baseW * (1 - p * 0.5);
      c.fillStyle = `rgba(20,10,35,${alpha})`;
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.5, 0, Math.PI*2);
      c.fill();
    }
  }
  else if(kind === 'cape_galaxy'){
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const sz = baseW * (1 - p * 0.5);
      const col = i < 3 ? '#4A2880' : mixColor('#4A2880', '#100820', p);
      c.fillStyle = col;
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.5, 0, Math.PI*2);
      c.fill();
    }
    for(let i=0;i<segs.length;i+=2){
      const twinkle = 0.5 + Math.sin(t * 0.12 + i) * 0.5;
      c.fillStyle = '#FFFFFF';
      c.globalAlpha = twinkle * 0.85;
      c.beginPath();
      c.arc(segs[i].x - ox + Math.sin(t*0.1 + i*2)*3, segs[i].y - oy + Math.cos(t*0.1 + i*2)*3, 1.3, 0, Math.PI*2);
      c.fill();
    }
    c.globalAlpha = 1;
  }
  else if(kind === 'cape_cosmic'){
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const hue = (t*2 + p*120) % 360;
      c.fillStyle = `hsla(${hue}, 70%, ${30 - p*15}%, ${0.9 - p*0.4})`;
      c.beginPath();
      const sz = baseW * (1 - p * 0.6);
      c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.55, 0, Math.PI*2);
      c.fill();
    }
    for(let i=0;i<segs.length;i++){
      if(i%2===0){
        const col = `hsl(${(t*4 + i*40)%360}, 80%, 65%)`;
        c.fillStyle = col;
        c.shadowColor = col; c.shadowBlur = 10;
        c.beginPath();
        c.arc(segs[i].x - ox, segs[i].y - oy, r*0.13, 0, Math.PI*2);
        c.fill();
      }
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'cape_prismatic'){
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const hue = (t*8 + i*40) % 360;
      c.fillStyle = `hsl(${hue}, 85%, 60%)`;
      c.shadowColor = c.fillStyle; c.shadowBlur = 8;
      const sz = baseW * (1 - p * 0.55);
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.5, 0, Math.PI*2);
      c.fill();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'cape_god'){
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const pl = 0.7 + Math.sin(t*0.12 + i*0.3)*0.3;
      c.fillStyle = `rgba(255,248,192,${(0.9 - p*0.6) * pl})`;
      c.shadowColor = '#FFE060'; c.shadowBlur = 12*pl;
      const sz = baseW * (1 - p * 0.55);
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.55, 0, Math.PI*2);
      c.fill();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'cape_fire'){
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const hue = 40 - p*30;
      const sz = baseW * (1 - p * 0.55);
      const grad = c.createRadialGradient(segs[i].x - ox, segs[i].y - oy, 0, segs[i].x - ox, segs[i].y - oy, sz*0.7);
      grad.addColorStop(0, `hsl(${hue}, 100%, 75%)`);
      grad.addColorStop(0.6, `hsl(${hue-15}, 100%, 55%)`);
      grad.addColorStop(1, 'rgba(200,60,10,0)');
      c.fillStyle = grad;
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy, sz*0.7, 0, Math.PI*2);
      c.fill();
    }
  }
  else if(kind === 'cape_ice' || kind === 'cape_crystal'){
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const sz = baseW * (1 - p * 0.55);
      c.fillStyle = i < 3 ? '#E0F4FF' : mixColor('#A0D8FF', '#4060A0', p);
      c.shadowColor = '#80D8FF'; c.shadowBlur = 6;
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.5, 0, Math.PI*2);
      c.fill();
    }
    c.shadowBlur = 0;
    for(let i=0;i<segs.length;i+=3){
      c.strokeStyle = 'rgba(255,255,255,0.6)'; c.lineWidth = 1;
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy, r*0.2, 0, Math.PI*2);
      c.stroke();
    }
  }
  else if(kind === 'cape_wind'){
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const sz = baseW * (1 - p * 0.5);
      c.strokeStyle = `rgba(220,240,255,${0.7 - p*0.5})`;
      c.lineWidth = 2;
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.5, 0, Math.PI*2);
      c.stroke();
    }
  }
  else if(kind === 'cape_water'){
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const sz = baseW * (1 - p * 0.5);
      const grad = c.createRadialGradient(segs[i].x - ox, segs[i].y - oy, 0, segs[i].x - ox, segs[i].y - oy, sz*0.7);
      grad.addColorStop(0, '#80E0FF');
      grad.addColorStop(0.7, '#2080C0');
      grad.addColorStop(1, 'rgba(20,60,90,0)');
      c.fillStyle = grad;
      c.beginPath(); c.arc(segs[i].x - ox, segs[i].y - oy, sz*0.7, 0, Math.PI*2); c.fill();
    }
  }
  else if(kind === 'cape_neon'){
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const sz = baseW * (1 - p * 0.5);
      c.fillStyle = '#0A2828';
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.5, 0, Math.PI*2);
      c.fill();
      const col = `hsl(${(t*6 + i*50)%360}, 100%, 60%)`;
      c.strokeStyle = col; c.lineWidth = 2;
      c.shadowColor = col; c.shadowBlur = 8;
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.5, 0, Math.PI*2);
      c.stroke();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'cape_leaf'){
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const sz = baseW * (1 - p * 0.5);
      c.fillStyle = ['#7BC44C','#5EA041','#A8E84C'][i%3];
      c.beginPath();
      c.ellipse(segs[i].x - ox, segs[i].y - oy, sz*0.7, sz*0.4, i*0.3, 0, Math.PI*2);
      c.fill();
    }
  }
  else if(kind === 'cape_toxic' || kind === 'cape_blood'){
    const core = kind === 'cape_blood' ? '#C03030' : '#80FF40';
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const sz = baseW * (1 - p * 0.5);
      c.fillStyle = i < 3 ? core : mixColor(core, '#200808', p);
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.5, 0, Math.PI*2);
      c.fill();
    }
    for(let i=2;i<segs.length;i+=3){
      c.fillStyle = core;
      c.globalAlpha = 0.6;
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy + r*0.2 + Math.sin(t*0.15+i)*2, r*0.08, 0, Math.PI*2);
      c.fill();
    }
    c.globalAlpha = 1;
  }
  else if(kind === 'cape_holy'){
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const pl = 0.7 + Math.sin(t*0.1 + i*0.3)*0.3;
      c.fillStyle = `rgba(255,248,192,${(0.9 - p*0.7)*pl})`;
      c.shadowColor = '#FFE060'; c.shadowBlur = 8;
      const sz = baseW * (1 - p * 0.55);
      c.beginPath(); c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.55, 0, Math.PI*2); c.fill();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'cape_void'){
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const sz = baseW * (1 - p * 0.55);
      c.fillStyle = `rgba(10,0,20,${0.95 - p*0.5})`;
      c.beginPath(); c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.55, 0, Math.PI*2); c.fill();
    }
    /* حافة بنفسجية متوهجة */
    c.strokeStyle = 'rgba(160,64,255,0.7)'; c.lineWidth = 2;
    c.shadowColor = '#A040FF'; c.shadowBlur = 12;
    c.beginPath();
    c.moveTo(segs[0].x - ox, segs[0].y - oy);
    for(let i=1;i<segs.length;i++) c.lineTo(segs[i].x - ox, segs[i].y - oy);
    c.stroke();
    c.shadowBlur = 0;
  }
  else {
    /* افتراضي: عباءة/وشاح عادية */
    for(let i=segs.length - 1; i >= 0; i--){
      const p = i/segs.length;
      const sz = baseW * (1 - p * 0.55);
      const col = i < 2 ? col1 : mixColor(col1, col2, p);
      c.fillStyle = col;
      c.beginPath();
      c.arc(segs[i].x - ox, segs[i].y - oy, sz * 0.5, 0, Math.PI*2);
      c.fill();
    }
    if(!isScarf && segs.length > 2){
      c.fillStyle = 'rgba(255,255,255,0.18)';
      for(let i=1;i<segs.length-1;i+=2){
        const sz = baseW * (1 - i/segs.length * 0.5) * 0.3;
        c.beginPath();
        c.arc(segs[i].x - ox, segs[i].y - oy - 2, sz, 0, Math.PI*2);
        c.fill();
      }
    }
  }

  c.restore();
}

/* ============================================================
   ==================== AURA (هالة دائمة) ====================
   ============================================================ */
function drawAura(c, r, aura, t){
  /* ═══ حماية شاملة ═══ */
  if(!aura || typeof aura !== 'object') return;
  if(!aura.id || aura.id === 'none') return;
  if(typeof c !== 'object' || !c) return;
  if(typeof r !== 'number' || r <= 0 || !isFinite(r)) return;
  if(typeof t !== 'number' || !isFinite(t)) return;

  /* ✅ هالة مخصصة بصورة */
  if(hasItemImage(aura)){
    const img = getItemImageEl(aura);
    if(img && img.complete && img.naturalWidth > 0){
      const size = r * 4.5;
      c.save();
      c.globalAlpha = 0.85;
      const pulse = 1 + Math.sin(t * 0.08) * 0.08;
      c.drawImage(img, -size/2, -size/2, size * pulse, size * pulse);
      c.restore();
      return;
    }
  }

  /* ═══════════════════════════════════════════════════
     ✅ الإصلاح: تعريف kind قبل أي استخدام
     ═══════════════════════════════════════════════════ */
  const kind = aura.id;
  if(kind === 'none') return;

  const pulse = 1 + Math.sin(t * 0.08) * 0.1;
  const aur = r * 2.3 * pulse;

  const basic = {
    amber: { c1:'#FFB060', c2:'#FF8020', c3:'#FFE090' },
    cyan:  { c1:'#80E8F0', c2:'#40A0C0', c3:'#E0FFFF' },
    holy:  { c1:'#FFF8D0', c2:'#FFD060', c3:'#FFFFFF' },
    void:  { c1:'#C080FF', c2:'#6020A0', c3:'#FFC0FF' },
    toxic: { c1:'#80FF40', c2:'#20A020', c3:'#C0FF80' },
    blood: { c1:'#FF4040', c2:'#8A0808', c3:'#FFB0B0' },
    electricBlue: { c1:'#60C0FF', c2:'#2060C0', c3:'#C0E8FF' },
    divine: { c1:'#FFF8C0', c2:'#FFD040', c3:'#FFFFFF' }
  };

  if(basic[kind]){
    const p = basic[kind];
    const grad = c.createRadialGradient(0,0,r*0.7, 0,0,aur);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.45, p.c1);
    grad.addColorStop(0.75, p.c2);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    c.globalAlpha = 0.45;
    c.fillStyle = grad;
    c.beginPath(); c.arc(0,0,aur,0,Math.PI*2); c.fill();
    c.globalAlpha = 1;

    c.strokeStyle = p.c3; c.lineWidth = 2.2; c.globalAlpha = 0.7;
    c.beginPath();
    c.arc(0, 0, aur*0.85, t*0.025, t*0.025 + Math.PI*1.55);
    c.stroke();
    c.globalAlpha = 0.4;
    c.beginPath();
    c.arc(0, 0, aur*0.85, t*0.025 + Math.PI, t*0.025 + Math.PI*2);
    c.stroke();
    c.globalAlpha = 1;

    for(let i=0;i<4;i++){
      const a = t*0.03 + (i/4)*Math.PI*2;
      const dist = aur * 0.9;
      c.fillStyle = p.c3; c.globalAlpha = 0.7;
      c.beginPath();
      c.arc(Math.cos(a)*dist, Math.sin(a)*dist, 2.2, 0, Math.PI*2);
      c.fill();
    }
    c.globalAlpha = 1;
  }
  else if(kind === 'fire'){
    for(let i=0;i<10;i++){
      const a = t*0.05 + (i/10)*Math.PI*2;
      const dist = r * 1.85 + Math.sin(t*0.12 + i) * 3;
      const px = Math.cos(a) * dist, py = Math.sin(a) * dist;
      const sz = 4.5 + Math.sin(t*0.15 + i) * 1.6;
      const grad = c.createRadialGradient(px, py, 0, px, py, sz*2.2);
      grad.addColorStop(0, '#FFF8C0'); grad.addColorStop(0.4, '#FFB060'); grad.addColorStop(1, 'rgba(232,88,56,0)');
      c.fillStyle = grad;
      c.beginPath(); c.arc(px, py, sz*2.2, 0, Math.PI*2); c.fill();
    }
  }
  else if(kind === 'ice'){
    for(let i=0;i<8;i++){
      const a = t*0.035 + (i/8)*Math.PI*2;
      const dist = r * 1.95;
      const px = Math.cos(a) * dist, py = Math.sin(a) * dist;
      c.save(); c.translate(px, py); c.rotate(a + t*0.04);
      c.fillStyle = 'rgba(160,224,248,0.9)';
      c.shadowColor = '#A0E0F8'; c.shadowBlur = 6;
      for(let k=0;k<3;k++){
        const ak = (k/3)*Math.PI*2;
        c.beginPath(); c.ellipse(0, 0, r*0.16, r*0.035, ak, 0, Math.PI*2); c.fill();
      }
      c.restore();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'lightning'){
    for(let i=0;i<7;i++){
      const a = t*0.08 + (i/7)*Math.PI*2;
      const dist = r * 2.05;
      const px = Math.cos(a) * dist, py = Math.sin(a) * dist;
      c.strokeStyle = '#A0E0FF'; c.lineWidth = 1.6;
      c.shadowColor = '#80D0FF'; c.shadowBlur = 10;
      c.beginPath();
      c.moveTo(px * 0.55, py * 0.55);
      c.lineTo(px*0.55 + (Math.random()-0.5)*10, py*0.55 + (Math.random()-0.5)*10);
      c.lineTo(px, py);
      c.stroke();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'shadow' || kind === 'phantom'){
    const grad = c.createRadialGradient(0,0,r*0.5, 0,0,aur);
    grad.addColorStop(0, 'rgba(80,40,90,0.42)');
    grad.addColorStop(0.55, 'rgba(40,20,60,0.3)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = grad;
    c.beginPath(); c.arc(0,0,aur,0,Math.PI*2); c.fill();
    for(let i=0;i<4;i++){
      const a = t*0.04 + (i/4)*Math.PI*2;
      const dist = r*1.6 + Math.sin(t*0.1 + i)*4;
      c.fillStyle = 'rgba(20,8,30,0.75)';
      c.beginPath();
      c.ellipse(Math.cos(a)*dist, Math.sin(a)*dist, r*0.45, r*0.16, a, 0, Math.PI*2);
      c.fill();
    }
  }
  else if(kind === 'rainbow' || kind === 'prisma'){
    const hue = (t*3) % 360;
    const grad = c.createRadialGradient(0,0,r*0.7, 0,0,aur);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.5, `hsla(${hue}, 85%, 65%, 0.6)`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = grad;
    c.beginPath(); c.arc(0,0,aur,0,Math.PI*2); c.fill();
    for(let i=0;i<8;i++){
      const a = t*0.06 + (i/8)*Math.PI*2;
      const dist = r * 1.85;
      const col = `hsl(${(hue + i*45) % 360}, 85%, 65%)`;
      c.fillStyle = col;
      c.shadowColor = col; c.shadowBlur = 12;
      c.beginPath();
      c.arc(Math.cos(a)*dist, Math.sin(a)*dist, 3.5, 0, Math.PI*2);
      c.fill();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'galaxy' || kind === 'cosmicAura'){
    const grad = c.createRadialGradient(0,0,r*0.5, 0,0,aur*1.15);
    grad.addColorStop(0, 'rgba(80,40,160,0.38)');
    grad.addColorStop(0.6, 'rgba(40,20,80,0.22)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = grad;
    c.beginPath(); c.arc(0,0,aur*1.15,0,Math.PI*2); c.fill();
    for(let i=0;i<18;i++){
      const a = (i * 1.7 + t*0.012) % (Math.PI*2);
      const dist = r * (1.4 + (i % 5) * 0.18);
      const px = Math.cos(a) * dist, py = Math.sin(a) * dist;
      const twinkle = 0.5 + Math.sin(t*0.18 + i) * 0.5;
      c.fillStyle = i % 3 === 0 ? '#FFD0FF' : '#FFFFFF';
      c.globalAlpha = twinkle * 0.85;
      c.beginPath(); c.arc(px, py, 1.2 + twinkle*1.8, 0, Math.PI*2); c.fill();
    }
    c.globalAlpha = 1;
  }
  else if(kind === 'earth'){
    for(let i=0;i<8;i++){
      const a = (i/8)*Math.PI*2 + t*0.02;
      const dist = r * 1.9;
      c.fillStyle = ['#A07840','#7A5020','#604018','#8A6838'][i%4];
      c.beginPath();
      c.arc(Math.cos(a)*dist, Math.sin(a)*dist + Math.sin(t*0.1+i)*3, r*0.12, 0, Math.PI*2);
      c.fill();
    }
  }
  else if(kind === 'water'){
    for(let i=0;i<6;i++){
      const a = t*0.04 + (i/6)*Math.PI*2;
      const dist = r*1.85;
      c.fillStyle = 'rgba(120,200,255,0.75)';
      c.beginPath();
      c.ellipse(Math.cos(a)*dist, Math.sin(a)*dist, r*0.12, r*0.18, a, 0, Math.PI*2);
      c.fill();
    }
  }
  else if(kind === 'wind'){
    for(let i=0;i<5;i++){
      const a = t*0.08 + (i/5)*Math.PI*2;
      const dist = r*1.9;
      c.strokeStyle = 'rgba(200,230,255,0.7)'; c.lineWidth = 1.5;
      c.beginPath();
      c.arc(0, 0, dist, a, a + 0.5);
      c.stroke();
    }
  }
  else if(kind === 'nature'){
    for(let i=0;i<7;i++){
      const a = t*0.03 + (i/7)*Math.PI*2;
      const dist = r*1.85;
      c.fillStyle = ['#7BC44C','#5EA041','#FF80A0','#FFE060'][i%4];
      c.beginPath();
      c.ellipse(Math.cos(a)*dist, Math.sin(a)*dist, r*0.15, r*0.08, a, 0, Math.PI*2);
      c.fill();
    }
  }
  else if(kind === 'smokeAura'){
    for(let i=0;i<5;i++){
      const a = t*0.04 + (i/5)*Math.PI*2;
      const dist = r*1.9;
      c.fillStyle = `rgba(120,120,130,${0.4 + Math.sin(t*0.1+i)*0.2})`;
      c.beginPath();
      c.arc(Math.cos(a)*dist, Math.sin(a)*dist - Math.sin(t*0.1+i)*5, r*0.28, 0, Math.PI*2);
      c.fill();
    }
  }
  else if(kind === 'pixelAura'){
    for(let i=0;i<10;i++){
      const a = (i/10)*Math.PI*2 + t*0.02;
      const dist = r*1.9;
      c.fillStyle = ['#FF00FF','#00FFFF','#FFFF00','#FF0000'][i%4];
      c.fillRect(Math.cos(a)*dist - r*0.1, Math.sin(a)*dist - r*0.1, r*0.2, r*0.2);
    }
  }
  else if(kind === 'runes'){
    const chars = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ'];
    c.font = `bold ${r*0.5}px sans-serif`;
    c.textAlign = 'center'; c.textBaseline = 'middle';
    for(let i=0;i<6;i++){
      const a = t*0.04 + (i/6)*Math.PI*2;
      const dist = r*1.9;
      c.fillStyle = `hsl(${(t*3 + i*40)%360}, 80%, 65%)`;
      c.shadowColor = c.fillStyle; c.shadowBlur = 8;
      c.fillText(chars[i%chars.length], Math.cos(a)*dist, Math.sin(a)*dist);
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'music'){
    c.font = `bold ${r*0.5}px sans-serif`;
    c.textAlign = 'center'; c.textBaseline = 'middle';
    for(let i=0;i<5;i++){
      const a = t*0.05 + (i/5)*Math.PI*2;
      const dist = r*1.9;
      c.fillStyle = ['#A080FF','#FF80A0','#80FFB0','#FFE060'][i%4];
      c.fillText(i%2===0?'♪':'♫', Math.cos(a)*dist, Math.sin(a)*dist);
    }
  }
  else if(kind === 'candyAura'){
    for(let i=0;i<8;i++){
      const a = t*0.05 + (i/8)*Math.PI*2;
      const dist = r*1.9;
      c.fillStyle = ['#FF60A0','#FFB040','#60E0FF','#A0FF60'][i%4];
      c.beginPath();
      c.ellipse(Math.cos(a)*dist, Math.sin(a)*dist, r*0.13, r*0.09, a, 0, Math.PI*2);
      c.fill();
    }
  }
}

/* ============================================================
   ==================== CROWN (تاج) ==========================
   ============================================================ */
function drawCrown(c, r, crown, t){
  /* ═══ حماية شاملة ═══ */
  if(!crown || typeof crown !== 'object') return;
  if(!crown.id || crown.id === 'none') return;
  if(typeof c !== 'object' || !c) return;
  if(typeof r !== 'number' || r <= 0 || !isFinite(r)) return;
  if(typeof t !== 'number' || !isFinite(t)) return;

  const kind = crown.id;

  /* ✅ تاج مخصص بصورة */
  if(hasItemImage(crown)){
    const img = getItemImageEl(crown);
    if(img && img.complete && img.naturalWidth > 0){
      const size = r * 1.8;
      c.drawImage(img, -size/2, -r*1.9, size, size);
      return;
    }
  }

  const cy = -r * 1.08;

  if(kind === 'bronze' || kind === 'silver' || kind === 'gold' || kind === 'diamond'){
    const palettes = {
      bronze:  { base:'#B8763E', light:'#E8A870', gem:'#FFD8A8' },
      silver:  { base:'#A8B0C0', light:'#D8E0F0', gem:'#FFFFFF' },
      gold:    { base:'#E8B34E', light:'#FFF4C0', gem:'#FF6088' },
      diamond: { base:'#80D0E8', light:'#E0F8FF', gem:'#FFFFFF' }
    };
    const p = palettes[kind];

    c.fillStyle = p.base;
    c.beginPath();
    c.moveTo(-r*0.7, cy + r*0.25);
    c.lineTo(-r*0.7, cy - r*0.08);
    c.lineTo(-r*0.42, cy - r*0.08);
    c.lineTo(-r*0.30, cy - r*0.42);
    c.lineTo(0, cy - r*0.15);
    c.lineTo(r*0.30, cy - r*0.42);
    c.lineTo(r*0.42, cy - r*0.08);
    c.lineTo(r*0.7, cy - r*0.08);
    c.lineTo(r*0.7, cy + r*0.25);
    c.closePath();
    c.fill();

    c.fillStyle = p.light;
    c.beginPath();
    c.moveTo(-r*0.6, cy + r*0.18);
    c.lineTo(-r*0.6, cy - r*0.02);
    c.lineTo(r*0.6, cy - r*0.02);
    c.lineTo(r*0.6, cy + r*0.18);
    c.closePath();
    c.fill();

    c.fillStyle = p.gem;
    c.beginPath();
    c.arc(0, cy - r*0.13, r*0.11, 0, Math.PI*2);
    c.fill();

    if(kind === 'gold' || kind === 'diamond'){
      c.beginPath();
      c.arc(-r*0.42, cy + r*0.02, r*0.075, 0, Math.PI*2);
      c.arc(r*0.42, cy + r*0.02, r*0.075, 0, Math.PI*2);
      c.fill();
      c.fillStyle = 'rgba(255,255,255,0.9)';
      c.beginPath();
      c.arc(-r*0.5, cy + r*0.1, r*0.06, 0, Math.PI*2);
      c.fill();
    }

  } else if(kind === 'leaf'){
    for(let i=0;i<5;i++){
      const a = -1.0 + i*0.5;
      c.save();
      c.translate(0, cy + r*0.18);
      c.rotate(a);
      c.fillStyle = i % 2 === 0 ? '#5EA041' : '#7BC44C';
      c.beginPath();
      c.ellipse(0, -r*0.35, r*0.14, r*0.34, 0, 0, Math.PI*2);
      c.fill();
      c.restore();
    }
    c.strokeStyle = 'rgba(0,0,0,0.2)';
    c.lineWidth = 0.8;
    c.beginPath();
    c.arc(0, cy + r*0.15, r*0.35, Math.PI, Math.PI*2);
    c.stroke();

  } else if(kind === 'flower'){
    for(let i=0;i<6;i++){
      const a = (i/6)*Math.PI*2;
      c.fillStyle = i % 2 === 0 ? '#FF80A0' : '#FFB0C0';
      c.beginPath();
      c.ellipse(Math.cos(a)*r*0.26, cy + r*0.05 + Math.sin(a)*r*0.26, r*0.16, r*0.1, a, 0, Math.PI*2);
      c.fill();
    }
    c.fillStyle = '#FFE060';
    c.beginPath();
    c.arc(0, cy + r*0.05, r*0.13, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#E8B34E';
    c.beginPath();
    c.arc(0, cy + r*0.05, r*0.06, 0, Math.PI*2);
    c.fill();

  } else if(kind === 'horns'){
    c.fillStyle = '#2A1818';
    c.beginPath();
    c.moveTo(-r*0.5, cy + r*0.25);
    c.quadraticCurveTo(-r*0.95, cy - r*0.5, -r*0.65, cy - r*0.95);
    c.quadraticCurveTo(-r*0.55, cy - r*0.4, -r*0.25, cy + r*0.1);
    c.closePath();
    c.fill();
    c.beginPath();
    c.moveTo(r*0.5, cy + r*0.25);
    c.quadraticCurveTo(r*0.95, cy - r*0.5, r*0.65, cy - r*0.95);
    c.quadraticCurveTo(r*0.55, cy - r*0.4, r*0.25, cy + r*0.1);
    c.closePath();
    c.fill();
    c.fillStyle = 'rgba(255,180,180,0.4)';
    c.beginPath();
    c.moveTo(-r*0.55, cy - r*0.15);
    c.lineTo(-r*0.7, cy - r*0.55);
    c.lineTo(-r*0.62, cy - r*0.7);
    c.lineTo(-r*0.5, cy - r*0.3);
    c.closePath();
    c.fill();

  } else if(kind === 'flame'){
    c.fillStyle = '#E8B34E';
    c.beginPath();
    c.moveTo(-r*0.6, cy + r*0.28);
    c.lineTo(-r*0.6, cy + r*0.05);
    c.lineTo(r*0.6, cy + r*0.05);
    c.lineTo(r*0.6, cy + r*0.28);
    c.closePath();
    c.fill();

    for(let i=0;i<5;i++){
      const x = -r*0.5 + i*r*0.25;
      const h = r * (0.55 + Math.sin(t*0.18 + i)*0.15);
      const grad = c.createLinearGradient(x, cy - h, x, cy + r*0.05);
      grad.addColorStop(0, '#FFF8C0');
      grad.addColorStop(0.5, '#FFB060');
      grad.addColorStop(1, '#E85838');
      c.fillStyle = grad;
      c.beginPath();
      c.moveTo(x - r*0.11, cy + r*0.05);
      c.quadraticCurveTo(x - r*0.08, cy - h*0.5, x, cy - h);
      c.quadraticCurveTo(x + r*0.08, cy - h*0.5, x + r*0.11, cy + r*0.05);
      c.closePath();
      c.fill();
    }

  } else if(kind === 'ice'){
    c.fillStyle = '#5E90B0';
    c.beginPath();
    c.moveTo(-r*0.6, cy + r*0.28);
    c.lineTo(-r*0.6, cy + r*0.1);
    c.lineTo(r*0.6, cy + r*0.1);
    c.lineTo(r*0.6, cy + r*0.28);
    c.closePath();
    c.fill();

    for(let i=0;i<5;i++){
      const x = -r*0.5 + i*r*0.25;
      const h = r * (0.55 + (i%2 === 0 ? 0.18 : 0.02));
      c.fillStyle = '#A0E0F8';
      c.shadowColor = '#A0E0F8';
      c.shadowBlur = 6;
      c.beginPath();
      c.moveTo(x - r*0.1, cy + r*0.1);
      c.lineTo(x, cy - h);
      c.lineTo(x + r*0.1, cy + r*0.1);
      c.closePath();
      c.fill();
    }
    c.shadowBlur = 0;
    c.fillStyle = 'rgba(255,255,255,0.9)';
    for(let i=0;i<3;i++){
      c.beginPath();
      c.arc(-r*0.4 + i*r*0.4, cy + r*0.2, r*0.055, 0, Math.PI*2);
      c.fill();
    }

  } else if(kind === 'star'){
    c.fillStyle = '#FFE060';
    c.shadowColor = '#FFE060';
    c.shadowBlur = 12;
    c.beginPath();
    for(let i=0;i<10;i++){
      const a = (i/10)*Math.PI*2 - Math.PI/2;
      const rr = i % 2 === 0 ? r*0.42 : r*0.18;
      const px = Math.cos(a)*rr;
      const py = cy + Math.sin(a)*rr;
      i===0 ? c.moveTo(px, py) : c.lineTo(px, py);
    }
    c.closePath();
    c.fill();
    c.fillStyle = 'rgba(255,255,255,0.85)';
    c.beginPath();
    c.arc(0, cy, r*0.12, 0, Math.PI*2);
    c.fill();
    c.shadowBlur = 0;

  } else if(kind === 'skull'){
    c.fillStyle = '#F0E8E0';
    c.beginPath();
    c.arc(0, cy, r*0.34, 0, Math.PI*2);
    c.fill();
    roundRect(c, -r*0.2, cy + r*0.16, r*0.4, r*0.16, r*0.05);
    c.fill();
    c.fillStyle = '#1A0A0A';
    c.beginPath();
    c.arc(-r*0.14, cy - r*0.05, r*0.1, 0, Math.PI*2);
    c.arc(r*0.14, cy - r*0.05, r*0.1, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#F0E8E0';
    for(let i=0;i<4;i++){
      c.fillRect(-r*0.15 + i*r*0.09, cy + r*0.2, r*0.05, r*0.11);
    }
    c.strokeStyle = 'rgba(0,0,0,0.25)';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(-r*0.15, cy - r*0.2);
    c.lineTo(0, cy - r*0.1);
    c.lineTo(-r*0.08, cy + r*0.02);
    c.stroke();

  } else if(kind === 'king'){
    c.fillStyle = '#E8B34E';
    c.shadowColor = '#FFD060';
    c.shadowBlur = 14;
    c.beginPath();
    c.moveTo(-r*0.75, cy + r*0.3);
    c.lineTo(-r*0.75, cy - r*0.12);
    c.lineTo(-r*0.45, cy - r*0.08);
    c.lineTo(-r*0.35, cy - r*0.58);
    c.lineTo(-r*0.12, cy - r*0.18);
    c.lineTo(0, cy - r*0.75);
    c.lineTo(r*0.12, cy - r*0.18);
    c.lineTo(r*0.35, cy - r*0.58);
    c.lineTo(r*0.45, cy - r*0.08);
    c.lineTo(r*0.75, cy - r*0.12);
    c.lineTo(r*0.75, cy + r*0.3);
    c.closePath();
    c.fill();
    c.shadowBlur = 0;

    c.fillStyle = '#FFF4C0';
    c.beginPath();
    c.moveTo(-r*0.6, cy + r*0.22);
    c.lineTo(-r*0.6, cy - r*0.02);
    c.lineTo(r*0.6, cy - r*0.02);
    c.lineTo(r*0.6, cy + r*0.22);
    c.closePath();
    c.fill();

    c.fillStyle = '#FF4060';
    c.beginPath();
    c.arc(0, cy - r*0.32, r*0.1, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#4080FF';
    c.beginPath();
    c.arc(-r*0.38, cy - r*0.22, r*0.075, 0, Math.PI*2);
    c.arc(r*0.38, cy - r*0.22, r*0.075, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#40FF80';
    c.beginPath();
    c.arc(-r*0.7, cy + r*0.1, r*0.065, 0, Math.PI*2);
    c.arc(r*0.7, cy + r*0.1, r*0.065, 0, Math.PI*2);
    c.fill();

  } else if(kind === 'hat'){
    c.fillStyle = '#8E4A30';
    c.beginPath();
    c.arc(0, cy + r*0.2, r*0.75, Math.PI, Math.PI*2);
    c.fill();
    c.fillStyle = '#A05838';
    c.beginPath();
    c.ellipse(0, cy + r*0.22, r*0.85, r*0.16, 0, 0, Math.PI*2);
    c.fill();
    c.fillStyle = 'rgba(0,0,0,0.15)';
    c.beginPath();
    c.ellipse(0, cy + r*0.2, r*0.72, r*0.1, 0, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#C14A4A';
    c.fillRect(-r*0.72, cy + r*0.02, r*1.44, r*0.12);

  } else if(kind === 'cap'){
    c.fillStyle = '#2A5A90';
    c.beginPath();
    c.arc(0, cy + r*0.15, r*0.72, Math.PI, Math.PI*2);
    c.fill();
    c.beginPath();
    c.moveTo(-r*0.75, cy + r*0.15);
    c.lineTo(-r*0.9, cy + r*0.3);
    c.lineTo(r*0.9, cy + r*0.3);
    c.lineTo(r*0.75, cy + r*0.15);
    c.closePath();
    c.fill();
    c.fillStyle = '#1A3A60';
    c.beginPath();
    c.arc(0, cy - r*0.5, r*0.09, 0, Math.PI*2);
    c.fill();

  } else if(kind === 'beanie'){
    c.fillStyle = '#B03060';
    c.beginPath();
    c.arc(0, cy + r*0.1, r*0.78, Math.PI, Math.PI*2);
    c.fill();
    c.fillStyle = '#D04070';
    roundRect(c, -r*0.85, cy + r*0.05, r*1.7, r*0.24, r*0.08);
    c.fill();
    c.fillStyle = '#E8D0D8';
    c.beginPath();
    c.arc(0, cy - r*0.75, r*0.2, 0, Math.PI*2);
    c.fill();

  } else if(kind === 'cowboy'){
    c.fillStyle = '#8A5A30';
    c.beginPath();
    c.moveTo(-r*0.55, cy + r*0.15);
    c.lineTo(-r*0.5, cy - r*0.4);
    c.lineTo(0, cy - r*0.55);
    c.lineTo(r*0.5, cy - r*0.4);
    c.lineTo(r*0.55, cy + r*0.15);
    c.closePath();
    c.fill();
    c.fillStyle = '#A06838';
    c.beginPath();
    c.ellipse(0, cy + r*0.15, r*1.05, r*0.18, 0, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#3A2010';
    c.fillRect(-r*0.5, cy - r*0.05, r*1.0, r*0.12);

  } else if(kind === 'santa'){
    c.fillStyle = '#C03030';
    c.beginPath();
    c.moveTo(-r*0.7, cy + r*0.15);
    c.quadraticCurveTo(0, cy - r*0.9, r*0.7, cy + r*0.15);
    c.closePath();
    c.fill();
    c.fillStyle = '#FFFFFF';
    roundRect(c, -r*0.78, cy + r*0.05, r*1.56, r*0.22, r*0.1);
    c.fill();
    c.beginPath();
    c.arc(r*0.7, cy + r*0.15, r*0.18, 0, Math.PI*2);
    c.fill();

  } else if(kind === 'party'){
    const colors = ['#FF6088','#FFB04C','#FFE24C','#4CE0A8','#4CA8FF','#A86AFF'];
    c.save();
    c.translate(0, cy + r*0.15);
    c.rotate(-0.15);
    c.beginPath();
    c.moveTo(-r*0.45, 0);
    c.lineTo(r*0.45, 0);
    c.lineTo(0, -r*1.1);
    c.closePath();
    c.fillStyle = colors[0];
    c.fill();
    for(let i=1;i<colors.length;i++){
      const y = -i*r*0.18;
      c.fillStyle = colors[i];
      c.fillRect(-r*0.4 + i*r*0.08, y, r*0.8 - i*r*0.16, r*0.05);
    }
    c.fillStyle = '#FFE060';
    c.beginPath();
    c.arc(0, -r*1.1, r*0.13, 0, Math.PI*2);
    c.fill();
    c.restore();

  } else if(kind === 'wizard'){
    c.save();
    c.translate(0, cy + r*0.15);
    c.fillStyle = '#3A2060';
    c.beginPath();
    c.moveTo(-r*0.75, 0);
    c.quadraticCurveTo(-r*0.25, -r*0.9, r*0.2, -r*1.4);
    c.quadraticCurveTo(r*0.3, -r*0.9, r*0.75, 0);
    c.closePath();
    c.fill();
    c.fillStyle = '#4A2880';
    c.beginPath();
    c.ellipse(0, 0, r*0.85, r*0.18, 0, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#FFE060';
    for(let i=0;i<4;i++){
      const sx = -r*0.4 + i*r*0.25;
      const sy = -r*0.25 - i*r*0.15;
      c.beginPath();
      c.arc(sx, sy, r*0.06, 0, Math.PI*2);
      c.fill();
    }
    c.restore();

  } else if(kind === 'viking'){
    c.fillStyle = '#808898';
    c.beginPath();
    c.arc(0, cy + r*0.1, r*0.72, Math.PI, Math.PI*2);
    c.fill();
    c.fillStyle = '#A0A8B8';
    roundRect(c, -r*0.82, cy + r*0.05, r*1.64, r*0.22, r*0.06);
    c.fill();
    c.fillStyle = '#F0E8D0';
    c.beginPath();
    c.moveTo(-r*0.6, cy + r*0.15);
    c.quadraticCurveTo(-r*1.2, cy - r*0.2, -r*1.0, cy - r*0.75);
    c.quadraticCurveTo(-r*1.05, cy - r*0.3, -r*0.7, cy + r*0.05);
    c.closePath();
    c.fill();
    c.beginPath();
    c.moveTo(r*0.6, cy + r*0.15);
    c.quadraticCurveTo(r*1.2, cy - r*0.2, r*1.0, cy - r*0.75);
    c.quadraticCurveTo(r*1.05, cy - r*0.3, r*0.7, cy + r*0.05);
    c.closePath();
    c.fill();
    c.fillStyle = '#3A4050';
    c.fillRect(-r*0.5, cy + r*0.0, r*1.0, r*0.06);

  } else if(kind === 'deerHorns'){
    c.strokeStyle = '#8A6030';
    c.lineWidth = r*0.14;
    c.lineCap = 'round';
    c.lineJoin = 'round';
    c.beginPath();
    c.moveTo(-r*0.35, cy + r*0.3);
    c.quadraticCurveTo(-r*0.7, cy - r*0.3, -r*0.55, cy - r*0.95);
    c.stroke();
    c.beginPath();
    c.moveTo(-r*0.55, cy - r*0.4);
    c.lineTo(-r*0.95, cy - r*0.5);
    c.stroke();
    c.beginPath();
    c.moveTo(-r*0.5, cy - r*0.7);
    c.lineTo(-r*0.85, cy - r*0.85);
    c.stroke();
    c.beginPath();
    c.moveTo(r*0.35, cy + r*0.3);
    c.quadraticCurveTo(r*0.7, cy - r*0.3, r*0.55, cy - r*0.95);
    c.stroke();
    c.beginPath();
    c.moveTo(r*0.55, cy - r*0.4);
    c.lineTo(r*0.95, cy - r*0.5);
    c.stroke();
    c.beginPath();
    c.moveTo(r*0.5, cy - r*0.7);
    c.lineTo(r*0.85, cy - r*0.85);
    c.stroke();

  } else if(kind === 'singleHorn'){
    c.fillStyle = '#F0E0C0';
    c.beginPath();
    c.moveTo(-r*0.12, cy + r*0.2);
    c.quadraticCurveTo(-r*0.15, cy - r*0.5, 0, cy - r*1.0);
    c.quadraticCurveTo(r*0.15, cy - r*0.5, r*0.12, cy + r*0.2);
    c.closePath();
    c.fill();
    c.strokeStyle = 'rgba(0,0,0,0.15)';
    c.lineWidth = 1;
    for(let i=0;i<4;i++){
      const y = cy + r*0.05 - i*r*0.22;
      c.beginPath();
      c.moveTo(-r*0.1 + i*r*0.02, y);
      c.lineTo(r*0.1 - i*r*0.02, y);
      c.stroke();
    }
  }
    else if(kind === 'pirate'){
    c.fillStyle = '#1A1A28';
    c.beginPath();
    c.moveTo(-r*0.75, cy + r*0.2);
    c.quadraticCurveTo(0, cy - r*0.7, r*0.75, cy + r*0.2);
    c.lineTo(r*0.7, cy + r*0.35);
    c.lineTo(-r*0.7, cy + r*0.35);
    c.closePath(); c.fill();
    c.fillStyle = '#FFFFFF';
    c.beginPath(); c.arc(0, cy - r*0.15, r*0.15, 0, Math.PI*2); c.fill();
    c.fillStyle = '#1A1A28';
    c.beginPath();
    c.arc(-r*0.06, cy - r*0.15, r*0.04, 0, Math.PI*2);
    c.arc(r*0.06, cy - r*0.15, r*0.04, 0, Math.PI*2);
    c.fill();
    c.strokeStyle = '#1A1A28'; c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(-r*0.14, cy - r*0.08); c.lineTo(r*0.14, cy - r*0.22);
    c.stroke();
  }
  else if(kind === 'wreath'){
    c.strokeStyle = '#5EA041'; c.lineWidth = r*0.15;
    c.beginPath();
    c.arc(0, cy, r*0.7, Math.PI*1.1, Math.PI*1.9);
    c.stroke();
    const cols = ['#FF80A0','#FFB040','#FFE060','#C080FF'];
    for(let i=0;i<5;i++){
      const a = Math.PI*1.15 + (i/4)*Math.PI*0.7;
      const px = Math.cos(a)*r*0.7, py = cy + Math.sin(a)*r*0.7;
      c.fillStyle = cols[i%cols.length];
      c.beginPath(); c.arc(px, py, r*0.11, 0, Math.PI*2); c.fill();
      c.fillStyle = '#FFE060';
      c.beginPath(); c.arc(px, py, r*0.04, 0, Math.PI*2); c.fill();
    }
  }
  else if(kind === 'haloBroken'){
    c.strokeStyle = '#FFE060'; c.lineWidth = r*0.1;
    c.shadowColor = '#FFE060'; c.shadowBlur = 8;
    c.beginPath();
    c.arc(-r*0.15, cy - r*0.1, r*0.55, Math.PI*1.1, Math.PI*1.75);
    c.stroke();
    c.beginPath();
    c.arc(r*0.15, cy - r*0.1, r*0.55, Math.PI*1.25, Math.PI*1.9);
    c.stroke();
    c.shadowBlur = 0;
  }
  else if(kind === 'spikeCrown'){
    c.fillStyle = '#5A4030';
    c.beginPath();
    c.ellipse(0, cy + r*0.25, r*0.7, r*0.18, 0, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#4A3020';
    for(let i=0;i<6;i++){
      const a = (i/6)*Math.PI*2;
      const px = Math.cos(a)*r*0.55;
      c.beginPath();
      c.moveTo(px - r*0.08, cy + r*0.15);
      c.lineTo(px, cy + r*0.15 - r*0.5);
      c.lineTo(px + r*0.08, cy + r*0.15);
      c.closePath(); c.fill();
    }
  }
  else if(kind === 'topHat'){
    c.fillStyle = '#0A0A0A';
    c.fillRect(-r*0.6, cy - r*0.5, r*1.2, r*0.8);
    c.fillStyle = '#1A1A1A';
    c.beginPath();
    c.ellipse(0, cy + r*0.25, r*0.9, r*0.15, 0, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#C03030';
    c.fillRect(-r*0.6, cy + r*0.05, r*1.2, r*0.1);
  }
  else if(kind === 'graduationCap'){
    c.fillStyle = '#1A1A28';
    c.beginPath();
    c.moveTo(-r*0.75, cy + r*0.15);
    c.lineTo(0, cy - r*0.15);
    c.lineTo(r*0.75, cy + r*0.15);
    c.lineTo(0, cy + r*0.45);
    c.closePath(); c.fill();
    c.fillStyle = '#FFD060';
    c.fillRect(-r*0.15, cy + r*0.25, r*0.3, r*0.5);
    c.beginPath(); c.arc(0, cy + r*0.75, r*0.1, 0, Math.PI*2); c.fill();
  }
  else if(kind === 'jesterHat'){
    const cols = ['#FF6088','#FFB04C','#FFE24C','#4CE0A8','#4CA8FF'];
    for(let i=0;i<3;i++){
      const a = -0.5 + i*0.5;
      c.fillStyle = cols[i];
      c.beginPath();
      c.moveTo(-r*0.5, cy + r*0.2);
      c.quadraticCurveTo(Math.cos(a)*r*0.8 - r*0.3, cy - r*0.9, Math.cos(a)*r*0.5, cy - r*1.1);
      c.quadraticCurveTo(Math.cos(a)*r*0.6, cy - r*0.5, r*0.5, cy + r*0.2);
      c.closePath(); c.fill();
      c.fillStyle = '#FFE060';
      c.beginPath(); c.arc(Math.cos(a)*r*0.5, cy - r*1.1, r*0.1, 0, Math.PI*2); c.fill();
    }
  }
  else if(kind === 'chefHat'){
    c.fillStyle = '#FFFFFF';
    c.beginPath();
    c.arc(0, cy - r*0.3, r*0.6, Math.PI, Math.PI*2);
    c.fill();
    c.fillRect(-r*0.6, cy - r*0.3, r*1.2, r*0.6);
    c.fillStyle = 'rgba(200,200,200,0.3)';
    c.fillRect(-r*0.6, cy + r*0.15, r*1.2, r*0.1);
  }
  else if(kind === 'propeller'){
    c.fillStyle = '#2A5A90';
    c.beginPath();
    c.arc(0, cy + r*0.15, r*0.75, Math.PI, Math.PI*2);
    c.fill();
    c.fillStyle = '#1A3A60';
    c.fillRect(-r*0.75, cy + r*0.15, r*1.5, r*0.1);
    c.strokeStyle = '#909090'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(0, cy - r*0.6); c.lineTo(0, cy - r*0.9); c.stroke();
    const rot = t*0.15;
    c.strokeStyle = '#E84040'; c.lineWidth = r*0.1;
    c.beginPath();
    c.moveTo(-Math.cos(rot)*r*0.5, cy - r*0.9 - Math.sin(rot)*r*0.15);
    c.lineTo(Math.cos(rot)*r*0.5, cy - r*0.9 + Math.sin(rot)*r*0.15);
    c.stroke();
  }
  else if(kind === 'bunnyEars'){
    c.fillStyle = '#F0E0E8';
    for(const side of [-1, 1]){
      c.beginPath();
      c.ellipse(side*r*0.35, cy - r*0.8, r*0.18, r*0.6, side*0.15, 0, Math.PI*2);
      c.fill();
      c.fillStyle = '#FFB0C0';
      c.beginPath();
      c.ellipse(side*r*0.35, cy - r*0.8, r*0.08, r*0.45, side*0.15, 0, Math.PI*2);
      c.fill();
      c.fillStyle = '#F0E0E8';
    }
  }
  else if(kind === 'catEars'){
    for(const side of [-1, 1]){
      c.fillStyle = '#2A2020';
      c.beginPath();
      c.moveTo(side*r*0.2, cy + r*0.2);
      c.lineTo(side*r*0.45, cy - r*0.8);
      c.lineTo(side*r*0.75, cy + r*0.2);
      c.closePath(); c.fill();
      c.fillStyle = '#FF8080';
      c.beginPath();
      c.moveTo(side*r*0.35, cy + r*0.05);
      c.lineTo(side*r*0.45, cy - r*0.55);
      c.lineTo(side*r*0.6, cy + r*0.05);
      c.closePath(); c.fill();
    }
  }
  else if(kind === 'devilHorns'){
    c.fillStyle = '#C02020';
    c.shadowColor = '#FF4040'; c.shadowBlur = 6;
    for(const side of [-1, 1]){
      c.beginPath();
      c.moveTo(side*r*0.4, cy + r*0.2);
      c.quadraticCurveTo(side*r*0.9, cy - r*0.5, side*r*0.6, cy - r*1.1);
      c.quadraticCurveTo(side*r*0.55, cy - r*0.4, side*r*0.2, cy + r*0.1);
      c.closePath(); c.fill();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'pumpkinHead'){
    c.fillStyle = '#E88820';
    c.beginPath();
    c.ellipse(0, cy - r*0.2, r*0.7, r*0.6, 0, 0, Math.PI*2);
    c.fill();
    c.strokeStyle = '#A05010'; c.lineWidth = 1.5;
    for(let i=-2;i<=2;i++){
      c.beginPath();
      c.moveTo(i*r*0.2, cy - r*0.75);
      c.quadraticCurveTo(i*r*0.25, cy - r*0.2, i*r*0.2, cy + r*0.35);
      c.stroke();
    }
    c.fillStyle = '#1A0808';
    c.beginPath();
    c.moveTo(-r*0.3, cy - r*0.35); c.lineTo(-r*0.1, cy - r*0.1); c.lineTo(-r*0.35, cy - r*0.1); c.closePath(); c.fill();
    c.beginPath();
    c.moveTo(r*0.3, cy - r*0.35); c.lineTo(r*0.1, cy - r*0.1); c.lineTo(r*0.35, cy - r*0.1); c.closePath(); c.fill();
    c.beginPath();
    c.moveTo(-r*0.3, cy + r*0.05); c.lineTo(-r*0.15, cy + r*0.15); c.lineTo(0, cy + r*0.05);
    c.lineTo(r*0.15, cy + r*0.15); c.lineTo(r*0.3, cy + r*0.05);
    c.lineTo(r*0.2, cy + r*0.2); c.lineTo(-r*0.2, cy + r*0.2);
    c.closePath(); c.fill();
  }
  else if(kind === 'crownSkull'){
    c.fillStyle = '#1A0808';
    for(const side of [-1, 1]){
      c.beginPath();
      c.moveTo(side*r*0.7, cy + r*0.3); c.lineTo(side*r*0.75, cy - r*0.4);
      c.lineTo(side*r*0.5, cy + r*0.1); c.closePath(); c.fill();
    }
    c.fillStyle = '#F0E8E0';
    for(let i=-1;i<=1;i++){
      const px = i*r*0.35;
      c.beginPath();
      c.arc(px, cy - r*0.2, r*0.16, 0, Math.PI*2);
      c.fill();
      c.fillStyle = '#1A0A0A';
      c.beginPath();
      c.arc(px - r*0.05, cy - r*0.22, r*0.045, 0, Math.PI*2);
      c.arc(px + r*0.05, cy - r*0.22, r*0.045, 0, Math.PI*2);
      c.fill();
      c.fillStyle = '#F0E8E0';
    }
  }
  else if(kind === 'angelRing'){
    const pl = 0.6 + Math.sin(t*0.1)*0.4;
    c.strokeStyle = `rgba(255,248,192,${pl})`;
    c.lineWidth = r*0.18;
    c.shadowColor = '#FFF8C0'; c.shadowBlur = 15*pl;
    c.beginPath();
    c.ellipse(0, cy - r*0.1, r*0.65, r*0.22, 0, 0, Math.PI*2);
    c.stroke();
    c.shadowBlur = 0;
    for(let i=0;i<3;i++){
      const a = t*0.05 + (i/3)*Math.PI*2;
      c.fillStyle = '#FFFFFF';
      c.shadowColor = '#FFF8C0'; c.shadowBlur = 10;
      c.beginPath();
      c.arc(Math.cos(a)*r*0.65, cy - r*0.1 + Math.sin(a)*r*0.22, r*0.08, 0, Math.PI*2);
      c.fill();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'cyberVisor'){
    c.fillStyle = 'rgba(10,20,40,0.9)';
    c.strokeStyle = '#00FFFF'; c.lineWidth = 2;
    c.shadowColor = '#00FFFF'; c.shadowBlur = 10;
    c.beginPath();
    c.ellipse(0, cy + r*0.15, r*0.85, r*0.3, 0, 0, Math.PI*2);
    c.fill(); c.stroke();
    c.shadowBlur = 0;
    const scan = ((t*4)%100)/100;
    c.strokeStyle = `rgba(0,255,255,${0.7})`; c.lineWidth = 1;
    c.beginPath();
    c.moveTo(-r*0.7, cy + r*0.15 - r*0.15 + scan*r*0.3);
    c.lineTo(r*0.7, cy + r*0.15 - r*0.15 + scan*r*0.3);
    c.stroke();
  }
  else if(kind === 'gasMask'){
    c.fillStyle = '#4A5A40';
    c.beginPath();
    c.ellipse(0, cy + r*0.1, r*0.7, r*0.55, 0, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#2A3020';
    c.beginPath();
    c.arc(-r*0.3, cy + r*0.05, r*0.18, 0, Math.PI*2);
    c.arc(r*0.3, cy + r*0.05, r*0.18, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#FF6020';
    c.beginPath();
    c.arc(-r*0.3, cy + r*0.05, r*0.08, 0, Math.PI*2);
    c.arc(r*0.3, cy + r*0.05, r*0.08, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#3A4030';
    c.fillRect(-r*0.2, cy + r*0.4, r*0.4, r*0.25);
  }
  else if(kind === 'lightBulb'){
    c.fillStyle = 'rgba(255,240,160,0.95)';
    c.shadowColor = '#FFE060'; c.shadowBlur = 15 + Math.sin(t*0.15)*8;
    c.beginPath();
    c.arc(0, cy - r*0.4, r*0.4, 0, Math.PI*2);
    c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#9098A0';
    c.fillRect(-r*0.15, cy - r*0.05, r*0.3, r*0.2);
    c.fillStyle = '#5A6270';
    for(let i=0;i<3;i++){
      c.fillRect(-r*0.15, cy + i*r*0.05, r*0.3, r*0.03);
    }
  }
  else if(kind === 'mushroomCap'){
    c.fillStyle = '#E85040';
    c.beginPath();
    c.arc(0, cy + r*0.1, r*0.75, Math.PI, Math.PI*2);
    c.fill();
    c.fillStyle = '#FFFFFF';
    for(let i=0;i<5;i++){
      const px = -r*0.5 + i*r*0.25;
      const py = cy - r*0.1 + Math.sin(i*1.3)*r*0.1;
      c.beginPath(); c.arc(px, py, r*0.07, 0, Math.PI*2); c.fill();
    }
    c.fillStyle = '#F0E8D0';
    c.fillRect(-r*0.15, cy + r*0.1, r*0.3, r*0.6);
  }
  else if(kind === 'sunhat'){
    c.fillStyle = '#FFE090';
    c.beginPath();
    c.ellipse(0, cy + r*0.15, r*1.0, r*0.18, 0, 0, Math.PI*2);
    c.fill();
    c.beginPath();
    c.arc(0, cy + r*0.1, r*0.55, Math.PI, Math.PI*2);
    c.fill();
    c.fillStyle = '#FF4080';
    c.fillRect(-r*0.55, cy + r*0.02, r*1.1, r*0.1);
  }
  else if(kind === 'sombrero'){
    c.fillStyle = '#C8A040';
    c.beginPath();
    c.ellipse(0, cy + r*0.2, r*1.1, r*0.2, 0, 0, Math.PI*2);
    c.fill();
    c.beginPath();
    c.moveTo(-r*0.6, cy + r*0.2);
    c.quadraticCurveTo(0, cy - r*0.6, r*0.6, cy + r*0.2);
    c.closePath(); c.fill();
    c.fillStyle = '#8A3010';
    c.fillRect(-r*0.6, cy + r*0.05, r*1.2, r*0.1);
  }
  else if(kind === 'crownFireworks'){
    c.fillStyle = '#E8B34E';
    c.beginPath();
    c.moveTo(-r*0.7, cy + r*0.25); c.lineTo(-r*0.7, cy - r*0.1);
    c.lineTo(-r*0.35, cy - r*0.6); c.lineTo(0, cy - r*0.15);
    c.lineTo(r*0.35, cy - r*0.6); c.lineTo(r*0.7, cy - r*0.1);
    c.lineTo(r*0.7, cy + r*0.25); c.closePath(); c.fill();
    for(let i=0;i<5;i++){
      const a = t*0.15 + (i/5)*Math.PI*2;
      const px = Math.cos(a)*r*0.6;
      const py = cy - r*0.4 + Math.sin(a)*r*0.3;
      c.fillStyle = `hsl(${(t*8 + i*72)%360}, 90%, 65%)`;
      c.shadowColor = c.fillStyle; c.shadowBlur = 8;
      c.beginPath(); c.arc(px, py, r*0.1, 0, Math.PI*2); c.fill();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'crownDivine'){
    const pl = 0.7 + Math.sin(t*0.1)*0.3;
    c.fillStyle = '#FFF4C0';
    c.shadowColor = '#FFE060'; c.shadowBlur = 15*pl;
    c.beginPath();
    c.moveTo(-r*0.75, cy + r*0.3); c.lineTo(-r*0.75, cy - r*0.15);
    c.lineTo(-r*0.45, cy - r*0.05); c.lineTo(-r*0.3, cy - r*0.7);
    c.lineTo(0, cy - r*0.85); c.lineTo(r*0.3, cy - r*0.7);
    c.lineTo(r*0.45, cy - r*0.05); c.lineTo(r*0.75, cy - r*0.15);
    c.lineTo(r*0.75, cy + r*0.3); c.closePath(); c.fill();
    c.shadowBlur = 0;
    for(let i=0;i<5;i++){
      const px = -r*0.5 + i*r*0.25;
      c.fillStyle = ['#FF4060','#4080FF','#40FF80','#FFD040','#FF80C0'][i];
      c.beginPath(); c.arc(px, cy - r*0.05, r*0.06, 0, Math.PI*2); c.fill();
    }
  }
  else if(kind === 'crownCosmic'){
    for(let i=0;i<7;i++){
      const a = -Math.PI*0.9 + (i/6)*Math.PI*0.8;
      const px = Math.cos(a)*r*0.7;
      const py = cy + Math.sin(a)*r*0.5;
      c.fillStyle = `hsl(${(t*3 + i*50)%360}, 80%, 55%)`;
      c.shadowColor = c.fillStyle; c.shadowBlur = 10;
      c.beginPath();
      c.moveTo(px - r*0.1, py);
      c.lineTo(px, py - r*0.4);
      c.lineTo(px + r*0.1, py);
      c.closePath(); c.fill();
    }
    c.shadowBlur = 0;
    c.strokeStyle = '#FFFFFF'; c.lineWidth = 1;
    c.beginPath(); c.arc(0, cy, r*0.5, 0, Math.PI*2); c.stroke();
  }
  else if(kind === 'crownPrisma'){
    c.save();
    c.translate(0, cy);
    for(let i=0;i<6;i++){
      const a = (i/6)*Math.PI*2 + t*0.02;
      const hue = (t*8 + i*60)%360;
      c.fillStyle = `hsl(${hue},85%,65%)`;
      c.shadowColor = c.fillStyle; c.shadowBlur = 12;
      c.beginPath();
      c.moveTo(Math.cos(a - 0.3)*r*0.8, Math.sin(a - 0.3)*r*0.6);
      c.lineTo(Math.cos(a)*r*0.55, Math.sin(a)*r*0.9 - r*0.3);
      c.lineTo(Math.cos(a + 0.3)*r*0.8, Math.sin(a + 0.3)*r*0.6);
      c.closePath(); c.fill();
    }
    c.shadowBlur = 0;
    c.restore();
  }
}

/* ============================================================
   ==================== Character drawing ====================
   ============================================================ */
   function drawSkinPattern(c, r, pattern){
  if(!pattern || pattern === 'none') return;
  c.save();
  c.beginPath(); c.arc(0, 0, r-1, 0, Math.PI*2); c.clip();

  if(pattern === 'spots'){
    c.fillStyle = 'rgba(0,0,0,0.14)';
    const spots = [[-r*0.5,-r*0.3,r*0.18],[r*0.55,-r*0.5,r*0.14],[-r*0.25,r*0.55,r*0.16],[r*0.35,r*0.35,r*0.12],[r*0.05,-r*0.75,r*0.11]];
    for(const [sx,sy,sr] of spots){ c.beginPath(); c.arc(sx,sy,sr,0,Math.PI*2); c.fill(); }
  }
  else if(pattern === 'stripes'){
    c.strokeStyle = 'rgba(0,0,0,0.5)'; c.lineWidth = r*0.18;
    for(let i=-2;i<=2;i++){
      c.beginPath(); c.moveTo(-r*1.3, i*r*0.4 + r*0.2); c.lineTo(r*1.3, i*r*0.4 - r*0.2); c.stroke();
    }
  }
  else if(pattern === 'tiger'){
    c.strokeStyle = 'rgba(0,0,0,0.6)'; c.lineWidth = r*0.12;
    for(let i=-2;i<=2;i++){
      c.beginPath(); c.moveTo(-r*1.3, i*r*0.4); c.lineTo(r*1.3, i*r*0.4); c.stroke();
      c.beginPath(); c.moveTo(-r*1.3, i*r*0.4 + r*0.15); c.lineTo(r*0.5, i*r*0.4 - r*0.05); c.stroke();
    }
  }
  else if(pattern === 'checker'){
    const size = r*0.4;
    for(let y=-r;y<r;y+=size){
      for(let x=-r;x<r;x+=size){
        const ix = Math.floor(x/size), iy = Math.floor(y/size);
        if((ix+iy)%2===0){
          c.fillStyle = 'rgba(0,0,0,0.35)';
          c.fillRect(x,y,size,size);
        }
      }
    }
  }
  else if(pattern === 'hex'){
    c.strokeStyle = 'rgba(0,0,0,0.35)'; c.lineWidth = 1.2;
    const sz = r*0.28;
    for(let y=-r;y<r+sz;y+=sz*1.7){
      for(let x=-r;x<r+sz;x+=sz*1.7){
        c.beginPath();
        for(let k=0;k<6;k++){
          const a=(k/6)*Math.PI*2;
          const px=x+Math.cos(a)*sz, py=y+Math.sin(a)*sz;
          k===0?c.moveTo(px,py):c.lineTo(px,py);
        }
        c.closePath(); c.stroke();
      }
    }
  }
  else if(pattern === 'camo'){
    c.fillStyle = 'rgba(0,0,0,0.28)';
    const blobs = [[-r*0.5,-r*0.3,r*0.35],[r*0.4,r*0.2,r*0.3],[-r*0.3,r*0.5,r*0.28],[r*0.5,-r*0.4,r*0.32]];
    for(const [bx,by,br] of blobs){ c.beginPath(); c.arc(bx,by,br,0,Math.PI*2); c.fill(); }
  }
  else if(pattern === 'circuit'){
    c.strokeStyle = 'rgba(0,255,128,0.7)'; c.lineWidth = r*0.08;
    c.beginPath();
    c.moveTo(-r, -r*0.4); c.lineTo(-r*0.4,-r*0.4); c.lineTo(-r*0.4, r*0.3); c.lineTo(r*0.4, r*0.3); c.lineTo(r*0.4, -r*0.4); c.lineTo(r, -r*0.4);
    c.moveTo(0, -r); c.lineTo(0, -r*0.6); c.moveTo(-r*0.6, r*0.7); c.lineTo(r*0.6, r*0.7);
    c.stroke();
    c.fillStyle = '#00FF80';
    for(const [px,py] of [[-r*0.4,r*0.3],[r*0.4,r*0.3],[0,-r*0.6]]){
      c.beginPath(); c.arc(px,py,r*0.11,0,Math.PI*2); c.fill();
    }
  }
  else if(pattern === 'gradient'){
    const g = c.createLinearGradient(-r,-r,r,r);
    g.addColorStop(0,'rgba(255,200,220,0.6)');
    g.addColorStop(1,'rgba(200,220,255,0.4)');
    c.fillStyle = g; c.fillRect(-r,-r,r*2,r*2);
  }
  else if(pattern === 'lavaCracks'){
    c.strokeStyle = 'rgba(255,80,20,0.85)'; c.lineWidth = r*0.08;
    c.shadowColor = '#FF5020'; c.shadowBlur = 6;
    const cracks = [
      [[-r*0.8,-r*0.3],[-r*0.4,0],[-r*0.6,r*0.4],[-r*0.2,r*0.8]],
      [[r*0.3,-r*0.9],[r*0.5,-r*0.3],[r*0.8,r*0.1]],
      [[-r*0.1,r*0.3],[r*0.3,r*0.5],[r*0.1,r*0.9]]
    ];
    for(const crack of cracks){
      c.beginPath();
      crack.forEach(([px,py],i)=> i===0?c.moveTo(px,py):c.lineTo(px,py));
      c.stroke();
    }
    c.shadowBlur = 0;
  }
  else if(pattern === 'crystalPattern'){
    c.strokeStyle = 'rgba(255,255,255,0.5)'; c.lineWidth = 1;
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2;
      c.beginPath();
      c.moveTo(0,0);
      c.lineTo(Math.cos(a)*r*0.9, Math.sin(a)*r*0.9);
      c.stroke();
    }
    c.beginPath();
    for(let k=0;k<6;k++){
      const a=(k/6)*Math.PI*2;
      const px=Math.cos(a)*r*0.7, py=Math.sin(a)*r*0.7;
      k===0?c.moveTo(px,py):c.lineTo(px,py);
    }
    c.closePath(); c.stroke();
  }
  else if(pattern === 'scales'){
    c.strokeStyle = 'rgba(0,0,0,0.3)'; c.lineWidth = 1.2;
    const sw = r*0.35;
    for(let y=-r;y<r;y+=sw*0.7){
      for(let x=-r;x<r;x+=sw){
        const offset = (Math.floor(y/(sw*0.7))%2) * sw*0.5;
        c.beginPath();
        c.arc(x+offset, y, sw*0.5, Math.PI, 0);
        c.stroke();
      }
    }
  }
  else if(pattern === 'galaxyPattern'){
    const g = c.createRadialGradient(0,0,0,0,0,r);
    g.addColorStop(0,'rgba(255,200,255,0.6)');
    g.addColorStop(0.5,'rgba(160,80,200,0.4)');
    g.addColorStop(1,'rgba(60,20,120,0.8)');
    c.fillStyle = g; c.fillRect(-r,-r,r*2,r*2);
    c.fillStyle = '#FFFFFF';
    for(let i=0;i<12;i++){
      const a=Math.random()*Math.PI*2;
      const d=rand(r*0.2,r*0.9);
      c.globalAlpha = rand(0.5,1);
      c.beginPath(); c.arc(Math.cos(a)*d, Math.sin(a)*d, rand(0.8,1.8), 0, Math.PI*2); c.fill();
    }
    c.globalAlpha = 1;
  }
  else if(pattern === 'holo'){
    const g = c.createLinearGradient(-r, -r, r, r);
    g.addColorStop(0,'rgba(255,180,255,0.6)');
    g.addColorStop(0.33,'rgba(180,255,255,0.5)');
    g.addColorStop(0.66,'rgba(255,255,180,0.5)');
    g.addColorStop(1,'rgba(180,180,255,0.6)');
    c.fillStyle = g; c.fillRect(-r,-r,r*2,r*2);
  }
  else if(pattern === 'firePattern'){
    const g = c.createRadialGradient(0,r*0.3,0,0,r*0.3,r*1.1);
    g.addColorStop(0,'rgba(255,240,150,0.9)');
    g.addColorStop(0.5,'rgba(255,120,40,0.6)');
    g.addColorStop(1,'rgba(200,40,10,0)');
    c.fillStyle = g; c.fillRect(-r,-r,r*2,r*2);
  }
  else if(pattern === 'clouds'){
    c.fillStyle = 'rgba(255,255,255,0.35)';
    const blobs = [[-r*0.5,-r*0.4,r*0.3],[0,-r*0.55,r*0.35],[r*0.5,-r*0.4,r*0.3],[-r*0.3,r*0.3,r*0.28],[r*0.4,r*0.4,r*0.3]];
    for(const [bx,by,br] of blobs){ c.beginPath(); c.arc(bx,by,br,0,Math.PI*2); c.fill(); }
  }
  else if(pattern === 'voidPattern'){
    const g = c.createRadialGradient(0,0,r*0.2,0,0,r);
    g.addColorStop(0,'rgba(160,64,255,0.7)');
    g.addColorStop(0.5,'rgba(80,20,140,0.6)');
    g.addColorStop(1,'rgba(20,0,40,0.95)');
    c.fillStyle = g; c.fillRect(-r,-r,r*2,r*2);
  }
  else if(pattern === 'craters'){
    c.fillStyle = 'rgba(120,120,140,0.4)';
    const cr = [[-r*0.4,-r*0.3,r*0.2],[r*0.35,r*0.15,r*0.22],[-r*0.2,r*0.5,r*0.16],[r*0.45,-r*0.5,r*0.13]];
    for(const [cx,cy,crr] of cr){ c.beginPath(); c.arc(cx,cy,crr,0,Math.PI*2); c.fill(); }
  }
  else if(pattern === 'starfield'){
    c.fillStyle = '#FFFFFF';
    for(let i=0;i<20;i++){
      const a=Math.random()*Math.PI*2;
      const d=rand(r*0.1,r*0.95);
      c.globalAlpha = rand(0.3,1);
      const sz = rand(0.6,1.6);
      c.beginPath(); c.arc(Math.cos(a)*d, Math.sin(a)*d, sz, 0, Math.PI*2); c.fill();
    }
    c.globalAlpha = 1;
  }
  else if(pattern === 'holyPattern'){
    const g = c.createRadialGradient(0,0,0,0,0,r);
    g.addColorStop(0,'rgba(255,255,200,0.9)');
    g.addColorStop(1,'rgba(255,200,80,0.5)');
    c.fillStyle = g; c.fillRect(-r,-r,r*2,r*2);
  }
  else if(pattern === 'prismatic'){
    const g = c.createConicGradient ? c.createConicGradient(G.t*0.02, 0, 0) :
      c.createLinearGradient(-r,-r,r,r);
    if(g.addColorStop){
      g.addColorStop(0,   'rgba(255,80,80,0.5)');
      g.addColorStop(0.17,'rgba(255,180,80,0.5)');
      g.addColorStop(0.33,'rgba(255,240,80,0.5)');
      g.addColorStop(0.5, 'rgba(80,255,120,0.5)');
      g.addColorStop(0.66,'rgba(80,180,255,0.5)');
      g.addColorStop(0.83,'rgba(180,80,255,0.5)');
      g.addColorStop(1,   'rgba(255,80,80,0.5)');
    }
    c.fillStyle = g; c.fillRect(-r,-r,r*2,r*2);
  }
  else if(pattern === 'rainbow'){
    const g = c.createLinearGradient(-r,-r,r,r);
    g.addColorStop(0,'rgba(255,80,140,0.4)');
    g.addColorStop(0.25,'rgba(255,180,80,0.4)');
    g.addColorStop(0.5,'rgba(255,240,80,0.4)');
    g.addColorStop(0.75,'rgba(80,220,160,0.4)');
    g.addColorStop(1,'rgba(80,160,255,0.4)');
    c.fillStyle = g; c.fillRect(-r,-r,r*2,r*2);
  }
  c.restore();
}

function drawCharacterBody(c, r, skin, t){
  /* ═══════════════════════════════════════════════════════
     ═══ الحالة 1: زي مخصص بصورة (imageData أو imagePath) ═══
     ═══════════════════════════════════════════════════════ */
  if(hasItemImage(skin)){
    const img = getItemImageEl(skin);

    /* الصورة جاهزة */
    if(img && img.complete && img.naturalWidth > 0){
      const size = r * 2.6;
      c.drawImage(img, -size/2, -size/2, size, size);
      return;
    }

    /* الصورة لم تُحمّل بعد — أضف onload لرسمها عند الجاهزية */
    if(img && !img._listenerAttached){
      img._listenerAttached = true;
      img.addEventListener('load', ()=>{ /* ستُرسم في الإطار التالي */ });
      img.addEventListener('error', ()=>{ img._errored = true; });
    }

    /* احتياطي: ارسم دائرة بلون الزي */
    const fallbackBody = skin.body || '#E07A3F';
    const fallbackDark = skin.bodyDark || mixColor(fallbackBody, '#000', 0.3);
    const fallbackAccent = skin.accent || '#FFB060';

    /* ظل */
    c.fillStyle = 'rgba(0,0,0,0.12)';
    c.beginPath(); c.arc(0, 1.5, r + 0.8, 0, Math.PI*2); c.fill();

    /* جسم دائري بتدرج */
    const g = c.createRadialGradient(-r*0.35, -r*0.4, r*0.15, 0, 0, r*1.1);
    g.addColorStop(0, mixColor(fallbackBody, '#FFFFFF', 0.35));
    g.addColorStop(0.55, fallbackBody);
    g.addColorStop(1, fallbackDark);
    c.fillStyle = g;
    c.beginPath(); c.arc(0, 0, r, 0, Math.PI*2); c.fill();

    /* لمعة */
    c.fillStyle = 'rgba(255,255,255,0.42)';
    c.beginPath();
    c.ellipse(-r*0.32, -r*0.42, r*0.32, r*0.2, -0.6, 0, Math.PI*2);
    c.fill();

    /* نقطة صغيرة في الوسط لتمييز التحميل */
    c.fillStyle = fallbackAccent;
    c.globalAlpha = 0.4 + Math.sin(t * 0.2) * 0.4;
    c.beginPath(); c.arc(0, 0, r * 0.25, 0, Math.PI*2); c.fill();
    c.globalAlpha = 1;
    return;
  }

  /* ═══════════════════════════════════════════════════════
     ═══ الحالة 2: زي من القائمة الأساسية (رسم برمجي) ═══
     ═══════════════════════════════════════════════════════ */

  const rainbow = skin.rainbow;

  /* ظل خفيف */
  c.fillStyle = 'rgba(0,0,0,0.12)';
  c.beginPath(); c.arc(0, 1.5, r + 0.8, 0, Math.PI*2); c.fill();

  /* ═══ لون الجسم ═══ */
  if(rainbow && (skin.pattern === 'none' || !skin.pattern)){
    /* تدرج قوس قزح قطري */
    const g = c.createLinearGradient(-r, -r, r, r);
    g.addColorStop(0,    '#FF6088');
    g.addColorStop(0.25, '#FFB04C');
    g.addColorStop(0.5,  '#FFE24C');
    g.addColorStop(0.75, '#4CE0A8');
    g.addColorStop(1,    '#4CA8FF');
    c.fillStyle = g;
  } else {
    /* تدرج دائري عادي */
    const bodyColor = skin.body || '#F5EFE6';
    const bodyDark  = skin.bodyDark || mixColor(bodyColor, '#000', 0.2);
    const g = c.createRadialGradient(-r*0.35, -r*0.4, r*0.15, 0, 0, r*1.1);
    g.addColorStop(0,    mixColor(bodyColor, '#FFFFFF', 0.35));
    g.addColorStop(0.55, bodyColor);
    g.addColorStop(1,    bodyDark);
    c.fillStyle = g;
  }

  /* رسم الدائرة الأساسية */
  c.beginPath();
  c.arc(0, 0, r, 0, Math.PI*2);
  c.fill();

  /* ═══ ظل سفلي داخل الجسم ═══ */
  c.fillStyle = 'rgba(0,0,0,0.08)';
  c.beginPath();
  c.arc(0, r*0.15, r*0.98, 0.15*Math.PI, 0.85*Math.PI);
  c.fill();

  /* ═══ نقشة الزي (spots, stripes, etc.) ═══ */
  drawSkinPattern(c, r, skin.pattern);

  /* ═══ لمعة علوية (Highlight) ═══ */
  c.fillStyle = 'rgba(255,255,255,0.42)';
  c.beginPath();
  c.ellipse(-r*0.32, -r*0.42, r*0.32, r*0.2, -0.6, 0, Math.PI*2);
  c.fill();
}

function drawCharacterFace(c, r, skin){
  /* ═══ لا ترسم العيون إذا كان الزي يحتوي على صورة ═══ */
  if(skin.imageData) return;
  if(skin.imagePath) return;
  if(hasItemImage(skin)) return;

  const eyes = currentEyes();

  /* ✅ عيون مخصصة بصورة */
  if(hasItemImage(eyes)){
    const img = getItemImageEl(eyes);
    if(img && img.complete && img.naturalWidth > 0){
      const eyeY = -r * 0.15;
      const sz = r * 0.55;
      c.drawImage(img, -r*0.28 - sz/2, eyeY - sz/2, sz, sz);
      c.drawImage(img,  r*0.28 - sz/2, eyeY - sz/2, sz, sz);
      /* الخدود */
      c.fillStyle = 'rgba(224,122,63,0.32)';
      c.beginPath();
      c.ellipse(-r*0.55, r*0.2, r*0.18, r*0.11, 0, 0, Math.PI*2);
      c.ellipse( r*0.55, r*0.2, r*0.18, r*0.11, 0, 0, Math.PI*2);
      c.fill();
      /* الفم */
      c.strokeStyle = skin.detail || '#1A1512';
      c.lineWidth = Math.max(1.2, r*0.1);
      c.lineCap = 'round';
      c.beginPath(); c.arc(0, r*0.25, r*0.22, 0.15*Math.PI, 0.85*Math.PI); c.stroke();
      return;
    }
  }
  const eyeId = eyes.id || 'default';

const eyeY = -r*0.15, eyeX = r*0.28, eyeR = r*0.24;
const detailColor = skin.detail || '#1A1512';   /* ✅ حماية */

  /* ═══════════ ارسم العيون حسب النمط ═══════════ */
  if(eyeId === 'void'){
    /* لا شيء — عيون فارغة */
  }
  else if(eyeId === 'dead'){
    c.strokeStyle = skin.detail; c.lineWidth = r*0.1; c.lineCap = 'round';
    for(const sx of [-1, 1]){
      const cx = sx * eyeX;
      c.beginPath();
      c.moveTo(cx - r*0.18, eyeY - r*0.18);
      c.lineTo(cx + r*0.18, eyeY + r*0.18);
      c.moveTo(cx + r*0.18, eyeY - r*0.18);
      c.lineTo(cx - r*0.18, eyeY + r*0.18);
      c.stroke();
    }
  }
  else if(eyeId === 'star'){
    for(const sx of [-1, 1]){
      const cx = sx * eyeX;
      c.fillStyle = skin.detail;
      c.beginPath();
      for(let i=0;i<10;i++){
        const a = (i/10)*Math.PI*2 - Math.PI/2;
        const rr = i%2===0 ? r*0.22 : r*0.09;
        const px = cx + Math.cos(a)*rr;
        const py = eyeY + Math.sin(a)*rr;
        i===0 ? c.moveTo(px,py) : c.lineTo(px,py);
      }
      c.closePath(); c.fill();
    }
  }
  else if(eyeId === 'heart'){
    for(const sx of [-1, 1]){
      const cx = sx * eyeX;
      c.fillStyle = '#FF4060';
      c.beginPath();
      c.moveTo(cx, eyeY + r*0.1);
      c.bezierCurveTo(cx + r*0.25, eyeY - r*0.1, cx + r*0.15, eyeY - r*0.3, cx, eyeY - r*0.1);
      c.bezierCurveTo(cx - r*0.15, eyeY - r*0.3, cx - r*0.25, eyeY - r*0.1, cx, eyeY + r*0.1);
      c.fill();
    }
  }
  else if(eyeId === 'robot'){
    for(const sx of [-1, 1]){
      const cx = sx * eyeX;
      c.fillStyle = '#40E8FF';
      c.shadowColor = '#40E8FF'; c.shadowBlur = 8;
      c.fillRect(cx - r*0.18, eyeY - r*0.18, r*0.36, r*0.36);
      c.shadowBlur = 0;
      c.fillStyle = skin.detail;
      c.fillRect(cx - r*0.1, eyeY - r*0.1, r*0.2, r*0.2);
      c.fillStyle = '#40E8FF';
      c.fillRect(cx - r*0.06, eyeY - r*0.06, r*0.08, r*0.08);
    }
  }
  else if(eyeId === 'glowing'){
    for(const sx of [-1, 1]){
      const cx = sx * eyeX;
      const glow = c.createRadialGradient(cx, eyeY, 0, cx, eyeY, r*0.4);
      glow.addColorStop(0, '#FFF8C0');
      glow.addColorStop(0.5, '#FFD040');
      glow.addColorStop(1, 'rgba(255,208,64,0)');
      c.fillStyle = glow;
      c.beginPath(); c.arc(cx, eyeY, r*0.4, 0, Math.PI*2); c.fill();
      c.fillStyle = '#FFFFFF';
      c.beginPath(); c.arc(cx, eyeY, r*0.15, 0, Math.PI*2); c.fill();
    }
  }
  else if(eyeId === 'rainbow'){
    const hue = (G.t * 3) % 360;
    for(const sx of [-1, 1]){
      const cx = sx * eyeX;
      c.fillStyle = `hsl(${hue}, 85%, 60%)`;
      c.beginPath(); c.arc(cx, eyeY, r*0.24, 0, Math.PI*2); c.fill();
      c.fillStyle = `hsl(${(hue + 180) % 360}, 85%, 60%)`;
      c.beginPath(); c.arc(cx, eyeY, r*0.11, 0, Math.PI*2); c.fill();
      c.fillStyle = '#FFFFFF';
      c.beginPath(); c.arc(cx - r*0.05, eyeY - r*0.06, r*0.05, 0, Math.PI*2); c.fill();
    }
  }
  else if(eyeId === 'cat'){
    for(const sx of [-1, 1]){
      const cx = sx * eyeX;
      c.fillStyle = '#E8F040';
      c.beginPath();
      c.ellipse(cx, eyeY, r*0.24, r*0.28, 0, 0, Math.PI*2);
      c.fill();
      c.fillStyle = '#1A1512';
      c.beginPath();
      c.ellipse(cx, eyeY, r*0.06, r*0.24, 0, 0, Math.PI*2);
      c.fill();
      c.fillStyle = 'rgba(255,255,255,0.8)';
      c.beginPath();
      c.arc(cx - r*0.08, eyeY - r*0.1, r*0.05, 0, Math.PI*2);
      c.fill();
    }
  }
  else if(eyeId === 'cute'){
    for(const sx of [-1, 1]){
      const cx = sx * eyeX;
      c.fillStyle = '#FFFFFF';
      c.beginPath(); c.arc(cx, eyeY, r*0.28, 0, Math.PI*2); c.fill();
      c.fillStyle = skin.detail;
      c.beginPath(); c.arc(cx, eyeY + r*0.04, r*0.2, 0, Math.PI*2); c.fill();
      c.fillStyle = '#FFFFFF';
      c.beginPath(); c.arc(cx - r*0.08, eyeY - r*0.1, r*0.1, 0, Math.PI*2); c.fill();
      c.beginPath(); c.arc(cx + r*0.06, eyeY + r*0.06, r*0.04, 0, Math.PI*2); c.fill();
      c.strokeStyle = skin.detail; c.lineWidth = r*0.08; c.lineCap='round';
      c.beginPath();
      c.arc(cx, eyeY - r*0.22, r*0.2, Math.PI*1.15, Math.PI*1.85);
      c.stroke();
    }
  }
  else if(eyeId === 'sleepy'){
    for(const sx of [-1, 1]){
      const cx = sx * eyeX;
      c.fillStyle = '#FFFFFF';
      c.beginPath();
      c.ellipse(cx, eyeY, r*0.24, r*0.16, 0, 0, Math.PI*2);
      c.fill();
      c.fillStyle = skin.detail;
      c.beginPath();
      c.ellipse(cx, eyeY + r*0.06, r*0.14, r*0.08, 0, 0, Math.PI*2);
      c.fill();
      c.strokeStyle = skin.detail; c.lineWidth = r*0.06;
      c.beginPath();
      c.moveTo(cx - r*0.25, eyeY - r*0.1);
      c.lineTo(cx + r*0.25, eyeY - r*0.1);
      c.stroke();
    }
  }
  else if(eyeId === 'angry'){
    for(const sx of [-1, 1]){
      const cx = sx * eyeX;
      c.fillStyle = '#FFFFFF';
      c.beginPath(); c.arc(cx, eyeY, r*0.22, 0, Math.PI*2); c.fill();
      c.fillStyle = skin.detail;
      c.beginPath(); c.arc(cx + sx*r*0.05, eyeY + r*0.05, r*0.14, 0, Math.PI*2); c.fill();
      c.strokeStyle = skin.detail; c.lineWidth = r*0.1; c.lineCap='round';
      c.beginPath();
      c.moveTo(cx - sx*r*0.3, eyeY - r*0.3);
      c.lineTo(cx + sx*r*0.15, eyeY - r*0.12);
      c.stroke();
    }
  }
  else {
    /* default */
    c.fillStyle = '#FFFFFF';
    c.beginPath(); c.arc(-eyeX, eyeY, eyeR, 0, Math.PI*2); c.arc( eyeX, eyeY, eyeR, 0, Math.PI*2); c.fill();
    c.fillStyle = skin.detail;
    c.beginPath();
    c.arc(-eyeX + r*0.05, eyeY + r*0.05, eyeR*0.6, 0, Math.PI*2);
    c.arc( eyeX + r*0.05, eyeY + r*0.05, eyeR*0.6, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#FFFFFF';
    c.beginPath();
    c.arc(-eyeX - r*0.05, eyeY - r*0.06, eyeR*0.25, 0, Math.PI*2);
    c.arc( eyeX - r*0.05, eyeY - r*0.06, eyeR*0.25, 0, Math.PI*2);
    c.fill();
  }

  /* ═══════════ الخدود ═══════════ */
  c.fillStyle = skin.rainbow ? 'rgba(255,80,120,0.4)' : 'rgba(224,122,63,0.32)';
  c.beginPath();
  c.ellipse(-r*0.55, r*0.2, r*0.18, r*0.11, 0, 0, Math.PI*2);
  c.ellipse( r*0.55, r*0.2, r*0.18, r*0.11, 0, 0, Math.PI*2);
  c.fill();

  /* ═══════════ الفم ═══════════ */
  c.strokeStyle = skin.detail;
  c.lineWidth = Math.max(1.2, r*0.1);
  c.lineCap = 'round';
  c.beginPath(); c.arc(0, r*0.25, r*0.22, 0.15*Math.PI, 0.85*Math.PI); c.stroke();
}

function drawCharacterAccessory(c, r, skin, t){
  const kind = skin.accessory;
  if(kind === 'none') return;

  if(kind === 'horns' || kind === 'demonHorns' || kind === 'dragonHorns'){
    const col = kind === 'demonHorns' ? '#1A0808' : kind === 'dragonHorns' ? '#E8D0A0' : skin.detail;
    c.fillStyle = col;
    const hh = kind === 'dragonHorns' ? 1.7 : 1.35;
    c.beginPath();
    c.moveTo(-r*0.45, -r*0.85); c.lineTo(-r*0.55, -r*hh); c.lineTo(-r*0.2, -r*0.95); c.closePath(); c.fill();
    c.beginPath();
    c.moveTo(r*0.45, -r*0.85); c.lineTo(r*0.55, -r*hh); c.lineTo(r*0.2, -r*0.95); c.closePath(); c.fill();
    if(kind === 'dragonHorns'){
      c.strokeStyle = col; c.lineWidth = r*0.12; c.lineCap='round';
      c.beginPath(); c.moveTo(-r*0.55,-r*hh); c.quadraticCurveTo(-r*0.9,-r*1.9,-r*0.7,-r*2.2); c.stroke();
      c.beginPath(); c.moveTo(r*0.55,-r*hh); c.quadraticCurveTo(r*0.9,-r*1.9,r*0.7,-r*2.2); c.stroke();
    }
  }
  else if(kind === 'leaf'){
    c.strokeStyle = '#3A6E28'; c.lineWidth = r*0.09;
    c.beginPath(); c.moveTo(0, -r*0.95); c.lineTo(r*0.1, -r*1.2); c.stroke();
    c.fillStyle = '#6BBF4C';
    c.beginPath(); c.ellipse(r*0.2, -r*1.25, r*0.35, r*0.18, -0.5, 0, Math.PI*2); c.fill();
    c.fillStyle = 'rgba(255,255,255,0.35)';
    c.beginPath(); c.ellipse(r*0.15, -r*1.3, r*0.16, r*0.06, -0.5, 0, Math.PI*2); c.fill();
  }
  else if(kind === 'cloud'){
    c.fillStyle = '#FFFFFF';
    c.beginPath();
    c.arc(-r*0.15, -r*1.15, r*0.22, 0, Math.PI*2);
    c.arc( r*0.15, -r*1.2, r*0.28, 0, Math.PI*2);
    c.arc( r*0.4, -r*1.05, r*0.2, 0, Math.PI*2);
    c.arc(-r*0.4, -r*1.0, r*0.18, 0, Math.PI*2);
    c.fill();
  }
  else if(kind === 'spikes'){
    c.fillStyle = skin.accent;
    const spikes = 7;
    for(let i=0;i<spikes;i++){
      const a = -Math.PI*0.85 + (i/(spikes-1))*Math.PI*0.7;
      const bx = Math.cos(a)*r*0.98, by = Math.sin(a)*r*0.98;
      const tipX = Math.cos(a)*r*1.35, tipY = Math.sin(a)*r*1.35;
      const px = Math.cos(a + 0.22)*r*0.95, py = Math.sin(a + 0.22)*r*0.95;
      c.beginPath(); c.moveTo(bx, by); c.lineTo(tipX, tipY); c.lineTo(px, py); c.closePath(); c.fill();
    }
  }
  else if(kind === 'halo'){
    c.save();
    c.translate(0, -r*1.35); c.rotate(t*0.02);
    c.strokeStyle = '#FFF4C0'; c.lineWidth = r*0.13;
    c.beginPath(); c.ellipse(0, 0, r*0.7, r*0.22, 0, 0, Math.PI*2); c.stroke();
    c.strokeStyle = '#E8B34E'; c.lineWidth = r*0.06;
    c.beginPath(); c.ellipse(0, 0, r*0.7, r*0.22, 0, 0, Math.PI*2); c.stroke();
    c.restore();
  }
  else if(kind === 'star'){
    c.save();
    c.translate(0, -r*1.4); c.rotate(t*0.05);
    c.fillStyle = skin.accent;
    c.shadowColor = skin.accent; c.shadowBlur = 12;
    c.beginPath();
    for(let i=0;i<10;i++){
      const a = (i/10)*Math.PI*2 - Math.PI/2;
      const radius = i%2===0 ? r*0.38 : r*0.16;
      const px = Math.cos(a)*radius, py = Math.sin(a)*radius;
      i===0 ? c.moveTo(px,py) : c.lineTo(px,py);
    }
    c.closePath(); c.fill();
    c.shadowBlur = 0;
    c.restore();
  }
  else if(kind === 'rainbow'){
    c.save();
    c.lineWidth = r*0.16; c.lineCap = 'round';
    const colors = ['#FF6088','#FFA84C','#FFE24C','#4CE0A8','#4CA8FF','#A86AFF'];
    for(let i=0;i<colors.length;i++){
      c.strokeStyle = colors[i];
      c.beginPath(); c.arc(0, 0, r*1.15 - i*(r*0.16), Math.PI*1.15, Math.PI*1.85); c.stroke();
    }
    c.restore();
  }
  else if(kind === 'wings'){
    const flap = Math.sin(t*0.18)*0.15;
    c.save(); c.translate(-r*1.05, -r*0.05); c.rotate(-0.5 + flap);
    c.fillStyle = skin.accent;
    c.beginPath(); c.ellipse(0, 0, r*0.55, r*0.22, 0, 0, Math.PI*2); c.fill();
    c.restore();
    c.save(); c.translate(r*1.05, -r*0.05); c.rotate(0.5 - flap);
    c.fillStyle = skin.accent;
    c.beginPath(); c.ellipse(0, 0, r*0.55, r*0.22, 0, 0, Math.PI*2); c.fill();
    c.restore();
  }
  else if(kind === 'angelWings' || kind === 'phoenixWings' || kind === 'dragonWings' || kind === 'demonWings'){
    const flap = Math.sin(t*0.15)*0.2;
    const isAngel = kind === 'angelWings';
    const isPhoenix = kind === 'phoenixWings';
    const isDemon = kind === 'demonWings';
    const featherCol = isAngel ? '#FFF8E0' : isPhoenix ? '#FF8040' : isDemon ? '#8A2020' : '#3A8040';
    for(const side of [-1, 1]){
      c.save();
      c.translate(side*r*0.85, -r*0.15);
      c.rotate(side * (0.4 - flap*0.3));
      c.fillStyle = featherCol;
      c.shadowColor = isPhoenix ? '#FF5020' : featherCol;
      c.shadowBlur = isPhoenix ? 10 : 0;
      for(let i=0;i<4;i++){
        const size = r * (0.7 - i*0.1);
        const yy = -r*0.3 + i*r*0.15;
        c.beginPath();
        c.ellipse(side * r*0.3, yy, size, r*0.15, side*0.3, 0, Math.PI*2);
        c.fill();
      }
      c.shadowBlur = 0;
      c.restore();
    }
  }
  else if(kind === 'shadowWisps'){
    for(let i=0;i<5;i++){
      const a = t*0.06 + (i/5)*Math.PI*2;
      const dist = r*1.3;
      c.fillStyle = `rgba(60,20,90,${0.4 + Math.sin(t*0.1+i)*0.3})`;
      c.beginPath();
      c.ellipse(Math.cos(a)*dist, Math.sin(a)*dist + Math.sin(t*0.08+i)*4,
                r*0.35, r*0.15, a, 0, Math.PI*2);
      c.fill();
    }
  }
  else if(kind === 'lightningBolts'){
    for(let i=0;i<3;i++){
      const a = t*0.1 + (i/3)*Math.PI*2;
      const sx = Math.cos(a)*r*1.4, sy = Math.sin(a)*r*1.4 - r*0.5;
      c.strokeStyle = '#FFE060'; c.lineWidth = 2;
      c.shadowColor = '#FFE060'; c.shadowBlur = 10;
      c.beginPath();
      c.moveTo(sx, sy);
      c.lineTo(sx + rand(-6,6), sy + 8);
      c.lineTo(sx + rand(-4,4), sy + 16);
      c.stroke();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'antenna'){
    c.strokeStyle = skin.detail; c.lineWidth = r*0.1; c.lineCap = 'round';
    c.beginPath();
    c.moveTo(0, -r*0.9);
    c.quadraticCurveTo(-r*0.2, -r*1.4, r*0.1, -r*1.6);
    c.stroke();
    c.fillStyle = '#00FF80';
    c.shadowColor = '#00FF80'; c.shadowBlur = 10;
    c.beginPath(); c.arc(r*0.1, -r*1.6, r*0.16, 0, Math.PI*2); c.fill();
    c.shadowBlur = 0;
    const pulse = 0.5 + Math.sin(t*0.15)*0.5;
    c.globalAlpha = pulse;
    c.beginPath(); c.arc(r*0.1, -r*1.6, r*0.25, 0, Math.PI*2); c.fill();
    c.globalAlpha = 1;
  }
  else if(kind === 'crystalShards'){
    for(let i=0;i<5;i++){
      const a = -Math.PI*0.85 + (i/4)*Math.PI*0.7;
      const bx = Math.cos(a)*r*0.95, by = Math.sin(a)*r*0.95;
      const h = r * (0.4 + Math.random()*0.3);
      c.save();
      c.translate(bx, by); c.rotate(a + Math.PI/2);
      c.fillStyle = '#A0E0FF';
      c.shadowColor = '#80D8FF'; c.shadowBlur = 8;
      c.beginPath();
      c.moveTo(-r*0.08, 0); c.lineTo(0, -h); c.lineTo(r*0.08, 0);
      c.closePath(); c.fill();
      c.restore();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'ninjaMask'){
    c.fillStyle = '#0A0A18';
    c.beginPath();
    c.ellipse(0, -r*0.05, r*1.02, r*0.45, 0, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#E83040';
    c.beginPath();
    c.ellipse(-r*0.3, -r*0.1, r*0.2, r*0.06, 0, 0, Math.PI*2);
    c.ellipse(r*0.3, -r*0.1, r*0.2, r*0.06, 0, 0, Math.PI*2);
    c.fill();
  }
  else if(kind === 'helmet'){
    c.fillStyle = 'rgba(200,220,240,0.4)';
    c.strokeStyle = '#A0B8D0'; c.lineWidth = 2;
    c.beginPath();
    c.arc(0, -r*0.1, r*1.15, Math.PI*1.1, Math.PI*1.9);
    c.arc(0, r*0.4, r*1.15, Math.PI*0.05, Math.PI*0.95, true);
    c.closePath();
    c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,0.5)';
    c.beginPath();
    c.ellipse(-r*0.4, -r*0.4, r*0.2, r*0.1, -0.5, 0, Math.PI*2);
    c.fill();
  }
  else if(kind === 'visor'){
    c.fillStyle = 'rgba(0,20,40,0.9)';
    c.strokeStyle = '#00FFFF'; c.lineWidth = 1.5;
    c.shadowColor = '#00FFFF'; c.shadowBlur = 10;
    c.beginPath();
    c.ellipse(0, -r*0.12, r*0.85, r*0.28, 0, 0, Math.PI*2);
    c.fill(); c.stroke();
    c.shadowBlur = 0;
    const scan = ((t*3)%100)/100;
    c.strokeStyle = 'rgba(0,255,255,0.7)'; c.lineWidth = 1;
    c.beginPath();
    c.moveTo(-r*0.7, -r*0.12 + scan*r*0.4);
    c.lineTo(r*0.7, -r*0.12 + scan*r*0.4);
    c.stroke();
  }
  else if(kind === 'flowerCrown'){
    const cols = ['#FF80A0','#FFB040','#FFE060','#C080FF','#80C0FF'];
    for(let i=0;i<6;i++){
      const a = -Math.PI*0.9 + (i/5)*Math.PI*0.8;
      const px = Math.cos(a)*r*0.9;
      const py = Math.sin(a)*r*0.9 - r*0.3;
      c.fillStyle = cols[i % cols.length];
      for(let k=0;k<5;k++){
        const ak = (k/5)*Math.PI*2;
        c.beginPath();
        c.ellipse(px + Math.cos(ak)*r*0.1, py + Math.sin(ak)*r*0.1, r*0.09, r*0.05, ak, 0, Math.PI*2);
        c.fill();
      }
      c.fillStyle = '#FFE060';
      c.beginPath(); c.arc(px, py, r*0.06, 0, Math.PI*2); c.fill();
    }
  }
  else if(kind === 'mushroomCap'){
    c.fillStyle = '#E85040';
    c.beginPath();
    c.arc(0, -r*0.9, r*0.75, Math.PI, Math.PI*2);
    c.fill();
    c.fillStyle = '#FFFFFF';
    for(let i=0;i<5;i++){
      const px = -r*0.5 + i*r*0.25;
      const py = -r*1.0 + Math.sin(i*1.3)*r*0.12;
      c.beginPath(); c.arc(px, py, r*0.06, 0, Math.PI*2); c.fill();
    }
    c.fillStyle = '#F0E8D0';
    c.fillRect(-r*0.12, -r*0.9, r*0.24, r*0.6);
  }
  else if(kind === 'pumpkinStem'){
    c.strokeStyle = '#3A6E28'; c.lineWidth = r*0.15; c.lineCap='round';
    c.beginPath();
    c.moveTo(0, -r*0.9);
    c.quadraticCurveTo(r*0.1, -r*1.25, r*0.25, -r*1.35);
    c.stroke();
    c.fillStyle = '#7BC44C';
    c.beginPath(); c.ellipse(r*0.35, -r*1.3, r*0.15, r*0.08, -0.6, 0, Math.PI*2); c.fill();
  }
  else if(kind === 'moonCrown'){
    c.fillStyle = '#FFF8D0';
    c.shadowColor = '#F0F0FF'; c.shadowBlur = 10;
    c.beginPath();
    c.arc(0, -r*1.15, r*0.35, 0, Math.PI*2);
    c.fill();
    c.fillStyle = 'rgba(200,200,220,0.5)';
    c.beginPath();
    c.arc(r*0.05, -r*1.2, r*0.4, -0.3, 0.3, false);
    c.fill();
    c.shadowBlur = 0;
  }
  else if(kind === 'divineCrown'){
    const pl = 0.7 + Math.sin(t*0.12)*0.3;
    c.strokeStyle = '#FFF4C0'; c.lineWidth = r*0.15;
    c.shadowColor = '#FFE060'; c.shadowBlur = 15*pl;
    c.beginPath(); c.ellipse(0, -r*1.2, r*0.85, r*0.28, 0, 0, Math.PI*2); c.stroke();
    c.shadowBlur = 0;
    for(let i=0;i<3;i++){
      const a = -Math.PI/2 + (i-1)*0.4;
      const px = Math.cos(a)*r*0.85, py = -r*1.2 + Math.sin(a)*r*0.28;
      c.fillStyle = '#FFFFFF';
      c.shadowColor = '#FFF8C0'; c.shadowBlur = 12*pl;
      c.beginPath(); c.arc(px, py, r*0.13, 0, Math.PI*2); c.fill();
    }
    c.shadowBlur = 0;
  }
  else if(kind === 'crystalCrown'){
    for(let i=0;i<5;i++){
      const px = -r*0.6 + i*r*0.3;
      const h = r*(0.5 + Math.sin(i*1.3)*0.2);
      c.fillStyle = `hsl(${(t*3 + i*40)%360},80%,65%)`;
      c.shadowColor = c.fillStyle; c.shadowBlur = 10;
      c.beginPath();
      c.moveTo(px - r*0.08, -r*0.9);
      c.lineTo(px, -r*0.9 - h);
      c.lineTo(px + r*0.08, -r*0.9);
      c.closePath(); c.fill();
    }
    c.shadowBlur = 0;
  }
}

function drawWalkLimbs(c, r, skin, flipped){
  const legPhase = Math.sin(P.legPhase) * 5;
  const armPhase = Math.sin(P.legPhase + Math.PI) * 4;
  const bodyBob = P.onGround ? Math.sin(P.legPhase*2) * 1 : 0;

  c.fillStyle = skin.bodyDark;
  if(P.onGround){
    roundRect(c, -5, (r-3 + bodyBob*0.3), 4.5, 10 + legPhase, 2.2); c.fill();
    roundRect(c, 1, (r-3 + bodyBob*0.3), 4.5, 10 - legPhase, 2.2); c.fill();
    c.beginPath();
    c.arc(-2.8, (r+6+legPhase + bodyBob*0.3), 2.8, 0, Math.PI*2);
    c.arc(3.2, (r+6-legPhase + bodyBob*0.3), 2.8, 0, Math.PI*2);
    c.fill();
  } else {
    roundRect(c, -5, (r-3), 4.5, 7, 2.2); c.fill();
    roundRect(c, 1, (r-3), 4.5, 7, 2.2); c.fill();
  }

  c.fillStyle = skin.body;
  if(P.onGround){
    roundRect(c, -r-2, -2 + armPhase*0.6, 3.5, 8, 1.8); c.fill();
    roundRect(c, r-1.5, -2 - armPhase*0.6, 3.5, 8, 1.8); c.fill();
  } else {
    roundRect(c, -r-2, -6, 3.5, 6, 1.8); c.fill();
    roundRect(c, r-1.5, -6, 3.5, 6, 1.8); c.fill();
  }
}

function drawEngineFlame(c, r, skin){
  const flameLen = 12 + Math.sin(P.enginePhase)*4;
  const flameCol = skin.accent;
  const flameCol2 = mixColor(skin.accent, '#FFFFFF', 0.5);
  const grad = c.createLinearGradient(-r*0.9, 0, -r*0.9 - flameLen, 0);
  grad.addColorStop(0, flameCol); grad.addColorStop(0.5, flameCol2); grad.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = grad;
  c.beginPath();
  c.moveTo(-r*0.85, -r*0.5);
  c.quadraticCurveTo(-r*0.85 - flameLen*0.5, -r*0.2, -r*0.85 - flameLen, 0);
  c.quadraticCurveTo(-r*0.85 - flameLen*0.5, r*0.2, -r*0.85, r*0.5);
  c.closePath(); c.fill();
  c.fillStyle = 'rgba(255,255,255,0.85)';
  c.beginPath();
  c.moveTo(-r*0.85, -r*0.25);
  c.quadraticCurveTo(-r*0.85 - flameLen*0.4, -r*0.1, -r*0.85 - flameLen*0.55, 0);
  c.quadraticCurveTo(-r*0.85 - flameLen*0.4, r*0.1, -r*0.85, r*0.25);
  c.closePath(); c.fill();
}

function drawSideFins(c, r, skin){
  const flap = Math.sin(P.enginePhase*0.9) * 0.1;
  c.save(); c.translate(-r*0.65, 0); c.rotate(-0.3 + flap);
  c.fillStyle = skin.bodyDark;
  c.beginPath(); c.ellipse(-r*0.25, 0, r*0.4, r*0.18, 0, 0, Math.PI*2); c.fill();
  c.restore();
  c.save(); c.translate(r*0.65, 0); c.rotate(0.3 - flap);
  c.fillStyle = skin.bodyDark;
  c.beginPath(); c.ellipse(r*0.25, 0, r*0.4, r*0.18, 0, 0, Math.PI*2); c.fill();
  c.restore();
}

function drawSparklesAround(c, r, skin){
  const t = G.t * 0.04;
  for(let i=0;i<3;i++){
    const a = t + i * (Math.PI*2/3);
    const px = Math.cos(a) * r * 1.4;
    const py = Math.sin(a) * r * 1.4;
    const size = 1.6 + Math.sin(t*3 + i)*0.8;
    c.fillStyle = skin.accent;
    c.globalAlpha = 0.75;
    c.beginPath();
    for(let k=0;k<4;k++){
      const ak = (k/4)*Math.PI*2;
      const rr = k%2===0 ? size : size*0.35;
      const qx = px + Math.cos(ak)*rr, qy = py + Math.sin(ak)*rr;
      k===0 ? c.moveTo(qx,qy) : c.lineTo(qx,qy);
    }
    c.closePath(); c.fill();
  }
  c.globalAlpha = 1;
}

function renderCharacter(c, r, skin, opts){
  opts = opts || {};
  const mode = opts.mode || 'FLIP';
  const facingRot = opts.rot || 0;
  const isWalk = mode === 'WALK' || mode === 'FLIP_WALK' || mode === 'SKY_JUMP';
  const isFlippedWalk = mode === 'FLIP_WALK';
  const isShip = mode === 'FLIP' || mode === 'FLAP' || mode === 'DRIFT';
  const alpha = opts.alpha ?? 1;
  const skipExtras = opts.skipExtras || false;
  const t = G.t;

  /* ═══ كل الطبقات ═══ */
  const aura       = currentAura();
  const crown      = currentCrown();
  const cape       = currentCape();
  const headItem   = currentHeadItem();
  const backItem   = currentBackItem();
  const heldItem   = currentHeldItem();
  const mark       = currentGroundMark();
  const eyes       = currentEyes();

  c.save();
  c.globalAlpha = alpha;

  /* ═══════════════════════════════════════════════════════
      طبقة 0: Ground Mark (أسفل الشخصية)
     ═══════════════════════════════════════════════════════ */
  if(!skipExtras && mark.id !== 'none'){
    const markSize = r * 4.5;
    const bob = Math.sin(t * 0.05) * 2;
    ASSET.drawItem(c, mark, {
      x: 0, y: r * 1.8 + bob,
      size: markSize,
      alpha: 0.75 + Math.sin(t * 0.08) * 0.15,
      rotation: t * 0.01,
      anchorX: 0.5, anchorY: 0.5
    });
  }

  /* ═══════════════════════════════════════════════════════
      طبقة 1: Aura (خلف الشخصية)
     ═══════════════════════════════════════════════════════ */
  if(!skipExtras && aura.id !== 'none'){
    if(hasItemImage(aura)){
      const auraSize = r * 5;
      const pulse = 1 + Math.sin(t * 0.08) * 0.08;
      ASSET.drawItem(c, aura, {
        x: 0, y: 0,
        size: auraSize * pulse,
        alpha: 0.85,
        rotation: t * 0.008,
        anchorX: 0.5, anchorY: 0.5
      });
    } else {
      try { drawAura(c, r, aura, t); } catch(err){}
    }
  }

  /* ═══════════════════════════════════════════════════════
      طبقة 2: Back Item (أجنحة/حقائب خلف الشخصية)
     ═══════════════════════════════════════════════════════ */
  if(!skipExtras && backItem.id !== 'none'){
    const backSize = r * 4.5;
    const flap = Math.sin(t * 0.12) * 0.05;
    ASSET.drawItem(c, backItem, {
      x: -r * 0.3, y: r * 0.2,
      size: backSize,
      rotation: flap,
      anchorX: 0.75, anchorY: 0.5,   /* نقطة ارتكاز قريبة من الجسم */
      alpha: alpha
    });
  }

  /* ═══════════════════════════════════════════════════════
      طبقة 3: Cape (عباءة برمجية قديمة — fallback)
     ═══════════════════════════════════════════════════════ */
  if(!skipExtras && cape.id !== 'none' && P.cape){
    try { drawCape(c, r, cape, t, P.x, P.y); }
    catch(err){}
  }

  /* ═══ دوران المركبة / قلب المشي ═══ */
  if(isShip && facingRot !== 0) c.rotate(facingRot);
  if(isFlippedWalk) c.rotate(Math.PI);

  /* ═══ توهج الشخصية ═══ */
  if(skin.glow){
    const glowCol = skin.glowColor || skin.accent;
    const g = c.createRadialGradient(0, 0, r * 0.6, 0, 0, r * 2);
    g.addColorStop(0, glowCol);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    const prev = c.globalAlpha;
    c.globalAlpha = alpha * 0.35;
    c.fillStyle = g;
    c.beginPath(); c.arc(0, 0, r * 2, 0, Math.PI * 2); c.fill();
    c.globalAlpha = prev;
  }

  if(skin.sparkle) drawSparklesAround(c, r, skin);

  /* ═══════════════════════════════════════════════════════
      طبقة 4: الجسم (صورة أو رسم برمجي)
     ═══════════════════════════════════════════════════════ */
  if(isWalk) drawWalkLimbs(c, r, skin, false);
  if(isShip){ drawEngineFlame(c, r, skin); drawSideFins(c, r, skin); }

  drawCharacterBody(c, r, skin, t);

  /* ═══════════════════════════════════════════════════════
      طبقة 5: الوجه/العيون
     ═══════════════════════════════════════════════════════ */
  if(!skin.imageData && !skin.imagePath && !hasItemImage(skin)){
    /* فقط للزي البرمجي */
    if(hasItemImage(eyes)){
      ASSET.drawItem(c, eyes, {
        x: 0, y: -r * 0.1,
        size: r * 1.6,
        anchorX: 0.5, anchorY: 0.5
      });
    } else {
      drawCharacterFace(c, r, skin);
    }
  }

  /* ═══════════════════════════════════════════════════════
      طبقة 6: Crown + Head Item (فوق الرأس)
     ═══════════════════════════════════════════════════════ */
  const skinHasImage = !!(skin.imageData || skin.imagePath || hasItemImage(skin));

  if(!skipExtras && crown.id !== 'none'){
    if(hasItemImage(crown)){
      ASSET.drawItem(c, crown, {
        x: 0, y: -r * 1.4,
        size: r * 2.2,
        anchorX: 0.5, anchorY: 1.0,   /* مرتكز على القاعدة */
      });
    } else if(!skinHasImage){
      try { drawCrown(c, r, crown, t); } catch(err){}
    }
  }

  if(!skipExtras && headItem.id !== 'none'){
    ASSET.drawItem(c, headItem, {
      x: 0, y: -r * 1.15,
      size: r * 2.4,
      rotation: Math.sin(t * 0.04) * 0.02,
      anchorX: 0.5, anchorY: 1.0
    });
  }

  /* ═══════════════════════════════════════════════════════
      طبقة 7: Held Item (في اليد — يسار الشخصية)
     ═══════════════════════════════════════════════════════ */
  if(!skipExtras && heldItem.id !== 'none'){
    const heldSize = r * 2.5;
    const bob = Math.sin(t * 0.08) * r * 0.05;
    ASSET.drawItem(c, heldItem, {
      x: -r * 1.1, y: r * 0.3 + bob,
      size: heldSize,
      rotation: -0.3 + Math.sin(t * 0.06) * 0.05,
      anchorX: 0.7, anchorY: 0.5,   /* نقطة الإمساك */
    });
  }

  c.restore();
}

function initCompanion(){
  G.companion = {
    x: P.x - 40,
    y: P.y - 40,
    angle: 0,
    t: 0,
    trail: []
  };
}

function updateCompanion(){
  if(G.state !== 'PLAYING') return;
  const comp = currentCompanion();
  if(comp.id === 'none') return;

  const c = G.companion;
  if(!c) { initCompanion(); return; }

  c.t++;

  /* ═══ حركة دائرية حول اللاعب ═══ */
  const orbitR = 38;
  const orbitSpeed = 0.04;
  const targetX = P.x + Math.cos(c.t * orbitSpeed) * orbitR;
  const targetY = P.y - 30 + Math.sin(c.t * orbitSpeed * 1.4) * 12;

  c.x = lerp(c.x, targetX, 0.12);
  c.y = lerp(c.y, targetY, 0.12);

  /* ═══ أثر خفيف ═══ */
  if(c.t % 4 === 0){
    c.trail.push({x: c.x, y: c.y, life: 1});
    if(c.trail.length > 6) c.trail.shift();
  }
  for(let i=c.trail.length-1;i>=0;i--){
    c.trail[i].life -= 0.06;
    if(c.trail[i].life <= 0) c.trail.splice(i, 1);
  }
}

function drawCompanion(){
  if(G.state !== 'PLAYING') return;
  const comp = currentCompanion();
  if(comp.id === 'none') return;
  const c = G.companion;
  if(!c) return;

  const r = P.r * 0.6;

  /* ═══ أثر ═══ */
  for(const t of c.trail){
    ctx.globalAlpha = t.life * 0.3;
    ctx.fillStyle = '#FFF8C0';
    ctx.beginPath();
    ctx.arc(t.x, t.y, r * t.life * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.save();
  ctx.translate(c.x, c.y);

  /* ✅ صورة رفيق مخصص */
  if(hasItemImage(comp)){
    const img = getItemImageEl(comp);
    if(img && img.complete && img.naturalWidth > 0){
      const size = r * 3.2;
      const bob = Math.sin(c.t * 0.08) * 2;
      ctx.drawImage(img, -size/2, -size/2 + bob, size, size);
      ctx.restore();
      return;
    }
    ctx.restore();
    return;
  }

  const id = comp.id;

  if(id === 'star'){
    const rot = c.t * 0.05;
    ctx.rotate(rot);
    ctx.fillStyle = '#FFE060';
    ctx.shadowColor = '#FFE060'; ctx.shadowBlur = 12;
    ctx.beginPath();
    for(let i=0;i<10;i++){
      const a = (i/10)*Math.PI*2 - Math.PI/2;
      const rr = i%2===0 ? r*0.9 : r*0.4;
      const px = Math.cos(a)*rr, py = Math.sin(a)*rr;
      i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
    }
    ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;
  }
  else if(id === 'heart'){
    const pulse = 1 + Math.sin(c.t*0.15)*0.15;
    ctx.fillStyle = '#FF4060';
    ctx.shadowColor = '#FF4060'; ctx.shadowBlur = 10;
    ctx.save(); ctx.scale(pulse, pulse);
    ctx.beginPath();
    ctx.moveTo(0, r*0.4);
    ctx.bezierCurveTo(r*1.1, -r*0.5, r*0.6, -r*1.3, 0, -r*0.5);
    ctx.bezierCurveTo(-r*0.6, -r*1.3, -r*1.1, -r*0.5, 0, r*0.4);
    ctx.fill();
    ctx.restore();
    ctx.shadowBlur = 0;
  }
  else if(id === 'orb'){
    const grad = ctx.createRadialGradient(0,0,0, 0,0,r*1.2);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.4, '#80E0FF');
    grad.addColorStop(1, 'rgba(80,180,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(0, 0, r*1.2, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath(); ctx.arc(0, 0, r*0.35, 0, Math.PI*2); ctx.fill();
  }
  else if(id === 'butterfly'){
    const flap = Math.sin(c.t * 0.3) * 0.4;
    for(const side of [-1, 1]){
      ctx.save();
      ctx.scale(side, 1); ctx.rotate(flap * side * 0.5);
      ctx.fillStyle = `hsl(${(c.t*3)%360}, 85%, 65%)`;
      ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.ellipse(r*0.5, -r*0.2, r*0.55, r*0.35, 0.3, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(r*0.4, r*0.25, r*0.4, r*0.28, -0.3, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#1A1512';
    ctx.beginPath(); ctx.ellipse(0, 0, r*0.08, r*0.35, 0, 0, Math.PI*2); ctx.fill();
  }
  else if(id === 'firefly'){
    const pulse = 0.6 + Math.sin(c.t*0.15)*0.4;
    const glow = ctx.createRadialGradient(0,0,0, 0,0,r*2);
    glow.addColorStop(0, `rgba(255,240,160,${pulse})`);
    glow.addColorStop(1, 'rgba(255,240,160,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(0,0,r*2,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#FFF8C0';
    ctx.beginPath(); ctx.arc(0,0,r*0.3,0,Math.PI*2); ctx.fill();
  }
  else if(id === 'bee'){
    ctx.fillStyle = '#FFD040';
    ctx.beginPath(); ctx.ellipse(0, 0, r*0.5, r*0.35, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#1A1512';
    for(let i=-1;i<=1;i++){
      ctx.fillRect(i*r*0.15 - r*0.05, -r*0.3, r*0.1, r*0.6);
    }
    const flap = Math.sin(c.t * 0.8) * 0.6;
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.save(); ctx.translate(0, -r*0.35); ctx.rotate(flap);
    ctx.beginPath(); ctx.ellipse(0, 0, r*0.4, r*0.15, 0, 0, Math.PI*2); ctx.fill();
    ctx.restore();
    ctx.save(); ctx.translate(0, -r*0.35); ctx.rotate(-flap);
    ctx.beginPath(); ctx.ellipse(0, 0, r*0.4, r*0.15, 0, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  }
  else if(id === 'ghost'){
    const wobble = Math.sin(c.t*0.1)*2;
    ctx.fillStyle = 'rgba(240,240,255,0.85)';
    ctx.shadowColor = '#C0D0FF'; ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, -r*0.3, r*0.7, Math.PI, 0);
    ctx.lineTo(r*0.7, r*0.4);
    for(let i=5;i>=0;i--){
      const wx = -r*0.7 + (i/5)*r*1.4;
      const wy = r*0.4 + Math.sin(c.t*0.15+i)*2;
      ctx.lineTo(wx, wy);
    }
    ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#1A1512';
    ctx.beginPath();
    ctx.arc(-r*0.25, -r*0.3, r*0.1, 0, Math.PI*2);
    ctx.arc(r*0.25, -r*0.3, r*0.1, 0, Math.PI*2);
    ctx.fill();
  }
  else if(id === 'dragon'){
    const flap = Math.sin(c.t * 0.25) * 0.3;
    for(const side of [-1, 1]){
      ctx.save(); ctx.scale(side, 1); ctx.rotate(flap * side);
      ctx.fillStyle = '#3A8040';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(r*0.8, -r*0.8, r*1.4, -r*0.3);
      ctx.quadraticCurveTo(r*0.9, 0, r*0.8, r*0.3);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = '#3A8040';
    ctx.beginPath(); ctx.ellipse(0, 0, r*0.5, r*0.3, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#E8D0A0';
    ctx.beginPath(); ctx.arc(r*0.3, -r*0.1, r*0.25, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#1A1512';
    ctx.beginPath(); ctx.arc(r*0.35, -r*0.12, r*0.05, 0, Math.PI*2); ctx.fill();
  }
  else if(id === 'rocket'){
    ctx.fillStyle = '#C0C8D8';
    ctx.beginPath(); ctx.ellipse(0, 0, r*0.35, r*0.7, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#E84040';
    ctx.beginPath();
    ctx.moveTo(0, -r*0.7); ctx.lineTo(r*0.35, 0); ctx.lineTo(-r*0.35, 0); ctx.closePath();
    ctx.fill();
    const flame = 0.8 + Math.sin(c.t*0.3)*0.3;
    ctx.fillStyle = '#FF8040';
    ctx.shadowColor = '#FF8040'; ctx.shadowBlur = 10*flame;
    ctx.beginPath();
    ctx.moveTo(-r*0.2, r*0.7); ctx.lineTo(r*0.2, r*0.7);
    ctx.lineTo(0, r*1.3*flame); ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;
  }
  else if(id === 'moon'){
    const pulse = 0.9 + Math.sin(c.t*0.08)*0.1;
    ctx.shadowColor = '#F0F0FF'; ctx.shadowBlur = 12;
    ctx.fillStyle = '#E8E8F0';
    ctx.beginPath(); ctx.arc(0, 0, r*0.7*pulse, 0, Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#A8A8B8';
    ctx.beginPath(); ctx.arc(-r*0.2, -r*0.15, r*0.15, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(r*0.15, r*0.2, r*0.1, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(r*0.2, -r*0.25, r*0.08, 0, Math.PI*2); ctx.fill();
  }
  else if(id === 'sun'){
    const pulse = 1 + Math.sin(c.t*0.15)*0.08;
    ctx.save(); ctx.scale(pulse, pulse);
    ctx.fillStyle = '#FFD040';
    ctx.shadowColor = '#FFD040'; ctx.shadowBlur = 15;
    ctx.beginPath(); ctx.arc(0, 0, r*0.55, 0, Math.PI*2); ctx.fill();
    ctx.rotate(c.t * 0.03);
    for(let i=0;i<8;i++){
      const a = (i/8)*Math.PI*2;
      ctx.save(); ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(-r*0.08, -r*0.6);
      ctx.lineTo(0, -r*0.95);
      ctx.lineTo(r*0.08, -r*0.6);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  }
  else if(id === 'cloud'){
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.shadowColor = '#C0D8F0'; ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(-r*0.3, 0, r*0.4, 0, Math.PI*2);
    ctx.arc(r*0.1, -r*0.15, r*0.5, 0, Math.PI*2);
    ctx.arc(r*0.45, 0.05*r, r*0.35, 0, Math.PI*2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  else if(id === 'cube'){
    ctx.rotate(c.t * 0.05);
    ctx.fillStyle = '#4080E8';
    ctx.shadowColor = '#4080E8'; ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.rect(-r*0.5, -r*0.5, r, r);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.rect(-r*0.5, -r*0.5, r, r);
    ctx.stroke();
  }
  else if(id === 'sword'){
    ctx.rotate(Math.sin(c.t*0.05) * 0.3);
    ctx.fillStyle = '#C0C8D8';
    ctx.beginPath();
    ctx.moveTo(0, -r*1.1);
    ctx.lineTo(r*0.15, -r*0.9);
    ctx.lineTo(r*0.1, r*0.6);
    ctx.lineTo(-r*0.1, r*0.6);
    ctx.lineTo(-r*0.15, -r*0.9);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#8A6030';
    ctx.fillRect(-r*0.3, r*0.6, r*0.6, r*0.15);
    ctx.fillStyle = '#E8B34E';
    ctx.fillRect(-r*0.08, r*0.75, r*0.16, r*0.35);
    ctx.beginPath();
    ctx.arc(0, r*1.15, r*0.12, 0, Math.PI*2);
    ctx.fill();
  }
  else if(id === 'balloon'){
    const hue = (c.t * 0.8) % 360;
    ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
    ctx.beginPath();
    ctx.ellipse(0, -r*0.2, r*0.5, r*0.65, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-r*0.3, -r*0.5);
    ctx.quadraticCurveTo(0, -r*0.2, r*0.3, -r*0.5);
    ctx.stroke();
    ctx.strokeStyle = '#9098A0'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, r*0.45);
    ctx.quadraticCurveTo(r*0.2, r*0.7, 0, r*1.0);
    ctx.stroke();
  }
  else if(id === 'skull'){
    ctx.fillStyle = '#F0E8E0';
    ctx.beginPath(); ctx.arc(0, 0, r*0.6, 0, Math.PI*2); ctx.fill();
    ctx.fillRect(-r*0.3, r*0.4, r*0.6, r*0.2);
    ctx.fillStyle = '#1A0A0A';
    ctx.beginPath();
    ctx.arc(-r*0.2, -r*0.05, r*0.12, 0, Math.PI*2);
    ctx.arc(r*0.2, -r*0.05, r*0.12, 0, Math.PI*2);
    ctx.fill();
    ctx.fillRect(-r*0.2, r*0.45, r*0.08, r*0.15);
    ctx.fillRect(-r*0.05, r*0.45, r*0.08, r*0.15);
    ctx.fillRect(r*0.1, r*0.45, r*0.08, r*0.15);
  }
  else if(id === 'diamond'){
    const rot = c.t * 0.04;
    ctx.rotate(rot);
    ctx.fillStyle = '#80E0FF';
    ctx.shadowColor = '#80E0FF'; ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(0, -r*0.7);
    ctx.lineTo(r*0.5, -r*0.1);
    ctx.lineTo(r*0.3, r*0.6);
    ctx.lineTo(-r*0.3, r*0.6);
    ctx.lineTo(-r*0.5, -r*0.1);
    ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.beginPath();
    ctx.moveTo(0, -r*0.7);
    ctx.lineTo(r*0.2, -r*0.3);
    ctx.lineTo(0, 0);
    ctx.lineTo(-r*0.2, -r*0.3);
    ctx.closePath(); ctx.fill();
  }
  else if(id === 'phoenix'){
    const flap = Math.sin(c.t * 0.2) * 0.4;
    for(const side of [-1, 1]){
      ctx.save(); ctx.scale(side, 1); ctx.rotate(flap * side);
      const grad = ctx.createLinearGradient(0,0, r, 0);
      grad.addColorStop(0, '#FFD060');
      grad.addColorStop(1, '#FF5020');
      ctx.fillStyle = grad;
      ctx.shadowColor = '#FF8040'; ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(r*0.8, -r*1.2, r*1.6, -r*0.3);
      ctx.quadraticCurveTo(r*1.0, 0, r*0.9, r*0.4);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFD060';
    ctx.beginPath(); ctx.ellipse(0, 0, r*0.4, r*0.28, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#FF5020';
    ctx.beginPath();
    ctx.moveTo(r*0.4, 0); ctx.lineTo(r*0.7, -r*0.15); ctx.lineTo(r*0.7, r*0.15); ctx.closePath();
    ctx.fill();
  }
  else if(id === 'cosmicPet'){
    const rot = c.t * 0.02;
    ctx.rotate(rot);
    const grad = ctx.createRadialGradient(0,0,0, 0,0,r*0.9);
    grad.addColorStop(0, '#C080FF');
    grad.addColorStop(0.7, '#6020A0');
    grad.addColorStop(1, '#200840');
    ctx.fillStyle = grad;
    ctx.shadowColor = '#8040D0'; ctx.shadowBlur = 15;
    ctx.beginPath(); ctx.arc(0, 0, r*0.9, 0, Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;
    for(let i=0;i<6;i++){
      const a = (i/6)*Math.PI*2;
      const dist = r*0.5;
      const twinkle = 0.5 + Math.sin(c.t*0.1 + i)*0.5;
      ctx.fillStyle = `rgba(255,255,255,${twinkle})`;
      ctx.beginPath();
      ctx.arc(Math.cos(a)*dist, Math.sin(a)*dist, r*0.08, 0, Math.PI*2);
      ctx.fill();
    }
  }

  ctx.restore();
}

/* ============================================================
   ==================== Player renderer ======================
   ============================================================ */
function drawPlayer(){
  const skin = currentSkin();
  const r = P.r;
  const ghostActive = G.ghost > 0;
  const trailCos = currentTrail();

  const trailColors = {
    default: skin.accent, sparkle: '#FFE060', fire: '#FF6020', ice: '#88D8FF',
    rainbow: null, shadow: '#2A2020', bubble: '#A8D8E8', matrix: '#00FF80'
  };
  const trailCol = trailColors[trailCos.id];

  if(G.mode !== 'WALK' && G.mode !== 'FLIP_WALK' && G.mode !== 'SKY_JUMP'){
    for(let i=0;i<P.trail.length;i++){
      const t = P.trail[i];
      const a = (i/P.trail.length)*0.36;
      ctx.globalAlpha = a * (ghostActive ? 0.5 : 1);
      if(trailCos.id === 'rainbow'){
        const hue = (G.t*3 + i*20) % 360;
        ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
      } else if(trailCos.id === 'sparkle'){
        const sz = r * (i/P.trail.length) * 0.9;
        ctx.fillStyle = trailCol;
        ctx.beginPath();
        for(let k=0;k<4;k++){
          const ak = (k/4)*Math.PI*2;
          const rr = k%2===0 ? sz : sz*0.4;
          const qx = t.x + Math.cos(ak)*rr, qy = t.y + Math.sin(ak)*rr;
          k===0 ? ctx.moveTo(qx,qy) : ctx.lineTo(qx,qy);
        }
        ctx.closePath(); ctx.fill();
        ctx.globalAlpha = 1;
        continue;
      } else if(trailCos.id === 'bubble'){
        const sz = r * (i/P.trail.length) * 0.9;
        ctx.strokeStyle = trailCol; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(t.x, t.y, sz, 0, Math.PI*2); ctx.stroke();
        ctx.globalAlpha = 1;
        continue;
      } else if(trailCos.id === 'matrix'){
        const sz = r * (i/P.trail.length) * 0.9;
        ctx.fillStyle = trailCol;
        ctx.fillRect(t.x - sz/2, t.y - sz/2, sz, sz);
        ctx.globalAlpha = 1;
        continue;
      } else {
        ctx.fillStyle = trailCol;
      }
      ctx.beginPath();
      ctx.arc(t.x, t.y, r * (i/P.trail.length) * 0.9, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

if(G.mode === 'WALK'){
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath(); ctx.ellipse(P.x, GROUND_Y + 4, r*1.05, 4, 0, 0, Math.PI*2); ctx.fill();
}
/* ASCEND: لا ظل أرضي — اللاعب حر في الفضاء */
 else if(G.mode === 'FLIP_WALK'){
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(P.x, CEILING_H, r*1.05, 4, 0, 0, Math.PI*2); ctx.fill();
  } else if(G.mode === 'SKY_JUMP'){
    const height = clamp((GROUND_Y - P.y) / 300, 0, 1);
    const sw = r * (1.05 - height * 0.7);
    ctx.fillStyle = 'rgba(0,0,0,' + (0.22 - height * 0.15) + ')';
    ctx.beginPath(); ctx.ellipse(P.x, GROUND_Y + 4, sw, 4, 0, 0, Math.PI*2); ctx.fill();
  }

  const blink = G.invuln > 0 && Math.floor(G.invuln/5)%2===0;
  let alpha = blink ? 0.4 : 1;
  if(ghostActive) alpha *= 0.6;
  if(skin.transparent) alpha *= 0.75;

  ctx.save();
  ctx.translate(P.x, P.y);
  renderCharacter(ctx, r, skin, { mode: G.mode, rot: P.rot, alpha });
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
  if(G.realm === REALM.PLANET && G.planet){
    const p = G.planet;
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, p.sky);
    g.addColorStop(1, p.skyBot);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    /* هالة الكوكب */
    if(p.haze){
      ctx.fillStyle = p.haze;
      ctx.fillRect(0, 0, W, H);
    }

    /* الشمس البعيدة */
    const sunX = W * 0.85;
    const sunY = H * 0.15;
    const sunSize = 20 * p.sunBrightness;
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunSize * 8);
    sunGrad.addColorStop(0, '#FFF8E0');
    sunGrad.addColorStop(0.3, p.accent);
    sunGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath(); ctx.arc(sunX, sunY, sunSize * 8, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath(); ctx.arc(sunX, sunY, sunSize * 0.3, 0, Math.PI*2); ctx.fill();

    /* نجمة الأرض البعيدة */
    const earthX = W * 0.2;
    const earthY = H * 0.25;
    ctx.fillStyle = '#4080FF';
    ctx.shadowColor = '#80C0FF';
    ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.arc(earthX, earthY, 5, 0, Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;

    return;
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
  if(G.realm === REALM.UNDERGROUND || G.realm === REALM.SKY) return;
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
  const altN = clamp((G.camY - 100) / 500, 0, 1);
  if(altN <= 0.01) return;
  if(G.camYUnder > 20) return;   /* ⬅️ أضف هذا السطر */

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

function drawPlanetFloors(){
  if(!G.planet) return;
  const p = G.planet;

  for(const f of G.planetFloors){
    if(f.dead) continue;

    if(f.isPlanetHole){
      /* حفرة في أرضية الكوكب */
      ctx.fillStyle = '#000000';
      ctx.fillRect(f.x, GROUND_Y, f.w, GROUND_H + 40);

      /* حواف مضيئة */
      ctx.fillStyle = p.accent;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(f.x - 3, GROUND_Y, 3, GROUND_H);
      ctx.fillRect(f.x + f.w, GROUND_Y, 3, GROUND_H);
      ctx.globalAlpha = 1;

      /* سهم ▼ */
      const pulse = 0.6 + Math.sin(G.t * 0.12) * 0.35;
      ctx.globalAlpha = pulse;
      ctx.fillStyle = p.accent;
      ctx.shadowColor = p.accent;
      ctx.shadowBlur = 15;
      ctx.font = 'bold 24px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('▼', f.x + f.w/2, GROUND_Y - 40 + Math.sin(G.t*0.1)*4);
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
    if(P.cape) updateCapePhysics();
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
    const el = document.createElement('div');
    el.className = 'bp-tier-row' + (unlocked ? ' unlocked' : ' locked');
    el.innerHTML = `
      <div class="bp-tier-num">${i}</div>
      <div class="bp-rewards">
        <div class="bp-reward${claimedFree ? ' claimed' : ''}">
          <span class="ic">◆</span>
          <span>${5 + i*2}</span>
          <span class="k">FREE</span>
        </div>
        <div class="bp-reward premium${claimedPrem ? ' claimed' : ''}">
          <span class="ic">🎁</span>
          <span>SOON</span>
          <span class="k">PREMIUM</span>
        </div>
      </div>`;
    list.appendChild(el);
  }
}

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

function renderCosPreview(pctx, w, h, cat, item){
  if(!pctx || !item) return;
  const cx = w/2, cy = h/2;

  /* ✅ صورة مخصصة */
  if(hasItemImage(item)){
    const img = getItemImageEl(item);
    if(!img) return;

    const draw = () => {
      if(!img.complete || img.naturalWidth <= 0) return;
      const sz = Math.min(w, h) * 0.8;
      const ratio = img.naturalHeight / img.naturalWidth || 1;
      pctx.clearRect(0, 0, w, h);
      pctx.drawImage(img, cx - sz/2, cy - sz*ratio/2, sz, sz * ratio);
    };

    if(img.complete && img.naturalWidth > 0) draw();
    else {
      img.onload = draw;
      img.onerror = () => {
        pctx.clearRect(0, 0, w, h);
        pctx.fillStyle = '#C14A4A';
        pctx.font = 'bold 11px Tajawal, sans-serif';
        pctx.textAlign = 'center';
        pctx.fillText('⚠', cx, cy + 4);
      };
    }
    return;
  }
  
  if(cat === 'spark'){
    pctx.fillStyle = '#E07A3F';
    pctx.beginPath(); pctx.arc(w*0.82, h/2, 6, 0, Math.PI*2); pctx.fill();
    if(item.id === 'none') return;

    const palette = SPARK_PALETTES[item.id];
    const colors = palette ? palette.colors : ['#E07A3F'];
    const count = 12;
    for(let i=0;i<count;i++){
      const t = i/count;
      const px = w*0.82 - t*(w*0.75);
      const py = h/2 + Math.sin(i*0.9 + t*3)*4 + (Math.random()-0.5)*3;
      const col = item.id==='rainbow' ? `hsl(${i*30},85%,65%)` : colors[i % colors.length];
      const sz = 2.5 + (1-t)*1.5;
      pctx.globalAlpha = 1 - t*0.85;
      pctx.fillStyle = col;
      if(item.id === 'hearts'){
        pctx.beginPath();
        pctx.moveTo(px, py+sz*0.4);
        pctx.bezierCurveTo(px+sz*1.1, py-sz*0.5, px+sz*0.6, py-sz*1.3, px, py-sz*0.5);
        pctx.bezierCurveTo(px-sz*0.6, py-sz*1.3, px-sz*1.1, py-sz*0.5, px, py+sz*0.4);
        pctx.fill();
      } else if(item.id === 'stars'){
        pctx.beginPath();
        for(let k=0;k<8;k++){
          const a = (k/8)*Math.PI*2;
          const rr = k%2===0 ? sz*1.1 : sz*0.45;
          const qx = px+Math.cos(a)*rr, qy = py+Math.sin(a)*rr;
          k===0 ? pctx.moveTo(qx,qy) : pctx.lineTo(qx,qy);
        }
        pctx.closePath(); pctx.fill();
      } else if(item.id === 'bubbles'){
        pctx.strokeStyle = col; pctx.lineWidth = 1.2;
        pctx.beginPath(); pctx.arc(px,py,sz,0,Math.PI*2); pctx.stroke();
      } else if(item.id === 'digital'){
        pctx.fillRect(px-sz/2, py-sz/2, sz, sz);
      } else {
        pctx.beginPath(); pctx.arc(px, py, sz, 0, Math.PI*2); pctx.fill();
      }
    }
    pctx.globalAlpha = 1;

  } else if(cat === 'trail'){
    for(let i=0;i<6;i++){
      const a = 1 - i/6;
      pctx.globalAlpha = a*0.9;
      let col = '#E07A3F';
      if(item.id==='sparkle') col = '#FFE060';
      else if(item.id==='fire') col = '#FF6020';
      else if(item.id==='ice') col = '#88D8FF';
      else if(item.id==='shadow') col = '#2A2020';
      else if(item.id==='bubble') col = '#A8D8E8';
      else if(item.id==='matrix') col = '#00FF80';
      else if(item.id==='rainbow') col = `hsl(${i*60}, 80%, 60%)`;
      pctx.fillStyle = col;
      pctx.beginPath(); pctx.arc(w*0.15 + i*26, cy, 6 - i*0.6, 0, Math.PI*2); pctx.fill();
    }
    pctx.globalAlpha = 1;

  } else if(cat === 'jump' || cat === 'death'){
    pctx.fillStyle = '#E07A3F';
    pctx.beginPath(); pctx.arc(cx, cy, 10, 0, Math.PI*2); pctx.fill();

  } else if(cat === 'aura'){
    const fakeR = 16;
    pctx.save();
    pctx.translate(cx, cy);
    pctx.fillStyle = '#E07A3F';
    pctx.beginPath(); pctx.arc(0, 0, fakeR*0.7, 0, Math.PI*2); pctx.fill();
    pctx.fillStyle = '#FFF';
    pctx.beginPath(); pctx.arc(-4, -3, 3, 0, Math.PI*2); pctx.arc(4, -3, 3, 0, Math.PI*2); pctx.fill();
    pctx.restore();

  } else if(cat === 'crown'){
    const fakeR = 22;
    pctx.save();
    pctx.translate(cx, cy + 8);
    pctx.fillStyle = '#E0A44C';
    pctx.beginPath(); pctx.arc(0, 0, fakeR*0.75, 0, Math.PI*2); pctx.fill();
    pctx.fillStyle = '#1A1512';
    pctx.beginPath();
    pctx.arc(-4, -2, 2, 0, Math.PI*2);
    pctx.arc(4, -2, 2, 0, Math.PI*2);
    pctx.fill();
    if(item.id !== 'none') drawCrown(pctx, fakeR*0.75, item, 60);
    pctx.restore();

  } else if(cat === 'cape'){
    const fakeR = 20;
    pctx.save();
    pctx.translate(cx - 8, cy);
    const savedCape = P.cape;
    P.cape = [];
    for(let i=0;i<10;i++){
      P.cape.push({ x: -i*4 + Math.sin(i*0.8)*3, y: i*1.2 });
    }
    if(item.id !== 'none'){
      drawCape(pctx, fakeR, item, 60, 0, 0);
    }
    P.cape = savedCape;
    pctx.fillStyle = '#E0A44C';
    pctx.beginPath(); pctx.arc(0, 0, fakeR*0.7, 0, Math.PI*2); pctx.fill();
    pctx.fillStyle = '#FFF';
    pctx.beginPath(); pctx.arc(-4, -3, 3, 0, Math.PI*2); pctx.arc(4, -3, 3, 0, Math.PI*2); pctx.fill();
    pctx.restore();
  }
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

/* ═══ إعدادات كل فئة ═══ */
const COS_CATEGORY_CONFIG = {
  /* ═══ قديمة ═══ */
  spark:      { label:'الشرار',      en:'SPARK',      icon:'✨', color:'#E8B34E', aspect:'square'  },
  eyes:       { label:'العيون',      en:'EYES',       icon:'👁️', color:'#4A88C8', aspect:'wide'    },
  companion:  { label:'الرفاق',      en:'COMPANION',  icon:'🐾', color:'#C98A2E', aspect:'square'  },
  footstep:   { label:'الآثار',      en:'FOOTSTEP',   icon:'👣', color:'#8B8278', aspect:'wide'    },
  trail:      { label:'خط السير',    en:'TRAIL',      icon:'➰', color:'#6B9B6B', aspect:'wide'    },
  jump:       { label:'القفز',       en:'JUMP',       icon:'⬆️', color:'#5A8FD8', aspect:'square'  },
  death:      { label:'النهاية',     en:'DEATH',      icon:'💀', color:'#A06AD8', aspect:'square'  },
  aura:       { label:'الهالات',     en:'AURA',       icon:'🌟', color:'#FFD060', aspect:'square'  },
  crown:      { label:'الرأسيات',    en:'CROWN',      icon:'👑', color:'#E8B34E', aspect:'square'  },
  cape:       { label:'العباءات',    en:'CAPE',       icon:'🦸', color:'#9A6AC8', aspect:'square'  },

  /* ✨ جديدة */
  headItem:   { label:'غطاء الرأس',  en:'HEADGEAR',   icon:'🎩', color:'#E85838', aspect:'square'  },
  backItem:   { label:'الظهر',       en:'BACK ITEM',  icon:'🦋', color:'#4A88C8', aspect:'square'  },
  heldItem:   { label:'المحمول',     en:'HELD ITEM',  icon:'⚔️', color:'#C98A2E', aspect:'square'  },
  groundMark: { label:'العلامة الأرضية', en:'GROUND', icon:'⭕', color:'#6B9B6B', aspect:'square'  },
  nameTag:    { label:'بطاقة الاسم', en:'NAME TAG',   icon:'🏷️', color:'#A06AD8', aspect:'wide'    },
  badge:      { label:'الشارة',      en:'BADGE',      icon:'⭐', color:'#E8B34E', aspect:'square'  },
  avatarFrame:{ label:'الإطار',      en:'FRAME',      icon:'🖼️', color:'#FFD060', aspect:'square'  },
  banner:     { label:'الخلفية',     en:'BANNER',     icon:'🎨', color:'#E85838', aspect:'wide'    },
  spawnEffect:{ label:'تأثير البداية', en:'SPAWN',    icon:'🚀', color:'#4A88C8', aspect:'square'  },
  reviveEffect:{ label:'تأثير الإحياء', en:'REVIVE',  icon:'💫', color:'#FFD060', aspect:'square'  },
  hitEffect:  { label:'تأثير الارتطام', en:'HIT',     icon:'💥', color:'#E85838', aspect:'square'  }
};

/* ═══ الحصول على إعدادات الفئة ═══ */
function getCosCategoryConfig(cat){
  return COS_CATEGORY_CONFIG[cat] || {
    label: (typeof CATEGORY_LABELS !== 'undefined' && CATEGORY_LABELS[cat]) || cat,
    en: cat.toUpperCase(),
    icon: '✨',
    color: '#8B8278',
    aspect: 'square'
  };
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

  /* ═══ ضمان تهيئة الفئات ═══ */
  const cat = currentCosTab;
  if(!Save.data.cosmetics.owned[cat])  Save.data.cosmetics.owned[cat]  = [];
  if(!Save.data.cosmetics.current[cat]) Save.data.cosmetics.current[cat] = '';

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

/* جزيرة عائمة — 90 إلى 260 بكسل فوق اللاعب (مدى قفزة مزدوجة) */
function spawnSkyIsland(layer){
  const w = rand(120, 190);
  const h = 16;
  const y = P.y - rand(90, 260);

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

  const r = Math.random();
  if(r < 0.25) orbs.push({ x: W + 40 + w/2, y: y - 30, r: 16, t:0, dead:false, color:'#FFD700', isSkyOrb:true, value: 15 });
  else if(r < 0.65) spawnCoinCluster(W + 40 + w/2, y - 25, Math.floor(rand(4,7)));
}

/* عمود أطلال */
function spawnSkyRuinColumn(layer){
  const w = rand(50, 80);
  const h = rand(120, 220);
  const y = P.y - rand(120, 260);
  const isWall = Math.random() < 0.5;

  if(isWall){
    obstacles.push({
      x: W + 40, w, h, type:'block',
      isWalk: true,
      y, baseY: y,
      t:0, passed:false, dead:false,
      color: layer.wall, colorDark: layer.wallDark, accent: layer.accent,
      isSkyRuins: true
    });
  } else {
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

/* حلقة كونية */
function spawnSkyRing(layer){
  const r = 50;
  const y = P.y - rand(140, 280);

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

  orbs.push({ x: W + 40 + r, y: y + r, r: 16, t: 0, dead: false, color: '#FFD700', isSkyOrb: true, value: 20 });
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
  initCape();
  initCompanion();

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

/* ═══ تأثير البداية — استدعها في startGame() بعد resetRun() ═══ */
function spawnSpawnEffect(){
  const fx = currentSpawnEffect();
  if(!fx || fx.id === 'none') return;

  if(hasItemImage(fx)){
    /* ✅ صورة واحدة تتوسع تدريجياً */
    particles.push({
      x: P.x, y: P.y,
      vx: 0, vy: 0,
      life: 1.2, decay: 0.018,
      item: fx,
      size: 80,
      scaleOverLife: 2.5,   /* يتضخم 2.5x خلال حياته */
      color: '#FFFFFF'
    });
    return;
  }

  /* fallback برمجي — انفجار تقليدي */
  for(let i = 0; i < 40; i++){
    const a = (i / 40) * Math.PI * 2;
    particles.push({
      x: P.x, y: P.y,
      vx: Math.cos(a) * rand(4, 10),
      vy: Math.sin(a) * rand(4, 10),
      life: 1.4, decay: 0.016,
      color: '#FFFFFF', size: rand(3, 6)
    });
  }
}

/* ═══ تأثير الإحياء — عند secondChance / phoenix ═══ */
function spawnReviveEffect(){
  const fx = currentReviveEffect();
  if(!fx || fx.id === 'none') return;

  if(hasItemImage(fx)){
    particles.push({
      x: P.x, y: P.y,
      vx: 0, vy: 0,
      life: 1.6, decay: 0.014,
      item: fx,
      size: 100,
      scaleOverLife: 3,
      color: '#FFFFFF'
    });
    return;
  }

  /* fallback — حلقة نور صاعدة */
  for(let i = 0; i < 30; i++){
    const a = (i / 30) * Math.PI * 2;
    particles.push({
      x: P.x, y: P.y,
      vx: Math.cos(a) * rand(3, 7),
      vy: Math.sin(a) * rand(3, 7) - 2,
      life: 1.4, decay: 0.02,
      color: '#FFF8C0', size: rand(3, 6)
    });
  }
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
    /* ═══════════════ 1) اكتشف نوع الجهاز/المتصفح ═══════════════ */
    const ua = navigator.userAgent || '';
    const isMobile = /Android|iPhone|iPad|iPod|Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    /* متصفحات داخل التطبيقات — Google يحجب فيها OAuth أصلاً */
    const isInAppBrowser = /FBAN|FBAV|FB_IAB|Instagram|Twitter|Line\/|WhatsApp|MicroMessenger|Snapchat|Pinterest/i.test(ua);

    /* ═══════════════ 2) متصفح داخل تطبيق — لا يمكن تسجيل الدخول ═══════════════ */
    if (isInAppBrowser) {
      return {
        ok: false,
        code: 'in-app-browser',
        error: 'افتح اللعبة في متصفح خارجي (Chrome أو Safari) لتسجيل الدخول بـ Google'
      };
    }

    /* ═══════════════ 3) على الهاتف: استخدم redirect مباشرة (popup محجوب) ═══════════════ */
    if (isMobile) {
      try {
        await this.auth.signInWithRedirect(provider);
        return { ok: true, redirect: true };
      } catch (e) {
        return this._handleAuthError(e);
      }
    }

    /* ═══════════════ 4) على سطح المكتب: جرّب popup أولاً ═══════════════ */
    try {
      const cred = await this.auth.signInWithPopup(provider);
      return { ok: true, user: cred.user };
    } catch (e) {
      const fallbackCodes = [
        'auth/popup-blocked',
        'auth/popup-closed-by-user',
        'auth/cancelled-popup-request',
        'auth/operation-not-supported-in-this-environment',
        'auth/web-storage-unsupported'
      ];

      if (fallbackCodes.includes(e.code)) {
        try {
          await this.auth.signInWithRedirect(provider);
          return { ok: true, redirect: true };
        } catch (e2) {
          return this._handleAuthError(e2);
        }
      }
      return this._handleAuthError(e);
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
      msg = 'تسجيل الدخول بـ Google غير مُفعّل في Firebase. فعّله من Authentication → Sign-in method';
    } else if (code.includes('network-request-failed')) {
      msg = 'فشل الاتصال بالشبكة، تحقّق من الإنترنت';
    } else if (code.includes('invalid-api-key')) {
      msg = 'مفتاح Firebase API غير صالح — تحقّق من FIREBASE_CONFIG';
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
  if (result.redirect) return;

  const user = result.user;

  if (!Cloud.profile) Cloud.profile = { uid: user.uid, username: null };

  try {
    await Cloud.loadProfile(user.uid);
  } catch(e) {
    Cloud.profile = { uid: user.uid, username: null };
  }

  if (!Cloud.profile) Cloud.profile = { uid: user.uid, username: null };

  if (!Cloud.profile.username && user.displayName) {
    const suggested = user.displayName.replace(/[^A-Za-z0-9_\u0600-\u06FF]/g, '').slice(0, 16) || '';
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

  /* ═══════════════ ✅ 1) استرجع نتيجة redirect إن وُجدت ═══════════════ */
  try {
    const redirectResult = await Cloud.auth.getRedirectResult();
    if (redirectResult && redirectResult.user) {
      console.log('[Cloud] Redirect sign-in succeeded:', redirectResult.user.uid);
      /* ستُعالج تلقائياً عبر onAuthStateChanged أدناه */
    }
  } catch (e) {
    console.warn('[Cloud] getRedirectResult error:', e);
    /* أظهر خطأ إذا فشلت عملية الـ redirect */
    const errCode = (e && e.code) || '';
    if (errCode && errCode !== 'auth/no-auth-event') {
      let msg = 'تعذّر إكمال تسجيل الدخول';
      if (errCode.includes('unauthorized-domain')) {
        msg = 'النطاق الحالي غير مصرّح في Firebase';
      } else if (errCode.includes('network-request-failed')) {
        msg = 'فشل الاتصال بالشبكة';
      } else if (errCode.includes('account-exists-with-different-credential')) {
        msg = 'هذا البريد مسجّل بطريقة دخول أخرى';
      }
      setTimeout(() => {
        try { showLoginError(msg); } catch(_){}
      }, 500);
    }
  }

  /* ═══════════════ 2) مستمع حالة الدخول (كما هو) ═══════════════ */
  Cloud.auth.onAuthStateChanged(async (user) => {
    if (user) {
      /* ✅ إصلاح: كشف تغيير المستخدم وتصفير البيانات القديمة فوراً */
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
      } catch (e) {}

      if(isAdminUser()){
        Save.data.admin.access = true;
        /* ❌ لا تستدعِ Save.save() هنا — mergeAndGoHome سيتولى ذلك */
      }
      applyAdminEffects();
      updateProfileUI();

      if (!Cloud.profile || !Cloud.profile.username) {
        if (user.displayName) {
          const inp = document.getElementById('setup-username');
          if (inp && !inp.value) {
            inp.value = user.displayName.replace(/[^A-Za-z0-9_\u0600-\u06FF]/g,'').slice(0,16);
            inp.dispatchEvent(new Event('input'));
          }
        }
        showScreen('s-profile-setup');
        setTimeout(() => {
          const inp = document.getElementById('setup-username');
          if (inp) inp.focus();
        }, 300);
      } else {
        await mergeAndGoHome();
      }
    } else {
      Cloud.user = null;
      Cloud.profile = null;
      /* ✅ إصلاح: تصفير البيانات أيضاً عند تسجيل الخروج */
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

  ['unlimitedCoins','unlimitedUnlock','godMode'].forEach(k=>{
    const sw = document.getElementById('sw-' + k);
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

const keyMap = {
  skin:'customSkins', eyes:'customEyes', companion:'customCompanion',
  footstep:'customFootstep', spark:'customSpark', trail:'customTrail',
  jump:'customJump', death:'customDeath', aura:'customAura',
  crown:'customCrown', cape:'customCape',
  /* ✨ جديدة */
  headItem:'customHeadItem', backItem:'customBackItem', heldItem:'customHeldItem',
  groundMark:'customGroundMark', nameTag:'customNameTag', badge:'customBadge',
  avatarFrame:'customAvatarFrame', banner:'customBanner',
  spawnEffect:'customSpawnEffect', reviveEffect:'customReviveEffect', hitEffect:'customHitEffect'
};

  const key = keyMap[currentAdminTab];
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

async function deleteCustomItem(cat, idx){
  if(cat === 'skin'){
    Save.data.admin.customSkins.splice(idx, 1);
  } else {
    const key = 'custom' + cat.charAt(0).toUpperCase() + cat.slice(1);
    Save.data.admin[key].splice(idx, 1);
  }
  Save.save();
  await pushAdminContent();
  buildAdminContentList();
  buildAdminSourcesList();
  Sfx.tap();
}

const ALL_CUSTOM_KEYS = [
  'customSkins','customEyes','customCompanion','customFootstep',
  'customSpark','customTrail','customJump','customDeath',
  'customAura','customCrown','customCape',
  /* ✨ جديدة */
  'customHeadItem','customBackItem','customHeldItem',
  'customGroundMark','customNameTag','customBadge',
  'customAvatarFrame','customBanner',
  'customSpawnEffect','customReviveEffect','customHitEffect'
];

async function pushAdminContent(){
  if(!Cloud.user || !Cloud.db) return { ok: false, msg: 'غير متصل' };
  try {
    const payload = { updatedAt: firebase.firestore.FieldValue.serverTimestamp(), updatedBy: Cloud.user.uid };
    for(const k of ALL_CUSTOM_KEYS) payload[k] = Save.data.admin[k] || [];

    await Cloud.db.collection('admin_content').doc('global').set(payload, { merge: false });
    Save.data.admin.lastContentSync = Date.now();
    Save.save();
    return { ok: true };
  } catch(e){
    console.error('[pushAdminContent]', e);
    return { ok: false, msg: e.message };
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

/* ═══ حذف عنصر (محلياً + السحابة) ═══ */
async function deleteCustomItem(cat, idx){
const keyMap = {
  skin:'customSkins', eyes:'customEyes', companion:'customCompanion',
  footstep:'customFootstep', spark:'customSpark', trail:'customTrail',
  jump:'customJump', death:'customDeath', aura:'customAura',
  crown:'customCrown', cape:'customCape',
  /* ✨ جديدة */
  headItem:'customHeadItem', backItem:'customBackItem', heldItem:'customHeldItem',
  groundMark:'customGroundMark', nameTag:'customNameTag', badge:'customBadge',
  avatarFrame:'customAvatarFrame', banner:'customBanner',
  spawnEffect:'customSpawnEffect', reviveEffect:'customReviveEffect', hitEffect:'customHitEffect'
};
  const key = keyMap[cat];
  Save.data.admin[key].splice(idx, 1);
  Save.save();
  await pushAdminContent();
  buildAdminContentList();
  Sfx.tap();
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

/* ═══ خريطة مفاتيح التصنيفات (ثابت مركزي) ═══ */
const ADMIN_KEY_MAP = Object.freeze({
  skin:        'customSkins',
  eyes:        'customEyes',
  companion:   'customCompanion',
  footstep:    'customFootstep',
  spark:       'customSpark',
  trail:       'customTrail',
  jump:        'customJump',
  death:       'customDeath',
  aura:        'customAura',
  crown:       'customCrown',
  cape:        'customCape',
  /* ✨ الفئات الجديدة */
  headItem:    'customHeadItem',
  backItem:    'customBackItem',
  heldItem:    'customHeldItem',
  groundMark:  'customGroundMark',
  nameTag:     'customNameTag',
  badge:       'customBadge',
  avatarFrame: 'customAvatarFrame',
  banner:      'customBanner',
  spawnEffect: 'customSpawnEffect',
  reviveEffect:'customReviveEffect',
  hitEffect:   'customHitEffect'
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

/* ═══ 3) إغلاق نموذج إضافة عنصر ═══ */
function closeAdminItemForm(){
  const form = document.getElementById('admin-form');
  if(form) form.style.display = 'none';
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
      setStatus('✓ تم النشر بنجاح لكل الحسابات', 'ok');
      Sfx.reward(); haptic(20);
    } else {
      setStatus('⚠ حُفظ محلياً — فشل النشر: ' + (r.msg || 'غير معروف'), 'err');
      haptic(20);
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
      body: s.color || '#E07A3F',
      bodyDark: s.color2 || '#A05020',
      detail: '#1A1512',
      accent: s.color || '#E07A3F',
      accessory: 'none',
      pattern: 'none',
      price: (s.placements || []).find(p => p.type === 'shop')?.price || 0,
      rarity: s.rarity || 'common',
      imagePath: s.imagePath || null,
      placements: s.placements || [],
      isCustom: true
    }));
  return [...SKINS, ...custom];
}

function getAllCosmetics(cat){
  const base = COSMETICS[cat] || [];
const keyMap = {
  skin:'customSkins', eyes:'customEyes', companion:'customCompanion',
  footstep:'customFootstep', spark:'customSpark', trail:'customTrail',
  jump:'customJump', death:'customDeath', aura:'customAura',
  crown:'customCrown', cape:'customCape',
  /* ✨ جديدة */
  headItem:'customHeadItem', backItem:'customBackItem', heldItem:'customHeldItem',
  groundMark:'customGroundMark', nameTag:'customNameTag', badge:'customBadge',
  avatarFrame:'customAvatarFrame', banner:'customBanner',
  spawnEffect:'customSpawnEffect', reviveEffect:'customReviveEffect', hitEffect:'customHitEffect'
};
  const key = keyMap[cat];
  const custom = (Save.data.admin[key] || [])
    .filter(c => c.enabled !== false)
    .map(c => ({
      id: c.id,
      name: c.name,
      price: (c.placements || []).find(p => p.type === 'shop')?.price || 0,
      desc: c.nameEn || c.name,
      color: c.color,
      color2: c.color2,
      imagePath: c.imagePath || null,
      placements: c.placements || [],
      isCustom: true
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

  document.querySelectorAll('#cos-tabs .tab-chip').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      document.querySelectorAll('#cos-tabs .tab-chip').forEach(t=>t.classList.remove('active'));
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

    const cats = [
      'skin','eyes','companion','footstep','spark','trail','jump','death','aura','crown','cape',
      'headItem','backItem','heldItem','groundMark','nameTag','badge',
      'avatarFrame','banner','spawnEffect','reviveEffect','hitEffect'
    ];

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

    const keyMap = {
      skin:'customSkins', eyes:'customEyes', companion:'customCompanion',
      footstep:'customFootstep', spark:'customSpark', trail:'customTrail',
      jump:'customJump', death:'customDeath', aura:'customAura',
      crown:'customCrown', cape:'customCape',
      headItem:'customHeadItem', backItem:'customBackItem', heldItem:'customHeldItem',
      groundMark:'customGroundMark', nameTag:'customNameTag', badge:'customBadge',
      avatarFrame:'customAvatarFrame', banner:'customBanner',
      spawnEffect:'customSpawnEffect', reviveEffect:'customReviveEffect', hitEffect:'customHitEffect'
    };

    const key = keyMap[this.contentTab];
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
    const folders = {
      skin: 'skins', eyes: 'eyes', companion: 'companion', footstep: 'footstep',
      spark: 'spark', trail: 'trail', jump: 'jump', death: 'death',
      aura: 'aura', crown: 'crown', cape: 'cape',
      headItem: 'head', backItem: 'back', heldItem: 'held',
      groundMark: 'marks', nameTag: 'tags', badge: 'badges',
      avatarFrame: 'frames', banner: 'banners',
      spawnEffect: 'spawn', reviveEffect: 'revive', hitEffect: 'hit'
    };
    return folders[cat] || 'misc';
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

    const cats = [
      { id: 'skin', label: 'الزي' },
      { id: 'aura', label: 'الهالة' },
      { id: 'crown', label: 'الرأسية' },
      { id: 'cape', label: 'العباءة' },
      { id: 'headItem', label: 'غطاء الرأس' },
      { id: 'backItem', label: 'الظهر' },
      { id: 'heldItem', label: 'المحمول' },
      { id: 'groundMark', label: 'الأرضية' },
      { id: 'eyes', label: 'العيون' },
      { id: 'companion', label: 'الرفيق' }
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