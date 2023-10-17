export interface CreateMeetupBody {
  name: string;
  description: string;
  tags: string[];
  time: string;
  longitude: number;
  latitude: number;
}
