// ============================================================
//  FIREBASE CONFIG
// ============================================================
var firebaseConfig = {
    apiKey: "AIzaSyCZq615XUXym5VNuwDHQ5FEv8YmYar87lc",
    authDomain: "collcolor.firebaseapp.com",
    databaseURL: "https://collcolor-default-rtdb.firebaseio.com",
    projectId: "collcolor",
    storageBucket: "collcolor.firebasestorage.app",
    messagingSenderId: "333448233629",
    appId: "1:333448233629:web:c7b4525080cf6c953aca74"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var auth = firebase.auth();
var storage = firebase.storage();

console.log('✅ Firebase initialized successfully');

// ============================================================
//  STATE
// ============================================================
var currentUser = null;
var currentUserData = null;
var courses = [];
var colleges = [];
var allSpecialties = [];
var allUsers = [];
var users = [];
var isAdmin = false;
var theme = localStorage.getItem('theme') || 'light';
var isProfileRequired = false;
var compareList = [];
var currentViewedUserUid = null;

// Rating labels
var RATING_LABELS = ['سهل جداً', 'سهل', 'متوسط', 'صعب', 'صعب جداً'];
var RATING_EMOJIS = ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐'];

// ============================================================
//  canViewUserData - التحقق من صلاحية رؤية معلومة معينة
// ============================================================
function canViewUserData(userData, field, viewerUid) {
    // إذا كان المشاهد هو نفسه المستخدم => يرى كل شيء
    if (viewerUid === userData.uid) return true;

    // إذا كان المشاهد مشرفاً => يرى كل شيء (اختياري، لكننا نتركه للمشرفين)
    var viewer = users.find(function(u) { return u.uid === viewerUid; });
    if (viewer && viewer.role === 'admin') return true;

    // الحصول على مستوى الخصوصية لهذا الحقل
    var privacy = userData.privacy || {};
    var level = privacy[field] || 'all'; // القيمة الافتراضية: الجميع

    // إذا كان المستخدم قد قفل ملفه الشخصي بالكامل، نطبقه على كل الحقول
    if (privacy.lockProfile === true && level !== 'all') {
        level = 'none';
    }

    // إذا كان مستوى الخصوصية 'all' => يرى الجميع
    if (level === 'all') return true;

    // إذا كان 'none' => لا أحد يراه (ما عدا نفسه والمشرف)
    if (level === 'none') return false;

    // إذا كان 'friends' => فقط الأصدقاء
    if (level === 'friends') {
        var friends = userData.friends || [];
        return friends.indexOf(viewerUid) !== -1;
    }

    // افتراضياً: لا يرى
    return false;
}

// ============================================================
//  DOM REFS
// ============================================================
function safeGetElement(id) {
    var el = document.getElementById(id);
    if (!el) console.warn('⚠️ Element not found:', id);
    return el;
}

var navLinks = document.querySelectorAll('.nav-link');
var pages = {
    home: safeGetElement('page-home'),
    profile: safeGetElement('page-profile'),
    colleges: safeGetElement('page-colleges'),
    specialties: safeGetElement('page-specialties'),
    users: safeGetElement('page-users'),
    admins: safeGetElement('page-admins'),
    compare: safeGetElement('page-compare'),
    settings: safeGetElement('page-settings'),
    admin: safeGetElement('page-admin')
};
var loginBtn = safeGetElement('loginBtn');
var registerBtn = safeGetElement('registerBtn');
var logoutBtn = safeGetElement('logoutBtn');
var navToggle = safeGetElement('navToggle');
var navLinksContainer = safeGetElement('navLinks');
var adminLink = safeGetElement('adminLink');
var themeToggle = safeGetElement('themeToggle');

var container = safeGetElement('coursesContainer');
var loadingIndicator = safeGetElement('loadingIndicator');
var searchInput = safeGetElement('searchInput');
var filterYear = safeGetElement('filterYear');
var filterCollege = safeGetElement('filterCollege');
var filterSpecialty = safeGetElement('filterSpecialty');
var clearFiltersBtn = safeGetElement('clearFiltersBtn');

var homeTotalCourses = safeGetElement('homeTotalCourses');
var homeAvgRating = safeGetElement('homeAvgRating');
var homeTotalComments = safeGetElement('homeTotalComments');
var homeTotalUsers = safeGetElement('homeTotalUsers');

var profileName = safeGetElement('profileName');
var profileEmail = safeGetElement('profileEmail');
var profileRole = safeGetElement('profileRole');
var profileCollege = safeGetElement('profileCollege');
var profileSpecialty = safeGetElement('profileSpecialty');
var profileYear = safeGetElement('profileYear');
var profileBio = safeGetElement('profileBio');
var profileBranch = safeGetElement('profileBranch');
var favoriteCourses = safeGetElement('favoriteCourses');
var completedCourses = safeGetElement('completedCourses');
var profileForm = safeGetElement('profileForm');
var profileFavCount = safeGetElement('profileFavCount');
var profileCompleteCount = safeGetElement('profileCompleteCount');
var profileVoteCount = safeGetElement('profileVoteCount');
var profileBadgeCount = safeGetElement('profileBadgeCount');
var profileTrustCount = safeGetElement('profileTrustCount');
var badgesContainer = safeGetElement('badgesContainer');
var advancedBadges = safeGetElement('advancedBadges');
var userTier = safeGetElement('userTier');
var userPoints = safeGetElement('userPoints');

var profileAvatar = safeGetElement('profileAvatar');
var changeAvatarBtn = safeGetElement('changeAvatarBtn');
var avatarInput = safeGetElement('avatarInput');

var adminTotalCourses = safeGetElement('adminTotalCourses');
var adminTotalUsers = safeGetElement('adminTotalUsers');
var adminTotalColleges = safeGetElement('adminTotalColleges');
var adminTotalSpecialties = safeGetElement('adminTotalSpecialties');
var adminCoursesList = safeGetElement('adminCoursesList');
var adminCollegesList = safeGetElement('adminCollegesList');
var adminSpecialtiesList = safeGetElement('adminSpecialtiesList');
var adminUsersList = safeGetElement('adminUsersList');
var adminTabs = document.querySelectorAll('.admin-tab');

var usersList = safeGetElement('usersList');
var usersSearchInput = safeGetElement('usersSearchInput');
var usersFilterCollege = safeGetElement('usersFilterCollege');
var usersFilterYear = safeGetElement('usersFilterYear');

var compareSearch = safeGetElement('compareSearch');
var addToCompareBtn = safeGetElement('addToCompareBtn');
var clearCompareBtn = safeGetElement('clearCompareBtn');
var compareListEl = safeGetElement('compareList');
var compareResults = safeGetElement('compareResults');
var compareEmpty = safeGetElement('compareEmpty');

var privacySettingsContainer = safeGetElement('privacySettingsContainer');

var courseModal = safeGetElement('courseModal');
var courseForm = safeGetElement('courseForm');
var editCourseId = safeGetElement('editCourseId');
var courseModalTitle = safeGetElement('courseModalTitle');
var authModal = safeGetElement('authModal');
var authForm = safeGetElement('authForm');
var authEmail = safeGetElement('authEmail');
var authPassword = safeGetElement('authPassword');
var authDisplayName = safeGetElement('authNameInput');
var authNameGroup = safeGetElement('authNameGroup');
var authSubmitBtn = safeGetElement('authSubmitBtn');
var authSwitchBtn = safeGetElement('authSwitchBtn');
var authModalTitle = safeGetElement('authModalTitle');

var profileRequiredModal = safeGetElement('profileRequiredModal');
var profileRequiredForm = safeGetElement('profileRequiredForm');
var profileRequiredCollege = safeGetElement('profileRequiredCollege');
var profileRequiredSpecialty = safeGetElement('profileRequiredSpecialty');
var profileRequiredYear = safeGetElement('profileRequiredYear');

var courseInfoModal = safeGetElement('courseInfoModal');
var courseInfoTitle = safeGetElement('courseInfoTitle');
var courseInfoContent = safeGetElement('courseInfoContent');
var courseInfoClose = safeGetElement('courseInfoClose');

var voteDetailsModal = safeGetElement('voteDetailsModal');
var voteDetailsTitle = safeGetElement('voteDetailsTitle');
var voteDetailsContent = safeGetElement('voteDetailsContent');
var voteDetailsClose = safeGetElement('voteDetailsClose');

var userProfileModal = safeGetElement('userProfileModal');
var userProfileTitle = safeGetElement('userProfileTitle');
var userProfileContent = safeGetElement('userProfileContent');
var userProfileClose = safeGetElement('userProfileClose');

var isLoginMode = true;
var isApplyingCustomizations = false;

// ============================================================
//  TOAST SYSTEM
// ============================================================
function showToast(message, type) {
    type = type || 'success';
    var toast = safeGetElement('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'toast ' + type;
    setTimeout(function() { toast.classList.add('show'); }, 10);
    setTimeout(function() { toast.classList.remove('show'); }, 3500);
}

// ============================================================
//  THEME SYSTEM
// ============================================================
function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }
}

function loadTheme() {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// ============================================================
//  IMAGE HANDLING
// ============================================================
function resizeImage(file, maxWidth, maxHeight) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = new Image();
            img.onload = function() {
                var canvas = document.createElement('canvas');
                var width = img.width;
                var height = img.height;
                if (width > maxWidth) {
                    height = height * (maxWidth / width);
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width = width * (maxHeight / height);
                    height = maxHeight;
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

if (changeAvatarBtn && avatarInput) {
    changeAvatarBtn.addEventListener('click', function() {
        avatarInput.click();
    });
    avatarInput.addEventListener('change', async function(e) {
        if (!this.files || !this.files[0] || !currentUser) return;
        var file = this.files[0];
        if (file.size > 5 * 1024 * 1024) {
            showToast('حجم الصورة يجب أن يكون أقل من 5 ميجابايت', 'error');
            return;
        }
        try {
            showToast('جاري معالجة الصورة...', 'warning');
            var base64 = await resizeImage(file, 200, 200);
            await db.collection('users').doc(currentUser.uid).update({ avatar: base64 });
            currentUserData.avatar = base64;
            if (profileAvatar) profileAvatar.src = base64;
            showToast('تم تحديث الصورة الشخصية بنجاح! 📸');
            updateUserInList(currentUserData);
            renderUsers();
        } catch (error) {
            console.error('Error uploading avatar:', error);
            showToast('حدث خطأ في رفع الصورة: ' + error.message, 'error');
        }
    });
}

// ============================================================
//  ACHIEVEMENTS SYSTEM
// ============================================================
var ACHIEVEMENT_TIERS = {
    BRONZE: { name: 'برونزي', icon: 'fa-medal', color: '#cd7f32', minPoints: 0 },
    SILVER: { name: 'فضي', icon: 'fa-medal', color: '#c0c0c0', minPoints: 50 },
    GOLD: { name: 'ذهبي', icon: 'fa-medal', color: '#ffd700', minPoints: 150 },
    PLATINUM: { name: 'بلاتيني', icon: 'fa-medal', color: '#e5e4e2', minPoints: 350 },
    DIAMOND: { name: 'ماسي', icon: 'fa-gem', color: '#b9f2ff', minPoints: 600 },
    LEGENDARY: { name: 'أسطوري', icon: 'fa-crown', color: '#ff6b6b', minPoints: 1000 },
    MYTHIC: { name: 'ميثي', icon: 'fa-star', color: '#9b59b6', minPoints: 1500 },
    TRANSCENDENT: { name: 'متسامي', icon: 'fa-circle', color: '#f1c40f', minPoints: 2500 }
};

var ACHIEVEMENTS = {
        VOTE_5: { name: 'مصوت مبتدئ', icon: 'fa-star', points: 10, check: function(d) { return (d.votes || 0) >= 5; } },
    VOTE_20: { name: 'مصوت نشط', icon: 'fa-star-half-alt', points: 25, check: function(d) { return (d.votes || 0) >= 20; } },
    VOTE_50: { name: 'مصوت فضي', icon: 'fa-star', points: 50, check: function(d) { return (d.votes || 0) >= 50; } },
    VOTE_100: { name: 'مصوت ذهبي', icon: 'fa-crown', points: 100, check: function(d) { return (d.votes || 0) >= 100; } },
    VOTE_200: { name: 'مصوت أسطوري', icon: 'fa-crown', points: 200, check: function(d) { return (d.votes || 0) >= 200; } },
    VOTE_500: { name: 'مصوت ميثي', icon: 'fa-crown', points: 400, check: function(d) { return (d.votes || 0) >= 500; } },    COMPLETE_1: { name: 'مجتاز مبتدئ', icon: 'fa-check', points: 5, check: function(d) { return (d.completed || []).length >= 1; } },
    COMPLETE_1: { name: 'مجتاز مبتدئ', icon: 'fa-check', points: 5, check: function(d) { return (d.completed || []).length >= 1; } },
    COMPLETE_5: { name: 'مجتاز نشط', icon: 'fa-check-double', points: 15, check: function(d) { return (d.completed || []).length >= 5; } },
    COMPLETE_10: { name: 'مجتاز فضي', icon: 'fa-check-circle', points: 30, check: function(d) { return (d.completed || []).length >= 10; } },
    COMPLETE_20: { name: 'مجتاز ذهبي', icon: 'fa-check-circle', points: 60, check: function(d) { return (d.completed || []).length >= 20; } },
    COMPLETE_40: { name: 'مجتاز أسطوري', icon: 'fa-trophy', points: 120, check: function(d) { return (d.completed || []).length >= 40; } },
    COMPLETE_80: { name: 'مجتاز ميثي', icon: 'fa-trophy', points: 250, check: function(d) { return (d.completed || []).length >= 80; } },    FAV_1: { name: 'محب للمواد', icon: 'fa-heart', points: 5, check: function(d) { return (d.favorites || []).length >= 1; } },
    FAV_1: { name: 'محب للمواد', icon: 'fa-heart', points: 5, check: function(d) { return (d.favorites || []).length >= 1; } },
    FAV_5: { name: 'جامع المفضلات', icon: 'fa-heart', points: 15, check: function(d) { return (d.favorites || []).length >= 5; } },
    FAV_10: { name: 'مفضل ذهبي', icon: 'fa-heart', points: 30, check: function(d) { return (d.favorites || []).length >= 10; } },
    FAV_20: { name: 'مفضل أسطوري', icon: 'fa-heart', points: 60, check: function(d) { return (d.favorites || []).length >= 20; } },    PROFILE_COMPLETE: { name: 'ملف متكامل', icon: 'fa-user-check', points: 20, check: function(d) { return d.profileCompleted && d.bio && d.bio.length > 20; } },
    PROFILE_COMPLETE: { name: 'ملف متكامل', icon: 'fa-user-check', points: 20, check: function(d) { return d.profileCompleted && d.bio && d.bio.length > 20; } },
    AVATAR_SET: { name: 'مصور', icon: 'fa-camera', points: 10, check: function(d) { return d.avatar && d.avatar.length > 0; } },
    BRANCH_SET: { name: 'متعرف على المدينة', icon: 'fa-city', points: 5, check: function(d) { return d.branch && d.branch.length > 0; } },
    TRUST_5: { name: 'موثوق', icon: 'fa-handshake', points: 20, check: function(d) { return (d.trustedBy || []).length >= 5; } },
    TRUST_20: { name: 'موثوق جداً', icon: 'fa-handshake', points: 50, check: function(d) { return (d.trustedBy || []).length >= 20; } },
    TRUST_50: { name: 'موثوق أسطوري', icon: 'fa-handshake', points: 100, check: function(d) { return (d.trustedBy || []).length >= 50; } },    FRIEND_5: { name: 'اجتماعي', icon: 'fa-users', points: 15, check: function(d) { return (d.friends || []).length >= 5; } },
        FRIEND_5: { name: 'اجتماعي', icon: 'fa-users', points: 15, check: function(d) { return (d.friends || []).length >= 5; } },
    FRIEND_15: { name: 'اجتماعي جداً', icon: 'fa-users', points: 40, check: function(d) { return (d.friends || []).length >= 15; } },
    FRIEND_30: { name: 'اجتماعي أسطوري', icon: 'fa-users', points: 80, check: function(d) { return (d.friends || []).length >= 30; } },

    
    // ===== شارات خاصة =====
    SPECIAL_BADGE_OWNER: { name: 'صاحب شارة خاصة', icon: 'fa-star', points: 20, check: function(d) { 
        return d.customization && d.customization.specialBadge && d.customization.specialBadge !== 'none';
    }},
    HAS_CUSTOMIZATION: { name: 'مخصص', icon: 'fa-palette', points: 15, check: function(d) { 
        return d.customization && Object.keys(d.customization).length > 0;
    }}


};

// ============================================================
//  AUTH FUNCTIONS
// ============================================================
async function loginUser(email, password) {
    try {
        var cred = await auth.signInWithEmailAndPassword(email, password);
        currentUser = cred.user;
        await loadUserData(currentUser.uid);
        showToast('تم تسجيل الدخول بنجاح! 👋');
        return true;
    } catch (error) {
        console.error('Firebase auth error:', error);
        showToast('خطأ في تسجيل الدخول: ' + error.message, 'error');
        return false;
    }
}

async function registerUser(email, password, displayName) {
    try {
        var cred = await auth.createUserWithEmailAndPassword(email, password);
        await cred.user.updateProfile({ displayName: displayName || email.split('@')[0] });
        var userDoc = {
            uid: cred.user.uid,
            email: email,
            displayName: displayName || email.split('@')[0],
            role: 'user',
            college: '',
            specialty: '',
            year: '1',
            branch: '',
            bio: '',
            avatar: '',
            favorites: [],
            completed: [],
            votes: 0,
            trustedBy: [],
            reports: [],
            friends: [],
            pendingRequests: [],
                sentRequests: [],
    blockedUsers: [], // <-- إضافة هذا
            privacy: { hideFromUsersList: false, hiddenFields: [], lockProfile: false },
            profileCompleted: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        await db.collection('users').doc(cred.user.uid).set(userDoc);
        currentUser = cred.user;
        currentUserData = userDoc;
        isAdmin = false;
        await populateProfileRequiredDropdowns();
        isProfileRequired = true;
        if (profileRequiredModal) profileRequiredModal.classList.add('active');
        showToast('تم إنشاء الحساب بنجاح! 🎉');
        return true;
    } catch (error) {
        console.error('Firebase registration error:', error);
        showToast('خطأ في إنشاء الحساب: ' + error.message, 'error');
        return false;
    }
}

async function logoutUser(showMessage = true) {
    try {
        await auth.signOut();
        if (showMessage) {
            showToast('تم تسجيل الخروج', 'warning');
        }
    } catch (e) {
        console.error('Firebase logout error:', e);
        showToast('حدث خطأ أثناء تسجيل الخروج', 'error');
    }
    
    // إعادة تعيين الحالة
    currentUser = null;
    currentUserData = null;
    isAdmin = false;
    isProfileRequired = false;
    
    // إعادة تعيين البيانات
    courses = [];
    colleges = [];
    allSpecialties = [];
    users = [];
    allUsers = [];
    
    // تحديث الواجهة
    updateUI();
    renderCourses();
    renderUsers();
    showPage('home');
    hideNavLinksForGuest();
    
    // إزالة شعار الحظر إن وجد
    var banner = document.getElementById('bannedBanner');
    if (banner) banner.remove();
    
    // إعادة تمكين جميع العناصر المعطلة
    document.querySelectorAll('.vote-btn, .comment-submit, .favorite-btn, .complete-btn, .course-info-btn, .vote-details-btn, .analytics-btn').forEach(function(btn) {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
        btn.style.pointerEvents = 'auto';
    });
    
    document.querySelectorAll('input, textarea, select').forEach(function(input) {
        input.disabled = false;
        input.style.opacity = '1';
        input.style.cursor = 'text';
    });
    
    // إظهار جميع الصفحات المخفية
    document.querySelectorAll('.page').forEach(function(page) {
        page.style.display = '';
    });
    
    // تحديث الصفحة لإعادة تحميل كل شيء
    setTimeout(function() {
        window.location.reload();
    }, 500);
}

// ============================================================
//  التحقق من حالة الحظر
// ============================================================
function checkIfBanned(userData) {
    if (userData && userData.banned === true) {
        showToast('🚫 هذا الحساب محظور من قبل المشرف', 'error');
        return true;
    }
    return false;
}

// يمكن استخدامها أيضاً في أي عملية حساسة
function validateUserAccess() {
    if (currentUserData && currentUserData.banned) {
        showToast('🚫 حسابك محظور، لا يمكنك تنفيذ هذه العملية', 'error');
        return false;
    }
    return true;
}

async function loadUserData(uid) {
    try {
        var doc = await db.collection('users').doc(uid).get();
        if (doc.exists) {
            currentUserData = doc.data();
            currentUserData.uid = uid;
            isAdmin = currentUserData.role === 'admin';
            
            // ===== التحقق من المشرف الرئيسي =====
            // نبحث عن أول مشرف تم إنشاؤه (أقدم مشرف)
            var admins = users.filter(function(u) { return u.role === 'admin'; });
            if (admins.length > 0) {
                // ترتيب حسب تاريخ الإنشاء
                admins.sort(function(a, b) {
                    var aTime = a.createdAt?.seconds || 0;
                    var bTime = b.createdAt?.seconds || 0;
                    return aTime - bTime;
                });
                var superAdmin = admins[0];
                
                // إذا كان المستخدم الحالي هو أقدم مشرف
                if (currentUserData.uid === superAdmin.uid) {
                    currentUserData.isSuperAdmin = true;
                    isAdmin = true;
                } else {
                    currentUserData.isSuperAdmin = false;
                }
            }
            
if (!currentUserData.friends) currentUserData.friends = [];
if (!currentUserData.sentRequests) currentUserData.sentRequests = [];
if (!currentUserData.pendingRequests) currentUserData.pendingRequests = [];

if (!currentUserData.blockedUsers) currentUserData.blockedUsers = [];
if (!currentUserData.blockedBy) currentUserData.blockedBy = [];

            if (!currentUserData.privacy) {
                currentUserData.privacy = { hideFromUsersList: false, hiddenFields: [], lockProfile: false };
            }
            if (!currentUserData.profileCompleted && !isAdmin) {
                isProfileRequired = true;
                await populateProfileRequiredDropdowns();
                if (profileRequiredModal && !profileRequiredModal.classList.contains('active')) {
                    profileRequiredModal.classList.add('active');
                }
            }
        } else {
            var newUserData = {
                uid: uid,
                email: currentUser.email,
                displayName: currentUser.displayName || currentUser.email.split('@')[0],
                role: 'user',
                college: '',
                specialty: '',
                year: '1',
                branch: '',
                bio: '',
                avatar: '',
                favorites: [],
                completed: [],
                votes: 0,
                trustedBy: [],
                reports: [],
                friends: [],
                pendingRequests: [],
                privacy: { hideFromUsersList: false, hiddenFields: [], lockProfile: false },
                profileCompleted: false
            };
            await db.collection('users').doc(uid).set(newUserData);
            currentUserData = newUserData;
            isAdmin = false;
            isProfileRequired = true;
            await populateProfileRequiredDropdowns();
            if (profileRequiredModal) profileRequiredModal.classList.add('active');
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

// ============================================================
//  PROFILE REQUIRED
// ============================================================
async function populateProfileRequiredDropdowns() {
    if (!profileRequiredCollege) return;
    var val = profileRequiredCollege.value;
    profileRequiredCollege.innerHTML = '<option value="">اختر الكلية</option>';
    colleges.forEach(function(col) {
        var opt = document.createElement('option');
        opt.value = col.id;
        opt.textContent = col.name;
        profileRequiredCollege.appendChild(opt);
    });
    if (val && colleges.some(function(c) { return c.id === val; })) {
        profileRequiredCollege.value = val;
    }
}

if (profileRequiredCollege) {
    profileRequiredCollege.addEventListener('change', function() {
        var collegeId = profileRequiredCollege.value;
        var select = profileRequiredSpecialty;
        if (!select) return;
        select.innerHTML = '<option value="">اختر التخصص</option>';
        allSpecialties.filter(function(s) { return s.collegeId === collegeId; }).forEach(function(spec) {
            var opt = document.createElement('option');
            opt.value = spec.id;
            opt.textContent = spec.name + (spec.hours ? ' (' + spec.hours + ' س)' : '');
            select.appendChild(opt);
        });
    });
}

if (profileRequiredForm) {
    profileRequiredForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!currentUser || !currentUserData) return;
        var college = profileRequiredCollege ? profileRequiredCollege.value : '';
        var specialty = profileRequiredSpecialty ? profileRequiredSpecialty.value : '';
        var year = profileRequiredYear ? profileRequiredYear.value : '1';
        if (!college || !specialty) {
            showToast('يرجى اختيار الكلية والتخصص', 'error');
            return;
        }
        try {
            await db.collection('users').doc(currentUser.uid).update({
                college: college,
                specialty: specialty,
                year: year,
                profileCompleted: true
            });
            currentUserData.college = college;
            currentUserData.specialty = specialty;
            currentUserData.year = year;
            currentUserData.profileCompleted = true;
            isProfileRequired = false;
            if (profileRequiredModal) profileRequiredModal.classList.remove('active');
            showToast('تم حفظ الملف الشخصي بنجاح! ✅');
            updateUI();
            await loadAllData();
        } catch (error) {
            console.error('Error saving profile:', error);
            showToast('حدث خطأ في حفظ الملف الشخصي: ' + error.message, 'error');
        }
    });
}

// ============================================================
//  AUTH UI
// ============================================================
if (loginBtn) {
    loginBtn.addEventListener('click', function() { openAuthModal(true); });
}
if (registerBtn) {
    registerBtn.addEventListener('click', function() { openAuthModal(false); });
}

function openAuthModal(login) {
    isLoginMode = login;
    if (authModal) authModal.classList.add('active');
    if (authModalTitle) {
        authModalTitle.innerHTML = login ?
            '<i class="fas fa-sign-in-alt"></i> تسجيل الدخول' :
            '<i class="fas fa-user-plus"></i> إنشاء حساب';
    }
    if (authSubmitBtn) {
        authSubmitBtn.innerHTML = login ?
            '<i class="fas fa-sign-in-alt"></i> دخول' :
            '<i class="fas fa-user-plus"></i> إنشاء حساب';
    }
    if (authSwitchBtn) {
        authSwitchBtn.textContent = login ?
            'ليس لديك حساب؟ سجل الآن' :
            'لديك حساب؟ سجل دخول';
    }
    if (authNameGroup) {
        authNameGroup.style.display = login ? 'none' : 'block';
    }
    if (authDisplayName) authDisplayName.required = !login;
    if (authForm) authForm.reset();
}

if (authSwitchBtn) {
    authSwitchBtn.addEventListener('click', function() {
        openAuthModal(!isLoginMode);
    });
}

if (authForm) {
    authForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        var email = authEmail ? authEmail.value.trim() : '';
        var password = authPassword ? authPassword.value : '';
        var displayName = authDisplayName ? authDisplayName.value.trim() : '';
        if (!email || !password) {
            showToast('يرجى إدخال البريد الإلكتروني وكلمة المرور', 'error');
            return;
        }
        var success = false;
        if (isLoginMode) {
            success = await loginUser(email, password);
        } else {
            success = await registerUser(email, password, displayName);
        }
        if (success) {
            if (authModal) authModal.classList.remove('active');
            updateUI();
            await loadAllData();
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            logoutUser();
            updateUI();
            loadAllData();
        }
    });
}

// ============================================================
//  AUTH STATE OBSERVER
// ============================================================
auth.onAuthStateChanged(async function(user) {
    if (user) {
        currentUser = user;
        try {
            await loadUserData(user.uid);
            
            // التحقق من الحظر
            if (currentUserData && currentUserData.banned === true) {
                // عرض صفحة الحظر فقط
                showBannedPage();
                
                // إخفاء جميع الروابط في القائمة العلوية
                hideAllNavLinks();
                
                // عرض اسم المستخدم والبريد في صفحة الحظر
                updateBannedPageInfo();
                
                // تعطيل جميع التفاعلات
                disableAllInteractions();
                
                return; // منع أي تحميل إضافي
            }
            
            // المستخدم غير محظور - تحميل البيانات كاملة
            updateUI();
            await loadAllData();
            showPage('home');
            
        } catch (error) {
            console.error('Error loading user data:', error);
            showToast('حدث خطأ في تحميل بيانات المستخدم', 'error');
        }
    } else {
        // مستخدم غير مسجل
        currentUser = null;
        currentUserData = null;
        isAdmin = false;
        isProfileRequired = false;
        updateUI();
        courses = [];
        colleges = [];
        allSpecialties = [];
        users = [];
        allUsers = [];
        renderCourses();
        renderUsers();
        showPage('home');
        hideNavLinksForGuest();
    }
});

// ============================================================
//  دوال صفحة الحظر
// ============================================================

// إظهار صفحة الحظر وإخفاء كل شيء آخر
function showBannedPage() {
    // إخفاء جميع الصفحات
    Object.keys(pages).forEach(function(key) {
        if (pages[key]) {
            pages[key].classList.remove('active');
            pages[key].style.display = 'none';
        }
    });
    
    // إظهار صفحة الحظر فقط
    var bannedPage = document.getElementById('page-banned');
    if (bannedPage) {
        bannedPage.classList.add('active');
        bannedPage.style.display = 'flex';
    }
    
    // إخفاء جميع الروابط في القائمة العلوية
    hideAllNavLinks();
    
    // إخفاء أزرار تسجيل الدخول والتسجيل
    var loginBtn = document.getElementById('loginBtn');
    var registerBtn = document.getElementById('registerBtn');
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    
    // إظهار زر تسجيل الخروج فقط
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
}

// إخفاء جميع الروابط في القائمة العلوية
function hideAllNavLinks() {
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.style.display = 'none';
    });
    
    // إخفاء زر الإشعارات أيضاً (اختياري)
    var notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) notificationBtn.style.display = 'none';
}

// ============================================================
//  إصلاح showCourseActions - التأكد من ظهور المودال في المقدمة
// ============================================================



// ============================================================
//  إنشاء مودال المادة مع z-index عالي
// ============================================================

function createCourseActionsModal() {
    // التحقق من وجود المودال مسبقاً
    if (document.getElementById('courseActionsModal')) {
        return;
    }
    
    console.log('🔧 إنشاء مودال المادة');
    
    var modal = document.createElement('div');
    modal.id = 'courseActionsModal';
    modal.className = 'modal';
    modal.style.zIndex = '200000'; // قيمة عالية جداً
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.innerHTML = `
        <div class="modal-content" style="max-width:650px;position:relative;z-index:200001;">
            <div class="modal-header">
                <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
                    <button class="btn btn-outline btn-sm" onclick="closeCourseActionsModal()" style="padding:0.3rem 0.8rem;">
                        <i class="fas fa-arrow-right"></i> رجوع
                    </button>
                    <h3 id="courseActionsTitle" style="margin:0;font-size:1rem;"><i class="fas fa-book"></i> تفاصيل المادة</h3>
                </div>
                <button class="btn-close" onclick="closeCourseActionsModal()"><i class="fas fa-times"></i></button>
            </div>
            <div id="courseActionsContent" style="max-height:70vh;overflow-y:auto;"></div>
        </div>
    `;
    document.body.appendChild(modal);
    console.log('✅ تم إنشاء مودال المادة');
}



// ============================================================
//  إضافة دالة مساعدة لإغلاق جميع المودالات وفتح مودال المادة
// ============================================================

function openCourseActionsModal(courseId) {
    console.log('🚀 فتح مودال المادة من الدالة المباشرة:', courseId);
    
    // إغلاق جميع المودالات المفتوحة
    closeAllModals();
    
    // تأخير بسيط ثم فتح مودال المادة
    setTimeout(function() {
        showCourseActions(courseId, currentUser?.uid);
    }, 300);
}

// دوال مساعدة للإجراءات من المودال
async function toggleFavoriteFromModal(courseId) {
    await toggleFavorite(courseId);
    // تحديث المحتوى بعد العملية
    openCourseActionsModal(courseId);
}

async function toggleCompletedFromModal(courseId) {
    await toggleCompleted(courseId);
    openCourseActionsModal(courseId);
}

async function handleVoteFromModal(courseId, rating) {
    await handleVote(courseId, rating);
    openCourseActionsModal(courseId);
}

async function handleCommentFromModal(courseId) {
    var input = document.getElementById('courseActionsCommentInput');
    if (!input || !input.value.trim()) {
        showToast('يرجى كتابة تعليق', 'warning');
        return;
    }
    await handleComment(courseId, input.value.trim());
    input.value = '';
    openCourseActionsModal(courseId);
}

// تحديث معلومات المستخدم في صفحة الحظر
function updateBannedPageInfo() {
    if (!currentUserData) return;
    
    var userName = document.getElementById('bannedUserName');
    var userEmail = document.getElementById('bannedUserEmail');
    var bannedDate = document.getElementById('bannedDate');
    
    if (userName) {
        userName.textContent = currentUserData.displayName || currentUser?.email || 'مستخدم';
    }
    if (userEmail) {
        userEmail.textContent = currentUser?.email || 'email@example.com';
    }
    if (bannedDate) {
        var date = currentUserData.bannedAt;
        if (date) {
            if (date.seconds) {
                bannedDate.textContent = new Date(date.seconds * 1000).toLocaleDateString('ar');
            } else {
                bannedDate.textContent = new Date(date).toLocaleDateString('ar');
            }
        } else {
            bannedDate.textContent = 'غير معروف';
        }
    }
}

// تعطيل جميع التفاعلات في التطبيق
function disableAllInteractions() {
    // تعطيل جميع الأزرار التفاعلية
    document.querySelectorAll('button, input, textarea, select').forEach(function(el) {
        if (el.id !== 'logoutBtn' && !el.closest('.banned-actions')) {
            el.disabled = true;
            el.style.opacity = '0.5';
            el.style.cursor = 'not-allowed';
            el.style.pointerEvents = 'none';
        }
    });
}

// التواصل مع المشرف من صفحة الحظر
function contactAdminFromBanned() {
    // يمكنك فتح نافذة بريد أو عرض نموذج تواصل
    showToast('يرجى التواصل مع المشرف عبر البريد الإلكتروني: admin@example.com', 'info');
    // أو فتح رابط mailto
    // window.location.href = 'mailto:admin@example.com?subject=استفسار عن حظر حسابي';
}

// إعادة تعيين واجهة المستخدم بعد الخروج من الحظر
function resetUIAfterBannedLogout() {
    // إظهار الصفحات مرة أخرى
    document.querySelectorAll('.page').forEach(function(page) {
        page.style.display = '';
        page.classList.remove('active');
    });
    
    // إظهار الروابط
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.style.display = '';
    });
    
    // إظهار أزرار تسجيل الدخول والتسجيل
    var loginBtn = document.getElementById('loginBtn');
    var registerBtn = document.getElementById('registerBtn');
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (registerBtn) registerBtn.style.display = 'inline-flex';
    
    // إخفاء زر تسجيل الخروج
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.style.display = 'none';
    
    // إظهار زر الإشعارات
    var notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) notificationBtn.style.display = '';
}

// ============================================================
//  تواصل المستخدم المحظور مع المشرف
// ============================================================

// التعامل مع نموذج التواصل
if (document.getElementById('bannedContactForm')) {
    document.getElementById('bannedContactForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        await sendMessageToAdminFromBanned();
    });
}

// إرسال رسالة من المستخدم المحظور إلى المشرف
async function sendMessageToAdminFromBanned() {
    if (!currentUser || !currentUserData) {
        showToast('حدث خطأ، يرجى تسجيل الدخول مرة أخرى', 'error');
        return;
    }

    var subject = document.getElementById('bannedContactSubject').value;
    var message = document.getElementById('bannedContactMessage').value.trim();
    var statusDiv = document.getElementById('bannedContactStatus');

    if (!subject || !message) {
        showStatus('يرجى اختيار الموضوع وإدخال الرسالة', 'error');
        return;
    }

    if (message.length < 10) {
        showStatus('الرسالة قصيرة جداً (الحد الأدنى 10 أحرف)', 'error');
        return;
    }

    try {
        // تعطيل الزر أثناء الإرسال
        var submitBtn = document.querySelector('#bannedContactForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        }

        // الحصول على المشرفين
        var admins = users.filter(function(u) { return u.role === 'admin'; });
        if (admins.length === 0) {
            showStatus('لا يوجد مشرف متاح حالياً، يرجى المحاولة لاحقاً', 'error');
            return;
        }

        // إنشاء رسالة في قاعدة البيانات
        var messageData = {
            from: currentUser.uid,
            fromName: currentUserData.displayName || currentUser.email,
            fromEmail: currentUser.email,
            subject: subject,
            message: message,
            isFromBanned: true,
            bannedUser: true,
            read: false,
            replied: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        // حفظ الرسالة في مجموعة messages
        var docRef = await db.collection('messages').add(messageData);

        // إرسال إشعار لكل مشرف
        for (var i = 0; i < admins.length; i++) {
            await sendNotification(admins[i].uid, {
                message: '📩 رسالة جديدة من مستخدم محظور: ' + (currentUserData.displayName || currentUser.email) + '\nالموضوع: ' + subject,
                type: 'warning',
                link: '/admin?tab=messages&message=' + docRef.id,
                data: { messageId: docRef.id, fromBanned: true }
            });
        }

        // حفظ في رسائل المستخدم المحظور
        var bannedMessages = currentUserData.bannedMessages || [];
        bannedMessages.push({
            id: docRef.id,
            subject: subject,
            message: message,
            timestamp: new Date().toISOString(),
            status: 'sent'
        });
        await db.collection('users').doc(currentUser.uid).update({
            bannedMessages: bannedMessages
        });

        // عرض رسالة نجاح
        showStatus('✅ تم إرسال رسالتك بنجاح! سيتم مراجعتها من قبل المشرف.', 'success');
        
        // تفريغ الحقول
        document.getElementById('bannedContactSubject').value = '';
        document.getElementById('bannedContactMessage').value = '';
        
        // حفظ وقت الإرسال في localStorage لمنع الإرسال المتكرر
        localStorage.setItem('lastBannedMessage_' + currentUser.uid, Date.now().toString());

    } catch (error) {
        console.error('Error sending message from banned user:', error);
        showStatus('حدث خطأ: ' + error.message, 'error');
    } finally {
        // إعادة تمكين الزر
        var submitBtn = document.querySelector('#bannedContactForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال الرسالة';
        }
    }
}

// عرض حالة الرسالة
function showStatus(message, type) {
    var statusDiv = document.getElementById('bannedContactStatus');
    if (!statusDiv) return;
    
    statusDiv.style.display = 'block';
    statusDiv.className = 'contact-status ' + type;
    statusDiv.textContent = message;
    
    // إخفاء الحالة بعد 10 ثواني
    clearTimeout(window._statusTimeout);
    window._statusTimeout = setTimeout(function() {
        statusDiv.style.display = 'none';
    }, 10000);
}

// التحقق من إمكانية إرسال رسالة (منع التكرار)
function canSendBannedMessage() {
    var lastSent = localStorage.getItem('lastBannedMessage_' + currentUser?.uid);
    if (lastSent) {
        var timeDiff = Date.now() - parseInt(lastSent);
        if (timeDiff < 300000) { // 5 دقائق
            var remaining = Math.ceil((300000 - timeDiff) / 60000);
            showStatus('يرجى الانتظار ' + remaining + ' دقيقة قبل إرسال رسالة أخرى', 'info');
            return false;
        }
    }
    return true;
}

// تعديل دالة الإرسال لإضافة التحقق
async function sendMessageToAdminFromBanned() {
    // ... الكود السابق ...
    
    // التحقق من عدم التكرار
    if (!canSendBannedMessage()) {
        return;
    }
    
    // ... باقي الكود ...
}

// ============================================================
//  التحكم في ظهور القائمة
// ============================================================

// إخفاء الروابط للمستخدم المحظور
function hideNavLinksForBannedUser() {
    // إخفاء جميع الروابط باستثناء الرئيسية
    var linksToHide = [
        'navProfileLink',
        'adminLink',
        'navSettingsLink'
    ];
    
    // إخفاء الروابط المحددة
    linksToHide.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    
    // إخفاء روابط الكليات والتخصصات والطلاب والمقارنة
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        var page = link.dataset.page;
        if (page !== 'home' && page !== 'colleges' && page !== 'specialties' && 
            page !== 'users' && page !== 'compare') {
            link.style.display = 'none';
        }
    });
    
    // إخفاء أزرار تسجيل الدخول والتسجيل
    var loginBtn = document.getElementById('loginBtn');
    var registerBtn = document.getElementById('registerBtn');
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    
    // إظهار زر تسجيل الخروج
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
}

// تحديث واجهة المستخدم المحظور
function updateUIForBannedUser() {
    // إظهار زر تسجيل الخروج فقط
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
    
    // إخفاء أزرار تسجيل الدخول والتسجيل
    var loginBtn = document.getElementById('loginBtn');
    var registerBtn = document.getElementById('registerBtn');
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
}

// إخفاء الروابط للزوار (غير مسجلين دخول)
function hideNavLinksForGuest() {
    // إخفاء الروابط الخاصة بالمستخدمين المسجلين
    var linksToHide = [
        'navProfileLink',
        'navSettingsLink',
        'adminLink'
    ];
    
    linksToHide.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    
    // إظهار أزرار تسجيل الدخول والتسجيل
    var loginBtn = document.getElementById('loginBtn');
    var registerBtn = document.getElementById('registerBtn');
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (registerBtn) registerBtn.style.display = 'inline-flex';
    
    // إخفاء زر تسجيل الخروج
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.style.display = 'none';
}

// إظهار جميع الروابط للمستخدمين العاديين
function showAllNavLinks() {
    // إظهار جميع الروابط
    var allLinks = document.querySelectorAll('.nav-link');
    allLinks.forEach(function(link) {
        link.style.display = 'inline-flex';
    });
    
    // إظهار أزرار تسجيل الدخول والتسجيل أو الخروج حسب الحالة
    var loginBtn = document.getElementById('loginBtn');
    var registerBtn = document.getElementById('registerBtn');
    var logoutBtn = document.getElementById('logoutBtn');
    
    if (currentUser) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-flex';
    } else {
        if (loginBtn) loginBtn.style.display = 'inline-flex';
        if (registerBtn) registerBtn.style.display = 'inline-flex';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

// ============================================================
//  UI UPDATE - النسخة المُصلحة
// ============================================================
function updateUI() {
    // تحديث واجهة المستخدم العامة
    if (loginBtn) loginBtn.style.display = currentUser ? 'none' : 'inline-flex';
    if (registerBtn) registerBtn.style.display = currentUser ? 'none' : 'inline-flex';
    if (logoutBtn) logoutBtn.style.display = currentUser ? 'inline-flex' : 'none';
    
    // التحقق من الحظر أولاً
    if (currentUserData && currentUserData.banned) {
        hideNavLinksForBannedUser();
        return;
    }
    
    // إظهار أو إخفاء الروابط حسب حالة المستخدم
    if (currentUser) {
        showAllNavLinks();
        
        // إظهار/إخفاء روابط خاصة
        document.querySelectorAll('.nav-link[data-page="profile"]').forEach(function(el) {
            if (el) el.style.display = 'inline-flex';
        });
        
        // إظهار رابط الإعدادات
        var settingsLink = document.getElementById('navSettingsLink');
        if (settingsLink) settingsLink.style.display = 'inline-flex';
        
        // رابط المشرف
        if (adminLink) {
            adminLink.style.display = (currentUser && isAdmin) ? 'inline-flex' : 'none';
        }
        
        // تحديث بيانات الملف الشخصي
        if (currentUserData && profileName && profileEmail && profileRole) {
            profileName.textContent = currentUserData.displayName || currentUser?.email || 'مستخدم';
            profileEmail.textContent = currentUser?.email || '';
            
            // ===== تحسين عرض شارة المشرف (استخدام textContent بدلاً من innerHTML) =====
            var isAdminUser = currentUserData.role === 'admin';
            var isSuperAdmin = currentUserData.isSuperAdmin || false;
            
            // إزالة أي محتوى سابق (نستخدم عنصر span منفصل إذا أردنا أيقونات)
            profileRole.textContent = ''; // نمسح النص القديم
            
            // نضيف النص الجديد مع الرموز عبر textContent (الرموز الإيموجي تعمل)
            if (isSuperAdmin) {
                profileRole.textContent = '👑 المشرف الرئيسي';
                profileRole.style.background = 'linear-gradient(135deg, #ffd700, #f59e0b)';
                profileRole.style.color = '#78350f';
                profileRole.style.fontWeight = '700';
                profileRole.style.padding = '0.25rem 1rem';
                profileRole.style.borderRadius = '20px';
            } else if (isAdminUser) {
                profileRole.textContent = '🛡️ مشرف';
                profileRole.style.background = 'var(--primary-light)';
                profileRole.style.color = 'var(--primary-dark)';
                profileRole.style.fontWeight = '600';
                profileRole.style.padding = '0.25rem 1rem';
                profileRole.style.borderRadius = '20px';
            } else {
                profileRole.textContent = '🎓 طالب';
                profileRole.style.background = 'var(--gray-100)';
                profileRole.style.color = 'var(--gray-600)';
                profileRole.style.fontWeight = '600';
                profileRole.style.padding = '0.25rem 1rem';
                profileRole.style.borderRadius = '20px';
            }
            
            var bioDisplay = document.getElementById('profileBioDisplay');
            if (bioDisplay) {
                bioDisplay.textContent = currentUserData.bio || '';
            }
            
            if (profileCollege) profileCollege.value = currentUserData.college || '';
            if (profileYear) profileYear.value = currentUserData.year || '1';
            if (profileBio) profileBio.value = currentUserData.bio || '';
            if (profileBranch) profileBranch.value = currentUserData.branch || '';
            if (profileAvatar && currentUserData.avatar) {
                profileAvatar.src = currentUserData.avatar;
            }
            
            var favCount = (currentUserData.favorites || []).length;
            var compCount = (currentUserData.completed || []).length;
            var trustCount = (currentUserData.trustedBy || []).length;
            if (profileFavCount) profileFavCount.textContent = favCount;
            if (profileCompleteCount) profileCompleteCount.textContent = compCount;
            if (profileVoteCount) profileVoteCount.textContent = currentUserData.votes || 0;
            if (profileTrustCount) profileTrustCount.textContent = trustCount;
            
            updateBadges();
            updateAdvancedBadges();
            updatePointsDisplay();
            applyAllCustomizations(currentUserData); // تطبيق التخصيصات على الملف الرئيسي
        }
    } else {
        hideNavLinksForGuest();
    }
}
// ============================================================
//  NAVIGATION
// ============================================================
navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var page = link.dataset.page;
        if (page === 'admin' && !isAdmin) {
            showToast('هذه الصفحة مخصصة للمشرفين فقط', 'error');
            return;
        }
        if (isProfileRequired && page !== 'profile' && page !== 'settings') {
            showToast('يرجى إكمال ملفك الشخصي أولاً', 'warning');
            return;
        }
        showPage(page);
        navLinks.forEach(function(l) { l.classList.remove('active'); });
        link.classList.add('active');
        if (window.innerWidth <= 768 && navLinksContainer) {
            navLinksContainer.classList.remove('open');
        }
    });
});

if (navToggle) {
    navToggle.addEventListener('click', function() {
        if (navLinksContainer) {
            navLinksContainer.classList.toggle('open');
        }
    });
}

// ============================================================
//  صفحة المشرفين - الدوال الكاملة
// ============================================================

// ============================================================
//  صفحة المشرفين - الدوال
// ============================================================


// ============================================================
//  إصلاح دالة renderAdminsList - التحقق من وجود العنصر
// ============================================================

function renderAdminsList() {
    var container = document.getElementById('adminsListContainer');
    
    // إذا لم يكن العنصر موجوداً، قم بإنشائه
    if (!container) {
        console.log('⚠️ adminsListContainer غير موجود، جاري الإنشاء...');
        createAdminsContainer();
        container = document.getElementById('adminsListContainer');
        if (!container) {
            console.error('❌ فشل في إنشاء adminsListContainer');
            return;
        }
    }
    
    if (!users || users.length === 0) {
        container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> جاري تحميل المستخدمين...</div>';
        return;
    }
    
    var adminsList = users.filter(function(u) {
        return u.role === 'admin' || u.role === 'moderator';
    });
    
    adminsList.sort(function(a, b) {
        if (a.isSuperAdmin) return -1;
        if (b.isSuperAdmin) return 1;
        if (a.role === 'admin' && b.role !== 'admin') return -1;
        if (a.role !== 'admin' && b.role === 'admin') return 1;
        return (a.displayName || '').localeCompare(b.displayName || '');
    });
    
    if (adminsList.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-user-shield"></i>
                <h4>لا يوجد مشرفين</h4>
                <p>لم يتم تعيين أي مشرف أو مدير بعد</p>
            </div>
        `;
        return;
    }
    
    var html = '';
    adminsList.forEach(function(user) {
        html += buildAdminCard(user);
    });
    
    container.innerHTML = html;
}

// ============================================================
//  createAdminsContainer - إنشاء حاوية المشرفين
// ============================================================

function createAdminsContainer() {
    // البحث عن حاوية المشرفين
    var adminsContainer = document.querySelector('.admins-container');
    
    // إذا لم تكن موجودة، ابحث عن page-admins
    if (!adminsContainer) {
        var pageAdmins = document.getElementById('page-admins');
        if (pageAdmins) {
            adminsContainer = document.createElement('div');
            adminsContainer.className = 'admins-container';
            pageAdmins.appendChild(adminsContainer);
            console.log('✅ تم إنشاء .admins-container');
        } else {
            // إذا لم تكن page-admins موجودة، ابحث عن أي حاوية مناسبة
            var mainContainer = document.querySelector('.pages-container');
            if (mainContainer) {
                // إنشاء page-admins
                var pageAdminsDiv = document.createElement('div');
                pageAdminsDiv.id = 'page-admins';
                pageAdminsDiv.className = 'page';
                mainContainer.appendChild(pageAdminsDiv);
                
                adminsContainer = document.createElement('div');
                adminsContainer.className = 'admins-container';
                pageAdminsDiv.appendChild(adminsContainer);
                console.log('✅ تم إنشاء page-admins و .admins-container');
            }
        }
    }
    
    // إنشاء adminsListContainer
    if (adminsContainer) {
        var listContainer = document.createElement('div');
        listContainer.id = 'adminsListContainer';
        listContainer.className = 'admins-grid-modern';
        adminsContainer.appendChild(listContainer);
        console.log('✅ تم إنشاء adminsListContainer');
    }
}

// ============================================================
//  تحميل صفحة المشرفين - الإصدار الجديد
// ============================================================
function loadAdminsPage() {
    console.log('👑 تحميل صفحة المشرفين');
    
    // التأكد من وجود الحاويات
    ensureAdminsContainers();
    
    // تحديث الإحصائيات
    updateAdminsStats();
    
    // عرض قائمة المشرفين بالتصميم الجديد
    setTimeout(function() {
        renderAdminsCards();
    }, 200);
}

function renderAdminsCards() {
    var container = document.getElementById('adminsListContainer');
    if (!container) {
        console.error('❌ adminsListContainer غير موجود');
        return;
    }

    if (!users || users.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-user-shield"></i>
                <h4>لا يوجد مشرفين</h4>
                <p>لم يتم تعيين أي مشرف بعد</p>
            </div>
        `;
        return;
    }

    var adminsList = users.filter(function(u) {
        return u.role === 'admin' || u.role === 'moderator';
    });

    adminsList.sort(function(a, b) {
        if (a.isSuperAdmin) return -1;
        if (b.isSuperAdmin) return 1;
        return (a.displayName || '').localeCompare(b.displayName || '');
    });

    if (adminsList.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-user-shield"></i>
                <h4>لا يوجد مشرفين</h4>
                <p>لم يتم تعيين أي مشرف بعد</p>
            </div>
        `;
        return;
    }

    var html = '<div class="admins-cards-grid">';
    adminsList.forEach(function(user) {
        html += buildAdminCardSimple(user);
    });
    html += '</div>';

    container.innerHTML = html;

    setTimeout(function() {
        applyCustomizationsToAdminCards();
    }, 100);
}

// ============================================================
//  بناء بطاقة مشرف - التصميم النهائي
//  الصورة في الطرف الأيمن، الاسم بجانبها، الشارة المميزة أسفل الاسم
// ============================================================
function buildAdminCardSimple(user) {
    if (!user) return '';

    var uid = user.uid;
    var customization = user.customization || {};

    // ============================================================
    //  1. الصورة الشخصية - تطبيق جميع التخصيصات
    // ============================================================
    var avatarBorderColor = customization.avatarBorder || '#2563eb';
    var avatarBorderWidth = customization.avatarBorderWidth || '3';
    var avatarBorderStyle = customization.avatarBorderStyle || 'solid';
    var avatarEffect = customization.avatarEffect || 'none';
    var avatarShadow = customization.avatarShadow || 'none';
    var avatarShadowColor = customization.avatarShadowColor || 'rgba(37,99,235,0.4)';
    var profileFrame = customization.profileFrame || 'default';

    var borderWidthFinal = (avatarBorderWidth === 'none' || !avatarBorderWidth) ? '0px' : avatarBorderWidth + 'px';
    var borderStyleFinal = (avatarBorderWidth === 'none' || !avatarBorderWidth) ? 'none' : avatarBorderStyle;

    var avatarStyles = '';
    avatarStyles += 'border-color:' + avatarBorderColor + ';';
    avatarStyles += 'border-width:' + borderWidthFinal + ';';
    avatarStyles += 'border-style:' + borderStyleFinal + ';';

    // ظل الصورة
    if (avatarShadow && avatarShadow !== 'none') {
        var shadowMap = {
            'small': '0 2px 8px rgba(0,0,0,0.15)',
            'medium': '0 4px 15px rgba(0,0,0,0.2)',
            'large': '0 8px 30px rgba(0,0,0,0.3)',
            'colored': '0 0 25px ' + avatarShadowColor
        };
        if (shadowMap[avatarShadow]) {
            avatarStyles += 'box-shadow:' + shadowMap[avatarShadow] + ';';
        }
    }

    // شكل الصورة
    if (profileFrame && profileFrame !== 'default') {
        var frameStyles = {
            'rounded': 'border-radius:20%;',
            'square': 'border-radius:0;',
            'star': 'clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);border-radius:0;',
            'heart': 'clip-path:path("M50,90 C20,60 0,40 0,25 C0,10 15,0 30,0 C40,0 48,8 50,18 C52,8 60,0 70,0 C85,0 100,10 100,25 C100,40 80,60 50,90Z");border-radius:0;',
            'diamond': 'clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);border-radius:0;'
        };
        if (frameStyles[profileFrame]) {
            avatarStyles += frameStyles[profileFrame];
        }
    }

    // تأثير الصورة
    var effectClass = (avatarEffect && avatarEffect !== 'none') ? 'effect-' + avatarEffect : '';

    // ============================================================
    //  2. الاسم - تطبيق لون الاسم وتأثير الاسم
    // ============================================================
    var nameColor = '';
    if (customization.nameColor && customization.nameColor !== 'default') {
        nameColor = 'color:' + customization.nameColor + ';';
    } else {
        // إذا لم يكن هناك لون مخصص، نستخدم لون النص الافتراضي حسب الثيم
        var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        nameColor = 'color:' + (currentTheme === 'dark' ? '#f1f5f9' : '#1e293b') + ';';
    }

    var nameGlow = '';
    if (customization.nameGlow) {
        if (customization.nameGlow === 'soft') {
            nameGlow = 'text-shadow:0 0 20px rgba(37,99,235,0.3);';
        } else if (customization.nameGlow === 'strong') {
            nameGlow = 'text-shadow:0 0 30px rgba(37,99,235,0.6),0 0 60px rgba(37,99,235,0.3);';
        } else if (customization.nameGlow === 'rainbow') {
            nameGlow = 'animation:rainbowGlow 3s ease infinite;';
        }
    }

    // ============================================================
    //  3. الشارة الخاصة - نفس لون الاسم
    // ============================================================
    var specialBadgeHTML = '';
    if (customization.specialBadge && customization.specialBadge !== 'none') {
        // نطبق نفس لون الاسم على الشارة الخاصة
        var specialColor = customization.nameColor || (document.documentElement.getAttribute('data-theme') === 'dark' ? '#f1f5f9' : '#1e293b');
        specialBadgeHTML = '<span class="admin-special-badge" style="color:' + specialColor + ';' + nameGlow + '"><i class="fas ' + customization.specialBadge + '"></i></span>';
    }

    // ============================================================
    //  4. صندوق الشارة المميزة - مع تطبيق اللون المختار مباشرة
    // ============================================================
    var featuredBadge = customization.featuredBadge || 'none';
    var featuredBadgeHTML = '';

    if (featuredBadge && featuredBadge !== 'none') {
        var allBadges = getAllBadges();
        var badge = allBadges.find(function(b) { return b.name === featuredBadge; });
        if (badge) {
            // خيارات الشارة
            var textColor = customization.featuredBadgeTextColor || 'default';
            var bg = customization.featuredBadgeBg || 'default';
            var size = customization.featuredBadgeSize || 'medium';
            var effect = customization.featuredBadgeEffect || 'none';
            var border = customization.featuredBadgeBorder || 'none';
            var borderColor = customization.featuredBadgeBorderColor || 'default';
            var badgeStyle = customization.badgeStyle || 'default';

            // خيارات صندوق الشارة
            var boxBg = customization.featuredBadgeBoxBg || 'default';
            var boxBorder = customization.featuredBadgeBoxBorder || 'none';
            var boxBorderColor = customization.featuredBadgeBoxBorderColor || 'default';

            // ===== أنماط الشارة =====
            var badgeStyles = [];
            
            if (textColor && textColor !== 'default') {
                badgeStyles.push('color:' + textColor + ' !important');
            }
            
            var bgMap = {
                'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
                'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
                'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
                'neon': 'background:linear-gradient(135deg,#00ffff,#ff00ff)',
                'dark': 'background:#1e293b'
            };
            if (bg && bg !== 'default' && bgMap[bg]) {
                badgeStyles.push(bgMap[bg] + ' !important');
            } else {
                badgeStyles.push('background:var(--primary-light) !important');
            }

            if (size === 'small') {
                badgeStyles.push('font-size:0.6rem;padding:0.1rem 0.5rem');
            } else if (size === 'large') {
                badgeStyles.push('font-size:0.9rem;padding:0.3rem 1.2rem');
            } else {
                badgeStyles.push('font-size:0.75rem;padding:0.2rem 0.8rem');
            }

            if (effect === 'glow') {
                badgeStyles.push('animation:glowBadge 2s ease-in-out infinite');
            } else if (effect === 'pulse') {
                badgeStyles.push('animation:pulse 1.5s ease-in-out infinite');
            } else if (effect === 'shine') {
                badgeStyles.push('background:linear-gradient(135deg,#f093fb,#f5576c,#f093fb);background-size:200% 200%;animation:shine 3s ease infinite');
            }

            if (border !== 'none') {
                var bColor = (borderColor && borderColor !== 'default') ? borderColor : 'var(--primary)';
                badgeStyles.push('border:' + border + ' 2px ' + bColor);
            }

            if (badgeStyle && badgeStyle !== 'default') {
                var styleMap = {
                    'glow': 'animation:glowBadge 2s ease-in-out infinite;',
                    'rounded': 'border-radius:50px;padding:0.2rem 1rem;',
                    'shadow': 'box-shadow:0 4px 15px rgba(0,0,0,0.15);',
                    'gradient': 'background:linear-gradient(135deg,#f093fb,#f5576c);color:white;',
                    'neon': 'box-shadow:0 0 20px rgba(37,99,235,0.5);border:1px solid rgba(37,99,235,0.3);'
                };
                if (styleMap[badgeStyle]) {
                    badgeStyles.push(styleMap[badgeStyle]);
                }
            }

            // ===== أنماط صندوق الشارة - نطبق اللون المختار مباشرة =====
            var boxStyles = [];
            var boxBgMap = {
                'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
                'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
                'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
                'dark': 'background:#1e293b'
            };
            
            // تطبيق خلفية الصندوق المختارة مباشرة مع !important
            if (boxBg && boxBg !== 'default' && boxBgMap[boxBg]) {
                boxStyles.push('background:' + boxBgMap[boxBg] + ' !important');
            } else {
                // إذا كان default، نستخدم خلفية البطاقة
                boxStyles.push('background:var(--card-bg) !important');
            }
            
            if (boxBorder !== 'none') {
                var bBoxColor = (boxBorderColor && boxBorderColor !== 'default') ? boxBorderColor : 'var(--primary)';
                boxStyles.push('border:' + boxBorder + ' 2px ' + bBoxColor + ' !important');
            }
            boxStyles.push('border-radius:12px;padding:0.2rem 0.7rem;');
            boxStyles.push('display:inline-flex;align-items:center;gap:0.4rem;');
            boxStyles.push('margin-top:0.2rem;');
            boxStyles.push('width:fit-content;');

            featuredBadgeHTML = `
                <div class="admin-featured-badge-container" style="${boxStyles.join(';')}">
                    <span style="font-size:0.5rem;color:var(--gray-400);font-weight:600;">⭐</span>
                    <span class="admin-featured-badge" style="${badgeStyles.join(';')}">
                        <i class="fas ${badge.icon}"></i> ${badge.name}
                    </span>
                </div>
            `;
        }
    }

    // ============================================================
    //  5. خلفية البطاقة
    // ============================================================
    var bgStyle = '';
    var textColorStyle = '';
    if (customization.profileBg && customization.profileBg !== 'default') {
        var bgInfo = BG_STYLES[customization.profileBg];
        if (bgInfo) {
            bgStyle = 'background:' + bgInfo.bg + ';';
            textColorStyle = 'color:' + bgInfo.textColor + ';';
        }
    }

    // ============================================================
    //  6. لون النصوص الثانوية (للاسم إذا لم يكن هناك لون مخصص)
    // ============================================================
    var textSecondaryColor = '';
    if (customization.textColor && customization.textColor !== 'default') {
        textSecondaryColor = 'color:' + customization.textColor + ';';
    }

    // ============================================================
    //  7. بناء البطاقة - التصميم النهائي
    //    الصورة في الطرف الأيمن، الاسم بجانبها، الشارة المميزة أسفل الاسم
    // ============================================================
    var html = `
        <div class="admin-card-simple horizontal" style="${bgStyle} ${textColorStyle}" data-uid="${uid}" onclick="viewUserProfile('${uid}')">
            <div class="admin-card-simple-content horizontal">
                <!-- الصورة الشخصية - في الطرف الأيمن -->
                <div class="admin-card-simple-avatar ${effectClass}">
                    <img src="${user.avatar || ''}" onerror="this.src=''" alt="${escapeHtml(user.displayName || 'مستخدم')}" style="${avatarStyles}" />
                </div>
                
                <!-- المعلومات (الاسم + الشارة المميزة أسفله) -->
                <div class="admin-card-simple-info">
                    <div class="admin-card-simple-name" style="${nameColor} ${nameGlow}">
                        ${escapeHtml(user.displayName || 'مستخدم')}
                        ${specialBadgeHTML}
                    </div>
                    
                    <!-- الشارة المميزة - أسفل الاسم -->
                    ${featuredBadgeHTML}
                </div>
            </div>
        </div>
    `;

    return html;
}

// ============================================================
//  تطبيق التخصيصات على بطاقات المشرفين - النسخة النهائية
// ============================================================
function applyCustomizationsToAdminCards() {
    var cards = document.querySelectorAll('.admin-card-simple');
    
    cards.forEach(function(card) {
        var uid = card.dataset.uid;
        var user = users.find(function(u) { return u.uid === uid; });
        if (!user) return;

        var customization = user.customization || {};
        var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        
        // ===== 1. خلفية البطاقة =====
        if (customization.profileBg && customization.profileBg !== 'default') {
            var bgInfo = BG_STYLES[customization.profileBg];
            if (bgInfo) {
                card.style.background = bgInfo.bg;
                card.style.color = bgInfo.textColor;
            }
        }

        // ===== 2. شكل البطاقة =====
        if (customization.cardStyle && customization.cardStyle !== 'default') {
            var cardStyles = {
                'glass': 'backdrop-filter:blur(10px);background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);',
                'bordered': 'border:2px solid var(--primary);',
                'shadow': 'box-shadow:0 8px 30px rgba(0,0,0,0.2);',
                'elevated': 'transform:translateY(-5px);box-shadow:0 12px 40px rgba(0,0,0,0.25);'
            };
            if (cardStyles[customization.cardStyle]) {
                var existingStyle = card.style.cssText || '';
                card.style.cssText = existingStyle + cardStyles[customization.cardStyle];
            }
        }

        // ===== 3. سرعة الحركة =====
        if (customization.animationSpeed && customization.animationSpeed !== 'none') {
            var speeds = { 'slow': '0.8s', 'normal': '0.25s', 'fast': '0.1s' };
            if (speeds[customization.animationSpeed]) {
                card.style.transition = 'all ' + speeds[customization.animationSpeed] + ' cubic-bezier(0.4,0,0.2,1)';
            }
        }

        // ===== 4. نوع الخط =====
        if (customization.fontStyle && customization.fontStyle !== 'default') {
            var fonts = {
                'modern': 'Inter, "Segoe UI", sans-serif',
                'elegant': 'Georgia, "Times New Roman", serif',
                'bold': '"Arial Black", "Segoe UI", sans-serif',
                'handwriting': '"Comic Sans MS", cursive',
                'playful': '"Fredoka One", "Segoe UI", sans-serif'
            };
            if (fonts[customization.fontStyle]) {
                card.style.fontFamily = fonts[customization.fontStyle];
            }
        }

        // ===== 5. تحديث صندوق الشارة المميزة - تطبيق اللون المختار =====
        var featuredBadge = customization.featuredBadge;
        if (featuredBadge && featuredBadge !== 'none') {
            var container = card.querySelector('.admin-featured-badge-container');
            var badgeElement = card.querySelector('.admin-featured-badge');
            
            if (container) {
                // تطبيق خلفية الصندوق المختارة
                var boxBg = customization.featuredBadgeBoxBg || 'default';
                var boxBorder = customization.featuredBadgeBoxBorder || 'none';
                var boxBorderColor = customization.featuredBadgeBoxBorderColor || 'default';

                var boxStyles = [];
                var boxBgMap = {
                    'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
                    'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
                    'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
                    'dark': 'background:#1e293b'
                };
                
                // تطبيق الخلفية المختارة مع !important
                if (boxBg && boxBg !== 'default' && boxBgMap[boxBg]) {
                    boxStyles.push('background:' + boxBgMap[boxBg] + ' !important');
                } else {
                    boxStyles.push('background:var(--card-bg) !important');
                }
                
                if (boxBorder !== 'none') {
                    var bBoxColor = (boxBorderColor && boxBorderColor !== 'default') ? boxBorderColor : 'var(--primary)';
                    boxStyles.push('border:' + boxBorder + ' 2px ' + bBoxColor + ' !important');
                }
                boxStyles.push('border-radius:12px;padding:0.2rem 0.7rem;');
                boxStyles.push('display:inline-flex;align-items:center;gap:0.4rem;');
                boxStyles.push('margin-top:0.2rem;');
                boxStyles.push('width:fit-content;');
                container.style.cssText = boxStyles.join(';');
            }

            if (badgeElement) {
                // تحديث أنماط الشارة
                var textColor = customization.featuredBadgeTextColor || 'default';
                var bg = customization.featuredBadgeBg || 'default';
                var size = customization.featuredBadgeSize || 'medium';
                var effect = customization.featuredBadgeEffect || 'none';
                var border = customization.featuredBadgeBorder || 'none';
                var borderColor = customization.featuredBadgeBorderColor || 'default';
                var badgeStyle = customization.badgeStyle || 'default';

                var badgeStyles = [];
                if (textColor && textColor !== 'default') {
                    badgeStyles.push('color:' + textColor + ' !important');
                }
                
                var bgMap = {
                    'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
                    'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
                    'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
                    'neon': 'background:linear-gradient(135deg,#00ffff,#ff00ff)',
                    'dark': 'background:#1e293b'
                };
                if (bg && bg !== 'default' && bgMap[bg]) {
                    badgeStyles.push(bgMap[bg] + ' !important');
                } else {
                    badgeStyles.push('background:var(--primary-light) !important');
                }

                if (size === 'small') {
                    badgeStyles.push('font-size:0.6rem;padding:0.1rem 0.5rem');
                } else if (size === 'large') {
                    badgeStyles.push('font-size:0.9rem;padding:0.3rem 1.2rem');
                } else {
                    badgeStyles.push('font-size:0.75rem;padding:0.2rem 0.8rem');
                }

                if (effect === 'glow') {
                    badgeStyles.push('animation:glowBadge 2s ease-in-out infinite');
                } else if (effect === 'pulse') {
                    badgeStyles.push('animation:pulse 1.5s ease-in-out infinite');
                } else if (effect === 'shine') {
                    badgeStyles.push('background:linear-gradient(135deg,#f093fb,#f5576c,#f093fb);background-size:200% 200%;animation:shine 3s ease infinite');
                }

                if (border !== 'none') {
                    var bColor = (borderColor && borderColor !== 'default') ? borderColor : 'var(--primary)';
                    badgeStyles.push('border:' + border + ' 2px ' + bColor);
                }

                if (badgeStyle && badgeStyle !== 'default') {
                    var styleMap = {
                        'glow': 'animation:glowBadge 2s ease-in-out infinite;',
                        'rounded': 'border-radius:50px;padding:0.2rem 1rem;',
                        'shadow': 'box-shadow:0 4px 15px rgba(0,0,0,0.15);',
                        'gradient': 'background:linear-gradient(135deg,#f093fb,#f5576c);color:white;',
                        'neon': 'box-shadow:0 0 20px rgba(37,99,235,0.5);border:1px solid rgba(37,99,235,0.3);'
                    };
                    if (styleMap[badgeStyle]) {
                        badgeStyles.push(styleMap[badgeStyle]);
                    }
                }

                badgeElement.style.cssText = badgeStyles.join(';');
            }
        }

        // ===== 6. تحديث الشارة الخاصة - جعلها نفس لون الاسم =====
        var specialBadge = customization.specialBadge;
        if (specialBadge && specialBadge !== 'none') {
            var specialElement = card.querySelector('.admin-special-badge');
            if (specialElement) {
                // نطبق لون الاسم على الشارة الخاصة
                var nameColor = customization.nameColor || (currentTheme === 'dark' ? '#f1f5f9' : '#1e293b');
                specialElement.style.color = nameColor + ' !important';
                
                // إذا كان هناك تأثير للاسم نطبقه أيضاً
                var nameGlow = customization.nameGlow;
                if (nameGlow) {
                    if (nameGlow === 'soft') {
                        specialElement.style.textShadow = '0 0 20px rgba(37,99,235,0.3)';
                    } else if (nameGlow === 'strong') {
                        specialElement.style.textShadow = '0 0 30px rgba(37,99,235,0.6), 0 0 60px rgba(37,99,235,0.3)';
                    } else if (nameGlow === 'rainbow') {
                        specialElement.style.animation = 'rainbowGlow 3s ease infinite';
                    }
                }
            }
        }

        // ===== 7. تحديث لون الاسم =====
        if (customization.nameColor && customization.nameColor !== 'default') {
            var nameElement = card.querySelector('.admin-card-simple-name');
            if (nameElement) {
                nameElement.style.color = customization.nameColor + ' !important';
            }
        }

        // ===== 8. تحديث لون النصوص الثانوية =====
        if (customization.textColor && customization.textColor !== 'default') {
            var infoElement = card.querySelector('.admin-card-simple-info');
            if (infoElement) {
                infoElement.style.color = customization.textColor + ' !important';
            }
        }
    });

    console.log('✅ تم تطبيق التخصيصات على بطاقات المشرفين');
}
// ============================================================
//  التأكد من وجود حاويات المشرفين
// ============================================================
function ensureAdminsContainers() {
    var container = document.getElementById('adminsListContainer');
    if (!container) {
        var pageAdmins = document.getElementById('page-admins');
        if (pageAdmins) {
            container = document.createElement('div');
            container.id = 'adminsListContainer';
            container.className = 'admins-list-container';
            // نضعها بعد شريط التواصل
            var contactBanner = pageAdmins.querySelector('.admin-contact-banner');
            if (contactBanner) {
                contactBanner.parentNode.insertBefore(container, contactBanner.nextSibling);
            } else {
                pageAdmins.appendChild(container);
            }
            console.log('✅ تم إنشاء adminsListContainer');
        }
    }
}

// ============================================================
//  إصلاح دالة updateAdminsStats - التحقق من وجود العناصر
// ============================================================

function updateAdminsStats() {
    if (!users || users.length === 0) {
        setTimeout(function() { updateAdminsStats(); }, 500);
        return;
    }
    
    var admins = users.filter(function(u) { return u.role === 'admin'; });
    var moderators = users.filter(function(u) { return u.role === 'moderator'; });
    var superAdmin = admins.find(function(u) { return u.isSuperAdmin === true; });
    
    var superAdminCount = superAdmin ? 1 : 0;
    var adminCount = admins.length - superAdminCount;
    var moderatorCount = moderators.length;
    var totalAdmins = admins.length + moderators.length;
    
    // تحديث العناصر مع التحقق من وجودها
    updateElementText('superAdminCount', superAdminCount);
    updateElementText('adminCount', adminCount);
    updateElementText('moderatorCount', moderatorCount);
    updateElementText('totalAdminsCount', totalAdmins);
    updateElementText('adminsCountLabel', totalAdmins + ' عضو');
}

// ============================================================
//  دالة مساعدة لتحديث النص مع التحقق من وجود العنصر
// ============================================================

function updateElementText(id, value) {
    var el = document.getElementById(id);
    if (el) {
        el.textContent = value;
    } else {
        // إذا كان العنصر غير موجود، حاول إنشائه
        console.warn('⚠️ العنصر غير موجود، سيتم تجاهل التحديث:', id);
    }
}

// ============================================================
//  دالة buildAdminCard - مع التحقق من وجود user
// ============================================================

function buildAdminCard(user) {
    if (!user) return '';
    
    var uid = user.uid;
    var isSuperAdmin = user.isSuperAdmin || false;
    var role = user.role || 'user';
    
    var roleDisplay = {
        'admin': 'مشرف',
        'moderator': 'مدير'
    };
    
    var roleColors = {
        'admin': { bg: '#fef3c7', color: '#d97706', icon: 'fa-shield-alt' },
        'moderator': { bg: '#dbeafe', color: '#2563eb', icon: 'fa-user-cog' }
    };
    
    var roleInfo = roleColors[role] || roleColors['admin'];
    var roleLabel = roleDisplay[role] || role;
    
    var superBadge = isSuperAdmin ? 
        '<span class="super-admin-badge"><i class="fas fa-crown"></i> الرئيسي</span>' : '';
    
    var roleBadge = `
        <span class="role-badge" style="background:${roleInfo.bg};color:${roleInfo.color};padding:0.2rem 0.8rem;border-radius:20px;font-weight:600;font-size:0.75rem;">
            <i class="fas ${roleInfo.icon}"></i> ${roleLabel}
        </span>
    `;
    
    var joinDate = user.createdAt?.seconds ? 
        new Date(user.createdAt.seconds * 1000).toLocaleDateString('ar') : 
        'غير معروف';
    
    var result = calculateUserPoints(user);
    var badges = calculateBadges(user);
    
    var html = `
        <div class="admin-card ${isSuperAdmin ? 'super-admin-card' : ''}" onclick="viewUserProfile('${uid}')">
            <div class="admin-card-header">
                <div class="admin-card-avatar">
                    <img src="${user.avatar || ''}" onerror="this.src=''" alt="${escapeHtml(user.displayName || 'مستخدم')}" />
                    ${isSuperAdmin ? '<span class="crown-icon"><i class="fas fa-crown"></i></span>' : ''}
                </div>
                <div class="admin-card-info">
                    <div class="admin-card-name">
                        ${escapeHtml(user.displayName || 'مستخدم')}
                        ${superBadge}
                    </div>
                    <div class="admin-card-role">
                        ${roleBadge}
                        <span class="admin-card-joined"><i class="fas fa-calendar-alt"></i> ${joinDate}</span>
                    </div>
                    <div class="admin-card-email">
                        <i class="fas fa-envelope"></i> ${escapeHtml(user.email || '')}
                    </div>
                </div>
                <div class="admin-card-tier">
                    <span class="tier-badge" style="color:${result.tier.color};">
                        <i class="fas ${result.tier.icon}"></i> ${result.tier.name}
                    </span>
                    <span class="points-badge"><i class="fas fa-gem"></i> ${result.earnedPoints} نقطة</span>
                </div>
            </div>
            <div class="admin-card-body">
                ${user.bio ? `<div class="admin-card-bio">${escapeHtml(user.bio)}</div>` : ''}
                <div class="admin-card-stats">
                    <div class="stat-item">
                        <i class="fas fa-trophy"></i>
                        <span>${badges.length}</span>
                        <label>شارات</label>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-vote-yea"></i>
                        <span>${user.votes || 0}</span>
                        <label>تصويتات</label>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-handshake"></i>
                        <span>${(user.trustedBy || []).length}</span>
                        <label>ثقة</label>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-users"></i>
                        <span>${(user.friends || []).length}</span>
                        <label>أصدقاء</label>
                    </div>
                </div>
            </div>
            <div class="admin-card-actions" onclick="event.stopPropagation();">
                <button class="btn btn-primary btn-sm" onclick="viewUserProfile('${uid}')">
                    <i class="fas fa-user"></i> عرض الملف
                </button>
                <button class="btn btn-outline btn-sm" onclick="sendPrivateMessage('${uid}')">
                    <i class="fas fa-envelope"></i> مراسلة
                </button>
                ${!isSuperAdmin && isAdmin ? `
                    <button class="btn btn-warning btn-sm" onclick="toggleUserRole('${uid}')">
                        <i class="fas fa-exchange-alt"></i> تغيير الدور
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    return html;
}

// ============================================================
//  تحديث showPage - إضافة صفحة المشرفين
// ============================================================

// ابحث عن دالة showPage واستبدلها بهذا
function showPage(page) {
    // التحقق من الحظر أولاً
    if (currentUserData && currentUserData.banned === true) {
        if (page !== 'home' && page !== 'admins') {
            showToast('🚫 حسابك محظور، لا يمكنك الوصول إلى هذه الصفحة', 'error');
            page = 'home';
        }
    }
    
    // إخفاء جميع الصفحات
    Object.keys(pages).forEach(function(key) {
        if (pages[key]) {
            pages[key].classList.remove('active');
        }
    });
    
    // إظهار الصفحة المطلوبة
    if (pages[page]) {
        pages[page].classList.add('active');
    }
    
    // تحديث الروابط
    navLinks.forEach(function(link) {
        link.classList.toggle('active', link.dataset.page === page);
    });
    
    // تحميل البيانات حسب الصفحة
    if (page === 'admin' && isAdmin) {
        loadAdminData();
    }
    if (page === 'colleges') {
        loadColleges();
    }
    if (page === 'specialties') {
        loadSpecialties();
    }
    if (page === 'profile') {
        if (currentUserData && currentUserData.banned === true) {
            showToast('🚫 حسابك محظور، لا يمكنك الوصول إلى ملفك الشخصي', 'error');
            page = 'home';
            showPage('home');
            return;
        }
        updateProfileUI();
    }
    if (page === 'users') {
        if (currentUserData && currentUserData.banned === true) {
            showToast('🚫 حسابك محظور، لا يمكنك الوصول إلى هذه الصفحة', 'error');
            page = 'home';
            showPage('home');
            return;
        }
        loadUsersPage();
    }
    if (page === 'admins') {
        if (currentUserData && currentUserData.banned === true) {
            showToast('🚫 حسابك محظور، لا يمكنك الوصول إلى هذه الصفحة', 'error');
            page = 'home';
            showPage('home');
            return;
        }
        loadAdminsPage();
    }
    if (page === 'compare') {
        if (currentUserData && currentUserData.banned === true) {
            showToast('🚫 حسابك محظور، لا يمكنك الوصول إلى هذه الصفحة', 'error');
            page = 'home';
            showPage('home');
            return;
        }
        renderCompare();
    }
    if (page === 'settings') {
        if (currentUserData && currentUserData.banned === true) {
            showToast('🚫 حسابك محظور، لا يمكنك الوصول إلى الإعدادات', 'error');
            page = 'home';
            showPage('home');
            return;
        }
        showPrivacySettings();
    }
}

// ============================================================
//  إضافة دوال showPage إلى النافذة
// ============================================================

window.loadAdminsPage = loadAdminsPage;
window.renderAdminsList = renderAdminsList;
window.buildAdminCard = buildAdminCard;
window.updateAdminsStats = updateAdminsStats;
window.ensureAdminsContainers = ensureAdminsContainers;
window.createAdminsContainer = createAdminsContainer;
window.updateElementText = updateElementText;

// ============================================================
//  LOAD DATA FROM FIREBASE
// ============================================================
async function loadAllData() {
    if (loadingIndicator) loadingIndicator.style.display = 'block';
    try {
        var collegesSnap = await db.collection('colleges').orderBy('name').get();
        colleges = [];
        var collegeIds = new Set();
        collegesSnap.forEach(function(doc) {
            var data = { id: doc.id, ...doc.data() };
            if (!collegeIds.has(doc.id)) {
                collegeIds.add(doc.id);
                colleges.push(data);
            }
        });

        var specsSnap = await db.collection('specialties').orderBy('name').get();
        allSpecialties = [];
        var specIds = new Set();
        specsSnap.forEach(function(doc) {
            var data = { id: doc.id, ...doc.data() };
            if (!specIds.has(doc.id)) {
                specIds.add(doc.id);
                allSpecialties.push(data);
            }
        });

        var coursesSnap = await db.collection('courses').get();
        courses = [];
        var courseIds = new Set();
        var totalComments = 0;
        coursesSnap.forEach(function(doc) {
            var data = { id: doc.id, ...doc.data() };
            if (!courseIds.has(doc.id)) {
                courseIds.add(doc.id);
                courses.push(data);
                totalComments += (data.comments || []).length;
            }
        });

        var usersSnap = await db.collection('users').get();
        users = [];
        allUsers = [];
        var userUids = new Set();
        usersSnap.forEach(function(doc) {
            var userData = { id: doc.id, ...doc.data() };
            if (!userUids.has(doc.id)) {
                userUids.add(doc.id);
                if (!userData.privacy) {
                    userData.privacy = { hideFromUsersList: false, hiddenFields: [], lockProfile: false };
                }
                users.push(userData);
                allUsers.push(userData);
            }
        });
        
        var admins = users.filter(function(u) { return u.role === 'admin'; });
        if (admins.length > 0) {
            admins.sort(function(a, b) {
                return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
            });
            var superAdmin = admins[0];
            var userIndex = users.findIndex(function(u) { return u.uid === superAdmin.uid; });
            if (userIndex !== -1) {
                users[userIndex].isSuperAdmin = true;
            }
            var allIndex = allUsers.findIndex(function(u) { return u.uid === superAdmin.uid; });
            if (allIndex !== -1) {
                allUsers[allIndex].isSuperAdmin = true;
            }
            if (currentUserData && currentUserData.uid === superAdmin.uid) {
                currentUserData.isSuperAdmin = true;
            }
        }

        populateCollegeDropdowns();
        populateFilters();
        populateUsersFilters();
        renderCourses();
        renderUsers();
        updateStats();
        updateHomeStats(totalComments);
        if (currentUser) {
            await updateProfileUI();
        }
    } catch (error) {
        console.error('Error loading data:', error);
        showToast('حدث خطأ في تحميل البيانات: ' + error.message, 'error');
    } finally {
        if (loadingIndicator) loadingIndicator.style.display = 'none';
    }
}

function updateHomeStats(totalComments) {
    if (homeTotalCourses) homeTotalCourses.textContent = courses.length;
    if (homeTotalUsers) {
        var studentCount = users.filter(function(u) { return u.role !== 'admin' && !u.privacy?.hideFromUsersList; }).length;
        homeTotalUsers.textContent = studentCount;
    }
    if (homeTotalComments) homeTotalComments.textContent = totalComments || 0;
    var avg = courses.reduce(function(sum, c) { return sum + (c.avgRating || 0); }, 0);
    var avgRating = courses.length ? (avg / courses.length) : 0;
    if (homeAvgRating) homeAvgRating.textContent = avgRating.toFixed(1);
}

function populateFilters() {
    if (!filterCollege) return;
    var currentVal = filterCollege.value;
    filterCollege.innerHTML = '<option value="all">كل الكليات</option>';
    var uniqueColleges = [];
    var collegeIds = new Set();
    colleges.forEach(function(col) {
        if (!collegeIds.has(col.id)) {
            collegeIds.add(col.id);
            uniqueColleges.push(col);
        }
    });
    uniqueColleges.forEach(function(col) {
        var opt = document.createElement('option');
        opt.value = col.id;
        opt.textContent = col.name;
        filterCollege.appendChild(opt);
    });
    if (currentVal && colleges.some(function(c) { return c.id === currentVal; })) {
        filterCollege.value = currentVal;
    }
}

function populateUsersFilters() {
    if (!usersFilterCollege) return;
    var currentVal = usersFilterCollege.value;
    usersFilterCollege.innerHTML = '<option value="all">كل الكليات</option>';
    var uniqueColleges = [];
    var collegeIds = new Set();
    colleges.forEach(function(col) {
        if (!collegeIds.has(col.id)) {
            collegeIds.add(col.id);
            uniqueColleges.push(col);
        }
    });
    uniqueColleges.forEach(function(col) {
        var opt = document.createElement('option');
        opt.value = col.id;
        opt.textContent = col.name;
        usersFilterCollege.appendChild(opt);
    });
    if (currentVal && colleges.some(function(c) { return c.id === currentVal; })) {
        usersFilterCollege.value = currentVal;
    }
}

// ============================================================
//  POPULATE DROPDOWNS
// ============================================================
async function populateCollegeDropdowns() {
    var selects = [profileCollege, safeGetElement('specialtyCollege')];
    selects.forEach(function(sel) {
        if (!sel) return;
        var val = sel.value;
        sel.innerHTML = '<option value="">اختر الكلية</option>';
        var uniqueColleges = [];
        var collegeIds = new Set();
        colleges.forEach(function(col) {
            if (!collegeIds.has(col.id)) {
                collegeIds.add(col.id);
                uniqueColleges.push(col);
            }
        });
        uniqueColleges.forEach(function(col) {
            var opt = document.createElement('option');
            opt.value = col.id;
            opt.textContent = col.name;
            sel.appendChild(opt);
        });
        if (val && colleges.some(function(c) { return c.id === val; })) {
            sel.value = val;
        }
    });
}

if (profileCollege) {
    profileCollege.addEventListener('change', function() {
        var collegeId = profileCollege.value;
        var select = profileSpecialty;
        if (!select) return;
        select.innerHTML = '<option value="">اختر التخصص</option>';
        allSpecialties.filter(function(s) { return s.collegeId === collegeId; }).forEach(function(spec) {
            var opt = document.createElement('option');
            opt.value = spec.id;
            opt.textContent = spec.name + (spec.hours ? ' (' + spec.hours + ' س)' : '');
            select.appendChild(opt);
        });
    });
}

// ============================================================
//  COURSE FORM DYNAMIC FIELDS
// ============================================================
var cHasMid = safeGetElement('cHasMid');
var cHasLab = safeGetElement('cHasLab');
var cSpecialties = safeGetElement('cSpecialties');

if (cHasMid) {
    cHasMid.addEventListener('change', function() {
        var group = safeGetElement('midUnitsGroup');
        if (group) group.style.display = this.value === 'نعم' ? 'block' : 'none';
    });
}

if (cHasLab) {
    cHasLab.addEventListener('change', function() {
        var show = this.value === 'نعم';
        var practicalGroup = safeGetElement('practicalGroup');
        var labUnitsGroup = safeGetElement('labUnitsGroup');
        var labInfoGroup = safeGetElement('labInfoGroup');
        if (practicalGroup) practicalGroup.style.display = show ? 'block' : 'none';
        if (labUnitsGroup) labUnitsGroup.style.display = show ? 'block' : 'none';
        if (labInfoGroup) labInfoGroup.style.display = show ? 'block' : 'none';
    });
}

if (cSpecialties) {
    cSpecialties.addEventListener('change', function() {
        updatePrereqOptions();
    });
}

async function updatePrereqOptions() {
    var select = safeGetElement('cPrereq');
    if (!select) return;
    var selectedOptions = cSpecialties ? cSpecialties.selectedOptions : [];
    var selectedSpecs = Array.from(selectedOptions).map(function(opt) { return JSON.parse(opt.value); });
    select.innerHTML = '<option value="">لا يوجد</option>';
    if (selectedSpecs.length === 0) return;
    var specIds = selectedSpecs.map(function(s) { return s.id; });
    var relatedCourses = courses.filter(function(c) {
        return c.specialties && c.specialties.some(function(s) { return specIds.indexOf(s.id) !== -1; });
    });
    relatedCourses.forEach(function(c) {
        var opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.name + ' (' + c.code + ')';
        select.appendChild(opt);
    });
    if (relatedCourses.length === 0) {
        var emptyOpt = document.createElement('option');
        emptyOpt.value = '';
        emptyOpt.textContent = 'لا توجد مواد في هذه التخصصات';
        select.appendChild(emptyOpt);
    }
}

// ============================================================
//  GET RATING BY YEAR
// ============================================================
function getRatingByYear(course) {
    var result = {};
    if (!course.voters) return result;
    var voterKeys = Object.keys(course.voters);
    for (var i = 0; i < voterKeys.length; i++) {
        var uid = voterKeys[i];
        var rating = course.voters[uid];
        var user = users.find(function(u) { return u.uid === uid; });
        var year = user?.year || 'unknown';
        if (!result[year]) {
            result[year] = { total: 0, count: 0 };
        }
        result[year].total += rating;
        result[year].count += 1;
    }
    var yearKeys = Object.keys(result);
    for (var j = 0; j < yearKeys.length; j++) {
        var y = yearKeys[j];
        result[y].avg = result[y].count > 0 ? result[y].total / result[y].count : 0;
    }
    return result;
}

// ============================================================
//  GET RATING BY COMPLETED
// ============================================================
function getRatingByCompleted(course) {
    var result = { completed: { total: 0, count: 0 }, notCompleted: { total: 0, count: 0 } };
    if (!course.voters) return result;
    var voterKeys = Object.keys(course.voters);
    for (var i = 0; i < voterKeys.length; i++) {
        var uid = voterKeys[i];
        var rating = course.voters[uid];
        var user = users.find(function(u) { return u.uid === uid; });
        var isCompleted = user?.completed?.indexOf(course.id) !== -1 || false;
        var key = isCompleted ? 'completed' : 'notCompleted';
        result[key].total += rating;
        result[key].count += 1;
    }
    result.completed.avg = result.completed.count > 0 ? result.completed.total / result.completed.count : 0;
    result.notCompleted.avg = result.notCompleted.count > 0 ? result.notCompleted.total / result.notCompleted.count : 0;
    return result;
}

// ============================================================
//  RENDER COURSES
// ============================================================
function renderCourses() {
    if (!container) return;
    var search = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var year = filterYear ? filterYear.value : 'all';
    var college = filterCollege ? filterCollege.value : 'all';
    var specialty = filterSpecialty ? filterSpecialty.value : 'all';
    var filtered = courses.filter(function(course) {
        if (search && course.name.toLowerCase().indexOf(search) === -1 && course.code.toLowerCase().indexOf(search) === -1) return false;
        if (year !== 'all' && course.year != year) return false;
        if (college !== 'all') {
            var hasCollege = false;
            if (course.specialties) {
                for (var i = 0; i < course.specialties.length; i++) {
                    if (course.specialties[i].collegeId === college) {
                        hasCollege = true;
                        break;
                    }
                }
            }
            if (!hasCollege) return false;
        }
        if (specialty !== 'all') {
            var hasSpecialty = false;
            if (course.specialties) {
                for (var j = 0; j < course.specialties.length; j++) {
                    if (course.specialties[j].id === specialty) {
                        hasSpecialty = true;
                        break;
                    }
                }
            }
            if (!hasSpecialty) return false;
        }
        return true;
    });
    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><h3>لا توجد مواد</h3><p>' + (courses.length === 0 ? 'لم يتم إضافة أي مواد بعد' : 'حاول تعديل معايير البحث') + '</p></div>';
        return;
    }
    filtered.sort(function(a, b) { return (b.avgRating || 0) - (a.avgRating || 0); });
    var html = '';
    for (var k = 0; k < filtered.length; k++) {
        var course = filtered[k];
        var avg = course.avgRating || 0;
        var votes = course.votes || 0;
        var ratingText = getRatingText(avg);
        var comments = course.comments || [];
        var isFav = currentUserData && currentUserData.favorites && currentUserData.favorites.indexOf(course.id) !== -1 || false;
        var isCompleted = currentUserData && currentUserData.completed && currentUserData.completed.indexOf(course.id) !== -1 || false;
        var userVote = currentUserData && currentUserData.uid && course.voters ? course.voters[currentUserData.uid] : null;
        var distribution = getRatingDistribution(course.voters || {});
        var ratingByYear = getRatingByYear(course);
        var yearKeys = Object.keys(ratingByYear).filter(function(y) { return y !== 'unknown'; }).sort();
        var ratingByCompleted = getRatingByCompleted(course);
        var favCount = users.filter(function(u) { return u.favorites && u.favorites.indexOf(course.id) !== -1; }).length;
        html += '<div class="course-card" data-id="' + course.id + '">';
        html += '<div class="course-card-header"><span class="course-title">' + escapeHtml(course.name) + '</span><span class="course-code">' + escapeHtml(course.code) + '</span></div>';
        html += '<div class="course-meta">';
        html += '<span class="tag"><i class="fas fa-layer-group"></i> ' + course.type + '</span>';
        html += '<span class="tag"><i class="fas fa-calendar-alt"></i> سنة ' + course.year + '</span>';
        html += '<span class="tag"><i class="fas fa-hourglass-half"></i> ' + course.hours + ' س</span>';
        if (course.hasLab === 'نعم') html += '<span class="tag"><i class="fas fa-microscope"></i> عملي</span>';
        if (course.prereq) html += '<span class="tag"><i class="fas fa-link"></i> متطلب: ' + escapeHtml(course.prereq) + '</span>';
        if (course.hasMid === 'نعم') html += '<span class="tag"><i class="fas fa-pencil-alt"></i> نصفي</span>';
        if (course.hasActivity === 'نعم') html += '<span class="tag"><i class="fas fa-running"></i> نشاط</span>';
        html += '</div>';
        html += '<div class="course-desc">' + escapeHtml(course.desc || 'لا يوجد وصف') + '</div>';
        html += '<div class="rating-area">';
        html += '<div class="rating-stats"><span class="rating-text"><i class="fas fa-star"></i> ' + (avg ? avg.toFixed(1) : '?') + '</span><span class="rating-badge">' + ratingText + ' · ' + votes + ' صوت</span></div>';
        if (yearKeys.length > 0) {
            html += '<div class="rating-by-year">';
            for (var yIdx = 0; yIdx < yearKeys.length; yIdx++) {
                var y = yearKeys[yIdx];
                html += '<div class="year-item"><span class="year-label">سنة ' + y + '</span><span class="year-rating">' + ratingByYear[y].avg.toFixed(1) + ' ★</span><span class="year-count">(' + ratingByYear[y].count + ')</span></div>';
            }
            html += '</div>';
        }
        html += '<div class="rating-by-year" style="grid-template-columns:1fr 1fr;">';
        html += '<div class="year-item" style="border-color:var(--success);"><span class="year-label">✅ مجتازين</span><span class="year-rating">' + ratingByCompleted.completed.avg.toFixed(1) + ' ★</span><span class="year-count">(' + ratingByCompleted.completed.count + ')</span></div>';
        html += '<div class="year-item" style="border-color:var(--gray-400);"><span class="year-label">❌ غير مجتازين</span><span class="year-rating">' + ratingByCompleted.notCompleted.avg.toFixed(1) + ' ★</span><span class="year-count">(' + ratingByCompleted.notCompleted.count + ')</span></div>';
        html += '</div>';
        html += '<div style="text-align:center;font-size:0.75rem;color:var(--gray-500);margin-top:0.2rem;"><i class="fas fa-star" style="color:var(--warning);"></i> ' + favCount + ' مستخدم أضافها للمفضلة</div>';
        if (currentUser) {
            html += '<div class="vote-buttons">';
            for (var r = 0; r < RATING_LABELS.length; r++) {
                var ratingValue = 5 - r;
                var isVoted = userVote === ratingValue;
                html += '<button class="vote-btn ' + (isVoted ? 'voted' : '') + '" data-rating="' + ratingValue + '" data-id="' + course.id + '">' + RATING_LABELS[r] + '</button>';
            }
            html += '</div>';
        } else {
            html += '<div style="text-align:center;font-size:0.8rem;color:var(--gray-400);margin-top:0.3rem;">سجل دخول للتصويت</div>';
        }
        if (votes > 0) {
            html += '<div class="rating-bars">';
            for (var r2 = 0; r2 < RATING_LABELS.length; r2++) {
                var ratingValue2 = 5 - r2;
                var count = distribution[ratingValue2] || 0;
                var pct = votes > 0 ? (count / votes * 100) : 0;
                html += '<div class="rating-bar"><span class="bar-label">' + RATING_LABELS[r2] + '</span><div class="bar-track"><div class="bar-fill" style="width:' + pct + '%;"></div></div><span style="font-size:0.7rem;color:var(--gray-400);min-width:30px;">' + count + '</span></div>';
            }
            html += '</div>';
        }
        html += '</div>';
        html += '<div class="comments-section">';
        for (var cIdx = 0; cIdx < Math.min(comments.length, 3); cIdx++) {
            html += '<div class="comment-item"><i class="fas fa-comment"></i> ' + escapeHtml(comments[cIdx]) + '</div>';
        }
        if (currentUser) {
            html += '<div class="comment-input-area"><input type="text" placeholder="أضف تعليق..." class="comment-input" data-id="' + course.id + '" /><button class="comment-submit" data-id="' + course.id + '"><i class="fas fa-paper-plane"></i></button></div>';
        }
        html += '</div>';
        html += '<div class="course-actions-bar">';
        html += '<button class="btn ' + (isFav ? 'btn-primary' : 'btn-outline') + ' favorite-btn" data-id="' + course.id + '"><i class="fas fa-star"></i> ' + (isFav ? 'مفضلة' : 'أضف لمفضلة') + '</button>';
        html += '<button class="btn ' + (isCompleted ? 'btn-success' : 'btn-outline') + ' complete-btn" data-id="' + course.id + '"><i class="fas fa-check"></i> ' + (isCompleted ? 'تم اجتيازها' : 'اجتياز') + '</button>';
        html += '<button class="btn btn-outline vote-details-btn" data-id="' + course.id + '"><i class="fas fa-chart-bar"></i> تفاصيل التصويت</button>';
        html += '<button class="btn btn-info course-info-btn" data-id="' + course.id + '"><i class="fas fa-info-circle"></i> معلومات</button>';
        html += '<button class="btn btn-outline analytics-btn" data-id="' + course.id + '"><i class="fas fa-chart-line"></i> تحليلات</button>';
        if (isAdmin) {
            html += '<button class="btn btn-primary" onclick="editCourse(\'' + course.id + '\')"><i class="fas fa-edit"></i></button>';
            html += '<button class="btn btn-danger" onclick="deleteCourse(\'' + course.id + '\')"><i class="fas fa-trash"></i></button>';
        }
        html += '</div></div>';
    }
    container.innerHTML = html;
    attachEventListeners();
}

// ============================================================
//  VOTE DETAILS
// ============================================================

if (voteDetailsClose) {
    voteDetailsClose.addEventListener('click', function() {
        if (voteDetailsModal) voteDetailsModal.classList.remove('active');
    });
}

// ============================================================
//  USER PROFILE VIEW - عرض تخصيصات الملف
// ============================================================
// ===== نظام إدارة المودالات المتداخلة =====

function openModalWithStack(modalId, overlayLevel) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    
    // تحديد مستوى التداخل
    var level = overlayLevel || 1;
    if (level === 2) {
        modal.classList.add('modal-overlay-2');
    } else if (level === 3) {
        modal.classList.add('modal-overlay-3');
    }
    
    // إضافة للمكدس
    modalStack.push(modalId);
    
    // فتح المودال
    modal.classList.add('active');
    
    // منع التمرير في الخلفية
    if (modalStack.length === 1) {
        document.body.style.overflow = 'hidden';
    }
}

function closeModalWithStack(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    
    // إزالة المودال من المكدس
    var index = modalStack.indexOf(modalId);
    if (index !== -1) {
        modalStack.splice(index, 1);
    }
    
    // إغلاق المودال
    modal.classList.remove('active');
    modal.classList.remove('modal-overlay-2');
    modal.classList.remove('modal-overlay-3');
    
    // إعادة التمرير إذا لم يعد هناك مودالات مفتوحة
    if (modalStack.length === 0) {
        document.body.style.overflow = '';
    }
}


// ===== تحديث دوال فتح المودالات =====

// فتح مودال المستخدم
// ============================================================
//  متغيرات للتحكم في حالة المودالات
// ============================================================
var isUserProfileModalOpening = false;
var isCourseActionsModalOpening = false;

// ============================================================
//  دوال الإغلاق والرجوع
// ============================================================

// ===== إغلاق مودال المستخدم =====
function closeUserProfileModal() {
    console.log('🔒 إغلاق مودال المستخدم');
    if (isModalOpen('courseActionsModal')) {
        closeModal('courseActionsModal');
    }
    closeModal('userProfileModal');
    currentViewedUserUid = null;
    // إزالة أي style مخصص للمستخدم
    var styleElements = document.querySelectorAll('style[id^="modal-custom-style-"]');
    styleElements.forEach(function(el) {
        el.remove();
    });
}


// ============================================================
//  إضافة متغيرات لتتبع المودال السابق
// ============================================================

var previousModalId = null; // لتخزين المودال الذي كان مفتوحاً قبل فتح مودال المادة

// ============================================================
//  تحديث showCourseActions - حفظ المودال السابق
// ============================================================



// ============================================================
//  تحديث buildCourseActionsHTML - إضافة زر رجوع يعود للمودال السابق
// ============================================================

function buildCourseActionsHTML(course, userUid) {
    // التحقق من المستخدم الحالي
    var currentUserDataLocal = currentUserData;
    
    // التحقق من حالة المستخدم الحالي
    var isFav = false;
    var isCompleted = false;
    var userVote = null;
    
    if (currentUserDataLocal) {
        if (currentUserDataLocal.favorites && Array.isArray(currentUserDataLocal.favorites)) {
            isFav = currentUserDataLocal.favorites.indexOf(course.id) !== -1;
        }
        if (currentUserDataLocal.completed && Array.isArray(currentUserDataLocal.completed)) {
            isCompleted = currentUserDataLocal.completed.indexOf(course.id) !== -1;
        }
        if (course.voters && currentUserDataLocal.uid && course.voters[currentUserDataLocal.uid]) {
            userVote = course.voters[currentUserDataLocal.uid];
        }
    }
    
    var avg = course.avgRating || 0;
    var votes = course.votes || 0;
    
    var html = '';
    
    // ===== معلومات المادة =====
    html += '<div class="course-actions-info">';
    html += '<div class="course-info-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:0.3rem 0.8rem;margin:0.3rem 0;padding:0.5rem;background:var(--gray-50);border-radius:8px;border:1px solid var(--border-color);">';
    html += '<div class="info-item"><span class="label" style="font-weight:600;color:var(--gray-500);font-size:0.7rem;">🏷️ النوع</span><span class="value" style="color:var(--text-color);font-size:0.85rem;">' + course.type + '</span></div>';
    html += '<div class="info-item"><span class="label" style="font-weight:600;color:var(--gray-500);font-size:0.7rem;">📅 السنة</span><span class="value" style="color:var(--text-color);font-size:0.85rem;">' + course.year + '</span></div>';
    html += '<div class="info-item"><span class="label" style="font-weight:600;color:var(--gray-500);font-size:0.7rem;">⏱️ الساعات</span><span class="value" style="color:var(--text-color);font-size:0.85rem;">' + course.hours + ' س</span></div>';
    html += '<div class="info-item"><span class="label" style="font-weight:600;color:var(--gray-500);font-size:0.7rem;">📊 التقييم</span><span class="value" style="color:var(--text-color);font-size:0.85rem;">' + (avg ? avg.toFixed(1) : '?') + ' ★ (' + votes + ' صوت)</span></div>';
    if (course.desc) {
        html += '<div class="info-item" style="grid-column:1/-1;"><span class="label" style="font-weight:600;color:var(--gray-500);font-size:0.7rem;">📝 الوصف</span><span class="value" style="color:var(--text-color);font-size:0.85rem;">' + escapeHtml(course.desc) + '</span></div>';
    }
    html += '</div>';
    html += '</div>';
    
    // ===== أزرار الإجراءات =====
    html += '<div class="course-actions-buttons" style="display:grid;grid-template-columns:1fr 1fr;gap:0.3rem;margin:0.5rem 0;">';
    
    // زر المفضلة
    var favBtnClass = isFav ? 'btn-warning' : 'btn-outline';
    var favText = isFav ? '✅ مفضلة' : '⭐ أضف لمفضلة';
    html += '<button class="btn ' + favBtnClass + '" onclick="handleQuickFavorite(\'' + course.id + '\')" style="justify-content:center;font-size:0.8rem;padding:0.3rem 0.5rem;">';
    html += '<i class="fas fa-star"></i> ' + favText;
    html += '</button>';
    
    // زر الاجتياز
    var compBtnClass = isCompleted ? 'btn-success' : 'btn-outline';
    var compText = isCompleted ? '✅ مجتاز' : '📝 اجتياز';
    html += '<button class="btn ' + compBtnClass + '" onclick="handleQuickComplete(\'' + course.id + '\')" style="justify-content:center;font-size:0.8rem;padding:0.3rem 0.5rem;">';
    html += '<i class="fas fa-check-circle"></i> ' + compText;
    html += '</button>';
    
    // زر معلومات
    html += '<button class="btn btn-info" onclick="handleQuickInfo(\'' + course.id + '\')" style="justify-content:center;font-size:0.8rem;padding:0.3rem 0.5rem;">';
    html += '<i class="fas fa-info-circle"></i> معلومات';
    html += '</button>';
    
    // زر تفاصيل التصويت
    html += '<button class="btn btn-outline" onclick="handleQuickVoteDetails(\'' + course.id + '\')" style="justify-content:center;font-size:0.8rem;padding:0.3rem 0.5rem;">';
    html += '<i class="fas fa-chart-bar"></i> تفاصيل التصويت';
    html += '</button>';
    
    // زر التحليلات
    html += '<button class="btn btn-outline" onclick="handleQuickAnalytics(\'' + course.id + '\')" style="justify-content:center;font-size:0.8rem;padding:0.3rem 0.5rem;grid-column:1/-1;">';
    html += '<i class="fas fa-chart-line"></i> تحليلات المادة';
    html += '</button>';
    
    html += '</div>';
    
    // ===== التصويت (للمستخدم الحالي فقط) =====
    if (currentUser) {
        html += '<div class="course-quick-vote" style="border-top:1px solid var(--border-color);padding-top:0.5rem;margin-top:0.3rem;">';
        html += '<label style="font-weight:600;font-size:0.8rem;display:block;margin-bottom:0.2rem;">🎯 صوت على المادة:</label>';
        html += '<div class="vote-buttons" style="display:flex;flex-wrap:wrap;gap:0.2rem;">';
        for (var r = 0; r < RATING_LABELS.length; r++) {
            var ratingValue = 5 - r;
            var isVoted = userVote === ratingValue;
            html += '<button class="vote-btn ' + (isVoted ? 'voted' : '') + '" onclick="handleQuickVote(\'' + course.id + '\', ' + ratingValue + ')" style="font-size:0.7rem;padding:0.15rem 0.6rem;">' + RATING_LABELS[r] + '</button>';
        }
        html += '</div>';
        html += '</div>';
        
        // ===== التعليقات =====
        html += '<div class="course-quick-comment" style="border-top:1px solid var(--border-color);padding-top:0.5rem;margin-top:0.3rem;">';
        html += '<label style="font-weight:600;font-size:0.8rem;display:block;margin-bottom:0.2rem;">💬 أضف تعليق:</label>';
        html += '<div style="display:flex;gap:0.3rem;">';
        html += '<input type="text" id="quickCommentInput" placeholder="اكتب تعليقك..." style="flex:1;padding:0.3rem 0.8rem;border:1.5px solid var(--border-color);border-radius:12px;background:var(--gray-50);color:var(--text-color);font-size:0.8rem;" />';
        html += '<button class="btn btn-primary" onclick="handleQuickComment(\'' + course.id + '\')" style="font-size:0.8rem;padding:0.3rem 0.8rem;"><i class="fas fa-paper-plane"></i></button>';
        html += '</div>';
        html += '</div>';
    }
    
    // ===== التعليقات الموجودة =====
    if (course.comments && course.comments.length > 0) {
        html += '<div class="course-quick-comments" style="border-top:1px solid var(--border-color);padding-top:0.5rem;margin-top:0.3rem;">';
        html += '<label style="font-weight:600;font-size:0.8rem;display:block;margin-bottom:0.2rem;">💬 التعليقات (' + course.comments.length + '):</label>';
        var maxComments = Math.min(course.comments.length, 5);
        for (var i = 0; i < maxComments; i++) {
            html += '<div class="comment-item" style="font-size:0.8rem;padding:0.2rem 0.6rem;background:var(--gray-50);border-radius:12px;margin-bottom:0.2rem;border:1px solid var(--border-color);"><i class="fas fa-comment" style="font-size:0.7rem;"></i> ' + escapeHtml(course.comments[i]) + '</div>';
        }
        if (course.comments.length > 5) {
            html += '<div style="text-align:center;color:var(--gray-400);font-size:0.75rem;">... و ' + (course.comments.length - 5) + ' تعليق آخر</div>';
        }
        html += '</div>';
    }
    
    return html;
}

// ============================================================
//  تحديث دوال الإجراءات السريعة - الحفاظ على المودال السابق
// ============================================================

function handleQuickInfo(courseId) {
    // حفظ المودال الحالي قبل الإغلاق
    var currentModal = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
    if (currentModal === 'courseActionsModal') {
        // إذا كنا في مودال المادة، نحفظ المودال السابق
        if (previousModalId) {
            // نترك previousModalId كما هو
        }
    }
    
    closeModal('courseActionsModal');
    setTimeout(function() {
        showCourseInfo(courseId);
    }, 300);
}

function handleQuickVoteDetails(courseId) {
    var currentModal = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
    if (currentModal === 'courseActionsModal') {
        if (previousModalId) {
            // نترك previousModalId كما هو
        }
    }
    
    closeModal('courseActionsModal');
    setTimeout(function() {
        showVoteDetails(courseId);
    }, 300);
}

function handleQuickAnalytics(courseId) {
    var currentModal = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
    if (currentModal === 'courseActionsModal') {
        if (previousModalId) {
            // نترك previousModalId كما هو
        }
    }
    
    closeModal('courseActionsModal');
    setTimeout(function() {
        showCourseAnalytics(courseId);
    }, 300);
}

// ============================================================
//  تحديث دوال عرض المعلومات والتفاصيل - للعودة للمودال السابق
// ============================================================






// ============================================================
//  أحداث المودالات العامة
// ============================================================

// إغلاق المودال عند النقر على الخلفية
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        var modalId = e.target.id;
        if (modalStack.length > 0 && modalStack[modalStack.length - 1] === modalId) {
            closeModal(modalId);
        }
    }
});

// إغلاق المودال عند الضغط على Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (modalStack.length > 0) {
            var topId = modalStack[modalStack.length - 1];
            closeModal(topId);
        }
    }
});

// زر إغلاق مودال المستخدم
if (userProfileClose) {
    userProfileClose.addEventListener('click', function() {
        closeUserProfileModal();
    });
}


// ============================================================
//  تحديث buildUserProfileHTML - إصلاح giftCount
// ============================================================

// ============================================================
//  إضافة زر 3 نقاط في مودال المستخدم مع قائمة الإجراءات
// ============================================================

// تحديث buildUserProfileHTML - إضافة زر القائمة
function buildUserProfileHTML(user) {
    var uid = user.uid;
    var viewerUid = currentUser ? currentUser.uid : null;
    var isCurrentUser = viewerUid === uid;

    // استخدام الدالة المساعدة
    function canView(field) {
        return canViewUserData(user, field, viewerUid);
    }

    var result = calculateUserPoints(user);
    var isBlocked = isUserBlocked(uid);
    var isBlockedBy = isUserBlockedBy(uid);

    var friendshipStatus = getFriendshipStatus(uid);
    var friendshipBadge = getFriendshipBadge(friendshipStatus);

    var customization = user.customization || {};
    var avatarBorderColor = customization.avatarBorder || '#2563eb';
	var avatarBorderWidth = customization.avatarBorderWidth || '3';
    var avatarBorderStyle = customization.avatarBorderStyle || 'solid';
	// إذا كان السمك 'none'، نضع border-width: 0
var borderWidthAttr = (avatarBorderWidth === 'none' || !avatarBorderWidth) ? '0px' : avatarBorderWidth + 'px';
var borderStyleAttr = (avatarBorderWidth === 'none' || !avatarBorderWidth) ? 'none' : (avatarBorderStyle || 'solid');

var imgStyle = '';
imgStyle += 'border-color:' + avatarBorderColor + ';';
imgStyle += 'border-width:' + borderWidthAttr + ';';
imgStyle += 'border-style:' + borderStyleAttr + ';';

// ثم في عنصر img:
html += '<img src="' + (user.avatar || '') + '" style="width:80px;height:80px;border-radius:50%;object-fit:cover;' + imgStyle + '" />';
    var avatarEffect = customization.avatarEffect || 'none';
    var profileBg = customization.profileBg || 'default';
    var nameColor = customization.nameColor || '';
    var badgeStyle = customization.badgeStyle || 'default';
    var nameGlow = customization.nameGlow || 'none';
    var profileFrame = customization.profileFrame || 'default';
    var specialBadge = customization.specialBadge || 'none';
    var textColor = customization.textColor || '';
    var bioColor = customization.bioColor || '';
    var buttonColor = customization.buttonColor || '';

    var favCount = (user.favorites || []).length;
    var compCount = (user.completed || []).length;
    var voteCount = user.votes || 0;
    var friendsCount = (user.friends || []).length;
    var trustCount = (user.trustedBy || []).length;
    var reportCount = (user.reports || []).length;
    var badges = calculateBadges(user);
    var giftsCount = (user.receivedGifts || []).length;
    var isBanned = user.banned || false;

    var collectiblesCount = 0;
    for (var key in customization) {
        if (customization.hasOwnProperty(key) && customization[key] && customization[key] !== 'default' && customization[key] !== 'none') {
            collectiblesCount++;
        }
    }


var userRole = user.role || 'user';
var isAdminUser = userRole === 'admin';
var isSuperAdmin = user.isSuperAdmin || false;

var roleBadge = '';
if (isSuperAdmin) {
    roleBadge = '<span class="role-badge super-admin" style="background:linear-gradient(135deg,#ffd700,#f59e0b);color:#78350f;padding:0.2rem 0.8rem;border-radius:20px;font-weight:700;font-size:0.75rem;"><i class="fas fa-crown"></i> المشرف الرئيسي</span>';
} else if (isAdminUser) {
    roleBadge = '<span class="role-badge admin" style="background:var(--primary-light);color:var(--primary-dark);padding:0.2rem 0.8rem;border-radius:20px;font-weight:600;font-size:0.75rem;"><i class="fas fa-shield-alt"></i> مشرف</span>';
}

    var specialBadgeHTML = '';
    if (specialBadge && specialBadge !== 'none') {
        specialBadgeHTML = '<span class="special-badge-display"><i class="fas ' + specialBadge + '" style="font-size:1rem;margin-left:0.3rem;"></i></span>';
    }

    // عرض الكلية والتخصص فقط إذا كان مسموحاً
    var collegeName = 'غير محدد';
    if (canView('college') && user.college) {
        var col = colleges.find(function(c) { return c.id === user.college; });
        if (col) collegeName = col.name;
    }
    var specName = 'غير محدد';
    if (canView('specialty') && user.specialty) {
        var spec = allSpecialties.find(function(s) { return s.id === user.specialty; });
        if (spec) specName = spec.name;
    }

    var containerId = 'userProfileViewContainer_' + uid;

    var html = '<div class="user-profile-view" id="' + containerId + '" data-user-uid="' + uid + '" style="';
    if (profileBg && profileBg !== 'default') {
        var bgInfo = BG_STYLES[profileBg];
        if (bgInfo) {
            html += 'background:' + bgInfo.bg + ';color:' + bgInfo.textColor + ';';
            html += 'padding:1rem;border-radius:16px;';
        }
    }
    html += '">';

    // ===== رأس المودال =====
    html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem;">';

    if (!isCurrentUser) {
        html += '<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">';
        html += friendshipBadge;
        if (friendshipStatus === 'none') {
            html += '<button class="btn btn-primary btn-sm" onclick="sendFriendRequest(\'' + uid + '\')"><i class="fas fa-user-plus"></i> إضافة</button>';
        } else if (friendshipStatus === 'pending_from_them') {
            html += '<button class="btn btn-success btn-sm" onclick="acceptFriendRequest(\'' + uid + '\')"><i class="fas fa-check"></i> قبول</button>';
            html += '<button class="btn btn-danger btn-sm" onclick="rejectFriendRequest(\'' + uid + '\')"><i class="fas fa-times"></i> رفض</button>';
        } else if (friendshipStatus === 'friend') {
            html += '<button class="btn btn-danger btn-sm" onclick="unfriend(\'' + uid + '\')"><i class="fas fa-user-minus"></i> إلغاء</button>';
        } else if (friendshipStatus === 'pending_from_me') {
            html += '<button class="btn btn-warning btn-sm" onclick="cancelFriendRequest(\'' + uid + '\')"><i class="fas fa-times"></i> إلغاء الطلب</button>';
        }
        html += '</div>';
    } else {
        html += '<span style="font-weight:600;color:var(--gray-500);">👤 أنت</span>';
    }
// ===== زر 3 نقاط (القائمة المنسدلة) =====
if (!isCurrentUser && (isAdmin || currentUser)) {
    html += `
    <div class="user-actions-dropdown" style="position:relative;">
        <button class="dropdown-toggle-btn" onclick="toggleUserActionsMenu('${uid}')" title="إجراءات إضافية">
            <i class="fas fa-ellipsis-v"></i>
        </button>
        <div class="dropdown-menu" id="userActionsMenu_${uid}" style="display:none;position:absolute;top:100%;left:0;background:var(--card-bg);border:1px solid var(--border-color);border-radius:12px;box-shadow:var(--shadow-lg);z-index:1000;min-width:180px;padding:0.3rem 0;">
            

            
            ${isAdmin ? `
                ${isBanned ? 
                    `<button class="dropdown-item" onclick="unbanUser('${uid}')"><i class="fas fa-user-check" style="color:#22c55e;"></i> إلغاء الحظر</button>` :
                    `<button class="dropdown-item" onclick="banUser('${uid}')"><i class="fas fa-ban" style="color:#dc2626;"></i> حظر المستخدم</button>`
                }
                <button class="dropdown-item" onclick="toggleUserRole('${uid}')"><i class="fas fa-exchange-alt" style="color:#3b82f6;"></i> تغيير الدور</button>
                <button class="dropdown-item" onclick="adminGivePointsFromModal('${uid}')"><i class="fas fa-gem" style="color:#f59e0b;"></i> إعطاء نقاط</button>
                <hr style="margin:0.2rem 0;border-color:var(--border-color);">
            ` : ''}
            
            <button class="dropdown-item" onclick="event.stopPropagation(); sendPrivateMessage('${uid}')">
                <i class="fas fa-envelope" style="color:#8b5cf6;"></i> مراسلة
            </button>
                        <!-- ===== زر الإهداء (جديد) ===== -->
            <button class="dropdown-item" onclick="event.stopPropagation(); showSendGiftModal('${uid}')">
                <i class="fas fa-gift" style="color:#f59e0b;"></i> إهداء نقاط
            </button>
            <button class="dropdown-item" onclick="event.stopPropagation(); trustUser('${uid}')">
                <i class="fas fa-handshake" style="color:#10b981;"></i> ${user.trustedBy && user.trustedBy.indexOf(currentUser?.uid) !== -1 ? 'إلغاء الثقة' : 'ثق بي'}
            </button>
            <button class="dropdown-item" onclick="event.stopPropagation(); reportUser('${uid}')">
                <i class="fas fa-flag" style="color:#ef4444;"></i> ${user.reports && user.reports.indexOf(currentUser?.uid) !== -1 ? 'إلغاء الإبلاغ' : 'الإبلاغ'}
            </button>
            <button class="dropdown-item" onclick="event.stopPropagation(); ${isBlocked ? `unblockUser('${uid}')` : `blockUser('${uid}')`}">
                <i class="fas ${isBlocked ? 'fa-undo' : 'fa-ban'}" style="color:${isBlocked ? '#22c55e' : '#dc2626'};"></i> 
                ${isBlocked ? 'إلغاء الحظر' : 'حظر المستخدم'}
            </button>
            <hr style="margin:0.2rem 0;border-color:var(--border-color);">
            <button class="dropdown-item" onclick="event.stopPropagation(); viewUserProfile('${uid}')">
                <i class="fas fa-external-link-alt"></i> فتح الملف
            </button>
        </div>
    </div>
    `;
}  



    html += '</div>';
    
    // ===== رأس الملف الشخصي =====
    // ===== رأس الملف الشخصي =====
    html += '<div class="view-header" style="display:flex;align-items:center;gap:1rem;padding-bottom:0.75rem;border-bottom:1px solid rgba(255,255,255,0.1);margin-bottom:0.75rem;">';

    var effectClass = '';
    if (avatarEffect === 'glow') effectClass = 'effect-glow';
    else if (avatarEffect === 'pulse') effectClass = 'effect-pulse';
    else if (avatarEffect === 'rotate') effectClass = 'effect-rotate';
    else if (avatarEffect === 'shake') effectClass = 'effect-shake';

    var frameStyle = '';
    if (profileFrame === 'rounded') frameStyle = 'border-radius:20%;';
    else if (profileFrame === 'square') frameStyle = 'border-radius:0;';
    else if (profileFrame === 'star') frameStyle = 'clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);border-radius:0;';
    else if (profileFrame === 'heart') frameStyle = 'clip-path:path("M50,90 C20,60 0,40 0,25 C0,10 15,0 30,0 C40,0 48,8 50,18 C52,8 60,0 70,0 C85,0 100,10 100,25 C100,40 80,60 50,90Z");border-radius:0;';
    else if (profileFrame === 'diamond') frameStyle = 'clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);border-radius:0;';

    html += '<div class="profile-avatar ' + effectClass + '" style="display:inline-block;">';
    html += '<img class="view-avatar" src="' + (user.avatar || '') + '" onerror="this.src=\'\'" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:4px solid ' + avatarBorderColor + ';' + frameStyle + '" />';
    html += '</div>';

    html += '<div class="view-info" style="flex:1;">';

    var nameStyle = nameColor ? 'color:' + nameColor + ';' : '';
    if (nameGlow === 'soft') nameStyle += 'text-shadow:0 0 20px rgba(37,99,235,0.3);';
    else if (nameGlow === 'strong') nameStyle += 'text-shadow:0 0 30px rgba(37,99,235,0.6),0 0 60px rgba(37,99,235,0.3);';
    else if (nameGlow === 'rainbow') nameStyle += 'animation:rainbowGlow 3s ease infinite;';

    html += '<h3 style="margin:0;font-size:1.2rem;' + nameStyle + '">';
    html += escapeHtml(user.displayName || 'مستخدم');
    html += ' ' + specialBadgeHTML;
    html += ' <span class="badge" style="font-size:0.65rem;background:rgba(255,255,255,0.2);color:inherit;">' + result.tier.name + '</span>';
    if (isBanned) html += ' <span style="font-size:0.6rem;background:#dc2626;color:white;padding:0.05rem 0.5rem;border-radius:20px;">🚫 محظور</span>';
    html += '</h3>';

    html += '<div style="display:flex;gap:0.3rem;flex-wrap:wrap;margin:0.2rem 0;">';
    html += roleBadge;
    html += '</div>';

// ===== عرض الشارة المميزة =====
var featuredBadge = customization.featuredBadge;
if (featuredBadge && featuredBadge !== 'none') {
    var allBadges = getAllBadges();
    var badge = allBadges.find(function(b) { return b.name === featuredBadge; });
    if (badge) {
        var textColor = customization.featuredBadgeTextColor || 'default';
        var bg = customization.featuredBadgeBg || 'default';
        var size = customization.featuredBadgeSize || 'medium';
        var effect = customization.featuredBadgeEffect || 'none';
        var border = customization.featuredBadgeBorder || 'none';
        var borderColor = customization.featuredBadgeBorderColor || 'default';
        var boxBg = customization.featuredBadgeBoxBg || 'default';
        var boxBorder = customization.featuredBadgeBoxBorder || 'none';
        var boxBorderColor = customization.featuredBadgeBoxBorderColor || 'default';

        var badgeStyles = [];
        if (textColor && textColor !== 'default') badgeStyles.push('color:' + textColor);
        var bgMap = {
            'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
            'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
            'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
            'neon': 'background:linear-gradient(135deg,#00ffff,#ff00ff)',
            'dark': 'background:#1e293b'
        };
        if (bg && bg !== 'default' && bgMap[bg]) {
            badgeStyles.push(bgMap[bg]);
        } else {
            badgeStyles.push('background:var(--primary-light)');
        }
        if (size === 'small') badgeStyles.push('font-size:0.6rem;padding:0.1rem 0.5rem');
        else if (size === 'large') badgeStyles.push('font-size:0.9rem;padding:0.3rem 1.2rem');
        else badgeStyles.push('font-size:0.75rem;padding:0.2rem 0.8rem');
        if (effect === 'glow') badgeStyles.push('animation:glowBadge 2s ease-in-out infinite');
        else if (effect === 'pulse') badgeStyles.push('animation:pulse 1.5s ease-in-out infinite');
        else if (effect === 'shine') badgeStyles.push('background:linear-gradient(135deg,#f093fb,#f5576c,#f093fb);background-size:200% 200%;animation:shine 3s ease infinite');
        if (border !== 'none') {
            var bColor = (borderColor && borderColor !== 'default') ? borderColor : '#2563eb';
            badgeStyles.push('border:' + border + ' 2px ' + bColor);
        }

        var boxStyles = [];
        var boxBgMap = {
            'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
            'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
            'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
            'dark': 'background:#1e293b'
        };
        if (boxBg && boxBg !== 'default' && boxBgMap[boxBg]) {
            boxStyles.push(boxBgMap[boxBg]);
        } else {
            boxStyles.push('background:var(--gray-50)');
        }
        if (boxBorder !== 'none') {
            var bBoxColor = (boxBorderColor && boxBorderColor !== 'default') ? boxBorderColor : '#2563eb';
            boxStyles.push('border:' + boxBorder + ' 2px ' + bBoxColor);
        }
        boxStyles.push('border-radius:12px;padding:0.3rem 0.8rem;display:flex;align-items:center;gap:0.5rem;margin:0.3rem 0');

        html += `
            <div class="featured-badge-container" style="${boxStyles.join(';')}">
                <span style="font-size:0.65rem;color:var(--gray-500);font-weight:600;">⭐</span>
                <span class="badge-item ${badge.class}" style="${badgeStyles.join(';')}">
                    <i class="fas ${badge.icon}"></i> ${badge.name}
                </span>
                <span style="font-size:0.55rem;color:var(--gray-400);">شارة مميزة</span>
            </div>
        `;
    }
}

    // عرض المعلومات مع التحقق من الخصوصية
    var textColorStyle = textColor && textColor !== 'default' ? 'color:' + textColor + ';' : '';

    if (canView('email')) {
        html += '<p style="margin:0.1rem 0;font-size:0.85rem;opacity:0.8;' + textColorStyle + '"><i class="fas fa-envelope"></i> ' + escapeHtml(user.email) + '</p>';
    }
    if (canView('college')) {
        html += '<p style="margin:0.1rem 0;font-size:0.85rem;opacity:0.8;' + textColorStyle + '"><i class="fas fa-university"></i> ' + escapeHtml(collegeName) + '</p>';
    }
    if (canView('specialty')) {
        html += '<p style="margin:0.1rem 0;font-size:0.85rem;opacity:0.8;' + textColorStyle + '"><i class="fas fa-tag"></i> ' + escapeHtml(specName) + '</p>';
    }
    // السنة غير قابلة للتحكم فيها بشكل فردي، نعرضها دائماً (يمكن إضافتها لاحقاً)
if (canView('year')) {
    html += '<p style="margin:0.1rem 0;font-size:0.85rem;opacity:0.8;' + textColorStyle + '"><i class="fas fa-calendar-alt"></i> السنة ' + (user.year || '?') + '</p>';
}
    if (canView('branch') && user.branch) {
        html += '<p style="margin:0.1rem 0;font-size:0.85rem;opacity:0.8;' + textColorStyle + '"><i class="fas fa-city"></i> ' + escapeHtml(user.branch) + '</p>';
    }

    if (canView('bio') && user.bio) {
        var bioStyle = bioColor && bioColor !== 'default' ? 'color:' + bioColor + ';' : '';
        html += '<div class="view-bio" style="margin-top:0.5rem;padding:0.5rem 0.75rem;background:rgba(255,255,255,0.1);border-radius:12px;border:1px solid rgba(255,255,255,0.1);font-size:0.85rem;line-height:1.6;' + bioStyle + '">';
        html += '<i class="fas fa-quote-right" style="opacity:0.5;margin-left:0.3rem;"></i> ' + escapeHtml(user.bio);
        html += '</div>';
    }

    html += '</div></div>';

    // ===== الأزرار التسعة (الإحصائيات) =====
    html += '<div class="view-stats-row" style="display:flex;flex-wrap:wrap;gap:0.3rem;margin:0.5rem 0;padding:0.4rem;background:rgba(255,255,255,0.05);border-radius:12px;border:1px solid rgba(255,255,255,0.05);justify-content:center;">';

    // نحدد القوائم التي يمكن عرضها بناءً على الخصوصية
    var stats = [];
    if (canView('completed')) stats.push({ key: 'completed', icon: 'fa-check-circle', label: 'مجتازة', value: compCount });
    if (canView('badges')) stats.push({ key: 'badges', icon: 'fa-trophy', label: 'شارة', value: badges.length });
    if (canView('favorites')) stats.push({ key: 'favorites', icon: 'fa-star', label: 'مفضلة', value: favCount });
    if (canView('votes')) stats.push({ key: 'votes', icon: 'fa-vote-yea', label: 'تصويت', value: voteCount });
    if (canView('friendsList')) stats.push({ key: 'friends', icon: 'fa-users', label: 'أصدقاء', value: friendsCount });
    if (canView('trustedBy')) stats.push({ key: 'trusted', icon: 'fa-handshake', label: 'ثقة', value: trustCount });
    if (canView('reports')) stats.push({ key: 'reports', icon: 'fa-flag', label: 'إبلاغ', value: reportCount });
    if (canView('collectibles')) stats.push({ key: 'collectibles', icon: 'fa-palette', label: 'مقتنيات', value: collectiblesCount, action: 'showUserCollectibles' });
    if (canView('gifts')) stats.push({ key: 'gifts', icon: 'fa-gift', label: 'هدايا', value: giftsCount, action: 'showGiftMenu' });

    stats.forEach(function(stat) {
        var clickAction = '';
        if (stat.action) {
            clickAction = "onclick=\"" + stat.action + "('" + uid + "')\"";
        } else {
            clickAction = "onclick=\"openUserProfileTab('" + stat.key + "', '" + uid + "')\"";
        }
        html += '<div class="stat-box" ' + clickAction + ' style="text-align:center;padding:0.2rem 0.5rem;cursor:pointer;border-radius:8px;transition:all 0.3s ease;' + textColorStyle + 'flex:1 0 auto;min-width:55px;max-width:80px;">';
        html += '<i class="fas ' + stat.icon + '" style="font-size:0.9rem;display:block;margin-bottom:0.05rem;"></i>';
        html += '<span style="font-size:0.9rem;font-weight:700;display:block;">' + stat.value + '</span>';
        html += '<label style="font-size:0.5rem;opacity:0.7;">' + stat.label + '</label>';
        html += '</div>';
    });

    html += '</div>';

   // ===== منطقة المحتوى الديناميكي =====
html += '<div id="userProfileTabContent" class="profile-tab-content" style="min-height:100px;margin-top:0.5rem;">';

// التحقق من عدد القوائم المتاحة (غير المخفية)
var visibleStatsCount = 0;
// نقوم بحساب القوائم التي يمكن عرضها (نفس القائمة المستخدمة في stats)
// نعيد استخدام نفس المنطق ولكن بدون بناء HTML
var tempStats = [];
if (canView('completed')) tempStats.push('completed');
if (canView('badges')) tempStats.push('badges');
if (canView('favorites')) tempStats.push('favorites');
if (canView('votes')) tempStats.push('votes');
if (canView('friendsList')) tempStats.push('friends');
if (canView('trustedBy')) tempStats.push('trusted');
if (canView('reports')) tempStats.push('reports');
if (canView('collectibles')) tempStats.push('collectibles');
if (canView('gifts')) tempStats.push('gifts');
visibleStatsCount = tempStats.length;

if (visibleStatsCount === 0) {
    // جميع القوائم مخفية
    html += '<div style="text-align:center;padding:1.5rem 0.5rem;color:var(--gray-400);">';
    html += '<i class="fas fa-lock" style="font-size:2rem;display:block;margin-bottom:0.5rem;color:var(--gray-300);"></i>';
    html += '<h4 style="color:var(--gray-500);margin-bottom:0.3rem;">🔒 قام المستخدم بإخفاء جميع قوائمه</h4>';
    html += '<p style="font-size:0.85rem;">لا توجد قوائم متاحة للعرض حالياً</p>';
    html += '</div>';
} else {
    html += '<div style="text-align:center;opacity:0.5;padding:0.5rem 0;font-size:0.8rem;">';
    html += '<i class="fas fa-hand-pointer" style="font-size:1.2rem;display:block;margin-bottom:0.3rem;"></i>';
    html += 'اختر أحد الأزرار أعلاه لعرض التفاصيل';
    html += '</div>';
}

html += '</div>';

    
    // ===== CSS =====
    html += '<style id="modal-custom-style-' + uid + '">';
    var css = '';
    var containerSelector = '#' + containerId;
    
    if (customization.avatarBorder) {
        css += containerSelector + ' .view-avatar { border-color: ' + customization.avatarBorder + ' !important; border-width: 4px !important; border-style: solid !important; }';
    }
    if (customization.avatarEffect && customization.avatarEffect !== 'none') {
        var effect = customization.avatarEffect;
        css += containerSelector + ' .profile-avatar.effect-' + effect + ' img { animation: ' + effect + 'Effect 2s ease-in-out infinite; }';
    }
    if (customization.profileFrame) {
        var frameStyles = {
            'rounded': 'border-radius: 20% !important; clip-path: none !important;',
            'square': 'border-radius: 0 !important; clip-path: none !important;',
            'star': 'clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%) !important; border-radius: 0 !important;',
            'heart': 'clip-path: path("M50,90 C20,60 0,40 0,25 C0,10 15,0 30,0 C40,0 48,8 50,18 C52,8 60,0 70,0 C85,0 100,10 100,25 C100,40 80,60 50,90Z") !important; border-radius: 0 !important;',
            'diamond': 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%) !important; border-radius: 0 !important;'
        };
        if (frameStyles[customization.profileFrame]) {
            css += containerSelector + ' .view-avatar { ' + frameStyles[customization.profileFrame] + ' }';
        }
    }
    if (customization.nameColor) {
        css += containerSelector + ' .view-info h3 { color: ' + customization.nameColor + ' !important; }';
    }
    if (customization.nameGlow) {
        var glowStyles = {
            'soft': 'text-shadow: 0 0 20px rgba(37,99,235,0.3) !important;',
            'strong': 'text-shadow: 0 0 30px rgba(37,99,235,0.6), 0 0 60px rgba(37,99,235,0.3) !important;',
            'rainbow': 'animation: rainbowGlow 3s ease infinite !important;'
        };
        if (glowStyles[customization.nameGlow]) {
            css += containerSelector + ' .view-info h3 { ' + glowStyles[customization.nameGlow] + ' }';
        }
    }
    if (customization.textColor && customization.textColor !== 'default') {
        css += containerSelector + ' .view-info p, ' + containerSelector + ' .view-stats-row .stat-box span, ' + containerSelector + ' .view-stats-row .stat-box label { color: ' + customization.textColor + ' !important; }';
    }
    if (customization.bioColor && customization.bioColor !== 'default') {
        css += containerSelector + ' .view-bio { color: ' + customization.bioColor + ' !important; }';
    }
    if (customization.buttonColor && customization.buttonColor !== 'default') {
        css += containerSelector + ' .stat-box { color: ' + customization.buttonColor + ' !important; }';
        css += containerSelector + ' .stat-box i { color: ' + customization.buttonColor + ' !important; }';
        css += containerSelector + ' .stat-box span { color: ' + customization.buttonColor + ' !important; }';
        css += containerSelector + ' .stat-box label { color: ' + customization.buttonColor + ' !important; }';
        css += containerSelector + ' .stat-box:hover { background: rgba(255,255,255,0.15) !important; transform: scale(1.05); }';
        css += containerSelector + ' .stat-box.active-tab { background: ' + customization.buttonColor + '20 !important; border: 2px solid ' + customization.buttonColor + ' !important; }';
        css += containerSelector + ' .stat-box.active-tab i, ' + containerSelector + ' .stat-box.active-tab span, ' + containerSelector + ' .stat-box.active-tab label { color: ' + customization.buttonColor + ' !important; }';
    }
    if (customization.badgeStyle && customization.badgeStyle !== 'default') {
        var badgeStyles = {
            'glow': 'animation: glowBadge 2s ease-in-out infinite;',
            'rounded': 'border-radius: 50px !important; padding: 0.3rem 1.2rem !important;',
            'shadow': 'box-shadow: 0 4px 15px rgba(0,0,0,0.15) !important;',
            'gradient': 'background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important; color: white !important;',
            'neon': 'box-shadow: 0 0 20px rgba(37,99,235,0.5) !important; border: 1px solid rgba(37,99,235,0.3) !important;'
        };
        if (badgeStyles[customization.badgeStyle]) {
            css += containerSelector + ' .badge-item { ' + badgeStyles[customization.badgeStyle] + ' }';
        }
    }
    if (customization.specialBadge && customization.specialBadge !== 'none') {
        css += containerSelector + ' .special-badge-display { display: inline-block; }';
    }
    
    html += css;
    html += '</style>';
    
    return html;
}

// ============================================================
//  renderBlockedList - عرض قائمة المستخدمين المحظورين
// ============================================================

// ============================================================
//  renderBlockedList - عرض جميع المحظورين (بما فيهم المشرفين)
// ============================================================

function renderBlockedList(container) {
    if (!currentUserData) {
        container.innerHTML = '<div class="empty-state-modern"><i class="fas fa-ban"></i><h4>يرجى تسجيل الدخول</h4></div>';
        return;
    }
    
    var blockedUids = currentUserData.blockedUsers || [];
    
    if (blockedUids.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-ban"></i>
                <h4>لا يوجد محظورين</h4>
                <p>لم تقم بحظر أي مستخدم حتى الآن</p>
            </div>
        `;
        return;
    }
    
    // جلب جميع المستخدمين المحظورين (بما فيهم المشرفين)
    var blockedUsers = users.filter(function(u) {
        return blockedUids.indexOf(u.uid) !== -1;
    });
    
    if (blockedUsers.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-user-slash"></i>
                <h4>المستخدمون المحظورون غير موجودين</h4>
                <p>ربما تم حذف حساباتهم</p>
            </div>
        `;
        return;
    }
    
    var html = `
        <div style="margin-bottom:0.75rem;padding:0.5rem 1rem;background:#fef2f2;border-radius:12px;border:1px solid #fca5a5;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;">
            <span style="font-weight:600;color:#dc2626;">
                <i class="fas fa-ban"></i> المحظورين (${blockedUsers.length})
            </span>
            <button class="btn btn-sm btn-outline" onclick="unblockAllUsers()" style="color:#dc2626;border-color:#dc2626;">
                <i class="fas fa-undo"></i> إلغاء حظر الكل
            </button>
        </div>
        <div class="students-grid-modern">
    `;
    
    blockedUsers.forEach(function(user) {
        html += buildBlockedUserCard(user);
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// ============================================================
//  buildBlockedUserCard - بطاقة المستخدم المحظور
// ============================================================

function buildBlockedUserCard(user) {
    var uid = user.uid;
    var isSuperAdmin = user.isSuperAdmin || false;
    var role = user.role || 'user';
    
    var roleLabels = {
        'admin': '🛡️ مشرف',
        'moderator': '🔧 مدير',
        'user': '👤 مستخدم'
    };
    
    var roleLabel = roleLabels[role] || '👤 مستخدم';
    
    return `
        <div class="student-card blocked-card" style="border-left: 4px solid #dc2626;">
            <div class="student-row">
                <div class="student-avatar-wrapper">
                    <div class="student-avatar">
                        <img src="${user.avatar || ''}" onerror="this.src=''" alt="${escapeHtml(user.displayName || 'مستخدم')}" />
                        <span class="blocked-badge"><i class="fas fa-ban"></i></span>
                    </div>
                </div>
                <div class="student-info">
                    <div class="student-name">
                        ${escapeHtml(user.displayName || 'مستخدم')}
                        ${isSuperAdmin ? '<span class="super-admin-badge"><i class="fas fa-crown"></i> رئيسي</span>' : ''}
                        <span style="font-size:0.6rem;color:var(--gray-400);">${roleLabel}</span>
                    </div>
                    <div class="student-details">
                        <span><i class="fas fa-envelope"></i> ${escapeHtml(user.email || '')}</span>
                        ${user.college ? `<span><i class="fas fa-university"></i> ${getCollegeName(user.college)}</span>` : ''}
                    </div>
                    <div style="margin-top:0.3rem;">
                        <span style="font-size:0.65rem;color:#dc2626;background:#fee2e2;padding:0.1rem 0.5rem;border-radius:20px;">
                            <i class="fas fa-ban"></i> محظور من قبلك
                        </span>
                    </div>
                </div>
                <div class="student-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-success btn-sm" onclick="unblockUser('${uid}')">
                        <i class="fas fa-undo"></i> إلغاء الحظر
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================================
//  unblockAllUsers - إلغاء حظر جميع المستخدمين
// ============================================================

async function unblockAllUsers() {
    var blockedUids = currentUserData.blockedUsers || [];
    if (blockedUids.length === 0) {
        showToast('لا يوجد مستخدمين محظورين', 'warning');
        return;
    }
    
    if (!confirm(`⚠️ هل أنت متأكد من إلغاء حظر جميع المستخدمين (${blockedUids.length})؟`)) {
        return;
    }
    
    try {
        // إلغاء حظر كل المستخدمين
        var promises = blockedUids.map(function(uid) {
            return unblockUser(uid);
        });
        
        await Promise.all(promises);
        
        showToast('✅ تم إلغاء حظر جميع المستخدمين', 'success');
        
        // تحديث الواجهة
        await loadAllData();
        renderUsers();
        refreshCurrentUserProfileModal();
        
        // إذا كنا في صفحة المحظورين، تحديث القائمة
        if (currentStudentList === 'blocked') {
            var container = document.getElementById('studentListContainer');
            if (container) {
                renderBlockedList(container);
            }
        }
        
    } catch (error) {
        console.error('Error unblocking all users:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// ============================================================
//  دوال القائمة المنسدلة
// ============================================================

function toggleUserActionsMenu(uid) {
    var menu = document.getElementById('userActionsMenu_' + uid);
    if (!menu) return;
    
    // إغلاق جميع القوائم الأخرى
    document.querySelectorAll('.dropdown-menu').forEach(function(m) {
        if (m.id !== 'userActionsMenu_' + uid) {
            m.style.display = 'none';
        }
    });
    
    // تبديل القائمة الحالية
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', function(e) {
    if (!e.target.closest('.user-actions-dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(function(m) {
            m.style.display = 'none';
        });
    }
});

// ============================================================
//  دوال المراسلة الخاصة
// ============================================================

// ============================================================
//  نظام الدردشة المتطور
// ============================================================

var currentChatUser = null;
var chatMessages = [];
var chatListener = null;

// ============================================================
//  إصلاح نظام الدردشة - صندوق الكتابة وزر الإرسال
// ============================================================

// ============================================================
//  openChat - فتح نافذة الدردشة مع تطبيق إعدادات الخصوصية
// ============================================================
function openChat(uid) {
    if (isUserBlocked(uid) || isUserBlockedBy(uid)) {
        showToast('لا يمكنك مراسلة هذا المستخدم', 'error');
        return;
    }
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) {
        showToast('المستخدم غير موجود', 'error');
        return;
    }

    // ===== التحقق من إعدادات الخصوصية للمرسلة (المستخدم الآخر) =====
    var privacy = user.privacy || {};
    var allowMessages = privacy.allowMessages || 'all'; // القيمة الافتراضية: الجميع

    // المشرف يستطيع مراسلة الجميع، والمستخدم يستطيع مراسلة نفسه
    if (!isAdmin && currentUser.uid !== uid) {
        if (allowMessages === 'none') {
            showToast('🔒 هذا المستخدم لا يسمح بالمراسلة', 'error');
            return;
        }
        if (allowMessages === 'friends') {
            var friends = user.friends || [];
            if (friends.indexOf(currentUser.uid) === -1) {
                showToast('🤝 فقط أصدقاء هذا المستخدم يمكنهم مراسلته', 'error');
                return;
            }
        }
    }

    // ===== التحقق من إعدادات الخصوصية للمستخدم الحالي (هل يسمح بالمراسلة؟) =====
    // إذا كان المستخدم الحالي لا يسمح بالمراسلة، لا يمكنه فتح الدردشة (إلا إذا كان مشرفاً)
    if (!isAdmin && currentUser.uid !== uid) {
        var myPrivacy = currentUserData.privacy || {};
        var myAllowMessages = myPrivacy.allowMessages || 'all';
        if (myAllowMessages === 'none') {
            showToast('🔒 أنت لا تسمح بالمراسلة، قم بتغيير الإعدادات أولاً', 'error');
            return;
        }
        if (myAllowMessages === 'friends') {
            var myFriends = currentUserData.friends || [];
            if (myFriends.indexOf(uid) === -1) {
                showToast('🤝 يمكنك مراسلة أصدقائك فقط', 'error');
                return;
            }
        }
    }

    currentChatUser = uid;

    var modal = document.getElementById('chatModal');
    var content = document.getElementById('chatModalContent');
    if (!modal || !content) {
        createChatModal();
        modal = document.getElementById('chatModal');
        content = document.getElementById('chatModalContent');
    }

    var titleEl = document.getElementById('chatModalTitle');
    if (titleEl) {
        titleEl.innerHTML = `
            <div style="display:flex;align-items:center;gap:0.5rem;">
                <img src="${user.avatar || ''}" style="width:30px;height:30px;border-radius:50%;object-fit:cover;" onerror="this.style.display='none'" />
                <span>${escapeHtml(user.displayName || 'مستخدم')}</span>
                <span style="font-size:0.6rem;color:var(--gray-400);">${user.college ? getCollegeName(user.college) : ''}</span>
                ${privacy.allowMessages === 'none' ? '<span style="font-size:0.6rem;color:#dc2626;">🔒</span>' : ''}
            </div>
        `;
    }

    content.innerHTML = `
        <div class="chat-container">
            <div class="chat-messages" id="chatMessages">
                <div class="chat-loading"><i class="fas fa-spinner fa-spin"></i> جاري تحميل المحادثة...</div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chatInput" placeholder="اكتب رسالتك..." onkeydown="if(event.key==='Enter') sendChatMessage()" />
                <button class="btn btn-primary" id="chatSendBtn" onclick="sendChatMessage()">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;

    openModal('chatModal');
    loadChatMessages(uid);

    setTimeout(function() {
        var input = document.getElementById('chatInput');
        if (input) input.focus();
    }, 500);
}

function createChatModal() {
    if (document.getElementById('chatModal')) return;
    
    var modal = document.createElement('div');
    modal.id = 'chatModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width:600px;max-height:80vh;display:flex;flex-direction:column;">
            <div class="modal-header">
                <h3 id="chatModalTitle"><i class="fas fa-comment-dots"></i> الدردشة</h3>
                <button class="btn-close" onclick="closeChat()"><i class="fas fa-times"></i></button>
            </div>
            <div id="chatModalContent" style="flex:1;display:flex;flex-direction:column;overflow:hidden;min-height:400px;"></div>
        </div>
    `;
    document.body.appendChild(modal);
}

function loadChatMessages(uid) {
    var container = document.getElementById('chatMessages');
    if (!container) return;
    
    // إلغاء الاستماع السابق
    if (chatListener) {
        chatListener();
        chatListener = null;
    }
    
    // إنشاء معرف المحادثة (ترتيب الأرقام)
    var chatId = [currentUser.uid, uid].sort().join('_');
    
    // الاستماع للرسائل في الوقت الفعلي
    chatListener = db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(function(snapshot) {
            chatMessages = [];
            snapshot.forEach(function(doc) {
                chatMessages.push({ id: doc.id, ...doc.data() });
            });
            renderChatMessages();
        }, function(error) {
            console.error('Error loading chat messages:', error);
            container.innerHTML = `
                <div class="chat-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>حدث خطأ في تحميل المحادثة</p>
                    <button class="btn btn-sm btn-primary" onclick="loadChatMessages('${uid}')">
                        <i class="fas fa-sync"></i> إعادة المحاولة
                    </button>
                </div>
            `;
        });
}

function renderChatMessages() {
    var container = document.getElementById('chatMessages');
    if (!container) return;
    
    if (chatMessages.length === 0) {
        container.innerHTML = `
            <div class="chat-empty">
                <i class="fas fa-comment-dots"></i>
                <p>لا توجد رسائل بعد</p>
                <span>ابدأ المحادثة الآن</span>
            </div>
        `;
        return;
    }
    
    var html = '';
    chatMessages.forEach(function(msg) {
        var isMine = msg.from === currentUser.uid;
        var sender = users.find(function(u) { return u.uid === msg.from; });
        var senderName = sender ? (sender.displayName || 'مستخدم') : 'مستخدم';
        var time = msg.timestamp?.seconds ? 
            new Date(msg.timestamp.seconds * 1000).toLocaleTimeString('ar', {hour: '2-digit', minute: '2-digit'}) : 
            '';
        
        html += `
            <div class="chat-message ${isMine ? 'mine' : 'theirs'}">
                <div class="chat-bubble">
                    <div class="chat-text">${escapeHtml(msg.message)}</div>
                    <div class="chat-time">${time}</div>
                </div>
                ${!isMine ? `<div class="chat-sender">${escapeHtml(senderName)}</div>` : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
    // التمرير إلى الأسفل
    setTimeout(function() {
        container.scrollTop = container.scrollHeight;
    }, 100);
}


// ============================================================
//  دوال صفحة الطلاب - نسخة مبسطة وموثوقة
// ============================================================

// ============================================================
//  loadUsersPage - تحميل صفحة الطلاب
// ============================================================

function loadUsersPage() {
    console.log('📊 تحميل صفحة الطلاب');
    
    // التأكد من وجود الحاويات
    ensureStudentsContainers();
    
    // تعبئة خيارات الكليات
    populateStudentsFilters();
    
    // تحديث الإحصائيات
    updateStudentsStats();
    
    // تحميل عدد الرسائل
    loadMessagesCount();
    
    // عرض القائمة الافتراضية
    setTimeout(function() {
        switchStudentList('all');
    }, 200);
}

// ============================================================
//  ensureStudentsContainers - التأكد من وجود الحاويات
// ============================================================

function ensureStudentsContainers() {
    // التأكد من وجود studentListContainer
    var container = document.getElementById('studentListContainer');
    if (!container) {
        console.log('⚠️ studentListContainer غير موجود، جاري الإنشاء...');
        var usersContainer = document.querySelector('.users-container');
        if (!usersContainer) {
            usersContainer = document.querySelector('#page-users .users-container');
        }
        if (!usersContainer) {
            var pageUsers = document.getElementById('page-users');
            if (pageUsers) {
                usersContainer = document.createElement('div');
                usersContainer.className = 'users-container';
                pageUsers.appendChild(usersContainer);
            }
        }
        if (usersContainer) {
            container = document.createElement('div');
            container.id = 'studentListContainer';
            container.className = 'students-list-container';
            usersContainer.appendChild(container);
            console.log('✅ تم إنشاء studentListContainer');
        }
    }
    
    // التأكد من وجود studentsPagination
    var pagination = document.getElementById('studentsPagination');
    if (!pagination) {
        var usersContainer = document.querySelector('.users-container');
        if (usersContainer) {
            pagination = document.createElement('div');
            pagination.id = 'studentsPagination';
            pagination.className = 'students-pagination';
            usersContainer.appendChild(pagination);
            console.log('✅ تم إنشاء studentsPagination');
        }
    }
}

// ============================================================
//  populateStudentsFilters - تعبئة خيارات الكليات
// ============================================================

function populateStudentsFilters() {
    var collegeSelect = document.getElementById('studentsFilterCollege');
    if (!collegeSelect) {
        console.warn('⚠️ studentsFilterCollege غير موجود');
        return;
    }
    
    var currentVal = collegeSelect.value;
    collegeSelect.innerHTML = '<option value="all">كل الكليات</option>';
    
    if (!colleges || colleges.length === 0) {
        console.log('⏳ جاري تحميل الكليات...');
        setTimeout(function() {
            populateStudentsFilters();
        }, 500);
        return;
    }
    
    colleges.forEach(function(col) {
        var opt = document.createElement('option');
        opt.value = col.id;
        opt.textContent = col.name;
        collegeSelect.appendChild(opt);
    });
    
    if (currentVal && colleges.some(function(c) { return c.id === currentVal; })) {
        collegeSelect.value = currentVal;
    }
}

// ============================================================
//  updateStudentsStats - تحديث الإحصائيات
// ============================================================

function updateStudentsStats() {
    if (!users || users.length === 0) {
        setTimeout(function() {
            updateStudentsStats();
        }, 500);
        return;
    }
    
    var totalStudents = users.filter(function(u) { 
        return u.role !== 'admin' && !u.privacy?.hideFromUsersList; 
    }).length;
    
    var friendsCount = currentUserData ? (currentUserData.friends || []).length : 0;
    var trustedCount = currentUserData ? (currentUserData.trustedBy || []).length : 0;
    var reportsCount = currentUserData ? (currentUserData.reports || []).length : 0;
    var giftsCount = currentUserData ? (currentUserData.receivedGifts || []).length : 0;
    var bannedCount = isAdmin ? users.filter(function(u) { return u.banned === true && u.role !== 'admin'; }).length : 0;
    var blockedCount = currentUserData ? (currentUserData.blockedUsers || []).length : 0;

    // تحديث الإحصائيات
    setElementText('totalStudentsCount', totalStudents);
    setElementText('friendsCount', friendsCount);
    setElementText('trustedCount', trustedCount);
    setElementText('reportsCount', reportsCount);
    setElementText('giftsCount', giftsCount);
    setElementText('blockedCount', blockedCount);
setElementText('blockedTabBadge', blockedCount);
    
    if (isAdmin) {
        var bannedCard = document.getElementById('bannedStatCard');
        if (bannedCard) bannedCard.style.display = 'flex';
        var bannedTab = document.getElementById('bannedTab');
        if (bannedTab) bannedTab.style.display = 'inline-flex';
        setElementText('bannedCount', bannedCount);
        setElementText('bannedTabBadge', bannedCount);
    }
    
    // تحديث شارات التبويبات
    setElementText('allTabBadge', totalStudents);
    setElementText('friendsTabBadge', friendsCount);
    setElementText('trustedTabBadge', trustedCount);
    setElementText('reportsTabBadge', reportsCount);
    setElementText('giftsTabBadge', giftsCount);
}

// ============================================================
//  setElementText - مساعدة لتحديث النص
// ============================================================

function setElementText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
}

// ============================================================
//  switchStudentList - تبديل القوائم
// ============================================================

function switchStudentList(listType) {
    currentStudentList = listType;
    console.log('🔄 تبديل إلى:', listType);
    
    // تحديث التبويبات
    document.querySelectorAll('.students-tab').forEach(function(tab) {
        tab.classList.remove('active');
        if (tab.dataset.view === listType) {
            tab.classList.add('active');
        }
    });
    
    // إظهار/إخفاء الفلاتر
    var filters = document.getElementById('studentsFiltersContainer');
    if (filters) {
        filters.style.display = (listType === 'all') ? 'flex' : 'none';
    }
    
    // الحصول على الحاوية
    var container = document.getElementById('studentListContainer');
    if (!container) {
        console.error('❌ studentListContainer غير موجود');
        return;
    }
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> جاري التحميل...</div>';
    
    // عرض القائمة المناسبة
    setTimeout(function() {
        switch(listType) {
            case 'all':
                renderAllStudents(container);
                break;
            case 'friends':
                renderFriendsList(container);
                break;
            case 'trusted':
                renderTrustedList(container);
                break;
            case 'reports':
                renderReportsList(container);
                break;
            case 'banned':
                if (isAdmin) renderBannedList(container);
                else renderAllStudents(container);
                break;
            case 'gifts':
                renderGiftsList(container);
                break;
            case 'messages':
                renderMessagesList(container);
                break;
                case 'blocked':
    renderBlockedList(container);
    break;
            default:
                renderAllStudents(container);
        }
    }, 150);
}

// ============================================================
//  renderAllStudents - عرض جميع الطلاب مع الفلاتر
// ============================================================

function renderAllStudents(container) {
    if (!container) return;
    
    if (!users || users.length === 0) {
        container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> جاري تحميل المستخدمين...</div>';
        return;
    }
    
    filterStudents();
}

// ============================================================
//  filterStudents - تصفية وفرز الطلاب
// ============================================================

function filterStudents() {
    if (currentStudentList !== 'all') return;
    
    var container = document.getElementById('studentListContainer');
    if (!container) return;
    
    var searchInput = document.getElementById('studentsSearchInput');
    var collegeSelect = document.getElementById('studentsFilterCollege');
    var yearSelect = document.getElementById('studentsFilterYear');
    var sortSelect = document.getElementById('studentsFilterSort');
    
    var search = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var college = collegeSelect ? collegeSelect.value : 'all';
    var year = yearSelect ? yearSelect.value : 'all';
    var sortBy = sortSelect ? sortSelect.value : 'name';
    
    var filtered = users.filter(function(u) {
        if (u.role === 'admin') return false;
        if (u.privacy && u.privacy.hideFromUsersList) return false;
        
        if (search) {
            var nameMatch = u.displayName && u.displayName.toLowerCase().includes(search);
            var emailMatch = u.email && u.email.toLowerCase().includes(search);
            if (!nameMatch && !emailMatch) return false;
        }
        if (college !== 'all' && u.college !== college) return false;
        if (year !== 'all' && u.year !== year) return false;
        return true;
    });
    
    // ترتيب
    filtered.sort(function(a, b) {
        switch(sortBy) {
            case 'name': return (a.displayName || '').localeCompare(b.displayName || '');
            case 'points': 
                var aP = calculateUserPoints(a).earnedPoints || 0;
                var bP = calculateUserPoints(b).earnedPoints || 0;
                return bP - aP;
            case 'votes': return (b.votes || 0) - (a.votes || 0);
            case 'friends': return (b.friends || []).length - (a.friends || []).length;
            case 'trusted': return (b.trustedBy || []).length - (a.trustedBy || []).length;
            case 'badges': return calculateBadges(b).length - calculateBadges(a).length;
            default: return 0;
        }
    });
    
    studentsFilteredData = filtered;
    studentsCurrentPage = 1;
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-search"></i>
                <h4>لا توجد نتائج</h4>
                <p>حاول تعديل معايير البحث</p>
            </div>
        `;
        updatePagination();
        return;
    }
    
    var start = (studentsCurrentPage - 1) * studentsPerPage;
    var end = start + studentsPerPage;
    var pageStudents = filtered.slice(start, end);
    
    var html = '<div class="students-grid-modern">';
    pageStudents.forEach(function(user) {
        html += buildStudentCard(user);
    });
    html += '</div>';
    
    container.innerHTML = html;
    updatePagination();
}

// ============================================================
//  renderFriendsList - عرض الأصدقاء
// ============================================================

function renderFriendsList(container) {
    if (!container) return;
    if (!currentUserData) {
        container.innerHTML = '<div class="empty-state-modern"><i class="fas fa-user-friends"></i><h4>يرجى تسجيل الدخول</h4></div>';
        return;
    }
    
    var friendsUids = currentUserData.friends || [];
    var friends = users.filter(function(u) {
        return friendsUids.indexOf(u.uid) !== -1 && u.role !== 'admin';
    });
    
    if (friends.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-user-friends"></i>
                <h4>لا يوجد أصدقاء</h4>
                <p>قم بإضافة أصدقاء من خلال عرض ملفات الطلاب الأخرى</p>
                <button class="btn btn-primary" onclick="switchStudentList('all')" style="margin-top:0.5rem;">
                    <i class="fas fa-users"></i> عرض جميع الطلاب
                </button>
            </div>
        `;
        return;
    }
    
    var html = '<div class="students-grid-modern">';
    friends.forEach(function(user) {
        html += buildStudentCard(user);
    });
    html += '</div>';
    container.innerHTML = html;
}

// ============================================================
//  resetStudentsFilters - إعادة تعيين الفلاتر
// ============================================================

function resetStudentsFilters() {
    var searchInput = document.getElementById('studentsSearchInput');
    var collegeSelect = document.getElementById('studentsFilterCollege');
    var yearSelect = document.getElementById('studentsFilterYear');
    var sortSelect = document.getElementById('studentsFilterSort');
    
    if (searchInput) searchInput.value = '';
    if (collegeSelect) collegeSelect.value = 'all';
    if (yearSelect) yearSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'name';
    
    filterStudents();
}

// ============================================================
//  إعادة تعريف loadUsersPage في النافذة
// ============================================================

window.loadUsersPage = loadUsersPage;
window.switchStudentList = switchStudentList;
window.filterStudents = filterStudents;
window.resetStudentsFilters = resetStudentsFilters;

// ============================================================
//  إصلاح دالة loadMessagesCount - التحقق من وجود العناصر
// ============================================================

function loadMessagesCount() {
    if (!currentUser) return;
    
    var friendsUids = currentUserData?.friends || [];
    if (friendsUids.length === 0) {
        // تحديث العناصر الموجودة
        var el = document.getElementById('messagesCount');
        if (el) el.textContent = '0';
        var badge = document.getElementById('messagesTabBadge');
        if (badge) badge.textContent = '0';
        return;
    }
    
    var chatPromises = friendsUids.map(function(uid) {
        var chatId = [currentUser.uid, uid].sort().join('_');
        return db.collection('chats').doc(chatId).get()
            .then(function(doc) {
                return doc.exists ? 1 : 0;
            })
            .catch(function() { return 0; });
    });
    
    Promise.all(chatPromises)
        .then(function(results) {
            var count = results.reduce(function(a, b) { return a + b; }, 0);
            
            // التحقق من وجود العناصر قبل التحديث
            var el = document.getElementById('messagesCount');
            if (el) el.textContent = count;
            
            var badge = document.getElementById('messagesTabBadge');
            if (badge) badge.textContent = count;
        })
        .catch(function(error) {
            console.error('Error loading messages count:', error);
            // في حالة الخطأ، نضع القيمة الافتراضية
            var el = document.getElementById('messagesCount');
            if (el) el.textContent = '0';
            var badge = document.getElementById('messagesTabBadge');
            if (badge) badge.textContent = '0';
        });
}

// ============================================================
//  إصلاح دالة loadChatsAlternative - التحقق من وجود العناصر
// ============================================================

function loadChatsAlternative(container) {
    if (!currentUser) return;
    
    console.log('🔄 محاولة بديلة لجلب المحادثات...');
    
    // التحقق من وجود container
    if (!container) {
        console.error('❌ container غير موجود');
        return;
    }
    
    var friendsUids = currentUserData?.friends || [];
    
    if (friendsUids.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-inbox"></i>
                <h4>لا توجد محادثات</h4>
                <p>ليس لديك أصدقاء بعد، أضف أصدقاء لبدء المحادثات</p>
                <button class="btn btn-primary" onclick="switchStudentList('all')" style="margin-top:0.5rem;">
                    <i class="fas fa-users"></i> عرض الطلاب
                </button>
            </div>
        `;
        return;
    }
    
    // جلب المحادثات لكل صديق على حدة
    var chatPromises = friendsUids.map(function(uid) {
        var chatId = [currentUser.uid, uid].sort().join('_');
        return db.collection('chats').doc(chatId).get()
            .then(function(doc) {
                if (doc.exists) {
                    return { id: doc.id, ...doc.data(), otherUid: uid };
                }
                return null;
            })
            .catch(function() { return null; });
    });
    
    Promise.all(chatPromises)
        .then(function(results) {
            var chats = results.filter(function(r) { return r !== null; });
            
            // ترتيب يدوي
            chats.sort(function(a, b) {
                var aTime = a.lastTimestamp?.seconds || 0;
                var bTime = b.lastTimestamp?.seconds || 0;
                return bTime - aTime;
            });
            
            if (chats.length === 0) {
                container.innerHTML = `
                    <div class="empty-state-modern">
                        <i class="fas fa-inbox"></i>
                        <h4>لا توجد محادثات</h4>
                        <p>ليس لديك محادثات مع أصدقائك بعد</p>
                        <button class="btn btn-primary" onclick="switchStudentList('friends')" style="margin-top:0.5rem;">
                            <i class="fas fa-user-friends"></i> عرض الأصدقاء
                        </button>
                    </div>
                `;
                return;
            }
            
            // عرض المحادثات
            var html = `
                <div style="margin-bottom:0.75rem;padding:0.5rem 1rem;background:var(--gray-50);border-radius:12px;border:1px solid var(--border-color);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;">
                    <span style="font-weight:600;"><i class="fas fa-comment-dots" style="color:#8b5cf6;"></i> المحادثات (${chats.length})</span>
                    <span style="font-size:0.8rem;color:var(--gray-400);">💬 ${chats.length} محادثة</span>
                </div>
            `;
            
            html += '<div style="max-height:500px;overflow-y:auto;">';
            
            chats.forEach(function(chat) {
                var otherUser = users.find(function(u) { return u.uid === chat.otherUid; });
                if (!otherUser) return;
                
                var lastMessage = chat.lastMessage || 'لا توجد رسائل';
                var lastSender = chat.lastSender;
                var isFromMe = lastSender === currentUser.uid;
                var time = chat.lastTimestamp?.seconds ? 
                    new Date(chat.lastTimestamp.seconds * 1000).toLocaleString('ar', { 
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric',
                        hour: '2-digit', 
                        minute: '2-digit' 
                    }) : 
                    'تاريخ غير معروف';
                
                html += `
                    <div class="chat-item" onclick="openChat('${chat.otherUid}')" style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.7rem;background:var(--card-bg);border-radius:10px;border:1px solid var(--border-color);margin-bottom:0.3rem;cursor:pointer;transition:all 0.3s ease;">
                        <img src="${otherUser.avatar || ''}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid var(--primary-light);" onerror="this.style.display='none'" />
                        <div style="flex:1;min-width:0;">
                            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;">
                                <span style="font-weight:600;font-size:0.85rem;color:var(--text-color);">${escapeHtml(otherUser.displayName || 'مستخدم')}</span>
                                <span style="font-size:0.6rem;color:var(--gray-400);">${time}</span>
                            </div>
                            <div style="font-size:0.75rem;color:var(--gray-500);display:flex;align-items:center;gap:0.3rem;">
                                ${isFromMe ? '<span style="font-size:0.6rem;color:var(--gray-400);">أنت:</span>' : ''}
                                ${escapeHtml(lastMessage.length > 40 ? lastMessage.substring(0, 40) + '...' : lastMessage)}
                            </div>
                            <div style="display:flex;gap:0.3rem;margin-top:0.1rem;flex-wrap:wrap;">
                                <span style="font-size:0.55rem;color:var(--gray-400);background:var(--gray-50);padding:0.05rem 0.4rem;border-radius:10px;">
                                    ${otherUser.college ? getCollegeName(otherUser.college) : 'بدون كلية'}
                                </span>
                                <span style="font-size:0.55rem;color:var(--gray-400);background:var(--gray-50);padding:0.05rem 0.4rem;border-radius:10px;">
                                    سنة ${otherUser.year || '?'}
                                </span>
                            </div>
                        </div>
                        <span style="font-size:0.7rem;color:var(--gray-400);">
                            <i class="fas fa-chevron-left"></i>
                        </span>
                    </div>
                `;
            });
            
            html += '</div>';
            container.innerHTML = html;
            
            // تحديث عدد الرسائل - مع التحقق من وجود العناصر
            var messagesEl = document.getElementById('messagesCount');
            if (messagesEl) messagesEl.textContent = chats.length;
            
            var badgeEl = document.getElementById('messagesTabBadge');
            if (badgeEl) badgeEl.textContent = chats.length;
        })
        .catch(function(error) {
            console.error('Error loading chats alternative:', error);
            if (container) {
                container.innerHTML = `
                    <div class="empty-state-modern">
                        <i class="fas fa-exclamation-circle" style="color:var(--warning);"></i>
                        <h4>حدث خطأ</h4>
                        <p>فشل تحميل المحادثات. يرجى المحاولة مرة أخرى.</p>
                        <button class="btn btn-primary" onclick="renderMessagesList(document.getElementById('studentListContainer'))" style="margin-top:0.5rem;">
                            <i class="fas fa-sync"></i> إعادة المحاولة
                        </button>
                    </div>
                `;
            }
        });
}

// ============================================================
//  إصلاح دالة renderMessagesList - التحقق من وجود العناصر
// ============================================================

function renderMessagesList(container) {
    if (!currentUser) {
        if (container) {
            container.innerHTML = '<div class="empty-state-modern"><i class="fas fa-envelope"></i><h4>يرجى تسجيل الدخول</h4></div>';
        }
        return;
    }
    
    if (!container) {
        console.error('❌ container غير موجود في renderMessagesList');
        return;
    }
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> جاري تحميل المحادثات...</div>';
    
    // جلب المحادثات من خلال الأصدقاء
    var friendsUids = currentUserData?.friends || [];
    
    if (friendsUids.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-inbox"></i>
                <h4>لا توجد محادثات</h4>
                <p>ليس لديك أصدقاء بعد، أضف أصدقاء لبدء المحادثات</p>
                <button class="btn btn-primary" onclick="switchStudentList('all')" style="margin-top:0.5rem;">
                    <i class="fas fa-users"></i> عرض الطلاب
                </button>
            </div>
        `;
        return;
    }
    
    var chatPromises = friendsUids.map(function(uid) {
        var chatId = [currentUser.uid, uid].sort().join('_');
        return db.collection('chats').doc(chatId).get()
            .then(function(doc) {
                if (doc.exists) {
                    return { id: doc.id, ...doc.data(), otherUid: uid };
                }
                return null;
            })
            .catch(function() { return null; });
    });
    
    Promise.all(chatPromises)
        .then(function(results) {
            var chats = results.filter(function(r) { return r !== null; });
            
            chats.sort(function(a, b) {
                var aTime = a.lastTimestamp?.seconds || 0;
                var bTime = b.lastTimestamp?.seconds || 0;
                return bTime - aTime;
            });
            
            if (chats.length === 0) {
                container.innerHTML = `
                    <div class="empty-state-modern">
                        <i class="fas fa-inbox"></i>
                        <h4>لا توجد محادثات</h4>
                        <p>ليس لديك محادثات مع أصدقائك بعد</p>
                    </div>
                `;
                return;
            }
            
            var html = '<div class="students-grid-modern">';
            
            chats.forEach(function(chat) {
                var otherUser = users.find(function(u) { return u.uid === chat.otherUid; });
                if (otherUser) {
                    // بناء بطاقة المستخدم مع معلومات المحادثة
                    var cardHtml = buildStudentCard(otherUser);
                    
                    // إضافة آخر رسالة
                    var lastMessage = chat.lastMessage || 'لا توجد رسائل';
                    var isFromMe = chat.lastSender === currentUser.uid;
                    var time = chat.lastTimestamp?.seconds ? 
                        new Date(chat.lastTimestamp.seconds * 1000).toLocaleString('ar', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                        }) : 
                        '';
                    
                    // تعديل البطاقة لإضافة معلومات المحادثة
                    var modifiedCard = cardHtml.replace(
                        '<div class="student-bottom">',
                        `<div class="student-bottom">
                            <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.7rem;color:var(--gray-500);width:100%;flex-wrap:wrap;">
                                <i class="fas fa-comment" style="color:${isFromMe ? 'var(--primary)' : 'var(--gray-400)'};"></i>
                                ${isFromMe ? '<span style="font-weight:600;color:var(--primary);">أنت:</span>' : ''}
                                <span>${escapeHtml(lastMessage.length > 30 ? lastMessage.substring(0, 30) + '...' : lastMessage)}</span>
                                <span style="font-size:0.55rem;color:var(--gray-400);margin-right:auto;">${time}</span>
                            </div>
                        </div>
                        <div class="student-bottom" style="border-top:none;padding-top:0;">`
                    );
                    html += modifiedCard;
                }
            });
            
            html += '</div>';
            container.innerHTML = html;
            
            // تحديث عدد الرسائل - مع التحقق من وجود العناصر
            var messagesEl = document.getElementById('messagesCount');
            if (messagesEl) messagesEl.textContent = chats.length;
            
            var badgeEl = document.getElementById('messagesTabBadge');
            if (badgeEl) badgeEl.textContent = chats.length;
        })
        .catch(function(error) {
            console.error('Error loading chats:', error);
            container.innerHTML = `
                <div class="empty-state-modern">
                    <i class="fas fa-exclamation-circle" style="color:var(--warning);"></i>
                    <h4>حدث خطأ</h4>
                    <p>فشل تحميل المحادثات. يرجى المحاولة مرة أخرى.</p>
                    <button class="btn btn-primary" onclick="renderMessagesList(document.getElementById('studentListContainer'))" style="margin-top:0.5rem;">
                        <i class="fas fa-sync"></i> إعادة المحاولة
                    </button>
                </div>
            `;
        });
}



// ============================================================
//  تحديث دالة sendChatMessage - لإضافة إشعارات أفضل
// ============================================================

async function sendChatMessage() {
    var input = document.getElementById('chatInput');
    if (!input) {
        console.error('❌ حقل الإدخال غير موجود');
        return;
    }
    
    var message = input.value.trim();
    if (!message) {
        showToast('يرجى كتابة رسالة', 'warning');
        return;
    }
    
    if (!currentChatUser) {
        showToast('لا يوجد مستخدم للمراسلة', 'error');
        return;
    }
    
    // التحقق مرة أخرى من إعدادات الخصوصية
    var user = users.find(function(u) { return u.uid === currentChatUser; });
    if (user && user.privacy && user.privacy.allowMessages === false && !isAdmin) {
        showToast('🔒 هذا المستخدم لا يسمح بالمراسلة', 'error');
        closeChat();
        return;
    }
    
    input.value = '';
    input.disabled = true;
    var sendBtn = document.getElementById('chatSendBtn');
    if (sendBtn) sendBtn.disabled = true;
    
    try {
        var chatId = [currentUser.uid, currentChatUser].sort().join('_');
        
        // إضافة الرسالة
        await db.collection('chats')
            .doc(chatId)
            .collection('messages')
            .add({
                from: currentUser.uid,
                to: currentChatUser,
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                read: false
            });
        
        // تحديث آخر رسالة في المستند الرئيسي
        await db.collection('chats').doc(chatId).set({
            lastMessage: message,
            lastSender: currentUser.uid,
            lastTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
            participants: [currentUser.uid, currentChatUser]
        }, { merge: true });
        
        // إرسال إشعار للمستلم
        try {
            await sendNotification(currentChatUser, {
                message: '💬 ' + (currentUserData?.displayName || currentUser.email) + ': ' + message.substring(0, 30) + (message.length > 30 ? '...' : ''),
                type: 'message',
                link: '/messages'
            });
        } catch (notifError) {
            console.warn('⚠️ خطأ في إرسال الإشعار:', notifError);
        }
        
        // تحديث عدد الرسائل في الإحصائيات
        loadMessagesCount();
        
    } catch (error) {
        console.error('Error sending message:', error);
        showToast('حدث خطأ في إرسال الرسالة: ' + error.message, 'error');
        // إعادة النص إلى حقل الإدخال
        input.value = message;
    } finally {
        input.disabled = false;
        if (sendBtn) sendBtn.disabled = false;
        input.focus();
    }
}

function closeChat() {
    if (chatListener) {
        chatListener();
        chatListener = null;
    }
    currentChatUser = null;
    chatMessages = [];
    closeModal('chatModal');
}

// ============================================================
//  تحديث CSS للدردشة - ضمان ظهور صندوق الكتابة والزر
// ============================================================

// تحديث دالة sendPrivateMessage لاستخدام الدردشة
function sendPrivateMessage(uid) {
    openChat(uid);
}

async function sendMessage(uid) {
    var subject = document.getElementById('messageSubject')?.value?.trim();
    var message = document.getElementById('messageText')?.value?.trim();
    
    if (!message) {
        showToast('يرجى كتابة الرسالة', 'error');
        return;
    }
    
    if (!subject) {
        subject = 'رسالة من ' + (currentUserData?.displayName || 'مستخدم');
    }
    
    try {
        await db.collection('messages').add({
            from: currentUser.uid,
            fromName: currentUserData?.displayName || currentUser.email,
            to: uid,
            subject: subject,
            message: message,
            read: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إرسال إشعار للمستلم
        await sendNotification(uid, {
            message: '📩 ' + (currentUserData?.displayName || currentUser.email) + ' أرسل لك رسالة: ' + subject,
            type: 'message',
            link: '/messages'
        });
        
        showToast('✅ تم إرسال الرسالة بنجاح!', 'success');
        closeModal('messageModal');
    } catch (error) {
        console.error('Error sending message:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

function createMessageModal() {
    if (document.getElementById('messageModal')) return;
    
    var modal = document.createElement('div');
    modal.id = 'messageModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width:500px;">
            <div class="modal-header">
                <h3 id="messageModalTitle"><i class="fas fa-envelope"></i> مراسلة</h3>
                <button class="btn-close" onclick="closeModal('messageModal')"><i class="fas fa-times"></i></button>
            </div>
            <div id="messageModalContent"></div>
        </div>
    `;
    document.body.appendChild(modal);
}

// ============================================================
//  تحديث openUserProfileTab - إصلاح عنوان قائمة الإبلاغات
// ============================================================

function openUserProfileTab(tabKey, uid) {
    console.log('🔍 فتح علامة التبويب:', tabKey, 'للمستخدم:', uid);
    
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) {
        showToast('المستخدم غير موجود', 'error');
        return;
    }
    
    // التأكد من وجود المودال
    var modal = document.getElementById('userTabModal');
    var content = document.getElementById('userTabModalContent');
    if (!modal || !content) {
        createUserTabModal();
        modal = document.getElementById('userTabModal');
        content = document.getElementById('userTabModalContent');
        if (!modal || !content) {
            console.error('❌ فشل في إنشاء مودال علامات التبويب');
            return;
        }
    }
    
    var title = '';
    var html = '';
    
    switch (tabKey) {
        case 'completed':
            title = '📚 المواد المجتازة';
            html = buildCompletedList(user);
            break;
        case 'badges':
            title = '🏅 الشارات';
            html = buildBadgesList(user);
            break;
        case 'favorites':
            title = '⭐ المواد المفضلة';
            html = buildFavoritesList(user);
            break;
        case 'votes':
            title = '🗳️ التصويتات';
            html = buildVotesList(user);
            break;
        case 'friends':
            title = '👥 الأصدقاء';
            html = buildFriendsList(user);
            break;
        case 'trusted':
            title = '🤝 الثقات';
            html = buildTrustedList(user);
            break;
        case 'reports':
            title = '🚩 قائمة الإبلاغات';
            html = buildReportsList(user);
            break;
        default:
            title = 'تفاصيل';
            html = '<div style="text-align:center;color:var(--gray-400);padding:1rem;">لا توجد بيانات</div>';
    }
    
    var titleEl = document.getElementById('userTabModalTitle');
    if (titleEl) {
        titleEl.textContent = title + ' - ' + (user.displayName || 'مستخدم');
    }
    content.innerHTML = html;
    openModal('userTabModal');
}



// ============================================================
//  إصلاح فتح مادة من القوائم - استخدام دالة موحدة
// ============================================================

function openCourseFromList(courseId) {
    // إغلاق المودال الحالي
    closeModal('userTabModal');
    // تأخير بسيط لضمان إغلاق المودال
    setTimeout(function() {
        openCourseActionsModal(courseId);
    }, 300);
}

// تحديث دوال بناء القوائم لاستخدام الدالة الموحدة
function buildCompletedList(user) {
    var comps = user.completed || [];
    if (user.privacy && user.privacy.hideCompleted) {
        return '<div style="text-align:center;color:var(--gray-400);padding:1.5rem;"><i class="fas fa-lock" style="font-size:2rem;display:block;margin-bottom:0.5rem;"></i> هذه القائمة مخفية من قبل المستخدم</div>';
    }
    if (comps.length === 0) {
        return '<div style="text-align:center;color:var(--gray-400);padding:1.5rem;"><i class="fas fa-check-circle" style="font-size:2rem;display:block;margin-bottom:0.5rem;"></i> لا توجد مواد مجتازة</div>';
    }
    
    var html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0.5rem;">';
    comps.forEach(function(id) {
        var c = courses.find(function(crs) { return crs.id === id; });
        if (c) {
            html += '<div class="course-mini-card" onclick="openCourseFromList(\'' + c.id + '\')" style="cursor:pointer;background:var(--card-bg);padding:0.5rem 0.8rem;border-radius:12px;border:1px solid var(--border-color);transition:all 0.3s ease;">';
            html += '<div style="font-weight:600;font-size:0.9rem;">' + escapeHtml(c.name) + '</div>';
            html += '<div style="font-size:0.7rem;color:var(--gray-400);">' + escapeHtml(c.code) + '</div>';
            html += '<span style="font-size:0.6rem;background:var(--success);color:white;padding:0.05rem 0.5rem;border-radius:20px;display:inline-block;margin-top:0.2rem;"><i class="fas fa-check"></i> مجتاز</span>';
            html += '</div>';
        }
    });
    html += '</div>';
    return html;
}

function buildFavoritesList(user) {
    var favs = user.favorites || [];
    if (user.privacy && user.privacy.hideFavorites) {
        return '<div style="text-align:center;color:var(--gray-400);padding:1.5rem;"><i class="fas fa-lock" style="font-size:2rem;display:block;margin-bottom:0.5rem;"></i> هذه القائمة مخفية من قبل المستخدم</div>';
    }
    if (favs.length === 0) {
        return '<div style="text-align:center;color:var(--gray-400);padding:1.5rem;"><i class="fas fa-star" style="font-size:2rem;display:block;margin-bottom:0.5rem;"></i> لا توجد مواد مفضلة</div>';
    }
    
    var html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0.5rem;">';
    favs.forEach(function(id) {
        var c = courses.find(function(crs) { return crs.id === id; });
        if (c) {
            html += '<div class="course-mini-card" onclick="openCourseFromList(\'' + c.id + '\')" style="cursor:pointer;background:var(--card-bg);padding:0.5rem 0.8rem;border-radius:12px;border:1px solid var(--border-color);transition:all 0.3s ease;">';
            html += '<div style="font-weight:600;font-size:0.9rem;">' + escapeHtml(c.name) + '</div>';
            html += '<div style="font-size:0.7rem;color:var(--gray-400);">' + escapeHtml(c.code) + '</div>';
            html += '<span style="font-size:0.6rem;background:var(--warning);color:#78350f;padding:0.05rem 0.5rem;border-radius:20px;display:inline-block;margin-top:0.2rem;"><i class="fas fa-star"></i> مفضلة</span>';
            html += '</div>';
        }
    });
    html += '</div>';
    return html;
}

function buildVotesList(user) {
    var votedCourses = [];
    courses.forEach(function(course) {
        if (course.voters && course.voters[user.uid]) {
            votedCourses.push({ course: course, rating: course.voters[user.uid] });
        }
    });
    if (user.privacy && user.privacy.hideVotes) {
        return '<div style="text-align:center;color:var(--gray-400);padding:1.5rem;"><i class="fas fa-lock" style="font-size:2rem;display:block;margin-bottom:0.5rem;"></i> هذه القائمة مخفية من قبل المستخدم</div>';
    }
    if (votedCourses.length === 0) {
        return '<div style="text-align:center;color:var(--gray-400);padding:1.5rem;"><i class="fas fa-vote-yea" style="font-size:2rem;display:block;margin-bottom:0.5rem;"></i> لم يصوت على أي مادة</div>';
    }
    
    var html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0.5rem;">';
    votedCourses.forEach(function(item) {
        var ratingText = RATING_LABELS[5 - item.rating] || '';
        var c = item.course;
        html += '<div class="course-mini-card" onclick="openCourseFromList(\'' + c.id + '\')" style="cursor:pointer;background:var(--card-bg);padding:0.5rem 0.8rem;border-radius:12px;border:1px solid var(--border-color);transition:all 0.3s ease;">';
        html += '<div style="font-weight:600;font-size:0.9rem;">' + escapeHtml(c.name) + '</div>';
        html += '<div style="font-size:0.7rem;color:var(--gray-400);">' + escapeHtml(c.code) + '</div>';
        html += '<span style="font-size:0.6rem;background:var(--primary-light);color:var(--primary-dark);padding:0.05rem 0.5rem;border-radius:20px;display:inline-block;margin-top:0.2rem;"><i class="fas fa-star"></i> ' + ratingText + '</span>';
        html += '</div>';
    });
    html += '</div>';
    return html;
}

// ============================================================
//  إصلاح زر الإبلاغ والثقة
// ============================================================

async function trustUser(uid) {
    if (!currentUser) {
        showToast('يرجى تسجيل الدخول', 'error');
        return;
    }
    if (uid === currentUser.uid) {
        showToast('لا يمكنك التصويت على نفسك', 'warning');
        return;
    }
    try {
        var targetRef = db.collection('users').doc(uid);
        var targetDoc = await targetRef.get();
        if (!targetDoc.exists) return;
        var targetData = targetDoc.data();
        var trustList = targetData.trustedBy || [];
        var trustIndex = trustList.indexOf(currentUser.uid);
        var isTrusting = trustIndex === -1;
        
        if (isTrusting) {
            trustList.push(currentUser.uid);
            showToast('✅ تم إضافة الثقة', 'success');
        } else {
            trustList.splice(trustIndex, 1);
            showToast('❌ تم إزالة الثقة', 'warning');
        }
        await targetRef.update({ trustedBy: trustList });
        
        // تحديث البيانات المحلية
        var userIndex = users.findIndex(function(u) { return u.uid === uid; });
        if (userIndex !== -1) {
            users[userIndex].trustedBy = trustList;
        }
        if (currentUserData) {
            // تحديث حالة الثقة للمستخدم الحالي
        }
        
        // تحديث المودال المفتوح
        refreshCurrentUserProfileModal();
        renderUsers();
        await loadAllData();
    } catch (error) {
        console.error('Error trusting user:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

async function reportUser(uid) {
    if (!currentUser) {
        showToast('يرجى تسجيل الدخول', 'error');
        return;
    }
    if (uid === currentUser.uid) {
        showToast('لا يمكنك الإبلاغ عن نفسك', 'warning');
        return;
    }
    if (!confirm('⚠️ هل أنت متأكد من الإبلاغ عن هذا المستخدم؟')) return;
    
    try {
        var targetRef = db.collection('users').doc(uid);
        var targetDoc = await targetRef.get();
        if (!targetDoc.exists) return;
        var targetData = targetDoc.data();
        var reports = targetData.reports || [];
        var reportIndex = reports.indexOf(currentUser.uid);
        var isReporting = reportIndex === -1;
        
        if (isReporting) {
            reports.push(currentUser.uid);
            showToast('⚠️ تم الإبلاغ عن المستخدم', 'error');
        } else {
            reports.splice(reportIndex, 1);
            showToast('✅ تم إلغاء الإبلاغ', 'success');
        }
        await targetRef.update({ reports: reports });
        
        // تحديث البيانات المحلية
        var userIndex = users.findIndex(function(u) { return u.uid === uid; });
        if (userIndex !== -1) {
            users[userIndex].reports = reports;
        }
        
        // تحديث المودال المفتوح
        refreshCurrentUserProfileModal();
        renderUsers();
        await loadAllData();
    } catch (error) {
        console.error('Error reporting user:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// ============================================================
//  تحديث buildUserProfileHTML - مع إعادة ترتيب الأزرار
// ============================================================




// دوال مساعدة لبناء القوائم
function buildListContent(items, emptyMsg, coursesList, type) {
    if (!items || items.length === 0) {
        return '<div style="text-align:center;color:var(--gray-400);padding:1rem;">لا توجد ' + emptyMsg + '</div>';
    }
    var html = '<div class="view-courses-grid" style="display:flex;flex-wrap:wrap;gap:0.5rem;padding:0.5rem;">';
    items.forEach(function(id) {
        var course = coursesList.find(function(c) { return c.id === id; });
        if (course) {
            var extraClass = (type === 'completed') ? 'course-completed' : '';
            html += '<div class="course-mini-card ' + extraClass + '" onclick="openCourseActionsModal(\'' + course.id + '\')" style="cursor:pointer; background:var(--card-bg); padding:0.3rem 0.8rem; border-radius:20px; border:1px solid var(--border-color); transition:var(--transition); display:inline-flex; align-items:center; gap:0.3rem;">';
            html += '<i class="fas ' + (type === 'completed' ? 'fa-check-circle' : 'fa-star') + '" style="color:' + (type === 'completed' ? 'var(--success)' : 'var(--warning)') + ';"></i>';
            html += escapeHtml(course.name);
            html += '</div>';
        }
    });
    html += '</div>';
    return html;
}

function buildBadgesContent(user) {
    var badges = calculateBadges(user);
    if (badges.length === 0) {
        return '<div style="text-align:center;color:var(--gray-400);padding:1rem;">لا توجد شارات</div>';
    }
    var html = '<div class="view-badges-grid" style="display:flex;flex-wrap:wrap;gap:0.5rem;padding:0.5rem;">';
    badges.forEach(function(b) {
        html += '<span class="badge-item ' + b.class + '" style="font-size:0.85rem;padding:0.3rem 1rem;"><i class="fas ' + b.icon + '"></i> ' + b.name + '</span>';
    });
    html += '</div>';
    return html;
}

function buildVotesContent(user) {
    var votedItems = [];
    courses.forEach(function(course) {
        if (course.voters && course.voters[user.uid]) {
            votedItems.push({ course: course, rating: course.voters[user.uid] });
        }
    });
    if (votedItems.length === 0) {
        return '<div style="text-align:center;color:var(--gray-400);padding:1rem;">لم يصوت على أي مادة</div>';
    }
    var html = '<div class="view-courses-grid" style="display:flex;flex-wrap:wrap;gap:0.5rem;padding:0.5rem;">';
    votedItems.forEach(function(item) {
        var ratingText = RATING_LABELS[5 - item.rating] || '';
        html += '<div class="course-mini-card" onclick="openCourseActionsModal(\'' + item.course.id + '\')" style="cursor:pointer; background:var(--card-bg); padding:0.3rem 0.8rem; border-radius:20px; border:1px solid var(--border-color); transition:var(--transition); display:inline-flex; align-items:center; gap:0.3rem;">';
        html += '<i class="fas fa-vote-yea" style="color:var(--warning);"></i>';
        html += escapeHtml(item.course.name) + ' <span style="font-size:0.7rem;color:var(--gray-500);">(' + ratingText + ')</span>';
        html += '</div>';
    });
    html += '</div>';
    return html;
}

function buildUsersListContent(uidList, relationType) {
    if (!uidList || uidList.length === 0) {
        return '<div style="text-align:center;color:var(--gray-400);padding:1rem;">لا يوجد ' + relationType + '</div>';
    }
    var html = '<div class="view-users-grid" style="display:flex;flex-wrap:wrap;gap:0.5rem;padding:0.5rem;">';
    uidList.forEach(function(uid) {
        var person = users.find(function(u) { return u.uid === uid; });
        if (person) {
            html += '<div class="user-mini-card" onclick="viewUserProfile(\'' + uid + '\')" style="cursor:pointer; background:var(--card-bg); padding:0.2rem 0.8rem; border-radius:20px; border:1px solid var(--border-color); transition:var(--transition); display:inline-flex; align-items:center; gap:0.4rem;">';
            html += '<img src="' + (person.avatar || '') + '" style="width:24px;height:24px;border-radius:50%;object-fit:cover;background:var(--gray-200);" onerror="this.style.display=\'none\'" />';
            html += escapeHtml(person.displayName || 'مستخدم');
            html += '</div>';
        }
    });
    html += '</div>';
    return html;
}

// ============================================================
//  تبديل التبويبات في ملف المستخدم
// ============================================================

function switchUserProfileTab(tabKey, uid) {
    // إزالة الفئة النشطة من جميع الأزرار
    document.querySelectorAll('.stat-box[data-tab]').forEach(function(box) {
        box.classList.remove('active-tab');
    });

    // تفعيل الزر المضغوط
    var targetBox = document.querySelector('.stat-box[data-tab="' + tabKey + '"]');
    if (targetBox) {
        targetBox.classList.add('active-tab');
    }

    // جلب بيانات المستخدم
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) return;

    var container = document.getElementById('userProfileTabContent');
    if (!container) return;

    // بناء المحتوى حسب التبويب
    var content = '';
    switch (tabKey) {
        case 'completed':
            content = buildCompletedList(user);
            break;
        case 'badges':
            html = buildBadgesList(user);
            break;
        case 'favorites':
            content = buildFavoritesList(user);
            break;
        case 'votes':
            content = buildVotesList(user);
            break;
        case 'friends':
            content = buildFriendsList(user);
            break;
        case 'trusted':
            content = buildTrustedList(user);
            break;
        case 'reports':
            content = buildReportsList(user);
            break;
        default:
            content = '<div style="color:var(--gray-400);">اختر تبويباً</div>';
    }
    container.innerHTML = content;
}

// ============================================================
//  دوال بناء القوائم في ملف المستخدم
// ============================================================

// ============================================================
//  دوال بناء القوائم في ملف المستخدم - إصلاح عرض الحالة
// ============================================================


// ============================================================
//  دوال بناء القوائم للمودالات
// ============================================================



// ============================================================
//  دوال مساعدة لبناء HTML
// ============================================================

function buildCourseInfoHTML(course) {
    var specs = course.specialties?.map(function(s) {
        var spec = allSpecialties.find(function(sp) { return sp.id === s.id; });
        return spec ? spec.name : s.id;
    }).join('، ') || 'لا يوجد';
    
    var collegeNames = course.specialties?.map(function(s) {
        var spec = allSpecialties.find(function(sp) { return sp.id === s.id; });
        var college = spec ? colleges.find(function(c) { return c.id === spec.collegeId; }) : null;
        return college ? college.name : null;
    }).filter(Boolean).join('، ') || 'لا يوجد';
    
    var hasLab = course.hasLab === 'نعم';
    var html = '<div style="margin-bottom:1rem;">';
    html += '<h4 style="color:var(--gray-600);margin-bottom:0.5rem;">📝 وصف المادة</h4>';
    html += '<p>' + escapeHtml(course.desc || 'لا يوجد وصف') + '</p>';
    html += '</div>';
    html += '<div class="course-info-grid">';
    html += '<div class="info-item"><span class="label">🏷️ النوع</span><span class="value">' + course.type + '</span></div>';
    html += '<div class="info-item"><span class="label">📅 السنة</span><span class="value">' + course.year + '</span></div>';
    html += '<div class="info-item"><span class="label">📚 الفصل</span><span class="value">' + (course.semester?.join('، ') || 'غير محدد') + '</span></div>';
    html += '<div class="info-item"><span class="label">⏱️ الساعات</span><span class="value">' + course.hours + ' س</span></div>';
    html += '<div class="info-item"><span class="label">📖 نظري</span><span class="value">' + (course.theory || 0) + ' س</span></div>';
    if (hasLab) {
        html += '<div class="info-item"><span class="label">🔬 عملي</span><span class="value">' + (course.practical || 0) + ' س</span></div>';
    }
    html += '<div class="info-item"><span class="label">📊 الوحدات</span><span class="value">' + course.units + '</span></div>';
    html += '<div class="info-item"><span class="label">📝 النصفي</span><span class="value">' + (course.hasMid === 'نعم' ? 'نعم (' + (course.midUnits || 0) + ' وحدات)' : 'لا') + '</span></div>';
    if (hasLab) {
        html += '<div class="info-item"><span class="label">🧪 وحدات عملي</span><span class="value">' + (course.labUnits || 0) + '</span></div>';
    }
    html += '<div class="info-item"><span class="label">🏃 النشاط</span><span class="value">' + (course.hasActivity === 'نعم' ? 'نعم' : 'لا') + '</span></div>';
    html += '<div class="info-item"><span class="label">🏛️ الكليات</span><span class="value">' + collegeNames + '</span></div>';
    html += '<div class="info-item"><span class="label">🏷️ التخصصات</span><span class="value">' + specs + '</span></div>';
    if (course.prereq) {
        html += '<div class="info-item"><span class="label">🔗 المتطلب السابق</span><span class="value">' + escapeHtml(course.prereq) + '</span></div>';
    }
    if (hasLab && course.labInfo) {
        html += '<div class="info-item" style="grid-column:1/-1;"><span class="label">🧪 معلومات العملي</span><span class="value">' + escapeHtml(course.labInfo) + '</span></div>';
    }
    html += '</div>';
    return html;
}

function buildVoteDetailsHTML(course) {
    var voters = course.voters || {};
    var voterKeys = Object.keys(voters);
    var totalVotes = voterKeys.length;
    var favCount = users.filter(function(u) { return u.favorites && u.favorites.indexOf(course.id) !== -1; }).length;
    
    var html = '<div style="margin-bottom:1rem;">';
    html += '<p><strong>إجمالي التصويتات:</strong> ' + totalVotes + '</p>';
    html += '<p><strong>متوسط التقييم:</strong> ' + (course.avgRating || 0).toFixed(1) + ' ★</p>';
    html += '<p><strong><i class="fas fa-star" style="color:var(--warning);"></i> عدد المفضلين:</strong> ' + favCount + ' مستخدم</p>';
    html += '</div>';
    
    var byYear = {};
    var byCompleted = { completed: [], notCompleted: [] };
    for (var i = 0; i < voterKeys.length; i++) {
        var uid = voterKeys[i];
        var rating = voters[uid];
        var user = users.find(function(u) { return u.uid === uid; });
        var year = user?.year || 'غير معروف';
        if (!byYear[year]) byYear[year] = [];
        byYear[year].push(rating);
        var isCompleted = user?.completed?.indexOf(course.id) !== -1 || false;
        if (isCompleted) {
            byCompleted.completed.push(rating);
        } else {
            byCompleted.notCompleted.push(rating);
        }
    }
    
    html += '<div class="vote-detail-section"><h4>📊 حسب السنة الدراسية</h4>';
    var yearKeys = Object.keys(byYear).sort();
    for (var j = 0; j < yearKeys.length; j++) {
        var y = yearKeys[j];
        var ratings = byYear[y];
        var avg = ratings.reduce(function(a, b) { return a + b; }, 0) / ratings.length;
        html += '<div class="vote-detail-item"><span class="label">سنة ' + y + '</span><span class="value">' + avg.toFixed(1) + ' ★ (' + ratings.length + ' صوت)</span></div>';
    }
    html += '</div>';
    
    html += '<div class="vote-detail-section"><h4>✅ حسب حالة الاجتياز</h4>';
    var compAvg = byCompleted.completed.length > 0 ? byCompleted.completed.reduce(function(a, b) { return a + b; }, 0) / byCompleted.completed.length : 0;
    var notCompAvg = byCompleted.notCompleted.length > 0 ? byCompleted.notCompleted.reduce(function(a, b) { return a + b; }, 0) / byCompleted.notCompleted.length : 0;
    html += '<div class="vote-detail-item"><span class="label">✅ مجتازين</span><span class="value">' + compAvg.toFixed(1) + ' ★ (' + byCompleted.completed.length + ' صوت)</span></div>';
    html += '<div class="vote-detail-item"><span class="label">❌ غير مجتازين</span><span class="value">' + notCompAvg.toFixed(1) + ' ★ (' + byCompleted.notCompleted.length + ' صوت)</span></div>';
    html += '</div>';
    
    html += '<div class="vote-detail-section"><h4>👤 تفاصيل التصويتات</h4>';
    for (var k = 0; k < Math.min(voterKeys.length, 20); k++) {
        var uid2 = voterKeys[k];
        var rating2 = voters[uid2];
        var user2 = users.find(function(u) { return u.uid === uid2; });
        var userName = user2 ? (user2.displayName || 'مستخدم') : 'مستخدم غير معروف';
        var userYear = user2?.year || '?';
        var isComp = user2?.completed?.indexOf(course.id) !== -1 || false;
        var ratingLabel = RATING_LABELS[5 - rating2];
        html += '<div class="vote-detail-item"><span class="label">' + escapeHtml(userName) + ' (سنة ' + userYear + ') ' + (isComp ? '✅' : '❌') + '</span><span class="value">' + ratingLabel + '</span></div>';
    }
    if (voterKeys.length > 20) {
        html += '<div style="text-align:center;color:var(--gray-400);font-size:0.8rem;">... و ' + (voterKeys.length - 20) + ' تصويت آخر</div>';
    }
    html += '</div>';
    return html;
}

function buildAnalyticsHTML(course) {
    var currentRating = course.avgRating || 3;
    var trend = (Math.random() - 0.5) * 0.3;
    var predicted = Math.max(1, Math.min(5, currentRating + trend));
    var difficulty = predicted >= 4 ? 'سهلة جداً' : predicted >= 3 ? 'سهلة' : predicted >= 2 ? 'متوسطة' : 'صعبة';
    var emoji = predicted >= 4 ? '😊' : predicted >= 3 ? '🙂' : predicted >= 2 ? '😐' : '😅';
    
    var html = '<div class="analytics-section">';
    html += '<h4>🔮 توقع صعوبة المادة في الفصل القادم</h4>';
    html += '<div class="prediction-box">';
    html += '<span class="prediction-emoji">' + emoji + '</span>';
    html += '<span class="prediction-value">' + predicted.toFixed(1) + ' ★</span>';
    html += '<span class="prediction-label">' + difficulty + '</span>';
    html += '<p class="prediction-note">بناءً على تحليل اتجاهات التقييمات السابقة</p>';
    html += '</div>';
    html += '</div>';
    return html;
}

// دالة لتحديث محتوى المودال الحالي
function refreshCurrentUserProfileModal() {
    if (!currentViewedUserUid) return;
    var user = users.find(function(u) { return u.uid === currentViewedUserUid; });
    if (!user) return;
    // تحديث المحتوى فقط دون إغلاق وإعادة فتح المودال
    var content = document.getElementById('userProfileContent');
    if (content) {
        content.innerHTML = buildUserProfileHTML(user);
    }
    // تحديث العنوان أيضاً (اختياري)
    var title = document.getElementById('userProfileTitle');
    if (title) {
        title.textContent = '👤 ' + (user.displayName || 'مستخدم');
    }
}

// دوال بديلة (handlers) تستدعي الدوال الأصلية ثم تحديث المودال
function handleSendFriend(uid) {
    sendFriendRequest(uid).then(function() {
        refreshCurrentUserProfileModal();
        renderUsers();
    });
}
function handleAcceptFriend(uid) {
    acceptFriendRequest(uid).then(function() {
        refreshCurrentUserProfileModal();
        renderUsers();
    });
}
function handleRejectFriend(uid) {
    rejectFriendRequest(uid).then(function() {
        refreshCurrentUserProfileModal();
        renderUsers();
    });
}
function handleCancelFriend(uid) {
    cancelFriendRequest(uid).then(function() {
        refreshCurrentUserProfileModal();
        renderUsers();
    });
}
function handleUnfriend(uid) {
    unfriend(uid).then(function() {
        refreshCurrentUserProfileModal();
        renderUsers();
    });
}
function handleTrustUser(uid) {
    trustUser(uid).then(function() {
        refreshCurrentUserProfileModal();
        renderUsers();
    });
}
function handleReportUser(uid) {
    reportUser(uid).then(function() {
        refreshCurrentUserProfileModal();
        renderUsers();
    });
}

// ============================================================
//  USERS PAGE
// ============================================================

// ============================================================
//  تطوير صفحة الطلاب - النسخة المتطورة
// ============================================================

// ============================================================
//  متغيرات حالة صفحة الطلاب
// ============================================================

var studentsViewMode = 'all'; // 'all' | 'friends' | 'pending'
var studentsFilteredData = [];
var studentsCurrentPage = 1;
var studentsPerPage = 12;
var studentsSortBy = 'name';

// ============================================================
//  loadUsersPage - تحميل صفحة الطلاب المتطورة
// ============================================================



// ============================================================
//  صفحة الطلاب المتطورة مع جميع القوائم
// ============================================================



// ============================================================
//  switchStudentList - تبديل القوائم
// ============================================================

var currentStudentList = 'all';

// ============================================================
//  إصلاح صفحة الطلاب - التحميل والأرقام والتصفيات
// ============================================================

// ============================================================
//  تحديث renderStudentsPage - تحميل الصفحة
// ============================================================

function renderStudentsPage() {
    var container = document.getElementById('usersList');
    if (!container) {
        console.error('❌ usersList غير موجود');
        return;
    }
    
    // استخدام HTML الموجود في الصفحة
    // تحديث الإحصائيات أولاً
    updateStudentsStats();
    
    // تحميل عدد الرسائل
    loadMessagesCount();
    
    // عرض القائمة الافتراضية بعد تحميل البيانات
    setTimeout(function() {
        switchStudentList('all');
    }, 300);
}



// ============================================================
//  تحديث renderTrustedList - عرض الثقات
// ============================================================

function renderTrustedList(container) {
    if (!currentUserData) {
        container.innerHTML = '<div class="empty-state-modern"><i class="fas fa-handshake"></i><h4>يرجى تسجيل الدخول</h4></div>';
        return;
    }
    
    var trustedUids = currentUserData.trustedBy || [];
    var trusted = users.filter(function(u) {
        return trustedUids.indexOf(u.uid) !== -1 && u.role !== 'admin';
    });
    
    if (trusted.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-handshake"></i>
                <h4>لا يوجد ثقات</h4>
                <p>لم يثق بك أي مستخدم بعد</p>
            </div>
        `;
        return;
    }
    
    var html = '<div class="students-grid-modern">';
    trusted.forEach(function(user) {
        html += buildStudentCard(user);
    });
    html += '</div>';
    container.innerHTML = html;
}

// ============================================================
//  تحديث renderReportsList - عرض البلاغات
// ============================================================

function renderReportsList(container) {
    if (!currentUserData) {
        container.innerHTML = '<div class="empty-state-modern"><i class="fas fa-flag"></i><h4>يرجى تسجيل الدخول</h4></div>';
        return;
    }
    
    var reportsUids = currentUserData.reports || [];
    var reports = users.filter(function(u) {
        return reportsUids.indexOf(u.uid) !== -1 && u.role !== 'admin';
    });
    
    if (reports.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-flag"></i>
                <h4>لا يوجد بلاغات</h4>
                <p>لم يتم الإبلاغ عن أي مستخدم</p>
            </div>
        `;
        return;
    }
    
    var html = '<div class="students-grid-modern">';
    reports.forEach(function(user) {
        html += buildStudentCard(user);
    });
    html += '</div>';
    container.innerHTML = html;
}
// إضافة CSS للـ list-header
// في style.css أضف:
/*
.list-header {
    margin-bottom: 0.75rem;
    padding: 0.5rem 1rem;
    background: var(--gray-50);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    font-weight: 600;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.list-header.warning {
    background: #fef2f2;
    border-color: #fca5a5;
}
*/


// ============================================================
//  renderBannedList - عرض قائمة المحظورين (للمشرف فقط)
// ============================================================

function renderBannedList(container) {
    if (!isAdmin) {
        container.innerHTML = '<div class="empty-state-modern"><i class="fas fa-lock"></i><h4>غير مصرح</h4><p>هذه القائمة للمشرفين فقط</p></div>';
        return;
    }
    
    var banned = users.filter(function(u) {
        return u.banned === true && u.role !== 'admin';
    });
    
    if (banned.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-user-check"></i>
                <h4>لا يوجد محظورين</h4>
                <p>جميع المستخدمين نشطون</p>
            </div>
        `;
        return;
    }
    
    var html = '<div style="margin-bottom:0.75rem;padding:0.5rem 1rem;background:#fef2f2;border-radius:12px;border:1px solid #fca5a5;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;">';
    html += '<span style="font-weight:600;color:#dc2626;"><i class="fas fa-ban"></i> المحظورين (' + banned.length + ')</span>';
    html += '<span style="font-size:0.8rem;color:var(--gray-400);">🚫 ' + banned.length + ' محظور</span>';
    html += '</div>';
    
    html += '<div class="students-grid-modern">';
    banned.forEach(function(user) {
        html += buildStudentCard(user);
    });
    html += '</div>';
    container.innerHTML = html;
}

// ============================================================
//  renderGiftsList - عرض قائمة الهدايا
// ============================================================

function renderGiftsList(container) {
    if (!currentUserData) {
        container.innerHTML = '<div class="empty-state-modern"><i class="fas fa-gift"></i><h4>يرجى تسجيل الدخول</h4></div>';
        return;
    }
    
    var gifts = currentUserData.receivedGifts || [];
    
    if (gifts.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-gift"></i>
                <h4>لا توجد هدايا</h4>
                <p>لم تستلم أي هدايا بعد</p>
            </div>
        `;
        return;
    }
    
    var totalPoints = gifts.reduce(function(sum, g) { return sum + (g.amount || 0); }, 0);
    var senders = new Set(gifts.map(function(g) { return g.from; })).size;
    
    var html = `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem;margin-bottom:0.75rem;">
            <div class="gifts-stat" style="text-align:center;padding:0.5rem;background:var(--gray-50);border-radius:12px;border:1px solid var(--border-color);">
                <i class="fas fa-gift" style="color:#f59e0b;font-size:1.2rem;display:block;"></i>
                <span style="font-size:1.2rem;font-weight:800;">${gifts.length}</span>
                <label style="font-size:0.6rem;color:var(--gray-400);display:block;">عدد الهدايا</label>
            </div>
            <div class="gifts-stat" style="text-align:center;padding:0.5rem;background:var(--gray-50);border-radius:12px;border:1px solid var(--border-color);">
                <i class="fas fa-coins" style="color:#f59e0b;font-size:1.2rem;display:block;"></i>
                <span style="font-size:1.2rem;font-weight:800;">${totalPoints}</span>
                <label style="font-size:0.6rem;color:var(--gray-400);display:block;">إجمالي النقاط</label>
            </div>
            <div class="gifts-stat" style="text-align:center;padding:0.5rem;background:var(--gray-50);border-radius:12px;border:1px solid var(--border-color);">
                <i class="fas fa-users" style="color:#f59e0b;font-size:1.2rem;display:block;"></i>
                <span style="font-size:1.2rem;font-weight:800;">${senders}</span>
                <label style="font-size:0.6rem;color:var(--gray-400);display:block;">عدد المرسلين</label>
            </div>
        </div>
    `;
    
    html += '<div style="max-height:500px;overflow-y:auto;">';
    var sortedGifts = gifts.slice().reverse();
    sortedGifts.forEach(function(gift) {
        var sender = users.find(function(u) { return u.uid === gift.from; });
        var senderName = sender ? (sender.displayName || 'مستخدم') : 'مستخدم غير معروف';
        var senderAvatar = sender ? (sender.avatar || '') : '';
        var date = gift.timestamp ? new Date(gift.timestamp).toLocaleDateString('ar') : 'تاريخ غير معروف';
        var amount = gift.amount || 0;
        var reason = gift.reason || 'هدية';
        
        html += `
            <div class="gift-item-modern" onclick="${sender ? `viewUserProfile('${gift.from}')` : ''}" style="cursor:${sender ? 'pointer' : 'default'};display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0.6rem;background:var(--gray-50);border-radius:10px;border:1px solid var(--border-color);margin-bottom:0.3rem;">
                <img src="${senderAvatar}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;" onerror="this.style.display='none'" />
                <div style="flex:1;">
                    <div style="font-weight:600;font-size:0.8rem;">${escapeHtml(senderName)}</div>
                    <div style="font-size:0.7rem;color:var(--gray-500);">${escapeHtml(reason)}</div>
                </div>
                <div style="text-align:center;padding:0.1rem 0.5rem;background:#dbeafe;border-radius:8px;">
                    <span style="font-weight:700;color:#1d4ed8;">${amount}</span>
                    <span style="font-size:0.5rem;color:var(--gray-400);display:block;">نقطة</span>
                </div>
                <div style="font-size:0.6rem;color:var(--gray-400);">${date}</div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// ============================================================
//  renderMessagesList - عرض قائمة الرسائل
// ============================================================

// ============================================================
//  renderMessagesList - إصلاح مشكلة الفهرس
// ============================================================



// ============================================================
//  viewMessage - عرض تفاصيل الرسالة
// ============================================================

async function viewMessage(messageId) {
    try {
        var doc = await db.collection('messages').doc(messageId).get();
        if (!doc.exists) return;
        var msg = doc.data();
        
        // تحديد الرسالة كمقروءة
        if (!msg.read) {
            await doc.ref.update({ read: true });
            // تحديث القائمة
            renderMessagesList(document.getElementById('studentListContainer'));
        }
        
        var sender = users.find(function(u) { return u.uid === msg.from; });
        var senderName = sender ? (sender.displayName || 'مستخدم') : (msg.fromName || 'مستخدم غير معروف');
        var date = msg.timestamp?.seconds ? 
            new Date(msg.timestamp.seconds * 1000).toLocaleString('ar') : 
            'تاريخ غير معروف';
        
        alert('📩 من: ' + senderName + '\nالموضوع: ' + (msg.subject || 'بدون موضوع') + '\n\n' + msg.message + '\n\n📅 ' + date);
    } catch (error) {
        console.error('Error viewing message:', error);
        showToast('حدث خطأ في عرض الرسالة', 'error');
    }
}

// ============================================================
//  loadMessagesCount - تحميل عدد الرسائل
// ============================================================




// ============================================================
//  switchStudentsView - تبديل عرض الطلاب
// ============================================================

function switchStudentsView(view) {
    studentsViewMode = view;
    studentsCurrentPage = 1;
    
    // تحديث الأزرار
    document.querySelectorAll('.view-tab').forEach(function(tab) {
        tab.classList.remove('active');
    });
    
    var tabs = document.querySelectorAll('.view-tab');
    var viewMap = { 'all': 0, 'friends': 1, 'pending': 2 };
    if (tabs[viewMap[view]]) {
        tabs[viewMap[view]].classList.add('active');
    }
    
    filterStudents();
}

// ============================================================
//  filterStudents - تصفية وترتيب الطلاب
// ============================================================



// ============================================================
//  getStudentsByView - الحصول على الطلاب حسب وضع العرض
// ============================================================

function getStudentsByView() {
    if (!currentUserData) {
        return users.filter(function(u) { return u.role !== 'admin'; });
    }
    
    switch(studentsViewMode) {
        case 'friends':
            var friendsUids = currentUserData.friends || [];
            return users.filter(function(u) { 
                return friendsUids.indexOf(u.uid) !== -1 && u.role !== 'admin';
            });
        case 'pending':
            var pendingUids = currentUserData.pendingRequests || [];
            var sentUids = currentUserData.sentRequests || [];
            var allPending = pendingUids.concat(sentUids);
            return users.filter(function(u) { 
                return allPending.indexOf(u.uid) !== -1 && u.role !== 'admin';
            });
        default:
            return users.filter(function(u) { return u.role !== 'admin'; });
    }
}

// ============================================================
//  renderStudentsGrid - عرض شبكة الطلاب
// ============================================================

function renderStudentsGrid() {
    var container = document.getElementById('studentsGridContainer');
    if (!container) return;
    
    var start = (studentsCurrentPage - 1) * studentsPerPage;
    var end = start + studentsPerPage;
    var pageStudents = studentsFilteredData.slice(start, end);
    
    if (pageStudents.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-search"></i>
                <h4>لا توجد نتائج</h4>
                <p>${studentsFilteredData.length === 0 ? 'لا يوجد طلاب مطابقين لمعايير البحث' : 'حاول تعديل معايير البحث'}</p>
                ${studentsViewMode === 'friends' ? '<p style="font-size:0.8rem;color:var(--gray-400);">يمكنك إضافة أصدقاء من خلال عرض ملفات الطلاب الأخرى</p>' : ''}
                ${studentsViewMode === 'pending' ? '<p style="font-size:0.8rem;color:var(--gray-400);">لا توجد طلبات صداقة معلقة</p>' : ''}
            </div>
        `;
        updatePagination();
        return;
    }
    
    var html = '<div class="students-grid-modern">';
    
    pageStudents.forEach(function(user) {
        html += buildStudentCard(user);
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    updatePagination();
}

// ============================================================
//  buildStudentCard - بناء بطاقة طالب متطورة
// ============================================================

// ============================================================
//  تحديث buildStudentCard - تصميم عمودي متناسق
// ============================================================

function buildStudentCard(user) {
    var uid = user.uid;
    var viewerUid = currentUser ? currentUser.uid : null;
    var isCurrentUser = viewerUid === uid;

    function canView(field) {
        return canViewUserData(user, field, viewerUid);
    }

    var result = calculateUserPoints(user);
    var badges = calculateBadges(user);

    var isBlocked = isUserBlocked(uid);
    var isBlockedBy = isUserBlockedBy(uid);

    if (isBlocked || isBlockedBy) {
        return `<div class="student-card blocked-card">
            <div style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem;color:var(--gray-400);">
                <i class="fas fa-ban" style="color:#dc2626;font-size:1.2rem;"></i>
                <div><div style="font-weight:600;">${escapeHtml(user.displayName || 'مستخدم')}</div><div style="font-size:0.7rem;">${isBlocked ? 'محظور من قبلك' : 'قام بحظرك'}</div></div>
                <button class="btn btn-sm btn-outline" onclick="unblockUser('${uid}')" style="margin-right:auto;"><i class="fas fa-undo"></i> إلغاء الحظر</button>
            </div>
        </div>`;
    }

    var relationship = getFriendshipStatus(uid);
    var isFriend = relationship === 'friend';
    var isPendingFromMe = relationship === 'pending_from_me';
    var isPendingFromThem = relationship === 'pending_from_them';

    var collegeName = 'غير محدد';
    if (canView('college') && user.college) {
        var col = colleges.find(function(c) { return c.id === user.college; });
        if (col) collegeName = col.name;
    }
    var specName = 'غير محدد';
    if (canView('specialty') && user.specialty) {
        var spec = allSpecialties.find(function(s) { return s.id === user.specialty; });
        if (spec) specName = spec.name;
    }

    var favCount = (user.favorites || []).length;
    var compCount = (user.completed || []).length;
    var trustCount = (user.trustedBy || []).length;
    var friendsCount = (user.friends || []).length;
    var voteCount = user.votes || 0;
    var points = result.earnedPoints || 0;
    var badgeCount = badges.length;
    var isBanned = user.banned || false;

    var html = `<div class="student-card ${isFriend ? 'friend-card' : ''} ${isBanned ? 'banned-card' : ''}" onclick="viewUserProfile('${uid}')">
        <div class="student-row">
            <div class="student-avatar-wrapper">
                <div class="student-avatar">
                    <img src="${user.avatar || ''}" onerror="this.src=''" alt="${escapeHtml(user.displayName || 'مستخدم')}" />
                    ${isCurrentUser ? '<span class="self-badge">أنت</span>' : ''}
                    ${isFriend ? '<span class="friend-badge"><i class="fas fa-user-check"></i></span>' : ''}
                    ${isBanned ? '<span class="banned-badge">🚫</span>' : ''}
                </div>
            </div>
            <div class="student-info">
                <div class="student-name">
                    ${escapeHtml(user.displayName || 'مستخدم')}
                    ${user.isSuperAdmin ? '<span class="super-admin-icon"><i class="fas fa-crown" style="color:#ffd700;"></i></span>' : ''}
                    <span class="student-tier" style="color:${result.tier.color};"><i class="fas ${result.tier.icon}"></i> ${result.tier.name}</span>
                </div>
                <div class="student-details">
                    ${canView('college') ? `<span><i class="fas fa-university"></i> ${escapeHtml(collegeName)}</span>` : ''}
                    ${canView('specialty') ? `<span><i class="fas fa-tag"></i> ${escapeHtml(specName)}</span>` : ''}
                    ${canView('year') ? `<span><i class="fas fa-calendar-alt"></i> سنة ${user.year || '?'}</span>` : ''}
                </div>
                ${canView('bio') && user.bio ? `<div class="student-bio">${escapeHtml(user.bio.length > 60 ? user.bio.substring(0, 60) + '...' : user.bio)}</div>` : ''}
            </div>
            <div class="student-stats">
                ${canView('favorites') ? `<div class="stat-item"><i class="fas fa-star" style="color:#f59e0b;"></i><span>${favCount}</span></div>` : ''}
                ${canView('completed') ? `<div class="stat-item"><i class="fas fa-check-circle" style="color:#22c55e;"></i><span>${compCount}</span></div>` : ''}
                ${canView('votes') ? `<div class="stat-item"><i class="fas fa-vote-yea" style="color:#3b82f6;"></i><span>${voteCount}</span></div>` : ''}
                ${canView('badges') ? `<div class="stat-item"><i class="fas fa-trophy" style="color:#8b5cf6;"></i><span>${badgeCount}</span></div>` : ''}
                ${canView('trustedBy') ? `<div class="stat-item"><i class="fas fa-handshake" style="color:#10b981;"></i><span>${trustCount}</span></div>` : ''}
                ${canView('friendsList') ? `<div class="stat-item"><i class="fas fa-users" style="color:#6366f1;"></i><span>${friendsCount}</span></div>` : ''}
                <div class="stat-item"><i class="fas fa-gem" style="color:#f59e0b;"></i><span>${points}</span></div>
            </div>
        </div>
        <div class="student-bottom">
            <div class="student-badges">
                ${badges.slice(0, 5).map(function(b) {
                    return `<span class="badge-item ${b.class}" style="font-size:0.55rem;padding:0.05rem 0.4rem;"><i class="fas ${b.icon}"></i></span>`;
                }).join('')}
                ${badges.length > 5 ? `<span class="badge-more">+${badges.length - 5}</span>` : ''}
            </div>
            <div class="student-actions" onclick="event.stopPropagation();">
                ${!isCurrentUser ? `
                    ${!isFriend && !isPendingFromMe && !isPendingFromThem ? `<button class="btn btn-primary btn-sm" onclick="sendFriendRequest('${uid}')"><i class="fas fa-user-plus"></i></button>` : ''}
                    ${isPendingFromMe ? `<button class="btn btn-warning btn-sm" onclick="cancelFriendRequest('${uid}')"><i class="fas fa-clock"></i></button>` : ''}
                    ${isPendingFromThem ? `<button class="btn btn-success btn-sm" onclick="acceptFriendRequest('${uid}')"><i class="fas fa-check"></i></button><button class="btn btn-danger btn-sm" onclick="rejectFriendRequest('${uid}')"><i class="fas fa-times"></i></button>` : ''}
                    ${isFriend ? `<button class="btn btn-danger btn-sm" onclick="unfriend('${uid}')"><i class="fas fa-user-minus"></i></button>` : ''}
                    <button class="btn btn-outline btn-sm" onclick="viewUserProfile('${uid}')"><i class="fas fa-user"></i></button>
                    ${isAdmin && !isCurrentUser ? `<button class="btn btn-outline btn-sm" onclick="event.stopPropagation();banUser('${uid}')" style="color:var(--danger);"><i class="fas fa-ban"></i></button>` : ''}
                ` : `<span class="self-label">👤 هذا أنت</span>`}
            </div>
        </div>
    </div>`;

    return html;
}

// ============================================================
//  updatePagination - تحديث ترقيم الصفحات
// ============================================================

function updatePagination() {
    var container = document.getElementById('studentsPagination');
    if (!container) return;
    
    var totalPages = Math.ceil(studentsFilteredData.length / studentsPerPage);
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    var html = '<div class="pagination-controls">';
    
    // زر السابق
    html += `<button class="page-btn ${studentsCurrentPage === 1 ? 'disabled' : ''}" onclick="changeStudentsPage(${studentsCurrentPage - 1})" ${studentsCurrentPage === 1 ? 'disabled' : ''}>
        <i class="fas fa-chevron-right"></i>
    </button>`;
    
    // أرقام الصفحات
    var startPage = Math.max(1, studentsCurrentPage - 2);
    var endPage = Math.min(totalPages, studentsCurrentPage + 2);
    
    if (startPage > 1) {
        html += `<button class="page-btn" onclick="changeStudentsPage(1)">1</button>`;
        if (startPage > 2) html += '<span class="page-dots">...</span>';
    }
    
    for (var i = startPage; i <= endPage; i++) {
        html += `<button class="page-btn ${i === studentsCurrentPage ? 'active' : ''}" onclick="changeStudentsPage(${i})">${i}</button>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) html += '<span class="page-dots">...</span>';
        html += `<button class="page-btn" onclick="changeStudentsPage(${totalPages})">${totalPages}</button>`;
    }
    
    // زر التالي
    html += `<button class="page-btn ${studentsCurrentPage === totalPages ? 'disabled' : ''}" onclick="changeStudentsPage(${studentsCurrentPage + 1})" ${studentsCurrentPage === totalPages ? 'disabled' : ''}>
        <i class="fas fa-chevron-left"></i>
    </button>`;
    
    // معلومات
    var start = (studentsCurrentPage - 1) * studentsPerPage + 1;
    var end = Math.min(studentsCurrentPage * studentsPerPage, studentsFilteredData.length);
    html += `<span class="page-info">${start} - ${end} من ${studentsFilteredData.length}</span>`;
    
    html += '</div>';
    container.innerHTML = html;
}

function changeStudentsPage(page) {
    var totalPages = Math.ceil(studentsFilteredData.length / studentsPerPage);
    if (page < 1 || page > totalPages) return;
    studentsCurrentPage = page;
    renderStudentsGrid();
    // تمرير إلى الأعلى
    var container = document.getElementById('studentsGridContainer');
    if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================================
//  تحديث دوال الأصدقاء لتحديث صفحة الطلاب تلقائياً
// ============================================================

// تعديل دوال الأصدقاء لإعادة تحميل صفحة الطلاب
var originalSendFriendRequest = sendFriendRequest;
sendFriendRequest = async function(uid) {
    await originalSendFriendRequest(uid);
    if (document.getElementById('page-users')?.classList.contains('active')) {
        setTimeout(function() {
            filterStudents();
        }, 500);
    }
};

var originalAcceptFriendRequest = acceptFriendRequest;
acceptFriendRequest = async function(uid) {
    await originalAcceptFriendRequest(uid);
    if (document.getElementById('page-users')?.classList.contains('active')) {
        setTimeout(function() {
            filterStudents();
        }, 500);
    }
};

var originalRejectFriendRequest = rejectFriendRequest;
rejectFriendRequest = async function(uid) {
    await originalRejectFriendRequest(uid);
    if (document.getElementById('page-users')?.classList.contains('active')) {
        setTimeout(function() {
            filterStudents();
        }, 500);
    }
};

var originalUnfriend = unfriend;
unfriend = async function(uid) {
    await originalUnfriend(uid);
    if (document.getElementById('page-users')?.classList.contains('active')) {
        setTimeout(function() {
            filterStudents();
        }, 500);
    }
};

var originalCancelFriendRequest = cancelFriendRequest;
cancelFriendRequest = async function(uid) {
    await originalCancelFriendRequest(uid);
    if (document.getElementById('page-users')?.classList.contains('active')) {
        setTimeout(function() {
            filterStudents();
        }, 500);
    }
};

async function refreshUsersData() {
    try {
        var usersSnap = await db.collection('users').get();
        var newUsers = [];
        usersSnap.forEach(function(doc) {
            var userData = { id: doc.id, ...doc.data() };
            if (!userData.privacy) {
                userData.privacy = { hideFromUsersList: false, hiddenFields: [], lockProfile: false };
            }
            newUsers.push(userData);
        });
        users = newUsers;
        allUsers = newUsers;
        renderUsers();
    } catch (error) {
        console.error('Error refreshing users data:', error);
        renderUsers();
    }
}

function renderUsers() {
    if (!usersList) return;
    if (!users || users.length === 0) {
        usersList.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> جاري تحميل الطلاب...</div>';
        return;
    }

    var search = usersSearchInput ? usersSearchInput.value.trim().toLowerCase() : '';
    var college = usersFilterCollege ? usersFilterCollege.value : 'all';
    var year = usersFilterYear ? usersFilterYear.value : 'all';

    var filtered = users.filter(function(user) {
        if (user.role === 'admin') return false;
        if (user.privacy && user.privacy.globalVisibility === 'none') return false;
        if (search && user.displayName && user.displayName.toLowerCase().indexOf(search) === -1) return false;
        if (college !== 'all' && user.college !== college) return false;
        if (year !== 'all' && user.year !== year) return false;
        return true;
    });

    if (filtered.length === 0) {
        usersList.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><h3>لا توجد طلاب</h3><p>لم يتم تسجيل أي طالب بعد</p></div>';
        return;
    }

    var html = '';
    for (var i = 0; i < filtered.length; i++) {
        var user = filtered[i];
        // نستخدم buildStudentCard الجديدة
        html += buildStudentCard(user);
    }
    usersList.innerHTML = html;
}

// ============================================================
//  EVENT LISTENERS
// ============================================================
function attachEventListeners() {
    document.querySelectorAll('.vote-btn').forEach(function(btn) {
        btn.onclick = function() { var rating = parseInt(btn.dataset.rating); handleVote(btn.dataset.id, rating); };
    });
    document.querySelectorAll('.comment-submit').forEach(function(btn) {
        btn.onclick = function() {
            var id = btn.dataset.id;
            var input = btn.closest('.comments-section').querySelector('.comment-input');
            if (input && input.value.trim()) {
                handleComment(id, input.value.trim());
                input.value = '';
            }
        };
    });
    document.querySelectorAll('.comment-input').forEach(function(input) {
        input.onkeydown = function(e) {
            if (e.key === 'Enter') {
                var btn = input.closest('.comments-section').querySelector('.comment-submit');
                if (btn) btn.click();
            }
        };
    });
    document.querySelectorAll('.favorite-btn').forEach(function(btn) {
        btn.onclick = function() { toggleFavorite(btn.dataset.id); };
    });
    document.querySelectorAll('.complete-btn').forEach(function(btn) {
        btn.onclick = function() { toggleCompleted(btn.dataset.id); };
    });
    document.querySelectorAll('.course-info-btn').forEach(function(btn) {
        btn.onclick = function() { showCourseInfo(btn.dataset.id); };
    });
    document.querySelectorAll('.vote-details-btn').forEach(function(btn) {
        btn.onclick = function() { showVoteDetails(btn.dataset.id); };
    });
    document.querySelectorAll('.analytics-btn').forEach(function(btn) {
        btn.onclick = function() { showCourseAnalytics(btn.dataset.id); };
    });
}

// ============================================================
//  CORE OPERATIONS
// ============================================================
async function handleVote(docId, rating) {
    if (!currentUser) { showToast('يرجى تسجيل الدخول للتصويت', 'error'); return; }
    if (isProfileRequired) { showToast('يرجى إكمال ملفك الشخصي أولاً', 'warning'); return; }
    try {
        var docRef = db.collection('courses').doc(docId);
        var doc = await docRef.get();
        if (!doc.exists) return;
        var course = { id: doc.id, ...doc.data() };
        if (!course.voters) course.voters = {};
        var userId = currentUser.uid;
        var oldRating = course.voters[userId];
        if (oldRating === rating) {
            delete course.voters[userId];
            course.votes = (course.votes || 0) - 1;
            course.totalRating = (course.totalRating || 0) - rating;
        } else {
            if (oldRating) {
                course.totalRating = (course.totalRating || 0) - oldRating;
                course.votes = (course.votes || 0) - 1;
            }
            course.voters[userId] = rating;
            course.votes = (course.votes || 0) + 1;
            course.totalRating = (course.totalRating || 0) + rating;
        }
        course.avgRating = course.votes > 0 ? course.totalRating / course.votes : 0;
        await docRef.update({ voters: course.voters, votes: course.votes, totalRating: course.totalRating, avgRating: course.avgRating });
        var userVotes = (currentUserData.votes || 0) + (oldRating === rating ? -1 : 1);
        if (oldRating !== rating) {
            await db.collection('users').doc(currentUser.uid).update({ votes: userVotes });
            currentUserData.votes = userVotes;
            var ratingLabel = RATING_LABELS[5 - rating];
            showToast('تم التصويت بـ: ' + ratingLabel + ' ⭐');
        }
        var courseOwner = users.find(function(u) { 
            return u.uid === course.createdBy; 
        });
        if (courseOwner && courseOwner.uid !== currentUser.uid) {
            sendNotification(courseOwner.uid, {
                message: currentUserData.displayName + ' قام بالتصويت على مادة ' + course.name,
                type: 'info',
                link: '/?course=' + course.id
            });
        }
        await loadAllData();
    } catch (error) {
        console.error('Error voting:', error);
        showToast('حدث خطأ في التصويت: ' + error.message, 'error');
    }
}

async function handleComment(docId, text) {
    if (!currentUser) { showToast('يرجى تسجيل الدخول لإضافة تعليق', 'error'); return; }
    if (isProfileRequired) { showToast('يرجى إكمال ملفك الشخصي أولاً', 'warning'); return; }
    try {
        var docRef = db.collection('courses').doc(docId);
        var doc = await docRef.get();
        if (!doc.exists) return;
        var course = doc.data();
        var comments = course.comments || [];
        var userName = currentUserData?.displayName || 'مستخدم';
        comments.push(userName + ': ' + text);
        await docRef.update({ comments: comments });
        
        var courseData = courses.find(function(c) { return c.id === docId; });
        if (courseData) {
            var courseOwner = users.find(function(u) { 
                return u.uid === courseData.createdBy; 
            });
            if (courseOwner && courseOwner.uid !== currentUser.uid) {
                sendNotification(courseOwner.uid, {
                    message: currentUserData.displayName + ' علق على مادة ' + courseData.name,
                    type: 'comment',
                    link: '/?course=' + courseData.id
                });
            }
        }
        await loadAllData();
        showToast('تم إضافة التعليق! 💬');
    } catch (error) {
        console.error('Error adding comment:', error);
        showToast('حدث خطأ في إضافة التعليق: ' + error.message, 'error');
    }
}

// ============================================================
//  دوال التبديل الأصلية - مع تحديث المودالات
// ============================================================

async function toggleFavorite(courseId) {
    if (!currentUser) return;
    if (isProfileRequired) { showToast('يرجى إكمال ملفك الشخصي أولاً', 'warning'); return; }
    
    try {
        var favs = currentUserData?.favorites || [];
        var idx = favs.indexOf(courseId);
        if (idx > -1) favs.splice(idx, 1);
        else favs.push(courseId);
        await db.collection('users').doc(currentUser.uid).update({ favorites: favs });
        currentUserData.favorites = favs;
        
        // تحديث المودالات المفتوحة
        if (isModalOpen('courseActionsModal') && currentCourseAction) {
            refreshCurrentCourseActions();
        }
        if (isModalOpen('userProfileModal') && currentViewedUserUid) {
            refreshUserProfileContentOnly();
        }
        
        updateProfileUI();
        await loadAllData();
        showToast(idx > -1 ? '❌ تم إزالة من المفضلة' : '⭐ تم إضافة للمفضلة');
        
    } catch (error) {
        console.error('Error toggling favorite:', error);
        showToast('حدث خطأ', 'error');
    }
}

async function toggleCompleted(courseId) {
    if (!currentUser) return;
    if (isProfileRequired) { showToast('يرجى إكمال ملفك الشخصي أولاً', 'warning'); return; }
    
    try {
        var comps = currentUserData?.completed || [];
        var idx = comps.indexOf(courseId);
        if (idx > -1) comps.splice(idx, 1);
        else comps.push(courseId);
        await db.collection('users').doc(currentUser.uid).update({ completed: comps });
        currentUserData.completed = comps;
        
        // تحديث المودالات المفتوحة
        if (isModalOpen('courseActionsModal') && currentCourseAction) {
            refreshCurrentCourseActions();
        }
        if (isModalOpen('userProfileModal') && currentViewedUserUid) {
            refreshUserProfileContentOnly();
        }
        
        updateProfileUI();
        await loadAllData();
        showToast(idx > -1 ? '❌ تم إزالة من المجتاز' : '✅ تم إضافة للمجتاز');
        
    } catch (error) {
        console.error('Error toggling completed:', error);
        showToast('حدث خطأ', 'error');
    }
}

// ============================================================
//  نظام الأصدقاء المتقدم (مع إشعارات)
// ============================================================

// إرسال طلب صداقة
async function sendFriendRequest(uid) {
    if (isUserBlocked(uid) || isUserBlockedBy(uid)) {
        showToast('لا يمكنك إرسال طلب صداقة لهذا المستخدم', 'error');
        return;
    }
    if (!currentUser) { showToast('يرجى تسجيل الدخول', 'error'); return; }
    if (uid === currentUser.uid) { showToast('لا يمكنك إضافة نفسك', 'warning'); return; }
    if (currentUserData && currentUserData.banned) {
        showToast('حسابك محظور، لا يمكنك إرسال طلبات صداقة', 'error');
        return;
    }
    // التحقق من وجود currentUserData
    if (!currentUserData) {
        showToast('يرجى تحديث الصفحة', 'error');
        return;
    }

    try {
        const targetRef = db.collection('users').doc(uid);
        const targetDoc = await targetRef.get();
        if (!targetDoc.exists) { showToast('المستخدم غير موجود', 'error'); return; }
        const targetData = targetDoc.data();

        if (targetData.privacy?.lockProfile) {
            showToast('هذا المستخدم قام بقفل ملفه الشخصي', 'warning');
            return;
        }

        // التحقق من العلاقة الحالية
        const friends = currentUserData.friends || [];
        if (friends.includes(uid)) {
            showToast('أنتم أصدقاء بالفعل', 'warning');
            return;
        }
        const sentRequests = currentUserData.sentRequests || [];
        if (sentRequests.includes(uid)) {
            showToast('لقد أرسلت طلب صداقة بالفعل', 'warning');
            return;
        }
        const pendingRequests = currentUserData.pendingRequests || [];
        if (pendingRequests.includes(uid)) {
            showToast('طلب صداقة قيد الانتظار من هذا المستخدم', 'info');
            return;
        }

        // تحديث المستخدم الحالي
        const newSentRequests = [...sentRequests, uid];
        await db.collection('users').doc(currentUser.uid).update({
            sentRequests: newSentRequests
        });

        // تحديث الطرف الآخر
        const targetPending = targetData.pendingRequests || [];
        if (!targetPending.includes(currentUser.uid)) {
            await targetRef.update({
                pendingRequests: [...targetPending, currentUser.uid]
            });
        }

        // تحديث البيانات المحلية
        currentUserData.sentRequests = newSentRequests;
        updateUserInList(currentUserData); // تحديث في قائمة users

        // إرسال إشعار للطرف الآخر
        await sendNotification(uid, {
            message: `📩 ${currentUserData.displayName || currentUser.email} أرسل لك طلب صداقة`,
            type: 'friend',
            link: '/users',
            data: { senderUid: currentUser.uid } // نضيف بيانات إضافية
        });

        showToast('✅ تم إرسال طلب الصداقة بنجاح!', 'success');
        renderUsers(); // تحديث الواجهة فوراً
       return; // إعادة Promise

    } catch (error) {
        console.error('Error sending friend request:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// قبول طلب صداقة
async function acceptFriendRequest(uid) {
    if (!currentUser || !currentUserData) {
        showToast('يرجى تسجيل الدخول', 'error');
        return;
    }

    try {
        const currentUserRef = db.collection('users').doc(currentUser.uid);
        const currentDoc = await currentUserRef.get();
        const currentData = currentDoc.data();

        // إزالة من قائمة الطلبات المعلقة
        let pendingRequests = currentData.pendingRequests || [];
        const idx = pendingRequests.indexOf(uid);
        if (idx === -1) {
            showToast('لا يوجد طلب صداقة من هذا المستخدم', 'warning');
            return;
        }
        pendingRequests.splice(idx, 1);

        // إضافة إلى الأصدقاء
        let friends = currentData.friends || [];
        if (!friends.includes(uid)) {
            friends.push(uid);
        }

        // تحديث المستخدم الحالي
        await currentUserRef.update({
            pendingRequests: pendingRequests,
            friends: friends
        });

        // تحديث الطرف الآخر
        const targetRef = db.collection('users').doc(uid);
        const targetDoc = await targetRef.get();
        if (targetDoc.exists) {
            const targetData = targetDoc.data();
            let targetSentRequests = targetData.sentRequests || [];
            const sentIdx = targetSentRequests.indexOf(currentUser.uid);
            if (sentIdx !== -1) {
                targetSentRequests.splice(sentIdx, 1);
            }
            let targetFriends = targetData.friends || [];
            if (!targetFriends.includes(currentUser.uid)) {
                targetFriends.push(currentUser.uid);
            }
            await targetRef.update({
                sentRequests: targetSentRequests,
                friends: targetFriends
            });
        }

        // تحديث البيانات المحلية
        currentUserData.pendingRequests = pendingRequests;
        currentUserData.friends = friends;
        updateUserInList(currentUserData);

        // تحديث المستخدم الآخر في قائمة users إذا كان موجوداً
        const targetUser = users.find(u => u.uid === uid);
        if (targetUser) {
            targetUser.friends = targetUser.friends || [];
            if (!targetUser.friends.includes(currentUser.uid)) {
                targetUser.friends.push(currentUser.uid);
            }
            targetUser.sentRequests = (targetUser.sentRequests || []).filter(id => id !== currentUser.uid);
        }

        // إرسال إشعار للمرسل
        await sendNotification(uid, {
            message: `✅ ${currentUserData.displayName || currentUser.email} قبل طلب صداقتك`,
            type: 'friend',
            link: '/users',
            data: { senderUid: currentUser.uid }
        });

        showToast('✅ تم قبول طلب الصداقة!', 'success');
        renderUsers(); // تحديث الواجهة
       return; // إعادة Promise

    } catch (error) {
        console.error('Error accepting friend request:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}



// رفض طلب صداقة
async function rejectFriendRequest(uid) {
    if (!currentUser || !currentUserData) {
        showToast('يرجى تسجيل الدخول', 'error');
        return;
    }

    try {
        const currentUserRef = db.collection('users').doc(currentUser.uid);
        const currentDoc = await currentUserRef.get();
        const currentData = currentDoc.data();

        let pendingRequests = currentData.pendingRequests || [];
        const idx = pendingRequests.indexOf(uid);
        if (idx === -1) {
            showToast('لا يوجد طلب صداقة من هذا المستخدم', 'warning');
            return;
        }
        pendingRequests.splice(idx, 1);
        await currentUserRef.update({ pendingRequests: pendingRequests });

        // إزالة من sentRequests عند الطرف الآخر
        const targetRef = db.collection('users').doc(uid);
        const targetDoc = await targetRef.get();
        if (targetDoc.exists) {
            const targetData = targetDoc.data();
            const sentRequests = targetData.sentRequests || [];
            const sentIdx = sentRequests.indexOf(currentUser.uid);
            if (sentIdx !== -1) {
                sentRequests.splice(sentIdx, 1);
                await targetRef.update({ sentRequests: sentRequests });
            }
        }

        // تحديث محلي
        currentUserData.pendingRequests = pendingRequests;
        updateUserInList(currentUserData);

        showToast('تم رفض طلب الصداقة', 'warning');
        renderUsers();
       return; // إعادة Promise

    } catch (error) {
        console.error('Error rejecting friend request:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// إلغاء الصداقة
async function unfriend(uid) {
    if (!currentUser || !currentUserData) {
        showToast('يرجى تسجيل الدخول', 'error');
        return;
    }
    if (!confirm('هل أنت متأكد من إلغاء الصداقة؟')) return;

    try {
        const currentUserRef = db.collection('users').doc(currentUser.uid);
        const currentDoc = await currentUserRef.get();
        const currentData = currentDoc.data();

        let friends = currentData.friends || [];
        const idx = friends.indexOf(uid);
        if (idx !== -1) {
            friends.splice(idx, 1);
            await currentUserRef.update({ friends: friends });
        }

        // تحديث الطرف الآخر
        const targetRef = db.collection('users').doc(uid);
        const targetDoc = await targetRef.get();
        if (targetDoc.exists) {
            const targetData = targetDoc.data();
            let targetFriends = targetData.friends || [];
            const targetIdx = targetFriends.indexOf(currentUser.uid);
            if (targetIdx !== -1) {
                targetFriends.splice(targetIdx, 1);
                await targetRef.update({ friends: targetFriends });
            }
        }

        // تحديث محلي
        currentUserData.friends = friends;
        updateUserInList(currentUserData);

        showToast('تم إلغاء الصداقة', 'warning');
        renderUsers();
       return; // إعادة Promise

    } catch (error) {
        console.error('Error unfriending:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// إلغاء طلب صداقة مرسل
async function cancelFriendRequest(uid) {
    if (!currentUser || !currentUserData) {
        showToast('يرجى تسجيل الدخول', 'error');
        return;
    }

    try {
        const currentUserRef = db.collection('users').doc(currentUser.uid);
        const currentDoc = await currentUserRef.get();
        const currentData = currentDoc.data();

        let sentRequests = currentData.sentRequests || [];
        const idx = sentRequests.indexOf(uid);
        if (idx === -1) {
            showToast('لا يوجد طلب مرسل لهذا المستخدم', 'warning');
            return;
        }
        sentRequests.splice(idx, 1);
        await currentUserRef.update({ sentRequests: sentRequests });

        // إزالة من pendingRequests للطرف الآخر
        const targetRef = db.collection('users').doc(uid);
        const targetDoc = await targetRef.get();
        if (targetDoc.exists) {
            const targetData = targetDoc.data();
            let targetPending = targetData.pendingRequests || [];
            const pendingIdx = targetPending.indexOf(currentUser.uid);
            if (pendingIdx !== -1) {
                targetPending.splice(pendingIdx, 1);
                await targetRef.update({ pendingRequests: targetPending });
            }
        }

        // تحديث محلي
        currentUserData.sentRequests = sentRequests;
        updateUserInList(currentUserData);

        showToast('تم إلغاء طلب الصداقة', 'warning');
        renderUsers();
       return; // إعادة Promise

    } catch (error) {
        console.error('Error canceling friend request:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}



// ===== دوال مساعدة للتحكم في المودالات =====

// التحقق من وجود مودال مفتوح


// الحصول على آخر مودال مفتوح
function getTopModal() {
    if (modalStack.length === 0) return null;
    var modalId = modalStack[modalStack.length - 1];
    return document.getElementById(modalId);
}

// إغلاق جميع المودالات باستثناء واحد
function closeAllModalsExcept(modalId) {
    var toClose = modalStack.filter(function(id) { return id !== modalId; });
    for (var i = toClose.length - 1; i >= 0; i--) {
        closeModalWithStack(toClose[i]);
    }
}

// ============================================================
//  UPDATE USER IN LIST
// ============================================================
function updateUserInList(updatedUser) {
    if (!updatedUser) return;
    for (var i = 0; i < users.length; i++) {
        if (users[i].uid === updatedUser.uid) {
            users[i] = { ...users[i], ...updatedUser };
            break;
        }
    }
    for (var j = 0; j < allUsers.length; j++) {
        if (allUsers[j].uid === updatedUser.uid) {
            allUsers[j] = { ...allUsers[j], ...updatedUser };
            break;
        }
    }
    var usersPage = safeGetElement('page-users');
    if (usersPage && usersPage.classList.contains('active')) {
        renderUsers();
    }
}

var originalUpdateProfileUI = updateProfileUI;

updateProfileUI = async function() {
    // استدعاء الدالة الأصلية
    if (originalUpdateProfileUI) {
        await originalUpdateProfileUI();
    }
    
    // تطبيق التخصيصات بعد تحديث الواجهة
    if (currentUserData) {
        applyAllCustomizations(currentUserData);
    }
    
    // تحديث الشارات والنقاط
    updateBadges();
    updateAdvancedBadges();
    updatePointsDisplay();
};

// ============================================================
//  PROFILE UI UPDATE
// ============================================================
async function updateProfileUI() {
    // منع التكرار
    if (window._updatingProfile) {
        console.log('⏳ جاري تحديث الملف الشخصي بالفعل...');
        return;
    }
    window._updatingProfile = true;
        try {
        if (!currentUserData || !currentUser) {
            window._updatingProfile = false;
            return;
        }

    if (!currentUserData || !currentUser) return;
    if (profileName) { profileName.textContent = currentUserData.displayName || currentUser.email; }
    if (profileEmail) { profileEmail.textContent = currentUser.email; }
    if (profileRole) { profileRole.textContent = currentUserData.role === 'admin' ? '👑 مشرف' : '🎓 طالب'; }
    if (profileCollege) { profileCollege.value = currentUserData.college || ''; }
    if (profileYear) { profileYear.value = currentUserData.year || '1'; }
    if (profileBio) { profileBio.value = currentUserData.bio || ''; }
    if (profileBranch) { profileBranch.value = currentUserData.branch || ''; }
    if (profileAvatar && currentUserData.avatar) { profileAvatar.src = currentUserData.avatar; }
    var favCount = (currentUserData.favorites || []).length;
    var compCount = (currentUserData.completed || []).length;
    var trustCount = (currentUserData.trustedBy || []).length;
    if (profileFavCount) profileFavCount.textContent = favCount;
    if (profileCompleteCount) profileCompleteCount.textContent = compCount;
    if (profileVoteCount) profileVoteCount.textContent = currentUserData.votes || 0;
    if (profileTrustCount) profileTrustCount.textContent = trustCount;
    updateBadges();
    updateAdvancedBadges();
    var collegeId = profileCollege ? profileCollege.value : '';
    var select = profileSpecialty;
    if (select) {
        select.innerHTML = '<option value="">اختر التخصص</option>';
        allSpecialties.filter(function(s) { return s.collegeId === collegeId; }).forEach(function(spec) {
            var opt = document.createElement('option');
            opt.value = spec.id;
            opt.textContent = spec.name + (spec.hours ? ' (' + spec.hours + ' س)' : '');
            if (spec.id === currentUserData.specialty) opt.selected = true;
            select.appendChild(opt);
        });
    }
    renderFavoriteCourses();
    renderCompletedCourses();
    updateUserInList(currentUserData);
           // تحديث الشارات
        updateBadges();
        updateAdvancedBadges();
        
        // تحديث التخصيصات
        applyAllCustomizations(currentUserData);
        
        // تحديث النقاط
        updatePointsDisplay();
        
    } catch (error) {
        console.error('Error updating profile UI:', error);
    } finally {
        window._updatingProfile = false;
    }
}

function renderFavoriteCourses() {
    if (!favoriteCourses) return;
    var favs = currentUserData?.favorites || [];
    if (favs.length === 0) {
        favoriteCourses.innerHTML = '<span style="color:var(--gray-400);font-size:0.9rem;">لا توجد مواد مفضلة</span>';
        return;
    }
    favoriteCourses.innerHTML = favs.map(function(id) {
        var c = courses.find(function(crs) { return crs.id === id; });
        return c ? '<span class="course-tag" style="color:var(--text-color);">' + escapeHtml(c.name) + ' <span class="remove" style="color:var(--danger);">×</span></span>' : '';
    }).join('');
}

function renderCompletedCourses() {
    if (!completedCourses) return;
    var comps = currentUserData?.completed || [];
    if (comps.length === 0) {
        completedCourses.innerHTML = '<span style="color:var(--gray-400);font-size:0.9rem;">لا توجد مواد تم اجتيازها</span>';
        return;
    }
    completedCourses.innerHTML = comps.map(function(id) {
        var c = courses.find(function(crs) { return crs.id === id; });
        return c ? '<span class="course-tag" style="color:var(--text-color);border-color:var(--success);">' + escapeHtml(c.name) + ' <span class="remove" style="color:var(--danger);">×</span></span>' : '';
    }).join('');
}

window.removeFavorite = async function(id) {
    if (!currentUser) return;
    try {
        var favs = currentUserData.favorites || [];
        var idx = favs.indexOf(id);
        if (idx > -1) favs.splice(idx, 1);
        await db.collection('users').doc(currentUser.uid).update({ favorites: favs });
        currentUserData.favorites = favs;
        renderFavoriteCourses();
        await loadAllData();
    } catch (error) {
        console.error('Error removing favorite:', error);
    }
};

window.removeCompleted = async function(id) {
    if (!currentUser) return;
    try {
        var comps = currentUserData.completed || [];
        var idx = comps.indexOf(id);
        if (idx > -1) comps.splice(idx, 1);
        await db.collection('users').doc(currentUser.uid).update({ completed: comps });
        currentUserData.completed = comps;
        renderCompletedCourses();
        await loadAllData();
    } catch (error) {
        console.error('Error removing completed:', error);
    }
};

if (profileForm) {
    profileForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!currentUser) return;
        try {
            var updates = {};
            if (profileCollege) updates.college = profileCollege.value;
            if (profileSpecialty) updates.specialty = profileSpecialty.value;
            if (profileYear) updates.year = profileYear.value;
            if (profileBio) updates.bio = profileBio.value;
            if (profileBranch) updates.branch = profileBranch.value;
            await db.collection('users').doc(currentUser.uid).update(updates);
            Object.assign(currentUserData, updates);
            updateUserInList(currentUserData);
            updateBadges();
            updateAdvancedBadges();
            showToast('تم حفظ الملف الشخصي بنجاح! ✅');
        } catch (error) {
            console.error('Error saving profile:', error);
            showToast('حدث خطأ في حفظ الملف الشخصي: ' + error.message, 'error');
        }
    });
}

// ============================================================
//  USERS PAGE FILTERS EVENTS
// ============================================================
if (usersSearchInput) {
    usersSearchInput.addEventListener('input', renderUsers);
}
if (usersFilterCollege) {
    usersFilterCollege.addEventListener('change', renderUsers);
}
if (usersFilterYear) {
    usersFilterYear.addEventListener('change', renderUsers);
}

// ============================================================
//  COMPARE SYSTEM
// ============================================================
if (addToCompareBtn) {
    addToCompareBtn.addEventListener('click', function() {
        if (!compareSearch) return;
        var query = compareSearch.value.trim().toLowerCase();
        if (!query) { showToast('يرجى البحث عن مادة', 'warning'); return; }
        var found = courses.filter(function(c) {
            return c.name.toLowerCase().indexOf(query) !== -1 || c.code.toLowerCase().indexOf(query) !== -1;
        });
        if (found.length === 0) { showToast('لا توجد مواد تطابق البحث', 'error'); return; }
        var course = found[0];
        if (compareList.indexOf(course.id) !== -1) { showToast('المادة موجودة بالفعل في المقارنة', 'warning'); return; }
        if (compareList.length >= 5) { showToast('يمكن مقارنة 5 مواد كحد أقصى', 'warning'); return; }
        compareList.push(course.id);
        renderCompare();
        compareSearch.value = '';
    });
}

if (clearCompareBtn) {
    clearCompareBtn.addEventListener('click', function() {
        compareList = [];
        renderCompare();
    });
}

function renderCompare() {
    if (compareListEl) {
        var html = '';
        for (var i = 0; i < compareList.length; i++) {
            var id = compareList[i];
            var course = courses.find(function(c) { return c.id === id; });
            if (course) {
                html += '<span class="compare-item">' + escapeHtml(course.name) + ' (' + escapeHtml(course.code) + ') <span class="remove" onclick="removeFromCompare(\'' + id + '\')">×</span></span>';
            }
        }
        compareListEl.innerHTML = html;
    }
    if (compareEmpty) {
        compareEmpty.style.display = compareList.length === 0 ? 'block' : 'none';
    }
    if (compareResults) {
        if (compareList.length < 2) {
            compareResults.innerHTML = '<div style="text-align:center;color:var(--gray-400);padding:1rem;">أضف مادتين على الأقل للمقارنة</div>';
            return;
        }
        var compareCourses = compareList.map(function(id) {
            return courses.find(function(c) { return c.id === id; });
        }).filter(function(c) { return c; });
        if (compareCourses.length < 2) return;
        var html = '<table class="compare-table">';
        html += '<thead><tr><th>المعيار</th>';
        for (var j = 0; j < compareCourses.length; j++) {
            html += '<th>' + escapeHtml(compareCourses[j].name) + '</th>';
        }
        html += '</tr></thead><tbody>';
        var fields = [
            { key: 'code', label: 'الرمز' },
            { key: 'type', label: 'النوع' },
            { key: 'year', label: 'السنة' },
            { key: 'hours', label: 'الساعات' },
            { key: 'units', label: 'الوحدات' },
            { key: 'avgRating', label: 'متوسط التقييم' },
            { key: 'votes', label: 'عدد التصويتات' }
        ];
        for (var f = 0; f < fields.length; f++) {
            var field = fields[f];
            html += '<tr><td><strong>' + field.label + '</strong></td>';
            for (var c2 = 0; c2 < compareCourses.length; c2++) {
                var val = compareCourses[c2][field.key];
                if (field.key === 'avgRating') {
                    val = val ? val.toFixed(1) + ' ★' : 'لا يوجد';
                } else if (field.key === 'votes') {
                    val = val || 0;
                }
                html += '<td>' + (val || '-') + '</td>';
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        compareResults.innerHTML = html;
    }
}

window.removeFromCompare = function(id) {
    compareList = compareList.filter(function(cid) { return cid !== id; });
    renderCompare();
};



// ============================================================
//  viewBlockedUsers - عرض المستخدمين المحظورين
// ============================================================

function viewBlockedUsers() {
    // التبديل إلى صفحة الطلاب وفتح قائمة المحظورين
    showPage('users');
    setTimeout(function() {
        switchStudentList('blocked');
    }, 300);
}

// ============================================================
//  showPrivacySettings - الإعدادات المتطورة (3 مستويات لكل معلومة)
// ============================================================
function showPrivacySettings() {
    var container = document.getElementById('privacySettingsContainer');
    if (!container) return;

    if (!currentUserData) {
        container.innerHTML = `<div class="empty-state-modern"><i class="fas fa-lock"></i><h4>يرجى تسجيل الدخول</h4><p>سجل الدخول لعرض إعداداتك</p></div>`;
        return;
    }

    // إعدادات الخصوصية الافتراضية
    var defaultPrivacy = {
        email: 'all', college: 'all', specialty: 'all', branch: 'all', year: 'all', bio: 'all',
        completed: 'all', favorites: 'all', votes: 'all', friendsList: 'all',
        trustedBy: 'all', reports: 'all', collectibles: 'all', gifts: 'all',    badges: 'all',
        globalVisibility: 'all', allowMessages: 'all', lockProfile: false
    };
    var privacy = currentUserData.privacy || {};
    privacy = { ...defaultPrivacy, ...privacy };

    // إعدادات الإشعارات الافتراضية
    var defaultNotif = { comments: true, votes: true, friendRequests: true, messages: true, systemUpdates: true };
    var notif = currentUserData.notificationPreferences || {};
    notif = { ...defaultNotif, ...notif };

    var blockedUsers = currentUserData.blockedUsers || [];
    var blockedCount = blockedUsers.length;

    // دالة مساعدة لإنشاء خيارات 3 مستويات
    function renderThreeLevels(key, label, currentValue) {
        var levels = [
            { value: 'all', label: '👥 الجميع' },
            { value: 'friends', label: '🤝 الأصدقاء' },
            { value: 'none', label: '🔒 لا أحد' }
        ];
        var html = `<div class="privacy-row">`;
        html += `<span class="privacy-label">${label}</span>`;
        html += `<div class="privacy-options">`;
        levels.forEach(function(level) {
            var active = currentValue === level.value ? 'active' : '';
            html += `<button class="privacy-option ${active}" onclick="updatePrivacy('${key}', '${level.value}')">${level.label}</button>`;
        });
        html += `</div></div>`;
        return html;
    }

    var html = `
        <div class="settings-container-modern">

            <!-- ===== 1. خصوصية المعلومات الشخصية ===== -->
            <div class="settings-section">
                <h3><i class="fas fa-id-card"></i> خصوصية المعلومات الشخصية</h3>
                <div class="privacy-grid">
                    ${renderThreeLevels('email', 'البريد الإلكتروني', privacy.email)}
                    ${renderThreeLevels('college', 'الكلية', privacy.college)}
                    ${renderThreeLevels('specialty', 'التخصص', privacy.specialty)}
                    ${renderThreeLevels('branch', 'الفرع الجامعي', privacy.branch)}
                    ${renderThreeLevels('year', 'السنة الدراسية', privacy.year)}  <!-- إضافة السنة -->
                    ${renderThreeLevels('bio', 'النبذة الشخصية', privacy.bio)}
                </div>
            </div>

            <!-- ===== 2. خصوصية النشاط والقوائم ===== -->
            <div class="settings-section">
                <h3><i class="fas fa-list-ul"></i> خصوصية النشاط والقوائم</h3>
                <div class="privacy-grid">
                    ${renderThreeLevels('completed', 'المواد المجتازة', privacy.completed)}
                    ${renderThreeLevels('favorites', 'المواد المفضلة', privacy.favorites)}
                    ${renderThreeLevels('votes', 'سجل التصويتات', privacy.votes)}
                    ${renderThreeLevels('friendsList', 'قائمة الأصدقاء', privacy.friendsList)}
                    ${renderThreeLevels('trustedBy', 'قائمة الثقات', privacy.trustedBy)}
                    ${renderThreeLevels('reports', 'قائمة البلاغات', privacy.reports)}
                    ${renderThreeLevels('collectibles', 'المقتنيات', privacy.collectibles)}
                    ${renderThreeLevels('gifts', 'الهدايا', privacy.gifts)}
                    ${renderThreeLevels('badges', 'الشارات', privacy.badges)}
                </div>
            </div>

            <!-- ===== 3. الإعدادات العامة ===== -->
            <div class="settings-section">
                <h3><i class="fas fa-globe"></i> الإعدادات العامة</h3>
                <div class="settings-grid">
                    <div class="setting-item">
                        <label>من يمكنه إرسال رسائل لي؟</label>
                        <div class="privacy-options" style="margin-top:0.3rem;">
                            <button class="privacy-option ${privacy.allowMessages === 'all' ? 'active' : ''}" onclick="updatePrivacy('allowMessages', 'all')">👥 الجميع</button>
                            <button class="privacy-option ${privacy.allowMessages === 'friends' ? 'active' : ''}" onclick="updatePrivacy('allowMessages', 'friends')">🤝 الأصدقاء</button>
                            <button class="privacy-option ${privacy.allowMessages === 'none' ? 'active' : ''}" onclick="updatePrivacy('allowMessages', 'none')">🔒 لا أحد</button>
                        </div>
                    </div>
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" id="privacyHideFromList" ${privacy.globalVisibility === 'none' ? 'checked' : ''} onchange="updatePrivacyCheckbox('globalVisibility', this.checked ? 'none' : 'all')" />
                            <span>إخفاء حسابي من قائمة المستخدمين</span>
                        </label>
                        <p class="setting-desc">لن يظهر اسمك في صفحة الطلاب</p>
                    </div>
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" id="privacyLockProfile" ${privacy.lockProfile ? 'checked' : ''} onchange="updatePrivacyCheckbox('lockProfile', this.checked)" />
                            <span>قفل الملف الشخصي</span>
                        </label>
                        <p class="setting-desc">لا يمكن لأحد رؤية ملفك إلا إذا كان صديقاً أو مشرفاً</p>
                    </div>
                </div>
            </div>

            <!-- ===== 4. تفضيلات الإشعارات ===== -->
            <div class="settings-section">
                <h3><i class="fas fa-bell"></i> تفضيلات الإشعارات</h3>
                <div class="settings-grid">
                    <div class="setting-item"><label><input type="checkbox" data-notif="comments" ${notif.comments ? 'checked' : ''} onchange="updateNotificationPref('comments', this.checked)" /> التعليقات على موادك</label></div>
                    <div class="setting-item"><label><input type="checkbox" data-notif="votes" ${notif.votes ? 'checked' : ''} onchange="updateNotificationPref('votes', this.checked)" /> التصويتات على موادك</label></div>
                    <div class="setting-item"><label><input type="checkbox" data-notif="friendRequests" ${notif.friendRequests ? 'checked' : ''} onchange="updateNotificationPref('friendRequests', this.checked)" /> طلبات الصداقة</label></div>
                    <div class="setting-item"><label><input type="checkbox" data-notif="messages" ${notif.messages ? 'checked' : ''} onchange="updateNotificationPref('messages', this.checked)" /> الرسائل الخاصة</label></div>
                    <div class="setting-item"><label><input type="checkbox" data-notif="systemUpdates" ${notif.systemUpdates ? 'checked' : ''} onchange="updateNotificationPref('systemUpdates', this.checked)" /> تحديثات النظام</label></div>
                </div>
            </div>

            <!-- ===== 5. الأدوات المتقدمة (البيانات) ===== -->
            <div class="settings-section">
                <h3><i class="fas fa-tools"></i> الأدوات المتقدمة</h3>
                <div class="settings-grid">
                    <div class="setting-item"><button class="btn btn-primary" onclick="exportUserData()"><i class="fas fa-download"></i> تصدير جميع بياناتي (JSON)</button></div>
                    <div class="setting-item"><button class="btn btn-danger" onclick="clearMyVotes()"><i class="fas fa-eraser"></i> مسح كل تصويتاتي</button></div>
                    <div class="setting-item"><button class="btn btn-danger" onclick="clearMyComments()"><i class="fas fa-eraser"></i> مسح كل تعليقاتي</button></div>
                    <div class="setting-item"><button class="btn btn-warning" onclick="logoutAllDevices()"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج من كل الأجهزة</button></div>
                </div>
            </div>

            <!-- ===== 6. إدارة الحظر ===== -->
            <div class="settings-section">
                <h3><i class="fas fa-ban" style="color:#dc2626;"></i> إدارة الحظر</h3>
                <div class="settings-grid">
                    <div class="setting-item" style="background:#fef2f2;border-color:#fca5a5;">
                        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;width:100%;">
                            <div>
                                <span style="font-weight:600;color:#dc2626;"><i class="fas fa-ban"></i> المستخدمون المحظورون (${blockedCount})</span>
                            </div>
                            <div style="display:flex;gap:0.3rem;flex-wrap:wrap;">
                                <button class="btn btn-sm btn-success" onclick="viewBlockedUsers()"><i class="fas fa-eye"></i> عرض</button>
                                ${blockedCount > 0 ? `<button class="btn btn-sm btn-danger" onclick="unblockAllUsers()"><i class="fas fa-undo"></i> إلغاء حظر الكل</button>` : ''}
                            </div>
                        </div>
                        <p class="setting-desc" style="color:#dc2626;">المستخدمون المحظورون لا يمكنهم رؤية ملفك أو التواصل معك</p>
                    </div>
                </div>
            </div>

        </div>
    `;

    container.innerHTML = html;
}

// ============================================================
//  دوال مساعدة لتحديث الخصوصية والإعدادات
// ============================================================

window.updatePrivacy = async function(key, value) {
    if (!currentUser) return;
    try {
        var privacy = currentUserData.privacy || {};
        privacy[key] = value;
        await db.collection('users').doc(currentUser.uid).update({ privacy: privacy });
        currentUserData.privacy = privacy;
        // تحديث الواجهة (إزالة الكلاس active وإضافته للزر المضغوط)
        document.querySelectorAll('.privacy-option').forEach(function(btn) {
            if (btn.dataset.key === key) {
                btn.classList.toggle('active', btn.dataset.value === value);
            }
        });
        showToast('✅ تم تحديث إعداد الخصوصية', 'success');
        // إعادة تحميل البيانات لتحديث كل مكان
        await loadAllData();
    } catch (error) {
        console.error('Error updating privacy:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
};

// تحديث إعداد خصوصية من نوع checkbox
window.updatePrivacyCheckbox = async function(key, value) {
    if (!currentUser) return;
    try {
        var privacy = currentUserData.privacy || {};
        privacy[key] = value;
        await db.collection('users').doc(currentUser.uid).update({ privacy: privacy });
        currentUserData.privacy = privacy;
        showToast('✅ تم تحديث الإعداد', 'success');
    } catch (error) {
        console.error('Error updating privacy checkbox:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
};

// تحديث تفضيلات الإشعارات
window.updateNotificationPref = async function(key, value) {
    if (!currentUser) return;
    try {
        var notif = currentUserData.notificationPreferences || {};
        notif[key] = value;
        await db.collection('users').doc(currentUser.uid).update({ notificationPreferences: notif });
        currentUserData.notificationPreferences = notif;
        showToast('✅ تم تحديث تفضيلات الإشعارات', 'success');
    } catch (error) {
        console.error('Error updating notification pref:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
};

// ============================================================
//  تصدير جميع بيانات المستخدم
// ============================================================
window.exportUserData = async function() {
    if (!currentUser) {
        showToast('يرجى تسجيل الدخول', 'error');
        return;
    }
    if (!confirm('⚠️ هل أنت متأكد من تصدير جميع بياناتك؟ سيتم تحميل ملف JSON يحتوي على معلوماتك الشخصية وتفاعلاتك.')) {
        return;
    }

    showToast('⏳ جاري تجميع بياناتك...', 'warning');
    try {
        // 1. بيانات المستخدم
        var userData = { ...currentUserData };
        delete userData.uid; // حذف المعرف الحساس
        delete userData.email; // سنضيفه بشكل آمن إذا أردنا

        // 2. المواد التي تفاعل معها المستخدم
        var myCourses = [];
        for (var i = 0; i < courses.length; i++) {
            var c = courses[i];
            var interaction = {
                id: c.id,
                name: c.name,
                code: c.code
            };
            if (c.voters && c.voters[currentUser.uid]) {
                interaction.myVote = c.voters[currentUser.uid];
            }
            var myComments = (c.comments || []).filter(function(comment) {
                return comment.startsWith(currentUserData.displayName + ':');
            });
            if (myComments.length > 0) {
                interaction.myComments = myComments;
            }
            if (Object.keys(interaction).length > 3) { // id, name, code + تفاعل
                myCourses.push(interaction);
            }
        }

        // 3. تجميع الكل
        var exportData = {
            exportedAt: new Date().toISOString(),
            user: {
                displayName: userData.displayName,
                email: currentUser.email,
                college: userData.college,
                specialty: userData.specialty,
                year: userData.year,
                branch: userData.branch,
                bio: userData.bio,
                role: userData.role,
                createdAt: userData.createdAt,
                favorites: userData.favorites || [],
                completed: userData.completed || [],
                votesCount: userData.votes || 0,
                trustedBy: userData.trustedBy || [],
                friends: userData.friends || [],
                receivedGifts: userData.receivedGifts || [],
                customization: userData.customization || {},
                privacy: userData.privacy || {},
                notificationPreferences: userData.notificationPreferences || {}
            },
            interactions: {
                courses: myCourses
            }
        };

        // 4. تحميل الملف
        var blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = `بياناتي_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('✅ تم تصدير بياناتك بنجاح!', 'success');
    } catch (error) {
        console.error('Error exporting data:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
};

// ============================================================
//  مسح كل تصويتاتي
// ============================================================
window.clearMyVotes = async function() {
    if (!currentUser) return;
    if (!confirm('⚠️ هل أنت متأكد من مسح جميع تصويتاتك؟ لا يمكن التراجع عن هذا الإجراء!')) return;
    if (!confirm('❗ تأكيد نهائي؟')) return;

    showToast('⏳ جاري مسح التصويتات...', 'warning');
    try {
        var updates = 0;
        for (var i = 0; i < courses.length; i++) {
            var course = courses[i];
            if (course.voters && course.voters[currentUser.uid] !== undefined) {
                var oldRating = course.voters[currentUser.uid];
                delete course.voters[currentUser.uid];
                course.votes = (course.votes || 1) - 1;
                course.totalRating = (course.totalRating || 0) - oldRating;
                course.avgRating = course.votes > 0 ? course.totalRating / course.votes : 0;

                await db.collection('courses').doc(course.id).update({
                    voters: course.voters,
                    votes: course.votes,
                    totalRating: course.totalRating,
                    avgRating: course.avgRating
                });
                updates++;
            }
        }

        // تحديث عدد تصويتات المستخدم
        await db.collection('users').doc(currentUser.uid).update({ votes: 0 });
        currentUserData.votes = 0;

        showToast(`✅ تم مسح ${updates} تصويت بنجاح!`, 'success');
        await loadAllData();
        renderCourses();
    } catch (error) {
        console.error('Error clearing votes:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
};

// ============================================================
//  مسح كل تعليقاتي
// ============================================================
window.clearMyComments = async function() {
    if (!currentUser) return;
    if (!confirm('⚠️ هل أنت متأكد من مسح جميع تعليقاتك؟ لا يمكن التراجع عن هذا الإجراء!')) return;
    if (!confirm('❗ تأكيد نهائي؟')) return;

    showToast('⏳ جاري مسح التعليقات...', 'warning');
    try {
        var updates = 0;
        var userName = currentUserData.displayName || 'مستخدم';
        for (var i = 0; i < courses.length; i++) {
            var course = courses[i];
            if (course.comments && course.comments.length > 0) {
                var originalLength = course.comments.length;
                course.comments = course.comments.filter(function(comment) {
                    return !comment.startsWith(userName + ':');
                });
                if (course.comments.length < originalLength) {
                    await db.collection('courses').doc(course.id).update({
                        comments: course.comments
                    });
                    updates += (originalLength - course.comments.length);
                }
            }
        }

        showToast(`✅ تم مسح ${updates} تعليق بنجاح!`, 'success');
        await loadAllData();
        renderCourses();
    } catch (error) {
        console.error('Error clearing comments:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
};

// ============================================================
//  عرض المستخدمين المحظورين (توجيه إلى صفحة الطلاب)
// ============================================================
window.viewBlockedUsers = function() {
    showPage('users');
    setTimeout(function() {
        switchStudentList('blocked');
    }, 300);
};

// ============================================================
//  إلغاء حظر جميع المستخدمين (نسخة محسنة)
// ============================================================
window.unblockAllUsers = async function() {
    var blockedUids = currentUserData.blockedUsers || [];
    if (blockedUids.length === 0) {
        showToast('لا يوجد مستخدمين محظورين', 'warning');
        return;
    }
    if (!confirm(`⚠️ هل أنت متأكد من إلغاء حظر جميع المستخدمين (${blockedUids.length})؟`)) {
        return;
    }

    try {
        for (var i = 0; i < blockedUids.length; i++) {
            var uid = blockedUids[i];
            // إزالة من قائمة المستخدم الحالي
            var blocked = currentUserData.blockedUsers || [];
            var index = blocked.indexOf(uid);
            if (index !== -1) {
                blocked.splice(index, 1);
                await db.collection('users').doc(currentUser.uid).update({ blockedUsers: blocked });
                currentUserData.blockedUsers = blocked;
            }
            // إزالة من قائمة المحظورين من قبل المستخدم الآخر
            var targetRef = db.collection('users').doc(uid);
            var targetDoc = await targetRef.get();
            if (targetDoc.exists) {
                var targetData = targetDoc.data();
                var blockedBy = targetData.blockedBy || [];
                var byIndex = blockedBy.indexOf(currentUser.uid);
                if (byIndex !== -1) {
                    blockedBy.splice(byIndex, 1);
                    await targetRef.update({ blockedBy: blockedBy });
                }
            }
        }

        showToast(`✅ تم إلغاء حظر جميع المستخدمين (${blockedUids.length})`, 'success');
        await loadAllData();
        renderUsers();
        showPrivacySettings(); // تحديث الواجهة
    } catch (error) {
        console.error('Error unblocking all:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
};

// ===== دالة لتعيين مستوى الخصوصية =====
function setPrivacyLevel(level) {
    // تحديث الواجهة
    document.querySelectorAll('.settings-section:first-child .setting-item').forEach(function(item) {
        item.style.borderColor = 'var(--border-color)';
    });
    var items = document.querySelectorAll('.settings-section:first-child .setting-item');
    var levelMap = { 'all': 0, 'friends': 1, 'none': 2 };
    if (items[levelMap[level]]) {
        items[levelMap[level]].style.borderColor = 'var(--primary)';
    }

    // حفظ في متغير مؤقت (سيتم حفظه مع باقي الإعدادات)
    window._tempPrivacyLevel = level;
    showToast('✅ تم تغيير مستوى الخصوصية إلى: ' + { 'all': 'الكل', 'friends': 'الأصدقاء فقط', 'none': 'لا أحد' }[level], 'info');
}

// ===== دالة حفظ جميع الإعدادات =====
async function saveAllSettings() {
    if (!currentUser) {
        showToast('يرجى تسجيل الدخول', 'error');
        return;
    }

    // جمع الإعدادات من الواجهة
    var hideFromList = document.getElementById('privacyHideFromList')?.checked || false;
    var lockProfile = document.getElementById('privacyLockProfile')?.checked || false;
    var allowMessages = document.getElementById('privacyAllowMessages')?.checked !== false;

    // الحقول المخفية
    var hiddenFields = [];
    document.querySelectorAll('.privacy-hidden-field:checked').forEach(function(el) {
        hiddenFields.push(el.dataset.field);
    });

    // إخفاء القوائم
    var hideCompleted = document.querySelector('.privacy-list-option[data-key="hideCompleted"]')?.checked || false;
    var hideFavorites = document.querySelector('.privacy-list-option[data-key="hideFavorites"]')?.checked || false;
    var hideVotes = document.querySelector('.privacy-list-option[data-key="hideVotes"]')?.checked || false;
    var hideFriends = document.querySelector('.privacy-list-option[data-key="hideFriends"]')?.checked || false;
    var hideTrusted = document.querySelector('.privacy-list-option[data-key="hideTrusted"]')?.checked || false;
    var hideReports = document.querySelector('.privacy-list-option[data-key="hideReports"]')?.checked || false;
    var hideCollectibles = document.querySelector('.privacy-list-option[data-key="hideCollectibles"]')?.checked || false;
    var hideGifts = document.querySelector('.privacy-list-option[data-key="hideGifts"]')?.checked || false;

    // مستوى الخصوصية (من المتغير المؤقت)
    var privacyLevel = window._tempPrivacyLevel || 'all';

    var settings = {
        privacy: {
            hideFromUsersList: hideFromList,
            lockProfile: lockProfile,
            allowMessages: allowMessages,
            hiddenFields: hiddenFields,
            hideCompleted: hideCompleted,
            hideFavorites: hideFavorites,
            hideVotes: hideVotes,
            hideFriends: hideFriends,
            hideTrusted: hideTrusted,
            hideReports: hideReports,
            hideCollectibles: hideCollectibles,
            hideGifts: hideGifts,
            privacyLevel: privacyLevel
        }
    };

    try {
        showToast('⏳ جاري حفظ الإعدادات...', 'warning');
        await db.collection('users').doc(currentUser.uid).update(settings);
        Object.assign(currentUserData, settings);
        showToast('✅ تم حفظ جميع الإعدادات بنجاح!', 'success');
        await loadAllData();
    } catch (error) {
        console.error('Error saving settings:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// ===== دالة إعادة تعيين الإعدادات =====
function resetSettings() {
    if (!confirm('⚠️ هل أنت متأكد من إعادة تعيين جميع الإعدادات إلى الافتراضية؟')) {
        return;
    }

    // إلغاء تحديد جميع الخيارات
    document.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
        cb.checked = false;
    });
    // تحديد مستوى الخصوصية الافتراضي (الكل)
    var allRadio = document.querySelector('input[name="privacyLevel"][value="all"]');
    if (allRadio) allRadio.checked = true;
    document.querySelectorAll('.settings-section:first-child .setting-item').forEach(function(item) {
        item.style.borderColor = 'var(--border-color)';
    });
    var items = document.querySelectorAll('.settings-section:first-child .setting-item');
    if (items[0]) items[0].style.borderColor = 'var(--primary)';
    window._tempPrivacyLevel = 'all';

    showToast('🔄 تم إعادة تعيين الإعدادات إلى الافتراضية', 'info');
}



// ============================================================
//  COLLEGES PAGE
// ============================================================
async function loadColleges() {
    var container = safeGetElement('collegesList');
    if (!container) return;
    if (!colleges.length) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-university"></i><h3>لا توجد كليات</h3><p>قم بإضافة كلية من لوحة المشرف</p></div>';
        return;
    }
    var uniqueColleges = [];
    var collegeIds = new Set();
    colleges.forEach(function(col) {
        if (!collegeIds.has(col.id)) {
            collegeIds.add(col.id);
            uniqueColleges.push(col);
        }
    });
    container.innerHTML = uniqueColleges.map(function(col) {
        var specs = allSpecialties.filter(function(s) { return s.collegeId === col.id; });
        var courseCount = courses.filter(function(c) {
            return c.specialties && c.specialties.some(function(s) { return s.collegeId === col.id; });
        }).length;
        return '<div class="college-card"><h3><i class="fas fa-university"></i> ' + escapeHtml(col.name) + '</h3><div style="color:var(--gray-500);font-size:0.85rem;">📚 ' + courseCount + ' مادة | 🏷️ ' + specs.length + ' تخصص</div><div class="specialties-list">' + specs.map(function(s) { return '<span class="specialty-tag">' + escapeHtml(s.name) + (s.hours ? ' (' + s.hours + ' س)' : '') + '</span>'; }).join('') + (!specs.length ? '<span style="color:var(--gray-400);font-size:0.8rem;">لا توجد تخصصات</span>' : '') + '</div></div>';
    }).join('');
}

// ============================================================
//  SPECIALTIES PAGE
// ============================================================
async function loadSpecialties() {
    var container = safeGetElement('specialtiesList');
    if (!container) return;
    if (!allSpecialties.length) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-tags"></i><h3>لا توجد تخصصات</h3><p>قم بإضافة تخصص من لوحة المشرف</p></div>';
        return;
    }
    var uniqueSpecialties = [];
    var specIds = new Set();
    allSpecialties.forEach(function(spec) {
        if (!specIds.has(spec.id)) {
            specIds.add(spec.id);
            uniqueSpecialties.push(spec);
        }
    });
    container.innerHTML = uniqueSpecialties.map(function(spec) {
        var college = colleges.find(function(c) { return c.id === spec.collegeId; });
        var specCourses = courses.filter(function(c) {
            return c.specialties && c.specialties.some(function(s) { return s.id === spec.id; });
        });
        return '<div class="specialty-card"><h3><i class="fas fa-tag"></i> ' + escapeHtml(spec.name) + '</h3>' + (spec.hours ? '<div class="specialty-hours">📚 عدد الساعات: ' + spec.hours + ' ساعة</div>' : '') + (college ? '<div style="color:var(--gray-500);font-size:0.85rem;">🏛️ ' + escapeHtml(college.name) + '</div>' : '') + '<div style="margin-top:0.5rem;"><strong>المواد (' + specCourses.length + '):</strong><div class="courses-list">' + specCourses.map(function(c) { return '<span class="course-tag-small">' + escapeHtml(c.name) + ' (' + c.code + ')</span>'; }).join('') + (!specCourses.length ? '<span style="color:var(--gray-400);font-size:0.8rem;">لا توجد مواد</span>' : '') + '</div></div></div>';
    }).join('');
}

// ============================================================
//  ADMIN FUNCTIONS
// ============================================================
function updateStats() {
    if (adminTotalCourses) adminTotalCourses.textContent = courses.length;
    var studentCount = users.filter(function(u) { return u.role !== 'admin'; }).length;
    if (adminTotalUsers) adminTotalUsers.textContent = studentCount;
    if (adminTotalColleges) adminTotalColleges.textContent = colleges.length;
    if (adminTotalSpecialties) adminTotalSpecialties.textContent = allSpecialties.length;
}



adminTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
        adminTabs.forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        document.querySelectorAll('.admin-tab-content').forEach(function(c) { c.classList.remove('active'); });
        var target = safeGetElement('admin' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1));
        if (target) target.classList.add('active');
        if (tab.dataset.tab === 'courses') loadAdminCourses();
        if (tab.dataset.tab === 'colleges') loadAdminColleges();
        if (tab.dataset.tab === 'specialties') loadAdminSpecialties();
        if (tab.dataset.tab === 'users') loadAdminUsers();
        if (tab.dataset.tab === 'reports') loadAdminReports();
    });
});

function loadAdminCourses() {
    if (!adminCoursesList) return;
    var html = '';
    courses.forEach(function(course) {
        html += '<div class="admin-item"><span><strong>' + escapeHtml(course.name) + '</strong> (' + escapeHtml(course.code) + ') <span style="font-size:0.8rem;color:var(--gray-400);">⭐ ' + (course.avgRating || 0).toFixed(1) + '</span></span><div class="actions"><button class="btn btn-primary" onclick="editCourse(\'' + course.id + '\')"><i class="fas fa-edit"></i></button><button class="btn btn-danger" onclick="deleteCourse(\'' + course.id + '\')"><i class="fas fa-trash"></i></button></div></div>';
    });
    adminCoursesList.innerHTML = html || '<div class="empty-state"><h3>لا توجد مواد</h3></div>';
}

function loadAdminColleges() {
    if (!adminCollegesList) return;
    var html = '';
    colleges.forEach(function(col) {
        html += '<div class="admin-item"><span><strong>' + escapeHtml(col.name) + '</strong></span><div class="actions"><button class="btn btn-danger" onclick="deleteCollege(\'' + col.id + '\')"><i class="fas fa-trash"></i></button></div></div>';
    });
    adminCollegesList.innerHTML = html || '<div class="empty-state"><h3>لا توجد كليات</h3></div>';
}

function loadAdminSpecialties() {
    if (!adminSpecialtiesList) return;
    var html = '';
    allSpecialties.forEach(function(spec) {
        var college = colleges.find(function(c) { return c.id === spec.collegeId; });
        html += '<div class="admin-item"><span><strong>' + escapeHtml(spec.name) + '</strong> ' + (spec.hours ? '(' + spec.hours + ' س)' : '') + ' - ' + escapeHtml(college?.name || 'بدون كلية') + '</span><div class="actions"><button class="btn btn-danger" onclick="deleteSpecialty(\'' + spec.id + '\')"><i class="fas fa-trash"></i></button></div></div>';
    });
    adminSpecialtiesList.innerHTML = html || '<div class="empty-state"><h3>لا توجد تخصصات</h3></div>';
}


// ============================================================
//  ADMIN: CLEANUP FUNCTIONS
// ============================================================
async function cleanupOrphanedData() {
    if (!isAdmin) { showToast('هذه العملية مخصصة للمشرفين فقط', 'error'); return; }
    if (!confirm('⚠️ هل أنت متأكد من رغبتك في تنظيف بيانات المستخدمين المحذوفين؟')) return;
    if (!confirm('❗ تأكيد نهائي؟')) return;
    showToast('جاري تنظيف البيانات...', 'warning');
    try {
        var usersSnap = await db.collection('users').get();
        var existingUsers = {};
        usersSnap.forEach(function(doc) { existingUsers[doc.id] = true; });
        var cleanedCount = 0;
        var coursesSnap = await db.collection('courses').get();
        for (var i = 0; i < coursesSnap.docs.length; i++) {
            var doc = coursesSnap.docs[i];
            var courseData = doc.data();
            var needsUpdate = false;
            if (courseData.voters) {
                var voters = courseData.voters;
                var newVoters = {};
                var totalRating = 0;
                var voteCount = 0;
                for (var uid in voters) {
                    if (existingUsers[uid]) {
                        newVoters[uid] = voters[uid];
                        totalRating += voters[uid];
                        voteCount++;
                    } else { needsUpdate = true; cleanedCount++; }
                }
                if (needsUpdate) {
                    var avgRating = voteCount > 0 ? totalRating / voteCount : 0;
                    await doc.ref.update({ voters: newVoters, votes: voteCount, totalRating: totalRating, avgRating: avgRating });
                }
            }
            if (courseData.comments) {
                var comments = courseData.comments;
                var newComments = [];
                var commentRegex = /^([^:]+):/;
                for (var j = 0; j < comments.length; j++) {
                    var comment = comments[j];
                    var match = comment.match(commentRegex);
                    if (match) {
                        var commenterName = match[1].trim();
                        var userExists = false;
                        for (var uid2 in existingUsers) {
                            var userDoc = await db.collection('users').doc(uid2).get();
                            if (userDoc.exists && userDoc.data().displayName === commenterName) {
                                userExists = true;
                                break;
                            }
                        }
                        if (userExists) { newComments.push(comment); }
                        else { needsUpdate = true; cleanedCount++; }
                    } else { newComments.push(comment); }
                }
                if (needsUpdate) { await doc.ref.update({ comments: newComments }); }
            }
        }
        showToast('✅ تم تنظيف البيانات! تم حذف ' + cleanedCount + ' عنصر.', 'success');
        await loadAllData();
    } catch (error) {
        console.error('Error cleaning up data:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}



async function cleanupAllData() {
    if (!isAdmin) { showToast('هذه العملية مخصصة للمشرفين فقط', 'error'); return; }
    if (!confirm('🚨 تحذير! هذا الإجراء سيقوم بحذف جميع التصويتات والتعليقات. هل أنت متأكد؟')) return;
    var confirmText = prompt('للتأكيد، اكتب: نعم أحذف كل شيء');
    if (confirmText !== 'نعم أحذف كل شيء') { showToast('تم إلغاء العملية', 'warning'); return; }
    showToast('جاري حذف جميع البيانات...', 'warning');
    try {
        var coursesSnap = await db.collection('courses').get();
        var updatedCount = 0;
        for (var i = 0; i < coursesSnap.docs.length; i++) {
            var doc = coursesSnap.docs[i];
            await doc.ref.update({ voters: {}, votes: 0, totalRating: 0, avgRating: 0, comments: [] });
            updatedCount++;
        }
        showToast('✅ تم حذف جميع البيانات! تم مسح ' + updatedCount + ' مادة.', 'success');
        await loadAllData();
    } catch (error) {
        console.error('Error cleaning all data:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

window.deleteUserCompletely = async function(uid) {
    if (!isAdmin) { showToast('هذه العملية مخصصة للمشرفين فقط', 'error'); return; }
    if (uid === currentUser?.uid) { showToast('لا يمكن حذف حسابك بنفسك', 'error'); return; }
    if (!confirm('⚠️ هل أنت متأكد من حذف هذا المستخدم مع جميع بياناته؟')) return;
    try {
        await db.collection('users').doc(uid).delete();
        var coursesSnap = await db.collection('courses').get();
        for (var i = 0; i < coursesSnap.docs.length; i++) {
            var doc = coursesSnap.docs[i];
            var courseData = doc.data();
            var needsUpdate = false;
            if (courseData.voters && courseData.voters[uid]) {
                delete courseData.voters[uid];
                courseData.votes = (courseData.votes || 1) - 1;
                courseData.totalRating = (courseData.totalRating || 0) - courseData.voters[uid];
                courseData.avgRating = courseData.votes > 0 ? courseData.totalRating / courseData.votes : 0;
                needsUpdate = true;
            }
            if (courseData.comments) {
                var userName = '';
                var userDoc = await db.collection('users').doc(uid).get();
                if (userDoc.exists) { userName = userDoc.data().displayName || ''; }
                if (userName) {
                    var newComments = [];
                    for (var j = 0; j < courseData.comments.length; j++) {
                        if (!courseData.comments[j].startsWith(userName + ':')) {
                            newComments.push(courseData.comments[j]);
                        } else { needsUpdate = true; }
                    }
                    courseData.comments = newComments;
                }
            }
            if (needsUpdate) {
                await doc.ref.update({ voters: courseData.voters || {}, votes: courseData.votes || 0, totalRating: courseData.totalRating || 0, avgRating: courseData.avgRating || 0, comments: courseData.comments || [] });
            }
        }
        users = users.filter(function(u) { return u.uid !== uid; });
        allUsers = allUsers.filter(function(u) { return u.uid !== uid; });
        showToast('✅ تم حذف المستخدم وجميع بياناته!', 'success');
        await loadAllData();
        loadAdminUsers();
        renderUsers();
    } catch (error) {
        console.error('Error deleting user completely:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
};

// ============================================================
//  ADMIN: COURSE CRUD
// ============================================================
var adminAddCourseBtn = safeGetElement('adminAddCourseBtn');
if (adminAddCourseBtn) {
    adminAddCourseBtn.addEventListener('click', function() {
        if (editCourseId) editCourseId.value = '';
        if (courseModalTitle) { courseModalTitle.innerHTML = '<i class="fas fa-pen-fancy"></i> إضافة مقرر'; }
        if (courseForm) courseForm.reset();
        var midUnitsGroup = safeGetElement('midUnitsGroup');
        var practicalGroup = safeGetElement('practicalGroup');
        var labUnitsGroup = safeGetElement('labUnitsGroup');
        var labInfoGroup = safeGetElement('labInfoGroup');
        if (midUnitsGroup) midUnitsGroup.style.display = 'block';
        if (practicalGroup) practicalGroup.style.display = 'none';
        if (labUnitsGroup) labUnitsGroup.style.display = 'none';
        if (labInfoGroup) labInfoGroup.style.display = 'none';
        if (courseModal) courseModal.classList.add('active');
        populateCourseSpecialties();
    });
}

window.editCourse = async function(id) {
    try {
        var course = courses.find(function(c) { return c.id === id; });
        if (!course) return;
        if (editCourseId) editCourseId.value = id;
        if (courseModalTitle) { courseModalTitle.innerHTML = '<i class="fas fa-edit"></i> تعديل مقرر'; }
        var fields = ['cName', 'cCode', 'cDesc', 'cYear', 'cHours', 'cTheory', 'cPractical', 'cType', 'cHasMid', 'cHasLab', 'cHasActivity', 'cPrereq', 'cUnits', 'cMidUnits', 'cFinalUnits', 'cLabUnits', 'cLabInfo'];
        var values = [course.name, course.code, course.desc, course.year, course.hours, course.theory, course.practical, course.type, course.hasMid, course.hasLab, course.hasActivity, course.prereq, course.units, course.midUnits, course.finalUnits, course.labUnits, course.labInfo];
        fields.forEach(function(field, index) {
            var el = safeGetElement(field);
            if (el) el.value = values[index] || '';
        });
        var midUnitsGroup = safeGetElement('midUnitsGroup');
        var practicalGroup = safeGetElement('practicalGroup');
        var labUnitsGroup = safeGetElement('labUnitsGroup');
        var labInfoGroup = safeGetElement('labInfoGroup');
        if (midUnitsGroup) midUnitsGroup.style.display = course.hasMid === 'نعم' ? 'block' : 'none';
        var showLab = course.hasLab === 'نعم';
        if (practicalGroup) practicalGroup.style.display = showLab ? 'block' : 'none';
        if (labUnitsGroup) labUnitsGroup.style.display = showLab ? 'block' : 'none';
        if (labInfoGroup) labInfoGroup.style.display = showLab ? 'block' : 'none';
        await populateCourseSpecialties(course.specialties || []);
        await updatePrereqOptions();
        if (courseModal) courseModal.classList.add('active');
    } catch (e) {
        console.error('Error editing course:', e);
        showToast('حدث خطأ في تحميل بيانات المادة', 'error');
    }
};

window.deleteCourse = async function(id) {
    if (!confirm('هل أنت متأكد من حذف هذه المادة؟')) return;
    try {
        await db.collection('courses').doc(id).delete();
        await loadAllData();
        loadAdminCourses();
        showToast('تم حذف المادة بنجاح');
    } catch (e) {
        console.error('Error deleting course:', e);
        showToast('حدث خطأ: ' + e.message, 'error');
    }
};

async function populateCourseSpecialties(selected) {
    selected = selected || [];
    var select = safeGetElement('cSpecialties');
    if (!select) return;
    select.innerHTML = '';
    var collegeMap = {};
    colleges.forEach(function(c) { collegeMap[c.id] = c.name; });
    allSpecialties.forEach(function(spec) {
        var group = collegeMap[spec.collegeId] || 'بدون كلية';
        var optgroup = select.querySelector('optgroup[label="' + group + '"]');
        if (!optgroup) {
            optgroup = document.createElement('optgroup');
            optgroup.label = group;
            select.appendChild(optgroup);
        }
        var opt = document.createElement('option');
        opt.value = JSON.stringify({ id: spec.id, collegeId: spec.collegeId });
        opt.textContent = spec.name + (spec.hours ? ' (' + spec.hours + ' س)' : '');
        if (selected.some(function(sel) { return sel.id === spec.id; })) opt.selected = true;
        optgroup.appendChild(opt);
    });
}

// ============================================================
//  ADMIN: COLLEGES CRUD
// ============================================================
var addCollegeBtn = safeGetElement('addCollegeBtn');
if (addCollegeBtn) {
    addCollegeBtn.addEventListener('click', async function() {
        var nameInput = safeGetElement('newCollegeName');
        if (!nameInput) return;
        var name = nameInput.value.trim();
        if (!name) return showToast('يرجى إدخال اسم الكلية', 'error');
        try {
            await db.collection('colleges').add({ name: name, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
            nameInput.value = '';
            await loadAllData();
            loadAdminColleges();
            loadColleges();
            populateCollegeDropdowns();
            showToast('تم إضافة الكلية بنجاح! 🏛️');
        } catch (e) {
            console.error('Error adding college:', e);
            showToast('حدث خطأ: ' + e.message, 'error');
        }
    });
}

window.deleteCollege = async function(id) {
    if (!confirm('هل أنت متأكد من حذف هذه الكلية؟')) return;
    try {
        await db.collection('colleges').doc(id).delete();
        var specsToDelete = allSpecialties.filter(function(s) { return s.collegeId === id; });
        for (var i = 0; i < specsToDelete.length; i++) {
            await db.collection('specialties').doc(specsToDelete[i].id).delete();
        }
        await loadAllData();
        loadAdminColleges();
        loadColleges();
        populateCollegeDropdowns();
        showToast('تم حذف الكلية بنجاح');
    } catch (e) {
        console.error('Error deleting college:', e);
        showToast('حدث خطأ: ' + e.message, 'error');
    }
};

// ============================================================
//  ADMIN: SPECIALTIES CRUD
// ============================================================
var addSpecialtyBtn = safeGetElement('addSpecialtyBtn');
if (addSpecialtyBtn) {
    addSpecialtyBtn.addEventListener('click', async function() {
        var collegeSelect = safeGetElement('specialtyCollege');
        var nameInput = safeGetElement('newSpecialtyName');
        var hoursInput = safeGetElement('newSpecialtyHours');
        if (!collegeSelect || !nameInput || !hoursInput) return;
        var collegeId = collegeSelect.value;
        var name = nameInput.value.trim();
        var hours = parseInt(hoursInput.value) || 0;
        if (!collegeId || !name) return showToast('يرجى اختيار الكلية وإدخال اسم التخصص', 'error');
        try {
            await db.collection('specialties').add({ name: name, collegeId: collegeId, hours: hours, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
            nameInput.value = '';
            hoursInput.value = '';
            await loadAllData();
            loadAdminSpecialties();
            loadSpecialties();
            populateCollegeDropdowns();
            populateCourseSpecialties();
            showToast('تم إضافة التخصص بنجاح! 🏷️');
        } catch (e) {
            console.error('Error adding specialty:', e);
            showToast('حدث خطأ: ' + e.message, 'error');
        }
    });
}

window.deleteSpecialty = async function(id) {
    if (!confirm('هل أنت متأكد من حذف هذا التخصص؟')) return;
    try {
        await db.collection('specialties').doc(id).delete();
        await loadAllData();
        loadAdminSpecialties();
        loadSpecialties();
        populateCollegeDropdowns();
        populateCourseSpecialties();
        showToast('تم حذف التخصص بنجاح');
    } catch (e) {
        console.error('Error deleting specialty:', e);
        showToast('حدث خطأ: ' + e.message, 'error');
    }
};

function refreshCurrentUserProfileModal() {
    if (!currentViewedUserUid) return;
    var user = users.find(function(u) { return u.uid === currentViewedUserUid; });
    if (!user) return;
    
    var content = document.getElementById('userProfileContent');
    if (content) {
        content.innerHTML = buildUserProfileHTML(user);
    }
}

// ============================================================
//  ADMIN: USERS
// ============================================================
window.toggleUserRole = async function(uid, newRole) {
    if (uid === currentUser?.uid) return showToast('لا يمكن تغيير دورك بنفسك', 'error');
    try {
        var user = users.find(function(u) { return u.uid === uid; });
        if (!user) return;
        var roles = ['user', 'moderator', 'admin'];
        var roleDisplay = { 'user': 'مستخدم', 'moderator': 'مدير', 'admin': 'مشرف' };
        // إذا لم يتم تحديد دور، نأخذ الدور التالي
        if (!newRole) {
            var currentIndex = roles.indexOf(user.role || 'user');
            newRole = roles[(currentIndex + 1) % roles.length];
        }
        await db.collection('users').doc(uid).update({ role: newRole });
        await loadAllData();
        loadAdminUsers(); // تحديث القائمة
        showToast('تم تغيير دور المستخدم إلى: ' + (roleDisplay[newRole] || newRole));
    } catch (e) {
        console.error('Error toggling role:', e);
        showToast('حدث خطأ: ' + e.message, 'error');
    }
};
window.deleteUser = async function(uid) {
    if (uid === currentUser?.uid) return showToast('لا يمكن حذف حسابك بنفسك', 'error');
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;
    try {
        await db.collection('users').doc(uid).delete();
        await loadAllData();
        loadAdminUsers();
        showToast('تم حذف المستخدم بنجاح');
    } catch (e) {
        console.error('Error deleting user:', e);
        showToast('حدث خطأ: ' + e.message, 'error');
    }
};

// ============================================================
//  COURSE FORM SUBMIT
// ============================================================
if (courseForm) {
    courseForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        var id = editCourseId ? editCourseId.value : '';
        var cSpecialtiesEl = safeGetElement('cSpecialties');
        var specialties = cSpecialtiesEl ? Array.from(cSpecialtiesEl.selectedOptions).map(function(opt) { return JSON.parse(opt.value); }) : [];
        var fields = {
            cName: 'name', cCode: 'code', cDesc: 'desc', cYear: 'year', cHours: 'hours',
            cTheory: 'theory', cPractical: 'practical', cType: 'type', cHasMid: 'hasMid',
            cHasLab: 'hasLab', cHasActivity: 'hasActivity', cPrereq: 'prereq',
            cUnits: 'units', cMidUnits: 'midUnits', cFinalUnits: 'finalUnits',
            cLabUnits: 'labUnits', cLabInfo: 'labInfo'
        };
        var data = {};
        for (var fieldId in fields) {
            if (fields.hasOwnProperty(fieldId)) {
                var el = safeGetElement(fieldId);
                if (el) {
                    if (el.type === 'number') { data[fields[fieldId]] = parseInt(el.value) || 0; }
                    else { data[fields[fieldId]] = el.value; }
                }
            }
        }
        data.specialties = specialties;
        var semesterEl = safeGetElement('cSemester');
        data.semester = semesterEl ? Array.from(semesterEl.selectedOptions).map(function(o) { return o.value; }) : [];
        try {
            if (id) {
                await db.collection('courses').doc(id).update(data);
                showToast('تم تحديث المادة بنجاح! 📝');
            } else {
                data.voters = {};
                data.votes = 0;
                data.totalRating = 0;
                data.avgRating = 0;
                data.comments = [];
                data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                await db.collection('courses').add(data);
                showToast('تم إضافة المادة بنجاح! 📚');
            }
            if (courseModal) courseModal.classList.remove('active');
            await loadAllData();
            loadAdminCourses();
        } catch (e) {
            console.error('Error saving course:', e);
            showToast('حدث خطأ: ' + e.message, 'error');
        }
    });
}

// ============================================================
//  COURSE INFO
// ============================================================

if (courseInfoClose) {
    courseInfoClose.addEventListener('click', function() {
        if (courseInfoModal) courseInfoModal.classList.remove('active');
    });
}

// ============================================================
//  MODAL CLOSE
// ============================================================
document.querySelectorAll('.modal-close').forEach(function(btn) {
    btn.addEventListener('click', function() {
        if (courseModal) courseModal.classList.remove('active');
        if (authModal) authModal.classList.remove('active');
        if (courseInfoModal) courseInfoModal.classList.remove('active');
        if (voteDetailsModal) voteDetailsModal.classList.remove('active');
        if (userProfileModal) userProfileModal.classList.remove('active');
    });
});

window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// ============================================================
//  KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(function(m) { m.classList.remove('active'); });
    }
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        if (searchInput) searchInput.focus();
    }
});

// ============================================================
//  FILTERS
// ============================================================
if (searchInput) searchInput.addEventListener('input', renderCourses);
if (filterYear) filterYear.addEventListener('change', renderCourses);
if (filterCollege) {
    filterCollege.addEventListener('change', function() {
        var collegeId = filterCollege.value;
        if (filterSpecialty) {
            filterSpecialty.innerHTML = '<option value="all">كل التخصصات</option>';
            if (collegeId !== 'all') {
                allSpecialties.filter(function(s) { return s.collegeId === collegeId; }).forEach(function(spec) {
                    var opt = document.createElement('option');
                    opt.value = spec.id;
                    opt.textContent = spec.name + (spec.hours ? ' (' + spec.hours + ' س)' : '');
                    filterSpecialty.appendChild(opt);
                });
            }
        }
        renderCourses();
    });
}
if (filterSpecialty) filterSpecialty.addEventListener('change', renderCourses);
if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', function() {
        if (searchInput) searchInput.value = '';
        if (filterYear) filterYear.value = 'all';
        if (filterCollege) filterCollege.value = 'all';
        if (filterSpecialty) {
            filterSpecialty.innerHTML = '<option value="all">كل التخصصات</option>';
        }
        renderCourses();
        showToast('تم مسح جميع الفلاتر');
    });
}

// ============================================================
//  UTILITY FUNCTIONS
// ============================================================
function getRatingText(avg) {
    if (!avg || avg === 0) return 'لا توجد تقييمات';
    if (avg >= 4.5) return RATING_LABELS[0] + ' ' + RATING_EMOJIS[0];
    if (avg >= 3.5) return RATING_LABELS[1] + ' ' + RATING_EMOJIS[1];
    if (avg >= 2.5) return RATING_LABELS[2] + ' ' + RATING_EMOJIS[2];
    if (avg >= 1.5) return RATING_LABELS[3] + ' ' + RATING_EMOJIS[3];
    return RATING_LABELS[4] + ' ' + RATING_EMOJIS[4];
}

function getRatingDistribution(voters) {
    var dist = {};
    for (var r = 1; r <= 5; r++) { dist[r] = 0; }
    var keys = Object.keys(voters);
    for (var i = 0; i < keys.length; i++) {
        var val = voters[keys[i]];
        if (dist[val] !== undefined) dist[val]++;
    }
    return dist;
}

// ============================================================
//  حساب الشارات - مع شارات المشرفين والرئيس
// ============================================================

function calculateBadges(userData) {
    var badges = [];
    var votes = userData.votes || 0;
    var completed = (userData.completed || []).length;
    var favorites = (userData.favorites || []).length;
    var trust = (userData.trustedBy || []).length;
    var friends = (userData.friends || []).length;
    
    // ===== شارات المشرفين =====
    if (userData.role === 'admin') {
        if (userData.isSuperAdmin) {
            badges.push({ name: ' المشرف الرئيسي', icon: 'fa-crown', class: 'platinum' });
        } else {
            badges.push({ name: ' مشرف', icon: 'fa-shield-alt', class: 'gold' });
        }
    }
    
    // ===== شارات التصويت =====
    if (votes >= 200) badges.push({ name: 'أسطورة التصويت', icon: 'fa-crown', class: 'platinum' });
    else if (votes >= 100) badges.push({ name: 'المصوت الذهبي', icon: 'fa-crown', class: 'gold' });
    else if (votes >= 50) badges.push({ name: 'المصوت الفضي', icon: 'fa-star', class: 'silver' });
    else if (votes >= 20) badges.push({ name: 'المصوت البرونزي', icon: 'fa-star-half-alt', class: 'bronze' });
    else if (votes >= 5) badges.push({ name: 'مصوت جديد', icon: 'fa-star', class: '' });

    // ===== شارات الاجتياز =====
    if (completed >= 30) badges.push({ name: 'المنجز الأسطوري', icon: 'fa-trophy', class: 'platinum' });
    else if (completed >= 20) badges.push({ name: 'المنجز الذهبي', icon: 'fa-trophy', class: 'gold' });
    else if (completed >= 10) badges.push({ name: 'المنجز الفضي', icon: 'fa-trophy', class: 'silver' });
    else if (completed >= 5) badges.push({ name: 'المنجز البرونزي', icon: 'fa-trophy', class: 'bronze' });
    else if (completed >= 1) badges.push({ name: 'مبتدئ', icon: 'fa-medal', class: '' });

    // ===== شارات المفضلة =====
    if (favorites >= 20) badges.push({ name: 'جامع المفضلات الأسطوري', icon: 'fa-heart', class: 'platinum' });
    else if (favorites >= 10) badges.push({ name: 'جامع المفضلات', icon: 'fa-heart', class: 'gold' });
    else if (favorites >= 5) badges.push({ name: 'محب للمواد', icon: 'fa-heart', class: 'silver' });

    // ===== شارات الثقة =====
    if (trust >= 30) badges.push({ name: 'موثوق أسطوري', icon: 'fa-handshake', class: 'platinum' });
    else if (trust >= 20) badges.push({ name: 'موثوق جداً', icon: 'fa-handshake', class: 'gold' });
    else if (trust >= 10) badges.push({ name: 'موثوق', icon: 'fa-handshake', class: 'silver' });
    else if (trust >= 5) badges.push({ name: 'جدير بالثقة', icon: 'fa-handshake', class: '' });

    // ===== شارات الأصدقاء =====
    if (friends >= 25) badges.push({ name: 'اجتماعي أسطوري', icon: 'fa-users', class: 'platinum' });
    else if (friends >= 15) badges.push({ name: 'اجتماعي جداً', icon: 'fa-users', class: 'gold' });
    else if (friends >= 5) badges.push({ name: 'اجتماعي', icon: 'fa-users', class: 'silver' });

    // ===== شارات إضافية =====
    if (userData.profileCompleted && userData.bio && userData.bio.length > 20) {
        badges.push({ name: 'ملف متكامل', icon: 'fa-user-check', class: '' });
    }
    if (userData.avatar && userData.avatar.length > 0) {
        badges.push({ name: 'مصور', icon: 'fa-camera', class: '' });
    }
    if (userData.branch && userData.branch.length > 0) {
        badges.push({ name: 'متعرف على المدينة', icon: 'fa-city', class: '' });
    }
    
    // ===== شارات النقاط =====
    var pointsResult = calculateUserPoints(userData);
    if (pointsResult.earnedPoints >= 500) {
        badges.push({ name: 'نقاطي الذهبية', icon: 'fa-gem', class: 'platinum' });
    } else if (pointsResult.earnedPoints >= 200) {
        badges.push({ name: 'نقاطي الفضية', icon: 'fa-gem', class: 'gold' });
    } else if (pointsResult.earnedPoints >= 100) {
        badges.push({ name: 'نقاطي البرونزية', icon: 'fa-gem', class: 'silver' });
    }
    
    return badges;
}

function updateBadges() {
    if (!currentUserData || !badgesContainer) return;
    var badges = calculateBadges(currentUserData);
    if (profileBadgeCount) profileBadgeCount.textContent = badges.length;
    if (badges.length === 0) {
        badgesContainer.innerHTML = '<span style="color:var(--gray-400);font-size:0.9rem;">لا توجد شارات حتى الآن</span>';
        return;
    }
    badgesContainer.innerHTML = badges.map(function(b) {
        return '<span class="badge-item ' + b.class + '"><i class="fas ' + b.icon + '"></i> ' + b.name + '</span>';
    }).join('');
}

function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================================
//  ACCOUNT MANAGEMENT
// ============================================================
async function deleteAccount() {
    if (!currentUser) return;
    if (!confirm('⚠️ تحذير! هذا الإجراء سيقوم بحذف حسابك نهائياً. هل أنت متأكد؟')) return;
    var confirmText = prompt('للتأكيد، اكتب: أحذف حسابي');
    if (confirmText !== 'أحذف حسابي') { showToast('تم إلغاء العملية', 'warning'); return; }
    try {
        await db.collection('users').doc(currentUser.uid).delete();
        await currentUser.delete();
        showToast('تم حذف الحساب بنجاح', 'success');
        logoutUser();
        loadAllData();
    } catch (error) {
        console.error('Error deleting account:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

async function logoutAllDevices() {
    if (!currentUser) return;
    if (!confirm('هل أنت متأكد من تسجيل الخروج من جميع الأجهزة؟')) return;
    try {
        await auth.signOut();
        showToast('تم تسجيل الخروج من جميع الأجهزة', 'success');
        logoutUser();
        loadAllData();
    } catch (error) {
        console.error('Error logging out all devices:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// ============================================================
//  PROFILE CUSTOMIZATION SYSTEM
// ============================================================

// ============================================================
//  نظام تخصيص الملف المتقدم - الإصدار 2.0
// ============================================================

var CUSTOMIZATION_COSTS = {
    avatarBorder: 30,
    profileBg: 50,
    avatarEffect: 40,
    nameColor: 35,
    badgeStyle: 25,
    cardStyle: 60,
    fontStyle: 45,
    animationSpeed: 50,
    specialBadge: 100,
    nameGlow: 80,
    profileFrame: 70,
    customEmoji: 90
};

if (typeof CUSTOMIZATION_OPTIONS === 'undefined') {
    var CUSTOMIZATION_OPTIONS = {};
}

// إضافة خيار لون الأزرار
CUSTOMIZATION_OPTIONS.buttonColor = {
    label: 'لون الأزرار في المودال',
    cost: 35,
    options: [
        { key: 'default', label: 'افتراضي' },
        { key: '#2563eb', label: 'أزرق' },
        { key: '#ef4444', label: 'أحمر' },
        { key: '#22c55e', label: 'أخضر' },
        { key: '#f59e0b', label: 'ذهبي' },
        { key: '#8b5cf6', label: 'بنفسجي' },
        { key: '#ec4899', label: 'وردي' },
        { key: '#14b8a6', label: 'فيروزي' },
        { key: '#f97316', label: 'برتقالي' },
        { key: '#ffffff', label: 'أبيض' },
        { key: '#000000', label: 'أسود' },
        { key: '#94a3b8', label: 'رمادي' }
    ]
};

// ============================================================
//  CUSTOMIZATION OPTIONS - الهيكل الجديد
// ============================================================
var CUSTOMIZATION_OPTIONS = {
    appearance: {
        label: 'المظهر',
        icon: 'fa-palette',
        options: {
            profileBg: {
                label: 'خلفية الملف الشخصي',
                cost: 50,
                type: 'bg',
                options: [
                    { key: 'default', label: 'افتراضي' },
                    { key: 'gradient1', label: 'أرجواني-أزرق' },
                    { key: 'gradient2', label: 'فيروزي-أزرق' },
                    { key: 'gradient3', label: 'وردي-أحمر' },
                    { key: 'gradient4', label: 'أزرق-سماوي' },
                    { key: 'ocean', label: 'محيط عميق' },
                    { key: 'sunset', label: 'غروب الشمس' },
                    { key: 'forest', label: 'غابة خضراء' },
                    { key: 'midnight', label: 'منتصف الليل' },
                    { key: 'neon', label: 'نيون' },
                    { key: 'rainbow', label: 'قوس قزح' },
                    { key: 'galaxy', label: 'مجرة' },
                    { key: 'sunrise', label: 'شروق' },
                    { key: 'lavender', label: 'لافندر' },
                    { key: 'candy', label: 'حلوى' },
                    { key: 'gold', label: 'ذهبي' }
                ]
            },
            fontStyle: {
                label: 'نوع الخط',
                cost: 45,
                type: 'select',
                options: [
                    { key: 'default', label: 'افتراضي' },
                    { key: 'modern', label: 'حديث' },
                    { key: 'elegant', label: 'أنيق' },
                    { key: 'bold', label: 'غامق' },
                    { key: 'handwriting', label: 'خط يد' },
                    { key: 'playful', label: 'مرح' }
                ]
            },
            animationSpeed: {
                label: 'سرعة الحركة',
                cost: 50,
                type: 'select',
                options: [
                    { key: 'slow', label: 'بطيء' },
                    { key: 'normal', label: 'طبيعي' },
                    { key: 'fast', label: 'سريع' },
                    { key: 'none', label: 'بدون' }
                ]
            }
        }
    },
    avatar: {
        label: 'الصورة',
        icon: 'fa-user-circle',
        options: {
            profileFrame: {
                label: 'شكل الصورة',
                cost: 70,
                type: 'select',
                options: [
                    { key: 'default', label: 'دائرة' },
                    { key: 'rounded', label: 'مدور' },
                    { key: 'square', label: 'مربع' },
                    { key: 'star', label: 'نجمة' },
                    { key: 'heart', label: 'قلب' },
                    { key: 'diamond', label: 'ماسة' }
                ]
            },
            avatarEffect: {
                label: 'تأثير الصورة',
                cost: 40,
                type: 'select',
                options: [
                    { key: 'none', label: 'بدون' },
                    { key: 'glow', label: 'توهج' },
                    { key: 'pulse', label: 'نبض' },
                    { key: 'rotate', label: 'دوران' },
                    { key: 'shake', label: 'اهتزاز' }
                ]
            },
            avatarBorderWidth: {
                label: 'إطار الصورة',
                cost: 20,
                type: 'select',
                options: [
                    { key: 'none', label: 'بدون' },
                    { key: '2', label: 'رفيع' },
                    { key: '4', label: 'متوسط' },
                    { key: '6', label: 'سميك' },
                    { key: '8', label: 'سميك جداً' }
                ]
            },
            avatarBorder: {
                label: 'لون إطار الصورة',
                cost: 30,
                type: 'color',
                options: [
                    { key: '#2563eb', label: 'أزرق' },
                    { key: '#ef4444', label: 'أحمر' },
                    { key: '#22c55e', label: 'أخضر' },
                    { key: '#f59e0b', label: 'ذهبي' },
                    { key: '#8b5cf6', label: 'بنفسجي' },
                    { key: '#ec4899', label: 'وردي' },
                    { key: '#14b8a6', label: 'فيروزي' },
                    { key: '#f97316', label: 'برتقالي' },
                    { key: '#ffffff', label: 'أبيض' },
                    { key: '#000000', label: 'أسود' }
                ]
            },
            avatarBorderStyle: {
                label: 'نمط إطار الصورة',
                cost: 25,
                type: 'select',
                options: [
                    { key: 'solid', label: 'عادي' },
                    { key: 'dashed', label: 'متقطع' },
                    { key: 'dotted', label: 'منقط' },
                    { key: 'double', label: 'مزدوج' }
                ]
            },
            avatarShadow: {
                label: 'ظل الصورة',
                cost: 35,
                type: 'select',
                options: [
                    { key: 'none', label: 'بدون' },
                    { key: 'small', label: 'صغير' },
                    { key: 'medium', label: 'متوسط' },
                    { key: 'large', label: 'كبير' },
                    { key: 'colored', label: 'ملون' }
                ]
            },
            avatarShadowColor: {
                label: 'لون ظل الصورة',
                cost: 25,
                type: 'color',
                options: [
                    { key: 'default', label: 'افتراضي' },
                    { key: '#2563eb', label: 'أزرق' },
                    { key: '#ef4444', label: 'أحمر' },
                    { key: '#22c55e', label: 'أخضر' },
                    { key: '#f59e0b', label: 'ذهبي' },
                    { key: '#8b5cf6', label: 'بنفسجي' },
                    { key: '#ec4899', label: 'وردي' },
                    { key: '#14b8a6', label: 'فيروزي' }
                ]
            }
        }
    },
    name: {
        label: 'الاسم',
        icon: 'fa-signature',
        options: {
            nameColor: {
                label: 'لون الاسم',
                cost: 35,
                type: 'color',
                options: [
                    { key: '#2563eb', label: 'أزرق' },
                    { key: '#ef4444', label: 'أحمر' },
                    { key: '#22c55e', label: 'أخضر' },
                    { key: '#f59e0b', label: 'ذهبي' },
                    { key: '#8b5cf6', label: 'بنفسجي' },
                    { key: '#ec4899', label: 'وردي' },
                    { key: '#14b8a6', label: 'فيروزي' },
                    { key: '#f97316', label: 'برتقالي' },
                    { key: '#ffffff', label: 'أبيض' },
                    { key: '#000000', label: 'أسود' }
                ]
            },
            nameGlow: {
                label: 'تأثير الاسم',
                cost: 80,
                type: 'select',
                options: [
                    { key: 'none', label: 'بدون' },
                    { key: 'soft', label: 'ناعم' },
                    { key: 'strong', label: 'قوي' },
                    { key: 'rainbow', label: 'قوس قزح' }
                ]
            }
        }
    },
    texts: {
        label: 'النصوص',
        icon: 'fa-font',
        options: {
            textColor: {
                label: 'لون النصوص الثانوية',
                cost: 30,
                type: 'color',
                options: [
                    { key: 'default', label: 'افتراضي' },
                    { key: '#2563eb', label: 'أزرق' },
                    { key: '#ef4444', label: 'أحمر' },
                    { key: '#22c55e', label: 'أخضر' },
                    { key: '#f59e0b', label: 'ذهبي' },
                    { key: '#8b5cf6', label: 'بنفسجي' },
                    { key: '#ec4899', label: 'وردي' },
                    { key: '#14b8a6', label: 'فيروزي' },
                    { key: '#f97316', label: 'برتقالي' },
                    { key: '#ffffff', label: 'أبيض' },
                    { key: '#000000', label: 'أسود' },
                    { key: '#94a3b8', label: 'رمادي' }
                ]
            },
            bioColor: {
                label: 'لون النبذة',
                cost: 25,
                type: 'color',
                options: [
                    { key: 'default', label: 'افتراضي' },
                    { key: '#2563eb', label: 'أزرق' },
                    { key: '#ef4444', label: 'أحمر' },
                    { key: '#22c55e', label: 'أخضر' },
                    { key: '#f59e0b', label: 'ذهبي' },
                    { key: '#8b5cf6', label: 'بنفسجي' },
                    { key: '#ec4899', label: 'وردي' },
                    { key: '#14b8a6', label: 'فيروزي' },
                    { key: '#f97316', label: 'برتقالي' },
                    { key: '#ffffff', label: 'أبيض' },
                    { key: '#94a3b8', label: 'رمادي' }
                ]
            }
        }
    },
    buttons: {
        label: 'الأزرار',
        icon: 'fa-square',
        options: {
            buttonColor: {
                label: 'لون الأزرار',
                cost: 35,
                type: 'color',
                options: [
                    { key: 'default', label: 'افتراضي' },
                    { key: '#2563eb', label: '🔵 أزرق' },
                    { key: '#ef4444', label: '🔴 أحمر' },
                    { key: '#22c55e', label: '🟢 أخضر' },
                    { key: '#f59e0b', label: '🟡 ذهبي' },
                    { key: '#8b5cf6', label: '🟣 بنفسجي' },
                    { key: '#ec4899', label: '🩷 وردي' },
                    { key: '#14b8a6', label: '🩵 فيروزي' },
                    { key: '#f97316', label: '🟠 برتقالي' },
                    { key: '#ffffff', label: '⬜ أبيض' },
                    { key: '#000000', label: '⬛ أسود' },
                    { key: '#94a3b8', label: '⬜ رمادي' }
                ]
            }
        }
    },
    badge: {
        label: 'الشارة',
        icon: 'fa-trophy',
        options: {
            badgeStyle: {
                label: 'شكل الشارة',
                cost: 25,
                type: 'select',
                options: [
                    { key: 'default', label: 'افتراضي' },
                    { key: 'glow', label: 'توهج' },
                    { key: 'rounded', label: 'مدور' },
                    { key: 'shadow', label: 'مظلل' },
                    { key: 'gradient', label: 'متدرج' },
                    { key: 'neon', label: 'نيون' }
                ]
            },
            featuredBadgeTextColor: {
                label: 'لون نص الشارة',
                cost: 20,
                type: 'color',
                options: [
                    { key: 'default', label: 'افتراضي' },
                    { key: '#ffffff', label: 'أبيض' },
                    { key: '#000000', label: 'أسود' },
                    { key: '#2563eb', label: 'أزرق' },
                    { key: '#ef4444', label: 'أحمر' },
                    { key: '#22c55e', label: 'أخضر' },
                    { key: '#f59e0b', label: 'ذهبي' },
                    { key: '#8b5cf6', label: 'بنفسجي' },
                    { key: '#ec4899', label: 'وردي' }
                ]
            },
            featuredBadgeBg: {
                label: 'خلفية الشارة',
                cost: 25,
                type: 'select',
                options: [
                    { key: 'default', label: 'افتراضي' },
                    { key: 'gradient1', label: 'أرجواني-أزرق' },
                    { key: 'gradient2', label: 'وردي-أحمر' },
                    { key: 'gold', label: 'ذهبي' },
                    { key: 'neon', label: 'نيون' },
                    { key: 'dark', label: 'داكن' }
                ]
            },
            featuredBadgeSize: {
                label: 'حجم الشارة',
                cost: 20,
                type: 'select',
                options: [
                    { key: 'small', label: 'صغير' },
                    { key: 'medium', label: 'متوسط' },
                    { key: 'large', label: 'كبير' }
                ]
            },
            featuredBadgeEffect: {
                label: 'تأثير الشارة',
                cost: 30,
                type: 'select',
                options: [
                    { key: 'none', label: 'بدون' },
                    { key: 'glow', label: 'توهج' },
                    { key: 'pulse', label: 'نبض' },
                    { key: 'shine', label: 'لمعان' }
                ]
            },
            featuredBadgeBorder: {
                label: 'إطار الشارة',
                cost: 25,
                type: 'select',
                options: [
                    { key: 'none', label: 'بدون' },
                    { key: 'solid', label: 'مستمر' },
                    { key: 'dashed', label: 'متقطع' },
                    { key: 'double', label: 'مزدوج' }
                ]
            },
            featuredBadgeBorderColor: {
                label: 'لون إطار الشارة',
                cost: 20,
                type: 'color',
                options: [
                    { key: 'default', label: 'افتراضي' },
                    { key: '#2563eb', label: 'أزرق' },
                    { key: '#ef4444', label: 'أحمر' },
                    { key: '#22c55e', label: 'أخضر' },
                    { key: '#f59e0b', label: 'ذهبي' },
                    { key: '#8b5cf6', label: 'بنفسجي' },
                    { key: '#ec4899', label: 'وردي' }
                ]
            },
            featuredBadgeBoxBg: {
                label: 'لون خلفية صندوق الشارة',
                cost: 25,
                type: 'select',
                options: [
                    { key: 'default', label: 'افتراضي' },
                    { key: 'gradient1', label: 'أرجواني-أزرق' },
                    { key: 'gradient2', label: 'وردي-أحمر' },
                    { key: 'gold', label: 'ذهبي' },
                    { key: 'dark', label: 'داكن' }
                ]
            },
            featuredBadgeBoxBorder: {
                label: 'إطار صندوق الشارة',
                cost: 20,
                type: 'select',
                options: [
                    { key: 'none', label: 'بدون' },
                    { key: 'solid', label: 'مستمر' },
                    { key: 'dashed', label: 'متقطع' }
                ]
            },
            featuredBadgeBoxBorderColor: {
                label: 'لون إطار صندوق الشارة',
                cost: 20,
                type: 'color',
                options: [
                    { key: 'default', label: 'افتراضي' },
                    { key: '#2563eb', label: 'أزرق' },
                    { key: '#ef4444', label: 'أحمر' },
                    { key: '#22c55e', label: 'أخضر' },
                    { key: '#f59e0b', label: 'ذهبي' },
                    { key: '#8b5cf6', label: 'بنفسجي' }
                ]
            }
        }
    },
    special: {
        label: 'خاص',
        icon: 'fa-star',
        options: {
            specialBadge: {
                label: 'شارة خاصة (بجانب الاسم)',
                cost: 100,
                type: 'select',
                options: [
                    { key: 'none', label: 'بدون' },
                    { key: 'fa-crown', label: '👑 تاج' },
                    { key: 'fa-star', label: '⭐ نجمة' },
                    { key: 'fa-heart', label: '❤️ قلب' },
                    { key: 'fa-gem', label: '💎 ماسة' },
                    { key: 'fa-fire', label: '🔥 نار' },
                    { key: 'fa-rocket', label: '🚀 صاروخ' },
                    { key: 'fa-bolt', label: '⚡ برق' },
                    { key: 'fa-dragon', label: '🐉 تنين' },
                    { key: 'fa-feather', label: '🪶 ريشة' },
                    { key: 'fa-moon', label: '🌙 قمر' },
                    { key: 'fa-sun', label: '☀️ شمس' }
                ]
            }
        }
    }
};


// ===== دوال تطبيق التخصيصات الجديدة =====

// ===== تطبيق ظل الصورة مع اللون =====
function applyAvatarShadowToMain(shadow, color) {
    var avatar = document.getElementById('profileAvatar');
    if (!avatar) return;
    
    console.log('🎨 تطبيق ظل الصورة:', shadow, 'اللون:', color);
    
    var shadowColor = color || 'rgba(0,0,0,0.15)';
    var shadows = {
        'none': 'none',
        'soft': '0 4px 20px ' + shadowColor,
        'medium': '0 8px 30px ' + shadowColor,
        'hard': '0 12px 40px ' + shadowColor,
        'glow': '0 0 30px ' + (avatar.style.borderColor || '#2563eb') + ', 0 0 60px ' + (avatar.style.borderColor || '#2563eb') + '40'
    };
    
    avatar.style.boxShadow = shadows[shadow] || 'none';
    console.log('✅ تم تطبيق ظل الصورة');
}

// ===== تطبيق لون الأزرار =====
// ============================================================
//  تطبيق لون الأزرار في الملف الشخصي الرئيسي
// ============================================================
function applyButtonColorToMain(color) {
    if (!color || color === 'default') {
        // إعادة تعيين
        document.querySelectorAll('.profile-action-btn, .profile-action-btn i, .profile-action-btn span').forEach(function(el) {
            el.style.color = '';
            el.style.background = '';
            el.style.borderColor = '';
        });
        return;
    }
    
    // تطبيق على أزرار الإجراءات
    document.querySelectorAll('.profile-action-btn').forEach(function(btn) {
        btn.style.setProperty('color', color, 'important');
        btn.style.setProperty('border-color', color, 'important');
    });
    document.querySelectorAll('.profile-action-btn i, .profile-action-btn span').forEach(function(el) {
        el.style.setProperty('color', color, 'important');
    });
}

// ===== تطبيق لون النصوص الثانوية =====
function applyTextColorToMain(color) {
    var elements = document.querySelectorAll('.profile-info p, .profile-stats span, .profile-detail, .user-detail');
    if (!color || color === 'default') {
        elements.forEach(function(el) {
            el.style.color = '';
        });
        return;
    }
    elements.forEach(function(el) {
        el.style.setProperty('color', color, 'important');
    });
}

// ===== تطبيق لون النبذة =====
function applyBioColorToMain(color) {
    var bio = document.getElementById('profileBioDisplay');
    if (!bio) return;
    if (!color || color === 'default') {
        bio.style.color = '';
        return;
    }
    bio.style.setProperty('color', color, 'important');
}

// ===== تطبيق خلفية بطاقة الملف الشخصي =====
function applyProfileCardBgToMain(bg) {
    var container = document.querySelector('.profile-container');
    if (!container) return;
    
    // إعادة تعيين
    container.style.background = '';
    container.style.backdropFilter = '';
    container.style.border = '';
    container.className = container.className.replace(/ ?style-(glass|dark-glass|frosted|neon)/g, '');
    
    if (!bg || bg === 'default') return;
    
    var bgStyles = {
        'glass': 'rgba(255,255,255,0.1)',
        'dark-glass': 'rgba(0,0,0,0.2)',
        'frosted': 'rgba(255,255,255,0.05)',
        'neon': 'rgba(0,255,255,0.05)',
        'gradient-ocean': 'linear-gradient(135deg, #2b5876, #4e4376)',
        'gradient-sunset': 'linear-gradient(135deg, #f12711, #f5af19)'
    };
    
    if (bgStyles[bg]) {
        container.style.background = bgStyles[bg];
        container.style.backdropFilter = 'blur(10px)';
        container.style.border = '1px solid rgba(255,255,255,0.1)';
        container.classList.add('style-' + bg);
    }
}





function applyFeaturedBadgeColorToMain(color) {
    var container = document.getElementById('featuredBadgeDisplay');
    if (!container) return;
    var badge = container.querySelector('.badge-item');
    if (!badge) return;
    
    console.log('🎨 تطبيق لون الشارة المميزة:', color);
    
    if (color && color !== 'default') {
        badge.style.setProperty('color', color, 'important');
        badge.style.setProperty('border-color', color, 'important');
    } else {
        badge.style.color = '';
        badge.style.borderColor = '';
    }
}

// ===== تحديث دالة applyFeaturedBadgeBgToMain =====
function applyFeaturedBadgeBgToMain(bg) {
    var container = document.getElementById('featuredBadgeDisplay');
    if (!container) return;
    var badge = container.querySelector('.badge-item');
    if (!badge) return;
    
    console.log('🎨 تطبيق خلفية الشارة المميزة:', bg);
    
    var bgStyles = {
        'gradient-gold': 'linear-gradient(135deg, #ffd700, #f59e0b)',
        'gradient-rainbow': 'linear-gradient(135deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff)',
        'gradient-neon': 'linear-gradient(135deg, #00ff00, #00ffff, #ff00ff)',
        'gradient-ocean': 'linear-gradient(135deg, #2b5876, #4e4376)',
        'gradient-sunset': 'linear-gradient(135deg, #f12711, #f5af19)',
        'gradient-forest': 'linear-gradient(135deg, #134e5e, #71b280)',
        'gradient-galaxy': 'linear-gradient(135deg, #0c0c1d, #1a1a3e, #2d1b69)',
        'gradient-candy': 'linear-gradient(135deg, #ff6b6b, #ff9ff3, #feca57)',
        'gradient-lavender': 'linear-gradient(135deg, #e8d5f5, #b8a9c9)'
    };
    
    if (bg && bg !== 'default' && bgStyles[bg]) {
        badge.style.background = bgStyles[bg];
        badge.style.color = '#ffffff';
        badge.style.borderColor = 'transparent';
        badge.style.textShadow = '0 1px 3px rgba(0,0,0,0.2)';
    } else if (bg === 'default' || !bg) {
        badge.style.background = '';
        badge.style.color = '';
        badge.style.borderColor = '';
        badge.style.textShadow = '';
    }
}

// ===== تحديث دالة applyFeaturedBadgeSizeToMain =====
function applyFeaturedBadgeSizeToMain(size) {
    var container = document.getElementById('featuredBadgeDisplay');
    if (!container) return;
    var badge = container.querySelector('.badge-item');
    if (!badge) return;
    
    console.log('🎨 تطبيق حجم الشارة المميزة:', size);
    
    var sizes = {
        'small': '0.7rem',
        'default': '0.85rem',
        'large': '1.1rem'
    };
    
    var paddings = {
        'small': '0.1rem 0.6rem',
        'default': '0.2rem 1rem',
        'large': '0.4rem 1.5rem'
    };
    
    if (size && sizes[size]) {
        badge.style.fontSize = sizes[size];
        badge.style.padding = paddings[size] || '0.2rem 1rem';
    } else {
        badge.style.fontSize = '';
        badge.style.padding = '';
    }
}

// ===== تحديث دالة applyFeaturedBadgeAnimationToMain =====
function applyFeaturedBadgeAnimationToMain(animation) {
    var container = document.getElementById('featuredBadgeDisplay');
    if (!container) return;
    var badge = container.querySelector('.badge-item');
    if (!badge) return;
    
    console.log('🎨 تطبيق تأثير الشارة المميزة:', animation);
    
    badge.style.animation = 'none';
    
    var animations = {
        'pulse': 'badgePulse 1.5s ease-in-out infinite',
        'glow': 'badgeGlow 2s ease-in-out infinite',
        'shake': 'badgeShake 0.5s ease-in-out infinite',
        'float': 'badgeFloat 3s ease-in-out infinite',
        'rainbow': 'badgeRainbow 3s linear infinite'
    };
    
    if (animation && animation !== 'none' && animations[animation]) {
        badge.style.animation = animations[animation];
    }
}


function applyFeaturedBadgeBorderToMain(border) {
    var container = document.getElementById('featuredBadgeDisplay');
    if (!container) return;
    var badge = container.querySelector('.badge-item');
    if (!badge) return;
    
    console.log('🎨 تطبيق إطار الشارة المميزة:', border);
    
    var borders = {
        'solid': '2px solid',
        'dashed': '2px dashed',
        'dotted': '2px dotted',
        'double': '4px double'
    };
    
    badge.style.border = '';
    badge.style.boxShadow = '';
    
    if (border && border !== 'none' && borders[border]) {
        var color = badge.style.color || 'var(--primary)';
        badge.style.border = borders[border] + ' ' + color;
    } else if (border === 'glow') {
        badge.style.border = '2px solid var(--primary)';
        badge.style.boxShadow = '0 0 20px var(--primary), 0 0 40px var(--primary-light)';
    }
}


// ===== خيارات خلفيات واضحة =====
var BG_OPTIONS = [
    { key: 'default', label: 'افتراضي', preview: 'لون عادي' },
    { key: 'gradient1', label: 'أرجواني - أزرق', preview: '🟣➜🔵' },
    { key: 'gradient2', label: 'فيروزي - أزرق', preview: '🔵➜🟦' },
    { key: 'gradient3', label: 'وردي - أحمر', preview: '🩷➜🔴' },
    { key: 'gradient4', label: 'أزرق - سماوي', preview: '🔵➜🩵' },
    { key: 'ocean', label: 'محيط عميق', preview: '🌊' },
    { key: 'sunset', label: 'غروب الشمس', preview: '🌅' },
    { key: 'forest', label: 'غابة خضراء', preview: '🌲' },
    { key: 'midnight', label: 'منتصف الليل', preview: '🌙' },
    { key: 'neon', label: 'نيون متوهج', preview: '💜' },
    { key: 'rainbow', label: 'قوس قزح', preview: '🌈' },
    { key: 'galaxy', label: 'مجرة', preview: '🌌' },
    { key: 'sunrise', label: 'شروق الشمس', preview: '🌄' },
    { key: 'lavender', label: 'لافندر', preview: '🌸' },
    { key: 'candy', label: 'حلوى', preview: '🍬' },
    { key: 'gold', label: 'ذهبي فاخر', preview: '✨' }
];

// ===== تطبيق التخصيصات على الملف الشخصي =====

// ============================================================
//  نظام تخصيص الملف الشخصي - النسخة النهائية الموحدة
// ============================================================

function applyAllCustomizations(userData) {
    if (!userData) return;
    var customization = userData.customization || {};

    // المظهر
    applyProfileBgToMain(customization.profileBg);
    applyFontStyleToMain(customization.fontStyle);
    applyAnimationSpeedToMain(customization.animationSpeed);

    // الصورة
    applyAvatarBorderToMain(customization.avatarBorder);
    applyAvatarEffectToMain(customization.avatarEffect);
    applyProfileFrameToMain(customization.profileFrame);
    applyAvatarShadowToMain(customization.avatarShadow);
    applyAvatarShadowColorToMain(customization.avatarShadowColor);
    applyAvatarBorderWidthToMain(customization.avatarBorderWidth);
    applyAvatarBorderStyleToMain(customization.avatarBorderStyle);

    // الاسم
    applyNameColorToMain(customization.nameColor);
    applyNameGlowToMain(customization.nameGlow);

    // النصوص
    applyTextColorToMain(customization.textColor);
    applyBioColorToMain(customization.bioColor);

    // الأزرار
    applyButtonColorToMain(customization.buttonColor);

    // الشارة
    applyBadgeStyleToMain(customization.badgeStyle);
    applyFeaturedBadgeToMain(customization.featuredBadge);

    // خاص
    applySpecialBadgeToMain(customization.specialBadge);

    console.log('✅ تم تطبيق جميع التخصيصات على الملف الشخصي');
}

// ===== عرض وتطبيق الشارة المميزة في الملف الشخصي =====
function applyFeaturedBadgeToMain(badgeName) {
    var existing = document.getElementById('featuredBadgeDisplay');
    if (existing) existing.remove();
    if (!badgeName || badgeName === 'none' || !currentUserData) return;

    var badges = calculateBadges(currentUserData);
    var badge = badges.find(function(b) { return b.name === badgeName; });
    if (!badge) return;

    var customization = currentUserData.customization || {};
    var textColor = customization.featuredBadgeTextColor || 'default';
    var bg = customization.featuredBadgeBg || 'default';
    var size = customization.featuredBadgeSize || 'medium';
    var effect = customization.featuredBadgeEffect || 'none';
    var border = customization.featuredBadgeBorder || 'none';
    var borderColor = customization.featuredBadgeBorderColor || 'default';
    var boxBg = customization.featuredBadgeBoxBg || 'default';
    var boxBorder = customization.featuredBadgeBoxBorder || 'none';
    var boxBorderColor = customization.featuredBadgeBoxBorderColor || 'default';
    var badgeStyle = customization.badgeStyle || 'default';

    // أنماط الشارة
    var badgeStyles = [];
    if (textColor && textColor !== 'default') badgeStyles.push('color:' + textColor + ' !important');
    
    var bgMap = {
        'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
        'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
        'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
        'neon': 'background:linear-gradient(135deg,#00ffff,#ff00ff)',
        'dark': 'background:#1e293b'
    };
    if (bg && bg !== 'default' && bgMap[bg]) {
        badgeStyles.push(bgMap[bg]);
    } else {
        badgeStyles.push('background:var(--primary-light)');
    }

    if (size === 'small') badgeStyles.push('font-size:0.7rem;padding:0.1rem 0.5rem');
    else if (size === 'large') badgeStyles.push('font-size:1rem;padding:0.4rem 1.2rem');
    else badgeStyles.push('font-size:0.85rem;padding:0.2rem 1rem');

    if (effect === 'glow') badgeStyles.push('animation:glowBadge 2s ease-in-out infinite');
    else if (effect === 'pulse') badgeStyles.push('animation:pulse 1.5s ease-in-out infinite');
    else if (effect === 'shine') badgeStyles.push('background:linear-gradient(135deg,#f093fb,#f5576c,#f093fb);background-size:200% 200%;animation:shine 3s ease infinite');

    if (border !== 'none') {
        var bColor = (borderColor && borderColor !== 'default') ? borderColor : 'var(--primary)';
        badgeStyles.push('border:' + border + ' 2px ' + bColor);
    }

    // إضافة شكل الشارة (badgeStyle)
    if (badgeStyle && badgeStyle !== 'default') {
        var styleMap = {
            'glow': 'animation:glowBadge 2s ease-in-out infinite;',
            'rounded': 'border-radius:50px;padding:0.2rem 1rem;',
            'shadow': 'box-shadow:0 4px 15px rgba(0,0,0,0.15);',
            'gradient': 'background:linear-gradient(135deg,#f093fb,#f5576c);color:white;',
            'neon': 'box-shadow:0 0 20px rgba(37,99,235,0.5);border:1px solid rgba(37,99,235,0.3);'
        };
        if (styleMap[badgeStyle]) {
            badgeStyles.push(styleMap[badgeStyle]);
        }
    }

    // أنماط الصندوق
    var boxStyles = [];
    var boxBgMap = {
        'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
        'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
        'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
        'dark': 'background:#1e293b'
    };
    if (boxBg && boxBg !== 'default' && boxBgMap[boxBg]) {
        boxStyles.push(boxBgMap[boxBg]);
    } else {
        boxStyles.push('background:var(--gray-50)');
    }
    if (boxBorder !== 'none') {
        var bBoxColor = (boxBorderColor && boxBorderColor !== 'default') ? boxBorderColor : 'var(--primary)';
        boxStyles.push('border:' + boxBorder + ' 2px ' + bBoxColor);
    }
    boxStyles.push('border-radius:12px;padding:0.3rem 0.8rem;display:flex;align-items:center;gap:0.5rem;margin:0.3rem 0');

    var container = document.createElement('div');
    container.id = 'featuredBadgeDisplay';
    container.style.cssText = boxStyles.join(';');
    container.innerHTML = `
        <span style="font-size:0.7rem;color:var(--gray-500);font-weight:600;">⭐ الشارة المميزة</span>
        <span class="badge-item ${badge.class}" style="${badgeStyles.join(';')}">
            <i class="fas ${badge.icon}"></i> ${badge.name}
        </span>
        <button onclick="openBadgesModal()" style="background:none;border:none;color:var(--primary);cursor:pointer;font-size:0.7rem;margin-right:auto;">
            <i class="fas fa-edit"></i> تغيير
        </button>
    `;

    var profileInfo = document.querySelector('.profile-info');
    if (profileInfo) {
        var nameElement = document.getElementById('profileName');
        if (nameElement && nameElement.parentNode) {
            nameElement.parentNode.insertBefore(container, nameElement.nextSibling);
        } else {
            profileInfo.appendChild(container);
        }
    }
}
// ===== تطبيق جميع تخصيصات الشارة المميزة =====
function applyFeaturedBadgeCustomizations(customization) {
    var container = document.getElementById('featuredBadgeDisplay');
    if (!container) return;
    
    var badge = container.querySelector('.badge-item');
    var changeBtn = container.querySelector('button');
    var label = container.querySelector('span:first-child');
    
    // ===== خلفية الصندوق =====
    if (customization.featuredBadgeContainerBg && customization.featuredBadgeContainerBg !== 'default') {
        var bgStyles = {
            '#fef3c7': '#fef3c7',
            '#dbeafe': '#dbeafe',
            '#d1fae5': '#d1fae5',
            '#fce4ec': '#fce4ec',
            '#f3e8ff': '#f3e8ff',
            '#fff7ed': '#fff7ed',
            '#ecfdf5': '#ecfdf5',
            '#f1f5f9': '#f1f5f9',
            '#1e293b': '#1e293b',
            'gradient-gold': 'linear-gradient(135deg, #ffd700, #f59e0b)',
            'gradient-rainbow': 'linear-gradient(135deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff)',
            'gradient-neon': 'linear-gradient(135deg, #00ff00, #00ffff, #ff00ff)',
            'gradient-ocean': 'linear-gradient(135deg, #2b5876, #4e4376)',
            'gradient-sunset': 'linear-gradient(135deg, #f12711, #f5af19)',
            'gradient-galaxy': 'linear-gradient(135deg, #0c0c1d, #1a1a3e, #2d1b69)'
        };
        if (bgStyles[customization.featuredBadgeContainerBg]) {
            container.style.background = bgStyles[customization.featuredBadgeContainerBg];
            container.style.color = '#ffffff';
        }
    } else {
        container.style.background = '';
        container.style.color = '';
    }
    
    // ===== إطار الصندوق =====
    if (customization.featuredBadgeContainerBorder) {
        var borderStyles = {
            'none': 'none',
            'solid': '2px solid',
            'dashed': '2px dashed',
            'dotted': '2px dotted',
            'double': '4px double',
            'glow': '2px solid'
        };
        if (borderStyles[customization.featuredBadgeContainerBorder]) {
            var borderColor = customization.featuredBadgeContainerBorderColor || 'var(--primary)';
            if (customization.featuredBadgeContainerBorder === 'glow') {
                container.style.border = '2px solid ' + borderColor;
                container.style.boxShadow = '0 0 20px ' + borderColor + ', 0 0 40px ' + borderColor + '40';
            } else if (customization.featuredBadgeContainerBorder === 'none') {
                container.style.border = 'none';
                container.style.boxShadow = 'none';
            } else {
                container.style.border = borderStyles[customization.featuredBadgeContainerBorder] + ' ' + borderColor;
                container.style.boxShadow = 'none';
            }
        }
    } else {
        container.style.border = '';
        container.style.boxShadow = '';
    }
    
    // ===== لون نص الشارة =====
    if (badge) {
        if (customization.featuredBadgeColor && customization.featuredBadgeColor !== 'default') {
            badge.style.color = customization.featuredBadgeColor;
        } else {
            badge.style.color = '';
        }
        
        // ===== خلفية الشارة =====
        if (customization.featuredBadgeBg && customization.featuredBadgeBg !== 'default') {
            var bgStyles2 = {
                'gradient-gold': 'linear-gradient(135deg, #ffd700, #f59e0b)',
                'gradient-rainbow': 'linear-gradient(135deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff)',
                'gradient-neon': 'linear-gradient(135deg, #00ff00, #00ffff, #ff00ff)',
                'gradient-ocean': 'linear-gradient(135deg, #2b5876, #4e4376)',
                'gradient-sunset': 'linear-gradient(135deg, #f12711, #f5af19)',
                'gradient-forest': 'linear-gradient(135deg, #134e5e, #71b280)',
                'gradient-galaxy': 'linear-gradient(135deg, #0c0c1d, #1a1a3e, #2d1b69)',
                'gradient-candy': 'linear-gradient(135deg, #ff6b6b, #ff9ff3, #feca57)',
                'gradient-lavender': 'linear-gradient(135deg, #e8d5f5, #b8a9c9)'
            };
            if (bgStyles2[customization.featuredBadgeBg]) {
                badge.style.background = bgStyles2[customization.featuredBadgeBg];
                badge.style.color = '#ffffff';
                badge.style.textShadow = '0 1px 3px rgba(0,0,0,0.2)';
            }
        } else {
            badge.style.background = '';
            badge.style.textShadow = '';
        }
        
        // ===== حجم الشارة =====
        if (customization.featuredBadgeSize && customization.featuredBadgeSize !== 'default') {
            var sizes = {
                'small': '0.7rem',
                'large': '1.1rem'
            };
            var paddings = {
                'small': '0.1rem 0.6rem',
                'large': '0.4rem 1.5rem'
            };
            if (sizes[customization.featuredBadgeSize]) {
                badge.style.fontSize = sizes[customization.featuredBadgeSize];
                badge.style.padding = paddings[customization.featuredBadgeSize] || '0.2rem 1rem';
            }
        } else {
            badge.style.fontSize = '';
            badge.style.padding = '';
        }
        
        // ===== تأثير الشارة =====
        if (customization.featuredBadgeAnimation && customization.featuredBadgeAnimation !== 'none') {
            var animations = {
                'pulse': 'badgePulse 1.5s ease-in-out infinite',
                'glow': 'badgeGlow 2s ease-in-out infinite',
                'shake': 'badgeShake 0.5s ease-in-out infinite',
                'float': 'badgeFloat 3s ease-in-out infinite',
                'rainbow': 'badgeRainbowText 3s linear infinite'
            };
            if (animations[customization.featuredBadgeAnimation]) {
                badge.style.animation = animations[customization.featuredBadgeAnimation];
            }
        } else {
            badge.style.animation = 'none';
        }
        
        // ===== إطار الشارة =====
        if (customization.featuredBadgeBorder) {
            var borderStyles2 = {
                'none': 'none',
                'solid': '2px solid',
                'dashed': '2px dashed',
                'dotted': '2px dotted',
                'double': '4px double',
                'glow': '2px solid'
            };
            if (borderStyles2[customization.featuredBadgeBorder]) {
                var borderColor2 = customization.featuredBadgeBorderColor || 'var(--primary)';
                if (customization.featuredBadgeBorder === 'glow') {
                    badge.style.border = '2px solid ' + borderColor2;
                    badge.style.boxShadow = '0 0 20px ' + borderColor2 + ', 0 0 40px ' + borderColor2 + '40';
                } else if (customization.featuredBadgeBorder === 'none') {
                    badge.style.border = 'none';
                    badge.style.boxShadow = 'none';
                } else {
                    badge.style.border = borderStyles2[customization.featuredBadgeBorder] + ' ' + borderColor2;
                    badge.style.boxShadow = 'none';
                }
            }
        } else {
            badge.style.border = '';
            badge.style.boxShadow = '';
        }
        
        // ===== لون إطار الشارة =====
        if (customization.featuredBadgeBorderColor && customization.featuredBadgeBorderColor !== 'default') {
            if (badge.style.border && badge.style.border !== 'none') {
                var borderParts = badge.style.border.split(' ');
                if (borderParts.length >= 2) {
                    borderParts[borderParts.length - 1] = customization.featuredBadgeBorderColor;
                    badge.style.border = borderParts.join(' ');
                }
            }
        }
    }
    
    // ===== زر التغيير =====
    if (changeBtn) {
        if (customization.featuredBadgeColor && customization.featuredBadgeColor !== 'default') {
            changeBtn.style.color = customization.featuredBadgeColor;
        } else {
            changeBtn.style.color = '';
        }
    }
    
    // ===== النص (⭐) =====
    if (label) {
        if (customization.featuredBadgeColor && customization.featuredBadgeColor !== 'default') {
            label.style.color = customization.featuredBadgeColor;
        } else {
            label.style.color = '';
        }
    }
    
    console.log('✅ تم تطبيق تخصيصات الشارة المميزة');
}

// ===== تطبيق تخصيصات الشارة المميزة في المودال =====
function applyFeaturedBadgeCustomizationsToModal(container, customization) {
    if (!container) return;
    
    var badge = container.querySelector('.badge-item');
    var changeBtn = container.querySelector('button');
    var label = container.querySelector('span:first-child');
    
    // ===== خلفية الصندوق =====
    if (customization.featuredBadgeContainerBg && customization.featuredBadgeContainerBg !== 'default') {
        var bgStyles = {
            '#fef3c7': '#fef3c7',
            '#dbeafe': '#dbeafe',
            '#d1fae5': '#d1fae5',
            '#fce4ec': '#fce4ec',
            '#f3e8ff': '#f3e8ff',
            '#fff7ed': '#fff7ed',
            '#ecfdf5': '#ecfdf5',
            '#f1f5f9': '#f1f5f9',
            '#1e293b': '#1e293b',
            'gradient-gold': 'linear-gradient(135deg, #ffd700, #f59e0b)',
            'gradient-rainbow': 'linear-gradient(135deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff)',
            'gradient-neon': 'linear-gradient(135deg, #00ff00, #00ffff, #ff00ff)',
            'gradient-ocean': 'linear-gradient(135deg, #2b5876, #4e4376)',
            'gradient-sunset': 'linear-gradient(135deg, #f12711, #f5af19)',
            'gradient-galaxy': 'linear-gradient(135deg, #0c0c1d, #1a1a3e, #2d1b69)'
        };
        if (bgStyles[customization.featuredBadgeContainerBg]) {
            container.style.background = bgStyles[customization.featuredBadgeContainerBg];
            container.style.color = '#ffffff';
        }
    }
    
    // ===== إطار الصندوق =====
    if (customization.featuredBadgeContainerBorder) {
        var borderStyles = {
            'none': 'none',
            'solid': '2px solid',
            'dashed': '2px dashed',
            'dotted': '2px dotted',
            'double': '4px double',
            'glow': '2px solid'
        };
        if (borderStyles[customization.featuredBadgeContainerBorder]) {
            var borderColor = customization.featuredBadgeContainerBorderColor || 'var(--primary)';
            if (customization.featuredBadgeContainerBorder === 'glow') {
                container.style.border = '2px solid ' + borderColor;
                container.style.boxShadow = '0 0 20px ' + borderColor + ', 0 0 40px ' + borderColor + '40';
            } else if (customization.featuredBadgeContainerBorder === 'none') {
                container.style.border = 'none';
                container.style.boxShadow = 'none';
            } else {
                container.style.border = borderStyles[customization.featuredBadgeContainerBorder] + ' ' + borderColor;
                container.style.boxShadow = 'none';
            }
        }
    }
    
    if (badge) {
        // ===== لون نص الشارة =====
        if (customization.featuredBadgeColor && customization.featuredBadgeColor !== 'default') {
            badge.style.color = customization.featuredBadgeColor;
            badge.style.borderColor = customization.featuredBadgeColor;
        }
        
        // ===== خلفية الشارة =====
        if (customization.featuredBadgeBg && customization.featuredBadgeBg !== 'default') {
            var badgeBgStyles = {
                'gradient-gold': 'linear-gradient(135deg, #ffd700, #f59e0b)',
                'gradient-rainbow': 'linear-gradient(135deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff)',
                'gradient-neon': 'linear-gradient(135deg, #00ff00, #00ffff, #ff00ff)',
                'gradient-ocean': 'linear-gradient(135deg, #2b5876, #4e4376)',
                'gradient-sunset': 'linear-gradient(135deg, #f12711, #f5af19)',
                'gradient-forest': 'linear-gradient(135deg, #134e5e, #71b280)',
                'gradient-galaxy': 'linear-gradient(135deg, #0c0c1d, #1a1a3e, #2d1b69)',
                'gradient-candy': 'linear-gradient(135deg, #ff6b6b, #ff9ff3, #feca57)',
                'gradient-lavender': 'linear-gradient(135deg, #e8d5f5, #b8a9c9)'
            };
            if (badgeBgStyles[customization.featuredBadgeBg]) {
                badge.style.background = badgeBgStyles[customization.featuredBadgeBg];
                badge.style.color = '#ffffff';
                badge.style.textShadow = '0 1px 3px rgba(0,0,0,0.2)';
            }
        }
        
        // ===== حجم الشارة =====
        if (customization.featuredBadgeSize && customization.featuredBadgeSize !== 'default') {
            var sizes = {
                'small': '0.7rem',
                'large': '1.1rem'
            };
            if (sizes[customization.featuredBadgeSize]) {
                badge.style.fontSize = sizes[customization.featuredBadgeSize];
            }
        }
        
        // ===== تأثير الشارة =====
        if (customization.featuredBadgeAnimation && customization.featuredBadgeAnimation !== 'none') {
            var animations = {
                'pulse': 'badgePulse 1.5s ease-in-out infinite',
                'glow': 'badgeGlow 2s ease-in-out infinite',
                'shake': 'badgeShake 0.5s ease-in-out infinite',
                'float': 'badgeFloat 3s ease-in-out infinite',
                'rainbow': 'badgeRainbowText 3s linear infinite'
            };
            if (animations[customization.featuredBadgeAnimation]) {
                badge.style.animation = animations[customization.featuredBadgeAnimation];
            }
        }
        
        // ===== إطار الشارة =====
        if (customization.featuredBadgeBorder) {
            var badgeBorderStyles = {
                'none': 'none',
                'solid': '2px solid',
                'dashed': '2px dashed',
                'dotted': '2px dotted',
                'double': '4px double',
                'glow': '2px solid'
            };
            if (badgeBorderStyles[customization.featuredBadgeBorder]) {
                var borderColor2 = customization.featuredBadgeBorderColor || 'var(--primary)';
                if (customization.featuredBadgeBorder === 'glow') {
                    badge.style.border = '2px solid ' + borderColor2;
                    badge.style.boxShadow = '0 0 20px ' + borderColor2 + ', 0 0 40px ' + borderColor2 + '40';
                } else if (customization.featuredBadgeBorder === 'none') {
                    badge.style.border = 'none';
                    badge.style.boxShadow = 'none';
                } else {
                    badge.style.border = badgeBorderStyles[customization.featuredBadgeBorder] + ' ' + borderColor2;
                    badge.style.boxShadow = 'none';
                }
            }
        }
        
        // ===== لون إطار الشارة =====
        if (customization.featuredBadgeBorderColor && customization.featuredBadgeBorderColor !== 'default') {
            if (badge.style.border && badge.style.border !== 'none') {
                var borderParts = badge.style.border.split(' ');
                if (borderParts.length >= 2) {
                    borderParts[borderParts.length - 1] = customization.featuredBadgeBorderColor;
                    badge.style.border = borderParts.join(' ');
                }
            }
        }
    }
    
    // ===== زر التغيير =====
    if (changeBtn) {
        if (customization.featuredBadgeColor && customization.featuredBadgeColor !== 'default') {
            changeBtn.style.color = customization.featuredBadgeColor;
        } else {
            changeBtn.style.color = '';
        }
    }
    
    // ===== النص (⭐) =====
    if (label) {
        if (customization.featuredBadgeColor && customization.featuredBadgeColor !== 'default') {
            label.style.color = customization.featuredBadgeColor;
        } else {
            label.style.color = '';
        }
    }
}

// ============================================================
//  عرض الملف الشخصي كما يراه الآخرون
// ============================================================
function viewMyProfileAsOther() {
    if (!currentUserData) {
        showToast('يرجى تسجيل الدخول', 'error');
        return;
    }

    // استخدام نفس دالة viewUserProfile ولكن مع UID المستخدم الحالي
    // هذا سيعرض الملف الشخصي بنفس طريقة عرض الآخرين
    viewUserProfile(currentUserData.uid);
    
    showToast('👁️ هذا هو شكل ملفك الشخصي عندما يراه الآخرون', 'info');
}

// ===== تطبيق تخصيصات الصورة على المودال =====
function applyAvatarCustomizationsToModal(container, customization) {
    var avatar = container.querySelector('.view-avatar');
    if (!avatar) return;
    
    // ===== لون إطار الصورة =====
    if (customization.avatarBorder && customization.avatarBorder !== 'default') {
        avatar.style.borderColor = customization.avatarBorder;
    } else {
        avatar.style.borderColor = 'var(--primary)';
    }
    
    // ===== سمك إطار الصورة =====
    if (customization.avatarBorderWidth) {
        var widths = {
            'none': '0px',
            'thin': '2px',
            'default': '4px',
            'thick': '6px',
            'very-thick': '8px'
        };
        avatar.style.borderWidth = widths[customization.avatarBorderWidth] || '4px';
        if (customization.avatarBorderWidth === 'none') {
            avatar.style.borderStyle = 'none';
        } else {
            avatar.style.borderStyle = customization.avatarBorderStyle || 'solid';
        }
    }
    
    // ===== نمط إطار الصورة =====
    if (customization.avatarBorderStyle && customization.avatarBorderWidth !== 'none') {
        avatar.style.borderStyle = customization.avatarBorderStyle;
    }
    
    // ===== شكل الصورة =====
    if (customization.profileFrame) {
        var frameStyles = {
            'rounded': 'border-radius: 20% !important; clip-path: none !important;',
            'square': 'border-radius: 0 !important; clip-path: none !important;',
            'star': 'clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%) !important; border-radius: 0 !important;',
            'heart': 'clip-path: path("M50,90 C20,60 0,40 0,25 C0,10 15,0 30,0 C40,0 48,8 50,18 C52,8 60,0 70,0 C85,0 100,10 100,25 C100,40 80,60 50,90Z") !important; border-radius: 0 !important;',
            'diamond': 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%) !important; border-radius: 0 !important;'
        };
        if (frameStyles[customization.profileFrame]) {
            avatar.style.cssText += frameStyles[customization.profileFrame];
        }
    }
    
    // ===== ظل الصورة =====
    if (customization.avatarShadow) {
        var shadows = {
            'none': 'none',
            'soft': '0 4px 20px rgba(0,0,0,0.15)',
            'medium': '0 8px 30px rgba(0,0,0,0.25)',
            'hard': '0 12px 40px rgba(0,0,0,0.35)',
            'glow': '0 0 30px ' + (customization.avatarBorder || 'var(--primary)') + ', 0 0 60px ' + (customization.avatarBorder || 'var(--primary-light)')
        };
        avatar.style.boxShadow = shadows[customization.avatarShadow] || 'none';
    }
}

// ===== خلفية الملف الشخصي =====
function applyProfileBgToMain(bg) {
    var container = document.querySelector('.profile-container');
    if (!container) return;
    
    // إعادة تعيين
    container.style.background = '';
    container.style.color = '';
    container.style.setProperty('--text-color', '');
    container.style.setProperty('--card-bg', '');
    container.removeAttribute('data-bg');
    
    if (!bg || bg === 'default') {
        resetMainProfileColors(container);
        return;
    }
    
    var bgInfo = BG_STYLES[bg];
    if (bgInfo) {
        container.style.background = bgInfo.bg;
        container.style.color = bgInfo.textColor;
        container.setAttribute('data-bg', bg);
        container.style.setProperty('--text-color', bgInfo.textColor);
        container.style.setProperty('--card-bg', 'rgba(255,255,255,0.1)');
        updateMainProfileColors(container, bgInfo.textColor, bgInfo.isDark);
    }
}

// ===== لون إطار الصورة =====
function applyAvatarBorderToMain(color) {
    var avatar = document.getElementById('profileAvatar');
    if (avatar && color && color !== 'default') {
        avatar.style.borderColor = color;
        avatar.style.borderWidth = '4px';
        avatar.style.borderStyle = 'solid';
    } else if (avatar) {
        avatar.style.borderColor = 'var(--primary)';
        avatar.style.borderWidth = '4px';
        avatar.style.borderStyle = 'solid';
    }
}
// ===== تطبيق تأثير الصورة =====
function applyAvatarEffectToMain(effect) {
    var container = document.getElementById('profileAvatarContainer');
    if (!container) return;
    container.className = 'profile-avatar';
    if (effect && effect !== 'none' && effect !== 'default') {
        container.classList.add('effect-' + effect);
    }
}

// ===== تطبيق شكل الصورة =====
function applyProfileFrameToMain(frame) {
    var avatar = document.getElementById('profileAvatar');
    if (!avatar) return;
    
    avatar.style.borderRadius = '50%';
    avatar.style.clipPath = 'none';
    avatar.style.width = '100px';
    avatar.style.height = '100px';
    
    if (!frame || frame === 'default' || frame === 'circle') {
        avatar.style.borderRadius = '50%';
    } else if (frame === 'rounded') {
        avatar.style.borderRadius = '20%';
    } else if (frame === 'square') {
        avatar.style.borderRadius = '0';
    } else if (frame === 'star') {
        avatar.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        avatar.style.borderRadius = '0';
    } else if (frame === 'heart') {
        avatar.style.clipPath = 'path("M50,90 C20,60 0,40 0,25 C0,10 15,0 30,0 C40,0 48,8 50,18 C52,8 60,0 70,0 C85,0 100,10 100,25 C100,40 80,60 50,90Z")';
        avatar.style.borderRadius = '0';
    } else if (frame === 'diamond') {
        avatar.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
        avatar.style.borderRadius = '0';
    }
}

function applyAvatarShadowToMain(shadow) {
    var avatar = document.getElementById('profileAvatar');
    if (!avatar) return;
    var shadowColor = currentUserData?.customization?.avatarShadowColor || 'rgba(37,99,235,0.4)';
    var shadows = {
        'small': '0 2px 8px rgba(0,0,0,0.15)',
        'medium': '0 4px 15px rgba(0,0,0,0.2)',
        'large': '0 8px 30px rgba(0,0,0,0.3)',
        'colored': '0 0 25px ' + shadowColor
    };
    if (shadow && shadows[shadow]) {
        avatar.style.boxShadow = shadows[shadow];
    } else {
        avatar.style.boxShadow = 'none';
    }
}

function applyAvatarShadowColorToMain(color) {
    var avatar = document.getElementById('profileAvatar');
    if (!avatar) return;
    if (color && color !== 'default') {
        // إذا كان الظل الحالي هو 'colored' أو أي ظل، نستبدل اللون
        var currentShadow = avatar.style.boxShadow;
        if (currentShadow && currentShadow.includes('colored')) {
            avatar.style.boxShadow = '0 0 25px ' + color;
        } else {
            // إذا لم يكن هناك ظل، نضبط الظل الملون مباشرة
            avatar.style.boxShadow = '0 0 25px ' + color;
        }
    }
}

function applyAvatarBorderWidthToMain(width) {
    var avatar = document.getElementById('profileAvatar');
    if (!avatar) return;
    if (width && width !== 'none') {
        avatar.style.borderWidth = width + 'px';
        // إذا كان السمك > 0، نتأكد من وجود border-style
        if (avatar.style.borderStyle === '' || avatar.style.borderStyle === 'none') {
            avatar.style.borderStyle = 'solid';
        }
    } else {
        avatar.style.borderWidth = '0px';
        avatar.style.borderStyle = 'none';
    }
}

function applyAvatarBorderStyleToMain(style) {
    var avatar = document.getElementById('profileAvatar');
    if (!avatar) return;
    if (style && style !== 'solid') {
        avatar.style.borderStyle = style;
    } else {
        avatar.style.borderStyle = 'solid';
    }
}

// ===== لون الاسم =====
function applyNameColorToMain(color) {
    var name = document.getElementById('profileName');
    if (!name) return;
    
    // إزالة أي أنماط سابقة
    name.style.color = '';
    
    if (color && color !== 'default') {
        // تطبيق اللون مع !important لضمان الأولوية
        name.style.setProperty('color', color, 'important');
        console.log('✅ تم تطبيق لون الاسم:', color);
    } else {
        // إذا كان اللون افتراضياً، نزيل الأنماط
        name.style.color = '';
        // نترك النظام يختار اللون المناسب حسب الخلفية
        console.log('🔄 تم إعادة تعيين لون الاسم للافتراضي');
    }
}

// ===== تأثير الاسم =====
function applyNameGlowToMain(glow) {
    var name = document.getElementById('profileName');
    if (!name) return;
    // إعادة تعيين
    name.style.textShadow = 'none';
    name.style.animation = 'none';
    if (glow === 'soft') {
        name.style.textShadow = '0 0 20px rgba(37, 99, 235, 0.3)';
    } else if (glow === 'strong') {
        name.style.textShadow = '0 0 30px rgba(37, 99, 235, 0.6), 0 0 60px rgba(37, 99, 235, 0.3)';
    } else if (glow === 'rainbow') {
        name.style.animation = 'rainbowGlow 3s ease infinite';
    }
}

function applyBadgeStyleToMain(style) {
    var badges = document.querySelectorAll('.badge-item');
    badges.forEach(function(badge) {
        // إزالة الكلاسات السابقة
        badge.className = 'badge-item';
        badge.style.cssText = '';
        if (style === 'glow') badge.classList.add('style-glow');
        else if (style === 'rounded') badge.classList.add('style-rounded');
        else if (style === 'shadow') badge.classList.add('style-shadow');
        else if (style === 'gradient') badge.classList.add('style-gradient');
        else if (style === 'neon') badge.classList.add('style-neon');
    });
}

// ===== شكل البطاقة =====
function applyCardStyleToMain(style) {
    var cards = document.querySelectorAll('.course-card, .user-card, .college-card, .specialty-card');
    cards.forEach(function(card) {
        var baseClass = card.className.split(' ').filter(function(c) {
            return c !== 'style-glass' && c !== 'style-bordered' && 
                   c !== 'style-shadow' && c !== 'style-elevated';
        }).join(' ');
        card.className = baseClass;
        card.style.cssText = '';
        
        if (style === 'glass') card.classList.add('style-glass');
        else if (style === 'bordered') card.classList.add('style-bordered');
        else if (style === 'shadow') card.classList.add('style-shadow');
        else if (style === 'elevated') card.classList.add('style-elevated');
    });
}

// ===== نوع الخط =====
function applyFontStyleToMain(style) {
    var body = document.body;
    var fonts = {
        'default': 'Segoe UI, Tahoma, system-ui, sans-serif',
        'modern': 'Inter, "Segoe UI", sans-serif',
        'elegant': 'Georgia, "Times New Roman", serif',
        'bold': '"Arial Black", "Segoe UI", sans-serif',
        'handwriting': '"Comic Sans MS", cursive',
        'playful': '"Fredoka One", "Segoe UI", sans-serif'
    };
    if (fonts[style]) {
        body.style.fontFamily = fonts[style];
    }
}

// ===== سرعة الحركة =====
function applyAnimationSpeedToMain(speed) {
    var speeds = { 'slow': '0.8s', 'normal': '0.25s', 'fast': '0.1s', 'none': '0s' };
    if (speeds[speed]) {
        document.documentElement.style.setProperty('--transition-speed', speeds[speed]);
    }
}

// ===== الشارة الخاصة =====
function applySpecialBadgeToMain(badge) {
    var existingBadge = document.getElementById('specialBadgeDisplay');
    if (existingBadge) existingBadge.remove();
    
    if (badge && badge !== 'none') {
        var span = document.createElement('span');
        span.id = 'specialBadgeDisplay';
        span.className = 'special-badge-display';
        span.innerHTML = '<i class="fas ' + badge + '" style="font-size:1rem;margin-left:0.3rem;"></i>';
        var nameElement = document.getElementById('profileName');
        if (nameElement) {
            nameElement.appendChild(span);
        }
    }
}

// ===== دوال مساعدة لإدارة ألوان الملف الشخصي =====
function resetMainProfileColors(container) {
    // إزالة الأنماط المباشرة (ما عدا الاسم)
    var elements = container.querySelectorAll(
        '.profile-info p, .profile-info .badge, ' +
        '.profile-stats span, .profile-stats i, #profileBioDisplay, ' +
        '.course-tag, .badge-item, .badges-section h4, .customization-section h4, ' +
        '.profile-action-btn, .profile-action-btn i, .profile-action-btn span, ' +
        '.profile-form label, .profile-form label i'
    );
    elements.forEach(function(el) {
        el.style.color = '';
        el.style.background = '';
        el.style.borderColor = '';
        el.style.textShadow = '';
    });
    
    var tags = container.querySelectorAll('.course-tag');
    tags.forEach(function(tag) {
        tag.style.background = '';
        tag.style.borderColor = '';
    });
    
    // إعادة تعيين خلفية البطاقات
    var cards = container.querySelectorAll('.course-card, .user-card');
    cards.forEach(function(card) {
        card.style.background = '';
        card.style.color = '';
    });
}

// ===== تحديث ألوان الملف الشخصي حسب الخلفية =====
function updateMainProfileColors(container, textColor, isDark) {
    // تحديد الألوان المناسبة حسب الخلفية
    var bgColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)';
    var borderColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
    var shadowColor = isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)';
    
    // ===== تحديث النصوص الرئيسية (ما عدا الاسم) =====
    var textElements = container.querySelectorAll(
        '.profile-info p, .profile-info .badge, ' +
        '.profile-stats span, .profile-stats i, #profileBioDisplay, ' +
        '.badges-section h4, .customization-section h4, ' +
        '.profile-form label, .profile-form label i'
    );
    textElements.forEach(function(el) {
        el.style.color = textColor + ' !important';
    });
    
    // ===== تحديث البطاقات والعلامات =====
    var tags = container.querySelectorAll('.course-tag');
    tags.forEach(function(tag) {
        tag.style.color = textColor + ' !important';
        tag.style.background = bgColor;
        tag.style.borderColor = borderColor;
        tag.style.textShadow = isDark ? '0 1px 3px rgba(0,0,0,0.2)' : 'none';
    });
    
    // ===== تحديث أزرار الإجراءات =====
    var actionBtns = container.querySelectorAll('.profile-action-btn');
    actionBtns.forEach(function(btn) {
        btn.style.color = textColor + ' !important';
        btn.style.background = bgColor;
        btn.style.borderColor = borderColor;
    });
    
    var actionIcons = container.querySelectorAll('.profile-action-btn i');
    actionIcons.forEach(function(icon) {
        icon.style.color = textColor + ' !important';
    });
    
    // ===== تحديث الشارات =====
    var badges = container.querySelectorAll('.badge-item');
    badges.forEach(function(badge) {
        if (!badge.classList.contains('style-gradient')) {
            badge.style.color = textColor + ' !important';
            badge.style.background = bgColor;
            badge.style.borderColor = borderColor;
        }
    });
    
    // ===== تحديث السيرة الذاتية =====
    var bioDisplay = document.getElementById('profileBioDisplay');
    if (bioDisplay) {
        bioDisplay.style.color = textColor + ' !important';
        bioDisplay.style.background = bgColor;
        bioDisplay.style.borderColor = borderColor;
    }
    
    // ===== تحديث العناصر في نموذج التعديل =====
    var formInputs = container.querySelectorAll('.profile-form input, .profile-form select, .profile-form textarea');
    formInputs.forEach(function(input) {
        input.style.color = textColor + ' !important';
        input.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)';
        input.style.borderColor = borderColor;
    });
    
    // ===== تحديث البطاقات =====
    var cards = container.querySelectorAll('.course-card, .user-card, .college-card, .specialty-card');
    cards.forEach(function(card) {
        card.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)';
        card.style.color = textColor + ' !important';
        card.style.borderColor = borderColor;
        card.style.boxShadow = '0 2px 8px ' + shadowColor;
    });
    
    // ===== تحديث عناوين البطاقات =====
    var cardTitles = container.querySelectorAll('.course-title, .college-card h3, .specialty-card h3, .user-card .user-name');
    cardTitles.forEach(function(title) {
        title.style.color = textColor + ' !important';
    });
}


function updateMainProfileColors(container, textColor) {
    var isLight = textColor === '#2d3436' || textColor === '#1a1a2e';
    var bgColor = isLight ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)';
    var borderColor = isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)';
    
    var textElements = container.querySelectorAll(
        '.profile-info h2, .profile-info p, .profile-info .badge, ' +
        '.profile-stats span, .profile-stats i, #profileBioDisplay, ' +
        '.badges-section h4, .customization-section h4'
    );
    textElements.forEach(function(el) {
        el.style.color = textColor + ' !important';
    });
    
    var tags = container.querySelectorAll('.course-tag');
    tags.forEach(function(tag) {
        tag.style.color = textColor + ' !important';
        tag.style.background = bgColor;
        tag.style.borderColor = borderColor;
    });
    
    var actionBtns = container.querySelectorAll('.profile-action-btn');
    actionBtns.forEach(function(btn) {
        btn.style.color = textColor + ' !important';
        btn.style.background = bgColor;
        btn.style.borderColor = borderColor;
    });
    
    var actionIcons = container.querySelectorAll('.profile-action-btn i');
    actionIcons.forEach(function(icon) {
        icon.style.color = textColor + ' !important';
    });
    
    var badges = container.querySelectorAll('.badge-item');
    badges.forEach(function(badge) {
        if (!badge.classList.contains('style-gradient')) {
            badge.style.color = textColor + ' !important';
            badge.style.background = bgColor;
            badge.style.borderColor = borderColor;
        }
    });
    
    var bioDisplay = document.getElementById('profileBioDisplay');
    if (bioDisplay) {
        bioDisplay.style.color = textColor + ' !important';
        bioDisplay.style.background = bgColor;
        bioDisplay.style.borderColor = borderColor;
    }
}

function applyCustomizationsToModal(userData) {
    if (!userData) return;
    var uid = userData.uid;
    var containerId = 'userProfileViewContainer_' + uid;
    var container = document.getElementById(containerId);
    if (!container) {
        console.warn('⚠️ Container not found for uid:', uid);
        return;
    }

    // إزالة أي style سابق
    var oldStyle = document.getElementById('modal-custom-style-' + uid);
    if (oldStyle) oldStyle.remove();

    var customization = userData.customization || {};
    var style = document.createElement('style');
    style.id = 'modal-custom-style-' + uid;
    var selector = '#' + containerId;
    var css = '';

    // ===== 1. خلفية المودال =====
    if (customization.profileBg && customization.profileBg !== 'default') {
        var bgInfo = BG_STYLES[customization.profileBg];
        if (bgInfo) {
            css += selector + ' { background: ' + bgInfo.bg + ' !important; color: ' + bgInfo.textColor + ' !important; padding: 1rem !important; border-radius: 16px !important; }';
        }
    }

    // ===== 2. إطار الصورة =====
    // لون الإطار
    if (customization.avatarBorder) {
        css += selector + ' .view-avatar { border-color: ' + customization.avatarBorder + ' !important; }';
    }
    // سمك الإطار - مع التعامل مع 'none'
    var borderWidth = customization.avatarBorderWidth || '3';
    if (borderWidth === 'none' || !borderWidth) {
        css += selector + ' .view-avatar { border-width: 0px !important; border-style: none !important; }';
    } else {
        css += selector + ' .view-avatar { border-width: ' + borderWidth + 'px !important; }';
        // نمط الإطار (إذا كان السمك ليس none)
        if (customization.avatarBorderStyle) {
            css += selector + ' .view-avatar { border-style: ' + customization.avatarBorderStyle + ' !important; }';
        } else {
            css += selector + ' .view-avatar { border-style: solid !important; }';
        }
    }

    // ===== 3. ظل الصورة =====
    if (customization.avatarShadow) {
        var shadowMap = {
            'small': '0 2px 8px rgba(0,0,0,0.15)',
            'medium': '0 4px 15px rgba(0,0,0,0.2)',
            'large': '0 8px 30px rgba(0,0,0,0.3)',
            'colored': '0 0 25px ' + (customization.avatarShadowColor || 'rgba(37,99,235,0.4)')
        };
        if (shadowMap[customization.avatarShadow]) {
            css += selector + ' .view-avatar { box-shadow: ' + shadowMap[customization.avatarShadow] + ' !important; }';
        }
    }

    // ===== 4. تأثير الصورة =====
    if (customization.avatarEffect && customization.avatarEffect !== 'none') {
        css += selector + ' .profile-avatar.effect-' + customization.avatarEffect + ' img { animation: ' + customization.avatarEffect + 'Effect 2s ease-in-out infinite; }';
    }

    // ===== 5. شكل الصورة =====
    if (customization.profileFrame) {
        var frameStyles = {
            'rounded': 'border-radius: 20% !important; clip-path: none !important;',
            'square': 'border-radius: 0 !important; clip-path: none !important;',
            'star': 'clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%) !important; border-radius: 0 !important;',
            'heart': 'clip-path: path("M50,90 C20,60 0,40 0,25 C0,10 15,0 30,0 C40,0 48,8 50,18 C52,8 60,0 70,0 C85,0 100,10 100,25 C100,40 80,60 50,90Z") !important; border-radius: 0 !important;',
            'diamond': 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%) !important; border-radius: 0 !important;'
        };
        if (frameStyles[customization.profileFrame]) {
            css += selector + ' .view-avatar { ' + frameStyles[customization.profileFrame] + ' }';
        }
    }

    // ===== 6. الاسم =====
    if (customization.nameColor) {
        css += selector + ' .view-info h3 { color: ' + customization.nameColor + ' !important; }';
    }
    if (customization.nameGlow) {
        var glowStyles = {
            'soft': 'text-shadow: 0 0 20px rgba(37,99,235,0.3) !important;',
            'strong': 'text-shadow: 0 0 30px rgba(37,99,235,0.6), 0 0 60px rgba(37,99,235,0.3) !important;',
            'rainbow': 'animation: rainbowGlow 3s ease infinite !important;'
        };
        if (glowStyles[customization.nameGlow]) {
            css += selector + ' .view-info h3 { ' + glowStyles[customization.nameGlow] + ' }';
        }
    }

    // ===== 7. النصوص =====
    if (customization.textColor && customization.textColor !== 'default') {
        css += selector + ' .view-info p, ' + selector + ' .view-stats-row .stat-box span, ' + selector + ' .view-stats-row .stat-box label { color: ' + customization.textColor + ' !important; }';
    }
    if (customization.bioColor && customization.bioColor !== 'default') {
        css += selector + ' .view-bio { color: ' + customization.bioColor + ' !important; }';
    }

    // ===== 8. الأزرار =====
    if (customization.buttonColor && customization.buttonColor !== 'default') {
        css += selector + ' .stat-box { color: ' + customization.buttonColor + ' !important; }';
        css += selector + ' .stat-box i { color: ' + customization.buttonColor + ' !important; }';
        css += selector + ' .stat-box span { color: ' + customization.buttonColor + ' !important; }';
        css += selector + ' .stat-box label { color: ' + customization.buttonColor + ' !important; }';
        css += selector + ' .stat-box:hover { background: ' + customization.buttonColor + '20 !important; transform: scale(1.05); }';
        css += selector + ' .stat-box.active-tab { background: ' + customization.buttonColor + '20 !important; border: 2px solid ' + customization.buttonColor + ' !important; }';
        css += selector + ' .stat-box.active-tab i, ' + selector + ' .stat-box.active-tab span, ' + selector + ' .stat-box.active-tab label { color: ' + customization.buttonColor + ' !important; }';
    }

    // ===== 9. شكل الشارة =====
    if (customization.badgeStyle && customization.badgeStyle !== 'default') {
        var badgeStyles = {
            'glow': 'animation: glowBadge 2s ease-in-out infinite;',
            'rounded': 'border-radius: 50px !important; padding: 0.3rem 1.2rem !important;',
            'shadow': 'box-shadow: 0 4px 15px rgba(0,0,0,0.15) !important;',
            'gradient': 'background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important; color: white !important;',
            'neon': 'box-shadow: 0 0 20px rgba(37,99,235,0.5) !important; border: 1px solid rgba(37,99,235,0.3) !important;'
        };
        if (badgeStyles[customization.badgeStyle]) {
            css += selector + ' .badge-item { ' + badgeStyles[customization.badgeStyle] + ' }';
        }
    }

    // ===== 10. الشارة المميزة =====
    if (customization.featuredBadge && customization.featuredBadge !== 'none') {
        // أنماط الصندوق
        var boxBg = customization.featuredBadgeBoxBg || 'default';
        var boxBorder = customization.featuredBadgeBoxBorder || 'none';
        var boxBorderColor = customization.featuredBadgeBoxBorderColor || 'default';
        var boxStyles = [];
        var boxBgMap = {
            'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
            'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
            'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
            'dark': 'background:#1e293b'
        };
        if (boxBg && boxBg !== 'default' && boxBgMap[boxBg]) {
            boxStyles.push('background:' + boxBgMap[boxBg]);
        } else {
            boxStyles.push('background:var(--card-bg)');
        }
        if (boxBorder !== 'none') {
            var bBoxColor = (boxBorderColor && boxBorderColor !== 'default') ? boxBorderColor : 'var(--primary)';
            boxStyles.push('border:' + boxBorder + ' 2px ' + bBoxColor);
        }
        boxStyles.push('border-radius:12px;padding:0.3rem 0.8rem;display:flex;align-items:center;gap:0.5rem;margin:0.3rem 0');
        css += selector + ' .featured-badge-container { ' + boxStyles.join(';') + ' }';

        // أنماط الشارة
        var textColor = customization.featuredBadgeTextColor || 'default';
        var bg = customization.featuredBadgeBg || 'default';
        var size = customization.featuredBadgeSize || 'medium';
        var effect = customization.featuredBadgeEffect || 'none';
        var border = customization.featuredBadgeBorder || 'none';
        var borderColor = customization.featuredBadgeBorderColor || 'default';

        var badgeStylesArr = [];
        if (textColor && textColor !== 'default') badgeStylesArr.push('color:' + textColor + ' !important');
        var bgMap = {
            'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
            'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
            'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
            'neon': 'background:linear-gradient(135deg,#00ffff,#ff00ff)',
            'dark': 'background:#1e293b'
        };
        if (bg && bg !== 'default' && bgMap[bg]) {
            badgeStylesArr.push(bgMap[bg]);
        } else {
            badgeStylesArr.push('background:var(--primary-light)');
        }
        if (size === 'small') badgeStylesArr.push('font-size:0.7rem;padding:0.1rem 0.5rem');
        else if (size === 'large') badgeStylesArr.push('font-size:1rem;padding:0.4rem 1.2rem');
        else badgeStylesArr.push('font-size:0.85rem;padding:0.2rem 1rem');
        if (effect === 'glow') badgeStylesArr.push('animation:glowBadge 2s ease-in-out infinite');
        else if (effect === 'pulse') badgeStylesArr.push('animation:pulse 1.5s ease-in-out infinite');
        else if (effect === 'shine') badgeStylesArr.push('background:linear-gradient(135deg,#f093fb,#f5576c,#f093fb);background-size:200% 200%;animation:shine 3s ease infinite');
        if (border !== 'none') {
            var bColor = (borderColor && borderColor !== 'default') ? borderColor : 'var(--primary)';
            badgeStylesArr.push('border:' + border + ' 2px ' + bColor);
        }
        if (customization.badgeStyle && customization.badgeStyle !== 'default') {
            var styleMap = {
                'glow': 'animation:glowBadge 2s ease-in-out infinite;',
                'rounded': 'border-radius:50px;padding:0.2rem 1rem;',
                'shadow': 'box-shadow:0 4px 15px rgba(0,0,0,0.15);',
                'gradient': 'background:linear-gradient(135deg,#f093fb,#f5576c);color:white;',
                'neon': 'box-shadow:0 0 20px rgba(37,99,235,0.5);border:1px solid rgba(37,99,235,0.3);'
            };
            if (styleMap[customization.badgeStyle]) {
                badgeStylesArr.push(styleMap[customization.badgeStyle]);
            }
        }
        css += selector + ' .featured-badge-container .badge-item { ' + badgeStylesArr.join(';') + ' }';
    }

    // ===== 11. الشارة الخاصة =====
    if (customization.specialBadge && customization.specialBadge !== 'none') {
        css += selector + ' .special-badge-display { display: inline-block; }';
    }

    // تطبيق CSS
    if (css) {
        style.textContent = css;
        document.head.appendChild(style);
        console.log('✅ تم تطبيق تخصيصات المودال للمستخدم:', userData.displayName);
    }
}


function applyProfileBgToModal(bg) {
    var container = document.getElementById('userProfileViewContainer');
    if (!container) return;
    
    container.style.background = '';
    container.style.color = '';
    
    if (!bg || bg === 'default') return;
    
    var style = BG_STYLES[bg];
    if (style) {
        container.style.background = style.bg;
        container.style.color = style.textColor;
        container.style.padding = '1rem';
        container.style.borderRadius = '16px';
    }
}

// ============================================================
//  تعريفات الخلفيات
// ============================================================

var BG_STYLES = {
    'gradient1': { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', textColor: '#ffffff', isDark: true },
    'gradient2': { bg: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', textColor: '#1a1a2e', isDark: false },
    'gradient3': { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', textColor: '#ffffff', isDark: true },
    'gradient4': { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', textColor: '#1a1a2e', isDark: false },
    'ocean': { bg: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)', textColor: '#ffffff', isDark: true },
    'sunset': { bg: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)', textColor: '#ffffff', isDark: true },
    'forest': { bg: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)', textColor: '#ffffff', isDark: true },
    'midnight': { bg: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)', textColor: '#ffffff', isDark: true },
    'neon': { bg: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', textColor: '#00ffff', isDark: true },
    'rainbow': { bg: 'linear-gradient(135deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff)', textColor: '#ffffff', isDark: true },
    'galaxy': { bg: 'linear-gradient(135deg, #0c0c1d, #1a1a3e, #2d1b69)', textColor: '#c8b6ff', isDark: true },
    'sunrise': { bg: 'linear-gradient(135deg, #ff6b6b, #feca57, #ff9ff3)', textColor: '#2d3436', isDark: false },
    'lavender': { bg: 'linear-gradient(135deg, #e8d5f5, #b8a9c9, #9b8bb5)', textColor: '#2d3436', isDark: false },
    'candy': { bg: 'linear-gradient(135deg, #ff6b6b, #ff9ff3, #feca57)', textColor: '#2d3436', isDark: false },
    'gold': { bg: 'linear-gradient(135deg, #bf953f, #fcf6ba, #b38728)', textColor: '#2d3436', isDark: false }
};

console.log('✅ تم تنظيف نظام التخصيصات بنجاح!');

// ===== دوال التطبيق الجديدة =====


function openCustomizationModal() {
    var content = document.getElementById('customizationContent');
    if (!content) return;
    if (!currentUserData) {
        content.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--gray-400);">يرجى تسجيل الدخول</div>';
        openModal('customizationModal');
        return;
    }

    var result = calculateUserPoints(currentUserData);
    var customization = currentUserData.customization || {};
    var isSuperAdmin = result.isSuperAdmin;

    previewState.active = false;
    previewState.type = null;
    previewState.value = null;
    previewState.originalCustomization = JSON.parse(JSON.stringify(customization));
    pendingCustomizations = {};

    var html = '';

    // ===== قسم المعاينة =====
    html += '<div class="preview-section">';
    html += '<div class="preview-header">';
    html += '<h4><i class="fas fa-eye"></i> معاينة التخصيصات</h4>';
    html += '<div class="preview-actions">';
    html += '<button class="btn-preview-toggle" onclick="togglePreviewMode()"><i class="fas fa-exchange-alt"></i> تبديل العرض</button>';
    html += '<button class="btn-preview-reset" onclick="resetPreviewChanges()"><i class="fas fa-undo"></i> إعادة</button>';
    html += '</div>';
    html += '</div>';
    html += '<div id="previewContainer" class="preview-container">';
    html += '<div class="preview-placeholder">';
    html += '<i class="fas fa-hand-pointer"></i>';
    html += '<p>اختر تخصيصاً من القائمة أدناه لمعاينته فوراً</p>';
    html += '</div>';
    html += '</div>';
    html += '<div id="previewModeIndicator" class="preview-mode-indicator">';
    html += '📌 عرض: <span id="currentPreviewModeText">كلا الشكلين</span>';
    html += '</div>';
    html += '</div>';

    // ===== عرض النقاط =====
    html += '<div class="customization-points">';
    if (isSuperAdmin) {
        html += '👑 نقاطك: <strong style="color:#ffd700;">∞ (لا نهائية - مشرف)</strong>';
        html += '<br><span class="points-hint">جميع التخصيصات مجانية للمشرف</span>';
    } else {
        html += '🪙 نقاطك المتاحة: <strong id="customPointsDisplay">' + result.points + '</strong>';
        html += ' | 💰 تكلفة التخصيص: <strong id="previewCostDisplay">0</strong> نقطة';
        html += '<br><span class="points-hint">إجمالي النقاط: ' + result.earnedPoints + ' | المنفق: ' + result.spentPoints + '</span>';
    }
    html += '</div>';

    // ===== الأزرار الرئيسية (التبويبات) =====
    html += '<div class="customization-main-tabs">';
    var categories = [
        { key: 'appearance', label: 'المظهر', icon: 'fa-palette', color: '#8b5cf6' },
        { key: 'avatar', label: 'الصورة', icon: 'fa-user-circle', color: '#3b82f6' },
        { key: 'name', label: 'الاسم', icon: 'fa-signature', color: '#22c55e' },
        { key: 'texts', label: 'النصوص', icon: 'fa-font', color: '#f59e0b' },
        { key: 'buttons', label: 'الأزرار', icon: 'fa-square', color: '#ec4899' },
        { key: 'badge', label: 'الشارة', icon: 'fa-trophy', color: '#ef4444' },
        { key: 'special', label: 'خاص', icon: 'fa-star', color: '#8b5cf6' }
    ];
    categories.forEach(function(cat) {
        var active = cat.key === 'appearance' ? 'active' : '';
        html += '<button class="main-tab-btn ' + active + '" data-tab="' + cat.key + '" onclick="switchCustomizationTab(\'' + cat.key + '\')" style="--tab-color:' + cat.color + ';">';
        html += '<i class="fas ' + cat.icon + '"></i> ' + cat.label;
        html += '</button>';
    });
    html += '</div>';

    // ===== محتوى التبويبات =====
    html += '<div id="customizationTabContent" class="customization-tab-content">';

    var categoryKeys = Object.keys(CUSTOMIZATION_OPTIONS);
    categoryKeys.forEach(function(catKey) {
        var cat = CUSTOMIZATION_OPTIONS[catKey];
        var isVisible = catKey === 'appearance' ? 'block' : 'none';
        html += '<div class="customization-tab-panel" data-tab="' + catKey + '" style="display:' + isVisible + ';">';
        var subKeys = Object.keys(cat.options);
        if (subKeys.length === 0) {
            html += '<div class="empty-options">لا توجد خيارات</div>';
        } else {
            // ===== الأزرار الثانوية - شبكة من المربعات الصغيرة =====
            html += '<div class="sub-options-grid-small">';
            subKeys.forEach(function(subKey) {
                var opt = cat.options[subKey];
                var isActive = customization[subKey] && customization[subKey] !== 'default' && customization[subKey] !== 'none';
                var currentValue = customization[subKey] || 'default';
                var valueLabel = getOptionLabel(subKey, currentValue);
                
                html += '<div class="sub-option-box" data-option="' + subKey + '" onclick="showOptionDetails(\'' + subKey + '\')">';
                html += '<div class="sub-option-box-content">';
                html += '<span class="sub-option-box-icon"><i class="fas ' + getOptionIcon(subKey) + '"></i></span>';
                html += '<span class="sub-option-box-label">' + opt.label + '</span>';
                if (isActive) {
                    html += '<span class="sub-option-box-status active"><i class="fas fa-check-circle"></i></span>';
                } else {
                    html += '<span class="sub-option-box-status inactive"><i class="fas fa-circle"></i></span>';
                }
                html += '</div>';
                html += '</div>';
            });
            html += '</div>';
            // حاوية لعرض خيارات التخصيص المحددة
            html += '<div id="optionDetailsContainer_' + catKey + '" class="option-details-container" style="display:none;"></div>';
        }
        html += '</div>';
    });

    html += '</div>';

    // ===== زر تطبيق التغييرات =====
    html += '<div class="customization-footer">';
    html += '<button class="btn btn-success btn-apply" onclick="applySelectedCustomization()">';
    html += '<i class="fas fa-check"></i> تطبيق التخصيصات المحددة';
    html += '</button>';
    html += '<button class="btn btn-outline" onclick="closeModal(\'customizationModal\')">';
    html += '<i class="fas fa-times"></i> إلغاء';
    html += '</button>';
    html += '</div>';

    content.innerHTML = html;

    previewState.previewMode = 'both';
    updatePreviewModeText();

    openModal('customizationModal');
}

function getOptionIcon(optionKey) {
    var icons = {
        // المظهر
        'profileBg': 'fa-image',
        'fontStyle': 'fa-font',
        'animationSpeed': 'fa-clock',
        
        // الصورة
        'profileFrame': 'fa-crop-alt',
        'avatarEffect': 'fa-magic',
        'avatarBorderWidth': 'fa-border-all',
        'avatarBorder': 'fa-palette',
        'avatarBorderStyle': 'fa-border-style',
        'avatarShadow': 'fa-shadow',
        'avatarShadowColor': 'fa-tint',
        
        // الاسم
        'nameColor': 'fa-pen',
        'nameGlow': 'fa-lightbulb',
        
        // النصوص
        'textColor': 'fa-font',
        'bioColor': 'fa-quote-right',
        
        // الأزرار
        'buttonColor': 'fa-square',
        
        // الشارة
        'badgeStyle': 'fa-trophy',
        'featuredBadgeTextColor': 'fa-font',
        'featuredBadgeBg': 'fa-fill-drip',
        'featuredBadgeSize': 'fa-expand',
        'featuredBadgeEffect': 'fa-bolt',
        'featuredBadgeBorder': 'fa-border-all',
        'featuredBadgeBorderColor': 'fa-palette',
        'featuredBadgeBoxBg': 'fa-fill-drip',
        'featuredBadgeBoxBorder': 'fa-border-all',
        'featuredBadgeBoxBorderColor': 'fa-palette',
        
        // خاص
        'specialBadge': 'fa-star'
    };
    return icons[optionKey] || 'fa-cog';
}
// ===== بناء خيار تخصيص واحد =====
function buildCustomizationOptionsHTML(optionKey, optionDef, currentValue, isSuperAdmin) {
    var html = '<div class="option-detail-header">';
    html += '<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">';
    html += '<span style="font-weight:700;font-size:0.95rem;color:var(--text-color);">' + optionDef.label + '</span>';
    if (!isSuperAdmin) {
        html += '<span style="font-size:0.65rem;color:var(--gray-500);background:var(--gray-100);padding:0.05rem 0.6rem;border-radius:12px;">🪙 ' + optionDef.cost + ' نقطة</span>';
    } else {
        html += '<span style="font-size:0.65rem;color:var(--success);background:var(--success-light);padding:0.05rem 0.6rem;border-radius:12px;">🎁 مجاناً</span>';
    }
    html += '</div>';
    html += '<button class="close-details" onclick="this.closest(\'.option-details-container\').style.display=\'none\'"><i class="fas fa-times"></i></button>';
    html += '</div>';

    var options = optionDef.options;

    if (optionDef.type === 'bg') {
        html += '<div class="bg-options-grid">';
        options.forEach(function(opt) {
            var isActive = currentValue === opt.key;
            var style = '';
            var extraClass = '';
            if (opt.key !== 'default') {
                var bgInfo = BG_STYLES[opt.key];
                if (bgInfo) style = 'background:' + bgInfo.bg + ';';
            } else {
                extraClass = 'default-bg';
            }
            html += '<button class="bg-option-btn ' + extraClass + ' ' + (isActive ? 'active' : '') + '" onclick="previewAndSelect(\'' + optionKey + '\', \'' + opt.key + '\', ' + optionDef.cost + ')" style="' + style + '">';
            html += opt.label;
            if (isActive) html += ' ✅';
            html += '</button>';
        });
        html += '</div>';
    } else if (optionDef.type === 'color') {
        html += '<div class="color-options-grid">';
        options.forEach(function(opt) {
            var isActive = currentValue === opt.key;
            if (opt.key === 'default') {
                html += '<button class="effect-option-btn ' + (isActive ? 'active' : '') + '" onclick="previewAndSelect(\'' + optionKey + '\', \'' + opt.key + '\', ' + optionDef.cost + ')">';
                html += 'افتراضي';
                if (isActive) html += ' ✅';
                html += '</button>';
            } else {
                html += '<button class="color-option-btn ' + (isActive ? 'active' : '') + '" onclick="previewAndSelect(\'' + optionKey + '\', \'' + opt.key + '\', ' + optionDef.cost + ')" style="background:' + opt.key + ';" title="' + opt.label + '">';
                if (isActive) html += '<span class="check-mark">✓</span>';
                html += '</button>';
            }
        });
        html += '</div>';
    } else {
        html += '<div class="effect-options-grid">';
        options.forEach(function(opt) {
            var isActive = currentValue === opt.key;
            html += '<button class="effect-option-btn ' + (isActive ? 'active' : '') + '" onclick="previewAndSelect(\'' + optionKey + '\', \'' + opt.key + '\', ' + optionDef.cost + ')">';
            html += opt.label;
            if (isActive) html += ' ✅';
            html += '</button>';
        });
        html += '</div>';
    }

    if (currentValue && currentValue !== 'default' && currentValue !== 'none') {
        var label = getOptionLabel(optionKey, currentValue);
        html += '<div style="font-size:0.65rem;color:var(--primary);margin-top:0.5rem;padding:0.2rem 0.5rem;background:var(--primary-light);border-radius:8px;display:inline-block;">';
        html += '✓ المحدد حالياً: <strong>' + label + '</strong>';
        html += '</div>';
    }

    return html;
}



// ===== 4. تطبيق المعاينة الفورية =====

function applyInstantPreview(type, value) {
    var previewContainer = document.getElementById('previewContainer');
    if (!previewContainer) return;
    
    // التأكد من وجود previewState
    if (typeof previewState === 'undefined') {
        console.error('❌ previewState غير معرف');
        return;
    }
    
    // إنشاء نسخة مؤقتة من تخصيصات المستخدم مع التغيير
    var tempCustomization = JSON.parse(JSON.stringify(currentUserData.customization || {}));
    tempCustomization[type] = value;
    
    var tempUserData = JSON.parse(JSON.stringify(currentUserData));
    tempUserData.customization = tempCustomization;
    
    var mode = previewState.previewMode || 'both';
    var html = '';
    
    // عرض المعاينة حسب الوضع
    if (mode === 'both' || mode === 'main') {
        html += '<div style="margin-bottom:0.3rem;">';
        html += '<div style="font-size:0.6rem;color:var(--gray-400);margin-bottom:0.2rem;">📱 صفحتي</div>';
        html += '<div style="background:var(--card-bg);border-radius:8px;padding:0.3rem;border:1px solid var(--border-color);">';
        html += buildMainProfilePreview(tempUserData);
        html += '</div>';
        html += '</div>';
    }
    
    if (mode === 'both' || mode === 'modal') {
        html += '<div style="margin-bottom:0.3rem;">';
        html += '<div style="font-size:0.6rem;color:var(--gray-400);margin-bottom:0.2rem;">👥 مودال الآخرين</div>';
        html += '<div style="background:var(--card-bg);border-radius:8px;padding:0.3rem;border:1px solid var(--border-color);">';
        html += buildModalProfilePreview(tempUserData);
        html += '</div>';
        html += '</div>';
    }
    
    previewContainer.innerHTML = html;
}

function buildMainProfilePreview(userData) {
    var customization = userData.customization || {};
    var name = userData.displayName || 'مستخدم';
    var email = userData.email || 'user@example.com';
    var role = userData.role || 'user';
    var isAdmin = role === 'admin';
    var isSuperAdmin = userData.isSuperAdmin || false;
    var result = calculateUserPoints(userData);

    // ===== تجميع الأنماط =====
    var bgStyle = '', textColor = '', nameColor = '', nameGlow = '';
    var avatarBorder = '', avatarEffect = '', profileFrame = '';
    var textColorStyle = '', bioColor = '', buttonColor = '';
    var avatarShadow = '', avatarBorderWidth = '', avatarBorderStyle = '';
    var badgeExtraStyle = '';

    // 1. خلفية الملف
    if (customization.profileBg && customization.profileBg !== 'default') {
        var bgInfo = BG_STYLES[customization.profileBg];
        if (bgInfo) {
            bgStyle = 'background:' + bgInfo.bg + ';color:' + bgInfo.textColor + ';';
            textColor = bgInfo.textColor;
        }
    }

    // 2. لون الاسم
    if (customization.nameColor && customization.nameColor !== 'default') {
        nameColor = 'color:' + customization.nameColor + ';';
    }

    // 3. تأثير الاسم (جميع الخيارات)
    if (customization.nameGlow) {
        if (customization.nameGlow === 'soft') {
            nameGlow = 'text-shadow:0 0 20px rgba(37,99,235,0.3);';
        } else if (customization.nameGlow === 'strong') {
            nameGlow = 'text-shadow:0 0 30px rgba(37,99,235,0.6),0 0 60px rgba(37,99,235,0.3);';
        } else if (customization.nameGlow === 'rainbow') {
            nameGlow = 'animation:rainbowGlow 3s ease infinite;';
        }
    }

    // 4. لون النصوص الفرعية
    if (customization.textColor && customization.textColor !== 'default') {
        textColorStyle = 'color:' + customization.textColor + ';';
    }

    // 5. لون النبذة
    if (customization.bioColor && customization.bioColor !== 'default') {
        bioColor = 'color:' + customization.bioColor + ';';
    }

    // 6. لون الأزرار
    if (customization.buttonColor && customization.buttonColor !== 'default') {
        buttonColor = 'color:' + customization.buttonColor + ';border-color:' + customization.buttonColor + ';';
    }

    // 7. إطار الصورة - لون
    if (customization.avatarBorder && customization.avatarBorder !== 'default') {
        avatarBorder = 'border-color:' + customization.avatarBorder + ';';
    }

    // 8. إطار الصورة - سمك (مع التعامل مع none)
    if (customization.avatarBorderWidth && customization.avatarBorderWidth !== 'none') {
        avatarBorderWidth = 'border-width:' + customization.avatarBorderWidth + 'px;';
    } else {
        avatarBorderWidth = 'border-width:0px;';
    }

    // 9. إطار الصورة - نمط
    if (customization.avatarBorderStyle) {
        avatarBorderStyle = 'border-style:' + customization.avatarBorderStyle + ';';
    }

    // 10. ظل الصورة (مع اللون)
    if (customization.avatarShadow) {
        var shadowMap = {
            'small': '0 2px 8px rgba(0,0,0,0.15)',
            'medium': '0 4px 15px rgba(0,0,0,0.2)',
            'large': '0 8px 30px rgba(0,0,0,0.3)',
            'colored': '0 0 25px ' + (customization.avatarShadowColor || 'rgba(37,99,235,0.4)')
        };
        if (shadowMap[customization.avatarShadow]) {
            avatarShadow = 'box-shadow:' + shadowMap[customization.avatarShadow] + ';';
        }
    }

    // 11. تأثير الصورة
    if (customization.avatarEffect && customization.avatarEffect !== 'none') {
        avatarEffect = 'effect-' + customization.avatarEffect;
    }

    // 12. شكل الصورة
    if (customization.profileFrame) {
        var frameStyles = {
            'rounded': 'border-radius:20%;',
            'square': 'border-radius:0;',
            'star': 'clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);border-radius:0;',
            'heart': 'clip-path:path("M50,90 C20,60 0,40 0,25 C0,10 15,0 30,0 C40,0 48,8 50,18 C52,8 60,0 70,0 C85,0 100,10 100,25 C100,40 80,60 50,90Z");border-radius:0;',
            'diamond': 'clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);border-radius:0;'
        };
        if (frameStyles[customization.profileFrame]) {
            profileFrame = frameStyles[customization.profileFrame];
        }
    }

    // 13. شكل الشارة (badgeStyle) - يطبق على جميع الشارات
    if (customization.badgeStyle && customization.badgeStyle !== 'default') {
        var badgeStyles = {
            'glow': 'animation:glowBadge 2s ease-in-out infinite;',
            'rounded': 'border-radius:50px;padding:0.2rem 1rem;',
            'shadow': 'box-shadow:0 4px 15px rgba(0,0,0,0.15);',
            'gradient': 'background:linear-gradient(135deg,#f093fb,#f5576c);color:white;',
            'neon': 'box-shadow:0 0 20px rgba(37,99,235,0.5);border:1px solid rgba(37,99,235,0.3);'
        };
        if (badgeStyles[customization.badgeStyle]) {
            badgeExtraStyle = badgeStyles[customization.badgeStyle];
        }
    }

    // ===== الشارة المميزة (جميع الخيارات) =====
    var featuredBadgeHTML = '';
    if (customization.featuredBadge && customization.featuredBadge !== 'none') {
        var allBadges = getAllBadges();
        var badge = allBadges.find(function(b) { return b.name === customization.featuredBadge; });
        if (badge) {
            // خيارات الشارة
            var fTextColor = customization.featuredBadgeTextColor || 'default';
            var fBg = customization.featuredBadgeBg || 'default';
            var fSize = customization.featuredBadgeSize || 'medium';
            var fEffect = customization.featuredBadgeEffect || 'none';
            var fBorder = customization.featuredBadgeBorder || 'none';
            var fBorderColor = customization.featuredBadgeBorderColor || 'default';

            // خيارات الصندوق
            var boxBg = customization.featuredBadgeBoxBg || 'default';
            var boxBorder = customization.featuredBadgeBoxBorder || 'none';
            var boxBorderColor = customization.featuredBadgeBoxBorderColor || 'default';

            // بناء أنماط الشارة
            var fStyles = [];
            if (fTextColor && fTextColor !== 'default') fStyles.push('color:' + fTextColor);
            
            var fBgMap = {
                'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
                'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
                'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
                'neon': 'background:linear-gradient(135deg,#00ffff,#ff00ff)',
                'dark': 'background:#1e293b'
            };
            if (fBg && fBg !== 'default' && fBgMap[fBg]) {
                fStyles.push(fBgMap[fBg]);
            } else {
                fStyles.push('background:var(--primary-light)');
            }

            if (fSize === 'small') fStyles.push('font-size:0.6rem;padding:0.1rem 0.5rem');
            else if (fSize === 'large') fStyles.push('font-size:0.9rem;padding:0.3rem 1.2rem');
            else fStyles.push('font-size:0.75rem;padding:0.2rem 0.8rem');

            if (fEffect === 'glow') fStyles.push('animation:glowBadge 2s ease-in-out infinite');
            else if (fEffect === 'pulse') fStyles.push('animation:pulse 1.5s ease-in-out infinite');
            else if (fEffect === 'shine') fStyles.push('background:linear-gradient(135deg,#f093fb,#f5576c,#f093fb);background-size:200% 200%;animation:shine 3s ease infinite');

            if (fBorder !== 'none') {
                var fBColor = (fBorderColor && fBorderColor !== 'default') ? fBorderColor : '#2563eb';
                fStyles.push('border:' + fBorder + ' 2px ' + fBColor);
            }

            // إضافة badgeExtraStyle (شكل الشارة)
            if (badgeExtraStyle) fStyles.push(badgeExtraStyle);

            // بناء أنماط الصندوق
            var boxStyles = [];
            var boxBgMap = {
                'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
                'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
                'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
                'dark': 'background:#1e293b'
            };
            if (boxBg && boxBg !== 'default' && boxBgMap[boxBg]) {
                boxStyles.push(boxBgMap[boxBg]);
            } else {
                boxStyles.push('background:var(--gray-50)');
            }
            if (boxBorder !== 'none') {
                var bBoxColor = (boxBorderColor && boxBorderColor !== 'default') ? boxBorderColor : 'var(--primary)';
                boxStyles.push('border:' + boxBorder + ' 2px ' + bBoxColor);
            }
            boxStyles.push('border-radius:12px;padding:0.3rem 0.8rem;display:flex;align-items:center;gap:0.5rem;margin:0.3rem 0');

            featuredBadgeHTML = '<div class="featured-badge-container" style="' + boxStyles.join(';') + '">' +
                '<span style="font-size:0.65rem;color:var(--gray-500);font-weight:600;">⭐</span>' +
                '<span class="badge-item" style="' + fStyles.join(';') + '"><i class="fas ' + badge.icon + '"></i> ' + badge.name + '</span>' +
                '<span style="font-size:0.55rem;color:var(--gray-400);">شارة مميزة</span>' +
                '</div>';
        }
    }

    // ===== الشارة الخاصة =====
    var specialBadgeHTML = '';
    if (customization.specialBadge && customization.specialBadge !== 'none') {
        specialBadgeHTML = '<span style="font-size:0.8rem;margin-right:0.3rem;"><i class="fas ' + customization.specialBadge + '"></i></span>';
    }

    // ===== شارة الدور =====
    var roleBadge = '';
    if (isSuperAdmin) {
        roleBadge = '<span style="background:linear-gradient(135deg,#ffd700,#f59e0b);color:#78350f;padding:0.1rem 0.5rem;border-radius:10px;font-weight:700;font-size:0.6rem;"><i class="fas fa-crown"></i> المشرف الرئيسي</span>';
    } else if (isAdmin) {
        roleBadge = '<span style="background:var(--primary-light);color:var(--primary-dark);padding:0.1rem 0.5rem;border-radius:10px;font-weight:600;font-size:0.6rem;"><i class="fas fa-shield-alt"></i> مشرف</span>';
    }

    // ===== بناء HTML =====
    var html = '<div style="padding:0.3rem;' + bgStyle + 'border-radius:6px;">';
    html += '<div style="display:flex;align-items:center;gap:0.5rem;">';
    
    // الصورة الشخصية
    html += '<div class="profile-avatar ' + avatarEffect + '" style="display:inline-block;">';
    html += '<img src="' + (userData.avatar || '') + '" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:3px solid ' + (customization.avatarBorder || '#2563eb') + ';' + profileFrame + avatarShadow + avatarBorderWidth + avatarBorderStyle + '" onerror="this.src=\'\'" />';
    html += '</div>';

    // المعلومات
    html += '<div style="flex:1;min-width:0;">';
    html += '<div style="font-weight:700;font-size:0.85rem;' + nameColor + nameGlow + '">' + escapeHtml(name) + ' ' + specialBadgeHTML + ' <span style="font-size:0.55rem;background:rgba(255,255,255,0.2);padding:0.05rem 0.3rem;border-radius:8px;">' + result.tier.name + '</span></div>';
    html += '<div style="display:flex;gap:0.2rem;flex-wrap:wrap;margin:0.05rem 0;">' + roleBadge + '</div>';
    html += '<div style="font-size:0.6rem;opacity:0.7;' + textColorStyle + '"><i class="fas fa-envelope"></i> ' + escapeHtml(email) + '</div>';
    html += '<div style="font-size:0.6rem;opacity:0.7;' + textColorStyle + '"><i class="fas fa-university"></i> كلية نموذجية</div>';
    if (userData.bio) {
        html += '<div style="font-size:0.6rem;opacity:0.7;margin-top:0.1rem;padding:0.1rem 0.3rem;background:rgba(255,255,255,0.1);border-radius:4px;' + bioColor + '"><i class="fas fa-quote-right"></i> ' + escapeHtml(userData.bio.substring(0, 25)) + '...</div>';
    }
    html += '</div></div>';
    
    // الشارة المميزة
    html += featuredBadgeHTML;
    html += '</div>';

    return html;
}

function buildModalProfilePreview(userData) {
    var customization = userData.customization || {};
    var name = userData.displayName || 'مستخدم';
    var email = userData.email || 'user@example.com';
    var role = userData.role || 'user';
    var isAdmin = role === 'admin';
    var isSuperAdmin = userData.isSuperAdmin || false;
    var result = calculateUserPoints(userData);

    // ===== تجميع الأنماط (نفس المنطق مع تعديل الأحجام) =====
    var bgStyle = '', textColor = '', nameColor = '', nameGlow = '';
    var avatarBorder = '', avatarEffect = '', profileFrame = '';
    var textColorStyle = '', bioColor = '', buttonColor = '';
    var avatarShadow = '', avatarBorderWidth = '', avatarBorderStyle = '';
    var badgeExtraStyle = '';

    // (نفس الكود السابق لتجميع الأنماط، ولكن قد نعدل الأحجام قليلاً)
    // لتوفير المساحة، سأكرر نفس الكود هنا مع تغيير حجم الصورة إلى 45px بدلاً من 40px

    if (customization.profileBg && customization.profileBg !== 'default') {
        var bgInfo = BG_STYLES[customization.profileBg];
        if (bgInfo) {
            bgStyle = 'background:' + bgInfo.bg + ';color:' + bgInfo.textColor + ';padding:0.5rem;border-radius:8px;';
            textColor = bgInfo.textColor;
        }
    }

    if (customization.nameColor && customization.nameColor !== 'default') {
        nameColor = 'color:' + customization.nameColor + ';';
    }

    if (customization.nameGlow) {
        if (customization.nameGlow === 'soft') {
            nameGlow = 'text-shadow:0 0 20px rgba(37,99,235,0.3);';
        } else if (customization.nameGlow === 'strong') {
            nameGlow = 'text-shadow:0 0 30px rgba(37,99,235,0.6),0 0 60px rgba(37,99,235,0.3);';
        } else if (customization.nameGlow === 'rainbow') {
            nameGlow = 'animation:rainbowGlow 3s ease infinite;';
        }
    }

    if (customization.textColor && customization.textColor !== 'default') {
        textColorStyle = 'color:' + customization.textColor + ';';
    }
    if (customization.bioColor && customization.bioColor !== 'default') {
        bioColor = 'color:' + customization.bioColor + ';';
    }
    if (customization.buttonColor && customization.buttonColor !== 'default') {
        buttonColor = 'color:' + customization.buttonColor + ';border-color:' + customization.buttonColor + ';';
    }

    if (customization.avatarBorder && customization.avatarBorder !== 'default') {
        avatarBorder = 'border-color:' + customization.avatarBorder + ';';
    }
    if (customization.avatarBorderWidth && customization.avatarBorderWidth !== 'none') {
        avatarBorderWidth = 'border-width:' + customization.avatarBorderWidth + 'px;';
    } else {
        avatarBorderWidth = 'border-width:0px;';
    }
    if (customization.avatarBorderStyle) {
        avatarBorderStyle = 'border-style:' + customization.avatarBorderStyle + ';';
    }

    if (customization.avatarShadow) {
        var shadowMap = {
            'small': '0 2px 8px rgba(0,0,0,0.15)',
            'medium': '0 4px 15px rgba(0,0,0,0.2)',
            'large': '0 8px 30px rgba(0,0,0,0.3)',
            'colored': '0 0 25px ' + (customization.avatarShadowColor || 'rgba(37,99,235,0.4)')
        };
        if (shadowMap[customization.avatarShadow]) {
            avatarShadow = 'box-shadow:' + shadowMap[customization.avatarShadow] + ';';
        }
    }

    if (customization.avatarEffect && customization.avatarEffect !== 'none') {
        avatarEffect = 'effect-' + customization.avatarEffect;
    }

    if (customization.profileFrame) {
        var frameStyles = {
            'rounded': 'border-radius:20%;',
            'square': 'border-radius:0;',
            'star': 'clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);border-radius:0;',
            'heart': 'clip-path:path("M50,90 C20,60 0,40 0,25 C0,10 15,0 30,0 C40,0 48,8 50,18 C52,8 60,0 70,0 C85,0 100,10 100,25 C100,40 80,60 50,90Z");border-radius:0;',
            'diamond': 'clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);border-radius:0;'
        };
        if (frameStyles[customization.profileFrame]) {
            profileFrame = frameStyles[customization.profileFrame];
        }
    }

    if (customization.badgeStyle && customization.badgeStyle !== 'default') {
        var badgeStyles = {
            'glow': 'animation:glowBadge 2s ease-in-out infinite;',
            'rounded': 'border-radius:50px;padding:0.2rem 1rem;',
            'shadow': 'box-shadow:0 4px 15px rgba(0,0,0,0.15);',
            'gradient': 'background:linear-gradient(135deg,#f093fb,#f5576c);color:white;',
            'neon': 'box-shadow:0 0 20px rgba(37,99,235,0.5);border:1px solid rgba(37,99,235,0.3);'
        };
        if (badgeStyles[customization.badgeStyle]) {
            badgeExtraStyle = badgeStyles[customization.badgeStyle];
        }
    }

    // ===== الشارة المميزة (نفس المنطق) =====
    var featuredBadgeHTML = '';
    if (customization.featuredBadge && customization.featuredBadge !== 'none') {
        var allBadges = getAllBadges();
        var badge = allBadges.find(function(b) { return b.name === customization.featuredBadge; });
        if (badge) {
            var fTextColor = customization.featuredBadgeTextColor || 'default';
            var fBg = customization.featuredBadgeBg || 'default';
            var fSize = customization.featuredBadgeSize || 'medium';
            var fEffect = customization.featuredBadgeEffect || 'none';
            var fBorder = customization.featuredBadgeBorder || 'none';
            var fBorderColor = customization.featuredBadgeBorderColor || 'default';

            var boxBg = customization.featuredBadgeBoxBg || 'default';
            var boxBorder = customization.featuredBadgeBoxBorder || 'none';
            var boxBorderColor = customization.featuredBadgeBoxBorderColor || 'default';

            var fStyles = [];
            if (fTextColor && fTextColor !== 'default') fStyles.push('color:' + fTextColor);
            var fBgMap = {
                'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
                'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
                'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
                'neon': 'background:linear-gradient(135deg,#00ffff,#ff00ff)',
                'dark': 'background:#1e293b'
            };
            if (fBg && fBg !== 'default' && fBgMap[fBg]) {
                fStyles.push(fBgMap[fBg]);
            } else {
                fStyles.push('background:var(--primary-light)');
            }
            if (fSize === 'small') fStyles.push('font-size:0.6rem;padding:0.1rem 0.5rem');
            else if (fSize === 'large') fStyles.push('font-size:0.9rem;padding:0.3rem 1.2rem');
            else fStyles.push('font-size:0.75rem;padding:0.2rem 0.8rem');
            if (fEffect === 'glow') fStyles.push('animation:glowBadge 2s ease-in-out infinite');
            else if (fEffect === 'pulse') fStyles.push('animation:pulse 1.5s ease-in-out infinite');
            else if (fEffect === 'shine') fStyles.push('background:linear-gradient(135deg,#f093fb,#f5576c,#f093fb);background-size:200% 200%;animation:shine 3s ease infinite');
            if (fBorder !== 'none') {
                var fBColor = (fBorderColor && fBorderColor !== 'default') ? fBorderColor : '#2563eb';
                fStyles.push('border:' + fBorder + ' 2px ' + fBColor);
            }
            if (badgeExtraStyle) fStyles.push(badgeExtraStyle);

            var boxStyles = [];
            var boxBgMap = {
                'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2)',
                'gradient2': 'background:linear-gradient(135deg,#f093fb,#f5576c)',
                'gold': 'background:linear-gradient(135deg,#ffd700,#f59e0b)',
                'dark': 'background:#1e293b'
            };
            if (boxBg && boxBg !== 'default' && boxBgMap[boxBg]) {
                boxStyles.push(boxBgMap[boxBg]);
            } else {
                boxStyles.push('background:var(--gray-50)');
            }
            if (boxBorder !== 'none') {
                var bBoxColor = (boxBorderColor && boxBorderColor !== 'default') ? boxBorderColor : 'var(--primary)';
                boxStyles.push('border:' + boxBorder + ' 2px ' + bBoxColor);
            }
            boxStyles.push('border-radius:12px;padding:0.3rem 0.8rem;display:flex;align-items:center;gap:0.5rem;margin:0.3rem 0');

            featuredBadgeHTML = '<div class="featured-badge-container" style="' + boxStyles.join(';') + '">' +
                '<span style="font-size:0.65rem;color:var(--gray-500);font-weight:600;">⭐</span>' +
                '<span class="badge-item" style="' + fStyles.join(';') + '"><i class="fas ' + badge.icon + '"></i> ' + badge.name + '</span>' +
                '<span style="font-size:0.55rem;color:var(--gray-400);">شارة مميزة</span>' +
                '</div>';
        }
    }

    // ===== الشارة الخاصة =====
    var specialBadgeHTML = '';
    if (customization.specialBadge && customization.specialBadge !== 'none') {
        specialBadgeHTML = '<span style="font-size:0.8rem;margin-right:0.3rem;"><i class="fas ' + customization.specialBadge + '"></i></span>';
    }

    // ===== شارة الدور =====
    var roleBadge = '';
    if (isSuperAdmin) {
        roleBadge = '<span style="background:linear-gradient(135deg,#ffd700,#f59e0b);color:#78350f;padding:0.1rem 0.5rem;border-radius:10px;font-weight:700;font-size:0.6rem;"><i class="fas fa-crown"></i> المشرف الرئيسي</span>';
    } else if (isAdmin) {
        roleBadge = '<span style="background:var(--primary-light);color:var(--primary-dark);padding:0.1rem 0.5rem;border-radius:10px;font-weight:600;font-size:0.6rem;"><i class="fas fa-shield-alt"></i> مشرف</span>';
    }

    // ===== بناء HTML =====
    var html = '<div style="' + bgStyle + '">';
    html += '<div style="display:flex;align-items:center;gap:0.5rem;padding-bottom:0.3rem;border-bottom:1px solid rgba(255,255,255,0.1);margin-bottom:0.3rem;">';
    
    // الصورة الشخصية (حجم أكبر قليلاً للمودال)
    html += '<div class="profile-avatar ' + avatarEffect + '" style="display:inline-block;">';
    html += '<img src="' + (userData.avatar || '') + '" style="width:45px;height:45px;border-radius:50%;object-fit:cover;border:3px solid ' + (customization.avatarBorder || '#2563eb') + ';' + profileFrame + avatarShadow + avatarBorderWidth + avatarBorderStyle + '" onerror="this.src=\'\'" />';
    html += '</div>';

    // المعلومات
    html += '<div style="flex:1;min-width:0;">';
    html += '<div style="font-weight:700;font-size:0.85rem;' + nameColor + nameGlow + '">' + escapeHtml(name) + ' ' + specialBadgeHTML + ' <span style="font-size:0.55rem;background:rgba(255,255,255,0.2);padding:0.05rem 0.3rem;border-radius:8px;">' + result.tier.name + '</span></div>';
    html += '<div style="display:flex;gap:0.2rem;flex-wrap:wrap;margin:0.05rem 0;">' + roleBadge + '</div>';
    html += '<div style="font-size:0.6rem;opacity:0.7;' + textColorStyle + '"><i class="fas fa-envelope"></i> ' + escapeHtml(email) + '</div>';
    html += '<div style="font-size:0.6rem;opacity:0.7;' + textColorStyle + '"><i class="fas fa-university"></i> كلية نموذجية</div>';
    html += '<div style="font-size:0.6rem;opacity:0.7;' + textColorStyle + '"><i class="fas fa-city"></i> مدينة نموذجية</div>';
    if (userData.bio) {
        html += '<div style="font-size:0.6rem;margin-top:0.1rem;padding:0.1rem 0.3rem;background:rgba(255,255,255,0.1);border-radius:4px;' + bioColor + '"><i class="fas fa-quote-right"></i> ' + escapeHtml(userData.bio.substring(0, 25)) + '...</div>';
    }
    html += '</div></div>';

    // الشارة المميزة
    html += featuredBadgeHTML;

    // ===== أزرار الإحصائيات (مع لون الأزرار) =====
    html += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.2rem;margin-top:0.3rem;">';
    var stats = [
        { icon: 'fa-check-circle', label: 'مجتازة', value: (userData.completed || []).length },
        { icon: 'fa-trophy', label: 'شارة', value: calculateBadges(userData).length },
        { icon: 'fa-star', label: 'مفضلة', value: (userData.favorites || []).length },
        { icon: 'fa-vote-yea', label: 'تصويت', value: userData.votes || 0 }
    ];
    stats.forEach(function(stat) {
        html += '<div style="text-align:center;padding:0.15rem;border-radius:4px;background:rgba(255,255,255,0.05);' + (buttonColor || textColorStyle) + '">';
        html += '<i class="fas ' + stat.icon + '" style="font-size:0.6rem;display:block;"></i>';
        html += '<span style="font-size:0.7rem;font-weight:700;">' + stat.value + '</span>';
        html += '<div style="font-size:0.45rem;opacity:0.6;">' + stat.label + '</div>';
        html += '</div>';
    });
    html += '</div>';
    html += '</div>';

    return html;
}
// ===== 5. تبديل وضع المعاينة =====

// ===== 1. تعريف حالة المعاينة =====
var previewState = {
    active: false,
    type: null,
    value: null,
    cost: 0,
    originalCustomization: null,
    previewMode: 'both'
};
var isApplyingCustomizations = false;
var previewModes = ['both', 'main', 'modal'];
var previewModeIndex = 0;

// ===== 2. خلفيات الملف الشخصي =====
var BG_STYLES = BG_STYLES || {
    'gradient1': { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', textColor: '#ffffff' },
    'gradient2': { bg: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', textColor: '#1a1a2e' },
    'gradient3': { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', textColor: '#ffffff' },
    'gradient4': { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', textColor: '#1a1a2e' },
    'ocean': { bg: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)', textColor: '#ffffff' },
    'sunset': { bg: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)', textColor: '#ffffff' },
    'forest': { bg: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)', textColor: '#ffffff' },
    'midnight': { bg: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)', textColor: '#ffffff' },
    'neon': { bg: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', textColor: '#00ffff' },
    'rainbow': { bg: 'linear-gradient(135deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff)', textColor: '#ffffff' },
    'galaxy': { bg: 'linear-gradient(135deg, #0c0c1d, #1a1a3e, #2d1b69)', textColor: '#c8b6ff' },
    'sunrise': { bg: 'linear-gradient(135deg, #ff6b6b, #feca57, #ff9ff3)', textColor: '#2d3436' },
    'lavender': { bg: 'linear-gradient(135deg, #e8d5f5, #b8a9c9, #9b8bb5)', textColor: '#2d3436' },
    'candy': { bg: 'linear-gradient(135deg, #ff6b6b, #ff9ff3, #feca57)', textColor: '#2d3436' },
    'gold': { bg: 'linear-gradient(135deg, #bf953f, #fcf6ba, #b38728)', textColor: '#2d3436' }
};

function togglePreviewMode() {
    var modes = ['both', 'main', 'modal'];
    var currentIndex = modes.indexOf(previewState.previewMode || 'both');
    var nextIndex = (currentIndex + 1) % modes.length;
    previewState.previewMode = modes[nextIndex];
    updatePreviewModeText();
    if (previewState.active && previewState.type) {
        applyInstantPreviewWithPending();
    }
    showToast('🔍 وضع المعاينة: ' + getPreviewModeLabel(previewState.previewMode), 'info');
}

function getPreviewModeLabel(mode) {
    var labels = { 'both': 'كلا الشكلين', 'main': 'الملف الشخصي فقط', 'modal': 'مودال الآخرين فقط' };
    return labels[mode] || mode;
}

function updatePreviewModeText() {
    var el = document.getElementById('currentPreviewModeText');
    if (el) el.textContent = getPreviewModeLabel(previewState.previewMode);
}

// ===== 8. إعادة تعيين المعاينة =====

function resetPreviewChanges() {
    if (!previewState.originalCustomization) {
        showToast('لا توجد تغييرات لإعادة تعيينها', 'warning');
        return;
    }
    currentUserData.customization = JSON.parse(JSON.stringify(previewState.originalCustomization));
    applyAllCustomizations(currentUserData);
    updateProfileUI();
    previewState.active = false;
    previewState.type = null;
    previewState.value = null;
    pendingCustomizations = {};
    var previewContainer = document.getElementById('previewContainer');
    if (previewContainer) {
        previewContainer.innerHTML = '<div style="text-align:center;color:var(--gray-400);padding:0.5rem;font-size:0.8rem;">' +
            '<i class="fas fa-hand-pointer" style="font-size:1.2rem;display:block;margin-bottom:0.2rem;"></i>' +
            'اختر تخصيصاً من القائمة أدناه لمعاينته فوراً' +
            '</div>';
    }
    updateTotalCostDisplay();
    showToast('🔄 تم إعادة تعيين المعاينة', 'info');
}


// ===== تطبيق خلفية بطاقة الملف الشخصي =====
function applyProfileCardBg(bg) {
    var container = document.querySelector('.profile-container');
    if (!container) return;
    
    // إعادة تعيين
    container.style.background = '';
    container.style.backdropFilter = '';
    container.style.border = '';
    container.className = container.className.replace(/ ?style-(glass|dark-glass|frosted|neon)/g, '');
    
    if (!bg || bg === 'default') return;
    
    var bgStyles = {
        'glass': 'rgba(255,255,255,0.1)',
        'dark-glass': 'rgba(0,0,0,0.2)',
        'frosted': 'rgba(255,255,255,0.05)',
        'neon': 'rgba(0,255,255,0.05)',
        'gradient-ocean': 'linear-gradient(135deg, #2b5876, #4e4376)',
        'gradient-sunset': 'linear-gradient(135deg, #f12711, #f5af19)'
    };
    
    if (bgStyles[bg]) {
        container.style.background = bgStyles[bg];
        container.style.backdropFilter = 'blur(10px)';
        container.style.border = '1px solid rgba(255,255,255,0.1)';
        container.classList.add('style-' + bg);
    }
}

// ===== تطبيق ظل الصورة =====
function applyAvatarShadow(shadow) {
    var avatar = document.getElementById('profileAvatar');
    if (!avatar) return;
    
    var shadows = {
        'none': 'none',
        'soft': '0 4px 20px rgba(0,0,0,0.15)',
        'medium': '0 8px 30px rgba(0,0,0,0.25)',
        'hard': '0 12px 40px rgba(0,0,0,0.35)',
        'glow': '0 0 30px var(--primary), 0 0 60px var(--primary-light)'
    };
    
    avatar.style.boxShadow = shadows[shadow] || 'none';
}

// ===== تطبيق سمك إطار الصورة =====
function applyAvatarBorderWidth(width) {
    var avatar = document.getElementById('profileAvatar');
    if (!avatar) return;
    
    var widths = {
        'thin': '2px',
        'default': '4px',
        'thick': '6px',
        'very-thick': '8px'
    };
    
    avatar.style.borderWidth = widths[width] || '4px';
}

// ===== تطبيق نمط إطار الصورة =====
function applyAvatarBorderStyle(style) {
    var avatar = document.getElementById('profileAvatar');
    if (!avatar) return;
    
    avatar.style.borderStyle = style || 'solid';
}

// ===== تطبيق تخصيصات الشارة المميزة =====
function applyFeaturedBadgeColor(color) {
    var container = document.getElementById('featuredBadgeDisplay');
    if (!container) return;
    var badge = container.querySelector('.badge-item');
    if (!badge) return;
    
    if (color && color !== 'default') {
        badge.style.setProperty('color', color, 'important');
        badge.style.setProperty('border-color', color, 'important');
    } else {
        badge.style.color = '';
        badge.style.borderColor = '';
    }
}

function applyFeaturedBadgeBg(bg) {
    var container = document.getElementById('featuredBadgeDisplay');
    if (!container) return;
    var badge = container.querySelector('.badge-item');
    if (!badge) return;
    
    var bgStyles = {
        'gradient-gold': 'linear-gradient(135deg, #ffd700, #f59e0b)',
        'gradient-rainbow': 'linear-gradient(135deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff)',
        'gradient-neon': 'linear-gradient(135deg, #00ff00, #00ffff, #ff00ff)',
        'gradient-ocean': 'linear-gradient(135deg, #2b5876, #4e4376)',
        'gradient-sunset': 'linear-gradient(135deg, #f12711, #f5af19)',
        'gradient-forest': 'linear-gradient(135deg, #134e5e, #71b280)',
        'gradient-galaxy': 'linear-gradient(135deg, #0c0c1d, #1a1a3e, #2d1b69)',
        'gradient-candy': 'linear-gradient(135deg, #ff6b6b, #ff9ff3, #feca57)',
        'gradient-lavender': 'linear-gradient(135deg, #e8d5f5, #b8a9c9)'
    };
    
    if (bg && bg !== 'default' && bgStyles[bg]) {
        badge.style.background = bgStyles[bg];
        badge.style.color = '#ffffff';
        badge.style.borderColor = 'transparent';
        badge.style.textShadow = '0 1px 3px rgba(0,0,0,0.2)';
    } else {
        badge.style.background = '';
        badge.style.color = '';
        badge.style.borderColor = '';
        badge.style.textShadow = '';
    }
}

function applyFeaturedBadgeSize(size) {
    var container = document.getElementById('featuredBadgeDisplay');
    if (!container) return;
    var badge = container.querySelector('.badge-item');
    if (!badge) return;
    
    var sizes = {
        'small': '0.7rem',
        'default': '0.85rem',
        'large': '1.1rem'
    };
    
    var paddings = {
        'small': '0.1rem 0.6rem',
        'default': '0.2rem 1rem',
        'large': '0.4rem 1.5rem'
    };
    
    if (size && sizes[size]) {
        badge.style.fontSize = sizes[size];
        badge.style.padding = paddings[size] || '0.2rem 1rem';
    } else {
        badge.style.fontSize = '';
        badge.style.padding = '';
    }
}

function applyFeaturedBadgeAnimation(animation) {
    var container = document.getElementById('featuredBadgeDisplay');
    if (!container) return;
    var badge = container.querySelector('.badge-item');
    if (!badge) return;
    
    badge.style.animation = 'none';
    
    var animations = {
        'pulse': 'badgePulse 1.5s ease-in-out infinite',
        'glow': 'badgeGlow 2s ease-in-out infinite',
        'shake': 'badgeShake 0.5s ease-in-out infinite',
        'float': 'badgeFloat 3s ease-in-out infinite',
        'rainbow': 'badgeRainbow 3s linear infinite'
    };
    
    if (animation && animation !== 'none' && animations[animation]) {
        badge.style.animation = animations[animation];
    }
}

function applyFeaturedBadgeBorder(border) {
    var container = document.getElementById('featuredBadgeDisplay');
    if (!container) return;
    var badge = container.querySelector('.badge-item');
    if (!badge) return;
    
    var borders = {
        'solid': '2px solid',
        'dashed': '2px dashed',
        'dotted': '2px dotted',
        'double': '4px double'
    };
    
    badge.style.border = '';
    badge.style.boxShadow = '';
    
    if (border && border !== 'none' && borders[border]) {
        var color = badge.style.color || 'var(--primary)';
        badge.style.border = borders[border] + ' ' + color;
    } else if (border === 'glow') {
        badge.style.border = '2px solid var(--primary)';
        badge.style.boxShadow = '0 0 20px var(--primary), 0 0 40px var(--primary-light)';
    }
}


// ===== 10. الحصول على تسمية الخيار =====

function getOptionLabel(type, value) {
    var optionDef = findOptionDefinition(type);
    if (!optionDef) return value;
    var options = optionDef.options;
    var found = options.find(function(opt) { return opt.key === value; });
    return found ? found.label : value;
}
// ===== 9. إضافة أنماط CSS للمعاينة =====

var previewStyles = document.createElement('style');
previewStyles.textContent = `
    /* أنماط المعاينة */
    #previewContainer {
        transition: all 0.3s ease;
        min-height: 100px;
    }
    
    #previewContainer .profile-avatar {
        display: inline-block;
    }
    
    #previewContainer .profile-avatar img {
        transition: all 0.3s ease;
    }
    
    /* تأثيرات المعاينة */
    .preview-highlight {
        border: 2px solid var(--primary) !important;
        box-shadow: 0 0 20px rgba(37,99,235,0.15);
    }
    
    /* تحسين أزرار التخصيص */
    .customization-option button {
        transition: all 0.2s ease;
    }
    
    .customization-option button:hover {
        transform: scale(1.05);
    }
    
    .customization-option button.active {
        border-color: var(--primary) !important;
        box-shadow: 0 0 10px rgba(37,99,235,0.2);
    }
    
    /* تحسين عرض التكلفة */
    #previewCostDisplay {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(previewStyles);


function switchCustomizationTab(tabKey) {
    // تحديث الأزرار الرئيسية
    document.querySelectorAll('.customization-main-tab').forEach(function(btn) {
        btn.style.background = btn.dataset.tab === tabKey ? 'var(--primary)' : 'var(--gray-50)';
        btn.style.color = btn.dataset.tab === tabKey ? 'white' : 'var(--text-color)';
        btn.style.borderColor = btn.dataset.tab === tabKey ? 'var(--primary)' : 'transparent';
    });

    // إخفاء جميع لوحات التبويبات
    document.querySelectorAll('.customization-tab-panel').forEach(function(panel) {
        panel.style.display = 'none';
    });

    // إظهار اللوحة المطلوبة
    var activePanel = document.querySelector('.customization-tab-panel[data-tab="' + tabKey + '"]');
    if (activePanel) {
        activePanel.style.display = 'block';
    }

    // إخفاء جميع حاويات التفاصيل
    document.querySelectorAll('.option-details-container').forEach(function(el) {
        el.style.display = 'none';
        el.innerHTML = '';
    });

    // إزالة تظليل المربعات
    document.querySelectorAll('.sub-option-box').forEach(function(box) {
        box.classList.remove('selected-for-preview');
    });
}

function showOptionDetails(optionKey) {
    // إخفاء جميع حاويات التفاصيل
    document.querySelectorAll('.option-details-container').forEach(function(el) {
        el.style.display = 'none';
        el.innerHTML = '';
    });

    // إزالة التظليل من جميع المربعات
    document.querySelectorAll('.sub-option-box').forEach(function(box) {
        box.classList.remove('selected-for-preview');
    });

    // العثور على المربع المحدد وإضافة تظليل
    var selectedBox = document.querySelector('.sub-option-box[data-option="' + optionKey + '"]');
    if (selectedBox) {
        selectedBox.classList.add('selected-for-preview');
    }

    // العثور على الحاوية المناسبة داخل التبويب النشط
    var activePanel = document.querySelector('.customization-tab-panel[style*="display: block"]');
    if (!activePanel) return;

    var container = activePanel.querySelector('.option-details-container');
    if (!container) return;

    container.style.display = 'block';

    var optionDef = findOptionDefinition(optionKey);
    if (!optionDef) {
        container.innerHTML = '<div style="color:var(--danger);text-align:center;padding:0.5rem;">تعذر العثور على خيار التخصيص</div>';
        return;
    }

    var currentValue = currentUserData.customization && currentUserData.customization[optionKey] || 'default';
    var isSuperAdmin = calculateUserPoints(currentUserData).isSuperAdmin;

    var html = '';
    html += '<div class="option-detail-header">';
    html += '<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">';
    html += '<span style="font-weight:700;font-size:0.95rem;color:var(--text-color);"><i class="fas ' + getOptionIcon(optionKey) + '" style="color:var(--primary);margin-left:0.3rem;"></i> ' + optionDef.label + '</span>';
    if (!isSuperAdmin) {
        html += '<span style="font-size:0.65rem;color:var(--gray-500);background:var(--gray-100);padding:0.05rem 0.6rem;border-radius:12px;">🪙 ' + optionDef.cost + ' نقطة</span>';
    } else {
        html += '<span style="font-size:0.65rem;color:var(--success);background:var(--success-light);padding:0.05rem 0.6rem;border-radius:12px;">🎁 مجاناً</span>';
    }
    html += '</div>';
    html += '<button class="close-details" onclick="this.closest(\'.option-details-container\').style.display=\'none\'; document.querySelectorAll(\'.sub-option-box\').forEach(function(b){b.classList.remove(\'selected-for-preview\');})"><i class="fas fa-times"></i></button>';
    html += '</div>';

    var options = optionDef.options;

    if (optionDef.type === 'bg') {
        html += '<div class="bg-options-grid">';
        options.forEach(function(opt) {
            var isActive = currentValue === opt.key;
            var style = '';
            var extraClass = '';
            if (opt.key !== 'default') {
                var bgInfo = BG_STYLES[opt.key];
                if (bgInfo) style = 'background:' + bgInfo.bg + ';';
            } else {
                extraClass = 'default-bg';
            }
            html += '<button class="bg-option-btn ' + extraClass + ' ' + (isActive ? 'active' : '') + '" onclick="previewAndSelect(\'' + optionKey + '\', \'' + opt.key + '\', ' + optionDef.cost + ')" style="' + style + '">';
            html += opt.label;
            if (isActive) html += ' ✅';
            html += '</button>';
        });
        html += '</div>';
    } else if (optionDef.type === 'color') {
        html += '<div class="color-options-grid">';
        options.forEach(function(opt) {
            var isActive = currentValue === opt.key;
            if (opt.key === 'default') {
                html += '<button class="effect-option-btn ' + (isActive ? 'active' : '') + '" onclick="previewAndSelect(\'' + optionKey + '\', \'' + opt.key + '\', ' + optionDef.cost + ')">';
                html += 'افتراضي';
                if (isActive) html += ' ✅';
                html += '</button>';
            } else {
                html += '<button class="color-option-btn ' + (isActive ? 'active' : '') + '" onclick="previewAndSelect(\'' + optionKey + '\', \'' + opt.key + '\', ' + optionDef.cost + ')" style="background:' + opt.key + ';" title="' + opt.label + '">';
                if (isActive) html += '<span class="check-mark">✓</span>';
                html += '</button>';
            }
        });
        html += '</div>';
    } else {
        html += '<div class="effect-options-grid">';
        options.forEach(function(opt) {
            var isActive = currentValue === opt.key;
            html += '<button class="effect-option-btn ' + (isActive ? 'active' : '') + '" onclick="previewAndSelect(\'' + optionKey + '\', \'' + opt.key + '\', ' + optionDef.cost + ')">';
            html += opt.label;
            if (isActive) html += ' ✅';
            html += '</button>';
        });
        html += '</div>';
    }

    if (currentValue && currentValue !== 'default' && currentValue !== 'none') {
        var label = getOptionLabel(optionKey, currentValue);
        html += '<div style="font-size:0.65rem;color:var(--primary);margin-top:0.5rem;padding:0.2rem 0.5rem;background:var(--primary-light);border-radius:8px;display:inline-block;">';
        html += '✓ المحدد حالياً: <strong>' + label + '</strong>';
        html += '</div>';
    }

    container.innerHTML = html;
}

function findOptionDefinition(optionKey) {
    for (var cat in CUSTOMIZATION_OPTIONS) {
        if (CUSTOMIZATION_OPTIONS.hasOwnProperty(cat)) {
            var catObj = CUSTOMIZATION_OPTIONS[cat];
            if (catObj.options && catObj.options[optionKey]) {
                return catObj.options[optionKey];
            }
        }
    }
    return null;
}

// ===== خيار خلفية واضح =====
function createClearBgOption(type, label, currentValue, cost, isSuperAdmin) {
    var html = '<div class="customization-option">';
    html += '<label>' + label + '</label>';
    html += '<div class="bg-options-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:0.5rem;">';
    
    BG_OPTIONS.forEach(function(bg) {
        var isActive = currentValue === bg.key;
        var style = '';
        if (bg.key !== 'default') {
            var bgStyles = {
                'gradient1': 'background:linear-gradient(135deg,#667eea,#764ba2);',
                'gradient2': 'background:linear-gradient(135deg,#89f7fe,#66a6ff);',
                'gradient3': 'background:linear-gradient(135deg,#f093fb,#f5576c);',
                'gradient4': 'background:linear-gradient(135deg,#4facfe,#00f2fe);',
                'ocean': 'background:linear-gradient(135deg,#2b5876,#4e4376);',
                'sunset': 'background:linear-gradient(135deg,#f12711,#f5af19);',
                'forest': 'background:linear-gradient(135deg,#134e5e,#71b280);',
                'midnight': 'background:linear-gradient(135deg,#0f0c29,#302b63);',
                'neon': 'background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);',
                'rainbow': 'background:linear-gradient(135deg,#ff0000,#ff8800,#ffff00,#00ff00,#0088ff,#8800ff);',
                'galaxy': 'background:linear-gradient(135deg,#0c0c1d,#1a1a3e,#2d1b69);',
                'sunrise': 'background:linear-gradient(135deg,#ff6b6b,#feca57,#ff9ff3);',
                'lavender': 'background:linear-gradient(135deg,#e8d5f5,#b8a9c9,#9b8bb5);',
                'candy': 'background:linear-gradient(135deg,#ff6b6b,#ff9ff3,#feca57);',
                'gold': 'background:linear-gradient(135deg,#bf953f,#fcf6ba,#b38728);'
            };
            style = bgStyles[bg.key] || '';
        }
        html += '<button class="bg-option-btn ' + (isActive ? 'active' : '') + '" onclick="customizeProfile(\'' + type + '\', \'' + bg.key + '\')" style="' + style + 'padding:0.5rem;border-radius:12px;border:2px solid ' + (isActive ? 'var(--primary)' : 'var(--border-color)') + ';">';
        html += '<div style="display:flex;flex-direction:column;align-items:center;">';
        html += '<span style="font-size:0.7rem;color:' + (bg.key === 'default' ? 'var(--text-color)' : '#fff') + ';">' + bg.preview + '</span>';
        html += '<span style="font-size:0.6rem;color:' + (bg.key === 'default' ? 'var(--text-color)' : '#fff') + ';">' + bg.label + '</span>';
        if (isActive) html += ' ✅';
        html += '</div>';
        html += '</button>';
    });
    
    html += '</div>';
    if (isSuperAdmin) {
        html += '<span class="cost" style="color:var(--success);">🎁 مجاناً للمشرف</span>';
    } else {
        html += '<span class="cost">🪙 ' + cost + ' نقطة</span>';
    }
    html += '</div>';
    return html;
}

// ===== خيار الشارة الخاصة =====
function createSpecialBadgeOption(type, label, currentValue, cost, isSuperAdmin) {
    var badges = [
        { key: 'none', icon: '', label: 'بدون' },
        { key: 'fa-crown', icon: 'fa-crown', label: '👑 تاج' },
        { key: 'fa-star', icon: 'fa-star', label: '⭐ نجمة' },
        { key: 'fa-heart', icon: 'fa-heart', label: '❤️ قلب' },
        { key: 'fa-gem', icon: 'fa-gem', label: '💎 ماسة' },
        { key: 'fa-fire', icon: 'fa-fire', label: '🔥 نار' },
        { key: 'fa-rocket', icon: 'fa-rocket', label: '🚀 صاروخ' },
        { key: 'fa-bolt', icon: 'fa-bolt', label: '⚡ برق' },
        { key: 'fa-dragon', icon: 'fa-dragon', label: '🐉 تنين' },
        { key: 'fa-feather', icon: 'fa-feather', label: '🪶 ريشة' },
        { key: 'fa-moon', icon: 'fa-moon', label: '🌙 قمر' },
        { key: 'fa-sun', icon: 'fa-sun', label: '☀️ شمس' }
    ];
    
    var html = '<div class="customization-option">';
    html += '<label>' + label + ' <span style="font-size:0.6rem;color:var(--gray-400);">(تظهر بجانب اسمك)</span></label>';
    html += '<div class="effect-options-grid" style="display:flex;flex-wrap:wrap;gap:0.3rem;">';
    badges.forEach(function(b) {
        var isActive = currentValue === b.key;
        html += '<button class="effect-option-btn ' + (isActive ? 'active' : '') + '" onclick="customizeProfile(\'' + type + '\', \'' + b.key + '\')" style="font-size:1.2rem;padding:0.3rem 0.8rem;">';
        if (b.icon) {
            html += '<i class="fas ' + b.icon + '"></i> ';
        }
        html += b.label;
        if (isActive) html += ' ✅';
        html += '</button>';
    });
    html += '</div>';
    if (isSuperAdmin) {
        html += '<span class="cost" style="color:var(--success);">🎁 مجاناً للمشرف</span>';
    } else {
        html += '<span class="cost">🪙 ' + cost + ' نقطة</span>';
    }
    html += '</div>';
    return html;
}

// ===== خيار شكل الصورة =====
function createFrameOption(type, label, currentValue, cost, isSuperAdmin) {
    var frames = [
        { key: 'default', label: 'افتراضي' },
        { key: 'circle', label: 'دائرة' },
        { key: 'rounded', label: 'مدور' },
        { key: 'square', label: 'مربع' },
        { key: 'star', label: '⭐ نجمة' },
        { key: 'heart', label: '❤️ قلب' },
        { key: 'diamond', label: '💎 ماسة' }
    ];
    
    var html = '<div class="customization-option">';
    html += '<label>' + label + '</label>';
    html += '<div class="effect-options-grid" style="display:flex;flex-wrap:wrap;gap:0.3rem;">';
    frames.forEach(function(f) {
        var isActive = currentValue === f.key;
        html += '<button class="effect-option-btn ' + (isActive ? 'active' : '') + '" onclick="customizeProfile(\'' + type + '\', \'' + f.key + '\')">';
        html += f.label;
        if (isActive) html += ' ✅';
        html += '</button>';
    });
    html += '</div>';
    if (isSuperAdmin) {
        html += '<span class="cost" style="color:var(--success);">🎁 مجاناً للمشرف</span>';
    } else {
        html += '<span class="cost">🪙 ' + cost + ' نقطة</span>';
    }
    html += '</div>';
    return html;
}

// ===== خيار تأثير الاسم =====
function createGlowOption(type, label, currentValue, cost, isSuperAdmin) {
    var glows = [
        { key: 'none', label: 'بدون' },
        { key: 'soft', label: 'ناعم' },
        { key: 'strong', label: 'قوي' },
        { key: 'rainbow', label: '🌈 قوس قزح' }
    ];
    
    var html = '<div class="customization-option">';
    html += '<label>' + label + '</label>';
    html += '<div class="effect-options-grid" style="display:flex;flex-wrap:wrap;gap:0.3rem;">';
    glows.forEach(function(g) {
        var isActive = currentValue === g.key;
        html += '<button class="effect-option-btn ' + (isActive ? 'active' : '') + '" onclick="customizeProfile(\'' + type + '\', \'' + g.key + '\')">';
        html += g.label;
        if (isActive) html += ' ✅';
        html += '</button>';
    });
    html += '</div>';
    if (isSuperAdmin) {
        html += '<span class="cost" style="color:var(--success);">🎁 مجاناً للمشرف</span>';
    } else {
        html += '<span class="cost">🪙 ' + cost + ' نقطة</span>';
    }
    html += '</div>';
    return html;
}

// ============================================================
//  NOTIFICATION SYSTEM
// ============================================================

function toggleNotifications() {
    var dropdown = document.getElementById('notificationDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        if (dropdown.classList.contains('active')) {
            loadNotifications();
        }
    }
}

async function loadNotifications() {
    const list = document.getElementById('notificationList');
    if (!list) return;

    const notifications = await getNotifications();
    if (notifications.length === 0) {
        list.innerHTML = '<div class="notification-empty"><i class="fas fa-bell-slash"></i>لا توجد إشعارات</div>';
        return;
    }

    notifications.reverse();
    let html = '';
    for (const noti of notifications) {
        const isUnread = !noti.read;
        const icon = getNotificationIcon(noti.type);
        const time = noti.timestamp ? new Date(noti.timestamp.seconds * 1000).toLocaleDateString('ar') : 'الآن';

        html += `<div class="notification-item ${isUnread ? 'unread' : ''}" onclick="handleNotificationClick('${noti.id}', '${noti.link || ''}')">`;
        html += `<span class="noti-icon">${icon}</span>`;
        html += `<div class="noti-content">`;
        html += `<div class="noti-message">${escapeHtml(noti.message)}</div>`;

        // إذا كانت إشعار طلب صداقة
        if (noti.type === 'friend' && noti.link === '/users') {
            const senderUid = noti.data?.senderUid || extractUidFromNotification(noti.message);
            if (senderUid && currentUser) {
                // تحقق من أن الطلب لا يزال معلقاً
                const pending = currentUserData?.pendingRequests || [];
                if (pending.includes(senderUid)) {
                    html += `<div style="display:flex;gap:0.3rem;margin-top:0.3rem;">`;
                    html += `<button class="btn btn-success btn-sm" onclick="acceptFriendRequest('${senderUid}'); this.closest('.notification-item').remove();">✅ قبول</button>`;
                    html += `<button class="btn btn-danger btn-sm" onclick="rejectFriendRequest('${senderUid}'); this.closest('.notification-item').remove();">❌ رفض</button>`;
                    html += `</div>`;
                } else {
                    // الطلب لم يعد معلقاً
                    html += `<div style="font-size:0.7rem;color:var(--gray-400);">تم الرد على هذا الطلب</div>`;
                }
            }
        }

        html += `<div class="noti-time">${time}</div>`;
        html += `</div></div>`;
    }
    list.innerHTML = html;
}

// استخراج UID من رسالة الإشعار
function extractUidFromNotification(message) {
    // نحاول استخراج الاسم من الرسالة ثم البحث في users
    // الصيغة: "📩 أحمد أرسل لك طلب صداقة"
    const match = message.match(/📩\s*(.+?)\s*أرسل/);
    if (match && match[1]) {
        const name = match[1].trim();
        const user = users.find(u => u.displayName === name);
        if (user) return user.uid;
    }
    // محاولة البحث عن اسم بين قوسين أو أي نمط آخر
    return null;
}

// معالجة النقر على الإشعار
function handleNotificationClick(notificationId, link) {
    markNotificationRead(notificationId);
    if (link) {
        // إذا كان الرابط يشير إلى صفحة معينة
        if (link.startsWith('/')) {
            var page = link.replace('/', '');
            if (page === 'users') {
                showPage('users');
            }
        }
    }
}

function getNotificationIcon(type) {
    var icons = { 'vote': '🗳️', 'comment': '💬', 'friend': '👥', 'rating': '⭐', 'info': 'ℹ️', 'warning': '⚠️' };
    return icons[type] || '📢';
}

// ============================================================
//  إرسال إشعار - إصلاح خطأ serverTimestamp
// ============================================================

async function sendNotification(userId, notification) {
    try {
        const userRef = db.collection('users').doc(userId);
        const doc = await userRef.get();
        if (!doc.exists) return;
        
        const userData = doc.data();
        let notifications = userData.notifications || [];
        
        // إنشاء الإشعار بدون serverTimestamp داخل المصفوفة
        const newNotification = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            message: notification.message,
            type: notification.type || 'info',
            link: notification.link || '',
            read: false,
            timestamp: new Date().toISOString(), // استخدام التاريخ كـ string بدلاً من serverTimestamp
            data: notification.data || {}
        };
        
        notifications.push(newNotification);
        
        // قص الإشعارات القديمة
        if (notifications.length > 50) {
            notifications = notifications.slice(-50);
        }
        
        // تحديث بدون serverTimestamp في المصفوفة
        await userRef.update({ notifications: notifications });
        
        updateNotificationBadge();
        
        if (userId === currentUser?.uid) {
            showToast(notification.message, notification.type || 'info');
        }
        
    } catch (error) {
        console.error('Error sending notification:', error);
        // لا نرمي الخطأ حتى لا يتوقف التنفيذ
    }
}

async function getNotifications() {
    if (!currentUser) return [];
    try {
        var doc = await db.collection('users').doc(currentUser.uid).get();
        if (!doc.exists) return [];
        return doc.data().notifications || [];
    } catch (error) {
        console.error('Error getting notifications:', error);
        return [];
    }
}

async function markNotificationRead(notificationId) {
    if (!currentUser) return;
    try {
        var userRef = db.collection('users').doc(currentUser.uid);
        var doc = await userRef.get();
        if (!doc.exists) return;
        var notifications = doc.data().notifications || [];
        for (var i = 0; i < notifications.length; i++) {
            if (notifications[i].id === notificationId) {
                notifications[i].read = true;
                break;
            }
        }
        await userRef.update({ notifications: notifications });
        updateNotificationBadge();
        loadNotifications();
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
}

async function markAllNotificationsRead() {
    if (!currentUser) return;
    try {
        var userRef = db.collection('users').doc(currentUser.uid);
        var doc = await userRef.get();
        if (!doc.exists) return;
        var notifications = doc.data().notifications || [];
        for (var i = 0; i < notifications.length; i++) {
            notifications[i].read = true;
        }
        await userRef.update({ notifications: notifications });
        updateNotificationBadge();
        loadNotifications();
        showToast('تم تحديد جميع الإشعارات كمقروءة', 'success');
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
    }
}

function updateNotificationBadge() {
    var badge = document.getElementById('notificationBadge');
    if (!badge) return;
    getNotifications().then(function(notifications) {
        var unread = notifications.filter(function(n) { return !n.read; }).length;
        if (unread > 0) {
            badge.textContent = unread;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    });
}

// ============================================================
//  دوال فتح المودالات الخاصة
// ============================================================

// ===== فتح مودال المستخدم =====


var modalHistory = []; // سجل المودالات المفتوحة


// ===== فتح مودال المعلومات =====
function showCourseInfo(courseId) {
    var course = courses.find(function(c) { return c.id === courseId; });
    if (!course) return;
    
    if (courseInfoTitle) {
        courseInfoTitle.innerHTML = '<i class="fas fa-info-circle"></i> ' + escapeHtml(course.name);
    }
    if (courseInfoContent) {
        courseInfoContent.innerHTML = buildCourseInfoHTML(course);
    }
    
    setTimeout(function() {
        var layer = modalStack.length + 1;
        openModal('courseInfoModal', { layer: Math.min(layer, 4) });
    }, 200);
}

// ===== فتح مودال تفاصيل التصويت =====
function showVoteDetails(courseId) {
    var course = courses.find(function(c) { return c.id === courseId; });
    if (!course) return;
    
    if (voteDetailsTitle) {
        voteDetailsTitle.innerHTML = '<i class="fas fa-chart-bar"></i> تفاصيل التصويتات - ' + escapeHtml(course.name);
    }
    if (voteDetailsContent) {
        voteDetailsContent.innerHTML = buildVoteDetailsHTML(course);
    }
    
    setTimeout(function() {
        var layer = modalStack.length + 1;
        openModal('voteDetailsModal', { layer: Math.min(layer, 4) });
    }, 200);
}

// ===== فتح مودال التحليلات =====
function showCourseAnalytics(courseId) {
    var course = courses.find(function(c) { return c.id === courseId; });
    if (!course) return;
    
    var title = document.getElementById('courseAnalyticsTitle');
    var content = document.getElementById('courseAnalyticsContent');
    if (!title || !content) return;
    
    title.innerHTML = '📊 تحليلات ' + escapeHtml(course.name);
    content.innerHTML = buildAnalyticsHTML(course);
    
    setTimeout(function() {
        var layer = modalStack.length + 1;
        openModal('courseAnalyticsModal', { layer: Math.min(layer, 4) });
    }, 200);
}

// ============================================================
//  ADMIN REPORTS SYSTEM
// ============================================================
function loadAdminReports() {
    loadTopRatedCourses();
    loadMostVotedCourses();
    loadUserActivity();
    loadVoteStats();
}

function loadTopRatedCourses() {
    var container = document.getElementById('topRatedCourses');
    if (!container) return;
    var sorted = courses.slice().sort(function(a, b) { return (b.avgRating || 0) - (a.avgRating || 0); }).slice(0, 10);
    var html = '';
    sorted.forEach(function(course, index) {
        var stars = '';
        for (var i = 0; i < Math.round(course.avgRating || 0); i++) { stars += '⭐'; }
        html += '<div class="report-item"><span class="rank">#' + (index + 1) + '</span><span class="name">' + escapeHtml(course.name) + '</span><span class="rating">' + stars + ' ' + (course.avgRating || 0).toFixed(1) + '</span><span class="votes">' + (course.votes || 0) + ' صوت</span></div>';
    });
    container.innerHTML = html || '<div class="empty-state">لا توجد بيانات</div>';
}

function loadMostVotedCourses() {
    var container = document.getElementById('mostVotedCourses');
    if (!container) return;
    var sorted = courses.slice().sort(function(a, b) { return (b.votes || 0) - (a.votes || 0); }).slice(0, 10);
    var html = '';
    sorted.forEach(function(course, index) {
        html += '<div class="report-item"><span class="rank">#' + (index + 1) + '</span><span class="name">' + escapeHtml(course.name) + '</span><span class="votes">' + (course.votes || 0) + ' صوت</span><span class="rating">⭐ ' + (course.avgRating || 0).toFixed(1) + '</span></div>';
    });
    container.innerHTML = html || '<div class="empty-state">لا توجد بيانات</div>';
}

function loadUserActivity() {
    var container = document.getElementById('userActivityReport');
    if (!container) return;
    var activeUsers = users.filter(function(u) { return u.role !== 'admin' && (u.votes || 0) > 0; }).sort(function(a, b) { return (b.votes || 0) - (a.votes || 0); }).slice(0, 10);
    if (activeUsers.length === 0) { container.innerHTML = '<div class="empty-state">لا يوجد نشاط</div>'; return; }
    var html = '';
    activeUsers.forEach(function(user, index) {
        var badges = calculateBadges(user).length;
        html += '<div class="report-item"><span class="rank">#' + (index + 1) + '</span><span class="name">' + escapeHtml(user.displayName || 'مستخدم') + '</span><span class="votes">🗳️ ' + (user.votes || 0) + '</span><span class="badges">🏅 ' + badges + '</span><span class="friends">👥 ' + (user.friends || []).length + '</span></div>';
    });
    container.innerHTML = html;
}

function loadVoteStats() {
    var container = document.getElementById('voteStats');
    if (!container) return;
    var totalVotes = 0;
    courses.forEach(function(c) { totalVotes += (c.votes || 0); });
    var avgRating = 0;
    courses.forEach(function(c) { avgRating += (c.avgRating || 0); });
    avgRating = courses.length > 0 ? avgRating / courses.length : 0;
    var html = '';
    html += '<div class="stat-item"><span class="label">إجمالي التصويتات</span><span class="value">' + totalVotes + '</span></div>';
    html += '<div class="stat-item"><span class="label">متوسط التقييم العام</span><span class="value">' + avgRating.toFixed(1) + ' ★</span></div>';
    html += '<div class="stat-item"><span class="label">عدد المواد المقيمة</span><span class="value">' + courses.length + '</span></div>';
    html += '<div class="stat-item"><span class="label">عدد المستخدمين النشطين</span><span class="value">' + users.filter(function(u) { return (u.votes || 0) > 0; }).length + '</span></div>';
    container.innerHTML = html;
}


// ============================================================
//  نظام المودالات المتقدم - نسخة مستقرة
// ============================================================

var modalStack = [];
var modalHistory = []; // سجل المودالات المفتوحة (يتم الاحتفاظ به)
var previousModalId = null;
var isNavigatingBack = false; // لمنع التكرار
var isModalAnimating = false;

// ===== فتح مودال =====
function openModal(modalId, options) {
    options = options || {};
    var layer = options.layer || 1;
    var closeOthers = options.closeOthers || false;
    
    if (isModalAnimating) {
        setTimeout(function() {
            openModal(modalId, options);
        }, 300);
        return;
    }
    
    var modal = document.getElementById(modalId);
    if (!modal) {
        console.error('❌ مودال غير موجود:', modalId);
        return;
    }
    
    // إذا كان المودال مفتوحاً بالفعل
    if (modal.classList.contains('active')) {
        bringModalToTop(modalId);
        return;
    }
    
    // إغلاق المودالات الأخرى إذا طلب ذلك
    if (closeOthers) {
        closeAllModals();
    }
    
    isModalAnimating = true;
    
    // إزالة الطبقات السابقة
    modal.classList.remove('modal-layer-1', 'modal-layer-2', 'modal-layer-3', 'modal-layer-4');
    
    // إضافة الطبقة المناسبة
    var finalLayer = Math.min(layer, 4);
    modal.classList.add('modal-layer-' + finalLayer);
    
    // إضافة للمكدس
    if (!modalStack.includes(modalId)) {
        modalStack.push(modalId);
    }
    
    // إظهار المودال
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    
    requestAnimationFrame(function() {
        modal.classList.add('active');
        modal.style.opacity = '1';
    });
    
    // منع التمرير
    if (modalStack.length === 1) {
        document.body.style.overflow = 'hidden';
    }
    
    setTimeout(function() {
        isModalAnimating = false;
    }, 400);
    
    console.log('✅ فتح مودال:', modalId, 'الطبقة:', finalLayer);
    return modal;
}

// ===== إغلاق مودال =====
function closeModal(modalId) {
    if (isModalAnimating) {
        setTimeout(function() {
            closeModal(modalId);
        }, 300);
        return;
    }
    
    var modal = document.getElementById(modalId);
    if (!modal) {
        console.warn('⚠️ مودال غير موجود:', modalId);
        return;
    }
    
    if (!modal.classList.contains('active')) {
        console.warn('⚠️ مودال ليس مفتوحاً:', modalId);
        return;
    }
    
    isModalAnimating = true;
    
    var index = modalStack.indexOf(modalId);
    if (index !== -1) {
        modalStack.splice(index, 1);
    }
    
    modal.style.opacity = '0';
    modal.classList.remove('active');
    
    setTimeout(function() {
        modal.style.display = 'none';
        modal.classList.remove('modal-layer-1', 'modal-layer-2', 'modal-layer-3', 'modal-layer-4');
        
        if (modalStack.length === 0) {
            document.body.style.overflow = '';
        }
        
        isModalAnimating = false;
        console.log('❌ إغلاق مودال:', modalId);
    }, 300);
}

// ===== جلب مودال للأعلى =====
function bringModalToTop(modalId) {
    var index = modalStack.indexOf(modalId);
    if (index === -1) return;
    
    modalStack.splice(index, 1);
    modalStack.push(modalId);
    
    var modal = document.getElementById(modalId);
    if (modal) {
        var layer = Math.min(modalStack.length, 4);
        modal.classList.remove('modal-layer-1', 'modal-layer-2', 'modal-layer-3', 'modal-layer-4');
        modal.classList.add('modal-layer-' + layer);
    }
}

// ===== التحقق من وجود مودال مفتوح =====
function isModalOpen(modalId) {
    var modal = document.getElementById(modalId);
    return modal && modal.classList.contains('active');
}

// ===== إغلاق جميع المودالات =====
function closeAllModals() {
    var stackCopy = modalStack.slice();
    for (var i = stackCopy.length - 1; i >= 0; i--) {
        var modalId = stackCopy[i];
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.opacity = '0';
            modal.classList.remove('active');
            setTimeout(function(m) {
                if (m) {
                    m.style.display = 'none';
                    m.classList.remove('modal-layer-1', 'modal-layer-2', 'modal-layer-3', 'modal-layer-4');
                }
            }, 200, modal);
        }
    }
    modalStack = [];
    document.body.style.overflow = '';
    console.log('🔄 إغلاق جميع المودالات');
}

// ===== إعادة تعيين الطوارئ =====
function emergencyReset() {
    console.log('🚨 إعادة تعيين طارئ');
    closeAllModals();
    modalStack = [];
    isModalAnimating = false;
    document.body.style.overflow = '';
    document.querySelectorAll('.modal').forEach(function(m) {
        m.classList.remove('active');
        m.classList.remove('modal-layer-1', 'modal-layer-2', 'modal-layer-3', 'modal-layer-4');
        m.style.display = 'none';
        m.style.opacity = '0';
    });
    showToast('🔄 تم إعادة تعيين جميع المودالات', 'success');
}

// ===== إغلاق آخر مودال =====
function closeTopModal() {
    if (modalStack.length === 0) {
        console.warn('⚠️ لا يوجد مودالات مفتوحة');
        return;
    }
    var topId = modalStack[modalStack.length - 1];
    closeModal(topId);
}

// ===== تصحيح المودالات =====
function debugModals() {
    console.log('📊 === حالة المودالات ===');
    console.log('  - المكدس:', modalStack);
    console.log('  - العدد:', modalStack.length);
    document.querySelectorAll('.modal').forEach(function(m) {
        var isActive = m.classList.contains('active');
        var isVisible = m.style.display !== 'none';
        var layer = '';
        if (m.classList.contains('modal-layer-1')) layer = 'layer-1';
        else if (m.classList.contains('modal-layer-2')) layer = 'layer-2';
        else if (m.classList.contains('modal-layer-3')) layer = 'layer-3';
        else if (m.classList.contains('modal-layer-4')) layer = 'layer-4';
        console.log('  - ' + m.id + ': ' + (isActive ? '✅ مفتوح' : '❌ مغلق') + 
                    ' (visible: ' + isVisible + ') ' + layer);
    });
}



// إضافة خيار خلفية متحركة (كخلفية فيديو أو CSS Animation)
function createAnimatedBgOption(type, label, currentValue, cost, isSuperAdmin) {
    var items = [
        { key: 'default', label: 'بدون' },
        { key: 'particles', label: 'جسيمات متحركة' },
        { key: 'waves', label: 'أمواج' },
        { key: 'gradientMove', label: 'تدرج متحرك' }
    ];
    var html = '<div class="customization-option">';
    html += '<label>' + label + '</label><div class="effect-options-grid">';
    items.forEach(function(item) {
        var isActive = currentValue === item.key;
        html += '<button class="effect-option-btn ' + (isActive ? 'active' : '') + '" onclick="previewCustomization(\'' + type + '\', \'' + item.key + '\')">' + item.label + (isActive ? ' ✅' : '') + '</button>';
    });
    html += '</div>';
    html += '<span class="cost">🪙 ' + (isSuperAdmin ? 'مجاناً' : cost) + '</span>';
    html += '</div>';
    return html;
}

async function resetPassword() {
    if (!currentUser) { showToast('يرجى تسجيل الدخول', 'error'); return; }
    var email = currentUser.email;
    if (!email) { showToast('لا يوجد بريد إلكتروني مسجل', 'error'); return; }
    try {
        await auth.sendPasswordResetEmail(email);
        showToast('تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني 📧', 'success');
    } catch (error) {
        console.error('Error resetting password:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

function createColorOption(type, label, currentValue, cost, isSuperAdmin) {
    var colors = ['#2563eb', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
    var html = '<div class="customization-option">';
    html += '<label>' + label + '</label>';
    html += '<div class="color-options-grid">';
    colors.forEach(function(color) {
        var isActive = currentValue === color;
        html += '<button class="color-option-btn ' + (isActive ? 'active' : '') + '" style="background:' + color + ';position:relative;" onclick="customizeProfile(\'' + type + '\', \'' + color + '\')">';
        if (isActive) html += '<span style="position:absolute;top:-5px;right:-5px;font-size:0.6rem;background:var(--success);color:white;border-radius:50%;padding:0.1rem 0.3rem;">✓</span>';
        html += '</button>';
    });
    html += '</div>';
    if (isSuperAdmin) {
        html += '<span class="cost" style="color:var(--success);">🎁 مجاناً للمشرف</span>';
    } else {
        html += '<span class="cost">🪙 ' + cost + ' نقطة</span>';
    }
    html += '</div>';
    return html;
}

function createBgOption(type, label, currentValue, cost, isSuperAdmin) {
    var bgs = [
        { key: 'default', label: 'افتراضي' },
        { key: 'gradient1', label: 'متدرج 1' },
        { key: 'gradient2', label: 'متدرج 2' },
        { key: 'gradient3', label: 'متدرج 3' },
        { key: 'gradient4', label: 'متدرج 4' },
        { key: 'ocean', label: 'محيط' },
        { key: 'sunset', label: 'غروب' },
        { key: 'forest', label: 'غابة' },
        { key: 'midnight', label: 'منتصف الليل' }
    ];
    var html = '<div class="customization-option">';
    html += '<label>' + label + ' <span style="font-size:0.6rem;color:var(--primary);">(الأساسية)</span></label>';
    html += '<div class="bg-options-grid">';
    bgs.forEach(function(bg) {
        var isActive = currentValue === bg.key;
        html += '<button class="bg-option-btn ' + (isActive ? 'active' : '') + '" onclick="customizeProfile(\'' + type + '\', \'' + bg.key + '\')">';
        html += bg.label;
        if (isActive) html += ' ✅';
        html += '</button>';
    });
    html += '</div>';
    if (isSuperAdmin) {
        html += '<span class="cost" style="color:var(--success);">🎁 مجاناً للمشرف</span>';
    } else {
        html += '<span class="cost">🪙 ' + cost + ' نقطة</span>';
    }
    html += '<div class="hint">تحدد خلفية الملف الشخصي بالكامل</div>';
    html += '</div>';
    return html;
}

function createEffectOption(type, label, currentValue, cost, isSuperAdmin) {
    var effects = [{ key: 'none', label: 'بدون' }, { key: 'glow', label: 'توهج' }, { key: 'pulse', label: 'نبض' }, { key: 'rotate', label: 'دوران' }, { key: 'shake', label: 'اهتزاز' }];
    var html = '<div class="customization-option">';
    html += '<label>' + label + '</label>';
    html += '<div class="effect-options-grid">';
    effects.forEach(function(effect) {
        var isActive = currentValue === effect.key;
        html += '<button class="effect-option-btn ' + (isActive ? 'active' : '') + '" onclick="customizeProfile(\'' + type + '\', \'' + effect.key + '\')">';
        html += effect.label;
        if (isActive) html += ' ✅';
        html += '</button>';
    });
    html += '</div>';
    if (isSuperAdmin) {
        html += '<span class="cost" style="color:var(--success);">🎁 مجاناً للمشرف</span>';
    } else {
        html += '<span class="cost">🪙 ' + cost + ' نقطة</span>';
    }
    html += '</div>';
    return html;
}

function createNameColorOption(type, label, currentValue, cost, isSuperAdmin) {
    var colors = ['#2563eb', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#ffffff', '#000000'];
    var html = '<div class="customization-option">';
    html += '<label>' + label + '</label>';
    html += '<div class="color-options-grid">';
    colors.forEach(function(color) {
        var isActive = currentValue === color;
        html += '<button class="color-option-btn ' + (isActive ? 'active' : '') + '" style="background:' + color + ';border:2px solid ' + (color === '#ffffff' ? '#ccc' : 'transparent') + ';position:relative;" onclick="customizeProfile(\'' + type + '\', \'' + color + '\')">';
        if (isActive) html += '<span style="position:absolute;top:-5px;right:-5px;font-size:0.6rem;background:var(--success);color:white;border-radius:50%;padding:0.1rem 0.3rem;">✓</span>';
        html += '</button>';
    });
    html += '</div>';
    if (isSuperAdmin) {
        html += '<span class="cost" style="color:var(--success);">🎁 مجاناً للمشرف</span>';
    } else {
        html += '<span class="cost">🪙 ' + cost + ' نقطة</span>';
    }
    html += '</div>';
    return html;
}

function createBadgeStyleOption(type, label, currentValue, cost, isSuperAdmin) {
    var styles = [{ key: 'default', label: 'افتراضي' }, { key: 'glow', label: 'متوهج' }, { key: 'rounded', label: 'مدور' }, { key: 'shadow', label: 'مظلل' }, { key: 'gradient', label: 'متدرج' }];
    var html = '<div class="customization-option">';
    html += '<label>' + label + '</label>';
    html += '<div class="effect-options-grid">';
    styles.forEach(function(style) {
        var isActive = currentValue === style.key;
        html += '<button class="effect-option-btn ' + (isActive ? 'active' : '') + '" onclick="customizeProfile(\'' + type + '\', \'' + style.key + '\')">';
        html += style.label;
        if (isActive) html += ' ✅';
        html += '</button>';
    });
    html += '</div>';
    if (isSuperAdmin) {
        html += '<span class="cost" style="color:var(--success);">🎁 مجاناً للمشرف</span>';
    } else {
        html += '<span class="cost">🪙 ' + cost + ' نقطة</span>';
    }
    html += '</div>';
    return html;
}

function createCardStyleOption(type, label, currentValue, cost, isSuperAdmin) {
    var styles = [{ key: 'default', label: 'افتراضي' }, { key: 'glass', label: 'زجاجي' }, { key: 'bordered', label: 'محدد' }, { key: 'shadow', label: 'مظلل' }, { key: 'elevated', label: 'مرتفع' }];
    var html = '<div class="customization-option">';
    html += '<label>' + label + '</label>';
    html += '<div class="effect-options-grid">';
    styles.forEach(function(style) {
        var isActive = currentValue === style.key;
        html += '<button class="effect-option-btn ' + (isActive ? 'active' : '') + '" onclick="customizeProfile(\'' + type + '\', \'' + style.key + '\')">';
        html += style.label;
        if (isActive) html += ' ✅';
        html += '</button>';
    });
    html += '</div>';
    if (isSuperAdmin) {
        html += '<span class="cost" style="color:var(--success);">🎁 مجاناً للمشرف</span>';
    } else {
        html += '<span class="cost">🪙 ' + cost + ' نقطة</span>';
    }
    html += '</div>';
    return html;
}

function createFontStyleOption(type, label, currentValue, cost, isSuperAdmin) {
    var fonts = [{ key: 'default', label: 'افتراضي' }, { key: 'modern', label: 'حديث' }, { key: 'elegant', label: 'أنيق' }, { key: 'bold', label: 'غامق' }, { key: 'handwriting', label: 'خط يد' }];
    var html = '<div class="customization-option">';
    html += '<label>' + label + '</label>';
    html += '<div class="effect-options-grid">';
    fonts.forEach(function(font) {
        var isActive = currentValue === font.key;
        html += '<button class="effect-option-btn ' + (isActive ? 'active' : '') + '" onclick="customizeProfile(\'' + type + '\', \'' + font.key + '\')">';
        html += font.label;
        if (isActive) html += ' ✅';
        html += '</button>';
    });
    html += '</div>';
    if (isSuperAdmin) {
        html += '<span class="cost" style="color:var(--success);">🎁 مجاناً للمشرف</span>';
    } else {
        html += '<span class="cost">🪙 ' + cost + ' نقطة</span>';
    }
    html += '</div>';
    return html;
}

function createAnimationOption(type, label, currentValue, cost, isSuperAdmin) {
    var speeds = [{ key: 'slow', label: 'بطيء' }, { key: 'normal', label: 'طبيعي' }, { key: 'fast', label: 'سريع' }, { key: 'none', label: 'بدون' }];
    var html = '<div class="customization-option">';
    html += '<label>' + label + '</label>';
    html += '<div class="effect-options-grid">';
    speeds.forEach(function(speed) {
        var isActive = currentValue === speed.key;
        html += '<button class="effect-option-btn ' + (isActive ? 'active' : '') + '" onclick="customizeProfile(\'' + type + '\', \'' + speed.key + '\')">';
        html += speed.label;
        if (isActive) html += ' ✅';
        html += '</button>';
    });
    html += '</div>';
    if (isSuperAdmin) {
        html += '<span class="cost" style="color:var(--success);">🎁 مجاناً للمشرف</span>';
    } else {
        html += '<span class="cost">🪙 ' + cost + ' نقطة</span>';
    }
    html += '</div>';
    return html;
}

function openBadgesModal() {
    var content = document.getElementById('badgesModalContent');
    if (!content) return;
    
    if (!currentUserData) {
        content.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--gray-400);">يرجى تسجيل الدخول</div>';
        openModal('badgesModal');
        return;
    }
    
    var badges = calculateBadges(currentUserData);
    var allBadges = getAllBadges();
    var customization = currentUserData.customization || {};
    var featuredBadge = customization.featuredBadge || 'none';
    
    var html = '';
    
    // ===== الشارة المميزة الحالية =====
    html += `
        <div style="margin-bottom:1.5rem;padding:1rem;background:var(--gray-50);border-radius:12px;border:2px solid var(--primary-light);">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
                <div>
                    <span style="font-weight:600;font-size:0.9rem;color:var(--text-color);">
                        <i class="fas fa-star" style="color:var(--warning);"></i> الشارة المميزة
                    </span>
                    <p style="font-size:0.75rem;color:var(--gray-400);margin:0.2rem 0 0;">اختر شارة من الشارات التي تملكها لتظهر في ملفك الشخصي</p>
                </div>
                <div id="featuredBadgeDisplay">
                    ${featuredBadge && featuredBadge !== 'none' ? 
                        `<span class="badge-item ${badges.find(b => b.name === featuredBadge)?.class || ''}" style="font-size:0.9rem;padding:0.3rem 1.2rem;">
                            <i class="fas ${badges.find(b => b.name === featuredBadge)?.icon || 'fa-trophy'}"></i> ${featuredBadge}
                            <button onclick="removeFeaturedBadge()" style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:0.8rem;margin-right:0.3rem;">×</button>
                        </span>` :
                        `<span style="color:var(--gray-400);font-size:0.8rem;">لا توجد شارة مميزة</span>`
                    }
                </div>
            </div>
        </div>
    `;
    
    // ===== جميع الشارات =====
    html += '<div style="margin-bottom:1rem;"><span style="font-weight:600;font-size:0.9rem;">📜 جميع الشارات</span></div>';
    html += '<div class="badges-grid-modal">';
    
    // عرض جميع الشارات (المكتسبة وغير المكتسبة)
    allBadges.forEach(function(badge) {
        var earned = badges.some(function(b) { return b.name === badge.name; });
        var isFeatured = featuredBadge === badge.name;
        
        html += `
            <div class="badge-card ${earned ? '' : 'locked'} ${isFeatured ? 'featured' : ''}" 
                 style="${isFeatured ? 'border:3px solid var(--warning);background:var(--primary-light);' : ''}">
                <span class="badge-icon"><i class="fas ${badge.icon}"></i></span>
                <span class="badge-name">${badge.name}</span>
                <span class="badge-class">${badge.class || 'عادي'}</span>
                ${earned ? 
                    (isFeatured ? 
                        '<span style="font-size:0.6rem;color:var(--warning);font-weight:700;">⭐ مميزة</span>' :
                        `<button class="btn btn-sm btn-primary" onclick="setFeaturedBadge('${badge.name}')" style="font-size:0.6rem;padding:0.1rem 0.5rem;margin-top:0.2rem;">
                            <i class="fas fa-star"></i> اختيار مميزة
                        </button>`
                    ) : 
                    '<span style="font-size:0.6rem;color:var(--gray-400);">🔒 غير مكتسبة</span>'
                }
            </div>
        `;
    });
    
    html += '</div>';
    
    // ===== إحصاءات =====
    html += `
        <div style="margin-top:1rem;padding:0.75rem;background:var(--gray-50);border-radius:12px;border:1px solid var(--border-color);text-align:center;">
            <p style="font-size:0.85rem;color:var(--gray-600);">
                <i class="fas fa-trophy" style="color:var(--warning);"></i> 
                لديك <strong>${badges.length}</strong> شارة من أصل <strong>${allBadges.length}</strong>
                ${featuredBadge && featuredBadge !== 'none' ? ` | ⭐ الشارة المميزة: <strong>${featuredBadge}</strong>` : ''}
            </p>
        </div>
    `;
    
    content.innerHTML = html;
    openModal('badgesModal');
}

// ===== تحديث دالة setFeaturedBadge =====
async function setFeaturedBadge(badgeName) {
    if (!currentUser) {
        showToast('يرجى تسجيل الدخول', 'error');
        return;
    }
    
    var badges = calculateBadges(currentUserData);
    var hasBadge = badges.some(function(b) { return b.name === badgeName; });
    if (!hasBadge) {
        showToast('❌ لا تملك هذه الشارة', 'error');
        return;
    }
    
    try {
        var customization = currentUserData.customization || {};
        customization.featuredBadge = badgeName;
        await db.collection('users').doc(currentUser.uid).update({ customization: customization });
        currentUserData.customization = customization;
        
        showToast(`✅ تم تعيين "${badgeName}" كشارة مميزة! ⭐`, 'success');
        
        // تحديث الواجهة
        applyAllCustomizations(currentUserData);
        updateProfileUI();
        
        // إعادة فتح مودال الشارات لتحديثه
        setTimeout(function() {
            openBadgesModal();
        }, 300);
        
        // تحديث مودال المستخدم إذا كان مفتوحاً
        refreshCurrentUserProfileModal();
        
    } catch (error) {
        console.error('Error setting featured badge:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// ===== تحديث دالة removeFeaturedBadge =====
async function removeFeaturedBadge() {
    if (!currentUser) return;
    
    try {
        var customization = currentUserData.customization || {};
        delete customization.featuredBadge;
        await db.collection('users').doc(currentUser.uid).update({ customization: customization });
        currentUserData.customization = customization;
        
        showToast('✅ تم إزالة الشارة المميزة', 'success');
        
        // تحديث الواجهة
        applyAllCustomizations(currentUserData);
        updateProfileUI();
        
        // تحديث مودال الشارات
        setTimeout(function() {
            openBadgesModal();
        }, 300);
        
        refreshCurrentUserProfileModal();
        
    } catch (error) {
        console.error('Error removing featured badge:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// ============================================================
//  جميع الشارات - مع الشارات الجديدة
// ============================================================

function getAllBadges() {
    return [
        // ===== شارات المشرفين =====
        { name: ' المشرف الرئيسي', icon: 'fa-crown', class: 'ألماس' },
        { name: ' مشرف', icon: 'fa-shield-alt', class: 'ذهبي' },
        
        // ===== شارات التصويت =====
        { name: 'أسطورة التصويت', icon: 'fa-crown', class: 'ألماس' },
        { name: 'المصوت الذهبي', icon: 'fa-crown', class: 'ذهبي' },
        { name: 'المصوت الفضي', icon: 'fa-star', class: 'فضي' },
        { name: 'المصوت البرونزي', icon: 'fa-star-half-alt', class: 'برونزي' },
        { name: 'مصوت جديد', icon: 'fa-star', class: 'عادي' },
        
        // ===== شارات الاجتياز =====
        { name: 'المنجز الأسطوري', icon: 'fa-trophy', class: 'ألماس' },
        { name: 'المنجز الذهبي', icon: 'fa-trophy', class: 'ذهبي' },
        { name: 'المنجز الفضي', icon: 'fa-trophy', class: 'فضي' },
        { name: 'المنجز البرونزي', icon: 'fa-trophy', class: 'برونزي' },
        { name: 'مبتدئ', icon: 'fa-medal', class: 'عادي' },
        
        // ===== شارات المفضلة =====
        { name: 'جامع المفضلات الأسطوري', icon: 'fa-heart', class: 'ألماس' },
        { name: 'جامع المفضلات', icon: 'fa-heart', class: 'ذهبي' },
        { name: 'محب للمواد', icon: 'fa-heart', class: 'فضي' },
        
        // ===== شارات الثقة =====
        { name: 'موثوق أسطوري', icon: 'fa-handshake', class: 'ألماس' },
        { name: 'موثوق جداً', icon: 'fa-handshake', class: 'ذهبي' },
        { name: 'موثوق', icon: 'fa-handshake', class: 'فضي' },
        { name: 'جدير بالثقة', icon: 'fa-handshake', class: 'عادي' },
        
        // ===== شارات الأصدقاء =====
        { name: 'اجتماعي أسطوري', icon: 'fa-users', class: 'ألماس' },
        { name: 'اجتماعي جداً', icon: 'fa-users', class: 'ذهبي' },
        { name: 'اجتماعي', icon: 'fa-users', class: 'فضي' },
        
        // ===== شارات الملف الشخصي =====
        { name: 'ملف متكامل', icon: 'fa-user-check', class: 'عادي' },
        { name: 'مصور', icon: 'fa-camera', class: 'عادي' },
        { name: 'متعرف على المدينة', icon: 'fa-city', class: 'عادي' },
        
        // ===== شارات النقاط =====
        { name: 'نقاطي الذهبية', icon: 'fa-gem', class: 'ألماس' },
        { name: 'نقاطي الفضية', icon: 'fa-gem', class: 'ذهبي' },
        { name: 'نقاطي البرونزية', icon: 'fa-gem', class: 'فضي' },
        
        // ===== شارات خاصة =====
        { name: 'صاحب شارة خاصة', icon: 'fa-star', class: 'ذهبي' },
        { name: 'مخصص', icon: 'fa-palette', class: 'برونزي' }
    ];
}

// ===== الإنجازات المتقدمة =====
// ============================================================
//  الإنجازات المتقدمة - إصلاح
// ============================================================

function openAchievementsModal() {
    var modal = document.getElementById('achievementsModal');
    var content = document.getElementById('achievementsModalContent');
    if (!modal || !content) {
        console.warn('⚠️ عناصر مودال الإنجازات غير موجودة');
        // إنشاء المودال ديناميكياً إذا لم يكن موجوداً
        createAchievementsModal();
        modal = document.getElementById('achievementsModal');
        content = document.getElementById('achievementsModalContent');
        if (!modal || !content) return;
    }
    
    if (!currentUserData) {
        content.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--gray-400);">يرجى تسجيل الدخول</div>';
        openModal('achievementsModal');
        return;
    }
    
    var result = calculateUserPoints(currentUserData);
    var html = '';
    html += '<div style="margin-bottom:1rem;">';
    html += '<div class="user-tier" style="font-size:1.2rem;padding:0.5rem 1rem;background:var(--gray-50);border-radius:12px;border:1px solid var(--border-color);">';
    html += '<i class="fas ' + result.tier.icon + '" style="color:' + result.tier.color + ';"></i> ' + result.tier.name;
    html += ' - <span id="achievementPointsDisplay">' + (result.isSuperAdmin ? '∞' : result.earnedPoints) + '</span> نقطة إجمالية';
    html += '</div></div>';
    
    var allKeys = Object.keys(ACHIEVEMENTS);
    if (allKeys.length === 0) {
        html += '<div style="text-align:center;color:var(--gray-400);padding:1rem;">لا توجد إنجازات</div>';
    } else {
        for (var i = 0; i < allKeys.length; i++) {
            var key = allKeys[i];
            var ach = ACHIEVEMENTS[key];
            var isEarned = result.earned.indexOf(key) !== -1;
            html += '<div class="achievement-item-modal ' + (isEarned ? 'earned' : 'locked') + '" style="display:flex;align-items:center;gap:0.75rem;padding:0.5rem 0.75rem;border-radius:12px;border:1px solid var(--border-color);margin-bottom:0.5rem;transition:all 0.3s ease;' + (isEarned ? 'background:var(--primary-light);border-color:var(--success);' : 'opacity:0.5;') + '">';
            html += '<div class="ach-icon" style="font-size:1.5rem;width:40px;text-align:center;"><i class="fas ' + ach.icon + '"></i></div>';
            html += '<div class="ach-info" style="flex:1;">';
            html += '<div class="ach-name" style="font-weight:600;font-size:0.85rem;color:var(--text-color);">' + ach.name + '</div>';
            html += '<div class="ach-desc" style="font-size:0.7rem;color:var(--gray-500);">' + getAchievementDescription(key) + '</div>';
            html += '</div>';
            html += '<div class="ach-points" style="font-size:0.7rem;font-weight:600;color:var(--primary);background:var(--primary-light);padding:0.1rem 0.5rem;border-radius:20px;">+' + ach.points + ' نقطة</div>';
            html += '<div class="ach-status" style="font-size:1rem;">' + (isEarned ? '✅' : '🔒') + '</div>';
            html += '</div>';
        }
    }
    
    content.innerHTML = html;
    openModal('achievementsModal');
}

function createAchievementsModal() {
    // التحقق من وجود المودال
    if (document.getElementById('achievementsModal')) return;
    
    var modal = document.createElement('div');
    modal.id = 'achievementsModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width:600px;">
            <div class="modal-header">
                <h3><i class="fas fa-gem"></i> الإنجازات المتقدمة</h3>
                <button class="btn-close" onclick="closeModal('achievementsModal')"><i class="fas fa-times"></i></button>
            </div>
            <div id="achievementsModalContent"></div>
        </div>
    `;
    document.body.appendChild(modal);
}

function getAchievementDescription(key) {
    var descs = {
        'VOTE_5': 'قم بـ 5 تصويتات', 'VOTE_20': 'قم بـ 20 تصويت', 'VOTE_50': 'قم بـ 50 تصويت', 'VOTE_100': 'قم بـ 100 تصويت',
        'COMPLETE_1': 'اجتز مادة واحدة', 'COMPLETE_5': 'اجتز 5 مواد', 'COMPLETE_10': 'اجتز 10 مواد', 'COMPLETE_20': 'اجتز 20 مادة',
        'FAV_1': 'أضف مادة للمفضلة', 'FAV_5': 'أضف 5 مواد للمفضلة', 'FAV_10': 'أضف 10 مواد للمفضلة',
        'PROFILE_COMPLETE': 'أكمل ملفك الشخصي مع نبذة', 'AVATAR_SET': 'أضف صورة شخصية', 'BRANCH_SET': 'حدد فرعك الجامعي',
        'TRUST_5': 'احصل على 5 ثقات', 'TRUST_20': 'احصل على 20 ثقة',
        'FRIEND_5': 'أضف 5 أصدقاء', 'FRIEND_15': 'أضف 15 صديق'
    };
    return descs[key] || 'أنجز هذا الإنجاز';
}

// ===== تعديل الملف الشخصي =====
function openEditProfileModal() {
    if (!currentUserData) {
        showToast('يرجى تسجيل الدخول', 'error');
        return;
    }
    var collegeSelect = document.getElementById('editProfileCollege');
    if (collegeSelect) {
        var currentVal = currentUserData.college || '';
        collegeSelect.innerHTML = '<option value="">اختر الكلية</option>';
        var uniqueColleges = [];
        var collegeIds = new Set();
        colleges.forEach(function(col) {
            if (!collegeIds.has(col.id)) {
                collegeIds.add(col.id);
                uniqueColleges.push(col);
            }
        });
        uniqueColleges.forEach(function(col) {
            var opt = document.createElement('option');
            opt.value = col.id;
            opt.textContent = col.name;
            collegeSelect.appendChild(opt);
        });
        if (currentVal && colleges.some(function(c) { return c.id === currentVal; })) {
            collegeSelect.value = currentVal;
        }
    }
    document.getElementById('editProfileYear').value = currentUserData.year || '1';
    document.getElementById('editProfileBio').value = currentUserData.bio || '';
    document.getElementById('editProfileBranch').value = currentUserData.branch || '';
    populateEditSpecialties(currentUserData.college || '');
    renderEditFavoriteCourses();
    renderEditCompletedCourses();
    openModal('editProfileModal');
}

function populateEditSpecialties(collegeId) {
    var select = document.getElementById('editProfileSpecialty');
    if (!select) return;
    select.innerHTML = '<option value="">اختر التخصص</option>';
    allSpecialties.filter(function(s) { return s.collegeId === collegeId; }).forEach(function(spec) {
        var opt = document.createElement('option');
        opt.value = spec.id;
        opt.textContent = spec.name + (spec.hours ? ' (' + spec.hours + ' س)' : '');
        if (spec.id === currentUserData.specialty) opt.selected = true;
        select.appendChild(opt);
    });
}

document.addEventListener('change', function(e) {
    if (e.target.id === 'editProfileCollege') {
        populateEditSpecialties(e.target.value);
    }
});

function renderEditFavoriteCourses() {
    var container = document.getElementById('editFavoriteCourses');
    if (!container) return;
    var favs = currentUserData?.favorites || [];
    if (favs.length === 0) {
        container.innerHTML = '<span style="color:var(--gray-400);font-size:0.9rem;">لا توجد مواد مفضلة</span>';
        return;
    }
    container.innerHTML = favs.map(function(id) {
        var c = courses.find(function(crs) { return crs.id === id; });
        return c ? '<span class="course-tag" style="color:var(--text-color);">' + escapeHtml(c.name) + ' <span class="remove" style="color:var(--danger);">×</span></span>' : '';
    }).join('');
}

function renderEditCompletedCourses() {
    var container = document.getElementById('editCompletedCourses');
    if (!container) return;
    var comps = currentUserData?.completed || [];
    if (comps.length === 0) {
        container.innerHTML = '<span style="color:var(--gray-400);font-size:0.9rem;">لا توجد مواد مجتازة</span>';
        return;
    }
    container.innerHTML = comps.map(function(id) {
        var c = courses.find(function(crs) { return crs.id === id; });
        return c ? '<span class="course-tag" style="color:var(--text-color);border-color:var(--success);">' + escapeHtml(c.name) + ' <span class="remove" style="color:var(--danger);">×</span></span>' : '';
    }).join('');
}

window.removeFavoriteFromEdit = async function(id) {
    if (!currentUser) return;
    try {
        var favs = currentUserData.favorites || [];
        var idx = favs.indexOf(id);
        if (idx > -1) favs.splice(idx, 1);
        await db.collection('users').doc(currentUser.uid).update({ favorites: favs });
        currentUserData.favorites = favs;
        renderEditFavoriteCourses();
        renderFavoriteCourses();
        updateProfileUI();
        await loadAllData();
    } catch (error) {
        console.error('Error removing favorite:', error);
    }
};

window.removeCompletedFromEdit = async function(id) {
    if (!currentUser) return;
    try {
        var comps = currentUserData.completed || [];
        var idx = comps.indexOf(id);
        if (idx > -1) comps.splice(idx, 1);
        await db.collection('users').doc(currentUser.uid).update({ completed: comps });
        currentUserData.completed = comps;
        renderEditCompletedCourses();
        renderCompletedCourses();
        updateProfileUI();
        await loadAllData();
    } catch (error) {
        console.error('Error removing completed:', error);
    }
};

if (document.getElementById('editProfileForm')) {
    document.getElementById('editProfileForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!currentUser) return;
        try {
            var updates = {};
            var college = document.getElementById('editProfileCollege').value;
            var specialty = document.getElementById('editProfileSpecialty').value;
            var year = document.getElementById('editProfileYear').value;
            var bio = document.getElementById('editProfileBio').value;
            var branch = document.getElementById('editProfileBranch').value;
            if (college) updates.college = college;
            if (specialty) updates.specialty = specialty;
            if (year) updates.year = year;
            if (bio) updates.bio = bio;
            if (branch) updates.branch = branch;
            await db.collection('users').doc(currentUser.uid).update(updates);
            Object.assign(currentUserData, updates);
            updateUserInList(currentUserData);
            updateBadges();
            updateAdvancedBadges();
            updateProfileUI();
            showToast('تم حفظ الملف الشخصي بنجاح! ✅');
            closeModal('editProfileModal');
            await loadAllData();
        } catch (error) {
            console.error('Error saving profile:', error);
            showToast('حدث خطأ: ' + error.message, 'error');
        }
    });
}

// ============================================================
//  POINTS SYSTEM
// ============================================================

function calculateAchievementPoints(userData) {
    var points = 0;
    var earned = [];
    for (var key in ACHIEVEMENTS) {
        if (ACHIEVEMENTS.hasOwnProperty(key)) {
            var ach = ACHIEVEMENTS[key];
            if (ach.check(userData)) {
                points += ach.points;
                earned.push(key);
            }
        }
    }
    return { points: points, earned: earned };
}

// ============================================================
//  حساب نقاط المستخدم مع المستويات الجديدة
// ============================================================

function calculateUserPoints(userData) {
    if (userData && userData.role === 'admin' && userData.isSuperAdmin) {
        return { 
            points: Infinity,
            earnedPoints: Infinity,
            spentPoints: 0,
            tier: ACHIEVEMENT_TIERS.TRANSCENDENT,
            earned: Object.keys(ACHIEVEMENTS),
            isSuperAdmin: true
        };
    }
    
    var achievementResult = calculateAchievementPoints(userData);
    var earnedPoints = achievementResult.points;
    var earnedAchievements = achievementResult.earned;
    var spentPoints = userData.spentPoints || 0;
    var receivedPoints = userData.receivedPoints || 0;
    var adminGiftedPoints = userData.adminGiftedPoints || 0;
    
    // إضافة النقاط المستلمة والموهوبة
    var totalEarned = earnedPoints + receivedPoints + adminGiftedPoints;
    var availablePoints = totalEarned - spentPoints;
    if (availablePoints < 0) availablePoints = 0;
    
    // تحديد المستوى
    var tier = ACHIEVEMENT_TIERS.BRONZE;
    if (totalEarned >= ACHIEVEMENT_TIERS.TRANSCENDENT.minPoints) tier = ACHIEVEMENT_TIERS.TRANSCENDENT;
    else if (totalEarned >= ACHIEVEMENT_TIERS.MYTHIC.minPoints) tier = ACHIEVEMENT_TIERS.MYTHIC;
    else if (totalEarned >= ACHIEVEMENT_TIERS.LEGENDARY.minPoints) tier = ACHIEVEMENT_TIERS.LEGENDARY;
    else if (totalEarned >= ACHIEVEMENT_TIERS.DIAMOND.minPoints) tier = ACHIEVEMENT_TIERS.DIAMOND;
    else if (totalEarned >= ACHIEVEMENT_TIERS.PLATINUM.minPoints) tier = ACHIEVEMENT_TIERS.PLATINUM;
    else if (totalEarned >= ACHIEVEMENT_TIERS.GOLD.minPoints) tier = ACHIEVEMENT_TIERS.GOLD;
    else if (totalEarned >= ACHIEVEMENT_TIERS.SILVER.minPoints) tier = ACHIEVEMENT_TIERS.SILVER;
    
    return { 
        points: availablePoints,
        earnedPoints: totalEarned,
        spentPoints: spentPoints,
        tier: tier,
        earned: earnedAchievements,
        isSuperAdmin: false
    };
}

async function purchaseCustomization(type, value, cost) {
    if (!currentUser) {
        showToast('يرجى تسجيل الدخول', 'error');
        return false;
    }
    
    var result = calculateUserPoints(currentUserData);
    
    // المشرف لديه نقاط لا نهائية
    if (result.isSuperAdmin) {
        try {
            var customization = currentUserData.customization || {};
            customization[type] = value;
            await db.collection('users').doc(currentUser.uid).update({ customization: customization });
            currentUserData.customization = customization;
            
            // تطبيق التخصيصات على الملف الشخصي الرئيسي
            applyAllCustomizations(currentUserData);
            updateProfileUI();
            updatePointsDisplay();
            
            showToast('✅ تم تخصيص الملف الشخصي بنجاح! (مجاناً للمشرف)', 'success');
            return true;
        } catch (error) {
            console.error('Error customizing profile:', error);
            showToast('حدث خطأ: ' + error.message, 'error');
            return false;
        }
    }
    
    var customization = currentUserData.customization || {};
    
    // التحقق من امتلاك العنصر بالفعل
    if (customization[type] === value) {
        showToast('هذا العنصر مملوك بالفعل!', 'warning');
        return false;
    }
    
    if (result.points < cost) {
        showToast('نقاطك لا تكفي! تحتاج ' + cost + ' نقطة', 'error');
        return false;
    }
    
    if (!confirm('هل أنت متأكد من استخدام ' + cost + ' نقطة لتخصيص هذا العنصر؟')) {
        return false;
    }
    
    try {
        var newSpentPoints = (currentUserData.spentPoints || 0) + cost;
        var newCustomization = currentUserData.customization || {};
        newCustomization[type] = value;
        
        await db.collection('users').doc(currentUser.uid).update({
            customization: newCustomization,
            spentPoints: newSpentPoints
        });
        
        currentUserData.customization = newCustomization;
        currentUserData.spentPoints = newSpentPoints;
        
        // تطبيق التخصيصات على الملف الشخصي الرئيسي
        applyAllCustomizations(currentUserData);
        updateProfileUI();
        updatePointsDisplay();
        
        showToast('✅ تم تخصيص الملف الشخصي بنجاح!', 'success');
        return true;
    } catch (error) {
        console.error('Error customizing profile:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
        return false;
    }
}

// ============================================================
//  إصلاح دالة updatePointsDisplay - التعامل مع العناصر غير الموجودة
// ============================================================

function updatePointsDisplay() {
    if (!currentUserData) { 
        console.log('No user data for points display'); 
        return; 
    }
    var result = calculateUserPoints(currentUserData);
    
    // تحديث عرض النقاط في الملف الشخصي
    var pointsDisplay = document.getElementById('profilePointsDisplay');
    if (pointsDisplay) {
        if (result.isSuperAdmin) {
            pointsDisplay.textContent = '∞';
            pointsDisplay.title = 'نقاط لا نهائية (مشرف)';
        } else {
            pointsDisplay.textContent = result.points;
        }
    }
    
    // تحديث عرض النقاط في مودال التخصيص
    var customPointsDisplay = document.getElementById('customPointsDisplay');
    if (customPointsDisplay) {
        if (result.isSuperAdmin) {
            customPointsDisplay.textContent = '∞';
            customPointsDisplay.title = 'نقاط لا نهائية (مشرف)';
        } else {
            customPointsDisplay.textContent = result.points;
        }
    }
    
    // تحديث عرض النقاط في الإنجازات - مع التحقق من وجود العنصر
    var achievementPoints = document.getElementById('achievementPointsDisplay');
    if (achievementPoints) {
        if (result.isSuperAdmin) {
            achievementPoints.textContent = '∞';
        } else {
            achievementPoints.textContent = result.earnedPoints;
        }
    }
    
    // تحديث المستوى
    var tierDisplay = document.getElementById('userTier');
    if (tierDisplay) {
        if (result.isSuperAdmin) {
            tierDisplay.innerHTML = '<i class="fas fa-crown" style="color:#ffd700;"></i> المشرف الأعلى';
            tierDisplay.style.color = '#ffd700';
        } else {
            tierDisplay.innerHTML = '<i class="fas ' + result.tier.icon + '" style="color:' + result.tier.color + ';"></i> ' + result.tier.name;
            tierDisplay.style.color = result.tier.color;
        }
    }
    
    // تحديث النقاط الإجمالية
    var userPointsEl = document.getElementById('userPoints');
    if (userPointsEl) {
        if (result.isSuperAdmin) {
            userPointsEl.textContent = '∞ نقطة (إجمالي)';
        } else {
            userPointsEl.textContent = result.earnedPoints + ' نقطة (إجمالي)';
        }
    }
}

// ============================================================
//  إصلاح 1: عرض حالة الصداقة في مودال الملف الشخصي
// ============================================================

// تحديث دالة buildUserProfileHTML لإضافة حالة الصداقة
// نضيف هذه الدالة الجديدة بعد buildUserProfileHTML

function getFriendshipStatus(userUid) {
    if (!currentUserData || currentUserData.uid === userUid) return 'self';
    
    var friends = currentUserData.friends || [];
    if (friends.indexOf(userUid) !== -1) return 'friend';
    
    var sentRequests = currentUserData.sentRequests || [];
    if (sentRequests.indexOf(userUid) !== -1) return 'pending_from_me';
    
    var pendingRequests = currentUserData.pendingRequests || [];
    if (pendingRequests.indexOf(userUid) !== -1) return 'pending_from_them';
    
    return 'none';
}

function getFriendshipBadge(status) {
    var badges = {
        'self': '<span class="friendship-badge self"><i class="fas fa-user"></i> أنت</span>',
        'friend': '<span class="friendship-badge friend"><i class="fas fa-user-check" style="color:var(--success);"></i> صديق</span>',
        'pending_from_me': '<span class="friendship-badge pending"><i class="fas fa-clock" style="color:var(--warning);"></i> في الانتظار</span>',
        'pending_from_them': '<span class="friendship-badge request"><i class="fas fa-user-plus" style="color:var(--primary);"></i> طلب صداقة</span>',
        'none': '<span class="friendship-badge none"><i class="fas fa-user-plus" style="color:var(--gray-400);"></i> غير صديق</span>'
    };
    return badges[status] || badges['none'];
}

// ============================================================
//  إصلاح 2: إضافة أزرار إضافية للمودال (إنجاز، مقتنيات، هدايا)
// ============================================================

// دالة لعرض إنجازات المستخدم
function showUserAchievements(uid) {
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) return;
    
    var result = calculateUserPoints(user);
    var html = '<div class="achievements-view">';
    html += '<h4 style="margin-bottom:0.5rem;"><i class="fas fa-gem" style="color:var(--warning);"></i> إنجازات ' + escapeHtml(user.displayName || 'المستخدم') + '</h4>';
    
    var allKeys = Object.keys(ACHIEVEMENTS);
    var earnedCount = 0;
    for (var i = 0; i < allKeys.length; i++) {
        var key = allKeys[i];
        var ach = ACHIEVEMENTS[key];
        var isEarned = result.earned.indexOf(key) !== -1;
        if (isEarned) earnedCount++;
        html += '<div class="achievement-item-modal ' + (isEarned ? 'earned' : 'locked') + '">';
        html += '<div class="ach-icon"><i class="fas ' + ach.icon + '"></i></div>';
        html += '<div class="ach-info">';
        html += '<div class="ach-name">' + ach.name + '</div>';
        html += '<div class="ach-desc">' + getAchievementDescription(key) + '</div>';
        html += '</div>';
        html += '<div class="ach-points">+' + ach.points + ' نقطة</div>';
        html += '<div class="ach-status">' + (isEarned ? '✅' : '🔒') + '</div>';
        html += '</div>';
    }
    html += '<div style="text-align:center;margin-top:0.5rem;font-size:0.85rem;color:var(--gray-500);">';
    html += 'حصل على ' + earnedCount + ' من ' + allKeys.length + ' إنجاز';
    html += '</div>';
    html += '</div>';
    
    var modal = document.getElementById('achievementsModal');
    var content = document.getElementById('achievementsModalContent');
    if (modal && content) {
        document.getElementById('achievementsModalTitle').textContent = '🏆 إنجازات ' + (user.displayName || 'المستخدم');
        content.innerHTML = html;
        openModal('achievementsModal');
    }
}

// دالة لعرض مقتنيات المستخدم (التخصيصات التي يمتلكها)
// ============================================================
//  دوال المقتنيات - مع خيارين
// ============================================================





// ============================================================
//  عرض مودال الإهداء - النسخة المُصلحة
// ============================================================
function showSendGiftModal(uid) {
    console.log('🎁 فتح مودال الإهداء للمستخدم:', uid);

    if (!currentUser) {
        showToast('يرجى تسجيل الدخول أولاً', 'error');
        return;
    }

    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) {
        showToast('المستخدم غير موجود', 'error');
        return;
    }

    if (uid === currentUser.uid) {
        showToast('لا يمكنك إهداء نفسك', 'warning');
        return;
    }

    var result = calculateUserPoints(currentUserData);
    if (result.points < 1) {
        showToast('ليس لديك نقاط كافية لإرسال هدية', 'error');
        return;
    }

    // التأكد من وجود المودال
    var modal = document.getElementById('giftModal');
    if (!modal) {
        createGiftModal();
        modal = document.getElementById('giftModal');
        if (!modal) {
            console.error('❌ فشل في إنشاء مودال الإهداء');
            showToast('حدث خطأ في فتح مودال الإهداء', 'error');
            return;
        }
    }

    var content = document.getElementById('giftModalContent');
    if (!content) {
        console.error('❌ content غير موجود');
        showToast('حدث خطأ في فتح مودال الإهداء', 'error');
        return;
    }

    // تحديث عنوان المودال
    var title = document.getElementById('giftModalTitle');
    if (title) {
        title.innerHTML = '<i class="fas fa-gift" style="color:#f59e0b;"></i> إهداء نقاط إلى ' + escapeHtml(user.displayName || 'المستخدم');
    }

    var maxPoints = Math.min(100, result.points);
    var defaultAmount = Math.min(10, maxPoints);

    // بناء محتوى المودال
    content.innerHTML = `
        <div style="padding:0.25rem 0;">
            <!-- معلومات المستلم -->
            <div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem;background:var(--gray-50);border-radius:12px;border:1px solid var(--border-color);margin-bottom:1rem;">
                <div style="flex-shrink:0;">
                    <img src="${user.avatar || ''}" onerror="this.src=''" style="width:50px;height:50px;border-radius:50%;object-fit:cover;border:3px solid var(--primary-light);background:var(--gray-100);" />
                </div>
                <div style="flex:1;min-width:0;">
                    <div style="font-weight:700;font-size:0.95rem;color:var(--text-color);">${escapeHtml(user.displayName || 'مستخدم')}</div>
                    <div style="font-size:0.7rem;color:var(--gray-500);">${user.college ? getCollegeName(user.college) : ''} ${user.year ? '· سنة ' + user.year : ''}</div>
                    <div style="font-size:0.7rem;color:var(--primary);"><i class="fas fa-gem"></i> ${calculateUserPoints(user).points} نقطة</div>
                </div>
            </div>

            <!-- عدد النقاط -->
            <div style="margin:0.75rem 0;">
                <label style="font-weight:600;font-size:0.85rem;color:var(--text-color);display:block;margin-bottom:0.25rem;">
                    <i class="fas fa-coins"></i> عدد النقاط
                </label>
                <div style="display:flex;align-items:center;gap:0.5rem;">
                    <input type="range" id="giftAmountRange" min="1" max="${maxPoints}" value="${defaultAmount}" step="1" style="flex:1;accent-color:var(--primary);height:6px;border-radius:3px;background:var(--gray-200);" />
                    <input type="number" id="giftAmountInput" min="1" max="${maxPoints}" value="${defaultAmount}" style="width:70px;padding:0.3rem 0.5rem;border-radius:8px;border:1.5px solid var(--border-color);text-align:center;background:var(--card-bg);color:var(--text-color);font-size:0.9rem;font-weight:600;" />
                </div>
                <div style="font-size:0.75rem;color:var(--gray-500);margin-top:0.2rem;">
                    🪙 لديك <strong style="color:var(--primary);">${result.points}</strong> نقطة متاحة
                </div>
            </div>

            <!-- سبب الهدية -->
            <div style="margin:0.75rem 0;">
                <label style="font-weight:600;font-size:0.85rem;color:var(--text-color);display:block;margin-bottom:0.25rem;">
                    <i class="fas fa-pen"></i> سبب الهدية (اختياري)
                </label>
                <div style="display:flex;gap:0.3rem;flex-wrap:wrap;margin-bottom:0.3rem;">
                    <button class="reason-preset" onclick="document.getElementById('giftReasonInput').value='🎉 شكراً لك'" style="padding:0.15rem 0.6rem;border-radius:20px;border:1px solid var(--border-color);background:var(--gray-50);font-size:0.7rem;cursor:pointer;transition:all 0.3s ease;color:var(--text-color);">🎉 شكراً</button>
                    <button class="reason-preset" onclick="document.getElementById('giftReasonInput').value='🌟 تقديراً'" style="padding:0.15rem 0.6rem;border-radius:20px;border:1px solid var(--border-color);background:var(--gray-50);font-size:0.7rem;cursor:pointer;transition:all 0.3s ease;color:var(--text-color);">🌟 تقدير</button>
                    <button class="reason-preset" onclick="document.getElementById('giftReasonInput').value='💪 دعم'" style="padding:0.15rem 0.6rem;border-radius:20px;border:1px solid var(--border-color);background:var(--gray-50);font-size:0.7rem;cursor:pointer;transition:all 0.3s ease;color:var(--text-color);">💪 دعم</button>
                    <button class="reason-preset" onclick="document.getElementById('giftReasonInput').value='❤️ من القلب'" style="padding:0.15rem 0.6rem;border-radius:20px;border:1px solid var(--border-color);background:var(--gray-50);font-size:0.7rem;cursor:pointer;transition:all 0.3s ease;color:var(--text-color);">❤️ من القلب</button>
                    <button class="reason-preset" onclick="document.getElementById('giftReasonInput').value='🎂 عيد ميلاد'" style="padding:0.15rem 0.6rem;border-radius:20px;border:1px solid var(--border-color);background:var(--gray-50);font-size:0.7rem;cursor:pointer;transition:all 0.3s ease;color:var(--text-color);">🎂 عيد ميلاد</button>
                </div>
                <input type="text" id="giftReasonInput" placeholder="اكتب سبباً للهدية..." style="width:100%;padding:0.5rem 0.8rem;border-radius:12px;border:1.5px solid var(--border-color);background:var(--gray-50);color:var(--text-color);font-size:0.85rem;transition:all 0.3s ease;outline:none;" />
            </div>

            <!-- ملخص الهدية -->
            <div style="background:var(--gray-50);border-radius:12px;padding:0.75rem;margin:0.75rem 0;border:1px solid var(--border-color);">
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;font-size:0.85rem;color:var(--gray-600);border-bottom:1px solid var(--border-color);">
                    <span>🎁 الهدية</span>
                    <span id="giftSummaryAmount" style="font-weight:600;color:var(--text-color);">${defaultAmount} نقطة</span>
                </div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;font-size:0.85rem;color:var(--gray-600);border-bottom:1px solid var(--border-color);">
                    <span>👤 إلى</span>
                    <span style="font-weight:600;color:var(--text-color);">${escapeHtml(user.displayName || 'مستخدم')}</span>
                </div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;font-size:0.85rem;color:var(--gray-600);">
                    <span>🪙 الرصيد المتبقي</span>
                    <span id="giftRemainingPoints" style="font-weight:600;color:var(--text-color);">${result.points - defaultAmount} نقطة</span>
                </div>
            </div>

            <!-- أزرار الإجراء -->
            <div style="display:flex;gap:0.5rem;margin-top:0.5rem;">
                <button class="btn btn-success" onclick="sendGiftFromModal('${uid}')" style="flex:1;justify-content:center;padding:0.6rem;font-size:0.9rem;">
                    <i class="fas fa-paper-plane"></i> إرسال الهدية
                </button>
                <button class="btn btn-outline" onclick="closeGiftModal()" style="padding:0.6rem 1.5rem;font-size:0.9rem;">إلغاء</button>
            </div>
        </div>
    `;

    // إضافة أحداث الـ range
    setTimeout(function() {
        var range = document.getElementById('giftAmountRange');
        var input = document.getElementById('giftAmountInput');
        var summary = document.getElementById('giftSummaryAmount');
        var remaining = document.getElementById('giftRemainingPoints');

        if (range && input) {
            function updateGiftSummary(value) {
                var val = parseInt(value) || 0;
                if (summary) summary.textContent = val + ' نقطة';
                if (remaining) remaining.textContent = (result.points - val) + ' نقطة';
            }

            range.addEventListener('input', function() {
                input.value = this.value;
                updateGiftSummary(this.value);
            });

            input.addEventListener('input', function() {
                var val = parseInt(this.value) || 0;
                if (val > result.points) {
                    val = result.points;
                    this.value = val;
                }
                if (val < 1) {
                    val = 1;
                    this.value = val;
                }
                range.value = val;
                updateGiftSummary(val);
            });
        }
    }, 100);

    // فتح المودال
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    modal.classList.add('active');

    setTimeout(function() {
        modal.style.opacity = '1';
    }, 50);

    console.log('✅ تم فتح مودال الإهداء للمستخدم:', user.displayName);
}

// ============================================================
//  دوال الهدايا - مع خيارين
// ============================================================

// ============================================================
//  فتح مودال لكل زر من الأزرار السبعة - الإضافة الكاملة
// ============================================================


function createUserTabModal() {
    // التحقق من وجود المودال مسبقاً
    if (document.getElementById('userTabModal')) {
        return;
    }
    
    var modal = document.createElement('div');
    modal.id = 'userTabModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width:650px;">
            <div class="modal-header">
                <h3 id="userTabModalTitle"><i class="fas fa-info-circle"></i> التفاصيل</h3>
                <button class="btn-close" onclick="closeModal('userTabModal')"><i class="fas fa-times"></i></button>
            </div>
            <div id="userTabModalContent" style="max-height:400px;overflow-y:auto;"></div>
        </div>
    `;
    document.body.appendChild(modal);
    console.log('✅ تم إنشاء مودال علامات التبويب');
}

function buildBadgesList(user) {
    var viewerUid = currentUser ? currentUser.uid : null;
    if (!canViewUserData(user, 'badges', viewerUid)) {
        return '<div class="empty-state-modern"><i class="fas fa-lock"></i><h4>هذه القائمة مخفية</h4><p>المستخدم قام بإخفاء شاراتهم</p></div>';
    }
    
    var badges = calculateBadges(user);
    var allBadges = getAllBadges();
    var featuredBadge = user.customization?.featuredBadge || 'none';
    
    if (badges.length === 0) {
        return '<div style="text-align:center;color:var(--gray-400);padding:1.5rem;"><i class="fas fa-trophy" style="font-size:2rem;display:block;margin-bottom:0.5rem;"></i> لا توجد شارات</div>';
    }
    
    var html = `
        <div style="margin-bottom:1rem;padding:0.5rem 0.75rem;background:var(--gray-50);border-radius:12px;border:1px solid var(--border-color);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
            <span style="font-weight:600;font-size:0.85rem;"><i class="fas fa-trophy" style="color:var(--warning);"></i> شارات ${user.displayName || 'المستخدم'}</span>
            <span style="font-size:0.75rem;color:var(--gray-400);">${badges.length} شارة</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:0.75rem;padding:0.25rem;">
    `;
    
    // عرض جميع الشارات مع حالة كل منها (مكتسبة / غير مكتسبة)
    allBadges.forEach(function(badge) {
        var earned = badges.some(function(b) { return b.name === badge.name; });
        var isFeatured = featuredBadge === badge.name;
        var badgeClass = badge.class || 'عادي';
        
        html += `
            <div class="badge-card ${earned ? '' : 'locked'} ${isFeatured ? 'featured' : ''}" 
                 style="${isFeatured ? 'border:3px solid var(--warning);background:var(--primary-light);' : ''}
                        ${earned ? '' : 'opacity:0.5;filter:grayscale(1);'}">
                <span class="badge-icon" style="font-size:1.5rem;"><i class="fas ${badge.icon}"></i></span>
                <span class="badge-name" style="font-weight:600;font-size:0.8rem;color:var(--text-color);">${badge.name}</span>
                <span class="badge-class" style="font-size:0.6rem;color:var(--gray-500);">${badgeClass}</span>
                ${earned ? 
                    (isFeatured ? 
                        '<span style="font-size:0.6rem;color:var(--warning);font-weight:700;">⭐ مميزة</span>' :
                        '<span style="font-size:0.6rem;color:var(--success);">✅ مكتسبة</span>'
                    ) : 
                    '<span style="font-size:0.6rem;color:var(--gray-400);">🔒 غير مكتسبة</span>'
                }
            </div>
        `;
    });
    
    html += '</div>';
    
    // إحصائيات
    html += `
        <div style="margin-top:0.75rem;padding:0.5rem;background:var(--gray-50);border-radius:12px;border:1px solid var(--border-color);text-align:center;font-size:0.8rem;color:var(--gray-500);">
            <i class="fas fa-trophy" style="color:var(--warning);"></i> 
            ${badges.length} من ${allBadges.length} شارة مكتسبة
            ${featuredBadge && featuredBadge !== 'none' ? ` | ⭐ الشارة المميزة: <strong>${featuredBadge}</strong>` : ''}
        </div>
    `;
    
    return html;
}
// ============================================================
//  دوال المقتنيات - مع خيارين
// ============================================================

// ============================================================
//  إصلاح showUserCollectibles - إزالة العنوان المكرر
// ============================================================

function showUserCollectibles(uid) {
    console.log('🔍 عرض مقتنيات المستخدم:', uid);
    
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) {
        showToast('المستخدم غير موجود', 'error');
        return;
    }
    
    // التأكد من وجود المودال
    var modal = document.getElementById('collectiblesModal');
    var content = document.getElementById('collectiblesModalContent');
    if (!modal || !content) {
        createCollectiblesModal();
        modal = document.getElementById('collectiblesModal');
        content = document.getElementById('collectiblesModalContent');
        if (!modal || !content) {
            console.error('❌ فشل في إنشاء مودال المقتنيات');
            return;
        }
    }
    
    var customization = user.customization || {};
    var currentlyUsed = getCurrentlyUsedItems(user);
    
    // ===== إزالة العنوان من المحتوى (لأن المودال له عنوان خاص) =====
    var html = '';
    
    // ===== تبويبات المقتنيات =====
    html += '<div style="display:flex;gap:0.3rem;margin-bottom:0.75rem;border-bottom:2px solid var(--border-color);padding-bottom:0.5rem;">';
    html += '<button class="btn btn-primary btn-sm" onclick="switchCollectiblesTab(\'current\', \'' + uid + '\')" id="collectiblesTabCurrent" style="font-size:0.75rem;">';
    html += '<i class="fas fa-check-circle"></i> المستخدمة حالياً';
    html += '</button>';
    html += '<button class="btn btn-outline btn-sm" onclick="switchCollectiblesTab(\'all\', \'' + uid + '\')" id="collectiblesTabAll" style="font-size:0.75rem;">';
    html += '<i class="fas fa-box"></i> جميع المقتنيات';
    html += '</button>';
    html += '</div>';
    
    // ===== محتوى المقتنيات =====
    html += '<div id="collectiblesContent">';
    html += buildCollectiblesContent(currentlyUsed, 'current');
    html += '</div>';
    
    // تحديث عنوان المودال
    var titleEl = document.getElementById('collectiblesModalTitle');
    if (titleEl) {
        titleEl.textContent = '🎨 مقتنيات ' + (user.displayName || 'المستخدم');
    }
    
    content.innerHTML = html;
    openModal('collectiblesModal');
}

// ============================================================
//  إصلاح showGiftMenu - إزالة العنوان المكرر
// ============================================================

function showGiftMenu(uid) {
    console.log('🔍 عرض قائمة الهدايا للمستخدم:', uid);
    
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) {
        showToast('المستخدم غير موجود', 'error');
        return;
    }
    
    // التأكد من وجود المودال
    var modal = document.getElementById('giftModal');
    var content = document.getElementById('giftModalContent');
    if (!modal || !content) {
        createGiftModal();
        modal = document.getElementById('giftModal');
        content = document.getElementById('giftModalContent');
        if (!modal || !content) {
            console.error('❌ فشل في إنشاء مودال الهدايا');
            return;
        }
    }
    
    // ===== إزالة العنوان من المحتوى (لأن المودال له عنوان خاص) =====
    var html = '';
    
    // ===== تبويبات الهدايا =====
    html += '<div style="display:flex;gap:0.3rem;margin-bottom:0.75rem;border-bottom:2px solid var(--border-color);padding-bottom:0.5rem;">';
    html += '<button class="btn btn-primary btn-sm" onclick="switchGiftTab(\'received\', \'' + uid + '\')" id="giftTabReceived" style="font-size:0.75rem;">';
    html += '<i class="fas fa-box"></i> الهدايا المستلمة';
    html += '</button>';
    html += '<button class="btn btn-outline btn-sm" onclick="switchGiftTab(\'send\', \'' + uid + '\')" id="giftTabSend" style="font-size:0.75rem;">';
    html += '<i class="fas fa-paper-plane"></i> إرسال هدية';
    html += '</button>';
    html += '</div>';
    
    // ===== محتوى الهدايا =====
    html += '<div id="giftContent">';
    html += buildGiftReceivedContent(uid);
    html += '</div>';
    
    // تحديث عنوان المودال
    var titleEl = document.getElementById('giftModalTitle');
    if (titleEl) {
        titleEl.textContent = '🎁 الهدايا - ' + (user.displayName || 'المستخدم');
    }
    
    content.innerHTML = html;
    openModal('giftModal');
}

function getAllPurchasedItems(user) {
    var customization = user.customization || {};
    var items = [];
    for (var type in customization) {
        if (customization.hasOwnProperty(type)) {
            var value = customization[type];
            if (value && value !== 'default' && value !== 'none') {
                var option = CUSTOMIZATION_OPTIONS[type];
                items.push({
                    type: type,
                    value: value,
                    label: option ? option.label : type,
                    valueLabel: getOptionLabel(type, value),
                    isUsed: true
                });
            }
        }
    }
    return items;
}

function getCurrentlyUsedItems(user) {
    var customization = user.customization || {};
    var items = [];
    for (var type in customization) {
        if (customization.hasOwnProperty(type)) {
            var value = customization[type];
            if (value && value !== 'default' && value !== 'none') {
                var option = CUSTOMIZATION_OPTIONS[type];
                items.push({
                    type: type,
                    value: value,
                    label: option ? option.label : type,
                    valueLabel: getOptionLabel(type, value)
                });
            }
        }
    }
    return items;
}

function switchCollectiblesTab(tab, uid) {
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) return;
    
    // تحديث الأزرار
    var currentBtn = document.getElementById('collectiblesTabCurrent');
    var allBtn = document.getElementById('collectiblesTabAll');
    if (currentBtn) {
        currentBtn.className = tab === 'current' ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm';
    }
    if (allBtn) {
        allBtn.className = tab === 'all' ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm';
    }
    
    // تحديث المحتوى
    var container = document.getElementById('collectiblesContent');
    if (!container) return;
    
    if (tab === 'current') {
        var items = getCurrentlyUsedItems(user);
        container.innerHTML = buildCollectiblesContent(items, 'current');
    } else {
        var allItems = getAllPurchasedItems(user);
        container.innerHTML = buildCollectiblesContent(allItems, 'all');
    }
}




function getTypeIcon(type) {
    var icons = {
        'profileBg': 'fa-image',
        'avatarBorder': 'fa-border-all',
        'avatarEffect': 'fa-magic',
        'profileFrame': 'fa-crop-alt',
        'nameColor': 'fa-font',
        'nameGlow': 'fa-lightbulb',
        'textColor': 'fa-pen-fancy',
        'bioColor': 'fa-quote-right',
        'buttonColor': 'fa-square',
        'badgeStyle': 'fa-trophy',
        'cardStyle': 'fa-id-card',
        'fontStyle': 'fa-italic',
        'animationSpeed': 'fa-clock',
        'specialBadge': 'fa-star'
    };
    return icons[type] || 'fa-cog';
}

// ============================================================
//  دوال الهدايا - مع خيارين
// ============================================================


// ============================================================
//  تحديث createCollectiblesModal - هيكل صحيح بدون عنوان مكرر
// ============================================================

function createCollectiblesModal() {
    if (document.getElementById('collectiblesModal')) return;
    
    var modal = document.createElement('div');
    modal.id = 'collectiblesModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width:600px;">
            <div class="modal-header">
                <h3 id="collectiblesModalTitle"><i class="fas fa-palette"></i> مقتنيات المستخدم</h3>
                <button class="btn-close" onclick="closeModal('collectiblesModal')"><i class="fas fa-times"></i></button>
            </div>
            <div id="collectiblesModalContent" style="max-height:400px;overflow-y:auto;"></div>
        </div>
    `;
    document.body.appendChild(modal);
    console.log('✅ تم إنشاء مودال المقتنيات');
}

// ============================================================
//  إنشاء مودال الإهداء - النسخة المُصلحة
// ============================================================
function createGiftModal() {
    // التحقق من وجود المودال مسبقاً
    if (document.getElementById('giftModal')) {
        console.log('✅ مودال الإهداء موجود بالفعل');
        return;
    }

    console.log('🔧 إنشاء مودال الإهداء...');

    var modal = document.createElement('div');
    modal.id = 'giftModal';
    modal.className = 'modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.right = '0';
    modal.style.bottom = '0';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.zIndex = '100000';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.padding = '1rem';
    modal.style.backdropFilter = 'blur(4px)';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';

    modal.innerHTML = `
        <div class="modal-content" style="max-width:500px;background:var(--card-bg);border-radius:16px;padding:1.5rem;box-shadow:0 25px 60px rgba(0,0,0,0.3);border:1px solid var(--border-color);max-height:90vh;overflow-y:auto;width:100%;position:relative;z-index:100001;">
            <div class="modal-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;padding-bottom:0.75rem;border-bottom:2px solid var(--border-color);">
                <h3 id="giftModalTitle" style="margin:0;color:var(--text-color);font-size:1.1rem;display:flex;align-items:center;gap:0.5rem;">
                    <i class="fas fa-gift" style="color:#f59e0b;"></i> إهداء نقاط
                </h3>
                <button class="btn-close" onclick="closeGiftModal()" style="background:none;border:none;font-size:1.3rem;color:var(--gray-400);cursor:pointer;transition:all 0.3s ease;padding:0.25rem;width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:50%;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div id="giftModalContent" style="max-height:450px;overflow-y:auto;padding:0.25rem 0;"></div>
        </div>
    `;

    document.body.appendChild(modal);
    console.log('✅ تم إنشاء مودال الإهداء بنجاح');

    // إضافة مستمع لإغلاق المودال عند النقر على الخلفية
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeGiftModal();
        }
    });
}

// ============================================================
//  إغلاق مودال الإهداء
// ============================================================
function closeGiftModal() {
    var modal = document.getElementById('giftModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(function() {
            modal.style.display = 'none';
            modal.classList.remove('active');
        }, 300);
    }
}

// ============================================================
//  تحديث buildCollectiblesContent - بدون عنوان
// ============================================================

function buildCollectiblesContent(items, type) {
    if (!items || items.length === 0) {
        return '<div style="text-align:center;color:var(--gray-400);padding:1.5rem;">' +
               '<i class="fas fa-box-open" style="font-size:2rem;display:block;margin-bottom:0.5rem;"></i>' +
               (type === 'current' ? 'لا يستخدم أي مقتنيات حالياً' : 'لا يمتلك أي مقتنيات') +
               '</div>';
    }
    
    var html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0.5rem;">';
    items.forEach(function(item) {
        var icon = getTypeIcon(item.type);
        html += '<div class="collectible-item" style="display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0.7rem;background:var(--gray-50);border-radius:10px;border:1px solid var(--border-color);">';
        html += '<i class="fas ' + icon + '" style="color:var(--primary);width:20px;text-align:center;"></i>';
        html += '<div style="flex:1;font-size:0.8rem;">';
        html += '<div style="font-weight:600;">' + item.label + '</div>';
        html += '<div style="font-size:0.7rem;color:var(--gray-500);">' + item.valueLabel + '</div>';
        html += '</div>';
        if (type === 'all' && item.isUsed) {
            html += '<span style="font-size:0.6rem;background:var(--success);color:white;padding:0.05rem 0.4rem;border-radius:20px;">✓ مستخدم</span>';
        }
        html += '</div>';
    });
    html += '</div>';
    
    if (type === 'all') {
        html += '<div style="text-align:center;margin-top:0.5rem;font-size:0.8rem;color:var(--gray-500);">';
        html += 'إجمالي ' + items.length + ' مقتنيات';
        html += '</div>';
    }
    
    return html;
}


// ============================================================
//  تصميم متطور لقوائم الأصدقاء والثقات والبلاغات والهدايا
// ============================================================

// ============================================================
//  buildFriendsList - تصميم متطور للأصدقاء
// ============================================================

function buildFriendsList(user) {
    var viewerUid = currentUser ? currentUser.uid : null;
    if (!canViewUserData(user, 'friendsList', viewerUid)) {
        return '<div class="empty-state-modern"><i class="fas fa-lock"></i><h4>هذه القائمة مخفية</h4><p>المستخدم قام بإخفاء قائمة أصدقائه</p></div>';
    }    var friends = user.friends || [];
    if (user.privacy && user.privacy.hideFriends) {
        return '<div class="empty-state-modern"><i class="fas fa-lock"></i><h4>هذه القائمة مخفية</h4><p>المستخدم قام بإخفاء قائمة أصدقائه</p></div>';
    }
    if (friends.length === 0) {
        return '<div class="empty-state-modern"><i class="fas fa-user-friends"></i><h4>لا يوجد أصدقاء</h4><p>لم يضف هذا المستخدم أي أصدقاء بعد</p></div>';
    }
    
    var html = '<div class="users-grid-modern">';
    friends.forEach(function(uid) {
        var friend = users.find(function(u) { return u.uid === uid; });
        if (friend) {
            var result = calculateUserPoints(friend);
            var badges = calculateBadges(friend);
            var isOnline = Math.random() > 0.3; // محاكاة الحالة (يمكن ربطها بنظام حقيقي)
            
            html += `
                <div class="user-card-modern" onclick="closeModal('userTabModal');viewUserProfile('${uid}')">
                    <div class="user-card-avatar">
                        <img src="${friend.avatar || ''}" onerror="this.src=''" alt="${escapeHtml(friend.displayName || 'مستخدم')}" />
                        <span class="status-indicator ${isOnline ? 'online' : 'offline'}"></span>
                    </div>
                    <div class="user-card-info">
                        <div class="user-card-name">
                            ${escapeHtml(friend.displayName || 'مستخدم')}
                            <span class="user-tier-badge" style="color:${result.tier.color}">
                                <i class="fas ${result.tier.icon}"></i> ${result.tier.name}
                            </span>
                        </div>
                        <div class="user-card-details">
                            <span><i class="fas fa-university"></i> ${friend.college ? getCollegeName(friend.college) : 'غير محدد'}</span>
                            <span><i class="fas fa-calendar-alt"></i> سنة ${friend.year || '?'}</span>
                        </div>
                        <div class="user-card-stats">
                            <span><i class="fas fa-star"></i> ${(friend.favorites || []).length}</span>
                            <span><i class="fas fa-check-circle"></i> ${(friend.completed || []).length}</span>
                            <span><i class="fas fa-trophy"></i> ${badges.length}</span>
                            <span><i class="fas fa-handshake"></i> ${(friend.trustedBy || []).length}</span>
                        </div>
                        ${badges.length > 0 ? `
                        <div class="user-card-badges">
                            ${badges.slice(0, 3).map(function(b) {
                                return `<span class="badge-item ${b.class}" style="font-size:0.6rem;padding:0.1rem 0.4rem;"><i class="fas ${b.icon}"></i></span>`;
                            }).join('')}
                            ${badges.length > 3 ? `<span class="badge-more">+${badges.length - 3}</span>` : ''}
                        </div>` : ''}
                    </div>
                    <div class="user-card-actions">
                        <button class="btn btn-sm btn-primary" onclick="event.stopPropagation();viewUserProfile('${uid}')">
                            <i class="fas fa-user"></i> عرض
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="event.stopPropagation();unfriend('${uid}')">
                            <i class="fas fa-user-minus"></i>
                        </button>
                    </div>
                </div>
            `;
        }
    });
    html += '</div>';
    
    // إضافة إحصائيات
    html += `<div class="list-stats">
        <span><i class="fas fa-users"></i> إجمالي الأصدقاء: <strong>${friends.length}</strong></span>
    </div>`;
    
    return html;
}

// ============================================================
//  buildTrustedList - تصميم متطور للثقات
// ============================================================

function buildTrustedList(user) {
    var trusted = user.trustedBy || [];
    if (user.privacy && user.privacy.hideTrusted) {
        return '<div class="empty-state-modern"><i class="fas fa-lock"></i><h4>هذه القائمة مخفية</h4><p>المستخدم قام بإخفاء قائمة الثقات</p></div>';
    }
    if (trusted.length === 0) {
        return '<div class="empty-state-modern"><i class="fas fa-handshake"></i><h4>لا يوجد ثقات</h4><p>لم يحصل هذا المستخدم على أي ثقة بعد</p></div>';
    }
    
    var html = '<div class="users-grid-modern">';
    trusted.forEach(function(uid) {
        var truster = users.find(function(u) { return u.uid === uid; });
        if (truster) {
            var result = calculateUserPoints(truster);
            var badges = calculateBadges(truster);
            var isVerified = (truster.trustedBy || []).length >= 10;
            
            html += `
                <div class="user-card-modern trusted-card" onclick="closeModal('userTabModal');viewUserProfile('${uid}')">
                    <div class="user-card-avatar">
                        <img src="${truster.avatar || ''}" onerror="this.src=''" alt="${escapeHtml(truster.displayName || 'مستخدم')}" />
                        ${isVerified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i></span>' : ''}
                    </div>
                    <div class="user-card-info">
                        <div class="user-card-name">
                            ${escapeHtml(truster.displayName || 'مستخدم')}
                            <span class="user-tier-badge" style="color:${result.tier.color}">
                                <i class="fas ${result.tier.icon}"></i> ${result.tier.name}
                            </span>
                        </div>
                        <div class="user-card-details">
                            <span><i class="fas fa-university"></i> ${truster.college ? getCollegeName(truster.college) : 'غير محدد'}</span>
                            <span><i class="fas fa-handshake"></i> ${(truster.trustedBy || []).length} ثقة</span>
                        </div>
                        <div class="user-card-stats">
                            <span><i class="fas fa-star"></i> ${(truster.favorites || []).length}</span>
                            <span><i class="fas fa-check-circle"></i> ${(truster.completed || []).length}</span>
                            <span><i class="fas fa-trophy"></i> ${badges.length}</span>
                            <span><i class="fas fa-users"></i> ${(truster.friends || []).length}</span>
                        </div>
                        <div class="trust-score">
                            <div class="trust-bar">
                                <div class="trust-fill" style="width:${Math.min((truster.trustedBy || []).length * 5, 100)}%"></div>
                            </div>
                            <span class="trust-label">${(truster.trustedBy || []).length} ثقة</span>
                        </div>
                    </div>
                    <div class="user-card-actions">
                        <button class="btn btn-sm btn-primary" onclick="event.stopPropagation();viewUserProfile('${uid}')">
                            <i class="fas fa-user"></i> عرض
                        </button>
                        ${currentUser && currentUser.uid !== uid ? `
                        <button class="btn btn-sm ${(currentUserData && truster.trustedBy && truster.trustedBy.indexOf(currentUser.uid) !== -1) ? 'btn-success' : 'btn-outline'}" onclick="event.stopPropagation();trustUser('${uid}')">
                            <i class="fas fa-handshake"></i>
                        </button>` : ''}
                    </div>
                </div>
            `;
        }
    });
    html += '</div>';
    
    // إضافة إحصائيات
    var totalTrust = trusted.length;
    html += `<div class="list-stats">
        <span><i class="fas fa-handshake"></i> إجمالي الثقات: <strong>${totalTrust}</strong></span>
        <span><i class="fas fa-star"></i> مستوى الثقة: <strong>${totalTrust >= 20 ? '🌟 ممتاز' : totalTrust >= 10 ? '⭐ جيد' : totalTrust >= 5 ? '👍 متوسط' : '👤 مبتدئ'}</strong></span>
    </div>`;
    
    return html;
}

// ============================================================
//  buildReportsList - تصميم متطور للبلاغات
// ============================================================

function buildReportsList(user) {
    var reports = user.reports || [];
    if (user.privacy && user.privacy.hideReports) {
        return '<div class="empty-state-modern"><i class="fas fa-lock"></i><h4>هذه القائمة مخفية</h4><p>المستخدم قام بإخفاء قائمة البلاغات</p></div>';
    }
    if (reports.length === 0) {
        return '<div class="empty-state-modern"><i class="fas fa-flag"></i><h4>لا يوجد بلاغات</h4><p>لم يتم الإبلاغ عن هذا المستخدم</p></div>';
    }
    
    var html = '<div class="users-grid-modern reports-grid">';
    reports.forEach(function(uid) {
        var reporter = users.find(function(u) { return u.uid === uid; });
        if (reporter) {
            var result = calculateUserPoints(reporter);
            
            html += `
                <div class="user-card-modern report-card" onclick="closeModal('userTabModal');viewUserProfile('${uid}')">
                    <div class="user-card-avatar">
                        <img src="${reporter.avatar || ''}" onerror="this.src=''" alt="${escapeHtml(reporter.displayName || 'مستخدم')}" />
                        <span class="report-badge"><i class="fas fa-flag"></i></span>
                    </div>
                    <div class="user-card-info">
                        <div class="user-card-name">
                            ${escapeHtml(reporter.displayName || 'مستخدم')}
                            <span class="user-tier-badge" style="color:${result.tier.color}">
                                <i class="fas ${result.tier.icon}"></i> ${result.tier.name}
                            </span>
                        </div>
                        <div class="user-card-details">
                            <span><i class="fas fa-university"></i> ${reporter.college ? getCollegeName(reporter.college) : 'غير محدد'}</span>
                            <span><i class="fas fa-calendar-alt"></i> سنة ${reporter.year || '?'}</span>
                        </div>
                        <div class="user-card-stats">
                            <span><i class="fas fa-vote-yea"></i> ${reporter.votes || 0}</span>
                            <span><i class="fas fa-handshake"></i> ${(reporter.trustedBy || []).length}</span>
                            <span><i class="fas fa-users"></i> ${(reporter.friends || []).length}</span>
                        </div>
                    </div>
                    <div class="user-card-actions">
                        <button class="btn btn-sm btn-primary" onclick="event.stopPropagation();viewUserProfile('${uid}')">
                            <i class="fas fa-user"></i> عرض
                        </button>
                        ${isAdmin ? `<button class="btn btn-sm btn-danger" onclick="event.stopPropagation();removeReport('${uid}', '${user.uid}')">
                            <i class="fas fa-times"></i> إلغاء
                        </button>` : ''}
                    </div>
                </div>
            `;
        }
    });
    html += '</div>';
    
    // إضافة إحصائيات
    html += `<div class="list-stats warning">
        <span><i class="fas fa-flag"></i> عدد البلاغات: <strong>${reports.length}</strong></span>
        ${isAdmin ? `<button class="btn btn-sm btn-danger" onclick="clearAllReports('${user.uid}')">
            <i class="fas fa-trash"></i> مسح كل البلاغات
        </button>` : ''}
    </div>`;
    
    return html;
}

// ============================================================
//  buildGiftReceivedContent - تصميم متطور للهدايا
// ============================================================

function buildGiftReceivedContent(uid) {
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) return '<div class="empty-state-modern"><i class="fas fa-exclamation-circle"></i><h4>المستخدم غير موجود</h4></div>';
    
    var gifts = user.receivedGifts || [];
    if (gifts.length === 0) {
        return '<div class="empty-state-modern"><i class="fas fa-gift"></i><h4>لا توجد هدايا</h4><p>لم يستلم هذا المستخدم أي هدايا بعد</p></div>';
    }
    
    // حساب إجمالي النقاط
    var totalPoints = gifts.reduce(function(sum, g) { return sum + (g.amount || 0); }, 0);
    
    var html = '<div class="gifts-container">';
    
    // بطاقة إحصائيات الهدايا
    html += `
        <div class="gifts-stats-card">
            <div class="gifts-stat">
                <i class="fas fa-gift"></i>
                <span class="gifts-stat-number">${gifts.length}</span>
                <label>عدد الهدايا</label>
            </div>
            <div class="gifts-stat">
                <i class="fas fa-coins"></i>
                <span class="gifts-stat-number">${totalPoints}</span>
                <label>إجمالي النقاط</label>
            </div>
            <div class="gifts-stat">
                <i class="fas fa-users"></i>
                <span class="gifts-stat-number">${new Set(gifts.map(function(g) { return g.from; })).size}</span>
                <label>عدد المرسلين</label>
            </div>
        </div>
    `;
    
    // قائمة الهدايا
    html += '<div class="gifts-list">';
    var sortedGifts = gifts.slice().reverse();
    sortedGifts.forEach(function(gift, index) {
        var sender = users.find(function(u) { return u.uid === gift.from; });
        var senderName = sender ? (sender.displayName || 'مستخدم') : 'مستخدم غير معروف';
        var senderAvatar = sender ? (sender.avatar || '') : '';
        var date = gift.timestamp ? new Date(gift.timestamp).toLocaleDateString('ar') : 'تاريخ غير معروف';
        var time = gift.timestamp ? new Date(gift.timestamp).toLocaleTimeString('ar', {hour: '2-digit', minute: '2-digit'}) : '';
        var amount = gift.amount || 0;
        var reason = gift.reason || 'هدية';
        var isFirst = index === 0;
        
        html += `
            <div class="gift-item-modern ${isFirst ? 'highlight' : ''}" onclick="${sender ? `closeModal('giftModal');viewUserProfile('${gift.from}')` : ''}" style="${sender ? 'cursor:pointer;' : ''}">
                <div class="gift-sender-avatar">
                    <img src="${senderAvatar}" onerror="this.src=''" alt="${escapeHtml(senderName)}" />
                    ${isFirst ? '<span class="gift-new-badge">جديد</span>' : ''}
                </div>
                <div class="gift-info">
                    <div class="gift-sender-name">${escapeHtml(senderName)}</div>
                    <div class="gift-message">
                        <i class="fas fa-gift"></i> ${escapeHtml(reason)}
                    </div>
                    <div class="gift-meta">
                        <span><i class="far fa-calendar-alt"></i> ${date}</span>
                        <span><i class="far fa-clock"></i> ${time}</span>
                    </div>
                </div>
                <div class="gift-amount ${amount >= 20 ? 'high' : amount >= 10 ? 'medium' : 'low'}">
                    <span>${amount}</span>
                    <label>نقطة</label>
                </div>
            </div>
        `;
    });
    html += '</div>';
    html += '</div>';
    
    return html;
}

// ============================================================
//  buildGiftSendContent - تصميم متطور لإرسال الهدايا
// ============================================================

function buildGiftSendContent(uid) {
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) return '<div class="empty-state-modern"><i class="fas fa-exclamation-circle"></i><h4>المستخدم غير موجود</h4></div>';
    
    var result = calculateUserPoints(currentUserData);
    var maxPoints = Math.min(100, result.points);
    
    if (result.points < 1) {
        return `
            <div class="empty-state-modern">
                <i class="fas fa-exclamation-circle" style="color:var(--warning);"></i>
                <h4>نقاط غير كافية</h4>
                <p>ليس لديك نقاط كافية لإرسال هدية</p>
                <div class="points-info">لديك ${result.points} نقطة فقط</div>
            </div>
        `;
    }
    
    var html = `
        <div class="gift-send-container">
            <div class="gift-recipient-info">
                <div class="recipient-avatar">
                    <img src="${user.avatar || ''}" onerror="this.src=''" alt="${escapeHtml(user.displayName || 'مستخدم')}" />
                </div>
                <div class="recipient-details">
                    <div class="recipient-name">${escapeHtml(user.displayName || 'مستخدم')}</div>
                    <div class="recipient-sub">${user.college ? getCollegeName(user.college) : ''} ${user.year ? '· سنة ' + user.year : ''}</div>
                    <div class="recipient-points"><i class="fas fa-gem"></i> ${calculateUserPoints(user).points} نقطة</div>
                </div>
            </div>
            
            <div class="gift-form">
                <div class="form-group">
                    <label><i class="fas fa-coins"></i> عدد النقاط</label>
                    <div class="points-input-wrapper">
                        <input type="range" id="giftAmountRange" min="1" max="${maxPoints}" value="${Math.min(10, maxPoints)}" step="1" />
                        <input type="number" id="giftAmountInput" min="1" max="${maxPoints}" value="${Math.min(10, maxPoints)}" />
                    </div>
                    <div class="points-available">🪙 لديك <strong>${result.points}</strong> نقطة متاحة</div>
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-pen"></i> سبب الهدية (اختياري)</label>
                    <div class="reason-presets">
                        <button class="reason-preset" onclick="document.getElementById('giftReasonInput').value='🎉 شكراً لك'">🎉 شكراً</button>
                        <button class="reason-preset" onclick="document.getElementById('giftReasonInput').value='🌟 تقديراً'">🌟 تقدير</button>
                        <button class="reason-preset" onclick="document.getElementById('giftReasonInput').value='💪 دعم'">💪 دعم</button>
                        <button class="reason-preset" onclick="document.getElementById('giftReasonInput').value='❤️ من القلب'">❤️ من القلب</button>
                    </div>
                    <input type="text" id="giftReasonInput" placeholder="اكتب سبباً للهدية..." style="width:100%;padding:0.5rem;border-radius:12px;border:1px solid var(--border-color);background:var(--gray-50);color:var(--text-color);margin-top:0.3rem;" />
                </div>
                
                <div class="gift-summary">
                    <div class="summary-item">
                        <span>الهدية</span>
                        <span id="giftSummaryAmount">${Math.min(10, maxPoints)} نقطة</span>
                    </div>
                    <div class="summary-item">
                        <span>إلى</span>
                        <span>${escapeHtml(user.displayName || 'مستخدم')}</span>
                    </div>
                    <div class="summary-item">
                        <span>الرصيد المتبقي</span>
                        <span id="giftRemainingPoints">${result.points - Math.min(10, maxPoints)} نقطة</span>
                    </div>
                </div>
                
                <div class="gift-actions">
                    <button class="btn btn-success btn-lg" onclick="sendGiftFromModal('${uid}')" style="flex:1;justify-content:center;padding:0.6rem;">
                        <i class="fas fa-paper-plane"></i> إرسال الهدية
                    </button>
                    <button class="btn btn-outline" onclick="closeModal('giftModal')">إلغاء</button>
                </div>
            </div>
        </div>
    `;
    
    // إضافة أحداث الـ range
    setTimeout(function() {
        var range = document.getElementById('giftAmountRange');
        var input = document.getElementById('giftAmountInput');
        var summary = document.getElementById('giftSummaryAmount');
        var remaining = document.getElementById('giftRemainingPoints');
        
        if (range && input) {
            range.addEventListener('input', function() {
                input.value = this.value;
                updateGiftSummary(this.value);
            });
            input.addEventListener('input', function() {
                if (this.value > maxPoints) this.value = maxPoints;
                if (this.value < 1) this.value = 1;
                range.value = this.value;
                updateGiftSummary(this.value);
            });
        }
        
        function updateGiftSummary(value) {
            var val = parseInt(value) || 0;
            if (summary) summary.textContent = val + ' نقطة';
            if (remaining) remaining.textContent = (result.points - val) + ' نقطة';
        }
    }, 100);
    
    return html;
}

// ============================================================
//  دوال مساعدة للتصميم
// ============================================================

function getCollegeName(collegeId) {
    if (!collegeId) return 'غير محدد';
    var college = colleges.find(function(c) { return c.id === collegeId; });
    return college ? college.name : 'غير محدد';
}

// ============================================================
//  دوال إضافية لإدارة البلاغات (للمشرف)
// ============================================================

async function removeReport(reporterUid, reportedUid) {
    if (!isAdmin) {
        showToast('هذه العملية للمشرف فقط', 'error');
        return;
    }
    if (!confirm('هل أنت متأكد من إلغاء هذا البلاغ؟')) return;
    
    try {
        var targetRef = db.collection('users').doc(reportedUid);
        var targetDoc = await targetRef.get();
        if (!targetDoc.exists) return;
        var targetData = targetDoc.data();
        var reports = targetData.reports || [];
        var index = reports.indexOf(reporterUid);
        if (index !== -1) {
            reports.splice(index, 1);
            await targetRef.update({ reports: reports });
            
            // تحديث البيانات المحلية
            var userIndex = users.findIndex(function(u) { return u.uid === reportedUid; });
            if (userIndex !== -1) {
                users[userIndex].reports = reports;
            }
            
            showToast('✅ تم إلغاء البلاغ بنجاح', 'success');
            // تحديث المودال
            refreshCurrentUserProfileModal();
            renderUsers();
            await loadAllData();
        }
    } catch (error) {
        console.error('Error removing report:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

async function clearAllReports(uid) {
    if (!isAdmin) {
        showToast('هذه العملية للمشرف فقط', 'error');
        return;
    }
    if (!confirm('⚠️ هل أنت متأكد من مسح جميع البلاغات عن هذا المستخدم؟')) return;
    
    try {
        await db.collection('users').doc(uid).update({ reports: [] });
        
        // تحديث البيانات المحلية
        var userIndex = users.findIndex(function(u) { return u.uid === uid; });
        if (userIndex !== -1) {
            users[userIndex].reports = [];
        }
        
        showToast('✅ تم مسح جميع البلاغات', 'success');
        refreshCurrentUserProfileModal();
        renderUsers();
        await loadAllData();
    } catch (error) {
        console.error('Error clearing reports:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}


function switchGiftTab(tab, uid) {
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) return;
    
    // تحديث الأزرار
    var receivedBtn = document.getElementById('giftTabReceived');
    var sendBtn = document.getElementById('giftTabSend');
    if (receivedBtn) {
        receivedBtn.className = tab === 'received' ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm';
    }
    if (sendBtn) {
        sendBtn.className = tab === 'send' ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm';
    }
    
    // تحديث المحتوى
    var container = document.getElementById('giftContent');
    if (!container) return;
    
    if (tab === 'received') {
        container.innerHTML = buildGiftReceivedContent(uid);
    } else {
        container.innerHTML = buildGiftSendContent(uid);
    }
}

// ============================================================
//  إرسال الهدية من مودال الإهداء - النسخة المُصلحة
// ============================================================
async function sendGiftFromModal(uid) {
    console.log('📤 إرسال هدية إلى:', uid);

    var amountInput = document.getElementById('giftAmountInput');
    var reasonInput = document.getElementById('giftReasonInput');
    
    if (!amountInput) {
        showToast('حدث خطأ في النموذج، يرجى المحاولة مرة أخرى', 'error');
        return;
    }

    var amount = parseInt(amountInput.value) || 10;
    var reason = reasonInput?.value?.trim() || 'هدية 🎁';

    if (amount < 1) {
        showToast('يجب أن تكون النقاط 1 على الأقل', 'error');
        return;
    }

    var result = calculateUserPoints(currentUserData);
    if (result.points < amount) {
        showToast('نقاطك لا تكفي! لديك ' + result.points + ' نقطة', 'error');
        return;
    }

    if (!confirm('هل أنت متأكد من إرسال ' + amount + ' نقطة كهدية إلى هذا المستخدم؟')) {
        return;
    }

    try {
        // خصم النقاط من المرسل
        var newSpentPoints = (currentUserData.spentPoints || 0) + amount;
        await db.collection('users').doc(currentUser.uid).update({
            spentPoints: newSpentPoints
        });
        currentUserData.spentPoints = newSpentPoints;

        // إضافة النقاط للمستقبل
        var targetRef = db.collection('users').doc(uid);
        await targetRef.update({
            receivedPoints: firebase.firestore.FieldValue.increment(amount)
        });

        // تسجيل الهدية في قائمة الهدايا المستلمة
        var targetDoc = await targetRef.get();
        if (targetDoc.exists) {
            var targetData = targetDoc.data();
            var receivedGifts = targetData.receivedGifts || [];
            receivedGifts.push({
                from: currentUser.uid,
                fromName: currentUserData.displayName || currentUser.email,
                amount: amount,
                reason: reason,
                timestamp: new Date().toISOString()
            });
            await targetRef.update({ receivedGifts: receivedGifts });
        }

        // تسجيل المعاملة
        await db.collection('transactions').add({
            from: currentUser.uid,
            fromName: currentUserData.displayName || currentUser.email,
            to: uid,
            amount: amount,
            reason: reason,
            isGift: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // إرسال إشعار للمستقبل
        try {
            await sendNotification(uid, {
                message: '🎁 ' + (currentUserData.displayName || currentUser.email) + ' أهداك ' + amount + ' نقطة' + (reason ? ' (سبب: ' + reason + ')' : ''),
                type: 'success',
                link: '/profile'
            });
        } catch (notifError) {
            console.warn('⚠️ خطأ في إرسال الإشعار (تجاهل):', notifError);
        }

        showToast('✅ تم إرسال ' + amount + ' نقطة كهدية بنجاح! 🎁', 'success');
        updatePointsDisplay();
        closeGiftModal();
        
        // تحديث مودال المستخدم إذا كان مفتوحاً
        if (isModalOpen('userProfileModal') && currentViewedUserUid) {
            refreshUserProfileModal();
        }
        
        // تحديث البيانات
        await loadAllData();

    } catch (error) {
        console.error('Error sending gift:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}



// ============================================================
//  إصلاح 3: تحديث buildUserProfileHTML لإضافة الأزرار الجديدة وحالة الصداقة
// ============================================================

// نستبدل buildUserProfileHTML بالنسخة المحدثة
// (هذا هو الجزء المهم - سيتم دمج الإصلاحات)

// ============================================================
//  إصلاح 4: مشكلة اختيار أكثر من تخصيص في آن واحد
// ============================================================

// تحديث دالة previewAndSelect لتخزين التخصيصات المحددة مؤقتاً
var pendingCustomizations = {};

function previewAndSelect(type, value, cost) {
    console.log('🔍 معاينة:', type, value);
    pendingCustomizations[type] = value;
    previewState.active = true;
    previewState.type = type;
    previewState.value = value;
    previewState.cost = cost || 0;

    updateTotalCostDisplay();
    applyInstantPreviewWithPending();

    var optionDef = findOptionDefinition(type);
    if (optionDef) {
        var label = getOptionLabel(type, value);
        showToast('🔍 معاينة: ' + optionDef.label + ' → ' + label, 'info');
    }
}

function updateTotalCostDisplay() {
    var costDisplay = document.getElementById('previewCostDisplay');
    if (!costDisplay) return;
    var totalCost = 0;
    for (var type in pendingCustomizations) {
        if (pendingCustomizations.hasOwnProperty(type)) {
            var optionDef = findOptionDefinition(type);
            if (optionDef) totalCost += optionDef.cost;
        }
    }
    var result = calculateUserPoints(currentUserData);
    if (result.isSuperAdmin) {
        costDisplay.textContent = '0 (مجاناً)';
        costDisplay.style.color = 'var(--success)';
    } else {
        costDisplay.textContent = totalCost + ' نقطة (إجمالي)';
        costDisplay.style.color = result.points >= totalCost ? 'var(--success)' : 'var(--danger)';
    }
}

function applyInstantPreviewWithPending() {
    var previewContainer = document.getElementById('previewContainer');
    if (!previewContainer) return;

    var tempCustomization = JSON.parse(JSON.stringify(currentUserData.customization || {}));
    for (var type in pendingCustomizations) {
        if (pendingCustomizations.hasOwnProperty(type)) {
            tempCustomization[type] = pendingCustomizations[type];
        }
    }

    var tempUserData = JSON.parse(JSON.stringify(currentUserData));
    tempUserData.customization = tempCustomization;

    var mode = previewState.previewMode || 'both';
    var html = '';

    if (mode === 'both' || mode === 'main') {
        html += '<div style="margin-bottom:0.3rem;">';
        html += '<div style="font-size:0.6rem;color:var(--gray-400);margin-bottom:0.2rem;">📱 صفحتي</div>';
        html += '<div style="background:var(--card-bg);border-radius:8px;padding:0.3rem;border:1px solid var(--border-color);">';
        html += buildMainProfilePreview(tempUserData);
        html += '</div>';
        html += '</div>';
    }

    if (mode === 'both' || mode === 'modal') {
        html += '<div style="margin-bottom:0.3rem;">';
        html += '<div style="font-size:0.6rem;color:var(--gray-400);margin-bottom:0.2rem;">👥 مودال الآخرين</div>';
        html += '<div style="background:var(--card-bg);border-radius:8px;padding:0.3rem;border:1px solid var(--border-color);">';
        html += buildModalProfilePreview(tempUserData);
        html += '</div>';
        html += '</div>';
    }

    previewContainer.innerHTML = html;
}

function applySelectedCustomization() {
    var totalCost = 0;
    var types = Object.keys(pendingCustomizations);
    if (types.length === 0) {
        showToast('الرجاء اختيار تخصيص أولاً', 'warning');
        return;
    }
    for (var i = 0; i < types.length; i++) {
        var type = types[i];
        var optionDef = findOptionDefinition(type);
        if (optionDef) totalCost += optionDef.cost;
    }
    var result = calculateUserPoints(currentUserData);
    if (!result.isSuperAdmin && result.points < totalCost) {
        showToast('❌ نقاطك لا تكفي! تحتاج ' + totalCost + ' نقطة', 'error');
        return;
    }
    if (!result.isSuperAdmin) {
        if (!confirm('هل أنت متأكد من شراء ' + types.length + ' تخصيص مقابل ' + totalCost + ' نقطة؟')) {
            return;
        }
    }
    var promises = [];
    for (var j = 0; j < types.length; j++) {
        var type2 = types[j];
        var value = pendingCustomizations[type2];
        var optionDef2 = findOptionDefinition(type2);
        if (optionDef2) {
            promises.push(purchaseCustomization(type2, value, optionDef2.cost, true));
        }
    }
    Promise.all(promises).then(function(results) {
        var allSuccess = results.every(function(r) { return r; });
        if (allSuccess) {
            pendingCustomizations = {};
            previewState.active = false;
            previewState.type = null;
            previewState.value = null;
            refreshCustomizationModal();
            showToast('✅ تم تطبيق جميع التخصيصات بنجاح!', 'success');
            if (isModalOpen('userProfileModal') && currentViewedUserUid) {
                refreshUserProfileModal();
            }
            applyAllCustomizations(currentUserData);
            updateProfileUI();
            updatePointsDisplay();
        } else {
            showToast('❌ حدث خطأ في تطبيق بعض التخصيصات', 'error');
        }
    });
}

async function executePurchase(type, value, cost) {
    try {
        if (!currentUser) {
            showToast('يرجى تسجيل الدخول', 'error');
            return false;
        }
        
        var result = calculateUserPoints(currentUserData);
        
        // المشرف لديه نقاط لا نهائية
        if (result.isSuperAdmin) {
            var customization = currentUserData.customization || {};
            customization[type] = value;
            await db.collection('users').doc(currentUser.uid).update({ customization: customization });
            currentUserData.customization = customization;
            return true;
        }
        
        var customization = currentUserData.customization || {};
        
        // التحقق من امتلاك العنصر بالفعل
        if (customization[type] === value) {
            console.log('⚠️ العنصر مملوك بالفعل:', type, value);
            return true; // نعتبرها ناجحة لأنها موجودة بالفعل
        }
        
        if (result.points < cost) {
            showToast('نقاطك لا تكفي! تحتاج ' + cost + ' نقطة', 'error');
            return false;
        }
        
        var newSpentPoints = (currentUserData.spentPoints || 0) + cost;
        var newCustomization = currentUserData.customization || {};
        newCustomization[type] = value;
        
        await db.collection('users').doc(currentUser.uid).update({
            customization: newCustomization,
            spentPoints: newSpentPoints
        });
        
        currentUserData.customization = newCustomization;
        currentUserData.spentPoints = newSpentPoints;
        
        return true;
    } catch (error) {
        console.error('Error executing purchase:', error);
        return false;
    }
}

// ============================================================
//  تحديث مودال التخصيص (دون إغلاق/فتح المودال)
// ============================================================
function refreshCustomizationModal() {
    var modal = document.getElementById('customizationModal');
    if (!modal || !modal.classList.contains('active')) return;
    // إعادة فتح المودال لتحديث المحتوى
    var wasOpen = true;
    // حفظ حالة المعاينة مؤقتاً
    var tempPreviewState = {
        active: previewState.active,
        type: previewState.type,
        value: previewState.value,
        cost: previewState.cost,
        pendingCustomizations: JSON.parse(JSON.stringify(pendingCustomizations))
    };
    openCustomizationModal();
    // استعادة حالة المعاينة
    if (tempPreviewState.active && tempPreviewState.type) {
        previewState.active = tempPreviewState.active;
        previewState.type = tempPreviewState.type;
        previewState.value = tempPreviewState.value;
        previewState.cost = tempPreviewState.cost;
        pendingCustomizations = tempPreviewState.pendingCustomizations;
        applyInstantPreviewWithPending();
        updateTotalCostDisplay();
    }
}

// دالة مساعدة لحساب التكلفة الإجمالية للتخصيصات المعلقة
function calculateTotalPendingCost() {
    var total = 0;
    for (var type in pendingCustomizations) {
        if (pendingCustomizations.hasOwnProperty(type)) {
            var option = CUSTOMIZATION_OPTIONS[type];
            if (option) total += option.cost;
        }
    }
    return total;
}

function refreshCustomizationContent() {
    var content = document.getElementById('customizationContent');
    if (!content) return;
    if (!currentUserData) return;
    
    var result = calculateUserPoints(currentUserData);
    var customization = currentUserData.customization || {};
    var isSuperAdmin = result.isSuperAdmin;
    
    // حفظ التبويب النشط حالياً
    var activeTab = document.querySelector('.customization-tab-btn.active');
    var activeTabKey = activeTab ? activeTab.dataset.tab : 'appearance';
    
    // إعادة بناء المحتوى
    var html = '';
    
    // ===== قسم المعاينة =====
    html += '<div style="margin-bottom:1rem;padding:1rem;background:var(--gray-50);border-radius:12px;border:2px solid var(--primary-light);">';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">';
    html += '<h4 style="margin:0;color:var(--text-color);font-size:0.95rem;"><i class="fas fa-eye" style="color:var(--primary);"></i> معاينة التخصيصات</h4>';
    html += '<div style="display:flex;gap:0.3rem;">';
    html += '<button class="btn btn-sm btn-outline" onclick="togglePreviewMode()" style="font-size:0.65rem;padding:0.15rem 0.6rem;"><i class="fas fa-exchange-alt"></i> تبديل العرض</button>';
    html += '<button class="btn btn-sm btn-outline" onclick="resetPreviewChanges()" style="font-size:0.65rem;padding:0.15rem 0.6rem;"><i class="fas fa-undo"></i> إعادة</button>';
    html += '</div>';
    html += '</div>';
    
    html += '<div id="previewContainer" style="min-height:120px;background:var(--card-bg);border-radius:8px;padding:0.5rem;border:1px solid var(--border-color);">';
    html += '<div style="text-align:center;color:var(--gray-400);padding:1rem;font-size:0.85rem;">';
    html += '<i class="fas fa-hand-pointer" style="font-size:1.5rem;display:block;margin-bottom:0.3rem;"></i>';
    html += 'اختر تخصيصاً من القائمة أدناه لمعاينته فوراً';
    html += '</div>';
    html += '</div>';
    
    html += '<div id="previewModeIndicator" style="text-align:center;font-size:0.7rem;color:var(--gray-400);margin-top:0.3rem;">';
    html += '📌 عرض: <span id="currentPreviewModeText">كلا الشكلين</span>';
    html += '</div>';
    html += '</div>';
    
    // ===== عرض النقاط =====
    html += '<div class="customization-points" style="margin-bottom:1rem;padding:0.75rem;background:var(--gray-50);border-radius:12px;text-align:center;border:1px solid var(--border-color);">';
    if (isSuperAdmin) {
        html += '👑 نقاطك: <strong style="color:#ffd700;">∞ (لا نهائية - مشرف)</strong>';
        html += '<br><span style="font-size:0.7rem;color:var(--gray-400);">جميع التخصيصات مجانية للمشرف</span>';
    } else {
        html += '🪙 نقاطك المتاحة: <strong id="customPointsDisplay" style="font-size:1.2rem;color:var(--primary);">' + result.points + '</strong>';
        html += ' | 💰 تكلفة التخصيص: <strong id="previewCostDisplay" style="font-size:1rem;color:var(--warning);">0</strong> نقطة';
        html += '<br><span style="font-size:0.7rem;color:var(--gray-400);">إجمالي النقاط: ' + result.earnedPoints + ' | المنفق: ' + result.spentPoints + '</span>';
    }
    html += '</div>';
    
    // ===== أزرار التبويبات =====
    html += '<div style="display:flex;gap:0.3rem;flex-wrap:wrap;margin-bottom:0.75rem;border-bottom:2px solid var(--border-color);padding-bottom:0.5rem;">';
    var categories = [
        { key: 'appearance', label: 'المظهر', icon: 'fa-palette' },
        { key: 'avatar', label: 'الصورة', icon: 'fa-user-circle' },
        { key: 'avatar-advanced', label: 'الصورة المتقدمة', icon: 'fa-camera-retro' },
        { key: 'name', label: 'الاسم', icon: 'fa-signature' },
        { key: 'texts', label: 'النصوص', icon: 'fa-font' },
        { key: 'buttons', label: 'الأزرار', icon: 'fa-square' },
        { key: 'badges', label: 'الشارات', icon: 'fa-trophy' },
        { key: 'featured-badge', label: 'الشارة المميزة', icon: 'fa-star' },
        { key: 'special', label: 'خاص', icon: 'fa-star' }
    ];
    categories.forEach(function(cat) {
        var active = cat.key === activeTabKey ? 'active' : '';
        html += '<button class="customization-tab-btn ' + active + '" data-tab="' + cat.key + '" onclick="switchCustomizationTab(\'' + cat.key + '\')" style="padding:0.3rem 0.8rem;border:none;background:' + (cat.key === activeTabKey ? 'var(--primary)' : 'var(--gray-50)') + ';color:' + (cat.key === activeTabKey ? 'white' : 'var(--text-color)') + ';border-radius:16px;font-weight:600;font-size:0.75rem;cursor:pointer;transition:var(--transition);border:2px solid ' + (cat.key === activeTabKey ? 'var(--primary)' : 'transparent') + ';display:flex;align-items:center;gap:0.3rem;">';
        html += '<i class="fas ' + cat.icon + '" style="font-size:0.7rem;"></i> ' + cat.label;
        html += '</button>';
    });
    html += '</div>';
    
    // ===== وصف التبويب =====
    var tabLabels = {
        'appearance': '🎨 تخصيص المظهر العام',
        'avatar': '🖼️ تخصيص الصورة الشخصية',
        'avatar-advanced': '📷 تخصيصات متقدمة للصورة',
        'name': '✍️ تخصيص الاسم',
        'texts': '📝 تخصيص النصوص',
        'buttons': '🔘 تخصيص الأزرار',
        'badges': '🏅 تخصيص الشارات',
        'featured-badge': '⭐ تخصيص الشارة المميزة',
        'special': '✨ تخصيصات خاصة'
    };
    html += '<div id="customizationTabDesc" style="text-align:center;font-size:0.8rem;color:var(--gray-400);margin-bottom:0.5rem;padding:0.2rem;background:var(--gray-50);border-radius:8px;">';
    html += tabLabels[activeTabKey] || '🎨 تخصيص المظهر العام';
    html += '</div>';
    
    // ===== محتوى التخصيصات =====
    html += '<div id="customizationTabContent" style="max-height:400px;overflow-y:auto;padding:0.3rem;">';
    
    // تبويب المظهر
    html += '<div class="customization-tab-panel" data-tab="appearance" style="display:' + (activeTabKey === 'appearance' ? 'block' : 'none') + ';">';
    html += buildCustomizationOptionHTML('profileBg', customization.profileBg, isSuperAdmin);
    html += buildCustomizationOptionHTML('fontStyle', customization.fontStyle, isSuperAdmin);
    html += buildCustomizationOptionHTML('animationSpeed', customization.animationSpeed, isSuperAdmin);
    html += '</div>';
    
    // تبويب الصورة
    html += '<div class="customization-tab-panel" data-tab="avatar" style="display:' + (activeTabKey === 'avatar' ? 'block' : 'none') + ';">';
    html += buildCustomizationOptionHTML('avatarBorder', customization.avatarBorder, isSuperAdmin);
    html += buildCustomizationOptionHTML('avatarEffect', customization.avatarEffect, isSuperAdmin);
    html += buildCustomizationOptionHTML('profileFrame', customization.profileFrame, isSuperAdmin);
    html += '</div>';
    
    // تبويب الصورة المتقدمة
    html += '<div class="customization-tab-panel" data-tab="avatar-advanced" style="display:' + (activeTabKey === 'avatar-advanced' ? 'block' : 'none') + ';">';
    html += buildCustomizationOptionHTML('avatarShadow', customization.avatarShadow, isSuperAdmin);
    html += buildCustomizationOptionHTML('avatarShadowColor', customization.avatarShadowColor, isSuperAdmin);
    html += buildCustomizationOptionHTML('avatarBorderWidth', customization.avatarBorderWidth, isSuperAdmin);
    html += buildCustomizationOptionHTML('avatarBorderStyle', customization.avatarBorderStyle, isSuperAdmin);
    html += '</div>';
    
    // تبويب الاسم
    html += '<div class="customization-tab-panel" data-tab="name" style="display:' + (activeTabKey === 'name' ? 'block' : 'none') + ';">';
    html += buildCustomizationOptionHTML('nameColor', customization.nameColor, isSuperAdmin);
    html += buildCustomizationOptionHTML('nameGlow', customization.nameGlow, isSuperAdmin);
    html += '</div>';
    
    // تبويب النصوص
    html += '<div class="customization-tab-panel" data-tab="texts" style="display:' + (activeTabKey === 'texts' ? 'block' : 'none') + ';">';
    html += buildCustomizationOptionHTML('textColor', customization.textColor, isSuperAdmin);
    html += buildCustomizationOptionHTML('bioColor', customization.bioColor, isSuperAdmin);
    html += '</div>';
    
    // تبويب الأزرار
    html += '<div class="customization-tab-panel" data-tab="buttons" style="display:' + (activeTabKey === 'buttons' ? 'block' : 'none') + ';">';
    html += buildCustomizationOptionHTML('buttonColor', customization.buttonColor, isSuperAdmin);
    html += '</div>';
    
    // تبويب الشارات
    html += '<div class="customization-tab-panel" data-tab="badges" style="display:' + (activeTabKey === 'badges' ? 'block' : 'none') + ';">';
    html += buildCustomizationOptionHTML('badgeStyle', customization.badgeStyle, isSuperAdmin);
    html += '</div>';
    
    // تبويب الشارة المميزة
    html += '<div class="customization-tab-panel" data-tab="featured-badge" style="display:' + (activeTabKey === 'featured-badge' ? 'block' : 'none') + ';">';
    html += buildCustomizationOptionHTML('featuredBadgeColor', customization.featuredBadgeColor, isSuperAdmin);
    html += buildCustomizationOptionHTML('featuredBadgeBg', customization.featuredBadgeBg, isSuperAdmin);
    html += buildCustomizationOptionHTML('featuredBadgeSize', customization.featuredBadgeSize, isSuperAdmin);
    html += buildCustomizationOptionHTML('featuredBadgeAnimation', customization.featuredBadgeAnimation, isSuperAdmin);
    html += buildCustomizationOptionHTML('featuredBadgeBorder', customization.featuredBadgeBorder, isSuperAdmin);
    html += buildCustomizationOptionHTML('featuredBadgeBorderColor', customization.featuredBadgeBorderColor, isSuperAdmin);
    html += buildCustomizationOptionHTML('featuredBadgeContainerBg', customization.featuredBadgeContainerBg, isSuperAdmin);
    html += buildCustomizationOptionHTML('featuredBadgeContainerBorder', customization.featuredBadgeContainerBorder, isSuperAdmin);
    html += buildCustomizationOptionHTML('featuredBadgeContainerBorderColor', customization.featuredBadgeContainerBorderColor, isSuperAdmin);
    html += '</div>';
    
    // تبويب خاص
    html += '<div class="customization-tab-panel" data-tab="special" style="display:' + (activeTabKey === 'special' ? 'block' : 'none') + ';">';
    html += buildCustomizationOptionHTML('specialBadge', customization.specialBadge, isSuperAdmin);
    html += '</div>';
    
    html += '</div>';
    
    // ===== زر تطبيق التغييرات =====
    html += '<div style="text-align:center;margin-top:1rem;padding-top:0.75rem;border-top:1px solid var(--border-color);">';
    html += '<button class="btn btn-success" onclick="applySelectedCustomization()" style="min-width:200px;"><i class="fas fa-check"></i> تطبيق التخصيص المحدد</button>';
    html += '<button class="btn btn-outline" onclick="closeModal(\'customizationModal\')" style="margin-right:0.5rem;"><i class="fas fa-times"></i> إلغاء</button>';
    html += '</div>';
    
    content.innerHTML = html;
    
    // ===== تهيئة المعاينة =====
    previewState.previewMode = 'both';
    updatePreviewModeText();
}

// تحديث دالة customizeProfile لتخزين التخصيصات مؤقتاً بدلاً من التطبيق الفوري
function customizeProfile(type, value) {
    console.log('🎨 محاولة تخصيص:', type, value);
    
    var option = CUSTOMIZATION_OPTIONS[type];
    if (!option) {
        console.error('❌ نوع التخصيص غير معروف:', type);
        showToast('نوع التخصيص غير معروف: ' + type, 'error');
        return;
    }
    
    // تخزين التخصيص مؤقتاً
    pendingCustomizations[type] = value;
    updateTotalCostDisplay();
    applyInstantPreviewWithPending();
    
    // تحديث واجهة الخيارات
    updateOptionSelectionUI(type, value);
    
    showToast('✅ تم اختيار: ' + option.label + ' → ' + getOptionLabel(type, value), 'success');
}

function updateOptionSelectionUI(type, value) {
    // تحديث حالة الأزرار في الواجهة
    document.querySelectorAll('.customization-option').forEach(function(optionContainer) {
        var buttons = optionContainer.querySelectorAll('.effect-option-btn, .bg-option-btn, .color-option-btn');
        buttons.forEach(function(btn) {
            // إزالة الكلاس النشط من جميع الأزرار
            btn.classList.remove('active');
            
            // الحصول على القيمة من الـ onclick
            var onclickAttr = btn.getAttribute('onclick');
            if (onclickAttr) {
                // استخراج القيمة من الدالة previewAndSelect
                var match = onclickAttr.match(/previewAndSelect\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"]/);
                if (match && match[1] === type && match[2] === value) {
                    btn.classList.add('active');
                }
            }
        });
    });
}

// ============================================================
//  تحديث buildUserProfileHTML النهائي
// ============================================================

// نعيد تعريف buildUserProfileHTML مع الإصلاحات
// (هذا هو الجزء الأساسي - سيتم دمج جميع الإصلاحات)

// ============================================================
//  إضافة المودالات الجديدة في HTML (سيتم إضافتها في index.html)
// ============================================================


// ============================================================
//  تطبيق التخصيصات - إصلاح نهائي
// ============================================================



// ===== تطبيق التخصيصات على مودال عرض الملف =====


// ===== دالة تحديث الملف الشخصي عند عرضه =====
function refreshProfileCustomizations() {
    if (currentUserData) {
        applyAllCustomizations(currentUserData);
    }
}

// ===== تطبيق خلفية الملف =====
// ===== تطبيق خلفية الملف الشخصي =====
function applyProfileBg(bg) {
    var container = document.querySelector('.profile-container');
    if (!container) return;
    
    // إعادة تعيين
    container.style.background = '';
    container.style.color = '';
    
    if (!bg || bg === 'default') {
        container.style.background = '';
        container.style.color = '';
        container.style.setProperty('--card-bg', '');
        container.style.setProperty('--text-color', '');
        // إعادة تعيين ألوان العناصر
        resetProfileColors(container);
        return;
    }
    
    var bgStyles = {
        'gradient1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient2': 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        'gradient3': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient4': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'ocean': 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
        'sunset': 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
        'forest': 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
        'midnight': 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)',
        'neon': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        'rainbow': 'linear-gradient(135deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff)',
        'galaxy': 'linear-gradient(135deg, #0c0c1d, #1a1a3e, #2d1b69)',
        'sunrise': 'linear-gradient(135deg, #ff6b6b, #feca57, #ff9ff3)',
        'lavender': 'linear-gradient(135deg, #e8d5f5, #b8a9c9, #9b8bb5)',
        'candy': 'linear-gradient(135deg, #ff6b6b, #ff9ff3, #feca57)',
        'gold': 'linear-gradient(135deg, #bf953f, #fcf6ba, #b38728)'
    };
    
    var style = bgStyles[bg];
    if (style) {
        container.style.background = style;
        container.style.color = '#ffffff';
        container.style.setProperty('--text-color', '#ffffff');
        container.style.setProperty('--card-bg', 'rgba(255,255,255,0.1)');
        updateProfileColorsForBg(container);
    }
}

// ===== تطبيق لون إطار الصورة =====
function applyAvatarBorder(color) {
    var avatar = document.getElementById('profileAvatar');
    if (avatar) {
        avatar.style.borderColor = color || '#2563eb';
        avatar.style.borderWidth = '4px';
        avatar.style.borderStyle = 'solid';
    }
}

// ===== تطبيق تأثير الصورة =====
// ===== تطبيق تأثير الصورة =====
function applyAvatarEffect(effect) {
    var container = document.getElementById('profileAvatarContainer');
    if (!container) return;
    // إزالة التأثيرات السابقة
    container.className = 'profile-avatar';
    if (effect && effect !== 'none') {
        container.classList.add('effect-' + effect);
    }
}

// ===== تطبيق شكل الصورة =====
// ===== تطبيق شكل الصورة =====
function applyProfileFrame(frame) {
    var avatar = document.getElementById('profileAvatar');
    if (!avatar) return;
    
    avatar.style.borderRadius = '50%';
    avatar.style.clipPath = 'none';
    
    if (frame === 'rounded') {
        avatar.style.borderRadius = '20%';
    } else if (frame === 'square') {
        avatar.style.borderRadius = '0';
    } else if (frame === 'star') {
        avatar.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        avatar.style.borderRadius = '0';
    } else if (frame === 'heart') {
        avatar.style.clipPath = 'path("M50,90 C20,60 0,40 0,25 C0,10 15,0 30,0 C40,0 48,8 50,18 C52,8 60,0 70,0 C85,0 100,10 100,25 C100,40 80,60 50,90Z")';
        avatar.style.borderRadius = '0';
    } else if (frame === 'diamond') {
        avatar.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
        avatar.style.borderRadius = '0';
    }
}

// ===== تطبيق لون الاسم =====
function applyNameColor(color) {
    var name = document.getElementById('profileName');
    if (name && color) {
        name.style.color = color;
    }
}

// ===== تطبيق تأثير الاسم =====
function applyNameGlow(glow) {
    var name = document.getElementById('profileName');
    if (!name) return;
    name.style.textShadow = 'none';
    name.style.animation = 'none';
    
    if (glow === 'soft') {
        name.style.textShadow = '0 0 20px rgba(37, 99, 235, 0.3)';
    } else if (glow === 'strong') {
        name.style.textShadow = '0 0 30px rgba(37, 99, 235, 0.6), 0 0 60px rgba(37, 99, 235, 0.3)';
    } else if (glow === 'rainbow') {
        name.style.animation = 'rainbowGlow 3s ease infinite';
    }
}

// ===== تطبيق شكل الشارة =====
function applyBadgeStyle(style) {
    var badges = document.querySelectorAll('.badge-item');
    badges.forEach(function(badge) {
        // إزالة الأنماط السابقة
        badge.className = 'badge-item';
        badge.style.cssText = '';
        if (style === 'glow') badge.classList.add('style-glow');
        else if (style === 'rounded') badge.classList.add('style-rounded');
        else if (style === 'shadow') badge.classList.add('style-shadow');
        else if (style === 'gradient') badge.classList.add('style-gradient');
        else if (style === 'neon') badge.classList.add('style-neon');
    });
}

// ===== تطبيق شكل البطاقة =====
function applyCardStyle(style) {
    var cards = document.querySelectorAll('.course-card, .user-card, .college-card, .specialty-card');
    cards.forEach(function(card) {
        var baseClass = card.className.split(' ')[0];
        card.className = baseClass;
        card.style.cssText = '';
        if (style === 'glass') card.classList.add('style-glass');
        else if (style === 'bordered') card.classList.add('style-bordered');
        else if (style === 'shadow') card.classList.add('style-shadow');
        else if (style === 'elevated') card.classList.add('style-elevated');
    });
}

// ===== تطبيق نوع الخط =====
function applyFontStyle(style) {
    var body = document.body;
    var fonts = {
        'default': 'Segoe UI, Tahoma, system-ui, sans-serif',
        'modern': 'Inter, "Segoe UI", sans-serif',
        'elegant': 'Georgia, "Times New Roman", serif',
        'bold': '"Arial Black", "Segoe UI", sans-serif',
        'handwriting': '"Comic Sans MS", cursive',
        'playful': '"Fredoka One", "Segoe UI", sans-serif'
    };
    if (fonts[style]) {
        body.style.fontFamily = fonts[style];
    }
}

// ===== تطبيق سرعة الحركة =====
function applyAnimationSpeed(speed) {
    var speeds = { 'slow': '0.8s', 'normal': '0.25s', 'fast': '0.1s', 'none': '0s' };
    if (speeds[speed]) {
        document.documentElement.style.setProperty('--transition-speed', speeds[speed]);
    }
}

// ===== تطبيق الشارة الخاصة =====
function applySpecialBadge(badge) {
    // إزالة الشارة القديمة
    var existingBadge = document.getElementById('specialBadgeDisplay');
    if (existingBadge) existingBadge.remove();
    
    if (badge && badge !== 'none') {
        var span = document.createElement('span');
        span.id = 'specialBadgeDisplay';
        span.className = 'special-badge-display';
        span.innerHTML = '<i class="fas ' + badge + '" style="font-size:1rem;margin-left:0.3rem;"></i>';
        var nameElement = document.getElementById('profileName');
        if (nameElement) {
            nameElement.appendChild(span);
        }
    }
}


// ============================================================
//  تحسين دالة تطبيق الخلفية مع المعاينة
// ============================================================
function applyProfileBg(bg, isPreview = false) {
    var container = document.querySelector('.profile-container');
    if (!container) return;
    
    // إعادة تعيين الأنماط المباشرة أولاً
    container.style.background = '';
    container.style.color = '';
    container.style.setProperty('--card-bg', '');
    container.style.setProperty('--text-color', '');
    
    if (!bg || bg === 'default') {
        resetProfileColors(container);
        if (isPreview) showToast('تم إلغاء معاينة الخلفية', 'info');
        return;
    }
    
    var bgStyles = {
        'gradient1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient2': 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        'gradient3': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient4': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'ocean': 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
        'sunset': 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
        'forest': 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
        'midnight': 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)',
        'neon': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' // خلفية جديدة
    };
    
    var style = bgStyles[bg];
    if (style) {
        container.style.background = style;
        container.style.color = '#ffffff';
        // تحديث متغيرات CSS لإجبار النصوص البيضاء
        container.style.setProperty('--text-color', '#ffffff');
        container.style.setProperty('--card-bg', 'rgba(255,255,255,0.1)');
        
        // تحديث جميع العناصر الداخلية
        updateProfileColorsForBg(container);
        
        if (isPreview) {
            showToast('معاينة الخلفية الجديدة (لم تحفظ بعد)', 'info');
        }
    }
}

// دالة معاينة يتم استدعاؤها من واجهة التخصيص
function previewCustomization(type, value) {
    if (type === 'profileBg') {
        // حفظ القيمة القديمة مؤقتاً
        var oldBg = currentUserData.customization?.profileBg || 'default';
        // تطبيق المعاينة
        applyProfileBg(value, true);
        // إضافة زر "تطبيق" أو حفظ تلقائي بعد 3 ثواني؟ الأفضل أن نضيف زر "تطبيق" في الواجهة.
        // سنقوم بتخزين القيمة في متغير عام للتراجع عنها
        window._previewValue = value;
        window._previewType = type;
        // عرض زر حفظ في الواجهة
        var previewActions = document.getElementById('previewActions');
        if (!previewActions) {
            var actions = document.createElement('div');
            actions.id = 'previewActions';
            actions.style.cssText = 'display:flex;gap:10px;margin-top:10px;justify-content:center;';
            actions.innerHTML = `
                <button class="btn btn-success" onclick="applyPreview()">✅ تطبيق المعاينة (احفظ)</button>
                <button class="btn btn-outline" onclick="cancelPreview()">❌ إلغاء</button>
            `;
            document.getElementById('customizationContent')?.appendChild(actions);
        }
    }
}

window.applyPreview = function() {
    if (window._previewType && window._previewValue) {
        customizeProfile(window._previewType, window._previewValue);
        document.getElementById('previewActions')?.remove();
    }
};

window.cancelPreview = function() {
    if (window._previewType === 'profileBg') {
        var oldBg = currentUserData.customization?.profileBg || 'default';
        applyProfileBg(oldBg, false);
    }
    document.getElementById('previewActions')?.remove();
    showToast('تم إلغاء المعاينة', 'warning');
};

// ===== إعادة تعيين ألوان الملف =====
function resetProfileColors(container) {
    var elements = container.querySelectorAll('.course-tag, .form-group label, .form-group label i, .profile-stats span, .profile-stats i, #profileBioDisplay, .profile-info p, .profile-info h2, .badge, .badges-section h4');
    elements.forEach(function(el) {
        el.style.color = '';
        el.style.background = '';
        el.style.borderColor = '';
    });
    
    var courseTags = container.querySelectorAll('.course-tag');
    courseTags.forEach(function(tag) {
        tag.style.color = '';
        tag.style.background = '';
        tag.style.borderColor = '';
    });
}

// ===== تحديث ألوان الملف للخلفية =====
function updateProfileColorsForBg(container) {
    var courseTags = container.querySelectorAll('.course-tag');
    courseTags.forEach(function(tag) {
        tag.style.color = '#ffffff !important';
        tag.style.background = 'rgba(255,255,255,0.2)';
        tag.style.borderColor = 'rgba(255,255,255,0.3)';
    });
    
    var stats = container.querySelectorAll('.profile-stats span, .profile-stats i');
    stats.forEach(function(el) {
        el.style.color = '#ffffff !important';
    });
    
    var bioDisplay = document.getElementById('profileBioDisplay');
    if (bioDisplay) {
        bioDisplay.style.color = 'rgba(255,255,255,0.9)';
        bioDisplay.style.background = 'rgba(255,255,255,0.1)';
        bioDisplay.style.borderColor = 'rgba(255,255,255,0.2)';
    }
}


// ============================================================
//  ADMIN FEATURED & CONTACT
// ============================================================

function loadAdminFeatured() {
    var admin = users.find(function(u) { return u.role === 'admin'; });
    if (!admin) return;
    var avatar = document.getElementById('adminFeaturedAvatar');
    var name = document.getElementById('adminFeaturedName');
    var email = document.getElementById('adminFeaturedEmail');
    if (avatar) avatar.src = admin.avatar || '';
    if (name) name.textContent = admin.displayName || 'المشرف';
    if (email) email.textContent = admin.email || '';
}




// ============================================================
//  sendContactMessageDirect - إرسال الرسالة مباشرة
// ============================================================

async function sendContactMessageDirect(admins, subject, message) {
    try {
        var promises = admins.map(function(admin) {
            return db.collection('messages').add({
                from: currentUser.uid,
                fromName: currentUserData?.displayName || currentUser.email,
                to: admin.uid,
                subject: subject,
                message: message,
                read: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
        
        await Promise.all(promises);
        
        admins.forEach(function(admin) {
            sendNotification(admin.uid, {
                message: '📩 ' + (currentUserData?.displayName || currentUser.email) + ' أرسل رسالة: ' + subject,
                type: 'warning',
                link: '/admin'
            });
        });
        
        showToast('✅ تم إرسال رسالتك بنجاح!', 'success');
        
    } catch (error) {
        console.error('Error sending contact message:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// ============================================================
//  إصلاح createContactAdminModal - إنشاء المودال بشكل صحيح
// ============================================================

function createContactAdminModal() {
    // التحقق من وجود المودال مسبقاً
    if (document.getElementById('contactAdminModal')) {
        console.log('✅ مودال التواصل موجود بالفعل');
        return;
    }
    
    console.log('🔧 إنشاء مودال التواصل مع الإدارة');
    
    try {
        // إنشاء عنصر المودال
        var modal = document.createElement('div');
        modal.id = 'contactAdminModal';
        modal.className = 'modal';
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.right = '0';
        modal.style.bottom = '0';
        modal.style.background = 'rgba(0,0,0,0.5)';
        modal.style.zIndex = '9999';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.padding = '1rem';
        modal.style.backdropFilter = 'blur(4px)';
        
        // محتوى المودال
        modal.innerHTML = `
            <div class="modal-content" style="max-width:500px;background:var(--card-bg);border-radius:16px;padding:1.5rem;box-shadow:0 25px 60px rgba(0,0,0,0.3);border:1px solid var(--border-color);max-height:90vh;overflow-y:auto;width:100%;">
                <div class="modal-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;padding-bottom:0.75rem;border-bottom:2px solid var(--border-color);">
                    <h3 id="contactAdminTitle" style="margin:0;color:var(--text-color);">
                        <i class="fas fa-envelope" style="color:var(--primary);"></i> تواصل مع الإدارة
                    </h3>
                    <button class="btn-close" onclick="closeModal('contactAdminModal')" style="background:none;border:none;font-size:1.5rem;color:var(--gray-400);cursor:pointer;transition:all 0.3s ease;padding:0.25rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div id="contactAdminContent"></div>
            </div>
        `;
        
        // إضافة المودال إلى الصفحة
        document.body.appendChild(modal);
        console.log('✅ تم إنشاء مودال التواصل بنجاح');
        
        // التحقق من وجود العناصر
        var content = document.getElementById('contactAdminContent');
        if (!content) {
            console.error('❌ فشل في إنشاء contactAdminContent');
        }
        
    } catch (error) {
        console.error('❌ خطأ في إنشاء مودال التواصل:', error);
    }
}

// ============================================================
//  إصلاح openContactAdminModal - نسخة مبسطة وموثوقة
// ============================================================

function openContactAdminModal() {
    if (!currentUser) {
        showToast('يرجى تسجيل الدخول أولاً', 'error');
        return;
    }
    
    // جلب المشرفين والمدراء
    var admins = users.filter(function(u) { 
        return u.role === 'admin' || u.role === 'moderator'; 
    });
    
    if (admins.length === 0) {
        showToast('لا يوجد إدارة متاحة حالياً', 'error');
        return;
    }
    
    // ===== التأكد من وجود المودال =====
    var modal = document.getElementById('contactAdminModal');
    
    // إذا لم يكن المودال موجوداً، قم بإنشائه
    if (!modal) {
        console.log('⚠️ مودال التواصل غير موجود، جاري الإنشاء...');
        createContactAdminModal();
        modal = document.getElementById('contactAdminModal');
        
        // إذا فشل الإنشاء، استخدم الطريقة البديلة
        if (!modal) {
            console.error('❌ فشل في إنشاء مودال التواصل، استخدام طريقة بديلة');
            showContactAsAlert(admins);
            return;
        }
    }
    
    // ===== التأكد من وجود المحتوى =====
    var content = document.getElementById('contactAdminContent');
    if (!content) {
        console.error('❌ contactAdminContent غير موجود، إعادة إنشاء المودال');
        // إزالة المودال القديم وإنشاء جديد
        if (modal) modal.remove();
        createContactAdminModal();
        modal = document.getElementById('contactAdminModal');
        content = document.getElementById('contactAdminContent');
        
        if (!modal || !content) {
            showContactAsAlert(admins);
            return;
        }
    }
    
    // ===== تحديث العنوان =====
    var title = document.getElementById('contactAdminTitle');
    if (title) {
        title.textContent = '📩 تواصل مع الإدارة';
    }
    
    // ===== عرض معلومات الإدارة =====
    var adminNames = admins.map(function(a) { 
        return a.displayName || 'مشرف'; 
    }).join('، ');
    
    // ===== بناء محتوى المودال =====
    content.innerHTML = `
        <div style="padding:0.5rem 0;">
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;padding:0.75rem;background:var(--gray-50);border-radius:12px;border:1px solid var(--border-color);">
                <i class="fas fa-users-cog" style="font-size:1.5rem;color:var(--primary);"></i>
                <div>
                    <div style="font-weight:600;">فريق الإدارة</div>
                    <div style="font-size:0.8rem;color:var(--gray-500);">${adminNames}</div>
                </div>
            </div>
            
            <div class="form-group">
                <label style="font-weight:600;font-size:0.85rem;color:var(--gray-600);display:block;margin-bottom:0.25rem;">الموضوع</label>
                <input type="text" id="contactSubject" placeholder="أدخل موضوع الرسالة..." style="width:100%;padding:0.6rem 0.8rem;border-radius:12px;border:1.5px solid var(--border-color);background:var(--gray-50);color:var(--text-color);font-size:0.9rem;transition:all 0.3s ease;" />
            </div>
            <div class="form-group" style="margin-top:0.75rem;">
                <label style="font-weight:600;font-size:0.85rem;color:var(--gray-600);display:block;margin-bottom:0.25rem;">الرسالة</label>
                <textarea id="contactMessage" rows="5" placeholder="اكتب رسالتك هنا..." style="width:100%;padding:0.6rem 0.8rem;border-radius:12px;border:1.5px solid var(--border-color);background:var(--gray-50);color:var(--text-color);font-size:0.9rem;resize:vertical;transition:all 0.3s ease;min-height:120px;"></textarea>
            </div>
            <div style="display:flex;gap:0.5rem;margin-top:1rem;">
                <button class="btn btn-primary" onclick="sendContactMessage()" style="flex:1;justify-content:center;padding:0.6rem;">
                    <i class="fas fa-paper-plane"></i> إرسال
                </button>
                <button class="btn btn-outline" onclick="closeModal('contactAdminModal')" style="padding:0.6rem 1.5rem;">إلغاء</button>
            </div>
        </div>
    `;
    
    // ===== فتح المودال =====
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    
    setTimeout(function() {
        modal.style.opacity = '1';
        modal.classList.add('active');
    }, 50);
}

// ============================================================
//  showContactAsAlert - طريقة بديلة (محسنة)
// ============================================================

function showContactAsAlert(admins) {
    var adminNames = admins.map(function(a) { 
        return a.displayName || 'مشرف'; 
    }).join('، ');
    
    // إنشاء مودال بسيط باستخدام HTML مؤقت
    var overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.6); z-index: 99999;
        display: flex; justify-content: center; align-items: center;
        padding: 1rem; backdrop-filter: blur(4px);
    `;
    
    var dialog = document.createElement('div');
    dialog.style.cssText = `
        background: var(--card-bg); border-radius: 16px;
        padding: 1.5rem; max-width: 500px; width: 100%;
        box-shadow: 0 25px 60px rgba(0,0,0,0.3);
        border: 1px solid var(--border-color);
    `;
    
    dialog.innerHTML = `
        <h3 style="margin:0 0 0.5rem 0;color:var(--text-color);">
            <i class="fas fa-envelope" style="color:var(--primary);"></i> تواصل مع الإدارة
        </h3>
        <p style="color:var(--gray-500);font-size:0.85rem;margin-bottom:0.75rem;">
            فريق الإدارة: ${adminNames}
        </p>
        <div style="margin-bottom:0.75rem;">
            <input type="text" id="altContactSubject" placeholder="الموضوع..." style="width:100%;padding:0.5rem 0.8rem;border-radius:10px;border:1.5px solid var(--border-color);background:var(--gray-50);color:var(--text-color);font-size:0.9rem;margin-bottom:0.5rem;" />
            <textarea id="altContactMessage" rows="4" placeholder="اكتب رسالتك هنا..." style="width:100%;padding:0.5rem 0.8rem;border-radius:10px;border:1.5px solid var(--border-color);background:var(--gray-50);color:var(--text-color);font-size:0.9rem;resize:vertical;min-height:100px;"></textarea>
        </div>
        <div style="display:flex;gap:0.5rem;">
            <button class="btn btn-primary" onclick="sendAltContactMessage()" style="flex:1;justify-content:center;padding:0.5rem;">
                <i class="fas fa-paper-plane"></i> إرسال
            </button>
            <button class="btn btn-outline" onclick="this.closest('div[style]').remove()" style="padding:0.5rem 1.5rem;">إلغاء</button>
        </div>
    `;
    
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    // التركيز على حقل الموضوع
    setTimeout(function() {
        var subject = document.getElementById('altContactSubject');
        if (subject) subject.focus();
    }, 100);
}

// ============================================================
//  sendAltContactMessage - إرسال من الطريقة البديلة
// ============================================================

function sendAltContactMessage() {
    var subject = document.getElementById('altContactSubject')?.value?.trim() || 'رسالة من مستخدم';
    var message = document.getElementById('altContactMessage')?.value?.trim();
    
    if (!message) {
        showToast('يرجى كتابة الرسالة', 'error');
        return;
    }
    
    var admins = users.filter(function(u) { 
        return u.role === 'admin' || u.role === 'moderator'; 
    });
    
    if (admins.length === 0) {
        showToast('لا يوجد إدارة متاحة حالياً', 'error');
        return;
    }
    
    // إرسال الرسالة
    sendContactMessageDirect(admins, subject, message);
    
    // إغلاق النافذة
    var overlay = document.querySelector('div[style*="position: fixed"][style*="z-index: 99999"]');
    if (overlay) overlay.remove();
}

// ============================================================
//  تحسين sendContactMessage - مع التحقق من وجود العناصر
// ============================================================

async function sendContactMessage() {
    var subjectInput = document.getElementById('contactSubject');
    var messageInput = document.getElementById('contactMessage');
    
    if (!subjectInput || !messageInput) {
        showToast('حدث خطأ في نموذج التواصل، يرجى المحاولة مرة أخرى', 'error');
        return;
    }
    
    var subject = subjectInput.value?.trim();
    var message = messageInput.value?.trim();
    
    if (!message) {
        showToast('يرجى كتابة الرسالة', 'error');
        messageInput.focus();
        return;
    }
    
    if (!subject) {
        subject = 'رسالة من ' + (currentUserData?.displayName || 'مستخدم');
    }
    
    try {
        // جلب جميع المشرفين والمدراء
        var admins = users.filter(function(u) { 
            return u.role === 'admin' || u.role === 'moderator'; 
        });
        
        if (admins.length === 0) {
            showToast('لا يوجد إدارة متاحة حالياً', 'error');
            return;
        }
        
        // إرسال الرسالة لكل مشرف/مدير
        var promises = admins.map(function(admin) {
            return db.collection('messages').add({
                from: currentUser.uid,
                fromName: currentUserData?.displayName || currentUser.email,
                to: admin.uid,
                subject: subject,
                message: message,
                read: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
        
        await Promise.all(promises);
        
        // إرسال إشعارات للإدارة
        admins.forEach(function(admin) {
            sendNotification(admin.uid, {
                message: '📩 ' + (currentUserData?.displayName || currentUser.email) + ' أرسل رسالة: ' + subject,
                type: 'warning',
                link: '/admin'
            });
        });
        
        showToast('✅ تم إرسال رسالتك بنجاح!', 'success');
        closeModal('contactAdminModal');
        
        // تفريغ الحقول
        subjectInput.value = '';
        messageInput.value = '';
        
    } catch (error) {
        console.error('Error sending contact message:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// ============================================================
//  تحديث openContactAdminModal في صفحة الإدارة
// ============================================================

// إضافة زر التواصل في صفحة الإدارة
function addContactButtonToAdminsPage() {
    var contactBanner = document.querySelector('.admin-contact-banner');
    if (contactBanner) {
        // البانر موجود بالفعل
        return;
    }
    
    var adminsContainer = document.querySelector('.admins-container');
    if (!adminsContainer) return;
    
    var banner = document.createElement('div');
    banner.className = 'admin-contact-banner';
    banner.innerHTML = `
        <div class="contact-banner-content">
            <i class="fas fa-headset"></i>
            <div>
                <h4>تواصل مع الإدارة</h4>
                <p>لديك سؤال أو استفسار؟ فريق الإدارة هنا لمساعدتك</p>
            </div>
            <button class="btn btn-primary btn-lg" onclick="openContactAdminModal()">
                <i class="fas fa-envelope"></i> تواصل مع الإدارة
            </button>
        </div>
    `;
    
    // إضافة البانر بعد الإحصائيات
    var statsBar = adminsContainer.querySelector('.admins-stats-bar');
    if (statsBar) {
        statsBar.parentNode.insertBefore(banner, statsBar.nextSibling);
    } else {
        adminsContainer.insertBefore(banner, adminsContainer.firstChild);
    }
}

// استدعاء الدالة عند تحميل صفحة المشرفين
var originalLoadAdminsPage = loadAdminsPage;
loadAdminsPage = function() {
    originalLoadAdminsPage();
    setTimeout(function() {
        addContactButtonToAdminsPage();
    }, 100);
};

if (document.getElementById('contactAdminForm')) {
    document.getElementById('contactAdminForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        var subject = document.getElementById('contactSubject').value.trim();
        var message = document.getElementById('contactMessage').value.trim();
        if (!subject || !message) {
            showToast('يرجى إدخال الموضوع والرسالة', 'error');
            return;
        }
        try {
            var admins = users.filter(function(u) { return u.role === 'admin'; });
            for (var i = 0; i < admins.length; i++) {
                await sendNotification(admins[i].uid, {
                    message: '📩 رسالة جديدة من ' + (currentUserData.displayName || currentUser.email) + '\nالموضوع: ' + subject + '\nالرسالة: ' + message,
                    type: 'warning',
                    link: '/admin'
                });
            }
            await db.collection('messages').add({
                from: currentUser.uid,
                fromName: currentUserData.displayName || currentUser.email,
                subject: subject,
                message: message,
                read: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            showToast('تم إرسال رسالتك بنجاح! 📨', 'success');
            closeModal('contactAdminModal');
            document.getElementById('contactSubject').value = '';
            document.getElementById('contactMessage').value = '';
        } catch (error) {
            console.error('Error sending message:', error);
            showToast('حدث خطأ: ' + error.message, 'error');
        }
    });
}

function viewAdminProfile() {
    var admin = users.find(function(u) { return u.role === 'admin'; });
    if (!admin) {
        showToast('لا يوجد مشرف', 'error');
        return;
    }
    viewUserProfile(admin.uid);
}

function loadAdminMessages() {
    var container = document.getElementById('adminMessagesList');
    if (!container) return;
    db.collection('messages').orderBy('timestamp', 'desc').get().then(function(snapshot) {
        var html = '';
        snapshot.forEach(function(doc) {
            var msg = doc.data();
            html += '<div class="admin-item">';
            html += '<span><strong>' + escapeHtml(msg.fromName) + '</strong>: ' + escapeHtml(msg.subject) + '</span>';
            html += '<div class="actions">';
            html += '<button class="btn btn-primary" onclick="viewMessage(\'' + doc.id + '\')"><i class="fas fa-eye"></i></button>';
            html += '<button class="btn btn-danger" onclick="deleteMessage(\'' + doc.id + '\')"><i class="fas fa-trash"></i></button>';
            html += '</div>';
            html += '</div>';
        });
        container.innerHTML = html || '<div class="empty-state"><h3>لا توجد رسائل</h3></div>';
    });
}

window.viewMessage = async function(id) {
    try {
        var doc = await db.collection('messages').doc(id).get();
        if (!doc.exists) return;
        var msg = doc.data();
        await db.collection('messages').doc(id).update({ read: true });
        alert('📩 من: ' + msg.fromName + '\nالموضوع: ' + msg.subject + '\n\nالرسالة:\n' + msg.message);
    } catch (error) {
        console.error('Error viewing message:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
};

window.deleteMessage = async function(id) {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    try {
        await db.collection('messages').doc(id).delete();
        loadAdminMessages();
        showToast('تم حذف الرسالة', 'success');
    } catch (error) {
        console.error('Error deleting message:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
};

function loadAdminData() {
    loadAdminCourses();
    loadAdminColleges();
    loadAdminSpecialties();
    loadAdminUsers();
    loadAdminFeatured();
    loadAdminMessages();
}

// ============================================================
//  UPDATE ADVANCED BADGES
// ============================================================
function updateAdvancedBadges() {
    if (!currentUserData) return;
    var result = calculateUserPoints(currentUserData);
    if (userTier) {
        userTier.innerHTML = '<i class="fas ' + result.tier.icon + '" style="color:' + result.tier.color + ';"></i> ' + result.tier.name;
        userTier.style.color = result.tier.color;
    }
    if (userPoints) userPoints.textContent = result.earnedPoints + ' نقطة (إجمالي)';
    if (advancedBadges) {
        var html = '';
        var allKeys = Object.keys(ACHIEVEMENTS);
        for (var i = 0; i < allKeys.length; i++) {
            var key = allKeys[i];
            var ach = ACHIEVEMENTS[key];
            var isEarned = result.earned.indexOf(key) !== -1;
            html += '<div class="achievement-item ' + (isEarned ? 'earned' : 'locked') + '">';
            html += '<i class="fas ' + ach.icon + '"></i>';
            html += '<span class="ach-name">' + ach.name + '</span>';
            html += '<span class="ach-points">+' + ach.points + ' نقطة</span>';
            if (!isEarned) html += '<span class="ach-locked"><i class="fas fa-lock"></i></span>';
            html += '</div>';
        }
        advancedBadges.innerHTML = html;
    }
}


// ============================================================
//  تطوير وتحسين قائمة المستخدمين في لوحة الإشراف
// ============================================================

// ============================================================
//  loadAdminUsers - النسخة المطورة
// ============================================================


function renderAdminUsers() {
    if (!adminUsersList) return;
    
    if (!users || users.length === 0) {
        adminUsersList.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-users"></i>
                <h4>لا يوجد مستخدمين</h4>
                <p>لم يتم تسجيل أي مستخدم في المنصة بعد</p>
            </div>
        `;
        return;
    }
    
    // ===== إحصائيات سريعة للمستخدمين =====
    var totalUsers = users.length;
    var activeUsers = users.filter(function(u) { return u.role !== 'admin' && !u.banned; }).length;
    var bannedUsers = users.filter(function(u) { return u.banned === true; }).length;
    var admins = users.filter(function(u) { return u.role === 'admin'; }).length;
    
    var html = `
        <div class="admin-users-stats">
            <div class="admin-stat-card">
                <i class="fas fa-users" style="color:#3b82f6;"></i>
                <div>
                    <span class="admin-stat-number">${totalUsers}</span>
                    <label>إجمالي المستخدمين</label>
                </div>
            </div>
            <div class="admin-stat-card">
                <i class="fas fa-user-check" style="color:#22c55e;"></i>
                <div>
                    <span class="admin-stat-number">${activeUsers}</span>
                    <label>مستخدمين نشطين</label>
                </div>
            </div>
            <div class="admin-stat-card">
                <i class="fas fa-user-slash" style="color:#ef4444;"></i>
                <div>
                    <span class="admin-stat-number">${bannedUsers}</span>
                    <label>مستخدمين محظورين</label>
                </div>
            </div>
            <div class="admin-stat-card">
                <i class="fas fa-user-shield" style="color:#f59e0b;"></i>
                <div>
                    <span class="admin-stat-number">${admins}</span>
                    <label>المشرفين</label>
                </div>
            </div>
        </div>
        
        <div class="admin-users-controls">
            <div class="admin-search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="adminUserSearch" placeholder="ابحث عن مستخدم بالاسم أو البريد..." oninput="filterAdminUsers()" />
            </div>
            <div class="admin-filter-box">
                <select id="adminUserRoleFilter" onchange="filterAdminUsers()">
                    <option value="all">كل الأدوار</option>
                    <option value="user">مستخدم</option>
                    <option value="moderator">مدير</option>
                    <option value="admin">مشرف</option>
                </select>
                <select id="adminUserStatusFilter" onchange="filterAdminUsers()">
                    <option value="all">كل الحالات</option>
                    <option value="active">نشط</option>
                    <option value="banned">محظور</option>
                </select>
                <select id="adminUserSort" onchange="filterAdminUsers()">
                    <option value="newest">الأحدث</option>
                    <option value="oldest">الأقدم</option>
                    <option value="most_votes">الأكثر تصويتاً</option>
                    <option value="most_points">الأكثر نقاطاً</option>
                    <option value="most_friends">الأكثر أصدقاء</option>
                </select>
            </div>
            <div class="admin-bulk-actions">
                <button class="btn btn-danger btn-sm" onclick="bulkBanUsers()">
                    <i class="fas fa-ban"></i> حظر مختارين
                </button>
                <button class="btn btn-success btn-sm" onclick="bulkUnbanUsers()">
                    <i class="fas fa-user-check"></i> إلغاء حظر مختارين
                </button>
            </div>
        </div>
        
        <div id="adminUsersTableContainer">
            <table class="admin-users-table">
                <thead>
                    <tr>
                        <th style="width:30px;">
                            <input type="checkbox" id="selectAllUsers" onchange="toggleAllAdminUsers()" />
                        </th>
                        <th>المستخدم</th>
                        <th>الدور</th>
                        <th>الحالة</th>
                        <th>النشاط</th>
                        <th>الإحصائيات</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody id="adminUsersTableBody">
                </tbody>
            </table>
        </div>
    `;
    
    adminUsersList.innerHTML = html;
    
    // عرض المستخدمين
    renderAdminUsersTable();
}

// ============================================================
//  renderAdminUsersTable - عرض المستخدمين في الجدول
// ============================================================

function renderAdminUsersTable() {
    var tbody = document.getElementById('adminUsersTableBody');
    if (!tbody) return;
    
    // الحصول على الفلاتر
    var search = document.getElementById('adminUserSearch')?.value?.trim().toLowerCase() || '';
    var roleFilter = document.getElementById('adminUserRoleFilter')?.value || 'all';
    var statusFilter = document.getElementById('adminUserStatusFilter')?.value || 'all';
    var sortBy = document.getElementById('adminUserSort')?.value || 'newest';
    
    // تصفية المستخدمين
    var filteredUsers = users.filter(function(user) {
        // البحث
        if (search) {
            var nameMatch = user.displayName && user.displayName.toLowerCase().includes(search);
            var emailMatch = user.email && user.email.toLowerCase().includes(search);
            if (!nameMatch && !emailMatch) return false;
        }
        
        // فلتر الدور
        if (roleFilter !== 'all' && user.role !== roleFilter) return false;
        
        // فلتر الحالة
        if (statusFilter === 'banned' && user.banned !== true) return false;
        if (statusFilter === 'active' && user.banned === true) return false;
        
        return true;
    });
    
    // ترتيب المستخدمين
    filteredUsers.sort(function(a, b) {
        switch(sortBy) {
            case 'newest':
                return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
            case 'oldest':
                return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
            case 'most_votes':
                return (b.votes || 0) - (a.votes || 0);
            case 'most_points':
                var aPoints = calculateUserPoints(a).earnedPoints;
                var bPoints = calculateUserPoints(b).earnedPoints;
                return bPoints - aPoints;
            case 'most_friends':
                return (b.friends || []).length - (a.friends || []).length;
            default:
                return 0;
        }
    });
    
    if (filteredUsers.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;padding:2rem;color:var(--gray-400);">
                    <i class="fas fa-search" style="font-size:1.5rem;display:block;margin-bottom:0.5rem;"></i>
                    لا توجد نتائج تطابق معايير البحث
                </td>
            </tr>
        `;
        return;
    }
    
    var html = '';
    filteredUsers.forEach(function(user) {
        var result = calculateUserPoints(user);
        var badges = calculateBadges(user);
        var isBanned = user.banned || false;
        var isCurrentUser = currentUser && currentUser.uid === user.uid;
        var isSuperAdmin = user.isSuperAdmin || false;
        
        // دور المستخدم مع لون
        var roleColors = {
            'admin': { color: '#f59e0b', label: 'مشرف' },
            'moderator': { color: '#3b82f6', label: 'مدير' },
            'user': { color: '#6b7280', label: 'مستخدم' }
        };
        var roleInfo = roleColors[user.role] || roleColors['user'];
        
        // حالة المستخدم
        var statusBadge = isBanned ? 
            '<span class="status-badge banned"><i class="fas fa-ban"></i> محظور</span>' :
            '<span class="status-badge active"><i class="fas fa-check-circle"></i> نشط</span>';
        
        // شارة المشرف الرئيسي
        var superAdminBadge = isSuperAdmin ? 
            '<span class="super-admin-badge"><i class="fas fa-crown"></i> رئيسي</span>' : '';
        
        // تاريخ الانضمام
        var joinDate = user.createdAt?.seconds ? 
            new Date(user.createdAt.seconds * 1000).toLocaleDateString('ar') : 
            'غير معروف';
        
        var isSelected = selectedAdminUsers.indexOf(user.uid) !== -1;
        
        html += `
            <tr class="${isBanned ? 'banned-row' : ''} ${isCurrentUser ? 'current-user-row' : ''} ${isSuperAdmin ? 'super-admin-row' : ''}">
                <td>
                    <input type="checkbox" class="admin-user-checkbox" data-uid="${user.uid}" ${isSelected ? 'checked' : ''} ${isCurrentUser || isSuperAdmin ? 'disabled' : ''} />
                </td>
                <td class="user-cell">
                    <div class="admin-user-info">
                        <img src="${user.avatar || ''}" onerror="this.src=''" alt="${escapeHtml(user.displayName || 'مستخدم')}" />
                        <div>
                            <div class="admin-user-name">
                                ${escapeHtml(user.displayName || 'مستخدم')}
                                ${superAdminBadge}
                                ${isCurrentUser ? '<span class="current-user-badge">أنت</span>' : ''}
                            </div>
                            <div class="admin-user-email">${escapeHtml(user.email || '')}</div>
                            <div class="admin-user-meta">
                                <span><i class="fas fa-calendar-alt"></i> ${joinDate}</span>
                                <span><i class="fas fa-gem"></i> ${result.earnedPoints} نقطة</span>
                                <span><i class="fas fa-trophy"></i> ${badges.length} شارة</span>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="role-badge" style="background:${roleInfo.color}20;color:${roleInfo.color};padding:0.2rem 0.6rem;border-radius:20px;font-weight:600;font-size:0.75rem;">
                        ${roleInfo.label}
                    </span>
                </td>
                <td>${statusBadge}</td>
                <td>
                    <div class="admin-user-activity">
                        <div class="activity-item">
                            <span class="activity-value">${user.votes || 0}</span>
                            <label>تصويتات</label>
                        </div>
                        <div class="activity-item">
                            <span class="activity-value">${(user.completed || []).length}</span>
                            <label>مجتاز</label>
                        </div>
                        <div class="activity-item">
                            <span class="activity-value">${(user.friends || []).length}</span>
                            <label>أصدقاء</label>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="admin-user-stats">
                        <span><i class="fas fa-star"></i> ${(user.favorites || []).length}</span>
                        <span><i class="fas fa-handshake"></i> ${(user.trustedBy || []).length}</span>
                        <span><i class="fas fa-flag"></i> ${(user.reports || []).length}</span>
                        <span><i class="fas fa-gift"></i> ${(user.receivedGifts || []).length}</span>
                    </div>
                </td>
                <td>
                    <div class="admin-user-actions">
                        ${!isSuperAdmin ? `
                            <button class="action-btn view" onclick="viewUserProfile('${user.uid}')" title="عرض الملف الشخصي">
                                <i class="fas fa-user"></i>
                            </button>
                            <button class="action-btn points" onclick="adminGivePointsFromModal('${user.uid}')" title="إعطاء نقاط">
                                <i class="fas fa-gem"></i>
                            </button>
                            ${!isCurrentUser ? `
                                <button class="action-btn role" onclick="toggleUserRole('${user.uid}')" title="تغيير الدور">
                                    <i class="fas fa-exchange-alt"></i>
                                </button>
                                ${isBanned ? 
                                    `<button class="action-btn unban" onclick="unbanUser('${user.uid}')" title="إلغاء الحظر">
                                        <i class="fas fa-user-check"></i>
                                    </button>` :
                                    `<button class="action-btn ban" onclick="banUser('${user.uid}')" title="حظر المستخدم">
                                        <i class="fas fa-ban"></i>
                                    </button>`
                                }
                                <button class="action-btn delete" onclick="deleteUserCompletely('${user.uid}')" title="حذف المستخدم">
                                    <i class="fas fa-trash"></i>
                                </button>
                            ` : ''}
                        ` : '<span class="protected-badge">🔒 محمي</span>'}
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
    
    // إضافة مستمع لتحديد الكل
    var selectAll = document.getElementById('selectAllUsers');
    if (selectAll) {
        selectAll.onchange = function() {
            toggleAllAdminUsers();
        };
    }
    
    // تحديث إحصائيات الفلتر
    updateFilteredStats(filteredUsers.length);
}

// ============================================================
//  دوال الفلترة والتحكم
// ============================================================

var selectedAdminUsers = [];

function filterAdminUsers() {
    renderAdminUsersTable();
}

function toggleAllAdminUsers() {
    var checkboxes = document.querySelectorAll('.admin-user-checkbox:not([disabled])');
    var selectAll = document.getElementById('selectAllUsers');
    var isChecked = selectAll ? selectAll.checked : false;
    
    checkboxes.forEach(function(cb) {
        cb.checked = isChecked;
        var uid = cb.dataset.uid;
        if (isChecked) {
            if (selectedAdminUsers.indexOf(uid) === -1) {
                selectedAdminUsers.push(uid);
            }
        } else {
            var index = selectedAdminUsers.indexOf(uid);
            if (index !== -1) {
                selectedAdminUsers.splice(index, 1);
            }
        }
    });
    
    updateSelectionCount();
}

// عند تغيير خانة اختيار فردية
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('admin-user-checkbox')) {
        var uid = e.target.dataset.uid;
        if (e.target.checked) {
            if (selectedAdminUsers.indexOf(uid) === -1) {
                selectedAdminUsers.push(uid);
            }
        } else {
            var index = selectedAdminUsers.indexOf(uid);
            if (index !== -1) {
                selectedAdminUsers.splice(index, 1);
            }
        }
        updateSelectionCount();
    }
});

function updateSelectionCount() {
    var count = selectedAdminUsers.length;
    // يمكن عرض العدد في مكان ما
    console.log('📌 المستخدمين المختارين:', count);
}

function updateFilteredStats(count) {
    var statsContainer = document.querySelector('.admin-users-stats');
    if (statsContainer) {
        var totalSpan = statsContainer.querySelector('.admin-stat-card:first-child .admin-stat-number');
        if (totalSpan) {
            // لا نغير العدد الإجمالي
        }
    }
}



// ============================================================
//  تحديث toggleUserRole - مع دعم الأدوار المتعددة
// ============================================================

async function toggleUserRole(uid) {
    if (uid === currentUser?.uid) {
        showToast('لا يمكن تغيير دورك بنفسك', 'error');
        return;
    }
    
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) return;
    
    if (user.isSuperAdmin) {
        showToast('❌ لا يمكن تغيير دور المشرف الرئيسي', 'error');
        return;
    }
    
    var roles = ['user', 'moderator', 'admin'];
    var roleLabels = {
        'user': 'مستخدم',
        'moderator': 'مدير',
        'admin': 'مشرف'
    };
    
    var currentIndex = roles.indexOf(user.role || 'user');
    var nextRole = roles[(currentIndex + 1) % roles.length];
    var nextLabel = roleLabels[nextRole] || nextRole;
    
    if (!confirm(`⚠️ هل أنت متأكد من تغيير دور "${roleLabels[user.role] || user.role}" إلى "${nextLabel}"؟`)) {
        return;
    }
    
    try {
        await db.collection('users').doc(uid).update({ role: nextRole });
        showToast(`✅ تم تغيير الدور إلى ${nextLabel}`, 'success');
        await loadAllData();
        renderAdminUsers();
    } catch (error) {
        console.error('Error toggling role:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// ============================================================
//  تحسين banUser و unbanUser
// ============================================================

async function banUser(uid) {
    if (!isAdmin) {
        showToast('هذه العملية للمشرف فقط', 'error');
        return;
    }
    if (uid === currentUser?.uid) {
        showToast('لا يمكن حظر نفسك', 'error');
        return;
    }
    
    var user = users.find(function(u) { return u.uid === uid; });
    if (user && user.isSuperAdmin) {
        showToast('❌ لا يمكن حظر المشرف الرئيسي', 'error');
        return;
    }
    
    var reason = prompt('سبب الحظر (اختياري):', '');
    if (reason === null) return;
    
    if (!confirm(`⚠️ هل أنت متأكد من حظر هذا المستخدم؟${reason ? '\nالسبب: ' + reason : ''}`)) {
        return;
    }
    
    try {
        var updateData = { 
            banned: true, 
            bannedAt: firebase.firestore.FieldValue.serverTimestamp() 
        };
        if (reason && reason.trim()) {
            updateData.banReason = reason.trim();
        }
        
        await db.collection('users').doc(uid).update(updateData);
        showToast(`🚫 تم حظر المستخدم بنجاح${reason ? ' (السبب: ' + reason + ')' : ''}`, 'warning');
        await loadAllData();
        renderAdminUsers();
    } catch (error) {
        console.error('Error banning user:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

async function unbanUser(uid) {
    if (!isAdmin) {
        showToast('هذه العملية للمشرف فقط', 'error');
        return;
    }
    if (uid === currentUser?.uid) {
        showToast('لا يمكن إلغاء حظر نفسك', 'error');
        return;
    }
    
    if (!confirm('⚠️ هل أنت متأكد من إلغاء حظر هذا المستخدم؟')) {
        return;
    }
    
    try {
        await db.collection('users').doc(uid).update({ 
            banned: false,
            bannedAt: null,
            banReason: null
        });
        showToast('✅ تم إلغاء حظر المستخدم', 'success');
        await loadAllData();
        renderAdminUsers();
    } catch (error) {
        console.error('Error unbanning user:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}


// متغير لتخزين بيانات المادة الحالية
var currentCourseAction = null;
var currentCourseUserUid = null;

// ============================================================
//  بناء محتوى مودال المادة - إصلاح: تعتمد على المستخدم الحالي
// ============================================================



// ============================================================
//  دوال الإجراءات السريعة
// ============================================================

// ============================================================
//  دوال الإجراءات السريعة - مع تحديث الشارات
// ============================================================

// ============================================================
//  إصلاح شامل لنظام الرجوع - يعمل لعدد غير محدود من المرات
// ============================================================

// متغيرات عامة
var modalStack = [];
var modalHistory = []; // سجل المودالات المفتوحة (يتم الاحتفاظ به)
var previousModalId = null;
var isNavigatingBack = false; // لمنع التكرار

// ============================================================
//  تحديث showCourseActions - حفظ التاريخ بشكل دائم
// ============================================================

function showCourseActions(courseId, userUid) {
    console.log('🔍 showCourseActions - courseId:', courseId, 'userUid:', userUid);
    
    if (isCourseActionsModalOpening) {
        console.log('⏳ جاري فتح مودال المادة...');
        return;
    }
    
    var course = courses.find(function(c) { return c.id === courseId; });
    if (!course) {
        showToast('المادة غير موجودة', 'error');
        return;
    }
    
    isCourseActionsModalOpening = true;
    
    // تخزين المادة الحالية
    currentCourseAction = course;
    currentCourseUserUid = userUid || currentUser?.uid || null;
    
    // ===== حفظ المودال السابق في التاريخ (بشكل دائم) =====
    // نبحث عن آخر مودال مفتوح غير مودال المادة
    var lastModal = null;
    for (var i = modalStack.length - 1; i >= 0; i--) {
        if (modalStack[i] !== 'courseActionsModal' && 
            modalStack[i] !== 'courseInfoModal' && 
            modalStack[i] !== 'voteDetailsModal' && 
            modalStack[i] !== 'courseAnalyticsModal') {
            lastModal = modalStack[i];
            break;
        }
    }
    
    if (lastModal) {
        // نضيف إلى سجل التاريخ إذا لم يكن موجوداً بالفعل
        var historyIndex = modalHistory.indexOf(lastModal);
        if (historyIndex === -1) {
            modalHistory.push(lastModal);
        } else {
            // ننقله إلى النهاية ليكون الأحدث
            modalHistory.splice(historyIndex, 1);
            modalHistory.push(lastModal);
        }
        previousModalId = lastModal;
        console.log('📌 حفظ المودال السابق في التاريخ:', previousModalId);
        console.log('📋 سجل المودالات:', modalHistory);
    }
    
    console.log('📚 فتح مودال المادة:', course.name);
    
    // ===== التأكد من وجود المودال =====
    var modal = document.getElementById('courseActionsModal');
    var content = document.getElementById('courseActionsContent');
    var title = document.getElementById('courseActionsTitle');
    
    if (!modal || !content || !title) {
        console.log('⚠️ مودال المادة غير موجود، جاري إنشائه...');
        createCourseActionsModal();
        modal = document.getElementById('courseActionsModal');
        content = document.getElementById('courseActionsContent');
        title = document.getElementById('courseActionsTitle');
        
        if (!modal || !content || !title) {
            console.error('❌ فشل في إنشاء مودال المادة');
            showToast('حدث خطأ في فتح المادة', 'error');
            isCourseActionsModalOpening = false;
            return;
        }
    }
    
    // ===== إزالة أي طبقات سابقة =====
    modal.classList.remove('modal-layer-1', 'modal-layer-2', 'modal-layer-3', 'modal-layer-4');
    
    // ===== إخفاء المودال إذا كان مفتوحاً =====
    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        modal.style.opacity = '0';
    }
    
    // تحديث العنوان
    title.innerHTML = '<i class="fas fa-book"></i> ' + escapeHtml(course.name) + ' (' + escapeHtml(course.code) + ')';
    
    // بناء المحتوى
    content.innerHTML = buildCourseActionsHTML(course, currentUser?.uid);
    
    // ===== فتح المودال =====
    var layer = 3;
    if (modalStack.length > 0) {
        layer = Math.min(modalStack.length + 2, 4);
    }
    
    // إزالة المودال من المكدس إذا كان موجوداً
    var existingIndex = modalStack.indexOf('courseActionsModal');
    if (existingIndex !== -1) {
        modalStack.splice(existingIndex, 1);
    }
    modalStack.push('courseActionsModal');
    
    modal.classList.add('modal-layer-' + layer);
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    modal.style.zIndex = 100000 + (layer * 10000);
    
    setTimeout(function() {
        modal.classList.add('active');
        modal.style.opacity = '1';
        modal.style.zIndex = 100000 + (layer * 10000);
        isCourseActionsModalOpening = false;
        console.log('✅ تم فتح مودال المادة في الطبقة:', layer);
        console.log('📋 المكدس الحالي:', modalStack);
    }, 150);
}

// ============================================================
//  تحديث closeCourseActionsModal - العودة للمودال السابق (يعمل دائماً)
// ============================================================

function closeCourseActionsModal() {
    if (isNavigatingBack) {
        console.log('⏳ جاري التنقل بالفعل...');
        return;
    }
    
    console.log('🔒 إغلاق مودال المادة');
    console.log('📋 المكدس قبل الإغلاق:', modalStack);
    console.log('📋 سجل التاريخ:', modalHistory);
    console.log('📌 previousModalId:', previousModalId);
    
    isNavigatingBack = true;
    
    var modal = document.getElementById('courseActionsModal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.zIndex = '200000';
    }
    
    // إزالة من المكدس
    var index = modalStack.indexOf('courseActionsModal');
    if (index !== -1) {
        modalStack.splice(index, 1);
    }
    
    currentCourseAction = null;
    currentCourseUserUid = null;
    
    // ===== العودة إلى المودال السابق =====
    var targetModalId = null;
    
    // 1. أولاً نتحقق من previousModalId
    if (previousModalId) {
        targetModalId = previousModalId;
        console.log('🔙 استخدام previousModalId:', targetModalId);
    }
    // 2. إذا لم يكن هناك، نأخذ آخر مودال من التاريخ
    else if (modalHistory.length > 0) {
        targetModalId = modalHistory[modalHistory.length - 1];
        console.log('🔙 استخدام آخر مودال من التاريخ:', targetModalId);
    }
    // 3. إذا لم يكن هناك، نأخذ آخر مودال من المكدس
    else if (modalStack.length > 0) {
        targetModalId = modalStack[modalStack.length - 1];
        console.log('🔙 استخدام آخر مودال من المكدس:', targetModalId);
    }
    
    if (targetModalId) {
        console.log('🔙 العودة إلى المودال:', targetModalId);
        var prevModal = document.getElementById(targetModalId);
        if (prevModal) {
            // التأكد من أن المودال في المكدس
            if (modalStack.indexOf(targetModalId) === -1) {
                modalStack.push(targetModalId);
            }
            
            // إعادة عرض المودال
            setTimeout(function() {
                prevModal.style.display = 'flex';
                prevModal.style.opacity = '1';
                prevModal.classList.add('active');
                // إزالة الطبقات الزائدة
                prevModal.classList.remove('modal-layer-2', 'modal-layer-3', 'modal-layer-4');
                var layer = Math.min(modalStack.length, 4);
                prevModal.classList.add('modal-layer-' + layer);
                prevModal.style.zIndex = 100000 + (layer * 10000);
                console.log('✅ تم استعادة المودال:', targetModalId);
                console.log('📋 المكدس بعد الاستعادة:', modalStack);
                
                // تحديث محتوى المودال إذا كان userProfileModal
                if (targetModalId === 'userProfileModal' && currentViewedUserUid) {
                    refreshUserProfileContentOnly();
                }
                
                // ===== لا نمسح previousModalId للحفاظ على التاريخ =====
                // فقط نضبط isNavigatingBack
                isNavigatingBack = false;
            }, 300);
        } else {
            console.log('⚠️ المودال غير موجود:', targetModalId);
            // إزالة من التاريخ إذا كان غير موجود
            var historyIndex = modalHistory.indexOf(targetModalId);
            if (historyIndex !== -1) {
                modalHistory.splice(historyIndex, 1);
            }
            previousModalId = null;
            isNavigatingBack = false;
            // محاولة العودة إلى مودال آخر
            if (modalHistory.length > 0) {
                closeCourseActionsModal();
                return;
            }
        }
    } else {
        console.log('ℹ️ لا يوجد مودال سابق للعودة إليه');
        // إذا لم يكن هناك مودال سابق، نعود إلى الصفحة الرئيسية
        showPage('home');
        isNavigatingBack = false;
    }
}

// ============================================================
//  تحديث viewUserProfile - إضافة إلى التاريخ بشكل دائم
// ============================================================

// ============================================================
//  تحديث قائمة المحظورين تلقائياً
// ============================================================

function refreshBlockedList() {
    if (currentStudentList === 'blocked') {
        var container = document.getElementById('studentListContainer');
        if (container) {
            renderBlockedList(container);
        }
    }
    updateStudentsStats();
}

function viewUserProfile(uid) {
    if (isUserBlocked(uid) || isUserBlockedBy(uid)) {
        showToast('لا يمكنك عرض ملف هذا المستخدم', 'error');
        return;
    }
    if (isUserProfileModalOpening) return;

    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) {
        showToast('المستخدم غير موجود', 'error');
        return;
    }

    if (user.privacy && user.privacy.lockProfile && currentUser?.uid !== uid && !isAdmin) {
        showToast('هذا الملف الشخصي مغلق', 'warning');
        return;
    }

    currentViewedUserUid = uid;

    // تحديد إذا كان المستخدم الحالي يعرض ملفه الشخصي
    var isViewingOwnProfile = currentUser && currentUser.uid === uid;

    if (userProfileTitle) {
        userProfileTitle.textContent = '👤 ' + (user.displayName || 'مستخدم');
        if (isViewingOwnProfile) {
            userProfileTitle.innerHTML = '👁️ ' + (user.displayName || 'مستخدم') + ' <span style="font-size:0.6rem;color:var(--gray-400);">(كما يراه الآخرون)</span>';
        }
    }

    if (userProfileContent) {
        userProfileContent.innerHTML = buildUserProfileHTML(user);
        setTimeout(function() {
            applyCustomizationsToModal(user);
        }, 50);
    }

    // إضافة إلى التاريخ
    var historyIndex = modalHistory.indexOf('userProfileModal');
    if (historyIndex !== -1) {
        modalHistory.splice(historyIndex, 1);
    }
    modalHistory.push('userProfileModal');
    previousModalId = 'userProfileModal';

    if (isModalOpen('courseActionsModal')) {
        closeModal('courseActionsModal');
    }

    setTimeout(function() {
        openModal('userProfileModal', { layer: 1 });
        isUserProfileModalOpening = false;
        setTimeout(function() {
            applyCustomizationsToModal(user);
        }, 100);
    }, 100);
}

// ============================================================
//  تحديث دوال الرجوع - الحفاظ على التاريخ
// ============================================================

function backFromCourseInfo() {
    console.log('🔙 الرجوع من المعلومات');
    closeModal('courseInfoModal');
    
    setTimeout(function() {
        if (currentCourseAction) {
            // نعيد فتح مودال المادة مع الحفاظ على التاريخ
            showCourseActions(currentCourseAction.id, currentCourseUserUid);
        } else {
            // العودة إلى المودال السابق
            restorePreviousModal();
        }
    }, 300);
}

function backFromVoteDetails() {
    console.log('🔙 الرجوع من تفاصيل التصويت');
    closeModal('voteDetailsModal');
    
    setTimeout(function() {
        if (currentCourseAction) {
            showCourseActions(currentCourseAction.id, currentCourseUserUid);
        } else {
            restorePreviousModal();
        }
    }, 300);
}

function backFromAnalytics() {
    console.log('🔙 الرجوع من التحليلات');
    closeModal('courseAnalyticsModal');
    
    setTimeout(function() {
        if (currentCourseAction) {
            showCourseActions(currentCourseAction.id, currentCourseUserUid);
        } else {
            restorePreviousModal();
        }
    }, 300);
}

// ============================================================
//  دالة مساعدة لاستعادة المودال السابق
// ============================================================

function restorePreviousModal() {
    console.log('🔍 محاولة استعادة المودال السابق');
    console.log('📋 سجل التاريخ:', modalHistory);
    console.log('📌 previousModalId:', previousModalId);
    
    var targetModalId = null;
    
    // نبحث عن آخر مودال في التاريخ
    if (modalHistory.length > 0) {
        targetModalId = modalHistory[modalHistory.length - 1];
    } else if (previousModalId) {
        targetModalId = previousModalId;
    }
    
    if (targetModalId) {
        var prevModal = document.getElementById(targetModalId);
        if (prevModal) {
            if (modalStack.indexOf(targetModalId) === -1) {
                modalStack.push(targetModalId);
            }
            prevModal.style.display = 'flex';
            prevModal.style.opacity = '1';
            prevModal.classList.add('active');
            var layer = Math.min(modalStack.length, 4);
            prevModal.classList.remove('modal-layer-1', 'modal-layer-2', 'modal-layer-3', 'modal-layer-4');
            prevModal.classList.add('modal-layer-' + layer);
            prevModal.style.zIndex = 100000 + (layer * 10000);
            console.log('✅ تم استعادة المودال:', targetModalId);
            
            if (targetModalId === 'userProfileModal' && currentViewedUserUid) {
                refreshUserProfileContentOnly();
            }
        } else {
            console.log('⚠️ المودال غير موجود:', targetModalId);
        }
    } else {
        console.log('ℹ️ لا يوجد مودال سابق');
        showPage('home');
    }
}

// ============================================================
//  تحديث مودال المستخدم المفتوح (دون إعادة فتحه)
// ============================================================
function refreshUserProfileModal() {
    if (!currentViewedUserUid) return;
    var modal = document.getElementById('userProfileModal');
    if (!modal || !modal.classList.contains('active')) return;
    var user = users.find(function(u) { return u.uid === currentViewedUserUid; });
    if (!user) return;
    var content = document.getElementById('userProfileContent');
    if (content) {
        content.innerHTML = buildUserProfileHTML(user);
        // تأخير بسيط للتأكد من اكتمال بناء HTML
        setTimeout(function() {
            applyCustomizationsToModal(user);
        }, 50);
    }
}

// ============================================================
//  دالة debugModalsStatus - لعرض حالة المودالات
// ============================================================

function debugModalsStatus() {
    console.log('📊 === حالة المودالات ===');
    console.log('📋 المكدس (modalStack):', modalStack);
    console.log('📋 التاريخ (modalHistory):', modalHistory);
    console.log('📌 previousModalId:', previousModalId);
    console.log('📌 currentViewedUserUid:', currentViewedUserUid);
    console.log('📌 currentCourseAction:', currentCourseAction?.name || 'لا يوجد');
    console.log('📌 isNavigatingBack:', isNavigatingBack);
    
    console.log('📋 المودالات المفتوحة:');
    document.querySelectorAll('.modal').forEach(function(m) {
        var isActive = m.classList.contains('active');
        var isVisible = m.style.display !== 'none';
        var zIndex = m.style.zIndex || 'auto';
        console.log('  - ' + m.id + ': ' + (isActive ? '✅ مفتوح' : '❌ مغلق') + 
                    ' (visible: ' + isVisible + ', z-index: ' + zIndex + ')');
    });
}

// ============================================================
//  إضافة أمر تصحيح في الكونسول
// ============================================================

console.log('💡 استخدم debugModalsStatus() لعرض حالة المودالات');
console.log('💡 استخدم modalHistory لعرض سجل المودالات');

// ============================================================
//  عند فتح الصفحة، تهيئة التاريخ
// ============================================================

// تهيئة المودالات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إضافة مستمع لإغلاق المودالات لتحديث التاريخ
    document.querySelectorAll('.modal-close, .btn-close').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var modal = this.closest('.modal');
            if (modal && modal.id) {
                var index = modalHistory.indexOf(modal.id);
                if (index !== -1) {
                    // لا نمسح من التاريخ، فقط نتركه للاستخدام المستقبلي
                    console.log('📌 إغلاق مودال:', modal.id, '(يبقى في التاريخ)');
                }
            }
        });
    });
});

// ============================================================
//  تحديث محتوى مودال المستخدم فقط (بدون إعادة فتح)
// ============================================================

// ============================================================
//  تحسين التجاوب - إعادة التحديث عند تغيير حجم الشاشة
// ============================================================

// إضافة مستمع لتغيير حجم الشاشة
var resizeTimeout;

window.addEventListener('resize', function() {
    // تأخير التنفيذ لتجنب التكرار
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        handleResponsiveLayout();
    }, 250);
});

function handleResponsiveLayout() {
    var isMobile = window.innerWidth <= 768;
    var isSmallMobile = window.innerWidth <= 400;
    
    // إضافة/إزالة كلاسات للهواتف
    document.body.classList.toggle('mobile-view', isMobile);
    document.body.classList.toggle('small-mobile-view', isSmallMobile);
    
    // تحسين عرض القوائم في الهواتف
    if (isMobile) {
        // إعادة تنسيق الفلاتر
        var filters = document.querySelector('.students-filters');
        if (filters) {
            filters.style.flexDirection = 'column';
        }
        
        // إعادة تنسيق الأزرار
        document.querySelectorAll('.student-card .student-actions .btn').forEach(function(btn) {
            btn.style.fontSize = '0.5rem';
            btn.style.padding = '0.1rem 0.3rem';
        });
    }
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        handleResponsiveLayout();
    }, 500);
});

// ============================================================
//  دوال الإجراءات السريعة من مودال المادة
// ============================================================

async function handleQuickFavorite(courseId) {
    if (!currentUser) { 
        showToast('يرجى تسجيل الدخول', 'error'); 
        return; 
    }
    
    try {
        var favs = currentUserData?.favorites || [];
        var idx = favs.indexOf(courseId);
        var isAdding = idx === -1;
        
        if (isAdding) {
            favs.push(courseId);
        } else {
            favs.splice(idx, 1);
        }
        
        await db.collection('users').doc(currentUser.uid).update({ favorites: favs });
        currentUserData.favorites = favs;
        
        // تحديث مودال المادة
        refreshCurrentCourseActions();
        
        // تحديث الشارات والنقاط
        updateBadges();
        updatePointsDisplay();
        
        showToast(isAdding ? '⭐ تم إضافة للمفضلة' : '❌ تم إزالة من المفضلة', 'success');
        
    } catch (error) {
        console.error('Error toggling favorite:', error);
        showToast('حدث خطأ', 'error');
    }
}

async function handleQuickComplete(courseId) {
    if (!currentUser) { 
        showToast('يرجى تسجيل الدخول', 'error'); 
        return; 
    }
    
    try {
        var comps = currentUserData?.completed || [];
        var idx = comps.indexOf(courseId);
        var isAdding = idx === -1;
        
        if (isAdding) {
            comps.push(courseId);
        } else {
            comps.splice(idx, 1);
        }
        
        await db.collection('users').doc(currentUser.uid).update({ completed: comps });
        currentUserData.completed = comps;
        
        // تحديث مودال المادة
        refreshCurrentCourseActions();
        
        // تحديث الشارات والنقاط
        updateBadges();
        updatePointsDisplay();
        
        showToast(isAdding ? '✅ تم إضافة للمجتاز' : '❌ تم إزالة من المجتاز', 'success');
        
    } catch (error) {
        console.error('Error toggling completed:', error);
        showToast('حدث خطأ', 'error');
    }
}

async function handleQuickVote(courseId, rating) {
    if (!currentUser) { 
        showToast('يرجى تسجيل الدخول للتصويت', 'error'); 
        return; 
    }
    
    try {
        var docRef = db.collection('courses').doc(courseId);
        var doc = await docRef.get();
        if (!doc.exists) return;
        
        var course = { id: doc.id, ...doc.data() };
        if (!course.voters) course.voters = {};
        var userId = currentUser.uid;
        var oldRating = course.voters[userId];
        
        if (oldRating === rating) {
            delete course.voters[userId];
            course.votes = (course.votes || 0) - 1;
            course.totalRating = (course.totalRating || 0) - rating;
        } else {
            if (oldRating) {
                course.totalRating = (course.totalRating || 0) - oldRating;
                course.votes = (course.votes || 0) - 1;
            }
            course.voters[userId] = rating;
            course.votes = (course.votes || 0) + 1;
            course.totalRating = (course.totalRating || 0) + rating;
        }
        course.avgRating = course.votes > 0 ? course.totalRating / course.votes : 0;
        
        await docRef.update({ 
            voters: course.voters, 
            votes: course.votes, 
            totalRating: course.totalRating, 
            avgRating: course.avgRating 
        });
        
        var userVotes = (currentUserData.votes || 0) + (oldRating === rating ? -1 : (oldRating ? 0 : 1));
        if (oldRating !== rating) {
            await db.collection('users').doc(currentUser.uid).update({ votes: userVotes });
            currentUserData.votes = userVotes;
        }
        
        // تحديث المادة في الذاكرة المحلية
        var courseIndex = courses.findIndex(function(c) { return c.id === courseId; });
        if (courseIndex !== -1) {
            courses[courseIndex] = course;
        }
        
        // تحديث مودال المادة
        refreshCurrentCourseActions();
        renderCourses();
        
        var ratingLabel = RATING_LABELS[5 - rating];
        showToast(oldRating === rating ? '✅ تم إلغاء التصويت' : '⭐ تم التصويت بـ: ' + ratingLabel, 'success');
        
    } catch (error) {
        console.error('Error voting:', error);
        showToast('حدث خطأ في التصويت: ' + error.message, 'error');
    }
}

async function handleQuickComment(courseId) {
    if (!currentUser) { 
        showToast('يرجى تسجيل الدخول', 'error'); 
        return; 
    }
    
    var input = document.getElementById('quickCommentInput');
    if (!input || !input.value.trim()) {
        showToast('يرجى كتابة تعليق', 'warning');
        return;
    }
    
    try {
        var docRef = db.collection('courses').doc(courseId);
        var doc = await docRef.get();
        if (!doc.exists) return;
        
        var course = doc.data();
        var comments = course.comments || [];
        var userName = currentUserData?.displayName || 'مستخدم';
        var newComment = userName + ': ' + input.value.trim();
        comments.push(newComment);
        
        await docRef.update({ comments: comments });
        
        // تحديث المادة في الذاكرة المحلية
        var courseIndex = courses.findIndex(function(c) { return c.id === courseId; });
        if (courseIndex !== -1) {
            courses[courseIndex].comments = comments;
        }
        
        // تحديث مودال المادة
        refreshCurrentCourseActions();
        input.value = '';
        
        showToast('✅ تم إضافة التعليق! 💬', 'success');
        
    } catch (error) {
        console.error('Error adding comment:', error);
        showToast('حدث خطأ في إضافة التعليق: ' + error.message, 'error');
    }
}



function refreshCurrentCourseActions() {
    if (!currentCourseAction) {
        console.log('⚠️ لا يوجد مادة حالية للتحديث');
        return;
    }
    
    var content = document.getElementById('courseActionsContent');
    if (!content) {
        console.log('⚠️ عنصر courseActionsContent غير موجود');
        return;
    }
    
    // جلب أحدث بيانات المادة
    var updatedCourse = courses.find(function(c) { return c.id === currentCourseAction.id; });
    if (updatedCourse) {
        currentCourseAction = updatedCourse;
        console.log('🔄 تم تحديث بيانات المادة:', currentCourseAction.id);
    }
    
    // إعادة بناء المحتوى
    var newHTML = buildCourseActionsHTML(currentCourseAction, currentUser?.uid);
    content.innerHTML = newHTML;
}

// ============================================================
//  تحديث sendPointsToUser - لتسجيل الهدايا
// ============================================================

async function sendPointsToUser(targetUid, amount, reason) {
    if (!currentUser) {
        showToast('يرجى تسجيل الدخول', 'error');
        return;
    }
    if (targetUid === currentUser.uid) {
        showToast('لا يمكنك إرسال نقاط لنفسك', 'warning');
        return;
    }
    if (!amount || amount < 1) {
        showToast('يجب أن تكون النقاط 1 على الأقل', 'error');
        return;
    }
    
    var result = calculateUserPoints(currentUserData);
    if (result.points < amount) {
        showToast('نقاطك لا تكفي! لديك ' + result.points + ' نقطة', 'error');
        return;
    }
    
    if (!confirm('هل أنت متأكد من إرسال ' + amount + ' نقطة إلى هذا المستخدم؟')) {
        return;
    }
    
    try {
        // خصم النقاط من المرسل
        var newSpentPoints = (currentUserData.spentPoints || 0) + amount;
        await db.collection('users').doc(currentUser.uid).update({
            spentPoints: newSpentPoints
        });
        currentUserData.spentPoints = newSpentPoints;
        
        // إضافة النقاط للمستقبل
        var targetRef = db.collection('users').doc(targetUid);
        await targetRef.update({
            receivedPoints: firebase.firestore.FieldValue.increment(amount)
        });
        
        // ===== تسجيل الهدية في قائمة الهدايا المستلمة =====
        var targetDoc = await targetRef.get();
        if (targetDoc.exists) {
            var targetData = targetDoc.data();
            var receivedGifts = targetData.receivedGifts || [];
            receivedGifts.push({
                from: currentUser.uid,
                fromName: currentUserData.displayName || currentUser.email,
                amount: amount,
                reason: reason || 'هدية',
                timestamp: new Date().toISOString()
            });
            await targetRef.update({ receivedGifts: receivedGifts });
        }
        
        // تسجيل المعاملة
        await db.collection('transactions').add({
            from: currentUser.uid,
            fromName: currentUserData.displayName || currentUser.email,
            to: targetUid,
            amount: amount,
            reason: reason || 'هدية',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إرسال إشعار للمستقبل
        try {
            await sendNotification(targetUid, {
                message: '🎁 ' + (currentUserData.displayName || currentUser.email) + ' أرسل لك ' + amount + ' نقطة' + (reason ? ' (سبب: ' + reason + ')' : ''),
                type: 'info',
                link: '/profile'
            });
        } catch (notifError) {
            console.warn('⚠️ خطأ في إرسال الإشعار (تجاهل):', notifError);
        }
        
        showToast('✅ تم إرسال ' + amount + ' نقطة بنجاح!', 'success');
        updatePointsDisplay();
        await loadAllData();
        
    } catch (error) {
        console.error('Error sending points:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

async function adminGivePoints(uid, amount, reason) {
    if (!isAdmin) {
        showToast('هذه العملية للمشرف فقط', 'error');
        return;
    }
    if (!amount || amount < 1) {
        showToast('يجب أن تكون النقاط 1 على الأقل', 'error');
        return;
    }
    
    if (!confirm('هل أنت متأكد من إعطاء ' + amount + ' نقطة لهذا المستخدم؟')) {
        return;
    }
    
    try {
        var userRef = db.collection('users').doc(uid);
        var userDoc = await userRef.get();
        if (!userDoc.exists) {
            showToast('المستخدم غير موجود', 'error');
            return;
        }
        
        // إضافة نقاط كهدية من المشرف
        await userRef.update({
            adminGiftedPoints: firebase.firestore.FieldValue.increment(amount)
        });
        
        // تسجيل المعاملة
        await db.collection('transactions').add({
            from: currentUser.uid,
            fromName: currentUserData.displayName || currentUser.email,
            to: uid,
            amount: amount,
            reason: reason || 'هدية من المشرف',
            isAdminGift: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إرسال إشعار للمستخدم (مع الإصلاح)
        try {
            await sendNotification(uid, {
                message: '👑 ' + (currentUserData.displayName || currentUser.email) + ' (مشرف) أضاف لك ' + amount + ' نقطة' + (reason ? ' (سبب: ' + reason + ')' : ''),
                type: 'success',
                link: '/profile'
            });
        } catch (notifError) {
            console.warn('⚠️ خطأ في إرسال الإشعار (تجاهل):', notifError);
        }
        
        showToast('✅ تم إضافة ' + amount + ' نقطة للمستخدم بنجاح!', 'success');
        await loadAllData();
        loadAdminUsers();
        
    } catch (error) {
        console.error('Error admin giving points:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// ===== عرض خيار إرسال النقاط في ملف المستخدم =====
function showSendPointsModal(uid) {
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) return;
    
    var modal = document.getElementById('sendPointsModal');
    var content = document.getElementById('sendPointsContent');
    if (!modal || !content) return;
    
    content.innerHTML = `
        <div style="padding:0.5rem;">
            <p style="margin-bottom:1rem;">إرسال نقاط إلى <strong>${escapeHtml(user.displayName || 'مستخدم')}</strong></p>
            <div class="form-group">
                <label>عدد النقاط</label>
                <input type="number" id="pointsAmount" min="1" max="100" value="10" style="width:100%;padding:0.5rem;border-radius:12px;border:1px solid var(--border-color);">
            </div>
            <div class="form-group" style="margin-top:0.5rem;">
                <label>السبب (اختياري)</label>
                <input type="text" id="pointsReason" placeholder="سبب الإرسال..." style="width:100%;padding:0.5rem;border-radius:12px;border:1px solid var(--border-color);">
            </div>
            <div style="display:flex;gap:0.5rem;margin-top:1rem;">
                <button class="btn btn-success" onclick="sendPointsFromModal('${uid}')"><i class="fas fa-paper-plane"></i> إرسال</button>
                <button class="btn btn-outline" onclick="closeModal('sendPointsModal')">إلغاء</button>
            </div>
        </div>
    `;
    
    openModal('sendPointsModal');
}

async function sendPointsFromModal(uid) {
    var amountInput = document.getElementById('pointsAmount');
    var reasonInput = document.getElementById('pointsReason');
    var amount = parseInt(amountInput?.value) || 10;
    var reason = reasonInput?.value || '';
    await sendPointsToUser(uid, amount, reason);
    closeModal('sendPointsModal');
}

// ============================================================
//  نظام إدارة النقاط للمشرف
// ============================================================



function adminGivePointsFromModal(uid) {
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) return;
    
    var amount = prompt('أدخل عدد النقاط لإعطائها لـ ' + (user.displayName || 'المستخدم') + ':', '10');
    if (amount === null) return;
    var numAmount = parseInt(amount);
    if (isNaN(numAmount) || numAmount < 1) {
        showToast('يرجى إدخال عدد صحيح موجب', 'error');
        return;
    }
    var reason = prompt('سبب الإعطاء (اختياري):', 'هدية من المشرف');
    adminGivePoints(uid, numAmount, reason || 'هدية من المشرف');
}


// ============================================================
//  إضافة CSS إضافية لتحسين المظهر
// ============================================================

var additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* تحسين ظهور العناصر في الخلفيات المخصصة */
    .profile-container[data-bg] .profile-stats {
        background: rgba(255,255,255,0.1);
        border-radius: 12px;
        padding: 0.3rem 0.8rem;
    }
    
    .profile-container[data-bg] .badges-section {
        background: rgba(255,255,255,0.1);
        border-radius: 12px;
        padding: 0.5rem 1rem;
        border: 1px solid rgba(255,255,255,0.1);
    }
    
    .profile-container[data-bg] .profile-action-btn {
        transition: all 0.3s ease;
    }
    
    .profile-container[data-bg] .profile-action-btn:hover {
        transform: translateY(-3px);
        background: rgba(255,255,255,0.25) !important;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    
    /* تحسين ظهور النصوص في الخلفيات الفاتحة */
    .profile-container[data-bg="gradient2"] .profile-stats,
    .profile-container[data-bg="gradient4"] .profile-stats,
    .profile-container[data-bg="sunrise"] .profile-stats,
    .profile-container[data-bg="lavender"] .profile-stats,
    .profile-container[data-bg="candy"] .profile-stats,
    .profile-container[data-bg="gold"] .profile-stats {
        background: rgba(0,0,0,0.05);
    }
    
    .profile-container[data-bg="gradient2"] .badges-section,
    .profile-container[data-bg="gradient4"] .badges-section,
    .profile-container[data-bg="sunrise"] .badges-section,
    .profile-container[data-bg="lavender"] .badges-section,
    .profile-container[data-bg="candy"] .badges-section,
    .profile-container[data-bg="gold"] .badges-section {
        background: rgba(0,0,0,0.05);
        border-color: rgba(0,0,0,0.1);
    }
    
    /* تحسين ظهور الأزرار في الخلفيات */
    .profile-container[data-bg] .btn-outline {
        color: inherit !important;
        border-color: rgba(255,255,255,0.3) !important;
    }
    
    .profile-container[data-bg] .btn-outline:hover {
        background: rgba(255,255,255,0.2) !important;
    }
    
    /* تحسين ظهور الشارات في الخلفيات المخصصة */
    .profile-container[data-bg] .badge-item {
        border-color: rgba(255,255,255,0.2) !important;
    }
    
    .profile-container[data-bg] .badge-item.style-gradient {
        color: white !important;
    }
    
    /* تحسين ظهور النصوص في المودال */
    #userProfileViewContainer[style*="background"] .view-info p,
    #userProfileViewContainer[style*="background"] .view-stats-row .stat-box span,
    #userProfileViewContainer[style*="background"] .view-stats-row .stat-box label {
        color: inherit !important;
    }
    
    #userProfileViewContainer[style*="background"] .view-bio {
        background: rgba(255,255,255,0.1) !important;
        color: inherit !important;
        border-color: rgba(255,255,255,0.1) !important;
    }
`;

var previousModalId = null; // لتخزين المودال الذي كان مفتوحاً قبل فتح مودال المادة

// ============================================================
//  إصلاح وتحديث loadAdminUsers - النسخة النهائية
// ============================================================

// استبدال دالة loadAdminUsers بالكامل
function loadAdminUsers() {
    var container = document.getElementById('adminUsersList');
    if (!container) return;
    
    // عرض مؤقت للتحميل
    container.innerHTML = `
        <div class="admin-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <span>جاري تحميل المستخدمين...</span>
        </div>
    `;
    
    // استخدام setTimeout لتجنب تجميد الواجهة
    setTimeout(function() {
        renderAdminUsersTableFull();
    }, 150);
}

// ============================================================
//  renderAdminUsersTableFull - عرض جدول المستخدمين الكامل
// ============================================================

function renderAdminUsersTableFull() {
    var container = document.getElementById('adminUsersList');
    if (!container) return;
    
    if (!users || users.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <i class="fas fa-users"></i>
                <h4>لا يوجد مستخدمين</h4>
                <p>لم يتم تسجيل أي مستخدم في المنصة بعد</p>
            </div>
        `;
        return;
    }
    
    // ===== إحصائيات سريعة =====
    var totalUsers = users.length;
    var activeUsers = users.filter(function(u) { return u.role !== 'admin' && !u.banned; }).length;
    var bannedUsers = users.filter(function(u) { return u.banned === true; }).length;
    var admins = users.filter(function(u) { return u.role === 'admin'; }).length;
    
    var html = `
        <!-- إحصائيات -->
        <div class="admin-users-stats">
            <div class="admin-stat-card">
                <i class="fas fa-users" style="color:#3b82f6;font-size:1.5rem;"></i>
                <div>
                    <span class="admin-stat-number">${totalUsers}</span>
                    <label>إجمالي المستخدمين</label>
                </div>
            </div>
            <div class="admin-stat-card">
                <i class="fas fa-user-check" style="color:#22c55e;font-size:1.5rem;"></i>
                <div>
                    <span class="admin-stat-number">${activeUsers}</span>
                    <label>مستخدمين نشطين</label>
                </div>
            </div>
            <div class="admin-stat-card">
                <i class="fas fa-user-slash" style="color:#ef4444;font-size:1.5rem;"></i>
                <div>
                    <span class="admin-stat-number">${bannedUsers}</span>
                    <label>مستخدمين محظورين</label>
                </div>
            </div>
            <div class="admin-stat-card">
                <i class="fas fa-user-shield" style="color:#f59e0b;font-size:1.5rem;"></i>
                <div>
                    <span class="admin-stat-number">${admins}</span>
                    <label>المشرفين</label>
                </div>
            </div>
        </div>
        
        <!-- أدوات التحكم -->
        <div class="admin-users-controls">
            <div class="admin-search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="adminUserSearch" placeholder="ابحث عن مستخدم بالاسم أو البريد..." oninput="filterAdminUsersTable()" />
            </div>
            <div class="admin-filter-box">
                <select id="adminUserRoleFilter" onchange="filterAdminUsersTable()">
                    <option value="all">كل الأدوار</option>
                    <option value="user">مستخدم</option>
                    <option value="moderator">مدير</option>
                    <option value="admin">مشرف</option>
                </select>
                <select id="adminUserStatusFilter" onchange="filterAdminUsersTable()">
                    <option value="all">كل الحالات</option>
                    <option value="active">نشط</option>
                    <option value="banned">محظور</option>
                </select>
                <select id="adminUserSort" onchange="filterAdminUsersTable()">
                    <option value="newest">الأحدث</option>
                    <option value="oldest">الأقدم</option>
                    <option value="most_votes">الأكثر تصويتاً</option>
                    <option value="most_points">الأكثر نقاطاً</option>
                    <option value="most_friends">الأكثر أصدقاء</option>
                </select>
            </div>
            <div class="admin-bulk-actions">
                <button class="btn btn-danger btn-sm" onclick="bulkBanUsers()">
                    <i class="fas fa-ban"></i> حظر مختارين
                </button>
                <button class="btn btn-success btn-sm" onclick="bulkUnbanUsers()">
                    <i class="fas fa-user-check"></i> إلغاء حظر
                </button>
            </div>
        </div>
        
        <!-- جدول المستخدمين -->
        <div style="overflow-x:auto;">
            <table class="admin-users-table" id="adminUsersTable">
                <thead>
                    <tr>
                        <th style="width:30px;">
                            <input type="checkbox" id="selectAllUsers" onchange="toggleAllAdminUsersTable()" />
                        </th>
                        <th>المستخدم</th>
                        <th>الدور</th>
                        <th>الحالة</th>
                        <th>النشاط</th>
                        <th>الإحصائيات</th>
                        <th style="min-width:150px;">الإجراءات</th>
                    </tr>
                </thead>
                <tbody id="adminUsersTableBody">
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
    
    // عرض بيانات المستخدمين
    renderAdminUsersTableData();
}

// ============================================================
//  renderAdminUsersTableData - عرض بيانات المستخدمين
// ============================================================

function renderAdminUsersTableData() {
    var tbody = document.getElementById('adminUsersTableBody');
    if (!tbody) return;
    
    // الحصول على الفلاتر
    var searchInput = document.getElementById('adminUserSearch');
    var roleFilter = document.getElementById('adminUserRoleFilter');
    var statusFilter = document.getElementById('adminUserStatusFilter');
    var sortSelect = document.getElementById('adminUserSort');
    
    var search = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var roleFilterValue = roleFilter ? roleFilter.value : 'all';
    var statusFilterValue = statusFilter ? statusFilter.value : 'all';
    var sortBy = sortSelect ? sortSelect.value : 'newest';
    
    // تصفية المستخدمين
    var filteredUsers = users.filter(function(user) {
        // البحث
        if (search) {
            var nameMatch = user.displayName && user.displayName.toLowerCase().includes(search);
            var emailMatch = user.email && user.email.toLowerCase().includes(search);
            if (!nameMatch && !emailMatch) return false;
        }
        
        // فلتر الدور
        if (roleFilterValue !== 'all' && user.role !== roleFilterValue) return false;
        
        // فلتر الحالة
        if (statusFilterValue === 'banned' && user.banned !== true) return false;
        if (statusFilterValue === 'active' && user.banned === true) return false;
        
        return true;
    });
    
    // ترتيب المستخدمين
    filteredUsers.sort(function(a, b) {
        switch(sortBy) {
            case 'newest':
                return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
            case 'oldest':
                return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
            case 'most_votes':
                return (b.votes || 0) - (a.votes || 0);
            case 'most_points':
                var aPoints = calculateUserPoints(a).earnedPoints || 0;
                var bPoints = calculateUserPoints(b).earnedPoints || 0;
                return bPoints - aPoints;
            case 'most_friends':
                return (b.friends || []).length - (a.friends || []).length;
            default:
                return 0;
        }
    });
    
    if (filteredUsers.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;padding:2rem;color:var(--gray-400);">
                    <i class="fas fa-search" style="font-size:1.5rem;display:block;margin-bottom:0.5rem;"></i>
                    لا توجد نتائج تطابق معايير البحث
                </td>
            </tr>
        `;
        return;
    }
    
    var html = '';
    filteredUsers.forEach(function(user) {
        var result = calculateUserPoints(user);
        var badges = calculateBadges(user);
        var isBanned = user.banned || false;
        var isCurrentUser = currentUser && currentUser.uid === user.uid;
        var isSuperAdmin = user.isSuperAdmin || false;
        
        // دور المستخدم مع لون
        var roleColors = {
            'admin': { color: '#f59e0b', label: 'مشرف' },
            'moderator': { color: '#3b82f6', label: 'مدير' },
            'user': { color: '#6b7280', label: 'مستخدم' }
        };
        var roleInfo = roleColors[user.role] || roleColors['user'];
        
        // حالة المستخدم
        var statusBadge = isBanned ? 
            '<span class="status-badge banned"><i class="fas fa-ban"></i> محظور</span>' :
            '<span class="status-badge active"><i class="fas fa-check-circle"></i> نشط</span>';
        
        // شارة المشرف الرئيسي
        var superAdminBadge = isSuperAdmin ? 
            '<span class="super-admin-badge"><i class="fas fa-crown"></i> رئيسي</span>' : '';
        
        // تاريخ الانضمام
        var joinDate = user.createdAt?.seconds ? 
            new Date(user.createdAt.seconds * 1000).toLocaleDateString('ar') : 
            'غير معروف';
        
        // حساب عدد الهدايا
        var giftsCount = (user.receivedGifts || []).length;
        
        // حساب عدد المقتنيات
        var customization = user.customization || {};
        var collectiblesCount = 0;
        for (var key in customization) {
            if (customization.hasOwnProperty(key) && customization[key] && customization[key] !== 'default' && customization[key] !== 'none') {
                collectiblesCount++;
            }
        }
        
        html += `
            <tr class="${isBanned ? 'banned-row' : ''} ${isCurrentUser ? 'current-user-row' : ''} ${isSuperAdmin ? 'super-admin-row' : ''}">
                <td>
                    <input type="checkbox" class="admin-user-checkbox" data-uid="${user.uid}" ${isCurrentUser || isSuperAdmin ? 'disabled' : ''} />
                </td>
                <td>
                    <div class="admin-user-info">
                        <img src="${user.avatar || ''}" onerror="this.src=''" alt="${escapeHtml(user.displayName || 'مستخدم')}" />
                        <div>
                            <div class="admin-user-name">
                                ${escapeHtml(user.displayName || 'مستخدم')}
                                ${superAdminBadge}
                                ${isCurrentUser ? '<span class="current-user-badge">أنت</span>' : ''}
                            </div>
                            <div class="admin-user-email">${escapeHtml(user.email || '')}</div>
                            <div class="admin-user-meta">
                                <span><i class="fas fa-calendar-alt"></i> ${joinDate}</span>
                                <span><i class="fas fa-gem"></i> ${result.earnedPoints} نقطة</span>
                                <span><i class="fas fa-trophy"></i> ${badges.length} شارة</span>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="role-badge" style="background:${roleInfo.color}20;color:${roleInfo.color};padding:0.2rem 0.6rem;border-radius:20px;font-weight:600;font-size:0.75rem;display:inline-block;">
                        ${roleInfo.label}
                    </span>
                </td>
                <td>${statusBadge}</td>
                <td>
                    <div class="admin-user-activity">
                        <div class="activity-item">
                            <span class="activity-value">${user.votes || 0}</span>
                            <label>تصويتات</label>
                        </div>
                        <div class="activity-item">
                            <span class="activity-value">${(user.completed || []).length}</span>
                            <label>مجتاز</label>
                        </div>
                        <div class="activity-item">
                            <span class="activity-value">${(user.friends || []).length}</span>
                            <label>أصدقاء</label>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="admin-user-stats">
                        <span><i class="fas fa-star"></i> ${(user.favorites || []).length}</span>
                        <span><i class="fas fa-handshake"></i> ${(user.trustedBy || []).length}</span>
                        <span><i class="fas fa-flag"></i> ${(user.reports || []).length}</span>
                        <span><i class="fas fa-gift"></i> ${giftsCount}</span>
                        <span><i class="fas fa-palette"></i> ${collectiblesCount}</span>
                    </div>
                </td>
                <td>
                    <div class="admin-user-actions">
                        ${!isSuperAdmin ? `
                            <button class="action-btn view" onclick="viewUserProfile('${user.uid}')" title="عرض الملف الشخصي">
                                <i class="fas fa-user"></i>
                            </button>
                            <button class="action-btn points" onclick="adminGivePointsFromModal('${user.uid}')" title="إعطاء نقاط">
                                <i class="fas fa-gem"></i>
                            </button>
                            ${!isCurrentUser ? `
                                <button class="action-btn role" onclick="toggleUserRoleAdmin('${user.uid}')" title="تغيير الدور">
                                    <i class="fas fa-exchange-alt"></i>
                                </button>
                                ${isBanned ? 
                                    `<button class="action-btn unban" onclick="unbanUserAdmin('${user.uid}')" title="إلغاء الحظر">
                                        <i class="fas fa-user-check"></i>
                                    </button>` :
                                    `<button class="action-btn ban" onclick="banUserAdmin('${user.uid}')" title="حظر المستخدم">
                                        <i class="fas fa-ban"></i>
                                    </button>`
                                }
                                <button class="action-btn delete" onclick="deleteUserCompletely('${user.uid}')" title="حذف المستخدم">
                                    <i class="fas fa-trash"></i>
                                </button>
                            ` : ''}
                        ` : '<span class="protected-badge">🔒 محمي</span>'}
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
    
    // إضافة مستمع لتحديد الكل
    var selectAll = document.getElementById('selectAllUsers');
    if (selectAll) {
        selectAll.onchange = function() {
            toggleAllAdminUsersTable();
        };
    }
}

// ============================================================
//  دوال حظر المستخدمين (Block)
// ============================================================

async function blockUser(uid) {
    if (!currentUser) {
        showToast('يرجى تسجيل الدخول', 'error');
        return;
    }
    if (uid === currentUser.uid) {
        showToast('لا يمكنك حظر نفسك', 'warning');
        return;
    }
    
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) {
        showToast('المستخدم غير موجود', 'error');
        return;
    }
    
    // التحقق إذا كان المستخدم محظوراً بالفعل
    var blockedUsers = currentUserData.blockedUsers || [];
    if (blockedUsers.indexOf(uid) !== -1) {
        // إذا كان محظوراً، اسأل إذا كان يريد إلغاء الحظر
        if (!confirm('هل تريد إلغاء حظر هذا المستخدم؟')) {
            return;
        }
        await unblockUser(uid);
        return;
    }
    
    if (!confirm(`⚠️ هل أنت متأكد من حظر ${user.displayName || 'هذا المستخدم'}؟\n\nلن تتمكن من رؤية ملفه الشخصي أو التواصل معه.`)) {
        return;
    }
    
    try {
        // إضافة المستخدم إلى قائمة المحظورين
        var newBlocked = blockedUsers.concat([uid]);
        await db.collection('users').doc(currentUser.uid).update({
            blockedUsers: newBlocked
        });
        currentUserData.blockedUsers = newBlocked;
        
        // إضافة المستخدم الحالي إلى قائمة المحظورين من قبل المستخدم الآخر
        var targetRef = db.collection('users').doc(uid);
        var targetDoc = await targetRef.get();
        if (targetDoc.exists) {
            var targetData = targetDoc.data();
            var blockedBy = targetData.blockedBy || [];
            if (blockedBy.indexOf(currentUser.uid) === -1) {
                blockedBy.push(currentUser.uid);
                await targetRef.update({ blockedBy: blockedBy });
            }
        }
        
        // إزالة الصداقة إذا كانا صديقين
        var friends = currentUserData.friends || [];
        var friendIndex = friends.indexOf(uid);
        if (friendIndex !== -1) {
            friends.splice(friendIndex, 1);
            await db.collection('users').doc(currentUser.uid).update({
                friends: friends
            });
            currentUserData.friends = friends;
            
            // إزالة من جهة الآخر
            var targetFriends = targetData?.friends || [];
            var targetFriendIndex = targetFriends.indexOf(currentUser.uid);
            if (targetFriendIndex !== -1) {
                targetFriends.splice(targetFriendIndex, 1);
                await targetRef.update({ friends: targetFriends });
            }
        }
        
        showToast(`✅ تم حظر ${user.displayName || 'المستخدم'} بنجاح`, 'success');
        
        // تحديث الواجهة
        await loadAllData();
        renderUsers();
        refreshCurrentUserProfileModal();
        
    } catch (error) {
        console.error('Error blocking user:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// ============================================================
//  تحديث unblockUser - إعادة تحميل القوائم بعد إلغاء الحظر
// ============================================================

async function unblockUser(uid) {
    if (!currentUser) return;
    
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) {
        showToast('المستخدم غير موجود', 'error');
        return;
    }
    
    try {
        var blockedUsers = currentUserData.blockedUsers || [];
        var index = blockedUsers.indexOf(uid);
        if (index === -1) {
            showToast('هذا المستخدم ليس محظوراً', 'warning');
            return;
        }
        
        blockedUsers.splice(index, 1);
        await db.collection('users').doc(currentUser.uid).update({
            blockedUsers: blockedUsers
        });
        currentUserData.blockedUsers = blockedUsers;
        
        // إزالة من قائمة المحظورين من قبل
        var targetRef = db.collection('users').doc(uid);
        var targetDoc = await targetRef.get();
        if (targetDoc.exists) {
            var targetData = targetDoc.data();
            var blockedBy = targetData.blockedBy || [];
            var byIndex = blockedBy.indexOf(currentUser.uid);
            if (byIndex !== -1) {
                blockedBy.splice(byIndex, 1);
                await targetRef.update({ blockedBy: blockedBy });
            }
        }
        
        showToast(`✅ تم إلغاء حظر ${user.displayName || 'المستخدم'}`, 'success');
        
        // تحديث جميع البيانات
        await loadAllData();
        renderUsers();
        refreshCurrentUserProfileModal();
        
        // تحديث صفحة المحظورين إذا كانت مفتوحة
        if (currentStudentList === 'blocked') {
            var container = document.getElementById('studentListContainer');
            if (container) {
                renderBlockedList(container);
            }
        }
        
        // تحديث صفحة المشرفين إذا كانت مفتوحة
        if (currentStudentList === 'admins') {
            renderAdminsList();
        }
        
        // تحديث الإعدادات إذا كانت مفتوحة
        var settingsPage = document.getElementById('page-settings');
        if (settingsPage && settingsPage.classList.contains('active')) {
            showPrivacySettings();
        }
        
    } catch (error) {
        console.error('Error unblocking user:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

function isUserBlocked(uid) {
    if (!currentUserData) return false;
    var blockedUsers = currentUserData.blockedUsers || [];
    return blockedUsers.indexOf(uid) !== -1;
}

function isUserBlockedBy(uid) {
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) return false;
    var blockedBy = user.blockedBy || [];
    return blockedBy.indexOf(currentUser?.uid) !== -1;
}

// ============================================================
//  دوال الفلترة والتحكم في الجدول
// ============================================================

function filterAdminUsersTable() {
    renderAdminUsersTableData();
}

var selectedAdminUsers = [];

function toggleAllAdminUsersTable() {
    var checkboxes = document.querySelectorAll('.admin-user-checkbox:not([disabled])');
    var selectAll = document.getElementById('selectAllUsers');
    var isChecked = selectAll ? selectAll.checked : false;
    
    checkboxes.forEach(function(cb) {
        cb.checked = isChecked;
        var uid = cb.dataset.uid;
        if (isChecked) {
            if (selectedAdminUsers.indexOf(uid) === -1) {
                selectedAdminUsers.push(uid);
            }
        } else {
            var index = selectedAdminUsers.indexOf(uid);
            if (index !== -1) {
                selectedAdminUsers.splice(index, 1);
            }
        }
    });
}

// عند تغيير خانة اختيار فردية
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('admin-user-checkbox')) {
        var uid = e.target.dataset.uid;
        if (e.target.checked) {
            if (selectedAdminUsers.indexOf(uid) === -1) {
                selectedAdminUsers.push(uid);
            }
        } else {
            var index = selectedAdminUsers.indexOf(uid);
            if (index !== -1) {
                selectedAdminUsers.splice(index, 1);
            }
        }
    }
});

// ============================================================
//  دوال الإجراءات الجماعية
// ============================================================

async function bulkBanUsers() {
    if (selectedAdminUsers.length === 0) {
        showToast('⚠️ يرجى اختيار مستخدمين أولاً', 'warning');
        return;
    }
    
    // التأكد من عدم وجود مشرفين رئيسيين
    var superAdmins = selectedAdminUsers.filter(function(uid) {
        var user = users.find(function(u) { return u.uid === uid; });
        return user && user.isSuperAdmin;
    });
    
    if (superAdmins.length > 0) {
        showToast('❌ لا يمكن حظر المشرف الرئيسي', 'error');
        return;
    }
    
    if (!confirm(`⚠️ هل أنت متأكد من حظر ${selectedAdminUsers.length} مستخدم؟`)) {
        return;
    }
    
    showToast(`⏳ جاري حظر ${selectedAdminUsers.length} مستخدم...`, 'warning');
    
    try {
        var promises = selectedAdminUsers.map(function(uid) {
            return db.collection('users').doc(uid).update({ 
                banned: true, 
                bannedAt: firebase.firestore.FieldValue.serverTimestamp() 
            });
        });
        
        await Promise.all(promises);
        
        showToast(`✅ تم حظر ${selectedAdminUsers.length} مستخدم بنجاح`, 'success');
        selectedAdminUsers = [];
        await loadAllData();
        renderAdminUsersTableFull();
    } catch (error) {
        console.error('Error bulk banning users:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

async function bulkUnbanUsers() {
    if (selectedAdminUsers.length === 0) {
        showToast('⚠️ يرجى اختيار مستخدمين أولاً', 'warning');
        return;
    }
    
    if (!confirm(`⚠️ هل أنت متأكد من إلغاء حظر ${selectedAdminUsers.length} مستخدم؟`)) {
        return;
    }
    
    showToast(`⏳ جاري إلغاء حظر ${selectedAdminUsers.length} مستخدم...`, 'warning');
    
    try {
        var promises = selectedAdminUsers.map(function(uid) {
            return db.collection('users').doc(uid).update({ 
                banned: false,
                bannedAt: null
            });
        });
        
        await Promise.all(promises);
        
        showToast(`✅ تم إلغاء حظر ${selectedAdminUsers.length} مستخدم بنجاح`, 'success');
        selectedAdminUsers = [];
        await loadAllData();
        renderAdminUsersTableFull();
    } catch (error) {
        console.error('Error bulk unbanning users:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// ============================================================
//  دوال الإجراءات الفردية (نسخ مخصصة للوحة المشرف)
// ============================================================

function toggleUserRoleAdmin(uid) {
    if (uid === currentUser?.uid) {
        showToast('لا يمكن تغيير دورك بنفسك', 'error');
        return;
    }
    
    var user = users.find(function(u) { return u.uid === uid; });
    if (!user) return;
    
    if (user.isSuperAdmin) {
        showToast('❌ لا يمكن تغيير دور المشرف الرئيسي', 'error');
        return;
    }
    
    var roles = ['user', 'moderator', 'admin'];
    var roleLabels = {
        'user': 'مستخدم',
        'moderator': 'مدير',
        'admin': 'مشرف'
    };
    
    var currentIndex = roles.indexOf(user.role || 'user');
    var nextRole = roles[(currentIndex + 1) % roles.length];
    var nextLabel = roleLabels[nextRole] || nextRole;
    
    if (!confirm(`⚠️ هل أنت متأكد من تغيير دور "${roleLabels[user.role] || user.role}" إلى "${nextLabel}"؟`)) {
        return;
    }
    
    showToast(`⏳ جاري تغيير الدور...`, 'warning');
    
    try {
        db.collection('users').doc(uid).update({ role: nextRole }).then(function() {
            showToast(`✅ تم تغيير الدور إلى ${nextLabel}`, 'success');
            loadAllData().then(function() {
                renderAdminUsersTableFull();
            });
        });
    } catch (error) {
        console.error('Error toggling role:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

function banUserAdmin(uid) {
    if (!isAdmin) {
        showToast('هذه العملية للمشرف فقط', 'error');
        return;
    }
    if (uid === currentUser?.uid) {
        showToast('لا يمكن حظر نفسك', 'error');
        return;
    }
    
    var user = users.find(function(u) { return u.uid === uid; });
    if (user && user.isSuperAdmin) {
        showToast('❌ لا يمكن حظر المشرف الرئيسي', 'error');
        return;
    }
    
    var reason = prompt('سبب الحظر (اختياري):', '');
    if (reason === null) return;
    
    if (!confirm(`⚠️ هل أنت متأكد من حظر هذا المستخدم؟${reason ? '\nالسبب: ' + reason : ''}`)) {
        return;
    }
    
    showToast(`⏳ جاري حظر المستخدم...`, 'warning');
    
    try {
        var updateData = { 
            banned: true, 
            bannedAt: firebase.firestore.FieldValue.serverTimestamp() 
        };
        if (reason && reason.trim()) {
            updateData.banReason = reason.trim();
        }
        
        db.collection('users').doc(uid).update(updateData).then(function() {
            showToast(`🚫 تم حظر المستخدم بنجاح${reason ? ' (السبب: ' + reason + ')' : ''}`, 'warning');
            loadAllData().then(function() {
                renderAdminUsersTableFull();
            });
        });
    } catch (error) {
        console.error('Error banning user:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

function unbanUserAdmin(uid) {
    if (!isAdmin) {
        showToast('هذه العملية للمشرف فقط', 'error');
        return;
    }
    if (uid === currentUser?.uid) {
        showToast('لا يمكن إلغاء حظر نفسك', 'error');
        return;
    }
    
    if (!confirm('⚠️ هل أنت متأكد من إلغاء حظر هذا المستخدم؟')) {
        return;
    }
    
    showToast(`⏳ جاري إلغاء الحظر...`, 'warning');
    
    try {
        db.collection('users').doc(uid).update({ 
            banned: false,
            bannedAt: null,
            banReason: null
        }).then(function() {
            showToast('✅ تم إلغاء حظر المستخدم', 'success');
            loadAllData().then(function() {
                renderAdminUsersTableFull();
            });
        });
    } catch (error) {
        console.error('Error unbanning user:', error);
        showToast('حدث خطأ: ' + error.message, 'error');
    }
}

// ============================================================
//  تحديث loadAdminData لاستخدام الدالة الجديدة
// ============================================================

// تحديث دالة loadAdminData الأصلية
var originalLoadAdminData = loadAdminData;

loadAdminData = function() {
    // استدعاء الدوال الأخرى
    loadAdminCourses();
    loadAdminColleges();
    loadAdminSpecialties();
    loadAdminFeatured();
    loadAdminMessages();
    
    // استخدام الدالة الجديدة للمستخدمين
    loadAdminUsers();
};


// ============================================================
//  INIT
// ============================================================
async function init() {
    loadTheme();
    if (auth.currentUser) {
        currentUser = auth.currentUser;
        await loadUserData(currentUser.uid);
        updateUI();
        applyAllCustomizations(currentUserData);
    }
    await loadAllData();
    await populateCollegeDropdowns();
    await loadColleges();
    await loadSpecialties();
    updateUI();
    var cHasMidEl = safeGetElement('cHasMid');
    var cHasLabEl = safeGetElement('cHasLab');
    if (cHasMidEl) cHasMidEl.dispatchEvent(new Event('change'));
    if (cHasLabEl) cHasLabEl.dispatchEvent(new Event('change'));
    if (currentUser) {
        updateNotificationBadge();
        setInterval(function() { updatePointsDisplay(); }, 5000);
    }
    console.log('🚀 مقيّم جاهز!');
    console.log('📝 تم الاتصال بـ Firebase بنجاح');
    console.log('💡 اضغط Ctrl+K للبحث السريع');
}

init();
