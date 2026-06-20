import { HistoryRequest } from './history';

export interface Payload {
  name: string;
  description: string;
  tracks: HistoryRequest[];
}
