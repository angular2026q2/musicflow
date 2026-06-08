export interface TrackResponse<T> {
  data: T[];
  meta: {
    results_count: number;
    has_more: boolean;
    next: string | null;
  };
}
