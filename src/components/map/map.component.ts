import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  showLayers = signal(false);
  infoPanelVisible = signal(false);

  layers = signal([
    { name: 'Rainfall Intensity', enabled: true },
    { name: 'Storm Risk Areas', enabled: true },
    { name: 'Flood Zones', enabled: false },
    { name: 'Active Incidents', enabled: true },
    { name: 'Safe Zones', enabled: false },
  ]);

  toggleLayers() {
    this.showLayers.update(v => !v);
  }

  toggleLayer(index: number) {
    this.layers.update(currentLayers => {
      const newLayers = [...currentLayers];
      newLayers[index] = { ...newLayers[index], enabled: !newLayers[index].enabled };
      return newLayers;
    });
  }

  showInfoPanel() {
    this.infoPanelVisible.set(true);
  }

  hideInfoPanel() {
    this.infoPanelVisible.set(false);
  }
}
