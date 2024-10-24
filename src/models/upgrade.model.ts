export interface Upgrade {
  name: string;
  cost: number;
  multiplier: number;
  owned: number;
  description: string;
  category: 'click' | 'passive' | 'special';
  unlocked: boolean;
  maxOwned?: number;
}