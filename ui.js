export function showToast(title, message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = getToastIcon(type);

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${icon}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="close-toast">&times;</button>
    `;

    toastContainer.appendChild(toast);

    toast.querySelector('.close-toast').addEventListener('click', () => {
        toast.remove();
    });

    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);
}

function getToastIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

export function showAlert(message, type = 'error') {
    const alertDiv = document.getElementById('auth-alert');
    if (!alertDiv) return;

    alertDiv.textContent = message;
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.display = 'flex';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-alert';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => alertDiv.style.display = 'none';
    alertDiv.appendChild(closeBtn);
}

export function hideAlert() {
    const alertDiv = document.getElementById('auth-alert');
    if (alertDiv) {
        alertDiv.style.display = 'none';
    }
}

export function createModal(title, content, buttons = []) {
    const modalId = `modal-${Date.now()}`;
    const modalHTML = `
        <div class="modal" id="${modalId}">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="close-modal" data-modal="${modalId}">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    ${buttons.map(btn => `
                        <button class="btn ${btn.class || 'btn-secondary'}" 
                                data-action="${btn.action || 'close'}"
                                data-modal="${modalId}">
                            ${btn.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer.firstElementChild);

    const modal = document.getElementById(modalId);
    
    // إضافة مستمعات الأحداث
    modal.querySelector('.close-modal').addEventListener('click', () => closeModal(modalId));
    
    modal.querySelectorAll('[data-action="close"]').forEach(btn => {
        btn.addEventListener('click', () => closeModal(modalId));
    });

    return {
        show: () => modal.classList.add('show'),
        hide: () => closeModal(modalId),
        element: modal,
        id: modalId
    };
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

export function showLoading(message = 'جاري التحميل...') {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.querySelector('p').textContent = message;
        loadingScreen.style.display = 'flex';
    }
}

export function hideLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
}

export function confirmDialog(title, message, confirmText = 'نعم', cancelText = 'لا') {
    return new Promise((resolve) => {
        const modal = createModal(title, `
            <div class="confirm-dialog">
                <p>${message}</p>
            </div>
        `, [
            { text: cancelText, class: 'btn-secondary', action: 'cancel' },
            { text: confirmText, class: 'btn-primary', action: 'confirm' }
        ]);
        
        modal.show();
        
        modal.element.querySelectorAll('button[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                modal.hide();
                resolve(action === 'confirm');
            });
        });
    });
}

export function showErrorPage(container, pageName, retryFunction) {
    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-exclamation-triangle"></i>
                ${pageName}
            </h1>
        </div>
        <div class="error-section">
            <i class="fas fa-exclamation-triangle"></i>
            <p>حدث خطأ في تحميل ${pageName}</p>
            <button class="btn btn-primary" onclick="${retryFunction}()">إعادة المحاولة</button>
        </div>
    `;
}