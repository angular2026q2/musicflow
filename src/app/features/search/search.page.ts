import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '@core/services/search.service';
import { Track } from '@shared/interfaces/track.interface';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.page.html',
  styleUrl: './search.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage implements OnInit {
  private route = inject(ActivatedRoute);
  private searchService = inject(SearchService);
  query = signal('');
  results = signal<Track[]>([]);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const q = params.get('q') || '';
      this.query.set(q);
      if (q) {
        this.searchService.searchTracks(q).subscribe((res) => {
          this.results.set(res.data);
        });
      }
    });
  }
}
