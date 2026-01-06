import { getAppState } from '../state/appState.js';
import { showToast, showErrorPage } from '../components/ui.js';
import { formatPoints } from '../utils/formatters.js';

export async function loadProfilePage() {
    const container = document.getElementById('profile-page');
    if (!container) return;
    
    try {
        container.innerHTML = getProfilePageHTML();
        
        // إضافة مستمعات الأحداث
        setupProfileEventListeners();
        
        // تحميل بيانات الملف الشخصي
        await loadProfileData();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة الملف الشخصي:', error);
        showErrorPage(container, 'الملف الشخصي', 'loadProfilePage');
    }
}

function getProfilePageHTML() {
    const { userData } = getAppState();
    
    return `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-user-circle"></i>
                الملف الشخصي
            </h1>
            <button class="btn btn-outline" id="edit-profile">
                <i class="fas fa-edit"></i> تعديل الملف
            </button>
        </div>
        
        <div class="loading-section">
            <div class="loader-spinner"></div>
            <p>جاري تحميل بيانات الملف الشخصي...</p>
        </div>
    `;
}

function setupProfileEventListeners() {
    document.getElementById('edit-profile')?.addEventListener('click', showEditProfileModal);
}

async function loadProfileData() {
    // البيانات محملة بالفعل في loadUserData
    // نحتاج فقط لعرضها
    renderProfilePage();
}

function renderProfilePage() {
    const container = document.getElementById('profile-page');
    if (!container) return;
    
    const { userData } = getAppState();
    
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
                    ${userData?.name?.charAt(0) || '?'}
                </div>
                <div class="profile-info">
                    <h2>${userData?.name || 'مستخدم'}</h2>
                    <p class="username">@${userData?.username || 'بدون'}</p>
                    <div class="profile-stats">
                        <div class="stat">
                            <div class="stat-value">#${userData?.rank || 0}</div>
                            <div class="stat-label">الترتيب</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${userData?.level || 1}</div>
                            <div class="stat-label">المستوى</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${formatPoints(userData?.points || 0)}</div>
                            <div class="stat-label">النقاط</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="profile-content">
                <div class="profile-section">
                    <h3><i class="fas fa-trophy"></i> الإنجازات</h3>
                    <div class="achievements-preview">
                        ${renderAchievements(userData?.achievements || [])}
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
                                <div class="stat-value">${userData?.matches || 0}</div>
                                <div class="stat-label">المباريات</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value">${userData?.wins || 0}</div>
                                <div class="stat-label">الانتصارات</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value">${calculateWinRate(userData)}%</div>
                                <div class="stat-label">معدل الفوز</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-fire"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value">${userData?.streak || 0}</div>
                                <div class="stat-label">سلسلة الانتصارات</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="profile-section">
                    <h3><i class="fas fa-info-circle"></i> معلومات الحساب</h3>
                    <div class="account-info">
                        <div class="info-item">
                            <span class="info-label">البريد الإلكتروني:</span>
                            <span class="info-value">${userData?.email || 'غير محدد'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">تاريخ الإنشاء:</span>
                            <span class="info-value">${formatDate(userData?.createdAt?.toDate())}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">آخر تسجيل دخول:</span>
                            <span class="info-value">${formatDate(userData?.lastLogin?.toDate())}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إعادة إضافة مستمعات الأحداث
    setupProfileEventListeners();
}

function renderAchievements(achievements) {
    if (achievements.length === 0) {
        return `<p class="empty-state">لا توجد إنجازات بعد</p>`;
    }
    
    return achievements.slice(0, 6).map(achievement => `
        <div class="achievement-badge">
            <i class="fas fa-medal"></i>
            <span>${achievement}</span>
        </div>
    `).join('');
}

function calculateWinRate(userData) {
    if (!userData || !userData.matches || userData.matches === 0) {
        return 0;
    }
    return Math.round((userData.wins || 0) / userData.matches * 100);
}

function formatDate(date) {
    if (!date) return 'غير محدد';
    try {
        const dateObj = date.toDate ? date.toDate() : new Date(date);
        return dateObj.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return 'غير محدد';
    }
}

function showEditProfileModal() {
    const { userData } = getAppState();
    
    const modal = createModal('تعديل الملف الشخصي', `
        <div class="edit-profile-form">
            <div class="form-group">
                <label class="form-label">الاسم الكامل</label>
                <input type="text" class="form-control" id="edit-name" value="${userData?.name || ''}">
            </div>
            
            <div class="form-group">
                <label class="form-label">اسم المستخدم</label>
                <input type="text" class="form-control" id="edit-username" value="${userData?.username || ''}">
                <small class="form-text">سيظهر هذا الاسم للأصدقاء واللاعبين الآخرين</small>
            </div>
            
            <div class="form-group">
                <label class="form-label">نبذة عنك</label>
                <textarea class="form-control" id="edit-bio" rows="3" placeholder="أخبرنا عن نفسك...">${userData?.bio || ''}</textarea>
            </div>
            
            <div class="form-group">
                <label class="form-label">البلد</label>
                <select class="form-control" id="edit-country">
                    <option value="">اختر بلدك</option>
                    <option value="sa" ${userData?.country === 'sa' ? 'selected' : ''}>السعودية</option>
                    <option value="ae" ${userData?.country === 'ae' ? 'selected' : ''}>الإمارات</option>
                    <option value="eg" ${userData?.country === 'eg' ? 'selected' : ''}>مصر</option>
                    <option value="jo" ${userData?.country === 'jo' ? 'selected' : ''}>الأردن</option>
                    <option value="lb" ${userData?.country === 'lb' ? 'selected' : ''}>لبنان</option>
                    <option value="kw" ${userData?.country === 'kw' ? 'selected' : ''}>الكويت</option>
                    <option value="qa" ${userData?.country === 'qa' ? 'selected' : ''}>قطر</option>
                    <option value="bh" ${userData?.country === 'bh' ? 'selected' : ''}>البحرين</option>
                    <option value="om" ${userData?.country === 'om' ? 'selected' : ''}>عُمان</option>
                </select>
            </div>
        </div>
    `, [
        { text: 'إلغاء', class: 'btn-secondary', action: 'close' },
        { text: 'حفظ التغييرات', class: 'btn-primary', action: 'save' }
    ]);
    
    modal.show();
    
    modal.element.querySelector('button[data-action="save"]').addEventListener('click', async () => {
        await updateProfile();
        modal.hide();
    });
}

async function updateProfile() {
    const { currentUser, userData } = getAppState();
    
    if (!currentUser) return;
    
    try {
        const updates = {
            name: document.getElementById('edit-name').value.trim(),
            username: document.getElementById('edit-username').value.trim(),
            bio: document.getElementById('edit-bio').value.trim(),
            country: document.getElementById('edit-country').value,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        // التحقق من صحة البيانات
        if (!updates.name) {
            showToast('خطأ', 'الاسم الكامل مطلوب', 'error');
            return;
        }
        
        if (!updates.username) {
            showToast('خطأ', 'اسم المستخدم مطلوب', 'error');
            return;
        }
        
        // التحقق من توفر اسم المستخدم
        if (updates.username !== userData?.username) {
            const db = firebase.firestore();
            const usernameExists = await db.collection('users')
                .where('username', '==', updates.username)
                .get()
                .then(snapshot => !snapshot.empty);
            
            if (usernameExists) {
                showToast('خطأ', 'اسم المستخدم مستخدم مسبقاً', 'error');
                return;
            }
        }
        
        // تحديث البيانات في قاعدة البيانات
        await db.collection('users').doc(currentUser.uid).update(updates);
        
        // تحديث البيانات المحلية
        import('../state/appState.js').then(module => {
            module.updateAppStateProperty('userData', {
                ...userData,
                ...updates
            });
        });
        
        showToast('تم', 'تم تحديث الملف الشخصي بنجاح', 'success');
        
        // تحديث واجهة المستخدم
        renderProfilePage();
        
    } catch (error) {
        console.error('خطأ في تحديث الملف الشخصي:', error);
        showToast('خطأ', 'فشل في تحديث الملف الشخصي', 'error');
    }
}

// تصدير الدوال المطلوبة
export { updateProfile };