import { ElasticQuery } from "../../interfaces";

export function formTime(query: ElasticQuery, time: string) {
  if (!query.bool.must)
    query.bool.must = {
      match: {
        time: new Date(time).toISOString(),
      },
    };
  else query.bool.must.match = { time: new Date(time).toISOString() };
}
