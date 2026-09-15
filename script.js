/* ============================================================
   ==================== FIREBASE CONFIG ======================
   ============================================================ */
/* إعدادات Firebase — الصق إعدادات مشروعك هنا */
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

function hexRgb(h){h=h.replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
function rgbHex(r,g,b){return '#'+[r,g,b].map(v=>Math.round(clamp(v,0,255)).toString(16).padStart(2,'0')).join('');}
function mixColor(a,b,t){const ca=hexRgb(a),cb=hexRgb(b);return rgbHex(ca[0]+(cb[0]-ca[0])*t,ca[1]+(cb[1]-ca[1])*t,ca[2]+(cb[2]-ca[2])*t);}
function roundRect(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);if(r<0)r=0;c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}

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
    { id:'none',      name:'بدون',    price:0,    desc:'لا شرار' },
    { id:'sparks',    name:'شرار',    price:150,  desc:'جمرات برتقالية' },
    { id:'bubbles',   name:'فقاعات',  price:250,  desc:'فقاعات تطفو' },
    { id:'stars',     name:'نجوم',    price:350,  desc:'نجوم صغيرة' },
    { id:'hearts',    name:'قلوب',    price:450,  desc:'قلوب وردية' },
    { id:'notes',     name:'نوتات',   price:550,  desc:'رموز موسيقية' },
    { id:'leaves',    name:'أوراق',   price:600,  desc:'أوراق الخريف' },
    { id:'petals',    name:'بتلات',   price:700,  desc:'بتلات وردية' },
    { id:'snow',      name:'ثلج',     price:750,  desc:'ندف ثلجية' },
    { id:'digital',   name:'رقمي',    price:900,  desc:'بكسلات مضيئة' },
    { id:'lightning', name:'برق',     price:1100, desc:'شرارات كهربائية' },
    { id:'firefly',   name:'يراعات',  price:1400, desc:'أضواء متوهجة' },
    { id:'rainbow',   name:'قوس قزح', price:1800, desc:'مطر ملون' },
    { id:'cosmic',    name:'كوني',    price:2400, desc:'غبار كوني' },
    { id:'gold',      name:'ذهبي',    price:3000, desc:'غبار ذهبي فاخر' }
  ],
  trail: [
    { id:'default', name:'افتراضي', price:0,   desc:'خط سير بسيط' },
    { id:'sparkle', name:'لمعان',   price:200, desc:'نجوم صغيرة' },
    { id:'fire',    name:'نار',     price:400, desc:'شرارات نارية' },
    { id:'ice',     name:'ثلج',     price:400, desc:'بلورات ثلجية' },
    { id:'rainbow', name:'قوس قزح', price:800, desc:'ألوان متدرجة' },
    { id:'shadow',  name:'ظل',      price:600, desc:'هالة سوداء' },
    { id:'bubble',  name:'فقاعي',   price:900, desc:'فقاعات صاعدة' },
    { id:'matrix',  name:'مصفوفة',  price:1200,desc:'أرقام متلألئة' }
  ],
  jump: [
    { id:'default', name:'افتراضي', price:0,   desc:'قفزة عادية' },
    { id:'ring',    name:'حلقة',    price:250, desc:'حلقة متوسعة' },
    { id:'burst',   name:'انفجار',  price:450, desc:'جزيئات متطايرة' },
    { id:'star',    name:'نجمة',    price:600, desc:'نجمة متوسعة' },
    { id:'shockwave',name:'موجة',   price:800, desc:'موجة ارتدادية' },
    { id:'spiral',  name:'حلزون',   price:1000,desc:'دوامة متوسعة' }
  ],
  death: [
    { id:'default', name:'افتراضي', price:0,   desc:'جزيئات بسيطة' },
    { id:'explode', name:'انفجار',  price:300, desc:'انفجار كبير' },
    { id:'dissolve',name:'تلاشي',   price:500, desc:'تلاشي ناعم' },
    { id:'pixel',   name:'بكسل',    price:700, desc:'تفكك بكسلي' },
    { id:'shatter', name:'تحطم',    price:900, desc:'شظايا زجاجية' },
    { id:'nova',    name:'مستعر',   price:1200,desc:'انفجار نجمي' }
  ]
};

/* ============================================================
   ==================== Skins ================================
   ============================================================ */
const SKINS = [
  { id:'cream', ar:'كريمي', en:'CREAM', body:'#F5EFE6', bodyDark:'#D9CBBA', detail:'#1A1512', accent:'#FFB060', accessory:'none', pattern:'none', price:0, rarity:'common' },
  { id:'amber', ar:'عنبري', en:'AMBER', body:'#E0A44C', bodyDark:'#B07628', detail:'#1A1512', accent:'#FFD080', accessory:'horns', pattern:'none', price:150, rarity:'common' },
  { id:'slate', ar:'حجري', en:'SLATE', body:'#5A6270', bodyDark:'#3A4048', detail:'#F5EFE6', accent:'#9AACBC', accessory:'none', pattern:'spots', price:300, rarity:'common' },
  { id:'rose', ar:'وردي', en:'ROSE', body:'#E89BA8', bodyDark:'#C06878', detail:'#1A1512', accent:'#FFDCE4', accessory:'wings', pattern:'none', price:500, rarity:'rare' },
  { id:'sage', ar:'زيتوني', en:'SAGE', body:'#7BA47B', bodyDark:'#4E7A4E', detail:'#1A1512', accent:'#D8F0A8', accessory:'leaf', pattern:'none', price:750, rarity:'rare' },
  { id:'sky', ar:'سماوي', en:'SKY', body:'#88C8E8', bodyDark:'#4E90B8', detail:'#1A1512', accent:'#FFFFFF', accessory:'cloud', pattern:'none', price:1000, rarity:'rare' },
  { id:'ink', ar:'حِبري', en:'INK', body:'#2A2622', bodyDark:'#100E0C', detail:'#E8D0FF', accent:'#A080FF', accessory:'spikes', pattern:'none', glow:true, glowColor:'#6A50B0', price:1500, rarity:'epic' },
  { id:'gold', ar:'ذهبي', en:'GOLD', body:'#E8B34E', bodyDark:'#B08028', detail:'#1A1512', accent:'#FFF4C0', accessory:'halo', pattern:'none', sparkle:true, price:2000, rarity:'epic' },
  { id:'lava', ar:'بركاني', en:'LAVA', body:'#E85838', bodyDark:'#A03018', detail:'#1A1512', accent:'#FFD060', accessory:'horns', pattern:'stripes', glow:true, glowColor:'#FF5020', price:3000, rarity:'epic' },
  { id:'neon', ar:'نيون', en:'NEON', body:'#00E8D8', bodyDark:'#007870', detail:'#0A2828', accent:'#FF00A8', accessory:'star', pattern:'none', glow:true, glowColor:'#00E8D8', price:4000, rarity:'legend' },
  { id:'rainbow', ar:'قوس قزح', en:'RAINBOW', body:'#FF6088', bodyDark:'#A03060', detail:'#1A1512', accent:'#FFE060', accessory:'rainbow', pattern:'rainbow', rainbow:true, price:6000, rarity:'legend' },
  { id:'ghost', ar:'شبح', en:'GHOST', body:'#F0F0FF', bodyDark:'#B8B8D8', detail:'#4A4060', accent:'#FFFFFF', accessory:'none', pattern:'none', transparent:true, ghostly:true, price:8000, rarity:'legend' },
  { id:'void', ar:'الفراغ', en:'VOID', body:'#1A0A2A', bodyDark:'#0A0414', detail:'#FF80FF', accent:'#C080FF', accessory:'star', pattern:'none', glow:true, glowColor:'#A040FF', price:12000, rarity:'mythic' },
  { id:'sun', ar:'الشمس', en:'SUN', body:'#FFE060', bodyDark:'#E8A020', detail:'#5A2010', accent:'#FFFFFF', accessory:'halo', pattern:'none', glow:true, glowColor:'#FFD040', sparkle:true, price:15000, rarity:'mythic' }
];

const RARITY_LABELS = {
  common:  'عادي',
  rare:    'نادر',
  epic:    'ملحمي',
  legend:  'أسطوري',
  mythic:  'خرافي'
};

function currentSkin(){ return SKINS.find(s=>s.id===Save.data.currentSkin) || SKINS[0]; }
function currentSpark(){ return COSMETICS.spark.find(c=>c.id===Save.data.cosmetics.current.spark) || COSMETICS.spark[0]; }
function currentTrail(){ return COSMETICS.trail.find(c=>c.id===Save.data.cosmetics.current.trail) || COSMETICS.trail[0]; }
function currentJump(){ return COSMETICS.jump.find(c=>c.id===Save.data.cosmetics.current.jump) || COSMETICS.jump[0]; }
function currentDeath(){ return COSMETICS.death.find(c=>c.id===Save.data.cosmetics.current.death) || COSMETICS.death[0]; }

/* ============================================================
   ==================== Save =================================
   ============================================================ */
const Save = {
  KEY:'shift_v10',
  data:{
    coins:0,
    bestMeters:{FLIP:0,FLAP:0,DRIFT:0,WALK:0,FLIP_WALK:0,SKY_JUMP:0},
    ownedSkins:['cream'],
    currentSkin:'cream',
    cosmetics:{
      owned:{ spark:['none'], trail:['default'], jump:['default'], death:['default'] },
      current:{ spark:'none', trail:'default', jump:'default', death:'default' }
    },
    achievements:{},
    claimedGlobalLevels:[],
    mode:'FLIP',
    stats:{totalPlays:0,totalMeters:0,totalCoins:0,orbCount:0,bestMeters:0,bestCombo:0},
    settings:{sound:true,haptics:true},
    season:{ number: 1, startDate: null, points: 0 },
    battlePass:{ claimedFree: [], claimedPremium: [] },
    missions:{
      daily: [], weekly: [], monthly: [],
      dailyReset: null, weeklyReset: null, monthlyReset: null,
      progressDaily: { plays:0, meters:0, coins:0, orbs:0 },
      progressWeekly: { plays:0, meters:0, coins:0, orbs:0 },
      progressMonthly: { plays:0, meters:0, coins:0, orbs:0 }
    },
    dailyLogin:{ streak: 0, lastClaim: null, claimedToday: false }
  },
  load(){
    try{
      const raw = localStorage.getItem(this.KEY);
      if(raw){
        const p = JSON.parse(raw);
        for(const k in p){
          if(typeof p[k] === 'object' && !Array.isArray(p[k]) && p[k] !== null){
            Object.assign(this.data[k], p[k]);
          } else {
            this.data[k] = p[k];
          }
        }
      }
    }catch(e){}
    if(!this.data.cosmetics.owned.spark) this.data.cosmetics.owned.spark = ['none'];
    if(!this.data.cosmetics.current.spark) this.data.cosmetics.current.spark = 'none';
  },
  save(){ try{ localStorage.setItem(this.KEY, JSON.stringify(this.data)); }catch(e){} },
  reset(){ try{ localStorage.removeItem(this.KEY); }catch(e){} location.reload(); }
};
Save.load();

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
   ==================== Power-ups ============================
   ============================================================ */
const POWERUP_TYPES = [
  { id:'magnet', icon:'◉', color:'#C99AC9', label:'مغناطيس' },
  { id:'double', icon:'×2', color:'#E4B853', label:'مضاعف' },
  { id:'slow',   icon:'◔', color:'#8FB8D8', label:'تبطيء' },
  { id:'shield', icon:'◈', color:'#7BC4B0', label:'درع' },
  { id:'ghost',  icon:'◯', color:'#B8A4C9', label:'شبح' }
];
function rollPowerupDuration(){ return Math.floor(rand(300, 1800)); }

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
  weather:'petal', weatherRate:0.3
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
  mkScene({ id:'lagoon', en:'LAGOON', ar:'البحيرة', sky:'#A8D8E8', skyBot:'#5EA8C8',
    hillFar:'#7CB8D0', hillMid:'#4A88A8', hillNear:'#2A5878',
    ground:'#1E4460', groundDark:'#0E2A40', accent:'#FFC84A', wall:'#2A5878', wallDark:'#183C58',
    cloud:'#FFFFFF', sun:'#FFF0B8', sunGlow:'#FFF8D8', weather:'rain', weatherRate:0.55 }),
  mkScene({ id:'canyon', en:'CANYON', ar:'الوادي', sky:'#FFC088', skyBot:'#F07840',
    hillFar:'#E89860', hillMid:'#C86030', hillNear:'#8E3E18',
    ground:'#5E2810', groundDark:'#381608', accent:'#FF4A2A', wall:'#8E3E18', wallDark:'#5E2810',
    cloud:'#FFE8D0', sun:'#FFB050', sunGlow:'#FFD890', weather:'ember', weatherRate:0.28 }),
  mkScene({ id:'dusk', en:'DUSK', ar:'الغسق', sky:'#8A78A8', skyBot:'#4A3A68',
    hillFar:'#6E5888', hillMid:'#4A3868', hillNear:'#2E2048',
    ground:'#1E1430', groundDark:'#0E0820', accent:'#F0A0A8', wall:'#2E2048', wallDark:'#1A1030',
    cloud:'#C8B8D8', sun:'#F5D88A', sunGlow:'#FFE8C0', weather:'firefly', weatherRate:0.22 }),
  mkScene({ id:'frost', en:'FROST', ar:'الصقيع', sky:'#B8CCE0', skyBot:'#7898B8',
    hillFar:'#98B0C8', hillMid:'#6888A8', hillNear:'#406080',
    ground:'#284058', groundDark:'#142838', accent:'#FFE8A0', wall:'#406080', wallDark:'#284058',
    cloud:'#FFFFFF', sun:'#FFF8E0', sunGlow:'#FFFFFF', weather:'snow', weatherRate:0.5 }),
  mkScene({ id:'night', en:'NIGHT', ar:'الليل', sky:'#0F1430', skyBot:'#1F2750',
    hillFar:'#2A3050', hillMid:'#1E2440', hillNear:'#141828',
    ground:'#0E1220', groundDark:'#05070F', accent:'#F5D77E', wall:'#2A3050', wallDark:'#141828',
    cloud:'#3A4060', moon:'#F0E8D0', moonGlow:'#F5D77E', moonAmount:1, starAmount:1,
    weather:'firefly', weatherRate:0.4 }),
  mkScene({ id:'sakura', en:'SAKURA', ar:'ساكورا', sky:'#FBE0E8', skyBot:'#F5C8D8',
    hillFar:'#EAB8C8', hillMid:'#D890A8', hillNear:'#B86888',
    ground:'#8E4868', groundDark:'#5E2E48', accent:'#E87A98', wall:'#B86888', wallDark:'#8E4868',
    cloud:'#FFFFFF', sun:'#FFD8E0', sunGlow:'#FFECF0', weather:'petal', weatherRate:0.6 }),
  mkScene({ id:'desert', en:'DESERT', ar:'الصحراء', sky:'#FFE0A8', skyBot:'#F5A860',
    hillFar:'#F0B878', hillMid:'#D89860', hillNear:'#B87048',
    ground:'#8E5030', groundDark:'#5E3218', accent:'#E85838', wall:'#B87048', wallDark:'#8E5030',
    cloud:'#FFF4DC', sun:'#FFF0A8', sunGlow:'#FFF8D8', weather:'ember', weatherRate:0.25 }),
  mkScene({ id:'volcano', en:'VOLCANO', ar:'البركان', sky:'#3A1020', skyBot:'#6E1A18',
    hillFar:'#4E1A20', hillMid:'#3A1018', hillNear:'#2A0A12',
    ground:'#1A0608', groundDark:'#0A0204', accent:'#FF5020', wall:'#3A1018', wallDark:'#1A0608',
    cloud:'#5A2028', moon:'#FF8060', moonGlow:'#FF5020', moonAmount:1, starAmount:1,
    weather:'ember', weatherRate:0.55 })
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
  { id:'FLIP',      ar:'قلب الجاذبية', en:'FLIP',     icon:'⇅', color:'#4A7FA0', desc:'اضغط لقلب الاتجاه' },
  { id:'FLAP',      ar:'التحليق',      en:'THRUST',   icon:'▲', color:'#8E6AA8', desc:'اضغط للارتفاع' },
  { id:'DRIFT',     ar:'الانسياق',     en:'DRIFT',    icon:'✦', color:'#C98A2E', desc:'اسحب بحرية' },
  { id:'WALK',      ar:'المشي والقفز', en:'RUN',      icon:'♟', color:'#4A8040', desc:'اقفز فوق العقبات' },
  { id:'FLIP_WALK', ar:'المشي المقلوب', en:'FLIP RUN', icon:'⟰', color:'#B860A8', desc:'امشِ على السقف!' },
  { id:'SKY_JUMP',  ar:'القفز للسماء', en:'SKY JUMP', icon:'⤒', color:'#3A88C8', desc:'قفز تلقائي مستمر' }
];

/* ============================================================
   ==================== Progression ==========================
   ============================================================ */
const PIXELS_PER_METER = 25;
const PROGRESSION = {
  rampMeters: 3200, speedStart: 1.6, speedMax: 7.2,
  gapStart: 360, gapMin: 175, spawnStart: 400, spawnMin: 185,
  spikeUnlock: 60, tallUnlock: 200, wobbleUnlock: 350, wobbleMaxMeters: 1200,
  levels: [0, 40, 120, 250, 450, 750, 1150, 1700, 2500, 3600, 5000, 7000]
};

function getMeters(){ return Math.floor(G.dist / PIXELS_PER_METER); }
function getProgression(){
  const m = getMeters();
  const t = Math.min(m / PROGRESSION.rampMeters, 1);
  const eased = 1 - Math.pow(1 - t, 1.8);
  const wobbleT = clamp((m - PROGRESSION.wobbleUnlock) / (PROGRESSION.wobbleMaxMeters - PROGRESSION.wobbleUnlock), 0, 1);
  return {
    t, eased,
    speed: lerp(PROGRESSION.speedStart, PROGRESSION.speedMax, eased),
    gap: lerp(PROGRESSION.gapStart, PROGRESSION.gapMin, eased),
    spawnDist: lerp(PROGRESSION.spawnStart, PROGRESSION.spawnMin, eased),
    wobble: wobbleT * 0.65,
    hasSpike: m >= PROGRESSION.spikeUnlock,
    hasTall: m >= PROGRESSION.tallUnlock
  };
}
function getLevelIndex(){ return levelFromMeters(getMeters(), PROGRESSION.levels); }
function getLevelProgress(){
  const m = getMeters();
  const lv = getLevelIndex();
  const cur = PROGRESSION.levels[lv];
  const next = PROGRESSION.levels[lv+1] ?? (cur + 800);
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
  skyCeilY: 0
};
const P = {
  x:0,y:0,vx:0,vy:0,r:13,baseX:100,
  gravityDir:1, rot:0,
  onGround:false, jumps:0, trail:[],
  enginePhase: 0, legPhase: 0, bouncePhase: 0
};
let obstacles=[], orbs=[], coins=[], powerups=[], particles=[], floats=[], clouds=[];
let sparkParticles = [];
const pointer = { x:0,y:0,down:false,hasHover:false };
try{ pointer.hasHover = window.matchMedia('(hover:hover)').matches; }catch(e){}

/* ============================================================
   ==================== Scene transitions ====================
   ============================================================ */
const SCENE_THRESHOLDS = [0, 70, 180, 320, 500, 720, 1000, 1350, 1800, 2400];
const SCENE_BLEND_FRAMES = 360;

function updateSceneTransition(){
  const m = getMeters();
  let target = 0;
  for(let i=0;i<SCENE_THRESHOLDS.length;i++){ if(m >= SCENE_THRESHOLDS[i]) target = i; }
  target = target % SCENES.length;

  if(!G.sceneActive && target !== G.sceneIdx){
    G.sceneActive = true;
    G.sceneFrom = G.sceneIdx;
    G.sceneTo = target;
    G.sceneT = 0;
    const ns = SCENES[target];
    showBanner(ns.en, ns.ar);
    Sfx.level();
    const tag = document.getElementById('scene-tag');
    tag.textContent = ns.en;
    tag.classList.add('show');
  }
  if(G.sceneActive){
    G.sceneT += 1/SCENE_BLEND_FRAMES;
    if(G.sceneT >= 1){
      G.sceneT = 1;
      G.sceneIdx = G.sceneTo;
      G.sceneActive = false;
      G.currentScene = SCENES[G.sceneIdx];
      setTimeout(()=>document.getElementById('scene-tag').classList.remove('show'), 1400);
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
function spawnJumpEffect(x,y,color){
  const cos = currentJump();
  if(cos.id==='ring'){
    for(let i=0;i<8;i++){
      const a=(i/8)*Math.PI*2;
      particles.push({x,y,vx:Math.cos(a)*4,vy:Math.sin(a)*4,life:1,decay:0.035,color,size:3});
    }
  } else if(cos.id==='burst'){
    for(let i=0;i<12;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(2,5);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,decay:0.025,color,size:rand(2.5,4)});
    }
  } else if(cos.id==='star'){
    for(let i=0;i<10;i++){
      const a=(i/10)*Math.PI*2;
      particles.push({x,y,vx:Math.cos(a)*rand(3,6),vy:Math.sin(a)*rand(3,6),life:1,decay:0.03,color,size:rand(3,5)});
    }
  } else if(cos.id==='shockwave'){
    for(let i=0;i<16;i++){
      const a=(i/16)*Math.PI*2;
      particles.push({x,y,vx:Math.cos(a)*5,vy:Math.sin(a)*5,life:1.2,decay:0.02,color:'#FFFFFF',size:4});
    }
  } else if(cos.id==='spiral'){
    for(let i=0;i<20;i++){
      const a=(i/20)*Math.PI*4;
      const s=1 + i*0.25;
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.4,decay:0.018,color,size:rand(2,4)});
    }
  } else {
    dust(x,y,color,6);
  }
}
function spawnDeathEffect(x,y,color){
  const cos = currentDeath();
  if(cos.id==='explode'){
    burst(x,y,color,40,10);
    burst(x,y,'#FF8860',20,12);
  } else if(cos.id==='dissolve'){
    for(let i=0;i<40;i++){
      const a=Math.random()*Math.PI*2;
      const s=Math.random()*3;
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-0.5,life:1,decay:0.012,color,size:rand(2,4)});
    }
  } else if(cos.id==='pixel'){
    for(let i=0;i<50;i++){
      particles.push({x:x+rand(-15,15), y:y+rand(-15,15),vx:rand(-2,2), vy:rand(-3,-0.5),life:1, decay:0.018, color, size:4});
    }
  } else if(cos.id==='shatter'){
    for(let i=0;i<45;i++){
      const a = Math.random()*Math.PI*2;
      const s = rand(4,9);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.3, decay:0.018, color: mixColor(color,'#FFFFFF',0.4), size: rand(3,6)});
    }
  } else if(cos.id==='nova'){
    for(let i=0;i<60;i++){
      const a=Math.random()*Math.PI*2;
      const s=rand(3,11);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1.5,decay:0.014,
        color: i%3===0?'#FFF8C0': (i%3===1?'#FFB060':color), size:rand(3,6)});
    }
  } else {
    burst(x,y,color,30,7);
  }
}
function addFloat(x,y,text,color,size=14){ floats.push({x,y,text,color,size,life:1,vy:-1.1}); }
function showBanner(text,sub=''){ G.banner.text=text; G.banner.sub=sub; G.banner.timer=140; }
function shake(v){ G.shake = Math.max(G.shake, v); }

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
  gold:      { colors:['#E8B34E','#FFF4C0','#FFD060','#FFE8A0'], size:[2,4.5] }
};

function spawnSpark(){
  const spark = currentSpark();
  if(spark.id === 'none') return;
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
    sparkTrail: spark.id==='sparks' || spark.id==='lightning' ? 1 : 0,
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
    if(p.type === 'sparks' || p.type === 'lightning'){ p.vy += 0.06; p.vx *= 0.97; }
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
  const rate = s.weatherRate || 0.4;
  if(Math.random() < rate && G.weather.length < 60){
    const rising = s.weather==='ember' || s.weather==='firefly';
    const p = {
      x: rand(-20,W+20),
      y: rising ? (GROUND_Y - rand(-30,50)) : rand(-20,H*0.6),
      vx: rand(-0.5,-0.1),
      vy: rising ? rand(-0.6,-0.2) : rand(0.4,1.2),
      size: rand(1.2,2.6),
      life: rand(180,420), maxLife:1,
      type: s.weather,
      phase: rand(0,Math.PI*2), phaseSpd: rand(0.02,0.06)
    };
    p.maxLife = p.life;
    if(s.weather==='rain'){ p.vy=rand(3,5); p.vx=rand(-1.5,-0.8); p.size=rand(0.8,1.4); }
    G.weather.push(p);
  }
  for(let i=G.weather.length-1;i>=0;i--){
    const p = G.weather[i];
    p.life--;
    const sway = Math.sin(G.t*p.phaseSpd + p.phase);
    if(p.type==='petal'||p.type==='pollen'||p.type==='snow'){ p.x += p.vx + sway*0.5; p.y += p.vy; }
    else if(p.type==='firefly'){ p.x += p.vx + sway*0.6; p.y += p.vy + Math.sin(G.t*0.04+p.phase)*0.4; }
    else if(p.type==='ember'){ p.x += p.vx + sway*0.4; p.y += p.vy; }
    else { p.x += p.vx; p.y += p.vy; }
    if(p.life<=0 || p.x<-40 || p.x>W+40 || p.y>H+30 || p.y<-30){ G.weather.splice(i,1); }
  }
}
function drawWeather(){
  for(const p of G.weather){
    const life = p.life/p.maxLife;
    const fade = Math.min(1, life*3, (1-life)*5) * 0.85;
    if(fade<=0) continue;
    ctx.globalAlpha = fade;
    if(p.type==='rain'){
      ctx.strokeStyle = 'rgba(120,160,190,0.75)';
      ctx.lineWidth = p.size;
      ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x - p.vx*2.4, p.y - p.vy*2.4); ctx.stroke();
    } else if(p.type==='firefly'){
      ctx.globalAlpha = fade * (0.7 + Math.sin(G.t*0.1+p.phase)*0.3);
      ctx.fillStyle = '#F5D77E';
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
    } else if(p.type==='ember'){
      ctx.fillStyle = '#F0A880';
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
    } else if(p.type==='snow'){
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
    } else if(p.type==='petal'){
      ctx.fillStyle = '#F0B8C8';
      ctx.beginPath(); ctx.ellipse(p.x,p.y,p.size*1.4,p.size,Math.sin(G.t*0.05+p.phase),0,Math.PI*2); ctx.fill();
    } else {
      ctx.fillStyle = '#E8D090';
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size*0.9,0,Math.PI*2); ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
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
   ==================== Spawning =============================
   ============================================================ */
function spawnCoinCluster(cx, cy, count){
  count = count || Math.floor(rand(3,6));
  const spacing = 22;
  for(let i=0;i<count;i++){
    const t = i/(count-1) - 0.5;
    coins.push({ x: cx + i*spacing, y: cy + Math.sin(t*Math.PI)*12 - 6, r: 8, t:0, dead:false });
  }
}
function spawnPowerup(cx, cy){
  const base = POWERUP_TYPES[Math.floor(Math.random()*POWERUP_TYPES.length)];
  const duration = base.id === 'shield' ? 1 : rollPowerupDuration();
  powerups.push({ x: cx, y: cy, r: 14, type: base, duration, t: 0, dead: false });
}

function spawnObstacle(){
  if(G.mode==='WALK') spawnWalkObstacle(false);
  else if(G.mode==='FLIP_WALK') spawnCeilingObstacle();
  else if(G.mode==='SKY_JUMP') spawnSkyJumpObstacle();
  else spawnTunnelObstacle();
}

function spawnTunnelObstacle(){
  const prog = getProgression();
  const s = G.currentScene;
  const gap = prog.gap;
  const margin = 76;
  const minY = margin + gap/2;
  const maxY = GROUND_Y - margin - gap/2;
  const gapY = rand(minY, Math.max(minY,maxY));

  obstacles.push({x: W+50, w: 60, gapY, gap, baseGapY: gapY, phase: rand(0,Math.PI*2),
    amp: rand(18,42) * prog.wobble, t:0, passed:false, dead:false, isWalk:false,
    color: s.wall, colorDark: s.wallDark, accent: s.accent });

  const cy = gapY + rand(-gap*0.22, gap*0.22);
  const r = Math.random();
  if(r < 0.06){ spawnPowerup(W+50+30, gapY); }
  else if(r < 0.20){ orbs.push({ x:W+50+30, y:gapY, r:10, t:0, dead:false, color:s.accent }); }
  else if(r < 0.90){ spawnCoinCluster(W+50+30, cy); }
}

function spawnWalkObstacle(flipped){
  const prog = getProgression();
  const s = G.currentScene;
  const types = ['block'];
  if(prog.hasSpike) types.push('spike');
  if(prog.hasTall) types.push('tall');
  const type = types[Math.floor(Math.random() * types.length)];

  let w, h;
  if(type === 'block'){ w = rand(40,54); h = rand(32, 46 + prog.eased*8); }
  else if(type === 'spike'){ w = rand(36,50); h = rand(34, 48 + prog.eased*6); }
  else { w = rand(24,32); h = rand(56, 68 + prog.eased*12); }

  obstacles.push({x:W+40, w, h, type, t:0, passed:false, dead:false, isWalk:true, flipped: !!flipped,
    color:s.wall, colorDark:s.wallDark, accent:s.accent});

  const oy = GROUND_Y - h - rand(30,60);
  const r = Math.random();
  if(r < 0.06){ spawnPowerup(W+40+w/2, oy); }
  else if(r < 0.18){ orbs.push({ x:W+40+w/2, y:oy, r:10, t:0, dead:false, color:s.accent }); }
  else if(r < 0.78){ spawnCoinCluster(W+40+w/2, oy, Math.floor(rand(2,4))); }
}

function spawnCeilingObstacle(){
  const prog = getProgression();
  const s = G.currentScene;
  const types = ['block'];
  if(prog.hasSpike) types.push('spike');
  if(prog.hasTall) types.push('tall');
  const type = types[Math.floor(Math.random() * types.length)];

  let w, h;
  if(type === 'block'){ w = rand(40,54); h = rand(30, 44 + prog.eased*8); }
  else if(type === 'spike'){ w = rand(36,50); h = rand(34, 48 + prog.eased*6); }
  else { w = rand(24,32); h = rand(52, 64 + prog.eased*12); }

  obstacles.push({x:W+40, w, h, type, t:0, passed:false, dead:false,
    isWalk:true, isCeiling:true, flipped:true,
    color:s.wall, colorDark:s.wallDark, accent:s.accent});

  const oy = h + rand(30, 70);
  const r = Math.random();
  if(r < 0.06){ spawnPowerup(W+40+w/2, oy); }
  else if(r < 0.20){ orbs.push({ x:W+40+w/2, y:oy, r:10, t:0, dead:false, color:s.accent }); }
  else if(r < 0.78){ spawnCoinCluster(W+40+w/2, oy, Math.floor(rand(2,4))); }
}

function spawnSkyJumpObstacle(){
  const prog = getProgression();
  const s = G.currentScene;
  const types = ['block'];
  if(prog.hasSpike) types.push('spike');
  if(prog.hasTall) types.push('tall');
  const type = types[Math.floor(Math.random() * types.length)];

  let w, h;
  if(type === 'block'){ w = rand(42,56); h = rand(30, 46 + prog.eased*10); }
  else if(type === 'spike'){ w = rand(38,52); h = rand(32, 48); }
  else { w = rand(24,32); h = rand(50, 66 + prog.eased*10); }

  obstacles.push({x:W+40, w, h, type, t:0, passed:false, dead:false,
    isWalk:true, isSkyJump:true,
    color:s.wall, colorDark:s.wallDark, accent:s.accent});

  const oy = GROUND_Y - h - rand(50, 110);
  const r = Math.random();
  if(r < 0.08){ spawnPowerup(W+40+w/2, oy); }
  else if(r < 0.24){ orbs.push({ x:W+40+w/2, y:oy, r:10, t:0, dead:false, color:s.accent }); }
  else if(r < 0.85){ spawnCoinCluster(W+40+w/2, oy, Math.floor(rand(2,5))); }
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
  const pr = P.r * 0.72;
  if(o.isWalk){
    if(o.isCeiling){ return circleRect(P.x,P.y,pr, o.x, -10, o.w, o.h + 10); }
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
function handleTap(){
  if(G.state!=='PLAYING') return;
  Sfx.init();
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
    if(P.onGround){
      P.vy = -13.5; P.onGround=false; P.jumps=1;
      spawnJumpEffect(P.x, P.y + P.r, G.currentScene.groundDark);
      Sfx.tap(); haptic(8);
    } else if(P.jumps < 2){
      P.vy = -11.5; P.jumps++;
      spawnJumpEffect(P.x, P.y + P.r, G.currentScene.accent);
      Sfx.tap(); haptic(8);
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
canvas.addEventListener('mousedown', e=>{ e.preventDefault(); handleTap(); });
canvas.addEventListener('touchstart', e=>{ e.preventDefault(); handleTap(); }, {passive:false});
window.addEventListener('keydown', e=>{
  if(e.code==='Space'||e.code==='ArrowUp'){ e.preventDefault(); handleTap(); }
  if(e.code==='Escape' && G.state==='PLAYING') pauseGame();
});
function setPointer(e){
  const r = canvas.getBoundingClientRect();
  const cx = e.touches ? e.touches[0].clientX : e.clientX;
  const cy = e.touches ? e.touches[0].clientY : e.clientY;
  pointer.x = cx - r.left; pointer.y = cy - r.top;
}
canvas.addEventListener('mousemove', setPointer);
canvas.addEventListener('touchmove', e=>{ e.preventDefault(); setPointer(e); }, {passive:false});
canvas.addEventListener('touchstart', e=>{ setPointer(e); pointer.down=true; }, {passive:false});
canvas.addEventListener('mousedown', e=>{ setPointer(e); pointer.down=true; });
canvas.addEventListener('touchend', ()=> pointer.down=false);
canvas.addEventListener('mouseleave', ()=> pointer.down=false);
window.addEventListener('mouseup', ()=> pointer.down=false);

/* ============================================================
   ==================== Power-ups ============================
   ============================================================ */
function updatePowerups(){
  for(const id in G.activePowerups){
    G.activePowerups[id].remaining--;
    if(G.activePowerups[id].remaining <= 0){
      delete G.activePowerups[id];
      Sfx.puEnd();
      updatePowerupsUI();
    }
  }
  if(G.ghost > 0) G.ghost--;
  if(G.t % 15 === 0) updatePowerupsUI();
}
function collectPowerup(p){
  const type = p.type;
  Sfx.power(); haptic(15); shake(6);
  burst(p.x, p.y, type.color, 20, 6);
  const secs = type.id === 'shield' ? 'درع' : Math.ceil(p.duration/60) + 'ث';
  addFloat(p.x, p.y, type.label + ' ' + secs, type.color, 15);

  if(type.id === 'shield'){ G.shield = true; }
  else if(type.id === 'ghost'){
    G.ghost = p.duration;
    G.activePowerups.ghost = { remaining: p.duration, color: type.color, icon: type.icon };
  } else {
    G.activePowerups[type.id] = { remaining: p.duration, color: type.color, icon: type.icon };
  }
  updatePowerupsUI();
}
function updatePowerupsUI(){
  const row = document.getElementById('powerups-row');
  const items = [];
  if(G.shield) items.push({icon:'◈', color:'#7BC4B0', label:'درع'});
  for(const id in G.activePowerups){
    const t = G.activePowerups[id];
    const secs = Math.ceil(t.remaining/60);
    items.push({icon: t.icon, color: t.color, label: secs});
  }
  row.innerHTML = items.map(it => `
    <div class="pu-chip" style="--puc:${it.color}">
      <span class="pu-ic">${it.icon}</span>
      <span class="pu-time">${it.label}</span>
    </div>`).join('');
}

/* ============================================================
   ==================== Update ===============================
   ============================================================ */
function updateGameplay(){
  const prog = getProgression();
  const s = G.currentScene;

  updatePowerups();
  updateCombo();
  updateSparks();

  const targetSpeed = prog.speed * (s.speed || 1);
  const slowMul = G.activePowerups.slow ? 0.55 : 1;
  G.speed = lerp(G.speed, targetSpeed*slowMul, 0.035);
  G.dist += G.speed;

  updateSceneTransition();
  updateWeather();

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

  P.enginePhase += 0.15;
  P.bouncePhase += 0.2;

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
  } else if(G.mode==='WALK'){
    P.vy += 0.68; P.vy = clamp(P.vy,-20,22);
    P.y += P.vy;
    const gy = GROUND_Y - P.r;
    if(P.y >= gy){
      if(!wasOnGround){ spawnJumpEffect(P.x, GROUND_Y, s.groundDark); }
      P.y = gy; P.vy = 0; P.onGround = true; P.jumps = 0;
    } else P.onGround = false;
    P.x = P.baseX; P.rot = 0;
    P.legPhase += P.onGround ? 0.42 : 0.1;
    if(P.onGround && G.t%7===0){
      particles.push({x:P.x-6,y:P.y+P.r-2,
        vx:-1.2+rand(-0.3,0.3),vy:-0.5+rand(-0.3,0.3),
        life:0.7,decay:0.03,color:s.groundDark,size:rand(1.5,2.5)});
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
  } else {
    if(P.y-P.r<0){ P.y=P.r; P.vy=0; }
    if(P.y+P.r>GROUND_Y){ P.y=GROUND_Y-P.r; P.vy=0; }
  }

  if((G.mode==='FLIP'||G.mode==='FLAP'||G.mode==='DRIFT') && G.t%2===0){
    P.trail.push({x:P.x,y:P.y});
    if(P.trail.length>14) P.trail.shift();
  } else if(P.trail.length) P.trail.shift();

  G.spawnCd -= G.speed;
  if(G.spawnCd <= 0){
    spawnObstacle();
    const modeMul = (G.mode==='WALK') ? 1.35
                  : (G.mode==='FLIP_WALK') ? 1.45
                  : (G.mode==='SKY_JUMP') ? 1.5
                  : 1.0;
    G.spawnCd = prog.spawnDist * modeMul * rand(0.92, 1.12);
  }

  for(let i=obstacles.length-1;i>=0;i--){
    const o = obstacles[i];
    if(o.dead){ obstacles.splice(i,1); continue; }
    o.t++; o.x -= G.speed;
    if(!o.isWalk && o.amp > 0.5){
      o.gapY = o.baseGapY + Math.sin(o.t*0.016+o.phase)*o.amp;
      o.gapY = clamp(o.gapY, 70+o.gap/2, GROUND_Y-70-o.gap/2);
    }
    if(!o.passed && o.x+o.w < P.x){ o.passed = true; onPass(o); }
    if(hitObstacle(o)){
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
    if(o.x+o.w < -70) obstacles.splice(i,1);
  }

  const magnetOn = G.activePowerups.magnet !== undefined;
  const doubleOn = G.activePowerups.double !== undefined;
  const coinMul = doubleOn ? 2 : 1;

  for(let i=coins.length-1;i>=0;i--){
    const c = coins[i];
    if(c.dead){ coins.splice(i,1); continue; }
    c.x -= G.speed; c.t++;
    if(magnetOn){
      const dx = P.x - c.x, dy = P.y - c.y;
      const d = Math.hypot(dx,dy) || 1;
      if(d < 280){ c.x += (dx/d)*7.5; c.y += (dy/d)*7.5; }
    }
    if(circleCircle(P.x,P.y,P.r+5, c.x,c.y,c.r)){
      c.dead = true;
      addCombo();
      const gain = 1 * coinMul * getComboMul();
      G.runCoins += gain;
      Sfx.coin();
      burst(c.x,c.y,'#E8B34E',6,3);
      addFloat(c.x,c.y,'+'+gain,'#C98A2E',11);
    }
    if(c.x < -60) coins.splice(i,1);
  }

  for(let i=orbs.length-1;i>=0;i--){
    const ob = orbs[i];
    if(ob.dead){ orbs.splice(i,1); continue; }
    ob.x -= G.speed; ob.t++;
    if(magnetOn){
      const dx = P.x - ob.x, dy = P.y - ob.y;
      const d = Math.hypot(dx,dy) || 1;
      if(d < 280){ ob.x += (dx/d)*6; ob.y += (dy/d)*6; }
    }
    if(circleCircle(P.x,P.y,P.r+4, ob.x,ob.y,ob.r)){
      ob.dead = true; collectOrb(ob);
    }
    if(ob.x < -60) orbs.splice(i,1);
  }

  for(let i=powerups.length-1;i>=0;i--){
    const p = powerups[i];
    if(p.dead){ powerups.splice(i,1); continue; }
    p.x -= G.speed; p.t++;
    if(magnetOn){
      const dx = P.x - p.x, dy = P.y - p.y;
      const d = Math.hypot(dx,dy) || 1;
      if(d < 240){ p.x += (dx/d)*4; p.y += (dy/d)*4; }
    }
    if(circleCircle(P.x,P.y,P.r+8, p.x,p.y,p.r)){
      p.dead = true;
      collectPowerup(p);
    }
    if(p.x < -60) powerups.splice(i,1);
  }

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

  if(G.t%3===0){
    document.getElementById('hud-meters').textContent = getMeters();
    document.getElementById('hud-coins').textContent = G.runCoins;
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
  const gain = 3 * getComboMul() * (G.activePowerups.double ? 2 : 1);
  G.runCoins += gain;
  burst(ob.x,ob.y, ob.color || G.currentScene.accent, 12, 4);
  addFloat(ob.x,ob.y, '+'+gain, ob.color || G.currentScene.accent, 13);
}

/* ============================================================
   ==================== Character drawing ====================
   ============================================================ */
function drawCharacterBody(c, r, skin, t){
  const rainbow = skin.rainbow;
  c.fillStyle = 'rgba(0,0,0,0.12)';
  c.beginPath(); c.arc(0, 1.5, r + 0.8, 0, Math.PI*2); c.fill();

  if(rainbow){
    const g = c.createLinearGradient(-r, -r, r, r);
    g.addColorStop(0, '#FF6088'); g.addColorStop(0.25, '#FFB04C');
    g.addColorStop(0.5, '#FFE24C'); g.addColorStop(0.75, '#4CE0A8'); g.addColorStop(1, '#4CA8FF');
    c.fillStyle = g;
  } else {
    const g = c.createRadialGradient(-r*0.35, -r*0.4, r*0.15, 0, 0, r*1.1);
    g.addColorStop(0, mixColor(skin.body, '#FFFFFF', 0.35));
    g.addColorStop(0.55, skin.body);
    g.addColorStop(1, skin.bodyDark);
    c.fillStyle = g;
  }
  c.beginPath(); c.arc(0, 0, r, 0, Math.PI*2); c.fill();

  c.fillStyle = 'rgba(0,0,0,0.08)';
  c.beginPath(); c.arc(0, r*0.15, r*0.98, 0.15*Math.PI, 0.85*Math.PI); c.fill();

  if(skin.pattern === 'spots'){
    c.save();
    c.beginPath(); c.arc(0, 0, r-1, 0, Math.PI*2); c.clip();
    c.fillStyle = 'rgba(0,0,0,0.14)';
    const spots = [[-r*0.5, -r*0.3, r*0.18],[ r*0.55, -r*0.5, r*0.14],[-r*0.25, r*0.55, r*0.16],[ r*0.35, r*0.35, r*0.12],[ r*0.05, -r*0.75, r*0.11]];
    for(const [sx, sy, sr] of spots){ c.beginPath(); c.arc(sx, sy, sr, 0, Math.PI*2); c.fill(); }
    c.restore();
  } else if(skin.pattern === 'stripes'){
    c.save();
    c.beginPath(); c.arc(0, 0, r-1, 0, Math.PI*2); c.clip();
    c.strokeStyle = 'rgba(0,0,0,0.14)';
    c.lineWidth = r*0.18;
    for(let i=-2; i<=2; i++){
      c.beginPath(); c.moveTo(-r*1.3, i*r*0.4 + r*0.2); c.lineTo( r*1.3, i*r*0.4 - r*0.2); c.stroke();
    }
    c.restore();
  }

  c.fillStyle = 'rgba(255,255,255,0.42)';
  c.beginPath(); c.ellipse(-r*0.32, -r*0.42, r*0.32, r*0.2, -0.6, 0, Math.PI*2); c.fill();
}

function drawCharacterFace(c, r, skin){
  const eyeY = -r*0.15, eyeX = r*0.28, eyeR = r*0.24;
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

  c.fillStyle = skin.rainbow ? 'rgba(255,80,120,0.4)' : 'rgba(224,122,63,0.32)';
  c.beginPath();
  c.ellipse(-r*0.55, r*0.2, r*0.18, r*0.11, 0, 0, Math.PI*2);
  c.ellipse( r*0.55, r*0.2, r*0.18, r*0.11, 0, 0, Math.PI*2);
  c.fill();

  c.strokeStyle = skin.detail;
  c.lineWidth = Math.max(1.2, r*0.1);
  c.lineCap = 'round';
  c.beginPath(); c.arc(0, r*0.25, r*0.22, 0.15*Math.PI, 0.85*Math.PI); c.stroke();
}

function drawCharacterAccessory(c, r, skin, t){
  const kind = skin.accessory;
  if(kind === 'none') return;

  if(kind === 'horns'){
    c.fillStyle = skin.detail;
    c.beginPath();
    c.moveTo(-r*0.45, -r*0.85); c.lineTo(-r*0.55, -r*1.35); c.lineTo(-r*0.2, -r*0.95); c.closePath(); c.fill();
    c.beginPath();
    c.moveTo(r*0.45, -r*0.85); c.lineTo(r*0.55, -r*1.35); c.lineTo(r*0.2, -r*0.95); c.closePath(); c.fill();
  } else if(kind === 'leaf'){
    c.strokeStyle = '#3A6E28'; c.lineWidth = r*0.09;
    c.beginPath(); c.moveTo(0, -r*0.95); c.lineTo(r*0.1, -r*1.2); c.stroke();
    c.fillStyle = '#6BBF4C';
    c.beginPath(); c.ellipse(r*0.2, -r*1.25, r*0.35, r*0.18, -0.5, 0, Math.PI*2); c.fill();
    c.fillStyle = 'rgba(255,255,255,0.35)';
    c.beginPath(); c.ellipse(r*0.15, -r*1.3, r*0.16, r*0.06, -0.5, 0, Math.PI*2); c.fill();
  } else if(kind === 'cloud'){
    c.fillStyle = '#FFFFFF';
    c.beginPath();
    c.arc(-r*0.15, -r*1.15, r*0.22, 0, Math.PI*2);
    c.arc( r*0.15, -r*1.2, r*0.28, 0, Math.PI*2);
    c.arc( r*0.4, -r*1.05, r*0.2, 0, Math.PI*2);
    c.arc(-r*0.4, -r*1.0, r*0.18, 0, Math.PI*2);
    c.fill();
    c.fillStyle = 'rgba(200,220,240,0.5)';
    c.beginPath(); c.arc(-r*0.15, -r*1.1, r*0.14, 0, Math.PI*2); c.fill();
  } else if(kind === 'spikes'){
    c.fillStyle = skin.accent;
    const spikes = 7;
    for(let i=0;i<spikes;i++){
      const a = -Math.PI*0.85 + (i/(spikes-1))*Math.PI*0.7;
      const bx = Math.cos(a)*r*0.98, by = Math.sin(a)*r*0.98;
      const tipX = Math.cos(a)*r*1.35, tipY = Math.sin(a)*r*1.35;
      const px = Math.cos(a + 0.22)*r*0.95, py = Math.sin(a + 0.22)*r*0.95;
      c.beginPath(); c.moveTo(bx, by); c.lineTo(tipX, tipY); c.lineTo(px, py); c.closePath(); c.fill();
    }
  } else if(kind === 'halo'){
    c.save();
    c.translate(0, -r*1.35);
    c.rotate(t*0.02);
    c.strokeStyle = '#FFF4C0'; c.lineWidth = r*0.13;
    c.beginPath(); c.ellipse(0, 0, r*0.7, r*0.22, 0, 0, Math.PI*2); c.stroke();
    c.strokeStyle = '#E8B34E'; c.lineWidth = r*0.06;
    c.beginPath(); c.ellipse(0, 0, r*0.7, r*0.22, 0, 0, Math.PI*2); c.stroke();
    c.restore();
  } else if(kind === 'star'){
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
  } else if(kind === 'rainbow'){
    c.save();
    c.lineWidth = r*0.16; c.lineCap = 'round';
    const colors = ['#FF6088','#FFA84C','#FFE24C','#4CE0A8','#4CA8FF','#A86AFF'];
    for(let i=0;i<colors.length;i++){
      c.strokeStyle = colors[i];
      c.beginPath(); c.arc(0, 0, r*1.15 - i*(r*0.16), Math.PI*1.15, Math.PI*1.85); c.stroke();
    }
    c.restore();
  } else if(kind === 'wings'){
    const flap = Math.sin(t*0.18)*0.15;
    c.save(); c.translate(-r*1.05, -r*0.05); c.rotate(-0.5 + flap);
    c.fillStyle = skin.accent;
    c.beginPath(); c.ellipse(0, 0, r*0.55, r*0.22, 0, 0, Math.PI*2); c.fill();
    c.fillStyle = 'rgba(255,255,255,0.4)';
    c.beginPath(); c.ellipse(-r*0.1, -r*0.05, r*0.25, r*0.08, 0, 0, Math.PI*2); c.fill();
    c.restore();
    c.save(); c.translate(r*1.05, -r*0.05); c.rotate(0.5 - flap);
    c.fillStyle = skin.accent;
    c.beginPath(); c.ellipse(0, 0, r*0.55, r*0.22, 0, 0, Math.PI*2); c.fill();
    c.fillStyle = 'rgba(255,255,255,0.4)';
    c.beginPath(); c.ellipse(r*0.1, -r*0.05, r*0.25, r*0.08, 0, 0, Math.PI*2); c.fill();
    c.restore();
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

  c.save();
  c.globalAlpha = alpha;

  if(isShip && facingRot !== 0) c.rotate(facingRot);
  if(isFlippedWalk) c.rotate(Math.PI);

  if(skin.glow){
    const glowCol = skin.glowColor || skin.accent;
    const g = c.createRadialGradient(0,0,r*0.6, 0,0,r*2);
    g.addColorStop(0, glowCol); g.addColorStop(1, 'rgba(0,0,0,0)');
    const prev = c.globalAlpha;
    c.globalAlpha = alpha * 0.35;
    c.fillStyle = g;
    c.beginPath(); c.arc(0,0,r*2,0,Math.PI*2); c.fill();
    c.globalAlpha = prev;
  }

  if(skin.sparkle) drawSparklesAround(c, r, skin);

  if(skin.accessory === 'rainbow') drawCharacterAccessory(c, r, skin, G.t);
  if(skin.accessory === 'wings') drawCharacterAccessory(c, r, skin, G.t);

  if(isShip){
    drawEngineFlame(c, r, skin);
    drawSideFins(c, r, skin);
  }

  if(isWalk){ drawWalkLimbs(c, r, skin, false); }

  drawCharacterBody(c, r, skin, G.t);
  drawCharacterFace(c, r, skin);

  if(['horns','leaf','cloud','spikes','halo','star'].includes(skin.accessory)){
    drawCharacterAccessory(c, r, skin, G.t);
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
  } else if(G.mode === 'FLIP_WALK'){
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
   ==================== Scenery ==============================
   ============================================================ */
function drawSky(){
  const s = G.currentScene;
  const g = ctx.createLinearGradient(0,0,0,GROUND_Y);
  g.addColorStop(0, s.sky); g.addColorStop(1, s.skyBot || s.sky);
  ctx.fillStyle = g;
  ctx.fillRect(0,0,W,GROUND_Y);

  if(s.starAmount > 0.01){
    for(const st of G.stars){
      ctx.globalAlpha = st.a * s.starAmount * (0.5 + 0.5*Math.sin(G.t*0.02 + st.p));
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath(); ctx.arc(st.x, st.y, st.s*0.5, 0, Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  const celX = W*0.75, celY = H*0.18;
  if(s.moonAmount < 0.99){
    const sunA = 1 - s.moonAmount;
    ctx.globalAlpha = 0.5 * sunA;
    const glow = ctx.createRadialGradient(celX,celY,4, celX,celY,140);
    glow.addColorStop(0, s.sunGlow || s.sun);
    glow.addColorStop(0.35, s.sun);
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(celX,celY,140,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha = sunA;
    ctx.fillStyle = s.sun;
    ctx.beginPath(); ctx.arc(celX,celY,30,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath(); ctx.arc(celX-6,celY-8,10,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;
  }
  if(s.moonAmount > 0.01){
    const moonA = s.moonAmount;
    ctx.globalAlpha = 0.55 * moonA;
    const glow = ctx.createRadialGradient(celX,celY,4, celX,celY,150);
    glow.addColorStop(0, s.moonGlow || s.moon);
    glow.addColorStop(0.4, s.moon);
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(celX,celY,150,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha = moonA;
    ctx.fillStyle = s.moon;
    ctx.beginPath(); ctx.arc(celX,celY,28,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.beginPath();
    ctx.arc(celX-8, celY-6, 6, 0, Math.PI*2);
    ctx.arc(celX+6, celY+8, 4, 0, Math.PI*2);
    ctx.arc(celX+2, celY-10, 3, 0, Math.PI*2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function drawHills(){
  const s = G.currentScene;
  const layers = [
    { color:s.hillFar,  baseY:H*0.52, amp:30, freq:0.005, phase:0,   speed:0.15, shadow:0.08 },
    { color:s.hillMid,  baseY:H*0.65, amp:34, freq:0.008, phase:1.6, speed:0.35, shadow:0.12 },
    { color:s.hillNear, baseY:H*0.78, amp:26, freq:0.012, phase:3.2, speed:0.6, shadow:0.18 }
  ];
  for(const L of layers){
    ctx.fillStyle = L.color;
    ctx.beginPath();
    ctx.moveTo(0,GROUND_Y);
    const off = (G.dist*L.speed) % W;
    const points = [];
    for(let x=-20;x<=W+20;x+=14){
      const wx = x+off;
      const y = L.baseY - Math.sin(wx*L.freq+L.phase)*L.amp - Math.sin(wx*L.freq*2.1+L.phase*1.4)*L.amp*0.3;
      points.push([x, y]);
      ctx.lineTo(x,y);
    }
    ctx.lineTo(W+20,GROUND_Y); ctx.closePath(); ctx.fill();
    ctx.fillStyle = `rgba(0,0,0,${L.shadow})`;
    ctx.beginPath();
    for(let i=0;i<points.length;i++){ const [x,y] = points[i]; i===0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
    for(let i=points.length-1;i>=0;i--){ ctx.lineTo(points[i][0], points[i][1] + 12); }
    ctx.closePath(); ctx.fill();
  }
}

function drawClouds(){
  const s = G.currentScene;
  for(const c of clouds){
    c.x -= c.v * G.speed * 0.4;
    if(c.x < -140*c.s){ c.x = W+100*c.s; c.y = rand(H*0.08,H*0.32); }
    const w=60*c.s,h=22*c.s;
    ctx.globalAlpha = c.a*0.35;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.arc(c.x+2,c.y+4,h*0.9,0,Math.PI*2);
    ctx.arc(c.x+w*0.35+2,c.y-h*0.3+4,h*1.1,0,Math.PI*2);
    ctx.arc(c.x+w*0.7+2,c.y+4,h*0.85,0,Math.PI*2);
    ctx.arc(c.x+w*0.35+2,c.y+h*0.15+4,h*0.9,0,Math.PI*2);
    ctx.fill();
    ctx.globalAlpha = c.a;
    ctx.fillStyle = s.cloud;
    ctx.beginPath();
    ctx.arc(c.x,c.y,h*0.9,0,Math.PI*2);
    ctx.arc(c.x+w*0.35,c.y-h*0.3,h*1.1,0,Math.PI*2);
    ctx.arc(c.x+w*0.7,c.y,h*0.85,0,Math.PI*2);
    ctx.arc(c.x+w*0.35,c.y+h*0.15,h*0.9,0,Math.PI*2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawGround(){
  const s = G.currentScene;

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

  if(G.mode === 'SKY_JUMP'){
    for(const sh of G.cloudShadows){
      sh.x -= sh.v * G.speed * 0.25;
      if(sh.x < -sh.w*2) sh.x = W+sh.w;
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.beginPath(); ctx.ellipse(sh.x, GROUND_Y+GROUND_H*0.5, sh.w, GROUND_H*0.35, 0, 0, Math.PI*2); ctx.fill();
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

  for(const sh of G.cloudShadows){
    sh.x -= sh.v * G.speed * 0.25;
    if(sh.x < -sh.w*2) sh.x = W+sh.w;
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.beginPath(); ctx.ellipse(sh.x, GROUND_Y+GROUND_H*0.5, sh.w, GROUND_H*0.35, 0, 0, Math.PI*2); ctx.fill();
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

function drawWalkObstacle(o){
  const wall = o.color, dark = o.colorDark, accent = o.accent;
  const isCeil = !!o.isCeiling;
  const groundY = GROUND_Y;

  if(o.type==='spike'){
    const peaks = 3, pw = o.w/peaks;
    ctx.fillStyle = wall;
    ctx.beginPath();
    if(isCeil){
      for(let i=0;i<peaks;i++){
        const px = o.x + i*pw;
        ctx.moveTo(px, CEILING_H);
        ctx.lineTo(px+pw/2, CEILING_H + o.h);
        ctx.lineTo(px+pw, CEILING_H);
      }
    } else {
      for(let i=0;i<peaks;i++){
        const px = o.x + i*pw;
        ctx.moveTo(px, groundY);
        ctx.lineTo(px+pw/2, groundY - o.h);
        ctx.lineTo(px+pw, groundY);
      }
    }
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    if(isCeil){
      for(let i=0;i<peaks;i++){
        const px = o.x + i*pw;
        ctx.beginPath();
        ctx.moveTo(px+pw*0.25, CEILING_H);
        ctx.lineTo(px+pw/2, CEILING_H + o.h);
        ctx.lineTo(px+pw*0.75, CEILING_H);
        ctx.closePath(); ctx.fill();
      }
    } else {
      for(let i=0;i<peaks;i++){
        const px = o.x + i*pw;
        ctx.beginPath();
        ctx.moveTo(px+pw*0.25, groundY);
        ctx.lineTo(px+pw/2, groundY - o.h);
        ctx.lineTo(px+pw*0.75, groundY);
        ctx.closePath(); ctx.fill();
      }
    }
  } else {
    ctx.fillStyle = wall;
    if(isCeil){
      roundRect(ctx, o.x, CEILING_H, o.w, o.h, 12); ctx.fill();
    } else {
      roundRect(ctx, o.x, groundY - o.h, o.w, o.h, 12); ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    if(isCeil){
      roundRect(ctx, o.x+6, CEILING_H+6, o.w-12, 5, 3); ctx.fill();
    } else {
      roundRect(ctx, o.x+6, groundY-o.h+6, o.w-12, 5, 3); ctx.fill();
    }
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.8;
    if(isCeil){
      roundRect(ctx, o.x+6, CEILING_H+o.h-8, o.w-12, 4, 2); ctx.fill();
    } else {
      roundRect(ctx, o.x+6, groundY-8, o.w-12, 4, 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

function drawObstacles(){
  for(const o of obstacles){
    if(o.dead) continue;
    if(o.isWalk) drawWalkObstacle(o);
    else drawTunnelObstacle(o);
  }
}

function drawCoins(){
  for(const c of coins){
    if(c.dead) continue;
    const spin = Math.abs(Math.cos(c.t*0.08));
    const rx = c.r * (0.35 + spin*0.65);
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
    ctx.globalAlpha = Math.max(0,p.life)*0.9;
    ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size * Math.max(0.2,p.life), 0, Math.PI*2); ctx.fill();
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
  if(G.combo >= 5){
    const inten = clamp((G.combo - 5) / 30, 0, 0.25);
    const grad = ctx.createRadialGradient(P.x, P.y, P.r*2, P.x, P.y, P.r*8);
    grad.addColorStop(0, 'rgba(255,180,80,0)');
    grad.addColorStop(1, `rgba(255,140,60,${inten})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);
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
  ctx.setTransform(DPR,0,0,DPR,0,0);
  ctx.save();
  if(G.shake > 0.4){
    ctx.translate((Math.random()-0.5)*G.shake, (Math.random()-0.5)*G.shake);
    G.shake *= 0.87;
  } else G.shake = 0;

  drawSky();
  drawHills();
  drawClouds();
  drawGround();

  if(G.state !== 'MENU'){
    drawObstacles();
    drawCoins();
    drawOrbs();
    drawPowerups();
    drawSparks();
    drawPlayer();
  }
  drawWeather();
  drawParticles();
  drawFloats();
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
   ==================== HUD ==================================
   ============================================================ */
function updateLevelUI(){
  const pct = getLevelProgress() * 100;
  const lv = getLevelIndex() + 1;
  document.getElementById('level-bar').style.width = pct + '%';
  document.getElementById('level-num').textContent = 'LVL ' + lv;
}
function updateCoinsUI(){
  document.getElementById('home-coins').textContent = Save.data.coins;
  const shop = document.getElementById('shop-coins');
  if(shop) shop.textContent = Save.data.coins;
}

/* ============================================================
   ==================== Global level =========================
   ============================================================ */
function getGlobalMeters(){ return Object.values(Save.data.bestMeters).reduce((a,b)=>a+b, 0); }
function getGlobalLevel(){ return levelFromMeters(getGlobalMeters(), GLOBAL_LEVEL_THRESHOLDS); }
function getModeLevel(mode){ return levelFromMeters(Save.data.bestMeters[mode] || 0, MODE_LEVEL_THRESHOLDS); }
function updateGlobalLevelUI(){
  const totalM = getGlobalMeters();
  const lv = getGlobalLevel() + 1;
  const prog = levelProgress(totalM, GLOBAL_LEVEL_THRESHOLDS) * 100;
  document.getElementById('global-lvl-num').textContent = lv;
  document.getElementById('global-lvl-meters').textContent = Math.floor(totalM) + 'م';
  document.getElementById('global-lvl-btn').style.setProperty('--p', prog);
}

/* ============================================================
   ==================== Screens ==============================
   ============================================================ */
function hideAllScreens(){ document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); }
function showScreen(id){
  hideAllScreens();
  document.getElementById('overlay').classList.add('active');
  document.getElementById(id).classList.add('active');
}
function hideOverlay(){ document.getElementById('overlay').classList.remove('active'); }
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
  grid.innerHTML = '';
  SKINS.forEach(s=>{
    const owned = Save.data.ownedSkins.includes(s.id);
    const eq = Save.data.currentSkin === s.id;
    const rarity = s.rarity || 'common';
    const el = document.createElement('button');
    el.className = 'skin-card rar-' + rarity + (eq ? ' equipped' : '') + (!owned ? ' locked' : '');

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
    renderCharacter(pctx, previewR, s, { mode: 'FLIP', rot: 0, alpha: 1 });
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

    let tag;
    if(eq) tag = '<div class="skin-tag equipped">مُجهّز</div>';
    else if(owned) tag = '<div class="skin-tag owned">مملوك</div>';
    else tag = `<div class="skin-tag buy"><span>◆</span> ${s.price}</div>`;
    const tagEl = document.createElement('div');
    tagEl.innerHTML = tag;
    el.appendChild(tagEl.firstChild);

    if(!owned){
      const lock = document.createElement('div');
      lock.className = 'skin-lock'; lock.textContent = '🔒';
      el.appendChild(lock);
    }

    el.addEventListener('click', ()=>{
      if(eq) return;
      if(owned){
        Save.data.currentSkin = s.id;
        Save.save();
        Sfx.tap(); haptic(8);
        buildShop();
      } else if(Save.data.coins >= s.price){
        Save.data.coins -= s.price;
        Save.data.ownedSkins.push(s.id);
        Save.data.currentSkin = s.id;
        Save.save();
        Sfx.reward(); haptic(15);
        buildShop();
        updateCoinsUI();
        updateGlobalLevelUI();
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
  const cx = w/2, cy = h/2;
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
      } else if(item.id === 'notes'){
        pctx.font = `bold ${sz*3}px serif`;
        pctx.textAlign = 'center'; pctx.textBaseline = 'middle';
        pctx.fillText(i%2===0?'♪':'♫', px, py);
      } else if(item.id === 'snow'){
        pctx.strokeStyle = col; pctx.lineWidth = 1;
        for(let k=0;k<6;k++){
          const a = (k/6)*Math.PI*2;
          pctx.beginPath();
          pctx.moveTo(px, py);
          pctx.lineTo(px+Math.cos(a)*sz, py+Math.sin(a)*sz);
          pctx.stroke();
        }
      } else if(item.id === 'leaves' || item.id === 'petals'){
        pctx.beginPath();
        pctx.ellipse(px, py, sz*1.4, sz*0.65, i*0.5, 0, Math.PI*2);
        pctx.fill();
      } else if(item.id === 'firefly' || item.id === 'gold' || item.id === 'cosmic'){
        const grad = pctx.createRadialGradient(px,py,0, px,py,sz*2.5);
        grad.addColorStop(0, col);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        pctx.fillStyle = grad;
        pctx.beginPath(); pctx.arc(px, py, sz*2.5, 0, Math.PI*2); pctx.fill();
        pctx.fillStyle = col;
        pctx.beginPath(); pctx.arc(px, py, sz*0.6, 0, Math.PI*2); pctx.fill();
      } else if(item.id === 'lightning'){
        pctx.fillStyle = col;
        pctx.shadowColor = col; pctx.shadowBlur = 6;
        pctx.beginPath(); pctx.arc(px, py, sz*0.8, 0, Math.PI*2); pctx.fill();
        pctx.shadowBlur = 0;
      } else if(item.id === 'rainbow'){
        pctx.beginPath();
        pctx.ellipse(px, py, sz*0.55, sz*1.3, 0, 0, Math.PI*2);
        pctx.fill();
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
      if(item.id === 'bubble'){
        pctx.strokeStyle = col; pctx.lineWidth = 1.3;
        pctx.beginPath(); pctx.arc(w*0.15 + i*26, cy, 6 - i*0.6, 0, Math.PI*2); pctx.stroke();
      } else if(item.id === 'matrix'){
        pctx.fillRect(w*0.15 + i*26 - 3, cy-3, 6, 6);
      } else if(item.id === 'sparkle'){
        const sz = 6 - i*0.6;
        pctx.beginPath();
        for(let k=0;k<8;k++){
          const a = (k/8)*Math.PI*2;
          const rr = k%2===0 ? sz : sz*0.4;
          const px = w*0.15 + i*26 + Math.cos(a)*rr;
          const py = cy + Math.sin(a)*rr;
          k===0 ? pctx.moveTo(px,py) : pctx.lineTo(px,py);
        }
        pctx.closePath(); pctx.fill();
      } else {
        pctx.beginPath(); pctx.arc(w*0.15 + i*26, cy, 6 - i*0.6, 0, Math.PI*2); pctx.fill();
      }
    }
    pctx.globalAlpha = 1;

  } else if(cat === 'jump'){
    if(item.id==='ring'){
      pctx.strokeStyle = '#E07A3F';
      pctx.lineWidth = 3;
      pctx.beginPath(); pctx.arc(cx, cy, 20, 0, Math.PI*2); pctx.stroke();
    } else if(item.id==='burst'){
      for(let i=0;i<10;i++){
        const a = (i/10)*Math.PI*2;
        pctx.fillStyle = '#FFB060';
        pctx.beginPath(); pctx.arc(cx+Math.cos(a)*18, cy+Math.sin(a)*18, 3, 0, Math.PI*2); pctx.fill();
      }
    } else if(item.id==='star'){
      pctx.fillStyle = '#FFE060';
      pctx.beginPath();
      for(let i=0;i<10;i++){
        const a = (i/10)*Math.PI*2 - Math.PI/2;
        const rr = i%2===0 ? 18 : 8;
        const px = cx+Math.cos(a)*rr, py = cy+Math.sin(a)*rr;
        i===0 ? pctx.moveTo(px,py) : pctx.lineTo(px,py);
      }
      pctx.closePath(); pctx.fill();
    } else if(item.id==='shockwave'){
      for(let r=8;r<=26;r+=6){
        pctx.strokeStyle = `rgba(255,255,255,${1-r/32})`;
        pctx.lineWidth = 2;
        pctx.beginPath(); pctx.arc(cx, cy, r, 0, Math.PI*2); pctx.stroke();
      }
    } else if(item.id==='spiral'){
      pctx.strokeStyle = '#E07A3F';
      pctx.lineWidth = 2;
      pctx.beginPath();
      for(let i=0;i<60;i++){
        const a = i*0.3;
        const r = 2 + i*0.4;
        const px = cx + Math.cos(a)*r;
        const py = cy + Math.sin(a)*r;
        i===0 ? pctx.moveTo(px,py) : pctx.lineTo(px,py);
      }
      pctx.stroke();
    } else {
      pctx.fillStyle = '#E07A3F';
      pctx.beginPath(); pctx.arc(cx, cy, 8, 0, Math.PI*2); pctx.fill();
    }

  } else if(cat === 'death'){
    pctx.fillStyle = '#E07A3F';
    if(item.id==='explode'){
      for(let i=0;i<14;i++){
        const a = (i/14)*Math.PI*2;
        pctx.beginPath(); pctx.arc(cx+Math.cos(a)*20, cy+Math.sin(a)*20, 4, 0, Math.PI*2); pctx.fill();
      }
    } else if(item.id==='dissolve'){
      for(let i=0;i<20;i++){
        pctx.globalAlpha = 0.7 - i*0.03;
        pctx.beginPath(); pctx.arc(cx + rand(-25,25), cy + rand(-15,15), 2, 0, Math.PI*2); pctx.fill();
      }
      pctx.globalAlpha = 1;
    } else if(item.id==='pixel'){
      for(let i=0;i<25;i++){ pctx.fillRect(cx + rand(-25,25), cy + rand(-15,15), 4, 4); }
    } else if(item.id==='shatter'){
      for(let i=0;i<14;i++){
        const a = (i/14)*Math.PI*2;
        const r = 15 + (i%3)*6;
        pctx.save();
        pctx.translate(cx+Math.cos(a)*r, cy+Math.sin(a)*r);
        pctx.rotate(a*2);
        pctx.beginPath();
        pctx.moveTo(-4, -3); pctx.lineTo(4, -3); pctx.lineTo(3, 4); pctx.lineTo(-2, 3); pctx.closePath();
        pctx.fill();
        pctx.restore();
      }
    } else if(item.id==='nova'){
      for(let r=6;r<=26;r+=5){
        pctx.globalAlpha = 1 - r/32;
        pctx.fillStyle = r%2===0 ? '#FFF8C0' : '#FFB060';
        pctx.beginPath(); pctx.arc(cx, cy, r, 0, Math.PI*2); pctx.fill();
      }
      pctx.globalAlpha = 1;
    } else {
      pctx.beginPath(); pctx.arc(cx, cy, 12, 0, Math.PI*2); pctx.fill();
    }
  }
}

function buildCosmetics(){
  const grid = document.getElementById('cos-grid');
  grid.innerHTML = '';
  const list = COSMETICS[currentCosTab];
  if(!list) return;
  const owned = Save.data.cosmetics.owned[currentCosTab] || [];
  const current = Save.data.cosmetics.current[currentCosTab];

  list.forEach(item=>{
    const isOwned = owned.includes(item.id);
    const isEq = current === item.id;
    const el = document.createElement('button');
    el.className = 'cos-card' + (isEq ? ' equipped' : '') + (!isOwned ? ' locked' : '');

    const prev = document.createElement('div');
    prev.className = 'cos-preview';
    const pc = document.createElement('canvas');
    const pw = 180, ph = 60;
    const pDPR = Math.min(window.devicePixelRatio||1, 2.5);
    pc.width = Math.floor(pw * pDPR);
    pc.height = Math.floor(ph * pDPR);
    pc.style.width = pw + 'px';
    pc.style.height = ph + 'px';
    const pctx = pc.getContext('2d');
    pctx.setTransform(pDPR, 0, 0, pDPR, 0, 0);
    renderCosPreview(pctx, pw, ph, currentCosTab, item);
    prev.appendChild(pc);
    el.appendChild(prev);

    const name = document.createElement('div');
    name.className = 'cos-name'; name.textContent = item.name;
    el.appendChild(name);

    let tag;
    if(isEq) tag = '<div class="cos-tag equipped">مُجهّز</div>';
    else if(isOwned) tag = '<div class="cos-tag owned">مملوك</div>';
    else tag = `<div class="cos-tag buy"><span>◆</span> ${item.price}</div>`;
    const tagEl = document.createElement('div');
    tagEl.innerHTML = tag;
    el.appendChild(tagEl.firstChild);

    if(!isOwned){
      const lock = document.createElement('div');
      lock.className = 'skin-lock'; lock.textContent = '🔒';
      el.appendChild(lock);
    }

    el.addEventListener('click', ()=>{
      if(isEq) return;
      if(isOwned){
        Save.data.cosmetics.current[currentCosTab] = item.id;
        Save.save();
        Sfx.tap(); haptic(8);
        buildCosmetics();
      } else if(Save.data.coins >= item.price){
        Save.data.coins -= item.price;
        Save.data.cosmetics.owned[currentCosTab].push(item.id);
        Save.data.cosmetics.current[currentCosTab] = item.id;
        Save.save();
        Sfx.reward(); haptic(15);
        buildCosmetics();
        updateCoinsUI();
      } else {
        Sfx.play(220,0.15,'sine',0.05,180);
        haptic(20);
      }
    });

    grid.appendChild(el);
  });
}

/* ============================================================
   ==================== Achievements / Stats / Settings ======
   ============================================================ */
function buildAchievements(){
  const list = document.getElementById('ach-list');
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
    { icon:'🏅', name:'نقاط الموسم', val: Save.data.season.points }
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
function buildSettings(){
  const list = document.getElementById('settings-list');
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
  const grid = document.getElementById('mode-grid');
  grid.innerHTML = '';
  MODES.forEach(m=>{
    const el = document.createElement('button');
    el.className = 'mode-card' + (m.id===G.mode ? ' sel' : '');
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
      G.mode = m.id;
      Save.data.mode = m.id;
      Save.save();
      Sfx.tap(); haptic(6);
      buildHome();
    });
    grid.appendChild(el);
  });

  document.getElementById('hero-score').textContent = Save.data.bestMeters[G.mode] || 0;
  const m = MODES.find(x=>x.id===G.mode);
  document.getElementById('hero-mode-name').textContent = m ? m.ar : '';
  document.getElementById('hero-mode-lvl').textContent = 'LVL ' + (getModeLevel(G.mode) + 1);

  const skin = currentSkin();
  const heroEl = document.getElementById('hero-avatar');
  heroEl.style.background = `radial-gradient(circle at 30% 30%, ${mixColor(skin.body,'#FFFFFF',0.3)}, ${skin.body} 55%, ${skin.bodyDark})`;
  heroEl.style.boxShadow = `inset 0 -10px 0 rgba(0,0,0,.06), 0 0 40px ${skin.accent}55`;

  updateCoinsUI();
  updateAchBadge();
  updateGlobalLevelUI();

  ensureMissions();
  const dailyBadge = document.getElementById('daily-badge');
  if(canClaimDaily()) dailyBadge.style.display = 'flex';
  else dailyBadge.style.display = 'none';

  const qBadge = document.getElementById('quest-badge');
  const hasMissionProgress = ['daily','weekly','monthly'].some(tier =>
    (Save.data.missions[tier] || []).some(id => {
      const d = getMissionData(tier, id);
      return d && !d.done;
    })
  );
  qBadge.style.display = hasMissionProgress ? 'flex' : 'none';
}

/* ============================================================
   ==================== Game flow ============================
   ============================================================ */
function resetRun(){
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
  obstacles = []; orbs = []; coins = []; powerups = [];
  particles = []; floats = []; G.weather = [];
  sparkParticles = [];
  P.trail = [];
  P.vx = 0; P.vy = 0; P.gravityDir = 1; P.rot = 0; P.jumps = 0;
  P.enginePhase = 0; P.legPhase = 0; P.bouncePhase = 0;

  if(G.mode==='WALK'){ P.y = GROUND_Y-P.r; P.onGround = true; }
  else if(G.mode==='FLIP_WALK'){ P.y = CEILING_H + P.r; P.onGround = true; P.vy = 0; }
  else if(G.mode==='SKY_JUMP'){ P.y = GROUND_Y-P.r; P.onGround = true; P.vy = -13.5; }
  else { P.y = H/2; P.onGround = false; }
  P.x = G.mode==='DRIFT' ? W*0.3 : P.baseX;
  pointer.x = P.x; pointer.y = P.y;
  document.getElementById('hud-meters').textContent = '0';
  document.getElementById('hud-coins').textContent = '0';
  document.getElementById('combo-pill').style.display = 'none';
  updateLevelUI(); updatePowerupsUI(); initClouds();
  const tag = document.getElementById('scene-tag');
  tag.textContent = SCENES[0].en;
  tag.classList.remove('show');
}

function startGame(){
  Sfx.init();
  resetRun();
  G.state = 'PLAYING';
  setInGame(true);
  hideOverlay();
  showBanner('GO','');
  G.banner.timer = 55;
  let txt = '';
  if(G.mode==='FLIP') txt = 'اضغط لقلب الجاذبية';
  else if(G.mode==='FLAP') txt = 'اضغط باستمرار للارتفاع';
  else if(G.mode==='DRIFT') txt = 'اسحب إصبعك لتحريك السفينة';
  else if(G.mode==='WALK') txt = 'اضغط للقفز — مزدوجة متاحة';
  else if(G.mode==='FLIP_WALK') txt = 'أنت على السقف! اقفز للأسفل — لا تسقط في العمق!';
  else if(G.mode==='SKY_JUMP') txt = 'قفز تلقائي — اضغط في الهواء لتطير أعلى!';
  const h = document.getElementById('hint');
  h.textContent = txt;
  h.classList.add('show');
  G.hintTimer = 220;
}

function gameOver(){
  G.state = 'OVER';
  Sfx.over();
  spawnDeathEffect(P.x, P.y, currentSkin().body);
  shake(22); G.flash = 0.6;

  const mode = G.mode;
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

  Save.save();
  checkAchievements();

  document.getElementById('over-meters').textContent = meters;
  document.getElementById('over-best').textContent = Save.data.bestMeters[mode] + 'م';
  document.getElementById('over-coins').textContent = totalEarned;
  document.getElementById('over-level').textContent = (getModeLevel(mode) + 1);
  document.getElementById('over-record').classList.toggle('hidden', !isNew);
  document.getElementById('over-eyebrow').textContent = isNew ? 'NEW RECORD' : 'RUN COMPLETE';

  const rwDiv = document.getElementById('over-rewards');
  rwDiv.innerHTML = rewardChips.map(c=>`<div class="over-reward-chip">${c}</div>`).join('');

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
  document.getElementById('combo-pill').style.display = 'none';
  setInGame(false);
  hideOverlay();
  showScreen('s-home');
  buildHome();
  updateCoinsUI();
  updateGlobalLevelUI();
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
      // Avoid double-init
      if (!firebase.apps || firebase.apps.length === 0) {
        this.app = firebase.initializeApp(FIREBASE_CONFIG);
      } else {
        this.app = firebase.app();
      }
      this.auth = firebase.auth();
      this.db = firebase.firestore();
      this.db.enablePersistence({ synchronizeTabs: true }).catch(err => {
        // silent
      });
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
    try {
      const cred = await this.auth.signInWithPopup(provider);
      return { ok: true, user: cred.user };
    } catch (e) {
      if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request') {
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
    } else if (code.includes('account-exists-with-different-credential')) {
      msg = 'هذا البريد مسجّل بمزوّد دخول آخر';
    } else if (code.includes('user-disabled')) {
      msg = 'هذا الحساب معطّل من قِبَل المسؤول';
    } else if (code.includes('too-many-requests')) {
      msg = 'محاولات كثيرة جداً، انتظر قليلاً ثم حاول مجدداً';
    } else if (code.includes('internal-error')) {
      msg = 'خطأ داخلي من Google، حاول مجدداً';
    } else if (code.includes('invalid-api-key')) {
      msg = 'مفتاح Firebase API غير صالح — تحقّق من FIREBASE_CONFIG';
    } else if (code.includes('app-not-authorized')) {
      msg = 'التطبيق غير مُصرّح له بهذا المشروع، تحقّق من appId';
    }
    return { ok: false, error: msg, code };
  },

  async signOut() {
    try {
      await this.auth.signOut();
      this.user = null;
      this.profile = null;
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
        try { await ref.set(this.profile); } catch(e2) { console.warn('[Cloud] profile set failed:', e2); }
      }
    } catch (e) {
      console.warn('[Cloud] loadProfile failed, using fallback:', e);
      // Fallback — allow user to continue even if Firestore is not ready
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

    console.log('[Cloud] Attempting to claim username:', key, 'uid:', myUid);

    // --- Step 1: Check availability (read) ---
    try {
      const snap = await nameRef.get();
      if (snap.exists) {
        const data = snap.data();
        if (data.uid !== myUid) {
          console.warn('[Cloud] Username taken by another uid');
          return { ok: false, error: 'taken', msg: 'الاسم محجوز' };
        }
      }
    } catch (e) {
      console.error('[Cloud] Read failed (checking availability):', e);
      // If read fails, likely Firestore not ready
      if (e.code === 'permission-denied' || (e.message && e.message.includes('permission'))) {
        return { ok: false, error: 'permission', msg: 'قواعد Firestore تمنع الوصول (راجع Console)' };
      }
      if (e.code === 'unavailable' || (e.message && e.message.includes('offline'))) {
        return { ok: false, error: 'offline', msg: 'Firestore غير مُفعّل أو غير متصل' };
      }
      return { ok: false, error: 'network', msg: 'فشل الاتصال بـ Firestore: ' + (e.message || e.code || 'خطأ غير معروف') };
    }

    // --- Step 2: Claim via transaction (atomic) ---
    try {
      await this.db.runTransaction(async (tx) => {
        const snap = await tx.get(nameRef);
        if (snap.exists && snap.data().uid !== myUid) {
          throw new Error('taken');
        }
        tx.set(nameRef, { uid: myUid, username: trimmed, ts: Date.now() });
      });
      console.log('[Cloud] Username claimed via transaction');
    } catch (e) {
      // Transaction failed — try simple set as fallback
      console.warn('[Cloud] Transaction failed, trying fallback:', e);

      if (e.message === 'taken') {
        return { ok: false, error: 'taken', msg: 'الاسم محجوز' };
      }

      // Fallback: simple write (still safe enough because we checked above)
      try {
        await nameRef.set({ uid: myUid, username: trimmed, ts: Date.now() });
        console.log('[Cloud] Username claimed via fallback set');
      } catch (e2) {
        console.error('[Cloud] Fallback set also failed:', e2);
        let msg = 'فشل الحفظ';
        if (e2.code === 'permission-denied') {
          msg = 'قواعد Firestore تمنع الكتابة. تحقق من Rules في Firebase Console';
        } else if (e2.code === 'unavailable') {
          msg = 'Firestore غير مُفعّل أو غير متصل';
        } else if (e2.message) {
          msg = 'فشل: ' + e2.message;
        }
        return { ok: false, error: 'network', msg };
      }
    }

    // --- Step 3: Save to player profile ---
    try {
      await this.saveProfile({ username: trimmed });
      console.log('[Cloud] Profile saved with username');
    } catch (e) {
      console.warn('[Cloud] saveProfile failed:', e);
      // Continue anyway — the username was claimed
    }

    // --- Step 4: Release old username (best effort) ---
    const oldName = this.profile && this.profile.username;
    if (oldName && oldName.toLowerCase() !== key) {
      try {
        await this.db.collection('usernames').doc(oldName.toLowerCase()).delete();
      } catch (e) { /* ignore */ }
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
      console.warn('[Cloud] Pull failed:', e);
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
   ==================== Redirect Result Handler ==============
   ============================================================ */
async function checkRedirectResult() {
  if (!Cloud.auth) return;
  try {
    const result = await Cloud.auth.getRedirectResult();
    if (result && result.user) {
      console.log('[Cloud] Redirect sign-in succeeded');
      Cloud.user = result.user;
      await handleSignInResult({ ok: true, user: result.user });
    }
  } catch (e) {
    console.warn('[Cloud] Redirect result error:', e);
    const err = Cloud._handleAuthError(e);
    if (err && err.error) showLoginError(err.error);
  }
}

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

  // Home mini button
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

  // Settings profile card
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

  // Ensure profile object always exists
  if (!Cloud.profile) Cloud.profile = { uid: user.uid, username: null };

  try {
    await Cloud.loadProfile(user.uid);
  } catch(e) {
    console.warn('loadProfile failed', e);
    Cloud.profile = { uid: user.uid, username: null };
  }

  // Safety: ensure profile is still set after loadProfile
  if (!Cloud.profile) Cloud.profile = { uid: user.uid, username: null };

  // Pre-fill username from Google display name
  if (!Cloud.profile.username && user.displayName) {
    const suggested = user.displayName.replace(/[^A-Za-z0-9_\u0600-\u06FF]/g, '').slice(0, 16) || '';
    if (suggested) {
      const setupInput = document.getElementById('setup-username');
      if (setupInput) setupInput.value = suggested;
      // Trigger input event so button enables
      setupInput.dispatchEvent(new Event('input'));
    }
  }

  if (!Cloud.profile.username) {
    // New user → ask for username
    showScreen('s-profile-setup');
    setTimeout(() => {
      const inp = document.getElementById('setup-username');
      if (inp) inp.focus();
    }, 300);
  } else {
    // Returning user → go home
    await mergeAndGoHome();
  }
}

async function mergeAndGoHome() {
  const cloudSave = await Cloud.pullSave();
  if (cloudSave) {
    const merged = mergeSaveData(Save.data, cloudSave);
    Save.data = merged;
    Save.save();
  }
  await Cloud.pushSave();

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
  // ---- Login buttons ----
  const btnG = document.getElementById('login-google');
  const btnF = document.getElementById('login-facebook');
  const btnGuest = document.getElementById('login-guest');

  if (btnG) btnG.addEventListener('click', async () => {
    showLoginLoading(true);
    const r = await Cloud.signInGoogle();
    showLoginLoading(false);
    handleSignInResult(r);
  });

  if (btnF) btnF.addEventListener('click', async () => {
    showLoginLoading(true);
    const r = await Cloud.signInFacebook();
    showLoginLoading(false);
    handleSignInResult(r);
  });

  if (btnGuest) btnGuest.addEventListener('click', async () => {
    showLoginLoading(true);
    const r = await Cloud.signInGuest();
    showLoginLoading(false);
    handleSignInResult(r);
  });

  // ---- Profile setup ----
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
          // Show detailed error message if available
          const displayMsg = r.msg || (r.error === 'taken' ? '✗ الاسم محجوز' : '✗ فشل الحفظ، حاول مجدداً');
          setupStatus.textContent = (r.error === 'taken' ? '✗ ' : '✗ ') + (r.msg || 'فشل الحفظ');
          setupStatus.className = 'setup-status err';
          setupBtn.disabled = false;

          // Also show a floating error so it's visible
          showLoginError(displayMsg);
          return;
        }

        // Success!
        Sfx.reward(); haptic(20);
        updateProfileUI();
        await mergeAndGoHome();
      } catch (e) {
        console.error('[Setup] Unexpected error:', e);
        setupBtn.textContent = originalText;
        setupBtn.disabled = false;
        setupStatus.textContent = '✗ خطأ غير متوقع: ' + (e.message || '');
        setupStatus.className = 'setup-status err';
        showLoginError('خطأ: ' + (e.message || 'غير معروف'));
      }
    });
  }

  // ---- Change name screen ----
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

  // ---- Profile mini button ----
  const miniBtn = document.getElementById('profile-mini');
  if (miniBtn) miniBtn.addEventListener('click', () => {
    showScreen('s-settings');
    buildSettings();
    Sfx.tap(); haptic(6);
  });

  // ---- Logout ----
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
function setupAuthListener() {
  Cloud.auth.onAuthStateChanged(async (user) => {
    if (user) {
      Cloud.user = user;
      Cloud.setState('idle');
      try {
        await Cloud.loadProfile(user.uid);
      } catch (e) {
        console.warn('[Cloud] Load profile failed:', e);
      }
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
   ==================== Save.save() now queues cloud sync ====
   ============================================================ */
const _origSave = Save.save.bind(Save);
Save.save = function() {
  _origSave();
  try { Cloud.queueSync(); } catch(e) {}
};

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
  safe('reset-btn', () => {
    if(confirm('حذف التقدم المحلي فقط؟ (بيانات السحابة لن تتأثر)')) {
      try { localStorage.removeItem(Save.KEY); } catch(e){}
      location.reload();
    }
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
    if(['Space','ArrowUp','ArrowDown'].includes(e.code)) e.preventDefault();
  });
}

/* Override buildSettings to include profile refresh */
const _origBuildSettings = buildSettings;
buildSettings = function() {
  _origBuildSettings();
  try { updateProfileUI(); } catch(e){}
};

/* ============================================================
   ==================== BOOT =================================
   ============================================================ */
function boot() {
  // 1) Core init
  resize();
  G.currentScene = SCENES[0];
  initClouds();
  G.mode = Save.data.mode || 'FLIP';
  ensureMissions();
  buildHome();
  updateCoinsUI();
  updateAchBadge();
  updatePowerupsUI();
  setInGame(false);
  P.x = W * 0.5;
  P.y = H * 0.5;

  // 2) Wire game buttons (always)
  wireGameButtons();

  // 3) Try Firebase
  let firebaseOk = false;
  try {
    firebaseOk = Cloud.init();
  } catch (e) {
    console.warn('[Cloud] Init crashed:', e);
    firebaseOk = false;
  }

  if (!firebaseOk) {
    // Offline mode: go straight to home
    Cloud.setState('offline');
    updateProfileUI();
    showScreen('s-home');
    buildHome();
    requestAnimationFrame(loop);
    return;
  }

  // 4) Firebase ready → wire auth + show login screen
  setupAuthWiring();
  setupAuthListener();
  showScreen('s-login');
  requestAnimationFrame(loop);
}

/* Launch on DOM ready */
function launch() {
  try {
    boot();
  } catch (e) {
    console.error('[Boot] Failed:', e);
    // Fallback: try to at least show home
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