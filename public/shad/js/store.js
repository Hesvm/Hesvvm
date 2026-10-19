// State Management for Shaad Rokh Web App
const STORAGE_KEY = 'shaad_rokh_shad_v110';

const defaultProfileState = {
  viewMode: 'owner', // 'owner' (پروفایل من)
  theme: 'default',
  user: {
    name: 'حسام موسوی‌زاده',
    grade: 'دهم ریاضی',
    school: 'دبیرستان ماندگار البرز',
    level: 3,
    credits: 240,
    avatar: '<img src="./assets/avatar.png" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" alt="آواتار" />',
    vibe: '⚡ پر انرژی',
    birthdate: '۲۴ مرداد ۱۳۸۷',
    relation: 'دوست نزدیک',
    mutualsCount: 14,
    mutualFriends: [
      { name: 'کسری', color: '#6366f1', initial: 'ک' },
      { name: 'پرهام', color: '#10b981', initial: 'پ' },
      { name: 'امیرعلی', color: '#f59e0b', initial: 'ا' }
    ]
  },
  bio: 'علاقه‌مند به نجوم و برنامه‌نویسی پایتون 🪐 دنبال تیم برای شرکت در کاپ فیفا شاد و المپیاد نجوم!',
  mbti: {
    code: 'INTJ',
    title: 'معمار و استراتژیست',
    matchPct: 'فقط ۲٪ دانش‌آموزان'
  },
  learningStyle: {
    code: 'دیداری و مهارتی',
    title: 'تصویر و تمرین عملی',
    matchPct: 'همانند ۳۰٪ دانش‌آموزان'
  },
  favoriteClubs: [
    { id: 'real', name: 'رئال مادرید', logo: './assets/real_madrid.svg', color: '#3b82f6' },
    { id: 'perspolis', name: 'پرسپولیس', logo: './assets/persepolis.svg', color: '#dc2626' }
  ],
  passions: [
    { id: 1, text: 'برنامه‌نویسی پایتون 🐍' },
    { id: 2, text: 'نجوم و کیهان‌شناسی 🔭' },
    { id: 3, text: 'کافکاییست ☕' },
    { id: 4, text: 'فیفا / اف‌سی ۲۵ 🎮' },
    { id: 5, text: 'بسکتبال خیابانی 🏀' }
  ],
  roleModels: [
    { id: 1, name: 'ایلان ماسک', field: 'تک و فضانوردی', avatar: './assets/model1.png' },
    { id: 2, name: 'حکیم فردوسی', field: 'ادبیات و حماسه', avatar: './assets/model2.png' },
    { id: 3, name: 'لیونل مسی', field: 'اسطوره فوتبال', avatar: './assets/model3.png' }
  ],
  books: [
    { id: 1, title: 'شازده کوچولو', author: 'آنتوان دو سنت‌اگزوپری', cover: './assets/book_little_prince.jpg' },
    { id: 2, title: 'مغازه‌ی خودکشی', author: 'ژان تولی', cover: './assets/book_suicide_shop.jpg' },
    { id: 3, title: 'چشم‌هایش', author: 'بزرگ علوی', cover: './assets/book_cheshmhayash.jpg' },
    { id: 4, title: 'سووشون', author: 'سیمین دانشور', cover: './assets/book_savushun.jpg' }
  ],
  games: [
    { id: 1, title: 'Red Dead Redemption 2', author: 'اکشن ماجراجویی', cover: './assets/game1.jpg' },
    { id: 2, title: 'GTA V', author: 'جهان‌باز', cover: './assets/game2.png' }
  ],
  movies: [
    { id: 1, title: 'Interstellar', author: 'علمی-تخیلی', cover: './assets/movie1.jpg' },
    { id: 2, title: 'Fight Club', author: 'درام روان‌شناختی', cover: './assets/movie2.jpg' }
  ],
  nowListening: {
    title: 'رادیو دیو: رویای شب تابستانی',
    category: 'پادکست ادبیات و موزیک',
    isPlaying: false
  },
  futureGoal: {
    title: 'مهندسی کامپیوتر و هوش‌مصنوعی',
    target: 'دانشگاه تهران یا صنعتی شریف',
    horizon: 'هدف ۱۴۱۰'
  },
  radarDimensions: [
    { label: 'خودشناسی', score: 85 },
    { label: 'دانش', score: 92 },
    { label: 'روابط', score: 65 },
    { label: 'هویت اجتماعی', score: 75 },
    { label: 'مسئولیت', score: 80 }
  ],
  attendance: {
    monthName: 'مهر ۱۴۰۴',
    presentDays: [1, 2, 3, 4, 5,  8, 9, 11, 12,  15, 16, 17, 18, 19,  22, 23, 24, 25, 26],
    absentDays: [10],
    offDays: [6, 7, 13, 14, 20, 21, 27, 28],
    currentStreak: 5,
    bestStreak: 12,
    today: 26
  },
  orbitNetwork: {
    orbit1: [
      { id: 1, name: 'کسری رضایی', avatar: '🐧', avatarImg: './assets/student_boy_1.jpg', relation: 'صمیمی‌ترین رفیق', hours: 7.2, mutualActivities: 34, category: 'olympiad', bio: 'دبیرستان البرز • کانون نجوم' },
      { id: 2, name: 'پرهام شمس', avatar: '🐼', avatarImg: './assets/student_boy_2.jpg', relation: 'هم‌تیمی المپیاد', hours: 5.8, mutualActivities: 26, category: 'olympiad', bio: 'دبیرستان البرز • المپیاد کامپیوتر' },
      { id: 3, name: 'امیرعلی افشار', avatar: '🦊', avatarImg: './assets/student_boy_3.jpg', relation: 'کاپیتان فوتبال و بازی', hours: 4.5, mutualActivities: 19, category: 'gaming', bio: 'دبیرستان البرز • تیم ورزش' },
      { id: 4, name: 'کیان صفوی', avatar: '🐙', avatarImg: './assets/student_boy_4.jpg', relation: 'هم‌میزی کلاس', hours: 3.9, mutualActivities: 16, category: 'study', bio: 'دبیرستان البرز • پایه دهم ریاضی' }
    ],
    orbit2: [
      { id: 5, name: 'بردیا صادقی', avatar: '🐻', avatarImg: './assets/student_boy_5.jpg', relation: 'بسکتبال خیابانی', hours: 3.2, mutualActivities: 14, category: 'gaming', bio: 'دبیرستان البرز • پایه دهم' },
      { id: 6, name: 'آرش علوی', avatar: '🦉', avatarImg: './assets/student_boy_6.jpg', relation: 'هم‌پای شطرنج', hours: 2.8, mutualActivities: 11, category: 'gaming', bio: 'دبیرستان البرز • کانون شطرنج' },
      { id: 7, name: 'نوید رضوانی', avatar: '🦁', avatarImg: './assets/student_boy_1.jpg', relation: 'هم‌گروهی آزمایشگاه', hours: 2.5, mutualActivities: 9, category: 'study', bio: 'دبیرستان البرز • پایه دهم' },
      { id: 8, name: 'سهراب محمدی', avatar: '🐯', avatarImg: './assets/student_boy_2.jpg', relation: 'همیار پایتون', hours: 2.1, mutualActivities: 8, category: 'olympiad', bio: 'دبیرستان البرز • کانون کدنویسی' }
    ],
    orbit3: [
      { id: 9, name: 'امیرحسین پارسا', avatar: '🐬', avatarImg: './assets/student_boy_3.jpg', relation: 'انجمن علمی', hours: 1.8, mutualActivities: 7, category: 'study', bio: 'دبیرستان البرز • پایه دهم' },
      { id: 10, name: 'مانی کمالی', avatar: '🦅', avatarImg: './assets/student_boy_4.jpg', relation: 'باشگاه کتابخوانی', hours: 1.5, mutualActivities: 6, category: 'art', bio: 'دبیرستان البرز • کانون ادبیات' },
      { id: 11, name: 'پویا راد', avatar: '🐺', avatarImg: './assets/student_boy_5.jpg', relation: 'تیم تنیس روی میز', hours: 1.3, mutualActivities: 5, category: 'gaming', bio: 'دبیرستان البرز • پایه دهم' },
      { id: 12, name: 'سینا خلیلی', avatar: '🦄', avatarImg: './assets/student_boy_6.jpg', relation: 'هم‌پای ریاضی', hours: 1.1, mutualActivities: 4, category: 'study', bio: 'دبیرستان البرز • پایه دهم' }
    ],
    orbit4: [
      { id: 13, name: 'شایان فتاحی', avatar: '🐧', avatarImg: null, relation: 'آشنای مدرسه', hours: 0.8, mutualActivities: 3, category: 'study', bio: 'دبیرستان البرز • دهم ریاضی' },
      { id: 14, name: 'دانیال کریمی', avatar: '🦁', avatarImg: null, relation: 'عضو کانون رباتیک', hours: 0.6, mutualActivities: 2, category: 'study', bio: 'دبیرستان البرز • دهم ریاضی' }
    ]
  },
  leaderboard: [
    { rank: 1, name: 'کیان صفوی', subtitle: 'دبیرستان البرز • دهم ریاضی', score: 2850, avatar: './assets/student_boy_4.jpg', bg: '#fef08a' },
    { rank: 2, name: 'پرهام شمس', subtitle: 'دبیرستان البرز • دهم ریاضی', score: 2610, avatar: './assets/student_boy_2.jpg', bg: '#fed7aa' },
    { rank: 3, name: 'کسری رضایی', subtitle: 'دبیرستان البرز • دهم ریاضی', score: 2490, avatar: './assets/student_boy_1.jpg', bg: '#bfdbfe' },
    { rank: 4, name: 'امیرعلی افشار', subtitle: 'دبیرستان البرز • دهم تجربی', score: 2310, avatar: './assets/student_boy_3.jpg', bg: '#e9d5ff' },
    { rank: 5, name: 'بردیا صادقی', subtitle: 'دبیرستان البرز • دهم ریاضی', score: 2180, avatar: './assets/student_boy_5.jpg', bg: '#f1f5f9' },
    { rank: 6, name: 'آرش علوی', subtitle: 'دبیرستان البرز • دهم تجربی', score: 1950, avatar: './assets/student_boy_6.jpg', bg: '#f1f5f9' },
    { rank: 42, name: 'حسام موسوی‌زاده (شما)', subtitle: 'دبیرستان البرز • دهم ریاضی', score: 1420, avatar: './assets/avatar.png', bg: '#dcfce7', isMe: true }
  ],
  badges: [
    { 
      id: 1, 
      title: 'المپیاد استانی',
      image: './assets/badge_olympiad.png', 
      sub: 'رتبه برتر مرحله یک کامپیوتر', 
      type: 'gold', 
      tierName: 'طلایی', 
      earned: true, 
      progress: '۱۰۰٪',
      ratio: 'مرحله ۱ / ۱',
      date: '۱۴ مهر ۱۴۰۴',
      reward: '+۱۰۰ امتیاز فعالیت',
      description: 'کسب تراز بالای ۸۵۰۰ در آزمون جامع المپیاد کامپیوتر قطب ۴ تهران'
    },
    { 
      id: 2, 
      title: 'کاشف کاوش',
      image: './assets/badge_science.png', 
      sub: 'حل ۳۰ چالش علمی پژوهشی', 
      type: 'emerald', 
      tierName: 'زمردی', 
      earned: true, 
      progress: '۱۰۰٪',
      ratio: '۳۰ / ۳۰',
      date: '۲ مهر ۱۴۰۴',
      reward: '+۷۵ امتیاز فعالیت',
      description: 'ثبت کامل نتایج آزمایشگاه فیزیک و شیمی در بخش پژوهش‌های شاد'
    },
    { 
      id: 3, 
      title: 'پیوستگی فعال',
      image: './assets/badge_streak.png', 
      sub: '۵ روز پیوستگی متوالی در مدرسه', 
      type: 'ruby', 
      tierName: 'یاقوتی', 
      earned: true, 
      progress: '۱۰۰٪',
      ratio: '۵ / ۵ روز',
      date: 'دیروز',
      reward: '+۵۰ امتیاز فعالیت',
      description: 'ورود مستمر و تکمیل تکالیف روزانه به مدت ۵ روز پیاپی'
    },
    { 
      id: 4, 
      title: 'کتاب‌خوان شاد',
      image: './assets/badge_book.png', 
      sub: 'مطالعه ۳ از ۵ کتاب ترم پاییز', 
      type: 'sapphire', 
      tierName: 'یاقوت کبود', 
      earned: false, 
      progress: '۶۰٪',
      ratio: '۳ / ۵ کتاب',
      remaining: '۲ کتاب دیگر تا دریافت مدال',
      reward: '+۸۰ امتیاز فعالیت',
      description: 'ثبت خلاصه و یادداشت برای ۵ عنوان کتاب از فهرست پیشنهادی دبیرستان'
    },
    { 
      id: 5, 
      title: 'قهرمان حل مسأله',
      image: './assets/badge_math.png', 
      sub: 'حل ۶۵ از ۱۰۰ تمرین هوش ریاضی', 
      type: 'amethyst', 
      tierName: 'الماس بنفش', 
      earned: false, 
      progress: '۶۵٪',
      ratio: '۶۵ / ۱۰۰ تمرین',
      remaining: '۳۵ تمرین دیگر تا دریافت مدال',
      reward: '+۱۲۰ امتیاز فعالیت',
      description: 'حل تمرین‌های هفتگی لیگ ریاضی و دریافت بازخورد مثبت از دبیر'
    },
    { 
      id: 6, 
      title: 'سحرخیز البرز',
      image: './assets/badge_morning.png', 
      sub: 'حضور منظم قبل از ساعت ۷:۴۵', 
      type: 'amber', 
      tierName: 'کهربایی', 
      earned: false, 
      progress: '۲۰٪',
      ratio: '۴ / ۲۰ روز',
      remaining: '۱۶ روز دیگر تا دریافت مدال',
      reward: '+۴۰ امتیاز فعالیت',
      description: 'ثبت ورود بموقع به مدرسه در ماه مهر و آبان بدون تأخیر'
    }
  ]
};

class Store {
  constructor() {
    this.state = this.loadState();
    this.listeners = [];
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.orbitNetwork) {
          const defaults = defaultProfileState.orbitNetwork;
          const allDefaultFriends = Object.values(defaults).flat();
          ['orbit1', 'orbit2', 'orbit3', 'orbit4'].forEach(k => {
            if (Array.isArray(parsed.orbitNetwork[k])) {
              parsed.orbitNetwork[k] = parsed.orbitNetwork[k].map(f => {
                const defFriend = allDefaultFriends.find(df => df.id === f.id);
                return {
                  hours: defFriend ? defFriend.hours : 2.0,
                  mutualActivities: defFriend ? defFriend.mutualActivities : 10,
                  category: defFriend ? defFriend.category : 'study',
                  avatarImg: defFriend ? defFriend.avatarImg : null,
                  bio: defFriend ? defFriend.bio : 'دانش‌آموز شاد',
                  ...f
                };
              });
            }
          });
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to load state from localStorage', e);
    }
    return JSON.parse(JSON.stringify(defaultProfileState));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save state to localStorage', e);
    }
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.saveState();
    this.listeners.forEach(l => l(this.state));
  }

  updateProfile(updates) {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  updateUserInfo(userUpdates) {
    this.state.user = { ...this.state.user, ...userUpdates };
    this.notify();
  }

  addClub(club) {
    if (!this.state.favoriteClubs.find(c => c.name === club.name)) {
      this.state.favoriteClubs.push(club);
      this.notify();
    }
  }

  removeClub(clubId) {
    this.state.favoriteClubs = this.state.favoriteClubs.filter(c => c.id !== clubId);
    this.notify();
  }

  addPassion(text) {
    if (text.trim()) {
      this.state.passions.push({ id: Date.now(), text: text.trim() });
      this.notify();
    }
  }

  removePassion(id) {
    this.state.passions = this.state.passions.filter(p => p.id !== id);
    this.notify();
  }

  toggleMusicPlay() {
    this.state.nowListening.isPlaying = !this.state.nowListening.isPlaying;
    this.notify();
  }

  setViewMode(mode) {
    this.state.viewMode = mode;
    this.notify();
  }

  toggleTheme() {
    this.state.theme = this.state.theme === 'light' ? 'default' : 'light';
    this.notify();
  }

  moveFriendOrbit(friendId, targetOrbitKey, newRelation = null) {
    let foundFriend = null;
    const net = this.state.orbitNetwork;
    ['orbit1', 'orbit2', 'orbit3', 'orbit4'].forEach(key => {
      const idx = net[key].findIndex(f => f.id === Number(friendId));
      if (idx !== -1) {
        foundFriend = net[key].splice(idx, 1)[0];
      }
    });

    if (foundFriend && net[targetOrbitKey]) {
      if (newRelation) {
        foundFriend.relation = newRelation;
      }
      net[targetOrbitKey].push(foundFriend);
      this.notify();
      return foundFriend;
    }
    return null;
  }

  updateFriendRole(friendId, newRelation) {
    const net = this.state.orbitNetwork;
    let foundFriend = null;
    ['orbit1', 'orbit2', 'orbit3', 'orbit4'].forEach(key => {
      const friend = net[key].find(f => f.id === Number(friendId));
      if (friend) {
        friend.relation = newRelation;
        foundFriend = friend;
      }
    });
    if (foundFriend) {
      this.notify();
      return foundFriend;
    }
    return null;
  }

  getFriend(friendId) {
    const net = this.state.orbitNetwork;
    for (const key of ['orbit1', 'orbit2', 'orbit3', 'orbit4']) {
      const friend = net[key].find(f => f.id === Number(friendId));
      if (friend) return { ...friend, orbitKey: key };
    }
    return null;
  }

  resetToDefault() {
    this.state = JSON.parse(JSON.stringify(defaultProfileState));
    this.notify();
  }
}

window.rokhStore = new Store();
