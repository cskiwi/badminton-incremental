import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { StatsComponent } from './components/stats/stats.component';
import { UpgradeCardComponent } from './components/upgrade-card/upgrade-card.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    StatsComponent,
    UpgradeCardComponent,
    AchievementsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class App {
  private gameService = inject(GameService);
  upgrades = this.gameService.upgrades;

  hitShuttle() {
    this.gameService.hitShuttle();
  }
}