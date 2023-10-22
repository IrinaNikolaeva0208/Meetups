import { ElasticQuery } from "../../interfaces";

export function formName(query: ElasticQuery, name: string) {
  if (!query.bool.must)
    query.bool.must = {
      match: {
        name,
      },
    };
  else if (!query.bool.must.match) query.bool.must.match = { name };
  else query.bool.must.match.name = name;
}
