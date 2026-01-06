import { getAppState } from '../state/appState.js';
import { db } from '../firebase/config.js';
import { showToast, createModal, showErrorPage } from '../components/ui.js';
import { formatDate } from '../utils/formatters.js';

export async function loadTournamentsPage() {
    const container = document.getElementById('tournaments-page');
    if (!container) return;
    
    try {
        container.innerHTML = getTournamentsPageHTML();
        
        // إضافة مستمعات الأحداث
        setupTournamentsEventListeners();
        
        // تحميل البطولات
        await loadTournamentsData();
        
        // بعد تحميل البيانات، عرض المحتوى
        renderTournamentsPage();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة البطولات:', error);
        showErrorPage(container, 'البطولات', 'loadTournamentsPage');
    }
}

function getTournamentsPageHTML() {
    return `
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
        
        <div class="loading-section">
            <div class="loader-spinner"></div>
            <p>جاري تحميل البطولات...</p>
        </div>
    `;
}

function setupTournamentsEventListeners() {
    document.getElementById('create-tournament')?.addEventListener('click', showCreateTournamentModal);
    document.getElementById('refresh-tournaments')?.addEventListener('click', () => loadTournamentsPage());
}

async function loadTournamentsData() {
    try {
        const snapshot = await db.collection('tournaments')
            .where('status', 'in', ['upcoming', 'active'])
            .orderBy('startDate')
            .limit(20)
            .get();
        
        const tournaments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        // تحديث حالة التطبيق
        import('../state/appState.js').then(module => {
            module.updateAppState({ tournaments });
        });
        
    } catch (error) {
        console.error('خطأ في تحميل البطولات:', error);
        throw error;
    }
}

function renderTournamentsPage() {
    const container = document.getElementById('tournaments-page');
    if (!container) return;
    
    const { tournaments } = getAppState();
    
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
            ${renderTournamentsGrid(tournaments)}
            
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
                            ${renderTournamentsTable(tournaments)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // إعادة إضافة مستمعات الأحداث
    setupTournamentsEventListeners();
    setupTournamentButtons();
}

function renderTournamentsGrid(tournaments) {
    if (tournaments.length === 0) {
        return `
            <div class="empty-state">
                <i class="fas fa-chess-king"></i>
                <p>لا توجد بطولات حالياً</p>
                <button class="btn btn-primary" id="create-first-tournament">أنشئ أول بطولة</button>
            </div>
        `;
    }
    
    const topTournaments = tournaments.slice(0, 3);
    
    return `
        <div class="tournaments-grid" id="tournaments-grid">
            ${topTournaments.map(tournament => `
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
            `).join('')}
        </div>
    `;
}

function renderTournamentsTable(tournaments) {
    if (tournaments.length === 0) return '';
    
    return tournaments.map(tournament => `
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
                </div>
            </td>
        </tr>
    `).join('');
}

function setupTournamentButtons() {
    // أزرار الانضمام للبطولات
    document.querySelectorAll('.join-tournament-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tournamentId = this.dataset.id;
            joinTournament(tournamentId);
        });
    });
    
    // إنشاء أول بطولة
    document.getElementById('create-first-tournament')?.addEventListener('click', showCreateTournamentModal);
}

function showCreateTournamentModal() {
    const modal = createModal('إنشاء بطولة جديدة', `
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
    `, [
        { text: 'إلغاء', class: 'btn-secondary', action: 'close' },
        { text: 'إنشاء البطولة', class: 'btn-primary', action: 'create' }
    ]);
    
    modal.show();
    
    modal.element.querySelector('button[data-action="create"]').addEventListener('click', async () => {
        await createTournament();
        modal.hide();
    });
}

async function createTournament() {
    const { currentUser, userData } = getAppState();
    
    if (!currentUser) {
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
            creatorId: currentUser.uid,
            creatorName: userData.name,
            status: 'upcoming',
            participants: 1,
            participantsList: [currentUser.uid],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            startDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // بعد 24 ساعة
        };
        
        const docRef = await db.collection('tournaments').add(tournamentData);
        
        // إضافة المنشئ كأول مشارك
        await db.collection('tournament_participants').add({
            tournamentId: docRef.id,
            userId: currentUser.uid,
            joinedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showToast('تم', 'تم إنشاء البطولة بنجاح', 'success');
        await loadTournamentsData();
        renderTournamentsPage();
        
    } catch (error) {
        console.error('خطأ في إنشاء البطولة:', error);
        showToast('خطأ', 'فشل في إنشاء البطولة', 'error');
    }
}

export async function joinTournament(tournamentId) {
    const { currentUser, userData } = getAppState();
    
    if (!currentUser) {
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
        if (tournament.participantsList?.includes(currentUser.uid)) {
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
            participantsList: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
        });
        
        // تسجيل المشاركة
        await db.collection('tournament_participants').add({
            tournamentId: tournamentId,
            userId: currentUser.uid,
            joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'registered'
        });
        
        // إضافة إشعار للمستخدم
        await import('../firebase/database.js').then(module => {
            module.addNotification(currentUser.uid, {
                type: 'tournament',
                title: 'انضمام للبطولة',
                message: `لقد انضممت لبطولة ${tournament.title}`,
                data: { tournamentId: tournamentId }
            });
        });
        
        showToast('تم', 'تم الانضمام للبطولة بنجاح', 'success');
        await loadTournamentsData();
        renderTournamentsPage();
        
    } catch (error) {
        console.error('خطأ في الانضمام للبطولة:', error);
        showToast('خطأ', 'فشل في الانضمام للبطولة', 'error');
    }
}

// وظائف مساعدة
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

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}