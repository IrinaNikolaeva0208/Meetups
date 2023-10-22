import { ElasticQuery } from "../../interfaces";

export function formTags(query: ElasticQuery, tags: string) {
  if (!query.bool.filter) query.bool.filter = [];

  tags.split(",").forEach((item) => {
    const term = {
      tags: item,
    };
    query.bool.filter.push({ term });
  });
}
