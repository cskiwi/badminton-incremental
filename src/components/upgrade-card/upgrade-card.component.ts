import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Upgrade } from '../../models/upgrade.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-upgrade-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './upgrade-card.component.html',
  styleUrls: ['./upgrade-card.component.scss']
})
export class UpgradeCardComponent {
  @Input({ required: true }) upgrade!: Upgrade;
  private gameService = inject(GameService);
  points = this.gameService.points;

  purchase() {
    this.gameService.purchaseUpgrade(this.upgrade);
  }
}