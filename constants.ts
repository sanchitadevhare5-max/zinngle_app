import { Host, Gift, ChatSession, Review, GiftHistoryItem } from './types';

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBPxqBRun7wKfSp939XPcxsZSHlLUP2Sfg",
  authDomain: "zinngle-73d8e.firebaseapp.com",
  projectId: "zinngle-73d8e",
  storageBucket: "zinngle-73d8e.firebasestorage.app",
  messagingSenderId: "600062182109",
  appId: "1:600062182109:android:46c83130acd5a507fe9134"
};

export const SUPABASE_CONFIG = {
  url: "https://qrfltrduilqxjyvphacr.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyZmx0cmR1aWxxeGp5dnBoYWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5Njk2NDYsImV4cCI6MjA4MTU0NTY0Nn0.RRC9h1CF_uUbaWPllkJxZPfXVGeNu-hZtr_lgABw8uE"
};

export const AGORA_CONFIG = {
  appId: "531dd734f2234e02be08f54d53ed2798",
  token: null, // Token should be fetched from your backend for production
};

export const RAZORPAY_CONFIG = {
  keyId: "rzp_test_Rb7drR7cAxtelX",
};

// Twilio deleted as requested. Switching to Firebase Phone Auth.

const newHostData = [
  { name: "Naina Singh", age: 21, phone: "9651807830" },
  { name: "Neha", age: 23, phone: "8894845634" },
  { name: "Anju Rathaur", age: 26, phone: "7355253730" },
  { name: "सुषમા लोधी", age: 22, phone: "7415270874" },
  { name: "Riya kumari", age: 18, phone: "7256826757" },
  { name: "Ramkumari", age: 19, phone: "8602344328" },
  { name: "Pooja", age: 21, phone: "9509346945" },
  { name: "Purnima Kumari", age: 21, phone: "8271949489" },
  { name: "Pooja", age: 20, phone: "9039626820" },
  { name: "Rajni", age: 20, phone: "8357980371" },
  { name: "Sampa lohar", age: 30, phone: "8389899263" },
  { name: "Pooja Mishra", age: 28, phone: "9369851589" },
  { name: "Riya", age: 22, phone: "7828357054" },
  { name: "Seema Raj", age: 23, phone: "7970136331" },
  { name: "Roshni", age: 33, phone: "8305653190" },
  { name: "Pooja", age: 25, phone: "9039642451" },
  { name: "Nikki", age: 19, phone: "8109860603" },
  { name: "Leena", age: 35, phone: "9890972213" },
  { name: "Priya Roy", age: 28, phone: "8116139939" },
  { name: "Divyanshi", age: 25, phone: "9870734775" },
  { name: "Neha kumari", age: 19, phone: "8235137311" },
  { name: "Pooja", age: 18, phone: "9569489306" },
  { name: "Babita Devi", age: 32, phone: "7738056249" },
  { name: "Pakhi", age: 19, phone: "8609243583" },
  { name: "Priyanka Pandey", age: 32, phone: "8858571119" },
  { name: "Jarimin Daimari", age: 20, phone: "9395807347" },
  { name: "Poonam", age: 21, phone: "9770026664" },
  { name: "Beauty Kumari", age: 19, phone: "9305631714" },
  { name: "Dolly", age: 22, phone: "9406610369" },
  { name: "MUSKAN Sharma", age: 20, phone: "8103285947" },
  { name: "Lalita", age: 30, phone: "9318465869" },
  { name: "Hema ahuja", age: 31, phone: "8755210501" },
  { name: "Sarita", age: 20, phone: "9149110044" },
  { name: "Riya", age: 21, phone: "9263256365" },
  { name: "Riddhi", age: 25, phone: "8400733667" },
  { name: "Mishti", age: 20, phone: "7988260921" },
  { name: "Riya kumaRi", age: 19, phone: "7492801575" },
  { name: "Laksita", age: 25, phone: "7665185640" },
  { name: "Yashika", age: 22, phone: "6397777597" },
  { name: "Aarohi", age: 21, phone: "9695187503" },
  { name: "Karishma", age: 19, phone: "7970199474" },
  { name: "Kiran singh", age: 23, phone: "7908680988" },
  { name: "Dalia Das", age: 35, phone: "8981230405" },
  { name: "Piriya kumari", age: 25, phone: "8077685842" },
  { name: "Peeriti", age: 30, phone: "7380361570" },
  { name: "Pooja", age: 19, phone: "7667329848" },
  { name: "Mamta", age: 25, phone: "7415917429" },
  { name: "Niaa roy", age: 20, phone: "7548070898" },
  { name: "Vandna ochani", age: 32, phone: "8329815940" },
  { name: "Priyanka", age: 18, phone: "7089053097" },
  { name: "Rashmi", age: 25, phone: "9078123479" },
  { name: "Mahi", age: 21, phone: "9310715031" },
  { name: "Payal", age: 20, phone: "7389360197" },
  { name: "Guriya", age: 23, phone: "9955386221" },
  { name: "Riya patel", age: 24, phone: "9370875398" },
  { name: "Doli", age: 24, phone: "9734470283" },
  { name: "Deepa", age: 28, phone: "9599579233" },
  { name: "Aarti rajput", age: 19, phone: "9685549351" },
  { name: "Kashvi", age: 23, phone: "6378151327" },
  { name: "Kirti", age: 21, phone: "8809762314" },
  { name: "Manvi", age: 21, phone: "8076754245" },
  { name: "Nitu", age: 25, phone: "7667797838" },
  { name: "Roshni yadav", age: 27, phone: "7697757057" },
  { name: "Mansi", age: 26, phone: "8429144183" },
  { name: "Sina", age: 26, phone: "9628373501" },
  { name: "Neha", age: 22, phone: "9296512579" },
  { name: "Kajal", age: 20, phone: "7487827526" },
  { name: "Riya", age: 21, phone: "9039499180" },
  { name: "Punam sutradhar", age: 26, phone: "6002613509" },
  { name: "Sapna Prajapati", age: 21, phone: "7489156246" },
  { name: "Akrti", age: 27, phone: "6352762272" },
  { name: "Puja mondal", age: 20, phone: "8918983132" },
  { name: "Jaya", age: 30, phone: "9075360238" },
  { name: "Anita", age: 25, phone: "8218510598" },
  { name: "Nisa", age: 20, phone: "8119838654" },
  { name: "Radhika", age: 29, phone: "7347751342" },
  { name: "Priyanka", age: 24, phone: "8005886361" },
  { name: "Mahi", age: 22, phone: "9532558877" },
  { name: "Mamata.thakur", age: 28, phone: "7811922483" },
  { name: "Shweta Thorat", age: 23, phone: "8010854626" },
  { name: "Aradhana", age: 20, phone: "7973341174" },
  { name: "Pooja", age: 23, phone: "8427006551" },
  { name: "Shital", age: 25, phone: "8511547626" },
  { name: "Priyanka Dhar", age: 30, phone: "8918847524" },
  { name: "Jhanvi", age: 24, phone: "8770219687" },
  { name: "Neha Rani", age: 23, phone: "9289592463" },
  { name: "Radha", age: 20, phone: "6269816557" },
];

export const MOCK_HOSTS: Host[] = newHostData.map((host, index) => ({
    id: (index + 1).toString(),
    name: host.name,
    username: `@${host.name.split(' ')[0].toLowerCase()}${host.age}`,
    age: host.age,
    bio: `Welcome to my profile! I love connecting with new people. Let\'s chat! 😊`,
    tags: ['Lifestyle', 'Chatting', 'Fun'],
    avatarUrl: `https://picsum.photos/seed/${host.name.replace(/\s+/g, '')}/200/200`,
    coverUrl: `https://picsum.photos/seed/${host.name.replace(/\s+/g, '')}-cover/600/300`,
    pricePerMinute: Math.floor(Math.random() * (30 - 15 + 1)) + 15, // Random price between 15-30
    audioPricePerMinute: Math.floor(Math.random() * (15 - 8 + 1)) + 8, // Random price between 8-15
    status: ['online', 'offline', 'busy'][Math.floor(Math.random() * 3)] as 'online' | 'offline' | 'busy',
    rating: Math.round((4.5 + Math.random() * 0.5) * 10) / 10, // Random rating between 4.5 - 5.0
    followers: `${(Math.random() * 20).toFixed(1)}k`,
    persona: `You are ${host.name}, a friendly and engaging person who loves to chat about life. You are warm and welcoming to all your fans.`,
    distance: Math.round((Math.random() * 15) * 10) / 10,
}));

export const MOCK_CHATS: ChatSession[] = [
    {
        id: 'c1',
        hostId: '1',
        lastMessage: 'Can\'t wait to hear you sing!',
        timestamp: Date.now() - 1000 * 60 * 5,
        unread: 2
    },
    {
        id: 'c2',
        hostId: '3',
        lastMessage: 'Did that fix the bug?',
        timestamp: Date.now() - 1000 * 60 * 60 * 2,
        unread: 0
    }
];

export const MOCK_REVIEWS: Review[] = [
    { id: 'r1', hostId: '1', userId: 'u1', userName: 'John', rating: 5, comment: 'Amazing voice! So helpful.', timestamp: Date.now() - 86400000 },
    { id: 'r2', hostId: '1', userId: 'u2', userName: 'Sarah', rating: 4, comment: 'Great advice, will call again.', timestamp: Date.now() - 172800000 },
    { id: 'r3', hostId: '1', userId: 'u3', userName: 'Mike', rating: 5, comment: 'Very friendly and fun.', timestamp: Date.now() - 200000000 },
];

export const GIFTS: Gift[] = [
  { id: 'g1', name: 'Rose', icon: '🌹', cost: 10, category: 'Classic' },
  { id: 'g2', name: 'Heart', icon: '❤️', cost: 50, category: 'Classic' },
  { id: 'g3', name: 'Coffee', icon: '☕', cost: 100, category: 'Fun' },
  { id: 'g4', name: 'Diamond', icon: '💎', cost: 500, category: 'Luxury' },
  { id: 'g5', name: 'Rocket', icon: '🚀', cost: 1000, category: 'Luxury' },
  { id: 'g6', name: 'Yacht', icon: '🛥️', cost: 5000, category: 'Luxury' },
  { id: 'g7', name: 'Chocolate', icon: '🍫', cost: 25, category: 'Fun' },
  { id: 'g8', name: 'Crown', icon: '👑', cost: 200, category: 'Luxury' },
];

export const MOCK_GIFT_HISTORY: GiftHistoryItem[] = [
    { id: 'h1', giftId: 'g1', senderId: 'user', receiverId: '1', timestamp: Date.now() - 3600000, cost: 10 },
    { id: 'h2', giftId: 'g4', senderId: 'user', receiverId: '2', timestamp: Date.now() - 86400000, cost: 500 },
    { id: 'h3', giftId: 'g2', senderId: '1', receiverId: 'user', timestamp: Date.now() - 90000000, cost: 50 }, // Received
];

export const COIN_PACKAGES = [
  { coins: 40, price: '₹40', popular: false },
  { coins: 60, price: '₹60', popular: false },
  { coins: 80, price: '₹80', popular: false },
  { coins: 100, price: '₹100', popular: true },
  { coins: 210, price: '₹200', popular: false },
  { coins: 420, price: '₹400', popular: false },
  { coins: 630, price: '₹600', popular: false },
  { coins: 840, price: '₹800', popular: false },
  { coins: 1050, price: '₹1,000', popular: false },
  { coins: 1575, price: '₹1,500', popular: false },
  { coins: 3150, price: '₹3,000', popular: false },
  { coins: 10500, price: '₹10,000', popular: false },
  { coins: 21000, price: '₹20,000', popular: false },
  { coins: 31500, price: '₹30,000', popular: false },
];
