import { getAppState } from '../state/appState.js';
import { showToast, showErrorPage, confirmDialog } from '../components/ui.js';
import { DEFAULT_USER_SETTINGS } from '../constants/appConstants.js';

export async function loadSettingsPage() {
    const container = document.getElementById('settings-page');
    if (!container) return;
    
    try {
        container.innerHTML = getSettingsPageHTML();
        
        // إضافة مستمعات الأحداث
        setupSettingsEventListeners();
        
        // تحميل بيانات الإعدادات
        await loadSettingsData();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة الإعدادات:', error);
        showErrorPage(container, 'الإعدادات', 'loadSettingsPage');
    }
}

function getSettingsPageHTML() {
    return `
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
        
        <div class="loading-section">
            <div class="loader-spinner"></div>
            <p>جاري تحميل الإعدادات...</p>
        </div>
    `;
}

function setupSettingsEventListeners() {
    // سيتم إضافتها بعد تحميل البيانات
}

async function loadSettingsData() {
    // البيانات محملة بالفعل في loadUserData
    // نحتاج فقط لعرضها
    renderSettingsPage();
}

function renderSettingsPage() {
    const container = document.getElementById('settings-page');
    if (!container) return;
    
    const { userData } = getAppState();
    const settings = userData?.settings || DEFAULT_USER_SETTINGS;
    
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
                    ${renderGeneralSettings(settings)}
                </div>
                
                <div class="tab-content" id="gameplay-tab">
                    ${renderGameplaySettings(settings)}
                </div>
                
                <div class="tab-content" id="notifications-tab">
                    ${renderNotificationSettings(settings)}
                </div>
                
                <div class="tab-content" id="privacy-tab">
                    ${renderPrivacySettings(settings)}
                </div>
                
                <div class="tab-content" id="account-tab">
                    ${renderAccountSettings()}
                </div>
            </div>
        </div>
    `;
    
    // إعادة إضافة مستمعات الأحداث
    setupSettingsEventListeners();
    setupSettingsTabs();
    setupSettingsActions();
}

function renderGeneralSettings(settings) {
    return `
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
    `;
}

function renderGameplaySettings(settings) {
    return `
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
    `;
}

function renderNotificationSettings(settings) {
    const notifications = settings.notifications || DEFAULT_USER_SETTINGS.notifications;
    
    return `
        <div class="settings-section">
            <h3><i class="fas fa-bell"></i> إعدادات الإشعارات</h3>
            <div class="settings-group">
                <div class="setting-item">
                    <label class="setting-label">
                        <span>إشعارات التحديات</span>
                        <label class="switch">
                            <input type="checkbox" id="challenge-notifications" ${notifications.challenges !== false ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </label>
                    <div class="setting-description">إشعارات عند بدء التحديات الجديدة</div>
                </div>
                
                <div class="setting-item">
                    <label class="setting-label">
                        <span>إشعارات الأصدقاء</span>
                        <label class="switch">
                            <input type="checkbox" id="friend-notifications" ${notifications.friends !== false ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </label>
                    <div class="setting-description">إشعارات طلبات الصداقة وتحديات الأصدقاء</div>
                </div>
                
                <div class="setting-item">
                    <label class="setting-label">
                        <span>إشعارات البطولات</span>
                        <label class="switch">
                            <input type="checkbox" id="tournament-notifications" ${notifications.tournaments !== false ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </label>
                    <div class="setting-description">إشعارات البطولات القادمة والنتائج</div>
                </div>
                
                <div class="setting-item">
                    <label class="setting-label">
                        <span>إشعارات الإنجازات</span>
                        <label class="switch">
                            <input type="checkbox" id="achievement-notifications" ${notifications.achievements !== false ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </label>
                    <div class="setting-description">إشعارات عند تحقيق إنجازات جديدة</div>
                </div>
            </div>
        </div>
    `;
}

function renderPrivacySettings(settings) {
    const privacy = settings.privacy || DEFAULT_USER_SETTINGS.privacy;
    
    return `
        <div class="settings-section">
            <h3><i class="fas fa-shield-alt"></i> إعدادات الخصوصية</h3>
            <div class="settings-group">
                <div class="setting-item">
                    <label class="setting-label">
                        <span>إظهار حالة الاتصال</span>
                        <label class="switch">
                            <input type="checkbox" id="show-status" ${privacy.showStatus !== false ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </label>
                    <div class="setting-description">إظهار حالتك (متصل/غير متصل) للأصدقاء</div>
                </div>
                
                <div class="setting-item">
                    <label class="setting-label">
                        <span>الملف الشخصي العام</span>
                        <label class="switch">
                            <input type="checkbox" id="public-profile" ${privacy.publicProfile !== false ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </label>
                    <div class="setting-description">إظهار ملفك الشخصي لجميع اللاعبين</div>
                </div>
                
                <div class="setting-item">
                    <label class="setting-label">
                        <span>قبول طلبات الصداقة تلقائياً</span>
                        <label class="switch">
                            <input type="checkbox" id="auto-accept-friends" ${privacy.autoAcceptFriends === true ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </label>
                    <div class="setting-description">قبول جميع طلبات الصداقة تلقائياً</div>
                </div>
                
                <div class="setting-item">
                    <label class="setting-label">من يمكنه مراسلتك</label>
                    <select class="form-control" id="message-privacy">
                        <option value="all" ${privacy.messagePrivacy === 'all' ? 'selected' : ''}>الجميع</option>
                        <option value="friends" ${privacy.messagePrivacy === 'friends' || !privacy.messagePrivacy ? 'selected' : ''}>الأصدقاء فقط</option>
                        <option value="none" ${privacy.messagePrivacy === 'none' ? 'selected' : ''}>لا أحد</option>
                    </select>
                </div>
            </div>
        </div>
    `;
}

function renderAccountSettings() {
    const { userData } = getAppState();
    
    return `
        <div class="settings-section">
            <h3><i class="fas fa-user-cog"></i> إعدادات الحساب</h3>
            <div class="settings-group">
                <div class="setting-item">
                    <label class="setting-label">تغيير الاسم</label>
                    <div class="input-with-button">
                        <input type="text" class="form-control" id="change-name" value="${userData?.name || ''}">
                        <button class="btn btn-outline" id="save-name">حفظ</button>
                    </div>
                </div>
                
                <div class="setting-item">
                    <label class="setting-label">تغيير اسم المستخدم</label>
                    <div class="input-with-button">
                        <input type="text" class="form-control" id="change-username" value="${userData?.username || ''}">
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
    `;
}

function setupSettingsTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const tabId = this.dataset.tab + '-tab';
            document.getElementById(tabId)?.classList.add('active');
        });
    });
}

function setupSettingsActions() {
    // أزرار السمة
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
        if (newName) {
            await updateName(newName);
        }
    });
    
    // تغيير اسم المستخدم
    document.getElementById('save-username')?.addEventListener('click', async function() {
        const newUsername = document.getElementById('change-username').value.trim();
        if (newUsername) {
            await updateUsername(newUsername);
        }
    });
    
    // تغيير كلمة المرور
    document.getElementById('change-password')?.addEventListener('click', showChangePasswordModal);
    
    // حذف الحساب
    document.getElementById('delete-account')?.addEventListener('click', showDeleteAccountConfirmation);
}

async function saveSettings() {
    const { currentUser, userData } = getAppState();
    
    if (!currentUser) return;
    
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
        
        await db.collection('users').doc(currentUser.uid).update({
            settings: settings,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // تحديث البيانات المحلية
        import('../state/appState.js').then(module => {
            module.updateAppStateProperty('userData', {
                ...userData,
                settings: settings
            });
        });
        
        // تطبيق السمة المحددة
        applyTheme(settings.theme);
        
        showToast('تم', 'تم حفظ الإعدادات بنجاح', 'success');
        
    } catch (error) {
        console.error('خطأ في حفظ الإعدادات:', error);
        showToast('خطأ', 'فشل في حفظ الإعدادات', 'error');
    }
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
        document.body.setAttribute('data-theme', 'light');
    } else {
        // تلقائي - استخدام تفضيل النظام
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
        }
    }
}

async function updateName(newName) {
    const { currentUser, userData } = getAppState();
    
    if (!currentUser || !newName) return;
    
    try {
        await db.collection('users').doc(currentUser.uid).update({
            name: newName,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // تحديث البيانات المحلية
        import('../state/appState.js').then(module => {
            module.updateAppStateProperty('userData', {
                ...userData,
                name: newName
            });
        });
        
        // تحديث واجهة المستخدم
        document.querySelectorAll('.user-name, #dropdown-username, #sidebar-username').forEach(el => {
            el.textContent = newName;
        });
        
        document.querySelectorAll('.user-avatar, #dropdown-avatar, #sidebar-avatar').forEach(el => {
            el.textContent = newName.charAt(0);
        });
        
        showToast('تم', 'تم تغيير الاسم بنجاح', 'success');
        
    } catch (error) {
        console.error('خطأ في تغيير الاسم:', error);
        showToast('خطأ', 'فشل في تغيير الاسم', 'error');
    }
}

async function updateUsername(newUsername) {
    const { currentUser, userData } = getAppState();
    
    if (!currentUser || !newUsername) return;
    
    try {
        // التحقق من توفر اسم المستخدم
        if (newUsername !== userData?.username) {
            const usernameExists = await db.collection('users')
                .where('username', '==', newUsername)
                .get()
                .then(snapshot => !snapshot.empty);
            
            if (usernameExists) {
                showToast('خطأ', 'اسم المستخدم مستخدم مسبقاً', 'error');
                return;
            }
        }
        
        await db.collection('users').doc(currentUser.uid).update({
            username: newUsername,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // تحديث البيانات المحلية
        import('../state/appState.js').then(module => {
            module.updateAppStateProperty('userData', {
                ...userData,
                username: newUsername
            });
        });
        
        showToast('تم', 'تم تغيير اسم المستخدم بنجاح', 'success');
        
    } catch (error) {
        console.error('خطأ في تغيير اسم المستخدم:', error);
        showToast('خطأ', 'فشل في تغيير اسم المستخدم', 'error');
    }
}

function showChangePasswordModal() {
    const modal = createModal('تغيير كلمة المرور', `
        <div class="change-password-form">
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
        </div>
    `, [
        { text: 'إلغاء', class: 'btn-secondary', action: 'close' },
        { text: 'تغيير كلمة المرور', class: 'btn-primary', action: 'change' }
    ]);
    
    modal.show();
    
    modal.element.querySelector('button[data-action="change"]').addEventListener('click', async () => {
        await changePassword();
        modal.hide();
    });
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
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            currentPassword
        );
        
        // إعادة المصادقة
        await user.reauthenticateWithCredential(credential);
        
        // تغيير كلمة المرور
        await user.updatePassword(newPassword);
        
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

async function showDeleteAccountConfirmation() {
    const confirmed = await confirmDialog(
        'حذف الحساب',
        'هل أنت متأكد من حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه وسيتم حذف جميع بياناتك.',
        'نعم، احذف الحساب',
        'إلغاء'
    );
    
    if (confirmed) {
        await deleteUserAccount();
    }
}

async function deleteUserAccount() {
    const { currentUser } = getAppState();
    
    if (!currentUser) return;
    
    try {
        // حذف بيانات المستخدم من Firestore
        await db.collection('users').doc(currentUser.uid).delete();
        
        // حذف الحساب من Firebase Auth
        await currentUser.delete();
        
        showToast('تم', 'تم حذف حسابك بنجاح', 'success');
        
        // إعادة التوجيه لصفحة المصادقة
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        
    } catch (error) {
        console.error('خطأ في حذف الحساب:', error);
        showToast('خطأ', 'فشل في حذف الحساب', 'error');
    }
}

// تصدير الدوال المطلوبة
export { saveSettings, updateName, updateUsername, changePassword, deleteUserAccount };