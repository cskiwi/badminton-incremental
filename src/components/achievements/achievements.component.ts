import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="achievements-container">
      @for (achievement of achievements(); track achievement.id) {
        <mat-card [ngClass]="{'unlocked': achievement.unlocked}">
          <mat-card-header>
            <mat-card-title>{{ achievement.name }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>{{ achievement.description }}</p>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .achievements-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin: 20px 0;
    }

    mat-card {
      opacity: 0.7;
      filter: grayscale(1);
      transition: all 0.3s ease;

      &.unlocked {
        opacity: 1;
        filter: none;
        background: linear-gradient(45deg, #4CAF50 0%, #45a049 100%);
        color: white;
      }
    }
  `]
})
export class AchievementsComponent {
  private gameService = inject(GameService);
  achievements = this.gameService.achievements;
}