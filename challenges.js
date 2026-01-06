import { getAppState } from '../state/appState.js';
import { db } from '../firebase/config.js';
import { showToast, createModal, showErrorPage } from '../components/ui.js';
import { joinChallenge, createChallenge as createChallengeDB } from '../firebase/database.js';
import { formatTime, getChallengeTypeName } from '../utils/formatters.js';
import { shuffleArray } from '../utils/helpers.js';

export async function loadChallengesPage() {
    const container = document.getElementById('challenges-page');
    if (!container) return;
    
    // إذا كان المحتوى موجوداً بالفعل، لا تعيد تحميله
    if (container.querySelector('.challenges-container')) {
        return;
    }
    
    try {
        container.innerHTML = getChallengesPageHTML();
        
        // إضافة مستمعات الأحداث
        setupChallengesEventListeners();
        
        // تحميل التحديات
        await loadChallenges();
        
        // بعد تحميل البيانات، عرض المحتوى
        renderChallengesPage();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة التحديات:', error);
        showErrorPage(container, 'التحديات', 'loadChallengesPage');
    }
}

function getChallengesPageHTML() {
    return `
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
}

function setupChallengesEventListeners() {
    document.getElementById('create-challenge')?.addEventListener('click', showCreateChallengeModal);
    document.getElementById('refresh-challenges')?.addEventListener('click', () => loadChallengesPage());
}

async function loadChallenges() {
    try {
        const snapshot = await db.collection('challenges')
            .where('status', 'in', ['waiting', 'active'])
            .orderBy('createdAt', 'desc')
            .limit(20)
            .get();
        
        const challenges = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        // تحديث حالة التطبيق
        import('../state/appState.js').then(module => {
            module.updateAppState({ challenges });
        });
        
    } catch (error) {
        console.error('خطأ في تحميل التحديات:', error);
        throw error;
    }
}

function renderChallengesPage() {
    const container = document.getElementById('challenges-page');
    if (!container) return;
    
    const { challenges } = getAppState();
    
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
                    ${renderIndividualChallenges(challenges)}
                </div>
            </div>
            
            <div class="challenge-category">
                <h2><i class="fas fa-users"></i> التحديات الجماعية</h2>
                <p>تحدى أصدقاءك ولاعبين آخرين</p>
                <div class="challenges-list" id="multiplayer-challenges">
                    ${renderMultiplayerChallenges(challenges)}
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
    
    // إعادة إضافة مستمعات الأحداث
    setupChallengesEventListeners();
    setupChallengeButtons();
}

function renderIndividualChallenges(challenges) {
    const individualChallenges = challenges.filter(c => c.type === 'individual');
    
    if (individualChallenges.length === 0) {
        return `
            <div class="empty-challenge">
                <i class="fas fa-user"></i>
                <p>لا توجد تحديات فردية حالياً</p>
                <button class="btn btn-outline create-individual-challenge">أنشئ تحدياً فردياً</button>
            </div>
        `;
    }
    
    return individualChallenges.map(challenge => `
        <div class="challenge-item" data-id="${challenge.id}">
            <div class="challenge-header">
                <div>
                    <div class="challenge-title">${challenge.creatorName || 'مجهول'}</div>
                    <div class="challenge-type-badge">فردي</div>
                </div>
                <div class="challenge-status ${challenge.status}">
                    ${challenge.status === 'waiting' ? 'بانتظار اللاعبين' : 'جاري'}
                </div>
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
    `).join('');
}

function renderMultiplayerChallenges(challenges) {
    const multiplayerChallenges = challenges.filter(c => c.type !== 'individual');
    
    if (multiplayerChallenges.length === 0) {
        return `
            <div class="empty-challenge">
                <i class="fas fa-users"></i>
                <p>لا توجد تحديات جماعية حالياً</p>
                <button class="btn btn-outline create-multiplayer-challenge">أنشئ تحدياً جماعياً</button>
            </div>
        `;
    }
    
    return multiplayerChallenges.map(challenge => `
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
                ${(challenge.players?.slice(0, 3) || []).map(playerId => `
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
    `).join('');
}

function setupChallengeButtons() {
    // أزرار الانضمام للتحديات
    document.querySelectorAll('.join-challenge-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const challengeId = this.dataset.id;
            joinChallenge(challengeId);
        });
    });
    
    // تحديات سريعة
    document.querySelectorAll('.quick-challenge-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            createChallengeDB(type);
        });
    });
    
    // إنشاء تحديات جديدة
    document.querySelector('.create-individual-challenge')?.addEventListener('click', () => {
        createChallengeDB('individual');
    });
    
    document.querySelector('.create-multiplayer-challenge')?.addEventListener('click', () => {
        createChallengeDB('speed');
    });
}

function showCreateChallengeModal() {
    const modal = createModal('إنشاء تحدٍ جديد', `
        <div class="create-challenge-form">
            <div class="form-group">
                <label class="form-label">نوع التحدي</label>
                <select class="form-control" id="challenge-type">
                    <option value="individual">فردي</option>
                    <option value="speed">تحدي السرعة</option>
                    <option value="time">تحدي الوقت</option>
                    <option value="comprehensive">تحدي شامل</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">عدد الأسئلة</label>
                <select class="form-control" id="challenge-questions">
                    <option value="5">5 أسئلة</option>
                    <option value="10" selected>10 أسئلة</option>
                    <option value="15">15 أسئلة</option>
                    <option value="20">20 أسئلة</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">مستوى الصعوبة</label>
                <select class="form-control" id="challenge-difficulty">
                    <option value="easy">سهل</option>
                    <option value="medium" selected>متوسط</option>
                    <option value="hard">صعب</option>
                    <option value="mixed">مختلط</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">الوقت لكل سؤال (ثانية)</label>
                <input type="number" class="form-control" id="challenge-time" min="10" max="60" value="30">
            </div>
            
            <div class="form-group">
                <label class="form-label">
                    <input type="checkbox" id="challenge-private">
                    <span>تحدي خاص</span>
                </label>
            </div>
        </div>
    `, [
        { text: 'إلغاء', class: 'btn-secondary', action: 'close' },
        { text: 'إنشاء التحدي', class: 'btn-primary', action: 'create' }
    ]);
    
    modal.show();
    
    modal.element.querySelector('button[data-action="create"]').addEventListener('click', () => {
        const type = document.getElementById('challenge-type').value;
        createChallengeDB(type);
        modal.hide();
    });
}

// تصدير الدوال المطلوبة
export { createChallengeDB as createChallenge };