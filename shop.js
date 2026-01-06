import { getAppState } from '../state/appState.js';
import { showToast, showErrorPage } from '../components/ui.js';
import { formatPoints } from '../utils/formatters.js';

export async function loadShopPage() {
    const container = document.getElementById('shop-page');
    if (!container) return;
    
    try {
        container.innerHTML = getShopPageHTML();
        
        // إضافة مستمعات الأحداث
        setupShopEventListeners();
        
        // تحميل بيانات المتجر
        await loadShopItems();
        
        // بعد تحميل البيانات، عرض المحتوى
        renderShopPage();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة المتجر:', error);
        showErrorPage(container, 'المتجر', 'loadShopPage');
    }
}

function getShopPageHTML() {
    const { userData } = getAppState();
    
    return `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-shopping-cart"></i>
                متجر اللعبة
            </h1>
            <div class="header-actions">
                <div class="user-coins">
                    <i class="fas fa-coins"></i>
                    <span id="user-coins">${userData?.points || 0}</span>
                    <span class="coins-label">نقطة</span>
                </div>
            </div>
        </div>
        
        <div class="loading-section">
            <div class="loader-spinner"></div>
            <p>جاري تحميل المنتجات...</p>
        </div>
    `;
}

function setupShopEventListeners() {
    // سيتم إضافتها بعد تحميل البيانات
}

async function loadShopItems() {
    // البيانات محملة بالفعل في loadUserData
    // نحتاج فقط لتحديث واجهة المستخدم
}

function renderShopPage() {
    const container = document.getElementById('shop-page');
    if (!container) return;
    
    const { shopItems, userData } = getAppState();
    
    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-shopping-cart"></i>
                متجر اللعبة
            </h1>
            <div class="header-actions">
                <div class="user-coins">
                    <i class="fas fa-coins"></i>
                    <span id="user-coins">${userData?.points || 0}</span>
                    <span class="coins-label">نقطة</span>
                </div>
            </div>
        </div>
        
        <div class="shop-container">
            <div class="shop-categories">
                <button class="category-btn active" data-category="all">جميع المنتجات</button>
                <button class="category-btn" data-category="powerups">معززات اللعب</button>
                <button class="category-btn" data-category="appearance">المظهر</button>
                <button class="category-btn" data-category="boosters">معززات الخبرة</button>
                <button class="category-btn" data-category="special">مميزات خاصة</button>
            </div>
            
            <div class="shop-items-grid" id="shop-items">
                ${renderShopItemsGrid(shopItems, userData?.points || 0)}
            </div>
        </div>
    `;
    
    // إعادة إضافة مستمعات الأحداث
    setupShopEventListeners();
    setupShopCategories();
    setupShopItems();
}

function renderShopItemsGrid(shopItems, userPoints) {
    if (shopItems.length === 0) {
        return `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <p>لا توجد منتجات في المتجر حالياً</p>
                <p>سيتم إضافة منتجات جديدة قريباً</p>
            </div>
        `;
    }
    
    return shopItems.map(item => `
        <div class="shop-item" data-category="${item.category || 'all'}">
            <div class="item-header ${item.rarity || 'common'}">
                ${item.isNew ? '<span class="item-badge new">جديد</span>' : ''}
                ${item.isPopular ? '<span class="item-badge popular">الأكثر مبيعاً</span>' : ''}
            </div>
            <div class="item-body">
                <div class="item-icon">
                    <i class="${item.icon || 'fas fa-gift'}"></i>
                </div>
                <div class="item-info">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-description">${item.description}</p>
                    <div class="item-stats">
                        ${item.duration ? `
                            <div class="item-stat">
                                <i class="fas fa-clock"></i>
                                <span>${item.duration} يوم</span>
                            </div>
                        ` : ''}
                        ${item.effect ? `
                            <div class="item-stat">
                                <i class="fas fa-bolt"></i>
                                <span>${item.effect}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            <div class="item-footer">
                <div class="item-price">
                    <i class="fas fa-coins"></i>
                    <span>${formatPoints(item.price)} نقطة</span>
                </div>
                <button class="btn btn-primary buy-btn" 
                        data-id="${item.id}"
                        data-price="${item.price}"
                        ${userPoints < item.price ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i> شراء
                </button>
            </div>
        </div>
    `).join('');
}

function setupShopCategories() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterShopItems(category);
        });
    });
}

function setupShopItems() {
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const itemId = this.dataset.id;
            const itemPrice = parseInt(this.dataset.price);
            
            const confirmed = await import('../components/ui.js').then(module => 
                module.confirmDialog('شراء منتج', `هل تريد شراء هذا المنتج مقابل ${itemPrice} نقطة؟`)
            );
            
            if (confirmed) {
                await purchaseItem(itemId, itemPrice);
            }
        });
    });
}

function filterShopItems(category) {
    const { shopItems, userData } = getAppState();
    const shopItemsGrid = document.getElementById('shop-items');
    
    if (!shopItemsGrid) return;
    
    if (category === 'all') {
        shopItemsGrid.innerHTML = renderShopItemsGrid(shopItems, userData?.points || 0);
    } else {
        const filteredItems = shopItems.filter(item => item.category === category);
        shopItemsGrid.innerHTML = renderShopItemsGrid(filteredItems, userData?.points || 0);
    }
    
    // إعادة إضافة مستمعات الأحداث للأزرار الجديدة
    setupShopItems();
}

async function purchaseItem(itemId, itemPrice) {
    const { currentUser, userData, shopItems } = getAppState();
    
    if (!currentUser) {
        showToast('خطأ', 'يجب تسجيل الدخول أولاً', 'error');
        return;
    }
    
    if ((userData?.points || 0) < itemPrice) {
        showToast('خطأ', 'نقاطك غير كافية لشراء هذا المنتج', 'error');
        return;
    }
    
    try {
        const item = shopItems.find(item => item.id === itemId);
        if (!item) {
            showToast('خطأ', 'المنتج غير موجود', 'error');
            return;
        }
        
        const db = firebase.firestore();
        
        // خصم النقاط
        await db.collection('users').doc(currentUser.uid).update({
            points: firebase.firestore.FieldValue.increment(-itemPrice),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // تسجيل عملية الشراء
        await db.collection('purchases').add({
            userId: currentUser.uid,
            itemId: itemId,
            itemName: item.name,
            price: itemPrice,
            purchasedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // إضافة المنتج للمستخدم
        await db.collection('user_items').add({
            userId: currentUser.uid,
            itemId: itemId,
            itemData: item,
            purchasedAt: firebase.firestore.FieldValue.serverTimestamp(),
            expiresAt: item.duration ? 
                new Date(Date.now() + item.duration * 24 * 60 * 60 * 1000) : null
        });
        
        // تحديث بيانات المستخدم المحلية
        import('../state/appState.js').then(module => {
            module.updateAppStateProperty('userData', {
                ...userData,
                points: (userData.points || 0) - itemPrice
            });
        });
        
        // تحديث واجهة المستخدم
        document.getElementById('user-coins').textContent = userData.points - itemPrice;
        document.getElementById('header-points').textContent = userData.points - itemPrice;
        
        showToast('تم الشراء', `تم شراء ${item.name} بنجاح`, 'success');
        
        // تحديث صفحة المتجر
        renderShopPage();
        
    } catch (error) {
        console.error('خطأ في شراء المنتج:', error);
        showToast('خطأ', 'فشل في إتمام عملية الشراء', 'error');
    }
}

// تصدير الدوال المطلوبة
export { purchaseItem };