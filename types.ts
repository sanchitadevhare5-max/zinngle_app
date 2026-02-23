export interface Host {
  id: string;
  name: string;
  username: string;
  bio: string;
  tags: string[];
  avatarUrl: string;
  coverUrl: string;
  pricePerMinute: number;
  audioPricePerMinute: number;
  status: 'online' | 'offline' | 'busy';
  rating: number;
  followers: string;
  persona: string;
  distance?: number;
  age?: number;
}

export interface Gift {
  id: string;
  name: string;
  icon: string;
  cost: number;
  category: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'host';
  text: string;
  timestamp: number;
}

export interface ChatSession {
    id: string;
    hostId: string;
    lastMessage: string;
    timestamp: number;
    unread: number;
}

export interface Review {
    id: string;
    hostId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    timestamp: number;
}

export interface GiftHistoryItem {
    id: string;
    giftId: string;
    senderId: string;
    receiverId: string;
    timestamp: number;
    cost: number;
}

export enum ViewState {
    // Core States
    SPLASH = 'SPLASH',
    HOME = 'HOME',
    SEARCH = 'SEARCH',
    CHAT_LIST = 'CHAT_LIST',
    CALL_HISTORY = 'CALL_HISTORY',
    PROFILE = 'PROFILE',
    HOST_DETAILS = 'HOST_DETAILS',
    CHAT = 'CHAT',
    LIVE_CALL = 'LIVE_CALL',
    WALLET = 'WALLET',
    GIFT_STORE = 'GIFT_STORE',
    GIFT_HISTORY = 'GIFT_HISTORY',
    REVIEWS = 'REVIEWS',
    RANDOM_MATCH = 'RANDOM_MATCH',

    // System States
    LOGGING_OUT = 'LOGGING_OUT',
    NO_INTERNET = 'NO_INTERNET',
    MAINTENANCE = 'MAINTENANCE',
    UPDATE_REQUIRED = 'UPDATE_REQUIRED',

    // Auth Flow
    LANGUAGE_SELECT = 'LANGUAGE_SELECT',
    WELCOME_INTRO = 'WELCOME_INTRO',
    AUTH_METHOD = 'AUTH_METHOD',
    LOGIN_PHONE = 'LOGIN_PHONE',
    LOGIN_EMAIL = 'LOGIN_EMAIL',
    SIGNUP_EMAIL = 'SIGNUP_EMAIL',
    OTP_VERIFY = 'OTP_VERIFY',

    // Onboarding Flow
    USER_TYPE_SELECT = 'USER_TYPE_SELECT',
    PERMISSIONS = 'PERMISSIONS',
    PROFILE_SETUP = 'PROFILE_SETUP',
    INTERESTS_SELECT = 'INTERESTS_SELECT',
    
    // Host Onboarding
    HOST_WELCOME = 'HOST_WELCOME',
    HOST_PROFILE_FORM = 'HOST_PROFILE_FORM',
    HOST_VERIFICATION = 'HOST_VERIFICATION',
    HOST_PRICING = 'HOST_PRICING',
    HOST_PAYMENT = 'HOST_PAYMENT',
    HOST_DASHBOARD = 'HOST_DASHBOARD',

    // Wallet Features
    WITHDRAWAL = 'WITHDRAWAL',
    AUTO_RELOAD = 'AUTO_RELOAD',
    TRANSACTION_DETAILS = 'TRANSACTION_DETAILS',

    // Settings Screens
    SETTINGS_MAIN = 'SETTINGS_MAIN',
    SETTINGS_ACCOUNT = 'SETTINGS_ACCOUNT',
    SETTINGS_NOTIFICATIONS = 'SETTINGS_NOTIFICATIONS',
    SETTINGS_PRIVACY = 'SETTINGS_PRIVACY',
    HELP_CENTER = 'HELP_CENTER',
    FAQ = 'FAQ',
    CONTACT_SUPPORT = 'CONTACT_SUPPORT',
    REPORT_ISSUE = 'REPORT_ISSUE',
    LEGAL_TOS = 'LEGAL_TOS',
    LEGAL_PRIVACY = 'LEGAL_PRIVACY',
    ABOUT = 'ABOUT'
}
