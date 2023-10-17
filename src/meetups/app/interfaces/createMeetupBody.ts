export interface CreateMeetupBody {
  name: string;
  description: string;
  tags: string[];
  time: string;
  longtitude: number;
  latitude: number;
}
