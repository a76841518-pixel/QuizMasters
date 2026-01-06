import { getAppState, updateAppState } from '../state/appState.js';
import { db } from '../firebase/config.js';
import { APP_CONSTANTS } from '../constants/appConstants.js';
import { showToast } from '../components/ui.js';
import { loadUserData } from '../firebase/database.js';
import { formatTime } from '../utils/formatters.js';
import { shuffleArray } from '../utils/helpers.js';

export class GameManager {
    constructor() {
        this.currentGame = null;
        this.gameTimer = null;
        this.questionTimer = null;
        this.players = {};
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.selectedAnswer = null;
        this.playerAnswers = {};
        this.gameStatus = 'waiting'; // waiting, playing, finished
    }

    async startChallenge(challengeId) {
        try {
            const challengeDoc = await db.collection('challenges').doc(challengeId).get();
            if (!challengeDoc.exists) {
                throw new Error('التحدي غير موجود');
            }

            this.currentGame = {
                id: challengeId,
                ...challengeDoc.data()
            };

            await this.loadQuestionsForChallenge();
            this.setupPlayers();
            this.showGameInterface();
            this.gameStatus = 'playing';

        } catch (error) {
            console.error('خطأ في بدء التحدي:', error);
            showToast('خطأ', 'فشل في بدء التحدي', 'error');
        }
    }

    async loadQuestionsForChallenge() {
        const { settings } = this.currentGame;
        let query = db.collection('questions');

        if (settings.difficulty !== 'mixed') {
            query = query.where('difficulty', '==', settings.difficulty);
        }

        const snapshot = await query.limit(settings.questionCount).get();
        this.questions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        this.questions = shuffleArray(this.questions);
    }

    setupPlayers() {
        const { currentGame } = this;
        const { currentUser } = getAppState();
        
        currentGame.players.forEach(playerId => {
            this.players[playerId] = {
                score: 0,
                correctAnswers: 0,
                totalTime: 0,
                answered: false,
                answerTime: null,
                isCurrentPlayer: playerId === currentUser?.uid
            };
        });
    }

    showGameInterface() {
        document.getElementById('main-content').style.display = 'none';
        const gameWindow = document.getElementById('challenge-window');
        gameWindow.style.display = 'flex';

        const container = document.querySelector('.challenge-container');
        container.innerHTML = this.createGameUI();

        this.setupGameEventListeners();
        this.startMainTimer();
        this.showQuestion(0);
    }

    createGameUI() {
        const { type, settings, players } = this.currentGame;

        return `
            <div class="game-header">
                <div class="game-info">
                    <h2>${this.getChallengeTypeName(type)}</h2>
                    <div class="game-stats">
                        <span><i class="fas fa-users"></i> ${players.length} لاعب</span>
                        <span><i class="fas fa-question-circle"></i> ${settings.questionCount} سؤال</span>
                        <span><i class="fas fa-clock"></i> ${this.formatTime(settings.timeLimit)}</span>
                    </div>
                </div>
                <div class="game-timer">
                    <div class="timer-display" id="main-timer">${this.formatTime(settings.timeLimit)}</div>
                </div>
            </div>
            
            <div class="game-content">
                <div class="players-scoreboard" id="players-scoreboard">
                    ${this.createScoreboard()}
                </div>
                
                <div class="question-container">
                    <div class="question-header">
                        <div class="question-number">السؤال <span id="current-question">1</span>/${this.questions.length}</div>
                        <div class="question-timer">
                            <i class="fas fa-clock"></i>
                            <span id="question-timer">30</span> ثانية
                        </div>
                    </div>
                    
                    <div class="question-body">
                        <div class="question-text" id="question-text">
                            جاري تحميل السؤال...
                        </div>
                        
                        <div class="question-image" id="question-image" style="display: none;">
                            <img src="" alt="صورة السؤال">
                        </div>
                        
                        <div class="answers-container" id="answers-container">
                            <!-- سيتم ملء الإجابات ديناميكياً -->
                        </div>
                    </div>
                    
                    <div class="question-actions">
                        <button class="btn btn-secondary" id="skip-question">تخطي</button>
                        <button class="btn btn-primary" id="submit-answer" disabled>تأكيد الإجابة</button>
                    </div>
                </div>
            </div>
            
            <div class="game-footer">
                <button class="btn btn-danger" id="leave-game">إنهاء التحدي</button>
            </div>
        `;
    }

    createScoreboard() {
        let html = '';
        let index = 0;

        Object.entries(this.players).forEach(([playerId, data]) => {
            const playerName = this.getPlayerName(playerId);
            html += `
                <div class="player-score" data-player="${playerId}">
                    <div class="player-rank">${index + 1}</div>
                    <div class="player-avatar">${playerName.charAt(0)}</div>
                    <div class="player-info">
                        <div class="player-name">${playerName}</div>
                        <div class="player-stats">
                            <span class="score">${data.score} نقطة</span>
                            <span class="answers">${data.correctAnswers} إجابة</span>
                        </div>
                    </div>
                    <div class="player-status ${data.answered ? 'answered' : 'waiting'}">
                        ${data.answered ? 'أجاب' : 'ينتظر'}
                    </div>
                </div>
            `;
            index++;
        });

        return html;
    }

    setupGameEventListeners() {
        document.getElementById('skip-question')?.addEventListener('click', () => this.skipQuestion());
        document.getElementById('submit-answer')?.addEventListener('click', () => this.submitAnswer());
        document.getElementById('leave-game')?.addEventListener('click', () => this.leaveGame());
    }

    startMainTimer() {
        const { timeLimit } = this.currentGame.settings;
        let timeLeft = timeLimit;

        this.gameTimer = setInterval(() => {
            timeLeft--;
            const timerDisplay = document.getElementById('main-timer');
            if (timerDisplay) {
                timerDisplay.textContent = this.formatTime(timeLeft);
            }

            if (timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    showQuestion(index) {
        this.currentQuestionIndex = index;
        const question = this.questions[index];

        if (!question) {
            this.endGame();
            return;
        }

        document.getElementById('current-question').textContent = index + 1;
        document.getElementById('question-text').textContent = question.text;

        if (question.image) {
            const imgContainer = document.getElementById('question-image');
            const img = imgContainer.querySelector('img');
            img.src = question.image;
            imgContainer.style.display = 'block';
        }

        this.displayAnswers(question);
        this.startQuestionTimer(question.time || 30);
        this.selectedAnswer = null;
        document.getElementById('submit-answer').disabled = true;
        this.resetPlayersAnswerStatus();
    }

    displayAnswers(question) {
        const container = document.getElementById('answers-container');
        if (!container) return;
        
        container.innerHTML = '';

        const answers = [
            { text: question.correctAnswer, isCorrect: true },
            { text: question.wrongAnswer1, isCorrect: false },
            { text: question.wrongAnswer2, isCorrect: false },
            { text: question.wrongAnswer3, isCorrect: false }
        ];

        shuffleArray(answers);

        answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer.text;
            button.dataset.index = index;
            button.dataset.correct = answer.isCorrect;

            button.addEventListener('click', () => this.selectAnswer(button, answer.isCorrect));
            container.appendChild(button);
        });
    }

    startQuestionTimer(timeLimit) {
        let timeLeft = timeLimit;
        const timerDisplay = document.getElementById('question-timer');
        if (timerDisplay) {
            timerDisplay.textContent = timeLeft;
        }

        if (this.questionTimer) {
            clearInterval(this.questionTimer);
        }

        this.questionTimer = setInterval(() => {
            timeLeft--;
            if (timerDisplay) {
                timerDisplay.textContent = timeLeft;
            }

            if (timeLeft <= 0) {
                clearInterval(this.questionTimer);
                this.handleTimeUp();
            }
        }, 1000);
    }

    selectAnswer(button, isCorrect) {
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.classList.remove('selected');
        });

        button.classList.add('selected');
        this.selectedAnswer = { button, isCorrect };
        document.getElementById('submit-answer').disabled = false;
    }

    submitAnswer() {
        if (!this.selectedAnswer) return;

        const { button, isCorrect } = this.selectedAnswer;
        const { currentUser } = getAppState();
        const questionTimeElement = document.getElementById('question-timer');
        const questionTime = questionTimeElement ? parseInt(questionTimeElement.textContent) : 0;

        let points = 0;
        if (isCorrect) {
            const question = this.questions[this.currentQuestionIndex];
            const basePoints = APP_CONSTANTS.DIFFICULTY_POINTS[question.difficulty] || 10;
            points = basePoints + questionTime;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
            document.querySelectorAll('.answer-btn').forEach(btn => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                }
            });
        }

        this.players[currentUser.uid].answered = true;
        this.players[currentUser.uid].answerTime = questionTime;

        if (isCorrect) {
            this.players[currentUser.uid].score += points;
            this.players[currentUser.uid].correctAnswers++;
        }

        this.updateScoreboard();
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });
        
        const submitButton = document.getElementById('submit-answer');
        if (submitButton) {
            submitButton.disabled = true;
        }

        setTimeout(() => {
            this.nextQuestion();
        }, 3000);
    }

    skipQuestion() {
        this.nextQuestion();
    }

    nextQuestion() {
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion(this.currentQuestionIndex);
        } else {
            this.endGame();
        }
    }

    handleTimeUp() {
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
            }
        });

        setTimeout(() => {
            this.nextQuestion();
        }, 3000);
    }

    async endGame() {
        clearInterval(this.gameTimer);
        clearInterval(this.questionTimer);
        this.gameStatus = 'finished';

        const winner = this.calculateWinner();
        await this.saveGameResults(winner);
        this.showResults(winner);

        if (getAppState().currentUser) {
            await loadUserData(getAppState().currentUser.uid);
        }
    }

    calculateWinner() {
        let winner = null;
        let maxScore = -1;

        Object.entries(this.players).forEach(([playerId, data]) => {
            if (data.score > maxScore) {
                maxScore = data.score;
                winner = { playerId, ...data };
            }
        });

        return winner;
    }

    async saveGameResults(winner) {
        try {
            const gameData = {
                challengeId: this.currentGame.id,
                type: this.currentGame.type,
                players: this.players,
                winner: winner.playerId,
                winnerScore: winner.score,
                questionsCount: this.questions.length,
                duration: this.currentGame.settings.timeLimit,
                completedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await db.collection('matches').add(gameData);
            await this.updatePlayersStats(winner.playerId);

        } catch (error) {
            console.error('خطأ في حفظ نتائج اللعبة:', error);
        }
    }

    async updatePlayersStats(winnerId) {
        const batch = db.batch();

        Object.keys(this.players).forEach(playerId => {
            const playerRef = db.collection('users').doc(playerId);
            const playerData = this.players[playerId];

            const updates = {
                matches: firebase.firestore.FieldValue.increment(1),
                points: firebase.firestore.FieldValue.increment(playerData.score),
                xp: firebase.firestore.FieldValue.increment(playerData.correctAnswers * 10)
            };

            if (playerId === winnerId) {
                updates.wins = firebase.firestore.FieldValue.increment(1);
                updates.streak = firebase.firestore.FieldValue.increment(1);
            }

            batch.update(playerRef, updates);
        });

        await batch.commit();
    }

    showResults(winner) {
        const container = document.querySelector('.challenge-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="results-container">
                <div class="results-header">
                    <h2>انتهى التحدي!</h2>
                    <p>إليك النتائج النهائية</p>
                </div>
                
                <div class="winner-section">
                    <div class="winner-crown">
                        <i class="fas fa-crown"></i>
                    </div>
                    <div class="winner-avatar">${this.getPlayerName(winner.playerId).charAt(0)}</div>
                    <div class="winner-info">
                        <h3>${this.getPlayerName(winner.playerId)}</h3>
                        <p>الفائز بالتحدي</p>
                    </div>
                    <div class="winner-score">${winner.score} نقطة</div>
                </div>
                
                <div class="results-table">
                    <h3>الترتيب النهائي</h3>
                    <div class="players-results" id="players-results">
                        ${this.createResultsTable()}
                    </div>
                </div>
                
                <div class="results-actions">
                    <button class="btn btn-primary" id="play-again">لعب مرة أخرى</button>
                    <button class="btn btn-secondary" id="back-to-lobby">العودة للرئيسية</button>
                </div>
            </div>
        `;

        document.getElementById('play-again')?.addEventListener('click', () => {
            this.restartGame();
        });

        document.getElementById('back-to-lobby')?.addEventListener('click', () => {
            this.leaveGame();
        });
    }

    createResultsTable() {
        let html = '';

        const sortedPlayers = Object.entries(this.players)
            .sort(([, a], [, b]) => b.score - a.score);

        sortedPlayers.forEach(([playerId, data], index) => {
            html += `
                <div class="player-result ${index === 0 ? 'first' : ''}">
                    <div class="result-rank">${index + 1}</div>
                    <div class="result-avatar">${this.getPlayerName(playerId).charAt(0)}</div>
                    <div class="result-info">
                        <div class="result-name">${this.getPlayerName(playerId)}</div>
                        <div class="result-details">
                            ${data.correctAnswers} إجابة صحيحة
                        </div>
                    </div>
                    <div class="result-score">${data.score} نقطة</div>
                </div>
            `;
        });

        return html;
    }

    restartGame() {
        this.cleanup();
        this.startChallenge(this.currentGame.id);
    }

    leaveGame() {
        this.cleanup();
        const mainContent = document.getElementById('main-content');
        const gameWindow = document.getElementById('challenge-window');
        
        if (mainContent) mainContent.style.display = 'block';
        if (gameWindow) gameWindow.style.display = 'none';
        
        import('../utils/navigation.js').then(module => {
            module.navigateTo('dashboard');
        });
    }

    cleanup() {
        clearInterval(this.gameTimer);
        clearInterval(this.questionTimer);
        this.currentGame = null;
        this.players = {};
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.selectedAnswer = null;
        this.playerAnswers = {};
        this.gameStatus = 'waiting';
    }

    // وظائف مساعدة
    getChallengeTypeName(type) {
        const names = {
            individual: 'التحدي الفردي',
            speed: 'تحدي السرعة',
            time: 'تحدي الوقت',
            comprehensive: 'التحدي الشامل',
            private: 'تحدي خاص'
        };
        return names[type] || type;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    getPlayerName(playerId) {
        const { currentUser, userData, friends } = getAppState();
        
        if (playerId === currentUser?.uid) {
            return userData?.name || 'أنت';
        }
        
        // البحث في قائمة الأصدقاء
        const friend = friends.find(f => f.id === playerId);
        if (friend) {
            return friend.name || 'صديق';
        }
        
        return 'لاعب';
    }

    updateScoreboard() {
        const scoreboard = document.getElementById('players-scoreboard');
        if (scoreboard) {
            scoreboard.innerHTML = this.createScoreboard();
        }
    }

    resetPlayersAnswerStatus() {
        Object.keys(this.players).forEach(playerId => {
            this.players[playerId].answered = false;
            this.players[playerId].answerTime = null;
        });
        this.updateScoreboard();
    }
}

// إنشاء نسخة وحيدة من GameManager
export const game = new GameManager();