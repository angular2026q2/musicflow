import { Album } from './album.interface';

export interface Albums {
  data: Album[];
  meta: {
    results_count: number;
    has_more: boolean;
    next: null;
  };
}
