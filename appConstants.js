export const APP_CONSTANTS = {
    LEVELS: [
        { level: 1, xp: 0 },
        { level: 2, xp: 100 },
        { level: 3, xp: 250 },
        { level: 4, xp: 500 },
        { level: 5, xp: 850 },
        { level: 6, xp: 1300 },
        { level: 7, xp: 1850 },
        { level: 8, xp: 2500 },
        { level: 9, xp: 3250 },
        { level: 10, xp: 4100 },
        { level: 11, xp: 5050 },
        { level: 12, xp: 6100 },
        { level: 13, xp: 7250 },
        { level: 14, xp: 8500 },
        { level: 15, xp: 9850 },
        { level: 16, xp: 11300 },
        { level: 17, xp: 12850 },
        { level: 18, xp: 14500 },
        { level: 19, xp: 16250 },
        { level: 20, xp: 18100 }
    ],
    
    DIFFICULTY_POINTS: {
        easy: 10,
        medium: 20,
        hard: 30
    },
    
    CHALLENGE_TYPES: {
        INDIVIDUAL: 'individual',
        SPEED: 'speed',
        TIME: 'time',
        COMPREHENSIVE: 'comprehensive',
        PRIVATE: 'private'
    },
    
    CHALLENGE_TIMES: {
        individual: 300,
        speed: 180,
        time: 240,
        comprehensive: 300,
        private: 300
    },
    
    QUESTION_CATEGORIES: [
        'science', 'history', 'geography', 'sports',
        'art', 'entertainment', 'technology', 'general'
    ],
    
    TOURNAMENT_TYPES: {
        SPEED: 'speed',
        SURVIVAL: 'survival',
        MARATHON: 'marathon',
        EXPERT: 'expert',
        TEAM: 'team'
    },
    
    SHOP_CATEGORIES: {
        POWERUPS: 'powerups',
        APPEARANCE: 'appearance',
        BOOSTERS: 'boosters',
        SPECIAL: 'special'
    },
    
    NOTIFICATION_TYPES: {
        WELCOME: 'welcome',
        WIN: 'win',
        FRIEND_REQUEST: 'friend_request',
        CHALLENGE: 'challenge',
        TOURNAMENT: 'tournament',
        ACHIEVEMENT: 'achievement',
        SYSTEM: 'system'
    }
};

export const DEFAULT_USER_SETTINGS = {
    sound: true,
    music: true,
    notifications: {
        challenges: true,
        friends: true,
        tournaments: true,
        achievements: true
    },
    language: 'ar',
    theme: 'light',
    volume: 50,
    vibration: true,
    gameAlerts: true,
    defaultDifficulty: 'medium',
    privacy: {
        showStatus: true,
        publicProfile: false,
        autoAcceptFriends: false,
        messagePrivacy: 'friends'
    }
};

export const DEFAULT_SHOP_ITEMS = [
    {
        id: 'xp-booster-1',
        name: 'معزز الخبرة (1 يوم)',
        description: 'احصل على ضعف الخبرة لمدة 24 ساعة',
        price: 500,
        category: 'boosters',
        icon: 'fas fa-chart-line',
        rarity: 'rare',
        duration: 1,
        effect: '+100% خبرة'
    },
    {
        id: 'points-booster',
        name: 'معزز النقاط',
        description: 'احصل على نقاط إضافية في كل فوز',
        price: 750,
        category: 'boosters',
        icon: 'fas fa-coins',
        rarity: 'epic',
        duration: 3,
        effect: '+50% نقاط'
    },
    {
        id: 'time-extension',
        name: 'تمديد الوقت',
        description: 'احصل على 5 ثواني إضافية لكل سؤال',
        price: 300,
        category: 'powerups',
        icon: 'fas fa-clock',
        rarity: 'common',
        effect: '+5 ثواني'
    }
];