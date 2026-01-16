
import { Donation, Recipient, LeaderboardEntry } from './types';

export const MOCK_DONATIONS: Donation[] = [
  {
    id: 'd1',
    donorName: 'Grand Hyatt Hotel',
    foodType: 'Non-veg',
    quantity: 45,
    pickupTime: 'Immediate',
    expiryTime: Date.now() + 1000 * 60 * 60 * 2.5, // 2.5 hours from now
    location: { x: 30, y: 40, label: 'Downtown' },
    status: 'available',
    description: 'Fresh chicken curry and rice packs.',
    createdAt: Date.now() - 1000 * 60 * 15,
  },
  {
    id: 'd2',
    donorName: 'Hilton Residences',
    foodType: 'Veg',
    quantity: 60,
    pickupTime: '18:30',
    expiryTime: Date.now() + 1000 * 60 * 60 * 4,
    location: { x: 70, y: 20, label: 'East Side' },
    status: 'available',
    description: 'Assorted vegetable biryani.',
    createdAt: Date.now() - 1000 * 60 * 45,
  },
  {
    id: 'd3',
    donorName: 'The Bakery Cafe',
    foodType: 'Bakery',
    quantity: 25,
    pickupTime: 'Immediate',
    expiryTime: Date.now() + 1000 * 60 * 60 * 1.2,
    location: { x: 50, y: 80, label: 'Central Park' },
    status: 'available',
    description: 'Sandwiches and pastries.',
    createdAt: Date.now() - 1000 * 60 * 5,
  }
];

export const MOCK_RECIPIENTS: Recipient[] = [
  {
    id: 'r1',
    name: 'Little Angels Orphanage',
    type: 'Orphanage',
    location: { x: 20, y: 70, label: 'North Suburbs' },
    neededPacks: 40
  },
  {
    id: 'r2',
    name: 'Hope City Shelter',
    type: 'Shelter',
    location: { x: 85, y: 55, label: 'Industrial Zone' },
    neededPacks: 100
  }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'l1',
    name: 'Marriott Marquis',
    role: 'Donor',
    mealsSaved: 12450,
    badge: 'Zero Waste Titan',
    avatar: 'https://picsum.photos/seed/marriott/100/100'
  },
  {
    id: 'l2',
    name: 'Alex Johnson',
    role: 'Volunteer',
    mealsSaved: 850,
    badge: 'Flash Courier',
    avatar: 'https://picsum.photos/seed/alex/100/100'
  },
  {
    id: 'l3',
    name: 'The Ritz Carlton',
    role: 'Donor',
    mealsSaved: 10200,
    badge: 'Hunger Fighter',
    avatar: 'https://picsum.photos/seed/ritz/100/100'
  }
];
