import { db, rtdb } from './config.js';
import { APP_CONSTANTS } from '../constants/appConstants.js';
import { updateAppState, getAppState } from '../state/appState.js';
import { showToast } from '../components/ui.js';
import { formatDate, getChallengeTypeName } from '../utils/formatters.js';

// === مستخدمون ===
export async function loadUserData(uid) {
    try {
        const doc = await db.collection('users').doc(uid).get();
        if (doc.exists) {
            const userData = doc.data();
            updateAppState({ userData, isAdmin: userData.isAdmin || false });
            
            if (userData.isAdmin) {
                document.getElementById('admin-menu-item').style.display = 'flex';
            }
            
            updateUIWithUserData(userData);
            await loadAllUserData(uid);
        }
    } catch (error) {
        console.error('خطأ في تحميل بيانات المستخدم:', error);
    }
}

async function loadAllUserData(uid) {
    try {
        await Promise.all([
            loadQuestions(),
            loadFriendsData(uid),
            loadNotifications(uid),
            loadLeaderboardData(),
            loadTournamentsData(),
            loadChallengesData(),
            loadFriendRequests(uid),
            loadShopItems()
        ]);
    } catch (error) {
        console.error('خطأ في تحميل جميع بيانات المستخدم:', error);
    }
}

export async function checkUsernameExists(username) {
    const snapshot = await db.collection('users').where('username', '==', username).get();
    return !snapshot.empty;
}

// === أسئلة ===
export async function loadQuestions() {
    try {
        const snapshot = await db.collection('questions')
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();

        const questions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        updateAppState({ questions });
    } catch (error) {
        console.error('خطأ في تحميل الأسئلة:', error);
    }
}

// === أصدقاء ===
export async function loadFriendsData(userId) {
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();

        if (userData.friends && userData.friends.length > 0) {
            const friendsPromises = userData.friends.map(friendId =>
                db.collection('users').doc(friendId).get()
            );

            const friendsSnapshots = await Promise.all(friendsPromises);
            const friends = friendsSnapshots
                .filter(snap => snap.exists)
                .map(snap => ({
                    id: snap.id,
                    ...snap.data()
                }));
            
            updateAppState({ friends });
            updateFriendsUI(friends);
        } else {
            updateAppState({ friends: [] });
        }
    } catch (error) {
        console.error('خطأ في تحميل الأصدقاء:', error);
    }
}

function updateFriendsUI(friends) {
    const onlineFriendsCount = friends.filter(f => f.isOnline).length;
    const onlineFriendsCountEl = document.getElementById('online-friends-count');
    if (onlineFriendsCountEl) {
        onlineFriendsCountEl.textContent = onlineFriendsCount;
    }

    const onlineFriendsList = document.getElementById('online-friends');
    if (onlineFriendsList) {
        onlineFriendsList.innerHTML = '';
        
        const onlineFriends = friends.filter(f => f.isOnline).slice(0, 5);
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

// === إشعارات ===
export async function loadNotifications(userId) {
    try {
        const snapshot = await db.collection('notifications')
            .where('userId', '==', userId)
            .where('read', '==', false)
            .orderBy('createdAt', 'desc')
            .limit(20)
            .get();

        const notifications = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        updateAppState({ notifications });
        updateNotificationsUI(notifications);
    } catch (error) {
        console.error('خطأ في تحميل التنبيهات:', error);
    }
}

function updateNotificationsUI(notifications) {
    const notificationCount = document.getElementById('notification-count');
    if (notificationCount) {
        notificationCount.textContent = notifications.length;
        notificationCount.style.display = notifications.length > 0 ? 'flex' : 'none';
    }

    const notificationList = document.getElementById('notification-list');
    if (notificationList) {
        notificationList.innerHTML = '';
        
        notifications.forEach(notification => {
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
        tournament: 'chess-king',
        achievement: 'medal',
        system: 'cog'
    };
    return icons[type] || 'bell';
}

// === تصنيف ===
export async function loadLeaderboardData() {
    try {
        const snapshot = await db.collection('users')
            .orderBy('points', 'desc')
            .limit(100)
            .get();

        const leaderboard = snapshot.docs.map((doc, index) => ({
            id: doc.id,
            rank: index + 1,
            ...doc.data()
        }));
        
        updateAppState({ leaderboard });
        
        // تحديث الفوتر
        const totalUsers = document.getElementById('footer-total-users');
        if (totalUsers) {
            totalUsers.textContent = leaderboard.length;
        }
    } catch (error) {
        console.error('خطأ في تحميل التصنيف:', error);
    }
}

// === بطولات ===
export async function loadTournamentsData() {
    try {
        const snapshot = await db.collection('tournaments')
            .where('status', 'in', ['upcoming', 'active'])
            .orderBy('startDate')
            .limit(10)
            .get();

        const tournaments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        updateAppState({ tournaments });
        updateTournamentsUI(tournaments);
    } catch (error) {
        console.error('خطأ في تحميل البطولات:', error);
    }
}

function updateTournamentsUI(tournaments) {
    const tournamentsList = document.getElementById('upcoming-tournaments');
    if (tournamentsList) {
        tournamentsList.innerHTML = '';
        
        tournaments.slice(0, 3).forEach(tournament => {
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

// === تحديات ===
export async function loadChallengesData() {
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
        
        updateAppState({ challenges });
    } catch (error) {
        console.error('خطأ في تحميل التحديات:', error);
    }
}

export async function joinChallenge(challengeId) {
    const { currentUser, userData } = getAppState();
    
    if (!currentUser) {
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
        if (challenge.players?.includes(currentUser.uid)) {
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
            players: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
        });
        
        // إذا كان العدد كافي، ابدأ التحدي
        if (challenge.players?.length + 1 >= challenge.maxPlayers) {
            await challengeRef.update({ status: 'active' });
            showToast('تم', 'تم بدء التحدي!', 'success');
        } else {
            showToast('تم', 'تم الانضمام للتحدي', 'success');
        }
        
        await loadChallengesData();
        
    } catch (error) {
        console.error('خطأ في الانضمام للتحدي:', error);
        showToast('خطأ', 'فشل في الانضمام للتحدي', 'error');
    }
}

export async function createChallenge(type) {
    const { currentUser, userData } = getAppState();
    
    if (!currentUser) {
        showToast('يرجى تسجيل الدخول', 'يجب تسجيل الدخول لإنشاء تحدٍ', 'error');
        return;
    }
    
    try {
        const challengeData = {
            type: type,
            creatorId: currentUser.uid,
            creatorName: userData.name,
            status: 'waiting',
            players: [currentUser.uid],
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

        showToast('تم إنشاء التحدي', 'تم إنشاء التحدي بنجاح، انتظر انضمام اللاعبين', 'success');

    } catch (error) {
        console.error('خطأ في إنشاء التحدي:', error);
        showToast('خطأ في إنشاء التحدي: ' + error.message, 'error');
    }
}

// === طلبات صداقة ===
export async function loadFriendRequests(userId) {
    try {
        const snapshot = await db.collection('friend_requests')
            .where('to', '==', userId)
            .where('status', '==', 'pending')
            .orderBy('createdAt', 'desc')
            .get();
        
        const friendRequests = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        updateAppState({ friendRequests });
        updateFriendRequestsBadge(friendRequests);
    } catch (error) {
        console.error('خطأ في تحميل طلبات الصداقة:', error);
    }
}

function updateFriendRequestsBadge(friendRequests) {
    const badge = document.getElementById('friend-requests-badge');
    if (badge) {
        const count = friendRequests.length;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

export async function addNotification(userId, notification) {
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

// === متجر ===
export async function loadShopItems() {
    try {
        const snapshot = await db.collection('shop_items')
            .orderBy('price')
            .limit(50)
            .get();
        
        const shopItems = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        // إذا لم تكن هناك منتجات، استخدم المنتجات الافتراضية
        if (shopItems.length === 0) {
            shopItems.push(...APP_CONSTANTS.DEFAULT_SHOP_ITEMS);
        }
        
        updateAppState({ shopItems });
    } catch (error) {
        console.error('خطأ في تحميل عناصر المتجر:', error);
        // استخدام المنتجات الافتراضية في حالة الخطأ
        updateAppState({ shopItems: APP_CONSTANTS.DEFAULT_SHOP_ITEMS });
    }
}

// === بيانات أولية ===
export async function loadInitialData() {
    try {
        const usersCount = await db.collection('users').get();
        const questionsCount = await db.collection('questions').get();
        const matchesCount = await db.collection('matches').get();

        document.getElementById('footer-total-users').textContent = usersCount.size;
        document.getElementById('footer-total-questions').textContent = questionsCount.size;
        document.getElementById('footer-total-matches').textContent = matchesCount.size;
        
        document.getElementById('footer-year').textContent = new Date().getFullYear();
    } catch (error) {
        console.error('خطأ في تحميل البيانات الأولية:', error);
    }
}

// === واجهة المستخدم ===
function updateUIWithUserData(user) {
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
    updateXPProgress(user);

    // تحديث الإحصائيات
    updateDashboardStats(user);
}

function updateXPProgress(user) {
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
}

function updateDashboardStats(user) {
    document.getElementById('stat-wins').textContent = user.wins || 0;
    document.getElementById('stat-points').textContent = user.points || 0;
    document.getElementById('stat-matches').textContent = user.matches || 0;
    document.getElementById('stat-rank').textContent = `#${user.rank || 0}`;
}

function getXPForLevel(level) {
    const levelData = APP_CONSTANTS.LEVELS.find(l => l.level === level);
    return levelData ? levelData.xp : level * 100;
}

export { addNotification };