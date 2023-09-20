import { CreateMeetupBody } from "./createMeetupRequestOptions";

export interface RequestOpions {
  id?: string;
  body?: Partial<CreateMeetupBody>;
}
