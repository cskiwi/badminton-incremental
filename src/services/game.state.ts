import { signalSlice } from 'ngxtension/signal-slice';
import { Upgrade } from '../models/upgrade.model';
import { Achievement } from '../models/achievement.model';

export interface GameState {
  // Core stats
  points: number;
  pointsPerClick: number;
  pointsPerSecond: number;
  totalClicks: number;
  tournamentPoints: number;
  prestige: number;

  // Tournament state
  isTournamentActive: boolean;
  tournamentTimeLeft: number;
  tournamentMultiplier: number;

  // Special events
  isDoublePointsActive: boolean;
  specialEventTimeLeft: number;

  // Game content
  upgrades: Upgrade[];
  achievements: Achievement[];
}

export const initialUpgrades: Upgrade[] = [
  // Click Upgrades
  {
    name: 'Better Racket',
    cost: 10,
    multiplier: 1.5,
    owned: 0,
    description: 'Increases points per click by 50%',
    category: 'click',
    unlocked: true
  },
  {
    name: 'Professional Shoes',
    cost: 100,
    multiplier: 2,
    owned: 0,
    description: 'Doubles your points per click',
    category: 'click',
    unlocked: true
  },
  {
    name: 'Carbon Fiber Racket',
    cost: 500,
    multiplier: 3,
    owned: 0,
    description: 'Triples your points per click',
    category: 'click',
    unlocked: false
  },
  {
    name: 'Perfect Grip Tape',
    cost: 2000,
    multiplier: 4,
    owned: 0,
    description: 'Quadruples your points per click',
    category: 'click',
    unlocked: false
  },
  // Passive Income Upgrades
  {
    name: 'Training Coach',
    cost: 50,
    multiplier: 1,
    owned: 0,
    description: 'Generates 1 point per second',
    category: 'passive',
    unlocked: true
  },
  {
    name: 'Auto-Server',
    cost: 200,
    multiplier: 5,
    owned: 0,
    description: 'Generates 5 points per second',
    category: 'passive',
    unlocked: true
  },
  {
    name: 'Practice Robot',
    cost: 1000,
    multiplier: 15,
    owned: 0,
    description: 'Generates 15 points per second',
    category: 'passive',
    unlocked: false
  },
  {
    name: 'Training Facility',
    cost: 5000,
    multiplier: 50,
    owned: 0,
    description: 'Generates 50 points per second',
    category: 'passive',
    unlocked: false
  },
  // Special Upgrades
  {
    name: 'Tournament Entry',
    cost: 1000,
    multiplier: 2,
    owned: 0,
    description: 'Enables tournament participation for 2x points',
    category: 'special',
    unlocked: false,
    maxOwned: 1
  },
  {
    name: 'Lucky Charm',
    cost: 2000,
    multiplier: 1.5,
    owned: 0,
    description: 'Increases chance of special events',
    category: 'special',
    unlocked: false
  },
  {
    name: 'Prestige Trophy',
    cost: 1000000,
    multiplier: 2,
    owned: 0,
    description: 'Reset progress for permanent 2x multiplier',
    category: 'special',
    unlocked: false,
    maxOwned: 1
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'clicks10',
    name: 'Beginner Player',
    description: 'Click 10 times',
    unlocked: false,
    requirement: 10,
    type: 'clicks'
  },
  {
    id: 'points1000',
    name: 'Amateur Champion',
    description: 'Reach 1,000 points',
    unlocked: false,
    requirement: 1000,
    type: 'points'
  },
  {
    id: 'points1000000',
    name: 'Professional Player',
    description: 'Reach 1,000,000 points',
    unlocked: false,
    requirement: 1000000,
    type: 'points'
  },
  {
    id: 'tournaments5',
    name: 'Tournament Star',
    description: 'Win 5 tournaments',
    unlocked: false,
    requirement: 5,
    type: 'tournament'
  }
];

export const initialState: GameState = {
  points: 0,
  pointsPerClick: 1,
  pointsPerSecond: 0,
  totalClicks: 0,
  tournamentPoints: 0,
  prestige: 0,
  isTournamentActive: false,
  tournamentTimeLeft: 0,
  tournamentMultiplier: 1,
  isDoublePointsActive: false,
  specialEventTimeLeft: 0,
  upgrades: initialUpgrades,
  achievements: initialAchievements
};