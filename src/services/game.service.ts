import { Injectable, computed, effect, inject } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import { GameState, initialState } from './game.state';
import { Upgrade } from '../models/upgrade.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private state = signalSlice({
    initialState,
    actionSources: {
      addPoints: (state, action$: Observable<number>) =>
        action$.pipe(
          map((amount) => ({
            points: Math.max(0, state().points + amount),
          }))
        ),
      removePoints: (state, action$: Observable<number>) =>
        action$.pipe(
          map((amount) => ({
            points: Math.max(0, state().points - amount),
          }))
        ),
      incrementClicks: (state, action$: Observable<void>) =>
        action$.pipe(
          map(() => ({
            totalClicks: state().totalClicks + 1,
          }))
        ),
      updatePointsPerSecond: (state, action$: Observable<number>) =>
        action$.pipe(
          map((amount) => ({
            pointsPerSecond: amount,
          }))
        ),
      updatePointsPerClick: (state, action$: Observable<number>) =>
        action$.pipe(
          map((amount) => ({
            pointsPerClick: amount,
          }))
        ),
      setTournamentActive: (state, action$: Observable<boolean>) =>
        action$.pipe(
          map((active) => ({
            isTournamentActive: active,
            tournamentTimeLeft: active ? 60 : 0,
            tournamentMultiplier: active ? 2 : 1,
          }))
        ),
      updateTournamentTimer: (state, action$: Observable<void>) =>
        action$.pipe(
          map(() => ({
            tournamentTimeLeft: Math.max(0, state().tournamentTimeLeft - 1),
          }))
        ),
      incrementTournamentPoints: (state, action$: Observable<void>) =>
        action$.pipe(
          map(() => ({
            tournamentPoints: state().tournamentPoints + 1,
          }))
        ),
      setDoublePointsActive: (state, action$: Observable<boolean>) =>
        action$.pipe(
          map((active) => ({
            isDoublePointsActive: active,
            specialEventTimeLeft: active ? 30 : 0,
          }))
        ),
      updateSpecialEventTimer: (state, action$: Observable<void>) =>
        action$.pipe(
          map(() => ({
            specialEventTimeLeft: Math.max(0, state().specialEventTimeLeft - 1),
          }))
        ),
      updateUpgrades: (state, action$: Observable<Upgrade[]>) =>
        action$.pipe(
          map((upgrades) => ({
            upgrades,
          }))
        ),
      incrementPrestige: (state, action$: Observable<void>) =>
        action$.pipe(
          map(() => ({
            prestige: state().prestige + 1,
          }))
        ),
      resetProgress: (state, action$: Observable<void>) =>
        action$.pipe(
          map(() => ({
            points: 0,
            pointsPerClick: 1,
            pointsPerSecond: 0,
            upgrades: state().upgrades.map((u) => ({
              ...u,
              owned: 0,
              cost:
                u.category === 'special'
                  ? u.cost
                  : Math.floor(u.cost * Math.pow(0.8, state().prestige)),
            })),
          }))
        ),
      checkAchievements: (state, action$: Observable<void>) =>
        action$.pipe(
          map(() => ({
            achievements: state().achievements.map((a) => {
              if (!a.unlocked) {
                switch (a.type) {
                  case 'points':
                    if (state().points >= a.requirement)
                      return { ...a, unlocked: true };
                    break;
                  case 'clicks':
                    if (state().totalClicks >= a.requirement)
                      return { ...a, unlocked: true };
                    break;
                  case 'tournament':
                    if (state().tournamentPoints >= a.requirement)
                      return { ...a, unlocked: true };
                    break;
                }
              }
              return a;
            }),
          }))
        ),
      updateUpgradeUnlocks: (state, action$: Observable<void>) =>
        action$.pipe(
          map(() => ({
            upgrades: state().upgrades.map((u) => ({
              ...u,
              unlocked: u.unlocked || state().points >= u.cost / 2,
            })),
          }))
        ),
    },
  });

  // Public signals
  readonly points = this.state.points;
  readonly pointsPerClick = this.state.pointsPerClick;
  readonly pointsPerSecond = this.state.pointsPerSecond;
  readonly totalClicks = this.state.totalClicks;
  readonly tournamentPoints = this.state.tournamentPoints;
  readonly prestige = this.state.prestige;
  readonly isTournamentActive = this.state.isTournamentActive;
  readonly tournamentTimeLeft = this.state.tournamentTimeLeft;
  readonly tournamentMultiplier = this.state.tournamentMultiplier;
  readonly isDoublePointsActive = this.state.isDoublePointsActive;
  readonly specialEventTimeLeft = this.state.specialEventTimeLeft;
  readonly upgrades = this.state.upgrades;
  readonly achievements = this.state.achievements;

  constructor() {
    // Core game loop
    setInterval(() => {
      this.addPoints(this.calculatePointsPerSecond());
      this.state.checkAchievements();
      this.state.updateUpgradeUnlocks();
    }, 1000);

    // Tournament timer
    setInterval(() => {
      if (this.isTournamentActive()) {
        this.state.updateTournamentTimer();
        if (this.tournamentTimeLeft() === 0) {
          this.endTournament();
        }
      }
    }, 1000);

    // Special events
    setInterval(() => {
      if (Math.random() < 0.1) {
        this.triggerSpecialEvent();
      }
    }, 60000);
  }

  private calculatePointsPerSecond(): number {
    let base = this.pointsPerSecond();
    if (this.isTournamentActive()) {
      base *= this.tournamentMultiplier();
    }
    if (this.isDoublePointsActive()) {
      base *= 2;
    }
    return base * Math.pow(2, this.prestige());
  }

  hitShuttle() {
    this.state.incrementClicks();
    let points = this.pointsPerClick();
    
    if (this.isTournamentActive()) {
      points *= this.tournamentMultiplier();
    }
    if (this.isDoublePointsActive()) {
      points *= 2;
    }
    
    points *= Math.pow(2, this.prestige());
    this.addPoints(points);
  }

  addPoints(amount: number) {
    this.state.addPoints(amount);
  }

  removePoints(amount: number) {
    this.state.removePoints(amount);
  }

  purchaseUpgrade(upgrade: Upgrade) {
    if (this.points() >= upgrade.cost && (!upgrade.maxOwned || upgrade.owned < upgrade.maxOwned)) {
      this.removePoints(upgrade.cost);
      
      const updatedUpgrades = this.upgrades().map(u => {
        if (u.name === upgrade.name) {
          return {
            ...u,
            owned: u.owned + 1,
            cost: Math.floor(u.cost * 1.5)
          };
        }
        return u;
      });
      
      this.state.updateUpgrades(updatedUpgrades);

      if (upgrade.category === 'passive') {
        this.state.updatePointsPerSecond(this.pointsPerSecond() + upgrade.multiplier);
      } else if (upgrade.category === 'click') {
        this.state.updatePointsPerClick(this.pointsPerClick() * upgrade.multiplier);
      } else if (upgrade.name === 'Prestige Trophy') {
        this.state.incrementPrestige();
        this.state.resetProgress();
      }
    }
  }

  startTournament() {
    if (!this.isTournamentActive()) {
      this.state.setTournamentActive(true);
    }
  }

  private endTournament() {
    this.state.setTournamentActive(false);
    this.state.incrementTournamentPoints();
  }

  private triggerSpecialEvent() {
    if (!this.isDoublePointsActive()) {
      this.state.setDoublePointsActive(true);
      
      setTimeout(() => {
        this.state.setDoublePointsActive(false);
      }, 30000);
    }
  }
}