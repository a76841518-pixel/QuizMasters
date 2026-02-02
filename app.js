// تهيئة Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACL_cbxef4lTjpMvXtoalSC83Mr7IdgbE",
  authDomain: "appj-52e7e.firebaseapp.com",
  databaseURL: "https://appj-52e7e-default-rtdb.firebaseio.com",
  projectId: "appj-52e7e",
  storageBucket: "appj-52e7e.firebasestorage.app",
  messagingSenderId: "669204415571",
  appId: "1:669204415571:web:dfdfd26a960a7fcb74f2a6",
  measurementId: "G-LVLHWN8BZ3"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// حالة اللعبة
let gameState = {
    player: null,
    currentScreen: 'home',
    inBattle: false,
    battleId: null,
    opponent: null,
    matchmaking: false,
    upgrades: {
        health: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        stamina: 0
    },
    // إضافة للغرف الخاصة
    inRoom: false,
    roomId: null,
    roomCode: null,
    isRoomOwner: false,
    roomPlayers: [],
    currentRoom: null,
    roomListener: null
};

// تهيئة اللعبة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    checkAuthState();
    initializeGameData();
});

// تهيئة معالجي الأحداث
function initializeEventListeners() {
    // شاشة الرئيسية
    document.getElementById('loginBtn').addEventListener('click', () => showScreen('auth'));
    document.getElementById('signupBtn').addEventListener('click', () => showScreen('auth'));
    
    // شاشة المصادقة
    document.getElementById('backToHome').addEventListener('click', () => showScreen('home'));
    document.getElementById('loginTab').addEventListener('click', () => switchAuthTab('login'));
    document.getElementById('signupTab').addEventListener('click', () => switchAuthTab('signup'));
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    
    // شاشة الصالة
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('findMatchBtn').addEventListener('click', findMatch);
    document.getElementById('cancelMatchmaking').addEventListener('click', cancelMatchmaking);
    document.getElementById('enterBattle').addEventListener('click', enterBattle);
    document.getElementById('upgradeBtn').addEventListener('click', () => showScreen('upgrade'));
    document.getElementById('leaderboardBtn').addEventListener('click', () => {
        showScreen('leaderboard');
        loadLeaderboard('level');
    });
    
document.getElementById('createRoomBtnMain').addEventListener('click', () => showScreen('createRoom'));
    
// أحداث الغرف الخاصة
document.getElementById('createRoomBtn').addEventListener('click', handleCreateRoom);
document.getElementById('joinRoomBtn').addEventListener('click', () => showScreen('joinRoom'));
document.getElementById('backToLobbyFromCreate').addEventListener('click', () => showScreen('lobby'));
document.getElementById('backToLobbyFromJoin').addEventListener('click', () => showScreen('lobby'));
document.getElementById('joinRoomByCodeBtn').addEventListener('click', handleJoinRoomByCode);
document.getElementById('leaveRoomBtn').addEventListener('click', handleLeaveRoom);
document.getElementById('startGameBtn').addEventListener('click', startRoomGame);
document.getElementById('sendChatMessage').addEventListener('click', sendRoomChatMessage);
document.getElementById('roomChatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendRoomChatMessage();
});

// نسخ كود الغرفة
document.getElementById('copyRoomCode').addEventListener('click', copyRoomCode);
document.getElementById('copyRoomCodeHeader').addEventListener('click', copyRoomCodeHeader);

// تحديث معاينة الغرفة
document.getElementById('roomName').addEventListener('input', updateRoomPreview);
document.getElementById('roomType').addEventListener('change', updateRoomPreview);
document.getElementById('roomPrivacy').addEventListener('change', updateRoomPreview);
document.getElementById('roomMaxPlayers').addEventListener('change', updateRoomPreview);
    
    // شاشة المعركة
    document.getElementById('leaveBattle').addEventListener('click', leaveBattle);
    document.getElementById('basicAttack').addEventListener('click', () => performAction('basicAttack'));
    document.getElementById('skill1').addEventListener('click', () => performAction('skill1'));
    document.getElementById('skill2').addEventListener('click', () => performAction('skill2'));
    document.getElementById('skill3').addEventListener('click', () => performAction('skill3'));
    
    // شاشة الترقية
    document.getElementById('backToLobby').addEventListener('click', () => showScreen('lobby'));
    document.querySelectorAll('.btn-upgrade').forEach(btn => {
        btn.addEventListener('click', () => handleUpgrade(btn.dataset.stat));
    });
    document.getElementById('applyUpgrades').addEventListener('click', applyUpgrades);
    
    // شاشة قائمة المتصدرين
    document.getElementById('backToLobbyFromLeaderboard').addEventListener('click', () => showScreen('lobby'));
    document.querySelectorAll('.leaderboard-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.leaderboard-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadLeaderboard(tab.dataset.type);
        });
    });
    
    // نافذة النتائج
    document.getElementById('closeResults').addEventListener('click', () => {
        document.getElementById('resultsModal').classList.remove('active');
        showScreen('lobby');
    });
}

// التحقق من حالة المصادقة
function checkAuthState() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            loadPlayerData(user.uid);
        } else {
            showScreen('home');
        }
    });
}

// تحميل بيانات اللاعب
function loadPlayerData(userId) {
    database.ref('players/' + userId).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            gameState.player = snapshot.val();
            updatePlayerUI();
            showScreen('lobby');
        } else {
            // إنشاء لاعب جديد
            createNewPlayer(userId);
        }
    });
}

// إنشاء لاعب جديد
function createNewPlayer(userId) {
    const user = auth.currentUser;
    const newPlayer = {
        id: userId,
        name: user.displayName || user.email.split('@')[0],
        level: 1,
        xp: 0,
        maxXP: 100,
        maxHP: 100,
        currentHP: 100,
        attack: 15,
        defense: 10,
        speed: 20,
        maxStamina: 50,
        currentStamina: 50,
        weapon: {
            name: "سيف مبتدئ",
            damage: "10-15",
            properties: "لا يوجد"
        },
        skills: [
            { name: "ضربة سريعة", cooldown: 5, cost: 10 },
            { name: "دفاع", cooldown: 10, cost: 15 },
            { name: "ضربة نارية", cooldown: 15, cost: 20 }
        ],
        wins: 0,
        losses: 0,
        rating: 1000,
        upgradePoints: 5,
        createdAt: Date.now()
    };
    
    database.ref('players/' + userId).set(newPlayer).then(() => {
        gameState.player = newPlayer;
        updatePlayerUI();
        showScreen('lobby');
        showNotification("تم إنشاء لاعب جديد بنجاح!");
    });
}

// تحديث واجهة اللاعب
function updatePlayerUI() {
    if (!gameState.player) return;
    
    const p = gameState.player;
    
    // تحديث معلومات اللاعب
    document.getElementById('playerName').textContent = p.name;
    document.getElementById('playerLevel').textContent = p.level;
    document.getElementById('playerHP').textContent = `${p.currentHP}/${p.maxHP}`;
    document.getElementById('playerStamina').textContent = `${p.currentStamina}/${p.maxStamina}`;
    document.getElementById('playerXP').textContent = `${p.xp}/${p.maxXP}`;
    
    // تحديث إحصائيات الجندي
    document.getElementById('attackValue').textContent = p.attack;
    document.getElementById('defenseValue').textContent = p.defense;
    document.getElementById('speedValue').textContent = p.speed;
    document.getElementById('staminaValue').textContent = p.maxStamina;
    
    // تحديث أشرطة الإحصائيات
    document.getElementById('attackStat').style.width = `${(p.attack / 50) * 100}%`;
    document.getElementById('defenseStat').style.width = `${(p.defense / 30) * 100}%`;
    document.getElementById('speedStat').style.width = `${(p.speed / 50) * 100}%`;
    document.getElementById('staminaStat').style.width = `${(p.maxStamina / 100) * 100}%`;
    
    // تحديث السلاح
    document.getElementById('weaponName').textContent = p.weapon.name;
    document.getElementById('weaponDamage').innerHTML = `الضرر: <span>${p.weapon.damage}</span>`;
    document.getElementById('weaponProperties').innerHTML = `الخصائص: <span>${p.weapon.properties}</span>`;
    
    // تحديث صورة اللاعب
    document.getElementById('playerAvatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=4A90E2&color=fff`;
}

// تبديل الشاشات
function showScreen(screenName) {
    // إخفاء جميع الشاشات
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // إظهار الشاشة المطلوبة
    document.getElementById(screenName + 'Screen').classList.add('active');
    gameState.currentScreen = screenName;
    
    // إذا كانت الشاشة هي شاشة الترقية، قم بتحديثها
    if (screenName === 'upgrade') {
        updateUpgradeScreen();
    }
}

// تبديل تبويبات المصادقة
function switchAuthTab(tab) {
    document.getElementById('loginTab').classList.toggle('active', tab === 'login');
    document.getElementById('signupTab').classList.toggle('active', tab === 'signup');
    document.getElementById('loginForm').classList.toggle('active', tab === 'login');
    document.getElementById('signupForm').classList.toggle('active', tab === 'signup');
    document.getElementById('authTitle').textContent = tab === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب';
}

// معالجة تسجيل الدخول
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorElement = document.getElementById('loginError');
    
    errorElement.textContent = '';
    
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            showNotification("تم تسجيل الدخول بنجاح!");
        })
        .catch((error) => {
            errorElement.textContent = getAuthErrorMessage(error.code);
        });
}

// معالجة إنشاء الحساب
function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorElement = document.getElementById('signupError');
    
    errorElement.textContent = '';
    
    if (password !== confirmPassword) {
        errorElement.textContent = "كلمات المرور غير متطابقة";
        return;
    }
    
    if (password.length < 6) {
        errorElement.textContent = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
        return;
    }
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // تحديث اسم المستخدم
            return userCredential.user.updateProfile({
                displayName: name
            });
        })
        .then(() => {
            showNotification("تم إنشاء الحساب بنجاح!");
        })
        .catch((error) => {
            errorElement.textContent = getAuthErrorMessage(error.code);
        });
}

// معالجة تسجيل الخروج
function handleLogout() {
    if (gameState.inBattle) {
        if (confirm("أنت في معركة حالياً. هل تريد الخروج من المعركة وتسجيل الخروج؟")) {
            leaveBattle();
        } else {
            return;
        }
    }
    
    auth.signOut().then(() => {
        showNotification("تم تسجيل الخروج بنجاح");
        gameState.player = null;
        showScreen('home');
    });
}

// البحث عن معركة
function findMatch() {
    if (gameState.matchmaking) return;
    
    gameState.matchmaking = true;
    document.querySelector('.searching').style.display = 'flex';
    document.getElementById('matchFound').style.display = 'none';
    
    // البحث عن خصم في قاعدة البيانات
    database.ref('matchmaking').push({
        playerId: gameState.player.id,
        playerName: gameState.player.name,
        playerLevel: gameState.player.level,
        playerRating: gameState.player.rating,
        timestamp: Date.now()
    }).then((matchRef) => {
        gameState.matchmakingRef = matchRef;
        
        // الاستماع للعثور على خصم
        database.ref('matches').orderByChild('player1Id').equalTo(gameState.player.id).on('value', (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((matchSnapshot) => {
                    const match = matchSnapshot.val();
                    if (match.status === 'waiting') {
                        gameState.battleId = matchSnapshot.key;
                        gameState.matchmaking = false;
                        document.querySelector('.searching').style.display = 'none';
                        document.getElementById('matchFound').style.display = 'flex';
                        
                        // إزالة من قائمة البحث
                        if (gameState.matchmakingRef) {
                            database.ref('matchmaking/' + gameState.matchmakingRef.key).remove();
                        }
                    }
                });
            }
        });
        
        // البحث عن خصم مناسب لمدة 30 ثانية
        setTimeout(() => {
            if (gameState.matchmaking) {
                cancelMatchmaking();
                showNotification("لم يتم العثور على خصم. حاول مرة أخرى لاحقاً.");
            }
        }, 30000);
    });
}

// إلغاء البحث عن معركة
function cancelMatchmaking() {
    if (!gameState.matchmaking) return;
    
    gameState.matchmaking = false;
    document.querySelector('.searching').style.display = 'none';
    
    if (gameState.matchmakingRef) {
        database.ref('matchmaking/' + gameState.matchmakingRef.key).remove();
        gameState.matchmakingRef = null;
    }
}

// الدخول للمعركة
function enterBattle() {
    if (!gameState.battleId) return;
    
    database.ref('matches/' + gameState.battleId).once('value').then((snapshot) => {
        const match = snapshot.val();
        
        if (match.status === 'waiting') {
            // تحديث حالة المباراة
            database.ref('matches/' + gameState.battleId).update({
                status: 'active',
                startTime: Date.now()
            });
            
            // تهيئة المعركة
            initializeBattle(match);
        } else {
            showNotification("المعركة لم تعد متاحة");
            showScreen('lobby');
        }
    });
}

// تهيئة المعركة
function initializeBattle(match) {
    gameState.inBattle = true;
    gameState.opponent = match.player1Id === gameState.player.id ? match.player2 : match.player1;
    
    // تحديث واجهة المعركة
    document.getElementById('player1Name').textContent = gameState.player.name;
    document.getElementById('player1Level').textContent = gameState.player.level;
    document.getElementById('player1Weapon').textContent = gameState.player.weapon.name;
    
    document.getElementById('player2Name').textContent = gameState.opponent.name;
    document.getElementById('player2Level').textContent = gameState.opponent.level;
    document.getElementById('player2Weapon').textContent = gameState.opponent.weapon.name;
    
    // إعادة تعيين أشرطة الصحة والتحمل
    document.getElementById('player1Health').style.width = '100%';
    document.getElementById('player1HealthText').textContent = `${gameState.player.currentHP}/${gameState.player.maxHP}`;
    document.getElementById('player1Stamina').style.width = '100%';
    document.getElementById('player1StaminaText').textContent = `${gameState.player.currentStamina}/${gameState.player.maxStamina}`;
    
    document.getElementById('player2Health').style.width = '100%';
    document.getElementById('player2HealthText').textContent = `${gameState.opponent.currentHP}/${gameState.opponent.maxHP}`;
    document.getElementById('player2Stamina').style.width = '100%';
    document.getElementById('player2StaminaText').textContent = `${gameState.opponent.currentStamina}/${gameState.opponent.maxStamina}`;
    
    // مسج السجل
    document.getElementById('battleLog').innerHTML = '<div class="log-entry">بدأت المعركة!</div>';
    
    // بدء المؤقت
    let battleTime = 0;
    const timerElement = document.getElementById('battleTimer');
    gameState.battleTimer = setInterval(() => {
        battleTime++;
        const minutes = Math.floor(battleTime / 60);
        const seconds = battleTime % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
    
    // الاستماع لتحديثات المعركة
    gameState.battleListener = database.ref('matches/' + gameState.battleId).on('value', (snapshot) => {
        const updatedMatch = snapshot.val();
        if (updatedMatch.status === 'finished') {
            endBattle(updatedMatch);
        } else if (updatedMatch.actions) {
            updateBattleActions(updatedMatch.actions);
        }
    });
    
    showScreen('battle');
}

// تنفيذ فعل في المعركة
function performAction(actionType) {
    if (!gameState.inBattle) return;
    
    const actionCosts = {
        basicAttack: 5,
        skill1: 10,
        skill2: 15,
        skill3: 20
    };
    
    const cost = actionCosts[actionType];
    
    if (gameState.player.currentStamina < cost) {
        addBattleLog("ليس لديك تحمل كافي لهذا الفعل!", "player");
        return;
    }
    
    // تحديث التحمل
    gameState.player.currentStamina -= cost;
    database.ref('players/' + gameState.player.id).update({
        currentStamina: gameState.player.currentStamina
    });
    
    // تحديث واجهة المستخدم
    const staminaPercent = (gameState.player.currentStamina / gameState.player.maxStamina) * 100;
    document.getElementById('player1Stamina').style.width = `${staminaPercent}%`;
    document.getElementById('player1StaminaText').textContent = `${gameState.player.currentStamina}/${gameState.player.maxStamina}`;
    
    // إضافة الفعل إلى قاعدة البيانات
    const action = {
        playerId: gameState.player.id,
        actionType: actionType,
        timestamp: Date.now(),
        damage: calculateDamage(actionType)
    };
    
    database.ref('matches/' + gameState.battleId + '/actions').push(action);
    
    // إضافة للسجل
    const actionNames = {
        basicAttack: "هجوم أساسي",
        skill1: "ضربة سريعة",
        skill2: "دفاع",
        skill3: "ضربة نارية"
    };
    
    addBattleLog(`استخدمت ${actionNames[actionType]}!`, "player");
    
    // تفعيل فترة الانتظار للمهارات
    if (actionType !== 'basicAttack') {
        const skillBtn = document.getElementById(actionType);
        skillBtn.disabled = true;
        
        const cooldown = parseInt(skillBtn.dataset.cooldown);
        let remaining = cooldown;
        
        const cooldownInterval = setInterval(() => {
            remaining--;
            skillBtn.innerHTML = `<i class="fas fa-bolt"></i> ${remaining} ثانية`;
            
            if (remaining <= 0) {
                clearInterval(cooldownInterval);
                skillBtn.disabled = false;
                const actionText = actionNames[actionType];
                skillBtn.innerHTML = `<i class="fas fa-bolt"></i> ${actionText}`;
            }
        }, 1000);
    }
}

// حساب الضرر
function calculateDamage(actionType) {
    const baseDamage = gameState.player.attack;
    let damage = baseDamage;
    
    switch (actionType) {
        case 'basicAttack':
            damage = baseDamage + Math.floor(Math.random() * 5);
            break;
        case 'skill1':
            damage = baseDamage * 1.5 + Math.floor(Math.random() * 8);
            break;
        case 'skill2':
            damage = 0; // دفاع لا يسبب ضرر
            break;
        case 'skill3':
            damage = baseDamage * 2 + Math.floor(Math.random() * 10);
            break;
    }
    
    return Math.floor(damage);
}

// تحديث إجراءات المعركة
function updateBattleActions(actions) {
    if (!actions) return;
    
    // الحصول على أحدث إجراء
    const actionIds = Object.keys(actions);
    const latestActionId = actionIds[actionIds.length - 1];
    const latestAction = actions[latestActionId];
    
    if (latestAction.playerId !== gameState.player.id) {
        // الخصم قام بإجراء
        const actionNames = {
            basicAttack: "هجوم أساسي",
            skill1: "ضربة سريعة",
            skill2: "دفاع",
            skill3: "ضربة نارية"
        };
        
        const damage = latestAction.damage || 0;
        
        if (damage > 0) {
            // تطبيق الضرر
            gameState.player.currentHP = Math.max(0, gameState.player.currentHP - damage);
            
            // تحديث قاعدة البيانات
            database.ref('players/' + gameState.player.id).update({
                currentHP: gameState.player.currentHP
            });
            
            // تحديث واجهة المستخدم
            const healthPercent = (gameState.player.currentHP / gameState.player.maxHP) * 100;
            document.getElementById('player1Health').style.width = `${healthPercent}%`;
            document.getElementById('player1HealthText').textContent = `${gameState.player.currentHP}/${gameState.player.maxHP}`;
            
            addBattleLog(`الخصم استخدم ${actionNames[latestAction.actionType]} وسبب ${damage} ضرر!`, "opponent");
            
            // التحقق من الهزيمة
            if (gameState.player.currentHP <= 0) {
                endBattleWithWinner(gameState.opponent.id);
            }
        } else {
            addBattleLog(`الخصم استخدم ${actionNames[latestAction.actionType]}!`, "opponent");
        }
    }
}

// إضافة سجل المعركة
function addBattleLog(message, type) {
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = message;
    
    const battleLog = document.getElementById('battleLog');
    battleLog.appendChild(logEntry);
    battleLog.scrollTop = battleLog.scrollHeight;
}

// إنهاء المعركة
function endBattle(match) {
    if (!gameState.inBattle) return;
    
    clearInterval(gameState.battleTimer);
    
    if (gameState.battleListener) {
        database.ref('matches/' + gameState.battleId).off('value', gameState.battleListener);
    }
    
    gameState.inBattle = false;
    
    // تحديث نتيجة اللاعب
    const isWinner = match.winner === gameState.player.id;
    
    if (isWinner) {
        showNotification("🎉 فزت في المعركة!");
    } else {
        showNotification("💔 خسرت في المعركة. حاول مرة أخرى!");
    }
    
    // تحديث إحصائيات اللاعب
    const xpGained = isWinner ? 50 : 20;
    const pointsGained = isWinner ? 2 : 1;
    
    const updates = {
        xp: gameState.player.xp + xpGained,
        upgradePoints: gameState.player.upgradePoints + pointsGained
    };
    
    if (isWinner) {
        updates.wins = (gameState.player.wins || 0) + 1;
        updates.rating = (gameState.player.rating || 1000) + 25;
    } else {
        updates.losses = (gameState.player.losses || 0) + 1;
        updates.rating = Math.max(800, (gameState.player.rating || 1000) - 15);
    }
    
    // التحقق من الترقية للمستوى التالي
    if (updates.xp >= gameState.player.maxXP) {
        updates.level = gameState.player.level + 1;
        updates.xp = updates.xp - gameState.player.maxXP;
        updates.maxXP = gameState.player.maxXP * 1.5;
        updates.upgradePoints += 3; // نقاط إضافية عند الترقية
        showNotification(`🎊 رتبت للمستوى ${updates.level}!`);
    }
    
    // استعادة الصحة والتحمل
    updates.currentHP = gameState.player.maxHP;
    updates.currentStamina = gameState.player.maxStamina;
    
    // تحديث قاعدة البيانات
    database.ref('players/' + gameState.player.id).update(updates).then(() => {
        // تحديث حالة اللعبة المحلية
        Object.assign(gameState.player, updates);
        
        // عرض نتائج المعركة
        showBattleResults(match, isWinner, xpGained, pointsGained);
    });
}

// إنهاء المعركة مع الفائز
function endBattleWithWinner(winnerId) {
    database.ref('matches/' + gameState.battleId).update({
        status: 'finished',
        winner: winnerId,
        endTime: Date.now()
    });
}

// عرض نتائج المعركة
function showBattleResults(match, isWinner, xpGained, pointsGained) {
    document.getElementById('resultTitle').textContent = isWinner ? "🎉 فزت في المعركة!" : "💔 خسرت في المعركة";
    
    document.getElementById('resultPlayerName').textContent = gameState.player.name;
    document.getElementById('resultPlayerHP').textContent = `${gameState.player.currentHP}/${gameState.player.maxHP}`;
    
    const opponentDamage = isWinner ? 0 : 100 - gameState.player.currentHP;
    document.getElementById('resultOpponentName').textContent = gameState.opponent.name;
    document.getElementById('resultOpponentHP').textContent = isWinner ? "0/100" : `${gameState.opponent.currentHP}/${gameState.opponent.maxHP}`;
    
    document.getElementById('resultXP').textContent = xpGained;
    document.getElementById('resultPoints').textContent = pointsGained;
    
    document.getElementById('resultsModal').classList.add('active');
}

// ترك المعركة
function leaveBattle() {
    if (!gameState.inBattle) return;
    
    if (confirm("هل تريد حقاً ترك المعركة؟ سيتم احتسابها هزيمة.")) {
        endBattleWithWinner(gameState.opponent.id);
        showScreen('lobby');
    }
}

// تحديث شاشة الترقية
function updateUpgradeScreen() {
    if (!gameState.player) return;
    
    const p = gameState.player;
    
    // تحديث القيم الحالية
    document.getElementById('healthValue').textContent = p.maxHP;
    document.getElementById('attackUpgradeValue').textContent = p.attack;
    document.getElementById('defenseUpgradeValue').textContent = p.defense;
    document.getElementById('speedUpgradeValue').textContent = p.speed;
    document.getElementById('staminaUpgradeValue').textContent = p.maxStamina;
    
    // تحديث نقاط الترقية المتاحة
    document.getElementById('upgradePoints').textContent = p.upgradePoints;
    
    // تحديث المعاينة
    updateUpgradePreview();
    
    // إعادة تعيين الترقيات المؤقتة
    gameState.upgrades = {
        health: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        stamina: 0
    };
}

// معالجة الترقية
function handleUpgrade(stat) {
    if (!gameState.player) return;
    
    if (gameState.player.upgradePoints <= 0) {
        showNotification("ليس لديك نقاط ترقية كافية!");
        return;
    }
    
    gameState.upgrades[stat]++;
    gameState.player.upgradePoints--;
    
    // تحديث الواجهة
    document.getElementById('upgradePoints').textContent = gameState.player.upgradePoints;
    updateUpgradePreview();
}

// تحديث معاينة الترقية
function updateUpgradePreview() {
    const p = gameState.player;
    
    document.getElementById('previewHealth').textContent = p.maxHP + (gameState.upgrades.health * 10);
    document.getElementById('previewAttack').textContent = p.attack + (gameState.upgrades.attack * 2);
    document.getElementById('previewDefense').textContent = p.defense + (gameState.upgrades.defense * 1);
    document.getElementById('previewSpeed').textContent = p.speed + (gameState.upgrades.speed * 1);
    document.getElementById('previewStamina').textContent = p.maxStamina + (gameState.upgrades.stamina * 5);
}

// تطبيق الترقيات
function applyUpgrades() {
    if (!gameState.player) return;
    
    // التحقق من وجود ترقيات
    const hasUpgrades = Object.values(gameState.upgrades).some(value => value > 0);
    if (!hasUpgrades) {
        showNotification("لم تقم باختيار أي ترقيات!");
        return;
    }
    
    const updates = {
        maxHP: gameState.player.maxHP + (gameState.upgrades.health * 10),
        attack: gameState.player.attack + (gameState.upgrades.attack * 2),
        defense: gameState.player.defense + (gameState.upgrades.defense * 1),
        speed: gameState.player.speed + (gameState.upgrades.speed * 1),
        maxStamina: gameState.player.maxStamina + (gameState.upgrades.stamina * 5),
        currentHP: gameState.player.maxHP + (gameState.upgrades.health * 10),
        currentStamina: gameState.player.maxStamina + (gameState.upgrades.stamina * 5),
        upgradePoints: gameState.player.upgradePoints
    };
    
    // تحديث قاعدة البيانات
    database.ref('players/' + gameState.player.id).update(updates).then(() => {
        // تحديث حالة اللعبة المحلية
        Object.assign(gameState.player, updates);
        
        // إعادة تعيين الترقيات المؤقتة
        gameState.upgrades = {
            health: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            stamina: 0
        };
        
        // تحديث واجهة المستخدم
        updatePlayerUI();
        updateUpgradeScreen();
        
        showNotification("تم تطبيق الترقيات بنجاح!");
    });
}

// تحميل قائمة المتصدرين
function loadLeaderboard(type) {
    const leaderboardRef = database.ref('players').orderByChild(type);
    
    leaderboardRef.limitToLast(10).once('value').then((snapshot) => {
        const players = [];
        snapshot.forEach((childSnapshot) => {
            players.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        // ترتيب تنازلي
        players.sort((a, b) => b[type] - a[type]);
        
        // تحديث الواجهة
        const leaderboardList = document.getElementById('leaderboardList');
        leaderboardList.innerHTML = '';
        
        players.forEach((player, index) => {
            const rank = index + 1;
            const leaderboardItem = document.createElement('div');
            leaderboardItem.className = 'leaderboard-item';
            
            let statValue = '';
            let statLabel = '';
            
            switch (type) {
                case 'level':
                    statValue = player.level;
                    statLabel = 'المستوى';
                    break;
                case 'wins':
                    statValue = player.wins || 0;
                    statLabel = 'الانتصارات';
                    break;
                case 'rating':
                    statValue = player.rating || 1000;
                    statLabel = 'التقييم';
                    break;
            }
            
            leaderboardItem.innerHTML = `
                <div class="rank">${rank}</div>
                <div class="player-leaderboard-info">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=4A90E2&color=fff" alt="صورة اللاعب">
                    <div>
                        <h4>${player.name}</h4>
                        <p>مستوى ${player.level}</p>
                    </div>
                </div>
                <div class="leaderboard-stat">
                    <span class="stat-label">${statLabel}</span>
                    <span class="stat-value">${statValue}</span>
                </div>
            `;
            
            leaderboardList.appendChild(leaderboardItem);
        });
    });
}

// تهيئة بيانات اللعبة
function initializeGameData() {
    // تهيئة هياكل البيانات إذا لم تكن موجودة
    const structures = ['players', 'matches', 'matchmaking'];
    
    structures.forEach(structure => {
        database.ref(structure).once('value').then((snapshot) => {
            if (!snapshot.exists()) {
                database.ref(structure).set({});
            }
        });
    });
    
    // تنظيف المباريات القديمة
    cleanupOldMatches();
}

// تنظيف المباريات القديمة
function cleanupOldMatches() {
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    
    database.ref('matches').orderByChild('timestamp').endAt(oneHourAgo).once('value').then((snapshot) => {
        snapshot.forEach((matchSnapshot) => {
            matchSnapshot.ref.remove();
        });
    });
    
    // تنظيف البحث عن مباريات قديمة
    database.ref('matchmaking').orderByChild('timestamp').endAt(Date.now() - 30000).once('value').then((snapshot) => {
        snapshot.forEach((matchmakingSnapshot) => {
            matchmakingSnapshot.ref.remove();
        });
    });
}

// عرض الإشعارات
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// ترجمة أخطاء المصادقة
function getAuthErrorMessage(errorCode) {
    const messages = {
        'auth/email-already-in-use': 'هذا البريد الإلكتروني مستخدم بالفعل',
        'auth/invalid-email': 'البريد الإلكتروني غير صحيح',
        'auth/operation-not-allowed': 'عملية التسجيل غير مسموحة',
        'auth/weak-password': 'كلمة المرور ضعيفة جداً',
        'auth/user-disabled': 'هذا الحساب معطل',
        'auth/user-not-found': 'لا يوجد حساب مرتبط بهذا البريد',
        'auth/wrong-password': 'كلمة المرور غير صحيحة',
        'auth/too-many-requests': 'تم إجراء محاولات كثيرة، حاول لاحقاً'
    };
    
    return messages[errorCode] || 'حدث خطأ غير معروف';
}

// نظام الغرف الخاصة
function handleCreateRoom() {
    if (!gameState.player) return;
    
    const roomName = document.getElementById('roomName').value || "غرفتي";
    const roomType = document.getElementById('roomType').value;
    const roomPrivacy = document.getElementById('roomPrivacy').value;
    const maxPlayers = parseInt(document.getElementById('roomMaxPlayers').value);
    
    // إنشاء كود غرفة فريد
    const roomCode = generateRoomCode();
    
    const roomData = {
        name: roomName,
        type: roomType,
        privacy: roomPrivacy,
        maxPlayers: maxPlayers,
        ownerId: gameState.player.id,
        ownerName: gameState.player.name,
        players: {
            [gameState.player.id]: {
                id: gameState.player.id,
                name: gameState.player.name,
                level: gameState.player.level,
                ready: false,
                isOwner: true
            }
        },
        playerCount: 1,
        status: 'waiting',
        code: roomCode,
        createdAt: Date.now(),
        chat: []
    };
    
    // حفظ الغرفة في قاعدة البيانات
    const newRoomRef = database.ref('rooms').push();
    newRoomRef.set(roomData).then(() => {
        gameState.roomId = newRoomRef.key;
        gameState.roomCode = roomCode;
        gameState.isRoomOwner = true;
        gameState.currentRoom = roomData;
        
        // عرض كود الغرفة
        document.getElementById('roomCodeDisplay').textContent = roomCode;
        document.getElementById('roomCodeSection').style.display = 'block';
        
        // الانتقال إلى شاشة الغرفة بعد ثانيتين
        setTimeout(() => {
            showScreen('room');
            initializeRoom();
        }, 2000);
        
        showNotification(`تم إنشاء الغرفة! الكود: ${roomCode}`);
    });
}

function generateRoomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function updateRoomPreview() {
    const roomName = document.getElementById('roomName').value || "غرفتي";
    const roomType = document.getElementById('roomType').value;
    const roomPrivacy = document.getElementById('roomPrivacy').value;
    const maxPlayers = parseInt(document.getElementById('roomMaxPlayers').value);
    
    document.getElementById('previewRoomName').textContent = roomName;
    document.getElementById('previewRoomOwner').textContent = gameState.player ? gameState.player.name : "أنت";
    
    const typeNames = {
        duel: 'مبارزة 1 ضد 1',
        team: 'فرق (2 ضد 2)',
        free: 'حرة (حتى 4 لاعبين)'
    };
    
    document.getElementById('previewRoomType').textContent = typeNames[roomType] || roomType;
    document.getElementById('previewRoomPlayers').textContent = `1/${maxPlayers}`;
    document.getElementById('previewRoomPrivacy').textContent = roomPrivacy === 'private' ? 'خاصة' : 'عامة';
}

function handleJoinRoomByCode() {
    const roomCode = document.getElementById('roomCodeInput').value.trim().toUpperCase();
    const errorElement = document.getElementById('roomCodeError');
    
    if (!roomCode || roomCode.length !== 6) {
        errorElement.textContent = "كود الغرفة يجب أن يكون 6 أحرف";
        return;
    }
    
    errorElement.textContent = '';
    
    // البحث عن الغرفة بالكود
    database.ref('rooms').orderByChild('code').equalTo(roomCode).once('value').then((snapshot) => {
        if (!snapshot.exists()) {
            errorElement.textContent = "لم يتم العثور على غرفة بهذا الكود";
            return;
        }
        
        snapshot.forEach((roomSnapshot) => {
            const room = roomSnapshot.val();
            
            // التحقق من أن الغرفة ليست ممتلئة
            if (room.playerCount >= room.maxPlayers) {
                errorElement.textContent = "الغرفة ممتلئة";
                return;
            }
            
            // التحقق من أن اللاعب ليس بالفعل في الغرفة
            if (room.players[gameState.player.id]) {
                errorElement.textContent = "أنت بالفعل في هذه الغرفة";
                return;
            }
            
            // الانضمام للغرفة
            joinRoom(roomSnapshot.key, room);
        });
    });
}

function joinRoom(roomId, roomData) {
    const playerData = {
        id: gameState.player.id,
        name: gameState.player.name,
        level: gameState.player.level,
        ready: false,
        isOwner: false
    };
    
    // تحديث بيانات الغرفة
    const updates = {};
    updates[`players/${gameState.player.id}`] = playerData;
    updates['playerCount'] = roomData.playerCount + 1;
    
    database.ref('rooms/' + roomId).update(updates).then(() => {
        gameState.roomId = roomId;
        gameState.roomCode = roomData.code;
        gameState.isRoomOwner = false;
        gameState.currentRoom = roomData;
        
        showNotification(`تم الانضمام للغرفة: ${roomData.name}`);
        showScreen('room');
        initializeRoom();
    });
}

function initializeRoom() {
    if (!gameState.roomId) return;
    
    // تحديث معلومات الغرفة في الواجهة
    database.ref('rooms/' + gameState.roomId).once('value').then((snapshot) => {
        const room = snapshot.val();
        gameState.currentRoom = room;
        
        updateRoomUI(room);
        
        // بدء الاستماع لتحديثات الغرفة
        startRoomListener();
    });
}

function updateRoomUI(room) {
    document.getElementById('roomNameHeader').textContent = room.name;
    document.getElementById('roomCodeHeader').textContent = `الكود: ${room.code}`;
    document.getElementById('maxPlayers').textContent = room.maxPlayers;
    document.getElementById('roomStatus').textContent = room.status === 'waiting' ? 'في انتظار اللاعبين...' : 'جاري التحضير...';
    
    // تحديث قائمة اللاعبين
    updateRoomPlayersList(room.players);
    
    // تحديث عدد اللاعبين
    document.getElementById('playersCount').textContent = room.playerCount;
    
    // تحديث حالة زر البدء
    const startBtn = document.getElementById('startGameBtn');
    if (gameState.isRoomOwner && room.playerCount >= 2) {
        startBtn.disabled = false;
    } else {
        startBtn.disabled = true;
    }
    
    // تحديث زر الطرد (فقط لصاحب الغرفة)
    document.getElementById('kickPlayerBtn').disabled = !gameState.isRoomOwner;
    
    // تحديث الدردشة
    updateRoomChat(room.chat || []);
}

function updateRoomPlayersList(players) {
    const playersList = document.getElementById('roomPlayersList');
    playersList.innerHTML = '';
    
    Object.values(players).forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.className = `player-room-item ${player.isOwner ? 'owner' : ''}`;
        
        playerElement.innerHTML = `
            <div class="player-room-info">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=${player.isOwner ? 'FFD700' : '4A90E2'}&color=${player.isOwner ? '000' : 'fff'}" alt="صورة اللاعب">
                <div>
                    <h4>${player.name}</h4>
                    <div class="player-room-status">
                        <span>مستوى ${player.level}</span>
                        <span class="${player.ready ? 'player-ready' : 'player-not-ready'}">
                            ${player.ready ? 'جاهز ✓' : 'غير جاهز ✗'}
                        </span>
                        ${player.isOwner ? '<span>(صاحب الغرفة)</span>' : ''}
                    </div>
                </div>
            </div>
            <div class="player-actions">
                ${!player.isOwner && gameState.isOwner ? '<button class="btn-small btn-danger kick-player" data-id="' + player.id + '">طرد</button>' : ''}
            </div>
        `;
        
        playersList.appendChild(playerElement);
    });
    
    // إضافة مستمعي أحداث لأزرار الطرد
    document.querySelectorAll('.kick-player').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const playerId = e.target.dataset.id;
            kickPlayerFromRoom(playerId);
        });
    });
}

function updateRoomChat(chatMessages) {
    const chatContainer = document.getElementById('roomChatMessages');
    chatContainer.innerHTML = '';
    
    if (!chatMessages || chatMessages.length === 0) {
        chatContainer.innerHTML = '<div class="system-message">لا توجد رسائل بعد. ابدأ المحادثة!</div>';
        return;
    }
    
    chatMessages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.className = msg.type === 'system' ? 'system-message' : 'chat-message player-message';
        
        if (msg.type === 'system') {
            messageElement.textContent = msg.text;
        } else {
            messageElement.innerHTML = `
                <div class="sender">${msg.sender}:</div>
                <div class="message-text">${msg.text}</div>
                <div class="message-time">${formatTime(msg.timestamp)}</div>
            `;
        }
        
        chatContainer.appendChild(messageElement);
    });
    
    // التمرير للأسفل
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function startRoomListener() {
    if (gameState.roomListener) {
        database.ref('rooms/' + gameState.roomId).off('value', gameState.roomListener);
    }
    
    gameState.roomListener = database.ref('rooms/' + gameState.roomId).on('value', (snapshot) => {
        if (!snapshot.exists()) {
            // الغرفة حذفت
            showNotification("تم حذف الغرفة");
            handleLeaveRoom();
            return;
        }
        
        const room = snapshot.val();
        gameState.currentRoom = room;
        
        updateRoomUI(room);
        
        // إذا بدأت المعركة
        if (room.status === 'battle' && room.battleId && !gameState.inBattle) {
            joinRoomBattle(room.battleId);
        }
    });
}

function sendRoomChatMessage() {
    const input = document.getElementById('roomChatInput');
    const message = input.value.trim();
    
    if (!message || !gameState.roomId) return;
    
    const chatMessage = {
        type: 'player',
        sender: gameState.player.name,
        senderId: gameState.player.id,
        text: message,
        timestamp: Date.now()
    };
    
    // إضافة الرسالة للدردشة
    const chatRef = database.ref('rooms/' + gameState.roomId + '/chat');
    chatRef.push(chatMessage);
    
    input.value = '';
}

function kickPlayerFromRoom(playerId) {
    if (!gameState.isRoomOwner || !gameState.roomId) return;
    
    if (confirm("هل تريد طرد هذا اللاعب من الغرفة؟")) {
        const updates = {};
        updates[`players/${playerId}`] = null;
        updates['playerCount'] = gameState.currentRoom.playerCount - 1;
        
        // إضافة رسالة نظام
        const systemMessage = {
            type: 'system',
            text: `تم طرد اللاعب من الغرفة`,
            timestamp: Date.now()
        };
        
        database.ref('rooms/' + gameState.roomId).update(updates).then(() => {
            database.ref('rooms/' + gameState.roomId + '/chat').push(systemMessage);
        });
    }
}

function handleLeaveRoom() {
    if (!gameState.roomId) {
        showScreen('lobby');
        return;
    }
    
    if (confirm("هل تريد مغادرة الغرفة؟")) {
        if (gameState.isRoomOwner) {
            // صاحب الغرفة يغادر، حذف الغرفة
            database.ref('rooms/' + gameState.roomId).remove().then(() => {
                showNotification("تم حذف الغرفة");
                cleanupRoomState();
                showScreen('lobby');
            });
        } else {
            // لاعب عادي يغادر
            const updates = {};
            updates[`players/${gameState.player.id}`] = null;
            updates['playerCount'] = gameState.currentRoom.playerCount - 1;
            
            // إضافة رسالة نظام
            const systemMessage = {
                type: 'system',
                text: `${gameState.player.name} غادر الغرفة`,
                timestamp: Date.now()
            };
            
            database.ref('rooms/' + gameState.roomId).update(updates).then(() => {
                database.ref('rooms/' + gameState.roomId + '/chat').push(systemMessage);
                cleanupRoomState();
                showNotification("غادرت الغرفة");
                showScreen('lobby');
            });
        }
    }
}

function cleanupRoomState() {
    if (gameState.roomListener) {
        database.ref('rooms/' + gameState.roomId).off('value', gameState.roomListener);
        gameState.roomListener = null;
    }
    
    gameState.inRoom = false;
    gameState.roomId = null;
    gameState.roomCode = null;
    gameState.isRoomOwner = false;
    gameState.roomPlayers = [];
    gameState.currentRoom = null;
}

function startRoomGame() {
    if (!gameState.isRoomOwner || !gameState.roomId) return;
    
    const room = gameState.currentRoom;
    
    // التحقق من أن هناك لاعبين على الأقل
    if (room.playerCount < 2) {
        showNotification("تحتاج إلى لاعبين على الأقل لبدء اللعبة");
        return;
    }
    
    // التحقق من أن جميع اللاعبين جاهزون (اختياري)
    const allReady = Object.values(room.players).every(player => player.ready);
    
    if (!allReady) {
        if (!confirm("بعض اللاعبين ليسوا جاهزين. هل تريد بدء اللعبة على أي حال؟")) {
            return;
        }
    }
    
    // إنشاء معركة جديدة
    const battleData = {
        type: 'room',
        roomId: gameState.roomId,
        players: room.players,
        status: 'waiting',
        createdAt: Date.now()
    };
    
    const newBattleRef = database.ref('battles').push();
    newBattleRef.set(battleData).then(() => {
        // تحديث حالة الغرفة
        database.ref('rooms/' + gameState.roomId).update({
            status: 'battle',
            battleId: newBattleRef.key
        });
        
        // إضافة رسالة نظام
        const systemMessage = {
            type: 'system',
            text: `بدأت المعركة!`,
            timestamp: Date.now()
        };
        
        database.ref('rooms/' + gameState.roomId + '/chat').push(systemMessage);
        
        // الانتقال للمعركة
        gameState.battleId = newBattleRef.key;
        joinRoomBattle(newBattleRef.key);
    });
}

function joinRoomBattle(battleId) {
    database.ref('battles/' + battleId).once('value').then((snapshot) => {
        const battle = snapshot.val();
        
        if (!battle) {
            showNotification("المعركة لم تعد موجودة");
            return;
        }
        
        // إعداد معركة خاصة بالغرفة
        initializeRoomBattle(battle);
    });
}

function initializeRoomBattle(battle) {
    gameState.inBattle = true;
    
    // العثور على الخصم (أول لاعب ليس أنت)
    const players = Object.values(battle.players);
    const opponent = players.find(p => p.id !== gameState.player.id);
    
    if (opponent) {
        gameState.opponent = opponent;
        
        // تحديث واجهة المعركة
        document.getElementById('player1Name').textContent = gameState.player.name;
        document.getElementById('player1Level').textContent = gameState.player.level;
        document.getElementById('player1Weapon').textContent = gameState.player.weapon.name;
        
        document.getElementById('player2Name').textContent = opponent.name;
        document.getElementById('player2Level').textContent = opponent.level;
        document.getElementById('player2Weapon').textContent = "سلاح غير معروف";
        
        // بدء المؤقت
        let battleTime = 0;
        const timerElement = document.getElementById('battleTimer');
        gameState.battleTimer = setInterval(() => {
            battleTime++;
            const minutes = Math.floor(battleTime / 60);
            const seconds = battleTime % 60;
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
        
        showScreen('battle');
        showNotification("بدأت المعركة في الغرفة!");
    }
}

function copyRoomCode() {
    const roomCode = document.getElementById('roomCodeDisplay').textContent;
    copyToClipboard(roomCode);
    showNotification("تم نسخ كود الغرفة!");
}

function copyRoomCodeHeader() {
    const roomCode = gameState.roomCode;
    if (roomCode) {
        copyToClipboard(roomCode);
        showNotification("تم نسخ كود الغرفة!");
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// تحديث قواعد Firebase للغرف
function updateFirebaseRules() {
    // قواعد الأمان المحدثة للغرف
    const rules = {
        "rules": {
            "players": {
                "$uid": {
                    ".read": "auth != null && auth.uid == $uid",
                    ".write": "auth != null && auth.uid == $uid"
                }
            },
            "matches": {
                ".read": "auth != null",
                ".write": "auth != null"
            },
            "matchmaking": {
                ".read": "auth != null",
                ".write": "auth != null"
            },
            "rooms": {
                ".read": "auth != null",
                ".write": "auth != null",
                "$roomId": {
                    ".validate": "newData.hasChildren(['name', 'code', 'ownerId'])",
                    "players": {
                        "$playerId": {
                            ".validate": "newData.hasChildren(['id', 'name', 'level'])"
                        }
                    }
                }
            },
            "battles": {
                ".read": "auth != null",
                ".write": "auth != null"
            }
        }
    };
    
    console.log("قم بتحديث قواعد Firebase في وحدة التحكم:");
    console.log(JSON.stringify(rules, null, 2));
}

،
