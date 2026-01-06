import { getAppState } from '../state/appState.js';
import { db } from '../firebase/config.js';
import { showToast, createModal, showErrorPage } from '../components/ui.js';
import { addNotification, loadFriendRequests } from '../firebase/database.js';
import { formatDate } from '../utils/formatters.js';

export async function loadFriendsPage() {
    const container = document.getElementById('friends-page');
    if (!container) return;
    
    try {
        container.innerHTML = getFriendsPageHTML();
        
        // إضافة مستمعات الأحداث
        setupFriendsEventListeners();
        
        // تحميل بيانات الأصدقاء
        await loadFriendsData();
        
        // بعد تحميل البيانات، عرض المحتوى
        renderFriendsPage();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة الأصدقاء:', error);
        showErrorPage(container, 'الأصدقاء', 'loadFriendsPage');
    }
}

function getFriendsPageHTML() {
    return `
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
        
        <div class="loading-section">
            <div class="loader-spinner"></div>
            <p>جاري تحميل قائمة الأصدقاء...</p>
        </div>
    `;
}

function setupFriendsEventListeners() {
    document.getElementById('add-friend-btn')?.addEventListener('click', showAddFriendModal);
    document.getElementById('refresh-friends')?.addEventListener('click', async () => {
        const { currentUser } = getAppState();
        if (currentUser) {
            await import('../firebase/database.js').then(module => {
                module.loadFriendsData(currentUser.uid);
            });
            renderFriendsPage();
        }
    });
}

async function loadFriendsData() {
    const { currentUser } = getAppState();
    if (!currentUser) return;
    
    try {
        // تحميل بيانات الأصدقاء موجودة بالفعل في loadUserData
        // نحتاج فقط لتحديث واجهة المستخدم
    } catch (error) {
        console.error('خطأ في تحميل بيانات الأصدقاء:', error);
        throw error;
    }
}

function renderFriendsPage() {
    const container = document.getElementById('friends-page');
    if (!container) return;
    
    const { friends } = getAppState();
    
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
                    ${renderAllFriends(friends)}
                </div>
                
                <div class="tab-content" id="online-friends-tab">
                    ${renderOnlineFriends(friends)}
                </div>
                
                <div class="tab-content" id="pending-requests-tab">
                    ${renderPendingRequests()}
                </div>
            </div>
        </div>
    `;
    
    // إعادة إضافة مستمعات الأحداث
    setupFriendsEventListeners();
    setupFriendsTabs();
    setupFriendsActions();
}

function renderAllFriends(friends) {
    if (friends.length === 0) {
        return `
            <div class="empty-state">
                <i class="fas fa-user-friends"></i>
                <p>لا يوجد أصدقاء في قائمتك بعد</p>
                <p>أضف أصدقاء لتتمكن من تحدييهم واللعب معهم</p>
                <button class="btn btn-primary" id="find-friends-btn">ابحث عن أصدقاء</button>
            </div>
        `;
    }
    
    return `
        <div class="friends-list">
            ${friends.map(friend => `
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
                        <button class="action-btn challenge" data-friend-id="${friend.id}">
                            <i class="fas fa-gamepad"></i> تحدى
                        </button>
                        <button class="action-btn remove" data-friend-id="${friend.id}">
                            <i class="fas fa-user-minus"></i> إزالة
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="friends-stats">
            <div class="stat">
                <div class="stat-value">${friends.length}</div>
                <div class="stat-label">إجمالي الأصدقاء</div>
            </div>
            <div class="stat">
                <div class="stat-value">${friends.filter(f => f.isOnline).length}</div>
                <div class="stat-label">متصلون الآن</div>
            </div>
            <div class="stat">
                <div class="stat-value">
                    ${friends.length > 0 ? 
                        Math.round(friends.reduce((sum, f) => sum + (f.level || 1), 0) / friends.length) : 0
                    }
                </div>
                <div class="stat-label">متوسط المستوى</div>
            </div>
        </div>
    `;
}

function renderOnlineFriends(friends) {
    const onlineFriends = friends.filter(f => f.isOnline);
    
    if (onlineFriends.length === 0) {
        return `
            <div class="empty-state">
                <i class="fas fa-user-clock"></i>
                <p>لا يوجد أصدقاء متصلين حالياً</p>
            </div>
        `;
    }
    
    return `
        <div class="friends-list">
            ${onlineFriends.map(friend => `
                <div class="friend-item online">
                    <div class="friend-avatar online">
                        ${friend.name?.charAt(0) || '?'}
                    </div>
                    <div class="friend-info">
                        <div class="friend-name">${friend.name || 'مستخدم'}</div>
                        <div class="friend-details">
                            <span class="friend-level">المستوى ${friend.level || 1}</span>
                            <span class="friend-status">
                                <i class="fas fa-circle"></i> متصل الآن
                            </span>
                        </div>
                    </div>
                    <div class="friend-actions">
                        <button class="action-btn challenge" data-friend-id="${friend.id}">
                            <i class="fas fa-gamepad"></i> تحدى
                        </button>
                        <button class="action-btn message" data-friend-id="${friend.id}">
                            <i class="fas fa-comment"></i> رسالة
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="online-stats">
            <p>${onlineFriends.length} صديق متصل حالياً</p>
        </div>
    `;
}

function renderPendingRequests() {
    const { friendRequests } = getAppState();
    
    if (friendRequests.length === 0) {
        return `
            <div class="empty-state">
                <i class="fas fa-user-clock"></i>
                <p>لا توجد طلبات صداقة معلقة</p>
            </div>
        `;
    }
    
    return `
        <div class="requests-list">
            ${friendRequests.map(request => `
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
                        <button class="btn btn-success btn-sm" data-request-id="${request.id}" data-friend-id="${request.from}">
                            <i class="fas fa-check"></i> قبول
                        </button>
                        <button class="btn btn-danger btn-sm" data-request-id="${request.id}">
                            <i class="fas fa-times"></i> رفض
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function setupFriendsTabs() {
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

function setupFriendsActions() {
    // تحدى الأصدقاء
    document.querySelectorAll('.action-btn.challenge').forEach(btn => {
        btn.addEventListener('click', function() {
            const friendId = this.dataset.friendId;
            challengeFriend(friendId);
        });
    });
    
    // إزالة الأصدقاء
    document.querySelectorAll('.action-btn.remove').forEach(btn => {
        btn.addEventListener('click', async function() {
            const friendId = this.dataset.friendId;
            const confirmed = await import('../components/ui.js').then(module => 
                module.confirmDialog('إزالة صديق', 'هل أنت متأكد من إزالة هذا الصديق؟')
            );
            
            if (confirmed) {
                await removeFriend(friendId);
            }
        });
    });
    
    // قبول طلبات الصداقة
    document.querySelectorAll('.btn-success[data-request-id]').forEach(btn => {
        btn.addEventListener('click', async function() {
            const requestId = this.dataset.requestId;
            const friendId = this.dataset.friendId;
            await acceptFriendRequest(requestId, friendId);
        });
    });
    
    // رفض طلبات الصداقة
    document.querySelectorAll('.btn-danger[data-request-id]').forEach(btn => {
        btn.addEventListener('click', async function() {
            const requestId = this.dataset.requestId;
            await rejectFriendRequest(requestId);
        });
    });
    
    // بحث عن أصدقاء
    document.getElementById('find-friends-btn')?.addEventListener('click', showAddFriendModal);
}

function showAddFriendModal() {
    const modal = createModal('إضافة صديق جديد', `
        <div class="add-friend-modal">
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
    `, [
        { text: 'إغلاق', class: 'btn-secondary', action: 'close' }
    ]);
    
    modal.show();
    
    // البحث أثناء الكتابة
    const searchInput = modal.element.querySelector('#friend-search');
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchFriends(this.value, modal.element.querySelector('#search-results'));
        }, 500);
    });
    
    // تحميل الاقتراحات
    loadFriendSuggestions(modal.element.querySelector('#suggestions-list'));
}

async function searchFriends(searchTerm, resultsContainer) {
    if (!searchTerm.trim()) {
        resultsContainer.innerHTML = '';
        return;
    }
    
    try {
        const { friends, currentUser } = getAppState();
        
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
            if (!allUsers.has(doc.id) && doc.id !== currentUser?.uid) {
                allUsers.set(doc.id, { id: doc.id, ...doc.data() });
            }
        });
        
        const results = Array.from(allUsers.values());
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>لا توجد نتائج لـ "${searchTerm}"</p>
                </div>
            `;
            return;
        }
        
        resultsContainer.innerHTML = results.map(user => {
            const isAlreadyFriend = friends.some(f => f.id === user.id);
            
            return `
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
                        ${isAlreadyFriend ? `
                            <button class="btn btn-outline btn-sm" disabled>
                                <i class="fas fa-check"></i> صديق
                            </button>
                        ` : `
                            <button class="btn btn-primary btn-sm" data-user-id="${user.id}">
                                <i class="fas fa-user-plus"></i> أضف صديقاً
                            </button>
                        `}
                    </div>
                </div>
            `;
        }).join('');
        
        // إضافة مستمعات الأحداث لأزرار الإضافة
        resultsContainer.querySelectorAll('.btn-primary[data-user-id]').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = this.dataset.userId;
                sendFriendRequest(userId);
            });
        });
        
    } catch (error) {
        console.error('خطأ في البحث عن أصدقاء:', error);
        resultsContainer.innerHTML = `
            <div class="error-results">
                <i class="fas fa-exclamation-circle"></i>
                <p>حدث خطأ أثناء البحث</p>
            </div>
        `;
    }
}

async function loadFriendSuggestions(suggestionsContainer) {
    try {
        const { currentUser } = getAppState();
        if (!currentUser) return;
        
        // جلب اقتراحات الأصدقاء (لاعبين غير أصدقاء)
        const usersSnapshot = await db.collection('users')
            .where('isOnline', '==', true)
            .limit(10)
            .get();
        
        const { friends } = getAppState();
        const friendIds = friends.map(f => f.id);
        
        const suggestions = usersSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(user => user.id !== currentUser.uid && !friendIds.includes(user.id))
            .slice(0, 5);
        
        if (suggestions.length === 0) {
            suggestionsContainer.innerHTML = `
                <div class="empty-suggestions">
                    <i class="fas fa-user-friends"></i>
                    <p>استخدم مربع البحث للعثور على أصدقاء</p>
                </div>
            `;
            return;
        }
        
        suggestionsContainer.innerHTML = suggestions.map(user => `
            <div class="suggestion-item">
                <div class="suggestion-avatar">
                    ${user.name?.charAt(0) || '?'}
                </div>
                <div class="suggestion-info">
                    <div class="suggestion-name">${user.name || 'مستخدم'}</div>
                    <div class="suggestion-details">
                        <span>المستوى ${user.level || 1}</span>
                        <span class="online-status">متصل الآن</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-sm" data-user-id="${user.id}">
                    <i class="fas fa-user-plus"></i>
                </button>
            </div>
        `).join('');
        
        // إضافة مستمعات الأحداث للأزرار
        suggestionsContainer.querySelectorAll('.btn-primary[data-user-id]').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = this.dataset.userId;
                sendFriendRequest(userId);
            });
        });
        
    } catch (error) {
        console.error('خطأ في تحميل اقتراحات الأصدقاء:', error);
    }
}

async function sendFriendRequest(friendId) {
    const { currentUser, userData } = getAppState();
    
    if (!currentUser) return;
    
    try {
        // التحقق إذا كان هناك طلب صداقة مسبق
        const existingRequest = await db.collection('friend_requests')
            .where('from', '==', currentUser.uid)
            .where('to', '==', friendId)
            .where('status', '==', 'pending')
            .get();
        
        if (!existingRequest.empty) {
            showToast('معلومات', 'تم إرسال طلب الصداقة مسبقاً', 'info');
            return;
        }
        
        // إرسال طلب الصداقة
        await db.collection('friend_requests').add({
            from: currentUser.uid,
            fromName: userData.name,
            to: friendId,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إرسال إشعار للمستخدم
        await addNotification(friendId, {
            type: 'friend_request',
            title: 'طلب صداقة جديد',
            message: `${userData.name} يريد إضافتك كصديق`,
            data: { from: currentUser.uid }
        });
        
        showToast('تم', 'تم إرسال طلب الصداقة', 'success');
        
        // إغلاق جميع النوافذ المنبثقة
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
        
    } catch (error) {
        console.error('خطأ في إرسال طلب الصداقة:', error);
        showToast('خطأ', 'فشل في إرسال طلب الصداقة', 'error');
    }
}

async function acceptFriendRequest(requestId, friendId) {
    const { currentUser, userData } = getAppState();
    
    if (!currentUser) return;
    
    try {
        // تحديث حالة طلب الصداقة
        await db.collection('friend_requests').doc(requestId).update({
            status: 'accepted',
            respondedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إضافة الصديق لكلا الطرفين
        const batch = db.batch();
        
        // إضافة للمستخدم الحالي
        const currentUserRef = db.collection('users').doc(currentUser.uid);
        batch.update(currentUserRef, {
            friends: firebase.firestore.FieldValue.arrayUnion(friendId),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إضافة للصديق
        const friendRef = db.collection('users').doc(friendId);
        batch.update(friendRef, {
            friends: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        await batch.commit();
        
        // إرسال إشعار للصديق
        await addNotification(friendId, {
            type: 'friend_request_accepted',
            title: 'تم قبول طلب الصداقة',
            message: `${userData.name} قبل طلب صداقتك`,
            data: { friendId: currentUser.uid }
        });
        
        showToast('تم', 'تم قبول طلب الصداقة', 'success');
        
        // تحديث البيانات
        await loadFriendRequests(currentUser.uid);
        await import('../firebase/database.js').then(module => {
            module.loadFriendsData(currentUser.uid);
        });
        
        // إعادة عرض الصفحة
        renderFriendsPage();
        
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
        
        const { currentUser } = getAppState();
        if (currentUser) {
            await loadFriendRequests(currentUser.uid);
            renderFriendsPage();
        }
        
    } catch (error) {
        console.error('خطأ في رفض طلب الصداقة:', error);
        showToast('خطأ', 'فشل في رفض طلب الصداقة', 'error');
    }
}

async function removeFriend(friendId) {
    const { currentUser } = getAppState();
    
    if (!currentUser) return;
    
    try {
        const batch = db.batch();
        
        // إزالة من قائمة أصدقاء المستخدم الحالي
        const currentUserRef = db.collection('users').doc(currentUser.uid);
        batch.update(currentUserRef, {
            friends: firebase.firestore.FieldValue.arrayRemove(friendId),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إزالة من قائمة أصدقاء الصديق
        const friendRef = db.collection('users').doc(friendId);
        batch.update(friendRef, {
            friends: firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        await batch.commit();
        
        showToast('تم', 'تم إزالة الصديق', 'success');
        
        // تحديث البيانات
        await import('../firebase/database.js').then(module => {
            module.loadFriendsData(currentUser.uid);
        });
        
        // إعادة عرض الصفحة
        renderFriendsPage();
        
    } catch (error) {
        console.error('خطأ في إزالة الصديق:', error);
        showToast('خطأ', 'فشل في إزالة الصديق', 'error');
    }
}

async function challengeFriend(friendId) {
    const { currentUser, userData } = getAppState();
    
    if (!currentUser) return;
    
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
            creatorId: currentUser.uid,
            creatorName: userData.name,
            opponentId: friendId,
            opponentName: friendData.name,
            status: 'waiting',
            players: [currentUser.uid, friendId],
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
            message: `${userData.name} يدعوك لتحدي`,
            data: { challengeId: challengeRef.id }
        });
        
        showToast('تم', 'تم إرسال التحدي للصديق', 'success');
        
    } catch (error) {
        console.error('خطأ في تحدى الصديق:', error);
        showToast('خطأ', 'فشل في إرسال التحدي', 'error');
    }
}

// تصدير الدوال المطلوبة
export { searchFriends, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, removeFriend, challengeFriend };