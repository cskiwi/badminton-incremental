import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  private gameService = inject(GameService);
  points = this.gameService.points;
  pointsPerClick = this.gameService.pointsPerClick;
  pointsPerSecond = this.gameService.pointsPerSecond;
  specialEventTimeLeft = this.gameService.specialEventTimeLeft;
  isDoublePointsActive = this.gameService.isDoublePointsActive;
  tournamentMultiplier = this.gameService.tournamentMultiplier;
  isTournamentActive = this.gameService.isTournamentActive;
  prestige = this.gameService.prestige;
  tournamentTimeLeft = this.gameService.tournamentTimeLeft;
}
