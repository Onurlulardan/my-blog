type Thumbnail = string | { url: string; public_id: string; };

export interface PostDetails {
    createdAt: string;
    meta: string;
    slug: string;
    tags: string[];
    thumbnail?: Thumbnail;
    title: string;
}