import { checkAuthState } from './firebase/auth.js';
import { setupEventListeners, setupAdditionalEventListeners } from './utils/eventListeners.js';
import { loadInitialData } from './firebase/database.js';
import { showToast } from './components/ui.js';

function initApp() {
    console.log('تهيئة تطبيق Quiz Masters...');
    
    // إخفاء شاشة التحميل بعد 2 ثانية
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 2000);

    // إعداد جميع مستمعات الأحداث
    try {
        setupEventListeners();
        setupAdditionalEventListeners();
        
        // تحميل البيانات الأولية
        loadInitialData();
        
        // التحقق من حالة المصادقة
        checkAuthState();
        
        console.log('تم تهيئة التطبيق بنجاح');
        
    } catch (error) {
        console.error('خطأ في تهيئة التطبيق:', error);
        showToast('خطأ', 'فشل في تهيئة التطبيق', 'error');
    }
}

// عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// تصدير الدوال المطلوبة للاستخدام العام
export { initApp };

// تعيين الدوال على window للاستخدام من HTML
window.startChallenge = (challengeId) => {
    import('./managers/gameManager.js').then(module => {
        module.game.startChallenge(challengeId);
    });
};

window.leaveGame = () => {
    import('./managers/gameManager.js').then(module => {
        module.game.leaveGame();
    });
};

window.loadChallengesPage = () => {
    import('./pages/challenges.js').then(module => {
        module.loadChallengesPage();
    });
};

window.loadTournamentsPage = () => {
    import('./pages/tournaments.js').then(module => {
        module.loadTournamentsPage();
    });
};

window.loadLeaderboardPage = () => {
    import('./pages/leaderboard.js').then(module => {
        module.loadLeaderboardPage();
    });
};

window.loadFriendsPage = () => {
    import('./pages/friends.js').then(module => {
        module.loadFriendsPage();
    });
};

window.loadShopPage = () => {
    import('./pages/shop.js').then(module => {
        module.loadShopPage();
    });
};

window.loadProfilePage = () => {
    import('./pages/profile.js').then(module => {
        module.loadProfilePage();
    });
};

window.loadSettingsPage = () => {
    import('./pages/settings.js').then(module => {
        module.loadSettingsPage();
    });
};

window.loadHelpPage = () => {
    import('./pages/help.js').then(module => {
        module.loadHelpPage();
    });
};