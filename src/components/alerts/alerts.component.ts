import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

type AlertSeverity = 'Critical' | 'Warning' | 'Advisory';

interface Alert {
  id: number;
  title: string;
  authority: string;
  location: string;
  timestamp: string;
  severity: AlertSeverity;
  description: string;
}

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsComponent {
  activeFilter = signal<AlertSeverity | 'All'>('All');
  expandedAlertId = signal<number | null>(null);

  allAlerts = signal<Alert[]>([
    { id: 1, title: 'Heavy Rainfall Expected', authority: 'National Weather Service', location: 'Coastal Regions', timestamp: '2 hours ago', severity: 'Warning', description: 'Heavy rainfall is expected in the next 6 hours which may lead to flash floods in low-lying areas. Residents are advised to move to higher ground.' },
    { id: 2, title: 'Tsunami Warning Issued', authority: 'Pacific Tsunami Warning Center', location: 'All Pacific Coastlines', timestamp: '15 mins ago', severity: 'Critical', description: 'An earthquake of magnitude 8.2 has occurred. A tsunami is imminent. Evacuate all coastal areas immediately.' },
    { id: 3, title: 'Air Quality Advisory', authority: 'Environmental Protection Agency', location: 'Metro Area', timestamp: '1 day ago', severity: 'Advisory', description: 'Air quality is moderate due to wildfire smoke. Sensitive individuals should limit outdoor activities.' },
    { id: 4, title: 'Evacuation Advisory for Coastal Areas', authority: 'State Emergency Services', location: 'East Coast', timestamp: '6 hours ago', severity: 'Warning', description: 'A tropical storm is approaching. Voluntary evacuation is advised for residents in Zone A and B.' },
  ]);

  filteredAlerts = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') {
      return this.allAlerts();
    }
    return this.allAlerts().filter(alert => alert.severity === filter);
  });

  setFilter(filter: AlertSeverity | 'All') {
    this.activeFilter.set(filter);
  }

  toggleAlert(id: number) {
    this.expandedAlertId.update(currentId => (currentId === id ? null : id));
  }
}
