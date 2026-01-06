let AppState = {
    currentUser: null,
    userData: null,
    isAdmin: false,
    currentPage: 'dashboard',
    challenges: [],
    questions: [],
    friends: [],
    notifications: [],
    leaderboard: [],
    tournaments: [],
    shopItems: [],
    friendRequests: [],
    purchases: []
};

const stateListeners = [];

export function getAppState() {
    return { ...AppState };
}

export function updateAppState(newState) {
    AppState = { ...AppState, ...newState };
    notifyStateChange();
}

export function updateAppStateProperty(key, value) {
    AppState = { ...AppState, [key]: value };
    notifyStateChange();
}

export function subscribeToStateChange(listener) {
    stateListeners.push(listener);
}

function notifyStateChange() {
    stateListeners.forEach(listener => listener(AppState));
}

export function resetAppState() {
    AppState = {
        currentUser: null,
        userData: null,
        isAdmin: false,
        currentPage: 'dashboard',
        challenges: [],
        questions: [],
        friends: [],
        notifications: [],
        leaderboard: [],
        tournaments: [],
        shopItems: [],
        friendRequests: [],
        purchases: []
    };
    notifyStateChange();
}

export function getCurrentUser() {
    return AppState.currentUser;
}

export function getUserData() {
    return AppState.userData;
}

export function isAdmin() {
    return AppState.isAdmin;
}

export function getCurrentPage() {
    return AppState.currentPage;
}

export function getChallenges() {
    return [...AppState.challenges];
}

export function getFriends() {
    return [...AppState.friends];
}

export function getNotifications() {
    return [...AppState.notifications];
}

export function getLeaderboard() {
    return [...AppState.leaderboard];
}

export function getTournaments() {
    return [...AppState.tournaments];
}

export function getShopItems() {
    return [...AppState.shopItems];
}