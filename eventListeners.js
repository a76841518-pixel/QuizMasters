import { toggleAuthMode, handleAuthSubmit, handleGuestLogin, handleLogout } from '../firebase/auth.js';
import { navigateTo } from './navigation.js';
import { showToast } from '../components/ui.js';
import { loadUserData } from '../firebase/database.js';
import { getAppState } from '../state/appState.js';

export function setupEventListeners() {
    // المصادقة
    document.getElementById('auth-switch-link')?.addEventListener('click', toggleAuthMode);
    document.getElementById('auth-form')?.addEventListener('submit', handleAuthSubmit);
    document.getElementById('guest-login')?.addEventListener('click', handleGuestLogin);
    document.getElementById('logout-btn')?.addEventListener('click', handleLogout);

    // التنقل
    document.getElementById('menu-toggle')?.addEventListener('click', toggleSidebar);
    document.getElementById('close-sidebar')?.addEventListener('click', closeSidebar);

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
    document.getElementById('user-menu-toggle')?.addEventListener('click', toggleUserDropdown);

    // التنبيهات
    document.getElementById('notification-bell')?.addEventListener('click', toggleNotifications);

    // تحديث لوحة التحكم
    document.getElementById('refresh-dashboard')?.addEventListener('click', refreshDashboard);
    document.getElementById('refresh-dashboard-btn')?.addEventListener('click', refreshDashboard);

    // تحديات سريعة
    document.getElementById('quick-challenge')?.addEventListener('click', () => {
        import('./pages/challenges.js').then(module => {
            module.createChallenge('individual');
        });
    });

    // إغلاق القوائم والنوافذ عند النقر خارجها
    document.addEventListener('click', closeDropdownsOnClickOutside);

    // تحديث السنة في الفوتر
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

export function setupAdditionalEventListeners() {
    // تحديث التحديات
    document.addEventListener('click', (e) => {
        if (e.target.closest('#refresh-challenges')) {
            import('./pages/challenges.js').then(module => {
                module.loadChallengesPage();
            });
        }
        
        // الانضمام للتحديات
        if (e.target.closest('.join-challenge-btn')) {
            const challengeId = e.target.closest('.join-challenge-btn').dataset.id;
            import('../firebase/database.js').then(module => {
                module.joinChallenge(challengeId);
            });
        }
        
        // الانضمام للبطولات
        if (e.target.closest('.join-tournament')) {
            const tournamentId = e.target.closest('.join-tournament').dataset.id;
            import('./pages/tournaments.js').then(module => {
                module.joinTournament(tournamentId);
            });
        }
    });
    
    // البحث عن الأصدقاء
    const friendSearch = document.getElementById('friend-search');
    if (friendSearch) {
        let searchTimeout;
        friendSearch.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                import('./pages/friends.js').then(module => {
                    if (module.searchFriends) {
                        module.searchFriends();
                    }
                });
            }, 500);
        });
    }
}

export function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('show');
    document.getElementById('main-content').classList.toggle('sidebar-open');
}

export function closeSidebar() {
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

function closeDropdownsOnClickOutside(e) {
    if (!e.target.closest('.user-menu')) {
        document.getElementById('user-dropdown')?.classList.remove('show');
    }
    if (!e.target.closest('.notification-bell')) {
        document.getElementById('notification-dropdown')?.classList.remove('show');
    }
    if (!e.target.closest('.modal-content') && e.target.closest('.modal')) {
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
        });
    }
}

async function refreshDashboard() {
    const { currentUser } = getAppState();
    if (currentUser) {
        await loadUserData(currentUser.uid);
        showToast('تم التحديث', 'تم تحديث بيانات لوحة التحكم', 'success');
    }
}