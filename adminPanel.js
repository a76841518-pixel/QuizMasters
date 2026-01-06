import { db } from '../firebase/config.js';
import { showToast } from '../components/ui.js';
import { getCategoryName, getDifficultyName, formatDate } from '../utils/formatters.js';

export class AdminPanel {
    constructor() {
        this.currentTab = 'questions';
        this.questions = [];
        this.users = [];
        this.reports = [];
        this.currentQuestion = null;
        this.editingQuestion = false;
    }

    async loadAdminData() {
        try {
            await Promise.all([
                this.loadQuestions(),
                this.loadUsers(),
                this.loadReports(),
                this.loadSystemStats()
            ]);

            this.setupEventListeners();
            this.renderQuestionsTable();

        } catch (error) {
            console.error('خطأ في تحميل بيانات المشرف:', error);
            showToast('خطأ', 'فشل في تحميل بيانات المشرف', 'error');
        }
    }

    async loadQuestions() {
        const snapshot = await db.collection('questions')
            .orderBy('createdAt', 'desc')
            .limit(100)
            .get();

        this.questions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    async loadUsers() {
        const snapshot = await db.collection('users')
            .orderBy('createdAt', 'desc')
            .limit(100)
            .get();

        this.users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    async loadReports() {
        const snapshot = await db.collection('reports')
            .where('status', '==', 'pending')
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();

        this.reports = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    async loadSystemStats() {
        const usersCount = await db.collection('users').get();
        const questionsCount = await db.collection('questions').get();
        const matchesCount = await db.collection('matches').get();

        const totalUsers = document.getElementById('total-users');
        const totalQuestions = document.getElementById('total-questions');
        const totalMatches = document.getElementById('total-matches');
        const activeNow = document.getElementById('active-now');

        if (totalUsers) totalUsers.textContent = usersCount.size;
        if (totalQuestions) totalQuestions.textContent = questionsCount.size;
        if (totalMatches) totalMatches.textContent = matchesCount.size;
        if (activeNow) activeNow.textContent = Math.floor(usersCount.size * 0.1);
    }

    setupEventListeners() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        document.getElementById('add-question-btn')?.addEventListener('click', () => this.showQuestionForm());
        document.getElementById('save-question')?.addEventListener('click', () => this.saveQuestion());
        document.getElementById('cancel-question')?.addEventListener('click', () => this.hideQuestionForm());
        document.getElementById('close-question-modal')?.addEventListener('click', () => this.hideQuestionForm());

        document.getElementById('question-search')?.addEventListener('input', (e) => this.filterQuestions(e.target.value));
        document.getElementById('question-category-filter')?.addEventListener('change', (e) => this.filterByCategory(e.target.value));
        document.getElementById('question-difficulty-filter')?.addEventListener('change', (e) => this.filterByDifficulty(e.target.value));

        document.getElementById('user-search')?.addEventListener('input', (e) => this.filterUsers(e.target.value));
        document.getElementById('user-role-filter')?.addEventListener('change', (e) => this.filterByRole(e.target.value));
    }

    switchTab(tab) {
        this.currentTab = tab;

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tab}-tab`);
        });

        switch (tab) {
            case 'users':
                this.renderUsersTable();
                break;
            case 'reports':
                this.renderReports();
                break;
        }
    }

    showQuestionForm(question = null) {
        this.currentQuestion = question;
        this.editingQuestion = !!question;

        const modal = document.getElementById('question-modal');
        const title = document.getElementById('modal-title');
        const form = document.getElementById('question-form');

        if (question) {
            title.textContent = 'تعديل السؤال';
            document.getElementById('question-text').value = question.text;
            document.getElementById('question-category').value = question.category;
            document.getElementById('question-difficulty').value = question.difficulty;
            document.getElementById('question-time').value = question.time || 30;
            document.getElementById('correct-answer').value = question.correctAnswer;
            document.getElementById('wrong-answer-1').value = question.wrongAnswer1;
            document.getElementById('wrong-answer-2').value = question.wrongAnswer2;
            document.getElementById('wrong-answer-3').value = question.wrongAnswer3;
            document.getElementById('question-image').value = question.image || '';
            document.getElementById('question-explanation').value = question.explanation || '';
        } else {
            title.textContent = 'إضافة سؤال جديد';
            form.reset();
        }

        modal.classList.add('show');
    }

    hideQuestionForm() {
        document.getElementById('question-modal').classList.remove('show');
        this.currentQuestion = null;
        this.editingQuestion = false;
    }

    async saveQuestion() {
        try {
            const form = document.getElementById('question-form');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const questionData = {
                text: document.getElementById('question-text').value,
                category: document.getElementById('question-category').value,
                difficulty: document.getElementById('question-difficulty').value,
                time: parseInt(document.getElementById('question-time').value),
                correctAnswer: document.getElementById('correct-answer').value,
                wrongAnswer1: document.getElementById('wrong-answer-1').value,
                wrongAnswer2: document.getElementById('wrong-answer-2').value,
                wrongAnswer3: document.getElementById('wrong-answer-3').value,
                image: document.getElementById('question-image').value || null,
                explanation: document.getElementById('question-explanation').value || null,
                points: APP_CONSTANTS.DIFFICULTY_POINTS[document.getElementById('question-difficulty').value] || 10,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: getAppState().currentUser.uid
            };

            if (this.editingQuestion && this.currentQuestion) {
                await db.collection('questions').doc(this.currentQuestion.id).update(questionData);
                showToast('تم التحديث', 'تم تحديث السؤال بنجاح', 'success');
            } else {
                await db.collection('questions').add(questionData);
                showToast('تم الإضافة', 'تم إضافة السؤال بنجاح', 'success');
            }

            await this.loadQuestions();
            this.renderQuestionsTable();
            this.hideQuestionForm();

        } catch (error) {
            console.error('خطأ في حفظ السؤال:', error);
            showToast('خطأ في حفظ السؤال: ' + error.message, 'error');
        }
    }

    filterQuestions(searchTerm) {
        const filtered = this.questions.filter(question =>
            question.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            question.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.renderQuestionsTable(filtered);
    }

    filterByCategory(category) {
        if (!category) {
            this.renderQuestionsTable();
            return;
        }

        const filtered = this.questions.filter(question =>
            question.category === category
        );

        this.renderQuestionsTable(filtered);
    }

    filterByDifficulty(difficulty) {
        if (!difficulty) {
            this.renderQuestionsTable();
            return;
        }

        const filtered = this.questions.filter(question =>
            question.difficulty === difficulty
        );

        this.renderQuestionsTable(filtered);
    }

    renderQuestionsTable(questions = this.questions) {
        const tbody = document.getElementById('questions-table-body');
        if (!tbody) return;

        tbody.innerHTML = '';

        questions.forEach((question, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${question.text.substring(0, 50)}${question.text.length > 50 ? '...' : ''}</td>
                <td>
                    <span class="category-badge ${question.category}">
                        ${getCategoryName(question.category)}
                    </span>
                </td>
                <td>
                    <span class="difficulty-badge ${question.difficulty}">
                        ${getDifficultyName(question.difficulty)}
                    </span>
                </td>
                <td>4</td>
                <td>${question.correctAnswer.substring(0, 20)}${question.correctAnswer.length > 20 ? '...' : ''}</td>
                <td>${question.time || 30}</td>
                <td>${formatDate(question.createdAt?.toDate())}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn edit" onclick="admin.editQuestion('${question.id}')">
                            <i class="fas fa-edit"></i> تعديل
                        </button>
                        <button class="action-btn delete" onclick="admin.deleteQuestion('${question.id}')">
                            <i class="fas fa-trash"></i> حذف
                        </button>
                    </div>
                </td>
            `;

            tbody.appendChild(row);
        });
    }

    async editQuestion(questionId) {
        try {
            const doc = await db.collection('questions').doc(questionId).get();
            if (doc.exists) {
                this.showQuestionForm({ id: doc.id, ...doc.data() });
            }
        } catch (error) {
            console.error('خطأ في تحميل السؤال:', error);
            showToast('خطأ', 'فشل في تحميل بيانات السؤال', 'error');
        }
    }

    async deleteQuestion(questionId) {
        if (confirm('هل أنت متأكد من حذف هذا السؤال؟ لا يمكن التراجع عن هذا الإجراء.')) {
            try {
                await db.collection('questions').doc(questionId).delete();
                showToast('تم الحذف', 'تم حذف السؤال بنجاح', 'success');

                await this.loadQuestions();
                this.renderQuestionsTable();

            } catch (error) {
                console.error('خطأ في حذف السؤال:', error);
                showToast('خطأ', 'فشل في حذف السؤال', 'error');
            }
        }
    }

    filterUsers(searchTerm) {
        const filtered = this.users.filter(user =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.renderUsersTable(filtered);
    }

    filterByRole(role) {
        if (!role) {
            this.renderUsersTable();
            return;
        }

        const filtered = this.users.filter(user => {
            if (role === 'admin') return user.isAdmin;
            if (role === 'moderator') return user.isModerator;
            return !user.isAdmin && !user.isModerator;
        });

        this.renderUsersTable(filtered);
    }

    renderUsersTable(users = this.users) {
        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;

        tbody.innerHTML = '';

        users.forEach((user, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>
                    <div class="user-cell">
                        <div class="user-avatar-small">${user.name?.charAt(0) || '?'}</div>
                        <div class="user-details">
                            <div class="user-name">${user.name || 'بدون اسم'}</div>
                            <div class="user-username">@${user.username || 'بدون'}</div>
                        </div>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${user.level || 1}</td>
                <td>${user.points || 0}</td>
                <td>
                    <span class="role-badge ${user.isAdmin ? 'admin' : user.isModerator ? 'moderator' : 'user'}">
                        ${user.isAdmin ? 'مشرف' : user.isModerator ? 'مراقب' : 'لاعب'}
                    </span>
                </td>
                <td>${formatDate(user.createdAt?.toDate())}</td>
                <td>
                    <span class="status-badge ${user.isOnline ? 'online' : 'offline'}">
                        ${user.isOnline ? 'متصل' : 'غير متصل'}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn edit" onclick="admin.editUser('${user.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${!user.isAdmin ? `
                            <button class="action-btn ${user.isModerator ? 'demote' : 'promote'}"
                                onclick="admin.toggleModerator('${user.id}', ${user.isModerator})">
                                <i class="fas fa-${user.isModerator ? 'arrow-down' : 'arrow-up'}"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            `;

            tbody.appendChild(row);
        });
    }

    async toggleModerator(userId, isCurrentlyModerator) {
        try {
            await db.collection('users').doc(userId).update({
                isModerator: !isCurrentlyModerator,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            showToast('تم التحديث', `تم ${isCurrentlyModerator ? 'إلغاء صلاحية' : 'منح صلاحية'} المراقب`, 'success');
            await this.loadUsers();
            this.renderUsersTable();

        } catch (error) {
            console.error('خطأ في تغيير الصلاحية:', error);
            showToast('خطأ', 'فشل في تغيير الصلاحية', 'error');
        }
    }

    renderReports() {
        const container = document.getElementById('pending-reports');
        if (!container) return;

        container.innerHTML = '';

        this.reports.forEach(report => {
            const reportElement = document.createElement('div');
            reportElement.className = 'report-item';

            reportElement.innerHTML = `
                <div class="report-header">
                    <div class="report-type">${this.getReportTypeName(report.type)}</div>
                    <div class="report-date">${formatDate(report.createdAt?.toDate())}</div>
                </div>
                <div class="report-content">
                    <p>${report.description}</p>
                </div>
                <div class="report-actions">
                    <button class="btn btn-sm btn-primary" onclick="admin.resolveReport('${report.id}')">
                        معالجة
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="admin.ignoreReport('${report.id}')">
                        تجاهل
                    </button>
                </div>
            `;

            container.appendChild(reportElement);
        });
    }

    async resolveReport(reportId) {
        try {
            await db.collection('reports').doc(reportId).update({
                status: 'resolved',
                resolvedAt: firebase.firestore.FieldValue.serverTimestamp(),
                resolvedBy: getAppState().currentUser.uid
            });

            showToast('تمت المعالجة', 'تم معالجة التقرير بنجاح', 'success');
            await this.loadReports();
            this.renderReports();

        } catch (error) {
            console.error('خطأ في معالجة التقرير:', error);
            showToast('خطأ', 'فشل في معالجة التقرير', 'error');
        }
    }

    async ignoreReport(reportId) {
        try {
            await db.collection('reports').doc(reportId).update({
                status: 'ignored',
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            showToast('تم التجاهل', 'تم تجاهل التقرير', 'info');
            await this.loadReports();
            this.renderReports();

        } catch (error) {
            console.error('خطأ في تجاهل التقرير:', error);
            showToast('خطأ', 'فشل في تجاهل التقرير', 'error');
        }
    }

    // وظائف مساعدة
    getReportTypeName(type) {
        const names = {
            user: 'مستخدم',
            question: 'سؤال',
            bug: 'خلل',
            suggestion: 'اقتراح',
            other: 'أخرى'
        };
        return names[type] || type;
    }
}

// إنشاء نسخة وحيدة من AdminPanel
export const admin = new AdminPanel();

// تعيين كائن admin على window للاستخدام من HTML
window.admin = admin;