import { getAppState, updateAppState } from '../state/appState.js';
import { loadPageContent } from './pageLoader.js';
import { closeSidebar } from './eventListeners.js';

export function navigateTo(page) {
    console.log('التنقل إلى:', page);
    
    const { currentPage } = getAppState();
    if (currentPage === page) return;
    
    // تحديث الصفحة النشطة
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    
    // إظهار الصفحة المطلوبة
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // تحديث عنصر القائمة النشط
    const menuItem = document.querySelector(`.menu-item[data-page="${page}"]`);
    if (menuItem) {
        menuItem.classList.add('active');
    }
    
    // تحديث حالة التطبيق
    updateAppState({ currentPage: page });
    
    // إغلاق القائمة الجانبية على الأجهزة المحمولة
    if (window.innerWidth < 992) {
        closeSidebar();
    }
    
    // تحميل بيانات الصفحة تلقائياً
    loadPageContent(page);
}

export function goBack() {
    const { currentPage } = getAppState();
    const pages = ['dashboard', 'challenges', 'tournaments', 'leaderboard', 'friends', 'shop', 'profile', 'settings', 'admin', 'help'];
    const currentIndex = pages.indexOf(currentPage);
    
    if (currentIndex > 0) {
        navigateTo(pages[currentIndex - 1]);
    }
}

export function goHome() {
    navigateTo('dashboard');
}

export function reloadCurrentPage() {
    const { currentPage } = getAppState();
    navigateTo(currentPage);
}