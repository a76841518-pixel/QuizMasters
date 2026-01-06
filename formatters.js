export function formatTime(seconds) {
    if (seconds < 0) seconds = 0;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatDate(date) {
    if (!date) return 'غير محدد';
    
    try {
        let dateObj;
        if (date instanceof Date) {
            dateObj = date;
        } else if (date.toDate) {
            dateObj = date.toDate();
        } else {
            dateObj = new Date(date);
        }
        
        return dateObj.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return 'غير محدد';
    }
}

export function formatPoints(points) {
    if (!points) return '0';
    
    if (points >= 1000000) {
        return (points / 1000000).toFixed(1) + 'M';
    }
    if (points >= 1000) {
        return (points / 1000).toFixed(1) + 'K';
    }
    return points.toString();
}

export function getChallengeTypeName(type) {
    const names = {
        individual: 'تحدي فردي',
        speed: 'تحدي السرعة',
        time: 'تحدي الوقت',
        comprehensive: 'تحدي شامل',
        private: 'تحدي خاص'
    };
    return names[type] || type;
}

export function getCategoryName(category) {
    const names = {
        science: 'العلوم',
        history: 'التاريخ',
        geography: 'الجغرافيا',
        sports: 'الرياضة',
        art: 'الفن',
        entertainment: 'الترفيه',
        technology: 'التكنولوجيا',
        general: 'عامة'
    };
    return names[category] || category;
}

export function getDifficultyName(difficulty) {
    const names = {
        easy: 'سهل',
        medium: 'متوسط',
        hard: 'صعب',
        mixed: 'مختلط'
    };
    return names[difficulty] || difficulty;
}

export function formatDuration(minutes) {
    if (minutes < 60) {
        return `${minutes} دقيقة`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
        return `${hours} ساعة`;
    }
    return `${hours} ساعة و ${remainingMinutes} دقيقة`;
}