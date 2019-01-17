export class YouTubeSearchResult {
    kind: string;
    etag: string;
    id: {
        kind: "youtube#video" | "youtube#channel" | "youtube#playlist";
        videoId?: string;
        channelId?: string;
        playlistId?: string
    };
    snippet: {
        publishedAt: Date;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            [key in "default" | "medium" | "high" | "standard" | "maxres"]: {
                url: string;
                width: number;
                height: number;
            }
        },
        channelTitle: string;
        liveBroadcastContent: "upcoming" | "live" | "none";
    };
}
