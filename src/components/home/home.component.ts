import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  walkingAlone = signal(false);
  alertBannerVisible = signal(true);

  toggleWalkingAlone() {
    this.walkingAlone.update(value => !value);
  }

  dismissAlert() {
    this.alertBannerVisible.set(false);
  }
}
