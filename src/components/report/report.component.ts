import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent {
  step = signal(1);
  selectedCategory = signal('');
  description = signal('');
  severity = signal('Minor');
  reportAnonymously = signal(false);

  categories = [
    'Flood', 'Fire', 'Landslide', 'Earthquake', 
    'Storm Damage', 'Suspicious Activity', 'Medical Emergency', 'Infrastructure'
  ];

  selectCategory(category: string) {
    this.selectedCategory.set(category);
    this.step.set(2);
  }

  submitReport() {
    // Logic to submit would go here
    console.log({
      category: this.selectedCategory(),
      description: this.description(),
      severity: this.severity(),
      anonymous: this.reportAnonymously()
    });
    this.step.set(3);
  }

  reportAnother() {
    this.step.set(1);
    this.selectedCategory.set('');
    this.description.set('');
    this.severity.set('Minor');
    this.reportAnonymously.set(false);
  }
}
