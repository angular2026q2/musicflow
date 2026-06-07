import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
export class SearchPage {
  private route = inject(ActivatedRoute);
  private searchService = inject(SearchService);

  query = toSignal(this.route.queryParamMap.pipe(map((params) => params.get('q') || '')), {
    initialValue: '',
  });

  results = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => params.get('q') || ''),
      switchMap((q) => {
        if (!q.trim()) {
          return of<Track[]>([]);
        }
        return this.searchService.searchTracks(q).pipe(
          map((response) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response.data.map((t: any) => ({
              ...t,
              track_name: t.name,
            })),
          ),
          catchError((e) => {
            console.log(e);
            return of<Track[]>([]);
          }),
        );
      }),
    ),
    { initialValue: [] },
  );
}
