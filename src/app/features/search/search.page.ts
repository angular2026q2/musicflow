import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
  computed,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { SearchService } from '@core/services/search.service';
import { TrackListComponent } from '@shared/components/track-list/track-list.component';
import { Track } from '@shared/interfaces/track.interface';

import { TrackCardsComponent } from '@shared/components/track-cards/track-cards.component';
import { ItemDetailsComponent } from '@shared/components/item-details/item-details.component';
import { TrackDurationComponent } from '@shared/components/track-duration/track-duration.component';
import { SubmitButtonComponent } from '@shared/components/submit-button/submit-button.component';
import { TrackResponse } from '@shared/interfaces/track-responce.interface';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TRACK_SORT_OPTIONS, TrackSort } from './track-search.model';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GenreService } from '@core/services/genre.service';
import { catchError, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Genre } from '@shared/types/genre.type';

@Component({
  selector: 'app-search',
  imports: [
    TrackListComponent,
    TrackCardsComponent,
    ItemDetailsComponent,
    TrackDurationComponent,
    SubmitButtonComponent,
    SelectModule,
    SelectButtonModule,
    SliderModule,
    FormsModule,
  ],
  templateUrl: './search.page.html',
  styleUrl: './search.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage implements OnInit {
  private route = inject(ActivatedRoute);
  private searchService = inject(SearchService);
  private genreService = inject(GenreService);
  private readonly limit = 20;

  readonly query = signal('');

  readonly rawTracks = signal<Track[]>([]);
  readonly loading = signal(false);
  readonly hasMoreTracks = signal(true);

  readonly filters = signal<{ category?: string }>({});

  readonly sortBy = signal<TrackSort | null>(null);

  readonly sortOptions = [...TRACK_SORT_OPTIONS];

  readonly genres = toSignal(
    this.genreService.getGenres().pipe(catchError(() => of<Genre[]>([]))),
    { initialValue: [] },
  );

  readonly selectedGenres = signal<Genre[]>([]);

  readonly maxDuration = computed(() => {
    const items = this.rawTracks();

    return items.length ? Math.max(...items.map((t) => t.duration ?? 0)) : 600;
  });
  readonly maxDurationFilter = signal<number>(600);
  maxDurationModel = this.maxDurationFilter();

  setMaxDuration(value: number): void {
    this.maxDurationFilter.set(value);
    this.maxDurationModel = value;
  }

  SORT_CONFIG = new Map(TRACK_SORT_OPTIONS.map((o) => [o.value, o]));

  private isServerSort(sort: TrackSort): boolean {
    return this.SORT_CONFIG.get(sort)?.mode === 'server';
  }

  readonly tracks = computed(() => {
    const items = this.rawTracks();
    const max = this.maxDurationFilter();
    const sort = this.sortBy();

    let result = [...items];

    result = result.filter((t) => t.duration <= max);

    switch (sort) {
      case 'artist_asc':
        result.sort((a, b) => a.artist_name.localeCompare(b.artist_name));
        break;

      case 'artist_desc':
        result.sort((a, b) => b.artist_name.localeCompare(a.artist_name));
        break;

      case 'track_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'track_desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case 'date_desc':
        result.sort((a, b) => b.releasedate.localeCompare(a.releasedate));
        break;

      case 'date_asc':
        result.sort((a, b) => a.releasedate.localeCompare(b.releasedate));
        break;
    }

    return result;
  });

  ngOnInit(): void {
    this.initFromUrl();
  }

  onGenresChange(value: Genre[]) {
    this.selectedGenres.set(value);

    this.reset();
    this.search(this.query(), true);
  }

  private initFromUrl(): void {
    this.route.queryParamMap.subscribe((params) => {
      const q = params.get('q') ?? '';

      this.query.set(q);

      this.reset();
      this.search(q, true);
    });
  }

  private reset(): void {
    this.rawTracks.set([]);
    this.hasMoreTracks.set(true);
  }

  private resolveServerOrder(sort: TrackSort | null): string | undefined {
    switch (sort) {
      case 'popularity_desc':
        return 'popularity_total';

      case 'popularity_asc':
        return 'popularity_total_asc';

      default:
        return undefined;
    }
  }

  private buildSearch(query: string, sort: TrackSort | null): string {
    let result = query;

    const order = sort && this.isServerSort(sort) ? this.resolveServerOrder(sort) : null;

    if (order) {
      result += `&order=${order}`;
    }

    return result;
  }

  search(query: string, reset = false): void {
    if (!query) return;

    if (reset) {
      this.reset();
    }

    const offset = this.rawTracks().length;

    const search = this.buildSearch(query, this.sortBy());
    this.loading.set(true);

    this.searchService
      .searchTracks({
        search: search,
        offset,
        limit: this.limit,
        tags: this.selectedGenres(),
      })
      .subscribe({
        next: (res: TrackResponse<Track>) => {
          this.rawTracks.update((prev) => [...prev, ...res.data]);
          this.hasMoreTracks.set(res.data.length === this.limit);
        },
        complete: () => this.loading.set(false),
        error: () => this.loading.set(false),
      });
  }

  loadMore(): void {
    if (this.loading() || !this.hasMoreTracks()) return;

    const q = this.query();

    this.search(q, false);
  }

  setCategory(category?: string): void {
    this.filters.set({ category });
  }

  setSort(sort: TrackSort): void {
    this.sortBy.set(sort);
    if (this.isServerSort(sort)) {
      this.reset();
      this.search(this.query(), true);
    }
  }
}
