import { showErrorPage } from '../components/ui.js';

export function loadHelpPage() {
    const container = document.getElementById('help-page');
    if (!container) return;
    
    try {
        container.innerHTML = getHelpPageHTML();
        
        // إضافة مستمعات الأحداث
        setupHelpEventListeners();
        
    } catch (error) {
        console.error('خطأ في تحميل صفحة المساعدة:', error);
        showErrorPage(container, 'المساعدة', 'loadHelpPage');
    }
}

function getHelpPageHTML() {
    return `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-question-circle"></i>
                المساعدة والدعم
            </h1>
        </div>
        
        <div class="help-container">
            <div class="help-content">
                <div class="help-section">
                    <h3><i class="fas fa-gamepad"></i> كيفية اللعب</h3>
                    <div class="help-steps">
                        <div class="step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h4>أنشئ حساباً</h4>
                                <p>سجل دخولك أو أنشئ حساباً جديداً للبدء</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h4>اختر تحدياً</h4>
                                <p>اختر من بين التحديات الفردية أو الجماعية</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h4>اجب على الأسئلة</h4>
                                <p>اختر الإجابة الصحيحة قبل انتهاء الوقت</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <h4>اربح النقاط</h4>
                                <p>اجمع النقاط وارفع مستواك في التصنيف</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="help-section">
                    <h3><i class="fas fa-question-circle"></i> الأسئلة الشائعة</h3>
                    <div class="faq-list">
                        <div class="faq-item">
                            <div class="faq-question">
                                <h4>كيف أحصل على المزيد من النقاط؟</h4>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div class="faq-answer">
                                <p>يمكنك الحصول على النقاط من خلال:</p>
                                <ul>
                                    <li>الفوز في التحديات</li>
                                    <li>الإجابة الصحيحة بسرعة</li>
                                    <li>إكمال الإنجازات</li>
                                    <li>المشاركة في البطولات</li>
                                </ul>
                            </div>
                        </div>
                        <div class="faq-item">
                            <div class="faq-question">
                                <h4>كيف أدعو أصدقائي؟</h4>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div class="faq-answer">
                                <p>يمكنك دعوة أصدقائك من خلال:</p>
                                <ol>
                                    <li>الذهاب إلى صفحة الأصدقاء</li>
                                    <li>البحث عن أصدقائك</li>
                                    <li>إرسال طلب صداقة</li>
                                    <li>تحديهم بعد قبول الطلب</li>
                                </ol>
                            </div>
                        </div>
                        <div class="faq-item">
                            <div class="faq-question">
                                <h4>كيف أرفع مستواي؟</h4>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div class="faq-answer">
                                <p>لرفع مستوى حسابك:</p>
                                <ul>
                                    <li>شارك في المزيد من التحديات</li>
                                    <li>اجمع نقاط الخبرة (XP)</li>
                                    <li>احقق الإنجازات المختلفة</li>
                                    <li>استمر في اللعب بانتظام</li>
                                </ul>
                            </div>
                        </div>
                        <div class="faq-item">
                            <div class="faq-question">
                                <h4>هل يمكنني اللعب بدون اتصال بالإنترنت؟</h4>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div class="faq-answer">
                                <p>حالياً، يحتاج Quiz Masters إلى اتصال بالإنترنت للعب، لأن:</p>
                                <ul>
                                    <li>التحديات متعددة اللاعبين تتطلب اتصالاً مباشراً</li>
                                    <li>الأسئلة يتم جلبها من السحابة</li>
                                    <li>النتائج يتم حفظها فوراً</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="help-section">
                    <h3><i class="fas fa-headset"></i> الدعم الفني</h3>
                    <div class="support-options">
                        <div class="support-card">
                            <i class="fas fa-envelope"></i>
                            <h4>البريد الإلكتروني</h4>
                            <p>support@quizmasters.com</p>
                            <button class="btn btn-outline btn-sm" id="email-support">إرسال بريد</button>
                        </div>
                        <div class="support-card">
                            <i class="fas fa-comments"></i>
                            <h4>الدردشة الحية</h4>
                            <p>متاحة 24/7</p>
                            <button class="btn btn-outline btn-sm" id="live-chat">بدء الدردشة</button>
                        </div>
                        <div class="support-card">
                            <i class="fas fa-file-alt"></i>
                            <h4>التوثيق</h4>
                            <p>الدليل الكامل</p>
                            <button class="btn btn-outline btn-sm" id="view-docs">عرض الوثائق</button>
                        </div>
                    </div>
                </div>
                
                <div class="help-section">
                    <h3><i class="fas fa-exclamation-triangle"></i> الإبلاغ عن مشكلة</h3>
                    <div class="report-issue">
                        <p>إذا واجهت أي مشكلة في التطبيق، يمكنك الإبلاغ عنها هنا:</p>
                        <textarea class="form-control" id="issue-description" rows="4" placeholder="صف المشكلة التي واجهتها..."></textarea>
                        <div class="report-actions">
                            <select class="form-control" id="issue-type">
                                <option value="">نوع المشكلة</option>
                                <option value="bug">خلل تقني</option>
                                <option value="question">مشكلة في سؤال</option>
                                <option value="user">مشكلة مع مستخدم</option>
                                <option value="other">أخرى</option>
                            </select>
                            <button class="btn btn-primary" id="submit-issue">إرسال التقرير</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupHelpEventListeners() {
    // الأسئلة الشائعة
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            this.querySelector('i').classList.toggle('fa-chevron-up');
            this.querySelector('i').classList.toggle('fa-chevron-down');
        });
    });
    
    // أزرار الدعم
    document.getElementById('email-support')?.addEventListener('click', () => {
        window.open('mailto:support@quizmasters.com', '_blank');
    });
    
    document.getElementById('live-chat')?.addEventListener('click', () => {
        import('../components/ui.js').then(module => {
            module.showToast('قريباً', 'ميزة الدردشة الحية قريباً', 'info');
        });
    });
    
    document.getElementById('view-docs')?.addEventListener('click', () => {
        window.open('https://docs.quizmasters.com', '_blank');
    });
    
    // الإبلاغ عن مشكلة
    document.getElementById('submit-issue')?.addEventListener('click', submitIssue);
}

async function submitIssue() {
    const description = document.getElementById('issue-description').value.trim();
    const type = document.getElementById('issue-type').value;
    
    if (!description) {
        import('../components/ui.js').then(module => {
            module.showToast('خطأ', 'الرجاء وصف المشكلة', 'error');
        });
        return;
    }
    
    if (!type) {
        import('../components/ui.js').then(module => {
            module.showToast('خطأ', 'الرجاء تحديد نوع المشكلة', 'error');
        });
        return;
    }
    
    const { currentUser, userData } = getAppState();
    
    try {
        await db.collection('reports').add({
            userId: currentUser?.uid || 'anonymous',
            userName: userData?.name || 'مجهول',
            type: type,
            description: description,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        document.getElementById('issue-description').value = '';
        document.getElementById('issue-type').value = '';
        
        import('../components/ui.js').then(module => {
            module.showToast('تم', 'تم إرسال التقرير بنجاح', 'success');
        });
        
    } catch (error) {
        console.error('خطأ في إرسال التقرير:', error);
        import('../components/ui.js').then(module => {
            module.showToast('خطأ', 'فشل في إرسال التقرير', 'error');
        });
    }
}

// تصدير الدوال المطلوبة
export { submitIssue };