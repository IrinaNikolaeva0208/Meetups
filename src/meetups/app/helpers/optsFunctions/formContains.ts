import { ElasticOptions } from "../../interfaces";
import { FullTextSearchQuery } from "../../interfaces";

export function formContains(options: ElasticOptions, contains: string) {
  const query: FullTextSearchQuery = {
    bool: {
      should: [
        { wildcard: { name: `*${contains}*` } },
        { wildcard: { tags: `*${contains}*` } },
        { wildcard: { destcription: `*${contains}*` } },
      ],
    },
  };

  options.query = query;
}
