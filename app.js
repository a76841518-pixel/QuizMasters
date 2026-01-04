// تهيئة Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCnnkPDJLB5-EONapFjp045PradpD-wTxc",
    authDomain: "quizmasters-f25bb.firebaseapp.com",
    projectId: "quizmasters-f25bb",
    storageBucket: "quizmasters-f25bb.firebasestorage.app",
    messagingSenderId: "1092821859984",
    appId: "1:1092821859984:web:f774fb77573e29482fe215",
    measurementId: "G-N2FE7Q1MDT"
};

// تهيئة التطبيق
firebase.initializeApp(firebaseConfig);

// خدمات Firebase
const auth = firebase.auth();
const db = firebase.firestore();
const rtdb = firebase.database();

// إعدادات Firestore
db.settings({ timestampsInSnapshots: true });

// ثوابت التطبيق
const APP_CONSTANTS = {
    LEVELS: [
        { level: 1, xp: 0 },
        { level: 2, xp: 100 },
        { level: 3, xp: 250 },
        { level: 4, xp: 500 },
        { level: 5, xp: 850 },
        { level: 6, xp: 1300 },
        { level: 7, xp: 1850 },
        { level: 8, xp: 2500 },
        { level: 9, xp: 3250 },
        { level: 10, xp: 4100 },
        { level: 11, xp: 5050 },
        { level: 12, xp: 6100 },
        { level: 13, xp: 7250 },
        { level: 14, xp: 8500 },
        { level: 15, xp: 9850 },
        { level: 16, xp: 11300 },
        { level: 17, xp: 12850 },
        { level: 18, xp: 14500 },
        { level: 19, xp: 16250 },
        { level: 20, xp: 18100 }
    ],
    
    DIFFICULTY_POINTS: {
        easy: 10,
        medium: 20,
        hard: 30
    },
    
    CHALLENGE_TYPES: {
        INDIVIDUAL: 'individual',
        SPEED: 'speed',
        TIME: 'time',
        COMPREHENSIVE: 'comprehensive'
    },
    
    CHALLENGE_TIMES: {
        individual: 300,
        speed: 180,
        time: 240,
        comprehensive: 300
    },
    
    QUESTION_CATEGORIES: [
        'science', 'history', 'geography', 'sports',
        'art', 'entertainment', 'technology', 'general'
    ]
};

// حالة التطبيق
let AppState = {
    currentUser: null,
    userData: null,
    isAdmin: false,
    currentPage: 'dashboard',
    challenges: [],
    questions: [],
    friends: [],
    notifications: [],
    leaderboard: [],
    tournaments: []
};

// أضف هذه الدالة في بداية ملف app.js (بعد تعريف AppState)
function initApp() {
    // إخفاء شاشة التحميل بعد 2 ثانية
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 2000);

    // إعداد جميع مستمعات الأحداث
    setupEventListeners();
    setupAdditionalEventListeners();
    
    // تحميل البيانات الأولية
    loadInitialData();
    
    // التحقق من حالة المصادقة
    checkAuthState();
}

async function loadPageContent(page) {
    console.log('تحميل محتوى الصفحة:', page);
    
    switch (page) {
        case 'dashboard':
            // لوحة التحكم مُحملة بالفعل
            break;
            
        case 'challenges':
            await loadChallengesPage();
            break;
            
        case 'tournaments':
            await loadTournamentsPage();
            break;
            
        case 'leaderboard':
            await loadLeaderboardPage();
            break;
            
        case 'friends':
            await loadFriendsPage();
            break;
            
        case 'shop':
            await loadShopPage();
            break;
            
        case 'profile':
            await loadProfilePage();
            break;
            
        case 'settings':
            await loadSettingsPage();
            break;
            
        case 'admin':
            if (AppState.isAdmin) {
                await admin.loadAdminData();
            } else {
                navigateTo('dashboard');
                showToast('غير مصرح', 'ليس لديك صلاحية الوصول', 'error');
            }
            break;
            
        case 'help':
            loadHelpPage();
            break;
    }
}

// دالة تحميل صفحة التحديات
async function loadChallengesPage() {
    const container = document.getElementById('challenges-page');
    if (!container) return;
    
    // إذا كان المحتوى موجوداً بالفعل، لا تعيد تحميله
    if (container.querySelector('.challenges-container')) {
        return;
    }
    
    try {
        container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <i class="fas fa-gamepad"></i>
                    التحديات
                </h1>
                <div class="header-actions">
                    <button class="btn btn-outline" id="create-challenge">
                        <i class="fas fa-plus"></i> إنشاء تحدٍ
                    </button>
                    <button class="btn btn-refresh" id="refresh-challenges">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>
            
            <div class="loading-section">
                <div class="loader-spinner"></div>
                <p>جاري تحميل التحديات...</p>
            </div>
        `;
        
        // إضافة مستمعات الأحداث
        document.getElementById('create-challenge')?.addEventListener('click', () => {
            showCreateChallengeModal();
        });
        
        document.getElementById('refresh-challenges')?.addEventListener('click', () => {
            loadChallengesPage();
        });
        
        // تحميل التحديات
        await loadChallenges();
        
        // بعد تحميل البيانات، عرض المحتوى
        renderChallengesPage();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة التحديات:', error);
        container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <i class="fas fa-gamepad"></i>
                    التحديات
                </h1>
            </div>
            <div class="error-section">
                <i class="fas fa-exclamation-triangle"></i>
                <p>حدث خطأ في تحميل التحديات</p>
                <button class="btn btn-primary" onclick="loadChallengesPage()">إعادة المحاولة</button>
            </div>
        `;
    }
}

function renderChallengesPage() {
    const container = document.getElementById('challenges-page');
    if (!container) return;
    
    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-gamepad"></i>
                التحديات
            </h1>
            <div class="header-actions">
                <button class="btn btn-outline" id="create-challenge">
                    <i class="fas fa-plus"></i> إنشاء تحدٍ
                </button>
                <button class="btn btn-refresh" id="refresh-challenges">
                    <i class="fas fa-sync-alt"></i>
                </button>
            </div>
        </div>
        
        <div class="challenges-container">
            <div class="challenge-category">
                <h2><i class="fas fa-user"></i> التحديات الفردية</h2>
                <p>تدرب على مهاراتك بنفسك</p>
                <div class="challenges-list" id="individual-challenges">
                    ${AppState.challenges.filter(c => c.type === 'individual').map(challenge => `
                        <div class="challenge-item" data-id="${challenge.id}">
                            <div class="challenge-header">
                                <div>
                                    <div class="challenge-title">${challenge.creatorName || 'مجهول'}</div>
                                    <div class="challenge-type-badge">فردي</div>
                                </div>
                                <div class="challenge-status ${challenge.status}">${challenge.status === 'waiting' ? 'بانتظار اللاعبين' : 'جاري'}</div>
                            </div>
                            
                            <div class="challenge-details">
                                <span><i class="fas fa-question-circle"></i> ${challenge.settings?.questionCount || 10} أسئلة</span>
                                <span><i class="fas fa-clock"></i> ${formatTime(challenge.settings?.timeLimit || 300)}</span>
                                <span><i class="fas fa-star"></i> ${challenge.settings?.difficulty === 'mixed' ? 'مختلط' : challenge.settings?.difficulty || 'متوسط'}</span>
                            </div>
                            
                            <button class="btn btn-primary join-challenge-btn" data-id="${challenge.id}">
                                ${challenge.status === 'waiting' ? 'الانضمام' : 'مشاهدة'}
                            </button>
                        </div>
                    `).join('')}
                    
                    ${AppState.challenges.filter(c => c.type === 'individual').length === 0 ? `
                        <div class="empty-challenge">
                            <i class="fas fa-user"></i>
                            <p>لا توجد تحديات فردية حالياً</p>
                            <button class="btn btn-outline create-individual-challenge">أنشئ تحدياً فردياً</button>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="challenge-category">
                <h2><i class="fas fa-users"></i> التحديات الجماعية</h2>
                <p>تحدى أصدقاءك ولاعبين آخرين</p>
                <div class="challenges-list" id="multiplayer-challenges">
                    ${AppState.challenges.filter(c => c.type !== 'individual').map(challenge => `
                        <div class="challenge-item" data-id="${challenge.id}">
                            <div class="challenge-header">
                                <div>
                                    <div class="challenge-title">${challenge.creatorName || 'مجهول'}</div>
                                    <div class="challenge-type-badge">${getChallengeTypeName(challenge.type)}</div>
                                </div>
                                <div class="challenge-players-count">
                                    <i class="fas fa-users"></i>
                                    <span>${challenge.players?.length || 1}/${challenge.maxPlayers || 4}</span>
                                </div>
                            </div>
                            
                            <div class="challenge-details">
                                <span><i class="fas fa-question-circle"></i> ${challenge.settings?.questionCount || 10} أسئلة</span>
                                <span><i class="fas fa-clock"></i> ${formatTime(challenge.settings?.timeLimit || 300)}</span>
                            </div>
                            
                            <div class="challenge-players">
                                ${challenge.players?.slice(0, 3).map(playerId => `
                                    <div class="player-avatar">${playerId.substring(0, 1).toUpperCase()}</div>
                                `).join('')}
                                ${(challenge.players?.length || 0) > 3 ? `
                                    <div class="more-players">+${(challenge.players?.length || 0) - 3}</div>
                                ` : ''}
                            </div>
                            
                            <button class="btn btn-primary join-challenge-btn" data-id="${challenge.id}">
                                ${challenge.status === 'waiting' ? 'الانضمام' : 'مشاهدة'}
                            </button>
                        </div>
                    `).join('')}
                    
                    ${AppState.challenges.filter(c => c.type !== 'individual').length === 0 ? `
                        <div class="empty-challenge">
                            <i class="fas fa-users"></i>
                            <p>لا توجد تحديات جماعية حالياً</p>
                            <button class="btn btn-outline create-multiplayer-challenge">أنشئ تحدياً جماعياً</button>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
        
        <div class="quick-actions-challenges">
            <h3>ابدأ تحدياً سريعاً</h3>
            <div class="quick-challenge-options">
                <button class="quick-challenge-btn" data-type="individual">
                    <i class="fas fa-user"></i>
                    <span>فردي</span>
                </button>
                <button class="quick-challenge-btn" data-type="speed">
                    <i class="fas fa-bolt"></i>
                    <span>السرعة</span>
                </button>
                <button class="quick-challenge-btn" data-type="time">
                    <i class="fas fa-clock"></i>
                    <span>الوقت</span>
                </button>
                <button class="quick-challenge-btn" data-type="comprehensive">
                    <i class="fas fa-crown"></i>
                    <span>شامل</span>
                </button>
            </div>
        </div>
    `;
    
    // إضافة مستمعات الأحداث
    document.getElementById('create-challenge')?.addEventListener('click', () => {
        showCreateChallengeModal();
    });
    
    document.getElementById('refresh-challenges')?.addEventListener('click', () => {
        loadChallengesPage();
    });
    
    document.querySelectorAll('.join-challenge-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const challengeId = this.dataset.id;
            joinChallenge(challengeId);
        });
    });
    
    document.querySelectorAll('.quick-challenge-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            createChallenge(type);
        });
    });
    
    document.querySelector('.create-individual-challenge')?.addEventListener('click', () => {
        createChallenge('individual');
    });
    
    document.querySelector('.create-multiplayer-challenge')?.addEventListener('click', () => {
        createChallenge('speed');
    });
}

// دالة تحميل صفحة الملف الشخصي
async function loadProfilePage() {
    const container = document.getElementById('profile-page');
    if (!container) return;
    
    const user = AppState.userData;
    if (!user) return;
    
    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-user-circle"></i>
                الملف الشخصي
            </h1>
            <button class="btn btn-outline" id="edit-profile">
                <i class="fas fa-edit"></i> تعديل الملف
            </button>
        </div>
        
        <div class="profile-container">
            <div class="profile-header">
                <div class="profile-avatar-large">
                    ${user.name?.charAt(0) || '?'}
                </div>
                <div class="profile-info">
                    <h2>${user.name || 'مستخدم'}</h2>
                    <p class="username">@${user.username || 'بدون'}</p>
                    <div class="profile-stats">
                        <div class="stat">
                            <div class="stat-value">#${user.rank || 0}</div>
                            <div class="stat-label">الترتيب</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${user.level || 1}</div>
                            <div class="stat-label">المستوى</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${user.points || 0}</div>
                            <div class="stat-label">النقاط</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="profile-content">
                <div class="profile-section">
                    <h3><i class="fas fa-trophy"></i> الإنجازات</h3>
                    <div class="achievements-preview">
                        ${(user.achievements || []).slice(0, 6).map(achievement => `
                            <div class="achievement-badge">
                                <i class="fas fa-medal"></i>
                                <span>${achievement}</span>
                            </div>
                        `).join('')}
                        ${(user.achievements || []).length === 0 ? `
                            <p class="empty-state">لا توجد إنجازات بعد</p>
                        ` : ''}
                    </div>
                </div>
                
                <div class="profile-section">
                    <h3><i class="fas fa-history"></i> الإحصائيات</h3>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-gamepad"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value">${user.matches || 0}</div>
                                <div class="stat-label">المباريات</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value">${user.wins || 0}</div>
                                <div class="stat-label">الانتصارات</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value">${user.wins && user.matches ? Math.round((user.wins / user.matches) * 100) : 0}%</div>
                                <div class="stat-label">معدل الفوز</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-fire"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value">${user.streak || 0}</div>
                                <div class="stat-label">سلسلة الانتصارات</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('edit-profile')?.addEventListener('click', () => {
        showToast('قريباً', 'ميزة تعديل الملف الشخصي قريباً', 'info');
    });
}

// دالة تحميل صفحة المساعدة
function loadHelpPage() {
    const container = document.getElementById('help-page');
    if (!container) return;
    
    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-question-circle"></i>
                المساعدة والدعم
            </h1>
        </div>
        
        <div class="help-container">
            <div class="help-content">
                <div class="help-section">
                    <h3><i class="fas fa-gamepad"></i> كيفية اللعب</h3>
                    <div class="help-steps">
                        <div class="step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h4>أنشئ حساباً</h4>
                                <p>سجل دخولك أو أنشئ حساباً جديداً للبدء</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h4>اختر تحدياً</h4>
                                <p>اختر من بين التحديات الفردية أو الجماعية</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h4>اجب على الأسئلة</h4>
                                <p>اختر الإجابة الصحيحة قبل انتهاء الوقت</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <h4>اربح النقاط</h4>
                                <p>اجمع النقاط وارفع مستواك في التصنيف</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="help-section">
                    <h3><i class="fas fa-question-circle"></i> الأسئلة الشائعة</h3>
                    <div class="faq-list">
                        <div class="faq-item">
                            <div class="faq-question">
                                <h4>كيف أحصل على المزيد من النقاط؟</h4>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div class="faq-answer">
                                <p>يمكنك الحصول على النقاط من خلال:</p>
                                <ul>
                                    <li>الفوز في التحديات</li>
                                    <li>الإجابة الصحيحة بسرعة</li>
                                    <li>إكمال الإنجازات</li>
                                    <li>المشاركة في البطولات</li>
                                </ul>
                            </div>
                        </div>
                        <div class="faq-item">
                            <div class="faq-question">
                                <h4>كيف أدعو أصدقائي؟</h4>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div class="faq-answer">
                                <p>يمكنك دعوة أصدقائك من خلال:</p>
                                <ol>
                                    <li>الذهاب إلى صفحة الأصدقاء</li>
                                    <li>البحث عن أصدقائك</li>
                                    <li>إرسال طلب صداقة</li>
                                    <li>تحديهم بعد قبول الطلب</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="help-section">
                    <h3><i class="fas fa-headset"></i> الدعم الفني</h3>
                    <div class="support-options">
                        <div class="support-card">
                            <i class="fas fa-envelope"></i>
                            <h4>البريد الإلكتروني</h4>
                            <p>support@quizmasters.com</p>
                        </div>
                        <div class="support-card">
                            <i class="fas fa-comments"></i>
                            <h4>الدردشة الحية</h4>
                            <p>متاحة 24/7</p>
                        </div>
                        <div class="support-card">
                            <i class="fas fa-file-alt"></i>
                            <h4>التوثيق</h4>
                            <p>الدليل الكامل</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إضافة تفاعل للأسئلة الشائعة
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            this.querySelector('i').classList.toggle('fa-chevron-up');
            this.querySelector('i').classList.toggle('fa-chevron-down');
        });
    });
}

// وأضف دالة checkAuthState إذا لم تكن موجودة
function checkAuthState() {
    auth.onAuthStateChanged(user => {
        if (user) {
            AppState.currentUser = user;
            loadUserData(user.uid);
            showApp();
        } else {
            showAuth();
        }
    });
}

// فئة إدارة اللعبة
class GameManager {
    constructor() {
        this.currentGame = null;
        this.gameTimer = null;
        this.questionTimer = null;
        this.players = {};
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.selectedAnswer = null;
    }

    async startChallenge(challengeId) {
        try {
            const challengeDoc = await db.collection('challenges').doc(challengeId).get();
            if (!challengeDoc.exists) {
                throw new Error('التحدي غير موجود');
            }

            this.currentGame = {
                id: challengeId,
                ...challengeDoc.data()
            };

            await this.loadQuestionsForChallenge();
            this.setupPlayers();
            this.showGameInterface();

        } catch (error) {
            console.error('خطأ في بدء التحدي:', error);
            showToast('خطأ', 'فشل في بدء التحدي', 'error');
        }
    }

    async loadQuestionsForChallenge() {
        const { settings } = this.currentGame;
        let query = db.collection('questions');

        if (settings.difficulty !== 'mixed') {
            query = query.where('difficulty', '==', settings.difficulty);
        }

        const snapshot = await query.limit(settings.questionCount).get();
        this.questions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        this.shuffleArray(this.questions);
    }

    setupPlayers() {
        this.currentGame.players.forEach(playerId => {
            this.players[playerId] = {
                score: 0,
                correctAnswers: 0,
                totalTime: 0,
                answered: false,
                answerTime: null
            };
        });
    }

    showGameInterface() {
        document.getElementById('main-content').style.display = 'none';
        const gameWindow = document.getElementById('challenge-window');
        gameWindow.style.display = 'flex';

        const container = document.querySelector('.challenge-container');
        container.innerHTML = this.createGameUI();

        this.setupGameEventListeners();
        this.startMainTimer();
        this.showQuestion(0);
    }

    createGameUI() {
        const { type, settings, players } = this.currentGame;

        return `
            <div class="game-header">
                <div class="game-info">
                    <h2>${this.getChallengeTypeName(type)}</h2>
                    <div class="game-stats">
                        <span><i class="fas fa-users"></i> ${players.length} لاعب</span>
                        <span><i class="fas fa-question-circle"></i> ${settings.questionCount} سؤال</span>
                        <span><i class="fas fa-clock"></i> ${this.formatTime(settings.timeLimit)}</span>
                    </div>
                </div>
                <div class="game-timer">
                    <div class="timer-display" id="main-timer">${this.formatTime(settings.timeLimit)}</div>
                </div>
            </div>
            
            <div class="game-content">
                <div class="players-scoreboard" id="players-scoreboard">
                    ${this.createScoreboard()}
                </div>
                
                <div class="question-container">
                    <div class="question-header">
                        <div class="question-number">السؤال <span id="current-question">1</span>/${this.questions.length}</div>
                        <div class="question-timer">
                            <i class="fas fa-clock"></i>
                            <span id="question-timer">30</span> ثانية
                        </div>
                    </div>
                    
                    <div class="question-body">
                        <div class="question-text" id="question-text">
                            جاري تحميل السؤال...
                        </div>
                        
                        <div class="question-image" id="question-image" style="display: none;">
                            <img src="" alt="صورة السؤال">
                        </div>
                        
                        <div class="answers-container" id="answers-container">
                            <!-- سيتم ملء الإجابات ديناميكياً -->
                        </div>
                    </div>
                    
                    <div class="question-actions">
                        <button class="btn btn-secondary" id="skip-question">تخطي</button>
                        <button class="btn btn-primary" id="submit-answer" disabled>تأكيد الإجابة</button>
                    </div>
                </div>
            </div>
            
            <div class="game-footer">
                <button class="btn btn-danger" id="leave-game">إنهاء التحدي</button>
            </div>
        `;
    }

    createScoreboard() {
        let html = '';
        let index = 0;

        Object.entries(this.players).forEach(([playerId, data]) => {
            const playerName = this.getPlayerName(playerId);
            html += `
                <div class="player-score" data-player="${playerId}">
                    <div class="player-rank">${index + 1}</div>
                    <div class="player-avatar">${playerName.charAt(0)}</div>
                    <div class="player-info">
                        <div class="player-name">${playerName}</div>
                        <div class="player-stats">
                            <span class="score">${data.score} نقطة</span>
                            <span class="answers">${data.correctAnswers} إجابة</span>
                        </div>
                    </div>
                    <div class="player-status ${data.answered ? 'answered' : 'waiting'}">
                        ${data.answered ? 'أجاب' : 'ينتظر'}
                    </div>
                </div>
            `;
            index++;
        });

        return html;
    }

    setupGameEventListeners() {
        document.getElementById('skip-question').addEventListener('click', () => this.skipQuestion());
        document.getElementById('submit-answer').addEventListener('click', () => this.submitAnswer());
        document.getElementById('leave-game').addEventListener('click', () => this.leaveGame());
    }

    startMainTimer() {
        const { timeLimit } = this.currentGame.settings;
        let timeLeft = timeLimit;

        this.gameTimer = setInterval(() => {
            timeLeft--;
            document.getElementById('main-timer').textContent = this.formatTime(timeLeft);

            if (timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    showQuestion(index) {
        this.currentQuestionIndex = index;
        const question = this.questions[index];

        if (!question) {
            this.endGame();
            return;
        }

        document.getElementById('current-question').textContent = index + 1;
        document.getElementById('question-text').textContent = question.text;

        if (question.image) {
            const imgContainer = document.getElementById('question-image');
            const img = imgContainer.querySelector('img');
            img.src = question.image;
            imgContainer.style.display = 'block';
        }

        this.displayAnswers(question);
        this.startQuestionTimer(question.time || 30);
        this.selectedAnswer = null;
        document.getElementById('submit-answer').disabled = true;
        this.resetPlayersAnswerStatus();
    }

    displayAnswers(question) {
        const container = document.getElementById('answers-container');
        container.innerHTML = '';

        const answers = [
            { text: question.correctAnswer, isCorrect: true },
            { text: question.wrongAnswer1, isCorrect: false },
            { text: question.wrongAnswer2, isCorrect: false },
            { text: question.wrongAnswer3, isCorrect: false }
        ];

        this.shuffleArray(answers);

        answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer.text;
            button.dataset.index = index;
            button.dataset.correct = answer.isCorrect;

            button.addEventListener('click', () => this.selectAnswer(button, answer.isCorrect));
            container.appendChild(button);
        });
    }

    startQuestionTimer(timeLimit) {
        let timeLeft = timeLimit;
        document.getElementById('question-timer').textContent = timeLeft;

        if (this.questionTimer) {
            clearInterval(this.questionTimer);
        }

        this.questionTimer = setInterval(() => {
            timeLeft--;
            document.getElementById('question-timer').textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(this.questionTimer);
                this.handleTimeUp();
            }
        }, 1000);
    }

    selectAnswer(button, isCorrect) {
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.classList.remove('selected');
        });

        button.classList.add('selected');
        this.selectedAnswer = { button, isCorrect };
        document.getElementById('submit-answer').disabled = false;
    }

    submitAnswer() {
        if (!this.selectedAnswer) return;

        const { button, isCorrect } = this.selectedAnswer;
        const playerId = AppState.currentUser.uid;
        const questionTime = parseInt(document.getElementById('question-timer').textContent);

        let points = 0;
        if (isCorrect) {
            const question = this.questions[this.currentQuestionIndex];
            const basePoints = APP_CONSTANTS.DIFFICULTY_POINTS[question.difficulty] || 10;
            points = basePoints + questionTime;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
            document.querySelectorAll('.answer-btn').forEach(btn => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                }
            });
        }

        this.players[playerId].answered = true;
        this.players[playerId].answerTime = questionTime;

        if (isCorrect) {
            this.players[playerId].score += points;
            this.players[playerId].correctAnswers++;
        }

        this.updateScoreboard();
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });
        document.getElementById('submit-answer').disabled = true;

        setTimeout(() => {
            this.nextQuestion();
        }, 3000);
    }

    skipQuestion() {
        this.nextQuestion();
    }

    nextQuestion() {
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion(this.currentQuestionIndex);
        } else {
            this.endGame();
        }
    }

    handleTimeUp() {
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
            }
        });

        setTimeout(() => {
            this.nextQuestion();
        }, 3000);
    }

    async endGame() {
        clearInterval(this.gameTimer);
        clearInterval(this.questionTimer);

        const winner = this.calculateWinner();
        await this.saveGameResults(winner);
        this.showResults(winner);

        if (AppState.currentUser) {
            loadUserData(AppState.currentUser.uid);
        }
    }

    calculateWinner() {
        let winner = null;
        let maxScore = -1;

        Object.entries(this.players).forEach(([playerId, data]) => {
            if (data.score > maxScore) {
                maxScore = data.score;
                winner = { playerId, ...data };
            }
        });

        return winner;
    }

    async saveGameResults(winner) {
        try {
            const gameData = {
                challengeId: this.currentGame.id,
                type: this.currentGame.type,
                players: this.players,
                winner: winner.playerId,
                winnerScore: winner.score,
                questionsCount: this.questions.length,
                duration: this.currentGame.settings.timeLimit,
                completedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await db.collection('matches').add(gameData);
            await this.updatePlayersStats(winner.playerId);

        } catch (error) {
            console.error('خطأ في حفظ نتائج اللعبة:', error);
        }
    }

    async updatePlayersStats(winnerId) {
        const batch = db.batch();

        Object.keys(this.players).forEach(playerId => {
            const playerRef = db.collection('users').doc(playerId);
            const playerData = this.players[playerId];

            const updates = {
                matches: firebase.firestore.FieldValue.increment(1),
                points: firebase.firestore.FieldValue.increment(playerData.score),
                xp: firebase.firestore.FieldValue.increment(playerData.correctAnswers * 10)
            };

            if (playerId === winnerId) {
                updates.wins = firebase.firestore.FieldValue.increment(1);
                updates.streak = firebase.firestore.FieldValue.increment(1);
            }

            batch.update(playerRef, updates);
        });

        await batch.commit();
    }

    showResults(winner) {
        const container = document.querySelector('.challenge-container');
        container.innerHTML = `
            <div class="results-container">
                <div class="results-header">
                    <h2>انتهى التحدي!</h2>
                    <p>إليك النتائج النهائية</p>
                </div>
                
                <div class="winner-section">
                    <div class="winner-crown">
                        <i class="fas fa-crown"></i>
                    </div>
                    <div class="winner-avatar">${this.getPlayerName(winner.playerId).charAt(0)}</div>
                    <div class="winner-info">
                        <h3>${this.getPlayerName(winner.playerId)}</h3>
                        <p>الفائز بالتحدي</p>
                    </div>
                    <div class="winner-score">${winner.score} نقطة</div>
                </div>
                
                <div class="results-table">
                    <h3>الترتيب النهائي</h3>
                    <div class="players-results" id="players-results">
                        ${this.createResultsTable()}
                    </div>
                </div>
                
                <div class="results-actions">
                    <button class="btn btn-primary" id="play-again">لعب مرة أخرى</button>
                    <button class="btn btn-secondary" id="back-to-lobby">العودة للرئيسية</button>
                </div>
            </div>
        `;

        document.getElementById('play-again').addEventListener('click', () => {
            this.restartGame();
        });

        document.getElementById('back-to-lobby').addEventListener('click', () => {
            this.leaveGame();
        });
    }

    createResultsTable() {
        let html = '';

        const sortedPlayers = Object.entries(this.players)
            .sort(([, a], [, b]) => b.score - a.score);

        sortedPlayers.forEach(([playerId, data], index) => {
            html += `
                <div class="player-result ${index === 0 ? 'first' : ''}">
                    <div class="result-rank">${index + 1}</div>
                    <div class="result-avatar">${this.getPlayerName(playerId).charAt(0)}</div>
                    <div class="result-info">
                        <div class="result-name">${this.getPlayerName(playerId)}</div>
                        <div class="result-details">
                            ${data.correctAnswers} إجابة صحيحة
                        </div>
                    </div>
                    <div class="result-score">${data.score} نقطة</div>
                </div>
            `;
        });

        return html;
    }

    restartGame() {
        this.cleanup();
        this.startChallenge(this.currentGame.id);
    }

    leaveGame() {
        this.cleanup();
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('challenge-window').style.display = 'none';
        navigateTo('dashboard');
    }

    cleanup() {
        clearInterval(this.gameTimer);
        clearInterval(this.questionTimer);
        this.currentGame = null;
        this.players = {};
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.selectedAnswer = null;
    }

    // وظائف مساعدة
    getChallengeTypeName(type) {
        const names = {
            individual: 'التحدي الفردي',
            speed: 'تحدي السرعة',
            time: 'تحدي الوقت',
            comprehensive: 'التحدي الشامل'
        };
        return names[type] || type;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    getPlayerName(playerId) {
        if (playerId === AppState.currentUser?.uid) {
            return AppState.userData?.name || 'أنت';
        }
        return 'لاعب';
    }

    updateScoreboard() {
        const scoreboard = document.getElementById('players-scoreboard');
        if (scoreboard) {
            scoreboard.innerHTML = this.createScoreboard();
        }
    }

    resetPlayersAnswerStatus() {
        Object.keys(this.players).forEach(playerId => {
            this.players[playerId].answered = false;
            this.players[playerId].answerTime = null;
        });
        this.updateScoreboard();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

// فئة إدارة لوحة المشرف
class AdminPanel {
    constructor() {
        this.currentTab = 'questions';
        this.questions = [];
        this.users = [];
        this.reports = [];
        this.currentQuestion = null;
        this.editingQuestion = false;
    }

    async loadAdminData() {
        try {
            await Promise.all([
                this.loadQuestions(),
                this.loadUsers(),
                this.loadReports(),
                this.loadSystemStats()
            ]);

            this.setupEventListeners();
            this.renderQuestionsTable();

        } catch (error) {
            console.error('خطأ في تحميل بيانات المشرف:', error);
            showToast('خطأ', 'فشل في تحميل بيانات المشرف', 'error');
        }
    }

    async loadQuestions() {
        const snapshot = await db.collection('questions')
            .orderBy('createdAt', 'desc')
            .limit(100)
            .get();

        this.questions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    async loadUsers() {
        const snapshot = await db.collection('users')
            .orderBy('createdAt', 'desc')
            .limit(100)
            .get();

        this.users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    async loadReports() {
        const snapshot = await db.collection('reports')
            .where('status', '==', 'pending')
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();

        this.reports = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    async loadSystemStats() {
        const usersCount = await db.collection('users').get();
        const questionsCount = await db.collection('questions').get();
        const matchesCount = await db.collection('matches').get();

        document.getElementById('total-users').textContent = usersCount.size;
        document.getElementById('total-questions').textContent = questionsCount.size;
        document.getElementById('total-matches').textContent = matchesCount.size;
        document.getElementById('active-now').textContent = Math.floor(usersCount.size * 0.1);
    }

    setupEventListeners() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        document.getElementById('add-question-btn')?.addEventListener('click', () => this.showQuestionForm());
        document.getElementById('save-question')?.addEventListener('click', () => this.saveQuestion());
        document.getElementById('cancel-question')?.addEventListener('click', () => this.hideQuestionForm());
        document.getElementById('close-question-modal')?.addEventListener('click', () => this.hideQuestionForm());

        document.getElementById('question-search')?.addEventListener('input', (e) => this.filterQuestions(e.target.value));
        document.getElementById('question-category-filter')?.addEventListener('change', (e) => this.filterByCategory(e.target.value));
        document.getElementById('question-difficulty-filter')?.addEventListener('change', (e) => this.filterByDifficulty(e.target.value));

        document.getElementById('user-search')?.addEventListener('input', (e) => this.filterUsers(e.target.value));
        document.getElementById('user-role-filter')?.addEventListener('change', (e) => this.filterByRole(e.target.value));
    }

    switchTab(tab) {
        this.currentTab = tab;

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tab}-tab`);
        });

        switch (tab) {
            case 'users':
                this.renderUsersTable();
                break;
            case 'reports':
                this.renderReports();
                break;
        }
    }

    showQuestionForm(question = null) {
        this.currentQuestion = question;
        this.editingQuestion = !!question;

        const modal = document.getElementById('question-modal');
        const title = document.getElementById('modal-title');
        const form = document.getElementById('question-form');

        if (question) {
            title.textContent = 'تعديل السؤال';
            document.getElementById('question-text').value = question.text;
            document.getElementById('question-category').value = question.category;
            document.getElementById('question-difficulty').value = question.difficulty;
            document.getElementById('question-time').value = question.time || 30;
            document.getElementById('correct-answer').value = question.correctAnswer;
            document.getElementById('wrong-answer-1').value = question.wrongAnswer1;
            document.getElementById('wrong-answer-2').value = question.wrongAnswer2;
            document.getElementById('wrong-answer-3').value = question.wrongAnswer3;
            document.getElementById('question-image').value = question.image || '';
            document.getElementById('question-explanation').value = question.explanation || '';
        } else {
            title.textContent = 'إضافة سؤال جديد';
            form.reset();
        }

        modal.classList.add('show');
    }

    hideQuestionForm() {
        document.getElementById('question-modal').classList.remove('show');
        this.currentQuestion = null;
        this.editingQuestion = false;
    }

    async saveQuestion() {
        try {
            const form = document.getElementById('question-form');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const questionData = {
                text: document.getElementById('question-text').value,
                category: document.getElementById('question-category').value,
                difficulty: document.getElementById('question-difficulty').value,
                time: parseInt(document.getElementById('question-time').value),
                correctAnswer: document.getElementById('correct-answer').value,
                wrongAnswer1: document.getElementById('wrong-answer-1').value,
                wrongAnswer2: document.getElementById('wrong-answer-2').value,
                wrongAnswer3: document.getElementById('wrong-answer-3').value,
                image: document.getElementById('question-image').value || null,
                explanation: document.getElementById('question-explanation').value || null,
                points: APP_CONSTANTS.DIFFICULTY_POINTS[document.getElementById('question-difficulty').value] || 10,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: AppState.currentUser.uid
            };

            if (this.editingQuestion && this.currentQuestion) {
                await db.collection('questions').doc(this.currentQuestion.id).update(questionData);
                showToast('تم التحديث', 'تم تحديث السؤال بنجاح', 'success');
            } else {
                await db.collection('questions').add(questionData);
                showToast('تم الإضافة', 'تم إضافة السؤال بنجاح', 'success');
            }

            await this.loadQuestions();
            this.renderQuestionsTable();
            this.hideQuestionForm();

        } catch (error) {
            console.error('خطأ في حفظ السؤال:', error);
            showAlert('خطأ في حفظ السؤال: ' + error.message, 'error');
        }
    }

    filterQuestions(searchTerm) {
        const filtered = this.questions.filter(question =>
            question.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            question.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.renderQuestionsTable(filtered);
    }

    filterByCategory(category) {
        if (!category) {
            this.renderQuestionsTable();
            return;
        }

        const filtered = this.questions.filter(question =>
            question.category === category
        );

        this.renderQuestionsTable(filtered);
    }

    filterByDifficulty(difficulty) {
        if (!difficulty) {
            this.renderQuestionsTable();
            return;
        }

        const filtered = this.questions.filter(question =>
            question.difficulty === difficulty
        );

        this.renderQuestionsTable(filtered);
    }

    renderQuestionsTable(questions = this.questions) {
        const tbody = document.getElementById('questions-table-body');
        if (!tbody) return;

        tbody.innerHTML = '';

        questions.forEach((question, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${question.text.substring(0, 50)}${question.text.length > 50 ? '...' : ''}</td>
                <td>
                    <span class="category-badge ${question.category}">
                        ${this.getCategoryName(question.category)}
                    </span>
                </td>
                <td>
                    <span class="difficulty-badge ${question.difficulty}">
                        ${this.getDifficultyName(question.difficulty)}
                    </span>
                </td>
                <td>4</td>
                <td>${question.correctAnswer.substring(0, 20)}${question.correctAnswer.length > 20 ? '...' : ''}</td>
                <td>${question.time || 30}</td>
                <td>${this.formatDate(question.createdAt?.toDate())}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn edit" onclick="admin.editQuestion('${question.id}')">
                            <i class="fas fa-edit"></i> تعديل
                        </button>
                        <button class="action-btn delete" onclick="admin.deleteQuestion('${question.id}')">
                            <i class="fas fa-trash"></i> حذف
                        </button>
                    </div>
                </td>
            `;

            tbody.appendChild(row);
        });
    }

    async editQuestion(questionId) {
        try {
            const doc = await db.collection('questions').doc(questionId).get();
            if (doc.exists) {
                this.showQuestionForm({ id: doc.id, ...doc.data() });
            }
        } catch (error) {
            console.error('خطأ في تحميل السؤال:', error);
            showToast('خطأ', 'فشل في تحميل بيانات السؤال', 'error');
        }
    }

    async deleteQuestion(questionId) {
        if (confirm('هل أنت متأكد من حذف هذا السؤال؟ لا يمكن التراجع عن هذا الإجراء.')) {
            try {
                await db.collection('questions').doc(questionId).delete();
                showToast('تم الحذف', 'تم حذف السؤال بنجاح', 'success');

                await this.loadQuestions();
                this.renderQuestionsTable();

            } catch (error) {
                console.error('خطأ في حذف السؤال:', error);
                showToast('خطأ', 'فشل في حذف السؤال', 'error');
            }
        }
    }

    filterUsers(searchTerm) {
        const filtered = this.users.filter(user =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.renderUsersTable(filtered);
    }

    filterByRole(role) {
        if (!role) {
            this.renderUsersTable();
            return;
        }

        const filtered = this.users.filter(user => {
            if (role === 'admin') return user.isAdmin;
            if (role === 'moderator') return user.isModerator;
            return !user.isAdmin && !user.isModerator;
        });

        this.renderUsersTable(filtered);
    }

    renderUsersTable(users = this.users) {
        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;

        tbody.innerHTML = '';

        users.forEach((user, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>
                    <div class="user-cell">
                        <div class="user-avatar-small">${user.name?.charAt(0) || '?'}</div>
                        <div class="user-details">
                            <div class="user-name">${user.name || 'بدون اسم'}</div>
                            <div class="user-username">@${user.username || 'بدون'}</div>
                        </div>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${user.level || 1}</td>
                <td>${user.points || 0}</td>
                <td>
                    <span class="role-badge ${user.isAdmin ? 'admin' : user.isModerator ? 'moderator' : 'user'}">
                        ${user.isAdmin ? 'مشرف' : user.isModerator ? 'مراقب' : 'لاعب'}
                    </span>
                </td>
                <td>${this.formatDate(user.createdAt?.toDate())}</td>
                <td>
                    <span class="status-badge ${user.isOnline ? 'online' : 'offline'}">
                        ${user.isOnline ? 'متصل' : 'غير متصل'}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn edit" onclick="admin.editUser('${user.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${!user.isAdmin ? `
                            <button class="action-btn ${user.isModerator ? 'demote' : 'promote'}"
                                onclick="admin.toggleModerator('${user.id}', ${user.isModerator})">
                                <i class="fas fa-${user.isModerator ? 'arrow-down' : 'arrow-up'}"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            `;

            tbody.appendChild(row);
        });
    }

    async toggleModerator(userId, isCurrentlyModerator) {
        try {
            await db.collection('users').doc(userId).update({
                isModerator: !isCurrentlyModerator,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            showToast('تم التحديث', `تم ${isCurrentlyModerator ? 'إلغاء صلاحية' : 'منح صلاحية'} المراقب`, 'success');
            await this.loadUsers();
            this.renderUsersTable();

        } catch (error) {
            console.error('خطأ في تغيير الصلاحية:', error);
            showToast('خطأ', 'فشل في تغيير الصلاحية', 'error');
        }
    }

    renderReports() {
        const container = document.getElementById('pending-reports');
        if (!container) return;

        container.innerHTML = '';

        this.reports.forEach(report => {
            const reportElement = document.createElement('div');
            reportElement.className = 'report-item';

            reportElement.innerHTML = `
                <div class="report-header">
                    <div class="report-type">${this.getReportTypeName(report.type)}</div>
                    <div class="report-date">${this.formatDate(report.createdAt?.toDate())}</div>
                </div>
                <div class="report-content">
                    <p>${report.description}</p>
                </div>
                <div class="report-actions">
                    <button class="btn btn-sm btn-primary" onclick="admin.resolveReport('${report.id}')">
                        معالجة
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="admin.ignoreReport('${report.id}')">
                        تجاهل
                    </button>
                </div>
            `;

            container.appendChild(reportElement);
        });
    }

    async resolveReport(reportId) {
        try {
            await db.collection('reports').doc(reportId).update({
                status: 'resolved',
                resolvedAt: firebase.firestore.FieldValue.serverTimestamp(),
                resolvedBy: AppState.currentUser.uid
            });

            showToast('تمت المعالجة', 'تم معالجة التقرير بنجاح', 'success');
            await this.loadReports();
            this.renderReports();

        } catch (error) {
            console.error('خطأ في معالجة التقرير:', error);
            showToast('خطأ', 'فشل في معالجة التقرير', 'error');
        }
    }

    async ignoreReport(reportId) {
        try {
            await db.collection('reports').doc(reportId).update({
                status: 'ignored',
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            showToast('تم التجاهل', 'تم تجاهل التقرير', 'info');
            await this.loadReports();
            this.renderReports();

        } catch (error) {
            console.error('خطأ في تجاهل التقرير:', error);
            showToast('خطأ', 'فشل في تجاهل التقرير', 'error');
        }
    }

    // وظائف مساعدة
    getCategoryName(category) {
        const names = {
            science: 'العلوم',
            history: 'التاريخ',
            geography: 'الجغرافيا',
            sports: 'الرياضة',
            art: 'الفن',
            entertainment: 'الترفيه',
            technology: 'التكنولوجيا',
            general: 'عامة'
        };
        return names[category] || category;
    }

    getDifficultyName(difficulty) {
        const names = {
            easy: 'سهل',
            medium: 'متوسط',
            hard: 'صعب'
        };
        return names[difficulty] || difficulty;
    }

    getReportTypeName(type) {
        const names = {
            user: 'مستخدم',
            question: 'سؤال',
            bug: 'خلل',
            suggestion: 'اقتراح',
            other: 'أخرى'
        };
        return names[type] || type;
    }

    formatDate(date) {
        if (!date) return 'غير محدد';
        return date.toLocaleDateString('ar-EG');
    }
}

// إنشاء مثيلات الكلاسات
const game = new GameManager();
const admin = new AdminPanel();

// وظائف عامة
async function checkUsernameExists(username) {
    const snapshot = await db.collection('users').where('username', '==', username).get();
    return !snapshot.empty;
}

async function addNotification(userId, notification) {
    try {
        await db.collection('notifications').add({
            userId: userId,
            ...notification,
            read: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('خطأ في إضافة الإشعار:', error);
    }
}

function getXPForLevel(level) {
    const levelData = APP_CONSTANTS.LEVELS.find(l => l.level === level);
    return levelData ? levelData.xp : level * 100;
}

function formatDate(dateString) {
    if (!dateString) return 'غير محدد';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// عرض التنبيهات
function showAlert(message, type = 'error') {
    const alertDiv = document.getElementById('auth-alert');
    if (!alertDiv) return;

    alertDiv.textContent = message;
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.display = 'flex';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-alert';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => alertDiv.style.display = 'none';
    alertDiv.appendChild(closeBtn);
}

function hideAlert() {
    const alertDiv = document.getElementById('auth-alert');
    if (alertDiv) {
        alertDiv.style.display = 'none';
    }
}

function showToast(title, message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? 'check-circle' :
        type === 'error' ? 'exclamation-circle' : 'info-circle';

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${icon}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="close-toast">&times;</button>
    `;

    toastContainer.appendChild(toast);

    toast.querySelector('.close-toast').addEventListener('click', () => {
        toast.remove();
    });

    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);
}

// إدارة المصادقة
async function loginUser(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        AppState.currentUser = userCredential.user;
        showToast('مرحباً بعودتك!', 'تم تسجيل الدخول بنجاح', 'success');
        return true;
    } catch (error) {
        showAlert('خطأ في تسجيل الدخول: ' + error.message, 'error');
        return false;
    }
}

async function registerUser(email, password, name, username) {
    try {
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            showAlert('اسم المستخدم مستخدم مسبقاً، الرجاء اختيار اسم آخر', 'error');
            return false;
        }

        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        const userData = {
            uid: user.uid,
            email: email,
            name: name,
            username: username,
            level: 1,
            xp: 0,
            points: 0,
            matches: 0,
            wins: 0,
            rank: 9999,
            streak: 0,
            bestStreak: 0,
            achievements: [],
            friends: [],
            notifications: [],
            settings: {
                sound: true,
                music: true,
                notifications: true,
                language: 'ar',
                theme: 'light'
            },
            isAdmin: email === 'ahmadfayed790@gmail.com',
            isModerator: false,
            isOnline: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('users').doc(user.uid).set(userData);

        await addNotification(user.uid, {
            type: 'welcome',
            title: 'مرحباً بك في Quiz Masters!',
            message: 'نتمنى لك وقتاً ممتعاً في تحدياتنا'
        });

        AppState.currentUser = user;
        showToast('مرحباً بك!', 'تم إنشاء حسابك بنجاح', 'success');
        return true;

    } catch (error) {
        showAlert('خطأ في إنشاء الحساب: ' + error.message, 'error');
        return false;
    }
}

async function handleLogout() {
    try {
        if (AppState.currentUser) {
            await db.collection('users').doc(AppState.currentUser.uid).update({
                isOnline: false,
                lastLogout: firebase.firestore.FieldValue.serverTimestamp()
            });
        }

        await auth.signOut();
        AppState.currentUser = null;
        AppState.userData = null;
        showToast('مع السلامة!', 'تم تسجيل الخروج بنجاح', 'info');
        showAuth();
    } catch (error) {
        showAlert('خطأ في تسجيل الخروج: ' + error.message, 'error');
    }
}

// تحميل بيانات المستخدم
async function loadUserData(uid) {
    try {
        const doc = await db.collection('users').doc(uid).get();
        if (doc.exists) {
            AppState.userData = doc.data();
            updateUIWithUserData();

            AppState.isAdmin = AppState.userData.isAdmin || false;
            if (AppState.isAdmin) {
                document.getElementById('admin-menu-item').style.display = 'flex';
            }

            await loadQuestions();
            await loadFriends();
            await loadNotifications();
            await loadLeaderboard();
            await loadTournaments();
        }
    } catch (error) {
        console.error('خطأ في تحميل بيانات المستخدم:', error);
    }
}

function updateUIWithUserData() {
    const user = AppState.userData;
    if (!user) return;

    // تحديث الهيدر
    document.getElementById('header-points').textContent = user.points || 0;
    document.getElementById('header-level').textContent = user.level || 1;
    document.getElementById('header-rank').textContent = `#${user.rank || 0}`;

    // تحديث الصور والاسماء
    const avatarElements = document.querySelectorAll('.user-avatar, #sidebar-avatar, #dropdown-avatar');
    avatarElements.forEach(el => {
        el.textContent = user.name ? user.name.charAt(0) : '?';
    });

    document.getElementById('dropdown-username').textContent = user.name || 'مستخدم';
    document.getElementById('sidebar-username').textContent = user.name || 'مستخدم';
    document.getElementById('dropdown-level').textContent = `المستوى ${user.level || 1}`;

    // تحديث شريط الخبرة
    const currentLevel = user.level || 1;
    const currentXP = user.xp || 0;
    const nextLevelXP = getXPForLevel(currentLevel + 1);
    const currentLevelXP = getXPForLevel(currentLevel);
    const xpNeeded = nextLevelXP - currentLevelXP;
    const xpInLevel = currentXP - currentLevelXP;
    const percentage = Math.min((xpInLevel / xpNeeded) * 100, 100);

    const xpProgress = document.getElementById('xp-progress');
    const xpText = document.getElementById('xp-text');
    if (xpProgress && xpText) {
        xpProgress.style.width = `${percentage}%`;
        xpText.textContent = `${xpInLevel}/${xpNeeded}`;
    }

    // تحديث الإحصائيات
    updateDashboardStats();
}

function updateDashboardStats() {
    const user = AppState.userData;
    if (!user) return;

    document.getElementById('stat-wins').textContent = user.wins || 0;
    document.getElementById('stat-points').textContent = user.points || 0;
    document.getElementById('stat-matches').textContent = user.matches || 0;
    document.getElementById('stat-rank').textContent = `#${user.rank || 0}`;
}

// تحميل البيانات
async function loadQuestions() {
    try {
        const snapshot = await db.collection('questions')
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();

        AppState.questions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        if (AppState.isAdmin && AppState.currentPage === 'admin') {
            admin.renderQuestionsTable();
        }
    } catch (error) {
        console.error('خطأ في تحميل الأسئلة:', error);
    }
}

async function loadFriends() {
    try {
        if (!AppState.currentUser) return;

        const userDoc = await db.collection('users').doc(AppState.currentUser.uid).get();
        const userData = userDoc.data();

        if (userData.friends && userData.friends.length > 0) {
            const friendsPromises = userData.friends.map(friendId =>
                db.collection('users').doc(friendId).get()
            );

            const friendsSnapshots = await Promise.all(friendsPromises);
            AppState.friends = friendsSnapshots
                .filter(snap => snap.exists)
                .map(snap => ({
                    id: snap.id,
                    ...snap.data()
                }));

            updateFriendsUI();
        }
    } catch (error) {
        console.error('خطأ في تحميل الأصدقاء:', error);
    }
}

function updateFriendsUI() {
    const onlineFriendsCount = AppState.friends.filter(f => f.isOnline).length;
    document.getElementById('online-friends-count').textContent = onlineFriendsCount;

    const onlineFriendsList = document.getElementById('online-friends');
    if (onlineFriendsList) {
        onlineFriendsList.innerHTML = '';

        const onlineFriends = AppState.friends.filter(f => f.isOnline).slice(0, 5);
        onlineFriends.forEach(friend => {
            const friendElement = document.createElement('div');
            friendElement.className = 'friend-item';
            friendElement.innerHTML = `
                <div class="friend-avatar">${friend.name ? friend.name.charAt(0) : '?'}</div>
                <div class="friend-info">
                    <div class="friend-name">${friend.name || 'مستخدم'}</div>
                    <div class="friend-status online">متصل الآن</div>
                </div>
            `;
            onlineFriendsList.appendChild(friendElement);
        });
    }
}

async function loadNotifications() {
    try {
        if (!AppState.currentUser) return;

        const snapshot = await db.collection('notifications')
            .where('userId', '==', AppState.currentUser.uid)
            .where('read', '==', false)
            .orderBy('createdAt', 'desc')
            .limit(20)
            .get();

        AppState.notifications = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        updateNotificationsUI();
    } catch (error) {
        console.error('خطأ في تحميل التنبيهات:', error);
    }
}

function updateNotificationsUI() {
    const notificationCount = document.getElementById('notification-count');
    if (notificationCount) {
        notificationCount.textContent = AppState.notifications.length;
        notificationCount.style.display = AppState.notifications.length > 0 ? 'flex' : 'none';
    }

    const notificationList = document.getElementById('notification-list');
    if (notificationList) {
        notificationList.innerHTML = '';

        AppState.notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = 'notification-item';
            notificationItem.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-${getNotificationIcon(notification.type)}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${formatDate(notification.createdAt?.toDate())}</div>
                </div>
            `;
            notificationList.appendChild(notificationItem);
        });
    }
}

function getNotificationIcon(type) {
    const icons = {
        welcome: 'hand-wave',
        win: 'trophy',
        friend_request: 'user-plus',
        challenge: 'gamepad',
        system: 'cog'
    };
    return icons[type] || 'bell';
}

async function loadLeaderboard() {
    try {
        const snapshot = await db.collection('users')
            .orderBy('points', 'desc')
            .limit(100)
            .get();

        AppState.leaderboard = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        document.getElementById('footer-total-users').textContent = AppState.leaderboard.length;
    } catch (error) {
        console.error('خطأ في تحميل التصنيف:', error);
    }
}

async function loadTournaments() {
    try {
        const snapshot = await db.collection('tournaments')
            .where('status', 'in', ['upcoming', 'active'])
            .orderBy('startDate')
            .limit(10)
            .get();

        AppState.tournaments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        updateTournamentsUI();
    } catch (error) {
        console.error('خطأ في تحميل البطولات:', error);
    }
}

function updateTournamentsUI() {
    const tournamentsList = document.getElementById('upcoming-tournaments');
    if (tournamentsList) {
        tournamentsList.innerHTML = '';

        AppState.tournaments.slice(0, 3).forEach(tournament => {
            const tournamentElement = document.createElement('div');
            tournamentElement.className = 'tournament-item';
            tournamentElement.innerHTML = `
                <div class="tournament-header">
                    <div class="tournament-title">${tournament.title}</div>
                    <div class="tournament-prize">${tournament.prize || 'جائزة خاصة'}</div>
                </div>
                <div class="tournament-details">
                    <span><i class="fas fa-users"></i> ${tournament.participants || 0}/100</span>
                    <span><i class="fas fa-calendar"></i> ${formatDate(tournament.startDate)}</span>
                </div>
                <button class="btn btn-primary btn-sm join-tournament" data-id="${tournament.id}">
                    الانضمام
                </button>
            `;
            tournamentsList.appendChild(tournamentElement);
        });
    }
}

async function createChallenge(type) {
    try {
        if (!AppState.currentUser) {
            showToast('يرجى تسجيل الدخول', 'يجب تسجيل الدخول لإنشاء تحدٍ', 'error');
            return;
        }

        const challengeData = {
            type: type,
            creatorId: AppState.currentUser.uid,
            creatorName: AppState.userData.name,
            status: 'waiting',
            players: [AppState.currentUser.uid],
            maxPlayers: type === 'individual' ? 1 : 4,
            questions: [],
            scores: {},
            settings: {
                timeLimit: APP_CONSTANTS.CHALLENGE_TIMES[type],
                questionCount: 10,
                difficulty: 'mixed'
            },
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        const challengeRef = await db.collection('challenges').add(challengeData);

        await rtdb.ref(`challenges/${challengeRef.id}`).set({
            ...challengeData,
            id: challengeRef.id
        });

        navigateTo('challenges');
        showToast('تم إنشاء التحدي', 'تم إنشاء التحدي بنجاح، انتظر انضمام اللاعبين', 'success');

    } catch (error) {
        console.error('خطأ في إنشاء التحدي:', error);
        showAlert('خطأ في إنشاء التحدي: ' + error.message, 'error');
    }
}

// إدارة الصفحات
function showApp() {
    document.getElementById('auth-page').classList.remove('active');
    document.getElementById('app-container').style.display = 'flex';
    document.getElementById('loading-screen').style.display = 'none';
}

function showAuth() {
    document.getElementById('app-container').style.display = 'none';
    document.getElementById('auth-page').classList.add('active');
    document.getElementById('auth-form').reset();
    hideAlert();
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('show');
    document.getElementById('main-content').classList.toggle('sidebar-open');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('show');
    document.getElementById('main-content').classList.remove('sidebar-open');
}

function toggleUserDropdown(e) {
    e.stopPropagation();
    document.getElementById('user-dropdown').classList.toggle('show');
}

function toggleNotifications(e) {
    e.stopPropagation();
    document.getElementById('notification-dropdown').classList.toggle('show');
}

function navigateTo(page) {
    console.log('التنقل إلى:', page);
    
    // تحديث الصفحة النشطة
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    
    // إظهار الصفحة المطلوبة
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // تحديث عنصر القائمة النشط
    const menuItem = document.querySelector(`.menu-item[data-page="${page}"]`);
    if (menuItem) {
        menuItem.classList.add('active');
    }
    
    // تحديث حالة التطبيق
    AppState.currentPage = page;
    
    // إغلاق القائمة الجانبية على الأجهزة المحمولة
    if (window.innerWidth < 992) {
        closeSidebar();
    }
    
    // تحميل بيانات الصفحة تلقائياً
    loadPageContent(page);
}

// إعداد مستمعات الأحداث
function setupEventListeners() {
    // المصادقة
    document.getElementById('auth-switch-link').addEventListener('click', toggleAuthMode);
    document.getElementById('auth-form').addEventListener('submit', handleAuthSubmit);
    document.getElementById('guest-login').addEventListener('click', handleGuestLogin);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);

    // التنقل
    document.getElementById('menu-toggle').addEventListener('click', toggleSidebar);
    document.getElementById('close-sidebar').addEventListener('click', closeSidebar);

    // القوائم
    document.querySelectorAll('.menu-item, .view-all, .footer-links a').forEach(item => {
        if (item.hasAttribute('data-page')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                navigateTo(this.getAttribute('data-page'));
                closeSidebar();
            });
        }
    });

    // قائمة المستخدم
    document.getElementById('user-menu-toggle').addEventListener('click', toggleUserDropdown);

    // التنبيهات
    document.getElementById('notification-bell').addEventListener('click', toggleNotifications);

    // تحديث البيانات
    document.getElementById('refresh-dashboard')?.addEventListener('click', refreshDashboard);
    document.getElementById('refresh-challenges')?.addEventListener('click', refreshChallenges);

    // التحديات السريعة
    document.querySelectorAll('.challenge-type[data-type]').forEach(type => {
        type.addEventListener('click', function() {
            createChallenge(this.getAttribute('data-type'));
        });
    });

    // إنشاء تحدٍ جديد
    document.getElementById('create-challenge')?.addEventListener('click', function() {
        createChallenge('individual');
    });

    // دعوة الأصدقاء
    document.getElementById('invite-friends')?.addEventListener('click', function() {
        showToast('قريباً', 'ميزة دعوة الأصدقاء قريباً', 'info');
    });

    // إغلاق القوائم والنوافذ عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-menu')) {
            document.getElementById('user-dropdown').classList.remove('show');
        }
        if (!e.target.closest('.notification-bell')) {
            document.getElementById('notification-dropdown').classList.remove('show');
        }
        if (!e.target.closest('.modal-content') && e.target.closest('.modal')) {
            document.querySelectorAll('.modal.show').forEach(modal => {
                modal.classList.remove('show');
            });
        }
    });

    // تحديث السنة في الفوتر
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function toggleAuthMode(e) {
    e.preventDefault();
    const isLogin = document.getElementById('auth-submit-text').textContent === 'تسجيل الدخول';

    if (isLogin) {
        document.getElementById('auth-submit-text').textContent = 'إنشاء الحساب';
        document.getElementById('auth-switch-text').textContent = 'لديك حساب بالفعل؟';
        document.getElementById('auth-switch-link').textContent = 'تسجيل الدخول';
        document.getElementById('auth-name-group').style.display = 'block';
        document.getElementById('auth-username-group').style.display = 'block';
    } else {
        document.getElementById('auth-submit-text').textContent = 'تسجيل الدخول';
        document.getElementById('auth-switch-text').textContent = 'ليس لديك حساب؟';
        document.getElementById('auth-switch-link').textContent = 'إنشاء حساب جديد';
        document.getElementById('auth-name-group').style.display = 'none';
        document.getElementById('auth-username-group').style.display = 'none';
    }

    hideAlert();
}

async function handleAuthSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const isLogin = document.getElementById('auth-submit-text').textContent === 'تسجيل الدخول';

    if (isLogin) {
        await loginUser(email, password);
    } else {
        const name = document.getElementById('auth-name').value;
        const username = document.getElementById('auth-username').value;

        if (!name || !username) {
            showAlert('الرجاء إدخال جميع البيانات المطلوبة', 'error');
            return;
        }

        await registerUser(email, password, name, username);
    }
}

async function handleGuestLogin() {
    const guestEmail = `guest_${Date.now()}@quizmasters.com`;
    const guestPassword = 'guest123';

    await registerUser(guestEmail, guestPassword, 'لاعب زائر', `guest_${Date.now()}`)
        .then(() => {
            showToast('مرحباً!', 'تم الدخول كزائر بنجاح', 'success');
        })
        .catch(error => {
            showAlert('خطأ في الدخول كزائر: ' + error.message, 'error');
        });
}

function refreshDashboard() {
    if (AppState.currentUser) {
        loadUserData(AppState.currentUser.uid);
        showToast('تم التحديث', 'تم تحديث بيانات لوحة التحكم', 'success');
    }
}

function refreshChallenges() {
    showToast('تم التحديث', 'تم تحديث قائمة التحديات', 'success');
}

// تحميل البيانات الأولية
async function loadInitialData() {
    try {
        const usersCount = await db.collection('users').get();
        const questionsCount = await db.collection('questions').get();
        const matchesCount = await db.collection('matches').get();

        document.getElementById('footer-total-users').textContent = usersCount.size;
        document.getElementById('footer-total-questions').textContent = questionsCount.size;
        document.getElementById('footer-total-matches').textContent = matchesCount.size;
    } catch (error) {
        console.error('خطأ في تحميل البيانات الأولية:', error);
    }
}

// تهيئة التطبيق

// في نهاية الملف app.js
document.addEventListener('DOMContentLoaded', initApp);

// ===============================
// وظائف التحديات الحقيقية
// ===============================

async function loadChallenges() {
    try {
        const snapshot = await db.collection('challenges')
            .where('status', 'in', ['waiting', 'active'])
            .orderBy('createdAt', 'desc')
            .limit(20)
            .get();
        
        AppState.challenges = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        renderChallenges();
    } catch (error) {
        console.error('خطأ في تحميل التحديات:', error);
    }
}

function renderChallenges() {
    // تحديات فردية
    const individualContainer = document.getElementById('individual-challenges');
    if (individualContainer) {
        individualContainer.innerHTML = '';
        
        const individualChallenges = AppState.challenges.filter(c => 
            c.type === 'individual' && c.status === 'waiting'
        );
        
        individualChallenges.forEach(challenge => {
            individualContainer.appendChild(createChallengeElement(challenge));
        });
    }
    
    // تحديات جماعية
    const multiplayerContainer = document.getElementById('multiplayer-challenges');
    if (multiplayerContainer) {
        multiplayerContainer.innerHTML = '';
        
        const multiplayerChallenges = AppState.challenges.filter(c => 
            c.type !== 'individual' && c.status === 'waiting'
        );
        
        multiplayerChallenges.forEach(challenge => {
            multiplayerContainer.appendChild(createChallengeElement(challenge));
        });
    }
}

function createChallengeElement(challenge) {
    const element = document.createElement('div');
    element.className = 'challenge-item';
    element.dataset.id = challenge.id;
    
    const playerCount = challenge.players ? challenge.players.length : 0;
    const maxPlayers = challenge.maxPlayers || 4;
    const timeLeft = challenge.settings?.timeLimit || 300;
    
    element.innerHTML = `
        <div class="challenge-header">
            <div>
                <div class="challenge-title">${getChallengeTypeName(challenge.type)}</div>
                <div class="challenge-type-badge">${challenge.creatorName || 'مجهول'}</div>
            </div>
            <div class="challenge-timer">${formatTime(timeLeft)}</div>
        </div>
        
        <div class="challenge-details">
            <span><i class="fas fa-users"></i> ${playerCount}/${maxPlayers}</span>
            <span><i class="fas fa-question-circle"></i> ${challenge.settings?.questionCount || 10}</span>
            <span><i class="fas fa-clock"></i> ${challenge.settings?.difficulty || 'مختلط'}</span>
        </div>
        
        <div class="challenge-players">
            ${challenge.players?.slice(0, 3).map((playerId, index) => `
                <div class="player-avatar">${index + 1}</div>
            `).join('')}
            ${playerCount > 3 ? `<div class="more-players">+${playerCount - 3}</div>` : ''}
        </div>
        
        <button class="btn btn-primary btn-block join-challenge-btn" data-id="${challenge.id}">
            الانضمام للتحدي
        </button>
    `;
    
    return element;
}

// ===============================
// نظام البطولات الحقيقي
// ===============================

async function createTournament(tournamentData) {
    try {
        const tournament = {
            ...tournamentData,
            status: 'upcoming',
            participants: 0,
            participantsList: [],
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        const docRef = await db.collection('tournaments').add(tournament);
        
        // إرسال إشعارات للمستخدمين
        await notifyUsersAboutTournament(docRef.id, tournament);
        
        showToast('تم', 'تم إنشاء البطولة بنجاح', 'success');
        return docRef.id;
    } catch (error) {
        console.error('خطأ في إنشاء البطولة:', error);
        showToast('خطأ', 'فشل في إنشاء البطولة', 'error');
        return null;
    }
}

async function joinTournament(tournamentId) {
    if (!AppState.currentUser) {
        showToast('خطأ', 'يجب تسجيل الدخول أولاً', 'error');
        return;
    }
    
    try {
        const tournamentRef = db.collection('tournaments').doc(tournamentId);
        const tournamentDoc = await tournamentRef.get();
        
        if (!tournamentDoc.exists) {
            showToast('خطأ', 'البطولة غير موجودة', 'error');
            return;
        }
        
        const tournament = tournamentDoc.data();
        
        // التحقق إذا كان المستخدم منضم بالفعل
        if (tournament.participantsList?.includes(AppState.currentUser.uid)) {
            showToast('معلومات', 'أنت منضم بالفعل للبطولة', 'info');
            return;
        }
        
        // التحقق من السعة
        if (tournament.participants >= tournament.maxParticipants) {
            showToast('خطأ', 'البطولة ممتلئة', 'error');
            return;
        }
        
        // الانضمام للبطولة
        await tournamentRef.update({
            participants: firebase.firestore.FieldValue.increment(1),
            participantsList: firebase.firestore.FieldValue.arrayUnion(AppState.currentUser.uid)
        });
        
        // إضافة إشعار للمستخدم
        await addNotification(AppState.currentUser.uid, {
            type: 'tournament',
            title: 'انضمام للبطولة',
            message: `لقد انضممت لبطولة ${tournament.title}`
        });
        
        showToast('تم', 'تم الانضمام للبطولة بنجاح', 'success');
        loadTournaments();
        
    } catch (error) {
        console.error('خطأ في الانضمام للبطولة:', error);
        showToast('خطأ', 'فشل في الانضمام للبطولة', 'error');
    }
}

// ===============================
// نظام التصنيف العالمي
// ===============================

async function updateLeaderboard() {
    try {
        const snapshot = await db.collection('users')
            .orderBy('points', 'desc')
            .limit(100)
            .get();
        
        const leaderboard = snapshot.docs.map((doc, index) => ({
            rank: index + 1,
            id: doc.id,
            ...doc.data()
        }));
        
        // تحديث ترتيب المستخدم الحالي
        const currentUserRank = leaderboard.findIndex(user => user.id === AppState.currentUser?.uid);
        if (currentUserRank !== -1 && AppState.currentUser) {
            await db.collection('users').doc(AppState.currentUser.uid).update({
                rank: currentUserRank + 1
            });
            
            if (AppState.userData) {
                AppState.userData.rank = currentUserRank + 1;
                updateUIWithUserData();
            }
        }
        
        AppState.leaderboard = leaderboard;
        renderLeaderboard();
        
    } catch (error) {
        console.error('خطأ في تحديث التصنيف:', error);
    }
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-page');
    if (!container || AppState.currentPage !== 'leaderboard') return;
    
    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-trophy"></i>
                التصنيف العالمي
            </h1>
            <div class="header-actions">
                <select class="form-control" id="leaderboard-filter">
                    <option value="all">الكل</option>
                    <option value="friends">الأصدقاء فقط</option>
                    <option value="country">بلدي</option>
                </select>
                <button class="btn btn-refresh" id="refresh-leaderboard">
                    <i class="fas fa-sync-alt"></i>
                </button>
            </div>
        </div>
        
        <div class="leaderboard-container">
            <div class="leaderboard-header">
                <div class="your-rank">
                    <h3>ترتيبك الحالي</h3>
                    <div class="rank-badge">#${AppState.userData?.rank || 0}</div>
                </div>
            </div>
            
            <div class="leaderboard-table">
                <table>
                    <thead>
                        <tr>
                            <th>الترتيب</th>
                            <th>المستخدم</th>
                            <th>المستوى</th>
                            <th>النقاط</th>
                            <th>الانتصارات</th>
                        </tr>
                    </thead>
                    <tbody id="leaderboard-body">
                        ${AppState.leaderboard.slice(0, 50).map(user => `
                            <tr class="${user.id === AppState.currentUser?.uid ? 'current-user' : ''}">
                                <td class="rank">#${user.rank}</td>
                                <td class="user">
                                    <div class="user-info">
                                        <div class="user-avatar">${user.name?.charAt(0) || '?'}</div>
                                        <div class="user-details">
                                            <div class="username">${user.name || 'مجهول'}</div>
                                            <div class="user-level">المستوى ${user.level || 1}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="level">${user.level || 1}</td>
                                <td class="points">${user.points || 0}</td>
                                <td class="wins">${user.wins || 0}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    // إضافة مستمعات الأحداث
    document.getElementById('refresh-leaderboard')?.addEventListener('click', updateLeaderboard);
    document.getElementById('leaderboard-filter')?.addEventListener('change', filterLeaderboard);
}

// ===============================
// نظام المتجر والإنجازات
// ===============================

async function loadShopItems() {
    try {
        const snapshot = await db.collection('shop_items')
            .orderBy('price')
            .get();
        
        const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        renderShop(items);
    } catch (error) {
        console.error('خطأ في تحميل عناصر المتجر:', error);
    }
}

function renderShop(items) {
    const container = document.getElementById('shop-page');
    if (!container || AppState.currentPage !== 'shop') return;
    
    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-shopping-cart"></i>
                متجر اللعبة
            </h1>
            <div class="header-actions">
                <div class="user-coins">
                    <i class="fas fa-coins"></i>
                    <span id="user-coins">${AppState.userData?.points || 0}</span>
                </div>
            </div>
        </div>
        
        <div class="shop-categories">
            <button class="category-btn active" data-category="all">الكل</button>
            <button class="category-btn" data-category="powerups">معززات</button>
            <button class="category-btn" data-category="themes">سمات</button>
            <button class="category-btn" data-category="avatars">صور شخصية</button>
        </div>
        
        <div class="shop-items-grid" id="shop-items">
            ${items.map(item => `
                <div class="shop-item" data-category="${item.category}">
                    <div class="item-image">
                        <i class="${item.icon || 'fas fa-gift'}"></i>
                    </div>
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <div class="item-price">
                            <i class="fas fa-coins"></i>
                            <span>${item.price}</span>
                        </div>
                    </div>
                    <button class="btn btn-primary buy-btn" data-id="${item.id}" 
                            ${(AppState.userData?.points || 0) < item.price ? 'disabled' : ''}>
                        شراء الآن
                    </button>
                </div>
            `).join('')}
        </div>
    `;
    
    // إضافة مستمعات الأحداث
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', filterShopItems);
    });
    
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', handleBuyItem);
    });
}

// ===============================
// نظام الإعدادات
// ===============================

function renderSettings() {
    const container = document.getElementById('settings-page');
    if (!container || AppState.currentPage !== 'settings') return;
    
    const settings = AppState.userData?.settings || {};
    
    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-cog"></i>
                الإعدادات
            </h1>
        </div>
        
        <div class="settings-container">
            <div class="settings-section">
                <h3><i class="fas fa-volume-up"></i> الإعدادات الصوتية</h3>
                
                <div class="setting-item">
                    <label class="setting-label">
                        <span>تشغيل المؤثرات الصوتية</span>
                        <label class="switch">
                            <input type="checkbox" id="sound-toggle" ${settings.sound ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </label>
                </div>
                
                <div class="setting-item">
                    <label class="setting-label">
                        <span>تشغيل الموسيقى الخلفية</span>
                        <label class="switch">
                            <input type="checkbox" id="music-toggle" ${settings.music ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </label>
                </div>
            </div>
            
            <div class="settings-section">
                <h3><i class="fas fa-bell"></i> إعدادات الإشعارات</h3>
                
                <div class="setting-item">
                    <label class="setting-label">
                        <span>إشعارات التحديات</span>
                        <label class="switch">
                            <input type="checkbox" id="challenge-notifications" ${settings.notifications?.challenges !== false ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </label>
                </div>
                
                <div class="setting-item">
                    <label class="setting-label">
                        <span>إشعارات الأصدقاء</span>
                        <label class="switch">
                            <input type="checkbox" id="friend-notifications" ${settings.notifications?.friends !== false ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </label>
                </div>
            </div>
            
            <div class="settings-section">
                <h3><i class="fas fa-globe"></i> إعدادات عامة</h3>
                
                <div class="setting-item">
                    <label class="setting-label">اللغة</label>
                    <select class="form-control" id="language-select">
                        <option value="ar" ${settings.language === 'ar' ? 'selected' : ''}>العربية</option>
                        <option value="en" ${settings.language === 'en' ? 'selected' : ''}>English</option>
                    </select>
                </div>
                
                <div class="setting-item">
                    <label class="setting-label">المظهر</label>
                    <select class="form-control" id="theme-select">
                        <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>فاتح</option>
                        <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>داكن</option>
                    </select>
                </div>
            </div>
            
            <div class="settings-actions">
                <button class="btn btn-primary" id="save-settings">حفظ الإعدادات</button>
                <button class="btn btn-secondary" id="reset-settings">إعادة تعيين</button>
            </div>
        </div>
    `;
    
    // إضافة مستمعات الأحداث
    document.getElementById('save-settings')?.addEventListener('click', saveSettings);
    document.getElementById('reset-settings')?.addEventListener('click', resetSettings);
}

async function saveSettings() {
    if (!AppState.currentUser) return;
    
    try {
        const sound = document.getElementById('sound-toggle').checked;
        const music = document.getElementById('music-toggle').checked;
        const language = document.getElementById('language-select').value;
        const theme = document.getElementById('theme-select').value;
        
        const settings = {
            sound,
            music,
            language,
            theme,
            notifications: {
                challenges: document.getElementById('challenge-notifications').checked,
                friends: document.getElementById('friend-notifications').checked
            }
        };
        
        await db.collection('users').doc(AppState.currentUser.uid).update({
            settings,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        if (AppState.userData) {
            AppState.userData.settings = settings;
        }
        
        showToast('تم', 'تم حفظ الإعدادات بنجاح', 'success');
        
    } catch (error) {
        console.error('خطأ في حفظ الإعدادات:', error);
        showToast('خطأ', 'فشل في حفظ الإعدادات', 'error');
    }
}

// ===============================
// نظام الأصدقاء الحقيقي
// ===============================

async function sendFriendRequest(friendId) {
    if (!AppState.currentUser) return;
    
    try {
        // إضافة طلب صداقة
        await db.collection('friend_requests').add({
            from: AppState.currentUser.uid,
            to: friendId,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إرسال إشعار للصديق
        await addNotification(friendId, {
            type: 'friend_request',
            title: 'طلب صداقة جديد',
            message: `${AppState.userData.name} يريد إضافتك كصديق`,
            data: { from: AppState.currentUser.uid }
        });
        
        showToast('تم', 'تم إرسال طلب الصداقة', 'success');
        
    } catch (error) {
        console.error('خطأ في إرسال طلب الصداقة:', error);
        showToast('خطأ', 'فشل في إرسال طلب الصداقة', 'error');
    }
}

async function loadFriendRequests() {
    try {
        const snapshot = await db.collection('friend_requests')
            .where('to', '==', AppState.currentUser.uid)
            .where('status', '==', 'pending')
            .orderBy('createdAt', 'desc')
            .get();
        
        AppState.friendRequests = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        updateFriendRequestsBadge();
        
    } catch (error) {
        console.error('خطأ في تحميل طلبات الصداقة:', error);
    }
}

function updateFriendRequestsBadge() {
    const badge = document.getElementById('friend-requests-badge');
    if (badge) {
        const count = AppState.friendRequests?.length || 0;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// ===============================
// إضافة مستمعات الأحداث الجديدة
// ===============================

function setupAdditionalEventListeners() {
    // تحديث التحديات
    document.getElementById('refresh-challenges')?.addEventListener('click', loadChallenges);
    
    // الانضمام للتحديات
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('join-challenge-btn')) {
            const challengeId = e.target.dataset.id;
            await joinChallenge(challengeId);
        }
        
        if (e.target.classList.contains('join-tournament')) {
            const tournamentId = e.target.dataset.id;
            await joinTournament(tournamentId);
        }
    });
    
    // تحديث لوحة التحكم
    document.getElementById('refresh-dashboard')?.addEventListener('click', async () => {
        await Promise.all([
            loadUserData(AppState.currentUser.uid),
            loadChallenges(),
            loadTournaments(),
            loadNotifications()
        ]);
        showToast('تم التحديث', 'تم تحديث جميع البيانات', 'success');
    });
}

// ===============================
// وظائف مساعدة جديدة
// ===============================

async function joinChallenge(challengeId) {
    if (!AppState.currentUser) {
        showToast('خطأ', 'يجب تسجيل الدخول أولاً', 'error');
        return;
    }
    
    try {
        const challengeRef = db.collection('challenges').doc(challengeId);
        const challengeDoc = await challengeRef.get();
        
        if (!challengeDoc.exists) {
            showToast('خطأ', 'التحدي غير موجود', 'error');
            return;
        }
        
        const challenge = challengeDoc.data();
        
        // التحقق إذا كان المستخدم منضم بالفعل
        if (challenge.players?.includes(AppState.currentUser.uid)) {
            showToast('معلومات', 'أنت منضم بالفعل لهذا التحدي', 'info');
            return;
        }
        
        // التحقق من السعة
        if (challenge.players?.length >= challenge.maxPlayers) {
            showToast('خطأ', 'التحدي ممتلئ', 'error');
            return;
        }
        
        // الانضمام للتحدي
        await challengeRef.update({
            players: firebase.firestore.FieldValue.arrayUnion(AppState.currentUser.uid)
        });
        
        // إذا كان العدد كافي، ابدأ التحدي
        if (challenge.players?.length + 1 >= challenge.maxPlayers) {
            await challengeRef.update({ status: 'active' });
            showToast('تم', 'تم بدء التحدي!', 'success');
            setTimeout(() => game.startChallenge(challengeId), 2000);
        } else {
            showToast('تم', 'تم الانضمام للتحدي', 'success');
        }
        
        loadChallenges();
        
    } catch (error) {
        console.error('خطأ في الانضمام للتحدي:', error);
        showToast('خطأ', 'فشل في الانضمام للتحدي', 'error');
    }
}

function getChallengeTypeName(type) {
    const names = {
        individual: 'تحدي فردي',
        speed: 'تحدي السرعة',
        time: 'تحدي الوقت',
        comprehensive: 'تحدي شامل'
    };
    return names[type] || type;
}

// ===============================
// تحديث دالة تهيئة التطبيق
// ===============================

// في دالة loadUserData، أضف:
async function loadUserData(uid) {
    try {
        const doc = await db.collection('users').doc(uid).get();
        if (doc.exists) {
            AppState.userData = doc.data();
            updateUIWithUserData();
            
            AppState.isAdmin = AppState.userData.isAdmin || false;
            if (AppState.isAdmin) {
                document.getElementById('admin-menu-item').style.display = 'flex';
            }
            
            // تحميل جميع البيانات
            await Promise.all([
                loadQuestions(),
                loadFriends(),
                loadNotifications(),
                loadLeaderboard(),
                loadTournaments(),
                loadChallenges(),
                loadFriendRequests()
            ]);
        }
    } catch (error) {
        console.error('خطأ في تحميل بيانات المستخدم:', error);
    }
}

// ===============================
// نظام الصفحات المفقودة - الوظائف الكاملة
// ===============================

// دالة تحميل صفحة البطولات
async function loadTournamentsPage() {
    const container = document.getElementById('tournaments-page');
    if (!container) return;
    
    try {
        container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <i class="fas fa-chess-king"></i>
                    البطولات
                </h1>
                <div class="header-actions">
                    <button class="btn btn-outline" id="create-tournament">
                        <i class="fas fa-plus"></i> إنشاء بطولة
                    </button>
                    <button class="btn btn-refresh" id="refresh-tournaments">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>
            
            <div class="tournaments-container">
                <div class="tournaments-grid" id="tournaments-grid">
                    <div class="loading-section">
                        <div class="loader-spinner"></div>
                        <p>جاري تحميل البطولات...</p>
                    </div>
                </div>
                
                <div class="tournaments-list-section">
                    <h3>البطولات النشطة</h3>
                    <div class="tournaments-table-container">
                        <table class="tournaments-table">
                            <thead>
                                <tr>
                                    <th>اسم البطولة</th>
                                    <th>النوع</th>
                                    <th>الجائزة</th>
                                    <th>المشاركون</th>
                                    <th>الوقت</th>
                                    <th>الحالة</th>
                                    <th>الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody id="tournaments-table-body">
                                <!-- سيتم ملؤها ديناميكياً -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- نموذج إنشاء بطولة -->
            <div class="modal" id="tournament-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>إنشاء بطولة جديدة</h3>
                        <button class="close-modal" id="close-tournament-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="tournament-form">
                            <div class="form-group">
                                <label class="form-label">اسم البطولة *</label>
                                <input type="text" class="form-control" id="tournament-name" required>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">نوع البطولة *</label>
                                    <select class="form-control" id="tournament-type" required>
                                        <option value="speed">تحدي السرعة</option>
                                        <option value="survival">تحدي البقاء</option>
                                        <option value="marathon">ماراثون الأسئلة</option>
                                        <option value="expert">تحدي الخبراء</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">عدد المشاركين *</label>
                                    <select class="form-control" id="tournament-max-players" required>
                                        <option value="8">8 لاعبين</option>
                                        <option value="16">16 لاعبين</option>
                                        <option value="32">32 لاعبين</option>
                                        <option value="64">64 لاعبين</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">عدد الأسئلة *</label>
                                    <input type="number" class="form-control" id="tournament-questions" min="10" max="100" value="20" required>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">مدة كل سؤال *</label>
                                    <select class="form-control" id="question-time" required>
                                        <option value="15">15 ثانية</option>
                                        <option value="20">20 ثانية</option>
                                        <option value="25">25 ثانية</option>
                                        <option value="30">30 ثانية</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">مستوى الصعوبة *</label>
                                <select class="form-control" id="tournament-difficulty" required>
                                    <option value="easy">سهل</option>
                                    <option value="medium">متوسط</option>
                                    <option value="hard">صعب</option>
                                    <option value="mixed">مختلط</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">الجائزة (نقاط) *</label>
                                <input type="number" class="form-control" id="tournament-prize" min="100" max="10000" value="1000" required>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">وصف البطولة</label>
                                <textarea class="form-control" id="tournament-description" rows="3"></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">
                                    <input type="checkbox" id="tournament-private">
                                    <span>بطولة خاصة (بالدعوة فقط)</span>
                                </label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="cancel-tournament">إلغاء</button>
                        <button class="btn btn-primary" id="save-tournament">إنشاء البطولة</button>
                    </div>
                </div>
            </div>
        `;
        
        // إضافة مستمعات الأحداث
        document.getElementById('create-tournament')?.addEventListener('click', showCreateTournamentModal);
        document.getElementById('refresh-tournaments')?.addEventListener('click', loadTournamentsPage);
        document.getElementById('close-tournament-modal')?.addEventListener('click', hideCreateTournamentModal);
        document.getElementById('cancel-tournament')?.addEventListener('click', hideCreateTournamentModal);
        document.getElementById('save-tournament')?.addEventListener('click', createTournament);
        
        // تحميل البطولات
        await loadTournamentsData();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة البطولات:', error);
        container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <i class="fas fa-chess-king"></i>
                    البطولات
                </h1>
            </div>
            <div class="error-section">
                <i class="fas fa-exclamation-triangle"></i>
                <p>حدث خطأ في تحميل البطولات</p>
                <button class="btn btn-primary" onclick="loadTournamentsPage()">إعادة المحاولة</button>
            </div>
        `;
    }
}

// دالة تحميل بيانات البطولات
async function loadTournamentsData() {
    try {
        const snapshot = await db.collection('tournaments')
            .where('status', 'in', ['upcoming', 'active'])
            .orderBy('startDate')
            .limit(20)
            .get();
        
        AppState.tournaments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        renderTournaments();
        
    } catch (error) {
        console.error('خطأ في تحميل البطولات:', error);
    }
}

// دالة عرض البطولات
function renderTournaments() {
    const grid = document.getElementById('tournaments-grid');
    const tableBody = document.getElementById('tournaments-table-body');
    
    if (!grid || !tableBody) return;
    
    if (AppState.tournaments.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-chess-king"></i>
                <p>لا توجد بطولات حالياً</p>
                <button class="btn btn-primary" id="create-first-tournament">أنشئ أول بطولة</button>
            </div>
        `;
        
        document.getElementById('create-first-tournament')?.addEventListener('click', showCreateTournamentModal);
        tableBody.innerHTML = '';
        return;
    }
    
    // عرض البطولات في الشبكة
    grid.innerHTML = AppState.tournaments.slice(0, 3).map(tournament => `
        <div class="tournament-card ${tournament.status}">
            <div class="tournament-header">
                <div class="tournament-badge ${tournament.status}">
                    <i class="fas fa-${getTournamentStatusIcon(tournament.status)}"></i>
                    <span>${getTournamentStatusText(tournament.status)}</span>
                </div>
                <div class="tournament-prize">${tournament.prize || 0} نقطة</div>
            </div>
            <div class="tournament-body">
                <h3>${tournament.title || 'بطولة جديدة'}</h3>
                <p>${tournament.description || 'انضم الآن واربح الجائزة'}</p>
                <div class="tournament-details">
                    <div class="detail">
                        <i class="fas fa-users"></i>
                        <span>${tournament.participants || 0}/${tournament.maxParticipants || 8}</span>
                    </div>
                    <div class="detail">
                        <i class="fas fa-question-circle"></i>
                        <span>${tournament.questionCount || 20} سؤال</span>
                    </div>
                    <div class="detail">
                        <i class="fas fa-clock"></i>
                        <span>${tournament.duration || 30} دقيقة</span>
                    </div>
                </div>
                ${tournament.status === 'active' ? `
                    <div class="tournament-timer">
                        <i class="fas fa-hourglass-half"></i>
                        <span>متبقي: ${formatTime(tournament.timeLeft || 1800)}</span>
                    </div>
                ` : ''}
            </div>
            <div class="tournament-footer">
                <button class="btn btn-primary join-tournament-btn" data-id="${tournament.id}">
                    ${tournament.status === 'active' ? 'الانضمام' : 'التسجيل'}
                </button>
            </div>
        </div>
    `).join('');
    
    // عرض البطولات في الجدول
    tableBody.innerHTML = AppState.tournaments.map(tournament => `
        <tr>
            <td>
                <div class="tournament-info">
                    <div class="tournament-icon">
                        <i class="fas fa-${getTournamentTypeIcon(tournament.type)}"></i>
                    </div>
                    <div class="tournament-details">
                        <div class="tournament-name">${tournament.title}</div>
                        <div class="tournament-type">${getTournamentTypeText(tournament.type)}</div>
                    </div>
                </div>
            </td>
            <td>${getTournamentTypeText(tournament.type)}</td>
            <td>
                <div class="prize-badge">
                    <i class="fas fa-coins"></i>
                    <span>${tournament.prize || 0}</span>
                </div>
            </td>
            <td>
                <div class="participants-count">
                    <i class="fas fa-users"></i>
                    <span>${tournament.participants || 0}</span>
                </div>
            </td>
            <td>${tournament.startDate ? formatDate(tournament.startDate) : 'قريباً'}</td>
            <td>
                <span class="status-badge ${tournament.status}">
                    ${getTournamentStatusText(tournament.status)}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="action-btn join" onclick="joinTournament('${tournament.id}')">
                        <i class="fas fa-sign-in-alt"></i>
                        ${tournament.status === 'active' ? 'انضم' : 'سجل'}
                    </button>
                    ${AppState.isAdmin ? `
                        <button class="action-btn edit" onclick="editTournament('${tournament.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                    ` : ''}
                </div>
            </td>
        </tr>
    `).join('');
    
    // إضافة مستمعات الأحداث للأزرار
    document.querySelectorAll('.join-tournament-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tournamentId = this.dataset.id;
            joinTournament(tournamentId);
        });
    });
}

// دالة تحميل صفحة التصنيف
async function loadLeaderboardPage() {
    const container = document.getElementById('leaderboard-page');
    if (!container) return;
    
    try {
        container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <i class="fas fa-trophy"></i>
                    التصنيف العالمي
                </h1>
                <div class="header-actions">
                    <select class="form-control" id="leaderboard-filter">
                        <option value="global">التصنيف العالمي</option>
                        <option value="friends">الأصدقاء فقط</option>
                        <option value="weekly">الأسبوعي</option>
                        <option value="monthly">الشهري</option>
                    </select>
                    <button class="btn btn-refresh" id="refresh-leaderboard">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>
            
            <div class="leaderboard-container">
                <div class="loading-section">
                    <div class="loader-spinner"></div>
                    <p>جاري تحميل بيانات التصنيف...</p>
                </div>
            </div>
        `;
        
        // إضافة مستمعات الأحداث
        document.getElementById('refresh-leaderboard')?.addEventListener('click', loadLeaderboardData);
        document.getElementById('leaderboard-filter')?.addEventListener('change', filterLeaderboard);
        
        // تحميل بيانات التصنيف
        await loadLeaderboardData();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة التصنيف:', error);
        container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <i class="fas fa-trophy"></i>
                    التصنيف العالمي
                </h1>
            </div>
            <div class="error-section">
                <i class="fas fa-exclamation-triangle"></i>
                <p>حدث خطأ في تحميل التصنيف</p>
                <button class="btn btn-primary" onclick="loadLeaderboardPage()">إعادة المحاولة</button>
            </div>
        `;
    }
}

// دالة تحميل بيانات التصنيف
async function loadLeaderboardData() {
    try {
        const snapshot = await db.collection('users')
            .orderBy('points', 'desc')
            .limit(100)
            .get();
        
        AppState.leaderboard = snapshot.docs.map((doc, index) => ({
            id: doc.id,
            rank: index + 1,
            ...doc.data()
        }));
        
        renderLeaderboard();
        
    } catch (error) {
        console.error('خطأ في تحميل التصنيف:', error);
    }
}

// دالة عرض التصنيف
function renderLeaderboard() {
    const container = document.getElementById('leaderboard-page');
    if (!container) return;
    
    // العثور على ترتيب المستخدم الحالي
    const currentUserRank = AppState.leaderboard.findIndex(user => 
        user.id === AppState.currentUser?.uid
    );
    const userRank = currentUserRank !== -1 ? currentUserRank + 1 : 0;
    const userData = currentUserRank !== -1 ? AppState.leaderboard[currentUserRank] : null;
    
    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-trophy"></i>
                التصنيف العالمي
            </h1>
            <div class="header-actions">
                <select class="form-control" id="leaderboard-filter">
                    <option value="global">التصنيف العالمي</option>
                    <option value="friends">الأصدقاء فقط</option>
                    <option value="weekly">الأسبوعي</option>
                    <option value="monthly">الشهري</option>
                </select>
                <button class="btn btn-refresh" id="refresh-leaderboard">
                    <i class="fas fa-sync-alt"></i>
                </button>
            </div>
        </div>
        
        <div class="leaderboard-container">
            <!-- أفضل 3 لاعبين -->
            ${AppState.leaderboard.length >= 3 ? `
                <div class="leaderboard-top3">
                    ${[1, 0, 2].map((index, podiumIndex) => {
                        const player = AppState.leaderboard[index];
                        if (!player) return '';
                        const podiumClass = ['second', 'first', 'third'][podiumIndex];
                        return `
                            <div class="podium ${podiumClass}">
                                <div class="podium-rank">${player.rank}</div>
                                <div class="podium-avatar">
                                    ${player.name?.charAt(0) || '?'}
                                </div>
                                <div class="podium-info">
                                    <div class="podium-name">${player.name || 'لاعب'}</div>
                                    <div class="podium-points">${player.points || 0} نقطة</div>
                                </div>
                                <div class="podium-badge">
                                    <i class="fas fa-${player.rank === 1 ? 'crown' : 'medal'}"></i>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            ` : ''}
            
            <!-- جدول التصنيف -->
            <div class="leaderboard-table-container">
                <div class="leaderboard-filters">
                    <div class="filter-group">
                        <button class="filter-btn active" data-filter="all">الكل</button>
                        <button class="filter-btn" data-filter="online">المتصلون الآن</button>
                        <button class="filter-btn" data-filter="friends">الأصدقاء</button>
                    </div>
                </div>
                
                <div class="leaderboard-table">
                    <table>
                        <thead>
                            <tr>
                                <th>الترتيب</th>
                                <th>المستخدم</th>
                                <th>المستوى</th>
                                <th>النقاط</th>
                                <th>الفوز</th>
                                <th>معدل الفوز</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody id="leaderboard-table-body">
                            ${AppState.leaderboard.slice(0, 50).map(user => `
                                <tr class="${user.id === AppState.currentUser?.uid ? 'current-user' : ''}">
                                    <td class="rank">
                                        <div class="rank-number">#${user.rank}</div>
                                        ${user.rank <= 3 ? `<div class="rank-badge top-${user.rank}">${user.rank}</div>` : ''}
                                    </td>
                                    <td class="user">
                                        <div class="user-info">
                                            <div class="user-avatar">${user.name?.charAt(0) || '?'}</div>
                                            <div class="user-details">
                                                <div class="user-name">${user.name || 'لاعب'}</div>
                                                <div class="user-username">@${user.username || 'مجهول'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="level">
                                        <div class="level-badge">${user.level || 1}</div>
                                    </td>
                                    <td class="points">${user.points || 0}</td>
                                    <td class="wins">${user.wins || 0}</td>
                                    <td class="win-rate">
                                        ${user.matches && user.wins ? Math.round((user.wins / user.matches) * 100) : 0}%
                                    </td>
                                    <td class="status">
                                        <span class="status-badge ${user.isOnline ? 'online' : 'offline'}">
                                            ${user.isOnline ? 'متصل' : 'غير متصل'}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <!-- موقع المستخدم الحالي -->
                ${userData ? `
                    <div class="your-position">
                        <div class="position-rank">#${userRank}</div>
                        <div class="position-user">
                            <div class="user-avatar-small">${userData.name?.charAt(0) || 'أنت'}</div>
                            <div class="user-info">
                                <div class="user-name">${userData.name || 'أنت'}</div>
                                <div class="user-details">
                                    ${userData.points || 0} نقطة | المستوى ${userData.level || 1}
                                </div>
                            </div>
                        </div>
                        <div class="position-change">
                            <i class="fas fa-chart-line"></i>
                            <span>مركزك في التصنيف</span>
                        </div>
                    </div>
                ` : ''}
            </div>
            
            <!-- إحصائيات التصنيف -->
            <div class="leaderboard-stats">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-value">${AppState.leaderboard.length}</div>
                        <div class="stat-label">لاعب في التصنيف</div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-calculator"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-value">
                            ${AppState.leaderboard.length > 0 ? 
                                Math.round(AppState.leaderboard.reduce((sum, user) => sum + (user.points || 0), 0) / AppState.leaderboard.length) : 0
                            }
                        </div>
                        <div class="stat-label">متوسط النقاط</div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-value">
                            ${AppState.leaderboard.length > 0 ? AppState.leaderboard[0].points || 0 : 0}
                        </div>
                        <div class="stat-label">أعلى نقاط</div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-globe-asia"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-value">${calculateCountriesCount()}</div>
                        <div class="stat-label">دولة مختلفة</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إضافة مستمعات الأحداث
    document.getElementById('refresh-leaderboard')?.addEventListener('click', loadLeaderboardData);
    document.getElementById('leaderboard-filter')?.addEventListener('change', filterLeaderboard);
    
    // إضافة مستمعات الأزرار للمرشحات
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterLeaderboardByType(this.dataset.filter);
        });
    });
}

// دالة تحميل صفحة الأصدقاء
async function loadFriendsPage() {
    const container = document.getElementById('friends-page');
    if (!container) return;
    
    try {
        container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <i class="fas fa-user-friends"></i>
                    الأصدقاء
                </h1>
                <div class="header-actions">
                    <button class="btn btn-outline" id="add-friend-btn">
                        <i class="fas fa-user-plus"></i> إضافة صديق
                    </button>
                    <button class="btn btn-refresh" id="refresh-friends">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>
            
            <div class="friends-container">
                <div class="friends-tabs">
                    <div class="tabs-header">
                        <button class="tab-btn active" data-tab="all-friends">جميع الأصدقاء</button>
                        <button class="tab-btn" data-tab="online-friends">المتصلون الآن</button>
                        <button class="tab-btn" data-tab="pending-requests">
                            طلبات الصداقة
                            <span class="badge" id="requests-badge" style="display: none;">0</span>
                        </button>
                    </div>
                    
                    <div class="tab-content active" id="all-friends-tab">
                        <div class="loading-section">
                            <div class="loader-spinner"></div>
                            <p>جاري تحميل قائمة الأصدقاء...</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- نموذج إضافة صديق -->
            <div class="modal" id="add-friend-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>إضافة صديق جديد</h3>
                        <button class="close-modal" id="close-friend-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="search-friend">
                            <div class="search-box">
                                <i class="fas fa-search"></i>
                                <input type="text" id="friend-search" placeholder="ابحث باسم المستخدم أو البريد الإلكتروني...">
                            </div>
                            <div class="search-results" id="search-results">
                                <!-- نتائج البحث تظهر هنا -->
                            </div>
                        </div>
                        
                        <div class="friend-suggestions">
                            <h4>اقتراحات لك</h4>
                            <div class="suggestions-list" id="suggestions-list">
                                <!-- اقتراحات الأصدقاء تظهر هنا -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // إضافة مستمعات الأحداث
        document.getElementById('add-friend-btn')?.addEventListener('click', showAddFriendModal);
        document.getElementById('refresh-friends')?.addEventListener('click', loadFriendsData);
        document.getElementById('close-friend-modal')?.addEventListener('click', hideAddFriendModal);
        
        // إضافة مستمعات للألسنة
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                const tabId = this.dataset.tab + '-tab';
                document.getElementById(tabId)?.classList.add('active');
                
                switch(this.dataset.tab) {
                    case 'all-friends':
                        loadAllFriends();
                        break;
                    case 'online-friends':
                        loadOnlineFriends();
                        break;
                    case 'pending-requests':
                        loadFriendRequests();
                        break;
                }
            });
        });
        
        // تحميل بيانات الأصدقاء
        await loadFriendsData();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة الأصدقاء:', error);
        container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <i class="fas fa-user-friends"></i>
                    الأصدقاء
                </h1>
            </div>
            <div class="error-section">
                <i class="fas fa-exclamation-triangle"></i>
                <p>حدث خطأ في تحميل قائمة الأصدقاء</p>
                <button class="btn btn-primary" onclick="loadFriendsPage()">إعادة المحاولة</button>
            </div>
        `;
    }
}

// دالة تحميل بيانات الأصدقاء
async function loadFriendsData() {
    try {
        if (!AppState.currentUser) return;
        
        // تحميل قائمة الأصدقاء
        const userDoc = await db.collection('users').doc(AppState.currentUser.uid).get();
        const userData = userDoc.data();
        
        if (userData.friends && userData.friends.length > 0) {
            const friendsPromises = userData.friends.map(friendId => 
                db.collection('users').doc(friendId).get()
            );
            
            const friendsSnapshots = await Promise.all(friendsPromises);
            AppState.friends = friendsSnapshots
                .filter(snap => snap.exists)
                .map(snap => ({
                    id: snap.id,
                    ...snap.data()
                }));
        } else {
            AppState.friends = [];
        }
        
        // تحميل طلبات الصداقة
        await loadFriendRequests();
        
        // تحديث واجهة الأصدقاء
        renderFriends();
        
    } catch (error) {
        console.error('خطأ في تحميل بيانات الأصدقاء:', error);
    }
}

// دالة عرض الأصدقاء
function renderFriends() {
    const allFriendsTab = document.getElementById('all-friends-tab');
    if (!allFriendsTab) return;
    
    if (AppState.friends.length === 0) {
        allFriendsTab.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-user-friends"></i>
                <p>لا يوجد أصدقاء في قائمتك بعد</p>
                <p>أضف أصدقاء لتتمكن من تحدييهم واللعب معهم</p>
                <button class="btn btn-primary" id="find-friends-btn">ابحث عن أصدقاء</button>
            </div>
        `;
        
        document.getElementById('find-friends-btn')?.addEventListener('click', showAddFriendModal);
        return;
    }
    
    allFriendsTab.innerHTML = `
        <div class="friends-list">
            ${AppState.friends.map(friend => `
                <div class="friend-item">
                    <div class="friend-avatar ${friend.isOnline ? 'online' : 'offline'}">
                        ${friend.name?.charAt(0) || '?'}
                    </div>
                    <div class="friend-info">
                        <div class="friend-name">${friend.name || 'مستخدم'}</div>
                        <div class="friend-details">
                            <span class="friend-level">المستوى ${friend.level || 1}</span>
                            <span class="friend-points">${friend.points || 0} نقطة</span>
                        </div>
                        <div class="friend-status">
                            ${friend.isOnline ? `
                                <span class="status online">
                                    <i class="fas fa-circle"></i> متصل الآن
                                </span>
                            ` : `
                                <span class="status offline">
                                    <i class="fas fa-circle"></i> غير متصل
                                </span>
                            `}
                        </div>
                    </div>
                    <div class="friend-actions">
                        <button class="action-btn challenge" onclick="challengeFriend('${friend.id}')">
                            <i class="fas fa-gamepad"></i> تحدى
                        </button>
                        <button class="action-btn message" onclick="messageFriend('${friend.id}')">
                            <i class="fas fa-comment"></i> رسالة
                        </button>
                        <button class="action-btn remove" onclick="removeFriend('${friend.id}')">
                            <i class="fas fa-user-minus"></i> إزالة
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="friends-stats">
            <div class="stat">
                <div class="stat-value">${AppState.friends.length}</div>
                <div class="stat-label">إجمالي الأصدقاء</div>
            </div>
            <div class="stat">
                <div class="stat-value">${AppState.friends.filter(f => f.isOnline).length}</div>
                <div class="stat-label">متصلون الآن</div>
            </div>
            <div class="stat">
                <div class="stat-value">
                    ${AppState.friends.length > 0 ? 
                        Math.round(AppState.friends.reduce((sum, f) => sum + (f.level || 1), 0) / AppState.friends.length) : 0
                    }
                </div>
                <div class="stat-label">متوسط المستوى</div>
            </div>
        </div>
    `;
    
    // تحديث شارة طلبات الصداقة
    updateFriendRequestsBadge();
}

// دالة تحميل صفحة المتجر
async function loadShopPage() {
    const container = document.getElementById('shop-page');
    if (!container) return;
    
    try {
        container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <i class="fas fa-shopping-cart"></i>
                    متجر اللعبة
                </h1>
                <div class="header-actions">
                    <div class="user-coins">
                        <i class="fas fa-coins"></i>
                        <span id="user-coins">${AppState.userData?.points || 0}</span>
                        <span class="coins-label">نقطة</span>
                    </div>
                </div>
            </div>
            
            <div class="shop-container">
                <div class="shop-categories">
                    <button class="category-btn active" data-category="all">جميع المنتجات</button>
                    <button class="category-btn" data-category="powerups">معززات اللعب</button>
                    <button class="category-btn" data-category="appearance">المظهر</button>
                    <button class="category-btn" data-category="boosters">معززات الخبرة</button>
                    <button class="category-btn" data-category="special">مميزات خاصة</button>
                </div>
                
                <div class="shop-items-grid" id="shop-items">
                    <div class="loading-section">
                        <div class="loader-spinner"></div>
                        <p>جاري تحميل المنتجات...</p>
                    </div>
                </div>
            </div>
        `;
        
        // إضافة مستمعات الأحداث
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterShopItems(this.dataset.category);
            });
        });
        
        // تحميل منتجات المتجر
        await loadShopItems();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة المتجر:', error);
        container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <i class="fas fa-shopping-cart"></i>
                    متجر اللعبة
                </h1>
            </div>
            <div class="error-section">
                <i class="fas fa-exclamation-triangle"></i>
                <p>حدث خطأ في تحميل المتجر</p>
                <button class="btn btn-primary" onclick="loadShopPage()">إعادة المحاولة</button>
            </div>
        `;
    }
}

// دالة تحميل منتجات المتجر
async function loadShopItems() {
    try {
        const snapshot = await db.collection('shop_items')
            .orderBy('price')
            .limit(50)
            .get();
        
        AppState.shopItems = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        renderShopItems();
        
    } catch (error) {
        console.error('خطأ في تحميل منتجات المتجر:', error);
        // إذا لم تكن هناك منتجات، نستخدم المنتجات الافتراضية
        AppState.shopItems = getDefaultShopItems();
        renderShopItems();
    }
}

// دالة عرض منتجات المتجر
function renderShopItems(items = AppState.shopItems) {
    const shopItemsGrid = document.getElementById('shop-items');
    if (!shopItemsGrid) return;
    
    if (items.length === 0) {
        shopItemsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <p>لا توجد منتجات في المتجر حالياً</p>
                <p>سيتم إضافة منتجات جديدة قريباً</p>
            </div>
        `;
        return;
    }
    
    shopItemsGrid.innerHTML = items.map(item => `
        <div class="shop-item" data-category="${item.category || 'all'}">
            <div class="item-header ${item.rarity || 'common'}">
                ${item.isNew ? '<span class="item-badge new">جديد</span>' : ''}
                ${item.isPopular ? '<span class="item-badge popular">الأكثر مبيعاً</span>' : ''}
            </div>
            <div class="item-body">
                <div class="item-icon">
                    <i class="${item.icon || 'fas fa-gift'}"></i>
                </div>
                <div class="item-info">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-description">${item.description}</p>
                    <div class="item-stats">
                        ${item.duration ? `
                            <div class="item-stat">
                                <i class="fas fa-clock"></i>
                                <span>${item.duration} يوم</span>
                            </div>
                        ` : ''}
                        ${item.effect ? `
                            <div class="item-stat">
                                <i class="fas fa-bolt"></i>
                                <span>${item.effect}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            <div class="item-footer">
                <div class="item-price">
                    <i class="fas fa-coins"></i>
                    <span>${item.price} نقطة</span>
                </div>
                <button class="btn btn-primary buy-btn" 
                        data-id="${item.id}"
                        data-price="${item.price}"
                        ${(AppState.userData?.points || 0) < item.price ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i> شراء
                </button>
            </div>
        </div>
    `).join('');
    
    // إضافة مستمعات الأحداث لأزرار الشراء
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.dataset.id;
            const itemPrice = parseInt(this.dataset.price);
            purchaseItem(itemId, itemPrice);
        });
    });
}

// دالة تحميل صفحة الإعدادات
async function loadSettingsPage() {
    const container = document.getElementById('settings-page');
    if (!container) return;
    
    const settings = AppState.userData?.settings || {};
    
    try {
        container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <i class="fas fa-cog"></i>
                    الإعدادات
                </h1>
                <div class="header-actions">
                    <button class="btn btn-primary" id="save-settings">
                        <i class="fas fa-save"></i> حفظ التغييرات
                    </button>
                </div>
            </div>
            
            <div class="settings-container">
                <div class="settings-tabs">
                    <div class="tabs-header">
                        <button class="tab-btn active" data-tab="general">عام</button>
                        <button class="tab-btn" data-tab="gameplay">إعدادات اللعب</button>
                        <button class="tab-btn" data-tab="notifications">الإشعارات</button>
                        <button class="tab-btn" data-tab="privacy">الخصوصية</button>
                        <button class="tab-btn" data-tab="account">الحساب</button>
                    </div>
                    
                    <div class="tab-content active" id="general-tab">
                        <div class="settings-section">
                            <h3><i class="fas fa-palette"></i> المظهر</h3>
                            <div class="settings-group">
                                <div class="setting-item">
                                    <label class="setting-label">السمة</label>
                                    <div class="theme-selector">
                                        <button class="theme-option ${settings.theme === 'light' ? 'active' : ''}" data-theme="light">
                                            <i class="fas fa-sun"></i>
                                            <span>فاتح</span>
                                        </button>
                                        <button class="theme-option ${settings.theme === 'dark' ? 'active' : ''}" data-theme="dark">
                                            <i class="fas fa-moon"></i>
                                            <span>داكن</span>
                                        </button>
                                        <button class="theme-option ${settings.theme === 'auto' ? 'active' : ''}" data-theme="auto">
                                            <i class="fas fa-adjust"></i>
                                            <span>تلقائي</span>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="setting-item">
                                    <label class="setting-label">لغة الواجهة</label>
                                    <select class="form-control" id="language-select">
                                        <option value="ar" ${settings.language === 'ar' ? 'selected' : ''}>العربية</option>
                                        <option value="en" ${settings.language === 'en' ? 'selected' : ''}>English</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="settings-section">
                            <h3><i class="fas fa-volume-up"></i> الصوت</h3>
                            <div class="settings-group">
                                <div class="setting-item">
                                    <label class="setting-label">
                                        <span>الموسيقى الخلفية</span>
                                        <label class="switch">
                                            <input type="checkbox" id="music-toggle" ${settings.music !== false ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </label>
                                    </label>
                                    <div class="setting-description">تشغيل الموسيقى أثناء اللعب</div>
                                </div>
                                
                                <div class="setting-item">
                                    <label class="setting-label">
                                        <span>المؤثرات الصوتية</span>
                                        <label class="switch">
                                            <input type="checkbox" id="sound-effects-toggle" ${settings.soundEffects !== false ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </label>
                                    </label>
                                    <div class="setting-description">أصوات الأزرار والتحديات</div>
                                </div>
                                
                                <div class="setting-item">
                                    <label class="setting-label">مستوى الصوت</label>
                                    <input type="range" id="volume-slider" min="0" max="100" value="${settings.volume || 50}">
                                    <div class="volume-value" id="volume-value">${settings.volume || 50}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="gameplay-tab">
                        <div class="settings-section">
                            <h3><i class="fas fa-gamepad"></i> إعدادات اللعب</h3>
                            <div class="settings-group">
                                <div class="setting-item">
                                    <label class="setting-label">
                                        <span>الاهتزاز</span>
                                        <label class="switch">
                                            <input type="checkbox" id="vibration-toggle" ${settings.vibration !== false ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </label>
                                    </label>
                                    <div class="setting-description">اهتزاز الجهاز عند الفوز أو الخسارة</div>
                                </div>
                                
                                <div class="setting-item">
                                    <label class="setting-label">
                                        <span>التنبيهات داخل اللعبة</span>
                                        <label class="switch">
                                            <input type="checkbox" id="game-alerts-toggle" ${settings.gameAlerts !== false ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </label>
                                    </label>
                                    <div class="setting-description">عرض تلميحات ونصائح أثناء اللعب</div>
                                </div>
                                
                                <div class="setting-item">
                                    <label class="setting-label">مستوى الصعوبة الافتراضي</label>
                                    <select class="form-control" id="default-difficulty">
                                        <option value="easy" ${settings.defaultDifficulty === 'easy' ? 'selected' : ''}>سهل</option>
                                        <option value="medium" ${settings.defaultDifficulty === 'medium' || !settings.defaultDifficulty ? 'selected' : ''}>متوسط</option>
                                        <option value="hard" ${settings.defaultDifficulty === 'hard' ? 'selected' : ''}>صعب</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="notifications-tab">
                        <div class="settings-section">
                            <h3><i class="fas fa-bell"></i> إعدادات الإشعارات</h3>
                            <div class="settings-group">
                                <div class="setting-item">
                                    <label class="setting-label">
                                        <span>إشعارات التحديات</span>
                                        <label class="switch">
                                            <input type="checkbox" id="challenge-notifications" ${settings.notifications?.challenges !== false ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </label>
                                    </label>
                                    <div class="setting-description">إشعارات عند بدء التحديات الجديدة</div>
                                </div>
                                
                                <div class="setting-item">
                                    <label class="setting-label">
                                        <span>إشعارات الأصدقاء</span>
                                        <label class="switch">
                                            <input type="checkbox" id="friend-notifications" ${settings.notifications?.friends !== false ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </label>
                                    </label>
                                    <div class="setting-description">إشعارات طلبات الصداقة وتحديات الأصدقاء</div>
                                </div>
                                
                                <div class="setting-item">
                                    <label class="setting-label">
                                        <span>إشعارات البطولات</span>
                                        <label class="switch">
                                            <input type="checkbox" id="tournament-notifications" ${settings.notifications?.tournaments !== false ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </label>
                                    </label>
                                    <div class="setting-description">إشعارات البطولات القادمة والنتائج</div>
                                </div>
                                
                                <div class="setting-item">
                                    <label class="setting-label">
                                        <span>إشعارات الإنجازات</span>
                                        <label class="switch">
                                            <input type="checkbox" id="achievement-notifications" ${settings.notifications?.achievements !== false ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </label>
                                    </label>
                                    <div class="setting-description">إشعارات عند تحقيق إنجازات جديدة</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="privacy-tab">
                        <div class="settings-section">
                            <h3><i class="fas fa-shield-alt"></i> إعدادات الخصوصية</h3>
                            <div class="settings-group">
                                <div class="setting-item">
                                    <label class="setting-label">
                                        <span>إظهار حالة الاتصال</span>
                                        <label class="switch">
                                            <input type="checkbox" id="show-status" ${settings.privacy?.showStatus !== false ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </label>
                                    </label>
                                    <div class="setting-description">إظهار حالتك (متصل/غير متصل) للأصدقاء</div>
                                </div>
                                
                                <div class="setting-item">
                                    <label class="setting-label">
                                        <span>الملف الشخصي العام</span>
                                        <label class="switch">
                                            <input type="checkbox" id="public-profile" ${settings.privacy?.publicProfile !== false ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </label>
                                    </label>
                                    <div class="setting-description">إظهار ملفك الشخصي لجميع اللاعبين</div>
                                </div>
                                
                                <div class="setting-item">
                                    <label class="setting-label">
                                        <span>قبول طلبات الصداقة تلقائياً</span>
                                        <label class="switch">
                                            <input type="checkbox" id="auto-accept-friends" ${settings.privacy?.autoAcceptFriends === true ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </label>
                                    </label>
                                    <div class="setting-description">قبول جميع طلبات الصداقة تلقائياً</div>
                                </div>
                                
                                <div class="setting-item">
                                    <label class="setting-label">من يمكنه مراسلتك</label>
                                    <select class="form-control" id="message-privacy">
                                        <option value="all" ${settings.privacy?.messagePrivacy === 'all' ? 'selected' : ''}>الجميع</option>
                                        <option value="friends" ${settings.privacy?.messagePrivacy === 'friends' || !settings.privacy?.messagePrivacy ? 'selected' : ''}>الأصدقاء فقط</option>
                                        <option value="none" ${settings.privacy?.messagePrivacy === 'none' ? 'selected' : ''}>لا أحد</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="account-tab">
                        <div class="settings-section">
                            <h3><i class="fas fa-user-cog"></i> إعدادات الحساب</h3>
                            <div class="settings-group">
                                <div class="setting-item">
                                    <label class="setting-label">تغيير الاسم</label>
                                    <div class="input-with-button">
                                        <input type="text" class="form-control" id="change-name" value="${AppState.userData?.name || ''}">
                                        <button class="btn btn-outline" id="save-name">حفظ</button>
                                    </div>
                                </div>
                                
                                <div class="setting-item">
                                    <label class="setting-label">تغيير اسم المستخدم</label>
                                    <div class="input-with-button">
                                        <input type="text" class="form-control" id="change-username" value="${AppState.userData?.username || ''}">
                                        <button class="btn btn-outline" id="save-username">حفظ</button>
                                    </div>
                                    <div class="setting-description">يظهر للأصدقاء واللاعبين الآخرين</div>
                                </div>
                                
                                <div class="setting-item">
                                    <button class="btn btn-outline" id="change-password">
                                        <i class="fas fa-key"></i> تغيير كلمة المرور
                                    </button>
                                </div>
                                
                                <div class="setting-item danger">
                                    <h4>خيارات متقدمة</h4>
                                    <button class="btn btn-danger" id="delete-account">
                                        <i class="fas fa-trash"></i> حذف الحساب
                                    </button>
                                    <div class="setting-description">تحذير: لا يمكن التراجع عن هذه الخطوة</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // إضافة مستمعات الأحداث
        setupSettingsEventListeners();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة الإعدادات:', error);
        container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <i class="fas fa-cog"></i>
                    الإعدادات
                </h1>
            </div>
            <div class="error-section">
                <i class="fas fa-exclamation-triangle"></i>
                <p>حدث خطأ في تحميل الإعدادات</p>
                <button class="btn btn-primary" onclick="loadSettingsPage()">إعادة المحاولة</button>
            </div>
        `;
    }
}

// ===============================
// وظائف مساعدة جديدة
// ===============================

function getTournamentStatusIcon(status) {
    const icons = {
        upcoming: 'calendar-plus',
        active: 'play-circle',
        finished: 'flag-checkered',
        cancelled: 'times-circle'
    };
    return icons[status] || 'question-circle';
}

function getTournamentStatusText(status) {
    const texts = {
        upcoming: 'قادمة',
        active: 'جارية الآن',
        finished: 'منتهية',
        cancelled: 'ملغاة'
    };
    return texts[status] || status;
}

function getTournamentTypeIcon(type) {
    const icons = {
        speed: 'bolt',
        survival: 'heartbeat',
        marathon: 'running',
        expert: 'crown',
        team: 'users'
    };
    return icons[type] || 'chess-king';
}

function getTournamentTypeText(type) {
    const texts = {
        speed: 'تحدي السرعة',
        survival: 'تحدي البقاء',
        marathon: 'ماراثون الأسئلة',
        expert: 'تحدي الخبراء',
        team: 'تحدي الفرق'
    };
    return texts[type] || type;
}

function calculateCountriesCount() {
    // هذه دالة افتراضية، في التطبيق الحقيقي ستجلب البيانات من قاعدة البيانات
    return 42;
}

function getDefaultShopItems() {
    return [
        {
            id: 'xp-booster-1',
            name: 'معزز الخبرة (1 يوم)',
            description: 'احصل على ضعف الخبرة لمدة 24 ساعة',
            price: 500,
            category: 'boosters',
            icon: 'fas fa-chart-line',
            rarity: 'rare',
            duration: 1,
            effect: '+100% خبرة'
        },
        {
            id: 'points-booster',
            name: 'معزز النقاط',
            description: 'احصل على نقاط إضافية في كل فوز',
            price: 750,
            category: 'boosters',
            icon: 'fas fa-coins',
            rarity: 'epic',
            duration: 3,
            effect: '+50% نقاط'
        },
        {
            id: 'time-extension',
            name: 'تمديد الوقت',
            description: 'احصل على 5 ثواني إضافية لكل سؤال',
            price: 300,
            category: 'powerups',
            icon: 'fas fa-clock',
            rarity: 'common',
            effect: '+5 ثواني'
        },
        {
            id: 'premium-theme',
            name: 'سمة مميزة',
            description: 'سمة داكنة مع ألوان متوهجة',
            price: 1000,
            category: 'appearance',
            icon: 'fas fa-palette',
            rarity: 'legendary',
            isNew: true
        },
        {
            id: 'double-chance',
            name: 'فرصة مزدوجة',
            description: 'احصل على فرصة ثانية للإجابة الصحيحة',
            price: 600,
            category: 'powerups',
            icon: 'fas fa-redo',
            rarity: 'rare',
            effect: 'فرصة ثانية'
        },
        {
            id: 'skip-question',
            name: 'تخطي السؤال',
            description: 'تخطي سؤال صعب واستبداله بآخر',
            price: 400,
            category: 'powerups',
            icon: 'fas fa-forward',
            rarity: 'common',
            isPopular: true
        },
        {
            id: 'profile-badge',
            name: 'شارة الملف الشخصي',
            description: 'شارة مميزة تظهر بجانب اسمك',
            price: 1500,
            category: 'special',
            icon: 'fas fa-award',
            rarity: 'legendary'
        },
        {
            id: 'animated-avatar',
            name: 'صورة رمزية متحركة',
            description: 'صورة رمزية متحركة خاصة بك',
            price: 2000,
            category: 'appearance',
            icon: 'fas fa-user-circle',
            rarity: 'epic'
        }
    ];
}

// ===============================
// إعداد مستمعات الأحداث للإعدادات
// ===============================

function setupSettingsEventListeners() {
    // ألسنة الإعدادات
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const tabId = this.dataset.tab + '-tab';
            document.getElementById(tabId)?.classList.add('active');
        });
    });
    
    // محددات السمة
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // شريط مستوى الصوت
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');
    if (volumeSlider && volumeValue) {
        volumeSlider.addEventListener('input', function() {
            volumeValue.textContent = this.value + '%';
        });
    }
    
    // حفظ الإعدادات
    document.getElementById('save-settings')?.addEventListener('click', saveSettings);
    
    // تغيير الاسم
    document.getElementById('save-name')?.addEventListener('click', async function() {
        const newName = document.getElementById('change-name').value.trim();
        if (newName && AppState.currentUser) {
            try {
                await db.collection('users').doc(AppState.currentUser.uid).update({
                    name: newName,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                
                AppState.userData.name = newName;
                updateUIWithUserData();
                showToast('تم', 'تم تغيير الاسم بنجاح', 'success');
            } catch (error) {
                console.error('خطأ في تغيير الاسم:', error);
                showToast('خطأ', 'فشل في تغيير الاسم', 'error');
            }
        }
    });
    
    // تغيير اسم المستخدم
    document.getElementById('save-username')?.addEventListener('click', async function() {
        const newUsername = document.getElementById('change-username').value.trim();
        if (newUsername && AppState.currentUser) {
            try {
                // التحقق من توفر اسم المستخدم
                const usernameExists = await checkUsernameExists(newUsername);
                if (usernameExists && newUsername !== AppState.userData?.username) {
                    showToast('خطأ', 'اسم المستخدم مستخدم مسبقاً', 'error');
                    return;
                }
                
                await db.collection('users').doc(AppState.currentUser.uid).update({
                    username: newUsername,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                
                AppState.userData.username = newUsername;
                showToast('تم', 'تم تغيير اسم المستخدم بنجاح', 'success');
            } catch (error) {
                console.error('خطأ في تغيير اسم المستخدم:', error);
                showToast('خطأ', 'فشل في تغيير اسم المستخدم', 'error');
            }
        }
    });
    
    // تغيير كلمة المرور
    document.getElementById('change-password')?.addEventListener('click', function() {
        showChangePasswordModal();
    });
    
    // حذف الحساب
    document.getElementById('delete-account')?.addEventListener('click', function() {
        if (confirm('هل أنت متأكد من حذف حسابك؟ هذه العملية لا يمكن التراجع عنها.')) {
            deleteUserAccount();
        }
    });
}

// ===============================
// الدوال الرئيسية الجديدة
// ===============================

async function showCreateTournamentModal() {
    const modal = document.getElementById('tournament-modal');
    if (modal) {
        modal.classList.add('show');
    }
}

function hideCreateTournamentModal() {
    const modal = document.getElementById('tournament-modal');
    if (modal) {
        modal.classList.remove('show');
        document.getElementById('tournament-form')?.reset();
    }
}

async function createTournament() {
    if (!AppState.currentUser) {
        showToast('خطأ', 'يجب تسجيل الدخول أولاً', 'error');
        return;
    }
    
    try {
        const tournamentData = {
            title: document.getElementById('tournament-name').value,
            type: document.getElementById('tournament-type').value,
            maxParticipants: parseInt(document.getElementById('tournament-max-players').value),
            questionCount: parseInt(document.getElementById('tournament-questions').value),
            questionTime: parseInt(document.getElementById('question-time').value),
            difficulty: document.getElementById('tournament-difficulty').value,
            prize: parseInt(document.getElementById('tournament-prize').value),
            description: document.getElementById('tournament-description').value,
            isPrivate: document.getElementById('tournament-private').checked,
            creatorId: AppState.currentUser.uid,
            creatorName: AppState.userData.name,
            status: 'upcoming',
            participants: 1,
            participantsList: [AppState.currentUser.uid],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            startDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // بعد 24 ساعة
        };
        
        const docRef = await db.collection('tournaments').add(tournamentData);
        
        // إضافة المنشئ كأول مشارك
        await db.collection('tournament_participants').add({
            tournamentId: docRef.id,
            userId: AppState.currentUser.uid,
            joinedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        hideCreateTournamentModal();
        showToast('تم', 'تم إنشاء البطولة بنجاح', 'success');
        await loadTournamentsData();
        
    } catch (error) {
        console.error('خطأ في إنشاء البطولة:', error);
        showToast('خطأ', 'فشل في إنشاء البطولة', 'error');
    }
}

async function joinTournament(tournamentId) {
    if (!AppState.currentUser) {
        showToast('خطأ', 'يجب تسجيل الدخول أولاً', 'error');
        return;
    }
    
    try {
        const tournamentRef = db.collection('tournaments').doc(tournamentId);
        const tournamentDoc = await tournamentRef.get();
        
        if (!tournamentDoc.exists) {
            showToast('خطأ', 'البطولة غير موجودة', 'error');
            return;
        }
        
        const tournament = tournamentDoc.data();
        
        // التحقق إذا كان المستخدم منضم بالفعل
        if (tournament.participantsList?.includes(AppState.currentUser.uid)) {
            showToast('معلومات', 'أنت منضم بالفعل للبطولة', 'info');
            return;
        }
        
        // التحقق من السعة
        if (tournament.participants >= tournament.maxParticipants) {
            showToast('خطأ', 'البطولة ممتلئة', 'error');
            return;
        }
        
        // التحقق إذا كانت البطولة خاصة
        if (tournament.isPrivate) {
            showToast('خطأ', 'البطولة خاصة، تحتاج لدعوة للانضمام', 'error');
            return;
        }
        
        // الانضمام للبطولة
        await tournamentRef.update({
            participants: firebase.firestore.FieldValue.increment(1),
            participantsList: firebase.firestore.FieldValue.arrayUnion(AppState.currentUser.uid)
        });
        
        // تسجيل المشاركة
        await db.collection('tournament_participants').add({
            tournamentId: tournamentId,
            userId: AppState.currentUser.uid,
            joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'registered'
        });
        
        // إضافة إشعار للمستخدم
        await addNotification(AppState.currentUser.uid, {
            type: 'tournament',
            title: 'انضمام للبطولة',
            message: `لقد انضممت لبطولة ${tournament.title}`,
            data: { tournamentId: tournamentId }
        });
        
        showToast('تم', 'تم الانضمام للبطولة بنجاح', 'success');
        await loadTournamentsData();
        
    } catch (error) {
        console.error('خطأ في الانضمام للبطولة:', error);
        showToast('خطأ', 'فشل في الانضمام للبطولة', 'error');
    }
}

function filterLeaderboard() {
    const filterValue = document.getElementById('leaderboard-filter').value;
    // هنا يمكن إضافة منطق التصفية حسب النوع المحدد
    loadLeaderboardData();
}

function filterLeaderboardByType(type) {
    // تصفية القائمة حسب النوع (جميع، متصلون، أصدقاء)
    // هذه وظيفة افتراضية، يمكن توسيعها حسب الحاجة
    renderLeaderboard(); // إعادة العرض حالياً
}

function showAddFriendModal() {
    const modal = document.getElementById('add-friend-modal');
    if (modal) {
        modal.classList.add('show');
        loadFriendSuggestions();
    }
}

function hideAddFriendModal() {
    const modal = document.getElementById('add-friend-modal');
    if (modal) {
        modal.classList.remove('show');
        document.getElementById('friend-search').value = '';
        document.getElementById('search-results').innerHTML = '';
    }
}

async function loadFriendSuggestions() {
    try {
        if (!AppState.currentUser) return;
        
        // جلب اقتراحات الأصدقاء (لاعبين غير أصدقاء ومن نفس المستوى تقريباً)
        const suggestionsList = document.getElementById('suggestions-list');
        if (!suggestionsList) return;
        
        // في التطبيق الحقيقي، هنا سيتم جلب الاقتراحات من قاعدة البيانات
        // حالياً نعرض رسالة افتراضية
        suggestionsList.innerHTML = `
            <div class="empty-suggestions">
                <i class="fas fa-user-friends"></i>
                <p>استخدم مربع البحث للعثور على أصدقاء</p>
            </div>
        `;
        
    } catch (error) {
        console.error('خطأ في تحميل اقتراحات الأصدقاء:', error);
    }
}

async function searchFriends() {
    const searchTerm = document.getElementById('friend-search').value.trim();
    const searchResults = document.getElementById('search-results');
    
    if (!searchTerm) {
        searchResults.innerHTML = '';
        return;
    }
    
    try {
        // البحث عن المستخدمين
        const usersSnapshot = await db.collection('users')
            .where('username', '>=', searchTerm)
            .where('username', '<=', searchTerm + '\uf8ff')
            .limit(10)
            .get();
        
        const nameSnapshot = await db.collection('users')
            .where('name', '>=', searchTerm)
            .where('name', '<=', searchTerm + '\uf8ff')
            .limit(10)
            .get();
        
        const allUsers = new Map();
        
        // جمع النتائج بدون تكرار
        [...usersSnapshot.docs, ...nameSnapshot.docs].forEach(doc => {
            if (!allUsers.has(doc.id) && doc.id !== AppState.currentUser?.uid) {
                allUsers.set(doc.id, { id: doc.id, ...doc.data() });
            }
        });
        
        const results = Array.from(allUsers.values());
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>لا توجد نتائج لـ "${searchTerm}"</p>
                </div>
            `;
            return;
        }
        
        searchResults.innerHTML = results.map(user => `
            <div class="search-result-item">
                <div class="result-avatar">
                    ${user.name?.charAt(0) || '?'}
                </div>
                <div class="result-info">
                    <div class="result-name">${user.name || 'مستخدم'}</div>
                    <div class="result-username">@${user.username || 'بدون'}</div>
                    <div class="result-level">المستوى ${user.level || 1}</div>
                </div>
                <div class="result-actions">
                    ${AppState.friends.some(f => f.id === user.id) ? `
                        <button class="btn btn-outline btn-sm" disabled>
                            <i class="fas fa-check"></i> صديق
                        </button>
                    ` : `
                        <button class="btn btn-primary btn-sm" onclick="sendFriendRequest('${user.id}')">
                            <i class="fas fa-user-plus"></i> أضف صديقاً
                        </button>
                    `}
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('خطأ في البحث عن أصدقاء:', error);
        searchResults.innerHTML = `
            <div class="error-results">
                <i class="fas fa-exclamation-circle"></i>
                <p>حدث خطأ أثناء البحث</p>
            </div>
        `;
    }
}

async function sendFriendRequest(friendId) {
    if (!AppState.currentUser) return;
    
    try {
        // التحقق إذا كان هناك طلب صداقة مسبق
        const existingRequest = await db.collection('friend_requests')
            .where('from', '==', AppState.currentUser.uid)
            .where('to', '==', friendId)
            .where('status', '==', 'pending')
            .get();
        
        if (!existingRequest.empty) {
            showToast('معلومات', 'تم إرسال طلب الصداقة مسبقاً', 'info');
            return;
        }
        
        // إرسال طلب الصداقة
        await db.collection('friend_requests').add({
            from: AppState.currentUser.uid,
            fromName: AppState.userData.name,
            to: friendId,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إرسال إشعار للمستخدم
        await addNotification(friendId, {
            type: 'friend_request',
            title: 'طلب صداقة جديد',
            message: `${AppState.userData.name} يريد إضافتك كصديق`,
            data: { from: AppState.currentUser.uid }
        });
        
        hideAddFriendModal();
        showToast('تم', 'تم إرسال طلب الصداقة', 'success');
        
    } catch (error) {
        console.error('خطأ في إرسال طلب الصداقة:', error);
        showToast('خطأ', 'فشل في إرسال طلب الصداقة', 'error');
    }
}

async function loadFriendRequests() {
    try {
        if (!AppState.currentUser) return;
        
        // تحميل طلبات الصداقة الواردة
        const incomingRequests = await db.collection('friend_requests')
            .where('to', '==', AppState.currentUser.uid)
            .where('status', '==', 'pending')
            .orderBy('createdAt', 'desc')
            .get();
        
        // تحميل معلومات المرسلين
        const requestsWithData = await Promise.all(
            incomingRequests.docs.map(async doc => {
                const request = { id: doc.id, ...doc.data() };
                const userDoc = await db.collection('users').doc(request.from).get();
                return {
                    ...request,
                    senderData: userDoc.exists ? userDoc.data() : null
                };
            })
        );
        
        AppState.friendRequests = requestsWithData;
        updateFriendRequestsBadge();
        renderFriendRequests();
        
    } catch (error) {
        console.error('خطأ في تحميل طلبات الصداقة:', error);
    }
}

function updateFriendRequestsBadge() {
    const badge = document.getElementById('requests-badge');
    const friendRequestsBadge = document.getElementById('friend-requests-badge');
    
    if (badge) {
        const count = AppState.friendRequests?.length || 0;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
    
    if (friendRequestsBadge) {
        const count = AppState.friendRequests?.length || 0;
        friendRequestsBadge.textContent = count;
        friendRequestsBadge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
}

function renderFriendRequests() {
    const pendingTab = document.getElementById('pending-requests-tab');
    if (!pendingTab) return;
    
    if (AppState.friendRequests.length === 0) {
        pendingTab.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-user-clock"></i>
                <p>لا توجد طلبات صداقة معلقة</p>
            </div>
        `;
        return;
    }
    
    pendingTab.innerHTML = `
        <div class="requests-list">
            ${AppState.friendRequests.map(request => `
                <div class="request-item">
                    <div class="request-avatar">
                        ${request.senderData?.name?.charAt(0) || '?'}
                    </div>
                    <div class="request-info">
                        <div class="request-name">${request.senderData?.name || 'مستخدم'}</div>
                        <div class="request-details">
                            <span class="request-level">المستوى ${request.senderData?.level || 1}</span>
                            <span class="request-time">${formatDate(request.createdAt?.toDate())}</span>
                        </div>
                        <div class="request-message">يريد إضافتك كصديق</div>
                    </div>
                    <div class="request-actions">
                        <button class="btn btn-success btn-sm" onclick="acceptFriendRequest('${request.id}', '${request.from}')">
                            <i class="fas fa-check"></i> قبول
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="rejectFriendRequest('${request.id}')">
                            <i class="fas fa-times"></i> رفض
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

async function acceptFriendRequest(requestId, friendId) {
    try {
        if (!AppState.currentUser) return;
        
        // تحديث حالة طلب الصداقة
        await db.collection('friend_requests').doc(requestId).update({
            status: 'accepted',
            respondedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إضافة الصديق لكلا الطرفين
        const batch = db.batch();
        
        // إضافة للمستخدم الحالي
        const currentUserRef = db.collection('users').doc(AppState.currentUser.uid);
        batch.update(currentUserRef, {
            friends: firebase.firestore.FieldValue.arrayUnion(friendId),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إضافة للصديق
        const friendRef = db.collection('users').doc(friendId);
        batch.update(friendRef, {
            friends: firebase.firestore.FieldValue.arrayUnion(AppState.currentUser.uid),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        await batch.commit();
        
        // إرسال إشعار للصديق
        await addNotification(friendId, {
            type: 'friend_request_accepted',
            title: 'تم قبول طلب الصداقة',
            message: `${AppState.userData.name} قبل طلب صداقتك`,
            data: { friendId: AppState.currentUser.uid }
        });
        
        showToast('تم', 'تم قبول طلب الصداقة', 'success');
        
        // تحديث البيانات
        await loadFriendsData();
        await loadFriendRequests();
        
    } catch (error) {
        console.error('خطأ في قبول طلب الصداقة:', error);
        showToast('خطأ', 'فشل في قبول طلب الصداقة', 'error');
    }
}

async function rejectFriendRequest(requestId) {
    try {
        await db.collection('friend_requests').doc(requestId).update({
            status: 'rejected',
            respondedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showToast('تم', 'تم رفض طلب الصداقة', 'info');
        await loadFriendRequests();
        
    } catch (error) {
        console.error('خطأ في رفض طلب الصداقة:', error);
        showToast('خطأ', 'فشل في رفض طلب الصداقة', 'error');
    }
}

async function removeFriend(friendId) {
    if (!confirm('هل أنت متأكد من إزالة هذا الصديق؟')) {
        return;
    }
    
    try {
        if (!AppState.currentUser) return;
        
        const batch = db.batch();
        
        // إزالة من قائمة أصدقاء المستخدم الحالي
        const currentUserRef = db.collection('users').doc(AppState.currentUser.uid);
        batch.update(currentUserRef, {
            friends: firebase.firestore.FieldValue.arrayRemove(friendId),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إزالة من قائمة أصدقاء الصديق
        const friendRef = db.collection('users').doc(friendId);
        batch.update(friendRef, {
            friends: firebase.firestore.FieldValue.arrayRemove(AppState.currentUser.uid),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        await batch.commit();
        
        showToast('تم', 'تم إزالة الصديق', 'success');
        await loadFriendsData();
        
    } catch (error) {
        console.error('خطأ في إزالة الصديق:', error);
        showToast('خطأ', 'فشل في إزالة الصديق', 'error');
    }
}

async function challengeFriend(friendId) {
    if (!AppState.currentUser) return;
    
    try {
        const friendDoc = await db.collection('users').doc(friendId).get();
        if (!friendDoc.exists) {
            showToast('خطأ', 'الصديق غير موجود', 'error');
            return;
        }
        
        const friendData = friendDoc.data();
        
        // إنشاء تحدٍ خاص
        const challengeData = {
            type: 'private',
            creatorId: AppState.currentUser.uid,
            creatorName: AppState.userData.name,
            opponentId: friendId,
            opponentName: friendData.name,
            status: 'waiting',
            players: [AppState.currentUser.uid, friendId],
            maxPlayers: 2,
            settings: {
                timeLimit: 300,
                questionCount: 10,
                difficulty: 'medium'
            },
            isPrivate: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        const challengeRef = await db.collection('challenges').add(challengeData);
        
        // إرسال إشعار للصديق
        await addNotification(friendId, {
            type: 'challenge',
            title: 'تحدي جديد من صديق',
            message: `${AppState.userData.name} يدعوك لتحدي`,
            data: { challengeId: challengeRef.id }
        });
        
        showToast('تم', 'تم إرسال التحدي للصديق', 'success');
        
    } catch (error) {
        console.error('خطأ في تحدى الصديق:', error);
        showToast('خطأ', 'فشل في إرسال التحدي', 'error');
    }
}

function filterShopItems(category) {
    const items = category === 'all' 
        ? AppState.shopItems 
        : AppState.shopItems.filter(item => item.category === category);
    renderShopItems(items);
}

async function purchaseItem(itemId, itemPrice) {
    if (!AppState.currentUser) {
        showToast('خطأ', 'يجب تسجيل الدخول أولاً', 'error');
        return;
    }
    
    if ((AppState.userData?.points || 0) < itemPrice) {
        showToast('خطأ', 'نقاطك غير كافية لشراء هذا المنتج', 'error');
        return;
    }
    
    try {
        const itemDoc = await db.collection('shop_items').doc(itemId).get();
        if (!itemDoc.exists) {
            showToast('خطأ', 'المنتج غير موجود', 'error');
            return;
        }
        
        const item = itemDoc.data();
        
        // خصم النقاط
        await db.collection('users').doc(AppState.currentUser.uid).update({
            points: firebase.firestore.FieldValue.increment(-itemPrice),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // تسجيل عملية الشراء
        await db.collection('purchases').add({
            userId: AppState.currentUser.uid,
            itemId: itemId,
            itemName: item.name,
            price: itemPrice,
            purchasedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إضافة المنتج للمستخدم
        await db.collection('user_items').add({
            userId: AppState.currentUser.uid,
            itemId: itemId,
            itemData: item,
            purchasedAt: firebase.firestore.FieldValue.serverTimestamp(),
            expiresAt: item.duration ? 
                new Date(Date.now() + item.duration * 24 * 60 * 60 * 1000) : null
        });
        
        // تحديث بيانات المستخدم المحلية
        AppState.userData.points = (AppState.userData.points || 0) - itemPrice;
        updateUIWithUserData();
        
        showToast('تم الشراء', `تم شراء ${item.name} بنجاح`, 'success');
        
        // إعادة تحميل صفحة المتجر
        await loadShopItems();
        
    } catch (error) {
        console.error('خطأ في شراء المنتج:', error);
        showToast('خطأ', 'فشل في إتمام عملية الشراء', 'error');
    }
}

async function saveSettings() {
    if (!AppState.currentUser) return;
    
    try {
        const settings = {
            theme: document.querySelector('.theme-option.active')?.dataset.theme || 'light',
            language: document.getElementById('language-select').value,
            music: document.getElementById('music-toggle').checked,
            soundEffects: document.getElementById('sound-effects-toggle').checked,
            volume: parseInt(document.getElementById('volume-slider').value),
            vibration: document.getElementById('vibration-toggle').checked,
            gameAlerts: document.getElementById('game-alerts-toggle').checked,
            defaultDifficulty: document.getElementById('default-difficulty').value,
            notifications: {
                challenges: document.getElementById('challenge-notifications').checked,
                friends: document.getElementById('friend-notifications').checked,
                tournaments: document.getElementById('tournament-notifications').checked,
                achievements: document.getElementById('achievement-notifications').checked
            },
            privacy: {
                showStatus: document.getElementById('show-status').checked,
                publicProfile: document.getElementById('public-profile').checked,
                autoAcceptFriends: document.getElementById('auto-accept-friends').checked,
                messagePrivacy: document.getElementById('message-privacy').value
            }
        };
        
        await db.collection('users').doc(AppState.currentUser.uid).update({
            settings: settings,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // تحديث البيانات المحلية
        if (AppState.userData) {
            AppState.userData.settings = settings;
        }
        
        // تطبيق السمة المحددة
        if (settings.theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        } else if (settings.theme === 'light') {
            document.body.setAttribute('data-theme', 'light');
        } else {
            // تلقائي - استخدام تفضيل النظام
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.setAttribute('data-theme', 'dark');
            } else {
                document.body.setAttribute('data-theme', 'light');
            }
        }
        
        showToast('تم', 'تم حفظ الإعدادات بنجاح', 'success');
        
    } catch (error) {
        console.error('خطأ في حفظ الإعدادات:', error);
        showToast('خطأ', 'فشل في حفظ الإعدادات', 'error');
    }
}

function showChangePasswordModal() {
    const modalHtml = `
        <div class="modal" id="change-password-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>تغيير كلمة المرور</h3>
                    <button class="close-modal" id="close-password-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="password-form">
                        <div class="form-group">
                            <label class="form-label">كلمة المرور الحالية</label>
                            <input type="password" class="form-control" id="current-password" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">كلمة المرور الجديدة</label>
                            <input type="password" class="form-control" id="new-password" required minlength="6">
                        </div>
                        <div class="form-group">
                            <label class="form-label">تأكيد كلمة المرور الجديدة</label>
                            <input type="password" class="form-control" id="confirm-password" required minlength="6">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancel-password">إلغاء</button>
                    <button class="btn btn-primary" id="save-password">تغيير كلمة المرور</button>
                </div>
            </div>
        </div>
    `;
    
    // إضافة النموذج للصفحة
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer.firstElementChild);
    
    const modal = document.getElementById('change-password-modal');
    modal.classList.add('show');
    
    // إضافة مستمعات الأحداث
    document.getElementById('close-password-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    document.getElementById('cancel-password').addEventListener('click', () => {
        modal.remove();
    });
    
    document.getElementById('save-password').addEventListener('click', changePassword);
}

async function changePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (newPassword !== confirmPassword) {
        showToast('خطأ', 'كلمتا المرور غير متطابقتين', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showToast('خطأ', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
        return;
    }
    
    try {
        const user = auth.currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            currentPassword
        );
        
        // إعادة المصادقة
        await user.reauthenticateWithCredential(credential);
        
        // تغيير كلمة المرور
        await user.updatePassword(newPassword);
        
        document.getElementById('change-password-modal').remove();
        showToast('تم', 'تم تغيير كلمة المرور بنجاح', 'success');
        
    } catch (error) {
        console.error('خطأ في تغيير كلمة المرور:', error);
        if (error.code === 'auth/wrong-password') {
            showToast('خطأ', 'كلمة المرور الحالية غير صحيحة', 'error');
        } else {
            showToast('خطأ', 'فشل في تغيير كلمة المرور', 'error');
        }
    }
}

async function deleteUserAccount() {
    if (!confirm('هل أنت متأكد من حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه وسيتم حذف جميع بياناتك.')) {
        return;
    }
    
    try {
        // حذف بيانات المستخدم من Firestore
        await db.collection('users').doc(AppState.currentUser.uid).delete();
        
        // حذف الحساب من Firebase Auth
        await AppState.currentUser.delete();
        
        showToast('تم', 'تم حذف حسابك بنجاح', 'success');
        showAuth();
        
    } catch (error) {
        console.error('خطأ في حذف الحساب:', error);
        showToast('خطأ', 'فشل في حذف الحساب', 'error');
    }
}

// ===============================
// تحديث دالة loadPageContent الرئيسية
// ===============================

async function loadPageContent(page) {
    console.log('تحميل محتوى الصفحة:', page);
    
    switch (page) {
        case 'dashboard':
            // لوحة التحكم مُحملة بالفعل
            break;
            
        case 'challenges':
            await loadChallengesPage();
            break;
            
        case 'tournaments':
            await loadTournamentsPage();
            break;
            
        case 'leaderboard':
            await loadLeaderboardPage();
            break;
            
        case 'friends':
            await loadFriendsPage();
            break;
            
        case 'shop':
            await loadShopPage();
            break;
            
        case 'profile':
            await loadProfilePage();
            break;
            
        case 'settings':
            await loadSettingsPage();
            break;
            
        case 'admin':
            if (AppState.isAdmin) {
                await admin.loadAdminData();
            } else {
                navigateTo('dashboard');
                showToast('غير مصرح', 'ليس لديك صلاحية الوصول', 'error');
            }
            break;
            
        case 'help':
            loadHelpPage();
            break;
    }
}

// ===============================
// تحديث دالة initApp لإضافة البحث عن الأصدقاء
// ===============================

function setupAdditionalEventListeners() {
    // تحديث التحديات
    document.getElementById('refresh-challenges')?.addEventListener('click', loadChallenges);
    
    // البحث عن الأصدقاء
    const friendSearch = document.getElementById('friend-search');
    if (friendSearch) {
        let searchTimeout;
        friendSearch.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchFriends();
            }, 500);
        });
    }
    
    // الانضمام للتحديات
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('join-challenge-btn')) {
            const challengeId = e.target.dataset.id;
            await joinChallenge(challengeId);
        }
        
        if (e.target.classList.contains('join-tournament')) {
            const tournamentId = e.target.dataset.id;
            await joinTournament(tournamentId);
        }
    });
    
    // تحديث لوحة التحكم
    document.getElementById('refresh-dashboard')?.addEventListener('click', async () => {
        if (AppState.currentUser) {
            await Promise.all([
                loadUserData(AppState.currentUser.uid),
                loadChallenges(),
                loadTournaments(),
                loadNotifications(),
                loadFriendsData(),
                loadLeaderboardData()
            ]);
            showToast('تم التحديث', 'تم تحديث جميع البيانات', 'success');
        }
    });
}

// ===============================
// تحديث دالة loadUserData
// ===============================

async function loadUserData(uid) {
    try {
        const doc = await db.collection('users').doc(uid).get();
        if (doc.exists) {
            AppState.userData = doc.data();
            updateUIWithUserData();
            
            AppState.isAdmin = AppState.userData.isAdmin || false;
            if (AppState.isAdmin) {
                document.getElementById('admin-menu-item').style.display = 'flex';
            }
            
            // تحميل جميع البيانات في الخلفية
            setTimeout(async () => {
                await Promise.all([
                    loadQuestions(),
                    loadFriendsData(),
                    loadNotifications(),
                    loadLeaderboardData(),
                    loadTournamentsData(),
                    loadChallenges(),
                    loadFriendRequests()
                ]);
            }, 1000);
        }
    } catch (error) {
        console.error('خطأ في تحميل بيانات المستخدم:', error);
    }
}

// ===============================
// تصدير الدوال للاستخدام العام
// ===============================

window.loadTournamentsPage = loadTournamentsPage;
window.loadLeaderboardPage = loadLeaderboardPage;
window.loadFriendsPage = loadFriendsPage;
window.loadShopPage = loadShopPage;
window.loadSettingsPage = loadSettingsPage;
window.joinTournament = joinTournament;
window.sendFriendRequest = sendFriendRequest;
window.acceptFriendRequest = acceptFriendRequest;
window.rejectFriendRequest = rejectFriendRequest;
window.removeFriend = removeFriend;
window.challengeFriend = challengeFriend;
window.purchaseItem = purchaseItem;

// تصدير الدوال للاستخدام العام
window.startChallenge = (challengeId) => game.startChallenge(challengeId);
window.leaveGame = () => game.leaveGame();
window.admin = admin;
