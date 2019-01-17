import { YouTubeVideo } from "./you-tube-video";

export class YouTubeVideoListResponse {
    kind: "youtube#videoListResponse";
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: YouTubeVideo[];
}
