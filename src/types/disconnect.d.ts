declare module "disconnect" {
  interface DiscogsSearchParams {
    query: string;
    type?: string;
    title?: string;
    release_title?: string;
    credit?: string;
    artist?: string;
    anv?: string;
    label?: string;
    genre?: string;
    style?: string;
    country?: string;
    year?: string;
    format?: string;
    catno?: string;
    barcode?: string;
    track?: string;
    submitter?: string;
    contributor?: string;
    sort?: string;
    sort_order?: "asc" | "desc";
    per_page?: number;
    page?: number;
  }

  interface DiscogsRelease {
    id: number;
    title: string;
    artist?: string;
    master_id?: number;
    master_url?: string;
    images?: Array<{ uri: string; type?: string }>;
    cover_image?: string;
    year?: string;
    format?: string[];
    type?: string;
    genres?: string[];
    styles?: string[];
    community?: {
      rating?: {
        count: number;
        average: number;
      };
    };

    tracklist?: Array<{
      position?: string;
      title: string;
      duration?: string;
      extraartists?: Array<{
        name: string;
        role?: string;
        id?: number;
        anv?: string;
        join?: string;
        tracks?: string;
        resource_url?: string;
      }>;
    }>;

    extraartists?: Array<{
      name: string;
      role?: string;
      id?: number;
      anv?: string;
      join?: string;
      tracks?: string;
      resource_url?: string;
    }>;

    credits?: Array<{
      name: string;
      role?: string;
    }>;

    description?: string;
  }

  interface DiscogsSearchResult extends DiscogsRelease {
    type: string;
  }

  interface SearchResponse {
    results: DiscogsSearchResult[];
    pagination: {
      per_page: number;
      pages: number;
      page: number;
      items: number;
      urls?: {
        last?: string;
        next?: string;
        prev?: string;
      };
    };
  }

  interface DiscogsClient {
    database(): DiscogsDatabase;
  }

  interface DiscogsDatabase {
    search(params: DiscogsSearchParams): Promise<DiscogsSearchResult>;
    getRelease(id: number): Promise<DiscogsRelease>;
    getMaster(id: number): Promise<DiscogsRelease>;
  }

  interface DiscogsOptions {
    consumerKey: string;
    consumerSecret: string;
    userAgent?: string;
  }

  export class Client {
    constructor(options: DiscogsOptions);
    database(): DiscogsDatabase;
  }
}
