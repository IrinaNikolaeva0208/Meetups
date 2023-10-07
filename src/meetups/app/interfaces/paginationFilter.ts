export interface PaginationFilter {
  where: {
    name?: { contains: string };
    time?: string;
    place?: string;
    tags?: {
      hasEvery: string[];
    };
  };
}
