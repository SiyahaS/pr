import { YouTubeSearchResult } from "./you-tube-search-result";

export class YouTubeSearchListResponse {
    kind: "youtube#searchListResponse";
    etag: string;
    nextPageToken?: string;
    prevPageToken?: string;
    regionCode: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: YouTubeSearchResult[];
}
