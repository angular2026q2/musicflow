import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '@core/services/search.service';
import { TrackListComponent } from '@shared/components/track-list/track-list.component';
import { Track } from '@shared/interfaces/track.interface';

import { catchError, map, of, switchMap } from 'rxjs';
import { TrackCardsComponent } from '@shared/components/track-cards/track-cards.component';
import { ItemDetailsComponent } from '@shared/components/item-details/item-details.component';
import { TrackDurationComponent } from '@shared/components/track-duration/track-duration.component';

@Component({
  selector: 'app-search',
  imports: [TrackListComponent, TrackCardsComponent, ItemDetailsComponent, TrackDurationComponent],
  templateUrl: './search.page.html',
  styleUrl: './search.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage implements OnInit {
  private route = inject(ActivatedRoute);
  private searchService = inject(SearchService);
  private limit = 10;

  tracks = signal<Track[]>([]); // public
  offset = signal(0);

  query = toSignal(this.route.queryParamMap.pipe(map((params) => params.get('q') || '')), {
    initialValue: '',
  });

  ngOnInit() {
    this.route.queryParamMap
      .pipe(
        map((params) => params.get('q') || ''),
        switchMap((q) => {
          if (!q.trim()) {
            this.tracks.set([]);
            this.offset.set(0);
            return of<Track[]>([]);
          }
          return this.searchService.searchTracks(q, this.limit, 0).pipe(
            map((response) => {
              this.tracks.set(response.data);
              this.offset.set(this.limit);
              return response.data;
            }),
            catchError((e) => {
              console.log(e);
              return of<Track[]>([]);
            }),
          );
        }),
      )
      .subscribe();
  }
  loadMore() {
    const currentOffset = this.offset();

    this.searchService
      .searchTracks(this.query(), this.limit, currentOffset)
      .subscribe((response) => {
        this.tracks.update((tracks) => [...tracks, ...response.data]);
        this.offset.update((offset) => offset + this.limit);
      });
  }
}
