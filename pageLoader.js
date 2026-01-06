import { getAppState } from '../state/appState.js';

export async function loadPageContent(page) {
    console.log('تحميل محتوى الصفحة:', page);
    
    try {
        switch (page) {
            case 'dashboard':
                // لوحة التحكم مُحملة بالفعل
                break;
                
            case 'challenges':
                const challengesModule = await import('../pages/challenges.js');
                await challengesModule.loadChallengesPage();
                break;
                
            case 'tournaments':
                const tournamentsModule = await import('../pages/tournaments.js');
                await tournamentsModule.loadTournamentsPage();
                break;
                
            case 'leaderboard':
                const leaderboardModule = await import('../pages/leaderboard.js');
                await leaderboardModule.loadLeaderboardPage();
                break;
                
            case 'friends':
                const friendsModule = await import('../pages/friends.js');
                await friendsModule.loadFriendsPage();
                break;
                
            case 'shop':
                const shopModule = await import('../pages/shop.js');
                await shopModule.loadShopPage();
                break;
                
            case 'profile':
                const profileModule = await import('../pages/profile.js');
                await profileModule.loadProfilePage();
                break;
                
            case 'settings':
                const settingsModule = await import('../pages/settings.js');
                await settingsModule.loadSettingsPage();
                break;
                
            case 'admin':
                const { isAdmin } = getAppState();
                if (isAdmin) {
                    const adminModule = await import('../managers/adminPanel.js');
                    await adminModule.loadAdminData();
                } else {
                    import('../utils/navigation.js').then(module => {
                        module.navigateTo('dashboard');
                    });
                    import('../components/ui.js').then(module => {
                        module.showToast('غير مصرح', 'ليس لديك صلاحية الوصول', 'error');
                    });
                }
                break;
                
            case 'help':
                const helpModule = await import('../pages/help.js');
                helpModule.loadHelpPage();
                break;
        }
    } catch (error) {
        console.error(`خطأ في تحميل صفحة ${page}:`, error);
        import('../components/ui.js').then(module => {
            module.showToast('خطأ', `فشل في تحميل صفحة ${page}`, 'error');
        });
    }
}