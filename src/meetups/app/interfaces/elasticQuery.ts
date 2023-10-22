export interface ElasticQuery {
  bool: {
    must?: {
      match?: { time?: string; name?: string };
    };
    filter?: any[];
  };
}
