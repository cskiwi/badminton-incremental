export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  requirement: number;
  type: 'points' | 'clicks' | 'upgrades' | 'tournament';
}