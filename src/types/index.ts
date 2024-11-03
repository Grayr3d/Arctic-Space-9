export interface FloorPlan {
  id: string;
  name: string;
  price: number;
  dimensions: {
    [key: string]: number;
  };
  image?: string;
}

export interface InteriorOption {
  id: string;
  name: string;
  color: string;
  price: number;
  image?: string;
}

export interface ExteriorOption {
  id: string;
  name: string;
  color: string;
  price: number;
  image?: string;
}

export interface Upgrade {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export interface Configuration {
  floorPlan: string;
  kitchen: string;
  floor: string;
  facade: string;
  upgrades: string[];
  basePrice: number;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  preferredMonth?: string;
  reserveSlot: boolean;
  configuration: Configuration;
  totalPrice: number;
  status: 'new' | 'contacted' | 'qualified' | 'negotiating' | 'won' | 'lost';
  createdAt: string;
  notes?: string[];
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
}