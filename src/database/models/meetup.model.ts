import { UUID } from "crypto";

export interface Meetup {
  id: UUID;
  name: string;
  description: string;
  tags: string[];
  time: Date;
  place: string;
}
