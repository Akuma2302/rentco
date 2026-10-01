export interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  rating: number;
  reviewCount: number;
  avatar?: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  period: string;
  availability: boolean;
  ownerId: string;
  ownerName: string;
  ownerRating: number;
  image: string;
  location: string;
  deposit?: number;
  demand?: "low" | "medium" | "high";
}

export interface Rental {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  renterId: string;
  renterName: string;
  ownerId: string;
  ownerName: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  price: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
  itemId?: string;
}

export interface Review {
  id: string;
  itemId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const currentUser: User = {
  id: '1',
  name: 'Ahmad Faris',
  email: 'ahmad.faris@university.edu.my',
  university: 'Universiti Malaya',
  rating: 4.8,
  reviewCount: 24,
};

export const mockItems: Item[] = [
  {
    id: '1',
    title: 'USB-C Fast Charger Adapter',
    description: 'Original 65W fast charging adapter. Compatible with most laptops and phones. Perfect for presentations or studying.',
    category: 'Electronics',
    price: 3,
    period: 'day',
    availability: true,
    ownerId: '2',
    ownerName: 'Sarah Lee',
    ownerRating: 4.9,
    image: 'https://images.unsplash.com/photo-1770417999831-1c070eb628e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNoYXJnZXIlMjBhZGFwdGVyfGVufDF8fHx8MTc3NjI3MzU5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Campus A, Block 3',
    deposit: 15,
    demand: 'high',
  },
  {
    id: '2',
    title: 'Wireless Headphones - Sony',
    description: 'Noise-cancelling wireless headphones. Great battery life. Ideal for studying in the library.',
    category: 'Electronics',
    price: 5,
    period: 'day',
    availability: true,
    ownerId: '3',
    ownerName: 'Raj Kumar',
    ownerRating: 4.7,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzc2MjYyNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Campus B, Dormitory 5',
    deposit: 50,
    demand: 'high',
  },
  {
    id: '3',
    title: 'Formal Blazer - Navy Blue',
    description: 'Professional navy blazer, size M. Perfect for presentations, interviews, or formal events.',
    category: 'Fashion',
    price: 10,
    period: 'day',
    availability: true,
    ownerId: '4',
    ownerName: 'Lisa Tan',
    ownerRating: 5.0,
    image: 'https://images.unsplash.com/photo-1682752024470-f9925c1ba39c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBibGF6ZXIlMjBqYWNrZXR8ZW58MXx8fHwxNzc2MzMyOTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Campus A, Block 7',
    deposit: 30,
    demand: 'medium',
  },
  {
    id: '4',
    title: 'Scientific Calculator - TI-84',
    description: 'Graphing calculator for engineering and math courses. Includes user manual.',
    category: 'Electronics',
    price: 4,
    period: 'week',
    availability: true,
    ownerId: '5',
    ownerName: 'David Wong',
    ownerRating: 4.6,
    image: 'https://images.unsplash.com/photo-1737919144176-cb279b56ce6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGluZyUyMGNhbGN1bGF0b3J8ZW58MXx8fHwxNzc2Mjk1OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Campus C, Block 2',
    deposit: 20,
    demand: 'high',
  },
  {
    id: '5',
    title: 'Halloween Costume - Witch',
    description: 'Complete witch costume with hat and accessories. Size S-M. Great for campus parties!',
    category: 'Fashion',
    price: 8,
    period: 'day',
    availability: false,
    ownerId: '6',
    ownerName: 'Emily Chen',
    ownerRating: 4.8,
    image: 'https://images.unsplash.com/photo-1509163245925-f4255dea7727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxsb3dlZW4lMjBjb3N0dW1lfGVufDF8fHx8MTc3NjMzMjkxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Campus B, Block 1',
    deposit: 20,
    demand: 'low',
  },
  {
    id: '6',
    title: 'Power Bank - 20000mAh',
    description: 'High capacity power bank. Charges phone 4-5 times. Fast charging support.',
    category: 'Electronics',
    price: 3,
    period: 'day',
    availability: true,
    ownerId: '7',
    ownerName: 'Marcus Lim',
    ownerRating: 4.9,
    image: 'https://images.unsplash.com/photo-1585995603413-eb35b5f4a50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGJhbmt8ZW58MXx8fHwxNzc2MzMyOTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Campus A, Block 5',
    deposit: 30,
    demand: 'medium',
  },
  {
    id: '7',
    title: 'Compact Umbrella',
    description: 'Foldable umbrella, fits in backpack. Windproof and waterproof. Perfect for rainy season.',
    category: 'Outdoor',
    price: 2,
    period: 'day',
    availability: true,
    ownerId: '8',
    ownerName: 'Priya Singh',
    ownerRating: 4.7,
    image: 'https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bWJyZWxsYSUyMHJhaW58ZW58MXx8fHwxNzc2MzE2NzgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Campus C, Library Area',
    deposit: 10,
    demand: 'high',
  },
  {
    id: '8',
    title: 'Portable Bluetooth Speaker',
    description: 'Wireless speaker with great sound quality. 10 hour battery. Perfect for gatherings.',
    category: 'Electronics',
    price: 6,
    period: 'day',
    availability: true,
    ownerId: '9',
    ownerName: 'Kevin Ng',
    ownerRating: 5.0,
    image: 'https://images.unsplash.com/photo-1675319245480-215961c129f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0YWJsZSUyMHNwZWFrZXIlMjBibHVldG9vdGh8ZW58MXx8fHwxNzc2MzE5MDE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Campus A, Block 9',
    deposit: 40,
    demand: 'medium',
  },
  {
    id: '9',
    title: 'Lab Coat - Size L',
    description: 'Clean white lab coat for biology and chemistry labs. Freshly laundered.',
    category: 'Fashion',
    price: 3,
    period: 'day',
    availability: true,
    ownerId: '10',
    ownerName: 'Aisha Rahman',
    ownerRating: 4.8,
    image: 'https://images.unsplash.com/photo-1581094487815-d1df47182343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWIlMjBjb2F0JTIwd2hpdGV8ZW58MXx8fHwxNzc2MzMyOTk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Campus B, Science Block',
    deposit: 15,
    demand: 'medium',
  },
  {
    id: '10',
    title: 'Folding Study Table',
    description: 'Portable folding table. Great for dorm room studying or group projects.',
    category: 'Other',
    price: 5,
    period: 'day',
    availability: true,
    ownerId: '11',
    ownerName: 'Jason Tan',
    ownerRating: 4.6,
    image: 'https://images.unsplash.com/photo-1773767257656-3ff1f146b0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2xkaW5nJTIwdGFibGUlMjBwb3J0YWJsZXxlbnwxfHx8fDE3NzYzMzI5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Campus A, Block 4',
    deposit: 25,
    demand: 'low',
  },
  {
    id: '12',
    title: 'Canon EOS R6 Mirrorless Camera',
    description: 'Perfect for photography and videography. Well maintained and comes with 2 batteries, charger and bag. Great for event shoots and final-year projects.',
    category: 'Cameras',
    price: 90,
    period: 'day',
    availability: true,
    ownerId: '9',
    ownerName: 'Kevin Ng',
    ownerRating: 4.8,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1080&q=80',
    location: 'Campus A, Block 9',
    deposit: 500,
    demand: 'high',
  },
  {
    id: '13',
    title: 'Camping Tent - 4 Person',
    description: 'Waterproof dome tent that sets up in 10 minutes. Ideal for weekend hikes and society trips. Includes pegs and carry bag.',
    category: 'Outdoor',
    price: 25,
    period: 'day',
    availability: true,
    ownerId: '7',
    ownerName: 'Marcus Lim',
    ownerRating: 4.9,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1080&q=80',
    location: 'Campus A, Block 5',
    deposit: 80,
    demand: 'high',
  },
  {
    id: '14',
    title: 'Tennis Racket Set + Balls',
    description: 'Two Wilson rackets with a can of new balls. Great for a casual match at the campus courts.',
    category: 'Sports',
    price: 8,
    period: 'day',
    availability: true,
    ownerId: '3',
    ownerName: 'Raj Kumar',
    ownerRating: 4.7,
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1080&q=80',
    location: 'Campus B, Sports Complex',
    deposit: 40,
    demand: 'medium',
  },
  {
    id: '15',
    title: 'Cordless Drill Kit',
    description: '18V cordless drill with two batteries and a full bit set. Perfect for one-time DIY tasks, shelf mounting and society booth builds.',
    category: 'Tools',
    price: 12,
    period: 'day',
    availability: true,
    ownerId: '5',
    ownerName: 'David Wong',
    ownerRating: 4.6,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1080&q=80',
    location: 'Campus C, Block 2',
    deposit: 60,
    demand: 'medium',
  },
  {
    id: '16',
    title: 'Party Lighting & Confetti Kit',
    description: 'LED stage lights, DMX controller and confetti cannons for society nights, launches and campus events. Setup guide included.',
    category: 'Events',
    price: 35,
    period: 'day',
    availability: true,
    ownerId: '10',
    ownerName: 'Aisha Rahman',
    ownerRating: 4.8,
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1080&q=80',
    location: 'Campus B, Student Centre',
    deposit: 100,
    demand: 'high',
  },
  {
    id: '17',
    title: 'MacBook Pro 13" - M1',
    description: 'M1 MacBook Pro with charger. Great for coding, design work and final-year project crunch. Comes with a protective sleeve.',
    category: 'Electronics',
    price: 25,
    period: 'day',
    availability: true,
    ownerId: '1',
    ownerName: 'Ahmad Faris',
    ownerRating: 4.8,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1080&q=80',
    location: 'Campus A, Block 7',
    deposit: 300,
    demand: 'high',
  },
  {
    id: '18',
    title: 'Fixie Bicycle - Single Speed',
    description: 'Lightweight single-speed bike for getting around campus. Lock and front light included.',
    category: 'Sports',
    price: 6,
    period: 'day',
    availability: false,
    ownerId: '1',
    ownerName: 'Ahmad Faris',
    ownerRating: 4.8,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1080&q=80',
    location: 'Campus A, Block 7',
    deposit: 80,
    demand: 'medium',
  },
  {
    id: '19',
    title: 'Polaroid Instant Camera',
    description: 'Polaroid OneStep instant camera for events, birthdays and society photo booths. Film pack sold separately.',
    category: 'Cameras',
    price: 10,
    period: 'day',
    availability: true,
    ownerId: '1',
    ownerName: 'Ahmad Faris',
    ownerRating: 4.8,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1080&q=80',
    location: 'Campus A, Block 7',
    deposit: 50,
    demand: 'medium',
  },
];

export const mockRentals: Rental[] = [
  {
    id: '1',
    itemId: '2',
    itemTitle: 'Mountain Bike - Trek X-Caliber',
    itemImage: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500',
    renterId: '1',
    renterName: 'Ahmad Faris',
    ownerId: '3',
    ownerName: 'Raj Kumar',
    startDate: '2026-04-18',
    endDate: '2026-04-20',
    status: 'active',
    price: 30,
  },
  {
    id: '2',
    itemId: '1',
    itemTitle: 'DSLR Camera - Canon EOS 200D',
    itemImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80',
    renterId: '1',
    renterName: 'Ahmad Faris',
    ownerId: '2',
    ownerName: 'Sarah Lee',
    startDate: '2026-04-10',
    endDate: '2026-04-12',
    status: 'completed',
    price: 50,
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    senderName: 'Sarah Lee',
    receiverId: '1',
    content: 'Hi! The camera is available for those dates. Would you need the tripod as well?',
    timestamp: '2026-04-15T10:30:00',
    itemId: '1',
  },
  {
    id: '2',
    senderId: '1',
    senderName: 'Ahmad Faris',
    receiverId: '2',
    content: 'That would be great! How much extra for the tripod?',
    timestamp: '2026-04-15T10:35:00',
    itemId: '1',
  },
  {
    id: '3',
    senderId: '3',
    senderName: 'Raj Kumar',
    receiverId: '1',
    content: 'Thanks for renting the bike! Hope you enjoy your ride. Let me know if you need it longer.',
    timestamp: '2026-04-16T09:00:00',
    itemId: '2',
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    itemId: '1',
    userId: '10',
    userName: 'Alex Johnson',
    rating: 5,
    comment: 'Excellent camera! Sarah was very helpful and the equipment was in perfect condition.',
    date: '2026-04-10',
  },
  {
    id: '2',
    itemId: '1',
    userId: '11',
    userName: 'Nurul Aina',
    rating: 5,
    comment: 'Great for my photography assignment. Highly recommend!',
    date: '2026-04-05',
  },
  {
    id: '3',
    itemId: '2',
    userId: '12',
    userName: 'Jason Lim',
    rating: 4,
    comment: 'Good bike, smooth ride. Just needed a minor seat adjustment.',
    date: '2026-04-12',
  },
];

export const categories = [
  'All',
  'Cameras',
  'Sports',
  'Outdoor',
  'Electronics',
  'Tools',
  'Events',
  'Fashion',
  'Other',
];