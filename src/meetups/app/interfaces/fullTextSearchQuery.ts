export interface FullTextSearchQuery {
  bool: {
    should: [
      { wildcard: { name: string } },
      { wildcard: { tags: string } },
      { wildcard: { destcription: string } }
    ];
  };
}
