import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecentTrack } from '@shared/interfaces/recent-track.interface';
import { TrackCardComponent } from '../track-card/track-card.component';

@Component({
  selector: 'app-recently-played',
  imports: [TrackCardComponent],
  templateUrl: './recently-played.component.html',
  styleUrl: './recently-played.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyPlayedComponent implements OnInit {
  private http = inject(HttpClient);
  tracks = signal<RecentTrack[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadTracks();
  }

  loadTracks() {
    this.loading.set(true);
    this.http.get<RecentTrack[]>('/api/v1/history').subscribe({
      next: (data) => {
        this.tracks.set(data);
      },
      complete: () => this.loading.set(false),
    });
  }
}
