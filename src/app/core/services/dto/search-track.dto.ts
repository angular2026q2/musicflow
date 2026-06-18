export interface SearchTracksRequest {
  search: string;
  limit: number;
  offset: number;
  tags?: string[];
}
