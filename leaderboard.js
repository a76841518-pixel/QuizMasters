import { getAppState } from '../state/appState.js';
import { showErrorPage } from '../components/ui.js';
import { loadLeaderboardData } from '../firebase/database.js';
import { formatPoints } from '../utils/formatters.js';

export async function loadLeaderboardPage() {
    const container = document.getElementById('leaderboard-page');
    if (!container) return;
    
    try {
        container.innerHTML = getLeaderboardPageHTML();
        
        // إضافة مستمعات الأحداث
        setupLeaderboardEventListeners();
        
        // تحميل بيانات التصنيف
        await loadLeaderboardData();
        
        // بعد تحميل البيانات، عرض المحتوى
        renderLeaderboardPage();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة التصنيف:', error);
        showErrorPage(container, 'التصنيف', 'loadLeaderboardPage');
    }
}

function getLeaderboardPageHTML() {
    return `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-trophy"></i>
                التصنيف العالمي
            </h1>
            <div class="header-actions">
                <select class="form-control" id="leaderboard-filter">
                    <option value="global">التصنيف العالمي</option>
                    <option value="friends">الأصدقاء فقط</option>
                    <option value="weekly">الأسبوعي</option>
                    <option value="monthly">الشهري</option>
                </select>
                <button class="btn btn-refresh" id="refresh-leaderboard">
                    <i class="fas fa-sync-alt"></i>
                </button>
            </div>
        </div>
        
        <div class="loading-section">
            <div class="loader-spinner"></div>
            <p>جاري تحميل بيانات التصنيف...</p>
        </div>
    `;
}

function setupLeaderboardEventListeners() {
    document.getElementById('refresh-leaderboard')?.addEventListener('click', async () => {
        await loadLeaderboardData();
        renderLeaderboardPage();
    });
    
    document.getElementById('leaderboard-filter')?.addEventListener('change', filterLeaderboard);
}

function renderLeaderboardPage() {
    const container = document.getElementById('leaderboard-page');
    if (!container) return;
    
    const { leaderboard, currentUser, userData } = getAppState();
    
    // العثور على ترتيب المستخدم الحالي
    const currentUserRank = leaderboard.findIndex(user => 
        user.id === currentUser?.uid
    );
    const userRank = currentUserRank !== -1 ? currentUserRank + 1 : 0;
    const userRankData = currentUserRank !== -1 ? leaderboard[currentUserRank] : null;
    
    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-trophy"></i>
                التصنيف العالمي
            </h1>
            <div class="header-actions">
                <select class="form-control" id="leaderboard-filter">
                    <option value="global">التصنيف العالمي</option>
                    <option value="friends">الأصدقاء فقط</option>
                    <option value="weekly">الأسبوعي</option>
                    <option value="monthly">الشهري</option>
                </select>
                <button class="btn btn-refresh" id="refresh-leaderboard">
                    <i class="fas fa-sync-alt"></i>
                </button>
            </div>
        </div>
        
        <div class="leaderboard-container">
            ${renderTop3Players(leaderboard)}
            
            <div class="leaderboard-table-container">
                <div class="leaderboard-filters">
                    <div class="filter-group">
                        <button class="filter-btn active" data-filter="all">الكل</button>
                        <button class="filter-btn" data-filter="online">المتصلون الآن</button>
                        <button class="filter-btn" data-filter="friends">الأصدقاء</button>
                    </div>
                </div>
                
                <div class="leaderboard-table">
                    <table>
                        <thead>
                            <tr>
                                <th>الترتيب</th>
                                <th>المستخدم</th>
                                <th>المستوى</th>
                                <th>النقاط</th>
                                <th>الفوز</th>
                                <th>معدل الفوز</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody id="leaderboard-table-body">
                            ${renderLeaderboardTable(leaderboard, currentUser?.uid)}
                        </tbody>
                    </table>
                </div>
                
                ${userRankData ? renderUserPosition(userRankData, userRank) : ''}
            </div>
            
            ${renderLeaderboardStats(leaderboard)}
        </div>
    `;
    
    // إعادة إضافة مستمعات الأحداث
    setupLeaderboardEventListeners();
    setupLeaderboardFilters();
}

function renderTop3Players(leaderboard) {
    if (leaderboard.length < 3) return '';
    
    const [first, second, third] = leaderboard;
    
    return `
        <div class="leaderboard-top3">
            <div class="podium second">
                <div class="podium-rank">${second.rank}</div>
                <div class="podium-avatar">
                    ${second.name?.charAt(0) || '?'}
                </div>
                <div class="podium-info">
                    <div class="podium-name">${second.name || 'لاعب'}</div>
                    <div class="podium-points">${formatPoints(second.points || 0)}</div>
                </div>
                <div class="podium-badge">
                    <i class="fas fa-medal"></i>
                </div>
            </div>
            
            <div class="podium first">
                <div class="podium-rank">${first.rank}</div>
                <div class="podium-avatar">
                    ${first.name?.charAt(0) || '?'}
                </div>
                <div class="podium-info">
                    <div class="podium-name">${first.name || 'لاعب'}</div>
                    <div class="podium-points">${formatPoints(first.points || 0)}</div>
                </div>
                <div class="podium-badge">
                    <i class="fas fa-crown"></i>
                </div>
            </div>
            
            <div class="podium third">
                <div class="podium-rank">${third.rank}</div>
                <div class="podium-avatar">
                    ${third.name?.charAt(0) || '?'}
                </div>
                <div class="podium-info">
                    <div class="podium-name">${third.name || 'لاعب'}</div>
                    <div class="podium-points">${formatPoints(third.points || 0)}</div>
                </div>
                <div class="podium-badge">
                    <i class="fas fa-medal"></i>
                </div>
            </div>
        </div>
    `;
}

function renderLeaderboardTable(leaderboard, currentUserId) {
    return leaderboard.slice(0, 50).map(user => `
        <tr class="${user.id === currentUserId ? 'current-user' : ''}">
            <td class="rank">
                <div class="rank-number">#${user.rank}</div>
                ${user.rank <= 3 ? `<div class="rank-badge top-${user.rank}">${user.rank}</div>` : ''}
            </td>
            <td class="user">
                <div class="user-info">
                    <div class="user-avatar">${user.name?.charAt(0) || '?'}</div>
                    <div class="user-details">
                        <div class="user-name">${user.name || 'لاعب'}</div>
                        <div class="user-username">@${user.username || 'مجهول'}</div>
                    </div>
                </div>
            </td>
            <td class="level">
                <div class="level-badge">${user.level || 1}</div>
            </td>
            <td class="points">${formatPoints(user.points || 0)}</td>
            <td class="wins">${user.wins || 0}</td>
            <td class="win-rate">
                ${user.matches && user.wins ? Math.round((user.wins / user.matches) * 100) : 0}%
            </td>
            <td class="status">
                <span class="status-badge ${user.isOnline ? 'online' : 'offline'}">
                    ${user.isOnline ? 'متصل' : 'غير متصل'}
                </span>
            </td>
        </tr>
    `).join('');
}

function renderUserPosition(userData, rank) {
    return `
        <div class="your-position">
            <div class="position-rank">#${rank}</div>
            <div class="position-user">
                <div class="user-avatar-small">${userData.name?.charAt(0) || 'أنت'}</div>
                <div class="user-info">
                    <div class="user-name">${userData.name || 'أنت'}</div>
                    <div class="user-details">
                        ${formatPoints(userData.points || 0)} نقطة | المستوى ${userData.level || 1}
                    </div>
                </div>
            </div>
            <div class="position-change">
                <i class="fas fa-chart-line"></i>
                <span>مركزك في التصنيف</span>
            </div>
        </div>
    `;
}

function renderLeaderboardStats(leaderboard) {
    if (leaderboard.length === 0) return '';
    
    const totalPoints = leaderboard.reduce((sum, user) => sum + (user.points || 0), 0);
    const avgPoints = Math.round(totalPoints / leaderboard.length);
    const topPlayer = leaderboard[0];
    const countriesCount = calculateUniqueCountries(leaderboard);
    
    return `
        <div class="leaderboard-stats">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="stat-info">
                    <div class="stat-value">${leaderboard.length}</div>
                    <div class="stat-label">لاعب في التصنيف</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-calculator"></i>
                </div>
                <div class="stat-info">
                    <div class="stat-value">${formatPoints(avgPoints)}</div>
                    <div class="stat-label">متوسط النقاط</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="stat-info">
                    <div class="stat-value">${formatPoints(topPlayer.points || 0)}</div>
                    <div class="stat-label">أعلى نقاط</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-globe-asia"></i>
                </div>
                <div class="stat-info">
                    <div class="stat-value">${countriesCount}</div>
                    <div class="stat-label">دولة مختلفة</div>
                </div>
            </div>
        </div>
    `;
}

function setupLeaderboardFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterLeaderboardByType(this.dataset.filter);
        });
    });
}

function filterLeaderboard() {
    const filterValue = document.getElementById('leaderboard-filter').value;
    // هنا يمكن إضافة منطق التصفية حسب النوع المحدد
    renderLeaderboardPage();
}

function filterLeaderboardByType(type) {
    // تصفية القائمة حسب النوع
    const { leaderboard, friends, currentUser } = getAppState();
    
    let filtered = [...leaderboard];
    
    switch(type) {
        case 'online':
            filtered = filtered.filter(user => user.isOnline);
            break;
        case 'friends':
            const friendIds = friends.map(f => f.id);
            filtered = filtered.filter(user => friendIds.includes(user.id));
            break;
    }
    
    // تحديث الجدول مع البيانات المصفاة
    const tableBody = document.getElementById('leaderboard-table-body');
    if (tableBody) {
        tableBody.innerHTML = renderLeaderboardTable(filtered, currentUser?.uid);
    }
}

function calculateUniqueCountries(users) {
    // هذه دالة افتراضية، في التطبيق الحقيقي ستجلب البيانات من قاعدة البيانات
    const countries = new Set();
    users.forEach(user => {
        if (user.country) {
            countries.add(user.country);
        }
    });
    return countries.size || 15; // قيمة افتراضية
}