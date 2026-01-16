
export type FoodType = 'Veg' | 'Non-veg' | 'Bakery' | 'Other';

export interface Donation {
  id: string;
  donorName: string;
  foodType: FoodType;
  quantity: number; // in packs/portions
  pickupTime: string;
  expiryTime: number; // timestamp
  location: { x: number; y: number; label: string };
  status: 'available' | 'claimed' | 'delivered';
  description: string;
  createdAt: number;
}

export interface Recipient {
  id: string;
  name: string;
  type: 'Orphanage' | 'Shelter' | 'Community Center';
  location: { x: number; y: number; label: string };
  neededPacks: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  role: 'Donor' | 'Volunteer';
  mealsSaved: number;
  badge: string;
  avatar: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}
