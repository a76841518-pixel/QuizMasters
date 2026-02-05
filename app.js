// تكوين Firebase
const firebaseConfig = {
  apiKey: "AIzaSyACL_cbxef4lTjpMvXtoalSC83Mr7IdgbE",
  authDomain: "appj-52e7e.firebaseapp.com",
  databaseURL: "https://appj-52e7e-default-rtdb.firebaseio.com",
  projectId: "appj-52e7e",
  storageBucket: "appj-52e7e.firebasestorage.app",
  messagingSenderId: "669204415571",
  appId: "1:669204415571:web:dfdfd26a960a7fcb74f2a6",
  measurementId: "G-LVLHWN8BZ3"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// خدمات Firebase
const auth = firebase.auth();
const db = firebase.firestore();
const rtdb = firebase.database();

// حالة اللعبة
const gameState = {
    user: null,
    player: null,
    selectedZombie: null,
    currentPath: null,
    skills: {},
    battleInProgress: false,
    notifications: []
};

// أنواع الزومبي
const ZOMBIE_TYPES = {
    COMBAT: {
        id: 'combat',
        name: 'القتالي',
        zombies: [
            {
                id: 'berserk_zombie',
                name: 'الزومبي الوحشي',
                icon: 'fas fa-fist-raised',
                description: 'ضرر عالي جداً، سرعة متوسطة، دفاع ضعيف',
                stats: {
                    attack: 80,
                    defense: 20,
                    health: 300,
                    speed: 15,
                    critical: 15
                },
                specialAbility: 'زيادة الضرر كلما انخفضت صحة العدو',
                color: '#e74c3c'
            },
            {
                id: 'predator_zombie',
                name: 'زومبي المفترس',
                icon: 'fas fa-running',
                description: 'سريع جداً، يهاجم عدة مرات، ضرر متوسط',
                stats: {
                    attack: 50,
                    defense: 30,
                    health: 250,
                    speed: 30,
                    critical: 20
                },
                specialAbility: 'هجمات متتالية',
                color: '#3498db'
            },
            {
                id: 'destroyer_zombie',
                name: 'زومبي المدمر',
                icon: 'fas fa-hammer',
                description: 'بطيء، ضربات ثقيلة، يكسر دروع الخصم',
                stats: {
                    attack: 100,
                    defense: 50,
                    health: 500,
                    speed: 5,
                    critical: 10
                },
                specialAbility: 'كسر الدروع',
                color: '#2c3e50'
            },
            {
                id: 'silent_killer_zombie',
                name: 'القاتل الصامت',
                icon: 'fas fa-user-ninja',
                description: 'هجمات حرجة عالية، تفادي مرتفع',
                stats: {
                    attack: 70,
                    defense: 25,
                    health: 200,
                    speed: 25,
                    critical: 40,
                    dodge: 30
                },
                specialAbility: 'تفادي وضربات حرجة',
                color: '#7f8c8d'
            }
        ]
    },
    PROTECTION: {
        id: 'protection',
        name: 'الحماية',
        zombies: [
            {
                id: 'guard_zombie',
                name: 'زومبي الحارس',
                icon: 'fas fa-shield-alt',
                description: 'يحمي اللاعب ويمتص الضرر',
                stats: {
                    attack: 20,
                    defense: 80,
                    health: 600,
                    speed: 10,
                    block: 40
                },
                specialAbility: 'امتصاص الضرر',
                color: '#27ae60'
            },
            {
                id: 'living_shield_zombie',
                name: 'زومبي الدرع الحي',
                icon: 'fas fa-user-shield',
                description: 'ينشئ دروع مؤقتة',
                stats: {
                    attack: 30,
                    defense: 70,
                    health: 400,
                    speed: 15,
                    shield: 50
                },
                specialAbility: 'دروع مؤقتة',
                color: '#16a085'
            }
        ]
    },
    DISEASE: {
        id: 'disease',
        name: 'الأمراض',
        zombies: [
            {
                id: 'plague_zombie',
                name: 'زومبي الطاعون',
                icon: 'fas fa-biohazard',
                description: 'ينشر ضرر تدريجي',
                stats: {
                    attack: 40,
                    defense: 25,
                    health: 350,
                    speed: 20,
                    poison: 30
                },
                specialAbility: 'ضرر تدريجي',
                color: '#2ecc71'
            },
            {
                id: 'poison_zombie',
                name: 'زومبي السم',
                icon: 'fas fa-skull-crossbones',
                description: 'يضعف دفاع العدو',
                stats: {
                    attack: 35,
                    defense: 30,
                    health: 300,
                    speed: 18,
                    weaken: 40
                },
                specialAbility: 'إضعاف الدفاع',
                color: '#e67e22'
            }
        ]
    },
    SHADOW: {
        id: 'shadow',
        name: 'الظلال',
        zombies: [
            {
                id: 'ghost_zombie',
                name: 'زومبي الشبح',
                icon: 'fas fa-ghost',
                description: 'يختفي مؤقتاً',
                stats: {
                    attack: 45,
                    defense: 20,
                    health: 250,
                    speed: 35,
                    dodge: 50
                },
                specialAbility: 'اختفاء مؤقت',
                color: '#9b59b6'
            },
            {
                id: 'elusive_zombie',
                name: 'زومبي المراوغ',
                icon: 'fas fa-user-secret',
                description: 'تفادي عالي جداً',
                stats: {
                    attack: 40,
                    defense: 15,
                    health: 200,
                    speed: 40,
                    dodge: 60
                },
                specialAbility: 'تفادي عالي',
                color: '#34495e'
            }
        ]
    },
    SUPPORT: {
        id: 'support',
        name: 'الدعم',
        zombies: [
            {
                id: 'tactical_zombie',
                name: 'زومبي التكتيكي',
                icon: 'fas fa-brain',
                description: 'يزيد دقة اللاعب',
                stats: {
                    attack: 25,
                    defense: 40,
                    health: 400,
                    speed: 20,
                    accuracy: 50
                },
                specialAbility: 'زيادة الدقة',
                color: '#3498db'
            },
            {
                id: 'energizing_zombie',
                name: 'زومبي الطاقة',
                icon: 'fas fa-bolt',
                description: 'يعيد صحة وطاقة',
                stats: {
                    attack: 20,
                    defense: 45,
                    health: 450,
                    speed: 18,
                    heal: 40
                },
                specialAbility: 'تجديد الصحة والطاقة',
                color: '#f1c40f'
            }
        ]
    },
    LEGENDARY: {
        id: 'legendary',
        name: 'الأسطوري',
        zombies: [
            {
                id: 'storm_zombie',
                name: 'زومبي العاصفة',
                icon: 'fas fa-bolt',
                description: 'هجمات كهربائية',
                stats: {
                    attack: 90,
                    defense: 40,
                    health: 450,
                    speed: 25,
                    stun: 30
                },
                specialAbility: 'هجمات كهربائية',
                color: '#9b59b6'
            },
            {
                id: 'ice_zombie',
                name: 'زومبي الجليد',
                icon: 'fas fa-snowflake',
                description: 'يبطئ الأعداء',
                stats: {
                    attack: 70,
                    defense: 50,
                    health: 500,
                    speed: 15,
                    slow: 50
                },
                specialAbility: 'تبطئة الأعداء',
                color: '#3498db'
            },
            {
                id: 'fire_zombie',
                name: 'زومبي النار',
                icon: 'fas fa-fire',
                description: 'ضرر انفجاري',
                stats: {
                    attack: 100,
                    defense: 35,
                    health: 400,
                    speed: 20,
                    burn: 40
                },
                specialAbility: 'ضرر انفجاري',
                color: '#e74c3c'
            }
        ]
    }
};

// المسارات
const PATHS = [
    {
        id: 'predator',
        name: 'المفترس',
        icon: 'fas fa-paw',
        color: '#e74c3c',
        description: 'يركز على الهجوم الوحشي والقتل السريع',
        benefits: [
            'زيادة الضرر الأساسي 50%',
            'زيادة فرص الضربات الحرجة 30%',
            'هجمات متتالية سريعة',
            'قتل سريع يمنح طاقة إضافية'
        ],
        bonuses: {
            attack: 50,
            criticalChance: 30,
            speed: 20
        }
    },
    {
        id: 'protector',
        name: 'الحامي',
        icon: 'fas fa-shield-alt',
        color: '#27ae60',
        description: 'يركز على الدفاع وحماية اللاعب',
        benefits: [
            'زيادة الدفاع 60%',
            'امتصاص ضرر بنسبة 40%',
            'دروع مؤقتة تلقائية',
            'حماية اللاعب عند انخفاض صحته'
        ],
        bonuses: {
            defense: 60,
            health: 40,
            block: 40
        }
    },
    {
        id: 'plague',
        name: 'الوباء',
        icon: 'fas fa-biohazard',
        color: '#2ecc71',
        description: 'يركز على الضرر التدريجي والسموم',
        benefits: [
            'ضرر تدريجي 40%',
            'إضعاف دفاع العدو 50%',
            'سموم متسلسلة',
            'عدوى تنتشر بين الأعداء'
        ],
        bonuses: {
            poison: 40,
            weaken: 50,
            duration: 30
        }
    },
    {
        id: 'shadow',
        name: 'الظل',
        icon: 'fas fa-ghost',
        color: '#9b59b6',
        description: 'يركز على السرعة والمراوغة والهجمات المفاجئة',
        benefits: [
            'زيادة السرعة 50%',
            'تفادي 40%',
            'هجمات من الخلف',
            'اختفاء مؤقت'
        ],
        bonuses: {
            speed: 50,
            dodge: 40,
            criticalDamage: 30
        }
    },
    {
        id: 'control',
        name: 'السيطرة',
        icon: 'fas fa-brain',
        color: '#3498db',
        description: 'يركز على الدعم والتكتيك وتحسين إحصائيات اللاعب',
        benefits: [
            'زيادة دقة اللاعب 40%',
            'تسريع المهارات 50%',
            'تحسين جميع الإحصائيات 20%',
            'تقليل وقت الانتظار'
        ],
        bonuses: {
            accuracy: 40,
            cooldown: 50,
            allStats: 20
        }
    },
    {
        id: 'transformation',
        name: 'التحول',
        icon: 'fas fa-exchange-alt',
        color: '#f39c12',
        description: 'يجعل الزومبي يتحول أثناء القتال بأشكال قتالية مختلفة',
        benefits: [
            'تحول إلى أشكال قتالية',
            'زيادة قوة مؤقتة 100%',
            'مهارات مختلفة لكل شكل',
            'تأثيرات تراكمية'
        ],
        bonuses: {
            transformation: true,
            temporaryPower: 100,
            versatility: 50
        }
    }
];

// المهارات
const SKILLS = {
    attack: [
        {
            id: 'claw_strike',
            name: 'ضربة المخلب',
            icon: 'fas fa-hand-rock',
            description: 'ضربة قوية بالمخالب تسبب ضرراً كبيراً',
            maxLevel: 10,
            baseDamage: 50,
            damagePerLevel: 10,
            cost: 2,
            requirements: []
        },
        {
            id: 'toxic_bite',
            name: 'العضّة السامة',
            icon: 'fas fa-skull-crossbones',
            description: 'عضة سامة تسبب ضرراً تدريجياً',
            maxLevel: 10,
            baseDamage: 30,
            damagePerLevel: 5,
            poisonDamage: 20,
            cost: 3,
            requirements: [{ skill: 'claw_strike', level: 3 }]
        },
        {
            id: 'death_rush',
            name: 'اندفاع قاتل',
            icon: 'fas fa-running',
            description: 'اندفاع سريع نحو العدو مع ضرر مضاعف',
            maxLevel: 8,
            baseDamage: 40,
            damagePerLevel: 8,
            speedBonus: 20,
            cost: 4,
            requirements: [{ skill: 'claw_strike', level: 5 }]
        }
    ],
    defense: [
        {
            id: 'damage_absorption',
            name: 'امتصاص الضرر',
            icon: 'fas fa-shield-alt',
            description: 'يمتص جزءاً من الضرر الموجه',
            maxLevel: 10,
            baseAbsorption: 15,
            absorptionPerLevel: 5,
            cost: 2,
            requirements: []
        },
        {
            id: 'temporary_shield',
            name: 'درع مؤقت',
            icon: 'fas fa-user-shield',
            description: 'ينشئ درعاً مؤقتاً يمنع الضرر',
            maxLevel: 8,
            baseShield: 100,
            shieldPerLevel: 20,
            duration: 15,
            cost: 3,
            requirements: [{ skill: 'damage_absorption', level: 3 }]
        }
    ],
    poison: [
        {
            id: 'poison_spread',
            name: 'نشر السم',
            icon: 'fas fa-biohazard',
            description: 'ينشر سماً يؤثر على عدة أعداء',
            maxLevel: 10,
            baseDamage: 25,
            damagePerLevel: 5,
            spreadRadius: 3,
            cost: 3,
            requirements: []
        },
        {
            id: 'chain_infection',
            name: 'عدوى متسلسلة',
            icon: 'fas fa-virus',
            description: 'عدوى تنتقل من عدو لآخر',
            maxLevel: 8,
            baseDamage: 20,
            damagePerLevel: 4,
            chainCount: 3,
            cost: 4,
            requirements: [{ skill: 'poison_spread', level: 4 }]
        }
    ],
    agility: [
        {
            id: 'dodge_attacks',
            name: 'تفادي الضربات',
            icon: 'fas fa-user-ninja',
            description: 'يزيد فرص تفادي الهجمات',
            maxLevel: 10,
            baseDodge: 10,
            dodgePerLevel: 3,
            cost: 2,
            requirements: []
        },
        {
            id: 'temporary_disappearance',
            name: 'اختفاء مؤقت',
            icon: 'fas fa-ghost',
            description: 'يختفي مؤقتاً ويتفادى جميع الهجمات',
            maxLevel: 6,
            baseDuration: 3,
            durationPerLevel: 0.5,
            cooldown: 30,
            cost: 4,
            requirements: [{ skill: 'dodge_attacks', level: 4 }]
        }
    ],
    support: [
        {
            id: 'player_enhancement',
            name: 'تعزيز قوة اللاعب',
            icon: 'fas fa-user-plus',
            description: 'يزيد إحصائيات اللاعب مؤقتاً',
            maxLevel: 10,
            baseEnhancement: 10,
            enhancementPerLevel: 3,
            duration: 30,
            cost: 3,
            requirements: []
        },
        {
            id: 'accuracy_boost',
            name: 'زيادة الدقة',
            icon: 'fas fa-bullseye',
            description: 'يزيد دقة هجمات اللاعب',
            maxLevel: 8,
            baseAccuracy: 15,
            accuracyPerLevel: 5,
            cost: 2,
            requirements: []
        }
    ]
};

// تهيئة اللعبة
document.addEventListener('DOMContentLoaded', initGame);

async function initGame() {
    // إخفاء جميع الشاشات
    hideAllScreens();
    
    // إعداد مستمعات الأحداث
    setupEventListeners();
    
    // عرض شاشة التحميل
    showScreen('loadingScreen');
    
    // محاكاة عملية التحميل
    simulateLoading();
    
    // التحقق من حالة المصادقة
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            gameState.user = user;
            await loadPlayerData(user.uid);
        } else {
            showScreen('authScreen');
        }
    });
}

// إعداد مستمعات الأحداث
function setupEventListeners() {
    // المصادقة
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('registerBtn').addEventListener('click', register);
    
    // التبويبات
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabId = e.target.dataset.tab;
            switchAuthTab(tabId);
        });
    });
    
    // اختيار الزومبي
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            showZombiesByCategory(category);
        });
    });
    
    // تأكيد اختيار الزومبي
    document.getElementById('confirmZombieBtn').addEventListener('click', confirmZombieSelection);
    
    // القائمة الرئيسية
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.tab) {
            btn.addEventListener('click', (e) => {
                const tabId = e.target.closest('.nav-btn').dataset.tab;
                switchTab(tabId);
            });
        }
    });
    
    // تسجيل الخروج
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // الإجراءات السريعة
    document.getElementById('quickBattle').addEventListener('click', () => startQuickBattle());
    document.getElementById('quickUpgrade').addEventListener('click', () => switchTab('zombie'));
    document.getElementById('quickSkill').addEventListener('click', () => switchTab('skills'));
    document.getElementById('quickMarket').addEventListener('click', () => switchTab('market'));
    
    // المعارك
    document.querySelectorAll('.battle-start-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const battleType = e.target.dataset.battle;
            startBattle(battleType);
        });
    });
    
    // إغلاق النماذج المنبثقة
    document.getElementById('closeBattleModal').addEventListener('click', () => {
        document.getElementById('battleModal').classList.remove('active');
    });
    
    document.getElementById('closeResultModal').addEventListener('click', () => {
        document.getElementById('resultModal').classList.remove('active');
    });
}

// محاكاة التحميل
function simulateLoading() {
    let progress = 0;
    const loadingTexts = [
        'جاري تحميل عالم الزومبي...',
        'إعداد أنواع الزومبي...',
        'تحضير المهارات...',
        'تهيئة المسارات...',
        'جاهز للعب!'
    ];
    
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // بعد التحميل، تحقق من حالة المصادقة
            setTimeout(() => {
                if (!gameState.user) {
                    showScreen('authScreen');
                }
            }, 500);
        }
        
        document.getElementById('loadingProgress').style.width = `${progress}%`;
        const textIndex = Math.min(Math.floor(progress / 25), 4);
        document.getElementById('loadingText').textContent = loadingTexts[textIndex];
    }, 200);
}

// تسجيل الدخول
async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('يرجى إدخال البريد الإلكتروني وكلمة المرور', 'error');
        return;
    }
    
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        showNotification('تم تسجيل الدخول بنجاح!', 'success');
        gameState.user = userCredential.user;
        await loadPlayerData(userCredential.user.uid);
    } catch (error) {
        showNotification('فشل تسجيل الدخول: ' + error.message, 'error');
    }
}

// التسجيل
async function register() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerPasswordConfirm').value;
    
    if (!name || !email || !password) {
        showNotification('يرجى ملء جميع الحقول', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('كلمات المرور غير متطابقة', 'error');
        return;
    }
    
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        // إنشاء بيانات اللاعب الأولية
        const playerData = {
            uid: userCredential.user.uid,
            name: name,
            email: email,
            level: 1,
            xp: 0,
            xpNeeded: 100,
            gold: 1000,
            dna: 50,
            energy: 100,
            maxEnergy: 100,
            selectedZombie: null,
            path: null,
            skills: {},
            stats: {
                battlesWon: 0,
                zombiesKilled: 0,
                totalXp: 0
            },
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        await db.collection('players').doc(userCredential.user.uid).set(playerData);
        
        showNotification('تم إنشاء الحساب بنجاح!', 'success');
        gameState.user = userCredential.user;
        showScreen('zombieSelectionScreen');
        loadZombieCategories();
    } catch (error) {
        showNotification('فشل إنشاء الحساب: ' + error.message, 'error');
    }
}

// تبديل تبويبات المصادقة
function switchAuthTab(tabId) {
    // تحديث التبويبات النشطة
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.auth-tab[data-tab="${tabId}"]`).classList.add('active');
    
    // إظهار النموذج المناسب
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(`${tabId}Form`).classList.add('active');
}

// إخفاء جميع الشاشات
function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
}

// إظهار شاشة محددة
function showScreen(screenId) {
    hideAllScreens();
    document.getElementById(screenId).classList.add('active');
}

// تحميل بيانات اللاعب
async function loadPlayerData(userId) {
    try {
        const doc = await db.collection('players').doc(userId).get();
        
        if (doc.exists) {
            gameState.player = doc.data();
            
            if (!gameState.player.selectedZombie) {
                // لم يختر زومبياً بعد
                showScreen('zombieSelectionScreen');
                loadZombieCategories();
            } else {
                // اللاعب لديه زومبي، عرض اللعبة
                await loadZombieData(gameState.player.selectedZombie);
                showGameScreen();
                updatePlayerDisplay();
                loadSkills();
                loadPaths();
                loadDailyQuests();
                loadLeaderboard();
            }
        } else {
            showNotification('بيانات اللاعب غير موجودة', 'error');
            await logout();
        }
    } catch (error) {
        showNotification('فشل تحميل بيانات اللاعب: ' + error.message, 'error');
        console.error('Error loading player data:', error);
    }
}

// تحميل فئات الزومبي
function loadZombieCategories() {
    // عرض التبويبات
    const categoryTabs = document.querySelector('.category-tabs');
    categoryTabs.innerHTML = '';
    
    Object.values(ZOMBIE_TYPES).forEach(category => {
        const tab = document.createElement('button');
        tab.className = 'category-tab';
        tab.dataset.category = category.id;
        tab.innerHTML = `${getCategoryIcon(category.id)} ${category.name}`;
        categoryTabs.appendChild(tab);
        
        tab.addEventListener('click', () => showZombiesByCategory(category.id));
    });
    
    // عرض الزومبي الخاص بالفئة الأولى
    showZombiesByCategory('combat');
}

// الحصول على أيقونة الفئة
function getCategoryIcon(categoryId) {
    const icons = {
        combat: '⚔️',
        protection: '🛡️',
        disease: '☣️',
        shadow: '👻',
        support: '🧠',
        legendary: '🔥'
    };
    return icons[categoryId] || '🧟';
}

// عرض الزومبي حسب الفئة
function showZombiesByCategory(categoryId) {
    // تحديث التبويب النشط
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.category-tab[data-category="${categoryId}"]`).classList.add('active');
    
    // الحصول على فئة الزومبي
    const category = ZOMBIE_TYPES[categoryId.toUpperCase()];
    if (!category) return;
    
    // عرض الزومبي
    const zombiesGrid = document.getElementById('zombiesGrid');
    zombiesGrid.innerHTML = '';
    
    category.zombies.forEach(zombie => {
        const card = createZombieCard(zombie, category);
        zombiesGrid.appendChild(card);
    });
    
    // إعادة تعيين المعاينة
    resetZombiePreview();
}

// إنشاء بطاقة الزومبي
function createZombieCard(zombie, category) {
    const card = document.createElement('div');
    card.className = 'zombie-card';
    card.dataset.zombieId = zombie.id;
    
    card.innerHTML = `
        <div class="zombie-card-header">
            <div class="zombie-icon" style="background: ${zombie.color}">
                <i class="${zombie.icon}"></i>
            </div>
            <div>
                <div class="zombie-name">${zombie.name}</div>
                <span class="zombie-type">${category.name}</span>
            </div>
        </div>
        
        <div class="zombie-stats">
            <div class="zombie-stat">
                <span class="stat-name">الهجوم</span>
                <span class="stat-value">${zombie.stats.attack}</span>
            </div>
            <div class="zombie-stat">
                <span class="stat-name">الدفاع</span>
                <span class="stat-value">${zombie.stats.defense}</span>
            </div>
            <div class="zombie-stat">
                <span class="stat-name">الصحة</span>
                <span class="stat-value">${zombie.stats.health}</span>
            </div>
            <div class="zombie-stat">
                <span class="stat-name">السرعة</span>
                <span class="stat-value">${zombie.stats.speed}</span>
            </div>
        </div>
        
        <div class="zombie-description">
            <p>${zombie.description}</p>
        </div>
        
        <div class="zombie-abilities">
            <div class="ability">
                <i class="fas fa-star"></i>
                <span>القدرة: ${zombie.specialAbility}</span>
            </div>
        </div>
    `;
    
    // حدث النقر لاختيار الزومبي
    card.addEventListener('click', () => selectZombie(zombie, category));
    
    return card;
}

// اختيار الزومبي
function selectZombie(zombie, category) {
    // إزالة التحديد السابق
    document.querySelectorAll('.zombie-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // تحديد الزومبي الجديد
    document.querySelector(`.zombie-card[data-zombie-id="${zombie.id}"]`).classList.add('selected');
    
    // تحديث المعاينة
    updateZombiePreview(zombie, category);
    
    // تفعيل زر التأكيد
    document.getElementById('confirmZombieBtn').disabled = false;
    
    // حفظ الاختيار
    gameState.selectedZombie = { ...zombie, category: category.id };
}

// تحديث معاينة الزومبي
function updateZombiePreview(zombie, category) {
    const preview = document.getElementById('selectedZombiePreview');
    
    preview.innerHTML = `
        <div class="preview-header">
            <h3>${zombie.name}</h3>
            <span class="zombie-type">${category.name}</span>
        </div>
        
        <div class="preview-content">
            <div class="zombie-details">
                <div class="detail-section">
                    <h4><i class="fas fa-chart-bar"></i> الإحصائيات</h4>
                    <div class="stats-grid">
                        ${Object.entries(zombie.stats).map(([stat, value]) => `
                            <div class="stat-item">
                                <span class="stat-label">${getStatName(stat)}</span>
                                <span class="stat-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-star"></i> القدرة الخاصة</h4>
                    <p>${zombie.specialAbility}</p>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-info-circle"></i> الوصف</h4>
                    <p>${zombie.description}</p>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-trophy"></i> نقاط القوة</h4>
                    <ul>
                        ${getZombieStrengths(zombie, category).map(strength => `
                            <li><i class="fas fa-check-circle"></i> ${strength}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// إعادة تعيين معاينة الزومبي
function resetZombiePreview() {
    const preview = document.getElementById('selectedZombiePreview');
    
    preview.innerHTML = `
        <div class="preview-header">
            <h3>اختر زومبياً لعرض التفاصيل</h3>
        </div>
        <div class="preview-content">
            <p>انقر على زومبي لرؤية تفاصيله ومهاراته</p>
        </div>
    `;
    
    // تعطيل زر التأكيد
    document.getElementById('confirmZombieBtn').disabled = true;
}

// الحصول على اسم الإحصائية
function getStatName(stat) {
    const stats = {
        attack: 'الهجوم',
        defense: 'الدفاع',
        health: 'الصحة',
        speed: 'السرعة',
        critical: 'الضربات الحرجة',
        dodge: 'المراوغة',
        block: 'المنع',
        shield: 'الدرع',
        poison: 'السم',
        weaken: 'الإضعاف',
        accuracy: 'الدقة',
        heal: 'الشفاء',
        stun: 'الصعق',
        slow: 'التبطيء',
        burn: 'الحرق'
    };
    return stats[stat] || stat;
}

// الحصول على نقاط قوة الزومبي
function getZombieStrengths(zombie, category) {
    const strengths = [];
    
    // نقاط القوة حسب الإحصائيات
    if (zombie.stats.attack > 70) strengths.push('هجوم قوي جداً');
    if (zombie.stats.defense > 60) strengths.push('دفاع ممتاز');
    if (zombie.stats.health > 400) strengths.push('صحة عالية');
    if (zombie.stats.speed > 25) strengths.push('سرعة كبيرة');
    if (zombie.stats.critical > 20) strengths.push('ضربات حرجة متكررة');
    if (zombie.stats.dodge > 40) strengths.push('مراوغة عالية');
    
    // نقاط القوة حسب النوع
    if (category.id === 'combat') strengths.push('قاتل ممتاز في المعارك المباشرة');
    if (category.id === 'protection') strengths.push('حماية عالية للاعب');
    if (category.id === 'disease') strengths.push('ضرر تدريجي قوي');
    if (category.id === 'shadow') strengths.push('مراوغة وهجمات مفاجئة');
    if (category.id === 'support') strengths.push('دعم ممتاز للاعب');
    if (category.id === 'legendary') strengths.push('قدرات أسطورية فريدة');
    
    return strengths;
}

// تأكيد اختيار الزومبي
async function confirmZombieSelection() {
    if (!gameState.selectedZombie) {
        showNotification('يرجى اختيار زومبي أولاً', 'error');
        return;
    }
    
    try {
        // تحديث بيانات اللاعب بالزومبي المختار
        await db.collection('players').doc(gameState.user.uid).update({
            selectedZombie: gameState.selectedZombie,
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // تحميل بيانات الزومبي
        await loadZombieData(gameState.selectedZombie);
        
        showNotification(`تم اختيار ${gameState.selectedZombie.name} بنجاح!`, 'success');
        showGameScreen();
    } catch (error) {
        showNotification('فشل حفظ اختيار الزومبي: ' + error.message, 'error');
    }
}

// تحميل بيانات الزومبي
async function loadZombieData(zombieData) {
    gameState.selectedZombie = zombieData;
    
    // تحديث أيقونة الزومبي
    const iconElement = document.getElementById('playerZombieIcon');
    if (iconElement && zombieData.icon) {
        iconElement.className = zombieData.icon;
    }
    
    // تحديث إحصائيات الزومبي
    updateZombieStatsDisplay();
}

// تحديث عرض إحصائيات الزومبي
function updateZombieStatsDisplay() {
    if (!gameState.selectedZombie) return;
    
    const zombie = gameState.selectedZombie;
    
    // تحديث الإحصائيات
    document.getElementById('zombieAttack').textContent = zombie.stats.attack;
    document.getElementById('zombieDefense').textContent = zombie.stats.defense;
    document.getElementById('zombieSpeed').textContent = zombie.stats.speed;
    
    // حساب القوة الإجمالية
    const totalPower = calculateZombiePower(zombie);
    document.getElementById('zombiePower').textContent = totalPower;
    
    // تحديث الصحة
    document.getElementById('zombieHealth').textContent = `${zombie.stats.health}/${zombie.stats.health}`;
    document.getElementById('healthBar').style.width = '100%';
    
    // تحديث نوع الزومبي
    document.getElementById('zombieType').textContent = getCategoryName(zombie.category);
}

// حساب قوة الزومبي
function calculateZombiePower(zombie) {
    let power = 0;
    
    // الوزن للإحصائيات المختلفة
    const weights = {
        attack: 2,
        defense: 1.5,
        health: 0.5,
        speed: 1,
        critical: 2,
        dodge: 1.5,
        block: 1.2,
        shield: 1.3,
        poison: 1.8,
        weaken: 1.4,
        accuracy: 1.2,
        heal: 1.5,
        stun: 1.7,
        slow: 1.4,
        burn: 1.6
    };
    
    // حساب القوة الإجمالية
    Object.entries(zombie.stats).forEach(([stat, value]) => {
        power += value * (weights[stat] || 1);
    });
    
    return Math.round(power);
}

// الحصول على اسم الفئة
function getCategoryName(categoryId) {
    const categories = {
        combat: 'قاتلي',
        protection: 'حماية',
        disease: 'أمراض',
        shadow: 'ظلال',
        support: 'داعم',
        legendary: 'أسطوري'
    };
    return categories[categoryId] || categoryId;
}

// عرض شاشة اللعبة
function showGameScreen() {
    showScreen('gameScreen');
    updatePlayerDisplay();
    
    // تحميل المهارات إذا كانت موجودة
    if (gameState.player && gameState.player.skills) {
        loadSkills();
    }
}

// تحديث عرض اللاعب
function updatePlayerDisplay() {
    if (!gameState.player) return;
    
    const player = gameState.player;
    
    // تحديث المعلومات الأساسية
    document.getElementById('playerName').textContent = player.name;
    document.getElementById('playerLevel').textContent = player.level;
    document.getElementById('goldAmount').textContent = player.gold;
    document.getElementById('dnaAmount').textContent = player.dna;
    document.getElementById('energyAmount').textContent = `${player.energy}/${player.maxEnergy}`;
    
    // تحديث شريط التقدم
    const xpPercent = (player.xp / player.xpNeeded) * 100;
    document.getElementById('levelProgress').style.width = `${xpPercent}%`;
    
    // تحديث الإحصائيات
    if (player.stats) {
        document.getElementById('battlesWon').textContent = player.stats.battlesWon || 0;
        document.getElementById('zombiesKilled').textContent = player.stats.zombiesKilled || 0;
        document.getElementById('totalXp').textContent = player.stats.totalXp || 0;
    }
}

// تبديل التبويبات
function switchTab(tabId) {
    // تحديث القائمة النشطة
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.nav-btn[data-tab="${tabId}"]`).classList.add('active');
    
    // إظهار المحتوى المناسب
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    
    // تحميل بيانات التبويب إذا لزم الأمر
    switch(tabId) {
        case 'skills':
            loadSkills();
            break;
        case 'path':
            loadPaths();
            break;
        case 'leaderboard':
            loadLeaderboard();
            break;
        case 'market':
            loadMarketItems();
            break;
    }
}

// تحميل المهارات
function loadSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid) return;
    
    skillsGrid.innerHTML = '';
    
    // الحصول على مهارات اللاعب
    const playerSkills = gameState.player?.skills || {};
    
    // عرض المهارات حسب التبويب
    const activeTab = document.querySelector('.skill-tab.active');
    const skillType = activeTab ? activeTab.dataset.skill : 'attack';
    
    if (SKILLS[skillType]) {
        SKILLS[skillType].forEach(skill => {
            const skillLevel = playerSkills[skill.id]?.level || 0;
            const canUpgrade = canUpgradeSkill(skill, playerSkills);
            
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.innerHTML = `
                <div class="skill-header">
                    <div class="skill-name">
                        <i class="${skill.icon}"></i>
                        <span>${skill.name}</span>
                    </div>
                    <div class="skill-level">مستوى ${skillLevel}/${skill.maxLevel}</div>
                </div>
                
                <div class="skill-description">
                    <p>${skill.description}</p>
                </div>
                
                <div class="skill-effects">
                    <div class="skill-effect">
                        <span>الضرر الأساسي:</span>
                        <span>${skill.baseDamage + (skillLevel * (skill.damagePerLevel || 0))}</span>
                    </div>
                    ${skill.poisonDamage ? `
                    <div class="skill-effect">
                        <span>ضرر السم:</span>
                        <span>${skill.poisonDamage}</span>
                    </div>
                    ` : ''}
                    ${skill.speedBonus ? `
                    <div class="skill-effect">
                        <span>زيادة السرعة:</span>
                        <span>${skill.speedBonus}%</span>
                    </div>
                    ` : ''}
                </div>
                
                <div class="skill-cost">
                    <div class="cost-amount">
                        <i class="fas fa-dna"></i>
                        <span>${skill.cost}</span>
                    </div>
                    <button class="upgrade-skill-btn" 
                            onclick="upgradeSkill('${skill.id}')"
                            ${skillLevel >= skill.maxLevel || !canUpgrade ? 'disabled' : ''}>
                        ${skillLevel === 0 ? 'تعلم' : 'ترقية'}
                    </button>
                </div>
            `;
            
            skillsGrid.appendChild(skillElement);
        });
    }
    
    // تحديث نقاط المهارة
    updateSkillPoints();
}

// التحقق من إمكانية ترقية المهارة
function canUpgradeSkill(skill, playerSkills) {
    // التحقق من المتطلبات
    if (skill.requirements && skill.requirements.length > 0) {
        for (const req of skill.requirements) {
            const reqSkill = playerSkills[req.skill];
            if (!reqSkill || reqSkill.level < req.level) {
                return false;
            }
        }
    }
    
    // التحقق من نقاط الحمض النووي
    if (gameState.player.dna < skill.cost) {
        return false;
    }
    
    return true;
}

// ترقية المهارة
async function upgradeSkill(skillId) {
    if (!gameState.player) return;
    
    // البحث عن المهارة
    let targetSkill = null;
    let skillType = null;
    
    for (const [type, skills] of Object.entries(SKILLS)) {
        const skill = skills.find(s => s.id === skillId);
        if (skill) {
            targetSkill = skill;
            skillType = type;
            break;
        }
    }
    
    if (!targetSkill) return;
    
    // الحصول على مستوى المهارة الحالي
    const playerSkills = gameState.player.skills || {};
    const currentLevel = playerSkills[skillId]?.level || 0;
    
    if (currentLevel >= targetSkill.maxLevel) {
        showNotification('لقد وصلت للحد الأقصى من هذه المهارة', 'warning');
        return;
    }
    
    // التحقق من المتطلبات
    if (!canUpgradeSkill(targetSkill, playerSkills)) {
        showNotification('لا تستوفي متطلبات الترقية', 'error');
        return;
    }
    
    try {
        // خصم التكلفة
        const newDna = gameState.player.dna - targetSkill.cost;
        
        // تحديث مستوى المهارة
        const updatedSkills = { ...playerSkills };
        updatedSkills[skillId] = {
            level: currentLevel + 1,
            lastUpgraded: new Date().toISOString()
        };
        
        // تحديث بيانات اللاعب
        await db.collection('players').doc(gameState.user.uid).update({
            dna: newDna,
            skills: updatedSkills
        });
        
        // تحديث حالة اللعبة
        gameState.player.dna = newDna;
        gameState.player.skills = updatedSkills;
        
        // تحديث العرض
        updatePlayerDisplay();
        loadSkills();
        
        showNotification(`تم ترقية ${targetSkill.name} إلى المستوى ${currentLevel + 1}!`, 'success');
    } catch (error) {
        showNotification('فشل ترقية المهارة: ' + error.message, 'error');
    }
}

// تحديث نقاط المهارة
function updateSkillPoints() {
    if (gameState.player) {
        document.getElementById('skillPoints').textContent = gameState.player.dna || 0;
    }
}

// تحميل المسارات
function loadPaths() {
    const pathsGrid = document.getElementById('pathsGrid');
    if (!pathsGrid) return;
    
    pathsGrid.innerHTML = '';
    
    const playerPath = gameState.player?.path;
    
    PATHS.forEach(path => {
        const isSelected = playerPath === path.id;
        
        const pathElement = document.createElement('div');
        pathElement.className = `path-card ${isSelected ? 'selected' : ''}`;
        pathElement.innerHTML = `
            <div class="path-icon" style="background: ${path.color}">
                <i class="${path.icon}"></i>
            </div>
            
            <h4>${path.name}</h4>
            
            <div class="path-description">
                <p>${path.description}</p>
            </div>
            
            <div class="path-benefits">
                ${path.benefits.map(benefit => `
                    <div class="benefit">
                        <i class="fas fa-check-circle"></i>
                        <span>${benefit}</span>
                    </div>
                `).join('')}
            </div>
            
            <button class="select-path-btn ${isSelected ? 'selected' : ''}"
                    onclick="selectPath('${path.id}')"
                    ${isSelected ? 'disabled' : ''}>
                ${isSelected ? '✓ تم الاختيار' : 'اختيار هذا المسار'}
            </button>
        `;
        
        pathsGrid.appendChild(pathElement);
    });
    
    // تحديث المسار المختار
    updateSelectedPath();
}

// اختيار المسار
async function selectPath(pathId) {
    if (!gameState.player) return;
    
    const path = PATHS.find(p => p.id === pathId);
    if (!path) return;
    
    // التحذير من أن الاختيار نهائي
    if (!confirm(`⚠️ تحذير: اختيار المسار نهائي ولا يمكن تغييره!\n\nهل أنت متأكد من اختيار مسار "${path.name}"؟`)) {
        return;
    }
    
    try {
        // تحديث مسار اللاعب
        await db.collection('players').doc(gameState.user.uid).update({
            path: pathId
        });
        
        // تحديث حالة اللعبة
        gameState.player.path = pathId;
        gameState.currentPath = path;
        
        // تحديث العرض
        loadPaths();
        
        showNotification(`تم اختيار مسار ${path.name} بنجاح!`, 'success');
    } catch (error) {
        showNotification('فشل اختيار المسار: ' + error.message, 'error');
    }
}

// تحديث المسار المختار
function updateSelectedPath() {
    const selectedPathDiv = document.getElementById('selectedPath');
    const currentPathName = document.getElementById('currentPathName');
    const pathDetails = document.getElementById('pathDetails');
    
    if (!gameState.player?.path) {
        currentPathName.textContent = 'لم يتم الاختيار بعد';
        pathDetails.innerHTML = '<p>اختر مساراً لعرض تفاصيله</p>';
        return;
    }
    
    const path = PATHS.find(p => p.id === gameState.player.path);
    if (!path) return;
    
    currentPathName.textContent = path.name;
    pathDetails.innerHTML = `
        <div class="path-info">
            <h5>مميزات المسار:</h5>
            <ul>
                ${path.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
            
            <h5>المكافآت:</h5>
            <div class="bonuses-grid">
                ${Object.entries(path.bonuses).map(([bonus, value]) => `
                    <div class="bonus-item">
                        <span>${getBonusName(bonus)}:</span>
                        <span class="bonus-value">+${value}%</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// الحصول على اسم المكافأة
function getBonusName(bonus) {
    const bonuses = {
        attack: 'الهجوم',
        criticalChance: 'الضربات الحرجة',
        speed: 'السرعة',
        defense: 'الدفاع',
        health: 'الصحة',
        block: 'المنع',
        poison: 'السم',
        weaken: 'الإضعاف',
        duration: 'المدة',
        dodge: 'المراوغة',
        criticalDamage: 'ضرر الحرجة',
        accuracy: 'الدقة',
        cooldown: 'وقت الانتظار',
        allStats: 'جميع الإحصائيات',
        temporaryPower: 'قوة مؤقتة',
        versatility: 'تنوع'
    };
    return bonuses[bonus] || bonus;
}

// تحميل المهام اليومية
function loadDailyQuests() {
    const questList = document.getElementById('questList');
    if (!questList) return;
    
    const dailyQuests = [
        {
            id: 'daily_battle',
            name: 'محارب اليوم',
            description: 'شارك في 3 معارك',
            reward: 100,
            progress: 0,
            target: 3
        },
        {
            id: 'daily_upgrade',
            name: 'المطور النشط',
            description: 'قم بترقية مهارة واحدة',
            reward: 75,
            progress: 0,
            target: 1
        },
        {
            id: 'daily_zombie',
            name: 'الصياد',
            description: 'اقتل 5 زومبي',
            reward: 150,
            progress: 0,
            target: 5
        }
    ];
    
    questList.innerHTML = '';
    
    dailyQuests.forEach(quest => {
        const progressPercent = (quest.progress / quest.target) * 100;
        
        const questElement = document.createElement('div');
        questElement.className = 'quest-item';
        questElement.innerHTML = `
            <div class="quest-info">
                <h4>${quest.name}</h4>
                <p>${quest.description}</p>
                <div class="quest-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="progress-text">${quest.progress}/${quest.target}</div>
                </div>
            </div>
            <div class="quest-reward">
                <i class="fas fa-coins"></i>
                <span>${quest.reward}</span>
            </div>
        `;
        
        questList.appendChild(questElement);
    });
    
    // تحديث مؤقت المهام
    startQuestTimer();
}

// بدء مؤقت المهام
function startQuestTimer() {
    function updateTimer() {
        const now = new Date();
        const resetTime = new Date(now);
        resetTime.setHours(24, 0, 0, 0); // منتصف الليل
        
        const timeUntilReset = resetTime - now;
        const hours = Math.floor(timeUntilReset / (1000 * 60 * 60));
        const minutes = Math.floor((timeUntilReset % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeUntilReset % (1000 * 60)) / 1000);
        
        const timerElement = document.getElementById('questTimer');
        if (timerElement) {
            timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// تحميل لوحة المتصدرين
async function loadLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    if (!leaderboardList) return;
    
    try {
        const snapshot = await db.collection('players')
            .orderBy('level', 'desc')
            .orderBy('xp', 'desc')
            .limit(10)
            .get();
        
        leaderboardList.innerHTML = '';
        
        let rank = 1;
        snapshot.forEach(doc => {
            const player = doc.data();
            const isCurrentPlayer = player.uid === gameState.user?.uid;
            
            const playerElement = document.createElement('div');
            playerElement.className = `leaderboard-item ${isCurrentPlayer ? 'current-player' : ''}`;
            playerElement.innerHTML = `
                <div class="player-rank rank-${rank}">${rank}</div>
                <div class="player-details">
                    <h4>${player.name}</h4>
                    ${player.selectedZombie ? `
                    <div class="player-class">${getCategoryName(player.selectedZombie.category)}</div>
                    ` : ''}
                </div>
                <div class="player-stats">
                    <div class="stat-value">
                        <div class="number">${player.level}</div>
                        <div class="label">المستوى</div>
                    </div>
                    <div class="stat-value">
                        <div class="number">${calculateZombiePower(player.selectedZombie) || 0}</div>
                        <div class="label">القوة</div>
                    </div>
                    <div class="stat-value">
                        <div class="number">${player.stats?.battlesWon || 0}</div>
                        <div class="label">انتصارات</div>
                    </div>
                </div>
            `;
            
            leaderboardList.appendChild(playerElement);
            rank++;
        });
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        leaderboardList.innerHTML = '<p class="error">فشل تحميل لوحة المتصدرين</p>';
    }
}

// تحميل عناصر السوق
function loadMarketItems() {
    const marketItems = document.getElementById('marketItems');
    if (!marketItems) return;
    
    const items = [
        {
            id: 'small_health_potion',
            name: 'جرعة صحة صغيرة',
            icon: 'fas fa-heart',
            description: 'تعيد 100 نقطة صحة للزومبي',
            price: 50,
            type: 'potion',
            effect: { health: 100 }
        },
        {
            id: 'attack_boost',
            name: 'تعزيز الهجوم',
            icon: 'fas fa-fist-raised',
            description: 'يزيد هجوم الزومبي 20% لمدة ساعة',
            price: 100,
            type: 'boost',
            effect: { attack: 20, duration: 3600 }
        },
        {
            id: 'dna_pack_small',
            name: 'حزمة حمض نووي صغيرة',
            icon: 'fas fa-dna',
            description: '50 نقطة حمض نووي لترقية المهارات',
            price: 100,
            type: 'resource',
            effect: { dna: 50 }
        },
        {
            id: 'rare_skin',
            name: 'مظهر نادر',
            icon: 'fas fa-palette',
            description: 'مظهر خاص للزومبي',
            price: 500,
            type: 'cosmetic',
            effect: { skin: 'rare' }
        }
    ];
    
    marketItems.innerHTML = '';
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'market-item';
        itemElement.innerHTML = `
            <div class="item-header">
                <div class="item-icon">
                    <i class="${item.icon}"></i>
                </div>
                <h4>${item.name}</h4>
            </div>
            
            <div class="item-description">
                <p>${item.description}</p>
            </div>
            
            <div class="item-stats">
                <div class="item-stat">
                    <span>النوع:</span>
                    <span>${getItemTypeName(item.type)}</span>
                </div>
                <div class="item-stat">
                    <span>التأثير:</span>
                    <span>${getItemEffectDescription(item.effect)}</span>
                </div>
            </div>
            
            <div class="item-footer">
                <div class="item-price">
                    <i class="fas fa-coins"></i>
                    <span>${item.price}</span>
                </div>
                <button class="buy-btn" onclick="buyItem('${item.id}')">
                    شراء
                </button>
            </div>
        `;
        
        marketItems.appendChild(itemElement);
    });
}

// الحصول على اسم نوع العنصر
function getItemTypeName(type) {
    const types = {
        potion: 'جرعة',
        boost: 'تعزيز',
        resource: 'مورد',
        cosmetic: 'مظهر'
    };
    return types[type] || type;
}

// الحصول على وصف تأثير العنصر
function getItemEffectDescription(effect) {
    if (effect.health) return `+${effect.health} صحة`;
    if (effect.attack) return `+${effect.attack}% هجوم`;
    if (effect.dna) return `+${effect.dna} حمض نووي`;
    if (effect.skin) return 'مظهر خاص';
    return 'تأثير خاص';
}

// شراء عنصر
async function buyItem(itemId) {
    if (!gameState.player) return;
    
    // البحث عن العنصر
    const items = [
        {
            id: 'small_health_potion',
            name: 'جرعة صحة صغيرة',
            price: 50,
            effect: { health: 100 }
        },
        {
            id: 'attack_boost',
            name: 'تعزيز الهجوم',
            price: 100,
            effect: { attack: 20, duration: 3600 }
        },
        {
            id: 'dna_pack_small',
            name: 'حزمة حمض نووي صغيرة',
            price: 100,
            effect: { dna: 50 }
        },
        {
            id: 'rare_skin',
            name: 'مظهر نادر',
            price: 500,
            effect: { skin: 'rare' }
        }
    ];
    
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    // التحقق من الرصيد
    if (gameState.player.gold < item.price) {
        showNotification('لا تملك ذهباً كافياً', 'error');
        return;
    }
    
    try {
        // خصم السعر
        const newGold = gameState.player.gold - item.price;
        
        // تطبيق التأثير
        let updates = { gold: newGold };
        
        if (item.effect.dna) {
            updates.dna = (gameState.player.dna || 0) + item.effect.dna;
        }
        
        // تحديث بيانات اللاعب
        await db.collection('players').doc(gameState.user.uid).update(updates);
        
        // تحديث حالة اللعبة
        gameState.player.gold = newGold;
        if (item.effect.dna) {
            gameState.player.dna = updates.dna;
        }
        
        // تحديث العرض
        updatePlayerDisplay();
        
        showNotification(`تم شراء ${item.name} بنجاح!`, 'success');
    } catch (error) {
        showNotification('فشل شراء العنصر: ' + error.message, 'error');
    }
}

// بدء معركة سريعة
function startQuickBattle() {
    startBattle('quick');
}

// بدء معركة
async function startBattle(type) {
    if (gameState.battleInProgress) {
        showNotification('هناك معركة قائمة بالفعل', 'warning');
        return;
    }
    
    // التحقق من الطاقة
    const energyCost = getBattleEnergyCost(type);
    if (gameState.player.energy < energyCost) {
        showNotification('لا تملك طاقة كافية', 'error');
        return;
    }
    
    gameState.battleInProgress = true;
    
    // إنشاء الخصم
    const opponent = createOpponent(type);
    
    // إعداد المعركة
    setupBattle(opponent, type);
    
    // عرض نافذة المعركة
    document.getElementById('battleModal').classList.add('active');
}

// الحصول على تكلفة الطاقة للمعركة
function getBattleEnergyCost(type) {
    const costs = {
        quick: 10,
        training: 5,
        tournament: 30,
        boss: 50
    };
    return costs[type] || 10;
}

// إنشاء خصم
function createOpponent(battleType) {
    // خصم عشوائي من الزومبي المتاحة
    const allZombies = [];
    Object.values(ZOMBIE_TYPES).forEach(category => {
        allZombies.push(...category.zombies);
    });
    
    const randomZombie = allZombies[Math.floor(Math.random() * allZombies.length)];
    
    // تعديل الإحصائيات حسب نوع المعركة
    let statsMultiplier = 1;
    switch(battleType) {
        case 'training':
            statsMultiplier = 0.5;
            break;
        case 'tournament':
            statsMultiplier = 1.5;
            break;
        case 'boss':
            statsMultiplier = 2.0;
            break;
        default:
            statsMultiplier = 1.0;
    }
    
    const modifiedStats = {};
    Object.entries(randomZombie.stats).forEach(([stat, value]) => {
        modifiedStats[stat] = Math.round(value * statsMultiplier);
    });
    
    return {
        ...randomZombie,
        stats: modifiedStats,
        name: `${randomZombie.name} ${battleType === 'boss' ? '(الزعيم)' : ''}`
    };
}

// إعداد المعركة
function setupBattle(opponent, battleType) {
    // تحديث معلومات المقاتلين
    document.getElementById('playerFighterName').textContent = gameState.selectedZombie.name;
    document.getElementById('playerFighterIcon').className = gameState.selectedZombie.icon;
    
    document.getElementById('opponentFighterName').textContent = opponent.name;
    document.getElementById('opponentFighterIcon').className = opponent.icon;
    
    // إعداد أشرطة الصحة
    const playerHealth = gameState.selectedZombie.stats.health;
    const opponentHealth = opponent.stats.health;
    
    document.getElementById('playerHealthBar').style.width = '100%';
    document.getElementById('opponentHealthBar').style.width = '100%';
    
    // إعداد سجل المعركة
    const battleLog = document.getElementById('battleLog');
    battleLog.innerHTML = `
        <div class="log-entry">
            <strong>بدأت المعركة!</strong>
            <p>${gameState.selectedZombie.name} يواجه ${opponent.name}</p>
        </div>
    `;
    
    // حفظ حالة المعركة
    gameState.currentBattle = {
        opponent: opponent,
        type: battleType,
        playerHealth: playerHealth,
        opponentHealth: opponentHealth,
        maxPlayerHealth: playerHealth,
        maxOpponentHealth: opponentHealth,
        log: [],
        turn: 0
    };
    
    // إعداد أحداث الأزرار
    setupBattleActions();
}

// إعداد أحداث المعركة
function setupBattleActions() {
    document.querySelectorAll('.battle-action-btn').forEach(btn => {
        btn.onclick = (e) => {
            const action = e.target.closest('.battle-action-btn').dataset.action;
            performBattleAction(action);
        };
    });
    
    document.getElementById('autoBattleBtn').onclick = () => {
        autoBattle();
    };
}

// تنفيذ إجراء في المعركة
async function performBattleAction(action) {
    if (!gameState.currentBattle) return;
    
    const battle = gameState.currentBattle;
    battle.turn++;
    
    let logEntry = '';
    
    switch(action) {
        case 'attack':
            // هجوم اللاعب
            const playerDamage = calculateDamage(gameState.selectedZombie, battle.opponent, false);
            battle.opponentHealth -= playerDamage;
            
            logEntry = `
                <div class="log-entry attack">
                    <strong>${gameState.selectedZombie.name} يهاجم!</strong>
                    <p>سبب ${playerDamage} ضرر</p>
                </div>
            `;
            break;
            
        case 'skill':
            // استخدام مهارة
            const skillDamage = calculateDamage(gameState.selectedZombie, battle.opponent, true);
            battle.opponentHealth -= skillDamage;
            
            logEntry = `
                <div class="log-entry skill">
                    <strong>${gameState.selectedZombie.name} يستخدم مهارة!</strong>
                    <p>سبب ${skillDamage} ضرر</p>
                </div>
            `;
            break;
            
        case 'defend':
            // دفاع
            logEntry = `
                <div class="log-entry defense">
                    <strong>${gameState.selectedZombie.name} يدافع!</strong>
                    <p>التعافي وزيادة الدفاع</p>
                </div>
            `;
            break;
            
        case 'special':
            // استخدام القدرة الخاصة
            const specialDamage = calculateSpecialDamage(gameState.selectedZombie, battle.opponent);
            battle.opponentHealth -= specialDamage;
            
            logEntry = `
                <div class="log-entry critical">
                    <strong>${gameState.selectedZombie.name} يستخدم قدرته الخاصة!</strong>
                    <p>سبب ${specialDamage} ضرر قاتل</p>
                </div>
            `;
            break;
    }
    
    // تحديث سجل المعركة
    const battleLog = document.getElementById('battleLog');
    battleLog.innerHTML = logEntry + battleLog.innerHTML;
    
    // تحديث أشرطة الصحة
    updateHealthBars();
    
    // التحقق من انتهاء المعركة
    if (battle.opponentHealth <= 0) {
        endBattle(true);
        return;
    }
    
    // هجوم الخصم
    setTimeout(() => {
        enemyTurn();
    }, 1000);
}

// حساب الضرر
function calculateDamage(attacker, defender, isSkill = false) {
    let baseDamage = attacker.stats.attack;
    
    if (isSkill) {
        // تأثير المهارات
        baseDamage *= 1.5;
        
        // تأثير المسار
        if (gameState.currentPath) {
            baseDamage *= (1 + (gameState.currentPath.bonuses.attack || 0) / 100);
        }
    }
    
    // تأثير الدفاع
    const defenseReduction = defender.stats.defense * 0.5;
    let finalDamage = baseDamage - defenseReduction;
    
    // الحد الأدنى للضرر
    finalDamage = Math.max(finalDamage, baseDamage * 0.1);
    
    // فرصة الضربة الحرجة
    if (Math.random() * 100 < attacker.stats.critical) {
        finalDamage *= 2;
    }
    
    return Math.round(finalDamage);
}

// حساب الضرر الخاص
function calculateSpecialDamage(attacker, defender) {
    let damage = attacker.stats.attack * 2;
    
    // تأثير القدرة الخاصة حسب نوع الزومبي
    switch(attacker.category) {
        case 'combat':
            damage *= 1.5; // زيادة الضرر للزومبي القتالي
            break;
        case 'disease':
            damage *= 1.2; // ضرر تدريجي إضافي
            break;
        case 'legendary':
            damage *= 1.8; // أقوى ضرر للزومبي الأسطوري
            break;
    }
    
    return Math.round(damage);
}

// تحديث أشرطة الصحة
function updateHealthBars() {
    const battle = gameState.currentBattle;
    if (!battle) return;
    
    const playerHealthPercent = (battle.playerHealth / battle.maxPlayerHealth) * 100;
    const opponentHealthPercent = (battle.opponentHealth / battle.maxOpponentHealth) * 100;
    
    document.getElementById('playerHealthBar').style.width = `${playerHealthPercent}%`;
    document.getElementById('opponentHealthBar').style.width = `${opponentHealthPercent}%`;
}

// دور الخصم
function enemyTurn() {
    const battle = gameState.currentBattle;
    if (!battle) return;
    
    // هجوم الخصم
    const enemyDamage = calculateDamage(battle.opponent, gameState.selectedZombie, false);
    battle.playerHealth -= enemyDamage;
    
    // تحديث سجل المعركة
    const battleLog = document.getElementById('battleLog');
    const logEntry = `
        <div class="log-entry attack">
            <strong>${battle.opponent.name} يهاجم!</strong>
            <p>سبب ${enemyDamage} ضرر</p>
        </div>
    `;
    battleLog.innerHTML = logEntry + battleLog.innerHTML;
    
    // تحديث أشرطة الصحة
    updateHealthBars();
    
    // التحقق من انتهاء المعركة
    if (battle.playerHealth <= 0) {
        endBattle(false);
    }
}

// معركة تلقائية
function autoBattle() {
    const interval = setInterval(() => {
        if (!gameState.currentBattle) {
            clearInterval(interval);
            return;
        }
        
        const actions = ['attack', 'skill', 'defend', 'special'];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        performBattleAction(randomAction);
        
        // التحقق من انتهاء المعركة
        const battle = gameState.currentBattle;
        if (battle.playerHealth <= 0 || battle.opponentHealth <= 0) {
            clearInterval(interval);
        }
    }, 1500);
}

// إنهاء المعركة
async function endBattle(isVictory) {
    const battle = gameState.currentBattle;
    if (!battle) return;
    
    gameState.battleInProgress = false;
    
    // حساب المكافآت
    const rewards = calculateBattleRewards(battle, isVictory);
    
    // تحديث بيانات اللاعب
    await updatePlayerAfterBattle(rewards, isVictory);
    
    // عرض النتائج
    showBattleResults(isVictory, rewards);
    
    // إغلاق نافذة المعركة
    setTimeout(() => {
        document.getElementById('battleModal').classList.remove('active');
    }, 500);
}

// حساب مكافآت المعركة
function calculateBattleRewards(battle, isVictory) {
    const rewards = {
        xp: 0,
        gold: 0,
        dna: 0
    };
    
    if (isVictory) {
        // المكافآت حسب نوع المعركة
        switch(battle.type) {
            case 'training':
                rewards.xp = 50;
                rewards.gold = 25;
                rewards.dna = 5;
                break;
            case 'tournament':
                rewards.xp = 200;
                rewards.gold = 100;
                rewards.dna = 20;
                break;
            case 'boss':
                rewards.xp = 500;
                rewards.gold = 250;
                rewards.dna = 50;
                break;
            default: // quick
                rewards.xp = 100;
                rewards.gold = 50;
                rewards.dna = 10;
        }
        
        // زيادة المكافآت حسب مستوى اللاعب
        rewards.xp *= gameState.player.level;
        rewards.gold *= gameState.player.level;
        rewards.dna *= Math.max(1, gameState.player.level / 2);
    } else {
        // مكافآت الخسارة (أقل بكثير)
        rewards.xp = 10;
        rewards.gold = 5;
    }
    
    return rewards;
}

// تحديث اللاعب بعد المعركة
async function updatePlayerAfterBattle(rewards, isVictory) {
    try {
        const updates = {
            energy: Math.max(0, gameState.player.energy - getBattleEnergyCost(gameState.currentBattle.type)),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        if (isVictory) {
            // زيادة الخبرة
            let newXp = gameState.player.xp + rewards.xp;
            let newLevel = gameState.player.level;
            let xpNeeded = gameState.player.xpNeeded;
            
            // التحقق من الترقية
            while (newXp >= xpNeeded) {
                newXp -= xpNeeded;
                newLevel++;
                xpNeeded = Math.round(xpNeeded * 1.5);
            }
            
            updates.xp = newXp;
            updates.level = newLevel;
            updates.xpNeeded = xpNeeded;
            updates.gold = gameState.player.gold + rewards.gold;
            updates.dna = (gameState.player.dna || 0) + rewards.dna;
            
            // تحديث الإحصائيات
            const stats = gameState.player.stats || {};
            updates.stats = {
                battlesWon: (stats.battlesWon || 0) + 1,
                zombiesKilled: (stats.zombiesKilled || 0) + 1,
                totalXp: (stats.totalXp || 0) + rewards.xp
            };
            
            // تحديث حالة اللعبة
            gameState.player.xp = newXp;
            gameState.player.level = newLevel;
            gameState.player.xpNeeded = xpNeeded;
            gameState.player.gold = updates.gold;
            gameState.player.dna = updates.dna;
            gameState.player.stats = updates.stats;
            
            // التحقق من الترقية
            if (newLevel > gameState.player.level) {
                showNotification(`🎉 تهانينا! لقد وصلت إلى المستوى ${newLevel}!`, 'success');
            }
        } else {
            // تحديث إحصائيات الخسارة
            const stats = gameState.player.stats || {};
            updates.stats = {
                ...stats,
                totalXp: (stats.totalXp || 0) + rewards.xp
            };
            
            gameState.player.stats = updates.stats;
        }
        
        // تطبيق تحديثات الطاقة
        gameState.player.energy = updates.energy;
        
        // حفظ التحديثات
        await db.collection('players').doc(gameState.user.uid).update(updates);
        
        // تحديث العرض
        updatePlayerDisplay();
        
    } catch (error) {
        console.error('Error updating player after battle:', error);
        showNotification('حدث خطأ أثناء تحديث البيانات', 'error');
    }
}

// عرض نتائج المعركة
function showBattleResults(isVictory, rewards) {
    const resultModal = document.getElementById('resultModal');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const rewardsList = document.getElementById('rewardsList');
    
    if (isVictory) {
        resultIcon.className = 'fas fa-trophy';
        resultTitle.textContent = '🎉 انتصار!';
        resultMessage.textContent = 'لقد فزت في المعركة! زومبيك كان رائعاً!';
        
        rewardsList.innerHTML = `
            <div class="reward-item">
                <div class="reward-name">
                    <i class="fas fa-star"></i>
                    <span>خبرة</span>
                </div>
                <div class="reward-amount xp">+${rewards.xp}</div>
            </div>
            <div class="reward-item">
                <div class="reward-name">
                    <i class="fas fa-coins"></i>
                    <span>ذهب</span>
                </div>
                <div class="reward-amount">+${rewards.gold}</div>
            </div>
            <div class="reward-item">
                <div class="reward-name">
                    <i class="fas fa-dna"></i>
                    <span>حمض نووي</span>
                </div>
                <div class="reward-amount dna">+${rewards.dna}</div>
            </div>
        `;
    } else {
        resultIcon.className = 'fas fa-skull-crossbones';
        resultTitle.textContent = '💀 هزيمة';
        resultMessage.textContent = 'لقد خسرت هذه المعركة. لا تستسلم وحاول مرة أخرى!';
        
        rewardsList.innerHTML = `
            <div class="reward-item">
                <div class="reward-name">
                    <i class="fas fa-star"></i>
                    <span>خبرة</span>
                </div>
                <div class="reward-amount xp">+${rewards.xp}</div>
            </div>
            <div class="reward-item">
                <div class="reward-name">
                    <i class="fas fa-coins"></i>
                    <span>ذهب</span>
                </div>
                <div class="reward-amount">+${rewards.gold}</div>
            </div>
        `;
    }
    
    resultModal.classList.add('active');
}

// تسجيل الخروج
async function logout() {
    try {
        await auth.signOut();
        gameState.user = null;
        gameState.player = null;
        gameState.selectedZombie = null;
        gameState.currentPath = null;
        
        showScreen('authScreen');
        showNotification('تم تسجيل الخروج بنجاح', 'info');
    } catch (error) {
        showNotification('فشل تسجيل الخروج: ' + error.message, 'error');
    }
}

// عرض الإشعارات
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon ${type}">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
        </div>
        <div class="notification-content">
            <h4>${getNotificationTitle(type)}</h4>
            <p>${message}</p>
        </div>
    `;
    
    container.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // إخفاء الإشعار بعد 5 ثوانٍ
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// الحصول على أيقونة الإشعار
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// الحصول على عنوان الإشعار
function getNotificationTitle(type) {
    const titles = {
        success: 'نجاح',
        error: 'خطأ',
        warning: 'تحذير',
        info: 'معلومة'
    };
    return titles[type] || 'إشعار';
}

// تحديث الطاقة تلقائياً
function startEnergyRefresh() {
    setInterval(async () => {
        if (gameState.player && gameState.player.energy < gameState.player.maxEnergy) {
            // زيادة الطاقة
            const newEnergy = Math.min(gameState.player.maxEnergy, gameState.player.energy + 1);
            
            try {
                await db.collection('players').doc(gameState.user.uid).update({
                    energy: newEnergy
                });
                
                gameState.player.energy = newEnergy;
                updatePlayerDisplay();
            } catch (error) {
                console.error('Error updating energy:', error);
            }
        }
    }, 60000); // كل دقيقة
}

// بدء تحديث الطاقة عند تحميل اللعبة
startEnergyRefresh();

// تصدير الدوال للاستخدام في HTML
window.selectZombie = selectZombie;
window.confirmZombieSelection = confirmZombieSelection;
window.switchTab = switchTab;
window.upgradeSkill = upgradeSkill;
window.selectPath = selectPath;
window.buyItem = buyItem;
window.startQuickBattle = startQuickBattle;
window.performBattleAction = performBattleAction;
window.autoBattle = autoBattle;
