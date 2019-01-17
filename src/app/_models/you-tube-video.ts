export class YouTubeVideo {
    kind: "youtube#video";
    etag: string;
    id: string;
    snippet: {
        publishedAt: Date;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            [key: string]: {
                url: string;
                width: number;
                height: number;
            }
        };
        channelTitle: string;
        tags: string[];
        categoryId: string;
        liveBroadcastContent: string;
        defaultLanguage: string;
        localized: {
            title: string;
            description: string;
        };
        defaultAudioLanguage: string;
    };
    contentDetails: {
        duration: string;
        dimension: string;
        definition: "hd" | "sd";
        caption: boolean;
        licensedContent: boolean;
        projection: "360" | "rectangular";
    }
}
